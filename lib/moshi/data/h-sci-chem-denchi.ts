// 化学「電池」の単元模試 (B: プール9問から4問 ＋ A: 電子の量の計算2問)。問題はすべてオリジナル。
// 検算 (A): 電子の物質量をきれいな値にしてから質量・物質量を作る。時間は 965 s の倍数にして It/F を割り切れる値にする。
//   calc (問題の数から答えを出す式) を scripts/check-moshi.ts がシード1〜100で照合する。
//   鉛蓄電池は e⁻ 2 mol で負極 96 g・正極 64 g 増え、電解液は 160 g 減る。燃料電池は H₂ → 2H⁺＋2e⁻、O₂＋4H⁺＋4e⁻ → 2H₂O。
//   F＝9.65×10⁴ C/mol、H₂O＝18 (どれもレクチャーと同じ)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-denchi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "電池のしくみ：電子は負極から正極へ");
const S2 = L(2, "ボルタ電池：最初の電池と分極");
const S3 = L(3, "ダニエル電池：素焼き板で2つの溶液を分ける");
const S4 = L(4, "鉛蓄電池：放電すると両極が PbSO₄ になる");
const S5 = L(5, "いろいろな実用電池");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const clean = (x: number, d = 3) => Math.abs(x * 10 ** d - Math.round(x * 10 ** d)) < 1e-6;

function namari(r: Rng): QuestionBody {
  const neg = r.bool();
  const ne = r.pick([0.05, 0.1, 0.2, 0.25, 0.4, 0.5, 1.0, 1.5]);
  const per = neg ? 96 : 64;
  const dm = f((ne / 2) * per);
  return {
    prompt: `鉛蓄電池を放電させたところ、電子が ${f(ne)} mol 流れました。${neg ? "負極" : "正極"}の質量は何 g 増えますか。原子量は O＝16、S＝32 とします。`,
    answer: { kind: "num", answerKind: "num", answer: [dm], unit: "g", calc: `${ne}/2*${per}` },
    point: neg ? "負極 Pb→PbSO₄：e⁻ 2 mol で SO₄ 分 96 g 増える" : "正極 PbO₂→PbSO₄：e⁻ 2 mol で SO₂ 分 64 g 増える",
    steps: [
      { title: "電極の反応", body: neg ? "負極：{{Pb＋SO₄²⁻ → PbSO₄＋2e⁻}}。Pb 1 mol が PbSO₄ になると SO₄ の分（96 g）増える。" : "正極：{{PbO₂＋4H⁺＋SO₄²⁻＋2e⁻ → PbSO₄＋2H₂O}}。PbO₂ が PbSO₄ になると SO₂ の分（64 g）増える。", back: [S4] },
      { title: "電子の量で比例", body: `e⁻ 2 mol で ${per} g なので、${f(ne)}÷2×${per}＝{{${dm} g}}。`, trap: "放電で正極が軽くなると考えない。両極とも PbSO₄ がくっついて重くなる。", back: [S4] },
    ],
  };
}

const IT: [number, number][] = [];
for (const I of [0.5, 1.0, 2.0, 2.5, 4.0, 5.0]) for (const t of [965, 1930, 3860, 4825, 9650]) IT.push([I, t]);

const TARGETS = [
  { key: "h2", text: "燃料電池（リン酸型）で、負極で消費される水素 H₂ は何 mol ですか", per: 1 / 2, unit: "mol", why: "負極 H₂ → 2H⁺＋2e⁻ より、H₂ は電子の 1/2" },
  { key: "o2", text: "燃料電池（リン酸型）で、正極で消費される酸素 O₂ は何 mol ですか", per: 1 / 4, unit: "mol", why: "正極 O₂＋4H⁺＋4e⁻ → 2H₂O より、O₂ は電子の 1/4" },
  { key: "w", text: "燃料電池（リン酸型）で、生じる水 H₂O は何 g ですか。H₂O＝18 とします", per: (1 / 2) * 18, unit: "g", why: "正極 O₂＋4H⁺＋4e⁻ → 2H₂O より、H₂O は電子の 1/2 mol。×18 で質量" },
  { key: "pb", text: "鉛蓄電池で、電解液の質量は何 g 減りますか", per: 80, unit: "g", why: "e⁻ 2 mol で H₂SO₄ 2 mol（196 g）が減り水 2 mol（36 g）が加わるので 160 g 減る。e⁻ 1 mol あたり 80 g" },
];

function faraday(r: Rng): QuestionBody {
  const tg = r.pick(TARGETS);
  const [I, t] = r.pick(IT.filter(([i, tt]) => clean(((i * tt) / 96500) * tg.per, 3)));
  const ne = (I * t) / 96500;
  const ans = f(ne * tg.per);
  return {
    prompt: `${f(I)} A の電流を ${t} 秒間取り出しました。この間に、${tg.text}。ファラデー定数は 9.65×10⁴ C/mol とします。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: tg.unit, calc: `${I}*${t}/(9.65*10^4)*${tg.key === "w" ? "1/2*18" : tg.key === "pb" ? "80" : tg.key === "h2" ? "1/2" : "1/4"}` },
    point: "電子の mol を出し、反応式の係数で目的の物質へ",
    steps: [
      { title: "電子の物質量", body: `${f(I)}×${t}＝${f(I * t)} C。÷9.65×10⁴ で {{${f(ne)} mol}}。`, trap: "時間は秒で入れる。", back: [S4] },
      { title: "係数でつなぐ", body: `${tg.why}。${f(ne)} mol の電子なので {{${ans} ${tg.unit}}}。`, back: [tg.key === "pb" ? S4 : S5] },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("fukyoku-sanka", 1),
    prompt: "電池の負極で起こる変化はどれですか。",
    answer: {
      kind: "choice",
      options: ["酸化（電子を出す）", "還元（電子を受け取る）", "中和", "状態変化"],
      correct: 0,
      why: ["負極は電子を出して導線へ送り出す極。電子を出すのは酸化。", "電子を受け取って還元されるのは正極。", "電池は酸化還元反応を利用する。", "電池は物質が変わる化学変化を利用する。"],
    },
    point: "負極で酸化、正極で還元",
    steps: [{ title: "電子の出し手", body: "{{負極で酸化}}（電子を出す）、{{正極で還元}}（電子を受け取る）が起こります。", back: [S1] }],
  },
  {
    ...b("denshi-muki", 1),
    prompt: "亜鉛板と銅板を使った電池で、電子が導線を流れる向きはどれですか。",
    answer: {
      kind: "choice",
      options: ["亜鉛板から銅板へ", "銅板から亜鉛板へ", "電解液の中を亜鉛板から銅板へ", "電子は流れず、電流だけが流れる"],
      correct: 0,
      why: ["イオン化傾向の大きい Zn が負極。電子は導線を負極→正極へ流れる。", "それは電流の向き。電子の向きは逆。", "電子が流れるのは導線だけ。電解液の中はイオンが動く。", "電流の正体は電子の流れ。"],
    },
    point: "電子は導線を負極（Zn）→正極（Cu）",
    steps: [{ title: "負極を決める", body: "{{イオン化傾向の大きい Zn が負極}}。電子は導線を負極→正極へ、電流はその逆向きです。", back: [S1] }],
  },
  {
    ...b("niji-denchi", 1),
    prompt: "外部の電源で逆向きに電流を流すと反応がもとにもどり、くり返し使える電池を何といいますか。",
    answer: { kind: "term", accept: ["二次電池", "蓄電池"], near: [{ text: "一次電池", why: "一次電池はマンガン乾電池のような使い切りの電池です。" }] },
    point: "充電できる＝二次電池（蓄電池）",
    steps: [{ title: "用語", body: "充電してくり返し使える電池を{{二次電池}}（蓄電池）、使い切りの電池を一次電池といいます。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...b("suyakiita", 2, "思考・判断・表現"),
    prompt: "ダニエル電池で、2つの水溶液を仕切る素焼き板のはたらきとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["液がほとんど混ざらないようにしながら、イオンを少しずつ通す", "電子を通して、導線のかわりをする", "イオンも液もまったく通さない", "Cu²⁺ を還元して銅にする"],
      correct: 0,
      why: ["小さな穴があり、Zn²⁺ や SO₄²⁻ が少しずつ移動して、両方の液の電気的なつりあいを保つ。", "電子は導線だけを流れる。", "イオンを通さないと、つりあいがくずれて電流が止まる。", "Cu²⁺ を還元するのは正極の銅板の表面で受け取る電子。"],
    },
    point: "素焼き板は、液を混ぜずにイオンを通す",
    steps: [{ title: "つりあいを保つ", body: "素焼き板は{{イオンを少しずつ通し}}、液はほとんど混ぜません。これで電流が流れ続けます。", back: [S3] }],
  },
  {
    ...b("bunkyoku", 2),
    prompt: "ボルタ電池で、電流を流しはじめるとまもなく起電力が大きく下がる現象を何といいますか。",
    answer: { kind: "term", accept: ["分極"], near: [{ text: "放電", why: "放電は電池から電流を取り出すことです。起電力がすぐ下がる現象は分極といいます。" }] },
    point: "ボルタ電池の電圧がすぐ下がる＝分極",
    steps: [{ title: "用語", body: "起電力がすぐ下がる現象が{{分極}}です。正極の表面が発生した水素におおわれることなどが原因と説明されます。", back: [S2] }],
  },
  {
    ...b("namari-noudo", 2, "思考・判断・表現"),
    prompt: "鉛蓄電池を放電させると、電解液（希硫酸）の濃度はどうなりますか。",
    answer: {
      kind: "choice",
      options: ["硫酸が使われて水ができるので、うすくなる", "水が使われるので、濃くなる", "変わらない", "はじめ濃くなり、やがてうすくなる"],
      correct: 0,
      why: ["全体の反応 Pb＋PbO₂＋2H₂SO₄ → 2PbSO₄＋2H₂O で、硫酸が減り水がふえる。", "放電では水はできる側。", "硫酸が消費されるので変わる。", "放電の間はずっと硫酸が減り続ける。"],
    },
    point: "放電で H₂SO₄ が減り H₂O がふえる",
    steps: [{ title: "全体の式", body: "{{Pb＋PbO₂＋2H₂SO₄ → 2PbSO₄＋2H₂O}}。硫酸が使われて水ができるので、濃度も密度も下がります。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...b("nagamochi", 3, "思考・判断・表現"),
    prompt: "ダニエル電池を長く使えるようにするには、2つの水溶液の濃度をどうするとよいですか。",
    answer: {
      kind: "choice",
      options: ["硫酸亜鉛水溶液はうすく、硫酸銅(II)水溶液は濃くする", "硫酸亜鉛水溶液は濃く、硫酸銅(II)水溶液はうすくする", "どちらも濃くする", "どちらもうすくする"],
      correct: 0,
      why: ["Cu²⁺ が多いほど正極の反応が長く続き、Zn²⁺ が少ないほど負極の反応が進みやすい。", "逆。Cu²⁺ が少ないと正極の反応がすぐ終わる。", "Zn²⁺ が多いと負極の反応が進みにくい。", "Cu²⁺ が少ないと正極の反応が長く続かない。"],
    },
    point: "正極で使う Cu²⁺ は多く、負極で生じる Zn²⁺ は少なく",
    steps: [{ title: "反応で何がふえ、何が減るか", body: "放電で Cu²⁺ は減り Zn²⁺ はふえます。{{CuSO₄ を濃く、ZnSO₄ をうすく}}しておくと長持ちします。", back: [S3] }],
  },
  {
    ...b("shikiri", 3, "思考・判断・表現"),
    prompt: "ダニエル電池で仕切りをなくし、Cu²⁺ が亜鉛板に直接ふれるようにすると、どうなりますか。",
    answer: {
      kind: "choice",
      options: ["亜鉛板の表面で直接 Zn＋Cu²⁺ → Zn²⁺＋Cu が起こり、エネルギーが熱になって電流はほとんど取り出せない", "起電力が2倍になる", "電子が電解液の中を流れるようになり、電流が大きくなる", "何も変わらない"],
      correct: 0,
      why: ["電子が導線を通らずにその場で受けわたされ、エネルギーは熱になる。仕切りは電子の出し手と受け手を出会わせないための壁。", "起電力は電極の組み合わせで決まる。", "電子は電解液の中を流れない。", "Cu²⁺ が亜鉛板で直接反応してしまう。"],
    },
    point: "仕切りは、電子の出し手と受け手を出会わせない壁",
    steps: [{ title: "直接反応すると", body: "亜鉛板の上で{{直接電子が受けわたされ}}、導線を通らないので電気エネルギーとして取り出せません。", back: [S3] }],
  },
  {
    ...b("li-yobai", 3, "思考・判断・表現"),
    prompt: "リチウムイオン電池の電解液に、水ではなく有機溶媒を使う理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["リチウムは水と激しく反応し、約3.7 V の電圧では水が分解されてしまうから", "有機溶媒のほうが電子をよく通すから", "水を使うと Li⁺ が動けないから", "有機溶媒は燃えないから"],
      correct: 0,
      why: ["リチウムは水と激しく反応し、起電力が大きいので水が分解されてしまう。", "電解液の中で電荷を運ぶのはイオン。電子ではない。", "Li⁺ は水溶液中でも動けるが、水そのものが使えない。", "有機溶媒はむしろ燃えやすい。燃えないことが理由ではない。"],
    },
    point: "Li は水と反応し、高い電圧では水が分解される",
    steps: [{ title: "水が使えない", body: "リチウムは{{水と激しく反応}}し、約3.7 V という大きな電圧では{{水が分解}}されるので、有機溶媒を使います。", back: [S5] }],
  },
];

export const H_SCI_CHEM_DENCHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "電池のしくみ",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 4,
      questions: POOL,
    },
    {
      title: "電子の量と物質の変化",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "namari", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: namari },
        { id: "faraday", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: faraday },
      ],
    },
  ],
};
