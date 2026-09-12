import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | アオハルOS",
  description:
    "アオハルOS(テンサクン・メンサツ等)を提供する株式会社ブルースプリングの特定商取引法に基づく表記です。",
};

type Row = {
  label: string;
  value: React.ReactNode;
};

const rows: Row[] = [
  { label: "サービス名", value: "アオハルOS(テンサクン・メンサツ 等)" },
  { label: "販売事業者", value: "株式会社ブルースプリング(BLUE SPRING Co., Ltd.)" },
  { label: "代表者", value: "川本潤" },
  {
    label: "所在地",
    value: (
      <>
        〒700-0826
        <br />
        岡山県岡山市北区磨屋町7-2
      </>
    ),
  },
  {
    label: "電話番号",
    value:
      "ご請求をいただいた場合には、遅滞なく開示いたします。下記メールアドレスまでご連絡ください。",
  },
  {
    label: "メールアドレス",
    value: (
      <a
        href="mailto:pr@bluespring.co.jp"
        className="text-indigo-600 underline underline-offset-2 hover:text-indigo-500"
      >
        pr@bluespring.co.jp
      </a>
    ),
  },
  {
    label: "販売価格",
    value: (
      <>
        Proプラン: 月額980円(税込)
        <br />
        Maxプラン: 月額2,980円(税込)
        <br />
        <span className="text-slate-500">
          ※表示価格は全て消費税込みの金額です。
        </span>
      </>
    ),
  },
  {
    label: "商品代金以外の必要料金",
    value:
      "インターネット接続料金・通信料等はお客様のご負担となります。",
  },
  {
    label: "お支払い方法",
    value: "クレジットカード決済(Stripe, Inc.の決済システムを利用しています)",
  },
  {
    label: "お支払い時期",
    value:
      "お申込み(ご契約)時に決済され、以降は各プランの契約更新日ごとに自動的に課金されます(月額課金・サブスクリプション)。",
  },
  {
    label: "サービス提供時期",
    value: "決済完了後、直ちにご利用いただけます。",
  },
  {
    label: "返品・キャンセルについて",
    value: (
      <>
        本サービスはデジタルサービスの性質上、提供開始後の返品・返金はお受けできません。
        <br />
        ご契約の解約はサービス内の「プラン管理」よりいつでも行うことができます。解約手続き完了後も、現在の請求期間の終了まではサービスをご利用いただけ、その後自動更新が停止します。既にお支払いいただいた期間分の日割り返金は行っておりません。
      </>
    ),
  },
  {
    label: "動作環境",
    value: "最新版の主要Webブラウザ(Google Chrome, Safari 等)でのご利用を推奨します。",
  },
];

export default function TokushohoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-800">
      <h1 className="text-xl font-bold text-slate-900">
        特定商取引法に基づく表記
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        本ページは、アオハルOS(テンサクン・メンサツ 等)を提供する株式会社ブルースプリングが、特定商取引法第11条に基づき表示するものです。
      </p>

      <dl className="mt-10 divide-y divide-slate-200 border-t border-slate-200">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-4"
          >
            <dt className="text-sm font-bold text-slate-500">{row.label}</dt>
            <dd className="text-sm leading-relaxed text-slate-800">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 text-sm">
        <Link href="/" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-500">
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}
