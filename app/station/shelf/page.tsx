import { StationShell } from "@/components/station/StationShell";
import { Shelf } from "@/components/station/Shelf";

// /station/shelf：自分の棚（段の進み方・シェアカード・授業・コインの記録・保護者へのレポートの見本）
export default function Page() {
  return (
    <StationShell here="自分の棚">
      <h1 className="m-0 text-[24px] font-black">自分の棚</h1>
      <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">駅での学びが積み上がる場所。保護者への月のレポートと、総合型選抜の活動の記録は、この棚から作ります。</p>
      <Shelf />
    </StationShell>
  );
}
