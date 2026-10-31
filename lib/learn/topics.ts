import type { LearnRegionTopic } from "./types";
import { SHORONBUN } from "./shoronbun";
import { SHIBORIYUSHO } from "./shiboriyusho";
import { JIBUN } from "./jibun";
import { DAIGAKU } from "./daigaku";
import { MENSETSU } from "./mensetsu";
import { KYOYO } from "./kyoyo";
import { PARADIGM } from "./paradigm";
import { KINDAI } from "./kindai";
import { CHISEIGAKU } from "./chiseigaku";
import { KOKUSAI } from "./kokusai";
import { GENDAI } from "./gendai";

// 公開している「まなぶ」の領域。スキル盤・マイページ・サイトマップはここから作る。
export const TOPICS: LearnRegionTopic[] = [JIBUN, DAIGAKU, SHIBORIYUSHO, SHORONBUN, MENSETSU, KYOYO, PARADIGM, KINDAI, CHISEIGAKU, KOKUSAI, GENDAI];

export function findCard(topic: LearnRegionTopic, no: number) {
  return topic.cards.find((c) => c.no === no) ?? null;
}

export function findTopic(key: string) {
  return TOPICS.find((t) => t.key === key) ?? null;
}

/** マイページの「まなぶ」用：題と id だけ (本文はブラウザへ渡さない) */
export function resumeTopics() {
  return TOPICS.map((t) => ({
    key: t.key,
    label: t.label,
    basePath: t.basePath,
    tryAppName: t.tryApp.name,
    ura: t.homeHref === "/learn/apply#ura",
    cards: t.cards.map((c) => ({ id: c.id, no: c.no, title: c.title })),
  }));
}
