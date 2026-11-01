"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { DrillQ } from "@/lib/drill/types";
import { recordDrill, useDrill } from "@/lib/drill/progress";
import { trackEvent } from "@/lib/analytics";
import { recordMistake, recordRight, type MistakeMeta } from "@/lib/learn/mistakes";

export const NOTE_HREF = "/learn/note";

// ②鍛える: 20問から10問を選び、選択肢もシャッフルして4択。9問正解で合格。

export const DRILL_COUNT = 10;
export const DRILL_PASS = 9;

export function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const card = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]";
export const bigBtn = "flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] text-[17px] font-black";

/** 画面の言葉。kids = 小1・小2の単元 (ひらがな多め) */
export function words(kids: boolean, n: number) {
  return kids
    ? {
        title: `4つから えらぶ もんだい ${DRILL_COUNT}もん。${DRILL_PASS}もん あたれば ごうかく`,
        lead: `もんだいは ${n}もんの なかから まいかい えらばれるよ。こたえる たびに せつめいが でるよ。`,
        start: "はじめる",
        count: (i: number) => `${i}もんめ / ${DRILL_COUNT}`,
        okCount: (k: number) => `せいかい ${k}`,
        right: "せいかい！",
        wrong: (a: string) => `ざんねん（こたえ：${a}）`,
        next: "つぎへ",
        result: "けっかを みる",
        pass: "ごうかく！",
        fail: "もう いっかい！",
        score: ["10もん ちゅう", "もん せいかい"],
        failNote: `ごうかくは ${DRILL_PASS}もん いじょう。うえの ポイントを よみなおしてから、もう いちど。もんだいは まいかい かわるよ。`,
        missTitle: "まちがえた もんだい",
        answer: "こたえ：",
        retry: "もう いちど ちょうせん する",
        reread: "ポイントを よみなおす",
        nextUnit: (name: string) => `つぎの たんげん「${name}」へ →`,
        best: "ベスト",
        cleared: "・ごうかく ずみ",
        markOk: "（せいかい）",
        markNg: "（えらんだ こたえ・まちがい）",
        noteIn: (k: number) => `まちがいノートに ${k}もん はいったよ`,
        noteGo: "ノートで ときなおす →",
      }
    : {
        title: `4択${DRILL_COUNT}問・${DRILL_PASS}問正解で合格`,
        lead: `問題は${n}問から毎回えらばれ、選択肢の順番も入れかわります。答えるたびに解説が出ます。`,
        start: "はじめる",
        count: (i: number) => `${i} / ${DRILL_COUNT}`,
        okCount: (k: number) => `正解 ${k}`,
        right: "正解！",
        wrong: (a: string) => `ざんねん（答え：${a}）`,
        next: "次へ",
        result: "結果を見る",
        pass: "合格！",
        fail: "もう一回！",
        score: [`${DRILL_COUNT}問中`, "問正解"],
        failNote: `合格は${DRILL_PASS}問以上。上のポイントを読みなおしてから、もう一度。問題は毎回入れかわります。`,
        missTitle: "まちがえた問題",
        answer: "答え：",
        retry: "もう一度挑戦する",
        reread: "ポイントを読みなおす",
        nextUnit: (name: string) => `次の単元「${name}」へ →`,
        best: "ベスト",
        cleared: "・合格ずみ",
        markOk: "（正解）",
        markNg: "（選んだ答え・まちがい）",
        noteIn: (k: number) => `まちがいノートに ${k}問入りました`,
        noteGo: "ノートで解き直す →",
      };
}

export type Words = ReturnType<typeof words>;
type Next = { href: string; name: string };

export function Blank({ q, fill, state }: { q: string; fill?: string; state?: "ok" | "ng" }) {
  const parts = q.split("___");
  if (parts.length < 2) return <>{q}</>;
  return (
    <>
      {parts[0]}
      <span className={`mx-0.5 inline-block min-w-[72px] border-b-2 px-1 text-center font-bold ${state === "ok" ? "border-[#1533B8] text-[#1533B8]" : state === "ng" ? "border-[#D9341F] text-[#D9341F]" : "border-[#15172B]"}`}>{fill ?? " "}</span>
      {parts.slice(1).join("___")}
    </>
  );
}

function Game({ unit, qs, onRestart, w, next, meta }: { unit: string; qs: DrillQ[]; onRestart: () => void; w: Words; next?: Next; meta: MistakeMeta }) {
  const set = useMemo(() => shuffle(qs).slice(0, DRILL_COUNT).map((q) => ({ q, order: shuffle([0, 1, 2, 3]) })), [qs]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [ok, setOk] = useState(0);
  const [miss, setMiss] = useState<DrillQ[]>([]);
  const cur = set[i];
  const top = useRef<HTMLDivElement>(null);

  // 「はじめる」・「次へ」を押したら、問題 (と結果) が画面の上に来るようにする
  useEffect(() => {
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [i]);

  if (!cur) {
    const passed = ok >= DRILL_PASS;
    return (
      <div ref={top} className={`${card} scroll-mt-3`}>
        <p className={`m-0 text-[24px] font-black ${passed ? "text-[#1533B8]" : ""}`}>{passed ? w.pass : w.fail}</p>
        <p className="m-0 mt-2 text-[16px] font-bold">
          {w.score[0]} <span className="text-[30px] font-black">{ok}</span> {w.score[1]}
        </p>
        {!passed && <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">{w.failNote}</p>}
        <div className="mt-4 grid gap-2.5">
          {passed && next && (
            <Link href={next.href} className={`${bigBtn} bg-[#1533B8] px-3 text-center text-white no-underline shadow-[0_4px_0_#0B1F7A]`}>
              {w.nextUnit(next.name)}
            </Link>
          )}
          {!passed && (
            <a href="#points" className="flex min-h-[48px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white text-[15px] font-bold text-[#15172B] no-underline">
              {w.reread}
            </a>
          )}
        </div>
        {miss.length > 0 && (
          <Link
            href={NOTE_HREF}
            className="mt-4 flex min-h-[48px] flex-wrap items-center justify-between gap-x-2 gap-y-0.5 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-4 py-2.5 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]"
          >
            <span className="text-[14px] font-black">{w.noteIn(miss.length)}</span>
            <span className="text-[14px] font-black text-[#1533B8]">{w.noteGo}</span>
          </Link>
        )}
        {miss.length > 0 && (
          <div className="mt-4 grid gap-2">
            <p className="m-0 text-[13px] font-black text-[#D9341F]">{w.missTitle}</p>
            {miss.map((q) => (
              <div key={q.q} className="whitespace-pre-line rounded-lg bg-[#F7F6F1] p-3 text-[14px] leading-relaxed">
                <p className="m-0">
                  <Blank q={q.q} fill={q.c[q.a]} state="ok" />
                </p>
                {!q.q.includes("___") && (
                  <p className="m-0 mt-1 text-[13.5px] font-black text-[#1533B8]">
                    {w.answer}
                    {q.c[q.a]}
                  </p>
                )}
                <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">{q.ex}</p>
              </div>
            ))}
          </div>
        )}
        <button type="button" onClick={onRestart} className={`${bigBtn} mt-5 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
          {w.retry}
        </button>
      </div>
    );
  }

  const answered = picked !== null;
  const right = answered && picked === cur.q.a;
  return (
    <div ref={top} className="scroll-mt-3">
      <div className="mb-3 flex items-center justify-between text-[13px] font-bold text-[#3A3D55]">
        <span>{w.count(i + 1)}</span>
        <span>{w.okCount(ok)}</span>
      </div>
      <div className={card}>
        <p className={`m-0 whitespace-pre-line leading-relaxed ${cur.q.q.length > 80 ? "text-[16px] font-medium" : "text-[18px] font-bold"}`}>
          <Blank q={cur.q.q} fill={answered ? cur.q.c[cur.q.a] : undefined} state={answered ? (right ? "ok" : "ng") : undefined} />
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {cur.order.map((k) => {
            const st = answered ? (k === cur.q.a ? "right" : k === picked ? "wrong" : "") : "";
            return (
              <button
                key={k}
                type="button"
                disabled={answered}
                onClick={() => {
                  setPicked(k);
                  if (k === cur.q.a) {
                    setOk((n) => n + 1);
                    recordRight(meta.unitId, cur.q.q);
                  } else {
                    setMiss((m) => [...m, cur.q]);
                    recordMistake(meta, { q: cur.q.q, choices: cur.q.c, answer: cur.q.a, ex: cur.q.ex }, k);
                  }
                }}
                className={`flex min-h-[52px] items-center rounded-[12px] border-[1.5px] px-3 py-2 text-left text-[16px] font-bold leading-snug text-[#15172B] ${st === "right" ? "border-[#1533B8] bg-[#E3E8FF]" : st === "wrong" ? "border-[#D9341F] bg-[#FFE6E1]" : "border-[#15172B] bg-white"}`}
              >
                {st === "right" && (
                  <span aria-hidden="true" className="mr-2 shrink-0 text-[18px] font-black text-[#1533B8]">
                    ○
                  </span>
                )}
                {st === "wrong" && (
                  <span aria-hidden="true" className="mr-2 shrink-0 text-[18px] font-black text-[#D9341F]">
                    ✕
                  </span>
                )}
                <span>{cur.q.c[k]}</span>
                {st && <span className="sr-only">{st === "right" ? w.markOk : w.markNg}</span>}
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className={answered ? `m-0 mt-3 text-[15px] font-black ${right ? "text-[#1533B8]" : "text-[#D9341F]"}` : "sr-only"}>
          {answered ? (right ? w.right : w.wrong(cur.q.c[cur.q.a])) : ""}
        </p>
        {answered && (
          <>
            <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">{cur.q.ex}</p>
            <button
              type="button"
              autoFocus
              onClick={() => {
                if (i + 1 >= DRILL_COUNT) {
                  recordDrill(unit, ok, ok >= DRILL_PASS);
                  trackEvent("drill_finish", { unit, ok, passed: ok >= DRILL_PASS });
                }
                setPicked(null);
                setI((n) => n + 1);
              }}
              className={`${bigBtn} mt-3 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}
            >
              {i + 1 < DRILL_COUNT ? w.next : w.result}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function DrillPlay({ unit, qs, kids = false, next, note }: { unit: string; qs: DrillQ[]; kids?: boolean; next?: Next; note?: Omit<MistakeMeta, "unitId" | "kids"> }) {
  const [round, setRound] = useState(-1);
  const meta: MistakeMeta = { unitId: unit, kids, unitName: note?.unitName ?? unit, href: note?.href ?? "", subject: note?.subject ?? "" };
  const rec = useDrill()[unit];
  const w = words(kids, qs.length);
  if (round < 0)
    return (
      <div className={card}>
        <p className="m-0 text-[18px] font-black">{w.title}</p>
        <p className="m-0 mt-1 text-[14px] text-[#3A3D55]">{w.lead}</p>
        {rec && (
          <p className="m-0 mt-2 text-[13.5px] font-bold text-[#1533B8]">
            {w.best} {rec.best}/{DRILL_COUNT}
            {rec.cleared ? w.cleared : ""}
          </p>
        )}
        <button type="button" onClick={() => setRound(0)} className={`${bigBtn} mt-4 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}>
          {w.start}
        </button>
      </div>
    );
  return <Game key={round} unit={unit} qs={qs} w={w} next={next} meta={meta} onRestart={() => setRound((r) => r + 1)} />;
}
