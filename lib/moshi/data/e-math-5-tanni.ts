// 小5算数「単位量あたりの大きさ」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 先に「1あたりの量」を決めてから全体の量を掛け算で作り、答えは整数か小数第1位まで。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-tanni";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_SOROE = { label: "広さも人数もちがうときは、1m²あたりにそろえる", href: L(1) };
const BACK_2TOORI = { label: "くらべ方は2通りある", href: L(2) };
const BACK_JINKO = { label: "人口密度《じんこうみつど》は、1km²あたりの人口", href: L(3) };
const BACK_ZENTAI = { label: "1つ分がわかれば、全体も求められる", href: L(4) };
const BACK_YASUI = { label: "どちらが安い？ 1本あたりの値段《ねだん》", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}

function komi(r: Rng): QuestionBody {
  const per10 = r.pick([5, 8, 12, 15, 16, 18, 24, 25]); // 1m²あたりの人数×10
  const s = r.pick([10, 20, 30, 40, 50, 60]);
  const p = (per10 * s) / 10;
  const place = r.pick(["公園の広場", "体育館のコート", "プールサイド"]);
  return {
    prompt: `面積が ${s}m² の${place}に、${p}人がいます。1m²あたり何人ですか。`,
    answer: num(per10 / 10, `${p}/${s}`, "人"),
    point: "1m²あたりの人数＝人数÷面積",
    steps: [{ title: "人数÷面積", body: `${p}÷${s}＝{{${f(per10 / 10)}}}（人）です。1m²あたりの人数が多いほど、こんでいます。`, trap: `${s}÷${p} は「1人あたりの面積」。聞かれている方を確かめます。`, back: [BACK_SOROE, BACK_2TOORI] }],
  };
}

function jinko(r: Rng): QuestionBody {
  const d = r.step(120, 900, 10);
  const s = r.int(15, 95);
  const p = d * s;
  const name = r.pick(["A町", "B市", "C村"]);
  return {
    prompt: `${name}の面積は ${s}km² で、人口は ${p}人です。${name}の人口密度《じんこうみつど》を求めなさい。`,
    answer: num(d, `${p}/${s}`, "人"),
    point: "人口密度《じんこうみつど》＝人口÷面積（km²）",
    steps: [{ title: "1km²あたりの人口", body: `人口密度《じんこうみつど》は、1km²あたりの人口です。${p}÷${s}＝{{${d}}}（人）です。`, back: [BACK_JINKO] }],
  };
}

function zentai(r: Rng): QuestionBody {
  const per = r.pick([12, 14, 15, 16, 18, 20, 22, 25]);
  const l = r.int(15, 45);
  return {
    prompt: `ガソリン1Lで ${per}km 走る自動車があります。この自動車は、ガソリン ${l}L で何km走れますか。`,
    answer: num(per * l, `${per}*${l}`, "km"),
    point: "全体＝1つ分（1Lあたり）×いくつ分",
    steps: [{ title: "1Lあたり×L", body: `${per}×${l}＝{{${per * l}}}（km）です。`, back: [BACK_ZENTAI] }],
  };
}

function yasui(r: Rng): QuestionBody {
  let pa = 0;
  let pb = 0;
  let na = 0;
  let nb = 0;
  do {
    pa = r.step(40, 120, 5);
    pb = r.step(40, 120, 5);
    na = r.int(3, 8);
    nb = r.int(3, 8);
  } while (pa === pb || na === nb || (pa > pb) === (pa * na > pb * nb));
  const cheap = pa < pb ? 0 : 1;
  const thing = r.pick(["えんぴつ", "ボールペン", "マーカー"]); // どれも「本」で数えるもの
  return {
    prompt: `${thing}が、Aの店では ${na}本で ${pa * na}円、Bの店では ${nb}本で ${pb * nb}円で売られています。1本あたりで考えると、どちらの店が安いですか。`,
    answer: choice(
      r,
      [cheap === 0 ? "Aの店" : "Bの店", `1本あたり、Aは ${pa * na}÷${na}＝${pa}円、Bは ${pb * nb}÷${nb}＝${pb}円。${cheap === 0 ? "A" : "B"}の方が安い。`],
      [
        [cheap === 0 ? "Bの店" : "Aの店", `1本あたり ${cheap === 0 ? pb : pa}円で、${cheap === 0 ? pa : pb}円より高い。代金の合計だけでは比べられません。`],
        ["どちらも同じ", `1本あたり ${pa}円と ${pb}円で、ちがいます。`],
      ],
    ),
    point: "本数がちがうときは、1本あたりのねだんにそろえる",
    steps: [
      { title: "1本あたりにそろえる", body: `A：${pa * na}÷${na}＝${pa}（円）、B：${pb * nb}÷${nb}＝${pb}（円）。`, back: [BACK_YASUI] },
      { title: "比べる", body: `1本あたりが安い {{${cheap === 0 ? "Aの店" : "Bの店"}}} です。`, trap: "代金の合計が少ない方が安いとはかぎらない。本数がちがいます。" },
    ],
  };
}

function gyaku(r: Rng): QuestionBody {
  const per = r.pick([12, 15, 16, 18, 20, 24, 25]);
  const l = r.int(8, 30);
  const d = per * l;
  return {
    prompt: `ガソリン1Lで ${per}km 走る自動車が、${d}km 走るには、ガソリンが何L必要ですか。`,
    answer: num(l, `${d}/${per}`, "L"),
    point: "いくつ分＝全体÷1つ分",
    steps: [{ title: "1Lで何km走るかでわる", body: `${per}kmずつ走るごとに1L使うので、${d}÷${per}＝{{${l}}}（L）です。`, trap: `${d}×${per} としない。何L分かはわり算です。`, back: [BACK_ZENTAI] }],
  };
}

function kurabe(r: Rng): QuestionBody {
  // 3つの部屋。1m²あたりの人数が小数第1位までで割り切れる組
  for (;;) {
    const rooms = ["A", "B", "C"].map((n) => {
      const s = r.pick([20, 25, 30, 40, 50]);
      const d10 = r.int(6, 20);
      return { n, s, d10, p: (d10 * s) / 10 };
    });
    if (rooms.some((x) => !Number.isInteger(x.p))) continue;
    if (new Set(rooms.map((x) => x.d10)).size < 3) continue;
    if (new Set(rooms.map((x) => x.s)).size < 2) continue;
    const top = rooms.reduce((a, b) => (b.d10 > a.d10 ? b : a));
    const most = rooms.reduce((a, b) => (b.p > a.p ? b : a));
    if (top === most) continue; // 人数がいちばん多い部屋が、いちばんこんでいるとはかぎらない組
    return {
      prompt: `3つの部屋の広さと人数は、Aが ${rooms[0].s}m² に ${rooms[0].p}人、Bが ${rooms[1].s}m² に ${rooms[1].p}人、Cが ${rooms[2].s}m² に ${rooms[2].p}人です。いちばんこんでいる部屋はどれですか。`,
      answer: choice(
        r,
        [`${top.n}の部屋`, `1m²あたり ${top.p}÷${top.s}＝${f(top.d10 / 10)}人で、いちばん多い。`],
        rooms.filter((x) => x !== top).map((x) => [`${x.n}の部屋`, `1m²あたり ${x.p}÷${x.s}＝${f(x.d10 / 10)}人で、${top.n}より少ない。${x === most ? "人数はいちばん多いが、広さも広い。" : ""}`] as [string, string]),
      ),
      point: "1m²あたりの人数にそろえて比べる",
      steps: [
        { title: "1m²あたりの人数", body: rooms.map((x) => `${x.n}：${x.p}÷${x.s}＝${f(x.d10 / 10)}`).join("、") + "（人）。", back: [BACK_SOROE] },
        { title: "比べる", body: `1m²あたりの人数がいちばん多い {{${top.n}の部屋}} がいちばんこんでいます。`, trap: `人数がいちばん多い${most.n}を選ばない。広さがちがうので、そろえて比べます。`, back: [BACK_2TOORI] },
      ],
    };
  }
}

export const E_MATH_5_TANNI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "1あたりの量を求める",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "komi", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: komi },
        { id: "jinko", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: jinko },
        { id: "zentai", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: zentai },
      ],
    },
    {
      title: "1あたりの量を使う",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "yasui", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: yasui },
        { id: "gyaku", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: gyaku },
      ],
    },
    {
      title: "こみぐあいを比べる",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "kurabe", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: kurabe }],
    },
  ],
};
