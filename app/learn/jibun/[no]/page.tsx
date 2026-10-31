import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCardPage, topicCardMetadata } from "@/components/learn/TopicCardPage";
import { JIBUN } from "@/lib/learn/jibun";
import { findCard } from "@/lib/learn/topics";

// /learn/jibun/[no]: 自分を知るのカード1枚。

export function generateStaticParams() {
  return JIBUN.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  return topicCardMetadata(JIBUN, Number((await params).no));
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const no = Number((await params).no);
  if (!findCard(JIBUN, no)) notFound();
  return <TopicCardPage topic={JIBUN} no={no} />;
}
