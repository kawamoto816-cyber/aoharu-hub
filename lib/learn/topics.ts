import type { LearnRegionTopic } from "./types";
import { SHORONBUN } from "./shoronbun";
import { SHIBORIYUSHO } from "./shiboriyusho";
import { JIBUN } from "./jibun";
import { MENSETSU } from "./mensetsu";

// 公開している「まなぶ」の領域。スキル盤・マイページ・サイトマップはここから作る。
export const TOPICS: LearnRegionTopic[] = [JIBUN, SHIBORIYUSHO, SHORONBUN, MENSETSU];

export function findCard(topic: LearnRegionTopic, no: number) {
  return topic.cards.find((c) => c.no === no) ?? null;
}
