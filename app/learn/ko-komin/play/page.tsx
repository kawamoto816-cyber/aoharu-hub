import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { TermPlayLoader } from "@/components/terms/TermLoaders";

export const metadata: Metadata = {
  title: "高校公民の重要語句 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/ko-komin" },
};

export default function Play() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/ko-komin", label: "高校公民の重要語句" }, { label: "修行" }]}>
      <TermPlayLoader setKey="ko-komin" />
    </LearnShell>
  );
}
