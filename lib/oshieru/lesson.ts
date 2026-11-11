import type { Figure } from "@/lib/lecture/types";
import { plain, type OshieruUnit } from "./index";

// オシエルAI（声で教える授業・試作）の黒板。/learn/oshieru-ai/<単元id>。
// ハルの誤解に近い節の図を先に並べる（先生役の生徒が、黒板の図を切りかえながら説明する）。
// 図はレクチャーのデータの図そのまま。誤解セットの中身（言い直しのまちがい・判定の条件）はここでは渡さない。

export interface LessonBoard {
  /** レクチャーの sections の番号 */
  section: number;
  heading: string;
  body: string;
  figure?: Figure;
}

/** 2文字ずつの組の重なりで、誤解に近い節を見つける */
function bigrams(s: string): Set<string> {
  const t = plain(s).replace(/[\s、。・「」（）()]/g, "");
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
}

function overlap(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return n;
}

/** 黒板に出す節（図のある節だけ。ハルの誤解の順に、その誤解に近い節から。図が1つもなければ、最初の誤解に近い節を文字だけで1つ） */
export function lessonBoards(u: OshieruUnit, max = 4): LessonBoard[] {
  const L = u.lecture;
  const total = new Map<number, number>();
  const picked: number[] = [];
  for (const m of u.set.misconceptions) {
    const x = m.mistake !== null ? L.mistakes[m.mistake] : undefined;
    const probe = bigrams(`${m.opener}${m.belief}${m.understoodWhen.join("")}${x ? `${x.wrong}${x.right}` : ""}`);
    const sc = L.sections.map((s, i) => (m.section === i ? 1000 : 0) + overlap(probe, bigrams(`${s.heading}${s.body}${s.reveal ?? ""}`)));
    sc.forEach((v, i) => total.set(i, (total.get(i) ?? 0) + v));
    const best = sc.map((v, i) => [v, i] as const).filter(([, i]) => L.sections[i].figure).sort((a, b) => b[0] - a[0] || a[1] - b[1])[0];
    if (best && !picked.includes(best[1])) picked.push(best[1]);
  }
  const rest = L.sections
    .map((_, i) => i)
    .filter((i) => !picked.includes(i))
    .sort((a, b) => (total.get(b) ?? 0) - (total.get(a) ?? 0) || a - b);
  const toBoard = (i: number): LessonBoard => ({ section: i, heading: L.sections[i].heading, body: L.sections[i].body, figure: L.sections[i].figure });
  const withFig = [...picked, ...rest.filter((i) => L.sections[i].figure)];
  if (!withFig.length) return rest.slice(0, 1).map(toBoard);
  return withFig.slice(0, max).map(toBoard);
}
