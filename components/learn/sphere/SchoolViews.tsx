"use client";

import type { ReactNode } from "react";
import type { UnitMeta } from "@/lib/sphere";
import { isAxis } from "@/lib/sphere";
import { SphereBoard } from "./SphereBoard";
import { setQuery, useQuery } from "./useQueryState";

// /learn/school の「一覧｜スフィア盤」の切りかえ。一覧はサーバーで描いたものを children で受け取り、そのまま見せる。
// 選んだ表示は URL (?view=sphere&axis=a|b|c) に置くので、共有・再訪できる。

export function SchoolViews({ list, meta }: { list: ReactNode; meta: Record<string, UnitMeta> }) {
  const q = useQuery();
  const sphere = q.get("view") === "sphere";
  const axisParam = q.get("axis");
  const axis = isAxis(axisParam) ? axisParam : "a";

  const tab = (on: boolean) =>
    `flex min-h-[40px] items-center justify-center gap-1.5 rounded-full text-[14px] font-black outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#1533B8] ${on ? "bg-[#1533B8] text-white" : "text-[#3A3D55]"}`;

  return (
    <>
      <div role="tablist" aria-label="表示の切りかえ" className="mt-4 grid max-w-[420px] grid-cols-2 rounded-full border-[1.5px] border-[#15172B] bg-white p-[3px] shadow-[2px_2px_0_#15172B]">
        <button type="button" role="tab" id="tab-list" aria-selected={!sphere} aria-controls="panel-list" className={tab(!sphere)} onClick={() => sphere && setQuery({ view: null, axis: null }, { push: true })}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <rect x="1" y="2" width="12" height="2" rx="1" fill="currentColor" />
            <rect x="1" y="6" width="12" height="2" rx="1" fill="currentColor" />
            <rect x="1" y="10" width="12" height="2" rx="1" fill="currentColor" />
          </svg>
          一覧
        </button>
        <button type="button" role="tab" id="tab-sphere" aria-selected={sphere} aria-controls="panel-sphere" className={tab(sphere)} onClick={() => !sphere && setQuery({ view: "sphere", axis }, { push: true })}>
          <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
            <path d="M3 3 L12 5 L7.5 12 Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="3" cy="3" r="2" fill="#FFE45C" />
            <circle cx="12" cy="5" r="2" fill="currentColor" />
            <circle cx="7.5" cy="12" r="2" fill="currentColor" />
          </svg>
          スフィア盤
        </button>
      </div>
      {sphere ? (
        <div role="tabpanel" id="panel-sphere" aria-labelledby="tab-sphere">
          <SphereBoard axis={axis} meta={meta} />
        </div>
      ) : (
        <div role="tabpanel" id="panel-list" aria-labelledby="tab-list">
          {list}
        </div>
      )}
    </>
  );
}
