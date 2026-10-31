import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "./LearnShell";
import { CardPlayer } from "./CardPlayer";
import { LearnSync } from "./LearnSync";
import { Diagram } from "./Diagram";
import { klee } from "@/components/landing/fonts";
import type { LearnRegionTopic } from "@/lib/learn/types";
import { findCard } from "@/lib/learn/topics";
import { isLockedCard, stripCard } from "@/lib/learn/lock";
import { LockedCard } from "./LockedCard";

// /learn/<領域>/[no] の中身 (小論文・面接で共通)。表・裏・図解・三択と、アプリで試す導線。
// 本文はサーバーで描くので、検索エンジンにもカードの中身が読める。

const SITE = "https://app.bluespring.co.jp";

export function topicCardMetadata(topic: LearnRegionTopic, no: number): Metadata {
  const card = findCard(topic, no);
  if (!card) return {};
  const url = `${SITE}${topic.basePath}/${card.no}`;
  const title = `${card.title}｜${topic.label}のコツ No.${card.no}｜アオハルOS`;
  // Pro のカードは本文をメタ情報にも出さない
  const description = isLockedCard(topic, card) ? `${card.front}。${topic.label}のカード（Pro）。` : `${card.front}。${card.back}`.slice(0, 120);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export function TopicCardPage({ topic, no }: { topic: LearnRegionTopic; no: number }) {
  const card = findCard(topic, no);
  if (!card) return null;
  const base = topic.basePath;
  const total = topic.cards.length;
  const prev = card.no > 1 ? card.no - 1 : null;
  const next = card.no < total ? card.no + 1 : null;
  const chapter = topic.chapters.find((c) => c.no === card.chapter);
  const chapterEnd = topic.cards.filter((c) => c.chapter === card.chapter).at(-1)?.no === card.no;

  return (
    <LearnShell narrow homeHref={topic.homeHref ?? "/learn/apply"} crumbs={[{ href: "/learn", label: "まなぶ" }, { href: topic.homeHref ?? "/learn/apply", label: topic.homeHref ? "知のアドバンス" : "選ばれる力" }, { href: base, label: topic.label }, { label: `No.${card.no}` }]}>
      <p className="m-0 text-xs font-bold text-[#3A3D55]">
        第{card.chapter}章　{chapter?.title}
      </p>
      <h1 className="sr-only">
        {card.title}（{topic.label}のコツ No.{card.no}）
      </h1>
      <LearnSync />
      <div className="mt-3">
        {isLockedCard(topic, card) ? (
          <LockedCard
            key={card.id}
            topicKey={topic.key}
            stub={stripCard(card)}
            badge={topic.label}
            tryApp={topic.tryApp}
            total={total}
            handFont={klee.className}
            regionPath={base}
            tryHref={`${topic.tryApp.hrefBase}${card.id}`}
            nextHref={next ? `${base}/${next}` : `${base}#quest`}
            nextLabel={next ? "次のカードへ →" : "仕上げのクエストへ"}
            chapterEnd={chapterEnd}
          />
        ) : (
          <CardPlayer
            key={card.id}
            card={card}
            badge={topic.label}
            tryApp={topic.tryApp}
            total={total}
            handFont={klee.className}
            regionPath={base}
            tryHref={`${topic.tryApp.hrefBase}${card.id}`}
            nextHref={next ? `${base}/${next}` : `${base}#quest`}
            nextLabel={next ? "次のカードへ →" : "仕上げのクエストへ"}
            chapterEnd={chapterEnd}
            diagram={<Diagram data={card.diagram} title={card.diagramTitle} />}
          />
        )}
      </div>

      {card.link && (
        <p className="mb-0 mt-5 text-center text-[13px] font-bold text-[#3A3D55]">
          この先：
          <Link href={`/learn/${card.link.regionKey}`} className="text-[#1533B8]">
            {card.link.label}
          </Link>
        </p>
      )}

      <nav aria-label="前後のカード" className="mt-8 grid grid-cols-2 gap-2.5">
        {prev ? (
          <Link href={`${base}/${prev}`} className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white text-sm font-bold text-[#15172B] no-underline">
            ← No.{prev}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`${base}/${next}`} className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white text-sm font-bold text-[#15172B] no-underline">
            No.{next} →
          </Link>
        ) : (
          <Link href={`${base}#quest`} className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-[#FFE45C] text-sm font-black text-[#15172B] no-underline">
            仕上げのクエストへ
          </Link>
        )}
      </nav>
    </LearnShell>
  );
}
