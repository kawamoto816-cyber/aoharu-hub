import type { CastScript, Lesson, Scene, UnitBase } from "./types";
import { getCast, stageOf } from "./cast";
import { manzaiSay } from "@/lib/tts/manzai";
import { WARIAI_BASE } from "./data/e-math-5-wariai";
import { WARIAI_E_POP } from "./data/e-math-5-wariai.e-pop";
import { WARIAI_E_YASASHI } from "./data/e-math-5-wariai.e-yasashi";
import { HAYASA_BASE } from "./data/e-math-5-hayasa";
import { HAYASA_E_POP } from "./data/e-math-5-hayasa.e-pop";
import { HAYASA_E_YASASHI } from "./data/e-math-5-hayasa.e-yasashi";
import { BUNSU_WARI_BASE } from "./data/e-math-6-bunsu-wari";
import { BUNSU_WARI_E_POP } from "./data/e-math-6-bunsu-wari.e-pop";
import { BUNSU_WARI_E_YASASHI } from "./data/e-math-6-bunsu-wari.e-yasashi";
import { FURIKO_BASE } from "./data/e-science-5-furiko";
import { FURIKO_E_POP } from "./data/e-science-5-furiko.e-pop";
import { FURIKO_E_YASASHI } from "./data/e-science-5-furiko.e-yasashi";
import { TAISEKI_BASE } from "./data/e-math-5-taiseki";
import { TAISEKI_E_POP } from "./data/e-math-5-taiseki.e-pop";
import { TAISEKI_E_YASASHI } from "./data/e-math-5-taiseki.e-yasashi";
import { MENSEKI_BASE } from "./data/e-math-5-menseki";
import { MENSEKI_E_POP } from "./data/e-math-5-menseki.e-pop";
import { MENSEKI_E_YASASHI } from "./data/e-math-5-menseki.e-yasashi";
import { HATSUGA_BASE } from "./data/e-science-5-hatsuga";
import { HATSUGA_E_POP } from "./data/e-science-5-hatsuga.e-pop";
import { HATSUGA_E_YASASHI } from "./data/e-science-5-hatsuga.e-yasashi";
import { KAMAKURA_BASE } from "./data/j-soc-hist-kamakura";
import { KAMAKURA_J_DARK } from "./data/j-soc-hist-kamakura.j-dark";
import { KAMAKURA_J_KISAKU } from "./data/j-soc-hist-kamakura.j-kisaku";
import { SEIFU_BASE } from "./data/j-math-1-seifu";
import { SEIFU_J_DARK } from "./data/j-math-1-seifu.j-dark";
import { SEIFU_J_KISAKU } from "./data/j-math-1-seifu.j-kisaku";
import { DENRYU_BASE } from "./data/j-sci-2-denryu";
import { DENRYU_J_DARK } from "./data/j-sci-2-denryu.j-dark";
import { DENRYU_J_KISAKU } from "./data/j-sci-2-denryu.j-kisaku";
import { FUTEISHI_BASE } from "./data/j-en-2-futeishi";
import { FUTEISHI_J_DARK } from "./data/j-en-2-futeishi.j-dark";
import { FUTEISHI_J_KISAKU } from "./data/j-en-2-futeishi.j-kisaku";
import { HOTEISHIKI_BASE } from "./data/j-math-1-hoteishiki";
import { HOTEISHIKI_J_DARK } from "./data/j-math-1-hoteishiki.j-dark";
import { HOTEISHIKI_J_KISAKU } from "./data/j-math-1-hoteishiki.j-kisaku";
import { KAGAKU_HENKA_BASE } from "./data/j-sci-2-kagaku-henka";
import { KAGAKU_HENKA_J_DARK } from "./data/j-sci-2-kagaku-henka.j-dark";
import { KAGAKU_HENKA_J_KISAKU } from "./data/j-sci-2-kagaku-henka.j-kisaku";
import { EDO_SEIRITSU_BASE } from "./data/j-soc-hist-edo-seiritsu";
import { EDO_SEIRITSU_J_DARK } from "./data/j-soc-hist-edo-seiritsu.j-dark";
import { EDO_SEIRITSU_J_KISAKU } from "./data/j-soc-hist-edo-seiritsu.j-kisaku";
import { TAISHA_BASE } from "./data/h-sci-biob-taisha";
import { TAISHA_H_CHARISMA } from "./data/h-sci-biob-taisha.h-charisma";
import { TAISHA_H_KYOJU } from "./data/h-sci-biob-taisha.h-kyoju";
import { TAISHA_H_NEKKETSU } from "./data/h-sci-biob-taisha.h-nekketsu";
import { BIBUN_BASE } from "./data/h-math-2-bibun";
import { BIBUN_H_CHARISMA } from "./data/h-math-2-bibun.h-charisma";
import { BIBUN_H_KYOJU } from "./data/h-math-2-bibun.h-kyoju";
import { BIBUN_H_NEKKETSU } from "./data/h-math-2-bibun.h-nekketsu";
import { MOL_BASE } from "./data/h-sci-chemb-mol";
import { MOL_H_CHARISMA } from "./data/h-sci-chemb-mol.h-charisma";
import { MOL_H_KYOJU } from "./data/h-sci-chemb-mol.h-kyoju";
import { MOL_H_NEKKETSU } from "./data/h-sci-chemb-mol.h-nekketsu";
import { DOPPLER_BASE } from "./data/h-sci-phy-doppler";
import { DOPPLER_H_CHARISMA } from "./data/h-sci-phy-doppler.h-charisma";
import { DOPPLER_H_KYOJU } from "./data/h-sci-phy-doppler.h-kyoju";
import { DOPPLER_H_NEKKETSU } from "./data/h-sci-phy-doppler.h-nekketsu";
import { NIJIKANSU_BASE } from "./data/h-math-1-nijikansu";
import { NIJIKANSU_H_CHARISMA } from "./data/h-math-1-nijikansu.h-charisma";
import { NIJIKANSU_H_KYOJU } from "./data/h-math-1-nijikansu.h-kyoju";
import { NIJIKANSU_H_NEKKETSU } from "./data/h-math-1-nijikansu.h-nekketsu";
import { MEIJI_BASE } from "./data/h-hist-jp-meiji";
import { MEIJI_H_CHARISMA } from "./data/h-hist-jp-meiji.h-charisma";
import { MEIJI_H_KYOJU } from "./data/h-hist-jp-meiji.h-kyoju";
import { MEIJI_H_NEKKETSU } from "./data/h-hist-jp-meiji.h-nekketsu";
import { KANDAI_BASE } from "./data/h-eng-gram-kandai";
import { KANDAI_H_CHARISMA } from "./data/h-eng-gram-kandai.h-charisma";
import { KANDAI_H_KYOJU } from "./data/h-eng-gram-kandai.h-kyoju";
import { KANDAI_H_NEKKETSU } from "./data/h-eng-gram-kandai.h-nekketsu";
import { EN_MENSEKI_BASE } from "./data/e-math-6-en-menseki";
import { EN_MENSEKI_E_POP } from "./data/e-math-6-en-menseki.e-pop";
import { EN_MENSEKI_E_YASASHI } from "./data/e-math-6-en-menseki.e-yasashi";
import { HI_BASE } from "./data/e-math-6-hi";
import { HI_E_POP } from "./data/e-math-6-hi.e-pop";
import { HI_E_YASASHI } from "./data/e-math-6-hi.e-yasashi";
import { KAKUDAI_BASE } from "./data/e-math-6-kakudai";
import { KAKUDAI_E_POP } from "./data/e-math-6-kakudai.e-pop";
import { KAKUDAI_E_YASASHI } from "./data/e-math-6-kakudai.e-yasashi";
import { HIREI_BASE } from "./data/j-math-1-hirei";
import { HIREI_J_DARK } from "./data/j-math-1-hirei.j-dark";
import { HIREI_J_KISAKU } from "./data/j-math-1-hirei.j-kisaku";
import { HEIMEN_BASE } from "./data/j-math-1-heimen";
import { HEIMEN_J_DARK } from "./data/j-math-1-heimen.j-dark";
import { HEIMEN_J_KISAKU } from "./data/j-math-1-heimen.j-kisaku";
import { SAIBO_BASE } from "./data/j-sci-2-saibo";
import { SAIBO_J_DARK } from "./data/j-sci-2-saibo.j-dark";
import { SAIBO_J_KISAKU } from "./data/j-sci-2-saibo.j-kisaku";
import { SANKAKUHI_BASE } from "./data/h-math-1-sankakuhi";
import { SANKAKUHI_H_CHARISMA } from "./data/h-math-1-sankakuhi.h-charisma";
import { SANKAKUHI_H_KYOJU } from "./data/h-math-1-sankakuhi.h-kyoju";
import { SANKAKUHI_H_NEKKETSU } from "./data/h-math-1-sankakuhi.h-nekketsu";
import { DNA_BASE } from "./data/h-sci-biob-dna";
import { DNA_H_CHARISMA } from "./data/h-sci-biob-dna.h-charisma";
import { DNA_H_KYOJU } from "./data/h-sci-biob-dna.h-kyoju";
import { DNA_H_NEKKETSU } from "./data/h-sci-biob-dna.h-nekketsu";
import { JISEI_BASE } from "./data/h-eng-gram-jisei";
import { JISEI_H_CHARISMA } from "./data/h-eng-gram-jisei.h-charisma";
import { JISEI_H_KYOJU } from "./data/h-eng-gram-jisei.h-kyoju";
import { JISEI_H_NEKKETSU } from "./data/h-eng-gram-jisei.h-nekketsu";
import { MOEKATA_BASE } from "./data/e-science-6-moekata";
import { MOEKATA_E_POP } from "./data/e-science-6-moekata.e-pop";
import { MOEKATA_E_YASASHI } from "./data/e-science-6-moekata.e-yasashi";
import { KARADA_BASE } from "./data/e-science-6-karada";
import { KARADA_E_POP } from "./data/e-science-6-karada.e-pop";
import { KARADA_E_YASASHI } from "./data/e-science-6-karada.e-yasashi";
import { TSUKI_HOSHI_BASE } from "./data/e-science-4-tsuki-hoshi";
import { TSUKI_HOSHI_E_POP } from "./data/e-science-4-tsuki-hoshi.e-pop";
import { TSUKI_HOSHI_E_YASASHI } from "./data/e-science-4-tsuki-hoshi.e-yasashi";
import { TENKI_BASE } from "./data/j-sci-2-tenki";
import { TENKI_J_DARK } from "./data/j-sci-2-tenki.j-dark";
import { TENKI_J_KISAKU } from "./data/j-sci-2-tenki.j-kisaku";
import { MEIJI_ISHIN_BASE } from "./data/j-soc-hist-meiji-ishin";
import { MEIJI_ISHIN_J_DARK } from "./data/j-soc-hist-meiji-ishin.j-dark";
import { MEIJI_ISHIN_J_KISAKU } from "./data/j-soc-hist-meiji-ishin.j-kisaku";
import { HIKAKU_BASE } from "./data/j-en-2-hikaku";
import { HIKAKU_J_DARK } from "./data/j-en-2-hikaku.j-dark";
import { HIKAKU_J_KISAKU } from "./data/j-en-2-hikaku.j-kisaku";
import { H_KAMAKURA_BASE } from "./data/h-hist-jp-kamakura";
import { H_KAMAKURA_H_CHARISMA } from "./data/h-hist-jp-kamakura.h-charisma";
import { H_KAMAKURA_H_KYOJU } from "./data/h-hist-jp-kamakura.h-kyoju";
import { H_KAMAKURA_H_NEKKETSU } from "./data/h-hist-jp-kamakura.h-nekketsu";
import { SANKA_BASE } from "./data/h-sci-chemb-sanka";
import { SANKA_H_CHARISMA } from "./data/h-sci-chemb-sanka.h-charisma";
import { SANKA_H_KYOJU } from "./data/h-sci-chemb-sanka.h-kyoju";
import { SANKA_H_NEKKETSU } from "./data/h-sci-chemb-sanka.h-nekketsu";
import { JUDO_BASE } from "./data/h-eng-gram-judo";
import { JUDO_H_CHARISMA } from "./data/h-eng-gram-judo.h-charisma";
import { JUDO_H_KYOJU } from "./data/h-eng-gram-judo.h-kyoju";
import { JUDO_H_NEKKETSU } from "./data/h-eng-gram-judo.h-nekketsu";
import { HIREI_HANPIREI_BASE } from "./data/e-math-6-hirei-hanpirei";
import { HIREI_HANPIREI_E_POP } from "./data/e-math-6-hirei-hanpirei.e-pop";
import { HIREI_HANPIREI_E_YASASHI } from "./data/e-math-6-hirei-hanpirei.e-yasashi";
import { HEIKIN_BASE } from "./data/e-math-5-heikin";
import { HEIKIN_E_POP } from "./data/e-math-5-heikin.e-pop";
import { HEIKIN_E_YASASHI } from "./data/e-math-5-heikin.e-yasashi";
import { MEIJI_E_BASE } from "./data/e-social-6-meiji";
import { MEIJI_E_E_POP } from "./data/e-social-6-meiji.e-pop";
import { MEIJI_E_E_YASASHI } from "./data/e-social-6-meiji.e-yasashi";
import { JIKAI_BASE } from "./data/j-sci-2-jikai";
import { JIKAI_J_DARK } from "./data/j-sci-2-jikai.j-dark";
import { JIKAI_J_KISAKU } from "./data/j-sci-2-jikai.j-kisaku";
import { MUROMACHI_BASE } from "./data/j-soc-hist-muromachi";
import { MUROMACHI_J_DARK } from "./data/j-soc-hist-muromachi.j-dark";
import { MUROMACHI_J_KISAKU } from "./data/j-soc-hist-muromachi.j-kisaku";
import { UKEMI_BASE } from "./data/j-en-2-ukemi";
import { UKEMI_J_DARK } from "./data/j-en-2-ukemi.j-dark";
import { UKEMI_J_KISAKU } from "./data/j-en-2-ukemi.j-kisaku";
import { CHUWA_BASE } from "./data/h-sci-chemb-chuwa";
import { CHUWA_H_CHARISMA } from "./data/h-sci-chemb-chuwa.h-charisma";
import { CHUWA_H_KYOJU } from "./data/h-sci-chemb-chuwa.h-kyoju";
import { CHUWA_H_NEKKETSU } from "./data/h-sci-chemb-chuwa.h-nekketsu";
import { SENKYO_BASE } from "./data/h-civ-kokyo-senkyo";
import { SENKYO_H_CHARISMA } from "./data/h-civ-kokyo-senkyo.h-charisma";
import { SENKYO_H_KYOJU } from "./data/h-civ-kokyo-senkyo.h-kyoju";
import { SENKYO_H_NEKKETSU } from "./data/h-civ-kokyo-senkyo.h-nekketsu";
import { NIJIHOTEISHIKI_BASE } from "./data/h-math-1-nijihoteishiki";
import { NIJIHOTEISHIKI_H_CHARISMA } from "./data/h-math-1-nijihoteishiki.h-charisma";
import { NIJIHOTEISHIKI_H_KYOJU } from "./data/h-math-1-nijihoteishiki.h-kyoju";
import { NIJIHOTEISHIKI_H_NEKKETSU } from "./data/h-math-1-nijihoteishiki.h-nekketsu";
import { KAMAKURA_E_BASE } from "./data/e-social-6-kamakura";
import { KAMAKURA_E_E_POP } from "./data/e-social-6-kamakura.e-pop";
import { KAMAKURA_E_E_YASASHI } from "./data/e-social-6-kamakura.e-yasashi";
import { TANNI_BASE } from "./data/e-math-5-tanni";
import { TANNI_E_POP } from "./data/e-math-5-tanni.e-pop";
import { TANNI_E_YASASHI } from "./data/e-math-5-tanni.e-yasashi";
import { DENJISHAKU_BASE } from "./data/e-science-5-denjishaku";
import { DENJISHAKU_E_POP } from "./data/e-science-5-denjishaku.e-pop";
import { DENJISHAKU_E_YASASHI } from "./data/e-science-5-denjishaku.e-yasashi";
import { KANKEI_BASE } from "./data/j-en-3-kankei";
import { KANKEI_J_DARK } from "./data/j-en-3-kankei.j-dark";
import { KANKEI_J_KISAKU } from "./data/j-en-3-kankei.j-kisaku";
import { MOJI_BASE } from "./data/j-math-1-moji";
import { MOJI_J_DARK } from "./data/j-math-1-moji.j-dark";
import { MOJI_J_KISAKU } from "./data/j-math-1-moji.j-kisaku";
import { HEIAN_BASE } from "./data/j-soc-hist-heian";
import { HEIAN_J_DARK } from "./data/j-soc-hist-heian.j-dark";
import { HEIAN_J_KISAKU } from "./data/j-soc-hist-heian.j-kisaku";
import { MENEKI_BASE } from "./data/h-sci-biob-meneki";
import { MENEKI_H_CHARISMA } from "./data/h-sci-biob-meneki.h-charisma";
import { MENEKI_H_KYOJU } from "./data/h-sci-biob-meneki.h-kyoju";
import { MENEKI_H_NEKKETSU } from "./data/h-sci-biob-meneki.h-nekketsu";
import { KAKUMEI_BASE } from "./data/h-hist-w-kakumei";
import { KAKUMEI_H_CHARISMA } from "./data/h-hist-w-kakumei.h-charisma";
import { KAKUMEI_H_KYOJU } from "./data/h-hist-w-kakumei.h-kyoju";
import { KAKUMEI_H_NEKKETSU } from "./data/h-hist-w-kakumei.h-nekketsu";
import { KATEIHO_BASE } from "./data/h-eng-gram-kateiho";
import { KATEIHO_H_CHARISMA } from "./data/h-eng-gram-kateiho.h-charisma";
import { KATEIHO_H_KYOJU } from "./data/h-eng-gram-kateiho.h-kyoju";
import { KATEIHO_H_NEKKETSU } from "./data/h-eng-gram-kateiho.h-nekketsu";
import { TEKO_BASE } from "./data/e-science-6-teko";
import { TEKO_E_POP } from "./data/e-science-6-teko.e-pop";
import { TEKO_E_YASASHI } from "./data/e-science-6-teko.e-yasashi";
import { MOJI_SHIKI_BASE } from "./data/e-math-6-moji-shiki";
import { MOJI_SHIKI_E_POP } from "./data/e-math-6-moji-shiki.e-pop";
import { MOJI_SHIKI_E_YASASHI } from "./data/e-math-6-moji-shiki.e-yasashi";
import { KOME_BASE } from "./data/e-social-5-kome";
import { KOME_E_POP } from "./data/e-social-5-kome.e-pop";
import { KOME_E_YASASHI } from "./data/e-social-5-kome.e-yasashi";
import { MIRAI_BASE } from "./data/j-en-2-mirai";
import { MIRAI_J_DARK } from "./data/j-en-2-mirai.j-dark";
import { MIRAI_J_KISAKU } from "./data/j-en-2-mirai.j-kisaku";
import { SEIDENKI_BASE } from "./data/j-sci-2-seidenki";
import { SEIDENKI_J_DARK } from "./data/j-sci-2-seidenki.j-dark";
import { SEIDENKI_J_KISAKU } from "./data/j-sci-2-seidenki.j-kisaku";
import { TENKA_TOITSU_BASE } from "./data/j-soc-hist-tenka-toitsu";
import { TENKA_TOITSU_J_DARK } from "./data/j-soc-hist-tenka-toitsu.j-dark";
import { TENKA_TOITSU_J_KISAKU } from "./data/j-soc-hist-tenka-toitsu.j-kisaku";
import { DATA_BASE } from "./data/h-math-1-data";
import { DATA_H_CHARISMA } from "./data/h-math-1-data.h-charisma";
import { DATA_H_KYOJU } from "./data/h-math-1-data.h-kyoju";
import { DATA_H_NEKKETSU } from "./data/h-math-1-data.h-nekketsu";
import { H_EDO_SEIRITSU_BASE } from "./data/h-hist-jp-edo-seiritsu";
import { H_EDO_SEIRITSU_H_CHARISMA } from "./data/h-hist-jp-edo-seiritsu.h-charisma";
import { H_EDO_SEIRITSU_H_KYOJU } from "./data/h-hist-jp-edo-seiritsu.h-kyoju";
import { H_EDO_SEIRITSU_H_NEKKETSU } from "./data/h-hist-jp-edo-seiritsu.h-nekketsu";
import { SHIJO_BASE } from "./data/h-civ-kokyo-shijo";
import { SHIJO_H_CHARISMA } from "./data/h-civ-kokyo-shijo.h-charisma";
import { SHIJO_H_KYOJU } from "./data/h-civ-kokyo-shijo.h-kyoju";
import { SHIJO_H_NEKKETSU } from "./data/h-civ-kokyo-shijo.h-nekketsu";
import { SUIYOEKI_BASE } from "./data/e-science-6-suiyoeki";
import { SUIYOEKI_E_POP } from "./data/e-science-6-suiyoeki.e-pop";
import { SUIYOEKI_E_YASASHI } from "./data/e-science-6-suiyoeki.e-yasashi";
import { EDO_SEIJI_BASE } from "./data/e-social-6-edo-seiji";
import { EDO_SEIJI_E_POP } from "./data/e-social-6-edo-seiji.e-pop";
import { EDO_SEIJI_E_YASASHI } from "./data/e-social-6-edo-seiji.e-yasashi";
import { NAGARERU_BASE } from "./data/e-science-5-nagareru";
import { NAGARERU_E_POP } from "./data/e-science-5-nagareru.e-pop";
import { NAGARERU_E_YASASHI } from "./data/e-science-5-nagareru.e-yasashi";
import { KANRYO_BASE } from "./data/j-en-3-kanryo";
import { KANRYO_J_DARK } from "./data/j-en-3-kanryo.j-dark";
import { KANRYO_J_KISAKU } from "./data/j-en-3-kanryo.j-kisaku";
import { KUKAN_BASE } from "./data/j-math-1-kukan";
import { KUKAN_J_DARK } from "./data/j-math-1-kukan.j-dark";
import { KUKAN_J_KISAKU } from "./data/j-math-1-kukan.j-kisaku";
import { DOBUTSU_BASE } from "./data/j-sci-2-dobutsu";
import { DOBUTSU_J_DARK } from "./data/j-sci-2-dobutsu.j-dark";
import { DOBUTSU_J_KISAKU } from "./data/j-sci-2-dobutsu.j-kisaku";
import { H_FUTEISHI_BASE } from "./data/h-eng-gram-futeishi";
import { H_FUTEISHI_H_CHARISMA } from "./data/h-eng-gram-futeishi.h-charisma";
import { H_FUTEISHI_H_KYOJU } from "./data/h-eng-gram-futeishi.h-kyoju";
import { H_FUTEISHI_H_NEKKETSU } from "./data/h-eng-gram-futeishi.h-nekketsu";
import { SHUGO_BASE } from "./data/h-math-1-shugo";
import { SHUGO_H_CHARISMA } from "./data/h-math-1-shugo.h-charisma";
import { SHUGO_H_KYOJU } from "./data/h-math-1-shugo.h-kyoju";
import { SHUGO_H_NEKKETSU } from "./data/h-math-1-shugo.h-nekketsu";
import { H_GENSHI_BASE } from "./data/h-sci-chemb-genshi";
import { H_GENSHI_H_CHARISMA } from "./data/h-sci-chemb-genshi.h-charisma";
import { H_GENSHI_H_KYOJU } from "./data/h-sci-chemb-genshi.h-kyoju";
import { H_GENSHI_H_NEKKETSU } from "./data/h-sci-chemb-genshi.h-nekketsu";
import { ASUKA_NARA_BASE } from "./data/e-social-6-asuka-nara";
import { ASUKA_NARA_E_POP } from "./data/e-social-6-asuka-nara.e-pop";
import { ASUKA_NARA_E_YASASHI } from "./data/e-social-6-asuka-nara.e-yasashi";
import { HANASHI_KAKI_BASE } from "./data/e-japanese-6-hanashi-kaki";
import { HANASHI_KAKI_E_POP } from "./data/e-japanese-6-hanashi-kaki.e-pop";
import { HANASHI_KAKI_E_YASASHI } from "./data/e-japanese-6-hanashi-kaki.e-yasashi";
import { ALPHA_KAKU_BASE } from "./data/e-english-56-alpha-kaku";
import { ALPHA_KAKU_E_POP } from "./data/e-english-56-alpha-kaku.e-pop";
import { ALPHA_KAKU_E_YASASHI } from "./data/e-english-56-alpha-kaku.e-yasashi";
import { HINSHI_BASE } from "./data/j-ja-1-bunpo-hinshi";
import { HINSHI_J_DARK } from "./data/j-ja-1-bunpo-hinshi.j-dark";
import { HINSHI_J_KISAKU } from "./data/j-ja-1-bunpo-hinshi.j-kisaku";
import { BUNKA_BASE } from "./data/j-soc-civ-bunka";
import { BUNKA_J_DARK } from "./data/j-soc-civ-bunka.j-dark";
import { BUNKA_J_KISAKU } from "./data/j-soc-civ-bunka.j-kisaku";
import { EN_BE_BASE } from "./data/j-en-1-be";
import { EN_BE_J_DARK } from "./data/j-en-1-be.j-dark";
import { EN_BE_J_KISAKU } from "./data/j-en-1-be.j-kisaku";
import { BOSAI_BASE } from "./data/h-geo-sogo-bosai";
import { BOSAI_H_CHARISMA } from "./data/h-geo-sogo-bosai.h-charisma";
import { BOSAI_H_KYOJU } from "./data/h-geo-sogo-bosai.h-kyoju";
import { BOSAI_H_NEKKETSU } from "./data/h-geo-sogo-bosai.h-nekketsu";
import { HYOGEN_BASE } from "./data/h-jpn-bungaku-hyogen";
import { HYOGEN_H_CHARISMA } from "./data/h-jpn-bungaku-hyogen.h-charisma";
import { HYOGEN_H_KYOJU } from "./data/h-jpn-bungaku-hyogen.h-kyoju";
import { HYOGEN_H_NEKKETSU } from "./data/h-jpn-bungaku-hyogen.h-nekketsu";
import { ALGORITHM_BASE } from "./data/h-info-1-algorithm";
import { ALGORITHM_H_CHARISMA } from "./data/h-info-1-algorithm.h-charisma";
import { ALGORITHM_H_KYOJU } from "./data/h-info-1-algorithm.h-kyoju";
import { ALGORITHM_H_NEKKETSU } from "./data/h-info-1-algorithm.h-nekketsu";
import { IKEN_BASE } from "./data/e-japanese-6-iken";
import { IKEN_E_POP } from "./data/e-japanese-6-iken.e-pop";
import { IKEN_E_YASASHI } from "./data/e-japanese-6-iken.e-yasashi";
import { CAN_BASE } from "./data/e-english-56-can";
import { CAN_E_POP } from "./data/e-english-56-can.e-pop";
import { CAN_E_YASASHI } from "./data/e-english-56-can.e-yasashi";
import { EDO_BUNKA_BASE } from "./data/e-social-6-edo-bunka";
import { EDO_BUNKA_E_POP } from "./data/e-social-6-edo-bunka.e-pop";
import { EDO_BUNKA_E_YASASHI } from "./data/e-social-6-edo-bunka.e-yasashi";
import { SEIBUN_BASE } from "./data/j-ja-1-bunpo-seibun";
import { SEIBUN_J_DARK } from "./data/j-ja-1-bunpo-seibun.j-dark";
import { SEIBUN_J_KISAKU } from "./data/j-ja-1-bunpo-seibun.j-kisaku";
import { CHIHO_BASE } from "./data/j-soc-civ-chiho";
import { CHIHO_J_DARK } from "./data/j-soc-civ-chiho.j-dark";
import { CHIHO_J_KISAKU } from "./data/j-soc-civ-chiho.j-kisaku";
import { EN_CAN_BASE } from "./data/j-en-1-can";
import { EN_CAN_J_DARK } from "./data/j-en-1-can.j-dark";
import { EN_CAN_J_KISAKU } from "./data/j-en-1-can.j-kisaku";
import { CHIKEI_BASE } from "./data/h-geo-sogo-chikei";
import { CHIKEI_H_CHARISMA } from "./data/h-geo-sogo-chikei.h-charisma";
import { CHIKEI_H_KYOJU } from "./data/h-geo-sogo-chikei.h-kyoju";
import { CHIKEI_H_NEKKETSU } from "./data/h-geo-sogo-chikei.h-nekketsu";
import { HYORON_BASE } from "./data/h-jpn-bungaku-hyoron";
import { HYORON_H_CHARISMA } from "./data/h-jpn-bungaku-hyoron.h-charisma";
import { HYORON_H_KYOJU } from "./data/h-jpn-bungaku-hyoron.h-kyoju";
import { HYORON_H_NEKKETSU } from "./data/h-jpn-bungaku-hyoron.h-nekketsu";
import { ASSYUKU_BASE } from "./data/h-info-1-assyuku";
import { ASSYUKU_H_CHARISMA } from "./data/h-info-1-assyuku.h-charisma";
import { ASSYUKU_H_KYOJU } from "./data/h-info-1-assyuku.h-kyoju";
import { ASSYUKU_H_NEKKETSU } from "./data/h-info-1-assyuku.h-nekketsu";
import { KANA_YURAI_BASE } from "./data/e-japanese-6-kana-yurai";
import { KANA_YURAI_E_POP } from "./data/e-japanese-6-kana-yurai.e-pop";
import { KANA_YURAI_E_YASASHI } from "./data/e-japanese-6-kana-yurai.e-yasashi";
import { HEIAN_E_BASE } from "./data/e-social-6-heian";
import { HEIAN_E_E_POP } from "./data/e-social-6-heian.e-pop";
import { HEIAN_E_E_YASASHI } from "./data/e-social-6-heian.e-yasashi";
import { CHUGAKU_BASE } from "./data/e-english-56-chugaku";
import { CHUGAKU_E_POP } from "./data/e-english-56-chugaku.e-pop";
import { CHUGAKU_E_YASASHI } from "./data/e-english-56-chugaku.e-yasashi";
import { TANI_BASE } from "./data/j-ja-1-bunpo-tani";
import { TANI_J_DARK } from "./data/j-ja-1-bunpo-tani.j-dark";
import { TANI_J_KISAKU } from "./data/j-ja-1-bunpo-tani.j-kisaku";
import { CHIKYU_BASE } from "./data/j-soc-civ-chikyu";
import { CHIKYU_J_DARK } from "./data/j-soc-civ-chikyu.j-dark";
import { CHIKYU_J_KISAKU } from "./data/j-soc-civ-chikyu.j-kisaku";
import { DAIMEISHI_BASE } from "./data/j-en-1-daimeishi";
import { DAIMEISHI_J_DARK } from "./data/j-en-1-daimeishi.j-dark";
import { DAIMEISHI_J_KISAKU } from "./data/j-en-1-daimeishi.j-kisaku";
import { H_CHIHO_BASE } from "./data/h-civ-kokyo-chiho";
import { CHIHO_H_CHARISMA } from "./data/h-civ-kokyo-chiho.h-charisma";
import { CHIHO_H_KYOJU } from "./data/h-civ-kokyo-chiho.h-kyoju";
import { CHIHO_H_NEKKETSU } from "./data/h-civ-kokyo-chiho.h-nekketsu";
import { CHOSA_BASE } from "./data/h-geo-sogo-chosa";
import { CHOSA_H_CHARISMA } from "./data/h-geo-sogo-chosa.h-charisma";
import { CHOSA_H_KYOJU } from "./data/h-geo-sogo-chosa.h-kyoju";
import { CHOSA_H_NEKKETSU } from "./data/h-geo-sogo-chosa.h-nekketsu";
import { H_SHI_BASE } from "./data/h-jpn-bungaku-shi";
import { SHI_H_CHARISMA } from "./data/h-jpn-bungaku-shi.h-charisma";
import { SHI_H_KYOJU } from "./data/h-jpn-bungaku-shi.h-kyoju";
import { SHI_H_NEKKETSU } from "./data/h-jpn-bungaku-shi.h-nekketsu";
import { KANJI6_BASE } from "./data/e-japanese-6-kanji";
import { KANJI6_E_POP } from "./data/e-japanese-6-kanji.e-pop";
import { KANJI6_E_YASASHI } from "./data/e-japanese-6-kanji.e-yasashi";
import { CHUMON_BASE } from "./data/e-english-56-chumon";
import { CHUMON_E_POP } from "./data/e-english-56-chumon.e-pop";
import { CHUMON_E_YASASHI } from "./data/e-english-56-chumon.e-yasashi";
import { JOMON_BASE } from "./data/e-social-6-jomon";
import { JOMON_E_POP } from "./data/e-social-6-jomon.e-pop";
import { JOMON_E_YASASHI } from "./data/e-social-6-jomon.e-yasashi";
import { GOI_BASE } from "./data/j-ja-1-goi";
import { GOI_J_DARK } from "./data/j-ja-1-goi.j-dark";
import { GOI_J_KISAKU } from "./data/j-ja-1-goi.j-kisaku";
import { GENDAI_SHAKAI_BASE } from "./data/j-soc-civ-gendai-shakai";
import { GENDAI_SHAKAI_J_DARK } from "./data/j-soc-civ-gendai-shakai.j-dark";
import { GENDAI_SHAKAI_J_KISAKU } from "./data/j-soc-civ-gendai-shakai.j-kisaku";
import { EISAKUBUN_BASE } from "./data/j-en-1-eisakubun";
import { EISAKUBUN_J_DARK } from "./data/j-en-1-eisakubun.j-dark";
import { EISAKUBUN_J_KISAKU } from "./data/j-en-1-eisakubun.j-kisaku";
import { CHIZAI_BASE } from "./data/h-info-1-chizai";
import { CHIZAI_H_CHARISMA } from "./data/h-info-1-chizai.h-charisma";
import { CHIZAI_H_KYOJU } from "./data/h-info-1-chizai.h-kyoju";
import { CHIZAI_H_NEKKETSU } from "./data/h-info-1-chizai.h-nekketsu";
import { H_JINKEN_BASE } from "./data/h-civ-kokyo-jinken";
import { H_JINKEN_H_CHARISMA } from "./data/h-civ-kokyo-jinken.h-charisma";
import { H_JINKEN_H_KYOJU } from "./data/h-civ-kokyo-jinken.h-kyoju";
import { H_JINKEN_H_NEKKETSU } from "./data/h-civ-kokyo-jinken.h-nekketsu";
import { GIS_BASE } from "./data/h-geo-sogo-gis";
import { GIS_H_CHARISMA } from "./data/h-geo-sogo-gis.h-charisma";
import { GIS_H_KYOJU } from "./data/h-geo-sogo-gis.h-kyoju";
import { GIS_H_NEKKETSU } from "./data/h-geo-sogo-gis.h-nekketsu";
import { KOTOBA_HENKA_BASE } from "./data/e-japanese-6-kotoba-henka";
import { KOTOBA_HENKA_E_POP } from "./data/e-japanese-6-kotoba-henka.e-pop";
import { KOTOBA_HENKA_E_YASASHI } from "./data/e-japanese-6-kotoba-henka.e-yasashi";
import { HINDO_BASE } from "./data/e-english-56-hindo";
import { HINDO_E_POP } from "./data/e-english-56-hindo.e-pop";
import { HINDO_E_YASASHI } from "./data/e-english-56-hindo.e-yasashi";
import { KENPO_BASE } from "./data/e-social-6-kenpo";
import { KENPO_E_POP } from "./data/e-social-6-kenpo.e-pop";
import { KENPO_E_YASASHI } from "./data/e-social-6-kenpo.e-yasashi";
import { HANASU_BASE } from "./data/j-ja-1-hanasu";
import { HANASU_J_DARK } from "./data/j-ja-1-hanasu.j-dark";
import { HANASU_J_KISAKU } from "./data/j-ja-1-hanasu.j-kisaku";
import { TAIRITSU_GOI_BASE } from "./data/j-soc-civ-goi";
import { TAIRITSU_GOI_J_DARK } from "./data/j-soc-civ-goi.j-dark";
import { TAIRITSU_GOI_J_KISAKU } from "./data/j-soc-civ-goi.j-kisaku";
import { GIMONSHI_BASE } from "./data/j-en-1-gimonshi";
import { GIMONSHI_J_DARK } from "./data/j-en-1-gimonshi.j-dark";
import { GIMONSHI_J_KISAKU } from "./data/j-en-1-gimonshi.j-kisaku";
import { SHOSETSU_BASE } from "./data/h-jpn-bungaku-shosetsu";
import { SHOSETSU_H_CHARISMA } from "./data/h-jpn-bungaku-shosetsu.h-charisma";
import { SHOSETSU_H_KYOJU } from "./data/h-jpn-bungaku-shosetsu.h-kyoju";
import { SHOSETSU_H_NEKKETSU } from "./data/h-jpn-bungaku-shosetsu.h-nekketsu";
import { COMPUTER_BASE } from "./data/h-info-1-computer";
import { COMPUTER_H_CHARISMA } from "./data/h-info-1-computer.h-charisma";
import { COMPUTER_H_KYOJU } from "./data/h-info-1-computer.h-kyoju";
import { COMPUTER_H_NEKKETSU } from "./data/h-info-1-computer.h-nekketsu";
import { ASUKA_BASE } from "./data/h-hist-jp-asuka";
import { ASUKA_H_CHARISMA } from "./data/h-hist-jp-asuka.h-charisma";
import { ASUKA_H_KYOJU } from "./data/h-hist-jp-asuka.h-kyoju";
import { ASUKA_H_NEKKETSU } from "./data/h-hist-jp-asuka.h-nekketsu";
import { MONOGATARI_BASE } from "./data/e-japanese-6-monogatari";
import { MONOGATARI_E_POP } from "./data/e-japanese-6-monogatari.e-pop";
import { MONOGATARI_E_YASASHI } from "./data/e-japanese-6-monogatari.e-yasashi";
import { HITO_BASE } from "./data/e-english-56-hito";
import { HITO_E_POP } from "./data/e-english-56-hito.e-pop";
import { HITO_E_YASASHI } from "./data/e-english-56-hito.e-yasashi";
import { DENKI_BASE } from "./data/e-science-6-denki";
import { DENKI_E_POP } from "./data/e-science-6-denki.e-pop";
import { DENKI_E_YASASHI } from "./data/e-science-6-denki.e-yasashi";
import { KAKU_BASE } from "./data/j-ja-1-kaku";
import { KAKU_J_DARK } from "./data/j-ja-1-kaku.j-dark";
import { KAKU_J_KISAKU } from "./data/j-ja-1-kaku.j-kisaku";
import { JINKEN_BASE } from "./data/j-soc-civ-jinken";
import { JINKEN_J_DARK } from "./data/j-soc-civ-jinken.j-dark";
import { JINKEN_J_KISAKU } from "./data/j-soc-civ-jinken.j-kisaku";
import { IPPAN_BASE } from "./data/j-en-1-ippan";
import { IPPAN_J_DARK } from "./data/j-en-1-ippan.j-dark";
import { IPPAN_J_KISAKU } from "./data/j-en-1-ippan.j-kisaku";
import { JIZOKU_BASE } from "./data/h-civ-kokyo-jizoku";
import { JIZOKU_H_CHARISMA } from "./data/h-civ-kokyo-jizoku.h-charisma";
import { JIZOKU_H_KYOJU } from "./data/h-civ-kokyo-jizoku.h-kyoju";
import { JIZOKU_H_NEKKETSU } from "./data/h-civ-kokyo-jizoku.h-nekketsu";
import { JINKO_BASE } from "./data/h-geo-sogo-jinko";
import { JINKO_H_CHARISMA } from "./data/h-geo-sogo-jinko.h-charisma";
import { JINKO_H_KYOJU } from "./data/h-geo-sogo-jinko.h-kyoju";
import { JINKO_H_NEKKETSU } from "./data/h-geo-sogo-jinko.h-nekketsu";
import { SOSAKU_BASE } from "./data/h-jpn-bungaku-sosaku";
import { SOSAKU_H_CHARISMA } from "./data/h-jpn-bungaku-sosaku.h-charisma";
import { SOSAKU_H_KYOJU } from "./data/h-jpn-bungaku-sosaku.h-kyoju";
import { SOSAKU_H_NEKKETSU } from "./data/h-jpn-bungaku-sosaku.h-nekketsu";
import { BUNSU_TASHIHIKI_BASE } from "./data/e-math-5-bunsu-tashihiki";
import { BUNSU_TASHIHIKI_E_POP } from "./data/e-math-5-bunsu-tashihiki.e-pop";
import { BUNSU_TASHIHIKI_E_YASASHI } from "./data/e-math-5-bunsu-tashihiki.e-yasashi";
import { MEDAKA_BASE } from "./data/e-science-5-medaka";
import { MEDAKA_E_POP } from "./data/e-science-5-medaka.e-pop";
import { MEDAKA_E_YASASHI } from "./data/e-science-5-medaka.e-yasashi";
import { SHOKURYO_BASE } from "./data/e-social-5-shokuryo";
import { SHOKURYO_E_POP } from "./data/e-social-5-shokuryo.e-pop";
import { SHOKURYO_E_YASASHI } from "./data/e-social-5-shokuryo.e-yasashi";
import { KAKURITSU_BASE } from "./data/j-math-2-kakuritsu";
import { KAKURITSU_J_DARK } from "./data/j-math-2-kakuritsu.j-dark";
import { KAKURITSU_J_KISAKU } from "./data/j-math-2-kakuritsu.j-kisaku";
import { HIKARI_BASE } from "./data/j-sci-1-hikari";
import { HIKARI_J_DARK } from "./data/j-sci-1-hikari.j-dark";
import { HIKARI_J_KISAKU } from "./data/j-sci-1-hikari.j-kisaku";
import { JODOSHI_BASE } from "./data/j-en-2-jodoshi";
import { JODOSHI_J_DARK } from "./data/j-en-2-jodoshi.j-dark";
import { JODOSHI_J_KISAKU } from "./data/j-en-2-jodoshi.j-kisaku";
import { HE_JODOSHI_BASE } from "./data/h-eng-gram-jodoshi";
import { HE_JODOSHI_H_CHARISMA } from "./data/h-eng-gram-jodoshi.h-charisma";
import { HE_JODOSHI_H_KYOJU } from "./data/h-eng-gram-jodoshi.h-kyoju";
import { HE_JODOSHI_H_NEKKETSU } from "./data/h-eng-gram-jodoshi.h-nekketsu";
import { HA_KAKURITSU_BASE } from "./data/h-math-a-kakuritsu";
import { HA_KAKURITSU_H_CHARISMA } from "./data/h-math-a-kakuritsu.h-charisma";
import { HA_KAKURITSU_H_KYOJU } from "./data/h-math-a-kakuritsu.h-kyoju";
import { HA_KAKURITSU_H_NEKKETSU } from "./data/h-math-a-kakuritsu.h-nekketsu";
import { NAMI_BASE } from "./data/h-sci-phyb-nami";
import { NAMI_H_CHARISMA } from "./data/h-sci-phyb-nami.h-charisma";
import { NAMI_H_KYOJU } from "./data/h-sci-phyb-nami.h-kyoju";
import { NAMI_H_NEKKETSU } from "./data/h-sci-phyb-nami.h-nekketsu";
import { E_SHOSU_KAKE_BASE } from "./data/e-math-5-shosu-kake";
import { E_SHOSU_KAKE_E_POP } from "./data/e-math-5-shosu-kake.e-pop";
import { E_SHOSU_KAKE_E_YASASHI } from "./data/e-math-5-shosu-kake.e-yasashi";
import { E_TOKEKATA_BASE } from "./data/e-science-5-tokekata";
import { E_TOKEKATA_E_POP } from "./data/e-science-5-tokekata.e-pop";
import { E_TOKEKATA_E_YASASHI } from "./data/e-science-5-tokekata.e-yasashi";
import { E_KEIGO_BASE } from "./data/e-japanese-5-keigo";
import { E_KEIGO_E_POP } from "./data/e-japanese-5-keigo.e-pop";
import { E_KEIGO_E_YASASHI } from "./data/e-japanese-5-keigo.e-yasashi";
import { J_HEIHOKON_BASE } from "./data/j-math-3-heihokon";
import { J_HEIHOKON_J_DARK } from "./data/j-math-3-heihokon.j-dark";
import { J_HEIHOKON_J_KISAKU } from "./data/j-math-3-heihokon.j-kisaku";
import { J_KEIGO_BASE } from "./data/j-ja-2-keigo";
import { J_KEIGO_J_DARK } from "./data/j-ja-2-keigo.j-dark";
import { J_KEIGO_J_KISAKU } from "./data/j-ja-2-keigo.j-kisaku";
import { J_NIHON_SUGATA_BASE } from "./data/j-soc-geo-nihon-sugata";
import { J_NIHON_SUGATA_J_DARK } from "./data/j-soc-geo-nihon-sugata.j-dark";
import { J_NIHON_SUGATA_J_KISAKU } from "./data/j-soc-geo-nihon-sugata.j-kisaku";
import { H_HEIAN_BASE } from "./data/h-hist-jp-heian";
import { H_HEIAN_H_CHARISMA } from "./data/h-hist-jp-heian.h-charisma";
import { H_HEIAN_H_KYOJU } from "./data/h-hist-jp-heian.h-kyoju";
import { H_HEIAN_H_NEKKETSU } from "./data/h-hist-jp-heian.h-nekketsu";
import { H_KOTEN_KEIGO_BASE } from "./data/h-jpn-koten-keigo";
import { H_KOTEN_KEIGO_H_CHARISMA } from "./data/h-jpn-koten-keigo.h-charisma";
import { H_KOTEN_KEIGO_H_KYOJU } from "./data/h-jpn-koten-keigo.h-kyoju";
import { H_KOTEN_KEIGO_H_NEKKETSU } from "./data/h-jpn-koten-keigo.h-nekketsu";
import { H_JISSU_BASE } from "./data/h-math-1-jissu";
import { H_JISSU_H_CHARISMA } from "./data/h-math-1-jissu.h-charisma";
import { H_JISSU_H_KYOJU } from "./data/h-math-1-jissu.h-kyoju";
import { H_JISSU_H_NEKKETSU } from "./data/h-math-1-jissu.h-nekketsu";
import { E_KOGYO_BASE } from "./data/e-social-5-kogyo";
import { E_KOGYO_E_POP } from "./data/e-social-5-kogyo.e-pop";
import { E_KOGYO_E_YASASHI } from "./data/e-social-5-kogyo.e-yasashi";
import { E_DENRYU_BASE } from "./data/e-science-4-denryu";
import { E_DENRYU_E_POP } from "./data/e-science-4-denryu.e-pop";
import { E_DENRYU_E_YASASHI } from "./data/e-science-4-denryu.e-yasashi";
import { E_YOJIJUKUGO_BASE } from "./data/e-japanese-6-yojijukugo";
import { E_YOJIJUKUGO_E_POP } from "./data/e-japanese-6-yojijukugo.e-pop";
import { E_YOJIJUKUGO_E_YASASHI } from "./data/e-japanese-6-yojijukugo.e-yasashi";
import { J_ION_BASE } from "./data/j-sci-3-ion";
import { J_ION_J_DARK } from "./data/j-sci-3-ion.j-dark";
import { J_ION_J_KISAKU } from "./data/j-sci-3-ion.j-kisaku";
import { J_THERE_BASE } from "./data/j-en-2-there";
import { J_THERE_J_DARK } from "./data/j-en-2-there.j-dark";
import { J_THERE_J_KISAKU } from "./data/j-en-2-there.j-kisaku";
import { J_EUROPE_BASE } from "./data/j-soc-geo-europe";
import { J_EUROPE_J_DARK } from "./data/j-soc-geo-europe.j-dark";
import { J_EUROPE_J_KISAKU } from "./data/j-soc-geo-europe.j-kisaku";
import { H_GREECE_BASE } from "./data/h-hist-w-greece";
import { H_GREECE_H_CHARISMA } from "./data/h-hist-w-greece.h-charisma";
import { H_GREECE_H_KYOJU } from "./data/h-hist-w-greece.h-kyoju";
import { H_GREECE_H_NEKKETSU } from "./data/h-hist-w-greece.h-nekketsu";
import { H_DENRYU_BASE } from "./data/h-sci-phyb-denryu";
import { H_DENRYU_H_CHARISMA } from "./data/h-sci-phyb-denryu.h-charisma";
import { H_DENRYU_H_KYOJU } from "./data/h-sci-phyb-denryu.h-kyoju";
import { H_DENRYU_H_NEKKETSU } from "./data/h-sci-phyb-denryu.h-nekketsu";
import { H_HIKAKU_BASE } from "./data/h-eng-gram-hikaku";
import { H_HIKAKU_H_CHARISMA } from "./data/h-eng-gram-hikaku.h-charisma";
import { H_HIKAKU_H_KYOJU } from "./data/h-eng-gram-hikaku.h-kyoju";
import { H_HIKAKU_H_NEKKETSU } from "./data/h-eng-gram-hikaku.h-nekketsu";
import { E_BAISU_YAKUSU_BASE } from "./data/e-math-5-baisu-yakusu";
import { E_BAISU_YAKUSU_E_POP } from "./data/e-math-5-baisu-yakusu.e-pop";
import { E_BAISU_YAKUSU_E_YASASHI } from "./data/e-math-5-baisu-yakusu.e-yasashi";
import { E_TENKI5_BASE } from "./data/e-science-5-tenki";
import { E_TENKI5_E_POP } from "./data/e-science-5-tenki.e-pop";
import { E_TENKI5_E_YASASHI } from "./data/e-science-5-tenki.e-yasashi";
import { E_KOKUREN_BASE } from "./data/e-social-6-kokuren";
import { E_KOKUREN_E_POP } from "./data/e-social-6-kokuren.e-pop";
import { E_KOKUREN_E_YASASHI } from "./data/e-social-6-kokuren.e-yasashi";
import { J_ICHIJI_KANSU_BASE } from "./data/j-math-2-ichiji-kansu";
import { J_ICHIJI_KANSU_J_DARK } from "./data/j-math-2-ichiji-kansu.j-dark";
import { J_ICHIJI_KANSU_J_KISAKU } from "./data/j-math-2-ichiji-kansu.j-kisaku";
import { J_KISHO_BASE } from "./data/j-sci-2-kisho";
import { J_KISHO_J_DARK } from "./data/j-sci-2-kisho.j-dark";
import { J_KISHO_J_KISAKU } from "./data/j-sci-2-kisho.j-kisaku";
import { J_KOBUN1_BASE } from "./data/j-ja-1-kobun";
import { J_KOBUN1_J_DARK } from "./data/j-ja-1-kobun.j-dark";
import { J_KOBUN1_J_KISAKU } from "./data/j-ja-1-kobun.j-kisaku";
import { H_KEIYAKU_BASE } from "./data/h-civ-kokyo-keiyaku";
import { H_KEIYAKU_H_CHARISMA } from "./data/h-civ-kokyo-keiyaku.h-charisma";
import { H_KEIYAKU_H_KYOJU } from "./data/h-civ-kokyo-keiyaku.h-kyoju";
import { H_KEIYAKU_H_NEKKETSU } from "./data/h-civ-kokyo-keiyaku.h-nekketsu";
import { E_DATA6_BASE } from "./data/e-math-6-data";
import { E_DATA6_E_POP } from "./data/e-math-6-data.e-pop";
import { E_DATA6_E_YASASHI } from "./data/e-math-6-data.e-yasashi";
import { J_JISHIN_BASE } from "./data/j-sci-1-jishin";
import { J_JISHIN_J_DARK } from "./data/j-sci-1-jishin.j-dark";
import { J_JISHIN_J_KISAKU } from "./data/j-sci-1-jishin.j-kisaku";
import { J_KAKOKEI_BASE } from "./data/j-en-1-kakokei";
import { J_KAKOKEI_J_DARK } from "./data/j-en-1-kakokei.j-dark";
import { J_KAKOKEI_J_KISAKU } from "./data/j-en-1-kakokei.j-kisaku";
import { J_ASIA_BASE } from "./data/j-soc-geo-asia";
import { J_ASIA_J_DARK } from "./data/j-soc-geo-asia.j-dark";
import { J_ASIA_J_KISAKU } from "./data/j-soc-geo-asia.j-kisaku";
import { H_ENERGY_BASE } from "./data/h-sci-phyb-energy";
import { H_ENERGY_H_CHARISMA } from "./data/h-sci-phyb-energy.h-charisma";
import { H_ENERGY_H_KYOJU } from "./data/h-sci-phyb-energy.h-kyoju";
import { H_ENERGY_H_NEKKETSU } from "./data/h-sci-phyb-energy.h-nekketsu";
import { H_BAAI_BASE } from "./data/h-math-a-baai";
import { H_BAAI_H_CHARISMA } from "./data/h-math-a-baai.h-charisma";
import { H_BAAI_H_KYOJU } from "./data/h-math-a-baai.h-kyoju";
import { H_BAAI_H_NEKKETSU } from "./data/h-math-a-baai.h-nekketsu";
import { H_KANSHI_BASE } from "./data/h-jpn-bunka-kanshi";
import { H_KANSHI_H_CHARISMA } from "./data/h-jpn-bunka-kanshi.h-charisma";
import { H_KANSHI_H_KYOJU } from "./data/h-jpn-bunka-kanshi.h-kyoju";
import { H_KANSHI_H_NEKKETSU } from "./data/h-jpn-bunka-kanshi.h-nekketsu";
import { E_TOCHI_BASE } from "./data/e-science-6-tochi";
import { E_TOCHI_E_POP } from "./data/e-science-6-tochi.e-pop";
import { E_TOCHI_E_YASASHI } from "./data/e-science-6-tochi.e-yasashi";
import { J_DATA1_BASE } from "./data/j-math-1-data";
import { J_DATA1_J_DARK } from "./data/j-math-1-data.j-dark";
import { J_DATA1_J_KISAKU } from "./data/j-math-1-data.j-kisaku";
import { H_ISLAM_BASE } from "./data/h-hist-w-islam";
import { H_ISLAM_H_CHARISMA } from "./data/h-hist-w-islam.h-charisma";
import { H_ISLAM_H_KYOJU } from "./data/h-hist-w-islam.h-kyoju";
import { H_ISLAM_H_NEKKETSU } from "./data/h-hist-w-islam.h-nekketsu";
import { E_WAGO_BASE } from "./data/e-japanese-5-wago";
import { E_WAGO_E_POP } from "./data/e-japanese-5-wago.e-pop";
import { E_WAGO_E_YASASHI } from "./data/e-japanese-5-wago.e-yasashi";
import { J_SHOKUBUTSU_BASE } from "./data/j-sci-2-shokubutsu";
import { J_SHOKUBUTSU_J_DARK } from "./data/j-sci-2-shokubutsu.j-dark";
import { J_SHOKUBUTSU_J_KISAKU } from "./data/j-sci-2-shokubutsu.j-kisaku";
import { H_OTO_BASE } from "./data/h-sci-phyb-oto";
import { H_OTO_H_CHARISMA } from "./data/h-sci-phyb-oto.h-charisma";
import { H_OTO_H_KYOJU } from "./data/h-sci-phyb-oto.h-kyoju";
import { H_OTO_H_NEKKETSU } from "./data/h-sci-phyb-oto.h-nekketsu";
import { E_ICHI_BASE } from "./data/e-english-56-ichi";
import { E_ICHI_E_POP } from "./data/e-english-56-ichi.e-pop";
import { E_ICHI_E_YASASHI } from "./data/e-english-56-ichi.e-yasashi";
import { E_SETSUMEI_BASE } from "./data/e-japanese-6-setsumei";
import { E_SETSUMEI_E_POP } from "./data/e-japanese-6-setsumei.e-pop";
import { E_SETSUMEI_E_YASASHI } from "./data/e-japanese-6-setsumei.e-yasashi";
import { E_KUNIGUNI_BASE } from "./data/e-social-6-kuniguni";
import { E_KUNIGUNI_E_POP } from "./data/e-social-6-kuniguni.e-pop";
import { E_KUNIGUNI_E_YASASHI } from "./data/e-social-6-kuniguni.e-yasashi";
import { J_KANBUN1_BASE } from "./data/j-ja-1-kanbun";
import { J_KANBUN1_J_DARK } from "./data/j-ja-1-kanbun.j-dark";
import { J_KANBUN1_J_KISAKU } from "./data/j-ja-1-kanbun.j-kisaku";
import { J_KENPO_BASE } from "./data/j-soc-civ-kenpo";
import { J_KENPO_J_DARK } from "./data/j-soc-civ-kenpo.j-dark";
import { J_KENPO_J_KISAKU } from "./data/j-soc-civ-kenpo.j-kisaku";
import { J_LISTENING1_BASE } from "./data/j-en-1-listening";
import { J_LISTENING1_J_DARK } from "./data/j-en-1-listening.j-dark";
import { J_LISTENING1_J_KISAKU } from "./data/j-en-1-listening.j-kisaku";
import { H_INFO_DATA_BASE } from "./data/h-info-1-data";
import { H_INFO_DATA_H_CHARISMA } from "./data/h-info-1-data.h-charisma";
import { H_INFO_DATA_H_KYOJU } from "./data/h-info-1-data.h-kyoju";
import { H_INFO_DATA_H_NEKKETSU } from "./data/h-info-1-data.h-nekketsu";
import { H_JISA_BASE } from "./data/h-geo-sogo-jisa";
import { H_JISA_H_CHARISMA } from "./data/h-geo-sogo-jisa.h-charisma";
import { H_JISA_H_KYOJU } from "./data/h-geo-sogo-jisa.h-kyoju";
import { H_JISA_H_NEKKETSU } from "./data/h-geo-sogo-jisa.h-nekketsu";
import { H_KENPO_BASE } from "./data/h-civ-kokyo-kenpo";
import { H_KENPO_H_CHARISMA } from "./data/h-civ-kokyo-kenpo.h-charisma";
import { H_KENPO_H_KYOJU } from "./data/h-civ-kokyo-kenpo.h-kyoju";
import { H_KENPO_H_NEKKETSU } from "./data/h-civ-kokyo-kenpo.h-nekketsu";
import { E_IKITAI_BASE } from "./data/e-english-56-ikitai";
import { E_IKITAI_E_POP } from "./data/e-english-56-ikitai.e-pop";
import { E_IKITAI_E_YASASHI } from "./data/e-english-56-ikitai.e-yasashi";
import { E_SHI_BASE } from "./data/e-japanese-6-shi";
import { E_SHI_E_POP } from "./data/e-japanese-6-shi.e-pop";
import { E_SHI_E_YASASHI } from "./data/e-japanese-6-shi.e-yasashi";
import { E_KURASHI_SEIJI_BASE } from "./data/e-social-6-kurashi-seiji";
import { E_KURASHI_SEIJI_E_POP } from "./data/e-social-6-kurashi-seiji.e-pop";
import { E_KURASHI_SEIJI_E_YASASHI } from "./data/e-social-6-kurashi-seiji.e-yasashi";
import { J_KANJI1_BASE } from "./data/j-ja-1-kanji";
import { J_KANJI1_J_DARK } from "./data/j-ja-1-kanji.j-dark";
import { J_KANJI1_J_KISAKU } from "./data/j-ja-1-kanji.j-kisaku";
import { J_KIGYO_BASE } from "./data/j-soc-civ-kigyo";
import { J_KIGYO_J_DARK } from "./data/j-soc-civ-kigyo.j-dark";
import { J_KIGYO_J_KISAKU } from "./data/j-soc-civ-kigyo.j-kisaku";
import { J_MEIREI1_BASE } from "./data/j-en-1-meirei";
import { J_MEIREI1_J_DARK } from "./data/j-en-1-meirei.j-dark";
import { J_MEIREI1_J_KISAKU } from "./data/j-en-1-meirei.j-kisaku";
import { H_DESIGN_BASE } from "./data/h-info-1-design";
import { H_DESIGN_H_CHARISMA } from "./data/h-info-1-design.h-charisma";
import { H_DESIGN_H_KYOJU } from "./data/h-info-1-design.h-kyoju";
import { H_DESIGN_H_NEKKETSU } from "./data/h-info-1-design.h-nekketsu";
import { H_KANKYO_BASE } from "./data/h-geo-sogo-kankyo";
import { H_KANKYO_H_CHARISMA } from "./data/h-geo-sogo-kankyo.h-charisma";
import { H_KANKYO_H_KYOJU } from "./data/h-geo-sogo-kankyo.h-kyoju";
import { H_KANKYO_H_NEKKETSU } from "./data/h-geo-sogo-kankyo.h-nekketsu";
import { H_BUNKEI_BASE } from "./data/h-eng-gram-bunkei";
import { H_BUNKEI_H_CHARISMA } from "./data/h-eng-gram-bunkei.h-charisma";
import { H_BUNKEI_H_KYOJU } from "./data/h-eng-gram-bunkei.h-kyoju";
import { H_BUNKEI_H_NEKKETSU } from "./data/h-eng-gram-bunkei.h-nekketsu";
import { J_MONOGATARI1_BASE } from "./data/j-ja-1-monogatari";
import { J_MONOGATARI1_J_DARK } from "./data/j-ja-1-monogatari.j-dark";
import { J_MONOGATARI1_J_KISAKU } from "./data/j-ja-1-monogatari.j-kisaku";
import { J_KINYU_BASE } from "./data/j-soc-civ-kinyu";
import { J_KINYU_J_DARK } from "./data/j-soc-civ-kinyu.j-dark";
import { J_KINYU_J_KISAKU } from "./data/j-soc-civ-kinyu.j-kisaku";
import { J_MEISHI1_BASE } from "./data/j-en-1-meishi";
import { J_MEISHI1_J_DARK } from "./data/j-en-1-meishi.j-dark";
import { J_MEISHI1_J_KISAKU } from "./data/j-en-1-meishi.j-kisaku";
import { H_DIGITAL_BASE } from "./data/h-info-1-digital";
import { H_DIGITAL_H_CHARISMA } from "./data/h-info-1-digital.h-charisma";
import { H_DIGITAL_H_KYOJU } from "./data/h-info-1-digital.h-kyoju";
import { H_DIGITAL_H_NEKKETSU } from "./data/h-info-1-digital.h-nekketsu";
import { H_KINYU_BASE } from "./data/h-civ-kokyo-kinyu";
import { H_KINYU_H_CHARISMA } from "./data/h-civ-kokyo-kinyu.h-charisma";
import { H_KINYU_H_KYOJU } from "./data/h-civ-kokyo-kinyu.h-kyoju";
import { H_KINYU_H_NEKKETSU } from "./data/h-civ-kokyo-kinyu.h-nekketsu";
import { H_KIKO_BASE } from "./data/h-geo-sogo-kiko";
import { H_KIKO_H_CHARISMA } from "./data/h-geo-sogo-kiko.h-charisma";
import { H_KIKO_H_KYOJU } from "./data/h-geo-sogo-kiko.h-kyoju";
import { H_KIKO_H_NEKKETSU } from "./data/h-geo-sogo-kiko.h-nekketsu";
import { E_JIKOSHOKAI_BASE } from "./data/e-english-56-jikoshokai";
import { E_JIKOSHOKAI_E_POP } from "./data/e-english-56-jikoshokai.e-pop";
import { E_JIKOSHOKAI_E_YASASHI } from "./data/e-english-56-jikoshokai.e-yasashi";
import { E_ZUIHITSU_BASE } from "./data/e-japanese-6-zuihitsu";
import { E_ZUIHITSU_E_POP } from "./data/e-japanese-6-zuihitsu.e-pop";
import { E_ZUIHITSU_E_YASASHI } from "./data/e-japanese-6-zuihitsu.e-yasashi";
import { E_MUROMACHI_BASE } from "./data/e-social-6-muromachi";
import { E_MUROMACHI_E_POP } from "./data/e-social-6-muromachi.e-pop";
import { E_MUROMACHI_E_YASASHI } from "./data/e-social-6-muromachi.e-yasashi";
import { J_SETSUMEI_BASE } from "./data/j-ja-1-setsumei";
import { J_SETSUMEI_J_DARK } from "./data/j-ja-1-setsumei.j-dark";
import { J_SETSUMEI_J_KISAKU } from "./data/j-ja-1-setsumei.j-kisaku";
import { J_KOKKAI_BASE } from "./data/j-soc-civ-kokkai";
import { J_KOKKAI_J_DARK } from "./data/j-soc-civ-kokkai.j-dark";
import { J_KOKKAI_J_KISAKU } from "./data/j-soc-civ-kokkai.j-kisaku";
import { J_ONSEI_BASE } from "./data/j-en-1-onsei";
import { J_ONSEI_J_DARK } from "./data/j-en-1-onsei.j-dark";
import { J_ONSEI_J_KISAKU } from "./data/j-en-1-onsei.j-kisaku";
import { H_TANKA_BASE } from "./data/h-jpn-bungaku-tanka";
import { H_TANKA_H_CHARISMA } from "./data/h-jpn-bungaku-tanka.h-charisma";
import { H_TANKA_H_KYOJU } from "./data/h-jpn-bungaku-tanka.h-kyoju";
import { H_TANKA_H_NEKKETSU } from "./data/h-jpn-bungaku-tanka.h-nekketsu";
import { H_INFO_HYOGEN_BASE } from "./data/h-info-1-hyogen";
import { H_INFO_HYOGEN_H_CHARISMA } from "./data/h-info-1-hyogen.h-charisma";
import { H_INFO_HYOGEN_H_KYOJU } from "./data/h-info-1-hyogen.h-kyoju";
import { H_INFO_HYOGEN_H_NEKKETSU } from "./data/h-info-1-hyogen.h-nekketsu";
import { H_BAKUMATSU_BASE } from "./data/h-hist-jp-bakumatsu";
import { H_BAKUMATSU_H_CHARISMA } from "./data/h-hist-jp-bakumatsu.h-charisma";
import { H_BAKUMATSU_H_KYOJU } from "./data/h-hist-jp-bakumatsu.h-kyoju";
import { H_BAKUMATSU_H_NEKKETSU } from "./data/h-hist-jp-bakumatsu.h-nekketsu";
import { E_KAKO_BASE } from "./data/e-english-56-kako";
import { E_KAKO_E_POP } from "./data/e-english-56-kako.e-pop";
import { E_KAKO_E_YASASHI } from "./data/e-english-56-kako.e-yasashi";
import { E_BUN_KUMITATE_BASE } from "./data/e-japanese-5-bun-kumitate";
import { E_BUN_KUMITATE_E_POP } from "./data/e-japanese-5-bun-kumitate.e-pop";
import { E_BUN_KUMITATE_E_YASASHI } from "./data/e-japanese-5-bun-kumitate.e-yasashi";
import { E_KANKYO_BASE } from "./data/e-science-6-kankyo";
import { E_KANKYO_E_POP } from "./data/e-science-6-kankyo.e-pop";
import { E_KANKYO_E_YASASHI } from "./data/e-science-6-kankyo.e-yasashi";
import { J_SHI_BASE } from "./data/j-ja-1-shi";
import { J_SHI_J_DARK } from "./data/j-ja-1-shi.j-dark";
import { J_SHI_J_KISAKU } from "./data/j-ja-1-shi.j-kisaku";
import { J_KOKUSAI_BASE } from "./data/j-soc-civ-kokusai";
import { J_KOKUSAI_J_DARK } from "./data/j-soc-civ-kokusai.j-dark";
import { J_KOKUSAI_J_KISAKU } from "./data/j-soc-civ-kokusai.j-kisaku";
import { J_SHINKOKEI_BASE } from "./data/j-en-1-shinkokei";
import { J_SHINKOKEI_J_DARK } from "./data/j-en-1-shinkokei.j-dark";
import { J_SHINKOKEI_J_KISAKU } from "./data/j-en-1-shinkokei.j-kisaku";
import { H_BUNSHI_BASE } from "./data/h-eng-gram-bunshi";
import { H_BUNSHI_H_CHARISMA } from "./data/h-eng-gram-bunshi.h-charisma";
import { H_BUNSHI_H_KYOJU } from "./data/h-eng-gram-bunshi.h-kyoju";
import { H_BUNSHI_H_NEKKETSU } from "./data/h-eng-gram-bunshi.h-nekketsu";
import { H_KOKUSAI_KEIZAI_BASE } from "./data/h-civ-kokyo-kokusai-keizai";
import { H_KOKUSAI_KEIZAI_H_CHARISMA } from "./data/h-civ-kokyo-kokusai-keizai.h-charisma";
import { H_KOKUSAI_KEIZAI_H_KYOJU } from "./data/h-civ-kokyo-kokusai-keizai.h-kyoju";
import { H_KOKUSAI_KEIZAI_H_NEKKETSU } from "./data/h-civ-kokyo-kokusai-keizai.h-nekketsu";
import { H_MUSUBI_BASE } from "./data/h-geo-sogo-musubi";
import { H_MUSUBI_H_CHARISMA } from "./data/h-geo-sogo-musubi.h-charisma";
import { H_MUSUBI_H_KYOJU } from "./data/h-geo-sogo-musubi.h-kyoju";
import { H_MUSUBI_H_NEKKETSU } from "./data/h-geo-sogo-musubi.h-nekketsu";
import { E_KYOKA_BASE } from "./data/e-english-56-kyoka";
import { E_KYOKA_E_POP } from "./data/e-english-56-kyoka.e-pop";
import { E_KYOKA_E_YASASHI } from "./data/e-english-56-kyoka.e-yasashi";
import { E_DENKI5_BASE } from "./data/e-japanese-5-denki";
import { E_DENKI5_E_POP } from "./data/e-japanese-5-denki.e-pop";
import { E_DENKI5_E_YASASHI } from "./data/e-japanese-5-denki.e-yasashi";
import { E_SEIJI_BASE } from "./data/e-social-6-seiji";
import { E_SEIJI_E_POP } from "./data/e-social-6-seiji.e-pop";
import { E_SEIJI_E_YASASHI } from "./data/e-social-6-seiji.e-yasashi";
import { J_FUZOKU_BASE } from "./data/j-ja-2-bunpo-fuzoku";
import { J_FUZOKU_J_DARK } from "./data/j-ja-2-bunpo-fuzoku.j-dark";
import { J_FUZOKU_J_KISAKU } from "./data/j-ja-2-bunpo-fuzoku.j-kisaku";
import { J_NAIKAKU_BASE } from "./data/j-soc-civ-naikaku";
import { J_NAIKAKU_J_DARK } from "./data/j-soc-civ-naikaku.j-dark";
import { J_NAIKAKU_J_KISAKU } from "./data/j-soc-civ-naikaku.j-kisaku";
import { J_TANGO_BASE } from "./data/j-en-1-tango";
import { J_TANGO_J_DARK } from "./data/j-en-1-tango.j-dark";
import { J_TANGO_J_KISAKU } from "./data/j-en-1-tango.j-kisaku";
import { H_KOBUN_JODOSHI_BASE } from "./data/h-jpn-bunka-jodoshi";
import { H_KOBUN_JODOSHI_H_CHARISMA } from "./data/h-jpn-bunka-jodoshi.h-charisma";
import { H_KOBUN_JODOSHI_H_KYOJU } from "./data/h-jpn-bunka-jodoshi.h-kyoju";
import { H_KOBUN_JODOSHI_H_NEKKETSU } from "./data/h-jpn-bunka-jodoshi.h-nekketsu";
import { H_INFO_MEDIA_BASE } from "./data/h-info-1-media";
import { H_INFO_MEDIA_H_CHARISMA } from "./data/h-info-1-media.h-charisma";
import { H_INFO_MEDIA_H_KYOJU } from "./data/h-info-1-media.h-kyoju";
import { H_INFO_MEDIA_H_NEKKETSU } from "./data/h-info-1-media.h-nekketsu";
import { H_EDO_DOYO_BASE } from "./data/h-hist-jp-edo-doyo";
import { H_EDO_DOYO_H_CHARISMA } from "./data/h-hist-jp-edo-doyo.h-charisma";
import { H_EDO_DOYO_H_KYOJU } from "./data/h-hist-jp-edo-doyo.h-kyoju";
import { H_EDO_DOYO_H_NEKKETSU } from "./data/h-hist-jp-edo-doyo.h-nekketsu";
import { E_OMOIDE_BASE } from "./data/e-english-56-omoide";
import { E_OMOIDE_E_POP } from "./data/e-english-56-omoide.e-pop";
import { E_OMOIDE_E_YASASHI } from "./data/e-english-56-omoide.e-yasashi";
import { E_DOUON_BASE } from "./data/e-japanese-5-douon";
import { E_DOUON_E_POP } from "./data/e-japanese-5-douon.e-pop";
import { E_DOUON_E_YASASHI } from "./data/e-japanese-5-douon.e-yasashi";
import { E_SHOKUBUTSU_BASE } from "./data/e-science-6-shokubutsu";
import { E_SHOKUBUTSU_E_POP } from "./data/e-science-6-shokubutsu.e-pop";
import { E_SHOKUBUTSU_E_YASASHI } from "./data/e-science-6-shokubutsu.e-yasashi";
import { J_YOGEN_BASE } from "./data/j-ja-2-bunpo-yogen";
import { J_YOGEN_J_DARK } from "./data/j-ja-2-bunpo-yogen.j-dark";
import { J_YOGEN_J_KISAKU } from "./data/j-ja-2-bunpo-yogen.j-kisaku";
import { J_SAIBANSHO_BASE } from "./data/j-soc-civ-saibansho";
import { J_SAIBANSHO_J_DARK } from "./data/j-soc-civ-saibansho.j-dark";
import { J_SAIBANSHO_J_KISAKU } from "./data/j-soc-civ-saibansho.j-kisaku";
import { J_BUNKEI_BASE } from "./data/j-en-2-bunkei";
import { J_BUNKEI_J_DARK } from "./data/j-en-2-bunkei.j-dark";
import { J_BUNKEI_J_KISAKU } from "./data/j-en-2-bunkei.j-kisaku";
import { H_BUNSHIKOBUN_BASE } from "./data/h-eng-gram-bunshikobun";
import { H_BUNSHIKOBUN_H_CHARISMA } from "./data/h-eng-gram-bunshikobun.h-charisma";
import { H_BUNSHIKOBUN_H_KYOJU } from "./data/h-eng-gram-bunshikobun.h-kyoju";
import { H_BUNSHIKOBUN_H_NEKKETSU } from "./data/h-eng-gram-bunshikobun.h-nekketsu";
import { H_KOKUSAI_SEIJI_BASE } from "./data/h-civ-kokyo-kokusai-seiji";
import { H_KOKUSAI_SEIJI_H_CHARISMA } from "./data/h-civ-kokyo-kokusai-seiji.h-charisma";
import { H_KOKUSAI_SEIJI_H_KYOJU } from "./data/h-civ-kokyo-kokusai-seiji.h-kyoju";
import { H_KOKUSAI_SEIJI_H_NEKKETSU } from "./data/h-civ-kokyo-kokusai-seiji.h-nekketsu";
import { H_SHIGEN_BASE } from "./data/h-geo-sogo-shigen";
import { H_SHIGEN_H_CHARISMA } from "./data/h-geo-sogo-shigen.h-charisma";
import { H_SHIGEN_H_KYOJU } from "./data/h-geo-sogo-shigen.h-kyoju";
import { H_SHIGEN_H_NEKKETSU } from "./data/h-geo-sogo-shigen.h-nekketsu";
import { E_OTO_MOJI_BASE } from "./data/e-english-56-oto-moji";
import { E_OTO_MOJI_E_POP } from "./data/e-english-56-oto-moji.e-pop";
import { E_OTO_MOJI_E_YASASHI } from "./data/e-english-56-oto-moji.e-yasashi";
import { E_HOUKOKU_BASE } from "./data/e-japanese-5-houkoku";
import { E_HOUKOKU_E_POP } from "./data/e-japanese-5-houkoku.e-pop";
import { E_HOUKOKU_E_YASASHI } from "./data/e-japanese-5-houkoku.e-yasashi";
import { E_SEKAI_BASE } from "./data/e-social-6-sekai";
import { E_SEKAI_E_POP } from "./data/e-social-6-sekai.e-pop";
import { E_SEKAI_E_YASASHI } from "./data/e-social-6-sekai.e-yasashi";
import { J_GOI2_BASE } from "./data/j-ja-2-goi";
import { J_GOI2_J_DARK } from "./data/j-ja-2-goi.j-dark";
import { J_GOI2_J_KISAKU } from "./data/j-ja-2-goi.j-kisaku";
import { J_SENKYO_BASE } from "./data/j-soc-civ-senkyo";
import { J_SENKYO_J_DARK } from "./data/j-soc-civ-senkyo.j-dark";
import { J_SENKYO_J_KISAKU } from "./data/j-soc-civ-senkyo.j-kisaku";
import { J_DOMEISHI_BASE } from "./data/j-en-2-domeishi";
import { J_DOMEISHI_J_DARK } from "./data/j-en-2-domeishi.j-dark";
import { J_DOMEISHI_J_KISAKU } from "./data/j-en-2-domeishi.j-kisaku";
import { H_KINDAI_BASE } from "./data/h-jpn-bunka-kindai";
import { H_KINDAI_H_CHARISMA } from "./data/h-jpn-bunka-kindai.h-charisma";
import { H_KINDAI_H_KYOJU } from "./data/h-jpn-bunka-kindai.h-kyoju";
import { H_KINDAI_H_NEKKETSU } from "./data/h-jpn-bunka-kindai.h-nekketsu";
import { H_MODEL_BASE } from "./data/h-info-1-model";
import { H_MODEL_H_CHARISMA } from "./data/h-info-1-model.h-charisma";
import { H_MODEL_H_KYOJU } from "./data/h-info-1-model.h-kyoju";
import { H_MODEL_H_NEKKETSU } from "./data/h-info-1-model.h-nekketsu";
import { H_EDO_KEIZAI_BASE } from "./data/h-hist-jp-edo-keizai";
import { H_EDO_KEIZAI_H_CHARISMA } from "./data/h-hist-jp-edo-keizai.h-charisma";
import { H_EDO_KEIZAI_H_KYOJU } from "./data/h-hist-jp-edo-keizai.h-kyoju";
import { H_EDO_KEIZAI_H_NEKKETSU } from "./data/h-hist-jp-edo-keizai.h-nekketsu";
import { E_TANJOBI_BASE } from "./data/e-english-56-tanjobi";
import { E_TANJOBI_E_POP } from "./data/e-english-56-tanjobi.e-pop";
import { E_TANJOBI_E_YASASHI } from "./data/e-english-56-tanjobi.e-yasashi";
import { E_JUKUGO_BASE } from "./data/e-japanese-5-jukugo";
import { E_JUKUGO_E_POP } from "./data/e-japanese-5-jukugo.e-pop";
import { E_JUKUGO_E_YASASHI } from "./data/e-japanese-5-jukugo.e-yasashi";
import { E_TSUKI_TAIYO_BASE } from "./data/e-science-6-tsuki-taiyo";
import { E_TSUKI_TAIYO_E_POP } from "./data/e-science-6-tsuki-taiyo.e-pop";
import { E_TSUKI_TAIYO_E_YASASHI } from "./data/e-science-6-tsuki-taiyo.e-yasashi";
import { J_HANASU2_BASE } from "./data/j-ja-2-hanasu";
import { J_HANASU2_J_DARK } from "./data/j-ja-2-hanasu.j-dark";
import { J_HANASU2_J_KISAKU } from "./data/j-ja-2-hanasu.j-kisaku";
import { J_SHAKAI_HOSHO_BASE } from "./data/j-soc-civ-shakai-hosho";
import { J_SHAKAI_HOSHO_J_DARK } from "./data/j-soc-civ-shakai-hosho.j-dark";
import { J_SHAKAI_HOSHO_J_KISAKU } from "./data/j-soc-civ-shakai-hosho.j-kisaku";
import { J_EISAKUBUN2_BASE } from "./data/j-en-2-eisakubun";
import { J_EISAKUBUN2_J_DARK } from "./data/j-en-2-eisakubun.j-dark";
import { J_EISAKUBUN2_J_KISAKU } from "./data/j-en-2-eisakubun.j-kisaku";
import { H_DAIMEISHI_BASE } from "./data/h-eng-gram-daimeishi";
import { H_DAIMEISHI_H_CHARISMA } from "./data/h-eng-gram-daimeishi.h-charisma";
import { H_DAIMEISHI_H_KYOJU } from "./data/h-eng-gram-daimeishi.h-kyoju";
import { H_DAIMEISHI_H_NEKKETSU } from "./data/h-eng-gram-daimeishi.h-nekketsu";
import { H_RODO_BASE } from "./data/h-civ-kokyo-rodo";
import { H_RODO_H_CHARISMA } from "./data/h-civ-kokyo-rodo.h-charisma";
import { H_RODO_H_KYOJU } from "./data/h-civ-kokyo-rodo.h-kyoju";
import { H_RODO_H_NEKKETSU } from "./data/h-civ-kokyo-rodo.h-nekketsu";
import { H_SHUKYO_BASE } from "./data/h-geo-sogo-shukyo";
import { H_SHUKYO_H_CHARISMA } from "./data/h-geo-sogo-shukyo.h-charisma";
import { H_SHUKYO_H_KYOJU } from "./data/h-geo-sogo-shukyo.h-kyoju";
import { H_SHUKYO_H_NEKKETSU } from "./data/h-geo-sogo-shukyo.h-nekketsu";
import { E_YUME_BASE } from "./data/e-english-56-yume";
import { E_YUME_E_POP } from "./data/e-english-56-yume.e-pop";
import { E_YUME_E_YASASHI } from "./data/e-english-56-yume.e-yasashi";
import { E_SENGO_BASE } from "./data/e-social-6-sengo";
import { E_SENGO_E_POP } from "./data/e-social-6-sengo.e-pop";
import { E_SENGO_E_YASASHI } from "./data/e-social-6-sengo.e-yasashi";
import { E_KANJI5_BASE } from "./data/e-japanese-5-kanji";
import { E_KANJI5_E_POP } from "./data/e-japanese-5-kanji.e-pop";
import { E_KANJI5_E_YASASHI } from "./data/e-japanese-5-kanji.e-yasashi";
import { J_IKENBUN_BASE } from "./data/j-ja-2-ikenbun";
import { J_IKENBUN_J_DARK } from "./data/j-ja-2-ikenbun.j-dark";
import { J_IKENBUN_J_KISAKU } from "./data/j-ja-2-ikenbun.j-kisaku";
import { J_BUSSHITSU_BASE } from "./data/j-sci-1-busshitsu";
import { J_BUSSHITSU_J_DARK } from "./data/j-sci-1-busshitsu.j-dark";
import { J_BUSSHITSU_J_KISAKU } from "./data/j-sci-1-busshitsu.j-kisaku";
import { J_SHIJO_BASE } from "./data/j-soc-civ-shijo";
import { J_SHIJO_J_DARK } from "./data/j-soc-civ-shijo.j-dark";
import { J_SHIJO_J_KISAKU } from "./data/j-soc-civ-shijo.j-kisaku";
import { H_KOBUN_DOKKAI_BASE } from "./data/h-jpn-bunka-kobun-dokkai";
import { H_KOBUN_DOKKAI_H_CHARISMA } from "./data/h-jpn-bunka-kobun-dokkai.h-charisma";
import { H_KOBUN_DOKKAI_H_KYOJU } from "./data/h-jpn-bunka-kobun-dokkai.h-kyoju";
import { H_KOBUN_DOKKAI_H_NEKKETSU } from "./data/h-jpn-bunka-kobun-dokkai.h-nekketsu";
import { H_INFO_MORAL_BASE } from "./data/h-info-1-moral";
import { H_INFO_MORAL_H_CHARISMA } from "./data/h-info-1-moral.h-charisma";
import { H_INFO_MORAL_H_KYOJU } from "./data/h-info-1-moral.h-kyoju";
import { H_INFO_MORAL_H_NEKKETSU } from "./data/h-info-1-moral.h-nekketsu";
import { H_GENDAI_BASE } from "./data/h-hist-jp-gendai";
import { H_GENDAI_H_CHARISMA } from "./data/h-hist-jp-gendai.h-charisma";
import { H_GENDAI_H_KYOJU } from "./data/h-hist-jp-gendai.h-kyoju";
import { H_GENDAI_H_NEKKETSU } from "./data/h-hist-jp-gendai.h-nekketsu";
import { E_AISATSU_BASE } from "./data/e-english-34-aisatsu";
import { E_AISATSU_E_POP } from "./data/e-english-34-aisatsu.e-pop";
import { E_AISATSU_E_YASASHI } from "./data/e-english-34-aisatsu.e-yasashi";
import { E_HITO5_BASE } from "./data/e-science-5-hito";
import { E_HITO5_E_POP } from "./data/e-science-5-hito.e-pop";
import { E_HITO5_E_YASASHI } from "./data/e-science-5-hito.e-yasashi";
import { E_SENSO_BASE } from "./data/e-social-6-senso";
import { E_SENSO_E_POP } from "./data/e-social-6-senso.e-pop";
import { E_SENSO_E_YASASHI } from "./data/e-social-6-senso.e-yasashi";
import { J_KANJI2_BASE } from "./data/j-ja-2-kanji";
import { J_KANJI2_J_DARK } from "./data/j-ja-2-kanji.j-dark";
import { J_KANJI2_J_KISAKU } from "./data/j-ja-2-kanji.j-kisaku";
import { J_KAKO_SHINKO_BASE } from "./data/j-en-2-kako-shinko";
import { J_KAKO_SHINKO_J_DARK } from "./data/j-en-2-kako-shinko.j-dark";
import { J_KAKO_SHINKO_J_KISAKU } from "./data/j-en-2-kako-shinko.j-kisaku";
import { J_CHIKARA_BASE } from "./data/j-sci-1-chikara";
import { J_CHIKARA_J_DARK } from "./data/j-sci-1-chikara.j-dark";
import { J_CHIKARA_J_KISAKU } from "./data/j-sci-1-chikara.j-kisaku";
import { H_DOMEISHI_BASE } from "./data/h-eng-gram-domeishi";
import { H_DOMEISHI_H_CHARISMA } from "./data/h-eng-gram-domeishi.h-charisma";
import { H_DOMEISHI_H_KYOJU } from "./data/h-eng-gram-domeishi.h-kyoju";
import { H_DOMEISHI_H_NEKKETSU } from "./data/h-eng-gram-domeishi.h-nekketsu";
import { H_SEINEN_BASE } from "./data/h-civ-kokyo-seinen";
import { H_SEINEN_H_CHARISMA } from "./data/h-civ-kokyo-seinen.h-charisma";
import { H_SEINEN_H_KYOJU } from "./data/h-civ-kokyo-seinen.h-kyoju";
import { H_SEINEN_H_NEKKETSU } from "./data/h-civ-kokyo-seinen.h-nekketsu";
import { H_TOSHI_BASE } from "./data/h-geo-sogo-toshi";
import { H_TOSHI_H_CHARISMA } from "./data/h-geo-sogo-toshi.h-charisma";
import { H_TOSHI_H_KYOJU } from "./data/h-geo-sogo-toshi.h-kyoju";
import { H_TOSHI_H_NEKKETSU } from "./data/h-geo-sogo-toshi.h-nekketsu";
import { E_KOMOJI_BASE } from "./data/e-english-34-alpha-komoji";
import { E_KOMOJI_E_POP } from "./data/e-english-34-alpha-komoji.e-pop";
import { E_KOMOJI_E_YASASHI } from "./data/e-english-34-alpha-komoji.e-yasashi";
import { E_KOTEN5_BASE } from "./data/e-japanese-5-koten";
import { E_KOTEN5_E_POP } from "./data/e-japanese-5-koten.e-pop";
import { E_KOTEN5_E_YASASHI } from "./data/e-japanese-5-koten.e-yasashi";
import { E_MI5_BASE } from "./data/e-science-5-mi";
import { E_MI5_E_POP } from "./data/e-science-5-mi.e-pop";
import { E_MI5_E_YASASHI } from "./data/e-science-5-mi.e-yasashi";
import { J_KANSHI2_BASE } from "./data/j-ja-2-kanshi";
import { J_KANSHI2_J_DARK } from "./data/j-ja-2-kanshi.j-dark";
import { J_KANSHI2_J_KISAKU } from "./data/j-ja-2-kanshi.j-kisaku";
import { J_SHOHI_BASE } from "./data/j-soc-civ-shohi";
import { J_SHOHI_J_DARK } from "./data/j-soc-civ-shohi.j-dark";
import { J_SHOHI_J_KISAKU } from "./data/j-soc-civ-shohi.j-kisaku";
import { J_LISTENING2_BASE } from "./data/j-en-2-listening";
import { J_LISTENING2_J_DARK } from "./data/j-en-2-listening.j-dark";
import { J_LISTENING2_J_KISAKU } from "./data/j-en-2-listening.j-kisaku";
import { H_KOBUN_NYUMON_BASE } from "./data/h-jpn-bunka-kobun-nyumon";
import { H_KOBUN_NYUMON_H_CHARISMA } from "./data/h-jpn-bunka-kobun-nyumon.h-charisma";
import { H_KOBUN_NYUMON_H_KYOJU } from "./data/h-jpn-bunka-kobun-nyumon.h-kyoju";
import { H_KOBUN_NYUMON_H_NEKKETSU } from "./data/h-jpn-bunka-kobun-nyumon.h-nekketsu";
import { H_NETWORK_BASE } from "./data/h-info-1-network";
import { H_NETWORK_H_CHARISMA } from "./data/h-info-1-network.h-charisma";
import { H_NETWORK_H_KYOJU } from "./data/h-info-1-network.h-kyoju";
import { H_NETWORK_H_NEKKETSU } from "./data/h-info-1-network.h-nekketsu";
import { H_JP_GENSHI_BASE } from "./data/h-hist-jp-genshi";
import { H_JP_GENSHI_H_CHARISMA } from "./data/h-hist-jp-genshi.h-charisma";
import { H_JP_GENSHI_H_KYOJU } from "./data/h-hist-jp-genshi.h-kyoju";
import { H_JP_GENSHI_H_NEKKETSU } from "./data/h-hist-jp-genshi.h-nekketsu";
import { E_OOMOJI_BASE } from "./data/e-english-34-alpha-oomoji";
import { E_OOMOJI_E_POP } from "./data/e-english-34-alpha-oomoji.e-pop";
import { E_OOMOJI_E_YASASHI } from "./data/e-english-34-alpha-oomoji.e-yasashi";
import { E_TENKA_BASE } from "./data/e-social-6-tenka";
import { E_TENKA_E_POP } from "./data/e-social-6-tenka.e-pop";
import { E_TENKA_E_YASASHI } from "./data/e-social-6-tenka.e-yasashi";
import { E_MONOGATARI5_BASE } from "./data/e-japanese-5-monogatari";
import { E_MONOGATARI5_E_POP } from "./data/e-japanese-5-monogatari.e-pop";
import { E_MONOGATARI5_E_YASASHI } from "./data/e-japanese-5-monogatari.e-yasashi";
import { J_KOBUN2_BASE } from "./data/j-ja-2-kobun";
import { J_KOBUN2_J_DARK } from "./data/j-ja-2-kobun.j-dark";
import { J_KOBUN2_J_KISAKU } from "./data/j-ja-2-kobun.j-kisaku";
import { J_CHISO_BASE } from "./data/j-sci-1-chiso";
import { J_CHISO_J_DARK } from "./data/j-sci-1-chiso.j-dark";
import { J_CHISO_J_KISAKU } from "./data/j-sci-1-chiso.j-kisaku";
import { J_ZAISEI_BASE } from "./data/j-soc-civ-zaisei";
import { J_ZAISEI_J_DARK } from "./data/j-soc-civ-zaisei.j-dark";
import { J_ZAISEI_J_KISAKU } from "./data/j-soc-civ-zaisei.j-kisaku";
import { H_KANFUKU_BASE } from "./data/h-eng-gram-kanfuku";
import { H_KANFUKU_H_CHARISMA } from "./data/h-eng-gram-kanfuku.h-charisma";
import { H_KANFUKU_H_KYOJU } from "./data/h-eng-gram-kanfuku.h-kyoju";
import { H_KANFUKU_H_NEKKETSU } from "./data/h-eng-gram-kanfuku.h-nekketsu";
import { H_SHISO_BASE } from "./data/h-civ-kokyo-shiso";
import { H_SHISO_H_CHARISMA } from "./data/h-civ-kokyo-shiso.h-charisma";
import { H_SHISO_H_KYOJU } from "./data/h-civ-kokyo-shiso.h-kyoju";
import { H_SHISO_H_NEKKETSU } from "./data/h-civ-kokyo-shiso.h-nekketsu";
import { H_AMERICA_BASE } from "./data/h-geo-tankyu-america";
import { H_AMERICA_H_CHARISMA } from "./data/h-geo-tankyu-america.h-charisma";
import { H_AMERICA_H_KYOJU } from "./data/h-geo-tankyu-america.h-kyoju";
import { H_AMERICA_H_NEKKETSU } from "./data/h-geo-tankyu-america.h-nekketsu";
import { E_HOSHII_BASE } from "./data/e-english-34-hoshii";
import { E_HOSHII_E_POP } from "./data/e-english-34-hoshii.e-pop";
import { E_HOSHII_E_YASASHI } from "./data/e-english-34-hoshii.e-yasashi";
import { E_AMAMIZU_BASE } from "./data/e-science-4-amamizu";
import { E_AMAMIZU_E_POP } from "./data/e-science-4-amamizu.e-pop";
import { E_AMAMIZU_E_YASASHI } from "./data/e-science-4-amamizu.e-yasashi";
import { E_BOEKI_BASE } from "./data/e-social-5-boeki";
import { E_BOEKI_E_POP } from "./data/e-social-5-boeki.e-pop";
import { E_BOEKI_E_YASASHI } from "./data/e-social-5-boeki.e-yasashi";
import { J_SETSUMEI2_BASE } from "./data/j-ja-2-setsumei";
import { J_SETSUMEI2_J_DARK } from "./data/j-ja-2-setsumei.j-dark";
import { J_SETSUMEI2_J_KISAKU } from "./data/j-ja-2-setsumei.j-kisaku";
import { J_SETSUZOKUSHI_BASE } from "./data/j-en-2-setsuzokushi";
import { J_SETSUZOKUSHI_J_DARK } from "./data/j-en-2-setsuzokushi.j-dark";
import { J_SETSUZOKUSHI_J_KISAKU } from "./data/j-en-2-setsuzokushi.j-kisaku";
import { J_DOBUTSU_BUNRUI_BASE } from "./data/j-sci-1-dobutsu-bunrui";
import { J_DOBUTSU_BUNRUI_J_DARK } from "./data/j-sci-1-dobutsu-bunrui.j-dark";
import { J_DOBUTSU_BUNRUI_J_KISAKU } from "./data/j-sci-1-dobutsu-bunrui.j-kisaku";
import { H_KOBUN_TANGO_BASE } from "./data/h-jpn-bunka-kobun-tango";
import { H_KOBUN_TANGO_H_CHARISMA } from "./data/h-jpn-bunka-kobun-tango.h-charisma";
import { H_KOBUN_TANGO_H_KYOJU } from "./data/h-jpn-bunka-kobun-tango.h-kyoju";
import { H_KOBUN_TANGO_H_NEKKETSU } from "./data/h-jpn-bunka-kobun-tango.h-nekketsu";
import { H_PROGRAM_BASE } from "./data/h-info-1-program";
import { H_PROGRAM_H_CHARISMA } from "./data/h-info-1-program.h-charisma";
import { H_PROGRAM_H_KYOJU } from "./data/h-info-1-program.h-kyoju";
import { H_PROGRAM_H_NEKKETSU } from "./data/h-info-1-program.h-nekketsu";
import { H_INSEI_BASE } from "./data/h-hist-jp-insei";
import { H_INSEI_H_CHARISMA } from "./data/h-hist-jp-insei.h-charisma";
import { H_INSEI_H_KYOJU } from "./data/h-hist-jp-insei.h-kyoju";
import { H_INSEI_H_NEKKETSU } from "./data/h-hist-jp-insei.h-nekketsu";
import { E_IRO_KATACHI_BASE } from "./data/e-english-34-iro-katachi";
import { E_IRO_KATACHI_E_POP } from "./data/e-english-34-iro-katachi.e-pop";
import { E_IRO_KATACHI_E_YASASHI } from "./data/e-english-34-iro-katachi.e-yasashi";
import { E_SETSUMEI5_BASE } from "./data/e-japanese-5-setsumei";
import { E_SETSUMEI5_E_POP } from "./data/e-japanese-5-setsumei.e-pop";
import { E_SETSUMEI5_E_YASASHI } from "./data/e-japanese-5-setsumei.e-yasashi";
import { E_ATATAMARI_BASE } from "./data/e-science-4-atatamari";
import { E_ATATAMARI_E_POP } from "./data/e-science-4-atatamari.e-pop";
import { E_ATATAMARI_E_YASASHI } from "./data/e-science-4-atatamari.e-yasashi";
import { J_SHOSETSU2_BASE } from "./data/j-ja-2-shosetsu";
import { J_SHOSETSU2_J_DARK } from "./data/j-ja-2-shosetsu.j-dark";
import { J_SHOSETSU2_J_KISAKU } from "./data/j-ja-2-shosetsu.j-kisaku";
import { J_AFRICA_BASE } from "./data/j-soc-geo-africa";
import { J_AFRICA_J_DARK } from "./data/j-soc-geo-africa.j-dark";
import { J_AFRICA_J_KISAKU } from "./data/j-soc-geo-africa.j-kisaku";
import { J_TANGO2_BASE } from "./data/j-en-2-tango";
import { J_TANGO2_J_DARK } from "./data/j-en-2-tango.j-dark";
import { J_TANGO2_J_KISAKU } from "./data/j-en-2-tango.j-kisaku";
import { H_KANRYO_BASE } from "./data/h-eng-gram-kanryo";
import { H_KANRYO_H_CHARISMA } from "./data/h-eng-gram-kanryo.h-charisma";
import { H_KANRYO_H_KYOJU } from "./data/h-eng-gram-kanryo.h-kyoju";
import { H_KANRYO_H_NEKKETSU } from "./data/h-eng-gram-kanryo.h-nekketsu";
import { H_TOSEI_BASE } from "./data/h-civ-kokyo-tosei";
import { H_TOSEI_H_CHARISMA } from "./data/h-civ-kokyo-tosei.h-charisma";
import { H_TOSEI_H_KYOJU } from "./data/h-civ-kokyo-tosei.h-kyoju";
import { H_TOSEI_H_NEKKETSU } from "./data/h-civ-kokyo-tosei.h-nekketsu";
import { H_TANKYU_CHIKEI_BASE } from "./data/h-geo-tankyu-chikei";
import { H_TANKYU_CHIKEI_H_CHARISMA } from "./data/h-geo-tankyu-chikei.h-charisma";
import { H_TANKYU_CHIKEI_H_KYOJU } from "./data/h-geo-tankyu-chikei.h-kyoju";
import { H_TANKYU_CHIKEI_H_NEKKETSU } from "./data/h-geo-tankyu-chikei.h-nekketsu";
import { E_JIKOKU_BASE } from "./data/e-english-34-jikoku";
import { E_JIKOKU_E_POP } from "./data/e-english-34-jikoku.e-pop";
import { E_JIKOKU_E_YASASHI } from "./data/e-english-34-jikoku.e-yasashi";
import { E_BOSAI_BASE } from "./data/e-social-5-bosai";
import { E_BOSAI_E_POP } from "./data/e-social-5-bosai.e-pop";
import { E_BOSAI_E_YASASHI } from "./data/e-social-5-bosai.e-yasashi";
import { E_SHI5_BASE } from "./data/e-japanese-5-shi";
import { E_SHI5_E_POP } from "./data/e-japanese-5-shi.e-pop";
import { E_SHI5_E_YASASHI } from "./data/e-japanese-5-shi.e-yasashi";
import { J_TANKA2_BASE } from "./data/j-ja-2-tanka";
import { J_TANKA2_J_DARK } from "./data/j-ja-2-tanka.j-dark";
import { J_TANKA2_J_KISAKU } from "./data/j-ja-2-tanka.j-kisaku";
import { J_JOTAI_BASE } from "./data/j-sci-1-jotai";
import { J_JOTAI_J_DARK } from "./data/j-sci-1-jotai.j-dark";
import { J_JOTAI_J_KISAKU } from "./data/j-sci-1-jotai.j-kisaku";
import { J_CHIIKI_CHOSA_BASE } from "./data/j-soc-geo-chiiki-chosa";
import { J_CHIIKI_CHOSA_J_DARK } from "./data/j-soc-geo-chiiki-chosa.j-dark";
import { J_CHIIKI_CHOSA_J_KISAKU } from "./data/j-soc-geo-chiiki-chosa.j-kisaku";
import { H_KOJI_BASE } from "./data/h-jpn-bunka-koji";
import { H_KOJI_H_CHARISMA } from "./data/h-jpn-bunka-koji.h-charisma";
import { H_KOJI_H_KYOJU } from "./data/h-jpn-bunka-koji.h-kyoju";
import { H_KOJI_H_NEKKETSU } from "./data/h-jpn-bunka-koji.h-nekketsu";
import { H_INFO_SYSTEM_BASE } from "./data/h-info-1-system";
import { H_INFO_SYSTEM_H_CHARISMA } from "./data/h-info-1-system.h-charisma";
import { H_INFO_SYSTEM_H_KYOJU } from "./data/h-info-1-system.h-kyoju";
import { H_INFO_SYSTEM_H_NEKKETSU } from "./data/h-info-1-system.h-nekketsu";
import { H_KODO_BASE } from "./data/h-hist-jp-kodo";
import { H_KODO_H_CHARISMA } from "./data/h-hist-jp-kodo.h-charisma";
import { H_KODO_H_KYOJU } from "./data/h-hist-jp-kodo.h-kyoju";
import { H_KODO_H_NEKKETSU } from "./data/h-hist-jp-kodo.h-nekketsu";
import { E_KAZU_BASE } from "./data/e-english-34-kazu";
import { E_KAZU_E_POP } from "./data/e-english-34-kazu.e-pop";
import { E_KAZU_E_YASASHI } from "./data/e-english-34-kazu.e-yasashi";
import { E_HONE_BASE } from "./data/e-science-4-hone";
import { E_HONE_E_POP } from "./data/e-science-4-hone.e-pop";
import { E_HONE_E_YASASHI } from "./data/e-science-4-hone.e-yasashi";
import { E_CHIKEI_BASE } from "./data/e-social-5-chikei";
import { E_CHIKEI_E_POP } from "./data/e-social-5-chikei.e-pop";
import { E_CHIKEI_E_YASASHI } from "./data/e-social-5-chikei.e-yasashi";
import { J_BUNPO3_BASE } from "./data/j-ja-3-bunpo";
import { J_BUNPO3_J_DARK } from "./data/j-ja-3-bunpo.j-dark";
import { J_BUNPO3_J_KISAKU } from "./data/j-ja-3-bunpo.j-kisaku";
import { J_BUNSHI3_BASE } from "./data/j-en-3-bunshi";
import { J_BUNSHI3_J_DARK } from "./data/j-en-3-bunshi.j-dark";
import { J_BUNSHI3_J_KISAKU } from "./data/j-en-3-bunshi.j-kisaku";
import { J_KAZAN_BASE } from "./data/j-sci-1-kazan";
import { J_KAZAN_J_DARK } from "./data/j-sci-1-kazan.j-dark";
import { J_KAZAN_J_KISAKU } from "./data/j-sci-1-kazan.j-kisaku";
import { H_KEIYOSHI_BASE } from "./data/h-eng-gram-keiyoshi";
import { H_KEIYOSHI_H_CHARISMA } from "./data/h-eng-gram-keiyoshi.h-charisma";
import { H_KEIYOSHI_H_KYOJU } from "./data/h-eng-gram-keiyoshi.h-kyoju";
import { H_KEIYOSHI_H_NEKKETSU } from "./data/h-eng-gram-keiyoshi.h-nekketsu";
import { H_RINRI_BUKKYO_BASE } from "./data/h-civ-rinri-bukkyo";
import { H_RINRI_BUKKYO_H_CHARISMA } from "./data/h-civ-rinri-bukkyo.h-charisma";
import { H_RINRI_BUKKYO_H_KYOJU } from "./data/h-civ-rinri-bukkyo.h-kyoju";
import { H_RINRI_BUKKYO_H_NEKKETSU } from "./data/h-civ-rinri-bukkyo.h-nekketsu";
import { H_TANKYU_EUROPE_BASE } from "./data/h-geo-tankyu-europe";
import { H_TANKYU_EUROPE_H_CHARISMA } from "./data/h-geo-tankyu-europe.h-charisma";
import { H_TANKYU_EUROPE_H_KYOJU } from "./data/h-geo-tankyu-europe.h-kyoju";
import { H_TANKYU_EUROPE_H_NEKKETSU } from "./data/h-geo-tankyu-europe.h-nekketsu";
import { E_SUISEN_BASE } from "./data/e-japanese-5-suisen";
import { E_SUISEN_E_POP } from "./data/e-japanese-5-suisen.e-pop";
import { E_SUISEN_E_YASASHI } from "./data/e-japanese-5-suisen.e-yasashi";
import { E_MI_NO_MAWARI_BASE } from "./data/e-english-34-mi-no-mawari";
import { E_MI_NO_MAWARI_E_POP } from "./data/e-english-34-mi-no-mawari.e-pop";
import { E_MI_NO_MAWARI_E_YASASHI } from "./data/e-english-34-mi-no-mawari.e-yasashi";
import { E_KISETSU_BASE } from "./data/e-science-4-kisetsu";
import { E_KISETSU_E_POP } from "./data/e-science-4-kisetsu.e-pop";
import { E_KISETSU_E_YASASHI } from "./data/e-science-4-kisetsu.e-yasashi";
import { J_GOI3_BASE } from "./data/j-ja-3-goi";
import { J_GOI3_J_DARK } from "./data/j-ja-3-goi.j-dark";
import { J_GOI3_J_KISAKU } from "./data/j-ja-3-goi.j-kisaku";
import { J_CHUBU_BASE } from "./data/j-soc-geo-chubu";
import { J_CHUBU_J_DARK } from "./data/j-soc-geo-chubu.j-dark";
import { J_CHUBU_J_KISAKU } from "./data/j-soc-geo-chubu.j-kisaku";
import { J_CHOBUN3_BASE } from "./data/j-en-3-chobun";
import { J_CHOBUN3_J_DARK } from "./data/j-en-3-chobun.j-dark";
import { J_CHOBUN3_J_KISAKU } from "./data/j-en-3-chobun.j-kisaku";
import { H_KUNDOKU_BASE } from "./data/h-jpn-bunka-kundoku";
import { H_KUNDOKU_H_CHARISMA } from "./data/h-jpn-bunka-kundoku.h-charisma";
import { H_KUNDOKU_H_KYOJU } from "./data/h-jpn-bunka-kundoku.h-kyoju";
import { H_KUNDOKU_H_NEKKETSU } from "./data/h-jpn-bunka-kundoku.h-nekketsu";
import { H_KOFUN_BASE } from "./data/h-hist-jp-kofun";
import { H_KOFUN_H_CHARISMA } from "./data/h-hist-jp-kofun.h-charisma";
import { H_KOFUN_H_KYOJU } from "./data/h-hist-jp-kofun.h-kyoju";
import { H_KOFUN_H_NEKKETSU } from "./data/h-hist-jp-kofun.h-nekketsu";
import { H_MEISHI_BASE } from "./data/h-eng-gram-meishi";
import { H_MEISHI_H_CHARISMA } from "./data/h-eng-gram-meishi.h-charisma";
import { H_MEISHI_H_KYOJU } from "./data/h-eng-gram-meishi.h-kyoju";
import { H_MEISHI_H_NEKKETSU } from "./data/h-eng-gram-meishi.h-nekketsu";
import { E_JOHO_BASE } from "./data/e-social-5-joho";
import { E_JOHO_E_POP } from "./data/e-social-5-joho.e-pop";
import { E_JOHO_E_YASASHI } from "./data/e-social-5-joho.e-yasashi";
import { E_BUN_KUMITATE4_BASE } from "./data/e-japanese-4-bun-kumitate";
import { E_BUN_KUMITATE4_E_POP } from "./data/e-japanese-4-bun-kumitate.e-pop";
import { E_BUN_KUMITATE4_E_YASASHI } from "./data/e-japanese-4-bun-kumitate.e-yasashi";
import { E_MICHI_BASE } from "./data/e-english-34-michi";
import { E_MICHI_E_POP } from "./data/e-english-34-michi.e-pop";
import { E_MICHI_E_YASASHI } from "./data/e-english-34-michi.e-yasashi";
import { J_HAIKU3_BASE } from "./data/j-ja-3-haiku";
import { J_HAIKU3_J_DARK } from "./data/j-ja-3-haiku.j-dark";
import { J_HAIKU3_J_KISAKU } from "./data/j-ja-3-haiku.j-kisaku";
import { J_KITAI_BASE } from "./data/j-sci-1-kitai";
import { J_KITAI_J_DARK } from "./data/j-sci-1-kitai.j-dark";
import { J_KITAI_J_KISAKU } from "./data/j-sci-1-kitai.j-kisaku";
import { J_CHUGOKU_SHIKOKU_BASE } from "./data/j-soc-geo-chugoku-shikoku";
import { J_CHUGOKU_SHIKOKU_J_DARK } from "./data/j-soc-geo-chugoku-shikoku.j-dark";
import { J_CHUGOKU_SHIKOKU_J_KISAKU } from "./data/j-soc-geo-chugoku-shikoku.j-kisaku";
import { H_RINRI_CHINA_BASE } from "./data/h-civ-rinri-china";
import { H_RINRI_CHINA_H_CHARISMA } from "./data/h-civ-rinri-china.h-charisma";
import { H_RINRI_CHINA_H_KYOJU } from "./data/h-civ-rinri-china.h-kyoju";
import { H_RINRI_CHINA_H_NEKKETSU } from "./data/h-civ-rinri-china.h-nekketsu";
import { H_TANKYU_HIGASHIASIA_BASE } from "./data/h-geo-tankyu-higashiasia";
import { H_TANKYU_HIGASHIASIA_H_CHARISMA } from "./data/h-geo-tankyu-higashiasia.h-charisma";
import { H_TANKYU_HIGASHIASIA_H_KYOJU } from "./data/h-geo-tankyu-higashiasia.h-kyoju";
import { H_TANKYU_HIGASHIASIA_H_NEKKETSU } from "./data/h-geo-tankyu-higashiasia.h-nekketsu";
import { H_SAIDOKU_BASE } from "./data/h-jpn-bunka-saidoku";
import { H_SAIDOKU_H_CHARISMA } from "./data/h-jpn-bunka-saidoku.h-charisma";
import { H_SAIDOKU_H_KYOJU } from "./data/h-jpn-bunka-saidoku.h-kyoju";
import { H_SAIDOKU_H_NEKKETSU } from "./data/h-jpn-bunka-saidoku.h-nekketsu";
import { E_KUKI_MIZU_BASE } from "./data/e-science-4-kuki-mizu";
import { E_KUKI_MIZU_E_POP } from "./data/e-science-4-kuki-mizu.e-pop";
import { E_KUKI_MIZU_E_YASASHI } from "./data/e-science-4-kuki-mizu.e-yasashi";
import { E_KIKO_BASE } from "./data/e-social-5-kiko";
import { E_KIKO_E_POP } from "./data/e-social-5-kiko.e-pop";
import { E_KIKO_E_YASASHI } from "./data/e-social-5-kiko.e-yasashi";
import { E_DOUON4_BASE } from "./data/e-japanese-4-douon";
import { E_DOUON4_E_POP } from "./data/e-japanese-4-douon.e-pop";
import { E_DOUON4_E_YASASHI } from "./data/e-japanese-4-douon.e-yasashi";
import { J_HANASU3_BASE } from "./data/j-ja-3-hanasu";
import { J_HANASU3_J_DARK } from "./data/j-ja-3-hanasu.j-dark";
import { J_HANASU3_J_KISAKU } from "./data/j-ja-3-hanasu.j-kisaku";
import { J_EISAKUBUN3_BASE } from "./data/j-en-3-eisakubun";
import { J_EISAKUBUN3_J_DARK } from "./data/j-en-3-eisakubun.j-dark";
import { J_EISAKUBUN3_J_KISAKU } from "./data/j-en-3-eisakubun.j-kisaku";
import { J_OTO_BASE } from "./data/j-sci-1-oto";
import { J_OTO_J_DARK } from "./data/j-sci-1-oto.j-dark";
import { J_OTO_J_KISAKU } from "./data/j-sci-1-oto.j-kisaku";
import { H_MUROMACHI_BASE } from "./data/h-hist-jp-muromachi";
import { H_MUROMACHI_H_CHARISMA } from "./data/h-hist-jp-muromachi.h-charisma";
import { H_MUROMACHI_H_KYOJU } from "./data/h-hist-jp-muromachi.h-kyoju";
import { H_MUROMACHI_H_NEKKETSU } from "./data/h-hist-jp-muromachi.h-nekketsu";
import { H_SETSUZOKUSHI_BASE } from "./data/h-eng-gram-setsuzokushi";
import { H_SETSUZOKUSHI_H_CHARISMA } from "./data/h-eng-gram-setsuzokushi.h-charisma";
import { H_SETSUZOKUSHI_H_KYOJU } from "./data/h-eng-gram-setsuzokushi.h-kyoju";
import { H_SETSUZOKUSHI_H_NEKKETSU } from "./data/h-eng-gram-setsuzokushi.h-nekketsu";
import { H_RINRI_CHRIST_BASE } from "./data/h-civ-rinri-christ";
import { H_RINRI_CHRIST_H_CHARISMA } from "./data/h-civ-rinri-christ.h-charisma";
import { H_RINRI_CHRIST_H_KYOJU } from "./data/h-civ-rinri-christ.h-kyoju";
import { H_RINRI_CHRIST_H_NEKKETSU } from "./data/h-civ-rinri-christ.h-nekketsu";
import { E_SUKI_BASE } from "./data/e-english-34-suki";
import { E_SUKI_E_POP } from "./data/e-english-34-suki.e-pop";
import { E_SUKI_E_YASASHI } from "./data/e-english-34-suki.e-yasashi";
import { E_ONDO_BASE } from "./data/e-science-4-ondo";
import { E_ONDO_E_POP } from "./data/e-science-4-ondo.e-pop";
import { E_ONDO_E_YASASHI } from "./data/e-science-4-ondo.e-yasashi";
import { E_KOGAI_BASE } from "./data/e-social-5-kogai";
import { E_KOGAI_E_POP } from "./data/e-social-5-kogai.e-pop";
import { E_KOGAI_E_YASASHI } from "./data/e-social-5-kogai.e-yasashi";
import { J_HIHYO3_BASE } from "./data/j-ja-3-hihyo";
import { J_HIHYO3_J_DARK } from "./data/j-ja-3-hihyo.j-dark";
import { J_HIHYO3_J_KISAKU } from "./data/j-ja-3-hihyo.j-kisaku";
import { J_HOKKAIDO_BASE } from "./data/j-soc-geo-hokkaido";
import { J_HOKKAIDO_J_DARK } from "./data/j-soc-geo-hokkaido.j-dark";
import { J_HOKKAIDO_J_KISAKU } from "./data/j-soc-geo-hokkaido.j-kisaku";
import { J_FUTEISHI3_BASE } from "./data/j-en-3-futeishi";
import { J_FUTEISHI3_J_DARK } from "./data/j-en-3-futeishi.j-dark";
import { J_FUTEISHI3_J_KISAKU } from "./data/j-en-3-futeishi.j-kisaku";
import { H_TANKYU_JINKO_BASE } from "./data/h-geo-tankyu-jinko";
import { H_TANKYU_JINKO_H_CHARISMA } from "./data/h-geo-tankyu-jinko.h-charisma";
import { H_TANKYU_JINKO_H_KYOJU } from "./data/h-geo-tankyu-jinko.h-kyoju";
import { H_TANKYU_JINKO_H_NEKKETSU } from "./data/h-geo-tankyu-jinko.h-nekketsu";
import { H_SHIIKA_BASE } from "./data/h-jpn-bunka-shiika";
import { H_SHIIKA_H_CHARISMA } from "./data/h-jpn-bunka-shiika.h-charisma";
import { H_SHIIKA_H_KYOJU } from "./data/h-jpn-bunka-shiika.h-kyoju";
import { H_SHIIKA_H_NEKKETSU } from "./data/h-jpn-bunka-shiika.h-nekketsu";
import { H_NARA_BASE } from "./data/h-hist-jp-nara";
import { H_NARA_H_CHARISMA } from "./data/h-hist-jp-nara.h-charisma";
import { H_NARA_H_KYOJU } from "./data/h-hist-jp-nara.h-kyoju";
import { H_NARA_H_NEKKETSU } from "./data/h-hist-jp-nara.h-nekketsu";
import { E_IKEN4_BASE } from "./data/e-japanese-4-iken";
import { E_IKEN4_E_POP } from "./data/e-japanese-4-iken.e-pop";
import { E_IKEN4_E_YASASHI } from "./data/e-japanese-4-iken.e-yasashi";
import { E_YOUBI_TENKI_BASE } from "./data/e-english-34-youbi-tenki";
import { E_YOUBI_TENKI_E_POP } from "./data/e-english-34-youbi-tenki.e-pop";
import { E_YOUBI_TENKI_E_YASASHI } from "./data/e-english-34-youbi-tenki.e-yasashi";
import { E_SUGATA_BASE } from "./data/e-science-4-sugata";
import { E_SUGATA_E_POP } from "./data/e-science-4-sugata.e-pop";
import { E_SUGATA_E_YASASHI } from "./data/e-science-4-sugata.e-yasashi";
import { J_KANBUN3_BASE } from "./data/j-ja-3-kanbun";
import { J_KANBUN3_J_DARK } from "./data/j-ja-3-kanbun.j-dark";
import { J_KANBUN3_J_KISAKU } from "./data/j-ja-3-kanbun.j-kisaku";
import { J_SHOKUBUTSU_BUNRUI_BASE } from "./data/j-sci-1-shokubutsu-bunrui";
import { J_SHOKUBUTSU_BUNRUI_J_DARK } from "./data/j-sci-1-shokubutsu-bunrui.j-dark";
import { J_SHOKUBUTSU_BUNRUI_J_KISAKU } from "./data/j-sci-1-shokubutsu-bunrui.j-kisaku";
import { J_KANTO_BASE } from "./data/j-soc-geo-kanto";
import { J_KANTO_J_DARK } from "./data/j-soc-geo-kanto.j-dark";
import { J_KANTO_J_KISAKU } from "./data/j-soc-geo-kanto.j-kisaku";
import { H_TOKUSHU_BASE } from "./data/h-eng-gram-tokushu";
import { H_TOKUSHU_H_CHARISMA } from "./data/h-eng-gram-tokushu.h-charisma";
import { H_TOKUSHU_H_KYOJU } from "./data/h-eng-gram-tokushu.h-kyoju";
import { H_TOKUSHU_H_NEKKETSU } from "./data/h-eng-gram-tokushu.h-nekketsu";
import { H_RINRI_GENDAI_BASE } from "./data/h-civ-rinri-gendai";
import { H_RINRI_GENDAI_H_CHARISMA } from "./data/h-civ-rinri-gendai.h-charisma";
import { H_RINRI_GENDAI_H_KYOJU } from "./data/h-civ-rinri-gendai.h-kyoju";
import { H_RINRI_GENDAI_H_NEKKETSU } from "./data/h-civ-rinri-gendai.h-nekketsu";
import { H_TANKYU_KIKO_BASE } from "./data/h-geo-tankyu-kiko";
import { H_TANKYU_KIKO_H_CHARISMA } from "./data/h-geo-tankyu-kiko.h-charisma";
import { H_TANKYU_KIKO_H_KYOJU } from "./data/h-geo-tankyu-kiko.h-kyoju";
import { H_TANKYU_KIKO_H_NEKKETSU } from "./data/h-geo-tankyu-kiko.h-nekketsu";
import { E_KURASHI5_BASE } from "./data/e-social-5-kurashi";
import { E_KURASHI5_E_POP } from "./data/e-social-5-kurashi.e-pop";
import { E_KURASHI5_E_YASASHI } from "./data/e-social-5-kurashi.e-yasashi";
import { E_KANJI4_BASE } from "./data/e-japanese-4-kanji";
import { E_KANJI4_E_POP } from "./data/e-japanese-4-kanji.e-pop";
import { E_KANJI4_E_YASASHI } from "./data/e-japanese-4-kanji.e-yasashi";
import { E_TENKI4_BASE } from "./data/e-science-4-tenki";
import { E_TENKI4_E_POP } from "./data/e-science-4-tenki.e-pop";
import { E_TENKI4_E_YASASHI } from "./data/e-science-4-tenki.e-yasashi";
import { J_KANJI3_BASE } from "./data/j-ja-3-kanji";
import { J_KANJI3_J_DARK } from "./data/j-ja-3-kanji.j-dark";
import { J_KANJI3_J_KISAKU } from "./data/j-ja-3-kanji.j-kisaku";
import { J_KANRYO_SHINKO_BASE } from "./data/j-en-3-kanryo-shinko";
import { J_KANRYO_SHINKO_J_DARK } from "./data/j-en-3-kanryo-shinko.j-dark";
import { J_KANRYO_SHINKO_J_KISAKU } from "./data/j-en-3-kanryo-shinko.j-kisaku";
import { J_SUIYOEKI_BASE } from "./data/j-sci-1-suiyoeki";
import { J_SUIYOEKI_J_DARK } from "./data/j-sci-1-suiyoeki.j-dark";
import { J_SUIYOEKI_J_KISAKU } from "./data/j-sci-1-suiyoeki.j-kisaku";
import { H_YOGEN_BASE } from "./data/h-jpn-bunka-yogen";
import { H_YOGEN_H_CHARISMA } from "./data/h-jpn-bunka-yogen.h-charisma";
import { H_YOGEN_H_KYOJU } from "./data/h-jpn-bunka-yogen.h-kyoju";
import { H_YOGEN_H_NEKKETSU } from "./data/h-jpn-bunka-yogen.h-nekketsu";
import { H_NICHIRO_BASE } from "./data/h-hist-jp-nichiro";
import { H_NICHIRO_H_CHARISMA } from "./data/h-hist-jp-nichiro.h-charisma";
import { H_NICHIRO_H_KYOJU } from "./data/h-hist-jp-nichiro.h-kyoju";
import { H_NICHIRO_H_NEKKETSU } from "./data/h-hist-jp-nichiro.h-nekketsu";
import { H_WAHO_BASE } from "./data/h-eng-gram-waho";
import { H_WAHO_H_CHARISMA } from "./data/h-eng-gram-waho.h-charisma";
import { H_WAHO_H_KYOJU } from "./data/h-eng-gram-waho.h-kyoju";
import { H_WAHO_H_NEKKETSU } from "./data/h-eng-gram-waho.h-nekketsu";
import { E_SEKAI5_BASE } from "./data/e-social-5-sekai";
import { E_SEKAI5_E_POP } from "./data/e-social-5-sekai.e-pop";
import { E_SEKAI5_E_YASASHI } from "./data/e-social-5-sekai.e-yasashi";
import { E_KANJI_JITEN_BASE } from "./data/e-japanese-4-kanji-jiten";
import { E_KANJI_JITEN_E_POP } from "./data/e-japanese-4-kanji-jiten.e-pop";
import { E_KANJI_JITEN_E_YASASHI } from "./data/e-japanese-4-kanji-jiten.e-yasashi";
import { E_YUKUE_BASE } from "./data/e-science-4-yukue";
import { E_YUKUE_E_POP } from "./data/e-science-4-yukue.e-pop";
import { E_YUKUE_E_YASASHI } from "./data/e-science-4-yukue.e-yasashi";
import { J_KOBUN3_BASE } from "./data/j-ja-3-kobun";
import { J_KOBUN3_J_DARK } from "./data/j-ja-3-kobun.j-dark";
import { J_KOBUN3_J_KISAKU } from "./data/j-ja-3-kobun.j-kisaku";
import { J_KINKI_BASE } from "./data/j-soc-geo-kinki";
import { J_KINKI_J_DARK } from "./data/j-soc-geo-kinki.j-dark";
import { J_KINKI_J_KISAKU } from "./data/j-soc-geo-kinki.j-kisaku";
import { J_KANSETSU_BASE } from "./data/j-en-3-kansetsu";
import { J_KANSETSU_J_DARK } from "./data/j-en-3-kansetsu.j-dark";
import { J_KANSETSU_J_KISAKU } from "./data/j-en-3-kansetsu.j-kisaku";
import { H_RINRI_GREECE_BASE } from "./data/h-civ-rinri-greece";
import { H_RINRI_GREECE_H_CHARISMA } from "./data/h-civ-rinri-greece.h-charisma";
import { H_RINRI_GREECE_H_KYOJU } from "./data/h-civ-rinri-greece.h-kyoju";
import { H_RINRI_GREECE_H_NEKKETSU } from "./data/h-civ-rinri-greece.h-nekketsu";
import { H_TANKYU_KOGYO_BASE } from "./data/h-geo-tankyu-kogyo";
import { H_TANKYU_KOGYO_H_CHARISMA } from "./data/h-geo-tankyu-kogyo.h-charisma";
import { H_TANKYU_KOGYO_H_KYOJU } from "./data/h-geo-tankyu-kogyo.h-kyoju";
import { H_TANKYU_KOGYO_H_NEKKETSU } from "./data/h-geo-tankyu-kogyo.h-nekketsu";
import { H_GEN_GOI_BASE } from "./data/h-jpn-gen-goi";
import { H_GEN_GOI_H_CHARISMA } from "./data/h-jpn-gen-goi.h-charisma";
import { H_GEN_GOI_H_KYOJU } from "./data/h-jpn-gen-goi.h-kyoju";
import { H_GEN_GOI_H_NEKKETSU } from "./data/h-jpn-gen-goi.h-nekketsu";
import { E_SHINRIN_BASE } from "./data/e-social-5-shinrin";
import { E_SHINRIN_E_POP } from "./data/e-social-5-shinrin.e-pop";
import { E_SHINRIN_E_YASASHI } from "./data/e-social-5-shinrin.e-yasashi";
import { E_KANYOKU_BASE } from "./data/e-japanese-4-kanyoku";
import { E_KANYOKU_E_POP } from "./data/e-japanese-4-kanyoku.e-pop";
import { E_KANYOKU_E_YASASHI } from "./data/e-japanese-4-kanyoku.e-yasashi";
import { E_DENKI3_BASE } from "./data/e-science-3-denki";
import { E_DENKI3_E_POP } from "./data/e-science-3-denki.e-pop";
import { E_DENKI3_E_YASASHI } from "./data/e-science-3-denki.e-yasashi";
import { J_RONSETSU3_BASE } from "./data/j-ja-3-ronsetsu";
import { J_RONSETSU3_J_DARK } from "./data/j-ja-3-ronsetsu.j-dark";
import { J_RONSETSU3_J_KISAKU } from "./data/j-ja-3-ronsetsu.j-kisaku";
import { J_GENSHI2_BASE } from "./data/j-sci-2-genshi";
import { J_GENSHI2_J_DARK } from "./data/j-sci-2-genshi.j-dark";
import { J_GENSHI2_J_KISAKU } from "./data/j-sci-2-genshi.j-kisaku";
import { J_KYUSHU_BASE } from "./data/j-soc-geo-kyushu";
import { J_KYUSHU_J_DARK } from "./data/j-soc-geo-kyushu.j-dark";
import { J_KYUSHU_J_KISAKU } from "./data/j-soc-geo-kyushu.j-kisaku";
import { H_SENRYO_BASE } from "./data/h-hist-jp-senryo";
import { H_SENRYO_H_CHARISMA } from "./data/h-hist-jp-senryo.h-charisma";
import { H_SENRYO_H_KYOJU } from "./data/h-hist-jp-senryo.h-kyoju";
import { H_SENRYO_H_NEKKETSU } from "./data/h-hist-jp-senryo.h-nekketsu";
import { H_ZENCHISHI_BASE } from "./data/h-eng-gram-zenchishi";
import { H_ZENCHISHI_H_CHARISMA } from "./data/h-eng-gram-zenchishi.h-charisma";
import { H_ZENCHISHI_H_KYOJU } from "./data/h-eng-gram-zenchishi.h-kyoju";
import { H_ZENCHISHI_H_NEKKETSU } from "./data/h-eng-gram-zenchishi.h-nekketsu";
import { H_RINRI_ISLAM_BASE } from "./data/h-civ-rinri-islam";
import { H_RINRI_ISLAM_H_CHARISMA } from "./data/h-civ-rinri-islam.h-charisma";
import { H_RINRI_ISLAM_H_KYOJU } from "./data/h-civ-rinri-islam.h-kyoju";
import { H_RINRI_ISLAM_H_NEKKETSU } from "./data/h-civ-rinri-islam.h-nekketsu";
import { E_SUISAN5_BASE } from "./data/e-social-5-suisan";
import { E_SUISAN5_E_POP } from "./data/e-social-5-suisan.e-pop";
import { E_SUISAN5_E_YASASHI } from "./data/e-social-5-suisan.e-yasashi";
import { E_KOJI4_BASE } from "./data/e-japanese-4-koji";
import { E_KOJI4_E_POP } from "./data/e-japanese-4-koji.e-pop";
import { E_KOJI4_E_YASASHI } from "./data/e-japanese-4-koji.e-yasashi";
import { E_HIKARI3_BASE } from "./data/e-science-3-hikari";
import { E_HIKARI3_E_POP } from "./data/e-science-3-hikari.e-pop";
import { E_HIKARI3_E_YASASHI } from "./data/e-science-3-hikari.e-yasashi";
import { J_SHOSETSU3_BASE } from "./data/j-ja-3-shosetsu";
import { J_SHOSETSU3_J_DARK } from "./data/j-ja-3-shosetsu.j-dark";
import { J_SHOSETSU3_J_KISAKU } from "./data/j-ja-3-shosetsu.j-kisaku";
import { J_KATEI_BASE } from "./data/j-en-3-katei";
import { J_KATEI_J_DARK } from "./data/j-en-3-katei.j-dark";
import { J_KATEI_J_KISAKU } from "./data/j-en-3-katei.j-kisaku";
import { J_HAKOHIGE_BASE } from "./data/j-math-2-hakohige";
import { J_HAKOHIGE_J_DARK } from "./data/j-math-2-hakohige.j-dark";
import { J_HAKOHIGE_J_KISAKU } from "./data/j-math-2-hakohige.j-kisaku";
import { H_KOKKA_BASE } from "./data/h-geo-tankyu-kokka";
import { H_KOKKA_H_CHARISMA } from "./data/h-geo-tankyu-kokka.h-charisma";
import { H_KOKKA_H_KYOJU } from "./data/h-geo-tankyu-kokka.h-kyoju";
import { H_KOKKA_H_NEKKETSU } from "./data/h-geo-tankyu-kokka.h-nekketsu";
import { H_HANASU_BASE } from "./data/h-jpn-gen-hanasu";
import { H_HANASU_H_CHARISMA } from "./data/h-jpn-gen-hanasu.h-charisma";
import { H_HANASU_H_KYOJU } from "./data/h-jpn-gen-hanasu.h-kyoju";
import { H_HANASU_H_NEKKETSU } from "./data/h-jpn-gen-hanasu.h-nekketsu";
import { H_SENSO_BASE } from "./data/h-hist-jp-senso";
import { H_SENSO_H_CHARISMA } from "./data/h-hist-jp-senso.h-charisma";
import { H_SENSO_H_KYOJU } from "./data/h-hist-jp-senso.h-kyoju";
import { H_SENSO_H_NEKKETSU } from "./data/h-hist-jp-senso.h-nekketsu";
import { E_DENTO4_BASE } from "./data/e-social-4-dento";
import { E_DENTO4_E_POP } from "./data/e-social-4-dento.e-pop";
import { E_DENTO4_E_YASASHI } from "./data/e-social-4-dento.e-yasashi";
import { E_MONOGATARI4_BASE } from "./data/e-japanese-4-monogatari";
import { E_MONOGATARI4_E_POP } from "./data/e-japanese-4-monogatari.e-pop";
import { E_MONOGATARI4_E_YASASHI } from "./data/e-japanese-4-monogatari.e-yasashi";
import { E_JISHAKU3_BASE } from "./data/e-science-3-jishaku";
import { E_JISHAKU3_E_POP } from "./data/e-science-3-jishaku.e-pop";
import { E_JISHAKU3_E_YASASHI } from "./data/e-science-3-jishaku.e-yasashi";
import { J_NIHON_KISHO_BASE } from "./data/j-sci-2-nihon-kisho";
import { J_NIHON_KISHO_J_DARK } from "./data/j-sci-2-nihon-kisho.j-dark";
import { J_NIHON_KISHO_J_KISAKU } from "./data/j-sci-2-nihon-kisho.j-kisaku";
import { J_NIHON_TOKUSHOKU_BASE } from "./data/j-soc-geo-nihon-tokushoku";
import { J_NIHON_TOKUSHOKU_J_DARK } from "./data/j-soc-geo-nihon-tokushoku.j-dark";
import { J_NIHON_TOKUSHOKU_J_KISAKU } from "./data/j-soc-geo-nihon-tokushoku.j-kisaku";
import { J_LISTENING3_BASE } from "./data/j-en-3-listening";
import { J_LISTENING3_J_DARK } from "./data/j-en-3-listening.j-dark";
import { J_LISTENING3_J_KISAKU } from "./data/j-en-3-listening.j-kisaku";
import { H_CHOBUN_BASE } from "./data/h-eng-skill-chobun";
import { H_CHOBUN_H_CHARISMA } from "./data/h-eng-skill-chobun.h-charisma";
import { H_CHOBUN_H_KYOJU } from "./data/h-eng-skill-chobun.h-kyoju";
import { H_CHOBUN_H_NEKKETSU } from "./data/h-eng-skill-chobun.h-nekketsu";
import { H_RINRI_JITSUZON_BASE } from "./data/h-civ-rinri-jitsuzon";
import { H_RINRI_JITSUZON_H_CHARISMA } from "./data/h-civ-rinri-jitsuzon.h-charisma";
import { H_RINRI_JITSUZON_H_KYOJU } from "./data/h-civ-rinri-jitsuzon.h-kyoju";
import { H_RINRI_JITSUZON_H_NEKKETSU } from "./data/h-civ-rinri-jitsuzon.h-nekketsu";
import { H_TANKYU_KOTSU_BASE } from "./data/h-geo-tankyu-kotsu";
import { H_TANKYU_KOTSU_H_CHARISMA } from "./data/h-geo-tankyu-kotsu.h-charisma";
import { H_TANKYU_KOTSU_H_KYOJU } from "./data/h-geo-tankyu-kotsu.h-kyoju";
import { H_TANKYU_KOTSU_H_NEKKETSU } from "./data/h-geo-tankyu-kotsu.h-nekketsu";
import { E_GOMI4_BASE } from "./data/e-social-4-gomi";
import { E_GOMI4_E_POP } from "./data/e-social-4-gomi.e-pop";
import { E_GOMI4_E_YASASHI } from "./data/e-social-4-gomi.e-yasashi";
import { E_OKURIGANA4_BASE } from "./data/e-japanese-4-okurigana";
import { E_OKURIGANA4_E_POP } from "./data/e-japanese-4-okurigana.e-pop";
import { E_OKURIGANA4_E_YASASHI } from "./data/e-japanese-4-okurigana.e-yasashi";
import { E_KAZE_GOMU3_BASE } from "./data/e-science-3-kaze-gomu";
import { E_KAZE_GOMU3_E_POP } from "./data/e-science-3-kaze-gomu.e-pop";
import { E_KAZE_GOMU3_E_YASASHI } from "./data/e-science-3-kaze-gomu.e-yasashi";
import { J_HEIKO_GODO_BASE } from "./data/j-math-2-heiko-godo";
import { J_HEIKO_GODO_J_DARK } from "./data/j-math-2-heiko-godo.j-dark";
import { J_HEIKO_GODO_J_KISAKU } from "./data/j-math-2-heiko-godo.j-kisaku";
import { J_SHIGEKI_BASE } from "./data/j-sci-2-shigeki";
import { J_SHIGEKI_J_DARK } from "./data/j-sci-2-shigeki.j-dark";
import { J_SHIGEKI_J_KISAKU } from "./data/j-sci-2-shigeki.j-kisaku";
import { J_NORTH_AMERICA_BASE } from "./data/j-soc-geo-north-america";
import { J_NORTH_AMERICA_J_DARK } from "./data/j-soc-geo-north-america.j-dark";
import { J_NORTH_AMERICA_J_KISAKU } from "./data/j-soc-geo-north-america.j-kisaku";
import { H_HOKOKU_BASE } from "./data/h-jpn-gen-hokoku";
import { H_HOKOKU_H_CHARISMA } from "./data/h-jpn-gen-hokoku.h-charisma";
import { H_HOKOKU_H_KYOJU } from "./data/h-jpn-gen-hokoku.h-kyoju";
import { H_HOKOKU_H_NEKKETSU } from "./data/h-jpn-gen-hokoku.h-nekketsu";
import { H_SHOKUHO_BASE } from "./data/h-hist-jp-shokuho";
import { H_SHOKUHO_H_CHARISMA } from "./data/h-hist-jp-shokuho.h-charisma";
import { H_SHOKUHO_H_KYOJU } from "./data/h-hist-jp-shokuho.h-kyoju";
import { H_SHOKUHO_H_NEKKETSU } from "./data/h-hist-jp-shokuho.h-nekketsu";
import { H_JIYU_BASE } from "./data/h-eng-skill-jiyu";
import { H_JIYU_H_CHARISMA } from "./data/h-eng-skill-jiyu.h-charisma";
import { H_JIYU_H_KYOJU } from "./data/h-eng-skill-jiyu.h-kyoju";
import { H_JIYU_H_NEKKETSU } from "./data/h-eng-skill-jiyu.h-nekketsu";
import { E_KEN4_BASE } from "./data/e-social-4-ken";
import { E_KEN4_E_POP } from "./data/e-social-4-ken.e-pop";
import { E_KEN4_E_YASASHI } from "./data/e-social-4-ken.e-yasashi";
import { E_SETSUMEI4_BASE } from "./data/e-japanese-4-setsumei";
import { E_SETSUMEI4_E_POP } from "./data/e-japanese-4-setsumei.e-pop";
import { E_SETSUMEI4_E_YASASHI } from "./data/e-japanese-4-setsumei.e-yasashi";
import { E_KONCHU3_BASE } from "./data/e-science-3-konchu";
import { E_KONCHU3_E_POP } from "./data/e-science-3-konchu.e-pop";
import { E_KONCHU3_E_YASASHI } from "./data/e-science-3-konchu.e-yasashi";
import { J_TANGO3_BASE } from "./data/j-en-3-tango";
import { J_TANGO3_J_DARK } from "./data/j-en-3-tango.j-dark";
import { J_TANGO3_J_KISAKU } from "./data/j-en-3-tango.j-kisaku";
import { J_RENRITSU_BASE } from "./data/j-math-2-renritsu";
import { J_RENRITSU_J_DARK } from "./data/j-math-2-renritsu.j-dark";
import { J_RENRITSU_J_KISAKU } from "./data/j-math-2-renritsu.j-kisaku";
import { J_SHITSURYO_BASE } from "./data/j-sci-2-shitsuryo";
import { J_SHITSURYO_J_DARK } from "./data/j-sci-2-shitsuryo.j-dark";
import { J_SHITSURYO_J_KISAKU } from "./data/j-sci-2-shitsuryo.j-kisaku";
import { H_RINRI_JOHO_BASE } from "./data/h-civ-rinri-joho";
import { H_RINRI_JOHO_H_CHARISMA } from "./data/h-civ-rinri-joho.h-charisma";
import { H_RINRI_JOHO_H_KYOJU } from "./data/h-civ-rinri-joho.h-kyoju";
import { H_RINRI_JOHO_H_NEKKETSU } from "./data/h-civ-rinri-joho.h-nekketsu";
import { H_TANKYU_MINAMIASIA_BASE } from "./data/h-geo-tankyu-minamiasia";
import { H_TANKYU_MINAMIASIA_H_CHARISMA } from "./data/h-geo-tankyu-minamiasia.h-charisma";
import { H_TANKYU_MINAMIASIA_H_KYOJU } from "./data/h-geo-tankyu-minamiasia.h-kyoju";
import { H_TANKYU_MINAMIASIA_H_NEKKETSU } from "./data/h-geo-tankyu-minamiasia.h-nekketsu";
import { H_GEN_IKEN_BASE } from "./data/h-jpn-gen-iken";
import { H_GEN_IKEN_H_CHARISMA } from "./data/h-jpn-gen-iken.h-charisma";
import { H_GEN_IKEN_H_KYOJU } from "./data/h-jpn-gen-iken.h-kyoju";
import { H_GEN_IKEN_H_NEKKETSU } from "./data/h-jpn-gen-iken.h-nekketsu";
import { E_MIZU4_BASE } from "./data/e-social-4-mizu";
import { E_MIZU4_E_POP } from "./data/e-social-4-mizu.e-pop";
import { E_MIZU4_E_YASASHI } from "./data/e-social-4-mizu.e-yasashi";
import { E_SHI4_BASE } from "./data/e-japanese-4-shi";
import { E_SHI4_E_POP } from "./data/e-japanese-4-shi.e-pop";
import { E_SHI4_E_YASASHI } from "./data/e-japanese-4-shi.e-yasashi";
import { E_OMOSA3_BASE } from "./data/e-science-3-omosa";
import { E_OMOSA3_E_POP } from "./data/e-science-3-omosa.e-pop";
import { E_OMOSA3_E_YASASHI } from "./data/e-science-3-omosa.e-yasashi";
import { J_OCEANIA_BASE } from "./data/j-soc-geo-oceania";
import { J_OCEANIA_J_DARK } from "./data/j-soc-geo-oceania.j-dark";
import { J_OCEANIA_J_KISAKU } from "./data/j-soc-geo-oceania.j-kisaku";
import { J_SANKAKU_SHIKAKU_BASE } from "./data/j-math-2-sankaku-shikaku";
import { J_SANKAKU_SHIKAKU_J_DARK } from "./data/j-math-2-sankaku-shikaku.j-dark";
import { J_SANKAKU_SHIKAKU_J_KISAKU } from "./data/j-math-2-sankaku-shikaku.j-kisaku";
import { J_CHUWA_BASE } from "./data/j-sci-3-chuwa";
import { J_CHUWA_J_DARK } from "./data/j-sci-3-chuwa.j-dark";
import { J_CHUWA_J_KISAKU } from "./data/j-sci-3-chuwa.j-kisaku";
import { H_TAISHO_BASE } from "./data/h-hist-jp-taisho";
import { H_TAISHO_H_CHARISMA } from "./data/h-hist-jp-taisho.h-charisma";
import { H_TAISHO_H_KYOJU } from "./data/h-hist-jp-taisho.h-kyoju";
import { H_TAISHO_H_NEKKETSU } from "./data/h-hist-jp-taisho.h-nekketsu";
import { H_LISTENING_BASE } from "./data/h-eng-skill-listening";
import { H_LISTENING_H_CHARISMA } from "./data/h-eng-skill-listening.h-charisma";
import { H_LISTENING_H_KYOJU } from "./data/h-eng-skill-listening.h-kyoju";
import { H_LISTENING_H_NEKKETSU } from "./data/h-eng-skill-listening.h-nekketsu";
import { H_RINRI_KANKYO_BASE } from "./data/h-civ-rinri-kankyo";
import { H_RINRI_KANKYO_H_CHARISMA } from "./data/h-civ-rinri-kankyo.h-charisma";
import { H_RINRI_KANKYO_H_KYOJU } from "./data/h-civ-rinri-kankyo.h-kyoju";
import { H_RINRI_KANKYO_H_NEKKETSU } from "./data/h-civ-rinri-kankyo.h-nekketsu";
import { E_SAIGAI4_BASE } from "./data/e-social-4-saigai";
import { E_SAIGAI4_E_POP } from "./data/e-social-4-saigai.e-pop";
import { E_SAIGAI4_E_YASASHI } from "./data/e-social-4-saigai.e-yasashi";
import { E_SHINBUN4_BASE } from "./data/e-japanese-4-shinbun";
import { E_SHINBUN4_E_POP } from "./data/e-japanese-4-shinbun.e-pop";
import { E_SHINBUN4_E_YASASHI } from "./data/e-japanese-4-shinbun.e-yasashi";
import { E_OTO3_BASE } from "./data/e-science-3-oto";
import { E_OTO3_E_POP } from "./data/e-science-3-oto.e-pop";
import { E_OTO3_E_YASASHI } from "./data/e-science-3-oto.e-yasashi";
import { J_SEIKATSU_BASE } from "./data/j-soc-geo-seikatsu";
import { J_SEIKATSU_J_DARK } from "./data/j-soc-geo-seikatsu.j-dark";
import { J_SEIKATSU_J_KISAKU } from "./data/j-soc-geo-seikatsu.j-kisaku";
import { J_SHIKI_BASE } from "./data/j-math-2-shiki";
import { J_SHIKI_J_DARK } from "./data/j-math-2-shiki.j-dark";
import { J_SHIKI_J_KISAKU } from "./data/j-math-2-shiki.j-kisaku";
import { J_DENCHI_BASE } from "./data/j-sci-3-denchi";
import { J_DENCHI_J_DARK } from "./data/j-sci-3-denchi.j-dark";
import { J_DENCHI_J_KISAKU } from "./data/j-sci-3-denchi.j-kisaku";
import { H_MINZOKU_BASE } from "./data/h-geo-tankyu-minzoku";
import { H_MINZOKU_H_CHARISMA } from "./data/h-geo-tankyu-minzoku.h-charisma";
import { H_MINZOKU_H_KYOJU } from "./data/h-geo-tankyu-minzoku.h-kyoju";
import { H_MINZOKU_H_NEKKETSU } from "./data/h-geo-tankyu-minzoku.h-nekketsu";
import { H_GEN_JITSUYO_BASE } from "./data/h-jpn-gen-jitsuyo";
import { H_GEN_JITSUYO_H_CHARISMA } from "./data/h-jpn-gen-jitsuyo.h-charisma";
import { H_GEN_JITSUYO_H_KYOJU } from "./data/h-jpn-gen-jitsuyo.h-kyoju";
import { H_GEN_JITSUYO_H_NEKKETSU } from "./data/h-jpn-gen-jitsuyo.h-nekketsu";
import { H_SOGO_18C_BASE } from "./data/h-hist-sogo-18c";
import { H_SOGO_18C_H_CHARISMA } from "./data/h-hist-sogo-18c.h-charisma";
import { H_SOGO_18C_H_KYOJU } from "./data/h-hist-sogo-18c.h-kyoju";
import { H_SOGO_18C_H_NEKKETSU } from "./data/h-hist-sogo-18c.h-nekketsu";
import { E_SENJIN4_BASE } from "./data/e-social-4-senjin";
import { E_SENJIN4_E_POP } from "./data/e-social-4-senjin.e-pop";
import { E_SENJIN4_E_YASASHI } from "./data/e-social-4-senjin.e-yasashi";
import { E_TANKA4_BASE } from "./data/e-japanese-4-tanka";
import { E_TANKA4_E_POP } from "./data/e-japanese-4-tanka.e-pop";
import { E_TANKA4_E_YASASHI } from "./data/e-japanese-4-tanka.e-yasashi";
import { E_SHIZEN3_BASE } from "./data/e-science-3-shizen";
import { E_SHIZEN3_E_POP } from "./data/e-science-3-shizen.e-pop";
import { E_SHIZEN3_E_YASASHI } from "./data/e-science-3-shizen.e-yasashi";
import { J_SEKAI_SUGATA_BASE } from "./data/j-soc-geo-sekai-sugata";
import { J_SEKAI_SUGATA_J_DARK } from "./data/j-soc-geo-sekai-sugata.j-dark";
import { J_SEKAI_SUGATA_J_KISAKU } from "./data/j-soc-geo-sekai-sugata.j-kisaku";
import { J_EN3_BASE } from "./data/j-math-3-en";
import { J_EN3_J_DARK } from "./data/j-math-3-en.j-dark";
import { J_EN3_J_KISAKU } from "./data/j-math-3-en.j-kisaku";
import { J_GORYOKU_BASE } from "./data/j-sci-3-goryoku";
import { J_GORYOKU_J_DARK } from "./data/j-sci-3-goryoku.j-dark";
import { J_GORYOKU_J_KISAKU } from "./data/j-sci-3-goryoku.j-kisaku";
import { H_SPEAKING_BASE } from "./data/h-eng-skill-speaking";
import { H_SPEAKING_H_CHARISMA } from "./data/h-eng-skill-speaking.h-charisma";
import { H_SPEAKING_H_KYOJU } from "./data/h-eng-skill-speaking.h-kyoju";
import { H_SPEAKING_H_NEKKETSU } from "./data/h-eng-skill-speaking.h-nekketsu";
import { H_RINRI_KANT_BASE } from "./data/h-civ-rinri-kant";
import { H_RINRI_KANT_H_CHARISMA } from "./data/h-civ-rinri-kant.h-charisma";
import { H_RINRI_KANT_H_KYOJU } from "./data/h-civ-rinri-kant.h-kyoju";
import { H_RINRI_KANT_H_NEKKETSU } from "./data/h-civ-rinri-kant.h-nekketsu";
import { H_TANKYU_NIHON_BASE } from "./data/h-geo-tankyu-nihon";
import { H_TANKYU_NIHON_H_CHARISMA } from "./data/h-geo-tankyu-nihon.h-charisma";
import { H_TANKYU_NIHON_H_KYOJU } from "./data/h-geo-tankyu-nihon.h-kyoju";
import { H_TANKYU_NIHON_H_NEKKETSU } from "./data/h-geo-tankyu-nihon.h-nekketsu";
import { E_TODOFUKEN4_BASE } from "./data/e-social-4-todofuken";
import { E_TODOFUKEN4_E_POP } from "./data/e-social-4-todofuken.e-pop";
import { E_TODOFUKEN4_E_YASASHI } from "./data/e-social-4-todofuken.e-yasashi";
import { E_HAIKU3_BASE } from "./data/e-japanese-3-haiku";
import { E_HAIKU3_E_POP } from "./data/e-japanese-3-haiku.e-pop";
import { E_HAIKU3_E_YASASHI } from "./data/e-japanese-3-haiku.e-yasashi";
import { E_SHOKUBUTSU3_BASE } from "./data/e-science-3-shokubutsu";
import { E_SHOKUBUTSU3_E_POP } from "./data/e-science-3-shokubutsu.e-pop";
import { E_SHOKUBUTSU3_E_YASASHI } from "./data/e-science-3-shokubutsu.e-yasashi";
import { J_SOUTH_AMERICA_BASE } from "./data/j-soc-geo-south-america";
import { J_SOUTH_AMERICA_J_DARK } from "./data/j-soc-geo-south-america.j-dark";
import { J_SOUTH_AMERICA_J_KISAKU } from "./data/j-soc-geo-south-america.j-kisaku";
import { J_HYOHON_BASE } from "./data/j-math-3-hyohon";
import { J_HYOHON_J_DARK } from "./data/j-math-3-hyohon.j-dark";
import { J_HYOHON_J_KISAKU } from "./data/j-math-3-hyohon.j-kisaku";
import { J_IDEN_BASE } from "./data/j-sci-3-iden";
import { J_IDEN_J_DARK } from "./data/j-sci-3-iden.j-dark";
import { J_IDEN_J_KISAKU } from "./data/j-sci-3-iden.j-kisaku";
import { H_KANJI_BASE } from "./data/h-jpn-gen-kanji";
import { H_KANJI_H_CHARISMA } from "./data/h-jpn-gen-kanji.h-charisma";
import { H_KANJI_H_KYOJU } from "./data/h-jpn-gen-kanji.h-kyoju";
import { H_KANJI_H_NEKKETSU } from "./data/h-jpn-gen-kanji.h-nekketsu";
import { H_DATSU_BASE } from "./data/h-hist-sogo-datsu";
import { H_DATSU_H_CHARISMA } from "./data/h-hist-sogo-datsu.h-charisma";
import { H_DATSU_H_KYOJU } from "./data/h-hist-sogo-datsu.h-kyoju";
import { H_DATSU_H_NEKKETSU } from "./data/h-hist-sogo-datsu.h-nekketsu";
import { H_WABUN_BASE } from "./data/h-eng-skill-wabun";
import { H_WABUN_H_CHARISMA } from "./data/h-eng-skill-wabun.h-charisma";
import { H_WABUN_H_KYOJU } from "./data/h-eng-skill-wabun.h-kyoju";
import { H_WABUN_H_NEKKETSU } from "./data/h-eng-skill-wabun.h-nekketsu";
import { E_TOKUSHOKU4_BASE } from "./data/e-social-4-tokushoku";
import { E_TOKUSHOKU4_E_POP } from "./data/e-social-4-tokushoku.e-pop";
import { E_TOKUSHOKU4_E_YASASHI } from "./data/e-social-4-tokushoku.e-yasashi";
import { E_HEN_TSUKURI3_BASE } from "./data/e-japanese-3-hen-tsukuri";
import { E_HEN_TSUKURI3_E_POP } from "./data/e-japanese-3-hen-tsukuri.e-pop";
import { E_HEN_TSUKURI3_E_YASASHI } from "./data/e-japanese-3-hen-tsukuri.e-yasashi";
import { E_TAIYO3_BASE } from "./data/e-science-3-taiyo";
import { E_TAIYO3_E_POP } from "./data/e-science-3-taiyo.e-pop";
import { E_TAIYO3_E_YASASHI } from "./data/e-science-3-taiyo.e-yasashi";
import { J_TOHOKU_BASE } from "./data/j-soc-geo-tohoku";
import { J_TOHOKU_J_DARK } from "./data/j-soc-geo-tohoku.j-dark";
import { J_TOHOKU_J_KISAKU } from "./data/j-soc-geo-tohoku.j-kisaku";
import { J_KANSU_AX2_BASE } from "./data/j-math-3-kansu-ax2";
import { J_KANSU_AX2_J_DARK } from "./data/j-math-3-kansu-ax2.j-dark";
import { J_KANSU_AX2_J_KISAKU } from "./data/j-math-3-kansu-ax2.j-kisaku";
import { J_KAGAKU_GIJUTSU_BASE } from "./data/j-sci-3-kagaku-gijutsu";
import { J_KAGAKU_GIJUTSU_J_DARK } from "./data/j-sci-3-kagaku-gijutsu.j-dark";
import { J_KAGAKU_GIJUTSU_J_KISAKU } from "./data/j-sci-3-kagaku-gijutsu.j-kisaku";
import { H_KEIKEN_BASE } from "./data/h-civ-rinri-keiken";
import { H_KEIKEN_H_CHARISMA } from "./data/h-civ-rinri-keiken.h-charisma";
import { H_KEIKEN_H_KYOJU } from "./data/h-civ-rinri-keiken.h-kyoju";
import { H_KEIKEN_H_NEKKETSU } from "./data/h-civ-rinri-keiken.h-nekketsu";
import { H_NISHIASIA_BASE } from "./data/h-geo-tankyu-nishiasia";
import { H_NISHIASIA_H_CHARISMA } from "./data/h-geo-tankyu-nishiasia.h-charisma";
import { H_NISHIASIA_H_KYOJU } from "./data/h-geo-tankyu-nishiasia.h-kyoju";
import { H_NISHIASIA_H_NEKKETSU } from "./data/h-geo-tankyu-nishiasia.h-nekketsu";
import { H_RONRI_BASE } from "./data/h-jpn-gen-ronri";
import { H_RONRI_H_CHARISMA } from "./data/h-jpn-gen-ronri.h-charisma";
import { H_RONRI_H_KYOJU } from "./data/h-jpn-gen-ronri.h-kyoju";
import { H_RONRI_H_NEKKETSU } from "./data/h-jpn-gen-ronri.h-nekketsu";
import { E_CHIZU3_BASE } from "./data/e-social-3-chizu";
import { E_CHIZU3_E_POP } from "./data/e-social-3-chizu.e-pop";
import { E_CHIZU3_E_YASASHI } from "./data/e-social-3-chizu.e-yasashi";
import { E_HOUKOKU3_BASE } from "./data/e-japanese-3-houkoku";
import { E_HOUKOKU3_E_POP } from "./data/e-japanese-3-houkoku.e-pop";
import { E_HOUKOKU3_E_YASASHI } from "./data/e-japanese-3-houkoku.e-yasashi";
import { E_BUNSU_KAKE6_BASE } from "./data/e-math-6-bunsu-kake";
import { E_BUNSU_KAKE6_E_POP } from "./data/e-math-6-bunsu-kake.e-pop";
import { E_BUNSU_KAKE6_E_YASASHI } from "./data/e-math-6-bunsu-kake.e-yasashi";
import { J_BUNMEI_BASE } from "./data/j-soc-hist-bunmei";
import { J_BUNMEI_J_DARK } from "./data/j-soc-hist-bunmei.j-dark";
import { J_BUNMEI_J_KISAKU } from "./data/j-soc-hist-bunmei.j-kisaku";
import { J_NIJI_HOTEISHIKI_BASE } from "./data/j-math-3-niji-hoteishiki";
import { J_NIJI_HOTEISHIKI_J_DARK } from "./data/j-math-3-niji-hoteishiki.j-dark";
import { J_NIJI_HOTEISHIKI_J_KISAKU } from "./data/j-math-3-niji-hoteishiki.j-kisaku";
import { J_SAIBO_BUNRETSU_BASE } from "./data/j-sci-3-saibo-bunretsu";
import { J_SAIBO_BUNRETSU_J_DARK } from "./data/j-sci-3-saibo-bunretsu.j-dark";
import { J_SAIBO_BUNRETSU_J_KISAKU } from "./data/j-sci-3-saibo-bunretsu.j-kisaku";
import { H_GLOBAL_BASE } from "./data/h-hist-sogo-global";
import { H_GLOBAL_H_CHARISMA } from "./data/h-hist-sogo-global.h-charisma";
import { H_GLOBAL_H_KYOJU } from "./data/h-hist-sogo-global.h-kyoju";
import { H_GLOBAL_H_NEKKETSU } from "./data/h-hist-sogo-global.h-nekketsu";
import { H_VOCAB_BASE } from "./data/h-eng-vocab-2000";
import { H_VOCAB_H_CHARISMA } from "./data/h-eng-vocab-2000.h-charisma";
import { H_VOCAB_H_KYOJU } from "./data/h-eng-vocab-2000.h-kyoju";
import { H_VOCAB_H_NEKKETSU } from "./data/h-eng-vocab-2000.h-nekketsu";
import { H_RINRI_KEIYAKU_BASE } from "./data/h-civ-rinri-keiyaku";
import { H_RINRI_KEIYAKU_H_CHARISMA } from "./data/h-civ-rinri-keiyaku.h-charisma";
import { H_RINRI_KEIYAKU_H_KYOJU } from "./data/h-civ-rinri-keiyaku.h-kyoju";
import { H_RINRI_KEIYAKU_H_NEKKETSU } from "./data/h-civ-rinri-keiyaku.h-nekketsu";
import { E_KEISATSU3_BASE } from "./data/e-social-3-keisatsu";
import { E_KEISATSU3_E_POP } from "./data/e-social-3-keisatsu.e-pop";
import { E_KEISATSU3_E_YASASHI } from "./data/e-social-3-keisatsu.e-yasashi";
import { E_JISHO3_BASE } from "./data/e-japanese-3-jisho";
import { E_JISHO3_E_POP } from "./data/e-japanese-3-jisho.e-pop";
import { E_JISHO3_E_YASASHI } from "./data/e-japanese-3-jisho.e-yasashi";
import { E_KAKUCHU6_BASE } from "./data/e-math-6-kakuchu-taiseki";
import { E_KAKUCHU6_E_POP } from "./data/e-math-6-kakuchu-taiseki.e-pop";
import { E_KAKUCHU6_E_YASASHI } from "./data/e-math-6-kakuchu-taiseki.e-yasashi";
import { J_EDO_TENKAI_BASE } from "./data/j-soc-hist-edo-tenkai";
import { J_EDO_TENKAI_J_DARK } from "./data/j-soc-hist-edo-tenkai.j-dark";
import { J_EDO_TENKAI_J_KISAKU } from "./data/j-soc-hist-edo-tenkai.j-kisaku";
import { J_SEITAIKEI_BASE } from "./data/j-sci-3-seitaikei";
import { J_SEITAIKEI_J_DARK } from "./data/j-sci-3-seitaikei.j-dark";
import { J_SEITAIKEI_J_KISAKU } from "./data/j-sci-3-seitaikei.j-kisaku";
import { J_SANHEIHO_BASE } from "./data/j-math-3-sanheiho";
import { J_SANHEIHO_J_DARK } from "./data/j-math-3-sanheiho.j-dark";
import { J_SANHEIHO_J_KISAKU } from "./data/j-math-3-sanheiho.j-kisaku";
import { H_NOGYO_BASE } from "./data/h-geo-tankyu-nogyo";
import { H_NOGYO_H_CHARISMA } from "./data/h-geo-tankyu-nogyo.h-charisma";
import { H_NOGYO_H_KYOJU } from "./data/h-geo-tankyu-nogyo.h-kyoju";
import { H_NOGYO_H_NEKKETSU } from "./data/h-geo-tankyu-nogyo.h-nekketsu";
import { H_KOTEN_GENTEI_BASE } from "./data/h-jpn-koten-gentei";
import { H_KOTEN_GENTEI_H_CHARISMA } from "./data/h-jpn-koten-gentei.h-charisma";
import { H_KOTEN_GENTEI_H_KYOJU } from "./data/h-jpn-koten-gentei.h-kyoju";
import { H_KOTEN_GENTEI_H_NEKKETSU } from "./data/h-jpn-koten-gentei.h-nekketsu";
import { H_SOGO_KAKUMEI_BASE } from "./data/h-hist-sogo-kakumei";
import { H_SOGO_KAKUMEI_H_CHARISMA } from "./data/h-hist-sogo-kakumei.h-charisma";
import { H_SOGO_KAKUMEI_H_KYOJU } from "./data/h-hist-sogo-kakumei.h-kyoju";
import { H_SOGO_KAKUMEI_H_NEKKETSU } from "./data/h-hist-sogo-kakumei.h-nekketsu";
import { E_MACHI3_BASE } from "./data/e-social-3-machi";
import { E_MACHI3_E_POP } from "./data/e-social-3-machi.e-pop";
import { E_MACHI3_E_YASASHI } from "./data/e-social-3-machi.e-yasashi";
import { E_KANJI3_BASE } from "./data/e-japanese-3-kanji";
import { E_KANJI3_E_POP } from "./data/e-japanese-3-kanji.e-pop";
import { E_KANJI3_E_YASASHI } from "./data/e-japanese-3-kanji.e-yasashi";
import { E_NARABEKATA6_BASE } from "./data/e-math-6-narabekata";
import { E_NARABEKATA6_E_POP } from "./data/e-math-6-narabekata.e-pop";
import { E_NARABEKATA6_E_YASASHI } from "./data/e-math-6-narabekata.e-yasashi";
import { J_HIST_GENDAI_BASE } from "./data/j-soc-hist-gendai";
import { J_HIST_GENDAI_J_DARK } from "./data/j-soc-hist-gendai.j-dark";
import { J_HIST_GENDAI_J_KISAKU } from "./data/j-soc-hist-gendai.j-kisaku";
import { J_SHIGOTO_BASE } from "./data/j-sci-3-shigoto";
import { J_SHIGOTO_J_DARK } from "./data/j-sci-3-shigoto.j-dark";
import { J_SHIGOTO_J_KISAKU } from "./data/j-sci-3-shigoto.j-kisaku";
import { J_SOJII_BASE } from "./data/j-math-3-sojii";
import { J_SOJII_J_DARK } from "./data/j-math-3-sojii.j-dark";
import { J_SOJII_J_KISAKU } from "./data/j-math-3-sojii.j-kisaku";
import { H_HATSUON_BASE } from "./data/h-eng-vocab-hatsuon";
import { H_HATSUON_H_CHARISMA } from "./data/h-eng-vocab-hatsuon.h-charisma";
import { H_HATSUON_H_KYOJU } from "./data/h-eng-vocab-hatsuon.h-kyoju";
import { H_HATSUON_H_NEKKETSU } from "./data/h-eng-vocab-hatsuon.h-nekketsu";
import { H_RINRI_KINDAI_NIHON_BASE } from "./data/h-civ-rinri-kindai-nihon";
import { H_RINRI_KINDAI_NIHON_H_CHARISMA } from "./data/h-civ-rinri-kindai-nihon.h-charisma";
import { H_RINRI_KINDAI_NIHON_H_KYOJU } from "./data/h-civ-rinri-kindai-nihon.h-kyoju";
import { H_RINRI_KINDAI_NIHON_H_NEKKETSU } from "./data/h-civ-rinri-kindai-nihon.h-nekketsu";
import { H_TANKYU_OCEANIA_BASE } from "./data/h-geo-tankyu-oceania";
import { H_TANKYU_OCEANIA_H_CHARISMA } from "./data/h-geo-tankyu-oceania.h-charisma";
import { H_TANKYU_OCEANIA_H_KYOJU } from "./data/h-geo-tankyu-oceania.h-kyoju";
import { H_TANKYU_OCEANIA_H_NEKKETSU } from "./data/h-geo-tankyu-oceania.h-nekketsu";
import { E_MISE3_BASE } from "./data/e-social-3-mise";
import { E_MISE3_E_POP } from "./data/e-social-3-mise.e-pop";
import { E_MISE3_E_YASASHI } from "./data/e-social-3-mise.e-yasashi";
import { E_KOSOADO3_BASE } from "./data/e-japanese-3-kosoado";
import { E_KOSOADO3_E_POP } from "./data/e-japanese-3-kosoado.e-pop";
import { E_KOSOADO3_E_YASASHI } from "./data/e-japanese-3-kosoado.e-yasashi";
import { E_OYOSO6_BASE } from "./data/e-math-6-oyoso";
import { E_OYOSO6_E_POP } from "./data/e-math-6-oyoso.e-pop";
import { E_OYOSO6_E_YASASHI } from "./data/e-math-6-oyoso.e-yasashi";
import { J_KAIKOKU_BASE } from "./data/j-soc-hist-kaikoku";
import { J_KAIKOKU_J_DARK } from "./data/j-soc-hist-kaikoku.j-dark";
import { J_KAIKOKU_J_KISAKU } from "./data/j-soc-hist-kaikoku.j-kisaku";
import { J_SHINKA_BASE } from "./data/j-sci-3-shinka";
import { J_SHINKA_J_DARK } from "./data/j-sci-3-shinka.j-dark";
import { J_SHINKA_J_KISAKU } from "./data/j-sci-3-shinka.j-kisaku";
import { J_TENKAI_BASE } from "./data/j-math-3-tenkai";
import { J_TENKAI_J_DARK } from "./data/j-math-3-tenkai.j-dark";
import { J_TENKAI_J_KISAKU } from "./data/j-math-3-tenkai.j-kisaku";
import { H_KOTEN_GIMON_BASE } from "./data/h-jpn-koten-gimon";
import { H_KOTEN_GIMON_H_CHARISMA } from "./data/h-jpn-koten-gimon.h-charisma";
import { H_KOTEN_GIMON_H_KYOJU } from "./data/h-jpn-koten-gimon.h-kyoju";
import { H_KOTEN_GIMON_H_NEKKETSU } from "./data/h-jpn-koten-gimon.h-nekketsu";
import { H_SOGO_KODO_BASE } from "./data/h-hist-sogo-kodo";
import { H_SOGO_KODO_H_CHARISMA } from "./data/h-hist-sogo-kodo.h-charisma";
import { H_SOGO_KODO_H_KYOJU } from "./data/h-hist-sogo-kodo.h-kyoju";
import { H_SOGO_KODO_H_NEKKETSU } from "./data/h-hist-sogo-kodo.h-nekketsu";
import { H_VOCAB_JUKUGO_BASE } from "./data/h-eng-vocab-jukugo";
import { H_VOCAB_JUKUGO_H_CHARISMA } from "./data/h-eng-vocab-jukugo.h-charisma";
import { H_VOCAB_JUKUGO_H_KYOJU } from "./data/h-eng-vocab-jukugo.h-kyoju";
import { H_VOCAB_JUKUGO_H_NEKKETSU } from "./data/h-eng-vocab-jukugo.h-nekketsu";
import { E_SEISAN3_BASE } from "./data/e-social-3-seisan";
import { E_SEISAN3_E_POP } from "./data/e-social-3-seisan.e-pop";
import { E_SEISAN3_E_YASASHI } from "./data/e-social-3-seisan.e-yasashi";
import { E_KOTOWAZA3_BASE } from "./data/e-japanese-3-kotowaza";
import { E_KOTOWAZA3_E_POP } from "./data/e-japanese-3-kotowaza.e-pop";
import { E_KOTOWAZA3_E_YASASHI } from "./data/e-japanese-3-kotowaza.e-yasashi";
import { E_TAISHO6_BASE } from "./data/e-math-6-taisho";
import { E_TAISHO6_E_POP } from "./data/e-math-6-taisho.e-pop";
import { E_TAISHO6_E_YASASHI } from "./data/e-math-6-taisho.e-yasashi";
import { J_KODAI_KOKKA_BASE } from "./data/j-soc-hist-kodai-kokka";
import { J_KODAI_KOKKA_J_DARK } from "./data/j-soc-hist-kodai-kokka.j-dark";
import { J_KODAI_KOKKA_J_KISAKU } from "./data/j-soc-hist-kodai-kokka.j-kisaku";
import { J_SUIATSU_BASE } from "./data/j-sci-3-suiatsu";
import { J_SUIATSU_J_DARK } from "./data/j-sci-3-suiatsu.j-dark";
import { J_SUIATSU_J_KISAKU } from "./data/j-sci-3-suiatsu.j-kisaku";
import { H_RINRI_KORI_BASE } from "./data/h-civ-rinri-kori";
import { H_RINRI_KORI_H_CHARISMA } from "./data/h-civ-rinri-kori.h-charisma";
import { H_RINRI_KORI_H_KYOJU } from "./data/h-civ-rinri-kori.h-kyoju";
import { H_RINRI_KORI_H_NEKKETSU } from "./data/h-civ-rinri-kori.h-nekketsu";
import { H_TANKYU_RUSSIA_BASE } from "./data/h-geo-tankyu-russia";
import { H_TANKYU_RUSSIA_H_CHARISMA } from "./data/h-geo-tankyu-russia.h-charisma";
import { H_TANKYU_RUSSIA_H_KYOJU } from "./data/h-geo-tankyu-russia.h-kyoju";
import { H_TANKYU_RUSSIA_H_NEKKETSU } from "./data/h-geo-tankyu-russia.h-nekketsu";
import { H_KOTEN_HIKAKU_BASE } from "./data/h-jpn-koten-hikaku";
import { H_KOTEN_HIKAKU_H_CHARISMA } from "./data/h-jpn-koten-hikaku.h-charisma";
import { H_KOTEN_HIKAKU_H_KYOJU } from "./data/h-jpn-koten-hikaku.h-kyoju";
import { H_KOTEN_HIKAKU_H_NEKKETSU } from "./data/h-jpn-koten-hikaku.h-nekketsu";
import { E_SHOBO3_BASE } from "./data/e-social-3-shobo";
import { E_SHOBO3_E_POP } from "./data/e-social-3-shobo.e-pop";
import { E_SHOBO3_E_YASASHI } from "./data/e-social-3-shobo.e-yasashi";
import { E_MONOGATARI3_BASE } from "./data/e-japanese-3-monogatari";
import { E_MONOGATARI3_E_POP } from "./data/e-japanese-3-monogatari.e-pop";
import { E_MONOGATARI3_E_YASASHI } from "./data/e-japanese-3-monogatari.e-yasashi";
import { E_BUNSU_SHOSU5_BASE } from "./data/e-math-5-bunsu-shosu";
import { E_BUNSU_SHOSU5_E_POP } from "./data/e-math-5-bunsu-shosu.e-pop";
import { E_BUNSU_SHOSU5_E_YASASHI } from "./data/e-math-5-bunsu-shosu.e-yasashi";
import { J_NARITACHI_BASE } from "./data/j-soc-hist-nihon-naritachi";
import { J_NARITACHI_J_DARK } from "./data/j-soc-hist-nihon-naritachi.j-dark";
import { J_NARITACHI_J_KISAKU } from "./data/j-soc-hist-nihon-naritachi.j-kisaku";
import { J_TAIYOKEI_BASE } from "./data/j-sci-3-taiyokei";
import { J_TAIYOKEI_J_DARK } from "./data/j-sci-3-taiyokei.j-dark";
import { J_TAIYOKEI_J_KISAKU } from "./data/j-sci-3-taiyokei.j-kisaku";
import { H_SOGO_KYOKO_BASE } from "./data/h-hist-sogo-kyoko";
import { H_SOGO_KYOKO_H_CHARISMA } from "./data/h-hist-sogo-kyoko.h-charisma";
import { H_SOGO_KYOKO_H_KYOJU } from "./data/h-hist-sogo-kyoko.h-kyoju";
import { H_SOGO_KYOKO_H_NEKKETSU } from "./data/h-hist-sogo-kyoko.h-nekketsu";
import { H_VOCAB_KAIWA_BASE } from "./data/h-eng-vocab-kaiwa";
import { H_VOCAB_KAIWA_H_CHARISMA } from "./data/h-eng-vocab-kaiwa.h-charisma";
import { H_VOCAB_KAIWA_H_KYOJU } from "./data/h-eng-vocab-kaiwa.h-kyoju";
import { H_VOCAB_KAIWA_H_NEKKETSU } from "./data/h-eng-vocab-kaiwa.h-nekketsu";
import { H_RINRI_NIHON_BASE } from "./data/h-civ-rinri-nihon";
import { H_RINRI_NIHON_H_CHARISMA } from "./data/h-civ-rinri-nihon.h-charisma";
import { H_RINRI_NIHON_H_KYOJU } from "./data/h-civ-rinri-nihon.h-kyoju";
import { H_RINRI_NIHON_H_NEKKETSU } from "./data/h-civ-rinri-nihon.h-nekketsu";
import { H_SHOIN_NYUJUKU_BASE } from "./data/h-civ-shoin-nyujuku";
import { H_SHOIN_NYUJUKU_H_CHARISMA } from "./data/h-civ-shoin-nyujuku.h-charisma";
import { H_SHOIN_NYUJUKU_H_KYOJU } from "./data/h-civ-shoin-nyujuku.h-kyoju";
import { H_SHOIN_NYUJUKU_H_NEKKETSU } from "./data/h-civ-shoin-nyujuku.h-nekketsu";
import { H_SHOIN_RISSHI_BASE } from "./data/h-civ-shoin-risshi";
import { H_SHOIN_RISSHI_H_CHARISMA } from "./data/h-civ-shoin-risshi.h-charisma";
import { H_SHOIN_RISSHI_H_KYOJU } from "./data/h-civ-shoin-risshi.h-kyoju";
import { H_SHOIN_RISSHI_H_NEKKETSU } from "./data/h-civ-shoin-risshi.h-nekketsu";
import { H_SHOIN_DOKUSHO_BASE } from "./data/h-civ-shoin-dokusho";
import { H_SHOIN_DOKUSHO_H_CHARISMA } from "./data/h-civ-shoin-dokusho.h-charisma";
import { H_SHOIN_DOKUSHO_H_KYOJU } from "./data/h-civ-shoin-dokusho.h-kyoju";
import { H_SHOIN_DOKUSHO_H_NEKKETSU } from "./data/h-civ-shoin-dokusho.h-nekketsu";
import { H_SHOIN_KODO_BASE } from "./data/h-civ-shoin-kodo";
import { H_SHOIN_KODO_H_CHARISMA } from "./data/h-civ-shoin-kodo.h-charisma";
import { H_SHOIN_KODO_H_KYOJU } from "./data/h-civ-shoin-kodo.h-kyoju";
import { H_SHOIN_KODO_H_NEKKETSU } from "./data/h-civ-shoin-kodo.h-nekketsu";
import { H_SHOIN_SHISEI_BASE } from "./data/h-civ-shoin-shisei";
import { H_SHOIN_SHISEI_H_CHARISMA } from "./data/h-civ-shoin-shisei.h-charisma";
import { H_SHOIN_SHISEI_H_KYOJU } from "./data/h-civ-shoin-shisei.h-kyoju";
import { H_SHOIN_SHISEI_H_NEKKETSU } from "./data/h-civ-shoin-shisei.h-nekketsu";
import { H_SHOIN_HIKARI_BASE } from "./data/h-civ-shoin-hikari";
import { H_SHOIN_HIKARI_H_CHARISMA } from "./data/h-civ-shoin-hikari.h-charisma";
import { H_SHOIN_HIKARI_H_KYOJU } from "./data/h-civ-shoin-hikari.h-kyoju";
import { H_SHOIN_HIKARI_H_NEKKETSU } from "./data/h-civ-shoin-hikari.h-nekketsu";
import { E_UTSURIKAWARI3_BASE } from "./data/e-social-3-utsurikawari";
import { E_UTSURIKAWARI3_E_POP } from "./data/e-social-3-utsurikawari.e-pop";
import { E_UTSURIKAWARI3_E_YASASHI } from "./data/e-social-3-utsurikawari.e-yasashi";
import { E_ROMAJI3_BASE } from "./data/e-japanese-3-romaji";
import { E_ROMAJI3_E_POP } from "./data/e-japanese-3-romaji.e-pop";
import { E_ROMAJI3_E_YASASHI } from "./data/e-japanese-3-romaji.e-yasashi";
import { E_GOUDOU5_BASE } from "./data/e-math-5-goudou";
import { E_GOUDOU5_E_POP } from "./data/e-math-5-goudou.e-pop";
import { E_GOUDOU5_E_YASASHI } from "./data/e-math-5-goudou.e-yasashi";
import { J_RIKKEN_BASE } from "./data/j-soc-hist-rikken";
import { J_RIKKEN_J_DARK } from "./data/j-soc-hist-rikken.j-dark";
import { J_RIKKEN_J_KISAKU } from "./data/j-soc-hist-rikken.j-kisaku";
import { J_TENTAI_BASE } from "./data/j-sci-3-tentai";
import { J_TENTAI_J_DARK } from "./data/j-sci-3-tentai.j-dark";
import { J_TENTAI_J_KISAKU } from "./data/j-sci-3-tentai.j-kisaku";
import { H_TANKYU_SHIGEN_BASE } from "./data/h-geo-tankyu-shigen";
import { H_TANKYU_SHIGEN_H_CHARISMA } from "./data/h-geo-tankyu-shigen.h-charisma";
import { H_TANKYU_SHIGEN_H_KYOJU } from "./data/h-geo-tankyu-shigen.h-kyoju";
import { H_TANKYU_SHIGEN_H_NEKKETSU } from "./data/h-geo-tankyu-shigen.h-nekketsu";
import { H_KOTEN_HITEI_BASE } from "./data/h-jpn-koten-hitei";
import { H_KOTEN_HITEI_H_CHARISMA } from "./data/h-jpn-koten-hitei.h-charisma";
import { H_KOTEN_HITEI_H_KYOJU } from "./data/h-jpn-koten-hitei.h-kyoju";
import { H_KOTEN_HITEI_H_NEKKETSU } from "./data/h-jpn-koten-hitei.h-nekketsu";
import { H_SOGO_MEIJI_BASE } from "./data/h-hist-sogo-meiji";
import { H_SOGO_MEIJI_H_CHARISMA } from "./data/h-hist-sogo-meiji.h-charisma";
import { H_SOGO_MEIJI_H_KYOJU } from "./data/h-hist-sogo-meiji.h-kyoju";
import { H_SOGO_MEIJI_H_NEKKETSU } from "./data/h-hist-sogo-meiji.h-nekketsu";
import { E_SETSUMEI3_BASE } from "./data/e-japanese-3-setsumei";
import { E_SETSUMEI3_E_POP } from "./data/e-japanese-3-setsumei.e-pop";
import { E_SETSUMEI3_E_YASASHI } from "./data/e-japanese-3-setsumei.e-yasashi";
import { E_HIREI5_BASE } from "./data/e-math-5-hirei";
import { E_HIREI5_E_POP } from "./data/e-math-5-hirei.e-pop";
import { E_HIREI5_E_YASASHI } from "./data/e-math-5-hirei.e-yasashi";
import { J_SEKAI_TAISEN_BASE } from "./data/j-soc-hist-sekai-taisen";
import { J_SEKAI_TAISEN_J_DARK } from "./data/j-soc-hist-sekai-taisen.j-dark";
import { J_SEKAI_TAISEN_J_KISAKU } from "./data/j-soc-hist-sekai-taisen.j-kisaku";
import { J_UNDO_BASE } from "./data/j-sci-3-undo";
import { J_UNDO_J_DARK } from "./data/j-sci-3-undo.j-dark";
import { J_UNDO_J_KISAKU } from "./data/j-sci-3-undo.j-kisaku";
import { H_TANKYU_TOSHI_BASE } from "./data/h-geo-tankyu-toshi";
import { H_TANKYU_TOSHI_H_CHARISMA } from "./data/h-geo-tankyu-toshi.h-charisma";
import { H_TANKYU_TOSHI_H_KYOJU } from "./data/h-geo-tankyu-toshi.h-kyoju";
import { H_TANKYU_TOSHI_H_NEKKETSU } from "./data/h-geo-tankyu-toshi.h-nekketsu";
import { H_KOTEN_JOSHI_BASE } from "./data/h-jpn-koten-joshi";
import { H_KOTEN_JOSHI_H_CHARISMA } from "./data/h-jpn-koten-joshi.h-charisma";
import { H_KOTEN_JOSHI_H_KYOJU } from "./data/h-jpn-koten-joshi.h-kyoju";
import { H_KOTEN_JOSHI_H_NEKKETSU } from "./data/h-jpn-koten-joshi.h-nekketsu";
import { H_SOGO_NISSHIN_BASE } from "./data/h-hist-sogo-nisshin";
import { H_SOGO_NISSHIN_H_CHARISMA } from "./data/h-hist-sogo-nisshin.h-charisma";
import { H_SOGO_NISSHIN_H_KYOJU } from "./data/h-hist-sogo-nisshin.h-kyoju";
import { H_SOGO_NISSHIN_H_NEKKETSU } from "./data/h-hist-sogo-nisshin.h-nekketsu";
import { E_SHI3_BASE } from "./data/e-japanese-3-shi";
import { E_SHI3_E_POP } from "./data/e-japanese-3-shi.e-pop";
import { E_SHI3_E_YASASHI } from "./data/e-japanese-3-shi.e-yasashi";
import { E_KAKUCHU5_BASE } from "./data/e-math-5-kakuchu";
import { E_KAKUCHU5_E_POP } from "./data/e-math-5-kakuchu.e-pop";
import { E_KAKUCHU5_E_YASASHI } from "./data/e-math-5-kakuchu.e-yasashi";
import { J_SENGO_BASE } from "./data/j-soc-hist-sengo";
import { J_SENGO_J_DARK } from "./data/j-soc-hist-sengo.j-dark";
import { J_SENGO_J_KISAKU } from "./data/j-soc-hist-sengo.j-kisaku";
import { H_KOTEN_JOSHIKI_BASE } from "./data/h-jpn-koten-joshiki";
import { H_KOTEN_JOSHIKI_H_CHARISMA } from "./data/h-jpn-koten-joshiki.h-charisma";
import { H_KOTEN_JOSHIKI_H_KYOJU } from "./data/h-jpn-koten-joshiki.h-kyoju";
import { H_KOTEN_JOSHIKI_H_NEKKETSU } from "./data/h-jpn-koten-joshiki.h-nekketsu";
import { H_SOGO_REISEN_BASE } from "./data/h-hist-sogo-reisen";
import { H_SOGO_REISEN_H_CHARISMA } from "./data/h-hist-sogo-reisen.h-charisma";
import { H_SOGO_REISEN_H_KYOJU } from "./data/h-hist-sogo-reisen.h-kyoju";
import { H_SOGO_REISEN_H_NEKKETSU } from "./data/h-hist-sogo-reisen.h-nekketsu";
import { H_RINRI_PRAGMA_BASE } from "./data/h-civ-rinri-pragma";
import { H_RINRI_PRAGMA_H_CHARISMA } from "./data/h-civ-rinri-pragma.h-charisma";
import { H_RINRI_PRAGMA_H_KYOJU } from "./data/h-civ-rinri-pragma.h-kyoju";
import { H_RINRI_PRAGMA_H_NEKKETSU } from "./data/h-civ-rinri-pragma.h-nekketsu";
import { E_SHUSHOKUGO3_BASE } from "./data/e-japanese-3-shushokugo";
import { E_SHUSHOKUGO3_E_POP } from "./data/e-japanese-3-shushokugo.e-pop";
import { E_SHUSHOKUGO3_E_YASASHI } from "./data/e-japanese-3-shushokugo.e-yasashi";
import { E_OBI_EN5_BASE } from "./data/e-math-5-obi-en";
import { E_OBI_EN5_E_POP } from "./data/e-math-5-obi-en.e-pop";
import { E_OBI_EN5_E_YASASHI } from "./data/e-math-5-obi-en.e-yasashi";
import { J_TAISHO_BASE } from "./data/j-soc-hist-taisho";
import { J_TAISHO_J_DARK } from "./data/j-soc-hist-taisho.j-dark";
import { J_TAISHO_J_KISAKU } from "./data/j-soc-hist-taisho.j-kisaku";
import { H_KOTEN_MONOGATARI_BASE } from "./data/h-jpn-koten-monogatari";
import { H_KOTEN_MONOGATARI_H_CHARISMA } from "./data/h-jpn-koten-monogatari.h-charisma";
import { H_KOTEN_MONOGATARI_H_KYOJU } from "./data/h-jpn-koten-monogatari.h-kyoju";
import { H_KOTEN_MONOGATARI_H_NEKKETSU } from "./data/h-jpn-koten-monogatari.h-nekketsu";
import { H_SOGO_SANGYO_BASE } from "./data/h-hist-sogo-sangyo";
import { H_SOGO_SANGYO_H_CHARISMA } from "./data/h-hist-sogo-sangyo.h-charisma";
import { H_SOGO_SANGYO_H_KYOJU } from "./data/h-hist-sogo-sangyo.h-kyoju";
import { H_SOGO_SANGYO_H_NEKKETSU } from "./data/h-hist-sogo-sangyo.h-nekketsu";
import { H_RINRI_RENAISSANCE_BASE } from "./data/h-civ-rinri-renaissance";
import { H_RINRI_RENAISSANCE_H_CHARISMA } from "./data/h-civ-rinri-renaissance.h-charisma";
import { H_RINRI_RENAISSANCE_H_KYOJU } from "./data/h-civ-rinri-renaissance.h-kyoju";
import { H_RINRI_RENAISSANCE_H_NEKKETSU } from "./data/h-civ-rinri-renaissance.h-nekketsu";
import { E_TEGAMI3_BASE } from "./data/e-japanese-3-tegami";
import { E_TEGAMI3_E_POP } from "./data/e-japanese-3-tegami.e-pop";
import { E_TEGAMI3_E_YASASHI } from "./data/e-japanese-3-tegami.e-yasashi";
import { E_SEISU_SHOSU5_BASE } from "./data/e-math-5-seisu-shosu";
import { E_SEISU_SHOSU5_E_POP } from "./data/e-math-5-seisu-shosu.e-pop";
import { E_SEISU_SHOSU5_E_YASASHI } from "./data/e-math-5-seisu-shosu.e-yasashi";
import { J_TORAEKATA_BASE } from "./data/j-soc-hist-toraekata";
import { J_TORAEKATA_J_DARK } from "./data/j-soc-hist-toraekata.j-dark";
import { J_TORAEKATA_J_KISAKU } from "./data/j-soc-hist-toraekata.j-kisaku";
import { H_KOTEN_NIKKI_BASE } from "./data/h-jpn-koten-nikki";
import { H_KOTEN_NIKKI_H_CHARISMA } from "./data/h-jpn-koten-nikki.h-charisma";
import { H_KOTEN_NIKKI_H_KYOJU } from "./data/h-jpn-koten-nikki.h-kyoju";
import { H_KOTEN_NIKKI_H_NEKKETSU } from "./data/h-jpn-koten-nikki.h-nekketsu";
import { H_SOGO_SENGO_BASE } from "./data/h-hist-sogo-sengo";
import { H_SOGO_SENGO_H_CHARISMA } from "./data/h-hist-sogo-sengo.h-charisma";
import { H_SOGO_SENGO_H_KYOJU } from "./data/h-hist-sogo-sengo.h-kyoju";
import { H_SOGO_SENGO_H_NEKKETSU } from "./data/h-hist-sogo-sengo.h-nekketsu";
import { H_RINRI_SEIMEI_BASE } from "./data/h-civ-rinri-seimei";
import { H_RINRI_SEIMEI_H_CHARISMA } from "./data/h-civ-rinri-seimei.h-charisma";
import { H_RINRI_SEIMEI_H_KYOJU } from "./data/h-civ-rinri-seimei.h-kyoju";
import { H_RINRI_SEIMEI_H_NEKKETSU } from "./data/h-civ-rinri-seimei.h-nekketsu";
import { UZ_BASES, UZ_SCRIPTS } from "./uz";

// 止まる授業（動画型）。/learn/jugyo と /learn/jugyo/<単元id>（?cast=<キャストid> で確認用に指定。canonical は cast なし）。
// 検索に載せ、sitemap にも入れる（2026-11-06 代表の決定）。入口は教科の地図の単元の箱・単元の教科書のページ・まなぶのトップ。
// 台本を足すとき：単元の骨組み data/<単元id>.ts（問題）と、キャストごとのせりふ data/<単元id>.<キャストid>.ts を書いて
// ここに並べ、`npx tsx scripts/check-jugyo.ts` で点検する。

export const JUGYO_HOME = "/learn/jugyo";

const BASES: UnitBase[] = [WARIAI_BASE, HAYASA_BASE, BUNSU_WARI_BASE, FURIKO_BASE, TAISEKI_BASE, MENSEKI_BASE, HATSUGA_BASE, KAMAKURA_BASE, SEIFU_BASE, DENRYU_BASE, FUTEISHI_BASE, HOTEISHIKI_BASE, KAGAKU_HENKA_BASE, EDO_SEIRITSU_BASE, TAISHA_BASE, BIBUN_BASE, MOL_BASE, DOPPLER_BASE, NIJIKANSU_BASE, MEIJI_BASE, KANDAI_BASE, EN_MENSEKI_BASE, HI_BASE, KAKUDAI_BASE, HIREI_BASE, HEIMEN_BASE, SAIBO_BASE, SANKAKUHI_BASE, DNA_BASE, JISEI_BASE, MOEKATA_BASE, KARADA_BASE, TSUKI_HOSHI_BASE, TENKI_BASE, MEIJI_ISHIN_BASE, HIKAKU_BASE, H_KAMAKURA_BASE, SANKA_BASE, JUDO_BASE, HIREI_HANPIREI_BASE, HEIKIN_BASE, MEIJI_E_BASE, JIKAI_BASE, MUROMACHI_BASE, UKEMI_BASE, CHUWA_BASE, SENKYO_BASE, NIJIHOTEISHIKI_BASE, KAMAKURA_E_BASE, TANNI_BASE, DENJISHAKU_BASE, KANKEI_BASE, MOJI_BASE, HEIAN_BASE, MENEKI_BASE, KAKUMEI_BASE, KATEIHO_BASE, TEKO_BASE, MOJI_SHIKI_BASE, KOME_BASE, MIRAI_BASE, SEIDENKI_BASE, TENKA_TOITSU_BASE, DATA_BASE, H_EDO_SEIRITSU_BASE, SHIJO_BASE, SUIYOEKI_BASE, EDO_SEIJI_BASE, NAGARERU_BASE, KANRYO_BASE, KUKAN_BASE, DOBUTSU_BASE, H_FUTEISHI_BASE, SHUGO_BASE, H_GENSHI_BASE, ASUKA_NARA_BASE, HANASHI_KAKI_BASE, ALPHA_KAKU_BASE, HINSHI_BASE, BUNKA_BASE, EN_BE_BASE, BOSAI_BASE, HYOGEN_BASE, ALGORITHM_BASE, IKEN_BASE, CAN_BASE, EDO_BUNKA_BASE, SEIBUN_BASE, CHIHO_BASE, EN_CAN_BASE, CHIKEI_BASE, HYORON_BASE, ASSYUKU_BASE, KANA_YURAI_BASE, HEIAN_E_BASE, CHUGAKU_BASE, TANI_BASE, CHIKYU_BASE, DAIMEISHI_BASE, H_CHIHO_BASE, CHOSA_BASE, H_SHI_BASE, KANJI6_BASE, CHUMON_BASE, JOMON_BASE, GOI_BASE, GENDAI_SHAKAI_BASE, EISAKUBUN_BASE, CHIZAI_BASE, H_JINKEN_BASE, GIS_BASE, KOTOBA_HENKA_BASE, HINDO_BASE, KENPO_BASE, HANASU_BASE, TAIRITSU_GOI_BASE, GIMONSHI_BASE, SHOSETSU_BASE, COMPUTER_BASE, ASUKA_BASE, MONOGATARI_BASE, HITO_BASE, DENKI_BASE, KAKU_BASE, JINKEN_BASE, IPPAN_BASE, JIZOKU_BASE, JINKO_BASE, SOSAKU_BASE, BUNSU_TASHIHIKI_BASE, MEDAKA_BASE, SHOKURYO_BASE, KAKURITSU_BASE, HIKARI_BASE, JODOSHI_BASE, NAMI_BASE, HA_KAKURITSU_BASE, HE_JODOSHI_BASE, E_SHOSU_KAKE_BASE, E_TOKEKATA_BASE, E_KEIGO_BASE, J_HEIHOKON_BASE, J_KEIGO_BASE, J_NIHON_SUGATA_BASE, H_HEIAN_BASE, H_KOTEN_KEIGO_BASE, H_JISSU_BASE, E_KOGYO_BASE, E_DENRYU_BASE, E_YOJIJUKUGO_BASE, J_ION_BASE, J_THERE_BASE, J_EUROPE_BASE, H_GREECE_BASE, H_DENRYU_BASE, H_HIKAKU_BASE, E_BAISU_YAKUSU_BASE, E_TENKI5_BASE, E_KOKUREN_BASE, J_ICHIJI_KANSU_BASE, J_KISHO_BASE, J_KOBUN1_BASE, H_KEIYAKU_BASE, E_DATA6_BASE, J_JISHIN_BASE, J_KAKOKEI_BASE, J_ASIA_BASE, H_ENERGY_BASE, H_BAAI_BASE, H_KANSHI_BASE, E_TOCHI_BASE, J_DATA1_BASE, H_ISLAM_BASE, E_WAGO_BASE, J_SHOKUBUTSU_BASE, H_OTO_BASE, E_ICHI_BASE, E_SETSUMEI_BASE, E_KUNIGUNI_BASE, J_KANBUN1_BASE, J_KENPO_BASE, J_LISTENING1_BASE, H_INFO_DATA_BASE, H_JISA_BASE, H_KENPO_BASE, E_IKITAI_BASE, E_SHI_BASE, E_KURASHI_SEIJI_BASE, J_KANJI1_BASE, J_KIGYO_BASE, J_MEIREI1_BASE, H_DESIGN_BASE, H_KANKYO_BASE, H_BUNKEI_BASE, J_MONOGATARI1_BASE, J_KINYU_BASE, J_MEISHI1_BASE, H_DIGITAL_BASE, H_KINYU_BASE, H_KIKO_BASE, E_JIKOSHOKAI_BASE, E_ZUIHITSU_BASE, E_MUROMACHI_BASE, J_SETSUMEI_BASE, J_KOKKAI_BASE, J_ONSEI_BASE, H_TANKA_BASE, H_INFO_HYOGEN_BASE, H_BAKUMATSU_BASE, E_KAKO_BASE, E_BUN_KUMITATE_BASE, E_KANKYO_BASE, J_SHI_BASE, J_KOKUSAI_BASE, J_SHINKOKEI_BASE, H_BUNSHI_BASE, H_KOKUSAI_KEIZAI_BASE, H_MUSUBI_BASE, E_KYOKA_BASE, E_DENKI5_BASE, E_SEIJI_BASE, J_FUZOKU_BASE, J_NAIKAKU_BASE, J_TANGO_BASE, H_KOBUN_JODOSHI_BASE, H_INFO_MEDIA_BASE, H_EDO_DOYO_BASE, E_OMOIDE_BASE, E_DOUON_BASE, E_SHOKUBUTSU_BASE, J_YOGEN_BASE, J_SAIBANSHO_BASE, J_BUNKEI_BASE, H_BUNSHIKOBUN_BASE, H_KOKUSAI_SEIJI_BASE, H_SHIGEN_BASE, E_OTO_MOJI_BASE, E_HOUKOKU_BASE, E_SEKAI_BASE, J_GOI2_BASE, J_SENKYO_BASE, J_DOMEISHI_BASE, H_KINDAI_BASE, H_MODEL_BASE, H_EDO_KEIZAI_BASE, E_TANJOBI_BASE, E_JUKUGO_BASE, E_TSUKI_TAIYO_BASE, J_HANASU2_BASE, J_SHAKAI_HOSHO_BASE, J_EISAKUBUN2_BASE, H_DAIMEISHI_BASE, H_RODO_BASE, H_SHUKYO_BASE, E_YUME_BASE, E_SENGO_BASE, E_KANJI5_BASE, J_IKENBUN_BASE, J_BUSSHITSU_BASE, J_SHIJO_BASE, H_KOBUN_DOKKAI_BASE, H_INFO_MORAL_BASE, H_GENDAI_BASE, E_AISATSU_BASE, E_HITO5_BASE, E_SENSO_BASE, J_KANJI2_BASE, J_KAKO_SHINKO_BASE, J_CHIKARA_BASE, H_DOMEISHI_BASE, H_SEINEN_BASE, H_TOSHI_BASE, E_KOMOJI_BASE, E_KOTEN5_BASE, E_MI5_BASE, J_KANSHI2_BASE, J_SHOHI_BASE, J_LISTENING2_BASE, H_KOBUN_NYUMON_BASE, H_NETWORK_BASE, H_JP_GENSHI_BASE, E_OOMOJI_BASE, E_TENKA_BASE, E_MONOGATARI5_BASE, J_KOBUN2_BASE, J_CHISO_BASE, J_ZAISEI_BASE, H_KANFUKU_BASE, H_SHISO_BASE, H_AMERICA_BASE, E_HOSHII_BASE, E_AMAMIZU_BASE, E_BOEKI_BASE, J_SETSUMEI2_BASE, J_SETSUZOKUSHI_BASE, J_DOBUTSU_BUNRUI_BASE, H_KOBUN_TANGO_BASE, H_PROGRAM_BASE, H_INSEI_BASE, E_IRO_KATACHI_BASE, E_SETSUMEI5_BASE, E_ATATAMARI_BASE, J_SHOSETSU2_BASE, J_AFRICA_BASE, J_TANGO2_BASE, H_KANRYO_BASE, H_TOSEI_BASE, H_TANKYU_CHIKEI_BASE, E_JIKOKU_BASE, E_BOSAI_BASE, E_SHI5_BASE, J_TANKA2_BASE, J_JOTAI_BASE, J_CHIIKI_CHOSA_BASE, H_KOJI_BASE, H_INFO_SYSTEM_BASE, H_KODO_BASE, E_KAZU_BASE, E_HONE_BASE, E_CHIKEI_BASE, J_BUNPO3_BASE, J_BUNSHI3_BASE, J_KAZAN_BASE, H_KEIYOSHI_BASE, H_RINRI_BUKKYO_BASE, H_TANKYU_EUROPE_BASE, E_SUISEN_BASE, E_MI_NO_MAWARI_BASE, E_KISETSU_BASE, J_GOI3_BASE, J_CHUBU_BASE, J_CHOBUN3_BASE, H_KUNDOKU_BASE, H_KOFUN_BASE, H_MEISHI_BASE, E_JOHO_BASE, E_BUN_KUMITATE4_BASE, E_MICHI_BASE, J_HAIKU3_BASE, J_KITAI_BASE, J_CHUGOKU_SHIKOKU_BASE, H_RINRI_CHINA_BASE, H_TANKYU_HIGASHIASIA_BASE, H_SAIDOKU_BASE, E_KUKI_MIZU_BASE, E_KIKO_BASE, E_DOUON4_BASE, J_HANASU3_BASE, J_EISAKUBUN3_BASE, J_OTO_BASE, H_MUROMACHI_BASE, H_SETSUZOKUSHI_BASE, H_RINRI_CHRIST_BASE, E_SUKI_BASE, E_ONDO_BASE, E_KOGAI_BASE, J_HIHYO3_BASE, J_HOKKAIDO_BASE, J_FUTEISHI3_BASE, H_TANKYU_JINKO_BASE, H_SHIIKA_BASE, H_NARA_BASE, E_IKEN4_BASE, E_YOUBI_TENKI_BASE, E_SUGATA_BASE, J_KANBUN3_BASE, J_SHOKUBUTSU_BUNRUI_BASE, J_KANTO_BASE, H_TOKUSHU_BASE, H_RINRI_GENDAI_BASE, H_TANKYU_KIKO_BASE, E_KURASHI5_BASE, E_KANJI4_BASE, E_TENKI4_BASE, J_KANJI3_BASE, J_KANRYO_SHINKO_BASE, J_SUIYOEKI_BASE, H_YOGEN_BASE, H_NICHIRO_BASE, H_WAHO_BASE, E_SEKAI5_BASE, E_KANJI_JITEN_BASE, E_YUKUE_BASE, J_KOBUN3_BASE, J_KINKI_BASE, J_KANSETSU_BASE, H_RINRI_GREECE_BASE, H_TANKYU_KOGYO_BASE, H_GEN_GOI_BASE, E_SHINRIN_BASE, E_KANYOKU_BASE, E_DENKI3_BASE, J_RONSETSU3_BASE, J_GENSHI2_BASE, J_KYUSHU_BASE, H_SENRYO_BASE, H_ZENCHISHI_BASE, H_RINRI_ISLAM_BASE, E_SUISAN5_BASE, E_KOJI4_BASE, E_HIKARI3_BASE, J_SHOSETSU3_BASE, J_KATEI_BASE, J_HAKOHIGE_BASE, H_KOKKA_BASE, H_HANASU_BASE, H_SENSO_BASE, E_DENTO4_BASE, E_MONOGATARI4_BASE, E_JISHAKU3_BASE, J_NIHON_KISHO_BASE, J_NIHON_TOKUSHOKU_BASE, J_LISTENING3_BASE, H_CHOBUN_BASE, H_RINRI_JITSUZON_BASE, H_TANKYU_KOTSU_BASE, E_GOMI4_BASE, E_OKURIGANA4_BASE, E_KAZE_GOMU3_BASE, J_HEIKO_GODO_BASE, J_SHIGEKI_BASE, J_NORTH_AMERICA_BASE, H_HOKOKU_BASE, H_SHOKUHO_BASE, H_JIYU_BASE, E_KEN4_BASE, E_SETSUMEI4_BASE, E_KONCHU3_BASE, J_TANGO3_BASE, J_RENRITSU_BASE, J_SHITSURYO_BASE, H_RINRI_JOHO_BASE, H_TANKYU_MINAMIASIA_BASE, H_GEN_IKEN_BASE, E_MIZU4_BASE, E_SHI4_BASE, E_OMOSA3_BASE, J_OCEANIA_BASE, J_SANKAKU_SHIKAKU_BASE, J_CHUWA_BASE, H_TAISHO_BASE, H_LISTENING_BASE, H_RINRI_KANKYO_BASE, E_SAIGAI4_BASE, E_SHINBUN4_BASE, E_OTO3_BASE, J_SEIKATSU_BASE, J_SHIKI_BASE, J_DENCHI_BASE, H_MINZOKU_BASE, H_GEN_JITSUYO_BASE, H_SOGO_18C_BASE, E_SENJIN4_BASE, E_TANKA4_BASE, E_SHIZEN3_BASE, J_SEKAI_SUGATA_BASE, J_EN3_BASE, J_GORYOKU_BASE, H_SPEAKING_BASE, H_RINRI_KANT_BASE, H_TANKYU_NIHON_BASE, E_TODOFUKEN4_BASE, E_HAIKU3_BASE, E_SHOKUBUTSU3_BASE, J_SOUTH_AMERICA_BASE, J_HYOHON_BASE, J_IDEN_BASE, H_KANJI_BASE, H_DATSU_BASE, H_WABUN_BASE, E_TOKUSHOKU4_BASE, E_HEN_TSUKURI3_BASE, E_TAIYO3_BASE, J_TOHOKU_BASE, J_KANSU_AX2_BASE, J_KAGAKU_GIJUTSU_BASE, H_KEIKEN_BASE, H_NISHIASIA_BASE, H_RONRI_BASE, E_CHIZU3_BASE, E_HOUKOKU3_BASE, E_BUNSU_KAKE6_BASE, J_BUNMEI_BASE, J_NIJI_HOTEISHIKI_BASE, J_SAIBO_BUNRETSU_BASE, H_GLOBAL_BASE, H_VOCAB_BASE, H_RINRI_KEIYAKU_BASE, E_KEISATSU3_BASE, E_JISHO3_BASE, E_KAKUCHU6_BASE, J_EDO_TENKAI_BASE, J_SEITAIKEI_BASE, J_SANHEIHO_BASE, H_NOGYO_BASE, H_KOTEN_GENTEI_BASE, H_SOGO_KAKUMEI_BASE, E_MACHI3_BASE, E_KANJI3_BASE, E_NARABEKATA6_BASE, J_HIST_GENDAI_BASE, J_SHIGOTO_BASE, J_SOJII_BASE, H_HATSUON_BASE, H_RINRI_KINDAI_NIHON_BASE, H_TANKYU_OCEANIA_BASE, E_MISE3_BASE, E_KOSOADO3_BASE, E_OYOSO6_BASE, J_KAIKOKU_BASE, J_SHINKA_BASE, J_TENKAI_BASE, H_KOTEN_GIMON_BASE, H_SOGO_KODO_BASE, H_VOCAB_JUKUGO_BASE, E_SEISAN3_BASE, E_KOTOWAZA3_BASE, E_TAISHO6_BASE, J_KODAI_KOKKA_BASE, J_SUIATSU_BASE, H_RINRI_KORI_BASE, H_TANKYU_RUSSIA_BASE, H_KOTEN_HIKAKU_BASE, E_SHOBO3_BASE, E_MONOGATARI3_BASE, E_BUNSU_SHOSU5_BASE, J_NARITACHI_BASE, J_TAIYOKEI_BASE, H_SOGO_KYOKO_BASE, H_VOCAB_KAIWA_BASE, H_RINRI_NIHON_BASE, H_SHOIN_NYUJUKU_BASE, H_SHOIN_RISSHI_BASE, H_SHOIN_DOKUSHO_BASE, H_SHOIN_KODO_BASE, H_SHOIN_SHISEI_BASE, H_SHOIN_HIKARI_BASE, E_UTSURIKAWARI3_BASE, E_ROMAJI3_BASE, E_GOUDOU5_BASE, J_RIKKEN_BASE, J_TENTAI_BASE, H_TANKYU_SHIGEN_BASE, H_KOTEN_HITEI_BASE, H_SOGO_MEIJI_BASE, E_SETSUMEI3_BASE, E_HIREI5_BASE, J_SEKAI_TAISEN_BASE, J_UNDO_BASE, H_TANKYU_TOSHI_BASE, H_KOTEN_JOSHI_BASE, H_SOGO_NISSHIN_BASE, E_SHI3_BASE, E_KAKUCHU5_BASE, J_SENGO_BASE, H_KOTEN_JOSHIKI_BASE, H_SOGO_REISEN_BASE, H_RINRI_PRAGMA_BASE, E_SHUSHOKUGO3_BASE, E_OBI_EN5_BASE, J_TAISHO_BASE, H_KOTEN_MONOGATARI_BASE, H_SOGO_SANGYO_BASE, H_RINRI_RENAISSANCE_BASE, E_TEGAMI3_BASE, E_SEISU_SHOSU5_BASE, J_TORAEKATA_BASE, H_KOTEN_NIKKI_BASE, H_SOGO_SENGO_BASE, H_RINRI_SEIMEI_BASE];
const SCRIPTS: CastScript[] = [
  WARIAI_E_POP, WARIAI_E_YASASHI, HAYASA_E_POP, HAYASA_E_YASASHI, BUNSU_WARI_E_POP, BUNSU_WARI_E_YASASHI, FURIKO_E_POP, FURIKO_E_YASASHI,
  TAISEKI_E_POP, TAISEKI_E_YASASHI, MENSEKI_E_POP, MENSEKI_E_YASASHI, HATSUGA_E_POP, HATSUGA_E_YASASHI,
  KAMAKURA_J_DARK, KAMAKURA_J_KISAKU, SEIFU_J_DARK, SEIFU_J_KISAKU, DENRYU_J_DARK, DENRYU_J_KISAKU, FUTEISHI_J_DARK, FUTEISHI_J_KISAKU,
  HOTEISHIKI_J_DARK, HOTEISHIKI_J_KISAKU, KAGAKU_HENKA_J_DARK, KAGAKU_HENKA_J_KISAKU, EDO_SEIRITSU_J_DARK, EDO_SEIRITSU_J_KISAKU,
  TAISHA_H_CHARISMA, TAISHA_H_KYOJU, TAISHA_H_NEKKETSU, BIBUN_H_CHARISMA, BIBUN_H_KYOJU, BIBUN_H_NEKKETSU,
  MOL_H_CHARISMA, MOL_H_KYOJU, MOL_H_NEKKETSU, DOPPLER_H_CHARISMA, DOPPLER_H_KYOJU, DOPPLER_H_NEKKETSU,
  NIJIKANSU_H_CHARISMA, NIJIKANSU_H_KYOJU, NIJIKANSU_H_NEKKETSU, MEIJI_H_CHARISMA, MEIJI_H_KYOJU, MEIJI_H_NEKKETSU,
  KANDAI_H_CHARISMA, KANDAI_H_KYOJU, KANDAI_H_NEKKETSU,
  EN_MENSEKI_E_POP, EN_MENSEKI_E_YASASHI, HI_E_POP, HI_E_YASASHI, KAKUDAI_E_POP, KAKUDAI_E_YASASHI,
  HIREI_J_DARK, HIREI_J_KISAKU, HEIMEN_J_DARK, HEIMEN_J_KISAKU, SAIBO_J_DARK, SAIBO_J_KISAKU,
  SANKAKUHI_H_CHARISMA, SANKAKUHI_H_KYOJU, SANKAKUHI_H_NEKKETSU,
  DNA_H_CHARISMA, DNA_H_KYOJU, DNA_H_NEKKETSU, JISEI_H_CHARISMA, JISEI_H_KYOJU, JISEI_H_NEKKETSU,
  MOEKATA_E_POP, MOEKATA_E_YASASHI, KARADA_E_POP, KARADA_E_YASASHI, TSUKI_HOSHI_E_POP, TSUKI_HOSHI_E_YASASHI,
  TENKI_J_DARK, TENKI_J_KISAKU, MEIJI_ISHIN_J_DARK, MEIJI_ISHIN_J_KISAKU, HIKAKU_J_DARK, HIKAKU_J_KISAKU,
  H_KAMAKURA_H_CHARISMA, H_KAMAKURA_H_KYOJU, H_KAMAKURA_H_NEKKETSU, SANKA_H_CHARISMA, SANKA_H_KYOJU, SANKA_H_NEKKETSU,
  JUDO_H_CHARISMA, JUDO_H_KYOJU, JUDO_H_NEKKETSU,
  HIREI_HANPIREI_E_POP, HIREI_HANPIREI_E_YASASHI, HEIKIN_E_POP, HEIKIN_E_YASASHI,
  MEIJI_E_E_POP, MEIJI_E_E_YASASHI,
  JIKAI_J_DARK, JIKAI_J_KISAKU, MUROMACHI_J_DARK, MUROMACHI_J_KISAKU, UKEMI_J_DARK, UKEMI_J_KISAKU,
  CHUWA_H_CHARISMA, CHUWA_H_KYOJU, CHUWA_H_NEKKETSU, SENKYO_H_CHARISMA, SENKYO_H_KYOJU, SENKYO_H_NEKKETSU,
  NIJIHOTEISHIKI_H_CHARISMA, NIJIHOTEISHIKI_H_KYOJU, NIJIHOTEISHIKI_H_NEKKETSU,
  KAMAKURA_E_E_POP, KAMAKURA_E_E_YASASHI, TANNI_E_POP, TANNI_E_YASASHI, DENJISHAKU_E_POP, DENJISHAKU_E_YASASHI,
  KANKEI_J_DARK, KANKEI_J_KISAKU, MOJI_J_DARK, MOJI_J_KISAKU, HEIAN_J_DARK, HEIAN_J_KISAKU,
  MENEKI_H_CHARISMA, MENEKI_H_KYOJU, MENEKI_H_NEKKETSU, KAKUMEI_H_CHARISMA, KAKUMEI_H_KYOJU, KAKUMEI_H_NEKKETSU,
  KATEIHO_H_CHARISMA, KATEIHO_H_KYOJU, KATEIHO_H_NEKKETSU,
  TEKO_E_POP, TEKO_E_YASASHI, MOJI_SHIKI_E_POP, MOJI_SHIKI_E_YASASHI, KOME_E_POP, KOME_E_YASASHI,
  MIRAI_J_DARK, MIRAI_J_KISAKU, SEIDENKI_J_DARK, SEIDENKI_J_KISAKU,
  TENKA_TOITSU_J_DARK, TENKA_TOITSU_J_KISAKU,
  DATA_H_CHARISMA, DATA_H_KYOJU, DATA_H_NEKKETSU, H_EDO_SEIRITSU_H_CHARISMA, H_EDO_SEIRITSU_H_KYOJU, H_EDO_SEIRITSU_H_NEKKETSU,
  SHIJO_H_CHARISMA, SHIJO_H_KYOJU, SHIJO_H_NEKKETSU,
  SUIYOEKI_E_POP, SUIYOEKI_E_YASASHI, EDO_SEIJI_E_POP, EDO_SEIJI_E_YASASHI, NAGARERU_E_POP, NAGARERU_E_YASASHI,
  KANRYO_J_DARK, KANRYO_J_KISAKU, KUKAN_J_DARK, KUKAN_J_KISAKU, DOBUTSU_J_DARK, DOBUTSU_J_KISAKU,
  H_FUTEISHI_H_CHARISMA, H_FUTEISHI_H_KYOJU, H_FUTEISHI_H_NEKKETSU, SHUGO_H_CHARISMA, SHUGO_H_KYOJU, SHUGO_H_NEKKETSU,
  H_GENSHI_H_CHARISMA, H_GENSHI_H_KYOJU, H_GENSHI_H_NEKKETSU,
  ASUKA_NARA_E_POP, ASUKA_NARA_E_YASASHI, HANASHI_KAKI_E_POP, HANASHI_KAKI_E_YASASHI,
  ALPHA_KAKU_E_POP, ALPHA_KAKU_E_YASASHI,
  HINSHI_J_DARK, HINSHI_J_KISAKU, BUNKA_J_DARK, BUNKA_J_KISAKU, EN_BE_J_DARK, EN_BE_J_KISAKU,
  BOSAI_H_CHARISMA, BOSAI_H_KYOJU, BOSAI_H_NEKKETSU, HYOGEN_H_CHARISMA, HYOGEN_H_KYOJU, HYOGEN_H_NEKKETSU,
  ALGORITHM_H_CHARISMA, ALGORITHM_H_KYOJU, ALGORITHM_H_NEKKETSU,
  IKEN_E_POP, IKEN_E_YASASHI, CAN_E_POP, CAN_E_YASASHI, EDO_BUNKA_E_POP, EDO_BUNKA_E_YASASHI,
  SEIBUN_J_DARK, SEIBUN_J_KISAKU, CHIHO_J_DARK, CHIHO_J_KISAKU, EN_CAN_J_DARK, EN_CAN_J_KISAKU,
  CHIKEI_H_CHARISMA, CHIKEI_H_KYOJU, CHIKEI_H_NEKKETSU, HYORON_H_CHARISMA, HYORON_H_KYOJU, HYORON_H_NEKKETSU,
  ASSYUKU_H_CHARISMA, ASSYUKU_H_KYOJU, ASSYUKU_H_NEKKETSU,
  KANA_YURAI_E_POP, KANA_YURAI_E_YASASHI, HEIAN_E_E_POP, HEIAN_E_E_YASASHI, CHUGAKU_E_POP, CHUGAKU_E_YASASHI,
  TANI_J_DARK, TANI_J_KISAKU, CHIKYU_J_DARK, CHIKYU_J_KISAKU, DAIMEISHI_J_DARK, DAIMEISHI_J_KISAKU,
  CHIHO_H_CHARISMA, CHIHO_H_KYOJU, CHIHO_H_NEKKETSU, CHOSA_H_CHARISMA, CHOSA_H_KYOJU, CHOSA_H_NEKKETSU,
  SHI_H_CHARISMA, SHI_H_KYOJU, SHI_H_NEKKETSU,
  KANJI6_E_POP, KANJI6_E_YASASHI, CHUMON_E_POP, CHUMON_E_YASASHI, JOMON_E_POP, JOMON_E_YASASHI,
  GOI_J_DARK, GOI_J_KISAKU, GENDAI_SHAKAI_J_DARK, GENDAI_SHAKAI_J_KISAKU, EISAKUBUN_J_DARK, EISAKUBUN_J_KISAKU,
  CHIZAI_H_CHARISMA, CHIZAI_H_KYOJU, CHIZAI_H_NEKKETSU, H_JINKEN_H_CHARISMA, H_JINKEN_H_KYOJU, H_JINKEN_H_NEKKETSU,
  GIS_H_CHARISMA, GIS_H_KYOJU, GIS_H_NEKKETSU,
  KOTOBA_HENKA_E_POP, KOTOBA_HENKA_E_YASASHI, HINDO_E_POP, HINDO_E_YASASHI, KENPO_E_POP, KENPO_E_YASASHI,
  HANASU_J_DARK, HANASU_J_KISAKU, TAIRITSU_GOI_J_DARK, TAIRITSU_GOI_J_KISAKU, GIMONSHI_J_DARK, GIMONSHI_J_KISAKU,
  SHOSETSU_H_CHARISMA, SHOSETSU_H_KYOJU, SHOSETSU_H_NEKKETSU,
  COMPUTER_H_CHARISMA, COMPUTER_H_KYOJU, COMPUTER_H_NEKKETSU,
  ASUKA_H_CHARISMA, ASUKA_H_KYOJU, ASUKA_H_NEKKETSU,
  MONOGATARI_E_POP, MONOGATARI_E_YASASHI, HITO_E_POP, HITO_E_YASASHI, DENKI_E_POP, DENKI_E_YASASHI,
  KAKU_J_DARK, KAKU_J_KISAKU, JINKEN_J_DARK, JINKEN_J_KISAKU, IPPAN_J_DARK, IPPAN_J_KISAKU,
  JIZOKU_H_CHARISMA, JIZOKU_H_KYOJU, JIZOKU_H_NEKKETSU, JINKO_H_CHARISMA, JINKO_H_KYOJU, JINKO_H_NEKKETSU,
  SOSAKU_H_CHARISMA, SOSAKU_H_KYOJU, SOSAKU_H_NEKKETSU,
  BUNSU_TASHIHIKI_E_POP, BUNSU_TASHIHIKI_E_YASASHI, MEDAKA_E_POP, MEDAKA_E_YASASHI, SHOKURYO_E_POP, SHOKURYO_E_YASASHI,
  KAKURITSU_J_DARK, KAKURITSU_J_KISAKU, HIKARI_J_DARK, HIKARI_J_KISAKU, JODOSHI_J_DARK, JODOSHI_J_KISAKU,
  HE_JODOSHI_H_CHARISMA, HE_JODOSHI_H_KYOJU, HE_JODOSHI_H_NEKKETSU, HA_KAKURITSU_H_CHARISMA, HA_KAKURITSU_H_KYOJU, HA_KAKURITSU_H_NEKKETSU,
  NAMI_H_CHARISMA, NAMI_H_KYOJU, NAMI_H_NEKKETSU,
  E_SHOSU_KAKE_E_POP, E_SHOSU_KAKE_E_YASASHI, E_TOKEKATA_E_POP, E_TOKEKATA_E_YASASHI,
  E_KEIGO_E_POP, E_KEIGO_E_YASASHI,
  J_HEIHOKON_J_DARK, J_HEIHOKON_J_KISAKU, J_KEIGO_J_DARK, J_KEIGO_J_KISAKU, J_NIHON_SUGATA_J_DARK, J_NIHON_SUGATA_J_KISAKU,
  H_HEIAN_H_CHARISMA, H_HEIAN_H_KYOJU, H_HEIAN_H_NEKKETSU, H_KOTEN_KEIGO_H_CHARISMA, H_KOTEN_KEIGO_H_KYOJU, H_KOTEN_KEIGO_H_NEKKETSU,
  H_JISSU_H_CHARISMA, H_JISSU_H_KYOJU, H_JISSU_H_NEKKETSU,
  E_KOGYO_E_POP, E_KOGYO_E_YASASHI, E_DENRYU_E_POP, E_DENRYU_E_YASASHI, E_YOJIJUKUGO_E_POP, E_YOJIJUKUGO_E_YASASHI,
  J_ION_J_DARK, J_ION_J_KISAKU, J_THERE_J_DARK, J_THERE_J_KISAKU, J_EUROPE_J_DARK, J_EUROPE_J_KISAKU,
  H_GREECE_H_CHARISMA, H_GREECE_H_KYOJU, H_GREECE_H_NEKKETSU,
  H_DENRYU_H_CHARISMA, H_DENRYU_H_KYOJU, H_DENRYU_H_NEKKETSU,
  H_HIKAKU_H_CHARISMA, H_HIKAKU_H_KYOJU, H_HIKAKU_H_NEKKETSU,
  E_BAISU_YAKUSU_E_POP, E_BAISU_YAKUSU_E_YASASHI, E_TENKI5_E_POP, E_TENKI5_E_YASASHI, E_KOKUREN_E_POP, E_KOKUREN_E_YASASHI,
  J_ICHIJI_KANSU_J_DARK, J_ICHIJI_KANSU_J_KISAKU, J_KISHO_J_DARK, J_KISHO_J_KISAKU, J_KOBUN1_J_DARK, J_KOBUN1_J_KISAKU,
  H_KEIYAKU_H_CHARISMA, H_KEIYAKU_H_KYOJU, H_KEIYAKU_H_NEKKETSU,
  E_DATA6_E_POP, E_DATA6_E_YASASHI,
  J_JISHIN_J_DARK, J_JISHIN_J_KISAKU, J_KAKOKEI_J_DARK, J_KAKOKEI_J_KISAKU, J_ASIA_J_DARK, J_ASIA_J_KISAKU,
  H_ENERGY_H_CHARISMA, H_ENERGY_H_KYOJU, H_ENERGY_H_NEKKETSU,
  H_BAAI_H_CHARISMA, H_BAAI_H_KYOJU, H_BAAI_H_NEKKETSU,
  H_KANSHI_H_CHARISMA, H_KANSHI_H_KYOJU, H_KANSHI_H_NEKKETSU,
  E_TOCHI_E_POP, E_TOCHI_E_YASASHI,
  J_DATA1_J_DARK, J_DATA1_J_KISAKU,
  H_ISLAM_H_CHARISMA, H_ISLAM_H_KYOJU, H_ISLAM_H_NEKKETSU,
  E_KEIGO_E_POP, E_KEIGO_E_YASASHI, E_WAGO_E_POP, E_WAGO_E_YASASHI,
  J_SHOKUBUTSU_J_DARK, J_SHOKUBUTSU_J_KISAKU,
  H_OTO_H_CHARISMA, H_OTO_H_KYOJU, H_OTO_H_NEKKETSU,
  E_ICHI_E_POP, E_ICHI_E_YASASHI, E_SETSUMEI_E_POP, E_SETSUMEI_E_YASASHI, E_KUNIGUNI_E_POP, E_KUNIGUNI_E_YASASHI,
  J_KANBUN1_J_DARK, J_KANBUN1_J_KISAKU, J_KENPO_J_DARK, J_KENPO_J_KISAKU,
  J_LISTENING1_J_DARK, J_LISTENING1_J_KISAKU,
  H_INFO_DATA_H_CHARISMA, H_INFO_DATA_H_KYOJU, H_INFO_DATA_H_NEKKETSU,
  H_JISA_H_CHARISMA, H_JISA_H_KYOJU, H_JISA_H_NEKKETSU,
  H_KENPO_H_CHARISMA, H_KENPO_H_KYOJU, H_KENPO_H_NEKKETSU,
  E_IKITAI_E_POP, E_IKITAI_E_YASASHI, E_SHI_E_POP, E_SHI_E_YASASHI, E_KURASHI_SEIJI_E_POP, E_KURASHI_SEIJI_E_YASASHI,
  J_KANJI1_J_DARK, J_KANJI1_J_KISAKU, J_KIGYO_J_DARK, J_KIGYO_J_KISAKU,
  J_MEIREI1_J_DARK, J_MEIREI1_J_KISAKU,
  H_DESIGN_H_CHARISMA, H_DESIGN_H_KYOJU, H_DESIGN_H_NEKKETSU,
  H_KANKYO_H_CHARISMA, H_KANKYO_H_KYOJU, H_KANKYO_H_NEKKETSU,
  H_BUNKEI_H_CHARISMA, H_BUNKEI_H_KYOJU, H_BUNKEI_H_NEKKETSU,
  J_MONOGATARI1_J_DARK, J_MONOGATARI1_J_KISAKU, J_KINYU_J_DARK, J_KINYU_J_KISAKU,
  J_MEISHI1_J_DARK, J_MEISHI1_J_KISAKU,
  H_DIGITAL_H_CHARISMA, H_DIGITAL_H_KYOJU, H_DIGITAL_H_NEKKETSU,
  H_KINYU_H_CHARISMA, H_KINYU_H_KYOJU, H_KINYU_H_NEKKETSU,
  H_KIKO_H_CHARISMA, H_KIKO_H_KYOJU, H_KIKO_H_NEKKETSU,
  E_JIKOSHOKAI_E_POP, E_JIKOSHOKAI_E_YASASHI, E_ZUIHITSU_E_POP, E_ZUIHITSU_E_YASASHI,
  E_MUROMACHI_E_POP, E_MUROMACHI_E_YASASHI,
  J_SETSUMEI_J_DARK, J_SETSUMEI_J_KISAKU, J_KOKKAI_J_DARK, J_KOKKAI_J_KISAKU,
  J_ONSEI_J_DARK, J_ONSEI_J_KISAKU,
  H_TANKA_H_CHARISMA, H_TANKA_H_KYOJU, H_TANKA_H_NEKKETSU,
  H_INFO_HYOGEN_H_CHARISMA, H_INFO_HYOGEN_H_KYOJU, H_INFO_HYOGEN_H_NEKKETSU,
  H_BAKUMATSU_H_CHARISMA, H_BAKUMATSU_H_KYOJU, H_BAKUMATSU_H_NEKKETSU,
  E_KAKO_E_POP, E_KAKO_E_YASASHI, E_BUN_KUMITATE_E_POP, E_BUN_KUMITATE_E_YASASHI,
  E_KANKYO_E_POP, E_KANKYO_E_YASASHI,
  J_SHI_J_DARK, J_SHI_J_KISAKU, J_KOKUSAI_J_DARK, J_KOKUSAI_J_KISAKU,
  J_SHINKOKEI_J_DARK, J_SHINKOKEI_J_KISAKU,
  H_BUNSHI_H_CHARISMA, H_BUNSHI_H_KYOJU, H_BUNSHI_H_NEKKETSU,
  H_KOKUSAI_KEIZAI_H_CHARISMA, H_KOKUSAI_KEIZAI_H_KYOJU, H_KOKUSAI_KEIZAI_H_NEKKETSU,
  H_MUSUBI_H_CHARISMA, H_MUSUBI_H_KYOJU, H_MUSUBI_H_NEKKETSU,
  E_KYOKA_E_POP, E_KYOKA_E_YASASHI, E_DENKI5_E_POP, E_DENKI5_E_YASASHI,
  E_SEIJI_E_POP, E_SEIJI_E_YASASHI,
  J_FUZOKU_J_DARK, J_FUZOKU_J_KISAKU, J_NAIKAKU_J_DARK, J_NAIKAKU_J_KISAKU,
  J_TANGO_J_DARK, J_TANGO_J_KISAKU,
  H_KOBUN_JODOSHI_H_CHARISMA, H_KOBUN_JODOSHI_H_KYOJU, H_KOBUN_JODOSHI_H_NEKKETSU,
  H_INFO_MEDIA_H_CHARISMA, H_INFO_MEDIA_H_KYOJU, H_INFO_MEDIA_H_NEKKETSU,
  H_EDO_DOYO_H_CHARISMA, H_EDO_DOYO_H_KYOJU, H_EDO_DOYO_H_NEKKETSU,
  E_OMOIDE_E_POP, E_OMOIDE_E_YASASHI, E_DOUON_E_POP, E_DOUON_E_YASASHI,
  E_SHOKUBUTSU_E_POP, E_SHOKUBUTSU_E_YASASHI,
  J_YOGEN_J_DARK, J_YOGEN_J_KISAKU, J_SAIBANSHO_J_DARK, J_SAIBANSHO_J_KISAKU,
  J_BUNKEI_J_DARK, J_BUNKEI_J_KISAKU,
  H_BUNSHIKOBUN_H_CHARISMA, H_BUNSHIKOBUN_H_KYOJU, H_BUNSHIKOBUN_H_NEKKETSU,
  H_KOKUSAI_SEIJI_H_CHARISMA, H_KOKUSAI_SEIJI_H_KYOJU, H_KOKUSAI_SEIJI_H_NEKKETSU,
  H_SHIGEN_H_CHARISMA, H_SHIGEN_H_KYOJU, H_SHIGEN_H_NEKKETSU,
  E_OTO_MOJI_E_POP, E_OTO_MOJI_E_YASASHI, E_HOUKOKU_E_POP, E_HOUKOKU_E_YASASHI,
  E_SEKAI_E_POP, E_SEKAI_E_YASASHI,
  J_GOI2_J_DARK, J_GOI2_J_KISAKU, J_SENKYO_J_DARK, J_SENKYO_J_KISAKU,
  J_DOMEISHI_J_DARK, J_DOMEISHI_J_KISAKU,
  H_KINDAI_H_CHARISMA, H_KINDAI_H_KYOJU, H_KINDAI_H_NEKKETSU,
  H_MODEL_H_CHARISMA, H_MODEL_H_KYOJU, H_MODEL_H_NEKKETSU,
  H_EDO_KEIZAI_H_CHARISMA, H_EDO_KEIZAI_H_KYOJU, H_EDO_KEIZAI_H_NEKKETSU,
  E_TANJOBI_E_POP, E_TANJOBI_E_YASASHI, E_JUKUGO_E_POP, E_JUKUGO_E_YASASHI,
  E_TSUKI_TAIYO_E_POP, E_TSUKI_TAIYO_E_YASASHI,
  J_HANASU2_J_DARK, J_HANASU2_J_KISAKU, J_SHAKAI_HOSHO_J_DARK, J_SHAKAI_HOSHO_J_KISAKU,
  J_EISAKUBUN2_J_DARK, J_EISAKUBUN2_J_KISAKU,
  H_DAIMEISHI_H_CHARISMA, H_DAIMEISHI_H_KYOJU, H_DAIMEISHI_H_NEKKETSU,
  H_RODO_H_CHARISMA, H_RODO_H_KYOJU, H_RODO_H_NEKKETSU,
  H_SHUKYO_H_CHARISMA, H_SHUKYO_H_KYOJU, H_SHUKYO_H_NEKKETSU,
  E_YUME_E_POP, E_YUME_E_YASASHI, E_SENGO_E_POP, E_SENGO_E_YASASHI,
  E_KANJI5_E_POP, E_KANJI5_E_YASASHI,
  J_IKENBUN_J_DARK, J_IKENBUN_J_KISAKU, J_BUSSHITSU_J_DARK, J_BUSSHITSU_J_KISAKU,
  J_SHIJO_J_DARK, J_SHIJO_J_KISAKU,
  H_KOBUN_DOKKAI_H_CHARISMA, H_KOBUN_DOKKAI_H_KYOJU, H_KOBUN_DOKKAI_H_NEKKETSU,
  H_INFO_MORAL_H_CHARISMA, H_INFO_MORAL_H_KYOJU, H_INFO_MORAL_H_NEKKETSU,
  H_GENDAI_H_CHARISMA, H_GENDAI_H_KYOJU, H_GENDAI_H_NEKKETSU,
  E_AISATSU_E_POP, E_AISATSU_E_YASASHI, E_HITO5_E_POP, E_HITO5_E_YASASHI,
  E_SENSO_E_POP, E_SENSO_E_YASASHI,
  J_KANJI2_J_DARK, J_KANJI2_J_KISAKU, J_KAKO_SHINKO_J_DARK, J_KAKO_SHINKO_J_KISAKU,
  J_CHIKARA_J_DARK, J_CHIKARA_J_KISAKU,
  H_DOMEISHI_H_CHARISMA, H_DOMEISHI_H_KYOJU, H_DOMEISHI_H_NEKKETSU,
  H_SEINEN_H_CHARISMA, H_SEINEN_H_KYOJU, H_SEINEN_H_NEKKETSU,
  H_TOSHI_H_CHARISMA, H_TOSHI_H_KYOJU, H_TOSHI_H_NEKKETSU,
  E_KOMOJI_E_POP, E_KOMOJI_E_YASASHI,
  E_KOTEN5_E_POP, E_KOTEN5_E_YASASHI,
  E_MI5_E_POP, E_MI5_E_YASASHI,
  J_KANSHI2_J_DARK, J_KANSHI2_J_KISAKU, J_SHOHI_J_DARK, J_SHOHI_J_KISAKU,
  J_LISTENING2_J_DARK, J_LISTENING2_J_KISAKU,
  H_KOBUN_NYUMON_H_CHARISMA, H_KOBUN_NYUMON_H_KYOJU, H_KOBUN_NYUMON_H_NEKKETSU,
  H_NETWORK_H_CHARISMA, H_NETWORK_H_KYOJU, H_NETWORK_H_NEKKETSU,
  H_JP_GENSHI_H_CHARISMA, H_JP_GENSHI_H_KYOJU, H_JP_GENSHI_H_NEKKETSU,
  E_OOMOJI_E_POP, E_OOMOJI_E_YASASHI,
  E_TENKA_E_POP, E_TENKA_E_YASASHI,
  E_MONOGATARI5_E_POP, E_MONOGATARI5_E_YASASHI,
  J_KOBUN2_J_DARK, J_KOBUN2_J_KISAKU, J_CHISO_J_DARK, J_CHISO_J_KISAKU,
  J_ZAISEI_J_DARK, J_ZAISEI_J_KISAKU,
  H_KANFUKU_H_CHARISMA, H_KANFUKU_H_KYOJU, H_KANFUKU_H_NEKKETSU,
  H_SHISO_H_CHARISMA, H_SHISO_H_KYOJU, H_SHISO_H_NEKKETSU,
  H_AMERICA_H_CHARISMA, H_AMERICA_H_KYOJU, H_AMERICA_H_NEKKETSU,
  E_HOSHII_E_POP, E_HOSHII_E_YASASHI,
  E_AMAMIZU_E_POP, E_AMAMIZU_E_YASASHI,
  E_BOEKI_E_POP, E_BOEKI_E_YASASHI,
  J_SETSUMEI2_J_DARK, J_SETSUMEI2_J_KISAKU, J_SETSUZOKUSHI_J_DARK, J_SETSUZOKUSHI_J_KISAKU,
  J_DOBUTSU_BUNRUI_J_DARK, J_DOBUTSU_BUNRUI_J_KISAKU,
  H_KOBUN_TANGO_H_CHARISMA, H_KOBUN_TANGO_H_KYOJU, H_KOBUN_TANGO_H_NEKKETSU,
  H_PROGRAM_H_CHARISMA, H_PROGRAM_H_KYOJU, H_PROGRAM_H_NEKKETSU,
  H_INSEI_H_CHARISMA, H_INSEI_H_KYOJU, H_INSEI_H_NEKKETSU,
  E_IRO_KATACHI_E_POP, E_IRO_KATACHI_E_YASASHI,
  E_SETSUMEI5_E_POP, E_SETSUMEI5_E_YASASHI,
  E_ATATAMARI_E_POP, E_ATATAMARI_E_YASASHI,
  J_SHOSETSU2_J_DARK, J_SHOSETSU2_J_KISAKU, J_AFRICA_J_DARK, J_AFRICA_J_KISAKU,
  J_TANGO2_J_DARK, J_TANGO2_J_KISAKU,
  H_KANRYO_H_CHARISMA, H_KANRYO_H_KYOJU, H_KANRYO_H_NEKKETSU,
  H_TOSEI_H_CHARISMA, H_TOSEI_H_KYOJU, H_TOSEI_H_NEKKETSU,
  H_TANKYU_CHIKEI_H_CHARISMA, H_TANKYU_CHIKEI_H_KYOJU, H_TANKYU_CHIKEI_H_NEKKETSU,
  E_JIKOKU_E_POP, E_JIKOKU_E_YASASHI, E_BOSAI_E_POP, E_BOSAI_E_YASASHI, E_SHI5_E_POP, E_SHI5_E_YASASHI,
  J_TANKA2_J_DARK, J_TANKA2_J_KISAKU, J_JOTAI_J_DARK, J_JOTAI_J_KISAKU,
  J_CHIIKI_CHOSA_J_DARK, J_CHIIKI_CHOSA_J_KISAKU,
  H_KOJI_H_CHARISMA, H_KOJI_H_KYOJU, H_KOJI_H_NEKKETSU,
  H_INFO_SYSTEM_H_CHARISMA, H_INFO_SYSTEM_H_KYOJU, H_INFO_SYSTEM_H_NEKKETSU,
  H_KODO_H_CHARISMA, H_KODO_H_KYOJU, H_KODO_H_NEKKETSU,
  E_KAZU_E_POP, E_KAZU_E_YASASHI, E_HONE_E_POP, E_HONE_E_YASASHI, E_CHIKEI_E_POP, E_CHIKEI_E_YASASHI,
  J_BUNPO3_J_DARK, J_BUNPO3_J_KISAKU, J_BUNSHI3_J_DARK, J_BUNSHI3_J_KISAKU,
  J_KAZAN_J_DARK, J_KAZAN_J_KISAKU,
  H_KEIYOSHI_H_CHARISMA, H_KEIYOSHI_H_KYOJU, H_KEIYOSHI_H_NEKKETSU,
  H_RINRI_BUKKYO_H_CHARISMA, H_RINRI_BUKKYO_H_KYOJU, H_RINRI_BUKKYO_H_NEKKETSU,
  H_TANKYU_EUROPE_H_CHARISMA, H_TANKYU_EUROPE_H_KYOJU, H_TANKYU_EUROPE_H_NEKKETSU,
  E_SUISEN_E_POP, E_SUISEN_E_YASASHI, E_MI_NO_MAWARI_E_POP, E_MI_NO_MAWARI_E_YASASHI, E_KISETSU_E_POP, E_KISETSU_E_YASASHI,
  J_GOI3_J_DARK, J_GOI3_J_KISAKU, J_CHUBU_J_DARK, J_CHUBU_J_KISAKU,
  J_CHOBUN3_J_DARK, J_CHOBUN3_J_KISAKU,
  H_KUNDOKU_H_CHARISMA, H_KUNDOKU_H_KYOJU, H_KUNDOKU_H_NEKKETSU,
  H_KOFUN_H_CHARISMA, H_KOFUN_H_KYOJU, H_KOFUN_H_NEKKETSU,
  H_MEISHI_H_CHARISMA, H_MEISHI_H_KYOJU, H_MEISHI_H_NEKKETSU,
  E_JOHO_E_POP, E_JOHO_E_YASASHI, E_BUN_KUMITATE4_E_POP, E_BUN_KUMITATE4_E_YASASHI, E_MICHI_E_POP, E_MICHI_E_YASASHI,
  J_HAIKU3_J_DARK, J_HAIKU3_J_KISAKU, J_KITAI_J_DARK, J_KITAI_J_KISAKU,
  J_CHUGOKU_SHIKOKU_J_DARK, J_CHUGOKU_SHIKOKU_J_KISAKU,
  H_RINRI_CHINA_H_CHARISMA, H_RINRI_CHINA_H_KYOJU, H_RINRI_CHINA_H_NEKKETSU,
  H_TANKYU_HIGASHIASIA_H_CHARISMA, H_TANKYU_HIGASHIASIA_H_KYOJU, H_TANKYU_HIGASHIASIA_H_NEKKETSU,
  H_SAIDOKU_H_CHARISMA, H_SAIDOKU_H_KYOJU, H_SAIDOKU_H_NEKKETSU,
  E_KUKI_MIZU_E_POP, E_KUKI_MIZU_E_YASASHI, E_KIKO_E_POP, E_KIKO_E_YASASHI,
  E_DOUON4_E_POP, E_DOUON4_E_YASASHI,
  J_HANASU3_J_DARK, J_HANASU3_J_KISAKU, J_EISAKUBUN3_J_DARK, J_EISAKUBUN3_J_KISAKU, J_OTO_J_DARK, J_OTO_J_KISAKU,
  H_MUROMACHI_H_CHARISMA, H_MUROMACHI_H_KYOJU, H_MUROMACHI_H_NEKKETSU,
  H_SETSUZOKUSHI_H_CHARISMA, H_SETSUZOKUSHI_H_KYOJU, H_SETSUZOKUSHI_H_NEKKETSU,
  H_RINRI_CHRIST_H_CHARISMA, H_RINRI_CHRIST_H_KYOJU, H_RINRI_CHRIST_H_NEKKETSU,
  E_SUKI_E_POP, E_SUKI_E_YASASHI, E_ONDO_E_POP, E_ONDO_E_YASASHI, E_KOGAI_E_POP, E_KOGAI_E_YASASHI,
  J_HIHYO3_J_DARK, J_HIHYO3_J_KISAKU, J_HOKKAIDO_J_DARK, J_HOKKAIDO_J_KISAKU, J_FUTEISHI3_J_DARK, J_FUTEISHI3_J_KISAKU,
  H_TANKYU_JINKO_H_CHARISMA, H_TANKYU_JINKO_H_KYOJU, H_TANKYU_JINKO_H_NEKKETSU,
  H_SHIIKA_H_CHARISMA, H_SHIIKA_H_KYOJU, H_SHIIKA_H_NEKKETSU,
  H_NARA_H_CHARISMA, H_NARA_H_KYOJU, H_NARA_H_NEKKETSU,
  E_IKEN4_E_POP, E_IKEN4_E_YASASHI, E_YOUBI_TENKI_E_POP, E_YOUBI_TENKI_E_YASASHI, E_SUGATA_E_POP, E_SUGATA_E_YASASHI,
  J_KANBUN3_J_DARK, J_KANBUN3_J_KISAKU, J_SHOKUBUTSU_BUNRUI_J_DARK, J_SHOKUBUTSU_BUNRUI_J_KISAKU, J_KANTO_J_DARK, J_KANTO_J_KISAKU,
  H_TOKUSHU_H_CHARISMA, H_TOKUSHU_H_KYOJU, H_TOKUSHU_H_NEKKETSU,
  H_RINRI_GENDAI_H_CHARISMA, H_RINRI_GENDAI_H_KYOJU, H_RINRI_GENDAI_H_NEKKETSU,
  H_TANKYU_KIKO_H_CHARISMA, H_TANKYU_KIKO_H_KYOJU, H_TANKYU_KIKO_H_NEKKETSU,
  E_KURASHI5_E_POP, E_KURASHI5_E_YASASHI, E_KANJI4_E_POP, E_KANJI4_E_YASASHI, E_TENKI4_E_POP, E_TENKI4_E_YASASHI,
  J_KANJI3_J_DARK, J_KANJI3_J_KISAKU, J_KANRYO_SHINKO_J_DARK, J_KANRYO_SHINKO_J_KISAKU, J_SUIYOEKI_J_DARK, J_SUIYOEKI_J_KISAKU,
  H_YOGEN_H_CHARISMA, H_YOGEN_H_KYOJU, H_YOGEN_H_NEKKETSU, H_NICHIRO_H_CHARISMA, H_NICHIRO_H_KYOJU, H_NICHIRO_H_NEKKETSU,
  H_WAHO_H_CHARISMA, H_WAHO_H_KYOJU, H_WAHO_H_NEKKETSU,
  E_SEKAI5_E_POP, E_SEKAI5_E_YASASHI, E_KANJI_JITEN_E_POP, E_KANJI_JITEN_E_YASASHI, E_YUKUE_E_POP, E_YUKUE_E_YASASHI,
  J_KOBUN3_J_DARK, J_KOBUN3_J_KISAKU, J_KINKI_J_DARK, J_KINKI_J_KISAKU, J_KANSETSU_J_DARK, J_KANSETSU_J_KISAKU,
  H_RINRI_GREECE_H_CHARISMA, H_RINRI_GREECE_H_KYOJU, H_RINRI_GREECE_H_NEKKETSU,
  H_TANKYU_KOGYO_H_CHARISMA, H_TANKYU_KOGYO_H_KYOJU, H_TANKYU_KOGYO_H_NEKKETSU,
  H_GEN_GOI_H_CHARISMA, H_GEN_GOI_H_KYOJU, H_GEN_GOI_H_NEKKETSU,
  E_SHINRIN_E_POP, E_SHINRIN_E_YASASHI, E_KANYOKU_E_POP, E_KANYOKU_E_YASASHI, E_DENKI3_E_POP, E_DENKI3_E_YASASHI,
  J_RONSETSU3_J_DARK, J_RONSETSU3_J_KISAKU,
  J_GENSHI2_J_DARK, J_GENSHI2_J_KISAKU,
  J_KYUSHU_J_DARK, J_KYUSHU_J_KISAKU,
  H_SENRYO_H_CHARISMA, H_SENRYO_H_KYOJU, H_SENRYO_H_NEKKETSU,
  H_ZENCHISHI_H_CHARISMA, H_ZENCHISHI_H_KYOJU, H_ZENCHISHI_H_NEKKETSU,
  H_RINRI_ISLAM_H_CHARISMA, H_RINRI_ISLAM_H_KYOJU, H_RINRI_ISLAM_H_NEKKETSU,
  E_SUISAN5_E_POP, E_SUISAN5_E_YASASHI, E_KOJI4_E_POP, E_KOJI4_E_YASASHI, E_HIKARI3_E_POP, E_HIKARI3_E_YASASHI,
  J_SHOSETSU3_J_DARK, J_SHOSETSU3_J_KISAKU, J_KATEI_J_DARK, J_KATEI_J_KISAKU, J_HAKOHIGE_J_DARK, J_HAKOHIGE_J_KISAKU,
  H_KOKKA_H_CHARISMA, H_KOKKA_H_KYOJU, H_KOKKA_H_NEKKETSU,
  H_HANASU_H_CHARISMA, H_HANASU_H_KYOJU, H_HANASU_H_NEKKETSU,
  H_SENSO_H_CHARISMA, H_SENSO_H_KYOJU, H_SENSO_H_NEKKETSU,
  E_DENTO4_E_POP, E_DENTO4_E_YASASHI, E_MONOGATARI4_E_POP, E_MONOGATARI4_E_YASASHI, E_JISHAKU3_E_POP, E_JISHAKU3_E_YASASHI,
  J_NIHON_KISHO_J_DARK, J_NIHON_KISHO_J_KISAKU, J_NIHON_TOKUSHOKU_J_DARK, J_NIHON_TOKUSHOKU_J_KISAKU, J_LISTENING3_J_DARK, J_LISTENING3_J_KISAKU,
  H_CHOBUN_H_CHARISMA, H_CHOBUN_H_KYOJU, H_CHOBUN_H_NEKKETSU,
  H_RINRI_JITSUZON_H_CHARISMA, H_RINRI_JITSUZON_H_KYOJU, H_RINRI_JITSUZON_H_NEKKETSU,
  H_TANKYU_KOTSU_H_CHARISMA, H_TANKYU_KOTSU_H_KYOJU, H_TANKYU_KOTSU_H_NEKKETSU,
  E_GOMI4_E_POP, E_GOMI4_E_YASASHI, E_OKURIGANA4_E_POP, E_OKURIGANA4_E_YASASHI, E_KAZE_GOMU3_E_POP, E_KAZE_GOMU3_E_YASASHI,
  J_HEIKO_GODO_J_DARK, J_HEIKO_GODO_J_KISAKU, J_SHIGEKI_J_DARK, J_SHIGEKI_J_KISAKU, J_NORTH_AMERICA_J_DARK, J_NORTH_AMERICA_J_KISAKU,
  H_HOKOKU_H_CHARISMA, H_HOKOKU_H_KYOJU, H_HOKOKU_H_NEKKETSU,
  H_SHOKUHO_H_CHARISMA, H_SHOKUHO_H_KYOJU, H_SHOKUHO_H_NEKKETSU,
  H_JIYU_H_CHARISMA, H_JIYU_H_KYOJU, H_JIYU_H_NEKKETSU,
  E_KEN4_E_POP, E_KEN4_E_YASASHI, E_SETSUMEI4_E_POP, E_SETSUMEI4_E_YASASHI, E_KONCHU3_E_POP, E_KONCHU3_E_YASASHI,
  J_TANGO3_J_DARK, J_TANGO3_J_KISAKU, J_RENRITSU_J_DARK, J_RENRITSU_J_KISAKU, J_SHITSURYO_J_DARK, J_SHITSURYO_J_KISAKU,
  H_RINRI_JOHO_H_CHARISMA, H_RINRI_JOHO_H_KYOJU, H_RINRI_JOHO_H_NEKKETSU,
  H_TANKYU_MINAMIASIA_H_CHARISMA, H_TANKYU_MINAMIASIA_H_KYOJU, H_TANKYU_MINAMIASIA_H_NEKKETSU,
  H_GEN_IKEN_H_CHARISMA, H_GEN_IKEN_H_KYOJU, H_GEN_IKEN_H_NEKKETSU,
  E_MIZU4_E_POP, E_MIZU4_E_YASASHI, E_SHI4_E_POP, E_SHI4_E_YASASHI, E_OMOSA3_E_POP, E_OMOSA3_E_YASASHI,
  J_OCEANIA_J_DARK, J_OCEANIA_J_KISAKU, J_SANKAKU_SHIKAKU_J_DARK, J_SANKAKU_SHIKAKU_J_KISAKU, J_CHUWA_J_DARK, J_CHUWA_J_KISAKU,
  H_TAISHO_H_CHARISMA, H_TAISHO_H_KYOJU, H_TAISHO_H_NEKKETSU,
  H_LISTENING_H_CHARISMA, H_LISTENING_H_KYOJU, H_LISTENING_H_NEKKETSU,
  H_RINRI_KANKYO_H_CHARISMA, H_RINRI_KANKYO_H_KYOJU, H_RINRI_KANKYO_H_NEKKETSU,
  E_SAIGAI4_E_POP, E_SAIGAI4_E_YASASHI, E_SHINBUN4_E_POP, E_SHINBUN4_E_YASASHI, E_OTO3_E_POP, E_OTO3_E_YASASHI,
  J_SEIKATSU_J_DARK, J_SEIKATSU_J_KISAKU, J_SHIKI_J_DARK, J_SHIKI_J_KISAKU, J_DENCHI_J_DARK, J_DENCHI_J_KISAKU,
  H_MINZOKU_H_CHARISMA, H_MINZOKU_H_KYOJU, H_MINZOKU_H_NEKKETSU,
  H_GEN_JITSUYO_H_CHARISMA, H_GEN_JITSUYO_H_KYOJU, H_GEN_JITSUYO_H_NEKKETSU,
  H_SOGO_18C_H_CHARISMA, H_SOGO_18C_H_KYOJU, H_SOGO_18C_H_NEKKETSU,
  E_SAIGAI4_E_POP, E_SAIGAI4_E_YASASHI, E_SENJIN4_E_POP, E_SENJIN4_E_YASASHI, E_TANKA4_E_POP, E_TANKA4_E_YASASHI, E_SHIZEN3_E_POP, E_SHIZEN3_E_YASASHI, E_SHINBUN4_E_POP, E_SHINBUN4_E_YASASHI, E_OTO3_E_POP, E_OTO3_E_YASASHI,
  J_SEKAI_SUGATA_J_DARK, J_SEKAI_SUGATA_J_KISAKU, J_EN3_J_DARK, J_EN3_J_KISAKU, J_GORYOKU_J_DARK, J_GORYOKU_J_KISAKU,
  H_SPEAKING_H_CHARISMA, H_SPEAKING_H_KYOJU, H_SPEAKING_H_NEKKETSU,
  H_RINRI_KANT_H_CHARISMA, H_RINRI_KANT_H_KYOJU, H_RINRI_KANT_H_NEKKETSU,
  H_TANKYU_NIHON_H_CHARISMA, H_TANKYU_NIHON_H_KYOJU, H_TANKYU_NIHON_H_NEKKETSU,
  E_TODOFUKEN4_E_POP, E_TODOFUKEN4_E_YASASHI, E_HAIKU3_E_POP, E_HAIKU3_E_YASASHI, E_SHOKUBUTSU3_E_POP, E_SHOKUBUTSU3_E_YASASHI,
  J_SOUTH_AMERICA_J_DARK, J_SOUTH_AMERICA_J_KISAKU, J_HYOHON_J_DARK, J_HYOHON_J_KISAKU, J_IDEN_J_DARK, J_IDEN_J_KISAKU,
  H_KANJI_H_CHARISMA, H_KANJI_H_KYOJU, H_KANJI_H_NEKKETSU,
  H_DATSU_H_CHARISMA, H_DATSU_H_KYOJU, H_DATSU_H_NEKKETSU,
  H_WABUN_H_CHARISMA, H_WABUN_H_KYOJU, H_WABUN_H_NEKKETSU,
  E_TOKUSHOKU4_E_POP, E_TOKUSHOKU4_E_YASASHI, E_HEN_TSUKURI3_E_POP, E_HEN_TSUKURI3_E_YASASHI, E_TAIYO3_E_POP, E_TAIYO3_E_YASASHI,
  J_TOHOKU_J_DARK, J_TOHOKU_J_KISAKU, J_KANSU_AX2_J_DARK, J_KANSU_AX2_J_KISAKU, J_KAGAKU_GIJUTSU_J_DARK, J_KAGAKU_GIJUTSU_J_KISAKU,
  H_KEIKEN_H_CHARISMA, H_KEIKEN_H_KYOJU, H_KEIKEN_H_NEKKETSU,
  H_NISHIASIA_H_CHARISMA, H_NISHIASIA_H_KYOJU, H_NISHIASIA_H_NEKKETSU,
  H_RONRI_H_CHARISMA, H_RONRI_H_KYOJU, H_RONRI_H_NEKKETSU,
  E_CHIZU3_E_POP, E_CHIZU3_E_YASASHI, E_HOUKOKU3_E_POP, E_HOUKOKU3_E_YASASHI, E_BUNSU_KAKE6_E_POP, E_BUNSU_KAKE6_E_YASASHI,
  J_BUNMEI_J_DARK, J_BUNMEI_J_KISAKU, J_NIJI_HOTEISHIKI_J_DARK, J_NIJI_HOTEISHIKI_J_KISAKU, J_SAIBO_BUNRETSU_J_DARK, J_SAIBO_BUNRETSU_J_KISAKU,
  H_GLOBAL_H_CHARISMA, H_GLOBAL_H_KYOJU, H_GLOBAL_H_NEKKETSU,
  H_VOCAB_H_CHARISMA, H_VOCAB_H_KYOJU, H_VOCAB_H_NEKKETSU,
  H_RINRI_KEIYAKU_H_CHARISMA, H_RINRI_KEIYAKU_H_KYOJU, H_RINRI_KEIYAKU_H_NEKKETSU,
  E_KEISATSU3_E_POP, E_KEISATSU3_E_YASASHI, E_JISHO3_E_POP, E_JISHO3_E_YASASHI, E_KAKUCHU6_E_POP, E_KAKUCHU6_E_YASASHI,
  J_EDO_TENKAI_J_DARK, J_EDO_TENKAI_J_KISAKU, J_SEITAIKEI_J_DARK, J_SEITAIKEI_J_KISAKU, J_SANHEIHO_J_DARK, J_SANHEIHO_J_KISAKU,
  H_NOGYO_H_CHARISMA, H_NOGYO_H_KYOJU, H_NOGYO_H_NEKKETSU,
  H_KOTEN_GENTEI_H_CHARISMA, H_KOTEN_GENTEI_H_KYOJU, H_KOTEN_GENTEI_H_NEKKETSU,
  H_SOGO_KAKUMEI_H_CHARISMA, H_SOGO_KAKUMEI_H_KYOJU, H_SOGO_KAKUMEI_H_NEKKETSU,
  E_MACHI3_E_POP, E_MACHI3_E_YASASHI, E_KANJI3_E_POP, E_KANJI3_E_YASASHI, E_NARABEKATA6_E_POP, E_NARABEKATA6_E_YASASHI,
  J_HIST_GENDAI_J_DARK, J_HIST_GENDAI_J_KISAKU, J_SHIGOTO_J_DARK, J_SHIGOTO_J_KISAKU, J_SOJII_J_DARK, J_SOJII_J_KISAKU,
  H_HATSUON_H_CHARISMA, H_HATSUON_H_KYOJU, H_HATSUON_H_NEKKETSU,
  H_RINRI_KINDAI_NIHON_H_CHARISMA, H_RINRI_KINDAI_NIHON_H_KYOJU, H_RINRI_KINDAI_NIHON_H_NEKKETSU,
  H_TANKYU_OCEANIA_H_CHARISMA, H_TANKYU_OCEANIA_H_KYOJU, H_TANKYU_OCEANIA_H_NEKKETSU,
  E_MISE3_E_POP, E_MISE3_E_YASASHI, E_KOSOADO3_E_POP, E_KOSOADO3_E_YASASHI, E_OYOSO6_E_POP, E_OYOSO6_E_YASASHI,
  J_KAIKOKU_J_DARK, J_KAIKOKU_J_KISAKU, J_SHINKA_J_DARK, J_SHINKA_J_KISAKU, J_TENKAI_J_DARK, J_TENKAI_J_KISAKU,
  H_KOTEN_GIMON_H_CHARISMA, H_KOTEN_GIMON_H_KYOJU, H_KOTEN_GIMON_H_NEKKETSU,
  H_SOGO_KODO_H_CHARISMA, H_SOGO_KODO_H_KYOJU, H_SOGO_KODO_H_NEKKETSU,
  H_VOCAB_JUKUGO_H_CHARISMA, H_VOCAB_JUKUGO_H_KYOJU, H_VOCAB_JUKUGO_H_NEKKETSU,
  E_SEISAN3_E_POP, E_SEISAN3_E_YASASHI, E_KOTOWAZA3_E_POP, E_KOTOWAZA3_E_YASASHI, E_TAISHO6_E_POP, E_TAISHO6_E_YASASHI,
  J_KODAI_KOKKA_J_DARK, J_KODAI_KOKKA_J_KISAKU, J_SUIATSU_J_DARK, J_SUIATSU_J_KISAKU,
  H_RINRI_KORI_H_CHARISMA, H_RINRI_KORI_H_KYOJU, H_RINRI_KORI_H_NEKKETSU,
  H_TANKYU_RUSSIA_H_CHARISMA, H_TANKYU_RUSSIA_H_KYOJU, H_TANKYU_RUSSIA_H_NEKKETSU,
  H_KOTEN_HIKAKU_H_CHARISMA, H_KOTEN_HIKAKU_H_KYOJU, H_KOTEN_HIKAKU_H_NEKKETSU,
  E_SHOBO3_E_POP, E_SHOBO3_E_YASASHI, E_MONOGATARI3_E_POP, E_MONOGATARI3_E_YASASHI, E_BUNSU_SHOSU5_E_POP, E_BUNSU_SHOSU5_E_YASASHI,
  J_NARITACHI_J_DARK, J_NARITACHI_J_KISAKU, J_TAIYOKEI_J_DARK, J_TAIYOKEI_J_KISAKU,
  H_KOTEN_HIKAKU_H_CHARISMA, H_KOTEN_HIKAKU_H_KYOJU, H_KOTEN_HIKAKU_H_NEKKETSU,  H_SOGO_KYOKO_H_CHARISMA, H_SOGO_KYOKO_H_KYOJU, H_SOGO_KYOKO_H_NEKKETSU,
  H_VOCAB_KAIWA_H_CHARISMA, H_VOCAB_KAIWA_H_KYOJU, H_VOCAB_KAIWA_H_NEKKETSU,
  H_RINRI_NIHON_H_CHARISMA, H_RINRI_NIHON_H_KYOJU, H_RINRI_NIHON_H_NEKKETSU,
  H_SHOIN_NYUJUKU_H_CHARISMA, H_SHOIN_NYUJUKU_H_KYOJU, H_SHOIN_NYUJUKU_H_NEKKETSU,
  H_SHOIN_RISSHI_H_CHARISMA, H_SHOIN_RISSHI_H_KYOJU, H_SHOIN_RISSHI_H_NEKKETSU,
  H_SHOIN_DOKUSHO_H_CHARISMA, H_SHOIN_DOKUSHO_H_KYOJU, H_SHOIN_DOKUSHO_H_NEKKETSU,
  H_SHOIN_KODO_H_CHARISMA, H_SHOIN_KODO_H_KYOJU, H_SHOIN_KODO_H_NEKKETSU,
  H_SHOIN_SHISEI_H_CHARISMA, H_SHOIN_SHISEI_H_KYOJU, H_SHOIN_SHISEI_H_NEKKETSU,
  H_SHOIN_HIKARI_H_CHARISMA, H_SHOIN_HIKARI_H_KYOJU, H_SHOIN_HIKARI_H_NEKKETSU,
  E_UTSURIKAWARI3_E_POP, E_UTSURIKAWARI3_E_YASASHI, E_ROMAJI3_E_POP, E_ROMAJI3_E_YASASHI, E_GOUDOU5_E_POP, E_GOUDOU5_E_YASASHI,
  J_RIKKEN_J_DARK, J_RIKKEN_J_KISAKU,
  J_TENTAI_J_DARK, J_TENTAI_J_KISAKU,
  H_SHOIN_HIKARI_H_CHARISMA, H_SHOIN_HIKARI_H_KYOJU, H_SHOIN_HIKARI_H_NEKKETSU,  H_TANKYU_SHIGEN_H_CHARISMA, H_TANKYU_SHIGEN_H_KYOJU, H_TANKYU_SHIGEN_H_NEKKETSU,
  H_KOTEN_HITEI_H_CHARISMA, H_KOTEN_HITEI_H_KYOJU, H_KOTEN_HITEI_H_NEKKETSU,
  H_SOGO_MEIJI_H_CHARISMA, H_SOGO_MEIJI_H_KYOJU, H_SOGO_MEIJI_H_NEKKETSU,
  E_SETSUMEI3_E_POP, E_SETSUMEI3_E_YASASHI, E_HIREI5_E_POP, E_HIREI5_E_YASASHI,
  J_SEKAI_TAISEN_J_DARK, J_SEKAI_TAISEN_J_KISAKU,
  J_UNDO_J_DARK, J_UNDO_J_KISAKU,
  H_TANKYU_TOSHI_H_CHARISMA, H_TANKYU_TOSHI_H_KYOJU, H_TANKYU_TOSHI_H_NEKKETSU,
  H_KOTEN_JOSHI_H_CHARISMA, H_KOTEN_JOSHI_H_KYOJU, H_KOTEN_JOSHI_H_NEKKETSU,
  H_SOGO_NISSHIN_H_CHARISMA, H_SOGO_NISSHIN_H_KYOJU, H_SOGO_NISSHIN_H_NEKKETSU,
  E_SHI3_E_POP, E_SHI3_E_YASASHI, E_KAKUCHU5_E_POP, E_KAKUCHU5_E_YASASHI,
  J_SENGO_J_DARK, J_SENGO_J_KISAKU,
  H_KOTEN_JOSHIKI_H_CHARISMA, H_KOTEN_JOSHIKI_H_KYOJU, H_KOTEN_JOSHIKI_H_NEKKETSU,
  H_SOGO_REISEN_H_CHARISMA, H_SOGO_REISEN_H_KYOJU, H_SOGO_REISEN_H_NEKKETSU,
  H_RINRI_PRAGMA_H_CHARISMA, H_RINRI_PRAGMA_H_KYOJU, H_RINRI_PRAGMA_H_NEKKETSU,
  E_SHUSHOKUGO3_E_POP, E_SHUSHOKUGO3_E_YASASHI, E_OBI_EN5_E_POP, E_OBI_EN5_E_YASASHI,
  J_TAISHO_J_DARK, J_TAISHO_J_KISAKU,
  H_KOTEN_MONOGATARI_H_CHARISMA, H_KOTEN_MONOGATARI_H_KYOJU, H_KOTEN_MONOGATARI_H_NEKKETSU,
  H_SOGO_SANGYO_H_CHARISMA, H_SOGO_SANGYO_H_KYOJU, H_SOGO_SANGYO_H_NEKKETSU,
  H_RINRI_RENAISSANCE_H_CHARISMA, H_RINRI_RENAISSANCE_H_KYOJU, H_RINRI_RENAISSANCE_H_NEKKETSU,
  E_TEGAMI3_E_POP, E_TEGAMI3_E_YASASHI, E_SEISU_SHOSU5_E_POP, E_SEISU_SHOSU5_E_YASASHI,
  J_TORAEKATA_J_DARK, J_TORAEKATA_J_KISAKU,
  H_KOTEN_NIKKI_H_CHARISMA, H_KOTEN_NIKKI_H_KYOJU, H_KOTEN_NIKKI_H_NEKKETSU,
  H_SOGO_SENGO_H_CHARISMA, H_SOGO_SENGO_H_KYOJU, H_SOGO_SENGO_H_NEKKETSU,
  H_RINRI_SEIMEI_H_CHARISMA, H_RINRI_SEIMEI_H_KYOJU, H_RINRI_SEIMEI_H_NEKKETSU,
];

/** 骨組みとキャストのせりふを合わせて1本の授業にする（問題の {seito} は相方の名前に） */
export function buildLesson(base: UnitBase, script: CastScript): Lesson {
  const cast = getCast(script.castId);
  if (!cast) throw new Error(`キャスト ${script.castId} がない`);
  const scenes: Scene[] = script.scenes.map((s) => {
    if (s.kind !== "pause") return s;
    const p = base.pauses[s.ref];
    if (!p) throw new Error(`${script.unitId}: 問題 ${s.ref} が骨組みにない`);
    const who = (t: string) => t.replaceAll("{seito}", cast.members.seito.name);
    return { kind: "pause", source: s.ref, ...p, question: who(p.question), say: p.say && { ...p.say, question: p.say.question && who(p.say.question) } };
  });
  return { unitId: script.unitId, stage: stageOf(script.unitId), title: script.title, cast, scenes };
}

/** ゼロワンOSユース版（lib/unizeb）の授業。lib/jugyo/uz が持つ。一覧・sitemap には入れず、/learn/unizeb/jugyo/<カードid> で見せる */
export const UZ_LESSONS: Lesson[] = UZ_SCRIPTS.map((s) => buildLesson(UZ_BASES.find((b) => b.unitId === s.unitId) ?? { unitId: s.unitId, pauses: {} }, s));

const BASE_OF = new Map(BASES.map((b) => [b.unitId, b]));
/** すべての授業（単元 × キャスト） */
export const LESSONS: Lesson[] = SCRIPTS.map((s) => {
  const b = BASE_OF.get(s.unitId);
  if (!b) throw new Error(`単元 ${s.unitId} の骨組みがない`);
  return buildLesson(b, s);
});
/** 単元 id（並び順） */
export const UNITS: string[] = [...new Set(LESSONS.map((l) => l.unitId))];

/** 単元の授業（キャストの数だけ） */
export const getLessons = (unit: string) => LESSONS.filter((l) => l.unitId === unit);
export const getLesson = (unit: string, castId: string) => LESSONS.find((l) => l.unitId === unit && l.cast.id === castId);
export const jugyoHref = (unit: string) => `${JUGYO_HOME}/${unit}`;

/** 1分に話す字数の目安 */
export const CHARS_PER_MIN = 300;

/** その単元に止まる授業があるか */
const UNIT_SET = new Set(UNITS);
export const hasJugyo = (unit: string) => UNIT_SET.has(unit);

/** 1本の授業の長さ（分。話す字数から）と止まる回数 */
export const lessonMinutes = (l: Lesson) => Math.round(l.scenes.reduce((n, s) => n + (s.kind === "talk" ? manzaiSay(s).length : 0), 0) / CHARS_PER_MIN);
export const lessonStops = (l: Lesson) => l.scenes.filter((s) => s.kind === "pause").length;

/** 単元の授業の「約N分・M回止まる」の N・M（キャストで違えば「8〜9」のように幅で） */
export function jugyoSpan(unit: string): { minutes: string; stops: string } | null {
  const ls = getLessons(unit);
  if (!ls.length) return null;
  const range = (a: number[]) => (Math.min(...a) === Math.max(...a) ? `${a[0]}` : `${Math.min(...a)}〜${Math.max(...a)}`);
  return { minutes: range(ls.map(lessonMinutes)), stops: range(ls.map(lessonStops)) };
}
