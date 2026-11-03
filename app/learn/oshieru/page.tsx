import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { Haru } from "@/components/oshieru/Haru";
import { OSHIERU_UNITS, getOshieru, oshieruHref } from "@/lib/oshieru";
import { toPublic } from "@/lib/oshieru/public";

// /learn/oshieru: オシエル（試作）の単元一覧。公開しない（noindex・ほかのページからリンクしない）。

export const metadata: Metadata = {
  title: "オシエル（試作）｜AIの生徒ハルに教える｜アオハルラーン",
  robots: { index: false, follow: false },
};

export default function Page() {
  const units = OSHIERU_UNITS.map((id) => toPublic(getOshieru(id)!));
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "オシエル（試作）" }]}>
      <div className="flex items-center gap-3">
        <Haru face="normal" size={56} />
        <div>
          <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">学び方 3　教える</p>
          <h1 className="m-0 mt-0.5 text-[24px] font-black leading-tight">オシエル</h1>
        </div>
      </div>
      <p className="m-0 mb-4 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
        AIの生徒ハルに、学んだ単元を教えよう。人に説明しようとすると「わかったつもり」が見えてきます。理由まで言えるかを、自分で確かめる場です。
      </p>
      <ul className="m-0 grid list-none gap-2.5 p-0">
        {units.map((u) => (
          <li key={u.unit}>
            <Link href={oshieruHref(u.unit)} className="flex items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-3 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
              <span>
                <span className="block text-[11.5px] font-bold text-[#5A5D73]">{u.label}</span>
                <span className="block text-[16px] font-black">{u.name}</span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-4 text-[12px] leading-relaxed text-[#5A5D73]">試作です。AIにつながっていないときは、各単元の画面から台本モード（AIなし）でためせます。</p>
    </LearnShell>
  );
}
