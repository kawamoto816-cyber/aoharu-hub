// 小1算数「長さ・かさ・広さくらべ」の単元模試 (A: 数値を入れかえる生成型 ＋ B: くらべかたの プール)。問題はすべてオリジナル。
// A は「おなじ ものの いくつぶん」の かずを rng から作り、ちがいは calc (ひき算) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// どちらが ながい・おおいかの 選択肢は、かずの 大小から正解を決める。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-kurabe";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_HASHI = L(1, "ながさは はしを そろえる");
const B_IKUTSU = L(2, "おなじ ものの「いくつぶん」");
const B_KASA = L(3, "かさ と ひろさ");
const B_3 = L(4, "3つの くらべかた");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

const NAGA: [string, string][] = [
  ["えんぴつ", "クレヨン"],
  ["はさみ", "のり"],
  ["ふでばこ", "けしゴム"],
  ["本", "ノート"],
];

/** ちがう 2つの かず */
function two(r: Rng, lo: number, hi: number): [number, number] {
  const a = r.int(lo, hi);
  let b = r.int(lo, hi - 1);
  if (b >= a) b++;
  return [a, b];
}

function nagasaDocchi(r: Rng): QuestionBody {
  const [x, y] = r.pick(NAGA);
  const [a, b] = two(r, 3, 9);
  const win = a > b ? x : y;
  const lose = a > b ? y : x;
  return {
    prompt: `${x}は クリップ ${a}こぶん、${y}は クリップ ${b}こぶんの ながさです。どちらが ながいですか。`,
    answer: choice(r, [
      [win, `クリップ ${Math.max(a, b)}こぶんの ${win}の ほうが、${Math.abs(a - b)}こぶん ながい。`],
      [lose, `${lose}は クリップ ${Math.min(a, b)}こぶん。${win}より みじかい。`],
      ["おなじ ながさ", `${a}こぶんと ${b}こぶんで、かずが ちがいます。`],
    ]),
    point: "おなじ ものの いくつぶんで くらべる",
    steps: [{ title: "いくつぶんを くらべる", body: `おなじ クリップで はかって いるので、かずが おおい ほうが ながい。${Math.max(a, b)}こぶんの {{${win}}} です。`, back: [B_IKUTSU] }],
  };
}

function nagasaSa(r: Rng): QuestionBody {
  const [x, y] = r.pick(NAGA);
  const [a, b] = two(r, 3, 10);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return {
    prompt: `${x}は けしゴム ${a}こぶん、${y}は けしゴム ${b}こぶんの ながさです。${a > b ? x : y}の ほうが、けしゴム なんこぶん ながいですか。`,
    answer: num(hi - lo, `${hi}-${lo}`, "こぶん"),
    point: "ちがいは ひきざんで もとめる",
    steps: [{ title: "ちがいを もとめる", body: `${hi}こぶんと ${lo}こぶんの ちがいなので、${hi}−${lo}＝{{${hi - lo}}}。${hi - lo}こぶん ながい。`, back: [B_IKUTSU] }],
  };
}

function kasa(r: Rng): QuestionBody {
  const [x, y] = r.pick([
    ["やかん", "すいとう"],
    ["ペットボトル", "ボウル"],
    ["なべ", "やかん"],
  ] as [string, string][]);
  const [a, b] = two(r, 2, 9);
  const win = a > b ? x : y;
  return {
    prompt: `${x}と ${y}に 入る みずを、おなじ コップに うつしました。${x}は コップ ${a}つぶん、${y}は ${b}つぶんでした。おおく 入る ほうは、コップ なんつぶん おおく 入りますか。`,
    answer: num(Math.abs(a - b), a > b ? `${a}-${b}` : `${b}-${a}`, "つぶん"),
    point: "かさは おなじ コップの なんばいぶんで くらべる",
    steps: [
      { title: "おなじ コップで くらべる", body: `コップの かずが おおい {{${win}}}の ほうが、おおく 入ります。`, back: [B_KASA] },
      { title: "ちがい", body: `${Math.max(a, b)}−${Math.min(a, b)}＝{{${Math.abs(a - b)}}}。コップ ${Math.abs(a - b)}つぶん おおく 入ります。` },
    ],
  };
}

function hirosa(r: Rng): QuestionBody {
  const [a, b] = two(r, 4, 12);
  const [x, y] = r.pick([
    ["あかい いろがみ", "あおい いろがみ"],
    ["左の はたけ", "右の はたけ"],
    ["くまの しきもの", "うさぎの しきもの"],
  ] as [string, string][]);
  const win = a > b ? x : y;
  return {
    prompt: `${x}は ます ${a}つぶん、${y}は ます ${b}つぶんの ひろさです。ひろい ほうは、ます なんつぶん ひろいですか。`,
    answer: num(Math.abs(a - b), a > b ? `${a}-${b}` : `${b}-${a}`, "つぶん"),
    point: "ひろさは、ます いくつぶんで くらべる",
    steps: [
      { title: "ますの かずで くらべる", body: `ますが おおい {{${win}}}の ほうが ひろい。`, back: [B_KASA] },
      { title: "ちがい", body: `${Math.max(a, b)}−${Math.min(a, b)}＝{{${Math.abs(a - b)}}}。ます ${Math.abs(a - b)}つぶん ひろい。` },
    ],
  };
}

function san(r: Rng): QuestionBody {
  const ns = r.sample([3, 4, 5, 6, 7, 8, 9, 10, 11], 3);
  const names = r.pick([
    ["あかい テープ", "あおい テープ", "きいろい テープ"],
    ["ひも ア", "ひも イ", "ひも ウ"],
    ["けんさんの ぼう", "ゆいさんの ぼう", "そらさんの ぼう"],
  ]);
  const mx = Math.max(...ns);
  const mn = Math.min(...ns);
  return {
    prompt: `${names.map((x, i) => `${x}は ます ${ns[i]}つぶん`).join("、")}の ながさです。いちばん ながい ものと いちばん みじかい ものの ちがいは、ます なんつぶんですか。`,
    answer: num(mx - mn, `${mx}-${mn}`, "つぶん"),
    point: "いちばん ながい ものと みじかい ものを 見つけて ひく",
    steps: [
      { title: "ながい・みじかいを 見つける", body: `いちばん ながいのは ${mx}つぶんの ${names[ns.indexOf(mx)]}、いちばん みじかいのは ${mn}つぶんの ${names[ns.indexOf(mn)]}。`, back: [B_3] },
      { title: "ちがい", body: `${mx}−${mn}＝{{${mx - mn}}}。ます ${mx - mn}つぶんです。` },
    ],
  };
}

export const E_MATH_1_KURABE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    {
      title: "ながさくらべ",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "nagasa-docchi", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: nagasaDocchi },
        { id: "nagasa-sa", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: nagasaSa },
      ],
    },
    {
      title: "かさくらべ・ひろさくらべ",
      lead: "つぎの もんだいに こたえなさい。",
      style: "word",
      questions: [
        { id: "kasa", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "思考・判断・表現", generate: kasa },
        { id: "hirosa", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: hirosa },
      ],
    },
    {
      title: "くらべかた",
      lead: "ただしい ものを えらびなさい。",
      style: "mix",
      pick: 1,
      questions: [
        {
          id: "hashi",
          type: "B",
          difficulty: 2,
          points: 17,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "2本の えんぴつの ながさを、ならべて くらべます。どう くらべると よいですか。",
          answer: {
            kind: "choice",
            options: ["かたほうの はしを そろえて、はんたいの はしを 見る", "まん中を そろえて、まん中を 見る", "はしを そろえずに、ぱっと 見て きめる"],
            correct: 0,
            why: ["はしを そろえると、でて いる ほうが ながいと わかります。", "まん中を そろえても、はしの ずれで ながさを 見まちがえます。", "はしが ずれて いると、みじかい ほうが ながく 見える ことが あります。"],
          },
          point: "かたほうの はしを そろえる",
          steps: [{ title: "はしを そろえる", body: "{{かたほうの はしを そろえて}}、はんたいの はしを 見ます。でて いる ほうが ながい。", back: [B_HASHI] }],
        },
        {
          id: "kasa-utsusu",
          type: "B",
          difficulty: 2,
          points: 17,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "ほそい コップと ふとい コップに 水が 入って います。どちらが おおいかを しらべる よい やりかたは どれですか。",
          answer: {
            kind: "choice",
            options: ["おなじ 入れものに うつして くらべる", "水の たかさだけを 見て くらべる", "コップの いろを 見て くらべる"],
            correct: 0,
            why: ["おなじ 入れものに うつせば、たかさで くらべられます。", "コップの ふとさが ちがうと、たかさだけでは わかりません。", "いろは かさと かんけい ありません。"],
          },
          point: "かさは おなじ 入れもので くらべる",
          steps: [{ title: "おなじ 入れものに うつす", body: "ふとさが ちがう コップは、{{おなじ 入れものに うつして}} くらべます。", back: [B_KASA] }],
        },
        {
          id: "onaji-mono",
          type: "B",
          difficulty: 2,
          points: 17,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "うごかせない つくえと たなの ながさを くらべます。よい やりかたは どれですか。",
          answer: {
            kind: "choice",
            options: ["どちらも おなじ えんぴつの いくつぶんかで はかる", "つくえは えんぴつで、たなは けしゴムで はかる", "つくえと たなを 見て、大きい ほうに きめる"],
            correct: 0,
            why: ["おなじ ものの いくつぶんなら、かずで くらべられます。", "はかる ものの 大きさが ちがうと、かずで くらべられません。", "見ただけでは、まちがえる ことが あります。"],
          },
          point: "おなじ ものの いくつぶんで くらべる",
          steps: [{ title: "おなじ もので はかる", body: "うごかせない ものは、{{おなじ ものの いくつぶん}}かで くらべます。", back: [B_IKUTSU] }],
        },
      ],
    },
    {
      title: "3つの ながさ",
      lead: "つぎの もんだいに こたえなさい。",
      style: "word",
      questions: [{ id: "san", type: "A", difficulty: 3, points: 21, seconds: 90, skill: "思考・判断・表現", generate: san }],
    },
  ],
};
