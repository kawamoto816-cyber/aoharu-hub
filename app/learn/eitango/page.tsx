import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { EitangoHomeLoader } from "@/components/eitango/EitangoHomeLoader";

// /learn/eitango: AOHARU WORDS 英単語2000。覚えるエンジン (間隔反復) の最初の教科。
// 大学入試に出る2000語を20ステージ×100語に。中身ができたステージから公開する。登録なし・無料。

const URL = "https://app.bluespring.co.jp/learn/eitango";
const TITLE = "英単語2000｜大学入試の英単語を無料で・忘れかけたころに復習｜AOHARU WORDS｜アオハルOS";
const DESC = "大学入試に出る英単語2000語を20ステージ×100語に分けた無料の単語帳。カードで覚えて4択で確かめ、忘れかけたころにまた出てくる間隔反復。例文と発音つき。登録なしで使えます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function EitangoTop() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "英単語2000" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AOHARU WORDS　英語</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">英単語2000</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        覚える・鍛える・教えるのうち「覚える」。新しい単語はカードで覚えて、すぐ4択で確かめます。正解した単語は1日後・3日後・7日後・14日後・30日後と、忘れかけたころにまた出てきます。しっかり覚えた単語は、日本語を見て英語を打つ仕上げの問題に。例文と発音つき。登録なし・無料、進み具合はこの端末に保存されます。
      </p>
      <div className="mt-6">
        <EitangoHomeLoader />
      </div>
    </LearnShell>
  );
}
