// 小6算数「対称な図形」の単元模試 (A: 数値・図形を入れかえる生成型)。問題はすべてオリジナル。
// 長さ・角は rng で決め、対応する点・辺・角の性質 (軸《じく》から等しいきょり・中心から等しいきょり) から答えを出す。
// 正多角形の性質: 正n角形の対称の軸《じく》は n 本、n が偶数のときだけ点対称。calc で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-taisho";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_CHIGAI = { label: "線対称《せんたいしょう》と点対称《てんたいしょう》のちがい", href: L(1) };
const BACK_SEN = { label: "線対称《せんたいしょう》の性質を使ってかく", href: L(2) };
const BACK_TEN = { label: "点対称《てんたいしょう》：対応する点は中心をはさんで同じ長さ", href: L(3) };
const BACK_TAKAKU = { label: "多角形を対称《たいしょう》の目で見る", href: L(4) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}

/** [名前, 線対称《せんたいしょう》か, 点対称《てんたいしょう》か, 説明] */
const SHAPES: [string, boolean, boolean, string][] = [
  ["正三角形", true, false, "対称《たいしょう》の軸《じく》が3本ある線対称《せんたいしょう》な図形。180°回すと重ならないので点対称《てんたいしょう》ではない"],
  ["二等辺三角形", true, false, "対称《たいしょう》の軸《じく》が1本の線対称《せんたいしょう》な図形。点対称《てんたいしょう》ではない"],
  ["平行四辺形", false, true, "180°回すと重なる点対称《てんたいしょう》な図形。折って重なる線はない"],
  ["長方形", true, true, "軸《じく》が2本の線対称《せんたいしょう》で、点対称《てんたいしょう》でもある"],
  ["ひし形", true, true, "対角線が軸《じく》の線対称《せんたいしょう》で、点対称《てんたいしょう》でもある"],
  ["正方形", true, true, "軸《じく》が4本の線対称《せんたいしょう》で、点対称《てんたいしょう》でもある"],
  ["正五角形", true, false, "軸《じく》が5本の線対称《せんたいしょう》。辺の数が奇数《きすう》なので点対称《てんたいしょう》ではない"],
  ["正六角形", true, true, "軸《じく》が6本の線対称《せんたいしょう》で、点対称《てんたいしょう》でもある"],
];
const KIND = [
  { q: "線対称《せんたいしょう》だが、点対称《てんたいしょう》ではない図形", ok: (s: (typeof SHAPES)[number]) => s[1] && !s[2] },
  { q: "点対称《てんたいしょう》だが、線対称《せんたいしょう》ではない図形", ok: (s: (typeof SHAPES)[number]) => !s[1] && s[2] },
  { q: "線対称《せんたいしょう》でも点対称《てんたいしょう》でもある図形", ok: (s: (typeof SHAPES)[number]) => s[1] && s[2] },
];

function miwake(r: Rng): QuestionBody {
  const k = r.pick(KIND);
  const right = r.pick(SHAPES.filter(k.ok));
  const wrongs = r.sample(SHAPES.filter((s) => !k.ok(s)), 3);
  const w = (s: (typeof SHAPES)[number]) => `${s[0]}は、${s[3]}。`;
  return {
    prompt: `次のうち、${k.q}はどれですか。`,
    answer: choice(r, [right[0], w(right)], wrongs.map((s) => [s[0], w(s)] as [string, string])),
    point: "折って重なるか、180°回して重なるかを別々に調べる",
    steps: [{ title: "2つの見方でためす", body: "1本の直線で{{折って重なるか}}（線対称《せんたいしょう》）、1つの点のまわりに{{180°回して重なるか}}（点対称《てんたいしょう》）を、別々に調べます。", back: [BACK_CHIGAI, BACK_TAKAKU] }],
  };
}

const AXES: [string, number][] = [
  ["正方形", 4], ["長方形", 2], ["ひし形", 2], ["正三角形", 3], ["二等辺三角形", 1], ["正五角形", 5], ["正六角形", 6], ["正八角形", 8], ["正十角形", 10], ["正十二角形", 12],
];

function jiku(r: Rng): QuestionBody {
  const [name, n] = r.pick(AXES);
  return {
    prompt: `${name}には、対称《たいしょう》の軸《じく》が何本ありますか。`,
    answer: num(n, `${n}`, "本"),
    point: "正多角形の対称《たいしょう》の軸《じく》は、辺の数と同じ本数",
    steps: [{ title: "折って重なる線を数える", body: `${name}は、{{${n}本}}の直線で折って重ねることができます。${name.startsWith("正") ? "正多角形の軸《じく》の本数は、辺の数と同じです。" : ""}`, back: [BACK_TAKAKU] }],
  };
}

function senKyori(r: Rng): QuestionBody {
  const a = r.int(2, 15) / (r.bool() ? 1 : 2);
  const p = r.pick(["A", "B", "C", "D"]);
  return {
    prompt: `線対称《せんたいしょう》な図形で、点${p}と、それに対応する点${p}′を結ぶ直線は、対称《たいしょう》の軸《じく》と点Mで交わります。点${p}から点Mまでの長さが ${f(a)}cm のとき、点${p}から点${p}′までの長さは何cmですか。`,
    answer: num(2 * a, `${f(a)}*2`, "cm"),
    point: "対応する点は、軸《じく》から同じ長さのところにある",
    steps: [{ title: "軸《じく》から等しい長さ", body: `対応する点を結ぶ直線は軸《じく》と垂直に交わり、${p}M＝M${p}′です。${p}${p}′＝${f(a)}×2＝{{${f(2 * a)}}}（cm）です。`, back: [BACK_SEN] }],
  };
}

function tenKyori(r: Rng): QuestionBody {
  const full = r.int(4, 30);
  const p = r.pick(["A", "B", "C", "D", "E"]);
  return {
    prompt: `点対称《てんたいしょう》な図形で、対称《たいしょう》の中心をOとします。点${p}と、それに対応する点${p}′を結ぶ直線の長さが ${full}cm のとき、Oから${p}′までの長さは何cmですか。`,
    answer: num(full / 2, `${full}/2`, "cm"),
    point: "対応する点を結ぶ直線は中心を通り、中心で2等分される",
    steps: [{ title: "中心で半分", body: `${p}${p}′は対称《たいしょう》の中心Oを通り、O${p}＝O${p}′です。${full}÷2＝{{${f(full / 2)}}}（cm）です。`, back: [BACK_TEN] }],
  };
}

function heikouTaio(r: Rng): QuestionBody {
  const ab = r.int(3, 9);
  const bc = r.int(ab + 1, 14);
  const b = r.step(50, 80, 5);
  const ask = r.pick([
    ["辺CD", ab, "cm", `辺AB（${ab}cm）`],
    ["辺DA", bc, "cm", `辺BC（${bc}cm）`],
    ["角D", b, "°", `角B（${b}°）`],
    ["角C", 180 - b, "°", "角A"],
  ] as const);
  return {
    prompt: `平行四辺形ABCDは、対角線の交わる点Oを中心とした点対称《てんたいしょう》な図形です。辺ABが ${ab}cm、辺BCが ${bc}cm、角Aが ${180 - b}°、角Bが ${b}° のとき、${ask[0]}は${ask[2] === "cm" ? "何cm" : "何度"}ですか。`,
    answer: num(ask[1], `${ask[1]}`, ask[2]),
    point: "Oのまわりに180°回すと、AとC、BとDが重なる",
    steps: [
      { title: "対応を見つける", body: `点Oのまわりに180°回すと、AはCに、BはDに重なります。${ask[0]}に対応するのは${ask[3]}です。`, back: [BACK_TEN] },
      { title: "等しい", body: `対応する辺の長さや角の大きさは等しいので、${ask[0]}は {{${ask[1]}${ask[2]}}} です。` },
    ],
  };
}

const KAKU_N = [4, 6, 8, 10, 12, 18, 20, 24, 30, 36];
const KAKU_NAME: Record<number, string> = { 4: "正方形", 6: "正六角形", 8: "正八角形", 10: "正十角形", 12: "正十二角形", 18: "正十八角形", 20: "正二十角形", 24: "正二十四角形", 30: "正三十角形", 36: "正三十六角形" };

function jikuKaku(r: Rng): QuestionBody {
  const n = r.pick(KAKU_N);
  const one = (180 * (n - 2)) / n;
  return {
    prompt: `ある正多角形は、対称《たいしょう》の軸《じく》が ${n}本あり、点対称《てんたいしょう》でもあります。この正多角形の1つの角の大きさは何度ですか。`,
    answer: num(one, `180*(${n}-2)/${n}`, "°"),
    point: "軸《じく》の本数から辺の数がわかる。角の和÷角の数",
    steps: [
      { title: "どの正多角形か", body: `正多角形の対称《たいしょう》の軸《じく》は辺の数と同じなので、${KAKU_NAME[n]}です（辺の数が偶数《ぐうすう》なので点対称《てんたいしょう》にもなっています）。`, back: [BACK_TAKAKU] },
      { title: "1つの角", body: `角の和は 180×（${n}−2）＝${180 * (n - 2)}（°）。${180 * (n - 2)}÷${n}＝{{${one}}}（°）です。` },
    ],
  };
}

export const E_MATH_6_TAISHO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "draft" },
  sections: [
    {
      title: "線対称《せんたいしょう》と点対称《てんたいしょう》",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "miwake", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: miwake },
        { id: "jiku", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: jiku },
        { id: "sen-kyori", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: senKyori },
      ],
    },
    {
      title: "対応する点・辺・角",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "ten-kyori", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: tenKyori },
        { id: "heikou", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: heikouTaio },
      ],
    },
    {
      title: "正多角形と対称《たいしょう》",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "jiku-kaku", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: jikuKaku },
      ],
    },
  ],
};
