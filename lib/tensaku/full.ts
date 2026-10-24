import { DOC_LABEL, maskPersonal, type DocKind } from "./preview";

// /tensaku の「登録後の全文添削」。テンサクン本体 (essay.bluespring.co.jp) はスマホで画面がはみ出すため、
// スマホでも崩れないこのページの中で、点数・観点別の評価・すべての指摘・改善のポイントまで返す。
// 回数はテンサクンと同じ枠 (app_key "tensakun" / action "score") で数える (無料は月2本、Pro以上は無制限)。

export const FULL_MAX_CHARS = 2000;

export interface FullCriterion {
  name: string; // 観点名
  score: number; // 0〜25
  comment: string;
}

export interface FullPoint {
  quote: string;
  problem: string;
  hint: string;
}

export interface FullResult {
  total: number; // 0〜100 (観点の合計)
  summary: string;
  criteria: FullCriterion[]; // 4つ
  points: FullPoint[]; // 3〜8
  nextStep: string; // 次に直すと一番点が上がること
}

const SYSTEM = `あなたは大学受験（総合型選抜・学校推薦型選抜）の書類を添削する、経験豊富な指導者です。
受験生が書いた文章を、大学の先生が読む目線で採点し、直すべき箇所をすべて具体的に示します。

採点:
- 次の4観点を、それぞれ0〜25点で採点する。合計が100点満点。
  1. 結論と主張の明確さ（何を言いたいかが一読で分かるか）
  2. 具体性と根拠（体験・事実・数字で裏付けられているか）
  3. 志望先・課題との接続（志望理由書なら大学で学ぶ内容とのつながり、小論文なら課題への答え）
  4. 構成と表現（段落の流れ、文の長さ、言葉づかい）
- 書きかけ・短い文章でも、その時点の出来で採点する。甘くも辛くもしない。

指摘:
- 直すべき箇所を重要な順に3〜8個。quote は本文からそのまま抜き出した箇所（40字以内、言い換えない）。
- problem は、なぜ評価が下がるかを1〜2文で。hint は、どう直すかの方向を1〜2文で。書き直した文章そのものは書かない。

その他:
- summary は、良い点を1つ認めたうえで全体の課題を1〜2文で。nextStep は「次にこれを直すと一番点が上がる」ことを1文で。
- 高校生が読んで傷つかない言葉づかいにする。合否の予想はしない。個人情報には触れない。
- 出力は次のJSONだけ。前後に文章を付けない。
{"summary":"...","criteria":[{"name":"結論と主張の明確さ","score":0,"comment":"..."},{"name":"具体性と根拠","score":0,"comment":"..."},{"name":"志望先・課題との接続","score":0,"comment":"..."},{"name":"構成と表現","score":0,"comment":"..."}],"points":[{"quote":"...","problem":"...","hint":"..."}],"nextStep":"..."}`;

function clampScore(n: unknown): number {
  const v = Math.round(Number(n));
  return Number.isFinite(v) ? Math.max(0, Math.min(25, v)) : 0;
}

export async function runFull(input: { kind: DocKind; target: string; text: string }): Promise<FullResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("not_configured");
  const model = process.env.TENSAKU_FULL_MODEL ?? process.env.TENSAKU_PREVIEW_MODEL ?? "claude-haiku-4-5";
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
    body: JSON.stringify({ model, max_tokens: 2500, system: SYSTEM, messages: [{ role: "user", content: user }] }),
    signal: AbortSignal.timeout(55_000),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}`);
  const json = (await res.json()) as { content?: { type: string; text?: string }[] };
  const raw = (json.content ?? []).map((c) => c.text ?? "").join("");
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("bad_output");
  const p = JSON.parse(raw.slice(start, end + 1)) as Partial<FullResult>;

  const criteria = (p.criteria ?? []).slice(0, 4).map((c) => ({
    name: String(c?.name ?? "").slice(0, 30),
    score: clampScore(c?.score),
    comment: String(c?.comment ?? "").slice(0, 200),
  }));
  const points = (p.points ?? [])
    .filter((x) => x && typeof x.problem === "string")
    .slice(0, 8)
    .map((x) => ({ quote: String(x.quote ?? "").slice(0, 50), problem: String(x.problem).slice(0, 220), hint: String(x.hint ?? "").slice(0, 220) }));
  if (criteria.length !== 4 || points.length === 0) throw new Error("bad_output");
  return {
    total: criteria.reduce((s, c) => s + c.score, 0),
    summary: String(p.summary ?? "").slice(0, 300),
    criteria,
    points,
    nextStep: String(p.nextStep ?? "").slice(0, 200),
  };
}
