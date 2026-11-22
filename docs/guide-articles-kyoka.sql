-- 2026-11-22：/guide に教科の記事（トピック manabinaoshi・katei）を足すため、topic の決まりを広げる。
-- Supabase の SQL Editor で1回実行する（何度実行しても同じ結果）。
alter table public.guide_articles drop constraint if exists guide_articles_topic_check;
alter table public.guide_articles add constraint guide_articles_topic_check
  check (topic in ('shibo-riyusho','shoronbun','mensetsu','nyushi-seido','es','tenshoku','manabinaoshi','katei'));
