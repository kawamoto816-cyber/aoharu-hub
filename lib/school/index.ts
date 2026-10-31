import type { SchoolSubject, SchoolUnit } from "./types";
import { SUBJECTS as ELEMENTARY } from "./elementary";
import { SUBJECTS as JUNIOR } from "./junior";
import { SUBJECTS as HIGH } from "./high";

// 学校の教科の地図：小・中・高。公開中の単元は href を持つ。
export const LEVELS: { key: string; name: string; subjects: SchoolSubject[] }[] = [
  { key: "sho", name: "小学校", subjects: ELEMENTARY },
  { key: "chu", name: "中学校", subjects: JUNIOR },
  { key: "ko", name: "高校", subjects: HIGH },
];

export function allUnits(): SchoolUnit[] {
  return LEVELS.flatMap((l) => l.subjects.flatMap((s) => s.groups.flatMap((g) => g.units)));
}

export function schoolCounts() {
  const units = allUnits();
  const by = (e: "覚える" | "鍛える") => units.filter((u) => u.engines.includes(e));
  const count = (us: SchoolUnit[]) => ({ total: us.length, open: us.filter((u) => u.href).length });
  return { total: units.length, open: units.filter((u) => u.href).length, oboeru: count(by("覚える")), kitaeru: count(by("鍛える")) };
}
