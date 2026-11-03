// 小4算数「小数のかけ算とわり算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 小数は「0.1 や 0.01 が何こ」(整数) で持って計算し、表示は f() で整える。わり算は先に商を決めてわられる数を作る。
// 答えは calc と equations (商・あまりの組は わる数×商＋あまり＝わられる数) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-shosu-kakewari";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_KAKE = L(1, "1.2×3 は、0.1が 12×3 こ");
const B_HISSAN = L(2, "筆算は右にそろえて、最後に小数点");
const B_WARU = L(3, "7.2÷3 も、0.1のいくつ分");
const B_AMARI = L(4, "あまりを出すか、わり進むか");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function kake1(r: Rng): QuestionBody {
  let t = r.int(12, 89);
  if (t % 10 === 0) t += 1; // 6.0 のような整数にしない
  const k = r.int(3, 9);
  return {
    prompt: `${f(t / 10)}×${k} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f((t * k) / 10)], calc: `${f(t / 10)}*${k}` },
    point: "0.1がいくつ分かで考えると、整数のかけ算",
    steps: [{ title: "0.1のいくつ分", body: `${f(t / 10)}は0.1が${t}こ。${t}×${k}＝${t * k} なので、0.1が${t * k}こで {{${f((t * k) / 10)}}}。`, back: [B_KAKE] }],
  };
}

function kake2(r: Rng): QuestionBody {
  let t = r.int(105, 899);
  if (t % 10 === 0) t += 1; // 小数第2位まである数に
  const k = r.int(2, 9);
  return {
    prompt: `${f(t / 100)}×${k} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f((t * k) / 100)], calc: `${f(t / 100)}*${k}` },
    point: "かけられる数の小数点にそろえて、積の小数点を打つ",
    steps: [{ title: "整数と同じように", body: `${t}×${k}＝${t * k}。かけられる数は小数点の右に2けたなので、積も2けたで {{${f((t * k) / 100)}}}。`, trap: "積の最後が0になったら、小数点を打ってから0を消します。", back: [B_HISSAN] }],
  };
}

function waru(r: Rng): QuestionBody {
  const k = r.int(2, 9);
  let q = r.int(11, 49);
  if ((q * k) % 10 === 0) q += 1; // わられる数を整数にしない
  const a = q * k;
  return {
    prompt: `${f(a / 10)}÷${k} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(q / 10)], calc: `${f(a / 10)}/${k}` },
    point: "商の小数点は、わられる数の小数点にそろえる",
    steps: [{ title: "0.1のいくつ分", body: `${f(a / 10)}は0.1が${a}こ。${a}÷${k}＝${q} なので、0.1が${q}こで {{${f(q / 10)}}}。`, back: [B_WARU] }],
  };
}

function amari(r: Rng): QuestionBody {
  const k = r.int(3, 9);
  const q = r.int(2, 9);
  const rem = r.int(1, k * 10 - 1);
  const remOk = rem % 10 === 0 ? rem + 1 : rem; // あまり (0.1 が何こ)、k*10 未満
  const aT = q * k * 10 + remOk;
  return {
    prompt: `${f(aT / 10)}÷${k} を、商は一の位まで求めて、あまりも出しなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(q), f(remOk / 10)], labels: ["商", "あまり"], calc: `(${f(aT / 10)}-${f(remOk / 10)})/${k}`, equations: [`${k}*x+y=${f(aT / 10)}`] },
    point: "あまりの小数点は、わられる数の小数点にそろえる",
    steps: [
      { title: "一の位まで商をたてる", body: `${k}×${q}＝${k * q}、${f(aT / 10)}−${k * q}＝${f(remOk / 10)}。`, back: [B_AMARI] },
      { title: "たしかめ", body: `${k}×${q}＋${f(remOk / 10)}＝${f(aT / 10)} なので、{{${q}あまり${f(remOk / 10)}}}。`, trap: `あまりを${remOk}としない。あまりにも小数点を打ちます。` },
    ],
  };
}

function warisusumu(r: Rng): QuestionBody {
  const k = r.pick([2, 4, 5, 8]);
  let n = r.int(3, 40);
  if (n % k === 0) n += 1;
  const ans = n / k;
  return {
    prompt: `${n}÷${k} を、わりきれるまで計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], calc: `${n}/${k}` },
    point: "0をつけたして、わり進める",
    steps: [{ title: "0をつけたす", body: `${n}を${n}.0（または${n}.00、${n}.000）と考えて、わりきれるまでわり進めます。${n}÷${k}＝{{${f(ans)}}}。`, back: [B_AMARI] }],
  };
}

function bunsho(r: Rng): QuestionBody {
  let P = 0, j = 0, k = 0;
  for (let i = 0; i < 50; i++) {
    P = r.int(3, 9); // 1人分 (0.1L が何こ)
    j = r.int(3, 8); // 人数
    k = r.int(2, 6); // 本数
    if ((P * j) % k === 0 && ((P * j) / k) % 10 !== 0 && j !== k) break; // 本数＝人数だと、答えが1本分と同じになる
  }
  if ((P * j) % k !== 0) [P, j, k] = [6, 4, 3];
  const bottle = (P * j) / k; // 1本 (0.1L が何こ)
  return {
    prompt: `1本${f(bottle / 10)}Lのジュースが${k}本あります。これを${j}人で同じ量ずつ分けると、1人分は何Lですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(P / 10)], unit: "L", calc: `${f(bottle / 10)}*${k}/${j}` },
    point: "全部の量を出してから、人数でわる",
    steps: [
      { title: "全部の量", body: `${f(bottle / 10)}×${k}＝${f((bottle * k) / 10)}（L）。`, back: [B_KAKE] },
      { title: "分ける", body: `${f((bottle * k) / 10)}÷${j}＝{{${f(P / 10)}}}（L）。`, back: [B_WARU] },
    ],
  };
}

export const E_MATH_4_SHOSU_KAKEWARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "小数×整数・小数÷整数",
      lead: "次の計算をしなさい。",
      style: "calc",
      questions: [
        { id: "kake1", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: kake1 },
        { id: "kake2", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kake2 },
        { id: "waru", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: waru },
      ],
    },
    {
      title: "あまり・わり進め・文章の問題",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "amari", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "知識・技能", generate: amari },
        { id: "warisusumu", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: warisusumu },
        { id: "bunsho", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: bunsho },
      ],
    },
  ],
};
