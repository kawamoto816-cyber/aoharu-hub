// 漫才・朗読の音声ファイルの場所を、読みの補正（yomi.gen.ts）を当てたうえで決める。サーバー側だけで使う
// （補正表は大きいので、ブラウザには送らない。ブラウザには音声ファイルの場所だけを渡す）。
//
// yomi.gen.ts：単独で出てくる1文字の漢字（風・元・土 など）を文脈に合った読みのひらがなにした読み上げ文。
//   キー = 補正前の読み上げ文のハッシュ、値 = 補正後の読み上げ文。メインの作業者が形態素解析＋目視確認で作る。

import { YOMI } from "./yomi.gen";
import { jaKey, manzaiSay, manzaiSrc, manzaiVoiceOf, NARRATOR, novelSay, novelSrc } from "./manzai";

export function textHash(s: string): string {
  let a = 2166136261 >>> 0;
  let b = 33554467 >>> 0;
  for (let i = 0; i < s.length; i++) {
    a = Math.imul(a ^ s.charCodeAt(i), 16777619) >>> 0;
    b = Math.imul(b ^ s.charCodeAt(i), 16777619) >>> 0;
  }
  return a.toString(36) + b.toString(36);
}

const fixed = (base: string) => YOMI[textHash(base)] ?? base;

/** 漫才1行の読み上げ文（補正後） */
export function manzaiSpeech(line: { text: string; say?: string }): string {
  return fixed(manzaiSay(line));
}

/** 小説1段落の読み上げ文（補正後） */
export function novelSpeech(paragraph: string, sayFix?: Record<string, string>, say?: string): string {
  return fixed(novelSay(paragraph, sayFix, say));
}

export function manzaiAudio(cast: [string, string], line: { who: string; text: string; say?: string }) {
  const v = manzaiVoiceOf(cast, line.who);
  const text = manzaiSpeech(line);
  const key = jaKey(v.voice, v.rate, text);
  return { key, text, voice: v.voice, rate: v.rate, src: manzaiSrc(key) };
}

export function novelAudio(paragraph: string, sayFix?: Record<string, string>, say?: string) {
  const text = novelSpeech(paragraph, sayFix, say);
  const key = jaKey(NARRATOR.voice, NARRATOR.rate, text);
  return { key, text, voice: NARRATOR.voice, rate: NARRATOR.rate, src: novelSrc(key) };
}
