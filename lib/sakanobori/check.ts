import { resolveDaimon } from "@/lib/moshi";
import { hashSeed, makeRng } from "@/lib/moshi/rng";
import { materialize, unitMoshiOf } from "@/lib/moshi/unit";
import type { Item, Question, QuestionBody } from "@/lib/moshi/types";

// さかのぼりのチェック問題（サーバー側で使う。単元模試の全データを読む）。
// その単元の単元模試の問題（書き下ろしの生成型 A・プール型 B・固定型 C、なければ従来の大問）から、
//   自動採点できる形式 (choice・num・term) ・難易度 1〜2・資料や前の小問を見なくても解ける小問 を、シードで3問選ぶ。
// 2問に満たない単元は「たしかめられない」として、診断ではその前提へ進む。

export const CHECK_COUNT = 3;
const KINDS = new Set(["choice", "num", "term"]);
/** 前の小問・資料を指す言い方（この小問だけ取り出すと意味が通らない） */
const REFERS = /上の|前の|右の|左の|下の|次の(図|表|文|資料)|[（(][0-9０-９]+[)）](で|の|と)|この(図|表|グラフ|式|関数|三角形|四角形|円|立体|実験|装置|回路|文章|資料|本文|文)|本文|資料|図[0-9０-９１-９]*のように|同じ(図|実験|装置)|傍線|線部/;

interface Cand {
  q: Question;
  unit: string;
  body: QuestionBody;
}

function candidatesOf(unit: string, seed: number): Cand[] {
  const m = unitMoshiOf(unit);
  if (!m) return [];
  const out: Cand[] = [];
  for (const sec of m.sections) {
    if (sec.material?.length) continue;
    for (const q of sec.questions) {
      if (q.dependsOn || q.difficulty > 2) continue;
      const u = q.unit ?? m.unit;
      if (u !== unit) continue;
      let body: QuestionBody;
      try {
        body = materialize(q, hashSeed(`${seed}:check`), u);
      } catch {
        continue;
      }
      if (!KINDS.has(body.answer.kind) || body.material?.length) continue;
      if (q.type !== "A" && REFERS.test(body.prompt)) continue;
      out.push({ q, unit: u, body });
    }
  }
  return out;
}

/** チェック問題が出せるか（2問以上） */
export const canCheck = (unit: string) => candidatesOf(unit, 1).length >= 2;

/** チェック問題（最大3問。難易度1を先に） */
export function checkItems(unit: string, seed: number): Item[] {
  const cs = candidatesOf(unit, seed);
  if (cs.length < 2) return [];
  const rng = makeRng(hashSeed(`${seed}:${unit}:sakanobori`));
  const easy = rng.shuffle(cs.filter((c) => c.q.difficulty === 1));
  const mid = rng.shuffle(cs.filter((c) => c.q.difficulty === 2));
  // 基本2問・標準1問を目安に（足りなければもう一方から）
  const pick: Cand[] = [...easy.slice(0, 2), ...mid.slice(0, 1)];
  for (const c of [...easy.slice(2), ...mid.slice(1)]) if (pick.length < CHECK_COUNT) pick.push(c);
  pick.sort((a, b) => a.q.difficulty - b.q.difficulty);
  const items: Item[] = pick.slice(0, CHECK_COUNT).map((c, k) => ({
    id: `${c.q.id}`,
    no: `${k + 1}`,
    prompt: c.body.prompt,
    figure: c.body.figure,
    points: 1,
    skill: c.q.skill,
    unit: c.unit,
    answer: c.body.answer,
    steps: c.body.steps,
    point: c.body.point,
    level: c.q.difficulty as 1 | 2,
  }));
  // 図の参照をほどく（大問の形に包んでから resolveDaimon にかける）
  return resolveDaimon({ id: `sakanobori/${unit}`, subject: "math", grade: "", units: [unit], title: "", lead: "", items, points: items.length, minutes: 3, style: "mix", level: 1, review: { status: "draft" } }).items;
}
