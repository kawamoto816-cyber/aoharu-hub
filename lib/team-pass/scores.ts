import { getOrCreateSubscription } from "@bluespring/aoharu-entitlements";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { setSetting } from "@/lib/social/store";
import { getTeamPass, TEAM_METADATA_KIND } from "./store";

// 塾・教室の先生用ダッシュボードに出す「単元模試・模試の得点」。
// 得点は生徒の端末（localStorage）にしか無いので、招待コードを入れた人の分だけ、端末からまとめて受け取って持つ。
// 保存先は app_settings の juku_scores:<userId>（1人1行・上書き）。新しいテーブルは作らない。
// 入れるのは、単元のID・回数・得点率・日付だけ。答えの中身は入れない。

export interface MoshiScore {
  /** 解いた回数 */
  c: number;
  /** 最高の得点率（0〜100） */
  best: number;
  /** 最後の得点率（0〜100） */
  last: number;
  /** 最後に解いた日（ISO） */
  at: string;
}
export interface ExamScore {
  title: string;
  at: string;
  score: number;
  total: number;
}
export interface ScoreSnap {
  at: string;
  moshi: Record<string, MoshiScore>;
  exams: ExamScore[];
}

const KEY = (userId: string) => `juku_scores:${userId}`;
const UNIT_RE = /^[a-z0-9-]{1,80}$/;
const MAX_UNITS = 1200;
const MAX_EXAMS = 30;
const int = (v: unknown, max: number) =>
  typeof v === "number" && Number.isFinite(v)
    ? Math.max(0, Math.min(max, Math.round(v)))
    : 0;
const iso = (v: unknown) =>
  typeof v === "string" && !Number.isNaN(Date.parse(v))
    ? new Date(v).toISOString()
    : "";

/** 端末から来たものを、決めた形だけにする（純粋な関数） */
export function cleanScores(body: unknown, now = new Date()): ScoreSnap {
  const b = (body && typeof body === "object" ? body : {}) as {
    moshi?: unknown;
    exams?: unknown;
  };
  const moshi: Record<string, MoshiScore> = {};
  if (b.moshi && typeof b.moshi === "object") {
    for (const [unit, v] of Object.entries(
      b.moshi as Record<string, unknown>,
    ).slice(0, MAX_UNITS)) {
      if (!UNIT_RE.test(unit) || !v || typeof v !== "object") continue;
      const r = v as Record<string, unknown>;
      const c = int(r.c, 9999);
      if (!c) continue;
      moshi[unit] = {
        c,
        best: int(r.best, 100),
        last: int(r.last, 100),
        at: iso(r.at),
      };
    }
  }
  const exams: ExamScore[] = [];
  if (Array.isArray(b.exams)) {
    for (const v of b.exams.slice(0, MAX_EXAMS)) {
      if (!v || typeof v !== "object") continue;
      const r = v as Record<string, unknown>;
      const total = int(r.total, 100000);
      const at = iso(r.at);
      if (!total || !at || typeof r.title !== "string") continue;
      exams.push({
        title: r.title.replace(/[\u0000-\u001f]/g, "").slice(0, 60),
        at,
        score: Math.min(total, int(r.score, 100000)),
        total,
      });
    }
  }
  return { at: now.toISOString(), moshi, exams };
}

/** いま、有効な招待コードの利用者か（そうでない人の得点は受け取らない） */
export async function isTeamMember(userId: string): Promise<boolean> {
  const row = await getOrCreateSubscription(userId);
  const price = row.stripe_price_id ?? "";
  const head = `${TEAM_METADATA_KIND}:`;
  if (!price.startsWith(head)) return false;
  const pass = await getTeamPass(price.slice(head.length));
  return (
    !!pass &&
    pass.users.includes(userId) &&
    Date.parse(pass.endsAt) > Date.now()
  );
}

export async function saveScores(
  userId: string,
  snap: ScoreSnap,
): Promise<void> {
  await setSetting(KEY(userId), JSON.stringify(snap));
}

/** 何人分かをまとめて読む。まだ届いていない人は入らない */
export async function loadScores(
  userIds: string[],
): Promise<Map<string, ScoreSnap>> {
  const out = new Map<string, ScoreSnap>();
  if (!userIds.length) return out;
  const { data, error } = await getSupabaseAdmin()
    .from("app_settings")
    .select("key,value")
    .in("key", userIds.map(KEY));
  if (error) throw new Error(`app_settings select: ${error.message}`);
  for (const x of (data ?? []) as { key: string; value: string }[]) {
    try {
      const v = JSON.parse(x.value) as ScoreSnap;
      out.set(x.key.slice("juku_scores:".length), {
        at: v.at ?? "",
        moshi: v.moshi ?? {},
        exams: v.exams ?? [],
      });
    } catch {
      // こわれた行は読まない
    }
  }
  return out;
}
