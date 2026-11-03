// 小2算数「10000までの数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数は 千・百・十・一の くらいの 数字から作る (1000×千＋100×百＋10×十＋一)。num は calc で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 漢数字は くらいの 数字から組み立てる (1 のときは「千」「百」「十」だけ)。カードの問題は、数字を大きいじゅんに並べた数を calc の式で作る。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-10000made";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_SEN = L(1, "千のくらいが できる");
const B_0 = L(2, "ないくらいには 0 を書く");
const B_MAN = L(3, "1000が10こで 10000");
const B_KURABE = L(4, "大きさくらべは 上のくらいから");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

const KAN = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const UNIT_K = ["千", "百", "十", ""];
const digits = (n: number) => [Math.floor(n / 1000), Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
/** 4けたまでの数 → 漢数字 (3256 → 三千二百五十六、4060 → 四千六十) */
const kansuji = (n: number) => digits(n).map((d, i) => (d === 0 ? "" : i < 3 && d === 1 ? UNIT_K[i] : KAN[d] + UNIT_K[i])).join("");

function atsumeru(r: Rng): QuestionBody {
  const [a, b, c, d] = [r.int(1, 9), r.int(0, 9), r.int(0, 9), r.int(0, 9)];
  const parts = [`1000を ${a}こ`, b ? `100を ${b}こ` : "", c ? `10を ${c}こ` : "", d ? `1を ${d}こ` : ""].filter(Boolean).join("、");
  const n = 1000 * a + 100 * b + 10 * c + d;
  return {
    prompt: `${parts} あわせた 数は いくつですか。`,
    answer: num(n, `1000*${a}+100*${b}+10*${c}+${d}`),
    point: "千・百・十・一の くらいに 数字を 書く",
    steps: [{ title: "くらいに 書く", body: `千のくらい ${a}、百のくらい ${b}、十のくらい ${c}、一のくらい ${d}。{{${n}}} です。`, ...(b && c && d ? {} : { trap: "ない くらいには 0を 書きます。" }), back: [b && c && d ? B_SEN : B_0] }],
  };
}

function yomi(r: Rng): QuestionBody {
  const n = r.int(1001, 9999);
  const [a, b, c, d] = digits(n);
  return {
    prompt: `「${kansuji(n)}」を 数字で 書きなさい。`,
    answer: num(n, `1000*${a}+100*${b}+10*${c}+${d}`),
    point: "千・百・十・一の 4つの くらいを 作る",
    steps: [{ title: "くらいごとに 読む", body: `千のくらい ${a}、百のくらい ${b}、十のくらい ${c}、一のくらい ${d}。{{${n}}} です。`, ...(b && c && d ? {} : { trap: "読まない くらいには 0を 書きます。" }), back: [B_SEN] }],
  };
}

function zero(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const pat = r.int(0, 2);
  const [b, c, d] = pat === 0 ? [0, r.int(2, 9), 0] : pat === 1 ? [r.int(2, 9), 0, 0] : [0, 0, r.int(1, 9)];
  const n = 1000 * a + 100 * b + 10 * c + d;
  const nz = digits(n).filter((x) => x).join("");
  return {
    prompt: `「${kansuji(n)}」を 数字で 書くと どれですか。`,
    answer: choice(r, [
      [String(n), `千・百・十・一の くらいを 作り、ない くらいに 0を 書いて ${n}です。`],
      [nz, "ない くらいの 0を 書いて いません。"],
      [`${a}000${String(n).slice(1).replace(/^0+/, "")}`, "「千」を 000 と 書いて から、のこりを つなげて います。"],
      [String(n * 10), "0が 1つ 多いです。くらいは 4つだけです。"],
    ]),
    point: "ない くらいには 0を 書く",
    steps: [{ title: "4つの くらい", body: `千 ${a}、百 ${b}、十 ${c}、一 ${d}。{{${n}}} です。`, back: [B_0] }],
  };
}

function hyaku(r: Rng): QuestionBody {
  const n = r.int(11, 99) * 100;
  return {
    prompt: `${n}は、100を 何こ あつめた 数ですか。`,
    answer: num(n / 100, `${n}/100`, "こ"),
    point: "1000は 100が 10こ",
    steps: [
      { title: "千と 百に 分ける", body: `${n}は 1000が ${Math.floor(n / 1000)}こと 100が ${(n / 100) % 10}こ。1000は 100が 10こなので、${Math.floor(n / 1000)}000は 100が ${Math.floor(n / 1000) * 10}こ。`, back: [B_MAN] },
      { title: "あわせる", body: `${Math.floor(n / 1000) * 10}＋${(n / 100) % 10}＝{{${n / 100}}}。` },
    ],
  };
}

function kurabe(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(1000, 9999);
    const same = r.int(1, 3); // 上から何けた同じにするか
    const p = 10 ** (4 - same);
    b = Math.floor(a / p) * p + r.int(0, p - 1);
  } while (a === b);
  const s = a > b ? "＞" : "＜";
  const da = digits(a);
  const db = digits(b);
  const k = da.findIndex((x, i) => x !== db[i]);
  const nm = ["千", "百", "十", "一"][k];
  return {
    prompt: `□に 入る しるしは どちらですか。\n${a} □ ${b}`,
    answer: choice(r, [
      [s, `${nm}のくらいで ${da[k]}と ${db[k]}。${Math.max(a, b)}の ほうが 大きいので ${a} ${s} ${b}。`],
      [s === "＞" ? "＜" : "＞", `${Math.max(a, b)}の ほうが 大きい 数です。ひらいた 口を 大きい ほうに むけます。`],
    ]),
    point: "上の くらいから じゅんに くらべる",
    steps: [{ title: "上の くらいから", body: `${k ? `${["千", "百", "十"].slice(0, k).join("・")}のくらいは 同じ。` : ""}${nm}のくらいが ${da[k]}と ${db[k]}なので、{{${Math.max(a, b)}}}の ほうが 大きい。`, back: [B_KURABE] }],
  };
}

function ato(r: Rng): QuestionBody {
  const n = r.bool() ? r.int(1, 9) * 1000 : r.int(91, 99) * 100;
  return {
    prompt: `${n}は、あと いくつで 10000に なりますか。`,
    answer: num(10000 - n, `10000-${n}`),
    point: "10000は 1000が 10こ、100が 100こ",
    steps:
      n % 1000 === 0
        ? [{ title: "1000の 数で", body: `${n}は 1000が ${n / 1000}こ。10000は 1000が 10こ。あと 1000が ${10 - n / 1000}こで {{${10000 - n}}} です。`, back: [B_MAN] }]
        : [{ title: "100の 数で", body: `${n}は 100が ${n / 100}こ。10000は 100が 100こ。あと 100が ${100 - n / 100}こで {{${10000 - n}}} です。`, back: [B_MAN] }],
  };
}

function card(r: Rng): QuestionBody {
  const ds = r.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4);
  const big = r.bool();
  const sorted = [...ds].sort((x, y) => (big ? y - x : x - y));
  if (!big && sorted[0] === 0) [sorted[0], sorted[1]] = [sorted[1], sorted[0]];
  const n = Number(sorted.join(""));
  return {
    prompt: `${ds.join("、")} の 4まいの カードを 1回ずつ ならべて、4けたの 数を 作ります。いちばん ${big ? "大きい" : "小さい"} 数は いくつですか。`,
    answer: num(n, `1000*${sorted[0]}+100*${sorted[1]}+10*${sorted[2]}+${sorted[3]}`),
    point: "上の くらいほど、" + (big ? "大きい" : "小さい") + " 数字を おく",
    steps: [
      { title: "上の くらいから きめる", body: `${big ? "大きい" : "小さい"} 数に するには、千のくらいに いちばん ${big ? "大きい" : "小さい"} 数字を おきます。`, ...(!big && ds.includes(0) ? { trap: "千のくらいに 0は おけません（4けたに なりません）。0は 百のくらいに おきます。" } : {}), back: [B_KURABE] },
      { title: "ならべる", body: `千・百・十・一の じゅんに ${sorted.join("、")}。{{${n}}} です。` },
    ],
  };
}

export const E_MATH_2_10000MADE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "4けたの 数",
      lead: "つぎの もんだいに 答えなさい。",
      style: "calc",
      questions: [
        { id: "atsumeru", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: atsumeru },
        { id: "yomi", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: yomi },
        { id: "zero", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: zero },
      ],
    },
    {
      title: "数の しくみと 大きさ",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [
        { id: "hyaku", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: hyaku },
        { id: "kurabe", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: kurabe },
        { id: "ato", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: ato },
      ],
    },
    {
      title: "カードで 数を 作る",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [{ id: "card", type: "A", difficulty: 3, points: 19, seconds: 120, skill: "思考・判断・表現", generate: card }],
    },
  ],
};
