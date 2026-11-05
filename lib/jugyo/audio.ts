// 止まる授業の声。VOICEVOX（手元のパソコンで動かす無料の音声合成）で1せりふずつ作り、
// public/audio/jugyo/<キー>.mp3 に置く（キーは lib/tts/manzai.ts と同じく 声・速さ・読む文 から決まる。文を直せば作り直し）。
// 作るのは scripts/jugyo-tts.ts。ファイルが無いせりふは、プレイヤーがブラウザの声（仮の声）で読む。
// 読みの補正表 (lib/tts/yomi.gen.ts) を使うのでサーバー側だけで使う。ブラウザには src と読む文だけを渡す。

import { jaKey, voiceCredit } from "@/lib/tts/manzai";
import { manzaiSpeech } from "@/lib/tts/yomi";
import type { PauseScene, TalkScene, Who } from "./types";

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

/** 選択肢の並びを、問いの文から決まる順に入れかえる（いつも同じ位置に正解が来ないように）。画面の並び＝読み上げの番号の順 */
export function choiceOrder<T>(items: T[], seed: string): T[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 2 ? [...items].reverse() : items;
}

/** 答えとわけを読み上げるのは、読む文がこの字数までのとき（長ければ画面で読んでもらう） */
export const REPLY_MAX = 90;

const askText = (q: string, choices?: string[]) =>
  `問題。${q}　${choices ? choices.map((c, n) => `${n + 1}、${c}。`).join("　") : "答えを考えたら、下のボタンを押してください。"}`;
const replyText = (a: string, why: string) => `答えは、${a.replace(/[。．]$/, "")}。${why}`;

/**
 * 「ここで問題」の読み上げ（先生の声）。ask = 問いと選択肢（画面の並びの番号つき）、reply = 答えたあとの「答えとわけ」（長ければ null）。
 * display は字幕バーに出す文（ルビつき）、text は読む文（say を当て、ルビ・{{ }} を外し、読みの補正を当てたもの）。
 */
export function jugyoPauseAudio(q: PauseScene) {
  const v = JUGYO_VOICE.sensei;
  const clip = (display: string, base: string) => {
    const text = manzaiSpeech({ text: base });
    const key = jaKey(v.voice, v.rate, text);
    return { display, text, key, voice: v.voice, rate: v.rate, src: jugyoSrc(key) };
  };
  const idx = q.choices ? choiceOrder(q.choices.map((_, n) => n), q.question) : undefined;
  const shown = idx?.map((n) => q.choices![n]);
  const ask = clip(askText(q.question, shown), askText(q.say?.question ?? q.question, idx?.map((n) => q.say?.choices?.[n] ?? q.choices![n])));
  const reply = clip(replyText(q.answer, q.why), replyText(q.say?.answer ?? q.answer, q.say?.why ?? q.why));
  return { shown, ask, reply: reply.text.length <= REPLY_MAX ? reply : null };
}
