// ゼロワンOSユース版：画面からサーバーの3つの API を呼ぶ小さな関数（本体チャットが API を作るまでは、端末の中と見本の採点で動く）。
//   GET/PUT /api/unizeb/state … マイ事業ボード・カードの答え・スキルアセットの保存
//   POST    /api/unizeb/grade … 採点（観点ごとの0〜4・添削・足切り。合計と合否はサーバーが計算）
//   POST    /api/unizeb/ai    … カードの中の「AIに試しに頼む」枠
// API が 404 / 通信できないときは、localStorage と見本の採点（sampleGrade）に切りかえる。画面には「見本の採点」と出す。

"use client";

export const UZ_STATE_KEY = "uz_youth_state_v1";

/** 合格した答案（スキルアセット）。志望理由書・ガクチカ・ES に使える実績の記録 */
export interface SkillAsset {
  /** "card:z1-01" か "enshu:lv1" */
  key: string;
  kind: "card" | "enshu" | "shuryo";
  title: string;
  lv: number;
  /** 使ったスキル（カード id） */
  skills: string[];
  score: number;
  pass: number;
  /** 合格した日（YYYY-MM-DD） */
  date: string;
  /** 答案（課題ごとの答え） */
  answers: Record<string, string>;
  /** 見本の採点で合格したもの（API につながる前）。本番の記録とは分けて見せる */
  sample?: boolean;
}

export interface UzState {
  /** v3 エンジンの保存（そのまま入れておく） */
  v3?: Record<string, unknown>;
  /** 演習の途中の答え（"lv1" → 課題ごとの答え） */
  enshuDraft?: Record<string, Record<string, string>>;
  assets: SkillAsset[];
  updatedAt?: string;
}

export interface GradeRequest {
  kind: "card" | "enshu";
  /** カード id か 演習 id */
  id: string;
  answers: Record<string, string>;
  /** 演習で数字を変えた版の番号 */
  variant?: number;
}

export interface CritScore {
  /** 観点のキー（演習は "<課題番号>-<観点番号>"） */
  key: string;
  score: 0 | 1 | 2 | 3 | 4;
  quote?: string;
  good?: string;
  fix?: string;
}

export interface GradeResult {
  crit: CritScore[];
  /** 足切りに当たったとき、その理由 */
  ko?: string;
  rewrite?: { key: string; before: string; after: string };
  /** いちばん良かったところ（1文） */
  praise?: string;
  /** サーバーが計算した合計と合否（見本の採点では画面で計算する） */
  total?: number;
  passed?: boolean;
  /** 見本の採点（API がまだない） */
  sample?: boolean;
  error?: string;
}

const read = <T,>(k: string, d: T): T => {
  try {
    return (JSON.parse(localStorage.getItem(k) || "null") as T) ?? d;
  } catch {
    return d;
  }
};
const write = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* 保存できない表示（プライベートなど）では、その場だけで動く */
  }
};

async function api<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const r = await fetch(path, { ...init, headers: { "content-type": "application/json", ...(init?.headers ?? {}) } });
    if (r.status === 404 || r.status === 405) return null;
    if (!r.ok) throw new Error(String(r.status));
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export async function loadState(): Promise<UzState> {
  const local = read<UzState>(UZ_STATE_KEY, { assets: [] });
  const server = await api<UzState>("/api/unizeb/state");
  return server ?? local;
}

export async function saveState(s: UzState): Promise<void> {
  const v = { ...s, updatedAt: new Date().toISOString() };
  write(UZ_STATE_KEY, v);
  await api("/api/unizeb/state", { method: "PUT", body: JSON.stringify(v) });
}

export async function addAsset(a: SkillAsset): Promise<UzState> {
  const s = await loadState();
  const assets = [...s.assets.filter((x) => x.key !== a.key || x.score > a.score), a].filter((x, i, arr) => arr.findIndex((y) => y.key === x.key) === i);
  const next = { ...s, assets };
  await saveState(next);
  return next;
}

export async function grade(req: GradeRequest, critKeys: { key: string; minChars?: number }[]): Promise<GradeResult> {
  const r = await api<GradeResult>("/api/unizeb/grade", { method: "POST", body: JSON.stringify(req) });
  return r ?? sampleGrade(req, critKeys);
}

export async function askAi(body: { id: string; prompt: string }): Promise<{ text: string } | { error: string }> {
  const r = await api<{ text: string }>("/api/unizeb/ai", { method: "POST", body: JSON.stringify(body) });
  return r ?? { error: "AIに試しに頼む枠は、準備ができしだい使えるようになります。" };
}

/**
 * 見本の採点（API がまだないときだけ）。答えの長さと、空でないかだけで0〜4を付ける目安。
 * 本番の採点（Claude API・校正済みの依頼文）とは別物なので、画面では必ず「見本の採点」と出す。
 */
export function sampleGrade(req: GradeRequest, critKeys: { key: string; minChars?: number }[]): GradeResult {
  const text = (k: string) => (req.answers[k.split("-")[0]] ?? req.answers[k] ?? "").trim();
  const crit = critKeys.map(({ key, minChars = 40 }) => {
    const n = [...text(key)].length;
    const score = (n === 0 ? 0 : n < minChars * 0.4 ? 1 : n < minChars * 0.8 ? 2 : n < minChars * 1.4 ? 3 : 4) as CritScore["score"];
    return { key, score, quote: text(key).slice(0, 20) };
  });
  return { crit, sample: true };
}

/** 点の計算（カードと同じ：観点ごとに round(score / 4 * 配点)） */
export function totalOf(crit: CritScore[], weights: Record<string, number>): number {
  return crit.reduce((t, c) => t + Math.round((c.score / 4) * (weights[c.key] ?? 0)), 0);
}

/** 合格点（v3 のカードと同じ：Lv1〜9 は70、Lv11 は80、ほかの Lv10〜15 は75） */
export const passLine = (lv: number) => (lv <= 9 ? 70 : lv === 11 ? 80 : 75);
