import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { TermPlayLoader } from "@/components/terms/TermLoaders";

export const metadata: Metadata = {
  title: "中学理科の重要語句 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/chu-rika" },
};

export default function Play() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/chu-rika", label: "中学理科の重要語句" }, { label: "修行" }]}>
      <TermPlayLoader setKey="chu-rika" />
    </LearnShell>
  );
}
