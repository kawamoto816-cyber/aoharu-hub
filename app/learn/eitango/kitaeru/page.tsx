import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { KitaeruHomeLoader } from "@/components/eitango/KitaeruHomeLoader";

// /learn/eitango/kitaeru: 英単語2000「②鍛える」。瞬発 (60秒) と 文脈 (空所補充)。

const URL = "https://app.bluespring.co.jp/learn/eitango/kitaeru";
const TITLE = "英単語2000 鍛える｜60秒の瞬発テストと文脈の空所補充｜AOHARU WORDS｜アオハルOS";
const DESC = "覚えた英単語を、速く・文の中で使えるかを試す。60秒で何語の意味がわかるかの「瞬発」と、初めて見る英文の空所に入る語を選ぶ「文脈」。大学入試の英単語2000語・20ステージ。登録なし・無料。";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };


export default function KitaeruTop() {
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/eitango", label: "英単語2000" }, { label: "鍛える" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AOHARU WORDS　②鍛える</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">英単語2000を鍛える</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        「覚える」で覚えた単語を、入試で使える力に。<b>瞬発</b>は60秒で英単語の意味を4択でどんどん答え、見た瞬間にわかるかを試します。<b>文脈</b>は単語帳の例文とはちがう英文の空所に入る語を選び、文の中で意味がつかめるかを試します。
      </p>
      <p className="m-0 mt-2 text-[13px]">
        <Link href="/learn/eitango">← まだ覚えていない単語は「覚える」から</Link>
      </p>
      <div className="mt-6">
        <KitaeruHomeLoader />
      </div>
    </LearnShell>
  );
}
