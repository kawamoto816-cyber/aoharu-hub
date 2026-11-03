// 情報Ⅰ「コンピュータのしくみ」の単元模試 (A: 数値・入力を入れかえる生成型 ＋ B: 用語のプール6問からシードで3問)。問題はすべてオリジナル。
// 検算: クロック周波数は GHz×10⁹ (MHz×10⁶) 回、命令の数は 周波数÷(1命令あたりのクロック数) を calc に。論理回路は
//   JS で AND・OR・NOT を計算した出力を答えにし、真理値表の「1 になる行の数」は8通りの入力をすべて計算して数える
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-computer";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ハードウェアとソフトウェア");
const S2 = L(2, "五大装置とデータの流れ");
const S4 = L(4, "CPUは「取り出す→解読→実行」をくり返す");
const S5 = L(5, "速い記憶は小さく、大きい記憶は遅い");
const S6 = L(6, "計算のもとは0と1の論理回路");

function clock(r: Rng): QuestionBody {
  const g = r.int(1, 5);
  if (r.bool(0.5)) {
    return {
      prompt: `クロック周波数 ${g}GHz の CPU では、クロック信号は1秒間に何回ですか。ただし 1GHz＝10⁹Hz とします。`,
      answer: { kind: "num", answerKind: "num", answer: [String(g * 1e9)], unit: "回", calc: `${g}*10^9` },
      point: "Hz は1秒あたりの回数。G は 10⁹（10億）",
      steps: [{ title: "単位を直す", body: `${g}GHz＝${g}×10⁹Hz なので、1秒に {{${g * 10}億}} 回（${g * 1e9} 回）。`, back: [S4], trap: "G（ギガ）は 10⁹。M（メガ）の 10⁶ と取りちがえない。" }],
    };
  }
  const c = r.pick([2, 4, 5]);
  const v = (g * 1e9) / c;
  return {
    prompt: `クロック周波数 ${g}GHz の CPU が、1つの命令を ${c} クロックで実行する。1秒間に実行できる命令の数は何回ですか。ただし 1GHz＝10⁹Hz とします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "回", calc: `${g}*10^9/${c}` },
    point: "1秒のクロック数 ÷ 1命令のクロック数",
    steps: [
      { title: "1秒のクロック数", body: `${g}×10⁹ 回。`, back: [S4] },
      { title: "命令の数", body: `${g}×10⁹÷${c}＝{{${v}}} 回。`, trap: `${c} をかけない。1命令に ${c} クロックかかるので割る。` },
    ],
  };
}

type Gate = { s: string; f: (a: number, b: number, c: number) => number };
const G2: Gate[] = [
  { s: "A AND B", f: (a, b) => a & b },
  { s: "A OR B", f: (a, b) => a | b },
  { s: "(NOT A) AND B", f: (a, b) => (1 - a) & b },
  { s: "A OR (NOT B)", f: (a, b) => a | (1 - b) },
  { s: "NOT (A AND B)", f: (a, b) => 1 - (a & b) },
  { s: "NOT (A OR B)", f: (a, b) => 1 - (a | b) },
];
const G3: Gate[] = [
  { s: "(A AND B) OR C", f: (a, b, c) => (a & b) | c },
  { s: "(A OR B) AND C", f: (a, b, c) => (a | b) & c },
  { s: "(A OR B) AND (NOT C)", f: (a, b, c) => (a | b) & (1 - c) },
  { s: "(A AND B) OR (NOT C)", f: (a, b, c) => (a & b) | (1 - c) },
  { s: "NOT (A OR B) OR C", f: (a, b, c) => (1 - (a | b)) | c },
  { s: "(A AND (NOT B)) OR (B AND C)", f: (a, b, c) => (a & (1 - b)) | (b & c) },
  { s: "A AND B AND C", f: (a, b, c) => a & b & c },
  { s: "A OR B OR C", f: (a, b, c) => a | b | c },
  { s: "(NOT A) AND (B OR C)", f: (a, b, c) => (1 - a) & (b | c) },
  { s: "A OR (B AND C)", f: (a, b, c) => a | (b & c) },
  { s: "(A OR C) AND (NOT B)", f: (a, b, c) => (a | c) & (1 - b) },
  { s: "NOT (A AND B AND C)", f: (a, b, c) => 1 - (a & b & c) },
];

function ronri(r: Rng): QuestionBody {
  const g = r.pick(G2);
  const a = r.int(0, 1);
  const b = r.int(0, 1);
  const y = g.f(a, b, 0);
  // 途中の計算 (NOT やかっこの中を先に)
  const ex: Record<string, string> = {
    "A AND B": `${a} AND ${b}＝${y}`,
    "A OR B": `${a} OR ${b}＝${y}`,
    "(NOT A) AND B": `NOT A＝${1 - a}、${1 - a} AND ${b}＝${y}`,
    "A OR (NOT B)": `NOT B＝${1 - b}、${a} OR ${1 - b}＝${y}`,
    "NOT (A AND B)": `A AND B＝${a & b}、NOT ${a & b}＝${y}`,
    "NOT (A OR B)": `A OR B＝${a | b}、NOT ${a | b}＝${y}`,
  };
  return {
    prompt: `AND 回路は入力が両方 1 のときだけ 1、OR 回路はどちらかが 1 なら 1、NOT 回路は 0 と 1 を反転する。出力 Y＝${g.s} の回路に、A＝${a}、B＝${b} を入力したときの出力 Y を答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(y)], labels: ["Y ="], calc: String(y) },
    point: "かっこの中から順に、0 と 1 を書きこんで計算する",
    steps: [
      { title: "かっこの中から", body: `A＝${a}、B＝${b} を入れ、NOT やかっこの中を先に計算します。`, back: [S6] },
      { title: "出力", body: `${ex[g.s] ?? ""}${ex[g.s] ? "。" : ""}Y＝{{${y}}}。`, trap: g.s.includes("OR") ? "OR は「どちらか一方だけ」ではない。両方 1 でも 1。" : "AND は両方 1 のときだけ 1。片方だけ 1 なら 0。" },
    ],
  };
}

function shinri(r: Rng): QuestionBody {
  const g = r.pick(G3);
  const rows: string[] = [];
  let cnt = 0;
  for (let a = 0; a <= 1; a++)
    for (let b = 0; b <= 1; b++)
      for (let c = 0; c <= 1; c++) {
        const y = g.f(a, b, c);
        if (y) {
          cnt++;
          rows.push(`(${a},${b},${c})`);
        }
      }
  return {
    prompt: `出力 Y＝${g.s} の論理回路がある。入力 A、B、C の 0 と 1 の組み合わせ8通りのうち、出力 Y が 1 になるのは何通りですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(cnt)], unit: "通り", calc: String(cnt) },
    point: "真理値表を8行すべて書いて数える",
    steps: [
      { title: "真理値表をつくる", body: "A、B、C に 000 から 111 までの8通りを入れ、1行ずつ Y を計算します。", back: [S6] },
      { title: "1 になる行", body: `(A,B,C)＝${rows.join("、") || "なし"} の {{${cnt}}} 通り。`, trap: "入力の組み合わせをもれなく書く。3入力なら 2³＝8 通り。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("cpu", 1),
    prompt: "五大装置のうち、CPU（中央処理装置）にまとめられている2つの装置の組み合わせはどれですか。",
    answer: {
      kind: "choice",
      options: ["演算装置と制御装置", "記憶装置と演算装置", "入力装置と出力装置", "制御装置と記憶装置"],
      correct: 0,
      why: ["正しい。計算する演算装置と、ほかの装置に指示を出す制御装置。", "主記憶装置は CPU の外にある。", "入力・出力装置はキーボードやディスプレイなど。", "記憶装置は CPU にふくまれない（CPU の中のレジスタは別）。"],
    },
    point: "CPU＝演算装置＋制御装置",
    steps: [{ title: "五大装置", body: "入力・記憶・{{演算}}・{{制御}}・出力。演算と制御をまとめたものが CPU。", back: [S2] }],
  },
  {
    ...base("os", 1),
    prompt: "機器全体を管理し、アプリケーションソフトウェアと装置の仲立ちをするソフトウェアを何といいますか。",
    answer: { kind: "term", accept: ["OS", "オペレーティングシステム", "オペレーティング・システム", "基本ソフトウェア"] },
    point: "アプリは OS を仲立ちにして装置を使う",
    steps: [{ title: "ソフトウェアの分類", body: "全体を管理する{{OS（オペレーティングシステム）}}と、目的ごとのアプリケーションソフトウェア。", back: [S1] }],
  },
  {
    ...base("memory", 2, "思考・判断・表現"),
    prompt: "文書を作っている途中で停電し、パソコンの電源が切れた。保存していなかった内容が消えたのはなぜですか。",
    answer: {
      kind: "choice",
      options: ["作業中の内容は主記憶装置にあり、主記憶装置は電源が切れると内容が消えるから", "補助記憶装置は電源が切れると内容が消えるから", "CPU のクロック周波数が下がったから", "OS がファイルを自動で削除したから"],
      correct: 0,
      why: ["正しい。実行中のデータは主記憶装置（メインメモリ）にあり、保存しないと補助記憶装置に残らない。", "SSD などの補助記憶装置は電源を切っても内容が残る。", "クロック周波数は内容の保存とは関係がない。", "OS が削除したのではない。主記憶装置の性質による。"],
    },
    point: "主記憶は電源を切ると消える、補助記憶は残る",
    steps: [{ title: "記憶装置のちがい", body: "{{主記憶装置}}は速いが電源を切ると消える。ファイルを残すのは{{補助記憶装置}}（SSD など）。", back: [S5] }],
  },
  {
    ...base("cycle", 2),
    prompt: "CPU が1つの命令を処理するときにくり返す動作の順として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["取り出し → 解読 → 実行", "解読 → 取り出し → 実行", "実行 → 取り出し → 解読", "取り出し → 実行 → 解読"],
      correct: 0,
      why: ["正しい。主記憶装置から命令を取り出し、何をするか解読し、実行して次の命令へ進む。", "取り出す前に解読はできない。", "実行するには、先に命令を取り出して解読する必要がある。", "解読しないと、何を実行するかわからない。"],
    },
    point: "取り出し → 解読 → 実行 をくり返す",
    steps: [{ title: "プログラム内蔵方式", body: "命令もデータと同じく主記憶装置にあり、CPU は{{取り出し・解読・実行}}を高速にくり返します。", back: [S4] }],
  },
  {
    ...base("cache", 3, "思考・判断・表現"),
    prompt: "CPU と主記憶装置の間にキャッシュメモリを置く理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["CPU に比べて主記憶装置が遅いので、よく使うデータを速い記憶に置いて待ち時間を減らすため", "主記憶装置より大きな容量でファイルを長く保存するため", "電源を切ってもデータを残すため", "入力装置からのデータを暗号化するため"],
      correct: 0,
      why: ["正しい。速さの差を埋めるため、よく使うデータを手近な速い記憶に置く。", "キャッシュは容量が小さい。大きく長く保存するのは補助記憶装置。", "キャッシュメモリも電源を切ると消える。", "暗号化とは関係がない。"],
    },
    point: "速い記憶は小さく、大きい記憶は遅い",
    steps: [{ title: "記憶の階層", body: "レジスタ → {{キャッシュ}} → 主記憶 → 補助記憶 の順に、速いが小さい → 遅いが大きい。", back: [S5] }],
  },
  {
    ...base("or-gate", 3, "思考・判断・表現"),
    prompt: "部屋の照明を、入口のスイッチ A と奥のスイッチ B の「どちらか、または両方」がオンのときに点くようにしたい。オンを 1、点灯を 1 とするとき、使う論理回路はどれですか。",
    answer: {
      kind: "choice",
      options: ["OR 回路", "AND 回路", "NOT 回路", "NOT (A OR B) の回路"],
      correct: 0,
      why: ["正しい。どちらかが 1 なら 1、両方 1 でも 1。", "AND 回路は両方オンのときだけ点く。", "NOT 回路は入力が1つで、反転するだけ。", "どちらもオフのときだけ点いてしまう。"],
    },
    point: "どちらか（両方もふくむ）→ OR",
    steps: [{ title: "条件を言いかえる", body: "「どちらか、または両方」は{{OR}}。「両方とも」なら AND。", back: [S6] }],
  },
];

export const H_INFO_1_COMPUTER_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "CPU と論理回路",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "clock", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: clock },
        { id: "ronri", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: ronri },
        { id: "shinri", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: shinri },
      ],
    },
    { title: "コンピュータの構成", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
