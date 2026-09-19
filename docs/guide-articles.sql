-- /guide のSEO記事をDBで持つためのテーブル。Supabase の SQL Editor で1回実行する。
-- 記事は Google ドライブの「SEO記事 YYYY-MM-DD」ドキュメントから
-- /internal/guide/ingest が取り込み、ここに upsert される。
-- lib/guide/articles/*.ts の静的記事はそのまま残り、DBの記事はそれに追加される形で表示される。
create table if not exists public.guide_articles (
  slug text primary key,
  title text not null,
  description text not null,
  segment text not null check (segment in ('highschool','student','career')),
  topic text not null check (topic in ('shibo-riyusho','shoronbun','mensetsu','nyushi-seido','es','tenshoku')),
  keywords text[] not null default '{}',
  lead text not null,
  -- sections / faq / sources / cta をまとめて保持する (GuideArticle の形)
  body jsonb not null,
  -- published: /guide に出る。draft: 品質チェックに引っかかったもの (/admin/guide で確認する)
  status text not null check (status in ('published','draft')) default 'draft',
  -- 自動チェックに引っかかった理由 (draft のときだけ入る)
  issues text[] not null default '{}',
  -- 取り込み元のドキュメント名 (どの日の生成物か追えるように)
  source_doc text,
  published_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists guide_articles_status_idx on public.guide_articles (status, published_at desc);

alter table public.guide_articles enable row level security;
grant all on table public.guide_articles to service_role;
-- service_role キーのみが読み書きする (RLS はバイパスされる)。anon/authenticated 向けのポリシーは作らない。
