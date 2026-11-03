// 自動生成 (scripts/gen-moshi.ts)。手で書きかえない。
import type { Daimon, UnitMoshi } from "./types";
import { E_MATH_5_HAYASA_MOSHI } from "./data/e-math-5-hayasa";
import { H_CIV_KOKYO_CHIHO_MOSHI } from "./data/h-civ-kokyo-chiho";
import { H_CIV_KOKYO_JINKEN_MOSHI } from "./data/h-civ-kokyo-jinken";
import { H_CIV_KOKYO_JIZOKU_MOSHI } from "./data/h-civ-kokyo-jizoku";
import { H_CIV_KOKYO_KEIYAKU_MOSHI } from "./data/h-civ-kokyo-keiyaku";
import { H_CIV_KOKYO_KENPO_MOSHI } from "./data/h-civ-kokyo-kenpo";
import { H_CIV_KOKYO_KINYU_MOSHI } from "./data/h-civ-kokyo-kinyu";
import { H_CIV_KOKYO_KOKUSAI_KEIZAI_MOSHI } from "./data/h-civ-kokyo-kokusai-keizai";
import { H_CIV_KOKYO_KOKUSAI_SEIJI_MOSHI } from "./data/h-civ-kokyo-kokusai-seiji";
import { H_CIV_KOKYO_RODO_MOSHI } from "./data/h-civ-kokyo-rodo";
import { H_CIV_KOKYO_SEINEN_MOSHI } from "./data/h-civ-kokyo-seinen";
import { H_CIV_KOKYO_SENKYO_MOSHI } from "./data/h-civ-kokyo-senkyo";
import { H_CIV_KOKYO_SHIJO_MOSHI } from "./data/h-civ-kokyo-shijo";
import { H_CIV_KOKYO_SHISO_MOSHI } from "./data/h-civ-kokyo-shiso";
import { H_CIV_KOKYO_TOSEI_MOSHI } from "./data/h-civ-kokyo-tosei";
import { H_CIV_RINRI_BUKKYO_MOSHI } from "./data/h-civ-rinri-bukkyo";
import { H_CIV_RINRI_CHINA_MOSHI } from "./data/h-civ-rinri-china";
import { H_CIV_RINRI_CHRIST_MOSHI } from "./data/h-civ-rinri-christ";
import { H_CIV_RINRI_GENDAI_MOSHI } from "./data/h-civ-rinri-gendai";
import { H_CIV_RINRI_GREECE_MOSHI } from "./data/h-civ-rinri-greece";
import { H_CIV_RINRI_ISLAM_MOSHI } from "./data/h-civ-rinri-islam";
import { H_CIV_RINRI_JITSUZON_MOSHI } from "./data/h-civ-rinri-jitsuzon";
import { H_CIV_RINRI_JOHO_MOSHI } from "./data/h-civ-rinri-joho";
import { H_CIV_RINRI_KANKYO_MOSHI } from "./data/h-civ-rinri-kankyo";
import { H_CIV_RINRI_KANT_MOSHI } from "./data/h-civ-rinri-kant";
import { H_CIV_RINRI_KEIKEN_MOSHI } from "./data/h-civ-rinri-keiken";
import { H_CIV_RINRI_KEIYAKU_MOSHI } from "./data/h-civ-rinri-keiyaku";
import { H_CIV_RINRI_KINDAI_NIHON_MOSHI } from "./data/h-civ-rinri-kindai-nihon";
import { H_CIV_RINRI_KORI_MOSHI } from "./data/h-civ-rinri-kori";
import { H_CIV_RINRI_NIHON_MOSHI } from "./data/h-civ-rinri-nihon";
import { H_CIV_RINRI_PRAGMA_MOSHI } from "./data/h-civ-rinri-pragma";
import { H_CIV_RINRI_RENAISSANCE_MOSHI } from "./data/h-civ-rinri-renaissance";
import { H_CIV_RINRI_SEIMEI_MOSHI } from "./data/h-civ-rinri-seimei";
import { H_CIV_RINRI_SEINEN_MOSHI } from "./data/h-civ-rinri-seinen";
import { H_CIV_SEIKEI_BOEKI_MOSHI } from "./data/h-civ-seikei-boeki";
import { H_CIV_SEIKEI_CHIHO_MOSHI } from "./data/h-civ-seikei-chiho";
import { H_CIV_SEIKEI_GENRI_MOSHI } from "./data/h-civ-seikei-genri";
import { H_CIV_SEIKEI_HEIWA_MOSHI } from "./data/h-civ-seikei-heiwa";
import { H_CIV_SEIKEI_JINKEN_MOSHI } from "./data/h-civ-seikei-jinken";
import { H_CIV_SEIKEI_KENPO_MOSHI } from "./data/h-civ-seikei-kenpo";
import { H_CIV_SEIKEI_KINYU_MOSHI } from "./data/h-civ-seikei-kinyu";
import { H_CIV_SEIKEI_KOKKAI_MOSHI } from "./data/h-civ-seikei-kokkai";
import { H_CIV_SEIKEI_KOKUREN_MOSHI } from "./data/h-civ-seikei-kokuren";
import { H_CIV_SEIKEI_NIHON_MOSHI } from "./data/h-civ-seikei-nihon";
import { H_CIV_SEIKEI_RODO_MOSHI } from "./data/h-civ-seikei-rodo";
import { H_CIV_SEIKEI_SAIBAN_MOSHI } from "./data/h-civ-seikei-saiban";
import { H_CIV_SEIKEI_SENKYO_MOSHI } from "./data/h-civ-seikei-senkyo";
import { H_CIV_SEIKEI_SHAKAIHOSHO_MOSHI } from "./data/h-civ-seikei-shakaihosho";
import { H_CIV_SEIKEI_SHIJO_MOSHI } from "./data/h-civ-seikei-shijo";
import { H_CIV_SEIKEI_SHOTOKU_MOSHI } from "./data/h-civ-seikei-shotoku";
import { H_CIV_SEIKEI_TAISEI_MOSHI } from "./data/h-civ-seikei-taisei";
import { H_CIV_SEIKEI_TOGO_MOSHI } from "./data/h-civ-seikei-togo";
import { H_CIV_SEIKEI_ZAISEI_MOSHI } from "./data/h-civ-seikei-zaisei";
import { H_ENG_GRAM_BUNKEI_MOSHI } from "./data/h-eng-gram-bunkei";
import { H_ENG_GRAM_BUNSHI_MOSHI } from "./data/h-eng-gram-bunshi";
import { H_ENG_GRAM_BUNSHIKOBUN_MOSHI } from "./data/h-eng-gram-bunshikobun";
import { H_ENG_GRAM_DAIMEISHI_MOSHI } from "./data/h-eng-gram-daimeishi";
import { H_ENG_GRAM_DOMEISHI_MOSHI } from "./data/h-eng-gram-domeishi";
import { H_ENG_GRAM_FUTEISHI_MOSHI } from "./data/h-eng-gram-futeishi";
import { H_ENG_GRAM_HIKAKU_MOSHI } from "./data/h-eng-gram-hikaku";
import { H_ENG_GRAM_JISEI_MOSHI } from "./data/h-eng-gram-jisei";
import { H_ENG_GRAM_JODOSHI_MOSHI } from "./data/h-eng-gram-jodoshi";
import { H_ENG_GRAM_JUDO_MOSHI } from "./data/h-eng-gram-judo";
import { H_ENG_GRAM_KANDAI_MOSHI } from "./data/h-eng-gram-kandai";
import { H_ENG_GRAM_KANFUKU_MOSHI } from "./data/h-eng-gram-kanfuku";
import { H_ENG_GRAM_KANRYO_MOSHI } from "./data/h-eng-gram-kanryo";
import { H_ENG_GRAM_KATEIHO_MOSHI } from "./data/h-eng-gram-kateiho";
import { H_ENG_GRAM_KEIYOSHI_MOSHI } from "./data/h-eng-gram-keiyoshi";
import { H_ENG_GRAM_MEISHI_MOSHI } from "./data/h-eng-gram-meishi";
import { H_ENG_GRAM_SETSUZOKUSHI_MOSHI } from "./data/h-eng-gram-setsuzokushi";
import { H_ENG_GRAM_TOKUSHU_MOSHI } from "./data/h-eng-gram-tokushu";
import { H_ENG_GRAM_WAHO_MOSHI } from "./data/h-eng-gram-waho";
import { H_ENG_GRAM_ZENCHISHI_MOSHI } from "./data/h-eng-gram-zenchishi";
import { H_ENG_SKILL_CHOBUN_MOSHI } from "./data/h-eng-skill-chobun";
import { H_ENG_SKILL_JIYU_MOSHI } from "./data/h-eng-skill-jiyu";
import { H_ENG_SKILL_LISTENING_MOSHI } from "./data/h-eng-skill-listening";
import { H_ENG_SKILL_SPEAKING_MOSHI } from "./data/h-eng-skill-speaking";
import { H_ENG_SKILL_WABUN_MOSHI } from "./data/h-eng-skill-wabun";
import { H_ENG_VOCAB_2000_MOSHI } from "./data/h-eng-vocab-2000";
import { H_ENG_VOCAB_HATSUON_MOSHI } from "./data/h-eng-vocab-hatsuon";
import { H_ENG_VOCAB_JUKUGO_MOSHI } from "./data/h-eng-vocab-jukugo";
import { H_ENG_VOCAB_KAIWA_MOSHI } from "./data/h-eng-vocab-kaiwa";
import { H_GEO_SOGO_BOSAI_MOSHI } from "./data/h-geo-sogo-bosai";
import { H_GEO_SOGO_CHIKEI_MOSHI } from "./data/h-geo-sogo-chikei";
import { H_GEO_SOGO_CHOSA_MOSHI } from "./data/h-geo-sogo-chosa";
import { H_GEO_SOGO_GIS_MOSHI } from "./data/h-geo-sogo-gis";
import { H_GEO_SOGO_JINKO_MOSHI } from "./data/h-geo-sogo-jinko";
import { H_GEO_SOGO_JISA_MOSHI } from "./data/h-geo-sogo-jisa";
import { H_GEO_SOGO_KANKYO_MOSHI } from "./data/h-geo-sogo-kankyo";
import { H_GEO_SOGO_KIKO_MOSHI } from "./data/h-geo-sogo-kiko";
import { H_GEO_SOGO_MUSUBI_MOSHI } from "./data/h-geo-sogo-musubi";
import { H_GEO_SOGO_SHIGEN_MOSHI } from "./data/h-geo-sogo-shigen";
import { H_GEO_SOGO_SHUKYO_MOSHI } from "./data/h-geo-sogo-shukyo";
import { H_GEO_SOGO_TOSHI_MOSHI } from "./data/h-geo-sogo-toshi";
import { H_GEO_TANKYU_AMERICA_MOSHI } from "./data/h-geo-tankyu-america";
import { H_GEO_TANKYU_CHIKEI_MOSHI } from "./data/h-geo-tankyu-chikei";
import { H_GEO_TANKYU_EUROPE_MOSHI } from "./data/h-geo-tankyu-europe";
import { H_GEO_TANKYU_HIGASHIASIA_MOSHI } from "./data/h-geo-tankyu-higashiasia";
import { H_GEO_TANKYU_JINKO_MOSHI } from "./data/h-geo-tankyu-jinko";
import { H_GEO_TANKYU_KIKO_MOSHI } from "./data/h-geo-tankyu-kiko";
import { H_GEO_TANKYU_KOGYO_MOSHI } from "./data/h-geo-tankyu-kogyo";
import { H_GEO_TANKYU_KOKKA_MOSHI } from "./data/h-geo-tankyu-kokka";
import { H_GEO_TANKYU_KOTSU_MOSHI } from "./data/h-geo-tankyu-kotsu";
import { H_GEO_TANKYU_MINAMIASIA_MOSHI } from "./data/h-geo-tankyu-minamiasia";
import { H_GEO_TANKYU_MINZOKU_MOSHI } from "./data/h-geo-tankyu-minzoku";
import { H_GEO_TANKYU_NIHON_MOSHI } from "./data/h-geo-tankyu-nihon";
import { H_GEO_TANKYU_NISHIASIA_MOSHI } from "./data/h-geo-tankyu-nishiasia";
import { H_GEO_TANKYU_NOGYO_MOSHI } from "./data/h-geo-tankyu-nogyo";
import { H_GEO_TANKYU_OCEANIA_MOSHI } from "./data/h-geo-tankyu-oceania";
import { H_GEO_TANKYU_RUSSIA_MOSHI } from "./data/h-geo-tankyu-russia";
import { H_GEO_TANKYU_SHIGEN_MOSHI } from "./data/h-geo-tankyu-shigen";
import { H_GEO_TANKYU_TOSHI_MOSHI } from "./data/h-geo-tankyu-toshi";
import { H_HIST_JP_ASUKA_MOSHI } from "./data/h-hist-jp-asuka";
import { H_HIST_JP_BAKUMATSU_MOSHI } from "./data/h-hist-jp-bakumatsu";
import { H_HIST_JP_EDO_DOYO_MOSHI } from "./data/h-hist-jp-edo-doyo";
import { H_HIST_JP_EDO_KEIZAI_MOSHI } from "./data/h-hist-jp-edo-keizai";
import { H_HIST_JP_EDO_SEIRITSU_MOSHI } from "./data/h-hist-jp-edo-seiritsu";
import { H_HIST_JP_GENDAI_MOSHI } from "./data/h-hist-jp-gendai";
import { H_HIST_JP_GENSHI_MOSHI } from "./data/h-hist-jp-genshi";
import { H_HIST_JP_HEIAN_MOSHI } from "./data/h-hist-jp-heian";
import { H_HIST_JP_INSEI_MOSHI } from "./data/h-hist-jp-insei";
import { H_HIST_JP_KAMAKURA_MOSHI } from "./data/h-hist-jp-kamakura";
import { H_HIST_JP_KODO_MOSHI } from "./data/h-hist-jp-kodo";
import { H_HIST_JP_KOFUN_MOSHI } from "./data/h-hist-jp-kofun";
import { H_HIST_JP_MEIJI_MOSHI } from "./data/h-hist-jp-meiji";
import { H_HIST_JP_MUROMACHI_MOSHI } from "./data/h-hist-jp-muromachi";
import { H_HIST_JP_NARA_MOSHI } from "./data/h-hist-jp-nara";
import { H_HIST_JP_NICHIRO_MOSHI } from "./data/h-hist-jp-nichiro";
import { H_HIST_JP_SENRYO_MOSHI } from "./data/h-hist-jp-senryo";
import { H_HIST_JP_SENSO_MOSHI } from "./data/h-hist-jp-senso";
import { H_HIST_JP_SHOKUHO_MOSHI } from "./data/h-hist-jp-shokuho";
import { H_HIST_JP_TAISHO_MOSHI } from "./data/h-hist-jp-taisho";
import { H_HIST_SOGO_18C_MOSHI } from "./data/h-hist-sogo-18c";
import { H_HIST_SOGO_DATSU_MOSHI } from "./data/h-hist-sogo-datsu";
import { H_HIST_SOGO_GLOBAL_MOSHI } from "./data/h-hist-sogo-global";
import { H_HIST_SOGO_KAKUMEI_MOSHI } from "./data/h-hist-sogo-kakumei";
import { H_HIST_SOGO_KODO_MOSHI } from "./data/h-hist-sogo-kodo";
import { H_HIST_SOGO_KYOKO_MOSHI } from "./data/h-hist-sogo-kyoko";
import { H_HIST_SOGO_MEIJI_MOSHI } from "./data/h-hist-sogo-meiji";
import { H_HIST_SOGO_NISSHIN_MOSHI } from "./data/h-hist-sogo-nisshin";
import { H_HIST_SOGO_REISEN_MOSHI } from "./data/h-hist-sogo-reisen";
import { H_HIST_SOGO_SANGYO_MOSHI } from "./data/h-hist-sogo-sangyo";
import { H_HIST_SOGO_SENGO_MOSHI } from "./data/h-hist-sogo-sengo";
import { H_HIST_SOGO_TAISHU_MOSHI } from "./data/h-hist-sogo-taishu";
import { H_HIST_SOGO_TEIKOKU_MOSHI } from "./data/h-hist-sogo-teikoku";
import { H_HIST_SOGO_WW1_MOSHI } from "./data/h-hist-sogo-ww1";
import { H_HIST_SOGO_WW2_MOSHI } from "./data/h-hist-sogo-ww2";
import { H_INFO_1_ALGORITHM_MOSHI } from "./data/h-info-1-algorithm";
import { H_INFO_1_ASSYUKU_MOSHI } from "./data/h-info-1-assyuku";
import { H_INFO_1_CHIZAI_MOSHI } from "./data/h-info-1-chizai";
import { H_INFO_1_COMPUTER_MOSHI } from "./data/h-info-1-computer";
import { H_INFO_1_DATA_MOSHI } from "./data/h-info-1-data";
import { H_INFO_1_DESIGN_MOSHI } from "./data/h-info-1-design";
import { H_INFO_1_DIGITAL_MOSHI } from "./data/h-info-1-digital";
import { H_INFO_1_HYOGEN_MOSHI } from "./data/h-info-1-hyogen";
import { H_INFO_1_MEDIA_MOSHI } from "./data/h-info-1-media";
import { H_INFO_1_MODEL_MOSHI } from "./data/h-info-1-model";
import { H_INFO_1_MORAL_MOSHI } from "./data/h-info-1-moral";
import { H_INFO_1_NETWORK_MOSHI } from "./data/h-info-1-network";
import { H_INFO_1_PROGRAM_MOSHI } from "./data/h-info-1-program";
import { H_INFO_1_SYSTEM_MOSHI } from "./data/h-info-1-system";
import { H_JPN_BUNGAKU_HYOGEN_MOSHI } from "./data/h-jpn-bungaku-hyogen";
import { H_JPN_BUNGAKU_HYORON_MOSHI } from "./data/h-jpn-bungaku-hyoron";
import { H_JPN_BUNGAKU_SHI_MOSHI } from "./data/h-jpn-bungaku-shi";
import { H_JPN_BUNGAKU_SHOSETSU_MOSHI } from "./data/h-jpn-bungaku-shosetsu";
import { H_JPN_BUNGAKU_SOSAKU_MOSHI } from "./data/h-jpn-bungaku-sosaku";
import { H_JPN_BUNGAKU_TANKA_MOSHI } from "./data/h-jpn-bungaku-tanka";
import { H_JPN_BUNKA_JODOSHI_MOSHI } from "./data/h-jpn-bunka-jodoshi";
import { H_JPN_BUNKA_KANSHI_MOSHI } from "./data/h-jpn-bunka-kanshi";
import { H_JPN_BUNKA_KINDAI_MOSHI } from "./data/h-jpn-bunka-kindai";
import { H_JPN_BUNKA_KOBUN_DOKKAI_MOSHI } from "./data/h-jpn-bunka-kobun-dokkai";
import { H_JPN_BUNKA_KOBUN_NYUMON_MOSHI } from "./data/h-jpn-bunka-kobun-nyumon";
import { H_JPN_BUNKA_KOBUN_TANGO_MOSHI } from "./data/h-jpn-bunka-kobun-tango";
import { H_JPN_BUNKA_KOJI_MOSHI } from "./data/h-jpn-bunka-koji";
import { H_JPN_BUNKA_KUNDOKU_MOSHI } from "./data/h-jpn-bunka-kundoku";
import { H_JPN_BUNKA_SAIDOKU_MOSHI } from "./data/h-jpn-bunka-saidoku";
import { H_JPN_BUNKA_SHIIKA_MOSHI } from "./data/h-jpn-bunka-shiika";
import { H_JPN_BUNKA_YOGEN_MOSHI } from "./data/h-jpn-bunka-yogen";
import { H_JPN_GEN_GOI_MOSHI } from "./data/h-jpn-gen-goi";
import { H_JPN_GEN_HANASU_MOSHI } from "./data/h-jpn-gen-hanasu";
import { H_JPN_GEN_HOKOKU_MOSHI } from "./data/h-jpn-gen-hokoku";
import { H_JPN_GEN_IKEN_MOSHI } from "./data/h-jpn-gen-iken";
import { H_JPN_GEN_JITSUYO_MOSHI } from "./data/h-jpn-gen-jitsuyo";
import { H_JPN_GEN_KANJI_MOSHI } from "./data/h-jpn-gen-kanji";
import { H_JPN_GEN_RONRI_MOSHI } from "./data/h-jpn-gen-ronri";
import { H_JPN_KOTEN_GENTEI_MOSHI } from "./data/h-jpn-koten-gentei";
import { H_JPN_KOTEN_GIMON_MOSHI } from "./data/h-jpn-koten-gimon";
import { H_JPN_KOTEN_HIKAKU_MOSHI } from "./data/h-jpn-koten-hikaku";
import { H_JPN_KOTEN_HITEI_MOSHI } from "./data/h-jpn-koten-hitei";
import { H_JPN_KOTEN_JOSHI_MOSHI } from "./data/h-jpn-koten-joshi";
import { H_JPN_KOTEN_JOSHIKI_MOSHI } from "./data/h-jpn-koten-joshiki";
import { H_JPN_KOTEN_KEIGO_MOSHI } from "./data/h-jpn-koten-keigo";
import { H_JPN_KOTEN_MONOGATARI_MOSHI } from "./data/h-jpn-koten-monogatari";
import { H_JPN_KOTEN_NIKKI_MOSHI } from "./data/h-jpn-koten-nikki";
import { H_JPN_KOTEN_SHIEKI_MOSHI } from "./data/h-jpn-koten-shieki";
import { H_JPN_KOTEN_SHIKIBETSU_MOSHI } from "./data/h-jpn-koten-shikibetsu";
import { H_JPN_KOTEN_SHISO_MOSHI } from "./data/h-jpn-koten-shiso";
import { H_JPN_KOTEN_WAKA_MOSHI } from "./data/h-jpn-koten-waka";
import { H_JPN_RONRI_HYORON_MOSHI } from "./data/h-jpn-ronri-hyoron";
import { H_JPN_RONRI_KOZO_MOSHI } from "./data/h-jpn-ronri-kozo";
import { H_JPN_RONRI_SHIRYO_MOSHI } from "./data/h-jpn-ronri-shiryo";
import { H_JPN_RONRI_SHORONBUN_MOSHI } from "./data/h-jpn-ronri-shoronbun";
import { H_JPN_RONRI_YOGO_MOSHI } from "./data/h-jpn-ronri-yogo";
import { H_JPN_RONRI_YOYAKU_MOSHI } from "./data/h-jpn-ronri-yoyaku";
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
import { H_MATH_2_BIBUN_MOSHI } from "./data/h-math-2-bibun";
import { H_MATH_2_CHOKUSEN_MOSHI } from "./data/h-math-2-chokusen";
import { H_MATH_2_EN_MOSHI } from "./data/h-math-2-en";
import { H_MATH_2_FUKUSO_MOSHI } from "./data/h-math-2-fukuso";
import { H_MATH_2_KAHOU_MOSHI } from "./data/h-math-2-kahou";
import { H_MATH_2_KISEKI_MOSHI } from "./data/h-math-2-kiseki";
import { H_MATH_2_KOJI_MOSHI } from "./data/h-math-2-koji";
import { H_MATH_2_SANKAKU_MOSHI } from "./data/h-math-2-sankaku";
import { H_MATH_2_SEKIBUN_MOSHI } from "./data/h-math-2-sekibun";
import { H_MATH_2_SHISU_MOSHI } from "./data/h-math-2-shisu";
import { H_MATH_2_SHOMEI_MOSHI } from "./data/h-math-2-shomei";
import { H_MATH_2_TAISU_MOSHI } from "./data/h-math-2-taisu";
import { H_MATH_3_BIBUN_OYO_MOSHI } from "./data/h-math-3-bibun-oyo";
import { H_MATH_3_BIBUN_MOSHI } from "./data/h-math-3-bibun";
import { H_MATH_3_GYAKU_MOSHI } from "./data/h-math-3-gyaku";
import { H_MATH_3_KANSU_MOSHI } from "./data/h-math-3-kansu";
import { H_MATH_3_KYOKUGEN_MOSHI } from "./data/h-math-3-kyokugen";
import { H_MATH_3_SEKIBUN_OYO_MOSHI } from "./data/h-math-3-sekibun-oyo";
import { H_MATH_3_SEKIBUN_MOSHI } from "./data/h-math-3-sekibun";
import { H_MATH_3_SURETSU_MOSHI } from "./data/h-math-3-suretsu";
import { H_MATH_A_BAAI_MOSHI } from "./data/h-math-a-baai";
import { H_MATH_A_EN_MOSHI } from "./data/h-math-a-en";
import { H_MATH_A_GOJO_MOSHI } from "./data/h-math-a-gojo";
import { H_MATH_A_JOKEN_MOSHI } from "./data/h-math-a-joken";
import { H_MATH_A_KAKURITSU_MOSHI } from "./data/h-math-a-kakuritsu";
import { H_MATH_A_KUKAN_MOSHI } from "./data/h-math-a-kukan";
import { H_MATH_A_NSHIN_MOSHI } from "./data/h-math-a-nshin";
import { H_MATH_A_SANKAKUKEI_MOSHI } from "./data/h-math-a-sankakukei";
import { H_MATH_A_YAKUSU_MOSHI } from "./data/h-math-a-yakusu";
import { H_MATH_B_BUNPU_MOSHI } from "./data/h-math-b-bunpu";
import { H_MATH_B_KENTEI_MOSHI } from "./data/h-math-b-kentei";
import { H_MATH_B_KINO_MOSHI } from "./data/h-math-b-kino";
import { H_MATH_B_NIKOU_MOSHI } from "./data/h-math-b-nikou";
import { H_MATH_B_SIGMA_MOSHI } from "./data/h-math-b-sigma";
import { H_MATH_B_SUITEI_MOSHI } from "./data/h-math-b-suitei";
import { H_MATH_B_TOSA_MOSHI } from "./data/h-math-b-tosa";
import { H_MATH_B_ZENKA_MOSHI } from "./data/h-math-b-zenka";
import { H_MATH_C_BAIKAI_MOSHI } from "./data/h-math-c-baikai";
import { H_MATH_C_FUKUSO_MOSHI } from "./data/h-math-c-fukuso";
import { H_MATH_C_HEIMEN_MOSHI } from "./data/h-math-c-heimen";
import { H_MATH_C_KUKAN_MOSHI } from "./data/h-math-c-kukan";
import { H_MATH_C_NIJIKYOKUSEN_MOSHI } from "./data/h-math-c-nijikyokusen";
import { H_MATH_C_ZUKEI_MOSHI } from "./data/h-math-c-zukei";
import { H_SCI_BIOB_BIOME_MOSHI } from "./data/h-sci-biob-biome";
import { H_SCI_BIOB_BUNRETSU_MOSHI } from "./data/h-sci-biob-bunretsu";
import { H_SCI_BIOB_DNA_MOSHI } from "./data/h-sci-biob-dna";
import { H_SCI_BIOB_HATSUGEN_MOSHI } from "./data/h-sci-biob-hatsugen";
import { H_SCI_BIOB_HOZEN_MOSHI } from "./data/h-sci-biob-hozen";
import { H_SCI_BIOB_MENEKI_MOSHI } from "./data/h-sci-biob-meneki";
import { H_SCI_BIOB_SAIBO_MOSHI } from "./data/h-sci-biob-saibo";
import { H_SCI_BIOB_SEITAIKEI_MOSHI } from "./data/h-sci-biob-seitaikei";
import { H_SCI_BIOB_SENTO_MOSHI } from "./data/h-sci-biob-sento";
import { H_SCI_BIOB_SHINKEI_MOSHI } from "./data/h-sci-biob-shinkei";
import { H_SCI_BIOB_TAIEKI_MOSHI } from "./data/h-sci-biob-taieki";
import { H_SCI_BIOB_TAISHA_MOSHI } from "./data/h-sci-biob-taisha";
import { H_SCI_BIOB_TAYOSEI_MOSHI } from "./data/h-sci-biob-tayosei";
import { H_SCI_CHEMB_BUNRI_MOSHI } from "./data/h-sci-chemb-bunri";
import { H_SCI_CHEMB_CHUWA_MOSHI } from "./data/h-sci-chemb-chuwa";
import { H_SCI_CHEMB_DENCHI_MOSHI } from "./data/h-sci-chemb-denchi";
import { H_SCI_CHEMB_GENSHI_MOSHI } from "./data/h-sci-chemb-genshi";
import { H_SCI_CHEMB_GENSO_MOSHI } from "./data/h-sci-chemb-genso";
import { H_SCI_CHEMB_HANNOSHIKI_MOSHI } from "./data/h-sci-chemb-hannoshiki";
import { H_SCI_CHEMB_ION_MOSHI } from "./data/h-sci-chemb-ion";
import { H_SCI_CHEMB_KINZOKU_MOSHI } from "./data/h-sci-chemb-kinzoku";
import { H_SCI_CHEMB_KYOYU_MOSHI } from "./data/h-sci-chemb-kyoyu";
import { H_SCI_CHEMB_MOL_MOSHI } from "./data/h-sci-chemb-mol";
import { H_SCI_CHEMB_SAN_MOSHI } from "./data/h-sci-chemb-san";
import { H_SCI_CHEMB_SANKA_MOSHI } from "./data/h-sci-chemb-sanka";
import { H_SCI_EARTHB_CHISO_MOSHI } from "./data/h-sci-earthb-chiso";
import { H_SCI_EARTHB_JISHIN_MOSHI } from "./data/h-sci-earthb-jishin";
import { H_SCI_EARTHB_JUNKAN_MOSHI } from "./data/h-sci-earthb-junkan";
import { H_SCI_EARTHB_KATACHI_MOSHI } from "./data/h-sci-earthb-katachi";
import { H_SCI_EARTHB_KAZAN_MOSHI } from "./data/h-sci-earthb-kazan";
import { H_SCI_EARTHB_NAIBU_MOSHI } from "./data/h-sci-earthb-naibu";
import { H_SCI_EARTHB_PLATE_MOSHI } from "./data/h-sci-earthb-plate";
import { H_SCI_EARTHB_REKISHI_MOSHI } from "./data/h-sci-earthb-rekishi";
import { H_SCI_EARTHB_SAIGAI_MOSHI } from "./data/h-sci-earthb-saigai";
import { H_SCI_EARTHB_TAIKI_MOSHI } from "./data/h-sci-earthb-taiki";
import { H_SCI_EARTHB_TAIYOKEI_MOSHI } from "./data/h-sci-earthb-taiyokei";
import { H_SCI_EARTHB_UCHU_MOSHI } from "./data/h-sci-earthb-uchu";
import { H_SCI_PHYB_DENRYU_MOSHI } from "./data/h-sci-phyb-denryu";
import { H_SCI_PHYB_ENERGY_MOSHI } from "./data/h-sci-phyb-energy";
import { H_SCI_PHYB_HOSOKU_MOSHI } from "./data/h-sci-phyb-hosoku";
import { H_SCI_PHYB_KORYU_MOSHI } from "./data/h-sci-phyb-koryu";
import { H_SCI_PHYB_NAMI_MOSHI } from "./data/h-sci-phyb-nami";
import { H_SCI_PHYB_NETSU_MOSHI } from "./data/h-sci-phyb-netsu";
import { H_SCI_PHYB_OTO_MOSHI } from "./data/h-sci-phyb-oto";
import { H_SCI_PHYB_RIYO_MOSHI } from "./data/h-sci-phyb-riyo";
import { H_SCI_PHYB_UNDO_MOSHI } from "./data/h-sci-phyb-undo";
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
  "h-civ-kokyo-chiho": H_CIV_KOKYO_CHIHO_MOSHI,
  "h-civ-kokyo-jinken": H_CIV_KOKYO_JINKEN_MOSHI,
  "h-civ-kokyo-jizoku": H_CIV_KOKYO_JIZOKU_MOSHI,
  "h-civ-kokyo-keiyaku": H_CIV_KOKYO_KEIYAKU_MOSHI,
  "h-civ-kokyo-kenpo": H_CIV_KOKYO_KENPO_MOSHI,
  "h-civ-kokyo-kinyu": H_CIV_KOKYO_KINYU_MOSHI,
  "h-civ-kokyo-kokusai-keizai": H_CIV_KOKYO_KOKUSAI_KEIZAI_MOSHI,
  "h-civ-kokyo-kokusai-seiji": H_CIV_KOKYO_KOKUSAI_SEIJI_MOSHI,
  "h-civ-kokyo-rodo": H_CIV_KOKYO_RODO_MOSHI,
  "h-civ-kokyo-seinen": H_CIV_KOKYO_SEINEN_MOSHI,
  "h-civ-kokyo-senkyo": H_CIV_KOKYO_SENKYO_MOSHI,
  "h-civ-kokyo-shijo": H_CIV_KOKYO_SHIJO_MOSHI,
  "h-civ-kokyo-shiso": H_CIV_KOKYO_SHISO_MOSHI,
  "h-civ-kokyo-tosei": H_CIV_KOKYO_TOSEI_MOSHI,
  "h-civ-rinri-bukkyo": H_CIV_RINRI_BUKKYO_MOSHI,
  "h-civ-rinri-china": H_CIV_RINRI_CHINA_MOSHI,
  "h-civ-rinri-christ": H_CIV_RINRI_CHRIST_MOSHI,
  "h-civ-rinri-gendai": H_CIV_RINRI_GENDAI_MOSHI,
  "h-civ-rinri-greece": H_CIV_RINRI_GREECE_MOSHI,
  "h-civ-rinri-islam": H_CIV_RINRI_ISLAM_MOSHI,
  "h-civ-rinri-jitsuzon": H_CIV_RINRI_JITSUZON_MOSHI,
  "h-civ-rinri-joho": H_CIV_RINRI_JOHO_MOSHI,
  "h-civ-rinri-kankyo": H_CIV_RINRI_KANKYO_MOSHI,
  "h-civ-rinri-kant": H_CIV_RINRI_KANT_MOSHI,
  "h-civ-rinri-keiken": H_CIV_RINRI_KEIKEN_MOSHI,
  "h-civ-rinri-keiyaku": H_CIV_RINRI_KEIYAKU_MOSHI,
  "h-civ-rinri-kindai-nihon": H_CIV_RINRI_KINDAI_NIHON_MOSHI,
  "h-civ-rinri-kori": H_CIV_RINRI_KORI_MOSHI,
  "h-civ-rinri-nihon": H_CIV_RINRI_NIHON_MOSHI,
  "h-civ-rinri-pragma": H_CIV_RINRI_PRAGMA_MOSHI,
  "h-civ-rinri-renaissance": H_CIV_RINRI_RENAISSANCE_MOSHI,
  "h-civ-rinri-seimei": H_CIV_RINRI_SEIMEI_MOSHI,
  "h-civ-rinri-seinen": H_CIV_RINRI_SEINEN_MOSHI,
  "h-civ-seikei-boeki": H_CIV_SEIKEI_BOEKI_MOSHI,
  "h-civ-seikei-chiho": H_CIV_SEIKEI_CHIHO_MOSHI,
  "h-civ-seikei-genri": H_CIV_SEIKEI_GENRI_MOSHI,
  "h-civ-seikei-heiwa": H_CIV_SEIKEI_HEIWA_MOSHI,
  "h-civ-seikei-jinken": H_CIV_SEIKEI_JINKEN_MOSHI,
  "h-civ-seikei-kenpo": H_CIV_SEIKEI_KENPO_MOSHI,
  "h-civ-seikei-kinyu": H_CIV_SEIKEI_KINYU_MOSHI,
  "h-civ-seikei-kokkai": H_CIV_SEIKEI_KOKKAI_MOSHI,
  "h-civ-seikei-kokuren": H_CIV_SEIKEI_KOKUREN_MOSHI,
  "h-civ-seikei-nihon": H_CIV_SEIKEI_NIHON_MOSHI,
  "h-civ-seikei-rodo": H_CIV_SEIKEI_RODO_MOSHI,
  "h-civ-seikei-saiban": H_CIV_SEIKEI_SAIBAN_MOSHI,
  "h-civ-seikei-senkyo": H_CIV_SEIKEI_SENKYO_MOSHI,
  "h-civ-seikei-shakaihosho": H_CIV_SEIKEI_SHAKAIHOSHO_MOSHI,
  "h-civ-seikei-shijo": H_CIV_SEIKEI_SHIJO_MOSHI,
  "h-civ-seikei-shotoku": H_CIV_SEIKEI_SHOTOKU_MOSHI,
  "h-civ-seikei-taisei": H_CIV_SEIKEI_TAISEI_MOSHI,
  "h-civ-seikei-togo": H_CIV_SEIKEI_TOGO_MOSHI,
  "h-civ-seikei-zaisei": H_CIV_SEIKEI_ZAISEI_MOSHI,
  "h-eng-gram-bunkei": H_ENG_GRAM_BUNKEI_MOSHI,
  "h-eng-gram-bunshi": H_ENG_GRAM_BUNSHI_MOSHI,
  "h-eng-gram-bunshikobun": H_ENG_GRAM_BUNSHIKOBUN_MOSHI,
  "h-eng-gram-daimeishi": H_ENG_GRAM_DAIMEISHI_MOSHI,
  "h-eng-gram-domeishi": H_ENG_GRAM_DOMEISHI_MOSHI,
  "h-eng-gram-futeishi": H_ENG_GRAM_FUTEISHI_MOSHI,
  "h-eng-gram-hikaku": H_ENG_GRAM_HIKAKU_MOSHI,
  "h-eng-gram-jisei": H_ENG_GRAM_JISEI_MOSHI,
  "h-eng-gram-jodoshi": H_ENG_GRAM_JODOSHI_MOSHI,
  "h-eng-gram-judo": H_ENG_GRAM_JUDO_MOSHI,
  "h-eng-gram-kandai": H_ENG_GRAM_KANDAI_MOSHI,
  "h-eng-gram-kanfuku": H_ENG_GRAM_KANFUKU_MOSHI,
  "h-eng-gram-kanryo": H_ENG_GRAM_KANRYO_MOSHI,
  "h-eng-gram-kateiho": H_ENG_GRAM_KATEIHO_MOSHI,
  "h-eng-gram-keiyoshi": H_ENG_GRAM_KEIYOSHI_MOSHI,
  "h-eng-gram-meishi": H_ENG_GRAM_MEISHI_MOSHI,
  "h-eng-gram-setsuzokushi": H_ENG_GRAM_SETSUZOKUSHI_MOSHI,
  "h-eng-gram-tokushu": H_ENG_GRAM_TOKUSHU_MOSHI,
  "h-eng-gram-waho": H_ENG_GRAM_WAHO_MOSHI,
  "h-eng-gram-zenchishi": H_ENG_GRAM_ZENCHISHI_MOSHI,
  "h-eng-skill-chobun": H_ENG_SKILL_CHOBUN_MOSHI,
  "h-eng-skill-jiyu": H_ENG_SKILL_JIYU_MOSHI,
  "h-eng-skill-listening": H_ENG_SKILL_LISTENING_MOSHI,
  "h-eng-skill-speaking": H_ENG_SKILL_SPEAKING_MOSHI,
  "h-eng-skill-wabun": H_ENG_SKILL_WABUN_MOSHI,
  "h-eng-vocab-2000": H_ENG_VOCAB_2000_MOSHI,
  "h-eng-vocab-hatsuon": H_ENG_VOCAB_HATSUON_MOSHI,
  "h-eng-vocab-jukugo": H_ENG_VOCAB_JUKUGO_MOSHI,
  "h-eng-vocab-kaiwa": H_ENG_VOCAB_KAIWA_MOSHI,
  "h-geo-sogo-bosai": H_GEO_SOGO_BOSAI_MOSHI,
  "h-geo-sogo-chikei": H_GEO_SOGO_CHIKEI_MOSHI,
  "h-geo-sogo-chosa": H_GEO_SOGO_CHOSA_MOSHI,
  "h-geo-sogo-gis": H_GEO_SOGO_GIS_MOSHI,
  "h-geo-sogo-jinko": H_GEO_SOGO_JINKO_MOSHI,
  "h-geo-sogo-jisa": H_GEO_SOGO_JISA_MOSHI,
  "h-geo-sogo-kankyo": H_GEO_SOGO_KANKYO_MOSHI,
  "h-geo-sogo-kiko": H_GEO_SOGO_KIKO_MOSHI,
  "h-geo-sogo-musubi": H_GEO_SOGO_MUSUBI_MOSHI,
  "h-geo-sogo-shigen": H_GEO_SOGO_SHIGEN_MOSHI,
  "h-geo-sogo-shukyo": H_GEO_SOGO_SHUKYO_MOSHI,
  "h-geo-sogo-toshi": H_GEO_SOGO_TOSHI_MOSHI,
  "h-geo-tankyu-america": H_GEO_TANKYU_AMERICA_MOSHI,
  "h-geo-tankyu-chikei": H_GEO_TANKYU_CHIKEI_MOSHI,
  "h-geo-tankyu-europe": H_GEO_TANKYU_EUROPE_MOSHI,
  "h-geo-tankyu-higashiasia": H_GEO_TANKYU_HIGASHIASIA_MOSHI,
  "h-geo-tankyu-jinko": H_GEO_TANKYU_JINKO_MOSHI,
  "h-geo-tankyu-kiko": H_GEO_TANKYU_KIKO_MOSHI,
  "h-geo-tankyu-kogyo": H_GEO_TANKYU_KOGYO_MOSHI,
  "h-geo-tankyu-kokka": H_GEO_TANKYU_KOKKA_MOSHI,
  "h-geo-tankyu-kotsu": H_GEO_TANKYU_KOTSU_MOSHI,
  "h-geo-tankyu-minamiasia": H_GEO_TANKYU_MINAMIASIA_MOSHI,
  "h-geo-tankyu-minzoku": H_GEO_TANKYU_MINZOKU_MOSHI,
  "h-geo-tankyu-nihon": H_GEO_TANKYU_NIHON_MOSHI,
  "h-geo-tankyu-nishiasia": H_GEO_TANKYU_NISHIASIA_MOSHI,
  "h-geo-tankyu-nogyo": H_GEO_TANKYU_NOGYO_MOSHI,
  "h-geo-tankyu-oceania": H_GEO_TANKYU_OCEANIA_MOSHI,
  "h-geo-tankyu-russia": H_GEO_TANKYU_RUSSIA_MOSHI,
  "h-geo-tankyu-shigen": H_GEO_TANKYU_SHIGEN_MOSHI,
  "h-geo-tankyu-toshi": H_GEO_TANKYU_TOSHI_MOSHI,
  "h-hist-jp-asuka": H_HIST_JP_ASUKA_MOSHI,
  "h-hist-jp-bakumatsu": H_HIST_JP_BAKUMATSU_MOSHI,
  "h-hist-jp-edo-doyo": H_HIST_JP_EDO_DOYO_MOSHI,
  "h-hist-jp-edo-keizai": H_HIST_JP_EDO_KEIZAI_MOSHI,
  "h-hist-jp-edo-seiritsu": H_HIST_JP_EDO_SEIRITSU_MOSHI,
  "h-hist-jp-gendai": H_HIST_JP_GENDAI_MOSHI,
  "h-hist-jp-genshi": H_HIST_JP_GENSHI_MOSHI,
  "h-hist-jp-heian": H_HIST_JP_HEIAN_MOSHI,
  "h-hist-jp-insei": H_HIST_JP_INSEI_MOSHI,
  "h-hist-jp-kamakura": H_HIST_JP_KAMAKURA_MOSHI,
  "h-hist-jp-kodo": H_HIST_JP_KODO_MOSHI,
  "h-hist-jp-kofun": H_HIST_JP_KOFUN_MOSHI,
  "h-hist-jp-meiji": H_HIST_JP_MEIJI_MOSHI,
  "h-hist-jp-muromachi": H_HIST_JP_MUROMACHI_MOSHI,
  "h-hist-jp-nara": H_HIST_JP_NARA_MOSHI,
  "h-hist-jp-nichiro": H_HIST_JP_NICHIRO_MOSHI,
  "h-hist-jp-senryo": H_HIST_JP_SENRYO_MOSHI,
  "h-hist-jp-senso": H_HIST_JP_SENSO_MOSHI,
  "h-hist-jp-shokuho": H_HIST_JP_SHOKUHO_MOSHI,
  "h-hist-jp-taisho": H_HIST_JP_TAISHO_MOSHI,
  "h-hist-sogo-18c": H_HIST_SOGO_18C_MOSHI,
  "h-hist-sogo-datsu": H_HIST_SOGO_DATSU_MOSHI,
  "h-hist-sogo-global": H_HIST_SOGO_GLOBAL_MOSHI,
  "h-hist-sogo-kakumei": H_HIST_SOGO_KAKUMEI_MOSHI,
  "h-hist-sogo-kodo": H_HIST_SOGO_KODO_MOSHI,
  "h-hist-sogo-kyoko": H_HIST_SOGO_KYOKO_MOSHI,
  "h-hist-sogo-meiji": H_HIST_SOGO_MEIJI_MOSHI,
  "h-hist-sogo-nisshin": H_HIST_SOGO_NISSHIN_MOSHI,
  "h-hist-sogo-reisen": H_HIST_SOGO_REISEN_MOSHI,
  "h-hist-sogo-sangyo": H_HIST_SOGO_SANGYO_MOSHI,
  "h-hist-sogo-sengo": H_HIST_SOGO_SENGO_MOSHI,
  "h-hist-sogo-taishu": H_HIST_SOGO_TAISHU_MOSHI,
  "h-hist-sogo-teikoku": H_HIST_SOGO_TEIKOKU_MOSHI,
  "h-hist-sogo-ww1": H_HIST_SOGO_WW1_MOSHI,
  "h-hist-sogo-ww2": H_HIST_SOGO_WW2_MOSHI,
  "h-info-1-algorithm": H_INFO_1_ALGORITHM_MOSHI,
  "h-info-1-assyuku": H_INFO_1_ASSYUKU_MOSHI,
  "h-info-1-chizai": H_INFO_1_CHIZAI_MOSHI,
  "h-info-1-computer": H_INFO_1_COMPUTER_MOSHI,
  "h-info-1-data": H_INFO_1_DATA_MOSHI,
  "h-info-1-design": H_INFO_1_DESIGN_MOSHI,
  "h-info-1-digital": H_INFO_1_DIGITAL_MOSHI,
  "h-info-1-hyogen": H_INFO_1_HYOGEN_MOSHI,
  "h-info-1-media": H_INFO_1_MEDIA_MOSHI,
  "h-info-1-model": H_INFO_1_MODEL_MOSHI,
  "h-info-1-moral": H_INFO_1_MORAL_MOSHI,
  "h-info-1-network": H_INFO_1_NETWORK_MOSHI,
  "h-info-1-program": H_INFO_1_PROGRAM_MOSHI,
  "h-info-1-system": H_INFO_1_SYSTEM_MOSHI,
  "h-jpn-bungaku-hyogen": H_JPN_BUNGAKU_HYOGEN_MOSHI,
  "h-jpn-bungaku-hyoron": H_JPN_BUNGAKU_HYORON_MOSHI,
  "h-jpn-bungaku-shi": H_JPN_BUNGAKU_SHI_MOSHI,
  "h-jpn-bungaku-shosetsu": H_JPN_BUNGAKU_SHOSETSU_MOSHI,
  "h-jpn-bungaku-sosaku": H_JPN_BUNGAKU_SOSAKU_MOSHI,
  "h-jpn-bungaku-tanka": H_JPN_BUNGAKU_TANKA_MOSHI,
  "h-jpn-bunka-jodoshi": H_JPN_BUNKA_JODOSHI_MOSHI,
  "h-jpn-bunka-kanshi": H_JPN_BUNKA_KANSHI_MOSHI,
  "h-jpn-bunka-kindai": H_JPN_BUNKA_KINDAI_MOSHI,
  "h-jpn-bunka-kobun-dokkai": H_JPN_BUNKA_KOBUN_DOKKAI_MOSHI,
  "h-jpn-bunka-kobun-nyumon": H_JPN_BUNKA_KOBUN_NYUMON_MOSHI,
  "h-jpn-bunka-kobun-tango": H_JPN_BUNKA_KOBUN_TANGO_MOSHI,
  "h-jpn-bunka-koji": H_JPN_BUNKA_KOJI_MOSHI,
  "h-jpn-bunka-kundoku": H_JPN_BUNKA_KUNDOKU_MOSHI,
  "h-jpn-bunka-saidoku": H_JPN_BUNKA_SAIDOKU_MOSHI,
  "h-jpn-bunka-shiika": H_JPN_BUNKA_SHIIKA_MOSHI,
  "h-jpn-bunka-yogen": H_JPN_BUNKA_YOGEN_MOSHI,
  "h-jpn-gen-goi": H_JPN_GEN_GOI_MOSHI,
  "h-jpn-gen-hanasu": H_JPN_GEN_HANASU_MOSHI,
  "h-jpn-gen-hokoku": H_JPN_GEN_HOKOKU_MOSHI,
  "h-jpn-gen-iken": H_JPN_GEN_IKEN_MOSHI,
  "h-jpn-gen-jitsuyo": H_JPN_GEN_JITSUYO_MOSHI,
  "h-jpn-gen-kanji": H_JPN_GEN_KANJI_MOSHI,
  "h-jpn-gen-ronri": H_JPN_GEN_RONRI_MOSHI,
  "h-jpn-koten-gentei": H_JPN_KOTEN_GENTEI_MOSHI,
  "h-jpn-koten-gimon": H_JPN_KOTEN_GIMON_MOSHI,
  "h-jpn-koten-hikaku": H_JPN_KOTEN_HIKAKU_MOSHI,
  "h-jpn-koten-hitei": H_JPN_KOTEN_HITEI_MOSHI,
  "h-jpn-koten-joshi": H_JPN_KOTEN_JOSHI_MOSHI,
  "h-jpn-koten-joshiki": H_JPN_KOTEN_JOSHIKI_MOSHI,
  "h-jpn-koten-keigo": H_JPN_KOTEN_KEIGO_MOSHI,
  "h-jpn-koten-monogatari": H_JPN_KOTEN_MONOGATARI_MOSHI,
  "h-jpn-koten-nikki": H_JPN_KOTEN_NIKKI_MOSHI,
  "h-jpn-koten-shieki": H_JPN_KOTEN_SHIEKI_MOSHI,
  "h-jpn-koten-shikibetsu": H_JPN_KOTEN_SHIKIBETSU_MOSHI,
  "h-jpn-koten-shiso": H_JPN_KOTEN_SHISO_MOSHI,
  "h-jpn-koten-waka": H_JPN_KOTEN_WAKA_MOSHI,
  "h-jpn-ronri-hyoron": H_JPN_RONRI_HYORON_MOSHI,
  "h-jpn-ronri-kozo": H_JPN_RONRI_KOZO_MOSHI,
  "h-jpn-ronri-shiryo": H_JPN_RONRI_SHIRYO_MOSHI,
  "h-jpn-ronri-shoronbun": H_JPN_RONRI_SHORONBUN_MOSHI,
  "h-jpn-ronri-yogo": H_JPN_RONRI_YOGO_MOSHI,
  "h-jpn-ronri-yoyaku": H_JPN_RONRI_YOYAKU_MOSHI,
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
  "h-math-2-bibun": H_MATH_2_BIBUN_MOSHI,
  "h-math-2-chokusen": H_MATH_2_CHOKUSEN_MOSHI,
  "h-math-2-en": H_MATH_2_EN_MOSHI,
  "h-math-2-fukuso": H_MATH_2_FUKUSO_MOSHI,
  "h-math-2-kahou": H_MATH_2_KAHOU_MOSHI,
  "h-math-2-kiseki": H_MATH_2_KISEKI_MOSHI,
  "h-math-2-koji": H_MATH_2_KOJI_MOSHI,
  "h-math-2-sankaku": H_MATH_2_SANKAKU_MOSHI,
  "h-math-2-sekibun": H_MATH_2_SEKIBUN_MOSHI,
  "h-math-2-shisu": H_MATH_2_SHISU_MOSHI,
  "h-math-2-shomei": H_MATH_2_SHOMEI_MOSHI,
  "h-math-2-taisu": H_MATH_2_TAISU_MOSHI,
  "h-math-3-bibun-oyo": H_MATH_3_BIBUN_OYO_MOSHI,
  "h-math-3-bibun": H_MATH_3_BIBUN_MOSHI,
  "h-math-3-gyaku": H_MATH_3_GYAKU_MOSHI,
  "h-math-3-kansu": H_MATH_3_KANSU_MOSHI,
  "h-math-3-kyokugen": H_MATH_3_KYOKUGEN_MOSHI,
  "h-math-3-sekibun-oyo": H_MATH_3_SEKIBUN_OYO_MOSHI,
  "h-math-3-sekibun": H_MATH_3_SEKIBUN_MOSHI,
  "h-math-3-suretsu": H_MATH_3_SURETSU_MOSHI,
  "h-math-a-baai": H_MATH_A_BAAI_MOSHI,
  "h-math-a-en": H_MATH_A_EN_MOSHI,
  "h-math-a-gojo": H_MATH_A_GOJO_MOSHI,
  "h-math-a-joken": H_MATH_A_JOKEN_MOSHI,
  "h-math-a-kakuritsu": H_MATH_A_KAKURITSU_MOSHI,
  "h-math-a-kukan": H_MATH_A_KUKAN_MOSHI,
  "h-math-a-nshin": H_MATH_A_NSHIN_MOSHI,
  "h-math-a-sankakukei": H_MATH_A_SANKAKUKEI_MOSHI,
  "h-math-a-yakusu": H_MATH_A_YAKUSU_MOSHI,
  "h-math-b-bunpu": H_MATH_B_BUNPU_MOSHI,
  "h-math-b-kentei": H_MATH_B_KENTEI_MOSHI,
  "h-math-b-kino": H_MATH_B_KINO_MOSHI,
  "h-math-b-nikou": H_MATH_B_NIKOU_MOSHI,
  "h-math-b-sigma": H_MATH_B_SIGMA_MOSHI,
  "h-math-b-suitei": H_MATH_B_SUITEI_MOSHI,
  "h-math-b-tosa": H_MATH_B_TOSA_MOSHI,
  "h-math-b-zenka": H_MATH_B_ZENKA_MOSHI,
  "h-math-c-baikai": H_MATH_C_BAIKAI_MOSHI,
  "h-math-c-fukuso": H_MATH_C_FUKUSO_MOSHI,
  "h-math-c-heimen": H_MATH_C_HEIMEN_MOSHI,
  "h-math-c-kukan": H_MATH_C_KUKAN_MOSHI,
  "h-math-c-nijikyokusen": H_MATH_C_NIJIKYOKUSEN_MOSHI,
  "h-math-c-zukei": H_MATH_C_ZUKEI_MOSHI,
  "h-sci-biob-biome": H_SCI_BIOB_BIOME_MOSHI,
  "h-sci-biob-bunretsu": H_SCI_BIOB_BUNRETSU_MOSHI,
  "h-sci-biob-dna": H_SCI_BIOB_DNA_MOSHI,
  "h-sci-biob-hatsugen": H_SCI_BIOB_HATSUGEN_MOSHI,
  "h-sci-biob-hozen": H_SCI_BIOB_HOZEN_MOSHI,
  "h-sci-biob-meneki": H_SCI_BIOB_MENEKI_MOSHI,
  "h-sci-biob-saibo": H_SCI_BIOB_SAIBO_MOSHI,
  "h-sci-biob-seitaikei": H_SCI_BIOB_SEITAIKEI_MOSHI,
  "h-sci-biob-sento": H_SCI_BIOB_SENTO_MOSHI,
  "h-sci-biob-shinkei": H_SCI_BIOB_SHINKEI_MOSHI,
  "h-sci-biob-taieki": H_SCI_BIOB_TAIEKI_MOSHI,
  "h-sci-biob-taisha": H_SCI_BIOB_TAISHA_MOSHI,
  "h-sci-biob-tayosei": H_SCI_BIOB_TAYOSEI_MOSHI,
  "h-sci-chemb-bunri": H_SCI_CHEMB_BUNRI_MOSHI,
  "h-sci-chemb-chuwa": H_SCI_CHEMB_CHUWA_MOSHI,
  "h-sci-chemb-denchi": H_SCI_CHEMB_DENCHI_MOSHI,
  "h-sci-chemb-genshi": H_SCI_CHEMB_GENSHI_MOSHI,
  "h-sci-chemb-genso": H_SCI_CHEMB_GENSO_MOSHI,
  "h-sci-chemb-hannoshiki": H_SCI_CHEMB_HANNOSHIKI_MOSHI,
  "h-sci-chemb-ion": H_SCI_CHEMB_ION_MOSHI,
  "h-sci-chemb-kinzoku": H_SCI_CHEMB_KINZOKU_MOSHI,
  "h-sci-chemb-kyoyu": H_SCI_CHEMB_KYOYU_MOSHI,
  "h-sci-chemb-mol": H_SCI_CHEMB_MOL_MOSHI,
  "h-sci-chemb-san": H_SCI_CHEMB_SAN_MOSHI,
  "h-sci-chemb-sanka": H_SCI_CHEMB_SANKA_MOSHI,
  "h-sci-earthb-chiso": H_SCI_EARTHB_CHISO_MOSHI,
  "h-sci-earthb-jishin": H_SCI_EARTHB_JISHIN_MOSHI,
  "h-sci-earthb-junkan": H_SCI_EARTHB_JUNKAN_MOSHI,
  "h-sci-earthb-katachi": H_SCI_EARTHB_KATACHI_MOSHI,
  "h-sci-earthb-kazan": H_SCI_EARTHB_KAZAN_MOSHI,
  "h-sci-earthb-naibu": H_SCI_EARTHB_NAIBU_MOSHI,
  "h-sci-earthb-plate": H_SCI_EARTHB_PLATE_MOSHI,
  "h-sci-earthb-rekishi": H_SCI_EARTHB_REKISHI_MOSHI,
  "h-sci-earthb-saigai": H_SCI_EARTHB_SAIGAI_MOSHI,
  "h-sci-earthb-taiki": H_SCI_EARTHB_TAIKI_MOSHI,
  "h-sci-earthb-taiyokei": H_SCI_EARTHB_TAIYOKEI_MOSHI,
  "h-sci-earthb-uchu": H_SCI_EARTHB_UCHU_MOSHI,
  "h-sci-phyb-denryu": H_SCI_PHYB_DENRYU_MOSHI,
  "h-sci-phyb-energy": H_SCI_PHYB_ENERGY_MOSHI,
  "h-sci-phyb-hosoku": H_SCI_PHYB_HOSOKU_MOSHI,
  "h-sci-phyb-koryu": H_SCI_PHYB_KORYU_MOSHI,
  "h-sci-phyb-nami": H_SCI_PHYB_NAMI_MOSHI,
  "h-sci-phyb-netsu": H_SCI_PHYB_NETSU_MOSHI,
  "h-sci-phyb-oto": H_SCI_PHYB_OTO_MOSHI,
  "h-sci-phyb-riyo": H_SCI_PHYB_RIYO_MOSHI,
  "h-sci-phyb-undo": H_SCI_PHYB_UNDO_MOSHI,
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
