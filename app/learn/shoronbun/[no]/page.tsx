import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { SHORONBUN } from "@/lib/learn/shoronbun";
import { findCard } from "@/lib/learn/topics";

// /learn/shoronbun/[no]: 小論文のカード1枚。

export function generateStaticParams() {
  return SHORONBUN.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(SHORONBUN, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(SHORONBUN, no)) notFound();
  return <TopicCardPage topic={SHORONBUN} no={no} />;
}
