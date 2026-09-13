import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Script from "next/script";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { UpgradeModalProvider } from "@/components/UpgradeModal";
import { BillingPortalLink } from "@/components/BillingPortalLink";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "アオハルOS",
  description:
    "アオハルOS — 高校生・大学生・就活生・転職を目指す社会人まで、進路とキャリアづくりを支えるAI学習支援サービス群(テンサクン・しぼりゆ・メンサツ)の統合ハブ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider signInForceRedirectUrl="/" signUpForceRedirectUrl="/">
      <html
        lang="ja"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-white text-slate-900">
          {/* GA4計測タグ(gtag.js): コンバージョン計測(sign_up_click / begin_checkout /
              purchase)の土台。ページの見た目には一切影響しない。 */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
          <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end gap-1.5">
            <SignedOut>
              {/* モバイルでは固定表示のCTAを非表示にする:
                  ヒーロー・キャリキャラ導線・各料金プランのボタン等、
                  ページ内に既にCTAが多数あるため、狭い画面幅では
                  この固定ボタンが料金プランの申し込みボタン等と
                  重なってしまう不具合があった(sm未満のみ非表示)。 */}
              <SmartSignUpButton analyticsLocation="header" className="hidden rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500 sm:inline-flex">
                無料登録してはじめる
              </SmartSignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur-sm">
                <UserButton afterSignOutUrl="/" />
                <BillingPortalLink />
              </div>
            </SignedIn>
          </div>
          <UpgradeModalProvider>{children}</UpgradeModalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
