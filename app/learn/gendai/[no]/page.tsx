import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { GENDAI } from "@/lib/learn/gendai";
import { findCard } from "@/lib/learn/topics";

// /learn/gendai/[no]: 現代の論点のカード1枚。

export function generateStaticParams() {
  return GENDAI.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(GENDAI, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(GENDAI, no)) notFound();
  return <TopicCardPage topic={GENDAI} no={no} />;
}
