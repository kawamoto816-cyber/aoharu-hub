import type { NijiExam } from "@/lib/niji/types";
import { AOMORI_2026 } from "./aomori-2026";
import { TOKYO_2026 } from "./tokyo-2026";

// 公立高校入試の過去問チャレンジ (/learn/koko-nyushi)。データの形と画面は、2次試験の過去問チャレンジ (lib/niji) と同じものを使う。
export const KOKO: NijiExam[] = [...TOKYO_2026, ...AOMORI_2026];
export const getKoko = (id: string) => KOKO.find((e) => e.id === id);
