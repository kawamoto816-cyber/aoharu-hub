// VOICEVOX 本体での読みの最終点検と、ユーザー辞書の登録。scripts/manzai-tts.ts・scripts/jugyo-tts.ts から使う。
//
// - registerUserDict：scripts/voicevox-dict.json の語を、エンジンのユーザー辞書に登録する（同じ語があれば読み・アクセントを更新）。
//   辞書を変えると読みが変わるので、音声を作る前・読みを取り出す前に呼ぶ。
// - vvQuery：エンジンの audio_query を呼び、エンジンが実際に読むカタカナ（アクセント句のモーラをつなげたもの）を取り出す。
//   取り出した audio_query はそのまま音声づくりに使う（同じ文で2回呼ばない）。
// - checkYomi：取り出した読みを「期待する読み」とくらべ、食いちがい・期待する読みが無い行を一覧にする。
//   1つでもあれば止まる（--force で続行）。
//
// くらべ方：両方をカタカナにし、カタカナ以外（句読点・記号・空白）を消し、長音の書き方をそろえる
// （ーは前の母音に、エ段＋イ→エ段＋エ、オ段＋ウ→オ段＋オ。ヲ→オ・ヂ→ジ・ヅ→ズ）。VOICEVOX のモーラは「ー」を使わず母音で書くため。

import { readFileSync, existsSync } from "node:fs";

export const VV = process.env.VOICEVOX_URL ?? "http://localhost:50021";

const DICT = "scripts/voicevox-dict.json";

type DictWord = { surface: string; yomi: string; accent: number; pos?: "普通名詞" | "固有名詞"; priority?: number };
type EngineWord = { surface: string; pronunciation: string; accent_type: number; priority: number; part_of_speech_detail_1: string };

function noEngine(): never {
  console.error(`VOICEVOX につながりません（${VV}）。VOICEVOX のアプリを起動してから、もう一度動かしてください。`);
  process.exit(1);
}

async function vvFetch(path: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(`${VV}${path}`, init);
  } catch {
    noEngine();
  }
}

/** VOICEVOX と同じく、英数字・記号を全角にする */
const zenkaku = (s: string) => s.normalize("NFKC").replace(/[!-~]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0));

/** voicevox-dict.json の語をエンジンのユーザー辞書に登録する（新しい語は足し、読み・アクセント・品詞・優先度がちがう語は直す） */
export async function registerUserDict(): Promise<void> {
  if (!existsSync(DICT)) return;
  const words = JSON.parse(readFileSync(DICT, "utf8")) as DictWord[];
  if (!words.length) return;
  const r = await vvFetch("/user_dict");
  if (!r.ok) {
    console.error(`VOICEVOX のユーザー辞書が読めません（/user_dict ${r.status}）。VOICEVOX を新しい版にしてから動かしてください。`);
    process.exit(1);
  }
  const have = new Map<string, [string, EngineWord]>();
  for (const [id, w] of Object.entries((await r.json()) as Record<string, EngineWord>)) have.set(zenkaku(w.surface), [id, w]);
  let added = 0;
  let updated = 0;
  for (const w of words) {
    const type = w.pos === "固有名詞" ? "PROPER_NOUN" : "COMMON_NOUN";
    const priority = w.priority ?? 7;
    const qs = new URLSearchParams({ surface: w.surface, pronunciation: w.yomi, accent_type: String(w.accent), word_type: type, priority: String(priority) });
    const old = have.get(zenkaku(w.surface));
    if (old) {
      const [id, e] = old;
      const same = e.pronunciation === w.yomi && e.accent_type === w.accent && e.priority === priority && (e.part_of_speech_detail_1 === "固有名詞") === (type === "PROPER_NOUN");
      if (same) continue;
      const u = await vvFetch(`/user_dict_word/${id}?${qs}`, { method: "PUT" });
      if (!u.ok) throw new Error(`ユーザー辞書の「${w.surface}」を直せません（${u.status} ${(await u.text()).slice(0, 200)}）`);
      updated++;
    } else {
      const a = await vvFetch(`/user_dict_word?${qs}`, { method: "POST" });
      if (!a.ok) throw new Error(`ユーザー辞書に「${w.surface}」を入れられません（${a.status} ${(await a.text()).slice(0, 200)}）`);
      added++;
    }
  }
  console.log(`VOICEVOX のユーザー辞書：${words.length} 語${added || updated ? `（足した ${added}・直した ${updated}）` : "（変わりなし）"}`);
}

type Mora = { text: string };
type AccentPhrase = { moras: Mora[]; pause_mora?: Mora | null };
export type AudioQuery = Record<string, unknown> & { accent_phrases: AccentPhrase[] };

/** エンジンの audio_query と、エンジンが読むカタカナ */
export async function vvQuery(speaker: number, text: string): Promise<{ query: AudioQuery; kana: string }> {
  const q = await vvFetch(`/audio_query?speaker=${speaker}&text=${encodeURIComponent(text)}`, { method: "POST" });
  if (!q.ok) throw new Error(`audio_query ${q.status}`);
  const query = (await q.json()) as AudioQuery;
  const kana = query.accent_phrases.map((p) => p.moras.map((m) => m.text).join("") + (p.pause_mora ? "、" : "")).join("");
  return { query, kana };
}

const ROW: Record<string, string> = {};
for (const [v, cs] of [
  ["ア", "アカガサザタダナハバパマヤャラワァ"],
  ["イ", "イキギシジチヂニヒビピミリィ"],
  ["ウ", "ウクグスズツヅヌフブプムユュルゥヴ"],
  ["エ", "エケゲセゼテデネヘベペメレェ"],
  ["オ", "オコゴソゾトドノホボポモヨョロヲォ"],
])
  for (const c of cs) ROW[c] = v;

/** くらべるための形（カタカナだけ・長音をそろえる）。scripts/voicevox_dict.py の vowels と同じ */
export function yomiNorm(s: string): string {
  const k = s
    .replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60))
    .replace(/[^ァ-ヺー]/g, "")
    .replace(/ヲ/g, "オ")
    .replace(/ヂ/g, "ジ")
    .replace(/ヅ/g, "ズ");
  const out: string[] = [];
  for (let c of k) {
    const prev = out.length ? ROW[out[out.length - 1]] : undefined;
    if (c === "ー" && prev) c = prev;
    else if (c === "イ" && prev === "エ") c = "エ";
    else if (c === "ウ" && prev === "オ") c = "オ";
    out.push(c);
  }
  return out.join("");
}

/** 食いちがうところを前後の字といっしょに（「…ノ［ホー/カタ］ガ…」） */
function diffAt(a: string, b: string): string {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  let j = 0;
  while (j < a.length - i && j < b.length - i && a[a.length - 1 - j] === b[b.length - 1 - j]) j++;
  return `…${a.slice(Math.max(0, i - 6), i)}［${a.slice(i, a.length - j)}／${b.slice(i, b.length - j)}］${a.slice(a.length - j, a.length - j + 6)}…`;
}

export type YomiJob = { key: string; text: string; speaker: number; label: string; want: string | undefined };

/**
 * 読みの最終点検。jobs の文をエンジンに読ませ、want とくらべる。食いちがい・want が無い行があれば一覧を出し、
 * --force が無ければ止まる。戻り値はキー → audio_query（音声づくりにそのまま使う）。
 */
export async function checkYomi(jobs: YomiJob[], opts: { expectFile: string; howToFix: string; force: boolean }): Promise<Map<string, AudioQuery>> {
  const queries = new Map<string, AudioQuery>();
  const bad: string[] = [];
  const missing: string[] = [];
  const english: string[] = [];
  let next = 0;
  async function worker() {
    while (next < jobs.length) {
      const j = jobs[next++];
      const { query, kana } = await vvQuery(j.speaker, j.text);
      queries.set(j.key, query);
      if (j.want === undefined) missing.push(`？ ${j.label}`);
      // 英語の語やアルファベット（1文字でも）がある行は、VOICEVOX が英単語として読むので期待（1文字ずつの読み）と合わない。止めずに件数だけ出す
      // 英文をカタカナで書いた行（「アイ ソー ザ …」のように語を空白で区切る）も同じ。VOICEVOX にはフュ・フィなどの音が無く、フユ・フイのように分けて読むため
      else if ((/[A-Za-zＡ-Ｚａ-ｚ]/.test(j.text) || /[ァ-ヺー]{2,}[ 　]+[ァ-ヺー]{2,}/.test(j.text)) && yomiNorm(kana) !== yomiNorm(j.want)) english.push(j.label);
      else if (yomiNorm(kana) !== yomiNorm(j.want))
        bad.push(`✕ ${j.label}\n    文       ${j.text}\n    VOICEVOX ${kana}\n    期待     ${j.want}\n    ちがい   ${diffAt(yomiNorm(kana), yomiNorm(j.want))}（VOICEVOX／期待）`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  console.log(`読みの最終点検（VOICEVOX 本体）：${jobs.length} 行・食いちがい ${bad.length}・期待する読みが無い ${missing.length}`);
  if (english.length) console.log(`  英語・アルファベットをふくむ行 ${english.length} 行は、英語の読み方で読まれるので点検から外しました（耳で確かめる）`);
  if (!bad.length && !missing.length) return queries;
  for (const s of bad) console.log(s);
  for (const s of missing.slice(0, 30)) console.log(s);
  if (missing.length > 30) console.log(`  ほか ${missing.length - 30} 行`);
  if (missing.length) console.log(`期待する読みは ${opts.expectFile} にあります（${opts.howToFix}）。`);
  if (opts.force) {
    console.log("--force なので、このまま音声を作ります。");
    return queries;
  }
  console.log("音声は作らずに止めました。読みを直す（台本の say・読みの補正・scripts/voicevox-dict.json）か、まちがいでなければ --force をつけて動かしてください。");
  process.exit(1);
}
