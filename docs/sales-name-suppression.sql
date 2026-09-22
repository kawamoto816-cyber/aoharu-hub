-- 法人営業の送信NGリスト (法人名ベース)。Supabase SQL Editor で実行してください。
-- 既存の sales_suppression (docs/sales-outreach.sql) はメール/ドメイン単位の停止リスト。
-- こちらは「連絡先が変わって再発見されても、この法人名なら送らない」ための、法人名の部分一致リスト。
-- lib/sales/leads.ts の nameMatchesSuppression() が harvestNext() / generateCandidateDoc() の
-- 両方でこのテーブルを参照し、該当する法人は自動的に status='excluded' にする。

create table if not exists public.sales_name_suppression (
  pattern text primary key,   -- 法人名 (部分一致で判定。表記ゆれがあっても近ければ拾えるようゆるく判定する)
  reason text,
  created_at timestamptz not null default now()
);
alter table public.sales_name_suppression enable row level security;
grant all on public.sales_name_suppression to service_role;

-- じゅんさんの指示によるNGリスト登録 (2026-09-22)
insert into public.sales_name_suppression (pattern, reason) values
  ('学校法人ワオ未来学園ワオ高等学校', 'じゅんさん指定によるNG（通信制高校）'),
  ('ワオ未来塾', 'じゅんさん指定によるNG（株式会社ワオ・コーポレーション）')
on conflict (pattern) do nothing;

-- 既に sales_leads にある同名の候補があれば、承認待ち・未着手からすぐに除外する
update public.sales_leads
set status = 'excluded', exclude_reason = 'name_suppressed', updated_at = now()
where status in ('new', 'queued')
  and (
    name ilike '%ワオ未来学園%' or name ilike '%ワオ未来塾%' or name ilike '%ワオ高等学校%'
  );
