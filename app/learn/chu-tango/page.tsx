import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { ChuTodayLoader } from "@/components/vocab/VocabLoaders";
import { CHU_WORDS } from "@/lib/chutango";

// /learn/chu-tango: 中学英単語1200。カードで覚えて4択で確かめる (①覚える)。

const URL = "https://app.bluespring.co.jp/learn/chu-tango";
const TITLE = "中学英単語1200｜中1・中2・中3の英単語を無料で・例文と発音つき｜アオハルラーン｜アオハルOS";
const DESC = "中学校の教科書でよく使う英単語1200語（中1・中2・中3 各400語）を、意味・例文・発音つきのカードで覚えて4択で確かめる無料の単語帳。忘れかけたころにまた出てくる間隔反復。登録なしで使えます。";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

export default function ChuTangoTop() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "中学英単語1200" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">英語　中1〜中3</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">中学英単語1200</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        覚える・鍛える・教えるのうち「覚える」。英単語を見て意味を4択で選び、覚えたら「日本語を見て英単語を選ぶ」仕上げの問題に。正解した単語は、忘れかけたころにまた出てきます。例文はその学年までに習う文法で書いています。高校生は「英単語2000」へ。登録なし・無料、進み具合はこの端末に保存されます。
      </p>
      <p className="m-0 mt-2 text-[13px]">
        <Link href="/learn/eitango">高校の英単語2000はこちら →</Link>
      </p>
      <div className="mt-6">
        <ChuTodayLoader />
      </div>
      <section aria-labelledby="list-h" className="mt-10">
        <h2 id="list-h" className="m-0 text-[20px] font-black">
          一覧
        </h2>
        {[1, 2, 3].map((g) => (
          <details key={g} className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
            <summary className="cursor-pointer text-[16px] font-black">中{g}の400語</summary>
            <ul className="m-0 mt-2 grid list-none gap-1 p-0 text-[13.5px] sm:grid-cols-3">
              {CHU_WORDS.filter((w) => w.g === g).map((w) => (
                <li key={w.no}>
                  <b className="font-serif">{w.word}</b> <span className="text-[#3A3D55]">{w.ja}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>
    </LearnShell>
  );
}
