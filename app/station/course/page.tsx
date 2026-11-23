import type { Metadata } from "next";
import { StationShell } from "@/components/station/StationShell";
import { Course } from "@/components/station/Course";
import { CourseTabs } from "@/components/station/CourseTabs";
import { UNIV_EXAMS } from "@/lib/exam/univ";
import { examPlayHref } from "@/lib/exam";
import { hasUnitMoshi, unitMoshiHref, unitView } from "@/lib/moshi/unit";
import { todayJst, type CourseUniv, type UnitInfo } from "@/lib/station/course";
import { COURSES } from "@/lib/station/course-kinds";

// /station/course：大学入試 直前コース（国公立2次・私大）。もとは試作の「国公立2次・直前5週間コース」。
// 2026-11-23 代表の判断で販売（4,980円・1回払い。1回の支払いで、大学別模試のある全大学を切りかえて使える）。
// 無料：志望校と科目 → 診断（大学別模試）→ 作戦表 → 最初の1週間。有料：2週目からの伴走（components/station/CoursePaid.tsx）。
// 大学と科目は、大学別模試（lib/exam/univ）の型から作る。型が増えると、えらべる大学も自動で増える。
// 駅（/station）の中はまだ noindex だが、このページは販売中なので検索に出す（サイトマップにも入れる）。

const URL = "https://app.bluespring.co.jp/station/course";
const TITLE = "大学入試 直前コース（国公立2次・私大）｜大学別模試で診断して、試験日までの計画を毎週作り直す｜アオハルラーン";
const DESC =
  "志望大学の出題形式に寄せた大学別模試（国公立・早慶上智・MARCH）で科目ごとに診断し、目標まであと何点・どの大問・どの単元かを作戦表に。試験日までの計画を作ります。診断・作戦表・最初の1週間は無料、2週目からの伴走は4,980円（1回払い・自動更新なし・全大学で使えます）。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
  robots: { index: true, follow: true },
};

// 「前期日程まで今日から○日」をサーバーでも描くので、1時間ごとに作り直す（作り直さないと、ビルドした日の日数のまま配られる）。
// ブラウザで動き出したあとは、その端末の今日の日付で数え直す（components/station/Course.tsx）。
export const revalidate = 3600;

const sum = (xs: { points: number }[]) => xs.reduce((a, x) => a + x.points, 0);

export default function Page() {
  const byUniv = new Map<string, CourseUniv>();
  const units: Record<string, UnitInfo> = {};
  for (const u of UNIV_EXAMS) {
    if (!u) continue;
    const c = byUniv.get(u.univ) ?? { univ: u.univ, tier: u.tier, subjects: [] };
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
  // 一覧は 国公立 → 早慶上智 → MARCH の順（2次の受験生がいちばん多く使うので国公立を先に）
  const order = ["国公立", "早慶上智", "MARCH"];
  const univs = [...byUniv.values()].sort((a, b) => order.indexOf(a.tier ?? "") - order.indexOf(b.tier ?? ""));
  return (
    <StationShell
      here="大学入試 直前コース"
      notice={
        <p className="m-0 mb-3 rounded-[10px] border border-[#C9C7BD] bg-white px-3 py-2 text-[12px] font-bold leading-relaxed text-[#3A3D55]">
          模試・授業・さかのぼりは無料です。診断・作戦表・最初の1週間の計画も無料で、2週目からの伴走だけが有料（4,980円・1回払い。1回のお申し込みで、どの大学にも切りかえて使えます）です。計画と模試の結果はこのブラウザに残るので、同じ端末・同じブラウザで続けてください。
        </p>
      }
    >
      <CourseTabs here="daigaku" />
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">直前コース・高校生向け</p>
      <h1 className="m-0 mt-1 text-[26px] font-black">大学入試 直前コース（国公立2次・私大）</h1>
      <p className="m-0 mt-1 max-w-[760px] text-[14px] leading-relaxed text-[#3A3D55]">
        志望校をえらび、その大学の出題形式に寄せた大学別模試（オリジナル問題）で診断して、目標まであと何点・どの大問・どの単元かを作戦表にします。試験日から逆算して、最初の1週間の計画まで無料で作れます。2週目からは、毎週の診断に合わせて計画を作り直します。いま選べるのは、国公立{univs.filter((x) => x.tier === "国公立").length}大学と、早慶上智・MARCHの{univs.filter((x) => x.tier !== "国公立").length}大学です。
      </p>
      <div className="mt-4">
        <Course def={COURSES.daigaku} univs={univs} units={units} serverToday={todayJst()} />
      </div>
    </StationShell>
  );
}
