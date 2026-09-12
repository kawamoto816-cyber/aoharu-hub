import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
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
          <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end gap-1.5">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500">
                  無料登録してはじめる
                </button>
              </SignInButton>
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
