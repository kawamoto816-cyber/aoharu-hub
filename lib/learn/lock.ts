import type { LearnCard, LearnRegionTopic } from "./types";

// 裏面 (難関校アドバンスト) の Pro のカード。freeChapters より後の章は Pro。
// Pro のカードの本文 (裏・図解・三択) は、Pro の人にだけ /api/learn/card から送る。
// ブラウザへ渡す topic は publicTopic() で本文を抜いてから渡すこと。

export function isLockedCard(topic: Pick<LearnRegionTopic, "freeChapters">, card: Pick<LearnCard, "chapter">): boolean {
  return topic.freeChapters !== undefined && card.chapter > topic.freeChapters;
}

/** Pro のカードの本文を抜いたカード (題・表の一文は残す) */
export function stripCard(card: LearnCard): LearnCard {
  return {
    no: card.no,
    id: card.id,
    chapter: card.chapter,
    title: card.title,
    front: card.front,
    back: "",
    diagramTitle: "",
    diagram: { type: "checklist", items: [] },
    quiz: { question: "", options: ["", "", ""], answer: 0, explanation: "" },
  };
}

export function publicTopic(topic: LearnRegionTopic): LearnRegionTopic {
  if (topic.freeChapters === undefined) return topic;
  return { ...topic, cards: topic.cards.map((c) => (isLockedCard(topic, c) ? stripCard(c) : c)) };
}
