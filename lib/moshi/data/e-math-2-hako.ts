// 小2算数「はこの形」の単元模試 (B: めん・へん・頂点の プール ＋ A: ひごと粘土玉の数を数える生成型)。問題はすべてオリジナル。
// はこの形は めん 6・へん 12・頂点 8。へんは 3つの長さが 4本ずつ (2つが同じ長さなら 8本、さいころの形は 12本)。
// A は たて・よこ・高さを rng で決め、ひごの本数・長さの合計は calc (4×長さ の和) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-hako";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_3 = L(1, "はこの形の 3つの ところ");
const B_KAZU = L(2, "数を かぞえて みよう");
const B_MEN = L(3, "めんの 形を しらべる");
const B_HIGO = L(4, "ひごと 粘土玉《ねんどだま》で 作る");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });

const b1 = (id: string, prompt: string, options: string[], why: string[], body: string, back: { label: string; href: string }, point: string): QuestionB => ({
  id,
  type: "B",
  difficulty: 1,
  points: 12,
  seconds: 40,
  skill: "知識・技能",
  prompt,
  answer: { kind: "choice", options, correct: 0, why },
  point,
  steps: [{ title: "はこの形", body, back: [back] }],
});
const b2 = (id: string, prompt: string, options: string[], why: string[], body: string, point: string): QuestionB => ({
  id,
  type: "B",
  difficulty: 2,
  points: 15,
  seconds: 60,
  skill: "思考・判断・表現",
  prompt,
  answer: { kind: "choice", options, correct: 0, why },
  point,
  steps: [{ title: "めんの 形", body, back: [B_MEN] }],
});

function honsu(r: Rng): QuestionBody {
  const kind = r.int(0, 2); // 0: 3つとも ちがう 1: 2つが 同じ 2: さいころ
  const a = r.int(3, 9);
  let b = r.int(3, 9);
  let c = r.int(3, 9);
  if (kind === 0) {
    while (b === a) b = r.int(3, 9);
    while (c === a || c === b) c = r.int(3, 9);
  } else if (kind === 1) {
    b = a;
    while (c === a) c = r.int(3, 9);
  } else {
    b = a;
    c = a;
  }
  const ans = kind === 0 ? 4 : kind === 1 ? 8 : 12;
  const ask = a;
  const desc = kind === 2 ? `どの へんも ${a}cmの さいころの 形` : `たて ${a}cm、よこ ${b}cm、高さ ${c}cmの はこの形`;
  return {
    prompt: `ひごと 粘土玉《ねんどだま》で、${desc}を 作ります。${ask}cmの ひごは 何本 いりますか。`,
    answer: num(ans, kind === 0 ? "12/3" : kind === 1 ? "4+4" : "12", "本"),
    point: "同じ 長さの へんは 4本ずつ ある",
    steps: [
      { title: "へんは 12本", body: "はこの形の へんは 12本。たて・よこ・高さの 長さが 4本ずつ あります。", back: [B_KAZU] },
      { title: `${ask}cmの へん`, body: kind === 0 ? `${a}cmは たてだけ。たての へんは {{4本}}。` : kind === 1 ? `${a}cmは たてと よこ。4本ずつで 4＋4＝{{8本}}。` : "さいころの 形は、12本 ぜんぶ 同じ 長さ。{{12本}} です。", ...(kind === 0 ? { trap: "12本 ぜんぶが 同じ 長さでは ありません。" } : {}), back: [B_HIGO] },
    ],
  };
}

function nendo(r: Rng): QuestionBody {
  const k = r.int(2, 6);
  const higo = r.bool();
  const shape = r.pick(["はこの形", "さいころの 形"]);
  return higo
    ? {
        prompt: `ひごと 粘土玉《ねんどだま》で ${shape}を ${k}こ 作ります。ひごは ぜんぶで 何本 いりますか。`,
        answer: num(12 * k, `12*${k}`, "本"),
        point: "1こに へんは 12本",
        steps: [{ title: "1こ分 × いくつ分", body: `1こに へんは 12本。${k}こ分で 12×${k}＝{{${12 * k}}}本です。`, back: [B_KAZU] }],
      }
    : {
        prompt: `ひごと 粘土玉《ねんどだま》で ${shape}を ${k}こ 作ります。粘土玉《ねんどだま》は ぜんぶで 何こ いりますか。`,
        answer: num(8 * k, `8*${k}`, "こ"),
        point: "1こに 頂点《ちょうてん》は 8つ",
        steps: [{ title: "頂点《ちょうてん》は 8つ", body: `粘土玉《ねんどだま》は 頂点《ちょうてん》に つかいます。1こに 8つ、${k}こ分で 8×${k}＝{{${8 * k}}}こです。`, trap: "見える 頂点《ちょうてん》だけ 数えない。上に 4つ、下に 4つで 8つです。", back: [B_HIGO] }],
      };
}

function goukei(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  let b = r.int(2, 9);
  while (b === a) b = r.int(2, 9);
  let c = r.int(2, 9);
  while (c === a || c === b) c = r.int(2, 9);
  const s = 4 * (a + b + c);
  return {
    prompt: `たて ${a}cm、よこ ${b}cm、高さ ${c}cmの はこの形を ひごで 作ります。ひごの 長さを ぜんぶ あわせると 何cmですか。`,
    answer: num(s, `4*${a}+4*${b}+4*${c}`, "cm"),
    point: "3つの 長さが 4本ずつ",
    steps: [
      { title: "長さごとの 本数", body: `${a}cm・${b}cm・${c}cmの ひごが 4本ずつ いります。`, back: [B_HIGO] },
      { title: "長さを 出す", body: `${a}×4＝${4 * a}、${b}×4＝${4 * b}、${c}×4＝${4 * c}。`, back: [B_KAZU] },
      { title: "あわせる", body: `${4 * a}＋${4 * b}＋${4 * c}＝{{${s}}}。${s}cmです。`, trap: `${a}＋${b}＋${c}＝${a + b + c} で 止めない。へんは 12本 あります。` },
    ],
  };
}

export const E_MATH_2_HAKO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "めん・へん・頂点《ちょうてん》",
      lead: "あてはまる ものを えらびなさい。",
      style: "mix",
      pick: 3,
      questions: [
        b1("men-kazu", "はこの形には、めんが いくつ ありますか。", ["6つ", "4つ", "5つ", "8つ"], ["上下・前うしろ・左右で 6つです。", "見える めんだけ 数えて います。", "下の めんを わすれて います。", "8つは 頂点《ちょうてん》の 数です。"], "めんは 上下・前うしろ・左右で {{6つ}}。", B_KAZU, "めんは 6つ"),
        b1("hen-kazu", "はこの形には、へんが 何本 ありますか。", ["12本", "8本", "6本", "4本"], ["上に 4本、下に 4本、たてに 4本で 12本です。", "8は 頂点《ちょうてん》の 数です。", "6は めんの 数です。", "4本は 1つの めんの まわりの へんだけです。"], "へんは 上 4本・下 4本・たて 4本で {{12本}}。", B_KAZU, "へんは 12本"),
        b1("chouten-kazu", "はこの形には、頂点《ちょうてん》が いくつ ありますか。", ["8つ", "4つ", "6つ", "12こ"], ["上に 4つ、下に 4つで 8つです。", "上の かどだけ 数えて います。下にも あります。", "6は めんの 数です。", "12は へんの 数です。"], "頂点《ちょうてん》は 上に 4つ、下に 4つで {{8つ}}。", B_KAZU, "頂点《ちょうてん》は 8つ"),
        b1("men-namae", "はこの形の、たいらな ところを 何と いいますか。", ["めん", "へん", "頂点《ちょうてん》"], ["たいらな ところが めんです。", "へんは めんの まわりの 線です。", "頂点《ちょうてん》は へんが あつまる かどです。"], "たいらな ところを {{めん}} と いいます。", B_3, "たいらな ところは めん"),
        b1("hen-namae", "めんの まわりの 線を 何と いいますか。", ["へん", "めん", "頂点《ちょうてん》"], ["めんの まわりの 線が へんです。", "めんは たいらな ところです。", "頂点《ちょうてん》は かどの 点です。"], "めんの まわりの 線を {{へん}} と いいます。", B_3, "まわりの 線は へん"),
        b1("chouten-namae", "へんが 3本 あつまって いる かどを 何と いいますか。", ["頂点《ちょうてん》", "へん", "めん"], ["へんが 3本 あつまる かどが 頂点《ちょうてん》です。", "へんは 線です。かどでは ありません。", "めんは たいらな ところです。"], "へんが 3本 あつまる かどを {{頂点《ちょうてん》}} と いいます。", B_3, "かどは 頂点《ちょうてん》"),
      ],
    },
    {
      title: "めんの 形",
      lead: "あてはまる ものを えらびなさい。",
      style: "mix",
      pick: 1,
      questions: [
        b2("mukai", "はこの形で、むかい合って いる 2つの めんは どう なって いますか。", ["同じ 形で、同じ 大きさ", "形は 同じで、大きさが ちがう", "形も 大きさも ちがう"], ["むかい合う めんは、同じ 形で 同じ 大きさです。", "むかい合う めんは、大きさも 同じです。", "むかい合う めんは、形も 大きさも 同じです。"], "むかい合う めんは、{{同じ 形で 同じ 大きさ}}です。", "むかい合う めんは 同じ"),
        b2("saikoro", "さいころの 形の めんは、どんな 形ですか。", ["6つ ぜんぶ 正方形", "6つ ぜんぶ 長方形で、正方形は ない", "正方形と 三角形"], ["さいころの 形は、6つの めんが ぜんぶ 正方形です。", "さいころの 形の めんは、へんの 長さが みんな 同じ 正方形です。", "はこの形の めんに、三角形は ありません。"], "さいころの 形は、6つの めんが {{ぜんぶ 正方形}}です。", "さいころの 形は 正方形 6つ"),
        b2("utsusu", "はこの形の めんを 紙に うつしとると、どんな 形が できますか。", ["長方形や 正方形", "まるや 三角形", "まるだけ"], ["はこの形の めんは、長方形や 正方形です。", "はこの形の めんに、まるや 三角形は ありません。", "まるは つつの 形の めんです。"], "はこの形の めんを うつすと、{{長方形}}や {{正方形}}が できます。", "めんは 長方形・正方形"),
      ],
    },
    {
      title: "ひごと 粘土玉《ねんどだま》で 作る",
      lead: "つぎの もんだいに 答えなさい。",
      style: "word",
      questions: [
        { id: "honsu", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: honsu },
        { id: "nendo", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: nendo },
        { id: "goukei", type: "A", difficulty: 3, points: 19, seconds: 150, skill: "思考・判断・表現", generate: goukei },
      ],
    },
  ],
};
