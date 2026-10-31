import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { KobunTodayLoader } from "@/components/kobuntango/KobunLoaders";
import { KOBUN_GROUPS, KOBUN_WORDS } from "@/lib/kobuntango";

// /learn/kobun-tango: 古文単語300。カードで覚えて4択で確かめる (①覚える)。

const URL = "https://app.bluespring.co.jp/learn/kobun-tango";
const TITLE = "古文単語300｜大学入試の重要古文単語を無料で・意味と例文つき｜アオハルラーン｜アオハルOS";
const DESC = "大学入試・定期テストで最重要の古文単語300語を、意味・例文・現代語訳つきのカードで覚えて4択で確かめる無料の単語帳。忘れかけたころにまた出てくる間隔反復。登録なしで使えます。";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

export default function KobunTangoTop() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "古文単語300" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">国語　古文</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">古文単語300</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        覚える・鍛える・教えるのうち「覚える」。単語を見て意味を4択で選び、覚えたら「意味を読んで単語を選ぶ」仕上げの問題に。正解した単語は、忘れかけたころにまた出てきます。No.1〜150 が最重要語です。意味の書き方・例文・訳はオリジナル。登録なし・無料、進み具合はこの端末に保存されます。
      </p>
      <p className="m-0 mt-2 text-[13px]">
        <Link href="/learn/kobun">古文の文法（活用・助動詞・敬語など）はこちら →</Link>
      </p>
      <div className="mt-6">
        <KobunTodayLoader />
      </div>
      <section aria-labelledby="list-h" className="mt-10">
        <h2 id="list-h" className="m-0 text-[20px] font-black">
          一覧
        </h2>
        {KOBUN_GROUPS.map((g) => (
          <details key={g.key} className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
            <summary className="cursor-pointer text-[16px] font-black">{g.title}</summary>
            <dl className="m-0 mt-2 grid gap-1 sm:grid-cols-2">
              {KOBUN_WORDS.filter((w) => w.no >= g.from && w.no <= g.to).map((w) => (
                <div key={w.no} className="rounded-lg bg-[#F7F6F1] px-3 py-1.5 text-[13.5px]">
                  <dt className="inline font-black">
                    {w.no}. {w.w}
                  </dt>
                  <dd className="m-0 inline text-[#3A3D55]">　{w.m}</dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </section>
    </LearnShell>
  );
}
