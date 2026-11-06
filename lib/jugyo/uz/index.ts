// このファイルは lib/jugyo/uz/gen-index.ts が作る（手で書きかえない）。
// ゼロワンOSユース版（lib/unizeb の図解レクチャー）の止まる授業の登録。
// 単元 id は lecture の unit（"unizeb-<カードid>"）。データのファイル名はカードid（z1-01.ts・z1-01.h-charisma.ts）。
import type { CastScript, UnitBase } from "../types";


export const UZ_BASES: UnitBase[] = [];
export const UZ_SCRIPTS: CastScript[] = [];

/** 音声の置き場所（本体の public/audio/jugyo とは分ける） */
export const UZ_AUDIO_DIR = "public/audio/jugyo/uz";
export const uzJugyoSrc = (key: string) => `/audio/jugyo/uz/${key}.mp3`;
/** ユース版の授業のページ（レクチャーと同じ見せ方の判定） */
export const uzJugyoHref = (cardId: string) => `/learn/unizeb/jugyo/${cardId}`;
