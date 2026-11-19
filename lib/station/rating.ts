import type { Lesson, Rank, Rating } from "./types";

// 2つの物差し（ラーニングステーション試作）
//   マナビシュラン … 「わからせる授業ができたか」をAIの点検と受講者の正答率で見る。星0〜3。生徒の人気は入れない。
//   マナビログ     … 授業を実際に受けた生徒の評価だけで格付けする（ザガットの考え方）。各観点0〜3の平均×10＝30点満点。
// 2つを分けておくことで、「人気はあるが分かりにくい」「分かりやすいが地味」のどちらも見える。

export const STAR_MIN_LESSONS = 3;
export const LOG_MIN_VOTES = 5;

/** 授業1回の「わからせ点」：AI点検と、受講者が確かめの1問を解けた割合を半分ずつ */
export const lessonPoint = (l: Pick<Lesson, "aiScore" | "checkRate">) => Math.round(l.aiScore * 0.5 + l.checkRate * 100 * 0.5);

export function starsFor(points: number[]): 0 | 1 | 2 | 3 {
  if (points.length < STAR_MIN_LESSONS) return 0;
  const avg = points.reduce((a, b) => a + b, 0) / points.length;
  if (avg >= 88) return 3;
  if (avg >= 80) return 2;
  if (avg >= 72) return 1;
  return 0;
}

export const STAR_RULE = [
  { stars: 3, text: "わからせ点の平均が88以上" },
  { stars: 2, text: "80以上" },
  { stars: 1, text: "72以上" },
];

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
/** ザガット式：0〜3 の平均を10倍し、小数1けた */
export const zagat = (xs: number[]) => Math.round(avg(xs) * 100) / 10;

export interface TeacherCard {
  nick: string;
  grade: string;
  subjects: string[];
  lessons: Lesson[];
  stars: 0 | 1 | 2 | 3;
  point: number;
  votes: number;
  clear: number;
  care: number;
  again: number;
  total: number;
  coins: number;
}

export function teacherCards(lessons: Lesson[], extraRatings: Record<string, Rating[]> = {}, extraCoins: Record<string, number> = {}): TeacherCard[] {
  const by = new Map<string, Lesson[]>();
  for (const l of lessons) by.set(l.teacher, [...(by.get(l.teacher) ?? []), l]);
  return [...by.entries()].map(([nick, ls]) => {
    const rs = ls.flatMap((l) => [...l.ratings, ...(extraRatings[l.id] ?? [])]);
    const points = ls.map(lessonPoint);
    const clear = zagat(rs.map((r) => r.clear));
    const care = zagat(rs.map((r) => r.care));
    const again = zagat(rs.map((r) => r.again));
    return {
      nick,
      grade: ls[0].grade,
      subjects: [...new Set(ls.map((l) => l.subject))],
      lessons: ls,
      stars: starsFor(points),
      point: Math.round(avg(points)),
      votes: rs.length,
      clear,
      care,
      again,
      total: Math.round(((clear + care + again) / 3) * 10) / 10,
      coins: ls.reduce((a, l) => a + l.coins + (extraCoins[l.id] ?? 0), 0),
    };
  });
}

/** マナビシュランの並び：星 → わからせ点 */
export const byStars = (cs: TeacherCard[]) => [...cs].sort((a, b) => b.stars - a.stars || b.point - a.point);
/** マナビログの並び：票が足りない人は後ろ（格付けしない） → 総合点 → 票数 */
export const byLog = (cs: TeacherCard[]) =>
  [...cs].sort((a, b) => Number(b.votes >= LOG_MIN_VOTES) - Number(a.votes >= LOG_MIN_VOTES) || b.total - a.total || b.votes - a.votes);

export const RATING_AXES = [
  { key: "clear", label: "わかりやすさ" },
  { key: "care", label: "ていねいさ" },
  { key: "again", label: "また受けたい" },
] as const;

export const RATING_SCALE = ["ざんねん", "ふつう", "よかった", "すばらしい"];

// 会員の段
export const RANKS: { rank: Rank; name: string; can: string; need: string; product: string }[] = [
  { rank: 1, name: "学ぶ人", can: "自習ホームのすべて。サークルを月に1回見学", need: "無料登録", product: "無料" },
  { rank: 2, name: "シェアする人", can: "サークルに入り、週に1回シェア。学生の授業を受ける・「教えて」を出す", need: "保護者の同意と会員権", product: "ラーニングサークル会員権" },
  { rank: 3, name: "つなぐ人", can: "シェア会の司会・サークル長", need: "シェア4回", product: "会員権のまま" },
  { rank: 4, name: "教える人", can: "教壇で授業をする", need: "シェア4回＋教える単元をオシエルで合格＋登壇権", product: "ティーチング登壇権" },
  { rank: 5, name: "先輩", can: "新しいサークルの世話役、新しい先生の相談役", need: "授業4回と運営の推薦", product: "登壇権" },
];

export function rankOf(s: { member: boolean; teacher: boolean; shares: number; taught: number; oshieruPassed: number }): Rank {
  if (!s.member) return 1;
  if (s.teacher && s.shares >= 4 && s.oshieruPassed > 0) return s.taught >= 4 ? 5 : 4;
  return s.shares >= 4 ? 3 : 2;
}

export function canTeach(s: { member: boolean; teacher: boolean; shares: number; oshieruPassed: number }) {
  const missing: string[] = [];
  if (!s.member) missing.push("ラーニングサークル会員権");
  if (s.shares < 4) missing.push(`シェアをあと${4 - s.shares}回`);
  if (s.oshieruPassed < 1) missing.push("教える単元をオシエルで合格");
  if (!s.teacher) missing.push("ティーチング登壇権");
  return missing;
}
