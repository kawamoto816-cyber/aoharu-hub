import { LEVELS } from "@/lib/school";
import type { KyokaKey, Level } from "@/lib/learn/kyoka";
import { hasLecture } from "./index";

// 図解レクチャーを「教科書」として読む順番。教科 × 学校段階ごとに、学校の教科の地図の章立て (学年・科目) のとおりに並べる。
// /learn/kyoka/<教科> の目次と、各レクチャーの「前の単元・次の単元」に使う。

/** 教科の入口と、学校の教科の地図の教科 (lib/school の subject.key) の対応 */
const SUBJECTS: Record<KyokaKey, Partial<Record<Level, string[]>>> = {
  kokugo: { sho: ["japanese"], chu: ["kokugo"], ko: ["kokugo"] },
  sugaku: { sho: ["math"], chu: ["math"], ko: ["math"] },
  rika: { sho: ["science"], chu: ["rika"], ko: ["science"] },
  shakai: { sho: ["social"], chu: ["shakai"], ko: ["geohist", "civics"] },
  eigo: { sho: ["english"], chu: ["eigo"], ko: ["english"] },
  joho: { ko: ["info"] },
};

export interface BookUnit {
  id: string;
  name: string;
}
export interface BookChapter {
  /** 学年・科目 (例 中1、物理基礎) */
  title: string;
  units: BookUnit[];
}
export interface Book {
  kyoka: KyokaKey;
  level: Level;
  chapters: BookChapter[];
}

export function bookOf(kyoka: KyokaKey, level: Level): Book | undefined {
  const keys = SUBJECTS[kyoka][level];
  const lv = LEVELS.find((l) => l.key === level);
  if (!keys || !lv) return undefined;
  const chapters: BookChapter[] = [];
  for (const k of keys) {
    const s = lv.subjects.find((x) => x.key === k);
    if (!s) continue;
    for (const g of s.groups) {
      const units = g.units.filter((u) => hasLecture(u.id)).map((u) => ({ id: u.id, name: u.name }));
      if (units.length) chapters.push({ title: g.title, units });
    }
  }
  return chapters.length ? { kyoka, level, chapters } : undefined;
}

export interface BookPlace {
  kyoka: KyokaKey;
  level: Level;
  chapter: string;
  /** 章の中で何番目か (1から) と章の単元数 */
  no: number;
  of: number;
  prev?: BookUnit;
  next?: BookUnit;
}

const PLACE = new Map<string, BookPlace>();
for (const kyoka of Object.keys(SUBJECTS) as KyokaKey[])
  for (const level of ["sho", "chu", "ko"] as Level[]) {
    const b = bookOf(kyoka, level);
    if (!b) continue;
    const flat = b.chapters.flatMap((c) => c.units.map((u, i) => ({ u, c, i })));
    flat.forEach(({ u, c, i }, n) => {
      // 小・中は学年をまたいで続けて読める。高校は章＝別の科目 (物理基礎と物理など) なので、章の中だけでつなぐ
      const cross = level !== "ko";
      const prev = i > 0 || (cross && n > 0) ? flat[n - 1].u : undefined;
      const next = i < c.units.length - 1 || (cross && n < flat.length - 1) ? flat[n + 1].u : undefined;
      PLACE.set(u.id, { kyoka, level, chapter: c.title, no: i + 1, of: c.units.length, prev, next });
    });
  }

export const bookPlace = (unit: string) => PLACE.get(unit);
