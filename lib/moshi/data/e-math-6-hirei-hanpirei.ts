// 小6算数「比例と反比例」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 比例 y＝きまった数×x、反比例 x×y＝きまった数 の「きまった数」を先に決め、表の値はその式から作る (答えは整数か小数第1位まで)。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-hirei-hanpirei";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_HIREI = { label: "比例：x が2倍、3倍…なら y も2倍、3倍…", href: L(1) };
const BACK_SHIKI = { label: "比例の式とグラフ", href: L(2) };
const BACK_HAN = { label: "反比例：x が2倍、3倍…なら y は1/2、1/3…", href: L(3) };
const BACK_HYO = { label: "式から、表にない値を求める", href: L(4) };
const BACK_MIWAKE = { label: "比例と反比例を見分ける", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, label: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], ...(label ? { labels: [label] } : {}), calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}

function hireiY(r: Rng): QuestionBody {
  const a = r.int(2, 12);
  const x1 = r.int(2, 6);
  const x2 = r.int(7, 20);
  return {
    prompt: `y は x に比例し、x が ${x1} のとき y は ${a * x1} です。x が ${x2} のとき、y の値を求めなさい。`,
    answer: num(a * x2, `${a * x1}/${x1}*${x2}`, "y ="),
    point: "比例の式 y＝きまった数×x をつくる",
    steps: [
      { title: "きまった数", body: `${a * x1}÷${x1}＝${a} なので、{{y＝${a}×x}} です。`, back: [BACK_SHIKI] },
      { title: "x に入れる", body: `y＝${a}×${x2}＝{{${a * x2}}} です。`, back: [BACK_HYO] },
    ],
  };
}

function kimatta(r: Rng): QuestionBody {
  const a10 = r.pick([5, 15, 25, 12, 8, 35, 45, 6]);
  const x = r.pick([2, 4, 6, 10]);
  const y = (a10 * x) / 10;
  return {
    prompt: `y は x に比例しています。x が ${x} のとき y は ${f(y)} です。y＝きまった数×x と表すとき、きまった数はいくつですか。`,
    answer: num(a10 / 10, `${f(y)}/${x}`, "きまった数"),
    point: "きまった数＝y÷x（どの組でも同じ）",
    steps: [{ title: "y÷x", body: `${f(y)}÷${x}＝{{${f(a10 / 10)}}} です。`, trap: `${x}÷${f(y)} と逆にしない。y＝きまった数×x なので、y を x でわります。`, back: [BACK_SHIKI] }],
  };
}

function hanpirei(r: Rng): QuestionBody {
  const k = r.pick([12, 18, 24, 30, 36, 48, 60, 72]);
  const divs = Array.from({ length: k }, (_, i) => i + 1).filter((d) => k % d === 0 && d > 1 && d < k);
  const [x1, x2] = r.sample(divs, 2);
  return {
    prompt: `y は x に反比例し、x が ${x1} のとき y は ${k / x1} です。x が ${x2} のとき、y の値を求めなさい。`,
    answer: num(k / x2, `${x1}*${k / x1}/${x2}`, "y ="),
    point: "反比例は x×y がいつも同じ数",
    steps: [
      { title: "x×y を求める", body: `${x1}×${k / x1}＝${k} なので、{{x×y＝${k}}}（y＝${k}÷x）です。`, back: [BACK_HAN] },
      { title: "x に入れる", body: `y＝${k}÷${x2}＝{{${k / x2}}} です。`, trap: `比例と同じように ${k / x1}÷${x1}×${x2} としない。反比例では、x が大きくなると y は小さくなります。`, back: [BACK_HYO] },
    ],
  };
}

const HIREI: [string, string][] = [
  ["1m 80円のリボンの、長さ x m と代金 y 円", "y＝80×x。x が2倍になると y も2倍になる比例です。"],
  ["分速60mで歩く時間 x 分と、進む道のり y m", "y＝60×x で、比例です。"],
  ["正三角形の1辺 x cm と、まわりの長さ y cm", "y＝3×x で、比例です。"],
  ["同じくぎ x 本の、重さ y g", "1本の重さ×x で、比例です。"],
];
const HAN: [string, string][] = [
  ["面積が 24cm² の長方形の、たて x cm と横 y cm", "x×y＝24。x が2倍になると y は1/2になる反比例です。"],
  ["1200m の道のりを歩く、分速 x m とかかる時間 y 分", "x×y＝1200 で、反比例です。"],
  ["60まいの色紙を x 人で同じ数ずつ分けたときの、1人分 y まい", "x×y＝60 で、反比例です。"],
  ["36L の水そうに、毎分 x L ずつ水を入れて満水にするまでの時間 y 分", "x×y＝36 で、反比例です。"],
];
const DOCHIRA: [string, string][] = [
  ["20才の兄と 12才の弟の、x 年後の兄の年れい y 才", "y＝20＋x。x が2倍になっても y は2倍にならず、比例でも反比例でもありません。"],
  ["1000円で買い物をしたときの、代金 x 円とおつり y 円", "x＋y＝1000。比例でも反比例でもありません。"],
  ["正方形の1辺 x cm と、面積 y cm²", "y＝x×x。x が2倍で y は4倍。比例でも反比例でもありません。"],
];

function miwake(r: Rng): QuestionBody {
  const mode = r.int(0, 1);
  if (mode === 0) {
    return {
      prompt: "次のうち、y が x に反比例しているものはどれですか。",
      answer: choice(r, r.pick(HAN), [...r.sample(HIREI, 2), r.pick(DOCHIRA)]),
      point: "x×y がいつも同じなら反比例",
      steps: [{ title: "式に表して見分ける", body: "y＝きまった数×x なら比例、{{x×y＝きまった数}}なら反比例です。どちらの形にもならないものもあります。", back: [BACK_MIWAKE, BACK_HAN] }],
    };
  }
  return {
    prompt: "次のうち、y が x に比例しているものはどれですか。",
    answer: choice(r, r.pick(HIREI), [...r.sample(HAN, 2), r.pick(DOCHIRA)]),
    point: "y÷x がいつも同じなら比例",
    steps: [{ title: "式に表して見分ける", body: "{{y＝きまった数×x}} なら比例、x×y＝きまった数 なら反比例です。", back: [BACK_MIWAKE, BACK_HIREI] }],
  };
}

function bunsho(r: Rng): QuestionBody {
  const d = r.pick([600, 720, 900, 1200, 1500, 1800, 2400]);
  const speeds = [40, 45, 50, 60, 75, 80, 90, 100, 120, 150].filter((v) => d % v === 0);
  const [v1, v2] = r.sample(speeds, 2);
  return {
    prompt: `家から図書館まで、分速 ${v1}m で歩くと ${d / v1}分かかります。同じ道を分速 ${v2}m で進むと、何分かかりますか。`,
    answer: num(d / v2, `${v1}*${d / v1}/${v2}`, "", "分"),
    point: "道のりが同じなら、速さと時間は反比例",
    steps: [
      { title: "道のりを求める", body: `${v1}×${d / v1}＝${d}（m）。速さ×時間＝${d} がいつも同じなので、速さと時間は反比例です。`, back: [BACK_HAN] },
      { title: "時間を求める", body: `${d}÷${v2}＝{{${d / v2}}}（分）です。`, back: [BACK_HYO] },
    ],
  };
}

function hyo(r: Rng): QuestionBody {
  const han = r.bool();
  if (han) {
    const k = r.pick([24, 36, 48, 60, 72, 120]);
    const ys = [2, 3, 4].map((x) => k / x);
    const target = r.pick([5, 6, 8, 10, 12].filter((x) => k % x === 0));
    const y = k / target;
    return {
      prompt: `x と y の関係を表にしたら、x が 2・3・4 のとき、y は ${ys.join("・")} でした。y が ${y} になるのは、x がいくつのときですか。`,
      answer: num(target, `${k}/${y}`, "x ="),
      point: "まず比例か反比例かを見分け、式をつくる",
      steps: [
        { title: "見分ける", body: `x×y を計算すると、2×${ys[0]}＝3×${ys[1]}＝4×${ys[2]}＝${k} でいつも同じなので、{{反比例}}です。`, back: [BACK_MIWAKE] },
        { title: "x を求める", body: `x×${y}＝${k} なので、x＝${k}÷${y}＝{{${target}}} です。`, back: [BACK_HYO] },
      ],
    };
  }
  const a = r.pick([1.5, 2.5, 3, 4, 6, 7.5]);
  const ys = [2, 3, 4].map((x) => a * x);
  const target = r.pick([10, 12, 14, 16, 20]);
  const y = a * target;
  return {
    prompt: `x と y の関係を表にしたら、x が 2・3・4 のとき、y は ${ys.map(f).join("・")} でした。y が ${f(y)} になるのは、x がいくつのときですか。`,
    answer: num(target, `${f(y)}/${f(a)}`, "x ="),
    point: "まず比例か反比例かを見分け、式をつくる",
    steps: [
      { title: "見分ける", body: `y÷x を計算すると、どれも ${f(a)} なので、{{比例}}で y＝${f(a)}×x です。`, back: [BACK_MIWAKE, BACK_SHIKI] },
      { title: "x を求める", body: `${f(a)}×x＝${f(y)} なので、x＝${f(y)}÷${f(a)}＝{{${target}}} です。`, back: [BACK_HYO] },
    ],
  };
}

export const E_MATH_6_HIREI_HANPIREI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "draft" },
  sections: [
    {
      title: "比例と反比例の式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hirei-y", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: hireiY },
        { id: "kimatta", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: kimatta },
        { id: "hanpirei", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: hanpirei },
      ],
    },
    {
      title: "見分ける・場面で使う",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "miwake", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: miwake },
        { id: "bunsho", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: bunsho },
      ],
    },
    {
      title: "表から式を見つける",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [{ id: "hyo", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: hyo }],
    },
  ],
};
