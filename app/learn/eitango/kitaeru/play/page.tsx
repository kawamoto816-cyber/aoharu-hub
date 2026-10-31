import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { KitaeruLoader } from "@/components/eitango/KitaeruLoader";

export const metadata: Metadata = {
  title: "英単語2000 鍛える｜AOHARU WORDS｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/eitango/kitaeru" },
};

export default function KitaeruPlay() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/eitango", label: "英単語2000" }, { href: "/learn/eitango/kitaeru", label: "鍛える" }, { label: "挑戦" }]}>
      <KitaeruLoader />
    </LearnShell>
  );
}
