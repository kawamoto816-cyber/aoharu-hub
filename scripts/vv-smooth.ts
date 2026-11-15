// 止まる授業の声の「息つぎ」。scripts/jugyo-tts.ts から使う。
//
// 台本の say は、読みを確かめるために「、」を語ごとに細かく打ってある（「もとにするりょうは、200円、くらべるりょうは、60円」）。
// VOICEVOX は「、」ごとに半拍止まるので、そのまま読ませると1文が何度も切れて聞きとりにくい（2026-11 に指摘）。
// 文の字（say）は変えずに（変えると読み・アクセントが変わる）、エンジンが作った audio_query の「間」だけを直す。
//
//   1. 文（。！？ まで）ごとに audio_query を取り、つなげる。文の中の間は「、」などから、文の終わりの間はこちらで入れる。
//      つなげた読みが、文全体の audio_query（読みの点検をとおったもの）とちがえば、文全体のほうをそのまま使う（約0.2%）。
//   2. 文の中の間は、ひと息ぶん（BREATH モーラ）たまったところだけ短く残し、あとは消す。
//      「1、〈選択肢〉。」のように数字で始まる文は、数字のあとの間を残す。
//   3. 間を消したあとの高さ・長さを、エンジン（/mora_data）に予測しなおしてもらう（使えない版なら、そのまま）。

import { VV, type AudioQuery } from "./vv-yomi";

export type VvMora = { text: string; consonant?: string | null; consonant_length?: number | null; vowel: string; vowel_length: number; pitch: number };
export type VvPhrase = { moras: VvMora[]; accent: number; pause_mora?: VvMora | null; is_interrogative?: boolean };

/** ひと息で読むモーラ数（これだけたまったら、文の中でも短く息をつぐ） */
export const BREATH = 14;
/** 文の残りがこれより短ければ、息をつがずに言い切る */
export const TAIL = 5;
/** 文の中で残す間・文の終わりの間（秒） */
export const COMMA_PAUSE = 0.16;
export const END_PAUSE = 0.42;

/** 文に分ける（。！？ と、うしろにつく 」）… や空白まで） */
export function sentences(text: string): string[] {
  return (text.match(/[^。！？!?]+[。！？!?」』）)…\s　]*|[。！？!?]+/g) ?? []).filter((s) => /[^\s　。！？!?、」』）)…]/.test(s));
}

const pause = (sec: number): VvMora => ({ text: "、", consonant: null, consonant_length: null, vowel: "pau", vowel_length: sec, pitch: 0 });
const kanaOf = (ps: VvPhrase[]) => ps.map((p) => p.moras.map((m) => m.text).join("")).join("");

/** 1文のアクセント句の、文の中の間を減らす（文の終わりの間は消す。つなぐときに入れる） */
export function thinPauses(ps: VvPhrase[], keepFirst = false): VvPhrase[] {
  const out = ps.map((p) => ({ ...p }));
  const total = out.reduce((n, p) => n + p.moras.length, 0);
  let run = 0;
  let done = 0;
  let first = true;
  out.forEach((p, i) => {
    run += p.moras.length;
    done += p.moras.length;
    if (i === out.length - 1) {
      p.pause_mora = null;
      return;
    }
    if (!p.pause_mora) return;
    const keep = (keepFirst && first) || (run >= BREATH && total - done >= TAIL);
    first = false;
    if (keep) {
      p.pause_mora = pause(COMMA_PAUSE);
      run = 0;
    } else p.pause_mora = null;
  });
  return out;
}

/** 文ごとのアクセント句をつなぐ（文の終わりに間を入れる。最後の文のうしろは入れない） */
export function joinSentences(list: VvPhrase[][]): VvPhrase[] {
  const out: VvPhrase[] = [];
  list.forEach((ps, i) => {
    if (!ps.length) return;
    const last = ps.length - 1;
    ps.forEach((p, j) => out.push(j === last && i < list.length - 1 ? { ...p, pause_mora: pause(END_PAUSE) } : p));
  });
  return out;
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const r = await fetch(`${VV}${path}`, { method: "POST", ...(body ? { headers: { "content-type": "application/json" }, body: JSON.stringify(body) } : {}) });
  if (!r.ok) throw new Error(`${path.split("?")[0]} ${r.status}`);
  return (await r.json()) as T;
}

/**
 * 息つぎを直した audio_query。full は文全体の audio_query（読みの点検をとおったもの）。
 * 文ごとの読みが full とちがうときは full をそのまま返す（読みを変えないことを優先する）。
 */
export async function smoothQuery(speaker: number, text: string, full: AudioQuery): Promise<{ query: AudioQuery; smoothed: boolean }> {
  const ss = sentences(text);
  const fullPs = full.accent_phrases as unknown as VvPhrase[];
  const parts: VvPhrase[][] = [];
  for (const s of ss) {
    const q = await post<AudioQuery>(`/audio_query?speaker=${speaker}&text=${encodeURIComponent(s)}`);
    parts.push(thinPauses(q.accent_phrases as unknown as VvPhrase[], /^[\s　]*[0-9０-９]+、/.test(s)));
  }
  let ps = joinSentences(parts);
  if (!ps.length || kanaOf(ps) !== kanaOf(fullPs)) return { query: full, smoothed: false };
  try {
    const re = await post<VvPhrase[]>(`/mora_data?speaker=${speaker}`, ps);
    // 予測しなおしで間の長さも変わるので、こちらの長さにもどす
    ps = re.map((p, i) => ({ ...p, pause_mora: ps[i].pause_mora ? { ...ps[i].pause_mora! } : null }));
  } catch {
    // 古い版で /mora_data が無いときは、間を減らしただけで作る
  }
  return { query: { ...full, accent_phrases: ps as unknown as AudioQuery["accent_phrases"] }, smoothed: true };
}
