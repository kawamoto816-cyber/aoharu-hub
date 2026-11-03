// 情報Ⅰ「プログラミング」の単元模試 (A: プログラムの数値を入れかえる生成型、共通テストの表記)。問題はすべてオリジナル。
// プログラムは共通テストの表記 (代入は「=」、商の整数部分「÷」、余り「%」、「もし … ならば：」「〜の間繰り返す：」、
//   配列の添字は 0 から) で書き、くり返しの中の行は先頭に「｜」をつける。
// 検算: 各問題のプログラムを JS で同じ手順どおりに実行した結果を答えにし、calc にはその値を出す式 (代入の流れ・和の式・
//   商と余りの式) を書く。トレースの表も同じ実行から作る (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-program";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "変数と代入：「＝」は「等しい」ではない");
const S2 = L(2, "計算と比較の記号");
const S3 = L(3, "分岐：条件で進む道を変える");
const S4 = L(4, "くり返し：変数の変化を表にする");
const S5 = L(5, "配列と最大値：添字は0から");
const S7 = L(7, "バグとデバッグ");

const code = (lines: string[]) => lines.map((l, i) => `(${i + 1}) ${l}`).join("\n");

function dainyu(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const b = r.int(2, 9);
  const k = r.int(1, 3);
  let x = a;
  let y = b;
  const kind = r.int(0, 2);
  let lines: string[];
  if (kind === 0) {
    // 入れかえのつもりの誤り
    lines = [`x = ${a}`, `y = ${b}`, "x = y", "y = x", "表示する(x + y)"];
    x = y;
    y = x;
  } else if (kind === 1) {
    lines = [`x = ${a}`, `y = ${b}`, "t = x", "x = y", "y = t", `表示する(x * ${k} + y)`];
    const t = x;
    x = y;
    y = t;
  } else {
    lines = [`x = ${a}`, `y = ${b}`, "x = x + y", "y = x - y", "x = x - y", `表示する(x * ${k} + y)`];
    x = x + y;
    y = x - y;
    x = x - y;
  }
  const kk = kind === 0 ? 1 : k;
  const v = x * kk + y;
  return {
    prompt: `次のプログラムを実行したとき、表示される値を答えなさい。\n${code(lines)}`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `${x}*${kk}+${y}` },
    point: "代入すると前の値は消える。1行ずつ x・y を書く",
    steps: [
      { title: "1行ずつ追う", body: `最後に x＝${x}、y＝${y} になります。`, back: [S1] },
      { title: "表示する値", body: `${kind === 0 ? "x ＋ y" : `x × ${k} ＋ y`}＝{{${v}}}。`, trap: kind === 0 ? "x = y のあとの y = x では、x はもう y の値。入れかわらない。" : "「=」は等しいではなく代入。右辺を計算してから左の変数に入れる。" },
    ],
  };
}

function amari(r: Rng): QuestionBody {
  const a = r.int(20, 99);
  const b = r.int(3, 9);
  const c = r.int(2, 5);
  const q = Math.floor(a / b);
  const m = a % b;
  const kind = r.int(0, 2);
  const expr = kind === 0 ? `a ÷ b + a % b` : kind === 1 ? `(a % b) * ${c} + a ÷ b` : `a ÷ b * ${c} - a % b`;
  const v = kind === 0 ? q + m : kind === 1 ? m * c + q : q * c - m;
  const calc = kind === 0 ? `${q}+${m}` : kind === 1 ? `${m}*${c}+${q}` : `${q}*${c}-${m}`;
  return {
    prompt: `次のプログラムを実行したとき、表示される値を答えなさい。ただし「÷」は商の整数部分、「%」は余りを求める演算です。\n${code([`a = ${a}`, `b = ${b}`, `表示する(${expr})`])}`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc },
    point: "÷ は商の整数部分、% は余り",
    steps: [
      { title: "商と余り", body: `${a} ÷ ${b} は ${q}、${a} % ${b} は ${m}（${a}＝${b}×${q}＋${m}）。`, back: [S2] },
      { title: "式に入れる", body: `${expr.replace("a ÷ b", String(q)).replace("a % b", String(m))}＝{{${v}}}。`, trap: `${a} ÷ ${b} を小数（${Math.round((a / b) * 100) / 100}…）にしない。` },
    ],
  };
}

function bunki(r: Rng): QuestionBody {
  const p = r.pick([3, 4, 5]);
  const q = r.pick([2, 3].filter((v) => v !== p));
  const x = r.int(10, 60);
  const lines = [
    `x = ${x}`,
    `もし x % ${p} == 0 ならば：`,
    `｜ y = x ÷ ${p}`,
    `そうでなくもし x % ${q} == 0 ならば：`,
    `｜ y = x ÷ ${q}`,
    "そうでなければ：",
    "｜ y = x * 3 + 1",
    "表示する(y)",
  ];
  const which = x % p === 0 ? 0 : x % q === 0 ? 1 : 2;
  const y = which === 0 ? x / p : which === 1 ? x / q : 3 * x + 1;
  return {
    prompt: `次のプログラムを実行したとき、表示される値を答えなさい。\n${code(lines)}`,
    answer: { kind: "num", answerKind: "num", answer: [String(y)], calc: which === 0 ? `${x}/${p}` : which === 1 ? `${x}/${q}` : `${x}*3+1` },
    point: "上から順に条件を調べ、最初に真になった所だけ実行",
    steps: [
      { title: "条件を順に調べる", body: `${x} % ${p}＝${x % p}${which === 0 ? " で真" : "（偽）"}${which >= 1 ? `、${x} % ${q}＝${x % q}${which === 1 ? " で真" : "（偽）"}` : ""}。`, back: [S3, S2] },
      { title: "実行する行", body: `${which === 0 ? "(3)" : which === 1 ? "(5)" : "(7)"} だけを実行して y＝{{${y}}}。`, trap: "真になった所より下の条件は調べない。2つ以上の道を同時に実行しない。" },
    ],
  };
}

function hanpuku(r: Rng): QuestionBody {
  const a = r.int(1, 4);
  const b = a + r.int(3, 6);
  const st = r.pick([1, 1, 2]);
  const k = r.int(1, 4);
  const is: number[] = [];
  for (let i = a; i <= b; i += st) is.push(i);
  let s = 0;
  const hist: number[] = [];
  for (const i of is) {
    s += i * k;
    hist.push(s);
  }
  const body = k === 1 ? "s = s + i" : `s = s + i * ${k}`;
  const lines = ["s = 0", `i を ${a} から ${b} まで ${st} ずつ増やしながら繰り返す：`, `｜ ${body}`, "表示する(s)"];
  return {
    prompt: `次のプログラムを実行したとき、表示される値を答えなさい。\n${code(lines)}`,
    answer: { kind: "num", answerKind: "num", answer: [String(s)], calc: is.map((i) => `${i}*${k}`).join("+") },
    point: "i と s の値を表に書いて追う",
    steps: [
      { title: "i の値", body: `i は ${is.join(", ")} と変わります（${b} をこえたら終わり）。`, back: [S4] },
      { title: "s の変化", body: `s は ${hist.join(" → ")}。表示は {{${s}}}。`, trap: `最後の i＝${is[is.length - 1]} の回も実行する。` },
    ],
  };
}

function aida(r: Rng): QuestionBody {
  const x0 = r.int(1, 5);
  const m = r.pick([2, 3]);
  const lim = r.int(20, 200);
  let x = x0;
  let n = 0;
  const hist = [x];
  while (x < lim) {
    x = x * m;
    n++;
    hist.push(x);
  }
  const askN = r.bool();
  const lines = [`x = ${x0}`, "n = 0", `x < ${lim} の間繰り返す：`, `｜ x = x * ${m}`, "｜ n = n + 1", `表示する(${askN ? "n" : "x"})`];
  const v = askN ? n : x;
  return {
    prompt: `次のプログラムを実行したとき、表示される値を答えなさい。\n${code(lines)}`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: askN ? String(n) : `${x0}*${m}^${n}` },
    point: "条件を調べるのはくり返しの頭。偽になったら抜ける",
    steps: [
      { title: "x の変化", body: `x は ${hist.join(" → ")} と変わります。`, back: [S4] },
      { title: "抜けるとき", body: `x＝${x} で x < ${lim} が偽になり、くり返しを抜けます。このとき n＝${n}。表示は {{${v}}}。`, trap: `${lim} をこえる直前で止まるのではない。こえた値になってから抜ける。` },
    ],
  };
}

function hairetsu(r: Rng): QuestionBody {
  const n = r.int(6, 8);
  const top = r.int(30, 60);
  const data = r.sample([...Array(25)].map((_, i) => i + 3), n);
  const p1 = r.int(0, n - 2);
  const p2 = r.int(p1 + 1, n - 1);
  data[p1] = top;
  data[p2] = top;
  const ge = r.bool();
  let mx = data[0];
  let k = 0;
  for (let i = 1; i < n; i++) if (ge ? data[i] >= mx : data[i] > mx) {
    mx = data[i];
    k = i;
  }
  const lines = [
    `Data = [${data.join(", ")}]`,
    "m = Data[0]",
    "k = 0",
    "i を 1 から 要素数(Data) - 1 まで 1 ずつ増やしながら繰り返す：",
    `｜ もし Data[i] ${ge ? ">=" : ">"} m ならば：`,
    "｜ ｜ m = Data[i]",
    "｜ ｜ k = i",
    "表示する(k)",
  ];
  return {
    prompt: `次のプログラムを実行したとき、表示される値を答えなさい。要素数(Data) は配列 Data の要素の個数を返す関数で、添字は 0 から始まります。\n${code(lines)}`,
    answer: { kind: "num", answerKind: "num", answer: [String(k)], calc: String(k) },
    point: "「>」と「>=」で、同じ値が2つあるときの結果が変わる",
    steps: [
      { title: "最大値の位置", body: `最大値 ${top} は Data[${p1}] と Data[${p2}] の2か所にあります。`, back: [S5] },
      { title: "比較の記号", body: ge ? `「>=」なので、同じ値でも更新されます。後ろの Data[${p2}] で k が更新され、表示は {{${k}}}。` : `「>」なので、同じ値では更新されません。最初の Data[${p1}] のまま、表示は {{${k}}}。`, back: [S7], trap: "表示するのは最大値ではなく添字 k。添字は 0 から数える。" },
    ],
  };
}

export const H_INFO_1_PROGRAM_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "変数と演算",
      lead: "次のプログラムについて、問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "dainyu", type: "A", difficulty: 1, points: 15, seconds: 75, skill: "知識・技能", generate: dainyu },
        { id: "amari", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: amari },
      ],
    },
    {
      title: "分岐とくり返し",
      lead: "次のプログラムについて、問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "bunki", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: bunki },
        { id: "hanpuku", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: hanpuku },
        { id: "aida", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: aida },
      ],
    },
    {
      title: "配列",
      lead: "次のプログラムについて、問いに答えなさい。",
      style: "calc",
      questions: [{ id: "hairetsu", type: "A", difficulty: 3, points: 22, seconds: 180, skill: "思考・判断・表現", generate: hairetsu }],
    },
  ],
};
