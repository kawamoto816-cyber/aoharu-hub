import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { PhrasePlayLoader } from "@/components/kotowaza/PhraseLoaders";

export const metadata: Metadata = {
  title: "ことわざ・慣用句 修行中｜アオハルOS",
  robots: { index: false },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/kotowaza" },
};

export default function Play() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/kotowaza", label: "ことわざ・慣用句" }, { label: "修行" }]}>
      <PhrasePlayLoader />
    </LearnShell>
  );
}
