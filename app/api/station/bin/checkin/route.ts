import { atMin, BIN_MIN, checkinGate, checkProfile, findBins, jstHm } from "@/lib/station/bin";
import { done, fail, readPost, SAVE_FAILED } from "@/lib/station/bin-api";
import { binPeriod, checkin, getMember, loadState } from "@/lib/station/bin-store";

// 学習便に乗車する（チェックイン）。
//   POST /api/station/bin/checkin {} → 状態
// どの便か・乗れる時刻かは、サーバーの時計で決める（画面から送られた時刻や便は見ない）。
// 改札が開く発車5分前から、途中乗車の締切（発車30分後）まで。2回押しても最初の乗車時刻が残る。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const got = await readPost(req);
  if ("res" in got) return got.res;
  const now = new Date();
  const { current } = findBins(now.getTime(), binPeriod());
  if (!current) return fail(got.userId, 409, "いまは乗車できる便がありません。");
  const gate = checkinGate(current, now.getTime());
  if (gate === "early") return fail(got.userId, 409, "改札はまだ開いていません。");
  if (gate === "closed") return fail(got.userId, 409, `途中乗車は${jstHm(atMin(current, BIN_MIN.lastBoard))}までです。この便には乗車できません。`);
  const member = await getMember(got.userId);
  if (!member || !checkProfile(member).ok) return fail(got.userId, 409, "先にニックネーム・学年・班を設定してください。");
  if (!(await checkin(got.userId, current, now))) return fail(got.userId, 503, SAVE_FAILED);
  return done(await loadState(got.userId));
}
