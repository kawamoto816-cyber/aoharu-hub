import type { NijiExam } from "@/lib/niji/types";
import { AKITA_2026 } from "./akita-2026";
import { AOMORI_2026 } from "./aomori-2026";
import { GIFU_2026 } from "./gifu-2026";
import { GUNMA_2026 } from "./gunma-2026";
import { KANAGAWA_2026 } from "./kanagawa-2026";
import { SAITAMA_2026 } from "./saitama-2026";
import { SHIZUOKA_2026 } from "./shizuoka-2026";
import { TOKYO_2026 } from "./tokyo-2026";

// 公立高校入試の過去問チャレンジ (/learn/koko-nyushi)。データの形と画面は、2次試験の過去問チャレンジ (lib/niji) と同じものを使う。
export const KOKO: NijiExam[] = [
  ...TOKYO_2026,
  ...AOMORI_2026,
  ...AKITA_2026,
  ...GUNMA_2026,
  ...SAITAMA_2026,
  ...SHIZUOKA_2026,
  ...GIFU_2026,
  ...KANAGAWA_2026,
];
export const getKoko = (id: string) => KOKO.find((e) => e.id === id);
