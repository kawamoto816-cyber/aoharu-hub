// 化学基礎「原子の構造と周期表」の単元模試 (B: プール8問から4問 ＋ A: 粒子の数・原子量の計算2問)。問題はすべてオリジナル。
// 検算: A の粒子の数は (原子番号, 質量数, 電荷) の表から 中性子＝質量数−原子番号、電子＝原子番号−電荷 で作る。
//   原子量は架空の元素 X の同位体 (相対質量 m と m＋2、存在比 p％) から (m×p＋(m＋2)×(100−p))/100 で作る。
//   どちらも calc を scripts/check-moshi.ts がシード1〜100で計算して照合する。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chemb-genshi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "原子のつくり");
const S2 = L(2, "同位体：中性子の数だけがちがう原子");
const S3 = L(3, "電子殻と電子配置");
const S4 = L(4, "周期表：同じ族は価電子の数が同じ");
const S5 = L(5, "典型元素と遷移元素、金属元素と非金属元素");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });
const f = (x: number) => String(Math.round(x * 1000) / 1000);

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("genshibango", 1),
    prompt: "原子番号が表しているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["原子核の中の陽子の数", "原子核の中の中性子の数", "陽子の数と中性子の数の和", "最外殻電子の数"],
      correct: 0,
      why: ["原子番号＝陽子の数。原子の中では電子の数とも等しい。", "中性子の数は 質量数 − 原子番号 で求める。", "陽子と中性子の数の和は質量数。", "最外殻電子の数は電子配置で決まり、原子番号とは別。"],
    },
    point: "原子番号＝陽子の数",
    steps: [{ title: "用語の確認", body: "陽子の数が{{原子番号}}、陽子の数＋中性子の数が{{質量数}}です。", back: [S1] }],
  },
  {
    ...b("doitai", 1),
    prompt: "原子番号が同じで、質量数がちがう原子どうしを何といいますか。",
    answer: { kind: "term", accept: ["同位体", "アイソトープ"], near: [{ text: "同素体", why: "同素体は同じ元素からなる性質のちがう「単体」どうし。原子どうしは同位体です。" }] },
    point: "中性子の数だけがちがう原子＝同位体",
    steps: [{ title: "何がちがうか", body: "陽子の数（原子番号）は同じで、{{中性子の数}}だけがちがう原子どうしが{{同位体}}です。", back: [S2] }],
  },
  {
    ...b("zoku", 1),
    prompt: "周期表の縦の列を何といいますか。漢字1字で答えなさい。",
    answer: { kind: "term", accept: ["族"], near: [{ text: "周期", why: "周期は横の行。縦の列は族です。" }] },
    point: "縦の列＝族、横の行＝周期",
    steps: [{ title: "縦と横", body: "縦の列が{{族}}（1〜18族）、横の行が{{周期}}（第1〜第7周期）です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...b("mkaku", 2),
    prompt: "M殻に入ることのできる電子の最大数は何個ですか。",
    answer: {
      kind: "choice",
      options: ["18個", "8個", "2個", "32個"],
      correct: 0,
      why: ["内側から3番目の殻なので 2×3²＝18 個。", "8個は L殻の最大数。Ca までは M殻に8個入ると N殻に入りはじめるが、定員は18個。", "2個は K殻の最大数。", "32個は N殻（2×4²）の最大数。"],
    },
    point: "n 番目の殻の定員は 2n² 個",
    steps: [{ title: "2n² に当てはめる", body: "K殻 n＝1、L殻 n＝2、M殻 n＝3。M殻は 2×3²＝{{18個}}です。", back: [S3] }],
  },
  {
    ...b("kiggas", 2),
    prompt: "アルゴン Ar（K2 L8 M8）の価電子の数として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["0個", "8個", "2個", "18個"],
      correct: 0,
      why: ["貴ガスは安定な電子配置で、結合や反応にほとんどかかわらないので価電子の数を0とする。", "最外殻電子は8個だが、価電子は0とする。", "2個は K殻の電子の数。", "18個はアルゴンの電子の総数。"],
    },
    point: "貴ガスの価電子の数は0",
    steps: [{ title: "最外殻電子と価電子", body: "Ar の最外殻電子は8個ですが、貴ガスは安定なので{{価電子は0個}}とします。", back: [S3] }],
  },
  {
    ...b("seni", 2),
    prompt: "次のうち、遷移元素はどれですか。",
    answer: {
      kind: "choice",
      options: ["鉄 Fe", "ナトリウム Na", "アルミニウム Al", "塩素 Cl"],
      correct: 0,
      why: ["Fe は8族で、3〜11族の遷移元素。", "Na は1族の典型元素。", "Al は13族の典型元素。", "Cl は17族の典型元素。"],
    },
    point: "3〜11族が遷移元素",
    steps: [{ title: "族で見分ける", body: "1・2族と13〜18族が{{典型元素}}、3〜11族が{{遷移元素}}です。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...b("doitai-seishitsu", 3, "思考・判断・表現"),
    prompt: "³⁵Cl と ³⁷Cl の化学的な性質がほとんど同じである理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["陽子の数と電子配置が同じで、ちがうのは中性子の数だけだから", "質量数が同じだから", "中性子の数が同じだから", "どちらも電子をもたないから"],
      correct: 0,
      why: [
        "化学的な性質は電子（特に価電子）で決まる。同位体は電子配置が同じ。",
        "質量数は 35 と 37 でちがう。",
        "中性子の数は 18 と 20 でちがう。",
        "原子は電子をもつ。陽子と同じ数の電子がある。",
      ],
    },
    point: "化学的な性質は電子配置で決まる",
    steps: [{ title: "同位体で同じもの・ちがうもの", body: "同位体は陽子の数も{{電子配置}}も同じで、ちがうのは{{中性子の数（質量）}}だけです。", back: [S2] }],
  },
  {
    ...b("hydrogen", 3, "思考・判断・表現"),
    prompt: "周期表と元素の性質について、正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["水素は1族だが、非金属元素である", "1族の元素はすべて金属元素である", "周期表の右上ほど金属元素の性質が強い", "同じ周期の元素は価電子の数が同じである"],
      correct: 0,
      why: [
        "水素は1族に置かれるが、非金属元素。",
        "1族の水素は非金属元素なので「すべて」は誤り。",
        "右上（貴ガスを除く）ほど非金属元素の性質が強い。金属元素は左下。",
        "価電子の数が同じなのは同じ族の元素。周期は横の行。",
      ],
    },
    point: "水素は1族の非金属元素",
    steps: [{ title: "例外を押さえる", body: "金属元素は周期表の{{左下}}に多いですが、1族の{{水素は非金属元素}}です。", back: [S5, S4] }],
  },
];

/** [元素記号, 名前, 原子番号, 質量数] */
const NUC: [string, string, number, number][] = [
  ["C", "炭素", 6, 12],
  ["C", "炭素", 6, 13],
  ["N", "窒素", 7, 15],
  ["O", "酸素", 8, 16],
  ["O", "酸素", 8, 18],
  ["Na", "ナトリウム", 11, 23],
  ["Mg", "マグネシウム", 12, 24],
  ["Mg", "マグネシウム", 12, 26],
  ["Al", "アルミニウム", 13, 27],
  ["Cl", "塩素", 17, 35],
  ["Cl", "塩素", 17, 37],
  ["K", "カリウム", 19, 39],
  ["Ca", "カルシウム", 20, 40],
  ["Fe", "鉄", 26, 56],
];
/** 単原子イオンの電荷 (Fe はふくめない) */
const CHARGE: Record<string, number> = { O: -2, Na: 1, Mg: 2, Al: 3, Cl: -1, K: 1, Ca: 2 };
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sup = (n: number) => String(n).split("").map((c) => SUP[c]).join("");
const ionSign = (q: number) => (q === 0 ? "" : `${Math.abs(q) === 1 ? "" : sup(Math.abs(q))}${q > 0 ? "⁺" : "⁻"}`);

function ryushi(r: Rng): QuestionBody {
  const [sym, name, Z, A] = r.pick(NUC);
  const q = CHARGE[sym] !== undefined && r.bool() ? CHARGE[sym] : 0;
  const ask = r.pick(["中性子", "電子"] as const);
  const label = `${sup(A)}${sym}${ionSign(q)}`;
  const what = q === 0 ? `${name}原子 ${label}` : `イオン ${label}`;
  const ans = ask === "中性子" ? A - Z : Z - q;
  return {
    prompt: `${what}（${name}の原子番号は ${Z}）1個にふくまれる${ask}の数は何個ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc: ask === "中性子" ? `${A}-${Z}` : `${Z}-(${q})` },
    point: ask === "中性子" ? "中性子＝質量数−原子番号" : "電子＝陽子の数−イオンの電荷",
    steps:
      ask === "中性子"
        ? [
            { title: "記号を読む", body: `左上の ${A} が{{質量数}}（陽子＋中性子）、原子番号 ${Z} が陽子の数。`, back: [S1] },
            { title: "引き算", body: `中性子の数＝${A} − ${Z}＝{{${ans}個}}。${q === 0 ? "" : "イオンになっても中性子の数は変わりません。"}`, trap: "質量数から電子の数を引かない。質量数は陽子と中性子の和。" },
          ]
        : [
            { title: "陽子の数", body: `原子番号 ${Z} なので陽子は ${Z} 個。原子なら電子も ${Z} 個です。`, back: [S1] },
            {
              title: "電荷の分を調整",
              body: q === 0 ? `原子は電気的に中性なので、電子は{{${ans}個}}。` : q > 0 ? `${label} は電子を ${q} 個失った陽イオン。${Z} − ${q}＝{{${ans}個}}。` : `${label} は電子を ${-q} 個受け取った陰イオン。${Z} ＋ ${-q}＝{{${ans}個}}。`,
              trap: "陽イオンは電子が減り、陰イオンは電子が増える。向きを逆にしない。",
            },
          ],
  };
}

function genshiryo(r: Rng): QuestionBody {
  const m = r.int(10, 80);
  const p = r.pick([10, 20, 25, 40, 60, 75, 80, 90]);
  const ans = f((m * p + (m + 2) * (100 - p)) / 100);
  return {
    prompt: `ある元素 X には、相対質量 ${m} の同位体が ${p}％、相対質量 ${m + 2} の同位体が ${100 - p}％ ふくまれています（ほかの同位体はないものとします）。X の原子量を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: `(${m}*${p}+${m + 2}*${100 - p})/100` },
    point: "原子量＝相対質量を存在比でならした平均",
    steps: [
      { title: "存在比をかけて足す", body: `${m}×${p}/100 ＋ ${m + 2}×${100 - p}/100 ＝ {{${ans}}}。`, back: [S2] },
      { title: "見当で確かめる", body: `${p > 50 ? `${m} の同位体が多いので、${m} に近い値` : `${m + 2} の同位体が多いので、${m + 2} に近い値`}になります。`, trap: `${m} と ${m + 2} の単純な平均 ${m + 1} にしない。存在比で重みをつける。` },
    ],
  };
}

export const H_SCI_CHEMB_GENSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学基礎",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "原子の構造と周期表", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    {
      title: "粒子の数と原子量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "ryushi", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: ryushi },
        { id: "genshiryo", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: genshiryo },
      ],
    },
  ],
};
