// 小5算数「帯グラフと円グラフ」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 全体の数 (人数) と百分率 (整数%) を先に決め、部分の数を掛け算で作る (部分÷全体×100 が整数になる組だけ)。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-obi-en";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_OBI = { label: "全体を1本の帯にして、区切る", href: L(1) };
const BACK_HYAKU = { label: "百分率を求める：部分÷全体×100", href: L(2) };
const BACK_KAKI = { label: "グラフのかき方の順番", href: L(3) };
const BACK_CHIGAI = { label: "帯グラフと円グラフのちがい", href: L(4) };
const BACK_RYO = { label: "割合《わりあい》が大きくても、量が多いとはかぎらない", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}
const TOPICS = [
  { t: "すきなスポーツ", items: ["サッカー", "野球", "水泳", "バスケットボール"] },
  { t: "すきな給食のメニュー", items: ["カレーライス", "あげパン", "ハンバーグ", "スパゲッティ"] },
  { t: "通学のしかた", items: ["歩き", "自転車", "バス", "電車"] },
];

function hyakubun(r: Rng): QuestionBody {
  const n = r.pick([20, 25, 40, 50, 80, 120, 150, 200, 250]);
  let p = 0;
  do p = r.int(4, 60);
  while (((n * p) % 100) !== 0);
  const a = (n * p) / 100;
  const tp = r.pick(TOPICS);
  const it = r.pick(tp.items);
  return {
    prompt: `${n}人に「${tp.t}」を調べたら、「${it}」と答えた人は ${a}人でした。「${it}」と答えた人は、全体の何%ですか。`,
    answer: num(p, `${a}/${n}*100`, "%"),
    point: "百分率＝部分÷全体×100",
    steps: [
      { title: "部分÷全体", body: `${a}÷${n}＝${f(a / n)} です。`, back: [BACK_HYAKU] },
      { title: "100倍して%に", body: `${f(a / n)}×100＝{{${p}}}（%）です。`, trap: `${f(a / n)} を答えにしない。百分率にするには100倍します。` },
    ],
  };
}

function yomu(r: Rng): QuestionBody {
  const n = r.pick([40, 60, 80, 120, 200, 300, 400, 500]);
  let p = 0;
  do p = r.step(5, 60, 5);
  while (((n * p) % 100) !== 0);
  const tp = r.pick(TOPICS);
  const it = r.pick(tp.items);
  return {
    prompt: `${n}人に「${tp.t}」を調べた結果を帯グラフに表したら、「${it}」の部分は ${p}% でした。「${it}」と答えた人は何人ですか。`,
    answer: num((n * p) / 100, `${n}*${p}/100`, "人"),
    point: "部分の数＝全体×割合《わりあい》",
    steps: [{ title: "全体×割合《わりあい》", body: `${p}% は ${f(p / 100)} なので、${n}×${f(p / 100)}＝{{${(n * p) / 100}}}（人）です。`, back: [BACK_OBI] }],
  };
}

function sonota(r: Rng): QuestionBody {
  const tp = r.pick(TOPICS);
  const ps: number[] = [];
  let rest = 100;
  for (let i = 0; i < 4; i++) {
    const p = r.int(8, Math.min(40, rest - 8 * (4 - i)));
    ps.push(p);
    rest -= p;
  }
  return {
    prompt: `「${tp.t}」の調べた結果を円グラフに表しました。${tp.items.map((x, i) => `${x}が${ps[i]}%`).join("、")}で、残りは「その他」です。「その他」は何%ですか。`,
    answer: num(rest, `100-${ps.join("-")}`, "%"),
    point: "円グラフも帯グラフも、全体は100%",
    steps: [{ title: "100%からひく", body: `${ps.join("＋")}＝${100 - rest}（%）。100−${100 - rest}＝{{${rest}}}（%）です。`, back: [BACK_CHIGAI, BACK_KAKI] }],
  };
}

function nanbai(r: Rng): QuestionBody {
  const b = r.pick([5, 6, 8, 10, 12, 15]);
  const k = r.pick([2, 3, 4]);
  const a = b * k;
  const tp = r.pick(TOPICS);
  const [x, y] = r.sample(tp.items, 2);
  return {
    prompt: `「${tp.t}」の円グラフで、「${x}」は ${a}%、「${y}」は ${b}% でした。「${x}」と答えた人の数は、「${y}」と答えた人の数の何倍ですか。`,
    answer: num(k, `${a}/${b}`, "倍"),
    point: "同じ全体なら、人数の比べ方は百分率どうしで比べてよい",
    steps: [{ title: "百分率どうしで", body: `同じ全体の中の割合《わりあい》なので、${a}÷${b}＝{{${k}}}（倍）です。`, back: [BACK_CHIGAI] }],
  };
}

function ryo(r: Rng): QuestionBody {
  for (;;) {
    const na = r.pick([200, 300, 400, 500]);
    const nb = r.pick([600, 800, 1000, 1200]);
    const pa = r.step(20, 50, 5);
    const pb = r.step(10, 40, 5);
    const ca = (na * pa) / 100;
    const cb = (nb * pb) / 100;
    if (pa <= pb || ca >= cb || !Number.isInteger(ca) || !Number.isInteger(cb)) continue;
    return {
      prompt: `A小学校（全校${na}人）と B小学校（全校${nb}人）で、自転車で通学する人の割合《わりあい》を調べたら、Aは ${pa}%、Bは ${pb}% でした。自転車で通学する人の数が多いのはどちらですか。`,
      answer: choice(
        r,
        ["B小学校", `Bは ${nb}×${f(pb / 100)}＝${cb}人、Aは ${na}×${f(pa / 100)}＝${ca}人。割合《わりあい》は小さくても、全体が多いBの方が人数は多い。`],
        [
          ["A小学校", `割合《わりあい》はAの方が大きいが、人数は ${ca}人で、Bの${cb}人より少ない。全体の人数がちがいます。`],
          ["同じ", `人数は A ${ca}人、B ${cb}人でちがいます。`],
        ],
      ),
      point: "全体がちがうときは、割合《わりあい》ではなく人数を出して比べる",
      steps: [
        { title: "人数にもどす", body: `A：${na}×${f(pa / 100)}＝${ca}（人）、B：${nb}×${f(pb / 100)}＝${cb}（人）。`, back: [BACK_RYO] },
        { title: "比べる", body: `人数が多いのは {{B小学校}} です。`, trap: "%が大きい方が、人数も多いとはかぎらない。もとにする量（全体）がちがいます。" },
      ],
    };
  }
}

function zouka(r: Rng): QuestionBody {
  for (;;) {
    const n1 = r.pick([200, 250, 300, 400, 500]);
    const n2 = n1 + r.pick([50, 100, 150, 200]);
    const p1 = r.step(10, 40, 2);
    const p2 = r.step(10, 40, 2);
    const c1 = (n1 * p1) / 100;
    const c2 = (n2 * p2) / 100;
    if (!Number.isInteger(c1) || !Number.isInteger(c2) || c2 <= c1 || p2 >= p1) continue;
    return {
      prompt: `ある町の図書館で、かりられた本の数を種類別に帯グラフにしました。去年は全体 ${n1}さつのうち、物語が ${p1}% でした。今年は全体 ${n2}さつのうち、物語が ${p2}% でした。物語のかりられた数は、去年より何さつふえましたか。`,
      answer: num(c2 - c1, `${n2}*${p2}/100-${n1}*${p1}/100`, "さつ"),
      point: "割合《わりあい》がへっても、数はふえることがある",
      steps: [
        { title: "去年の物語", body: `${n1}×${f(p1 / 100)}＝${c1}（さつ）です。`, back: [BACK_OBI] },
        { title: "今年の物語", body: `${n2}×${f(p2 / 100)}＝${c2}（さつ）です。` },
        { title: "ちがいを求める", body: `${c2}−${c1}＝{{${c2 - c1}}}（さつ）ふえました。`, trap: `${p1}−${p2}＝${p1 - p2} のように%どうしをひかない。全体の数がちがうので、数にもどしてから比べます。`, back: [BACK_RYO] },
      ],
    };
  }
}

export const E_MATH_5_OBI_EN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "draft" },
  sections: [
    {
      title: "百分率とグラフ",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "hyakubun", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: hyakubun },
        { id: "yomu", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: yomu },
        { id: "sonota", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: sonota },
      ],
    },
    {
      title: "グラフを読みとる",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "nanbai", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: nanbai },
        { id: "ryo", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: ryo },
      ],
    },
    {
      title: "2つのグラフを比べる",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [{ id: "zouka", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: zouka }],
    },
  ],
};
