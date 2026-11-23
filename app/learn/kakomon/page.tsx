import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { KAKOMON } from "@/lib/kakomon/data";

// /learn/kakomon: 過去問チャレンジの一覧。手元の過去問を解いて、マークシートに入れて採点する。
// 大学入試センターに確かめるまでは検索に出さない (noindex・サイトマップに入れない)。docs/kakomon-challenge.md

export const metadata: Metadata = {
  title:
    "過去問チャレンジ（共通テスト）｜マークシートに入れて採点｜アオハルラーン｜アオハルOS",
  description:
    "共通テストの過去問を、時間を計って解き、マークシートに答えを入れると、公式の配点で採点します。問題は手元の過去問を使います（このページには載せていません）。",
  robots: { index: false, follow: false },
};

export default function KakomonHomePage() {
  return (
    <LearnShell
      narrow
      crumbs={[
        { href: "/learn", label: "まなぶ" },
        { label: "過去問チャレンジ" },
      ]}
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        高校向け・共通テスト
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black">過去問チャレンジ</h1>
      <p className="mb-0 mt-2 text-[15px] leading-relaxed text-[#3A3D55]">
        本物の過去問を、本番と同じ時間で解くためのマークシートです。問題は手元の過去問（大学入試センターのサイトで公開されているもの、市販の過去問集）を使い、ここには答えだけを入れます。提出すると、公式の配点で採点し、大問ごとの得点が出ます。
      </p>
      <ul className="m-0 mt-5 grid list-none gap-3 p-0">
        {KAKOMON.map((e) => (
          <li key={e.id}>
            <Link
              href={`/learn/kakomon/${e.id}`}
              className="block rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 text-[#15172B] no-underline shadow-[0_3px_0_#15172B]"
            >
              <span className="text-[12px] font-black text-[#1533B8]">
                {e.year} {e.kind}
              </span>
              <b className="block text-[17px]">{e.subject}</b>
              <span className="text-[13px] text-[#3A3D55]">
                {e.minutes}分・{e.total}点・大問{e.daimon.length}題
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-5 text-[13px] leading-relaxed text-[#3A3D55]">
        ほかの年度・科目は、順に増やします。過去問ではない練習は、
        <Link href="/learn/kyotsu-moshi" className="font-bold text-[#1533B8]">
          共通テスト模試
        </Link>
        （オリジナルの問題・解説つき）へ。
      </p>
    </LearnShell>
  );
}
