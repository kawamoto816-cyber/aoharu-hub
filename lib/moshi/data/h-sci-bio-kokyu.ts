// 生物「呼吸」の単元模試 (A: 呼吸商・発酵の ATP・CO₂ の量の計算3問 ＋ B: プール6問から3問)。問題はすべてオリジナル。
// 検算: 呼吸商＝CO₂/O₂、発酵の ATP＝グルコース分子数×2、CO₂ 量＝グルコース量×(6×44)/180 を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で照合する。体積・質量は答えが小数第1位までの整った値になるように逆算して作る。
// 好気呼吸の ATP 数は「最大38、約32 とする教科書もある」とレクチャーが書いているので、計算には使わない (発酵の2ATPだけ使う)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-bio-kokyu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "全体像：解糖系 → クエン酸回路 → 電子伝達系");
const S2 = L(2, "解糖系：グルコースを半分に割る");
const S3 = L(3, "クエン酸回路：炭素をCO₂として外す");
const S4 = L(4, "電子伝達系：H⁺の流れでATPをつくる");
const S5 = L(5, "酸素がないとき：発酵");
const S6 = L(6, "呼吸基質と呼吸商：脂肪やタンパク質も燃料になる");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

/** [呼吸商×10, 呼吸基質] */
const RQ: [number, string][] = [[10, "炭水化物"], [8, "タンパク質"], [7, "脂肪"]];

function kokyusho(r: Rng): QuestionBody {
  const [q10, sub] = r.pick(RQ);
  const k = r.int(2, 9);
  const o2 = 10 * k;
  const co2 = q10 * k;
  const who = r.pick(["発芽中の種子", "ある動物", "ある植物の芽生え"]);
  return {
    prompt: `${who}が一定時間に吸収した O₂ は ${o2} mL、放出した CO₂ は ${co2} mL であった。このときの呼吸商はいくつですか。小数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(q10 / 10)], calc: `${co2}/${o2}` },
    point: "呼吸商＝放出した CO₂÷吸収した O₂（体積比）",
    steps: [
      { title: "呼吸商", body: `${co2}÷${o2}＝{{${f(q10 / 10)}}}。`, back: [S6] },
      { title: "呼吸基質の見当", body: `炭水化物 約1.0、タンパク質 約0.8、脂肪 約0.7。この値なら主に{{${sub}}}が使われていると考えられる。` },
    ],
  };
}

function hakko(r: Rng): QuestionBody {
  const n = r.int(3, 60);
  const who = r.pick(["酵母", "乳酸菌"]);
  return {
    prompt: `酸素のない条件で、${who}がグルコースを ${n} 分子分解して発酵を行った。このとき差し引きで得られる ATP は何分子ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(2 * n)], unit: "分子", calc: `${n}*2` },
    point: "発酵は解糖系だけ → グルコース1分子で2ATP",
    steps: [
      { title: "発酵の ATP", body: "発酵では{{解糖系だけ}}で ATP をつくる。2ATP を使い4ATP をつくるので差し引き{{2ATP}}。", back: [S2, S5] },
      { title: "合計", body: `${n}×2＝{{${2 * n}}} 分子。` },
    ],
  };
}

function co2(r: Rng): QuestionBody {
  const k = r.int(1, 30);
  const g = 30 * k;
  const c = 44 * k;
  return {
    prompt: `グルコース（C₆H₁₂O₆）${g} mg が呼吸ですべて分解されたとき、放出される CO₂ は何 mg ですか。原子量は H＝1、C＝12、O＝16 とする。`,
    answer: { kind: "num", answerKind: "num", answer: [String(c)], unit: "mg", calc: `${g}*6*44/180` },
    point: "グルコース 180 → CO₂ 6×44＝264",
    steps: [
      { title: "量の関係", body: "C₆H₁₂O₆＋6O₂＋6H₂O → 6CO₂＋12H₂O。グルコース 180 から CO₂ が 6×44＝264 できる。", back: [S1] },
      { title: "CO₂ の量", body: `${g}×264÷180＝{{${c}}} mg。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
type Back = { label: string; href: string }[];
type Skill = QuestionB["skill"];
/** 選択肢問題。opts の先頭が正解 ([選択肢, その理由]) */
const ch = (id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, body: string, back: Back, skill: Skill = "知識・技能"): QuestionB => ({
  id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt,
  answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) },
  point, steps: [{ title: "考え方", body, back }],
});

const POOL: QuestionB[] = [
  ch("basho", 1, "解糖系・クエン酸回路・電子伝達系が行われる場所の組み合わせとして正しいものはどれですか。", [["細胞質基質・マトリックス・ミトコンドリアの内膜", "正しい。"], ["マトリックス・細胞質基質・内膜", "解糖系は細胞質基質、クエン酸回路はマトリックス。"], ["細胞質基質・内膜・マトリックス", "クエン酸回路と電子伝達系の場所が逆。"], ["葉緑体・ストロマ・チラコイド", "これは光合成の場所。"]], "解糖系＝細胞質基質、回路＝マトリックス、伝達系＝内膜", "{{細胞質基質}} → ミトコンドリアの{{マトリックス}} → ミトコンドリアの{{内膜}}。", [S1]),
  ch("pyruvic", 1, "解糖系で、グルコース（炭素6個）1分子は何に分解されますか。", [["ピルビン酸（炭素3個）2分子", "正しい。"], ["アセチル CoA（炭素2個）3分子", "アセチル CoA はミトコンドリアでピルビン酸からできる。"], ["クエン酸（炭素6個）1分子", "クエン酸はクエン酸回路でできる。"], ["CO₂ 6分子", "解糖系では CO₂ は出ない。"]], "グルコース → ピルビン酸×2", "解糖系でグルコース（C6）は{{ピルビン酸}}（C3）{{2分子}}に。差し引き2ATP。", [S2]),
  ch("citric", 2, "クエン酸回路で、アセチル CoA（炭素2個）と結びついてクエン酸（炭素6個）になる物質はどれですか。", [["オキサロ酢酸（炭素4個）", "正しい。回路を回ってオキサロ酢酸にもどる。"], ["ピルビン酸（炭素3個）", "ピルビン酸はアセチル CoA になる前の物質。"], ["RuBP（炭素5個）", "RuBP は光合成のカルビン回路の物質。"], ["グルコース（炭素6個）", "グルコースは解糖系の出発物質。"]], "C2＋C4（オキサロ酢酸）→ C6（クエン酸）", "アセチル CoA（C2）＋{{オキサロ酢酸}}（C4）→ クエン酸（C6）。回路で炭素を CO₂ として外す。", [S3]),
  ch("denshi", 2, "電子伝達系の最後に電子を受けとる物質と、そのときできる物質の組み合わせはどれですか。", [["酸素・水", "正しい。電子は酸素に渡され、H⁺ と結びついて水になる。"], ["NAD⁺・NADH", "NADH は電子を運んでくる側。"], ["CO₂・グルコース", "これは光合成で起こること。"], ["ピルビン酸・乳酸", "これは乳酸発酵での反応。"]], "最後の受け手は O₂ → 水", "電子は最後に{{酸素}}に渡され、H⁺ と結びついて{{水}}になる。", [S4]),
  ch("hakko-riyu", 3, "発酵で、ピルビン酸をエタノールや乳酸に変える理由として正しいものはどれですか。", [["NADH を NAD⁺ にもどし、解糖系を続けられるようにするため", "正しい。"], ["ピルビン酸から多くの ATP を取り出すため", "この反応では ATP はできない。発酵の ATP は解糖系の2ATP だけ。"], ["酸素をつくるため", "発酵は酸素を使わず、酸素もつくらない。"], ["CO₂ を固定するため", "CO₂ の固定は光合成の反応。"]], "NADH → NAD⁺ にもどして解糖系を回す", "解糖系で使う{{NAD⁺}}が足りなくならないよう、ピルビン酸を変えるときに{{NADH を NAD⁺ にもどす}}。", [S5], "思考・判断・表現"),
  ch("shibo", 3, "脂肪が呼吸基質として使われるときの道すじとして正しいものはどれですか。", [["脂肪酸がβ酸化でアセチル CoA になり、クエン酸回路に入る", "正しい。"], ["脂肪酸が脱アミノ反応でアンモニアを外してから回路に入る", "脱アミノ反応はアミノ酸（タンパク質）の場合。"], ["脂肪はそのまま電子伝達系に入る", "電子伝達系に入るのは NADH などが運ぶ電子。"], ["脂肪は呼吸基質にならない", "脂肪も呼吸基質になる。"]], "脂肪酸 → β酸化 → アセチル CoA", "脂肪酸は{{β酸化}}で{{アセチル CoA}}になってクエン酸回路へ。アミノ酸は脱アミノ反応のあと。", [S6], "思考・判断・表現"),
];

export const H_SCI_BIO_KOKYU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "呼吸の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kokyusho", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: kokyusho },
        { id: "hakko", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: hakko },
        { id: "co2", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "思考・判断・表現", generate: co2 },
      ],
    },
    { title: "呼吸のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
