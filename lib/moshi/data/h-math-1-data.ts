// 数学Ⅰ「データの分析」の単元模試 (A: データを入れかえる生成型)。問題はすべてオリジナル。データはすべて架空。
// 検算: 四分位数・分散は、並べたデータから生成関数の中で計算し、calc (中央値の平均・偏差の2乗の和÷個数) で照合する。
//   相関係数は偏差を (−2, −1, 0, 1, 2) の並べかえで作り、r＝(共分散)÷(標準偏差の積) を calc に書く。
//   仮説検定は、rng でコイン20回×1000セットを実際にシミュレーションした度数から割合を出す (シードごとに結果が変わる)。
//   scripts/check-moshi.ts がシード1〜100で確かめる。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-data";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "四分位数と箱ひげ図：データを4つに分ける");
const S2 = L(2, "分散と標準偏差：平均からのずれの大きさ");
const S3 = L(3, "変量の変換：全体をずらす・何倍かする");
const S4 = L(4, "相関係数：2つの量の直線的な関係");
const S5 = L(5, "相関と因果：隠れた第3の変数と層別");
const S6 = L(6, "仮説検定の考え方：偶然でも起こるか");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
function poly(ts: [number, string][], ascii = false): string {
  let out = "";
  for (const [c, m0] of ts) {
    if (c === 0) continue;
    const m = ascii ? m0.replace(/²/g, "^2").replace(/³/g, "^3").replace(/⁴/g, "^4") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}

const f3 = (x: number) => String(Math.round(x * 1000) / 1000);
/** 並べたデータの中央値 [値, calc 用の式] */
function med(xs: number[]): [number, string] {
  const n = xs.length;
  if (n % 2) return [xs[(n - 1) / 2], String(xs[(n - 1) / 2])];
  const a = xs[n / 2 - 1];
  const b = xs[n / 2];
  return [(a + b) / 2, `(${a}+${b})/2`];
}

function shibuni(r: Rng): QuestionBody {
  const n = r.int(8, 11);
  const xs = Array.from({ length: n }, () => r.int(2, 30)).sort((a, b) => a - b);
  const h = Math.floor(n / 2);
  const lower = xs.slice(0, h);
  const upper = xs.slice(n % 2 ? h + 1 : h);
  const [q1, e1] = med(lower);
  const [q3, e3] = med(upper);
  const [q2] = med(xs);
  const what = r.pick(["1週間の運動時間（時間）", "1日の通学時間（分）", "小テストの得点（点）", "1か月に図書室を利用した回数（回）"]);
  return {
    prompt: `次のデータは、${n}人の${what}を小さい順に並べたものである。\n${xs.join(", ")}\nこのデータの四分位範囲を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f3(q3 - q1)], calc: `${e3}-${e1}` },
    point: "前半・後半それぞれの中央値が Q1・Q3。範囲は Q3−Q1",
    steps: [
      { title: "前半と後半に分ける", body: `中央値 Q2＝${f3(q2)}。${n % 2 ? `個数が奇数なので、まん中の ${xs[h]} は前半にも後半にも入れない。` : ""}前半は ${lower.join(", ")}、後半は ${upper.join(", ")}。`, back: [S1] },
      { title: "Q1 と Q3", body: `Q1＝${f3(q1)}、Q3＝${f3(q3)}。四分位範囲は ${f3(q3)} − ${f3(q1)}＝{{${f3(q3 - q1)}}}。`, trap: "範囲（最大値−最小値）と四分位範囲（Q3−Q1）を取りちがえない。" },
    ],
  };
}

function bunsan(r: Rng): QuestionBody {
  let ds: number[] = [];
  for (let i = 0; i < 60; i++) {
    ds = Array.from({ length: 4 }, () => r.int(-6, 6));
    const last = -ds.reduce((s, x) => s + x, 0);
    if (Math.abs(last) <= 7) {
      ds.push(last);
      break;
    }
  }
  if (ds.length !== 5) ds = [-3, -1, 0, 1, 3];
  const m = r.int(8, 20);
  const xs = r.shuffle(ds).map((d) => m + d);
  const dev = xs.map((x) => x - m);
  const ss = dev.reduce((s, d) => s + d * d, 0);
  return {
    prompt: `5個のデータ ${xs.join(", ")} の分散を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f3(ss / 5)], calc: `(${dev.map((d) => `(${d})^2`).join("+")})/5` },
    point: "偏差（値−平均）の2乗の平均が分散",
    steps: [
      { title: "平均と偏差", body: `平均は (${xs.join("+")})÷5＝${m}。偏差は ${dev.map(D).join(", ")}。`, back: [S2] },
      { title: "偏差の2乗の平均", body: `2乗すると ${dev.map((d) => d * d).join(", ")}、和は ${ss}。分散は ${ss}÷5＝{{${f3(ss / 5)}}}。`, trap: "偏差をそのまま足すと 0 になる。2乗してから平均する。" },
    ],
  };
}

function henkan(r: Rng): QuestionBody {
  const mx = r.int(40, 70);
  const sx = r.int(2, 9);
  const a = r.pick([2, 3, -2, -3, 5, -1]);
  const b = r.int(-20, 30);
  const kind = r.int(0, 2);
  const names = ["平均値", "分散", "標準偏差"];
  const ans = kind === 0 ? a * mx + b : kind === 1 ? a * a * sx * sx : Math.abs(a) * sx;
  const calc = kind === 0 ? `${a}*${mx}+(${b})` : kind === 1 ? `(${a})^2*${sx}^2` : `${Math.abs(a)}*${sx}`;
  const yx = poly([[a, "x"], [b, ""]]);
  return {
    prompt: `変量 x のデータの平均値が ${mx}、標準偏差が ${sx} である。y＝${yx} によって新しい変量 y を作るとき、y の${names[kind]}を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], calc },
    point: "y＝ax＋b なら 平均は a倍＋b、分散は a²倍、標準偏差は |a|倍",
    steps: [
      { title: "変換のきまり", body: `平均値は ${pa(a)}×${mx}${b === 0 ? "" : ` ${b < 0 ? "−" : "+"} ${Math.abs(b)}`}、分散は ${pa(a)}²×${sx}²、標準偏差は |${D(a)}|×${sx}。b は散らばりに関係しない。`, back: [S3] },
      { title: "計算する", body: `y の${names[kind]}は {{${D(ans)}}}。`, trap: kind === 2 && a < 0 ? `標準偏差は負にならない。${D(a)} 倍ではなく |${D(a)}|＝${-a} 倍。` : kind === 1 ? "分散は a 倍ではなく a² 倍。b を足しても変わらない。" : "平均値には b もそのまま足される。" },
    ],
  };
}

function soukan(r: Rng): QuestionBody {
  let dy: number[] = [];
  let S = 0;
  const dx = [-2, -1, 0, 1, 2];
  for (let i = 0; i < 60; i++) {
    dy = r.shuffle(dx);
    S = dx.reduce((s, x, k) => s + x * dy[k], 0);
    if (Math.abs(S) >= 3) break;
  }
  if (Math.abs(S) < 3) {
    dy = [-1, -2, 0, 2, 1];
    S = dx.reduce((s, x, k) => s + x * dy[k], 0);
  }
  const sx = r.pick([1, 2, 3, 5]);
  const sy = r.pick([1, 2, 3, 4]);
  const mx = 2 * sx + r.int(1, 12);
  const my = r.int(20, 60);
  const xs = dx.map((d) => mx + sx * d);
  const ys = dy.map((d) => my + sy * d);
  const pr = xs.map((x, k) => (x - mx) * (ys[k] - my));
  const cov = (sx * sy * S) / 5;
  const [vx, vy] = [2 * sx * sx, 2 * sy * sy];
  const rv = f3(S / 10);
  return {
    prompt: `2つの変量 x、y の5組のデータがある。\nx：${xs.map(D).join(", ")}\ny：${ys.map(D).join(", ")}\nx と y の相関係数を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [rv], calc: `(${pr.map((p) => `(${p})`).join("+")})/5/(√${vx}*√${vy})` },
    point: "r＝（共分散）÷（x の標準偏差 × y の標準偏差）",
    steps: [
      { title: "平均と偏差", body: `x の平均 ${mx}、y の平均 ${my}。x の偏差 ${xs.map((x) => D(x - mx)).join(", ")}、y の偏差 ${ys.map((y) => D(y - my)).join(", ")}。`, back: [S2] },
      { title: "共分散", body: `偏差の積は ${pr.map(D).join(", ")}。和 ${D(pr.reduce((s, p) => s + p, 0))} を5でわって、共分散は ${D(f3(cov))}。`, back: [S4] },
      { title: "相関係数", body: `x の分散 ${vx}、y の分散 ${vy}。r＝${D(f3(cov))}÷(√${vx}×√${vy})＝{{${D(rv)}}}。`, trap: "共分散をそのまま答えにしない。標準偏差の積でわると −1 から 1 の間になる。" },
    ],
  };
}

const CASES: [string, string, string, string][] = [
  ["ある年の月ごとに", "アイスクリームの売り上げ", "プールでのけがの件数", "気温"],
  ["いくつかの市町村ごとに", "図書館の数", "交通事故の件数", "人口"],
  ["いくつかの都市ごとに", "消防署員の数", "火事の件数", "都市の人口（規模）"],
  ["ある年の月ごとに", "暖房器具の売り上げ", "かぜで病院に来た人の数", "気温（季節）"],
  ["ある夏の日ごとに", "日焼け止めの売り上げ", "熱中症で運ばれた人の数", "気温や日ざし"],
  ["いくつかの町ごとに", "コンビニエンスストアの数", "小学校の児童数", "人口"],
];

function inga(r: Rng): QuestionBody {
  const [when, X, Y, Z] = r.pick(CASES);
  const rv = r.pick(["0.72", "0.78", "0.81", "0.85", "0.88", "0.91"]);
  const pct = String(Math.round(Number(rv) * 100));
  const opts = [
    `${Z}のような第3の変数が、両方に関係している可能性がある。この相関だけでは、${X}が${Y}の原因とは言えない。`,
    `相関係数が大きいので、${X}をふやせば${Y}もふえる。`,
    `相関係数が ${rv} なので、${Y}の ${pct}％は${X}によって決まる。`,
    `相関係数が 1 ではないので、${X}と${Y}には関係がない。`,
  ];
  const whys = [
    `正しい。${Z}が大きいと、${X}も${Y}も大きくなりやすい。相関は因果を表すとは限らない。`,
    "相関があることと、一方が原因であることは別。因果関係までは言えない。",
    "相関係数は直線的な関係の強さを表す数で、割合（％）ではない。",
    `${rv} は強い正の相関。1 でないからといって関係がないとは言えない。`,
  ];
  const idx = r.shuffle([0, 1, 2, 3]);
  return {
    prompt: `${when}、${X}と${Y}を調べたところ、相関係数は ${rv} であった（データは架空）。この結果の読み取りとして、最も適切なものはどれですか。`,
    answer: { kind: "choice", options: idx.map((i) => opts[i]), correct: idx.indexOf(0), why: idx.map((i) => whys[i]) },
    point: "相関があっても因果とは限らない。第3の変数をうたがう",
    steps: [
      { title: "相関の強さ", body: `r＝${rv} は 1 に近いので、強い正の相関がある。`, back: [S4] },
      { title: "原因かどうか", body: `${X}と${Y}の両方を動かす {{${Z}}} が考えられる。相関だけでは、どちらかが原因とは言えない。`, back: [S5], trap: "「相関がある」＝「原因と結果の関係がある」ではない。" },
    ],
  };
}

const WHO: [string, string][] = [
  ["バスケットボール部の生徒", "フリースローの新しいフォーム"],
  ["ある人", "クイズの新しい勉強法"],
  ["ゲームの好きな人", "新しい作戦"],
  ["テニス部の生徒", "サーブの新しい練習法"],
];

function kentei(r: Rng): QuestionBody {
  const [who, what] = r.pick(WHO);
  const w = r.pick([12, 13, 15, 16]); // 14回は 5％ の境目に近く、シミュレーションの誤差で判断がゆれるので使わない
  // コイン20回 × 1000セットのシミュレーション (表の回数ごとの度数)
  const cnt = Array.from({ length: 21 }, () => 0);
  for (let s = 0; s < 1000; s++) {
    let h = 0;
    for (let k = 0; k < 20; k++) if (r.next() < 0.5) h++;
    cnt[h]++;
  }
  const geq = cnt.slice(w).reduce((s, x) => s + x, 0);
  const P = f3(geq / 10);
  const Qx = f3(cnt[w] / 10);
  const small = geq / 10 < 5;
  const below = cnt.slice(0, 11).reduce((s, x) => s + x, 0);
  const rows = [`10回以下：${below}`, ...Array.from({ length: 10 }, (_, i) => `${i + 11}回：${cnt[i + 11]}`)].join("、");
  const opts = [
    `${w}回以上の割合は ${P}％ なので、${what}には効果があると判断できる。`,
    `${w}回以上の割合は ${P}％ なので、${what}に効果があるとは言えない。`,
    `ちょうど${w}回の割合は ${Qx}％ なので、${cnt[w] / 10 < 5 ? `${what}には効果があると判断できる` : `${what}に効果があるとは言えない`}。`,
    `20回の半分の10回より多く成功しているので、${what}には効果があると判断できる。`,
  ];
  const correct = small ? 0 : 1;
  const whys = [
    small ? `正しい。${P}％ は 5％ より小さく、「効果はない」としてはめったに起こらないことが起きたと考える。` : `${P}％ は 5％ 以上なので、偶然でも起こりうる。効果があるとは言えない。`,
    small ? `${P}％ は 5％ より小さいので、偶然ではめったに起こらない。効果があると判断する。` : `正しい。${P}％ は 5％ 以上で、「効果はない」としても十分起こりうる結果。`,
    `「${w}回ちょうど」ではなく「${w}回以上（それ以上にかたよった結果もふくめる）」の割合で判断する。`,
    "効果がなくても、10回より多く成功することはよくある。偶然で起こる割合を調べて判断する。",
  ];
  const idx = r.shuffle([0, 1, 2, 3]);
  return {
    prompt: `${who}が${what}を試したところ、20回中 ${w}回成功した。ふだんの成功率は 1/2 とする。「${what}に効果はない（成功率は 1/2 のまま）」と仮定し、コインを20回投げて表が出た回数を記録することを1000回くり返したところ、表が出た回数ごとの度数は次のようになった。\n${rows}\n基準を 5％ として判断するとき、正しいものはどれですか。`,
    answer: { kind: "choice", options: idx.map((i) => opts[i]), correct: idx.indexOf(correct), why: idx.map((i) => whys[i]) },
    point: "仮説のもとで、その結果以上にかたよる割合を5％と比べる",
    steps: [
      { title: "仮説を立てる", body: `「効果はない」と仮定すると、成功の回数は、コインを20回投げたときの表の回数と同じように散らばる。`, back: [S6] },
      { title: "割合を求める", body: `${w}回以上は ${cnt.slice(w).join("＋")}＝${geq}（回）。1000回中なので {{${P}％}}。` },
      { title: "5％と比べる", body: `${P}％ は 5％${small ? "より小さい" : "以上"}。{{${small ? "仮説を捨て、効果があると判断する" : "偶然でも起こりうるので、効果があるとは言えない"}}}。`, trap: "「効果がない」と言い切るのではなく、「効果があるとは言えない」と判断する。" },
    ],
  };
}

export const H_MATH_1_DATA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "四分位数と分散",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "shibuni", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: shibuni },
        { id: "bunsan", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: bunsan },
      ],
    },
    {
      title: "変量の変換・相関",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "henkan", type: "A", difficulty: 2, points: 16, seconds: 75, skill: "知識・技能", generate: henkan },
        { id: "soukan", type: "A", difficulty: 2, points: 16, seconds: 180, skill: "知識・技能", generate: soukan },
        { id: "inga", type: "A", difficulty: 2, points: 16, seconds: 75, skill: "思考・判断・表現", generate: inga },
      ],
    },
    {
      title: "仮説検定の考え方",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [{ id: "kentei", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: kentei }],
    },
  ],
};
