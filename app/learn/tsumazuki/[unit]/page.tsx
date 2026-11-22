import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { buildTsumazuki, TSUMAZUKI_HOME, TSUMAZUKI_UNITS, type UnitRef } from "@/lib/tsumazuki";

// /learn/tsumazuki/<単元id>: つまずきページ（よくあるまちがい・原因の単元・前に必要な単元・確かめ方）。
// 中身は lib/tsumazuki（既存の lecture・sakanobori のデータから組む）。サーバーで静的に出す（クライアントJSなし）。

export function generateStaticParams() {
  return TSUMAZUKI_UNITS.map((unit) => ({ unit }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const p = buildTsumazuki((await params).unit);
  if (!p) return {};
  return { title: p.title, description: p.description, alternates: { canonical: p.canonical }, openGraph: { title: p.title, description: p.description, url: p.canonical } };
}

const card = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4 shadow-[4px_4px_0_#15172B] sm:p-5";
const btn = "flex min-h-[52px] w-full items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] px-4 text-[15px] font-black no-underline";

function Tag({ children }: { children: string }) {
  return <span className="mr-1.5 inline-block rounded-[6px] border border-[#15172B] bg-[#FFE45C] px-1.5 py-[1px] text-[11.5px] font-black leading-tight">{children}</span>;
}

function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="m-0 text-[19px] font-black leading-snug">
      {children}
    </h2>
  );
}

function UnitLink({ u }: { u: UnitRef }) {
  return (
    <Link href={u.href} className="font-black text-[#1533B8] underline underline-offset-2 [overflow-wrap:anywhere]">
      {u.name}
    </Link>
  );
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  const p = buildTsumazuki((await params).unit);
  if (!p) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: p.breadcrumb.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, item: b.url })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  const check = [
    p.links.moshi && { href: p.links.moshi, label: "無料の単元模試でたしかめる", main: true },
    p.links.jugyo && { href: p.links.jugyo, label: "止まる授業で聞く" },
    p.links.lecture && { href: p.links.lecture, label: "図解レクチャーで読む" },
  ].filter((x): x is { href: string; label: string; main?: boolean } => !!x);

  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: TSUMAZUKI_HOME, label: "つまずきの原因" }, { label: p.name }]}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">つまずきの原因・{p.label}</p>
      <h1 className="m-0 mt-1 text-[24px] font-black leading-snug [overflow-wrap:anywhere]">{p.h1}</h1>
      <div className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#EEF1FF] p-4">
        {p.answer.map((a, i) => (
          <p key={i} className={`m-0 leading-[1.8] [overflow-wrap:anywhere] ${i === 0 ? "text-[16px] font-black" : "mt-1.5 text-[14px] font-bold text-[#3A3D55]"}`}>
            {a}
          </p>
        ))}
      </div>

      {p.mistakes.length > 0 && (
        <section aria-labelledby="tz-m" className="mt-8">
          <H2 id="tz-m">{`${p.name}のよくあるまちがい`}</H2>
          <ol className="m-0 mt-3 grid list-none gap-3 p-0">
            {p.mistakes.map((m, i) => (
              <li key={i} className={card}>
                <p className="m-0 text-[12px] font-black text-[#D9341F]">まちがい {i + 1}</p>
                <p className="m-0 mt-0.5 text-[15.5px] font-black leading-snug [overflow-wrap:anywhere]">✕ {m.wrong}</p>
                <p className="m-0 mt-1.5 text-[14.5px] font-bold leading-snug text-[#1533B8] [overflow-wrap:anywhere]">○ {m.right}</p>
                <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55] [overflow-wrap:anywhere]">{m.detail}</p>
                {m.root && (
                  <div className="mt-3 rounded-[12px] bg-[#F7F6F1] px-3 py-2 text-[13.5px] font-bold leading-relaxed [overflow-wrap:anywhere]">
                    <span className="text-[#5A5D73]">原因：</span>
                    {m.root.self ? (
                      <span className="font-black">この単元の中</span>
                    ) : (
                      <>
                        <Tag>{m.root.label}</Tag>
                        <UnitLink u={m.root} />
                      </>
                    )}
                    <span className="block text-[13px] text-[#3A3D55]">{m.root.why}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.needs.length > 0 && (
        <section aria-labelledby="tz-n" className="mt-8">
          <H2 id="tz-n">この単元の前に必要なこと</H2>
          <ul className="m-0 mt-3 grid list-none gap-2 p-0">
            {p.needs.map((n) => (
              <li key={n.unit} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-3">
                <p className="m-0 text-[15px] leading-snug">
                  <Tag>{n.label}</Tag>
                  <UnitLink u={n} />
                </p>
                <p className="m-0 mt-1 text-[13.5px] font-bold leading-relaxed text-[#3A3D55] [overflow-wrap:anywhere]">{n.why}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="tz-c" className={`${card} mt-8`}>
        <H2 id="tz-c">わかっているか、確かめる</H2>
        <div className="mt-3 grid gap-2.5">
          {check.map((c) => (
            <Link key={c.href} href={c.href} className={`${btn} ${c.main ? "bg-[#1533B8] text-white shadow-[0_3px_0_#0B1F7A]" : "bg-white text-[#15172B]"}`}>
              <span>{c.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
          {p.links.sakanobori && (
            <Link href={p.links.sakanobori} className={`${btn} bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
              <span>原因の単元までさかのぼる</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
        {p.links.sakanobori && <p className="m-0 mt-2 text-[12.5px] font-bold leading-relaxed text-[#5A5D73]">さかのぼりでは、前の単元の問題を3問ずつ解きながら、学年をこえて原因の単元を探します。</p>}
      </section>

      {p.dependents.length > 0 && (
        <section aria-labelledby="tz-d" className="mt-8">
          <H2 id="tz-d">この単元が土台になる単元</H2>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
            {p.dependents.map((d) => (
              <li key={d.unit} className="max-w-full">
                <Link href={d.href} className="inline-flex min-h-[44px] max-w-full items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 py-1.5 text-[13.5px] font-black text-[#15172B] no-underline [overflow-wrap:anywhere]">
                  <Tag>{d.label}</Tag>
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <aside aria-labelledby="tz-p" className="mt-10 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFF7C2] p-4 sm:p-5">
        <p id="tz-p" className="m-0 text-[12px] font-black tracking-[0.1em] text-[#1533B8]">保護者の方へ</p>
        <p className="m-0 mt-1 text-[15px] font-black leading-relaxed">小学校から高校まで、教科の授業・演習・模試は無料。登録はメールアドレスだけ。</p>
        <Link href="/start" className={`${btn} mt-3 bg-[#1533B8] text-white shadow-[0_3px_0_#0B1F7A]`}>
          <span>はじめての方へ</span>
          <span aria-hidden="true">→</span>
        </Link>
      </aside>

      <p className="m-0 mt-8 text-[13px] font-bold">
        <Link href={TSUMAZUKI_HOME} className="text-[#1533B8] underline underline-offset-2">
          ほかの単元のつまずきの原因を見る
        </Link>
      </p>
    </LearnShell>
  );
}
