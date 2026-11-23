import type { ExamAttempt } from "@/lib/exam/results";

// 直前コース（国公立2次・共通テスト・公立高校入試）の計画づくり。純粋な関数だけ（画面は components/station/Course.tsx）。
// コースの種類・値段は course-kinds.ts。共通テスト・公立高校入試は、試験日までの週数（2〜8週）に合わせて計画を並べる。
// 無料の入口：志望校をえらぶ → 診断（大学別模試）→ 作戦表（目標まであと何点・どの大問・どの単元）→ 最初の週の計画。
// 2週目以降（計画の作り直し・進み具合の管理・保護者への報告）は有料の伴走にする予定。値段・決済はまだ作らない。
//
// 注意：点数は、アオハルラーンの大学別模試（出題形式に寄せたオリジナル問題）の満点での目安。
// 実際の配点・合格最低点は大学ごとにちがうので、目標の得点率は本人が大学の公表資料を見て決める（既定は仮の60%）。

export type Line = "文系" | "理系";

export interface CourseSubject {
  key: string;
  /** 一覧の見出し（共通テスト：国語・数学・英語・情報／理科／地理歴史・公民） */
  category?: string;
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
export function latestBySpec(all: ExamAttempt[], keys: string[], prefix = "daigaku:"): Record<string, ExamAttempt> {
  const out: Record<string, ExamAttempt> = {};
  for (const a of all) {
    const k = a.spec.startsWith(prefix) ? a.spec.slice(prefix.length) : "";
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
export function firstWeek(rows: Row[], units: Record<string, UnitInfo>, moshi = "大学別模試"): Day[] {
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
      tasks.push({ id: `d${i + 1}-x`, text: `${s.kamoku}：${moshi}を1回分、本番の${s.minutes}分で解く`, links: [{ href: s.play, label: moshi }] });
    } else {
      const p = weakParts.length ? weakParts[i % weakParts.length] : null;
      tasks.push(
        p
          ? { id: `d${i + 1}-p`, text: `${p.subject.kamoku}「${p.title}」（${p.score}/${p.total}点）：模範解答と採点基準を読み、何も見ずに解き直す`, links: [{ href: p.subject.play, label: "もう一度解く" }] }
          : { id: `d${i + 1}-p`, text: `${s.kamoku}：診断の見直し（まちがえた問題の解説を読み、解き直す）`, links: [{ href: s.play, label: moshi }] },
      );
    }
    days.push({ no: i + 1, tasks });
  }
  days.push({
    no: 7,
    tasks: [
      { id: "d7-r", text: `週のふり返り：いちばん差の大きかった${bySubj[0].subject.kamoku}をもう1回解いて、作戦表を見直す`, links: [{ href: bySubj[0].subject.play, label: moshi }] },
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

// ---------- 2週目から（有料の伴走・試作） ----------

export interface WeekPlan {
  week: number;
  theme: string;
  lead: string;
  days: Day[];
}

// 週のテーマは4つの段階。最後の週はいつも「直前」。それより前の週に、大問演習 → 通し演習 → 時間割どおり を均等に割りふる
// （5週のコースなら 2週目＝大問演習・3週目＝通し・4週目＝時間割・5週目＝直前。国公立2次はこれで固定）。
const WEEK_THEMES = [
  { theme: "大問演習：失点の大きい大問をつぶす", lead: "苦手に合わせた回で大問を1題ずつ。まちがえたら、結果画面の「つまずきの根っこを探す」から根っこの単元へ戻ってから、もう一度その大問へ。" },
  { theme: "通し演習：全科目を本番の時間で1回ずつ", lead: "1日1科目を本番の時間で通す。終わったら、大問ごとにかかった時間をふり返って、どこで時間を使いすぎたかを確かめる。" },
  { theme: "時間割どおりに解く・取りこぼしをなくす", lead: "本番と同じ順番・時間で解く日をつくる。部分点を取りにいく書き方（途中式・根拠）を、採点基準で確かめる。" },
  { theme: "直前：量を減らして、仕上げと体調", lead: "新しいことは増やさず、まちがいノートと弱い単元の見直し。前日は早く寝る。" },
];
/** マーク式（共通テスト）のときの3つめの段階 */
const MARK_THEME = { theme: "時間割どおりに解く・取りこぼしをなくす", lead: "本番と同じ順番・時間で解く日をつくる。見直しの時間を5分残す配分と、マークのずれの確かめ方を決めておく。" };

export interface PlanOpt {
  /** コース全体の週数（1週目をふくむ。2〜8。省略＝5） */
  weeks?: number;
  /** 診断に使う模試の名前（省略＝大学別模試） */
  moshi?: string;
  /** マーク式（記述の自己採点がない） */
  mark?: boolean;
}

/** その週（2〜weeks）の段階（0＝大問演習・1＝通し・2＝時間割・3＝直前） */
export function phaseOf(week: number, weeks: number): number {
  if (week >= weeks) return 3;
  const mid = weeks - 2; // 2週目〜(weeks-1)週目の数
  return Math.min(2, Math.floor(((week - 2) * 3) / mid));
}

/** 苦手に合わせた回（?w=）のURL */
const weakHref = (play: string, us: string[]) => {
  const w = us.filter((u) => /^[a-z0-9-]{1,80}$/.test(u)).slice(0, 12);
  return w.length ? `${play}${play.includes("?") ? "&" : "?"}w=${w.join(",")}` : play;
};

/** 2〜5週目の計画。その時点の最新の診断から作り直す（週が進むたびに結果が変われば計画も変わる） */
export function laterWeeks(rows: Row[], units: Record<string, UnitInfo>, opt: PlanOpt = {}): WeekPlan[] {
  const weeks = Math.max(2, Math.min(8, opt.weeks ?? 5));
  const moshi = opt.moshi ?? "大学別模試";
  const done = rows.filter((r) => r.attempt);
  if (!done.length) return [];
  const bySubj = [...done].sort((a, b) => b.gap - a.gap || a.score / a.total - b.score / b.total);
  const subjAt = (i: number) => bySubj[i % bySubj.length];
  const unitName = (u: string) => units[u]?.name ?? u;
  return Array.from({ length: weeks - 1 }, (_, wi) => {
    const week = wi + 2;
    const phase = phaseOf(week, weeks);
    const t = phase === 2 && opt.mark ? MARK_THEME : WEEK_THEMES[phase];
    const days: Day[] = [];
    for (let d = 0; d < 7; d++) {
      const id = (k: string) => `w${week}d${d + 1}-${k}`;
      const r = subjAt(d + wi);
      const s = r.subject;
      const weak = r.units.map((u) => u.unit);
      const tasks: Task[] = [];
      if (d === 6) {
        tasks.push({ id: id("r"), text: "週のふり返りを書く（下の「週のふり返り」）。作戦表を見て、来週の配分を決める", links: [] });
      } else if (phase === 0) {
        const p = r.parts[d % Math.max(1, r.parts.length)];
        tasks.push({
          id: id("p"),
          text: p ? `${s.kamoku}「${p.title}」と同じ形の大問を1題、時間を計って解く（苦手に合わせた回）` : `${s.kamoku}：苦手に合わせた回で大問を1題`,
          links: [{ href: weakHref(s.play, weak), label: "苦手に合わせた回" }],
        });
        if (weak[d % Math.max(1, weak.length)]) {
          const u = weak[d % weak.length];
          tasks.push({ id: id("u"), text: `まちがえたら「${unitName(u)}」の根っこへ戻る`, links: [{ href: `/learn/sakanobori?u=${encodeURIComponent(u)}`, label: "さかのぼり" }] });
        }
      } else if (phase === 1) {
        tasks.push({ id: id("x"), text: `${s.kamoku}：${moshi}を1回分、本番の${s.minutes}分で通す`, links: [{ href: s.play, label: moshi }] });
        tasks.push({ id: id("t"), text: "大問ごとにかかった時間をふり返って、使いすぎた大問をメモする", links: [] });
      } else if (phase === 2) {
        if (d % 2 === 0) tasks.push({ id: id("x"), text: `${s.kamoku}：本番と同じ時刻に始めて、本番の${s.minutes}分で解く`, links: [{ href: s.play, label: moshi }] });
        else
          tasks.push({
            id: id("w"),
            text: opt.mark ? `${s.kamoku}：まちがえた問題の解説を読み、何も見ずに解き直す（選んだ理由を1行で言えるように）` : `${s.kamoku}：記述の自己採点で落とした観点を、模範解答の書き方で書き直す`,
            links: [{ href: weakHref(s.play, weak), label: "苦手に合わせた回" }],
          });
      } else {
        const u = weak[d % Math.max(1, weak.length)];
        tasks.push(
          u
            ? { id: id("n"), text: `まちがいノートと「${unitName(u)}」の見直し（新しい問題は増やさない）`, links: [{ href: `/learn/sakanobori?u=${encodeURIComponent(u)}`, label: "さかのぼり" }] }
            : { id: id("n"), text: `${s.kamoku}：まちがいノートの見直し`, links: [] },
        );
        if (d === 1) tasks.push({ id: id("x"), text: "本番と同じ時間割で、全科目を1日で通す（最後の通し）", links: [{ href: bySubj[0].subject.play, label: moshi }] });
      }
      days.push({ no: d + 1, tasks });
    }
    return { week, theme: t.theme, lead: t.lead, days };
  });
}

export interface Trend {
  key: string;
  kamoku: string;
  points: { at: string; pct: number }[];
}

/** 科目ごとの得点率の動き（古い順） */
export function trends(all: ExamAttempt[], subjects: CourseSubject[], prefix = "daigaku:"): Trend[] {
  return subjects.map((s) => ({
    key: s.key,
    kamoku: s.kamoku,
    points: all
      .filter((a) => a.spec === `${prefix}${s.key}` && a.total > 0)
      .sort((a, b) => (a.at < b.at ? -1 : 1))
      .map((a) => ({ at: a.at, pct: Math.round((a.score / a.total) * 100) })),
  }));
}

// ---------- いまは何週目の何日目か ----------

export const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** YYYY-MM-DD を、その日の0時（その場の時刻帯）の Date にする */
export function fromYmd(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** 日本時間の今日（YYYY-MM-DD）。サーバーは UTC で動くので、サーバーで「今日」を決めるときはこれを使う */
export const todayJst = (now: Date = new Date()) => new Date(now.getTime() + 9 * 3_600_000).toISOString().slice(0, 10);

/** 始めた日から試験日までの週数（切り上げ。2〜8週）。どちらかが決まっていなければ5週 */
export function weeksBetween(start: string | undefined, exam: string | undefined): number {
  const ok = (x?: string) => !!x && /^\d{4}-\d{2}-\d{2}$/.test(x);
  if (!ok(start) || !ok(exam)) return 5;
  const n = Math.round((fromYmd(exam!).getTime() - fromYmd(start!).getTime()) / 86_400_000);
  return Math.max(2, Math.min(8, Math.ceil(n / 7)));
}

/** その日（YYYY-MM-DD）まで今日から何日か（過ぎていれば負の数） */
export function daysUntil(day: string, today: Date): number {
  return Math.round((fromYmd(day).getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) / 86_400_000);
}

/** 始めた日（YYYY-MM-DD）から数えて、いまは何週目（1〜weeks）の何日目（1〜7）か。始める前なら null。最後の週を過ぎたら最後の週の7日目 */
export function courseDay(start: string | undefined, today: Date, weeks = 5): { week: number; day: number } | null {
  if (!start || !/^\d{4}-\d{2}-\d{2}$/.test(start)) return null;
  const [y, m, d] = start.split("-").map(Number);
  const s = new Date(y, m - 1, d);
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const n = Math.round((t.getTime() - s.getTime()) / 86_400_000);
  if (n < 0) return null;
  if (n >= weeks * 7) return { week: weeks, day: 7 };
  return { week: Math.floor(n / 7) + 1, day: (n % 7) + 1 };
}

/** アオハルームに渡す「今日のやること」（このブラウザに置く） */
export const TODAY_KEY = "aoharu-course-today";
export interface TodayList {
  date: string;
  univ: string;
  week: number;
  day: number;
  items: string[];
  /** items と同じ順の、計画のチェックの id */
  ids?: string[];
  /** その計画を残しているキー（省略＝国公立2次）と、コースのページ */
  key?: string;
  href?: string;
}

/** アオハルームで「できた」と記録したら、コースの計画の同じやることにチェックを入れる */
export function checkCourseTask(plan: string) {
  try {
    const t = JSON.parse(window.localStorage.getItem(TODAY_KEY) ?? "null") as TodayList | null;
    if (!t?.ids) return;
    const i = t.items.findIndex((x) => x.slice(0, 60) === plan);
    if (i < 0) return;
    const key = t.key && /^aoharu-course-[a-z0-9-]+$/.test(t.key) ? t.key : "aoharu-course-v1";
    const raw = window.localStorage.getItem(key);
    const s = raw ? (JSON.parse(raw) as { checked?: string[] }) : {};
    const checked = s.checked ?? [];
    if (checked.includes(t.ids[i])) return;
    window.localStorage.setItem(key, JSON.stringify({ ...s, checked: [...checked, t.ids[i]] }));
  } catch {
    /* 読めない・書けないときは何もしない */
  }
}
