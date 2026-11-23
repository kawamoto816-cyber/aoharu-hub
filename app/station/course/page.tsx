import { StationShell } from "@/components/station/StationShell";
import { Course } from "@/components/station/Course";
import { UNIV_EXAMS } from "@/lib/exam/univ";
import { examPlayHref } from "@/lib/exam";
import { hasUnitMoshi, unitMoshiHref, unitView } from "@/lib/moshi/unit";
import { todayJst, type CourseUniv, type UnitInfo } from "@/lib/station/course";

// /station/course：国公立2次・直前5週間コース（試作）。駅の「路線」にあたる。
// 無料の入口（志望校 → 診断 → 作戦表 → 最初の週の計画）まで。2週目以降の伴走は有料の予定で、値段・決済はまだない。
// 大学と科目は、大学別模試（lib/exam/univ）の国公立の型から作る。

// 「前期日程まで今日から○日」をサーバーでも描くので、1時間ごとに作り直す（作り直さないと、ビルドした日の日数のまま配られる）。
// ブラウザで動き出したあとは、その端末の今日の日付で数え直す（components/station/Course.tsx）。
export const revalidate = 3600;

const sum = (xs: { points: number }[]) => xs.reduce((a, x) => a + x.points, 0);

export default function Page() {
  const byUniv = new Map<string, CourseUniv>();
  const units: Record<string, UnitInfo> = {};
  for (const u of UNIV_EXAMS) {
    if (!u || u.tier !== "国公立") continue;
    const c = byUniv.get(u.univ) ?? { univ: u.univ, subjects: [] };
    c.subjects.push({ key: u.key, kamoku: u.kamoku, minutes: u.minutes, total: sum(u.sections), play: examPlayHref("daigaku", { subject: u.key }) });
    byUniv.set(u.univ, c);
    for (const p of u.pool)
      for (const q of p.section.questions) {
        const id = q.unit ?? p.unit;
        if (units[id]) continue;
        const v = unitView(id);
        units[id] = { name: v.name, ...(hasUnitMoshi(id) ? { moshi: unitMoshiHref(id) } : {}) };
      }
  }
  return (
    <StationShell here="直前5週間コース">
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">路線・大学別対策コース（試作）</p>
      <h1 className="m-0 mt-1 text-[26px] font-black">国公立2次・直前5週間コース</h1>
      <p className="m-0 mt-1 max-w-[760px] text-[14px] leading-relaxed text-[#3A3D55]">
        共通テストのあと、前期日程までの5週間を、志望校の2次試験に合わせて逆算します。志望校をえらび、大学別模試で診断し、目標まであと何点・どの大問・どの単元かを作戦表にして、最初の週の計画まで無料で作れます。
      </p>
      <div className="mt-4">
        <Course univs={[...byUniv.values()]} units={units} serverToday={todayJst()} />
      </div>
    </StationShell>
  );
}
