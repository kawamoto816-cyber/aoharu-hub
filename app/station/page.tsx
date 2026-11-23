import Link from "next/link";
import { StationShell } from "@/components/station/StationShell";
import { BIN, BIN_TIMETABLE } from "@/lib/station/gakushubin";

// /station：ラーニングステーションの入口。保護者が読むページにした（2026-11-23 代表の判断）。
//   ・売るものは「アオハル 学習便」1つ。最初の画面に、保護者のLINEに届く報告の見本を置く
//   ・無料の自習室「アオハルーム」を、ちがい（時刻の約束・見守り役・保護者への報告）が分かる形で並べる
//   ・準備中の試作（サークル・教壇・掲示板・格付け・コイン・自分の棚）は /station/lab（実験室）へ移した
// 文言を直すときは、保護者向けご案内（/station/gakushubin）と食いちがわないようにする。

const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;

const REPORTS = [
  { label: "未着のお知らせ　19:35", lines: ["予約の夜便（19:30発）にまだ乗車していません。20:00までは途中から乗れます。"] },
  { label: "当日報告　21:02", lines: ["乗車 19:28 ／ 下車 20:57（90分・完走）", "宣言：連立方程式の演習を20問", "結果：24問を解き、19問正解"] },
  { label: "週報　日曜の夕方", lines: ["予約4便のうち4便に乗車。合計6時間", "84問を解き63問正解。単元模試2回"] },
];

const COMPARE: [string, string, string][] = [
  ["開いている時間", "いつでも", BIN_TIMETABLE.map((t) => `${t.name} ${t.days}`).join("／")],
  ["時刻の約束", "なし。いつ来ても、いつ出てもよい", "あり。予約した便に乗る"],
  ["見守り役", "いません", "毎便います（進行と声かけ）"],
  ["保護者への報告", "ありません", "未着通知・当日報告・週報"],
  ["班とホームルーム", "ありません", "5人の班で週1回"],
  ["声・映像", "ありません（ニックネームと学習中の教科だけ）", "Zoom。顔出しは任意"],
];

const STEPS: [string, string, string][] = [
  ["19:25", "入室", "ニックネームで入る"],
  ["19:30", "点呼・宣言", "今日やる量を言う"],
  ["19:35", "25分 × 2", "間に5分休憩"],
  ["20:35", "解き直し 15分", "間違えた問題だけ"],
  ["20:50", "説明して終了", "学んだことを1分で"],
  ["21:00", "報告が届く", "その日のうちに"],
];

const FAQS: [string, string][] = [
  ["分からない問題は誰が教えてくれますか", "見守り役は教科を教えません。教材のアオハルラーンと、その中のAIコーチで解決します。"],
  ["スマートフォン1台でも参加できますか", "できません。パソコンまたはタブレットをご用意ください。"],
  ["期間が終わったあとはどうなりますか", "自動で継続になったり、課金されたりすることはありません。"],
];

const card = "rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4 sm:p-5";
const primary = "inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#1533B8] px-6 text-[16px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]";
const secondary = "inline-flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-6 text-[16px] font-black text-[#15172B] no-underline";

export default function Page() {
  return (
    <StationShell notice={<></>}>
      {/* 最初の画面：約束と、届くものの見本 */}
      <section className="grid items-center gap-6 lg:grid-cols-2">
        <div>
          <p className="m-0 inline-block rounded-full bg-[#15172B] px-3 py-1 text-[12.5px] font-black text-[#FFE45C]">
            中学生・モニター募集 {BIN.seats}名 ／ {BIN.period.split("〜")[0]} 発車
          </p>
          <h1 className="m-0 mt-3 text-[32px] font-black leading-[1.35] sm:text-[40px]">
            「勉強しなさい」を、
            <br />
            わたしたちが引き受けます。
          </h1>
          <p className="m-0 mt-3 text-[15.5px] leading-relaxed text-[#3A3D55]">
            決まった時刻にオンラインの自習室に集まり、見守り役のもとで90分学ぶ「{BIN.name}」。乗ったかどうか、何問解いたかを、その日のうちに保護者の方へお届けします。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/station/gakushubin" className={primary}>
              保護者の方へ：ご案内とお申し込み
            </Link>
          </div>
          <p className="m-0 mt-3 text-[13px] leading-relaxed text-[#4A4D63]">
            4週間 {yen(BIN.priceJpy)}（税込）・{BIN.refundBy}まで全額返金・自動更新なし。
            <Link href="/station/gakushubin/ride" className="ml-1 font-black text-[#1533B8]">参加が決まった生徒はこちら</Link>
          </p>
          <p className="m-0 mt-2 text-[14px] font-black">
            <Link href="/station/room" className="text-[#1533B8]">生徒のみなさんへ：まず無料の自習室（アオハルーム）に入ってみる →</Link>
          </p>
        </div>
        <div className="rounded-[20px] border-[1.5px] border-[#15172B] bg-[#8FA8C8] p-4 shadow-[5px_5px_0_#15172B]">
          <p className="m-0 text-[12.5px] font-black">保護者の方のLINEに届くもの（見本）</p>
          <div className="mt-2 grid gap-2.5">
            {REPORTS.map((r) => (
              <div key={r.label} className="rounded-[4px_16px_16px_16px] bg-white px-3.5 py-3 text-[13.5px] leading-relaxed">
                <p className="m-0 text-[12.5px] font-black text-[#1B7F3B]">{r.label}</p>
                {r.lines.map((l) => (
                  <p key={l} className="m-0">{l}</p>
                ))}
              </div>
            ))}
          </div>
          <p className="m-0 mt-2 text-[12px]">書くのは事実と数字だけです。評価や指導の言葉は入れません。</p>
        </div>
      </section>

      {/* 入口は2つ */}
      <section className="mt-10">
        <h2 className="m-0 text-[22px] font-black leading-snug">入口は2つ。ちがいは「約束」と「報告」です</h2>
        <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#4A4D63]">
          ひとりで学ぶのも、みんなで黙って学ぶのも無料です。時刻を決めて見守られ、記録が保護者に届くのが学習便です。
        </p>
        <div className={`${card} mt-4 overflow-x-auto !p-2`}>
          <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
            <thead>
              <tr>
                <td className="p-3" />
                <th scope="col" className="p-3 font-black">
                  アオハルーム
                  <span className="block text-[12.5px] text-[#1533B8]">無料の自習室（試作）</span>
                </th>
                <th scope="col" className="rounded-t-[10px] bg-[#FFE45C] p-3 font-black">
                  {BIN.name}
                  <span className="block text-[12.5px]">4週間 {yen(BIN.priceJpy)}（税込）</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([k, free, paid]) => (
                <tr key={k} className="border-t border-[#C9C6B8]">
                  <th scope="row" className="p-3 font-black">{k}</th>
                  <td className="p-3 text-[#4A4D63]">{free}</td>
                  <td className="bg-[#FFF6C4] p-3 font-bold">{paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/station/gakushubin" className={primary}>学習便のご案内（保護者の方）</Link>
          <Link href="/station/room" className={secondary}>無料の自習室に入る（生徒）</Link>
        </div>
      </section>

      {/* 1回の流れ */}
      <section className="mt-10">
        <h2 className="m-0 text-[22px] font-black leading-snug">1回は90分。毎回おなじ流れです</h2>
        <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#4A4D63]">夜便の例です。見守り役は進行と声かけだけを行い、教科は教えません。</p>
        <ol className="m-0 mt-4 grid list-none gap-2.5 p-0 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map(([t, name, text]) => (
            <li key={t} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
              <span className="block text-[12.5px] font-black text-[#1533B8]">{t}</span>
              <span className="block text-[15px] font-black">{name}</span>
              <span className="block text-[12.5px] text-[#4A4D63]">{text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 時刻表と参加費 */}
      <section className="mt-10">
        <h2 className="m-0 text-[22px] font-black leading-snug">時刻表と参加費</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {BIN_TIMETABLE.map((t) => (
            <div key={t.name} className={card}>
              <p className="m-0 text-[12px] font-black text-[#1533B8]">時刻表</p>
              <p className="m-0 text-[17px] font-black">{t.name}　{t.days}</p>
              <p className="m-0 text-[14px] text-[#3A3D55]">{t.time}</p>
            </div>
          ))}
          <div className={`${card} !bg-[#FFF6C4]`}>
            <p className="m-0 text-[12px] font-black text-[#1533B8]">参加費</p>
            <p className="m-0 text-[17px] font-black">{yen(BIN.priceJpy)}（税込）</p>
            <p className="m-0 text-[14px] text-[#3A3D55]">{BIN.period}に乗り放題。{BIN.refundBy}までのお申し出で全額返金。期間後の自動更新はありません。</p>
          </div>
        </div>
      </section>

      {/* 約束しないこと・安全 */}
      <section className="mt-10 grid gap-3 sm:grid-cols-2">
        <div className={card}>
          <h2 className="m-0 text-[17px] font-black">約束しないこと</h2>
          <ul className="m-0 mt-2 list-disc pl-5 text-[14px] leading-relaxed text-[#3A3D55]">
            <li>見守り役は教科を教えません</li>
            <li>成績の向上はお約束しません</li>
            <li>お約束するのは、学習の時間と、その記録です</li>
          </ul>
        </div>
        <div className={card}>
          <h2 className="m-0 text-[17px] font-black">安心のための決まり</h2>
          <ul className="m-0 mt-2 list-disc pl-5 text-[14px] leading-relaxed text-[#3A3D55]">
            <li>表示名はニックネームだけ。本名・学校名は出しません</li>
            <li>生徒どうしの個別メッセージはできません</li>
            <li>顔出しは任意。便は録画し、30日後に削除します</li>
          </ul>
        </div>
      </section>

      {/* 無料の自習室 */}
      <section className="mt-10">
        <h2 className="m-0 text-[22px] font-black leading-snug">無料の自習室「アオハルーム」</h2>
        <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#4A4D63]">
          みんなで黙って学ぶ部屋です。25分集中して、ふり返り、休憩する。いつでも入れます（いまは試作で、部屋の仲間の表示は見本です）。
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className={card}>
            <h3 className="m-0 text-[16px] font-black">ひとりだと続かない日に</h3>
            <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">やることを決めて集中し、終わったらふり返る。競うのは座っていた時間ではなく、学んだ量（学びポイント）です。</p>
            <Link href="/station/room" className={`${secondary} mt-3`}>アオハルームに入る</Link>
          </div>
          <div className="rounded-[16px] bg-[#15172B] p-4 text-white sm:p-5">
            <p className="m-0 text-[12.5px] font-black text-[#FFE45C]">それでも続かないときは</p>
            <p className="m-0 text-[20px] font-black">時刻を決めて、見守られる学習便へ</p>
            <p className="m-0 mt-1 text-[14px] leading-relaxed text-white/75">お申し込みは保護者の方からです。おうちの人に、このページを見せてください。</p>
          </div>
        </div>
      </section>

      {/* よくあるご質問 */}
      <section className="mt-10">
        <h2 className="m-0 text-[22px] font-black leading-snug">よくあるご質問</h2>
        <dl className="m-0 mt-2">
          {FAQS.map(([q, a]) => (
            <div key={q} className="border-b border-[#C9C6B8] py-3">
              <dt className="text-[15px] font-black">Q. {q}</dt>
              <dd className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">{a}</dd>
            </div>
          ))}
        </dl>
        <Link href="/station/gakushubin" className="mt-3 inline-block text-[14px] font-black text-[#1533B8]">12問すべてを見る →</Link>
      </section>

      {/* 申し込み */}
      <section className={`${card} mt-10 !bg-[#EEF1FF] text-center`}>
        <p className="m-0 text-[20px] font-black">申込締切 {BIN.applyBy}・定員{BIN.seats}名</p>
        <p className="m-0 mt-1 text-[14px] text-[#3A3D55]">お申し込みは保護者の方から。所要時間は約5分です。</p>
        <Link href="/station/gakushubin" className={`${primary} mt-4`}>保護者の方へ：ご案内とお申し込み</Link>
      </section>

      <p className="m-0 mt-8 text-[13px] leading-relaxed text-[#4A4D63]">
        ラーニングサークル・教壇・掲示板・格付け・ブルーコインは準備中です。試作は
        <Link href="/station/lab" className="mx-1 font-black text-[#1533B8]">実験室</Link>
        にまとめました。
      </p>
    </StationShell>
  );
}
