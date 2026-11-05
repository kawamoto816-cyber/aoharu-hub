import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { Haru } from "@/components/oshieru/Haru";
import { OSHIERU_UNITS, hasOshieru, oshieruHref } from "@/lib/oshieru";
import { LEVELS } from "@/lib/school";

// /learn/oshieru: オシエルの単元一覧（学校段階・教科ごと）。代表の公開OKが出るまで noindex・サイトマップに入れない。
// ふだんの入口は、図解レクチャーのページの「ハルに教える」。

export const metadata: Metadata = {
  title: "オシエル｜AIの生徒ハルに教える｜アオハルラーン",
  robots: { index: false, follow: false },
};

export default function Page() {
  // 学校段階 → 教科 → 単元（学校の地図の順）
  const levels = LEVELS.map((l) => ({
    level: l.name,
    subjects: l.subjects
      .map((s) => ({ subject: s.name, units: s.groups.flatMap((g) => g.units.filter((u) => hasOshieru(u.id)).map((u) => ({ unit: u.id, name: u.name, group: g.title }))) }))
      .filter((s) => s.units.length),
  })).filter((l) => l.subjects.length);
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "オシエル" }]}>
      <div className="flex items-center gap-3">
        <Haru face="normal" size={56} />
        <div>
          <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">学び方 3　教える</p>
          <h1 className="m-0 mt-0.5 text-[24px] font-black leading-tight">オシエル</h1>
        </div>
      </div>
      <p className="m-0 mb-4 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
        AIの生徒ハルに、学んだ単元を教えよう。人に説明しようとすると「わかったつもり」が見えてきます。理由まで言えるかを、自分で確かめる場です。（{OSHIERU_UNITS.length}単元）
      </p>
      {levels.map(({ level, subjects }) => (
        <section key={level} className="mt-4">
          <h2 className="m-0 mb-2 text-[16px] font-black">{level}</h2>
          <div className="grid gap-2">
            {subjects.map(({ subject, units }) => (
              <details key={subject} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
                <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-2 px-4 text-[15px] font-black [&::-webkit-details-marker]:hidden">
                  <span>{subject}</span>
                  <span className="text-[12px] font-bold text-[#5A5D73]">{units.length}単元</span>
                </summary>
                <ul className="m-0 grid list-none gap-1.5 border-t border-[#15172B]/15 p-2.5">
                  {units.map((u) => (
                    <li key={u.unit}>
                      <Link href={oshieruHref(u.unit)} className="flex min-h-[44px] items-center justify-between gap-2 rounded-[10px] px-2.5 py-1.5 text-[#15172B] no-underline hover:bg-[#E6EAFB]">
                        <span>
                          <span className="block text-[11px] font-bold text-[#5A5D73]">{u.group}</span>
                          <span className="block text-[14.5px] font-black">{u.name}</span>
                        </span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>
      ))}
      <p className="m-0 mt-4 text-[12px] leading-relaxed text-[#5A5D73]">AIにつながっていないときは、各単元の画面から台本モード（AIなし）でためせます。</p>
    </LearnShell>
  );
}
