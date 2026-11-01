import { judge, type Answer as MathAnswer, type Verdict } from "@/lib/math/check";
import { normalize, tryParse } from "@/lib/math/parse";
import { pConst, type Coef } from "@/lib/math/value";
import type { ChoiceQ, NumQ, OrderQ, TermQ, WrittenQ } from "./types";

// 模試の採点 (画面でも scripts/check-moshi.ts でも使う。AI は使わない)。
//   choice … 全部そろって満点
//   num    … lib/math の judge()。分数・小数・負の数の表記ゆれ (+3、(−3)、0.5 と 1/2、全角) は正解にする。
//            約分忘れ・整理の途中は「あと一歩」(0点。学校のテストで減点になるので合わせる)。pair・roots は1つずつ半分
//   term   … 全角半角・空白・大文字小文字・句点をそろえて accept と照合。near に当たれば「あと一歩」
//   order  … tokens の順 (または alsoOk) と完全一致
//   written… 自己採点 (rubric のチェックの合計)

/** ok=満点、part=部分点、near=あと一歩 (値は合うが整理がまだ・惜しい語)、wrong、blank=無回答 */
export type ItemVerdict = "ok" | "part" | "near" | "wrong" | "blank";

/** 小問の答え (ページ内の state)。num は欄ごとの文字列、order は置いたトークンの番号 (画面の並びの番号ではなく tokens の番号。distractor は -1) */
export type Response =
  | { kind: "choice"; picked: number[] }
  | { kind: "num"; inputs: string[] }
  | { kind: "term"; text: string }
  | { kind: "order"; seq: number[] }
  | { kind: "written"; text: string; auto?: string[] };

export interface ItemResult {
  score: number;
  verdict: ItemVerdict;
  /** num の欄ごとの判定 */
  fields?: Verdict[];
  /** near の理由など */
  note?: string;
}

// ---- 数値 ----

function toCoef(s: string): Coef {
  const p = tryParse(s);
  const c = p && pConst(p);
  if (!c) throw new Error(`数として読めない答え: ${s}`);
  return c;
}

/** NumQ の文字列の答えを lib/math の Answer にする (Coef は Map なので静的データに直接書けない) */
export function toMathAnswer(q: NumQ): MathAnswer {
  const a = q.answer;
  switch (q.answerKind) {
    case "num":
      return { kind: "num", value: toCoef(a[0]) };
    case "surd":
      return { kind: "surd", value: toCoef(a[0]) };
    case "expr":
    case "factor": {
      const p = tryParse(a[0].replace(/²/g, "^2").replace(/³/g, "^3"));
      if (!p) throw new Error(`式として読めない答え: ${a[0]}`);
      return { kind: q.answerKind, value: p };
    }
    case "pair":
      return { kind: "pair", x: toCoef(a[0]), y: toCoef(a[1]) };
    case "roots":
      return { kind: "roots", values: [toCoef(a[0]), toCoef(a[1])] };
  }
}

/** 欄に打たれたものを、judge に渡す前にそろえる (「x=4」「4個」「+4」「(−4)」) */
export function cleanNumInput(raw: string, label?: string, unit?: string): string {
  let s = normalize(raw.replace(/，/g, ",").replace(/．/g, "."));
  if (unit) {
    const u = normalize(unit);
    if (u && s.endsWith(u)) s = s.slice(0, -u.length);
    // 単位が「π cm²」のように π から始まるとき、「2π」とだけ書いても係数として読む
    if (u.startsWith("π") && /^[+-]?[\d./]*π$/.test(s)) s = s.slice(0, -1) || "1";
  }
  const lab = label ? normalize(label).replace(/=$/, "") : "";
  if (lab && s.startsWith(`${lab}=`)) s = s.slice(lab.length + 1);
  else if (lab && s.startsWith(lab) && !/^[a-z]$/.test(lab)) s = s.slice(lab.length);
  s = s.replace(/^[a-z]=/, "");
  if (/^\+[^+-]/.test(s)) s = s.slice(1);
  const m = s.match(/^\(([+-]?[\d./√]+)\)$/);
  if (m) s = m[1].replace(/^\+/, "");
  return s;
}

/** 数として値が合っていて、小数や符号の書き方がちがうだけなら正解に格上げ */
function relax(v: Verdict, input: string): Verdict {
  if (v !== "form") return v;
  // 小数 (0.5、-1.25) は値が合えば正解。約分していない分数 (6/4) は「あと一歩」のまま
  if (/^-?\d+\.\d+$/.test(input) || /^-?\d+$/.test(input)) return "ok";
  return v;
}

export function judgeNum(q: NumQ, inputs: string[]): Verdict[] {
  const ans = toMathAnswer(q);
  const n = q.answerKind === "pair" || q.answerKind === "roots" ? 2 : 1;
  const cleaned = Array.from({ length: n }, (_, i) => cleanNumInput(inputs[i] ?? "", q.labels?.[i], q.unit));
  const vs = judge(ans, cleaned);
  return vs.map((v, i) => (cleaned[i] === "" ? "invalid" : relax(v, cleaned[i])));
}

export function gradeNum(q: NumQ, points: number, inputs: string[]): ItemResult {
  if (inputs.every((s) => !s.trim())) return { score: 0, verdict: "blank", fields: inputs.map(() => "invalid" as Verdict) };
  const fields = judgeNum(q, inputs);
  const ok = fields.filter((v) => v === "ok").length;
  const score = Math.floor((points * ok) / fields.length);
  const verdict: ItemVerdict = ok === fields.length ? "ok" : score > 0 ? "part" : fields.some((v) => v === "form") ? "near" : "wrong";
  return { score, verdict, fields, note: verdict === "near" ? "値は合っています。約分・整理まで書くと正解です。" : undefined };
}

// ---- 選択 ----

export const correctSet = (q: ChoiceQ) => (Array.isArray(q.correct) ? q.correct : [q.correct]);

export function gradeChoice(q: ChoiceQ, points: number, picked: number[]): ItemResult {
  if (picked.length === 0) return { score: 0, verdict: "blank" };
  const want = [...correctSet(q)].sort();
  const got = [...picked].sort();
  const ok = want.length === got.length && want.every((v, i) => v === got[i]);
  return { score: ok ? points : 0, verdict: ok ? "ok" : "wrong" };
}

// ---- 語句 ----

export function normTerm(s: string, caseSensitive = false): string {
  const t = s
    .normalize("NFKC")
    .replace(/[\s　]+/g, "")
    .replace(/[。．.、，,]+$/g, "")
    .replace(/[「」『』]/g, "");
  return caseSensitive ? t : t.toLowerCase();
}

const HAS_KANJI = /[㐀-鿿々]/;

export function gradeTerm(q: TermQ, points: number, text: string): ItemResult {
  if (!text.trim()) return { score: 0, verdict: "blank" };
  const t = normTerm(text, q.caseSensitive);
  const ok = q.accept.some((a) => normTerm(a, q.caseSensitive) === t);
  if (ok && q.script === "kanji" && !HAS_KANJI.test(t)) return { score: 0, verdict: "near", note: "漢字で書きましょう。" };
  if (ok) return { score: points, verdict: "ok" };
  const near = q.near?.find((n) => normTerm(n.text, q.caseSensitive) === t);
  if (near) return { score: 0, verdict: "near", note: near.why };
  return { score: 0, verdict: "wrong" };
}

// ---- 並べかえ ----

export function gradeOrder(q: OrderQ, points: number, seq: number[]): ItemResult {
  if (seq.length === 0) return { score: 0, verdict: "blank" };
  const okSeqs = [q.tokens.map((_, i) => i), ...(q.alsoOk ?? [])];
  // 同じ語が2回出るときは、番号ではなく語の並びで比べる
  const words = seq.map((i) => (i < 0 ? q.distractor ?? "" : q.tokens[i])).join("\u0000");
  const ok = okSeqs.some((s) => s.map((i) => q.tokens[i]).join("\u0000") === words);
  return { score: ok ? points : 0, verdict: ok ? "ok" : "wrong" };
}

// ---- 記述 (自己採点) ----

export function gradeWritten(q: WrittenQ, text: string, checks: boolean[]): ItemResult {
  if (!text.trim()) return { score: 0, verdict: "blank" };
  const score = q.rubric.reduce((a, r, i) => a + (checks[i] ? r.points : 0), 0);
  const full = q.rubric.reduce((a, r) => a + r.points, 0);
  return { score, verdict: score === full ? "ok" : score > 0 ? "part" : "wrong" };
}

/** 記述の答えに keywords が入っているか (自己採点の目安。式の空白・全角はそろえて探す) */
export function keywordHits(text: string, keywords: string[] = []): string[] {
  const t = normTerm(normalize(text));
  return keywords.filter((k) => t.includes(normTerm(normalize(k))));
}
