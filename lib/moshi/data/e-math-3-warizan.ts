// 小3算数「わり算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 先に答えとわる数を決め、わられる数＝わる数×答え で作る (わりきれる組だけ)。答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-warizan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_HITORI = L(1, "1人分をもとめるわり算");
const B_IKUTSU = L(2, "何人に分けられるかをもとめるわり算");
const B_KUKU = L(3, "答えは、わる数の段《だん》の九九で見つける");
const B_0_1 = L(4, "答えのたしかめと、0や1のわり算");

function keisan(r: Rng): QuestionBody {
  const b = r.int(2, 9);
  const q = r.int(2, 9);
  return {
    prompt: `${b * q}÷${b} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q)], calc: `${b * q}/${b}` },
    point: "わる数の段《だん》の九九で答えをさがす",
    steps: [{ title: `${b}の段《だん》の九九`, body: `${b}×□＝${b * q} になる□は{{${q}}}。${b}×${q}＝${b * q} でたしかめられます。`, back: [B_KUKU] }],
  };
}

function hitoribun(r: Rng): QuestionBody {
  const k = r.int(3, 9);
  const q = r.int(2, 9);
  const what = r.pick(["色紙", "クッキー", "ビー玉", "いちご"]);
  return {
    prompt: `${what}が${k * q}こあります。${k}人に同じ数ずつ分けると、1人分は何こになりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q)], unit: "こ", calc: `${k * q}/${k}` },
    point: "1人分は、全部÷人数",
    steps: [{ title: "式", body: `${k * q}÷${k}＝{{${q}}}（こ）。${k}×${q}＝${k * q} でたしかめます。`, back: [B_HITORI, B_KUKU] }],
  };
}

function zeroIchi(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const kind = r.int(0, 2);
  const [prompt, ans, calc, body] =
    kind === 0
      ? [`0÷${a} を計算しなさい。`, 0, `0/${a}`, `0こを${a}人で分けても、1人分は{{0}}こです。`]
      : kind === 1
        ? [`${a}÷${a} を計算しなさい。`, 1, `${a}/${a}`, `${a}こを${a}人で分けると、1人分は{{1}}こです。`]
        : [`${a}÷1 を計算しなさい。`, a, `${a}/1`, `${a}こを1人で分けると、1人分は{{${a}}}こです。`];
  return {
    prompt: prompt as string,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], calc: calc as string },
    point: "0÷□＝0、□÷□＝1、□÷1＝□",
    steps: [{ title: "分けるようすで考える", body: body as string, back: [B_0_1] }],
  };
}

function ikutsubun(r: Rng): QuestionBody {
  const k = r.int(3, 9);
  const q = r.int(3, 9);
  const what = r.pick(["えんぴつ", "花", "おり紙"]);
  const c = what === "えんぴつ" ? "本" : what === "花" ? "本" : "まい";
  return {
    prompt: `${what}が${k * q}${c}あります。1人に${k}${c}ずつ分けると、何人に分けられますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q)], unit: "人", calc: `${k * q}/${k}` },
    point: "いくつ分も、わり算でもとめる",
    steps: [{ title: "式", body: `${k}${c}ずつのまとまりがいくつできるかなので、${k * q}÷${k}＝{{${q}}}（人）。`, trap: `${k * q}×${k} や ${k * q}−${k} にしないようにします。`, back: [B_IKUTSU] }],
  };
}

function awasete(r: Rng): QuestionBody {
  const k = r.int(3, 8);
  const q = r.int(3, 9);
  const t = k * q;
  const a = r.int(Math.ceil(t / 3), t - 5);
  const b = t - a;
  const who = r.pick(["兄", "姉"]);
  return {
    prompt: `あめを、わたしは${a}こ、${who}は${b}こ持っています。2人のあめを合わせて、${k}人で同じ数ずつ分けると、1人分は何こになりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q)], unit: "こ", calc: `(${a}+${b})/${k}` },
    point: "先に合わせてから分ける",
    steps: [
      { title: "合わせる", body: `${a}＋${b}＝${t}（こ）。`, back: [B_HITORI] },
      { title: "分ける", body: `${t}÷${k}＝{{${q}}}（こ）。`, back: [B_KUKU] },
    ],
  };
}

const TABLE: [number, number[]][] = [
  [12, [2, 3, 4, 6]],
  [18, [2, 3, 6, 9]],
  [24, [3, 4, 6, 8]],
  [30, [5, 6]],
  [36, [4, 6, 9]],
  [40, [5, 8]],
  [42, [6, 7]],
  [48, [6, 8]],
  [56, [7, 8]],
  [72, [8, 9]],
];

function kurabe(r: Rng): QuestionBody {
  const [n, ds] = r.pick(TABLE);
  const [k, j] = r.sample(ds, 2);
  return {
    prompt: `カードを${k}人で同じ数ずつ分けると、1人${n / k}まいになりました。同じカードを${j}人で同じ数ずつ分けると、1人何まいになりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n / j)], unit: "まい", calc: `${k}*${n / k}/${j}` },
    point: "まず、カードが全部で何まいかをもとめる",
    steps: [
      { title: "全部のまい数", body: `${n / k}まいずつ${k}人分なので、${n / k}×${k}＝${n}（まい）。`, back: [B_0_1] },
      { title: `${j}人で分ける`, body: `${n}÷${j}＝{{${n / j}}}（まい）。`, back: [B_HITORI, B_KUKU] },
    ],
  };
}

export const E_MATH_3_WARIZAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "わり算の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "keisan", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: keisan },
        { id: "zero-ichi", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: zeroIchi },
        { id: "hitoribun", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: hitoribun },
      ],
    },
    {
      title: "わり算の文章の問題",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "ikutsubun", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: ikutsubun },
        { id: "awasete", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: awasete },
        { id: "kurabe", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: kurabe },
      ],
    },
  ],
};
