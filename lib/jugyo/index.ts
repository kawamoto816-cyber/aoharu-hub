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
import { UZ_BASES, UZ_SCRIPTS } from "./uz";

// 止まる授業（動画型・試作）。/learn/jugyo と /learn/jugyo/<単元id>（?cast=<キャストid> で確認用に指定。canonical は cast なし）。
// 検索に載せ、sitemap にも入れる（2026-11-06 代表の決定）。入口は教科の地図の単元の箱・単元の教科書のページ・まなぶのトップ。
// 台本を足すとき：単元の骨組み data/<単元id>.ts（問題）と、キャストごとのせりふ data/<単元id>.<キャストid>.ts を書いて
// ここに並べ、`npx tsx scripts/check-jugyo.ts` で点検する。

export const JUGYO_HOME = "/learn/jugyo";

const BASES: UnitBase[] = [WARIAI_BASE, HAYASA_BASE, BUNSU_WARI_BASE, FURIKO_BASE, TAISEKI_BASE, MENSEKI_BASE, HATSUGA_BASE, KAMAKURA_BASE, SEIFU_BASE, DENRYU_BASE, FUTEISHI_BASE, HOTEISHIKI_BASE, KAGAKU_HENKA_BASE, EDO_SEIRITSU_BASE, TAISHA_BASE, BIBUN_BASE, MOL_BASE, DOPPLER_BASE, NIJIKANSU_BASE, MEIJI_BASE, KANDAI_BASE, EN_MENSEKI_BASE, HI_BASE, KAKUDAI_BASE, HIREI_BASE, HEIMEN_BASE, SAIBO_BASE, SANKAKUHI_BASE, DNA_BASE, JISEI_BASE, MOEKATA_BASE, KARADA_BASE, TSUKI_HOSHI_BASE, TENKI_BASE, MEIJI_ISHIN_BASE, HIKAKU_BASE, H_KAMAKURA_BASE, SANKA_BASE, JUDO_BASE, HIREI_HANPIREI_BASE, HEIKIN_BASE, MEIJI_E_BASE, JIKAI_BASE, MUROMACHI_BASE, UKEMI_BASE, CHUWA_BASE, SENKYO_BASE, NIJIHOTEISHIKI_BASE, KAMAKURA_E_BASE, TANNI_BASE, DENJISHAKU_BASE, KANKEI_BASE, MOJI_BASE, HEIAN_BASE, MENEKI_BASE, KAKUMEI_BASE, KATEIHO_BASE, TEKO_BASE, MOJI_SHIKI_BASE, KOME_BASE, MIRAI_BASE, SEIDENKI_BASE, TENKA_TOITSU_BASE, DATA_BASE, H_EDO_SEIRITSU_BASE, SHIJO_BASE, SUIYOEKI_BASE, EDO_SEIJI_BASE, NAGARERU_BASE, KANRYO_BASE, KUKAN_BASE, DOBUTSU_BASE, H_FUTEISHI_BASE, SHUGO_BASE, H_GENSHI_BASE, ASUKA_NARA_BASE, HANASHI_KAKI_BASE, ALPHA_KAKU_BASE, HINSHI_BASE, BUNKA_BASE, EN_BE_BASE, BOSAI_BASE, HYOGEN_BASE, ALGORITHM_BASE, IKEN_BASE, CAN_BASE, EDO_BUNKA_BASE, SEIBUN_BASE, CHIHO_BASE, EN_CAN_BASE, CHIKEI_BASE, HYORON_BASE, ASSYUKU_BASE, KANA_YURAI_BASE, HEIAN_E_BASE, CHUGAKU_BASE, TANI_BASE, CHIKYU_BASE, DAIMEISHI_BASE, H_CHIHO_BASE, CHOSA_BASE, H_SHI_BASE, KANJI6_BASE, CHUMON_BASE, JOMON_BASE, GOI_BASE, GENDAI_SHAKAI_BASE, EISAKUBUN_BASE, CHIZAI_BASE, H_JINKEN_BASE, GIS_BASE, KOTOBA_HENKA_BASE, HINDO_BASE, KENPO_BASE, HANASU_BASE, TAIRITSU_GOI_BASE, GIMONSHI_BASE, SHOSETSU_BASE, COMPUTER_BASE, ASUKA_BASE, MONOGATARI_BASE, HITO_BASE, DENKI_BASE, KAKU_BASE, JINKEN_BASE, IPPAN_BASE, JIZOKU_BASE, JINKO_BASE, SOSAKU_BASE, BUNSU_TASHIHIKI_BASE, MEDAKA_BASE, SHOKURYO_BASE, KAKURITSU_BASE, HIKARI_BASE, JODOSHI_BASE, NAMI_BASE, HA_KAKURITSU_BASE, HE_JODOSHI_BASE, E_SHOSU_KAKE_BASE, E_TOKEKATA_BASE, E_KEIGO_BASE, J_HEIHOKON_BASE, J_KEIGO_BASE, J_NIHON_SUGATA_BASE, H_HEIAN_BASE, H_KOTEN_KEIGO_BASE, H_JISSU_BASE, E_KOGYO_BASE, E_DENRYU_BASE, E_YOJIJUKUGO_BASE, J_ION_BASE, J_THERE_BASE, J_EUROPE_BASE, H_GREECE_BASE, H_DENRYU_BASE, H_HIKAKU_BASE, E_BAISU_YAKUSU_BASE, E_TENKI5_BASE, E_KOKUREN_BASE, J_ICHIJI_KANSU_BASE, J_KISHO_BASE, J_KOBUN1_BASE, H_KEIYAKU_BASE, E_DATA6_BASE, J_JISHIN_BASE, J_KAKOKEI_BASE, J_ASIA_BASE, H_ENERGY_BASE, H_BAAI_BASE, H_KANSHI_BASE, E_TOCHI_BASE, J_DATA1_BASE, H_ISLAM_BASE, E_WAGO_BASE, J_SHOKUBUTSU_BASE, H_OTO_BASE, E_ICHI_BASE, E_SETSUMEI_BASE, E_KUNIGUNI_BASE, J_KANBUN1_BASE, J_KENPO_BASE, J_LISTENING1_BASE, H_INFO_DATA_BASE, H_JISA_BASE, H_KENPO_BASE];
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
