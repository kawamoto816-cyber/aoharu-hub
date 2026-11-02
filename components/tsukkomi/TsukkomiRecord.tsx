"use client";

import { useMemo, useSyncExternalStore } from "react";
import { bestKey, parseSave, readRaw, subscribeSave } from "@/lib/tsukkomi/storage";
import { titleOf } from "@/lib/tsukkomi/score";

// 一覧ページの「自分の記録」（この端末の localStorage）。読めないときは見習い・0 として出す。

const noop = () => () => {};

function useSave() {
  const raw = useSyncExternalStore(subscribeSave, readRaw, () => null);
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  return { save: useMemo(() => parseSave(raw), [raw]), hydrated };
}

export function TsukkomiRecord() {
  const { save, hydrated } = useSave();
  const t = titleOf(save.total);
  return (
    <div className="flex items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-3">
      <div>
        <p className="m-0 text-[11px] font-bold text-[#5A5D73]">あなたの称号</p>
        <p className="m-0 text-[20px] font-black">{hydrated ? t.name : "—"}</p>
      </div>
      <div className="text-right">
        <p className="m-0 text-[11px] font-bold text-[#5A5D73]">ためたツッコミポイント</p>
        <p className="m-0 text-[20px] font-black tabular-nums">{hydrated ? save.total.toLocaleString("ja-JP") : "—"}</p>
        {hydrated && t.next && <p className="m-0 text-[11px] text-[#3A3D55]">「{t.next.name}」まであと {t.next.need.toLocaleString("ja-JP")}</p>}
      </div>
    </div>
  );
}

/** 単元カードの「最高記録」 */
export function UnitBest({ unit }: { unit: string }) {
  const { save, hydrated } = useSave();
  if (!hydrated) return null;
  const n = save.best[bestKey(unit, "normal")];
  const a = save.best[bestKey(unit, "advanced")];
  if (n === undefined && a === undefined) return <span className="text-[11px] text-[#5A5D73]">まだ記録なし</span>;
  return (
    <span className="text-[11px] font-bold text-[#3A3D55]">
      最高 {(n ?? 0).toLocaleString("ja-JP")}
      {a !== undefined && `／上級 ${a.toLocaleString("ja-JP")}`}
    </span>
  );
}
