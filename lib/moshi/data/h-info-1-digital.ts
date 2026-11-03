// 情報Ⅰ「デジタル化と2進数」の単元模試 (A: 数値を入れかえる生成型、共通テスト形式)。問題はすべてオリジナル。
// 検算: 2進→10進は「各けたの数字×2の累乗」の和を calc に。10進→2進・2進→16進・2進の足し算は、JS で変換した文字列を
//   正解 (term) にし、解き方の割り算・4けた区切りも同じ値から作る。nビットの通り数は 2^n、必要なビット数は 2^(b−1)＜N≦2^b
//   となる b を、単位の換算は 1KB＝1024B・1B＝8ビットの式を calc に書く (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-digital";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S2 = L(2, "ビットとバイト");
const S3 = L(3, "2進法と10進法の変換");
const S4 = L(4, "16進法：2進数4けたを1文字で");
const S5 = L(5, "情報量の単位");

function toBin(r: Rng): QuestionBody {
  const n = r.int(20, 250);
  const bin = n.toString(2);
  const rows: string[] = [];
  let x = n;
  while (x > 0 && rows.length < 3) {
    rows.push(`${x}÷2＝${Math.floor(x / 2)} 余り ${x % 2}`);
    x = Math.floor(x / 2);
  }
  return {
    prompt: `10進数の ${n} を2進数で表しなさい。`,
    answer: { kind: "term", accept: [bin, bin.padStart(8, "0")], near: [...bin].reverse().join("") === bin ? [] : [{ text: [...bin].reverse().join(""), why: "余りを上から並べています。余りは下から（最後の余りから）順に並べます。" }] },
    point: "2で割り続け、余りを下から順に並べる",
    steps: [
      { title: "2で割り続ける", body: `${rows.join("、")}、… と、商が 0 になるまで続けます。`, back: [S3] },
      { title: "余りを下から並べる", body: `最後の余りから順に並べて {{${bin}}}。`, trap: "余りを上から並べると、けたが逆になる。" },
    ],
  };
}

function toDec(r: Rng): QuestionBody {
  const n = r.int(9, 255);
  const bin = n.toString(2);
  const k = bin.length;
  const terms = [...bin].map((d, i) => `${d}*2^${k - 1 - i}`);
  const used = [...bin].map((d, i) => (d === "1" ? 2 ** (k - 1 - i) : 0)).filter((v) => v);
  return {
    prompt: `2進数の ${bin} を10進数で表しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], calc: terms.join("+") },
    point: "1 が立っている位の重み (1, 2, 4, 8, …) を足す",
    steps: [
      { title: "位の重み", body: `右のけたから 1, 2, 4, 8, … と重みが2倍になります。左はしのけたの重みは ${2 ** (k - 1)}。`, back: [S3] },
      { title: "足す", body: `${used.join(" ＋ ")}＝{{${n}}}。`, trap: "右はしのけたの重みは 1（2⁰）。2 から始めない。" },
    ],
  };
}

function toHex(r: Rng): QuestionBody {
  const n = r.int(17, 255);
  const bin = n.toString(2).padStart(8, "0");
  const hex = n.toString(16).toUpperCase().padStart(2, "0");
  const hi = bin.slice(0, 4);
  const lo = bin.slice(4);
  return {
    prompt: `8ビットの2進数 ${bin} を16進数で表しなさい。`,
    answer: { kind: "term", accept: [hex, hex.replace(/^0/, "")], near: [{ text: String(n), why: `${n} は10進数で表した値です。16進数は 0〜9 と A〜F で表します。` }] },
    point: "右から4けたずつ区切り、それぞれを16進数の1文字に",
    steps: [
      { title: "4けたずつ区切る", body: `${hi} | ${lo}。`, back: [S4] },
      { title: "1文字ずつ置きかえる", body: `${hi}＝${parseInt(hi, 2)}、${lo}＝${parseInt(lo, 2)}。10〜15 は A〜F なので {{${hex}}}。`, trap: "10 以上を「10」「11」と2文字で書かない。A〜F を使う。" },
    ],
  };
}

function bits(r: Rng): QuestionBody {
  if (r.bool()) {
    const n = r.int(3, 12);
    return {
      prompt: `${n}ビットで表せる情報は何通りですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(2 ** n)], unit: "通り", calc: `2^${n}` },
      point: "1ビットふえると2倍。nビットで 2ⁿ 通り",
      steps: [{ title: "2を n 回かける", body: `2 を ${n} 回かけて、2${n}乗＝{{${2 ** n}}} 通り。`.replace(`2${n}乗`, `2^${n}`), back: [S2], trap: `${n}×2＝${2 * n} としない。かけ算ではなく累乗。` }],
    };
  }
  const [what, N] = r.pick([
    ["英大文字（26種類）", 26],
    ["英大文字と英小文字（52種類）", 52],
    ["0〜9 の数字（10種類）", 10],
    ["1年の日付（366通り）", 366],
    ["1クラス 40人の出席番号", 40],
    ["ひらがな（清音・濁音などで 83種類）", 83],
    ["曜日（7種類）", 7],
    ["トランプ（ジョーカーなし 52枚）", 52],
    ["16方位", 16],
    ["一日の時刻（0〜23 時の 24通り）", 24],
    ["都道府県（47）", 47],
    ["1〜1000 の整数", 1000],
  ] as const);
  let b = 0;
  while (2 ** b < N) b++;
  return {
    prompt: `${what}を区別して表すには、最低何ビット必要ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(b)], unit: "ビット", calc: String(b) },
    point: "2ⁿ が区別したい数以上になる最小の n",
    steps: [
      { title: "2の累乗と比べる", body: `2^${b - 1}＝${2 ** (b - 1)} では ${N} に足りず、2^${b}＝${2 ** b} なら足ります。`, back: [S2] },
      { title: "答え", body: `最低 {{${b}}} ビット。`, trap: "ちょうど 2ⁿ にならなくても、足りるまでビットをふやす。" },
    ],
  };
}

function tani(r: Rng): QuestionBody {
  const k = r.int(0, 2);
  if (k === 0) {
    const g = r.int(2, 16);
    return {
      prompt: `${g}GB は何 MB ですか。ただし、1GB＝1024MB とします。`,
      answer: { kind: "num", answerKind: "num", answer: [String(g * 1024)], unit: "MB", calc: `${g}*1024` },
      point: "単位が1つ上がるごとに 1024倍（2¹⁰）",
      steps: [{ title: "1024 をかける", body: `${g}×1024＝{{${g * 1024}}} MB。`, back: [S5], trap: "問題の指示（1024 か 1000 か）を確かめる。" }],
    };
  }
  if (k === 1) {
    const kb = r.int(2, 40);
    return {
      prompt: `${kb}KB は何ビットですか。ただし、1KB＝1024B とします。`,
      answer: { kind: "num", answerKind: "num", answer: [String(kb * 1024 * 8)], unit: "ビット", calc: `${kb}*1024*8` },
      point: "KB → B は ×1024、B → ビットは ×8",
      steps: [
        { title: "バイトに直す", body: `${kb}×1024＝${kb * 1024} B。`, back: [S5, S2] },
        { title: "ビットに直す", body: `${kb * 1024}×8＝{{${kb * 1024 * 8}}} ビット。`, trap: "1バイト＝8ビット。10 や 1024 をかけない。" },
      ],
    };
  }
  const chars = r.pick([256, 512, 1024, 2048, 1536, 3072]);
  const per = r.pick([1, 2]);
  const v = (chars * per) / 1024;
  return {
    prompt: `1文字を ${per}バイトで表す文字コードで、${chars}文字の文章を保存する。データ量は何 KB ですか。ただし、1KB＝1024B とし、文字以外の情報は考えません。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "KB", calc: `${chars}*${per}/1024` },
    point: "文字数 × 1文字のバイト数 ÷ 1024",
    steps: [
      { title: "バイトで出す", body: `${chars}×${per}＝${chars * per} B。`, back: [S5] },
      { title: "KB に直す", body: `${chars * per}÷1024＝{{${v}}} KB。` },
    ],
  };
}

function tasu(r: Rng): QuestionBody {
  const a = r.int(5, 60);
  const b = r.int(5, 60);
  const A = a.toString(2);
  const B = b.toString(2);
  const S = (a + b).toString(2);
  return {
    prompt: `2進数の計算 ${A} ＋ ${B} の結果を2進数で答えなさい。`,
    answer: { kind: "term", accept: [S], near: [{ text: String(a + b), why: "10進数で答えています。結果は2進数で表します。" }] },
    point: "1＋1＝10（くり上がり）。10進に直して確かめる",
    steps: [
      { title: "右のけたから足す", body: "1 ＋ 1＝10 なので、そのけたは 0 にして左のけたに 1 くり上げます。1 ＋ 1 ＋ 1（くり上がり）＝11。", back: [S3] },
      { title: "確かめる", body: `10進数では ${a} ＋ ${b}＝${a + b}。${a + b} を2進数にすると {{${S}}}。`, trap: "くり上がりを忘れて 1＋1＝2 と書かない。2進数に 2 はない。" },
    ],
  };
}

export const H_INFO_1_DIGITAL_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "2進法と16進法",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "to-bin", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: toBin },
        { id: "to-dec", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: toDec },
        { id: "to-hex", type: "A", difficulty: 2, points: 16, seconds: 60, skill: "知識・技能", generate: toHex },
      ],
    },
    {
      title: "情報量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "bits", type: "A", difficulty: 2, points: 16, seconds: 60, skill: "思考・判断・表現", generate: bits },
        { id: "tani", type: "A", difficulty: 2, points: 16, seconds: 75, skill: "知識・技能", generate: tani },
        { id: "tasu", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: tasu },
      ],
    },
  ],
};
