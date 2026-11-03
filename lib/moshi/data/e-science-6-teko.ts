// 小6理科「てこのはたらき」の単元模試 (A: 数値を入れかえる計算3問 ＋ B: 問題プール6問からシードで3問)。問題はすべてオリジナル。
// A は先に答え (重さ・目盛り・距離《きょり》) を決めてから、「重さ×支点からの距離《きょり》」が左右で等しくなるように問題の数を掛け算で作る。
// calc で答えを検算 (scripts/check-moshi.ts がシード100個で確かめる)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-science-6-teko";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S = [L(1, "てこの3つの点"), L(2, "小さな力ですむのは、どんなときか"), L(3, "つり合いのきまりを式で表す"), L(4, "てこを使った道具は3つの仲間に分かれる"), L(5, "てこのきまりで重さをはかる")];

/** 右にこの重さをつるすとつり合う (左の目盛り a に w g、右の目盛り b) */
function omosa(r: Rng): QuestionBody {
  const a = r.int(1, 6);
  let b = r.int(1, 6);
  if (b === a) b = a === 6 ? 2 : a + 1;
  const m = r.int(1, 6);
  const w = 10 * b * m; // 左の重さ
  const x = 10 * a * m; // 答え: 右の重さ
  const side = r.bool();
  const [L1, R1] = side ? ["左", "右"] : ["右", "左"];
  return {
    prompt: `実験用てこの${L1}の${a}の目盛りに${w}gのおもりをつるしました。${R1}の${b}の目盛りに何gのおもりをつるすと、てこは水平につり合いますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x)], unit: "g", calc: `${w}*${a}/${b}` },
    point: "重さ×目盛りの数 が左右で等しいとつり合う",
    steps: [
      { title: `${L1}のかたむけるはたらき`, body: `${w}×${a}＝{{${w * a}}}。`, back: [S[2]] },
      { title: `${R1}も同じにする`, body: `□×${b}＝${w * a} なので、□＝${w * a}÷${b}＝{{${x}}}（g）です。`, trap: "「重さ＋距離《きょり》」で考えない。かけ算で表します。", back: [S[2]] },
    ],
  };
}

/** 目盛りを求める、または力点の手ごたえを求める */
function kyori(r: Rng): QuestionBody {
  if (r.bool()) {
    const a = r.int(1, 6);
    let b = r.int(1, 6);
    if (b === a) b = a === 6 ? 3 : a + 1;
    const m = r.int(1, 5);
    const w = 10 * b * m;
    const x = 10 * a * m;
    return {
      prompt: `実験用てこの左の${a}の目盛りに${w}gのおもりをつるしました。右に${x}gのおもりを1個つるして水平につり合わせるには、右のいくつの目盛りにつるせばよいですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(b)], unit: "の目盛り", calc: `${w}*${a}/${x}` },
      point: "わからない距離《きょり》も、つり合いの式から求める",
      steps: [
        { title: "左のかたむけるはたらき", body: `${w}×${a}＝{{${w * a}}}。`, back: [S[2]] },
        { title: "右の目盛りを求める", body: `${x}×□＝${w * a} なので、□＝${w * a}÷${x}＝{{${b}}}。右の${b}の目盛りです。`, back: [S[2]] },
      ],
    };
  }
  // 支点から 10cm の作用点に 300g (レクチャーの図)。力点までの距離《きょり》を変える
  const W = r.pick([200, 300, 400, 600]);
  const s = r.pick([5, 10]);
  const k = r.pick([2, 3, 4, 5, 6].filter((n) => W % n === 0));
  const d = s * k;
  const F = (W * s) / d;
  return {
    prompt: `棒を使ったてこで、支点から${s}cmの作用点に${W}gのおもりをつるしました。支点から${d}cmの力点を手でおして、棒を水平に支えます。手ごたえは何gのおもりをつるしたときと同じですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(F)], unit: "g", calc: `${W}*${s}/${d}` },
    point: "力点が支点から遠いほど、小さな力ですむ",
    steps: [
      { title: "作用点のかたむけるはたらき", body: `${W}×${s}＝{{${W * s}}}。`, back: [S[2]] },
      { title: "力点の力を求める", body: `□×${d}＝${W * s} なので、□＝${W * s}÷${d}＝{{${F}}}（g）。力点までの距離《きょり》が${k}倍なので、力は${k}分の1です。`, trap: "力点を支点に近づけるほど楽になる、と考えやすい。反対に、遠ざけるほど小さな力ですみます。", back: [S[1]] },
    ],
  };
}

/** 片側の2か所につるす／さおばかり */
function hatten(r: Rng): QuestionBody {
  if (r.bool()) {
    // 右: w1 g を b1 に、□ g を b2 に。左: w g を a に
    for (let i = 0; i < 60; i++) {
      const b1 = r.int(1, 6);
      let b2 = r.int(1, 6);
      if (b2 === b1) b2 = b1 === 6 ? 1 : b1 + 1;
      const w1 = 10 * r.int(1, 4);
      const x = 10 * r.int(1, 4);
      const M = w1 * b1 + x * b2;
      const a = r.pick([2, 3, 4, 5, 6].filter((n) => M % (10 * n) === 0));
      if (a === undefined) continue;
      const w = M / a;
      if (w > 200) continue;
      return {
        prompt: `実験用てこの左の${a}の目盛りに${w}gのおもりをつるしました。右の${b1}の目盛りに${w1}gのおもりをつるし、さらに右の${b2}の目盛りにもおもりをつるして、水平につり合わせます。右の${b2}の目盛りには何gのおもりをつるせばよいですか。`,
        answer: { kind: "num", answerKind: "num", answer: [String(x)], unit: "g", calc: `(${w}*${a}-${w1}*${b1})/${b2}` },
        point: "片側に2か所あれば、重さ×距離《きょり》をたし算する",
        steps: [
          { title: "左のかたむけるはたらき", body: `${w}×${a}＝{{${M}}}。`, back: [S[2]] },
          { title: "右の分かっている分", body: `右の${b1}の目盛りは ${w1}×${b1}＝${w1 * b1}。残りは ${M}－${w1 * b1}＝{{${M - w1 * b1}}}。`, back: [S[2]] },
          { title: "残りを目盛りでわる", body: `□×${b2}＝${M - w1 * b1} なので、□＝{{${x}}}（g）です。`, trap: "右の2か所は、それぞれの「重さ×距離《きょり》」をたし算して、左と等しくします。", back: [S[2]] },
        ],
      };
    }
  }
  // さおばかり: 品物 W g を支点から s cm、おもり w g を何 cm に
  const w = r.pick([100, 200, 250, 500]);
  const ans = r.step(10, 40, 5);
  const s = r.pick([2, 4, 5].filter((n) => (w * ans) % n === 0));
  const W = (w * ans) / s;
  const item = r.pick(["野菜", "すいか", "米のふくろ"]);
  return {
    prompt: `さおばかりの支点から${s}cmの所に${W}gの${item}をつるしました。${w}gのおもりを、支点から何cmの所につるすと、さおは水平になりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "cm", calc: `${W}*${s}/${w}` },
    point: "軽いおもりでも、支点から遠ければつり合う",
    steps: [
      { title: "品物のかたむけるはたらき", body: `${W}×${s}＝{{${W * s}}}。`, back: [S[4]] },
      { title: "おもりの位置", body: `${w}×□＝${W * s} なので、□＝${W * s}÷${w}＝{{${ans}}}（cm）です。`, back: [S[4]] },
    ],
  };
}

// ---- B: 知識 (1回に基本・標準・発展から1問ずつ) ----
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
type Sk = QuestionB["skill"];
const K: Sk = "知識・技能";
const H: Sk = "思考・判断・表現";
type Step = [title: string, body: string, back: number, trap?: string];
/** 選択。opts は [選択肢, 理由] で、先頭が正解 (画面では並べかえる) */
const ch = (id: string, d: 1 | 2 | 3, skill: Sk, prompt: string, opts: [string, string][], point: string, [title, body, back, trap]: Step): QuestionB => ({
  id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt,
  answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) },
  point, steps: [{ title, body, trap, back: [S[back - 1]] }],
});

const POOL: QuestionB[] = [
  ch("shiten", 1, K, "てこで、棒を支える点を何といいますか。",
    [["支点", "棒を支える点が支点。"],
     ["力点", "力点は力を加える点。"],
     ["作用点", "作用点はものに力がはたらく点。"]],
    "支える点＝支点", ["3つの点", "棒を支える点を{{支点}}、力を加える点を{{力点}}、ものに力がはたらく点を{{作用点}}といいます。", 1]),
  ch("raku", 1, K, "てこで、小さな力でものを持ち上げるにはどうすればよいですか。",
    [["力点を支点から遠くする", "力点を支点から遠くするほど、小さな力ですむ。"],
     ["力点を支点に近くする", "近くすると、大きな力が必要になる。"],
     ["作用点を支点から遠くする", "作用点は支点に近くするほど、小さな力ですむ。"]],
    "力点は遠く、作用点は近く", ["小さな力ですむとき", "{{力点を支点から遠くする}}ほど、また{{作用点を支点に近くする}}ほど、小さな力でものを持ち上げられます。", 2, "力点を支点に近づけるほど楽になると思いやすい。"]),
  ch("sennuki", 2, K, "せんぬきは、3つの点のうちどれが真ん中にある道具ですか。",
    [["作用点", "せんぬきは作用点が真ん中。空きかんつぶしも同じ仲間。"],
     ["支点", "支点が真ん中なのは、くぎぬきやはさみ。"],
     ["力点", "力点が真ん中なのは、ピンセットやトング。"]],
    "せんぬきは作用点が真ん中", ["3つの仲間", "道具は、3つの点のうち{{どれが真ん中にあるか}}で分けられます。せんぬきは作用点が真ん中です。", 4]),
  ch("tenbin", 2, H, "上皿てんびんが水平につり合うのは、どんなときですか。",
    [["左右の皿にのせた重さが等しいとき", "支点から左右の皿までの距離《きょり》が同じなので、重さが等しいとつり合う。"],
     ["左の皿の方が重いとき", "重い方にかたむく。"],
     ["右の皿にだけものをのせたとき", "右にかたむく。"]],
    "距離《きょり》が同じなら、重さが等しいとつり合う", ["てんびん", "{{てんびん}}は、支点から左右の皿までの距離《きょり》が同じなので、{{左右の重さが等しいとき}}に水平につり合います。", 5]),
  ch("pinset", 3, H, "ピンセットについて、正しいものはどれですか。",
    [["力点が真ん中にあり、作用点の力は加えた力より小さくなるので、細かいものをやさしくつまめる", "作用点のほうが支点から遠いので、作用点の力は小さくなる。"],
     ["支点が真ん中にあり、小さな力を大きな力に変える", "支点が真ん中なのは、くぎぬきやはさみ。"],
     ["作用点が真ん中にあり、大きな力が出せる", "作用点が真ん中なのはせんぬき。"]],
    "ピンセットは力点が真ん中", ["力点が真ん中の道具", "{{力点が真ん中のピンセット}}は、加えた力より作用点の力が小さくなるので、細かいものをやさしくつまむのに向いています。", 4, "ピンセットも小さな力を大きな力に変えると思いやすい。"]),
  ch("hasami", 3, H, "はさみで厚《あつ》い紙を切るとき、小さな力で切るには、紙を刃《は》のどこにはさむとよいですか。",
    [["刃《は》のおくのほう（支点の近く）", "作用点を支点に近くするほど、小さな力ですむ。"],
     ["刃《は》の先のほう（支点から遠い所）", "作用点が支点から遠いと、大きな力が必要になる。"],
     ["どこにはさんでも同じ", "作用点の位置で、必要な力は変わる。"]],
    "作用点を支点に近くする", ["はさみ", "はさみは支点が真ん中の道具です。{{作用点を支点に近くする}}ほど、小さな力ですみます。", 4]),
];

export const E_SCIENCE_6_TEKO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "小6",
  minutes: 14,
  review: { status: "draft" },
  sections: [
    {
      title: "てこのつり合いを計算する",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "omosa", type: "A", difficulty: 1, points: 16, seconds: 90, skill: "知識・技能", generate: omosa },
        { id: "kyori", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: kyori },
        { id: "hatten", type: "A", difficulty: 3, points: 17, seconds: 180, skill: "思考・判断・表現", generate: hatten },
      ],
    },
    { title: "てこのはたらき", lead: "次の問いに答えなさい。", style: "mix", pick: 3, questions: POOL },
  ],
};
