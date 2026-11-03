// 数学Ⅰ「集合と命題」の単元模試 (A: 数値・集合を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 要素の個数は 1〜N を1つずつ調べて数えた答えと、n(A)＋n(B)−n(A∩B) などの式 (calc) を scripts/check-moshi.ts で照合する。
//   必要・十分の判定は、区間の端を比べて包含関係を生成関数の中で決める (答えから問題を作る)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-shugo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "集合の記号を読む");
const S2 = L(2, "要素を書き出して、共通部分・和集合・ド・モルガン");
const S3 = L(3, "「p ならば q」の真偽は、集合の包含で決まる");
const S4 = L(4, "必要条件・十分条件は、矢印の向きで決まる");
const S5 = L(5, "逆・裏・対偶：対偶だけは真偽が同じ");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");

const BAR = "̄"; // 補集合の上線
const Ab = `A${BAR}`;
const Bb = `B${BAR}`;

function kosu(r: Rng): QuestionBody {
  const N = r.int(30, 100);
  const [a, b] = r.sample([2, 3, 4, 5, 6, 7], 2).sort((x, y) => x - y);
  const l = (a * b) / gcd(a, b);
  const nA = Math.floor(N / a);
  const nB = Math.floor(N / b);
  const nAB = Math.floor(N / l);
  const kind = r.int(0, 2);
  const xs = Array.from({ length: N }, (_, i) => i + 1);
  const inA = (x: number) => x % a === 0;
  const inB = (x: number) => x % b === 0;
  const [label, test, calc, how] = [
    [`${Ab} ∩ ${Bb}`, (x: number) => !inA(x) && !inB(x), `${N}-(${nA}+${nB}-${nAB})`, `ド・モルガンの法則で ${Ab} ∩ ${Bb}＝(A ∪ B)${BAR}。n(A ∪ B)＝${nA}＋${nB}−${nAB}＝${nA + nB - nAB} なので、${N}−${nA + nB - nAB}`],
    ["A ∪ B", (x: number) => inA(x) || inB(x), `${nA}+${nB}-${nAB}`, `n(A ∪ B)＝n(A)＋n(B)−n(A ∩ B)＝${nA}＋${nB}−${nAB}`],
    [`A ∩ ${Bb}`, (x: number) => inA(x) && !inB(x), `${nA}-${nAB}`, `A の要素から、B にも入るもの（A ∩ B）を除いて ${nA}−${nAB}`],
  ][kind] as [string, (x: number) => boolean, string, string];
  const ans = xs.filter(test).length;
  return {
    prompt: `全体集合 U＝{x | x は ${N} 以下の自然数} の部分集合 A＝{x | x は ${a} の倍数}、B＝{x | x は ${b} の倍数} について、n(${label}) を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc },
    point: "n(A∪B)＝n(A)＋n(B)−n(A∩B) を土台にする",
    steps: [
      { title: "それぞれの個数", body: `n(A)＝${nA}、n(B)＝${nB}。A ∩ B は ${l} の倍数で n(A ∩ B)＝${nAB}。`, back: [S1], trap: `A ∩ B を ${a}×${b}＝${a * b} の倍数としない。${a} と ${b} の最小公倍数 ${l} の倍数です。` },
      { title: "式にあてはめる", body: `${how}＝{{${ans}}}。`, back: [S2] },
    ],
  };
}

const show = (s: number[]) => (s.length ? `{${s.join(", ")}}` : "∅");

function demorgan(r: Rng): QuestionBody {
  const U10 = Array.from({ length: 10 }, (_, i) => i + 1);
  const ops: [string, (a: boolean, b: boolean) => boolean][] = [
    [`${Ab} ∩ ${Bb}`, (a, b) => !a && !b],
    [`${Ab} ∪ ${Bb}`, (a, b) => !a || !b],
    [`A ∩ ${Bb}`, (a, b) => a && !b],
    [`${Ab} ∩ B`, (a, b) => !a && b],
    ["A ∩ B", (a, b) => a && b],
    ["A ∪ B", (a, b) => a || b],
  ];
  let A: number[] = [];
  let B: number[] = [];
  let sets: string[] = [];
  for (let i = 0; i < 30; i++) {
    A = r.sample(U10, r.int(4, 6)).sort((x, y) => x - y);
    B = r.sample(U10, r.int(4, 6)).sort((x, y) => x - y);
    sets = ops.map(([, f]) => show(U10.filter((x) => f(A.includes(x), B.includes(x)))));
    if (new Set(sets).size === sets.length) break;
  }
  const ask = r.int(0, 3);
  const others = r.sample([0, 1, 2, 3, 4, 5].filter((i) => i !== ask && sets[i] !== sets[ask]), 3);
  const idx = r.shuffle([ask, ...others]);
  const opts = idx.map((i) => sets[i]);
  return {
    prompt: `全体集合 U＝{1, 2, 3, …, 10} の部分集合 A＝${show(A)}、B＝${show(B)} について、${ops[ask][0]} を要素を書き並べて表したものはどれですか。`,
    answer: { kind: "choice", options: opts, correct: idx.indexOf(ask), why: idx.map((i) => (i === ask ? `正しい。${ops[ask][0]} の要素をすべて書き出すとこうなる。` : `これは ${ops[i][0]} の要素。`)) },
    point: ask <= 1 ? "補集合どうしの ∩・∪ は、ド・モルガンで1つにまとめる" : "補集合を書き出してから、共通部分をとる",
    steps: [
      { title: "補集合を書き出す", body: `${Ab}＝${show(U10.filter((x) => !A.includes(x)))}、${Bb}＝${show(U10.filter((x) => !B.includes(x)))}。`, back: [S1] },
      {
        title: ask === 0 ? "ド・モルガンの法則" : ask === 1 ? "ド・モルガンの法則" : "共通部分をとる",
        body:
          ask === 0
            ? `${Ab} ∩ ${Bb}＝(A ∪ B)${BAR}。A ∪ B＝${sets[5]} 以外の要素で、答えは ${sets[0]}。`
            : ask === 1
              ? `${Ab} ∪ ${Bb}＝(A ∩ B)${BAR}。A ∩ B＝${sets[4]} 以外の要素で、答えは ${sets[1]}。`
              : `{{両方に入る要素}}を選んで ${sets[ask]}。`,
        back: [S2],
        trap: "∩（共通部分）と ∪（和集合）を取りちがえない。∩ は「両方に入る」、∪ は「少なくとも一方に入る」。",
      },
    ],
  };
}

const KIND = ["必要十分条件である", "必要条件であるが、十分条件でない", "十分条件であるが、必要条件でない", "必要条件でも十分条件でもない"];

function hitsuyo(r: Rng): QuestionBody {
  const a = r.int(-4, 5);
  const b = r.int(2, 5);
  const out = r.int(0, 3); // 0 同じ / 1 abs ⊋ 区間 / 2 abs ⊊ 区間 / 3 どちらでもない
  let c = a - b;
  let d = a + b;
  if (out === 1) {
    const i = r.int(0, 1);
    c += i;
    d -= i === 0 ? 1 : r.int(0, 1);
  } else if (out === 2) {
    const i = r.int(0, 2);
    c -= i;
    d += i === 0 ? r.int(1, 2) : r.int(0, 2);
  } else if (out === 3) {
    const s = r.pick([-2, -1, 1, 2]);
    c += s;
    d += s;
  }
  const absText = `|x ${a < 0 ? "+" : "−"} ${Math.abs(a)}| < ${b}`.replace("|x − 0|", "|x|").replace("|x + 0|", "|x|");
  const intText = `${D(c)} < x < ${D(d)}`;
  const absFirst = r.bool();
  const [pT, qT] = absFirst ? [absText, intText] : [intText, absText];
  const [pl, ph, ql, qh] = absFirst ? [a - b, a + b, c, d] : [c, d, a - b, a + b];
  const pq = ql <= pl && ph <= qh; // p ⇒ q
  const qp = pl <= ql && qh <= ph; // q ⇒ p
  const correct = pq && qp ? 0 : qp ? 1 : pq ? 2 : 3;
  return {
    prompt: `実数 x についての条件 p：${pT}、q：${qT} がある。p は q であるための条件として、正しいものはどれですか。`,
    answer: {
      kind: "choice",
      options: KIND,
      correct,
      why: [
        correct === 0 ? "正しい。p と q の範囲がまったく同じ。" : "p と q の範囲は同じではない。",
        correct === 1 ? "正しい。q の範囲が p の範囲にふくまれるので q ⇒ p が真、p ⇒ q は偽。" : qp ? "q ⇒ p は真だが、ほかの向きも見ること。" : "q の範囲が p の範囲にふくまれていないので、q ⇒ p は偽。",
        correct === 2 ? "正しい。p の範囲が q の範囲にふくまれるので p ⇒ q が真、q ⇒ p は偽。" : pq ? "p ⇒ q は真だが、ほかの向きも見ること。" : "p の範囲が q の範囲にふくまれていないので、p ⇒ q は偽。",
        correct === 3 ? "正しい。どちらの範囲も、もう一方にふくまれない。" : "少なくとも一方の向きの矢印が真になっている。",
      ],
    },
    point: "範囲が小さい方 ⇒ 大きい方。小さい方が十分条件",
    steps: [
      { title: "絶対値をはずす", body: `${absText} は ${D(a - b)} < x < ${D(a + b)}。`, back: [S3] },
      {
        title: "範囲の包含を見る",
        body: `p：${D(pl)} < x < ${D(ph)}、q：${D(ql)} < x < ${D(qh)}。p ⇒ q は${pq ? "真" : "偽"}、q ⇒ p は${qp ? "真" : "偽"}。`,
      },
      { title: "矢印の向きで決める", body: `p は q であるための {{${KIND[correct]}}}。`, back: [S4], trap: "「p ⇒ q が真なら、p は十分条件・q は必要条件」。どちらが矢印の根元かを取りちがえない。" },
    ],
  };
}

const VARS: [string, string][] = [
  ["x", "y"],
  ["a", "b"],
  ["m", "n"],
];

function taigu(r: Rng): QuestionBody {
  const [x, y] = r.pick(VARS);
  const b = r.int(1, 9);
  const c = r.int(1, 9);
  const s = b + c;
  const ask = r.int(0, 2); // 0 逆 1 裏 2 対偶
  const names = ["逆", "裏", "対偶"];
  const st = [
    `${x} > ${b} または ${y} > ${c} ならば ${x} + ${y} > ${s}`,
    `${x} + ${y} ≦ ${s} ならば ${x} ≦ ${b} かつ ${y} ≦ ${c}`,
    `${x} ≦ ${b} かつ ${y} ≦ ${c} ならば ${x} + ${y} ≦ ${s}`,
    `${x} ≦ ${b} または ${y} ≦ ${c} ならば ${x} + ${y} ≦ ${s}`,
  ];
  const idx = r.shuffle([0, 1, 2, 3]);
  const whyOf = (i: number) => (i === 3 ? "「または」の否定は「かつ」。ド・モルガンの法則で否定すると「かつ」になる。" : i === ask ? `正しい。もとの命題の${names[i]}。` : `これはもとの命題の${names[i]}。`);
  return {
    prompt: `実数 ${x}、${y} について、命題「${x} + ${y} > ${s} ならば ${x} > ${b} または ${y} > ${c}」の${names[ask]}はどれですか。`,
    answer: { kind: "choice", options: idx.map((i) => st[i]), correct: idx.indexOf(ask), why: idx.map(whyOf) },
    point: "逆は入れかえ、裏は否定、対偶は入れかえて否定",
    steps: [
      { title: "p と q を決める", body: `p：${x} + ${y} > ${s}、q：${x} > ${b} または ${y} > ${c}。否定は p̄：${x} + ${y} ≦ ${s}、q̄：{{${x} ≦ ${b} かつ ${y} ≦ ${c}}}。`, back: [S5] },
      {
        title: `${names[ask]}を作る`,
        body: `逆は q ⇒ p、裏は p̄ ⇒ q̄、対偶は q̄ ⇒ p̄。${names[ask]}は「${st[ask]}」。`,
        trap: "「または」を否定すると「かつ」になる。不等号も > は ≦ に変える。",
      },
    ],
  };
}

function hitei(r: Rng): QuestionBody {
  const t = r.int(0, 3);
  const k = r.int(1, 9);
  const m = r.int(2, 9);
  let prompt: string;
  let opts: string[];
  let how: string;
  if (t === 0) {
    prompt = `命題「すべての実数 x について x² + ${k} > ${m}x」の否定`;
    opts = [`ある実数 x について x² + ${k} ≦ ${m}x`, `すべての実数 x について x² + ${k} ≦ ${m}x`, `ある実数 x について x² + ${k} < ${m}x`, `すべての実数 x について x² + ${k} < ${m}x`];
    how = "「すべて」は「ある」に、> は ≦ に変える";
  } else if (t === 1) {
    prompt = `命題「ある自然数 n について n² = ${m}n + ${k}」の否定`;
    opts = [`すべての自然数 n について n² ≠ ${m}n + ${k}`, `ある自然数 n について n² ≠ ${m}n + ${k}`, `すべての自然数 n について n² = ${m}n + ${k}`, `ある自然数 n について n² < ${m}n + ${k}`];
    how = "「ある」は「すべて」に、= は ≠ に変える";
  } else if (t === 2) {
    prompt = `条件「x ≧ ${k} かつ y < ${m}」の否定`;
    opts = [`x < ${k} または y ≧ ${m}`, `x < ${k} かつ y ≧ ${m}`, `x ≦ ${k} または y > ${m}`, `x ≦ ${k} かつ y > ${m}`];
    how = "「かつ」は「または」に、≧ は <、< は ≧ に変える";
  } else {
    prompt = `条件「x > ${k} または y ≦ ${m}」の否定`;
    opts = [`x ≦ ${k} かつ y > ${m}`, `x ≦ ${k} または y > ${m}`, `x < ${k} かつ y > ${m}`, `x < ${k} または y ≧ ${m}`];
    how = "「または」は「かつ」に、> は ≦、≦ は > に変える";
  }
  const idx = r.shuffle([0, 1, 2, 3]);
  const whys = [
    "正しい。",
    t <= 1 ? "「すべて」と「ある」を入れかえていない（または等号・不等号の否定がちがう）。" : "「かつ」「または」の入れかえか、不等号の否定がちがう。",
    "不等号・等号の否定がちがう。等号が入るかどうかも反対になる。",
    "否定のしかたが2か所以上ちがう。",
  ];
  return {
    prompt: `${prompt}はどれですか。`,
    answer: { kind: "choice", options: idx.map((i) => opts[i]), correct: idx.indexOf(0), why: idx.map((i) => whys[i]) },
    point: how,
    steps: [
      { title: "ことばを入れかえる", body: `${how}。`, back: [S2], trap: "> の否定は ≦（< ではない）。等号の入る・入らないも入れかわる。" },
      { title: "否定を書く", body: `答えは {{${opts[0]}}}。` },
    ],
  };
}

function teisu(r: Rng): QuestionBody {
  const a = r.int(-3, 5);
  const b = r.int(2, 5);
  const suff = r.bool();
  const m = suff ? 2 * b + r.int(1, 4) : 2 * b - r.int(1, 3);
  const lo = suff ? a + b - m : a - b;
  const hi = suff ? a - b : a + b - m;
  const absText = `|x ${a < 0 ? "+" : "−"} ${Math.abs(a)}| ≦ ${b}`.replace("|x − 0|", "|x|");
  return {
    prompt: `実数 x についての条件 p：${absText}、q：k ≦ x ≦ k + ${m} がある（k は定数）。p が q であるための${suff ? "十分条件" : "必要条件"}となるような整数 k は何個ありますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(hi - lo + 1)], unit: "個", calc: `(${hi})-(${lo})+1` },
    point: suff ? "p が十分条件 ⇔ p の範囲が q の範囲にふくまれる" : "p が必要条件 ⇔ q の範囲が p の範囲にふくまれる",
    steps: [
      { title: "範囲で表す", body: `p は ${D(a - b)} ≦ x ≦ ${D(a + b)}、q は k ≦ x ≦ k + ${m}。`, back: [S3] },
      {
        title: "包含の条件",
        body: suff
          ? `p ⇒ q が真なので、{{k ≦ ${D(a - b)} かつ ${D(a + b)} ≦ k + ${m}}}。よって ${D(lo)} ≦ k ≦ ${D(hi)}。`
          : `q ⇒ p が真なので、{{${D(a - b)} ≦ k かつ k + ${m} ≦ ${D(a + b)}}}。よって ${D(lo)} ≦ k ≦ ${D(hi)}。`,
        back: [S4],
        trap: suff ? "十分条件は「p の方がせまい」。q ⊂ p と逆にしない。" : "必要条件は「q の方がせまい」。p ⊂ q と逆にしない。",
      },
      { title: "整数を数える", body: `${D(lo)} から ${D(hi)} までで {{${hi - lo + 1}個}}。端は等号が成り立つのでふくめる。` },
    ],
  };
}

export const H_MATH_1_SHUGO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "集合の要素",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "kosu", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: kosu },
        { id: "demorgan", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: demorgan },
      ],
    },
    {
      title: "命題と条件",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "hitsuyo", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: hitsuyo },
        { id: "taigu", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: taigu },
        { id: "hitei", type: "A", difficulty: 2, points: 16, seconds: 75, skill: "知識・技能", generate: hitei },
      ],
    },
    {
      title: "条件が成り立つ定数の範囲",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "teisu", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: teisu }],
    },
  ],
};
