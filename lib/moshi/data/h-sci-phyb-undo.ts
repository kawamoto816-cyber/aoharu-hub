// 物理基礎「運動の表し方」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: v＝v₀＋at、x＝v₀t＋½at²、v²−v₀²＝2ax (止まるまで・最高点)、y＝½gt² を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で calc と答えを照合する。数値は小数第3位までで割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phyb-undo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "変位と速度は「向き」をもつ");
const S2 = L(2, "速度の合成と相対速度");
const S3 = L(3, "加速度：1秒あたりの速度の変化");
const S4 = L(4, "x＝v₀t＋½at² を面積で考える");
const S5 = L(5, "自由落下と v²−v₀²＝2ax");

/** 小数を「1.5」のように (誤差を出さない) */
const f = (x: number) => String(Math.round(x * 1000) / 1000);

function sokudo(r: Rng): QuestionBody {
  const kmh = r.bool();
  const v0 = kmh ? r.pick([18, 36, 54, 72]) : r.int(0, 8);
  const v0s = kmh ? v0 / 3.6 : v0;
  const a = r.pick([0.5, 1, 1.5, 2, 2.5, 3]);
  const t = r.int(2, 8);
  const v = v0s + a * t;
  const who = r.pick(["自動車", "電車", "台車"]);
  const start = kmh ? `時速 ${v0} km` : v0 === 0 ? "静止の状態" : `速度 ${v0} m/s`;
  return {
    prompt: `直線上を進む${who}が、${start}から、進む向きに加速度 ${f(a)} m/s² の等加速度直線運動をした。${t} s 後の速度は何 m/s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", calc: kmh ? `${v0}/3.6+${a}*${t}` : `${v0}+${a}*${t}` },
    point: "v＝v₀＋at。速度は m/s にそろえる",
    steps: [
      ...(kmh ? [{ title: "単位をそろえる", body: `${v0} km/h ÷ 3.6 ＝ {{${f(v0s)} m/s}}。加速度が m/s² なので、速度も m/s にする。`, back: [S1] }] : []),
      { title: "v＝v₀＋at", body: `毎秒 ${f(a)} m/s ずつ速くなるので、v＝${f(v0s)}＋${f(a)}×${t}＝{{${f(v)}}} m/s。`, back: [S3], trap: kmh ? "km/h のまま足すと、単位がちがう量を足すことになる。" : undefined },
    ],
  };
}

function henni(r: Rng): QuestionBody {
  const v0 = r.int(0, 10);
  const a = r.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
  const t = r.int(2, 10);
  const x = v0 * t + (a * t * t) / 2;
  return {
    prompt: `初速度 ${v0} m/s、加速度 ${f(a)} m/s² で一直線上を等加速度直線運動する物体がある。動き始めてから ${t} s の間の変位は何 m ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(x)], unit: "m", calc: `${v0}*${t}+(1/2)*${a}*${t}^2` },
    point: "x＝v₀t＋½at²＝v–t グラフの台形の面積",
    steps: [
      { title: "面積で考える", body: `v–t グラフは台形。下の長方形 v₀t＝${v0 * t}、上の三角形 ½×${t}×(${f(a)}×${t})＝${f((a * t * t) / 2)}。`, back: [S4] },
      { title: "足す", body: `x＝${v0 * t}＋${f((a * t * t) / 2)}＝{{${f(x)}}} m。`, trap: "½ を忘れて at² とすると、三角形ではなく長方形の面積になる。" },
    ],
  };
}

function tomaru(r: Rng): QuestionBody {
  const kind = r.pick(["stop", "fall", "up"] as const);
  if (kind === "stop") {
    const v0 = r.pick([10, 15, 20, 25, 30]);
    const a = r.pick([2, 2.5, 4, 5]);
    const x = (v0 * v0) / (2 * a);
    const who = r.pick(["自動車", "バイク", "電車"]);
    return {
      prompt: `速さ ${v0} m/s で進んでいた${who}がブレーキをかけ、大きさ ${f(a)} m/s² の一定の加速度で減速して止まった。ブレーキをかけてから止まるまでに進んだ距離は何 m ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(x)], unit: "m", calc: `${v0}^2/(2*${a})` },
      point: "止まる＝v＝0。v²−v₀²＝2ax で時間を使わずに解く",
      steps: [
        { title: "時間を消した式", body: `進む向きを正とすると加速度は −${f(a)}。止まるので v＝0。{{0²−${v0}²＝2×(−${f(a)})×x}}。`, back: [S5] },
        { title: "x を求める", body: `x＝${v0 * v0}÷${f(2 * a)}＝{{${f(x)}}} m。速さが2倍なら距離は4倍になる。`, trap: "減速の加速度は負。符号をそろえないと距離が負になる。" },
      ],
    };
  }
  if (kind === "fall") {
    const t = r.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
    const y = 4.9 * t * t;
    return {
      prompt: `高い所から小球を静かに放した。放してから ${f(t)} s の間に小球が落ちる距離は何 m ですか。重力加速度の大きさを 9.8 m/s² とし、空気の抵抗は考えない。`,
      answer: { kind: "num", answerKind: "num", answer: [f(y)], unit: "m", calc: `(1/2)*9.8*${t}^2` },
      point: "自由落下は v₀＝0、a＝g の等加速度運動",
      steps: [{ title: "y＝½gt²", body: `y＝½×9.8×${f(t)}²＝{{${f(y)}}} m。`, back: [S5], trap: "½ を忘れると2倍の値になる。" }],
    };
  }
  const v0 = r.pick([4.9, 9.8, 14.7, 19.6, 24.5]);
  const h = (v0 * v0) / 19.6;
  return {
    prompt: `小球を初速度 ${f(v0)} m/s で真上に投げ上げた。投げた点から最高点までの高さは何 m ですか。重力加速度の大きさを 9.8 m/s² とし、空気の抵抗は考えない。`,
    answer: { kind: "num", answerKind: "num", answer: [f(h)], unit: "m", calc: `${v0}^2/(2*9.8)` },
    point: "最高点では v＝0。加速度は −g のまま",
    steps: [
      { title: "最高点の条件", body: `上向きを正とすると a＝−9.8。最高点で {{v＝0}} なので、0²−${f(v0)}²＝2×(−9.8)×h。`, back: [S5] },
      { title: "h を求める", body: `h＝${f(v0 * v0)}÷19.6＝{{${f(h)}}} m。`, trap: "最高点で加速度まで 0 にしない。重力はずっとはたらいている。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("henni-michinori", 1),
    prompt: "東を正の向きとする。物体が点 O から東へ 4 m 進み、そのあと西へ 10 m 進んで止まった。O から見た変位として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["−6 m（西へ 6 m）", "14 m", "6 m（東へ 6 m）", "−14 m"],
      correct: 0,
      why: ["正しい。4−10＝−6 で、出発点から西へ 6 m の位置にいる。", "14 m は動いた長さの合計で、道のり。", "向きが逆。最後は O より西にいる。", "変位は合計の長さではなく、出発点から終点への位置の変化。"],
    },
    point: "変位は終点−始点。道のりとは区別する",
    steps: [{ title: "位置の変化を見る", body: "終点の位置は 4−10＝−6 m。変位は{{終点−始点＝−6 m}}、道のりは 4＋10＝14 m。", back: [S1] }],
  },
  {
    ...base("vt-katamuki", 1),
    prompt: "v–t グラフ（横軸が時間、縦軸が速度）について、正しい組み合わせはどれですか。",
    answer: {
      kind: "choice",
      options: ["傾き：加速度　面積：変位", "傾き：変位　面積：加速度", "傾き：速度　面積：道のりの平均", "傾き：加速度　面積：速さの平均"],
      correct: 0,
      why: ["正しい。傾きは速度の変化÷時間、面積は速度×時間。", "逆になっている。", "v–t グラフの傾きは速度の変化の割合。", "面積の単位は (m/s)×s＝m なので変位。"],
    },
    point: "v–t グラフ：傾き＝加速度、面積＝変位",
    steps: [{ title: "単位で確かめる", body: "傾きは (m/s)÷s＝{{m/s²}}（加速度）、面積は (m/s)×s＝{{m}}（変位）。", back: [S3, S4] }],
  },
  {
    ...base("sotai", 2),
    prompt: "まっすぐな道路で、自動車 A が東向きに 15 m/s、自動車 B が西向きに 10 m/s で走っている。A から見た B の速度として正しいものはどれですか。東向きを正とする。",
    answer: {
      kind: "choice",
      options: ["西向きに 25 m/s", "西向きに 5 m/s", "東向きに 25 m/s", "東向きに 5 m/s"],
      correct: 0,
      why: ["正しい。v_AB＝v_B−v_A＝−10−15＝−25 m/s。", "速さを引き算しただけで、向きを考えていない。", "大きさは合っているが、B は A から見て西へ遠ざかる。", "向きも大きさもちがう。"],
    },
    point: "相対速度は v_AB＝v_B−v_A（向きは符号で）",
    steps: [{ title: "符号つきで引く", body: "東を正とすると v_A＝＋15、v_B＝−10。{{v_AB＝v_B−v_A＝−25 m/s}}、つまり西向きに 25 m/s。", back: [S2], trap: "「見る側」を引く。v_A−v_B にすると向きが逆になる。" }],
  },
  {
    ...base("xt-sessen", 2),
    prompt: "x–t グラフ（横軸が時間、縦軸が位置）で、ある時刻の点に引いた接線の傾きが表すものはどれですか。",
    answer: {
      kind: "choice",
      options: ["その時刻の瞬間の速度", "その時刻までの平均の速度", "その時刻の加速度", "その時刻までの道のり"],
      correct: 0,
      why: ["正しい。区間を短くしていった極限が接線の傾き。", "平均の速度は、2点を結んだ直線の傾き。", "加速度は v–t グラフの傾き。", "x–t グラフの傾きは位置の変化の割合で、道のりではない。"],
    },
    point: "x–t グラフ：2点を結ぶ傾き＝平均、接線＝瞬間",
    steps: [{ title: "区間を縮める", body: "2点を結ぶ直線の傾きが平均の速度。区間を短くしていくと{{接線の傾き＝瞬間の速度}}になる。", back: [S1] }],
  },
  {
    ...base("saikoten", 3, "思考・判断・表現"),
    prompt: "小球を真上に投げ上げた。最高点に達した瞬間の小球について、正しいものはどれですか。空気の抵抗は考えない。",
    answer: {
      kind: "choice",
      options: ["速度は 0 で、加速度は下向きに 9.8 m/s²", "速度も加速度も 0", "速度は 0 で、加速度は上向きに 9.8 m/s²", "速度は下向きに 9.8 m/s で、加速度は 0"],
      correct: 0,
      why: ["正しい。重力は最高点でもはたらき続ける。", "加速度まで 0 なら、小球は最高点で止まったままになってしまう。", "重力は下向きなので、加速度も下向き。", "最高点では、上向きから下向きへ変わる途中で速度が 0 になる。"],
    },
    point: "最高点：v＝0 でも a＝g（下向き）",
    steps: [{ title: "力は消えない", body: "最高点で速度は {{0}} になるが、重力はずっとはたらくので加速度は{{下向きに g}}のまま。だから次の瞬間から落ち始める。", back: [S5] }],
  },
  {
    ...base("rakka-hi", 3, "思考・判断・表現"),
    prompt: "物体を静かに放して自由落下させた。放してから「3秒目の1秒間（2 s〜3 s）」に落ちる距離は、「最初の1秒間（0 s〜1 s）」に落ちる距離の何倍ですか。",
    answer: {
      kind: "choice",
      options: ["5倍", "3倍", "9倍", "2倍"],
      correct: 0,
      why: ["正しい。1秒ごとの落下距離は 1:3:5:7… とふえる。", "3倍は2秒目の1秒間（1 s〜2 s）。", "9倍は 0 s〜3 s 全体の落下距離（½g×3²）。", "速さが一定なら同じ距離だが、自由落下は加速している。"],
    },
    point: "自由落下の1秒ごとの距離は 1:3:5:7",
    steps: [{ title: "v–t グラフの三角形を区切る", body: "y＝½gt² より、0〜1 s、0〜2 s、0〜3 s の距離は 1:4:9。差をとると各1秒間は {{1:3:5}}。", back: [S5], trap: "9倍は「3秒間全体」。区間を取りちがえない。" }],
  },
];

export const H_SCI_PHYB_UNDO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理基礎",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "等加速度直線運動の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sokudo", type: "A", difficulty: 1, points: 16, seconds: 75, skill: "知識・技能", generate: sokudo },
        { id: "henni", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: henni },
        { id: "tomaru", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: tomaru },
      ],
    },
    { title: "グラフと運動のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
