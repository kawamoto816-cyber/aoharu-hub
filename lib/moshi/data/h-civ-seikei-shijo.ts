// 高校政治・経済「市場機構」の単元模試。問題はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 大問1 (A: 生成型 2問) … 需要・供給の式から均衡を求める計算と、従量税をかけたときの均衡・負担の計算。数値はシードで変わる。
//   検算方法: 需要 D＝a−bP、供給 S＝cP。先に均衡価格 P0 (5の倍数) を決め、Q0＝c·P0、a＝Q0＋b·P0 と作るので必ず整数になる。
//   課税は t＝(b＋c)·k とし、新しい価格 P1＝P0＋c·k (買い手の負担 c·k、売り手の負担 b·k) が整数になる組だけを使う。
//   num の calc に「問題の数から答えを出す式」(a/(b+c) など) を書き、scripts/check-moshi.ts がシード1〜100で答えと照合する。
// 大問2 (B: プール9問から4問) … 基本3・標準3・発展3。1回に基本2・標準1・発展1 (15×2＋17＋18＝65点)。大問1 (17＋18＝35点) と合わせて100点。
// 事実・年はレクチャー (lib/lecture/data/h-civ-seikei-shijo.ts) の記述に合わせている。市場と政府の役割分担のあり方など、評価が分かれる点は問わない。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-civ-seikei-shijo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "需要曲線と供給曲線の交点を計算する");
const S2 = L(2, "曲線そのものが動く：シフトの原因");
const S3 = L(3, "価格弾力性：価格が変わると量はどれだけ動くか");
const S4 = L(4, "税をかけると、供給曲線が上へずれる");
const S5 = L(5, "独占の形態と独占禁止法");
const S6 = L(6, "外部不経済を価格に組みこむ");
const S7 = L(7, "公共財と情報の非対称性");

/** 係数つきの P の書き方 (1P → P) */
const kp = (k: number) => (k === 1 ? "P" : `${k}P`);
const GOODS = ["ある野菜", "ある文房具", "ある飲料", "ある菓子", "ある日用品"] as const;

/** 均衡価格・均衡取引量 */
function kinko(r: Rng): QuestionBody {
  const b = r.pick([1, 2]);
  const c = r.pick([1, 2, 3]);
  const p0 = r.step(20, 80, 5);
  const q0 = c * p0;
  const a = q0 + b * p0;
  const good = r.pick(GOODS);
  const askQ = r.bool();
  const prompt = `${good}の市場で、価格を P（円）とすると、需要量は D＝${a}−${kp(b)}、供給量は S＝${kp(c)}（個）で表されます。均衡${askQ ? "取引量は何個" : "価格は何円"}ですか。`;
  return {
    prompt,
    answer: askQ
      ? { kind: "num", answerKind: "num", answer: [String(q0)], unit: "個", calc: `${c}*${a}/(${b}+${c})` }
      : { kind: "num", answerKind: "num", answer: [String(p0)], unit: "円", calc: `${a}/(${b}+${c})` },
    point: "均衡は「需要量＝供給量」とおいて解く",
    steps: [
      { title: "つり合いの式", body: `需要量＝供給量とおくと ${a}−${kp(b)}＝${kp(c)}。P をまとめて ${a}＝${kp(b + c)}。`, back: [S1] },
      { title: "均衡価格", body: `P＝${a}÷${b + c}＝{{${p0}}}（円）。`, trap: askQ ? "均衡価格で止めず、取引量まで求める。" : undefined },
      { title: "均衡取引量", body: `S＝${c === 1 ? "P" : c + "×" + p0}＝{{${q0}}}（個）。D＝${a}−${b === 1 ? "" : b + "×"}${p0}＝${q0} とも一致します。` },
    ],
  };
}

/** 従量税をかけたときの均衡と負担 */
function zei(r: Rng): QuestionBody {
  const b = r.pick([1, 2]);
  const c = r.pick([1, 2]);
  const p0 = r.step(30, 70, 5);
  const a = c * p0 + b * p0;
  const k = r.int(2, 6);
  const t = (b + c) * k;
  const p1 = p0 + c * k;
  const q1 = a - b * p1;
  const kind = r.pick(["price", "buyer", "seller"] as const);
  const newP = `(${a}+${c}*${t})/(${b}+${c})`;
  const ask = { price: "課税後の均衡価格は何円ですか", buyer: "課税によって、買い手が支払う価格は何円上がりますか", seller: "課税後、売り手が1個あたり受け取る手取りは何円ですか" }[kind];
  const answer =
    kind === "price"
      ? { ans: p1, calc: newP }
      : kind === "buyer"
        ? { ans: p1 - p0, calc: `${newP}-${a}/(${b}+${c})` }
        : { ans: p1 - t, calc: `${newP}-${t}` };
  return {
    prompt: `需要量 D＝${a}−${kp(b)}、供給量 S＝${kp(c)}（P は価格・円）の市場で、売り手に1個あたり ${t}円の間接税をかけます。${ask}。`,
    answer: { kind: "num", answerKind: "num", answer: [String(answer.ans)], unit: "円", calc: answer.calc },
    point: "税は供給曲線を税額分だけ上へずらす",
    steps: [
      { title: "課税前の均衡", body: `${a}−${kp(b)}＝${kp(c)} から P＝${p0}（円）。`, back: [S1] },
      { title: "供給の式を書きかえる", body: `売り手の手取りは P−${t} なので、供給量は S＝${c === 1 ? `P−${t}` : `${c}(P−${t})`}。${a}−${kp(b)}＝${c === 1 ? `P−${t}` : `${c}(P−${t})`} を解いて P＝{{${p1}}}、取引量は ${q1}個。`, back: [S4] },
      { title: "負担の分かれ方", body: `買い手の支払いは ${p0}→${p1} で {{${p1 - p0}円}} 増え、売り手の手取りは ${p0}→${p1 - t} で {{${p0 - (p1 - t)}円}} 減ります。`, trap: `価格がちょうど税額（${t}円）上がるわけではない。弾力性に応じて両方が負担します。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("dokusen-keitai", 1),
    prompt: "同じ業種の企業が独立したまま、価格や生産量を協定する独占の形態を何といいますか。",
    answer: {
      kind: "choice",
      options: ["カルテル", "トラスト", "コンツェルン", "プライス・リーダー"],
      correct: 0,
      why: ["正しい。", "トラストは同じ業種の企業が合併して1つになること。", "コンツェルンは持株会社が株式の保有を通じて多くの企業を支配すること。", "プライス・リーダーは寡占市場で価格を先導する企業。"],
    },
    point: "カルテル＝協定、トラスト＝合併",
    steps: [{ title: "3つの形態", body: "{{カルテル}}＝協定、{{トラスト}}＝合併、{{コンツェルン}}＝持株会社による支配。", back: [S5] }],
  },
  {
    ...base("kokyozai", 1),
    prompt: "公共財の性質のうち、お金を払わない人だけを使わせないようにすることができない性質を何といいますか。",
    answer: { kind: "term", accept: ["非排除性"], script: "kanji", near: [{ text: "非競合性", why: "非競合性は、1人が使っても他の人の使える分が減らない性質です。" }] },
    point: "公共財＝非排除性と非競合性",
    steps: [{ title: "ただ乗り", body: "{{非排除性}}があるので {{フリーライダー}} が出て、市場では十分に供給されません。そのため政府が税で供給します。", back: [S7] }],
  },
  {
    ...base("daitaizai", 1, "思考・判断・表現"),
    prompt: "コーヒーと紅茶が代替財であるとき、コーヒーが値上がりすると、紅茶の需要曲線はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["右へシフトする", "左へシフトする", "動かず、曲線の上を移動する", "供給曲線が右へシフトする"],
      correct: 0,
      why: ["正しい。代わりに紅茶を買う人が増え、どの価格でも需要量が増える。", "左へ動くのは、補完財が値上がりしたときなど。", "紅茶の価格は変わっていないので、移動ではなくシフト。", "紅茶の売り手の条件は変わっていない。"],
    },
    point: "代替財の値上がり→需要が右へ",
    steps: [{ title: "移動とシフト", body: "その財の価格が変わる → 曲線上の {{移動}}。価格以外の条件（所得・好み・関係する財の価格）→ 曲線の {{シフト}}。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("danryokusei", 2),
    prompt: "ある財の価格が10%上がったところ、需要量が25%減りました。需要の価格弾力性はいくつですか。",
    answer: { kind: "num", answerKind: "num", answer: ["2.5"], calc: "25/10" },
    point: "弾力性＝需要量の変化率÷価格の変化率",
    steps: [
      { title: "変化率で割る", body: "{{25 ÷ 10 ＝ 2.5}}（符号は考えず大きさで比べる）。", back: [S3] },
      { title: "読みとる", body: "1より大きいので {{弾力的}}。ぜいたく品や代わりの品が多い財に多い性質です。", trap: "価格の変化率を需要量の変化率で割らない。" },
    ],
  },
  {
    ...base("gaibu", 2, "思考・判断・表現"),
    prompt: "工場の排煙などの外部不経済があるとき、市場にまかせた生産量はどうなりやすいですか。",
    answer: {
      kind: "choice",
      options: ["社会的に望ましい量より多くなる", "社会的に望ましい量より少なくなる", "ちょうど社会的に望ましい量になる", "生産がまったく行われなくなる"],
      correct: 0,
      why: ["正しい。住民の被害などの費用を払わずに生産できるので、本当の費用より安く作れる。", "逆。費用の一部を負担していないので多くなる。", "外部不経済は市場の失敗の1つで、望ましい量からずれる。", "費用が安いぶん、生産はむしろ増える。"],
    },
    point: "外部不経済→過剰生産→ピグー税で内部化",
    steps: [{ title: "費用の一部を払っていない", body: "社会全体の費用より安く作れる → 生産が {{多すぎる}}。環境税などで費用を負担させるのが {{外部不経済の内部化}}（ピグー税）。", back: [S6] }],
  },
  {
    ...base("kanri-kakaku", 2),
    prompt: "寡占市場で、費用が下がっても価格が下がりにくい性質を何といいますか。",
    answer: { kind: "term", accept: ["価格の下方硬直性", "下方硬直性"], script: "kanji", near: [{ text: "管理価格", why: "管理価格は、プライス・リーダーが決めた価格に他社が従って決まる価格です。下がりにくい性質は「価格の下方硬直性」。" }] },
    point: "寡占＝管理価格・下方硬直性・非価格競争",
    steps: [{ title: "寡占市場の特徴", body: "{{プライス・リーダー}}が {{管理価格}} を決め、価格は下がりにくい（{{下方硬直性}}）。企業は広告などの {{非価格競争}} で争います。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...base("hosaku", 3, "思考・判断・表現"),
    prompt: "野菜が大豊作になった年に、農家の売上げがかえって減ることがある理由として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "需要の価格弾力性が小さいので、出荷量が少し増えるだけで価格が大きく下がり、価格×数量が減るから",
        "需要の価格弾力性が大きいので、価格が少し下がると買う量が大きく増えるから",
        "豊作になると需要曲線が左へシフトするから",
        "豊作になると供給曲線が左へシフトするから",
      ],
      correct: 0,
      why: [
        "正しい。生活必需品は安くなっても食べる量をそれほど増やせない。",
        "弾力性が大きければ値下げで量が大きく伸び、売上げは増える。",
        "豊作は売り手側の変化で、需要曲線は動かない。",
        "豊作は供給曲線を右へ動かす。",
      ],
    },
    point: "弾力性が小さい財は値下がりで売上げ減",
    steps: [
      { title: "シフト", body: "豊作で {{供給曲線が右へ}}。価格は下がり、取引量は増えます。", back: [S2] },
      { title: "弾力性", body: "生活必需品は {{弾力性が小さい}} ので、価格の下がり方に比べて量はわずかしか増えず、売上げ（価格×数量）は減ります。", back: [S3] },
    ],
  },
  {
    ...base("hitaisho", 3),
    prompt: "中古車の売り手は故障の歴史を知っているが買い手は見分けられないため、質の良い車が市場から追い出されることがあります。この原因となる市場の失敗を何といいますか。",
    answer: { kind: "term", accept: ["情報の非対称性"], script: "kanji", near: [{ text: "外部不経済", why: "外部不経済は、取引の外の人に費用を負わせることです。情報の差が原因なのは「情報の非対称性」。" }] },
    point: "情報の差＝情報の非対称性",
    steps: [{ title: "情報の差を小さくする", body: "{{情報の非対称性}}には、品質の表示義務・保証制度・資格制度・情報開示のルールなどで対応します。", back: [S7] }],
  },
  {
    ...base("dokkinho", 3),
    prompt: "日本の独占禁止法について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "1947年に制定され、公正取引委員会が運用する。戦前の財閥への反省から禁止されていた持株会社は、1997年の改正で原則として解禁された",
        "1890年に制定され、反トラスト法（シャーマン法）ともよばれる",
        "カルテルは、届け出をすればいつでも認められる",
        "持株会社は、現在も全面的に禁止されている",
      ],
      correct: 0,
      why: ["正しい。違反した企業には課徴金が課される。", "1890年のシャーマン法はアメリカの法律。", "カルテルは不当な取引制限として取りしまられる。", "1997年の改正で原則として解禁された。"],
    },
    point: "独禁法1947・公取委・持株会社解禁1997",
    steps: [{ title: "競争を守る", body: "{{独占禁止法}}（1947年）を {{公正取引委員会}} が運用。持株会社は {{1997年}} に原則解禁。", back: [S5] }],
  },
];

export const H_CIV_SEIKEI_SHIJO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "soc",
  grade: "政治・経済",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "需要・供給の式を解く",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kinko", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: kinko },
        { id: "zei", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: zei },
      ],
    },
    { title: "市場機構のしくみ", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: POOL },
  ],
};
