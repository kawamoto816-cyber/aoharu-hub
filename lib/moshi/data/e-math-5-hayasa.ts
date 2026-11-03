// 小5算数「速さ」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数値は rng から作り、答えが整数か小数第1位までになる組だけを使う。calc で答えを検算 (scripts/check-moshi.ts がシード100個で確かめる)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-hayasa";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_SHIKI = { label: "面積図で3つの式をまとめる", href: L(2) };
const BACK_60 = { label: "時速・分速・秒速は60でつながる", href: L(3) };
const BACK_TANI = { label: "計算の前に、単位をそろえる", href: L(4) };

/** 小数を「1.5」のように (末尾の0を出さない) */
const f = (x: number) => String(Math.round(x * 1000) / 1000);

function jisoku(r: Rng): QuestionBody {
  const v = r.step(30, 90, 5);
  const t = r.int(2, 5);
  const d = v * t;
  const who = r.pick(["自動車", "バス", "トラック"]);
  return {
    prompt: `ある${who}が ${d}km の道のりを ${t}時間で走りました。この${who}の速さは、時速何kmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], labels: ["時速"], unit: "km", calc: `${d}/${t}` },
    point: "速さ＝道のり÷時間",
    steps: [
      { title: "速さ＝道のり÷時間", body: `1時間あたりに進む道のりを求めます。${d}÷${t}＝{{${v}}} なので、時速${v}kmです。`, back: [BACK_SHIKI] },
    ],
  };
}

function michinori(r: Rng): QuestionBody {
  const v = r.step(50, 90, 5);
  const t = r.int(8, 25);
  const d = v * t;
  const who = r.pick(["けんたさん", "ゆいさん", "お兄さん"]);
  return {
    prompt: `${who}は、分速${v}mで${t}分間歩きました。何m進みましたか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(d)], unit: "m", calc: `${v}*${t}` },
    point: "道のり＝速さ×時間",
    steps: [
      { title: "道のり＝速さ×時間", body: `1分間に${v}m進むので、${t}分間では ${v}×${t}＝{{${d}}}（m）です。`, back: [BACK_SHIKI] },
    ],
  };
}

function jikan(r: Rng): QuestionBody {
  const v = r.pick([4, 5, 6, 7, 8]); // 人が走る速さ (秒速10m以上は大人のトップ選手より速い)
  const t = r.int(6, 30);
  const d = v * t;
  return {
    prompt: `秒速${v}mで走る人が、${d}m 走るのにかかる時間は何秒ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(t)], unit: "秒", calc: `${d}/${v}` },
    point: "時間＝道のり÷速さ",
    steps: [
      {
        title: "時間＝道のり÷速さ",
        body: `1秒間に${v}m進むので、${d}m 進むには ${d}÷${v}＝{{${t}}}（秒）かかります。`,
        trap: `${v}÷${d} のように、速さ÷道のりにしない。面積図で、横（時間）＝面積（道のり）÷たて（速さ）です。`,
        back: [BACK_SHIKI],
      },
    ],
  };
}

function tanni(r: Rng): QuestionBody {
  if (r.bool()) {
    // 時速 → 分速 (時速 6k km ＝ 分速 100k m)
    const k = r.int(2, 15);
    const x = 6 * k;
    const ans = 100 * k;
    return {
      prompt: `時速${x}kmは、分速何mですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(ans)], labels: ["分速"], unit: "m", calc: `${x}*1000/60` },
      point: "km を m に直してから、60でわる",
      steps: [
        { title: "km を m に直す", body: `${x}km＝{{${x * 1000}m}}。時速${x}kmは、1時間（60分）に ${x * 1000}m 進む速さです。`, back: [BACK_TANI] },
        { title: "1分あたりにする", body: `${x * 1000}÷60＝{{${ans}}} なので、分速${ans}mです。`, trap: "km のまま ÷60 をして、分速 0.○km とまちがえやすい。答えの単位（m）を先に確かめます。", back: [BACK_60] },
      ],
    };
  }
  // 分速 → 秒速 (分速 60k m ＝ 秒速 k m)
  const k = r.int(2, 20);
  const x = 60 * k;
  return {
    prompt: `分速${x}mは、秒速何mですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(k)], labels: ["秒速"], unit: "m", calc: `${x}/60` },
    point: "1分＝60秒。分速÷60＝秒速",
    steps: [
      { title: "1秒あたりにする", body: `1分（60秒）に${x}m進むので、1秒では ${x}÷60＝{{${k}}}（m）。秒速${k}mです。`, trap: "×60 にすると、反対に大きくなってしまう。秒速は分速より小さい数になります。", back: [BACK_60] },
    ],
  };
}

function funKaraJisoku(r: Rng): QuestionBody {
  const t = r.pick([10, 12, 15, 20, 30, 40, 45]);
  const k = r.int(2, 10);
  const v = 6 * k; // 時速
  const d = (k * t) / 10; // km (小数第1位まで)
  const who = v <= 30 ? "自転車" : "自動車";
  return {
    prompt: `${who}で ${f(d)}km の道のりを ${t}分で走りました。この${who}の速さは、時速何kmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], labels: ["時速"], unit: "km", calc: `${f(d)}*60/${t}` },
    point: "時速を聞かれたら、60分あたりにそろえる",
    steps: [
      { title: "まず分速を出す", body: `${f(d)}÷${t}＝${f(d / t)} なので、1分間に ${f(d / t)}km 進みます。`, back: [BACK_TANI] },
      { title: "60倍して時速にする", body: `1時間は60分なので、${f(d / t)}×60＝{{${v}}}。時速${v}kmです。`, trap: `${f(d)}÷${t} で止めると分速になる。聞かれている単位（時速）を確かめます。`, back: [BACK_60] },
    ],
  };
}

function kuraberu(r: Rng): QuestionBody {
  let va = 0;
  let vb = 0;
  let ta = 0;
  let tb = 0;
  // 道のりが長い方が速いとはかぎらない組を、なるべく出す
  for (let i = 0; i < 40; i++) {
    va = r.step(50, 90, 5);
    vb = r.step(50, 90, 5);
    ta = r.int(6, 20);
    tb = r.int(6, 20);
    if (va !== vb && ta !== tb && va * ta > vb * tb !== va > vb) break;
  }
  if (va === vb) vb = va === 90 ? 85 : va + 5;
  if (ta === tb) tb = ta === 20 ? 19 : ta + 1;
  const a = va * ta;
  const b = vb * tb;
  const correct = va > vb ? 0 : 1;
  return {
    prompt: `あきさんは ${a}m を${ta}分で、はるとさんは ${b}m を${tb}分で歩きました。どちらが速いですか。`,
    answer: {
      kind: "choice",
      options: ["あきさん", "はるとさん", "同じ速さ"],
      correct,
      why: [
        `あきさんは ${a}÷${ta}＝分速${va}m。${correct === 0 ? "はるとさん（分速" + vb + "m）より速い。" : "はるとさん（分速" + vb + "m）よりおそい。"}`,
        `はるとさんは ${b}÷${tb}＝分速${vb}m。${correct === 1 ? "あきさん（分速" + va + "m）より速い。" : "あきさん（分速" + va + "m）よりおそい。"}`,
        `1分あたりにそろえると、分速${va}m と分速${vb}m でちがいます。`,
      ],
    },
    point: "道のりも時間もちがうときは、1分あたりにそろえる",
    steps: [
      { title: "1分あたりにそろえる", body: `あきさん ${a}÷${ta}＝{{分速${va}m}}、はるとさん ${b}÷${tb}＝{{分速${vb}m}}。`, back: [{ label: "速さは、時間をそろえて比べる", href: L(1) }] },
      { title: "比べる", body: `1分間に多く進む${correct === 0 ? "あきさん" : "はるとさん"}の方が速い。`, trap: "道のりの長さだけ、時間の短さだけで決めない。どちらもちがうときは、単位時間あたりにそろえます。" },
    ],
  };
}

/** 往復の平均の速さ [行き, 帰り, 平均] (平均が整数になる組) */
const OUFUKU: [number, number, number][] = [
  [60, 40, 48],
  [40, 60, 48],
  [30, 20, 24],
  [20, 30, 24],
  [45, 30, 36],
  [30, 45, 36],
  [36, 18, 24],
  [15, 10, 12],
  [10, 15, 12],
  [12, 6, 8],
];
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

function oufuku(r: Rng): QuestionBody {
  const [v1, v2, avg] = r.pick(OUFUKU);
  const lcm = (v1 * v2) / gcd(v1, v2);
  const d = lcm * r.int(1, 2);
  const t1 = d / v1;
  const t2 = d / v2;
  const who = v1 <= 15 && v2 <= 15 ? "自転車" : "自動車";
  const naive = (v1 + v2) / 2;
  return {
    prompt: `A町とB町の間は ${d}km あります。${who}で、行きは時速${v1}km、帰りは時速${v2}kmで往復しました。往復の平均の速さは、時速何kmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(avg)], labels: ["時速"], unit: "km", calc: `${2 * d}/(${t1}+${t2})` },
    point: "平均の速さ＝全体の道のり÷全体の時間",
    steps: [
      { title: "行きと帰りの時間", body: `行きは ${d}÷${v1}＝${t1}（時間）、帰りは ${d}÷${v2}＝${t2}（時間）。合わせて ${t1 + t2}時間です。`, back: [BACK_SHIKI] },
      {
        title: "全体の道のり÷全体の時間",
        body: `往復の道のりは ${d}×2＝${2 * d}（km）。${2 * d}÷${t1 + t2}＝{{${avg}}} なので、時速${avg}kmです。`,
        trap: `(${v1}＋${v2})÷2＝${f(naive)} としない。おそい帰りの方が長い時間走っているので、平均の速さは ${f(naive)} より小さくなります。`,
      },
    ],
  };
}

export const E_MATH_5_HAYASA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "速さ・道のり・時間を求める",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "jisoku", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: jisoku },
        { id: "michinori", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: michinori },
        { id: "jikan", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: jikan },
      ],
    },
    {
      title: "単位をそろえる・速さを比べる",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "tanni", type: "A", difficulty: 2, points: 14, seconds: 90, skill: "知識・技能", generate: tanni },
        { id: "fun-jisoku", type: "A", difficulty: 2, points: 14, seconds: 120, skill: "思考・判断・表現", generate: funKaraJisoku },
        { id: "kuraberu", type: "A", difficulty: 2, points: 14, seconds: 120, skill: "思考・判断・表現", generate: kuraberu },
      ],
    },
    {
      title: "往復の平均の速さ",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "oufuku", type: "A", difficulty: 3, points: 22, seconds: 180, skill: "思考・判断・表現", generate: oufuku }],
    },
  ],
};
