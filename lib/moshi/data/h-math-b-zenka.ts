// 数学B「漸化式」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 漸化式の項は生成関数の中で1項ずつ計算し、calc にはその計算 (または一般項 (a₁−α)pⁿ⁻¹＋α の式) を書く。
//   特性方程式の α は q/(1−p)、階差型の一般項は a₁＋Σ を展開した式 (expr)、和は (a₁−α)(pⁿ−1)/(p−1)＋nα。
//   scripts/check-moshi.ts がシード1〜100で calc・equations と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-b-zenka";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "漸化式：初項とルールで数列が決まる");
const S2 = L(2, "まず形を見分ける：等差・等比・階差");
const S3 = L(3, "aₙ₊₁＝paₙ＋q 型：α をひいて等比数列にする");
const S4 = L(4, "階差型：たす数を Σ でまとめる");
const S5 = L(5, "aₙ₊₂＝aₙ₊₁＋aₙ：フィボナッチ数列と黄金比");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
function poly(ts: [number, string][], ascii = false): string {
  let out = "";
  for (const [c, m0] of ts) {
    if (c === 0) continue;
    const m = ascii ? m0.replace(/²/g, "^2") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}
const SUB = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
const sub = (n: number) => String(n).split("").map((c) => SUB[Number(c)]).join("");

function kihon(r: Rng): QuestionBody {
  if (r.bool()) {
    const a1 = r.int(-10, 15);
    const d = nz(r, -7, 7);
    return {
      prompt: `a₁＝${D(a1)}、aₙ₊₁＝aₙ ${d < 0 ? "−" : "＋"} ${Math.abs(d)} (n＝1, 2, 3, …) で定められる数列 {aₙ} の一般項を、n の式で表しなさい。`,
      answer: { kind: "num", answerKind: "expr", answer: [poly([[d, "n"], [a1 - d, ""]], true)], labels: ["aₙ ="] },
      point: "aₙ₊₁＝aₙ＋d は公差 d の等差数列",
      steps: [
        { title: "形を見分ける", body: `毎回 ${D(d)} をたすので、初項 ${D(a1)}、公差 ${D(d)} の{{等差数列}}。`, back: [S2] },
        { title: "一般項", body: `aₙ＝${D(a1)}＋(n−1)×${pa(d)}＝{{${poly([[d, "n"], [a1 - d, ""]])}}}。`, trap: "n−1 ではなく n をかけると、初項がずれる。n＝1 を入れて a₁ になるか確かめる。" },
      ],
    };
  }
  const a1 = r.pick([1, 2, 3, -1, -2]);
  const p = r.pick([2, 3, -2]);
  const n = r.int(5, 7);
  const an = a1 * p ** (n - 1);
  return {
    prompt: `a₁＝${D(a1)}、aₙ₊₁＝${D(p)}aₙ (n＝1, 2, 3, …) で定められる数列 {aₙ} について、a${sub(n)} を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(an)], calc: `${a1}*(${p})^${n - 1}`, labels: [`a${sub(n)} =`] },
    point: "aₙ₊₁＝raₙ は公比 r の等比数列",
    steps: [
      { title: "形を見分ける", body: `毎回 ${D(p)} 倍するので、初項 ${D(a1)}、公比 ${D(p)} の{{等比数列}}。aₙ＝${D(a1)}·${pa(p)}ⁿ⁻¹。`, back: [S2] },
      { title: "代入する", body: `a${sub(n)}＝${D(a1)}×${pa(p)}^${n - 1}＝{{${D(an)}}}。` },
    ],
  };
}

function kou(r: Rng): QuestionBody {
  if (r.bool()) {
    let a1 = r.int(-3, 5);
    const p = r.pick([2, 3, -2]);
    const q = nz(r, -5, 5);
    if (p * a1 + q === a1) a1 += 1; // a₁＝α だと、ずっと同じ数がならぶだけになる
    const a = [a1];
    for (let i = 0; i < 3; i++) a.push(p * a[i] + q);
    return {
      prompt: `a₁＝${D(a1)}、aₙ₊₁＝${D(p)}aₙ ${q < 0 ? "−" : "＋"} ${Math.abs(q)} (n＝1, 2, 3, …) で定められる数列について、a₄ を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(a[3])], calc: `${p}*(${p}*(${p}*(${a1})+(${q}))+(${q}))+(${q})`, labels: ["a₄ ="] },
      point: "n＝1, 2, 3 と順に代入して1項ずつ求める",
      steps: [
        { title: "n＝1, 2 を入れる", body: `a₂＝${D(p)}×${pa(a1)}${q < 0 ? "−" : "＋"}${Math.abs(q)}＝${D(a[1])}、a₃＝${D(p)}×${pa(a[1])}${q < 0 ? "−" : "＋"}${Math.abs(q)}＝${D(a[2])}。`, back: [S1] },
        { title: "n＝3 を入れる", body: `a₄＝${D(p)}×${pa(a[2])}${q < 0 ? "−" : "＋"}${Math.abs(q)}＝{{${D(a[3])}}}。` },
      ],
    };
  }
  const a1 = r.int(1, 4);
  const a2 = r.int(1, 5);
  const c = r.pick([1, 2]);
  const a = [a1, a2];
  for (let i = 2; i < 7; i++) a.push(a[i - 1] + c * a[i - 2]);
  return {
    prompt: `a₁＝${a1}、a₂＝${a2}、aₙ₊₂＝aₙ₊₁＋${c === 1 ? "" : c}aₙ (n＝1, 2, 3, …) で定められる数列について、a₇ を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a[6])], calc: `${a[5]}+${c}*${a[4]}`, labels: ["a₇ ="] },
    point: "前の2項から次の項が決まる。順に書き出す",
    steps: [
      { title: "順に書き出す", body: `a₃＝${a[2]}、a₄＝${a[3]}、a₅＝${a[4]}、a₆＝${a[5]}。`, back: [S5] },
      { title: "a₇", body: `a₇＝a₆＋${c === 1 ? "" : `${c}×`}a₅＝${a[5]}＋${c === 1 ? "" : `${c}×`}${a[4]}＝{{${a[6]}}}。`, trap: "初項が2つ必要。a₁ だけでは決まらない。" },
    ],
  };
}

function tokusei(r: Rng): QuestionBody {
  const p = r.pick([2, 3, 4, -2, 3]);
  const al = nz(r, -4, 4);
  const q = al * (1 - p);
  let a1 = r.int(-3, 6);
  if (a1 === al) a1 += 1;
  const ma = al < 0 ? `＋${-al}` : `−${al}`; // 「−α」の書き方
  return {
    prompt: `a₁＝${D(a1)}、aₙ₊₁＝${D(p)}aₙ ${q < 0 ? "−" : "＋"} ${Math.abs(q)} (n＝1, 2, 3, …) で定められる数列の一般項を aₙ＝A·${pa(p)}ⁿ⁻¹＋B と表すとき、定数 A、B の値を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(a1 - al), String(al)], labels: ["A =", "B ="], equations: [`x=${a1}-(${q})/(1-(${p}))`, `y=(${q})/(1-(${p}))`] },
    point: "α＝pα＋q の α をひくと、aₙ−α が等比数列",
    steps: [
      { title: "α を求める", body: `α＝${D(p)}α${q < 0 ? "−" : "＋"}${Math.abs(q)} を解くと {{α＝${D(al)}}}。`, back: [S3] },
      { title: "等比数列にする", body: `2式をひくと aₙ₊₁${ma}＝${D(p)}(aₙ${ma})。{aₙ${ma}} は初項 ${D(a1)}${ma}＝${D(a1 - al)}、公比 ${D(p)} の等比数列。`, trap: "初項は a₁ ではなく a₁−α。ここをまちがえやすい。" },
      { title: "一般項", body: `aₙ＝${D(a1 - al)}·${pa(p)}ⁿ⁻¹${al < 0 ? `−${-al}` : `＋${al}`}。{{A＝${D(a1 - al)}、B＝${D(al)}}}。` },
    ],
  };
}

function kaisa(r: Rng): QuestionBody {
  const h = nz(r, -3, 3);
  const p = 2 * h;
  const q = r.int(-5, 5);
  const a1 = r.int(-4, 8);
  const co: [number, string][] = [[h, "n²"], [q - h, "n"], [a1 - q, ""]];
  return {
    prompt: `a₁＝${D(a1)}、aₙ₊₁＝aₙ＋${q === 0 ? `${p}n` : `(${poly([[p, "n"], [q, ""]])})`} (n＝1, 2, 3, …) で定められる数列 {aₙ} の一般項を、n の式で表しなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly(co, true)], labels: ["aₙ ="] },
    point: "階差型は aₙ＝a₁＋Σ[k=1→n−1](たす数)",
    steps: [
      { title: "たす数を Σ でまとめる", body: `n≧2 のとき aₙ＝${D(a1)}＋Σ[k=1→n−1](${poly([[p, "k"], [q, ""]])})。`, back: [S4] },
      { title: "公式で計算", body: `＝${D(a1)}＋${pa(p)}×(n−1)n/2＋${pa(q)}(n−1)＝{{${poly(co)}}}。`, trap: "Σ の上端は n−1。Σk の公式も n−1 を入れて (n−1)n/2。" },
      { title: "n＝1 を確かめる", body: `n＝1 を入れると ${D(h + (q - h) + (a1 - q))}＝a₁ なので、n＝1 でも成り立ちます。` },
    ],
  };
}

const TYPES = ["等差数列", "等比数列", "階差数列を使う型", "aₙ₊₁＝paₙ＋q 型 (p≠1, q≠0)"];
function katachi(r: Rng): QuestionBody {
  const t = r.int(0, 3);
  const c = nz(r, 2, 5) * r.pick([1, -1]);
  const e = nz(r, 1, 6);
  const rule = [
    `aₙ₊₁−aₙ＝${D(c)}`,
    `aₙ₊₁＝${D(c)}aₙ`,
    `aₙ₊₁−aₙ＝${Math.abs(c)}n＋${e}`,
    `aₙ₊₁＝${D(c)}aₙ＋${e}`,
  ][t];
  const order = r.shuffle([0, 1, 2, 3]);
  const why = [
    "差がいつも同じ定数なので等差数列。",
    "前の項の定数倍なので等比数列。",
    "差が n によって変わる (n の式) ので階差数列を使う型。",
    "定数倍してから定数をたしているので、α をひいて等比数列に直す型。",
  ];
  return {
    prompt: `漸化式 ${rule} (n＝1, 2, 3, …) で定められる数列は、次のどの型として解くのがよいですか。`,
    answer: { kind: "choice", options: order.map((i) => TYPES[i]), correct: order.indexOf(t), why: order.map((i) => (i === t ? `正しい。${why[i]}` : `ちがう。${why[t]}`)) },
    point: "差が定数→等差、比が定数→等比、差が n の式→階差",
    steps: [
      { title: "形を見る", body: `${rule} は、{{${TYPES[t]}}}。${why[t]}`, back: [S2] },
      { title: "解き方", body: t === 3 ? "α＝pα＋q の α をひいて等比数列にします。" : t === 2 ? "aₙ＝a₁＋Σ[k=1→n−1]bₖ を使います。" : "公式で一般項がすぐ書けます。", back: [t === 3 ? S3 : t === 2 ? S4 : S1] },
    ],
  };
}

function wa(r: Rng): QuestionBody {
  const p = r.pick([2, 3, 2]);
  const al = nz(r, -3, 3);
  const q = al * (1 - p);
  let a1 = r.int(-2, 5);
  if (a1 === al) a1 += 2;
  const n = p === 2 ? r.int(5, 8) : r.int(4, 6);
  const A = a1 - al;
  const S = (A * (p ** n - 1)) / (p - 1) + n * al;
  return {
    prompt: `a₁＝${D(a1)}、aₙ₊₁＝${p}aₙ ${q < 0 ? "−" : "＋"} ${Math.abs(q)} (n＝1, 2, 3, …) で定められる数列について、初項から第 ${n} 項までの和 a₁＋a₂＋…＋a${sub(n)} を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(S)], calc: `(${a1}-(${al}))*(${p}^${n}-1)/(${p}-1)+${n}*(${al})` },
    point: "一般項を「等比数列＋定数」にしてから、それぞれ和をとる",
    steps: [
      { title: "一般項", body: `α＝${p}α${q < 0 ? "−" : "＋"}${Math.abs(q)} より α＝${D(al)}。aₙ＝${D(A)}·${p}ⁿ⁻¹＋${pa(al)}。`, back: [S3] },
      { title: "分けてたす", body: `Σ${D(A)}·${p}ᵏ⁻¹＝${D(A)}×(${p}^${n}−1)÷${p - 1}＝${D((A * (p ** n - 1)) / (p - 1))}、定数 ${D(al)} を ${n} 回で ${D(n * al)}。`, trap: "定数の部分を1回だけたして、n 回分にし忘れやすい。" },
      { title: "答え", body: `合わせて {{${D(S)}}}。` },
    ],
  };
}

export const H_MATH_B_ZENKA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学B",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "漸化式と項",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kihon", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kihon },
        { id: "kou", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: kou },
        { id: "katachi", type: "A", difficulty: 2, points: 16, seconds: 60, skill: "思考・判断・表現", generate: katachi },
      ],
    },
    {
      title: "一般項を求める",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "tokusei", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: tokusei },
        { id: "kaisa", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: kaisa },
        { id: "wa", type: "A", difficulty: 3, points: 24, seconds: 210, skill: "思考・判断・表現", generate: wa },
      ],
    },
  ],
};
