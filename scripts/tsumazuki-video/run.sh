#!/usr/bin/env bash
# つまずき図鑑の動画を毎日作る（.github/workflows/tsumazuki-video.yml から）。
# order.txt の上から、まだ作っていない単元を1日 N 本（既定2）作り、Supabase Storage のバケット "shorts" に上げて、
# /internal/shorts/done に記録する（source "tsumazuki"）。記録された動画は管理画面の TikTok 投稿（/admin/social/tiktok）の候補に並ぶ。
# Instagram・YouTube の自動投稿には出さない（lib/social/shorts.ts）。
#
# 必要な環境変数: CRON_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
#   任意: TSUMAZUKI_PER_DAY（1日の本数。既定 2）、TSUMAZUKI_UNIT（指定するとその単元だけ。作り直しにも使う）、TSUMAZUKI_CAST
# 作ったかどうか: shorts_videos に slug "tsumazuki-<単元id>" があるか（Supabase の REST で見る）。連番（つまずき図鑑 #N）は作った本数 + 1。
# 音声ファイルがない単元は飛ばす（仮の声では作らない）。それ以外の失敗は、残りを作ってから最後にジョブを赤くする。
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
BASE="https://app.bluespring.co.jp"
PER_DAY="${TSUMAZUKI_PER_DAY:-2}"
OUT="$ROOT/out"
mkdir -p "$OUT"
cd "$ROOT"

# 作ったもの（slug の一覧）
curl -sSf --retry 3 --retry-delay 10 "$SUPABASE_URL/rest/v1/shorts_videos?select=slug&slug=like.tsumazuki-*&limit=5000" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" > "$OUT/tsumazuki-done.json"
DONE_N=$(python3 -c 'import json,sys;print(len(json.load(open(sys.argv[1]))))' "$OUT/tsumazuki-done.json")
echo "作った本数: $DONE_N"

if [ -n "${TSUMAZUKI_UNIT:-}" ]; then
  TODO="$TSUMAZUKI_UNIT"
else
  # まだ作っていない単元（順番の表の上から。音声がなくて飛ばす分を見こんで多めに）
  TODO=$(python3 - "$HERE/order.txt" "$OUT/tsumazuki-done.json" "$((PER_DAY * 6))" <<'PY'
import json, sys
done = {r["slug"] for r in json.load(open(sys.argv[2]))}
units = [l.strip() for l in open(sys.argv[1]) if l.strip() and not l.startswith("#")]
print(" ".join([u for u in units if f"tsumazuki-{u}" not in done][: int(sys.argv[3])]))
PY
)
fi

if [ -z "$TODO" ]; then echo "順番の表の単元はすべて作りました"; exit 0; fi
MADE=0
FAILED=0
for UNIT in $TODO; do
  [ "$MADE" -ge "$PER_DAY" ] && break
  SLUG="tsumazuki-$UNIT"
  # 連番：新しく作るときは作った本数 + 1。作り直し（TSUMAZUKI_UNIT で作ったことのある単元）のときは、もとの番号はわからないので作った本数にする
  NO=$(python3 - "$OUT/tsumazuki-done.json" "$SLUG" "$DONE_N" "$MADE" <<'PY'
import json, sys
slugs = [r["slug"] for r in json.load(open(sys.argv[1]))]
print(int(sys.argv[3]) + int(sys.argv[4]) + 1 if sys.argv[2] not in slugs else int(sys.argv[3]))
PY
)
  echo "== make $UNIT (#$NO)"
  set +e
  bash "$HERE/make.sh" "$UNIT" --no "$NO" --out "$OUT" ${TSUMAZUKI_CAST:+--cast "$TSUMAZUKI_CAST"}
  rc=$?
  set -e
  if [ "$rc" -eq 3 ]; then echo "-- 音声ファイルがないので飛ばします: $UNIT"; continue; fi
  if [ "$rc" -ne 0 ]; then echo "!! 作れませんでした: $UNIT"; FAILED=1; continue; fi

  mp4="$OUT/$SLUG.mp4"
  echo "== upload $SLUG"
  curl -sSf --retry 3 --retry-delay 10 -X POST "$SUPABASE_URL/storage/v1/object/shorts/$SLUG.mp4" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
    -H "Content-Type: video/mp4" -H "x-upsert: true" --data-binary "@$mp4" > /dev/null
  url="$SUPABASE_URL/storage/v1/object/public/shorts/$SLUG.mp4"
  python3 - "$OUT/$SLUG.json" "$url" <<'PY' > "$OUT/done.json"
import json, sys
m = json.load(open(sys.argv[1]))
print(json.dumps({"slug": m["slug"], "title": m["title"], "description": m["description"], "duration_sec": m["duration_sec"], "speaker": m["credit"], "video_url": sys.argv[2], "source": "tsumazuki"}, ensure_ascii=False))
PY
  curl -sSf --retry 3 --retry-delay 10 -X POST "$BASE/internal/shorts/done" -H "Authorization: Bearer $CRON_SECRET" -H "Content-Type: application/json" --data-binary @"$OUT/done.json"
  echo
  echo "== done $SLUG → $url"
  MADE=$((MADE + 1))
done
rm -rf "$OUT"/_work_tsumazuki_*
echo "今日作った本数: $MADE"
[ "$MADE" -gt 0 ] || [ -n "${TSUMAZUKI_UNIT:-}" ] || { echo "!! 1本も作れませんでした"; FAILED=1; }
exit $FAILED
