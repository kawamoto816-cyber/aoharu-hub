"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { recordMastery } from "@/lib/sakanobori/mastery";
import { setKakomonReturn } from "@/components/kakomon/KakomonReturn";
import { gradeKakomon, markOptions, sheetRows } from "@/lib/kakomon/grade";
import type { KakomonExam, KakomonResult, Marks } from "@/lib/kakomon/types";

// 過去問チャレンジの本体。問題は載せない。大学入試センターの問題を見て解き、解答欄ごとにマーク → 公式の配点で採点。
// 途中の状態 (マーク・始めた時刻) は、この端末に残す (読みこみ直しても続きから)。提出すると結果だけを残す。

type Saved = {
  startedAt?: number;
  marks: Marks;
  doneAt?: number;
  usedSec?: number;
};

const key = (id: string) => `kakomon:v2:${id}`;
function load(id: string): Saved | null {
  try {
    const raw = window.localStorage.getItem(key(id));
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}
function save(id: string, v: Saved | null) {
  try {
    if (v) window.localStorage.setItem(key(id), JSON.stringify(v));
    else window.localStorage.removeItem(key(id));
  } catch {
    /* 保存できない端末でも、そのまま使える */
  }
}

const mmss = (sec: number) =>
  `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
const card =
  "rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 sm:p-5";
const bigBtn =
  "inline-flex min-h-[48px] items-center justify-center rounded-[12px] border-[1.5px] border-[#15172B] px-5 text-[15px] font-black";
const smallLink =
  "inline-flex min-h-[40px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 text-[13px] font-black text-[#15172B] no-underline";

/** 大学入試センターへのリンク (リンク先がセンターのサイトだと分かるように書く) */
export function DncLinks({
  exam,
}: {
  exam: Pick<KakomonExam, "id" | "pdf" | "audio">;
}) {
  return (
    <span className="flex flex-wrap gap-2">
      <a
        href={exam.pdf}
        target="_blank"
        rel="noopener noreferrer"
        className={smallLink}
        onClick={() => trackEvent("kakomon_open_pdf", { exam: exam.id })}
      >
        問題のPDFを開く（大学入試センター）
      </a>
      {exam.audio && (
        <a
          href={exam.audio}
          target="_blank"
          rel="noopener noreferrer"
          className={smallLink}
          onClick={() => trackEvent("kakomon_open_audio", { exam: exam.id })}
        >
          音声を開く（大学入試センター）
        </a>
      )}
    </span>
  );
}

export function KakomonSource({ exam }: { exam: KakomonExam }) {
  return (
    <p className="m-0 mt-1 break-all text-[12px] leading-relaxed text-[#5A5D75]">
      出典：
      <a
        href={exam.source}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1533B8]"
      >
        大学入試センターウェブサイト
      </a>
      （{exam.source}
      ）の正解と配点をもとに、アオハルOSが採点のしくみを作成。問題文はこのページに載せていません。
    </p>
  );
}

/** 単元の表示と行き先 (サーバーで作って渡す) */
export interface UnitLink {
  name: string;
  /** 化学基礎・中2 など */
  where: string;
  lecture?: string;
  moshi?: string;
  /** 前提の単元のデータがあり、さかのぼれる */
  sakanobori: boolean;
}

/** さかのぼりのページ (lib/sakanobori の encodeWrong と同じ形：単元を「,」でつなぐ。前提のデータをクライアントに持ちこまないよう、ここで組む) */
const sakanoboriHref = (units: string[], origin?: string) =>
  `/learn/sakanobori?${origin ? `u=${encodeURIComponent(origin)}&` : ""}w=${units.slice(0, 40).map(encodeURIComponent).join(",")}`;

export function Challenge({
  exam,
  moshiHref,
  autoStart = false,
  units,
  unitLinks,
}: {
  exam: KakomonExam;
  moshiHref: string;
  autoStart?: boolean;
  /** 解答欄 → 単元 (lib/kakomon/units.ts。ない試験は undefined) */
  units?: Record<string, string>;
  unitLinks?: Record<string, UnitLink>;
}) {
  const rows = useMemo(() => sheetRows(exam), [exam]);
  const opts = useMemo(() => markOptions(exam), [exam]);
  const cellCount = useMemo(
    () => rows.reduce((a, g) => a + g.cells.length, 0),
    [rows],
  );
  const [phase, setPhase] = useState<"ready" | "run" | "done">("ready");
  const [marks, setMarks] = useState<Marks>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [usedSec, setUsedSec] = useState(0);
  const [confirm, setConfirm] = useState(false);
  // 途中で離れて、もどったときにはもう時間が過ぎていた (自動では提出せず、提出するかやり直すかを選ばせる)
  const [late, setLate] = useState(false);
  const submitted = useRef(false);

  const start = useCallback(() => {
    const t = Date.now();
    submitted.current = false;
    setLate(false);
    setMarks({});
    setStartedAt(t);
    setNow(t);
    setPhase("run");
    save(exam.id, { startedAt: t, marks: {} });
    trackEvent("kakomon_start", { exam: exam.id });
    window.scrollTo(0, 0);
  }, [exam.id]);

  // 前回の続き。選ぶ画面の「始める」(?start=1) から来たときは、終わった回・時間の過ぎた回を出さずに、新しく始める
  useEffect(() => {
    const s = load(exam.id);
    const over =
      !!s?.startedAt && Date.now() - s.startedAt >= exam.minutes * 60 * 1000;
    /* eslint-disable react-hooks/set-state-in-effect -- 初回だけ、この端末に残した続きから復元する */
    if (autoStart && (s?.doneAt || over || !s?.startedAt)) start();
    else if (s?.doneAt) {
      setMarks(s.marks ?? {});
      setUsedSec(s.usedSec ?? 0);
      setPhase("done");
    } else if (s?.startedAt) {
      setMarks(s.marks ?? {});
      setStartedAt(s.startedAt);
      setNow(Date.now());
      setLate(over);
      setPhase("run");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [exam.id, exam.minutes, autoStart, start]);

  const limit = exam.minutes * 60;
  const elapsed = startedAt
    ? Math.max(0, Math.floor((now - startedAt) / 1000))
    : 0;
  const left = Math.max(0, limit - elapsed);
  const marked = Object.values(marks).filter((v) => v !== undefined).length;

  const submit = useCallback(
    (auto: boolean) => {
      if (submitted.current) return;
      submitted.current = true;
      const used = Math.min(
        limit,
        startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0,
      );
      setUsedSec(used);
      setPhase("done");
      setConfirm(false);
      save(exam.id, { marks, doneAt: Date.now(), usedSec: used });
      const r = gradeKakomon(exam, marks);
      trackEvent("kakomon_submit", {
        exam: exam.id,
        score: r.score,
        auto: auto ? 1 : 0,
      });
      // 単元ごとの出来を、さかのぼりの習熟度に1件ずつ記録する (その単元の解答欄がすべて正解なら ok)
      if (units) {
        const byUnit = new Map<string, boolean>();
        for (const d of r.daimon)
          if (d.counted)
            for (const it of d.items)
              for (const c of it.cells) {
                const u = units[c.key];
                if (u) byUnit.set(u, (byUnit.get(u) ?? true) && c.ok);
              }
        recordMastery(
          [...byUnit.entries()].map(([unit, ok]) => ({ unit, ok })),
        );
      }
      window.scrollTo(0, 0);
    },
    [exam, limit, marks, startedAt, units],
  );

  // 時計。時間になったら自動で提出
  useEffect(() => {
    if (phase !== "run") return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (phase === "run" && startedAt && left === 0 && !late) submit(true);
  }, [phase, startedAt, left, late, submit]);

  const mark = (k: string, v: string) => {
    setMarks((m) => {
      const next = { ...m, [k]: m[k] === v ? undefined : v };
      if (startedAt) save(exam.id, { startedAt, marks: next });
      return next;
    });
  };
  const reset = () => {
    save(exam.id, null);
    submitted.current = false;
    setLate(false);
    setMarks({});
    setStartedAt(null);
    setPhase("ready");
    window.scrollTo(0, 0);
  };

  const selectNote = exam.select
    ? `第${exam.select.from[0]}問〜第${exam.select.from[exam.select.from.length - 1]}問は${exam.select.count}問を選んで解きます。選んだ大問だけマークしてください（${exam.select.count}問より多くマークしたときは、得点の高い${exam.select.count}問を数えます）。`
    : "";
  const kisoNote =
    exam.moshi.endsWith("b") && exam.minutes === 30
      ? "本番は基礎の2科目を合わせて60分です。ここでは1科目を30分で解きます。"
      : "";

  if (phase === "ready") {
    return (
      <div className="grid gap-4">
        <section className={card}>
          <h2 className="m-0 text-[17px] font-black">はじめ方</h2>
          <ol className="m-0 mt-3 grid list-none gap-3 p-0">
            {[
              {
                t: "問題を開く",
                b: `大学入試センターのページが別のタブで開きます。印刷しても、タブレットで見てもかまいません。${exam.audio ? "音声も大学入試センターのページで流します。" : ""}`,
                links: true,
              },
              {
                t: "時間を計って解く",
                b: `${exam.subject}は${exam.minutes}分。時間になると自動で提出します。${kisoNote}${selectNote}`,
              },
              {
                t: "答えをマークして採点",
                b: units
                  ? "大問ごとの得点と、落とした点を単元に分けた「逆転勉強法の作戦表」が出ます。"
                  : "大問ごとの得点と、次にやる類題が出ます。",
              },
            ].map((x, i) => (
              <li key={x.t} className="flex gap-3">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#1533B8] text-[13px] font-black text-white">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <b className="block text-[15px]">{x.t}</b>
                  <span className="text-[13px] leading-relaxed text-[#3A3D55]">
                    {x.b}
                  </span>
                  {x.links && (
                    <span className="mt-2 block">
                      <DncLinks exam={exam} />
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className="m-0 mt-4">
            <button
              type="button"
              onClick={start}
              className={`${bigBtn} w-full cursor-pointer bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A] sm:w-auto`}
            >
              マークシートを開いて始める（{exam.minutes}分）
            </button>
          </p>
          <p className="m-0 mt-3 text-[12px] leading-relaxed text-[#5A5D75]">
            解説は出ません（正誤と正解まで）。見直しのあとに、同じ形のアオハルの類題（解説つき）へ進めます。
          </p>
        </section>
        <KakomonSource exam={exam} />
      </div>
    );
  }

  if (phase === "run") {
    return (
      <div>
        <div
          className="sticky top-2 z-10 mb-3 flex items-center justify-between gap-3 rounded-[12px] bg-[#15172B] px-4 py-2.5 text-white"
          role="timer"
          aria-live="off"
        >
          <span className="text-[13px] font-bold leading-snug">
            {exam.year} {exam.kind}
            <br />
            <span className="text-[12px] font-normal opacity-80">
              マークした数 {marked} / {cellCount}
            </span>
          </span>
          <span className="whitespace-nowrap text-[13px]">
            残り{" "}
            <b
              className={`text-[22px] tabular-nums ${left <= 300 ? "text-[#FFE45C]" : ""}`}
            >
              {mmss(left)}
            </b>
          </span>
        </div>
        {late && (
          <section className="mb-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFF6D6] p-4">
            <p className="m-0 text-[14px] font-black leading-snug">
              前に始めた回の、制限時間（{exam.minutes}分）が過ぎています。
            </p>
            <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
              マークした{marked}
              個のまま採点するか、はじめからやり直すかを選んでください。
            </p>
            <p className="m-0 mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={start}
                className={`${bigBtn} cursor-pointer bg-[#1533B8] text-white`}
              >
                はじめからやり直す（{exam.minutes}分）
              </button>
              <button
                type="button"
                onClick={() => submit(false)}
                className={`${bigBtn} cursor-pointer bg-white text-[#15172B]`}
              >
                このまま採点する
              </button>
            </p>
          </section>
        )}
        <section className={card}>
          <p className="m-0 text-[13px] leading-relaxed text-[#3A3D55]">
            {exam.type === "kana"
              ? "解答記号の横の数字・符号を押してマークします。"
              : "解答番号の横の数字を押してマークします。"}
            もう一度押すと消えます。{selectNote}
          </p>
          <p className="m-0 mt-2">
            <DncLinks exam={exam} />
          </p>
          {rows.map((g) => (
            <fieldset
              key={g.daimon}
              className="m-0 mt-4 border-0 border-t border-[#E4E2D8] p-0 pt-3"
            >
              <legend className="float-left mb-1 w-full p-0 text-[13px] font-black text-[#3A3D55]">
                第{g.daimon}問（{g.points}点）{g.select ? "・選択" : ""}
              </legend>
              {g.cells.map((c) => (
                <div
                  key={c.key}
                  className="clear-both flex items-start gap-1.5 py-1"
                  role="radiogroup"
                  aria-label={`${exam.type === "kana" ? `第${g.daimon}問 解答記号` : "解答番号"} ${c.label}`}
                >
                  <span className="w-7 flex-none pt-1.5 text-right text-[15px] font-black tabular-nums">
                    {c.label}
                  </span>
                  <span
                    className={`flex flex-wrap sm:gap-1 ${opts.length > 9 ? "gap-[2px]" : "gap-[3px]"}`}
                  >
                    {opts.map((v) => {
                      const on = marks[c.key] === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          aria-label={v === "－" ? "マイナス" : v}
                          onClick={() => mark(c.key, v)}
                          className={`h-[34px] cursor-pointer rounded-full border-[1.5px] p-0 text-[13px] font-bold sm:w-[34px] ${opts.length > 9 ? "w-[24px] min-[400px]:w-[26px]" : "w-[27px] min-[400px]:w-[30px]"} ${on ? "border-[#15172B] bg-[#15172B] text-white" : "border-[#8A8DA3] bg-white text-[#15172B]"}`}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </span>
                </div>
              ))}
            </fieldset>
          ))}
          <div className="mt-5 border-t border-[#E4E2D8] pt-4">
            {confirm ? (
              <div className="rounded-[12px] bg-[#FFF6D6] p-3">
                <p className="m-0 text-[14px] font-bold">
                  {marked < cellCount && !exam.select
                    ? `まだ ${cellCount - marked} か所マークしていません。`
                    : ""}
                  提出すると、やり直しはできません。提出しますか。
                </p>
                <p className="m-0 mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => submit(false)}
                    className={`${bigBtn} cursor-pointer bg-[#1533B8] text-white`}
                  >
                    提出して採点する
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirm(false)}
                    className={`${bigBtn} cursor-pointer bg-white text-[#15172B]`}
                  >
                    もどって続ける
                  </button>
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirm(true)}
                className={`${bigBtn} w-full cursor-pointer bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A] sm:w-auto`}
              >
                提出して採点する
              </button>
            )}
          </div>
        </section>
      </div>
    );
  }

  const r: KakomonResult = gradeKakomon(exam, marks);
  const weak = r.daimon
    .filter((d) => d.counted && d.got / d.points < 0.7)
    .sort((a, b) => a.got / a.points - b.got / b.points);
  return (
    <div className="grid gap-4">
      <section className={card}>
        <p className="m-0 text-[13px] text-[#3A3D55]">
          {exam.year} {exam.kind}　{exam.subject}　かかった時間{" "}
          {Math.ceil(usedSec / 60)}分（制限 {exam.minutes}分）
        </p>
        <p className="m-0 mt-1 text-[44px] font-black leading-none">
          {r.score}
          <span className="text-[18px] font-bold text-[#5A5D75]">
            {" "}
            / {r.total}点
          </span>
        </p>
        <p className="m-0 mt-2 text-[13px] text-[#3A3D55]">
          正解した解答欄 {r.right} / {r.cells}
        </p>
      </section>
      <section className={card}>
        <h2 className="m-0 text-[17px] font-black">大問ごとの得点</h2>
        <table className="mt-2 w-full border-collapse text-[14px]">
          <tbody>
            {r.daimon.map((d) => {
              const rate = d.got / d.points;
              return (
                <tr
                  key={d.no}
                  className={`border-b border-[#E4E2D8] ${d.counted ? "" : "text-[#8A8DA3]"}`}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap py-2 pr-3 text-left font-bold"
                  >
                    第{d.no}問
                  </th>
                  <td className="w-full py-2">
                    {d.counted ? (
                      <div
                        className="h-2 overflow-hidden rounded bg-[#E9E8E0]"
                        aria-hidden
                      >
                        <div
                          className={`h-full ${rate < 0.6 ? "bg-[#C0392B]" : "bg-[#1533B8]"}`}
                          style={{ width: `${Math.round(rate * 100)}%` }}
                        />
                      </div>
                    ) : (
                      <span className="text-[12px]">
                        選ばなかった大問（数えていません）
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap py-2 pl-3 text-right tabular-nums">
                    {d.counted ? `${d.got} / ${d.points}` : "－"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className={card}>
        <h2 className="m-0 text-[17px] font-black">
          {exam.type === "kana" ? "解答記号" : "解答番号"}ごとの正誤
        </h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          「自分の答え →
          正解」の順です。赤は不正解。「3・5」のように書いた正解は、順を問いません。いくつかの解答欄をまとめて採点する設問は、全部そろったときだけ点が入ります（公式の注にある部分点は、点に入れてあります）。
        </p>
        {r.daimon
          .filter((d) => d.counted)
          .map((d) => (
            <div key={d.no} className="mt-3">
              <p className="m-0 text-[13px] font-black text-[#3A3D55]">
                第{d.no}問
              </p>
              <ul className="m-0 mt-1 grid list-none grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-1.5 p-0 text-[13px]">
                {d.items.flatMap((it) =>
                  it.cells.map((c) => (
                    <li
                      key={c.key}
                      className={`rounded-[8px] border px-2 py-1 tabular-nums ${c.ok ? "border-[#E4E2D8] bg-white" : "border-[#C0392B] bg-[#FDECEA]"}`}
                    >
                      <b>{c.label}</b>：{c.mine ?? "－"} →{" "}
                      {c.correct || "（上と組）"}
                      <span className="sr-only">
                        {c.ok ? "（正解）" : "（不正解）"}
                      </span>
                    </li>
                  )),
                )}
              </ul>
            </div>
          ))}
      </section>
      {units && unitLinks && (
        <GyakutenPlan
          title={`${exam.year} ${exam.kind} ${exam.subject}`}
          r={r}
          units={units}
          links={unitLinks}
          examId={exam.id}
          onRetry={reset}
        />
      )}
      <section className={card}>
        <h2 className="m-0 text-[17px] font-black">次にやること</h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          {weak.length > 0
            ? `得点が7割に届かなかった大問：${weak.map((d) => `第${d.no}問（${d.got}/${d.points}）`).join("、")}。本文と照らして見直したあと、アオハルの共通テスト模試（オリジナルの問題・解説つき）で、同じ科目を練習できます。`
            : "どの大問も7割をこえました。別の年度・追試験で、同じ時間配分をもう一度ためせます。"}
        </p>
        <p className="m-0 mt-3 flex flex-wrap gap-2">
          <Link
            href={moshiHref}
            className={`${bigBtn} bg-[#FFE45C] text-[#15172B] no-underline`}
          >
            共通テスト模試（{exam.subject}）を解く
          </Link>
          <Link
            href="/learn/kakomon"
            className={`${bigBtn} bg-white text-[#15172B] no-underline`}
          >
            別の過去問をえらぶ
          </Link>
          <button
            type="button"
            onClick={reset}
            className={`${bigBtn} cursor-pointer bg-white text-[#15172B]`}
          >
            記録を消して、もう一度解く
          </button>
        </p>
      </section>
      <KakomonSource exam={exam} />
    </div>
  );
}

/** 落とした点を単元ごとに集める (設問の落とした点を、その設問のまちがえた解答欄の単元に等分する) */
export function lostByUnit(
  r: KakomonResult,
  units: Record<string, string>,
): { unit: string; lost: number; cells: string[] }[] {
  const m = new Map<string, { lost: number; cells: string[] }>();
  for (const d of r.daimon) {
    if (!d.counted) continue;
    for (const it of d.items) {
      const lost = it.points - it.got;
      if (lost <= 0) continue;
      const wrong = it.cells.filter((c) => !c.ok);
      const blame = (wrong.length ? wrong : it.cells).filter(
        (c) => units[c.key],
      );
      if (!blame.length) continue;
      for (const c of blame) {
        const u = units[c.key];
        const row = m.get(u) ?? { lost: 0, cells: [] };
        row.lost += lost / blame.length;
        if (!c.ok)
          row.cells.push(
            c.key.includes("-") ? `第${d.no}問${c.label}` : c.label,
          );
        m.set(u, row);
      }
    }
  }
  return [...m.entries()]
    .map(([unit, v]) => ({
      unit,
      lost: Math.round(v.lost * 10) / 10,
      cells: v.cells,
    }))
    .sort((a, b) => b.lost - a.lost);
}

const planKey = (id: string) => `kakomon:v2:plan:${id}`;
function loadDone(id: string): string[] {
  try {
    const raw = window.localStorage.getItem(planKey(id));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * 逆転勉強法の作戦表。過去問（ラスボス）で落とした点を単元に分け、落とした点の多い順に、
 * 「根っこを探す（前の学年までさかのぼる）→ 図解 → 単元模試」で1つずつつぶす。全部つぶしたら、もう一度ラスボスへ。
 * つぶした単元は、この端末に残す。
 */
function GyakutenPlan({
  title,
  r,
  units,
  links,
  examId,
  onRetry,
}: {
  title: string;
  r: KakomonResult;
  units: Record<string, string>;
  links: Record<string, UnitLink>;
  examId: string;
  onRetry: () => void;
}) {
  const list = useMemo(
    () => lostByUnit(r, units).filter((x) => links[x.unit]),
    [r, units, links],
  );
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 初回だけ、この端末に残した進み具合を読む
    setDone(loadDone(examId));
  }, [examId]);
  // さかのぼりから「作戦表にもどる」で来たときは、結果を読みこんだあとに作戦表までスクロールする
  useEffect(() => {
    if (window.location.hash !== "#gyakuten") return;
    document.getElementById("gyakuten")?.scrollIntoView({ block: "start" });
  }, []);
  const toggle = (u: string) => {
    setDone((prev) => {
      const next = prev.includes(u)
        ? prev.filter((x) => x !== u)
        : [...prev, u];
      try {
        window.localStorage.setItem(planKey(examId), JSON.stringify(next));
      } catch {
        /* 保存できなくても続けられる */
      }
      if (!prev.includes(u))
        trackEvent("kakomon_unit_done", { exam: examId, unit: u });
      return next;
    });
  };
  if (list.length === 0) return null;
  const lostAll = Math.round(list.reduce((a, x) => a + x.lost, 0));
  const doneN = list.filter((x) => done.includes(x.unit)).length;
  const allWrong = list.flatMap((x) => x.cells.map(() => x.unit));
  const btn =
    "inline-flex min-h-[40px] items-center rounded-[10px] border-[1.5px] border-[#15172B] px-3 text-[13px] font-black no-underline";
  return (
    <section id="gyakuten" className={`${card} scroll-mt-4`}>
      <p className="m-0 text-[12px] font-black tracking-wider text-[#1533B8]">
        逆転勉強法
      </p>
      <h2 className="m-0 mt-0.5 text-[18px] font-black">
        ラスボスから逆算する作戦表
      </h2>
      <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
        積み上げてから最後に本番を解くのではなく、先に本番を解いて、わからなかったところだけを、わかるところまでさかのぼってつぶしていきます。落とした
        {lostAll}
        点を、問われていた単元に分けました。上の単元ほど、取りもどせる点が大きい単元です。
      </p>
      <div
        className="mt-3 flex items-center gap-2"
        aria-label={`つぶした単元 ${doneN} / ${list.length}`}
      >
        <div
          className="h-2 flex-1 overflow-hidden rounded bg-[#E9E8E0]"
          aria-hidden
        >
          <div
            className="h-full bg-[#1533B8]"
            style={{ width: `${Math.round((doneN / list.length) * 100)}%` }}
          />
        </div>
        <span className="whitespace-nowrap text-[12px] font-bold tabular-nums">
          {doneN} / {list.length} 単元
        </span>
      </div>
      <ol className="m-0 mt-3 grid list-none gap-2 p-0">
        {list.map((x, i) => {
          const l = links[x.unit];
          const ok = done.includes(x.unit);
          return (
            <li
              key={x.unit}
              className={`rounded-[12px] border p-3 ${ok ? "border-[#B9C3E8] bg-[#F1F4FD]" : "border-[#E4E2D8] bg-[#FBFAF6]"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="m-0 text-[12px] font-bold text-[#5A5D75]">
                    {i + 1}. {l.where}
                  </p>
                  <p
                    className={`m-0 text-[15px] font-black ${ok ? "text-[#5A5D75] line-through" : ""}`}
                  >
                    {l.name}
                  </p>
                </div>
                <p className="m-0 whitespace-nowrap text-right text-[12px] font-bold text-[#C0392B]">
                  −{x.lost}点
                </p>
              </div>
              {x.cells.length > 0 && (
                <p className="m-0 mt-0.5 text-[12px] text-[#3A3D55]">
                  まちがえた解答欄：{x.cells.slice(0, 12).join("・")}
                  {x.cells.length > 12 ? "…" : ""}
                </p>
              )}
              <p className="m-0 mt-2 flex flex-wrap gap-1.5">
                {l.sakanobori && (
                  <Link
                    href={sakanoboriHref(
                      x.cells.length ? x.cells.map(() => x.unit) : [x.unit],
                      x.unit,
                    )}
                    onClick={() => {
                      setKakomonReturn({
                        examId,
                        title,
                        unit: x.unit,
                        unitName: l.name,
                      });
                      trackEvent("kakomon_sakanobori", {
                        exam: examId,
                        unit: x.unit,
                      });
                    }}
                    className={`${btn} bg-[#FFE45C] text-[#15172B]`}
                  >
                    ① どこまでさかのぼるか探す
                  </Link>
                )}
                {l.lecture && (
                  <Link
                    href={l.lecture}
                    className={`${btn} bg-white text-[#15172B]`}
                  >
                    ② 図解で学びなおす
                  </Link>
                )}
                {l.moshi && (
                  <Link
                    href={l.moshi}
                    className={`${btn} bg-white text-[#15172B]`}
                  >
                    ③ 単元模試でたしかめる
                  </Link>
                )}
              </p>
              <label className="mt-2 flex cursor-pointer items-center gap-2 text-[13px] font-bold">
                <input
                  type="checkbox"
                  checked={ok}
                  onChange={() => toggle(x.unit)}
                  className="h-5 w-5 accent-[#1533B8]"
                />
                この単元はつぶした
              </label>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 rounded-[12px] bg-[#FFF6D6] p-3">
        <p className="m-0 text-[13px] font-bold leading-relaxed">
          {doneN === list.length
            ? "全部の単元をつぶしました。もう一度ラスボスに挑んで、取りもどせた点をたしかめましょう。"
            : "1つずつつぶしたら、もう一度ラスボス（この過去問）に挑みます。同じ年度の追・再試験は、別のラスボスとして使えます。"}
        </p>
        <p className="m-0 mt-2 flex flex-wrap gap-2">
          {allWrong.length > 0 &&
            list.some((x) => links[x.unit].sakanobori) && (
              <Link
                href={sakanoboriHref(allWrong)}
                onClick={() =>
                  setKakomonReturn({
                    examId,
                    title,
                    unit: "",
                    unitName: "まちがえた単元",
                  })
                }
                className={`${btn} bg-white text-[#15172B]`}
              >
                まちがえた単元をまとめてさかのぼる
              </Link>
            )}
          <button
            type="button"
            onClick={onRetry}
            className={`${btn} cursor-pointer bg-[#1533B8] text-white`}
          >
            ラスボスに再挑戦する
          </button>
        </p>
      </div>
    </section>
  );
}
