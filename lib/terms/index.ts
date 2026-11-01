import type { TermSet, TermSetKey } from "./meta";
import { SET as S0 } from "./sets/rika";
import { SET as S1 } from "./sets/shakai";
import { SET as S2 } from "./sets/chu-rika";
import { SET as S3 } from "./sets/chu-shakai";
import { SET as S4 } from "./sets/ko-rika";
import { SET as S5 } from "./sets/ko-chireki";
import { SET as S6 } from "./sets/ko-komin";
import { SET as S7 } from "./sets/ko-joho";

export * from "./meta";

// すべてのセット (サーバー側のページ・サイトマップ用)。ブラウザ側は loadTermSet でセットごとに読む。
export const TERM_SETS: Record<TermSetKey, TermSet> = {
  rika: S0,
  shakai: S1,
  "chu-rika": S2,
  "chu-shakai": S3,
  "ko-rika": S4,
  "ko-chireki": S5,
  "ko-komin": S6,
  "ko-joho": S7,
};
export const TERM_SET_KEYS = Object.keys(TERM_SETS) as TermSetKey[];

// 単元id → その単元の重要語句があるセットと語数 (図解レクチャーから「この単元の重要語句」へつなぐ)
const BY_UNIT = new Map<string, { set: TermSetKey; count: number }>();
for (const k of TERM_SET_KEYS) for (const u of TERM_SETS[k].units) if (u.items.length) BY_UNIT.set(u.unit, { set: k, count: u.items.length });
export const unitTermSet = (unit: string) => BY_UNIT.get(unit);
