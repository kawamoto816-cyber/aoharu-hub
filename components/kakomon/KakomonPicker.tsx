"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DncLinks } from "@/components/kakomon/Challenge";

// 過去問チャレンジの「えらぶ」画面。年度・試験・科目をえらぶと、はじめ方と問題の PDF (大学入試センター) が出る。

export interface PickerExam {
  id: string;
  year: string;
  kind: string;
  subject: string;
  minutes: number;
  total: number;
  daimon: number;
  pdf: string;
  audio?: string;
  note?: string;
  /** 解答欄と単元の対応表があり、採点のあとに逆転勉強法の作戦表が出る */
  gyakuten?: boolean;
}

const card =
  "rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 sm:p-5";
const chip = (on: boolean) =>
  `inline-flex min-h-[40px] cursor-pointer items-center rounded-full border-[1.5px] px-3.5 text-[14px] font-bold ${on ? "border-[#1533B8] bg-[#E8EEFF] text-[#1533B8]" : "border-[#D6D4CA] bg-white text-[#15172B]"}`;

export function KakomonPicker({
  exams,
  years,
  kinds,
  initial,
}: {
  exams: PickerExam[];
  years: string[];
  kinds: string[];
  initial?: string;
}) {
  const first =
    exams.find((e) => e.id === initial) ??
    exams.find((e) => e.subject === "英語（リーディング）") ??
    exams[0];
  const [year, setYear] = useState(first.year);
  const [kind, setKind] = useState(first.kind);
  const [subject, setSubject] = useState(first.subject);
  const subjects = useMemo(
    () => [
      ...new Set(
        exams
          .filter((e) => e.year === year && e.kind === kind)
          .map((e) => e.subject),
      ),
    ],
    [exams, year, kind],
  );
  const cur = subjects.includes(subject) ? subject : subjects[0];
  const exam = exams.find(
    (e) => e.year === year && e.kind === kind && e.subject === cur,
  )!;
  const pick = (y: string, k: string, s: string) => {
    setYear(y);
    setKind(k);
    setSubject(s);
    const e = exams.find(
      (x) => x.year === y && x.kind === k && x.subject === s,
    );
    if (e) {
      try {
        window.history.replaceState(null, "", `?id=${e.id}`);
      } catch {
        /* そのままでよい */
      }
    }
  };

  return (
    <div className="grid gap-4">
      <section className={card}>
        <h2 className="m-0 text-[18px] font-black">
          共通テスト 過去問マークシート
        </h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          問題は大学入試センターのサイトで開き、答えだけをここに入れます。時間を計って、公式の配点で採点します。
        </p>
        <h3 className="m-0 mt-4 text-[15px] font-black">年度</h3>
        <div
          className="mt-2 flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="年度"
        >
          {years.map((y) => (
            <button
              key={y}
              type="button"
              role="radio"
              aria-checked={y === year}
              className={chip(y === year)}
              onClick={() => pick(y, kind, cur)}
            >
              {y}
            </button>
          ))}
        </div>
        <h3 className="m-0 mt-4 text-[15px] font-black">試験</h3>
        <div
          className="mt-2 flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="試験"
        >
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={k === kind}
              className={chip(k === kind)}
              onClick={() => pick(year, k, cur)}
            >
              {k}
            </button>
          ))}
        </div>
        <h3 className="m-0 mt-4 text-[15px] font-black">科目</h3>
        <div
          className="mt-2 flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="科目"
        >
          {subjects.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={s === cur}
              className={chip(s === cur)}
              onClick={() => pick(year, kind, s)}
            >
              {s.replace(/^英語（(.+)）$/, "英語$1")}
            </button>
          ))}
        </div>
        {year === "令和6年度" && (
          <p className="m-0 mt-3 text-[12px] leading-relaxed text-[#5A5D75]">
            令和6年度は旧課程の試験です。数学は解答の形が今とちがうため、入れていません。
          </p>
        )}
      </section>

      <section className={card} aria-live="polite">
        <h2 className="m-0 text-[17px] font-black">はじめ方</h2>
        <p className="m-0 mt-1 text-[13px] font-bold text-[#3A3D55]">
          {exam.year} {exam.kind}　{exam.subject}（{exam.minutes}分・
          {exam.total}点・大問{exam.daimon}題）
        </p>
        <ol className="m-0 mt-3 grid list-none gap-0 p-0">
          {[
            {
              t: "問題を開く",
              b: `大学入試センターのページが別のタブで開きます。印刷しても、タブレットで見てもかまいません。${exam.audio ? "音声も大学入試センターのページで流します（イヤホンがおすすめ）。" : ""}`,
              links: true,
            },
            {
              t: "時間を計って解く",
              b: `${exam.subject}は${exam.minutes}分。時間になると自動で提出します。${exam.note ?? ""}`,
            },
            {
              t: "答えをマークして採点",
              b: exam.gyakuten
                ? "大問ごとの得点と、落とした点を単元に分けた「逆転勉強法の作戦表」が出ます。そこから、どこまでさかのぼればわかるかを探せます。"
                : "大問ごとの得点と、次にやる類題が出ます（令和6年度は旧課程のため、作戦表は出ません）。",
            },
          ].map((x, i) => (
            <li
              key={x.t}
              className={`flex gap-3 py-3 ${i ? "border-t border-[#E4E2D8]" : ""}`}
            >
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
        <p className="m-0 mt-2">
          <Link
            href={`/learn/kakomon/${exam.id}?start=1`}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-5 text-[15px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A] sm:w-auto"
          >
            マークシートを開いて始める
          </Link>
        </p>
      </section>
    </div>
  );
}
