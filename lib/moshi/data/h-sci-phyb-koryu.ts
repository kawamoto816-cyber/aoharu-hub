// 物理基礎「磁場と交流」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: 変圧器 V₁:V₂＝N₁:N₂・V₁I₁＝V₂I₂、周期 T＝1/f、送電の損失 rI²（I＝P/V）・電圧 n 倍で損失 1/n² を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phyb-koryu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "電流は磁場をつくる");
const S2 = L(2, "電流は磁場から力を受ける：モーター");
const S3 = L(3, "電磁誘導とレンツの法則");
const S4 = L(4, "発電機は交流をつくる");
const S5 = L(5, "変圧器：巻数の比で電圧が決まる");
const S6 = L(6, "なぜ高い電圧で送電するのか");
const S7 = L(7, "電磁波");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function henatsu(r: Rng): QuestionBody {
  const N1 = r.pick([100, 200, 400, 500, 1000, 2000]);
  const ratio = r.pick([0.05, 0.1, 0.2, 0.25, 0.5, 2, 4, 5]);
  const N2 = N1 * ratio;
  const V1 = r.pick([100, 200, 20, 40]);
  const V2 = V1 * ratio;
  if (r.bool()) {
    return {
      prompt: `一次コイルの巻数 ${N1} 回、二次コイルの巻数 ${f(N2)} 回の変圧器がある。一次コイルに ${V1} V の交流電圧を加えると、二次コイルに生じる電圧は何 V ですか。損失は考えない。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V2)], unit: "V", calc: `${V1}*${f(N2)}/${N1}` },
      point: "V₁：V₂＝N₁：N₂（電圧は巻数に比例）",
      steps: [{ title: "巻数の比", body: `V₂＝V₁×N₂/N₁＝${V1}×${f(N2)}÷${N1}＝{{${f(V2)}}} V。`, back: [S5] }],
    };
  }
  return {
    prompt: `一次コイルの巻数が ${N1} 回の変圧器で、一次コイルに ${V1} V の交流電圧を加えて、二次コイルに ${f(V2)} V の電圧を取り出したい。二次コイルの巻数を何回にすればよいですか。損失は考えない。`,
    answer: { kind: "num", answerKind: "num", answer: [f(N2)], unit: "回", calc: `${N1}*${f(V2)}/${V1}` },
    point: "N₂＝N₁×V₂/V₁",
    steps: [{ title: "巻数の比", body: `N₂＝${N1}×${f(V2)}÷${V1}＝{{${f(N2)}}} 回。`, back: [S5] }],
  };
}

function shuki(r: Rng): QuestionBody {
  const kind = r.pick(["T", "f", "I2"] as const);
  if (kind === "T") {
    const fr = r.pick([50, 100, 200, 250, 500, 1000]);
    return {
      prompt: `周波数 ${fr} Hz の交流の周期は何 s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(1 / fr)], unit: "s", calc: `1/${fr}` },
      point: "周期 T＝1/f",
      steps: [{ title: "T＝1/f", body: `1秒間に ${fr} 回くり返すので、1回は 1÷${fr}＝{{${f(1 / fr)}}} s。`, back: [S4] }],
    };
  }
  if (kind === "f") {
    const Tms = r.pick([1, 2, 4, 5, 10, 20, 25]);
    return {
      prompt: `ある交流電圧は、${Tms} ms（${Tms}×10⁻³ s）ごとに同じ変化をくり返す。この交流の周波数は何 Hz ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(1000 / Tms)], unit: "Hz", calc: `1/(${Tms}/1000)` },
      point: "f＝1/T。ms は s に直す",
      steps: [{ title: "f＝1/T", body: `T＝${f(Tms / 1000)} s なので、f＝1÷${f(Tms / 1000)}＝{{${f(1000 / Tms)}}} Hz。`, back: [S4] }],
    };
  }
  const V1 = r.pick([100, 200]);
  const V2 = r.pick([5, 10, 20, 25, 50]);
  const I1 = r.pick([0.1, 0.2, 0.5, 1]);
  const I2 = (V1 * I1) / V2;
  return {
    prompt: `損失のない変圧器で、一次側の電圧が ${V1} V、電流が ${f(I1)} A、二次側の電圧が ${V2} V であった。二次側を流れる電流は何 A ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(I2)], unit: "A", calc: `${V1}*${I1}/${V2}` },
    point: "損失がなければ電力は同じ：V₁I₁＝V₂I₂",
    steps: [
      { title: "電力は変わらない", body: `V₁I₁＝${V1}×${f(I1)}＝${f(V1 * I1)} W＝V₂I₂。`, back: [S5] },
      { title: "I₂", body: `I₂＝${f(V1 * I1)}÷${V2}＝{{${f(I2)}}} A。電圧を下げると電流は大きくなる。`, trap: "電流も巻数に比例すると考えない。電流は電圧と逆の比になる。" },
    ],
  };
}

function soden(r: Rng): QuestionBody {
  if (r.bool()) {
    const n = r.pick([2, 3, 4, 5, 10]);
    const up = r.bool();
    const ans = up ? `1/${n * n}` : String(n * n);
    return {
      prompt: `同じ電力を同じ送電線で送るとき、送電の電圧を${up ? `${n} 倍にする` : `1/${n} 倍にする`}と、送電線で熱として失われる電力は何倍になりますか。`,
      answer: { kind: "num", answerKind: "num", answer: [ans], unit: "倍", calc: up ? `(1/${n})^2` : `${n}^2` },
      point: "P＝VI が同じなら I は V に反比例、損失 rI² は I²",
      steps: [
        { title: "電流の変化", body: `P＝VI が同じなので、電圧を${up ? `${n} 倍にすると電流は 1/${n}` : `1/${n} にすると電流は ${n} 倍`}。`, back: [S6] },
        { title: "損失は2乗", body: `損失 rI² は電流の2乗に比例するので {{${ans}}} 倍。`, trap: `${up ? `1/${n}` : n} 倍としない。電流の2乗で効く。` },
      ],
    };
  }
  const Pk = r.pick([10, 20, 50, 100]);
  const V = r.pick([1000, 2000, 5000, 10000]);
  const rr = r.pick([0.5, 1, 2, 5]);
  const I = (Pk * 1000) / V;
  const loss = rr * I * I;
  return {
    prompt: `${Pk} kW の電力を、${V} V の電圧で、抵抗 ${f(rr)} Ω の送電線を通して送る。送電線で熱として失われる電力は何 W ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(loss)], unit: "W", calc: `${rr}*(${Pk}*1000/${V})^2` },
    point: "I＝P/V を出して、損失＝rI²",
    steps: [
      { title: "電流", body: `I＝P/V＝${Pk * 1000}÷${V}＝${f(I)} A。`, back: [S6] },
      { title: "損失", body: `rI²＝${f(rr)}×${f(I)}²＝{{${f(loss)}}} W。`, trap: "送電の電圧 V をそのまま V²/r に入れない。送電線にかかる電圧は V ではない。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("migi-neji", 1),
    prompt: "まっすぐな導線を流れる電流のまわりにできる磁場の向きを決める法則はどれですか。",
    answer: {
      kind: "choice",
      options: ["右ねじの法則", "レンツの法則", "オームの法則", "フックの法則"],
      correct: 0,
      why: ["正しい。ねじの進む向きが電流、回す向きが磁場。", "レンツの法則は、誘導電流の向きを決める。", "オームの法則は電圧と電流の関係。", "フックの法則はばねの弾性力。"],
    },
    point: "電流のまわりの磁場は右ねじの法則",
    steps: [{ title: "右ねじ", body: "ねじの進む向き＝電流、回す向き＝磁場（{{右ねじの法則}}）。磁場は電流を中心とした同心円状。", back: [S1] }],
  },
  {
    ...base("yudo-tomaru", 1),
    prompt: "コイルに棒磁石を入れて、そのまま止めておいた。止めている間のコイルについて正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["誘導電流は流れない", "入れたときと同じ向きに誘導電流が流れ続ける", "入れたときと逆向きに誘導電流が流れ続ける", "磁石が強ければ誘導電流が流れ続ける"],
      correct: 0,
      why: ["正しい。コイルを貫く磁場が変化しないので、電磁誘導は起こらない。", "流れるのは磁場が変化している間だけ。", "止めている間は電流が流れない。逆向きに流れるのは磁石を引き抜くとき。", "磁石の強さではなく、磁場の「変化」が必要。"],
    },
    point: "電磁誘導は磁場の「変化」で起こる",
    steps: [{ title: "変化があるか", body: "誘導電流が流れるのは、コイルを貫く磁場が{{変化している間だけ}}。止めた磁石では変化がない。", back: [S3] }],
  },
  {
    ...base("seiryushi", 2),
    prompt: "直流モーターで、コイルが同じ向きに回り続けるように、半回転ごとにコイルの電流の向きを切りかえる部品を何といいますか。",
    answer: { kind: "term", accept: ["整流子"], script: "kanji", near: [{ text: "変圧器", why: "変圧器は電圧を変える装置です。電流の向きを切りかえる部品は整流子です。" }] },
    point: "半回転ごとに電流を切りかえる＝整流子",
    steps: [{ title: "回り続けるしくみ", body: "電流が磁場から受ける力でコイルが回る。半回転ごとに電流の向きを切りかえる{{整流子}}があるので回り続ける。", back: [S2] }],
  },
  {
    ...base("jikkochi", 2),
    prompt: "家庭のコンセントの「100 V」について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["実効値で、電圧の最大値は約 141 V", "電圧の最大値で、実効値は約 71 V", "直流の電圧で、いつも 100 V で一定", "電圧の平均値で、最大値は 200 V"],
      correct: 0,
      why: ["正しい。最大値＝実効値×√2≒141 V。", "100 V は最大値ではなく実効値。", "家庭の電気は交流で、電圧の向きと大きさが変わる。", "最大値は 200 V ではなく約 141 V。"],
    },
    point: "100 V は実効値。最大値は ×√2 で約 141 V",
    steps: [{ title: "実効値", body: "交流の電圧は{{実効値}}で表す。最大値は 100×√2≒{{141 V}}。", back: [S4] }],
  },
  {
    ...base("chokuryu-henatsu", 3, "思考・判断・表現"),
    prompt: "変圧器の一次コイルに、交流ではなく電池の直流電圧を加えたまま使い続けた。二次コイルについて正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["コイルを貫く磁場が変化しないので、電圧は生じない", "巻数の比に応じた直流電圧が生じ続ける", "一次コイルと同じ直流電圧が生じ続ける", "交流に変わった電圧が生じる"],
      correct: 0,
      why: ["正しい。変圧器は電磁誘導を使うので、変化する磁場が必要。", "直流では磁場が一定で、電磁誘導が起こらない。", "直流では電圧は伝わらない。", "変圧器に直流を交流に変えるはたらきはない。"],
    },
    point: "変圧器は電磁誘導。直流では使えない",
    steps: [{ title: "変化する磁場が必要", body: "変圧器は一次コイルの交流がつくる{{変化する磁場}}で二次コイルに電磁誘導を起こす。直流では磁場が変化しないので{{電圧は生じない}}。", back: [S5, S3] }],
  },
  {
    ...base("denjiha", 3),
    prompt: "電磁波について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["変化する電場と磁場が互いを生みながら伝わる波で、真空中の速さは約 3.0×10⁸ m/s", "空気などの媒質がないと伝わらない波である", "可視光線は電磁波だが、電波や X 線は電磁波ではない", "波長によらず、真空中の速さが少しずつちがう"],
      correct: 0,
      why: ["正しい。光も電波も電磁波。", "電磁波は真空中でも伝わる（媒質が必要なのは音など）。", "電波・赤外線・可視光線・紫外線・X 線・γ 線はすべて電磁波。", "真空中ではどの波長でも同じ速さ。"],
    },
    point: "電磁波は真空中も伝わり、速さは約 3.0×10⁸ m/s",
    steps: [{ title: "電場と磁場", body: "変化する磁場は電場を、変化する電場は磁場を生む。これが空間を伝わるのが{{電磁波}}で、真空中の速さは約 {{3.0×10⁸ m/s}}。", back: [S7] }],
  },
];

export const H_SCI_PHYB_KORYU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理基礎",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "交流と変圧の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "henatsu", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: henatsu },
        { id: "shuki", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: shuki },
        { id: "soden", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: soden },
      ],
    },
    { title: "電流と磁場のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
