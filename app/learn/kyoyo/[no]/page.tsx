import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { KYOYO } from "@/lib/learn/kyoyo";
import { findCard } from "@/lib/learn/topics";

// /learn/kyoyo/[no]: 教養・時事のカード1枚。

export function generateStaticParams() {
  return KYOYO.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(KYOYO, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(KYOYO, no)) notFound();
  return <TopicCardPage topic={KYOYO} no={no} />;
}
