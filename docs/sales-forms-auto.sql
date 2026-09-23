-- 法人営業: メール宛ての一括承認 + フォーム宛ての自動送信の準備 (Supabase SQL Editor で1回だけ実行。何度実行しても安全)
-- ※ docs/sales-bulk-approve.sql の内容もここに含めています (まだ実行していなければ、これ1本でOK)

-- 1) ダッシュボードの「メール宛てをまとめて承認」ボタン用の列 (これが無いとボタンがエラーになる)
alter table public.sales_leads add column if not exists approved_at timestamptz;
create index if not exists sales_leads_approved_idx on public.sales_leads (approved_at) where approved_at is not null;

-- 2) 記入例のアドレス (xxxx@example.com 等) や javascript:void(0) を、既存の見込み先から取り除く
update public.sales_leads set contact_email = null, updated_at = now()
where contact_email ~* '@(example|sample|test|dummy)\.' or contact_email ~* '^x{2,}@' or contact_email ~* '\.(png|jpe?g|gif|svg|webp)$';
update public.sales_leads set contact_form_url = null, updated_at = now()
where contact_form_url is not null and contact_form_url !~* '^https?://';
update public.sales_leads set status = 'excluded', exclude_reason = 'bad_contact', updated_at = now()
where status in ('new', 'queued') and contact_email is null and contact_form_url is null;

-- 3) フォーム宛ての自動送信が「未処理」を素早く探せるように
create index if not exists sales_outreach_form_pending_idx on public.sales_outreach (created_at) where method = 'form' and status = 'manual';

-- 4) 9/22〜23 に Claude が手で送ったフォーム (自動送信で二重に送らないよう「送信済み」にする)
update public.sales_outreach set status = 'manual_sent', sent_at = coalesce(sent_at, now()), error = 'Claudeが手動で送信'
where method = 'form' and status = 'manual' and recipient in (
  'https://www.y-karate.jp/contact',
  'http://www.npo-hsc.jp/contact/contact_us.php',
  'https://sfc.web-carrot.com/about_carrot/contact/'
);
insert into public.sales_outreach (method, recipient, company, subject, body, body_hash, status, error, source, sent_at)
select 'form', v.url, v.company, '生徒の大学進学まで見据えた指導支援のご案内', '(Claudeが手動でフォーム送信)', md5(v.url), 'manual_sent', 'Claudeが手動で送信', 'manual-claude', now()
from (values
  ('https://www.y-karate.jp/contact', '日本空手道 悠心道場'),
  ('http://www.npo-hsc.jp/contact/contact_us.php', 'SSAP 札幌サッカーアミューズメントパーク'),
  ('https://sfc.web-carrot.com/about_carrot/contact/', 'スポーツフィールドキャロット')
) as v(url, company)
where not exists (select 1 from public.sales_outreach o where o.recipient = v.url and o.status = 'manual_sent');

-- 5) 手作業で「送れない」と判断した先は見送り扱いに
update public.sales_outreach set status = 'skipped', error = v.reason
from (values
  ('https://crunkdancestudio.com/contact/', 'フォームなし (LINE・電話のみ)'),
  ('https://budojuku.jp/tria-lesson.html', '体験予約フォームのみ'),
  ('https://hamajuku.com/contact', '保護者向け入会フォーム (校舎・学年が必須)'),
  ('http://futsalsyu.net/contact/', 'フォームなし (メールのみ)')
) as v(url, reason)
where sales_outreach.method = 'form' and sales_outreach.status = 'manual' and sales_outreach.recipient = v.url;

-- 6) フッチ・スポーツパークPivo は、送信ボタンを押したが届いたか確認できなかったため、二重送信を避けて今後は送らない
insert into public.sales_suppression (pattern, reason) values
  ('http://www.fsp-pivo.com/pages/contact', '9/23 手動送信の成否が不明なため二重送信防止')
on conflict (pattern) do nothing;
update public.sales_outreach set status = 'skipped', error = '手動送信の成否が不明なため二重送信防止'
where method = 'form' and status = 'manual' and recipient = 'http://www.fsp-pivo.com/pages/contact';
