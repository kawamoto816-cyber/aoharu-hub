"use client";

// /learn の表紙：「学年 → 教科 → 単元」を選んで、その人に合う単元を最初に開く。
// 初めての人向け。前回選んだものは、この端末の localStorage に覚えておく（使えなくても動く）。

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export interface PickerEntry {
  /** 学年 (小1〜小6・中1〜中3・高校) */
  grade: string;
  /** 教科 */
  subject: string;
  /** 科目・分野など (高校・中学社会・小学英語でだけ見出しに使う) */
  group: string;
  units: { id: string; name: string }[];
}

const KEY = "aoharu.learn.picker";
const sel =
  "min-h-[48px] w-full appearance-none rounded-[12px] border-[1.5px] border-[#15172B] bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22><path d=%22M2 4l4 4 4-4%22 fill=%22none%22 stroke=%22%2315172B%22 stroke-width=%222%22/></svg>')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat px-3 pr-8 text-[15px] font-bold text-[#15172B] disabled:opacity-50";

export function UnitPicker({ entries, grades }: { entries: PickerEntry[]; grades: string[] }) {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) ?? "null") as { grade?: string; subject?: string; unit?: string } | null;
      if (v?.grade && grades.includes(v.grade)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- 保存した選択を一度だけ戻す
        setGrade(v.grade);
        setSubject(v.subject ?? "");
        setUnit(v.unit ?? "");
      }
    } catch {}
  }, [grades]);

  const subjects = useMemo(() => [...new Set(entries.filter((e) => e.grade === grade).map((e) => e.subject))], [entries, grade]);
  const groups = useMemo(() => entries.filter((e) => e.grade === grade && e.subject === subject), [entries, grade, subject]);
  const showGroups = groups.length > 1 || (groups[0] && !groups[0].group.startsWith(grade));
  const validUnit = groups.some((g) => g.units.some((u) => u.id === unit)) ? unit : "";

  function save(next: { grade: string; subject: string; unit: string }) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-2 rounded-[16px] bg-white/10 p-3">
      <p className="m-0 text-[12.5px] font-bold text-[#FFE45C]">まずは、あなたに合う単元から</p>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1 text-[11px] font-bold text-[#DDE3FA]">
          学年
          <select
            className={sel}
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setSubject("");
              setUnit("");
            }}
          >
            <option value="">えらぶ</option>
            {grades.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] font-bold text-[#DDE3FA]">
          教科
          <select
            className={sel}
            value={subject}
            disabled={!grade}
            onChange={(e) => {
              setSubject(e.target.value);
              setUnit("");
            }}
          >
            <option value="">えらぶ</option>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-1 text-[11px] font-bold text-[#DDE3FA]">
        単元
        <select className={sel} value={validUnit} disabled={!subject} onChange={(e) => setUnit(e.target.value)}>
          <option value="">えらぶ</option>
          {showGroups
            ? groups.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </optgroup>
              ))
            : groups.flatMap((g) =>
                g.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                )),
              )}
        </select>
      </label>
      {validUnit ? (
        <Link
          href={`/learn/lecture/${validUnit}`}
          onClick={() => save({ grade, subject, unit: validUnit })}
          className="mt-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FFE45C] px-[18px] text-[15px] font-black text-[#15172B] no-underline hover:bg-[#FFEC85] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          この単元を開く
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      ) : (
        <span className="mt-1 inline-flex min-h-[48px] items-center justify-center rounded-full bg-white/20 px-[18px] text-[14px] font-black text-[#DDE3FA]">
          学年・教科・単元をえらぶと開けます
        </span>
      )}
    </div>
  );
}
