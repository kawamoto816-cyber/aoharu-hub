// 数学B「仮説検定」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。数値の場面はすべて架空。
// 検算: 二項分布の正規近似は np(1−p) が平方数になる (n, p₀) だけを使い、Z＝(X−np₀)/√{np₀(1−p₀)} を calc に書く。
//   棄却域は有意水準5%で両側 |Z|≧1.96、片側 Z≧1.64 (レクチャーと同じ)。判定の選択肢は、生成関数の中で計算した Z から決める。
//   場合の数で求める確率は 1/₂ₘCₘ などを calc に書く。scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-b-kentei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "考え方：「かたよりがない」と仮定してみる");
const S2 = L(2, "紅茶の実験：場合の数で確率を数える");
const S3 = L(3, "帰無仮説と対立仮説、両側と片側");
const S4 = L(4, "Z を求める：二項分布を正規分布で近似");
const S5 = L(5, "棄却域に入るかを見る");
const S6 = L(6, "結論の書き方：棄却されないときに注意");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n: number, d: number) => {
  const g = gcd(n, d) * (d < 0 ? -1 : 1);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const C = (n: number, r: number) => fact(n) / (fact(r) * fact(n - r));

/** n, p₀ (分子/分母), σ＝√{np₀(1−p₀)} が整数になる組 */
const SET: { n: number; pn: number; pd: number; s: number }[] = [
  { n: 100, pn: 1, pd: 2, s: 5 },
  { n: 400, pn: 1, pd: 2, s: 10 },
  { n: 900, pn: 1, pd: 2, s: 15 },
  { n: 180, pn: 1, pd: 6, s: 5 },
  { n: 720, pn: 1, pd: 6, s: 10 },
  { n: 450, pn: 1, pd: 3, s: 10 },
  { n: 225, pn: 1, pd: 5, s: 6 },
  { n: 400, pn: 1, pd: 5, s: 8 },
  { n: 625, pn: 1, pd: 5, s: 10 },
  { n: 400, pn: 4, pd: 5, s: 8 },
];
const ps = (t: { pn: number; pd: number }) => fr(t.pn, t.pd);
const scene = (t: { n: number; pn: number; pd: number }) =>
  t.pd === 2
    ? { act: `ある硬貨を ${t.n} 回投げたところ、表が`, h0: "表の出る確率は 1/2", what: "表の出る確率" }
    : t.pd === 6
      ? { act: `あるさいころを ${t.n} 回投げたところ、1の目が`, h0: "1の目の出る確率は 1/6", what: "1の目の出る確率" }
      : t.pd === 3
        ? { act: `あるさいころを ${t.n} 回投げたところ、5以上の目が`, h0: "5以上の目の出る確率は 1/3", what: "5以上の目の出る確率" }
        : { act: `これまで ${ps(t)} の割合で起こっていたことについて、新しい方法で ${t.n} 回試したところ、`, h0: `起こる確率は ${ps(t)}`, what: "起こる確率" };

/** z を 0.2 刻みで選び、X＝m＋zσ が整数になるものを返す */
function pickX(r: Rng, t: (typeof SET)[number], zs: number[]): { X: number; z: number } {
  const m = (t.n * t.pn) / t.pd;
  const ok = zs.filter((z) => Number.isInteger(z * t.s));
  const z = r.pick(ok.length ? ok : [2]);
  return { X: Math.round(m + z * t.s), z };
}

function zchi(r: Rng): QuestionBody {
  const t = r.pick(SET);
  const m = (t.n * t.pn) / t.pd;
  const { X, z } = pickX(r, t, [-2.4, -2, -1.6, -1.2, -0.8, 0.4, 0.8, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 3]);
  const sc = scene(t);
  return {
    prompt: `${sc.act}${X} 回起こった。「${sc.h0}」と仮定し、起こった回数 X を正規分布で近似するとき、X＝${X} を標準化した値 Z を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(z)], calc: `(${X}-${t.n}*${ps(t)})/${t.s}`, labels: ["Z ="] },
    point: "Z＝(X−np₀)/√{np₀(1−p₀)}",
    steps: [
      { title: "平均と標準偏差", body: `X は B(${t.n}, ${ps(t)}) にしたがうので、m＝${t.n}×${ps(t)}＝${m}、σ＝√{${t.n}×${ps(t)}×${fr(t.pd - t.pn, t.pd)}}＝${t.s}。`, back: [S4] },
      { title: "標準化", body: `Z＝(${X}−${m})÷${t.s}＝{{${D(z)}}}。`, trap: "分散 " + t.s * t.s + " でわらない。わるのは標準偏差 σ。" },
    ],
  };
}

const KIMU: { ctx: string; h0: string; wrong: string[]; one: boolean }[] = [
  { ctx: "ある硬貨は表が出やすいのではないか", h0: "表の出る確率は 1/2 である", wrong: ["表の出る確率は 1/2 より大きい", "表の出る確率は 1/2 ではない", "表の出る確率は 1/2 より小さい"], one: true },
  { ctx: "あるさいころは6の目の出やすさにかたよりがあるのではないか", h0: "6の目の出る確率は 1/6 である", wrong: ["6の目の出る確率は 1/6 ではない", "6の目の出る確率は 1/6 より大きい", "6の目は必ず出る"], one: false },
  { ctx: "新しい肥料を使うと、種の発芽率が従来の 0.8 より上がるのではないか", h0: "発芽率は 0.8 である", wrong: ["発芽率は 0.8 より大きい", "発芽率は 0.8 ではない", "発芽率は 1 である"], one: true },
  { ctx: "ある部の部員は、AとBの2つの味を区別できるのではないか", h0: "当てずっぽうに答えていて、正解の確率は 1/2 である", wrong: ["正解の確率は 1/2 より大きい", "必ず正解する", "正解の確率は 1/2 ではない"], one: true },
  { ctx: "あるくじは、当たりの確率が表示の 1/5 とちがうのではないか", h0: "当たりの確率は 1/5 である", wrong: ["当たりの確率は 1/5 ではない", "当たりの確率は 1/5 より小さい", "当たりは入っていない"], one: false },
];
function kimu(r: Rng): QuestionBody {
  const k = r.pick(KIMU);
  const opts = r.shuffle([k.h0, ...k.wrong]);
  const correct = opts.indexOf(k.h0);
  return {
    prompt: `「${k.ctx}」ということを仮説検定で調べたい。帰無仮説として正しいものはどれですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct,
      why: opts.map((o, i) => (i === correct ? "正しい。帰無仮説は「かたよりがない・変わらない」という、否定したい側の仮説。" : o === k.wrong[0] ? "これは対立仮説 (主張したいこと)。帰無仮説ではない。" : "帰無仮説は、確率を1つの値に決めて計算できる形にする。")),
    },
    point: "帰無仮説は「かたよりがない・変化がない」側",
    steps: [
      { title: "主張したいこと", body: `主張したいのは「${k.wrong[0]}」で、これが{{対立仮説}}。`, back: [S3] },
      { title: "帰無仮説", body: `それを否定する「{{${k.h0}}}」を帰無仮説にします。確率が1つに決まるので、起こりやすさを計算できます。${k.one ? "対立仮説が「大きい」の一方向なので片側検定。" : "対立仮説が「ちがう」なので両側検定。"}`, back: [S1] },
    ],
  };
}

function ryogawa(r: Rng): QuestionBody {
  const t = r.pick(SET.filter((x) => x.pd !== 5));
  const m = (t.n * t.pn) / t.pd;
  const { X, z } = pickX(r, t, [-2.6, -2.2, -2, -1.6, -1.2, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.8]);
  const sc = scene(t);
  const rej = Math.abs(z) >= 1.96;
  const opts = r.shuffle([0, 1, 2, 3]);
  const text = [
    "帰無仮説は棄却され、かたよりがあるといえる",
    "帰無仮説は棄却されず、かたよりがあるとはいえない",
    "帰無仮説は棄却されず、かたよりがないといえる",
    "帰無仮説は棄却され、かたよりがないといえる",
  ];
  const ok = rej ? 0 : 1;
  const why = [
    rej ? "正しい。|Z|≧1.96 で棄却域に入る。" : `|Z|＝${Math.abs(z)}＜1.96 で棄却域に入らないので、棄却されない。`,
    rej ? `|Z|＝${Math.abs(z)}≧1.96 で棄却域に入るので、棄却される。` : "正しい。棄却されないときは「あるとはいえない」と書く。",
    "棄却されなくても、帰無仮説が正しいと証明されたわけではない。「ないといえる」とは書けない。",
    "棄却されたときの結論は「かたよりがある」。逆になっている。",
  ];
  return {
    prompt: `${sc.act}${X} 回起こった。${sc.what}にかたよりがあるかどうかを、有意水準5%で両側検定する。結論として正しいものはどれですか。ただし、正規分布で近似し、有意水準5%の両側検定の棄却域は |Z|≧1.96 とする。`,
    answer: { kind: "choice", options: opts.map((i) => text[i]), correct: opts.indexOf(ok), why: opts.map((i) => why[i]) },
    point: "Z を求めて棄却域と比べる。棄却されないときの書き方に注意",
    steps: [
      { title: "Z を求める", body: `帰無仮説「${sc.h0}」のもとで m＝${m}、σ＝${t.s}。Z＝(${X}−${m})÷${t.s}＝${D(z)}。`, back: [S4] },
      { title: "棄却域と比べる", body: `|Z|＝${Math.abs(z)} ${rej ? "≧" : "＜"} 1.96 なので、{{${rej ? "棄却される" : "棄却されない"}}}。`, back: [S5] },
      { title: "結論", body: rej ? "かたよりがあるといえます。" : "かたよりがあるとはいえません。「かたよりがない」と言い切ることはできません。", back: [S6] },
    ],
  };
}

function kocha(r: Rng): QuestionBody {
  const mm = r.int(3, 5);
  const kind = mm === 4 ? r.int(0, 1) : 0;
  const all = C(2 * mm, mm);
  const drink = r.pick([
    ["ミルクを先に入れた紅茶", "紅茶を先に入れたもの"],
    ["国産の豆のコーヒー", "外国産の豆のコーヒー"],
    ["水道水", "ミネラルウォーター"],
  ]);
  if (kind === 1) {
    const hit = C(4, 3) * C(4, 1) + 1;
    return {
      prompt: `${drink[0]} 4杯と${drink[1]} 4杯の合わせて 8杯を、区別できないように並べた。ある人が「${drink[0]}はどれか」を 4杯選ぶとき、でたらめに選んでも 4杯のうち3杯以上が当たる確率を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [fr(hit, all)], calc: `(${C(4, 3)}*${C(4, 1)}+1)/${all}` },
      point: "選び方 8C4＝70 通りがどれも同様に確からしい",
      steps: [
        { title: "全部の選び方", body: `8杯から4杯選ぶので 8C4＝{{${all}}}（通り）。`, back: [S2] },
        { title: "3杯以上当たる", body: `ちょうど3杯：4C3×4C1＝16（通り）、4杯全部：1通り。合わせて 17通りで、確率は {{${fr(hit, all)}}}。`, trap: "17/70 は約 0.24。5% より大きいので、3杯当てても「区別できる」とはいえない。" },
      ],
    };
  }
  return {
    prompt: `${drink[0]} ${mm}杯と${drink[1]} ${mm}杯の合わせて ${2 * mm}杯を、区別できないように並べた。ある人が「${drink[0]}はどれか」を ${mm}杯選ぶとき、でたらめに選んで ${mm}杯すべてが当たる確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(1, all)], calc: `1/${all}` },
    point: "全部当たるのは選び方のうち1通りだけ",
    steps: [
      { title: "全部の選び方", body: `${2 * mm}杯から${mm}杯選ぶので ${2 * mm}C${mm}＝{{${all}}}（通り）。`, back: [S2] },
      { title: "全部当たる", body: `正しい組は1通りなので、確率は {{1/${all}}}。${all === 20 ? "これはちょうど 5%。" : "これは 5% より小さいので、全部当てれば偶然とは考えにくい。"}`, back: [S1] },
    ],
  };
}

function katagawa(r: Rng): QuestionBody {
  const t = r.pick(SET.filter((x) => x.pd === 5));
  const m = (t.n * t.pn) / t.pd;
  const { X, z } = pickX(r, t, [1, 1.2, 1.5, 1.6, 1.7, 1.75, 1.8, 2, 2.5]);
  const p0 = ps(t);
  return {
    prompt: `ある植物の種は、これまで発芽率 ${p0} だった。新しい育て方で ${t.n} 個をまいたところ ${X} 個が発芽した。「発芽率が上がった」といえるかを有意水準5%で片側検定するとき、帰無仮説のもとで発芽する個数 X を正規分布で近似して、Z の値を求めなさい。また、片側検定の棄却域を Z≧1.64 として、棄却されるなら 1、されないなら 0 と答えなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(z), z >= 1.64 ? "1" : "0"], labels: ["Z =", "棄却 (1か0)"], equations: [`x=(${X}-${t.n}*${p0})/${t.s}`, `x^2*${t.s * t.s}=(${X}-${t.n}*${p0})^2`] },
    point: "「上がった」は片側。Z≧1.64 なら棄却",
    steps: [
      { title: "帰無仮説", body: `帰無仮説「発芽率は ${p0}」、対立仮説「発芽率は ${p0} より大きい」。片側検定です。`, back: [S3] },
      { title: "Z", body: `m＝${t.n}×${p0}＝${m}、σ＝√{${t.n}×${p0}×${fr(t.pd - t.pn, t.pd)}}＝${t.s}。Z＝(${X}−${m})÷${t.s}＝{{${z}}}。`, back: [S4] },
      { title: "判定", body: `${z} ${z >= 1.64 ? "≧" : "＜"} 1.64 なので {{${z >= 1.64 ? "棄却される (1)" : "棄却されない (0)"}}}。${z >= 1.64 ? "発芽率は上がったといえます。" : "上がったとはいえません。"}`, back: [S5, S6], trap: z >= 1.64 && z < 1.96 ? "両側の 1.96 と比べると棄却されないが、この問題は片側検定。" : "片側検定の境目は 1.64。両側の 1.96 と取りちがえない。" },
    ],
  };
}

function kurabe(r: Rng): QuestionBody {
  const t = r.pick(SET.filter((x) => x.pd === 2 || x.pd === 6));
  const m = (t.n * t.pn) / t.pd;
  const { X, z } = pickX(r, t, [1.4, 1.6, 1.7, 1.8, 2, 2.2, 1.2]);
  const sc = scene(t);
  const one = z >= 1.64;
  const two = z >= 1.96;
  const idx = (one ? 2 : 0) + (two ? 1 : 0);
  const text = ["片側でも両側でも棄却されない", "", "片側では棄却されるが、両側では棄却されない", "片側でも両側でも棄却される"];
  const choices = [0, 2, 3, 4];
  const label = (i: number) => (i === 4 ? "片側では棄却されないが、両側では棄却される" : text[i]);
  const opts = r.shuffle(choices);
  const whyOf = (i: number) =>
    i === idx
      ? `正しい。Z＝${z} を 1.64 と 1.96 の両方と比べた結果。`
      : i === 4
        ? "片側の境目 1.64 は両側の 1.96 より小さいので、両側で棄却されるなら片側でも必ず棄却される。"
        : `Z＝${z} は ${one ? "1.64 以上" : "1.64 未満"}${one ? `、${two ? "1.96 以上" : "1.96 未満"}` : ""} なので、この組み合わせにはならない。`;
  return {
    prompt: `${sc.act}${X} 回起こった。「${sc.h0}」を帰無仮説とし、正規分布で近似して有意水準5%で検定する。対立仮説を「確率は ${ps(t)} より大きい」とする片側検定 (棄却域 Z≧1.64) と、「確率は ${ps(t)} でない」とする両側検定 (棄却域 |Z|≧1.96) の結果として正しいものはどれですか。`,
    answer: { kind: "choice", options: opts.map(label), correct: opts.indexOf(idx), why: opts.map(whyOf) },
    point: "同じ Z でも、片側か両側かで結論が変わることがある",
    steps: [
      { title: "Z を求める", body: `m＝${m}、σ＝${t.s}。Z＝(${X}−${m})÷${t.s}＝${z}。`, back: [S4] },
      { title: "2つの棄却域と比べる", body: `片側：${z} ${one ? "≧" : "＜"} 1.64、両側：${z} ${two ? "≧" : "＜"} 1.96。よって {{${text[idx]}}}。`, back: [S3, S5], trap: "どちらの検定を使うかは、データを見る前に対立仮説で決めておく。結果を見てから選ぶのは不正。" },
    ],
  };
}

export const H_MATH_B_KENTEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学B",
  review: { status: "draft" },
  sections: [
    {
      title: "仮説と検定統計量",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "kimu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kimu },
        { id: "zchi", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: zchi },
        { id: "kocha", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: kocha },
      ],
    },
    {
      title: "検定の結論",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "ryogawa", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: ryogawa },
        { id: "katagawa", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: katagawa },
        { id: "kurabe", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: kurabe },
      ],
    },
  ],
};
