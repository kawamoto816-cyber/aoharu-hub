// 自動生成 (scripts/gen-unizeb.ts)。手で書きかえない。
import type { Lecture } from "@/lib/lecture/types";
import type { Den, CaseStudy, ShiryoChapter, SceneBook, Enshu } from "./types";
import { UZ_Z1_01 } from "./lectures/z1-01";
import { UZ_Z1_02 } from "./lectures/z1-02";
import { UZ_Z1_03 } from "./lectures/z1-03";
import { UZ_Z1_04 } from "./lectures/z1-04";
import { UZ_Z1_05 } from "./lectures/z1-05";
import { UZ_Z1_06 } from "./lectures/z1-06";
import { UZ_Z1_07 } from "./lectures/z1-07";
import { UZ_Z1_08 } from "./lectures/z1-08";
import { UZ_Z1_09 } from "./lectures/z1-09";
import { UZ_Z2_01 } from "./lectures/z2-01";
import { UZ_Z2_02 } from "./lectures/z2-02";
import { UZ_Z2_03 } from "./lectures/z2-03";
import { UZ_Z2_04 } from "./lectures/z2-04";
import { UZ_Z2_05 } from "./lectures/z2-05";
import { UZ_Z2_06 } from "./lectures/z2-06";
import { UZ_Z2_07 } from "./lectures/z2-07";
import { UZ_Z2_08 } from "./lectures/z2-08";
import { UZ_Z2_09 } from "./lectures/z2-09";
import { UZ_Z3_01 } from "./lectures/z3-01";
import { UZ_Z3_02 } from "./lectures/z3-02";
import { UZ_Z3_03 } from "./lectures/z3-03";
import { UZ_Z3_04 } from "./lectures/z3-04";
import { UZ_Z3_05 } from "./lectures/z3-05";
import { UZ_Z3_06 } from "./lectures/z3-06";
import { UZ_Z3_07 } from "./lectures/z3-07";
import { UZ_Z3_08 } from "./lectures/z3-08";
import { UZ_Z3_09 } from "./lectures/z3-09";
import { UZ_Z4_01 } from "./lectures/z4-01";
import { UZ_Z4_02 } from "./lectures/z4-02";
import { UZ_Z4_03 } from "./lectures/z4-03";
import { UZ_Z4_04 } from "./lectures/z4-04";
import { UZ_Z4_05 } from "./lectures/z4-05";
import { UZ_Z4_06 } from "./lectures/z4-06";
import { UZ_Z4_07 } from "./lectures/z4-07";
import { UZ_Z4_08 } from "./lectures/z4-08";
import { UZ_Z4_09 } from "./lectures/z4-09";
import { UZ_Z5_01 } from "./lectures/z5-01";
import { UZ_Z5_02 } from "./lectures/z5-02";
import { UZ_Z5_03 } from "./lectures/z5-03";
import { UZ_Z5_04 } from "./lectures/z5-04";
import { UZ_Z5_05 } from "./lectures/z5-05";
import { UZ_Z5_06 } from "./lectures/z5-06";
import { UZ_Z5_07 } from "./lectures/z5-07";
import { UZ_Z5_08 } from "./lectures/z5-08";
import { UZ_Z5_09 } from "./lectures/z5-09";
import { UZ_Z6_01 } from "./lectures/z6-01";
import { UZ_Z6_02 } from "./lectures/z6-02";
import { UZ_Z6_03 } from "./lectures/z6-03";
import { UZ_Z6_04 } from "./lectures/z6-04";
import { UZ_Z6_05 } from "./lectures/z6-05";
import { UZ_Z6_06 } from "./lectures/z6-06";
import { UZ_Z6_07 } from "./lectures/z6-07";
import { UZ_Z6_08 } from "./lectures/z6-08";
import { UZ_Z6_09 } from "./lectures/z6-09";
import { UZ_Z7_01 } from "./lectures/z7-01";
import { UZ_Z7_02 } from "./lectures/z7-02";
import { UZ_Z7_03 } from "./lectures/z7-03";
import { UZ_Z7_04 } from "./lectures/z7-04";
import { UZ_Z7_05 } from "./lectures/z7-05";
import { UZ_Z7_06 } from "./lectures/z7-06";
import { UZ_Z7_07 } from "./lectures/z7-07";
import { UZ_Z7_08 } from "./lectures/z7-08";
import { UZ_Z7_09 } from "./lectures/z7-09";
import { UZ_Z8_01 } from "./lectures/z8-01";
import { UZ_Z8_02 } from "./lectures/z8-02";
import { UZ_Z8_03 } from "./lectures/z8-03";
import { UZ_Z8_04 } from "./lectures/z8-04";
import { UZ_Z8_05 } from "./lectures/z8-05";
import { UZ_Z8_06 } from "./lectures/z8-06";
import { UZ_Z8_07 } from "./lectures/z8-07";
import { UZ_Z8_08 } from "./lectures/z8-08";
import { UZ_Z8_09 } from "./lectures/z8-09";
import { DEN_BRIAN_CHESKY } from "./den/brian-chesky";
import { DEN_HIROOKA_ASAKO } from "./den/hirooka-asako";
import { DEN_HONDA_SOICHIRO } from "./den/honda-soichiro";
import { DEN_IBUKA_MASARU } from "./den/ibuka-masaru";
import { DEN_MELANIE_PERKINS } from "./den/melanie-perkins";
import { DEN_MERA_HARUKA } from "./den/mera-haruka";
import { DEN_MICHAEL_DELL } from "./den/michael-dell";
import { DEN_MIKIMOTO_KOKICHI } from "./den/mikimoto-kokichi";
import { DEN_MILTON_HERSHEY } from "./den/milton-hershey";
import { DEN_MORI_HANAE } from "./den/mori-hanae";
import { DEN_MURAKAMI_TAICHI } from "./den/murakami-taichi";
import { DEN_NAMBA_TOMOKO } from "./den/namba-tomoko";
import { DEN_SHIBUSAWA_EIICHI } from "./den/shibusawa-eiichi";
import { DEN_TOYODA_SAKICHI } from "./den/toyoda-sakichi";
import { DEN_YAMAGUCHI_ERIKO } from "./den/yamaguchi-eriko";
import { DEN_YOKOISHI_TOMOJI } from "./den/yokoishi-tomoji";
import { CASE_ASAGOHAN_ANKETO } from "./case/asagohan-anketo";
import { CASE_CHICKEN_RAMEN } from "./case/chicken-ramen";
import { CASE_CREPE } from "./case/crepe";
import { CASE_FRANCHISE_TOWN } from "./case/franchise-town";
import { CASE_IKITAI_NINZU } from "./case/ikitai-ninzu";
import { CASE_ISHIGAKI_CULTURE } from "./case/ishigaki-culture";
import { CASE_KOMINKA_CF } from "./case/kominka-cf";
import { CASE_MUJI_SHELF } from "./case/muji-shelf";
import { CASE_SHOTENGAI_SNS } from "./case/shotengai-sns";
import { CASE_STICKER_IP } from "./case/sticker-ip";
import { CASE_THIRTEEN_SHOPS } from "./case/thirteen-shops";
import { CASE_TSHIRT_ENSEI } from "./case/tshirt-ensei";
import { CASE_YORU_SHITSUMON } from "./case/yoru-shitsumon";
import { SHIRYO_CH1 } from "./shiryo/ch1-hojin";
import { ENSHU_LV1 } from "./enshu/lv1";
import { ENSHU_LV2 } from "./enshu/lv2";
import { ENSHU_LV3 } from "./enshu/lv3";
import { ENSHU_LV4 } from "./enshu/lv4";
import { ENSHU_LV5 } from "./enshu/lv5";
import { ENSHU_LV6 } from "./enshu/lv6";
import { ENSHU_LV7 } from "./enshu/lv7";
import { ENSHU_LV8 } from "./enshu/lv8";
import { ENSHU_LV9 } from "./enshu/lv9";
import { ENSHU_SHURYO_1 } from "./enshu/shuryo-1";
import { ENSHU_SHURYO_2 } from "./enshu/shuryo-2";
import { SC_CASE_ASAGOHAN_ANKETO } from "./scenes/case-asagohan-anketo";
import { SC_CASE_CHICKEN_RAMEN } from "./scenes/case-chicken-ramen";
import { SC_CASE_CREPE } from "./scenes/case-crepe";
import { SC_CASE_FRANCHISE_TOWN } from "./scenes/case-franchise-town";
import { SC_CASE_IKITAI_NINZU } from "./scenes/case-ikitai-ninzu";
import { SC_CASE_ISHIGAKI_CULTURE } from "./scenes/case-ishigaki-culture";
import { SC_CASE_KOMINKA_CF } from "./scenes/case-kominka-cf";
import { SC_CASE_MUJI_SHELF } from "./scenes/case-muji-shelf";
import { SC_CASE_SHOTENGAI_SNS } from "./scenes/case-shotengai-sns";
import { SC_CASE_STICKER_IP } from "./scenes/case-sticker-ip";
import { SC_CASE_THIRTEEN_SHOPS } from "./scenes/case-thirteen-shops";
import { SC_CASE_TSHIRT_ENSEI } from "./scenes/case-tshirt-ensei";
import { SC_CASE_YORU_SHITSUMON } from "./scenes/case-yoru-shitsumon";
import { SC_DEN_BRIAN_CHESKY } from "./scenes/den-brian-chesky";
import { SC_DEN_MICHAEL_DELL } from "./scenes/den-michael-dell";
import { SC_DEN_MIKIMOTO_KOKICHI } from "./scenes/den-mikimoto-kokichi";
import { SC_DEN_MILTON_HERSHEY } from "./scenes/den-milton-hershey";
import { SC_DEN_MORI_HANAE } from "./scenes/den-mori-hanae";
import { SC_DEN_MURAKAMI_TAICHI } from "./scenes/den-murakami-taichi";
import { SC_DEN_NAMBA_TOMOKO } from "./scenes/den-namba-tomoko";
import { SC_DEN_YAMAGUCHI_ERIKO } from "./scenes/den-yamaguchi-eriko";
import { SC_LEC_Z1_01 } from "./scenes/lec-z1-01";
import { SC_LEC_Z1_02 } from "./scenes/lec-z1-02";
import { SC_LEC_Z1_03 } from "./scenes/lec-z1-03";
import { SC_LEC_Z1_04 } from "./scenes/lec-z1-04";
import { SC_LEC_Z1_05 } from "./scenes/lec-z1-05";
import { SC_LEC_Z1_06 } from "./scenes/lec-z1-06";
import { SC_LEC_Z1_07 } from "./scenes/lec-z1-07";
import { SC_LEC_Z1_08 } from "./scenes/lec-z1-08";
import { SC_LEC_Z1_09 } from "./scenes/lec-z1-09";
import { SC_LEC_Z2_01 } from "./scenes/lec-z2-01";
import { SC_LEC_Z2_02 } from "./scenes/lec-z2-02";
import { SC_LEC_Z2_03 } from "./scenes/lec-z2-03";
import { SC_LEC_Z2_04 } from "./scenes/lec-z2-04";
import { SC_LEC_Z2_05 } from "./scenes/lec-z2-05";
import { SC_LEC_Z2_06 } from "./scenes/lec-z2-06";
import { SC_LEC_Z2_07 } from "./scenes/lec-z2-07";
import { SC_LEC_Z2_08 } from "./scenes/lec-z2-08";
import { SC_LEC_Z2_09 } from "./scenes/lec-z2-09";
import { SC_LEC_Z3_01 } from "./scenes/lec-z3-01";
import { SC_LEC_Z3_02 } from "./scenes/lec-z3-02";
import { SC_LEC_Z3_03 } from "./scenes/lec-z3-03";
import { SC_LEC_Z3_04 } from "./scenes/lec-z3-04";
import { SC_LEC_Z3_05 } from "./scenes/lec-z3-05";
import { SC_LEC_Z3_06 } from "./scenes/lec-z3-06";
import { SC_LEC_Z3_07 } from "./scenes/lec-z3-07";
import { SC_LEC_Z3_08 } from "./scenes/lec-z3-08";
import { SC_LEC_Z3_09 } from "./scenes/lec-z3-09";
import { SC_LEC_Z4_01 } from "./scenes/lec-z4-01";
import { SC_LEC_Z4_02 } from "./scenes/lec-z4-02";
import { SC_LEC_Z4_03 } from "./scenes/lec-z4-03";
import { SC_LEC_Z4_04 } from "./scenes/lec-z4-04";
import { SC_LEC_Z4_05 } from "./scenes/lec-z4-05";
import { SC_LEC_Z4_06 } from "./scenes/lec-z4-06";
import { SC_LEC_Z4_07 } from "./scenes/lec-z4-07";
import { SC_LEC_Z4_08 } from "./scenes/lec-z4-08";
import { SC_LEC_Z4_09 } from "./scenes/lec-z4-09";
import { SC_LEC_Z5_01 } from "./scenes/lec-z5-01";
import { SC_LEC_Z5_02 } from "./scenes/lec-z5-02";
import { SC_LEC_Z5_03 } from "./scenes/lec-z5-03";
import { SC_LEC_Z5_04 } from "./scenes/lec-z5-04";
import { SC_LEC_Z5_05 } from "./scenes/lec-z5-05";
import { SC_LEC_Z5_06 } from "./scenes/lec-z5-06";
import { SC_LEC_Z5_07 } from "./scenes/lec-z5-07";
import { SC_LEC_Z5_08 } from "./scenes/lec-z5-08";
import { SC_LEC_Z5_09 } from "./scenes/lec-z5-09";
import { SC_LEC_Z6_01 } from "./scenes/lec-z6-01";
import { SC_LEC_Z6_02 } from "./scenes/lec-z6-02";
import { SC_LEC_Z6_03 } from "./scenes/lec-z6-03";
import { SC_LEC_Z6_04 } from "./scenes/lec-z6-04";
import { SC_LEC_Z6_05 } from "./scenes/lec-z6-05";
import { SC_LEC_Z6_06 } from "./scenes/lec-z6-06";
import { SC_LEC_Z6_07 } from "./scenes/lec-z6-07";
import { SC_LEC_Z6_08 } from "./scenes/lec-z6-08";
import { SC_LEC_Z6_09 } from "./scenes/lec-z6-09";
import { SC_LEC_Z7_01 } from "./scenes/lec-z7-01";
import { SC_LEC_Z7_02 } from "./scenes/lec-z7-02";
import { SC_LEC_Z7_03 } from "./scenes/lec-z7-03";
import { SC_LEC_Z7_04 } from "./scenes/lec-z7-04";
import { SC_LEC_Z7_05 } from "./scenes/lec-z7-05";
import { SC_LEC_Z7_06 } from "./scenes/lec-z7-06";
import { SC_LEC_Z7_07 } from "./scenes/lec-z7-07";
import { SC_LEC_Z7_08 } from "./scenes/lec-z7-08";
import { SC_LEC_Z7_09 } from "./scenes/lec-z7-09";
import { SC_LEC_Z8_01 } from "./scenes/lec-z8-01";
import { SC_LEC_Z8_02 } from "./scenes/lec-z8-02";
import { SC_LEC_Z8_03 } from "./scenes/lec-z8-03";
import { SC_LEC_Z8_04 } from "./scenes/lec-z8-04";
import { SC_LEC_Z8_05 } from "./scenes/lec-z8-05";
import { SC_LEC_Z8_06 } from "./scenes/lec-z8-06";
import { SC_LEC_Z8_07 } from "./scenes/lec-z8-07";
import { SC_LEC_Z8_08 } from "./scenes/lec-z8-08";
import { SC_LEC_Z8_09 } from "./scenes/lec-z8-09";

export const UZ_LECTURES: Lecture[] = [UZ_Z1_01, UZ_Z1_02, UZ_Z1_03, UZ_Z1_04, UZ_Z1_05, UZ_Z1_06, UZ_Z1_07, UZ_Z1_08, UZ_Z1_09, UZ_Z2_01, UZ_Z2_02, UZ_Z2_03, UZ_Z2_04, UZ_Z2_05, UZ_Z2_06, UZ_Z2_07, UZ_Z2_08, UZ_Z2_09, UZ_Z3_01, UZ_Z3_02, UZ_Z3_03, UZ_Z3_04, UZ_Z3_05, UZ_Z3_06, UZ_Z3_07, UZ_Z3_08, UZ_Z3_09, UZ_Z4_01, UZ_Z4_02, UZ_Z4_03, UZ_Z4_04, UZ_Z4_05, UZ_Z4_06, UZ_Z4_07, UZ_Z4_08, UZ_Z4_09, UZ_Z5_01, UZ_Z5_02, UZ_Z5_03, UZ_Z5_04, UZ_Z5_05, UZ_Z5_06, UZ_Z5_07, UZ_Z5_08, UZ_Z5_09, UZ_Z6_01, UZ_Z6_02, UZ_Z6_03, UZ_Z6_04, UZ_Z6_05, UZ_Z6_06, UZ_Z6_07, UZ_Z6_08, UZ_Z6_09, UZ_Z7_01, UZ_Z7_02, UZ_Z7_03, UZ_Z7_04, UZ_Z7_05, UZ_Z7_06, UZ_Z7_07, UZ_Z7_08, UZ_Z7_09, UZ_Z8_01, UZ_Z8_02, UZ_Z8_03, UZ_Z8_04, UZ_Z8_05, UZ_Z8_06, UZ_Z8_07, UZ_Z8_08, UZ_Z8_09];
export const UZ_DEN: Den[] = [DEN_BRIAN_CHESKY, DEN_HIROOKA_ASAKO, DEN_HONDA_SOICHIRO, DEN_IBUKA_MASARU, DEN_MELANIE_PERKINS, DEN_MERA_HARUKA, DEN_MICHAEL_DELL, DEN_MIKIMOTO_KOKICHI, DEN_MILTON_HERSHEY, DEN_MORI_HANAE, DEN_MURAKAMI_TAICHI, DEN_NAMBA_TOMOKO, DEN_SHIBUSAWA_EIICHI, DEN_TOYODA_SAKICHI, DEN_YAMAGUCHI_ERIKO, DEN_YOKOISHI_TOMOJI];
export const UZ_CASES: CaseStudy[] = [CASE_ASAGOHAN_ANKETO, CASE_CHICKEN_RAMEN, CASE_CREPE, CASE_FRANCHISE_TOWN, CASE_IKITAI_NINZU, CASE_ISHIGAKI_CULTURE, CASE_KOMINKA_CF, CASE_MUJI_SHELF, CASE_SHOTENGAI_SNS, CASE_STICKER_IP, CASE_THIRTEEN_SHOPS, CASE_TSHIRT_ENSEI, CASE_YORU_SHITSUMON];
export const UZ_SHIRYO: ShiryoChapter[] = [SHIRYO_CH1];
export const UZ_ENSHU: Enshu[] = [ENSHU_LV1, ENSHU_LV2, ENSHU_LV3, ENSHU_LV4, ENSHU_LV5, ENSHU_LV6, ENSHU_LV7, ENSHU_LV8, ENSHU_LV9, ENSHU_SHURYO_1, ENSHU_SHURYO_2];
export const UZ_SCENES: SceneBook = {
  "case/asagohan-anketo": SC_CASE_ASAGOHAN_ANKETO,
  "case/chicken-ramen": SC_CASE_CHICKEN_RAMEN,
  "case/crepe": SC_CASE_CREPE,
  "case/franchise-town": SC_CASE_FRANCHISE_TOWN,
  "case/ikitai-ninzu": SC_CASE_IKITAI_NINZU,
  "case/ishigaki-culture": SC_CASE_ISHIGAKI_CULTURE,
  "case/kominka-cf": SC_CASE_KOMINKA_CF,
  "case/muji-shelf": SC_CASE_MUJI_SHELF,
  "case/shotengai-sns": SC_CASE_SHOTENGAI_SNS,
  "case/sticker-ip": SC_CASE_STICKER_IP,
  "case/thirteen-shops": SC_CASE_THIRTEEN_SHOPS,
  "case/tshirt-ensei": SC_CASE_TSHIRT_ENSEI,
  "case/yoru-shitsumon": SC_CASE_YORU_SHITSUMON,
  "den/brian-chesky": SC_DEN_BRIAN_CHESKY,
  "den/michael-dell": SC_DEN_MICHAEL_DELL,
  "den/mikimoto-kokichi": SC_DEN_MIKIMOTO_KOKICHI,
  "den/milton-hershey": SC_DEN_MILTON_HERSHEY,
  "den/mori-hanae": SC_DEN_MORI_HANAE,
  "den/murakami-taichi": SC_DEN_MURAKAMI_TAICHI,
  "den/namba-tomoko": SC_DEN_NAMBA_TOMOKO,
  "den/yamaguchi-eriko": SC_DEN_YAMAGUCHI_ERIKO,
  "lec/z1-01": SC_LEC_Z1_01,
  "lec/z1-02": SC_LEC_Z1_02,
  "lec/z1-03": SC_LEC_Z1_03,
  "lec/z1-04": SC_LEC_Z1_04,
  "lec/z1-05": SC_LEC_Z1_05,
  "lec/z1-06": SC_LEC_Z1_06,
  "lec/z1-07": SC_LEC_Z1_07,
  "lec/z1-08": SC_LEC_Z1_08,
  "lec/z1-09": SC_LEC_Z1_09,
  "lec/z2-01": SC_LEC_Z2_01,
  "lec/z2-02": SC_LEC_Z2_02,
  "lec/z2-03": SC_LEC_Z2_03,
  "lec/z2-04": SC_LEC_Z2_04,
  "lec/z2-05": SC_LEC_Z2_05,
  "lec/z2-06": SC_LEC_Z2_06,
  "lec/z2-07": SC_LEC_Z2_07,
  "lec/z2-08": SC_LEC_Z2_08,
  "lec/z2-09": SC_LEC_Z2_09,
  "lec/z3-01": SC_LEC_Z3_01,
  "lec/z3-02": SC_LEC_Z3_02,
  "lec/z3-03": SC_LEC_Z3_03,
  "lec/z3-04": SC_LEC_Z3_04,
  "lec/z3-05": SC_LEC_Z3_05,
  "lec/z3-06": SC_LEC_Z3_06,
  "lec/z3-07": SC_LEC_Z3_07,
  "lec/z3-08": SC_LEC_Z3_08,
  "lec/z3-09": SC_LEC_Z3_09,
  "lec/z4-01": SC_LEC_Z4_01,
  "lec/z4-02": SC_LEC_Z4_02,
  "lec/z4-03": SC_LEC_Z4_03,
  "lec/z4-04": SC_LEC_Z4_04,
  "lec/z4-05": SC_LEC_Z4_05,
  "lec/z4-06": SC_LEC_Z4_06,
  "lec/z4-07": SC_LEC_Z4_07,
  "lec/z4-08": SC_LEC_Z4_08,
  "lec/z4-09": SC_LEC_Z4_09,
  "lec/z5-01": SC_LEC_Z5_01,
  "lec/z5-02": SC_LEC_Z5_02,
  "lec/z5-03": SC_LEC_Z5_03,
  "lec/z5-04": SC_LEC_Z5_04,
  "lec/z5-05": SC_LEC_Z5_05,
  "lec/z5-06": SC_LEC_Z5_06,
  "lec/z5-07": SC_LEC_Z5_07,
  "lec/z5-08": SC_LEC_Z5_08,
  "lec/z5-09": SC_LEC_Z5_09,
  "lec/z6-01": SC_LEC_Z6_01,
  "lec/z6-02": SC_LEC_Z6_02,
  "lec/z6-03": SC_LEC_Z6_03,
  "lec/z6-04": SC_LEC_Z6_04,
  "lec/z6-05": SC_LEC_Z6_05,
  "lec/z6-06": SC_LEC_Z6_06,
  "lec/z6-07": SC_LEC_Z6_07,
  "lec/z6-08": SC_LEC_Z6_08,
  "lec/z6-09": SC_LEC_Z6_09,
  "lec/z7-01": SC_LEC_Z7_01,
  "lec/z7-02": SC_LEC_Z7_02,
  "lec/z7-03": SC_LEC_Z7_03,
  "lec/z7-04": SC_LEC_Z7_04,
  "lec/z7-05": SC_LEC_Z7_05,
  "lec/z7-06": SC_LEC_Z7_06,
  "lec/z7-07": SC_LEC_Z7_07,
  "lec/z7-08": SC_LEC_Z7_08,
  "lec/z7-09": SC_LEC_Z7_09,
  "lec/z8-01": SC_LEC_Z8_01,
  "lec/z8-02": SC_LEC_Z8_02,
  "lec/z8-03": SC_LEC_Z8_03,
  "lec/z8-04": SC_LEC_Z8_04,
  "lec/z8-05": SC_LEC_Z8_05,
  "lec/z8-06": SC_LEC_Z8_06,
  "lec/z8-07": SC_LEC_Z8_07,
  "lec/z8-08": SC_LEC_Z8_08,
  "lec/z8-09": SC_LEC_Z8_09,
};
