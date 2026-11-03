import type { Metadata } from "next";
import { KYOKA } from "@/lib/learn/kyoka";
import { hasLecture, lectureHref } from "@/lib/lecture";
import { hasMoshi, moshiHref } from "@/lib/moshi";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { LEVELS, schoolCounts } from "@/lib/school";
import type { SchoolUnit } from "@/lib/school/types";
import { SchoolViews } from "@/components/learn/sphere/SchoolViews";
import { unitMeta } from "@/lib/sphere/meta";

// /learn/school: 学校の教科の地図。小・中・高の全単元を、教科書の単元の粒度で箱にして並べる。
// 公開中の単元はリンク、ほかは点線の「準備中」。①覚える・②鍛えるのどちらが中心かを印で示す。
// 上の「一覧｜スフィア盤」で、単元どうしのつながりを盤で見る表示 (?view=sphere&axis=a|b|c) に切りかえられる。

const URL = "https://app.bluespring.co.jp/learn/school";
const TITLE = "学校の教科の地図｜小学校・中学校・高校の全単元｜アオハルラーン｜アオハルOS";
const DESC = "小学校・中学校・高校の国語・算数／数学・理科・社会・英語ほか、教科書の単元ごとの地図。①覚える・②鍛えるで攻略できる単元から順に公開しています。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

function Marks({ u }: { u: SchoolUnit }) {
  return (
    <span className="ml-1.5 inline-flex gap-0.5" aria-label={u.engines.join("・")}>
      {u.engines.includes("覚える") && <span className="rounded bg-[#FFE45C] px-1 text-[10px] font-black text-[#15172B]">①</span>}
      {u.engines.includes("鍛える") && <span className="rounded bg-[#1533B8] px-1 text-[10px] font-black text-white">②</span>}
    </span>
  );
}

function Box({ u }: { u: SchoolUnit }) {
  if (u.href)
    return (
      <span className="inline-flex items-stretch gap-1">
        <Link id={u.id} href={u.href} className="inline-flex min-h-[38px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-2.5 text-[13px] font-black text-[#15172B] no-underline shadow-[2px_2px_0_#15172B]">
          {u.name}
          <Marks u={u} />
        </Link>
        {hasLecture(u.id) && (
          <Link href={lectureHref(u.id)} aria-label={`${u.name}の図解レクチャー`} className="inline-flex min-h-[38px] items-center rounded-[10px] border-[1.5px] border-[#1533B8] bg-[#1533B8] px-2 text-[11.5px] font-black text-white no-underline">
            図解
          </Link>
        )}
        {hasMoshi(u.id) && (
          <Link href={moshiHref([u.id])} aria-label={`${u.name}の定期テスト模試`} className="inline-flex min-h-[38px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-2 text-[11.5px] font-black text-[#15172B] no-underline">
            模試
          </Link>
        )}
      </span>
    );
  return (
    <span id={u.id} className="inline-flex min-h-[38px] items-center rounded-[10px] border-[1.5px] border-dashed border-[#9A9CB0] bg-white/60 px-2.5 text-[13px] font-bold text-[#3A3D55]">
      {u.name}
      <Marks u={u} />
    </span>
  );
}

export default function SchoolMap() {
  const { total, open } = schoolCounts();
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { label: "学校の教科の地図" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">SCHOOL　学校の教科</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">学校の教科の地図</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        小学校・中学校・高校の単元を、教科書の単元ごとに並べました。{open < total ? "黄色の箱はいま学べる単元、点線の箱はこれから開く単元です。" : "箱を押すと、その単元を学べます。"}
      </p>
      <SchoolViews
        meta={unitMeta()}
        list={
          <>
            <p className="m-0 mt-3 flex flex-wrap items-center gap-3 text-[13px] font-bold">
              <span>
                公開中 {open} / 全 {total} 単元
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="rounded bg-[#FFE45C] px-1 text-[10px] font-black">①</span>覚える
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="rounded bg-[#1533B8] px-1 text-[10px] font-black text-white">②</span>鍛える
              </span>
            </p>

            <p className="m-0 mt-3">
              <Link href="/learn/moshi" className="inline-flex min-h-[44px] items-center gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 text-[14px] font-black text-[#15172B] no-underline shadow-[2px_2px_0_#15172B]">
                定期テスト模試：テスト範囲を選んで本番形式で解く →
              </Link>
            </p>

            <nav aria-label="教科ごとの入口" className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-bold text-[#3A3D55]">教科ごとの入口：</span>
              {KYOKA.map((k) => (
                <Link key={k.key} href={`/learn/kyoka/${k.key}`} className="inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-3 text-[13px] font-black text-[#15172B] no-underline">
                  {k.name}
                </Link>
              ))}
            </nav>

            <nav aria-label="学校の段階" className="sticky top-0 z-10 -mx-4 mt-4 flex gap-2 border-b border-[#E4E2D8] bg-[#F7F6F1]/95 px-4 py-2 sm:-mx-6 sm:px-6">
              {LEVELS.map((l) => (
                <a key={l.key} href={`#${l.key}`} className="inline-flex min-h-[40px] items-center rounded-full border-[1.5px] border-[#15172B] bg-white px-4 text-[14px] font-black text-[#15172B] no-underline">
                  {l.name}
                </a>
              ))}
            </nav>

            {LEVELS.map((l) => (
              <section key={l.key} id={l.key} aria-labelledby={`h-${l.key}`} className="mt-8 scroll-mt-16">
                <h2 id={`h-${l.key}`} className="m-0 text-[24px] font-black">
                  {l.name}
                </h2>
                <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
                  {l.subjects.map((s) => (
                    <li key={s.key}>
                      <a href={`#${l.key}-${s.key}`} className="text-[13px] font-bold text-[#1533B8]">
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-col gap-5">
                  {l.subjects.map((s) => (
                    <div key={s.key} id={`${l.key}-${s.key}`} className="scroll-mt-16 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4 shadow-[4px_4px_0_#15172B] sm:p-5">
                      <h3 className="m-0 text-[19px] font-black">{s.name}</h3>
                      <div className="mt-3 flex flex-col gap-4">
                        {s.groups.map((g) => (
                          <div key={g.title} className="grid gap-2 sm:grid-cols-[120px_1fr]">
                            <p className="m-0 pt-2 text-[13px] font-black text-[#3A3D55]">{g.title}</p>
                            <div className="flex min-w-0 flex-wrap gap-1.5">
                              {g.units.map((u) => (
                                <Box key={u.id} u={u} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </>
        }
      />
    </LearnShell>
  );
}
