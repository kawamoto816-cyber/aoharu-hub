-- SNS自動投稿用のテーブル。Supabase の SQL Editor で1回実行する。
create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('x','threads')),
  text text not null,
  text_hash text not null,
  status text not null check (status in ('posted','failed')),
  external_id text,
  error text,
  source text,
  created_at timestamptz not null default now()
);
create index if not exists social_posts_dedupe_idx on public.social_posts (channel, text_hash, created_at desc);

create table if not exists public.app_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.social_posts enable row level security;
alter table public.app_settings enable row level security;
-- service_role キーのみが読み書きする (RLS はバイパスされる)。anon/authenticated 向けのポリシーは作らない。

-- 投稿の反応 (いいね・返信・リポスト・表示)。/internal/social/refresh-metrics が upsert する。
create table if not exists public.social_metrics (
  external_id text primary key,
  channel text not null check (channel in ('x','threads')),
  likes integer not null default 0,
  replies integer not null default 0,
  reposts integer not null default 0,
  quotes integer not null default 0,
  impressions integer,
  permalink text,
  fetched_at timestamptz not null default now()
);
alter table public.social_metrics enable row level security;
grant all on table public.social_metrics to service_role;
