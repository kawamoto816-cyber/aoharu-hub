// 小4算数「垂直・平行と四角形」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 平行な直線はほかの直線と同じ角度で交わる・一直線は180°・平行四辺形は向かい合う辺と角が等しい・ひし形は4辺が等しい、を使って数を作る。答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-suichoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_SUI = L(1, "垂直《すいちょく》：直角に交わる2本の直線");
const B_HEI = L(2, "平行：同じ直線に 垂直《すいちょく》な2本の直線");
const B_NAKAMA = L(3, "平行な辺の組で、四角形をなかま分け");
const B_SEISHITSU = L(4, "平行四辺形とひし形の性質《せいしつ》");

const SUI = "垂直《すいちょく》";

function douikaku(r: Rng): QuestionBody {
  const a = r.int(35, 145);
  if (a === 90) return douikaku(r);
  return {
    prompt: `平行な2本の直線ア・イに、1本の直線ウが交わっています。ウとアが交わってできる角の1つが${a}°のとき、ウとイが交わってできる、同じ向きの角は何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], unit: "°", calc: `${a}` },
    point: "平行な直線は、ほかの直線と同じ角度で交わる",
    steps: [{ title: "平行の性質《せいしつ》", body: `平行な2本の直線は、ほかの直線と同じ角度で交わります。だから{{${a}°}}です。`, back: [B_HEI] }],
  };
}

function shuui(r: Rng): QuestionBody {
  const a = r.int(4, 15);
  let b = r.int(3, 14);
  if (b === a) b = a + 1;
  return {
    prompt: `となり合う2つの辺の長さが${a}cmと${b}cmの平行四辺形があります。まわりの長さは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(2 * (a + b))], unit: "cm", calc: `(${a}+${b})*2` },
    point: "平行四辺形は、向かい合った辺の長さが等しい",
    steps: [{ title: "同じ長さが2本ずつ", body: `向かい合った辺が等しいので、(${a}＋${b})×2＝{{${2 * (a + b)}}}（cm）。`, back: [B_SEISHITSU] }],
  };
}

function mukaiKaku(r: Rng): QuestionBody {
  const a = r.int(40, 140);
  if (a === 90) return mukaiKaku(r);
  return {
    prompt: `平行四辺形ABCDで、角Aの大きさは${a}°です。角Aと向かい合った角Cの大きさは何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], unit: "°", calc: `${a}` },
    point: "平行四辺形は、向かい合った角の大きさが等しい",
    steps: [{ title: "向かい合った角", body: `平行四辺形の向かい合った角は等しいので、角Cも{{${a}°}}です。`, back: [B_SEISHITSU] }],
  };
}

function hishigata(r: Rng): QuestionBody {
  const a = r.int(3, 20);
  return {
    prompt: `まわりの長さが${4 * a}cmのひし形があります。1つの辺の長さは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], unit: "cm", calc: `${4 * a}/4` },
    point: "ひし形は4つの辺がみな等しい",
    steps: [{ title: "4でわる", body: `${4 * a}÷4＝{{${a}}}（cm）。`, back: [B_NAKAMA, B_SEISHITSU] }],
  };
}

function nakamawake(r: Rng): QuestionBody {
  const kind = r.int(0, 3);
  const a = r.int(3, 9);
  const b = r.int(a + 1, 12);
  const desc = [
    `向かい合った1組の辺だけが平行で、辺の長さは ${a}cm、${b}cm、${a}cm、${b + 2}cm`,
    `向かい合った2組の辺がどちらも平行で、辺の長さは ${a}cm、${b}cm、${a}cm、${b}cm、角は直角ではない`,
    `向かい合った2組の辺がどちらも平行で、4つの辺はみな${a}cm、角は直角ではない`,
    `4つの角がみな直角で、辺の長さは ${a}cm、${b}cm、${a}cm、${b}cm`,
  ][kind];
  const opts = ["台形", "平行四辺形", "ひし形", "長方形"];
  return {
    prompt: `次のような四角形があります。${desc}。この四角形の名前として、一番合うものはどれですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct: kind,
      why: [
        kind === 0 ? "向かい合った辺が1組だけ平行なので台形です。" : "台形は、平行な辺が1組だけの四角形です。",
        kind === 1 ? "2組とも平行で、4つの辺が等しくなく、角も直角とはかぎらないので平行四辺形です。" : kind === 0 ? "平行な組が1組だけなので、平行四辺形ではありません。" : "平行四辺形のなかまですが、もっと合う名前があります。",
        kind === 2 ? "2組とも平行で、4つの辺がみな等しいのでひし形です。" : "ひし形は、4つの辺がみな等しい四角形です。",
        kind === 3 ? "4つの角がみな直角なので長方形です。" : "長方形は、4つの角がみな直角な四角形です。",
      ],
    },
    point: "平行な辺の組の数、辺の長さ、角を見る",
    steps: [{ title: "平行な組と辺の長さ", body: `平行な辺が1組→台形、2組→平行四辺形、さらに4辺が等しい→ひし形。答えは{{${opts[kind]}}}。`, back: [B_NAKAMA, B_SUI] }],
  };
}

function tonari(r: Rng): QuestionBody {
  const a = r.int(40, 140);
  if (a === 90) return tonari(r);
  const shape = r.pick(["平行四辺形", "ひし形"]);
  return {
    prompt: `${shape}ABCDで、角Aの大きさは${a}°です。角Aのとなりの角Bの大きさは何度ですか。（辺DAをAの先へのばした直線を考えるとよい。）`,
    answer: { kind: "num", answerKind: "num", answer: [String(180 - a)], unit: "°", calc: `180-${a}` },
    point: "平行な辺と、一直線の180°を使う",
    steps: [
      { title: "平行な直線の角", body: `辺ADと辺BCは平行です。辺DAをAの先へのばすと、直線ABとの間にできる角は、角Bと同じ大きさです（平行な直線は、ほかの直線と同じ角度で交わる）。`, back: [B_HEI] },
      { title: "一直線は180°", body: `その角と角Aを合わせると一直線で180°。だから角B＝180−${a}＝{{${180 - a}}}（°）。`, trap: `向かい合った角Cとまちがえて${a}°としないようにします。`, back: [B_SEISHITSU] },
    ],
  };
}

export const E_MATH_4_SUICHOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: `${SUI}・平行と四角形の性質《せいしつ》`,
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "douikaku", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: douikaku },
        { id: "shuui", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: shuui },
        { id: "mukai-kaku", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: mukaiKaku },
        { id: "hishigata", type: "A", difficulty: 2, points: 18, seconds: 60, skill: "知識・技能", generate: hishigata },
      ],
    },
    {
      title: "四角形を見分ける・角を求める",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "nakamawake", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: nakamawake },
        { id: "tonari", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: tonari },
      ],
    },
  ],
};
