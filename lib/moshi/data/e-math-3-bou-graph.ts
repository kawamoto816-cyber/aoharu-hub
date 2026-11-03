// 小3算数「表と棒グラフ」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 1目盛りの大きさ・目盛りの数・人数を先に決め、答えは calc (掛け算・たし算・ひき算) で確かめる (scripts/check-moshi.ts がシード100個で確かめる)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-bou-graph";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_SEI = L(1, "しらべて、正の字で数える");
const B_HYO = L(2, "表のつくり方");
const B_BOU = L(3, "棒《ぼう》の長さで数を表す");
const B_MEMORI = L(4, "1目盛《めも》りがいくつかを先に見る");
const B_ZERO = L(5, "目盛《めも》りが0から始まっているかを見る");

const THEMES = [
  { t: "すきなくだもの", kinds: ["りんご", "いちご", "みかん", "ぶどう"] },
  { t: "すきなきゅう食", kinds: ["カレー", "あげパン", "ハンバーグ", "やきそば"] },
  { t: "すきな色", kinds: ["赤", "青", "緑", "黄"] },
  { t: "すきな動物", kinds: ["犬", "ねこ", "うさぎ", "パンダ"] },
];

function seiNoJi(r: Rng): QuestionBody {
  const a = r.int(2, 6);
  const b = r.int(1, 4);
  const th = r.pick(THEMES);
  const k = r.pick(th.kinds);
  return {
    prompt: `「${th.t}」をしらべて、正の字で数えました。「${k}」のところは、正の字が${a}こと、あと${b}画《かく》でした。「${k}」は何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(5 * a + b)], unit: "人", calc: `5*${a}+${b}` },
    point: "正の字は1つで5",
    steps: [{ title: "5のまとまりで数える", body: `正の字1つで5人なので、5×${a}＝${5 * a}。あと${b}画《かく》で ${5 * a}＋${b}＝{{${5 * a + b}}}（人）です。`, back: [B_SEI] }],
  };
}

function yomu(r: Rng): QuestionBody {
  const per = r.pick([2, 5, 10]);
  const n = r.int(3, 9);
  const th = r.pick(THEMES);
  const k = r.pick(th.kinds);
  return {
    prompt: `「${th.t}」の棒《ぼう》グラフで、たての目盛《めも》りは0から${per * 5}人までが5目盛《めも》りに分かれています。「${k}」の棒《ぼう》は${n}目盛《めも》りの高さです。「${k}」は何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(per * n)], unit: "人", calc: `${per * 5}/5*${n}` },
    point: "まず1目盛《めも》りが何人かを見る",
    steps: [
      { title: "1目盛《めも》りを出す", body: `${per * 5}人を5目盛《めも》りで表しているので、1目盛《めも》りは ${per * 5}÷5＝{{${per}人}}です。`, back: [B_MEMORI] },
      { title: "棒《ぼう》の長さを読む", body: `${n}目盛《めも》りなので、${per}×${n}＝{{${per * n}}}（人）です。`, trap: `1目盛《めも》りを1人として、${n}人と読まないようにします。`, back: [B_BOU] },
    ],
  };
}

function goukei(r: Rng): QuestionBody {
  const th = r.pick(THEMES);
  const v = [r.int(9, 14), r.int(6, 8), r.int(4, 5), r.int(1, 3)];
  const o = r.int(1, 3);
  const total = v.reduce((s, x) => s + x, 0) + o;
  const list = th.kinds.map((k, i) => `${k} ${v[i]}人`).join("、");
  return {
    prompt: `「${th.t}」をしらべて表にしました。${list}、その他 ${o}人 でした。しらべた人は、合計で何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(total)], unit: "人", calc: `${v.join("+")}+${o}` },
    point: "合計は、その他もふくめて全部たす",
    steps: [{ title: "全部たす", body: `${v.join("＋")}＋${o}＝{{${total}}}（人）。合計を書くと、数えもれがないかをたしかめられます。`, trap: "「その他」をたしわすれないようにします。", back: [B_HYO] }],
  };
}

function sa(r: Rng): QuestionBody {
  const per = r.pick([2, 5, 10]);
  const a = r.int(6, 12);
  const b = r.int(2, a - 2);
  const th = r.pick(THEMES);
  const [ka, kb] = r.sample(th.kinds, 2);
  return {
    prompt: `「${th.t}」の棒《ぼう》グラフで、1目盛《めも》りは${per}人です。「${ka}」の棒《ぼう》は${a}目盛《めも》り、「${kb}」の棒《ぼう》は${b}目盛《めも》りです。「${ka}」は「${kb}」より何人多いですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(per * (a - b))], unit: "人", calc: `${per}*${a}-${per}*${b}` },
    point: "目盛《めも》りのちがいに、1目盛《めも》りの人数をかける",
    steps: [
      { title: "それぞれの人数", body: `「${ka}」は ${per}×${a}＝${per * a}（人）、「${kb}」は ${per}×${b}＝${per * b}（人）です。`, back: [B_MEMORI] },
      { title: "ちがいを出す", body: `${per * a}−${per * b}＝{{${per * (a - b)}}}（人）。目盛《めも》りのちがい ${a - b} に ${per} をかけても出せます。`, trap: `目盛《めも》りのちがいの ${a - b} をそのまま答えにしないようにします。` },
    ],
  };
}

function kimeru(r: Rng): QuestionBody {
  const cnt = r.pick([10, 12, 15]);
  const per = r.pick([1, 2, 5, 10]);
  const lo = per === 1 ? 4 : cnt * ([1, 2, 5, 10][[1, 2, 5, 10].indexOf(per) - 1]) + 1;
  const max = r.int(Math.max(lo, 4), cnt * per);
  const opts = ["1人", "2人", "5人", "10人"];
  const correct = [1, 2, 5, 10].indexOf(per);
  return {
    prompt: `棒《ぼう》グラフをかきます。たての目盛《めも》りは${cnt}こあり、一番多いものは${max}人です。一番長い棒《ぼう》がグラフに入り、できるだけ長くなるようにするには、1目盛《めも》りを何人にするとよいですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct,
      why: [1, 2, 5, 10].map((p, i) =>
        p * cnt < max
          ? `${cnt}目盛《めも》りで ${p * cnt}人までしか表せず、${max}人が入りません。`
          : i === correct
            ? `${cnt}目盛《めも》りで ${p * cnt}人まで表せて、${max}人が入ります。入るものの中で一番｜棒《ぼう》が長くなります。`
            : `${max}人は入りますが、${opts[correct]}にしたほうが棒《ぼう》が長くなり、くらべやすくなります。`,
      ),
    },
    point: "一番多い数が入る中で、1目盛《めも》りを小さく",
    steps: [{ title: "入るかどうかを調べる", body: `1目盛《めも》りが${per}人なら ${per}×${cnt}＝${per * cnt}（人）まで表せます。${max}人が入る中で一番小さいのは{{${per}人}}です。`, back: [B_MEMORI] }],
  };
}

function zero(r: Rng): QuestionBody {
  const s = r.pick([10, 20, 30, 40]);
  const a = r.int(4, 9);
  const b = r.int(1, 3);
  const th = r.pick(THEMES);
  const [ka, kb] = r.sample(th.kinds, 2);
  return {
    prompt: `ある棒《ぼう》グラフは、たての目盛《めも》りが0からではなく${s}人から始まっていて、1目盛《めも》りは1人です。「${ka}」の棒《ぼう》は${a}目盛《めも》り、「${kb}」の棒《ぼう》は${b}目盛《めも》りの長さです。「${ka}」は何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(s + a)], unit: "人", calc: `${s}+${a}` },
    point: "目盛《めも》りが始まる数をたしわすれない",
    steps: [
      { title: "始まりの数を見る", body: `棒《ぼう》の下のはしは${s}人です。「${ka}」は ${s}＋${a}＝{{${s + a}}}（人）です。`, back: [B_ZERO] },
      { title: "長さだけでくらべない", body: `「${kb}」は ${s + b}人。棒《ぼう》の長さは${a}と${b}でも、人数はそんなにちがいません。`, trap: `棒《ぼう》の長さだけ見て「${ka}は${a}人」としないようにします。` },
    ],
  };
}

export const E_MATH_3_BOU_GRAPH_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "表と棒《ぼう》グラフを読む",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "sei-no-ji", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: seiNoJi },
        { id: "goukei", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: goukei },
        { id: "yomu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: yomu },
      ],
    },
    {
      title: "目盛《めも》りに気をつけて考える",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "sa", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: sa },
        { id: "kimeru", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: kimeru },
        { id: "zero", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: zero },
      ],
    },
  ],
};
