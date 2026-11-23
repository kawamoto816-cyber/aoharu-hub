import { StationShell } from "@/components/station/StationShell";
import { Ranking } from "@/components/station/Ranking";

// /station/ranking：わかった星（AI点検＋受講者の正答率の星）と、受けた人の声（受講者の評価だけの格付け）。見本のデータで見せる試作。
export default function Page() {
  return (
    <StationShell here="格付け">
      <h1 className="m-0 text-[24px] font-black">学生の先生の格付け</h1>
      <p className="m-0 mt-1 max-w-[760px] text-[14px] leading-relaxed text-[#3A3D55]">
        2つの物差しを分けて見せます。<b>わかった星</b>は「わからせる授業ができたか」。<b>受けた人の声</b>は「受けた生徒がどう感じたか」。人気だけでも、点検だけでもない先生が見つかります。
      </p>
      <Ranking />
    </StationShell>
  );
}
