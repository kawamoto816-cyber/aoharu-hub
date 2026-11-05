// 「漫才で聞く」と小説の「朗読を聞く」、名作の引用の朗読の音声をまとめて作る。手元のパソコンで動かす。
// 日本語は VOICEVOX（アプリを起動しておく。mp3 への変換は ffmpeg。なければ npm install で入る ffmpeg-static を使う）、英語は Google Cloud Text-to-Speech (Chirp 3: HD) のネイティブの声。
//
//   数をたしかめる:  npx tsx scripts/manzai-tts.ts --count
//   全部作る:        npx tsx scripts/manzai-tts.ts
//     → public/audio/manzai/<キー>.mp3（漫才1行ごと）・public/audio/novel/<キー>.mp3（小説1段落ごと）。キーは lib/tts/manzai.ts
//     すでにあるファイルは作り直さない。漫才を足したり直したり、声を変えたりしたら、同じコマンドで足りない分だけ作る。
//     もう使われなくなった古い音声ファイルは消す（声を変えたときの前の声など）。
//
// API キーは .env.local の GOOGLE_TTS_API_KEY（英語の音声と同じ）。キーは画面に出さない。
//
//   読みの最終点検（scripts/vv-yomi.ts）：VOICEVOX で作る前に、scripts/voicevox-dict.json を VOICEVOX のユーザー辞書に登録し、
//     作る行を VOICEVOX 本体に読ませて、期待する読み（scripts/yomi-expect.json。Claude の環境で python3 scripts/yomi-expect.py が
//     pyopenjtalk から作る）とくらべる。食いちがい・期待する読みが無い行があれば一覧を出して止まる。まちがいでなければ  --force  をつけて続ける。
//     掛け声（アクセントつきカナで読みを決めているもの）と英語（Google）は点検しない。
//   読みだけ点検する（VOICEVOX の全行・音声は作らない）:  npx tsx scripts/manzai-tts.ts --check
//   （scripts/yomi-expect.py が使う）VOICEVOX の行の キー・文 を JSON で出す:  npx tsx scripts/manzai-tts.ts --dump-jobs

import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { LECTURES } from "../lib/lecture";
import { manzaiAudio, novelAudio } from "../lib/tts/yomi";
import { reciteAudio } from "../lib/tts/recite";
import { tsukkomiJobs } from "../lib/tsukkomi/audio";
import { KAKEGOE, kakegoeKey } from "../lib/tsukkomi/kakegoe";
import { VV, checkYomi, registerUserDict, type AudioQuery } from "./vv-yomi";

type Job = { dir: string; key: string; text: string; voice: string; rate: number; unit: string; lang?: string; name?: string; kana?: string; intonation?: number };

const DIRS = ["public/audio/manzai", "public/audio/novel", "public/audio/recite", "public/audio/tsukkomi"];

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
  // ツッコミ学習法：ボケの文・言い直し・掛け声
  for (const j of tsukkomiJobs()) jobs.set(`t/${j.key}`, { dir: DIRS[3], key: j.key, text: j.text, voice: j.voice, rate: j.rate, unit: j.unit });
  for (const k of KAKEGOE)
    jobs.set(`k/${kakegoeKey(k)}`, { dir: DIRS[3], key: kakegoeKey(k), text: k.text.replace(/！/g, ""), voice: k.voice, rate: k.rate, unit: "tsukkomi", kana: k.kana, intonation: k.intonation });
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

// ── VOICEVOX（日本語）。アプリを起動しておくと http://localhost:50021 で待ち受ける（VOICEVOX_URL で変えられる） ──
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

// ffmpeg は、パソコンに入っていればそれを、なければ npm の ffmpeg-static（npm install で入る）を使う。
let FFMPEG = process.env.FFMPEG_PATH ?? "ffmpeg";
function checkFfmpeg() {
  const ok = (bin: string) => {
    try {
      execFileSync(bin, ["-version"], { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  };
  if (ok(FFMPEG)) return;
  try {
    const bin = createRequire(import.meta.url)("ffmpeg-static") as string | null;
    if (bin && ok(bin)) {
      FFMPEG = bin;
      return;
    }
  } catch {}
  console.error("mp3 に変換する ffmpeg が見つかりません。ターミナルで  npm install  を実行してから、もう一度動かしてください。");
  process.exit(1);
}

async function speakerId(j: Job): Promise<number> {
  const name = j.voice.slice(3);
  const id = (await vvSpeakers()).get(name);
  if (id === undefined) throw new Error(`VOICEVOX に「${name}」の声が入っていません（アプリの「キャラクター」から追加してください）`);
  return id;
}

/** 読みを点検する行：VOICEVOX の行のうち、アクセントつきカナで読みを決めていないもの */
const yomiTarget = (j: Job) => j.voice.startsWith("vv:") && !j.kana;
const EXPECT_JSON = "scripts/yomi-expect.json";

/** VOICEVOX 本体の読みでの最終点検（止まるときはここで終わる）。キー → audio_query */
async function finalCheck(list: Job[]): Promise<Map<string, AudioQuery>> {
  await registerUserDict();
  const want = existsSync(EXPECT_JSON) ? (JSON.parse(readFileSync(EXPECT_JSON, "utf8")) as Record<string, string>) : {};
  const jobs = [];
  const ids = new Map<string, number>();
  for (const j of new Set(list.filter(yomiTarget).map((j) => j.voice)))
    try {
      ids.set(j, await speakerId({ voice: j } as Job));
    } catch (e) {
      console.error((e as Error).message);
      process.exit(1);
    }
  for (const j of list.filter(yomiTarget))
    jobs.push({ key: j.key, text: j.text, speaker: ids.get(j.voice)!, label: `${j.unit} ${j.dir.split("/").pop()}/${j.key}`, want: want[j.key] });
  return checkYomi(jobs, {
    expectFile: EXPECT_JSON,
    howToFix: "無い行は、Claude の環境で python3 scripts/yomi-expect.py を動かして作り直す",
    force: process.argv.includes("--force"),
  });
}

let QUERIES = new Map<string, AudioQuery>();

async function synthVoicevox(j: Job): Promise<Buffer> {
  const id = await speakerId(j);
  let query = (j.kana ? undefined : QUERIES.get(j.key)) as Record<string, unknown> | undefined;
  if (!query) {
    const q = await fetch(`${VV}/audio_query?speaker=${id}&text=${encodeURIComponent(j.text)}`, { method: "POST" });
    if (!q.ok) throw new Error(`audio_query ${q.status}`);
    query = (await q.json()) as Record<string, unknown>;
  }
  const manzai = j.dir.endsWith("manzai") || j.dir.endsWith("tsukkomi");
  if (j.kana) {
    // アクセントつきカナで抑揚を決める（掛け声の「なんでやねん」など）
    const ap = await fetch(`${VV}/accent_phrases?speaker=${id}&is_kana=true&text=${encodeURIComponent(j.kana)}`, { method: "POST" });
    if (!ap.ok) throw new Error(`accent_phrases ${ap.status}`);
    query.accent_phrases = await ap.json();
  }
  query.speedScale = j.rate;
  query.intonationScale = j.intonation ?? (manzai ? 1.25 : 1.12);
  query.prePhonemeLength = manzai ? 0.05 : 0.1;
  query.postPhonemeLength = manzai ? 0.05 : 0.15;
  if ("pauseLengthScale" in query) query.pauseLengthScale = manzai ? 0.9 : 1.1;
  const w = await fetch(`${VV}/synthesis?speaker=${id}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(query) });
  if (!w.ok) throw new Error(`synthesis ${w.status}`);
  const tmp = join(tmpdir(), `vv-${j.key}.wav`);
  const out = join(tmpdir(), `vv-${j.key}.mp3`);
  writeFileSync(tmp, Buffer.from(await w.arrayBuffer()));
  execFileSync(FFMPEG, ["-y", "-loglevel", "error", "-i", tmp, "-ac", "1", "-b:a", "64k", out]);
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
  if (process.argv.includes("--dump-jobs")) {
    console.log(JSON.stringify(jobs.filter(yomiTarget).map((j) => ({ key: j.key, text: j.text, unit: j.unit }))));
    return;
  }
  const todo = jobs.filter((j) => !existsSync(`${j.dir}/${j.key}.mp3`));
  const count = (dir: string) => jobs.filter((j) => j.dir === dir);
  const chars = todo.reduce((n, j) => n + j.text.length, 0);
  console.log(
    `漫才 ${new Set(count(DIRS[0]).map((j) => j.unit)).size} 本・${count(DIRS[0]).length} 行／小説 ${new Set(count(DIRS[1]).map((j) => j.unit)).size} 本・${count(DIRS[1]).length} 段落／名作の朗読 ${count(DIRS[2]).length} 編／ツッコミ ${count(DIRS[3]).length} 本`,
  );
  console.log(`作るのは ${todo.length} 個（約 ${chars.toLocaleString()} 字）`);
  const stale: string[] = [];
  for (const dir of DIRS) {
    const used = new Set(count(dir).map((j) => `${j.key}.mp3`));
    if (existsSync(dir)) for (const f of readdirSync(dir)) if (f.endsWith(".mp3") && !used.has(f)) stale.push(`${dir}/${f}`);
  }
  if (stale.length) console.log(`使われなくなった古い音声 ${stale.length} 個${process.argv.includes("--count") || process.argv.includes("--check") ? "（消すのは本番の実行時）" : "を消します"}`);
  if (process.argv.includes("--count")) return;
  if (process.argv.includes("--check")) {
    await vvSpeakers();
    await finalCheck(jobs);
    return;
  }
  // 先に ffmpeg と VOICEVOX がそろっているか、VOICEVOX 本体の読みが合っているかを確かめてから、古い音声を消す
  if (todo.some((j) => j.voice.startsWith("vv:"))) {
    checkFfmpeg();
    await vvSpeakers();
    QUERIES = await finalCheck(todo);
  }
  for (const f of stale) unlinkSync(f);
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
