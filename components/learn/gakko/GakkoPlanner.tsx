"use client";

// /learn/gakko の「時間割を自分で組む」: 週の型 (曜日ごとの教科の並び) の編集。
// 変えるたびにこの端末の localStorage へ保存する (lib/gakko/store の PLAN_KEY、形は lib/gakko/custom)。

import { useState } from "react";
import type { GakkoData } from "@/lib/gakko/timetable";
import { MAX_SLOTS, MIN_SLOTS, WEEKDAYS, WEEK_ORDER, gradeSubjects, resizeDay, setDay, subjectUnits, weekFor, type CustomPlan, type CustomSlot } from "@/lib/gakko/custom";

const sel =
  "min-h-[40px] min-w-0 rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-2 text-[14px] font-bold text-[#15172B] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#1533B8]";
const iconBtn =
  "flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-white text-[15px] font-black text-[#15172B] outline-offset-2 hover:bg-[#FFF8D6] focus-visible:outline-2 focus-visible:outline-[#1533B8] disabled:cursor-not-allowed disabled:border-[#C9C4B4] disabled:text-[#C9C4B4] disabled:hover:bg-white";

export function GakkoPlanner({
  data,
  grade,
  plan,
  today,
  read,
  onChange,
}: {
  data: GakkoData;
  grade: string;
  plan: CustomPlan;
  /** きょうの曜日 (0=日)。-1 ならまだ決まっていない */
  today: number;
  read: Record<string, number>;
  onChange: (p: CustomPlan) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const wd = picked ?? (today >= 0 ? today : 1);
  const subjects = gradeSubjects(data, grade);
  const week = weekFor(plan, data, grade);
  const day = week[wd] ?? [];

  const save = (next: CustomSlot[]) => {
    let p = setDay(plan, data, grade, wd, next);
    // きょうの並びを変えたら、きょうだけの入れかえは取りけす (コマ番号がずれるため)
    if (wd === today && p.swap?.grade === grade) p = { ...p, swap: undefined };
    onChange(p);
  };
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= day.length) return;
    const next = [...day];
    [next[i], next[j]] = [next[j], next[i]];
    save(next);
  };
  const subjectColor = (s: string) => data.units[subjectUnits(data, grade, s)[0]]?.c ?? "#6E7084";

  return (
    <div className="flex flex-col gap-3 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3.5" data-planner="1">
      <div className="flex flex-col gap-1.5">
        <p id="kumu-days" className="m-0 text-[12px] font-black text-[#5A5D73]">
          曜日
        </p>
        <div role="group" aria-labelledby="kumu-days" className="grid grid-cols-7 gap-1">
          {WEEK_ORDER.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={wd === d}
              onClick={() => setPicked(d)}
              className={`relative flex min-h-[44px] flex-col items-center justify-center rounded-[10px] border-[1.5px] border-[#15172B] text-[14px] font-black leading-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#1533B8] ${wd === d ? "bg-[#15172B] text-white" : "bg-white text-[#15172B] hover:bg-[#FFF8D6]"}`}
            >
              {WEEKDAYS[d]}
              <span className={`mt-0.5 text-[10px] font-bold tabular-nums ${wd === d ? "text-[#FFE45C]" : "text-[#5A5D73]"}`}>{(week[d] ?? []).length}コマ</span>
              {d === today && <span className="sr-only">（きょう）</span>}
              {d === today && (
                <span aria-hidden="true" className="absolute -top-1.5 right-0.5 rounded-full bg-[#B42318] px-1 text-[9px] font-black leading-[14px] text-white">
                  きょう
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p id="kumu-count" className="m-0 text-[12px] font-black text-[#5A5D73]">
          {WEEKDAYS[wd]}曜日のコマ数
        </p>
        <div role="group" aria-labelledby="kumu-count" className="flex flex-wrap gap-1">
          {Array.from({ length: MAX_SLOTS - MIN_SLOTS + 1 }, (_, i) => i + MIN_SLOTS).map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={day.length === n}
              onClick={() => save(resizeDay(day, n, subjects))}
              className={`min-h-[40px] min-w-[44px] rounded-full border-[1.5px] border-[#15172B] px-2 text-[14px] font-black tabular-nums outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#1533B8] ${day.length === n ? "bg-[#15172B] text-white" : "bg-white text-[#15172B] hover:bg-[#FFF8D6]"}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <ol className="m-0 flex list-none flex-col gap-2 p-0" aria-label={`${WEEKDAYS[wd]}曜日の教科の並び`}>
        {day.map((slot, i) => {
          const own = subjectUnits(data, grade, slot.s);
          const color = subjectColor(slot.s);
          const label = `${WEEKDAYS[wd]}曜 ${i + 1}時間目`;
          return (
            <li key={i} className="flex flex-col gap-1.5 rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-2.5" data-slot={i + 1}>
              <div className="flex items-center gap-1.5">
                <span className="flex w-[40px] flex-none flex-col items-center leading-none">
                  <span className="text-[18px] font-black tabular-nums">{i + 1}</span>
                  <span className="mt-0.5 text-[9.5px] font-bold text-[#5A5D73]">時間目</span>
                </span>
                <span aria-hidden="true" className="h-8 w-[5px] flex-none rounded-full" style={{ background: color }} />
                <select aria-label={`${label}の教科`} value={slot.s} onChange={(e) => save(day.map((x, k) => (k === i ? { s: e.target.value } : x)))} className={`${sel} flex-1`}>
                  {!subjects.includes(slot.s) && <option value={slot.s}>{slot.s}</option>}
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button type="button" aria-label={`${label}を上へ`} disabled={i === 0} onClick={() => move(i, -1)} className={iconBtn}>
                  ↑
                </button>
                <button type="button" aria-label={`${label}を下へ`} disabled={i === day.length - 1} onClick={() => move(i, 1)} className={iconBtn}>
                  ↓
                </button>
                <button type="button" aria-label={`${label}を削除`} disabled={day.length <= MIN_SLOTS} onClick={() => save(day.filter((_, k) => k !== i))} className={iconBtn}>
                  ×
                </button>
              </div>
              <select
                aria-label={`${label}の単元`}
                value={slot.pin && own.includes(slot.pin) ? slot.pin : ""}
                onChange={(e) => save(day.map((x, k) => (k === i ? (e.target.value ? { s: x.s, pin: e.target.value } : { s: x.s }) : x)))}
                className={`${sel} w-full text-[13px]`}
              >
                <option value="">おまかせ（まだ読んでいない単元）</option>
                {own.map((id) => (
                  <option key={id} value={id}>
                    固定：{data.units[id]?.n}
                    {read[id] ? "（読んだ）" : ""}
                  </option>
                ))}
              </select>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        disabled={day.length >= MAX_SLOTS || !subjects.length}
        onClick={() => save(resizeDay(day, day.length + 1, subjects))}
        className="min-h-[44px] rounded-full border-[1.5px] border-dashed border-[#15172B] bg-white text-[14px] font-black text-[#15172B] outline-offset-2 hover:bg-[#FFF8D6] focus-visible:outline-2 focus-visible:outline-[#1533B8] disabled:cursor-not-allowed disabled:text-[#8F94B8]"
      >
        ＋ コマを追加{day.length >= MAX_SLOTS ? `（${MAX_SLOTS}コマまで）` : ""}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="m-0 text-[11.5px] leading-[1.6] text-[#5A5D73]" aria-live="polite">
          変えるたびに、この端末に保存します。
        </p>
        <button
          type="button"
          onClick={() => onChange({ ...plan, mode: "auto" })}
          className="min-h-[40px] rounded-full border-[1.5px] border-[#15172B] bg-white px-4 text-[13px] font-black text-[#15172B] outline-offset-2 hover:bg-[#FFF8D6] focus-visible:outline-2 focus-visible:outline-[#1533B8]"
        >
          自動にもどす
        </button>
      </div>
    </div>
  );
}
