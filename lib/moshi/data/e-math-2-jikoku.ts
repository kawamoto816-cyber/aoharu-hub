// 小2算数「時こくと時間」の単元模試 (A: 数値を入れかえる生成型 ＋ B: 時刻と時間の ことばの プール)。問題はすべてオリジナル。
// 時刻は「0時から何分」(60×時＋分) にして計算し、時間 (何分間) は calc (60×時＋分 の差) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 「何時何分」で答える問題は選択肢にし、正解は分にそろえた値から作る (よくある まちがい: 9時70分・時をすすめわすれ)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-jikoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_CHIGAI = L(1, "時刻《じこく》と 時間は ちがう");
const B_KOTOBA = L(2, "ことばで 見分ける");
const B_60 = L(3, "1時間は 60分、1日は 24時間");
const B_CHODO = L(4, "ちょうどの 時刻《じこく》で くぎる");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** 分にそろえた時刻 → 「9時40分」(分が 0 なら「10時」)。12時間で 1回り */
const jk = (t: number) => {
  const h = Math.floor(t / 60) % 12 || 12;
  const m = t % 60;
  return `${h}時${m ? `${m}分` : ""}`;
};

function aida(r: Rng): QuestionBody {
  const h = r.int(7, 11);
  const m1 = r.step(0, 40, 5);
  const m2 = r.step(m1 + 10, 55, 5);
  const who = r.pick(["本を 読みました", "なわとびを しました", "ピアノの れんしゅうを しました", "しゅくだいを しました"]);
  return {
    prompt: `${h}時${m1 ? `${m1}分` : ""}から ${h}時${m2}分まで、${who}。何分間 かかりましたか。`,
    answer: num(m2 - m1, `${m2}-${m1}`, "分間"),
    point: "時間は、2つの 時刻《じこく》の 間の 長さ",
    steps: [{ title: "長い はりが すすんだ 分", body: `長い はりは ${m1}分から ${m2}分まで すすみました。${m2}−${m1}＝{{${m2 - m1}}}。${m2 - m1}分間です。`, trap: `${h}時${m2}分 と 時刻《じこく》で 答えない。聞かれて いるのは 時間です。`, back: [B_CHIGAI] }],
  };
}

function fun(r: Rng): QuestionBody {
  const k = r.int(0, 2);
  if (k === 0) {
    const h = r.int(1, 3);
    const m = r.step(5, 55, 5);
    return {
      prompt: `${h}時間${m}分は 何分ですか。`,
      answer: num(60 * h + m, `60*${h}+${m}`, "分"),
      point: "1時間＝60分",
      steps: [{ title: "時間を 分に", body: `1時間＝60分なので、${h}時間は ${60 * h}分。${60 * h}＋${m}＝{{${60 * h + m}}}分です。`, trap: "1時間を 100分と しない。", back: [B_60] }],
    };
  }
  if (k === 1) {
    const m = r.step(65, 115, 5);
    return {
      prompt: `${m}分は、1時間 何分ですか。`,
      answer: num(m - 60, `${m}-60`, "分"),
      point: "60分で 1時間",
      steps: [{ title: "60分を 1時間に", body: `${m}分から 60分（1時間）を とると ${m - 60}分。1時間{{${m - 60}分}} です。`, back: [B_60] }],
    };
  }
  const d = r.int(2, 3);
  return {
    prompt: `${d}日は 何時間ですか。`,
    answer: num(24 * d, `24*${d}`, "時間"),
    point: "1日＝24時間",
    steps: [{ title: "1日＝24時間", body: `1日は 24時間。${d}日は ${Array.from({ length: d }, () => "24").join("＋")}＝{{${24 * d}}}時間です。`, back: [B_60] }],
  };
}

function ato(r: Rng): QuestionBody {
  const h = r.int(1, 11);
  const m = r.step(0, 30, 5);
  const k = r.step(10, 55 - m, 5);
  const t = 60 * h + m;
  return {
    prompt: `今の 時刻《じこく》は ${jk(t)}です。${k}分後の 時刻《じこく》は 何時何分ですか。`,
    answer: choice(r, [
      [jk(t + k), `長い はりが ${m}分から ${k}分 すすんで ${m + k}分。${jk(t + k)}です。`],
      [jk(t - k), `${k}分 前の 時刻《じこく》です。「後」は すすめます。`],
      [`${h + 1}時${m + k}分`, "時を 1つ すすめて しまって います。ちょうどの 時刻《じこく》を こえて いません。"],
      [`${h}時${k}分`, `今の ${m}分を わすれて います。`],
    ]),
    point: "「何分後」は 長い はりを すすめる",
    steps: [{ title: "長い はりを すすめる", body: `${m}分から ${k}分 すすめると ${m}＋${k}＝${m + k}分。{{${jk(t + k)}}} です。`, back: [B_CHIGAI] }],
  };
}

function koeru(r: Rng): QuestionBody {
  const h = r.int(7, 10);
  const m = r.step(35, 55, 5);
  const k = r.step(65 - m, 50, 5);
  const t = 60 * h + m;
  const s = t + k;
  const toChodo = 60 - m;
  return {
    prompt: `${jk(t)}の ${k}分後の 時刻《じこく》は 何時何分ですか。`,
    answer: choice(r, [
      [jk(s), `${h + 1}時まで ${toChodo}分、のこり ${k - toChodo}分 すすめて ${jk(s)}です。`],
      [`${h}時${m + k}分`, "60分で 1時間です。60分を こえたら 時を 1つ すすめます。"],
      [`${h}時${(m + k) % 60}分`, "60分を こえたのに、時を すすめわすれて います。"],
      [`${h + 2}時${(m + k) % 60}分`, "時を 2つ すすめて います。すすむのは 1つです。"],
    ]),
    point: "ちょうどの 時刻《じこく》で くぎって 考える",
    steps: [
      { title: "ちょうどまで", body: `${jk(t)}から ${h + 1}時までは ${toChodo}分。`, back: [B_CHODO] },
      { title: "のこりを すすめる", body: `${k}−${toChodo}＝${k - toChodo}（分）。${h + 1}時から ${k - toChodo}分 すすめて {{${jk(s)}}} です。`, trap: `${h}時${m + k}分 と しない。`, back: [B_60] },
    ],
  };
}

function mae(r: Rng): QuestionBody {
  const h = r.int(2, 11);
  const m = r.step(5, 25, 5);
  const k = r.step(m + 5, 40, 5);
  const t = 60 * h + m;
  const s = t - k;
  return {
    prompt: `${jk(t)}の ${k}分前の 時刻《じこく》は 何時何分ですか。`,
    answer: choice(r, [
      [jk(s), `${h}時まで ${m}分 もどり、のこり ${k - m}分 もどして ${jk(s)}です。`],
      [jk(t + k), `${k}分後の 時刻《じこく》です。「前」は もどします。`],
      [`${h}時${60 - (k - m)}分`, "ちょうどの 時刻《じこく》より 前に なったので、時を 1つ もどします。"],
      [`${h - 1}時${k - m}分`, "ちょうどから もどした 分を 60分から ひいて いません。"],
    ]),
    point: "ちょうどの 時刻《じこく》で くぎって もどす",
    steps: [
      { title: "ちょうどまで もどす", body: `${jk(t)}から ${h}時まで ${m}分 もどします。`, back: [B_CHODO] },
      { title: "のこりを もどす", body: `のこり ${k - m}分。${h}時の ${k - m}分前は {{${jk(s)}}} です。` },
    ],
  };
}

function hatten(r: Rng): QuestionBody {
  if (r.bool()) {
    const a = r.int(8, 11);
    const b = r.int(1, 4);
    return {
      prompt: `午前${a}時から 午後${b}時までは、何時間ですか。`,
      answer: num(12 - a + b, `(12-${a})+${b}`, "時間"),
      point: "正午（12時）で くぎる",
      steps: [
        { title: "正午まで", body: `午前${a}時から 正午（昼の 12時）までは ${12 - a}時間。`, back: [B_60] },
        { title: "正午から", body: `正午から 午後${b}時までは ${b}時間。あわせて ${12 - a}＋${b}＝{{${12 - a + b}}}時間です。`, trap: `${b}−${a} や ${a}＋${b} と しない。正午で 午前と 午後が かわります。` },
      ],
    };
  }
  const h = r.int(7, 10);
  const m1 = r.step(30, 55, 5);
  const m2 = r.step(5, 40, 5);
  const d = 60 - m1 + m2;
  return {
    prompt: `${h}時${m1}分に 家を 出て、${h + 1}時${m2}分に 公園に つきました。何分間 かかりましたか。`,
    answer: num(d, `(60-${m1})+${m2}`, "分間"),
    point: "ちょうどの 時刻《じこく》で 2つに 分ける",
    steps: [
      { title: "ちょうどまで", body: `${h}時${m1}分から ${h + 1}時までは ${60 - m1}分。`, back: [B_CHODO] },
      { title: "ちょうどから", body: `${h + 1}時から ${h + 1}時${m2}分までは ${m2}分。あわせて ${60 - m1}＋${m2}＝{{${d}}}分間です。`, trap: `${m2}−${m1} や ${m1}−${m2} と しない。` },
    ],
  };
}

export const E_MATH_2_JIKOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "時間と 時刻《じこく》を 読む",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [
        { id: "aida", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: aida },
        { id: "fun", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: fun },
        { id: "ato", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: ato },
      ],
    },
    {
      title: "ちょうどの 時刻《じこく》を こえる",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [
        { id: "koeru", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: koeru },
        { id: "mae", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: mae },
      ],
    },
    {
      title: "時刻《じこく》と 時間の ことば",
      lead: "あてはまる ものを えらびなさい。",
      style: "mix",
      pick: 1,
      questions: [
        {
          id: "kotoba-jikan",
          type: "B",
          difficulty: 2,
          points: 15,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "「学校から 家まで 何分 かかりましたか」と 聞かれました。答え方として 正しいのは どれですか。",
          answer: {
            kind: "choice",
            options: ["20分", "3時20分", "午後3時"],
            correct: 0,
            why: ["かかった 長さ（時間）を 答えて います。", "3時20分は 時刻《じこく》です。かかった 時間では ありません。", "午後3時は 時刻《じこく》です。"],
          },
          point: "「何分 かかったか」は 時間を 答える",
          steps: [{ title: "ことばで 見分ける", body: "「何分」「何時間」「かかった」は {{時間}}。時刻《じこく》を 答えないように します。", back: [B_KOTOBA] }],
        },
        {
          id: "kotoba-jikoku",
          type: "B",
          difficulty: 2,
          points: 15,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "時刻《じこく》を あらわして いる ものは どれですか。",
          answer: {
            kind: "choice",
            options: ["朝 7時30分に おきた", "30分間 本を 読んだ", "公園まで 15分 かかった"],
            correct: 0,
            why: ["7時30分は 時計の はりが さす「その とき」なので 時刻《じこく》です。", "30分間は 長さなので 時間です。", "かかった 15分は 時間です。"],
          },
          point: "時刻《じこく》は「その とき」",
          steps: [{ title: "時刻《じこく》と 時間", body: "時刻《じこく》は 時計の はりが さす {{その とき}}。時間は 時刻《じこく》から 時刻《じこく》までの 長さです。", back: [B_CHIGAI] }],
        },
        {
          id: "shogo",
          type: "B",
          difficulty: 2,
          points: 15,
          seconds: 45,
          skill: "知識・技能",
          prompt: "「正午」は いつの ことですか。",
          answer: {
            kind: "choice",
            options: ["昼の 12時", "夜の 12時", "朝の 6時"],
            correct: 0,
            why: ["正午は 昼の 12時。正午より 前が 午前、後が 午後です。", "夜の 12時は 正午では ありません。", "朝の 6時は 午前6時です。"],
          },
          point: "正午は 昼の 12時",
          steps: [{ title: "正午", body: "昼の 12時を {{正午}} と いいます。正午より 前が 午前、後が 午後です。", back: [B_60] }],
        },
      ],
    },
    {
      title: "時間を もとめる",
      lead: "つぎの もんだいに 答えなさい。",
      style: "word",
      questions: [{ id: "hatten", type: "A", difficulty: 3, points: 19, seconds: 120, skill: "思考・判断・表現", generate: hatten }],
    },
  ],
};
