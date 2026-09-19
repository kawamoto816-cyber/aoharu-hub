-- 出願案件の書類を「入試方式に合わせて選べる」ようにするための変更。
-- 旧: 案件を作ると志望理由書・小論文・面接の3件を必ず作っていた（一般選抜なのに
--     志望理由書と面接が出る、といった不一致が起きた）。
-- 新: 入試方式ごとの初期値を出し、実際に課される書類はユーザーが確定する。
--     判断の根拠にできるよう、募集要項のURLも案件に持たせる。
-- Supabase の SQL Editor で1回実行する。

-- 書類の種類を増やす（活動報告書・自己推薦書、エントリーシート・職務経歴書）
alter table public.application_documents drop constraint if exists application_documents_kind_check;
alter table public.application_documents add constraint application_documents_kind_check
  check (kind in ('shibo-riyusho','katsudo-hokoku','shoronbun','es','mensetsu'));

-- 募集要項のURL（一次情報への導線。カードから開けるようにする）
alter table public.applications add column if not exists guidelines_url text;
