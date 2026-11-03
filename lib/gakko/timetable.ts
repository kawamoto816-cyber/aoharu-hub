// あたらしいがっこう (/learn/gakko) の「きょうの時間割」。
// 学年ごとの単元 (図解レクチャーのある単元だけ) を、日付と学年をシードにした決まった乱数で並べ、
// 教科がばらけるように 1〜4時間目へ置く。同じ日・同じ学年・同じ記録なら、何度開いても同じ時間割になる。
// ここはクライアントからも読む (lib/school・lib/lecture は読まない。単元の情報は index.ts の gakkoData でサーバーが引いて渡す)。

/** 学年 (components/learn/UnitPicker と同じ並び・同じ名前) */
export const GAKKO_GRADES = ["小1", "小2", "小3", "小4", "小5", "小6", "中1", "中2", "中3", "高校"];

export const PERIODS = 4;

export interface GakkoUnit {
  /** 単元名 */
  n: string;
  /** 教科 (例 国語・数学・地理歴史) */
  s: string;
  /** 学年や科目 (例 中1・数学Ⅰ) */
  g: string;
  /** 教科の色 (スフィア盤と同じ) */
  c: string;
}

export interface GakkoData {
  units: Record<string, GakkoUnit>;
  /** 学年 → 単元id (学校の地図の順) */
  byGrade: Record<string, string[]>;
}

// ---- 日付 (日本時間) ----

const JST = 9 * 60 * 60 * 1000;

/** 日本時間の日付 "YYYY-MM-DD" */
export function jstDateKey(now = Date.now()): string {
  return new Date(now + JST).toISOString().slice(0, 10);
}

/** その日 (日本時間) の 0時 の時刻 (ms) */
export function jstDayStart(dateKey: string): number {
  return Date.parse(`${dateKey}T00:00:00Z`) - JST;
}

// ---- 決まった乱数 ----

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(xs: T[], r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- 時間割 ----

export interface Period {
  unit: string;
  /** すでに読んだ単元の復習コマ (学年の単元をぜんぶ読んだときだけ出る) */
  review: boolean;
}

/**
 * きょうの時間割。
 * 1. 学年の単元を教科ごとに分け、教科の中の順番と教科の順番を「日付＋学年」の乱数でシャッフルする。
 * 2. 教科を順に回って、各教科から「まだ読んでいない (またはきょう読んだ)」単元を1つずつ取る → 教科がばらける。
 *    きょう読んだ単元も候補に残すので、読み終えてもコマが入れかわらない。
 * 3. 4コマに足りないときは、前に読んだ単元を復習コマとして足す。
 */
export function buildTimetable(data: GakkoData, grade: string, dateKey: string, read: Record<string, number>): Period[] {
  const ids = data.byGrade[grade] ?? [];
  if (!ids.length) return [];
  const r = rng(hash(`${dateKey}|${grade}`));
  const bySubject = new Map<string, string[]>();
  for (const id of ids) {
    const s = data.units[id]?.s ?? "";
    bySubject.set(s, [...(bySubject.get(s) ?? []), id]);
  }
  const queues = shuffle([...bySubject.values()], r).map((q) => shuffle(q, r));
  const start = jstDayStart(dateKey);
  const fresh = (id: string) => !read[id] || read[id] >= start;

  const pick = (ok: (id: string) => boolean, taken: Set<string>, n: number): string[] => {
    const out: string[] = [];
    const pos = queues.map(() => 0);
    let moved = true;
    while (out.length < n && moved) {
      moved = false;
      for (let q = 0; q < queues.length && out.length < n; q++) {
        const list = queues[q];
        while (pos[q] < list.length && (taken.has(list[pos[q]]) || !ok(list[pos[q]]))) pos[q]++;
        if (pos[q] < list.length) {
          out.push(list[pos[q]]);
          taken.add(list[pos[q]]);
          pos[q]++;
          moved = true;
        }
      }
    }
    return out;
  };

  const taken = new Set<string>();
  const main = pick(fresh, taken, PERIODS).map((unit) => ({ unit, review: false }));
  const rest = pick(() => true, taken, PERIODS - main.length).map((unit) => ({ unit, review: true }));
  return [...main, ...rest];
}
