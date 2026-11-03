// 小1算数「100までの数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数は「10の まとまりの かず」と「ばらの かず」から作る (10×まとまり＋ばら)。num は calc で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、よくある まちがい (407 と かく・くらいを ぎゃくに) から作り、同じ文字はのぞいて r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-100made";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_MATOMARI = L(1, "10の まとまりを つくる");
const B_KURAI = L(2, "十のくらい と 一のくらい");
const B_100 = L(3, "100は 10が 10こ");
const B_KURABE = L(4, "どちらが 大きい？");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

const TEN = ["", "じゅう", "にじゅう", "さんじゅう", "よんじゅう", "ごじゅう", "ろくじゅう", "ななじゅう", "はちじゅう", "きゅうじゅう"];
const ONE = ["", "いち", "に", "さん", "よん", "ご", "ろく", "なな", "はち", "きゅう"];

function matomari(r: Rng): QuestionBody {
  const t = r.int(2, 9);
  const o = r.int(0, 9);
  const f = r.pick(["ビーズ", "おはじき", "ストロー"]);
  return {
    prompt: o ? `${f}を 10こずつ まとめたら、まとまりが ${t}つと ばらが ${o}こ できました。ぜんぶで なんこですか。` : `${f}を 10こずつ まとめたら、まとまりが ちょうど ${t}つ できました。ぜんぶで なんこですか。`,
    answer: num(10 * t + o, `10*${t}+${o}`, "こ"),
    point: "まとまりの かずは 十のくらい、ばらは 一のくらい",
    steps: [{ title: "くらいに かく", body: `10の まとまり ${t}つで 十のくらいは ${t}。ばら ${o}こで 一のくらいは ${o}。{{${10 * t + o}}}こです。`, ...(o === 0 ? { trap: `ばらが ない ときも 一のくらいに 0を かきます。「${t}」だけに しない。` } : {}), back: [o ? B_MATOMARI : B_KURAI] }],
  };
}

function kurai(r: Rng): QuestionBody {
  const t = r.int(1, 9);
  const o = r.int(1, 9);
  const n = 10 * t + o;
  const ju = r.bool();
  return {
    prompt: `${n}の ${ju ? "十" : "一"}のくらいの すうじは なんですか。`,
    answer: num(ju ? t : o, ju ? `(${n}-${o})/10` : `${n}-10*${t}`),
    point: "左が 十のくらい、右が 一のくらい",
    steps: [{ title: "くらいを 見る", body: `${n}は 10が ${t}つと ばらが ${o}こ。左の ${t}が 十のくらい、右の ${o}が 一のくらい。こたえは {{${ju ? t : o}}} です。`, back: [B_KURAI] }],
  };
}

function yomi(r: Rng): QuestionBody {
  const t = r.int(2, 9);
  const o = r.int(0, 9);
  const n = 10 * t + o;
  const items: [string, string][] = [[String(n), `十のくらいに ${t}、一のくらいに ${o}を かいて ${n}です。`]];
  if (o) {
    items.push([`${t}0${o}`, `「${TEN[t]}」を 「${t}0」と かいて しまった まちがい。十のくらいに ${t}を かくだけです。`]);
    if (o !== t) items.push([`${o}${t}`, "十のくらいと 一のくらいが ぎゃくです。"]);
    items.push([`${t}${o === 9 ? 8 : o + 1}`, `${t}${o === 9 ? 8 : o + 1}は「${TEN[t]}${ONE[o === 9 ? 8 : o + 1]}」です。`]);
  } else {
    items.push([String(t), `ばらが ない ときも 一のくらいに 0を かきます。${t}は「${ONE[t]}」です。`]);
    items.push([`${t}00`, `${t}00は 100より 大きい かずです。`]);
    items.push([`1${t}`, `1${t}は「じゅう${ONE[t]}」です。`]);
  }
  return {
    prompt: `「${TEN[t]}${ONE[o]}」を すうじで かくと どれですか。`,
    answer: choice(r, items),
    point: "十のくらいと 一のくらいに 1つずつ かく",
    steps: [{ title: "くらいに わける", body: `「${TEN[t]}」は 10が ${t}つ → 十のくらいに ${t}。${o ? `「${ONE[o]}」は 一のくらいに ${o}` : "ばらは ない → 一のくらいに 0"}。{{${n}}} です。`, back: [B_KURAI] }],
  };
}

function ato100(r: Rng): QuestionBody {
  if (r.bool()) {
    const t = r.int(1, 9);
    return {
      prompt: `${10 * t}は、あと いくつで 100に なりますか。`,
      answer: num(100 - 10 * t, `100-${10 * t}`),
      point: "100は 10の まとまりが 10こ",
      steps: [{ title: "10の まとまりで かんがえる", body: `${10 * t}は 10が ${t}こ。100は 10が 10こ。あと 10が ${10 - t}こで {{${100 - 10 * t}}} です。`, back: [B_100] }],
    };
  }
  const n = r.int(91, 99);
  return {
    prompt: `${n}は、あと いくつで 100に なりますか。`,
    answer: num(100 - n, `100-${n}`),
    point: "99の つぎが 100",
    steps: [{ title: "1つずつ かぞえる", body: `${n}から ${Array.from({ length: 100 - n }, (_, i) => n + i + 1).join("、")} と かぞえて、{{${100 - n}}} です。`, back: [B_100] }],
  };
}

function kurabe(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(21, 98);
    b = (a % 10) * 10 + Math.floor(a / 10); // くらいを入れかえた数
  } while (a % 10 === 0 || a % 10 === Math.floor(a / 10));
  const c = a + (r.bool() ? 10 : -10);
  const d = Math.floor(a / 10) * 10 + ((a % 10) + 5) % 10;
  const ns = [...new Set([a, b, c, d])].filter((x) => x >= 10 && x <= 99);
  const big = Math.max(...ns);
  return {
    prompt: `${ns.join("、")} の なかで、いちばん 大きい かずは どれですか。`,
    answer: choice(r, [
      [String(big), `十のくらいが いちばん 大きいのは ${big}です。`],
      ...ns.filter((x) => x !== big).map((x): [string, string] => [String(x), Math.floor(x / 10) === Math.floor(big / 10) ? `十のくらいは おなじ。一のくらいは ${big % 10}の ほうが 大きいので、${big}が 大きい。` : `十のくらいが ${Math.floor(x / 10)}で、${big}の ${Math.floor(big / 10)}より 小さい。`]),
    ]),
    point: "さきに 十のくらいを くらべる",
    steps: [{ title: "十のくらいから", body: `まず 十のくらいを くらべます。いちばん 大きい かずは {{${big}}} です。`, trap: "一のくらいの 大きさだけで きめない。", back: [B_KURABE] }],
  };
}

function bara(r: Rng): QuestionBody {
  const t = r.int(3, 7);
  const o = r.int(10, 15);
  const n = 10 * t + o;
  return {
    prompt: `10の まとまりが ${t}つと、ばらが ${o}こ あります。ぜんぶで いくつですか。`,
    answer: num(n, `10*${t}+${o}`),
    point: "ばらが 10こ いじょう なら、まとまりを つくる",
    steps: [
      { title: "ばらで まとまりを つくる", body: `ばら ${o}こは、10の まとまり 1つと ばら ${o - 10}こ。`, back: [B_MATOMARI] },
      { title: "かずに する", body: `まとまりは ${t}＋1＝${t + 1}つ、ばらは ${o - 10}こ。{{${n}}} です。`, trap: `「${t}${o}」と ならべて かかない。1つの くらいには すうじを 1つ。`, back: [B_KURAI] },
    ],
  };
}

export const E_MATH_1_100MADE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 7,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "10の まとまりと くらい",
      lead: "つぎの もんだいに こたえなさい。",
      style: "calc",
      questions: [
        { id: "matomari", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: matomari },
        { id: "kurai", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: kurai },
        { id: "yomi", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: yomi },
      ],
    },
    {
      title: "100と、かずの 大きさ",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "ato100", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: ato100 },
        { id: "kurabe", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: kurabe },
        { id: "bara", type: "A", difficulty: 3, points: 21, seconds: 90, skill: "思考・判断・表現", generate: bara },
      ],
    },
  ],
};
