import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { Zukan } from "@/components/zukan/Zukan";
import { MOSHI_HOME } from "@/lib/moshi";
import { ZUKAN_HREF } from "@/lib/zukan/words";

// /learn/zukan: つまずき図鑑。単元模試でまちがえた小問が、思い出すためのカードになってたまる (この端末の localStorage だけ)。
//   今日の復習 (1日後・3日後・7日後・14日後の段階式。数値を変えた同じ型の問題で出す)、卒業の枚数、1週間後の思い出し率。
//   検索にのせる (noindex にしない)。sitemap には代表の OK が出るまで入れない。

const URL = `https://app.bluespring.co.jp${ZUKAN_HREF}`;
const TITLE = "つまずき図鑑｜まちがえた問題が復習カードになる｜アオハルラーン｜アオハルOS";
const DESC = "単元模試でまちがえた問題が、思い出すためのカードになってたまっていきます。1日後・3日後・7日後・14日後と間をあけて、数値を変えた同じ型の問題で復習。つまずき＝伸びしろ。登録なし・記録はこの端末だけ。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function ZukanPage() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/gakko", label: "あたらしいがっこう" }, { label: "つまずき図鑑" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">つまずき＝伸びしろ</p>
      <h1 className="m-0 mb-3 mt-1 text-[24px] font-black leading-snug">つまずき図鑑</h1>
      <Zukan moshiHome={MOSHI_HOME} />
    </LearnShell>
  );
}
