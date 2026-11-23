import type { ExamPoolSection } from "./types";
import { ENG_READING_POOL } from "./eng-reading";
import { ENG_LISTENING_POOL } from "./eng-listening";
import { ENG_READING_POOL_2 } from "./eng-reading-2";
import { ENG_LISTENING_POOL_2 } from "./eng-listening-2";
import { UNIV_POOL } from "../univ";

export type { ExamPoolSection } from "./types";

/** 試験モードだけの問題 (lib/exam/build.ts の allBlocks が読む) */
export const EXAM_POOL: ExamPoolSection[] = [...ENG_READING_POOL, ...ENG_READING_POOL_2, ...ENG_LISTENING_POOL, ...ENG_LISTENING_POOL_2, ...UNIV_POOL];
