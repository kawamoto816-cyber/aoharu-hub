import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { CHISEIGAKU } from "@/lib/learn/chiseigaku";
import { findCard } from "@/lib/learn/topics";

// /learn/chiseigaku/[no]: 地政学のカード1枚。

export function generateStaticParams() {
  return CHISEIGAKU.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(CHISEIGAKU, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(CHISEIGAKU, no)) notFound();
  return <TopicCardPage topic={CHISEIGAKU} no={no} />;
}
