"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { checkLessonPlan, unitHints } from "@/app/station/actions";
import { LESSONS, REQUESTS } from "@/lib/station/demo";
import { STAR_MIN_LESSONS, STAR_RULE, canTeach, lessonPoint, teacherCards } from "@/lib/station/rating";
import { addCoins, newId, update, useStation } from "@/lib/station/store";
import type { LessonPlan, PlanCheck, TeachRequest } from "@/lib/station/types";
import { VoiceLesson } from "./VoiceLesson";
import { CheckResult } from "./CheckResult";
import { Stars } from "./StationNav";

type UnitOpt = { unit: string; name: string; label: string };
const card = "rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4";
const input = "w-full rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1.5 text-[14px]";

export function Stage({ units, initialUnit, requestId }: { units: UnitOpt[]; initialUnit?: string; requestId?: string }) {
  const s = useStation();
  const cards = useMemo(() => {
    const extra = Object.fromEntries(Object.entries(s.ratings).map(([k, v]) => [k, [v]]));
    return new Map(teacherCards(LESSONS, extra, s.tips).map((c) => [c.nick, c]));
  }, [s.ratings, s.tips]);
  const lessons = [...LESSONS].sort((a, b) => b.at.localeCompare(a.at));
  const request = requestId ? [...s.myRequests, ...REQUESTS].find((r) => r.id === requestId) : undefined;
  return (
    <div className="mt-4 grid gap-6">
      <TeachForm units={units} initialUnit={initialUnit} request={request} />
      <section>
        <h2 className="m-0 text-[17px] font-black">
          これまでの授業<span className="ml-2 text-[11.5px] font-bold text-[#5A5D73]">見本のデータ（架空のニックネーム・架空の点数）</span>
        </h2>
        <div className="mb-3 mt-2 rounded-[12px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFF8D6] p-3 text-[12.5px] leading-relaxed">
          <p className="m-0 text-[13.5px] font-black">星（わかった星）の意味</p>
          <p className="m-0 mt-1">
            星は授業1回ごとではなく、<b>先生役ごと</b>につきます。授業1回の「わからせ点」＝AI点検の点（100点満点）と、受講者が確かめの1問を解けた割合（％）を半分ずつ。その平均で星が決まります。受けた人の人気は入れません。
          </p>
          <ul className="m-0 mt-1 list-none p-0">
            {STAR_RULE.map((r) => (
              <li key={r.stars}>
                <Stars n={r.stars} size={13} />　わからせ点の平均が{r.text.replace("わからせ点の平均が", "")}
              </li>
            ))}
            <li>
              <Stars n={0} size={13} />　平均が72未満、または授業がまだ{STAR_MIN_LESSONS}回に足りない（星は{STAR_MIN_LESSONS}回から）
            </li>
          </ul>
          <p className="m-0 mt-1 text-[#5A5D73]">
            受けた生徒の評価は、もう1つの物差し「受けた人の声」で別に見ます。<Link href="/station/ranking" className="font-black text-[#1533B8]">格付けの見本を見る →</Link>
          </p>
        </div>
        <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
          {s.myLessons.map((m) => (
            <li key={m.id} className="rounded-[12px] border-[1.5px] border-[#1533B8] bg-[#E6EAFB] p-3">
              <p className="m-0 text-[11.5px] font-bold text-[#1533B8]">あなたの{m.voice ? "声の" : ""}授業・{m.check.unitName}</p>
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
                    <span className="ml-auto whitespace-nowrap">先生役の星 <Stars n={c.stars} size={13} /></span>
                  </p>
                  <p className="m-0 mt-0.5 text-[15px] font-black">{l.title}</p>
                  <p className="m-0 mt-0.5 text-[12px] text-[#3A3D55]">
                    わからせ点 {lessonPoint(l)}・受講 {l.attendees}人・確かめの正答 {Math.round(l.checkRate * 100)}%
                    {c.lessons.length < STAR_MIN_LESSONS ? `・${l.teacher}さんは授業${c.lessons.length}回（星は${STAR_MIN_LESSONS}回から）` : ""}
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
type Hints = { check?: { q: string; a: string }; mistakes: { wrong: string; right: string }[] };

function TeachForm({ units, initialUnit, request }: { units: UnitOpt[]; initialUnit?: string; request?: TeachRequest }) {
  const s = useStation();
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [plan, setPlan] = useState<LessonPlan>({ ...EMPTY, unit: units.some((u) => u.unit === initialUnit) ? initialUnit! : "" });
  const [res, setRes] = useState<PlanCheck | null>(null);
  const [hints, setHints] = useState<Hints | null>(null);
  const [pending, start] = useTransition();
  const [posted, setPosted] = useState(false);
  const missing = canTeach({ member: s.member, teacher: s.teacher, shares: s.myShares.length, oshieruPassed: s.oshieruPassed.length });
  const unit = units.find((u) => u.unit === plan.unit);
  const hits = q.trim() ? units.filter((u) => u.name.includes(q.trim()) || u.label.includes(q.trim())).slice(0, 30) : [];
  useEffect(() => {
    if (plan.unit) start(async () => setHints(await unitHints(plan.unit)));
    // 最初に選ばれていた単元（「教えて」リクエストから来たとき）だけ、手がかりを読みこむ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const set = (k: keyof LessonPlan) => (e: { target: { value: string } }) => {
    setPlan({ ...plan, [k]: e.target.value });
    setRes(null);
    setPosted(false);
  };
  const ready = !!unit && plan.title.trim() && plan.explain.trim();
  const publish = (check: PlanCheck, p: LessonPlan, voice: boolean) => {
    update((v) => ({
      ...v,
      myLessons: [{ id: newId("t"), at: new Date().toISOString(), plan: p, check, voice, requestId: request?.id }, ...v.myLessons],
      taken: request && !v.taken.includes(request.id) ? [...v.taken, request.id] : v.taken,
    }));
    addCoins(20, voice ? "教壇で声の授業をした（試作）" : "教壇で授業した（試作）");
  };
  return (
    <section className={`${card} border-[2px]`}>
      <h2 className="m-0 text-[18px] font-black">授業をつくる</h2>
      <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
        授業の案を書くか、声で授業して、AIに点検してもらいます。点検は、アオハルラーンの教材の「よくあるまちがい」と照らして、まちがったことを教えないかを見ます。
      </p>
      {request && (
        <p className="m-0 mt-2 rounded-[8px] border border-[#1533B8] bg-[#F4F6FE] px-3 py-2 text-[13px] leading-relaxed">
          <b>「教えて」に応える授業</b>：{request.by}さん「{request.text}」（{request.unitName}・知りたい人 {request.metoo}人）
        </p>
      )}
      {missing.length > 0 && (
        <p className="m-0 mt-2 rounded-[8px] bg-[#FFF8D6] px-3 py-2 text-[12.5px] leading-relaxed">
          教壇に立つ（掲示板に出す）には：{missing.join("・")}。案を書いたり声で練習して点検するのは、いまでもためせます。
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
          <label className="text-[12.5px] font-bold">
            授業の題
            <input className={input} value={plan.title} maxLength={60} onChange={set("title")} placeholder="例：比例は「いっしょに何倍」" />
          </label>
        </div>
        <div className="grid content-start gap-2">
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
        </div>
      </div>

      <div role="tablist" aria-label="授業のつくり方" className="mt-4 flex gap-1.5">
        {(
          [
            ["text", "書いてつくる"],
            ["voice", "声で授業する"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={mode === k}
            onClick={() => setMode(k)}
            className={`rounded-t-[10px] border-[1.5px] border-b-0 border-[#15172B] px-4 py-2 text-[14px] font-black ${mode === k ? "bg-[#15172B] text-white" : "bg-white"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="rounded-b-[12px] rounded-tr-[12px] border-[1.5px] border-[#15172B] p-3">
        {mode === "voice" ? (
          <VoiceLesson unit={unit?.unit} title={plan.title} missing={missing} onPublish={(c) => publish(c, plan, true)} />
        ) : (
          <>
            <div className="grid gap-2 lg:grid-cols-2">
              <div className="grid content-start gap-2">
                <label className="text-[12.5px] font-bold">
                  つかみ（最初の1分。なぜ学ぶか・身近な例）
                  <textarea className={input} rows={2} value={plan.hook} maxLength={400} onChange={set("hook")} />
                </label>
                <label className="text-[12.5px] font-bold">
                  説明（順番に）
                  <textarea className={input} rows={5} value={plan.explain} maxLength={1500} onChange={set("explain")} />
                </label>
              </div>
              <div className="grid content-start gap-2">
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
              <CheckResult
                res={res}
                missing={missing}
                posted={posted}
                onPublish={() => {
                  publish(res, plan, false);
                  setPosted(true);
                }}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
