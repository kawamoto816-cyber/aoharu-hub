import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { PhraseTodayLoader } from "@/components/kotowaza/PhraseLoaders";
import { PHRASES } from "@/lib/kotowaza/data";

// /learn/kotowaza: ことわざ・慣用句・故事成語・四字熟語 (小学校国語)。カードで覚えて4択で確かめる。

const URL = "https://app.bluespring.co.jp/learn/kotowaza";
const TITLE = "ことわざ・慣用句・故事成語・四字熟語｜意味と例文つきで無料で覚える｜アオハルラーン｜アオハルOS";
const DESC = "小学校の国語で習うことわざ80・慣用句80・故事成語40・四字熟語80を、意味と例文つきのカードで覚えて4択で確かめる無料のドリル。忘れかけたころにまた出てくる間隔反復。登録なしで使えます。";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

const KINDS = ["ことわざ", "慣用句", "故事成語", "四字熟語"] as const;

export default function KotowazaTop() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "ことわざ・慣用句" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">国語　小3〜小6</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">ことわざ・慣用句・故事成語・四字熟語</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        言葉を見て意味を4択で選び、覚えたら「意味を読んで言葉を選ぶ」仕上げの問題に。正解したものは、忘れかけたころにまた出てきます。種類ごとにしぼって練習もできます。意味と例文はすべてオリジナル。登録なし・無料、進み具合はこの端末に保存されます。
      </p>
      <div className="mt-6">
        <PhraseTodayLoader />
      </div>
      <section aria-labelledby="list-h" className="mt-10">
        <h2 id="list-h" className="m-0 text-[20px] font-black">
          一覧
        </h2>
        {KINDS.map((k) => (
          <details key={k} id={k} className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
            <summary className="cursor-pointer text-[16px] font-black">
              {k}（{PHRASES.filter((p) => p.kind === k).length}）
            </summary>
            <dl className="m-0 mt-2 grid gap-1.5 sm:grid-cols-2">
              {PHRASES.filter((p) => p.kind === k).map((p) => (
                <div key={p.p} className="rounded-lg bg-[#F7F6F1] px-3 py-2">
                  <dt className="text-[14.5px] font-black">
                    {p.p}
                    <span className="ml-1 text-[11px] font-bold text-[#5A5D73]">（{p.y}）</span>
                  </dt>
                  <dd className="m-0 text-[13px] leading-relaxed text-[#3A3D55]">{p.m}</dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </section>
    </LearnShell>
  );
}
