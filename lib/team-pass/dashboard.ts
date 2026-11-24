import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { LEVELS } from "@/lib/school";
import { loadScores, type ExamScore } from "./scores";
import type { TeamPass } from "./store";

// 塾・教室の先生用ダッシュボード (/juku/dashboard) の数字を作る。
// 見せるのは、招待コードを入れた人の「名前（本人が決めたもの）」と「回数」だけ。書いた文章の中身・メールアドレスは読まない。
//  - 添削・面接練習・そのほかのAIの利用：usage_log（app_key と日時）
//  - 問題を解いた数・正解・単元模試：station_learn_log（端末の記録から送られる差分。docs/station-log.sql）
//  - 覚えたカード：learn_progress
// どれかが読めなくても、読めた分だけで表を出す。

export interface StudentRow {
  /** 表での並び（コードを入れた順） */
  no: number;
  name: string;
  tensaku: number;
  mensetsu: number;
  otherAi: number;
  solved: number;
  correct: number;
  moshi: number;
  units: number;
  cards: number;
  /** 単元模試の最高点の平均（%）。得点がまだ届いていなければ null */
  moshiAvg: number | null;
  /** 直近7日の、添削＋面接＋解いた問題 */
  week: number;
  /** いちばん新しい利用（ISO）。まだ無ければ null */
  last: string | null;
}

export interface Dashboard {
  rows: StudentRow[];
  /** 読めなかった表（画面に小さく出す） */
  missing: string[];
}

const TENSAKU = new Set(["tensakun", "shiboriyu"]);
const MENSETSU = new Set(["mensatsu"]);
const WEEK = 7 * 86400000;

export async function loadDashboard(
  pass: TeamPass,
  now = Date.now(),
): Promise<Dashboard> {
  const users = pass.users.slice(0, 200);
  const rows = new Map<string, StudentRow>(
    users.map((u, i) => [
      u,
      {
        no: i + 1,
        name: pass.names?.[u] || `${i + 1}人目`,
        tensaku: 0,
        mensetsu: 0,
        otherAi: 0,
        solved: 0,
        correct: 0,
        moshi: 0,
        units: 0,
        cards: 0,
        moshiAvg: null,
        week: 0,
        last: null,
      },
    ]),
  );
  const missing: string[] = [];
  if (!users.length) return { rows: [], missing };
  const touch = (r: StudentRow, at: string, n: number) => {
    if (!r.last || at > r.last) r.last = at;
    if (now - Date.parse(at) < WEEK) r.week += n;
  };
  const db = getSupabaseAdmin();

  try {
    const { data, error } = await db
      .from("usage_log")
      .select("user_id,app_key,created_at")
      .in("user_id", users)
      .order("created_at", { ascending: false })
      .limit(20000);
    if (error) throw error;
    for (const x of (data ?? []) as {
      user_id: string;
      app_key: string;
      created_at: string;
    }[]) {
      const r = rows.get(x.user_id);
      if (!r) continue;
      if (TENSAKU.has(x.app_key)) r.tensaku++;
      else if (MENSETSU.has(x.app_key)) r.mensetsu++;
      else r.otherAi++;
      touch(r, x.created_at, 1);
    }
  } catch {
    missing.push("AIの利用");
  }

  try {
    const { data, error } = await db
      .from("station_learn_log")
      .select("user_id,at,unit,solved,correct,moshi")
      .in("user_id", users)
      .order("at", { ascending: false })
      .limit(20000);
    if (error) throw error;
    const unitSet = new Map<string, Set<string>>();
    for (const x of (data ?? []) as {
      user_id: string;
      at: string;
      unit: string;
      solved: number;
      correct: number;
      moshi: number;
    }[]) {
      const r = rows.get(x.user_id);
      if (!r) continue;
      r.solved += x.solved;
      r.correct += x.correct;
      r.moshi += x.moshi;
      const set = unitSet.get(x.user_id) ?? new Set<string>();
      set.add(x.unit);
      unitSet.set(x.user_id, set);
      touch(r, x.at, x.solved);
    }
    for (const [u, set] of unitSet) rows.get(u)!.units = set.size;
  } catch {
    missing.push("学習の記録");
  }

  try {
    const { data, error } = await db
      .from("learn_progress")
      .select("user_id,updated_at")
      .in("user_id", users)
      .limit(20000);
    if (error) throw error;
    for (const x of (data ?? []) as { user_id: string; updated_at: string }[]) {
      const r = rows.get(x.user_id);
      if (!r) continue;
      r.cards++;
      touch(r, x.updated_at, 0);
    }
  } catch {
    missing.push("カード");
  }

  try {
    for (const [u, snap] of await loadScores(users)) {
      const r = rows.get(u);
      const bests = Object.values(snap.moshi).map((m) => m.best);
      if (!r || !bests.length) continue;
      r.moshiAvg = Math.round(bests.reduce((a, b) => a + b, 0) / bests.length);
      r.moshi = Math.max(
        r.moshi,
        Object.values(snap.moshi).reduce((a, m) => a + m.c, 0),
      );
    }
  } catch {
    missing.push("模試の得点");
  }

  return { rows: [...rows.values()], missing };
}

// ---- 生徒ひとりの内訳（/juku/dashboard?k=…&s=<番号>） ----

export interface UnitRow {
  unit: string;
  /** 単元の名前（一覧に無いIDは、IDのまま） */
  name: string;
  /** 例：中学校・数学・中2 */
  where: string;
  solved: number;
  correct: number;
  /** 単元模試の回数・最高・最後の得点率（得点がまだ届いていなければ null） */
  moshi: number;
  best: number | null;
  lastPct: number | null;
  /** いちばん新しい日（ISO） */
  last: string | null;
}

export interface StudentDetail {
  no: number;
  name: string;
  units: UnitRow[];
  exams: ExamScore[];
  /** 得点（単元模試・模試）が端末から届いた日。まだなら null */
  scoresAt: string | null;
  missing: string[];
}

let unitInfo: Map<string, { name: string; where: string }> | null = null;
function unitInfoOf(unit: string) {
  if (!unitInfo) {
    unitInfo = new Map();
    for (const l of LEVELS)
      for (const s of l.subjects)
        for (const g of s.groups)
          for (const u of g.units)
            unitInfo.set(u.id, {
              name: u.name,
              where: `${l.name}・${s.name}・${g.title}`,
            });
  }
  return unitInfo.get(unit) ?? { name: unit, where: "" };
}

/** 弱い単元の目安：5問以上解いて、正解が6割に届かない */
export const isWeak = (u: UnitRow) =>
  u.solved >= 5 && u.correct / u.solved < 0.6;

export async function loadStudentDetail(
  pass: TeamPass,
  no: number,
): Promise<StudentDetail | null> {
  const userId = pass.users[no - 1];
  if (!userId) return null;
  const missing: string[] = [];
  const units = new Map<string, UnitRow>();
  const row = (unit: string): UnitRow => {
    let r = units.get(unit);
    if (!r) {
      r = {
        unit,
        ...unitInfoOf(unit),
        solved: 0,
        correct: 0,
        moshi: 0,
        best: null,
        lastPct: null,
        last: null,
      };
      units.set(unit, r);
    }
    return r;
  };
  const newer = (r: UnitRow, at: string) => {
    if (at && (!r.last || at > r.last)) r.last = at;
  };

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("station_learn_log")
      .select("at,unit,solved,correct,moshi")
      .eq("user_id", userId)
      .order("at", { ascending: false })
      .limit(20000);
    if (error) throw error;
    for (const x of (data ?? []) as {
      at: string;
      unit: string;
      solved: number;
      correct: number;
      moshi: number;
    }[]) {
      const r = row(x.unit);
      r.solved += x.solved;
      r.correct += x.correct;
      r.moshi += x.moshi;
      newer(r, x.at);
    }
  } catch {
    missing.push("学習の記録");
  }

  let exams: ExamScore[] = [];
  let scoresAt: string | null = null;
  try {
    const snap = (await loadScores([userId])).get(userId);
    if (snap) {
      scoresAt = snap.at || null;
      exams = [...snap.exams].sort((a, b) => (a.at < b.at ? 1 : -1));
      for (const [unit, m] of Object.entries(snap.moshi)) {
        const r = row(unit);
        r.moshi = Math.max(r.moshi, m.c);
        r.best = m.best;
        r.lastPct = m.last;
        newer(r, m.at);
      }
    }
  } catch {
    missing.push("模試の得点");
  }

  const list = [...units.values()].sort((a, b) =>
    (a.last ?? "") < (b.last ?? "") ? 1 : -1,
  );
  return {
    no,
    name: pass.names?.[userId] || `${no}人目`,
    units: list,
    exams,
    scoresAt,
    missing,
  };
}
