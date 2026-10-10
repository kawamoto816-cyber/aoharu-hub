import { getSetting, setSetting } from "./store";

// 配信まわりの不具合を、じゅんさん (運営者) にメールで知らせる。
//   必要な環境変数: RESEND_API_KEY (法人営業の送信と共通), ALERT_EMAIL (通知先。カンマ区切りで複数可)
//   (任意) ALERT_FROM_EMAIL (未設定なら SALES_FROM_EMAIL、それもなければ pr@bluespring.co.jp)
// 同じ種類の不具合は ALERT_REPEAT_HOURS (既定 12 時間) に1回までしか送らない (毎回の実行で送り続けない)。
// 送ったアラートは app_settings の "alerts_recent" に残し、配信ダッシュボードの上部に表示する。

const REPEAT_MS = Number(process.env.ALERT_REPEAT_HOURS ?? 12) * 3600 * 1000;
const RECENT_KEY = "alerts_recent";

export interface AlertEntry {
  key: string;
  title: string;
  body: string;
  action: string;
  at: string;
}

export async function listRecentAlerts(): Promise<AlertEntry[]> {
  const raw = await getSetting(RECENT_KEY).catch(() => null);
  try {
    const list = raw ? (JSON.parse(raw) as AlertEntry[]) : [];
    // 2日より前のものは出さない
    return list.filter((a) => Date.now() - new Date(a.at).getTime() < 48 * 3600 * 1000);
  } catch {
    return [];
  }
}

async function sendMail(subject: string, text: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = (process.env.ALERT_EMAIL ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!key || !to.length) return;
  const from = process.env.ALERT_FROM_EMAIL ?? process.env.SALES_FROM_EMAIL ?? "アオハルOS 配信監視 <pr@bluespring.co.jp>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
}

/**
 * 不具合を知らせる。key ごとに REPEAT_MS に1回まで。失敗しても呼び出し元の処理は止めない。
 * @param action じゅんさんにお願いしたいこと (承認や手作業が必要な場合はここに書く)
 */
export async function raiseAlert(key: string, title: string, body: string, action: string): Promise<boolean> {
  try {
    const lastKey = `alert_last_${key}`;
    const last = await getSetting(lastKey).catch(() => null);
    if (last && Date.now() - new Date(last).getTime() < REPEAT_MS) return false;
    const at = new Date().toISOString();
    await setSetting(lastKey, at);
    const recent = await listRecentAlerts();
    const next = [{ key, title, body, action, at }, ...recent.filter((a) => a.key !== key)].slice(0, 20);
    await setSetting(RECENT_KEY, JSON.stringify(next)).catch(() => undefined);
    await sendMail(
      `【アオハルOS 配信アラート】${title}`,
      `${body}\n\n■ お願いしたいこと\n${action}\n\n配信ダッシュボード: https://app.bluespring.co.jp/admin/social\n（同じ内容のアラートは${Math.round(REPEAT_MS / 3600000)}時間に1回までお送りします）`,
    ).catch((e) => console.error("[alert] mail failed", e));
    return true;
  } catch (e) {
    console.error("[alert] failed", e);
    return false;
  }
}

/** 解消したら、ダッシュボードの表示から外す */
export async function clearAlert(key: string): Promise<void> {
  try {
    const recent = await listRecentAlerts();
    if (!recent.some((a) => a.key === key)) return;
    await setSetting(RECENT_KEY, JSON.stringify(recent.filter((a) => a.key !== key)));
    await setSetting(`alert_last_${key}`, "").catch(() => undefined);
  } catch {
    /* noop */
  }
}

/** 投稿エラーの文面から、知らせ方 (key・見出し・お願い) を決める */
export function classifyPostError(channel: string, message: string): { key: string; title: string; action: string } {
  if (channel === "x" && /402|credits depleted/i.test(message)) {
    return {
      key: "x_credits",
      title: "X のクレジット残高切れで投稿が止まっています",
      action:
        "X の開発者コンソール (console.x.com) に @aoharu_os の開発者アカウントでログインし、Billing からクレジットを追加してください。支払いを伴うため自動では直せません。自動チャージ (残高が減ったら自動で追加) を設定すると、今後は止まらなくなります。追加後は、同じ日の未投稿分を次の枠で自動的に投稿し直します。",
    };
  }
  if (/401|403|token|expired|認証|OAuth/i.test(message)) {
    return {
      key: `${channel}_auth`,
      title: `${channel} の認証が切れて投稿できません`,
      action: `${channel} の連携をやり直してください (配信ダッシュボードの連携リンク、または Claude に「${channel} を再連携して」と依頼)。`,
    };
  }
  if (/quota|rate limit|429/i.test(message)) {
    return {
      key: `${channel}_quota`,
      title: `${channel} の利用上限に達しています`,
      action: "多くの場合は時間をおけば自動で回復し、次の実行で再開します。続く場合は Claude に調査を依頼してください。",
    };
  }
  return {
    key: `${channel}_failed`,
    title: `${channel} への投稿が失敗しています`,
    action: "次の実行で自動的にやり直します。同じアラートが続く場合は、Claude に「配信アラートを調べて」と依頼してください。",
  };
}
