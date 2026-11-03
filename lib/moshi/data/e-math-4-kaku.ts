// 小4算数「角の大きさ」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 1回転＝360°、半回転＝180°、直角＝90°、時計《とけい》の長い針《はり》は1分で6°、短い針《はり》の目もり1つ (1時間) は30°。答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-kaku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_KAKU = L(1, "角の大きさは、辺の開きぐあい");
const B_90 = L(2, "直角は90°、半回転は180°");
const B_HAKARU = L(3, "分度器で測《はか》る");
const B_180 = L(4, "180°より大きい角");
const B_JOUGI = L(5, "三角定規《さんかくじょうぎ》の角を組み合わせる");

function tokei(r: Rng): QuestionBody {
  const m = r.step(5, 55, 5);
  return {
    prompt: `時計《とけい》の長い針《はり》が${m}分間に回る角の大きさは、何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(6 * m)], unit: "°", calc: `360/60*${m}` },
    point: "長い針《はり》は60分で360°、1分で6°",
    steps: [
      { title: "1分で何度", body: `60分で1回転（360°）なので、1分で 360÷60＝6（°）。`, back: [B_KAKU, B_90] },
      { title: `${m}分`, body: `6×${m}＝{{${6 * m}}}（°）。` },
    ],
  };
}

function nokori360(r: Rng): QuestionBody {
  const a = r.int(20, 170);
  return {
    prompt: `1回転の角から${a}°をひいた角は、何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(360 - a)], unit: "°", calc: `360-${a}` },
    point: "1回転は360°",
    steps: [{ title: "360°からひく", body: `360−${a}＝{{${360 - a}}}（°）。180°より大きい角になります。`, back: [B_180] }],
  };
}

function jougi(r: Rng): QuestionBody {
  const A = [30, 60, 90];
  const B = [45, 90];
  const a = r.pick(A);
  const b = r.pick(B);
  const plus = r.bool(0.7) || a === b;
  const ans = plus ? a + b : Math.abs(a - b);
  return {
    prompt: plus
      ? `2まいの三角定規《さんかくじょうぎ》の、${a}°の角と${b}°の角を、頂点《ちょうてん》と1つの辺を合わせてならべました。できた角は何度ですか。`
      : `2まいの三角定規《さんかくじょうぎ》の、${Math.max(a, b)}°の角に${Math.min(a, b)}°の角を重ねました。はみ出している部分の角は何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "°", calc: plus ? `${a}+${b}` : `${Math.max(a, b)}-${Math.min(a, b)}` },
    point: "三角定規《さんかくじょうぎ》の角をたす・ひく",
    steps: [{ title: plus ? "たす" : "ひく", body: plus ? `${a}＋${b}＝{{${ans}}}（°）。` : `${Math.max(a, b)}−${Math.min(a, b)}＝{{${ans}}}（°）。`, back: [B_JOUGI] }],
  };
}

function itchokusen(r: Rng): QuestionBody {
  const a = r.int(25, 155);
  return {
    prompt: `1本の直線の上の点から、もう1本の直線をひきました。できた2つの角のうち、1つは${a}°です。もう1つの角は何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(180 - a)], unit: "°", calc: `180-${a}` },
    point: "一直線は半回転で180°",
    steps: [{ title: "180°からひく", body: `一直線の角は180°なので、180−${a}＝{{${180 - a}}}（°）。`, back: [B_90] }],
  };
}

function oogata(r: Rng): QuestionBody {
  const x = r.int(10, 170);
  const kind = r.bool();
  const ans = 180 + x;
  return {
    prompt: kind
      ? `180°より大きい角を測《はか》ります。180°をこえた部分を分度器で測《はか》ると${x}°でした。この角は何度ですか。`
      : `180°より大きい角を測《はか》ります。この角の内がわでない、のこりの部分を分度器で測《はか》ると${180 - x}°でした。この角は何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "°", calc: kind ? `180+${x}` : `360-${180 - x}` },
    point: "180°とあといくつか、または360°からいくつひくか",
    steps: [{ title: kind ? "180°にたす" : "360°からひく", body: kind ? `180＋${x}＝{{${ans}}}（°）。` : `1回転は360°なので、360−${180 - x}＝{{${ans}}}（°）。`, back: [B_180, B_HAKARU] }],
  };
}

function hari(r: Rng): QuestionBody {
  const h = r.int(1, 11);
  const big = 30 * h;
  const ans = Math.min(big, 360 - big);
  return {
    prompt: `時計《とけい》がちょうど${h}時をさしています。長い針《はり》と短い針《はり》がつくる角のうち、小さいほうの角は何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "°", calc: big <= 180 ? `360/12*${h}` : `360-360/12*${h}` },
    point: "数字1つ分は 360÷12＝30°",
    steps: [
      { title: "数字1つ分の角", body: `時計《とけい》の数字は12こで1回転なので、1つ分は 360÷12＝30（°）。`, back: [B_KAKU] },
      { title: "数字いくつ分か", body: big <= 180 ? `12から${h}まで${h}こ分で、30×${h}＝{{${ans}}}（°）。` : `12から${h}まで${h}こ分で${big}°。小さいほうは 360−${big}＝{{${ans}}}（°）。`, trap: big > 180 ? `${big}°は大きいほうの角です。` : undefined, back: [B_180] },
    ],
  };
}

export const E_MATH_4_KAKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "角の大きさ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "itchokusen", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: itchokusen },
        { id: "nokori360", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: nokori360 },
        { id: "jougi", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: jougi },
        { id: "oogata", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: oogata },
      ],
    },
    {
      title: "時計《とけい》の針《はり》と角",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "tokei", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: tokei },
        { id: "hari", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: hari },
      ],
    },
  ],
};
