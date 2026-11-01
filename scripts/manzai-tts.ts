// 「漫才で聞く」の音声を Google Cloud Text-to-Speech (Chirp 3: HD, 日本語) でまとめて作る。手元のパソコンで動かす。
//
//   数をたしかめる:  npx tsx scripts/manzai-tts.ts --count
//   全部作る:        npx tsx scripts/manzai-tts.ts
//     → public/audio/manzai/<キー>.mp3（1行ごと。キーは lib/tts/manzai.ts）
//     すでにあるファイルは作り直さない。漫才を足したり直したりしたら、同じコマンドで足りない分だけ作る。
//
// API キーは .env.local の GOOGLE_TTS_API_KEY（英語の音声と同じ）。キーは画面に出さない。

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { LECTURES } from "../lib/lecture";
import { manzaiKey, manzaiSay, manzaiVoiceOf } from "../lib/tts/manzai";

type Job = { key: string; text: string; voice: string; rate: number; unit: string };

function collect(): Job[] {
  const jobs = new Map<string, Job>();
  for (const lec of LECTURES) {
    const st = lec.story;
    if (!st || st.kind !== "manzai") continue;
    for (const l of st.lines) {
      const v = manzaiVoiceOf(st.cast, l.who);
      const key = manzaiKey(st.cast, l);
      jobs.set(key, { key, text: manzaiSay(l), voice: v.voice, rate: v.rate, unit: lec.unit });
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

async function synth(key: string, j: Job): Promise<Buffer> {
  const body = {
    input: { text: j.text },
    voice: { languageCode: "ja-JP", name: `ja-JP-Chirp3-HD-${j.voice}` },
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

const DIR = "public/audio/manzai";

async function main() {
  const jobs = collect();
  const todo = jobs.filter((j) => !existsSync(`${DIR}/${j.key}.mp3`));
  const units = new Set(jobs.map((j) => j.unit)).size;
  const chars = todo.reduce((n, j) => n + j.text.length, 0);
  console.log(`漫才 ${units} 本・${jobs.length} 行のうち、作るのは ${todo.length} 行（約 ${chars.toLocaleString()} 字）`);
  if (process.argv.includes("--count")) return;
  const key = apiKey();
  mkdirSync(DIR, { recursive: true });
  let next = 0;
  let done = 0;
  const failed: string[] = [];
  async function worker() {
    while (next < todo.length) {
      const j = todo[next++];
      try {
        writeFileSync(`${DIR}/${j.key}.mp3`, await synth(key, j));
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
