import Link from "next/link";
import { StationShell } from "@/components/station/StationShell";
import { MyStatus } from "@/components/station/MyStatus";

// /station/lab：実験室。準備中の試作（ラーニングサークル・教壇・掲示板・格付け・ブルーコイン・自分の棚）をここにまとめる。
// 入口（/station）は、保護者が読む「学習便」と無料の自習室だけにした（2026-11-23）。試作は消さずに、ここから全部たどれる。

const ROOMS = [
  { href: "/learn", name: "自習ホーム", tag: "無料", lines: ["授業・演習・模試", "さかのぼりで根っこへ", "AIコーチが伴走"], soon: false },
  { href: "/station/room", name: "アオハルーム", tag: "無料", lines: ["みんなで黙って学ぶ部屋", "25分集中→ふり返り→休憩", "学びポイントで勉強王"], soon: false },
  { href: "/station/circle", name: "ラーニングサークル", tag: "準備中（試作を公開中）", lines: ["4〜6人で週に1回", "学んだことをシェア", "問いと拍手で返す"], soon: true },
  { href: "/station/stage", name: "教壇", tag: "準備中（試作を公開中）", lines: ["生徒が先生になる", "書いて、または声で授業", "AIが点検し星がつく"], soon: true },
];

const MORE = [
  { href: "/station/board", name: "掲示板", text: "「教えて」を出すと、同じ疑問の人が集まります。" },
  { href: "/station/ranking", name: "格付け", text: "わかった星と、受けた人の声。2つの物差しの見本。" },
  { href: "/station/shelf", name: "自分の棚", text: "学んだ単元・シェアカード・授業の記録が積み上がります。" },
  { href: "/station/guide", name: "使い方ツアー", text: "10のステップで、駅をひとまわり。" },
];

export default function Page() {
  return (
    <StationShell here="実験室">
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">準備中の試作をまとめた部屋</p>
      <h1 className="m-0 mt-1 text-[26px] font-black">実験室</h1>
      <p className="m-0 mt-1 max-w-[760px] text-[14px] leading-relaxed text-[#3A3D55]">
        学ぶ → 集まる → シェアする → 教える。ラーニングステーションのもとの構想を、ためしに動かせる形で置いています。お金はかかりません。値段や始める時期は決まっていません。
      </p>
      <h2 className="m-0 mt-5 text-[17px] font-black">駅の地図（もとの構想）</h2>
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

      <h2 className="m-0 mt-6 text-[17px] font-black">ほかの試作</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {MORE.map((m) => (
          <Link key={m.href} href={m.href} className="block rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 text-[#15172B] no-underline">
            <span className="block text-[16px] font-black">{m.name}</span>
            <span className="block text-[13px] leading-relaxed text-[#3A3D55]">{m.text}</span>
          </Link>
        ))}
      </div>
    </StationShell>
  );
}
