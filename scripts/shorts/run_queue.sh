#!/usr/bin/env bash
# 承認済みの [shorts] 台本を本番から取得し、未生成のものをレンダリングして Supabase Storage に置き、サーバーに記録する。
# 必要な環境変数: CRON_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, (任意) SHORTS_SPEAKER (既定 13), SHORTS_DATE (既定 今日 JST)
set -euo pipefail
BASE="https://app.bluespring.co.jp"
DATE="${SHORTS_DATE:-$(TZ=Asia/Tokyo date +%F)}"
SPEAKER="${SHORTS_SPEAKER:-13}"
mkdir -p out queue
curl -sSf -H "Authorization: Bearer $CRON_SECRET" "$BASE/internal/shorts/queue?date=$DATE" > queue/queue.json
echo "queue: $(python3 -c 'import json;q=json.load(open("queue/queue.json"));print(q.get("docs"), [ (s["slug"], s["rendered"]) for s in q.get("scripts",[]) ])')"
python3 - <<'PY'
import json
q=json.load(open("queue/queue.json"))
for s in q.get("scripts",[]):
    if s.get("rendered"): continue
    json.dump(s, open(f"queue/{s['slug']}.json","w"), ensure_ascii=False)
PY
shopt -s nullglob
for f in queue/*.json; do
  [ "$f" = "queue/queue.json" ] && continue
  slug=$(basename "$f" .json)
  echo "== render $slug"
  python3 scripts/shorts/render.py --script "$f" --speaker "$SPEAKER" --out out
  mp4="out/$slug.mp4"; meta="out/$slug.json"
  echo "== upload $slug"
  curl -sSf -X POST "$SUPABASE_URL/storage/v1/object/shorts/$slug.mp4" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
    -H "Content-Type: video/mp4" -H "x-upsert: true" --data-binary "@$mp4" > /dev/null
  url="$SUPABASE_URL/storage/v1/object/public/shorts/$slug.mp4"
  python3 - "$meta" "$url" "$DATE" <<'PY' > out/done.json
import json,sys
m=json.load(open(sys.argv[1]))
print(json.dumps({"slug":m["slug"],"title":m["title"],"description":m["description"],"duration_sec":m["duration_sec"],"speaker":m["speaker_name"],"video_url":sys.argv[2],"source":f"shorts-queue-{sys.argv[3]}"}, ensure_ascii=False))
PY
  curl -sSf -X POST "$BASE/internal/shorts/done" -H "Authorization: Bearer $CRON_SECRET" -H "Content-Type: application/json" --data-binary @out/done.json
  echo; echo "== done $slug → $url"
done
rm -rf out/_work_*
