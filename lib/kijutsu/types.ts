// 「記述の階段」(/learn/kijutsu)：国語と英語の記述の答案を、1段ずつ作れるようにする授業。
// 例文・例題・解答例は、すべてアオハルが書いたオリジナル（入試問題や本からの引用はない）。

export type KijutsuTrack = "gendaibun" | "kobun" | "eigo";

export interface KijutsuLesson {
  /** URL に使う id（例 g1） */
  id: string;
  track: KijutsuTrack;
  /** その道の中での段（1 から） */
  no: number;
  title: string;
  /** こんな失点をする人へ（1〜2文） */
  lead: string;
  /** 型：答案を作る手順 */
  kata: string[];
  /** 例題：手順どおりに解いてみせる */
  ex: {
    /** 例文（自作） */
    text: string[];
    q: string;
    /** [手順の名前, その手順でやること・出てくるもの] */
    steps: [string, string][];
    answer: string;
    /** よくある答案と、点が入らない理由 */
    ng: { text: string; why: string };
  };
  /** 自己採点のしかた（自分の答案を見なおす点） */
  check: string[];
  /** 自分で解く1問 */
  drill: {
    text: string[];
    q: string;
    hint: string;
    answer: string;
    /** 入っているべき要素 */
    points: string[];
  };
}

export const TRACKS: { id: KijutsuTrack; name: string; lead: string }[] = [
  {
    id: "gendaibun",
    name: "現代文の記述（評論・随筆）",
    lead: "「どういうことか」「なぜか」に、本文の言葉で答える。傍線部を分けるところから、解答欄に合わせて削るところまで。",
  },
  {
    id: "kobun",
    name: "古文の記述",
    lead: "現代語訳は「分ける→訳す→補う」。気持ちの説明と和歌の説明も、決まった順番で書く。",
  },
  {
    id: "eigo",
    name: "英語の記述（和訳・説明・英作文）",
    lead: "和訳は骨組みから。説明は指す内容を集める。英作文は、日本語をかみくだいてから書く。",
  },
];
