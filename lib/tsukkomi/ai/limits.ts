import "server-only";
import { APP_KEYS } from "@/lib/aoharu-entitlements";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { NAZE_LIMITS, type NazeViewer } from "@/lib/naze/limits";

// ツッコミAIの回数（2026-11-04 代表承認）。表はなぜなぜ先生と同じ（lib/naze/limits.ts の NAZE_LIMITS）。
// 数えるのは「判定1回」（AIが判定を返せた回だけ。JSONの頼み直しは1回と数える。失敗した回は数えない）。
//
//   登録なし   1日5回（IPのハッシュ。同じインスタンスの中だけの数え方。なぜなぜ先生とは別に数える）
//   無料登録   1日10回
//   Pro・Max   1日30回
//
// 登録ずみは usage_log（app_key "tsukkomi"・action "judge"、metadata は単元idと問題idだけ）を数える。数えられないとき（Supabase 不通）は通す。
// 見る人の判定（tier）は getNazeViewer を使い回す。費用の安全弁として、AIを呼ぶ回数の全体の上限（TSUKKOMI_DAILY_CALL_CAP、既定 3000/日）も付ける。

export const TSUKKOMI_APP = APP_KEYS.TSUKKOMI;
export const TSUKKOMI_LIMITS = NAZE_LIMITS;

function jstDay(): string {
  return new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);
}
const jstStartIso = () => new Date(`${jstDay()}T00:00:00+09:00`).toISOString();

const guestJudges = new Map<string, { day: string; n: number }>();

async function usedToday(v: NazeViewer): Promise<number> {
  if (v.userId) {
    try {
      const { count, error } = await getSupabaseAdmin()
        .from("usage_log")
        .select("*", { count: "exact", head: true })
        .eq("user_id", v.userId)
        .eq("app_key", TSUKKOMI_APP)
        .eq("action", "judge")
        .gte("created_at", jstStartIso());
      if (error) throw new Error(error.message);
      return count ?? 0;
    } catch (e) {
      console.warn("[tsukkomi] count skipped:", e instanceof Error ? e.message : e);
      return 0;
    }
  }
  const c = v.guestKey ? guestJudges.get(v.guestKey) : undefined;
  return c && c.day === jstDay() ? c.n : 0;
}

export async function tsukkomiRemaining(v: NazeViewer): Promise<{ limit: number; remaining: number }> {
  const limit = TSUKKOMI_LIMITS[v.tier];
  return { limit, remaining: Math.max(0, limit - (await usedToday(v))) };
}

/** 判定を1回数える（判定を返せたあとに呼ぶ） */
export async function countJudge(v: NazeViewer, unit: string, id: string): Promise<number> {
  const { remaining } = await tsukkomiRemaining(v);
  if (v.userId) {
    try {
      await getSupabaseAdmin().from("usage_log").insert({ user_id: v.userId, app_key: TSUKKOMI_APP, action: "judge", metadata: { unit, id } });
    } catch {
      /* 記録の失敗で本体は止めない */
    }
  } else if (v.guestKey) {
    const day = jstDay();
    const c = guestJudges.get(v.guestKey);
    guestJudges.set(v.guestKey, { day, n: c && c.day === day ? c.n + 1 : 1 });
    if (guestJudges.size > 50_000) for (const [k, x] of guestJudges) if (x.day !== day) guestJudges.delete(k);
  }
  return Math.max(0, remaining - 1);
}

// ---------- 全体の上限（AIを呼ぶ回数） ----------
let global = { day: "", n: 0 };
export function takeGlobalCall(): boolean {
  const day = jstDay();
  if (global.day !== day) global = { day, n: 0 };
  if (global.n >= Number(process.env.TSUKKOMI_DAILY_CALL_CAP ?? "3000")) return false;
  global.n += 1;
  return true;
}
