-- 法人営業アウトリーチの追跡拡張 (Supabase SQL Editor で1回実行する)
-- sales_outreach に「開封・クリック・返信・面談」の4項目を追加する。
-- 開封・クリックは Resend の Webhook (/api/webhooks/resend) が自動更新する。
-- 返信・面談は営業エージェントが Google ドライブに書く「返信記録 YYYY-MM-DD」を
-- /internal/sales/replies/ingest が取り込んで更新する（手入力の手間をなくすため）。

alter table public.sales_outreach add column if not exists opened_at timestamptz;
alter table public.sales_outreach add column if not exists clicked_at timestamptz;
alter table public.sales_outreach add column if not exists replied_at timestamptz;
alter table public.sales_outreach add column if not exists meeting_at timestamptz;
alter table public.sales_outreach add column if not exists reply_note text;

create index if not exists sales_outreach_opened_idx on public.sales_outreach (opened_at) where opened_at is not null;
create index if not exists sales_outreach_replied_idx on public.sales_outreach (replied_at) where replied_at is not null;
create index if not exists sales_outreach_meeting_idx on public.sales_outreach (meeting_at) where meeting_at is not null;
