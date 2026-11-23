import { checkPlan, findBins } from "@/lib/station/bin";
import { done, fail, readPost, SAVE_FAILED } from "@/lib/station/bin-api";
import { binPeriod, declarePlan, getRide, loadState } from "@/lib/station/bin-store";

// 学習便の「今日やること」を宣言する（乗車したあと、1便に1回）。
//   POST /api/station/bin/plan { plan } → 状態
// 4〜80文字。どの便かはサーバーの時計で決める。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const got = await readPost(req);
  if ("res" in got) return got.res;
  const checked = checkPlan(got.body.plan);
  if (!checked.ok) return fail(got.userId, 400, checked.error);
  const { current } = findBins(Date.now(), binPeriod());
  if (!current) return fail(got.userId, 409, "いまは宣言できる便がありません。");
  const ride = await getRide(got.userId, current);
  if (ride === undefined) return fail(got.userId, 503, SAVE_FAILED);
  if (!ride) return fail(got.userId, 409, "先に乗車してください。");
  if (ride.checkout_at) return fail(got.userId, 409, "この便はもう下車しています。");
  if (ride.plan) return fail(got.userId, 409, "この便の宣言はもう済んでいます。");
  if (!(await declarePlan(got.userId, current, checked.value))) return fail(got.userId, 503, SAVE_FAILED);
  return done(await loadState(got.userId));
}
