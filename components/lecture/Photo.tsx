import Image from "next/image";
import type { LecturePhoto } from "@/lib/lecture/types";
import { plain, Rich } from "./Rich";

// 図解レクチャーの「資料」（写真・図版）。出典とライセンスを必ず添える。

export function LecturePhotoView({ ph, no }: { ph: LecturePhoto; no: number }) {
  return (
    <figure className="m-0 mt-4 overflow-hidden rounded-[16px] border-[1.5px] border-[#15172B] bg-white shadow-[3px_3px_0_#15172B]">
      <Image src={ph.src} alt={plain(ph.alt)} width={ph.width} height={ph.height} sizes="(max-width: 720px) 100vw, 680px" className="block h-auto w-full bg-[#F7F6F1]" />
      <figcaption className="px-3.5 pb-3 pt-2.5">
        <p className="m-0 flex items-baseline gap-2 text-[13.5px] font-bold leading-relaxed text-[#15172B]">
          <span className="flex-none rounded-full bg-[#15172B] px-2 py-0.5 text-[11px] font-black text-white">資料{no}</span>
          <span>
            <Rich text={ph.caption} />
          </span>
        </p>
        <p className="m-0 mt-1.5 text-[11px] leading-snug text-[#5A5D73]">
          出典：
          <a href={ph.credit.source} target="_blank" rel="noopener noreferrer" className="text-[#5A5D73] underline">
            Wikimedia Commons
          </a>
          ／{ph.credit.author}／
          {ph.credit.licenseUrl ? (
            <a href={ph.credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="text-[#5A5D73] underline">
              {ph.credit.license}
            </a>
          ) : (
            ph.credit.license
          )}
        </p>
      </figcaption>
    </figure>
  );
}
