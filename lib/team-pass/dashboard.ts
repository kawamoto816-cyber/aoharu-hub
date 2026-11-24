import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
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

export async function loadDashboard(pass: TeamPass, now = Date.now()): Promise<Dashboard> {
  const users = pass.users.slice(0, 200);
  const rows = new Map<string, StudentRow>(
    users.map((u, i) => [
      u,
      { no: i + 1, name: pass.names?.[u] || `${i + 1}人目`, tensaku: 0, mensetsu: 0, otherAi: 0, solved: 0, correct: 0, moshi: 0, units: 0, cards: 0, week: 0, last: null },
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
    const { data, error } = await db.from("usage_log").select("user_id,app_key,created_at").in("user_id", users).order("created_at", { ascending: false }).limit(20000);
    if (error) throw error;
    for (const x of (data ?? []) as { user_id: string; app_key: string; created_at: string }[]) {
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
    const { data, error } = await db.from("station_learn_log").select("user_id,at,unit,solved,correct,moshi").in("user_id", users).order("at", { ascending: false }).limit(20000);
    if (error) throw error;
    const unitSet = new Map<string, Set<string>>();
    for (const x of (data ?? []) as { user_id: string; at: string; unit: string; solved: number; correct: number; moshi: number }[]) {
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
    const { data, error } = await db.from("learn_progress").select("user_id,updated_at").in("user_id", users).limit(20000);
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

  return { rows: [...rows.values()], missing };
}
