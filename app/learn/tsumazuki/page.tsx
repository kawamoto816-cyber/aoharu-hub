import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { SITE, TSUMAZUKI_HOME, TSUMAZUKI_UNITS, tsumazukiHref, tsumazukiIndex } from "@/lib/tsumazuki";

// /learn/tsumazuki: つまずきの原因の一覧（学校段階 → 教科 → 学年ごと）。

const title = "単元ごとのつまずきの原因と戻る単元｜小学校から高校まで｜アオハルラーン";
const description = `小学校から高校までの${TSUMAZUKI_UNITS.length}単元について、よくあるまちがいと、その原因になっている前の単元・この単元の前に必要な単元をまとめました。無料の単元模試・授業で確かめられます。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE}${TSUMAZUKI_HOME}` },
  openGraph: { title, description, url: `${SITE}${TSUMAZUKI_HOME}` },
};

export default function TsumazukiIndexPage() {
  const tree = tsumazukiIndex();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "まなぶ", item: `${SITE}/learn` },
      { "@type": "ListItem", position: 2, name: "つまずきの原因", item: `${SITE}${TSUMAZUKI_HOME}` },
    ],
  };
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "つまずきの原因" }]}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">TSUMAZUKI　つまずきの原因</p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-snug sm:text-[32px]">単元ごとの、つまずきの原因と戻る単元</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        わからないのは、いまの単元のせいとは限りません。前の学年に原因があることがあります。{TSUMAZUKI_UNITS.length}単元それぞれの、よくあるまちがいと原因の単元・前に必要な単元を見られます。
      </p>
      {tree.map((l) => (
        <section key={l.key} aria-labelledby={`tz-${l.key}`} className="mt-7">
          <h2 id={`tz-${l.key}`} className="m-0 text-[20px] font-black">
            {l.name}
          </h2>
          <div className="mt-2 grid gap-2">
            {l.subjects.map((s) => (
              <details key={s.key} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-1 shadow-[2px_2px_0_#15172B]">
                <summary className="flex min-h-[48px] cursor-pointer items-center text-[16px] font-black">
                  {s.name}
                </summary>
                {s.groups.map((g) => (
                  <div key={g.title} className="mb-3">
                    <h3 className="m-0 mt-1 text-[13px] font-black text-[#1533B8]">{g.title}</h3>
                    <ul className="m-0 mt-1 grid list-none gap-1.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
                      {g.units.map((u) => (
                        <li key={u.id} className="min-w-0">
                          <Link href={tsumazukiHref(u.id)} className="flex min-h-[44px] items-center justify-between gap-2 rounded-[10px] bg-[#F7F6F1] px-3 py-1.5 text-[14px] font-bold text-[#15172B] no-underline">
                            <span className="min-w-0 [overflow-wrap:anywhere]">{u.name}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </details>
            ))}
          </div>
        </section>
      ))}
      <aside className="mt-10 max-w-[720px] rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFF7C2] p-4 sm:p-5">
        <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#1533B8]">保護者の方へ</p>
        <p className="m-0 mt-1 text-[15px] font-black leading-relaxed">小学校から高校まで、教科の授業・演習・模試は無料。登録はメールアドレスだけ。</p>
        <Link href="/start" className="mt-3 flex min-h-[52px] items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 text-[15px] font-black text-white no-underline shadow-[0_3px_0_#0B1F7A]">
          <span>はじめての方へ</span>
          <span aria-hidden="true">→</span>
        </Link>
      </aside>
    </LearnShell>
  );
}
