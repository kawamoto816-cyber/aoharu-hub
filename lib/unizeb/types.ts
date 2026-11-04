// ゼロワンOSユース版（ユニゼブ）の教科書まわりのデータの型。
// 図解レクチャーは lib/lecture/types.ts の Lecture をそのまま使う（unit は "unizeb-<カードid>"）。
// 起業家列伝・ケース・資料集は、節を LectureSection で書き、図は lib/lecture の図の部品でそのまま描く。

import type { LectureSection, Figure, ComicArt } from "@/lib/lecture/types";

/** 出典（実在の人・会社・制度の事実はすべてここにたどれるようにする） */
export interface Source {
  title: string;
  url: string;
  /** 確かめた日（YYYY-MM-DD） */
  checked: string;
}

/** スキルカードへのつなぎ（id は小文字 "z1-01" の形） */
export interface SkillLink {
  card: string;
  /** その人・その場面で、このスキルがどう使われたか（1〜2文） */
  how: string;
}

/** 起業家列伝（/learn/unizeb/den/<id>） */
export interface Den {
  id: string;
  name: string;
  /** よみ（ひらがな） */
  yomi: string;
  /** 生没年（存命は生年のみ。例「1851〜1919年」「1987年生まれ」） */
  years: string;
  country: string;
  era: "明治" | "戦後" | "平成" | "現代";
  field: string;
  /** 興した事業・会社 */
  company: string;
  /** 副題（何をした人かが分かる一文、30〜50字） */
  title: string;
  /** 導入（高校生の関心から入る、2〜3文） */
  hook: string;
  /** 年表 → 0→1の場面 → つまずきと立て直し の順の節（3〜4節）。図は timeline と cause/flow を必ず含む */
  sections: LectureSection[];
  /** 使ったスキル（2〜4枚） */
  skills: SkillLink[];
  /** 今の高校生・大学生が持ち帰れること（2〜3個、各1文） */
  takeaways: string[];
  /** 確認の問い（2個） */
  check: { q: string; a: string; why: string }[];
  /** 書き方の注（何が確かめた事実で、どこに諸説があるか） */
  note: string;
  sources: Source[];
}

/** ケーススタディー（/learn/unizeb/case/<id>） */
export interface CaseStudy {
  id: string;
  title: string;
  /** 実在の企業のケースか、架空のケースか */
  real: boolean;
  lvBand: "1-3" | "4-9" | "10-15";
  /** 状況（数字つき）。body は2〜4文、reading は本文の段落 */
  situation: { body: string; reading?: string[]; figure?: Figure };
  /** 問い（あなたならどうする？） */
  question: string;
  /** 選択肢3つ。それぞれの利点と危うさ */
  options: { label: string; plus: string; minus: string }[];
  /** 実際の判断と結果（架空のケースは「架空の結末」として書く） */
  outcome: { body: string; reading?: string[]; figure?: Figure };
  /** 学び（スキルカードへ） */
  lessons: SkillLink[];
  /** 考えるための問い（1〜2個。正解が1つに決まらなくてよい） */
  think?: string[];
  /** 架空なら「この話は架空です…」、実在なら事実と出典の範囲 */
  note: string;
  sources: Source[];
}

/**
 * ゼロイチ・エピソード（/learn/unizeb/ep/<id>）：実在の会社の、創業期（0→1）の決断の場面を1つだけ短く描く教材。
 * ページの順：場面 → 問い → 選ぶ前に考える（options）→ 実際の決断 → その後 → スキル → 考える問い → 出典。
 * 決断とその後は、選択肢を読んで自分で決めるまでたたんでおく。
 * 事実（年・数字・出来事）は、sources を実際に開いて確かめたものだけ。Wikipedia だけが根拠の事実は書かない。
 * 直接引用・評価の断定・存命の人の私生活・最新の数字は書かない（過去の数字は「◯年時点」と年を添える）。
 */
export interface Episode {
  id: string;
  /** 設計表（design/den.json の episodes）の no。目次の並び順 */
  no: number;
  /** 場面がひと目で分かる題（12〜20字） */
  title: string;
  /** 会社（当時の名前を括弧で。例「ヤマト運輸（当時は大和運輸）」） */
  company: string;
  /** 決断の年（例「1976年」「1994〜1995年」） */
  year: string;
  /** 決断の前の場面。body は2〜3文の要点、reading は2段落（1段落120〜260字）、figure は1つ（cause・compare・flow など） */
  situation: { body: string; reading: string[]; figure: Figure };
  /** 問い（あなたならどうする？ 1〜2文） */
  question: string;
  /** 選ぶ前に考える案（2〜3）。label は15字まで、plus・minus は各1〜2文。考えるための教材として作ったもの */
  options: { label: string; plus: string; minus: string }[];
  /** 実際に選んだこと（出典にある事実だけ）。body 2〜3文、reading 0〜1段落 */
  decision: { body: string; reading?: string[] };
  /** その後（出典にある事実だけ。最新の数字は書かない）。body 2〜3文、reading 0〜1段落、figure は任意（timeline など） */
  after: { body: string; reading?: string[]; figure?: Figure };
  /** この場面で使われたスキル（2〜3枚。id は小文字） */
  skills: SkillLink[];
  /** 考える問い（1〜2個。正解が1つに決まらなくてよい） */
  think: string[];
  /** 書き方の注（何が出典で確かめた事実で、何を書かなかったか） */
  note: string;
  sources: Source[];
}

/** 資料集の1章（/learn/unizeb/shiryo#ch<n>） */
export interface ShiryoChapter {
  ch: number;
  /** URL のかけら（例 "hojin"） */
  slug: string;
  title: string;
  /** 章のはじめ（2〜3文） */
  intro: string;
  items: ShiryoItem[];
}

export interface ShiryoItem {
  heading: string;
  /** 要点（2〜4文） */
  body: string;
  reading?: string[];
  figure?: Figure;
  /** 18歳以上と未満で扱いが分かれる所 */
  ageSplit?: boolean;
  sources: Source[];
}

/** 場面イラストに足せる、起業の小道具（components/unizeb/Scene.tsx が描く） */
export type UzProp =
  | "stall" | "cashbox" | "laptop" | "phone" | "chartUp" | "chartDown" | "sticky" | "shop" | "boxes"
  | "ledger" | "receipt" | "stopwatch" | "piggy" | "megaphone" | "calendar" | "crepe" | "coins" | "bag"
  | "flyer" | "speech" | "clock" | "scale" | "folder" | "mail" | "bulbIdea" | "check" | "cross";

/**
 * 場面イラスト（オリジナル）。4コマと同じ絵の部品（ComicArt）に、起業の小道具（extras）を重ねて1枚の絵にする。
 * ふきだしは使わない（文字は extras の text・labels に短く）。
 */
export interface Scene {
  /** 何番目の節（0から）の本文のあとに置くか */
  at: number;
  /** 絵の説明（本文のどこと関係するか。1〜2文） */
  caption: string;
  /** 読み上げ用の絵の説明 */
  alt: string;
  art: ComicArt;
  /** x 0〜340、y 0〜280、s は大きさ。text は札・画面・ふせんなどに書く短い字（8字まで） */
  extras?: { kind: UzProp; x: number; y: number; s?: number; text?: string }[];
  /** 絵の中の短い注記（12字まで） */
  labels?: { x: number; y: number; text: string; tone?: "navy" | "red" | "blue" }[];
}

/** ページごとの場面イラスト（キーは "lec/z1-01"・"den/<id>"・"case/<id>"・"ep/<id>"。エピソードは at 0＝場面、1＝決断とその後） */
export type SceneBook = Record<string, Scene[]>;

/**
 * 演習（/learn/unizeb/enshu/<id>）：実務のワークブック。架空の事業の資料を読み、そのLvのスキルを組み合わせて課題に取り組む。
 * 採点はカードと同じ（AIは観点ごとに0〜4、点と合否はアプリ・サーバーが計算）。合格した答案はスキルアセットとして残る。
 * id：Lvごとの演習は "lv1"〜"lv15"、節目の修了演習は "shuryo-1"（Lv3）・"shuryo-2"（Lv9）・"shuryo-3"（Lv15）。
 */
export interface Enshu {
  id: string;
  kind: "unit" | "shuryo";
  /** 対象の Lv（修了演習は節目の Lv） */
  lv: number;
  title: string;
  /** はじめの説明（何の力を見るか、2〜3文） */
  intro: string;
  /** 目安の時間（例「40〜60分」）。18歳未満は22時までに終える案内を画面が足す */
  time: string;
  /** 合格点（カードと同じ基準。Lv1〜9は70） */
  pass: number;
  /** 架空の事業（会社・店・団体）。実在の名前は使わない */
  company: { name: string; summary: string };
  /** 資料（数字・お客さんの声・状況）。文の中の [[name]] は variants の値に置きかわる */
  materials: EnshuMaterial[];
  /** 数字を変えた版（再挑戦のとき別の版を出す）。3つ以上 */
  variants: Record<string, number>[];
  tasks: EnshuTask[];
  /** 修了演習で合格したときに認定される位階（例「事業の種カード」） */
  award?: string;
}

export interface EnshuMaterial {
  title: string;
  body?: string;
  figure?: Figure;
  /** 表（見出し＋行）。セルの [[name]] も置きかわる */
  table?: { head: string[]; rows: string[][] };
}

export interface EnshuTask {
  /** 課題の番号（"1"〜） */
  no: string;
  /** 主に使うスキル（カード id。1〜3枚） */
  skills: string[];
  /** 課題文（[[name]] 可） */
  prompt: string;
  /** 答え方："calc" 数を1つ（自動で採点）／"write" 文章（AI採点）／"choice" 選んで理由（AI採点） */
  type: "calc" | "write" | "choice";
  /** calc：正しい値の式（variants の名前と数字と + - * / ( ) だけ。例 "price * count - cost"）。単位 */
  calc?: { expr: string; unit: string; tolerance?: number };
  /** choice：選択肢 */
  options?: string[];
  /** 入力欄の説明（例「150〜250字」） */
  hint?: string;
  /** write・choice の観点（配点 w の合計は、全課題の calc の配点と合わせて100） */
  crit: { t: string; w: number; g4: string; g2: string; minChars?: number }[];
  /** 模範解答の例（採点のあとに見せる。答えの丸写しは足切り） */
  model: string;
  /** 読み直す所（レクチャーの節。例 "/learn/unizeb/lec/z6-01#lec-s2"。2つ以上なら配列） */
  review?: string | string[];
}
