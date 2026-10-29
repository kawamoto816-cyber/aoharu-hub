import type { Diagram as DiagramData } from "@/lib/learn/types";

// カード裏面の図解。5つの形 (比較・流れ・帯・チェック・書き換え) をデータから描く。

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15172B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={`flex-none ${down ? "rotate-90" : ""}`}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Diagram({ data, title }: { data: DiagramData; title: string }) {
  return (
    <figure className="m-0">
      <figcaption className="text-xs font-black text-[#1533B8]">図解：{title}</figcaption>
      <div className="mt-2">
        {data.type === "compare" && (
          <div className="grid grid-cols-2 gap-2">
            {[data.left, data.right].map((side, i) => (
              <div key={side.title} className={`rounded-lg border-[1.5px] p-2.5 ${i === 1 ? "border-[#1533B8] bg-[#E6EAFB]" : "border-[#15172B] bg-[#F7F6F1]"}`}>
                <p className="m-0 text-[13px] font-black">{side.title}</p>
                <ul className="m-0 mt-1.5 list-none space-y-1 p-0 text-[12.5px] leading-snug">
                  {side.items.map((it) => (
                    <li key={it} className="rounded bg-white/80 px-2 py-1">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {data.type === "flow" && (
          <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
            {data.steps.map((s, i) => (
              <li key={`${s}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && <Arrow />}
                <span className={`rounded-lg border-[1.5px] px-2.5 py-2 text-[12.5px] font-black leading-tight ${data.highlight === i ? "border-[#D9341F] bg-[#FFF1EE] text-[#B42318]" : "border-[#15172B] bg-[#F7F6F1]"}`}>{s}</span>
              </li>
            ))}
          </ol>
        )}

        {data.type === "bar" && (
          <div>
            <div className="flex overflow-hidden rounded-lg border-[1.5px] border-[#15172B] text-[12px] font-black">
              {data.segments.map((seg, i) => (
                <span
                  key={i}
                  style={{ flexGrow: seg.weight, flexBasis: 0 }}
                  className={`min-w-0 px-1 py-2.5 text-center ${i > 0 ? "border-l-[1.5px] border-[#15172B]" : ""} ${seg.accent ? "bg-[#FFE45C]" : "bg-[#E6EAFB]"}`}
                >
                  {seg.label}
                </span>
              ))}
            </div>
            <div className="mt-1 flex text-[11px] font-bold text-[#3A3D55]">
              {data.segments.map((seg, i) => (
                <span key={i} style={{ flexGrow: seg.weight, flexBasis: 0 }} className="min-w-0 text-center">
                  {seg.sub}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.type === "checklist" && (
          <ul className="m-0 list-none space-y-1.5 p-0">
            {data.items.map((it, i) => (
              <li key={it} className="flex items-center gap-2 rounded-lg border-[1.5px] border-[#15172B] bg-[#F7F6F1] px-2.5 py-1.5 text-[12.5px] font-bold">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded bg-[#1533B8] text-[11px] font-black text-white">{i + 1}</span>
                {it}
              </li>
            ))}
          </ul>
        )}

        {data.type === "rewrite" && (
          <ul className="m-0 list-none space-y-1.5 p-0">
            {data.pairs.map(([before, after]) => (
              <li key={before} className="flex flex-wrap items-center gap-1.5 text-[12.5px] leading-snug">
                <span className="rounded-lg border-[1.5px] border-[#9A9CB0] bg-white px-2 py-1 text-[#4A4D63] line-through decoration-[#D9341F]">{before}</span>
                <Arrow />
                <span className="rounded-lg border-[1.5px] border-[#1533B8] bg-[#E6EAFB] px-2 py-1 font-bold">{after}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </figure>
  );
}
