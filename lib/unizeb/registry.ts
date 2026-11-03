// 自動生成 (scripts/gen-unizeb.ts)。手で書きかえない。
import type { Lecture } from "@/lib/lecture/types";
import type { Den, CaseStudy, ShiryoChapter, SceneBook, Enshu } from "./types";
import { UZ_Z1_01 } from "./lectures/z1-01";
import { UZ_Z1_02 } from "./lectures/z1-02";
import { UZ_Z1_03 } from "./lectures/z1-03";
import { UZ_Z2_01 } from "./lectures/z2-01";
import { UZ_Z2_02 } from "./lectures/z2-02";
import { UZ_Z2_03 } from "./lectures/z2-03";
import { UZ_Z3_01 } from "./lectures/z3-01";
import { UZ_Z3_02 } from "./lectures/z3-02";
import { UZ_Z3_03 } from "./lectures/z3-03";
import { UZ_Z4_01 } from "./lectures/z4-01";
import { UZ_Z4_02 } from "./lectures/z4-02";
import { UZ_Z4_03 } from "./lectures/z4-03";
import { UZ_Z5_01 } from "./lectures/z5-01";
import { UZ_Z5_02 } from "./lectures/z5-02";
import { UZ_Z5_03 } from "./lectures/z5-03";
import { UZ_Z6_01 } from "./lectures/z6-01";
import { UZ_Z6_02 } from "./lectures/z6-02";
import { UZ_Z6_03 } from "./lectures/z6-03";
import { UZ_Z7_01 } from "./lectures/z7-01";
import { UZ_Z7_02 } from "./lectures/z7-02";
import { UZ_Z7_03 } from "./lectures/z7-03";
import { UZ_Z8_01 } from "./lectures/z8-01";
import { UZ_Z8_02 } from "./lectures/z8-02";
import { UZ_Z8_03 } from "./lectures/z8-03";
import { DEN_HIROOKA_ASAKO } from "./den/hirooka-asako";
import { DEN_HONDA_SOICHIRO } from "./den/honda-soichiro";
import { DEN_IBUKA_MASARU } from "./den/ibuka-masaru";
import { DEN_MELANIE_PERKINS } from "./den/melanie-perkins";
import { DEN_MERA_HARUKA } from "./den/mera-haruka";
import { DEN_SHIBUSAWA_EIICHI } from "./den/shibusawa-eiichi";
import { DEN_TOYODA_SAKICHI } from "./den/toyoda-sakichi";
import { DEN_YOKOISHI_TOMOJI } from "./den/yokoishi-tomoji";
import { CASE_CHICKEN_RAMEN } from "./case/chicken-ramen";
import { CASE_CREPE } from "./case/crepe";
import { CASE_IKITAI_NINZU } from "./case/ikitai-ninzu";
import { CASE_MUJI_SHELF } from "./case/muji-shelf";
import { CASE_SHOTENGAI_SNS } from "./case/shotengai-sns";
import { CASE_TSHIRT_ENSEI } from "./case/tshirt-ensei";
import { SHIRYO_CH1 } from "./shiryo/ch1-hojin";
import { ENSHU_LV1 } from "./enshu/lv1";
import { ENSHU_LV2 } from "./enshu/lv2";
import { ENSHU_LV3 } from "./enshu/lv3";
import { ENSHU_SHURYO_1 } from "./enshu/shuryo-1";
import { SC_CASE_CHICKEN_RAMEN } from "./scenes/case-chicken-ramen";
import { SC_CASE_CREPE } from "./scenes/case-crepe";
import { SC_CASE_IKITAI_NINZU } from "./scenes/case-ikitai-ninzu";
import { SC_CASE_MUJI_SHELF } from "./scenes/case-muji-shelf";
import { SC_CASE_SHOTENGAI_SNS } from "./scenes/case-shotengai-sns";
import { SC_CASE_TSHIRT_ENSEI } from "./scenes/case-tshirt-ensei";
import { SC_LEC_Z1_01 } from "./scenes/lec-z1-01";
import { SC_LEC_Z1_02 } from "./scenes/lec-z1-02";
import { SC_LEC_Z1_03 } from "./scenes/lec-z1-03";
import { SC_LEC_Z2_01 } from "./scenes/lec-z2-01";
import { SC_LEC_Z2_02 } from "./scenes/lec-z2-02";
import { SC_LEC_Z2_03 } from "./scenes/lec-z2-03";
import { SC_LEC_Z3_01 } from "./scenes/lec-z3-01";
import { SC_LEC_Z3_02 } from "./scenes/lec-z3-02";
import { SC_LEC_Z3_03 } from "./scenes/lec-z3-03";
import { SC_LEC_Z4_01 } from "./scenes/lec-z4-01";
import { SC_LEC_Z4_02 } from "./scenes/lec-z4-02";
import { SC_LEC_Z4_03 } from "./scenes/lec-z4-03";
import { SC_LEC_Z5_01 } from "./scenes/lec-z5-01";
import { SC_LEC_Z5_02 } from "./scenes/lec-z5-02";
import { SC_LEC_Z5_03 } from "./scenes/lec-z5-03";
import { SC_LEC_Z6_01 } from "./scenes/lec-z6-01";
import { SC_LEC_Z6_02 } from "./scenes/lec-z6-02";
import { SC_LEC_Z6_03 } from "./scenes/lec-z6-03";
import { SC_LEC_Z7_01 } from "./scenes/lec-z7-01";
import { SC_LEC_Z7_02 } from "./scenes/lec-z7-02";
import { SC_LEC_Z7_03 } from "./scenes/lec-z7-03";
import { SC_LEC_Z8_01 } from "./scenes/lec-z8-01";
import { SC_LEC_Z8_02 } from "./scenes/lec-z8-02";
import { SC_LEC_Z8_03 } from "./scenes/lec-z8-03";

export const UZ_LECTURES: Lecture[] = [UZ_Z1_01, UZ_Z1_02, UZ_Z1_03, UZ_Z2_01, UZ_Z2_02, UZ_Z2_03, UZ_Z3_01, UZ_Z3_02, UZ_Z3_03, UZ_Z4_01, UZ_Z4_02, UZ_Z4_03, UZ_Z5_01, UZ_Z5_02, UZ_Z5_03, UZ_Z6_01, UZ_Z6_02, UZ_Z6_03, UZ_Z7_01, UZ_Z7_02, UZ_Z7_03, UZ_Z8_01, UZ_Z8_02, UZ_Z8_03];
export const UZ_DEN: Den[] = [DEN_HIROOKA_ASAKO, DEN_HONDA_SOICHIRO, DEN_IBUKA_MASARU, DEN_MELANIE_PERKINS, DEN_MERA_HARUKA, DEN_SHIBUSAWA_EIICHI, DEN_TOYODA_SAKICHI, DEN_YOKOISHI_TOMOJI];
export const UZ_CASES: CaseStudy[] = [CASE_CHICKEN_RAMEN, CASE_CREPE, CASE_IKITAI_NINZU, CASE_MUJI_SHELF, CASE_SHOTENGAI_SNS, CASE_TSHIRT_ENSEI];
export const UZ_SHIRYO: ShiryoChapter[] = [SHIRYO_CH1];
export const UZ_ENSHU: Enshu[] = [ENSHU_LV1, ENSHU_LV2, ENSHU_LV3, ENSHU_SHURYO_1];
export const UZ_SCENES: SceneBook = {
  "case/chicken-ramen": SC_CASE_CHICKEN_RAMEN,
  "case/crepe": SC_CASE_CREPE,
  "case/ikitai-ninzu": SC_CASE_IKITAI_NINZU,
  "case/muji-shelf": SC_CASE_MUJI_SHELF,
  "case/shotengai-sns": SC_CASE_SHOTENGAI_SNS,
  "case/tshirt-ensei": SC_CASE_TSHIRT_ENSEI,
  "lec/z1-01": SC_LEC_Z1_01,
  "lec/z1-02": SC_LEC_Z1_02,
  "lec/z1-03": SC_LEC_Z1_03,
  "lec/z2-01": SC_LEC_Z2_01,
  "lec/z2-02": SC_LEC_Z2_02,
  "lec/z2-03": SC_LEC_Z2_03,
  "lec/z3-01": SC_LEC_Z3_01,
  "lec/z3-02": SC_LEC_Z3_02,
  "lec/z3-03": SC_LEC_Z3_03,
  "lec/z4-01": SC_LEC_Z4_01,
  "lec/z4-02": SC_LEC_Z4_02,
  "lec/z4-03": SC_LEC_Z4_03,
  "lec/z5-01": SC_LEC_Z5_01,
  "lec/z5-02": SC_LEC_Z5_02,
  "lec/z5-03": SC_LEC_Z5_03,
  "lec/z6-01": SC_LEC_Z6_01,
  "lec/z6-02": SC_LEC_Z6_02,
  "lec/z6-03": SC_LEC_Z6_03,
  "lec/z7-01": SC_LEC_Z7_01,
  "lec/z7-02": SC_LEC_Z7_02,
  "lec/z7-03": SC_LEC_Z7_03,
  "lec/z8-01": SC_LEC_Z8_01,
  "lec/z8-02": SC_LEC_Z8_02,
  "lec/z8-03": SC_LEC_Z8_03,
};
