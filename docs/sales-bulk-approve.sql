-- 法人営業ダッシュボードの「メール宛てをまとめて承認」用 (Supabase SQL Editor で1回だけ実行)。
-- 承認した時刻を持たせ、平日09:30の送信ジョブが承認の古い順に送る。
alter table public.sales_leads add column if not exists approved_at timestamptz;
create index if not exists sales_leads_approved_idx on public.sales_leads (approved_at) where approved_at is not null;

-- 記入例のアドレス (xxxx@example.com 等) や javascript:void(0) を、既存の見込み先から取り除く
update public.sales_leads set contact_email = null, updated_at = now()
where contact_email ~* '@(example|sample|test|dummy)\.' or contact_email ~* '^x{2,}@' or contact_email ~* '\.(png|jpe?g|gif|svg|webp)$';
update public.sales_leads set contact_form_url = null, updated_at = now()
where contact_form_url is not null and contact_form_url !~* '^https?://';
update public.sales_leads set status = 'excluded', exclude_reason = 'bad_contact', updated_at = now()
where status in ('new', 'queued') and contact_email is null and contact_form_url is null;
