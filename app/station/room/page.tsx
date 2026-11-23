import type { Metadata } from "next";
import { StationShell } from "@/components/station/StationShell";
import { AoharuRoom } from "@/components/station/AoharuRoom";

// /station/room：アオハルーム（勉強王自習室）。登録した人どうしの本物の部屋（座席・ランキングはサーバー）。自習ホームの中の「みんなで学ぶ部屋（話さないつながり）」。無料。
// 25分（50分）の集中 → ふり返り → 休憩を繰り返し、集中中の学び（解いた・正解・単元模試・完走）を学びポイントにして週で競う。
// 検索に出す（2026-11-23 代表の公開OK）。無料の自習室として、入口から案内しているページ。
export const metadata: Metadata = {
  title: "アオハルーム｜無料のオンライン自習室｜アオハルラーン",
  description: "登録するだけで使える、無料のオンライン自習室。25分の集中とふり返りをくり返し、ニックネームで並んで学びます。",
  alternates: { canonical: "https://app.bluespring.co.jp/station/room" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <StationShell
      here="アオハルーム"
      notice={
        <p className="m-0 mb-3 rounded-[10px] border border-[#C9C7BD] bg-white px-3 py-2 text-[12px] font-bold leading-relaxed text-[#3A3D55]">
          無料の自習室です。ほかの人に見えるのは、ニックネームと「集中中」の表示、ポイントなどの数字だけ。声・映像・チャットはありません。本名・学校名・連絡先はニックネームに書かないでください。
        </p>
      }
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">無料・自習ホームの中の部屋</p>
      <h1 className="m-0 mt-1 text-[26px] font-black">アオハルーム（勉強王自習室）</h1>
      <p className="m-0 mt-1 max-w-[760px] text-[14px] leading-relaxed text-[#3A3D55]">
        みんなが黙って学んでいる部屋です。やることを決めて集中し、終わったらふり返る。競うのは座っていた時間ではなく、<b>学んだ量（学びポイント）</b>。毎日開く理由を、ここに置いておきます。
      </p>
      <div className="mt-4">
        <AoharuRoom />
      </div>
    </StationShell>
  );
}
