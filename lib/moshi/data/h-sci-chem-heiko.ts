// 化学「化学平衡」の単元模試 (A: 平衡定数の計算3問 ＋ B: プール8問から3問)。問題はすべてオリジナル。
// 検算: 平衡定数 K は濃度から作り、平衡時の量の問題は K を平方数 (4・36・64・324) にして x がきれいな値になるようにする。
//   calc (問題の数から答えを出す式) を scripts/check-moshi.ts がシード1〜100で照合する。
//   B の事実 (ルシャトリエの原理・触媒・ハーバー・ボッシュ法の条件) はレクチャーの記述だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-heiko";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "可逆反応と平衡状態");
const S2 = L(2, "平衡定数：つり合いの位置を1つの数で表す");
const S3 = L(3, "平衡時の量は「反応した量 x」で表す");
const S4 = L(4, "ルシャトリエの原理：変化をやわらげる向きへ動く");
const S5 = L(5, "アンモニアの工業的製法");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const clean = (x: number, d = 3) => Math.abs(x * 10 ** d - Math.round(x * 10 ** d)) < 1e-6;

function teisu(r: Rng): QuestionBody {
  const combos: [number, number][] = [];
  for (const no2 of [0.02, 0.03, 0.04, 0.05, 0.06, 0.1, 0.12, 0.2]) for (const n2o4 of [0.01, 0.02, 0.04, 0.05, 0.08, 0.1])
    if (clean((no2 * no2) / n2o4, 3)) combos.push([no2, n2o4]);
  const [a, c] = r.pick(combos);
  const K = f((a * a) / c);
  return {
    prompt: `ある温度で、N₂O₄ ⇄ 2NO₂ が平衡に達しています。このときの濃度は [N₂O₄]＝${f(c)} mol/L、[NO₂]＝${f(a)} mol/L でした。この温度での平衡定数 K は何 mol/L ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [K], unit: "mol/L", calc: `${a}^2/${c}` },
    point: "K＝[生成物]^係数 ÷ [反応物]^係数",
    steps: [
      { title: "式を書く", body: "係数が指数になるので {{K＝[NO₂]²/[N₂O₄]}}。", trap: "係数2を「2倍」にしない。2乗にする。", back: [S2] },
      { title: "代入", body: `${f(a)}²÷${f(c)}＝{{${K} mol/L}}。` },
    ],
  };
}

function gyaku(r: Rng): QuestionBody {
  const K = r.pick([4, 9, 16, 25, 36, 49, 64, 81, 100]);
  const kind = r.pick(["rev", "half"] as const);
  const s = Math.round(Math.sqrt(K));
  const prompt = kind === "rev"
    ? `ある温度で、H₂＋I₂ ⇄ 2HI の平衡定数は ${K} です。同じ温度で、2HI ⇄ H₂＋I₂ の平衡定数はいくつですか。分数で答えなさい。`
    : `ある温度で、H₂＋I₂ ⇄ 2HI の平衡定数は ${K} です。同じ温度で、1/2H₂＋1/2I₂ ⇄ HI の平衡定数はいくつですか。`;
  return {
    prompt,
    answer: kind === "rev"
      ? { kind: "num", answerKind: "num", answer: [`1/${K}`], calc: `1/${K}` }
      : { kind: "num", answerKind: "num", answer: [String(s)], equations: [`x^2=${K}`] },
    point: kind === "rev" ? "逆向きの反応の K は逆数" : "係数を 1/2 にすると K は √（1/2乗）",
    steps: kind === "rev"
      ? [
          { title: "式を比べる", body: "2HI ⇄ H₂＋I₂ の K′＝[H₂][I₂]/[HI]²。もとの K＝[HI]²/([H₂][I₂]) の{{分子と分母が入れかわる}}。", back: [S2] },
          { title: "逆数", body: `K′＝1/K＝{{1/${K}}}。`, trap: "−K のように符号を変えるのではない。逆数になる。" },
        ]
      : [
          { title: "式を比べる", body: "K′＝[HI]/([H₂]^1/2[I₂]^1/2)。2乗すると、もとの K＝[HI]²/([H₂][I₂]) になる。", back: [S2] },
          { title: "平方根", body: `K′²＝${K} より K′＝{{${s}}}。`, trap: "係数を半分にしても、K を半分にするのではない。指数が半分になる。" },
        ],
  };
}

function heikoryo(r: Rng): QuestionBody {
  const [K, s] = r.pick([[4, 2], [36, 6], [64, 8], [324, 18]] as [number, number][]);
  const a = r.pick([0.5, 1.0, 1.5, 2.0, 2.5, 3.0]);
  const V = r.pick([1.0, 2.0, 5.0, 10]);
  const x = (a * s) / (2 + s);
  const hi = f(2 * x);
  return {
    prompt: `容積 ${f(V)} L の容器に H₂ ${f(a)} mol と I₂ ${f(a)} mol を入れ、一定温度に保つと H₂＋I₂ ⇄ 2HI が平衡に達しました。この温度での平衡定数を ${K} とすると、生じた HI は何 mol ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [hi], unit: "mol", calc: `2*${a}*${s}/(2+${s})` },
    point: "反応した量を x とおき、表をつくって K の式へ",
    steps: [
      { title: "量の表", body: `H₂ を x mol 反応したとすると、平衡時は H₂・I₂ が {{${f(a)}−x}}、HI が {{2x}} mol。`, back: [S3] },
      { title: "K の式", body: `体積は約分されて消えるので (2x)²/(${f(a)}−x)²＝${K}。両辺の平方根をとって 2x/(${f(a)}−x)＝${s}。`, trap: "体積で割った濃度でも、分子・分母で V² が約分されて同じ式になる。", back: [S2, S3] },
      { title: "x を求める", body: `${s + 2}x＝${f(a * s)} より x＝${f(x)}。HI は 2x＝{{${hi} mol}}。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("heiko-jotai", 1),
    prompt: "化学平衡（平衡状態）について正しく述べたものはどれですか。",
    answer: {
      kind: "choice",
      options: ["正反応と逆反応の速さが等しく、見かけ上変化が止まっている", "反応がすべて止まっている", "反応物と生成物の濃度が等しくなっている", "正反応だけが進み続けている"],
      correct: 0,
      why: ["正反応と逆反応が同じ速さで進み続けているので、見かけ上変化しない。", "反応は止まっていない。ふえる量と減る量が同じだけ。", "等しいのは速さで、濃度ではない。", "逆反応も同じ速さで進んでいる。"],
    },
    point: "平衡＝正反応と逆反応の速さが等しい",
    steps: [{ title: "止まって見えるだけ", body: "平衡状態では、{{正反応と逆反応の速さが等しく}}、反応は止まっていません。", back: [S1] }],
  },
  {
    ...b("k-ondo", 1),
    prompt: "平衡定数 K の値を変えることができる条件はどれですか。",
    answer: {
      kind: "choice",
      options: ["温度", "圧力", "反応物の濃度", "触媒"],
      correct: 0,
      why: ["K の値は温度だけで変わる。", "加圧で平衡が移動しても、K の値は同じ。", "濃度を変えても、移動したあとの濃度で計算した K は同じ。", "触媒は平衡そのものを変えない。"],
    },
    point: "K を変えるのは温度だけ",
    steps: [{ title: "K の性質", body: "平衡定数は{{温度だけで変わり}}、濃度や圧力を変えても変わりません。", back: [S2] }],
  },
  {
    ...b("shokubai", 1),
    prompt: "平衡に達する前の反応に触媒を加えました。正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["平衡は移動しないが、平衡に達するまでの時間が短くなる", "平衡が右へ移動する", "平衡が左へ移動する", "平衡定数が大きくなる"],
      correct: 0,
      why: ["触媒は正反応と逆反応を同じように速めるので、平衡の位置は変わらず、早く平衡に達する。", "触媒では平衡は移動しない。", "触媒では平衡は移動しない。", "K を変えるのは温度だけ。"],
    },
    point: "触媒は平衡を移動させない。早く平衡に達するだけ",
    steps: [{ title: "触媒", body: "触媒は{{正反応も逆反応も同じように速め}}、平衡は移動しません。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...b("kaatsu", 2, "思考・判断・表現"),
    prompt: "N₂＋3H₂ ⇄ 2NH₃ が平衡にあります。温度を一定にして全体を圧縮し、圧力を上げると、平衡はどちらへ移動しますか。",
    answer: {
      kind: "choice",
      options: ["右（NH₃ がふえる向き）", "左（N₂ と H₂ がふえる向き）", "移動しない", "はじめ右、やがて左へもどる"],
      correct: 0,
      why: ["加圧すると、気体分子の数が減る向き（4分子 → 2分子の右）へ移動する。", "左向きは分子の数がふえる向き。加圧の変化をやわらげない。", "両辺で気体分子の数がちがうので移動する。", "移動した先で新しい平衡になり、もどらない。"],
    },
    point: "加圧 → 気体分子の数が減る向きへ",
    steps: [{ title: "分子の数を数える", body: "左辺 1＋3＝4、右辺 2。加圧すると{{気体分子の数が減る右}}へ移動します。", back: [S4] }],
  },
  {
    ...b("n2o4-ondo", 2, "思考・判断・表現"),
    prompt: "N₂O₄（無色）⇄ 2NO₂（赤褐色）の正反応は吸熱反応です。平衡にある気体を冷やすと、色はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["赤褐色がうすくなる", "赤褐色が濃くなる", "変わらない", "無色から黄色になる"],
      correct: 0,
      why: ["冷やすと発熱反応の向き（左）へ移動し、NO₂ が減って色がうすくなる。", "濃くなるのは温めて吸熱の向き（右）へ移動したとき。", "温度を変えると平衡は移動する。", "NO₂ は赤褐色、N₂O₄ は無色。黄色にはならない。"],
    },
    point: "冷やす → 発熱の向きへ移動",
    steps: [{ title: "温度の変化をやわらげる", body: "冷やすと{{発熱反応の向き}}（ここでは左）へ移動し、NO₂ が減ります。", back: [S4] }],
  },
  {
    ...b("kuwaeru", 2, "思考・判断・表現"),
    prompt: "H₂＋I₂ ⇄ 2HI が平衡にある容器に、温度と体積を一定にして H₂ を加えました。平衡はどちらへ移動しますか。",
    answer: {
      kind: "choice",
      options: ["右（H₂ が減る向き）", "左（H₂ がふえる向き）", "移動しない", "H₂ を加えても平衡定数が変わるだけ"],
      correct: 0,
      why: ["加えた H₂ を減らす向き、つまり HI ができる右へ移動する。", "左へ動くと H₂ がさらにふえ、変化をやわらげない。", "物質を加えると、それを減らす向きに移動する。", "温度が一定なので K は変わらない。"],
    },
    point: "加えた物質を減らす向きへ移動",
    steps: [{ title: "ルシャトリエの原理", body: "加えた H₂ を{{減らす向き（右）}}へ移動します。K は変わりません。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...b("haber", 3, "思考・判断・表現"),
    prompt: "アンモニアの工業的製法（ハーバー・ボッシュ法）で、平衡だけを考えれば低温のほうが NH₃ は多くなるのに、400〜500℃ くらいで反応させる理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["低温では反応が遅すぎて、平衡に達するまでに時間がかかるから", "高温のほうが平衡が右へ移動するから", "高温にすると平衡定数が大きくなるから", "高温にすると触媒が不要になるから"],
      correct: 0,
      why: ["発熱反応なので低温ほど NH₃ は多いが、反応が遅すぎる。触媒を使い、高圧・400〜500℃で反応させる。", "発熱反応なので、高温では平衡は左へ移動する。", "発熱反応では、高温ほど K は小さくなる向き（左へ移動する向き）。", "四酸化三鉄を主成分とする触媒を使っている。"],
    },
    point: "平衡の有利さと、反応の速さの両方を考える",
    steps: [{ title: "速さとのかね合い", body: "低温では{{反応が遅すぎる}}ので、触媒を使い、高圧のもとで 400〜500℃ で反応させます。", back: [S5] }],
  },
  {
    ...b("hi-kaatsu", 3, "思考・判断・表現"),
    prompt: "H₂(気)＋I₂(気) ⇄ 2HI(気) が平衡にあります。温度一定で全体を圧縮すると、平衡はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["移動しない", "右へ移動する", "左へ移動する", "平衡定数が大きくなる"],
      correct: 0,
      why: ["左辺も右辺も気体分子は2つで、数が変わらないので圧力を変えても移動しない。", "右へ動いても気体分子の数は減らない。", "左へ動いても気体分子の数は減らない。", "K を変えるのは温度だけ。"],
    },
    point: "両辺の気体分子の数が同じなら、圧力で移動しない",
    steps: [{ title: "分子の数", body: "左辺 1＋1＝2、右辺 2 で{{等しい}}ので、圧力を変えても平衡は移動しません。", back: [S4] }],
  },
];

export const H_SCI_CHEM_HEIKO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "draft" },
  sections: [
    {
      title: "平衡定数の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "teisu", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: teisu },
        { id: "gyaku", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "思考・判断・表現", generate: gyaku },
        { id: "heikoryo", type: "A", difficulty: 3, points: 18, seconds: 180, skill: "思考・判断・表現", generate: heikoryo },
      ],
    },
    {
      title: "平衡の移動",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 3,
      questions: POOL,
    },
  ],
};
