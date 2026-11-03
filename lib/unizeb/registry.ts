// 自動生成 (scripts/gen-unizeb.ts)。手で書きかえない。
import type { Lecture } from "@/lib/lecture/types";
import type { Den, CaseStudy, ShiryoChapter } from "./types";
import { UZ_Z1_01 } from "./lectures/z1-01";
import { UZ_Z2_01 } from "./lectures/z2-01";
import { UZ_Z3_01 } from "./lectures/z3-01";
import { UZ_Z4_01 } from "./lectures/z4-01";
import { UZ_Z5_01 } from "./lectures/z5-01";
import { UZ_Z6_01 } from "./lectures/z6-01";
import { UZ_Z7_01 } from "./lectures/z7-01";
import { UZ_Z8_01 } from "./lectures/z8-01";
import { DEN_HIROOKA_ASAKO } from "./den/hirooka-asako";
import { DEN_IBUKA_MASARU } from "./den/ibuka-masaru";
import { DEN_MELANIE_PERKINS } from "./den/melanie-perkins";
import { CASE_CREPE } from "./case/crepe";
import { CASE_MUJI_SHELF } from "./case/muji-shelf";
import { SHIRYO_CH1 } from "./shiryo/ch1-hojin";

export const UZ_LECTURES: Lecture[] = [UZ_Z1_01, UZ_Z2_01, UZ_Z3_01, UZ_Z4_01, UZ_Z5_01, UZ_Z6_01, UZ_Z7_01, UZ_Z8_01];
export const UZ_DEN: Den[] = [DEN_HIROOKA_ASAKO, DEN_IBUKA_MASARU, DEN_MELANIE_PERKINS];
export const UZ_CASES: CaseStudy[] = [CASE_CREPE, CASE_MUJI_SHELF];
export const UZ_SHIRYO: ShiryoChapter[] = [SHIRYO_CH1];
