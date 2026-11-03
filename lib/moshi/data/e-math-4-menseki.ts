// 小4算数「面積」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 長さは整数で決め、面積＝たて×横。単位は 1m²＝10000cm²、1a＝100m²、1ha＝10000m²。答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-menseki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_1CM = L(1, "広さを「1cm²のいくつ分」で表す");
const B_KOUSHIKI = L(2, "長方形の面積＝たて×横");
const B_WAKERU = L(3, "形を分けるか、大きな長方形からひく");
const B_TANI = L(4, "大きな面積の単位：m²・a・ha・km²");
const B_SOROE = L(5, "長さの単位をそろえてから計算");

function chouhou(r: Rng): QuestionBody {
  const a = r.int(3, 15);
  const b = r.int(4, 20);
  return {
    prompt: `たて${a}cm、横${b}cmの長方形の面積は何cm²ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], unit: "cm²", calc: `${a}*${b}` },
    point: "長方形の面積＝たて×横",
    steps: [{ title: "1cm²がいくつ分", body: `1cm²の正方形が横に${b}こずつ${a}列ならびます。${a}×${b}＝{{${a * b}}}（cm²）。`, back: [B_1CM, B_KOUSHIKI] }],
  };
}

function seihou(r: Rng): QuestionBody {
  const a = r.int(3, 25);
  const u = r.pick(["cm", "m"]);
  return {
    prompt: `1辺が${a}${u}の正方形の面積は何${u}²ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * a)], unit: `${u}²`, calc: `${a}*${a}` },
    point: "正方形の面積＝1辺×1辺",
    steps: [{ title: "1辺×1辺", body: `${a}×${a}＝{{${a * a}}}（${u}²）。`, trap: `${a}×4 はまわりの長さです。`, back: [B_KOUSHIKI] }],
  };
}

function yoko(r: Rng): QuestionBody {
  const a = r.int(4, 12);
  const b = r.int(5, 18);
  const what = r.pick(["長方形の花だん", "長方形のしき物", "長方形の紙"]);
  const u = what === "長方形の紙" ? "cm" : "m";
  return {
    prompt: `面積が${a * b}${u}²で、たてが${a}${u}の${what}があります。横は何${u}ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(b)], unit: u, calc: `${a * b}/${a}` },
    point: "横＝面積÷たて",
    steps: [{ title: "わり算でもどす", body: `たて×横＝面積 なので、横＝${a * b}÷${a}＝{{${b}}}（${u}）。`, back: [B_KOUSHIKI] }],
  };
}

function ljiS(r: Rng): QuestionBody {
  const A = r.int(8, 14); // 全体のたて
  const B = r.int(9, 16); // 全体の横
  const c = r.int(3, A - 3); // 切りとるたて
  const d = r.int(3, B - 3); // 切りとる横
  const s = A * B - c * d;
  return {
    prompt: `たて${A}cm、横${B}cmの長方形の、右上のかどから、たて${c}cm、横${d}cmの長方形を切りとりました。のこったL字の形の面積は何cm²ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(s)], unit: "cm²", calc: `${A}*${B}-${c}*${d}` },
    point: "大きな長方形から、ない部分をひく",
    steps: [
      { title: "大きな長方形", body: `${A}×${B}＝${A * B}（cm²）。`, back: [B_WAKERU] },
      { title: "ない部分をひく", body: `${c}×${d}＝${c * d}、${A * B}−${c * d}＝{{${s}}}（cm²）。2つの長方形に分けて ${A - c}×${B}＋${c}×${B - d} としても同じです。` },
    ],
  };
}

function soroe(r: Rng): QuestionBody {
  const m = r.int(1, 4);
  const c = r.step(20, 90, 10);
  return {
    prompt: `たて${m}m、横${c}cmの長方形の面積は何cm²ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(m * 100 * c)], unit: "cm²", calc: `${m}*100*${c}` },
    point: "長さの単位をそろえてからかける",
    steps: [
      { title: "cm にそろえる", body: `${m}m＝${m * 100}cm です。`, back: [B_SOROE] },
      { title: "かける", body: `${m * 100}×${c}＝{{${m * 100 * c}}}（cm²）。`, trap: `${m}×${c}＝${m * c} としない。単位がちがうままかけてはいけません。` },
    ],
  };
}

function aru(r: Rng): QuestionBody {
  const kind = r.bool();
  if (kind) {
    const a = r.step(10, 60, 10);
    const b = r.step(20, 90, 10);
    return {
      prompt: `たて${a}m、横${b}mの長方形の畑《はたけ》があります。この畑《はたけ》の面積は何aですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String((a * b) / 100)], unit: "a", calc: `${a}*${b}/100` },
      point: "1a は 1辺10mの正方形の面積で 100m²",
      steps: [
        { title: "m² で出す", body: `${a}×${b}＝${a * b}（m²）。`, back: [B_KOUSHIKI] },
        { title: "a に直す", body: `1a＝100m² なので、${a * b}÷100＝{{${(a * b) / 100}}}（a）。`, back: [B_TANI] },
      ],
    };
  }
  const a = r.step(100, 500, 100);
  const b = r.step(100, 600, 100);
  return {
    prompt: `たて${a}m、横${b}mの長方形の土地があります。この土地の面積は何haですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String((a * b) / 10000)], unit: "ha", calc: `${a}*${b}/10000` },
    point: "1ha は 1辺100mの正方形の面積で 10000m²",
    steps: [
      { title: "m² で出す", body: `${a}×${b}＝${a * b}（m²）。`, back: [B_KOUSHIKI] },
      { title: "ha に直す", body: `1ha＝10000m² なので、${a * b}÷10000＝{{${(a * b) / 10000}}}（ha）。たて・横を100mのいくつ分と見て ${a / 100}×${b / 100} としても出せます。`, back: [B_TANI] },
    ],
  };
}

export const E_MATH_4_MENSEKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: "長方形と正方形の面積",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "chouhou", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: chouhou },
        { id: "seihou", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: seihou },
        { id: "yoko", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: yoko },
      ],
    },
    {
      title: "いろいろな形と面積の単位",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "l-ji", type: "A", difficulty: 2, points: 18, seconds: 120, skill: "思考・判断・表現", generate: ljiS },
        { id: "soroe", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: soroe },
        { id: "aru", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: aru },
      ],
    },
  ],
};
