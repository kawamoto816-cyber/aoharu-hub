import { WORDLIST } from "./wordlist";
import { STAGE_DATA } from "./data";
import type { WordEntry } from "./types";

// 英単語2000 の20ステージ。1〜6 基礎、7〜14 標準、15〜20 発展。中身ができたステージから公開する。

export interface StageMeta {
  no: number;
  level: "基礎" | "標準" | "発展";
  from: number;
  to: number;
  open: boolean;
}

export const STAGES: StageMeta[] = Array.from({ length: 20 }, (_, i) => {
  const no = i + 1;
  return { no, level: no <= 6 ? "基礎" : no <= 14 ? "標準" : "発展", from: i * 100 + 1, to: i * 100 + 100, open: Boolean(STAGE_DATA[no]) };
});

export const OPEN_WORDS: WordEntry[] = STAGES.filter((s) => s.open).flatMap((s) => STAGE_DATA[s.no]);
export const TOTAL_WORDS = WORDLIST.length;

export function stageOf(no: number): number {
  return Math.ceil(no / 100);
}

export function findWord(no: number): WordEntry | undefined {
  return STAGE_DATA[stageOf(no)]?.[(no - 1) % 100];
}
