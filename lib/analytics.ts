// アオハルOS: GA4(Google アナリティクス4)への計装まわりの共通ヘルパー。
//
// あえて"use client"は付けない: GA_MEASUREMENT_ID はサーバーコンポーネントの
// app/layout.tsx からも参照するため。"use client"を付けると、このファイルの
// 全exportがクライアント参照専用になり、サーバー側での参照がビルドエラーになる。
// trackEvent自体はwindow参照をtypeofチェックで安全にガードしているので、
// サーバー/クライアントどちらから読み込まれても問題ない
// (実際に呼び出すのは"use client"を持つコンポーネント側)。
//
// 測定ID自体は秘匿情報ではなく(ページのHTMLソースにそのまま出力される)、
// 環境変数化するほどの理由もないためここに直接定数として持たせている。
// 発行元: analytics.google.com / プロパティ「アオハルOS (app)」
export const GA_MEASUREMENT_ID = "G-V3YR5C8JL9";

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// gtag.js の読み込み前・読み込み失敗時にも例外を投げないようにするための
// 薄いラッパー。コンバージョン計測が失敗してもユーザー体験には一切影響させない。
//
// gtag の初期化（layout の afterInteractive スクリプト）より先に呼ばれることがある
// （例：Stripe の支払いから戻った直後の purchase、登録直後の sign_up）。
// そのときは捨てずに、最大5秒だけ待ってから送る。2026-11-20 の Pro の購入が
// GA4 に記録されなかったのはこの順番のため。
export function trackEvent(eventName: string, params?: GtagEventParams) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
      return;
    }
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      try {
        if (typeof window.gtag === "function") {
          window.clearInterval(timer);
          window.gtag("event", eventName, params);
        } else if (tries >= 25) {
          window.clearInterval(timer);
        }
      } catch {
        window.clearInterval(timer);
      }
    }, 200);
  } catch {
    // 計測の失敗でアプリの動作を止めない
  }
}
