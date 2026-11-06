import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { Avatar } from "@/components/jugyo/Avatar";
import { Rich, plain } from "@/components/lecture/Rich";
import { CHARS_PER_MIN, UNITS, getLessons, jugyoHref } from "@/lib/jugyo";
import { castCredit } from "@/lib/jugyo/audio";
import { STAGE_NAME, castsOfStage, stageOf } from "@/lib/jugyo/cast";
import type { Lesson, Stage } from "@/lib/jugyo/types";
import { getLecture, lectureUnitInfo } from "@/lib/lecture";
import { manzaiSay } from "@/lib/tts/manzai";

// /learn/jugyo：止まる授業（動画型・試作）の一覧。試作なので noindex・sitemap に入れない。
// 段階ごとのキャスト（キャラの組み合わせ）を紹介する。どのキャストで見るかは、単元のページでふり分ける（ABテスト）。

export const metadata: Metadata = {
  title: "止まる授業（試作）｜アオハルラーン",
  robots: { index: false, follow: false },
};

const STAGES: Stage[] = ["e", "j", "h"];
const minutes = (l: Lesson) => Math.round(l.scenes.reduce((n, s) => n + (s.kind === "talk" ? manzaiSay(s).length : 0), 0) / CHARS_PER_MIN);
const stops = (l: Lesson) => l.scenes.filter((s) => s.kind === "pause").length;

export default function Page() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "止まる授業（試作）" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AI時代のあたらしい授業（試作）</p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">止まる授業</h1>
      <p className="m-0 mt-2 text-[14.5px] leading-relaxed">
        聞くだけの授業ではありません。2人のキャラが、図を見ながら話します。とちゅうで本当に止まって「ここで問題」。答えてから続きへ。最後に謎が解けたら、こんどはあなたが先生役です。
      </p>
      {STAGES.map((stage) => {
        const units = UNITS.filter((u) => stageOf(u) === stage);
        if (!units.length) return null;
        const casts = castsOfStage(stage);
        return (
          <section key={stage} aria-labelledby={`jugyo-${stage}`} className="mt-7">
            <h2 id={`jugyo-${stage}`} className="m-0 text-[18px] font-black">
              {STAGE_NAME[stage]}の授業
            </h2>
            <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">
              試作中：キャラの組み合わせは{casts.length}通り。どれになるかは、はじめて見たときに決まります。
            </p>
            <ul className="m-0 mt-2 grid list-none gap-2 p-0">
              {casts.map((c) => (
                <li key={c.id} className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[13px]">
                  <p className="m-0 font-black">
                    <span className="mr-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-[6px] bg-[#15172B] px-1 text-[11px] text-white">{c.label}</span>
                    {c.name}
                  </p>
                  <p className="m-0 mt-0.5 text-[12px] leading-relaxed text-[#3A3D55]">{c.genre}</p>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                    {(["sensei", "seito"] as const).map((w) => (
                      <span key={w} className="flex items-center gap-1.5 text-[12.5px] font-bold">
                        <Avatar look={c.members[w].look} size={32} />
                        {c.members[w].name}
                      </span>
                    ))}
                  </div>
                  <p className="m-0 mt-1 text-[11px] text-[#3A3D55]">声：{castCredit(c)}</p>
                </li>
              ))}
            </ul>
            <ul className="m-0 mt-3 grid list-none gap-3 p-0">
              {units.map((unit) => {
                const info = lectureUnitInfo(unit);
                const ls = getLessons(unit);
                const mins = ls.map(minutes);
                const ps = ls.map(stops);
                const range = (a: number[]) => (Math.min(...a) === Math.max(...a) ? `${a[0]}` : `${Math.min(...a)}〜${Math.max(...a)}`);
                return (
                  <li key={unit}>
                    <Link href={jugyoHref(unit)} className="block rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                      <span className="block text-[12px] font-black text-[#1533B8]">{info ? `${info.level}・${info.subject}　${plain(info.name)}` : unit}</span>
                      <span className="mt-1 block text-[17px] font-black leading-snug">
                        <Rich text={getLecture(unit)?.title ?? ls[0].title} />
                      </span>
                      <span className="mt-1.5 block text-[12.5px] font-bold text-[#3A3D55]">
                        約{range(mins)}分・{range(ps)}回止まる　▶ 見る
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </LearnShell>
  );
}
