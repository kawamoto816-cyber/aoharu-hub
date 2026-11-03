// 小2算数「ひき算の筆算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 2けた−2けた・2けた−1けた・何十−2けたを rng から作り、くり下がりの有無を一のくらいで決める (答えは 1 いじょう)。
// num は calc (ひき算そのもの) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、よくある まちがい (ひく じゅんを ぎゃくに・十のくらいを へらしわすれ) から作り、同じ値はのぞいて r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-hiki-hissan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_BARASU = L(1, "ひけない ときは たばを ばらす");
const B_JUN = L(2, "筆算《ひっさん》の じゅんばん");
const B_KURI = L(3, "くり下がりの しかた");
const B_TASHIKAME = L(4, "たし算で たしかめる");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** a − b (どちらも 2けた、答えは 1 いじょう)。borrow: 一のくらいで くり下がる */
function pair(r: Rng, borrow: boolean): [number, number] {
  for (;;) {
    const a = r.int(21, 98);
    const b = r.int(11, 89);
    if (a - b >= 1 && (a % 10 < b % 10) === borrow && b % 10 !== 0) return [a, b];
  }
}

const steps = (a: number, b: number) => {
  const ao = a % 10;
  const bo = b % 10;
  const at = Math.floor(a / 10);
  const bt = Math.floor(b / 10);
  if (ao >= bo)
    return [
      { title: "一のくらい", body: `${ao}−${bo}＝${ao - bo}。`, back: [B_JUN] },
      { title: "十のくらい", body: `${at}−${bt}＝${at - bt}。答えは {{${a - b}}} です。` },
    ];
  return [
    { title: "一のくらい", body: `${ao}から ${bo}は ひけないので、十のくらいから 10を 1つ かります。${10 + ao}−${bo}＝${10 + ao - bo}。`, trap: `${bo}−${ao} と ぎゃくに ひかない。`, back: [B_KURI] },
    { title: "十のくらい", body: `10を かしたので ${at}は ${at - 1}に へって います。${at - 1}${bt ? `−${bt}` : ""}＝${at - 1 - bt}。答えは {{${a - b}}} です。`, trap: "十のくらいを へらしわすれない。" },
    { title: "たしかめ", body: `${a - b}＋${b}＝${a}。ひかれる 数に もどるので 正しいです。`, back: [B_TASHIKAME] },
  ];
};

function nashi(r: Rng): QuestionBody {
  const [a, b] = pair(r, false);
  return { prompt: `筆算《ひっさん》で 計算しなさい。\n${a}−${b}`, answer: num(a - b, `${a}-${b}`), point: "くらいを そろえて、一のくらいから", steps: steps(a, b) };
}

function ari(r: Rng): QuestionBody {
  const [a, b] = pair(r, true);
  return { prompt: `筆算《ひっさん》で 計算しなさい。\n${a}−${b}`, answer: num(a - b, `${a}-${b}`), point: "ひけない ときは、十のくらいから 10を かりる", steps: steps(a, b) };
}

function hitoketa(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(21, 98);
    b = r.int(2, 9);
  } while (a % 10 >= b);
  return {
    prompt: `筆算《ひっさん》で 計算しなさい。\n${a}−${b}`,
    answer: num(a - b, `${a}-${b}`),
    point: "1けたの 数は 一のくらいの 下に",
    steps: [{ title: "右の はしを そろえる", body: `${b}は 一のくらいの 下に 書きます。`, back: [B_JUN] }, ...steps(a, b).slice(0, 2)],
  };
}

function bun(r: Rng): QuestionBody {
  const [a, b] = pair(r, r.bool(0.7));
  const ctx = r.pick([
    { p: `シールが ${a}まい あります。${b}まい つかうと、のこりは 何まいですか。`, u: "まい" },
    { p: `2年生は ${a}人、1年生は ${b}人 います。2年生は 1年生より 何人 多いですか。`, u: "人" },
    { p: `赤い 花が ${a}本、白い 花が ${b}本 さいて います。ちがいは 何本ですか。`, u: "本" },
  ]);
  return {
    prompt: ctx.p,
    answer: num(a - b, `${a}-${b}`, ctx.u),
    point: "「のこり」「ちがい」「何人 多い」は ひき算",
    steps: [{ title: "しきを 書く", body: `のこりや ちがいを もとめるので ひき算。しきは ${a}−${b}。`, back: [B_BARASU] }, ...steps(a, b).slice(0, 2)],
  };
}

function machigai(r: Rng): QuestionBody {
  const [a, b] = pair(r, true);
  const ao = a % 10;
  const bo = b % 10;
  const at = Math.floor(a / 10);
  const bt = Math.floor(b / 10);
  const swap = (at - bt) * 10 + (bo - ao);
  const forget = (at - bt) * 10 + (10 + ao - bo);
  return {
    prompt: `${a}−${b}の 答えは どれですか。`,
    answer: choice(r, [
      [String(a - b), `一のくらい ${10 + ao}−${bo}＝${10 + ao - bo}、十のくらい ${at - 1}−${bt}＝${at - 1 - bt}。${a - b}です。`],
      [String(swap), `一のくらいを ${bo}−${ao} と ぎゃくに ひいて います。上の 数から 下の 数を ひきます。`],
      [String(forget), `10を かしたのに、十のくらいを ${at}−${bt} と して います。${at}は ${at - 1}に へって います。`],
      [String(a + b), "たし算に なって います。"],
    ]),
    point: "ひけない ときは かりる。かした くらいは 1 へる",
    steps: steps(a, b),
  };
}

function tashikame(r: Rng): QuestionBody {
  const [a, b] = pair(r, true);
  const c = a - b;
  return {
    prompt: `${a}−${b}＝${c} の 答えを たしかめる 計算は どれですか。`,
    answer: choice(r, [
      [`${c}＋${b}`, `答え＋ひく数＝ひかれる数。${c}＋${b}＝${a} に なれば 正しいです。`],
      [`${a}＋${b}`, `ひかれる数に ひく数を たしても、たしかめに なりません。`],
      [`${c}−${b}`, "答えから さらに ひいても、もとの 数に もどりません。"],
      [`${a}＋${c}`, `ひかれる数に 答えを たしても、${a}に もどりません。`],
    ]),
    point: "答え＋ひく数＝ひかれる数",
    steps: [{ title: "たし算で たしかめる", body: `{{答え＋ひく数＝ひかれる数}}。${c}＋${b}＝${a} なので 正しいです。`, back: [B_TASHIKAME] }],
  };
}

function nanju(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(3, 9) * 10;
    b = r.int(11, 89);
  } while (b % 10 === 0 || a - b < 1);
  const bt = Math.floor(b / 10);
  const bo = b % 10;
  return {
    prompt: `筆算《ひっさん》で 計算しなさい。\n${a}−${b}`,
    answer: num(a - b, `${a}-${b}`),
    point: "0からも ひけない。十のくらいから かりる",
    steps: [
      { title: "一のくらい", body: `0から ${bo}は ひけないので、十のくらいから 10を かります。10−${bo}＝${10 - bo}。`, trap: `0−${bo}を 0 と しない。`, back: [B_KURI] },
      { title: "十のくらい", body: `${a / 10}は ${a / 10 - 1}に へって います。${a / 10 - 1}${bt ? `−${bt}` : ""}＝${a / 10 - 1 - bt}。答えは {{${a - b}}} です。` },
      { title: "たしかめ", body: `${a - b}＋${b}＝${a}。`, back: [B_TASHIKAME] },
    ],
  };
}

export const E_MATH_2_HIKI_HISSAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "筆算《ひっさん》で 計算する",
      lead: "つぎの 計算を しなさい。",
      style: "calc",
      questions: [
        { id: "nashi", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: nashi },
        { id: "ari", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: ari },
        { id: "hitoketa", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: hitoketa },
      ],
    },
    {
      title: "文しょうの もんだい・たしかめ",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [
        { id: "bun", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: bun },
        { id: "machigai", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: machigai },
        { id: "tashikame", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: tashikame },
      ],
    },
    {
      title: "0から ひく",
      lead: "つぎの 計算を しなさい。",
      style: "calc",
      questions: [{ id: "nanju", type: "A", difficulty: 3, points: 19, seconds: 120, skill: "知識・技能", generate: nanju }],
    },
  ],
};
