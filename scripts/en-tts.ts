// 英語の読み上げ音声を Google Cloud Text-to-Speech (Chirp 3: HD) でまとめて作る。手元のパソコンで動かす。
// 英単語2000 (scripts/eitango-tts.ts) と同じ声・同じやり方で、ほかの英語の「発音を聞く」をすべてネイティブの音声にする。
//
//   数をたしかめる:  npx tsx scripts/en-tts.ts --count
//   全部作る:        npx tsx scripts/en-tts.ts --voice Kore
//     → public/audio/en/<キー>.mp3（キーは読み上げる文字列から決まる。lib/tts/en.ts）
//     すでにあるファイルは作り直さない（途中で止まっても、もう一度動かせば続きから）。
//     あとで英文を足したり直したりしたときも、同じコマンドで足りない分だけ作る。
//
// API キーは .env.local の GOOGLE_TTS_API_KEY（英単語2000 のときと同じ）。キーは画面に出さない。

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { CHU_WORDS } from "../lib/chutango";
import { JUKUGO } from "../lib/jukugo";
import { enAudioKey, enRate, normalizeEn, speakableHead } from "../lib/tts/en";

/** 画面で「発音を聞く」がついている英語の文字列をすべて集める（画面と同じ取り出し方で） */
function collect(): string[] {
  const texts = new Set<string>();
  const add = (t: string) => {
    const s = normalizeEn(t);
    // 日本語がまじる見出し（例「the + 比較級 , ...」）は読み上げ用の音声を作らない
    if (s && !/[\u3040-\u30ff\u3400-\u9fff]/.test(s)) texts.add(s);
  };
  for (const w of CHU_WORDS) {
    add(speakableHead(w.word));
    add(w.ex);
  }
  for (const j of JUKUGO) {
    add(speakableHead(j.p));
    add(j.ex);
  }
  return [...texts];
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

async function synth(key: string, text: string, voice: string, rate: number): Promise<Buffer> {
  const body = {
    input: { text },
    voice: { languageCode: "en-US", name: `en-US-Chirp3-HD-${voice}` },
    audioConfig: { audioEncoding: "MP3", speakingRate: rate },
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

const DIR = "public/audio/en";

async function all(voice: string) {
  const key = apiKey();
  mkdirSync(DIR, { recursive: true });
  const texts = collect();
  const todo = texts.filter((t) => !existsSync(`${DIR}/${enAudioKey(t)}.mp3`));
  const chars = todo.reduce((n, t) => n + t.length, 0);
  console.log(`作るファイル ${todo.length} / ${texts.length}（約 ${chars.toLocaleString()} 字・声: ${voice}）`);
  let done = 0;
  let next = 0;
  const failed: string[] = [];
  async function worker() {
    while (next < todo.length) {
      const t = todo[next++];
      try {
        writeFileSync(`${DIR}/${enAudioKey(t)}.mp3`, await synth(key, t, voice, enRate(t)));
      } catch (e) {
        failed.push(`${t.slice(0, 40)}: ${(e as Error).message}`);
      }
      if (++done % 100 === 0) console.log(`  ${done} / ${todo.length}`);
    }
  }
  await Promise.all(Array.from({ length: 3 }, worker));
  writeFileSync(`${DIR}/voice.json`, JSON.stringify({ voice: `en-US-Chirp3-HD-${voice}`, count: texts.length }) + "\n");
  if (failed.length) {
    console.log(`\n失敗 ${failed.length} 件（もう一度動かすと、失敗した分だけ作り直します）:`);
    for (const f of failed.slice(0, 10)) console.log("  " + f);
  } else console.log("\n全部できました。");
}

function count() {
  const texts = collect();
  const todo = texts.filter((t) => !existsSync(`${DIR}/${enAudioKey(t)}.mp3`));
  console.log(`読み上げる英語 ${texts.length} 件（約 ${texts.reduce((n, t) => n + t.length, 0).toLocaleString()} 字）。まだ音声がないもの ${todo.length} 件。`);
}

const args = process.argv.slice(2);
const vi = args.indexOf("--voice");
const run = args.includes("--count") ? Promise.resolve(count()) : vi >= 0 && args[vi + 1] ? all(args[vi + 1]) : Promise.resolve(console.log("使い方: --count（数をたしかめる） / --voice Kore（全部作る）"));
run.catch((e) => {
  console.error("止まりました:", (e as Error).message);
  process.exit(1);
});
