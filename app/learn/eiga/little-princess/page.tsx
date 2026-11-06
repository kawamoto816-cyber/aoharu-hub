import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { EigaPlayer } from "@/components/eiga/EigaPlayer";
import { LITTLE_PRINCESS } from "@/lib/eiga/little-princess";

// /learn/eiga/little-princess：名作映画で学ぶ英語の試作（非公開）。
// 検索に載せない（noindex・nofollow）。sitemap に入れない。どのページからもリンクしない（URL を知っている人だけ）。
// 画面に配役の名前・写真・ポスター・主演の名前は出さない。題名は「小公女（1939年の映画）」まで。

export const metadata: Metadata = {
  title: "名作映画で学ぶ英語（試作）",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function Page() {
  const film = LITTLE_PRINCESS;
  return (
    <LearnShell crumbs={[]}>
      <p className="m-0 inline-block rounded-full border border-[#15172B] bg-white px-2.5 py-0.5 text-[11.5px] font-bold text-[#3A3D55]">
        試作（非公開）・パブリックドメインの映画を使った教材の試作です
      </p>
      <p className="m-0 mt-3 text-xs font-black tracking-wider text-[#1533B8]">名作映画で学ぶ英語</p>
      <h1 className="m-0 mt-1 text-[24px] font-black leading-tight">{film.title}</h1>
      <p className="m-0 mt-1.5 max-w-[820px] text-[13.5px] leading-relaxed text-[#3A3D55]">
        同じ映画を何度も見て、セリフを口に出せるまでくり返します。1回目は鑑賞、2回目は全セリフの完全解説、3回目からは字幕つきで反復。試作は最初の約{Math.round(film.sampleEnd / 60)}分です。
      </p>
      {film.lines.length === 0 && (
        <p className="m-0 mt-3 max-w-[640px] rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFF9DB] px-3 py-2 text-[13.5px] font-bold">セリフの書き起こしを準備中<span className="font-normal">（いまは映像だけ見られます）</span></p>
      )}
      <div className="mt-4">
        <EigaPlayer film={film} />
      </div>
    </LearnShell>
  );
}
