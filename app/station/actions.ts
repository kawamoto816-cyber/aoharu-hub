"use server";

import { getLecture, lectureUnitInfo } from "@/lib/lecture";
import { plain } from "@/lib/oshieru";
import { checkPlan } from "@/lib/station/plan-check";
import type { LessonPlan, PlanCheck } from "@/lib/station/types";

// ラーニングステーション（試作）の授業案の点検。保存はしない・AIも呼ばない（lib/station/plan-check.ts の決まった基準）。
// 直接POSTされても困らないよう、入力の長さを切りつめてから計算するだけにしている。

const cut = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "");

export async function checkLessonPlan(raw: LessonPlan): Promise<PlanCheck> {
  const plan: LessonPlan = {
    unit: cut(raw?.unit, 80),
    title: cut(raw?.title, 80),
    hook: cut(raw?.hook, 600),
    explain: cut(raw?.explain, 2000),
    example: cut(raw?.example, 800),
    checkQ: cut(raw?.checkQ, 300),
    checkA: cut(raw?.checkA, 300),
  };
  const info = lectureUnitInfo(plan.unit);
  return checkPlan(plan, getLecture(plan.unit), plain(info?.name ?? "（単元が選ばれていません）"));
}

/** 授業づくりの手がかり：教材の確かめの問いと、よくあるまちがい（授業案に入れるとよいもの） */
export async function unitHints(unit: string): Promise<{ check?: { q: string; a: string }; mistakes: { wrong: string; right: string }[] }> {
  const l = getLecture(cut(unit, 80));
  if (!l) return { mistakes: [] };
  const c = l.check[0];
  return {
    check: c ? { q: plain(c.q), a: plain(c.a) } : undefined,
    mistakes: l.mistakes.slice(0, 3).map((m) => ({ wrong: plain(m.wrong), right: plain(m.right) })),
  };
}
