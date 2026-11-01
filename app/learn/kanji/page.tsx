import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { KanjiTodayLoader } from "@/components/kanji/KanjiLoaders";
import { KanjiParkCard } from "@/components/kanji/KanjiParkCard";

// /learn/kanji: 小学校の漢字1026字。①覚える (カード＋間隔反復) と、読み・書きの4択。登録なし・無料。

const URL = "https://app.bluespring.co.jp/learn/kanji";
const TITLE = "小学校の漢字1026字｜読み・書きを無料で・忘れかけたころに復習｜アオハルラーン｜アオハルOS";
const DESC = "小学1年〜6年で習う漢字1026字（学年別漢字配当表）を、カードで覚えて4択で確かめる無料の漢字ドリル。音読み・訓読み・言葉・例文つき。読みの問題から、覚えた字は「□に入る漢字」の仕上げへ。登録なしで使えます。";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

export default function KanjiTop() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "小学校の漢字" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AOHARU KANJI　国語</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">小学校の漢字1026字</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        覚える・鍛える・教えるのうち「覚える」。新しい漢字はカードで読み方と言葉を見てから、すぐに4択で読みを確かめます。正解した字は1日後・3日後・7日後…と、忘れかけたころにまた出てきます。しっかり覚えた字は「□に入る漢字はどれ？」の仕上げの問題に。言葉と例文は、その学年までに習う漢字だけで書いています。登録なし・無料、進み具合はこの端末に保存されます。
      </p>
      <div className="mt-6">
        <KanjiTodayLoader />
      </div>
      <KanjiParkCard />
    </LearnShell>
  );
}
