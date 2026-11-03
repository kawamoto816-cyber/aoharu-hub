"use client";

// /learn/gakko の上半分：校門 (コピー・「まなぶ」)・学年・きょうの時間割・きょうの出席。
// 記録はすべてこの端末の localStorage (lib/gakko/store)。サーバー描画では学年が決まらないので、時間割は読みこみ後に出る。

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { GAKKO_GRADES, PERIODS, buildTimetable, jstDateKey, jstDayStart, type GakkoData } from "@/lib/gakko/timetable";
import { ATTENDANCE_KEY, GRADE_KEY, PICKER_KEY, REVIEW_KEY, parse, setJSON, useClientValue, useStored } from "@/lib/gakko/store";
import { useReadLog } from "@/lib/lecture/readLog";

type Attendance = Record<string, string[]>;
const isAttendance = (v: unknown): v is Attendance => !!v && typeof v === "object" && !Array.isArray(v);
const isReview = (v: unknown): v is { date: string; ids: string[] } => !!v && typeof v === "object" && Array.isArray((v as { ids?: unknown }).ids);
const isPicker = (v: unknown): v is { grade?: string } => !!v && typeof v === "object";

const INK = "#15172B";

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

function Stamp({ dateKey }: { dateKey: string }) {
  const [, m, d] = dateKey.split("-").map(Number);
  return (
    <div role="img" aria-label={`${m}月${d}日 きょうの出席`} className="flex h-[78px] w-[78px] flex-none rotate-[-10deg] flex-col items-center justify-center rounded-full border-[3px] border-[#B42318] text-[#B42318] shadow-[inset_0_0_0_3px_#fff,inset_0_0_0_4.5px_#B42318]">
      <span className="text-[9.5px] font-black leading-none">きょうの</span>
      <span className="font-serif text-[22px] font-extrabold leading-[1.15]">出席</span>
      <span className="text-[10px] font-black leading-none tabular-nums">
        {m}/{d}
      </span>
    </div>
  );
}

export function GakkoToday({ data }: { data: GakkoData }) {
  const dateKey = useClientValue(() => jstDateKey(), "");
  const log = useReadLog();
  const gradeRaw = useStored(GRADE_KEY);
  const pickerRaw = useStored(PICKER_KEY);
  const attendanceRaw = useStored(ATTENDANCE_KEY);
  const reviewRaw = useStored(REVIEW_KEY);

  const pickerGrade = parse(pickerRaw, isPicker, {}).grade;
  const grade = gradeRaw && GAKKO_GRADES.includes(gradeRaw) ? gradeRaw : pickerGrade && GAKKO_GRADES.includes(pickerGrade) ? pickerGrade : "";
  const attendance = parse(attendanceRaw, isAttendance, {});
  const review = parse(reviewRaw, isReview, { date: "", ids: [] });

  const periods = useMemo(() => (grade && dateKey ? buildTimetable(data, grade, dateKey, log.read) : []), [data, grade, dateKey, log.read]);
  const start = dateKey ? jstDayStart(dateKey) : Infinity;
  const done = (p: { unit: string; review: boolean }) => (log.read[p.unit] ?? 0) >= start || (p.review && review.date === dateKey && review.ids.includes(p.unit));
  const doneCount = periods.filter(done).length;
  const allDone = periods.length === PERIODS && doneCount === PERIODS;
  const attended = !!dateKey && (allDone || !!attendance[dateKey]);
  const next = periods.find((p) => !done(p));

  // 4コマそろったら、その日の出席を書く (一度だけ)
  const units = periods.map((p) => p.unit).join(",");
  useEffect(() => {
    if (!allDone || !dateKey || attendance[dateKey]) return;
    setJSON(ATTENDANCE_KEY, { ...attendance, [dateKey]: units.split(",") });
  }, [allDone, dateKey, units, attendance]);

  const month = dateKey.slice(0, 7);
  const monthDays = Object.keys(attendance).filter((d) => d.startsWith(month)).length + (allDone && !attendance[dateKey] ? 1 : 0);
  const readCount = Object.keys(log.read).length;

  const openReview = (unit: string) => {
    const ids = review.date === dateKey ? review.ids : [];
    if (!ids.includes(unit)) setJSON(REVIEW_KEY, { date: dateKey, ids: [...ids, unit] });
  };

  const goBtn = "flex min-h-[56px] items-center justify-center rounded-full bg-[#FFE45C] px-6 text-[19px] font-black text-[#15172B] no-underline shadow-[0_4px_0_#0E2380] transition-transform hover:-translate-y-0.5 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <>
      {/* 校門 */}
      <section
        aria-labelledby="gate-heading"
        className="flex flex-col items-center gap-3.5 rounded-[22px_22px_6px_6px] border-t-[10px] border-[#0E2380] bg-[#1533B8] px-5 pb-6 pt-7 text-center text-white shadow-[0_10px_0_-4px_#E3DCC8,0_18px_0_-8px_#D7CFB7] sm:px-10 sm:py-10"
      >
        <p className="m-0 text-[12px] font-bold tracking-[0.14em] text-[#FFE45C]">あたらしいがっこう</p>
        <h1 id="gate-heading" className="m-0 font-serif text-[34px] font-extrabold leading-[1.3] sm:text-[46px]">
          きょうも、
          <br />
          自分の学校を
          <br className="sm:hidden" />
          ひらこう。
        </h1>
        <p className="m-0 max-w-[480px] text-[14px] leading-[1.9] text-[#DDE3FA] sm:text-[15px]">
          ここで学んだ一日が、あなたの出席になる。
          <br />
          時間割も、教室も、先生役も。
          <br />
          <b className="text-white">あなたがひらく、自分だけの学校。</b>
        </p>
        <div className="w-full max-w-[420px]">
          {next ? (
            <Link href={`/learn/lecture/${next.unit}`} onClick={() => next.review && openReview(next.unit)} className={goBtn}>
              まなぶ
            </Link>
          ) : (
            <a href={grade ? "#jikanwari" : "#gakunen"} className={goBtn}>
              まなぶ
            </a>
          )}
        </div>
        <p className="m-0 text-[12px] text-[#DDE3FA]" aria-live="polite">
          {dateKey ? (
            <>
              今月の出席 <b className="text-white tabular-nums">{monthDays}</b>日　／　読んだ単元 <b className="text-white tabular-nums">{readCount}</b>
            </>
          ) : (
            " "
          )}
        </p>
      </section>

      {/* 学年 */}
      <section id="gakunen" aria-labelledby="grade-heading" className="mt-9 flex scroll-mt-4 flex-col gap-2.5">
        <h2 id="grade-heading" className="m-0 text-[18px] font-black">
          あなたの学年
        </h2>
        <div role="group" aria-labelledby="grade-heading" className="flex flex-wrap gap-1.5">
          {GAKKO_GRADES.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={grade === g}
              onClick={() => setJSON(GRADE_KEY, g)}
              className={`min-h-[42px] min-w-[54px] rounded-full border-[1.5px] border-[#15172B] px-3 text-[14px] font-black outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#1533B8] ${grade === g ? "bg-[#15172B] text-white" : "bg-white text-[#15172B] hover:bg-[#FFF8D6]"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      {/* きょうの時間割 */}
      <section id="jikanwari" aria-labelledby="tt-heading" className="mt-8 flex scroll-mt-4 flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="tt-heading" className="m-0 text-[18px] font-black">
            きょうの時間割{grade && <span className="ml-1.5 text-[13px] font-bold text-[#5A5D73]">{grade}</span>}
          </h2>
          <div className="flex gap-1 text-[11.5px] font-bold">
            <span className="rounded-full bg-[#15172B] px-2.5 py-1 text-white">自動</span>
            <span className="rounded-full border-[1.5px] border-dashed border-[#8F94B8] px-2.5 py-1 text-[#5A5D73]" title="準備中">
              自分で組む（準備中）
            </span>
          </div>
        </div>

        <div className="rounded-[16px] border-[1.5px] border-[#15172B] bg-white px-3.5 py-1 shadow-[4px_4px_0_#15172B]">
          {!grade ? (
            <p className="m-0 py-6 text-center text-[14px] font-bold text-[#5A5D73]">
              学年をえらぶと、きょうの時間割ができます。
            </p>
          ) : !dateKey || !periods.length ? (
            <p className="m-0 py-6 text-center text-[14px] font-bold text-[#5A5D73]">時間割をつくっています…</p>
          ) : (
            <ol className="m-0 list-none p-0">
              {periods.map((p, i) => {
                const u = data.units[p.unit];
                const color = u?.c ?? "#6E7084";
                const ok = done(p);
                return (
                  <li key={p.unit} className="flex items-center gap-3 border-b border-[#E3DCC8] py-3 last:border-b-0" data-period={i + 1} data-done={ok ? "1" : "0"}>
                    <span className="flex w-[44px] flex-none flex-col items-center leading-none">
                      <span className="text-[20px] font-black tabular-nums" style={{ color: ok ? "#8F94B8" : INK }}>
                        {i + 1}
                      </span>
                      <span className="mt-0.5 text-[10px] font-bold text-[#5A5D73]">時間目</span>
                    </span>
                    <span aria-hidden="true" className="h-10 w-[5px] flex-none rounded-full" style={{ background: color }} />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-1.5 text-[11px] font-black" style={{ color }}>
                        {u?.s}
                        <span className="font-bold text-[#5A5D73]">{u?.g}</span>
                        {p.review && <span className="rounded bg-[#FFF8D6] px-1 text-[10px] text-[#8A5A00]">復習</span>}
                      </span>
                      <span className={`block text-[15px] font-bold leading-[1.45] ${ok ? "text-[#5A5D73]" : ""}`}>{u?.n ?? p.unit}</span>
                    </span>
                    {ok ? (
                      <span className="flex flex-none items-center gap-1 rounded-full bg-[#2F7D4F] px-2.5 py-1.5 text-[12px] font-black text-white">
                        <Check />
                        <span>読んだ</span>
                      </span>
                    ) : (
                      <Link
                        href={`/learn/lecture/${p.unit}`}
                        onClick={() => p.review && openReview(p.unit)}
                        aria-label={`${i + 1}時間目 ${u?.n ?? ""}をまなぶ`}
                        className="flex min-h-[40px] flex-none items-center rounded-full border-[1.5px] border-[#15172B] bg-[#1533B8] px-3.5 text-[13px] font-black text-white no-underline shadow-[2px_2px_0_#15172B] hover:bg-[#0E2380]"
                        style={{ color: "#FFFFFF" }}
                      >
                        まなぶ
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {grade && periods.length > 0 && (
          <div className="flex items-center gap-3 rounded-[16px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-3.5" aria-live="polite">
            {attended ? (
              <>
                <Stamp dateKey={dateKey} />
                <p className="m-0 text-[14px] font-bold leading-[1.7]">
                  4コマ、ぜんぶ読みました。
                  <br />
                  きょうは<b>出席</b>です。また明日、新しい時間割で。
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-none gap-1" aria-hidden="true">
                  {periods.map((p) => (
                    <span key={p.unit} className={`h-3.5 w-3.5 rounded-full border-[1.5px] border-[#15172B] ${done(p) ? "bg-[#2F7D4F]" : "bg-white"}`} />
                  ))}
                </div>
                <p className="m-0 text-[13px] font-bold leading-[1.6]">
                  あと <b className="text-[16px] tabular-nums">{PERIODS - doneCount}</b> コマで、きょうの出席。
                </p>
              </>
            )}
          </div>
        )}
        <p className="m-0 text-[11.5px] leading-[1.7] text-[#5A5D73]">
          時間割は、まだ読んでいない単元から、教科がばらけるように毎日自動で組みます。単元を最後まで読むと「読んだ」になります。
        </p>
      </section>
    </>
  );
}
