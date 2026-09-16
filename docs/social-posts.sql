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

-- Instagram 対応: channel の制約を広げる
alter table public.social_posts drop constraint if exists social_posts_channel_check;
alter table public.social_posts add constraint social_posts_channel_check check (channel in ('x','threads','instagram'));
alter table public.social_metrics drop constraint if exists social_metrics_channel_check;
alter table public.social_metrics add constraint social_metrics_channel_check check (channel in ('x','threads','instagram'));

-- ショート動画 (生成済み動画の記録。動画本体は Supabase Storage バケット "shorts" に置く)
create table if not exists public.shorts_videos (
  slug text primary key,
  title text not null,
  description text,
  duration_sec numeric,
  speaker text,
  video_url text not null,
  status text not null default 'rendered' check (status in ('rendered','posted_youtube','posted_tiktok','posted_all')),
  source text,
  rendered_at timestamptz not null default now()
);
alter table public.shorts_videos enable row level security;
grant all on public.shorts_videos to service_role;
-- Storage: Dashboard → Storage → New bucket "shorts" (Public bucket: ON)
