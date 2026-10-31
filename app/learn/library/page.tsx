import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { LibraryMap } from "@/components/library/LibraryMap";
import { BOOKS } from "@/lib/library/books";
import { publicBook } from "@/lib/library/books-index";
import { FIELD_LABEL, type LibraryField } from "@/lib/library/types";

// /learn/library: 知の図書館。名著30冊を書架の地図 (時代×分野) と分野ごとの一覧で見せる。
// 入門の10冊は裏 (図解・使い方) まで無料、残り20冊の裏は Pro。

const URL = "https://app.bluespring.co.jp/learn/library";
const TITLE = "知の図書館｜難関校の小論文・面接のための名著30冊を図解で｜アオハルOS";
const DESC = "プラトン、デカルト、ホッブズ、ルソー、スミス、ミル、ダーウィン、福沢諭吉、クーンから、カント、マルクス、ウェーバー、ケインズ、アーレント、ロールズ、サイードまで。難関校の小論文・面接で使える名著30冊を、一言の要約・問い・図解・使い方で。入門の10冊は無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

const FIELDS: LibraryField[] = ["philosophy", "science", "politics", "economics", "society", "international"];
const LEVEL = ["", "入門", "標準", "挑戦"];

export default function LibraryHome() {
  const books = BOOKS.map(publicBook);
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn#ura", label: "まなぶ" }, { label: "知の図書館" }]}>
      <p className="m-0 text-xs font-black text-[#3A3D55]">裏面・難関校アドバンスト</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">知の図書館</h1>
      <p className="mb-0 mt-2 text-[15px] leading-relaxed text-[#3A3D55]">
        難関校の小論文・面接・口頭試問で使える名著30冊を、1冊1枚の「本のカード」にしました。表は一言の要約とその本が立てた問い、裏は主張の図解と、小論文や面接での使い方です。入門の書架の10冊は裏まで無料、ほかの20冊の裏はProで読めます。
      </p>

      <h2 className="mb-0 mt-8 text-lg font-black">書架の地図</h2>
      <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">横が時代、縦が分野です。線は、影響を与えた・対立した本どうしのつながりです。地図は横にスクロールできます。</p>
      <div className="mt-3">
        <LibraryMap books={books} />
      </div>

      {FIELDS.map((f) => {
        const list = books.filter((b) => b.field === f);
        if (list.length === 0) return null;
        return (
          <section key={f} className="mt-10" aria-labelledby={`field-${f}`}>
            <h2 id={`field-${f}`} className="m-0 text-lg font-black">
              {FIELD_LABEL[f]}
            </h2>
            <ul className="m-0 mt-3 grid list-none gap-3 p-0 sm:grid-cols-2">
              {list.map((b) => (
                <li key={b.id}>
                  <Link href={`/learn/library/${b.id}`} className="flex h-full flex-col gap-1.5 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-3 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                    <span className="flex items-center justify-between gap-2 text-[11px] font-bold text-[#3A3D55]">
                      <span>
                        {b.author}・{b.yearLabel}・{LEVEL[b.level]}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 font-black ${b.free ? "bg-[#FFE45C] text-[#15172B]" : "bg-[#15172B] text-[#FFE45C]"}`}>{b.free ? "無料" : "Pro"}</span>
                    </span>
                    <span className="text-[16px] font-black">『{b.title}』</span>
                    <span className="text-[13px] leading-relaxed text-[#3A3D55]">{b.oneLine}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </LearnShell>
  );
}
