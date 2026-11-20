import { StationShell } from "@/components/station/StationShell";
import { AoharuRoom } from "@/components/station/AoharuRoom";

// /station/room：アオハルーム（勉強王自習室・試作）。自習ホームの中の「みんなで学ぶ部屋（話さないつながり）」。無料。
// 25分（50分）の集中 → ふり返り → 休憩を繰り返し、集中中の学び（解いた・正解・単元模試・完走）を学びポイントにして週で競う。
export default function Page() {
  return (
    <StationShell here="アオハルーム">
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
