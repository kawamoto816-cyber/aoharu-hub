import type { LearnRegionTopic } from "./types";
import { SHORONBUN } from "./shoronbun";
import { SHIBORIYUSHO } from "./shiboriyusho";
import { JIBUN } from "./jibun";
import { DAIGAKU } from "./daigaku";
import { MENSETSU } from "./mensetsu";
import { KYOYO } from "./kyoyo";
import { PARADIGM } from "./paradigm";

// 公開している「まなぶ」の領域。スキル盤・マイページ・サイトマップはここから作る。
export const TOPICS: LearnRegionTopic[] = [JIBUN, DAIGAKU, SHIBORIYUSHO, SHORONBUN, MENSETSU, KYOYO, PARADIGM];

export function findCard(topic: LearnRegionTopic, no: number) {
  return topic.cards.find((c) => c.no === no) ?? null;
}
