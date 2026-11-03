"use client";

// /learn/gakko/dashboard：学びのダッシュボード (出席簿・得意と苦手・最近の学び・学びの報告書)。
// 記録はすべてこの端末の localStorage を読むだけ (集計は lib/gakko/dashboard)。サーバー描画では記録がないので、読みこみ後に出す。
// 報告書は @media print で、そこだけを1枚に印刷する (下の PRINT_CSS)。

import Link from "next/link";
import { useMemo, useState } from "react";
import { GAKKO_GRADES, jstDateKey } from "@/lib/gakko/timetable";
import { ATTENDANCE_KEY, GRADE_KEY, PICKER_KEY, parse, setJSON, useClientValue, useStored } from "@/lib/gakko/store";
import {
  KIND_LABEL,
  WEEK,
  activities,
  addDays,
  dayLabel,
  days as toDays,
  guessGrade,
  isEmpty,
  monthLength,
  parseAttendance,
  parseExam,
  parseMoshi,
  rank,
  report as buildReport,
  shiftMonth,
  streak as toStreak,
  subjectStats,
  weekday,
  type Activity,
  type DashData,
  type Records,
  type SubjectStat,
} from "@/lib/gakko/dashboard";
import { useReadLog } from "@/lib/lecture/readLog";
import { MOSHI_RESULTS_KEY } from "@/lib/moshi/results";
import { EXAM_RESULTS_KEY } from "@/lib/exam/results";
import { TSUKKOMI_SAVE_KEY, parseSave } from "@/lib/tsukkomi/storage";

const isPicker = (v: unknown): v is { grade?: string } => !!v && typeof v === "object";

const card = "rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4";
const h2 = "m-0 text-[18px] font-black";
const BLUE = "#1533B8";

const PRINT_CSS = `
@media print {
  @page { size: A4 portrait; margin: 12mm; }
  html, body { background: #fff !important; }
  body *:not(:has(#gakko-report)):not(#gakko-report):not(#gakko-report *) { display: none !important; }
  body *:has(#gakko-report) { background: none !important; padding: 0 !important; margin: 0 !important; border: 0 !important; box-shadow: none !important; min-height: 0 !important; max-width: none !important; }
  #gakko-report { border: 0 !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; font-size: 10.5pt; color: #000; }
  #gakko-report .no-print { display: none !important; }
  #gakko-report table { break-inside: auto; }
  #gakko-report tr { break-inside: avoid; }
}`;

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" className="shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

const goBtn =
  "inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-8 text-[18px] font-black text-[#15172B] no-underline shadow-[0_4px_0_#15172B] transition-transform hover:-translate-y-0.5";

export function GakkoDashboard({ data }: { data: DashData }) {
  const today = useClientValue(() => jstDateKey(), "");
  const log = useReadLog();
  const attendanceRaw = useStored(ATTENDANCE_KEY);
  const moshiRaw = useStored(MOSHI_RESULTS_KEY);
  const examRaw = useStored(EXAM_RESULTS_KEY);
  const tsukkomiRaw = useStored(TSUKKOMI_SAVE_KEY);
  const gradeRaw = useStored(GRADE_KEY);
  const pickerRaw = useStored(PICKER_KEY);

  const rec: Records = useMemo(() => {
    const t = parseSave(tsukkomiRaw);
    return { attendance: parseAttendance(attendanceRaw), read: log.read, moshi: parseMoshi(moshiRaw), exam: parseExam(examRaw), tsukkomi: t.log, tsukkomiBest: t.best };
  }, [attendanceRaw, log.read, moshiRaw, examRaw, tsukkomiRaw]);

  if (!today) return <p className="m-0 py-16 text-center text-[14px] font-bold text-[#5A5D73]">記録を読みこんでいます…</p>;

  const pickerGrade = parse(pickerRaw, isPicker, {}).grade;
  const chosen = gradeRaw && GAKKO_GRADES.includes(gradeRaw) ? gradeRaw : pickerGrade && GAKKO_GRADES.includes(pickerGrade) ? pickerGrade : "";

  return (
    <>
      <style>{PRINT_CSS}</style>
      <header className="flex flex-col gap-2">
        <p className="m-0 text-[12px] font-black tracking-[0.12em] text-[#8A5A00]">あたらしいがっこう</p>
        <h1 className="m-0 font-serif text-[28px] font-extrabold leading-[1.3] sm:text-[34px]">学びのダッシュボード</h1>
      </header>
      {isEmpty(rec) ? <Empty /> : <Filled data={data} rec={rec} today={today} chosen={chosen} />}
    </>
  );
}

function Empty() {
  return (
    <section aria-labelledby="empty-heading" className={`${card} mt-5 flex flex-col items-center gap-3 border-dashed px-5 py-9 text-center`}>
      <h2 id="empty-heading" className={h2}>
        まだ記録がありません
      </h2>
      <p className="m-0 max-w-[420px] text-[14px] leading-[1.9] text-[#3A3D55]">
        単元をひとつ読むと、ここに出席簿・得意と苦手・最近の学びがたまっていきます。
        <br />
        記録はこの端末に保存されます。
      </p>
      <Link href="/learn/gakko#jikanwari" className={goBtn}>
        まなぶ
      </Link>
      <span className="text-[12px] text-[#5A5D73]">きょうの時間割の1時間目からはじめられます</span>
    </section>
  );
}

function Filled({ data, rec, today, chosen }: { data: DashData; rec: Records; today: string; chosen: string }) {
  const d = useMemo(() => toDays(rec), [rec]);
  const grade = chosen || guessGrade(data, rec.read) || "中1";
  const stats = useMemo(() => subjectStats(data, grade, rec), [data, grade, rec]);
  const acts = useMemo(() => activities(data, rec), [data, rec]);
  const month = today.slice(0, 7);
  const monthAttended = [...d.attended].filter((k) => k.startsWith(month)).length;
  const monthLearned = [...d.learned.keys()].filter((k) => k.startsWith(month)).length;
  const streak = toStreak(d, today);
  const total = Object.keys(rec.read).length;

  const tabs = [
    ["#shusseki", "出席簿"],
    ["#tokui", "得意と苦手"],
    ["#saikin", "最近の学び"],
    ["#hokoku", "報告書"],
  ];

  return (
    <>
      <nav aria-label="このページの中" className="mt-3 flex flex-wrap gap-1.5 text-[12.5px] font-bold">
        {tabs.map(([href, label], i) => (
          <a key={href} href={href} className={`rounded-full border-[1.5px] border-[#15172B] px-3 py-1.5 no-underline ${i === 0 ? "bg-[#15172B] text-white" : "bg-white text-[#15172B] hover:bg-[#FFF8D6]"}`}>
            {label}
          </a>
        ))}
      </nav>

      <p className="m-0 mt-4 font-serif text-[22px] font-extrabold leading-[1.4] sm:text-[26px]">
        今月は <span className="tabular-nums">{monthAttended}</span>日 出席、<span className="tabular-nums">{monthLearned}</span>日 学んだ
      </p>

      <section className="mt-4 grid grid-cols-3 gap-2 text-center" aria-label="数字で見る">
        {(
          [
            ["連続", streak, "日"],
            ["今月の出席", monthAttended, "日"],
            ["読んだ単元（累計）", total, "単元"],
          ] as const
        ).map(([l, n, u]) => (
          <div key={l} className={`${card} flex flex-col gap-1 px-1 py-3`}>
            <span className="text-[11px] leading-[1.4] text-[#5A5D73]">{l}</span>
            <b className="text-[24px] leading-none tabular-nums">
              {n}
              <span className="ml-0.5 text-[12px]">{u}</span>
            </b>
          </div>
        ))}
      </section>

      <Calendar d={d} today={today} />
      <Strengths stats={stats} grade={grade} chosen={!!chosen} />
      <Recent acts={acts.slice(0, 10)} />
      <ReportSection data={data} rec={rec} today={today} />
    </>
  );
}

// ---- 出席簿 ----

function Calendar({ d, today }: { d: ReturnType<typeof toDays>; today: string }) {
  const [shown, setShown] = useState("");
  const month = shown || today.slice(0, 7);
  const [y, m] = month.split("-").map(Number);
  const first = `${month}-01`;
  const lead = weekday(first);
  const n = monthLength(month);
  const cells = Array.from({ length: n }, (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`);
  const att = cells.filter((k) => d.attended.has(k)).length;
  const lrn = cells.filter((k) => d.learned.has(k)).length;
  const canNext = month < today.slice(0, 7);

  return (
    <section id="shusseki" aria-labelledby="cal-heading" className="mt-8 flex scroll-mt-4 flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <h2 id="cal-heading" className={h2}>
          出席簿
        </h2>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setShown(shiftMonth(month, -1))} aria-label="前の月" className="h-9 w-9 rounded-full border-[1.5px] border-[#15172B] bg-white text-[15px] font-black">
            ‹
          </button>
          <span className="min-w-[88px] text-center text-[14px] font-black tabular-nums" aria-live="polite">
            {y}年{m}月
          </span>
          <button type="button" disabled={!canNext} onClick={() => setShown(shiftMonth(month, 1))} aria-label="次の月" className="h-9 w-9 rounded-full border-[1.5px] border-[#15172B] bg-white text-[15px] font-black disabled:opacity-30">
            ›
          </button>
        </div>
      </div>
      <div className={`${card} flex flex-col gap-2.5 sm:px-8`}>
        <div className="mx-auto grid w-full max-w-[460px] grid-cols-7 gap-1.5 text-center text-[11px] text-[#5A5D73]" aria-hidden="true">
          {WEEK.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <ol className="m-0 mx-auto grid w-full max-w-[460px] list-none grid-cols-7 gap-1.5 p-0">
          {Array.from({ length: lead }, (_, i) => (
            <li key={`b${i}`} aria-hidden="true" />
          ))}
          {cells.map((k) => {
            const a = d.attended.has(k);
            const l = d.learned.has(k);
            const day = Number(k.slice(8));
            const status = a ? "出席" : l ? `学んだ日（${d.learned.get(k)?.length}単元）` : "";
            return (
              <li
                key={k}
                data-day={k}
                data-status={a ? "attended" : l ? "learned" : ""}
                aria-label={`${day}日${status ? ` ${status}` : ""}`}
                className={`relative flex aspect-square items-center justify-center rounded-[8px] text-[12.5px] font-bold tabular-nums ${a ? "bg-[#1533B8] text-white" : l ? "border-[1.5px] border-[#1533B8] bg-[#E6EBFB] text-[#1533B8]" : "bg-[#F1ECDF] text-[#8F94B8]"} ${k === today ? "outline outline-2 outline-offset-1 outline-[#15172B]" : ""}`}
              >
                {day}
                {a && <span aria-hidden="true" className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-[#FFE45C]" />}
              </li>
            );
          })}
        </ol>
        <div className="mx-auto flex w-full max-w-[460px] flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-[#5A5D73]">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-3.5 w-3.5 rounded-[4px] bg-[#1533B8]" />
            出席（時間割の4コマを読んだ日） {att}日
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-3.5 w-3.5 rounded-[4px] border-[1.5px] border-[#1533B8] bg-[#E6EBFB]" />
            学んだ日（1単元以上読んだ日） {lrn}日
          </span>
        </div>
      </div>
    </section>
  );
}

// ---- 得意と苦手 ----

function Bar({ v, color }: { v: number; color: string }) {
  return (
    <div className="h-2 rounded-full bg-[#F1ECDF]" aria-hidden="true">
      <div className="h-2 rounded-full" style={{ width: `${Math.max(2, Math.min(100, v))}%`, background: color }} />
    </div>
  );
}

function SubjectRow({ s }: { s: SubjectStat }) {
  return (
    <li className="flex flex-col gap-1.5 border-b border-[#E3DCC8] py-2.5 last:border-b-0">
      <div className="flex items-baseline justify-between gap-2">
        <b className="text-[14px]" style={{ color: s.color }}>
          {s.subject}
        </b>
        <span className="text-[12px] font-bold tabular-nums">
          {s.read}／{s.units}単元
        </span>
      </div>
      <Bar v={s.readPct} color={s.color} />
      <div className="flex flex-wrap gap-x-3 text-[11.5px] text-[#5A5D73]">
        <span>模試・入試 {s.testPct === null ? "—" : <b className="text-[#15172B] tabular-nums">平均 {s.testPct}%</b>}{s.testN > 0 && `（${s.testN}件）`}</span>
        <span>
          ツッコミ{" "}
          {s.tsukkomiPct !== null ? (
            <b className="text-[#15172B] tabular-nums">
              正解率 {s.tsukkomiPct}%（{s.tsukkomiN}回）
            </b>
          ) : s.tsukkomiBest > 0 ? (
            <b className="text-[#15172B] tabular-nums">最高 {s.tsukkomiBest.toLocaleString("ja-JP")}点</b>
          ) : (
            "—"
          )}
        </span>
      </div>
    </li>
  );
}

function Strengths({ stats, grade, chosen }: { stats: SubjectStat[]; grade: string; chosen: boolean }) {
  const { strong, grow, untouched } = rank(stats);
  const name = (s: SubjectStat) => s.subject;
  return (
    <section id="tokui" aria-labelledby="tokui-heading" className="mt-8 flex scroll-mt-4 flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="tokui-heading" className={h2}>
          得意と苦手
        </h2>
        <label className="flex items-center gap-1.5 text-[12px] font-bold text-[#5A5D73]">
          学年
          <select value={grade} onChange={(e) => setJSON(GRADE_KEY, e.target.value)} className="min-h-[36px] rounded-full border-[1.5px] border-[#15172B] bg-white px-2.5 text-[13px] font-black text-[#15172B]">
            {GAKKO_GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </div>
      {!chosen && <p className="m-0 text-[11.5px] text-[#5A5D73]">学年がえらばれていないので、読んだ単元がいちばん多い学年で数えています。</p>}

      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className={`${card} flex flex-col gap-1.5 bg-[#EEF7F1]`}>
          <span className="text-[12px] font-black text-[#2F7D4F]">得意</span>
          {strong.length ? (
            <b className="text-[17px]">{strong.map(name).join("・")}</b>
          ) : (
            <span className="text-[13px] text-[#5A5D73]">記録がたまると出てきます</span>
          )}
        </div>
        <div className={`${card} flex flex-col gap-2 bg-[#FFF8D6]`}>
          <span className="text-[12px] font-black text-[#8A5A00]">のびしろ{untouched && grow.length > 0 && "（まだ記録のない教科）"}</span>
          {grow.length ? (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {grow.map((s) => (
                <li key={s.subject} className="flex flex-col gap-1">
                  <b className="text-[17px]">{s.subject}</b>
                  <span className="flex flex-wrap gap-1.5">
                    {s.nextRead && (
                      <Link href={`/learn/lecture/${s.nextRead}`} className="inline-flex min-h-[36px] items-center gap-1 rounded-full border-[1.5px] border-[#15172B] bg-white px-3 text-[12.5px] font-black text-[#15172B] no-underline hover:bg-[#FFFBE6]">
                        次に読む：{s.nextReadName}
                        <Arrow />
                      </Link>
                    )}
                    {s.nextMoshi && (
                      <Link href={`/learn/moshi/${s.nextMoshi}`} className="inline-flex min-h-[36px] items-center gap-1 rounded-full border-[1.5px] border-[#15172B] bg-[#1533B8] px-3 text-[12.5px] font-black text-white no-underline" style={{ color: "#FFFFFF" }}>
                        単元模試：{s.nextMoshiName}
                        <Arrow />
                      </Link>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-[13px] text-[#5A5D73]">2つ以上の教科に記録がたまると出てきます</span>
          )}
        </div>
      </div>

      <div className={`${card} py-1.5`}>
        <p className="m-0 border-b border-[#E3DCC8] py-2 text-[12px] font-bold text-[#5A5D73]">{grade}の教科ごと（読んだ単元／その学年の単元）</p>
        <ul className="m-0 list-none p-0">
          {stats.map((s) => (
            <SubjectRow key={s.subject} s={s} />
          ))}
        </ul>
      </div>
      <p className="m-0 text-[11.5px] leading-[1.7] text-[#5A5D73]">得意とのびしろは、読んだ割合・模試や入試モードの平均・ツッコミの正解率のうち、記録のあるものの平均で並べています。</p>
    </section>
  );
}

// ---- 最近の学び ----

const KIND_COLOR: Record<Activity["kind"], string> = { read: "#2F7D4F", moshi: BLUE, exam: "#0E2380", tsukkomi: "#B42318" };

function when(at: number) {
  const k = jstDateKey(at);
  const t = new Date(at + 9 * 3600_000).toISOString().slice(11, 16);
  return `${Number(k.slice(5, 7))}/${Number(k.slice(8))} ${t}`;
}

function Recent({ acts }: { acts: Activity[] }) {
  return (
    <section id="saikin" aria-labelledby="recent-heading" className="mt-8 flex scroll-mt-4 flex-col gap-2.5">
      <h2 id="recent-heading" className={h2}>
        最近の学び
      </h2>
      <ol className={`${card} m-0 list-none py-1.5`}>
        {acts.map((a, i) => (
          <li key={`${a.kind}${a.at}${i}`} className="flex items-baseline gap-2.5 border-b border-[#E3DCC8] py-2.5 text-[13.5px] leading-[1.6] last:border-b-0">
            <span className="w-[78px] flex-none text-[11.5px] text-[#5A5D73] tabular-nums">{when(a.at)}</span>
            <span className="min-w-0 flex-1">
              <span className="mr-1.5 inline-block rounded px-1.5 text-[10.5px] font-black text-white" style={{ background: KIND_COLOR[a.kind] }}>
                {KIND_LABEL[a.kind]}
              </span>
              {a.subject && <span className="mr-1 text-[11.5px] font-bold text-[#5A5D73]">{a.subject}</span>}
              {a.text}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ---- 学びの報告書 ----

type Period = "week" | "month" | "custom";

function ReportSection({ data, rec, today }: { data: DashData; rec: Records; today: string }) {
  const [period, setPeriod] = useState<Period>("month");
  const [cFrom, setCFrom] = useState("");
  const [cTo, setCTo] = useState("");
  const weekFrom = addDays(today, -((weekday(today) + 6) % 7));
  const monthFrom = `${today.slice(0, 7)}-01`;
  let from = period === "week" ? weekFrom : period === "month" ? monthFrom : cFrom || monthFrom;
  let to = period === "custom" ? cTo || today : today;
  if (from > to) [from, to] = [to, from];
  const r = useMemo(() => buildReport(data, rec, from, to), [data, rec, from, to]);
  const made = dayLabel(today, true);

  const pill = (p: Period, label: string) => (
    <button
      key={p}
      type="button"
      aria-pressed={period === p}
      onClick={() => setPeriod(p)}
      className={`min-h-[38px] rounded-full border-[1.5px] border-[#15172B] px-3.5 text-[13px] font-black ${period === p ? "bg-[#15172B] text-white" : "bg-white text-[#15172B] hover:bg-[#FFF8D6]"}`}
    >
      {label}
    </button>
  );

  return (
    <section id="hokoku" aria-labelledby="report-heading" className="mt-8 flex scroll-mt-4 flex-col gap-2.5">
      <h2 id="report-heading" className={h2}>
        学びの報告書
      </h2>
      <div className={`${card} flex flex-col gap-3`}>
        <div role="group" aria-label="期間" className="flex flex-wrap gap-1.5">
          {pill("week", "今週")}
          {pill("month", "今月")}
          {pill("custom", "自分で選ぶ")}
        </div>
        {period === "custom" && (
          <div className="flex flex-wrap items-center gap-2 text-[13px] font-bold">
            <input type="date" aria-label="はじめの日" value={cFrom || monthFrom} max={today} onChange={(e) => setCFrom(e.target.value)} className="min-h-[38px] rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-2" />
            〜
            <input type="date" aria-label="おわりの日" value={cTo || today} max={today} onChange={(e) => setCTo(e.target.value)} className="min-h-[38px] rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-2" />
          </div>
        )}
        <p className="m-0 text-[12.5px] leading-[1.8] text-[#3A3D55]">
          学校に出すときは、印刷して名前を書き、おうちの人と中身を確かめてから先生に渡してください。出席としての扱いは、それぞれの学校が決めます。
        </p>
        <button type="button" onClick={() => window.print()} className="min-h-[48px] rounded-full bg-[#15172B] px-6 text-[15px] font-black text-white hover:bg-[#2A2D45]">
          印刷する・PDFにする
        </button>
      </div>

      {/* 印刷される1枚 */}
      <article id="gakko-report" aria-label="報告書のプレビュー" className="rounded-[6px] border-[1.5px] border-[#15172B] bg-white p-5 text-[13px] leading-[1.6] text-[#15172B] shadow-[4px_4px_0_#15172B] sm:p-8">
        <header className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-[#15172B] pb-2">
          <div>
            <p className="m-0 text-[11px] font-bold text-[#5A5D73]">アオハルラーン あたらしいがっこう</p>
            <h3 className="m-0 font-serif text-[22px] font-extrabold">学びの報告書</h3>
          </div>
          <p className="m-0 text-[12px] tabular-nums">
            {dayLabel(r.from, true)} 〜 {dayLabel(r.to, true)}
          </p>
        </header>
        <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2 text-[12.5px]">
          <span className="flex min-w-[240px] flex-1 items-end gap-2">
            名前<span className="block h-6 flex-1 border-b border-[#15172B]" aria-label="名前（手書き）" />
          </span>
          <span>作成日　{made}</span>
        </div>

        <dl className="m-0 mt-4 grid grid-cols-3 gap-1.5 text-center sm:grid-cols-5">
          {[
            ["学んだ日", r.learnedDays, "日"],
            ["出席", r.attendedDays, "日"],
            ["読んだ単元", r.readUnits, ""],
            ["模試・入試", r.tests, "回"],
            ["ツッコミ", r.tsukkomi, "回"],
          ].map(([l, n, u]) => (
            <div key={l} className="rounded-[6px] border border-[#15172B] px-1 py-1.5">
              <dt className="text-[10.5px] text-[#3A3D55]">{l}</dt>
              <dd className="m-0 text-[17px] font-black tabular-nums">
                {n}
                <span className="text-[10.5px] font-bold">{u}</span>
              </dd>
            </div>
          ))}
        </dl>
        {r.bySubject.length > 0 && (
          <p className="m-0 mt-2 text-[12px]">
            教科ごとの読んだ単元：{r.bySubject.map((s) => `${s.subject} ${s.n}`).join("　")}
          </p>
        )}

        <h4 className="m-0 mt-4 text-[13px] font-black">日ごとの記録</h4>
        {r.days.length ? (
          <table className="mt-1 w-full border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-[#15172B] text-left">
                <th className="w-[96px] py-1 pr-2 font-bold">日付</th>
                <th className="w-[40px] py-1 pr-2 text-center font-bold">出席</th>
                <th className="py-1 font-bold">学んだこと</th>
              </tr>
            </thead>
            <tbody>
              {r.days.map((d) => (
                <tr key={d.key} className="border-b border-[#D7CFB7] align-top">
                  <td className="py-1 pr-2 tabular-nums">{dayLabel(d.key)}</td>
                  <td className="py-1 pr-2 text-center">{d.attended ? "○" : ""}</td>
                  <td className="py-1">
                    {d.items.length
                      ? d.items.map((a, i) => (
                          <span key={i}>
                            {i > 0 && "／"}
                            {a.kind !== "read" && `${KIND_LABEL[a.kind]} `}
                            {a.subject && `${a.subject}`}
                            {a.text}
                          </span>
                        ))
                      : "時間割の4コマ（復習）"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="m-0 mt-1 text-[12px] text-[#5A5D73]">この期間の記録はありません。</p>
        )}

        <footer className="mt-4 border-t border-[#15172B] pt-2 text-[10.5px] leading-[1.7] text-[#3A3D55]">
          この記録は利用者の端末に保存されたものです。「出席」はアオハルラーンの時間割の4コマを読み終えた日、「学んだ日」は図解レクチャーの単元を1つ以上読み終えた日です。単元模試は単元ごとの最新の結果だけを記録しています。
          <br />
          アオハルラーン https://app.bluespring.co.jp/learn/gakko
        </footer>
      </article>
    </section>
  );
}
