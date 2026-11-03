// 小3算数「時こくと時間」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 時刻《じこく》は「0時からの分」で持ち、たし算・ひき算してから時・分にもどす。時間 (分・秒) の答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-jikoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_CHIGAI = L(1, "時刻《じこく》と時間はちがう");
const B_ATO = L(2, "○分後の時刻《じこく》は、ちょうどの時刻《じこく》で区切る");
const B_MAE = L(3, "○分前の時刻《じこく》も、ちょうどで区切る");
const B_60 = L(4, "時間のたし算は、60分で1時間");
const B_BYO = L(5, "1分より短い時間は「秒」");

/** 0時からの分 → 「8時40分」 */
const T = (x: number) => {
  const h = Math.floor(x / 60);
  const m = x % 60;
  return m === 0 ? `${h}時` : `${h}時${m}分`;
};
/** 時間 (分) → 「1時間10分」 */
const D = (x: number) => {
  const h = Math.floor(x / 60);
  const m = x % 60;
  return h === 0 ? `${m}分` : m === 0 ? `${h}時間` : `${h}時間${m}分`;
};

/** 正しい答えとまちがいをまぜた4つの選択肢 */
function four(r: Rng, right: string, wrongs: string[]): { options: string[]; correct: number } {
  const ws = [...new Set(wrongs.filter((w) => w !== right))].slice(0, 3);
  const options = r.shuffle([right, ...ws]);
  return { options, correct: options.indexOf(right) };
}

function ato(r: Rng): QuestionBody {
  const h = r.int(7, 10);
  const m = r.step(35, 55, 5);
  const x = r.step(Math.max(15, 65 - m), 50, 5);
  const s = h * 60 + m;
  const toH = 60 - m;
  const right = T(s + x);
  const { options, correct } = four(r, right, [`${h}時${m + x - 60}分`, T(s + x + 60), T(s + x - 10), `${h}時${(m + x) % 60 === 0 ? 60 : m + x}分`].filter((w) => !w.includes("時0分")));
  return {
    prompt: `今は ${T(s)} です。${x}分後の時刻《じこく》は何時何分ですか。`,
    answer: { kind: "choice", options, correct, why: options.map((o) => (o === right ? `${T(s)}から${toH}分で${h + 1}時。のこり${x - toH}分で${right}です。` : `${h + 1}時でいったん区切って数えると、${right}になります。`)) },
    point: "ちょうどの時刻《じこく》で区切って考える",
    steps: [
      { title: "ちょうどの時刻《じこく》まで", body: `${T(s)}から${h + 1}時までは{{${toH}分}}です。`, back: [B_ATO] },
      { title: "のこりをすすめる", body: `${x}−${toH}＝${x - toH}（分）。${h + 1}時から${x - toH}分後で {{${right}}} です。`, trap: `「${h}時${m + x}分」のように、60をこえる分にしない。60分で1時間です。` },
    ],
  };
}
function mae(r: Rng): QuestionBody {
  const h = r.int(8, 11);
  const m = r.step(5, 25, 5);
  const x = r.step(m + 5, 50, 5);
  const s = h * 60 + m;
  const right = T(s - x);
  const { options, correct } = four(r, right, [`${h}時${x - m}分`, T(s - x + 60), T(s - x + 10), T(s + x)]);
  return {
    prompt: `${T(s)}の${x}分前の時刻《じこく》は何時何分ですか。`,
    answer: { kind: "choice", options, correct, why: options.map((o) => (o === right ? `${h}時まで${m}分もどり、のこり${x - m}分もどると${right}です。` : o === T(s + x) ? "これは「後」の時刻《じこく》です。" : `${h}時で区切ってもどると、${right}になります。`)) },
    point: "前の時刻《じこく》も、ちょうどの時刻《じこく》で区切る",
    steps: [
      { title: "ちょうどまでもどる", body: `${T(s)}から${h}時まで、{{${m}分}}もどります。`, back: [B_MAE] },
      { title: "のこりをもどる", body: `${x}−${m}＝${x - m}（分）。${h}時の${x - m}分前は {{${right}}} です。` },
    ],
  };
}

function goukei(r: Rng): QuestionBody {
  const a = r.step(25, 55, 5);
  const b = r.step(65 - a, 55, 5);
  const t = a + b;
  const right = D(t);
  const what = r.pick([["算数", "国語"], ["しゅくだい", "ピアノのれんしゅう"], ["読書", "そうじ"]]);
  const { options, correct } = four(r, right, [`${t}時間`, `1時間${t}分`, D(t + 10), D(t - 10)]);
  return {
    prompt: `${what[0]}を${a}分、${what[1]}を${b}分しました。合わせて何時間何分ですか。`,
    answer: { kind: "choice", options, correct, why: options.map((o) => (o === right ? `${a}＋${b}＝${t}（分）。60分＝1時間なので${right}です。` : `${t}分から60分を1時間にまとめると、${right}です。`)) },
    point: "60分で1時間にまとめる",
    steps: [
      { title: "分でたす", body: `${a}＋${b}＝${t}（分）。`, back: [B_CHIGAI] },
      { title: "60分を1時間に", body: `${t}分は60分と${t - 60}分なので、{{${right}}}です。`, trap: "100分で1時間ではありません。60分で1時間です。", back: [B_60] },
    ],
  };
}

function byou(r: Rng): QuestionBody {
  const m = r.int(1, 3);
  const s = r.int(5, 55);
  return {
    prompt: `${m}分${s}秒は、何秒ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(60 * m + s)], unit: "秒", calc: `60*${m}+${s}` },
    point: "1分＝60秒",
    steps: [{ title: "分を秒にする", body: `${m}分は 60×${m}＝${60 * m}（秒）。${60 * m}＋${s}＝{{${60 * m + s}}}（秒）です。`, trap: `${m}分を${m * 100}秒としないようにします。`, back: [B_BYO] }],
  };
}

function aida(r: Rng): QuestionBody {
  const h = r.int(8, 15);
  const m1 = r.step(20, 50, 5);
  const m2 = r.step(5, m1 - 5, 5);
  const s = h * 60 + m1;
  const e = (h + 1) * 60 + m2;
  const where = r.pick(["図書館《としょかん》", "公園", "プール"]);
  const text = r.bool() ? `家を${T(s)}に出て、${T(e)}にえきに着きました` : `${where}に${T(s)}に着いて、${T(e)}に出ました`;
  return {
    prompt: `${text}。その間の時間は何分ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(e - s)], unit: "分", calc: `(60-${m1})+${m2}` },
    point: "ちょうどの時刻《じこく》で2つに分けてたす",
    steps: [
      { title: `${h + 1}時で区切る`, body: `${T(s)}から${h + 1}時までが ${60 - m1}分、${h + 1}時から${T(e)}までが ${m2}分です。`, back: [B_ATO] },
      { title: "たす", body: `${60 - m1}＋${m2}＝{{${e - s}}}（分）。`, trap: `${m2}−${m1} のように分どうしをひくと、まちがえます。`, back: [B_CHIGAI] },
    ],
  };
}

function tsuku(r: Rng): QuestionBody {
  const h = r.int(7, 9);
  const m = r.step(40, 50, 5);
  const a = r.step(10, 20, 5);
  const b = r.step(15, 35, 5);
  const s = h * 60 + m;
  const right = T(s + a + b);
  const { options, correct } = four(r, right, [T(s + a), T(s + b), T(s + a + b + 10), T(s + a + b - 60)]);
  return {
    prompt: `${T(s)}に家を出て、えきまで${a}分歩き、そこから電車に${b}分乗って、おばあさんの家に着きました。着いた時刻《じこく》は何時何分ですか。`,
    answer: { kind: "choice", options, correct, why: options.map((o) => (o === right ? `かかった時間は ${a}＋${b}＝${a + b}（分）。${T(s)}の${a + b}分後は${right}です。` : `歩いた${a}分と電車の${b}分を合わせた${a + b}分後を考えます。`)) },
    point: "かかった時間を合わせてから、時刻《じこく》をすすめる",
    steps: [
      { title: "かかった時間", body: `${a}＋${b}＝${a + b}（分）。`, back: [B_CHIGAI] },
      { title: "時刻《じこく》をすすめる", body: `${T(s)}から${h + 1}時まで${60 - m}分、のこり${a + b - (60 - m)}分で {{${right}}} です。`, back: [B_ATO] },
    ],
  };
}

export const E_MATH_3_JIKOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "時刻《じこく》をもとめる",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "ato", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: ato },
        { id: "mae", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: mae },
        { id: "byou", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: byou },
      ],
    },
    {
      title: "時間をもとめる",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "goukei", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "知識・技能", generate: goukei },
        { id: "aida", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: aida },
        { id: "tsuku", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: tsuku },
      ],
    },
  ],
};
