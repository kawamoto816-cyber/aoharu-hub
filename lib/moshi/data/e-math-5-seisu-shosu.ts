// 小5算数「整数と小数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数値は rng から作り、小数は小数第3位までに整える。calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-seisu-shosu";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_KURAI = { label: "どの位も、10集まると1つ上の位", href: L(1) };
const BACK_10 = { label: "10倍すると、小数点は右へ1けた", href: L(2) };
const BACK_100 = { label: "100倍は2けた、1/10は左へ1けた", href: L(3) };
const BACK_SEISU = { label: "整数も同じように考える", href: L(4) };

/** 小数を「1.5」のように (末尾の0を出さない) */
const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
const KETA: Record<number, number> = { 10: 1, 100: 2, 1000: 3 };

function bai(r: Rng): QuestionBody {
  const x = r.int(1001, 9999) / 1000;
  const k = r.pick([10, 100, 1000]);
  const ans = Math.round(x * k * 1000) / 1000;
  return {
    prompt: `${f(x)} を ${k}倍した数を答えなさい。`,
    answer: num(ans, `${f(x)}*${k}`),
    point: `${k}倍すると、小数点は右へ${KETA[k]}けたうつる`,
    steps: [
      {
        title: `小数点を右へ${KETA[k]}けた`,
        body: `${k}倍すると、どの数字も位が${KETA[k]}つ上がります。小数点を右へ${KETA[k]}けたうつして、{{${f(ans)}}} です。`,
        trap: "小数点を左へうつすと、反対に小さくなってしまう。何倍かすると数は大きくなります。",
        back: [k === 10 ? BACK_10 : BACK_100],
      },
    ],
  };
}

function bun(r: Rng): QuestionBody {
  const x = r.int(11, 999) / r.pick([1, 10]);
  const k = r.pick([10, 100]);
  const ans = Math.round((x / k) * 1000) / 1000;
  return {
    prompt: `${f(x)} の 1/${k} の数を答えなさい。`,
    answer: num(ans, `${f(x)}/${k}`),
    point: `1/${k}にすると、小数点は左へ${KETA[k]}けたうつる`,
    steps: [
      {
        title: `小数点を左へ${KETA[k]}けた`,
        body: `1/${k}にすると、どの数字も位が${KETA[k]}つ下がります。小数点を左へ${KETA[k]}けたうつして、{{${f(ans)}}} です。`,
        trap: "けたが足りないときは、0をおぎなって小数点をうつします（一の位の0もわすれない）。",
        back: [BACK_100],
      },
    ],
  };
}

function atsume(r: Rng): QuestionBody {
  const x = r.int(1001, 9999) / 1000;
  const ans = Math.round(x * 1000);
  const [a, b, c, d] = String(ans).split("");
  return {
    prompt: `${f(x)} は、0.001 を何こ集めた数ですか。`,
    answer: num(ans, `${f(x)}/0.001`, "こ"),
    point: "0.001 を1000こ集めると1。1は0.001の1000こ分",
    steps: [
      { title: "位ごとに分ける", body: `${f(x)} は、1が${a}こ、0.1が${b}こ、0.01が${c}こ、0.001が${d}こ。`, back: [BACK_KURAI] },
      { title: "0.001 が何こ分か", body: `1は0.001の1000こ分なので、${f(x)} は0.001の {{${ans}}}こ分です。${f(x)} を1000倍した数と同じです。`, back: [BACK_100] },
    ],
  };
}

function card(r: Rng): QuestionBody {
  const ds = r.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 4);
  const big = r.bool();
  const s = [...ds].sort((p, q) => (big ? q - p : p - q));
  const v = (s[0] * 1000 + s[1] * 100 + s[2] * 10 + s[3]) / 1000;
  return {
    prompt: `${ds.join("、")} の4まいの数字カードと、小数点のカードが1まいあります。全部のカードを使って「□.□□□」の形の小数をつくるとき、いちばん${big ? "大きい" : "小さい"}数を答えなさい。`,
    answer: num(v, `${s[0]}+${s[1]}/10+${s[2]}/100+${s[3]}/1000`),
    point: `上の位ほど、${big ? "大きい" : "小さい"}数字から順におく`,
    steps: [
      { title: "上の位から決める", body: `いちばん上の一の位に、いちばん${big ? "大きい" : "小さい"}${s[0]}をおきます。そのあと 1/10、1/100、1/1000 の位に、${s[1]}、${s[2]}、${s[3]} の順におきます。`, back: [BACK_KURAI] },
      { title: "答え", body: `いちばん${big ? "大きい" : "小さい"}数は {{${f(v)}}} です。`, trap: "1/1000の位から決めない。上の位の数字ほど、数の大きさに強くひびきます。" },
    ],
  };
}

function nanbai(r: Rng): QuestionBody {
  const k = r.pick([10, 100, 1000]);
  const base = r.int(101, 999) / 1000;
  const big = Math.round(base * k * 1000) / 1000;
  return {
    prompt: `${f(big)} は、${f(base)} の何倍ですか。`,
    answer: num(k, `${f(big)}/${f(base)}`, "倍"),
    point: "数字のならびが同じなら、小数点のずれで何倍かわかる",
    steps: [
      { title: "小数点のずれを見る", body: `${f(base)} と ${f(big)} は、数字のならびが同じです。小数点が右へ${KETA[k]}けたずれているので、{{${k}倍}}です。`, back: [BACK_10, BACK_100] },
    ],
  };
}

function seisu(r: Rng): QuestionBody {
  const x = r.int(12, 98) * 10 + r.int(1, 9);
  const k = r.pick([10, 100, 1000]);
  const ans = Math.round((x / k) * 1000) / 1000;
  return {
    prompt: `整数の ${x} を 1/${k} にした数を答えなさい。`,
    answer: num(ans, `${x}/${k}`),
    point: "整数も、一の位の右に小数点があると考える",
    steps: [
      { title: "小数点を見えるようにする", body: `${x} は ${x}. と考え、小数点を左へ${KETA[k]}けたうつします。答えは {{${f(ans)}}} です。`, back: [BACK_SEISU] },
    ],
  };
}

function machigai(r: Rng): QuestionBody {
  const m = r.pick([10, 100]);
  const x = r.int(101, 999) / (m === 10 ? 100 : 10);
  const k = r.pick([10, 100]);
  const wrong = Math.round((x / m) * 100000) / 100000;
  const right = Math.round(x * k * 1000) / 1000;
  return {
    prompt: `ある数を ${k}倍するところを、まちがえて 1/${m} にしたので、答えが ${f(wrong)} になりました。正しい答えを求めなさい。`,
    answer: num(right, `${f(wrong)}*${m}*${k}`),
    point: "まず、もとの数にもどしてから、正しく計算する",
    steps: [
      { title: "もとの数にもどす", body: `1/${m} にした数が ${f(wrong)} なので、もとの数は ${f(wrong)} を ${m}倍して ${f(x)} です。`, back: [BACK_100] },
      { title: "正しく計算する", body: `${f(x)} を ${k}倍すると、小数点は右へ${KETA[k]}けたうつって {{${f(right)}}} です。`, trap: `${f(wrong)} をそのまま ${k}倍しない。まちがえた計算をもとにもどすのが先です。`, back: [BACK_10] },
    ],
  };
}

export const E_MATH_5_SEISU_SHOSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "draft" },
  sections: [
    {
      title: "10倍・100倍・1/10・1/100",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "bai", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: bai },
        { id: "bun", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: bun },
        { id: "seisu", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: seisu },
      ],
    },
    {
      title: "位としくみ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "atsume", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: atsume },
        { id: "nanbai", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: nanbai },
        { id: "card", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: card },
      ],
    },
    {
      title: "まちがえた計算から考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "machigai", type: "A", difficulty: 3, points: 19, seconds: 150, skill: "思考・判断・表現", generate: machigai }],
    },
  ],
};
