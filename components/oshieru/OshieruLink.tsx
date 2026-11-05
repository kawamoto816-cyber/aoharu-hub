import Link from "next/link";
import { Haru } from "./Haru";
import { hasOshieru, oshieruHref } from "@/lib/oshieru";

// 図解レクチャーのページに置くオシエルの入口「ハルに教える」。点検を通った誤解セットがある単元だけ出す（ない単元は何も出さない）。

export function OshieruLink({ unit, low, className = "" }: { unit: string; low: boolean; className?: string }) {
  if (!hasOshieru(unit)) return null;
  return (
    <Link
      href={oshieruHref(unit)}
      className={`flex min-h-[56px] w-full items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#E6EAFB] px-4 py-2.5 text-left text-[16px] font-black text-[#15172B] no-underline shadow-[3px_3px_0_#15172B] ${className}`}
    >
      <span className="flex items-center gap-3">
        <Haru face="thinking" size={36} badge={false} />
        <span>
          {low ? "ハルに おしえる" : "ハルに教える"}
          <span className="block text-[12.5px] font-bold text-[#3A3D55]">
            {low ? "AIの せいとが つまずいて いるよ。せんせいに なって おしえて あげよう" : "AIの生徒ハルがつまずいています。先生になって教え、マスター判定をもらおう"}
          </span>
        </span>
      </span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
