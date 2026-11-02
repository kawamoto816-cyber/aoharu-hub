// 「漫才で聞く」の音声。Google Cloud Text-to-Speech (Chirp 3: HD, 日本語) で1行ずつ作り、
// public/audio/manzai/<キー>.mp3 に置く（キーは 声・速さ・読む文 から決まる。文を直せば作り直しになる）。
// 小説パートの「朗読を聞く」も同じしくみ（1段落ずつ、public/audio/novel/<キー>.mp3）。
// 作るのは scripts/manzai-tts.ts（手元のパソコンで動かす。漫才と小説の両方を作る）。

/**
 * 日本語の声は VOICEVOX（手元のパソコンで動かす無料の音声合成。キャラごとの規約に従い「VOICEVOX:名前」を表示する）。
 * voice は "vv:キャラ名"（スタイルは「ノーマル」）。rate は話す速さ（VOICEVOX の speedScale）。
 * 漫才のコンビは3組。台本ごとに（出演者名から）決まった1組を使い、単元によって声が変わるようにする。
 * オーナーの好み順：四国めたん・青山龍星・玄野武宏・ずんだもん・春日部つむぎ・東北きりたん・雀松朱司。
 */
export const MANZAI_PAIRS = [
  { boke: { voice: "vv:ずんだもん", rate: 1.12 }, tsukkomi: { voice: "vv:四国めたん", rate: 1.15 } },
  { boke: { voice: "vv:玄野武宏", rate: 1.1 }, tsukkomi: { voice: "vv:春日部つむぎ", rate: 1.15 } },
  { boke: { voice: "vv:東北きりたん", rate: 1.12 }, tsukkomi: { voice: "vv:雀松朱司", rate: 1.1 } },
] as const;

/** 互換のため残す（最初のコンビ） */
export const MANZAI_VOICE = MANZAI_PAIRS[0];

/** 声の表示名（クレジット）。"vv:四国めたん" → "VOICEVOX:四国めたん" */
export const voiceCredit = (voice: string) => (voice.startsWith("vv:") ? `VOICEVOX:${voice.slice(3)}` : "");

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

/** 台本の出演者名から決まるコンビ（めたん組5割・玄野組3割・きりたん組2割） */
export function manzaiPair(cast: [string, string]) {
  const n = parseInt(fnv(cast.join("|"), 2166136261), 36) % 10;
  return MANZAI_PAIRS[n < 5 ? 0 : n < 8 ? 1 : 2];
}

export function manzaiVoiceOf(cast: [string, string], who: string) {
  const pair = manzaiPair(cast);
  return who === cast[1] ? pair.tsukkomi : pair.boke;
}

/** 漫才のクレジット表示（例 "VOICEVOX:ずんだもん・四国めたん"） */
export const manzaiCredit = (cast: [string, string]) => {
  const pair = manzaiPair(cast);
  return `VOICEVOX:${pair.boke.voice.slice(3)}・${pair.tsukkomi.voice.slice(3)}`;
};

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
 * 小説の語り手。漫才の2人とは別の、あたたかく落ち着いた女声（昔話の語り手のように）。速さはふつう（0.9 はゆっくりすぎた）。
 */
export const NARRATOR = { voice: "vv:青山龍星", rate: 1.0 } as const;
/** 小学校の小説の語り手 */
export const NARRATOR_KIDS = { voice: "vv:四国めたん", rate: 0.95 } as const;
export const narratorOf = (kids?: boolean) => (kids ? NARRATOR_KIDS : NARRATOR);

/** 段落と段落のあいだ（ミリ秒）。語りの「間」 */
export const NOVEL_GAP = 750;

/** 小説の1段落から読み上げる文を作る。sayFix は読み違えやすい語の読み（例 { "武蔵国": "むさしのくに" }） */
export function novelSay(paragraph: string, sayFix?: Record<string, string>, say?: string): string {
  if (say) return say.replace(/\s+/g, " ").trim();
  let t = paragraph.replace(RUBY, (_a, _b1, r1, _b2, r2) => r1 ?? r2).replace(/\{\{(.+?)\}\}/g, "$1");
  for (const [k, v] of Object.entries(sayFix ?? {})) t = t.split(k).join(v);
  return t.replace(/\s+/g, " ").trim();
}

export const novelKey = (paragraph: string, sayFix?: Record<string, string>, say?: string, kids?: boolean) =>
  jaKey(narratorOf(kids).voice, narratorOf(kids).rate, novelSay(paragraph, sayFix, say));
export const novelSrc = (key: string) => `/audio/novel/${key}.mp3`;
