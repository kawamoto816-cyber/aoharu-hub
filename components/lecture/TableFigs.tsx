import type { CompareFigure, TimelineFigure, TreeFigure, TreeNode } from "@/lib/lecture/types";
import { Rich, TONE_BOX } from "./Rich";

// 比較表 (compare)・年表 (timeline)・分類の木 (tree)。どれも HTML。

const HEAD: Record<string, string> = {
  navy: "bg-[#15172B] text-white",
  blue: "bg-[#1533B8] text-white",
  yellow: "bg-[#FFE45C] text-[#15172B]",
  red: "bg-[#D9341F] text-white",
  plain: "bg-[#F7F6F1] text-[#15172B]",
};

export function CompareFig({ fig }: { fig: CompareFigure }) {
  const hasLabel = fig.rows.some((r) => r.label);
  const cols = fig.columns.length + (hasLabel ? 1 : 0);
  return (
    // 4列以上は横スクロールの箱に入れる (スマホではみ出さない)。
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <table className={`w-full ${hasLabel ? "table-fixed" : ""} border-separate border-spacing-0 overflow-hidden rounded-[12px] border-[1.5px] border-[#15172B] text-[13px] leading-snug`} style={{ minWidth: cols >= 4 ? cols * 96 : undefined }}>
        <thead>
          <tr>
            {hasLabel && <th scope="col" className="w-[27%] bg-[#F7F6F1] p-2 text-left text-[11px] font-black text-[#3A3D55]"><span className="sr-only">項目</span></th>}
            {fig.columns.map((c, i) => (
              <th key={c.title} scope="col" className={`p-2 text-center text-[13.5px] font-black ${HEAD[c.tone ?? "plain"]} ${i > 0 || hasLabel ? "border-l-[1.5px] border-[#15172B]" : ""}`}>
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fig.rows.map((r, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? "bg-[#FFFBE6]" : "bg-white"}>
              {hasLabel && (
                <th scope="row" className="border-t-[1.5px] border-[#15172B] bg-[#F7F6F1] p-2 text-left text-[12px] font-black">
                  {r.label}
                </th>
              )}
              {r.cells.map((c, ci) => (
                <td key={ci} className={`border-t-[1.5px] border-[#15172B] p-2 align-top ${ci > 0 || hasLabel ? "border-l-[1.5px]" : ""}`}>
                  <Rich text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TimelineFig({ fig }: { fig: TimelineFigure }) {
  const events = [...fig.events].sort((a, b) => a.year - b.year);
  const eraOf = (y: number) => fig.eras?.find((e) => y >= e.from && y <= e.to);
  // 時代ごとにまとめる (時代の外のできごとは、時代の名前なしのまとまり)。
  const groups: { era?: { label: string; from: number; to: number }; items: typeof events }[] = [];
  for (const ev of events) {
    const era = eraOf(ev.year);
    const last = groups[groups.length - 1];
    if (last && last.era === era) last.items.push(ev);
    else groups.push({ era, items: [ev] });
  }
  return (
    <div className="grid gap-3">
      {groups.map((g, gi) => (
        <section key={gi} aria-label={g.era?.label}>
          {g.era && (
            <p className="m-0 flex items-baseline gap-2 rounded-[8px] bg-[#15172B] px-2.5 py-1 text-[13px] font-black text-white">
              {g.era.label}
              <span className="text-[11px] font-bold text-[#FFE45C]">
                {g.era.from}〜{g.era.to}
              </span>
            </p>
          )}
          <ol className="m-0 mt-1 list-none p-0">
            {g.items.map((ev) => (
              <li key={`${ev.year}-${ev.label}`} className="grid grid-cols-[76px_14px_1fr] items-stretch gap-x-2">
                <span className="py-1.5 text-right text-[13px] font-black tabular-nums text-[#1533B8]">{ev.yearLabel ?? ev.year}</span>
                <span aria-hidden="true" className="relative flex justify-center">
                  <span className="absolute inset-y-0 w-[2px] bg-[#15172B]" />
                  <span className={`relative mt-[9px] h-3 w-3 rounded-full border-2 border-[#15172B] ${ev.key ? "bg-[#FFE45C]" : "bg-white"}`} />
                </span>
                <span className={`my-1 rounded-[8px] px-2 py-1 text-[13.5px] leading-snug ${ev.key ? "bg-[#FFE45C] font-black" : "font-bold"}`}>
                  <Rich text={ev.label} />
                </span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function TreeItem({ node }: { node: TreeNode }) {
  return (
    <li className="relative pl-5 pt-2 before:absolute before:left-0 before:top-0 before:h-full before:border-l-[1.5px] before:border-[#15172B] before:content-[''] after:absolute after:left-0 after:top-[26px] after:w-4 after:border-t-[1.5px] after:border-[#15172B] after:content-[''] last:before:h-[26px]">
      <TreeBox node={node} />
      {node.children && node.children.length > 0 && (
        <ul className="m-0 ml-4 list-none p-0">
          {node.children.map((c, i) => (
            <TreeItem key={`${c.label}-${i}`} node={c} />
          ))}
        </ul>
      )}
    </li>
  );
}

function TreeBox({ node }: { node: TreeNode }) {
  return (
    <span className={`inline-block max-w-full rounded-[10px] border-[1.5px] px-2.5 py-1.5 ${TONE_BOX[node.tone ?? "plain"]}`}>
      <span className="text-[14px] font-black leading-snug">
        <Rich text={node.label} />
      </span>
      {node.sub && <span className="ml-1.5 text-[11.5px] font-bold leading-snug opacity-80">{node.sub}</span>}
    </span>
  );
}

export function TreeFig({ fig }: { fig: TreeFigure }) {
  return (
    <div>
      <TreeBox node={fig.root} />
      {fig.root.children && (
        <ul className="m-0 ml-4 list-none p-0">
          {fig.root.children.map((c, i) => (
            <TreeItem key={`${c.label}-${i}`} node={c} />
          ))}
        </ul>
      )}
    </div>
  );
}
