import type { Metadata } from "next";
import { BinDoc, BinSection } from "@/components/station/BinDoc";
import { BIN } from "@/lib/station/gakushubin";

// /station/gakushubin/privacy：学習便（試験運用）で取得する個人情報の取扱い。
export const metadata: Metadata = {
  title: "アオハル 学習便 試験運用 プライバシーポリシー",
  robots: { index: false, follow: false },
};

const collected: { label: string; value: string }[] = [
  { label: "保護者の情報", value: "氏名、メールアドレス、電話番号、申込フォームとアンケートの回答" },
  { label: "生徒の情報", value: "学年、ニックネーム、出席の記録、学習の記録（学習時間、解答数、正解数、学んだ単元）、アンケートの回答" },
  { label: "便の録画", value: "便に参加中の映像・音声・チャット" },
];

export default function Page() {
  return (
    <BinDoc title="試験運用 プライバシーポリシー" lead={`株式会社ブルースプリング（以下「当社」）は、「${BIN.name}」試験運用で取得する個人情報を次のとおり取り扱います。`}>
      <BinSection title="1. 取得する情報">
        <dl className="divide-y divide-slate-200 border-y border-slate-200">
          {collected.map((r) => (
            <div key={r.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <dt className="font-bold text-slate-500">{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
        <p>生徒の本名と学校名は取得しません。クレジットカード情報は決済代行会社が取得し、当社は保持しません。</p>
      </BinSection>

      <BinSection title="2. 利用目的">
        <ul className="list-disc space-y-1 pl-5">
          <li>本サービスの提供と運営（出席確認、班分け、連絡）</li>
          <li>保護者への学習記録の報告</li>
          <li>参加費の請求と返金</li>
          <li>参加者の安全確認</li>
          <li>サービスの改善と、正式開始に向けた検討（個人が特定できない統計としての分析・公表を含みます）</li>
          <li>本サービスの継続に関するご案内</li>
        </ul>
      </BinSection>

      <BinSection title="3. 第三者への提供">
        <p>法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。</p>
      </BinSection>

      <BinSection title="4. 業務の委託と外部サービス">
        <p>本サービスの運営にあたり、次の外部サービスを利用します。これらの事業者のサーバーは国外に置かれる場合があります。</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>オンライン会議：Zoom</li>
          <li>決済：Stripe</li>
          <li>申込フォームと記録の管理：Google</li>
          <li>保護者への連絡：LINE</li>
          <li>ログインと学習記録の保存：Clerk、Supabase</li>
          <li>サイトの配信：Vercel</li>
        </ul>
      </BinSection>

      <BinSection title="5. 保管期間">
        <ul className="list-disc space-y-1 pl-5">
          <li>便の録画：録画日から30日後に削除します。</li>
          <li>その他の情報：試験運用の終了から1年間保管したのち削除します。継続してご利用いただく場合は、引き続き保管します。</li>
        </ul>
      </BinSection>

      <BinSection title="6. 安全管理">
        <p>個人情報を扱う担当者を限定し、アクセス権限の管理その他必要な措置を講じます。</p>
      </BinSection>

      <BinSection title="7. 開示・訂正・削除のご請求">
        <p>保護者は、ご自身および生徒の情報について、開示、訂正、利用停止、削除を請求できます。下記の窓口までご連絡ください。ご本人確認のうえ、法令に従い対応します。</p>
      </BinSection>

      <BinSection title="8. 未成年の方の情報">
        <p>生徒の情報は、保護者の同意を得たうえで取得します。</p>
      </BinSection>

      <BinSection title="9. お問い合わせ窓口">
        <p>
          株式会社ブルースプリング　岡山県岡山市北区磨屋町7-2　代表者 川本潤
          <br />
          <a href={`mailto:${BIN.mail}`} className="text-indigo-600 underline underline-offset-2">
            {BIN.mail}
          </a>
        </p>
      </BinSection>
      <p className="text-xs text-slate-500">2026年12月7日 制定</p>
    </BinDoc>
  );
}
