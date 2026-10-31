import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { SHIBORIYUSHO } from "@/lib/learn/shiboriyusho";
import { findCard } from "@/lib/learn/topics";

// /learn/shiboriyusho/[no]: 志望理由書のカード1枚。

export function generateStaticParams() {
  return SHIBORIYUSHO.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(SHIBORIYUSHO, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(SHIBORIYUSHO, no)) notFound();
  return <TopicCardPage topic={SHIBORIYUSHO} no={no} />;
}
