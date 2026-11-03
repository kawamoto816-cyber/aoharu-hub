// 情報Ⅰ「データの活用」の単元模試 (A: データを入れかえる生成型 ＋ B: 用語・考え方のプール)。問題はすべてオリジナル。
// 検算: 平均値は 合計÷個数、中央値は並べた真ん中 (偶数個は真ん中2つの平均)、最頻値は最も多い値を JS で求めて calc に。
//   四分位範囲は、中央値で前半・後半に分け (奇数個のときは中央値を除く) それぞれの中央値の差を calc に。
//   分散・標準偏差は、和が 0 になる偏差の組を先に決めて平均に足してデータを作り、偏差の2乗の平均 (標準偏差はその値が
//   平方数のときだけ) を calc に書く (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-data";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "まずデータの種類を見分ける");
const S2 = L(2, "代表値：平均値・中央値・最頻値");
const S3 = L(3, "散らばり：四分位数と標準偏差");
const S4 = L(4, "2つの量の関係：相関と因果");
const S5 = L(5, "問題解決の流れ：PPDACサイクル");

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};
const num = (x: number) => String(Math.round(x * 1000) / 1000);

function daihyo(r: Rng): QuestionBody {
  const kind = r.int(0, 2);
  if (kind === 0) {
    const n = r.int(5, 8);
    const mean = r.int(4, 20);
    const xs = Array.from({ length: n - 1 }, () => mean + r.int(-4, 4));
    xs.push(mean * n - xs.reduce((a, b) => a + b, 0));
    if (xs[n - 1] < 0) return daihyo(r);
    const data = r.shuffle(xs);
    return {
      prompt: `次のデータの平均値を求めなさい。\n${data.join(", ")}`,
      answer: { kind: "num", answerKind: "num", answer: [String(mean)], calc: `(${data.join("+")})/${n}` },
      point: "平均値＝合計÷個数",
      steps: [{ title: "合計÷個数", body: `合計 ${mean * n} を個数 ${n} で割って {{${mean}}}。`, back: [S2] }],
    };
  }
  if (kind === 1) {
    const n = r.int(6, 9);
    const data = Array.from({ length: n }, () => r.int(1, 40));
    const m = median(data);
    const s = [...data].sort((a, b) => a - b);
    return {
      prompt: `次のデータの中央値を求めなさい。\n${data.join(", ")}`,
      answer: { kind: "num", answerKind: "num", answer: [num(m)], calc: n % 2 ? String(m) : `(${s[n / 2 - 1]}+${s[n / 2]})/2` },
      point: "小さい順に並べた真ん中。偶数個なら真ん中2つの平均",
      steps: [
        { title: "並べる", body: `${s.join(", ")}（${n}個）。`, back: [S2] },
        { title: "真ん中", body: n % 2 ? `${(n + 1) / 2} 番目の {{${m}}}。` : `${n / 2} 番目と ${n / 2 + 1} 番目の平均で {{${num(m)}}}。`, trap: "並べかえずに、書かれた順の真ん中をとらない。" },
      ],
    };
  }
  const mode = r.int(2, 9);
  const others = r.sample([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((v) => v !== mode), 4);
  const data = r.shuffle([mode, mode, mode, others[0], others[0], others[1], others[2], others[3]]);
  return {
    prompt: `ある店で1週間に売れた傘の色を番号で記録した（番号は色の種類を表す）。最頻値を答えなさい。\n${data.join(", ")}`,
    answer: { kind: "num", answerKind: "num", answer: [String(mode)], calc: String(mode) },
    point: "最頻値は最も多く現れる値。名義尺度でも使える",
    steps: [{ title: "回数を数える", body: `${mode} が3回で最も多いので {{${mode}}}。この番号は色の種類なので、平均値を出しても意味がありません。`, back: [S2, S1] }],
  };
}

function shikui(r: Rng): QuestionBody {
  const n = r.pick([7, 8, 9, 10, 11]);
  const data = Array.from({ length: n }, () => r.int(10, 60));
  const s = [...data].sort((a, b) => a - b);
  const h = Math.floor(n / 2);
  const lo = s.slice(0, h);
  const hi = s.slice(n - h);
  const q1 = median(lo);
  const q3 = median(hi);
  const v = num(q3 - q1);
  return {
    prompt: `次の ${n}個のデータの四分位範囲を求めなさい。\n${data.join(", ")}`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${q3}-${q1}` },
    point: "四分位範囲＝第3四分位数−第1四分位数",
    steps: [
      { title: "並べて半分に分ける", body: `${s.join(", ")}。${n % 2 ? "中央値を除いて" : ""}前半 ${lo.join(", ")}、後半 ${hi.join(", ")}。`, back: [S3] },
      { title: "それぞれの中央値", body: `第1四分位数 ${num(q1)}、第3四分位数 ${num(q3)}。` },
      { title: "差", body: `${num(q3)} − ${num(q1)}＝{{${v}}}。`, trap: "範囲（最大−最小）と取りちがえない。" },
    ],
  };
}

const DEV: number[][] = [
  [-2, -2, 2, 2], [-3, -1, 1, 3], [-4, 0, 0, 4], [-1, -1, -1, 3], [-2, -1, 0, 1, 2], [-4, -2, 0, 2, 4],
  [-3, -3, 3, 3], [-1, -1, 1, 1], [-4, -4, 4, 4], [-5, -1, 1, 5], [-6, -2, 2, 6], [-3, 0, 0, 0, 3], [-2, -2, 0, 2, 2], [-4, -3, -1, 0, 3, 5],
];

function bunsan(r: Rng): QuestionBody {
  const dev = r.pick(DEV);
  const mean = r.int(5, 70);
  const data = r.shuffle(dev.map((d) => mean + d));
  const n = dev.length;
  const ss = dev.reduce((a, d) => a + d * d, 0);
  const vr = ss / n;
  const sd = Math.sqrt(vr);
  const askSd = Number.isInteger(sd) && r.bool(0.6);
  const v = askSd ? String(sd) : num(vr);
  return {
    prompt: `次のデータの${askSd ? "標準偏差" : "分散"}を求めなさい。\n${data.join(", ")}`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: askSd ? String(sd) : `(${dev.map((d) => `(${d})^2`).join("+")})/${n}` },
    point: askSd ? "標準偏差＝分散の正の平方根" : "分散＝偏差の2乗の平均",
    steps: [
      { title: "平均と偏差", body: `平均値は ${mean}。偏差は ${data.map((x) => x - mean).join(", ").replace(/-/g, "−")}。`, back: [S3] },
      { title: "2乗して平均", body: `偏差の2乗の和 ${ss} を ${n} で割って、分散は ${num(vr)}。`, trap: "偏差をそのまま足すと 0 になる。2乗してから平均する。" },
      ...(askSd ? [{ title: "平方根", body: `√${vr}＝{{${sd}}}。` }] : []),
    ],
  };
}

const P = { 1: 15, 2: 16, 3: 22 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("shitsuteki", 1),
    prompt: "次のうち、質的データ（名義尺度）はどれですか。",
    answer: {
      kind: "choice",
      options: ["郵便番号", "気温（℃）", "身長（cm）", "テストの点数"],
      correct: 0,
      why: ["正しい。数字で書かれていても地域を区別するための記号で、平均しても意味がない。", "気温は量的データ（間隔尺度）。", "身長は量的データ（比例尺度）。", "点数は量的データ。"],
    },
    point: "数字で書かれていても、区別のための記号なら質的データ",
    steps: [{ title: "計算に意味があるか", body: "出席番号や郵便番号は数字でも{{名義尺度}}。足したり平均したりしても意味がありません。", back: [S1] }],
  },
  {
    ...base("hazure", 1),
    prompt: "年収のデータに、ほかより極端に大きい値（外れ値）がふくまれている。データ全体の「ふつう」を表す代表値として、ふつう適しているのはどれですか。",
    answer: {
      kind: "choice",
      options: ["中央値", "平均値", "最大値", "合計"],
      correct: 0,
      why: ["正しい。真ん中の順位の値なので、外れ値があってもほとんど動かない。", "平均値は外れ値に引っぱられて大きくなる。", "最大値は外れ値そのもの。", "合計は代表値ではない。"],
    },
    point: "外れ値があるときは中央値",
    steps: [{ title: "外れ値の影響", body: "外れ値があると{{平均値は大きく動く}}が、{{中央値はほとんど動かない}}。", back: [S2] }],
  },
  {
    ...base("soukan", 2, "思考・判断・表現"),
    prompt: "ある地域で、1日の最高気温と熱中症で運ばれた人の数の相関係数が 0.85 だった。この結果の読み取りとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["強い正の相関があり、気温が高い日ほど運ばれた人が多い傾向がある", "強い負の相関があり、気温が高い日ほど運ばれた人が少ない", "相関係数が1でないので、関係はまったくない", "運ばれた人の数の 85% は気温が原因である"],
      correct: 0,
      why: ["正しい。1に近い正の値なので強い正の相関。", "正の値なので負の相関ではない。", "1でなくても、0.85 は強い相関。", "相関係数は割合ではない。原因の割合も表さない。"],
    },
    point: "相関係数は −1〜1。±1に近いほど強い",
    steps: [{ title: "符号と大きさ", body: "正の値なら右上がり（{{正の相関}}）。±1 に近いほど強い相関です。", back: [S4] }],
  },
  {
    ...base("ppdac", 2),
    prompt: "PPDAC サイクルで、データを集めたあと分析の前に、入力ミスや欠けた値を見つけて整える作業を何といいますか。",
    answer: {
      kind: "choice",
      options: ["データクレンジング", "クロスチェック", "シミュレーション", "デバッグ"],
      correct: 0,
      why: ["正しい。分析の前にデータを整える作業。", "クロスチェックは、複数の情報源で確かめること。", "シミュレーションは、モデルを使って結果を予測すること。", "デバッグは、プログラムのまちがいを直すこと。"],
    },
    point: "集めたデータは、分析の前に整える",
    steps: [{ title: "分析の前に", body: "集めたデータには入力ミスや欠けた値がまじるので、{{データクレンジング}}で整えてから分析します。", back: [S5] }],
  },
  {
    ...base("inga", 3, "思考・判断・表現"),
    prompt: "全国の市町村のデータで、「図書館の数」と「交通事故の件数」に強い正の相関があった。この関係の説明として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["人口の多さという別の要因が、両方を大きくしていると考えられる", "図書館がふえると交通事故がふえる", "交通事故を減らすには、図書館を減らせばよい", "相関があるので、必ず一方が他方の原因である"],
      correct: 0,
      why: ["正しい。人口が多い市町村ほど、図書館も事故も多くなりやすい。第3の要因（交絡）を考える。", "相関は因果関係を示さない。", "因果関係がないので、図書館を減らしても事故は減らない。", "相関があっても、因果関係があるとは限らない。"],
    },
    point: "相関があっても因果関係とは限らない。別の要因を疑う",
    steps: [{ title: "相関と因果", body: "2つがともにふえるとき、{{両方に影響する別の要因}}がないかを考えます。", back: [S4] }],
  },
  {
    ...base("hakohige", 3, "思考・判断・表現"),
    prompt: "2つのクラスのテストの点数を箱ひげ図で比べたところ、中央値は同じで、A組の箱（四分位範囲）は B組の箱の2倍の長さだった。正しい読み取りはどれですか。",
    answer: {
      kind: "choice",
      options: ["真ん中の約半分の生徒の点数は、A組のほうが広く散らばっている", "A組は B組より平均点が2倍高い", "A組の人数は B組の2倍である", "A組の最高点は B組の最高点の2倍である"],
      correct: 0,
      why: ["正しい。箱の長さ＝四分位範囲で、真ん中の約半分のデータが入る範囲。", "箱ひげ図の箱の長さから平均点はわからない。", "箱ひげ図から人数はわからない。", "最高点はひげの右はしで、箱の長さとは別。"],
    },
    point: "箱の長さ＝四分位範囲＝真ん中の約半分の散らばり",
    steps: [{ title: "箱が表すもの", body: "箱は第1四分位数から第3四分位数まで。長いほど{{真ん中の約半分のデータが広く散らばっている}}。", back: [S3] }],
  },
];

export const H_INFO_1_DATA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "代表値と散らばり",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "daihyo", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: daihyo },
        { id: "shikui", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: shikui },
        { id: "bunsan", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: bunsan },
      ],
    },
    { title: "データの見方と活用", lead: "次の問いに答えなさい。", style: "data", pick: 3, questions: POOL },
  ],
};
