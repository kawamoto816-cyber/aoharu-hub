import Link from "next/link";

/** 「〇日目」の見出し。今日なら印と、アオハルームへの入口 */
export function DayHead({ no, isToday }: { no: number; isToday: boolean }) {
  return (
    <p className="m-0 flex flex-wrap items-center gap-2 text-[13px] font-black text-[#1533B8]">
      {no}日目
      {isToday && (
        <>
          <span className="rounded-full bg-[#1533B8] px-2 py-0.5 text-[11px] text-white">今日</span>
          <Link href="/station/room" className="ml-auto rounded-[8px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-2.5 py-0.5 text-[12px] font-black text-[#15172B] no-underline">
            アオハルームで始める →
          </Link>
        </>
      )}
    </p>
  );
}
