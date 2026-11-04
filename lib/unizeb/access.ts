// ゼロワンOSユース版：プランごとに見せる範囲を決める、ただ1つの場所（2026-11-04 代表承認の料金）。
// 判定の元（ログイン・プラン）は本体の entitlements を呼ぶ形にする。ここでは仮の関数 currentPlan を置く（組み込みのとき本体チャットが差しかえる）。
//
//   登録なし（guest）：Lv1〜3 のカード・レクチャーと、列伝・ケースの見本。答えは端末の中だけ。
//   無料登録（free） ：同じ範囲。ボードを保存できる。AI採点は月10回。
//   Pro（月980円）   ：図解レクチャー・起業家列伝・ケース・資料集がすべて読める。カードは Lv1〜3、AI採点は月30回。
//   Max（月2,980円） ：Lv1〜15 のカード。AI採点は1日20回・月150回。事業計画書 v1・v2 の仕上げ、部門AI。

export type UzPlan = "guest" | "free" | "pro" | "max";

/** 見本として登録なしでも読める列伝・ケース（id） */
export const UZ_SAMPLE_DEN = ["hirooka-asako", "ibuka-masaru", "melanie-perkins"];
export const UZ_SAMPLE_CASES = ["muji-shelf", "crepe"];
/** 資料集で登録なしでも読める章 */
export const UZ_SAMPLE_SHIRYO = [1];

const FREE_LV = 3;

/** 図解レクチャー：Lv1〜3 はだれでも、Lv4 以降は Pro・Max */
export const canReadLecture = (plan: UzPlan, lv: number) => lv <= FREE_LV || plan === "pro" || plan === "max";
/** スキルカード（4段とAI採点）：Lv1〜3 はだれでも、Lv4 以降は Max */
export const canUseCard = (plan: UzPlan, lv: number) => lv <= FREE_LV || plan === "max";
/** 演習（実務のワークブック）：Lv1〜3 の演習と修了演習 I（lv 3）はだれでも（登録なしは端末の中だけに保存）、Lv4 以降と修了演習 II・III は Max。AI採点は演習1回の採点を1回と数える */
export const canUseEnshu = (plan: UzPlan, lv: number) => lv <= FREE_LV || plan === "max";
export const canReadDen =(plan: UzPlan, id: string) => UZ_SAMPLE_DEN.includes(id) || plan === "pro" || plan === "max";
export const canReadCase = (plan: UzPlan, id: string) => UZ_SAMPLE_CASES.includes(id) || plan === "pro" || plan === "max";
/** ゼロイチ・エピソード：見本なし、Pro・Max（2026-11-04 承認の料金） */
export const canReadEpisode = (plan: UzPlan) => plan === "pro" || plan === "max";
export const canReadShiryo = (plan: UzPlan, ch: number) => UZ_SAMPLE_SHIRYO.includes(ch) || plan === "pro" || plan === "max";
/** ボードを保存できるか（登録なしは端末の中だけ） */
export const canSaveBoard = (plan: UzPlan) => plan !== "guest";
/** 事業計画書 v1・v2 の仕上げと部門AI */
export const canFinishPlan = (plan: UzPlan) => plan === "max";

/** AI採点の回数の上限（月・日）。運営の月の予算（8割で通知、超えたら無料の分から止める）は全アプリ共通の仕組みで別に効く */
export const gradeLimit = (plan: UzPlan): { month: number; day?: number } =>
  plan === "max" ? { month: 150, day: 20 } : plan === "pro" ? { month: 30 } : plan === "free" ? { month: 10 } : { month: 0 };

/**
 * いまのプラン（画面＝ブラウザから呼ぶ用）。本体の entitlements（plans.ts の APP_KEYS.UNIZEB）をサーバーで判定し、
 * GET /api/unizeb/plan で受け取る。サーバーのページ・API では lib/unizeb/server.ts の serverPlan() を使う。
 * 通信できないときは登録なしとして扱う（見せすぎない側に倒す）。
 */
export async function currentPlan(): Promise<UzPlan> {
  if (typeof window === "undefined") return "guest";
  try {
    const r = await fetch("/api/unizeb/plan", { cache: "no-store" });
    if (!r.ok) return "guest";
    const j = (await r.json()) as { plan?: UzPlan };
    return j.plan === "free" || j.plan === "pro" || j.plan === "max" ? j.plan : "guest";
  } catch {
    return "guest";
  }
}
