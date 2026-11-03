import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { MoshiPlay, type MoshiUnit } from "@/components/moshi/MoshiPlay";
import { buildExamRound, EXAM_HOME, examPlayHref, getMode, NOTICE_COMMON, type ExamChoice, type ModeId } from "@/lib/exam";
import { hasUnitMoshi, unitMoshiHref, unitView } from "@/lib/moshi/unit";
import { freshSeed, parseSeed } from "@/lib/moshi/rng";

// /learn/exam/<mode>/play?s=教科&l=学校&u=単元,単元&m=分&seed=123: 試験モードの本番画面。
// 組み立て (lib/exam/build.ts) はサーバー側、解く・採点・時間切れの自動提出・結果の保存はクライアント (MoshiPlay の examMode)。

export const metadata: Metadata = {
  title: "入試モードを解く｜アオハルラーン｜アオハルOS",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/exam" },
};

// DrillPlay は client の部品なので、そこから文字列を import するとサーバー側では使えない。ここに同じ見た目を書く
const bigBtn = "flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] text-[17px] font-black";

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ExamPlayPage({ params, searchParams }: { params: Promise<{ mode: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const m = getMode((await params).mode);
  if (!m) notFound();
  const sp = await searchParams;
  const l = one(sp.l);
  const choice: ExamChoice = {
    subject: one(sp.s),
    level: l === "sho" || l === "chu" || l === "ko" ? l : undefined,
    units: (one(sp.u) ?? "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 60),
    minutes: one(sp.m) && /^\d{1,3}$/.test(one(sp.m)!) ? Number(one(sp.m)) : undefined,
  };
  if (!choice.units?.length) delete choice.units;
  const seed = parseSeed(sp.seed) ?? freshSeed();
  const mode = m.id as ModeId;
  const setupHref = `${EXAM_HOME}/${mode}`;
  const crumbs = [{ href: "/learn", label: "まなぶ" }, { href: EXAM_HOME, label: "入試モード" }, { href: setupHref, label: m.name }, { label: "解く" }];
  const b = buildExamRound(mode, choice, seed);

  if (!b || !b.ok)
    return (
      <LearnShell narrow crumbs={crumbs}>
        <h1 className="m-0 text-[22px] font-black">{b ? b.spec.title : m.name}</h1>
        <div role="status" className="mt-3 rounded-[14px] border-[1.5px] border-[#B54708] bg-[#FFF4E5] p-4">
          <p className="m-0 text-[16px] font-black text-[#B54708]">{b ? `この範囲はまだ問題が少ない（${b.available}問）` : "えらび方が正しくありません"}</p>
          {b && !b.ok && (
            <ul className="m-0 mt-2 grid list-none gap-1 p-0 text-[13.5px] font-bold text-[#3A3D55]">
              {b.shortages.map((x) => (
                <li key={x.title}>
                  「{x.title}」 {x.have}問／{x.need}問必要
                </li>
              ))}
            </ul>
          )}
          <p className="m-0 mt-2 text-[13px] leading-relaxed text-[#3A3D55]">範囲の単元をふやすか、時間を短くしてください。単元模試の問題がふえると、自動で組めるようになります。</p>
        </div>
        <Link href={setupHref} className={`${bigBtn} mt-4 bg-[#1533B8] text-white no-underline shadow-[0_4px_0_#0B1F7A]`}>
          範囲をえらびなおす →
        </Link>
      </LearnShell>
    );

  const { round, spec } = b;
  const units: Record<string, MoshiUnit> = {};
  for (const u of round.exam.units) units[u] = { ...unitView(u), moshi: hasUnitMoshi(u) ? unitMoshiHref(u) : undefined };
  const kids = round.exam.units.every((u) => units[u]?.kids);
  return (
    <LearnShell narrow crumbs={crumbs}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">入試モード・{m.target}</p>
      <h1 className="m-0 mt-1 text-[22px] font-black leading-snug">{round.exam.title}</h1>
      <p className="m-0 mb-1 mt-1 text-[13px] font-bold text-[#3A3D55]">
        範囲：{spec.subjectName}（{spec.scopeLabel}）・問題番号 {seed}
      </p>
      <p className="m-0 mb-4 text-[11.5px] leading-relaxed text-[#5A5D73]">{NOTICE_COMMON}</p>
      <MoshiPlay
        key={round.exam.id}
        exam={round.exam}
        daimon={round.daimon}
        units={units}
        kids={kids}
        homeHref={setupHref}
        examMode={{ mode, specId: spec.id, seed, retryBase: examPlayHref(mode, choice), setupHref }}
      />
    </LearnShell>
  );
}
