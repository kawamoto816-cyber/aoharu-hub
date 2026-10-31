import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { BookBack } from "@/components/library/BookBack";
import { LockedBook } from "@/components/library/LockedBook";
import { klee } from "@/components/landing/fonts";
import { BOOKS } from "@/lib/library/books";
import { findBook } from "@/lib/library/books-index";
import { FIELD_LABEL } from "@/lib/library/types";
import { TOPICS } from "@/lib/learn/topics";

// /learn/library/[id]: 本のカード1枚。表 (要約・問い) は誰でも、裏は入門の10冊なら誰でも、ほかは Pro。
// Pro の本の裏はページに入れず、LockedBook が /api/learn/book から受けとる。

const SITE = "https://app.bluespring.co.jp";
const LEVEL = ["", "入門", "標準", "挑戦"];

export function generateStaticParams() {
  return BOOKS.map((b) => ({ id: b.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const b = findBook((await params).id);
  if (!b) return {};
  const url = `${SITE}/learn/library/${b.id}`;
  const title = `${b.author}『${b.title}』を図解で｜知の図書館｜アオハルOS`;
  const description = `${b.oneLine}。この本の問い：${b.question}`.slice(0, 120);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const book = findBook((await params).id);
  if (!book) notFound();
  const related = book.related.map((id) => findBook(id)).filter((r) => r !== null).map((r) => ({ id: r.id, title: r.title, author: r.author }));
  const regions = TOPICS.filter((t) => book.regions.includes(t.key));
  const i = BOOKS.findIndex((b) => b.id === book.id);
  const prev = BOOKS[i - 1];
  const next = BOOKS[i + 1];

  return (
    <LearnShell narrow crumbs={[{ href: "/learn#ura", label: "まなぶ" }, { href: "/learn/library", label: "知の図書館" }, { label: book.title }]}>
      <article>
        <div className="rounded-[20px] border-[1.5px] border-[#15172B] bg-[#FFF4DE] p-5 shadow-[6px_6px_0_#15172B]">
          <p className="m-0 flex items-center justify-between text-[11px] font-black text-[#3A3D55]">
            <span>
              {FIELD_LABEL[book.field]}・{LEVEL[book.level]}
            </span>
            <span className={`rounded-full px-2 py-0.5 ${book.free ? "bg-[#FFE45C] text-[#15172B]" : "bg-[#15172B] text-[#FFE45C]"}`}>{book.free ? "無料" : "Pro"}</span>
          </p>
          <h1 className="m-0 mt-3 text-[24px] font-black leading-snug">『{book.title}』</h1>
          <p className="m-0 mt-1 text-[13px] font-bold text-[#3A3D55]">
            {book.author}　{book.yearLabel}
          </p>
          <p className="m-0 mt-4 text-[15.5px] font-bold leading-[1.8]">{book.oneLine}</p>
          <div className="mt-4 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-white p-4">
            <p className="m-0 text-[11px] font-black text-[#1533B8]">この本が立てた問い</p>
            <p className={`${klee.className} m-0 mt-1 text-[19px] leading-snug`}>{book.question}</p>
          </div>
        </div>

        <div className="mt-6">{book.free ? <BookBack book={book} related={related} /> : <LockedBook id={book.id} related={related} />}</div>

        {regions.length > 0 && (
          <p className="mb-0 mt-6 text-[13px] font-bold text-[#3A3D55]">
            カードで学ぶ：
            {regions.map((t, k) => (
              <span key={t.key}>
                {k > 0 && "・"}
                <Link href={t.basePath} className="text-[#1533B8]">
                  {t.label}
                </Link>
              </span>
            ))}
          </p>
        )}
      </article>

      <nav aria-label="前後の本" className="mt-8 grid grid-cols-2 gap-2.5">
        {prev ? (
          <Link href={`/learn/library/${prev.id}`} className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white px-2 text-center text-[13px] font-bold text-[#15172B] no-underline">
            ← 『{prev.title}』
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/library/${next.id}`} className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white px-2 text-center text-[13px] font-bold text-[#15172B] no-underline">
            『{next.title}』 →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </LearnShell>
  );
}
