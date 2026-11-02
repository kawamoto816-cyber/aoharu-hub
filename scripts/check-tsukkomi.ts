// ツッコミ学習法のデータと採点の確認。  npx tsx scripts/check-tsukkomi.ts
// 全問の tokens・wrongIndex・正解の位置・理由の位置・読み上げ文の整合と、採点関数のふるまいを確かめる。
// まちがいがあれば一覧を出して終了コード 1。

import { TSUKKOMI } from "../lib/tsukkomi";
import { rightSentence } from "../lib/tsukkomi/define";
import { POINTS, ROUND_SIZE, TIME_LIMIT, pickRound, roundTotal, scoreAnswer, titleOf } from "../lib/tsukkomi/score";
import { tsukkomiAudio } from "../lib/tsukkomi/audio";
import { hasLecture } from "../lib/lecture";
import type { Boke } from "../lib/tsukkomi/types";

const errors: string[] = [];
const err = (b: Boke | string, msg: string) => errors.push(`${typeof b === "string" ? b : `${b.unit} ${b.id}`}: ${msg}`);

const ids = new Set<string>();
let total = 0;
let suruTotal = 0;
for (const [unit, list] of Object.entries(TSUKKOMI)) {
  if (!hasLecture(unit)) err(unit, "図解レクチャーがない単元");
  if (list.length < 8 || list.length > 10) err(unit, `問題数が ${list.length}（8〜10問にする）`);
  const suru = list.filter((b) => b.wrongIndex === null).length;
  if (suru < 1 || suru > 3) err(unit, `スルー問題が ${suru}（1〜3問にする）`);
  total += list.length;
  suruTotal += suru;
  for (const b of list) {
    if (b.unit !== unit) err(b, `unit が ${b.unit}（登録先は ${unit}）`);
    if (ids.has(b.id)) err(b, "id が重複");
    ids.add(b.id);
    if (b.tokens.length < 4 || b.tokens.length > 7) err(b, `tokens が ${b.tokens.length} 個（意味のある語句 4〜7 個に区切る）`);
    if (b.tokens.some((t) => !t.trim())) err(b, "空の token がある");
    if (new Set(b.tokens).size !== b.tokens.length) err(b, "同じ token が2つある（どれをタップしたか区別できない）");
    if (/\{\{|\}\}|《|》/.test(b.tokens.join(""))) err(b, "tokens に強調・ルビの記号が残っている");
    const sentence = b.tokens.join("");
    if (!/[。]$/.test(sentence)) err(b, `文が「。」で終わっていない：${sentence}`);
    if (!b.say.boke.trim() || !b.say.tsukkomi.trim()) err(b, "say が空");
    if (!b.explain.why.trim()) err(b, "explain.why が空");

    if (b.wrongIndex === null) {
      // スルー問題
      if (b.options) err(b, "スルー問題に options がある");
      if (b.reasons) err(b, "スルー問題に reasons がある");
      if (b.explain.right !== sentence) err(b, "スルー問題の explain.right が tokens と一致しない");
      continue;
    }
    if (!Number.isInteger(b.wrongIndex) || b.wrongIndex < 0 || b.wrongIndex >= b.tokens.length) {
      err(b, `wrongIndex ${b.wrongIndex} が tokens（${b.tokens.length}個）の範囲外`);
      continue;
    }
    const wrongToken = b.tokens[b.wrongIndex];
    if (!b.options) err(b, "options がない");
    else {
      const { choices, answer } = b.options;
      if (choices.length !== 4) err(b, `options が ${choices.length} 個（4択にする）`);
      if (!Number.isInteger(answer) || answer < 0 || answer >= choices.length) err(b, `options.answer ${answer} が範囲外`);
      if (new Set(choices).size !== choices.length) err(b, "options に同じ選択肢がある");
      if (choices.includes(wrongToken)) err(b, `options にまちがいの語句「${wrongToken}」がそのまま入っている`);
      if (choices.some((c) => !c.trim())) err(b, "空の選択肢がある");
      const right = rightSentence(b.tokens, b.wrongIndex, choices[answer]);
      if (b.explain.right !== right) err(b, `explain.right が正解の文と一致しない：${b.explain.right} / ${right}`);
      if (right === sentence) err(b, "正解に置きかえても文が変わらない");
    }
    if (!b.reasons) err(b, "reasons がない（上級モードで使う）");
    else {
      const { choices, answer } = b.reasons;
      if (choices.length !== 3) err(b, `reasons が ${choices.length} 個（3択にする）`);
      if (!Number.isInteger(answer) || answer < 0 || answer >= choices.length) err(b, `reasons.answer ${answer} が範囲外`);
      if (new Set(choices).size !== choices.length) err(b, "reasons に同じ選択肢がある");
    }
    const a = tsukkomiAudio(b);
    if (!a.boke.src.startsWith("/audio/tsukkomi/") || a.boke.key === a.tsukkomi.key) err(b, "音声ファイルの場所がおかしい");
  }
}

// 正解の位置がかたよっていないか（全部 0 番などになっていないか）
const pos = [0, 0, 0, 0];
for (const list of Object.values(TSUKKOMI)) for (const b of list) if (b.options) pos[b.options.answer]++;
if (Math.max(...pos) > (total - suruTotal) * 0.5) err("全体", `4択の正解の位置がかたよっている ${pos.join("/")}`);

// ── 採点関数のふるまい ──
const all = Object.values(TSUKKOMI).flat();
const boke = all.find((b) => b.wrongIndex !== null && b.level === 1)!;
const suru = all.find((b) => b.wrongIndex === null && b.level === 1)!;
const w = boke.wrongIndex!;
const ok = boke.options!.answer;
const ng = (ok + 1) % 4;
const expect = (name: string, got: unknown, want: unknown) => {
  if (got !== want) err("採点", `${name}：${String(got)}（期待 ${String(want)}）`);
};
const lim = TIME_LIMIT.normal;
expect("即答・連続なし", scoreAnswer(boke, "normal", { type: "tsukkomi", tapped: w, choice: ok }, 0, 0).points, POINTS.base + POINTS.speed);
expect("時間ぎりぎり", scoreAnswer(boke, "normal", { type: "tsukkomi", tapped: w, choice: ok }, lim, 0).points, POINTS.base);
expect("連続3問目", scoreAnswer(boke, "normal", { type: "tsukkomi", tapped: w, choice: ok }, lim, 2).breakdown.streak, POINTS.streak * 2);
expect("連続ボーナスの上限", scoreAnswer(boke, "normal", { type: "tsukkomi", tapped: w, choice: ok }, lim, 99).breakdown.streak, POINTS.streakMax);
expect("場所ちがい", scoreAnswer(boke, "normal", { type: "tsukkomi", tapped: (w + 1) % boke.tokens.length, choice: null }, 1000, 0).kind, "miss");
expect("語句ちがい", scoreAnswer(boke, "normal", { type: "tsukkomi", tapped: w, choice: ng }, 1000, 0).kind, "partial");
expect("ボケをスルー", scoreAnswer(boke, "normal", { type: "through" }, 1000, 0).kind, "miss");
expect("時間切れ", scoreAnswer(boke, "normal", { type: "timeout" }, lim, 3).points, 0);
expect("正しくスルー", scoreAnswer(suru, "normal", { type: "through" }, 0, 0).kind, "through");
expect("正しい文にツッコむ", scoreAnswer(suru, "normal", { type: "tsukkomi", tapped: 0, choice: null }, 1000, 0).points, POINTS.overkill);
expect("上級：理由まで正解", scoreAnswer(boke, "advanced", { type: "tsukkomi", tapped: w, choice: ok, reason: boke.reasons!.answer }, TIME_LIMIT.advanced, 0).points, POINTS.base + POINTS.reason);
expect("上級：理由ちがい", scoreAnswer(boke, "advanced", { type: "tsukkomi", tapped: w, choice: ok, reason: (boke.reasons!.answer + 1) % 3 }, 0, 0).kind, "partial");
expect("合計は0未満にならない", roundTotal([{ points: -50 }, { points: -50 }]), 0);
expect("称号 0", titleOf(0).name, "見習い");
expect("称号 30000", titleOf(30_000).name, "師匠");
const unit0 = Object.values(TSUKKOMI)[0];
const round = pickRound(unit0, new Set([unit0[unit0.length - 1].id]), () => 0.5);
expect("ツッコみそこねを先に", round[0], unit0[unit0.length - 1].id);
expect("1回の問題数", round.length, Math.min(ROUND_SIZE, unit0.length));
expect("1回の中で重複なし", new Set(round).size, round.length);
// 復習のあとは、基本 → 発展 の順
const lv = pickRound(unit0, new Set()).map((id) => unit0.find((b) => b.id === id)!.level);
expect("基本が先・発展が後", lv.join(""), [...lv].sort().join(""));
const missL2 = unit0.find((b) => b.level === 2)!;
const withMiss = pickRound(unit0, new Set([missL2.id]));
expect("復習（発展）が基本より先", withMiss[0], missL2.id);
expect("復習のあとも基本が先", withMiss.slice(1).map((id) => unit0.find((b) => b.id === id)!.level).join(""), withMiss.slice(1).map((id) => unit0.find((b) => b.id === id)!.level).sort().join(""));

console.log(`ツッコミ学習法：${Object.keys(TSUKKOMI).length} 単元・${total} 問（うちスルー ${suruTotal} 問）／4択の正解の位置 ${pos.join("/")}`);
if (errors.length) {
  console.log(`まちがい ${errors.length} 件`);
  for (const e of errors) console.log("  ×", e);
  process.exit(1);
}
console.log("OK");
