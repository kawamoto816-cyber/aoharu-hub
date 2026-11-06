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
import { UZ_BASES, UZ_SCRIPTS } from "./uz";

// 止まる授業（動画型・試作）。/learn/jugyo と /learn/jugyo/<単元id>（?cast=<キャストid> で確認用に指定。canonical は cast なし）。
// 検索に載せ、sitemap にも入れる（2026-11-06 代表の決定）。入口は教科の地図の単元の箱・単元の教科書のページ・まなぶのトップ。
// 台本を足すとき：単元の骨組み data/<単元id>.ts（問題）と、キャストごとのせりふ data/<単元id>.<キャストid>.ts を書いて
// ここに並べ、`npx tsx scripts/check-jugyo.ts` で点検する。

export const JUGYO_HOME = "/learn/jugyo";

const BASES: UnitBase[] = [WARIAI_BASE, HAYASA_BASE, BUNSU_WARI_BASE, FURIKO_BASE, TAISEKI_BASE, MENSEKI_BASE, HATSUGA_BASE, KAMAKURA_BASE, SEIFU_BASE, DENRYU_BASE, FUTEISHI_BASE, HOTEISHIKI_BASE, KAGAKU_HENKA_BASE, EDO_SEIRITSU_BASE, TAISHA_BASE, BIBUN_BASE, MOL_BASE, DOPPLER_BASE, NIJIKANSU_BASE, MEIJI_BASE, KANDAI_BASE, EN_MENSEKI_BASE, HI_BASE, KAKUDAI_BASE, HIREI_BASE, HEIMEN_BASE, SAIBO_BASE, SANKAKUHI_BASE, DNA_BASE, JISEI_BASE, MOEKATA_BASE, KARADA_BASE, TSUKI_HOSHI_BASE, TENKI_BASE, MEIJI_ISHIN_BASE, HIKAKU_BASE, H_KAMAKURA_BASE, SANKA_BASE, JUDO_BASE, HIREI_HANPIREI_BASE, HEIKIN_BASE, MEIJI_E_BASE, JIKAI_BASE, MUROMACHI_BASE, UKEMI_BASE, CHUWA_BASE, SENKYO_BASE, NIJIHOTEISHIKI_BASE, KAMAKURA_E_BASE, TANNI_BASE, DENJISHAKU_BASE, KANKEI_BASE, MOJI_BASE, HEIAN_BASE, MENEKI_BASE, KAKUMEI_BASE, KATEIHO_BASE, TEKO_BASE, MOJI_SHIKI_BASE, KOME_BASE, MIRAI_BASE, SEIDENKI_BASE, TENKA_TOITSU_BASE, DATA_BASE, H_EDO_SEIRITSU_BASE, SHIJO_BASE, SUIYOEKI_BASE, EDO_SEIJI_BASE, NAGARERU_BASE, KANRYO_BASE, KUKAN_BASE, DOBUTSU_BASE, H_FUTEISHI_BASE, SHUGO_BASE, H_GENSHI_BASE, ASUKA_NARA_BASE, HANASHI_KAKI_BASE, ALPHA_KAKU_BASE, HINSHI_BASE, BUNKA_BASE, EN_BE_BASE, BOSAI_BASE, HYOGEN_BASE, ALGORITHM_BASE, IKEN_BASE, CAN_BASE, EDO_BUNKA_BASE, SEIBUN_BASE, CHIHO_BASE, EN_CAN_BASE, CHIKEI_BASE, HYORON_BASE, ASSYUKU_BASE];
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
