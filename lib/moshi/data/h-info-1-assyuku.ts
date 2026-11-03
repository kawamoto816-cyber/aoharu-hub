// 情報Ⅰ「データの圧縮」の単元模試 (A: 数値・文字列を入れかえる生成型 ＋ B: 用語のプール)。問題はすべてオリジナル。
// 検算: 圧縮率は 圧縮後÷圧縮前×100 を calc に (先に整数の % を決めて圧縮後の大きさを作る)。ランレングスは連続の個数 (1〜9) を
//   先に決めて文字列を組み立て、「記号＋個数」の長さ÷元の長さ×100 を calc に (元の長さは 10・20・25 文字にそろえる)。
//   ハフマン符号は出現回数の多い順に 0・10・110・111 を割り当て、回数×符号の長さの和を calc に。復号は文字列を先に決めて符号を
//   つなげ、その文字列を正解 (term) にする (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-assyuku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "元に戻せる圧縮と、戻せない圧縮");
const S2 = L(2, "圧縮率は「圧縮後 ÷ 圧縮前」");
const S3 = L(3, "ランレングス圧縮：連続を「記号＋個数」に");
const S4 = L(4, "ハフマン符号化：よく出る文字ほど短い符号");
const S5 = L(5, "モールス符号");
const S6 = L(6, "非可逆圧縮：気づきにくい情報を捨てる");

function ritsu(r: Rng): QuestionBody {
  const before = r.pick([200, 250, 400, 500, 600, 800, 1000, 1200, 1500, 2000]);
  const pct = r.pick([10, 20, 25, 30, 40, 50, 60, 75, 80]);
  const after = (before * pct) / 100;
  if (!Number.isInteger(after)) return ritsu(r);
  const askAfter = r.bool(0.4);
  if (askAfter)
    return {
      prompt: `${before}KB のファイルを、圧縮率 ${pct}% で圧縮した。圧縮後のデータ量は何 KB ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(after)], unit: "KB", calc: `${before}*${pct}/100` },
      point: "圧縮率は「元の何%になったか」",
      steps: [{ title: "元の大きさ×圧縮率", body: `${before}×${pct}/100＝{{${after}}} KB。`, back: [S2], trap: `${pct}% 減るのではない。元の ${pct}% の大きさになる。` }],
    };
  return {
    prompt: `${before}KB のファイルを圧縮したところ、${after}KB になった。圧縮率は何%ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(pct)], unit: "%", calc: `${after}/${before}*100` },
    point: "圧縮率＝圧縮後÷圧縮前×100",
    steps: [{ title: "公式に入れる", body: `${after}÷${before}×100＝{{${pct}}}%。`, back: [S2], trap: `減った量（${before - after}KB）で計算しない。圧縮率は数値が小さいほどよく縮んでいる。` }],
  };
}

function rle(r: Rng): QuestionBody {
  const total = r.pick([10, 20, 25]);
  const syms = r.pick([["W", "B"], ["A", "B"], ["白", "黒"], ["X", "O"]] as const);
  // 個数 1〜9 の連続を、合計 total になるまで並べる (となりは別の記号)
  const runs: number[] = [];
  let left = total;
  while (left > 0) {
    const n = Math.min(left, r.int(1, 9));
    runs.push(n);
    left -= n;
  }
  const first = r.int(0, 1);
  const str = runs.map((n, i) => syms[(first + i) % 2].repeat(n)).join("");
  const enc = runs.map((n, i) => `${syms[(first + i) % 2]}${n}`).join("");
  const encLen = 2 * runs.length;
  const pct = (encLen * 100) / total;
  return {
    prompt: `次の ${total}文字のデータを、「記号＋個数」で表すランレングス圧縮で圧縮する（個数は1けたの数字1文字で表す）。圧縮後の文字数は元の文字数の何%ですか。\n${str}`,
    answer: { kind: "num", answerKind: "num", answer: [String(pct)], unit: "%", calc: `${encLen}/${total}*100` },
    point: "連続のかたまり1つが「記号＋個数」の2文字",
    steps: [
      { title: "連続に分ける", body: `{{${enc}}} の ${encLen}文字になります。`, back: [S3] },
      { title: "圧縮率", body: `${encLen}÷${total}×100＝{{${pct}}}%。${pct > 100 ? "連続が少ないので、かえって長くなっています。" : ""}`, trap: "連続が短いと、圧縮後のほうが長くなることもある。" },
    ],
  };
}

const LET = ["A", "B", "C", "D"];
const CODE = ["0", "10", "110", "111"];

function hufBits(r: Rng): QuestionBody {
  // 3位と4位の回数の和が1位より少ないときだけ、0・10・110・111 が本当のハフマン符号 (最短) になる。
  // そうでないと (例: 12, 8, 7, 6) 2ビット固定のほうが短く、ハフマン符号化の答えと食いちがう
  let counts = r.sample([2, 3, 4, 5, 6, 7, 8, 9, 10, 12], 4).sort((x, y) => y - x);
  for (let i = 0; i < 50 && counts[2] + counts[3] >= counts[0]; i++) counts = r.sample([2, 3, 4, 5, 6, 7, 8, 9, 10, 12], 4).sort((x, y) => y - x);
  if (counts[2] + counts[3] >= counts[0]) counts = [10, 8, 6, 3];
  const order = r.shuffle(LET);
  const lens = CODE.map((c) => c.length);
  const total = counts.reduce((a, c, i) => a + c * lens[i], 0);
  const n = counts.reduce((a, c) => a + c, 0);
  return {
    prompt: `${order.map((ch, i) => `${ch}が${counts[i]}回`).join("、")}出てくる、合計 ${n}文字のデータがある。出現回数の多い文字から順に、符号 0、10、110、111 を割り当てるハフマン符号化で表すと、全体は何ビットになりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(total)], unit: "ビット", calc: counts.map((c, i) => `${c}*${lens[i]}`).join("+") },
    point: "回数×符号の長さ を文字ごとに足す",
    steps: [
      { title: "符号を割り当てる", body: order.map((ch, i) => `${ch}＝${CODE[i]}`).join("、") + "。", back: [S4] },
      { title: "足し合わせる", body: `${counts.map((c, i) => `${c}×${lens[i]}`).join(" ＋ ")}＝{{${total}}} ビット。2ビットずつ固定なら ${2 * n} ビット。`, trap: "よく出る文字ほど短い符号。回数の少ない文字に 0 を割り当てない。" },
    ],
  };
}

function hufDecode(r: Rng): QuestionBody {
  const len = r.int(4, 6);
  let word = "";
  for (let i = 0; i < len; i++) word += r.pick(["A", "A", "B", "C", "D"]);
  const bits = [...word].map((c) => CODE[LET.indexOf(c)]).join("");
  return {
    prompt: `A＝0、B＝10、C＝110、D＝111 と符号化したとき、ビット列 ${bits} が表す文字列を答えなさい。`,
    answer: { kind: "term", accept: [word] },
    point: "どの符号もほかの符号の頭になっていないので、先頭から一通りに読める",
    steps: [
      { title: "先頭から区切る", body: "0 なら A。1 なら次を見て、10 なら B。11 ならさらに次を見て、110 は C、111 は D。", back: [S4] },
      { title: "区切った結果", body: `${[...word].map((c) => CODE[LET.indexOf(c)]).join(" | ")} → {{${word}}}。`, trap: "途中から区切り始めない。必ず先頭から順に読む。" },
    ],
  };
}

const P = { 1: 15, 2: 16, 3: 22 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("kagyaku", 1),
    prompt: "次のうち、ふつう非可逆圧縮が使われるファイル形式はどれですか。",
    answer: {
      kind: "choice",
      options: ["JPEG", "PNG", "ZIP", "GIF"],
      correct: 0,
      why: ["正しい。写真の細かい模様や色の変化を粗くしてデータ量を減らす非可逆圧縮。", "PNG は元に戻せる可逆圧縮。", "ZIP は文書やプログラムにも使う可逆圧縮。", "GIF は可逆圧縮（色数は 256色まで）。"],
    },
    point: "JPEG・MP3 は非可逆、PNG・GIF・ZIP は可逆",
    steps: [{ title: "形式を見分ける", body: "人が気づきにくい情報を捨てるのが{{非可逆圧縮}}（JPEG・MP3 など）。元にもどせるのが{{可逆圧縮}}（PNG・GIF・ZIP）。", back: [S1, S6] }],
  },
  {
    ...base("bunsho", 1),
    prompt: "文書ファイルやプログラムを圧縮するときに、可逆圧縮を使う理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["1文字でも変わると意味や動作が変わってしまうから", "非可逆圧縮より必ずデータ量が小さくなるから", "文字は画像よりデータ量が大きいから", "可逆圧縮は圧縮にかかる時間が0だから"],
      correct: 0,
      why: ["正しい。元とまったく同じに戻せないと困るデータには可逆圧縮を使う。", "非可逆圧縮のほうがデータ量を大きく減らせることが多い。", "文字のデータ量は一般に画像より小さい。", "可逆圧縮にも処理の時間はかかる。"],
    },
    point: "完全に元へ戻す必要があるデータは可逆圧縮",
    steps: [{ title: "目的で選ぶ", body: "文書やプログラムは{{1文字のちがいで意味が変わる}}ので、元に戻せる可逆圧縮を使います。", back: [S1] }],
  },
  {
    ...base("morse", 2, "思考・判断・表現"),
    prompt: "モールス符号で、英語で最もよく使われる E が「・」1つで表されているのは、どんな考え方によるものですか。",
    answer: {
      kind: "choice",
      options: ["よく出る文字ほど短い符号にして、全体を短くする", "アルファベット順に短い符号を割り当てる", "母音だけを短い符号にする", "どの文字も同じ長さにして区切りをなくす"],
      correct: 0,
      why: ["正しい。ハフマン符号化と同じ「よく出るものを短く」という考え方（可変長符号）。", "A から順ではない。E や T が最も短い。", "T（子音）も「－」1つで短い。", "長さがちがう可変長符号なので、文字の間に「間」を空けて区切る。"],
    },
    point: "モールス符号もハフマン符号化も「よく出るものを短く」",
    steps: [{ title: "共通の考え方", body: "よく出る E・T を最も短くし、まれな Q・Z・J は長くしています。{{可変長符号}}の考え方です。", back: [S5] }],
  },
  {
    ...base("hikagyaku-ritsu", 2, "思考・判断・表現"),
    prompt: "写真を非可逆圧縮で保存するとき、圧縮率を小さくする（より小さく縮める）とどうなりますか。",
    answer: {
      kind: "choice",
      options: ["データ量は減るが画質は下がり、捨てた情報は戻らない", "データ量も画質も変わらない", "画質を保ったまま、あとで元の写真に戻せる", "データ量がふえて画質が上がる"],
      correct: 0,
      why: ["正しい。気づきにくい情報を多く捨てるほど小さくなるが、画質は下がる。", "圧縮率を変えればデータ量も画質も変わる。", "非可逆圧縮で捨てた情報は二度と戻らない。", "圧縮率を小さくするとデータ量は減る。"],
    },
    point: "非可逆圧縮は、小さくするほど画質が下がる",
    steps: [{ title: "引きかえの関係", body: "圧縮率を小さくするほど{{画質は下がり}}、捨てた情報は{{二度と戻りません}}。", back: [S6, S2] }],
  },
];

export const H_INFO_1_ASSYUKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "圧縮率とランレングス圧縮",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "ritsu", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: ritsu },
        { id: "rle", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: rle },
      ],
    },
    {
      title: "ハフマン符号化",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "huf-decode", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: hufDecode },
        { id: "huf-bits", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: hufBits },
      ],
    },
    { title: "可逆圧縮と非可逆圧縮", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
