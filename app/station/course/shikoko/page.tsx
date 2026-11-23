import type { Metadata } from "next";
import { StationShell } from "@/components/station/StationShell";
import { Course } from "@/components/station/Course";
import { CourseTabs } from "@/components/station/CourseTabs";
import { courseSubjects } from "@/lib/station/course-server";
import { todayJst } from "@/lib/station/course";
import { COURSES } from "@/lib/station/course-kinds";

// /station/course/shikoko：私立高校入試 直前コース（2026-11-23 代表の判断で販売。4,980円・1回払い）。
// 無料：診断（私立入試型の模試）→ 作戦表 → 最初の1週間。有料：2週目からの伴走（components/station/CoursePaid.tsx）。
// 駅（/station）の中はまだ試作で noindex だが、このページは販売中なので検索に出す（サイトマップにも入れる）。

const URL = "https://app.bluespring.co.jp/station/course/shikoko";
const TITLE = "私立高校入試 直前コース｜教科ごとに模試で診断して、入試の日までの計画を作る｜アオハルラーン";
const DESC = "私立入試型の模試（国語・数学・英語を中心に、受ける教科をえらべます）で診断し、目標まであと何点・どの大問・どの単元かを作戦表に。入試の日までの週数に合わせた計画を作ります。診断・作戦表・最初の1週間は無料、2週目からの伴走は4,980円（1回払い・自動更新なし。お申し込みは保護者の方から）。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
  robots: { index: true, follow: true },
};

// 「試験日まで今日から○日」をサーバーでも描くので、1時間ごとに作り直す。
export const revalidate = 3600;

export default function Page() {
  const { pool, units } = courseSubjects("shiritsu");
  const def = COURSES.shikoko;
  return (
    <StationShell
      here="私立高校入試 直前コース"
      notice={
        <p className="m-0 mb-3 rounded-[10px] border border-[#C9C7BD] bg-white px-3 py-2 text-[12px] font-bold leading-relaxed text-[#3A3D55]">
          模試・授業・さかのぼりは無料です。診断・作戦表・最初の1週間の計画も無料で、2週目からの伴走だけが有料（4,980円・1回払い）です。計画と模試の結果はこのブラウザに残るので、同じ端末・同じブラウザで続けてください。
        </p>
      }
    >
      <CourseTabs here="shikoko" />
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">直前コース・中学3年生向け</p>
      <h1 className="m-0 mt-1 text-[26px] font-black">私立高校入試 直前コース</h1>
      <p className="m-0 mt-1 max-w-[760px] text-[14px] leading-relaxed text-[#3A3D55]">
        入試の日と受ける教科（国語・数学・英語の3教科、または5教科）をえらび、私立入試型の模試（中学の全範囲・各50分・標準〜発展を多めにしたオリジナル問題）で診断して、目標まであと何点・どの大問・どの単元かを作戦表にします。入試の日から逆算して、最初の1週間の計画まで無料で作れます。2週目からは、毎週の診断に合わせて計画を作り直します。特定の学校の入試を再現するものではないので、志望校の出題の傾向は募集要項や学校の先生に確かめてください。
      </p>
      <div className="mt-4">
        <Course def={def} pool={pool} units={units} serverToday={todayJst()} />
      </div>
    </StationShell>
  );
}
