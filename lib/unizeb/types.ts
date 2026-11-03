// ゼロワンOSユース版（ユニゼブ）の教科書まわりのデータの型。
// 図解レクチャーは lib/lecture/types.ts の Lecture をそのまま使う（unit は "unizeb-<カードid>"）。
// 起業家列伝・ケース・資料集は、節を LectureSection で書き、図は lib/lecture の図の部品でそのまま描く。

import type { LectureSection, Figure } from "@/lib/lecture/types";

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
