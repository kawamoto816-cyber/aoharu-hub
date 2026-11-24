import { KYOTO_2026_BIO } from "./kyoto-2026-bio";
import { KYOTO_2026_CHEM } from "./kyoto-2026-chem";
import { KYOTO_2026_EARTH } from "./kyoto-2026-earth";
import { KYOTO_2026_MATH_BUN } from "./kyoto-2026-math-bun";
import { KYOTO_2026_MATH_RI } from "./kyoto-2026-math-ri";
import { KYOTO_2026_NIHONSHI } from "./kyoto-2026-nihonshi";
import { KYOTO_2026_PHY } from "./kyoto-2026-phy";
import { KYOTO_2026_SEKAISHI } from "./kyoto-2026-sekaishi";
import type { NijiExam } from "./types";

export const NIJI: NijiExam[] = [
  KYOTO_2026_PHY,
  KYOTO_2026_CHEM,
  KYOTO_2026_BIO,
  KYOTO_2026_EARTH,
  KYOTO_2026_MATH_RI,
  KYOTO_2026_MATH_BUN,
  KYOTO_2026_NIHONSHI,
  KYOTO_2026_SEKAISHI,
];
export const getNiji = (id: string) => NIJI.find((e) => e.id === id);
