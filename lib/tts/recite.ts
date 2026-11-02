// 名作の引用の朗読（Recitation）。Google Cloud Text-to-Speech (Chirp 3: HD) で1引用ずつ作り、
// public/audio/recite/<キー>.mp3 に置く。英語はネイティブの声（en-US / en-GB）で読む。作るのは scripts/manzai-tts.ts。

import type { Recitation } from "@/lib/lecture/types";

const VOICES = {
  ja: { male: "Charon", female: "Sulafat" },
  en: { male: "Charon", female: "Aoede" },
} as const;

/** 朗読は少しゆっくり、ことばを味わう速さ */
const RATE = { ja: 0.92, en: 0.95 } as const;

export function reciteVoice(r: Recitation) {
  const languageCode = r.lang === "ja" ? "ja-JP" : r.accent === "gb" ? "en-GB" : "en-US";
  const name = `${languageCode}-Chirp3-HD-${VOICES[r.lang][r.voice ?? (r.lang === "ja" ? "female" : "male")]}`;
  return { languageCode, name, rate: RATE[r.lang] };
}

const RUBY = /｜([^《]+)《([^》]+)》|([㐀-鿿々〆ヶ]+)《([^》]+)》/g;

/** 読み上げる文。行の切れ目は、日本語は「、」、英語は（句読点がなければ）「,」で息つぎにする */
export function reciteSay(r: Recitation): string {
  const base = r.say ?? r.text.replace(RUBY, (_a, _b1, r1, _b2, r2) => r1 ?? r2).replace(/\{\{(.+?)\}\}/g, "$1");
  const lines = base.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  if (r.lang === "ja") return lines.map((l) => (/[。、！？」』]$/.test(l) ? l : `${l}、`)).join("").replace(/、$/, "。");
  return lines.map((l) => (/[.,;:!?—'"’”)-]$/.test(l) ? l : `${l},`)).join(" ").replace(/,$/, ".");
}

function fnv(s: string, seed: number): string {
  let h = seed >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h.toString(36).padStart(7, "0");
}

export function reciteAudio(r: Recitation) {
  const v = reciteVoice(r);
  const text = reciteSay(r);
  const s = `${v.name}|${v.rate}|${text}`;
  const key = fnv(s, 2166136261) + fnv(s, 33554467);
  return { key, text, ...v, src: `/audio/recite/${key}.mp3` };
}
