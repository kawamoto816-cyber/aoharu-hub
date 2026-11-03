// 小2算数「分数（2分の1・4分の1）」の単元模試 (A: 数値を入れかえる生成型 ＋ B: 分数の いみの プール)。問題はすべてオリジナル。
// A は もとの数を 2・4 で わりきれる数にして作り、num は calc (÷2・÷4・×2) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 小2 では わり算を 習わないので、解き方は「同じ数ずつ 分ける」「2つ分・4つ分」で説明する。
import type { NumQ, QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-bunsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_2 = L(1, "2分の1は、半分の こと");
const B_4 = L(2, "4分の1は、4つに 分けた 1つ分");
const B_ONAJI = L(3, "同じ 大きさで ないと、分数では ない");
const B_KAZU = L(4, "数の 2分の1・4分の1");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });

function ni(r: Rng): QuestionBody {
  const k = r.int(2, 12);
  const n = 2 * k;
  const f = r.pick(["おはじき", "あめ", "クッキー"]);
  return {
    prompt: `${f} ${n}この 2分の1は 何こですか。`,
    answer: num(k, `${n}/2`, "こ"),
    point: "2分の1は、同じ 数ずつ 2つに 分けた 1つ分",
    steps: [{ title: "同じ 数ずつ 2つに 分ける", body: `${n}こを 同じ 数ずつ 2つに 分けると、1つ分は ${k}こ（${k}＋${k}＝${n}）。{{${k}こ}} です。`, back: [B_KAZU] }],
  };
}

function yon(r: Rng): QuestionBody {
  const k = r.int(2, 6);
  const n = 4 * k;
  const f = r.pick(["おはじき", "どんぐり", "ビー玉"]);
  return {
    prompt: `${f} ${n}この 4分の1は 何こですか。`,
    answer: num(k, `${n}/4`, "こ"),
    point: "4分の1は、同じ 数ずつ 4つに 分けた 1つ分",
    steps: [{ title: "同じ 数ずつ 4つに 分ける", body: `${n}こを 同じ 数ずつ 4つに 分けると、1つ分は ${k}こ（${k}×4＝${n}）。{{${k}こ}} です。`, back: [B_KAZU] }],
  };
}

function tape(r: Rng): QuestionBody {
  const four = r.bool();
  const k = four ? r.int(2, 9) : r.int(3, 20);
  const n = (four ? 4 : 2) * k;
  return {
    prompt: `${n}cmの テープを 同じ 長さに おって、${four ? "4分の1" : "2分の1"}の 長さを 作ります。何cmに なりますか。`,
    answer: num(k, `${n}/${four ? 4 : 2}`, "cm"),
    point: four ? "4つに おった 1つ分" : "半分に おった 1つ分",
    steps: [{ title: four ? "4つに 分ける" : "半分に する", body: four ? `半分に おって、もう 一ど 半分に おると 4つに 分かれます。${n}cmの 4つに 分けた 1つ分は {{${k}cm}}（${k}×4＝${n}）。` : `半分に おると、${k}cmと ${k}cm。{{${k}cm}} です。`, back: [four ? B_4 : B_2] }],
  };
}

function moto(r: Rng): QuestionBody {
  const four = r.bool();
  const k = four ? r.int(2, 6) : r.int(3, 12);
  const n = (four ? 4 : 2) * k;
  return {
    prompt: `ある 数の ${four ? "4分の1" : "2分の1"}は ${k}こです。もとの 数は 何こですか。`,
    answer: num(n, `${k}*${four ? 4 : 2}`, "こ"),
    point: four ? "もとの 数は、4分の1の 4つ分" : "もとの 数は、2分の1の 2つ分",
    steps: [{ title: four ? "4つ分に もどす" : "2つ分に もどす", body: four ? `4分の1が ${k}こなので、もとは ${k}の 4つ分。${k}×4＝{{${n}}}こ。` : `2分の1が ${k}こなので、もとは ${k}の 2つ分。${k}＋${k}＝{{${n}}}こ。`, trap: `${k}を そのまま 答えに しない。`, back: [four ? B_4 : B_2] }],
  };
}

function chigai(r: Rng): QuestionBody {
  const k = r.int(2, 6);
  const n = 4 * k;
  const f = r.pick(["おはじき", "あめ", "どんぐり"]);
  return {
    prompt: `${f} ${n}この 2分の1は、${n}この 4分の1より 何こ 多いですか。`,
    answer: num(n / 2 - n / 4, `${n}/2-${n}/4`, "こ"),
    point: "たくさんに 分けるほど、1つ分は 小さく なる",
    steps: [
      { title: "それぞれ 出す", body: `${n}この 2分の1は ${n / 2}こ、4分の1は ${n / 4}こ。`, back: [B_KAZU] },
      { title: "ちがい", body: `${n / 2}−${n / 4}＝{{${n / 4}}}。2分の1の ほうが ${n / 4}こ 多い。`, trap: "4の ほうが 大きい 数だから 4分の1が 大きい、と しない。", back: [B_4] },
    ],
  };
}

const imi = (id: string, prompt: string, options: string[], why: string[], body: string, back: { label: string; href: string }, point: string): QuestionB => ({
  id,
  type: "B",
  difficulty: 2,
  points: 15,
  seconds: 60,
  skill: "思考・判断・表現",
  prompt,
  answer: { kind: "choice", options, correct: 0, why },
  point,
  steps: [{ title: "分数の いみ", body, back: [back] }],
});

export const E_MATH_2_BUNSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "数の 2分の1・4分の1",
      lead: "つぎの もんだいに 答えなさい。",
      style: "calc",
      questions: [
        { id: "ni", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: ni },
        { id: "yon", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: yon },
        { id: "tape", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: tape },
      ],
    },
    {
      title: "分数の いみ",
      lead: "あてはまる ものを えらびなさい。",
      style: "mix",
      pick: 2,
      questions: [
        imi(
          "onaji",
          "2分の1に なって いるのは どれですか。",
          ["ピザを、ぴったり かさなる 2つに 切った 1つ分", "ピザを、大きい ほうと 小さい ほうの 2つに 切った 小さい ほう", "ピザを 3つに 切った 1つ分"],
          ["同じ 大きさに 2つに 分けた 1つ分なので 2分の1です。", "大きさが ちがう 分け方は 2分の1と いえません。", "3つに 分けた 1つ分は 2分の1では ありません。"],
          "2分の1は、{{同じ 大きさに}} 2つに 分けた 1つ分です。",
          B_ONAJI,
          "同じ 大きさに 分けた ときだけ 分数",
        ),
        imi(
          "okisa",
          "同じ 長さの テープの 2分の1と 4分の1では、どちらが 長いですか。",
          ["2分の1", "4分の1", "同じ 長さ"],
          ["2つに 分けた 1つ分の ほうが、4つに 分けた 1つ分より 長いです。", "4つに 分けると、1つ分は 2分の1より みじかく なります。", "分ける 数が ちがうので、1つ分の 長さも ちがいます。"],
          "たくさんに 分けるほど、1つ分は {{小さく}} なります。",
          B_4,
          "4分の1は 2分の1より 小さい",
        ),
        imi(
          "futatsu",
          "4分の1を 2つ 合わせると、どれと 同じ 大きさですか。",
          ["2分の1", "4分の1", "もとの 大きさ"],
          ["4つに 分けた うちの 2つ分は、半分と 同じです。", "合わせると、4分の1より 大きく なります。", "もとの 大きさに なるのは、4分の1を 4つ 合わせた ときです。"],
          "4分の1を {{2つ}} 合わせると、2分の1と 同じ 大きさです。",
          B_4,
          "4分の1の 2つ分は 2分の1",
        ),
        imi(
          "naname",
          "正方形の 紙を、ななめに おって ぴったり かさなる 2つの 三角形に 分けました。1つ分の 三角形は どう いえますか。",
          ["もとの 紙の 2分の1", "形が かわったので 分数では ない", "もとの 紙の 4分の1"],
          ["ぴったり かさなる 2つに 分けたので、形が かわっても 2分の1です。", "形が ちがっても、同じ 大きさに 2つに 分けて いれば 2分の1です。", "4つでは なく、2つに 分けて います。"],
          "{{ぴったり かさなる}} 2つに 分けて いれば、形が かわっても 2分の1です。",
          B_ONAJI,
          "形では なく、同じ 大きさかどうかで 見る",
        ),
        imi(
          "moto",
          "テープの 2分の1の 長さを 2つ分 あわせると、どう なりますか。",
          ["もとの テープの 長さに なる", "もとの テープの 4分の1に なる", "もとの テープより 長く なる"],
          ["2分の1の 2つ分が もとの 長さです。", "4分の1は、2分の1より もっと みじかい 長さです。", "2分の1の 2つ分で、ちょうど もとの 長さです。"],
          "もとの 長さは、{{2分の1の 2つ分}}です。",
          B_2,
          "もとの 大きさは 2分の1の 2つ分",
        ),
      ],
    },
    {
      title: "もとの 数と くらべる",
      lead: "つぎの もんだいに 答えなさい。",
      style: "word",
      questions: [
        { id: "moto-kazu", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: moto },
        { id: "chigai", type: "A", difficulty: 3, points: 19, seconds: 120, skill: "思考・判断・表現", generate: chigai },
      ],
    },
  ],
};
