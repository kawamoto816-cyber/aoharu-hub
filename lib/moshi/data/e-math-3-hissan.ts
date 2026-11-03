// 小3算数「たし算とひき算の筆算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 数は rng で作り、くり上がり・くり下がりがあるように位《くらい》の数字を選ぶ。答えは calc (たし算・ひき算) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-hissan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_KURAI = L(1, "位《くらい》をそろえて、右から計算する");
const B_AGARI = L(2, "くり上がりが2回あるたし算");
const B_SAGARI = L(3, "十の位《くらい》が0のときのくり下がり");
const B_TASHIKA = L(4, "ひき算の答えは、たし算でたしかめる");

function tashi(r: Rng): QuestionBody {
  // 一の位《くらい》も十の位《くらい》もくり上がる、答えが3けた
  const a1 = r.int(5, 9), b1 = r.int(10 - a1, 9);
  const a2 = r.int(3, 8), b2 = r.int(Math.max(1, 9 - a2), 8);
  const a3 = r.int(1, 4), b3 = r.int(1, 8 - a3);
  const a = a3 * 100 + a2 * 10 + a1;
  const b = b3 * 100 + b2 * 10 + b1;
  return {
    prompt: `${a}＋${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a + b)], calc: `${a}+${b}` },
    point: "くり上がった1を、左の位《くらい》にたしわすれない",
    steps: [
      { title: "一の位《くらい》から", body: `一の位《くらい》は ${a1}＋${b1}＝${a1 + b1}。1を十の位《くらい》へくり上げます。`, back: [B_KURAI] },
      { title: "十の位《くらい》・百の位《くらい》", body: `十の位《くらい》は 1＋${a2}＋${b2}＝${1 + a2 + b2}、百の位《くらい》は ${a3}＋${b3}＋1＝${a3 + b3 + 1}。答えは {{${a + b}}} です。`, trap: "くり上がりの1を小さく書いておき、たしわすれないようにします。", back: [B_AGARI] },
    ],
  };
}

function hiki(r: Rng): QuestionBody {
  // 一の位《くらい》でくり下がりがある3けた−3けた
  const a1 = r.int(0, 7), b1 = r.int(a1 + 1, 9);
  const a2 = r.int(2, 9), b2 = r.int(0, a2 - 1);
  const a3 = r.int(4, 9), b3 = r.int(1, a3 - 1);
  const a = a3 * 100 + a2 * 10 + a1;
  const b = b3 * 100 + b2 * 10 + b1;
  return {
    prompt: `${a}−${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a - b)], calc: `${a}-${b}` },
    point: "ひけないときは、1つ上の位《くらい》から1かりる",
    steps: [
      { title: "位《くらい》をそろえて右から", body: `一の位《くらい》から順《じゅん》に計算します。ひけないときは、上の位《くらい》から1かりて10にします。答えは {{${a - b}}} です。`, back: [B_KURAI] },
      { title: "たしかめる", body: `${a - b}＋${b}＝${a} になるので、正しいです。`, back: [B_TASHIKA] },
    ],
  };
}

function yonketa(r: Rng): QuestionBody {
  const a = r.int(1200, 4999);
  const b = r.int(1100, 4999);
  return {
    prompt: `${a}＋${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a + b)], calc: `${a}+${b}` },
    point: "4けたも、位《くらい》をそろえて一の位《くらい》から",
    steps: [{ title: "千の位《くらい》まで同じように", body: `一の位《くらい》・十の位《くらい》・百の位《くらい》・千の位《くらい》の順《じゅん》に計算し、くり上がりを左へ送ります。答えは {{${a + b}}} です。`, back: [B_KURAI, B_AGARI] }],
  };
}

function zeroSagari(r: Rng): QuestionBody {
  const h = r.int(3, 9);
  const o = r.int(0, 6);
  const a = h * 100 + o;
  const bh = r.int(1, h - 1);
  const b = bh * 100 + r.int(1, 9) * 10 + r.int(o + 1, 9);
  return {
    prompt: `${a}−${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a - b)], calc: `${a}-${b}` },
    point: "十の位《くらい》が0なら、百の位《くらい》から1かりる",
    steps: [
      { title: "百の位《くらい》からかりる", body: `一の位《くらい》は ${o} から ${b % 10} がひけません。十の位《くらい》は0なので、百の位《くらい》から1かりて十の位《くらい》を10にし、そこから一の位《くらい》へ1かします。十の位《くらい》は{{9}}になります。`, back: [B_SAGARI] },
      { title: "計算する", body: `一の位《くらい》は ${10 + o}−${b % 10}＝${10 + o - (b % 10)}。答えは {{${a - b}}} です。`, trap: "十の位《くらい》を10のままにして計算しないようにします。かした後は9です。" },
    ],
  };
}

function otsuri(r: Rng): QuestionBody {
  const p = r.int(2, 9) * 100 + r.int(1, 9) * 10 + r.int(1, 9);
  const pay = 1000;
  const what = r.pick(["本", "ふでばこ", "ボール", "絵《え》のぐ"]);
  return {
    prompt: `${p}円の${what}を買って、${pay}円さつではらいました。おつりは何円ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(pay - p)], unit: "円", calc: `${pay}-${p}` },
    point: "1000は、百・十の位《くらい》が0。順《じゅん》にかりる",
    steps: [
      { title: "式", body: `おつりは、はらったお金から代金をひきます。${pay}−${p}。`, back: [B_SAGARI] },
      { title: "計算してたしかめる", body: `${pay}−${p}＝{{${pay - p}}}（円）。${pay - p}＋${p}＝${pay} になります。`, back: [B_TASHIKA] },
    ],
  };
}

function nikai(r: Rng): QuestionBody {
  const a = r.int(250, 480);
  const b = r.int(150, 420);
  const c = r.int(1300, 1900);
  const who = r.pick(["みさきさん", "ゆうとさん", "はなさん"]);
  return {
    prompt: `${who}は、きのう${a}ページ、きょう${b}ページ本を読みました。本は全部で${c}ページあります。のこりは何ページですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(c - a - b)], unit: "ページ", calc: `${c}-(${a}+${b})` },
    point: "読んだページを先にたしてから、全部からひく",
    steps: [
      { title: "読んだページ", body: `${a}＋${b}＝${a + b}（ページ）。`, back: [B_AGARI] },
      { title: "のこり", body: `${c}−${a + b}＝{{${c - a - b}}}（ページ）。`, back: [B_KURAI] },
    ],
  };
}

export const E_MATH_3_HISSAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "筆算の計算",
      lead: "次の計算をしなさい。",
      style: "calc",
      questions: [
        { id: "tashi", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: tashi },
        { id: "hiki", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: hiki },
        { id: "yonketa", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: yonketa },
        { id: "zero-sagari", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: zeroSagari },
      ],
    },
    {
      title: "文章の問題",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "otsuri", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: otsuri },
        { id: "nikai", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: nikai },
      ],
    },
  ],
};
