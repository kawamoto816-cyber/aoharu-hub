import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import { U_WASEDA_NIHONSHI } from "./waseda-nihonshi";
import { U_WASEDA_SEKAISHI } from "./waseda-sekaishi";
import { U_KEIO_NIHONSHI } from "./keio-nihonshi";
import { U_KEIO_SEKAISHI } from "./keio-sekaishi";
import { U_SOPHIA_NIHONSHI } from "./sophia-nihonshi";
import { U_SOPHIA_SEKAISHI } from "./sophia-sekaishi";
import { U_MEIJI_NIHONSHI } from "./meiji-nihonshi";
import { U_MEIJI_SEKAISHI } from "./meiji-sekaishi";
import { U_AOYAMA_NIHONSHI } from "./aoyama-nihonshi";
import { U_AOYAMA_SEKAISHI } from "./aoyama-sekaishi";
import { U_RIKKYO_NIHONSHI } from "./rikkyo-nihonshi";
import { U_RIKKYO_SEKAISHI } from "./rikkyo-sekaishi";
import { U_CHUO_NIHONSHI } from "./chuo-nihonshi";
import { U_CHUO_SEKAISHI } from "./chuo-sekaishi";
import { U_HOSEI_NIHONSHI } from "./hosei-nihonshi";
import { U_HOSEI_SEKAISHI } from "./hosei-sekaishi";

export type { UnivExam, UnivTier } from "./types";

// 大学別型の一覧 (準備中の null は外す)。並び: 早慶上智 → MARCH → 国公立、その中は order の順。
const TIER_ORDER = ["早慶上智", "MARCH", "国公立"];
export const UNIV_EXAMS: UnivExam[] = [U_WASEDA_NIHONSHI, U_WASEDA_SEKAISHI, U_KEIO_NIHONSHI, U_KEIO_SEKAISHI, U_SOPHIA_NIHONSHI, U_SOPHIA_SEKAISHI, U_MEIJI_NIHONSHI, U_MEIJI_SEKAISHI, U_AOYAMA_NIHONSHI, U_AOYAMA_SEKAISHI, U_RIKKYO_NIHONSHI, U_RIKKYO_SEKAISHI, U_CHUO_NIHONSHI, U_CHUO_SEKAISHI, U_HOSEI_NIHONSHI, U_HOSEI_SEKAISHI]
  .filter((x): x is UnivExam => x !== null)
  .sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) || a.order - b.order);

export const getUnivExam = (key: string) => UNIV_EXAMS.find((x) => x.key === key);

/** 大学別型の pool (lib/exam/pool/index.ts が EXAM_POOL に足す) */
export const UNIV_POOL: ExamPoolSection[] = UNIV_EXAMS.flatMap((x) => x.pool);
