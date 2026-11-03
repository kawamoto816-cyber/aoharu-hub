// 小5理科「もののとけ方」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: 問題プール6問からシードで3問)。問題はすべてオリジナル。
// A は整数の重さ・水の量の倍数だけを使い、答えが整数か小数第1位までになる組だけを作る。calc で答えを検算 (scripts/check-moshi.ts がシード100個で確かめる)。
// とける量の値 (水50mLに 食塩 20℃約18g・60℃約18.5g、ミョウバン 20℃約6g・60℃約29g) はレクチャーの図にそろえた。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-science-5-tokekata";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S = [L(1, "水溶液《すいようえき》は、すき通っている"), L(2, "とけても重さは変わらない"), L(3, "とける量には限りがある"), L(4, "とけたものを取り出す")];

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function omosa(r: Rng): QuestionBody {
  const w = r.step(50, 200, 10);
  const s = r.int(5, 15);
  const what = r.pick(["食塩", "ミョウバン"]);
  if (r.bool()) {
    return {
      prompt: `水${w}gに${what}${s}gを入れ、すべてとかしました。できた水溶液《すいようえき》の重さは何gですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(w + s)], unit: "g", calc: `${w}+${s}` },
      point: "水溶液《すいようえき》の重さ＝水の重さ＋とかしたものの重さ",
      steps: [{ title: "とけても重さは変わらない", body: `とけて見えなくなっても、なくなったわけではありません。${w}＋${s}＝{{${w + s}}}（g）です。`, trap: "見えなくなったから、水の重さだけと考えないように。", back: [S[1]] }],
    };
  }
  return {
    prompt: `水${w}gに${what}をとかすと、すべてとけて、水溶液《すいようえき》の重さは${w + s}gになりました。とかした${what}は何gですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(s)], unit: "g", calc: `${w + s}-${w}` },
    point: "とかしたもの＝水溶液《すいようえき》－水",
    steps: [{ title: "重さの合計から考える", body: `水溶液《すいようえき》の重さは、水と${what}の重さの合計です。${w + s}－${w}＝{{${s}}}（g）です。`, back: [S[1]] }],
  };
}

/** [もの, 温度, 水50mLにとける量g] (レクチャーの図の値) */
const TOKERU: [string, number, number][] = [
  ["食塩", 20, 18],
  ["食塩", 60, 18.5],
  ["ミョウバン", 20, 6],
  ["ミョウバン", 60, 29],
];

function mizuBai(r: Rng): QuestionBody {
  const [what, temp, g50] = r.pick(TOKERU);
  const ml = r.pick([25, 100, 150, 200, 250]);
  const k = ml / 50;
  const ans = g50 * k;
  return {
    prompt: `${temp}℃の水50mLに、${what}は約${f(g50)}gまでとけます。同じ${temp}℃の水${ml}mLには、${what}は約何gまでとけますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], labels: ["約"], unit: "g", calc: `${f(g50)}*${ml}/50` },
    point: "とける量は水の量に比例する",
    steps: [
      { title: "水の量は何倍か", body: `${ml}÷50＝{{${f(k)}}}（倍）です。`, back: [S[2]] },
      { title: "とける量も同じ倍に", body: `水の量を${f(k)}倍にすると、とける量も${f(k)}倍になります。${f(g50)}×${f(k)}＝{{${f(ans)}}}（g）です。`, trap: "温度は同じなので、温度によるちがいは考えなくてよい。", back: [S[2]] },
    ],
  };
}

function hiyasu(r: Rng): QuestionBody {
  const k = r.pick([1, 2, 3, 4]);
  const ml = 50 * k;
  const hot = 29 * k;
  const cold = 6 * k;
  // とけるだけとかす (hot g) か、hot 以下の決まった量をとかす
  const full = r.bool();
  const put = full ? hot : r.int(cold + 2, hot - 1);
  const ans = put - cold;
  const how = full ? "ミョウバンをとけるだけとかし" : `ミョウバン${put}gをすべてとかし`;
  return {
    prompt: `水50mLにとけるミョウバンの量は、60℃で約29g、20℃で約6gです。60℃の水${ml}mLに${how}、20℃まで冷やしました。出てくるミョウバンのつぶは約何gですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], labels: ["約"], unit: "g", calc: `${put}-6*${ml}/50` },
    point: "出てくる量＝とけていた量－冷やしたあとにとける量",
    steps: [
      { title: "とけていた量", body: full ? `水${ml}mLは50mLの${k}倍なので、60℃では 29×${k}＝{{${hot}}}（g）とけています。` : `とけていたのは{{${put}g}}です（60℃の水${ml}mLには ${hot}g までとけるので、すべてとけます）。`, back: [S[2]] },
      { title: "20℃でとける量", body: `20℃では、水${ml}mLに 6×${k}＝{{${cold}}}（g）までしかとけません。`, back: [S[2]] },
      { title: "とけきれない分が出てくる", body: `温度が下がって、とけきれなくなった分が出てきます。${put}－${cold}＝{{${ans}}}（g）です。`, trap: "食塩はとける量が温度でほとんど変わらないので、冷やしてもほとんど出てきません。ミョウバンだから出てくるのです。", back: [S[3]] },
    ],
  };
}

// ---- B: 知識 (1回に基本・標準・発展から1問ずつ) ----
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
type Sk = QuestionB["skill"];
const K: Sk = "知識・技能";
const H: Sk = "思考・判断・表現";
type Step = [title: string, body: string, back: number, trap?: string];
/** 選択。opts は [選択肢, 理由] で、先頭が正解 (画面では並べかえる) */
const ch = (id: string, d: 1 | 2 | 3, skill: Sk, prompt: string, opts: [string, string][], point: string, [title, body, back, trap]: Step): QuestionB => ({
  id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt,
  answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) },
  point, steps: [{ title, body, trap, back: [S[back - 1]] }],
});

const POOL: QuestionB[] = [
  ch("suiyoeki", 1, K, "水溶液《すいようえき》について、正しいものはどれですか。",
    [["すき通っていて、とけたものが液全体に一様に広がっている", "色がついていても、すき通っていれば水溶液《すいようえき》。"],
     ["色がついた液は、水溶液《すいようえき》ではない", "水溶液《すいようえき》かどうかは、すき通っているかどうかで決まる。"],
     ["時間がたつと、とけたものが底にたまる", "水溶液《すいようえき》では、とけたものが底にたまることはない。"]],
    "すき通っていれば水溶液《すいようえき》", ["水溶液《すいようえき》とは", "水溶液《すいようえき》は{{すき通っていて}}、とけたものは液全体に一様に広がっています。", 1, "色がついていると水溶液《すいようえき》でないと思いやすい。"]),
  ch("roka", 1, K, "とけ残りのつぶがある液を、液とつぶに分ける方法を何といいますか。",
    [["ろ過", "ろ過をして液とつぶを分ける。"],
     ["蒸発《じょうはつ》", "蒸発《じょうはつ》は、とけたものを取り出す方法。"],
     ["受粉", "受粉は花のしくみ。"]],
    "とけ残りはろ過で分ける", ["ろ過", "とけ残りのつぶがあるときは、{{ろ過}}をして液とつぶを分けます。", 4]),
  ch("ondo", 2, H, "水の温度を上げたとき、とける量について正しいものはどれですか。",
    [["ミョウバンは大きく増えるが、食塩はほとんど変わらない", "ものによって、温度による変わり方がちがう。"],
     ["食塩もミョウバンも、大きく増える", "食塩はほとんど変わらない。"],
     ["食塩は大きく増えるが、ミョウバンは変わらない", "反対になっている。"]],
    "ミョウバンは温度で大きく変わる", ["温度ととける量", "水の温度を上げると、ミョウバンは{{とける量が大きく増え}}ますが、食塩は{{ほとんど変わりません}}。", 3]),
  ch("kagiri", 2, H, "水50mLに食塩を1ぱいずつ入れてかきまぜると、何ばいか入れたところで、底につぶが残るようになりました。わかることはどれですか。",
    [["決まった量の水にとける量には限りがある", "限りをこえた分は、かきまぜてもとけ残る。"],
     ["かきまぜ方が足りないだけで、いくらでもとける", "よくかきまぜても、限りをこえるととけ残る。"],
     ["食塩は水にとけないものである", "はじめはよくとけている。"]],
    "とける量には限りがある", ["限り", "決まった量の水にとけるものの量には{{限り}}があり、それ以上はかきまぜてもとけ残ります。", 3, "よくかきまぜればいくらでもとけると思いやすい。"]),
  ch("shoen-toridasu", 3, H, "食塩の水溶液《すいようえき》から食塩を取り出したいと思います。よい方法はどれですか。",
    [["水を蒸発《じょうはつ》させる", "食塩は温度でとける量があまり変わらないので、水を蒸発《じょうはつ》させて取り出す。"],
     ["冷蔵庫《れいぞうこ》で冷やす", "食塩は冷やしてもほとんど出てこない。"],
     ["ろ過する", "ろ過では、とけているものは取り出せない。"]],
    "食塩は蒸発《じょうはつ》で取り出す", ["取り出し方", "食塩は温度でとける量があまり変わらないので、冷やしてもほとんど出てきません。水を{{蒸発《じょうはつ》}}させます。", 4]),
  ch("hakaru", 3, H, "食塩を水にとかす前とあとの重さを比べます。正しいはかり方はどれですか。",
    [["入れ物やふたもふくめ、とかす前とあとで同じものをのせてはかる", "同じものをのせて比べると、とけても重さが変わらないことがわかる。"],
     ["とかす前は水だけ、とかしたあとは入れ物ごとはかる", "のせるものがちがうと比べられない。"],
     ["とかしたあとに、食塩のつぶが見えなくなったら重さは0とする", "とけても重さはなくならない。"]],
    "前とあとで同じものをのせて比べる", ["重さの比べ方", "重さをはかるときは、{{入れ物やふたもふくめて}}、とかす前とあとで同じものをのせて比べます。", 2]),
];

export const E_SCIENCE_5_TOKEKATA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "小5",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "とけ方の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "omosa", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: omosa },
        { id: "mizu-bai", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: mizuBai },
        { id: "hiyasu", type: "A", difficulty: 3, points: 17, seconds: 150, skill: "思考・判断・表現", generate: hiyasu },
      ],
    },
    { title: "もののとけ方", lead: "次の問いに答えなさい。", style: "mix", pick: 3, questions: POOL },
  ],
};
