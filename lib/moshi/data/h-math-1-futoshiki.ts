// 数学Ⅰ「一次不等式」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 不等式は「解の境目 k と向き」を先に決めてから、移項前の形 (αx＋β ＜ γx＋δ) を作る。整数の個数は境目から数え、calc で確かめる。
//   絶対値の不等式の整数解は、-100〜100 の整数を1つずつ代入して数えた結果と照合している (生成関数の中)。scripts/check-moshi.ts がシード1〜100で確かめる。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-futoshiki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "不等式の性質：向きが変わるのは1つだけ");
const S2 = L(2, "一次不等式を解く");
const S3 = L(3, "連立不等式は、数直線で共通の範囲をとる");
const S4 = L(4, "絶対値をふくむ不等式は「距離」で読む");
const S5 = L(5, "文章題：求めたものが「整数」かを確かめる");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
function poly(ts: [number, string][], ascii = false): string {
  let out = "";
  for (const [c, m0] of ts) {
    if (c === 0) continue;
    const m = ascii ? m0.replace(/²/g, "^2").replace(/³/g, "^3").replace(/⁴/g, "^4") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}
function frac(n: number, d: number, ascii = false): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  const s = d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`;
  return ascii ? s : D(s);
}

const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
type Op = "<" | ">" | "≦" | "≧";
const FLIP: Record<Op, Op> = { "<": ">", ">": "<", "≦": "≧", "≧": "≦" };

/** 解が「x op k」になる不等式 αx＋β ? γx＋δ を作る */
function makeIneq(r: Rng, k: number, op: Op) {
  let al = 0;
  let ga = 0;
  while (al === ga) {
    al = r.int(-3, 5);
    ga = r.int(-3, 4);
  }
  const diff = al - ga;
  const be = nz(r, -9, 9);
  const de = be + diff * k;
  const shown = diff > 0 ? op : FLIP[op];
  const text = `${poly([[al, "x"], [be, ""]])} ${shown} ${poly([[ga, "x"], [de, ""]])}`;
  const how =
    diff === 1
      ? `移項すると x ${op} ${D(k)}`
      : `移項すると ${poly([[diff, "x"]])} ${shown} ${D(de - be)}。${diff < 0 ? `負の数 ${D(diff)} でわるので向きが変わり、` : `${diff} でわって、`}x ${op} ${D(k)}`;
  return { text, how };
}

const LETTERS: [string, string][] = [
  ["a", "b"],
  ["x", "y"],
  ["p", "q"],
  ["s", "t"],
];

function seishitsu(r: Rng): QuestionBody {
  const k = r.int(2, 9);
  const m = r.int(1, 9);
  const pair = r.pick(LETTERS);
  const [a, b] = r.bool() ? pair : [pair[1], pair[0]]; // a < b
  const premise = r.bool() ? `${a} < ${b}` : `${b} > ${a}`;
  const opts = [
    { t: `−${k}${a} + ${m} > −${k}${b} + ${m}`, ok: true, why: `${a} < ${b} の両辺に −${k} をかけると向きが変わって −${k}${a} > −${k}${b}。${m} をたしても向きはそのまま。` },
    { t: `−${k}${a} + ${m} < −${k}${b} + ${m}`, ok: false, why: `負の数 −${k} をかけたのに、向きを変えていない。` },
    { t: `${a}/${k} − ${m} > ${b}/${k} − ${m}`, ok: false, why: `正の数 ${k} でわっても向きは変わらないので、${a}/${k} − ${m} < ${b}/${k} − ${m} が正しい。` },
    { t: `${k} − ${a} < ${k} − ${b}`, ok: false, why: `−${a} > −${b} なので、${k} をたして ${k} − ${a} > ${k} − ${b}。向きが逆。` },
  ];
  const sh = r.shuffle(opts);
  return {
    prompt: `${premise} のとき、次のうち必ず成り立つ不等式はどれですか。`,
    answer: { kind: "choice", options: sh.map((o) => o.t), correct: sh.findIndex((o) => o.ok), why: sh.map((o) => o.why) },
    point: "負の数をかける・わるときだけ、向きが逆になる",
    steps: [{ title: "負の数をかけたか", body: `${premise} は「${a} が ${b} より小さい」。たす・ひく・正の数をかける・わるでは向きは同じで、{{負の数をかけたときだけ}}向きが逆になります。`, back: [S1] }],
  };
}

function ichiji(r: Rng): QuestionBody {
  let al = 0;
  let ga = 0;
  while (al === ga) {
    al = r.int(-3, 5);
    ga = r.int(-3, 4);
  }
  const diff = al - ga;
  const be = nz(r, -9, 9);
  let de = nz(r, -9, 9);
  if (de === be) de = be + 1 === 0 ? be + 2 : be + 1;
  const op = r.pick<Op>(["<", ">", "≦", "≧"]);
  const sol: Op = diff > 0 ? op : FLIP[op];
  const kk = frac(de - be, diff);
  const mk = frac(be - de, diff);
  const opts = [
    { t: `x ${sol} ${kk}`, ok: true, why: `正しい。` },
    { t: `x ${FLIP[sol]} ${kk}`, ok: false, why: diff < 0 ? `負の数 ${D(diff)} でわるときに、向きを変え忘れている。` : `正の数 ${diff} でわるので、向きは変えない。` },
    { t: `x ${sol} ${mk}`, ok: false, why: `移項で符号をまちがえている。${D(be)} を右辺へ移すと ${D(-be)} になる。` },
    { t: `x ${FLIP[sol]} ${mk}`, ok: false, why: `移項の符号と、不等号の向きの両方がちがう。` },
  ];
  const sh = r.shuffle(opts);
  return {
    prompt: `不等式 ${poly([[al, "x"], [be, ""]])} ${op} ${poly([[ga, "x"], [de, ""]])} を解きなさい。`,
    answer: { kind: "choice", options: sh.map((o) => o.t), correct: sh.findIndex((o) => o.ok), why: sh.map((o) => o.why) },
    point: "x の項を左へ集め、係数が負なら向きを逆に",
    steps: [
      { title: "移項して ax ? b の形に", body: `x の項を左辺、数を右辺に集めると {{${poly([[diff, "x"]])} ${op} ${D(de - be)}}}。`, back: [S2] },
      {
        title: "x の係数でわる",
        body: diff < 0 ? `負の数 ${D(diff)} でわるので、{{向きが逆}}になって x ${sol} ${kk}。` : `${diff} でわって x ${sol} ${kk}。`,
        trap: "係数が負のとき、わったあとに不等号の向きを変え忘れやすい。",
      },
    ],
  };
}

function renritsu(r: Rng): QuestionBody {
  const lo0 = r.int(-6, 3);
  const hi0 = lo0 + r.int(2, 7);
  const opHi = r.pick<Op>(["<", "≦"]);
  const opLo = r.pick<Op>([">", "≧"]);
  const A = makeIneq(r, hi0, opHi);
  const B = makeIneq(r, lo0, opLo);
  const lo = opLo === ">" ? lo0 + 1 : lo0;
  const hi = opHi === "<" ? hi0 - 1 : hi0;
  const cnt = hi - lo + 1;
  return {
    prompt: `連立不等式\n${A.text}\n${B.text}\nを満たす整数 x は何個ありますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(cnt)], unit: "個", calc: `${hi}-(${lo})+1` },
    point: "それぞれ解いてから、数直線で重なりをとる",
    steps: [
      { title: "1つ目を解く", body: `${A.how}。`, back: [S2] },
      { title: "2つ目を解く", body: `${B.how}。`, back: [S3] },
      {
        title: "共通の範囲の整数",
        body: `${D(lo0)} ${opLo === ">" ? "<" : "≦"} x ${opHi} ${D(hi0)} なので、整数は ${D(lo)} から ${D(hi)} までの {{${cnt}個}}。`,
        trap: "端の数が入るか（＜ か ≦ か）を確かめてから数える。",
      },
    ],
  };
}

function zettai(r: Rng): QuestionBody {
  const p = r.pick([1, 2, 2, 3]);
  const a = nz(r, -7, 7);
  const b = r.int(2, 9);
  const strict = r.bool();
  const ok = (x: number) => (strict ? Math.abs(p * x - a) < b : Math.abs(p * x - a) <= b);
  const xs = Array.from({ length: 201 }, (_, i) => i - 100).filter(ok);
  const lo = xs[0];
  const hi = xs[xs.length - 1];
  const lhs = `|${poly([[p, "x"], [-a, ""]])}|`;
  const op = strict ? "<" : "≦";
  return {
    prompt: `不等式 ${lhs} ${op} ${b} を満たす整数 x は何個ありますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(xs.length)], unit: "個", calc: `${hi}-(${lo})+1` },
    point: "|A| ＜ b は −b ＜ A ＜ b。両側をいっしょに解く",
    steps: [
      { title: "絶対値をはずす", body: `|A| ${op} ${b} は {{−${b} ${op} ${poly([[p, "x"], [-a, ""]])} ${op} ${b}}}。`, back: [S4] },
      { title: "x について解く", body: `${D(a)} を各辺にたして${p === 1 ? "" : ` ${p} でわり`}、${frac(a - b, p)} ${op} x ${op} ${frac(a + b, p)}。` },
      { title: "整数を数える", body: `${D(lo)} から ${D(hi)} までの {{${xs.length}個}}。`, trap: "端が分数のときは、その内側でいちばん近い整数から数える。" },
    ],
  };
}

const GOODS: [string, string][] = [
  ["ケーキ", "シュークリーム"],
  ["ノート", "えんぴつ"],
  ["りんご", "みかん"],
  ["大人用のチケット", "子ども用のチケット"],
];

function bunsho(r: Rng): QuestionBody {
  const [g1, g2] = r.pick(GOODS);
  const q = r.step(60, 150, 10);
  const p = q + r.step(40, 150, 10);
  const n = r.int(10, 20);
  // p x + q (n − x) ≦ B → x ≦ (B − qn)/(p − q)。答え (最大の x) を先に決め、B を少し上乗せして端数を作る
  const xmax = r.int(2, n - 2);
  const extra = r.int(0, (p - q) / 10 - 1) * 10;
  const B = q * n + (p - q) * xmax + extra;
  const unitWord = g1.includes("チケット") ? "枚" : g1 === "ノート" ? "冊" : "個";
  const unit2 = g2.includes("チケット") ? "枚" : g2 === "えんぴつ" ? "本" : "個";
  return {
    prompt: `1${unitWord} ${p}円の${g1}と、1${unit2} ${q}円の${g2}を、合わせて ${n}${unitWord === unit2 ? unitWord : "点"} 買います。代金の合計を ${B}円以下にするとき、${g1}は最大で何${unitWord}買えますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(xmax)], unit: unitWord, calc: `(${B}-${q}*${n}-${extra})/(${p}-${q})` },
    point: "不等式を立てて解き、整数の中で最大のものを選ぶ",
    steps: [
      { title: "不等式を立てる", body: `${g1}を x${unitWord}とすると、${g2}は (${n} − x)${unit2}。{{${p}x + ${q}(${n} − x) ≦ ${B}}}。`, back: [S5] },
      { title: "解く", body: `${p - q}x ≦ ${B - q * n} なので、x ≦ ${frac(B - q * n, p - q)}。` },
      { title: "整数で答える", body: `x は整数なので、最大は {{${xmax}${unitWord}}}。`, trap: extra ? "x ≦ の右辺が整数でないときは、切り捨てた整数が答え。四捨五入しない。" : "右辺がちょうど整数なら、その数まで買える（≦ なので等号もふくむ）。" },
    ],
  };
}

function moji(r: Rng): QuestionBody {
  const Lx = r.int(-3, 3);
  const k = r.int(2, 4);
  const d = r.int(2, 4);
  const c = nz(r, -6, 6);
  const B = makeIneq(r, Lx, "≧");
  // dx − c ＜ a ⇔ x ＜ (a + c)/d。整数 Lx, …, Lx+k−1 のちょうど k 個 ⇔ Lx+k−1 ＜ (a+c)/d ≦ Lx+k
  const p = d * (Lx + k - 1) - c;
  const q = d * (Lx + k) - c;
  return {
    prompt: `x についての連立不等式\n${B.text}\n${poly([[d, "x"], [-c, ""]])} < a\nを満たす整数 x がちょうど ${k}個あるような定数 a の値の範囲は、p < a ≦ q である。p、q を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(p), String(q)], labels: ["p =", "q ="], equations: [`p+(${c})=${d}*(${Lx + k - 1})`, `q+(${c})=${d}*(${Lx + k})`] },
    point: "整数が入る位置を数直線で決め、端の等号を確かめる",
    steps: [
      { title: "a をふくまない方を解く", body: `${B.how}。`, back: [S2] },
      { title: "a をふくむ方を解く", body: `x < (a ${c < 0 ? "−" : "+"} ${Math.abs(c)})/${d}。整数 ${D(Lx)}, ${D(Lx + 1)}, … がちょうど${k}個（${D(Lx + k - 1)} まで）入ればよい。`, back: [S3] },
      {
        title: "端を決める",
        body: `{{${D(Lx + k - 1)} < (a ${c < 0 ? "−" : "+"} ${Math.abs(c)})/${d} ≦ ${D(Lx + k)}}}。${d} をかけて ${D(-c)} をたすと ${D(p)} < a ≦ ${D(q)}。`,
        trap: `(a${c < 0 ? "−" : "+"}${Math.abs(c)})/${d}＝${D(Lx + k)} のときは x < ${D(Lx + k)} なので ${D(Lx + k)} は入らず、ちょうど${k}個。等号の位置に注意。`,
      },
    ],
  };
}

export const H_MATH_1_FUTOSHIKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "不等式の性質と一次不等式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "seishitsu", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: seishitsu },
        { id: "ichiji", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: ichiji },
      ],
    },
    {
      title: "連立不等式・絶対値・文章題",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "renritsu", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: renritsu },
        { id: "zettai", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: zettai },
        { id: "bunsho", type: "A", difficulty: 2, points: 18, seconds: 150, skill: "思考・判断・表現", generate: bunsho },
      ],
    },
    {
      title: "整数解の個数と定数の範囲",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "moji", type: "A", difficulty: 3, points: 24, seconds: 240, skill: "思考・判断・表現", generate: moji }],
    },
  ],
};
