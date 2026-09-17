import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | アオハルOS",
  description:
    "アオハルOS(テンサクン・メンサツ 等)を提供する株式会社ブルースプリングのプライバシーポリシーです。",
};

type Section = {
  heading: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    heading: "1. 基本方針",
    body: (
      <>
        株式会社ブルースプリング(以下「当社」といいます)は、当社が提供する「アオハルOS」および、これに含まれる各アプリ(以下総称して「本サービス」といいます)において取得するユーザーの情報の取り扱いについて、以下のとおりプライバシーポリシー(以下「本ポリシー」といいます)を定めます。
      </>
    ),
  },
  {
    heading: "2. 取得する情報",
    body: (
      <>
        当社は、本サービスの提供にあたり、以下の情報を取得します。
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>アカウント情報(氏名またはニックネーム、メールアドレス、認証プロバイダのID 等)</li>
          <li>本サービス利用時にユーザーが入力するテキスト等(添削依頼文、面接回答、志望理由、自己分析の回答 等)</li>
          <li>決済情報(決済代行会社Stripe, Inc.を通じて処理され、当社はクレジットカード番号そのものを保持しません)</li>
          <li>アクセスログ、Cookie、IPアドレス、端末情報等の技術情報</li>
          <li>Google アナリティクス(GA4)による利用状況の統計情報</li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. 利用目的",
    body: (
      <>
        取得した情報は、以下の目的で利用します。
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>本サービスの提供、維持、保護および改善のため</li>
          <li>ユーザー認証、本人確認のため</li>
          <li>利用料金の決済処理のため</li>
          <li>お問い合わせへの対応のため</li>
          <li>本サービスに関するお知らせ、メンテナンス等の通知のため</li>
          <li>利用状況の分析、サービス改善・新機能開発の検討のため</li>
          <li>不正利用の防止、規約違反への対応のため</li>
        </ul>
        なお、当社は、ユーザーが本サービスに入力した内容を、外部の生成AIモデルの追加学習用データとして利用することはありません。
      </>
    ),
  },
  {
    heading: "4. 第三者提供",
    body: (
      <>
        当社は、法令に基づく場合を除き、あらかじめユーザーの同意を得ることなく、個人情報を第三者に提供することはありません。ただし、本サービスの提供に必要な範囲で、以下のような業務委託先に情報を預託することがあります。
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>クラウドインフラ・データベース事業者(Vercel, Supabase 等)</li>
          <li>決済代行事業者(Stripe, Inc.)</li>
          <li>認証基盤事業者(Clerk)</li>
          <li>生成AIモデルの提供事業者(添削・診断・面接等の応答生成のため、入力内容の一部をAPI経由で送信します)</li>
          <li>アクセス解析事業者(Google アナリティクス)</li>
        </ul>
      </>
    ),
  },
  {
    heading: "5. SNS公式アカウントの運用について",
    body: (
      <>
        当社は、本サービスの広報・マーケティングを目的として、Instagram・TikTok・YouTube・X(旧Twitter)・Threads等のSNS公式アカウントを運用し、各プラットフォームが提供するAPI(Content Posting API等)を通じて投稿を行うことがあります。この運用にあたり取得・利用する情報は、当社が管理する公式アカウントの認証情報および投稿コンテンツに限られ、SNS利用者個人を特定する情報を本サービスの用途外で収集することはありません。
      </>
    ),
  },
  {
    heading: "6. Cookie等の利用",
    body: (
      <>
        本サービスは、ログイン状態の維持、利用状況の分析等を目的として、Cookieおよびこれに類する技術を利用します。ユーザーはブラウザの設定によりCookieの利用を制限することができますが、その場合、本サービスの一部機能が利用できなくなることがあります。
      </>
    ),
  },
  {
    heading: "7. 安全管理措置",
    body: (
      <>
        当社は、取得した情報の漏えい、滅失またはき損の防止その他情報の安全管理のために、アクセス制御、通信の暗号化(TLS)等の必要かつ適切な措置を講じます。
      </>
    ),
  },
  {
    heading: "8. 開示・訂正・削除等の請求",
    body: (
      <>
        ユーザーは、当社が保有する自己の個人情報について、法令の定めに基づき、開示、訂正、追加、削除、利用停止等を請求することができます。ご希望の場合は、下記お問い合わせ先までご連絡ください。本人確認のうえ、合理的な期間内に対応いたします。
      </>
    ),
  },
  {
    heading: "9. 未成年者の利用について",
    body: (
      <>
        本サービスは高校生・大学生等の未成年者による利用を想定しています。未成年者が本サービスを利用する場合、保護者等の同意を得たうえでご利用いただくようお願いいたします。
      </>
    ),
  },
  {
    heading: "10. プライバシーポリシーの変更",
    body: (
      <>
        当社は、必要に応じて本ポリシーの内容を変更することがあります。変更後の内容は、本サービス上に表示した時点より効力を生じるものとします。重要な変更を行う場合は、本サービス上での告知等、適切な方法によりユーザーに周知します。
      </>
    ),
  },
  {
    heading: "11. お問い合わせ窓口",
    body: (
      <>
        本ポリシーに関するお問い合わせは、下記までご連絡ください。
        <br />
        株式会社ブルースプリング
        <br />
        E-mail:{" "}
        <a
          href="mailto:pr@bluespring.co.jp"
          className="text-indigo-600 underline underline-offset-2 hover:text-indigo-500"
        >
          pr@bluespring.co.jp
        </a>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-800">
      <h1 className="text-xl font-bold text-slate-900">プライバシーポリシー</h1>
      <p className="mt-2 text-sm text-slate-500">
        制定日: 2026年9月17日
        <br />
        本ポリシーは、株式会社ブルースプリングが提供する「アオハルOS」における個人情報等の取り扱いを定めるものです。
      </p>

      <div className="mt-10 space-y-8 border-t border-slate-200 pt-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-sm font-bold text-slate-900">{s.heading}</h2>
            <div className="mt-2 text-sm leading-relaxed text-slate-700">
              {s.body}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 flex gap-4 text-sm">
        <Link href="/" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-500">
          トップページに戻る
        </Link>
        <Link
          href="/legal/terms"
          className="text-indigo-600 underline underline-offset-2 hover:text-indigo-500"
        >
          利用規約
        </Link>
      </div>
    </main>
  );
}
