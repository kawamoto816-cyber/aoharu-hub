import { checkProfile } from "@/lib/station/bin";
import { done, fail, readPost, SAVE_FAILED } from "@/lib/station/bin-api";
import { loadState, saveProfile } from "@/lib/station/bin-store";

// 学習便のプロフィール（ニックネーム・学年・班）を保存する。
//   POST /api/station/bin/profile { nick, grade: "中1"|"中2"|"中3", team: "A"〜"D" } → 状態
// 本名・学校名は入れない（ニックネームは20文字まで）。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const got = await readPost(req);
  if ("res" in got) return got.res;
  const checked = checkProfile(got.body);
  if (!checked.ok) return fail(got.userId, 400, checked.error);
  if (!(await saveProfile(got.userId, checked.value))) return fail(got.userId, 503, SAVE_FAILED);
  return done(await loadState(got.userId));
}
