import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { NIJI } from "@/lib/niji";

// /learn/niji: 国公立2次試験の過去問チャレンジの入口。試しの公開なので、検索には出さない。

export const metadata: Metadata = {
  title:
    "2次試験の過去問チャレンジ｜先に本番を解いて逆算する｜アオハルラーン｜アオハルOS",
  description:
    "国公立大学の2次試験の過去問を先に解き、設問ごとに自己採点して、落とした点を単元に分ける作戦表を出します。問題は大学の公開ページで開きます。",
  robots: { index: false, follow: false },
};

export default function NijiHubPage() {
  return (
    <LearnShell
      narrow
      crumbs={[
        { href: "/learn", label: "まなぶ" },
        { label: "2次試験の過去問チャレンジ" },
      ]}
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        高校向け・国公立2次
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-snug">
        2次試験の過去問チャレンジ
      </h1>
      <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
        志望校の本番の問題を先に解き、設問ごとに自己採点して、落とした点を単元に分けます。記述は「書けた項目」のチェック表で部分点を出し、落とした理由（方針・計算・時間）に合わせて、次にやることを出します。
      </p>
      <ul className="m-0 mt-4 grid list-none gap-2 p-0">
        {NIJI.map((e) => (
          <li key={e.id}>
            <Link
              href={`/learn/niji/${e.id}`}
              className="flex items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 text-[#15172B] no-underline"
            >
              <span>
                <b className="block text-[16px]">
                  {e.univ} {e.year}　{e.subject}
                </b>
                <span className="text-[12.5px] text-[#5A5D75]">
                  {e.kind}・{e.minutes}分・大問{e.daimon.length}題
                </span>
              </span>
              <span className="text-[13px] font-black text-[#1533B8]">
                ひらく →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-4 rounded-[12px] border border-[#B9C3E8] bg-[#F1F4FD] p-3 text-[13px] leading-relaxed text-[#15172B]">
        国語・英語の記述や、地理・歴史の論述で点が取れないときは、
        <Link href="/learn/kijutsu" className="font-bold text-[#1533B8]">
          記述の階段
        </Link>
        （型と例題で1段ずつ）へ。作戦表からも、落とした設問に合う段へ進めます。
      </p>
      <p className="m-0 mt-5 text-[12px] leading-relaxed text-[#5A5D75]">
        問題文は載せていません（大学の公開ページで開きます）。解答例・点の目安は、アオハルOSが問題から解いて作成したもので、大学の公式の解答ではありません。共通テストは
        <Link href="/learn/kakomon" className="font-bold text-[#1533B8]">
          共通テストの過去問チャレンジ
        </Link>
        へ。
      </p>
    </LearnShell>
  );
}
