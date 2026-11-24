import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { KOKO } from "@/lib/koko";

// /learn/koko-nyushi: 公立高校入試の過去問チャレンジの入口。問題は載せず、教育委員会の公開ページへ案内する。
// 試しの公開（東京都 令和8年度のみ）なので、検索には出さない。

export const metadata: Metadata = {
  title:
    "公立高校入試の過去問チャレンジ｜先に本番を解いて逆算する｜アオハルラーン｜アオハルOS",
  description:
    "公立高校入試の過去問を先に解き、設問ごとに自己採点して、落とした点を単元に分ける作戦表を出します。問題は教育委員会の公開ページで開きます。",
  robots: { index: false, follow: false },
};

export default function KokoHubPage() {
  const groups = [...new Set(KOKO.map((e) => `${e.univ} ${e.year}`))];
  return (
    <LearnShell
      narrow
      crumbs={[
        { href: "/learn", label: "まなぶ" },
        { label: "公立高校入試の過去問チャレンジ" },
      ]}
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        中学生向け・公立高校入試
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-snug">
        公立高校入試の過去問チャレンジ
      </h1>
      <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
        本番の問題を先に解き、画面の解答用紙に答えを入れて（記号や数字はえらび、語句・記述は書きます）、採点します。記号や数字は自動で○×、記述は「書けた項目」のチェック表で部分点を出し、落とした点を単元に分けて、次にやることを出します。
      </p>
      {groups.map((g) => (
        <section key={g} className="mt-5">
          <h2 className="m-0 text-[17px] font-black">{g}</h2>
          <ul className="m-0 mt-2 grid list-none gap-2 p-0">
            {KOKO.filter((e) => `${e.univ} ${e.year}` === g).map((e) => (
              <li key={e.id}>
                <Link
                  href={`/learn/koko-nyushi/${e.id}`}
                  className="flex items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 text-[#15172B] no-underline"
                >
                  <span>
                    <b className="block text-[16px]">{e.subject}</b>
                    <span className="text-[12.5px] text-[#5A5D75]">
                      {e.kind}・{e.minutes}分・{e.total}点・大問
                      {e.daimon.length}題
                    </span>
                  </span>
                  <span className="text-[13px] font-black text-[#1533B8]">
                    ひらく →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="m-0 mt-5 text-[12px] leading-relaxed text-[#5A5D75]">
        問題文は載せていません（教育委員会の公開ページで開きます）。正答（記号・数・語）と配点は、教育委員会が公表している正答表のとおりです。記述の解答例とチェック表は、アオハルOSが作成したものです。国語などの一部の文章は、著作権の都合で公開ページにのっていないことがあります。
      </p>
    </LearnShell>
  );
}
