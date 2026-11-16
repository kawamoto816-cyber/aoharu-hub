import type { Answer, Material, QuestionBody } from "@/lib/moshi/types";

// 試験モードで問題を組みなおすときの「問題として成り立っているか」の判定。組み立て (build.ts) と検査 (scripts/check-exam.ts) の両方で使う。
//   1. 指示のない問題: 問題文に「〜しなさい」「〜ですか」などの指示がない (指示が元の節の lead にしか書いていない)
//   2. 答えのもれ: 同じ大問の中で、ある小問の答え (値・語句) が、別の小問の問題文・選択肢に出ている
//   3. 資料の番号: 資料の頭の「(6)」「(1)〜(3) は」は、その資料を使う小問の番号 (元の節での番号)
//   4. 小問の番号の参照: 問題文・解説の「(3) の答え」「(2) の比例で」の番号を、組みなおした番号に書きかえる

// ---- 1. 指示 ----

/** 問題文に指示 (答え方) が書いてあるか */
const INSTR = /なさい|せよ|答え|求め|選び|選べ|書き|書け|示せ|直せ|表せ|ですか|ますか|でしょうか|か[。？?]|[?？]|は何|どれ|どちら|ください|しよう|みよう|ましょう|\b(choose|answer|write|fill|put|what|which|who|why|how|where|when|listen|read|translate|complete|select|make|rewrite|change|use)\b/i;
/** 会話の行 (「A: Do you mind …?」「Ken: …」) の「?」は指示ではないので、会話の行は見ない */
const DIALOGUE = /^\s*[A-Z][A-Za-z.' ]{0,20}[:：][\x00-\x7f]*$/gm;
export const hasInstruction = (s: string) => INSTR.test(s.replace(DIALOGUE, ""));

/** 指示として中身のない lead (大問の頭にいつもある「次の問いに答えなさい。」) */
export const isGenericLead = (s: string) => splitSentences(s).every(isGenericSentence);
const isGenericSentence = (s: string) => /^(次の|あとの|後の)?(各)?問い?に答え(なさい|よ)。?$/.test(s) || /^[^。]{0,40}について、?(次の|あとの|後の)?(各)?問い?に答え(なさい|よ)。?$/.test(s);
/** 条件・前置き (分数の答え方・円周率・「〜とする」など)。指示だけの文 (「次の式を因数分解しなさい。」) とは分ける */
const CONDITION = /とき(は|に)|場合|ただし|とし|として|とします|とする|使わない|大文字|既約|有理化|小数第|円周率|度数法|根号|架空|放送/;

function splitSentences(s: string): string[] {
  return (s.match(/[^。]+。?/g) ?? []).map((x) => x.trim()).filter(Boolean);
}

/**
 * 節から小問を取り出すとき、元の節の lead に書いてあった指示・条件を移す (prompts = 取り出した小問の問題文)。
 * 問題文に指示のない小問があれば lead の指示もいっしょに、どれにも指示があれば条件・前置きだけを返す。移すものがなければ null
 */
export function carriedLead(lead: string, prompts: string[]): string | null {
  const own = prompts.every(hasInstruction);
  const kept = splitSentences(lead)
    .filter((s) => !isGenericSentence(s))
    .map((s) => s.replace(/(とし|として)、?(次の|あとの|後の)?(各)?問い?に答え(なさい|よ)。$/, "とします。").replace(/、(次の|あとの|後の)?(各)?問い?に答え(なさい|よ)。$/, "。"))
    .filter((s) => !own || CONDITION.test(s) || !/(なさい|せよ|よ)。?$/.test(s))
    .filter((s) => !prompts.every((p) => p.includes(s.replace(/。$/, ""))));
  return kept.length ? kept.join("") : null;
}

// ---- 2. 答えのもれ ----

/** くらべるための形: 全角半角・空白・桁区切り・強調・ルビをそろえる */
export function norm(s: string): string {
  return s
    .normalize("NFKC")
    .replace(/\{\{|\}\}/g, "")
    .replace(/《[^《》]*》/g, "")
    .replace(/[−–—]/g, "-")
    .replace(/(\d),(?=\d{3})/g, "$1")
    .replace(/\s+/g, "");
}

/** 答えにならない、よくある選択肢 */
const TRIVIAL = /^(正しい|誤り|誤っている|ある|ない|はい|いいえ|yes|no|true|false|すべて.*|どれも.*|[ア-ン]|[a-zA-Z]|[0-9①-⑳])$/i;

/** 小問の答えの値 (ほかの小問に出ていたら答えがもれる)。短すぎる値・どこにでも出る値は入れない */
export function answerValues(a: Answer): string[] {
  const out: string[] = [];
  const add = (raw: string, min: number) => {
    const v = norm(raw);
    if (!v || TRIVIAL.test(v)) return;
    const len = [...v].length;
    if (/^-?\d+$/.test(v) ? v.replace("-", "").length >= 3 : len >= min) out.push(v);
  };
  switch (a.kind) {
    case "num":
      for (const s of a.answer) add(s, 3);
      break;
    case "term":
      for (const s of a.accept) add(s, /^[\x00-\x7f]+$/.test(norm(s)) ? 4 : 2);
      break;
    case "choice":
      for (const i of Array.isArray(a.correct) ? a.correct : [a.correct]) {
        const o = a.options[i] ?? "";
        if ([...norm(o)].length <= 12) add(o, 2);
      }
      break;
    case "written":
      if (a.autoPart) out.push(...answerValues(a.autoPart));
      break;
  }
  return [...new Set(out)];
}

export function materialText(m: Material): string {
  return m.kind === "table" ? [m.caption, ...m.head, ...m.rows.flat()].join("\n") : m.kind === "figure" ? "" : m.body;
}

/** 値 v が文字 t に出ているか (数は前後が数字でないところだけ・英語は語の切れ目だけ) */
const RE = new Map<string, RegExp | null>();
function appears(v: string, t: string): boolean {
  if (!t.includes(v.replace(/^-/, "")) && !t.toLowerCase().includes(v.toLowerCase())) return false;
  let re = RE.get(v);
  if (re === undefined) {
    const esc = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    re = /^[-\d./]+$/.test(v) ? new RegExp(`(?<![\\d.])${esc}(?![\\d]|\\.\\d)`) : /^[\x00-\x7f]+$/.test(v) ? new RegExp(`(?<![A-Za-z])${esc}(?![A-Za-z])`, "i") : null;
    RE.set(v, re);
  }
  return re ? re.test(t) : t.includes(v);
}

/**
 * a の答えが b に出ているなら、その値 (なければ null)。same = a と b が元の同じ節の小問。
 *   数の答え: b の選択肢に出ていればもれ。問題文は同じ節のときだけ (別の節の問題の数値がたまたま同じなのは、もれではない)
 *   語句の答え: b の問題文・選択肢・資料に出ていればもれ
 *   選択の答え: b の問題文・資料に出ていればもれ (選択肢どうしが同じなのは、同じ選択肢の組から選ぶ問題なのでもれではない)
 */
export function leakOf(a: Pick<QuestionBody, "answer">, b: Pick<QuestionBody, "prompt" | "answer"> & { material?: Material[] }, same: boolean): string | null {
  const opts = b.answer.kind === "choice" ? norm(b.answer.options.join("\n")) : b.answer.kind === "order" ? norm([...b.answer.tokens, b.answer.distractor ?? ""].join("\n")) : "";
  const body = norm([b.prompt, ...(b.material ?? []).map(materialText)].join("\n"));
  const kind = a.answer.kind === "written" ? a.answer.autoPart?.kind : a.answer.kind;
  const where = kind === "num" ? (same ? [body, opts] : [opts]) : kind === "term" ? [body, opts] : [body];
  for (const v of answerValues(a.answer)) if (where.some((t) => appears(v, t))) return v;
  return null;
}

// ---- 3・4. 番号 ----

const NO = "[（(]([0-9０-９]{1,2})[)）]";
/** 資料の頭の「(6)」「(1)〜(3) は」「(1)・(2) は」→ その資料を使う小問の番号。番号がなければ null */
export function materialFor(m: Material): { nos: number[]; rest: string } | null {
  const t = m.kind === "table" ? m.caption : m.kind === "figure" ? "" : m.body;
  const head = t.match(new RegExp(`^\\s*${NO}(?:\\s*([〜～・、])\\s*${NO})*`));
  if (!head) return null;
  const nums = [...head[0].matchAll(new RegExp(NO, "g"))].map((x) => toInt(x[1]));
  const nos = /[〜～]/.test(head[0]) && nums.length === 2 ? range(nums[0], nums[1]) : nums;
  return { nos, rest: t.slice(head[0].length).replace(/^\s*(は|：|:)?[、,]?\s*/, "") };
}
const toInt = (s: string) => Number(s.normalize("NFKC"));
const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);

/** 文の中の小問の番号の参照「(3) の」「(1)〜(3) は」を map で書きかえる (map にない番号はそのまま) */
export function renumber(s: string, map: Map<number, number>): string {
  if (!map.size || !/[（(][0-9０-９]/.test(s)) return s;
  return s.replace(new RegExp(`(?<![A-Za-z0-9_)）'’])${NO}(?=\\s*(の|で|と|・|〜|～|は|より|を|に|から|まで|、|：|:|$|[（(][0-9０-９]))`, "g"), (all, d: string) => {
    const n = map.get(toInt(d));
    return n === undefined ? all : all.replace(d, String(n));
  });
}

/** 問題文の中の、前の小問の番号の参照 (検査用) */
export function referencedNos(s: string): number[] {
  return [...s.matchAll(new RegExp(`(?<![A-Za-z0-9_)）'’])${NO}(?=\\s*(の答え|の結果|で求め|の比例|の反比例|の式|の関数|の直線|の図|のとき|と同じ|で考え))`, "g"))].map((x) => toInt(x[1]));
}
