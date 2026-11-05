import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { Avatar } from "@/components/jugyo/Avatar";
import { Rich, plain } from "@/components/lecture/Rich";
import { CHARS_PER_MIN, LESSONS, jugyoHref } from "@/lib/jugyo";
import { JUGYO_CAST } from "@/lib/jugyo/cast";
import { lectureUnitInfo } from "@/lib/lecture";
import { manzaiSay } from "@/lib/tts/manzai";

// /learn/jugyo：止まる授業（動画型・試作）の一覧。試作なので noindex・sitemap に入れない。

export const metadata: Metadata = {
  title: "止まる授業（試作）｜アオハルラーン",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "止まる授業（試作）" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AI時代のあたらしい授業（試作）</p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">止まる授業</h1>
      <p className="m-0 mt-2 text-[14.5px] leading-relaxed">
        聞くだけの授業ではありません。先生と生徒の2人が、図を見ながら話します。2〜3分ごとに先生が本当に止まって「ここで問題」。答えてから続きへ。最後に謎が解けたら、こんどはあなたが先生役です。
      </p>
      <div className="mt-3 grid gap-2">
        {(["sensei", "seito"] as const).map((w) => (
          <p key={w} className="m-0 flex items-center gap-2.5 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[13px]">
            <Avatar who={w} size={40} />
            <span>
              <span className="font-black">{JUGYO_CAST[w].name}</span>　{JUGYO_CAST[w].role}
            </span>
          </p>
        ))}
      </div>
      <ul className="m-0 mt-6 grid list-none gap-3 p-0">
        {LESSONS.map((l) => {
          const info = lectureUnitInfo(l.unitId);
          const chars = l.scenes.reduce((n, s) => n + (s.kind === "talk" ? manzaiSay(s).length : 0), 0);
          const stops = l.scenes.filter((s) => s.kind === "pause").length;
          return (
            <li key={l.unitId}>
              <Link href={jugyoHref(l.unitId)} className="block rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                <span className="block text-[12px] font-black text-[#1533B8]">{info ? `${info.level}・${info.subject}　${plain(info.name)}` : l.unitId}</span>
                <span className="mt-1 block text-[17px] font-black leading-snug">
                  <Rich text={l.title} />
                </span>
                <span className="mt-1.5 block text-[12.5px] font-bold text-[#3A3D55]">
                  約{Math.round(chars / CHARS_PER_MIN)}分・{stops}回止まる　▶ 見る
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </LearnShell>
  );
}
