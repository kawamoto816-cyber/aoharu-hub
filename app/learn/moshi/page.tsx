import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { MoshiPicker } from "@/components/moshi/MoshiPicker";
import { DAIMON, moshiCatalog } from "@/lib/moshi";

// /learn/moshi: 定期テスト模試の入口。学校段階・教科・学年ごとに、テスト範囲の単元を選んで1回分を組む。
// 大問のある単元だけ選べる (lib/moshi/data に大問を足すと、ここに自動で出る)。

const URL = "https://app.bluespring.co.jp/learn/moshi";
const TITLE = "定期テスト模試｜テスト範囲を選んで本番形式で解く｜アオハルラーン｜アオハルOS";
const DESC = "学校の定期テストの範囲の単元を選ぶと、本番と同じ形式の模試ができます。最後にまとめて採点し、小問ごとに図つきの解き方。まちがえた問題はまちがいノートへ。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function MoshiHome() {
  const cat = moshiCatalog();
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "定期テスト模試" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">TEST　定期テスト模試</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">定期テスト模試</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        学校のテスト範囲の単元を選ぶと、その範囲の大問を並べて1回分のテストを組みます。本番と同じように最後まで解いてから採点し、記述は模範解答と採点基準で自己採点。小問ごとの解き方（図つき）を読み、まちがえた問題はまちがいノートで解き直せます。登録なし・無料（いまは大問 {DAIMON.length} 題。順次ふやします）。
      </p>
      {cat.map((l) => (
        <section key={l.key} aria-labelledby={`mh-${l.key}`} className="mt-8">
          <h2 id={`mh-${l.key}`} className="m-0 text-[22px] font-black">
            {l.name}
          </h2>
          {l.subjects.map((s) => (
            <div key={s.key} className="mt-4">
              <h3 className="m-0 text-[17px] font-black">{s.name}</h3>
              <div className="mt-2 grid gap-4 lg:grid-cols-2">
                {s.groups.map((g) => (
                  <MoshiPicker key={g.title} group={{ id: `${l.key}-${s.key}-${g.title}`, title: `${g.title}　${s.name}`, kids: l.key === "sho" && (g.title === "小1" || g.title === "小2"), units: g.units }} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
      <p className="m-0 mt-8 text-[13px] text-[#3A3D55]">
        単元ごとの4択ドリル・図解レクチャーは
        <Link href="/learn/school" className="font-bold text-[#1533B8]">
          学校の教科の地図
        </Link>
        から。
      </p>
    </LearnShell>
  );
}
