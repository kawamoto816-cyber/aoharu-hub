import type { ExamAttempt } from "@/lib/exam/results";

// 国公立2次・直前5週間コース（試作）。純粋な関数だけ（画面は components/station/Course.tsx）。
// 無料の入口：志望校をえらぶ → 診断（大学別模試）→ 作戦表（目標まであと何点・どの大問・どの単元）→ 最初の週の計画。
// 2週目以降（計画の作り直し・進み具合の管理・保護者への報告）は有料の伴走にする予定。値段・決済はまだ作らない。
//
// 注意：点数は、アオハルラーンの大学別模試（出題形式に寄せたオリジナル問題）の満点での目安。
// 実際の配点・合格最低点は大学ごとにちがうので、目標の得点率は本人が大学の公表資料を見て決める（既定は仮の60%）。

export type Line = "文系" | "理系";

export interface CourseSubject {
  key: string;
  kamoku: string;
  minutes: number;
  total: number;
  play: string;
}

export interface CourseUniv {
  univ: string;
  subjects: CourseSubject[];
}

export interface UnitInfo {
  name: string;
  moshi?: string;
}

/** その系統で受ける科目（文系は数学（文系）と地歴、理系は数学（理系）。英語・国語は両方） */
export function subjectsFor(u: CourseUniv, line: Line): CourseSubject[] {
  return u.subjects.filter((s) => {
    if (s.kamoku === "数学（文系）" || s.kamoku === "日本史" || s.kamoku === "世界史") return line === "文系";
    if (s.kamoku === "数学（理系）") return line === "理系";
    return true;
  });
}

/** 文系で日本史と世界史の両方があるときは、どちらか1つ */
export const HISTORY = ["日本史", "世界史"];

/** 科目ごとの最新の診断（大学別模試の結果） */
export function latestBySpec(all: ExamAttempt[], keys: string[]): Record<string, ExamAttempt> {
  const out: Record<string, ExamAttempt> = {};
  for (const a of all) {
    const k = a.spec.startsWith("daigaku:") ? a.spec.slice(8) : "";
    if (!keys.includes(k)) continue;
    if (!out[k] || a.at > out[k].at) out[k] = a;
  }
  return out;
}

export interface Row {
  subject: CourseSubject;
  attempt?: ExamAttempt;
  score: number;
  total: number;
  target: number;
  gap: number;
  /** 失点の大きい大問 */
  parts: { title: string; lost: number; score: number; total: number }[];
  /** 得点率の低い単元 */
  units: { unit: string; lost: number; pct: number }[];
}

export function strategy(subjects: CourseSubject[], latest: Record<string, ExamAttempt>, rate: number): Row[] {
  return subjects.map((s) => {
    const a = latest[s.key];
    const total = a?.total ?? s.total;
    const score = a?.score ?? 0;
    const target = Math.round(total * rate);
    const parts = (a?.parts ?? [])
      .map((p) => ({ title: p.title, lost: p.total - p.score, score: p.score, total: p.total }))
      .filter((p) => p.lost > 0)
      .sort((x, y) => y.lost - x.lost)
      .slice(0, 2);
    const units = Object.entries(a?.units ?? {})
      .map(([unit, [sc, tot]]) => ({ unit, lost: tot - sc, pct: tot ? Math.round((sc / tot) * 100) : 0 }))
      .filter((u) => u.pct < 70 && u.lost > 0)
      .sort((x, y) => y.lost - x.lost)
      .slice(0, 3);
    return { subject: s, attempt: a, score, total, target, gap: a ? Math.max(0, target - score) : 0, parts, units };
  });
}

export interface Task {
  id: string;
  text: string;
  links: { href: string; label: string }[];
}

export interface Day {
  no: number;
  tasks: Task[];
}

/** 最初の週の計画：差の大きい科目と、失点の大きい単元・大問から順に7日へ並べる */
export function firstWeek(rows: Row[], units: Record<string, UnitInfo>): Day[] {
  const done = rows.filter((r) => r.attempt);
  if (!done.length) return [];
  const bySubj = [...done].sort((a, b) => b.gap - a.gap || a.score / a.total - b.score / b.total);
  const weakUnits = done
    .flatMap((r) => r.units.map((u) => ({ ...u, subject: r.subject })))
    .sort((a, b) => b.lost - a.lost)
    .slice(0, 6);
  const weakParts = bySubj.flatMap((r) => r.parts.map((p) => ({ ...p, subject: r.subject })));
  const days: Day[] = [];
  for (let i = 0; i < 6; i++) {
    const tasks: Task[] = [];
    const u = weakUnits.length ? weakUnits[i % weakUnits.length] : null;
    if (u) {
      const info = units[u.unit];
      const name = info?.name ?? u.unit;
      tasks.push({
        id: `d${i + 1}-u`,
        text: `${u.subject.kamoku}「${name}」（診断で${u.pct}%）：さかのぼりで根っこを確かめ、${info?.moshi ? "単元模試を1回解く" : "授業を見直す"}`,
        links: [{ href: `/learn/sakanobori?u=${encodeURIComponent(u.unit)}`, label: "さかのぼり" }, ...(info?.moshi ? [{ href: info.moshi, label: "単元模試" }] : [])],
      });
    }
    // 通しの1回分は、差のいちばん大きい科目（3日目）と2番目の科目（6日目）
    const s = (i % 3 === 2 ? bySubj[(i === 2 ? 0 : 1) % bySubj.length] : bySubj[i % bySubj.length]).subject;
    if (i % 3 === 2) {
      tasks.push({ id: `d${i + 1}-x`, text: `${s.kamoku}：大学別模試を1回分、本番の${s.minutes}分で解く`, links: [{ href: s.play, label: "大学別模試" }] });
    } else {
      const p = weakParts.length ? weakParts[i % weakParts.length] : null;
      tasks.push(
        p
          ? { id: `d${i + 1}-p`, text: `${p.subject.kamoku}「${p.title}」（${p.score}/${p.total}点）：模範解答と採点基準を読み、何も見ずに解き直す`, links: [{ href: p.subject.play, label: "もう一度解く" }] }
          : { id: `d${i + 1}-p`, text: `${s.kamoku}：診断の見直し（まちがえた問題の解説を読み、解き直す）`, links: [{ href: s.play, label: "大学別模試" }] },
      );
    }
    days.push({ no: i + 1, tasks });
  }
  days.push({
    no: 7,
    tasks: [
      { id: "d7-r", text: `週のふり返り：いちばん差の大きかった${bySubj[0].subject.kamoku}をもう1回解いて、作戦表を見直す`, links: [{ href: bySubj[0].subject.play, label: "大学別模試" }] },
    ],
  });
  return days;
}

/** 国公立の前期日程（例年2月25日から）まで何日か */
export function daysToZenki(now: Date): { date: Date; days: number } {
  let y = now.getFullYear();
  if (now.getMonth() > 2 || (now.getMonth() === 2 && now.getDate() > 1)) y++;
  const date = new Date(y, 1, 25);
  const days = Math.ceil((date.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) / 86_400_000);
  return { date, days };
}
