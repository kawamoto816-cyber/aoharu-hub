// 自動生成 (scripts/gen-moshi.ts)。手で書きかえない。
import type { Daimon, UnitMoshi } from "./types";
import { E_MATH_5_HAYASA_MOSHI } from "./data/e-math-5-hayasa";
import { H_ENG_SKILL_CHOBUN_MOSHI } from "./data/h-eng-skill-chobun";
import { H_ENG_SKILL_JIYU_MOSHI } from "./data/h-eng-skill-jiyu";
import { H_ENG_SKILL_LISTENING_MOSHI } from "./data/h-eng-skill-listening";
import { H_ENG_SKILL_SPEAKING_MOSHI } from "./data/h-eng-skill-speaking";
import { H_ENG_SKILL_WABUN_MOSHI } from "./data/h-eng-skill-wabun";
import { H_ENG_VOCAB_2000_MOSHI } from "./data/h-eng-vocab-2000";
import { H_ENG_VOCAB_HATSUON_MOSHI } from "./data/h-eng-vocab-hatsuon";
import { H_ENG_VOCAB_JUKUGO_MOSHI } from "./data/h-eng-vocab-jukugo";
import { H_ENG_VOCAB_KAIWA_MOSHI } from "./data/h-eng-vocab-kaiwa";
import { H_MATH_1_DATA_MOSHI } from "./data/h-math-1-data";
import { H_MATH_1_FUTOSHIKI_MOSHI } from "./data/h-math-1-futoshiki";
import { H_MATH_1_JISSU_MOSHI } from "./data/h-math-1-jissu";
import { H_MATH_1_KEIRYO_MOSHI } from "./data/h-math-1-keiryo";
import { H_MATH_1_NIJIHOTEISHIKI_MOSHI } from "./data/h-math-1-nijihoteishiki";
import { H_MATH_1_NIJIKANSU_MOSHI } from "./data/h-math-1-nijikansu";
import { H_MATH_1_SAIDAI_MOSHI } from "./data/h-math-1-saidai";
import { H_MATH_1_SANKAKUHI_MOSHI } from "./data/h-math-1-sankakuhi";
import { H_MATH_1_SHIKI_MOSHI } from "./data/h-math-1-shiki";
import { H_MATH_1_SHUGO_MOSHI } from "./data/h-math-1-shugo";
import { H_MATH_1_TEIRI_MOSHI } from "./data/h-math-1-teiri";
import { H_MATH_A_BAAI_MOSHI } from "./data/h-math-a-baai";
import { H_MATH_A_EN_MOSHI } from "./data/h-math-a-en";
import { H_MATH_A_GOJO_MOSHI } from "./data/h-math-a-gojo";
import { H_MATH_A_JOKEN_MOSHI } from "./data/h-math-a-joken";
import { H_MATH_A_KAKURITSU_MOSHI } from "./data/h-math-a-kakuritsu";
import { H_MATH_A_KUKAN_MOSHI } from "./data/h-math-a-kukan";
import { H_MATH_A_NSHIN_MOSHI } from "./data/h-math-a-nshin";
import { H_MATH_A_SANKAKUKEI_MOSHI } from "./data/h-math-a-sankakukei";
import { H_MATH_A_YAKUSU_MOSHI } from "./data/h-math-a-yakusu";
import { J_EN_1_BE_MOSHI } from "./data/j-en-1-be";
import { J_EN_1_CAN_MOSHI } from "./data/j-en-1-can";
import { J_EN_1_DAIMEISHI_MOSHI } from "./data/j-en-1-daimeishi";
import { J_EN_1_EISAKUBUN_MOSHI } from "./data/j-en-1-eisakubun";
import { J_EN_1_GIMONSHI_MOSHI } from "./data/j-en-1-gimonshi";
import { J_EN_1_IPPAN_MOSHI } from "./data/j-en-1-ippan";
import { J_EN_1_KAKOKEI_MOSHI } from "./data/j-en-1-kakokei";
import { J_EN_1_LISTENING_MOSHI } from "./data/j-en-1-listening";
import { J_EN_1_MEIREI_MOSHI } from "./data/j-en-1-meirei";
import { J_EN_1_MEISHI_MOSHI } from "./data/j-en-1-meishi";
import { J_EN_1_ONSEI_MOSHI } from "./data/j-en-1-onsei";
import { J_EN_1_SHINKOKEI_MOSHI } from "./data/j-en-1-shinkokei";
import { J_EN_1_TANGO_MOSHI } from "./data/j-en-1-tango";
import { J_EN_2_BUNKEI_MOSHI } from "./data/j-en-2-bunkei";
import { J_EN_2_DOMEISHI_MOSHI } from "./data/j-en-2-domeishi";
import { J_EN_2_EISAKUBUN_MOSHI } from "./data/j-en-2-eisakubun";
import { J_EN_2_FUTEISHI_MOSHI } from "./data/j-en-2-futeishi";
import { J_EN_2_HIKAKU_MOSHI } from "./data/j-en-2-hikaku";
import { J_EN_2_JODOSHI_MOSHI } from "./data/j-en-2-jodoshi";
import { J_EN_2_KAKO_SHINKO_MOSHI } from "./data/j-en-2-kako-shinko";
import { J_EN_2_LISTENING_MOSHI } from "./data/j-en-2-listening";
import { J_EN_2_MIRAI_MOSHI } from "./data/j-en-2-mirai";
import { J_EN_2_SETSUZOKUSHI_MOSHI } from "./data/j-en-2-setsuzokushi";
import { J_EN_2_TANGO_MOSHI } from "./data/j-en-2-tango";
import { J_EN_2_THERE_MOSHI } from "./data/j-en-2-there";
import { J_EN_2_UKEMI_MOSHI } from "./data/j-en-2-ukemi";
import { J_EN_3_BUNSHI_MOSHI } from "./data/j-en-3-bunshi";
import { J_EN_3_CHOBUN_MOSHI } from "./data/j-en-3-chobun";
import { J_EN_3_EISAKUBUN_MOSHI } from "./data/j-en-3-eisakubun";
import { J_EN_3_FUTEISHI_MOSHI } from "./data/j-en-3-futeishi";
import { J_EN_3_KANKEI_MOSHI } from "./data/j-en-3-kankei";
import { J_EN_3_KANRYO_SHINKO_MOSHI } from "./data/j-en-3-kanryo-shinko";
import { J_EN_3_KANRYO_MOSHI } from "./data/j-en-3-kanryo";
import { J_EN_3_KANSETSU_MOSHI } from "./data/j-en-3-kansetsu";
import { J_EN_3_KATEI_MOSHI } from "./data/j-en-3-katei";
import { J_EN_3_LISTENING_MOSHI } from "./data/j-en-3-listening";
import { J_EN_3_TANGO_MOSHI } from "./data/j-en-3-tango";
import { J_JA_1_BUNPO_HINSHI_MOSHI } from "./data/j-ja-1-bunpo-hinshi";
import { J_JA_1_BUNPO_SEIBUN_MOSHI } from "./data/j-ja-1-bunpo-seibun";
import { J_JA_1_BUNPO_TANI_MOSHI } from "./data/j-ja-1-bunpo-tani";
import { J_JA_1_GOI_MOSHI } from "./data/j-ja-1-goi";
import { J_JA_1_HANASU_MOSHI } from "./data/j-ja-1-hanasu";
import { J_JA_1_KAKU_MOSHI } from "./data/j-ja-1-kaku";
import { J_JA_1_KANBUN_MOSHI } from "./data/j-ja-1-kanbun";
import { J_JA_1_KANJI_MOSHI } from "./data/j-ja-1-kanji";
import { J_JA_1_KOBUN_MOSHI } from "./data/j-ja-1-kobun";
import { J_JA_1_MONOGATARI_MOSHI } from "./data/j-ja-1-monogatari";
import { J_JA_1_SETSUMEI_MOSHI } from "./data/j-ja-1-setsumei";
import { J_JA_1_SHI_MOSHI } from "./data/j-ja-1-shi";
import { J_JA_2_BUNPO_FUZOKU_MOSHI } from "./data/j-ja-2-bunpo-fuzoku";
import { J_JA_2_BUNPO_YOGEN_MOSHI } from "./data/j-ja-2-bunpo-yogen";
import { J_JA_2_GOI_MOSHI } from "./data/j-ja-2-goi";
import { J_JA_2_HANASU_MOSHI } from "./data/j-ja-2-hanasu";
import { J_JA_2_IKENBUN_MOSHI } from "./data/j-ja-2-ikenbun";
import { J_JA_2_KANJI_MOSHI } from "./data/j-ja-2-kanji";
import { J_JA_2_KANSHI_MOSHI } from "./data/j-ja-2-kanshi";
import { J_JA_2_KEIGO_MOSHI } from "./data/j-ja-2-keigo";
import { J_JA_2_KOBUN_MOSHI } from "./data/j-ja-2-kobun";
import { J_JA_2_SETSUMEI_MOSHI } from "./data/j-ja-2-setsumei";
import { J_JA_2_SHOSETSU_MOSHI } from "./data/j-ja-2-shosetsu";
import { J_JA_2_TANKA_MOSHI } from "./data/j-ja-2-tanka";
import { J_JA_3_BUNPO_MOSHI } from "./data/j-ja-3-bunpo";
import { J_JA_3_GOI_MOSHI } from "./data/j-ja-3-goi";
import { J_JA_3_HAIKU_MOSHI } from "./data/j-ja-3-haiku";
import { J_JA_3_HANASU_MOSHI } from "./data/j-ja-3-hanasu";
import { J_JA_3_HIHYO_MOSHI } from "./data/j-ja-3-hihyo";
import { J_JA_3_KANBUN_MOSHI } from "./data/j-ja-3-kanbun";
import { J_JA_3_KANJI_MOSHI } from "./data/j-ja-3-kanji";
import { J_JA_3_KOBUN_MOSHI } from "./data/j-ja-3-kobun";
import { J_JA_3_RONSETSU_MOSHI } from "./data/j-ja-3-ronsetsu";
import { J_JA_3_SHOSETSU_MOSHI } from "./data/j-ja-3-shosetsu";
import { J_MATH_1_DATA } from "./data/j-math-1-data";
import { J_MATH_1_HEIMEN } from "./data/j-math-1-heimen";
import { J_MATH_1_HIREI } from "./data/j-math-1-hirei";
import { J_MATH_1_HOTEISHIKI } from "./data/j-math-1-hoteishiki";
import { J_MATH_1_KUKAN } from "./data/j-math-1-kukan";
import { J_MATH_1_MOJI } from "./data/j-math-1-moji";
import { J_MATH_1_SEIFU } from "./data/j-math-1-seifu";
import { J_MATH_2_HAKOHIGE } from "./data/j-math-2-hakohige";
import { J_MATH_2_HEIKO_GODO } from "./data/j-math-2-heiko-godo";
import { J_MATH_2_ICHIJI_KANSU } from "./data/j-math-2-ichiji-kansu";
import { J_MATH_2_KAKURITSU } from "./data/j-math-2-kakuritsu";
import { J_MATH_2_RENRITSU } from "./data/j-math-2-renritsu";
import { J_MATH_2_SANKAKU_SHIKAKU } from "./data/j-math-2-sankaku-shikaku";
import { J_MATH_2_SHIKI } from "./data/j-math-2-shiki";
import { J_MATH_3_EN } from "./data/j-math-3-en";
import { J_MATH_3_HEIHOKON } from "./data/j-math-3-heihokon";
import { J_MATH_3_HYOHON } from "./data/j-math-3-hyohon";
import { J_MATH_3_KANSU_AX2 } from "./data/j-math-3-kansu-ax2";
import { J_MATH_3_NIJI_HOTEISHIKI } from "./data/j-math-3-niji-hoteishiki";
import { J_MATH_3_SANHEIHO } from "./data/j-math-3-sanheiho";
import { J_MATH_3_SOJII } from "./data/j-math-3-sojii";
import { J_MATH_3_TENKAI } from "./data/j-math-3-tenkai";
import { J_SCI_1_BUSSHITSU } from "./data/j-sci-1-busshitsu";
import { J_SCI_1_CHIKARA } from "./data/j-sci-1-chikara";
import { J_SCI_1_CHISO } from "./data/j-sci-1-chiso";
import { J_SCI_1_DOBUTSU_BUNRUI } from "./data/j-sci-1-dobutsu-bunrui";
import { J_SCI_1_HIKARI } from "./data/j-sci-1-hikari";
import { J_SCI_1_JISHIN } from "./data/j-sci-1-jishin";
import { J_SCI_1_JOTAI } from "./data/j-sci-1-jotai";
import { J_SCI_1_KAZAN } from "./data/j-sci-1-kazan";
import { J_SCI_1_KITAI } from "./data/j-sci-1-kitai";
import { J_SCI_1_OTO } from "./data/j-sci-1-oto";
import { J_SCI_1_SHOKUBUTSU_BUNRUI } from "./data/j-sci-1-shokubutsu-bunrui";
import { J_SCI_1_SUIYOEKI } from "./data/j-sci-1-suiyoeki";
import { J_SCI_2_DENRYU } from "./data/j-sci-2-denryu";
import { J_SCI_2_DOBUTSU } from "./data/j-sci-2-dobutsu";
import { J_SCI_2_GENSHI } from "./data/j-sci-2-genshi";
import { J_SCI_2_JIKAI } from "./data/j-sci-2-jikai";
import { J_SCI_2_KAGAKU_HENKA } from "./data/j-sci-2-kagaku-henka";
import { J_SCI_2_KISHO } from "./data/j-sci-2-kisho";
import { J_SCI_2_NIHON_KISHO } from "./data/j-sci-2-nihon-kisho";
import { J_SCI_2_SAIBO } from "./data/j-sci-2-saibo";
import { J_SCI_2_SEIDENKI } from "./data/j-sci-2-seidenki";
import { J_SCI_2_SHIGEKI } from "./data/j-sci-2-shigeki";
import { J_SCI_2_SHITSURYO } from "./data/j-sci-2-shitsuryo";
import { J_SCI_2_SHOKUBUTSU } from "./data/j-sci-2-shokubutsu";
import { J_SCI_2_TENKI } from "./data/j-sci-2-tenki";
import { J_SCI_3_CHUWA } from "./data/j-sci-3-chuwa";
import { J_SCI_3_DENCHI } from "./data/j-sci-3-denchi";
import { J_SCI_3_GORYOKU } from "./data/j-sci-3-goryoku";
import { J_SCI_3_IDEN } from "./data/j-sci-3-iden";
import { J_SCI_3_ION } from "./data/j-sci-3-ion";
import { J_SCI_3_KAGAKU_GIJUTSU } from "./data/j-sci-3-kagaku-gijutsu";
import { J_SCI_3_SAIBO_BUNRETSU } from "./data/j-sci-3-saibo-bunretsu";
import { J_SCI_3_SEITAIKEI } from "./data/j-sci-3-seitaikei";
import { J_SCI_3_SHIGOTO } from "./data/j-sci-3-shigoto";
import { J_SCI_3_SHINKA } from "./data/j-sci-3-shinka";
import { J_SCI_3_SUIATSU } from "./data/j-sci-3-suiatsu";
import { J_SCI_3_TAIYOKEI } from "./data/j-sci-3-taiyokei";
import { J_SCI_3_TENTAI } from "./data/j-sci-3-tentai";
import { J_SCI_3_UNDO } from "./data/j-sci-3-undo";
import { J_SOC_CIV_BUNKA_MOSHI } from "./data/j-soc-civ-bunka";
import { J_SOC_CIV_CHIHO_MOSHI } from "./data/j-soc-civ-chiho";
import { J_SOC_CIV_CHIKYU_MOSHI } from "./data/j-soc-civ-chikyu";
import { J_SOC_CIV_GENDAI_SHAKAI_MOSHI } from "./data/j-soc-civ-gendai-shakai";
import { J_SOC_CIV_GOI_MOSHI } from "./data/j-soc-civ-goi";
import { J_SOC_CIV_JINKEN_MOSHI } from "./data/j-soc-civ-jinken";
import { J_SOC_CIV_KENPO_MOSHI } from "./data/j-soc-civ-kenpo";
import { J_SOC_CIV_KIGYO_MOSHI } from "./data/j-soc-civ-kigyo";
import { J_SOC_CIV_KINYU_MOSHI } from "./data/j-soc-civ-kinyu";
import { J_SOC_CIV_KOKKAI_MOSHI } from "./data/j-soc-civ-kokkai";
import { J_SOC_CIV_KOKUSAI_MOSHI } from "./data/j-soc-civ-kokusai";
import { J_SOC_CIV_NAIKAKU_MOSHI } from "./data/j-soc-civ-naikaku";
import { J_SOC_CIV_SAIBANSHO_MOSHI } from "./data/j-soc-civ-saibansho";
import { J_SOC_CIV_SENKYO_MOSHI } from "./data/j-soc-civ-senkyo";
import { J_SOC_CIV_SHAKAI_HOSHO_MOSHI } from "./data/j-soc-civ-shakai-hosho";
import { J_SOC_CIV_SHIJO_MOSHI } from "./data/j-soc-civ-shijo";
import { J_SOC_CIV_SHOHI_MOSHI } from "./data/j-soc-civ-shohi";
import { J_SOC_CIV_ZAISEI_MOSHI } from "./data/j-soc-civ-zaisei";
import { J_SOC_GEO_AFRICA_MOSHI } from "./data/j-soc-geo-africa";
import { J_SOC_GEO_ASIA_MOSHI } from "./data/j-soc-geo-asia";
import { J_SOC_GEO_CHIIKI_CHOSA_MOSHI } from "./data/j-soc-geo-chiiki-chosa";
import { J_SOC_GEO_CHUBU_MOSHI } from "./data/j-soc-geo-chubu";
import { J_SOC_GEO_CHUGOKU_SHIKOKU_MOSHI } from "./data/j-soc-geo-chugoku-shikoku";
import { J_SOC_GEO_EUROPE_MOSHI } from "./data/j-soc-geo-europe";
import { J_SOC_GEO_HOKKAIDO_MOSHI } from "./data/j-soc-geo-hokkaido";
import { J_SOC_GEO_KANTO_MOSHI } from "./data/j-soc-geo-kanto";
import { J_SOC_GEO_KINKI_MOSHI } from "./data/j-soc-geo-kinki";
import { J_SOC_GEO_KYUSHU_MOSHI } from "./data/j-soc-geo-kyushu";
import { J_SOC_GEO_NIHON_SUGATA_MOSHI } from "./data/j-soc-geo-nihon-sugata";
import { J_SOC_GEO_NIHON_TOKUSHOKU_MOSHI } from "./data/j-soc-geo-nihon-tokushoku";
import { J_SOC_GEO_NORTH_AMERICA_MOSHI } from "./data/j-soc-geo-north-america";
import { J_SOC_GEO_OCEANIA_MOSHI } from "./data/j-soc-geo-oceania";
import { J_SOC_GEO_SEIKATSU_MOSHI } from "./data/j-soc-geo-seikatsu";
import { J_SOC_GEO_SEKAI_SUGATA_MOSHI } from "./data/j-soc-geo-sekai-sugata";
import { J_SOC_GEO_SOUTH_AMERICA_MOSHI } from "./data/j-soc-geo-south-america";
import { J_SOC_GEO_TOHOKU_MOSHI } from "./data/j-soc-geo-tohoku";
import { J_SOC_HIST_BUNMEI_MOSHI } from "./data/j-soc-hist-bunmei";
import { J_SOC_HIST_EDO_SEIRITSU_MOSHI } from "./data/j-soc-hist-edo-seiritsu";
import { J_SOC_HIST_EDO_TENKAI_MOSHI } from "./data/j-soc-hist-edo-tenkai";
import { J_SOC_HIST_GENDAI_MOSHI } from "./data/j-soc-hist-gendai";
import { J_SOC_HIST_HEIAN_MOSHI } from "./data/j-soc-hist-heian";
import { J_SOC_HIST_KAIKOKU_MOSHI } from "./data/j-soc-hist-kaikoku";
import { J_SOC_HIST_KAMAKURA_MOSHI } from "./data/j-soc-hist-kamakura";
import { J_SOC_HIST_KODAI_KOKKA_MOSHI } from "./data/j-soc-hist-kodai-kokka";
import { J_SOC_HIST_MEIJI_ISHIN_MOSHI } from "./data/j-soc-hist-meiji-ishin";
import { J_SOC_HIST_MUROMACHI_MOSHI } from "./data/j-soc-hist-muromachi";
import { J_SOC_HIST_NIHON_NARITACHI_MOSHI } from "./data/j-soc-hist-nihon-naritachi";
import { J_SOC_HIST_RIKKEN_MOSHI } from "./data/j-soc-hist-rikken";
import { J_SOC_HIST_SEKAI_TAISEN_MOSHI } from "./data/j-soc-hist-sekai-taisen";
import { J_SOC_HIST_SENGO_MOSHI } from "./data/j-soc-hist-sengo";
import { J_SOC_HIST_TAISHO_MOSHI } from "./data/j-soc-hist-taisho";
import { J_SOC_HIST_TENKA_TOITSU_MOSHI } from "./data/j-soc-hist-tenka-toitsu";
import { J_SOC_HIST_TORAEKATA_MOSHI } from "./data/j-soc-hist-toraekata";

/** ファイル名 (単元id) → その単元の大問 */
export const REGISTRY: Record<string, Daimon[]> = {
  "j-math-1-data": J_MATH_1_DATA,
  "j-math-1-heimen": J_MATH_1_HEIMEN,
  "j-math-1-hirei": J_MATH_1_HIREI,
  "j-math-1-hoteishiki": J_MATH_1_HOTEISHIKI,
  "j-math-1-kukan": J_MATH_1_KUKAN,
  "j-math-1-moji": J_MATH_1_MOJI,
  "j-math-1-seifu": J_MATH_1_SEIFU,
  "j-math-2-hakohige": J_MATH_2_HAKOHIGE,
  "j-math-2-heiko-godo": J_MATH_2_HEIKO_GODO,
  "j-math-2-ichiji-kansu": J_MATH_2_ICHIJI_KANSU,
  "j-math-2-kakuritsu": J_MATH_2_KAKURITSU,
  "j-math-2-renritsu": J_MATH_2_RENRITSU,
  "j-math-2-sankaku-shikaku": J_MATH_2_SANKAKU_SHIKAKU,
  "j-math-2-shiki": J_MATH_2_SHIKI,
  "j-math-3-en": J_MATH_3_EN,
  "j-math-3-heihokon": J_MATH_3_HEIHOKON,
  "j-math-3-hyohon": J_MATH_3_HYOHON,
  "j-math-3-kansu-ax2": J_MATH_3_KANSU_AX2,
  "j-math-3-niji-hoteishiki": J_MATH_3_NIJI_HOTEISHIKI,
  "j-math-3-sanheiho": J_MATH_3_SANHEIHO,
  "j-math-3-sojii": J_MATH_3_SOJII,
  "j-math-3-tenkai": J_MATH_3_TENKAI,
  "j-sci-1-busshitsu": J_SCI_1_BUSSHITSU,
  "j-sci-1-chikara": J_SCI_1_CHIKARA,
  "j-sci-1-chiso": J_SCI_1_CHISO,
  "j-sci-1-dobutsu-bunrui": J_SCI_1_DOBUTSU_BUNRUI,
  "j-sci-1-hikari": J_SCI_1_HIKARI,
  "j-sci-1-jishin": J_SCI_1_JISHIN,
  "j-sci-1-jotai": J_SCI_1_JOTAI,
  "j-sci-1-kazan": J_SCI_1_KAZAN,
  "j-sci-1-kitai": J_SCI_1_KITAI,
  "j-sci-1-oto": J_SCI_1_OTO,
  "j-sci-1-shokubutsu-bunrui": J_SCI_1_SHOKUBUTSU_BUNRUI,
  "j-sci-1-suiyoeki": J_SCI_1_SUIYOEKI,
  "j-sci-2-denryu": J_SCI_2_DENRYU,
  "j-sci-2-dobutsu": J_SCI_2_DOBUTSU,
  "j-sci-2-genshi": J_SCI_2_GENSHI,
  "j-sci-2-jikai": J_SCI_2_JIKAI,
  "j-sci-2-kagaku-henka": J_SCI_2_KAGAKU_HENKA,
  "j-sci-2-kisho": J_SCI_2_KISHO,
  "j-sci-2-nihon-kisho": J_SCI_2_NIHON_KISHO,
  "j-sci-2-saibo": J_SCI_2_SAIBO,
  "j-sci-2-seidenki": J_SCI_2_SEIDENKI,
  "j-sci-2-shigeki": J_SCI_2_SHIGEKI,
  "j-sci-2-shitsuryo": J_SCI_2_SHITSURYO,
  "j-sci-2-shokubutsu": J_SCI_2_SHOKUBUTSU,
  "j-sci-2-tenki": J_SCI_2_TENKI,
  "j-sci-3-chuwa": J_SCI_3_CHUWA,
  "j-sci-3-denchi": J_SCI_3_DENCHI,
  "j-sci-3-goryoku": J_SCI_3_GORYOKU,
  "j-sci-3-iden": J_SCI_3_IDEN,
  "j-sci-3-ion": J_SCI_3_ION,
  "j-sci-3-kagaku-gijutsu": J_SCI_3_KAGAKU_GIJUTSU,
  "j-sci-3-saibo-bunretsu": J_SCI_3_SAIBO_BUNRETSU,
  "j-sci-3-seitaikei": J_SCI_3_SEITAIKEI,
  "j-sci-3-shigoto": J_SCI_3_SHIGOTO,
  "j-sci-3-shinka": J_SCI_3_SHINKA,
  "j-sci-3-suiatsu": J_SCI_3_SUIATSU,
  "j-sci-3-taiyokei": J_SCI_3_TAIYOKEI,
  "j-sci-3-tentai": J_SCI_3_TENTAI,
  "j-sci-3-undo": J_SCI_3_UNDO,
};

/** ファイル名 (単元id) → その単元の単元模試 */
export const UNIT_REGISTRY: Record<string, UnitMoshi> = {
  "e-math-5-hayasa": E_MATH_5_HAYASA_MOSHI,
  "h-eng-skill-chobun": H_ENG_SKILL_CHOBUN_MOSHI,
  "h-eng-skill-jiyu": H_ENG_SKILL_JIYU_MOSHI,
  "h-eng-skill-listening": H_ENG_SKILL_LISTENING_MOSHI,
  "h-eng-skill-speaking": H_ENG_SKILL_SPEAKING_MOSHI,
  "h-eng-skill-wabun": H_ENG_SKILL_WABUN_MOSHI,
  "h-eng-vocab-2000": H_ENG_VOCAB_2000_MOSHI,
  "h-eng-vocab-hatsuon": H_ENG_VOCAB_HATSUON_MOSHI,
  "h-eng-vocab-jukugo": H_ENG_VOCAB_JUKUGO_MOSHI,
  "h-eng-vocab-kaiwa": H_ENG_VOCAB_KAIWA_MOSHI,
  "h-math-1-data": H_MATH_1_DATA_MOSHI,
  "h-math-1-futoshiki": H_MATH_1_FUTOSHIKI_MOSHI,
  "h-math-1-jissu": H_MATH_1_JISSU_MOSHI,
  "h-math-1-keiryo": H_MATH_1_KEIRYO_MOSHI,
  "h-math-1-nijihoteishiki": H_MATH_1_NIJIHOTEISHIKI_MOSHI,
  "h-math-1-nijikansu": H_MATH_1_NIJIKANSU_MOSHI,
  "h-math-1-saidai": H_MATH_1_SAIDAI_MOSHI,
  "h-math-1-sankakuhi": H_MATH_1_SANKAKUHI_MOSHI,
  "h-math-1-shiki": H_MATH_1_SHIKI_MOSHI,
  "h-math-1-shugo": H_MATH_1_SHUGO_MOSHI,
  "h-math-1-teiri": H_MATH_1_TEIRI_MOSHI,
  "h-math-a-baai": H_MATH_A_BAAI_MOSHI,
  "h-math-a-en": H_MATH_A_EN_MOSHI,
  "h-math-a-gojo": H_MATH_A_GOJO_MOSHI,
  "h-math-a-joken": H_MATH_A_JOKEN_MOSHI,
  "h-math-a-kakuritsu": H_MATH_A_KAKURITSU_MOSHI,
  "h-math-a-kukan": H_MATH_A_KUKAN_MOSHI,
  "h-math-a-nshin": H_MATH_A_NSHIN_MOSHI,
  "h-math-a-sankakukei": H_MATH_A_SANKAKUKEI_MOSHI,
  "h-math-a-yakusu": H_MATH_A_YAKUSU_MOSHI,
  "j-en-1-be": J_EN_1_BE_MOSHI,
  "j-en-1-can": J_EN_1_CAN_MOSHI,
  "j-en-1-daimeishi": J_EN_1_DAIMEISHI_MOSHI,
  "j-en-1-eisakubun": J_EN_1_EISAKUBUN_MOSHI,
  "j-en-1-gimonshi": J_EN_1_GIMONSHI_MOSHI,
  "j-en-1-ippan": J_EN_1_IPPAN_MOSHI,
  "j-en-1-kakokei": J_EN_1_KAKOKEI_MOSHI,
  "j-en-1-listening": J_EN_1_LISTENING_MOSHI,
  "j-en-1-meirei": J_EN_1_MEIREI_MOSHI,
  "j-en-1-meishi": J_EN_1_MEISHI_MOSHI,
  "j-en-1-onsei": J_EN_1_ONSEI_MOSHI,
  "j-en-1-shinkokei": J_EN_1_SHINKOKEI_MOSHI,
  "j-en-1-tango": J_EN_1_TANGO_MOSHI,
  "j-en-2-bunkei": J_EN_2_BUNKEI_MOSHI,
  "j-en-2-domeishi": J_EN_2_DOMEISHI_MOSHI,
  "j-en-2-eisakubun": J_EN_2_EISAKUBUN_MOSHI,
  "j-en-2-futeishi": J_EN_2_FUTEISHI_MOSHI,
  "j-en-2-hikaku": J_EN_2_HIKAKU_MOSHI,
  "j-en-2-jodoshi": J_EN_2_JODOSHI_MOSHI,
  "j-en-2-kako-shinko": J_EN_2_KAKO_SHINKO_MOSHI,
  "j-en-2-listening": J_EN_2_LISTENING_MOSHI,
  "j-en-2-mirai": J_EN_2_MIRAI_MOSHI,
  "j-en-2-setsuzokushi": J_EN_2_SETSUZOKUSHI_MOSHI,
  "j-en-2-tango": J_EN_2_TANGO_MOSHI,
  "j-en-2-there": J_EN_2_THERE_MOSHI,
  "j-en-2-ukemi": J_EN_2_UKEMI_MOSHI,
  "j-en-3-bunshi": J_EN_3_BUNSHI_MOSHI,
  "j-en-3-chobun": J_EN_3_CHOBUN_MOSHI,
  "j-en-3-eisakubun": J_EN_3_EISAKUBUN_MOSHI,
  "j-en-3-futeishi": J_EN_3_FUTEISHI_MOSHI,
  "j-en-3-kankei": J_EN_3_KANKEI_MOSHI,
  "j-en-3-kanryo-shinko": J_EN_3_KANRYO_SHINKO_MOSHI,
  "j-en-3-kanryo": J_EN_3_KANRYO_MOSHI,
  "j-en-3-kansetsu": J_EN_3_KANSETSU_MOSHI,
  "j-en-3-katei": J_EN_3_KATEI_MOSHI,
  "j-en-3-listening": J_EN_3_LISTENING_MOSHI,
  "j-en-3-tango": J_EN_3_TANGO_MOSHI,
  "j-ja-1-bunpo-hinshi": J_JA_1_BUNPO_HINSHI_MOSHI,
  "j-ja-1-bunpo-seibun": J_JA_1_BUNPO_SEIBUN_MOSHI,
  "j-ja-1-bunpo-tani": J_JA_1_BUNPO_TANI_MOSHI,
  "j-ja-1-goi": J_JA_1_GOI_MOSHI,
  "j-ja-1-hanasu": J_JA_1_HANASU_MOSHI,
  "j-ja-1-kaku": J_JA_1_KAKU_MOSHI,
  "j-ja-1-kanbun": J_JA_1_KANBUN_MOSHI,
  "j-ja-1-kanji": J_JA_1_KANJI_MOSHI,
  "j-ja-1-kobun": J_JA_1_KOBUN_MOSHI,
  "j-ja-1-monogatari": J_JA_1_MONOGATARI_MOSHI,
  "j-ja-1-setsumei": J_JA_1_SETSUMEI_MOSHI,
  "j-ja-1-shi": J_JA_1_SHI_MOSHI,
  "j-ja-2-bunpo-fuzoku": J_JA_2_BUNPO_FUZOKU_MOSHI,
  "j-ja-2-bunpo-yogen": J_JA_2_BUNPO_YOGEN_MOSHI,
  "j-ja-2-goi": J_JA_2_GOI_MOSHI,
  "j-ja-2-hanasu": J_JA_2_HANASU_MOSHI,
  "j-ja-2-ikenbun": J_JA_2_IKENBUN_MOSHI,
  "j-ja-2-kanji": J_JA_2_KANJI_MOSHI,
  "j-ja-2-kanshi": J_JA_2_KANSHI_MOSHI,
  "j-ja-2-keigo": J_JA_2_KEIGO_MOSHI,
  "j-ja-2-kobun": J_JA_2_KOBUN_MOSHI,
  "j-ja-2-setsumei": J_JA_2_SETSUMEI_MOSHI,
  "j-ja-2-shosetsu": J_JA_2_SHOSETSU_MOSHI,
  "j-ja-2-tanka": J_JA_2_TANKA_MOSHI,
  "j-ja-3-bunpo": J_JA_3_BUNPO_MOSHI,
  "j-ja-3-goi": J_JA_3_GOI_MOSHI,
  "j-ja-3-haiku": J_JA_3_HAIKU_MOSHI,
  "j-ja-3-hanasu": J_JA_3_HANASU_MOSHI,
  "j-ja-3-hihyo": J_JA_3_HIHYO_MOSHI,
  "j-ja-3-kanbun": J_JA_3_KANBUN_MOSHI,
  "j-ja-3-kanji": J_JA_3_KANJI_MOSHI,
  "j-ja-3-kobun": J_JA_3_KOBUN_MOSHI,
  "j-ja-3-ronsetsu": J_JA_3_RONSETSU_MOSHI,
  "j-ja-3-shosetsu": J_JA_3_SHOSETSU_MOSHI,
  "j-soc-civ-bunka": J_SOC_CIV_BUNKA_MOSHI,
  "j-soc-civ-chiho": J_SOC_CIV_CHIHO_MOSHI,
  "j-soc-civ-chikyu": J_SOC_CIV_CHIKYU_MOSHI,
  "j-soc-civ-gendai-shakai": J_SOC_CIV_GENDAI_SHAKAI_MOSHI,
  "j-soc-civ-goi": J_SOC_CIV_GOI_MOSHI,
  "j-soc-civ-jinken": J_SOC_CIV_JINKEN_MOSHI,
  "j-soc-civ-kenpo": J_SOC_CIV_KENPO_MOSHI,
  "j-soc-civ-kigyo": J_SOC_CIV_KIGYO_MOSHI,
  "j-soc-civ-kinyu": J_SOC_CIV_KINYU_MOSHI,
  "j-soc-civ-kokkai": J_SOC_CIV_KOKKAI_MOSHI,
  "j-soc-civ-kokusai": J_SOC_CIV_KOKUSAI_MOSHI,
  "j-soc-civ-naikaku": J_SOC_CIV_NAIKAKU_MOSHI,
  "j-soc-civ-saibansho": J_SOC_CIV_SAIBANSHO_MOSHI,
  "j-soc-civ-senkyo": J_SOC_CIV_SENKYO_MOSHI,
  "j-soc-civ-shakai-hosho": J_SOC_CIV_SHAKAI_HOSHO_MOSHI,
  "j-soc-civ-shijo": J_SOC_CIV_SHIJO_MOSHI,
  "j-soc-civ-shohi": J_SOC_CIV_SHOHI_MOSHI,
  "j-soc-civ-zaisei": J_SOC_CIV_ZAISEI_MOSHI,
  "j-soc-geo-africa": J_SOC_GEO_AFRICA_MOSHI,
  "j-soc-geo-asia": J_SOC_GEO_ASIA_MOSHI,
  "j-soc-geo-chiiki-chosa": J_SOC_GEO_CHIIKI_CHOSA_MOSHI,
  "j-soc-geo-chubu": J_SOC_GEO_CHUBU_MOSHI,
  "j-soc-geo-chugoku-shikoku": J_SOC_GEO_CHUGOKU_SHIKOKU_MOSHI,
  "j-soc-geo-europe": J_SOC_GEO_EUROPE_MOSHI,
  "j-soc-geo-hokkaido": J_SOC_GEO_HOKKAIDO_MOSHI,
  "j-soc-geo-kanto": J_SOC_GEO_KANTO_MOSHI,
  "j-soc-geo-kinki": J_SOC_GEO_KINKI_MOSHI,
  "j-soc-geo-kyushu": J_SOC_GEO_KYUSHU_MOSHI,
  "j-soc-geo-nihon-sugata": J_SOC_GEO_NIHON_SUGATA_MOSHI,
  "j-soc-geo-nihon-tokushoku": J_SOC_GEO_NIHON_TOKUSHOKU_MOSHI,
  "j-soc-geo-north-america": J_SOC_GEO_NORTH_AMERICA_MOSHI,
  "j-soc-geo-oceania": J_SOC_GEO_OCEANIA_MOSHI,
  "j-soc-geo-seikatsu": J_SOC_GEO_SEIKATSU_MOSHI,
  "j-soc-geo-sekai-sugata": J_SOC_GEO_SEKAI_SUGATA_MOSHI,
  "j-soc-geo-south-america": J_SOC_GEO_SOUTH_AMERICA_MOSHI,
  "j-soc-geo-tohoku": J_SOC_GEO_TOHOKU_MOSHI,
  "j-soc-hist-bunmei": J_SOC_HIST_BUNMEI_MOSHI,
  "j-soc-hist-edo-seiritsu": J_SOC_HIST_EDO_SEIRITSU_MOSHI,
  "j-soc-hist-edo-tenkai": J_SOC_HIST_EDO_TENKAI_MOSHI,
  "j-soc-hist-gendai": J_SOC_HIST_GENDAI_MOSHI,
  "j-soc-hist-heian": J_SOC_HIST_HEIAN_MOSHI,
  "j-soc-hist-kaikoku": J_SOC_HIST_KAIKOKU_MOSHI,
  "j-soc-hist-kamakura": J_SOC_HIST_KAMAKURA_MOSHI,
  "j-soc-hist-kodai-kokka": J_SOC_HIST_KODAI_KOKKA_MOSHI,
  "j-soc-hist-meiji-ishin": J_SOC_HIST_MEIJI_ISHIN_MOSHI,
  "j-soc-hist-muromachi": J_SOC_HIST_MUROMACHI_MOSHI,
  "j-soc-hist-nihon-naritachi": J_SOC_HIST_NIHON_NARITACHI_MOSHI,
  "j-soc-hist-rikken": J_SOC_HIST_RIKKEN_MOSHI,
  "j-soc-hist-sekai-taisen": J_SOC_HIST_SEKAI_TAISEN_MOSHI,
  "j-soc-hist-sengo": J_SOC_HIST_SENGO_MOSHI,
  "j-soc-hist-taisho": J_SOC_HIST_TAISHO_MOSHI,
  "j-soc-hist-tenka-toitsu": J_SOC_HIST_TENKA_TOITSU_MOSHI,
  "j-soc-hist-toraekata": J_SOC_HIST_TORAEKATA_MOSHI,
};
