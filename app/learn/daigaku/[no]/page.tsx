import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { DAIGAKU } from "@/lib/learn/daigaku";
import { findCard } from "@/lib/learn/topics";

// /learn/daigaku/[no]: 志望校を知るのカード1枚。

export function generateStaticParams() {
  return DAIGAKU.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(DAIGAKU, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(DAIGAKU, no)) notFound();
  return <TopicCardPage topic={DAIGAKU} no={no} />;
}
