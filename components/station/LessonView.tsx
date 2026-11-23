"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LESSONS, SLOTS } from "@/lib/station/demo";
import { LOG_MIN_VOTES, RATING_AXES, RATING_SCALE, lessonPoint, score30, teacherCards } from "@/lib/station/rating";
import { TIP_CAP, addCoins, sendTip, update, useStation } from "@/lib/station/store";
import type { Lesson, Rating } from "@/lib/station/types";
import { Coin, Stars } from "./StationNav";

export function LessonView({ lesson: l }: { lesson: Lesson }) {
  const s = useStation();
  const c = useMemo(() => {
    const extra = Object.fromEntries(Object.entries(s.ratings).map(([k, v]) => [k, [v]]));
    return teacherCards(LESSONS, extra, s.tips).find((x) => x.nick === l.teacher)!;
  }, [s.ratings, s.tips, l.teacher]);
  const attended = s.attended.includes(l.id);
  const mine = s.ratings[l.id];
  const rs = [...l.ratings, ...(mine ? [mine] : [])];
  const slot = SLOTS.find((x) => x.lessonId === l.id);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <article className="rounded-[14px] border-[2px] border-[#15172B] bg-white p-5">
        <p className="m-0 text-[12px] font-bold text-[#5A5D73]">
          {l.subject}・{l.unitName}・{Number(l.at.slice(5, 7))}月{Number(l.at.slice(8, 10))}日の授業・見本のデータ
        </p>
        <h1 className="m-0 mt-1 text-[24px] font-black leading-snug">{l.title}</h1>
        <p className="m-0 mt-1 text-[14px]">先生役：<b>{l.teacher}</b>（{l.grade}）</p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat label="AI点検" value={`${l.aiScore}点`} />
          <Stat label="確かめの正答" value={`${Math.round(l.checkRate * 100)}%`} />
          <Stat label="わからせ点" value={`${lessonPoint(l)}`} />
        </div>
        <p className="m-0 mt-1 text-[11.5px] text-[#5A5D73]">わからせ点＝AI点検と、受講者が確かめの1問を解けた割合を半分ずつ。先生役の「わかった星」は、この点の平均で決まります。</p>

        <h2 className="m-0 mt-5 text-[16px] font-black">この授業の評価（受けた人の声）</h2>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          {RATING_AXES.map((a) => (
            <Stat key={a.key} label={a.label} value={`${score30(rs.map((r) => r[a.key]))}`} sub="30点満点" />
          ))}
        </div>
        <p className="m-0 mt-1 text-[11.5px] text-[#5A5D73]">評価できるのは、授業を受けた人だけ。票は {rs.length} 件。</p>

        {attended ? (
          <RateForm lessonId={l.id} initial={mine} />
        ) : (
          <p className="m-0 mt-3 rounded-[8px] bg-[#F7F6F1] px-3 py-2 text-[13px]">
            授業を受けると、評価と感謝のコインを送れます。{slot ? <Link href="/station/board" className="font-black text-[#1533B8]">掲示板で次の回を予約する →</Link> : null}
          </p>
        )}
      </article>

      <aside className="grid content-start gap-3">
        <section className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
          <p className="m-0 text-[12px] font-bold text-[#5A5D73]">先生役（見本・架空のニックネーム）</p>
          <p className="m-0 text-[20px] font-black">{c.nick}</p>
          <p className="m-0 mt-1"><Stars n={c.stars} size={20} /></p>
          <p className="m-0 mt-1 text-[13px] leading-relaxed">
            受けた人の声 {c.votes >= LOG_MIN_VOTES ? <b>{c.total}</b> : "（票が集まり中）"}・授業 {c.lessons.length}回・受けとったコイン {c.coins}
          </p>
          <Link href="/station/ranking" className="mt-1 inline-block text-[12.5px] font-black text-[#1533B8]">格付けを見る →</Link>
        </section>
        <TipBox lesson={l} attended={attended} />
        {!attended && slot && s.booked.includes(slot.id) && (
          <button
            type="button"
            onClick={() => {
              update((v) => ({ ...v, attended: [...v.attended, l.id] }));
              addCoins(3, `${l.teacher}さんの授業を受けた`);
            }}
            className="rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[13px] font-black"
          >
            受講したことにする（試作・＋3コイン）
          </button>
        )}
      </aside>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-[10px] bg-[#F7F6F1] px-2 py-2">
      <p className="m-0 text-[11.5px] font-bold text-[#5A5D73]">{label}</p>
      <p className="m-0 text-[22px] font-black leading-tight">{value}</p>
      {sub && <p className="m-0 text-[10.5px] text-[#8A8C9C]">{sub}</p>}
    </div>
  );
}

function RateForm({ lessonId, initial }: { lessonId: string; initial?: Rating }) {
  const [r, setR] = useState<Rating>(initial ?? { clear: 2, care: 2, again: 2 });
  const [saved, setSaved] = useState(!!initial);
  return (
    <form
      className="mt-3 rounded-[12px] border-[1.5px] border-[#1533B8] bg-[#F4F6FE] p-3"
      onSubmit={(e) => {
        e.preventDefault();
        const first = !initial && !saved;
        update((v) => ({ ...v, ratings: { ...v.ratings, [lessonId]: r } }));
        if (first) addCoins(2, "授業を評価した");
        setSaved(true);
      }}
    >
      <p className="m-0 text-[14px] font-black">あなたの評価</p>
      {RATING_AXES.map((a) => (
        <fieldset key={a.key} className="m-0 mt-2 border-0 p-0">
          <legend className="text-[12.5px] font-bold">{a.label}</legend>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {RATING_SCALE.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-pressed={r[a.key] === i}
                onClick={() => {
                  setR({ ...r, [a.key]: i });
                  setSaved(false);
                }}
                className={`rounded-full border-[1.5px] px-2.5 py-1 text-[12.5px] font-black ${r[a.key] === i ? "border-[#1533B8] bg-[#1533B8] text-white" : "border-[#15172B] bg-white"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
      <button type="submit" className="mt-3 rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 py-1.5 text-[13px] font-black">
        {saved ? "評価しました（変えるときはもう一度）" : "評価を送る"}
      </button>
    </form>
  );
}

function TipBox({ lesson, attended }: { lesson: Lesson; attended: boolean }) {
  const s = useStation();
  const [msg, setMsg] = useState<string | null>(null);
  const sent = s.tips[lesson.id] ?? 0;
  return (
    <section className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
      <p className="m-0 text-[15px] font-black"><Coin /> 感謝のコインを送る</p>
      <p className="m-0 mt-1 text-[12px] leading-relaxed text-[#5A5D73]">
        受講した人だけが送れます。1つの授業に{TIP_CAP}枚まで（仲間うちで回し合わないように）。コインは換金できません。
      </p>
      <div className="mt-2 flex gap-1.5">
        {[1, 3, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={!attended}
            onClick={() => setMsg(sendTip(lesson.id, lesson.teacher, n) ?? `${lesson.teacher}さんに ${n}枚 送りました`)}
            className="rounded-[9px] border-[1.5px] border-[#15172B] bg-white px-3 py-1.5 text-[13px] font-black disabled:opacity-40"
          >
            {n}枚
          </button>
        ))}
      </div>
      <p className="m-0 mt-1 text-[12px]">この授業に送った枚数：{sent}/{TIP_CAP}</p>
      {msg && <p className="m-0 mt-1 text-[12.5px] font-bold text-[#1533B8]">{msg}</p>}
    </section>
  );
}
