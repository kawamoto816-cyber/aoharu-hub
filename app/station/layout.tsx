import type { Metadata } from "next";
import type { ReactNode } from "react";

// ラーニングステーション（試作）。代表の公開OKが出るまで noindex・サイトマップに入れない。
// description を置かないと、サイト全体の説明文（app/layout.tsx）がそのまま出てしまうので、駅の内容に合う文をここで決める。
export const metadata: Metadata = {
  title: "ラーニングステーション｜アオハル 学習便と無料の自習室｜アオハルラーン",
  description:
    "学びは無料、学ぶ場と時間に会費がかかる「ラーニングステーション」。決まった時刻にオンライン自習室に集まる「アオハル 学習便」（試験運用・モニター募集中）、無料の自習室「アオハルーム」、準備中のラーニングサークルと教壇（試作）は実験室にまとめています。",
  openGraph: {
    title: "アオハル 学習便｜「勉強しなさい」を、わたしたちが引き受けます。",
    description: "決まった時刻にオンラインの自習室に集まり、見守り役のもとで90分学ぶ「学習便」。出席と学習量を、その日のうちに保護者の方へお届けします。中学生・モニター募集中。",
    url: "https://app.bluespring.co.jp/station",
    images: [{ url: "/og-gakushubin.png", width: 1200, height: 630, alt: "アオハル 学習便：「勉強しなさい」を、わたしたちが引き受けます。" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-gakushubin.png"] },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
