// 物理「剛体のつり合い」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: 力のモーメント M＝F×(うでの長さ)・30°なら垂直成分 F/2、棒のつり合い m₁x＝m₂(L−x)、
//   一様な棒の支える力 (端のまわりのモーメント)、はしごの摩擦力 (下端のまわりのモーメント) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。答えが小数第3位までで割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-goutai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "力のモーメント：力×うでの長さ");
const S2 = L(2, "斜めの力は「垂直な成分」で考える");
const S3 = L(3, "平行な力の合成と偶力");
const S4 = L(4, "剛体のつり合いの2つの条件");
const S5 = L(5, "重心：重力のモーメントがつり合う点");
const S6 = L(6, "立てかけたはしごがすべり出す条件");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function moment(r: Rng): QuestionBody {
  const F = r.pick([4, 5, 6, 8, 10, 12, 15, 20]);
  const d = r.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.8]);
  const tool = r.pick(["スパナ", "棒", "レンチ", "ハンドル"]);
  if (r.bool()) {
    return {
      prompt: `回転軸から ${f(d)} m はなれた${tool}の点に、${tool}に垂直に ${F} N の力を加えた。回転軸のまわりの力のモーメントの大きさは何 N·m ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(F * d)], unit: "N·m", calc: `${F}*${d}` },
      point: "M＝F×うでの長さ (軸から作用線までの距離)",
      steps: [{ title: "力×うで", body: `力が垂直なので、うでの長さは ${f(d)} m。M＝${F}×${f(d)}＝{{${f(F * d)}}} N·m。`, back: [S1] }],
    };
  }
  return {
    prompt: `回転軸から ${f(d)} m はなれた点に、棒と 30° の角をなす向きに ${F} N の力を加えた。回転軸のまわりの力のモーメントの大きさは何 N·m ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f((F * d) / 2)], unit: "N·m", calc: `${F}*(1/2)*${d}` },
    point: "棒に垂直な成分 F sin30° だけが回す",
    steps: [
      { title: "垂直な成分", body: `棒に垂直な成分は ${F}×sin30°＝{{${f(F / 2)} N}}。棒に平行な成分は回さない。`, back: [S2] },
      { title: "モーメント", body: `M＝${f(F / 2)}×${f(d)}＝{{${f((F * d) / 2)}}} N·m。`, back: [S1], trap: "30° の力をそのまま掛けると2倍の値になる。" },
    ],
  };
}

const MASSES = [
  [1, 2],
  [2, 1],
  [1, 3],
  [3, 1],
  [2, 3],
  [3, 2],
  [1, 4],
  [3, 5],
  [2, 2],
] as const;

function bou(r: Rng): QuestionBody {
  const [m1, m2] = r.pick(MASSES);
  const len = r.pick([1.2, 2.4, 3.6, 4.8]);
  const x = (len * m2) / (m1 + m2);
  return {
    prompt: `長さ ${f(len)} m の軽い棒の左端 A に ${m1} kg、右端 B に ${m2} kg のおもりをつるした。棒を水平につり合わせて1点で支えるには、A から何 m の点を支えればよいですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(x)], unit: "m", calc: `${len}*${m2}/(${m1}+${m2})` },
    point: "支点のまわりで左回り＝右回り",
    steps: [
      { title: "支点のまわりのモーメント", body: `A から x の点を支点にすると、{{${m1}g×x＝${m2}g×(${f(len)}−x)}}。`, back: [S4] },
      { title: "x を求める", body: `${m1 + m2}x＝${f(len * m2)} より x＝{{${f(x)}}} m。重いおもりに近い点になる。`, back: [S5], trap: "軽いほうに近い点にすると、つり合わない。" },
    ],
  };
}

function sasaeru(r: Rng): QuestionBody {
  const len = r.pick([2, 4, 5]);
  const W = r.pick([40, 60, 80, 100, 120]);
  const w = r.pick([20, 40, 60, 100]);
  const a = r.int(1, len - 1);
  const NB = W / 2 + (w * a) / len;
  const NA = W + w - NB;
  const askB = r.bool();
  const ans = askB ? NB : NA;
  return {
    prompt: `重さ ${W} N、長さ ${len} m の一様な棒を、両端 A・B で下から支えて水平にした。A から ${a} m の点に重さ ${w} N の物体をのせたとき、${askB ? "B" : "A"} が棒を支える力の大きさは何 N ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: "N", calc: askB ? `(${W}*${len}/2+${w}*${a})/${len}` : `${W}+${w}-(${W}*${len}/2+${w}*${a})/${len}` },
    point: "未知の力の点のまわりでモーメントを考える",
    steps: [
      { title: "A のまわりのモーメント", body: `棒の重力は中点 (A から ${f(len / 2)} m) にはたらく。{{N_B×${len}＝${W}×${f(len / 2)}＋${w}×${a}}} より N_B＝${f(NB)} N。`, back: [S4, S5] },
      ...(askB ? [] : [{ title: "力のつり合い", body: `N_A＋N_B＝${W}＋${w} より N_A＝{{${f(NA)}}} N。`, back: [S4] }]),
    ],
  };
}

// はしご: 長さ方向の比が 3:4:5 (床の上の水平距離 b、壁の高さ h)
const LADDER = [
  [3, 4, 5],
  [1.8, 2.4, 3],
  [2.4, 3.2, 4],
] as const;

function hashigo(r: Rng): QuestionBody {
  const [b, h, len] = r.pick(LADDER);
  const W = r.pick([100, 120, 200]);
  const P = r.pick([400, 500, 600, 700]);
  const k = r.pick([0.25, 0.5, 0.75]);
  const Fr = ((W / 2 + P * k) * b) / h;
  return {
    prompt: `長さ ${f(len)} m、重さ ${W} N の一様なはしごを、なめらかな鉛直の壁に立てかけた。はしごの下端は壁から ${f(b)} m はなれ、上端は床から ${f(h)} m の高さにある。重さ ${P} N の人が、はしごに沿って下端から ${f(len * k)} m の所まで登って静止した。このとき床がはしごにおよぼす静止摩擦力の大きさは何 N ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(Fr)], unit: "N", calc: `(${W}*${b}/2+${P}*${k}*${b})/${h}` },
    point: "下端のまわりのモーメントで壁の力を出し、摩擦力＝壁の力",
    steps: [
      { title: "力を書き出す", body: "はしごにはたらく力は、重力・人の重さ・床の垂直抗力と摩擦力・壁の垂直抗力 N (水平)。{{水平方向のつり合いから摩擦力＝N}}。", back: [S6] },
      { title: "下端のまわりのモーメント", body: `重心の水平距離は ${f(b / 2)} m、人は ${f(b * k)} m。{{N×${f(h)}＝${W}×${f(b / 2)}＋${P}×${f(b * k)}}}。`, back: [S4] },
      { title: "答え", body: `N＝{{${f(Fr)}}} N なので、摩擦力も ${f(Fr)} N。`, trap: "うでの長さには、はしごに沿った長さではなく水平距離・高さを使う。" },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("ude", 1),
    prompt: "力のモーメントの「うでの長さ」として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["回転軸から力の作用線までの距離", "回転軸から力の作用点までの、棒に沿った長さ", "力の矢印の長さ", "物体の重心から作用点までの距離"],
      correct: 0,
      why: ["正しい。作用線に下ろした垂線の長さ。", "力が棒に垂直なときだけ一致する。斜めの力ではちがう。", "矢印の長さは力の大きさ。", "重心は関係しない。回転軸が基準になる。"],
    },
    point: "うで＝軸から作用線までの距離",
    steps: [{ title: "作用線に垂線", body: "力の作用線を延ばし、軸から{{垂線}}を下ろした長さがうでの長さ。", back: [S1, S2] }],
  },
  {
    ...base("jouken", 1),
    prompt: "剛体が静止し続けるための条件として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["力の合力が 0 で、かつ任意の点のまわりの力のモーメントの和が 0", "力の合力が 0 であればよい", "力のモーメントの和が 0 であればよい", "重心に力がはたらいていればよい"],
      correct: 0,
      why: ["正しい。並進も回転も起こらない。", "偶力がはたらくと、合力 0 でも回り出す。", "合力が残ると、回らなくても動き出す。", "重心以外にはたらく力でも、つり合うことはある。"],
    },
    point: "合力 0 とモーメントの和 0 の2つがいる",
    steps: [{ title: "2つの条件", body: "{{合力＝0}} で動き出さず、{{モーメントの和＝0}} で回り出さない。", back: [S4] }],
  },
  {
    ...base("guuryoku", 2, "思考・判断・表現"),
    prompt: "大きさ F の力2つが、たがいに逆向き・平行で、作用線の間隔 d ではたらいている（偶力）。この偶力について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["合力は 0 で、どの点のまわりでもモーメントは Fd", "合力は 2F で、物体は動き出す", "モーメントは回転軸の位置によって変わる", "合力もモーメントも 0 なので、物体は静止する"],
      correct: 0,
      why: ["正しい。偶力は物体を回すだけで、移動させない。", "逆向きなので合力は打ち消し合う。", "偶力のモーメントは点の選び方によらない。", "モーメントは Fd 残るので回り出す。"],
    },
    point: "偶力：合力 0、モーメント Fd (点によらない)",
    steps: [{ title: "どの点でも同じ", body: "点 O から作用線までを x と x＋d とすると、F(x＋d)−Fx＝{{Fd}}。x が消える。", back: [S3] }],
  },
  {
    ...base("juushin", 2, "思考・判断・表現"),
    prompt: "長さ 1.2 m の軽い棒の両端に、1.0 kg と 2.0 kg の小さなおもりをつけた。この全体の重心はどこにありますか。",
    answer: {
      kind: "choice",
      options: ["2.0 kg のおもりから 0.40 m の点", "1.0 kg のおもりから 0.40 m の点", "棒の中点", "2.0 kg のおもりから 0.80 m の点"],
      correct: 0,
      why: ["正しい。1.0×0.80＝2.0×0.40 でモーメントがつり合う。", "重心は重いほうに近い。", "質量が同じときだけ中点になる。", "これは 1.0 kg のおもりから 0.40 m で、軽いほうに近い。"],
    },
    point: "重心は質量の逆比に内分する点",
    steps: [{ title: "逆比に分ける", body: "距離の比は質量の逆比 {{2:1}}。1.2 m を 2:1 に分け、1.0 kg から 0.80 m、2.0 kg から {{0.40 m}}。", back: [S5] }],
  },
];

export const H_SCI_PHY_GOUTAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 15,
  review: { status: "draft" },
  sections: [
    {
      title: "力のモーメントとつり合いの計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "moment", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: moment },
        { id: "bou", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: bou },
        { id: "sasaeru", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: sasaeru },
        { id: "hashigo", type: "A", difficulty: 3, points: 18, seconds: 180, skill: "思考・判断・表現", generate: hashigo },
      ],
    },
    { title: "つり合いのしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
