// 生物「バイオテクノロジー」の単元模試 (A: PCR 法の倍々の計算3問 ＋ B: プール6問から3問)。問題はすべてオリジナル。
// 検算: n サイクル後の量＝はじめの量×2ⁿ を calc に「2 を n 回かける式」で書き、scripts/check-moshi.ts がシード1〜100で照合する。
// 社会とのかかわり (ゲノム編集・iPS 細胞・遺伝情報) は、賛否を問わず「しくみ」と「議論されている点」だけを問う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-bio-biotech";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "遺伝子組換え：はさみとのりで遺伝子を運ぶ");
const S2 = L(2, "PCR法：3つの温度をくり返す");
const S3 = L(3, "倍々に増えるから、わずかなDNAでも調べられる");
const S4 = L(4, "電気泳動と塩基配列の解析");
const S5 = L(5, "遺伝子組換えとゲノム編集、iPS細胞");
const S6 = L(6, "バイオテクノロジーと社会");

const pow2 = (n: number) => Array.from({ length: n }, () => "2").join("*");

function zoka(r: Rng): QuestionBody {
  const m = r.int(1, 12);
  const n = r.int(3, 10);
  const ans = m * 2 ** n;
  return {
    prompt: `2本鎖 DNA が ${m} 分子ある試験管で PCR 法を ${n} サイクル行った。1サイクルごとに DNA が理論どおり2倍になるとすると、${n} サイクル後の DNA は何分子ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "分子", calc: `${m}*${pow2(n)}` },
    point: "n サイクルで 2ⁿ 倍",
    steps: [
      { title: "倍率", body: `1サイクルで2倍なので、${n} サイクルで 2^${n}＝${2 ** n} 倍。`, back: [S3] },
      { title: "分子の数", body: `${m}×${2 ** n}＝{{${ans}}} 分子。` },
    ],
  };
}

function cycle(r: Rng): QuestionBody {
  const n = r.int(4, 12);
  const m = r.pick([1, 2, 3, 5]);
  const goal = m * 2 ** n;
  return {
    prompt: `${m} 分子の2本鎖 DNA を PCR 法で増やして ${goal} 分子にしたい。1サイクルごとに DNA が理論どおり2倍になるとすると、何サイクル行えばよいですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], unit: "サイクル", equations: [`${m}*${pow2(n)}=${goal}`, `x=${n}`] },
    point: "何倍か求め、2を何回かけた数か考える",
    steps: [
      { title: "何倍にするか", body: `${goal}÷${m}＝${2 ** n} 倍。`, back: [S3] },
      { title: "サイクル数", body: `${2 ** n} は 2 を {{${n}}} 回かけた数なので ${n} サイクル。` },
    ],
  };
}

function hajime(r: Rng): QuestionBody {
  const n = r.int(3, 9);
  const m = r.int(2, 20);
  const fin = m * 2 ** n;
  return {
    prompt: `ある試料の DNA を PCR 法で ${n} サイクル増やしたところ、目的の2本鎖 DNA が ${fin} 分子になった。1サイクルごとに理論どおり2倍になったとすると、はじめにあった目的の DNA は何分子ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(m)], unit: "分子", calc: `${fin}/(${pow2(n)})` },
    point: "はじめの量＝最後の量÷2ⁿ",
    steps: [
      { title: "倍率", body: `${n} サイクルで 2^${n}＝${2 ** n} 倍になる。`, back: [S3] },
      { title: "もとにもどす", body: `${fin}÷${2 ** n}＝{{${m}}} 分子。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
type Back = { label: string; href: string }[];
type Skill = QuestionB["skill"];
/** 選択肢問題。opts の先頭が正解 ([選択肢, その理由]) */
const ch = (id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, body: string, back: Back, skill: Skill = "知識・技能"): QuestionB => ({
  id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt,
  answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) },
  point, steps: [{ title: "考え方", body, back }],
});
/** 語句の入力問題 */
const tm = (id: string, d: 1 | 2 | 3, prompt: string, accept: string[], near: { text: string; why: string }[], point: string, body: string, back: Back): QuestionB => ({
  id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill: "知識・技能", prompt,
  answer: { kind: "term", accept, near }, point, steps: [{ title: "考え方", body, back }],
});

const POOL: QuestionB[] = [
  tm("seigen", 1, "DNA の特定の塩基配列を見分けて切断する、DNA の「はさみ」にあたる酵素を何といいますか。", ["制限酵素"], [{ text: "DNAリガーゼ", why: "DNA リガーゼは切った断片どうしをつなぐ「のり」の役目の酵素です。" }], "はさみ＝制限酵素、のり＝DNAリガーゼ", "特定の配列で切るのが{{制限酵素}}、つなぐのが{{DNA リガーゼ}}。", [S1]),
  ch("ondo", 1, "PCR 法の1サイクルで、温度を変える順として正しいものはどれですか。", [["約95℃ → 約55〜60℃ → 約72℃", "正しい。2本鎖を分ける→プライマー結合→鎖をのばす。"], ["約72℃ → 約95℃ → 約55〜60℃", "最初に約95℃で2本鎖を1本ずつに分ける。"], ["約55〜60℃ → 約72℃ → 約95℃", "はじめに2本鎖を分けないとプライマーが結合できない。"], ["約37℃ → 約95℃ → 約72℃", "PCR 法では耐熱性の DNA ポリメラーゼを使い、37℃の段階はない。"]], "分ける95℃ → 結合55〜60℃ → のばす72℃", "約{{95℃}}で1本ずつに分け、約{{55〜60℃}}でプライマーを結合、約{{72℃}}で DNA ポリメラーゼが鎖をのばす。", [S2]),
  ch("eido", 2, "電気泳動で DNA 断片が移動する向きと速さについて正しいものはどれですか。", [["陽極（＋）へ向かい、短い断片ほど遠くまで移動する", "正しい。DNA は負の電気を帯び、短いほどゲルの網目を通りやすい。"], ["陰極（−）へ向かい、短い断片ほど遠くまで移動する", "DNA はリン酸をふくみ負に帯電しているので陽極へ移動する。"], ["陽極（＋）へ向かい、長い断片ほど遠くまで移動する", "長い断片ほどゲルの網目にじゃまされて遅い。"], ["電圧をかけても移動しない", "DNA は帯電しているので電圧で移動する。"]], "DNA は負 → 陽極へ。短いほど速い", "DNA は{{リン酸}}をふくみ負に帯電 → {{陽極}}へ。ゲルの網目のため{{短い断片ほど}}遠くへ進む。", [S4], "思考・判断・表現"),
  ch("rna", 2, "ウイルスのわずかな RNA を PCR 法で調べるとき、PCR の前に行うことはどれですか。", [["逆転写酵素で RNA から DNA をつくる", "正しい。DNA にしてから PCR で増やす。"], ["制限酵素で RNA を切断する", "制限酵素は DNA の特定の配列を切る酵素で、この目的には使わない。"], ["RNA をそのまま電気泳動する", "それでは量が少なすぎて調べにくい。"], ["RNA をプラスミドに組みこむ", "これは遺伝子組換えの操作で、PCR の前処理ではない。"]], "RNA は逆転写酵素で DNA にしてから増やす", "PCR で増やせるのは DNA。RNA は{{逆転写酵素}}で{{DNA}}にしてから増やす。", [S3]),
  ch("genome", 3, "ゲノム編集と、これまでの遺伝子組換えのちがいとして正しいものはどれですか。", [["ゲノム編集はゲノム上の狙った配列を切断して書きかえ、遺伝子組換えは外から遺伝子を入れる", "正しい。しくみがちがう技術として区別される。"], ["ゲノム編集は外からプラスミドを入れて遺伝子をふやす", "これはベクターを使う遺伝子組換えの説明。"], ["ゲノム編集は PCR 法で DNA を増やす技術である", "PCR 法は DNA を試験管内で増やす方法で、ゲノム編集とは別。"], ["どちらも DNA を変えないで、タンパク質だけを変える", "どちらも DNA（遺伝子）にはたらきかける技術。"]], "ゲノム編集＝狙った配列を切って書きかえる", "CRISPR-Cas9 などで{{狙った配列を切断}}し、遺伝子をこわしたり書きかえたりするのが{{ゲノム編集}}。", [S5], "思考・判断・表現"),
  ch("shakai", 3, "遺伝子の技術をめぐって社会で議論されている点として、講義で紹介された内容に合うものはどれですか。", [["遺伝子組換え生物が自然の生態系に広がらないようにするルールや、遺伝情報という個人情報の扱い", "正しい。さまざまな立場から議論が続いている点として挙げられている。"], ["PCR 法で DNA が2倍になるかどうか", "これは原理として確かめられていることで、社会の議論の点ではない。"], ["DNA が陽極へ移動するかどうか", "電気泳動の原理であり、議論の対象ではない。"], ["制限酵素が DNA を切るかどうか", "これも確かめられた性質で、社会の議論ではない。"]], "ルールづくり・個人情報・受精卵への応用など", "生態系への広がりを防ぐ{{ルール}}、{{遺伝情報}}の扱い、ヒトの受精卵への応用などが議論されている。", [S6], "思考・判断・表現"),
];

export const H_SCI_BIO_BIOTECH_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "PCR 法の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "zoka", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: zoka },
        { id: "hajime", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: hajime },
        { id: "cycle", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: cycle },
      ],
    },
    { title: "遺伝子の技術", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
