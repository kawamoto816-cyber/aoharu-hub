// 小4算数「整理のしかた」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 4つの欄《らん》 (両方・Aだけ・Bだけ・どちらでもない) の人数を先に決め、合計や「〜している人」はそこから作る。答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-seiri";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_KAZOE = L(1, "落ちや重なりがないように数える");
const B_TATEYOKO = L(2, "たてと横に1つずつことがらをとる");
const B_ZENBU = L(3, "「全部で」は2つの欄《らん》をたす");
const B_GOUKEI = L(4, "合計でたしかめる");

const THEMES = [
  { a: "犬を飼《か》っている", b: "ねこを飼《か》っている", na: "犬を飼《か》っていない", nb: "ねこを飼《か》っていない" },
  { a: "なっとうが好き", b: "トマトが好き", na: "なっとうが好きではない", nb: "トマトが好きではない" },
  { a: "ピアノを習っている", b: "水泳を習っている", na: "ピアノを習っていない", nb: "水泳を習っていない" },
  { a: "朝ごはんにパンを食べた", b: "朝ごはんに牛にゅうを飲んだ", na: "朝ごはんにパンを食べなかった", nb: "朝ごはんに牛にゅうを飲まなかった" },
];

/** [両方, Aだけ, Bだけ, どちらでもない] */
function counts(r: Rng): number[] {
  return [r.int(3, 9), r.int(4, 10), r.int(3, 9), r.int(2, 8)];
}

function zenbuA(r: Rng): QuestionBody {
  const th = r.pick(THEMES);
  const [both, onlyA, onlyB, none] = counts(r);
  return {
    prompt: `クラスの${both + onlyA + onlyB + none}人に聞きました。「${th.a}」と「${th.b}」の両方にあてはまる人は${both}人、「${th.a}」だけにあてはまる人は${onlyA}人、「${th.b}」だけは${onlyB}人、どちらにもあてはまらない人は${none}人でした。「${th.a}」人は、全部で何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(both + onlyA)], unit: "人", calc: `${onlyA}+${both}` },
    point: "「〜だけ」と「両方」の2つの欄《らん》をたす",
    steps: [{ title: "2つの欄《らん》をたす", body: `「${th.a}」人は、それだけの${onlyA}人と、両方の${both}人。${onlyA}＋${both}＝{{${onlyA + both}}}（人）。`, trap: `${onlyA}人だけを答えにしないようにします。`, back: [B_ZENBU] }],
  };
}

function dochiraMo(r: Rng): QuestionBody {
  const th = r.pick(THEMES);
  const [both, onlyA, onlyB, none] = counts(r);
  const N = both + onlyA + onlyB + none;
  return {
    prompt: `${N}人に聞いて、表に整理しました。「${th.a}」と「${th.b}」の両方は${both}人、「${th.a}」だけは${onlyA}人、「${th.b}」だけは${onlyB}人でした。どちらにもあてはまらない人は何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(none)], unit: "人", calc: `${N}-${both}-${onlyA}-${onlyB}` },
    point: "全体から、3つの欄《らん》をひく",
    steps: [
      { title: "4つの欄《らん》で全員", body: `4つの欄《らん》のどこかに、${N}人全員が重ならずに入ります。`, back: [B_TATEYOKO] },
      { title: "ひく", body: `${N}−${both}−${onlyA}−${onlyB}＝{{${none}}}（人）。`, back: [B_GOUKEI] },
    ],
  };
}

function nai(r: Rng): QuestionBody {
  const th = r.pick(THEMES);
  const [both, onlyA, onlyB, none] = counts(r);
  return {
    prompt: `「${th.a}」と「${th.b}」を表に整理しました。両方にあてはまる人は${both}人、「${th.a}」だけは${onlyA}人、「${th.b}」だけは${onlyB}人、どちらでもない人は${none}人です。「${th.nb}」人は何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(onlyA + none)], unit: "人", calc: `${onlyA}+${none}` },
    point: "あてはまらない人も、2つの欄《らん》をたす",
    steps: [{ title: "どの欄《らん》か", body: `「${th.nb}」人は、「${th.a}」だけの${onlyA}人と、どちらでもない${none}人。${onlyA}＋${none}＝{{${onlyA + none}}}（人）。`, back: [B_TATEYOKO, B_ZENBU] }],
  };
}

function dake(r: Rng): QuestionBody {
  const th = r.pick(THEMES);
  const [both, onlyA] = counts(r);
  const A = both + onlyA;
  return {
    prompt: `「${th.a}」人は${A}人いました。そのうち、「${th.b}」にもあてはまる人は${both}人です。「${th.a}」にはあてはまり、「${th.b}」にはあてはまらない人は何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(onlyA)], unit: "人", calc: `${A}-${both}` },
    point: "全部から両方の人をひくと「〜だけ」",
    steps: [{ title: "ひく", body: `${A}−${both}＝{{${onlyA}}}（人）。`, back: [B_ZENBU] }],
  };
}

function nokoriNone(r: Rng): QuestionBody {
  const th = r.pick(THEMES);
  const [both, onlyA, onlyB, none] = counts(r);
  const N = both + onlyA + onlyB + none;
  const A = both + onlyA;
  const B = both + onlyB;
  return {
    prompt: `${N}人に聞きました。「${th.a}」人は${A}人、「${th.b}」人は${B}人、両方にあてはまる人は${both}人でした。どちらにもあてはまらない人は何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(none)], unit: "人", calc: `${N}-(${A}+${B}-${both})` },
    point: "両方の人を2回数えないように",
    steps: [
      { title: "どちらかにあてはまる人", body: `${A}＋${B} では両方の${both}人を2回数えています。${A}＋${B}−${both}＝${A + B - both}（人）。`, back: [B_KAZOE, B_ZENBU] },
      { title: "どちらでもない人", body: `${N}−${A + B - both}＝{{${none}}}（人）。`, trap: `${N}−${A}−${B} とすると、両方の人を2回ひいてしまいます。`, back: [B_GOUKEI] },
    ],
  };
}

function ryouhou(r: Rng): QuestionBody {
  const th = r.pick(THEMES);
  const [both, onlyA, onlyB, none] = counts(r);
  const N = both + onlyA + onlyB + none;
  const A = both + onlyA;
  const B = both + onlyB;
  return {
    prompt: `${N}人に聞きました。「${th.a}」人は${A}人、「${th.b}」人は${B}人、どちらにもあてはまらない人は${none}人でした。両方にあてはまる人は何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(both)], unit: "人", calc: `${A}+${B}-(${N}-${none})` },
    point: "どちらかにあてはまる人数とくらべる",
    steps: [
      { title: "どちらかにあてはまる人", body: `${N}−${none}＝${N - none}（人）。`, back: [B_GOUKEI] },
      { title: "重なりを見つける", body: `${A}＋${B}＝${A + B} は、${N - none}人より両方の人の分だけ多い。${A + B}−${N - none}＝{{${both}}}（人）。`, back: [B_TATEYOKO, B_ZENBU] },
    ],
  };
}

export const E_MATH_4_SEIRI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "表を読みとる",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "zenbu-a", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: zenbuA },
        { id: "dochiramo", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: dochiraMo },
        { id: "dake", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: dake },
        { id: "nai", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: nai },
      ],
    },
    {
      title: "重なりを考える",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "nokori-none", type: "A", difficulty: 2, points: 18, seconds: 120, skill: "思考・判断・表現", generate: nokoriNone },
        { id: "ryouhou", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: ryouhou },
      ],
    },
  ],
};
