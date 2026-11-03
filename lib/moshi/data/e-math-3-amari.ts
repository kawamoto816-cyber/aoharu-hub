// 小3算数「あまりのあるわり算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 先に わる数・答え・あまり (あまり < わる数) を決め、わられる数＝わる数×答え＋あまり で作る。
// calc・equations で答えを検算 (scripts/check-moshi.ts がシード100個で確かめる)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-amari";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_AMARI = L(2, "あまりは、わる数より小さい");
const B_MOTOME = L(3, "答えのもとめ方");
const B_TASHIKA = L(4, "たしかめ算で正しいか見る");
const B_BUN = L(5, "あまりをどうするか、文を読んで決める");

function warizan(r: Rng): QuestionBody {
  const b = r.int(3, 9);
  const q = r.int(2, 9);
  const m = r.int(1, b - 1);
  const a = b * q + m;
  return {
    prompt: `${a}÷${b} を計算しなさい。答えとあまりを書きなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(q), String(m)], labels: ["答え", "あまり"], calc: `(${a}-${m})/${b}`, equations: [`${b}*x+y=${a}`] },
    point: "わる数のだんの九九で、こえない一番大きい答えをさがす",
    steps: [
      { title: `${b}のだんの九九でさがす`, body: `${b}×${q}＝${b * q}、${b}×${q + 1}＝${b * (q + 1)} なので、${a}をこえない一番大きい答えは{{${q}}}です。`, back: [B_MOTOME] },
      { title: "あまりを出す", body: `${a}−${b * q}＝{{${m}}}。${m}は${b}より小さいので、これでよいです。`, back: [B_AMARI] },
    ],
  };
}

function tashikame(r: Rng): QuestionBody {
  const b = r.int(3, 9);
  const q = r.int(3, 9);
  const m = r.int(1, b - 1);
  const a = b * q + m;
  return {
    prompt: `ある数を${b}でわると、答えが${q}で、あまりが${m}になりました。ある数はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], calc: `${b}*${q}+${m}` },
    point: "わる数×答え＋あまり＝わられる数",
    steps: [
      { title: "たしかめ算の式を使う", body: `わられる数は、わる数×答え＋あまり で出せます。${b}×${q}＋${m}＝{{${a}}}です。`, trap: `${b}×${q}＝${b * q} で止めない。あまりの${m}をたすのをわすれないようにします。`, back: [B_TASHIKA] },
    ],
  };
}

function erabu(r: Rng): QuestionBody {
  const b = r.int(4, 9);
  const q = r.int(3, 8);
  const m = r.int(1, b - 1);
  const a = b * q + m;
  const opts = [`${q}あまり${m}`, `${q - 1}あまり${m + b}`, `${q + 1}あまり${m}`, `${q}`];
  return {
    prompt: `${a}÷${b} の答えとして正しいものを、えらびなさい。`,
    answer: {
      kind: "choice",
      options: opts,
      correct: 0,
      why: [
        `${b}×${q}＋${m}＝${a} で、あまり${m}は${b}より小さいので正しい。`,
        `たしかめ算は合いますが、あまり${m + b}は わる数の${b}より大きい。もう1回分けられます。`,
        `${b}×${q + 1}＝${b * (q + 1)} は${a}をこえてしまいます。`,
        `${b}×${q}＝${b * q} は${a}にならないので、わりきれません。あまりがあります。`,
      ],
    },
    point: "あまりは、いつもわる数より小さい",
    steps: [
      { title: "九九で答えを見つける", body: `${b}×${q}＝${b * q} で、のこりは ${a}−${b * q}＝${m}。答えは{{${q}あまり${m}}}です。`, back: [B_MOTOME] },
      { title: "あまりとわる数をくらべる", body: `あまりが わる数の${b}より大きいときは、まだ分けられます。`, back: [B_AMARI] },
    ],
  };
}

function nagaisu(r: Rng): QuestionBody {
  const k = r.int(3, 6);
  const q = r.int(4, 9);
  const m = r.int(1, k - 1);
  const n = k * q + m;
  const what = r.pick(["長いす", "ボート", "車"]);
  const unit = what === "長いす" ? "きゃく" : what === "ボート" ? "そう" : "台";
  return {
    prompt:
      what === "長いす"
        ? `${n}人が、1きゃくに${k}人ずつ長いすにすわります。全員がすわるには、長いすは何きゃくいりますか。`
        : `${n}人が、1${unit}に${k}人ずつ${what}に乗ります。全員が乗るには、${what}は何${unit}いりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q + 1)], unit, calc: `(${n}-${m})/${k}+1` },
    point: "のこった人の分も、もう1つ いる",
    steps: [
      { title: "わり算をする", body: `${n}÷${k}＝${q}あまり${m}。${k}人ずつで${q}${unit}、${m}人がのこります。`, back: [B_MOTOME] },
      { title: "あまりをどうするか", body: `のこった${m}人も乗るので、もう1${unit}いります。${q}＋1＝{{${q + 1}}}（${unit}）です。`, trap: `答えの${q}だけを書くと、${m}人が乗れません。`, back: [B_BUN] },
    ],
  };
}

function fukuro(r: Rng): QuestionBody {
  const k = r.int(4, 8);
  const q = r.int(4, 9);
  const m = r.int(1, k - 1);
  const n = k * q + m;
  const what = r.pick(["あめ", "クッキー", "みかん"]);
  return {
    prompt: `${what}が${n}こあります。1ふくろに${k}こずつ入れると、${k}こ入ったふくろは何ふくろできますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q)], unit: "ふくろ", calc: `(${n}-${m})/${k}` },
    point: "あまりの分では、1ふくろにならない",
    steps: [
      { title: "わり算をする", body: `${n}÷${k}＝${q}あまり${m}。`, back: [B_MOTOME] },
      { title: "あまりをどうするか", body: `のこった${m}こでは${k}こ入ったふくろにならないので、答えは{{${q}}}ふくろです。`, trap: `長いすの問題とちがい、＋1 はしません。聞かれていることを読みます。`, back: [B_BUN] },
    ],
  };
}

function nidan(r: Rng): QuestionBody {
  const b = r.int(5, 9);
  const q = r.int(3, 8);
  const m = r.int(1, b - 1);
  const a = b * q + m;
  let c = r.int(3, 9);
  if (c === b) c = b === 9 ? 4 : b + 1;
  const q2 = Math.floor(a / c);
  const m2 = a % c;
  return {
    prompt: `ある数を${b}でわると、${q}あまり${m}になりました。この数を${c}でわると、答えとあまりはいくつになりますか。あまりがないときは、あまりに0と書きなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(q2), String(m2)], labels: ["答え", "あまり"], calc: `(${b}*${q}+${m}-${m2})/${c}`, equations: [`${c}*x+y=${b}*${q}+${m}`] },
    point: "まず、たしかめ算でもとの数を出す",
    steps: [
      { title: "もとの数を出す", body: `${b}×${q}＋${m}＝{{${a}}} がもとの数です。`, back: [B_TASHIKA] },
      { title: `${c}でわる`, body: `${a}÷${c}＝{{${q2}あまり${m2}}}。${c}×${q2}＋${m2}＝${a} でたしかめられます。`, trap: `${q}や${m}を${c}でわるのではありません。もとの数にもどしてからわります。`, back: [B_MOTOME] },
    ],
  };
}

export const E_MATH_3_AMARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "あまりのあるわり算の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "warizan", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: warizan },
        { id: "erabu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: erabu },
        { id: "tashikame", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: tashikame },
      ],
    },
    {
      title: "あまりをどうするか考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "nagaisu", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: nagaisu },
        { id: "fukuro", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: fukuro },
        { id: "nidan", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: nidan },
      ],
    },
  ],
};
