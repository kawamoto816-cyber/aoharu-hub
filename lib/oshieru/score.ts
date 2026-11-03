import type { AxisKey, AxisResult, Grade, ScoreResult, Turn } from "./types";

// 採点の決まり（4観点×3段階）とマスター認定。AIの採点はぶれるので、ここで次のことをする。
//   - A・B の評価には、生徒の発言からの引用が必要。引用が会話にない評価は捨てる（grade=null「判定できず」）。
//   - マスター認定は「正確さ◎」「残り3観点すべて○以上」「言い直しを正しく判定できた」の3つがそろったとき。

export const AXES: { key: AxisKey; label: string; desc: Record<Grade, string> }[] = [
  { key: "accuracy", label: "正確さ", desc: { A: "単元の内容と食いちがいがない", B: "小さな言いまちがいがある", C: "まちがった説明がある" } },
  { key: "clarity", label: "わかりやすさ", desc: { A: "順番に、短い文で説明できた", B: "伝わるが、とびとびになった", C: "ハルが何度も聞き返した" } },
  { key: "example", label: "たとえ・例", desc: { A: "自分でたとえや具体例を出した", B: "ヒントを使って出せた", C: "出せなかった" } },
  { key: "misconception", label: "つまずきへの対応", desc: { A: "誤解の「わけ」に答え、言い直しのまちがいにも気づいた", B: "正しい答えは言えたが、わけが弱い", C: "誤解がとけなかった" } },
];

export const GRADE_MARK: Record<Grade, string> = { A: "◎", B: "○", C: "△" };
export const GRADE_LABEL: Record<Grade, string> = { A: "できた", B: "もう少し", C: "これから" };

const norm = (s: string) => s.replace(/[\s　、。,.!！?？「」『』（）()・…〜~ー-]/g, "").normalize("NFKC").toLowerCase();

/** 引用が生徒の発言の中にあるか（空白・句読点のちがいは無視） */
export function quoteInStudent(quote: string, turns: Turn[]): boolean {
  const q = norm(quote);
  if (q.length < 2) return false;
  const all = norm(
    turns
      .filter((t) => t.role === "student")
      .map((t) => t.text)
      .join(""),
  );
  return all.includes(q);
}

/** AIの返した評価を検査する。引用がないA・Bは捨てる。Cは「出せなかった」こともあるので引用なしでもよい */
export function validateAxis(raw: unknown, turns: Turn[]): AxisResult {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const g = r.grade === "A" || r.grade === "B" || r.grade === "C" ? (r.grade as Grade) : null;
  const quote = typeof r.quote === "string" ? r.quote.slice(0, 80) : "";
  const reason = typeof r.reason === "string" ? r.reason.slice(0, 160) : "";
  if (!g) return { grade: null, quote: "", reason: "判定できませんでした" };
  if (g === "C") return { grade: "C", quote: quote && quoteInStudent(quote, turns) ? quote : "", reason };
  if (!quote || !quoteInStudent(quote, turns)) return { grade: null, quote: "", reason: "根拠の引用が会話に見つからなかったので、この評価は使いません" };
  return { grade: g, quote, reason };
}

const atLeastB = (g: Grade | null) => g === "A" || g === "B";

export function isMastered(axes: Record<AxisKey, AxisResult>, judgedOk: boolean): boolean {
  return axes.accuracy.grade === "A" && atLeastB(axes.clarity.grade) && atLeastB(axes.example.grade) && atLeastB(axes.misconception.grade) && judgedOk;
}

/** 合格に足りないとき、どこをのばせばよいかの1文（AIが返さなかったときの予備） */
export function fallbackAdvice(res: Pick<ScoreResult, "axes" | "judgedOk">): string {
  if (!res.judgedOk) return "ハルの言い直しを、もう一度じっくり読んで判定してみよう。";
  for (const a of AXES) {
    const g = res.axes[a.key].grade;
    if (a.key === "accuracy" ? g !== "A" : !atLeastB(g)) return `「${a.label}」をのばすと合格。${a.desc.A}をめざそう。`;
  }
  return "";
}
