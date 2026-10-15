import { Klee_One, Zen_Kaku_Gothic_New } from "next/font/google";

// トップページとアプリ紹介ページで共通の書体 (日本語は preload しない)
export const zen = Zen_Kaku_Gothic_New({ weight: ["400", "500", "700", "900"], subsets: ["latin"], display: "swap", preload: false });
export const klee = Klee_One({ weight: "600", subsets: ["latin"], display: "swap", preload: false });
