import type { Lecture } from "@/lib/lecture/types";
import type { CheckGrade, LessonPlan, PlanCheck } from "./types";

// 授業案のAI点検（試作）。いまはAIを呼ばず、決まった基準で点検する。
//   正しさ        … 図解レクチャーの「よくあるまちがい」(wrong) とよく似た文が授業案にないか（文字の2つ組の重なりで比べる）
//   つまずきへの備え … 正しい説明 (right) の言葉を、授業案がどれだけ含んでいるか
//   つかみ・説明・例・確かめの1問 … 書いてあるか、短すぎないか
// 本番では、この基準をAIの採点（オシエルと同じく、根拠の引用つき）に置きかえる。

const clean = (s: string) =>
  s
    .replace(/\{\{|\}\}/g, "")
    .replace(/《[^》]*》/g, "")
    .normalize("NFKC")
    .replace(/[\s、。,.!！?？「」『』（）()・…〜~ー\-]/g, "")
    .toLowerCase();

function bigrams(s: string): Set<string> {
  const c = clean(s);
  const out = new Set<string>();
  for (let i = 0; i < c.length - 1; i++) out.add(c.slice(i, i + 2));
  return out;
}

/** b の2つ組のうち、a にもあるものの割合 */
function coverage(a: Set<string>, b: Set<string>): number {
  if (b.size === 0) return 0;
  let n = 0;
  for (const g of b) if (a.has(g)) n++;
  return n / b.size;
}

const sentences = (s: string) => s.split(/[。\n！？!?]/).map((x) => x.trim()).filter((x) => clean(x).length >= 6);

const lenGrade = (s: string, a: number, b: number): CheckGrade => (clean(s).length >= a ? "A" : clean(s).length >= b ? "B" : "C");

export function checkPlan(plan: LessonPlan, lecture: Lecture | undefined, unitName: string): PlanCheck {
  const all = [plan.title, plan.hook, plan.explain, plan.example, plan.checkQ, plan.checkA].join("\n");
  const allGrams = bigrams(all);
  const mistakes = lecture?.mistakes ?? [];

  // 正しさ：授業案の1文ずつを、まちがいと正しい説明の両方とくらべる
  const wrongFound: PlanCheck["wrongFound"] = [];
  for (const m of mistakes) {
    const w = bigrams(m.wrong);
    const r = bigrams(m.right);
    for (const s of sentences(all)) {
      const g = bigrams(s);
      const cw = coverage(g, w);
      const cr = coverage(g, r);
      if (cw >= 0.6 && cw > cr + 0.1) {
        wrongFound.push({ wrong: m.wrong.replace(/\{\{|\}\}/g, ""), right: m.right.replace(/\{\{|\}\}/g, "") });
        break;
      }
    }
  }
  const accuracy: CheckGrade = !lecture ? "B" : wrongFound.length === 0 ? "A" : "C";

  // つまずきへの備え
  //   （まちがいの説明が見つかった単元のことは、正しい言葉が重なっていても備えとは数えない）
  const found = new Set(wrongFound.map((w) => w.wrong));
  const best = mistakes.filter((m) => !found.has(m.wrong.replace(/\{\{|\}\}/g, ""))).reduce((mx, m) => Math.max(mx, coverage(allGrams, bigrams(m.right))), 0);
  const prepared: CheckGrade = !lecture ? "B" : best >= 0.3 ? "A" : best >= 0.15 ? "B" : "C";

  const hook = lenGrade(plan.hook, 20, 8);
  const explain = lenGrade(plan.explain, 60, 25);
  const example = lenGrade(plan.example, 20, 8);
  const check: CheckGrade = clean(plan.checkQ).length >= 5 && clean(plan.checkA).length >= 1 ? "A" : clean(plan.checkQ).length >= 5 ? "B" : "C";

  const items: PlanCheck["items"] = [
    { key: "accuracy", label: "正しさ", grade: accuracy, note: !lecture ? "この単元の教材と照らし合わせられませんでした" : wrongFound.length ? "よくあるまちがいと同じ説明があります。下を見てなおしましょう" : "教材の「よくあるまちがい」と同じ説明はありません" },
    { key: "prepared", label: "つまずきへの備え", grade: prepared, note: prepared === "A" ? "生徒がまちがえやすい所を、正しく説明しています" : "教材の「よくあるまちがい」の正しい説明を、授業に入れましょう" },
    { key: "hook", label: "つかみ", grade: hook, note: hook === "A" ? "なぜ学ぶのかが伝わります" : "身近な例や問いかけで、最初の1分をつくりましょう" },
    { key: "explain", label: "説明", grade: explain, note: explain === "A" ? "順番に説明できています" : "説明をもう少し、順を追って書きましょう" },
    { key: "example", label: "たとえ・例", grade: example, note: example === "A" ? "具体例があります" : "自分の言葉のたとえや例を入れましょう" },
    { key: "check", label: "確かめの1問", grade: check, note: check === "A" ? "授業の最後に、わかったかを確かめられます" : "最後に解いてもらう1問と、その答えを書きましょう" },
  ];
  const weight: Record<string, number> = { accuracy: 30, prepared: 15, hook: 10, explain: 20, example: 15, check: 10 };
  const rate: Record<CheckGrade, number> = { A: 1, B: 0.5, C: 0 };
  const score = Math.round(items.reduce((a, it) => a + weight[it.key] * rate[it.grade], 0));
  return { score, items, wrongFound, unitName };
}
