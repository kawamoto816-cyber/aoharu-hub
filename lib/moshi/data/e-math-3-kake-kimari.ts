// 小3算数「かけ算のきまり」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: □に入る数は calc (かけ算・ひき算・わり算) で確かめる。式が正しいことは、答えを入れた両辺を計算して確かめている (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-kake-kimari";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_FUERU = L(1, "かける数が1ふえると、答えはかけられる数だけふえる");
const B_IREKAE = L(2, "入れかえても、答えは同じ");
const B_10_0 = L(3, "10のかけ算と、0のかけ算");
const B_WAKERU = L(4, "かけられる数を分けて計算する");

function fueru(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const b = r.int(3, 9);
  const plus = r.bool();
  return {
    prompt: plus ? `${a}×${b} は、${a}×${b - 1} より いくつ大きいですか。` : `${a}×${b} は、${a}×${b + 1} より いくつ小さいですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], calc: plus ? `${a}*${b}-${a}*${b - 1}` : `${a}*${b + 1}-${a}*${b}` },
    point: "かける数が1ちがうと、答えはかけられる数だけちがう",
    steps: [{ title: `${a}のまとまり1つ分`, body: `かける数が1ちがうと、${a}のまとまりが1つちがうので、答えは{{${a}}}ちがいます。`, back: [B_FUERU] }],
  };
}

function irekae(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  let b = r.int(2, 9);
  if (a === b) b = a === 9 ? 3 : a + 1;
  return {
    prompt: `□にあてはまる数を答えなさい。　${a}×${b}＝${b}×□`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], calc: `${a}*${b}/${b}` },
    point: "かけられる数とかける数を入れかえても、答えは同じ",
    steps: [{ title: "入れかえのきまり", body: `${a}×${b} と ${b}×${a} はどちらも${a * b}。□は{{${a}}}です。`, back: [B_IREKAE] }],
  };
}

function juZero(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const k = r.int(0, 2);
  if (k === 0)
    return {
      prompt: `${a}×10 を計算しなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(a * 10)], calc: `${a}*10` },
      point: "□×10 は □×9 より□大きい",
      steps: [{ title: "×9から考える", body: `${a}×9＝${a * 9}。${a}×10 はそれより${a}大きいので {{${a * 10}}} です。`, back: [B_10_0] }],
    };
  return {
    prompt: k === 1 ? `${a}×0 を計算しなさい。` : `0×${a} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: ["0"], calc: k === 1 ? `${a}*0` : `0*${a}` },
    point: "0にどんな数をかけても、どんな数に0をかけても0",
    steps: [{ title: "0のかけ算", body: k === 1 ? `${a}が0こ分なので、{{0}}です。` : `0点のところに${a}こ入っても、0×${a}＝{{0}}（点）です。`, back: [B_10_0] }],
  };
}

function wakeru(r: Rng): QuestionBody {
  const o = r.int(1, 9);
  const b = r.int(3, 9);
  const a = 10 + o;
  return {
    prompt: `${a}×${b} を、${a}を10と${o}に分けて計算しなさい。答えはいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], calc: `10*${b}+${o}*${b}` },
    point: "九九にない数は、分けてかけて、あとでたす",
    steps: [{ title: "分けてかける", body: `10×${b}＝${10 * b}、${o}×${b}＝${o * b}。あわせて {{${a * b}}} です。`, back: [B_WAKERU] }],
  };
}

function bunkai(r: Rng): QuestionBody {
  const a = r.int(3, 9);
  const b = r.int(5, 9);
  const c = r.int(2, b - 2);
  return {
    prompt: `□にあてはまる数を答えなさい。　${a}×${b}＝${a}×${c}＋${a}×□`,
    answer: { kind: "num", answerKind: "num", answer: [String(b - c)], calc: `(${a}*${b}-${a}*${c})/${a}` },
    point: "かける数を分けても、あわせると同じ",
    steps: [{ title: "かける数を分ける", body: `${b}は${c}と{{${b - c}}}に分けられます。${a}×${c}＝${a * c}、${a}×${b - c}＝${a * (b - c)}、あわせて${a * b}になります。`, back: [B_WAKERU, B_FUERU] }],
  };
}

function matoate(r: Rng): QuestionBody {
  const pts = [0, r.pick([2, 3, 5]), 10];
  const n = [r.int(1, 4), r.int(2, 6), r.int(1, 3)];
  const who = r.pick(["あおいさん", "そうたさん", "りんさん"]);
  const total = pts[0] * n[0] + pts[1] * n[1] + pts[2] * n[2];
  return {
    prompt: `${who}は、まと当てで玉を${n[0] + n[1] + n[2]}こ投げました。0点に${n[0]}こ、${pts[1]}点に${n[1]}こ、10点に${n[2]}こ入りました。とく点は全部で何点ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(total)], unit: "点", calc: `0*${n[0]}+${pts[1]}*${n[1]}+10*${n[2]}` },
    point: "点数×入ったこ数を、それぞれ出してたす",
    steps: [
      { title: "それぞれのとく点", body: `0点は 0×${n[0]}＝0、${pts[1]}点は ${pts[1]}×${n[1]}＝${pts[1] * n[1]}、10点は 10×${n[2]}＝${10 * n[2]}（点）です。`, back: [B_10_0] },
      { title: "たす", body: `0＋${pts[1] * n[1]}＋${10 * n[2]}＝{{${total}}}（点）。`, trap: "0点のところに入った玉も、0×□＝0 として数えます。" },
    ],
  };
}

export const E_MATH_3_KAKE_KIMARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "かけ算のきまり",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "fueru", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: fueru },
        { id: "irekae", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: irekae },
        { id: "ju-zero", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: juZero },
        { id: "wakeru", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: wakeru },
        { id: "bunkai", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: bunkai },
      ],
    },
    {
      title: "まと当てのとく点",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "matoate", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: matoate }],
    },
  ],
};
