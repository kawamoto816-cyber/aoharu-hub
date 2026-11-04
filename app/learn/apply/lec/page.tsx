import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { aplCrumbs } from "@/components/apply-lec/AplLecturePage";
import { APL_FIELDS, APL_HOME, isWritten } from "@/lib/apply-lec";

// /learn/apply/lec：「選ばれる力」の図解の教科書（小論文・面接・総合型選抜）の目次。3分野×8単元。
// まだ書いていない単元は「準備中」（リンクなし）。

const URL = `https://app.bluespring.co.jp${APL_HOME}`;
const TITLE = "図解の教科書（小論文・面接・総合型選抜）｜選ばれる力｜アオハルOS";
const DESC = "小論文・面接・総合型選抜を、図解とミッションで学ぶ教科書。トゥールミン・モデル、STAR、経験学習のサイクルなどの古典の理論と、文部科学省の実施要項などの公式資料をもとに解説します。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

const HEAD: Record<string, string> = { shoron: "bg-[#1533B8] text-white", mensetsu: "bg-[#D9341F] text-white", sogo: "bg-[#FFE45C] text-[#15172B]" };

export default function AplLecIndex() {
  return (
    <LearnShell narrow homeHref="/learn" crumbs={aplCrumbs()}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">APPLY　選ばれる力</p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">図解の教科書</h1>
      <p className="m-0 mt-1 text-[16px] font-black text-[#3A3D55]">小論文・面接・総合型選抜</p>
      <p className="m-0 mt-3 text-[15px] leading-[1.9] text-[#3A3D55]">
        議論や対話について古くから磨かれてきた理論と、文部科学省の実施要項などの公式資料をもとに、合格に必要な考え方を図解で学びます。各単元の最後には、AIのアプリで試す入口と、監修者の著書の関係する章の案内があります。
      </p>

      {APL_FIELDS.map((f) => (
        <section key={f.key} id={f.key} aria-labelledby={`fld-${f.key}`} className="mt-8 scroll-mt-4 overflow-hidden rounded-[18px] border-[1.5px] border-[#15172B] bg-white shadow-[4px_4px_0_#15172B]">
          <div className={`px-4 py-3 ${HEAD[f.key]}`}>
            <h2 id={`fld-${f.key}`} className="m-0 text-[19px] font-black">{f.name}</h2>
            <p className="m-0 mt-0.5 text-[13px] font-bold opacity-90">{f.lead}</p>
          </div>
          <ol className="m-0 grid list-none p-0">
            {f.units.map((u) => {
              const ok = isWritten(u.id);
              const body = (
                <>
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-[8px] bg-[#15172B] text-[13px] font-black text-white">{u.no}</span>
                  <span className="flex-1 text-[14.5px] font-black leading-snug">{u.title}</span>
                  {ok ? (
                    <span aria-hidden="true" className="text-[14px] font-black text-[#1533B8]">→</span>
                  ) : (
                    <span className="flex-none rounded-full bg-[#E4E2D8] px-2 py-0.5 text-[11px] font-black text-[#5A5D73]">準備中</span>
                  )}
                </>
              );
              return (
                <li key={u.id} className="border-t border-[#E4E2D8] first:border-t-0">
                  {ok ? (
                    <Link href={`${APL_HOME}/${u.id}`} className="flex min-h-[52px] items-center gap-3 px-4 py-2.5 text-[#15172B] no-underline hover:bg-[#FFFBE6]">
                      {body}
                    </Link>
                  ) : (
                    <div className="flex min-h-[52px] items-center gap-3 px-4 py-2.5 text-[#5A5D73]">{body}</div>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="border-t border-[#E4E2D8] px-4 py-3">
            <Link href={f.cards.href} className="text-[13px] font-black text-[#1533B8]">
              {f.cards.label}もある →
            </Link>
          </div>
        </section>
      ))}

      <p className="m-0 mt-8 text-[12.5px] leading-relaxed text-[#5A5D73]">
        入試の日程や条件は年度ごとに見直されることがあります。各単元に書いた年度を確かめ、最新の情報は文部科学省の実施要項と、志望する大学の募集要項で確かめてください。
      </p>
    </LearnShell>
  );
}
