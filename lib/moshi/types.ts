// 「定期テスト模試」(/learn/moshi) のデータの型。設計: scratchpad/proposals/tenshi-moshi.md の 1-2。
// 作る単位は「大問 (Daimon)」。1単元1ファイル (lib/moshi/data/<単元id>.ts) に、その単元の大問を配列で書く。
// 範囲 (単元 id の並び) を選ぶと、その範囲の大問を並べて「1回分 (Exam)」を組む (lib/moshi/index.ts の buildExam)。
// 図は図解レクチャーの Figure をそのまま使う。レクチャーの図を指すだけなら FigureRef で参照する (データを二重に持たない)。
// 文字列の {{ }} は強調 (レクチャーと同じ。components/lecture/Rich で描く)。

import type { Figure } from "@/lib/lecture/types";
import type { Rng } from "./rng";

/** 教科 */
export type Subject = "sansu" | "math" | "sci" | "eng" | "soc" | "ja";

/** 観点 (通知表の2観点)。結果画面で観点ごとの得点率を出す。 */
export type Skill = "知識・技能" | "思考・判断・表現";

/** レクチャーの図を指す: getLecture(unit).sections[section].figure (section は 0 から数える)。 */
export interface FigureRef {
  ref: { unit: string; section: number };
  /** 図の見出しだけ差しかえたいとき */
  title?: string;
}
export type FigureOrRef = Figure | FigureRef;

export const isFigureRef = (f: FigureOrRef): f is FigureRef => "ref" in f;

/** 大問の頭に置く資料。小問はこれを見て答える。 */
export type Material =
  | { kind: "text"; body: string }
  | { kind: "passage"; lang: "ja" | "en"; title?: string; body: string; notes?: { word: string; meaning: string }[] }
  | { kind: "table"; caption: string; head: string[]; rows: string[][]; source?: string }
  | { kind: "figure"; figure: FigureOrRef };

// ---- 小問の答えの形式 ----

/** 選択。correct が配列なら複数選択 (全部そろって正解)。why は選択肢ごとの理由 (正解の理由も書く)。 */
export interface ChoiceQ {
  kind: "choice";
  /** 2〜6個。「ア〜エ」の記号は画面で付ける */
  options: string[];
  correct: number | number[];
  why: string[];
  /** 誤答 → レクチャーの「よくあるまちがい」の番号 (Lecture.mistakes[i]) */
  mistakeOf?: (number | null)[];
}

/** 数値・式の入力。採点は lib/math/check.ts の judge() (表記ゆれは lib/moshi/grade.ts で受ける)。 */
export interface NumQ {
  kind: "num";
  /** num=整数・分数・小数、surd=√ を含む数、expr=文字式、factor=因数分解、pair=(x, y) など2つの組、roots=2つの解 (順不同) */
  answerKind: "num" | "surd" | "expr" | "factor" | "pair" | "roots";
  /** 答えを文字列で ("4"、"-3/2"、"2√3"、"3x+2y")。pair・roots は2つ */
  answer: string[];
  /** 入力欄の前の言葉 (["x =", "y ="]) */
  labels?: string[];
  /** 入力欄のうしろの単位 ("個"、"cm")。単位は欄の外に書き、入力させない */
  unit?: string;
  /** 検算用: 答えを代入すると成り立つ等式。pair は labels の文字 (なければ x, y)、それ以外は x に代入 (scripts/check-moshi.ts) */
  equations?: string[];
  /** 検算用: 答えを出す計算式 ("120*7+80*8")。計算して answer[0] と一致するか確かめる */
  calc?: string;
}

/** 語句の入力 (用語・漢字・英単語・抜き出し)。 */
export interface TermQ {
  kind: "term";
  /** 正解として認める書き方 (表記ゆれ・別名)。全角半角・空白・大文字小文字は自動でそろえる */
  accept: string[];
  /** hira=ひらがなで答える / kanji=漢字が入っていなければ不正解 */
  script?: "hira" | "kanji" | "any";
  /** 抜き出しの字数 (指定があるとき) */
  chars?: number;
  caseSensitive?: boolean;
  /** 惜しい答え → 「あと一歩」と表示 (点はなし) */
  near?: { text: string; why: string }[];
}

/** 並べかえ。tokens は正しい順で書く (画面ではシャッフルし、タップで順に置く)。 */
export interface OrderQ {
  kind: "order";
  tokens: string[];
  /** 別の正しい順 (tokens の番号の並び) */
  alsoOk?: number[][];
  /** 1つ余分に混ぜる語 (使わない語) */
  distractor?: string;
}

/** 短い記述。無料版は、模範解答と採点基準を見て観点ごとにチェックする自己採点。 */
export interface WrittenQ {
  kind: "written";
  limit?: { max?: number; min?: number; unit: "字" | "語" };
  /** 模範解答 */
  model: string;
  /** 採点基準。points の合計 ＝ 小問の points */
  rubric: {
    label: string;
    points: number;
    /** この語・式が答えにあれば、たぶん満たす (自己採点の目安として表示) */
    keywords?: string[];
  }[];
  /** 最後の答えの数値などを別の欄で自動採点するとき (自己採点の目安として表示。点は rubric で数える) */
  autoPart?: NumQ | TermQ;
  alsoModels?: string[];
}

export type Answer = ChoiceQ | NumQ | TermQ | OrderQ | WrittenQ;
export type QKind = Answer["kind"];

/** 解き方の1ステップ */
export interface SolutionStep {
  title: string;
  /** 1〜3文。{{ }} で強調 */
  body: string;
  figure?: FigureOrRef;
  /** このステップでよく起きるまちがい */
  trap?: string;
  /** わからなければここへ (レクチャーの節 /learn/lecture/<単元>#lec-s<番号>、計算の段 /learn/math/<段>) */
  back?: { label: string; href: string }[];
}

/** 小問 */
export interface Item {
  /** 大問の中で一意 ("1"、"5-2") */
  id: string;
  /** 表示の番号 ("(1)"、"(5)②") */
  no: string;
  /** 問題文 (改行可) */
  prompt: string;
  figure?: FigureOrRef;
  points: number;
  skill: Skill;
  /** この小問が主に使う単元 (大問の units[0] と同じなら省略) */
  unit?: string;
  answer: Answer;
  /** 1〜4 */
  steps: SolutionStep[];
  /** ひとことで: この問題のポイント (40字以内) */
  point: string;
  level: 1 | 2 | 3;
  /** 前の小問の答えを使う (前をまちがえたときの解説に使う) */
  dependsOn?: string;
}

/** 大問 (作る単位) */
export interface Daimon {
  /** "<単元id>/<番号>" */
  id: string;
  subject: Subject;
  /** "中2"。学校の地図の学年の見出しと同じ書き方 */
  grade: string;
  /** 出題範囲 (単元 id。1〜2個)。ファイル名の単元が units[0] */
  units: string[];
  title: string;
  lead: string;
  material?: Material[];
  items: Item[];
  /** items の points の合計 (check-moshi で検算) */
  points: number;
  /** 想定時間 (分) */
  minutes: number;
  style: "mix" | "calc" | "word" | "data" | "reading" | "writing" | "synthesis";
  level: 1 | 2 | 3;
  review: { status: "draft" | "checked" | "reviewed"; by?: string; at?: string };
}

/** 1回分のテスト。いまは範囲から自動で組む (buildExam)。決まった回を書くときもこの形。 */
export interface Exam {
  id: string;
  title: string;
  subject: Subject;
  grade: string;
  kind: "teiki" | "jitsuryoku" | "tangen";
  units: string[];
  minutes: number;
  total: number;
  /** Daimon.id の並び */
  daimon: string[];
  target?: { avg: number; good: number };
}

// =====================================================================
// 単元模試 (全単元共通の基盤)。/learn/moshi/<単元id> で解く。
// 1単元1ファイル lib/moshi/data/<単元id>.ts に `export const XXX: UnitMoshi = {...}` を書き、
//   npx tsx scripts/gen-moshi.ts → npx tsx scripts/check-moshi.ts <単元id>
// (同じファイルに大問 Daimon[] を書く従来の形も、そのまま読める。UnitMoshi がない単元は大問から組む: lib/moshi/unit.ts)
//
// 問題のタイプ (Question.type):
//   A … 生成型。generate(rng) が数値を入れかえた問題を返す (算数・数学・理科の計算)。シードで再現できる
//   B … プール型。節 (MoshiSection) の pick 問だけ、プールからシードで選ぶ (社会・国語・英語の知識)。選択肢も並べかえる
//   C … 固定型。書き下ろしの読解・記述。毎回すべて出す。記述は模範解答と採点観点で自己採点
// 1回分 (Exam) は節ごとに1つの大問 (Daimon) にして、既存の MoshiPlay でそのまま解く (lib/moshi/unit.ts の buildRound)。
// 入試モード・共通テストモードは、questionCatalog() で範囲・難易度・タイプ・目安時間を見て節を組みなおし、buildRound に渡す想定。
// =====================================================================

export type QType = "A" | "B" | "C";
export type Difficulty = 1 | 2 | 3;

/** 問題の中身 (小問1つ分)。A の generate が返す形で、B・C はこれを直接書く */
export interface QuestionBody {
  /** 問題文 (改行可・{{ }} で強調・漢字《かんじ》でルビ) */
  prompt: string;
  figure?: FigureOrRef;
  answer: Answer;
  /** 解き方 1〜4 ステップ */
  steps: SolutionStep[];
  /** ひとことで: この問題のポイント (40字以内) */
  point: string;
}

/** どのタイプにも共通の情報 (出題・時間配分・集計に使う) */
export interface QuestionMeta {
  /** 単元の中で一意 (英小文字とハイフン。"michinori"、"kenpo-9jo") */
  id: string;
  type: QType;
  /** 1=基本 2=標準 3=発展 */
  difficulty: Difficulty;
  points: number;
  /** 目安時間 (秒) */
  seconds: number;
  skill: Skill;
  /** 主に使う単元 (省略＝ファイルの単元) */
  unit?: string;
  /** 表示の番号 (省略＝節の中で (1)(2)… と自動) */
  no?: string;
  /** 前の小問 (同じ節の id) の答えを使う */
  dependsOn?: string;
  tags?: string[];
}

export interface QuestionA extends QuestionMeta {
  type: "A";
  /** 数値を入れかえた問題を作る。同じ rng の並びなら同じ問題を返すこと (Math.random は使わない) */
  generate: (rng: Rng) => QuestionBody;
}
export interface QuestionB extends QuestionMeta, QuestionBody {
  type: "B";
  /** 選択肢の順番を変えない (「すべて正しい」がある・年代順など) */
  keepOrder?: boolean;
}
export interface QuestionC extends QuestionMeta, QuestionBody {
  type: "C";
}
export type Question = QuestionA | QuestionB | QuestionC;

/** 節 (1回分の中の大問1つ分)。同じ資料を見て答える問題、同じタイプの問題をまとめる */
export interface MoshiSection {
  /** 大問の id (省略＝"<単元id>/s<番号>") */
  id?: string;
  title: string;
  lead: string;
  material?: Material[];
  /** B のプールから出す問題数 (省略＝全部)。A・C はいつも全部出る */
  pick?: number;
  questions: Question[];
  style?: Daimon["style"];
  /** 入試モード・共通テストモード・テスト放題 (lib/exam) だけで使う節。単元模試の1回分 (buildUnitRound) には出さない (単元模試を 1回6問・100点のままにする) */
  examOnly?: boolean;
}

/** 1単元の模試 (lib/moshi/data/<単元id>.ts に1つ) */
export interface UnitMoshi {
  unit: string;
  subject: Subject;
  /** 学校の地図の学年の見出し ("小5"、"中1"、"公民的分野") */
  grade: string;
  /** 1回分の目安時間 (分)。省略＝出た問題の seconds の合計 */
  minutes?: number;
  sections: MoshiSection[];
  review: { status: "draft" | "checked" | "reviewed"; by?: string; at?: string };
}
