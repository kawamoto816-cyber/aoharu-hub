import { atMin, BIN_MIN, checkCheckout, checkoutGate, findBins, jstHm } from "@/lib/station/bin";
import { done, fail, readPost, SAVE_FAILED } from "@/lib/station/bin-api";
import { binPeriod, checkout, getRide, loadState } from "@/lib/station/bin-store";

// 学習便から下車する（今日学んだことの説明と、ふり返りを入れる。1便に1回）。
//   POST /api/station/bin/checkout { explain, reflect: "done"|"half"|"not" } → 状態
// 下車の時刻（発車80分後）から、終着の30分後まで。時刻はサーバーの時計で決める。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const got = await readPost(req);
  if ("res" in got) return got.res;
  const checked = checkCheckout(got.body);
  if (!checked.ok) return fail(got.userId, 400, checked.error);
  const now = new Date();
  const { current } = findBins(now.getTime(), binPeriod());
  if (!current) return fail(got.userId, 409, "下車できる便がありません（受付は終着の30分後までです）。");
  const gate = checkoutGate(current, now.getTime());
  if (gate === "early") return fail(got.userId, 409, `下車は${jstHm(atMin(current, BIN_MIN.getoff))}からです。`);
  if (gate === "closed") return fail(got.userId, 409, "この便の下車の受付は終わりました。");
  const ride = await getRide(got.userId, current);
  if (ride === undefined) return fail(got.userId, 503, SAVE_FAILED);
  if (!ride) return fail(got.userId, 409, "この便には乗車していません。");
  if (ride.checkout_at) return fail(got.userId, 409, "この便はもう下車しています。");
  if (!(await checkout(got.userId, current, now, checked.value))) return fail(got.userId, 503, SAVE_FAILED);
  return done(await loadState(got.userId));
}
