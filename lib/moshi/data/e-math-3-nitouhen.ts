// 小3算数「二等辺三角形と正三角形」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 辺《へん》の長さを先に決めて、まわりの長さ・のこりの辺《へん》を calc (たし算・ひき算・わり算・かけ算) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-nitouhen";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_NAKAMA = L(1, "辺《へん》の長さでなかま分け");
const B_KAKU = L(2, "角の大きさもくらべる");
const B_EN = L(4, "円を使うと二等辺《にとうへん》三角形ができる");

const NITOU = "二等辺《にとうへん》三角形";

function mawari(r: Rng): QuestionBody {
  const a = r.int(4, 12);
  let b = r.int(3, 2 * a - 1);
  if (b === a) b = a + 1;
  return {
    prompt: `${NITOU}があります。長さの等しい2つの辺《へん》はどちらも${a}cmで、のこりの辺《へん》は${b}cmです。まわりの長さは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(2 * a + b)], unit: "cm", calc: `${a}+${a}+${b}` },
    point: "等しい辺《へん》は2本ある",
    steps: [{ title: "3つの辺《へん》をたす", body: `${a}＋${a}＋${b}＝{{${2 * a + b}}}（cm）。`, trap: `${a}＋${b} で止めない。${a}cmの辺《へん》は2本あります。`, back: [B_NAKAMA] }],
  };
}

function seiIppen(r: Rng): QuestionBody {
  const a = r.int(3, 15);
  return {
    prompt: `まわりの長さが${3 * a}cmの正三角形があります。1つの辺《へん》の長さは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], unit: "cm", calc: `${3 * a}/3` },
    point: "正三角形は3つの辺《へん》がみんな等しい",
    steps: [{ title: "3つに分ける", body: `3つの辺《へん》が同じ長さなので、${3 * a}÷3＝{{${a}}}（cm）。`, back: [B_NAKAMA] }],
  };
}

function wakeru(r: Rng): QuestionBody {
  const kind = r.int(0, 2);
  const a = r.int(4, 9);
  const sides = kind === 0 ? [a, a, a] : kind === 1 ? r.shuffle([a, a, a + r.int(1, 3)]) : r.shuffle([a, a + 1, a + 2]);
  const opts = ["二等辺《にとうへん》三角形", "正三角形", "どちらでもない"];
  const correct = kind === 0 ? 1 : kind === 1 ? 0 : 2;
  return {
    prompt: `3つの辺《へん》の長さが ${sides.join("cm、")}cm の三角形は、どの三角形ですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct,
      why: [
        correct === 0 ? "2つの辺《へん》だけが等しいので、二等辺《にとうへん》三角形です。" : kind === 0 ? "3つとも等しいときは正三角形とよびます。" : "等しい辺《へん》が2つありません。",
        correct === 1 ? "3つの辺《へん》がみんな等しいので、正三角形です。" : "3つの辺《へん》がみんな等しくはありません。",
        correct === 2 ? "等しい辺《へん》がないので、どちらでもありません。" : "等しい辺《へん》があります。",
      ],
    },
    point: "等しい辺《へん》が2つ→二等辺《にとうへん》、3つ→正",
    steps: [{ title: "等しい辺《へん》を数える", body: `等しい辺《へん》がいくつあるかを見ます。答えは{{${opts[correct]}}}です。`, back: [B_NAKAMA] }],
  };
}

function enDeTsukuru(r: Rng): QuestionBody {
  const h = r.int(3, 10);
  const b = r.int(2, 2 * h - 1);
  return {
    prompt: `半径《はんけい》${h}cmの円の中心と、円のまわりの2つの点をむすんで三角形をつくりました。まわりの2つの点の間は${b}cmです。この三角形のまわりの長さは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(2 * h + b)], unit: "cm", calc: `${h}*2+${b}` },
    point: "中心からまわりまでは、どこでも半径《はんけい》",
    steps: [
      { title: "2つの辺《へん》は半径《はんけい》", body: `中心から円のまわりまでの2つの辺《へん》は、どちらも半径《はんけい》の${h}cm。だから${NITOU}です。`, back: [B_EN] },
      { title: "まわりの長さ", body: `${h}＋${h}＋${b}＝{{${2 * h + b}}}（cm）。` },
    ],
  };
}

function nokori(r: Rng): QuestionBody {
  const a = r.int(5, 14);
  const b = r.step(2, 2 * a - 2, 2);
  const p = 2 * a + b;
  return {
    prompt: `まわりの長さが${p}cmの${NITOU}があります。等しくない1つの辺《へん》は${b}cmです。長さの等しい辺《へん》の1つは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], unit: "cm", calc: `(${p}-${b})/2` },
    point: "まわりからのこりの辺《へん》をひいて、2つに分ける",
    steps: [
      { title: "等しい2つの辺《へん》の合計", body: `${p}−${b}＝${p - b}（cm）。これが等しい2つの辺《へん》の合計です。`, back: [B_NAKAMA] },
      { title: "2つに分ける", body: `${p - b}÷2＝{{${a}}}（cm）。`, trap: `${p}−${b} の${p - b}を答えにしない。2本分の長さです。` },
    ],
  };
}

function narabe(r: Rng): QuestionBody {
  const s = r.int(2, 9);
  const n = r.int(3, 8);
  return {
    prompt: `1つの辺《へん》が${s}cmの正三角形を${n}こ、向きをかえながら、となりどうしの辺《へん》がぴったり重なるように横一列にならべました。できた形のまわりの長さは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String((n + 2) * s)], unit: "cm", calc: `(${n}+2)*${s}` },
    point: "重なった辺《へん》は、まわりに入らない",
    steps: [
      { title: "まわりの辺《へん》を数える", body: `正三角形1こで辺《へん》は3本、1こふえるごとに まわりの辺《へん》は1本ずつふえます。${n}こでは ${n}＋2＝${n + 2}（本）です。`, back: [B_NAKAMA, B_KAKU] },
      { title: "長さにする", body: `${s}×${n + 2}＝{{${(n + 2) * s}}}（cm）。`, trap: `${s}×3×${n} とすると、重なった辺《へん》まで数えてしまいます。` },
    ],
  };
}

export const E_MATH_3_NITOUHEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "三角形のなかま分けと辺《へん》の長さ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "wakeru", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: wakeru },
        { id: "mawari", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: mawari },
        { id: "sei-ippen", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: seiIppen },
        { id: "nokori", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: nokori },
      ],
    },
    {
      title: "円や正三角形を使って考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "en", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: enDeTsukuru },
        { id: "narabe", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: narabe },
      ],
    },
  ],
};
