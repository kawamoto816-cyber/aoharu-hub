import type { NijiDaimon, NijiExam, NijiItem } from "@/lib/niji/types";

// 公立高校入試の過去問チャレンジ：都道府県ごとのデータを作るための共通の部品（東京 tokyo-2026.ts のあとに作った県で使う）。
// 問題文・選択肢・図は写さない。設問の名前は内容の短い言いかえ。正答（記号・数・語）と配点は公式のとおり。
// えらぶ設問の why（正解の中身と理由）と、記述のチェック表・解答例は、アオハルが書いたもの。

export type Sel = NonNullable<NijiItem["sel"]>;
export const KANA4 = ["ア", "イ", "ウ", "エ"];
/** 1〜n の番号でえらぶ設問の選択肢 */
export const N = (n: number) =>
  Array.from({ length: n }, (_, i) => String(i + 1));

type Opt = { opts?: string[]; why?: string; skill?: string };
const extra = (o: Opt) => ({
  ...(o.why ? { why: o.why } : {}),
  ...(o.skill ? { skill: o.skill } : {}),
});

/** えらぶ設問（記号・番号を1つ）。選択肢は省くと 1〜4 */
export const ch = (
  id: string,
  name: string,
  pt: number,
  unit: string,
  ok: string,
  o: Opt = {},
): NijiItem => ({
  id,
  name,
  pt,
  unit,
  ans: ok,
  sel: [{ opts: o.opts ?? N(4), ok }],
  ...extra(o),
});

/** えらぶ欄が2つ以上（全部そろって正解）。parts は [欄の名前, 正解] */
export const chs = (
  id: string,
  name: string,
  pt: number,
  unit: string,
  parts: [string, string][],
  o: Opt = {},
): NijiItem => ({
  id,
  name,
  pt,
  unit,
  ans: parts.map(([l, ok]) => `${l} ${ok}`).join("　"),
  sel: parts.map(([label, ok]) => ({ label, opts: o.opts ?? N(4), ok })),
  ...extra(o),
});

/** 順にならべる（全部そろって正解） */
export const order = (
  id: string,
  name: string,
  pt: number,
  unit: string,
  seq: string[],
  o: Opt = {},
): NijiItem => ({
  id,
  name,
  pt,
  unit,
  ans: seq.join(" → "),
  sel: seq.map((ok, i) => ({
    label: `${i + 1}番目`,
    opts: o.opts ?? N(seq.length),
    ok,
  })),
  ...extra(o),
});

/** 書いて答える（語句・数・式）。正答と合えば自動で ○、合わなければ自分で見くらべる */
export const tx = (
  id: string,
  name: string,
  pt: number,
  unit: string,
  ans: string,
  o: Omit<Opt, "opts"> = {},
): NijiItem => ({
  id,
  name,
  pt,
  unit,
  ans,
  ...extra(o),
});

/** 画面では答えられない（作図・グラフ）。紙にかいて、採点のときに ○× */
export const paper = (
  id: string,
  name: string,
  pt: number,
  unit: string,
  ans: string,
): NijiItem => ({ id, name, pt, unit, ans, paper: true });

/** 記述：チェック表 [書けた項目, 点] と解答例（アオハルが書いたもの） */
export const wr = (
  id: string,
  name: string,
  unit: string,
  steps: [string, number][],
  ex: string[],
  o: { lesson?: string; skill?: string } = {},
): NijiItem => ({
  id,
  name,
  pt: steps.reduce((x, s) => x + s[1], 0),
  unit,
  steps,
  ex,
  ...(o.lesson ? { lesson: o.lesson } : {}),
  ...(o.skill ? { skill: o.skill } : {}),
});

export const dai = (
  no: string,
  theme: string,
  minutes: number,
  items: NijiItem[],
): NijiDaimon => ({ no, theme, minutes, blocks: [{ title: "設問", items }] });

export interface KokoPref {
  /** 例 aomori-2026（科目の id はこのあとに -kokugo などが付く） */
  id: string;
  /** 例 青森県立高校 */
  univ: string;
  year: string;
  kind: string;
  /** 例 青森県教育委員会 */
  pageOwner: string;
  page: string;
  pageLabel: string;
  pointsNote?: string;
}

export interface KokoSubject {
  key: string;
  subject: string;
  minutes: number;
  /** 省くと、入れた設問の点の合計 */
  total?: number;
  style?: "kijutsu";
  /** 科目ごとの問題 PDF */
  qPage: string;
  checked: string;
  timeNote?: string;
  daimon: NijiDaimon[];
}

export const kokoExam = (p: KokoPref, s: KokoSubject): NijiExam => ({
  id: `${p.id}-${s.key}`,
  univ: p.univ,
  year: p.year,
  kind: p.kind,
  subject: s.subject,
  minutes: s.minutes,
  total:
    s.total ??
    s.daimon.reduce(
      (a, d) =>
        a +
        d.blocks.reduce(
          (x, b) => x + b.items.reduce((y, it) => y + it.pt, 0),
          0,
        ),
      0,
    ),
  ...(s.style ? { style: s.style } : {}),
  ...(s.timeNote ? { timeNote: s.timeNote } : {}),
  base: "koko",
  pageOwner: p.pageOwner,
  pointsNote:
    p.pointsNote ??
    `設問ごとの配点は、${p.pageOwner}の採点基準・正答表のとおりです。記述の部分点（チェック表の点）だけは、アオハルの目安です。`,
  page: p.page,
  qPage: s.qPage,
  pageLabel: p.pageLabel,
  checked: s.checked,
  daimon: s.daimon,
});

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
/** 数字をマークする欄（あ＝1、い＝1 など）。全部そろって正解。ans は答えの見せ方 */
export const marks = (
  id: string,
  name: string,
  pt: number,
  unit: string,
  pairs: [string, string][],
  ans: string,
  o: Omit<Opt, "opts"> = {},
): NijiItem => ({
  id,
  name,
  pt,
  unit,
  ans,
  sel: pairs.map(([label, ok]) => ({ label, opts: DIGITS, ok })),
  ...extra(o),
});
