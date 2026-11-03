// 物理「波の伝わり方」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: v＝fλ・T＝1/f、弦の定常波 L＝n×λ/2・f＝v/λ、屈折 (f 一定) λ₂＝λ₁v₂/v₁、
//   2つの同位相の波源を結ぶ線分上で強め合う点の数 (|経路差|＝mλ＜d) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。答えが小数第3位までで割り切れる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-hado";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "v＝fλ：1周期で1波長進む");
const S2 = L(2, "波の式：x の点は x/v だけ遅れてゆれる");
const S3 = L(3, "重ね合わせと定常波");
const S4 = L(4, "反射：固定端と自由端");
const S5 = L(5, "屈折：振動数は変わらず、速さと波長が変わる");
const S6 = L(6, "干渉と回折");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function hayasa(r: Rng): QuestionBody {
  const fr = r.pick([2, 4, 5, 8, 10, 20, 25, 50]);
  const lam = r.pick([0.2, 0.4, 0.5, 0.8, 1.2, 1.5, 2]);
  const v = fr * lam;
  const kind = r.pick(["v", "lam", "T"] as const);
  if (kind === "v")
    return {
      prompt: `振動数 ${fr} Hz、波長 ${f(lam)} m の波が進んでいる。波の速さは何 m/s ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(v)], unit: "m/s", calc: `${fr}*${lam}` },
      point: "v＝fλ",
      steps: [{ title: "1秒で f 波長進む", body: `v＝${fr}×${f(lam)}＝{{${f(v)}}} m/s。`, back: [S1] }],
    };
  if (kind === "lam")
    return {
      prompt: `速さ ${f(v)} m/s で進む波の振動数が ${fr} Hz のとき、波長は何 m ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(lam)], unit: "m", calc: `${f(v)}/${fr}` },
      point: "λ＝v/f",
      steps: [{ title: "v＝fλ を変形", body: `λ＝${f(v)}÷${fr}＝{{${f(lam)}}} m。`, back: [S1] }],
    };
  return {
    prompt: `速さ ${f(v)} m/s、波長 ${f(lam)} m の波がある。媒質の1点が1回振動するのにかかる時間 (周期) は何 s ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(1 / fr)], unit: "s", calc: `${lam}/${f(v)}` },
    point: "T＝λ/v＝1/f",
    steps: [{ title: "1周期で1波長", body: `1波長 ${f(lam)} m 進むのにかかる時間が周期。T＝${f(lam)}÷${f(v)}＝{{${f(1 / fr)}}} s。`, back: [S1, S2] }],
  };
}

function teijo(r: Rng): QuestionBody {
  const len = r.pick([0.6, 0.9, 1.2, 1.5, 1.8, 2.4]);
  const n = r.pick([1, 2, 3, 4, 6]);
  const lam = (2 * len) / n;
  const v = r.pick([60, 120, 180, 240, 360]);
  const askF = r.bool();
  const fr = v / lam;
  if (askF && Math.abs(fr * 1000 - Math.round(fr * 1000)) < 1e-6)
    return {
      prompt: `長さ ${f(len)} m の弦の両端を固定し、弦を伝わる波の速さが ${v} m/s になるように張った。腹が ${n} 個の定常波ができるときの振動数は何 Hz ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(fr)], unit: "Hz", calc: `${v}/(2*${len}/${n})` },
      point: "腹 n 個：L＝n×λ/2、f＝v/λ",
      steps: [
        { title: "波長", body: `腹1つ分の長さは λ/2。${f(len)}＝${n}×λ/2 より {{λ＝${f(lam)} m}}。`, back: [S3] },
        { title: "振動数", body: `f＝${v}÷${f(lam)}＝{{${f(fr)}}} Hz。`, back: [S1] },
      ],
    };
  return {
    prompt: `長さ ${f(len)} m の弦の両端を固定して振動させたところ、腹が ${n} 個の定常波ができた。弦を伝わる波の波長は何 m ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(lam)], unit: "m", calc: `2*${len}/${n}` },
    point: "節と節の間隔は λ/2",
    steps: [{ title: "腹の数で区切る", body: `腹1つ分＝λ/2。${f(len)}＝${n}×λ/2 より λ＝{{${f(lam)}}} m。`, back: [S3], trap: "腹1つ分を1波長としない。" }],
  };
}

function kussetsu(r: Rng): QuestionBody {
  const v1 = r.pick([20, 30, 40, 60]);
  const k = r.pick([0.5, 0.8, 1.25, 2, 0.4, 1.6]);
  const v2 = v1 * k;
  const lam1 = r.pick([0.4, 0.8, 2, 4]);
  const lam2 = lam1 * k;
  const medium = k < 1 && r.bool() ? (["深い所", "浅い所"] as const) : (["媒質 1", "媒質 2"] as const);
  if (r.bool())
    return {
      prompt: `水面の波が${medium[0]}から${medium[1]}へ進んだ。${medium[0]}での速さは ${v1} cm/s、波長は ${f(lam1)} cm で、${medium[1]}での速さは ${f(v2)} cm/s だった。${medium[1]}での波長は何 cm ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(lam2)], unit: "cm", calc: `${lam1}*${f(v2)}/${v1}` },
      point: "屈折しても振動数は変わらない → λ∝v",
      steps: [
        { title: "振動数は同じ", body: `境界の点は入射波と同じ回数ゆれる。f＝${v1}÷${f(lam1)}＝{{${f(v1 / lam1)} Hz}}。`, back: [S5] },
        { title: "新しい波長", body: `λ₂＝${f(v2)}÷${f(v1 / lam1)}＝{{${f(lam2)}}} cm。`, trap: "振動数まで変わると考えない。" },
      ],
    };
  return {
    prompt: `波が${medium[0]}から${medium[1]}へ進むと、速さが ${v1} cm/s から ${f(v2)} cm/s に変わった。${medium[0]}に対する${medium[1]}の屈折率はいくらですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(1 / k)], calc: `${v1}/${f(v2)}` },
    point: "屈折率 n₁₂＝v₁/v₂＝λ₁/λ₂",
    steps: [{ title: "速さの比", body: `n₁₂＝sin i/sin r＝v₁/v₂＝${v1}÷${f(v2)}＝{{${f(1 / k)}}}。`, back: [S5], trap: "v₂/v₁ と逆にしない。" }],
  };
}

function kansho(r: Rng): QuestionBody {
  const m = r.int(1, 4);
  const lam = r.pick([1, 2, 4, 5]);
  const d = lam * (m + 0.5);
  const cnt = 2 * m + 1;
  return {
    prompt: `水面上の 2 点 A・B から、同じ振幅・同じ位相で波長 ${lam} cm の波を出し続ける。AB 間の距離は ${f(d)} cm である。線分 AB 上 (A・B を除く) で、波が強め合う点はいくつありますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(cnt)], unit: "個", calc: `2*${m}+1` },
    point: "強め合う：経路差＝mλ (|mλ|＜AB)",
    steps: [
      { title: "経路差の範囲", body: `AB 上の点 P では、経路差 |AP−BP| は 0 から ${f(d)} cm 未満まで変わる。`, back: [S6] },
      { title: "m を数える", body: `強め合うのは |AP−BP|＝mλ のとき。${lam}m＜${f(d)} より m＝0, ±1, …, ±${m}。合わせて {{${cnt}}} 個。`, trap: "m＝0 (垂直二等分線上の点) と負の m を数え忘れない。" },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("tatenami", 1),
    prompt: "縦波の例として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["空気中を伝わる音波", "張った弦を伝わる波", "電磁波 (光)", "ロープを上下にふって伝わる波"],
      correct: 0,
      why: ["正しい。空気が進行方向に押し引きされ、疎密が伝わる。", "弦の各点は進行方向に垂直にゆれる横波。", "光は横波。", "上下にゆれ、横に進む横波。"],
    },
    point: "縦波＝振動方向と進行方向が平行 (疎密波)",
    steps: [{ title: "振動の向き", body: "媒質のゆれが進む向きと{{平行}}なら縦波、垂直なら横波。音は空気の疎密が伝わる縦波。", back: [S1] }],
  },
  {
    ...base("koteitan", 1),
    prompt: "固定端で波が反射するとき、反射波についての説明として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["山が谷になって返る (位相が π ずれる)", "山は山のまま返る", "反射波の振動数が2倍になる", "固定端では波は反射しない"],
      correct: 0,
      why: ["正しい。固定端は動けないので、入射波を打ち消す向きの波が返る。", "これは自由端反射。", "反射で振動数は変わらない。", "固定端でも反射する。端が節になる。"],
    },
    point: "固定端：逆位相で反射、端は節",
    steps: [{ title: "端は動けない", body: "固定端では変位がつねに 0。入射波と{{上下を反転}}した反射波が重なると 0 になる。", back: [S4] }],
  },
  {
    ...base("kaisetsu", 2, "思考・判断・表現"),
    prompt: "防波堤のすき間を通った水面の波が、すき間の後ろに大きく回りこむのはどんなときですか。",
    answer: {
      kind: "choice",
      options: ["すき間の幅が波長と同じくらいか、それより狭いとき", "すき間の幅が波長よりずっと広いとき", "波の振幅が大きいとき", "波の速さが速いとき"],
      correct: 0,
      why: ["正しい。回折は、すき間が波長に比べて狭いほど目立つ。", "広いすき間では波はほぼまっすぐ進み、回りこみは小さい。", "回折のしかたは振幅で決まらない。", "速さではなく、波長とすき間の比で決まる。"],
    },
    point: "回折は「すき間≦波長」で目立つ",
    steps: [{ title: "波長とくらべる", body: "回折の大きさは {{波長÷すき間の幅}} で決まる。音が塀の後ろまで届くのは波長が長いから。", back: [S6] }],
  },
  {
    ...base("kussetsu-kawaranai", 2, "思考・判断・表現"),
    prompt: "波が媒質 1 から媒質 2 へ進み、速さが小さくなった。このとき変化しないものはどれですか。",
    answer: {
      kind: "choice",
      options: ["振動数", "波長", "進む向き (斜めに入射したとき)", "速さと波長の両方"],
      correct: 0,
      why: ["正しい。境界の点は入射波と同じ回数ゆれ、次の媒質をその回数でゆらす。", "λ＝v/f なので、速さが小さくなると波長も短くなる。", "斜めに入ると、速さが変わることで向きが曲がる (屈折)。", "どちらも変わる。"],
    },
    point: "屈折で変わらないのは振動数",
    steps: [{ title: "振動数は境界で受けつがれる", body: "{{振動数 f は一定}}。v が小さくなれば λ＝v/f も小さくなる。", back: [S5] }],
  },
];

export const H_SCI_PHY_HADO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 13,
  review: { status: "draft" },
  sections: [
    {
      title: "波の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hayasa", type: "A", difficulty: 1, points: 16, seconds: 50, skill: "知識・技能", generate: hayasa },
        { id: "teijo", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: teijo },
        { id: "kussetsu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: kussetsu },
        { id: "kansho", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: kansho },
      ],
    },
    { title: "波のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
