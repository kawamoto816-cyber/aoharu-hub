// 小4算数「小数のしくみ」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 小数は「0.01 や 0.001 が何こ」(整数) で持って作り、表示は f() で整える。答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-shosu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_001 = L(1, "0.1を10等分すると0.01");
const B_KURAI = L(2, "位の名前と「いくつ分」");
const B_10BAI = L(3, "10倍・1/10で、小数点が動く");
const B_DAISHO = L(4, "大小は、上の位からくらべる");
const B_TASU = L(5, "たし算・ひき算は小数点をそろえる");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function atsume(r: Rng): QuestionBody {
  const t = r.int(101, 999);
  const u = r.bool() ? 100 : 1000;
  const unitName = u === 100 ? "0.01" : "0.001";
  return {
    prompt: `${unitName}を${t}こ集めた数はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(t / u)], calc: `${t}/${u}` },
    point: "10こ集まると1つ上の位",
    steps: [{ title: "位にならべる", body: `${unitName}が${t}こなので、{{${f(t / u)}}}。`, back: [B_001, B_KURAI] }],
  };
}

function mcm(r: Rng): QuestionBody {
  const kind = r.bool();
  if (kind) {
    const t = r.int(105, 980);
    return {
      prompt: `${f(t / 100)}m は何cmですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(t)], unit: "cm", calc: `${f(t / 100)}*100` },
      point: "0.01m＝1cm",
      steps: [{ title: "0.01mのいくつ分", body: `${f(t / 100)}mは0.01mが${t}こ。0.01m＝1cmなので {{${t}cm}}。`, back: [B_001] }],
    };
  }
  const t = r.int(1050, 9800);
  return {
    prompt: `${t}g は何kgですか。小数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(t / 1000)], unit: "kg", calc: `${t}/1000` },
    point: "1g＝0.001kg",
    steps: [{ title: "0.001kgのいくつ分", body: `1000g＝1kgなので、1g＝0.001kg。${t}gは0.001kgが${t}こで {{${f(t / 1000)}kg}}。`, back: [B_KURAI] }],
  };
}

function bai(r: Rng): QuestionBody {
  const t = r.int(101, 999);
  const kind = r.int(0, 2);
  const x = t / 100;
  const [ans, word, calc] = kind === 0 ? [x * 10, "10倍", `${f(x)}*10`] : kind === 1 ? [x * 100, "100倍", `${f(x)}*100`] : [x / 10, "1/10", `${f(x)}/10`];
  return {
    prompt: `${f(x)} を${word}にした数はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], calc },
    point: "10倍で小数点は右へ1けた、1/10で左へ1けた",
    steps: [{ title: "小数点を動かす", body: kind === 2 ? `位が1つ下がり、小数点は左に1けた動いて {{${f(ans)}}}。` : `位が${kind === 0 ? 1 : 2}つ上がり、小数点は右に${kind === 0 ? 1 : 2}けた動いて {{${f(ans)}}}。`, back: [B_10BAI] }],
  };
}

function daisho(r: Rng): QuestionBody {
  const a = r.int(2, 8);
  // 1000分の いくつ で作る (0.8 と 0.75・0.735 のように、けたが多いほうが小さい組をまぜる)
  const th = [a * 100, (a - 1) * 100 + r.int(11, 99), (a - 1) * 100 + r.int(1, 9) * 10, r.bool() ? a * 100 + r.int(1, 9) * 10 : (a - 1) * 100 + r.int(1, 9)];
  const uniq = [...new Set(th)].map((x) => f(x / 1000));
  const max = f(Math.max(...th) / 1000);
  const options = r.shuffle(uniq);
  return {
    prompt: `一番大きい数はどれですか。　${[...uniq].reverse().join("、")}`,
    answer: {
      kind: "choice",
      options,
      correct: options.indexOf(max),
      why: options.map((o) => (o === max ? `1/10の位、1/100の位…と上の位からくらべると、${o}が一番大きい。` : `けたの数が多くても大きいとはかぎりません。上の位からくらべると、${max}のほうが大きい。`)),
    },
    point: "けたの数ではなく、上の位からくらべる",
    steps: [{ title: "上の位から", body: `1/10の位からくらべます。0をつけたして同じけたにするとくらべやすい。答えは {{${max}}}。`, back: [B_DAISHO] }],
  };
}

function hiku(r: Rng): QuestionBody {
  const n = r.int(3, 9);
  const t = r.int(101, n * 100 - 1);
  const tt = t % 10 === 0 ? t + 1 : t;
  return {
    prompt: `${n}−${f(tt / 100)} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f((n * 100 - tt) / 100)], calc: `${n}-${f(tt / 100)}` },
    point: "整数は ○.00 と考えて小数点をそろえる",
    steps: [{ title: "けたをそろえる", body: `${n}を${n}.00と考えて、小数点をそろえて計算します。${n}.00−${f(tt / 100)}＝{{${f((n * 100 - tt) / 100)}}}。`, trap: "右はしをそろえないようにします。そろえるのは小数点です。", back: [B_TASU] }],
  };
}

function modoru(r: Rng): QuestionBody {
  const t = r.int(101, 999);
  const x = t / 10;
  return {
    prompt: `ある数を10倍すると ${f(x)} になりました。ある数を1/10にした数はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(x / 100)], calc: `${f(x)}/10/10` },
    point: "まず、もとの数にもどす",
    steps: [
      { title: "もとの数", body: `10倍して${f(x)}なので、もとの数は ${f(x)}÷10＝${f(x / 10)}。`, back: [B_10BAI] },
      { title: "1/10にする", body: `${f(x / 10)}の1/10は、小数点を左に1けた動かして {{${f(x / 100)}}}。`, trap: `${f(x)}の1/10（${f(x / 10)}）で止めないようにします。` },
    ],
  };
}

export const E_MATH_4_SHOSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: "小数のしくみ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "atsume", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: atsume },
        { id: "m-cm", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: mcm },
        { id: "bai", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: bai },
      ],
    },
    {
      title: "大小と計算",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "daisho", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: daisho },
        { id: "hiku", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: hiku },
        { id: "modoru", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: modoru },
      ],
    },
  ],
};
