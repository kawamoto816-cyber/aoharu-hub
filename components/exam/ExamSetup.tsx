"use client";

import { useState } from "react";
import Link from "next/link";
import { examPlayHref } from "@/lib/exam/modes";
import type { ExamChoice } from "@/lib/exam/types";
import { bigBtn, card } from "@/components/drill/DrillPlay";

// 私立入試型・定期テスト型の「範囲・教科・時間をえらぶ」部分。えらんだものを URL にして本番画面 (/learn/exam/<mode>/play) を開く。

export interface SetupTree {
  key: "sho" | "chu" | "ko";
  name: string;
  subjects: { key: string; name: string; groups: { title: string; units: { id: string; name: string; count: number }[] }[] }[];
}

const chip = "inline-flex min-h-[44px] items-center justify-center rounded-[12px] border-[1.5px] px-3 text-[14.5px] font-black";
const on = "border-[#1533B8] bg-[#1533B8] text-white";
const off = "border-[#15172B] bg-white text-[#15172B]";

export function ExamSetup({ mode, tree, minuteOptions, need, defaultMinutes, unitsRequired }: { mode: "shiritsu" | "teiki"; tree: SetupTree[]; minuteOptions: number[]; need: Record<number, number>; defaultMinutes: number; unitsRequired: boolean }) {
  const [level, setLevel] = useState<SetupTree["key"]>(tree[0]?.key ?? "chu");
  const lv = tree.find((l) => l.key === level) ?? tree[0];
  const [subject, setSubject] = useState<string>(lv?.subjects[0]?.key ?? "");
  const sj = lv?.subjects.find((s) => s.key === subject) ?? lv?.subjects[0];
  const [picked, setPicked] = useState<string[]>([]);
  const [minutes, setMinutes] = useState(defaultMinutes);

  const allUnits = sj?.groups.flatMap((g) => g.units) ?? [];
  const sel = picked.filter((u) => allUnits.some((x) => x.id === u));
  const inScope = sel.length ? allUnits.filter((u) => sel.includes(u.id)) : unitsRequired ? [] : allUnits;
  const have = inScope.reduce((a, u) => a + u.count, 0);
  const needN = need[minutes] ?? 0;
  const ready = !!sj && (!unitsRequired || sel.length > 0);
  const choice: ExamChoice = { level: mode === "teiki" ? lv?.key : undefined, subject: sj?.key, units: sel.length ? sel : undefined, minutes };

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const toggleGroup = (ids: string[]) => setPicked((p) => (ids.every((id) => p.includes(id)) ? p.filter((x) => !ids.includes(x)) : [...new Set([...p, ...ids])]));

  return (
    <div className={`${card} mt-5`}>
      {tree.length > 1 && (
        <fieldset className="m-0 border-0 p-0">
          <legend className="text-[14px] font-black">学校</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {tree.map((l) => (
              <button
                key={l.key}
                type="button"
                aria-pressed={l.key === level}
                onClick={() => {
                  setLevel(l.key);
                  setSubject(l.subjects[0]?.key ?? "");
                  setPicked([]);
                }}
                className={`${chip} ${l.key === level ? on : off}`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <fieldset className={`m-0 border-0 p-0 ${tree.length > 1 ? "mt-4" : ""}`}>
        <legend className="text-[14px] font-black">教科</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {lv?.subjects.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={s.key === sj?.key}
              onClick={() => {
                setSubject(s.key);
                setPicked([]);
              }}
              className={`${chip} ${s.key === sj?.key ? on : off}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 mt-4 border-0 p-0">
        <legend className="text-[14px] font-black">範囲の単元{unitsRequired ? "" : "（えらばなければ中学の全範囲）"}</legend>
        <div className="mt-2 grid gap-3">
          {sj?.groups.map((g) => {
            const ids = g.units.map((u) => u.id);
            const all = ids.length > 0 && ids.every((id) => sel.includes(id));
            return (
              <div key={g.title} className="rounded-[12px] bg-[#F7F6F1] p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="m-0 text-[14px] font-black">{g.title}</p>
                  <button type="button" onClick={() => toggleGroup(ids)} className="min-h-[44px] px-2 text-[13px] font-bold text-[#1533B8] underline">
                    {all ? "はずす" : "まとめてえらぶ"}
                  </button>
                </div>
                <ul className="m-0 mt-1 grid list-none gap-1.5 p-0 sm:grid-cols-2">
                  {g.units.map((u) => (
                    <li key={u.id}>
                      <label className={`flex min-h-[48px] cursor-pointer items-center gap-2.5 rounded-[10px] border-[1.5px] bg-white px-3 py-1.5 ${sel.includes(u.id) ? "border-[#1533B8]" : "border-[#C9C6B4]"}`}>
                        <input type="checkbox" checked={sel.includes(u.id)} onChange={() => toggle(u.id)} className="h-5 w-5 flex-none accent-[#1533B8]" />
                        <span className="min-w-0 flex-1 text-[14px] font-bold leading-snug">{u.name}</span>
                        <span className="shrink-0 text-[12px] font-bold text-[#5A5D73]">{u.count}問</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {sj && sj.groups.length === 0 && <p className="m-0 text-[13.5px] font-bold text-[#3A3D55]">この教科はまだ問題がありません。</p>}
        </div>
      </fieldset>

      <fieldset className="m-0 mt-4 border-0 p-0">
        <legend className="text-[14px] font-black">制限時間</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {minuteOptions.map((m) => (
            <button key={m} type="button" aria-pressed={m === minutes} onClick={() => setMinutes(m)} className={`${chip} ${m === minutes ? on : off}`}>
              {m}分
            </button>
          ))}
        </div>
      </fieldset>

      <p aria-live="polite" className={`m-0 mt-4 text-[13.5px] font-bold ${ready && have < needN ? "text-[#B54708]" : "text-[#3A3D55]"}`}>
        {!ready
          ? "単元を1つ以上えらんでください。"
          : have < needN
            ? `この範囲はまだ問題が少ない（${have}問）。${minutes}分の回には${needN}問ほど必要です。時間を短くするか、単元をふやしてください。`
            : `えらんだ範囲の問題 ${have}問から、${minutes}分・100点の1回分を組みます。`}
      </p>
      {ready ? (
        <Link href={examPlayHref(mode, choice)} className={`${bigBtn} mt-3 bg-[#1533B8] text-white no-underline shadow-[0_4px_0_#0B1F7A]`}>
          この範囲で組む →
        </Link>
      ) : (
        <span aria-disabled="true" className={`${bigBtn} mt-3 bg-[#E4E2D8] text-[#5A5D73]`}>
          この範囲で組む →
        </span>
      )}
    </div>
  );
}
