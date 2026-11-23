"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { answerNos, gradeKakomon } from "@/lib/kakomon/grade";
import type { KakomonExam, KakomonResult, Marks } from "@/lib/kakomon/types";

// 過去問チャレンジの本体。問題は載せない。手元の過去問を見て、解答番号ごとにマーク → 公式の配点で採点。
// 途中の状態 (マーク・始めた時刻) は、この端末に残す (読みこみ直しても続きから)。提出すると結果だけを残す。

type Saved = {
  startedAt?: number;
  marks: Marks;
  doneAt?: number;
  usedSec?: number;
};

const key = (id: string) => `kakomon:${id}`;
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

export function Challenge({
  exam,
  moshiHref,
  sourceLinkOk,
}: {
  exam: KakomonExam;
  moshiHref: string;
  sourceLinkOk: boolean;
}) {
  const groups = useMemo(() => answerNos(exam), [exam]);
  const cellCount = useMemo(
    () => groups.reduce((a, g) => a + g.nos.length, 0),
    [groups],
  );
  const [phase, setPhase] = useState<"ready" | "run" | "done">("ready");
  const [marks, setMarks] = useState<Marks>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [usedSec, setUsedSec] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const submitted = useRef(false);

  // 前回の続き
  useEffect(() => {
    const s = load(exam.id);
    if (!s) return;
    /* eslint-disable react-hooks/set-state-in-effect -- 初回だけ、この端末に残した続きから復元する */
    setMarks(s.marks ?? {});
    if (s.doneAt) {
      setUsedSec(s.usedSec ?? 0);
      setPhase("done");
    } else if (s.startedAt) {
      setStartedAt(s.startedAt);
      setNow(Date.now());
      setPhase("run");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [exam.id]);

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
      window.scrollTo(0, 0);
    },
    [exam, limit, marks, startedAt],
  );

  // 時計。時間になったら自動で提出
  useEffect(() => {
    if (phase !== "run") return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (phase === "run" && startedAt && left === 0) submit(true);
  }, [phase, startedAt, left, submit]);

  const start = () => {
    const t = Date.now();
    submitted.current = false;
    setMarks({});
    setStartedAt(t);
    setNow(t);
    setPhase("run");
    save(exam.id, { startedAt: t, marks: {} });
    trackEvent("kakomon_start", { exam: exam.id });
    window.scrollTo(0, 0);
  };
  const mark = (no: number, v: number) => {
    setMarks((m) => {
      const next = { ...m, [no]: m[no] === v ? undefined : v };
      if (startedAt) save(exam.id, { startedAt, marks: next });
      return next;
    });
  };
  const reset = () => {
    save(exam.id, null);
    submitted.current = false;
    setMarks({});
    setStartedAt(null);
    setPhase("ready");
    window.scrollTo(0, 0);
  };

  const source = (
    <p className="m-0 mt-3 break-all text-[12px] leading-relaxed text-[#5A5D75]">
      正解と配点の出典：
      {sourceLinkOk ? (
        <a
          href={exam.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1533B8]"
        >
          大学入試センターウェブサイト
        </a>
      ) : (
        "大学入試センターウェブサイト"
      )}
      （{exam.source}）をもとにアオハルOSが作成（{exam.checked}{" "}
      に確認）。問題文はこのページに載せていません。
    </p>
  );

  if (phase === "ready") {
    return (
      <div className="grid gap-4">
        <section className={card}>
          <h2 className="m-0 text-[17px] font-black">はじめ方</h2>
          <ol className="m-0 mt-3 grid list-none gap-3 p-0">
            {[
              {
                t: "問題を用意する",
                b: sourceLinkOk
                  ? `${exam.year} ${exam.kind}「${exam.subject}」の問題を、大学入試センターのサイトで開きます（別のタブで開きます）。市販の過去問集でもかまいません。`
                  : `${exam.year} ${exam.kind}「${exam.subject}」の問題を手元に用意します。大学入試センターのサイトの「過去3年分の試験問題」で公開されています。市販の過去問集でもかまいません。印刷するか、別の端末で開くと解きやすくなります。`,
              },
              {
                t: "時間を計って解く",
                b: `制限時間は${exam.minutes}分。「始める」を押すと時計が動き、時間になると自動で提出します。`,
              },
              {
                t: "答えをマークして採点",
                b: "解答番号の横の数字を押してマークします。提出すると、公式の配点で採点し、大問ごとの得点が出ます。",
              },
            ].map((x, i) => (
              <li key={x.t} className="flex gap-3">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#1533B8] text-[13px] font-black text-white">
                  {i + 1}
                </span>
                <span>
                  <b className="block text-[15px]">{x.t}</b>
                  <span className="text-[13px] leading-relaxed text-[#3A3D55]">
                    {x.b}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          {sourceLinkOk && (
            <p className="m-0 mt-3">
              <a
                href="https://www.dnc.ac.jp/kyotsu/kakomondai/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${bigBtn} bg-white text-[#15172B] no-underline`}
              >
                問題を開く（大学入試センターのサイト）
              </a>
            </p>
          )}
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
            解説は出ません（正誤と正解の番号まで）。見直しのあとに、同じ形のアオハルの類題（解説つき）へ進めます。
          </p>
        </section>
        {source}
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
        <section className={card}>
          <p className="m-0 text-[13px] leading-relaxed text-[#3A3D55]">
            解答番号の横の数字を押してマークします。もう一度押すと消えます。
          </p>
          {groups.map((g) => (
            <fieldset
              key={g.daimon}
              className="m-0 mt-4 border-0 border-t border-[#E4E2D8] p-0 pt-3"
            >
              <legend className="float-left mb-1 w-full p-0 text-[13px] font-black text-[#3A3D55]">
                第{g.daimon}問（{g.points}点）
              </legend>
              {g.nos.map((no) => (
                <div
                  key={no}
                  className="clear-both flex items-center gap-1.5 py-1"
                  role="radiogroup"
                  aria-label={`解答番号 ${no}`}
                >
                  <span className="w-7 flex-none text-right text-[15px] font-black tabular-nums">
                    {no}
                  </span>
                  <span className="flex flex-wrap gap-[3px] sm:gap-1">
                    {Array.from({ length: exam.max }, (_, i) => i + 1).map(
                      (v) => {
                        const on = marks[no] === v;
                        return (
                          <button
                            key={v}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            aria-label={`${v}`}
                            onClick={() => mark(no, v)}
                            className={`h-[34px] w-[27px] cursor-pointer rounded-full border-[1.5px] p-0 text-[13px] font-bold min-[400px]:w-[30px] sm:w-[34px] ${on ? "border-[#15172B] bg-[#15172B] text-white" : "border-[#8A8DA3] bg-white text-[#15172B]"}`}
                          >
                            {v}
                          </button>
                        );
                      },
                    )}
                  </span>
                </div>
              ))}
            </fieldset>
          ))}
          <div className="mt-5 border-t border-[#E4E2D8] pt-4">
            {confirm ? (
              <div className="rounded-[12px] bg-[#FFF6D6] p-3">
                <p className="m-0 text-[14px] font-bold">
                  {marked < cellCount
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
  const weak = exam.daimon
    .map((d, i) => ({ d, rate: r.daimon[i].got / d.points }))
    .filter((x) => x.rate < 0.7 && x.d.next)
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 3);
  return (
    <div className="grid gap-4">
      <section className={card}>
        <p className="m-0 text-[13px] text-[#3A3D55]">
          かかった時間 {Math.ceil(usedSec / 60)}分（制限 {exam.minutes}分）
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
                <tr key={d.no} className="border-b border-[#E4E2D8]">
                  <th
                    scope="row"
                    className="whitespace-nowrap py-2 pr-3 text-left font-bold"
                  >
                    第{d.no}問
                  </th>
                  <td className="w-full py-2">
                    <div
                      className="h-2 overflow-hidden rounded bg-[#E9E8E0]"
                      aria-hidden
                    >
                      <div
                        className={`h-full ${rate < 0.6 ? "bg-[#C0392B]" : "bg-[#1533B8]"}`}
                        style={{ width: `${Math.round(rate * 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-2 pl-3 text-right tabular-nums">
                    {d.got} / {d.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className={card}>
        <h2 className="m-0 text-[17px] font-black">解答番号ごとの正誤</h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          「自分の答え →
          正解」の順です。赤は不正解。「3・5」のように書いた正解は、順を問いません。いくつかの解答番号をまとめて採点する設問は、全部そろったときだけ点が入ります。
        </p>
        {r.daimon.map((d) => (
          <div key={d.no} className="mt-3">
            <p className="m-0 text-[13px] font-black text-[#3A3D55]">
              第{d.no}問
            </p>
            <ul className="m-0 mt-1 grid list-none grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-1.5 p-0 text-[13px]">
              {d.items.flatMap((it) =>
                it.cells.map((c) => (
                  <li
                    key={c.no}
                    className={`rounded-[8px] border px-2 py-1 tabular-nums ${c.ok ? "border-[#E4E2D8] bg-white" : "border-[#C0392B] bg-[#FDECEA]"}`}
                  >
                    <b>{c.no}</b>：{c.mine ?? "－"} → {c.correct}
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
      <section className={card}>
        <h2 className="m-0 text-[17px] font-black">次にやること</h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          {weak.length > 0
            ? "得点の低かった大問と同じ形の問題を、アオハルの共通テスト模試（オリジナルの問題・解説つき）で練習できます。"
            : "どの大問も7割をこえました。別の問題で、同じ時間配分をもう一度ためせます。"}
        </p>
        {weak.length > 0 && (
          <ul className="m-0 mt-3 grid list-none gap-2 p-0">
            {weak.map(({ d }) => (
              <li
                key={d.no}
                className="rounded-[10px] border border-[#E4E2D8] px-3 py-2"
              >
                <b className="block text-[14px]">{d.next!.label}</b>
                <span className="text-[13px] text-[#3A3D55]">
                  {d.next!.note}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="m-0 mt-3 flex flex-wrap gap-2">
          <Link
            href={moshiHref}
            className={`${bigBtn} bg-[#FFE45C] text-[#15172B] no-underline`}
          >
            共通テスト模試（{exam.subject}）を解く
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
      {source}
    </div>
  );
}
