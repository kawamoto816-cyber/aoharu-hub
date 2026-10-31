import type { TermSet, TermSetKey } from "./meta";

// ブラウザ側で、そのページのセットのデータだけを読みこむ。
const LOADERS: Record<TermSetKey, () => Promise<TermSet>> = {
  rika: () => import("./sets/rika").then((m) => m.SET),
  shakai: () => import("./sets/shakai").then((m) => m.SET),
  "chu-rika": () => import("./sets/chu-rika").then((m) => m.SET),
  "chu-shakai": () => import("./sets/chu-shakai").then((m) => m.SET),
  "ko-rika": () => import("./sets/ko-rika").then((m) => m.SET),
  "ko-chireki": () => import("./sets/ko-chireki").then((m) => m.SET),
  "ko-komin": () => import("./sets/ko-komin").then((m) => m.SET),
  "ko-joho": () => import("./sets/ko-joho").then((m) => m.SET),
};

export const loadTermSet = (key: TermSetKey) => LOADERS[key]();
