// 生物「生態系のしくみ」の単元模試 (A: 物質生産とエネルギー効率の計算3問 ＋ B: プール6問から3問)。問題はすべてオリジナル。
// 検算: 成長量＝総生産量−呼吸量−被食量−枯死量、同化量の差・生産量、エネルギー効率＝その段階の同化量÷前の段階の同化量(総生産量)×100
//   を calc に書き、scripts/check-moshi.ts がシード1〜100で照合する。効率は先に決めて同化量を逆算するので答えは整った値になる。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-bio-seitaikei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "生産者がつくった有機物の行き先");
const S2 = L(2, "消費者では「同化量」から考える");
const S3 = L(3, "エネルギーは段階ごとに減っていく");
const S4 = L(4, "生態系によって生産のしかたがちがう");
const S5 = L(5, "窒素は微生物の手を借りてめぐる");

const UN = "g/(m²·年)";

function seicho(r: Rng): QuestionBody {
  const kokyu = r.step(400, 1600, 50);
  const hishoku = r.step(50, 400, 10);
  const koshi = r.step(100, 900, 50);
  const g = r.step(50, 800, 10);
  const so = kokyu + hishoku + koshi + g;
  return {
    prompt: `ある森林の生産者について、1年あたりの量が 総生産量 ${so}、呼吸量 ${kokyu}、被食量 ${hishoku}、枯死量 ${koshi}（単位はいずれも ${UN}）であった。生産者の成長量は何 ${UN} ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(g)], unit: UN, calc: `${so}-${kokyu}-${hishoku}-${koshi}` },
    point: "純生産量＝総生産量−呼吸量、成長量＝純生産量−被食量−枯死量",
    steps: [
      { title: "純生産量", body: `${so}−${kokyu}＝${so - kokyu}。`, back: [S1] },
      { title: "成長量", body: `${so - kokyu}−${hishoku}−${koshi}＝{{${g}}} ${UN}。` },
    ],
  };
}

function seisan(r: Rng): QuestionBody {
  const funn = r.step(10, 120, 5);
  const kokyu = r.step(20, 150, 5);
  const p = r.step(5, 80, 5);
  const sesshoku = funn + kokyu + p;
  return {
    prompt: `ある一次消費者の集団について、1年あたりの摂食量が ${sesshoku}、不消化排出量が ${funn}、呼吸量が ${kokyu}（単位はいずれも ${UN}）であった。この消費者の生産量は何 ${UN} ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(p)], unit: UN, calc: `${sesshoku}-${funn}-${kokyu}` },
    point: "同化量＝摂食量−不消化排出量、生産量＝同化量−呼吸量",
    steps: [
      { title: "同化量", body: `${sesshoku}−${funn}＝${sesshoku - funn}。ふんとして出た分は取りこまれていない。`, back: [S2] },
      { title: "生産量", body: `${sesshoku - funn}−${kokyu}＝{{${p}}} ${UN}。` },
    ],
  };
}

function koritsu(r: Rng): QuestionBody {
  const so = r.step(2000, 20000, 1000);
  const eff = r.pick([5, 8, 10, 12, 15, 20]);
  const doka = (so * eff) / 100;
  return {
    prompt: `ある生態系で、生産者の総生産量が ${so} kJ/(m²·年)、一次消費者の同化量が ${doka} kJ/(m²·年) であった。一次消費者のエネルギー効率（前の段階の同化量（生産者では総生産量）に対する、その段階の同化量の割合）は何%ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(eff)], unit: "%", calc: `${doka}/${so}*100` },
    point: "エネルギー効率＝その段階の同化量÷前の段階の同化量×100",
    steps: [
      { title: "割合", body: `${doka}÷${so}×100＝{{${eff}}}%。`, back: [S3] },
      { title: "意味", body: "残りは呼吸で熱として失われたり、食べられずに残ったりする。エネルギーは上の段階ほど少なくなる。" },
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

const POOL: QuestionB[] = [
  ch("junkan", 1, "生態系での物質とエネルギーの動きについて正しいものはどれですか。", [["物質は循環するが、エネルギーは循環せず一方向に流れる", "正しい。エネルギーは最後は熱として生態系の外へ出る。"], ["物質もエネルギーも循環する", "エネルギーは熱として失われ、もどってこない。"], ["エネルギーは循環するが、物質は循環しない", "逆。"], ["物質もエネルギーも生態系の外へ出ていくだけ", "物質は分解者などによって循環する。"]], "物質は循環、エネルギーは一方向", "{{物質は循環}}するが、{{エネルギーは一方向}}に流れ、最後は熱として外へ出る。", [S3]),
  ch("koteii", 1, "大気中の N₂ を NH₄⁺ に変える窒素固定を行う生物はどれですか。", [["根粒菌", "正しい。アゾトバクターや一部のシアノバクテリアも行う。"], ["硝酸菌", "硝酸菌は NO₂⁻ を NO₃⁻ に変える硝化菌。"], ["脱窒素細菌", "脱窒素細菌は NO₃⁻ を N₂ にもどす。"], ["ふつうの緑色植物", "植物は N₂ を直接使えない。"]], "窒素固定＝根粒菌・アゾトバクターなど", "N₂ → NH₄⁺ の{{窒素固定}}は{{根粒菌}}・アゾトバクター・一部のシアノバクテリアなど。", [S5]),
  ch("doka-souto", 2, "消費者の「同化量」は、生産者のどの量にあたりますか。", [["総生産量", "正しい。取りこんだ有機物の量にあたる。"], ["純生産量", "純生産量は総生産量から呼吸量を引いたもので、消費者の生産量にあたる。"], ["成長量", "成長量は最後に残る量。"], ["枯死量", "消費者では死滅量にあたる。"]], "消費者の同化量 ⇔ 生産者の総生産量", "消費者の{{同化量}}が生産者の{{総生産量}}、消費者の生産量が生産者の純生産量にあたる。", [S2]),
  ch("shoka", 2, "土の中で NH₄⁺ を NO₃⁻ に変えるはたらき（硝化）を行う細菌の組み合わせはどれですか。", [["亜硝酸菌と硝酸菌", "正しい。まとめて硝化菌という。"], ["根粒菌とアゾトバクター", "これらは窒素固定を行う。"], ["脱窒素細菌と根粒菌", "脱窒素細菌は NO₃⁻ を N₂ にもどす。"], ["乳酸菌と酵母", "発酵を行う生物で、硝化は行わない。"]], "硝化菌＝亜硝酸菌＋硝酸菌", "NH₄⁺ は{{亜硝酸菌}}・{{硝酸菌}}（硝化菌）によって NO₃⁻ に変えられる。", [S5]),
  ch("shinrin", 3, "成熟した森林で、成長量がほぼ0になる理由として講義の内容に合うものはどれですか。", [["純生産量の多くが被食量と枯死量にまわるから", "正しい。"], ["成熟すると光合成をしなくなるから", "成熟した森林でも光合成は行われる。"], ["呼吸量が0になるから", "幹や根が多く、呼吸量はむしろ大きい。"], ["現存量が小さくなるから", "森林は現存量が大きい。"]], "成熟林：純生産量≒被食量＋枯死量", "成熟すると{{純生産量}}の多くが{{被食量と枯死量}}にまわり、成長量はほぼ0になる。", [S4], "思考・判断・表現"),
  ch("kaiyo", 3, "海洋の生態系は森林にくらべて現存量が小さいが、生産を続けられている。その理由として講義の内容に合うものはどれですか。", [["植物プランクトンが速く入れかわるから", "正しい。"], ["海洋の生産者は呼吸をしないから", "植物プランクトンも呼吸する。"], ["海洋では窒素が循環しないから", "海洋でも物質は循環する。"], ["海洋の生産者は幹や根をたくさんもつから", "これは森林の特徴で、呼吸量を大きくする。"]], "海洋：現存量は小さいがすばやく入れかわる", "海洋は現存量が小さい一方、{{植物プランクトン}}が{{速く入れかわる}}。", [S4], "思考・判断・表現"),
];

export const H_SCI_BIO_SEITAIKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "物質生産とエネルギーの計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "seicho", type: "A", difficulty: 1, points: 16, seconds: 80, skill: "知識・技能", generate: seicho },
        { id: "seisan", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: seisan },
        { id: "koritsu", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "思考・判断・表現", generate: koritsu },
      ],
    },
    { title: "生態系のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
