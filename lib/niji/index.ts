import { KYOTO_2026_PHY } from "./kyoto-2026-phy";
import type { NijiExam } from "./types";

export const NIJI: NijiExam[] = [KYOTO_2026_PHY];
export const getNiji = (id: string) => NIJI.find((e) => e.id === id);
