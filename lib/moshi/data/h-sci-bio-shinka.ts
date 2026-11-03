// 生物「生命の起源と進化」の単元模試 (A: ハーディ・ワインベルグの法則の計算2問 ＋ B: プール8問から4問)。問題はすべてオリジナル。
// 検算: aa の割合 q² から q を出し、Aa＝2pq・AA＝p² を calc に書き、scripts/check-moshi.ts がシード1〜100で照合する。
//   q は 0.1 きざみ (表で持つ) なので、q²・2pq は % にすると小数第1位以内で割り切れる。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-bio-shinka";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "地球の誕生から生命の誕生へ");
const S2 = L(2, "酸素がふえて、生物と地球が変わった");
const S3 = L(3, "細胞内共生説：ミトコンドリアと葉緑体の起源");
const S4 = L(4, "大型の生物の出現と、陸上への進出");
const S5 = L(5, "進化のしくみ：突然変異と自然選択・遺伝的浮動");
const S6 = L(6, "ハーディ・ワインベルグの法則");
const S7 = L(7, "進化の証拠と、多様な生物が生まれるパターン");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
/** q×10 */
const Q10 = [1, 2, 3, 4, 5, 6, 7];

function hetero(r: Rng): QuestionBody {
  const q10 = r.pick(Q10);
  const q = q10 / 10;
  const p = 1 - q;
  const aa = q10 * q10; // %
  const het = 2 * (10 - q10) * q10; // %
  const target = r.pick(["Aa", "AA"]);
  const ans = target === "Aa" ? het : (10 - q10) * (10 - q10);
  return {
    prompt: `ハーディ・ワインベルグの法則が成り立つ大きな集団で、潜性の形質を示す aa の個体が全体の ${aa}% であった。この集団で遺伝子型が ${target} の個体は全体の何%ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "%", calc: target === "Aa" ? `2*(1-${f(q)})*${f(q)}*100` : `(1-${f(q)})*(1-${f(q)})*100` },
    point: "aa＝q² → q、AA：Aa：aa＝p²：2pq：q²",
    steps: [
      { title: "a の頻度 q", body: `q²＝${f(aa / 100)} なので q＝${f(q)}、p＝1−q＝${f(p)}。`, back: [S6] },
      { title: target, body: target === "Aa" ? `2pq＝2×${f(p)}×${f(q)}＝${f(het / 100)} → {{${het}}}%。` : `p²＝${f(p)}×${f(p)}＝${f(ans / 100)} → {{${ans}}}%。` },
    ],
  };
}

function hindo(r: Rng): QuestionBody {
  const q10 = r.pick(Q10);
  const aa = q10 * q10;
  const N = r.pick([1000, 2000, 5000, 10000]);
  const cnt = (N * aa) / 100;
  return {
    prompt: `ハーディ・ワインベルグの法則が成り立つ ${N} 個体の集団で、潜性の形質を示す aa の個体が ${cnt} 個体いた。この集団の対立遺伝子 a の遺伝子頻度 q はいくつですか。小数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(q10 / 10)], calc: `${q10}/10`, equations: [`x*x=${cnt}/${N}`] },
    point: "aa の割合＝q²",
    steps: [
      { title: "aa の割合", body: `${cnt}÷${N}＝${f(aa / 100)}。これが q²。`, back: [S6] },
      { title: "q", body: `2乗して ${f(aa / 100)} になる正の数なので q＝{{${f(q10 / 10)}}}。` },
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
  // ---- 基本 ----
  tm("kagaku", 1, "原始の地球で、簡単な無機物からアミノ酸などの有機物ができ、生命が生じるまでの過程を何といいますか。", ["化学進化"], [{ text: "自然選択", why: "自然選択は、生存や繁殖に有利な形質をもつ個体が多く子を残すことです。" }], "生命誕生までの過程＝化学進化", "無機物 → 有機物 → 生命 と進んだ過程を{{化学進化}}という。", [S1]),
  ch("kyosei", 1, "細胞内共生説で、ミトコンドリアと葉緑体のもとになったと考えられている生物の組み合わせはどれですか。", [["ミトコンドリア：好気性細菌、葉緑体：シアノバクテリア", "正しい。"], ["ミトコンドリア：シアノバクテリア、葉緑体：好気性細菌", "逆。"], ["どちらもアーキア", "講義ではどちらも細菌由来と説明されている。"], ["どちらも真核生物の核の一部", "もとは独立した原核生物と考えられている。"]], "ミトコンドリア＝好気性細菌、葉緑体＝シアノバクテリア", "{{ミトコンドリア}}は好気性細菌、{{葉緑体}}は{{シアノバクテリア}}から生じたとされる。", [S3]),
  ch("sojitsu", 1, "形やはたらきは似ていても、発生の起源がちがう器官を何といいますか。", [["相似器官", "正しい。"], ["相同器官", "相同器官は起源が同じで、形やはたらきがちがう器官。"], ["痕跡器官", "はたらきを失って小さくなった器官。"], ["感覚器官", "受容器のこと。"]], "起源がちがい形が似る＝相似器官", "起源が同じ＝{{相同器官}}、起源がちがうのに似ている＝{{相似器官}}。", [S7]),
  // ---- 標準 ----
  ch("sanso", 2, "シアノバクテリアの光合成で酸素がふえたことが、のちの生物の陸上進出を可能にした理由として正しいものはどれですか。", [["大気中の酸素からオゾン層ができ、有害な紫外線が弱まったから", "正しい。"], ["酸素がふえて気温が上がったから", "講義で説明されたのはオゾン層による紫外線の減少。"], ["酸素が水をつくり、陸が湿ったから", "そのような説明はされていない。"], ["酸素が二酸化炭素を増やしたから", "関係しない。"]], "酸素 → オゾン層 → 紫外線が弱まる", "酸素から{{オゾン層}}ができ、有害な{{紫外線}}が弱まったことが陸上進出を可能にした。", [S2], "思考・判断・表現"),
  ch("fudo", 2, "生存や繁殖の有利・不利とは関係なく、偶然によって遺伝子頻度が変わることを何といいますか。", [["遺伝的浮動", "正しい。"], ["自然選択", "自然選択は有利な形質をもつ個体が多く子を残すことで起こる。"], ["突然変異", "突然変異は DNA の塩基配列が変わること。"], ["隔離", "隔離は集団が交配できなくなること。"]], "偶然で変わる＝遺伝的浮動", "偶然による遺伝子頻度の変化が{{遺伝的浮動}}。有利・不利によるものが{{自然選択}}。", [S5]),
  ch("cambria", 2, "古生代のカンブリア紀に起こったこととして正しいものはどれですか。", [["かたい殻や目をもつ多様な動物が短い期間に現れた", "正しい。カンブリア紀の大爆発。"], ["やわらかいからだの大型生物（エディアカラ生物群）が初めて現れた", "エディアカラ生物群は約6億〜5.4億年前で、カンブリア紀より前。"], ["シアノバクテリアが初めて現れた", "シアノバクテリアはもっと古くから存在する。"], ["地球が誕生した", "地球の誕生は約46億年前。"]], "カンブリア紀＝殻や目をもつ動物の多様化", "カンブリア紀には{{かたい殻や目}}をもつ多様な動物が短期間に現れた（{{カンブリア紀の大爆発}}）。", [S4]),
  // ---- 発展 ----
  ch("hw-joken", 3, "ハーディ・ワインベルグの法則が成り立つ条件に入らないものはどれですか。", [["自然選択がはたらいている", "正しい。自然選択がはたらくと遺伝子頻度が変わる。"], ["集団が十分大きい", "条件の1つ（遺伝的浮動の影響が小さい）。"], ["突然変異が起こらない", "条件の1つ。"], ["移出入がなく、自由に交配する", "条件の1つ。"]], "条件：大集団・突然変異なし・選択なし・移出入なし・自由交配", "十分大きく、{{突然変異・自然選択・移出入がなく}}、{{自由に交配}}する集団で遺伝子頻度は変わらない。", [S6], "思考・判断・表現"),
  ch("shuren", 3, "系統のちがう生物が、似た環境で似た形になることを何といいますか。", [["収れん", "正しい。"], ["適応放散", "共通の祖先から多様な系統に分かれること。"], ["種分化", "別の種に分かれること。"], ["化学進化", "生命誕生までの過程。"]], "ちがう系統が似る＝収れん", "似た環境で似た形になるのが{{収れん}}。共通の祖先から多様に分かれるのが{{適応放散}}。", [S7], "思考・判断・表現"),
];

export const H_SCI_BIO_SHINKA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "遺伝子頻度の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hindo", type: "A", difficulty: 1, points: 17, seconds: 80, skill: "知識・技能", generate: hindo },
        { id: "hetero", type: "A", difficulty: 2, points: 18, seconds: 100, skill: "思考・判断・表現", generate: hetero },
      ],
    },
    { title: "生命の起源と進化のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
  ],
};
