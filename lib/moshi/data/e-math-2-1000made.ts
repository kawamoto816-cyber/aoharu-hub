// 小2算数「1000までの数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数は 百・十・一の くらいの 数字から作る (100×百＋10×十＋一)。num は calc で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 漢数字の読み (四百五 など) と 不等号は選択肢。漢数字は くらいの 数字から組み立てる (1 のときは「百」「十」だけ)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-1000made";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_KURAI = L(1, "百のくらいが ふえる");
const B_0 = L(2, "ない くらいには 0を 書く");
const B_1000 = L(3, "1000は 100が 10こ");
const B_KURABE = L(4, "大きい くらいから くらべる");
const B_NANBYAKU = L(5, "何百の 計算は 100の 数で");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

const KAN = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
/** 3けたまでの数 → 漢数字 (405 → 四百五) */
function kansuji(n: number): string {
  const h = Math.floor(n / 100);
  const t = Math.floor(n / 10) % 10;
  const o = n % 10;
  return `${h ? `${h === 1 ? "" : KAN[h]}百` : ""}${t ? `${t === 1 ? "" : KAN[t]}十` : ""}${KAN[o]}`;
}

function atsumeru(r: Rng): QuestionBody {
  const h = r.int(1, 9);
  const t = r.int(0, 9);
  const o = r.int(0, 9);
  const parts = [`100を ${h}こ`, t ? `10を ${t}こ` : "", o ? `1を ${o}こ` : ""].filter(Boolean).join("、");
  const n = 100 * h + 10 * t + o;
  return {
    prompt: `${parts} あわせた 数は いくつですか。`,
    answer: num(n, `100*${h}+10*${t}+${o}`),
    point: "100の数は 百のくらい、10の数は 十のくらい",
    steps: [{ title: "くらいに 書く", body: `百のくらいに ${h}、十のくらいに ${t}、一のくらいに ${o}。{{${n}}} です。`, ...(t === 0 || o === 0 ? { trap: "ない くらいには 0を 書きます。" } : {}), back: [t && o ? B_KURAI : B_0] }],
  };
}

function nanbyaku(r: Rng): QuestionBody {
  if (r.bool()) {
    const a = r.int(1, 8);
    const b = r.int(1, 10 - a);
    return {
      prompt: `${a}00＋${b}00を 計算しなさい。`,
      answer: num(100 * (a + b), `${a}00+${b}00`),
      point: "100が いくつ分かで 考える",
      steps: [{ title: "100の 数で", body: `100が ${a}こと ${b}こで ${a + b}こ。{{${100 * (a + b)}}} です。`, back: [B_NANBYAKU] }],
    };
  }
  const a = r.int(3, 10);
  const b = r.int(1, a - 1);
  return {
    prompt: `${a * 100}−${b}00を 計算しなさい。`,
    answer: num(100 * (a - b), `${a * 100}-${b}00`),
    point: "100が いくつ分かで 考える",
    steps: [{ title: "100の 数で", body: `100が ${a}こから ${b}こ ひいて ${a - b}こ。{{${100 * (a - b)}}} です。`, back: [B_NANBYAKU] }],
  };
}

function kurai(r: Rng): QuestionBody {
  const n = r.int(101, 999);
  const k = r.int(0, 2);
  const nm = ["百", "十", "一"][k];
  const d = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10][k];
  const calc = [`(${n}-${n % 100})/100`, `(${n % 100}-${n % 10})/10`, `${n}-${n - (n % 10)}`][k];
  return {
    prompt: `${n}の ${nm}のくらいの 数字は 何ですか。`,
    answer: num(d, calc),
    point: "左から 百・十・一の くらい",
    steps: [{ title: "くらいを 見る", body: `${n}は 左から 百のくらい ${Math.floor(n / 100)}、十のくらい ${Math.floor(n / 10) % 10}、一のくらい ${n % 10}。答えは {{${d}}} です。`, back: [B_KURAI] }],
  };
}

function kanji(r: Rng): QuestionBody {
  const h = r.int(2, 9);
  const zeroTen = r.bool();
  const t = zeroTen ? 0 : r.int(2, 9);
  const o = zeroTen ? r.int(1, 9) : 0;
  const n = 100 * h + 10 * t + o;
  const items: [string, string][] = [[String(n), `百のくらい ${h}、十のくらい ${t}、一のくらい ${o}。ない くらいに 0を 書いて ${n}です。`]];
  if (zeroTen) {
    items.push([`${h}${o}`, "十のくらいの 0を わすれて います。"]);
    items.push([`${h}00${o}`, `「百」を 00 と 書いて しまって います。くらいは 3つだけです。`]);
    items.push([`${h}${o}0`, "一のくらいと 十のくらいが ずれて います。"]);
  } else {
    items.push([`${h}${t}`, "一のくらいの 0を わすれて います。"]);
    items.push([`${h}0${t}0`, "「百」と「十」を それぞれ 00、0 と 書いて います。"]);
    items.push([`${h}0${t}`, `${h}0${t}は「${kansuji(100 * h + t)}」です。`]);
  }
  return {
    prompt: `「${kansuji(n)}」を 数字で 書くと どれですか。`,
    answer: choice(r, items),
    point: "ない くらいには 0を 書く",
    steps: [{ title: "くらいに 分けて 書く", body: `百・十・一の 3つの くらいを 書き、${zeroTen ? "十" : "一"}のくらいに 0を 入れます。{{${n}}} です。`, back: [B_0] }],
  };
}

function kurabe(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    const h = r.int(1, 9);
    a = 100 * h + r.int(0, 99);
    b = r.bool(0.7) ? 100 * h + r.int(0, 99) : r.int(100, 999);
  } while (a === b);
  const s = a > b ? "＞" : "＜";
  return {
    prompt: `□に 入る しるしは どちらですか。\n${a} □ ${b}`,
    answer: choice(r, [
      [s, `${a > b ? a : b}の ほうが 大きいので、${a} ${s} ${b} です。`],
      [s === "＞" ? "＜" : "＞", `${a > b ? a : b}の ほうが 大きいので、ひらいた 口は ${a > b ? "左" : "右"}に むけます。`],
    ]),
    point: "大きい くらいから じゅんに くらべる",
    steps: [{ title: "百のくらいから", body: Math.floor(a / 100) === Math.floor(b / 100) ? `百のくらいは どちらも ${Math.floor(a / 100)}。${Math.floor(a / 10) % 10 === Math.floor(b / 10) % 10 ? "十のくらいも 同じなので、一のくらいで" : "十のくらいで"} くらべます。{{${Math.max(a, b)}}}の ほうが 大きい。` : `百のくらいが ${Math.floor(a / 100)}と ${Math.floor(b / 100)}。{{${Math.max(a, b)}}}の ほうが 大きい。`, back: [B_KURABE] }],
  };
}

function juko(r: Rng): QuestionBody {
  const n = r.int(11, 99) * 10;
  return {
    prompt: `${n}は、10を 何こ あつめた 数ですか。`,
    answer: num(n / 10, `${n}/10`, "こ"),
    point: "100は 10が 10こ",
    steps: [
      { title: "百と 十に 分ける", body: `${n}は 100が ${Math.floor(n / 100)}こと 10が ${(n / 10) % 10}こ。100は 10が 10こなので、${Math.floor(n / 100)}00は 10が ${Math.floor(n / 100) * 10}こ。`, back: [B_1000] },
      { title: "あわせる", body: `${Math.floor(n / 100) * 10}＋${(n / 10) % 10}＝{{${n / 10}}}。10を ${n / 10}こ あつめた 数です。` },
    ],
  };
}

function ato1000(r: Rng): QuestionBody {
  const n = r.bool() ? r.int(1, 9) * 100 : r.int(91, 99) * 10;
  return {
    prompt: `${n}は、あと いくつで 1000に なりますか。`,
    answer: num(1000 - n, `1000-${n}`),
    point: "1000は 100が 10こ、10が 100こ",
    steps:
      n % 100 === 0
        ? [{ title: "100の 数で", body: `${n}は 100が ${n / 100}こ。1000は 100が 10こ。あと 100が ${10 - n / 100}こで {{${1000 - n}}} です。`, back: [B_1000] }]
        : [
            { title: "10の 数で", body: `${n}は 10が ${n / 10}こ。1000は 10が 100こ。`, back: [B_1000] },
            { title: "のこり", body: `あと 10が ${100 - n / 10}こで {{${1000 - n}}} です。` },
          ],
  };
}

export const E_MATH_2_1000MADE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "3けたの 数",
      lead: "つぎの もんだいに 答えなさい。",
      style: "calc",
      questions: [
        { id: "atsumeru", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: atsumeru },
        { id: "kurai", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: kurai },
        { id: "nanbyaku", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: nanbyaku },
      ],
    },
    {
      title: "数の 書き方と 大きさ",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [
        { id: "kanji", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: kanji },
        { id: "kurabe", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "思考・判断・表現", generate: kurabe },
        { id: "juko", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: juko },
      ],
    },
    {
      title: "1000",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [{ id: "ato1000", type: "A", difficulty: 3, points: 19, seconds: 90, skill: "思考・判断・表現", generate: ato1000 }],
    },
  ],
};
