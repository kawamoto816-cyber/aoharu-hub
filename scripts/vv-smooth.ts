// 止まる授業の声の「息つぎ」。scripts/jugyo-tts.ts から使う。
//
// 【いまの作り方：字幕の「間」に合わせる（displayPauses）】2026-11 の指示：「本来の文章（字幕）にある『、』や、かっこの終わりには
//   半拍の間があった方がよい」。そこで、読む文（say）の audio_query はそのまま（読みの点検をとおったもの）使い、間の位置だけを
//   字幕の文の audio_query から写す。字幕の間のうち、「、。！？」とかっこの終わり（」』））から来たものだけを使い、
//   かっこの始まり（「『（）だけの間は使わない。2つの読み（モーラの列）を並べてそろえ（最長共通部分列）、
//   字幕の間の位置にあたる say のアクセント句の切れ目に、字幕の間（エンジンが予測した長さ）を置く。
//   2つの読みがあまりにちがうとき（英語の行など）は、下の「ひと息」の作り方にする。
//
// 【予備：ひと息の作り方（smoothQuery）】
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

// ── 字幕の「間」に合わせる ──

/** 間のもとになる記号の並び（OpenJTalk が間を入れるもの）。テキストの頭と終わりのものは間にならない */
const MARKS = /[、。，．！？!?…「」『』（）()　 ・]+/g;
/** この記号をふくむ並びの間だけを使う（かっこの始まり・空白・中黒だけの並びは使わない） */
const KEEP = /[、。，．！？!?…」』）)]/;

/** 字幕の文の間ごとに、使うかどうか。数が合わなければ null（すべて使う） */
export function pauseKinds(text: string, pauses: number): boolean[] | null {
  const t = text.replace(/[\s　」』）)]+$/, "");
  const runs = [...t.matchAll(MARKS)].filter((m) => m.index! > 0 && m.index! + m[0].length < t.length).map((m) => KEEP.test(m[0]));
  return runs.length === pauses ? runs : null;
}

/** a の切れ目（a[0..p) のうしろ）→ b の位置の範囲 [lo, hi]。最長共通部分列でそろえる */
export function alignBoundaries(a: string[], b: string[]): { map: (p: number) => [number, number]; ratio: number } {
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const pairs: [number, number][] = [];
  for (let i = 0, j = 0; i < n && j < m; ) {
    if (a[i] === b[j]) pairs.push([i++, j++]);
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  const map = (p: number): [number, number] => {
    let lo = 0;
    let hi = m;
    for (const [i, j] of pairs) {
      if (i < p) lo = j + 1;
      else {
        hi = j;
        break;
      }
    }
    return [lo, Math.max(lo, hi)];
  };
  return { map, ratio: n + m ? (2 * pairs.length) / (n + m) : 1 };
}

/**
 * say の句（読みの点検をとおったもの）に、字幕の句の間を写す。写せない（読みがちがいすぎる）ときは null。
 * 戻り値の句は、間（pause_mora）だけがちがう。
 */
export function copyPauses(say: VvPhrase[], disp: VvPhrase[], dispText: string): VvPhrase[] | null {
  const a: string[] = [];
  const dispPauses: { at: number; mora: VvMora }[] = [];
  for (const p of disp) {
    for (const x of p.moras) a.push(x.text);
    if (p.pause_mora) dispPauses.push({ at: a.length, mora: p.pause_mora });
  }
  const b: string[] = [];
  const ends: number[] = [];
  for (const p of say) {
    for (const x of p.moras) b.push(x.text);
    ends.push(b.length);
  }
  const { map, ratio } = alignBoundaries(a, b);
  if (ratio < 0.7) return null;
  const kinds = pauseKinds(dispText, dispPauses.length);
  const out = say.map((p) => ({ ...p, pause_mora: null as VvMora | null }));
  dispPauses.forEach((d, k) => {
    if (kinds && !kinds[k]) return;
    const [lo, hi] = map(d.at);
    // 範囲の中の句の切れ目（なければ前後1モーラまで）。読みがちがう語（「二点」と「ふたつ」）のときは、その語のうしろ（範囲のおわり）に。
    // 最後の句のうしろには置かない
    let idx = ends.findLastIndex((e, i) => i < ends.length - 1 && e >= lo && e <= hi);
    if (idx < 0) idx = ends.findLastIndex((e, i) => i < ends.length - 1 && e >= lo - 1 && e <= hi + 1);
    if (idx >= 0) out[idx].pause_mora = { ...d.mora };
  });
  return out;
}

/**
 * 字幕の間に合わせた audio_query。full は say の audio_query（読みの点検をとおったもの）、display は字幕の文。
 * 写せないときは smoothQuery（ひと息）にする。
 */
export async function displayPauses(speaker: number, text: string, display: string, full: AudioQuery): Promise<{ query: AudioQuery; how: "display" | "breath" | "raw" }> {
  let ps: VvPhrase[] | null = null;
  try {
    const dq = await post<AudioQuery>(`/audio_query?speaker=${speaker}&text=${encodeURIComponent(display)}`);
    ps = copyPauses(full.accent_phrases as unknown as VvPhrase[], dq.accent_phrases as unknown as VvPhrase[], display);
  } catch {
    ps = null;
  }
  if (!ps) {
    const r = await smoothQuery(speaker, text, full);
    return { query: r.query, how: r.smoothed ? "breath" : "raw" };
  }
  const keep = ps;
  try {
    const re = await post<VvPhrase[]>(`/mora_data?speaker=${speaker}`, ps);
    ps = re.map((p, i) => ({ ...p, pause_mora: keep[i].pause_mora ? { ...keep[i].pause_mora! } : null }));
  } catch {
    // 古い版で /mora_data が無いときは、間を写しただけで作る
  }
  return { query: { ...full, accent_phrases: ps as unknown as AudioQuery["accent_phrases"] }, how: "display" };
}
