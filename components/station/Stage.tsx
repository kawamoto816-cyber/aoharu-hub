"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { checkLessonPlan, unitHints } from "@/app/station/actions";
import { LESSONS } from "@/lib/station/demo";
import { canTeach, lessonPoint, teacherCards } from "@/lib/station/rating";
import { addCoins, newId, update, useStation } from "@/lib/station/store";
import type { LessonPlan, PlanCheck } from "@/lib/station/types";
import { Stars } from "./StationNav";

type UnitOpt = { unit: string; name: string; label: string };
const card = "rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4";
const input = "w-full rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1.5 text-[14px]";
export const GRADE_MARK = { A: "◎", B: "○", C: "△" } as const;

export function Stage({ units }: { units: UnitOpt[] }) {
  const s = useStation();
  const cards = useMemo(() => {
    const extra = Object.fromEntries(Object.entries(s.ratings).map(([k, v]) => [k, [v]]));
    return new Map(teacherCards(LESSONS, extra, s.tips).map((c) => [c.nick, c]));
  }, [s.ratings, s.tips]);
  const lessons = [...LESSONS].sort((a, b) => b.at.localeCompare(a.at));
  return (
    <div className="mt-4 grid gap-6">
      <TeachForm units={units} />
      <section>
        <h2 className="m-0 mb-2 text-[17px] font-black">これまでの授業</h2>
        <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
          {s.myLessons.map((m) => (
            <li key={m.id} className="rounded-[12px] border-[1.5px] border-[#1533B8] bg-[#E6EAFB] p-3">
              <p className="m-0 text-[11.5px] font-bold text-[#1533B8]">あなたの授業・{m.check.unitName}</p>
              <p className="m-0 text-[15px] font-black">{m.plan.title}</p>
              <p className="m-0 text-[12px] text-[#3A3D55]">AI点検 {m.check.score}点。受講者の評価は、授業のあとに集まります。</p>
            </li>
          ))}
          {lessons.map((l) => {
            const c = cards.get(l.teacher)!;
            return (
              <li key={l.id}>
                <Link href={`/station/stage/${l.id}`} className="block h-full rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-3 text-[#15172B] no-underline hover:bg-[#F7F6F1]">
                  <p className="m-0 flex items-center gap-2 text-[11.5px] font-bold text-[#5A5D73]">
                    <span>{l.teacher}（{l.grade}）・{l.subject}・{l.unitName}</span>
                    <span className="ml-auto"><Stars n={c.stars} size={13} /></span>
                  </p>
                  <p className="m-0 mt-0.5 text-[15px] font-black">{l.title}</p>
                  <p className="m-0 mt-0.5 text-[12px] text-[#3A3D55]">
                    わからせ点 {lessonPoint(l)}・受講 {l.attendees}人・確かめの正答 {Math.round(l.checkRate * 100)}%
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

const EMPTY: LessonPlan = { unit: "", title: "", hook: "", explain: "", example: "", checkQ: "", checkA: "" };

function TeachForm({ units }: { units: UnitOpt[] }) {
  const s = useStation();
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState<LessonPlan>(EMPTY);
  const [res, setRes] = useState<PlanCheck | null>(null);
  const [hints, setHints] = useState<{ check?: { q: string; a: string }; mistakes: { wrong: string; right: string }[] } | null>(null);
  const [pending, start] = useTransition();
  const [posted, setPosted] = useState(false);
  const missing = canTeach({ member: s.member, teacher: s.teacher, shares: s.myShares.length, oshieruPassed: s.oshieruPassed.length });
  const unit = units.find((u) => u.unit === plan.unit);
  const hits = q.trim() ? units.filter((u) => u.name.includes(q.trim()) || u.label.includes(q.trim())).slice(0, 30) : [];
  const set = (k: keyof LessonPlan) => (e: { target: { value: string } }) => {
    setPlan({ ...plan, [k]: e.target.value });
    setRes(null);
    setPosted(false);
  };
  const ready = !!unit && plan.title.trim() && plan.explain.trim();
  return (
    <section className={`${card} border-[2px]`}>
      <h2 className="m-0 text-[18px] font-black">授業をつくる</h2>
      <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
        20分の授業の案を書いて、AIに点検してもらいます。点検は、アオハルラーンの教材の「よくあるまちがい」と照らして、まちがったことを教えないかを見ます。
      </p>
      {missing.length > 0 && (
        <p className="m-0 mt-2 rounded-[8px] bg-[#FFF8D6] px-3 py-2 text-[12.5px] leading-relaxed">
          教壇に立つ（掲示板に出す）には：{missing.join("・")}。案を書いて点検するのは、いまでもためせます。
        </p>
      )}

      <div className="mt-3 grid gap-2 lg:grid-cols-2">
        <div className="grid content-start gap-2">
          <label className="text-[12.5px] font-bold">
            教える単元をさがす
            <input className={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="例：比例・関係代名詞・光合成" />
          </label>
          {hits.length > 0 && (
            <ul className="m-0 max-h-[180px] list-none overflow-auto rounded-[8px] border border-[#C9C7BD] bg-white p-0">
              {hits.map((u) => (
                <li key={u.unit}>
                  <button
                    type="button"
                    onClick={() => {
                      setPlan({ ...plan, unit: u.unit });
                      setQ("");
                      setRes(null);
                      start(async () => setHints(await unitHints(u.unit)));
                    }}
                    className="block w-full px-2 py-1.5 text-left text-[13px] hover:bg-[#E6EAFB]"
                  >
                    <span className="text-[11px] text-[#5A5D73]">{u.label}</span> {u.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="m-0 text-[13px]">
            単元：<b>{unit ? `${unit.name}（${unit.label}）` : "まだ選んでいません"}</b>
          </p>
          {unit && (
            <div className="flex flex-wrap items-center gap-2 text-[12.5px]">
              <Link href={`/learn/oshieru/${unit.unit}`} target="_blank" className="font-black text-[#1533B8]">オシエルでAIに教えてみる →</Link>
              <button
                type="button"
                disabled={s.oshieruPassed.includes(unit.name)}
                onClick={() => update((v) => ({ ...v, oshieruPassed: [...v.oshieruPassed, unit.name] }))}
                className="rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1 font-black disabled:opacity-50"
              >
                {s.oshieruPassed.includes(unit.name) ? "オシエル合格ずみ" : "合格した（試作では自己申告）"}
              </button>
            </div>
          )}
          {hints && hints.mistakes.length > 0 && (
            <div className="rounded-[8px] bg-[#F7F6F1] p-2 text-[12.5px] leading-relaxed">
              <p className="m-0 font-black">この単元でよくあるまちがい（授業でとりあげよう）</p>
              <ul className="m-0 pl-4">
                {hints.mistakes.map((m) => (
                  <li key={m.wrong}>
                    ✕ {m.wrong} → ○ {m.right}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <label className="text-[12.5px] font-bold">
            授業の題
            <input className={input} value={plan.title} maxLength={60} onChange={set("title")} placeholder="例：比例は「いっしょに何倍」" />
          </label>
          <label className="text-[12.5px] font-bold">
            つかみ（最初の1分。なぜ学ぶか・身近な例）
            <textarea className={input} rows={2} value={plan.hook} maxLength={400} onChange={set("hook")} />
          </label>
        </div>
        <div className="grid content-start gap-2">
          <label className="text-[12.5px] font-bold">
            説明（順番に）
            <textarea className={input} rows={5} value={plan.explain} maxLength={1500} onChange={set("explain")} />
          </label>
          <label className="text-[12.5px] font-bold">
            たとえ・例
            <textarea className={input} rows={2} value={plan.example} maxLength={600} onChange={set("example")} />
          </label>
          <label className="text-[12.5px] font-bold">
            確かめの1問（授業の最後に、受講者に解いてもらう）
            <input className={input} value={plan.checkQ} maxLength={200} onChange={set("checkQ")} />
          </label>
          <label className="text-[12.5px] font-bold">
            その答え
            <input className={input} value={plan.checkA} maxLength={200} onChange={set("checkA")} />
          </label>
          {hints?.check && (
            <button type="button" onClick={() => setPlan({ ...plan, checkQ: hints.check!.q, checkA: hints.check!.a })} className="justify-self-start text-[12.5px] font-black text-[#1533B8]">
              教材の確かめの問いを使う
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!ready || pending}
          onClick={() => start(async () => setRes(await checkLessonPlan(plan)))}
          className="rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 py-2 text-[14px] font-black disabled:opacity-40"
        >
          {pending ? "点検しています…" : "AIに点検してもらう"}
        </button>
        {!ready && <span className="self-center text-[12px] text-[#5A5D73]">単元・題・説明を書くと点検できます</span>}
      </div>

      {res && (
        <div className="mt-3 rounded-[12px] border-[1.5px] border-[#1533B8] bg-[#F4F6FE] p-3">
          <p className="m-0 text-[15px] font-black">
            AI点検：{res.score}点 <span className="text-[12px] font-bold text-[#5A5D73]">（試作：いまは決まった基準で点検しています）</span>
          </p>
          <ul className="m-0 mt-1 grid list-none gap-1 p-0 text-[13px]">
            {res.items.map((it) => (
              <li key={it.key}>
                <b className="inline-block w-[1.4em]">{GRADE_MARK[it.grade]}</b>
                <b>{it.label}</b>：{it.note}
              </li>
            ))}
          </ul>
          {res.wrongFound.map((w) => (
            <p key={w.wrong} className="m-0 mt-1 rounded-[8px] bg-[#FDECEC] px-2 py-1 text-[12.5px]">
              ✕ 授業案の中に「{w.wrong}」に近い説明があります。正しくは「{w.right}」
            </p>
          ))}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={missing.length > 0 || res.score < 60 || res.wrongFound.length > 0 || posted}
              onClick={() => {
                update((v) => ({ ...v, myLessons: [{ id: newId("t"), at: new Date().toISOString(), plan, check: res }, ...v.myLessons] }));
                addCoins(20, "教壇で授業した（試作）");
                setPosted(true);
              }}
              className="rounded-[10px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 py-2 text-[14px] font-black text-white disabled:opacity-40"
            >
              {posted ? "掲示板に出しました" : "掲示板に出して授業する（＋20コイン）"}
            </button>
            <span className="text-[12px] text-[#5A5D73]">
              {missing.length > 0 ? "教壇に立つ条件がそろうと出せます" : res.wrongFound.length > 0 ? "まちがいを直して、もう一度点検すると出せます" : res.score < 60 ? "60点以上で出せます。直してもう一度点検しましょう" : "授業のあと、受講者の正答率と評価で星が決まります"}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
