import type { Metadata } from "next";
import type { ReactNode } from "react";

// ラーニングステーション（試作）。代表の公開OKが出るまで noindex・サイトマップに入れない。
export const metadata: Metadata = {
  title: "ラーニングステーション（試作）｜学ぶ・シェアする・教える｜アオハルラーン",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
