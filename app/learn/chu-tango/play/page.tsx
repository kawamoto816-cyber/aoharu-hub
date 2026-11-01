import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { VocabPlayLoader } from "@/components/vocab/VocabLoaders";

export const metadata: Metadata = {
  title: "中学英単語1200 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/chu-tango" },
};

export default function Play() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/chu-tango", label: "中学英単語1200" }, { label: "修行" }]}>
      <VocabPlayLoader which="chu" />
    </LearnShell>
  );
}
