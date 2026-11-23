import type { KakomonDaimon, KakomonExam, KakomonItem } from "./types";

// 正解と配点は、大学入試センターウェブサイトの「正解」の表を見て入れた (数値の表)。問題文は入れていない。
// 入れたあと scripts/check-kakomon.ts で検算する (配点の合計・解答番号の並び・全問正解で満点)。

/**
 * 大学入試センターのページへのリンクを置くか。
 * センターの「このウェブサイトについて」に「リンクが営利目的に結びつくおそれがあるときは、リンクの設定を禁じます」とあるので、
 * センターに確かめるまでは false (リンクを置かず、生徒に自分で開いてもらう)。出典の URL は文字で書く (利用ルールの出典の記載)。
 */
export const DNC_LINK_OK = false;
export const DNC_NAME = "大学入試センター";
export const DNC_KAKOMON_PAGE = "https://www.dnc.ac.jp/kyotsu/kakomondai/";

const one = (
  toi: number,
  no: number,
  answer: number,
  points: number,
): KakomonItem => ({ toi, points, parts: [{ nos: [no], answers: [answer] }] });
/** 並んだ解答番号を、全部そろって正解のときだけ点にする */
const all = (
  toi: number,
  from: number,
  answers: number[],
  points: number,
): KakomonItem => ({
  toi,
  points,
  parts: [{ nos: answers.map((_, i) => from + i), answers }],
});
/** 順を問わない2つ (全部そろって正解) */
const pair = (
  toi: number,
  from: number,
  answers: [number, number],
  points: number,
): KakomonItem => ({
  toi,
  points,
  parts: [{ nos: [from, from + 1], answers, order: "any" }],
});

const next = (label: string, note: string): KakomonDaimon["next"] => ({
  label,
  note,
});

const R8_READING: KakomonExam = {
  id: "r8-hon-eng-r",
  year: "令和8年度",
  kind: "本試験",
  subject: "英語（リーディング）",
  minutes: 80,
  total: 100,
  max: 9,
  source: "https://www.dnc.ac.jp/kyotsu/kakomondai/r8/r8_honsiken_seikai.html",
  checked: "2026-11-24",
  moshi: "eng-r",
  daimon: [
    {
      no: 1,
      points: 6,
      items: [one(1, 1, 3, 2), one(2, 2, 1, 2), one(3, 3, 2, 2)],
      next: next(
        "第1問の形：短いメッセージ・掲示",
        "短い文から必要な情報を拾う問題",
      ),
    },
    {
      no: 2,
      points: 12,
      items: [
        one(1, 4, 1, 3),
        one(2, 5, 3, 3),
        one(3, 6, 4, 3),
        one(4, 7, 2, 3),
      ],
      next: next("第2問の形：案内文と利用者の声", "事実と意見を分けて読む問題"),
    },
    {
      no: 3,
      points: 9,
      items: [one(1, 8, 2, 3), all(2, 9, [2, 3, 5, 1], 3), one(3, 13, 4, 3)],
      next: next("第3問の形：短い物語・体験", "出来事の順を追う問題"),
    },
    {
      no: 4,
      points: 12,
      items: [
        one(1, 14, 3, 3),
        one(2, 15, 3, 3),
        one(3, 16, 1, 3),
        one(4, 17, 3, 3),
      ],
      next: next("第4問の形：下書きの推敲", "コメントをもとに文章を直す問題"),
    },
    {
      no: 5,
      points: 16,
      items: [
        one(1, 18, 3, 3),
        one(2, 19, 4, 3),
        one(3, 20, 5, 3),
        one(4, 21, 3, 3),
        {
          toi: 5,
          points: 4,
          each: 2,
          parts: [{ nos: [22, 23], answers: [3, 5], order: "any" }],
        },
      ],
      next: next("第5問の形：複数の資料", "いくつかの資料を照らし合わせる問題"),
    },
    {
      no: 6,
      points: 12,
      items: [
        pair(1, 24, [1, 4], 3),
        all(2, 26, [3, 4, 1, 5], 3),
        one(3, 30, 4, 3),
        one(4, 31, 2, 3),
      ],
      next: next("第6問の形：物語文", "あらすじと人物を整理する問題"),
    },
    {
      no: 7,
      points: 16,
      items: [
        one(1, 32, 3, 3),
        pair(2, 33, [1, 4], 4),
        one(3, 35, 2, 3),
        one(4, 36, 1, 3),
        one(5, 37, 4, 3),
      ],
      next: next("第7問の形：説明文", "説明文を発表用にまとめる問題"),
    },
    {
      no: 8,
      points: 17,
      items: [
        one(1, 38, 4, 3),
        one(2, 39, 1, 3),
        {
          toi: 3,
          points: 4,
          parts: [
            { nos: [40, 41], answers: [3, 5], order: "any" },
            { nos: [42], answers: [1] },
          ],
        },
        one(4, 43, 2, 3),
        one(5, 44, 3, 4),
      ],
      next: next(
        "第8問の形：意見文の構想",
        "複数の意見と資料から理由を選ぶ問題",
      ),
    },
  ],
};

export const KAKOMON: KakomonExam[] = [R8_READING];

export function getKakomon(id: string): KakomonExam | undefined {
  return KAKOMON.find((e) => e.id === id);
}
