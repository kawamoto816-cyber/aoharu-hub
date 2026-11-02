import type { Boke, BokeLevel } from "./types";

// データを書くための小さな道具。正しい文 (explain.right) は tokens と正解の語句から自動で作る
// （手で書くと、ボケの文と正しい文が食いちがうことがあるため）。

type BokeInput = {
  id: string;
  level: BokeLevel;
  tokens: string[];
  /** まちがいの語句の位置。スルー問題では省く */
  wrong?: number;
  /** 正しい語句の4択（正解の位置は answer） */
  choices?: [string, string, string, string];
  answer?: number;
  /** 理由の3択（正解の位置は reasonAnswer） */
  reasons?: [string, string, string];
  reasonAnswer?: number;
  why: string;
  say: { boke: string; tsukkomi: string };
};

/** ボケの文の、まちがいを正解に置きかえた文（スルー問題はそのまま） */
export function rightSentence(tokens: string[], wrongIndex: number | null, correct?: string): string {
  return tokens.map((t, i) => (i === wrongIndex && correct !== undefined ? correct : t)).join("");
}

export function defineUnit(unit: string, list: BokeInput[]): Boke[] {
  return list.map((b) => {
    const wrongIndex = b.wrong ?? null;
    const options = b.choices ? { choices: b.choices, answer: b.answer ?? 0 } : undefined;
    const reasons = b.reasons ? { choices: b.reasons, answer: b.reasonAnswer ?? 0 } : undefined;
    return {
      id: b.id,
      unit,
      level: b.level,
      tokens: b.tokens,
      wrongIndex,
      options,
      reasons,
      explain: { right: rightSentence(b.tokens, wrongIndex, options?.choices[options.answer]), why: b.why },
      say: b.say,
    };
  });
}
