import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { SansuText } from "@/components/sansu/SansuText";
import { DrillLoader } from "@/components/sansu/DrillLoader";
import { STEPS, STEP_COUNT, findStep, gradeName } from "@/lib/sansu/steps";

// /learn/sansu/[step]: 小学算数 計算○段の1段 (10問1セット)。

const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return STEPS.map((s) => ({ step: String(s.no) }));
}
export const dynamicParams = false;

/** 段の名前から、ひらがなの分かち書きの空白を除く (タイトル用) */
const plain = (s: string) => s.replace(/\s+/g, "");

export async function generateMetadata({ params }: { params: Promise<{ step: string }> }): Promise<Metadata> {
  const s = findStep(Number((await params).step));
  if (!s) return {};
  const g = `小${s.grade}`;
  const url = `${SITE}/learn/sansu/${s.no}`;
  const title = `${plain(s.title)}の計算ドリル（${g}・${s.unit}）｜小学算数 計算${STEP_COUNT}段 第${s.no}段｜AOHARU MATH｜アオハルOS`;
  const description = `${gradeName(s.grade)}「${s.unit}」の${plain(s.title)}を10問ずつ練習できる無料の計算ドリル。問題は毎回ちがう数、その場で採点、まちがえた問題は満点まで解き直し。ヒントカードつき。登録なし。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function SansuStepPage({ params }: { params: Promise<{ step: string }> }) {
  const s = findStep(Number((await params).step));
  if (!s) notFound();
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { href: "/learn/sansu", label: "算数" }, { label: `第${s.no}段` }]}>
      <p className="m-0 text-[13px] font-bold text-[#3A3D55]">
        {gradeName(s.grade)}・{s.unit}　第{s.no}段 / {STEP_COUNT}
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-snug">{s.title}</h1>
      <p className="m-0 mt-1 flex items-center gap-1 text-[18px] text-[#3A3D55]">
        {s.grade <= 2 ? "れい" : "例"}：<SansuText src={s.example} />
      </p>
      <div className="mt-4">
        <DrillLoader stepNo={s.no} />
      </div>
      <nav aria-label="前後の段" className="mt-8 grid grid-cols-2 gap-2.5">
        {s.no > 1 ? (
          <Link href={`/learn/sansu/${s.no - 1}`} className="flex min-h-[50px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white text-[15px] font-bold text-[#15172B] no-underline">
            ← 第{s.no - 1}段
          </Link>
        ) : (
          <span />
        )}
        {s.no < STEP_COUNT ? (
          <Link href={`/learn/sansu/${s.no + 1}`} className="flex min-h-[50px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white text-[15px] font-bold text-[#15172B] no-underline">
            第{s.no + 1}段 →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </LearnShell>
  );
}
