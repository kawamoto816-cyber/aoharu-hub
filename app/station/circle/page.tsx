import { StationShell } from "@/components/station/StationShell";
import { Circle } from "@/components/station/Circle";

// /station/circle：ラーニングサークル（4〜6人で週に1回、学んだことをシェアする）
export default function Page() {
  return (
    <StationShell here="サークル">
      <h1 className="m-0 text-[24px] font-black">ラーニングサークル</h1>
      <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">
        学ぶのはひとりで。シェアするのは仲間と。1人3分、学んだことをシェアして、仲間から「問い」と「拍手」をもらいます。うまく話す場ではなく、途中の学びや、まだ分からないことも出してよい場です。
      </p>
      <Circle />
    </StationShell>
  );
}
