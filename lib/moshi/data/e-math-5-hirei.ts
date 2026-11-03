// 小5算数「比例」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 先に「1あたりの量」と答えを決めてから問題の数を掛け算で作り、答えは整数か小数第1位まで。calc で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-hirei";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_BAI = { label: "2倍、3倍になると、もう一方も2倍、3倍", href: L(1) };
const BACK_HYO = { label: "表で、きまりを確かめる", href: L(2) };
const BACK_SHIKI = { label: "式に表すと、どんな長さでも求められる", href: L(3) };
const BACK_FUERU = { label: "増えるだけでは、比例とはいえない", href: L(4) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}

function nanbai(r: Rng): QuestionBody {
  const p = r.step(20, 120, 10);
  const l1 = r.int(2, 5);
  const k = r.int(2, 5);
  const l2 = l1 * k;
  const thing = r.pick(["リボン", "テープ", "ひも"]);
  return {
    prompt: `${thing}を ${l1}m 買うと、代金は ${p * l1}円です。同じ${thing}を ${l2}m 買うと、代金は何円ですか。`,
    answer: num(p * l2, `${p * l1}*${l2}/${l1}`, "円"),
    point: "長さが□倍になると、代金も□倍",
    steps: [
      { title: "長さは何倍か", body: `${l2}÷${l1}＝${k} なので、長さは${k}倍です。`, back: [BACK_BAI] },
      { title: "代金も同じ倍", body: `代金は長さに比例するので、代金も${k}倍。${p * l1}×${k}＝{{${p * l2}}}（円）です。` },
    ],
  };
}

function hyo(r: Rng): QuestionBody {
  const a = r.pick([2, 3, 4, 5, 6, 8]);
  const x = r.int(7, 15);
  return {
    prompt: `水そうに水を入れます。入れる時間と水の深さの関係は、1分で ${a}cm、2分で ${2 * a}cm、3分で ${3 * a}cm、4分で ${4 * a}cm でした。同じように入れつづけると、${x}分では深さは何cmになりますか。`,
    answer: num(a * x, `${a}*${x}`, "cm"),
    point: "1分あたりの深さ×時間",
    steps: [
      { title: "表のきまりを見つける", body: `時間が1分ふえるごとに、深さは${a}cmずつふえ、深さはいつも「${a}×時間」になっています。`, back: [BACK_HYO] },
      { title: "あてはめる", body: `${a}×${x}＝{{${a * x}}}（cm）です。` },
    ],
  };
}

function shiki(r: Rng): QuestionBody {
  const a = r.pick([3, 4, 5, 6, 7, 8, 9, 12, 15]);
  const x = r.int(11, 30);
  const what = r.pick([
    { thing: `1こ${a * 10}gのおもり`, o: "おもりの数", ou: "こ", d: "全体の重さ", unit: "g", m: 10 },
    { thing: `1さつの厚さが${a}mmの本`, o: "本の数", ou: "さつ", d: "積み重ねた高さ", unit: "mm", m: 1 },
  ]);
  const ans = a * what.m * x;
  return {
    prompt: `${what.thing}を重ねます。${what.o}を○${what.ou}、${what.d}を△${what.unit}として、○と△の関係を式に表しました。○が ${x} のとき、△はいくつですか。`,
    answer: num(ans, `${a * what.m}*${x}`, what.unit),
    point: "式 △＝きまった数×○ に、○をあてはめる",
    steps: [
      { title: "式に表す", body: `○が1ふえると△は${a * what.m}ふえるので、{{△＝${a * what.m}×○}} です。`, back: [BACK_SHIKI] },
      { title: "○に数を入れる", body: `${a * what.m}×${x}＝{{${ans}}} です。` },
    ],
  };
}

const HIREI: [string, string][] = [
  ["正方形の1辺の長さと、まわりの長さ", "まわりの長さ＝1辺×4。1辺が2倍、3倍になると、まわりも2倍、3倍になるので比例です。"],
  ["1こ60円のガムを買うこ数と、代金", "代金＝60×こ数。こ数が2倍になると代金も2倍になるので比例です。"],
  ["同じ速さで歩く時間と、進む道のり", "道のり＝速さ×時間。時間が2倍、3倍になると道のりも2倍、3倍で、比例です。"],
  ["たてが5cmの長方形の、横の長さと面積", "面積＝5×横。横が2倍、3倍になると面積も2倍、3倍で、比例です。"],
];
const NOT: [string, string][] = [
  ["正方形の1辺の長さと、面積", "1辺が2倍になると面積は4倍になる。ふえるが、2倍・3倍の関係ではないので比例ではありません。"],
  ["姉と妹の年れい（姉が3才上）", "妹が2倍の年になっても、姉は2倍にはならない。同じ数ずつふえるだけで、比例ではありません。"],
  ["20cmのろうそくの、もえた長さと残りの長さ", "もえた長さがふえると、残りはへっていく。比例ではありません。"],
  ["1000円を出して買い物をしたときの、代金とおつり", "代金がふえると、おつりはへる。比例ではありません。"],
  ["100円の箱に、1こ50円のおかしを入れたときの、こ数と全体の代金", "こ数が2倍になっても、全体の代金は2倍にならない（箱の100円がある）。ふえるだけで比例ではありません。"],
];

function minuke(r: Rng): QuestionBody {
  const yes = r.bool();
  const right = yes ? r.pick(HIREI) : r.pick(NOT);
  const wrongs = yes ? r.sample(NOT, 3) : r.sample(HIREI, 3);
  return {
    prompt: yes ? "次のうち、2つの量が比例しているものはどれですか。" : "次のうち、2つの量が比例していないものはどれですか。",
    answer: choice(r, right, wrongs),
    point: "一方が2倍、3倍のとき、もう一方も2倍、3倍か",
    steps: [
      { title: "2倍にしてためす", body: "一方の量を2倍、3倍にしたとき、もう一方もかならず2倍、3倍になるかを調べます。{{ふえるだけでは比例とはいえません}}。", back: [BACK_FUERU, BACK_BAI] },
    ],
  };
}

function omosa(r: Rng): QuestionBody {
  const w = r.pick([6, 8, 12, 15, 18, 25]); // 1mの重さ (g)
  const l1 = r.int(2, 5);
  const l2 = r.int(6, 40);
  return {
    prompt: `同じはり金 ${l1}m の重さをはかったら、${w * l1}g でした。このはり金 ${w * l2}g 分の長さは何mですか。`,
    answer: num(l2, `${w * l2}/(${w * l1}/${l1})`, "m"),
    point: "重さは長さに比例する。まず1mの重さを出す",
    steps: [
      { title: "1mの重さ", body: `${w * l1}÷${l1}＝${w} なので、1mの重さは${w}gです。`, back: [BACK_SHIKI] },
      { title: "長さを求める", body: `重さ＝${w}×長さ なので、長さは ${w * l2}÷${w}＝{{${l2}}}（m）です。`, trap: `${w * l2}×${w} とかけない。何m分かは、わり算で求めます。` },
    ],
  };
}

function maisu(r: Rng): QuestionBody {
  const kg = r.pick([0.4, 0.5, 0.8, 1, 1.2, 1.5, 2, 2.4]);
  const total = Math.round(kg * 1000);
  const g = r.pick([2, 4, 5, 8].filter((v) => total % v === 0)); // 1まいの重さ (g)
  const n1 = r.pick([10, 20, 25, 50]);
  const n = total / g;
  const thing = r.pick(["画用紙", "色紙", "工作用の紙"]);
  return {
    prompt: `${thing} ${n1}枚《まい》の重さは ${g * n1}g でした。同じ${thing}のたばの重さをはかったら ${f(kg)}kg でした。${thing}は何｜枚《まい》ありますか。`,
    answer: num(n, `${f(kg)}*1000/(${g * n1}/${n1})`, "まい"),
    point: "重さと枚数《まいすう》は比例。単位を g にそろえて考える",
    steps: [
      { title: "単位をそろえる", body: `${f(kg)}kg＝${total}g です。` },
      { title: "1枚《まい》の重さ", body: `${g * n1}÷${n1}＝${g} なので、1枚《まい》${g}gです。`, back: [BACK_SHIKI] },
      { title: "何｜枚《まい》分か", body: `${total}÷${g}＝{{${n}}}（枚《まい》）です。`, trap: "kg のまま計算すると、答えが1000分の1になってしまう。", back: [BACK_BAI] },
    ],
  };
}

export const E_MATH_5_HIREI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "比例する2つの量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nanbai", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: nanbai },
        { id: "hyo", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: hyo },
        { id: "shiki", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: shiki },
      ],
    },
    {
      title: "比例を見分ける・使う",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "minuke", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: minuke },
        { id: "omosa", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: omosa },
      ],
    },
    {
      title: "重さで数える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "maisu", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: maisu }],
    },
  ],
};
