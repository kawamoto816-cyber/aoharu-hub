// 物理「原子と原子核」の単元模試 (A: 数値を入れかえる計算4問 ＋ B: しくみのプール4問から2問)。問題はすべてオリジナル。
// 検算: 水素原子のエネルギー準位 E_n＝−13.6/n² eV と放出される光子のエネルギー、α崩壊・β崩壊の回数 (質量数と原子番号の保存)、
//   半減期 N＝N₀(1/2)^(t/T)、質量欠損 Δm と結合エネルギー (1 u＝931.5 MeV) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。準位は割り切れる n の組 (1, 2, 4, 5) だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-phy-genshi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ボーアの原子模型と線スペクトル");
const S2 = L(2, "放射性崩壊で原子核が変わる");
const S3 = L(3, "半減期：半分になるまでの時間");
const S4 = L(4, "質量欠損と結合エネルギー E＝mc²");
const S5 = L(5, "核分裂・核融合と素粒子");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

const JUMPS = [
  [2, 1],
  [4, 1],
  [4, 2],
  [5, 1],
  [5, 2],
  [5, 4],
] as const;

function junni(r: Rng): QuestionBody {
  if (r.bool()) {
    const [n, m] = r.pick(JUMPS);
    const E = 13.6 * (1 / (m * m) - 1 / (n * n));
    return {
      prompt: `水素原子のエネルギー準位は E_n＝−13.6/n² eV (n＝1, 2, 3, …) で表される。電子が n＝${n} の状態から n＝${m} の状態に移るときに放出される光子のエネルギーは何 eV ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "eV", calc: `13.6/${m}^2-13.6/${n * n}` },
      point: "放出される光子のエネルギー＝準位の差",
      steps: [
        { title: "それぞれの準位", body: `E_${n}＝−13.6/${n * n}＝${f(-13.6 / (n * n))} eV、E_${m}＝−13.6/${m * m}＝${f(-13.6 / (m * m))} eV。`, back: [S1] },
        { title: "差をとる", body: `hν＝E_${n}−E_${m}＝{{${f(E)}}} eV。とびとびの値なので、線スペクトルになる。`, trap: "符号に注意。高い準位から低い準位へ移るとき、差は正。" },
      ],
    };
  }
  const n = r.pick([1, 2, 4, 5]);
  const E = 13.6 / (n * n);
  return {
    prompt: `水素原子のエネルギー準位は E_n＝−13.6/n² eV で表される。n＝${n} の状態にある電子を原子の外へ取り去る (電離する) のに必要な最小のエネルギーは何 eV ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "eV", calc: `0-(-13.6/${n * n})` },
    point: "電離＝E＝0 まで持ち上げる",
    steps: [{ title: "0 との差", body: `電離した状態のエネルギーは 0。0−(−13.6/${n * n})＝{{${f(E)}}} eV。`, back: [S1] }],
  };
}

// 実在の崩壊系列 [始め, 質量数, 原子番号, 終わり, 質量数, 原子番号]
const CHAIN = [
  ["ウラン 238", 238, 92, "鉛 206", 206, 82],
  ["ウラン 235", 235, 92, "鉛 207", 207, 82],
  ["トリウム 232", 232, 90, "鉛 208", 208, 82],
  ["ラジウム 226", 226, 88, "鉛 206", 206, 82],
  ["ラドン 222", 222, 86, "鉛 206", 206, 82],
  ["ウラン 238", 238, 92, "ラジウム 226", 226, 88],
] as const;

function houkai(r: Rng): QuestionBody {
  const [a, A1, Z1, b, A2, Z2] = r.pick(CHAIN);
  const alpha = (A1 - A2) / 4;
  const beta = 2 * alpha - (Z1 - Z2);
  const askA = r.bool();
  return {
    prompt: `${a}（質量数 ${A1}、原子番号 ${Z1}）が α崩壊と β崩壊を何回かくり返して、${b}（質量数 ${A2}、原子番号 ${Z2}）になった。${askA ? "α崩壊" : "β崩壊"}は何回起きましたか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(askA ? alpha : beta)], unit: "回", calc: askA ? `(${A1}-${A2})/4` : `2*(${A1}-${A2})/4-(${Z1}-${Z2})` },
    point: "質量数は α崩壊だけで 4 ずつ減る",
    steps: [
      { title: "α崩壊の回数", body: `質量数の減少 ${A1 - A2} を 4 で割って、α崩壊は {{${alpha} 回}}。原子番号は ${2 * alpha} 減るはず。`, back: [S2] },
      { title: "β崩壊の回数", body: `実際の減少は ${Z1 - Z2}。β崩壊は1回で原子番号が 1 増えるので、${2 * alpha}−${Z1 - Z2}＝{{${beta} 回}}。`, trap: "β崩壊では質量数は変わらず、原子番号が 1 増える。" },
    ],
  };
}

function hangenki(r: Rng): QuestionBody {
  const T = r.pick([8, 30, 5730, 1600, 12]);
  const k = r.int(1, 5);
  const name = r.pick(["ある放射性同位体", "放射性の原子核"]);
  const t = T * k;
  const unit = T === 8 ? "日" : "年";
  const kind = r.pick(["frac", "time", "decayed"] as const);
  if (kind === "time") {
    return {
      prompt: `半減期 ${T} ${unit}の${name}がある。はじめにあった原子核の数が 1/${2 ** k} になるのは、何${unit}後ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(t)], unit, calc: `${T}*${k}` },
      point: "1/2ⁿ になるのは半減期の n 倍の時間",
      steps: [{ title: "何回半分になるか", body: `1/${2 ** k}＝(1/2)^${k}。半減期 ${k} 回分で ${T}×${k}＝{{${t}}} ${unit}。`, back: [S3], trap: `1/${2 ** k} を見て ${2 ** k} 回としない。` }],
    };
  }
  const frac = 1 / 2 ** k;
  if (kind === "frac")
    return {
      prompt: `半減期 ${T} ${unit}の${name}がある。${t} ${unit}後に崩壊せずに残っている原子核の数は、はじめの何倍ですか。分数で答えなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [`1/${2 ** k}`], unit: "倍", calc: `(1/2)^${k}` },
      point: "N＝N₀(1/2)^(t/T)",
      steps: [{ title: "t/T を数える", body: `${t}÷${T}＝${k}。半分が ${k} 回で (1/2)^${k}＝{{1/${2 ** k}}}。`, back: [S3] }],
    };
  return {
    prompt: `半減期 ${T} ${unit}の${name}がある。${t} ${unit}の間に崩壊した原子核の数は、はじめの何 % ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(100 * (1 - frac))], unit: "%", calc: `100*(1-(1/2)^${k})` },
    point: "崩壊した数＝はじめ−残り",
    steps: [
      { title: "残り", body: `(1/2)^${k}＝${f(100 * frac)} % が残る。`, back: [S3] },
      { title: "崩壊した分", body: `100−${f(100 * frac)}＝{{${f(100 * (1 - frac))}}} %。`, trap: "残っている割合をそのまま答えない。" },
    ],
  };
}

function ketsugo(r: Rng): QuestionBody {
  if (r.bool()) {
    const dm = r.pick([0.002, 0.004, 0.006, 0.01, 0.02, 0.03]);
    const E = dm * 931.5;
    return {
      prompt: `ある原子核の質量欠損が ${f(dm)} u だった。この原子核の結合エネルギーは何 MeV ですか。1 u の質量に相当するエネルギーを 931.5 MeV とする。`,
      answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "MeV", calc: `${dm}*931.5` },
      point: "結合エネルギー＝質量欠損×c²",
      steps: [{ title: "E＝Δmc²", body: `ばらばらの核子より原子核のほうが軽い。その差 Δm がエネルギーになる。${f(dm)}×931.5＝{{${f(E)}}} MeV。`, back: [S4] }],
    };
  }
  const g = r.pick([0.1, 0.2, 0.5, 1, 2]);
  const E = g * 9;
  return {
    prompt: `質量 ${f(g)} g の物質がすべてエネルギーに変わったとすると、何 J のエネルギーになりますか。光の速さを 3.0×10⁸ m/s とし、答えは「□×10¹³」の □ の数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(E)], unit: "×10¹³ J", calc: `${g}/1000*9*1000` },
    point: "E＝mc² (m は kg で)",
    steps: [
      { title: "kg に直す", body: `${f(g)} g＝${f(g)}×10⁻³ kg。`, back: [S4], trap: "g のまま計算すると 1000 倍になる。" },
      { title: "E＝mc²", body: `${f(g)}×10⁻³×(3.0×10⁸)²＝${f(g)}×9.0×10¹³＝{{${f(E)}×10¹³}} J。`, back: [S4, S5] },
    ],
  };
}

const P = { 1: 15, 2: 17 } as const;
const T = { 1: 50, 2: 70 } as const;
const base = (id: string, difficulty: 1 | 2, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("hoshasen", 1),
    prompt: "放射線の正体の組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["α線：ヘリウムの原子核、β線：電子、γ線：電磁波", "α線：電子、β線：ヘリウムの原子核、γ線：中性子", "α線：電磁波、β線：陽子、γ線：電子", "α線：中性子、β線：電磁波、γ線：ヘリウムの原子核"],
      correct: 0,
      why: ["正しい。α線は ⁴He の原子核、β線は原子核から出る電子、γ線は波長の短い電磁波。", "α線と β線が逆。γ線は電磁波。", "α線は粒子の流れで電磁波ではない。", "α線はヘリウムの原子核。"],
    },
    point: "α：⁴He 核、β：電子、γ：電磁波",
    steps: [{ title: "正体", body: "{{α線＝ヘリウム原子核}}、{{β線＝電子}}、{{γ線＝電磁波}}。透過力は γ＞β＞α。", back: [S2] }],
  },
  {
    ...base("beta", 1),
    prompt: "β崩壊 (β⁻崩壊) で原子核の中で起こっていることとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["中性子が陽子に変わり、電子 (と反ニュートリノ) が放出される", "陽子が中性子に変わり、電子が吸収される", "ヘリウムの原子核が放出される", "原子核のエネルギー状態が下がり、電磁波だけが放出される"],
      correct: 0,
      why: ["正しい。陽子が1つふえるので原子番号が 1 増え、質量数は変わらない。", "逆の変化。β⁻崩壊では陽子がふえる。", "これは α崩壊。", "これは γ線の放出。"],
    },
    point: "β崩壊：n→p＋e⁻、原子番号＋1",
    steps: [{ title: "核の中の変化", body: "{{中性子1個が陽子1個に}}変わる。核子の数は同じなので質量数は不変、原子番号は 1 増える。", back: [S2] }],
  },
  {
    ...base("kakuyugo", 2, "思考・判断・表現"),
    prompt: "核分裂と核融合でエネルギーが放出される理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["反応の後の原子核のほうが核子1個あたりの結合エネルギーが大きく、質量の和が減るから", "反応の後に核子の数がふえるから", "反応で原子核の電荷が消えるから", "原子核が分かれたり合わさったりするときに、必ず質量がふえるから"],
      correct: 0,
      why: ["正しい。減った質量 Δm が Δmc² のエネルギーになる。", "核子の数 (質量数の和) は保存される。", "電荷も保存される。", "質量が減るからエネルギーが出る。"],
    },
    point: "質量が減った分 Δmc² が放出される",
    steps: [{ title: "結合エネルギーの曲線", body: "核子1個あたりの結合エネルギーは鉄のあたりで最大。重い核の分裂も軽い核の融合も、{{より強く結びついた核}}になり、質量が減る。", back: [S4, S5] }],
  },
  {
    ...base("sen-spectrum", 2, "思考・判断・表現"),
    prompt: "水素ガスを放電させて出る光をプリズムで分けると、とびとびの明るい線 (線スペクトル) になる。この理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["原子のエネルギーがとびとびの値しかとれず、準位の差に等しいエネルギーの光子だけが出るから", "プリズムが特定の色だけを吸収するから", "水素原子が光を連続的に出すが、目がとびとびに感じるから", "放電の電圧がとびとびに変わるから"],
      correct: 0,
      why: ["正しい。hν＝E_n−E_m なので、出る振動数も決まった値になる。", "プリズムは光を分けるだけ。", "分光器で測っても線は離れて見える。", "電圧のふらつきではなく、原子の性質。"],
    },
    point: "準位がとびとび → 光の振動数もとびとび",
    steps: [{ title: "ボーアの振動数条件", body: "電子が準位を移るとき {{hν＝E_n−E_m}} の光子を出す。準位がとびとびなので、線になる。", back: [S1] }],
  },
];

export const H_SCI_PHY_GENSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "物理",
  minutes: 14,
  review: { status: "draft" },
  sections: [
    {
      title: "原子と原子核の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "houkai", type: "A", difficulty: 1, points: 16, seconds: 70, skill: "知識・技能", generate: houkai },
        { id: "hangenki", type: "A", difficulty: 2, points: 17, seconds: 70, skill: "知識・技能", generate: hangenki },
        { id: "junni", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: junni },
        { id: "ketsugo", type: "A", difficulty: 3, points: 18, seconds: 100, skill: "思考・判断・表現", generate: ketsugo },
      ],
    },
    { title: "原子と原子核のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
