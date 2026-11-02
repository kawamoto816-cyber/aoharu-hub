import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { TsukkomiRecord, UnitBest } from "@/components/tsukkomi/TsukkomiRecord";
import { lectureUnitInfo } from "@/lib/lecture";
import { TSUKKOMI, TSUKKOMI_HOME, tsukkomiHref } from "@/lib/tsukkomi";

// /learn/tsukkomi: ツッコミ学習法（②鍛える）の入口。単元を教科ごとに並べる。
// 単元を足すときは lib/tsukkomi/index.ts に登録すると、ここに自動で出る。

const URL = `https://app.bluespring.co.jp${TSUKKOMI_HOME}`;
const TITLE = "ツッコミ学習法｜まちがいにツッコんで覚える｜アオハルラーン｜アオハルOS";
const DESC = "ボケ役がわざとまちがえた文を言う。制限時間内に、どこがちがうか・正しくは何かをツッコむ。速く正確なほど高得点、正しい文は見抜いてスルー。自分の記録と競って称号を上げよう。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

const SUBJECT_ORDER = ["数学", "理科", "社会"];

function groups() {
  const map = new Map<string, { unit: string; name: string; group: string; n: number; suru: number }[]>();
  for (const [unit, list] of Object.entries(TSUKKOMI)) {
    const info = lectureUnitInfo(unit);
    const subject = info?.subject ?? "その他";
    const row = { unit, name: info?.name ?? unit, group: info?.group ?? "", n: list.length, suru: list.filter((b) => b.wrongIndex === null).length };
    map.set(subject, [...(map.get(subject) ?? []), row]);
  }
  const rank = (s: string) => (SUBJECT_ORDER.includes(s) ? SUBJECT_ORDER.indexOf(s) : 99);
  return [...map.entries()].sort((a, b) => rank(a[0]) - rank(b[0]));
}

export default function TsukkomiHome() {
  const gs = groups();
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "ツッコミ学習法" }]}>
      <section aria-labelledby="tsk-h" className="relative overflow-hidden rounded-[18px] border-[1.5px] border-[#15172B] bg-[#15172B] px-4 pb-4 pt-5 text-white shadow-[3px_3px_0_#B42318]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,#B42318_0_14px,#8E1B12_14px_28px)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(255,228,92,0.2),transparent_70%)]" />
        <div className="relative">
          <p className="m-0 text-[11px] font-black tracking-[0.12em] text-[#FFE45C]">②鍛える　新しい学び方（試作）</p>
          <h1 id="tsk-h" className="m-0 mt-1 text-[28px] font-black leading-tight">ツッコミ学習法</h1>
          <p className="m-0 mt-2 text-[14px] leading-[1.8] text-[#DDE3FA]">ボケ役が、わざとまちがえて言います。どこがちがう？ 正しくは？ 時間内にすかさずツッコもう。</p>
          <div className="mt-3 grid gap-2">
            <p className="m-0 max-w-[88%] rounded-[14px] rounded-tl-[4px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[14px] font-bold leading-relaxed text-[#15172B]">
              <span className="mr-1 rounded-full bg-[#15172B] px-1.5 py-0.5 text-[10.5px] text-white">ボケ</span>
              電流計は、はかりたい所に<span className="rounded-[4px] bg-[#FDE2DF] px-[1px] text-[#B42318] line-through">並列に</span>つなぐ。
            </p>
            <p className="m-0 ml-auto max-w-[88%] rounded-[14px] rounded-tr-[4px] border-[1.5px] border-[#15172B] bg-[#E6EAFB] px-3 py-2 text-[14px] font-bold leading-relaxed text-[#15172B]">
              <span className="mr-1 rounded-full bg-[#1533B8] px-1.5 py-0.5 text-[10.5px] text-white">ツッコミ</span>
              なんでやねん！ <span className="rounded-[4px] bg-[#FFE45C] px-[1px]">直列に</span>や。
            </p>
          </div>
        </div>
      </section>

      <ul className="m-0 mt-4 grid list-none grid-cols-3 gap-2 p-0 text-center text-[12px] font-bold">
        {[
          { k: "速さ", v: "残り時間が多いほど加点" },
          { k: "連続", v: "続けて正解でボーナス" },
          { k: "スルー", v: "正しい文は見抜く" },
        ].map((x) => (
          <li key={x.k} className="rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-1.5 py-2">
            <span className="block text-[14px] font-black">{x.k}</span>
            <span className="text-[11px] leading-snug text-[#3A3D55]">{x.v}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <TsukkomiRecord />
      </div>

      {gs.map(([subject, rows]) => (
        <section key={subject} aria-labelledby={`tsk-${subject}`} className="mt-8">
          <h2 id={`tsk-${subject}`} className="m-0 text-[19px] font-black">
            {subject}
          </h2>
          <ul className="m-0 mt-2 grid list-none gap-2.5 p-0">
            {rows.map((r) => (
              <li key={r.unit}>
                <Link
                  href={tsukkomiHref(r.unit)}
                  className="flex items-center gap-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-3 text-[#15172B] no-underline transition-shadow hover:shadow-[3px_3px_0_#15172B] focus-visible:shadow-[3px_3px_0_#15172B]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-black text-[#1533B8]">{r.group}</span>
                    <span className="block text-[16px] font-black leading-snug">{r.name}</span>
                    <span className="mt-0.5 flex flex-wrap gap-x-2 text-[11.5px] text-[#5A5D73]">
                      <span>
                        ボケ {r.n - r.suru}・正しい文 {r.suru}
                      </span>
                      <UnitBest unit={r.unit} />
                    </span>
                  </span>
                  <span aria-hidden="true" className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#FFE45C] text-[16px] font-black">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="m-0 mt-8 text-[12px] leading-relaxed text-[#5A5D73]">
        試作版です。記録（最高記録・ためたポイント・ツッコみそこねたボケ）はこの端末の中だけに残ります。ボケの文は、各単元の図解レクチャーの内容から作っています。
      </p>
    </LearnShell>
  );
}
