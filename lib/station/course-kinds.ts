// 直前コースの4つの種類（画面とサーバーの両方から読む。環境変数は使わない）。どれも 4,980円・1回払い（2026-11-23 代表の判断）。
//   kyotsu  共通テスト 直前コース
//   daigaku 大学入試 直前コース（国公立2次・私大。1回の支払いで、大学別模試のある全大学を切りかえて使える。もとは試作の「国公立2次・直前5週間コース」）
//   koko    公立高校入試 直前コース（中学生向けなので、支払いは保護者あての支払いリンクだけ）
//   shikoko 私立高校入試 直前コース（同上）
// 無料：診断・作戦表・最初の1週間。有料：2週目からの計画の作り直し・週のふり返り・進み具合・保護者に見せる報告。
// Max・受験シーズンパスの人は、追加の支払いなしで使える（2026-11-23 代表の判断）。

export type CourseKind = "daigaku" | "kyotsu" | "koko" | "shikoko";
export type SaleKind = CourseKind;

export const COURSE_PRICE_JPY = 4980;

export interface CourseDef {
  kind: CourseKind;
  /** この端末に計画を残すキー */
  storeKey: string;
  href: string;
  name: string;
  /** アオハルームなどに出す短い名前 */
  short: string;
  /** 診断に使う模試の名前と、記録の spec の頭 */
  moshi: string;
  specPrefix: string;
  /** 試験の名前（「共通テスト」「公立高校入試」「前期日程」） */
  exam: string;
  /** 記述の自己採点がある（2次・高校入試）か、マーク式（共通テスト）か */
  mark: boolean;
  /** 販売しているか。値段と、買ったあと使える期限 */
  sale?: { priceJpy: number; endsAt: string; endsLabel: string; parentOnly: boolean };
}

export const COURSES: Record<CourseKind, CourseDef> = {
  daigaku: {
    kind: "daigaku",
    storeKey: "aoharu-course-v1",
    href: "/station/course",
    name: "大学入試 直前コース",
    short: "国公立2次・私大",
    moshi: "大学別模試",
    specPrefix: "daigaku:",
    exam: "志望校の試験",
    mark: false,
    sale: { priceJpy: COURSE_PRICE_JPY, endsAt: "2027-03-31T23:59:59+09:00", endsLabel: "2027年3月31日", parentOnly: false },
  },
  kyotsu: {
    kind: "kyotsu",
    storeKey: "aoharu-course-kyotsu-v1",
    href: "/station/course/kyotsu",
    name: "共通テスト 直前コース",
    short: "共通テスト",
    moshi: "共通テスト模試",
    specPrefix: "kyotsu:",
    exam: "共通テスト",
    mark: true,
    sale: { priceJpy: COURSE_PRICE_JPY, endsAt: "2027-01-31T23:59:59+09:00", endsLabel: "2027年1月31日", parentOnly: false },
  },
  koko: {
    kind: "koko",
    storeKey: "aoharu-course-koko-v1",
    href: "/station/course/koko",
    name: "公立高校入試 直前コース",
    short: "公立高校入試",
    moshi: "公立高校入試模試",
    specPrefix: "koritsu:",
    exam: "公立高校入試",
    mark: false,
    sale: { priceJpy: COURSE_PRICE_JPY, endsAt: "2027-03-31T23:59:59+09:00", endsLabel: "2027年3月31日", parentOnly: true },
  },
  shikoko: {
    kind: "shikoko",
    storeKey: "aoharu-course-shikoko-v1",
    href: "/station/course/shikoko",
    name: "私立高校入試 直前コース",
    short: "私立高校入試",
    moshi: "私立入試型の模試",
    specPrefix: "shiritsu:",
    exam: "私立高校入試",
    mark: false,
    sale: { priceJpy: COURSE_PRICE_JPY, endsAt: "2027-03-31T23:59:59+09:00", endsLabel: "2027年3月31日", parentOnly: true },
  },
};

/** 私立入試型の模試は、教科ごとに50分・全範囲で診断する（記録の spec は shiritsu:<教科>:50） */
export const SHIKOKO_MINUTES = 50;

export const isSaleKind = (k: unknown): k is SaleKind => k === "kyotsu" || k === "koko" || k === "shikoko" || k === "daigaku";

/** 令和9年度の共通テスト（2027年1月16日・17日）。画面で変えられる */
export const KYOTSU_EXAM_DAY = "2027-01-16";
