// 名作映画で学ぶ英語（試作）のデータの型。
// 1作品 = EigaFilm。セリフは1行ずつ EigaLine（時刻は動画の秒）。字幕・訳・解説はすべて自分たちで書いたもの。

/** 解説の難しさ：1 = 中学で習う、2 = 高校で習う、3 = 映画・古い英語ならでは */
export type NoteLevel = 1 | 2 | 3;

/** 1行の中の言い回し・単語・熟語の解説 */
export interface EigaNote {
  /** 英文の中の言い回し（英文にそのまま出てくる形） */
  phrase: string;
  /** 日本語の意味 */
  meaning: string;
  /** 言い回し・文法・使い方の短い説明。古い言い方なら「今はこう言う」も */
  explain: string;
  level: NoteLevel;
}

/** セリフ1行 */
export interface EigaLine {
  /** 作品の中で一意（例 "lp-001"） */
  id: string;
  /** 動画の秒（小数可） */
  start: number;
  end: number;
  /** 役名（俳優名は書かない） */
  speaker: string;
  /** 英文。聞き取れない所は [inaudible] */
  en: string;
  /** 自然な日本語訳 */
  ja: string;
  notes: EigaNote[];
  /** 暗唱のおすすめ */
  keep?: boolean;
  /** 今の基準で配慮が必要な描き方への短い注（時代背景など） */
  care?: string;
}

/** 歌の場面（歌詞は書き起こさず「（歌）」とだけ出す） */
export interface EigaSong {
  start: number;
  end: number;
}

export interface EigaFilm {
  /** URL・保存のキー（例 "little-princess"） */
  id: string;
  /** 画面に出す題名 */
  title: string;
  /** 映像の URL（自分たちのサーバーには置かず、公開元から直接再生） */
  videoSrc: string;
  /** 映像の出どころの表示 */
  videoCredit: string;
  /** 試作で使う範囲の終わり（秒）。ここまで見たら「最後まで見た」 */
  sampleEnd: number;
  lines: EigaLine[];
  songs: EigaSong[];
}

/** 見方（モード） */
export type EigaMode = "kansho" | "kaisetsu" | "hanpuku";

/** 字幕で反復のときの字幕 */
export type SubMode = "en" | "enja" | "ja" | "off";
