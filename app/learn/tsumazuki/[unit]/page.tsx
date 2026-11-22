import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { Avatar } from "@/components/jugyo/Avatar";
import { Rich } from "@/components/lecture/Rich";
import { BackUpArrow } from "@/components/start/BackUpArrow";
import { buildTsumazuki, TSUMAZUKI_HOME, TSUMAZUKI_UNITS, type JugyoScene, type PathRow, type TsumazukiPage, type UnitRef } from "@/lib/tsumazuki";

// /learn/tsumazuki/<単元id>: つまずきページ（よくあるまちがい・原因の単元・前に必要な単元・確かめ方）。
// 中身は lib/tsumazuki（既存の lecture・sakanobori・止まる授業の台本から組む）。サーバーで静的に出す（クライアントJSなし。答えは <details> で隠す）。
// 上から：ヒーロー（答え1文とさかのぼりの道）→ 授業のワンシーン → よくあるまちがい → 前に必要なこと → 確かめる → 土台になる単元。

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

/** 節の見出し（左に番号の丸） */
function H2({ id, n, children }: { id: string; n: number; children: string }) {
  return (
    <h2 id={id} className="m-0 flex items-start gap-2.5 text-[19px] font-black leading-snug">
      <span aria-hidden="true" className="mt-[1px] flex h-7 w-7 flex-none items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[13px]">
        {n}
      </span>
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
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

/** ✕・○ の丸いバッジ */
function Mark({ ok }: { ok: boolean }) {
  return (
    <span aria-label={ok ? "正しい" : "まちがい"} className={`mt-[1px] flex h-7 w-7 flex-none items-center justify-center rounded-full border-[1.5px] border-[#15172B] text-[14px] font-black text-white ${ok ? "bg-[#1533B8]" : "bg-[#D9341F]"}`}>
      {ok ? "○" : "✕"}
    </span>
  );
}

const ROW: Record<PathRow["kind"], string> = {
  now: "border-[#15172B] bg-white",
  mid: "border-[#15172B]/30 bg-white",
  root: "border-[#15172B] bg-[#FFE45C] shadow-[3px_3px_0_#15172B]",
  need: "border-[#15172B]/30 bg-white",
};

/** ヒーローの「さかのぼりの道」：単元を縦に並べ、横に青い矢印 */
function PathMap({ path }: { path: NonNullable<TsumazukiPage["path"]> }) {
  return (
    <div className="mt-5 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#EEF1FF] p-3 text-[#15172B] sm:p-4">
      <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#1533B8]">{path.mode === "root" ? "さかのぼりの道" : "この単元の前に必要な単元"}</p>
      <div className="mt-2 flex items-center gap-2">
        <ol className="m-0 grid min-w-0 flex-1 list-none gap-1.5 p-0">
          {path.rows.map((r, i) => (
            <li key={r.unit} className="min-w-0">
              {i > 0 && (
                <span aria-hidden="true" className="block pl-4 text-[12px] font-black leading-[14px] text-[#1533B8]">
                  ↓
                </span>
              )}
              <Link href={r.href} className={`block rounded-[14px] border-[1.5px] px-3 py-2 text-[#15172B] no-underline ${ROW[r.kind]}`}>
                <span className="flex flex-wrap items-center gap-x-2 text-[11.5px] font-black leading-tight">
                  <span className="text-[#1533B8]">{r.label}</span>
                  <span className={r.kind === "root" ? "rounded-full bg-[#15172B] px-2 py-[1px] text-[#FFE45C]" : "text-[#5A5D73]"}>{r.note}</span>
                </span>
                <span className="mt-0.5 block text-[15px] font-black leading-snug [overflow-wrap:anywhere]">{r.name}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="flex-none">
          <BackUpArrow size={56} />
        </div>
      </div>
      {path.mode === "root" && <p className="m-0 mt-2 text-[11.5px] font-bold leading-relaxed text-[#5A5D73]">よくあるまちがいのデータから。どこまで戻るかは、まちがえ方によってちがいます。</p>}
    </div>
  );
}

/** 授業のワンシーン（止まる授業の画面に寄せた吹き出し） */
function Scene({ s }: { s: JugyoScene }) {
  return (
    <section aria-labelledby="tz-s" className="mt-9">
      <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#1533B8]">止まる授業から</p>
      <h2 id="tz-s" className="m-0 mt-0.5 text-[19px] font-black leading-snug">
        授業のワンシーン
      </h2>
      <div className="mt-3 overflow-hidden rounded-[18px] border-[1.5px] border-[#15172B] bg-[#1E5A46] shadow-[4px_4px_0_#15172B]">
        <p className="m-0 flex items-start gap-2 bg-[#15172B] px-3 py-2 text-[12px] font-black leading-snug text-white">
          <span aria-hidden="true" className="mt-[5px] h-2 w-2 flex-none rounded-full bg-[#D9341F]" />
          <span className="min-w-0 line-clamp-2">{s.title}</span>
        </p>
        <div className="grid gap-3 p-3">
          {s.lines.map((l, i) => {
            const right = l.who === "sensei";
            return (
              <div key={i} className={`flex items-end gap-2 ${right ? "flex-row-reverse" : ""}`}>
                <div className="flex w-[60px] flex-none flex-col items-center">
                  <Avatar look={l.look} size={44} />
                  <span className="mt-0.5 whitespace-nowrap text-center text-[10.5px] font-black leading-tight text-[#FFE45C]">{l.name}</span>
                </div>
                <p className={`m-0 min-w-0 max-w-[85%] rounded-[16px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[14px] font-bold leading-[1.7] text-[#15172B] [overflow-wrap:anywhere] ${right ? "rounded-br-[4px]" : "rounded-bl-[4px]"}`}>
                  <Rich text={l.text} />
                </p>
              </div>
            );
          })}
          <div className="rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-3 text-[#15172B] shadow-[3px_3px_0_#15172B]">
            <p className="m-0 flex items-center gap-2 text-[12px] font-black text-[#B42318]">
              <Avatar look={s.sensei.look} size={28} />
              <span className="min-w-0">{s.sensei.name}が止まりました　ここで問題</span>
            </p>
            <p className="m-0 mt-2 text-[15.5px] font-black leading-relaxed [overflow-wrap:anywhere]">
              <Rich text={s.question} />
            </p>
            {s.choices && (
              <ol className="m-0 mt-2.5 grid list-none gap-2 p-0">
                {s.choices.map((c, n) => (
                  <li key={c} className="flex min-h-[44px] items-start gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[14.5px] font-bold leading-snug [overflow-wrap:anywhere]">
                    <span aria-hidden="true" className="flex-none font-black tabular-nums">
                      {n + 1}.
                    </span>
                    <span className="min-w-0">
                      <Rich text={c} />
                    </span>
                  </li>
                ))}
              </ol>
            )}
            <details className="group mt-2.5">
              <summary className="flex min-h-[46px] cursor-pointer list-none items-center justify-center rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 text-[15px] font-black [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">答えを見る</span>
                <span className="hidden group-open:inline">答え</span>
              </summary>
              <div className="mt-2 rounded-[12px] bg-[#FFFBE6] px-3 py-2.5">
                <p className="m-0 text-[15px] font-black leading-relaxed [overflow-wrap:anywhere]">
                  答え：<Rich text={s.answer} />
                </p>
                <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55] [overflow-wrap:anywhere]">
                  <Rich text={s.why} />
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
      <Link href={s.href} className="mt-4 flex min-h-[60px] items-center justify-between gap-3 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 py-2 text-white no-underline shadow-[0_4px_0_#0B1F7A]">
        <span className="min-w-0">
          <span className="block text-[16.5px] font-black leading-snug">▶ この授業を見る</span>
          <span className="block text-[12px] font-bold text-[#DCE0FA]">
            約{s.minutes}分・{s.stops}回止まる・{s.castName}
          </span>
        </span>
        <span aria-hidden="true" className="flex-none text-[20px] font-black">
          →
        </span>
      </Link>
    </section>
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
    p.links.jugyo && { href: p.links.jugyo, label: "止まる授業で聞く", sub: "とちゅうで止まって問題", tone: "bg-white text-[#15172B] shadow-[0_3px_0_#15172B]" },
    p.links.moshi && { href: p.links.moshi, label: "無料の単元模試でたしかめる", sub: "採点は自動", tone: "bg-[#1533B8] text-white shadow-[0_3px_0_#0B1F7A]" },
    p.links.lecture && { href: p.links.lecture, label: "図解レクチャーで読む", sub: "図で読む", tone: "bg-white text-[#15172B] shadow-[0_3px_0_#15172B]" },
    p.links.sakanobori && { href: p.links.sakanobori, label: "原因の単元までさかのぼる", sub: "前の単元を3問ずつ", tone: "bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]" },
  ].filter((x): x is { href: string; label: string; sub: string; tone: string } => !!x);
  let n = 0;

  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: TSUMAZUKI_HOME, label: "つまずきの原因" }, { label: p.name }]}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <header className="rounded-[22px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white shadow-[4px_4px_0_#1533B8] sm:p-5">
        <p className="m-0 text-xs font-black tracking-wider text-[#FFE45C]">つまずきの原因・{p.label}</p>
        <h1 className="m-0 mt-1 text-[24px] font-black leading-snug [overflow-wrap:anywhere]">{p.h1}</h1>
        <p className="m-0 mt-2.5 text-[15.5px] font-bold leading-[1.8] text-[#DCE0FA] [overflow-wrap:anywhere]">{p.answer[0]}</p>
        {(p.path?.mode === "needs" ? [] : p.answer.slice(1)).map((a, i) => (
          <p key={i} className="m-0 mt-1.5 text-[13.5px] font-bold leading-[1.8] text-[#9AA3D6] [overflow-wrap:anywhere]">
            {a}
          </p>
        ))}
        {p.path && <PathMap path={p.path} />}
      </header>

      {p.scene && <Scene s={p.scene} />}

      {p.mistakes.length > 0 && (
        <section aria-labelledby="tz-m" className="mt-9">
          <H2 id="tz-m" n={++n}>{`${p.name}のよくあるまちがい`}</H2>
          <ol className="m-0 mt-3 grid list-none gap-3.5 p-0">
            {p.mistakes.map((m, i) => (
              <li key={i} className={card}>
                <p className="m-0 text-[12px] font-black text-[#D9341F]">まちがい {i + 1}</p>
                <p className="m-0 mt-1.5 flex items-start gap-2 text-[15.5px] font-black leading-snug [overflow-wrap:anywhere]">
                  <Mark ok={false} />
                  <span className="min-w-0 pt-[3px]">{m.wrong}</span>
                </p>
                <p className="m-0 mt-2 flex items-start gap-2 text-[14.5px] font-bold leading-snug text-[#1533B8] [overflow-wrap:anywhere]">
                  <Mark ok />
                  <span className="min-w-0 pt-[4px]">{m.right}</span>
                </p>
                <p className="m-0 mt-2 text-[13.5px] leading-relaxed text-[#3A3D55] [overflow-wrap:anywhere]">{m.detail}</p>
                {m.root && (
                  <div className="mt-3 border-t border-dashed border-[#15172B]/30 pt-3">
                    {m.root.self ? (
                      <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border-[1.5px] border-[#15172B] bg-[#EEF1FF] px-3 py-1 text-[13px] font-black">
                        <span className="text-[#5A5D73]">原因</span>
                        <span aria-hidden="true" className="text-[#1533B8]">→</span>
                        <span>この単元の中</span>
                      </span>
                    ) : (
                      <Link
                        href={m.root.href}
                        className={`inline-flex min-h-[36px] max-w-full flex-wrap items-center gap-x-1.5 rounded-full border-[1.5px] border-[#15172B] px-3 py-1 text-[13px] font-black text-[#15172B] no-underline ${m.root.earlier ? "bg-[#FFE45C] shadow-[2px_2px_0_#15172B]" : "bg-white"}`}
                      >
                        <span className="text-[#5A5D73]">原因</span>
                        <span aria-hidden="true" className="text-[#1533B8]">→</span>
                        <span className="min-w-0 [overflow-wrap:anywhere]">
                          {m.root.label}『{m.root.name}』
                        </span>
                      </Link>
                    )}
                    <p className="m-0 mt-1.5 text-[13px] font-bold leading-relaxed text-[#3A3D55] [overflow-wrap:anywhere]">{m.root.why}</p>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.needs.length > 0 && (
        <section aria-labelledby="tz-n" className="mt-9">
          <H2 id="tz-n" n={++n}>この単元の前に必要なこと</H2>
          <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
            {p.needs.map((x) => (
              <li key={x.unit} className="rounded-[14px] border-[1.5px] border-[#15172B] border-l-[6px] border-l-[#1533B8] bg-white px-4 py-3">
                <p className="m-0 text-[15px] leading-snug">
                  <Tag>{x.label}</Tag>
                  <UnitLink u={x} />
                </p>
                <p className="m-0 mt-1 text-[13.5px] font-bold leading-relaxed text-[#3A3D55] [overflow-wrap:anywhere]">{x.why}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="tz-c" className="mt-9 rounded-[20px] border-[1.5px] border-[#15172B] bg-[#EEF1FF] p-4 sm:p-5">
        <H2 id="tz-c" n={++n}>わかっているか、確かめる</H2>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {check.map((c) => (
            <Link key={c.href} href={c.href} className={`${btn} min-h-[60px] py-2 ${c.tone}`}>
              <span className="min-w-0">
                <span className="block leading-snug">{c.label}</span>
                <span className="block text-[11.5px] font-bold opacity-75">{c.sub}</span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
        {p.links.sakanobori && <p className="m-0 mt-2.5 text-[12.5px] font-bold leading-relaxed text-[#5A5D73]">さかのぼりでは、前の単元の問題を3問ずつ解きながら、学年をこえて原因の単元を探します。</p>}
      </section>

      {p.dependents.length > 0 && (
        <section aria-labelledby="tz-d" className="mt-9">
          <H2 id="tz-d" n={++n}>この単元が土台になる単元</H2>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
            {p.dependents.map((d) => (
              <li key={d.unit} className="max-w-full">
                <Link href={d.href} className="inline-flex min-h-[44px] max-w-full items-center gap-1.5 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 py-1.5 text-[13.5px] font-black text-[#15172B] no-underline shadow-[2px_2px_0_#15172B] [overflow-wrap:anywhere]">
                  <span aria-hidden="true" className="text-[#1533B8]">↑</span>
                  <Tag>{d.label}</Tag>
                  <span className="min-w-0">{d.name}</span>
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
