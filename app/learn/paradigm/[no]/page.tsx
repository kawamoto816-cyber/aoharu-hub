import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { PARADIGM } from "@/lib/learn/paradigm";
import { findCard } from "@/lib/learn/topics";

// /learn/paradigm/[no]: 知のパラダイムのカード1枚。

export function generateStaticParams() {
  return PARADIGM.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(PARADIGM, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(PARADIGM, no)) notFound();
  return <TopicCardPage topic={PARADIGM} no={no} />;
}
