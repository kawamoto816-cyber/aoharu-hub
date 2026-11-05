import { createHash } from "node:crypto";
import type { Lecture } from "@/lib/lecture/types";
import type { GradeBand, Misconception, OshieruSet, Restatement } from "./types";

// 誤解セットを図解レクチャーのデータから機械的に作る（scripts/gen-oshieru.ts が使う。AIは使わない）。
// ハルの言葉は「決まった型」（数種類。単元idから決まった1つを選ぶ）に、レクチャーの mistakes の wrong・right・why をそのまま入れるだけ。
// 型が変えるのは前置き・語尾・口調だけで、新しい事実は足さない（wrong の語句は wrongCore() のとおり、文の中にそのまま残す）。
//   誤解        … mistakes のうち「思いこみ」として言える wrong（まちがえる・わすれる などの自分でまちがいと言っている文は使わない）を先頭から2つ
//   わかった条件 … その mistakes の right と why
//   言い直し    … 教えた誤解についてだけ。正しいもの：教えた誤解の right（と why）をまとめる
//                 まちがいを残したもの：教えた誤解の1つは right、もう1つは wrong のまま（誤解が1つなら、right を言ったあとに wrong も残す）
//   ヒント      … 決まった書き出し（数種類。図は、最初の図の題）
// かぎかっこは二重にしない（wrong・right の中に「」があるときも外から「」でくくらない。英文だけの wrong・right は「」でくくる）。
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

/** wrong のうち、ハルの文にそのまま残す部分（終わりの「〜と思う」「〜と考える」だけを外す。それ以外は wrong のまま） */
export const wrongCore = (wrong: string) => clean(wrong).replace(/\s*(?:と|って)\s*(?:思う|おもう|考える|かんがえる|思っている|おもっている)$/, "");

/** 文の中に入れる形：日本語をふくまない（英文などの）ものだけ「」でくくる。中に「」があるものはくくらない（二重にしない） */
export function inline(s: string): string {
  if (/[「」]/.test(s)) return s;
  return /[\u3040-\u30ff\u3400-\u9fff]/.test(s) ? s : `「${s}」`;
}

/** 単元id と場所から、型のどれを使うかを決める（毎回同じ・単元ごとにばらける） */
function pick<T>(unit: string, slot: string, list: readonly T[]): T {
  const h = parseInt(createHash("sha1").update(`${unit}:${slot}`).digest("hex").slice(0, 8), 16);
  return list[h % list.length];
}

type Fill = (x: string) => string;
type Fill2 = (a: string, b: string) => string;
type Band<X> = { low: readonly X[]; std: readonly X[] };
interface Templates {
  open1: Band<Fill>;
  open2: Band<Fill>;
  probe: Band<Fill>;
  ack: Band<Fill>;
  ok2: Band<Fill2>;
  okWhy: Band<Fill2>;
  flaw2: Band<Fill2>;
  flaw1: Band<Fill2>;
  tatoeru: Band<string>;
  rei: Band<string>;
  zuFig: Band<Fill>;
  zu: Band<string>;
}

// 型。low は小1〜小3（ひらがな・わかち書き）、std はそのほか。W は wrong、R は right、Y は why（どれも inline() したもの）
const T: Templates = {
  open1: {
    low: [
      (W) => `ねえ、ぼく ずっと ${W} って おもってたよ。ちがうの？`,
      (W) => `${W} って、あってるよね？ ぼく、そう おもってたんだ。`,
      (W) => `ねえ ねえ、ぼくは ${W} って おもうんだけど、ちがう？`,
    ],
    std: [
      (W) => `ねえ、ぼくはずっと、${W}って思ってたんだ。ちがうの？`,
      (W) => `${W}って、合ってるよね？ ぼくはずっとそう思ってたんだけど。`,
      (W) => `ねえ、ちょっと聞いて。ぼくの考えだと、${W}ってことになるんだけど、ちがう？`,
      (W) => `うーん、${W}って思ってたんだけど、これって合ってるかなあ？`,
    ],
  },
  open2: {
    low: [
      (W) => `あと、${W} って いうのも あってるよね？`,
      (W) => `それとね、${W} って いうのは あってるでしょ？`,
      (W) => `もう ひとつ。${W} って おもってたけど、これも ちがうの？`,
    ],
    std: [
      (W) => `あと、${W}っていうのも合ってるよね？`,
      (W) => `それから、${W}っていうのは正しいよね？`,
      (W) => `もう一つ聞いていい？ ${W}って思ってたんだけど、これもちがうの？`,
    ],
  },
  probe: {
    low: [
      (W) => `${W} って、どうして だめなの？`,
      (W) => `でも、${W} って いうのの どこが いけないの？`,
      (W) => `${W} って いうのは、なんで ちがうの？`,
    ],
    std: [
      (W) => `${W}って、どうしてだめなの？ わけも教えてほしいな。`,
      (W) => `でも、${W}っていうののどこがいけないの？`,
      (W) => `${W}って、合ってる気がするんだけど、どうしてちがうの？ 理由も知りたいな。`,
    ],
  },
  ack: {
    low: [(R) => `そっか、${R} って ことなんだね！`, (R) => `わあ、${R} って ことか！`, (R) => `なるほど、${R} って ことだね！`],
    std: [(R) => `なるほど、${R}ってことだね！`, (R) => `そっか、${R}ってことなんだ！`, (R) => `わかった！ ${R}ってことだね。`],
  },
  /** 正しい言い直し（誤解2つ） */
  ok2: {
    low: [(a, b) => `まとめると、${a} って こと。それと、${b} って ことだね！`, (a, b) => `わかった！ ${a} って こと。それから、${b} って ことだね！`],
    std: [(a, b) => `まとめると、${a}ってこと。それに、${b}ってことだね！`, (a, b) => `つまり、${a}ってことか。それから、${b}ってことだね！`],
  },
  /** 正しい言い直し（right と why） */
  okWhy: {
    low: [(r, y) => `まとめると、${r} って ことだね。どうしてかと いうと、${y}。`, (r, y) => `わかった！ ${r} って ことだね。${y}。`],
    std: [(r, y) => `まとめると、${r}ってことだね。わけは、${y}。`, (r, y) => `つまり、${r}ってことか。${y}。`],
  },
  /** まちがいを残した言い直し：一つは right、もう一つは wrong のまま */
  flaw2: {
    low: [(r, w) => `まとめると、${r} って ことだね。それと、${w} って いうのは あってるよね！`, (r, w) => `わかった！ ${r} って こと。あと、${w} って いうのは そのままで いいんだよね！`],
    std: [(r, w) => `まとめると、${r}ってことだね。それと、${w}っていうのは合ってるよね！`, (r, w) => `つまり、${r}ってことか。あと、${w}っていうのはそのままでいいんだよね！`],
  },
  /** まちがいを残した言い直し（誤解1つ）：right を言ったあと、wrong も残す */
  flaw1: {
    low: [(r, w) => `${r} って ことは わかったよ。でも、${w} って いうのも あってるよね！`, (r, w) => `まとめると、${r} って ことだね。だから、${w} って いうのも まちがいじゃ ないよね！`],
    std: [(r, w) => `${r}ってことはわかったよ。でも、${w}っていうのも合ってるよね！`, (r, w) => `まとめると、${r}ってことだね。だから、${w}っていうのもまちがいじゃないよね！`],
  },
  tatoeru: {
    low: ["みの まわりの もので いうと、", "おうちに ある もので いうと、", "ほかの もので たとえると、"],
    std: ["身近なものにたとえると、", "ふだんの生活でいうと、", "ほかのものにたとえてみると、", "身の回りのことで考えると、"],
  },
  rei: {
    low: ["たとえば、", "れいを あげると、", "じっさいに やって みると、"],
    std: ["具体的な例でいうと、", "例をあげると、", "たとえば、", "実際の例で考えると、"],
  },
  zuFig: {
    low: [(F) => `${F}の ずで いうと、`, (F) => `${F}の ずを みると、`],
    std: [(F) => `${F}の図で考えると、`, (F) => `${F}の図を見ると、`, (F) => `${F}の図にあてはめると、`],
  },
  zu: {
    low: ["ずに かくと、", "えに かいて みると、"],
    std: ["図にかくと、", "図にしてみると、", "絵にかいて考えると、"],
  },
};

function firstFigureTitle(lec: Lecture): string | undefined {
  for (const s of lec.sections) if (s.figure?.title) return clean(s.figure.title);
  return undefined;
}

function emphasized(s: string): string[] {
  return [...s.matchAll(/\{\{(.+?)\}\}/g)].map((m) => clean(m[1]));
}

const MAX_TEXT = 240;

/**
 * レクチャー1つから誤解セットを作る。作れないとき（思いこみとして言える mistakes が1つもない・check がない）は null。
 * topic はその単元の名前（lib/lecture の lectureUnitInfo().name）。
 */
export function buildOshieruSet(lec: Lecture, topic: string): OshieruSet | null {
  const grade = gradeOf(lec.unit);
  const low = grade === "low";
  const band = low ? "low" : "std";
  const P = <K extends keyof Templates>(slot: K, key: string = slot): Templates[K]["low"][number] => pick<Templates[K]["low"][number]>(lec.unit, key, T[slot][band]);
  const idx = lec.mistakes.map((m, i) => (beliefLike(m) ? i : -1)).filter((i) => i >= 0);
  if (!idx.length || !lec.check.length) return null;
  const used = idx.slice(0, 2);
  const M = (i: number) => {
    const x = lec.mistakes[i];
    return { w: clean(x.wrong), W: inline(wrongCore(x.wrong)), r: clean(x.right), R: inline(clean(x.right)), y: clean(x.why) };
  };

  const misconceptions: Misconception[] = used.map((i, k) => {
    const { w, W, r, y, R } = M(i);
    return {
      mistake: i,
      kind: "common",
      opener: P(k === 0 ? "open1" : "open2", `open${k}`)(W),
      belief: `次のことを正しいと思いこんでいる：${w}`,
      understoodWhen: [r, y],
      probe: P("probe", `probe${k}`)(W),
      ack: P("ack", `ack${k}`)(R),
    };
  });

  // 言い直しは、教えた誤解（used）についてだけ
  const A = M(used[0]);
  const B = used[1] !== undefined ? M(used[1]) : undefined;
  const restatements: Restatement[] = [];
  const push = (r: Restatement) => {
    if (r.text.length <= MAX_TEXT) restatements.push(r);
  };
  if (B) push({ id: "r-ok", text: P("ok2")(A.R, B.R), flawed: false });
  push({ id: B ? "r-ok2" : "r-ok", text: P("okWhy")(A.R, A.y), flawed: false });
  if (B) {
    push({ id: "r-flaw", text: P("flaw2", "flaw2a")(A.R, B.W), flawed: true, flaw: `まだ${B.W}と思ったまま`, fix: `${B.r}（${B.y}）` });
    push({ id: "r-flaw2", text: P("flaw2", "flaw2b")(B.R, A.W), flawed: true, flaw: `まだ${A.W}と思ったまま`, fix: `${A.r}（${A.y}）` });
  } else {
    push({ id: "r-flaw", text: P("flaw1")(A.R, A.W), flawed: true, flaw: `${A.R}と言いながら、まだ${A.W}とも思っている`, fix: `${A.r}（${A.y}）` });
  }

  const fig = firstFigureTitle(lec);
  const F = fig ? (/[「」]/.test(fig) ? fig : `「${fig}」`) : undefined;
  const hints = {
    tatoeru: P("tatoeru"),
    zu: F ? P("zuFig")(F) : P("zu"),
    rei: P("rei"),
  };

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
