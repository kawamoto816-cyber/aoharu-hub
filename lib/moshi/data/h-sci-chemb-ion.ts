// 化学基礎「イオン結合」の単元模試 (B: プール8問から4問 ＋ A: 組成式を選ぶ生成型1問 ＋ C: 記述1問)。問題はすべてオリジナル。
// 検算: A は陽イオン・陰イオンの電荷から、電荷の合計が0になる最も簡単な数の比 (最小公倍数でそろえる) で正解の組成式を作り、
//   選択肢の why に電荷の合計を書く。誤りの選択肢は数の比をずらしたもの・( ) を落としたもので、正解と重ならないように除く。
import type { QuestionB, QuestionBody, QuestionC, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chemb-ion";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "原子は貴ガスと同じ電子配置のイオンになる");
const S2 = L(2, "おもなイオンと名前");
const S3 = L(3, "イオン結合と組成式");
const S4 = L(4, "イオン結晶の性質");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("yoion", 1),
    prompt: "原子が電子を失ってできる、正の電荷をもつイオンを何といいますか。",
    answer: { kind: "term", accept: ["陽イオン"], near: [{ text: "陰イオン", why: "陰イオンは電子を受け取ってできる負のイオン。電子を失うと陽イオンです。" }] },
    point: "電子を失う → 陽イオン",
    steps: [{ title: "電子の出入り", body: "電子（負）を失うと正にかたよって{{陽イオン}}、受け取ると{{陰イオン}}になります。", back: [S1] }],
  },
  {
    ...b("enka", 1),
    prompt: "Cl⁻ の名前として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["塩化物イオン", "塩素イオン", "塩酸イオン", "塩化イオン"],
      correct: 0,
      why: ["単原子の陰イオンは「〜化物イオン」とよぶので塩化物イオン。", "単原子の陰イオンには元素名に「イオン」をつけるだけの名前は使わない。", "塩酸は塩化水素の水溶液の名前で、イオンの名前ではない。", "「物」がぬけている。O²⁻ を酸化物イオンとよぶのと同じ形。"],
    },
    point: "単原子の陰イオンは「〜化物イオン」",
    steps: [{ title: "名前のつけ方", body: "陽イオンは元素名＋イオン（Na⁺ ナトリウムイオン）、単原子の陰イオンは{{〜化物イオン}}（Cl⁻ 塩化物イオン）。", back: [S2] }],
  },
  {
    ...b("ion-ketsugo", 1),
    prompt: "陽イオンと陰イオンが静電気的な引力（クーロン力）で引き合ってできる結合を何といいますか。",
    answer: { kind: "term", accept: ["イオン結合"], near: [{ text: "共有結合", why: "共有結合は電子対を共有する結合。＋と−が引き合う結合はイオン結合です。" }] },
    point: "＋と−の引き合い＝イオン結合",
    steps: [{ title: "結合の名前", body: "陽イオンと陰イオンが{{クーロン力}}で引き合う結合が{{イオン結合}}です。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...b("na-haichi", 2),
    prompt: "Na（K2 L8 M1）がイオンになったとき、同じ電子配置になる貴ガスはどれですか。",
    answer: {
      kind: "choice",
      options: ["ネオン Ne", "アルゴン Ar", "ヘリウム He", "クリプトン Kr"],
      correct: 0,
      why: ["価電子1個を失って Na⁺（K2 L8）になり、Ne と同じ電子配置。", "Ar（K2 L8 M8）と同じになるのは Cl⁻ など。", "He（K2）と同じになるのは Li⁺ など。", "Na⁺ の電子配置は K2 L8 で、Kr とは大きくちがう。"],
    },
    point: "Na は1個失って Ne と同じ配置",
    steps: [{ title: "価電子を失う", body: "Na は M殻の{{1個}}を失って K2 L8 の Na⁺ に。これは{{Ne}}と同じ電子配置です。", back: [S1] }],
  },
  {
    ...b("ionka-e", 2),
    prompt: "イオン化エネルギーについて正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["小さい原子ほど陽イオンになりやすい", "大きい原子ほど陽イオンになりやすい", "貴ガスで最も小さくなる", "周期表の右上ほど小さい"],
      correct: 0,
      why: ["電子1個を取り去るのに必要なエネルギーが小さいほど、電子を失いやすい＝陽イオンになりやすい。", "大きいと電子を取り去りにくい。", "貴ガスでは大きくなる。", "左下ほど小さく、右上ほど大きい傾向がある。"],
    },
    point: "イオン化エネルギー小 → 陽イオンになりやすい",
    steps: [{ title: "定義から考える", body: "イオン化エネルギーは電子1個を{{取り去るのに必要なエネルギー}}。小さいほど陽イオンになりやすく、{{左下}}ほど小さいです。", back: [S1] }],
  },
  {
    ...b("bunshi-nai", 2, "思考・判断・表現"),
    prompt: "塩化ナトリウムの組成式 NaCl について、正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["Na⁺ と Cl⁻ の数の比が 1:1 であることを表す", "Na 原子と Cl 原子が1個ずつ結びついた分子を表す", "Na⁺ と Cl⁻ が1個ずつで結晶ができていることを表す", "結晶中のイオンの電荷の合計が＋1であることを表す"],
      correct: 0,
      why: ["イオン結晶には分子という単位がなく、組成式はイオンの数の比を表す。", "NaCl は分子ではない。多数の Na⁺ と Cl⁻ が並んだ結晶。", "結晶には非常に多くのイオンがふくまれる。1個ずつではない。", "電荷の合計は0になるように組成式をつくる。"],
    },
    point: "組成式はイオンの数の比",
    steps: [{ title: "分子はない", body: "イオン結晶は多数のイオンが並んだもので、組成式は{{数の比}}を最も簡単な整数比で表します。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...b("wareru", 3, "思考・判断・表現"),
    prompt: "イオン結晶はかたいが、強い力を加えると割れやすい。その理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["イオンの層がずれると、同じ符号のイオンどうしが向かい合って反発するから", "イオン結合が弱いから", "自由電子がなくなるから", "力を加えるとイオンが電子を失うから"],
      correct: 0,
      why: [
        "層が少しずれると＋と＋、−と−が向かい合い、反発して割れる。",
        "イオン結合は強い。だから融点が高く、かたい。",
        "自由電子は金属結合の話で、イオン結晶にはもともとない。",
        "力を加えても電子のやりとりは起きない。",
      ],
    },
    point: "ずれると同符号どうしが反発して割れる",
    steps: [{ title: "ずれたときを考える", body: "イオンの層がずれると{{同じ符号のイオンどうしが向かい合い}}、反発して割れます。", back: [S4] }],
  },
  {
    ...b("denki", 3, "思考・判断・表現"),
    prompt: "塩化ナトリウムが電気を通す状態の組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["融解したときと、水に溶かしたとき", "固体のときだけ", "固体のときと、融解したとき", "どの状態でも電気を通さない"],
      correct: 0,
      why: [
        "融解液や水溶液ではイオンが動けるので、電荷を運べる。",
        "固体ではイオンが決まった位置から動けず、電気を通さない。",
        "固体では電気を通さない。",
        "融解液や水溶液では電気を通す。",
      ],
    },
    point: "イオンが動ければ電気を通す",
    steps: [{ title: "イオンは動けるか", body: "固体ではイオンが動けず電気を通しません。{{融解したり水に溶かしたりすると}}イオンが動けるので電気を通します。", back: [S4] }],
  },
];

// ---- A：組成式を選ぶ ----
interface Ion {
  name: string;
  f: string;
  q: number;
  poly: boolean;
}
const CAT: Ion[] = [
  { name: "ナトリウム", f: "Na", q: 1, poly: false },
  { name: "カリウム", f: "K", q: 1, poly: false },
  { name: "アンモニウム", f: "NH₄", q: 1, poly: true },
  { name: "マグネシウム", f: "Mg", q: 2, poly: false },
  { name: "カルシウム", f: "Ca", q: 2, poly: false },
  { name: "アルミニウム", f: "Al", q: 3, poly: false },
];
const AN: Ion[] = [
  { name: "塩化", f: "Cl", q: 1, poly: false },
  { name: "水酸化", f: "OH", q: 1, poly: true },
  { name: "硝酸", f: "NO₃", q: 1, poly: true },
  { name: "酸化", f: "O", q: 2, poly: false },
  { name: "硫酸", f: "SO₄", q: 2, poly: true },
  { name: "炭酸", f: "CO₃", q: 2, poly: true },
];
const SUBN = ["", "", "₂", "₃", "₄", "₅", "₆"];
const SUPQ = (q: number, s: string) => `${q === 1 ? "" : ["", "", "²", "³"][q]}${s}`;
const part = (x: Ion, n: number, paren: boolean) => (n === 1 ? x.f : x.poly && paren ? `(${x.f})${SUBN[n]}` : `${x.f}${SUBN[n]}`);
const formula = (c: Ion, a: Ion, nc: number, na: number, paren = true) => part(c, nc, paren) + part(a, na, paren);
const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x);
const PAIRS = CAT.flatMap((c) => AN.map((a) => [c, a] as [Ion, Ion])).filter(
  ([c, a]) => !(c.f === "NH₄" && (a.f === "OH" || a.f === "O")) && !(c.f === "Al" && a.f === "CO₃") && !(c.f === "Na" && a.f === "NO₃"), // NaNO₃ は検査の「NaN」に当たるので除く
);

function soseishiki(r: Rng): QuestionBody {
  const [c, a] = r.pick(PAIRS);
  const g = gcd(c.q, a.q);
  const nc = a.q / g;
  const na = c.q / g;
  const right = formula(c, a, nc, na);
  const why = (x: number, y: number) => `正の電荷 (＋${c.q})×${x} と負の電荷 (−${a.q})×${y} で、合計は ${c.q * x - a.q * y === 0 ? "0" : (c.q * x - a.q * y > 0 ? "＋" : "−") + Math.abs(c.q * x - a.q * y)}。`;
  const cands: [string, string][] = [];
  const add = (s: string, w: string) => {
    if (s !== right && !cands.some((x) => x[0] === s)) cands.push([s, w]);
  };
  if ((c.poly && nc > 1) || (a.poly && na > 1)) add(formula(c, a, nc, na, false), "多原子イオンが2個以上あるときは ( ) でくくって数をつける。これでは別の数を表してしまう。");
  for (const [x, y] of [[na, nc], [1, 1], [1, 2], [2, 1], [2, 3], [3, 2], [1, 3], [3, 1]] as [number, number][]) if (c.q * x !== a.q * y) add(formula(c, a, x, y), `${why(x, y)}0 にならない。`);
  const wrong = r.sample(cands, 3);
  const opts = r.shuffle([[right, `${why(nc, na)}電荷がつり合う最も簡単な整数比。`] as [string, string], ...wrong]);
  return {
    prompt: `${a.name}${c.name}（${c.f}${SUPQ(c.q, "⁺")} と ${a.f}${SUPQ(a.q, "⁻")} からなる）の組成式として正しいものはどれですか。`,
    answer: { kind: "choice", options: opts.map((o) => o[0]), correct: opts.findIndex((o) => o[0] === right), why: opts.map((o) => o[1]) },
    point: "正と負の電荷の合計が0になる数の比",
    steps: [
      { title: "電荷をそろえる", body: `＋${c.q} と −${a.q} をつり合わせると、${c.f}${SUPQ(c.q, "⁺")} が ${nc} 個、${a.f}${SUPQ(a.q, "⁻")} が ${na} 個。`, back: [S3] },
      { title: "書き方", body: `陽イオンを先に書いて {{${right}}}。${(c.poly && nc > 1) || (a.poly && na > 1) ? "多原子イオンが2個以上なので ( ) でくくります。" : ""}`, trap: "名前は陰イオンから読むが、組成式は陽イオンから書く。", back: [S2] },
    ],
  };
}

const FIX: QuestionC[] = [
  {
    id: "yuukai",
    type: "C",
    difficulty: 3,
    points: 18,
    seconds: 180,
    skill: "思考・判断・表現",
    prompt: "塩化ナトリウムの固体は電気を通さないが、融解すると電気を通す。その理由を、イオンの動きにふれて45字以内で説明しなさい。",
    answer: {
      kind: "written",
      limit: { max: 45, unit: "字" },
      model: "固体ではイオンが決まった位置から動けないが、融解するとイオンが動いて電荷を運べるから。",
      rubric: [
        { label: "固体ではイオンが動けないこと", points: 9, keywords: ["動けない", "決まった位置"] },
        { label: "融解するとイオンが動いて電荷を運ぶこと", points: 9, keywords: ["動ける", "動いて", "電荷を運"] },
      ],
    },
    point: "電気を運ぶのは、動けるイオン",
    steps: [{ title: "固体と液体のちがい", body: "固体のイオンは{{決まった位置}}にあって動けません。融解すると{{イオンが自由に動き}}、電荷を運べます。", back: [S4] }],
  },
];

export const H_SCI_CHEMB_ION_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学基礎",
  review: { status: "draft" },
  sections: [
    { title: "イオンとイオン結合", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    { title: "組成式", lead: "次の問いに答えなさい。", style: "mix", questions: [{ id: "soseishiki", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: soseishiki }] },
    { title: "イオン結晶の性質の説明", lead: "次の問いに答えなさい。", style: "writing", questions: FIX },
  ],
};
