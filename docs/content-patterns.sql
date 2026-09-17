-- 「勝ちパターン」ライブラリ。同業種 (大学受験・総合型選抜・就活・転職 教育系) の
-- 伸びている投稿から抽出した「型」(フック文・構成・題材・フォーマット) を蓄積し、
-- 編集長エージェントの企画プロンプトに自動で読み込ませる。
-- 本文の丸コピーは保存しない (著作権・ブランド毀損を避けるため、あくまで抽象化した型のみ)。
create table if not exists public.content_patterns (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('x','threads','instagram','tiktok','youtube','general')),
  pattern_type text not null check (pattern_type in ('hook','structure','topic','format','cta')),
  title text not null,
  description text not null,
  example_note text,
  source_url text,
  strength text not null default 'medium' check (strength in ('high','medium','low')),
  active boolean not null default true,
  detected_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (platform, title)
);
alter table public.content_patterns enable row level security;
grant all on public.content_patterns to service_role;
create index if not exists content_patterns_active_idx on public.content_patterns (active, detected_at desc);
