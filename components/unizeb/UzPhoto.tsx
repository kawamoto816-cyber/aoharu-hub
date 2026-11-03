import Image from "next/image";
import type { LecturePhoto } from "@/lib/lecture/types";
import { plain, Rich } from "@/components/lecture/Rich";

// 資料の写真（Wikimedia Commons の PD・CC0・CC BY・CC BY-SA）。小さい原画（古い肖像など）は引きのばさずに、元の幅までで見せる。

export function UzPhoto({ ph, no }: { ph: LecturePhoto; no: number }) {
  return (
    <figure className="m-0 mt-4 overflow-hidden rounded-[16px] border-[1.5px] border-[#15172B] bg-white shadow-[3px_3px_0_#15172B]">
      <div className="flex justify-center bg-[#EEECE4]">
        <Image src={ph.src} alt={plain(ph.alt)} width={ph.width} height={ph.height} sizes="(max-width: 720px) 100vw, 680px" className="block h-auto w-full" style={{ maxWidth: ph.width }} />
      </div>
      <figcaption className="px-3.5 pb-3 pt-2.5">
        <p className="m-0 flex items-baseline gap-2 text-[13.5px] font-bold leading-relaxed text-[#15172B]">
          <span className="flex-none rounded-full bg-[#15172B] px-2 py-0.5 text-[11px] font-black text-white">資料{no}</span>
          <span><Rich text={ph.caption} /></span>
        </p>
        <p className="m-0 mt-1.5 text-[11px] leading-snug text-[#5A5D73]">
          出典：
          <a href={ph.credit.source} target="_blank" rel="noopener noreferrer" className="text-[#5A5D73] underline">Wikimedia Commons</a>
          ／{ph.credit.author}／
          {ph.credit.licenseUrl ? (
            <a href={ph.credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="text-[#5A5D73] underline">{ph.credit.license}</a>
          ) : (
            ph.credit.license
          )}
        </p>
      </figcaption>
    </figure>
  );
}
