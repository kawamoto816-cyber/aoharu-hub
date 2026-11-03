// 小6算数「文字と式」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// x の値の問題は、先に x を決めてから式の右側の数を作る (答えは整数)。式を選ぶ問題は、まちがいの式も同じ数から作る。
// calc (問題の数から答えを出す式) と equations (答えを x に入れると成り立つ式) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-moji-shiki";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_X = { label: "□のかわりに、xを使う", href: L(1) };
const BACK_XY = { label: "2つの量の関係を、xとyで表す", href: L(2) };
const BACK_MODOSU = { label: "xの値を求める：逆の計算でもどす", href: L(3) };
const BACK_YOMU = { label: "式から場面を読みとる", href: L(4) };

const num = (answer: number, calc: string, eq?: string, unit?: string): NumQ => ({
  kind: "num",
  answerKind: "num",
  answer: [String(answer)],
  labels: ["x ="],
  calc,
  ...(eq ? { equations: [eq] } : {}),
  ...(unit ? { unit } : {}),
});
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}

function tasu(r: Rng): QuestionBody {
  const x = r.int(12, 95);
  const a = r.int(15, 80);
  const plus = r.bool();
  const b = plus ? x + a : x - a;
  if (!plus && b <= 0) return tasu(r);
  return {
    prompt: `x${plus ? "＋" : "−"}${a}＝${b} のとき、xの値を求めなさい。`,
    answer: num(x, plus ? `${b}-${a}` : `${b}+${a}`, plus ? `x+${a}=${b}` : `x-${a}=${b}`),
    point: plus ? "たし算は、ひき算でもどす" : "ひき算は、たし算でもどす",
    steps: [{ title: "逆の計算でもどす", body: `x＝${b}${plus ? "−" : "＋"}${a}＝{{${x}}} です。`, back: [BACK_MODOSU] }],
  };
}

function kake(r: Rng): QuestionBody {
  const x = r.int(6, 40);
  const a = r.int(3, 15);
  return {
    prompt: `x×${a}＝${x * a} のとき、xの値を求めなさい。`,
    answer: num(x, `${x * a}/${a}`, `x*${a}=${x * a}`),
    point: "かけ算は、わり算でもどす",
    steps: [{ title: "逆の計算でもどす", body: `x＝${x * a}÷${a}＝{{${x}}} です。`, trap: `${x * a}×${a} としない。かけた数でわってもどします。`, back: [BACK_MODOSU] }],
  };
}

function dainyu(r: Rng): QuestionBody {
  const a = r.step(40, 150, 10);
  const b = r.step(200, 600, 50);
  const x = r.int(3, 12);
  const thing = r.pick(["けしゴム", "ボール", "おかし"]);
  const y = a * x + b;
  return {
    prompt: `1こ${a}円の${thing}を x こと、${b}円のふでばこを1つ買ったときの代金を y 円とすると、y＝${a}×x＋${b} と表せます。x が ${x} のとき、y の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(y)], labels: ["y ="], calc: `${a}*${x}+${b}` },
    point: "x に数を入れて計算する（かけ算が先）",
    steps: [{ title: "x に入れる", body: `y＝${a}×${x}＋${b}＝${a * x}＋${b}＝{{${y}}} です。`, back: [BACK_XY] }],
  };
}

function erabu(r: Rng): QuestionBody {
  const n = r.int(3, 9);
  const b = r.step(50, 200, 10);
  const thing = r.pick(["ジュース", "パン", "おにぎり"]);
  return {
    prompt: `1こ x 円の${thing}を ${n}こと、${b}円のおかしを1つ買いました。代金の合計を表す式はどれですか。`,
    answer: choice(
      r,
      [`x×${n}＋${b}`, `${thing}の代金は x×${n}、それにおかしの${b}円をたします。`],
      [
        [`x＋${n}＋${b}`, `x＋${n} は、x円に${n}円をたしたことになる。${n}こ分はかけ算です。`],
        [`（x＋${b}）×${n}`, `これは、${thing}とおかしを${n}組買ったときの代金です。おかしは1つだけです。`],
        [`x×${b}＋${n}`, `数の役わりが入れかわっています。x円の${thing}が${n}こなので x×${n} です。`],
      ],
    ),
    point: `「1こ x 円が${n}こ」は x×${n}`,
    steps: [{ title: "ことばの式から", body: `${thing}の代金＋おかしの代金＝代金の合計。{{x×${n}＋${b}}} です。`, back: [BACK_X] }],
  };
}

function gyaku2(r: Rng): QuestionBody {
  const x = r.int(5, 30);
  const a = r.int(3, 12);
  const b = r.int(5, 60);
  const mode = r.int(0, 2);
  if (mode === 0) {
    const c = x * a + b;
    return {
      prompt: `x×${a}＋${b}＝${c} のとき、xの値を求めなさい。`,
      answer: num(x, `(${c}-${b})/${a}`, `x*${a}+${b}=${c}`),
      point: "あとからした計算から、順にもどす",
      steps: [
        { title: `＋${b} をもどす`, body: `x×${a}＝${c}−${b}＝${c - b} です。`, back: [BACK_MODOSU] },
        { title: `×${a} をもどす`, body: `x＝${c - b}÷${a}＝{{${x}}} です。`, trap: `先に ${c}÷${a} をしない。最後にした「＋${b}」から先にもどします。` },
      ],
    };
  }
  if (mode === 1) {
    const xx = x + b;
    const c = x * a;
    return {
      prompt: `（x−${b}）×${a}＝${c} のとき、xの値を求めなさい。`,
      answer: num(xx, `${c}/${a}+${b}`, `(x-${b})*${a}=${c}`),
      point: "（　）の外の計算から先にもどす",
      steps: [
        { title: `×${a} をもどす`, body: `x−${b}＝${c}÷${a}＝${x} です。`, back: [BACK_MODOSU] },
        { title: `−${b} をもどす`, body: `x＝${x}＋${b}＝{{${xx}}} です。` },
      ],
    };
  }
  const c = x * a - b;
  if (c <= 0) return gyaku2(r);
  return {
    prompt: `x×${a}−${b}＝${c} のとき、xの値を求めなさい。`,
    answer: num(x, `(${c}+${b})/${a}`, `x*${a}-${b}=${c}`),
    point: "あとからした計算から、順にもどす",
    steps: [
      { title: `−${b} をもどす`, body: `x×${a}＝${c}＋${b}＝${c + b} です。`, back: [BACK_MODOSU] },
      { title: `×${a} をもどす`, body: `x＝${c + b}÷${a}＝{{${x}}} です。` },
    ],
  };
}

function bamen(r: Rng): QuestionBody {
  const k = r.pick([3, 4, 5, 6]);
  const n = r.int(50, 150);
  const cases = [
    {
      expr: "x×4",
      right: "1辺が x cm の正方形の、まわりの長さ",
      why: "正方形の辺は4本で、どれも x cm。まわりは x×4 です。",
      wrongs: [
        ["1辺が x cm の正方形の面積", "面積は x×x です。"],
        [`x cm のテープを4等分した1本の長さ`, "4等分なら x÷4 です。"],
        ["x 才の人の、4年後の年れい", "4年後なら x＋4 です。"],
      ],
    },
    {
      expr: `x÷${k}`,
      right: `x まいの色紙を${k}人で同じ数ずつ分けたときの、1人分のまい数`,
      why: `同じ数ずつ分けるので、x÷${k} です。`,
      wrongs: [
        [`1人 x まいずつ${k}人に配るときの、全部のまい数`, `全部なら x×${k} です。`],
        [`x まいから${k}まい使ったときの、残りのまい数`, `残りなら x−${k} です。`],
        [`x まいに${k}まいもらったときの、全部のまい数`, `合わせるなら x＋${k} です。`],
      ],
    },
    {
      expr: `${n}−x`,
      right: `${n}ページの本を x ページ読んだときの、残りのページ数`,
      why: `全部から読んだ分をひくので、${n}−x です。`,
      wrongs: [
        [`1日 x ページずつ${n}日読んだときの、全部のページ数`, `全部なら x×${n} です。`],
        [`${n}ページの本を x 日で読むときの、1日あたりのページ数`, `1日あたりなら ${n}÷x です。`],
        [`x ページ読んだあと、さらに${n}ページ読んだときのページ数`, `合わせるなら x＋${n} です。`],
      ],
    },
  ];
  const c = r.pick(cases);
  return {
    prompt: `式 ${c.expr} が表しているものはどれですか。`,
    answer: choice(r, [c.right, c.why], c.wrongs as [string, string][]),
    point: "式の記号から、場面の言葉を思いうかべる",
    steps: [{ title: "それぞれ式にしてみる", body: `選たくしの場面をそれぞれ式にして、{{${c.expr}}} になるものをさがします。`, back: [BACK_YOMU] }],
  };
}

export const E_MATH_6_MOJI_SHIKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "xの値・yの値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "tasu", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: tasu },
        { id: "kake", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: kake },
        { id: "dainyu", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: dainyu },
      ],
    },
    {
      title: "場面を式に表す・逆にたどる",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "erabu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: erabu },
        { id: "gyaku2", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: gyaku2 },
      ],
    },
    {
      title: "式から場面を読みとる",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [{ id: "bamen", type: "A", difficulty: 3, points: 21, seconds: 120, skill: "思考・判断・表現", generate: bamen }],
    },
  ],
};
