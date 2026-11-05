// 止まる授業の声。VOICEVOX（手元のパソコンで動かす無料の音声合成）で1せりふずつ作り、
// public/audio/jugyo/<キー>.mp3 に置く（キーは lib/tts/manzai.ts と同じく 声・速さ・読む文 から決まる。文を直せば作り直し）。
// 作るのは scripts/jugyo-tts.ts。ファイルが無いせりふは、プレイヤーがブラウザの声（仮の声）で読む。
// 読みの補正表 (lib/tts/yomi.gen.ts) を使うのでサーバー側だけで使う。ブラウザには src と読む文だけを渡す。

import { jaKey, voiceCredit } from "@/lib/tts/manzai";
import { manzaiSpeech } from "@/lib/tts/yomi";
import type { TalkScene, Who } from "./types";

/** 先生と生徒の声。オーナーの好み順（四国めたん・青山龍星・…）の上から2人。先生は落ち着いた青山龍星、生徒は四国めたん */
export const JUGYO_VOICE: Record<Who, { voice: string; rate: number }> = {
  sensei: { voice: "vv:青山龍星", rate: 1.05 },
  seito: { voice: "vv:四国めたん", rate: 1.12 },
};

/** クレジット表示（例 "VOICEVOX:青山龍星・四国めたん"） */
export const JUGYO_CREDIT = [JUGYO_VOICE.sensei.voice, JUGYO_VOICE.seito.voice].map(voiceCredit).join("・").replace(/・VOICEVOX:/g, "・");

export const jugyoSrc = (key: string) => `/audio/jugyo/${key}.mp3`;

/** 1せりふの音声（読む文・キー・ファイルの場所） */
export function jugyoAudio(t: Pick<TalkScene, "who" | "text" | "say">) {
  const v = JUGYO_VOICE[t.who];
  const text = manzaiSpeech(t);
  const key = jaKey(v.voice, v.rate, text);
  return { key, text, voice: v.voice, rate: v.rate, src: jugyoSrc(key) };
}
