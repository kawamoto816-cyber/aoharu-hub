// 「漫才で聞く」の音声。Google Cloud Text-to-Speech (Chirp 3: HD, 日本語) で1行ずつ作り、
// public/audio/manzai/<キー>.mp3 に置く（キーは 声・速さ・読む文 から決まる。文を直せば作り直しになる）。
// 作るのは scripts/manzai-tts.ts（手元のパソコンで動かす）。

/** ボケ（cast[0]）とツッコミ（cast[1]）の声と速さ。テンポよく、ツッコミは少し速く強めに */
export const MANZAI_VOICE = {
  boke: { voice: "Puck", rate: 1.1 },
  tsukkomi: { voice: "Fenrir", rate: 1.15 },
} as const;

/** 行と行のあいだ（ミリ秒）。ツッコミはボケにかぶせるように短く */
export const MANZAI_GAP = { toTsukkomi: 60, toBoke: 220 } as const;

const RUBY = /｜([^《]+)《([^》]+)》|([㐀-鿿々〆ヶ]+)《([^》]+)》/g;

/** 画面の文（{{強調}}・ルビつき）から、読み上げる文を作る。ルビがあれば読みを使う */
export function manzaiSay(line: { text: string; say?: string }): string {
  const t = line.say ?? line.text.replace(RUBY, (_a, _b1, r1, _b2, r2) => r1 ?? r2).replace(/\{\{(.+?)\}\}/g, "$1");
  return t.replace(/\s+/g, " ").trim();
}

function fnv(s: string, seed: number): string {
  let h = seed >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h.toString(36).padStart(7, "0");
}

export function manzaiVoiceOf(cast: [string, string], who: string) {
  return who === cast[1] ? MANZAI_VOICE.tsukkomi : MANZAI_VOICE.boke;
}

/** 1行の音声ファイルのキー */
export function manzaiKey(cast: [string, string], line: { who: string; text: string; say?: string }): string {
  const v = manzaiVoiceOf(cast, line.who);
  const s = `ja-JP|${v.voice}|${v.rate}|${manzaiSay(line)}`;
  return fnv(s, 2166136261) + fnv(s, 33554467);
}

export const manzaiSrc = (key: string) => `/audio/manzai/${key}.mp3`;
