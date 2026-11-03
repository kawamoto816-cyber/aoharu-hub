// 情報Ⅰ「モデル化とシミュレーション」の単元模試 (A: 数値を入れかえる生成型 ＋ B: 用語のプール)。問題はすべてオリジナル。
// 検算: 水そうは 初めの量＋(入る量−出る量)×分 を、複利は 元金×(1＋r)ⁿ を (元金を 1000 の倍数・r を 10% の倍数などにして整数になる組だけ)、
//   モンテカルロ法は 4×(入った点)÷(全部の点) を (全部の点を 100・200・500・1000 にして小数3けた以内)、
//   ふえ方と転入のモデルは1年ずつ (前の年×(1＋r)＋k) を2回計算した式を calc に書く (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-model";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "モデルの種類");
const S2 = L(2, "モデル化とシミュレーションの手順");
const S3 = L(3, "確定的モデル：前の値から次の値を計算する");
const S4 = L(4, "確率的モデル：乱数で偶然を再現する");
const S5 = L(5, "天気予報は、地球をマス目に分けたシミュレーション");

function suiso(r: Rng): QuestionBody {
  const v0 = r.int(0, 30);
  const a = r.int(2, 9);
  const b = r.int(1, a - 1);
  const t = r.int(5, 30);
  const v = v0 + (a - b) * t;
  return {
    prompt: `${v0}L の水が入った水そうに、毎分 ${a}L の水を入れながら、毎分 ${b}L ずつ水を出す。${t}分後の水の量は何 L ですか。水そうはあふれないものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "L", calc: `${v0}+(${a}-${b})*${t}` },
    point: "1分ごとの変化量（入る−出る）を決めて、時間をかける",
    steps: [
      { title: "1分間の変化", body: `${a} − ${b}＝${a - b} L ずつふえます。`, back: [S3] },
      { title: "時間をかける", body: `${v0} ＋ ${a - b}×${t}＝{{${v}}} L。`, trap: "初めの量 " + v0 + "L を足し忘れない。" },
    ],
  };
}

function fukuri(r: Rng): QuestionBody {
  if (r.bool()) {
    const p = r.pick([10000, 20000, 50000, 100000]);
    const rate = r.pick([1, 2, 3, 4, 5]);
    const v = (p * (100 + rate) * (100 + rate)) / 10000;
    return {
      prompt: `${p}円を年利 ${rate}% で預け、1年ごとに利息を元金に加える（複利）。2年後の残高は何円ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "円", calc: `${p}*(1+${rate}/100)^2` },
      point: "次の年の残高＝今の残高×(1＋年利)",
      steps: [
        { title: "1年後", body: `${p}×${1 + rate / 100}＝${(p * (100 + rate)) / 100} 円。`, back: [S3] },
        { title: "2年後", body: `${(p * (100 + rate)) / 100}×${1 + rate / 100}＝{{${v}}} 円。`, trap: `${p}×${rate / 100}×2 を足すのではない。利息にも利息がつく。` },
      ],
    };
  }
  const p = r.pick([1000, 2000, 3000, 5000]);
  const rate = r.pick([10, 20, 30, 50]);
  const n = r.int(2, 3);
  let v = p;
  const hist = [p];
  for (let i = 0; i < n; i++) {
    v = (v * (100 + rate)) / 100;
    hist.push(v);
  }
  return {
    prompt: `${p}匹の生き物が、毎月 ${rate}% ずつふえるとする。${n}か月後には何匹になりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "匹", calc: `${p}*(1+${rate}/100)^${n}` },
    point: "前の月の数×(1＋ふえる割合)をくり返す",
    steps: [
      { title: "1か月ずつ計算", body: `${hist.join(" → ")}。`, back: [S3] },
      { title: "答え", body: `{{${v}}} 匹。`, trap: "ふえる数は毎月同じではない。前の月の数をもとに計算する。" },
    ],
  };
}

function montecarlo(r: Rng): QuestionBody {
  const N = r.pick([100, 200, 500, 1000]);
  const ratio = 0.75 + r.int(0, 40) / 1000;
  const M = Math.round(N * ratio);
  const v = String(Math.round((4 * M * 1000) / N) / 1000);
  return {
    prompt: `1辺の長さ 1 の正方形の中に、乱数を使って点を ${N}個ランダムに打ったところ、正方形の1つの頂点を中心とする半径 1 の四分円の内側に入った点は ${M}個だった。この結果から求めた円周率の近似値を答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `4*${M}/${N}` },
    point: "四分円の面積 π/4 ÷ 正方形の面積 1 ＝ 入る割合",
    steps: [
      { title: "面積の比", body: "四分円の面積は π/4、正方形の面積は 1。点が入る割合はおよそ π/4 です。", back: [S4] },
      { title: "4倍する", body: `π ≒ 4×${M}÷${N}＝{{${v}}}。点の数をふやすほど 3.14… に近づきます。`, trap: "割合をそのまま答えない。π/4 にあたるので 4倍する。" },
    ],
  };
}

function zoka(r: Rng): QuestionBody {
  const p = r.pick([1000, 2000, 3000, 4000, 5000]);
  const rate = r.pick([10, 20]);
  const k = r.pick([50, 100, 150, 200, 300]);
  const y1 = (p * (100 + rate)) / 100 + k;
  const y2 = (y1 * (100 + rate)) / 100 + k;
  return {
    prompt: `ある町の人口のモデルを「次の年の人口＝今年の人口×${1 + rate / 100} ＋ ${k}」とする（${rate}% の自然増と、毎年 ${k}人の転入）。今年の人口が ${p}人のとき、2年後の人口は何人と予測されますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(y2)], unit: "人", calc: `(${p}*(1+${rate}/100)+${k})*(1+${rate}/100)+${k}` },
    point: "前の年の値から次の年の値を、1年ずつ順に計算する",
    steps: [
      { title: "1年後", body: `${p}×${1 + rate / 100} ＋ ${k}＝${y1} 人。`, back: [S3] },
      { title: "2年後", body: `${y1}×${1 + rate / 100} ＋ ${k}＝{{${y2}}} 人。`, trap: `転入の ${k}人にも、次の年には増加の割合がかかる。2年分をまとめて計算しない。` },
    ],
  };
}

const P = { 1: 15, 2: 16, 3: 22 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("zuteki", 1),
    prompt: "鉄道の路線図は、表し方で分けると何モデルにあたりますか。",
    answer: {
      kind: "choice",
      options: ["図的モデル", "物理モデル", "数式モデル", "確率的モデル"],
      correct: 0,
      why: ["正しい。駅のつながりを図で表したモデル。", "物理モデルは地球儀や模型のように、実物の形を縮めたりしたもの。", "数式モデルは関係を式で表したもの。", "確率的モデルは偶然を含むかどうかでの分け方。表し方の分類ではない。"],
    },
    point: "表し方で：物理モデル・図的モデル・数式モデル",
    steps: [{ title: "表し方の分類", body: "模型は{{物理モデル}}、路線図や流れ図は{{図的モデル}}、式は{{数式モデル}}。", back: [S1] }],
  },
  {
    ...base("kakuritsu", 1),
    prompt: "レジに客が来る間隔のように、偶然の要素を含む現象を表すモデルを何といいますか。",
    answer: {
      kind: "choice",
      options: ["確率的モデル", "確定的モデル", "静的モデル", "物理モデル"],
      correct: 0,
      why: ["正しい。乱数を使って偶然を再現し、多数回試して結果を見る。", "確定的モデルは、規則と最初の値で結果が1つに決まるもの。", "静的モデルは、時間による変化を追わないもの。", "物理モデルは実物の形を表したもの。"],
    },
    point: "偶然が入る → 確率的モデル（乱数を使う）",
    steps: [{ title: "結果が1つに決まるか", body: "結果が1つに決まるのが{{確定的モデル}}、偶然が入るのが{{確率的モデル}}。", back: [S1, S4] }],
  },
  {
    ...base("minaoshi", 2, "思考・判断・表現"),
    prompt: "シミュレーションの結果が、実際に集めたデータと大きくずれていた。次にすることとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["モデルの要素や関係を見直して、もう一度シミュレーションする", "結果が正しいとして、そのまま結論にする", "実際のデータのほうを結果に合わせて直す", "シミュレーションをやめ、結論は出さない"],
      correct: 0,
      why: ["正しい。ずれが大きければモデルを見直し、試すことをくり返す。", "現実とずれたモデルの結果は、そのままでは使えない。", "データを都合よく直すのは不正。", "見直してくり返すのがシミュレーションの手順。"],
    },
    point: "目的 → モデル化 → シミュレーション → 評価 → 見直し",
    steps: [{ title: "手順", body: "結果を現実と比べ、ずれが大きければ{{モデルを見直して}}もう一度試します。", back: [S2] }],
  },
  {
    ...base("ensemble", 2, "思考・判断・表現"),
    prompt: "天気予報で、初めの値を少しずつ変えた計算を何十通りも行う（アンサンブル予報）のはなぜですか。",
    answer: {
      kind: "choice",
      options: ["初期値のわずかなちがいで結果が大きく変わるため", "1回の計算では格子が足りないため", "物理法則の式が毎回変わるため", "計算の回数が多いほど、明日の天気が変えられるため"],
      correct: 0,
      why: ["正しい。結果のばらつきを見ることで、予報の確からしさがわかる。", "格子の細かさの問題ではなく、初期値の小さなちがいの影響を調べるため。", "物理法則の式は同じ。変えるのは初期値。", "計算で天気そのものが変わることはない。"],
    },
    point: "初期値の小さなちがいが大きなちがいになる",
    steps: [{ title: "数値予報の性質", body: "大気のシミュレーションは{{初期値}}の小さなちがいで結果が大きく変わるので、何通りも計算して幅を見ます。", back: [S5] }],
  },
];

export const H_INFO_1_MODEL_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "確定的モデル",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "suiso", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: suiso },
        { id: "fukuri", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: fukuri },
        { id: "zoka", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: zoka },
      ],
    },
    {
      title: "確率的モデル",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "montecarlo", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: montecarlo }],
    },
    { title: "モデルの種類と手順", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
