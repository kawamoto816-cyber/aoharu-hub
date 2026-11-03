// 化学「非金属元素」の単元模試 (B: プール9問から4問 ＋ A: 工業的製法・気体の発生の量の計算2問)。問題はすべてオリジナル。
// 検算 (A): 原料の物質量をきれいな値にしてから質量・体積を作り、calc (問題の数から答えを出す式) を scripts/check-moshi.ts が
//   シード1〜100で照合する。反応式はレクチャーと同じ: オストワルト法のまとめ NH₃＋2O₂ → HNO₃＋H₂O (NH₃ 1 mol → HNO₃ 1 mol)、
//   接触法 S → SO₂ → SO₃ → H₂SO₄ (S 1 mol → H₂SO₄ 1 mol)、MnO₂＋4HCl → MnCl₂＋Cl₂＋2H₂O。
//   式量 NH₃ 17、HNO₃ 63、S 32、H₂SO₄ 98、MnO₂ 87、標準状態の気体 22.4 L/mol。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-hikinzoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ハロゲン：原子番号が小さいほど酸化力が強い");
const S2 = L(2, "気体の集め方は「水への溶けやすさ」と「重さ」で決まる");
const S3 = L(3, "硫黄：接触法で硫酸をつくる");
const S4 = L(4, "窒素：オストワルト法で硝酸をつくる");
const S5 = L(5, "炭素とケイ素");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function ostwald(r: Rng): QuestionBody {
  const byV = r.bool();
  const n = r.pick([0.25, 0.5, 1.0, 1.5, 2.0, 2.5, 4.0, 5.0]);
  const given = byV ? `標準状態で ${f(n * 22.4)} L のアンモニア` : `アンモニア ${f(n * 17)} g`;
  const w = f(n * 63);
  return {
    prompt: `オストワルト法で、${given}をすべて硝酸にしました。得られる硝酸 HNO₃ は何 g ですか。${byV ? "標準状態の気体のモル体積は 22.4 L/mol、" : "NH₃＝17、"}HNO₃＝63 とします。`,
    answer: { kind: "num", answerKind: "num", answer: [w], unit: "g", calc: byV ? `${f(n * 22.4)}/22.4*63` : `${f(n * 17)}/17*63` },
    point: "まとめた式で NH₃ 1 mol → HNO₃ 1 mol",
    steps: [
      { title: "NH₃ の物質量", body: byV ? `${f(n * 22.4)}÷22.4＝{{${f(n)} mol}}。` : `${f(n * 17)}÷17＝{{${f(n)} mol}}。` },
      { title: "まとめた式で比べる", body: `{{NH₃＋2O₂ → HNO₃＋H₂O}} より HNO₃ も ${f(n)} mol。×63 で {{${w} g}}。`, trap: "①の式 4NH₃ → 4NO だけで考えて、③の 3NO₂ → 2HNO₃ の比をかけない。NO は回収して使うので全体では 1：1。", back: [S4] },
    ],
  };
}

function seizo(r: Rng): QuestionBody {
  const kind = r.pick(["sesshoku", "cl2"] as const);
  const n = r.pick([0.1, 0.2, 0.25, 0.5, 1.0, 1.5, 2.0]);
  if (kind === "sesshoku") {
    const s = f(n * 32);
    const w = f(n * 98);
    return {
      prompt: `接触法で、硫黄 ${s} g をすべて硫酸 H₂SO₄ にしました。得られる H₂SO₄ は何 g ですか。S＝32、H₂SO₄＝98 とします。`,
      answer: { kind: "num", answerKind: "num", answer: [w], unit: "g", calc: `${s}/32*98` },
      point: "S 原子1個が H₂SO₄ 1個になる（S：H₂SO₄＝1：1）",
      steps: [
        { title: "流れを追う", body: "S＋O₂ → SO₂、2SO₂＋O₂ → 2SO₃（V₂O₅ 触媒）、SO₃＋H₂O → H₂SO₄。S 原子1個が {{H₂SO₄ 1個}}になる。", back: [S3] },
        { title: "計算", body: `${s}÷32＝${f(n)} mol。×98 で {{${w} g}}。`, trap: "2SO₂＋O₂ → 2SO₃ の係数2につられて半分にしない。S の原子の数で追う。" },
      ],
    };
  }
  const m = f(n * 87);
  const V = f(n * 22.4);
  return {
    prompt: `酸化マンガン(IV) MnO₂ ${m} g に濃塩酸を十分に加えて加熱しました。発生する塩素は、標準状態で何 L ですか。MnO₂＝87、気体のモル体積は 22.4 L/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [V], unit: "L", calc: `${m}/87*22.4` },
    point: "MnO₂ 1 mol から Cl₂ 1 mol が発生",
    steps: [
      { title: "反応式", body: "{{MnO₂＋4HCl → MnCl₂＋Cl₂＋2H₂O}}（加熱）。MnO₂ 1 mol から Cl₂ 1 mol。", back: [S1] },
      { title: "計算", body: `${m}÷87＝${f(n)} mol。×22.4 で {{${V} L}}。`, trap: "HCl の係数4と比べない。聞かれているのは MnO₂ と Cl₂ の比。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("nh3-hoshu", 1),
    prompt: "アンモニアを集める方法として最も適したものはどれですか。",
    answer: {
      kind: "choice",
      options: ["上方置換", "下方置換", "水上置換"],
      correct: 0,
      why: ["水によく溶け、分子量17で空気（約29）より軽いので上方置換。", "下方置換は、水に溶けて空気より重い気体（Cl₂・HCl など）。", "アンモニアは水にけた外れによく溶けるので、水上置換は使えない。"],
    },
    point: "水に溶けて空気より軽い → 上方置換",
    steps: [{ title: "溶けやすさと重さ", body: "NH₃ は{{水によく溶け}}、分子量17で{{空気より軽い}}ので上方置換で集めます。", back: [S2] }],
  },
  {
    ...b("sankaryoku", 1),
    prompt: "ハロゲンの単体のうち、酸化力がいちばん強いものはどれですか。",
    answer: {
      kind: "choice",
      options: ["フッ素 F₂", "塩素 Cl₂", "臭素 Br₂", "ヨウ素 I₂"],
      correct: 0,
      why: ["原子が小さいほど電子を引きつけやすく、酸化力は F₂ ＞ Cl₂ ＞ Br₂ ＞ I₂。", "Cl₂ は F₂ より弱い。", "Br₂ は Cl₂ より弱い。", "I₂ がいちばん弱い。"],
    },
    point: "酸化力 F₂ ＞ Cl₂ ＞ Br₂ ＞ I₂",
    steps: [{ title: "原子番号が小さいほど強い", body: "酸化力は {{F₂ ＞ Cl₂ ＞ Br₂ ＞ I₂}} の順です。", back: [S1] }],
  },
  {
    ...b("usumekata", 1),
    prompt: "濃硫酸をうすめるときの正しい操作はどれですか。",
    answer: {
      kind: "choice",
      options: ["かき混ぜながら、水に濃硫酸を少しずつ加える", "濃硫酸に水を一度に注ぐ", "濃硫酸に水を少しずつ注ぐ", "濃硫酸を加熱してから水を加える"],
      correct: 0,
      why: ["溶けるときの発熱を水全体に分散させるため、水に濃硫酸を少しずつ加える。", "激しく発熱して水が沸騰し、飛び散る。", "少しずつでも、濃硫酸に水を入れると飛び散る危険がある。", "加熱するとさらに危険。"],
    },
    point: "水に濃硫酸を少しずつ（逆にしない）",
    steps: [{ title: "安全な順", body: "{{水に濃硫酸を少しずつ}}加えます。逆にすると発熱で水が沸騰して飛び散ります。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...b("kbr-cl2", 2, "思考・判断・表現"),
    prompt: "臭化カリウム水溶液に塩素を通じると、液が褐色になりました。このとき生じた単体はどれですか。",
    answer: {
      kind: "choice",
      options: ["臭素 Br₂", "塩素 Cl₂ のまま", "ヨウ素 I₂", "カリウム K"],
      correct: 0,
      why: ["酸化力が Cl₂ ＞ Br₂ なので、Cl₂ が Br⁻ から電子をうばい Br₂ が遊離する（2KBr＋Cl₂ → 2KCl＋Br₂）。", "Cl₂ は Cl⁻ に変わる。", "ヨウ素はふくまれていない。", "K⁺ は変化しない。"],
    },
    point: "酸化力の強い単体が、弱いハロゲンを追い出す",
    steps: [{ title: "酸化力をくらべる", body: "{{Cl₂ ＞ Br₂}} なので、2KBr＋Cl₂ → 2KCl＋{{Br₂}}。", back: [S1] }],
  },
  {
    ...b("cl2-hoshu", 2, "思考・判断・表現"),
    prompt: "塩素を下方置換で集める理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["水に溶け、分子量71で空気より重いから", "水に溶けにくく、空気より軽いから", "水に溶けにくく、空気より重いから", "水によく溶け、空気より軽いから"],
      correct: 0,
      why: ["水にある程度溶けるので水上置換は向かず、空気（約29）より重いので下方置換。", "Cl₂ は空気より重い。", "水に溶けにくければ水上置換を使う。", "空気より軽いなら上方置換。"],
    },
    point: "水に溶けて空気より重い → 下方置換",
    steps: [{ title: "分子量を比べる", body: "Cl₂ は{{分子量71で空気（約29）より重く}}、水にも溶けるので下方置換です。", back: [S2] }],
  },
  {
    ...b("kansozai", 2, "思考・判断・表現"),
    prompt: "アンモニアを乾燥させるのに使える乾燥剤はどれですか。",
    answer: {
      kind: "choice",
      options: ["ソーダ石灰", "濃硫酸", "十酸化四リン", "塩化カルシウム"],
      correct: 0,
      why: ["ソーダ石灰（CaO と NaOH）は塩基性で、塩基性のアンモニアと反応しない。", "濃硫酸は酸性の乾燥剤で、アンモニアと反応してしまう。", "十酸化四リンは酸性の乾燥剤で使えない。", "塩化カルシウムは中性だが、アンモニアと結びついてしまう。"],
    },
    point: "塩基性の NH₃ には塩基性のソーダ石灰",
    steps: [{ title: "反応しない組み合わせ", body: "気体と乾燥剤が反応しないことが大事。NH₃ には{{ソーダ石灰}}を使います。CaCl₂ も NH₃ と結びつくので不可です。", back: [S2] }],
  },
  // ---- 発展 ----
  {
    ...b("hf", 3, "思考・判断・表現"),
    prompt: "フッ化水素酸について正しく述べたものはどれですか。",
    answer: {
      kind: "choice",
      options: ["弱酸だが、ガラスの主成分 SiO₂ を溶かすのでポリエチレンの容器に保存する", "塩酸と同じく強酸で、ガラスびんに保存する", "強酸で、SiO₂ とは反応しない", "弱酸で、ガラスびんに保存する"],
      correct: 0,
      why: ["H−F の結合が強く水素結合もあるので電離しにくい弱酸。SiO₂＋6HF → H₂SiF₆＋2H₂O でガラスを溶かす。", "HF は弱酸。ガラスびんは溶かされる。", "HF は弱酸で、SiO₂ を溶かす。", "ガラスを溶かすので、ガラスびんには保存できない。"],
    },
    point: "HF は弱酸。ガラス（SiO₂）を溶かす",
    steps: [{ title: "HF の性質", body: "HF は{{電離しにくい弱酸}}ですが、{{SiO₂ を溶かす}}ので、ポリエチレンの容器に保存します。", back: [S1, S5] }],
  },
  {
    ...b("no-no2", 3, "思考・判断・表現"),
    prompt: "銅に希硝酸を加えると一酸化窒素 NO が、濃硝酸を加えると二酸化窒素 NO₂ が発生します。2つの気体の集め方の組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["NO は水上置換、NO₂ は下方置換", "NO は下方置換、NO₂ は水上置換", "どちらも水上置換", "どちらも下方置換"],
      correct: 0,
      why: ["NO は水に溶けにくいので水上置換。NO₂ は水に溶けて硝酸になり、空気より重いので下方置換。", "逆。NO₂ は水に溶けるので水上置換は使えない。", "NO₂ は水に溶けて硝酸になる。", "NO は空気にふれるとすぐ NO₂ になり、水に溶けにくいので水上置換で集める。"],
    },
    point: "NO は水に溶けにくい、NO₂ は水に溶ける",
    steps: [{ title: "溶けやすさで分ける", body: "{{NO は水上置換}}、水に溶けて空気より重い{{NO₂ は下方置換}}です。", back: [S2, S4] }],
  },
  {
    ...b("sio2", 3, "思考・判断・表現"),
    prompt: "同じ14族の酸化物なのに、CO₂ は常温で気体、SiO₂ は融点が非常に高い固体です。その理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["SiO₂ は Si と O がどこまでもつながった共有結合の結晶で、分子という区切りがないから", "SiO₂ はイオン結晶だから", "SiO₂ は分子量が大きい分子で、分子間力が強いから", "SiO₂ は金属結晶だから"],
      correct: 0,
      why: ["SiO₂ は立体の網目が続く共有結合の結晶。CO₂ は小さな分子なので気体。", "Si と O は共有結合で結びついている。", "SiO₂ には分子という区切りがない。", "Si も O も非金属元素で、金属結晶ではない。"],
    },
    point: "SiO₂ は共有結合の結晶、CO₂ は小さな分子",
    steps: [{ title: "つながり方のちがい", body: "SiO₂ は{{共有結合の結晶}}で、融点が非常に高く、かたく、水にも多くの酸にも溶けにくい。", back: [S5] }],
  },
];

export const H_SCI_CHEM_HIKINZOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "非金属元素の性質と気体",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 4,
      questions: POOL,
    },
    {
      title: "製法と量の関係",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "ostwald", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: ostwald },
        { id: "seizo", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: seizo },
      ],
    },
  ],
};
