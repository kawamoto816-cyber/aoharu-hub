#!/usr/bin/env bash
# 承認済みの [shorts] 台本を本番から取得し、未生成のものをレンダリングして Supabase Storage に置き、サーバーに記録する。
# 必要な環境変数: CRON_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, (任意) SHORTS_SPEAKER (既定 2 = 四国めたん),
#   SHORTS_DATE (指定するとその日だけ。空なら「今日と昨日」(JST) の両方を見る)
#
# 「今日と昨日」を見る理由 (2026-10 修正):
#   GitHub Actions のスケジュール実行は数時間遅れることがあり、20:30 JST 設定の実行が日付をまたいで
#   0時以降に始まると「今日」が翌日になり、まだ承認済み投稿のない日を見て 0本で正常終了していた
#   (9/21 以降ショート動画が1本も生成されなかった原因)。生成済みは rendered で飛ばすので、
#   2日分を見ても二重には作らない。
set -euo pipefail
BASE="https://app.bluespring.co.jp"
SPEAKER="${SHORTS_SPEAKER:-2}"
if [ -n "${SHORTS_DATE:-}" ]; then
  DATES="$SHORTS_DATE"
else
  DATES="$(TZ=Asia/Tokyo date -d yesterday +%F) $(TZ=Asia/Tokyo date +%F)"
fi
mkdir -p out queue
for DATE in $DATES; do
  curl -sSf --retry 3 --retry-delay 20 -H "Authorization: Bearer $CRON_SECRET" "$BASE/internal/shorts/queue?date=$DATE" > "queue/queue-$DATE.json"
  echo "queue $DATE: $(python3 -c 'import json,sys;q=json.load(open(sys.argv[1]));print(q.get("docs"), [ (s["slug"], s["rendered"]) for s in q.get("scripts",[]) ])' "queue/queue-$DATE.json")"
  python3 - "queue/queue-$DATE.json" "$DATE" <<'PY'
import json,sys
q=json.load(open(sys.argv[1]))
for s in q.get("scripts",[]):
    if s.get("rendered"): continue
    s["_date"]=sys.argv[2]
    json.dump(s, open(f"queue/{s['slug']}.json","w"), ensure_ascii=False)
PY
done
shopt -s nullglob
FAILED=0
for f in queue/*.json; do
  case "$f" in queue/queue-*.json) continue ;; esac
  slug=$(basename "$f" .json)
  DATE=$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["_date"])' "$f")
  echo "== render $slug ($DATE)"
  # 1本の失敗で残りを止めない (最後に失敗としてジョブを赤くする)
  if ! python3 scripts/shorts/render.py --script "$f" --speaker "$SPEAKER" --out out; then
    echo "!! render failed: $slug"; FAILED=1; continue
  fi
  mp4="out/$slug.mp4"; meta="out/$slug.json"
  echo "== upload $slug"
  curl -sSf --retry 3 --retry-delay 10 -X POST "$SUPABASE_URL/storage/v1/object/shorts/$slug.mp4" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
    -H "Content-Type: video/mp4" -H "x-upsert: true" --data-binary "@$mp4" > /dev/null
  url="$SUPABASE_URL/storage/v1/object/public/shorts/$slug.mp4"
  python3 - "$meta" "$url" "$DATE" <<'PY' > out/done.json
import json,sys
m=json.load(open(sys.argv[1]))
print(json.dumps({"slug":m["slug"],"title":m["title"],"description":m["description"],"duration_sec":m["duration_sec"],"speaker":m["speaker_name"],"video_url":sys.argv[2],"source":f"shorts-queue-{sys.argv[3]}"}, ensure_ascii=False))
PY
  curl -sSf --retry 3 --retry-delay 10 -X POST "$BASE/internal/shorts/done" -H "Authorization: Bearer $CRON_SECRET" -H "Content-Type: application/json" --data-binary @out/done.json
  echo; echo "== done $slug → $url"
done
rm -rf out/_work_*
exit $FAILED
