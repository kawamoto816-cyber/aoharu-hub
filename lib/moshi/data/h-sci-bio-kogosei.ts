// 生物「光合成」の単元模試 (A: 光合成速度・グルコースの量の計算3問 ＋ B: プール6問から3問)。問題はすべてオリジナル。
// 検算: 光合成速度＝見かけの光合成速度＋呼吸速度、グルコース量＝CO₂量×180/(6×44) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で照合する。CO₂ は 22 の倍数にしてグルコースが整数になるようにする。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-bio-kogosei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "全体像：チラコイドとストロマで分担する");
const S2 = L(2, "光合成色素：葉は赤と青紫の光を使う");
const S3 = L(3, "光のエネルギーで電子を押し上げる");
const S4 = L(4, "カルビン回路：CO₂を固定して糖をつくる");
const S5 = L(5, "光合成の速さは「いちばん足りないもの」で決まる");
const S6 = L(6, "CO₂の取りこみ方を工夫する植物");
const S7 = L(7, "細菌の光合成と化学合成");

const UNIT = "mg/(100 cm²·時)";

function shin(r: Rng): QuestionBody {
  const app = r.int(4, 30);
  const res = r.int(2, 8);
  return {
    prompt: `ある植物の葉に一定の強さの光を当てると、CO₂ 吸収速度（見かけの光合成速度）は ${app} ${UNIT} であった。暗所での CO₂ 放出速度（呼吸速度）が ${res} ${UNIT} で、光の下でも呼吸速度は変わらないとすると、この光の下での光合成速度は何 ${UNIT} ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(app + res)], unit: UNIT, calc: `${app}+${res}` },
    point: "光合成速度＝見かけの光合成速度＋呼吸速度",
    steps: [
      { title: "見かけとは", body: "測れるのは、光合成で吸収した CO₂ から呼吸で出した CO₂ を引いた{{見かけの光合成速度}}。", back: [S5] },
      { title: "光合成速度", body: `${app}＋${res}＝{{${app + res}}} ${UNIT}。` },
    ],
  };
}

function mikake(r: Rng): QuestionBody {
  const res = r.int(2, 9);
  const tot = res + r.int(-1, 25);
  const app = tot - res;
  return {
    prompt: `ある植物の葉の光合成速度が CO₂ 量で ${tot} ${UNIT}、呼吸速度が ${res} ${UNIT} であるとき、測定される見かけの光合成速度は何 ${UNIT} ですか。CO₂ を放出している場合は負の数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(app)], unit: UNIT, calc: `${tot}-${res}` },
    point: "見かけ＝光合成−呼吸。光補償点では0",
    steps: [
      { title: "差を求める", body: `${tot}−${res}＝{{${String(app).replace("-", "−")}}} ${UNIT}。`, back: [S5] },
      { title: "意味", body: app === 0 ? "見かけの光合成速度が0。この光の強さが{{光補償点}}にあたる。" : app < 0 ? "負なので、全体としては CO₂ を放出している（光補償点より弱い光）。" : "正なので、全体として CO₂ を吸収している。" },
    ],
  };
}

function glucose(r: Rng): QuestionBody {
  const k = r.int(2, 40);
  const co2 = 22 * k;
  const g = 15 * k;
  return {
    prompt: `光合成で CO₂ が ${co2} mg 吸収され、すべてグルコース（C₆H₁₂O₆）になったとすると、できたグルコースは何 mg ですか。原子量は H＝1、C＝12、O＝16 とする。`,
    answer: { kind: "num", answerKind: "num", answer: [String(g)], unit: "mg", calc: `${co2}*180/(6*44)` },
    point: "CO₂ 6分子（264）→ グルコース1分子（180）",
    steps: [
      { title: "量の関係", body: "6CO₂＋12H₂O → C₆H₁₂O₆＋6O₂＋6H₂O。CO₂ 6×44＝264 から、グルコース 180 ができる。", back: [S1, S4] },
      { title: "グルコースの量", body: `${co2}×180÷264＝{{${g}}} mg。` },
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
  ch("basho", 1, "光合成で、水が分解されて O₂ が発生するのは葉緑体のどこですか。", [["チラコイドの膜", "正しい。光のエネルギーで ATP と NADPH もつくられる。"], ["ストロマ", "ストロマではカルビン回路で CO₂ から有機物がつくられる。"], ["ミトコンドリアの内膜", "ミトコンドリアは呼吸の場。"], ["細胞膜", "光合成は葉緑体で行われる。"]], "チラコイド：光・水の分解・ATP", "{{チラコイドの膜}}で水が分解されて O₂ が出る。{{ストロマ}}では CO₂ から有機物。", [S1]),
  ch("shikiso", 1, "葉が緑色に見える理由として正しいものはどれですか。", [["クロロフィルが青紫と赤の光をよく吸収し、緑の光はあまり吸収しないから", "正しい。"], ["クロロフィルが緑の光だけを吸収するから", "吸収した光の色ではなく、吸収されずに残った光が見える。"], ["カロテンが緑色の色素だから", "カロテンは黄〜だいだい色の色素。"], ["葉の中の水が緑色だから", "水は無色。"]], "赤と青紫を吸収、緑はあまり吸収しない", "クロロフィルは{{青紫}}と{{赤}}の光をよく吸収し、{{緑}}はあまり吸収しない。", [S2]),
  ch("calvin", 2, "カルビン回路で CO₂ と結びつく物質と、その反応を進める酵素の組み合わせはどれですか。", [["RuBP（炭素5個）・ルビスコ", "正しい。PGA（炭素3個）が2分子できる。"], ["PGA（炭素3個）・ルビスコ", "PGA は CO₂ が固定されてできる物質。"], ["RuBP（炭素5個）・ATP 合成酵素", "ATP 合成酵素はチラコイド膜で ATP をつくる。"], ["グルコース・DNA ポリメラーゼ", "関係しない。"]], "CO₂＋RuBP → PGA×2（ルビスコ）", "CO₂ は炭素5個の{{RuBP}}と結びつき PGA 2分子に。酵素は{{ルビスコ}}。", [S4]),
  ch("hikari-rinsan", 2, "チラコイド膜で ATP がつくられるしくみ（光リン酸化）として正しいものはどれですか。", [["電子が流れるあいだにチラコイドの内側に H⁺ がたまり、ATP 合成酵素を通ってもどるときに ATP ができる", "正しい。"], ["CO₂ が RuBP と結びつくときに ATP ができる", "カルビン回路では ATP を使う。"], ["O₂ が水になるときに ATP ができる", "これは呼吸の電子伝達系の最後の反応。"], ["NADPH が分解されるときに ATP ができる", "NADPH はカルビン回路で使われる。"]], "H⁺ が ATP 合成酵素を通ってもどる", "電子の流れで{{H⁺ がチラコイドの内側}}にたまり、{{ATP 合成酵素}}を通ってもどるときに ATP。", [S3], "思考・判断・表現"),
  ch("c4-cam", 3, "サボテンなどの CAM 植物の特徴として正しいものはどれですか。", [["夜に気孔を開いて CO₂ を取りこみ、昼は気孔を閉じて水を失わないようにする", "正しい。乾燥した環境に適応している。"], ["昼だけ気孔を開いて CO₂ を取りこむ", "昼に開くと水を失う。CAM 植物は夜に開く。"], ["CO₂ を維管束鞘細胞に運んでカルビン回路に渡す", "これは C₄ 植物の特徴。"], ["光を使わずに無機物の酸化で有機物をつくる", "これは化学合成。"]], "CAM＝夜に CO₂ を取りこむ", "{{CAM 植物}}は{{夜に気孔を開いて}}CO₂ を取りこみ、昼は閉じて水を守る。", [S6], "思考・判断・表現"),
  ch("saikin", 3, "紅色硫黄細菌の光合成が、植物の光合成とちがう点として正しいものはどれですか。", [["水の代わりに硫化水素などから電子を得るので、酸素を出さない", "正しい。"], ["光を使わず、無機物の酸化で得たエネルギーを使う", "これは化学合成。"], ["水を分解して酸素を出す", "これはシアノバクテリアや植物。"], ["CO₂ を使わずに有機物をつくる", "光合成細菌も CO₂ から有機物をつくる。"]], "光合成細菌は H₂S などから電子 → O₂ を出さない", "光合成細菌は水の代わりに{{硫化水素}}などから電子を得るので{{酸素を出さない}}。", [S7], "思考・判断・表現"),
];

export const H_SCI_BIO_KOGOSEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "光合成の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "shin", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: shin },
        { id: "mikake", type: "A", difficulty: 2, points: 17, seconds: 70, skill: "思考・判断・表現", generate: mikake },
        { id: "glucose", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "知識・技能", generate: glucose },
      ],
    },
    { title: "光合成のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
