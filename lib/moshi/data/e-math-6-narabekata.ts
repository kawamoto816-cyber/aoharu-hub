// 小6算数「並べ方と組み合わせ方」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 人数・カードの枚数を rng で決め、並べ方は「何通りずつ」のかけ算、組み合わせ方は並べ方÷重なりで数える。
// 答えはコードでも全部数え上げて確かめ、calc (問題の数から答えを出す式) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-narabekata";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_ZU = { label: "並べ方は、先頭を決めて枝分かれの図にする", href: L(1) };
const BACK_KAKE = { label: "並べ方は「何通りずつ」をかけ算で数える", href: L(2) };
const BACK_KUMI = { label: "組み合わせ方は、AとBもBとAも同じ1つ", href: L(3) };
const BACK_KANKEI = { label: "並べ方と組み合わせ方の関係", href: L(4) };

const num = (answer: number, calc: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(answer)], calc, unit: "通り" });
const NAMES = ["あおい", "けんた", "さくら", "だいち", "えみ", "ゆうと", "りな"];

/** 数字カードで k けたの整数を数え上げる (検算用) */
function countNumbers(ds: number[], k: number, ok: (s: number[]) => boolean): number {
  let n = 0;
  const rec = (used: boolean[], cur: number[]) => {
    if (cur.length === k) {
      if (cur[0] !== 0 && ok(cur)) n++;
      return;
    }
    ds.forEach((d, i) => {
      if (used[i]) return;
      used[i] = true;
      rec(used, [...cur, d]);
      used[i] = false;
    });
  };
  rec(ds.map(() => false), []);
  return n;
}

function narabu(r: Rng): QuestionBody {
  const n = r.int(3, 5);
  const who = r.sample(NAMES, n);
  let ans = 1;
  for (let i = 2; i <= n; i++) ans *= i;
  const seq = Array.from({ length: n }, (_, i) => n - i);
  return {
    prompt: `${who.join("さん、")}さんの${n}人が、1列に並びます。並び方は全部で何通りありますか。`,
    answer: num(ans, seq.join("*")),
    point: "1番目、2番目…と、選べる人が1人ずつへる",
    steps: [
      { title: "先頭を決めて枝分かれ", body: `1番目は${n}通り。そのそれぞれに、2番目は${n - 1}通り、…と枝分かれします。`, back: [BACK_ZU] },
      { title: "かけ算で数える", body: `${seq.join("×")}＝{{${ans}}}（通り）です。`, trap: `${n}×${n} のように同じ数をかけない。1度並んだ人は、もう選べません。`, back: [BACK_KAKE] },
    ],
  };
}

function card2(r: Rng): QuestionBody {
  const k = r.int(3, 6);
  const ds = r.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], k).sort((a, b) => a - b);
  const ans = countNumbers(ds, 2, () => true);
  return {
    prompt: `${ds.join("、")} の${k}まいの数字カードから2まいを選んで並べ、2けたの整数をつくります。整数は全部で何通りできますか。`,
    answer: num(ans, `${k}*${k - 1}`),
    point: "十の位が k 通り、一の位は残りの（k−1）通り",
    steps: [{ title: "位ごとに数える", body: `十の位は${k}通り、一の位は残りの${k - 1}通りなので、${k}×${k - 1}＝{{${ans}}}（通り）です。`, back: [BACK_KAKE] }],
  };
}

function shiai(r: Rng): QuestionBody {
  const n = r.int(4, 8);
  const ans = (n * (n - 1)) / 2;
  const sport = r.pick(["ドッジボール", "サッカー", "バレーボール"]);
  return {
    prompt: `${n}つのチームで${sport}の試合をします。どのチームも、ほかのすべてのチームと1回ずつ試合をします（総当たり）。試合は全部で何試合ですか。`,
    answer: { ...num(ans, `${n}*(${n}-1)/2`), unit: "試合" },
    point: "AとBの試合と、BとAの試合は同じ1試合",
    steps: [
      { title: "並べ方として数える", body: `対戦相手を順番に考えると ${n}×${n - 1}＝${n * (n - 1)} 通り。`, back: [BACK_KANKEI] },
      { title: "重なりを消す", body: `A対BとB対Aを2回数えているので、${n * (n - 1)}÷2＝{{${ans}}}（試合）です。`, trap: `${n * (n - 1)} 試合としない。組み合わせ方は、順番を考えません。`, back: [BACK_KUMI] },
    ],
  };
}

function zero(r: Rng): QuestionBody {
  const k = r.int(4, 5);
  const ds = [0, ...r.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], k - 1)].sort((a, b) => a - b);
  const ans = countNumbers(ds, 3, () => true);
  return {
    prompt: `${ds.join("、")} の${k}まいの数字カードから3まいを選んで並べ、3けたの整数をつくります。整数は全部で何通りできますか。`,
    answer: num(ans, `(${k}-1)*(${k}-1)*(${k}-2)`),
    point: "0は百の位に置けない",
    steps: [
      { title: "百の位", body: `0は百の位に置けないので、百の位は${k - 1}通りです。`, back: [BACK_ZU] },
      { title: "十の位・一の位", body: `十の位は残り（0もふくむ）${k - 1}通り、一の位は${k - 2}通り。${k - 1}×${k - 1}×${k - 2}＝{{${ans}}}（通り）です。`, trap: `${k}×${k - 1}×${k - 2} としない。0が先頭のものは3けたになりません。`, back: [BACK_KAKE] },
    ],
  };
}

function erabu(r: Rng): QuestionBody {
  const n = r.int(4, 7);
  const k = r.pick([2, 3]);
  const ans = k === 2 ? (n * (n - 1)) / 2 : (n * (n - 1) * (n - 2)) / 6;
  const thing = r.pick(["アイスクリーム", "くだもの", "ケーキ"]);
  return {
    prompt: `${n}種類の${thing}から、ちがう種類を${k}つ選びます。選び方は全部で何通りありますか。`,
    answer: num(ans, k === 2 ? `${n}*${n - 1}/2` : `${n}*${n - 1}*${n - 2}/(3*2*1)`),
    point: "選ぶだけなので、順番がちがうものは同じ1通り",
    steps: [
      { title: "並べ方として数える", body: k === 2 ? `順番を考えると ${n}×${n - 1}＝${n * (n - 1)}（通り）。` : `順番を考えると ${n}×${n - 1}×${n - 2}＝${n * (n - 1) * (n - 2)}（通り）。`, back: [BACK_KANKEI] },
      { title: "同じものをまとめる", body: k === 2 ? `同じ2つの組が2通りずつ数えられているので、÷2 で {{${ans}}}（通り）です。` : `同じ3つの組が 3×2×1＝6 通りずつ数えられているので、÷6 で {{${ans}}}（通り）です。`, back: [BACK_KUMI] },
    ],
  };
}

function guusu(r: Rng): QuestionBody {
  const k = r.int(4, 6);
  const ds = r.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], k).sort((a, b) => a - b);
  const ev = ds.filter((d) => d % 2 === 0).length;
  if (ev === 0) return guusu(r);
  const ans = countNumbers(ds, 3, (s) => s[2] % 2 === 0);
  return {
    prompt: `${ds.join("、")} の${k}まいの数字カードから3まいを選んで並べ、3けたの整数をつくります。そのうち偶数《ぐうすう》は何通りできますか。`,
    answer: num(ans, `${ev}*(${k}-1)*(${k}-2)`),
    point: "条件のある位（一の位）から先に決める",
    steps: [
      { title: "一の位を先に決める", body: `偶数《ぐうすう》なので、一の位は ${ds.filter((d) => d % 2 === 0).join("、")} の${ev}通りです。`, back: [BACK_ZU] },
      { title: "残りの位", body: `百の位は残りの${k - 1}通り、十の位は${k - 2}通り。${ev}×${k - 1}×${k - 2}＝{{${ans}}}（通り）です。`, trap: "百の位から順に決めると、一の位に使える数が場合によって変わり、数えにくくなる。", back: [BACK_KAKE] },
    ],
  };
}

export const E_MATH_6_NARABEKATA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "並べ方と組み合わせ方の基本",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "narabu", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: narabu },
        { id: "card2", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: card2 },
        { id: "shiai", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: shiai },
      ],
    },
    {
      title: "0のカード・選び方",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "zero", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: zero },
        { id: "erabu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: erabu },
      ],
    },
    {
      title: "条件のある並べ方",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [{ id: "guusu", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: guusu }],
    },
  ],
};
