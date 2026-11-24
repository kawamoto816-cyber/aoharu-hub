import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { KIJUTSU, kijutsuHref, TRACKS } from "@/lib/kijutsu";

// /learn/kijutsu: 「記述の階段」の入口。国語と英語の記述の答案を、1段ずつ作れるようにする授業。
// 2次試験の過去問チャレンジ (/learn/niji) の作戦表から来る。試しの公開なので、検索には出さない。

export const metadata: Metadata = {
  title: "記述の階段｜国語・英語の記述を1段ずつ｜アオハルラーン｜アオハルOS",
  description:
    "国公立2次試験の国語と英語の記述を、型と例題で1段ずつ練習します。傍線部の言いかえ、理由の説明、現代語訳、和訳、英作文まで。",
  robots: { index: false, follow: false },
};

export default function KijutsuHubPage() {
  return (
    <LearnShell
      narrow
      crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "記述の階段" }]}
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        高校向け・国公立2次
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-snug">
        記述の階段
      </h1>
      <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
        記述の答案は、センスではなく手順で作れます。1段ごとに「型」を1つ決め、例題を手順どおりに解いてみせ、最後に自分で1問解きます。下の段から順に進むと、前の段の型が次の段の材料になります。
      </p>
      {TRACKS.map((t) => (
        <section key={t.id} className="mt-6">
          <h2 className="m-0 text-[18px] font-black">{t.name}</h2>
          <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
            {t.lead}
          </p>
          <ol className="m-0 mt-3 grid list-none gap-2 p-0">
            {KIJUTSU.filter((l) => l.track === t.id).map((l) => (
              <li key={l.id}>
                <Link
                  href={kijutsuHref(l.id)}
                  className="flex items-center gap-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[#15172B] no-underline"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1533B8] text-[13px] font-black text-white">
                    {l.no}
                  </span>
                  <span className="min-w-0">
                    <b className="block text-[15px] leading-snug">{l.title}</b>
                    <span className="mt-0.5 block text-[12px] leading-relaxed text-[#5A5D75]">
                      {l.lead}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
      <p className="m-0 mt-6 text-[12px] leading-relaxed text-[#5A5D75]">
        例文・例題・解答例は、すべてアオハルOSが書いたオリジナルです（入試問題や本からの引用はありません）。記述の答えは1つではないので、解答例とは「入っている要素」でくらべてください。本番の問題で力をためすときは
        <Link href="/learn/niji" className="font-bold text-[#1533B8]">
          2次試験の過去問チャレンジ
        </Link>
        へ。
      </p>
    </LearnShell>
  );
}
