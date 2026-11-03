// 小2算数「水のかさ（L・dL・mL）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// かさは dL にそろえた値 (10×L＋dL) で作り、num は calc (1L＝10dL、1L＝1000mL、1dL＝100mL) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// ○L○dL で答える問題は選択肢にし、正解は dL にそろえた値から作る (よくある まちがい: 1L＝100dL・10dL を 1L に なおしわすれ)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-kasa";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_DL = L(1, "1dLますで、いくつ分かを 数える");
const B_3 = L(2, "L・dL・mL の 3つの たんい");
const B_23 = L(3, "2L3dL は 23dL");
const B_TASU = L(4, "たし算は、同じ たんいどうし");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** dL の数 → 「2L3dL」(dL が 0 なら「2L」、L が 0 なら「7dL」) */
const ldl = (x: number) => (x < 10 ? `${x}dL` : `${Math.floor(x / 10)}L${x % 10 ? `${x % 10}dL` : ""}`);

function lToDl(r: Rng): QuestionBody {
  const l = r.int(2, 9);
  if (r.bool()) {
    return {
      prompt: `${l}Lは 何dLですか。`,
      answer: num(10 * l, `10*${l}`, "dL"),
      point: "1L＝10dL",
      steps: [{ title: "1L＝10dL", body: `1dLますで 10ぱい分が 1L。${l}Lは 10dLの ${l}つ分で {{${10 * l}dL}} です。`, trap: "1L＝100dL と しない。", back: [B_DL] }],
    };
  }
  return {
    prompt: `${10 * l}dLは 何Lですか。`,
    answer: num(l, `${10 * l}/10`, "L"),
    point: "10dL＝1L",
    steps: [{ title: "10dLで 1L", body: `${10 * l}dLは 10dLの ${l}つ分。10dL＝1Lなので {{${l}L}} です。`, back: [B_DL] }],
  };
}

function ldlToDl(r: Rng): QuestionBody {
  const l = r.int(1, 6);
  const d = r.int(1, 9);
  return {
    prompt: `${l}L${d}dLは 何dLですか。`,
    answer: num(10 * l + d, `10*${l}+${d}`, "dL"),
    point: "Lを dLに なおして、のこりの dLを たす",
    steps: [{ title: "Lを dLに", body: `${l}L＝${10 * l}dL。${10 * l}dLと ${d}dLで {{${10 * l + d}dL}} です。`, back: [B_23] }],
  };
}

function dlToL(r: Rng): QuestionBody {
  const l = r.int(1, 6);
  const d = r.int(1, 9);
  const v = 10 * l + d;
  return {
    prompt: `${v}dLは、${l}Lと 何dLですか。`,
    answer: num(d, `${v}-10*${l}`, "dL"),
    point: "10dLずつ まとめて 1L",
    steps: [{ title: "10dLずつ まとめる", body: `${l}Lは ${10 * l}dL。のこりは ${v}−${10 * l}＝{{${d}}}。${v}dL＝${l}L${d}dL です。`, back: [B_23] }],
  };
}

function ml(r: Rng): QuestionBody {
  if (r.bool()) {
    const d = r.int(2, 9);
    return {
      prompt: `${d}dLは 何mLですか。`,
      answer: num(100 * d, `100*${d}`, "mL"),
      point: "1dL＝100mL",
      steps: [{ title: "1dL＝100mL", body: `1dLは 100mL。${d}dLは 100mLの ${d}つ分で {{${100 * d}mL}} です。`, back: [B_3] }],
    };
  }
  const l = r.int(1, 5);
  return {
    prompt: `${l}Lは 何mLですか。`,
    answer: num(1000 * l, `1000*${l}`, "mL"),
    point: "1L＝1000mL",
    steps: [{ title: "1L＝1000mL", body: `1Lは 1000mL。${l}Lは {{${1000 * l}mL}} です。`, trap: "1L＝10dL と まぜない。mLに するときは 1000です。", back: [B_3] }],
  };
}

function tasu(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(11, 39);
    b = r.int(3, 9);
  } while ((a % 10) + b < 10 || a % 10 === 0);
  const s = a + b;
  const what = r.pick(["やかんに", "水そうに", "なべに"]);
  return {
    prompt: `${what} 水が ${ldl(a)} 入って います。そこへ ${b}dL 入れると、何L何dLに なりますか。`,
    answer: choice(r, [
      [ldl(s), `dLどうし ${a % 10}＋${b}＝${(a % 10) + b}dL。10dLを 1Lに なおして ${ldl(s)}です。`],
      [`${Math.floor(a / 10)}L${(a % 10) + b}dL`, `${(a % 10) + b}dLの 中の 10dLを 1Lに なおして いません。`],
      [ldl(s - 10), "なおした 1Lを たしわすれて います。"],
      [`${Math.floor(a / 10) + b}L${a % 10}dL`, "dLを Lに たして しまって います。同じ たんいどうしを たします。"],
    ]),
    point: "dLが 10を こえたら、10dLを 1Lに",
    steps: [
      { title: "同じ たんいどうし", body: `dLどうしを たします。${a % 10}＋${b}＝${(a % 10) + b}（dL）。`, back: [B_TASU] },
      { title: "10dLを 1Lに", body: `${(a % 10) + b}dL＝1L${(a % 10) + b - 10 ? `${(a % 10) + b - 10}dL` : ""}。答えは {{${ldl(s)}}} です。` },
    ],
  };
}

function kurabe(r: Rng): QuestionBody {
  let l = 0;
  let d = 0;
  do {
    l = r.int(1, 4);
    d = r.int(11, 49);
  } while (d === 10 * l || Math.abs(d - 10 * l) > 12);
  const win = 10 * l > d ? `${l}L` : `${d}dL`;
  return {
    prompt: `ペットボトルAには ${l}L、ペットボトルBには ${d}dLの 水が 入って います。どちらが 多いですか。`,
    answer: choice(r, [
      [10 * l > d ? "A" : "B", `${l}L＝${10 * l}dL。${10 * l}dLと ${d}dLで、${win}の ほうが 多い。`],
      [10 * l > d ? "B" : "A", `たんいを dLに そろえると、${l}L＝${10 * l}dL。${win}の ほうが 多い。`],
      ["同じ", `${10 * l}dLと ${d}dLで、同じでは ありません。`],
    ]),
    point: "たんいを そろえてから くらべる",
    steps: [
      { title: "dLに そろえる", body: `${l}L＝${10 * l}dL。`, back: [B_23] },
      { title: "くらべる", body: `${10 * l}dLと ${d}dL。{{${10 * l > d ? "A" : "B"}}}の ほうが 多い。`, trap: `${l}と ${d}の 数だけで くらべない。たんいが ちがいます。` },
    ],
  };
}

function hiku(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(12, 39);
    b = r.int(3, 9);
  } while (a % 10 >= b || a % 10 === 0);
  const d = a - b;
  return {
    prompt: `水とうに お茶が ${ldl(a)} 入って います。${b}dL のみました。のこりは 何dLですか。`,
    answer: num(d, `${a}-${b}`, "dL"),
    point: "dLに そろえてから ひく",
    steps: [
      { title: "dLに そろえる", body: `${ldl(a)}＝${a}dL。`, back: [B_23] },
      { title: "ひく", body: `${a}−${b}＝{{${d}}}。のこりは ${d}dL（${ldl(d)}）です。`, trap: `${a % 10}dLから ${b}dLは ひけないので、そのままでは 計算できません。dLに そろえます。` },
    ],
  };
}

export const E_MATH_2_KASA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "L・dL・mL",
      lead: "つぎの もんだいに 答えなさい。",
      style: "calc",
      questions: [
        { id: "l-dl", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: lToDl },
        { id: "ldl-dl", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: ldlToDl },
        { id: "dl-l", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: dlToL },
        { id: "ml", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: ml },
      ],
    },
    {
      title: "かさの 計算と くらべ方",
      lead: "つぎの もんだいに 答えなさい。",
      style: "word",
      questions: [
        { id: "tasu", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "知識・技能", generate: tasu },
        { id: "kurabe", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: kurabe },
        { id: "hiku", type: "A", difficulty: 3, points: 19, seconds: 120, skill: "思考・判断・表現", generate: hiku },
      ],
    },
  ],
};
