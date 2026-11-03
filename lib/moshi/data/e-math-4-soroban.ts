// 小4算数「そろばん」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 1けたの数 d は 5玉 (d≥5 なら1つ) と 1玉 (d を5でわったあまり) で表す。はらう玉の数・計算の答え・玉の数は calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-soroban";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_TAMA = L(1, "5玉は5、1玉は1");
const B_TEII = L(2, "定位点のけたを一の位にする");
const B_5 = L(3, "1玉がたりないときは5玉を使う");
const B_10 = L(4, "それでもたりないときは、となりのけたを使う");
const B_OKU = L(5, "億も小数も、同じ玉の動き");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const tama = (d: number) => (d === 0 ? "玉を入れない" : [d >= 5 ? "5玉1つ" : "", d % 5 ? `1玉${d % 5}つ` : ""].filter(Boolean).join("と"));

function yomu(r: Rng): QuestionBody {
  const o = r.int(0, 9);
  const t = r.int(1, 9);
  const h = r.int(1, 9);
  return {
    prompt: `定位点のあるけたを一の位とします。十の位は${tama(h)}、一の位は${tama(o)}、1/10の位は${tama(t)}を入れています。いくつを表していますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(h * 10 + o + t / 10)], calc: `${h}*10+${o}+${t}/10` },
    point: "定位点のけたが一の位、その右が1/10の位",
    steps: [
      { title: "けたごとに読む", body: `十の位${h}、一の位${o}、1/10の位${t}。`, back: [B_TAMA] },
      { title: "小数で表す", body: `{{${f(h * 10 + o + t / 10)}}} です。`, back: [B_TEII] },
    ],
  };
}

function oku(r: Rng): QuestionBody {
  const d = r.int(5, 9);
  const pos = r.pick(["一の位", "十の位", "1/10の位"]);
  return {
    prompt: `そろばんの${pos}のけたに${d}を入れます。5玉と1玉を、それぞれいくつ入れますか。`,
    answer: { kind: "num", answerKind: "pair", answer: ["1", String(d - 5)], labels: ["5玉", "1玉"], unit: "つ", calc: `(${d}-${d % 5})/5`, equations: [`5x+y=${d}`, `y=${d}-5`] },
    point: "5以上は、5玉1つと1玉",
    steps: [{ title: "5といくつ", body: `${d}＝5＋${d - 5}。5玉を{{1つ}}、1玉を{{${d - 5}つ}}。`, back: [B_TAMA] }],
  };
}

function go(r: Rng): QuestionBody {
  const a = r.int(1, 4);
  const b = r.int(5 - a, 4);
  return {
    prompt: `そろばんで ${a}＋${b} をします。1玉は${a}つ入っていて、1玉だけでは${b}を入れられません。5玉を入れて、1玉をいくつはらいますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(5 - b)], unit: "つ", calc: `5-${b}` },
    point: "□をたす＝5をたして、5−□をひく",
    steps: [{ title: `${b}を「5−${5 - b}」と考える`, body: `5玉を入れて、1玉を{{${5 - b}つ}}はらいます。答えは${a + b}です。`, back: [B_5] }],
  };
}

function ju(r: Rng): QuestionBody {
  const a = r.int(5, 9);
  const b = r.int(10 - a, 9);
  return {
    prompt: `そろばんで ${a}＋${b} をします。一の位だけでは${b}を入れられないので、十の位に1を入れます。一の位からいくつをはらいますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(10 - b)], calc: `10-${b}` },
    point: "□をたす＝10をたして、10−□をひく",
    steps: [{ title: `${b}を「10−${10 - b}」と考える`, body: `十の位に1を入れ、一の位から{{${10 - b}}}をはらいます。答えは${a + b}です。`, back: [B_10] }],
  };
}

function shosu(r: Rng): QuestionBody {
  const a = r.int(5, 9);
  const b = r.int(10 - a, 9);
  const w = r.int(0, 3);
  const x = w + a / 10;
  return {
    prompt: `定位点のけたを一の位にして、そろばんで ${f(x)}＋${f(b / 10)} をします。答えはいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(x + b / 10)], calc: `${f(x)}+${f(b / 10)}` },
    point: "1/10の位でくり上がった1は、一の位に入れる",
    steps: [
      { title: "1/10の位", body: `${a}＋${b}＝${a + b}。1/10の位から${10 - b}をはらい、一の位に1を入れます。`, back: [B_10] },
      { title: "答え", body: `{{${f(x + b / 10)}}}。整数のときと同じ玉の動きです。`, back: [B_OKU] },
    ],
  };
}

function okuTasu(r: Rng): QuestionBody {
  const a = r.int(12, 68);
  const b = r.int(13, 29);
  const u = r.pick(["億", "兆", "万"]);
  const ds = String(a + b).split("").map(Number);
  const cnt = ds.reduce((s, d) => s + (d >= 5 ? 1 : 0) + (d % 5), 0);
  return {
    prompt: `定位点のけたを${u}の位と決めて、そろばんで ${a}${u}＋${b}${u} をしました。答えをおいたとき、はりによせている玉は、5玉と1玉を合わせていくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(cnt)], unit: "つ", calc: ds.map((d) => `${d >= 5 ? 1 : 0}+${d % 5}`).join("+") },
    point: "大きい数も、定位点で位を決めれば同じ",
    steps: [
      { title: "答え", body: `${a}＋${b}＝${a + b} なので、${a + b}${u}。一番右の${ds[ds.length - 1]}が${u}の位になるように、左から ${ds.join("・")} をおきます。`, back: [B_OKU] },
      { title: "玉を数える", body: `${ds.map((d) => `${d}は${tama(d)}`).join("、")}。合わせて{{${cnt}つ}}です。`, trap: "5玉は5を表しますが、玉の数としては1つです。", back: [B_TAMA] },
    ],
  };
}

export const E_MATH_4_SOROBAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: "そろばんで数を表す",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "yomu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: yomu },
        { id: "oku", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: oku },
        { id: "go", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: go },
      ],
    },
    {
      title: "くり上がりと、小数・大きい数",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "ju", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: ju },
        { id: "shosu", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: shosu },
        { id: "oku-tasu", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: okuTasu },
      ],
    },
  ],
};
