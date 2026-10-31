import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { TermPlayLoader } from "@/components/terms/TermLoaders";

export const metadata: Metadata = {
  title: "中学社会の重要語句 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/chu-shakai" },
};

export default function Play() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/chu-shakai", label: "中学社会の重要語句" }, { label: "修行" }]}>
      <TermPlayLoader setKey="chu-shakai" />
    </LearnShell>
  );
}
