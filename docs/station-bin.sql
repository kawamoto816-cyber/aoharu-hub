-- 学習便の乗車記録と班。docs/station-log.sql のあとに実行する（station_members がある前提）。
-- 1行 = 1人の1便。乗車（チェックイン）で行ができ、宣言・下車で埋まっていく。時刻はサーバーの時計で入れる。
-- 本名・学校名は入れない。plan（今日やること）と explain（今日学んだことの説明）は生徒が書いた文章。
-- 既存のテーブルやデータを消す文は入れていない。何度実行してもよい。
create table if not exists station_bin_rides (
  user_id text not null,
  bin_date date not null,
  slot text not null check (slot in ('night', 'morning')),
  checkin_at timestamptz not null default now(),
  plan text not null default '',
  checkout_at timestamptz,
  explain text not null default '',
  reflect text not null default '' check (reflect in ('', 'done', 'half', 'not')),
  primary key (user_id, bin_date, slot)
);
create index if not exists station_bin_rides_date_idx on station_bin_rides (bin_date, slot);

-- 班（A〜D。未設定は空文字）
alter table public.station_members add column if not exists team text not null default '' check (team in ('', 'A', 'B', 'C', 'D'));

alter table public.station_bin_rides enable row level security;
grant all on table public.station_bin_rides to service_role;
