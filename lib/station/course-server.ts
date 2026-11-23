import { examPlayHref, examSpecOf, getMode, scopeUnits, type ModeId } from "@/lib/exam";
import { hasUnitMoshi, unitMoshiHref, unitView } from "@/lib/moshi/unit";
import type { CourseSubject, UnitInfo } from "./course";
import { SHIKOKO_MINUTES } from "./course-kinds";

// 共通テスト・公立高校入試・私立高校入試の直前コースに出す科目と単元の名前（サーバーで作ってページに渡す）。
// 科目は試験モード（lib/exam/modes.ts）の型から。満点・時間もそこから読む。

// 私立高校入試（shiritsu）は、教科ごとに50分・全範囲の型（記録の spec は shiritsu:<教科>:50 なので、科目の key も「<教科>:50」にする）。
export function courseSubjects(mode: Extract<ModeId, "kyotsu" | "koritsu" | "shiritsu">): { pool: CourseSubject[]; units: Record<string, UnitInfo> } {
  const minutes = mode === "shiritsu" ? SHIKOKO_MINUTES : undefined;
  const pool: CourseSubject[] = [];
  const units: Record<string, UnitInfo> = {};
  for (const s of getMode(mode)!.subjects) {
    if (s.note) continue; // 準備中の枠は出さない
    const choice = { subject: s.key, ...(minutes ? { minutes } : {}) };
    const spec = examSpecOf(mode, choice, () => undefined);
    if (!spec) continue;
    pool.push({ key: spec.id.slice(mode.length + 1), kamoku: s.name.replace(/型$/, ""), minutes: spec.minutes, total: spec.total, play: examPlayHref(mode, choice), ...(s.category ? { category: s.category } : {}) });
    for (const id of scopeUnits(spec.scope)) {
      if (units[id]) continue;
      units[id] = { name: unitView(id).name, ...(hasUnitMoshi(id) ? { moshi: unitMoshiHref(id) } : {}) };
    }
  }
  return { pool, units };
}
