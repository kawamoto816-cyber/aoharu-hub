// 小3算数「大きい数（万の位）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 数は位《くらい》ごとの数字から作り、漢数字は同じ数から関数で書く。答えは calc (かけ算・たし算・わり算) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-ookii";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_10KO = L(1, "千が10こで一万");
const B_KUGIRU = L(2, "4けたずつ区切ると読める");
const B_ZERO = L(3, "ない位《くらい》には0を書く");
const B_10BAI = L(4, "10倍・100倍・10でわる");
const B_KURABE = L(5, "大きさをくらべる");

const KD = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
/** 0〜9999 を漢数字 (千・百・十は「一」をつけない) */
function kan4(n: number): string {
  const d = [Math.floor(n / 1000), Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
  const u = ["千", "百", "十", ""];
  return d.map((x, i) => (x === 0 ? "" : (x === 1 && i < 3 ? "" : KD[x]) + u[i])).join("");
}
const kan = (n: number) => (n >= 10000 ? kan4(Math.floor(n / 10000)) + "万" : "") + kan4(n % 10000);

/** 0 のある位《くらい》をまぜた数 (けた数 k) */
function withZero(r: Rng, k: number): number {
  let n = r.int(1, 9);
  for (let i = 1; i < k; i++) n = n * 10 + (r.bool(0.35) ? 0 : r.int(1, 9));
  return n;
}

function toSuji(r: Rng): QuestionBody {
  const n = withZero(r, r.int(5, 8));
  return {
    prompt: `「${kan(n)}」を数字で書きなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], calc: String(n) },
    point: "ない位《くらい》には0を書く",
    steps: [
      { title: "万で区切る", body: `「万」の前が ${Math.floor(n / 10000)}、うしろの4けたが ${String(n % 10000).padStart(4, "0")} です。`, back: [B_KUGIRU] },
      { title: "0をうめる", body: `ない位《くらい》に0を書いて {{${n}}} です。`, trap: "0を書かないと、けたの数がかわってしまいます。", back: [B_ZERO] },
    ],
  };
}

function atsumeru(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const b = r.int(1, 9);
  const c = r.int(1, 9);
  const n = a * 10000 + b * 1000 + c * 10;
  return {
    prompt: `一万を${a}こ、千を${b}こ、十を${c}こ合わせた数を、数字で書きなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], calc: `10000*${a}+1000*${b}+10*${c}` },
    point: "位《くらい》ごとに数字をおき、ない位《くらい》は0",
    steps: [{ title: "位《くらい》にならべる", body: `一万の位《くらい》${a}、千の位《くらい》${b}、百の位《くらい》0、十の位《くらい》${c}、一の位《くらい》0 で {{${n}}} です。`, back: [B_10KO, B_ZERO] }],
  };
}

function senKo(r: Rng): QuestionBody {
  const k = r.int(12, 99);
  return {
    prompt: `1000を${k}こ集めた数はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(1000 * k)], calc: `1000*${k}` },
    point: "千が10こで一万",
    steps: [{ title: "10こずつまとめる", body: `1000が10こで一万。${k}こは、一万が${Math.floor(k / 10)}こと千が${k % 10}こなので {{${1000 * k}}} です。`, back: [B_10KO] }],
  };
}

function bai(r: Rng): QuestionBody {
  const kind = r.int(0, 2);
  const n = kind === 2 ? r.int(12, 999) * 10 : r.int(12, 999);
  const ans = kind === 0 ? n * 10 : kind === 1 ? n * 100 : n / 10;
  const word = kind === 0 ? "10倍した数" : kind === 1 ? "100倍した数" : "10でわった数";
  return {
    prompt: `${n} を${word}はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], calc: kind === 0 ? `${n}*10` : kind === 1 ? `${n}*100` : `${n}/10` },
    point: "10倍で0が1つつく、10でわると0が1つとれる",
    steps: [{ title: "位《くらい》がずれる", body: kind === 2 ? `10でわると位《くらい》が1つ下がり、一の位《くらい》の0が1つとれて {{${ans}}} です。` : `${kind === 0 ? "10倍" : "100倍"}すると位《くらい》が${kind === 0 ? 1 : 2}つ上がり、右に0が${kind === 0 ? 1 : 2}つついて {{${ans}}} です。`, back: [B_10BAI] }],
  };
}

function kuraberu(r: Rng): QuestionBody {
  const top = r.int(2, 8);
  const base = top * 10000 + r.int(1, 8) * 1000;
  const c1 = base + r.int(1, 9) * 100 + r.int(0, 99);
  const c2 = base + r.int(1, 9) * 10 + r.int(0, 9);
  const c3 = r.int(9100, 9999);
  const c4 = base - 1000 + r.int(500, 999);
  const max = c1;
  const options = r.shuffle([c1, c2, c3, c4].map(String));
  return {
    prompt: `次の数の中で、一番大きい数はどれですか。　${[c4, c1, c3, c2].join("、")}`,
    answer: {
      kind: "choice",
      options,
      correct: options.indexOf(String(max)),
      why: options.map((o) =>
        Number(o) === max
          ? `5けたの数で、一万の位《くらい》・千の位《くらい》が同じものの中で、百の位《くらい》が一番大きい。`
          : Number(o) === c3
            ? "上の数字は大きいですが、4けたなので5けたの数より小さい。"
            : Number(o) === c2
              ? `一万の位《くらい》・千の位《くらい》は同じですが、百の位《くらい》が0で、${max}より小さい。`
              : `千の位《くらい》をくらべると、${max}より小さい。`,
      ),
    },
    point: "けたの数→上の位《くらい》から順《じゅん》にくらべる",
    steps: [
      { title: "けたの数", body: `${c3}は4けたなので、5けたの数より小さい。`, back: [B_KURABE] },
      { title: "上の位《くらい》から", body: `5けたの数を一万の位《くらい》・千の位《くらい》・百の位《くらい》と順《じゅん》にくらべると、{{${max}}}が一番大きい。` },
    ],
  };
}

function kugiru(r: Rng): QuestionBody {
  const n = withZero(r, r.int(6, 7));
  const wrong1 = kan(Math.floor(n / 10));
  const wrong2 = kan(n * 10);
  const wrong3 = kan(n + 100000);
  const right = kan(n);
  const ws = [...new Set([wrong1, wrong2, wrong3])].filter((w) => w !== right).slice(0, 3);
  const options = r.shuffle([right, ...ws]);
  return {
    prompt: `${n} の読み方を漢字《かんじ》で書いたものは、どれですか。`,
    answer: { kind: "choice", options, correct: options.indexOf(right), why: options.map((o) => (o === right ? `右から4けたで区切ると ${Math.floor(n / 10000)}｜${String(n % 10000).padStart(4, "0")}。「${right}」です。` : `右から4けたずつ区切って読むと「${right}」です。`)) },
    point: "右から4けたずつ区切ってから読む",
    steps: [{ title: "4けたで区切る", body: `${Math.floor(n / 10000)}｜${String(n % 10000).padStart(4, "0")} と区切り、左に「万」をつけて読みます。{{${right}}}。`, back: [B_KUGIRU] }],
  };
}

export const E_MATH_3_OOKII_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "大きい数の書き方・読み方",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "to-suji", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: toSuji },
        { id: "atsumeru", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: atsumeru },
        { id: "sen-ko", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: senKo },
        { id: "kugiru", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: kugiru },
      ],
    },
    {
      title: "10倍・10でわる、大きさくらべ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "bai", type: "A", difficulty: 2, points: 18, seconds: 60, skill: "知識・技能", generate: bai },
        { id: "kuraberu", type: "A", difficulty: 3, points: 22, seconds: 90, skill: "思考・判断・表現", generate: kuraberu },
      ],
    },
  ],
};
