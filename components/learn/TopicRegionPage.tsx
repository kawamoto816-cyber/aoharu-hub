import { LearnShell } from "./LearnShell";
import { RegionCards } from "./RegionCards";
import { LearnSync } from "./LearnSync";
import { LearnDoneFromApp } from "./LearnDoneFromApp";
import type { LearnRegionTopic } from "@/lib/learn/types";

// /learn/<領域> の中身 (小論文・面接で共通)。20枚 (5章) と仕上げのクエスト。

export function TopicRegionPage({ topic, region, heading, lead }: { topic: LearnRegionTopic; region: string; heading: string; lead: string }) {
  const questId = `${topic.key}-quest`;
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { label: `${region}：${topic.label}` }]}>
      <LearnDoneFromApp topicKey={topic.key} cardIds={topic.cards.map((c) => c.id)} />
      <h1 className="m-0 text-[26px] font-black sm:text-[32px]">{heading}</h1>
      <p className="mb-6 mt-2 text-[15px] leading-relaxed text-[#3A3D55]">{lead}</p>
      <div className="mb-5">
        <LearnSync showNudge returnUrl={topic.basePath} />
      </div>
      <RegionCards topic={topic} />
      {/* 最後のカードの「仕上げのクエストへ」は #quest でここへ飛ぶ。飛んできたときは黄色の枠で目立たせる */}
      <section id="quest" aria-labelledby="quest-heading" className="group mt-10 scroll-mt-6">
        <h2 id="quest-heading" className="m-0 text-lg font-black">
          仕上げのクエスト
        </h2>
        <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">20枚で学んだことを、{topic.tryApp.name}でまとめて試します</p>
        <div className="mt-3 rounded-[18px] border-[1.5px] border-dashed border-[#15172B] bg-white p-5 group-target:border-solid group-target:shadow-[0_0_0_5px_#FFE45C,6px_6px_0_#15172B]">
          <p className="m-0 text-[17px] font-black">{topic.quest}</p>
          <a
            href={`${topic.tryApp.hrefBase}${questId}`}
            className="mt-4 inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-6 text-base font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]"
          >
            {topic.tryApp.name}で挑戦する
          </a>
        </div>
      </section>
    </LearnShell>
  );
}
