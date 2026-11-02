// うまくツッコめたときの掛け声（VOICEVOX）。正解の直後に短く鳴らし、そのあと言い直しの声へつなぐ。
// kana は VOICEVOX の「AquesTalk 風記法」（' のうしろで音が下がる）。関西の「なんでやねん」らしい抑揚にするために使う。
// 音声は scripts/manzai-tts.ts が public/audio/tsukkomi/ に作る（ファイルがなければ画面は無音で進む）。

import { jaKey } from "../tts/manzai";

export type KakegoeKind = "nice" | "combo" | "through";

interface Kakegoe {
  kind: KakegoeKind;
  /** 画面に出す文字 */
  text: string;
  /** 読み（アクセントつきカナ） */
  kana: string;
  voice: string;
  rate: number;
  /** 抑揚の強さ（VOICEVOX の intonationScale） */
  intonation: number;
}

export const KAKEGOE: Kakegoe[] = [
  { kind: "nice", text: "なんでやねん！", kana: "ナンデヤ'ネン", voice: "vv:四国めたん", rate: 1.2, intonation: 1.6 },
  { kind: "nice", text: "なんでやねん！", kana: "ナンデヤ'ネン", voice: "vv:春日部つむぎ", rate: 1.2, intonation: 1.6 },
  { kind: "nice", text: "なんでやねん！", kana: "ナンデヤ'ネン", voice: "vv:雀松朱司", rate: 1.15, intonation: 1.5 },
  { kind: "combo", text: "キレッキレや！", kana: "キレッキレ'ヤ", voice: "vv:四国めたん", rate: 1.2, intonation: 1.6 },
  { kind: "through", text: "せやな！", kana: "セ'ヤナ", voice: "vv:四国めたん", rate: 1.1, intonation: 1.4 },
];

export const kakegoeKey = (k: Kakegoe) => jaKey(k.voice, k.rate, `kana:${k.kana}:${k.intonation}`);
export const kakegoeSrc = (k: Kakegoe) => `/audio/tsukkomi/${kakegoeKey(k)}.mp3`;

/** その場面の掛け声を1つ選ぶ（同じ種類が複数あれば、ときどき声が変わる） */
export function pickKakegoe(kind: KakegoeKind): { text: string; src: string } {
  const list = KAKEGOE.filter((k) => k.kind === kind);
  const k = list[Math.floor(Math.random() * list.length)];
  return { text: k.text, src: kakegoeSrc(k) };
}
