// 小1算数「10までの数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数は rng から作り、答えはいつも 0〜10 の整数。num は calc (かぞえる式・たし算・ひき算) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、正解と同じ数がまざらないように作り、r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-10made";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_KAZOERU = L(1, "1つずつ かぞえる");
const B_FUERU = L(2, "かずは 1つずつ ふえる");
const B_5 = L(3, "5の まとまりで 見る");
const B_0 = L(4, "なにも ない ときは 0");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

const MARK = ["●", "▲", "★", "■"];

function kazoeru(r: Rng): QuestionBody {
  const n = r.int(3, 10);
  const m = r.pick(MARK);
  const row = Array.from({ length: n }, () => m).join(" ");
  return {
    prompt: `${m} は いくつ ありますか。\n${row}`,
    answer: num(n, Array.from({ length: n }, () => "1").join("+"), "こ"),
    point: "1つずつ ゆびで さして かぞえる",
    steps: [
      { title: "1つずつ かぞえる", body: `ひだりから 1つずつ ゆびで さして、「1、2、3…」と かぞえます。さいごに いった かずが {{${n}}} です。`, trap: "おなじ ものを 2かい かぞえないように、さした ものに しるしを つけます。", back: [B_KAZOERU] },
    ],
  };
}

function tsugi(r: Rng): QuestionBody {
  if (r.bool()) {
    const a = r.int(1, 9);
    return {
      prompt: `${a}の つぎの かずは いくつですか。`,
      answer: num(a + 1, `${a}+1`),
      point: "つぎの かずは 1つ ふえた かず",
      steps: [{ title: "1つ ふやす", body: `${a}より 1つ 大きい かずが つぎの かずです。${a}の つぎは {{${a + 1}}} です。`, back: [B_FUERU] }],
    };
  }
  const a = r.int(2, 10);
  return {
    prompt: `${a}の 1つ まえの かずは いくつですか。`,
    answer: num(a - 1, `${a}-1`),
    point: "まえの かずは 1つ へった かず",
    steps: [{ title: "1つ もどる", body: `${a}より 1つ 小さい かずが まえの かずです。${a}の まえは {{${a - 1}}} です。`, back: [B_FUERU] }],
  };
}

function goto(r: Rng): QuestionBody {
  if (r.bool()) {
    const n = r.int(6, 10);
    return {
      prompt: `${n}は 5と いくつですか。`,
      answer: num(n - 5, `${n}-5`),
      point: "5の まとまりと、のこりで 見る",
      steps: [{ title: "5の まとまりを 見る", body: `おはじきを ${n}こ ならべて、5こを ひとまとまりに します。のこりは {{${n - 5}}}こ。${n}は 5と ${n - 5}です。`, back: [B_5] }],
    };
  }
  const b = r.int(1, 5);
  return {
    prompt: `5と ${b}で いくつですか。`,
    answer: num(5 + b, `5+${b}`),
    point: "5の まとまりから かぞえる",
    steps: [{ title: "5の つぎから かぞえる", body: `5の まとまりの つぎから、${Array.from({ length: b }, (_, i) => 6 + i).join("、")} と かぞえます。{{${5 + b}}} です。`, back: [B_5] }],
  };
}

function zero(r: Rng): QuestionBody {
  const n = r.int(2, 9);
  const f = r.pick(["みかん", "いちご", "クッキー", "あめ"]);
  return {
    prompt: `${f}が ${n}こ あります。1こずつ たべて、ぜんぶ たべました。のこりは なんこですか。`,
    answer: num(0, `${n}-${n}`, "こ"),
    point: "1つも ない ときは 0",
    steps: [{ title: "なにも ない ときは 0", body: `ぜんぶ たべたので、${f}は 1つも のこって いません。1つも ない ときは {{0}}こ です。`, trap: "「かずが ない」と しない。0も かずの なかまです。", back: [B_0] }],
  };
}

function okii(r: Rng): QuestionBody {
  const ns = r.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4);
  const mx = Math.max(...ns);
  const big = r.bool();
  const ans = big ? mx : Math.min(...ns);
  return {
    prompt: `${ns.join("、")} の なかで、いちばん ${big ? "大きい" : "小さい"} かずは どれですか。`,
    answer: choice(r, [
      [String(ans), `${ans}は、ほかの どの かずより ${big ? "あと" : "まえ"}に でて きます。いちばん ${big ? "大きい" : "小さい"} かずです。`],
      ...ns.filter((x) => x !== ans).map((x): [string, string] => [String(x), `${x}より ${ans}の ほうが ${big ? "大きい" : "小さい"}です。`]),
    ]),
    point: "かずの ならびで、あとに でる ほうが 大きい",
    steps: [{ title: "ならびで くらべる", body: `0、1、2、3…と じゅんに いうと、${big ? "いちばん あとに" : "いちばん はじめに"} でて くるのは {{${ans}}} です。`, back: [B_FUERU] }],
  };
}

function narabi(r: Rng): QuestionBody {
  const up = r.bool();
  const start = up ? r.int(0, 6) : r.int(4, 10);
  const seq = Array.from({ length: 5 }, (_, i) => (up ? start + i : start - i));
  const k = r.int(1, 3);
  const ans = seq[k];
  const shown = seq.map((x, i) => (i === k ? "□" : String(x))).join("、");
  return {
    prompt: `□に はいる かずは いくつですか。\n${shown}`,
    answer: num(ans, up ? `${seq[k - 1]}+1` : `${seq[k - 1]}-1`),
    point: up ? "1つずつ ふえる ならび" : "1つずつ へる ならび",
    steps: [
      { title: "ふえるか へるかを 見る", body: `${k >= 2 ? `${seq[0]}、${seq[1]}` : `${seq[2]}、${seq[3]}`} と 見ると、かずが 1つずつ {{${up ? "ふえて" : "へって"}}} います。`, back: [B_FUERU] },
      { title: "□を きめる", body: `${seq[k - 1]}の ${up ? "つぎ" : "1つ まえ"}なので、□は {{${ans}}} です。`, ...(up ? {} : { trap: "大きい じゅんに ならんで いる ことに きを つけます。" }) },
    ],
  };
}

export const E_MATH_1_10MADE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 6,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "かずを かぞえる",
      lead: "つぎの もんだいに こたえなさい。",
      style: "calc",
      questions: [
        { id: "kazoeru", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: kazoeru },
        { id: "tsugi", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: tsugi },
      ],
    },
    {
      title: "5の まとまりと 0",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "goto", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: goto },
        { id: "zero", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: zero },
      ],
    },
    {
      title: "かずの 大きさと ならび",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "okii", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: okii },
        { id: "narabi", type: "A", difficulty: 3, points: 21, seconds: 75, skill: "思考・判断・表現", generate: narabi },
      ],
    },
  ],
};
