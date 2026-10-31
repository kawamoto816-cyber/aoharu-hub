import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { PrefPlayLoader } from "@/components/todofuken/PrefLoaders";

export const metadata: Metadata = {
  title: "47都道府県 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/todofuken" },
};

export default function TodofukenPlay() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/todofuken", label: "47都道府県" }, { label: "修行" }]}>
      <PrefPlayLoader />
    </LearnShell>
  );
}
