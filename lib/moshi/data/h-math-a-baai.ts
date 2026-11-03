// 数学A「場合の数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 答えは問題の数から積の法則・nPr・nCr で出し、calc に「かけ算・わり算の式」で書く (nCr は n(n−1)…/r! の形に展開)。
// scripts/check-moshi.ts がシード1〜100で calc を計算して答えと照合する。カードの偶数・組分けは手計算でも確かめた。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-a-baai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const BACK_WA = L(1, "和の法則と積の法則");
const BACK_P = L(2, "順列：選んで、並べる");
const BACK_C = L(3, "組合せ：選ぶだけで、並べない");
const BACK_IRO = L(4, "いろいろな並べ方");
const BACK_KUMI = L(5, "組分け");

const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const P = (n: number, r: number) => fact(n) / fact(n - r);
const C = (n: number, r: number) => P(n, r) / fact(r);
/** n(n−1)…(n−r+1) を "5*4*3" の形で */
const desc = (n: number, r: number) => (r <= 0 ? "1" : Array.from({ length: r }, (_, i) => n - i).join("*"));
/** nCr の計算式 "(5*4*3)/(3*2*1)" */
const cx = (n: number, r: number) => `(${desc(n, r)})/(${desc(r, r)})`;
const dispDesc = (n: number, r: number) => desc(n, r).replace(/\*/g, "×");

function junretsu(r: Rng): QuestionBody {
  const n = r.int(5, 9);
  const k = r.int(2, 4);
  const [group, roles] = r.pick([
    ["部員", ["部長", "副部長", "会計", "書記"]],
    ["生徒", ["委員長", "副委員長", "書記", "会計"]],
    ["候補者", ["代表", "副代表", "記録係", "広報係"]],
  ] as const);
  const rs = roles.slice(0, k).join("・");
  const ans = P(n, k);
  return {
    prompt: `${n}人の${group}の中から、${rs}を1人ずつ選ぶ。選び方は何通りあるか。ただし、1人が2つ以上の役を兼ねることはないものとする。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "通り", calc: desc(n, k) },
    point: "役割がある＝順番がある。nPr で数える",
    steps: [
      { title: "役割があるので順列", body: `役割がちがえば別の選び方なので、${n}人から${k}人を選んで並べる順列 {{${n}P${k}}} です。`, back: [BACK_P] },
      { title: "1ずつ減らして k 個かける", body: `${n}P${k}＝${dispDesc(n, k)}＝{{${ans}}}（通り）。`, trap: `${n}C${k} にすると、役割の入れかえを数え落とします。` },
    ],
  };
}

function kumiawase(r: Rng): QuestionBody {
  const a = r.int(4, 8);
  const b = r.int(3, 7);
  const p = r.int(1, Math.min(3, a - 1));
  const q = r.int(1, Math.min(3, b - 1));
  const [x, y] = r.pick([
    ["男子", "女子"],
    ["1年生", "2年生"],
    ["大人", "子ども"],
  ] as const);
  const ca = C(a, p);
  const cb = C(b, q);
  const ans = ca * cb;
  return {
    prompt: `${x}${a}人、${y}${b}人の中から、${x}${p}人と${y}${q}人を選んで班をつくる。選び方は何通りあるか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "通り", calc: `${cx(a, p)}*${cx(b, q)}` },
    point: "選ぶだけなら組合せ。続けて選ぶので積の法則",
    steps: [
      { title: "それぞれ組合せで", body: `${x}の選び方は ${a}C${p}＝{{${ca}}}（通り）、${y}の選び方は ${b}C${q}＝{{${cb}}}（通り）。`, back: [BACK_C] },
      { title: "積の法則", body: `${x}の選び方それぞれに対して${y}の選び方があるので、${ca}×${cb}＝{{${ans}}}（通り）。`, trap: `${ca}＋${cb} とたさない。「または」ではなく「続けて」選んでいます。`, back: [BACK_WA] },
    ],
  };
}

function card(r: Rng): QuestionBody {
  const k = r.int(3, 8); // 0, 1, …, k の k+1 枚
  const even = r.bool();
  const cards = Array.from({ length: k + 1 }, (_, i) => i).join(", ");
  if (!even) {
    const ans = k * k * (k - 1);
    return {
      prompt: `${cards} の ${k + 1}枚のカードから3枚を取り出して並べ、3けたの整数をつくる。整数は全部で何個できるか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc: `${k}*${k}*${k - 1}` },
      point: "条件のある百の位から先に決める",
      steps: [
        { title: "百の位から決める", body: `百の位に0は置けないので、0以外の{{${k}通り}}。`, back: [BACK_P] },
        { title: "残りの位", body: `十の位は残り${k}枚（0もよい）から${k}通り、一の位は残り${k - 1}通り。${k}×${k}×${k - 1}＝{{${ans}}}（個）。`, trap: `${k + 1}P3＝${P(k + 1, 3)} とすると、百の位が0のもの（実は2けた）まで数えてしまいます。` },
      ],
    };
  }
  const E = Math.floor(k / 2); // 一の位に置ける 0 以外の偶数の数
  const z = k * (k - 1);
  const nz = E * (k - 1) * (k - 1);
  const ans = z + nz;
  const evens = Array.from({ length: E }, (_, i) => 2 * (i + 1)).join(", ");
  return {
    prompt: `${cards} の ${k + 1}枚のカードから3枚を取り出して並べ、3けたの整数をつくる。このうち偶数は何個できるか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc: `${k}*${k - 1}+${E}*${k - 1}*${k - 1}` },
    point: "一の位が0かどうかで場合分けして、たす",
    steps: [
      { title: "一の位が 0 のとき", body: `百の位は残り${k}枚から${k}通り、十の位は${k - 1}通りで、${k}×${k - 1}＝{{${z}}}（個）。`, back: [BACK_P] },
      { title: `一の位が ${evens} のとき`, body: `一の位${E}通り、百の位は0と一の位を除いた${k - 1}通り、十の位は${k - 1}通りで、${E}×${k - 1}×${k - 1}＝{{${nz}}}（個）。`, trap: "一の位が0のときと同じように数えると、百の位に0を置いたものが混ざります。" },
      { title: "和の法則", body: `2つの場合は重ならないので、${z}＋${nz}＝{{${ans}}}（個）。`, back: [BACK_WA] },
    ],
  };
}

function iroiro(r: Rng): QuestionBody {
  const kind = r.pick(["en", "tonari", "chofuku"] as const);
  if (kind === "en") {
    const n = r.int(5, 8);
    const ans = fact(n - 1);
    return {
      prompt: `${n}人が円形のテーブルのまわりに座る。座り方は何通りあるか。ただし、回転して一致する座り方は同じものとみなす。`,
      answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "通り", calc: desc(n - 1, n - 1) },
      point: "円順列は1人を固定して (n−1)!",
      steps: [
        { title: "1人を固定する", body: `回転で重なるものを同じとみなすので、1人の席を決めてしまい、残り${n - 1}人を並べます。`, back: [BACK_IRO] },
        { title: "(n−1)!", body: `(${n}−1)!＝${dispDesc(n - 1, n - 1)}＝{{${ans}}}（通り）。`, trap: `${n}!＝${fact(n)} は、回転したものを${n}回ずつ数えています。` },
      ],
    };
  }
  if (kind === "tonari") {
    const n = r.int(5, 8);
    const ans = fact(n - 2) * 2;
    return {
      prompt: `A、B をふくむ${n}人が円形のテーブルのまわりに座る。A と B がとなり合う座り方は何通りあるか。ただし、回転して一致する座り方は同じものとみなす。`,
      answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "通り", calc: `${desc(n - 2, n - 2)}*2` },
      point: "となり合う2人はひとまとめにして、中の並びをかける",
      steps: [
        { title: "A と B をひとまとめに", body: `AB を1人とみると${n - 1}人の円順列で (${n - 1}−1)!＝{{${fact(n - 2)}}}（通り）。`, back: [BACK_IRO] },
        { title: "まとまりの中の並び", body: `AB と BA の2通りがあるので、${fact(n - 2)}×2＝{{${ans}}}（通り）。`, trap: "まとまりの中の入れかえ（×2）を忘れやすい。" },
      ],
    };
  }
  const m = r.int(2, 5);
  const k = r.int(3, 5);
  const ans = m ** k;
  const digits = Array.from({ length: m }, (_, i) => i + 1).join(", ");
  return {
    prompt: `${digits} の${m}種類の数字を、同じ数字を何度使ってもよいことにして並べ、${k}けたの整数をつくる。整数は全部で何個できるか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc: `${m}^${k}` },
    point: "くり返し使えるときは毎回 n 通り。重複順列 nʳ",
    steps: [
      { title: "どの位も同じ数の候補", body: `同じ数字を使ってよいので、どの位も{{${m}通り}}ずつ選べます。`, back: [BACK_IRO] },
      { title: "重複順列", body: `${k}けたなので ${m}^${k}＝{{${ans}}}（個）。`, trap: `${m}P${Math.min(k, m)} のように1ずつ減らさない。使った数字も、また使えます。` },
    ],
  };
}

const LETTERS = ["a", "b", "c"];
function onaji(r: Rng): QuestionBody {
  const cnt = [r.int(1, 3), r.int(2, 3), r.int(1, 2)];
  const n = cnt[0] + cnt[1] + cnt[2];
  const word = cnt.map((c, i) => Array(c).fill(LETTERS[i]).join(", ")).join(", ");
  const ans = fact(n) / (fact(cnt[0]) * fact(cnt[1]) * fact(cnt[2]));
  const den = cnt.map((c) => `${c}!`).join("×");
  return {
    prompt: `${n}個の文字 ${word} を1列に並べる。並べ方は何通りあるか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "通り", calc: `(${desc(n, n)})/((${desc(cnt[0], cnt[0])})*(${desc(cnt[1], cnt[1])})*(${desc(cnt[2], cnt[2])}))` },
    point: "全体の n! を、同じものどうしの入れかえで割る",
    steps: [
      { title: "いったん全部区別する", body: `同じ文字にも番号をつけて区別すると、${n}!＝{{${fact(n)}}}（通り）。`, back: [BACK_IRO] },
      { title: "同じ文字の入れかえで割る", body: `同じ文字どうしの入れかえ ${den} 通りが同じ並びになるので、${fact(n)}÷(${den})＝{{${ans}}}（通り）。`, trap: "1個しかない文字の 1!＝1 は割っても変わらない。2個・3個の文字を割り忘れないこと。" },
    ],
  };
}

/** [人数, 組の人数, 組に区別があるか] */
const KUMI: [number, number[], boolean][] = [
  [6, [3, 3], false],
  [8, [4, 4], false],
  [6, [2, 2, 2], false],
  [9, [3, 3, 3], false],
  [6, [2, 2, 2], true],
  [7, [3, 2, 2], false],
  [8, [4, 2, 2], false],
  [9, [3, 3, 3], true],
  [10, [5, 5], false],
  [8, [2, 2, 2, 2], false],
  [7, [3, 2, 2], true],
  [9, [4, 3, 2], false],
];
const NAMES = ["A", "B", "C", "D"];
function kumiwake(r: Rng): QuestionBody {
  const [n, sizes, named] = r.pick(KUMI);
  const who = r.pick(["生徒", "選手", "参加者"]);
  // 区別のある組として順に選ぶ
  let rest = n;
  const parts: number[] = [];
  const exprs: string[] = [];
  const shows: string[] = [];
  for (const s of sizes) {
    parts.push(C(rest, s));
    exprs.push(cx(rest, s));
    shows.push(`${rest}C${s}`);
    rest -= s;
  }
  const labeled = parts.reduce((x, y) => x * y, 1);
  // 同じ人数の組の数ごとに、その階乗で割る
  const same = [...new Set(sizes)].map((s) => sizes.filter((t) => t === s).length).filter((c) => c > 1);
  const div = named ? 1 : same.reduce((x, c) => x * fact(c), 1);
  const ans = labeled / div;
  const groups = named ? sizes.map((s, i) => `${NAMES[i]}組に${s}人`).join("、") : `${sizes.join("人、")}人の${sizes.length}つの組`;
  const prompt = named
    ? `${n}人の${who}を、${groups}が入るように分ける。分け方は何通りあるか。`
    : `${n}人の${who}を、${groups}に分ける。分け方は何通りあるか。ただし、組には名前をつけず区別しないものとする。`;
  const divNote = same.length ? same.map((c) => `${c}!`).join("×") : "";
  return {
    prompt,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "通り", calc: `${exprs.join("*")}/${div}` },
    point: "まず組に名前をつけて数え、区別がなければ入れかえで割る",
    steps: [
      { title: "組に名前をつけて順に選ぶ", body: `${shows.join("×")}＝${parts.join("×")}＝{{${labeled}}}（通り）。`, back: [BACK_C, BACK_KUMI] },
      named
        ? { title: "組に区別があるので、そのまま", body: `組に名前があるので、割る必要はありません。答えは{{${ans}}}通り。`, trap: "人数が同じ組でも、名前があれば入れかえると別の分け方です。" }
        : divNote
          ? { title: "同じ人数の組の入れかえで割る", body: `人数が同じ組は入れかえても同じ分け方なので ${divNote} で割り、${labeled}÷${div}＝{{${ans}}}（通り）。`, trap: "人数がちがう組どうしは入れかえても区別できるので、割らない。" }
          : { title: "人数がみなちがう", body: `組の人数がすべてちがうので、名前がなくても区別できます。答えは{{${ans}}}通り。` },
    ],
  };
}

export const H_MATH_A_BAAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学A",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "順列と組合せ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "junretsu", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: junretsu },
        { id: "kumiawase", type: "A", difficulty: 1, points: 14, seconds: 120, skill: "知識・技能", generate: kumiawase },
      ],
    },
    {
      title: "いろいろな数え方",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "card", type: "A", difficulty: 2, points: 16, seconds: 180, skill: "思考・判断・表現", generate: card },
        { id: "iroiro", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: iroiro },
        { id: "onaji", type: "A", difficulty: 2, points: 18, seconds: 120, skill: "知識・技能", generate: onaji },
      ],
    },
    {
      title: "組分け",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "kumiwake", type: "A", difficulty: 3, points: 22, seconds: 240, skill: "思考・判断・表現", generate: kumiwake }],
    },
  ],
};
