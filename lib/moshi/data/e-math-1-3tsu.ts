// 小1算数「3つの数の計算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数は rng から作り、とちゅうの こたえも 0〜20 に入る組だけを使う。num は calc (しきそのもの) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、正解と同じ文字がまざらないように作り、r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-3tsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_MAE = L(1, "まえから じゅんに");
const B_PM = L(2, "ふえたら ＋、へったら −");
const B_HIKI2 = L(3, "ひきざんが 2かい");
const B_TOCHU = L(4, "とちゅうの こたえを かいて おく");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

function tasu3(r: Rng): QuestionBody {
  const a = r.int(1, 7);
  const b = r.int(1, 8 - a);
  const c = r.int(1, 10 - a - b);
  return {
    prompt: `${a}＋${b}＋${c}は いくつですか。`,
    answer: num(a + b + c, `${a}+${b}+${c}`),
    point: "まえから じゅんに けいさんする",
    steps: [
      { title: "まえの 2つ", body: `まず ${a}＋${b}＝{{${a + b}}}。`, back: [B_MAE] },
      { title: "つぎの かず", body: `${a + b}＋${c}＝{{${a + b + c}}} です。`, trap: `とちゅうの ${a + b}を わすれて、${a}＋${c} と しない。`, back: [B_TOCHU] },
    ],
  };
}

function hiku3(r: Rng): QuestionBody {
  const a = r.int(5, 10);
  const b = r.int(1, a - 2);
  const c = r.int(1, a - b - 1);
  const ng = a - (b - c);
  return {
    prompt: `${a}−${b}−${c}は いくつですか。`,
    answer: num(a - b - c, `${a}-${b}-${c}`),
    point: "ひきざんが 2かいでも、まえから じゅんに",
    steps: [
      { title: "まえの 2つ", body: `まず ${a}−${b}＝{{${a - b}}}。`, back: [B_HIKI2] },
      { title: "つぎを ひく", body: `${a - b}−${c}＝{{${a - b - c}}} です。`, ...(b > c ? { trap: `${b}−${c} を さきに すると ${ng}に なって まちがい。まえから じゅんです。` } : {}) },
    ],
  };
}

function maze(r: Rng): QuestionBody {
  if (r.bool()) {
    const a = r.int(2, 9);
    const b = r.int(1, 10 - a);
    const c = r.int(1, a + b);
    return {
      prompt: `${a}＋${b}−${c}は いくつですか。`,
      answer: num(a + b - c, `${a}+${b}-${c}`),
      point: "＋と −が まざっても、まえから じゅんに",
      steps: [
        { title: "まえの 2つ", body: `${a}＋${b}＝{{${a + b}}}。`, back: [B_MAE] },
        { title: "つぎを ひく", body: `${a + b}−${c}＝{{${a + b - c}}} です。` },
      ],
    };
  }
  const a = r.int(3, 10);
  const b = r.int(1, a - 1);
  const c = r.int(1, 10 - (a - b));
  return {
    prompt: `${a}−${b}＋${c}は いくつですか。`,
    answer: num(a - b + c, `${a}-${b}+${c}`),
    point: "＋と −が まざっても、まえから じゅんに",
    steps: [
      { title: "まえの 2つ", body: `${a}−${b}＝{{${a - b}}}。`, back: [B_MAE] },
      { title: "つぎを たす", body: `${a - b}＋${c}＝{{${a - b + c}}} です。`, trap: `${b}＋${c} を さきに しない。` },
    ],
  };
}

function bus(r: Rng): QuestionBody {
  const a = r.int(2, 8);
  const b = r.int(1, 10 - a);
  const c = r.int(1, a + b - 1);
  return {
    prompt: `バスに ${a}人 のって います。${b}人 のって きて、${c}人 おりました。いま なん人 のって いますか。`,
    answer: num(a + b - c, `${a}+${b}-${c}`, "人"),
    point: "のると ＋、おりると −",
    steps: [
      { title: "しきに する", body: `のって くると ふえるので ＋${b}、おりると へるので −${c}。しきは {{${a}＋${b}−${c}}}。`, back: [B_PM] },
      { title: "まえから じゅんに", body: `${a}＋${b}＝${a + b}、${a + b}−${c}＝{{${a + b - c}}}。${a + b - c}人です。` },
    ],
  };
}

function shiki(r: Rng): QuestionBody {
  const a = r.int(4, 9);
  const b = r.int(1, a - 1);
  const c = r.int(1, 10 - (a - b));
  const f = r.pick(["みかん", "あめ", "クッキー"]);
  return {
    prompt: `${f}が ${a}こ あります。${b}こ たべて、${c}こ もらいました。いま なんこ ありますか。この もんだいの しきは どれですか。`,
    answer: choice(r, [
      [`${a}−${b}＋${c}`, `たべると へるので −${b}、もらうと ふえるので ＋${c}。`],
      [`${a}＋${b}＋${c}`, "たべると へるので、＋では ありません。"],
      [`${a}−${b}−${c}`, "もらうと ふえるので、−では ありません。"],
      [`${a}＋${b}−${c}`, "＋と −が ぎゃくです。"],
    ]),
    point: "ふえたら ＋、へったら −",
    steps: [{ title: "ふえる・へるを 見る", body: `たべる→へる→{{−${b}}}、もらう→ふえる→{{＋${c}}}。しきは ${a}−${b}＋${c}＝${a - b + c}。`, back: [B_PM] }],
  };
}

function ten(r: Rng): QuestionBody {
  const a = r.int(1, 9);
  const b = 10 - a;
  if (r.bool()) {
    const c = r.int(1, 9);
    return {
      prompt: `${a}＋${b}＋${c}は いくつですか。`,
      answer: num(a + b + c, `${a}+${b}+${c}`),
      point: "まえの 2つで 10が できる",
      steps: [
        { title: "まえの 2つ", body: `${a}＋${b}＝{{10}}。`, back: [B_MAE] },
        { title: "10と いくつ", body: `10＋${c}＝{{${10 + c}}} です。`, back: [B_TOCHU] },
      ],
    };
  }
  const c = r.int(2, 9);
  const d = r.int(1, c);
  return {
    prompt: `10＋${c}−${d}は いくつですか。`,
    answer: num(10 + c - d, `10+${c}-${d}`),
    point: "とちゅうの こたえを つかって、つぎを する",
    steps: [
      { title: "まえの 2つ", body: `10＋${c}＝{{${10 + c}}}。`, back: [B_MAE] },
      { title: "つぎを ひく", body: `${10 + c}−${d}＝{{${10 + c - d}}} です。ばらの ${c}から ${d}を とります。`, back: [B_TOCHU] },
    ],
  };
}

export const E_MATH_1_3TSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    {
      title: "3つの かずの けいさん",
      lead: "つぎの けいさんを しなさい。",
      style: "calc",
      questions: [
        { id: "tasu3", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: tasu3 },
        { id: "hiku3", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: hiku3 },
        { id: "maze", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: maze },
        { id: "ten", type: "A", difficulty: 3, points: 21, seconds: 60, skill: "知識・技能", generate: ten },
      ],
    },
    {
      title: "ぶんしょうの もんだい",
      lead: "つぎの もんだいに こたえなさい。",
      style: "word",
      questions: [
        { id: "bus", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: bus },
        { id: "shiki", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: shiki },
      ],
    },
  ],
};
