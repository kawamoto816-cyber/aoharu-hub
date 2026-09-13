// アオハルOS: ハブ画面・LPで表示するアプリ一覧。
// 実装済みのアプリのみここに載せる。今後アプリが増えたら1件追加するだけでよい。
import { APP_KEYS, type AppKey } from "@bluespring/aoharu-entitlements";

export interface AppInfo {
  key: AppKey;
  name: string;
  description: string;
  url: string;
  icon: string;
}

export const APPS: AppInfo[] = [
  {
    key: APP_KEYS.TENSAKUN,
    name: "テンサクン",
    description:
      "小論文・エントリーシートをAIが添削。総合型選抜/推薦入試の書類対策から、就活・転職の文章力アップまで。",
    url: "https://essay.bluespring.co.jp",
    icon: "📝",
  },
  {
    key: APP_KEYS.MENSATSU,
    name: "メンサツ",
    description: "AI相手に模擬面接。推薦・総合型選抜・就活まで幅広い面接対策に。",
    url: "https://interview.bluespring.co.jp",
    icon: "🎤",
  },
  {
    key: APP_KEYS.SHIBORIYU,
    name: "しぼりゆ",
    description: "対話を通じて志望理由書・エントリーシートの核となる想いを言語化し、初稿まで作成。",
    url: "https://reason.bluespring.co.jp",
    icon: "🖋️",
  },
  {
    key: APP_KEYS.JIKO_KOTEI,
    name: "ジココーテー",
    description: "過去の棚卸しを通じて自己探究を深め、自己肯定感・自己効力感を高める対話型AI診断。",
    url: "https://kotei.bluespring.co.jp",
    icon: "🌱",
  },
  {
    key: APP_KEYS.COLOR16,
    name: "16カラー診断",
    description: "色で見える、隠れた強み。16タイプで自分の個性を可視化する自己探究AI。",
    url: "https://color.bluespring.co.jp",
    icon: "🎨",
  },
  {
    key: APP_KEYS.JIKOAPI,
    name: "ジコアピ",
    description: "対話だけで自己PR文を自動生成。ES・面接で使える言語化をサポート。",
    url: "https://jkap.bluespring.co.jp",
    icon: "💬",
  },
  {
    key: APP_KEYS.CAREER_DESIGN,
    name: "キャリデザ",
    description: "対話を通じて自分に合う業界・キャリアの方向性を見つける進路設計AI。",
    url: "https://cd.bluespring.co.jp",
    icon: "🧭",
  },
  {
    key: APP_KEYS.EDUFIT,
    name: "edufit",
    description: "相性診断で選ぶ、あなたに合った大学。P-E Fit理論に基づくマッチングAI。",
    url: "https://edufit.bluespring.co.jp",
    icon: "🎓",
  },
  {
    key: APP_KEYS.CAMPUSCOPE,
    name: "キャンパスコープ",
    description: "クイズ形式で遊びながら学べる、志望校リサーチAI。",
    url: "https://campus.bluespring.co.jp",
    icon: "🏫",
  },
  {
    key: APP_KEYS.CORPORATE_SCOPE,
    name: "コーポレートスコープ",
    description: "P-E Fit理論とWill-Can-Mustフレームワークに基づく、科学的な企業研究・マッチングAI。",
    url: "https://corporate-scope.bluespring.co.jp",
    icon: "🏢",
  },
];
