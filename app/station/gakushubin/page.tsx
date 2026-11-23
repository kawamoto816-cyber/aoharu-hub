import type { Metadata } from "next";
import { BinDoc, BinSection } from "@/components/station/BinDoc";
import { BIN, BIN_TIMETABLE } from "@/lib/station/gakushubin";

// /station/gakushubin：学習便（試験運用）の保護者向けご案内。申込フォームへつなぐ。
export const metadata: Metadata = {
  title: "アオハル 学習便 モニター募集（中学生・保護者の方へ）",
  description: "決まった時刻にオンラインの自習室に集まり、見守り役のもとで90分学ぶ「学習便」の試験運用モニターを募集します。毎回の学習記録を保護者の方へお届けします。",
  robots: { index: false, follow: false },
};

const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;

const rows: { label: string; value: string }[] = [
  { label: "対象", value: `中学1〜3年生 ${BIN.seats}名（定員に達し次第締切）` },
  { label: "期間", value: BIN.period },
  { label: "時刻表", value: BIN_TIMETABLE.map((t) => `${t.name}：${t.days} ${t.time}`).join(" ／ ") },
  { label: "乗車回数", value: "週3便以上をご予約ください（乗り放題）。班のホームルームの曜日は必須です" },
  { label: "参加費", value: `${yen(BIN.priceJpy)}（税込）。期間中の追加費用はありません` },
  { label: "お支払い", value: `保護者名義のクレジットカード等。${BIN.payBy}まで` },
  { label: "返金", value: `${BIN.refundBy}までにお申し出いただければ全額を返金します` },
  { label: "必要なもの", value: "通信環境、パソコンまたはタブレット、イヤホン" },
  { label: "説明会", value: `${BIN.briefing}・オンライン30分（時刻は参加が決まった方にご案内します）` },
  { label: "お願い", value: "週報をお読みいただき、中間と終了時のアンケートにご回答ください" },
];

export default function Page() {
  return (
    <BinDoc
      title="「勉強しなさい」を、わたしたちが引き受けます。"
      lead={
        <>
          学習便は、決まった時刻にオンラインの自習室に集まり、見守り役のもとで90分間学習するサービスです。教材は無料の学習サービス「アオハルラーン」を使います。お子さまが乗ったかどうか、何問解いたかを、その日のうちに保護者の方へお知らせします。今回は正式開始前の試験運用です。約4週間ご参加いただき、率直なご意見をお聞かせください。
        </>
      }
    >
      <BinSection title="このようなご家庭に">
        <ul className="list-disc space-y-1 pl-5">
          <li>家ではなかなか机に向かわず、声をかけるたびに言い合いになる</li>
          <li>勉強していると言うが、実際にどれだけ進んだのか分からない</li>
          <li>塾のない日の学習時間を確保したい</li>
        </ul>
      </BinSection>

      <BinSection title="1回（1便）の流れ">
        <ol className="list-decimal space-y-1 pl-5">
          <li>決まった時刻に入室し、点呼を受けます。未着の場合は5分後に保護者の方へお知らせします。</li>
          <li>「今日やること」を宣言します。</li>
          <li>25分×2回、15分×1回、学習します。手が止まっていれば見守り役が声をかけます。</li>
          <li>学んだことを1分で説明して終了です。</li>
          <li>終了後、学習時間・解いた問題数・正解数を保護者の方へお送りします。</li>
        </ol>
        <p>週1回、5人の班で20分のホームルームがあります（夜便の20:30〜20:50）。その週に学んだことを1人3分ずつ話します。</p>
      </BinSection>

      <BinSection title="募集要項">
        <dl className="divide-y divide-slate-200 border-y border-slate-200">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <dt className="font-bold text-slate-500">{r.label}</dt>
              <dd className="text-slate-800">{r.value}</dd>
            </div>
          ))}
        </dl>
      </BinSection>

      <BinSection title="安心してご参加いただくために">
        <ul className="list-disc space-y-1 pl-5">
          <li>すべての便に運営の見守り役が同席します。週1回のホームルームの20分は班の生徒だけで進め、見守り役は同席せずに録画で確認します。</li>
          <li>表示名はニックネームのみです。本名や学校名は出しません。</li>
          <li>生徒どうしの個別メッセージはできない設定です。連絡先やSNSの交換は禁止しています。</li>
          <li>顔を映すかどうかは任意です。手元を映すカメラをおすすめしています。</li>
          <li>安全確認のため便を録画し、30日後に削除します。</li>
        </ul>
      </BinSection>

      <BinSection title="ご理解いただきたいこと">
        <ul className="list-disc space-y-1 pl-5">
          <li>見守り役は教科の指導をしません。分からない所は教材とAIコーチで解決します。</li>
          <li>試験運用のため、進め方を途中で改めることがあります。</li>
          <li>成績の向上をお約束するものではありません。お約束するのは、学習の時間とその記録をお届けすることです。</li>
        </ul>
      </BinSection>

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center">
        <p className="text-sm font-bold text-slate-900">お申し込みは保護者の方からお願いします（所要時間：約5分）</p>
        <a href={BIN.applyUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white hover:bg-indigo-500">
          モニターに申し込む
        </a>
        <p className="mt-3 text-xs text-slate-600">
          お問い合わせ：
          <a href={`mailto:${BIN.mail}`} className="text-indigo-600 underline underline-offset-2">
            {BIN.mail}
          </a>
        </p>
      </div>
    </BinDoc>
  );
}
