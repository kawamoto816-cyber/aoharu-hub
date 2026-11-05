// 止まる授業（lib/jugyo）の先生と生徒の声を、1せりふずつ mp3 にする。手元のパソコンで動かす（scripts/manzai-tts.ts と同じ作り）。
// 声は VOICEVOX（アプリを起動しておく。http://localhost:50021 で待ち受ける）。mp3 への変換は ffmpeg（なければ npm install で入る ffmpeg-static）。
// せりふ（talk）と「ここで問題」の読み上げ（pause の問いと選択肢・答えとわけ）。先生＝青山龍星・生徒＝四国めたん（lib/jugyo/audio.ts）。画面には「VOICEVOX:青山龍星・四国めたん」と出す。
//
//   数をたしかめる:  npx tsx scripts/jugyo-tts.ts --count
//   全部作る:        npx tsx scripts/jugyo-tts.ts
//     → public/audio/jugyo/<キー>.mp3（キーは 声・速さ・読む文 から。lib/jugyo/audio.ts の jugyoAudio）
//     すでにあるファイルは作り直さない。台本を直したら、同じコマンドで足りない分だけ作る。
//     もう使われなくなった古い音声ファイルは消す（台本を直す前の文など）。
//   作ったら git に入れて公開する。ファイルがあるせりふはその声で、無いせりふはブラウザの「仮の声」で再生される。
//
//   読みの最終点検（scripts/vv-yomi.ts）：作る前に、scripts/voicevox-dict.json を VOICEVOX のユーザー辞書に登録し、
//     作るせりふを VOICEVOX 本体に読ませて、確定した正しい読み（scripts/jugyo-yomi.json）とくらべる。
//     食いちがい・正しい読みが未登録の行があれば一覧を出して止まる。まちがいでなければ  --force  をつけて続ける。
//   読みだけ点検する（全せりふ・音声は作らない）:  npx tsx scripts/jugyo-tts.ts --check

import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { LESSONS } from "../lib/jugyo";
import { jugyoAudio, jugyoPauseAudio } from "../lib/jugyo/audio";
import { VV, checkYomi, registerUserDict, type AudioQuery } from "./vv-yomi";

/** label = 字幕（ルビは親字・{{ }} を外す）。scripts/jugyo-yomi.json の "text" と同じ形 */
type Job = { key: string; text: string; voice: string; rate: number; unit: string; label: string; scene: number };

const RUBY = /｜([^｜《》\n]+?)《([^《》\n]+?)》|([㐀-鿿々〆ヶ]+)《([^《》\n]+?)》/g;
const plain = (s: string) => s.replace(RUBY, (_a, b1, _r1, b2) => b1 ?? b2).replace(/\{\{|\}\}/g, "").replace(/\s+/g, " ").trim();
const YOMI_JSON = "scripts/jugyo-yomi.json";

const DIR = "public/audio/jugyo";

function collect(): Job[] {
  const jobs = new Map<string, Job>();
  for (const l of LESSONS)
    l.scenes.forEach((sc, i) => {
      if (sc.kind === "pause") {
        // 「ここで問題」の読み上げ（問いと選択肢・答えとわけ。先生の声）
        const q = jugyoPauseAudio(sc);
        for (const a of [q.ask, q.reply])
          if (a) jobs.set(a.key, { key: a.key, text: a.text, voice: a.voice, rate: a.rate, unit: l.unitId, label: plain(a.display), scene: i });
        return;
      }
      if (sc.kind !== "talk") return;
      const a = jugyoAudio(sc);
      jobs.set(a.key, { key: a.key, text: a.text, voice: a.voice, rate: a.rate, unit: l.unitId, label: plain(sc.text), scene: i });
    });
  return [...jobs.values()];
}

// ── VOICEVOX ──
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

/** 確定した正しい読み（scripts/jugyo-yomi.json：単元 → [{ text: 字幕, yomi }]） */
function wantYomi(): (j: Job) => string | undefined {
  const data = existsSync(YOMI_JSON) ? (JSON.parse(readFileSync(YOMI_JSON, "utf8")) as Record<string, { text: string; yomi: string }[]>) : {};
  const table = new Map(Object.entries(data).flatMap(([u, es]) => es.map((e) => [`${u}\n${e.text}`, e.yomi] as const)));
  return (j) => table.get(`${j.unit}\n${j.label}`);
}

/** VOICEVOX 本体の読みでの最終点検（止まるときはここで終わる）。キー → audio_query */
async function finalCheck(list: Job[]): Promise<Map<string, AudioQuery>> {
  await registerUserDict();
  const want = wantYomi();
  const jobs = [];
  const ids = new Map<string, number>();
  for (const j of new Set(list.map((j) => j.voice)))
    try {
      ids.set(j, await speakerId({ voice: j } as Job));
    } catch (e) {
      console.error((e as Error).message);
      process.exit(1);
    }
  for (const j of list)
    jobs.push({ key: j.key, text: j.text, speaker: ids.get(j.voice)!, label: `${j.unit} #${j.scene}「${j.label.slice(0, 30)}」`, want: want(j) });
  return checkYomi(jobs, {
    expectFile: YOMI_JSON,
    howToFix: "未登録の行は、Claude の環境で python3 scripts/jugyo-yomi.py --draft から読みを確かめて登録する",
    force: process.argv.includes("--force"),
  });
}

let QUERIES = new Map<string, AudioQuery>();

async function synth(j: Job): Promise<Buffer> {
  const id = await speakerId(j);
  let query = QUERIES.get(j.key) as Record<string, unknown> | undefined;
  if (!query) {
    const q = await fetch(`${VV}/audio_query?speaker=${id}&text=${encodeURIComponent(j.text)}`, { method: "POST" });
    if (!q.ok) throw new Error(`audio_query ${q.status}`);
    query = (await q.json()) as Record<string, unknown>;
  }
  // 授業の声：漫才より抑揚をおさえ、文の前後に少し間をとる
  query.speedScale = j.rate;
  query.intonationScale = 1.12;
  query.prePhonemeLength = 0.1;
  query.postPhonemeLength = 0.15;
  if ("pauseLengthScale" in query) query.pauseLengthScale = 1.05;
  const w = await fetch(`${VV}/synthesis?speaker=${id}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(query) });
  if (!w.ok) throw new Error(`synthesis ${w.status}`);
  const tmp = join(tmpdir(), `jg-${j.key}.wav`);
  const out = join(tmpdir(), `jg-${j.key}.mp3`);
  writeFileSync(tmp, Buffer.from(await w.arrayBuffer()));
  execFileSync(FFMPEG, ["-y", "-loglevel", "error", "-i", tmp, "-ac", "1", "-b:a", "64k", out]);
  const buf = readFileSync(out);
  unlinkSync(tmp);
  unlinkSync(out);
  return buf;
}

async function main() {
  const jobs = collect();
  const todo = jobs.filter((j) => !existsSync(`${DIR}/${j.key}.mp3`));
  const chars = todo.reduce((n, j) => n + j.text.length, 0);
  console.log(`授業 ${LESSONS.length} 本・${jobs.length} せりふ`);
  console.log(`作るのは ${todo.length} 個（約 ${chars.toLocaleString()} 字）`);
  const used = new Set(jobs.map((j) => `${j.key}.mp3`));
  const stale = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".mp3") && !used.has(f)) : [];
  if (stale.length) console.log(`使われなくなった古い音声 ${stale.length} 個${process.argv.includes("--count") || process.argv.includes("--check") ? "（消すのは本番の実行時）" : "を消します"}`);
  if (process.argv.includes("--count")) return;
  if (process.argv.includes("--check")) {
    await vvSpeakers();
    await finalCheck(jobs);
    return;
  }
  if (todo.length) {
    checkFfmpeg();
    await vvSpeakers();
    // 古い音声を消す前・作る前に、VOICEVOX 本体の読みで点検する
    QUERIES = await finalCheck(todo);
  }
  for (const f of stale) unlinkSync(`${DIR}/${f}`);
  mkdirSync(DIR, { recursive: true });
  let next = 0;
  let done = 0;
  const failed: string[] = [];
  async function worker() {
    while (next < todo.length) {
      const j = todo[next++];
      try {
        writeFileSync(`${DIR}/${j.key}.mp3`, await synth(j));
      } catch (e) {
        failed.push(`${j.unit}: ${j.text.slice(0, 20)}… ${(e as Error).message}`);
      }
      if (++done % 20 === 0) console.log(`  ${done} / ${todo.length}`);
    }
  }
  await Promise.all(Array.from({ length: 3 }, worker));
  console.log(`できました: ${done - failed.length} 個${failed.length ? `・失敗 ${failed.length} 個` : ""}`);
  for (const f of failed) console.log("  ×", f);
  if (failed.length) process.exit(1);
}

main();
