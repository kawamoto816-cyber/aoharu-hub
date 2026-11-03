import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { MoshiPicker } from "@/components/moshi/MoshiPicker";
import { DAIMON, moshiCatalog, moshiUnitInfo } from "@/lib/moshi";
import { UNIT_MOSHI_IDS, unitMoshiHref } from "@/lib/moshi/unit";

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
  const unitMoshi = UNIT_MOSHI_IDS.map((u) => ({ id: u, info: moshiUnitInfo(u) })).sort((a, b) => (a.info?.order ?? 0) - (b.info?.order ?? 0));
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "定期テスト模試" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">TEST　定期テスト模試</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">定期テスト模試</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        学校のテスト範囲の単元を選ぶと、その範囲の大問を並べて1回分のテストを組みます。本番と同じように最後まで解いてから採点し、記述は模範解答と採点基準で自己採点。小問ごとの解き方（図つき）を読み、まちがえた問題はまちがいノートで解き直せます。登録なし・無料（いまは大問 {DAIMON.length} 題。順次ふやします）。
      </p>
      {unitMoshi.length > 0 && (
        <section aria-labelledby="mh-unit" className="mt-8">
          <h2 id="mh-unit" className="m-0 text-[22px] font-black">
            単元模試
          </h2>
          <p className="m-0 mt-1 max-w-[720px] text-[14px] leading-relaxed text-[#3A3D55]">1つの単元を、本番形式で解いて採点します。計算の単元は数値が、知識の単元は出る問題が、解くたびに変わります。</p>
          <ul className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {unitMoshi.map(({ id, info }) => (
              <li key={id}>
                <Link href={unitMoshiHref(id)} className="flex min-h-[52px] items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-2 text-[15px] font-black text-[#15172B] no-underline shadow-[2px_2px_0_#15172B]">
                  <span className="min-w-0">
                    {info?.name ?? id}
                    <span className="block text-[12px] font-bold text-[#5A5D73]">{info ? `${info.level}${info.subject}・${info.group}` : ""}</span>
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
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
