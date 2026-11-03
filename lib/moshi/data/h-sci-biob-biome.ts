// 生物基礎「バイオーム」の単元模試 (B: プール8問から4問 ＋ A: 暖かさの指数の計算・バイオームの予想2問)。問題はすべてオリジナル。
// 検算: 月平均気温は架空の町の型 (5種類) を −2〜＋2℃ ずらして作る。暖かさの指数＝5℃をこえる月の (気温−5) の合計 (レクチャーの定義)。
//   calc はその和の式で、scripts/check-moshi.ts がシード1〜100で計算して照合する。バイオームの範囲もレクチャーの値
//   (240以上 熱帯多雨林／180〜240 亜熱帯多雨林／85〜180 照葉樹林／45〜85 夏緑樹林／15〜45 針葉樹林) を使い、境目から3未満の組は使わない。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-biob-biome";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "バイオームは気候で決まる");
const S2 = L(2, "降水量が少ないと、森林→草原→荒原");
const S3 = L(3, "気温が下がると森林の種類が変わる");
const S4 = L(4, "日本の水平分布と垂直分布");
const S5 = L(5, "暖かさの指数でバイオームを予想する");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("kion-kosui", 1),
    prompt: "どのようなバイオームになるかを決めるおもな要因の組み合わせはどれですか。",
    answer: {
      kind: "choice",
      options: ["年平均気温と年降水量", "標高と土壌の色", "日照時間と風向き", "緯度と経度"],
      correct: 0,
      why: ["バイオームはおもに年平均気温と年降水量で決まる。", "標高は気温を通して関係するが、土壌の色はおもな要因ではない。", "おもな要因ではない。", "緯度は気温を通して関係するが、経度は直接の要因ではない。"],
    },
    point: "バイオームは気温と降水量で決まる",
    steps: [{ title: "2つの要因", body: "バイオームは、おもに{{年平均気温}}と{{年降水量}}で決まります。", back: [S1] }],
  },
  {
    ...b("shoyoju", 1),
    prompt: "葉が厚く光沢のある常緑広葉樹からなる森林を何といいますか。",
    answer: { kind: "term", accept: ["照葉樹林"], near: [{ text: "夏緑樹林", why: "夏緑樹林は冬に葉を落とす落葉広葉樹の森。光沢のある常緑広葉樹の森は照葉樹林です。" }] },
    point: "照葉＝光沢のある葉の常緑樹",
    steps: [{ title: "名前の意味", body: "「照葉」は光沢のある葉。{{照葉樹林}}は常緑広葉樹、{{夏緑樹林}}は落葉広葉樹の森です。", back: [S3] }],
  },
  {
    ...b("sogen", 1),
    prompt: "降水量が少なく樹木が育ちにくい地域にできる、イネ科の草本が中心のバイオームはどれですか。",
    answer: {
      kind: "choice",
      options: ["草原", "針葉樹林", "照葉樹林", "熱帯多雨林"],
      correct: 0,
      why: ["降水量が少ないと森林ができず、イネ科の草本が中心の草原になる。", "針葉樹林は降水量が十分で気温が低い地域の森林。", "照葉樹林は暖かく降水量の多い地域の森林。", "熱帯多雨林は高温で雨が多い地域の森林。"],
    },
    point: "降水量：多い→森林、少ない→草原→荒原",
    steps: [{ title: "降水量で考える", body: "降水量が減ると{{森林 → 草原 → 荒原}}の順に変わります。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...b("ondo-jun", 2),
    prompt: "降水量が十分な地域で、森林を暑い地域から寒い地域の順に並べたものはどれですか。",
    keepOrder: true,
    answer: {
      kind: "choice",
      options: ["熱帯多雨林 → 照葉樹林 → 夏緑樹林 → 針葉樹林", "熱帯多雨林 → 夏緑樹林 → 照葉樹林 → 針葉樹林", "照葉樹林 → 熱帯多雨林 → 針葉樹林 → 夏緑樹林", "針葉樹林 → 夏緑樹林 → 照葉樹林 → 熱帯多雨林"],
      correct: 0,
      why: ["暑い順に 熱帯多雨林・亜熱帯多雨林・照葉樹林・夏緑樹林・針葉樹林。", "照葉樹林のほうが夏緑樹林より暖かい地域。", "熱帯多雨林が最も暑い地域。", "これは寒い順。"],
    },
    point: "熱帯多雨林→亜熱帯多雨林→照葉樹林→夏緑樹林→針葉樹林",
    steps: [{ title: "気温の順", body: "暑い順に{{熱帯多雨林・亜熱帯多雨林・照葉樹林・夏緑樹林・針葉樹林}}です。", back: [S3] }],
  },
  {
    ...b("tundra", 2),
    prompt: "ツンドラについて正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["低温のために植物がまばらになった荒原", "乾燥のためにできる砂漠の一種", "冬に葉を落とす落葉広葉樹の森林", "雨季と乾季がある地域の森林"],
      correct: 0,
      why: ["ツンドラは低温が原因で植物がまばらになる荒原。", "砂漠は乾燥が原因。ツンドラは低温が原因。", "これは夏緑樹林。", "これは雨緑樹林。"],
    },
    point: "ツンドラ＝低温の荒原、砂漠＝乾燥の荒原",
    steps: [{ title: "荒原の原因", body: "荒原のうち、{{砂漠は乾燥}}、{{ツンドラは低温}}が原因です。", back: [S2] }],
  },
  {
    ...b("koyoju", 2),
    prompt: "夏に乾燥し、冬に雨が多い地域にできる森林はどれですか。",
    answer: {
      kind: "choice",
      options: ["硬葉樹林", "雨緑樹林", "夏緑樹林", "亜熱帯多雨林"],
      correct: 0,
      why: ["夏に乾燥し冬に雨が多い地域には硬葉樹林ができる。", "雨緑樹林は雨季と乾季がある地域。", "夏緑樹林は冬に葉を落とす落葉広葉樹の森で、冷涼な地域。", "亜熱帯多雨林は暖かく雨の多い地域。"],
    },
    point: "夏に乾燥・冬に雨＝硬葉樹林",
    steps: [{ title: "雨の降り方", body: "雨季・乾季がある地域は{{雨緑樹林}}、夏に乾燥し冬に雨が多い地域は{{硬葉樹林}}です。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...b("koozan", 3, "思考・判断・表現"),
    prompt: "本州中部の山で、標高約2500mより上が高山帯になり、高木の森林が見られない理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["森林限界をこえ、低温と強い風のため高木が育たないから", "雨がまったく降らないから", "人が森林を切りつくしたから", "針葉樹林が遷移の途中だから"],
      correct: 0,
      why: [
        "標高が上がると気温が下がり、森林限界より上では高木が育たず、ハイマツや高山植物が中心になる。",
        "高山帯でも雨や雪は降る。原因は低温と風。",
        "人による伐採が原因ではない。",
        "遷移の途中ではなく、気候によって高木が育たない。",
      ],
    },
    point: "森林限界より上は高山帯",
    steps: [{ title: "標高と気温", body: "100m 上がると約0.5〜0.6℃下がります。{{森林限界}}をこえると高木が育たず、{{ハイマツ}}や高山植物が中心になります。", back: [S4] }],
  },
  {
    ...b("nihon-shinrin", 3, "思考・判断・表現"),
    prompt: "日本の水平分布について正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["日本は全体に降水量が多いので、水平分布はすべて森林になる", "日本の北部には、乾燥による草原が水平分布として広がる", "日本の水平分布はおもに降水量で決まる", "日本には砂漠のバイオームがある"],
      correct: 0,
      why: [
        "日本は降水量が多いので、バイオームはおもに気温で決まり、どこも森林になる。",
        "日本の草原の多くは人の手入れや遷移の途中でできたもので、水平分布には入らない。",
        "日本の水平分布はおもに気温で決まる。",
        "日本は降水量が多く、砂漠のバイオームはない。",
      ],
    },
    point: "日本の水平分布はすべて森林（気温で決まる）",
    steps: [{ title: "日本の条件", body: "日本は{{降水量が多い}}ので、バイオームは{{気温}}で決まり、水平分布はすべて森林です。", back: [S4] }],
  },
];

const TYPES: number[][] = [
  [16, 16, 18, 21, 24, 27, 29, 29, 27, 24, 21, 18],
  [7, 8, 11, 16, 20, 23, 27, 28, 25, 20, 15, 10],
  [2, 3, 6, 12, 17, 20, 24, 26, 22, 16, 10, 5],
  [-4, -3, 1, 7, 12, 16, 20, 22, 18, 11, 5, -1],
  [-12, -10, -4, 2, 8, 12, 16, 17, 12, 5, -2, -8],
];
const RANGES: [string, number, number][] = [
  ["熱帯多雨林", 240, Infinity],
  ["亜熱帯多雨林", 180, 240],
  ["照葉樹林", 85, 180],
  ["夏緑樹林", 45, 85],
  ["針葉樹林", 15, 45],
];
const BOUNDS = [240, 180, 85, 45, 15];
const idx = (ts: number[]) => ts.filter((t) => t > 5).reduce((s, t) => s + t - 5, 0);
const D = (n: number) => (n < 0 ? `−${-n}` : String(n));

function town(r: Rng): number[] {
  for (;;) {
    const base = r.pick(TYPES);
    const off = r.int(-2, 2);
    const ts = base.map((t) => t + off);
    const w = idx(ts);
    if (w >= 15 && BOUNDS.every((x) => Math.abs(w - x) >= 3)) return ts;
  }
}
const list = (ts: number[]) => ts.map(D).join("・");

function shisu(r: Rng): QuestionBody {
  const ts = town(r);
  const over = ts.filter((t) => t > 5);
  const w = idx(ts);
  return {
    prompt: `ある町の月平均気温（℃）は、1月から順に ${list(ts)} でした。この町の暖かさの指数を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(w)], calc: over.map((t) => `(${t}-5)`).join("+") },
    point: "5℃をこえる月だけ「気温−5」を合計",
    steps: [
      { title: "5℃をこえる月を選ぶ", body: `5℃をこえるのは ${over.length} か月。5℃以下の月は数えない。`, back: [S5] },
      { title: "合計する", body: `「気温−5」は ${over.map((t) => t - 5).join("・")}。合計は {{${w}}}。`, trap: "5℃以下の月の「気温−5」（0や負の数）を足さない。" },
    ],
  };
}

function yoso(r: Rng): QuestionBody {
  const ts = town(r);
  const w = idx(ts);
  const right = RANGES.find(([, lo, hi]) => w >= lo && w < hi)!;
  const others = r.sample(RANGES.filter((x) => x !== right), 3);
  const opts = r.shuffle([right, ...others]);
  const rng = (x: [string, number, number]) => (x[2] === Infinity ? `${x[1]}以上` : `${x[1]}〜${x[2]}`);
  return {
    prompt: `降水量が十分にある、ある地域の月平均気温（℃）は、1月から順に ${list(ts)} でした。暖かさの指数から、この地域の本来のバイオームを予想するとどれですか。暖かさの指数は 240以上が熱帯多雨林、180〜240 が亜熱帯多雨林、85〜180 が照葉樹林、45〜85 が夏緑樹林、15〜45 が針葉樹林とします。`,
    answer: {
      kind: "choice",
      options: opts.map((o) => o[0]),
      correct: opts.indexOf(right),
      why: opts.map((o) => (o === right ? `暖かさの指数は ${w} で、${rng(o)} の範囲に入る。` : `${o[0]}は ${rng(o)}。指数 ${w} はこの範囲に入らない。`)),
    },
    point: "指数を計算してから、範囲に当てはめる",
    steps: [
      { title: "指数を出す", body: `5℃をこえる月の「気温−5」を合計して {{${w}}}。`, back: [S5] },
      { title: "範囲に当てはめる", body: `${w} は ${rng(right)} なので {{${right[0]}}}。`, trap: "年平均気温だけで決めない。暖かさの指数は成長できる季節の暖かさをまとめた値。", back: [S3] },
    ],
  };
}

export const H_SCI_BIOB_BIOME_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物基礎",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "バイオームと気候", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    {
      title: "暖かさの指数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "shisu", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: shisu },
        { id: "yoso", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: yoso },
      ],
    },
  ],
};
