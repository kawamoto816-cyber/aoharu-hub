"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useReadLog } from "@/lib/lecture/readLog";
import type { Axis, UnitMeta } from "@/lib/sphere";
import { AXES, AXIS_A, AXIS_B, AXIS_C, SUBJECT_COLORS, boardA, boardB, boardC, nodeStates } from "@/lib/sphere";
import { SphereSheet } from "./SphereSheet";
import { SphereSvg } from "./SphereSvg";
import { setQuery } from "./useQueryState";

// 学びのスフィア盤：軸 (系譜・テーマ・時代と人物) の切りかえ、線/テーマのチップ、進み具合、盤、凡例、ボトムシート。
// 「光った」は図解レクチャーを読んだ単元 (lib/lecture/readLog、この端末だけの記録)。
// 「次に光らせられる」は、光った単元と線でつながっている未読の単元。

const chip = (on: boolean) =>
  `flex-none whitespace-nowrap rounded-full border-[1.5px] border-[#15172B] px-3 py-1.5 text-[12px] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#1533B8] ${on ? "bg-[#15172B] font-black text-white" : "bg-white font-bold text-[#15172B]"}`;

export function SphereBoard({ axis, meta }: { axis: Axis; meta: Record<string, UnitMeta> }) {
  const log = useReadLog();
  const [focusState, setFocus] = useState<{ axis: Axis; id: string | null }>({ axis, id: null });
  const [selState, setSelected] = useState<{ axis: Axis; unit: string | null }>({ axis, unit: null });
  const focus = focusState.axis === axis ? focusState.id : null;
  const selected = selState.axis === axis ? selState.unit : null;
  const nodeEls = useRef(new Map<string, SVGGElement>());

  const board = useMemo(() => (axis === "a" ? boardA(meta) : axis === "b" ? boardB() : boardC()), [axis, meta]);
  const states = useMemo(() => nodeStates(board, log.read), [board, log.read]);
  const lit = board.nodes.filter((n) => states.get(n.unit) === "lit").length;
  const total = board.nodes.length;
  const info = AXES.find((a) => a.key === axis) ?? AXES[0];

  const lineLabel = useCallback(
    (id: string) => {
      if (axis === "a") {
        const l = AXIS_A.lines.find((x) => x.id === id);
        return l ? `${l.mark} ${l.name}` : id;
      }
      if (axis === "b") return `テーマ ${AXIS_B.themes.find((t) => t.id === id)?.name ?? id}`;
      return AXIS_C.lines.find((l) => l.id === id)?.name ?? id;
    },
    [axis],
  );

  const chips: { id: string | null; name: string; count?: string }[] =
    axis === "b"
      ? [
          { id: null, name: "すべて", count: `${AXIS_B.themes.length}` },
          ...AXIS_B.themes.map((t) => ({ id: t.id, name: t.name, count: `${t.members.filter((m) => states.get(m.unit) === "lit").length}/${t.members.length}` })),
        ]
      : [{ id: null, name: "すべて", count: `${board.lines.length}本` }, ...board.lines.map((l) => ({ id: l.id, name: axis === "a" ? `${l.mark}${l.name}` : l.name }))];

  const bridges = board.edges.filter((e) => e.kind === "bridge").length;
  const summary = axis === "a" ? `線 ${board.lines.length}本・橋 ${bridges}` : axis === "b" ? `テーマ ${board.lines.length}・交差点 ${board.nodes.filter((n) => n.junction).length}` : `人物 ${board.lines.length}・橋 ${bridges}`;
  const colors = SUBJECT_COLORS.filter((s) => board.nodes.some((n) => meta[n.unit]?.color === s.color));

  const close = useCallback(() => {
    const u = selected;
    setSelected({ axis, unit: null });
    if (u) requestAnimationFrame(() => nodeEls.current.get(u)?.focus());
  }, [axis, selected]);

  const toList = (unit: string) => {
    setQuery({ view: null, axis: null }, { push: true, hash: unit });
    requestAnimationFrame(() => document.getElementById(unit)?.scrollIntoView({ block: "center" }));
  };

  return (
    <div className="mx-auto mt-4 max-w-[600px]">
      <div role="group" aria-label="盤の軸" className="grid grid-cols-3 gap-1 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-[3px]">
        {AXES.map((a) => (
          <button
            key={a.key}
            type="button"
            aria-pressed={a.key === axis}
            onClick={() => a.key !== axis && setQuery({ view: "sphere", axis: a.key })}
            className={`min-h-[40px] rounded-[11px] text-[13.5px] font-black outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#1533B8] ${a.key === axis ? "bg-[#15172B] text-white" : "text-[#3A3D55]"}`}
          >
            {a.name}
          </button>
        ))}
      </div>

      <section className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-3.5 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#15172B] px-2 py-0.5 text-[11px] font-black text-white">軸 {axis.toUpperCase()}</span>
          <h2 className="m-0 text-[16px] font-black">{info.title}</h2>
        </div>
        <p className="m-0 mt-1.5 text-[12.5px] leading-relaxed text-[#3A3D55]">{info.desc}</p>
      </section>

      <div role="group" aria-label={axis === "b" ? "テーマで強調" : "線で強調"} className="-mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {chips.map((c) => (
          <button key={c.id ?? "all"} type="button" aria-pressed={focus === c.id} onClick={() => setFocus({ axis, id: c.id })} className={chip(focus === c.id)}>
            {c.name}
            {c.count && <span className={`ml-1.5 text-[10.5px] ${focus === c.id ? "text-[#FFE45C]" : "text-[#8A8C9C]"}`}>{c.count}</span>}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2.5">
        <span className="whitespace-nowrap text-[12.5px] font-black">
          光ったノード {lit}
          <span className="font-bold text-[#8A8C9C]"> / {total}</span>
        </span>
        <span className="h-2 flex-1 overflow-hidden rounded-full border border-[#15172B] bg-[#E4E2D8]" role="progressbar" aria-label="光ったノード" aria-valuemin={0} aria-valuemax={total} aria-valuenow={lit}>
          <span className="block h-full border-r border-[#15172B] bg-[#FFE45C]" style={{ width: `${Math.round((lit / total) * 100)}%` }} />
        </span>
        <span className="whitespace-nowrap text-[11.5px] font-bold text-[#3A3D55]">{summary}</span>
      </div>

      <section className="mt-2.5 overflow-hidden rounded-[18px] border-[1.5px] border-[#15172B] bg-white shadow-[4px_4px_0_#15172B]">
        <SphereSvg
          board={board}
          meta={meta}
          states={states}
          focus={focus}
          selected={selected}
          onSelect={(u) => setSelected({ axis, unit: u })}
          nodeRef={(u, el) => {
            if (el) nodeEls.current.set(u, el);
            else nodeEls.current.delete(u);
          }}
        />
      </section>
      {lit === 0 && <p className="m-0 mt-2 text-[12px] font-bold text-[#3A3D55]">まだ光ったノードはありません。単元を押して「ひらく」から図解レクチャーを読むと、そのノードが光ります。</p>}

      <section aria-label="凡例" className="mt-3.5 flex flex-col gap-2 text-[11.5px] font-bold text-[#3A3D55]">
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {colors.map((s) => (
            <span key={s.key} className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full border border-[#15172B]" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <circle cx="11" cy="11" r="10" fill="#1533B8" fillOpacity=".16" />
              <circle cx="11" cy="11" r="6.5" fill="#1533B8" stroke="#15172B" strokeWidth="1.3" />
              <path d="M11 7.6 L12 10 L14.4 11 L12 12 L11 14.4 L10 12 L7.6 11 L10 10 Z" fill="#FFFFFF" />
            </svg>
            光った（読んだ）
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <circle cx="11" cy="11" r="9.5" fill="none" stroke="#1533B8" strokeWidth="1.1" strokeDasharray="2.5 2.5" />
              <circle cx="11" cy="11" r="6.3" fill="#FFFFFF" stroke="#1533B8" strokeWidth="2.2" />
              <circle cx="11" cy="11" r="2.3" fill="#1533B8" />
            </svg>
            次に光らせられる
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <circle cx="11" cy="11" r="6" fill="#FFFFFF" stroke="#C9C6BA" strokeWidth="1.4" />
              <circle cx="11" cy="11" r="2" fill="#1533B8" fillOpacity=".55" />
            </svg>
            まだ
          </span>
          {axis !== "a" && (
            <span className="inline-flex items-center gap-1.5">
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <path d="M11 1.5 L20.5 11 L11 20.5 L1.5 11 Z" fill="none" stroke="#15172B" strokeWidth="1" strokeOpacity=".6" />
                <circle cx="11" cy="11" r="4.5" fill="#FFFFFF" stroke="#C9C6BA" strokeWidth="1.3" />
              </svg>
              {axis === "b" ? "2つのテーマの交差点" : "2本の線の交差点"}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-3.5 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <svg width="30" height="10" viewBox="0 0 30 10" aria-hidden="true">
              <path d="M3 5 H27" stroke="#FFE45C" strokeWidth="7" strokeLinecap="round" />
              <path d="M3 5 H27" stroke="#15172B" strokeWidth="1.5" />
            </svg>
            光った線
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="30" height="10" viewBox="0 0 30 10" aria-hidden="true">
              <path d="M3 5 H27" stroke="#15172B" strokeWidth="1.4" strokeDasharray="4 3" />
            </svg>
            次へのびる線
          </span>
          {axis !== "b" && (
            <span className="inline-flex items-center gap-1.5">
              <svg width="30" height="10" viewBox="0 0 30 10" aria-hidden="true">
                <path d="M3 5 H27" stroke="#15172B" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1 4.5" />
              </svg>
              {axis === "a" ? "教科をこえる橋" : "時代をこえる橋（引用・名前の由来）"}
            </span>
          )}
        </div>
      </section>

      {selected && (
        <>
          <div aria-hidden="true" className="h-[60vh]" />
          <SphereSheet board={board} unit={selected} meta={meta} states={states} lineLabel={lineLabel} onSelect={(u) => setSelected({ axis, unit: u })} onClose={close} onList={toList} />
        </>
      )}
    </div>
  );
}
