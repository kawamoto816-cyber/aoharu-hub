-- 法人営業の大量リスト化・大量送信のための追加テーブル (Supabase SQL Editor で実行)。
-- 既存の sales_outreach / sales_suppression (docs/sales-outreach.sql) はそのまま使う。

-- Google Places API で拾った候補。件名・本文はパターン別テンプレート (lib/sales/patterns.ts)
-- から機械的に組み立てるので、本文そのものはここには持たない。
create table if not exists public.sales_leads (
  id bigint generated always as identity primary key,
  place_id text unique,                -- Google Places の place_id (重複除外の主キー)
  name text not null,                  -- 法人名
  pattern_key text not null check (pattern_key in ('club','juku','school_support','high_school')),
  activity_label text,                 -- club パターンのときの競技・分野名 (例: サッカー)
  pref text,                           -- 都道府県
  address text,
  website text,
  contact_email text,
  contact_form_url text,
  opted_out_notice boolean not null default false, -- サイトに「営業お断り」等の表示を検知したか
  status text not null default 'new' check (status in ('new','excluded','queued','contacted')),
  exclude_reason text,
  discovered_at timestamptz not null default now(),
  last_contacted_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists sales_leads_status_idx on public.sales_leads (status, discovered_at);
alter table public.sales_leads enable row level security;
grant all on table public.sales_leads to service_role;
grant usage, select on all sequences in schema public to service_role;

-- ハーベスト (都道府県×業態の組み合わせを少しずつ回す) の進行位置。1行だけ持つ。
create table if not exists public.sales_harvest_state (
  id int primary key default 1,
  next_index int not null default 0,
  updated_at timestamptz not null default now(),
  constraint sales_harvest_state_singleton check (id = 1)
);
insert into public.sales_harvest_state (id, next_index) values (1, 0) on conflict (id) do nothing;
alter table public.sales_harvest_state enable row level security;
grant all on table public.sales_harvest_state to service_role;

-- 送信量の上限と、バウンス・苦情が増えたときの自動停止フラグ。1行だけ持つ。
create table if not exists public.sales_controls (
  id int primary key default 1,
  max_per_run int not null default 30, -- 1回の送信ジョブでの上限。段階的に手動で引き上げる
  paused boolean not null default false,
  paused_reason text,
  paused_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint sales_controls_singleton check (id = 1)
);
insert into public.sales_controls (id) values (1) on conflict (id) do nothing;
alter table public.sales_controls enable row level security;
grant all on table public.sales_controls to service_role;

-- バウンス・苦情の自動検知用 (Resend Webhook から記録)
alter table public.sales_outreach add column if not exists bounced_at timestamptz;
alter table public.sales_outreach add column if not exists complained_at timestamptz;
create index if not exists sales_outreach_bounced_idx on public.sales_outreach (bounced_at) where bounced_at is not null;
create index if not exists sales_outreach_complained_idx on public.sales_outreach (complained_at) where complained_at is not null;
