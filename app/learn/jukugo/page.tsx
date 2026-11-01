import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { JukugoTodayLoader } from "@/components/vocab/VocabLoaders";
import { JUKUGO } from "@/lib/jukugo";

// /learn/jukugo: 英熟語500。カードで覚えて4択で確かめる (①覚える)。

const URL = "https://app.bluespring.co.jp/learn/jukugo";
const TITLE = "英熟語500｜大学入試の頻出英熟語を無料で・例文と発音つき｜アオハルラーン｜アオハルOS";
const DESC = "大学入試で頻出の英熟語500（句動詞・前置詞句・慣用表現）を、意味・例文・発音つきのカードで覚えて4択で確かめる無料の熟語帳。忘れかけたころにまた出てくる間隔反復。登録なしで使えます。";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

export default function JukugoTop() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "英熟語500" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">英語　高校・語彙</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">英熟語500</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        熟語を見て意味を4択で選び、覚えたら「意味を読んで熟語を選ぶ」仕上げの問題に。No.1〜250 が最頻出です。正解した熟語は、忘れかけたころにまた出てきます。例文と訳はオリジナル。登録なし・無料、進み具合はこの端末に保存されます。
      </p>
      <div className="mt-6">
        <JukugoTodayLoader />
      </div>
      <section aria-labelledby="list-h" className="mt-10">
        <h2 id="list-h" className="m-0 text-[20px] font-black">
          一覧
        </h2>
        {[
          ["No.1〜250（最頻出）", 1, 250],
          ["No.251〜500（頻出）", 251, 500],
        ].map(([t, a, b]) => (
          <details key={String(t)} className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
            <summary className="cursor-pointer text-[16px] font-black">{t}</summary>
            <ul className="m-0 mt-2 grid list-none gap-1 p-0 text-[13.5px] sm:grid-cols-2">
              {JUKUGO.filter((w) => w.no >= Number(a) && w.no <= Number(b)).map((w) => (
                <li key={w.no}>
                  <b className="font-serif">{w.p}</b> <span className="text-[#3A3D55]">{w.ja}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>
    </LearnShell>
  );
}
