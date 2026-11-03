// 小3算数「□を使った式」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 先に□の数を決め、式のもう一方の数をそこから作る。□は calc (ひき算・たし算・わり算・かけ算) と equations (x に□を入れて式が成り立つか) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-shiki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_SHIKI = L(1, "わからない数を□にする");
const B_TASU = L(2, "テープ図で□をもとめる（たし算）");
const B_KAKE = L(3, "かけ算の□もテープ図で");
const B_TASHIKA = L(4, "□に入れてたしかめる");

function tasu(r: Rng): QuestionBody {
  const x = r.int(12, 68);
  const a = r.int(11, 39);
  const what = r.pick(["あめ", "おはじき", "どんぐり"]);
  return {
    prompt: `${what}を何こか持っていました。${a}こもらったので、全部で${x + a}こになりました。はじめに持っていた数を□こにして式に表すと、□＋${a}＝${x + a} です。□はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x)], calc: `${x + a}-${a}`, equations: [`x+${a}=${x + a}`] },
    point: "たし算の□は、全部からひいてもとめる",
    steps: [
      { title: "テープ図で考える", body: `全部の${x + a}こは、□こと${a}こを合わせたものです。□＝${x + a}−${a}＝{{${x}}}。`, back: [B_TASU] },
      { title: "たしかめる", body: `${x}＋${a}＝${x + a} で正しいです。`, back: [B_TASHIKA] },
    ],
  };
}

function hiku(r: Rng): QuestionBody {
  const x = r.int(40, 95);
  const a = r.int(12, x - 10);
  return {
    prompt: `□にあてはまる数をもとめなさい。　□−${a}＝${x - a}`,
    answer: { kind: "num", answerKind: "num", answer: [String(x)], calc: `${x - a}+${a}`, equations: [`x-${a}=${x - a}`] },
    point: "ひき算の□（ひかれる数）は、たしてもとめる",
    steps: [{ title: "もとにもどす", body: `□から${a}をひくと${x - a}なので、□は ${x - a}＋${a}＝{{${x}}}。`, trap: `${x - a}−${a} としない。□は${x - a}より大きい数です。`, back: [B_TASU, B_TASHIKA] }],
  };
}

function kake(r: Rng): QuestionBody {
  const x = r.int(3, 9);
  const k = r.int(3, 9);
  const what = r.pick(["クッキー", "みかん", "ビー玉"]);
  return {
    prompt: `${what}を同じ数ずつ${k}ふくろに入れたら、全部で${x * k}こになりました。1ふくろの数を□こにして式に表すと、□×${k}＝${x * k} です。□はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x)], calc: `${x * k}/${k}`, equations: [`${k}x=${x * k}`] },
    point: "かけ算の□は、わり算でもとめる",
    steps: [{ title: "□が" + String(k) + "こ分", body: `□が${k}こ分で${x * k}こなので、□＝${x * k}÷${k}＝{{${x}}}。`, back: [B_KAKE] }],
  };
}

function erabu(r: Rng): QuestionBody {
  const a = r.int(12, 40);
  const t = r.int(a + 10, 90);
  const kind = r.int(0, 1);
  const right = kind === 0 ? `□＋${a}＝${t}` : `□−${a}＝${t - a}`;
  const prompt =
    kind === 0
      ? `はじめに本だなに本が□さつありました。${a}さつ入れたので、全部で${t}さつになりました。このお話を式に表したものはどれですか。`
      : `はじめに色紙が□まいありました。${a}まい使ったので、のこりが${t - a}まいになりました。このお話を式に表したものはどれですか。`;
  const ws = kind === 0 ? [`${a}＋${t}＝□`, `□−${a}＝${t}`, `${t}＋□＝${a}`] : [`□＋${a}＝${t - a}`, `${a}−□＝${t - a}`, `${t - a}−${a}＝□`];
  const options = r.shuffle([right, ...ws]);
  return {
    prompt,
    answer: { kind: "choice", options, correct: options.indexOf(right), why: options.map((o) => (o === right ? `お話の順《じゅん》に「はじめ□、${kind === 0 ? `${a}ふえて、全部で${t}` : `${a}へって、のこり${t - a}`}」と書いた式です。` : "お話の順《じゅん》と合いません。はじめの数を□にして、お話の順《じゅん》に書きます。")) },
    point: "わからない数を□にして、お話の順《じゅん》に式にする",
    steps: [{ title: "お話の順《じゅん》に", body: `はじめの数が□です。そこから${kind === 0 ? "ふえた" : "へった"}ので ${right} です。`, back: [B_SHIKI] }],
  };
}

function waru(r: Rng): QuestionBody {
  const q = r.int(3, 9);
  const k = r.int(3, 9);
  return {
    prompt: `□にあてはまる数をもとめなさい。　□÷${k}＝${q}`,
    answer: { kind: "num", answerKind: "num", answer: [String(q * k)], calc: `${q}*${k}`, equations: [`x/${k}=${q}`] },
    point: "わり算の□（わられる数）は、かけ算でもとめる",
    steps: [{ title: "かけ算でもどす", body: `□を${k}つに分けた1つ分が${q}なので、□＝${q}×${k}＝{{${q * k}}}。`, trap: `${q}÷${k} としないようにします。`, back: [B_KAKE, B_TASHIKA] }],
  };
}

function nidan(r: Rng): QuestionBody {
  const x = r.step(60, 90, 10); // 小3: (何十)÷(1けた) を九九でとける大きさに
  const k = r.int(2, 5);
  const a = r.step(80, 150, 10);
  const t = x * k + a;
  const what = r.pick(["パン", "ドーナツ", "おにぎり"]);
  return {
    prompt: `1こ□円の${what}を${k}こと、${a}円のジュースを1本買うと、代金は${t}円でした。□×${k}＋${a}＝${t} の□はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x)], unit: "円", calc: `(${t}-${a})/${k}`, equations: [`${k}x+${a}=${t}`] },
    point: "あとからたした数をひいてから、わり算",
    steps: [
      { title: `${what}の代金`, body: `全部の${t}円からジュースの${a}円をひくと、${what}${k}こ分は ${t}−${a}＝${t - a}（円）。`, back: [B_TASU] },
      { title: "1こ分", body: `□×${k}＝${t - a} です。${t - a}は10が${(t - a) / 10}こなので、${(t - a) / 10}÷${k}＝${x / 10} より、□＝${t - a}÷${k}＝{{${x}}}（円）。`, back: [B_KAKE] },
      { title: "たしかめる", body: `${x}×${k}＋${a}＝${x * k}＋${a}＝${t} で正しいです。`, back: [B_TASHIKA] },
    ],
  };
}

export const E_MATH_3_SHIKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "□をもとめる",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "tasu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: tasu },
        { id: "kake", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kake },
        { id: "hiku", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: hiku },
        { id: "waru", type: "A", difficulty: 2, points: 18, seconds: 60, skill: "知識・技能", generate: waru },
      ],
    },
    {
      title: "お話を式に表す",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "erabu", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: erabu },
        { id: "nidan", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: nidan },
      ],
    },
  ],
};
