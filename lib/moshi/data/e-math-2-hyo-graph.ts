// 小2算数「表とグラフ」の単元模試 (A: 数値を入れかえる生成型 ＋ B: 表とグラフの よいところの プール)。問題はすべてオリジナル。
// しゅるいごとの 人数を rng で決め (同じ 人数に ならないように)、表・○の グラフ・ばらばらの 名前の ならびを そこから作る。
// 答えは 人数から calc (たし算・ひき算・1の たし算) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-hyo-graph";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_HYO = L(1, "しらべた 数を 表《ひょう》に まとめる");
const B_GRAPH = L(2, "グラフは ○を 1人 1こ ならべる");
const B_YOSA = L(3, "表《ひょう》と グラフの よい ところ");
const B_CHIGAI = L(4, "グラフで ちがいを 読む");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

const TOPIC: { t: string; names: string[] }[] = [
  { t: "すきな あそび", names: ["おにごっこ", "なわとび", "ドッジボール", "てつぼう"] },
  { t: "すきな くだもの", names: ["りんご", "みかん", "いちご", "バナナ"] },
  { t: "すきな きせつ", names: ["春", "夏", "秋", "冬"] },
  { t: "すきな 生きもの", names: ["いぬ", "ねこ", "うさぎ", "金魚"] },
];

function data(r: Rng, n: number, lo: number, hi: number) {
  const tp = r.pick(TOPIC);
  const names = tp.names.slice(0, n);
  const ns = r.sample(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i), n);
  return { t: tp.t, names, ns };
}
const table = (names: string[], ns: number[]) => `${names.join("｜")}\n${ns.map((x) => `${x}人`).join("｜")}`;
const graph = (names: string[], ns: number[]) => names.map((x, i) => `${x}　${"○".repeat(ns[i])}`).join("\n");

function matome(r: Rng): QuestionBody {
  const { t, names, ns } = data(r, 3, 2, 6);
  const k = r.int(0, 2);
  const list = r.shuffle(names.flatMap((x, i) => Array.from({ length: ns[i] }, () => x))).join("、");
  return {
    prompt: `クラスで ${t}を しらべたら、つぎの ように なりました。表《ひょう》に まとめる とき、${names[k]}は 何人と 書きますか。\n${list}`,
    answer: num(ns[k], Array.from({ length: ns[k] }, () => "1").join("+"), "人"),
    point: "数えた ものに しるしを つけて 数える",
    steps: [
      { title: "しゅるいごとに 数える", body: `「${names[k]}」に しるしを つけながら 数えます。{{${ns[k]}人}}です。`, trap: "同じ 人を 2かい 数えないように します。", back: [B_HYO] },
    ],
  };
}

function goukei(r: Rng): QuestionBody {
  const { t, names, ns } = data(r, 4, 2, 9);
  const s = ns.reduce((a, b) => a + b, 0);
  return {
    prompt: `${t}を しらべて 表《ひょう》に しました。しらべた 人は ぜんぶで 何人ですか。\n${table(names, ns)}`,
    answer: num(s, ns.join("+"), "人"),
    point: "表《ひょう》の 数を ぜんぶ たす",
    steps: [{ title: "ぜんぶ たす", body: `${ns.join("＋")}＝{{${s}}}。${s}人です。`, back: [B_HYO] }],
  };
}

function yomu(r: Rng): QuestionBody {
  const { t, names, ns } = data(r, 4, 1, 9);
  const k = r.int(0, 3);
  return {
    prompt: `${t}を しらべて、1人を ○1こで グラフに しました。${names[k]}は 何人ですか。\n${graph(names, ns)}`,
    answer: num(ns[k], Array.from({ length: ns[k] }, () => "1").join("+"), "人"),
    point: "グラフの ○1こが 1人",
    steps: [{ title: "○を 数える", body: `${names[k]}の ○は ${ns[k]}こ。1こで 1人なので {{${ns[k]}人}}です。`, back: [B_GRAPH] }],
  };
}

function chigai(r: Rng): QuestionBody {
  const { t, names, ns } = data(r, 4, 1, 10);
  const [i, j] = r.sample([0, 1, 2, 3], 2).sort((a, b) => ns[b] - ns[a]);
  return {
    prompt: `${t}を しらべて、1人を ○1こで グラフに しました。${names[i]}は ${names[j]}より 何人 多いですか。\n${graph(names, ns)}`,
    answer: num(ns[i] - ns[j], `${ns[i]}-${ns[j]}`, "人"),
    point: "はみ出した ○が ちがい",
    steps: [
      { title: "はみ出した ○", body: `${names[i]}は ${ns[i]}こ、${names[j]}は ${ns[j]}こ。はみ出した ○が ちがいです。`, back: [B_CHIGAI] },
      { title: "ひき算", body: `${ns[i]}−${ns[j]}＝{{${ns[i] - ns[j]}}}。${ns[i] - ns[j]}人 多い。`, trap: `${ns[i]}＋${ns[j]} と たさない。ちがいは ひき算です。` },
    ],
  };
}

function ichiban(r: Rng): QuestionBody {
  const { t, names, ns } = data(r, 4, 1, 10);
  const big = r.bool();
  const v = big ? Math.max(...ns) : Math.min(...ns);
  const k = ns.indexOf(v);
  return {
    prompt: `${t}を しらべて、1人を ○1こで グラフに しました。いちばん ${big ? "多い" : "少ない"}のは どれですか。\n${graph(names, ns)}`,
    answer: choice(r, [[names[k], `${names[k]}の ○が いちばん ${big ? "長く" : "みじかく"} ならんで いて、${v}人です。`], ...names.map((x, i): [string, string] => [x, `${x}は ${ns[i]}人。${names[k]}の ${v}人より ${big ? "少ない" : "多い"}。`]).filter((_, i) => i !== k)]),
    point: "はしを そろえた グラフは、長さで くらべる",
    steps: [{ title: "ならびの 長さ", body: `○の はしが そろって いるので、いちばん ${big ? "長い" : "みじかい"} {{${names[k]}}}が いちばん ${big ? "多い" : "少ない"}。`, back: [B_GRAPH] }],
  };
}

function nokori(r: Rng): QuestionBody {
  const { t, names, ns } = data(r, 4, 2, 9);
  const k = r.int(0, 3);
  const s = ns.reduce((a, b) => a + b, 0);
  const shown = ns.map((x, i) => (i === k ? "□" : `${x}人`));
  const others = ns.filter((_, i) => i !== k);
  return {
    prompt: `${t}を しらべた 表《ひょう》です。しらべた 人は ぜんぶで ${s}人でした。□に 入る 人数は 何人ですか。\n${names.join("｜")}\n${shown.join("｜")}`,
    answer: num(ns[k], `${s}-${others.join("-")}`, "人"),
    point: "ぜんぶの 人数から、わかって いる 人数を ひく",
    steps: [
      { title: "わかって いる 人数を たす", body: `${others.join("＋")}＝${s - ns[k]}（人）。`, back: [B_HYO] },
      { title: "ぜんぶから ひく", body: `${s}−${s - ns[k]}＝{{${ns[k]}}}。□は ${ns[k]}人です。` },
    ],
  };
}

export const E_MATH_2_HYO_GRAPH_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "表《ひょう》と グラフを 読む",
      lead: "つぎの もんだいに 答えなさい。",
      style: "data",
      questions: [
        { id: "matome", type: "A", difficulty: 1, points: 12, seconds: 75, skill: "知識・技能", generate: matome },
        { id: "goukei", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: goukei },
        { id: "yomu", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: yomu },
      ],
    },
    {
      title: "グラフで くらべる",
      lead: "つぎの もんだいに 答えなさい。",
      style: "data",
      questions: [
        { id: "chigai", type: "A", difficulty: 2, points: 15, seconds: 75, skill: "思考・判断・表現", generate: chigai },
        { id: "ichiban", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "思考・判断・表現", generate: ichiban },
      ],
    },
    {
      title: "表《ひょう》と グラフの よい ところ",
      lead: "正しい ものを えらびなさい。",
      style: "mix",
      pick: 1,
      questions: [
        {
          id: "hyo-yosa",
          type: "B",
          difficulty: 2,
          points: 15,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "それぞれの 人数を 数字で 正しく 知りたい とき、べんりなのは どちらですか。",
          answer: { kind: "choice", options: ["表《ひょう》", "グラフ", "どちらも べんりでは ない"], correct: 0, why: ["表《ひょう》には 人数が 数字で 書いて あります。", "グラフは ○を 数えないと 人数が わかりません。くらべるのに べんりです。", "表《ひょう》を 見れば 数字で わかります。"] },
          point: "数を 知りたい ときは 表《ひょう》",
          steps: [{ title: "表《ひょう》の よい ところ", body: "{{数を 知りたい ときは 表《ひょう》}}。数字で 正しく わかります。", back: [B_YOSA] }],
        },
        {
          id: "graph-yosa",
          type: "B",
          difficulty: 2,
          points: 15,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "どれが いちばん 多いかを、ひと目で くらべたい とき、べんりなのは どちらですか。",
          answer: { kind: "choice", options: ["グラフ", "表《ひょう》", "どちらも 同じ"], correct: 0, why: ["グラフは ○の ならびの 長さで、多い・少ないが ひと目で わかります。", "表《ひょう》は 数字を 1つずつ 読んで くらべます。", "ひと目で くらべるには、長さで 見える グラフの ほうが べんりです。"] },
          point: "くらべたい ときは グラフ",
          steps: [{ title: "グラフの よい ところ", body: "{{くらべたい ときは グラフ}}。ならびの 長さで 多い・少ないが わかります。", back: [B_YOSA] }],
        },
        {
          id: "graph-kakikata",
          type: "B",
          difficulty: 2,
          points: 15,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "○の グラフを かく ときに、気を つける ことは どれですか。",
          answer: { kind: "choice", options: ["○の 大きさと 間を そろえ、はしを そろえて かく", "多い ものほど ○を 大きく かく", "○は すきな ところから かきはじめる"], correct: 0, why: ["大きさ・間・はしが そろって いると、長さで くらべられます。", "○の 大きさが ちがうと、長さで くらべられません。", "はしが ずれると、長い ほうが 多いとは いえません。"] },
          point: "○の 大きさ・間・はしを そろえる",
          steps: [{ title: "グラフの かき方", body: "○は {{大きさと 間を そろえ}}、はしを そろえて ならべます。", back: [B_GRAPH] }],
        },
      ],
    },
    {
      title: "表《ひょう》から 考える",
      lead: "つぎの もんだいに 答えなさい。",
      style: "data",
      questions: [{ id: "nokori", type: "A", difficulty: 3, points: 19, seconds: 120, skill: "思考・判断・表現", generate: nokori }],
    },
  ],
};
