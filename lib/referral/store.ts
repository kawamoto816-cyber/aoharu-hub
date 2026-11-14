import { randomInt } from "node:crypto";
import { getSetting, setSetting } from "@/lib/social/store";

// 個人の先生（家庭教師・小論文の講師など）の紹介コード（2026-11-15 じゅんさんの判断）。
//   生徒：コードを使うと、受験シーズンパスが10%引き
//   先生：コードからパスが1件売れるごとに、支払われた額の20%をお礼として支払う（月末にまとめて。支払いはじゅんさんが手で行う）
//   1通300円の添削・月額の Pro は対象外
// 保存先は app_settings（key/value）。新しいテーブルは作らない。
//   referral:<CODE>          → Referral（JSON）
//   referral_index           → コードの一覧（JSON の配列）
//   referral_session:<セッションID> → CODE（同じ支払いを二重に数えないため）

export const REFERRAL = { discountPct: 10, rewardPct: 20, storageKey: "aoharu_ref" } as const;

export interface ReferralSale {
  sessionId: string;
  amountJpy: number;
  at: string;
}

export interface Referral {
  code: string;
  /** だれのコードか（先生の名前・メモ。社内だけで見る） */
  label: string;
  createdAt: string;
  sales: ReferralSale[];
  /** お礼を支払い済みにした売上の数（先頭から） */
  paidCount: number;
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function normalizeRefCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const s = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^SENSEI/, "");
  return /^[A-Z0-9]{6}$/.test(s) ? `SENSEI-${s}` : null;
}

export async function getReferral(code: string | null | undefined): Promise<Referral | null> {
  const c = normalizeRefCode(code);
  if (!c) return null;
  const v = await getSetting(`referral:${c}`).catch(() => null);
  return v ? (JSON.parse(v) as Referral) : null;
}

async function saveReferral(r: Referral): Promise<void> {
  await setSetting(`referral:${r.code}`, JSON.stringify(r));
}

export async function listReferrals(): Promise<Referral[]> {
  const idx = await getSetting("referral_index").catch(() => null);
  const codes = idx ? (JSON.parse(idx) as string[]) : [];
  const out = await Promise.all(codes.map((c) => getReferral(c)));
  return out.filter((r): r is Referral => r !== null);
}

export async function createReferral(label: string): Promise<Referral> {
  const code = `SENSEI-${Array.from({ length: 6 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("")}`;
  const r: Referral = { code, label: label.trim().slice(0, 60) || "（名前なし）", createdAt: new Date().toISOString(), sales: [], paidCount: 0 };
  await saveReferral(r);
  const idx = await getSetting("referral_index").catch(() => null);
  const codes = idx ? (JSON.parse(idx) as string[]) : [];
  await setSetting("referral_index", JSON.stringify([...codes, code]));
  return r;
}

/** 紹介コードつきのパスが売れたときに記録する（Webhook から。何度呼ばれても1回だけ） */
export async function recordReferralSale(code: string, sessionId: string, amountJpy: number): Promise<boolean> {
  if (await getSetting(`referral_session:${sessionId}`).catch(() => null)) return false;
  const r = await getReferral(code);
  if (!r) return false;
  r.sales.push({ sessionId, amountJpy, at: new Date().toISOString() });
  await saveReferral(r);
  await setSetting(`referral_session:${sessionId}`, r.code);
  return true;
}

/** まだ支払っていないお礼の額を、支払い済みにする（社内の画面から） */
export async function markReferralPaid(code: string): Promise<void> {
  const r = await getReferral(code);
  if (!r) return;
  r.paidCount = r.sales.length;
  await saveReferral(r);
}

export function rewardOf(amountJpy: number): number {
  return Math.floor((amountJpy * REFERRAL.rewardPct) / 100);
}

export function discounted(priceJpy: number): number {
  return Math.round((priceJpy * (100 - REFERRAL.discountPct)) / 100);
}
