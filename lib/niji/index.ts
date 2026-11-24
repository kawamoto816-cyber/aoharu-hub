import { KYOTO_2026_CHEM } from "./kyoto-2026-chem";
import { KYOTO_2026_MATH_BUN } from "./kyoto-2026-math-bun";
import { KYOTO_2026_MATH_RI } from "./kyoto-2026-math-ri";
import { KYOTO_2026_PHY } from "./kyoto-2026-phy";
import type { NijiExam } from "./types";

export const NIJI: NijiExam[] = [
  KYOTO_2026_PHY,
  KYOTO_2026_CHEM,
  KYOTO_2026_MATH_RI,
  KYOTO_2026_MATH_BUN,
];
export const getNiji = (id: string) => NIJI.find((e) => e.id === id);
