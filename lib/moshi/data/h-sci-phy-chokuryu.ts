// 物理「直流回路」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: 合成抵抗 (直列 R₁＋R₂、並列 R₁R₂/(R₁＋R₂))、電池の内部抵抗 I＝E/(R＋r)・V＝E−rI、
//   キルヒホッフの法則 (2つの電池の回路を節点の電位で解く)、ホイートストンブリッジ R_x＝R₂R₃/R₁、
//   分流器 r/(n−1)・倍率器 (n−1)r、消費電力が最大になる R＝r と P＝E²/(4r) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。割り切れない組は引き直す。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-chokuryu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "合成抵抗は「長くなる」「太くなる」で考える");
const S2 = L(2, "電流計と電圧計：分流器と倍率器");
const S3 = L(3, "電池の中の抵抗と端子電圧 V＝E−rI");
const S4 = L(4, "キルヒホッフの法則：分かれ道と1周");
const S5 = L(5, "ホイートストンブリッジで抵抗を測る");
const S6 = L(6, "消費電力と、電力が最大になる抵抗");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const nice = (x: number) => Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6;

function gousei(r: Rng): QuestionBody {
  for (;;) {
    const R1 = r.pick([2, 3, 4, 5, 6, 10]);
    const R2 = r.pick([2, 3, 4, 6, 12, 20]);
    const R3 = r.pick([1, 2, 3, 4, 5, 8]);
    const par = (R2 * R3) / (R2 + R3);
    const tot = R1 + par;
    if (!nice(par)) continue;
    if (r.bool())
      return {
        prompt: `${R2} Ω と ${R3} Ω の抵抗を並列につないだ。合成抵抗は何 Ω ですか。`,
        answer: { kind: "num", answerKind: "num", answer: [f(par)], unit: "Ω", calc: `${R2}*${R3}/(${R2}+${R3})` },
        point: "並列：1/R＝1/R₁＋1/R₂ (太くなる)",
        steps: [{ title: "逆数のたし算", body: `1/R＝1/${R2}＋1/${R3} より R＝${R2 * R3}÷${R2 + R3}＝{{${f(par)}}} Ω。どちらの抵抗よりも小さい。`, back: [S1] }],
      };
    return {
      prompt: `${R2} Ω と ${R3} Ω の抵抗を並列につないだものに、${R1} Ω の抵抗を直列につないだ。全体の合成抵抗は何 Ω ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(tot)], unit: "Ω", calc: `${R1}+${R2}*${R3}/(${R2}+${R3})` },
      point: "並列部分を1つにまとめてから直列で足す",
      steps: [
        { title: "並列部分", body: `${R2}×${R3}÷(${R2}＋${R3})＝{{${f(par)} Ω}}。`, back: [S1] },
        { title: "直列", body: `${R1}＋${f(par)}＝{{${f(tot)}}} Ω。` },
      ],
    };
  }
}

function naibu(r: Rng): QuestionBody {
  const rr = r.pick([0.5, 1, 2]);
  const R = r.pick([2.5, 4, 5, 9.5, 10, 11.5]);
  const I = r.pick([0.2, 0.4, 0.5, 1, 1.5, 2]);
  const E = I * (R + rr);
  const askV = r.bool();
  if (askV)
    return {
      prompt: `起電力 ${f(E)} V、内部抵抗 ${f(rr)} Ω の電池に、${f(R)} Ω の抵抗をつないだ。電池の端子電圧は何 V ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(I * R)], unit: "V", calc: `${f(E)}-${rr}*${f(E)}/(${R}+${rr})` },
      point: "V＝E−rI：電流が流れると端子電圧は下がる",
      steps: [
        { title: "電流", body: `I＝E/(R＋r)＝${f(E)}÷${f(R + rr)}＝{{${f(I)} A}}。`, back: [S3] },
        { title: "端子電圧", body: `V＝E−rI＝${f(E)}−${f(rr)}×${f(I)}＝{{${f(I * R)}}} V (＝RI)。`, trap: "起電力 E をそのまま端子電圧にしない。" },
      ],
    };
  return {
    prompt: `起電力 ${f(E)} V、内部抵抗 ${f(rr)} Ω の電池に、${f(R)} Ω の抵抗をつないだ。回路に流れる電流は何 A ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(I)], unit: "A", calc: `${f(E)}/(${R}+${rr})` },
    point: "I＝E/(R＋r)：内部抵抗も直列に入る",
    steps: [{ title: "全体の抵抗", body: `外の抵抗と内部抵抗は直列。I＝${f(E)}÷(${f(R)}＋${f(rr)})＝{{${f(I)}}} A。`, back: [S3] }],
  };
}

function kirchhoff(r: Rng): QuestionBody {
  for (;;) {
    const E1 = r.pick([2, 4, 6, 8, 10, 12]);
    const E2 = r.pick([2, 3, 4, 6, 8, 9, 12]);
    const R1 = r.pick([1, 2, 3, 4, 5, 6, 10]);
    const R2 = r.pick([1, 2, 3, 4, 5, 6, 10]);
    const R3 = r.pick([1, 2, 3, 4, 5, 6, 10]);
    const V = (E1 / R1 + E2 / R2) / (1 / R1 + 1 / R2 + 1 / R3);
    const I3 = V / R3;
    const I1 = (E1 - V) / R1;
    const I2 = (E2 - V) / R2;
    if (E1 === E2 || I1 <= 0 || I2 <= 0 || !nice(I1) || !nice(I2) || !nice(I3) || !nice(V)) continue;
    const ask = r.pick(["I3", "I1"] as const);
    const ans = ask === "I3" ? I3 : I1;
    return {
      prompt: `2点 P・Q の間に、次の3本の道を並列につないだ。\n道1：起電力 ${E1} V の電池と ${R1} Ω の抵抗 R₁\n道2：起電力 ${E2} V の電池と ${R2} Ω の抵抗 R₂\n道3：${R3} Ω の抵抗 R₃ だけ\nどちらの電池も正極を P 側に向けてあり、内部抵抗は無視できる。${ask === "I3" ? "R₃" : "R₁"} を流れる電流の大きさは何 A ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: "A", calc: ask === "I3" ? `(${E1}/${R1}+${E2}/${R2})/(1/${R1}+1/${R2}+1/${R3})/${R3}` : `(${E1}-(${E1}/${R1}+${E2}/${R2})/(1/${R1}+1/${R2}+1/${R3}))/${R1}` },
      point: "節点の法則＋1周の法則。未知数は P の電位 1 つで足りる",
      steps: [
        { title: "電位を置く", body: `Q の電位を 0、P の電位を V とする。I₁＝(${E1}−V)/${R1}、I₂＝(${E2}−V)/${R2}、I₃＝V/${R3}。`, back: [S4] },
        { title: "分かれ道の法則", body: `P に入る電流＝出る電流 {{I₁＋I₂＝I₃}} から V＝${f(V)} V。`, back: [S4] },
        { title: "答え", body: `I₁＝${f(I1)} A、I₂＝${f(I2)} A、I₃＝${f(I3)} A。答えは {{${f(ans)}}} A。`, trap: "1周の法則では、電池の向きと電流の向きで符号を決める。" },
      ],
    };
  }
}

function hatten(r: Rng): QuestionBody {
  const kind = r.pick(["bridge", "max", "bunryu", "bairitsu"] as const);
  if (kind === "bridge") {
    for (;;) {
      const R1 = r.pick([10, 20, 30, 40, 50]);
      const R2 = r.pick([10, 15, 20, 30, 60]);
      const R3 = r.pick([12, 20, 24, 30, 40]);
      const Rx = (R2 * R3) / R1;
      if (!nice(Rx)) continue;
      return {
        prompt: `ホイートストンブリッジで、辺 AB に R₁＝${R1} Ω、辺 BC に R₂＝${R2} Ω、辺 AD に R₃＝${R3} Ω、辺 DC に未知の抵抗 R_x をつなぎ、AC 間に電池、BD 間に検流計をつないだ。検流計に電流が流れなかったとき、R_x は何 Ω ですか。`,
        answer: { kind: "num", answerKind: "num", answer: [f(Rx)], unit: "Ω", calc: `${R2}*${R3}/${R1}` },
        point: "つり合い：R₁R_x＝R₂R₃ (たすきがけ)",
        steps: [
          { title: "B と D が同じ電位", body: "検流計に電流が流れない → B と D の電位が等しい。AB と AD の電圧降下が等しく、BC と DC も等しい。", back: [S5] },
          { title: "比で解く", body: `R₁:R₂＝R₃:R_x より R_x＝${R2}×${R3}÷${R1}＝{{${f(Rx)}}} Ω。` },
        ],
      };
    }
  }
  if (kind === "max") {
    const E = r.pick([2, 4, 6, 8, 12]);
    const rr = r.pick([0.5, 1, 2, 4]);
    const Pm = (E * E) / (4 * rr);
    return {
      prompt: `起電力 ${E} V、内部抵抗 ${f(rr)} Ω の電池に可変抵抗 R をつなぐ。R での消費電力が最大になるように R を調節したとき、その最大の電力は何 W ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(Pm)], unit: "W", calc: `${E}^2/(4*${rr})` },
      point: "R＝r のとき最大、P＝E²/(4r)",
      steps: [
        { title: "最大になる条件", body: `P＝RE²/(R＋r)² は {{R＝r＝${f(rr)} Ω}} のとき最大。`, back: [S6] },
        { title: "最大値", body: `I＝${E}÷${f(2 * rr)}＝${f(E / (2 * rr))} A、P＝RI²＝{{${f(Pm)}}} W。`, trap: "R を 0 にすると電流は最大だが、R での電力は 0。" },
      ],
    };
  }
  const rA = r.pick([0.9, 1.8, 2.7, 9, 18, 45]);
  const n = r.pick([4, 10]);
  if (kind === "bunryu") {
    const Rs = rA / (n - 1);
    return {
      prompt: `内部抵抗 ${f(rA)} Ω、最大目もり 10 mA の電流計がある。この電流計で ${n * 10} mA までの電流を測れるようにするには、何 Ω の抵抗 (分流器) を電流計に並列につなげばよいですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(Rs)], unit: "Ω", calc: `${rA}/(${n}-1)` },
      point: "分流器：n 倍にするには r/(n−1) を並列に",
      steps: [{ title: "流れを分ける", body: `電流計に 10 mA、分流器に ${(n - 1) * 10} mA 流す。電圧が等しいので ${f(rA)}×10＝R×${(n - 1) * 10}、R＝{{${f(Rs)}}} Ω。`, back: [S2] }],
    };
  }
  const Rm = rA * (n - 1);
  return {
    prompt: `内部抵抗 ${f(rA)} Ω の電圧計がある。測れる電圧の最大値を ${n} 倍にするには、何 Ω の抵抗 (倍率器) を電圧計に直列につなげばよいですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(Rm)], unit: "Ω", calc: `${rA}*(${n}-1)` },
    point: "倍率器：n 倍にするには (n−1)r を直列に",
    steps: [{ title: "電圧を分ける", body: `電圧計にかかる電圧を全体の 1/${n} にするには、残り ${n - 1}/${n} を受けもつ抵抗 ${n - 1}×${f(rA)}＝{{${f(Rm)}}} Ω を直列に。`, back: [S2] }],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("keiki", 1),
    prompt: "電流計と電圧計のつなぎ方と、内部抵抗についての説明で正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["電流計は直列につなぎ内部抵抗は小さい。電圧計は並列につなぎ内部抵抗は大きい", "電流計は並列につなぎ内部抵抗は大きい。電圧計は直列につなぎ内部抵抗は小さい", "どちらも直列につなぎ、内部抵抗は小さい", "どちらも並列につなぎ、内部抵抗は大きい"],
      correct: 0,
      why: ["正しい。回路の電流・電圧をなるべく変えないため。", "逆になっている。", "電圧計を直列にすると、大きな抵抗で回路の電流がほとんど流れなくなる。", "電流計を並列にすると、大きな電流が流れて壊れるおそれがある。"],
    },
    point: "電流計：直列・小さい r、電圧計：並列・大きい r",
    steps: [{ title: "回路を乱さない", body: "電流計は回路に入っても電圧をほとんど使わないよう {{r は小さく}}、電圧計は電流をほとんど取らないよう {{r は大きく}}。", back: [S2] }],
  },
  {
    ...base("tanshi", 1, "思考・判断・表現"),
    prompt: "電池につなぐ外部の抵抗を小さくしていくと、電池の端子電圧はどうなりますか。電池には内部抵抗がある。",
    answer: {
      kind: "choice",
      options: ["電流がふえ、内部抵抗での電圧降下が大きくなるので、端子電圧は下がる", "つねに起電力と等しいので変わらない", "電流がふえるので、端子電圧も上がる", "外部の抵抗に関係なく 0 になる"],
      correct: 0,
      why: ["正しい。V＝E−rI で、I が大きいほど V は小さい。", "内部抵抗があるので、電流が流れると E より下がる。", "端子電圧は電流がふえると下がる。", "0 になるのは外部の抵抗が 0 (短絡) のとき。"],
    },
    point: "V＝E−rI：電流が大きいほど端子電圧は下がる",
    steps: [{ title: "内部抵抗での降下", body: "電流 I が流れると電池の中で {{rI}} だけ電圧が下がる。", back: [S3] }],
  },
  {
    ...base("kirchhoff2", 2),
    prompt: "キルヒホッフの第2法則 (1周の法則) の内容として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["回路の1周について、起電力の和は電圧降下 (RI) の和に等しい", "節点に流れこむ電流の和は、流れ出る電流の和に等しい", "直列の抵抗には同じ電流が流れる", "電池の端子電圧はつねに起電力に等しい"],
      correct: 0,
      why: ["正しい。1周して元の点にもどると電位も元にもどる。", "これは第1法則 (節点の法則)。", "第1法則から導かれる性質。", "内部抵抗があれば等しくない。"],
    },
    point: "第1：電流の保存、第2：1周で電位が元にもどる",
    steps: [{ title: "1周で元の高さ", body: "電位の上がり (起電力) と下がり (RI) は、1周すると {{打ち消し合う}}。", back: [S4] }],
  },
  {
    ...base("heiretsu-denryoku", 2, "思考・判断・表現"),
    prompt: "同じ電圧の電源に、抵抗 R と 2R を並列につないだ。それぞれの抵抗で消費される電力の比 (R：2R) はどれですか。",
    answer: {
      kind: "choice",
      options: ["2：1", "1：2", "1：1", "4：1"],
      correct: 0,
      why: ["正しい。並列では電圧が同じなので P＝V²/R は R に反比例。", "直列 (電流が同じ) のときの比。", "抵抗がちがえば電力もちがう。", "電圧が同じなら比は抵抗の逆比 2：1。"],
    },
    point: "並列：P＝V²/R、直列：P＝RI²",
    steps: [{ title: "共通の量を選ぶ", body: "並列は電圧が共通なので {{P＝V²/R}}。R が小さいほうが大きい電力。", back: [S6] }],
  },
];

export const H_SCI_PHY_CHOKURYU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 15,
  review: { status: "draft" },
  sections: [
    {
      title: "直流回路の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "gousei", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: gousei },
        { id: "naibu", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: naibu },
        { id: "hatten", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "思考・判断・表現", generate: hatten },
        { id: "kirchhoff", type: "A", difficulty: 3, points: 18, seconds: 180, skill: "思考・判断・表現", generate: kirchhoff },
      ],
    },
    { title: "直流回路のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
