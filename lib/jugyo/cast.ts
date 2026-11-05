import type { CastMember, Who } from "./types";

// 「止まる授業」の2人（オリジナルのキャラクター。どの単元でも同じ2人）。
// 見た目は components/jugyo/Avatar.tsx（シンプルな図形のアバター）。
//   トキワ先生：紺の角丸の四角の顔、横長の四角いめがね、頭の上に黄色いチョークの線
//   ミノリ   ：黄色のまんまるの顔、赤い三角のヘアピン、ほっぺに丸

export const JUGYO_CAST: Record<Who, CastMember> = {
  sensei: { name: "トキワ先生", yomi: "ときわせんせい", role: "図を指しながら、しくみから話す先生" },
  seito: { name: "ミノリ", yomi: "みのり", role: "思ったことをすぐ口にする生徒。よくあるまちがいもそのまま言う" },
};
