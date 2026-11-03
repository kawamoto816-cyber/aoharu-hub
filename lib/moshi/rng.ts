// 単元模試の乱数 (シードつき)。同じシードなら、いつ・どこで作っても同じ問題になる (結果の再現・共有・検査に使う)。
// サーバーでもクライアントでも使える (依存なし)。

export interface Rng {
  /** 0 以上 1 未満 */
  next(): number;
  /** min 以上 max 以下の整数 */
  int(min: number, max: number): number;
  /** min 以上 max 以下で step の倍数 (min からの) */
  step(min: number, max: number, step: number): number;
  pick<T>(arr: readonly T[]): T;
  /** 新しい配列を返す (元はそのまま) */
  shuffle<T>(arr: readonly T[]): T[];
  /** 同じ値が出ないように n 個 */
  sample<T>(arr: readonly T[], n: number): T[];
  bool(p?: number): boolean;
}

/** 文字列 → 32bit の数 (FNV-1a) */
export function hashSeed(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 */
export function makeRng(seed: number | string): Rng {
  let a = (typeof seed === "string" ? hashSeed(seed) : seed >>> 0) || 0x9e3779b9;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min: number, max: number) => min + Math.floor(next() * (max - min + 1));
  const shuffle = <T,>(arr: readonly T[]) => {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  return {
    next,
    int,
    step: (min, max, st) => min + st * int(0, Math.floor((max - min) / st)),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    shuffle,
    sample: (arr, n) => shuffle(arr).slice(0, n),
    bool: (p = 0.5) => next() < p,
  };
}

/** 新しいシード (画面の「もう一度」用。1〜999999 の見せやすい数) */
export const freshSeed = () => 1 + Math.floor(Math.random() * 999999);

/** URL の ?seed= を読む。なければ null */
export function parseSeed(raw: string | string[] | undefined): number | null {
  const s = Array.isArray(raw) ? raw[0] : raw;
  if (!s || !/^\d{1,9}$/.test(s)) return null;
  const n = Number(s);
  return n > 0 ? n : null;
}
