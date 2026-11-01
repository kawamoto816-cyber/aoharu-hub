// 英語の読み上げ音声ファイルの名前（キー）。
// 画面の「発音を聞く」とおなじ文字列から、手元で音声を作るスクリプト（scripts/en-tts.ts）と
// ブラウザ（components/eitango/Speak.tsx）が同じキーを計算する。ファイルは public/audio/en/<キー>.mp3。

/** 読み上げる文字列をそろえる（前後の空白・連続した空白） */
export const normalizeEn = (text: string) => text.replace(/\s+/g, " ").trim();

/** 単語カードの見出しから、読み上げる部分だけを取り出す（~ing・~・do を除く） */
export const speakableHead = (head: string) => normalizeEn(head.replace(/~ing|~|\bdo\b/g, ""));

function fnv1a(s: string, seed: number): number {
  let h = seed >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** 文字列から決まる16けたのキー（2つのハッシュをつなげて、ぶつかりにくくする） */
export function enAudioKey(text: string): string {
  const s = normalizeEn(text);
  const a = fnv1a(s, 0x811c9dc5).toString(16).padStart(8, "0");
  const b = fnv1a(s, 0x9747b28c).toString(16).padStart(8, "0");
  return a + b;
}

/** 単語は少しゆっくり、文はふつうの速さ */
export const enRate = (text: string) => (/\s/.test(normalizeEn(text)) ? 1.0 : 0.9);
