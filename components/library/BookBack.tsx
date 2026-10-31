import Link from "next/link";
import { Diagram } from "@/components/learn/Diagram";
import type { LibraryBook } from "@/lib/library/types";

// 本のカードの裏：主張の図解・解説・小論文や面接での使い方・入り方・つながる本。
// related は id と題だけ渡す (Pro の本の中身は渡さない)。
export function BookBack({ book, related }: { book: LibraryBook; related: { id: string; title: string; author: string }[] }) {
  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <Diagram data={book.diagram} title={book.diagramTitle} />
      </section>
      <section>
        <h2 className="m-0 text-base font-black">この本の主張</h2>
        <p className="m-0 mt-2 text-[15px] leading-[1.9]">{book.points}</p>
      </section>
      <section className="rounded-[14px] bg-[#EEF1FF] p-4">
        <h2 className="m-0 text-base font-black text-[#1533B8]">小論文・面接での使い方</h2>
        <p className="m-0 mt-2 text-[14.5px] leading-[1.85]">{book.howToUse}</p>
      </section>
      <section>
        <h2 className="m-0 text-base font-black">読み方のコツ</h2>
        <p className="m-0 mt-2 text-[14.5px] leading-[1.85]">{book.howToRead}</p>
      </section>
      <section>
        <h2 className="m-0 text-base font-black">向いている学部</h2>
        <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
          {book.faculties.map((f) => (
            <li key={f} className="rounded-full border-[1.5px] border-[#15172B] bg-white px-3 py-1 text-[12.5px] font-bold">
              {f}
            </li>
          ))}
        </ul>
      </section>
      {related.length > 0 && (
        <section>
          <h2 className="m-0 text-base font-black">つながる本</h2>
          <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/learn/library/${r.id}`} className="text-[14.5px] font-bold text-[#1533B8]">
                  {r.author}『{r.title}』
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
