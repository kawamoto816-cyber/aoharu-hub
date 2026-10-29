import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { MENSETSU } from "@/lib/learn/mensetsu";
import { findCard } from "@/lib/learn/topics";

// /learn/mensetsu/[no]: 面接のカード1枚。

export function generateStaticParams() {
  return MENSETSU.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(MENSETSU, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(MENSETSU, no)) notFound();
  return <TopicCardPage topic={MENSETSU} no={no} />;
}
