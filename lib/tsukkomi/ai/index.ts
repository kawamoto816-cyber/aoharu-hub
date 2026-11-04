import type { Boke } from "../types";

// ツッコミAI（2026-11-04 代表承認）。ツッコミ学習法のボケ（わざと1か所まちがえた文）に、
// 生徒が「どこがまちがいか」「どう直すか」を自分の言葉で書いたとき、AIがその直しを判定する。
//   - 問題（ボケ）は lib/tsukkomi/data の検証ずみのものだけ。AIには作らせない。
//   - 判定のものさしは、その問題の正しい答え・わけ（explain・options）と、その単元の図解レクチャーの mistakes・sections だけ。
//   - AIが返すのは { found, fixed, hint } だけ。正しい文は、判定のあと画面が既存データ（explain.right・why）から出す。
//   - hint に正解が入っていないかは guard.ts で点検する（なぜなぜ先生の lib/naze/guard.ts を使い回す）。
//   - 書いた文は保存しない・ログに出さない（画面の state にだけ持つ）。
// このファイルはクライアントとサーバーの両方で使う。
//   サーバーの依頼文と呼び出し: prompt.ts ／ hint の点検: guard.ts ／ 回数: limits.ts ／ AIなしの判定: mock.ts

/** 「どこ」「どう直す」それぞれの文字数の上限 */
export const MAX_INPUT = 120;
/** 書いてツッコむ1回分の問題数（書くのは時間がかかるので、選ぶモードより少なく） */
export const WRITE_ROUND = 5;

export type Fixed = "ok" | "partial" | "no";

/** AIの判定（＝画面に返すもの。正しい文は入れない） */
export interface TsukkomiJudge {
  /** 誤りの場所を見つけたか */
  found: boolean;
  /** 直しが合っているか */
  fixed: Fixed;
  /** 次に考えるための一言（正解の文は書かない） */
  hint: string;
}

/** POST /api/tsukkomi の返事 */
export interface TsukkomiAiResponse extends Partial<TsukkomiJudge> {
  /** 相談窓口を出す（AIには送っていない） */
  sos?: boolean;
  /** 乱暴な言葉だったので判定しなかった */
  refused?: boolean;
  /** きょうの残り回数（判定できたとき） */
  remaining?: number;
  /** AIなしの判定（?mock=1） */
  mock?: boolean;
}

export const isFixed = (v: unknown): v is Fixed => v === "ok" || v === "partial" || v === "no";

/** 書いてツッコむに出せるボケ（まちがいのある文だけ。スルー問題は選ぶモードで） */
export const writable = (b: Boke) => b.wrongIndex !== null && !!b.options;

/** 正しい語句（既存データ） */
export const correctWord = (b: Boke) => (b.options ? b.options.choices[b.options.answer] : "");

/** 判定に合わせた定型の hint（AIの hint に正解が入っていたときの差しかえ・AIなしの判定で使う） */
export function templateHint(found: boolean, fixed: Fixed): string {
  if (fixed === "ok") return "いいね。なぜそう直せるのか、わけを自分の言葉で言えるかためしてみよう。";
  if (!found) return "まちがいは1か所だけ。文の中で、レクチャーの説明と食いちがう語句をさがしてみよう。";
  if (fixed === "partial") return "おしい。直した言葉を入れて、文全体がレクチャーの説明と合うか、もう一度読んでみよう。";
  return "場所は合っているよ。その語句を、レクチャーではどう説明していたか思い出してみよう。";
}

export const lines = {
  unjudged: "判定できませんでした。下の答え合わせで、自分の書いた直しとくらべてみよう。",
  refused: "ここには、どこがまちがいか・どう直すかを書いてね。",
  notice: "判定はAIです。まちがうこともあります。書いた文はどこにも保存しません。名前や学校名は書かないでね。",
};
