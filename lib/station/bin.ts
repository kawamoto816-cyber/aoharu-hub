// 学習便の「便」の決まりと、そこから決まること（純粋な関数だけ。DBにも画面にも触らない）。
//   ・今日の便／次の便の判定（日本時間。夜便＝月水木金 19:30、朝便＝日 9:00、火・土は運休）
//   ・1便の進行の段階（改札 → 点呼・宣言 → 第1コマ → 休憩 → 第2コマ → 休憩 → 第3コマ → 下車）
//   ・入力の検証（ニックネーム・学年・班・宣言・説明・ふり返り）
//   ・保護者へ送る文面（未着通知・当日報告・週報）の組み立て
// 時刻はすべてミリ秒（UTC）で受け取り、日本時間（UTC+9。夏時間なし）に直して数える。
// 見本データでの確認は scripts/station-bin-check.mjs。

export type Slot = "night" | "morning";
export type Team = "A" | "B" | "C" | "D";
export type Reflect = "done" | "half" | "not";

const MIN = 60 * 1000;
const DAY = 24 * 60 * MIN;
const JST = 9 * 60 * MIN;

/** 便の種類。days は曜日（0=日 … 6=土） */
export const SLOTS: Record<Slot, { name: string; days: readonly number[]; start: string }> = {
  night: { name: "夜便", days: [1, 3, 4, 5], start: "19:30" },
  morning: { name: "朝便", days: [0], start: "09:00" },
};

/** 試験運用の期間（この外の日は便が無い） */
export interface Period {
  from: string;
  to: string;
}
export const BIN_PERIOD: Period = { from: "2027-01-13", to: "2027-02-07" };
/** 第1週の月曜（週報の「第n週」の起点） */
export const FIRST_MONDAY = "2027-01-11";

/** 発車からの分。gate=改札が開く、late=未着の通知、lastBoard=途中乗車の締切、getoff=下車の開始、end=終着、grace=終着後も下車を受け付ける時間 */
export const BIN_MIN = { gate: -5, late: 5, lastBoard: 30, getoff: 80, end: 90, grace: 30 } as const;

export type StageKey = "gate" | "roll" | "koma1" | "rest1" | "koma2" | "rest2" | "koma3" | "getoff";
export const STAGES: readonly { key: StageKey; label: string; from: number; to: number; study: boolean }[] = [
  { key: "gate", label: "改札（乗車の受付）", from: -5, to: 0, study: false },
  { key: "roll", label: "点呼・「今日やること」の宣言", from: 0, to: 5, study: false },
  { key: "koma1", label: "第1コマ（25分）", from: 5, to: 30, study: true },
  { key: "rest1", label: "休憩（5分）", from: 30, to: 35, study: false },
  { key: "koma2", label: "第2コマ（25分）", from: 35, to: 60, study: true },
  { key: "rest2", label: "休憩（5分）", from: 60, to: 65, study: false },
  { key: "koma3", label: "第3コマ（15分）", from: 65, to: 80, study: true },
  { key: "getoff", label: "下車（説明とふり返り）", from: 80, to: 90, study: false },
];

export const TEAMS: readonly Team[] = ["A", "B", "C", "D"];
/** 班のホームルームの曜日（0=日 … 6=土） */
export const TEAM_DAY: Record<Team, number> = { A: 1, B: 3, C: 4, D: 5 };
export const GRADES: readonly string[] = ["中1", "中2", "中3"];
export const REFLECT_LABEL: Record<Reflect, string> = { done: "できた", half: "半分できた", not: "できなかった" };
const DOW = ["日", "月", "火", "水", "木", "金", "土"];

export const LIMIT = { nick: 20, planMin: 4, planMax: 80, explainMin: 10, explainMax: 400 } as const;

// ---------- 日付と時刻（日本時間） ----------

/** YYYY-MM-DD の形で、実在する日付か */
export function isDate(v: unknown): v is string {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const t = Date.parse(`${v}T00:00:00Z`);
  return Number.isFinite(t) && new Date(t).toISOString().slice(0, 10) === v;
}
export const isSlot = (v: unknown): v is Slot => v === "night" || v === "morning";
export const isTeam = (v: unknown): v is Team => typeof v === "string" && (TEAMS as readonly string[]).includes(v);
export const isReflect = (v: unknown): v is Reflect => v === "done" || v === "half" || v === "not";

/** その瞬間の日本時間の日付（YYYY-MM-DD） */
export const jstDate = (ms: number) => new Date(ms + JST).toISOString().slice(0, 10);
/** 今日の日付（日本時間） */
export const jstToday = () => jstDate(Date.now());
/** その瞬間の日本時間の時刻（H:MM。先頭の0は付けない） */
export function jstHm(ms: number): string {
  const d = new Date(ms + JST);
  return `${d.getUTCHours()}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}
/** 日付の曜日（0=日 … 6=土） */
export const dowOf = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay();
export const addDays = (date: string, n: number) => new Date(Date.parse(`${date}T00:00:00Z`) + n * DAY).toISOString().slice(0, 10);
/** その日を含む週の月曜 */
export const mondayOf = (date: string) => addDays(date, -((dowOf(date) + 6) % 7));
/** 「1月13日」 */
export const mdLabel = (date: string) => `${Number(date.slice(5, 7))}月${Number(date.slice(8, 10))}日`;
/** 「1月13日(水)」 */
export const mdwLabel = (date: string) => `${mdLabel(date)}(${DOW[dowOf(date)]})`;

// ---------- 便の判定 ----------

export interface Bin {
  date: string;
  slot: Slot;
  /** 夜便・朝便 */
  name: string;
  /** 発車の時刻（ミリ秒） */
  startMs: number;
}

/** その日に走る便の種類（運休日・期間の外は null）。period に null を渡すと期間を見ない */
export function slotOn(date: string, period: Period | null = BIN_PERIOD): Slot | null {
  if (!isDate(date)) return null;
  if (period && (date < period.from || date > period.to)) return null;
  const dow = dowOf(date);
  for (const slot of ["night", "morning"] as const) if (SLOTS[slot].days.includes(dow)) return slot;
  return null;
}

/** 日付と便の種類から便を作る（曜日は見ない。社内画面で任意の日を開けるように） */
export function binOf(date: string, slot: Slot): Bin {
  return { date, slot, name: SLOTS[slot].name, startMs: Date.parse(`${date}T${SLOTS[slot].start}:00+09:00`) };
}

export const atMin = (bin: Bin, min: number) => bin.startMs + min * MIN;

/**
 * いまの便と次の便。
 * current＝改札が開いてから、終着の30分後まで（下車の入力を受け付けるあいだ）の便。
 * next＝これから改札が開く、いちばん近い便（今日の便が始まる前なら今日の便）。期間が終わっていれば null。
 */
export function findBins(nowMs: number, period: Period | null = BIN_PERIOD): { current: Bin | null; next: Bin | null } {
  let current: Bin | null = null;
  let next: Bin | null = null;
  const today = jstDate(nowMs);
  const first = period && today < period.from ? period.from : today;
  for (let i = 0; i < 14 && !next; i++) {
    const date = addDays(first, i);
    if (period && date > period.to) break;
    const slot = slotOn(date, period);
    if (!slot) continue;
    const bin = binOf(date, slot);
    if (nowMs < atMin(bin, BIN_MIN.gate)) next = bin;
    else if (nowMs < atMin(bin, BIN_MIN.end + BIN_MIN.grace)) current = bin;
  }
  return { current, next };
}

// ---------- 進行の段階 ----------

export interface StageNow {
  /** before＝改札前、after＝終着後（下車の入力だけできる）、closed＝受付終了 */
  key: StageKey | "before" | "after" | "closed";
  label: string;
  /** この段階が終わる時刻（ミリ秒）。closed では null */
  endsMs: number | null;
  /** 残りの秒（切り上げ）。closed では 0 */
  remainSec: number;
  /** 学習するコマか */
  study: boolean;
}

export function stageAt(bin: Bin, nowMs: number): StageNow {
  const make = (key: StageNow["key"], label: string, endsMs: number | null, study = false): StageNow => ({
    key,
    label,
    endsMs,
    remainSec: endsMs === null ? 0 : Math.max(0, Math.ceil((endsMs - nowMs) / 1000)),
    study,
  });
  if (nowMs < atMin(bin, BIN_MIN.gate)) return make("before", "改札前", atMin(bin, BIN_MIN.gate));
  for (const s of STAGES) if (nowMs < atMin(bin, s.to)) return make(s.key, s.label, atMin(bin, s.to), s.study);
  if (nowMs < atMin(bin, BIN_MIN.end + BIN_MIN.grace)) return make("after", "終着（下車の入力を受け付けています）", atMin(bin, BIN_MIN.end + BIN_MIN.grace));
  return make("closed", "この便は終わりました", null);
}

/** 乗車（チェックイン）できるか。early＝改札前、closed＝途中乗車の締切のあと */
export function checkinGate(bin: Bin, nowMs: number): "ok" | "early" | "closed" {
  if (nowMs < atMin(bin, BIN_MIN.gate)) return "early";
  return nowMs <= atMin(bin, BIN_MIN.lastBoard) ? "ok" : "closed";
}

/** 下車できるか。early＝下車の時刻の前、closed＝終着の30分後を過ぎた */
export function checkoutGate(bin: Bin, nowMs: number): "ok" | "early" | "closed" {
  if (nowMs < atMin(bin, BIN_MIN.getoff)) return "early";
  return nowMs < atMin(bin, BIN_MIN.end + BIN_MIN.grace) ? "ok" : "closed";
}

/** 発車から何分遅れて乗ったか（発車前なら0。秒は切り捨て） */
export const lateMin = (bin: Bin, checkinMs: number) => Math.max(0, Math.floor((checkinMs - bin.startMs) / MIN));

/** 便の中にいた分（発車前と終着後は数えない。四捨五入） */
export function rideMin(bin: Bin, checkinMs: number, checkoutMs: number): number {
  const from = Math.max(checkinMs, bin.startMs);
  const to = Math.min(checkoutMs, atMin(bin, BIN_MIN.end));
  return Math.max(0, Math.round((to - from) / MIN));
}

/** 完走＝未着通知の時刻（発車5分後）までに乗り、下車の時刻（発車80分後）以降に下車した */
export const isFullRide = (bin: Bin, checkinMs: number, checkoutMs: number) => checkinMs <= atMin(bin, BIN_MIN.late) && checkoutMs >= atMin(bin, BIN_MIN.getoff);

/** その日が班のホームルームの日か（夜便だけ） */
export const isHomeroom = (team: string, bin: Bin) => bin.slot === "night" && isTeam(team) && TEAM_DAY[team] === dowOf(bin.date);

// ---------- 入力の検証 ----------

/** 制御文字を落として前後の空白を取る。改行は1つの空白にする */
export function cleanLine(v: unknown): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
const len = (s: string) => [...s].length;

export type Checked<T> = { ok: true; value: T } | { ok: false; error: string };

export function checkProfile(input: { nick?: unknown; grade?: unknown; team?: unknown }): Checked<{ nick: string; grade: string; team: Team }> {
  const nick = cleanLine(input.nick);
  if (len(nick) < 1 || len(nick) > LIMIT.nick) return { ok: false, error: `ニックネームは1〜${LIMIT.nick}文字で入れてください（本名は使いません）。` };
  if (typeof input.grade !== "string" || !GRADES.includes(input.grade)) return { ok: false, error: "学年を選んでください。" };
  if (!isTeam(input.team)) return { ok: false, error: "班を選んでください。" };
  return { ok: true, value: { nick, grade: input.grade, team: input.team } };
}

export function checkPlan(input: unknown): Checked<string> {
  const plan = cleanLine(input);
  if (len(plan) < LIMIT.planMin) return { ok: false, error: `「今日やること」は${LIMIT.planMin}文字以上で書いてください。` };
  if (len(plan) > LIMIT.planMax) return { ok: false, error: `「今日やること」は${LIMIT.planMax}文字までです。` };
  return { ok: true, value: plan };
}

export function checkCheckout(input: { explain?: unknown; reflect?: unknown }): Checked<{ explain: string; reflect: Reflect }> {
  const explain = cleanLine(input.explain);
  if (len(explain) < LIMIT.explainMin) return { ok: false, error: `今日学んだことの説明は${LIMIT.explainMin}文字以上で書いてください。` };
  if (len(explain) > LIMIT.explainMax) return { ok: false, error: `説明は${LIMIT.explainMax}文字までです。` };
  if (!isReflect(input.reflect)) return { ok: false, error: "ふり返りを選んでください。" };
  return { ok: true, value: { explain, reflect: input.reflect } };
}

// ---------- 保護者へ送る文面 ----------

const HEAD = "【アオハル 学習便】";
const nickOf = (nick: string) => nick || "（ニックネーム未設定）";

/** 未着通知 */
export function absentText(nick: string, bin: Bin): string {
  return `${HEAD}${nickOf(nick)}さんが、予約の${bin.name}（${jstHm(bin.startMs)}発）にまだ乗車していません。このあと${jstHm(atMin(bin, BIN_MIN.lastBoard))}までは途中乗車できます。お休みの場合は「休み」とご返信ください。今週の別の便へ振り替えます。`;
}

export interface DailyInput {
  /** 乗車の時刻（ミリ秒） */
  checkinMs: number;
  /** 下車の時刻（ミリ秒）。まだなら null */
  checkoutMs: number | null;
  plan: string;
  explain: string;
  solved: number;
  correct: number;
  points: number;
}

/** 当日報告 */
export function dailyText(bin: Bin, r: DailyInput): string {
  const ride =
    r.checkoutMs === null
      ? `${jstHm(r.checkinMs)}〜（下車の記録なし）`
      : `${jstHm(r.checkinMs)}〜${jstHm(r.checkoutMs)}（${rideMin(bin, r.checkinMs, r.checkoutMs)}分${isFullRide(bin, r.checkinMs, r.checkoutMs) ? "・完走" : ""}）`;
  return [
    `${HEAD}${mdLabel(bin.date)} ${bin.name}の報告です。`,
    `乗車：${ride}`,
    `宣言：${r.plan || "（宣言なし）"}`,
    `結果：${r.solved}問を解き${r.correct}問正解。学びポイント${r.points}`,
    `説明：${r.explain ? `「${r.explain}」` : "（説明なし）"}`,
    "次の予約：【　】",
  ].join("\n");
}

/** 第n週（1月11日の週が第1週）。起点より前は0以下になる */
export const weekNo = (monday: string) => Math.round((Date.parse(`${monday}T00:00:00Z`) - Date.parse(`${FIRST_MONDAY}T00:00:00Z`)) / (7 * DAY)) + 1;

/** 分を「4.5」時間の形に（小数1けた。ちょうどなら小数なし） */
export const hoursLabel = (min: number) => String(Math.round(min / 6) / 10);

export interface WeeklyInput {
  nick: string;
  team: string;
  /** 乗車した便の数 */
  rides: number;
  /** 便の中にいた分の合計 */
  minutes: number;
  solved: number;
  correct: number;
  moshi: number;
  /** 進んだ単元の名前 */
  units: string[];
}

/** 週報 */
export function weeklyText(monday: string, w: WeeklyInput): string {
  return [
    `${HEAD}${nickOf(w.nick)}さんの第${weekNo(monday)}週の記録です。`,
    `乗車：${w.rides}便。合計${hoursLabel(w.minutes)}時間`,
    `学習量：${w.solved}問を解き${w.correct}問正解。単元模試${w.moshi}回`,
    `進んだ単元：${w.units.length ? w.units.join("、") : "（記録なし）"}`,
    `班：${w.team ? `${w.team}班` : "（未設定）"}`,
    "来週の予約：【　】",
    "予約の変更はこのメッセージへの返信で承ります。",
  ].join("\n");
}
