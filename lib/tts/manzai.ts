// 「漫才で聞く」の音声。Google Cloud Text-to-Speech (Chirp 3: HD, 日本語) で1行ずつ作り、
// public/audio/manzai/<キー>.mp3 に置く（キーは 声・速さ・読む文 から決まる。文を直せば作り直しになる）。
// 小説パートの「朗読を聞く」も同じしくみ（1段落ずつ、public/audio/novel/<キー>.mp3）。
// 作るのは scripts/manzai-tts.ts（手元のパソコンで動かす。漫才と小説の両方を作る）。

/**
 * ボケ（cast[0]）とツッコミ（cast[1]）の声と速さ。2人の別人に聞こえるよう、声の高さ・性質がはっきりちがう組み合わせにする
 * （男声どうしだと一人二役に聞こえるため、ボケ＝明るい男声、ツッコミ＝はきはきした若い女声）。ツッコミは少し速く。
 */
export const MANZAI_VOICE = {
  boke: { voice: "Puck", rate: 1.1 },
  tsukkomi: { voice: "Leda", rate: 1.15 },
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

/** 声・速さ・読む文から決まる音声ファイルのキー */
export function jaKey(voice: string, rate: number, text: string): string {
  const s = `ja-JP|${voice}|${rate}|${text}`;
  return fnv(s, 2166136261) + fnv(s, 33554467);
}

/** 1行の音声ファイルのキー */
export function manzaiKey(cast: [string, string], line: { who: string; text: string; say?: string }): string {
  const v = manzaiVoiceOf(cast, line.who);
  return jaKey(v.voice, v.rate, manzaiSay(line));
}

export const manzaiSrc = (key: string) => `/audio/manzai/${key}.mp3`;

// ── 小説の朗読 ──────────────────────────────────────────

/**
 * 小説の語り手。漫才の2人とは別の、あたたかく落ち着いた女声（昔話の語り手のように、ゆっくりめ）。
 */
export const NARRATOR = { voice: "Sulafat", rate: 0.9 } as const;

/** 段落と段落のあいだ（ミリ秒）。語りの「間」 */
export const NOVEL_GAP = 750;

/** 小説の1段落から読み上げる文を作る。sayFix は読み違えやすい語の読み（例 { "武蔵国": "むさしのくに" }） */
export function novelSay(paragraph: string, sayFix?: Record<string, string>): string {
  let t = paragraph.replace(RUBY, (_a, _b1, r1, _b2, r2) => r1 ?? r2).replace(/\{\{(.+?)\}\}/g, "$1");
  for (const [k, v] of Object.entries(sayFix ?? {})) t = t.split(k).join(v);
  return t.replace(/\s+/g, " ").trim();
}

export const novelKey = (paragraph: string, sayFix?: Record<string, string>) => jaKey(NARRATOR.voice, NARRATOR.rate, novelSay(paragraph, sayFix));
export const novelSrc = (key: string) => `/audio/novel/${key}.mp3`;
