import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { VocabPlayLoader } from "@/components/vocab/VocabLoaders";

export const metadata: Metadata = {
  title: "英熟語500 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/jukugo" },
};

export default function Play() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/jukugo", label: "英熟語500" }, { label: "修行" }]}>
      <VocabPlayLoader which="jukugo" />
    </LearnShell>
  );
}
