-- 出願案件（志望校1つ = 1レコード）と、その下にぶら下がる書類。
-- マイページが「残り何日 / 次にやること」を出すための、ハブ側だけで完結するテーブル。
-- アプリ10本側の改修は不要（稿数はユーザーが自分で進める）。
-- Supabase の SQL Editor で1回実行する。

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,              -- Clerk の userId
  school_name text not null,          -- 大学・学校名
  faculty text,                       -- 学部・学科（任意）
  admission_type text,                -- 総合型選抜 / 学校推薦型選抜 など（任意）
  deadline date,                      -- 出願日（締切）
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists applications_user_idx on public.applications (user_id, deadline);
alter table public.applications enable row level security;
grant all on table public.applications to service_role;

-- 書類。案件を作ったときに3種類ぶんを自動で作る。draft_count が「何稿目」。
create table if not exists public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  kind text not null check (kind in ('shibo-riyusho','shoronbun','mensetsu')),
  draft_count integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (application_id, kind)
);
create index if not exists application_documents_app_idx on public.application_documents (application_id);
alter table public.application_documents enable row level security;
grant all on table public.application_documents to service_role;
