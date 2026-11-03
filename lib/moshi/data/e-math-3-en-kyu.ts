// 小3算数「円と球」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 半径《はんけい》を先に決め、直径＝半径×2 から長さを作る。calc で答えを確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-en-kyu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_NAMAE = L(1, "円の中心・半径《はんけい》・直径《ちょっけい》");
const B_2BAI = L(2, "直径《ちょっけい》は半径《はんけい》の2つ分");
const B_KYU = L(4, "球はどこで切っても切り口が円");
const B_HAKO = L(5, "箱に入ったボールで考える");

function chokkei(r: Rng): QuestionBody {
  const h = r.int(2, 15);
  return {
    prompt: `半径《はんけい》が${h}cmの円の、直径《ちょっけい》は何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(2 * h)], unit: "cm", calc: `${h}*2` },
    point: "直径《ちょっけい》＝半径《はんけい》×2",
    steps: [{ title: "半径《はんけい》2つ分", body: `直径《ちょっけい》の中には半径《はんけい》が2つ入っています。${h}×2＝{{${2 * h}}}（cm）。`, back: [B_2BAI] }],
  };
}

function hankei(r: Rng): QuestionBody {
  const h = r.int(2, 20);
  const what = r.pick(["円", "球"]);
  return {
    prompt: `直径《ちょっけい》が${2 * h}cmの${what}の、半径《はんけい》は何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(h)], unit: "cm", calc: `${2 * h}/2` },
    point: "半径《はんけい》＝直径《ちょっけい》÷2",
    steps: [{ title: "直径《ちょっけい》を2つに分ける", body: `${2 * h}÷2＝{{${h}}}（cm）。`, trap: `半径《はんけい》を聞かれているのに ${2 * h}×2 としないようにします。`, back: [B_2BAI] }],
  };
}

function nagai(r: Rng): QuestionBody {
  const h = r.int(3, 16);
  const opts = [`${h}cm`, `${2 * h}cm`, `${4 * h}cm`, "決まっていない"];
  return {
    prompt: `半径《はんけい》${h}cmの円の中に、円のまわりからまわりまで、いろいろな直線をひきます。一番長い直線は何cmですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct: 1,
      why: [
        `${h}cmは半径《はんけい》です。中心からまわりまでの長さです。`,
        `中心を通る直線（直径《ちょっけい》）が一番長く、${h}×2＝${2 * h}cm です。`,
        `半径《はんけい》の4つ分は、円の中に入りません。`,
        "中心を通る直線が、いつも一番長くなります。",
      ],
    },
    point: "円の中で一番長い直線は直径《ちょっけい》",
    steps: [{ title: "中心を通る線", body: `円の中にひける直線の中で一番長いのは{{直径《ちょっけい》}}で、${2 * h}cmです。`, back: [B_NAMAE, B_2BAI] }],
  };
}

function kirikuchi(r: Rng): QuestionBody {
  const d = r.step(10, 30, 2);
  const opts = r.shuffle([`${d + 4}cm`, `${d}cm`, `${d - 4}cm`, `${d / 2}cm`]);
  const correct = opts.indexOf(`${d + 4}cm`);
  return {
    prompt: `直径《ちょっけい》${d}cmの球を、いろいろなところで平らに切ります。切り口の円の直径《ちょっけい》として、ありえないものはどれですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct,
      why: opts.map((o) =>
        o === `${d + 4}cm`
          ? `切り口が一番大きいのは真ん中で切ったときで、直径《ちょっけい》${d}cmです。それより大きくはなりません。`
          : o === `${d}cm`
            ? "真ん中で切ると、球と同じ直径《ちょっけい》の円になります。"
            : "真ん中からずらして切ると、小さい円になります。",
      ),
    },
    point: "真ん中で切ったときが一番大きい円",
    steps: [{ title: "一番大きい切り口", body: `球を真ん中で切ると、切り口は直径《ちょっけい》${d}cmの円で、これが{{一番大きい}}円です。`, back: [B_KYU] }],
  };
}

function hakoNagasa(r: Rng): QuestionBody {
  const h = r.int(2, 6);
  const n = r.int(3, 6);
  const what = r.pick(["ボール", "ビー玉", "おだんご"]);
  const len = h;
  return {
    prompt: `半径《はんけい》${len}cmの${what}が${n}こ、一列にぴったり箱に入っています。箱の内がわの長さは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(2 * len * n)], unit: "cm", calc: `${len}*2*${n}` },
    point: "ならぶ長さは、直径《ちょっけい》のこ数分",
    steps: [
      { title: "1こ分の長さ", body: `1こが場所をとる長さは直径《ちょっけい》で、${len}×2＝${2 * len}（cm）です。`, back: [B_2BAI] },
      { title: "こ数分", body: `${2 * len}×${n}＝{{${2 * len * n}}}（cm）。`, trap: `半径《はんけい》の ${len}×${n} にしないようにします。`, back: [B_HAKO] },
    ],
  };
}

function hakoTateYoko(r: Rng): QuestionBody {
  const h = r.int(2, 5);
  const a = r.int(2, 3);
  const b = r.int(a + 1, 5);
  return {
    prompt: `半径《はんけい》${h}cmのボールが、たてに${a}こ、横に${b}こならんで、平らな箱にぴったり入っています。箱の内がわのたてと横の長さは、それぞれ何cmですか。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(2 * h * a), String(2 * h * b)], labels: ["たて", "横"], unit: "cm", calc: `${h}*2*${a}`, equations: [`x=${h}*2*${a}`, `y=${h}*2*${b}`] },
    point: "たても横も、直径《ちょっけい》×ならぶこ数",
    steps: [
      { title: "直径《ちょっけい》を出す", body: `直径《ちょっけい》は ${h}×2＝${2 * h}（cm）です。`, back: [B_2BAI] },
      { title: "たてと横", body: `たては ${2 * h}×${a}＝{{${2 * h * a}}}（cm）、横は ${2 * h}×${b}＝{{${2 * h * b}}}（cm）です。`, back: [B_HAKO] },
    ],
  };
}

export const E_MATH_3_EN_KYU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "半径《はんけい》と直径《ちょっけい》",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "chokkei", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: chokkei },
        { id: "hankei", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: hankei },
        { id: "nagai", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: nagai },
      ],
    },
    {
      title: "球と、箱に入ったボール",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "kirikuchi", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: kirikuchi },
        { id: "hako-nagasa", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: hakoNagasa },
        { id: "hako-tateyoko", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: hakoTateYoko },
      ],
    },
  ],
};
