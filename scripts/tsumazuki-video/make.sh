#!/usr/bin/env bash
# つまずき図鑑の動画を1本作る（TikTok 用の縦動画 1080×1920・30fps・約45〜55秒）。
#
#   bash scripts/tsumazuki-video/make.sh <単元id> [--cast <キャストid>] [--no <連番>] [--audio-dir <dir>] [--out <dir>]
#     例: bash scripts/tsumazuki-video/make.sh j-math-2-ichiji-kansu --cast j-kisaku --no 1
#   出力: <out>/tsumazuki-<単元id>.mp4 と .json（slug・title（キャプション）・description・duration_sec・credit）。out の既定は out/
#
# 流れ: prepare.ts（台本から使う部分・画面の文）→ bundle.cjs（画面の JS・CSS。1回だけ）→ pages.cjs（つまずきページ・図解レクチャーの静的HTML）
#       → record.cjs（playwright で録画・全体スクショ）→ compose.py（ffmpeg・PIL でつなぎ、声を合わせる）
# 必要なもの: node・npm ci 済み・esbuild・playwright（chromium）・tsx（CI では tsumazuki-video.yml が入れる）・ffmpeg・python3-pil・fonts-noto-cjk
# 音声: public/audio/jugyo/<キー>.mp3（なければ止まる。仮の声では作らない）
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
UNIT="${1:?単元id を指定してください}"
shift
CAST=""
NO=1
AUDIO="$ROOT/public/audio/jugyo"
OUT="$ROOT/out"
while [ $# -gt 0 ]; do
  case "$1" in
    --cast) CAST="$2"; shift 2 ;;
    --no) NO="$2"; shift 2 ;;
    --audio-dir) AUDIO="$2"; shift 2 ;;
    --out) OUT="$2"; shift 2 ;;
    *) echo "知らない引数: $1" >&2; exit 2 ;;
  esac
done
mkdir -p "$OUT"
OUT="$(cd "$OUT" && pwd)"
BUNDLE="$OUT/_tsumazuki_bundle"
WORK="$OUT/_work_tsumazuki_$UNIT"
rm -rf "$WORK"
mkdir -p "$WORK"
cd "$ROOT"

echo "== prepare $UNIT"
npx --no-install tsx "$HERE/prepare.ts" --unit "$UNIT" ${CAST:+--cast "$CAST"} --no "$NO" --audio-dir "$AUDIO" --out "$WORK"
if [ ! -f "$BUNDLE/player.js" ] || [ ! -f "$BUNDLE/pages.cjs" ] || [ -n "${TSUMAZUKI_REBUILD:-}" ]; then
  echo "== bundle"
  node "$HERE/bundle.cjs" "$BUNDLE"
fi
echo "== pages"
node "$BUNDLE/pages.cjs" "$UNIT" "$WORK"
echo "== record"
node "$HERE/record.cjs" "$BUNDLE" "$WORK"
echo "== compose"
python3 "$HERE/compose.py" "$WORK" "$OUT/tsumazuki-$UNIT.mp4"
python3 - "$WORK" "$OUT" <<'PY'
import json, sys
d = json.load(open(sys.argv[1] + "/data.json"))
r = json.load(open(sys.argv[1] + "/result.json"))
meta = {"slug": d["slug"], "unit": d["unit"], "cast": d["cast"], "no": d["no"], "title": d["title"], "description": d["description"], "duration_sec": r["duration"], "credit": d["credit"], "source": "tsumazuki"}
json.dump(meta, open(f"{sys.argv[2]}/{d['slug']}.json", "w"), ensure_ascii=False, indent=1)
if not 40 <= r["duration"] <= 60:
    print(f"!! 長さが {r['duration']} 秒です（目安 45〜55 秒）")
PY
echo "== done $OUT/tsumazuki-$UNIT.mp4"
