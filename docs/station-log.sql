-- 学習便（ラーニングステーションの試験運用）の学習ログ。登録した人だけ、アカウントに保存する。
-- 運営が便ごとの学習量（解いた数・正解した数・単元模試の回数）を見て、保護者への報告に使う。
-- 1行 = 1回の送信で、ある単元について増えた分（差分）。端末の記録（さかのぼりの習熟度・模試の結果）から数える。
-- 本名・学校名は入れない（ニックネームと学年だけを station_members に置く。保護者の連絡先は別に管理する）。
create table if not exists station_learn_log (
  id bigint generated always as identity primary key,
  user_id text not null,
  at timestamptz not null default now(),
  unit text not null,
  solved integer not null default 0 check (solved >= 0),
  correct integer not null default 0 check (correct >= 0),
  moshi integer not null default 0 check (moshi >= 0)
);
create index if not exists station_learn_log_at_idx on station_learn_log (at);
create index if not exists station_learn_log_user_at_idx on station_learn_log (user_id, at);

create table if not exists station_members (
  user_id text primary key,
  nick text not null default '',
  grade text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.station_learn_log enable row level security;
alter table public.station_members enable row level security;
grant all on table public.station_learn_log to service_role;
grant all on table public.station_members to service_role;
