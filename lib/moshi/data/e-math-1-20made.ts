// 小1算数「20までの数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数は rng から作り、答えは 0〜20 の整数。num は calc (10＋いくつ など) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、正解と同じ文字がまざらないように作り、r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-20made";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_10 = L(1, "10の まとまりを つくる");
const B_KURAI = L(2, "十のくらいと 一のくらい");
const B_JUN = L(3, "じゅんばんと、とびとび");
const B_KEISAN = L(4, "10と いくつの けいさん");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

const YOMI = ["", "いち", "に", "さん", "よん", "ご", "ろく", "なな", "はち", "きゅう"];

function matomari(r: Rng): QuestionBody {
  const b = r.int(1, 10);
  const f = r.pick(["おはじき", "ビー玉", "どんぐり"]);
  return {
    prompt: `${f}が 10こ の まとまりと、ばらで ${b}こ あります。ぜんぶで なんこですか。`,
    answer: num(10 + b, `10+${b}`, "こ"),
    point: "10と いくつで、10いくつ",
    steps: [{ title: "10と いくつ", body: `10の まとまりと ばら ${b}こで、{{${10 + b}}}こ です。`, trap: b < 10 ? `「10${b}」と ならべて かかない。10が 1つで、十のくらいは 1です。` : "ばらが 10こ あるので、10の まとまりが 2つに なります。", back: [B_10] }],
  };
}

function bunkai(r: Rng): QuestionBody {
  const n = r.int(11, 20);
  return {
    prompt: `${n}は 10と いくつですか。`,
    answer: num(n - 10, `${n}-10`),
    point: "十のくらいの 1は、10が 1つ",
    steps: [{ title: "くらいで 見る", body: n === 20 ? "20は 10が 2つ。10と {{10}} です。" : `${n}の 1は 10が 1つ、${n - 10}は ばらが ${n - 10}こ。10と {{${n - 10}}} です。`, back: [B_KURAI] }],
  };
}

function tsugi(r: Rng): QuestionBody {
  if (r.bool()) {
    const a = r.int(10, 19);
    return {
      prompt: `${a}の つぎの かずは いくつですか。`,
      answer: num(a + 1, `${a}+1`),
      point: "つぎの かずは 1つ 大きい かず",
      steps: [{ title: "1つ ふやす", body: `${a}より 1つ 大きい かずは {{${a + 1}}} です。`, ...(a === 19 ? { trap: "19の つぎを「110」と しない。ばらが 10こに なると、10の まとまりが 2つで 20です。" } : {}), back: [B_JUN] }],
    };
  }
  const a = r.int(11, 20);
  return {
    prompt: `${a}の 1つ まえの かずは いくつですか。`,
    answer: num(a - 1, `${a}-1`),
    point: "まえの かずは 1つ 小さい かず",
    steps: [{ title: "1つ もどる", body: `${a}より 1つ 小さい かずは {{${a - 1}}} です。`, back: [B_JUN] }],
  };
}

function juTo(r: Rng): QuestionBody {
  const b = r.int(1, 9);
  if (r.bool()) {
    return {
      prompt: `10＋${b}は いくつですか。`,
      answer: num(10 + b, `10+${b}`),
      point: "10と いくつで、10いくつ",
      steps: [{ title: "10と いくつ", body: `10と ${b}で {{${10 + b}}}。10＋${b}＝${10 + b} です。`, back: [B_KEISAN] }],
    };
  }
  return {
    prompt: `${10 + b}−${b}は いくつですか。`,
    answer: num(10, `${10 + b}-${b}`),
    point: "ばらを とると、10の まとまりが のこる",
    steps: [{ title: "ばらを とる", body: `${10 + b}は 10と ${b}。ばらの ${b}を とると {{10}} が のこります。`, trap: `こたえを ${b}に しない。とるのは ばらの ${b}こだけです。`, back: [B_KEISAN] }],
  };
}

function yomi(r: Rng): QuestionBody {
  const b = r.int(1, 9);
  const n = 10 + b;
  return {
    prompt: r.bool() ? `「じゅう${YOMI[b]}」を すうじで かくと どれですか。` : `「じゅう${YOMI[b]}」と よむ かずは どれですか。`,
    answer: choice(r, [
      [String(n), `10が 1つで 十のくらいは 1、ばらが ${b}こで 一のくらいは ${b}。${n}です。`],
      [`10${b}`, `10と ${b}を ならべて かいた まちがいです。十のくらいは 1だけ かきます。`],
      [`${b}1`, "十のくらいと 一のくらいが ぎゃくです。"],
      [String(n + 1), b === 9 ? "20は「にじゅう」です。" : `${n + 1}は「じゅう${YOMI[b + 1]}」です。`],
    ]),
    point: "左が 十のくらい、右が 一のくらい",
    steps: [{ title: "くらいに かく", body: `「じゅう」は 10が 1つ なので 十のくらいに 1。「${YOMI[b]}」は 一のくらいに ${b}。{{${n}}} です。`, back: [B_KURAI] }],
  };
}

function tobi(r: Rng): QuestionBody {
  const two = r.bool(0.7);
  const st = two ? 2 : 5;
  const start = two ? r.step(0, 12, 2) : 0;
  const seq = Array.from({ length: two ? 5 : 4 }, (_, i) => start + st * (i + (two ? 0 : 1)));
  const k = r.int(1, seq.length - 1);
  const ans = seq[k];
  const shown = seq.map((x, i) => (i === k ? "□" : String(x))).join("、");
  return {
    prompt: `${st}とびで ならんで います。□に はいる かずは いくつですか。\n${shown}`,
    answer: num(ans, `${seq[k - 1]}+${st}`),
    point: `${st}とびは、${st}ずつ ふえる`,
    steps: [{ title: `${st}ずつ ふやす`, body: `${seq[k - 1]}から ${st} ふえて {{${ans}}} です。`, back: [B_JUN] }],
  };
}

export const E_MATH_1_20MADE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 6,
  review: { status: "draft" },
  sections: [
    {
      title: "10と いくつ",
      lead: "つぎの もんだいに こたえなさい。",
      style: "calc",
      questions: [
        { id: "matomari", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: matomari },
        { id: "bunkai", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: bunkai },
        { id: "ju-to", type: "A", difficulty: 2, points: 17, seconds: 45, skill: "知識・技能", generate: juTo },
      ],
    },
    {
      title: "かずの ならびと かきかた",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "tsugi", type: "A", difficulty: 2, points: 17, seconds: 45, skill: "知識・技能", generate: tsugi },
        { id: "yomi", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: yomi },
        { id: "tobi", type: "A", difficulty: 3, points: 21, seconds: 75, skill: "思考・判断・表現", generate: tobi },
      ],
    },
  ],
};
