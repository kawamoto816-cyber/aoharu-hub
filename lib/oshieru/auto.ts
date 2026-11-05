import { createHash } from "node:crypto";
import type { Lecture } from "@/lib/lecture/types";
import type { GradeBand, Misconception, OshieruSet, Restatement } from "./types";

// 誤解セットを図解レクチャーのデータから機械的に作る（scripts/gen-oshieru.ts が使う。AIは使わない）。
// ハルの言葉は「決まった型」に、レクチャーの mistakes / check / 節の見出し・図の題を「」でそのまま入れるだけ。新しい事実は足さない。
//   誤解        … mistakes のうち「思いこみ」として言える wrong（まちがえる・わすれる などの自分でまちがいと言っている文は使わない）を先頭から2つ
//   わかった条件 … その mistakes の right と why
//   言い直し    … 正しいもの：使った誤解の right をまとめる／check[0] の問いと答え
//                 まちがいを残したもの：使わなかった mistakes の wrong を1つまぜる（fix はその right と why）
//   ヒント      … 決まった書き出し（図は、最初の図の題）
// 点検は lib/oshieru/check.ts（scripts/check-oshieru.ts）。点検を通った単元だけを、指紋つきで data/gen.ts に書き出す。

/** {{ }} の強調の印と《ルビ》を外し、前後の空白と終わりの句点をとる */
export const clean = (s: string) =>
  s
    .replace(/\{\{|\}\}/g, "")
    .replace(/《[^》]*》/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[。．]+$/, "");

/** 単元idから学年の段階（小1〜小3=low、高校=high、ほか=mid） */
export function gradeOf(unit: string): GradeBand {
  if (/^e-[a-z]+-[123]-/.test(unit)) return "low";
  if (/^h-/.test(unit)) return "high";
  return "mid";
}

/** 自分で「まちがい」と言っている wrong（ハルが本気で思いこむ形にならない） */
const SELF_LABELED = /まちが|間違|取りちが|とりちが|わすれ|忘れ|混同|かんちがい|勘違い|ミス|しない$|書かない|読まない|気づかない|確かめない|たしかめない/;
/** 思いこみとして言える長さ */
const MAX_WRONG = 60;
const MAX_RIGHT = 80;

export function beliefLike(m: Lecture["mistakes"][number]): boolean {
  const w = clean(m.wrong);
  const r = clean(m.right);
  return w.length >= 2 && w.length <= MAX_WRONG && r.length >= 1 && r.length <= MAX_RIGHT && clean(m.why).length > 0 && w !== r && !SELF_LABELED.test(w);
}

function firstFigureTitle(lec: Lecture): string | undefined {
  for (const s of lec.sections) if (s.figure?.title) return clean(s.figure.title);
  return undefined;
}

function emphasized(s: string): string[] {
  return [...s.matchAll(/\{\{(.+?)\}\}/g)].map((m) => clean(m[1]));
}

/**
 * レクチャー1つから誤解セットを作る。作れないとき（思いこみとして言える mistakes が1つもない・check がない）は null。
 * topic はその単元の名前（lib/lecture の lectureUnitInfo().name）。
 */
export function buildOshieruSet(lec: Lecture, topic: string): OshieruSet | null {
  const grade = gradeOf(lec.unit);
  const low = grade === "low";
  const idx = lec.mistakes.map((m, i) => (beliefLike(m) ? i : -1)).filter((i) => i >= 0);
  if (!idx.length || !lec.check.length) return null;
  // 誤解は2つまで。言い直しのまちがい用に、使わない mistakes を1つ以上残す（残らないときは誤解を1つにする）
  const nMis = idx.length >= 3 ? 2 : 1;
  const used = idx.slice(0, nMis);
  const spare = idx.slice(nMis);
  if (!spare.length) return null;
  const M = (i: number) => ({ w: clean(lec.mistakes[i].wrong), r: clean(lec.mistakes[i].right), y: clean(lec.mistakes[i].why) });

  const misconceptions: Misconception[] = used.map((i, k) => {
    const { w, r, y } = M(i);
    return {
      mistake: i,
      kind: "common",
      opener:
        k === 0
          ? low
            ? `ねえ、ぼく 「${w}」で あってると おもってたよ。ちがうの？`
            : `ねえ、ぼくはずっと「${w}」で合ってると思ってたんだ。ちがうの？`
          : low
            ? `あと、「${w}」も あってるよね？`
            : `あと、「${w}」も合ってるよね？`,
      belief: `「${w}」で正しいと思いこんでいる。`,
      understoodWhen: [r, y],
      probe: low ? `どうして 「${w}」じゃ だめなの？` : `どうして「${w}」じゃだめなの？ わけも教えてほしいな。`,
      ack: low ? `そっか、「${r}」なんだね！` : `そっか、正しくは「${r}」なんだね！`,
    };
  });

  const rights = used.map((i) => `「${M(i).r}」`).join(low ? "、それに " : "、それに");
  const c = lec.check[0];
  const q = clean(c.q);
  const a = clean(c.a);
  const restatements: Restatement[] = [
    { id: "r-ok", text: low ? `まとめると、${rights} なんだね！` : `まとめると、${rights}なんだね！`, flawed: false },
    { id: "r-ok-check", text: low ? `じゃあ たしかめるね。「${q}」の こたえは 「${a}」だね！` : `じゃあ確かめるね。「${q}」の答えは「${a}」だね！`, flawed: false, check: 0 },
  ];
  // まちがいを残した言い直しは、使わなかった mistakes から2つまで
  spare.slice(0, 2).forEach((i, k) => {
    const first = M(used[0]).r;
    const { w, r, y } = M(i);
    restatements.push({
      id: `r-flaw${k ? k + 1 : ""}`,
      text: low ? `まとめると、「${first}」なんだね。それから、「${w}」だよね！` : `まとめると、「${first}」なんだね。それから、「${w}」だよね！`,
      flawed: true,
      flaw: `「${w}」としている`,
      fix: `${r}（${y}）`,
    });
  });

  const fig = firstFigureTitle(lec);
  const hints = low
    ? { tatoeru: "みの まわりの もので いうと、", zu: fig ? `「${fig}」の ずで いうと、` : "ずに かくと、", rei: "たとえば、" }
    : { tatoeru: "身近なものにたとえると、", zu: fig ? `「${fig}」の図で考えると、` : "図にかくと、", rei: "具体的な例でいうと、" };

  const set: OshieruSet = { unit: lec.unit, grade, topic: clean(topic), misconceptions, restatements, hints, auto: true };
  if (low) {
    // ことばカード：使った誤解の right と、本文の強調語（短いもの）から8枚まで
    const seen = new Set<string>();
    const cards: string[] = [];
    for (const t of [...used.map((i) => M(i).r), ...lec.sections.flatMap((s) => emphasized(s.body))]) {
      const k = t.replace(/\s+/g, "");
      if (k.length < 2 || k.length > 20 || seen.has(k)) continue;
      seen.add(k);
      cards.push(t);
      if (cards.length >= 8) break;
    }
    if (cards.length >= 3) set.wordCards = cards;
  }
  return set;
}

/** セットの指紋（data/gen.ts に書き出したときと同じものか、を見る） */
export const fingerprint = (set: OshieruSet) => createHash("sha1").update(JSON.stringify(set)).digest("hex").slice(0, 12);
