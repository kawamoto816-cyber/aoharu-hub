// 化学「合成高分子化合物」の単元模試 (B: プール9問から4問 ＋ A: 重合度・縮合重合の量の計算2問)。問題はすべてオリジナル。
// 検算 (A): 先に重合度 n・くり返し単位の物質量をきれいな値に決め、平均分子量・質量を掛け算で作る。calc (問題の数から答えを出す式) を
//   scripts/check-moshi.ts がシード1〜100で照合する。くり返し単位の式量 (H 1、C 12、N 14、O 16、Cl 35.5 から):
//   ポリエチレン 28、ポリ塩化ビニル 62.5、ポリスチレン 104、ナイロン66 226 (＝アジピン酸 146＋ヘキサメチレンジアミン 116−2×18)、
//   PET 192 (＝テレフタル酸 166＋エチレングリコール 62−2×18)。くり返し単位1つで水2分子がとれる (レクチャーの 2n H₂O)。
//   B の事実 (付加重合・縮合重合・熱可塑性/熱硬化性・加硫・リサイクル) はレクチャーの記述だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-gosei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "付加重合と縮合重合");
const S2 = L(2, "付加重合でできる身近な樹脂");
const S3 = L(3, "縮合重合：アミド結合とエステル結合");
const S4 = L(4, "熱でやわらかくなる樹脂、ならない樹脂");
const S5 = L(5, "ゴムと機能性高分子");
const S6 = L(6, "プラスチックとリサイクル");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

const POLY = [
  { name: "ポリエチレン", unit: "–CH₂–CH₂–", m: 28, back: S2 },
  { name: "ポリ塩化ビニル", unit: "–CH₂–CHCl–", m: 62.5, back: S2 },
  { name: "ポリスチレン", unit: "–CH₂–CH(C₆H₅)–", m: 104, back: S2 },
  { name: "ナイロン66", unit: "–CO–(CH₂)₄–CO–NH–(CH₂)₆–NH–", m: 226, back: S3 },
];

function jugodo(r: Rng): QuestionBody {
  const p = r.pick(POLY);
  const n = r.pick([100, 200, 400, 500, 800, 1000, 1500, 2000]);
  const Mbar = n * p.m;
  const e = Math.floor(Math.log10(Mbar) + 1e-9);
  const mant = Mbar / 10 ** e;
  const sup = e === 3 ? "³" : e === 4 ? "⁴" : "⁵";
  return {
    prompt: `平均分子量 ${f(mant)}×10${sup} の${p.name}があります。くり返し単位 ${p.unit} の式量を ${p.m} とすると、平均の重合度 n はいくらですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], calc: `${f(mant)}*10^${e}/${p.m}` },
    point: "重合度 n＝平均分子量÷くり返し単位の式量",
    steps: [
      { title: "くり返し単位で割る", body: `${f(mant)}×10${sup}÷${p.m}＝{{${n}}}。`, back: [S1, p.back] },
      { title: "意味", body: `くり返し単位が平均 ${n} 個つながっている。`, trap: "単量体の式量と、くり返し単位の式量を取りちがえない（縮合重合では水の分だけ小さい）。" },
    ],
  };
}

const COND = [
  { name: "ナイロン66", unit: 226, a: "アジピン酸", Ma: 146, b: "ヘキサメチレンジアミン", Mb: 116, bond: "アミド結合" },
  { name: "ポリエチレンテレフタラート（PET）", unit: 192, a: "テレフタル酸", Ma: 166, b: "エチレングリコール", Mb: 62, bond: "エステル結合" },
];

function shukugo(r: Rng): QuestionBody {
  const c = r.pick(COND);
  const ask = r.pick(["a", "b", "w"] as const);
  const n = r.pick([0.1, 0.2, 0.25, 0.5, 1.0, 2.0, 5.0]); // くり返し単位の mol
  const W = f(n * c.unit);
  const ans = ask === "a" ? f(n * c.Ma) : ask === "b" ? f(n * c.Mb) : f(n * 36);
  const what = ask === "a" ? `原料の${c.a}（分子量 ${c.Ma}）は何 g 必要ですか` : ask === "b" ? `原料の${c.b}（分子量 ${c.Mb}）は何 g 必要ですか` : "縮合重合でとれる水は何 g ですか。H₂O＝18 とします";
  const per = ask === "a" ? c.Ma : ask === "b" ? c.Mb : 36;
  return {
    prompt: `${c.a}と${c.b}を縮合重合させて、${c.name}を ${W} g つくります。くり返し単位の式量を ${c.unit} とし、鎖の両端は考えないものとします。${what}。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "g", calc: `${W}/${c.unit}*${per}` },
    point: "くり返し単位1つ＝単量体1つずつ、水2分子がとれる",
    steps: [
      { title: "くり返し単位の物質量", body: `${W}÷${c.unit}＝{{${f(n)} mol}}。`, back: [S3] },
      { title: "単位1つに何が対応するか", body: `くり返し単位1つは ${c.a} 1分子と ${c.b} 1分子から、水2分子がとれてできる（${c.Ma}＋${c.Mb}−36＝${c.unit}）。`, trap: "とれる水は単位1つにつき1分子ではない。" + c.bond + "が2つできるので2分子。", back: [S1, S3] },
      { title: "答え", body: `${f(n)}×${per}＝{{${ans} g}}。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("fuka-jugo", 1),
    prompt: "C＝C 二重結合をもつ単量体が、二重結合を開いて次々につながる重合を何といいますか。",
    answer: { kind: "term", accept: ["付加重合"], near: [{ text: "縮合重合", why: "縮合重合は、水などの小さな分子がとれてつながる重合です。" }] },
    point: "二重結合が開く＝付加重合",
    steps: [{ title: "2つの重合", body: "二重結合が開くのが{{付加重合}}、水などがとれるのが{{縮合重合}}です。", back: [S1] }],
  },
  {
    ...b("pvc", 1),
    prompt: "塩化ビニル CH₂＝CHCl を付加重合させてできる樹脂はどれですか。",
    answer: {
      kind: "choice",
      options: ["ポリ塩化ビニル", "ポリスチレン", "ポリエチレンテレフタラート", "ナイロン66"],
      correct: 0,
      why: ["CH₂＝CHX の X が Cl のビニル化合物で、–[CH₂–CHCl]ₙ– になる。", "ポリスチレンは X がベンゼン環のスチレンから。", "PET は縮合重合でできる。", "ナイロン66 は縮合重合でできる。"],
    },
    point: "ビニル化合物の X で樹脂が決まる",
    steps: [{ title: "ビニル化合物", body: "CH₂＝CHX の X が {{Cl なら ポリ塩化ビニル}}、ベンゼン環ならポリスチレン。", back: [S2] }],
  },
  {
    ...b("kaju", 1),
    prompt: "生ゴムに硫黄を加えて加熱し、分子どうしに橋かけをつくって弾性を強くする操作を何といいますか。",
    answer: { kind: "term", accept: ["加硫"], near: [{ text: "共重合", why: "共重合は2種類以上の単量体をまぜて重合させること。硫黄で橋かけするのは加硫です。" }] },
    point: "硫黄で橋かけ＝加硫",
    steps: [{ title: "用語", body: "硫黄原子が分子どうしを橋かけする操作が{{加硫}}です。", back: [S5] }],
  },
  // ---- 標準 ----
  {
    ...b("pet", 2, "思考・判断・表現"),
    prompt: "ペットボトルに使われるポリエチレンテレフタラート（PET）について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["テレフタル酸とエチレングリコールが縮合重合し、エステル結合でつながっている", "エチレンが付加重合してできている", "アミド結合でつながっている", "立体網目構造の熱硬化性樹脂である"],
      correct: 0,
      why: ["PET はエステル結合 –COO– でつながったポリエステル。", "名前にエチレンが入るが、単量体のエチレングリコールに C＝C はない。", "アミド結合でつながるのはナイロン66。", "PET は鎖状の熱可塑性樹脂で、とかして成形し直せる。"],
    },
    point: "PET は縮合重合・エステル結合",
    steps: [{ title: "名前にまどわされない", body: "PET は{{縮合重合}}でできた{{エステル結合}}の高分子です。エチレングリコールは –OH を2つもつアルコールです。", back: [S3] }],
  },
  {
    ...b("66", 2),
    prompt: "ナイロン66 の「66」が表していることとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["2つの単量体の炭素数がどちらも6であること", "単量体が66個つながっていること", "分子量が6600であること", "1966年に開発されたこと"],
      correct: 0,
      why: ["アジピン酸もヘキサメチレンジアミンも炭素原子を6個もつ。", "重合度は数百以上。66個ではない。", "分子量とは関係がない。", "ナイロン66 は1930年代に開発された。"],
    },
    point: "66 ＝ 単量体それぞれの炭素数 6 と 6",
    steps: [{ title: "名前の意味", body: "アジピン酸とヘキサメチレンジアミンの{{炭素数がどちらも6}}であることを表します。", back: [S3] }],
  },
  {
    ...b("koka", 2, "思考・判断・表現"),
    prompt: "フェノール樹脂のような熱硬化性樹脂について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["立体網目構造をもち、一度固まると加熱してもやわらかくならない", "鎖状構造で、加熱するとやわらかくなる", "熱に弱いので、電気部品には使えない", "とかして何度でも成形し直せる"],
      correct: 0,
      why: ["網目で分子が動けなくなるので、熱や薬品に強く、鍋の取っ手や電気部品に使われる。", "それは熱可塑性樹脂の性質。", "熱に強く、電気を通しにくいので電気部品に使われる。", "とかして成形し直せるのは熱可塑性樹脂。"],
    },
    point: "熱硬化性＝立体網目。固まると熱でやわらかくならない",
    steps: [{ title: "構造と性質", body: "熱硬化性樹脂は{{立体網目構造}}で、一度固まると加熱しても{{やわらかくなりません}}。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...b("recycle", 3, "思考・判断・表現"),
    prompt: "くだいたプラスチックを加熱してとかし、成形し直すマテリアルリサイクルが使えるのはどの樹脂ですか。",
    answer: {
      kind: "choice",
      options: ["熱可塑性樹脂", "熱硬化性樹脂", "どちらも同じように使える", "どちらにも使えない"],
      correct: 0,
      why: ["鎖状の分子でできていて、加熱するとやわらかくなるので成形し直せる。", "一度固まると加熱してもやわらかくならないので、とかして成形し直せない。", "熱硬化性樹脂はとけない。", "熱可塑性樹脂なら使える（PET ボトル → 繊維など）。"],
    },
    point: "とかして成形し直せるのは熱可塑性樹脂",
    steps: [{ title: "樹脂の構造で決まる", body: "{{マテリアルリサイクル}}は、加熱でやわらかくなる{{熱可塑性樹脂}}だからこそできます。", back: [S4, S6] }],
  },
  {
    ...b("kyusui", 3, "思考・判断・表現"),
    prompt: "紙おむつに使われる吸水性高分子（ポリアクリル酸ナトリウム）が、自分の質量の数百倍もの水を吸う理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["–COONa が電離して網目の中のイオン濃度が高くなり、浸透圧で水が入りこみ、–COO⁻ どうしの反発で網目が広がるから", "水と反応して別の物質に変わるから", "分子の中に小さな穴が多く、毛細管現象だけで水を吸うから", "水を凍らせて固めるから"],
      correct: 0,
      why: ["イオン濃度の差による浸透圧で水が入り、–COO⁻ どうしの反発で網目が広がってゲルになる。", "水と反応して変化するわけではない。", "おもな理由は浸透圧と反発。", "水を凍らせるわけではない。"],
    },
    point: "網目の中のイオン → 浸透圧で水を吸う",
    steps: [{ title: "しくみ", body: "–COONa が電離して網目の中の{{イオン濃度が高く}}なり、{{浸透圧}}で水が入ります。–COO⁻ の反発で網目も広がります。", back: [S5] }],
  },
  {
    ...b("bunbetsu", 3, "思考・判断・表現"),
    prompt: "プラスチックを分別するため水に入れたとき、水に浮く樹脂はどれですか。",
    answer: {
      kind: "choice",
      options: ["ポリエチレン", "ポリ塩化ビニル", "ポリスチレン", "ポリエチレンテレフタラート（PET）"],
      correct: 0,
      why: ["ポリエチレンやポリプロピレンは密度が水より小さいので浮く。", "ポリ塩化ビニルは沈む。", "ポリスチレンは沈む。", "PET は沈む。"],
    },
    point: "PE・PP は水に浮く。PS・PVC・PET は沈む",
    steps: [{ title: "密度で分ける", body: "密度が水より小さい{{ポリエチレン・ポリプロピレン}}は浮き、ポリスチレン・ポリ塩化ビニル・PET は沈みます。", back: [S6] }],
  },
];

export const H_SCI_CHEM_GOSEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "draft" },
  sections: [
    {
      title: "合成高分子の種類と性質",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 4,
      questions: POOL,
    },
    {
      title: "重合度と縮合重合の量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "jugodo", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: jugodo },
        { id: "shukugo", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: shukugo },
      ],
    },
  ],
};
