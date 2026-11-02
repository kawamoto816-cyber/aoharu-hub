// ツッコミ学習法の声。ボケの文はボケ役、正解後の言い直しはツッコミ役の声（VOICEVOX）で読む。
// 漫才（lib/tts/manzai.ts）と同じしくみで、声・速さ・読む文からキーを決め、public/audio/tsukkomi/<キー>.mp3 に置く。
// 読みの補正（lib/tts/yomi.gen.ts）を当てるので、サーバー側だけで使う（ブラウザには音声ファイルの場所だけを渡す）。
//
// 試作では音声ファイルはまだ作っていない。画面はファイルがなければ黙って無音にする。
// 作るときは scripts/manzai-tts.ts の collect() に、tsukkomiJobs() の分を足せばよい
// （public/audio/manzai とは別のフォルダなので、漫才の「使われなくなった古い音声を消す」に巻きこまれない）。

import { MANZAI_PAIRS, jaKey } from "../tts/manzai";
import { manzaiSpeech } from "../tts/yomi";
import { TSUKKOMI } from "./index";
import type { Boke, BokeWithAudio } from "./types";

/** ボケ役・ツッコミ役の声（漫才のいちばん目のコンビ：ずんだもん・四国めたん） */
export const TSUKKOMI_VOICE = MANZAI_PAIRS[0];
export const TSUKKOMI_AUDIO_DIR = "public/audio/tsukkomi";
export const tsukkomiSrc = (key: string) => `/audio/tsukkomi/${key}.mp3`;

function line(role: "boke" | "tsukkomi", say: string) {
  const v = TSUKKOMI_VOICE[role];
  const text = manzaiSpeech({ text: say });
  const key = jaKey(v.voice, v.rate, text);
  return { key, text, voice: v.voice, rate: v.rate, src: tsukkomiSrc(key) };
}

export function tsukkomiAudio(b: Boke) {
  return { boke: line("boke", b.say.boke), tsukkomi: line("tsukkomi", b.say.tsukkomi) };
}

export function withAudio(b: Boke): BokeWithAudio {
  const a = tsukkomiAudio(b);
  return { ...b, audio: { boke: a.boke.src, tsukkomi: a.tsukkomi.src } };
}

/** 音声を作るスクリプト用：全部の行（重複なし） */
export function tsukkomiJobs() {
  const jobs = new Map<string, ReturnType<typeof line> & { unit: string }>();
  for (const [unit, list] of Object.entries(TSUKKOMI))
    for (const b of list) {
      const a = tsukkomiAudio(b);
      jobs.set(a.boke.key, { ...a.boke, unit });
      jobs.set(a.tsukkomi.key, { ...a.tsukkomi, unit });
    }
  return [...jobs.values()];
}
