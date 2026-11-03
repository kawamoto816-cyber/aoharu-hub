// 入試モード・共通テストモード (/learn/exam) の回数の決まり (2026-11-04 承認のプランの決まり)。画面とサーバーの両方から使う。
//   登録なし   … 1回分の体験 (端末の localStorage で数える。EXAM_TRIAL_KEY)
//   無料登録   … 月2回 (サーバーの usage_log app_key "exam"・action "start" で数える。日本時間の月)
//   Pro・Max  … 無制限 ＋ 時間配分の分析
// 単元模試 (/learn/moshi)・教科書 (レクチャー) はこの決まりの外 (止めない)。

export type ExamPlan = "guest" | "free" | "pro" | "max";

export const EXAM_APP = "exam";
export const EXAM_START_ACTION = "start";
export const EXAM_TRIAL_KEY = "aoharu.exam.trial.v1";
export const PRICING_HREF = "/#pricing";

/** 回数の上限。null＝無制限。guest は端末ごとの通算、free は月ごと */
export function examLimit(plan: ExamPlan): number | null {
  if (plan === "guest") return 1;
  if (plan === "free") return 2;
  return null;
}

/** 時間配分の分析を見られるか */
export const canSeeTimeAnalysis = (plan: ExamPlan) => plan === "pro" || plan === "max";

/** GET /api/exam/plan・POST /api/exam/start の返事 */
export interface ExamQuota {
  plan: ExamPlan;
  /** 上限 (null＝無制限) */
  limit: number | null;
  /** 使った回数 (free は今月。guest・数えられないときは null) */
  used: number | null;
  /** 残り (null＝無制限・数えられない・guest は端末で数える) */
  remaining: number | null;
}

// ---------- 端末の体験の記録 (登録なし) ----------

interface TrialRecord {
  /** 始めた時刻 (ISO 8601)。新しい順・最大 20 件 */
  starts: string[];
}

function readTrial(): TrialRecord {
  try {
    const raw = window.localStorage.getItem(EXAM_TRIAL_KEY);
    if (!raw) return { starts: [] };
    const v = JSON.parse(raw) as Partial<TrialRecord>;
    return { starts: Array.isArray(v.starts) ? v.starts.filter((s): s is string => typeof s === "string") : [] };
  } catch {
    return { starts: [] };
  }
}

/** 登録なしで始めた回数 (この端末)。読めない環境では 0 */
export function deviceTrialUsed(): number {
  return readTrial().starts.length;
}

/** 登録なしで1回始めたことを記録する。保存できない環境 (プライベートモードなど) では何もしない */
export function recordDeviceTrial(): void {
  try {
    const t = readTrial();
    window.localStorage.setItem(EXAM_TRIAL_KEY, JSON.stringify({ starts: [new Date().toISOString(), ...t.starts].slice(0, 20) }));
  } catch {
    /* 保存できなくても解ける */
  }
}
