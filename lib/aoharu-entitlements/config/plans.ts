/**
 * アオハルOS: プラン定義とアプリ権限マッピング
 *
 * 新しいアプリを追加するときはここに1行足すだけでよいように設計している。
 * Stripeの価格ID⇔プランの対応もここで一元管理する。
 *
 * ★このファイルは全アプリ(ハブ+各アプリ)に同じ内容を配置する運用にしている。
 *   新アプリを追加/公開したら、このファイルを他のアプリにもコピーして同期すること。
 */

export const PLANS = ["free", "pro", "max"] as const;
export type Plan = (typeof PLANS)[number];

export const SUBSCRIPTION_STATUSES = [
  "active",
  "trialing",
  "past_due",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "unpaid",
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

/**
 * アプリ識別子。Supabaseの usage_log.app_key / エンタイトルメント判定に使う。
 * 実装済み(MVP)の10本。キャリキャラ(career-app)は完全無料公開のため対象外。
 * 新アプリをリリースしたらここに追記し、PLAN_APPS の max 側は 'all' なので
 * 追記するだけで自動的にMaxプランで解放される。Proの対象に含める場合は
 * PLAN_APPS.pro にも追加する。
 */
export const APP_KEYS = {
  TENSAKUN: "tensakun", // テンサクン (小論文・ES添削)
  SHIBORIYU: "shiboriyu", // しぼりゆ (志望理由書 生成/絞り込み)
  MENSATSU: "mensatsu", // メンサツ (面接対策: 推薦・AO・就活 全モード)
  JIKO_KOTEI: "jiko-kotei", // ジココーテー (自己探究＆自己肯定AI)
  COLOR16: "16color", // 16カラー診断
  JIKOAPI: "jikoapi", // ジコアピ (自己PR文 自動生成)
  CAREER_DESIGN: "career-design", // キャリデザ (キャリア設計)
  EDUFIT: "edufit", // edufit (大学マッチング)
  CAMPUSCOPE: "campuscope", // キャンパスコープ (大学リサーチ)
  CORPORATE_SCOPE: "corporate-scope", // コーポレートスコープ (企業研究)
} as const;

export type AppKey = (typeof APP_KEYS)[keyof typeof APP_KEYS];

export const ALL_APP_KEYS: AppKey[] = Object.values(APP_KEYS);

/**
 * プランごとに利用できるアプリ。
 * 'all' は ALL_APP_KEYS 全部(今後アプリが増えても自動的に含まれる)。
 */
export const PLAN_APPS: Record<Plan, "all" | AppKey[]> = {
  free: [],
  pro: [APP_KEYS.TENSAKUN, APP_KEYS.SHIBORIYU, APP_KEYS.MENSATSU],
  max: "all",
};

export function appsForPlan(plan: Plan): AppKey[] {
  const apps = PLAN_APPS[plan];
  return apps === "all" ? ALL_APP_KEYS : apps;
}

export function planHasAppAccess(plan: Plan, appKey: string): boolean {
  const apps = PLAN_APPS[plan];
  if (apps === "all") return true;
  return (apps as string[]).includes(appKey);
}

/**
 * Stripe価格ID → プラン の対応表。
 * Stripeダッシュボード(商品カタログ)の実際のPrice IDと一致させること。
 * price idはこのままハードコードせず環境変数から読む方が事故が少ないので
 * 下の getPriceToPlanMap() は env を優先し、無ければこの既定値にフォールバックする。
 */
const DEFAULT_PRICE_TO_PLAN: Record<string, Plan> = {
  price_1UEHMX7pT4FZIsEUvg1MvNat: "pro", // アオハルOS Pro ¥980/月
  price_1UEHND7pT4FZIsEUd3tK4NlI: "max", // アオハルOS Max ¥2,980/月
};

export function getPriceToPlanMap(): Record<string, Plan> {
  const proId = process.env.STRIPE_PRICE_PRO;
  const maxId = process.env.STRIPE_PRICE_MAX;
  if (!proId || !maxId) return DEFAULT_PRICE_TO_PLAN;
  return { [proId]: "pro", [maxId]: "max" };
}

export function getPriceIdForPlan(plan: Exclude<Plan, "free">): string {
  const map: Record<Exclude<Plan, "free">, string | undefined> = {
    pro: process.env.STRIPE_PRICE_PRO ?? "price_1UEHMX7pT4FZIsEUvg1MvNat",
    max: process.env.STRIPE_PRICE_MAX ?? "price_1UEHND7pT4FZIsEUd3tK4NlI",
  };
  const priceId = map[plan];
  if (!priceId) throw new Error(`No Stripe price configured for plan: ${plan}`);
  return priceId;
}

export function planFromPriceId(priceId: string): Plan | null {
  return getPriceToPlanMap()[priceId] ?? null;
}

/**
 * 無料プランのユーザーに与える、アプリ1本あたりの月間利用回数枠。
 * (Freeプランは PLAN_APPS.free = [] だが、これとは別に「お試し枠」として
 *  アプリを問わず毎月この回数までは生成系APIを呼べるようにする。
 *  枠を超えたら checkAppAccess() が reason: "quota_exceeded" を返す)
 * 環境変数 FREE_MONTHLY_QUOTA で上書き可能 (未設定なら既定値3)。
 */
export function getFreeMonthlyQuota(): number {
  const envValue = process.env.FREE_MONTHLY_QUOTA;
  const parsed = envValue ? Number(envValue) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 3;
}

/**
 * 無料枠の「完了単位」ポリシー (アプリごと)。
 *
 * 従来は「APIを呼ぶたびに1回消費 / 月3回」だったため、対話型のアプリ
 * (メンサツ・しぼりゆ) では無料ユーザーが結果画面に一度も辿り着けなかった。
 * このポリシーでは、無料ユーザーが必ず結果ページまで完走できるように
 *   - meteredActions : 「結果を出す」アクションだけを回数枠として数える
 *   - supportActions : 対話ターン・ヒント・スキャン等は回数枠に数えず、
 *                      乱用防止の月間上限 (supportMonthlyCap) だけ設ける
 *   - proOnlyActions : 無料枠では使えない (Pro以上) アクション
 * を分けて判定する。ポリシー未定義のアプリは従来どおり
 * 「全アクション共通で月 getFreeMonthlyQuota() 回」として扱う。
 *
 * 各アプリのAPIルートは checkAccessAndLogUsage({ action }) に
 * ここで定義したアクション名をそのまま渡すこと。
 */
export interface FreeTierPolicy {
  /** 回数枠として数える「完了単位」のアクション名 */
  meteredActions: readonly string[];
  /** 完了単位の月間回数 */
  monthlyQuota: number;
  /** 補助アクション (対話ターン等) の月間上限。乱用防止用 */
  supportMonthlyCap: number;
  /** 無料枠では使えないアクション (reason: "no_plan" を返す) */
  proOnlyActions: readonly string[];
}

export const FREE_TIER_POLICY: Partial<Record<AppKey, FreeTierPolicy>> = {
  // テンサクン: 「提出して採点」= 添削レポート完走を月2本まで。
  // ヒント・推敲・スキャン・類題生成・チャットは回数に数えない。
  // 100点の模範解答はProの決め手として温存する。
  [APP_KEYS.TENSAKUN]: {
    meteredActions: ["score"],
    monthlyQuota: 2,
    supportMonthlyCap: 20,
    proOnlyActions: ["generate_model_answer"],
  },
  // メンサツ: 「質問1つに答える → 評価レポート」の1問体験を月1回。
  // 面接ターン (turn) と募集要項/企業情報の読み込みは補助扱い (3モード共通)。
  [APP_KEYS.MENSATSU]: {
    meteredActions: ["report"],
    monthlyQuota: 1,
    supportMonthlyCap: 6,
    proOnlyActions: [],
  },
  // しぼりゆ: 対話 → 構成案 (骨子) までを月1回。初稿生成と審査レビューはPro。
  [APP_KEYS.SHIBORIYU]: {
    meteredActions: ["outline"],
    monthlyQuota: 1,
    supportMonthlyCap: 8,
    proOnlyActions: ["draft", "review"],
  },
};

export function getFreeTierPolicy(appKey: AppKey | string): FreeTierPolicy | null {
  return (FREE_TIER_POLICY as Record<string, FreeTierPolicy | undefined>)[appKey] ?? null;
}
