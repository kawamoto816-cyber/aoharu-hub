import Link from "next/link";
import { StationShell } from "@/components/station/StationShell";
import { MyStatus } from "@/components/station/MyStatus";
import { BIN, BIN_TIMETABLE } from "@/lib/station/gakushubin";

// /station：ラーニングステーションの入口。いちばん上に、実際に動かす有料モニター「学習便」（試験運用）を置く。
// その下に、駅の地図（無料の部屋と、準備中の部屋）と、自分の段・コインの状態（試作）。
// サークルと教壇は準備中。会員権・登壇権としての課金はやめたので、値段は出さない（2026-11-23）。

const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;

const ROOMS = [
  { href: "/learn", name: "自習ホーム", tag: "無料", lines: ["授業・演習・模試", "さかのぼりで根っこへ", "AIコーチが伴走"], soon: false },
  { href: "/station/room", name: "アオハルーム", tag: "無料", lines: ["みんなで黙って学ぶ部屋", "25分集中→ふり返り→休憩", "学びポイントで勉強王"], soon: false },
  { href: "/station/circle", name: "ラーニングサークル", tag: "準備中（試作を公開中）", lines: ["4〜6人で週に1回", "学んだことをシェア", "問いと拍手で返す"], soon: true },
  { href: "/station/stage", name: "教壇", tag: "準備中（試作を公開中）", lines: ["生徒が先生になる", "書いて、または声で授業", "AIが点検し星がつく"], soon: true },
];

export default function Page() {
  return (
    <StationShell>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">学ぶ・シェアする・教える</p>
      <h1 className="m-0 mt-1 text-[28px] font-black leading-tight">ラーニングステーション</h1>
      <p className="m-0 mt-2 max-w-[720px] text-[14px] leading-relaxed text-[#3A3D55]">
        学びは無料。学ぶ場と時間に会費がかかる。教科の授業・演習・模試は、これまでどおり全部無料です。決まった時刻に集まり、見守り役のもとで確実に学習に向かう「場と時間」にだけ、会費をいただきます。
      </p>

      <section aria-labelledby="bin-title" className="mt-4 rounded-[16px] border-[2px] border-[#15172B] bg-[#FFE45C] p-4 sm:p-5">
        <p className="m-0 flex flex-wrap items-center gap-2 text-[12px] font-black">
          <span className="rounded-full bg-[#15172B] px-2.5 py-0.5 text-white">試験運用・モニター募集中</span>
          <span>中学生 {BIN.seats}名・実際に参加費をいただく有料モニターです</span>
        </p>
        <h2 id="bin-title" className="m-0 mt-1 text-[24px] font-black leading-tight">{BIN.name}</h2>
        <p className="m-0 mt-1 max-w-[760px] text-[14px] leading-relaxed">
          時刻表のある「便」に乗る、オンラインの自習室です。決まった時刻に集まり、見守り役のもとで90分学びます。乗ったかどうか（出席）と学習量は、その日のうちに保護者の方へ報告します。
        </p>
        <dl className="m-0 mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-3">
            <dt className="text-[11.5px] font-black text-[#5A5D73]">期間</dt>
            <dd className="m-0 text-[14px] font-black leading-snug">{BIN.period}</dd>
          </div>
          <div className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-3">
            <dt className="text-[11.5px] font-black text-[#5A5D73]">時刻表</dt>
            <dd className="m-0 text-[14px] font-black leading-snug">
              {BIN_TIMETABLE.map((t) => (
                <span key={t.name} className="block">
                  {t.name}：{t.days} {t.time}
                </span>
              ))}
            </dd>
          </div>
          <div className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-3">
            <dt className="text-[11.5px] font-black text-[#5A5D73]">参加費</dt>
            <dd className="m-0 text-[14px] font-black leading-snug">
              {yen(BIN.priceJpy)}（税込）
              <span className="block text-[12px] font-bold text-[#3A3D55]">期間中は乗り放題。追加の費用はありません</span>
            </dd>
          </div>
        </dl>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Link href="/station/gakushubin" className="rounded-[10px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 py-2 text-[14px] font-black text-white no-underline">
            保護者の方へのご案内 →
          </Link>
          <Link href="/station/gakushubin/ride" className="rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-4 py-2 text-[14px] font-black text-[#15172B] no-underline">
            乗車する →
          </Link>
          <span className="text-[12px] font-bold text-[#3A3D55]">お申し込みは保護者の方から。「乗車する」は、参加が決まった生徒の入口です。</span>
        </div>
      </section>

      <h2 className="m-0 mt-6 text-[17px] font-black">駅の地図</h2>
      <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
        自習ホームとアオハルームは無料です。ラーニングサークルと教壇は準備中で、試作を公開しています（お金はかかりません。値段や始める時期は決まっていません）。
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ROOMS.map((r, i) => (
          <Link key={r.name} href={r.href} className={`relative block rounded-[14px] border-[1.5px] p-4 text-[#15172B] no-underline hover:-translate-y-0.5 ${r.soon ? "border-dashed border-[#5A5D73] bg-[#F7F6F1]" : "border-[#15172B] bg-white"}`}>
            <span className="text-[11px] font-black text-[#5A5D73]">部屋 {i + 1}</span>
            <span className="block text-[18px] font-black">{r.name}</span>
            <span className={`inline-block rounded-full px-2 py-0.5 text-[11.5px] font-black ${r.soon ? "bg-[#E4E2D8] text-[#3A3D55]" : "bg-[#E6EAFB] text-[#1533B8]"}`}>{r.tag}</span>
            <ul className="m-0 mt-2 list-none p-0 text-[13.5px] leading-relaxed">
              {r.lines.map((l) => (
                <li key={l}>・{l}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
      <Link href="/station/shelf" className="mt-3 block rounded-[14px] border-[1.5px] border-[#15172B] bg-[#EFEDE4] p-4 text-[#15172B] no-underline">
        <span className="block text-[16px] font-black">自分の棚（試作）</span>
        <span className="block text-[13px] leading-relaxed text-[#3A3D55]">学んだ単元・シェアカード・授業の記録が積み上がる。保護者への月のレポートと、総合型選抜の活動の記録になる。</span>
      </Link>
      <Link href="/station/guide" className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-3 text-[#15172B] no-underline">
        <span className="text-[13px] font-black text-[#1533B8]">はじめての方へ</span>
        <span className="text-[15px] font-black">使い方ツアー：10のステップで駅をひとまわり（試作）</span>
        <span aria-hidden="true" className="ml-auto font-black">→</span>
      </Link>

      <MyStatus />

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <section className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
          <h2 className="m-0 text-[16px] font-black">2つの物差しで、先生役を格付け（試作）</h2>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">
            <b>わかった星</b>は、授業案のAI点検と、受講者が確かめの1問を解けたかで星をつけます（わからせたかを見る）。<b>受けた人の声</b>は、授業を受けた生徒の評価だけで格付けします（人気を見る）。
          </p>
          <Link href="/station/ranking" className="mt-2 inline-block text-[13px] font-black text-[#1533B8]">格付けの見本を見る →</Link>
        </section>
        <section className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
          <h2 className="m-0 text-[16px] font-black">ブルーコイン（試作）</h2>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">
            学ぶ・シェアする・問いを返す・教えると貯まります。教えてもらった人は、先生役に感謝のコインを送れます。コインはお金では買えず、換金もできません。年2回のボーナス期の報酬・景品は、法律の確認が済んでから始めます。
          </p>
        </section>
      </div>
    </StationShell>
  );
}
