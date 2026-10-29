import { createHash } from "node:crypto";
import { getSetting, setSetting } from "@/lib/social/store";

// /tensaku の「登録前のお試し添削」。貼られた文章に、AIが指摘を3つだけ返す。
// 全文の添削・点数・改善のポイントはテンサクン (登録後) で見てもらう、という導線の入口。
//
// 守っていること:
//   - 入力文は保存しない (ログにも出さない)。メールアドレス・電話番号らしき文字列は送る前に伏せる。
//   - 費用の上限: 1日の総回数 (TENSAKU_PREVIEW_DAILY_CAP, 既定 200) と、同じ人 (IP) の1日の回数 (3回)。
//   - ANTHROPIC_API_KEY が未設定なら、機能を止めて「準備中」を返す。

export type DocKind = "shibo" | "shoronbun" | "jiko";

export const DOC_LABEL: Record<DocKind, string> = {
  shibo: "志望理由書",
  shoronbun: "小論文",
  jiko: "自己推薦書・自己PR",
};

export const MIN_CHARS = 80;
// 小論文は1,000〜1,200字の課題も多いため、お試しも1,200字まで受ける (2026-10: 800字だと小論文の人が貼れずに離脱していた)
export const MAX_CHARS = 1200;
const PER_IP_PER_DAY = 3;

export interface PreviewPoint {
  quote: string; // 本文から抜き出した該当箇所 (30字以内)
  problem: string; // 何が問題か
  hint: string; // どう直すかの方向 (書き直し例そのものは出さない)
}

export interface PreviewResult {
  summary: string; // 総評 1文
  points: PreviewPoint[]; // 3つ
}

export function maskPersonal(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "（メールアドレス）")
    .replace(/0\d{1,4}-?\d{1,4}-?\d{3,4}/g, "（電話番号）");
}

function jstDate(): string {
  return new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);
}

// 同じインスタンス内の簡易カウンタ (IPごと)。インスタンスをまたぐ分は全体上限で抑える。
const ipCounter = new Map<string, { date: string; n: number }>();

export function hashIp(ip: string): string {
  return createHash("sha256").update(`tensaku:${ip}`).digest("hex").slice(0, 16);
}

export function checkIpLimit(ipHash: string): boolean {
  const today = jstDate();
  const cur = ipCounter.get(ipHash);
  if (!cur || cur.date !== today) {
    ipCounter.set(ipHash, { date: today, n: 1 });
    return true;
  }
  if (cur.n >= PER_IP_PER_DAY) return false;
  cur.n += 1;
  return true;
}

/** 1日の総回数の上限。DBが読めないときは安全側 (止める) に倒す */
export async function takeDailyQuota(): Promise<boolean> {
  const cap = Number(process.env.TENSAKU_PREVIEW_DAILY_CAP ?? "200");
  const key = `tensaku_preview_count:${jstDate()}`;
  try {
    const n = Number((await getSetting(key)) ?? "0");
    if (n >= cap) return false;
    await setSetting(key, String(n + 1));
    return true;
  } catch {
    return false;
  }
}

const SYSTEM = `あなたは大学受験（総合型選抜・学校推薦型選抜）の書類を添削する、経験豊富な指導者です。
受験生が書いた文章の「いちばん直すと良くなる箇所」を3つだけ選び、短く具体的に指摘します。

守ること:
- 指摘は3つ。重要な順に並べる。
- quote には本文からそのまま抜き出した箇所を30字以内で入れる（言い換えない）。
- problem は、なぜ評価が下がるかを1〜2文で。読み手（大学の先生）の目線で書く。
- hint は、どう直せばよいかの方向を1〜2文で。書き直した文章そのものは書かない（それは本番の添削で返す）。
- summary は、この文章の良い点を1つ認めたうえで、全体の課題を1文で。
- 高校生が読んで傷つかない言葉づかいにする。不安を煽らない。合否の予想はしない。
- 本文に名前・学校名などの個人情報があっても、それには触れない。
- 出力は次のJSONだけ。前後に文章を付けない。
{"summary":"...","points":[{"quote":"...","problem":"...","hint":"..."},{"quote":"...","problem":"...","hint":"..."},{"quote":"...","problem":"...","hint":"..."}]}`;

export async function runPreview(input: { kind: DocKind; target: string; text: string }): Promise<PreviewResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("not_configured");
  const model = process.env.TENSAKU_PREVIEW_MODEL ?? "claude-haiku-4-5";
  const user = [
    `書類の種類: ${DOC_LABEL[input.kind]}`,
    input.target ? `志望先（大学・学部）: ${input.target}` : "志望先: 未記入",
    "本文:",
    "<<<",
    maskPersonal(input.text),
    ">>>",
  ].join("\n");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model, max_tokens: 900, system: SYSTEM, messages: [{ role: "user", content: user }] }),
    signal: AbortSignal.timeout(40_000),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}`);
  const json = (await res.json()) as { content?: { type: string; text?: string }[] };
  const raw = (json.content ?? []).map((c) => c.text ?? "").join("");
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("bad_output");
  const parsed = JSON.parse(raw.slice(start, end + 1)) as PreviewResult;
  const points = (parsed.points ?? [])
    .filter((p) => p && typeof p.problem === "string" && typeof p.hint === "string")
    .slice(0, 3)
    .map((p) => ({ quote: String(p.quote ?? "").slice(0, 40), problem: p.problem.slice(0, 200), hint: p.hint.slice(0, 200) }));
  if (points.length === 0) throw new Error("bad_output");
  return { summary: String(parsed.summary ?? "").slice(0, 200), points };
}
