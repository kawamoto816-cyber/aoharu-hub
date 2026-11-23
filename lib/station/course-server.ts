import { examPlayHref, examSpecOf, getMode, scopeUnits, type ModeId } from "@/lib/exam";
import { hasUnitMoshi, unitMoshiHref, unitView } from "@/lib/moshi/unit";
import type { CourseSubject, UnitInfo } from "./course";

// 共通テスト・公立高校入試の直前コースに出す科目と単元の名前（サーバーで作ってページに渡す）。
// 科目は試験モード（lib/exam/modes.ts）の型から。満点・時間もそこから読む。

export function courseSubjects(mode: Extract<ModeId, "kyotsu" | "koritsu">): { pool: CourseSubject[]; units: Record<string, UnitInfo> } {
  const pool: CourseSubject[] = [];
  const units: Record<string, UnitInfo> = {};
  for (const s of getMode(mode)!.subjects) {
    if (s.note) continue; // 準備中の枠は出さない
    const spec = examSpecOf(mode, { subject: s.key }, () => undefined);
    if (!spec) continue;
    pool.push({ key: s.key, kamoku: s.name.replace(/型$/, ""), minutes: spec.minutes, total: spec.total, play: examPlayHref(mode, { subject: s.key }), ...(s.category ? { category: s.category } : {}) });
    for (const id of scopeUnits(spec.scope)) {
      if (units[id]) continue;
      units[id] = { name: unitView(id).name, ...(hasUnitMoshi(id) ? { moshi: unitMoshiHref(id) } : {}) };
    }
  }
  return { pool, units };
}
