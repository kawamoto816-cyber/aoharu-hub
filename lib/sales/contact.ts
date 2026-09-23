// 見込み先の連絡先が「本当に送れる宛先か」を判定する。
// 公式サイトのトップページから機械的に拾っているため、次のような誤検出が混ざる:
//   - xxxx@example.com / info@sample.jp のような、サイトに置かれた記入例
//   - logo@2x.png のような、画像ファイル名がメールアドレスの形に見えたもの
//   - javascript:void(0) / # / mailto: のような、フォームではないリンク
// これらは送っても届かない (または送るべきでない) ので、収集・提案・送信のすべての段階ではじく。

const PLACEHOLDER_DOMAINS = /(^|\.)(example|sample|test|dummy|domain|yourdomain|xxx+)\.(com|jp|co\.jp|ne\.jp|org|net)$/i;
// ※ mail@ / info@ は実在の宛先として普通に使われるので、ここには入れない
const PLACEHOLDER_LOCAL = /^(x{2,}|sample|example|test|dummy|your[-_.]?(name|mail|email|address)|aaa+)$/i;
const FILE_TLD = /\.(png|jpe?g|gif|svg|webp|avif|ico|bmp|css|js|json|pdf|mp4|webm)$/i;

export function isUsableEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const addr = email.trim().toLowerCase();
  const m = addr.match(/^([^\s@]+)@([^\s@]+\.[a-z]{2,})$/i);
  if (!m) return false;
  const [, local, domain] = m;
  if (FILE_TLD.test(domain)) return false; // logo@2x.png など
  if (PLACEHOLDER_DOMAINS.test(domain)) return false;
  if (PLACEHOLDER_LOCAL.test(local)) return false;
  return true;
}

export function isUsableFormUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const u = url.trim();
  if (!/^https?:\/\//i.test(u)) return false; // javascript:void(0), mailto:, # など
  try {
    const parsed = new URL(u);
    if (PLACEHOLDER_DOMAINS.test(parsed.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}
