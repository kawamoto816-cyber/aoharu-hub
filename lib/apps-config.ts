// アオハルOS: ハブ画面・LPで表示するアプリ一覧。
// 実装済み(MVP)のアプリのみここに載せる。今後アプリが増えたら1件追加するだけでよい。
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
];
