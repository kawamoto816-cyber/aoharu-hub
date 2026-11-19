import { StationShell } from "@/components/station/StationShell";
import { Board } from "@/components/station/Board";

// /station/board：掲示板（シェア会・授業・月のひろばの時間割と予約）
export default function Page() {
  return (
    <StationShell here="掲示板">
      <h1 className="m-0 text-[24px] font-black">掲示板</h1>
      <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">
        駅の時間割です。学生の先生の授業は、だれでも無料で受けられます。サークルのシェア会は、会員でなくても月に1回まで見学できます。
      </p>
      <Board />
    </StationShell>
  );
}
