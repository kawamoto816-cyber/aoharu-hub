import { StationShell } from "@/components/station/StationShell";
import { Board } from "@/components/station/Board";
import { Requests } from "@/components/station/Requests";
import { hasOshieru, plain } from "@/lib/oshieru";
import { UNITS as JUGYO_UNITS } from "@/lib/jugyo";
import { lectureUnitInfo } from "@/lib/lecture";

// /station/board：掲示板（シェア会・授業・月のひろばの時間割と予約）
export default function Page() {
  const units = JUGYO_UNITS.filter(hasOshieru).flatMap((u) => {
    const i = lectureUnitInfo(u);
    return i ? [{ unit: u, name: plain(i.name), label: `${i.level}・${i.subject}` }] : [];
  });
  return (
    <StationShell here="掲示板">
      <h1 className="m-0 text-[24px] font-black">掲示板</h1>
      <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">
        駅の時間割と、「教えて」のリクエストです。学生の先生の授業を受けたり、「教えて」を出したりできるのは、ラーニングサークル会員です。会員でなくても、シェア会は月に1回まで見学できます。
      </p>
      <Requests units={units} />
      <Board />
    </StationShell>
  );
}
