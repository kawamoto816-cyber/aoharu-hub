import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { KanjiPlayLoader } from "@/components/kanji/KanjiLoaders";

export const metadata: Metadata = {
  title: "小学校の漢字 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/kanji" },
};

export default function KanjiPlay() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/kanji", label: "小学校の漢字" }, { label: "修行" }]}>
      <KanjiPlayLoader />
    </LearnShell>
  );
}
