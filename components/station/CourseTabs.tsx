import Link from "next/link";
import { COURSES, type CourseKind } from "@/lib/station/course-kinds";

// 直前コースの3つの種類の切りかえ（共通テスト・公立高校入試・国公立2次）。
const ORDER: CourseKind[] = ["kyotsu", "koko", "niji"];

export function CourseTabs({ here }: { here: CourseKind }) {
  return (
    <nav aria-label="直前コースの種類" className="mb-3 flex flex-wrap gap-1.5">
      {ORDER.map((k) => {
        const c = COURSES[k];
        const on = k === here;
        return (
          <Link key={k} href={c.href} aria-current={on ? "page" : undefined} className={`rounded-[10px] border-[1.5px] border-[#15172B] px-3 py-1.5 text-[13px] font-black no-underline ${on ? "bg-[#15172B] text-white" : "bg-white text-[#15172B] hover:bg-[#FFFBE6]"}`}>
            {c.short}
            {!c.sale && <span className="ml-1 text-[11px] font-bold opacity-70">（試作）</span>}
          </Link>
        );
      })}
    </nav>
  );
}
