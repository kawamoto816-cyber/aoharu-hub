// 自動生成 (scripts/gen-unizeb.ts)。手で書きかえない。
import type { Lecture } from "@/lib/lecture/types";
import type { Den, CaseStudy, ShiryoChapter, SceneBook, Enshu, Episode } from "./types";
import { UZ_Z1_01 } from "./lectures/z1-01";
import { UZ_Z1_02 } from "./lectures/z1-02";
import { UZ_Z1_03 } from "./lectures/z1-03";
import { UZ_Z1_04 } from "./lectures/z1-04";
import { UZ_Z1_05 } from "./lectures/z1-05";
import { UZ_Z1_06 } from "./lectures/z1-06";
import { UZ_Z1_07 } from "./lectures/z1-07";
import { UZ_Z1_08 } from "./lectures/z1-08";
import { UZ_Z1_09 } from "./lectures/z1-09";
import { UZ_Z1_10 } from "./lectures/z1-10";
import { UZ_Z1_11 } from "./lectures/z1-11";
import { UZ_Z1_12 } from "./lectures/z1-12";
import { UZ_Z1_13 } from "./lectures/z1-13";
import { UZ_Z1_14 } from "./lectures/z1-14";
import { UZ_Z1_15 } from "./lectures/z1-15";
import { UZ_Z2_01 } from "./lectures/z2-01";
import { UZ_Z2_02 } from "./lectures/z2-02";
import { UZ_Z2_03 } from "./lectures/z2-03";
import { UZ_Z2_04 } from "./lectures/z2-04";
import { UZ_Z2_05 } from "./lectures/z2-05";
import { UZ_Z2_06 } from "./lectures/z2-06";
import { UZ_Z2_07 } from "./lectures/z2-07";
import { UZ_Z2_08 } from "./lectures/z2-08";
import { UZ_Z2_09 } from "./lectures/z2-09";
import { UZ_Z2_10 } from "./lectures/z2-10";
import { UZ_Z2_11 } from "./lectures/z2-11";
import { UZ_Z2_12 } from "./lectures/z2-12";
import { UZ_Z2_13 } from "./lectures/z2-13";
import { UZ_Z2_14 } from "./lectures/z2-14";
import { UZ_Z2_15 } from "./lectures/z2-15";
import { UZ_Z3_01 } from "./lectures/z3-01";
import { UZ_Z3_02 } from "./lectures/z3-02";
import { UZ_Z3_03 } from "./lectures/z3-03";
import { UZ_Z3_04 } from "./lectures/z3-04";
import { UZ_Z3_05 } from "./lectures/z3-05";
import { UZ_Z3_06 } from "./lectures/z3-06";
import { UZ_Z3_07 } from "./lectures/z3-07";
import { UZ_Z3_08 } from "./lectures/z3-08";
import { UZ_Z3_09 } from "./lectures/z3-09";
import { UZ_Z3_10 } from "./lectures/z3-10";
import { UZ_Z3_11 } from "./lectures/z3-11";
import { UZ_Z3_12 } from "./lectures/z3-12";
import { UZ_Z3_13 } from "./lectures/z3-13";
import { UZ_Z3_14 } from "./lectures/z3-14";
import { UZ_Z3_15 } from "./lectures/z3-15";
import { UZ_Z4_01 } from "./lectures/z4-01";
import { UZ_Z4_02 } from "./lectures/z4-02";
import { UZ_Z4_03 } from "./lectures/z4-03";
import { UZ_Z4_04 } from "./lectures/z4-04";
import { UZ_Z4_05 } from "./lectures/z4-05";
import { UZ_Z4_06 } from "./lectures/z4-06";
import { UZ_Z4_07 } from "./lectures/z4-07";
import { UZ_Z4_08 } from "./lectures/z4-08";
import { UZ_Z4_09 } from "./lectures/z4-09";
import { UZ_Z4_10 } from "./lectures/z4-10";
import { UZ_Z4_11 } from "./lectures/z4-11";
import { UZ_Z4_12 } from "./lectures/z4-12";
import { UZ_Z4_13 } from "./lectures/z4-13";
import { UZ_Z4_14 } from "./lectures/z4-14";
import { UZ_Z4_15 } from "./lectures/z4-15";
import { UZ_Z5_01 } from "./lectures/z5-01";
import { UZ_Z5_02 } from "./lectures/z5-02";
import { UZ_Z5_03 } from "./lectures/z5-03";
import { UZ_Z5_04 } from "./lectures/z5-04";
import { UZ_Z5_05 } from "./lectures/z5-05";
import { UZ_Z5_06 } from "./lectures/z5-06";
import { UZ_Z5_07 } from "./lectures/z5-07";
import { UZ_Z5_08 } from "./lectures/z5-08";
import { UZ_Z5_09 } from "./lectures/z5-09";
import { UZ_Z5_10 } from "./lectures/z5-10";
import { UZ_Z5_11 } from "./lectures/z5-11";
import { UZ_Z5_12 } from "./lectures/z5-12";
import { UZ_Z5_13 } from "./lectures/z5-13";
import { UZ_Z5_14 } from "./lectures/z5-14";
import { UZ_Z5_15 } from "./lectures/z5-15";
import { UZ_Z6_01 } from "./lectures/z6-01";
import { UZ_Z6_02 } from "./lectures/z6-02";
import { UZ_Z6_03 } from "./lectures/z6-03";
import { UZ_Z6_04 } from "./lectures/z6-04";
import { UZ_Z6_05 } from "./lectures/z6-05";
import { UZ_Z6_06 } from "./lectures/z6-06";
import { UZ_Z6_07 } from "./lectures/z6-07";
import { UZ_Z6_08 } from "./lectures/z6-08";
import { UZ_Z6_09 } from "./lectures/z6-09";
import { UZ_Z6_10 } from "./lectures/z6-10";
import { UZ_Z6_11 } from "./lectures/z6-11";
import { UZ_Z6_12 } from "./lectures/z6-12";
import { UZ_Z6_13 } from "./lectures/z6-13";
import { UZ_Z6_14 } from "./lectures/z6-14";
import { UZ_Z6_15 } from "./lectures/z6-15";
import { UZ_Z7_01 } from "./lectures/z7-01";
import { UZ_Z7_02 } from "./lectures/z7-02";
import { UZ_Z7_03 } from "./lectures/z7-03";
import { UZ_Z7_04 } from "./lectures/z7-04";
import { UZ_Z7_05 } from "./lectures/z7-05";
import { UZ_Z7_06 } from "./lectures/z7-06";
import { UZ_Z7_07 } from "./lectures/z7-07";
import { UZ_Z7_08 } from "./lectures/z7-08";
import { UZ_Z7_09 } from "./lectures/z7-09";
import { UZ_Z7_10 } from "./lectures/z7-10";
import { UZ_Z7_11 } from "./lectures/z7-11";
import { UZ_Z7_12 } from "./lectures/z7-12";
import { UZ_Z7_13 } from "./lectures/z7-13";
import { UZ_Z7_14 } from "./lectures/z7-14";
import { UZ_Z7_15 } from "./lectures/z7-15";
import { UZ_Z8_01 } from "./lectures/z8-01";
import { UZ_Z8_02 } from "./lectures/z8-02";
import { UZ_Z8_03 } from "./lectures/z8-03";
import { UZ_Z8_04 } from "./lectures/z8-04";
import { UZ_Z8_05 } from "./lectures/z8-05";
import { UZ_Z8_06 } from "./lectures/z8-06";
import { UZ_Z8_07 } from "./lectures/z8-07";
import { UZ_Z8_08 } from "./lectures/z8-08";
import { UZ_Z8_09 } from "./lectures/z8-09";
import { UZ_Z8_10 } from "./lectures/z8-10";
import { UZ_Z8_11 } from "./lectures/z8-11";
import { UZ_Z8_12 } from "./lectures/z8-12";
import { UZ_Z8_13 } from "./lectures/z8-13";
import { UZ_Z8_14 } from "./lectures/z8-14";
import { UZ_Z8_15 } from "./lectures/z8-15";
import { DEN_ANITA_RODDICK } from "./den/anita-roddick";
import { DEN_BOYAN_SLAT } from "./den/boyan-slat";
import { DEN_BRIAN_CHESKY } from "./den/brian-chesky";
import { DEN_ESTEE_LAUDER } from "./den/estee-lauder";
import { DEN_HIROOKA_ASAKO } from "./den/hirooka-asako";
import { DEN_HONDA_SOICHIRO } from "./den/honda-soichiro";
import { DEN_IBUKA_MASARU } from "./den/ibuka-masaru";
import { DEN_IZUMO_MITSURU } from "./den/izumo-mitsuru";
import { DEN_KOMAZAKI_HIROKI } from "./den/komazaki-hiroki";
import { DEN_MADAM_CJ_WALKER } from "./den/madam-cj-walker";
import { DEN_MATSUBA_TOMI } from "./den/matsuba-tomi";
import { DEN_MELANIE_PERKINS } from "./den/melanie-perkins";
import { DEN_MERA_HARUKA } from "./den/mera-haruka";
import { DEN_MICHAEL_DELL } from "./den/michael-dell";
import { DEN_MIKIMOTO_KOKICHI } from "./den/mikimoto-kokichi";
import { DEN_MILTON_HERSHEY } from "./den/milton-hershey";
import { DEN_MORI_HANAE } from "./den/mori-hanae";
import { DEN_MURAKAMI_TAICHI } from "./den/murakami-taichi";
import { DEN_NAKA_AKIKO } from "./den/naka-akiko";
import { DEN_NAMBA_TOMOKO } from "./den/namba-tomoko";
import { DEN_SAM_WALTON } from "./den/sam-walton";
import { DEN_SARA_BLAKELY } from "./den/sara-blakely";
import { DEN_SHIBUSAWA_EIICHI } from "./den/shibusawa-eiichi";
import { DEN_SOMA_KOKKO } from "./den/soma-kokko";
import { DEN_TAKAHASHI_HIROYUKI } from "./den/takahashi-hiroyuki";
import { DEN_TOYODA_SAKICHI } from "./den/toyoda-sakichi";
import { DEN_YAMAGUCHI_ERIKO } from "./den/yamaguchi-eriko";
import { DEN_YOKOISHI_TOMOJI } from "./den/yokoishi-tomoji";
import { DEN_YOSHIFUJI_ORY } from "./den/yoshifuji-ory";
import { CASE_ASAGOHAN_ANKETO } from "./case/asagohan-anketo";
import { CASE_CHICKEN_RAMEN } from "./case/chicken-ramen";
import { CASE_CREPE } from "./case/crepe";
import { CASE_FILM_SECOND_FOUNDING } from "./case/film-second-founding";
import { CASE_FRANCHISE_TOWN } from "./case/franchise-town";
import { CASE_HANAFUDA_TO_TVGAME } from "./case/hanafuda-to-tvgame";
import { CASE_IKITAI_NINZU } from "./case/ikitai-ninzu";
import { CASE_ISHIGAKI_CULTURE } from "./case/ishigaki-culture";
import { CASE_KOMINKA_CF } from "./case/kominka-cf";
import { CASE_KUROJI_TOSAN } from "./case/kuroji-tosan";
import { CASE_MUJI_SHELF } from "./case/muji-shelf";
import { CASE_SHOTENGAI_SNS } from "./case/shotengai-sns";
import { CASE_SHUSSHI_MOCHIBUN } from "./case/shusshi-mochibun";
import { CASE_STICKER_IP } from "./case/sticker-ip";
import { CASE_TAKKYUBIN_ELEVEN } from "./case/takkyubin-eleven";
import { CASE_THIRTEEN_SHOPS } from "./case/thirteen-shops";
import { CASE_TSHIRT_ENSEI } from "./case/tshirt-ensei";
import { CASE_WAGASHI_BUNPAI } from "./case/wagashi-bunpai";
import { CASE_YASERU_KOKOKU } from "./case/yaseru-kokoku";
import { CASE_YORU_SHITSUMON } from "./case/yoru-shitsumon";
import { SHIRYO_CH1 } from "./shiryo/ch1-hojin";
import { SHIRYO_CH2 } from "./shiryo/ch2-shikin";
import { SHIRYO_CH3 } from "./shiryo/ch3-chizai";
import { SHIRYO_CH4 } from "./shiryo/ch4-keiyaku";
import { SHIRYO_CH5 } from "./shiryo/ch5-zei";
import { SHIRYO_CH6 } from "./shiryo/ch6-kaikei";
import { SHIRYO_CH7 } from "./shiryo/ch7-shijo";
import { SHIRYO_CH8 } from "./shiryo/ch8-rekishi";
import { SHIRYO_CH9 } from "./shiryo/ch9-tokei";
import { SHIRYO_CH10 } from "./shiryo/ch10-nenrei";
import { SHIRYO_CH11 } from "./shiryo/ch11-yogo";
import { ENSHU_LV1 } from "./enshu/lv1";
import { ENSHU_LV2 } from "./enshu/lv2";
import { ENSHU_LV3 } from "./enshu/lv3";
import { ENSHU_LV4 } from "./enshu/lv4";
import { ENSHU_LV5 } from "./enshu/lv5";
import { ENSHU_LV6 } from "./enshu/lv6";
import { ENSHU_LV7 } from "./enshu/lv7";
import { ENSHU_LV8 } from "./enshu/lv8";
import { ENSHU_LV9 } from "./enshu/lv9";
import { ENSHU_LV10 } from "./enshu/lv10";
import { ENSHU_LV11 } from "./enshu/lv11";
import { ENSHU_LV12 } from "./enshu/lv12";
import { ENSHU_LV13 } from "./enshu/lv13";
import { ENSHU_LV14 } from "./enshu/lv14";
import { ENSHU_LV15 } from "./enshu/lv15";
import { ENSHU_SHOSHIN_1 } from "./enshu/shoshin-1";
import { ENSHU_SHOSHIN_2 } from "./enshu/shoshin-2";
import { ENSHU_SHOSHIN_3 } from "./enshu/shoshin-3";
import { ENSHU_SHURYO_1 } from "./enshu/shuryo-1";
import { ENSHU_SHURYO_2 } from "./enshu/shuryo-2";
import { ENSHU_SHURYO_3 } from "./enshu/shuryo-3";
import { EP_AIRBNB_AIRBED } from "./ep/airbnb-airbed";
import { EP_ALTAIR_BASIC } from "./ep/altair-basic";
import { EP_AMAZON_BOOKS } from "./ep/amazon-books";
import { EP_BLUE_RIBBON } from "./ep/blue-ribbon";
import { EP_BODY_SHOP_REFILL } from "./ep/body-shop-refill";
import { EP_CHICKEN_RAMEN_KOYA } from "./ep/chicken-ramen-koya";
import { EP_CHOUINARD_CHOCK } from "./ep/chouinard-chock";
import { EP_DROPBOX_USB } from "./ep/dropbox-usb";
import { EP_EUGLENA_501 } from "./ep/euglena-501";
import { EP_FLORENCE_HOUMON } from "./ep/florence-houmon";
import { EP_FUSION_BOOKS } from "./ep/fusion-books";
import { EP_HONDA_HOJO } from "./ep/honda-hojo";
import { EP_HP_200A } from "./ep/hp-200a";
import { EP_IL_GIORNALE } from "./ep/il-giornale";
import { EP_INSTAGRAM_BURBN } from "./ep/instagram-burbn";
import { EP_IRODORI_RYOTEI } from "./ep/irodori-ryotei";
import { EP_JAPANET_RADIO } from "./ep/japanet-radio";
import { EP_KIVA_25 } from "./ep/kiva-25";
import { EP_LEGO_PLASTIC } from "./ep/lego-plastic";
import { EP_MUJI_40 } from "./ep/muji-40";
import { EP_NETFLIX_TEIGAKU } from "./ep/netflix-teigaku";
import { EP_PCS_LIMITED } from "./ep/pcs-limited";
import { EP_RAKUTEN_RMS } from "./ep/rakuten-rms";
import { EP_SEVEN_TOYOSU } from "./ep/seven-toyosu";
import { EP_SLACK_GLITCH } from "./ep/slack-glitch";
import { EP_SPANX_BUYER } from "./ep/spanx-buyer";
import { EP_TAKKYUBIN } from "./ep/takkyubin";
import { EP_UNIQLO_ROADSIDE } from "./ep/uniqlo-roadside";
import { EP_WALMART_ROGERS } from "./ep/walmart-rogers";
import { EP_WARBY_HOMETRY } from "./ep/warby-hometry";
import { SC_CASE_ASAGOHAN_ANKETO } from "./scenes/case-asagohan-anketo";
import { SC_CASE_CHICKEN_RAMEN } from "./scenes/case-chicken-ramen";
import { SC_CASE_CREPE } from "./scenes/case-crepe";
import { SC_CASE_FILM_SECOND_FOUNDING } from "./scenes/case-film-second-founding";
import { SC_CASE_FRANCHISE_TOWN } from "./scenes/case-franchise-town";
import { SC_CASE_HANAFUDA_TO_TVGAME } from "./scenes/case-hanafuda-to-tvgame";
import { SC_CASE_IKITAI_NINZU } from "./scenes/case-ikitai-ninzu";
import { SC_CASE_ISHIGAKI_CULTURE } from "./scenes/case-ishigaki-culture";
import { SC_CASE_KOMINKA_CF } from "./scenes/case-kominka-cf";
import { SC_CASE_KUROJI_TOSAN } from "./scenes/case-kuroji-tosan";
import { SC_CASE_MUJI_SHELF } from "./scenes/case-muji-shelf";
import { SC_CASE_SHOTENGAI_SNS } from "./scenes/case-shotengai-sns";
import { SC_CASE_SHUSSHI_MOCHIBUN } from "./scenes/case-shusshi-mochibun";
import { SC_CASE_STICKER_IP } from "./scenes/case-sticker-ip";
import { SC_CASE_TAKKYUBIN_ELEVEN } from "./scenes/case-takkyubin-eleven";
import { SC_CASE_THIRTEEN_SHOPS } from "./scenes/case-thirteen-shops";
import { SC_CASE_TSHIRT_ENSEI } from "./scenes/case-tshirt-ensei";
import { SC_CASE_WAGASHI_BUNPAI } from "./scenes/case-wagashi-bunpai";
import { SC_CASE_YASERU_KOKOKU } from "./scenes/case-yaseru-kokoku";
import { SC_CASE_YORU_SHITSUMON } from "./scenes/case-yoru-shitsumon";
import { SC_DEN_ANITA_RODDICK } from "./scenes/den-anita-roddick";
import { SC_DEN_BOYAN_SLAT } from "./scenes/den-boyan-slat";
import { SC_DEN_BRIAN_CHESKY } from "./scenes/den-brian-chesky";
import { SC_DEN_ESTEE_LAUDER } from "./scenes/den-estee-lauder";
import { SC_DEN_IZUMO_MITSURU } from "./scenes/den-izumo-mitsuru";
import { SC_DEN_KOMAZAKI_HIROKI } from "./scenes/den-komazaki-hiroki";
import { SC_DEN_MADAM_CJ_WALKER } from "./scenes/den-madam-cj-walker";
import { SC_DEN_MATSUBA_TOMI } from "./scenes/den-matsuba-tomi";
import { SC_DEN_MICHAEL_DELL } from "./scenes/den-michael-dell";
import { SC_DEN_MIKIMOTO_KOKICHI } from "./scenes/den-mikimoto-kokichi";
import { SC_DEN_MILTON_HERSHEY } from "./scenes/den-milton-hershey";
import { SC_DEN_MORI_HANAE } from "./scenes/den-mori-hanae";
import { SC_DEN_MURAKAMI_TAICHI } from "./scenes/den-murakami-taichi";
import { SC_DEN_NAKA_AKIKO } from "./scenes/den-naka-akiko";
import { SC_DEN_NAMBA_TOMOKO } from "./scenes/den-namba-tomoko";
import { SC_DEN_SAM_WALTON } from "./scenes/den-sam-walton";
import { SC_DEN_SARA_BLAKELY } from "./scenes/den-sara-blakely";
import { SC_DEN_SOMA_KOKKO } from "./scenes/den-soma-kokko";
import { SC_DEN_TAKAHASHI_HIROYUKI } from "./scenes/den-takahashi-hiroyuki";
import { SC_DEN_YAMAGUCHI_ERIKO } from "./scenes/den-yamaguchi-eriko";
import { SC_DEN_YOSHIFUJI_ORY } from "./scenes/den-yoshifuji-ory";
import { SC_EP_AIRBNB_AIRBED } from "./scenes/ep-airbnb-airbed";
import { SC_EP_ALTAIR_BASIC } from "./scenes/ep-altair-basic";
import { SC_EP_AMAZON_BOOKS } from "./scenes/ep-amazon-books";
import { SC_EP_BLUE_RIBBON } from "./scenes/ep-blue-ribbon";
import { SC_EP_BODY_SHOP_REFILL } from "./scenes/ep-body-shop-refill";
import { SC_EP_CHICKEN_RAMEN_KOYA } from "./scenes/ep-chicken-ramen-koya";
import { SC_EP_CHOUINARD_CHOCK } from "./scenes/ep-chouinard-chock";
import { SC_EP_DROPBOX_USB } from "./scenes/ep-dropbox-usb";
import { SC_EP_EUGLENA_501 } from "./scenes/ep-euglena-501";
import { SC_EP_FLORENCE_HOUMON } from "./scenes/ep-florence-houmon";
import { SC_EP_FUSION_BOOKS } from "./scenes/ep-fusion-books";
import { SC_EP_HONDA_HOJO } from "./scenes/ep-honda-hojo";
import { SC_EP_HP_200A } from "./scenes/ep-hp-200a";
import { SC_EP_IL_GIORNALE } from "./scenes/ep-il-giornale";
import { SC_EP_INSTAGRAM_BURBN } from "./scenes/ep-instagram-burbn";
import { SC_EP_IRODORI_RYOTEI } from "./scenes/ep-irodori-ryotei";
import { SC_EP_JAPANET_RADIO } from "./scenes/ep-japanet-radio";
import { SC_EP_KIVA_25 } from "./scenes/ep-kiva-25";
import { SC_EP_LEGO_PLASTIC } from "./scenes/ep-lego-plastic";
import { SC_EP_MUJI_40 } from "./scenes/ep-muji-40";
import { SC_EP_NETFLIX_TEIGAKU } from "./scenes/ep-netflix-teigaku";
import { SC_EP_PCS_LIMITED } from "./scenes/ep-pcs-limited";
import { SC_EP_RAKUTEN_RMS } from "./scenes/ep-rakuten-rms";
import { SC_EP_SEVEN_TOYOSU } from "./scenes/ep-seven-toyosu";
import { SC_EP_SLACK_GLITCH } from "./scenes/ep-slack-glitch";
import { SC_EP_SPANX_BUYER } from "./scenes/ep-spanx-buyer";
import { SC_EP_TAKKYUBIN } from "./scenes/ep-takkyubin";
import { SC_EP_UNIQLO_ROADSIDE } from "./scenes/ep-uniqlo-roadside";
import { SC_EP_WALMART_ROGERS } from "./scenes/ep-walmart-rogers";
import { SC_EP_WARBY_HOMETRY } from "./scenes/ep-warby-hometry";
import { SC_LEC_Z1_01 } from "./scenes/lec-z1-01";
import { SC_LEC_Z1_02 } from "./scenes/lec-z1-02";
import { SC_LEC_Z1_03 } from "./scenes/lec-z1-03";
import { SC_LEC_Z1_04 } from "./scenes/lec-z1-04";
import { SC_LEC_Z1_05 } from "./scenes/lec-z1-05";
import { SC_LEC_Z1_06 } from "./scenes/lec-z1-06";
import { SC_LEC_Z1_07 } from "./scenes/lec-z1-07";
import { SC_LEC_Z1_08 } from "./scenes/lec-z1-08";
import { SC_LEC_Z1_09 } from "./scenes/lec-z1-09";
import { SC_LEC_Z1_10 } from "./scenes/lec-z1-10";
import { SC_LEC_Z1_11 } from "./scenes/lec-z1-11";
import { SC_LEC_Z1_12 } from "./scenes/lec-z1-12";
import { SC_LEC_Z1_13 } from "./scenes/lec-z1-13";
import { SC_LEC_Z1_14 } from "./scenes/lec-z1-14";
import { SC_LEC_Z1_15 } from "./scenes/lec-z1-15";
import { SC_LEC_Z2_01 } from "./scenes/lec-z2-01";
import { SC_LEC_Z2_02 } from "./scenes/lec-z2-02";
import { SC_LEC_Z2_03 } from "./scenes/lec-z2-03";
import { SC_LEC_Z2_04 } from "./scenes/lec-z2-04";
import { SC_LEC_Z2_05 } from "./scenes/lec-z2-05";
import { SC_LEC_Z2_06 } from "./scenes/lec-z2-06";
import { SC_LEC_Z2_07 } from "./scenes/lec-z2-07";
import { SC_LEC_Z2_08 } from "./scenes/lec-z2-08";
import { SC_LEC_Z2_09 } from "./scenes/lec-z2-09";
import { SC_LEC_Z2_10 } from "./scenes/lec-z2-10";
import { SC_LEC_Z2_11 } from "./scenes/lec-z2-11";
import { SC_LEC_Z2_12 } from "./scenes/lec-z2-12";
import { SC_LEC_Z2_13 } from "./scenes/lec-z2-13";
import { SC_LEC_Z2_14 } from "./scenes/lec-z2-14";
import { SC_LEC_Z2_15 } from "./scenes/lec-z2-15";
import { SC_LEC_Z3_01 } from "./scenes/lec-z3-01";
import { SC_LEC_Z3_02 } from "./scenes/lec-z3-02";
import { SC_LEC_Z3_03 } from "./scenes/lec-z3-03";
import { SC_LEC_Z3_04 } from "./scenes/lec-z3-04";
import { SC_LEC_Z3_05 } from "./scenes/lec-z3-05";
import { SC_LEC_Z3_06 } from "./scenes/lec-z3-06";
import { SC_LEC_Z3_07 } from "./scenes/lec-z3-07";
import { SC_LEC_Z3_08 } from "./scenes/lec-z3-08";
import { SC_LEC_Z3_09 } from "./scenes/lec-z3-09";
import { SC_LEC_Z3_10 } from "./scenes/lec-z3-10";
import { SC_LEC_Z3_11 } from "./scenes/lec-z3-11";
import { SC_LEC_Z3_12 } from "./scenes/lec-z3-12";
import { SC_LEC_Z3_13 } from "./scenes/lec-z3-13";
import { SC_LEC_Z3_14 } from "./scenes/lec-z3-14";
import { SC_LEC_Z3_15 } from "./scenes/lec-z3-15";
import { SC_LEC_Z4_01 } from "./scenes/lec-z4-01";
import { SC_LEC_Z4_02 } from "./scenes/lec-z4-02";
import { SC_LEC_Z4_03 } from "./scenes/lec-z4-03";
import { SC_LEC_Z4_04 } from "./scenes/lec-z4-04";
import { SC_LEC_Z4_05 } from "./scenes/lec-z4-05";
import { SC_LEC_Z4_06 } from "./scenes/lec-z4-06";
import { SC_LEC_Z4_07 } from "./scenes/lec-z4-07";
import { SC_LEC_Z4_08 } from "./scenes/lec-z4-08";
import { SC_LEC_Z4_09 } from "./scenes/lec-z4-09";
import { SC_LEC_Z4_10 } from "./scenes/lec-z4-10";
import { SC_LEC_Z4_11 } from "./scenes/lec-z4-11";
import { SC_LEC_Z4_12 } from "./scenes/lec-z4-12";
import { SC_LEC_Z4_13 } from "./scenes/lec-z4-13";
import { SC_LEC_Z4_14 } from "./scenes/lec-z4-14";
import { SC_LEC_Z4_15 } from "./scenes/lec-z4-15";
import { SC_LEC_Z5_01 } from "./scenes/lec-z5-01";
import { SC_LEC_Z5_02 } from "./scenes/lec-z5-02";
import { SC_LEC_Z5_03 } from "./scenes/lec-z5-03";
import { SC_LEC_Z5_04 } from "./scenes/lec-z5-04";
import { SC_LEC_Z5_05 } from "./scenes/lec-z5-05";
import { SC_LEC_Z5_06 } from "./scenes/lec-z5-06";
import { SC_LEC_Z5_07 } from "./scenes/lec-z5-07";
import { SC_LEC_Z5_08 } from "./scenes/lec-z5-08";
import { SC_LEC_Z5_09 } from "./scenes/lec-z5-09";
import { SC_LEC_Z5_10 } from "./scenes/lec-z5-10";
import { SC_LEC_Z5_11 } from "./scenes/lec-z5-11";
import { SC_LEC_Z5_12 } from "./scenes/lec-z5-12";
import { SC_LEC_Z5_13 } from "./scenes/lec-z5-13";
import { SC_LEC_Z5_14 } from "./scenes/lec-z5-14";
import { SC_LEC_Z5_15 } from "./scenes/lec-z5-15";
import { SC_LEC_Z6_01 } from "./scenes/lec-z6-01";
import { SC_LEC_Z6_02 } from "./scenes/lec-z6-02";
import { SC_LEC_Z6_03 } from "./scenes/lec-z6-03";
import { SC_LEC_Z6_04 } from "./scenes/lec-z6-04";
import { SC_LEC_Z6_05 } from "./scenes/lec-z6-05";
import { SC_LEC_Z6_06 } from "./scenes/lec-z6-06";
import { SC_LEC_Z6_07 } from "./scenes/lec-z6-07";
import { SC_LEC_Z6_08 } from "./scenes/lec-z6-08";
import { SC_LEC_Z6_09 } from "./scenes/lec-z6-09";
import { SC_LEC_Z6_10 } from "./scenes/lec-z6-10";
import { SC_LEC_Z6_11 } from "./scenes/lec-z6-11";
import { SC_LEC_Z6_12 } from "./scenes/lec-z6-12";
import { SC_LEC_Z6_13 } from "./scenes/lec-z6-13";
import { SC_LEC_Z6_14 } from "./scenes/lec-z6-14";
import { SC_LEC_Z6_15 } from "./scenes/lec-z6-15";
import { SC_LEC_Z7_01 } from "./scenes/lec-z7-01";
import { SC_LEC_Z7_02 } from "./scenes/lec-z7-02";
import { SC_LEC_Z7_03 } from "./scenes/lec-z7-03";
import { SC_LEC_Z7_04 } from "./scenes/lec-z7-04";
import { SC_LEC_Z7_05 } from "./scenes/lec-z7-05";
import { SC_LEC_Z7_06 } from "./scenes/lec-z7-06";
import { SC_LEC_Z7_07 } from "./scenes/lec-z7-07";
import { SC_LEC_Z7_08 } from "./scenes/lec-z7-08";
import { SC_LEC_Z7_09 } from "./scenes/lec-z7-09";
import { SC_LEC_Z7_10 } from "./scenes/lec-z7-10";
import { SC_LEC_Z7_11 } from "./scenes/lec-z7-11";
import { SC_LEC_Z7_12 } from "./scenes/lec-z7-12";
import { SC_LEC_Z7_13 } from "./scenes/lec-z7-13";
import { SC_LEC_Z7_14 } from "./scenes/lec-z7-14";
import { SC_LEC_Z7_15 } from "./scenes/lec-z7-15";
import { SC_LEC_Z8_01 } from "./scenes/lec-z8-01";
import { SC_LEC_Z8_02 } from "./scenes/lec-z8-02";
import { SC_LEC_Z8_03 } from "./scenes/lec-z8-03";
import { SC_LEC_Z8_04 } from "./scenes/lec-z8-04";
import { SC_LEC_Z8_05 } from "./scenes/lec-z8-05";
import { SC_LEC_Z8_06 } from "./scenes/lec-z8-06";
import { SC_LEC_Z8_07 } from "./scenes/lec-z8-07";
import { SC_LEC_Z8_08 } from "./scenes/lec-z8-08";
import { SC_LEC_Z8_09 } from "./scenes/lec-z8-09";
import { SC_LEC_Z8_10 } from "./scenes/lec-z8-10";
import { SC_LEC_Z8_11 } from "./scenes/lec-z8-11";
import { SC_LEC_Z8_12 } from "./scenes/lec-z8-12";
import { SC_LEC_Z8_13 } from "./scenes/lec-z8-13";
import { SC_LEC_Z8_14 } from "./scenes/lec-z8-14";
import { SC_LEC_Z8_15 } from "./scenes/lec-z8-15";

export const UZ_LECTURES: Lecture[] = [UZ_Z1_01, UZ_Z1_02, UZ_Z1_03, UZ_Z1_04, UZ_Z1_05, UZ_Z1_06, UZ_Z1_07, UZ_Z1_08, UZ_Z1_09, UZ_Z1_10, UZ_Z1_11, UZ_Z1_12, UZ_Z1_13, UZ_Z1_14, UZ_Z1_15, UZ_Z2_01, UZ_Z2_02, UZ_Z2_03, UZ_Z2_04, UZ_Z2_05, UZ_Z2_06, UZ_Z2_07, UZ_Z2_08, UZ_Z2_09, UZ_Z2_10, UZ_Z2_11, UZ_Z2_12, UZ_Z2_13, UZ_Z2_14, UZ_Z2_15, UZ_Z3_01, UZ_Z3_02, UZ_Z3_03, UZ_Z3_04, UZ_Z3_05, UZ_Z3_06, UZ_Z3_07, UZ_Z3_08, UZ_Z3_09, UZ_Z3_10, UZ_Z3_11, UZ_Z3_12, UZ_Z3_13, UZ_Z3_14, UZ_Z3_15, UZ_Z4_01, UZ_Z4_02, UZ_Z4_03, UZ_Z4_04, UZ_Z4_05, UZ_Z4_06, UZ_Z4_07, UZ_Z4_08, UZ_Z4_09, UZ_Z4_10, UZ_Z4_11, UZ_Z4_12, UZ_Z4_13, UZ_Z4_14, UZ_Z4_15, UZ_Z5_01, UZ_Z5_02, UZ_Z5_03, UZ_Z5_04, UZ_Z5_05, UZ_Z5_06, UZ_Z5_07, UZ_Z5_08, UZ_Z5_09, UZ_Z5_10, UZ_Z5_11, UZ_Z5_12, UZ_Z5_13, UZ_Z5_14, UZ_Z5_15, UZ_Z6_01, UZ_Z6_02, UZ_Z6_03, UZ_Z6_04, UZ_Z6_05, UZ_Z6_06, UZ_Z6_07, UZ_Z6_08, UZ_Z6_09, UZ_Z6_10, UZ_Z6_11, UZ_Z6_12, UZ_Z6_13, UZ_Z6_14, UZ_Z6_15, UZ_Z7_01, UZ_Z7_02, UZ_Z7_03, UZ_Z7_04, UZ_Z7_05, UZ_Z7_06, UZ_Z7_07, UZ_Z7_08, UZ_Z7_09, UZ_Z7_10, UZ_Z7_11, UZ_Z7_12, UZ_Z7_13, UZ_Z7_14, UZ_Z7_15, UZ_Z8_01, UZ_Z8_02, UZ_Z8_03, UZ_Z8_04, UZ_Z8_05, UZ_Z8_06, UZ_Z8_07, UZ_Z8_08, UZ_Z8_09, UZ_Z8_10, UZ_Z8_11, UZ_Z8_12, UZ_Z8_13, UZ_Z8_14, UZ_Z8_15];
export const UZ_DEN: Den[] = [DEN_ANITA_RODDICK, DEN_BOYAN_SLAT, DEN_BRIAN_CHESKY, DEN_ESTEE_LAUDER, DEN_HIROOKA_ASAKO, DEN_HONDA_SOICHIRO, DEN_IBUKA_MASARU, DEN_IZUMO_MITSURU, DEN_KOMAZAKI_HIROKI, DEN_MADAM_CJ_WALKER, DEN_MATSUBA_TOMI, DEN_MELANIE_PERKINS, DEN_MERA_HARUKA, DEN_MICHAEL_DELL, DEN_MIKIMOTO_KOKICHI, DEN_MILTON_HERSHEY, DEN_MORI_HANAE, DEN_MURAKAMI_TAICHI, DEN_NAKA_AKIKO, DEN_NAMBA_TOMOKO, DEN_SAM_WALTON, DEN_SARA_BLAKELY, DEN_SHIBUSAWA_EIICHI, DEN_SOMA_KOKKO, DEN_TAKAHASHI_HIROYUKI, DEN_TOYODA_SAKICHI, DEN_YAMAGUCHI_ERIKO, DEN_YOKOISHI_TOMOJI, DEN_YOSHIFUJI_ORY];
export const UZ_CASES: CaseStudy[] = [CASE_ASAGOHAN_ANKETO, CASE_CHICKEN_RAMEN, CASE_CREPE, CASE_FILM_SECOND_FOUNDING, CASE_FRANCHISE_TOWN, CASE_HANAFUDA_TO_TVGAME, CASE_IKITAI_NINZU, CASE_ISHIGAKI_CULTURE, CASE_KOMINKA_CF, CASE_KUROJI_TOSAN, CASE_MUJI_SHELF, CASE_SHOTENGAI_SNS, CASE_SHUSSHI_MOCHIBUN, CASE_STICKER_IP, CASE_TAKKYUBIN_ELEVEN, CASE_THIRTEEN_SHOPS, CASE_TSHIRT_ENSEI, CASE_WAGASHI_BUNPAI, CASE_YASERU_KOKOKU, CASE_YORU_SHITSUMON];
export const UZ_SHIRYO: ShiryoChapter[] = [SHIRYO_CH1, SHIRYO_CH2, SHIRYO_CH3, SHIRYO_CH4, SHIRYO_CH5, SHIRYO_CH6, SHIRYO_CH7, SHIRYO_CH8, SHIRYO_CH9, SHIRYO_CH10, SHIRYO_CH11];
export const UZ_ENSHU: Enshu[] = [ENSHU_LV1, ENSHU_LV2, ENSHU_LV3, ENSHU_LV4, ENSHU_LV5, ENSHU_LV6, ENSHU_LV7, ENSHU_LV8, ENSHU_LV9, ENSHU_LV10, ENSHU_LV11, ENSHU_LV12, ENSHU_LV13, ENSHU_LV14, ENSHU_LV15, ENSHU_SHOSHIN_1, ENSHU_SHOSHIN_2, ENSHU_SHOSHIN_3, ENSHU_SHURYO_1, ENSHU_SHURYO_2, ENSHU_SHURYO_3];
export const UZ_EP: Episode[] = [EP_AIRBNB_AIRBED, EP_ALTAIR_BASIC, EP_AMAZON_BOOKS, EP_BLUE_RIBBON, EP_BODY_SHOP_REFILL, EP_CHICKEN_RAMEN_KOYA, EP_CHOUINARD_CHOCK, EP_DROPBOX_USB, EP_EUGLENA_501, EP_FLORENCE_HOUMON, EP_FUSION_BOOKS, EP_HONDA_HOJO, EP_HP_200A, EP_IL_GIORNALE, EP_INSTAGRAM_BURBN, EP_IRODORI_RYOTEI, EP_JAPANET_RADIO, EP_KIVA_25, EP_LEGO_PLASTIC, EP_MUJI_40, EP_NETFLIX_TEIGAKU, EP_PCS_LIMITED, EP_RAKUTEN_RMS, EP_SEVEN_TOYOSU, EP_SLACK_GLITCH, EP_SPANX_BUYER, EP_TAKKYUBIN, EP_UNIQLO_ROADSIDE, EP_WALMART_ROGERS, EP_WARBY_HOMETRY];
export const UZ_SCENES: SceneBook = {
  "case/asagohan-anketo": SC_CASE_ASAGOHAN_ANKETO,
  "case/chicken-ramen": SC_CASE_CHICKEN_RAMEN,
  "case/crepe": SC_CASE_CREPE,
  "case/film-second-founding": SC_CASE_FILM_SECOND_FOUNDING,
  "case/franchise-town": SC_CASE_FRANCHISE_TOWN,
  "case/hanafuda-to-tvgame": SC_CASE_HANAFUDA_TO_TVGAME,
  "case/ikitai-ninzu": SC_CASE_IKITAI_NINZU,
  "case/ishigaki-culture": SC_CASE_ISHIGAKI_CULTURE,
  "case/kominka-cf": SC_CASE_KOMINKA_CF,
  "case/kuroji-tosan": SC_CASE_KUROJI_TOSAN,
  "case/muji-shelf": SC_CASE_MUJI_SHELF,
  "case/shotengai-sns": SC_CASE_SHOTENGAI_SNS,
  "case/shusshi-mochibun": SC_CASE_SHUSSHI_MOCHIBUN,
  "case/sticker-ip": SC_CASE_STICKER_IP,
  "case/takkyubin-eleven": SC_CASE_TAKKYUBIN_ELEVEN,
  "case/thirteen-shops": SC_CASE_THIRTEEN_SHOPS,
  "case/tshirt-ensei": SC_CASE_TSHIRT_ENSEI,
  "case/wagashi-bunpai": SC_CASE_WAGASHI_BUNPAI,
  "case/yaseru-kokoku": SC_CASE_YASERU_KOKOKU,
  "case/yoru-shitsumon": SC_CASE_YORU_SHITSUMON,
  "den/anita-roddick": SC_DEN_ANITA_RODDICK,
  "den/boyan-slat": SC_DEN_BOYAN_SLAT,
  "den/brian-chesky": SC_DEN_BRIAN_CHESKY,
  "den/estee-lauder": SC_DEN_ESTEE_LAUDER,
  "den/izumo-mitsuru": SC_DEN_IZUMO_MITSURU,
  "den/komazaki-hiroki": SC_DEN_KOMAZAKI_HIROKI,
  "den/madam-cj-walker": SC_DEN_MADAM_CJ_WALKER,
  "den/matsuba-tomi": SC_DEN_MATSUBA_TOMI,
  "den/michael-dell": SC_DEN_MICHAEL_DELL,
  "den/mikimoto-kokichi": SC_DEN_MIKIMOTO_KOKICHI,
  "den/milton-hershey": SC_DEN_MILTON_HERSHEY,
  "den/mori-hanae": SC_DEN_MORI_HANAE,
  "den/murakami-taichi": SC_DEN_MURAKAMI_TAICHI,
  "den/naka-akiko": SC_DEN_NAKA_AKIKO,
  "den/namba-tomoko": SC_DEN_NAMBA_TOMOKO,
  "den/sam-walton": SC_DEN_SAM_WALTON,
  "den/sara-blakely": SC_DEN_SARA_BLAKELY,
  "den/soma-kokko": SC_DEN_SOMA_KOKKO,
  "den/takahashi-hiroyuki": SC_DEN_TAKAHASHI_HIROYUKI,
  "den/yamaguchi-eriko": SC_DEN_YAMAGUCHI_ERIKO,
  "den/yoshifuji-ory": SC_DEN_YOSHIFUJI_ORY,
  "ep/airbnb-airbed": SC_EP_AIRBNB_AIRBED,
  "ep/altair-basic": SC_EP_ALTAIR_BASIC,
  "ep/amazon-books": SC_EP_AMAZON_BOOKS,
  "ep/blue-ribbon": SC_EP_BLUE_RIBBON,
  "ep/body-shop-refill": SC_EP_BODY_SHOP_REFILL,
  "ep/chicken-ramen-koya": SC_EP_CHICKEN_RAMEN_KOYA,
  "ep/chouinard-chock": SC_EP_CHOUINARD_CHOCK,
  "ep/dropbox-usb": SC_EP_DROPBOX_USB,
  "ep/euglena-501": SC_EP_EUGLENA_501,
  "ep/florence-houmon": SC_EP_FLORENCE_HOUMON,
  "ep/fusion-books": SC_EP_FUSION_BOOKS,
  "ep/honda-hojo": SC_EP_HONDA_HOJO,
  "ep/hp-200a": SC_EP_HP_200A,
  "ep/il-giornale": SC_EP_IL_GIORNALE,
  "ep/instagram-burbn": SC_EP_INSTAGRAM_BURBN,
  "ep/irodori-ryotei": SC_EP_IRODORI_RYOTEI,
  "ep/japanet-radio": SC_EP_JAPANET_RADIO,
  "ep/kiva-25": SC_EP_KIVA_25,
  "ep/lego-plastic": SC_EP_LEGO_PLASTIC,
  "ep/muji-40": SC_EP_MUJI_40,
  "ep/netflix-teigaku": SC_EP_NETFLIX_TEIGAKU,
  "ep/pcs-limited": SC_EP_PCS_LIMITED,
  "ep/rakuten-rms": SC_EP_RAKUTEN_RMS,
  "ep/seven-toyosu": SC_EP_SEVEN_TOYOSU,
  "ep/slack-glitch": SC_EP_SLACK_GLITCH,
  "ep/spanx-buyer": SC_EP_SPANX_BUYER,
  "ep/takkyubin": SC_EP_TAKKYUBIN,
  "ep/uniqlo-roadside": SC_EP_UNIQLO_ROADSIDE,
  "ep/walmart-rogers": SC_EP_WALMART_ROGERS,
  "ep/warby-hometry": SC_EP_WARBY_HOMETRY,
  "lec/z1-01": SC_LEC_Z1_01,
  "lec/z1-02": SC_LEC_Z1_02,
  "lec/z1-03": SC_LEC_Z1_03,
  "lec/z1-04": SC_LEC_Z1_04,
  "lec/z1-05": SC_LEC_Z1_05,
  "lec/z1-06": SC_LEC_Z1_06,
  "lec/z1-07": SC_LEC_Z1_07,
  "lec/z1-08": SC_LEC_Z1_08,
  "lec/z1-09": SC_LEC_Z1_09,
  "lec/z1-10": SC_LEC_Z1_10,
  "lec/z1-11": SC_LEC_Z1_11,
  "lec/z1-12": SC_LEC_Z1_12,
  "lec/z1-13": SC_LEC_Z1_13,
  "lec/z1-14": SC_LEC_Z1_14,
  "lec/z1-15": SC_LEC_Z1_15,
  "lec/z2-01": SC_LEC_Z2_01,
  "lec/z2-02": SC_LEC_Z2_02,
  "lec/z2-03": SC_LEC_Z2_03,
  "lec/z2-04": SC_LEC_Z2_04,
  "lec/z2-05": SC_LEC_Z2_05,
  "lec/z2-06": SC_LEC_Z2_06,
  "lec/z2-07": SC_LEC_Z2_07,
  "lec/z2-08": SC_LEC_Z2_08,
  "lec/z2-09": SC_LEC_Z2_09,
  "lec/z2-10": SC_LEC_Z2_10,
  "lec/z2-11": SC_LEC_Z2_11,
  "lec/z2-12": SC_LEC_Z2_12,
  "lec/z2-13": SC_LEC_Z2_13,
  "lec/z2-14": SC_LEC_Z2_14,
  "lec/z2-15": SC_LEC_Z2_15,
  "lec/z3-01": SC_LEC_Z3_01,
  "lec/z3-02": SC_LEC_Z3_02,
  "lec/z3-03": SC_LEC_Z3_03,
  "lec/z3-04": SC_LEC_Z3_04,
  "lec/z3-05": SC_LEC_Z3_05,
  "lec/z3-06": SC_LEC_Z3_06,
  "lec/z3-07": SC_LEC_Z3_07,
  "lec/z3-08": SC_LEC_Z3_08,
  "lec/z3-09": SC_LEC_Z3_09,
  "lec/z3-10": SC_LEC_Z3_10,
  "lec/z3-11": SC_LEC_Z3_11,
  "lec/z3-12": SC_LEC_Z3_12,
  "lec/z3-13": SC_LEC_Z3_13,
  "lec/z3-14": SC_LEC_Z3_14,
  "lec/z3-15": SC_LEC_Z3_15,
  "lec/z4-01": SC_LEC_Z4_01,
  "lec/z4-02": SC_LEC_Z4_02,
  "lec/z4-03": SC_LEC_Z4_03,
  "lec/z4-04": SC_LEC_Z4_04,
  "lec/z4-05": SC_LEC_Z4_05,
  "lec/z4-06": SC_LEC_Z4_06,
  "lec/z4-07": SC_LEC_Z4_07,
  "lec/z4-08": SC_LEC_Z4_08,
  "lec/z4-09": SC_LEC_Z4_09,
  "lec/z4-10": SC_LEC_Z4_10,
  "lec/z4-11": SC_LEC_Z4_11,
  "lec/z4-12": SC_LEC_Z4_12,
  "lec/z4-13": SC_LEC_Z4_13,
  "lec/z4-14": SC_LEC_Z4_14,
  "lec/z4-15": SC_LEC_Z4_15,
  "lec/z5-01": SC_LEC_Z5_01,
  "lec/z5-02": SC_LEC_Z5_02,
  "lec/z5-03": SC_LEC_Z5_03,
  "lec/z5-04": SC_LEC_Z5_04,
  "lec/z5-05": SC_LEC_Z5_05,
  "lec/z5-06": SC_LEC_Z5_06,
  "lec/z5-07": SC_LEC_Z5_07,
  "lec/z5-08": SC_LEC_Z5_08,
  "lec/z5-09": SC_LEC_Z5_09,
  "lec/z5-10": SC_LEC_Z5_10,
  "lec/z5-11": SC_LEC_Z5_11,
  "lec/z5-12": SC_LEC_Z5_12,
  "lec/z5-13": SC_LEC_Z5_13,
  "lec/z5-14": SC_LEC_Z5_14,
  "lec/z5-15": SC_LEC_Z5_15,
  "lec/z6-01": SC_LEC_Z6_01,
  "lec/z6-02": SC_LEC_Z6_02,
  "lec/z6-03": SC_LEC_Z6_03,
  "lec/z6-04": SC_LEC_Z6_04,
  "lec/z6-05": SC_LEC_Z6_05,
  "lec/z6-06": SC_LEC_Z6_06,
  "lec/z6-07": SC_LEC_Z6_07,
  "lec/z6-08": SC_LEC_Z6_08,
  "lec/z6-09": SC_LEC_Z6_09,
  "lec/z6-10": SC_LEC_Z6_10,
  "lec/z6-11": SC_LEC_Z6_11,
  "lec/z6-12": SC_LEC_Z6_12,
  "lec/z6-13": SC_LEC_Z6_13,
  "lec/z6-14": SC_LEC_Z6_14,
  "lec/z6-15": SC_LEC_Z6_15,
  "lec/z7-01": SC_LEC_Z7_01,
  "lec/z7-02": SC_LEC_Z7_02,
  "lec/z7-03": SC_LEC_Z7_03,
  "lec/z7-04": SC_LEC_Z7_04,
  "lec/z7-05": SC_LEC_Z7_05,
  "lec/z7-06": SC_LEC_Z7_06,
  "lec/z7-07": SC_LEC_Z7_07,
  "lec/z7-08": SC_LEC_Z7_08,
  "lec/z7-09": SC_LEC_Z7_09,
  "lec/z7-10": SC_LEC_Z7_10,
  "lec/z7-11": SC_LEC_Z7_11,
  "lec/z7-12": SC_LEC_Z7_12,
  "lec/z7-13": SC_LEC_Z7_13,
  "lec/z7-14": SC_LEC_Z7_14,
  "lec/z7-15": SC_LEC_Z7_15,
  "lec/z8-01": SC_LEC_Z8_01,
  "lec/z8-02": SC_LEC_Z8_02,
  "lec/z8-03": SC_LEC_Z8_03,
  "lec/z8-04": SC_LEC_Z8_04,
  "lec/z8-05": SC_LEC_Z8_05,
  "lec/z8-06": SC_LEC_Z8_06,
  "lec/z8-07": SC_LEC_Z8_07,
  "lec/z8-08": SC_LEC_Z8_08,
  "lec/z8-09": SC_LEC_Z8_09,
  "lec/z8-10": SC_LEC_Z8_10,
  "lec/z8-11": SC_LEC_Z8_11,
  "lec/z8-12": SC_LEC_Z8_12,
  "lec/z8-13": SC_LEC_Z8_13,
  "lec/z8-14": SC_LEC_Z8_14,
  "lec/z8-15": SC_LEC_Z8_15,
};
