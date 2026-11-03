// 自動生成 (scripts/gen-moshi.ts)。手で書きかえない。
import type { Daimon, UnitMoshi } from "./types";
import { E_MATH_5_HAYASA_MOSHI } from "./data/e-math-5-hayasa";
import { J_JA_1_SETSUMEI_MOSHI } from "./data/j-ja-1-setsumei";
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
import { J_SOC_CIV_KENPO_MOSHI } from "./data/j-soc-civ-kenpo";

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
  "j-ja-1-setsumei": J_JA_1_SETSUMEI_MOSHI,
  "j-soc-civ-kenpo": J_SOC_CIV_KENPO_MOSHI,
};
