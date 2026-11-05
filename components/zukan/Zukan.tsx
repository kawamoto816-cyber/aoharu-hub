"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { gradeAnswer, type ItemResult, type Response } from "@/lib/moshi/grade";
import { isFigureRef } from "@/lib/moshi/types";
import { cardId, dayNo, dueCards, dueLabel, INTERVALS, LAST_STAGE, mdLabel, recallByInterval, reviewSeed, type ZukanCard } from "@/lib/zukan/schedule";
import { recordReview, useZukan } from "@/lib/zukan/store";
import { zukanWords, type ZukanWords } from "@/lib/zukan/words";
import type { ZukanItem } from "@/lib/zukan/server";
import { emptyResponse, isBlank, ItemInput, MaterialView, Solution } from "@/components/moshi/MoshiPlay";
import { moshiWords } from "@/components/moshi/words";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import { bigBtn, card as cardCls, shuffle } from "@/components/drill/DrillPlay";

// つまずき図鑑 (/learn/zukan) の本体。記録は端末の localStorage だけ (lib/zukan/store)。
//   今日の復習: 復習日が来たカードを最大10枚。同じ型の問題を別のシードで作りなおして (/api/learn/zukan) 出し、答えたら段を進める／戻す。
//   図鑑: 教科ごとのカード (単元名・見出し・何回目のつまずきか・次の復習日・段)。卒業した枚数。
//   下に「1週間後の思い出し率」(予定の間隔ごとの正答率)。

const useToday = () => {
  const [t] = useState(() => dayNo(Date.now()));
  return t;
};

function StageDots({ c, w }: { c: ZukanCard; w: ZukanWords }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={c.grad ? w.grad : w.stage(c.stage)}>
      {INTERVALS.map((_, i) => (
        <span key={i} aria-hidden="true" className={`h-2 w-4 rounded-full border border-[#15172B] ${c.grad || i < c.stage ? "bg-[#1533B8]" : i === c.stage ? "bg-[#FFE45C]" : "bg-white"}`} />
      ))}
    </span>
  );
}

// ---------------- 復習 ----------------

type Load = { state: "loading" } | { state: "error" } | { state: "ok"; data: ZukanItem };

function ReviewOne({ c, seed, w, kids, onDone }: { c: ZukanCard; seed: number; w: ZukanWords; kids: boolean; onDone: (ok: boolean | null) => void }) {
  const [load, setLoad] = useState<Load>({ state: "loading" });
  const [r, setR] = useState<Response | null>(null);
  const [pool, setPool] = useState<number[]>([]);
  const [res, setRes] = useState<ItemResult | null>(null);
  const [self, setSelf] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const mw = moshiWords(kids);

  useEffect(() => {
    let live = true;
    const qs = new URLSearchParams({ u: c.u, d: c.d, q: c.q, s: String(seed) });
    fetch(`/api/learn/zukan?${qs}`)
      .then((x) => (x.ok ? (x.json() as Promise<ZukanItem>) : Promise.reject(new Error(String(x.status)))))
      .then((data) => {
        if (!live) return;
        const it = data.item;
        setLoad({ state: "ok", data });
        setR(emptyResponse(it));
        if (it.answer.kind === "order") {
          const idx = it.answer.tokens.map((_, i) => i);
          if (it.answer.distractor) idx.push(-1);
          let s = shuffle(idx);
          for (let k = 0; k < 5 && s.every((v, i) => v === i); k++) s = shuffle(idx);
          setPool(s);
        }
      })
      .catch(() => live && setLoad({ state: "error" }));
    return () => {
      live = false;
    };
  }, [c.u, c.d, c.q, seed]);

  const finish = (ok: boolean) => {
    const out = recordReview(cardId(c), ok);
    setMsg({ ok, text: !ok ? w.ng : out?.graduated ? w.gradNow : `${w.ok} ${w.up(INTERVALS[Math.min(out?.card.stage ?? 0, LAST_STAGE)])}` });
  };

  if (load.state === "loading") return <p className={`${cardCls} m-0 text-[14px] font-bold text-[#3A3D55]`} aria-live="polite">{w.loading}</p>;
  if (load.state === "error")
    return (
      <div className={cardCls}>
        <p className="m-0 text-[14px] font-bold">{w.loadNg}</p>
        <button type="button" onClick={() => onDone(null)} className={`${bigBtn} mt-3 bg-white text-[#15172B]`}>
          {w.skip}
        </button>
      </div>
    );

  const { item: it, daimon: dm, unit } = load.data;
  const written = it.answer.kind === "written";
  const check = () => {
    if (!r) return;
    if (written) {
      setSelf(true);
      return;
    }
    const g = gradeAnswer(it.answer, it.points, r);
    setRes(g);
    finish(g.score >= it.points);
  };
  const selfJudge = (ok: boolean) => {
    setRes({ score: ok ? it.points : 0, verdict: ok ? "ok" : "wrong" });
    finish(ok);
  };
  const needMat = !!dm.material?.length && /上の|表|資料|本文|グラフ|図|文章|次の/.test(it.prompt);

  return (
    <div className={cardCls}>
      <p className="m-0 text-[12px] font-black text-[#1533B8]">
        {unit.name}・{w.lapse(c.lapses)}
      </p>
      <p className="m-0 mt-1 text-[14px] font-black"><Rich text={dm.title} /></p>
      {needMat && (
        <>
          <p className="m-0 mt-1 text-[13px] font-bold text-[#3A3D55]"><Rich text={dm.lead} /></p>
          {dm.material?.map((m, k) => <MaterialView key={k} m={m} figNo={k + 1} />)}
        </>
      )}
      <p className="m-0 mt-3 whitespace-pre-line text-[15.5px] leading-relaxed [overflow-wrap:anywhere]"><Rich text={it.prompt} /></p>
      {it.figure && !isFigureRef(it.figure) && <LectureFigure fig={it.figure} no={0} />}
      {r && !res && !self && <ItemInput it={it} r={r} pool={pool} w={mw} label={kids ? "こたえ" : "答え"} onChange={setR} />}
      {r && !res && !self && (
        <button type="button" disabled={isBlank(r)} onClick={check} className={`${bigBtn} mt-4 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A] disabled:opacity-50`}>
          {w.check}
        </button>
      )}
      {self && !res && it.answer.kind === "written" && r?.kind === "written" && (
        <div className="mt-3">
          <p className="m-0 text-[12.5px] font-black text-[#3A3D55]">{mw.yourAnswer}</p>
          <p className="m-0 mt-1 whitespace-pre-line rounded-[10px] border-[1.5px] border-[#15172B] bg-white p-3 text-[14.5px] [overflow-wrap:anywhere]">{r.text}</p>
          <p className="m-0 mt-3 text-[12.5px] font-black text-[#1533B8]">{mw.model}</p>
          <p className="m-0 mt-1 whitespace-pre-line rounded-[10px] bg-[#FFFBE6] p-3 text-[14.5px] font-bold [overflow-wrap:anywhere]"><Rich text={it.answer.model} /></p>
          <p className="m-0 mt-3 text-[14px] font-black">{w.selfQ}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => selfJudge(true)} className={`${bigBtn} bg-[#1533B8] text-white`}>
              {w.selfOk}
            </button>
            <button type="button" onClick={() => selfJudge(false)} className={`${bigBtn} bg-white text-[#15172B]`}>
              {w.selfNg}
            </button>
          </div>
        </div>
      )}
      {res && r && (
        <>
          {msg && (
            <p role="status" className={`m-0 mt-4 rounded-[12px] px-3 py-2 text-[16px] font-black ${msg.ok ? "bg-[#E3E8FF] text-[#1533B8]" : "bg-[#FFE6E1] text-[#B42318]"}`}>
              {msg.text}
            </p>
          )}
          <Solution it={it} r={r} res={res} w={mw} figBase={0} />
          {unit.lecture && (
            <Link href={unit.lecture} className="mt-3 inline-flex min-h-[44px] items-center text-[13px] font-black text-[#1533B8]">
              {w.lecture}
            </Link>
          )}
          <button type="button" autoFocus onClick={() => onDone(msg?.ok ?? false)} className={`${bigBtn} mt-4 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
            {w.nextCard}
          </button>
        </>
      )}
    </div>
  );
}

function Review({ queue, w, onExit }: { queue: { c: ZukanCard; seed: number }[]; w: ZukanWords; onExit: () => void }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState({ ok: 0, n: 0 });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [i]);
  if (i >= queue.length)
    return (
      <div className={`${cardCls} text-center`}>
        <p className="m-0 text-[22px] font-black">{w.done}</p>
        <p className="m-0 mt-2 text-[15px] font-bold">{w.doneLine(score.ok, score.n)}</p>
        <button type="button" onClick={onExit} className={`${bigBtn} mt-4 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}>
          {w.back}
        </button>
      </div>
    );
  const { c, seed } = queue[i];
  return (
    <div>
      <p className="m-0 mb-2 flex items-center justify-between text-[13px] font-black">
        <span>
          {w.today} {i + 1}/{queue.length}
        </span>
        <button type="button" onClick={onExit} className="min-h-[44px] px-2 text-[13px] font-bold text-[#3A3D55] underline">
          {w.back}
        </button>
      </p>
      <ReviewOne
        key={`${cardId(c)}:${seed}`}
        c={c}
        seed={seed}
        w={w}
        kids={!!c.kids}
        onDone={(ok) => {
          if (ok !== null) setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), n: s.n + 1 }));
          setI((x) => x + 1);
        }}
      />
    </div>
  );
}

// ---------------- 図鑑 ----------------

export function Zukan({ moshiHome }: { moshiHome: string }) {
  const z = useZukan();
  const today = useToday();
  const cards = useMemo(() => Object.values(z.cards), [z.cards]);
  const kids = cards.length > 0 && cards.filter((c) => c.kids).length * 2 > cards.length;
  const w = zukanWords(kids);
  const due = useMemo(() => dueCards(cards, today), [cards, today]);
  const [queue, setQueue] = useState<{ c: ZukanCard; seed: number }[] | null>(null);
  const grads = cards.filter((c) => c.grad).sort((a, b) => (b.grad ?? 0) - (a.grad ?? 0));
  const bySubj = useMemo(() => {
    const m = new Map<string, ZukanCard[]>();
    const live = cards.filter((c) => !c.grad).sort((a, b) => a.due - b.due || b.lapses - a.lapses);
    for (const c of live) m.set(c.subj || "その他", [...(m.get(c.subj || "その他") ?? []), c]);
    return [...m];
  }, [cards]);
  const recall = recallByInterval(z.logs);
  const week = recall.find((x) => x.iv === 7);

  if (queue) return <Review queue={queue} w={w} onExit={() => setQueue(null)} />;

  return (
    <div>
      <p className="m-0 text-[14px] font-bold leading-relaxed text-[#3A3D55]">{w.lead}</p>

      <section aria-labelledby="zk-today" className={`${cardCls} mt-4 bg-[#FFFBE6]`}>
        <h2 id="zk-today" className="m-0 flex items-baseline justify-between gap-2 text-[18px] font-black">
          {w.today}
          <span className="text-[28px] leading-none">{w.todayN(due.length)}</span>
        </h2>
        <p className="m-0 mt-1 text-[13px] font-bold text-[#3A3D55]">{w.count(cards.length, grads.length)}</p>
        {due.length > 0 ? (
          <button type="button" onClick={() => setQueue(due.map((c) => ({ c, seed: reviewSeed(c) })))} className={`${bigBtn} mt-3 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}>
            {w.start}
          </button>
        ) : cards.length > 0 ? (
          <p className="m-0 mt-2 text-[15px] font-black text-[#1533B8]">{w.todayNone}</p>
        ) : null}
      </section>

      {cards.length === 0 && (
        <div className={`${cardCls} mt-4`}>
          <p className="m-0 text-[14px] font-bold leading-relaxed">{w.empty}</p>
          <Link href={moshiHome} className="mt-2 inline-flex min-h-[44px] items-center text-[14px] font-black text-[#1533B8]">
            {w.goMoshi}
          </Link>
        </div>
      )}

      {bySubj.map(([subj, cs]) => (
        <section key={subj} aria-label={subj} className="mt-6">
          <h2 className="m-0 text-[16px] font-black">
            {subj}
            <span className="ml-2 text-[12px] font-bold text-[#5A5D73]">{w.todayN(cs.length)}</span>
          </h2>
          <ul className="m-0 mt-2 grid list-none gap-2.5 p-0 sm:grid-cols-2">
            {cs.map((c) => {
              const ck = !!c.kids;
              const cw = zukanWords(ck);
              return (
                <li key={cardId(c)} className="min-w-0 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3 shadow-[3px_3px_0_#15172B]">
                  <p className="m-0 flex items-center justify-between gap-2 text-[12px] font-black text-[#1533B8]">
                    <span className="min-w-0 truncate">{c.name}</span>
                    <StageDots c={c} w={cw} />
                  </p>
                  <p className="m-0 mt-1 text-[14px] font-black leading-snug [overflow-wrap:anywhere]">{c.head || c.q}</p>
                  <p className="m-0 mt-1.5 flex flex-wrap justify-between gap-x-2 text-[12px] font-bold text-[#3A3D55]">
                    <span>{cw.lapse(c.lapses)}</span>
                    <span>
                      {cw.next}：<b className={c.due <= today ? "text-[#D9341F]" : ""}>{dueLabel(c.due, today, ck)}</b>（{mdLabel(c.due)}）
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {grads.length > 0 && (
        <section aria-labelledby="zk-grad" className="mt-6">
          <h2 id="zk-grad" className="m-0 text-[16px] font-black">
            {w.gradList}
            <span className="ml-2 text-[12px] font-bold text-[#5A5D73]">{w.todayN(grads.length)}</span>
          </h2>
          <ul className="m-0 mt-2 flex list-none flex-wrap gap-1.5 p-0">
            {grads.slice(0, 60).map((c) => (
              <li key={cardId(c)} className="max-w-full rounded-full border-[1.5px] border-[#1533B8] bg-[#E3E8FF] px-3 py-1 text-[12px] font-bold text-[#1533B8] [overflow-wrap:anywhere]">
                {c.name}：{c.head || c.q}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="zk-recall" className="mt-8 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-white/70 p-4">
        <h2 id="zk-recall" className="m-0 flex items-baseline justify-between gap-2 text-[15px] font-black">
          {w.recallTitle}
          <span className="text-[22px]">{week?.rate != null ? `${week.rate}%` : w.recallNone}</span>
        </h2>
        <p className="m-0 mt-1 text-[12px] leading-relaxed text-[#3A3D55]">{w.recallLead}</p>
        <table className="mt-2 w-full border-collapse text-center text-[13px]">
          <thead>
            <tr>
              {recall.map((x) => (
                <th key={x.iv} scope="col" className={`border border-[#15172B] px-1 py-1 font-black ${x.iv === 7 ? "bg-[#FFE45C]" : "bg-[#FFFBE6]"}`}>
                  {w.days(x.iv)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {recall.map((x) => (
                <td key={x.iv} className="border border-[#15172B] bg-white px-1 py-1 font-bold tabular-nums">
                  {x.rate != null ? `${x.rate}%` : "—"}
                  <span className="block text-[11px] text-[#5A5D73]">
                    {x.ok}/{x.n}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

      <p className="mb-0 mt-4 text-center text-[12px] text-[#3A3D55]">{w.privacy}</p>
    </div>
  );
}

/** 小さな入口 (あたらしいがっこう): 今日の復習 n 枚 */
export function ZukanEntry({ href }: { href: string }) {
  const z = useZukan();
  const today = useToday();
  const cards = Object.values(z.cards);
  const n = dueCards(cards, today).length;
  const live = cards.filter((c) => !c.grad).length;
  return (
    <Link href={href} className="flex items-center justify-between gap-3 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3.5 text-[#15172B] no-underline transition-shadow hover:shadow-[3px_3px_0_#15172B]">
      <span className="min-w-0">
        <b className="block text-[15px]">つまずき図鑑</b>
        <span className="text-[12px] text-[#5A5D73]">{cards.length ? `カード ${live}枚。つまずき＝伸びしろ` : "単元模試でまちがえた問題が、復習カードになってたまります"}</span>
      </span>
      <span className="shrink-0 text-right text-[13px] font-black">
        今日の復習
        <span className={`block text-[20px] leading-none ${n ? "text-[#D9341F]" : "text-[#1533B8]"}`}>{n}枚</span>
      </span>
    </Link>
  );
}
