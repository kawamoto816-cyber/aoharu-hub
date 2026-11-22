// つまずき図鑑の動画：単元の授業の台本から、動画に使う部分と画面の文を組む（data.json）。make.sh が最初に呼ぶ。
//
//   npx tsx scripts/tsumazuki-video/prepare.ts --unit j-math-2-ichiji-kansu [--cast j-kisaku] [--no 1] [--audio-dir public/audio/jugyo] --out <作業フォルダ>
//
// 選び方（すべてデータから。手で書いた文は入れない）
// - 問題：キャストの台本（lib/jugyo の getLessons）で、ref が "mistake:N" の最初の pause（なければ最初の pause）。
// - 授業の部分：その pause の直前の chapter の頭から、pause のあと最初の talk 1つまで。長すぎるときは、頭のほうのせりふを落とす
//   （動画を約45〜55秒にするため。pause の直前の2せりふは必ず残す）。
// - pause より前の talk の黒板の図（board）と「謎の答え」のカードは外す（答えが先に見えないように）。
//   pause のあとの talk に黒板がなければ、外した最後の図を出す。
// - つかみ：pause の問いの「…」（相方のまちがい）か、lib/lecture の mistakes[N].wrong。
// - きょうのポイント：pause の answer と why。
// 声：talk の音声だけ（public/audio/jugyo/<キー>.mp3。キーは lib/jugyo/audio.ts の jugyoAudio）。問いの読み上げ（ask）と答えの読み上げ（reply）は使わない。
// 音声ファイルがひとつでもなければ、エラーで止める（仮の声では作らない）。キャストを指定しないときは、音声がそろっているキャストを選ぶ。
// 広告の要素は入れない（サービス名・無料・URL・検索・プロフィールへの誘導）。画面の下には声のクレジット（castCredit）だけ。
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { plain } from "@/components/lecture/Rich";
import type { PlayerScene } from "@/components/jugyo/JugyoPlayer";
import { getLessons } from "@/lib/jugyo";
import { castCredit, jugyoAudio, jugyoPauseAudio } from "@/lib/jugyo/audio";
import type { Board, Lesson, PauseScene, TalkScene } from "@/lib/jugyo/types";
import { getLecture } from "@/lib/lecture";
import { unitLabel, unitName } from "@/lib/tsumazuki";

/** 動画の段どり（秒）。record.cjs・compose.py もこの値を使う */
export const TIMING = {
  hook: 2.6, // つかみ
  ask: 1.2, // 「ちょっと待った！」の札
  choices: 2.6, // 選択肢を見せてカチカチ
  answer: 2.6, // 正解を押してから「続きを再生」まで
  tail: 0.6, // 続きのせりふのあと
  tsumazuki: 5.6, // つまずきページのスクロール
  lecture: 5.2, // 図解レクチャーのスクロール
  end: 3.0, // きょうのポイント
  blend: 0.6, // つかみに溶けて戻る
  rate: 1.25, // 再生の速さ（プレイヤーの速度ボタン）
};
const TARGET = 52; // 目標の長さの上限（秒）。録画のずれで少しのびるので 55 より短めに
const MIN_TOTAL = 46;
const MAX_PAD = 6;
const CHAPTER_S = 1.3; // プレイヤーの章の札（CHAPTER_MS）
const DEFAULT_CAST: Record<string, string> = { e: "e-pop", j: "j-kisaku", h: "h-charisma" };

function args() {
  const a = process.argv.slice(2);
  const get = (k: string) => {
    const i = a.indexOf(`--${k}`);
    return i >= 0 ? a[i + 1] : undefined;
  };
  const unit = get("unit");
  const out = get("out");
  if (!unit || !out) throw new Error("使い方: prepare.ts --unit <単元id> [--cast <キャストid>] [--no <連番>] [--audio-dir <dir>] --out <作業フォルダ>");
  return { unit, out: resolve(out), cast: get("cast"), no: Number(get("no") ?? 1), audioDir: resolve(get("audio-dir") ?? "public/audio/jugyo") };
}

const duration = (file: string) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim());

/** 文の終わりの句点・「？」を外す */
const trimEnd = (s: string) => s.trim().replace(/[。．.？?！!]+$/, "");

/** まちがいの文を「前置き」と「言い切り」に分ける（最後の「、」で。どちらかが短すぎれば分けない） */
function splitClaim(s: string): { a: string; b: string } {
  const i = s.lastIndexOf("、");
  if (i >= 4 && s.length - i - 1 >= 4) return { a: s.slice(0, i), b: s.slice(i + 1) };
  return { a: "", b: s };
}

/** 言い切りの中の「まちがいの答え」（「変化の割合は 7」→「7」）。8字をこえたら null */
function shortWrong(b: string): string | null {
  const m = b.match(/(?:は|が)\s*([^はが]{1,8})$/) ?? b.match(/(?:＝|=)\s*([^＝=]{1,8})$/);
  return m ? m[1].trim() : null;
}

const tag = (s: string) => "#" + s.replace(/[^\p{L}\p{N}ー]/gu, "");

interface Pick {
  lesson: Lesson;
  pause: PauseScene;
  scenes: (TalkScene | PauseScene | { kind: "chapter"; title: string })[];
  talks: { scene: TalkScene; key: string; file: string; dur: number }[];
  board: Board | undefined;
}

/** 台本から動画に使う部分を選ぶ（音声がそろっていなければ、足りないファイルを投げる） */
function pickPart(lesson: Lesson, audioDir: string): Pick {
  const sc = lesson.scenes;
  let pi = sc.findIndex((s) => s.kind === "pause" && s.source.startsWith("mistake:"));
  if (pi < 0) pi = sc.findIndex((s) => s.kind === "pause");
  if (pi < 0) throw new Error(`${lesson.unitId} ${lesson.cast.id}: 問題（pause）がない`);
  const pause = sc[pi] as PauseScene;
  let ci = -1;
  for (let k = pi - 1; k >= 0; k--)
    if (sc[k].kind === "chapter") {
      ci = k;
      break;
    }
  const pre = sc.slice(ci + 1, pi).filter((s): s is TalkScene => s.kind === "talk");
  const post = sc.slice(pi + 1).find((s): s is TalkScene => s.kind === "talk");
  const chapter = ci >= 0 ? (sc[ci] as { kind: "chapter"; title: string }) : null;

  const info = (t: TalkScene) => {
    const a = jugyoAudio(t, lesson.cast);
    return { scene: t, key: a.key, file: join(audioDir, `${a.key}.mp3`) };
  };
  const all = [...pre, ...(post ? [post] : [])].map(info);
  const missing = all.filter((x) => !existsSync(x.file));
  if (missing.length) {
    const e = new Error(`${lesson.unitId} ${lesson.cast.id}: 音声ファイルがありません（${missing.length}個）\n` + missing.map((m) => `  ${m.file}  「${plain(m.scene.text).slice(0, 30)}」`).join("\n"));
    (e as Error & { missing: true }).missing = true;
    throw e;
  }
  const withDur = all.map((x) => ({ ...x, dur: duration(x.file) }));
  const say = (d: number) => d / TIMING.rate + 0.2;
  const postT = post ? say(withDur[withDur.length - 1].dur) : 0;
  const fixed = TIMING.hook + CHAPTER_S / TIMING.rate + TIMING.ask + TIMING.choices + TIMING.answer + TIMING.tail + TIMING.tsumazuki + TIMING.lecture + TIMING.end + TIMING.blend;
  // 頭のせりふを、目標の長さに入るまで落とす（pause の直前の2せりふは残す）
  let preT = withDur.slice(0, pre.length);
  while (preT.length > 2 && fixed + postT + preT.reduce((n, x) => n + say(x.dur), 0) > TARGET) preT = preT.slice(1);

  // pause より前の図は外す。最後に外した図は、pause のあとのせりふに図がなければ出す
  let board: Board | undefined;
  for (const t of pre) if (t.board) board = t.board;
  const strip = (t: TalkScene): TalkScene => {
    const { board: _b, card, ...rest } = t;
    void _b;
    return card === "mystery" ? { ...rest, card } : rest;
  };
  const postScene = post && (post.board || post.card ? post : { ...post, board });
  const scenes: Pick["scenes"] = [...(chapter ? [chapter] : []), ...preT.map((x) => strip(x.scene)), pause, ...(postScene ? [postScene] : [])];
  const talks = [...preT, ...(post ? [{ ...withDur[withDur.length - 1], scene: postScene! }] : [])];
  return { lesson, pause, scenes, talks, board: post?.board ?? board };
}

function main() {
  const o = args();
  const lessons = getLessons(o.unit);
  if (!lessons.length) throw new Error(`授業がない単元です: ${o.unit}`);
  const lec = getLecture(o.unit);
  if (!lec) throw new Error(`図解レクチャーがない単元です: ${o.unit}`);
  const stage = o.unit.slice(0, 1);
  const order = o.cast ? lessons.filter((l) => l.cast.id === o.cast) : [...lessons].sort((x, y) => Number(y.cast.id === DEFAULT_CAST[stage]) - Number(x.cast.id === DEFAULT_CAST[stage]));
  if (!order.length) throw new Error(`${o.unit} にキャスト ${o.cast} の授業がありません（${lessons.map((l) => l.cast.id).join("・")}）`);
  let p: Pick | undefined;
  const errors: string[] = [];
  for (const l of order) {
    try {
      p = pickPart(l, o.audioDir);
      break;
    } catch (e) {
      if (!(e as { missing?: boolean }).missing) throw e;
      errors.push((e as Error).message);
    }
  }
  if (!p) throw new Error(errors.join("\n"));
  const { lesson, pause } = p;
  const cast = lesson.cast;
  const credit = castCredit(cast);
  const label = unitLabel(o.unit);
  const name = unitName(o.unit);

  // まちがいの文：問いの中の「…」（相方の言ったこと）か、lecture の mistakes[N].wrong
  const n = pause.source.startsWith("mistake:") ? Number(pause.source.split(":")[1]) : -1;
  const quoted = plain(pause.question).match(/[「『](.+)[」』]。/)?.[1];
  const wrong = n >= 0 ? plain(lec.mistakes[n]?.wrong ?? "") : "";
  const claim = trimEnd(quoted ?? (wrong || plain(pause.question)));
  const { a, b } = splitClaim(claim);
  const sw = shortWrong(b);
  const sub = sw ? `「${sw}」だと思ったら、最後まで見て` : "そう思ったら、最後まで見て";

  // プレイヤーに渡す場面（jugyo のページと同じ形。問題の読み上げの声は使わないので src なし）
  const pa = jugyoPauseAudio(pause, cast);
  // p.scenes の talk の並び ＝ p.talks の並び
  let ti = 0;
  const scenes: PlayerScene[] = p.scenes.map((s) => {
    if (s.kind === "chapter") return s;
    if (s.kind === "pause")
      return { kind: "pause", question: s.question, choices: pa.shown, answer: s.answer, why: s.why, source: s.source, ask: { text: pa.ask.display, speech: pa.ask.text, src: null }, reply: null };
    const key = p.talks[ti++].key;
    return { ...s, speech: jugyoAudio(s, cast).text, src: `/audio/jugyo/${key}.mp3` };
  });
  const answerIndex = pa.shown ? pa.shown.indexOf(pause.answer) : -1;

  // 長さの見積もりが短ければ、後半の画面を少し長く見せる
  const est =
    TIMING.hook + CHAPTER_S / TIMING.rate + p.talks.reduce((s, t) => s + t.dur / TIMING.rate + 0.2, 0) + TIMING.ask + TIMING.choices + TIMING.answer + TIMING.tail + TIMING.tsumazuki + TIMING.lecture + TIMING.end + TIMING.blend;
  const pad = Math.min(MAX_PAD, Math.max(0, MIN_TOTAL - est));
  const timing = { ...TIMING, tsumazuki: TIMING.tsumazuki + pad * 0.4, lecture: TIMING.lecture + pad * 0.4, end: TIMING.end + pad * 0.2 };

  const hookText = `${a ? `${a}、` : ""}${b}？`;
  const stageTag = { e: "#小学生", j: "#中学生", h: "#高校生" }[stage] ?? "";
  const title = [hookText, `${label}「${name}」で、よくあるつまずき。正しいのはどっち？ 答えはコメントで。`, [tag("つまずき図鑑"), tag(label), tag(name), "#勉強", stageTag].filter(Boolean).join(" "), credit].join("\n");

  const data = {
    unit: o.unit,
    cast: cast.id,
    no: o.no,
    slug: `tsumazuki-${o.unit}`,
    // TikTok のキャプションにそのまま使う（最後の行が声のクレジット）。投稿画面は title と description をつなげて出すので、description は空にする
    title,
    description: "",
    credit,
    source: pause.source,
    answerIndex,
    hasChoices: !!pa.shown,
    /** 後半に出す図解レクチャーの節（0から） */
    lectureSection: p.board?.section ?? null,
    /** つまずきページで見せる、まちがいの番号（0から） */
    mistakeIndex: n,
    estimate: Math.round((est + pad) * 10) / 10,
    timing,
    audio: p.talks.map((t) => ({ key: t.key, file: t.file, dur: t.dur })),
    tt: {
      player: {
        unit: o.unit,
        stage: lesson.stage,
        title: lesson.title,
        cast: { id: cast.id, members: { sensei: { name: cast.members.sensei.name, look: cast.members.sensei.look }, seito: { name: cast.members.seito.name, look: cast.members.seito.look } } },
        scenes,
        sections: lec.sections.map((s) => ({ heading: s.heading, body: s.body, figure: s.figure })),
        mission: lec.mission,
        mystery: lec.mystery,
        reveal: lec.sections.find((s) => s.reveal)?.reveal,
        credit,
      },
      header: { kicker: `${label}｜${name}`, a, b },
      hook: { tag: `つまずき図鑑 #${o.no}｜${label}`, a, b, sub },
      end: { answer: trimEnd(plain(pause.answer)), why: plain(pause.why) },
      credit,
    },
  };
  mkdirSync(o.out, { recursive: true });
  writeFileSync(join(o.out, "data.json"), JSON.stringify(data, null, 1));
  console.log(`prepare ok: ${o.unit} ${cast.id} ${pause.source} せりふ${p.talks.length}つ 見積もり${data.estimate}秒`);
}

try {
  main();
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  // 3 = 音声ファイルがない（run.sh はその単元を飛ばして次へ）
  process.exit((e as { missing?: boolean }).missing || /音声ファイルがありません/.test(String(e)) ? 3 : 1);
}
