// アオハルOS: /guide (SEO記事) のデータ型。
// 記事は lib/guide/articles/*.ts に1本1ファイルで置き、lib/guide/index.ts で束ねる。
// 編集長エージェントのブリーフ (想定検索語・見出し・出典・CTA) をそのまま写せる形にしてある。

import type { Segment } from "@/lib/segments";

export type GuideCtaApp = "tensakun" | "shiboriyu" | "mensatsu" | "try" | "parents";

export interface GuideBlockParagraph {
  type: "p";
  text: string;
}
export interface GuideBlockList {
  type: "list";
  ordered?: boolean;
  items: string[];
}
/** 例文・テンプレート。等幅ではなく引用風に表示する */
export interface GuideBlockExample {
  type: "example";
  label?: string;
  text: string;
}
/** 注意書き (日程は募集要項で確認、など) */
export interface GuideBlockNote {
  type: "note";
  text: string;
}
export interface GuideBlockTable {
  type: "table";
  header: string[];
  rows: string[][];
}

export type GuideBlock =
  | GuideBlockParagraph
  | GuideBlockList
  | GuideBlockExample
  | GuideBlockNote
  | GuideBlockTable;

export interface GuideSection {
  /** H2 見出し */
  heading: string;
  blocks: GuideBlock[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideSource {
  label: string;
  url: string;
}

export interface GuideArticle {
  /** URL: /guide/[slug] */
  slug: string;
  title: string;
  /** meta description (120字前後) */
  description: string;
  segment: Segment;
  /** 記事一覧・関連記事のグルーピングに使う */
  topic: "shibo-riyusho" | "shoronbun" | "mensetsu" | "nyushi-seido" | "es" | "tenshoku";
  /** 想定検索語 (SEOの内部メモ。画面には出さない) */
  keywords: string[];
  publishedAt: string; // YYYY-MM-DD
  updatedAt: string; // YYYY-MM-DD
  /** 導入文 (H1直下) */
  lead: string;
  sections: GuideSection[];
  faq: GuideFaq[];
  sources: GuideSource[];
  cta: {
    app: GuideCtaApp;
    heading: string;
    text: string;
    button: string;
  };
  /** 関連記事 slug */
  related?: string[];
}
