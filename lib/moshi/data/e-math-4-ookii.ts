// 小4算数「大きい数（億・兆）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 数は「兆・億・万・一」の4けたの区切りごとに作り、漢数字は同じ数から関数で書く。答えは calc (かけ算・たし算・わり算) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-ookii";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_NAMAE = L(1, "一・万・億・兆は1万倍ずつ");
const B_KUGIRI = L(2, "右から4けたずつ区切って読む");
const B_10KO = L(3, "一億は千万が10こ");
const B_10BAI = L(4, "10倍・10でわると、位が1つずれる");
const B_KEISAN = L(5, "大きい数のたし算とかけ算");

const KD = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
function kan4(n: number): string {
  const d = [Math.floor(n / 1000), Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
  const u = ["千", "百", "十", ""];
  return d.map((x, i) => (x === 0 ? "" : (x === 1 && i < 3 ? "" : KD[x]) + u[i])).join("");
}
const MAN = 10000;
const OKU = MAN * MAN;
const CHO = OKU * MAN;
/** 1兆×10000 未満を漢数字に */
function kan(n: number): string {
  const c = Math.floor(n / CHO);
  const o = Math.floor(n / OKU) % MAN;
  const m = Math.floor(n / MAN) % MAN;
  const i = n % MAN;
  return (c ? kan4(c) + "兆" : "") + (o ? kan4(o) + "億" : "") + (m ? kan4(m) + "万" : "") + kan4(i);
}
/** 4けたの区切り: 0 が多めの数 */
const part = (r: Rng) => (r.bool(0.3) ? 0 : r.bool(0.5) ? r.int(1, 9) * 1000 + r.int(0, 9) * 100 : r.int(1, 9999));
/** 区切りで「3628 0154 …」と書く */
const split4 = (n: number) => String(n).replace(/\B(?=(\d{4})+(?!\d))/g, " ");

function yomu(r: Rng): QuestionBody {
  const n = r.int(1, 999) * OKU + part(r) * MAN + part(r);
  const right = kan(n);
  const ws = [kan(Math.floor(n / 10)), kan(n * 10), kan(n + OKU * 9)].filter((w, i, a) => w !== right && a.indexOf(w) === i);
  const options = r.shuffle([right, ...ws]);
  return {
    prompt: `${n} の読み方を漢字で書いたものは、どれですか。`,
    answer: { kind: "choice", options, correct: options.indexOf(right), why: options.map((o) => (o === right ? `右から4けたずつ区切ると ${split4(n)}。「${right}」です。` : `右から4けたずつ区切って「億」「万」をつけると「${right}」です。`)) },
    point: "右から4けたずつ区切り、万・億・兆をつける",
    steps: [{ title: "4けたで区切る", body: `${split4(n)} と区切り、左から「億」「万」をつけて読みます。{{${right}}}。`, back: [B_KUGIRI] }],
  };
}

function suji(r: Rng): QuestionBody {
  const n = r.int(1, 99) * CHO + part(r) * OKU + part(r) * MAN;
  return {
    prompt: `「${kan(n)}」を数字で書きなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], calc: `${Math.floor(n / CHO)}*${CHO}+${Math.floor(n / OKU) % MAN}*${OKU}+${Math.floor(n / MAN) % MAN}*${MAN}` },
    point: "区切りごとに4けた。ない位は0",
    steps: [
      { title: "区切りごとに", body: `兆の区切り ${Math.floor(n / CHO)}、億の区切り ${String(Math.floor(n / OKU) % MAN).padStart(4, "0")}、万の区切り ${String(Math.floor(n / MAN) % MAN).padStart(4, "0")}、一の区切り 0000。`, back: [B_KUGIRI] },
      { title: "数字にする", body: `{{${n}}}（${split4(n)}）。`, trap: "ない位に0を書かないと、けたがへってしまいます。", back: [B_NAMAE] },
    ],
  };
}

function atsume(r: Rng): QuestionBody {
  const a = r.int(1, 9);
  const b = r.int(1, 9);
  const c = r.int(1, 9);
  const n = a * OKU + b * 10000000 + c * 100000;
  return {
    prompt: `1億を${a}こ、1000万を${b}こ、10万を${c}こ合わせた数を、数字で書きなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], calc: `${a}*100000000+${b}*10000000+${c}*100000` },
    point: "位ごとに数字をおき、ない位は0",
    steps: [{ title: "位にならべる", body: `一億の位${a}、千万の位${b}、百万の位0、十万の位${c}、あとは0。{{${n}}} です。`, back: [B_10KO] }],
  };
}

function bai(r: Rng): QuestionBody {
  const kind = r.int(0, 2);
  const base = r.int(12, 999) * r.pick([MAN, OKU]);
  const [ans, word, calc] =
    kind === 0 ? [base * 10, "10倍", `${base}*10`] : kind === 1 ? [base * 100, "100倍", `${base}*100`] : [base / 10, "10でわった数", `${base}/10`];
  return {
    prompt: kind === 2 ? `${kan(base)}を10でわった数を、漢字で表したものはどれですか。` : `${kan(base)}を${word}した数を、漢字で表したものはどれですか。`,
    answer: (() => {
      const right = kan(ans);
      const ws = [kan(base * 1000), kan(base / 100), kan(base * (kind === 2 ? 10 : 1)), kan(kind === 0 ? base * 100 : kind === 1 ? base * 10 : base / 1000)].filter((w, i, a) => w !== right && a.indexOf(w) === i).slice(0, 3);
      const options = r.shuffle([right, ...ws]);
      return { kind: "choice" as const, options, correct: options.indexOf(right), why: options.map((o) => (o === right ? `${kind === 2 ? "10でわると位が1つ下がり" : `${word}すると位が${kind === 0 ? 1 : 2}つ上がり`}、${right}（${split4(ans)}）です。` : `位のずれる数をたしかめると、${right}です。`)) };
    })(),
    point: "10倍で位が1つ上がる、10でわると1つ下がる",
    steps: [{ title: "位をずらす", body: `${split4(base)} を${kind === 2 ? "10でわる" : word}と ${split4(ans)}。{{${kan(ans)}}}です。（計算：${calc.replace("*", "×").replace("/", "÷")}）`, back: [B_10BAI] }],
  };
}

function okuTasu(r: Rng): QuestionBody {
  const kind = r.bool();
  if (kind) {
    const a = r.int(120, 4800);
    const b = r.int(150, 4900);
    const u = r.pick(["億", "兆"]);
    return {
      prompt: `${a}${u}＋${b}${u} は何${u}ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(a + b)], unit: u, calc: `${a}+${b}` },
      point: "同じ単位どうしで計算する",
      steps: [{ title: `${u}のまとまりでたす`, body: `${u}がいくつ分かで考えて、${a}＋${b}＝${a + b}。{{${a + b}${u}}}です。`, back: [B_KEISAN] }],
    };
  }
  const a = r.int(2, 9);
  const b = r.int(2, 9);
  return {
    prompt: `${a}万×${b}万 は何億ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * b)], unit: "億", calc: `${a}*10000*${b}*10000/100000000` },
    point: "0をとって計算し、あとで0をつける",
    steps: [{ title: "0をとって計算", body: `${a}×${b}＝${a * b}。0が4こと4こで8こつくので ${a * b}00000000、つまり{{${a * b}億}}です。`, trap: `${a * b}万 としない。1万×1万＝1億です。`, back: [B_KEISAN] }],
  };
}

function kakeru(r: Rng): QuestionBody {
  const a = r.int(12, 95);
  const b = r.int(12, 48);
  const [ua, ub, ans] = r.pick([
    ["万", "万", "億"],
    ["億", "万", "兆"],
    ["万", "億", "兆"],
  ]);
  const pa = ua === "万" ? MAN : OKU;
  const pb = ub === "万" ? MAN : OKU;
  const v = a * b;
  return {
    prompt: `${a}${ua}×${b}${ub} は何${ans}ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: ans, calc: `${a}*${pa}*${b}*${pb}/${ans === "億" ? OKU : CHO}` },
    point: "かける数から0をとり、あとで0の数を合わせる",
    steps: [
      { title: "0をとって計算", body: `${a}×${b}＝${v}。`, back: [B_KEISAN] },
      { title: "0の数を合わせる", body: `${ua}は0が${ua === "万" ? 4 : 8}こ、${ub}は0が${ub === "万" ? 4 : 8}こ。合わせて${(ua === "万" ? 4 : 8) + (ub === "万" ? 4 : 8)}こなので、{{${v}${ans}}}です。`, back: [B_NAMAE] },
    ],
  };
}

export const E_MATH_4_OOKII_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "億・兆の読み方と書き方",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "yomu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: yomu },
        { id: "suji", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: suji },
        { id: "atsume", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: atsume },
      ],
    },
    {
      title: "10倍・10でわる、大きい数の計算",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "bai", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: bai },
        { id: "oku-tasu", type: "A", difficulty: 2, points: 18, seconds: 60, skill: "知識・技能", generate: okuTasu },
        { id: "kakeru", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: kakeru },
      ],
    },
  ],
};
