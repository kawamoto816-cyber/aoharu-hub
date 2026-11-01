"use client";

import { useState } from "react";
import Link from "next/link";

// /learn/moshi の「範囲をえらぶ」部分。学年ごとに単元をチェックして「この範囲で模試をつくる」。
// 大問がまだない単元は選べない (準備中)。

export interface PickerGroup {
  /** 「中学校・数学・中1」 */
  id: string;
  title: string;
  kids: boolean;
  units: { id: string; name: string; count: number }[];
}

export function MoshiPicker({ group }: { group: PickerGroup }) {
  const ready = group.units.filter((u) => u.count > 0).map((u) => u.id);
  const [sel, setSel] = useState<string[]>(ready.length === 1 ? ready : []);
  const k = group.kids;
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const n = sel.reduce((a, id) => a + (group.units.find((u) => u.id === id)?.count ?? 0), 0);
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4 shadow-[4px_4px_0_#15172B] sm:p-5">
      <fieldset className="m-0 border-0 p-0">
        <legend className="text-[18px] font-black">{group.title}</legend>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="m-0 text-[12.5px] text-[#3A3D55]">{k ? "テストに でる たんげんを えらぼう" : "テスト範囲の単元をえらびます（複数可）"}</p>
          {ready.length > 1 && (
            <button type="button" onClick={() => setSel(sel.length === ready.length ? [] : ready)} className="min-h-[44px] text-[13px] font-black text-[#1533B8] underline">
              {sel.length === ready.length ? (k ? "ぜんぶ はずす" : "すべて外す") : k ? "ぜんぶ えらぶ" : "すべて選ぶ"}
            </button>
          )}
        </div>
        <ul className="m-0 mt-2 grid list-none gap-2 p-0 sm:grid-cols-2">
          {group.units.map((u) => {
            const on = sel.includes(u.id);
            const off = u.count === 0;
            return (
              <li key={u.id}>
                <label
                  className={`flex min-h-[48px] items-center gap-3 rounded-[12px] border-[1.5px] px-3 py-2 ${off ? "cursor-not-allowed border-dashed border-[#9A9CB0] bg-white/60 text-[#5A5D73]" : on ? "cursor-pointer border-[#1533B8] bg-[#E3E8FF]" : "cursor-pointer border-[#15172B] bg-[#FFFBE6]"}`}
                >
                  <input type="checkbox" checked={on} disabled={off} onChange={() => toggle(u.id)} className="h-6 w-6 flex-none accent-[#1533B8]" />
                  <span className="min-w-0 flex-1 text-[14.5px] font-black leading-snug">{u.name}</span>
                  <span className="shrink-0 text-[12px] font-bold">{off ? (k ? "じゅんびちゅう" : "準備中") : k ? `だいもん ${u.count}` : `大問 ${u.count}`}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
      <p aria-live="polite" className="m-0 mt-3 text-[13px] font-bold text-[#3A3D55]">
        {sel.length > 0 ? (k ? `${sel.length}たんげん・だいもん ${n}こ` : `${sel.length}単元・大問 ${n}題から組みます`) : k ? "たんげんを えらんでね" : "単元をえらんでください"}
      </p>
      {sel.length > 0 ? (
        <Link
          href={`/learn/moshi/play?units=${sel.map(encodeURIComponent).join(",")}`}
          className="mt-2 flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]"
        >
          {k ? "この はんいで もしを つくる" : "この範囲で模試をつくる"}
        </Link>
      ) : (
        <span aria-disabled="true" className="mt-2 flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-dashed border-[#9A9CB0] text-[17px] font-black text-[#5A5D73]">
          {k ? "この はんいで もしを つくる" : "この範囲で模試をつくる"}
        </span>
      )}
    </div>
  );
}
