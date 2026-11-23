import { StationShell } from "@/components/station/StationShell";
import { Circle } from "@/components/station/Circle";

// /station/circle：ラーニングサークル（4〜6人で週に1回、学んだことをシェアする）。準備中で、試作を公開している。
const FACTS = [
  { label: "1サークルの人数", value: "4〜6人" },
  { label: "集まる頻度", value: "週1回" },
  { label: "シェアの長さ", value: "1人3分" },
];

export default function Page() {
  return (
    <StationShell here="サークル">
      <h1 className="m-0 text-[24px] font-black">ラーニングサークル</h1>
      <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">
        学ぶのはひとりで。シェアするのは仲間と。1人3分、学んだことをシェアして、仲間から「問い」と「拍手」をもらいます。うまく話す場ではなく、途中の学びや、まだ分からないことも出してよい場です。
      </p>
      <dl className="m-0 mt-3 grid max-w-[560px] grid-cols-2 gap-2 sm:grid-cols-3">
        {FACTS.map((f) => (
          <div key={f.label} className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 py-2">
            <dt className="text-[11.5px] font-black text-[#5A5D73]">{f.label}</dt>
            <dd className="m-0 text-[15px] font-black">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="m-0 mt-2 text-[12px] font-bold text-[#5A5D73]">準備中です（試作を公開中）。下のサークルの仲間とシェアカードは見本のデータです。</p>
      <Circle />
    </StationShell>
  );
}
