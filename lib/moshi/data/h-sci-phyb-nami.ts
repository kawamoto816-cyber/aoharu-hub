// 物理基礎「波の性質」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: v＝fλ、f＝1/T、v＝λ/T、定常波の節の間隔＝λ/2 を calc に書き、scripts/check-moshi.ts がシード1〜100で答えと照合する。
//   数値は先に答えを決めてから掛け算で作り、割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phyb-nami";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "媒質はその場で振動し、波形だけが進む");
const S2 = L(2, "なぜ v＝fλ になるのか");
const S3 = L(3, "横波と縦波");
const S4 = L(4, "波の重ね合わせ");
const S5 = L(5, "反射と定常波");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function vfl(r: Rng): QuestionBody {
  const fr = r.pick([0.5, 2, 4, 5, 8, 10, 20, 25]);
  const lam = r.pick([0.2, 0.4, 0.5, 0.8, 1.5, 2, 3]);
  const v = fr * lam;
  const ask = r.pick(["v", "lam", "f"] as const);
  if (ask === "v") {
    return {
      prompt: `振動数 ${f(fr)} Hz、波長 ${f(lam)} m の波が、ひもを伝わっている。この波の速さは何 m/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", calc: `${fr}*${lam}` },
      point: "v＝fλ（1秒に f 個の波が λ ずつ）",
      steps: [{ title: "v＝fλ", body: `v＝${f(fr)}×${f(lam)}＝{{${f(v)}}} m/s。`, back: [S2] }],
    };
  }
  if (ask === "lam") {
    return {
      prompt: `速さ ${f(v)} m/s で伝わる波の振動数が ${f(fr)} Hz のとき、波長は何 m ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(lam)], unit: "m", calc: `${f(v)}/${fr}` },
      point: "λ＝v/f",
      steps: [{ title: "v＝fλ を変形", body: `λ＝v÷f＝${f(v)}÷${f(fr)}＝{{${f(lam)}}} m。`, back: [S2] }],
    };
  }
  return {
    prompt: `速さ ${f(v)} m/s で伝わる波の波長が ${f(lam)} m のとき、振動数は何 Hz ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(fr)], unit: "Hz", calc: `${f(v)}/${lam}` },
    point: "f＝v/λ",
    steps: [{ title: "v＝fλ を変形", body: `f＝v÷λ＝${f(v)}÷${f(lam)}＝{{${f(fr)}}} Hz。`, back: [S2] }],
  };
}

function shuki(r: Rng): QuestionBody {
  const Tp = r.pick([0.1, 0.2, 0.25, 0.4, 0.5, 2, 4]);
  const lam = r.pick([0.2, 0.4, 0.6, 0.8, 1, 2, 3]);
  const v = lam / Tp;
  const fr = 1 / Tp;
  if (r.bool()) {
    return {
      prompt: `ある波で、媒質の1点が1回振動するのに ${f(Tp)} s かかる。この波の振動数は何 Hz ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(fr)], unit: "Hz", calc: `1/${Tp}` },
      point: "f＝1/T（周期の逆数）",
      steps: [{ title: "f＝1/T", body: `1回に ${f(Tp)} s なので、1秒間には 1÷${f(Tp)}＝{{${f(fr)}}} 回振動する。`, back: [S1] }],
    };
  }
  return {
    prompt: `周期 ${f(Tp)} s、波長 ${f(lam)} m の波の速さは何 m/s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", calc: `${lam}/${Tp}` },
    point: "1周期で1波長進む：v＝λ/T",
    steps: [
      { title: "1周期で λ 進む", body: `波源が1回振動する ${f(Tp)} s の間に、波は1波長 ${f(lam)} m 進む。`, back: [S2] },
      { title: "v＝λ/T", body: `v＝${f(lam)}÷${f(Tp)}＝{{${f(v)}}} m/s（f＝${f(fr)} Hz として v＝fλ でも同じ）。` },
    ],
  };
}

function teijoha(r: Rng): QuestionBody {
  const d = r.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5]);
  const fr = r.pick([10, 20, 40, 50, 100]);
  const lam = 2 * d;
  const v = fr * lam;
  if (r.bool()) {
    return {
      prompt: `ひもに振動数 ${fr} Hz の定常波ができていて、となりあう節と節の間隔が ${f(d)} m であった。ひもを伝わる波の速さは何 m/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", calc: `${fr}*2*${d}` },
      point: "節と節の間隔は λ/2",
      steps: [
        { title: "波長を出す", body: `節と節の間隔は{{半波長}}なので λ＝2×${f(d)}＝${f(lam)} m。`, back: [S5], trap: "節の間隔をそのまま波長にしない。" },
        { title: "v＝fλ", body: `v＝${fr}×${f(lam)}＝{{${f(v)}}} m/s。`, back: [S2] },
      ],
    };
  }
  return {
    prompt: `速さ ${f(v)} m/s、振動数 ${fr} Hz の波が、逆向きに進む同じ波と重なって定常波ができた。となりあう節と節の間隔は何 m ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(d)], unit: "m", calc: `${f(v)}/${fr}/2` },
    point: "λ＝v/f を出して、その半分",
    steps: [
      { title: "波長", body: `λ＝${f(v)}÷${fr}＝${f(lam)} m。`, back: [S2] },
      { title: "節の間隔", body: `節と節の間は λ/2 なので {{${f(d)}}} m。`, back: [S5] },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("baishitsu", 1),
    prompt: "水面に浮かぶ木の葉の近くを波が通りすぎた。木の葉の動きとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["ほぼその場で上下にゆれるだけ", "波といっしょに遠くへ運ばれていく", "波と逆向きに進む", "まったく動かない"],
      correct: 0,
      why: ["正しい。媒質はその場で振動し、進むのは波形とエネルギー。", "媒質は遠くへは運ばれない。", "波と逆向きに運ばれることもない。", "媒質が振動するので、浮かんだ木の葉もゆれる。"],
    },
    point: "媒質はその場で振動、進むのは波形",
    steps: [{ title: "媒質は運ばれない", body: "波が来ても媒質は{{その場で振動}}するだけ。木の葉も上下にゆれるだけで、進むのは{{波形とエネルギー}}。", back: [S1] }],
  },
  {
    ...base("tatenami", 1),
    prompt: "媒質の振動の向きが、波の進む向きと平行な波を何といいますか。漢字2字で答えなさい。",
    answer: { kind: "term", accept: ["縦波"], script: "kanji", chars: 2, near: [{ text: "横波", why: "横波は、振動の向きが進む向きと垂直な波です。" }] },
    point: "平行＝縦波（疎密波）、垂直＝横波",
    steps: [{ title: "振動の向き", body: "進む向きと{{平行}}に振動する波が縦波。密と疎が交互に進むので疎密波ともいう。音は縦波。", back: [S3] }],
  },
  {
    ...base("kasane", 2, "思考・判断・表現"),
    prompt: "同じひもの上を、高さ 3 cm の山の形のパルス波と、深さ 1 cm の谷の形のパルス波が逆向きに進み、ちょうど重なった。重なった点の変位はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["上向きに 2 cm", "上向きに 4 cm", "下向きに 2 cm", "0 cm"],
      correct: 0,
      why: ["正しい。(＋3)＋(−1)＝＋2 cm。", "谷の変位を正として足している。", "向きが逆。", "打ち消し合って 0 になるのは、同じ大きさの山と谷が重なったとき。"],
    },
    point: "重ね合わせは変位を符号つきで足す",
    steps: [{ title: "重ね合わせの原理", body: "上向きを＋とすると、山は＋3 cm、谷は −1 cm。重なった点の変位は{{和の＋2 cm}}。", back: [S4] }],
  },
  {
    ...base("shindosu-baika", 2, "思考・判断・表現"),
    prompt: "同じひもを伝わる波で、波源の振動数を2倍にした。波の速さと波長はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["速さは変わらず、波長は 1/2 倍", "速さは2倍、波長は変わらない", "速さも波長も2倍", "速さは 1/2 倍、波長は2倍"],
      correct: 0,
      why: ["正しい。速さは媒質で決まるので、v＝fλ で f が2倍なら λ は半分。", "波の速さは媒質（ひも）で決まり、振動数では変わらない。", "v＝fλ が成り立たなくなる。", "速さは変わらない。"],
    },
    point: "速さは媒質で決まる。f を変えると λ が変わる",
    steps: [{ title: "v は一定", body: "同じひもなので{{速さ v は変わらない}}。v＝fλ より、f を2倍にすると {{λ は 1/2}} になる。", back: [S2] }],
  },
  {
    ...base("koteitan", 3),
    prompt: "ひもの端を壁に固定した（固定端）。山の形のパルス波がこの端で反射すると、反射した波はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["谷の形になってもどってくる", "山の形のままもどってくる", "反射せず、壁の中を進んでいく", "高さが2倍の山になってもどってくる"],
      correct: 0,
      why: ["正しい。固定端では端が動けないので、山が谷になって反射する。", "山が山のまま反射するのは自由端。", "ひもの波は固定端で反射する。", "反射によって高さが2倍になることはない。"],
    },
    point: "固定端：山→谷、自由端：山→山",
    steps: [{ title: "端が動けるか", body: "{{固定端}}は端が動けないので、山は{{谷}}になって反射する。自由端では山のまま。", back: [S5] }],
  },
  {
    ...base("hara-fushi", 3, "思考・判断・表現"),
    prompt: "波長 0.80 m の2つの波が逆向きに進んで重なり、定常波ができた。1つの節から、となりの腹までの距離は何 m ですか。",
    answer: { kind: "num", answerKind: "num", answer: ["0.2"], unit: "m", calc: "0.8/4" },
    point: "節→節は λ/2、節→腹はその半分の λ/4",
    steps: [{ title: "並び方", body: "節と節の間は λ/2＝0.40 m で、その真ん中に腹がある。節から腹までは {{λ/4＝0.20 m}}。", back: [S5], trap: "λ/2 と答えると、節から次の節までになる。" }],
  },
];

export const H_SCI_PHYB_NAMI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理基礎",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "波の式の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "vfl", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: vfl },
        { id: "shuki", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: shuki },
        { id: "teijoha", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: teijoha },
      ],
    },
    { title: "波のふるまい", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
