import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { KOKUSAI } from "@/lib/learn/kokusai";
import { findCard } from "@/lib/learn/topics";

// /learn/kokusai/[no]: 国際関係のレンズのカード1枚。

export function generateStaticParams() {
  return KOKUSAI.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(KOKUSAI, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(KOKUSAI, no)) notFound();
  return <TopicCardPage topic={KOKUSAI} no={no} />;
}
