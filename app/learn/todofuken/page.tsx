import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { PrefTodayLoader } from "@/components/todofuken/PrefLoaders";
import { PREFS, REGIONS } from "@/lib/todofuken/data";

// /learn/todofuken: 47都道府県 (小4 社会)。名前・地方・都道府県庁所在地・特徴を、カードと4択で覚える。

const URL = "https://app.bluespring.co.jp/learn/todofuken";
const TITLE = "47都道府県と県庁所在地｜無料で覚える・地方区分と特徴つき｜アオハルラーン｜アオハルOS";
const DESC = "小学4年の社会で習う47都道府県の名前・読み・8地方区分・都道府県庁所在地・特徴を、カードで覚えて4択で確かめる無料のドリル。忘れかけたころにまた出てくる間隔反復。登録なしで使えます。";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

export default function TodofukenTop() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "47都道府県" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">社会　小4</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">47都道府県</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        都道府県の名前と読み方、8つの地方、都道府県庁所在地、その土地の特徴をカードで覚えて、4択で確かめます。覚えたものは「特徴を読んで、どの都道府県か当てる」仕上げの問題に。地方ごとにも練習できます。登録なし・無料、進み具合はこの端末に保存されます。
      </p>
      <div className="mt-6">
        <PrefTodayLoader />
      </div>
      <section aria-labelledby="list-h" className="mt-10">
        <h2 id="list-h" className="m-0 text-[20px] font-black">
          都道府県と都道府県庁所在地の一覧
        </h2>
        {REGIONS.map((r) => (
          <div key={r} className="mt-4">
            <h3 className="m-0 text-[15px] font-black text-[#1533B8]">{r}</h3>
            <ul className="m-0 mt-2 grid list-none gap-1.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {PREFS.filter((p) => p.region === r).map((p) => (
                <li key={p.code} className="rounded-[10px] border border-[#15172B] bg-white px-3 py-2 text-[13.5px]">
                  <b className="text-[15px]">{p.name}</b>（{p.yomi}）・{p.capital}
                  <span className="block text-[12px] text-[#3A3D55]">{p.feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </LearnShell>
  );
}
