// 「漫才で聞く」と小説の「朗読を聞く」、名作の引用の朗読の音声をまとめて作る。手元のパソコンで動かす。
// 日本語は VOICEVOX（アプリを起動しておく。mp3 への変換に ffmpeg が要る）、英語は Google Cloud Text-to-Speech (Chirp 3: HD) のネイティブの声。
//
//   数をたしかめる:  npx tsx scripts/manzai-tts.ts --count
//   全部作る:        npx tsx scripts/manzai-tts.ts
//     → public/audio/manzai/<キー>.mp3（漫才1行ごと）・public/audio/novel/<キー>.mp3（小説1段落ごと）。キーは lib/tts/manzai.ts
//     すでにあるファイルは作り直さない。漫才を足したり直したり、声を変えたりしたら、同じコマンドで足りない分だけ作る。
//     もう使われなくなった古い音声ファイルは消す（声を変えたときの前の声など）。
//
// API キーは .env.local の GOOGLE_TTS_API_KEY（英語の音声と同じ）。キーは画面に出さない。

import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { LECTURES } from "../lib/lecture";
import { manzaiAudio, novelAudio } from "../lib/tts/yomi";
import { reciteAudio } from "../lib/tts/recite";

type Job = { dir: string; key: string; text: string; voice: string; rate: number; unit: string; lang?: string; name?: string };

const DIRS = ["public/audio/manzai", "public/audio/novel", "public/audio/recite"];

function collect(): Job[] {
  const jobs = new Map<string, Job>();
  for (const lec of LECTURES) {
    const st = lec.story;
    if (st?.kind === "manzai") {
      for (const l of st.lines) {
        const a = manzaiAudio(st.cast, l);
        jobs.set(`m/${a.key}`, { dir: DIRS[0], key: a.key, text: a.text, voice: a.voice, rate: a.rate, unit: lec.unit });
      }
    }
    if (st?.kind === "novel") {
      for (const [i, p] of st.paragraphs.entries()) {
        const a = novelAudio(p, st.sayFix, st.say?.[i], lec.unit.startsWith("e-"));
        jobs.set(`n/${a.key}`, { dir: DIRS[1], key: a.key, text: a.text, voice: a.voice, rate: a.rate, unit: lec.unit });
      }
    }
    for (const s of lec.sections)
      for (const r of s.recite ?? []) {
        const a = reciteAudio(r);
        jobs.set(`r/${a.key}`, { dir: DIRS[2], key: a.key, text: a.text, voice: a.name, rate: a.rate, unit: lec.unit, lang: a.languageCode, name: a.name });
      }
  }
  return [...jobs.values()];
}

function apiKey(): string {
  if (process.env.GOOGLE_TTS_API_KEY) return process.env.GOOGLE_TTS_API_KEY;
  if (existsSync(".env.local")) {
    const m = readFileSync(".env.local", "utf8").match(/^GOOGLE_TTS_API_KEY=\s*"?([^"\n]+)"?/m);
    if (m) return m[1].trim();
  }
  console.error(".env.local に GOOGLE_TTS_API_KEY=... を書いてから動かしてください。");
  process.exit(1);
}

// ── VOICEVOX（日本語）。アプリを起動しておくと http://localhost:50021 で待ち受ける ──
const VV = process.env.VOICEVOX_URL ?? "http://localhost:50021";
let vvIds: Map<string, number> | null = null;

async function vvSpeakers(): Promise<Map<string, number>> {
  if (vvIds) return vvIds;
  let r: Response;
  try {
    r = await fetch(`${VV}/speakers`);
  } catch {
    console.error("VOICEVOX につながりません。VOICEVOX のアプリを起動してから、もう一度動かしてください。");
    process.exit(1);
  }
  const list = (await r.json()) as { name: string; styles: { name: string; id: number }[] }[];
  vvIds = new Map(list.map((sp) => [sp.name, (sp.styles.find((st) => st.name === "ノーマル") ?? sp.styles[0]).id]));
  return vvIds;
}

function checkFfmpeg() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
  } catch {
    console.error("mp3 に変換する ffmpeg が見つかりません。ターミナルで  brew install ffmpeg  を実行してから、もう一度動かしてください。");
    process.exit(1);
  }
}

async function synthVoicevox(j: Job): Promise<Buffer> {
  const name = j.voice.slice(3);
  const id = (await vvSpeakers()).get(name);
  if (id === undefined) throw new Error(`VOICEVOX に「${name}」の声が入っていません（アプリの「キャラクター」から追加してください）`);
  const q = await fetch(`${VV}/audio_query?speaker=${id}&text=${encodeURIComponent(j.text)}`, { method: "POST" });
  if (!q.ok) throw new Error(`audio_query ${q.status}`);
  const query = (await q.json()) as Record<string, number>;
  const manzai = j.dir.endsWith("manzai");
  query.speedScale = j.rate;
  query.intonationScale = manzai ? 1.25 : 1.12;
  query.prePhonemeLength = manzai ? 0.05 : 0.1;
  query.postPhonemeLength = manzai ? 0.05 : 0.15;
  if ("pauseLengthScale" in query) query.pauseLengthScale = manzai ? 0.9 : 1.1;
  const w = await fetch(`${VV}/synthesis?speaker=${id}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(query) });
  if (!w.ok) throw new Error(`synthesis ${w.status}`);
  const tmp = join(tmpdir(), `vv-${j.key}.wav`);
  const out = join(tmpdir(), `vv-${j.key}.mp3`);
  writeFileSync(tmp, Buffer.from(await w.arrayBuffer()));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", tmp, "-ac", "1", "-b:a", "64k", out]);
  const buf = readFileSync(out);
  unlinkSync(tmp);
  unlinkSync(out);
  return buf;
}

async function synth(key: string, j: Job): Promise<Buffer> {
  if (j.voice.startsWith("vv:")) return synthVoicevox(j);
  const body = {
    input: { text: j.text },
    voice: j.name ? { languageCode: j.lang, name: j.name } : { languageCode: "ja-JP", name: `ja-JP-Chirp3-HD-${j.voice}` },
    audioConfig: { audioEncoding: "MP3", speakingRate: j.rate },
  };
  for (let attempt = 1; ; attempt++) {
    const r = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) return Buffer.from(((await r.json()) as { audioContent: string }).audioContent, "base64");
    const msg = (await r.text()).slice(0, 300);
    if (attempt >= 5 || (r.status >= 400 && r.status < 429)) throw new Error(`${r.status} ${msg}`);
    await new Promise((res) => setTimeout(res, 3000 * attempt));
  }
}


async function main() {
  const jobs = collect();
  const todo = jobs.filter((j) => !existsSync(`${j.dir}/${j.key}.mp3`));
  const count = (dir: string) => jobs.filter((j) => j.dir === dir);
  const chars = todo.reduce((n, j) => n + j.text.length, 0);
  console.log(
    `漫才 ${new Set(count(DIRS[0]).map((j) => j.unit)).size} 本・${count(DIRS[0]).length} 行／小説 ${new Set(count(DIRS[1]).map((j) => j.unit)).size} 本・${count(DIRS[1]).length} 段落／名作の朗読 ${count(DIRS[2]).length} 編`,
  );
  console.log(`作るのは ${todo.length} 個（約 ${chars.toLocaleString()} 字）`);
  const stale: string[] = [];
  for (const dir of DIRS) {
    const used = new Set(count(dir).map((j) => `${j.key}.mp3`));
    if (existsSync(dir)) for (const f of readdirSync(dir)) if (f.endsWith(".mp3") && !used.has(f)) stale.push(`${dir}/${f}`);
  }
  if (stale.length) console.log(`使われなくなった古い音声 ${stale.length} 個${process.argv.includes("--count") ? "（消すのは本番の実行時）" : "を消します"}`);
  if (process.argv.includes("--count")) return;
  for (const f of stale) unlinkSync(f);
  if (todo.some((j) => j.voice.startsWith("vv:"))) {
    checkFfmpeg();
    await vvSpeakers();
  }
  const key = todo.some((j) => !j.voice.startsWith("vv:")) ? apiKey() : "";
  for (const dir of DIRS) mkdirSync(dir, { recursive: true });
  let next = 0;
  let done = 0;
  const failed: string[] = [];
  async function worker() {
    while (next < todo.length) {
      const j = todo[next++];
      try {
        writeFileSync(`${j.dir}/${j.key}.mp3`, await synth(key, j));
      } catch (e) {
        failed.push(`${j.unit}: ${j.text.slice(0, 20)}… ${(e as Error).message}`);
      }
      if (++done % 20 === 0) console.log(`  ${done} / ${todo.length}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  console.log(`できました: ${done - failed.length} 行${failed.length ? `・失敗 ${failed.length} 行` : ""}`);
  for (const f of failed) console.log("  ×", f);
  if (failed.length) process.exit(1);
}

main();
