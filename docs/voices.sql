-- 利用者の声（テンサクンで書き直して点が上がった人の「ひとこと」）。
-- 名前・学校名は集めない（学年と点数の変化だけ）。載せてよいと本人が選んだものだけ、
-- 社内で読んで「載せる」にしたものを /season・/parents に出す。作り話の声は載せない。
create table if not exists public.voices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id text not null,
  kind text not null,
  grade text not null check (grade in ('高1','高2','高3','既卒','その他')),
  before_score int,
  after_score int,
  comment text not null check (char_length(comment) between 5 and 200),
  consent_publish boolean not null default false,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_at timestamptz
);
create index if not exists voices_status_idx on public.voices (status, created_at desc);
alter table public.voices enable row level security;
grant all on public.voices to service_role;
