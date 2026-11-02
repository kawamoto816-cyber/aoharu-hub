// 日本語の読み上げの「聞きくらべ」用サンプルを作る。手元のパソコンで動かす。
//
//   npx tsx scripts/tts-sample.ts
//     → ~/Downloads/aoharu-tts-sample/ に、同じ文を3つの方法で読んだ mp3 ができる
//       A_chirp3_*.mp3   … いまの声（Google Chirp 3: HD）
//       B_gemini_*.mp3   … Google Gemini-TTS（同じ API キー。語り方を日本語の指示で決められる）
//       C_voicevox_*.mp3 … VOICEVOX（無料のソフト。アプリを起動しているときだけ作る）
//
// API キーは .env.local の GOOGLE_TTS_API_KEY（画面には出さない）。
// VOICEVOX は https://voicevox.hiroshiba.jp/ から入れて起動しておく（http://localhost:50021 で待ち受ける）。
// 公開で使うときは「VOICEVOX:キャラ名」のクレジット表記が要る（キャラごとの規約も読む）。

import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { homedir } from "node:os";
import { join } from "node:path";
import { LECTURES } from "../lib/lecture";
import { manzaiSpeech, novelSpeech } from "../lib/tts/yomi";

const OUT = join(homedir(), "Downloads", "aoharu-tts-sample");

function apiKey(): string {
  if (process.env.GOOGLE_TTS_API_KEY) return process.env.GOOGLE_TTS_API_KEY;
  const m = existsSync(".env.local") && readFileSync(".env.local", "utf8").match(/^GOOGLE_TTS_API_KEY=\s*"?([^"\n]+)"?/m);
  if (m) return m[1].trim();
  console.error(".env.local に GOOGLE_TTS_API_KEY=... を書いてから動かしてください。");
  process.exit(1);
}

type Sample = { id: string; kind: "novel" | "boke" | "tsukkomi"; text: string };

function samples(): Sample[] {
  const out: Sample[] = [];
  const novel = LECTURES.find((l) => l.unit === "j-ja-2-tanka")?.story;
  if (novel?.kind === "novel") out.push({ id: "novel1", kind: "novel", text: novelSpeech(novel.paragraphs[0], novel.sayFix, novel.say?.[0]) });
  const novel2 = LECTURES.find((l) => l.unit === "j-soc-hist-kamakura")?.story;
  if (novel2?.kind === "novel") out.push({ id: "novel2", kind: "novel", text: novelSpeech(novel2.paragraphs[1], novel2.sayFix, novel2.say?.[1]) });
  const mz = LECTURES.find((l) => l.unit === "j-ja-3-goi")?.story;
  if (mz?.kind === "manzai")
    mz.lines.slice(0, 6).forEach((l, i) => out.push({ id: `manzai${i + 1}`, kind: l.who === mz.cast[1] ? "tsukkomi" : "boke", text: manzaiSpeech(l) }));
  return out;
}

async function post(url: string, body: unknown): Promise<Response> {
  return fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
}

// A：いまの声
const CHIRP = { novel: "Sulafat", boke: "Puck", tsukkomi: "Leda" } as const;
async function chirp(key: string, s: Sample): Promise<Buffer> {
  const r = await post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(key)}`, {
    input: { text: s.text },
    voice: { languageCode: "ja-JP", name: `ja-JP-Chirp3-HD-${CHIRP[s.kind]}` },
    audioConfig: { audioEncoding: "MP3", speakingRate: s.kind === "novel" ? 1.0 : 1.1 },
  });
  if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 200)}`);
  return Buffer.from(((await r.json()) as { audioContent: string }).audioContent, "base64");
}

// B：Gemini-TTS（語り方を指示文で決める）
const GEMINI = {
  novel: { voice: "Sulafat", prompt: "日本語の朗読のプロとして、物語の語り手らしく、落ち着いたあたたかい声で読んでください。標準語の自然なアクセントで、句読点では少し間を取り、場面の空気が伝わるように、会話の部分は登場人物の気持ちをこめて読んでください。" },
  boke: { voice: "Puck", prompt: "日本語の漫才のボケ役として、明るく元気に、とぼけた調子でテンポよく話してください。標準語の自然なアクセントで、本当に舞台で話しているように。" },
  tsukkomi: { voice: "Leda", prompt: "日本語の漫才のツッコミ役として、はきはきと勢いよく、間髪いれずにツッコむ調子で話してください。標準語の自然なアクセントで、本当に舞台で話しているように。" },
} as const;
const GEMINI_MODEL = process.env.GEMINI_TTS_MODEL ?? "gemini-2.5-pro-tts";
async function gemini(key: string, s: Sample): Promise<Buffer> {
  const g = GEMINI[s.kind];
  const r = await post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(key)}`, {
    input: { prompt: g.prompt, text: s.text },
    voice: { languageCode: "ja-JP", name: g.voice, modelName: GEMINI_MODEL },
    audioConfig: { audioEncoding: "MP3" },
  });
  if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 300)}`);
  return Buffer.from(((await r.json()) as { audioContent: string }).audioContent, "base64");
}

// C：VOICEVOX（手元で起動しているとき）
const VV = "http://localhost:50021";
const VV_WANT = { novel: ["青山龍星", "冥鳴ひまり"], boke: ["玄野武宏", "ずんだもん"], tsukkomi: ["春日部つむぎ", "四国めたん"] } as const;
async function vvSpeakers(): Promise<Map<string, number> | null> {
  try {
    const r = await fetch(`${VV}/speakers`);
    if (!r.ok) return null;
    const list = (await r.json()) as { name: string; styles: { name: string; id: number }[] }[];
    const m = new Map<string, number>();
    for (const sp of list) m.set(sp.name, (sp.styles.find((st) => st.name === "ノーマル") ?? sp.styles[0]).id);
    return m;
  } catch {
    return null;
  }
}
async function voicevox(id: number, s: Sample): Promise<Buffer> {
  const q = await fetch(`${VV}/audio_query?speaker=${id}&text=${encodeURIComponent(s.text)}`, { method: "POST" });
  const query = (await q.json()) as Record<string, number>;
  query.speedScale = s.kind === "novel" ? 1.0 : 1.12;
  query.intonationScale = s.kind === "novel" ? 1.1 : 1.25;
  const w = await post(`${VV}/synthesis?speaker=${id}`, query);
  if (!w.ok) throw new Error(`${w.status}`);
  return Buffer.from(await w.arrayBuffer());
}

function toMp3(wav: Buffer, file: string) {
  const tmp = file.replace(/\.mp3$/, ".wav");
  writeFileSync(tmp, wav);
  try {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", tmp, "-b:a", "96k", file]);
    unlinkSync(tmp);
  } catch {
    console.log(`  （ffmpeg がないので wav のまま：${tmp}）`);
  }
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const key = apiKey();
  const list = samples();
  const vv = await vvSpeakers();
  for (const s of list) {
    console.log(`- ${s.id}：${s.text.slice(0, 30)}…`);
    try {
      writeFileSync(join(OUT, `A_chirp3_${s.id}.mp3`), await chirp(key, s));
    } catch (e) {
      console.log("  A 失敗", (e as Error).message);
    }
    try {
      writeFileSync(join(OUT, `B_gemini_${s.id}.mp3`), await gemini(key, s));
    } catch (e) {
      console.log("  B（Gemini-TTS）失敗", (e as Error).message);
    }
    if (vv) {
      for (const name of VV_WANT[s.kind]) {
        const id = vv.get(name);
        if (id === undefined) continue;
        try {
          toMp3(await voicevox(id, s), join(OUT, `C_voicevox_${name}_${s.id}.mp3`));
        } catch (e) {
          console.log(`  C（${name}）失敗`, (e as Error).message);
        }
      }
    }
  }
  if (!vv) console.log("VOICEVOX は起動していなかったので、C は作っていません（アプリを起動してからもう一度動かすと作れます）。");
  console.log(`できました：${OUT}`);
}

main();
