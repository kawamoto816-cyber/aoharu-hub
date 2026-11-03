// 地学基礎「地震」の単元模試 (A: P波・S波の計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: P波の到着時間＝震源距離÷P波の速さ、大森公式 D＝kT (k＝VpVs/(Vp−Vs))、初期微動継続時間は震源距離に比例、を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。k が分数になる組は、T をその分母の倍数にして D を整数にする。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earthb-jishin";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "地震は岩盤がずれて起こる");
const S2 = L(2, "P波とS波");
const S3 = L(3, "初期微動継続時間から震源までの距離を出す");
const S4 = L(4, "震度とマグニチュードはちがうもの");
const S5 = L(5, "日本付近の地震が起こる場所");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function pha(r: Rng): QuestionBody {
  const vp = r.pick([5, 6, 7, 8]);
  const t = r.int(5, 30);
  const D = vp * t;
  if (r.bool()) {
    return {
      prompt: `P波の速さを ${vp} km/s とする。震源距離 ${D} km の地点に、P波は地震が発生してから何 s 後に着きますか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(t)], unit: "s", calc: `${D}/${vp}` },
      point: "時間＝震源距離÷波の速さ",
      steps: [{ title: "時間＝距離÷速さ", body: `${D}÷${vp}＝{{${t}}} s。P波は速いので先に着き、初期微動を起こす。`, back: [S2] }],
    };
  }
  return {
    prompt: `ある地点で、地震が発生してから ${t} s 後にP波が着いた。P波の速さを ${vp} km/s とすると、この地点の震源距離は何 km ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(D)], unit: "km", calc: `${vp}*${t}` },
    point: "距離＝速さ×時間",
    steps: [{ title: "距離＝速さ×時間", body: `${vp}×${t}＝{{${D}}} km。`, back: [S2] }],
  };
}

/** [Vp, Vs, k の分母] (k＝VpVs/(Vp−Vs)) */
const PAIR: [number, number, number][] = [
  [6, 3, 1],
  [8, 4, 1],
  [6, 4, 1],
  [7, 4, 3],
  [5, 3, 2],
  [6, 3.5, 5],
  [7.5, 5, 1],
];

function omori(r: Rng): QuestionBody {
  const [vp, vs, q] = r.pick(PAIR);
  const k = (vp * vs) / (vp - vs);
  const T = q * r.int(1, Math.floor(20 / q));
  const D = k * T;
  return {
    prompt: `P波の速さを ${f(vp)} km/s、S波の速さを ${f(vs)} km/s とする。ある地点で初期微動継続時間が ${T} s であった。この地点の震源距離は何 km ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(D)], unit: "km", calc: `${vp}*${vs}*${T}/(${vp}-${vs})` },
    point: "D/Vs − D/Vp ＝ T から D を求める（D＝kT）",
    steps: [
      { title: "到着時間の差", body: `震源距離を D とすると、S波とP波の到着時間の差が初期微動継続時間。{{D/${f(vs)} − D/${f(vp)} ＝ ${T}}}。`, back: [S3] },
      { title: "D を求める", body: `D＝${f(vp)}×${f(vs)}÷(${f(vp)}−${f(vs)})×${T}＝{{${f(D)}}} km。`, trap: "速さの差 (Vp−Vs) に T をかけるだけでは距離にならない。" },
    ],
  };
}

function hirei(r: Rng): QuestionBody {
  const T1 = r.int(3, 10);
  const k = r.pick([6, 7, 8, 9]);
  const D1 = k * T1;
  const m = r.pick([0.5, 1.5, 2, 2.5, 3, 4]);
  const D2 = D1 * m;
  const T2 = T1 * m;
  return {
    prompt: `ある地震で、震源距離 ${D1} km の地点 A の初期微動継続時間は ${T1} s であった。同じ地震で、震源距離 ${f(D2)} km の地点 B の初期微動継続時間は何 s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(T2)], unit: "s", calc: `${T1}*${f(D2)}/${D1}` },
    point: "初期微動継続時間は震源距離に比例（大森公式）",
    steps: [
      { title: "比例を使う", body: `D＝kT より T は D に比例。B は A の ${f(D2)}÷${D1}＝${f(m)} 倍の距離。`, back: [S3] },
      { title: "T を求める", body: `${T1}×${f(m)}＝{{${f(T2)}}} s。`, trap: "距離の差をそのまま秒に足さない。比で考える。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("shino", 1),
    prompt: "地下で岩盤の破壊が始まった点の、真上にある地表の点を何といいますか。",
    answer: { kind: "term", accept: ["震央"], script: "kanji", chars: 2, near: [{ text: "震源", why: "震源は地下で破壊が始まった点です。その真上の地表の点が震央です。" }] },
    point: "震源＝地下の点、震央＝その真上の地表の点",
    steps: [{ title: "震源と震央", body: "破壊が始まった地下の点が{{震源}}、その真上の地表の点が{{震央}}。", back: [S1] }],
  },
  {
    ...base("shindo-kaikyu", 1),
    prompt: "日本で気象庁が使う震度の階級について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["0〜7 の10階級で、5と6は弱・強に分ける", "1〜10 の10階級", "0〜7 の8階級", "1〜9 の9階級で、地震の規模を表す"],
      correct: 0,
      why: ["正しい。0・1・2・3・4・5弱・5強・6弱・6強・7。", "震度は 0 から 7 まで。", "5と6を弱・強に分けるので10階級になる。", "地震の規模を表すのはマグニチュード。"],
    },
    point: "震度は0〜7の10階級（5・6は弱・強）",
    steps: [{ title: "震度の階級", body: "震度はその場所の{{ゆれの強さ}}で、0〜7の{{10階級}}（5と6は弱・強）。", back: [S4] }],
  },
  {
    ...base("s-ekitai", 2),
    prompt: "S波について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["進む向きと垂直に振動する横波で、固体の中しか伝わらない", "進む向きに振動する縦波で、固体・液体・気体を伝わる", "P波より速く伝わり、初期微動を起こす", "横波なので、液体の中を最も速く伝わる"],
      correct: 0,
      why: ["正しい。S波によるゆれが主要動。", "これはP波の説明。", "S波はP波よりおそく、主要動を起こす。", "S波は液体の中は伝わらない。"],
    },
    point: "S波＝横波・固体だけ・主要動",
    steps: [{ title: "P波との比較", body: "P波は縦波で速く、初期微動。{{S波は横波}}でおそく、主要動を起こし、{{固体の中しか伝わらない}}。", back: [S2] }],
  },
  {
    ...base("m-energy", 2),
    prompt: "マグニチュード（M）が 2 大きい地震のエネルギーは、およそ何倍ですか。",
    answer: {
      kind: "choice",
      options: ["約1000倍", "約2倍", "約64倍", "約100倍"],
      correct: 0,
      why: ["正しい。1大きいと約32倍、2大きいと 32×32≒1000倍。", "Mは1つ大きいだけで約32倍になる。", "32×2 ではなく 32×32。", "M1つで10倍と考えた誤り。1つで約32倍。"],
    },
    point: "M が1大きいと約32倍、2大きいと約1000倍",
    steps: [{ title: "かけ算でふえる", body: "M が1大きいとエネルギーは{{約32倍}}。2大きいと 32×32≒{{約1000倍}}。", back: [S4], trap: "1つで10倍ではない。" }],
  },
  {
    ...base("m-shindo", 3, "思考・判断・表現"),
    prompt: "M7.0 の地震 X と、M6.0 の地震 Y がある。ある地点では Y のほうが強くゆれた。このことの説明として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["震度は震源からの距離や地盤で変わるので、Y の震源がその地点に近かったなどの理由が考えられる", "M が小さい地震ほど、どこでも震度は大きくなる", "マグニチュードと震度は同じものなので、測定のまちがいである", "M が大きい地震 X は、エネルギーが小さかった"],
      correct: 0,
      why: ["正しい。震度はその場所ごとのゆれの強さ。", "M が小さいほど震度が大きくなるわけではない。", "マグニチュードは地震の規模、震度は場所ごとのゆれの強さで別のもの。", "M が大きいほどエネルギーは大きい。"],
    },
    point: "M＝地震の規模、震度＝その場所のゆれ",
    steps: [{ title: "2つを区別する", body: "マグニチュードは{{1つの地震に1つ}}。震度は{{場所ごと}}に決まり、震源からの距離や地盤で変わる。", back: [S4] }],
  },
  {
    ...base("kaiko-nairiku", 3, "思考・判断・表現"),
    prompt: "日本付近の地震について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["プレートの境界がずれる海溝型地震は規模が大きく、津波をともなうことがある", "内陸型地震は震源が深いので、強くゆれることはない", "活断層は海溝の底だけにある", "日本の下では、大陸側のプレートが海洋プレートの下に沈みこんでいる"],
      correct: 0,
      why: ["正しい。", "内陸型（直下型）地震は震源が浅く、規模が比較的小さくても強くゆれることがある。", "活断層は陸側のプレートの内部にもあり、内陸型地震を起こす。", "沈みこむのは海洋プレートのほう。"],
    },
    point: "海溝型＝大規模・津波、内陸型＝浅い・強いゆれ",
    steps: [{ title: "2つのタイプ", body: "海洋プレートが大陸側の下に沈みこむ境界で{{海溝型地震}}（津波をともなうことも）。陸の{{活断層}}が動くと浅い内陸型地震。", back: [S5] }],
  },
];

export const H_SCI_EARTHB_JISHIN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学基礎",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "P波とS波の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "pha", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: pha },
        { id: "omori", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: omori },
        { id: "hirei", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: hirei },
      ],
    },
    { title: "地震のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
