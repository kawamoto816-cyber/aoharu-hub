-- 法人営業アウトリーチの送信ログと送信停止リスト (Supabase SQL Editor で実行)
create table if not exists public.sales_outreach (
  id bigint generated always as identity primary key,
  method text not null check (method in ('email','form')),
  recipient text not null,          -- メールアドレス (小文字) またはフォームURL
  company text,
  subject text not null,
  body text not null,
  body_hash text not null,
  status text not null check (status in ('sent','failed','manual','manual_sent','skipped')),
  external_id text,                 -- Resend のメールID
  error text,
  source text,                      -- send-approval-YYYY-MM-DD
  sent_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists sales_outreach_recipient_idx on public.sales_outreach (recipient, status, sent_at desc);
alter table public.sales_outreach enable row level security;
grant all on public.sales_outreach to service_role;
grant usage, select on all sequences in schema public to service_role;

-- 送信停止 (受信拒否の申し出があった宛先。メールアドレス、または "@example.jp" でドメインごと)
create table if not exists public.sales_suppression (
  pattern text primary key,
  reason text,
  created_at timestamptz not null default now()
);
alter table public.sales_suppression enable row level security;
grant all on public.sales_suppression to service_role;
