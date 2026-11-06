import { UZ_LESSONS, lessonMinutes, lessonStops } from "..";

// ゼロワンOSユース版の授業を、カードid（z1-01）で引く。単元 id は "unizeb-<カードid>"。

export const uzUnit = (cardId: string) => `unizeb-${cardId.toLowerCase()}`;
/** その単元の授業（キャストの数だけ） */
export const getUzLessons = (cardId: string) => UZ_LESSONS.filter((l) => l.unitId === uzUnit(cardId));
/** 授業があるカードid（並び順） */
export const UZ_JUGYO_IDS: string[] = [...new Set(UZ_LESSONS.map((l) => l.unitId.replace(/^unizeb-/, "")))];

/** 「約N分・M回止まる」の N・M（キャストで違えば幅で） */
export function uzJugyoSpan(cardId: string): { minutes: string; stops: string } | null {
  const ls = getUzLessons(cardId);
  if (!ls.length) return null;
  const range = (a: number[]) => (Math.min(...a) === Math.max(...a) ? `${a[0]}` : `${Math.min(...a)}〜${Math.max(...a)}`);
  return { minutes: range(ls.map(lessonMinutes)), stops: range(ls.map(lessonStops)) };
}
