// 物理基礎「力と運動の法則」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: ma＝F、最大摩擦力 F₀＝μmg、エレベーター内の垂直抗力 N＝m(g±a) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で calc と答えを照合する。g＝9.8 m/s²。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phyb-hosoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "力は「重力」と「ふれているもの」から見つける");
const S2 = L(2, "運動の3法則");
const S3 = L(3, "運動方程式の立て方");
const S4 = L(4, "摩擦力：動くまでは引く力と同じ、最大は μN");
const S5 = L(5, "エレベーターの中の体重計");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function undohoteishiki(r: Rng): QuestionBody {
  const m = r.pick([0.5, 1, 2, 2.5, 4, 5]);
  const a = r.pick([0.5, 1, 1.5, 2, 3, 4]);
  const F = m * a;
  if (r.bool()) {
    return {
      prompt: `なめらかな水平面上で、質量 ${f(m)} kg の物体に水平に ${f(F)} N の力を加え続けた。物体の加速度の大きさは何 m/s² ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(a)], unit: "m/s²", calc: `${f(F)}/${m}` },
      point: "ma＝F より a＝F/m",
      steps: [{ title: "運動方程式", body: `${f(m)}×a＝${f(F)} より、a＝${f(F)}÷${f(m)}＝{{${f(a)}}} m/s²。`, back: [S2, S3] }],
    };
  }
  return {
    prompt: `質量 ${f(m)} kg の物体が、一直線上を加速度 ${f(a)} m/s² で運動している。物体にはたらく合力の大きさは何 N ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(F)], unit: "N", calc: `${m}*${a}` },
    point: "合力＝質量×加速度",
    steps: [{ title: "運動方程式", body: `ma＝F に入れると、F＝${f(m)}×${f(a)}＝{{${f(F)}}} N。`, back: [S2, S3] }],
  };
}

function masatsu(r: Rng): QuestionBody {
  const mu = r.pick([0.2, 0.25, 0.4, 0.5]);
  const m = r.int(1, 5);
  const N = m * 9.8;
  const F0 = mu * N;
  if (r.bool()) {
    return {
      prompt: `水平な床の上に質量 ${m} kg の箱が置いてある。箱と床の間の静止摩擦係数を ${f(mu)} とすると、箱を水平に引いてすべり出させるには、何 N より大きな力が必要ですか。重力加速度の大きさは 9.8 m/s² とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(F0)], unit: "N", calc: `${mu}*${m}*9.8` },
      point: "最大摩擦力 F₀＝μN。水平面なら N＝mg",
      steps: [
        { title: "垂直抗力", body: `鉛直方向のつり合いより N＝mg＝${m}×9.8＝${f(N)} N。`, back: [S1] },
        { title: "最大摩擦力", body: `F₀＝μN＝${f(mu)}×${f(N)}＝{{${f(F0)}}} N。これをこえるとすべり出す。`, back: [S4] },
      ],
    };
  }
  return {
    prompt: `水平な床の上の質量 ${m} kg の箱を水平に引く力を少しずつ大きくしていくと、引く力が ${f(F0)} N をこえたところで箱がすべり出した。箱と床の間の静止摩擦係数はいくらですか。重力加速度の大きさは 9.8 m/s² とする。`,
    answer: { kind: "num", answerKind: "num", answer: [f(mu)], calc: `${f(F0)}/(${m}*9.8)` },
    point: "すべり出す直前の引く力＝最大摩擦力 μN",
    steps: [
      { title: "垂直抗力", body: `N＝mg＝${m}×9.8＝${f(N)} N。`, back: [S1] },
      { title: "μ を求める", body: `F₀＝μN より、μ＝${f(F0)}÷${f(N)}＝{{${f(mu)}}}。`, back: [S4] },
    ],
  };
}

function elevator(r: Rng): QuestionBody {
  const m = r.step(40, 70, 5);
  const a = r.pick([0.5, 1, 1.5, 2]);
  const up = r.bool();
  const N = m * (9.8 + (up ? a : -a));
  const how = up ? r.pick(["上昇を始めて速さを増している", "下降していて減速している"]) : r.pick(["下降を始めて速さを増している", "上昇していて減速している"]);
  return {
    prompt: `エレベーターの床に置いた体重計に、質量 ${m} kg の人が乗っている。エレベーターが${how}とき、加速度の大きさは ${f(a)} m/s² であった。体重計が人を押す力（垂直抗力）の大きさは何 N ですか。重力加速度の大きさは 9.8 m/s² とする。`,
    answer: { kind: "num", answerKind: "num", answer: [f(N)], unit: "N", calc: `${m}*(9.8${up ? "+" : "-"}${a})` },
    point: "加速度の向きで N＝m(g＋a) か m(g−a) が決まる",
    steps: [
      { title: "加速度の向き", body: `${how}ので、加速度は{{${up ? "上向き" : "下向き"}}}。速度の向きではなく加速度の向きを見る。`, back: [S5] },
      { title: "運動方程式", body: `${up ? "上" : "下"}向きを正として ${m}×${f(a)}＝${up ? "N−" + m + "×9.8" : m + "×9.8−N"}。N＝{{${f(N)}}} N。`, back: [S3], trap: "「下降中」でも減速していれば加速度は上向き。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("kansei", 1),
    prompt: "物体にはたらく力がつり合っているとき、物体の運動について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["静止しているか、等速直線運動を続ける", "必ず静止している", "しだいに減速して止まる", "力の向きに加速する"],
      correct: 0,
      why: ["正しい。慣性の法則。", "動いていた物体は、そのまま等速で動き続ける。", "減速するのは、運動と逆向きの合力があるとき。", "合力が 0 なので加速度も 0。"],
    },
    point: "合力 0 → 静止か等速直線運動（慣性の法則）",
    steps: [{ title: "慣性の法則", body: "合力が 0 なら加速度は 0。{{静止している物体は静止、動いている物体は等速直線運動}}を続ける。", back: [S2] }],
  },
  {
    ...base("hook", 1),
    prompt: "ばね定数 40 N/m のばねを 0.15 m のばしたとき、ばねの弾性力の大きさは何 N ですか。",
    answer: { kind: "num", answerKind: "num", answer: ["6"], unit: "N", calc: "40*0.15" },
    point: "フックの法則 F＝kx",
    steps: [{ title: "F＝kx", body: "F＝40×0.15＝{{6}} N。のびは m で入れる。", back: [S1] }],
  },
  {
    ...base("hanayo", 2),
    prompt: "机の上に本が静止している。「地球が本を引く力（重力）」の反作用はどれですか。",
    answer: {
      kind: "choice",
      options: ["本が地球を引く力", "机が本を押す力", "本が机を押す力", "机が地球を押す力"],
      correct: 0,
      why: ["正しい。「どれが・どれを」を入れかえた力が反作用。", "これは本にはたらく力で、重力とつり合う力。", "これは「机が本を押す力」の反作用。", "地球と本の間の力とは関係ない。"],
    },
    point: "反作用は「Aが Bを」→「Bが Aを」",
    steps: [{ title: "主語と目的語を入れかえる", body: "地球が本を引く → {{本が地球を引く}}。つり合いは1つの物体にはたらく2力、作用・反作用は2つの物体の間の2力。", back: [S2], trap: "重力と垂直抗力は同じ本にはたらく「つり合い」の関係。" }],
  },
  {
    ...base("seishi-masatsu", 2, "思考・判断・表現"),
    prompt: "水平な床の上に質量 2.0 kg の箱がある。箱と床の静止摩擦係数は 0.50 で、最大摩擦力は 9.8 N である。箱を水平に 5.0 N の力で引いたが動かなかった。このとき箱にはたらく静止摩擦力の大きさは何 N ですか。",
    answer: { kind: "num", answerKind: "num", answer: ["5"], unit: "N", calc: "5" },
    point: "動かないとき、静止摩擦力＝引く力",
    steps: [{ title: "つり合いで決まる", body: "静止しているので水平方向の力はつり合う。静止摩擦力は{{引く力と同じ 5.0 N}}。μN＝9.8 N はその最大値。", back: [S4], trap: "いつも μN になるわけではない。μN はすべり出す直前だけ。" }],
  },
  {
    ...base("touso-elevator", 3, "思考・判断・表現"),
    prompt: "質量 50 kg の人がエレベーターの体重計に乗っている。エレベーターが一定の速さで上昇しているとき、体重計が示す力の大きさについて正しいものはどれですか。重力加速度の大きさは 9.8 m/s² とする。",
    answer: {
      kind: "choice",
      options: ["490 N で、静止しているときと同じ", "490 N より大きい", "490 N より小さい", "0 N"],
      correct: 0,
      why: ["正しい。等速なら加速度 0 で、N＝mg。", "大きくなるのは、加速度が上向きのとき。上昇していても等速なら変わらない。", "小さくなるのは、加速度が下向きのとき。", "0 になるのは、加速度が下向きに g のとき（自由落下）。"],
    },
    point: "体重計の目もりは速度ではなく加速度で決まる",
    steps: [{ title: "加速度は 0", body: "等速なので a＝0。ma＝N−mg より {{N＝mg＝490 N}}。動いている向きは関係しない。", back: [S5] }],
  },
  {
    ...base("goryoku-hikiage", 3, "思考・判断・表現"),
    prompt: "質量 2.0 kg のおもりを糸でつるし、糸を引いて上向きに加速度 1.2 m/s² で引き上げた。糸の張力の大きさは何 N ですか。重力加速度の大きさは 9.8 m/s² とする。",
    answer: { kind: "num", answerKind: "num", answer: ["22"], unit: "N", calc: "2*(9.8+1.2)" },
    point: "合力＝張力−重力 を ma の右辺に",
    steps: [
      { title: "力を全部書く", body: "おもりには上向きに張力 T、下向きに重力 2.0×9.8＝19.6 N。", back: [S1] },
      { title: "運動方程式", body: "上向きを正として 2.0×1.2＝T−19.6。T＝{{22}} N。", back: [S3], trap: "F に張力だけを入れると T＝2.4 N になってしまう。" },
    ],
  },
];

export const H_SCI_PHYB_HOSOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理基礎",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "運動方程式の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "undohoteishiki", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: undohoteishiki },
        { id: "masatsu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: masatsu },
        { id: "elevator", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: elevator },
      ],
    },
    { title: "力のはたらきと運動の法則", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
