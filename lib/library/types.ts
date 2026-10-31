import type { Diagram } from "@/lib/learn/types";

// 「知の図書館」の本のカード。表は一言の要約とその本が立てた問い、裏は主張の図解と使い方。
// 書架の地図では、横軸に時代 (year)、縦軸に分野 (field) で並べ、related で影響関係を線で結ぶ。

export type LibraryField = "philosophy" | "science" | "politics" | "economics" | "society" | "international";

export const FIELD_LABEL: Record<LibraryField, string> = {
  philosophy: "哲学・思想",
  science: "科学",
  politics: "政治",
  economics: "経済",
  society: "社会・文化",
  international: "国際・地政学",
};

export interface LibraryBook {
  /** URLに使う (例: kuhn-kagaku-kakumei) */
  id: string;
  /** 邦題 (『』は付けない) */
  title: string;
  author: string;
  /** 並べ替え用の年 (原著の初版。紀元前はマイナス) */
  year: number;
  /** 表示用の年 (例: 1962年, 紀元前4世紀) */
  yearLabel: string;
  field: LibraryField;
  /** 関係する裏面の領域 key (paradigm / kindai / chiseigaku / kokusai / gendai) */
  regions: string[];
  /** 読みやすさ 1=入門 2=標準 3=挑戦 */
  level: 1 | 2 | 3;
  /** 表: 一言の要約 */
  oneLine: string;
  /** 表: この本が立てた問い */
  question: string;
  /** 裏: 主張の図解 */
  diagramTitle: string;
  diagram: Diagram;
  /** 裏: 主張の解説 (3〜4文) */
  points: string;
  /** 裏: 小論文・面接での使い方 (2〜3文) */
  howToUse: string;
  /** 裏: 入り方 (いきなり原典が難しいときの読み方) */
  howToRead: string;
  /** 向いている学部 */
  faculties: string[];
  /** 影響を与えた・受けた本の id */
  related: string[];
  /** 無料で裏まで読める本 */
  free: boolean;
}
