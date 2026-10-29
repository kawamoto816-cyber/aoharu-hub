-- 「まなぶ」(/learn) のカードの進み具合。登録した人だけ、アカウントに保存して別の端末でも続きから使えるようにする。
-- status: quiz = 三択に正解（覚えた） / done = テンサクンで試した（習得）。done は quiz に戻さない（アプリ側で合成）。
-- 未登録の人の進み具合はブラウザにだけあり、登録した時点でここへ移す。
create table if not exists learn_progress (
  user_id text not null,
  card_id text not null,
  status text not null check (status in ('quiz', 'done')),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

alter table public.learn_progress enable row level security;
grant all on table public.learn_progress to service_role;
