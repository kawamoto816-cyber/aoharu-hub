// 小5算数「平均」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 先に平均を決め、合計がその個数倍になるようにデータを作る (平均は整数か小数第1位まで)。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-heikin";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_NARASU = { label: "ならすと、平均が見える", href: L(1) };
const BACK_SHIKI = { label: "平均＝合計÷個数", href: L(2) };
const BACK_GOUKEI = { label: "平均から合計を求める", href: L(3) };
const BACK_ZERO = { label: "0の日も個数に入れる", href: L(4) };
const BACK_HOHABA = { label: "歩はばを使って、きょりを測る", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });

/** 平均 m・個数 n・はば w のデータ (合計は m×n ちょうど) */
function data(r: Rng, m: number, n: number, w: number, min = 0): number[] {
  for (;;) {
    const xs = Array.from({ length: n - 1 }, () => r.int(Math.max(min, m - w), m + w));
    const last = m * n - xs.reduce((a, b) => a + b, 0);
    if (last >= Math.max(min, m - w) && last <= m + w) return r.shuffle([...xs, last]);
  }
}

function heikin(r: Rng): QuestionBody {
  const who = r.pick(["みかん", "りんご", "なし"]);
  const m = who === "みかん" ? r.int(90, 120) : r.int(250, 320); // くだものに合った重さに
  const n = 5;
  const xs = data(r, m, n, who === "みかん" ? 15 : 30, 60);
  return {
    prompt: `${who}5この重さをはかったら、${xs.map((x) => `${x}g`).join("、")} でした。${who}1こあたりの重さの平均は何gですか。`,
    answer: num(m, `(${xs.join("+")})/${n}`, "g"),
    point: "平均＝合計÷個数",
    steps: [
      { title: "合計を出す", body: `${xs.join("＋")}＝${m * n}（g）です。`, back: [BACK_SHIKI] },
      { title: "個数でわる", body: `${m * n}÷${n}＝{{${m}}}（g）です。`, back: [BACK_NARASU] },
    ],
  };
}

function goukei(r: Rng): QuestionBody {
  const m = r.int(52, 68);
  const n = r.pick([6, 8, 10, 12, 15, 20]);
  return {
    prompt: `たまご1この重さの平均が ${m}g のとき、たまご ${n}この重さは、およそ何gと考えられますか。`,
    answer: num(m * n, `${m}*${n}`, "g"),
    point: "合計＝平均×個数",
    steps: [{ title: "平均×個数", body: `1こあたり${m}gと考えて、${m}×${n}＝{{${m * n}}}（g）です。`, back: [BACK_GOUKEI] }],
  };
}

function zero(r: Rng): QuestionBody {
  const n = 5;
  let xs: number[];
  let s = 0;
  do {
    xs = Array.from({ length: n }, () => r.int(0, 4));
    s = xs.reduce((a, b) => a + b, 0);
  } while (!xs.includes(0) || (s * 10) % n !== 0 || s === 0);
  const nz = xs.filter((x) => x > 0).length;
  return {
    prompt: `ある週の月曜日から金曜日までに、図書室で本をかりた人の数は、${xs.map((x) => `${x}人`).join("、")} でした。1日あたり平均何人がかりましたか。`,
    answer: num(s / n, `(${xs.join("+")})/${n}`, "人"),
    point: "0人の日も、日数（個数）に入れる",
    steps: [
      { title: "合計", body: `${xs.join("＋")}＝${s}（人）です。`, back: [BACK_SHIKI] },
      { title: "日数でわる", body: `0人の日もふくめて5日なので、${s}÷5＝{{${f(s / n)}}}（人）です。`, trap: `0の日を入れずに ${s}÷${nz} としない。0人だった日も、1日として数えます。`, back: [BACK_ZERO] },
    ],
  };
}

function nokori(r: Rng): QuestionBody {
  const n = r.pick([4, 5]);
  const m = r.int(70, 88);
  const xs = data(r, m, n, 12, 0);
  const last = xs[n - 1];
  const known = xs.slice(0, n - 1);
  return {
    prompt: `算数のテストを${n}回うけました。${n}回の平均点は ${m}点で、${n - 1}回目までの点数は ${known.map((x) => `${x}点`).join("、")} でした。${n}回目の点数は何点ですか。`,
    answer: num(last, `${m}*${n}-(${known.join("+")})`, "点"),
    point: "平均×回数で合計を出してから、わかっている分をひく",
    steps: [
      { title: `${n}回の合計`, body: `${m}×${n}＝${m * n}（点）です。`, back: [BACK_GOUKEI] },
      { title: "わかっている分をひく", body: `${m * n}−（${known.join("＋")}）＝{{${last}}}（点）です。` },
    ],
  };
}

function hohaba(r: Rng): QuestionBody {
  const step100 = r.int(55, 68); // 1歩の平均 (cm)
  const ten = step100 * 10; // 10歩 (cm)
  const kaisu = r.step(200, 800, 100); // 答えが整数のmになるように
  const ans = Math.round(step100 * kaisu) / 100;
  return {
    prompt: `ゆうきさんが10歩歩いた長さをはかったら、${f(ten / 100)}m でした。家から公園まで歩いたら ${kaisu}歩でした。家から公園までの道のりは、およそ何mですか。`,
    answer: num(ans, `${f(ten / 100)}/10*${kaisu}`, "m"),
    point: "1歩の平均（歩はば）×歩数",
    steps: [
      { title: "歩はばを出す", body: `${f(ten / 100)}÷10＝${f(step100 / 100)} なので、1歩の平均は ${f(step100 / 100)}m です。`, back: [BACK_SHIKI] },
      { title: "歩数をかける", body: `${f(step100 / 100)}×${kaisu}＝{{${f(ans)}}}（m）です。`, back: [BACK_HOHABA] },
    ],
  };
}

function ageru(r: Rng): QuestionBody {
  let n = 0;
  let a = 0;
  let c = 0;
  let b = 0;
  do {
    n = r.int(3, 6);
    a = r.int(65, 85);
    c = a + r.int(1, 4);
    b = c * (n + 1) - a * n;
  } while (b > 100);
  return {
    prompt: `これまでの${n}回のテストの平均点は ${a}点です。次のテストで何点をとると、${n + 1}回の平均点が ${c}点になりますか。`,
    answer: num(b, `${c}*${n + 1}-${a}*${n}`, "点"),
    point: "合計で考える。平均どうしをたしたりひいたりしない",
    steps: [
      { title: "これまでの合計", body: `${a}×${n}＝${a * n}（点）です。`, back: [BACK_GOUKEI] },
      { title: `${n + 1}回の合計`, body: `${c}×${n + 1}＝${c * (n + 1)}（点）になればよい。` },
      { title: "ひく", body: `${c * (n + 1)}−${a * n}＝{{${b}}}（点）です。`, trap: `${c}＋（${c}−${a}）＝${2 * c - a} としない。前の${n}回分も平均を上げる必要があります。` },
    ],
  };
}

export const E_MATH_5_HEIKIN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "平均と合計",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "heikin", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: heikin },
        { id: "goukei", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: goukei },
        { id: "zero", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: zero },
      ],
    },
    {
      title: "平均を使って考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "nokori", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: nokori },
        { id: "hohaba", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: hohaba },
      ],
    },
    {
      title: "平均を上げるには",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "ageru", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: ageru }],
    },
  ],
};
