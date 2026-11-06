// 止まる授業（lib/jugyo）の台本を点検する。
//   npx tsx scripts/check-jugyo.ts
// 1. pause の answer / why が lecture の check・mistakes とそのまま一致するか（mistake は answer = right）。選択肢に答えがあるか
// 2. board の section / figure が lecture にあるか。focus がその図の字の中にあるか（ルビ・{{ }} を外して）
// 3. 台本の数字（半角・全角の数字の並び）が lecture の本文（hook・mystery・mission・body・reading・figure・reveal・cliff・mistakes・check）のどこかにあるか
// 4. 話す字数と目安の分数（1分＝300字）、pause の数。pause の say.choices の数が choices と同じか（say の数字も 3 と同じく点検）
//    中学・高校：1,500〜2,400字・3〜4回。小学校：1,800〜3,000字（10分まで）・4〜7回で、止まる間は2分（600字）まで（最後の問題から終わりまでは3分まで）
// 6. キャスト：単元ごとに、その段階のキャストが全部そろっているか。声が "vv:" か。{seito} が残っていないか
// 5.（警告）要注意語（lib/tts/yomi-watch.ts：方・人・日・今日など文脈で読みが割れる語）が、音声にする文に漢字のまま残り、
//    scripts/jugyo-yomi.json にも正しい読みが無い行。say でその語をひらがなに開くか、jugyo-yomi.json に登録する。
//    （登録がある行で say で開いていない要注意語の数も出す：読みは jugyo-yomi.py と VOICEVOX 本体の点検で確かめる）
// ゼロワンOSユース版（lib/jugyo/uz・UZ_LESSONS）も点検する：事実の照合先は lib/unizeb の図解レクチャー（UZ_LECTURES）、
//    読みは scripts/jugyo-yomi.uz.json。長さは 1,800〜2,400字（6〜8分）・3〜4回止まり、最初に止まるまで2分（600字）以内。
// エラーがあれば終了コード 1。警告では止めない。

import { getLecture } from "../lib/lecture";
import type { Lecture } from "../lib/lecture/types";
import { CHARS_PER_MIN, LESSONS as MAIN_LESSONS, UNITS as MAIN_UNITS, UZ_LESSONS } from "../lib/jugyo";
import { UZ_LECTURES } from "../lib/unizeb";
import { CASTS, castsOfStage, stageOf } from "../lib/jugyo/cast";
import { manzaiSay } from "../lib/tts/manzai";
import { existsSync, readFileSync } from "node:fs";
import { jugyoAudio, jugyoPauseAudio } from "../lib/jugyo/audio";
import { watchWordsIn } from "../lib/tts/yomi-watch";

const LESSONS = [...MAIN_LESSONS, ...UZ_LESSONS];
const UNITS = [...MAIN_UNITS, ...new Set(UZ_LESSONS.map((l) => l.unitId))];
const isUz = (unit: string) => unit.startsWith("unizeb-");
const lectureOf = (unit: string): Lecture | undefined => (isUz(unit) ? UZ_LECTURES.find((l) => l.unit === unit) : getLecture(unit));

const RUBY = /｜([^｜《》\n]+?)《([^《》\n]+?)》|([㐀-鿿々〆ヶ]+)《([^《》\n]+?)》/g;
const plain = (s: string) => s.replace(RUBY, (_a, b1, _r1, b2) => b1 ?? b2).replace(/\{\{|\}\}/g, "");
const half = (s: string) => s.replace(/[０-９．]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
const NUM = /[0-9０-９]+(?:[.．][0-9０-９]+)?/g;

function corpus(lec: Lecture): string {
  const parts: string[] = [lec.title, lec.hook, lec.mystery ?? "", JSON.stringify(lec.mission ?? {})];
  for (const s of lec.sections) parts.push(s.heading, s.body, ...(s.reading ?? []), s.figure ? JSON.stringify(s.figure) : "", s.reveal ?? "", s.cliff ?? "");
  for (const m of lec.mistakes) parts.push(m.wrong, m.right, m.why);
  for (const c of lec.check) parts.push(c.q, c.a, c.why);
  return half(plain(parts.join("\n")));
}

let errors = 0;
const err = (u: string, msg: string) => {
  errors++;
  console.log(`  ✕ ${u}: ${msg}`);
};
let warnings = 0;
let watchedOk = 0;
const warn = (u: string, msg: string) => {
  warnings++;
  console.log(`  △ ${u}: ${msg}`);
};

// 確定した正しい読み（単元 → 字幕の集まり）。字幕はルビを親字にし {{ }} を外したもの（scripts/jugyo-yomi.py と同じ）
const YOMI_JSONS = ["scripts/jugyo-yomi.json", "scripts/jugyo-yomi.uz.json"];
const registered = new Map<string, Set<string>>(
  YOMI_JSONS.flatMap((f) => Object.entries(existsSync(f) ? (JSON.parse(readFileSync(f, "utf8")) as Record<string, { text: string }[]>) : {})).map(([u, es]) => [
    u,
    new Set(es.map((e) => e.text)),
  ]),
);
const label = (s: string) => plain(s).replace(/\s+/g, " ").trim();
/** 要注意語の点検：speech（音声にする文）に要注意語が漢字のまま残り、字幕 caption の正しい読みが未登録なら警告 */
const watch = (u: string, at: string, caption: string, speech: string) => {
  const ws = watchWordsIn(speech);
  if (!ws.length) return;
  if (registered.get(u)?.has(label(caption))) {
    watchedOk += ws.length;
    return;
  }
  warn(u, `${at} 要注意語 ${ws.map((w) => `「${w.word}」(${w.yomi.join("/")})`).join("・")} の読みが決まっていない（say で開くか、jugyo-yomi.json に登録）：${label(caption).slice(0, 30)}…`);
};

/** 段階ごとの長さと止まる回数の決まり（gap = 止まる間の最大字数、tail = 最後の問題から終わりまで） */
const RULE = {
  e: { chars: [1800, 3000], pauses: [4, 7], gap: 2 * CHARS_PER_MIN, tail: 3 * CHARS_PER_MIN },
  j: { chars: [1500, 2400], pauses: [3, 4], gap: Infinity, tail: Infinity },
  h: { chars: [1500, 2400], pauses: [3, 4], gap: Infinity, tail: Infinity },
} as const;
const UZ_RULE = { chars: [1800, 2400], pauses: [3, 4], gap: Infinity, tail: Infinity } as const;
const UZ_FIRST = 2 * CHARS_PER_MIN;

for (const c of CASTS)
  for (const w of ["sensei", "seito"] as const)
    if (!c.members[w].voice.startsWith("vv:")) err(c.id, `${w} の声 ${c.members[w].voice} が VOICEVOX（vv:）でない`);
for (const unit of UNITS)
  for (const c of castsOfStage(stageOf(unit)))
    if (!LESSONS.some((l) => l.unitId === unit && l.cast.id === c.id)) err(unit, `キャスト ${c.id}（${c.name}）の台本がない`);

const summary: string[] = [];
for (const lesson of LESSONS) {
  const unit = lesson.unitId;
  const u = `${unit} × ${lesson.cast.id}`;
  const lec = lectureOf(unit);
  const rule = isUz(unit) ? UZ_RULE : RULE[lesson.stage];
  console.log(`■ ${u}（${lesson.cast.label} ${lesson.cast.name}）「${plain(lesson.title)}」`);
  if (!lec) {
    err(u, "lecture がない");
    continue;
  }
  const text = corpus(lec);
  // 数字は「前後が数字でない」形で探す（"20" が "200" の一部として通らないように）
  const hasNum = (n: string) => new RegExp(`(^|[^0-9.])${n.replace(".", "\\.")}($|[^0-9]|\\.(?![0-9]))`).test(text);
  let chars = 0;
  let pauses = 0;
  let talks = 0;
  const minutesAt: string[] = [];
  let lastPauseAt = 0;
  lesson.scenes.forEach((sc, i) => {
    const at = `#${i}`;
    if (sc.kind === "talk") {
      talks++;
      watch(unit, `${lesson.cast.id} ${at}`, sc.text, jugyoAudio(sc, lesson.cast).text);
      chars += manzaiSay(sc).length;
      for (const src of [sc.text, sc.say ?? ""])
        for (const m of half(plain(src)).match(NUM) ?? []) if (!hasNum(m)) err(u, `${at} 数字「${m}」が lecture の本文にない：${plain(src).slice(0, 40)}…`);
      if (sc.board) {
        const s = lec.sections[sc.board.section];
        if (!s) err(u, `${at} board.section ${sc.board.section} がない（節は ${lec.sections.length} 個）`);
        else {
          const f = sc.board.figure ?? 0;
          if (f !== 0 || (!s.figure && sc.board.figure !== undefined)) err(u, `${at} board.figure ${f} がない（節 ${sc.board.section} の図は ${s.figure ? 1 : 0} 個）`);
          if (sc.board.focus) {
            if (!s.figure) err(u, `${at} focus「${sc.board.focus}」：節 ${sc.board.section} に図がない`);
            else if (!plain(JSON.stringify(s.figure)).replace(/\s+/g, "").includes(sc.board.focus.replace(/\s+/g, "")))
              err(u, `${at} focus「${sc.board.focus}」が節 ${sc.board.section} の図の字にない`);
          }
        }
      }
    } else if (sc.kind === "pause") {
      pauses++;
      const qa = jugyoPauseAudio(sc, lesson.cast);
      for (const a of [qa.ask, qa.reply]) if (a) watch(unit, `${lesson.cast.id} ${at}（問題の読み上げ）`, a.display, a.text);
      if (sc.question.includes("{seito}") || sc.say?.question?.includes("{seito}")) err(u, `${at} 問いに {seito} が残っている`);
      minutesAt.push((chars / CHARS_PER_MIN).toFixed(1));
      if (isUz(unit) && pauses === 1 && chars > UZ_FIRST) err(u, `${at} 最初に止まるまで ${(chars / CHARS_PER_MIN).toFixed(1)} 分（2分までに）`);
      if (chars - lastPauseAt > rule.gap) err(u, `${at} 前に止まってから ${((chars - lastPauseAt) / CHARS_PER_MIN).toFixed(1)} 分（${rule.gap / CHARS_PER_MIN}分までに1回止まる）`);
      lastPauseAt = chars;
      const [kind, n] = sc.source.split(":");
      const i2 = Number(n);
      if (kind === "check") {
        const c = lec.check[i2];
        if (!c) err(u, `${at} ${sc.source} がない`);
        else {
          if (sc.answer !== c.a) err(u, `${at} answer が check[${i2}].a と違う：「${sc.answer}」≠「${c.a}」`);
          if (sc.why !== c.why) err(u, `${at} why が check[${i2}].why と違う`);
        }
      } else {
        const m = lec.mistakes[i2];
        if (!m) err(u, `${at} ${sc.source} がない`);
        else {
          if (sc.answer !== m.right) err(u, `${at} answer が mistakes[${i2}].right と違う：「${sc.answer}」≠「${m.right}」`);
          if (sc.why !== m.why) err(u, `${at} why が mistakes[${i2}].why と違う`);
          if (sc.choices && !sc.choices.includes(m.wrong)) err(u, `${at} 選択肢に mistakes[${i2}].wrong がない`);
        }
      }
      if (sc.choices && !sc.choices.includes(sc.answer)) err(u, `${at} 選択肢に答えがない`);
      if (sc.say?.choices && sc.say.choices.length !== (sc.choices?.length ?? 0)) err(u, `${at} say.choices の数が choices と違う`);
      const sayParts = sc.say ? [sc.say.question ?? "", ...(sc.say.choices ?? []), sc.say.answer ?? "", sc.say.why ?? ""] : [];
      for (const src of [sc.question, ...(sc.choices ?? []), ...sayParts])
        for (const m of half(plain(src)).match(NUM) ?? []) if (!hasNum(m)) err(u, `${at} 数字「${m}」が lecture の本文にない：${plain(src).slice(0, 40)}…`);
    }
  });
  if (pauses < rule.pauses[0] || pauses > rule.pauses[1]) err(u, `pause が ${pauses} 回（${rule.pauses[0]}〜${rule.pauses[1]}回に）`);
  if (chars - lastPauseAt > rule.tail) err(u, `最後の問題から終わりまで ${((chars - lastPauseAt) / CHARS_PER_MIN).toFixed(1)} 分（${rule.tail / CHARS_PER_MIN}分までに）`);
  const min = chars / CHARS_PER_MIN;
  if (chars < rule.chars[0] || chars > rule.chars[1]) err(u, `話す字数 ${chars} 字（${rule.chars[0].toLocaleString()}〜${rule.chars[1].toLocaleString()}字に）`);
  const line = `せりふ ${talks}・話す字数 ${chars.toLocaleString()} 字・目安 ${min.toFixed(1)} 分・止まる ${pauses} 回（${minutesAt.map((m) => `${m}分`).join("・")}ごろ）`;
  console.log(`  ${line}`);
  summary.push(`${u.padEnd(34)} ${line}`);
}

console.log(`\n${summary.join("\n")}`);

console.log(`\n要注意語の警告 ${warnings} 件（読みが登録ずみの行の要注意語 ${watchedOk} 語は jugyo-yomi.py・VOICEVOX 本体の点検で確かめる）`);
console.log(errors ? `エラー ${errors} 件` : "エラー 0 件");
if (errors) process.exit(1);
