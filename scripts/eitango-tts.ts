// 英単語2000 の音声ファイルを Google Cloud Text-to-Speech (Chirp 3: HD) で作る。手元のパソコンで一度だけ動かす。
//
//   1) 声を選ぶ:  npx tsx scripts/eitango-tts.ts --sample
//        → public/audio/eitango-sample/ に、女性の声4種で「単語2つ＋例文1つ」の mp3 を作る (約500字)
//   2) 全部作る:  npx tsx scripts/eitango-tts.ts --voice Aoede
//        → public/audio/eitango/w/0001.mp3 (単語) と e/0001.mp3 (例文) を2000語ぶん (約12.5万字。無料枠100万字/月の内)
//        すでにあるファイルは作り直さない (途中で止まっても、もう一度動かせば続きから)
//
// API キーは .env.local の GOOGLE_TTS_API_KEY に書く (.env* は git に入らない)。キーは画面に出さない。

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { STAGE_DATA } from "../lib/eitango/data";

function apiKey(): string {
  if (process.env.GOOGLE_TTS_API_KEY) return process.env.GOOGLE_TTS_API_KEY;
  if (existsSync(".env.local")) {
    const m = readFileSync(".env.local", "utf8").match(/^GOOGLE_TTS_API_KEY=\s*"?([^"\n]+)"?/m);
    if (m) return m[1].trim();
  }
  console.error(".env.local に GOOGLE_TTS_API_KEY=... を書いてから動かしてください。");
  process.exit(1);
}

const KEY = apiKey();
const SAMPLE_VOICES = ["Aoede", "Kore", "Leda", "Zephyr"];

async function synth(text: string, voice: string, rate: number): Promise<Buffer> {
  const body = {
    input: { text },
    voice: { languageCode: "en-US", name: `en-US-Chirp3-HD-${voice}` },
    audioConfig: { audioEncoding: "MP3", speakingRate: rate },
  };
  for (let attempt = 1; ; attempt++) {
    const r = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(KEY)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) return Buffer.from(((await r.json()) as { audioContent: string }).audioContent, "base64");
    const msg = (await r.text()).slice(0, 300);
    if (attempt >= 4 || (r.status >= 400 && r.status < 429)) throw new Error(`${r.status} ${msg}`);
    await new Promise((res) => setTimeout(res, 2000 * attempt));
  }
}

const words = Object.values(STAGE_DATA).flat();
const pad = (n: number) => String(n).padStart(4, "0");

async function sample() {
  const dir = "public/audio/eitango-sample";
  mkdirSync(dir, { recursive: true });
  const pick = [words[0], words[1205]];
  for (const v of SAMPLE_VOICES) {
    for (const w of pick) writeFileSync(`${dir}/${v}-word-${w.word}.mp3`, await synth(w.word, v, 0.9));
    writeFileSync(`${dir}/${v}-sentence.mp3`, await synth(words[0].ex, v, 1.0));
    console.log(`作成: ${v}`);
  }
  console.log(`\n${dir} を開いて聞きくらべ、気に入った声の名前を教えてください。`);
}

async function all(voice: string) {
  const jobs: { file: string; text: string; rate: number }[] = [];
  for (const kind of ["w", "e"] as const) mkdirSync(`public/audio/eitango/${kind}`, { recursive: true });
  for (const w of words) {
    jobs.push({ file: `public/audio/eitango/w/${pad(w.no)}.mp3`, text: w.word, rate: 0.9 });
    jobs.push({ file: `public/audio/eitango/e/${pad(w.no)}.mp3`, text: w.ex, rate: 1.0 });
  }
  const todo = jobs.filter((j) => !existsSync(j.file));
  console.log(`作るファイル ${todo.length} / ${jobs.length}（声: ${voice}）`);
  let done = 0;
  let next = 0;
  const failed: string[] = [];
  async function worker() {
    while (next < todo.length) {
      const j = todo[next++];
      try {
        writeFileSync(j.file, await synth(j.text, voice, j.rate));
      } catch (e) {
        failed.push(`${j.file}: ${(e as Error).message}`);
      }
      if (++done % 100 === 0) console.log(`  ${done} / ${todo.length}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  writeFileSync("public/audio/eitango/voice.json", JSON.stringify({ voice: `en-US-Chirp3-HD-${voice}`, count: words.length }) + "\n");
  if (failed.length) {
    console.log(`\n失敗 ${failed.length} 件（もう一度動かすと、失敗した分だけ作り直します）:`);
    for (const f of failed.slice(0, 10)) console.log("  " + f);
  } else console.log("\n全部できました。");
}

const args = process.argv.slice(2);
const vi = args.indexOf("--voice");
const run = args.includes("--sample") ? sample() : vi >= 0 && args[vi + 1] ? all(args[vi + 1]) : Promise.resolve(console.log("使い方: --sample（声のききくらべ） / --voice <名前>（全部作る）"));
run.catch((e) => {
  console.error("止まりました:", (e as Error).message);
  process.exit(1);
});
