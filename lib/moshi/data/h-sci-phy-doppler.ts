// 物理「音のドップラー効果」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: f'＝f(V−u)/(V−v) (音源から観測者への向きを正、u は観測者・v は音源の速度)、
//   音源の前方の波長 λ＝(V−v)/f、すれちがう前後の振動数の比 f₁/f₂＝(V＋v)/(V−v) から v を出す式を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。音速 V＝340 m/s。先に答えを決めて、振動数が整数になる組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-doppler";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "音源が動く：波が前につまる");
const S2 = L(2, "観測者が動く：波長は変わらず、出会う回数が変わる");
const S3 = L(3, "2つをまとめた式");
const S4 = L(4, "近づけば高く、遠ざかれば低く");
const S5 = L(5, "斜めに動く音源と、すれちがう瞬間");
const S6 = L(6, "反射音とうなり、ドップラー効果の利用");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const V = 340;
const AIR = "音の速さを 340 m/s とし、風はないものとする。";

function ongen(r: Rng): QuestionBody {
  const vs = r.pick([10, 20, 30, 40]);
  const near = r.bool();
  const den = near ? V - vs : V + vs;
  const g = gcd(den, V);
  const k = Math.ceil(400 / (den / g)) + r.int(0, 4);
  const f0 = (den / g) * k;
  const f1 = (V / g) * k;
  const car = r.pick(["救急車", "パトカー", "電車"]);
  return {
    prompt: `振動数 ${f0} Hz の音を出す${car}が、静止した観測者${near ? "に向かってまっすぐ近づいて" : "からまっすぐ遠ざかって"}いる。${car}の速さは ${vs} m/s である。観測者が聞く音の振動数は何 Hz ですか。${AIR}`,
    answer: { kind: "num", answerKind: "num", answer: [String(f1)], unit: "Hz", calc: `${V}*${f0}/(${V}${near ? "-" : "+"}${vs})` },
    point: near ? "近づく音源：波長が縮んで f'＝Vf/(V−v)" : "遠ざかる音源：波長がのびて f'＝Vf/(V＋v)",
    steps: [
      { title: "波長を考える", body: `1 s 間に出た ${f0} 個の波が、${near ? `${V}−${vs}` : `${V}＋${vs}`}＝{{${den} m}} に並ぶ。λ＝${den}/${f0} m。`, back: [S1] },
      { title: "振動数", body: `f'＝V/λ＝${V}×${f0}÷${den}＝{{${f1}}} Hz。`, back: [S4], trap: near ? "近づくのに低くなる答えなら、符号が逆。" : "遠ざかるのに高くなる答えなら、符号が逆。" },
    ],
  };
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function kansokusha(r: Rng): QuestionBody {
  const [vo, ratio] = r.pick([
    [17, 1.05],
    [34, 1.1],
    [68, 1.2],
    [85, 1.25],
  ] as const);
  const near = r.bool();
  const f0 = r.pick([400, 500, 600, 800, 1000]);
  const f1 = near ? f0 * ratio : f0 * (2 - ratio);
  return {
    prompt: `静止した音源が振動数 ${f0} Hz の音を出している。観測者が速さ ${vo} m/s で音源${near ? "に向かってまっすぐ近づく" : "からまっすぐ遠ざかる"}とき、観測者が聞く音の振動数は何 Hz ですか。${AIR}`,
    answer: { kind: "num", answerKind: "num", answer: [f(f1)], unit: "Hz", calc: `(${V}${near ? "+" : "-"}${vo})*${f0}/${V}` },
    point: "観測者が動く：波長は同じ、出会う波の数が変わる",
    steps: [
      { title: "波長は変わらない", body: `音源は静止しているので λ＝${V}/${f0} m のまま。`, back: [S2] },
      { title: "1 s に出会う波", body: `観測者に対する音の速さは ${V}${near ? "＋" : "−"}${vo}＝${near ? V + vo : V - vo} m/s。f'＝${near ? V + vo : V - vo}÷λ＝{{${f(f1)}}} Hz。`, back: [S2, S4] },
    ],
  };
}

function ryouhou(r: Rng): QuestionBody {
  const vs = r.pick([20, 30, 40]);
  const vo = r.pick([10, 17, 20, 34]);
  const k = r.pick([1, 2, 3]);
  const f0 = (V - vs) * k;
  const f1 = (V + vo) * k;
  const who = r.pick([
    ["自動車", "自転車の人"],
    ["電車", "歩く人"],
    ["救急車", "自動車"],
  ] as const);
  return {
    prompt: `振動数 ${f0} Hz の音を出す${who[0]}が速さ ${vs} m/s で、${who[1]}が速さ ${vo} m/s で、一直線上をたがいに向かって近づいている。${who[1]}が聞く音の振動数は何 Hz ですか。${AIR}`,
    answer: { kind: "num", answerKind: "num", answer: [String(f1)], unit: "Hz", calc: `${f0}*(${V}+${vo})/(${V}-${vs})` },
    point: "f'＝f(V＋u)/(V−v)：分子が観測者、分母が音源",
    steps: [
      { title: "まとめた式", body: `音源から観測者への向きを正とすると、音源の速度 ＋${vs}、観測者の速度 −${vo}。{{f'＝f(V−(−${vo}))/(V−${vs})}}。`, back: [S3] },
      { title: "計算", body: `f'＝${f0}×${V + vo}÷${V - vs}＝{{${f1}}} Hz。`, trap: "分子と分母を取りちがえると、ちがう値になる。" },
    ],
  };
}

// すれちがう前後の振動数の比 (V＋v):(V−v) を約分した組 [v, 前, 後]
const PASS = [
  [20, 9, 8],
  [10, 35, 33],
  [34, 11, 9],
  [17, 21, 19],
] as const;

function surechigai(r: Rng): QuestionBody {
  if (r.bool()) {
    const [v, a, b] = r.pick(PASS);
    const k = Math.ceil(400 / a) + r.int(0, 10);
    const f1 = a * k;
    const f2 = b * k;
    return {
      prompt: `一定の速さで一直線に走る救急車が、道路わきに立つ人の前を通りすぎた。近づいてくるときには ${f1} Hz、遠ざかるときには ${f2} Hz の音が聞こえた。救急車の速さは何 m/s ですか。${AIR}救急車は人のすぐ近くを通るものとする。`,
      answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "m/s", calc: `${V}*(${f1}-${f2})/(${f1}+${f2})` },
      point: "前後の振動数の比 f₁/f₂＝(V＋v)/(V−v)",
      steps: [
        { title: "2つの式", body: `f₁＝Vf/(V−v)、f₂＝Vf/(V＋v)。割ると {{f₁/f₂＝(V＋v)/(V−v)}}。`, back: [S4, S5] },
        { title: "v を求める", body: `${f1}(${V}−v)＝${f2}(${V}＋v) より v＝${V}×${f1 - f2}÷${f1 + f2}＝{{${v}}} m/s。`, trap: "音源のもとの振動数がわからなくても、比をとれば消える。" },
      ],
    };
  }
  const vs = r.pick([20, 40, 60]);
  const f0 = r.pick([400, 500, 1000]);
  const ahead = r.bool();
  const lam = (ahead ? V - vs : V + vs) / f0;
  return {
    prompt: `振動数 ${f0} Hz の音を出す音源が、速さ ${vs} m/s で一直線上を進んでいる。音源の${ahead ? "前方" : "後方"}に伝わる音の波長は何 m ですか。${AIR}`,
    answer: { kind: "num", answerKind: "num", answer: [f(lam)], unit: "m", calc: `(${V}${ahead ? "-" : "+"}${vs})/${f0}` },
    point: ahead ? "前方：λ＝(V−v)/f (波がつまる)" : "後方：λ＝(V＋v)/f (波がのびる)",
    steps: [
      { title: "1 s 間の波", body: `1 s 間に出た ${f0} 個の波は、音源の${ahead ? "前" : "後ろ"}で ${ahead ? `${V}−${vs}` : `${V}＋${vs}`}＝${ahead ? V - vs : V + vs} m に並ぶ。`, back: [S1] },
      { title: "1個分の長さ", body: `λ＝${ahead ? V - vs : V + vs}÷${f0}＝{{${f(lam)}}} m。`, trap: "静止した音源の波長 V/f のままにしない。" },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("hacho-kansoku", 1),
    prompt: "静止した音源に観測者が近づくとき、高い音が聞こえる理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["波長は変わらないが、観測者が1秒間に出会う波の数がふえるから", "音源の前で波長が短くなるから", "音源が出す振動数が高くなるから", "観測者が動くと音の速さが空気に対して速くなるから"],
      correct: 0,
      why: ["正しい。観測者から見た音の速さが V＋u になる。", "音源は静止しているので、波長は変わらない。", "音源の振動数そのものは変わらない。", "空気に対する音の速さは V のまま。速くなるのは観測者から見た速さ。"],
    },
    point: "観測者が動く：波長はそのまま、出会う回数が変わる",
    steps: [{ title: "出会う回数", body: "観測者が近づくと、1 s に {{(V＋u)/λ 個}}の波と出会う。", back: [S2] }],
  },
  {
    ...base("hacho-ongen", 1),
    prompt: "音源が静止した観測者に近づくとき、観測者に届く音について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["音の速さは変わらず、波長が短くなる", "音の速さが速くなり、波長は変わらない", "音の速さも波長も変わらない", "音の速さが遅くなり、波長が長くなる"],
      correct: 0,
      why: ["正しい。音源が波を追いかけながら出すので、前方で波がつまる。", "空気中の音の速さは音源の速さによらない。", "波長が変わるので振動数も変わる。", "前方では波長は短くなる。"],
    },
    point: "音源が動く：音速は同じ、前方の波長が縮む",
    steps: [{ title: "波がつまる", body: "音の速さは空気で決まる。音源が動くと {{前方の波長が (V−v)/f に縮む}}。", back: [S1] }],
  },
  {
    ...base("surechigau", 2, "思考・判断・表現"),
    prompt: "一定の速さで道路をまっすぐ走る救急車が、道路から少しはなれて立つ人の前を通りすぎる。救急車が人にいちばん近い点を通る瞬間に出た音の振動数について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["救急車が出した振動数と同じ振動数で聞こえる", "いちばん高い振動数で聞こえる", "いちばん低い振動数で聞こえる", "その瞬間の音は聞こえない"],
      correct: 0,
      why: ["正しい。その瞬間、音源の速度は人への向きに垂直で、近づく成分が 0。", "いちばん高く聞こえるのは、遠くから近づいてくるとき。", "いちばん低く聞こえるのは、遠ざかって遠くにいるとき。", "音は聞こえる。振動数がもとと同じになるだけ。"],
    },
    point: "効くのは観測者へ向かう速度の成分だけ",
    steps: [{ title: "速度の成分", body: "ドップラー効果に効くのは、音源と観測者を結ぶ向きの{{速度の成分}}。最も近い点では 0。", back: [S5] }],
  },
  {
    ...base("riyou", 2, "思考・判断・表現"),
    prompt: "スピードガン（野球の球速の測定器）は、ボールに当てて反射してきた電波の振動数のずれから速さを測る。近づいてくるボールで反射した電波について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["ボールが「動く観測者」として受け、「動く音源」として送り返すので、振動数は2段階で高くなる", "反射では振動数は変わらない", "ボールが近づくので振動数は低くなる", "電波は波ではないので、ドップラー効果は起こらない"],
      correct: 0,
      why: ["正しい。受けるときと返すときの両方で振動数が上がる。", "動く反射体では振動数が変わる。", "近づくときは振動数が高くなる。", "電波も波で、ドップラー効果が起こる。"],
    },
    point: "動く反射体：受ける観測者＋返す音源 の2段階",
    steps: [{ title: "2段階で考える", body: "反射体は{{動く観測者}}として受け、同じ振動数で{{動く音源}}として返す。", back: [S6] }],
  },
];

export const H_SCI_PHY_DOPPLER_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "draft" },
  sections: [
    {
      title: "ドップラー効果の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kansokusha", type: "A", difficulty: 1, points: 16, seconds: 70, skill: "知識・技能", generate: kansokusha },
        { id: "ongen", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: ongen },
        { id: "ryouhou", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "思考・判断・表現", generate: ryouhou },
        { id: "surechigai", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: surechigai },
      ],
    },
    { title: "ドップラー効果のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
