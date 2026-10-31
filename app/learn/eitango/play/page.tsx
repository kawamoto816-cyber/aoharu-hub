import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { SessionLoader } from "@/components/eitango/SessionLoader";

// /learn/eitango/play: 1回の修行 (?stage=N でそのステージだけ、?extra=1 で新しい単語をあと10語)。

export const metadata: Metadata = {
  title: "英単語2000 修行中｜AOHARU WORDS｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/eitango" },
};

export default function PlayPage() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/eitango", label: "英単語2000" }, { label: "修行" }]}>
      <SessionLoader />
    </LearnShell>
  );
}
