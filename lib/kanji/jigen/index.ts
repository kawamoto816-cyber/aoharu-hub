import type { Jigen } from "./types";
import { JIGEN_1 } from "./g1";
import { JIGEN_2A } from "./g2a";
import { JIGEN_2B } from "./g2b";
import { JIGEN_3A } from "./g3a";
import { JIGEN_3B } from "./g3b";
import { JIGEN_4A } from "./g4a";
import { JIGEN_4B } from "./g4b";
import { JIGEN_5A } from "./g5a";
import { JIGEN_5B } from "./g5b";
import { JIGEN_6A } from "./g6a";
import { JIGEN_6B } from "./g6b";

const ALL: Record<string, Jigen> = { ...JIGEN_1, ...JIGEN_2A, ...JIGEN_2B, ...JIGEN_3A, ...JIGEN_3B, ...JIGEN_4A, ...JIGEN_4B, ...JIGEN_5A, ...JIGEN_5B, ...JIGEN_6A, ...JIGEN_6B };

/** その漢字の字源（なければ undefined） */
export const jigenOf = (k: string): Jigen | undefined => ALL[k];
