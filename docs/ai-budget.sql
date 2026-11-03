-- 運営の月のAI予算（全アプリ共通）と、ゼロワンOSユース版（ユニゼブ）の保存。
-- Supabase の SQL Editor で1回実行する。本文（会話・答案）は ai_cost_log には残さない。

-- AIを1回呼ぶたびに1行（アプリ・操作・モデル・トークン・円の目安）。lib/ai-budget.ts が書く。
create table if not exists public.ai_cost_log (
  id bigserial primary key,
  app_key text not null,
  action text not null,
  user_id text,                       -- Clerk の userId（登録なしは null）
  model text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  yen numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists ai_cost_log_created_idx on public.ai_cost_log (created_at);
create index if not exists ai_cost_log_user_idx on public.ai_cost_log (user_id, app_key, created_at);
alter table public.ai_cost_log enable row level security;
grant all on table public.ai_cost_log to service_role;
grant usage, select on sequence public.ai_cost_log_id_seq to service_role;

-- 8割・上限の知らせを月に1回だけ送るための記録
create table if not exists public.ai_budget_alert (
  month text not null,                -- YYYY-MM（日本時間）
  kind text not null check (kind in ('80','100')),
  total_yen integer not null,
  created_at timestamptz not null default now(),
  primary key (month, kind)
);
alter table public.ai_budget_alert enable row level security;
grant all on table public.ai_budget_alert to service_role;

-- ユニゼブ：マイ事業ボード・カードの答え・スキルアセット。中身は UNIZEB_STATE_KEY で暗号化して持つ
-- （家庭のお金の情報などが入るため、運営の管理画面でも読めないようにする）。
create table if not exists public.unizeb_state (
  user_id text primary key,           -- Clerk の userId
  data text not null,                 -- AES-256-GCM で暗号化した JSON（iv.tag.本文 を base64）
  updated_at timestamptz not null default now()
);
alter table public.unizeb_state enable row level security;
grant all on table public.unizeb_state to service_role;
