// 物理基礎「音」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: V＝331.5＋0.6t、うなり f＝|f₁−f₂|、弦 f＝nv/(2L)、閉管 f＝v/(4L)・開管 f＝v/(2L)、気柱共鳴 λ＝2(L₂−L₁) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。気柱共鳴は先に音速と振動数を決め、L₁・L₂ を cm (小数第2位まで) で作る。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phyb-oto";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "音は縦波。空気中の速さは気温で変わる");
const S2 = L(2, "音の三要素");
const S3 = L(3, "うなり");
const S4 = L(4, "弦の固有振動");
const S5 = L(5, "気柱の固有振動：閉管と開管");
const S6 = L(6, "共振・共鳴：気柱共鳴で音速を測る");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function onsoku(r: Rng): QuestionBody {
  const kind = r.pick(["V", "dist", "unari"] as const);
  if (kind === "unari") {
    const f1 = r.pick([256, 384, 440, 480, 512]);
    const d = r.int(1, 6);
    const f2 = r.bool() ? f1 + d : f1 - d;
    return {
      prompt: `振動数 ${f1} Hz と ${f2} Hz の2つのおんさを同時に鳴らした。うなりは1秒間に何回聞こえますか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(d)], unit: "回", calc: `${Math.max(f1, f2)}-${Math.min(f1, f2)}` },
      point: "うなりの回数＝振動数の差",
      steps: [{ title: "f＝|f₁−f₂|", body: `1秒間に一方が ${d} 回ぶん多く振動するので、うなりは {{${d}}} 回。`, back: [S3], trap: "振動数を足さない。" }],
    };
  }
  const t = r.int(0, 35);
  const V = 331.5 + 0.6 * t;
  if (kind === "V") {
    return {
      prompt: `気温 ${t}℃ の空気中を伝わる音の速さは何 m/s ですか。V＝331.5＋0.6t を使いなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "m/s", calc: `331.5+0.6*${t}` },
      point: "気温が 1℃ 上がるごとに音速は 0.6 m/s 速い",
      steps: [{ title: "式に入れる", body: `V＝331.5＋0.6×${t}＝{{${f(V)}}} m/s。`, back: [S1] }],
    };
  }
  const s = r.pick([2, 3, 4, 5, 6]);
  const D = V * s;
  return {
    prompt: `気温 ${t}℃ のとき、花火が光ってから ${s} s 後に音が聞こえた。花火までの距離は何 m ですか。音の速さは V＝331.5＋0.6t で求め、光が届く時間は考えない。`,
    answer: { kind: "num", answerKind: "num", answer: [f(D)], unit: "m", calc: `(331.5+0.6*${t})*${s}` },
    point: "音速を出してから、距離＝速さ×時間",
    steps: [
      { title: "音速", body: `V＝331.5＋0.6×${t}＝${f(V)} m/s。`, back: [S1] },
      { title: "距離", body: `${f(V)}×${s}＝{{${f(D)}}} m。` },
    ],
  };
}

function koyu(r: Rng): QuestionBody {
  const kind = r.pick(["gen", "hei", "kai"] as const);
  if (kind === "gen") {
    const v = r.step(100, 400, 20);
    const Lm = r.pick([0.4, 0.5, 0.8, 1]);
    const n = r.int(1, 3);
    const fr = (n * v) / (2 * Lm);
    const name = ["基本振動", "2倍振動", "3倍振動"][n - 1];
    return {
      prompt: `長さ ${f(Lm)} m の弦の両端を固定してはじいた。弦を伝わる波の速さが ${v} m/s のとき、${name}の振動数は何 Hz ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(fr)], unit: "Hz", calc: `${n}*${v}/(2*${Lm})` },
      point: "弦は両端が節：L＝n×λ/2",
      steps: [
        { title: "波長", body: `${name}では弦に半波長が ${n} 個入る。λ＝2L/n＝${f((2 * Lm) / n)} m。`, back: [S4] },
        { title: "振動数", body: `f＝v/λ＝${v}÷${f((2 * Lm) / n)}＝{{${f(fr)}}} Hz。` },
      ],
    };
  }
  const v = 340;
  const Lm = r.pick([0.17, 0.25, 0.4, 0.5, 0.85, 1]);
  const closed = kind === "hei";
  const lam = closed ? 4 * Lm : 2 * Lm;
  const fr = v / lam;
  return {
    prompt: `長さ ${f(Lm)} m の${closed ? "閉管（片側が閉じた管）" : "開管（両側が開いた管）"}の基本振動数は何 Hz ですか。音速を ${v} m/s とし、開口端補正は考えない。`,
    answer: { kind: "num", answerKind: "num", answer: [f(fr)], unit: "Hz", calc: `${v}/(${closed ? 4 : 2}*${Lm})` },
    point: closed ? "閉管の基本振動は L＝λ/4" : "開管の基本振動は L＝λ/2",
    steps: [
      { title: "波長", body: closed ? `閉じた端が節、口が腹。基本振動では管に λ/4 が1つ入るので λ＝4×${f(Lm)}＝${f(lam)} m。` : `両端が腹。基本振動では管に λ/2 が1つ入るので λ＝2×${f(Lm)}＝${f(lam)} m。`, back: [S5] },
      { title: "振動数", body: `f＝${v}÷${f(lam)}＝{{${f(fr)}}} Hz。`, trap: closed ? "閉管を L＝λ/2 とすると2倍の値になる。" : "開管を L＝λ/4 とすると半分の値になる。" },
    ],
  };
}

/** [振動数 Hz, 音速 m/s]。λ＝V/f が小数第2位までの m になる組 */
const KYOMEI: [number, number][] = [
  [400, 340],
  [500, 340],
  [680, 340],
  [850, 340],
  [425, 340],
  [500, 345],
  [400, 344],
  [800, 344],
];

function kyomei(r: Rng): QuestionBody {
  const [fr, V] = r.pick(KYOMEI);
  const lamCm = (V / fr) * 100;
  const e = r.pick([0.5, 1, 1.5]);
  const L1 = lamCm / 4 - e;
  const L2 = L1 + lamCm / 2;
  return {
    prompt: `ガラス管の水面を下げていき、管口の近くで振動数 ${fr} Hz のおんさを鳴らした。管口から水面までの長さが ${f(L1)} cm のとき1回目、${f(L2)} cm のとき2回目の共鳴が起こった。音の速さは何 m/s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(V)], unit: "m/s", calc: `${fr}*2*(${f(L2)}-${f(L1)})/100` },
    point: "共鳴する長さの差＝半波長",
    steps: [
      { title: "差が λ/2", body: `L₂−L₁＝${f(L2 - L1)} cm＝λ/2。λ＝{{${f(lamCm / 100)} m}}。管口の外の補正は差をとると消える。`, back: [S6] },
      { title: "V＝fλ", body: `V＝${fr}×${f(lamCm / 100)}＝{{${f(V)}}} m/s。`, trap: "L₁ だけから λ＝4L₁ とすると、開口端補正の分だけずれる。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("sanyoso", 1),
    prompt: "音の高さを決めるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["振動数", "振幅", "波形", "音の速さ"],
      correct: 0,
      why: ["正しい。振動数が大きいほど高い音。", "振幅は音の大きさを決める。", "波形は音色を決める。", "音の速さは媒質と気温で決まり、高さにはよらない。"],
    },
    point: "高さ＝振動数、大きさ＝振幅、音色＝波形",
    steps: [{ title: "音の三要素", body: "{{高さ＝振動数}}、大きさ＝振幅、音色＝波形。", back: [S2] }],
  },
  {
    ...base("shinku", 1),
    prompt: "真空の容器の中でブザーを鳴らしたとき、外で音が聞こえない理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["音を伝える媒質がないから", "真空中では音の速さが光より速すぎるから", "真空中では音の振動数が 0 になるから", "容器のガラスが音を必ず反射するから"],
      correct: 0,
      why: ["正しい。音は空気などの媒質を押し縮めたりゆるめたりして伝わる縦波。", "真空中では、音はそもそも伝わらない。", "ブザー自体は振動している。", "空気が入っていれば、ガラスごしにも音は聞こえる。"],
    },
    point: "音は媒質がないと伝わらない",
    steps: [{ title: "音は縦波", body: "音は空気などの{{媒質}}の疎密が伝わる縦波なので、{{真空中では伝わらない}}。", back: [S1] }],
  },
  {
    ...base("choonpa", 2),
    prompt: "人が聞くことのできる音の振動数はおよそ 20 Hz〜20000 Hz である。これより振動数が大きい音を何といいますか。",
    answer: { kind: "term", accept: ["超音波"], script: "kanji", near: [{ text: "低周波", why: "人に聞こえる範囲より振動数が小さい側ではなく、大きい側を答えます。" }] },
    point: "20000 Hz より高い音＝超音波",
    steps: [{ title: "聞こえる範囲の外", body: "およそ 20000 Hz より振動数が大きい音を{{超音波}}という。", back: [S2] }],
  },
  {
    ...base("gen-osaeru", 2, "思考・判断・表現"),
    prompt: "ギターの弦を指で押さえて、振動する部分の長さを短くした。弦の張り方は変えないとき、基本振動の音はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["波長が短くなり、高い音になる", "波長が長くなり、低い音になる", "波の速さが速くなり、大きな音になる", "変わらない"],
      correct: 0,
      why: ["正しい。λ＝2L が短くなり、v が同じなら f＝v/λ が大きくなる。", "L を短くすると λ も短くなる。", "張り方が同じなら弦を伝わる波の速さは変わらない。また大きさは振幅で決まる。", "振動する長さが変われば振動数も変わる。"],
    },
    point: "弦を短く → λ が短い → 振動数が大きい（高い音）",
    steps: [{ title: "f＝v/(2L)", body: "基本振動は λ＝2L。L を短くすると λ が短くなり、{{振動数が大きく（高い音に）}}なる。", back: [S4] }],
  },
  {
    ...base("heikan-kisu", 3, "思考・判断・表現"),
    prompt: "片側が閉じた管（閉管）の気柱で起こる固有振動として、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["基本振動の 1・3・5 倍…の奇数倍の振動だけ", "基本振動の 1・2・3 倍…のすべての整数倍の振動", "基本振動の 2・4・6 倍…の偶数倍の振動だけ", "基本振動だけ"],
      correct: 0,
      why: ["正しい。閉じた端が節、口が腹なので、管に λ/4 が奇数個入る。", "すべての整数倍が起こるのは開管。", "偶数倍では口が節になってしまう。", "基本振動以外にも、3倍・5倍振動などが起こる。"],
    },
    point: "閉管は奇数倍だけ、開管は整数倍すべて",
    steps: [{ title: "端の条件", body: "閉じた端は節、開いた端は腹。この2つを満たすには管に λ/4 が{{奇数個}}入る → {{奇数倍の振動だけ}}。", back: [S5] }],
  },
  {
    ...base("onsoku-takasa", 3, "思考・判断・表現"),
    prompt: "遠くのステージで、低い音の太鼓と高い音のフルートを同時に鳴らした。客席に届く音について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["2つの音は同時に届く", "高い音のフルートが先に届く", "低い音の太鼓が先に届く", "大きい音のほうが先に届く"],
      correct: 0,
      why: ["正しい。音の速さは媒質と気温で決まり、高さや大きさによらない。", "振動数が大きくても速さは同じ。", "振動数が小さくても速さは同じ。", "振幅（大きさ）でも速さは変わらない。"],
    },
    point: "音速は高さ・大きさによらない",
    steps: [{ title: "速さを決めるもの", body: "空気中の音速は{{気温}}で決まる（V＝331.5＋0.6t）。高い音も低い音も{{同じ速さ}}で届く。", back: [S1] }],
  },
];

export const H_SCI_PHYB_OTO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理基礎",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "音の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "onsoku", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: onsoku },
        { id: "koyu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: koyu },
        { id: "kyomei", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: kyomei },
      ],
    },
    { title: "音の性質", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
