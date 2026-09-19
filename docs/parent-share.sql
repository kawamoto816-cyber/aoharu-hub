-- 保護者ビュー: 共有リンクの発行/検証に使うテーブル。
-- ユーザーごとに1本のトークンを持つ。作り直すと古いリンクはその場で無効になる
-- (行を上書きするだけなので、失効管理のための追加カラムは不要)。
create table if not exists parent_shares (
  user_id text primary key,
  token text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists parent_shares_token_idx on parent_shares (token);
