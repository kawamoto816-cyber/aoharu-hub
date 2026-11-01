import { LEVELS } from "@/lib/school";
import { getLecture } from "@/lib/lecture";
import type { Figure } from "@/lib/lecture/types";
import { REGISTRY } from "./registry";
import { isFigureRef, type Daimon, type Exam, type FigureOrRef, type Item, type Material } from "./types";

// 定期テスト模試 (/learn/moshi)。大問を足すときは data/<単元id>.ts を書いて
//   npx tsx scripts/gen-moshi.ts   (registry.ts を作り直す)
//   npx tsx scripts/check-moshi.ts (配点・検算・図の参照・単元id を確かめる)
// サーバー側で使う (レクチャーの全データを読むので、クライアントの部品からは import しない)。

export const MOSHI_HOME = "/learn/moshi";
/** 1回分の時間の目安 (分) */
export const EXAM_MINUTES = 50;

export const DAIMON: Daimon[] = Object.values(REGISTRY).flat();
const BY_ID = new Map(DAIMON.map((d) => [d.id, d]));

export const getDaimon = (id: string) => BY_ID.get(id);

/** 単元の大問 (units にその単元を含むもの。ファイルの単元が先) */
export function daimonOfUnit(unit: string): Daimon[] {
  const own = REGISTRY[unit] ?? [];
  const other = DAIMON.filter((d) => !own.includes(d) && d.units.includes(unit));
  return [...own, ...other];
}
export const hasMoshi = (unit: string) => daimonOfUnit(unit).length > 0;
export const moshiHref = (units: string[]) => `${MOSHI_HOME}/play?units=${units.map(encodeURIComponent).join(",")}`;

// ---- 学校の地図から引く単元の情報 ----

export interface MoshiUnitInfo {
  id: string;
  name: string;
  /** 学年・科目 (中1) */
  group: string;
  subject: string;
  level: string;
  /** 地図の並び順 */
  order: number;
  /** 単元のページ (地図の href)。なければ "" */
  href: string;
  /** 小1・小2 (ひらがな多め) */
  kids: boolean;
}

const INFO = new Map<string, MoshiUnitInfo>();
{
  let order = 0;
  for (const l of LEVELS)
    for (const s of l.subjects)
      for (const g of s.groups)
        for (const u of g.units)
          INFO.set(u.id, {
            id: u.id,
            name: u.name,
            group: g.title,
            subject: s.name,
            level: l.name,
            order: order++,
            href: u.href ?? "",
            kids: l.key === "sho" && (g.title === "小1" || g.title === "小2"),
          });
}
export const moshiUnitInfo = (unit: string) => INFO.get(unit);
export const unitExists = (unit: string) => INFO.has(unit);

/** /learn/moshi の一覧: 大問が1つ以上ある単元をふくむ「学校段階・教科・学年」だけを、その学年の全単元つきで返す */
export function moshiCatalog() {
  return LEVELS.map((l) => ({
    key: l.key,
    name: l.name,
    subjects: l.subjects
      .map((s) => ({
        key: s.key,
        name: s.name,
        groups: s.groups
          .map((g) => ({ title: g.title, units: g.units.map((u) => ({ id: u.id, name: u.name, count: daimonOfUnit(u.id).length })) }))
          .filter((g) => g.units.some((u) => u.count > 0)),
      }))
      .filter((s) => s.groups.length > 0),
  })).filter((l) => l.subjects.length > 0);
}

// ---- 1回分を組む ----

/**
 * 範囲 (単元 id の並び) から1回分を組む。単元ごとに1つずつ順番に大問を取り (基本の大問が先)、
 * 想定時間の合計が EXAM_MINUTES をこえる手前で止める (どの単元からも最低1つは出す)。並びは地図の単元順。
 */
export function buildExam(units: string[], maxMinutes = EXAM_MINUTES): Exam | null {
  const us = [...new Set(units)].filter((u) => hasMoshi(u)).sort((a, b) => (INFO.get(a)?.order ?? 0) - (INFO.get(b)?.order ?? 0));
  if (us.length === 0) return null;
  const queues = us.map((u) => [...daimonOfUnit(u)].sort((a, b) => a.level - b.level));
  const picked: Daimon[] = [];
  let minutes = 0;
  for (let round = 0; ; round++) {
    let added = false;
    for (const q of queues) {
      const d = q.find((x) => !picked.includes(x));
      if (!d) continue;
      if (round > 0 && minutes + d.minutes > maxMinutes) continue;
      picked.push(d);
      minutes += d.minutes;
      added = true;
    }
    if (!added) break;
  }
  const ord = (d: Daimon) => us.indexOf(d.units[0]) * 1000 + DAIMON.indexOf(d);
  picked.sort((a, b) => ord(a) - ord(b));
  const first = picked[0];
  const info = INFO.get(us[0]);
  const names = us.map((u) => INFO.get(u)?.name ?? u);
  return {
    id: `auto:${us.join(",")}`,
    title: `${info ? `${info.group}${info.subject}` : ""}「${names.join("・")}」テスト模試`,
    subject: first.subject,
    grade: first.grade,
    kind: us.length === 1 ? "tangen" : "teiki",
    units: [...new Set(picked.flatMap((d) => d.units))],
    minutes: Math.max(minutes, 5),
    total: picked.reduce((a, d) => a + d.points, 0),
    daimon: picked.map((d) => d.id),
  };
}

// ---- 図の参照をほどく (画面に渡す前に、FigureRef をレクチャーの Figure に置きかえる) ----

export function resolveFigure(f: FigureOrRef | undefined): Figure | undefined {
  if (!f) return undefined;
  if (!isFigureRef(f)) return f;
  const fig = getLecture(f.ref.unit)?.sections[f.ref.section]?.figure;
  if (!fig) return undefined;
  return f.title ? { ...fig, title: f.title } : fig;
}

function resolveMaterial(m: Material): Material | null {
  if (m.kind !== "figure") return m;
  const figure = resolveFigure(m.figure);
  return figure ? { ...m, figure } : null;
}

function resolveItem(it: Item): Item {
  return {
    ...it,
    figure: resolveFigure(it.figure),
    steps: it.steps.map((s) => ({ ...s, figure: resolveFigure(s.figure) })),
  };
}

/** 図の参照をほどいた大問 (クライアントの部品にそのまま渡せる。FigureRef は残らない) */
export function resolveDaimon(d: Daimon): Daimon {
  return {
    ...d,
    material: d.material?.map(resolveMaterial).filter((m): m is Material => m !== null),
    items: d.items.map(resolveItem),
  };
}
