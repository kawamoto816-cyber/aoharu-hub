// 小5算数「合同な図形」の単元模試 (A: 数値・対応を入れかえる生成型)。問題はすべてオリジナル。
// 辺の長さ・角の大きさは rng で決め、対応する辺・角はその値をそのまま答えにする。calc で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-goudou";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_KASANARU = { label: "ぴったり重なれば合同", href: L(1) };
const BACK_TAIOU = { label: "対応する辺と角は等しい", href: L(2) };
const BACK_3TSU = { label: "合同な三角形は、3つのことでかける", href: L(3) };
const BACK_TEJUN = { label: "「2辺と間の角」でかく手順", href: L(4) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}

/** 3辺 (三角形になる組) */
function sides(r: Rng): [number, number, number] {
  for (;;) {
    const a = r.int(3, 9);
    const b = r.int(3, 9);
    const c = r.int(3, 9);
    if (a + b > c && b + c > a && c + a > b && new Set([a, b, c]).size === 3) return [a, b, c];
  }
}
const EDGES = [
  ["AB", "DE"],
  ["BC", "EF"],
  ["CA", "FD"],
] as const;

function hen(r: Rng): QuestionBody {
  const s = sides(r);
  const i = r.int(0, 2);
  return {
    prompt: `三角形ABCと三角形DEFは合同で、頂点《ちょうてん》AとD、BとE、CとFがそれぞれ対応しています。辺ABが ${s[0]}cm、辺BCが ${s[1]}cm、辺CAが ${s[2]}cm のとき、辺${EDGES[i][1]}は何cmですか。`,
    answer: num(s[i], `${s[i]}`, "cm"),
    point: "合同な図形では、対応する辺の長さは等しい",
    steps: [
      { title: "対応する辺を見つける", body: `辺${EDGES[i][1]}に対応するのは、辺${EDGES[i][0]}です（DとA、EとB、FとCが対応）。`, back: [BACK_TAIOU] },
      { title: "長さは等しい", body: `辺${EDGES[i][0]}＝${s[i]}cm なので、辺${EDGES[i][1]}も {{${s[i]}cm}} です。`, trap: "見た目の位置（上・下・左・右）で決めない。三角形の向きが変わっていても、頂点《ちょうてん》の対応で決めます。" },
    ],
  };
}

function kaku(r: Rng): QuestionBody {
  const b = r.int(35, 80);
  const c = r.int(35, 80);
  const a = 180 - b - c;
  const ask = r.pick([
    ["D", "A", a],
    ["E", "B", b],
    ["F", "C", c],
  ] as const);
  return {
    prompt: `三角形ABCと三角形DEFは合同で、頂点《ちょうてん》AとD、BとE、CとFがそれぞれ対応しています。角Aが ${a}°、角Bが ${b}°、角Cが ${c}° のとき、角${ask[0]}は何度ですか。`,
    answer: num(ask[2], `${ask[2]}`, "°"),
    point: "合同な図形では、対応する角の大きさも等しい",
    steps: [
      { title: "対応する角", body: `角${ask[0]}に対応するのは角${ask[1]}なので、角${ask[0]}＝{{${ask[2]}°}} です。`, back: [BACK_TAIOU] },
    ],
  };
}

const CAN: [string, string][] = [
  ["3つの辺の長さ", "3つの辺の長さがわかれば、コンパスを使って三角形が1つに決まります。"],
  ["2つの辺の長さと、その間の角の大きさ", "2つの辺とその間の角がわかれば、三角形が1つに決まります。"],
  ["1つの辺の長さと、その両はしの角の大きさ", "1つの辺と両はしの角がわかれば、2本の線が交わる点が1つに決まります。"],
];
const CANNOT: [string, string][] = [
  ["3つの角の大きさ", "角の大きさが同じでも、大きい三角形も小さい三角形もかけます。長さが決まらないので、合同になるとはかぎりません。"],
  ["2つの辺の長さだけ", "2つの辺の長さだけでは、間の角を開いたりとじたりして、いろいろな三角形ができます。"],
  ["1つの辺の長さと、1つの角の大きさだけ", "1つの辺と1つの角だけでは、もう1つの辺の長さが決まらず、三角形が1つに決まりません。"],
];

function joken(r: Rng): QuestionBody {
  const no = r.bool();
  return {
    prompt: no ? "次のうち、それがわかっても、合同な三角形がかけるとはかぎらないものはどれですか。" : "次のうち、それがわかれば、かならず合同な三角形がかけるものはどれですか。",
    answer: no ? choice(r, r.pick(CANNOT), CAN) : choice(r, r.pick(CAN), CANNOT),
    point: "辺・角の3つ（3辺、2辺と間の角、1辺と両はしの角）",
    steps: [
      { title: "形が1つに決まるか", body: "合同な三角形がかけるのは、{{3つの辺}}、{{2つの辺とその間の角}}、{{1つの辺とその両はしの角}}がわかるときです。", back: [BACK_3TSU] },
    ],
  };
}

function heikou(r: Rng): QuestionBody {
  const ab = r.int(3, 8);
  const bc = r.int(ab + 1, 12);
  const b = r.step(50, 80, 5);
  const ask = r.pick(["CD", "DA", "D"] as const);
  const map = {
    CD: { name: "辺CD", ans: ab, unit: "cm", from: `辺AB（${ab}cm）` },
    DA: { name: "辺DA", ans: bc, unit: "cm", from: `辺BC（${bc}cm）` },
    D: { name: "角D", ans: b, unit: "°", from: `角B（${b}°）` },
  }[ask];
  return {
    prompt: `平行四辺形ABCDに対角線ACをひくと、三角形ABCと三角形CDAは合同になります（頂点《ちょうてん》AとC、BとD、CとAが対応）。辺ABが ${ab}cm、辺BCが ${bc}cm、角Bが ${b}° のとき、${map.name}は${map.unit === "cm" ? "何cm" : "何度"}ですか。`,
    answer: num(map.ans, `${map.ans}`, map.unit),
    point: "合同な2つの三角形の、対応する辺・角を見つける",
    steps: [
      { title: "対応を確かめる", body: `三角形ABCと三角形CDAでは、AとC、BとD、CとAが対応します。${map.name}に対応するのは${map.from}です。`, back: [BACK_TAIOU] },
      { title: "等しい", body: `合同なので、${map.name}＝{{${map.ans}${map.unit}}} です。`, back: [BACK_KASANARU] },
    ],
  };
}

function mawari(r: Rng): QuestionBody {
  const s = sides(r);
  return {
    prompt: `三角形ABCと三角形DEFは合同で、頂点《ちょうてん》AとD、BとE、CとFがそれぞれ対応しています。辺ABが ${s[0]}cm、辺EFが ${s[1]}cm、辺FDが ${s[2]}cm のとき、三角形ABCのまわりの長さは何cmですか。`,
    answer: num(s[0] + s[1] + s[2], `${s[0]}+${s[1]}+${s[2]}`, "cm"),
    point: "わかっていない辺は、対応する辺の長さを使う",
    steps: [
      { title: "三角形ABCの辺を全部そろえる", body: `辺BCは辺EFに対応するので${s[1]}cm、辺CAは辺FDに対応するので${s[2]}cmです。`, back: [BACK_TAIOU] },
      { title: "たす", body: `${s[0]}＋${s[1]}＋${s[2]}＝{{${s[0] + s[1] + s[2]}}}（cm）です。` },
    ],
  };
}

function tejun(r: Rng): QuestionBody {
  const bc = r.int(4, 8);
  const ba = r.int(3, 7);
  const b = r.step(40, 80, 5);
  return {
    prompt: `辺BCが ${bc}cm、辺BAが ${ba}cm、角Bが ${b}° の三角形ABCをかきます。正しい順にならべなさい。`,
    answer: { kind: "order", tokens: [`${bc}cmの辺BCをひく`, `点Bで${b}°の角をとる`, `その線の上に、Bから${ba}cmの点Aをとる`, "点Aと点Cを結ぶ"] },
    point: "辺をひく→間の角をとる→もう1つの辺→結ぶ",
    steps: [
      { title: "土台の辺から", body: `まず${bc}cmの辺BCをひき、点Bに分度器の中心を合わせて${b}°をとります。`, back: [BACK_TEJUN] },
      { title: "もう1つの辺と、結ぶ線", body: `その線の上にBから${ba}cmの点Aをとり、最後に{{点Aと点Cを結び}}ます。`, trap: "辺ACの長さは、はじめにはわからない。最後に結んでできる辺です。" },
    ],
  };
}

export const E_MATH_5_GOUDOU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "draft" },
  sections: [
    {
      title: "対応する辺と角",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "hen", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: hen },
        { id: "kaku", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: kaku },
        { id: "joken", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: joken },
      ],
    },
    {
      title: "合同な図形を使って考える",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "heikou", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: heikou },
        { id: "mawari", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: mawari },
      ],
    },
    {
      title: "合同な三角形のかき方",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [{ id: "tejun", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: tejun }],
    },
  ],
};
