import type { EigaLine, NoteLevel } from "@/lib/eiga/types";

// 完全解説モードで、止まった行の英文・日本語訳・解説を出す箱。

const LEVEL: Record<NoteLevel, { label: string; cls: string }> = {
  1: { label: "基本", cls: "bg-[#E6F4EA] text-[#1E5A46]" },
  2: { label: "高校", cls: "bg-[#E8ECFB] text-[#1533B8]" },
  3: { label: "映画の英語", cls: "bg-[#FFF3C4] text-[#7A5B00]" },
};

export function LinePanel({ line, memorized }: { line: EigaLine; memorized: boolean }) {
  return (
    <div>
      <p className="m-0 flex flex-wrap items-center gap-2 text-[12px] font-black text-[#3A3D55]">
        <span>{line.speaker}</span>
        {line.keep && <span className="rounded-full bg-[#FFE45C] px-2 py-0.5 text-[11px] text-[#15172B]">暗唱のおすすめ</span>}
        {memorized && <span className="rounded-full bg-[#15172B] px-2 py-0.5 text-[11px] text-white">覚えた</span>}
      </p>
      <p lang="en" className="m-0 mt-1.5 text-[19px] font-bold leading-snug text-[#15172B]">
        {line.en}
      </p>
      <p className="m-0 mt-1.5 text-[15px] leading-relaxed text-[#3A3D55]">{line.ja}</p>
      {line.notes.length > 0 && (
        <ul className="m-0 mt-3 list-none space-y-2 p-0">
          {line.notes.map((n) => (
            <li key={n.phrase} className="rounded-[10px] border border-[#E4E2D8] bg-[#FBFAF6] px-3 py-2">
              <p className="m-0 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span lang="en" className="text-[15px] font-black text-[#15172B]">
                  {n.phrase}
                </span>
                <span className="text-[13px] font-bold text-[#15172B]">{n.meaning}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-black ${LEVEL[n.level].cls}`}>{LEVEL[n.level].label}</span>
              </p>
              <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">{n.explain}</p>
            </li>
          ))}
        </ul>
      )}
      {line.care && (
        <p className="m-0 mt-3 rounded-[10px] border border-[#E9C6B5] bg-[#FDF3EE] px-3 py-2 text-[12.5px] leading-relaxed text-[#6B3A22]">
          <span className="font-black">時代背景の注　</span>
          {line.care}
        </p>
      )}
    </div>
  );
}
