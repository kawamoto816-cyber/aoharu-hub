// 小3算数「かけ算の筆算（×1けた）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: かけられる数・かける数を rng で作り、答えは calc (かけ算・たし算) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-kake-hissan1";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_WAKE = L(1, "分けてかけて、あわせる");
const B_ICHI = L(2, "筆算は一の位《くらい》からかける");
const B_AGARI = L(3, "くり上がりがあるとき");
const B_3KETA = L(4, "3けた×1けたも同じやり方");
const B_DAITAI = L(5, "だいたいの数でたしかめる");

function niketa(r: Rng): QuestionBody {
  const a = r.int(2, 9) * 10 + r.int(3, 9);
  const b = r.int(3, 9);
  const o = (a % 10) * b;
  return {
    prompt: `${a}×${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], calc: `${a}*${b}` },
    point: "かけ算をしてから、くり上がりをたす",
    steps: [
      { title: "一の位《くらい》", body: `${a % 10}×${b}＝${o}。${o % 10}を一の位《くらい》に書き、${Math.floor(o / 10)}をくり上げます。`, back: [B_ICHI, B_AGARI] },
      { title: "十の位《くらい》", body: `${Math.floor(a / 10)}×${b}＝${Math.floor(a / 10) * b}、くり上げた${Math.floor(o / 10)}をたして${Math.floor(a / 10) * b + Math.floor(o / 10)}。答えは {{${a * b}}} です。` },
    ],
  };
}

function sanketa(r: Rng): QuestionBody {
  const a = r.int(1, 4) * 100 + r.int(1, 9) * 10 + r.int(2, 9);
  const b = r.int(2, 6);
  return {
    prompt: `${a}×${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], calc: `${a}*${b}` },
    point: "一の位《くらい》・十の位《くらい》・百の位《くらい》の順《じゅん》に九九",
    steps: [{ title: "位《くらい》ごとに九九", body: `${a % 10}×${b}、${Math.floor(a / 10) % 10}×${b}、${Math.floor(a / 100)}×${b} の順《じゅん》に九九をし、くり上がりをつぎの位《くらい》でたします。答えは {{${a * b}}} です。`, back: [B_3KETA] }],
  };
}

function wakeru(r: Rng): QuestionBody {
  const t = r.int(2, 9);
  const o = r.int(1, 9);
  const b = r.int(3, 9);
  const a = t * 10 + o;
  return {
    prompt: `${a}×${b} を、${a}を${t * 10}と${o}に分けて考えます。${t * 10}×${b} と ${o}×${b} をあわせると、いくつになりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], calc: `${t * 10}*${b}+${o}*${b}` },
    point: "分けてかけて、あとであわせる",
    steps: [{ title: "2つに分ける", body: `${t * 10}×${b}＝${t * 10 * b}、${o}×${b}＝${o * b}。あわせて ${t * 10 * b}＋${o * b}＝{{${a * b}}} です。`, back: [B_WAKE] }],
  };
}

function mitsumori(r: Rng): QuestionBody {
  let a = r.int(3, 9) * 10 + r.int(6, 9);
  const b = r.int(4, 9);
  if (a % 10 === 0) a += 7;
  const right = a * b;
  const noCarry = Math.floor(a / 10) * b * 10 + ((a % 10) * b) % 10; // くり上がりわすれ
  const opts = r.shuffle([String(right), String(noCarry), String(right + 100), String(Math.floor(right / 10))]);
  const ap = Math.round(a / 10) * 10;
  return {
    prompt: `${a}×${b} の答えを考えます。${a}を${ap}と見て、だいたいの大きさを考えると、正しい答えはどれですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct: opts.indexOf(String(right)),
      why: opts.map((o) =>
        o === String(right)
          ? `${ap}×${b}＝${ap * b} に近く、筆算でも${right}になります。`
          : o === String(noCarry)
            ? "くり上がりをたしわすれた答えです。"
            : o === String(Math.floor(right / 10))
              ? `だいたい${ap * b}なので、けたが1つたりません。`
              : `だいたいの大きさは合っても、筆算すると${right}です。`,
      ),
    },
    point: "だいたいの数で答えの大きさをたしかめる",
    steps: [
      { title: "だいたいの数", body: `${a}を${ap}と見ると、${ap}×${b}＝${ap * b} くらいです。`, back: [B_DAITAI] },
      { title: "筆算する", body: `${a}×${b}＝{{${right}}}。${ap * b}に近いので、大きなまちがいはありません。`, back: [B_AGARI] },
    ],
  };
}

function naka0(r: Rng): QuestionBody {
  const a = r.int(2, 8) * 100 + r.int(2, 9);
  const b = r.int(3, 9);
  return {
    prompt: `${a}×${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], calc: `${a}*${b}` },
    point: "十の位《くらい》が0でも、くり上がりはそこに書く",
    steps: [
      { title: "一の位《くらい》", body: `${a % 10}×${b}＝${(a % 10) * b}。${((a % 10) * b) % 10}を書き、${Math.floor(((a % 10) * b) / 10)}をくり上げます。`, back: [B_AGARI] },
      { title: "十の位《くらい》・百の位《くらい》", body: `十の位《くらい》は 0×${b}＝0 に${Math.floor(((a % 10) * b) / 10)}をたします。百の位《くらい》は ${Math.floor(a / 100)}×${b}＝${Math.floor(a / 100) * b}。答えは {{${a * b}}} です。`, trap: "十の位《くらい》の0×□で、くり上がりをわすれて0と書かないようにします。", back: [B_3KETA] },
    ],
  };
}

function kaimono(r: Rng): QuestionBody {
  const p = r.int(12, 98);
  const k = r.int(3, 9);
  const q = r.int(110, 280);
  const j = r.int(2, 4);
  const [x, cx, y, cy] = r.pick([
    ["えんぴつ", "本", "ノート", "さつ"],
    ["けしゴム", "こ", "ふでばこ", "こ"],
    ["シール", "まい", "絵本", "さつ"],
  ]);
  return {
    prompt: `1${cx}${p}円の${x}を${k}${cx}と、1${cy}${q}円の${y}を${j}${cy}買いました。代金は全部で何円ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(p * k + q * j)], unit: "円", calc: `${p}*${k}+${q}*${j}` },
    point: "それぞれの代金を出してから、たす",
    steps: [
      { title: "それぞれの代金", body: `${x}は ${p}×${k}＝${p * k}（円）、${y}は ${q}×${j}＝${q * j}（円）です。`, back: [B_AGARI, B_3KETA] },
      { title: "あわせる", body: `${p * k}＋${q * j}＝{{${p * k + q * j}}}（円）。` },
    ],
  };
}

export const E_MATH_3_KAKE_HISSAN1_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "かけ算の筆算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "niketa", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: niketa },
        { id: "wakeru", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: wakeru },
        { id: "sanketa", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: sanketa },
        { id: "naka0", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: naka0 },
      ],
    },
    {
      title: "答えをたしかめる・文章の問題",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "mitsumori", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: mitsumori },
        { id: "kaimono", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: kaimono },
      ],
    },
  ],
};
