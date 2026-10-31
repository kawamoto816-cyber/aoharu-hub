import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { MathText } from "@/components/math/MathText";
import { DrillLoader } from "@/components/math/DrillLoader";
import { STEPS, findStep, unitOf } from "@/lib/math/steps";

// /learn/math/[step]: 計算50段の1段 (10問1セット)。

const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return STEPS.map((s) => ({ step: String(s.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ step: string }> }): Promise<Metadata> {
  const s = findStep(Number((await params).step));
  if (!s) return {};
  const u = unitOf(s.no);
  const url = `${SITE}/learn/math/${s.no}`;
  const title = `${s.title}の計算ドリル（${u.grade}・${u.title}）｜中学数学 計算50段 第${s.no}段｜アオハルOS`;
  const description = `${u.grade}「${u.title}」の${s.title}を10問ずつ練習できる無料の計算ドリル。その場で採点、まちがえた問題は満点まで解き直し。ヒントカードつき。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function MathStepPage({ params }: { params: Promise<{ step: string }> }) {
  const s = findStep(Number((await params).step));
  if (!s) notFound();
  const u = unitOf(s.no);
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/math", label: "数学" }, { label: `第${s.no}段` }]}>
      <p className="m-0 text-xs font-bold text-[#3A3D55]">
        {u.grade}・{u.title}　第{s.no}段 / 50
      </p>
      <h1 className="m-0 mt-1 text-[22px] font-black">{s.title}</h1>
      <p className="m-0 mt-1 text-[15px] text-[#3A3D55]">
        例：<MathText src={s.example} />
      </p>
      <div className="mt-4">
        <DrillLoader stepNo={s.no} />
      </div>
      <nav aria-label="前後の段" className="mt-8 grid grid-cols-2 gap-2.5">
        {s.no > 1 ? (
          <Link href={`/learn/math/${s.no - 1}`} className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white text-sm font-bold text-[#15172B] no-underline">
            ← 第{s.no - 1}段
          </Link>
        ) : (
          <span />
        )}
        {s.no < 50 ? (
          <Link href={`/learn/math/${s.no + 1}`} className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white text-sm font-bold text-[#15172B] no-underline">
            第{s.no + 1}段 →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </LearnShell>
  );
}
