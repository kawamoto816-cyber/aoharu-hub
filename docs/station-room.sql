-- アオハルーム（無料の自習室）を本物にするためのテーブル。
--   station_room_cycles   … 集中のサイクル1回ぶんの記録（ランキング・称号・続けた日数のもと）
--   station_room_presence … いま部屋で集中している人（1分ごとに seen_at を更新。2分半たったら「いない」とみなす）
-- ニックネームと学年は station_members（docs/station-log.sql）を使う。本名・学校名・やることの文は保存しない。
-- 適用：Supabase（aoharu-os）の SQL エディタで実行。何度実行してもよい。

create table if not exists station_room_cycles (
  user_id text not null,
  id text not null,
  at timestamptz not null,
  mode integer not null check (mode in (25, 50)),
  focus_sec integer not null default 0 check (focus_sec >= 0),
  completed boolean not null default false,
  points integer not null default 0 check (points >= 0),
  solved integer not null default 0 check (solved >= 0),
  math integer not null default 0 check (math >= 0),
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);
create index if not exists station_room_cycles_at_idx on station_room_cycles (at);

create table if not exists station_room_presence (
  user_id text primary key,
  mode integer not null default 25,
  since timestamptz not null default now(),
  seen_at timestamptz not null default now()
);
create index if not exists station_room_presence_seen_idx on station_room_presence (seen_at);

alter table public.station_room_cycles enable row level security;
alter table public.station_room_presence enable row level security;
grant all on table public.station_room_cycles to service_role;
grant all on table public.station_room_presence to service_role;
