// 止まる授業（lib/jugyo）の先生と生徒の声を、1せりふずつ mp3 にする。手元のパソコンで動かす（scripts/manzai-tts.ts と同じ作り）。
// 声は VOICEVOX（アプリを起動しておく。http://localhost:50021 で待ち受ける）。mp3 への変換は ffmpeg（なければ npm install で入る ffmpeg-static）。
// 先生＝青山龍星・生徒＝四国めたん（lib/jugyo/audio.ts）。画面には「VOICEVOX:青山龍星・四国めたん」と出す。
//
//   数をたしかめる:  npx tsx scripts/jugyo-tts.ts --count
//   全部作る:        npx tsx scripts/jugyo-tts.ts
//     → public/audio/jugyo/<キー>.mp3（キーは 声・速さ・読む文 から。lib/jugyo/audio.ts の jugyoAudio）
//     すでにあるファイルは作り直さない。台本を直したら、同じコマンドで足りない分だけ作る。
//     もう使われなくなった古い音声ファイルは消す（台本を直す前の文など）。
//   作ったら git に入れて公開する。ファイルがあるせりふはその声で、無いせりふはブラウザの「仮の声」で再生される。

import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { LESSONS } from "../lib/jugyo";
import { jugyoAudio } from "../lib/jugyo/audio";

type Job = { key: string; text: string; voice: string; rate: number; unit: string };

const DIR = "public/audio/jugyo";

function collect(): Job[] {
  const jobs = new Map<string, Job>();
  for (const l of LESSONS)
    for (const sc of l.scenes) {
      if (sc.kind !== "talk") continue;
      const a = jugyoAudio(sc);
      jobs.set(a.key, { key: a.key, text: a.text, voice: a.voice, rate: a.rate, unit: l.unitId });
    }
  return [...jobs.values()];
}

// ── VOICEVOX ──
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

async function synth(j: Job): Promise<Buffer> {
  const name = j.voice.slice(3);
  const id = (await vvSpeakers()).get(name);
  if (id === undefined) throw new Error(`VOICEVOX に「${name}」の声が入っていません（アプリの「キャラクター」から追加してください）`);
  const q = await fetch(`${VV}/audio_query?speaker=${id}&text=${encodeURIComponent(j.text)}`, { method: "POST" });
  if (!q.ok) throw new Error(`audio_query ${q.status}`);
  const query = (await q.json()) as Record<string, unknown>;
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
  if (stale.length) console.log(`使われなくなった古い音声 ${stale.length} 個${process.argv.includes("--count") ? "（消すのは本番の実行時）" : "を消します"}`);
  if (process.argv.includes("--count")) return;
  if (todo.length) {
    checkFfmpeg();
    await vvSpeakers();
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
