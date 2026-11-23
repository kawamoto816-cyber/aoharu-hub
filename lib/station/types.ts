// ラーニングステーション（試作）の型。
// 試作なので、データはサーバーに保存しない。見本のデータ（demo.ts）と、その人のブラウザに残す操作（store.ts）だけで動く。
// お金のやりとりは一切しない。ブルーコインは換金できない「感謝のしるし」。

/** 会員の段（学ぶ → シェアする → つなぐ → 教える → 先輩） */
export type Rank = 1 | 2 | 3 | 4 | 5;

/** シェア会・授業の時間割の1枠 */
export interface Slot {
  id: string;
  kind: "share" | "lesson" | "plaza";
  /** ISO 日時（日本時間で書く） */
  at: string;
  minutes: number;
  title: string;
  /** シェア会ならサークル名、授業なら先生役のニックネーム */
  host: string;
  /** 授業のとき：教える単元の名前 */
  unitName?: string;
  /** 授業のとき：lessons の id */
  lessonId?: string;
  seats: number;
  taken: number;
}

/** シェアカード（3分のシェアを1枚に残したもの） */
export interface ShareCard {
  id: string;
  by: string;
  at: string;
  title: string;
  unitName?: string;
  /** 伝えたいこと（3つまで） */
  points: string[];
  /** まだ分からないこと（シェアは途中の学びも出してよい） */
  open?: string;
  questions: { by: string; text: string; answer?: string }[];
  claps: number;
}

/** 生徒が先生役になって行った（行う）授業 */
export interface Lesson {
  id: string;
  teacher: string;
  grade: string;
  unit?: string;
  unitName: string;
  subject: string;
  title: string;
  at: string;
  /** AI点検の点（0〜100） */
  aiScore: number;
  /** 受講者が確かめの1問に正解した割合（0〜1） */
  checkRate: number;
  attendees: number;
  /** 受講者の評価（受けた人の声）。各観点 0〜3 */
  ratings: Rating[];
  coins: number;
}

export interface Rating {
  clear: number; // わかりやすさ
  care: number; // ていねいさ
  again: number; // また受けたい
  note?: string;
}

/** 授業案（教壇に立つ前に AI 点検にかける） */
export interface LessonPlan {
  unit: string;
  title: string;
  hook: string;
  explain: string;
  example: string;
  checkQ: string;
  checkA: string;
}

export type CheckGrade = "A" | "B" | "C";
export interface PlanCheck {
  score: number;
  items: { key: string; label: string; grade: CheckGrade; note: string }[];
  /** 授業案の中に見つかった「よくあるまちがい」 */
  wrongFound: { wrong: string; right: string }[];
  unitName: string;
  /** 声で授業したときだけ */
  voice?: VoiceStats;
}

/** ブルーコインの出入り */
export interface CoinEntry {
  at: string;
  delta: number;
  reason: string;
}

/** 「教えて」リクエスト（わからないことを掲示板に出し、教えてくれる先生役を待つ） */
export interface TeachRequest {
  id: string;
  by: string;
  at: string;
  /** 単元 id（えらんだとき） */
  unit?: string;
  unitName: string;
  text: string;
  metoo: number;
  /** 先生役が「教えます」と手をあげたら、そのニックネーム */
  taker?: string;
}

/** 声の授業の話し方の数字 */
export interface VoiceStats {
  seconds: number;
  chars: number;
  perMinute: number;
  asks: number;
}
