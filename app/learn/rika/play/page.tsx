import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { TermPlayLoader } from "@/components/terms/TermLoaders";

export const metadata: Metadata = {
  title: "小学理科の重要語句 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/rika" },
};

export default function Play() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/rika", label: "小学理科の重要語句" }, { label: "修行" }]}>
      <TermPlayLoader setKey="rika" />
    </LearnShell>
  );
}
