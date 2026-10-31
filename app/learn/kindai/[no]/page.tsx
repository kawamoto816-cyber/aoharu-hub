import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { KINDAI } from "@/lib/learn/kindai";
import { findCard } from "@/lib/learn/topics";

// /learn/kindai/[no]: 近代の知のカード1枚。

export function generateStaticParams() {
  return KINDAI.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(KINDAI, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(KINDAI, no)) notFound();
  return <TopicCardPage topic={KINDAI} no={no} />;
}
