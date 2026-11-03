import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { GakkoToday } from "@/components/learn/gakko/GakkoToday";
import { gakkoData } from "@/lib/gakko";
import { LECTURES } from "@/lib/lecture";
import { TSUKKOMI_HOME } from "@/lib/tsukkomi";

// /learn/gakko: あたらしいがっこう (第1段階)。アオハルラーンが入口、ここは「通う」層。
//   1. 校門 (コピー・まなぶ)  2. 学年  3. きょうの時間割 (自動・4コマ)・きょうの出席  ← components/learn/gakko/GakkoToday
//   4. 教室マップ (教室・ツッコミ道場・自習室・未来の職員室・学びのダッシュボード・時間割を自分で組む)
// 記録は登録なしで、この端末の localStorage だけに置く。

const URL = "https://app.bluespring.co.jp/learn/gakko";
const TITLE = "あたらしいがっこう｜ここで学んだ一日が、あなたの出席になる｜アオハルラーン｜アオハルOS";
const DESC = "毎日自動でできる4コマの時間割で、小・中・高の単元をひとつずつ。4コマ読んだら、きょうの出席。時間割も、教室も、先生役も。あなたがひらく、自分だけの学校。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className="shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

const Soon = () => <span className="w-fit whitespace-nowrap rounded-full bg-[#15172B] px-2 py-0.5 text-[10.5px] font-black text-[#FFE45C]">準備中</span>;

const room = "flex h-full flex-col gap-1.5 rounded-[16px] border-[1.5px] border-[#15172B] p-3.5 text-[#15172B] no-underline";
const link = "transition-shadow hover:shadow-[3px_3px_0_#15172B] focus-visible:shadow-[3px_3px_0_#15172B]";

export default function Gakko() {
  const data = gakkoData();
  const rooms = [
    { name: "教室", desc: `${LECTURES.length}単元の授業。読む・聴く・笑う・謎を解く`, href: "/learn/school", bg: "bg-white" },
    { name: "ツッコミ道場", desc: "ボケのまちがいを直して、速く正しく鍛える", href: TSUKKOMI_HOME, bg: "bg-white" },
    { name: "自習室", desc: "テスト放題ルーム。模擬試験で腕試し", href: "/learn/moshi", bg: "bg-white", note: "いまは定期テスト模試がひらいています" },
    { name: "未来の職員室", desc: "生徒が先生になれる場所。AIの生徒に教えて、学びをマスター", bg: "bg-[#FFF8D6]" },
  ];

  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "あたらしいがっこう" }]}>
      <div className="mx-auto max-w-[720px] overflow-x-clip">
        <GakkoToday data={data} />

        {/* 教室マップ */}
        <section aria-labelledby="map-heading" className="mt-10 flex flex-col gap-2.5">
          <h2 id="map-heading" className="m-0 text-[18px] font-black">
            教室マップ
          </h2>
          <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0">
            {rooms.map((r) => {
              const body = (
                <>
                  <span className="flex items-center justify-between gap-1 text-[15px] font-black">
                    {r.name}
                    {r.href ? <Arrow /> : <Soon />}
                  </span>
                  <span className="text-[12px] leading-[1.6] text-[#5A5D73]">{r.desc}</span>
                  {r.note && <span className="mt-auto text-[10.5px] font-bold text-[#1533B8]">{r.note}</span>}
                </>
              );
              return (
                <li key={r.name}>
                  {r.href ? (
                    <Link href={r.href} className={`${room} ${link} ${r.bg}`}>
                      {body}
                    </Link>
                  ) : (
                    <div className={`${room} ${r.bg} border-dashed`}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          {[
            { name: "学びのダッシュボード", desc: "出席簿・得意と苦手・次のおすすめ" },
            { name: "時間割を自分で組む", desc: "教科・時間・順番を、自分で決める" },
          ].map((r) => (
            <div key={r.name} className="flex items-center justify-between gap-3 rounded-[16px] border-[1.5px] border-dashed border-[#15172B] bg-white p-3.5">
              <span className="min-w-0">
                <b className="block text-[15px]">{r.name}</b>
                <span className="text-[12px] text-[#5A5D73]">{r.desc}</span>
              </span>
              <Soon />
            </div>
          ))}
        </section>

        <p className="mb-0 mt-8 rounded-[14px] bg-white/70 px-3.5 py-3 text-center text-[12px] leading-[1.7] text-[#3A3D55]">
          登録なしで使えます。記録はこの端末に保存されます。
        </p>
        <p className="mb-0 mt-3 text-center text-[12px]">
          <Link href="/learn" className="font-bold text-[#1533B8]">
            アオハルラーンの入口へもどる
          </Link>
        </p>
      </div>
    </LearnShell>
  );
}
