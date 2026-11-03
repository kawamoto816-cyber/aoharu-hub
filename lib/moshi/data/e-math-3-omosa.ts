// 小3算数「重さ（g・kg）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 重さはすべて g で持ち、1kg＝1000g で直す。答えは calc (たし算・ひき算・かけ算) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-omosa";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_TANI = L(1, "重さの単位《たんい》 g・kg・t");
const B_MEMORI = L(2, "はかりの目もりを読む");
const B_KG = L(3, "1kg300gは何g？");
const B_KEISAN = L(4, "重さのたし算・ひき算");

/** g → 「1kg300g」 */
const K = (g: number) => {
  const k = Math.floor(g / 1000);
  const r = g % 1000;
  return k === 0 ? `${r}g` : r === 0 ? `${k}kg` : `${k}kg${r}g`;
};

function toG(r: Rng): QuestionBody {
  const k = r.int(1, 6);
  const g = r.pick([r.int(1, 9) * 10, r.int(1, 9) * 100, r.int(11, 99) * 10, r.int(1, 9) * 5]);
  return {
    prompt: `${k}kg${g}g は何gですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(k * 1000 + g)], unit: "g", calc: `${k}*1000+${g}` },
    point: "1kg＝1000g",
    steps: [{ title: "kg を g に", body: `${k}kg＝${k * 1000}g。${k * 1000}＋${g}＝{{${k * 1000 + g}}}（g）です。`, trap: g < 100 ? `${k}${g}g のようにならべないようにします。` : undefined, back: [B_KG] }],
  };
}

function toKg(r: Rng): QuestionBody {
  const k = r.int(1, 5);
  const g = r.pick([r.int(1, 9) * 10, r.int(1, 9) * 100, r.int(11, 99) * 10]);
  const x = k * 1000 + g;
  const right = K(x);
  const ws = [...new Set([`${k}kg${g / 10}g`, `${k + 1}kg${g}g`, `${x}kg`, `${k * 10}kg${g}g`])].filter((w) => w !== right).slice(0, 3);
  const options = r.shuffle([right, ...ws]);
  return {
    prompt: `${x}g は、何kg何gですか。`,
    answer: { kind: "choice", options, correct: options.indexOf(right), why: options.map((o) => (o === right ? `${x}gは${k * 1000}gと${g}g。${k * 1000}g＝${k}kgなので${right}です。` : `1000gが1kgです。${x}gを${k * 1000}gと${g}gに分けると${right}です。`)) },
    point: "1000gのまとまりを kg にする",
    steps: [{ title: "1000gで区切る", body: `${x}g＝${k * 1000}g＋${g}g＝{{${right}}}。`, back: [B_KG] }],
  };
}

function hakari(r: Rng): QuestionBody {
  const [per, max] = r.pick([[5, 1000], [10, 2000], [20, 4000], [50, 8000]] as const);
  const n = r.int(7, Math.min(99, max / per - 1, Math.floor(2000 / per)));
  const what = per * n < 600 ? r.pick(["りんご", "本", "トマト"]) : r.pick(["かぼちゃ", "メロン", "じゃがいものふくろ"]);
  return {
    prompt: `${max / 1000}kgまではかれるはかりがあります。このはかりの1目もりは${per}gです。${what}をのせると、はりは0から${n}目もりのところをさしました。${what}の重さは何gですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(per * n)], unit: "g", calc: `${per}*${n}` },
    point: "1目もりが何gかを先に見る",
    steps: [{ title: "目もりを読む", body: `1目もりが${per}gなので、${per}×${n}＝{{${per * n}}}（g）。${K(per * n)}です。`, trap: "1目もりを1gとして読まないようにします。", back: [B_MEMORI] }],
  };
}

function kago(r: Rng): QuestionBody {
  const c = r.int(2, 6) * 50;
  const w = 1000 + r.int(1, 15) * 50 + c;
  const what = r.pick(["かご", "バケツ", "箱"]);
  return {
    prompt: `${what}にやさいを入れて重さをはかると、${K(w)}でした。${what}だけの重さは${c}gです。やさいの重さは何gですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(w - c)], unit: "g", calc: `${w}-${c}` },
    point: "g にそろえてからひく",
    steps: [
      { title: "g にそろえる", body: `${K(w)}＝${w}g です。`, back: [B_KG] },
      { title: "入れ物の重さをひく", body: `${w}−${c}＝{{${w - c}}}（g）。`, back: [B_KEISAN] },
    ],
  };
}

function awase(r: Rng): QuestionBody {
  const a = 1000 * r.int(1, 2) + r.int(1, 9) * 100;
  const b = r.int(3, 9) * 100 + r.int(0, 9) * 10;
  const [x, y] = r.pick([["お米", "さとう"], ["小麦《こむぎ》こ", "しお"], ["みかん", "りんご"]]);
  return {
    prompt: `${x} ${K(a)} と ${y} ${b}g を合わせると、何gですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a + b)], unit: "g", calc: `${a}+${b}` },
    point: "単位《たんい》をそろえてからたす",
    steps: [{ title: "g でたす", body: `${K(a)}＝${a}g。${a}＋${b}＝{{${a + b}}}（g）＝${K(a + b)}です。`, back: [B_KEISAN, B_TANI] }],
  };
}

function honbako(r: Rng): QuestionBody {
  const p = r.int(2, 6) * 50;
  const n = r.int(4, 9);
  const box = r.int(3, 9) * 100;
  const total = p * n + box;
  const what = r.pick(["本", "図かん", "じしょ"]);
  return {
    prompt: `1さつ${p}gの${what}が${n}さつあります。これを重さ${box}gの箱に入れました。全体の重さは何gですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(total)], unit: "g", calc: `${p}*${n}+${box}` },
    point: "同じ重さがいくつ分かは かけ算、箱の重さはたす",
    steps: [
      { title: `${what}の重さ`, body: `${p}×${n}＝${p * n}（g）。`, back: [B_KEISAN] },
      { title: "箱をたす", body: `${p * n}＋${box}＝{{${total}}}（g）。${K(total)}です。`, trap: "箱の重さをたしわすれないようにします。", back: [B_KG] },
    ],
  };
}

export const E_MATH_3_OMOSA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "重さの単位《たんい》とはかり",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "to-g", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: toG },
        { id: "to-kg", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: toKg },
        { id: "hakari", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: hakari },
      ],
    },
    {
      title: "重さの計算",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "kago", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: kago },
        { id: "awase", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: awase },
        { id: "honbako", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: honbako },
      ],
    },
  ],
};
