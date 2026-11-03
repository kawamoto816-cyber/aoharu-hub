// 物理「円運動」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: v＝rω、a＝rω²＝v²/r、向心力 F＝mv²/r、カーブの最大の速さ μmg＝mv²/r、
//   鉛直面内の最下点の張力 T＝mg＋mv²/r・最高点で糸がたるまない条件 mg≦mv²/r を calc / equations に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。g＝9.8 m/s²。答えが小数第3位までで割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-enundo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "角速度・速さ・周期");
const S2 = L(2, "なぜ加速度は中心向きで v²/r なのか");
const S3 = L(3, "向心力は「新しい種類の力」ではない");
const S4 = L(4, "回る人から見ると、遠心力がはたらく");
const S5 = L(5, "鉛直面内の円運動");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function kakusokudo(r: Rng): QuestionBody {
  const rad = r.pick([0.2, 0.5, 0.8, 1, 1.5, 2, 2.5, 4]);
  const w = r.pick([2, 3, 4, 5, 6, 10]);
  const kind = r.pick(["v", "a", "w"] as const);
  const obj = r.pick(["小物体", "おもり", "小球"]);
  if (kind === "w") {
    const v = rad * w;
    return {
      prompt: `半径 ${f(rad)} m の円周上を、${obj}が速さ ${f(v)} m/s で等速円運動している。角速度は何 rad/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(w)], unit: "rad/s", calc: `${f(v)}/${rad}` },
      point: "v＝rω より ω＝v/r",
      steps: [{ title: "v＝rω", body: `ω＝${f(v)}÷${f(rad)}＝{{${w}}} rad/s。`, back: [S1] }],
    };
  }
  if (kind === "v")
    return {
      prompt: `${obj}が半径 ${f(rad)} m の円周上を、角速度 ${w} rad/s で等速円運動している。${obj}の速さは何 m/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(rad * w)], unit: "m/s", calc: `${rad}*${w}` },
      point: "v＝rω",
      steps: [{ title: "v＝rω", body: `1 s に回る角が ${w} rad なので、弧の長さは ${f(rad)}×${w}＝{{${f(rad * w)}}} m。`, back: [S1] }],
    };
  return {
    prompt: `${obj}が半径 ${f(rad)} m の円周上を、角速度 ${w} rad/s で等速円運動している。加速度の大きさは何 m/s² ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(rad * w * w)], unit: "m/s²", calc: `${rad}*${w}^2` },
    point: "a＝rω²＝v²/r、向きは中心向き",
    steps: [{ title: "a＝rω²", body: `a＝${f(rad)}×${w}²＝{{${f(rad * w * w)}}} m/s²。速さは一定でも、向きが変わるので加速度がある。`, back: [S2], trap: "等速だから加速度 0、としない。" }],
  };
}

function koshinryoku(r: Rng): QuestionBody {
  const m = r.pick([0.1, 0.2, 0.5, 1, 2]);
  const v = r.int(2, 8);
  const rad = r.pick([0.5, 1, 2, 4]);
  const F = (m * v * v) / rad;
  const by = r.pick(["糸につないで、なめらかな水平面上で", "回転台にのせて", "糸につないで"]);
  return {
    prompt: `質量 ${f(m)} kg の物体を${by}、半径 ${f(rad)} m、速さ ${v} m/s の等速円運動をさせた。物体にはたらく向心力の大きさは何 N ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(F)], unit: "N", calc: `${m}*${v}^2/${rad}` },
    point: "F＝mv²/r",
    steps: [{ title: "運動方程式", body: `中心向きに ma＝F。a＝v²/r＝${v * v}÷${f(rad)}＝${f((v * v) / rad)}。F＝${f(m)}×${f((v * v) / rad)}＝{{${f(F)}}} N。`, back: [S2, S3] }],
  };
}

// μr＝5k² のとき v²＝μ×9.8×r＝49k² で v＝7k
const CURVE = [
  [0.5, 10],
  [0.25, 20],
  [0.5, 40],
  [0.4, 50],
  [0.8, 25],
  [0.5, 90],
  [0.9, 50],
  [0.4, 200],
  [0.8, 100],
] as const;

function curve(r: Rng): QuestionBody {
  const [mu, rad] = r.pick(CURVE);
  const v = Math.sqrt(mu * 9.8 * rad);
  const car = r.pick(["自動車", "自転車", "オートバイ"]);
  return {
    prompt: `水平な道路の半径 ${rad} m のカーブを、${car}が等速円運動で曲がる。タイヤと路面の間の静止摩擦係数が ${f(mu)} のとき、すべらずに曲がれる最大の速さは何 m/s ですか。重力加速度の大きさを 9.8 m/s² とする。`,
    answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", equations: [`x^2=${mu}*9.8*${rad}`] },
    point: "静止摩擦力が向心力の役目。最大は μmg",
    steps: [
      { title: "向心力の正体", body: `中心向きの力は路面の静止摩擦力だけ。最大で {{μmg}}。`, back: [S3] },
      { title: "式を立てる", body: `m v²/${rad}＝${f(mu)}×m×9.8 より v²＝${f(v * v)}、v＝{{${f(v)}}} m/s。質量は消える。`, back: [S2] },
    ],
  };
}

// 最高点の条件 v²＝g r となる [r, v]
const TOP = [
  [0.2, 1.4],
  [0.8, 2.8],
  [1.8, 4.2],
  [5, 7],
  [0.45, 2.1],
] as const;

function enchoku(r: Rng): QuestionBody {
  if (r.bool()) {
    const [rad, v] = r.pick(TOP);
    return {
      prompt: `長さ ${f(rad)} m の糸に小球をつけ、鉛直面内で円運動させる。小球が最高点を通るとき糸がたるまないための、最高点での最小の速さは何 m/s ですか。重力加速度の大きさを 9.8 m/s² とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", equations: [`x^2=9.8*${rad}`] },
      point: "最高点で張力 T≧0 ⇔ mv²/r≧mg",
      steps: [
        { title: "最高点の運動方程式", body: "中心 (下) 向きに、{{mv²/r＝T＋mg}}。", back: [S5] },
        { title: "T＝0 がぎりぎり", body: `v²＝gr＝9.8×${f(rad)}＝${f(v * v)} より v＝{{${f(v)}}} m/s。`, trap: "最高点で速さ 0 でよい、としない。糸がたるんで円からはずれる。" },
      ],
    };
  }
  const m = r.pick([0.1, 0.2, 0.5]);
  const rad = r.pick([0.5, 1, 2]);
  const v = r.int(2, 6);
  const T = m * 9.8 + (m * v * v) / rad;
  return {
    prompt: `長さ ${f(rad)} m の糸に質量 ${f(m)} kg の小球をつけ、鉛直面内で円運動させた。小球が最下点を速さ ${v} m/s で通るとき、糸の張力の大きさは何 N ですか。重力加速度の大きさを 9.8 m/s² とする。`,
    answer: { kind: "num", answerKind: "num", answer: [f(T)], unit: "N", calc: `${m}*9.8+${m}*${v}^2/${rad}` },
    point: "最下点：T−mg＝mv²/r",
    steps: [
      { title: "最下点の運動方程式", body: `中心 (上) 向きに {{T−mg＝mv²/r}}。`, back: [S5] },
      { title: "T を求める", body: `T＝${f(m * 9.8)}＋${f((m * v * v) / rad)}＝{{${f(T)}}} N。`, trap: "張力＝向心力 とせず、重力の分を足す。" },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("kasokudo-muki", 1),
    prompt: "等速円運動をしている物体の加速度の向きとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["つねに円の中心向き", "速度と同じ向き（円の接線方向）", "円の中心から外向き", "加速度は 0 なので向きはない"],
      correct: 0,
      why: ["正しい。速度の向きを中心側へ曲げ続けている。", "接線方向の加速度があると、速さが変わってしまう。", "外向きの「遠心力」は、回る人から見たときの見かけの力。", "速さが一定でも、向きが変わるので加速度がある。"],
    },
    point: "等速円運動の加速度は中心向き",
    steps: [{ title: "速度の変化を見る", body: "短い時間の速度の変化 Δv は{{中心を向く}}。だから加速度も中心向き。", back: [S2] }],
  },
  {
    ...base("ito-kireru", 1, "思考・判断・表現"),
    prompt: "なめらかな水平面上で、糸につけた小球を等速円運動させている。ある瞬間に糸が切れると、小球はそのあとどう動きますか（上から見た動き）。",
    answer: {
      kind: "choice",
      options: ["切れた瞬間の円の接線方向にまっすぐ進む", "円の中心から外向きにまっすぐ飛ぶ", "同じ円をえがき続ける", "らせんをえがいて外へ広がる"],
      correct: 0,
      why: ["正しい。力がなくなるので、そのときの速度のまま等速直線運動する。", "外向きの力ははたらいていない。遠心力は回る人から見た見かけの力。", "中心向きの力がなくなるので、曲がり続けない。", "力がはたらかない物体は、まっすぐ進む。"],
    },
    point: "力がなくなれば、そのときの速度で直進",
    steps: [{ title: "慣性の法則", body: "糸の張力 (向心力) がなくなると、小球は{{接線方向}}へ等速直線運動する。", back: [S3, S4] }],
  },
  {
    ...base("enshinryoku", 2, "思考・判断・表現"),
    prompt: "回転台にのって台とともに回っている人から見ると、台の上で静止している物体には遠心力がはたらいているように見える。遠心力についての説明として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["回転する立場で見るときに考える慣性力で、大きさは mrω²、向きは中心から外向き", "物体が地面から受ける本物の力で、だれから見てもはたらく", "向心力の反作用で、物体にはたらく", "大きさは mg で、つねに下向き"],
      correct: 0,
      why: ["正しい。回る人の立場では、静止摩擦力と遠心力がつり合って見える。", "台の外の静止した人から見ると遠心力はなく、静止摩擦力が向心力になっている。", "向心力の反作用は、物体が台 (など) におよぼす力で、物体にはたらく力ではない。", "重力とは別のもの。"],
    },
    point: "遠心力は回る立場の慣性力。外から見るとない",
    steps: [{ title: "立場を区別する", body: "静止した人：{{静止摩擦力が向心力}}。回る人：静止摩擦力と{{遠心力 mrω²}}がつり合って静止。", back: [S4] }],
  },
  {
    ...base("koshin-shotai", 2, "思考・判断・表現"),
    prompt: "次のうち、「向心力の役目をしている力」の組み合わせとして正しくないものはどれですか。",
    answer: {
      kind: "choice",
      options: ["地球のまわりを回る人工衛星 ─ 遠心力", "糸につけて水平面上で回す小球 ─ 糸の張力", "水平なカーブを曲がる自動車 ─ 路面からの静止摩擦力", "原子核のまわりを回る電子（古典的なモデル）─ 静電気力"],
      correct: 0,
      why: ["正しくない (これが答え)。人工衛星の向心力は地球からの万有引力。", "正しい組み合わせ。張力が中心向きにはたらく。", "正しい組み合わせ。摩擦力が中心向きにはたらく。", "正しい組み合わせ。原子核の正電荷が電子を引く。"],
    },
    point: "向心力は重力・張力・摩擦力などの「役目」",
    steps: [{ title: "実在の力を探す", body: "向心力は新しい力ではなく、{{中心向きにはたらく実在の力}}の合力。遠心力は外から見ると存在しない。", back: [S3] }],
  },
];

export const H_SCI_PHY_ENUNDO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "円運動の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kakusokudo", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: kakusokudo },
        { id: "koshinryoku", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: koshinryoku },
        { id: "curve", type: "A", difficulty: 2, points: 17, seconds: 110, skill: "思考・判断・表現", generate: curve },
        { id: "enchoku", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: enchoku },
      ],
    },
    { title: "円運動のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
