import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { KobunPlayLoader } from "@/components/kobuntango/KobunLoaders";

export const metadata: Metadata = {
  title: "古文単語300 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/kobun-tango" },
};

export default function Play() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/kobun-tango", label: "古文単語300" }, { label: "修行" }]}>
      <KobunPlayLoader />
    </LearnShell>
  );
}
