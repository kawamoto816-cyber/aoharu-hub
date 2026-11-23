import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { BIN_PERIOD, findBins, isDate, type Bin, type Period, type Reflect, type Slot, type Team } from "@/lib/station/bin";

// 学習便の乗車記録と班の保存 (Supabase: station_bin_rides / station_members.team、定義は docs/station-bin.sql)。
// テーブルがまだ無いなど読み書きできないときは null / false を返し、画面側はそのまま動き続ける。
// 時刻はここで決める（サーバーの時計）。画面から送られた時刻は受け取らない。

export interface BinMember {
  user_id: string;
  nick: string;
  grade: string;
  team: string;
}

export interface RideRow {
  user_id: string;
  bin_date: string;
  slot: Slot;
  checkin_at: string;
  plan: string;
  checkout_at: string | null;
  explain: string;
  reflect: string;
}

const RIDE_COLS = "user_id,bin_date,slot,checkin_at,plan,checkout_at,explain,reflect";

/** 便のある期間。本番前の通し練習のために、環境変数 STATION_BIN_FROM / STATION_BIN_TO（YYYY-MM-DD）で広げられる */
export function binPeriod(): Period {
  const from = process.env.STATION_BIN_FROM;
  const to = process.env.STATION_BIN_TO;
  return { from: isDate(from) ? from : BIN_PERIOD.from, to: isDate(to) ? to : BIN_PERIOD.to };
}

export async function getMember(userId: string): Promise<BinMember | null> {
  try {
    const { data, error } = await getSupabaseAdmin().from("station_members").select("user_id,nick,grade,team").eq("user_id", userId).maybeSingle();
    if (error || !data) return null;
    return data as BinMember;
  } catch {
    return null;
  }
}

export async function saveProfile(userId: string, p: { nick: string; grade: string; team: Team }): Promise<boolean> {
  try {
    const { error } = await getSupabaseAdmin()
      .from("station_members")
      .upsert({ user_id: userId, nick: p.nick, grade: p.grade, team: p.team, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    return !error;
  } catch {
    return false;
  }
}

/** その便の自分の乗車記録。無ければ null、読めなければ undefined */
export async function getRide(userId: string, bin: Bin): Promise<RideRow | null | undefined> {
  try {
    const { data, error } = await getSupabaseAdmin().from("station_bin_rides").select(RIDE_COLS).eq("user_id", userId).eq("bin_date", bin.date).eq("slot", bin.slot).maybeSingle();
    if (error) return undefined;
    return (data as RideRow | null) ?? null;
  } catch {
    return undefined;
  }
}

/** 乗車する。すでに乗っていれば何も変えない（最初の乗車時刻を残す） */
export async function checkin(userId: string, bin: Bin, now: Date): Promise<boolean> {
  try {
    const { error } = await getSupabaseAdmin()
      .from("station_bin_rides")
      .upsert({ user_id: userId, bin_date: bin.date, slot: bin.slot, checkin_at: now.toISOString() }, { onConflict: "user_id,bin_date,slot", ignoreDuplicates: true });
    return !error;
  } catch {
    return false;
  }
}

/** 「今日やること」を宣言する（1便に1回。下車のあとは変えられない）。書けた行が無ければ false */
export async function declarePlan(userId: string, bin: Bin, plan: string): Promise<boolean> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("station_bin_rides")
      .update({ plan })
      .eq("user_id", userId)
      .eq("bin_date", bin.date)
      .eq("slot", bin.slot)
      .eq("plan", "")
      .is("checkout_at", null)
      .select("user_id");
    return !error && (data?.length ?? 0) > 0;
  } catch {
    return false;
  }
}

/** 下車する（1便に1回）。書けた行が無ければ false */
export async function checkout(userId: string, bin: Bin, now: Date, v: { explain: string; reflect: Reflect }): Promise<boolean> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("station_bin_rides")
      .update({ checkout_at: now.toISOString(), explain: v.explain, reflect: v.reflect })
      .eq("user_id", userId)
      .eq("bin_date", bin.date)
      .eq("slot", bin.slot)
      .is("checkout_at", null)
      .select("user_id");
    return !error && (data?.length ?? 0) > 0;
  } catch {
    return false;
  }
}

export interface RideView {
  checkinAt: number;
  plan: string;
  checkoutAt: number | null;
  explain: string;
  reflect: string;
}

export interface BinState {
  signedIn: true;
  /** サーバーの現在時刻（ミリ秒）。画面の残り時間はこれを基準に数える */
  now: number;
  /** 乗車記録を読めたか（テーブルが無いときは false） */
  ready: boolean;
  member: { nick: string; grade: string; team: string } | null;
  current: Bin | null;
  next: Bin | null;
  ride: RideView | null;
}

/** 生徒の画面に返す、いまの状態 */
export async function loadState(userId: string, now = new Date()): Promise<BinState> {
  const { current, next } = findBins(now.getTime(), binPeriod());
  const [member, row] = await Promise.all([getMember(userId), current ? getRide(userId, current) : Promise.resolve(null)]);
  return {
    signedIn: true,
    now: now.getTime(),
    ready: row !== undefined,
    member: member ? { nick: member.nick, grade: member.grade, team: member.team ?? "" } : null,
    current,
    next,
    ride: row
      ? { checkinAt: Date.parse(row.checkin_at), plan: row.plan, checkoutAt: row.checkout_at ? Date.parse(row.checkout_at) : null, explain: row.explain, reflect: row.reflect }
      : null,
  };
}

// ---------- 社内画面用 ----------

/** 登録している全員。読めなければ null */
export async function listMembers(): Promise<BinMember[] | null> {
  try {
    const { data, error } = await getSupabaseAdmin().from("station_members").select("user_id,nick,grade,team").limit(2000);
    if (error) return null;
    return ((data ?? []) as BinMember[]).map((m) => ({ ...m, team: m.team ?? "" }));
  } catch {
    return null;
  }
}

/** 日付の範囲（両端を含む）の乗車記録。slot を渡すとその便だけ。読めなければ null */
export async function listRides(fromDate: string, toDate: string, slot?: Slot): Promise<RideRow[] | null> {
  try {
    let q = getSupabaseAdmin().from("station_bin_rides").select(RIDE_COLS).gte("bin_date", fromDate).lte("bin_date", toDate);
    if (slot) q = q.eq("slot", slot);
    const { data, error } = await q.order("checkin_at", { ascending: true }).limit(5000);
    if (error) return null;
    return (data ?? []) as RideRow[];
  } catch {
    return null;
  }
}
