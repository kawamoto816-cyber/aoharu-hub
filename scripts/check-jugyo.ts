// 止まる授業（lib/jugyo）の台本を点検する。
//   npx tsx scripts/check-jugyo.ts
// 1. pause の answer / why が lecture の check・mistakes とそのまま一致するか（mistake は answer = right）。選択肢に答えがあるか
// 2. board の section / figure が lecture にあるか。focus がその図の字の中にあるか（ルビ・{{ }} を外して）
// 3. 台本の数字（半角・全角の数字の並び）が lecture の本文（hook・mystery・mission・body・reading・figure・reveal・cliff・mistakes・check）のどこかにあるか
// 4. 話す字数と目安の分数（1分＝300字）、pause の数（3〜4）
// エラーがあれば終了コード 1。

import { getLecture } from "../lib/lecture";
import type { Lecture } from "../lib/lecture/types";
import { CHARS_PER_MIN, LESSONS } from "../lib/jugyo";
import { manzaiSay } from "../lib/tts/manzai";

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

for (const lesson of LESSONS) {
  const u = lesson.unitId;
  const lec = getLecture(u);
  console.log(`■ ${u}「${plain(lesson.title)}」`);
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
  lesson.scenes.forEach((sc, i) => {
    const at = `#${i}`;
    if (sc.kind === "talk") {
      talks++;
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
      minutesAt.push((chars / CHARS_PER_MIN).toFixed(1));
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
      for (const src of [sc.question, ...(sc.choices ?? [])])
        for (const m of half(plain(src)).match(NUM) ?? []) if (!hasNum(m)) err(u, `${at} 数字「${m}」が lecture の本文にない：${plain(src).slice(0, 40)}…`);
    }
  });
  if (pauses < 3 || pauses > 4) err(u, `pause が ${pauses} 回（3〜4回に）`);
  const min = chars / CHARS_PER_MIN;
  if (chars < 1500 || chars > 2400) err(u, `話す字数 ${chars} 字（1,500〜2,400字に）`);
  console.log(`  せりふ ${talks}・話す字数 ${chars.toLocaleString()} 字・目安 ${min.toFixed(1)} 分・止まる ${pauses} 回（${minutesAt.map((m) => `${m}分`).join("・")}ごろ）`);
}

console.log(errors ? `\nエラー ${errors} 件` : "\nエラー 0 件");
if (errors) process.exit(1);
