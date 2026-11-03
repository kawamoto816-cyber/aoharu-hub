// 小3算数「かけ算の筆算（×2けた）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: かけられる数・かける数を rng で作り、答えは calc (かけ算・たし算・ひき算) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-kake-hissan2";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_WAKE = L(1, "かける数を20と4に分ける");
const B_TEJUN = L(2, "筆算の手順《てじゅん》");
const B_ZURASU = L(3, "なぜ1つ左にずらすの？");
const B_KENTOU = L(4, "見当をつけてたしかめる");

function niketa(r: Rng): QuestionBody {
  const a = r.int(12, 49);
  const b = r.int(2, 4) * 10 + r.int(2, 9);
  const t = Math.floor(b / 10);
  const o = b % 10;
  return {
    prompt: `${a}×${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], calc: `${a}*${b}` },
    point: "2だん目は、1つ左にずらして書く",
    steps: [
      { title: "一の位《くらい》をかける", body: `1だん目は ${a}×${o}＝${a * o}。`, back: [B_TEJUN] },
      { title: "十の位《くらい》をかける", body: `2だん目は ${a}×${t}＝${a * t} を、1つ左にずらして書きます（ほんとうは${a * t * 10}）。`, back: [B_ZURASU] },
      { title: "たす", body: `${a * o}＋${a * t * 10}＝{{${a * b}}}。` },
    ],
  };
}

function wakeru(r: Rng): QuestionBody {
  const a = r.int(13, 39);
  const t = r.int(1, 4);
  const o = r.int(2, 9);
  const b = t * 10 + o;
  return {
    prompt: `${a}×${b} を、${a}×${t * 10} と ${a}×${o} に分けて計算します。2つをあわせると、いくつになりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], calc: `${a}*${t * 10}+${a}*${o}` },
    point: "かける数を何十といくつに分ける",
    steps: [{ title: "分けてかける", body: `${a}×${t * 10}＝${a * t * 10}、${a}×${o}＝${a * o}。あわせて {{${a * b}}} です。`, back: [B_WAKE] }],
  };
}

function zurashi(r: Rng): QuestionBody {
  const a = r.int(21, 48);
  const t = r.int(2, 4);
  const o = r.int(5, 9);
  const b = t * 10 + o;
  const right = a * b;
  const wrong = a * o + a * t;
  const opts = r.shuffle([String(right), String(wrong), String(a * o * 10 + a * t), String(right + 100)]);
  return {
    prompt: `${a}×${b} の筆算で、1だん目に ${a * o}、2だん目に ${a * t} と書きました。正しい答えはどれですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct: opts.indexOf(String(right)),
      why: opts.map((x) =>
        x === String(right)
          ? `2だん目の${a * t}は${a * t * 10}のことなので、${a * o}＋${a * t * 10}＝${right}。`
          : x === String(wrong)
            ? "2だん目をずらさずにたした答えです。とても小さくなります。"
            : x === String(a * o * 10 + a * t)
              ? "1だん目のほうをずらしています。ずらすのは2だん目です。"
              : `1つ左にずらしてたすと${right}です。`,
      ),
    },
    point: "2だん目は十の位《くらい》から書きはじめる",
    steps: [
      { title: "2だん目の意味", body: `2だん目の${a * t}は、${a}×${t * 10}＝{{${a * t * 10}}} のことです。`, back: [B_ZURASU] },
      { title: "見当でたしかめる", body: `${a * o}＋${a * t * 10}＝${right}。${Math.round(a / 10) * 10}×${Math.round(b / 10) * 10}＝${Math.round(a / 10) * 10 * Math.round(b / 10) * 10} くらいなので、合っています。`, back: [B_KENTOU] },
    ],
  };
}

function sanketa(r: Rng): QuestionBody {
  const a = r.int(105, 389);
  const b = r.int(12, 29);
  return {
    prompt: `${a}×${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], calc: `${a}*${b}` },
    point: "3けたでも、手順《てじゅん》は同じ",
    steps: [
      { title: "2つのだん", body: `1だん目 ${a}×${b % 10}＝${a * (b % 10)}、2だん目 ${a}×${Math.floor(b / 10)}＝${a * Math.floor(b / 10)} を1つ左にずらします。`, back: [B_TEJUN] },
      { title: "たす", body: `${a * (b % 10)}＋${a * Math.floor(b / 10) * 10}＝{{${a * b}}}。`, back: [B_ZURASU] },
    ],
  };
}

function bunsho(r: Rng): QuestionBody {
  const p = r.int(24, 85);
  const n = r.int(12, 35);
  const [x, c] = r.pick([["バス代", "人"], ["色紙のたば", "たば"], ["花のなえ", "かぶ"]]);
  const prompt =
    x === "バス代"
      ? `子ども1人の${x}は${p}円です。${n}人分では何円ですか。`
      : x === "色紙のたば"
        ? `1たばに${p}まいの色紙があります。${n}たばでは、色紙は何まいですか。`
        : `花のなえを、1れつに${p}かぶずつ、${n}れつ植《う》えます。なえは全部で何かぶいりますか。`;
  const unit = x === "バス代" ? "円" : x === "色紙のたば" ? "まい" : c;
  return {
    prompt,
    answer: { kind: "num", answerKind: "num", answer: [String(p * n)], unit, calc: `${p}*${n}` },
    point: "1つ分×いくつ分",
    steps: [
      { title: "式", body: `1つ分が${p}、${n}こ分なので ${p}×${n} です。`, back: [B_WAKE] },
      { title: "計算", body: `${p}×${n}＝{{${p * n}}}（${unit}）。`, back: [B_TEJUN] },
    ],
  };
}

function otsuri(r: Rng): QuestionBody {
  const p = r.int(110, 190);
  const n = r.int(12, 25);
  const total = p * n;
  const pay = Math.ceil((total + 1) / 1000) * 1000;
  const what = r.pick(["ノート", "ジュース", "えんぴつけずり"]);
  return {
    prompt: `1こ${p}円の${what}を${n}こ買って、${pay}円はらいました。おつりは何円ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(pay - total)], unit: "円", calc: `${pay}-${p}*${n}` },
    point: "代金を先に出してから、はらったお金からひく",
    steps: [
      { title: "代金", body: `${p}×${n}＝${total}（円）。`, back: [B_TEJUN, B_KENTOU] },
      { title: "おつり", body: `${pay}−${total}＝{{${pay - total}}}（円）。` },
    ],
  };
}

export const E_MATH_3_KAKE_HISSAN2_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "2けたをかける筆算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "niketa", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: niketa },
        { id: "wakeru", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: wakeru },
        { id: "sanketa", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "知識・技能", generate: sanketa },
        { id: "zurashi", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: zurashi },
      ],
    },
    {
      title: "文章の問題",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "bunsho", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: bunsho },
        { id: "otsuri", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: otsuri },
      ],
    },
  ],
};
