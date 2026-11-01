"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Blank, bigBtn, card, shuffle, words } from "./DrillPlay";
import { GRADUATE_STREAK, isTextMistake, mistakeId, recordMistake, recordMistakeText, recordRight, useNote, type Mistake } from "@/lib/learn/mistakes";

// まちがいノートの画面 (一覧と解き直し)。kids = 小1・小2の単元の問題 (ひらがな多め。ドリルと同じ出し分け)。

const REPLAY_MAX = 20;

function noteWords(kids: boolean) {
  return kids
    ? {
        title: "まちがいノート",
        lead: `ドリルや もしで まちがえた もんだいが ここに たまるよ。${GRADUATE_STREAK}かい つづけて あたったら そつぎょう！`,
        count: (n: number) => `${n}もん`,
        graduated: (n: number) => `そつぎょう した もんだい ${n}もん`,
        replayAll: "まとめて ときなおす",
        replayUnit: "この たんげんだけ ときなおす",
        lecture: "この たんげんの ずかい レクチャー",
        unit: "たんげんへ",
        picked: "えらんだ こたえ：",
        wrongs: (n: number) => `まちがえた かいすう ${n}`,
        left: (n: number) => `あと ${n}かい あたれば そつぎょう`,
        emptyTitle: "ノートは まだ からっぽ",
        emptyLead: "ドリルで まちがえた もんだいは、ここに じどうで はいるよ。まちがいは のびる チャンス！",
        emptyGo: "きょうかの ちずへ →",
        gradNow: "そつぎょう！ ノートから はずれたよ",
        stay: "ノートに のこるよ",
        back: "ノートに もどる",
        again: "のこりを もう いちど",
        result: (ok: number, n: number) => `${n}もん ちゅう ${ok}もん せいかい`,
        resultGrad: (n: number) => `そつぎょう ${n}もん`,
        allGrad: "ぜんぶ そつぎょう！ よく がんばったね",
        mine: "じぶんの こたえ：",
        reveal: "こたえを みる",
        selfQ: "じぶんで といて、こたえと くらべよう",
        selfOk: "できた",
        selfNg: "まだ",
        selfOkMsg: "できたね！",
        selfNgMsg: "ざんねん",
      }
    : {
        title: "まちがいノート",
        lead: `ドリルやテスト模試でまちがえた問題が、自動でここにたまります。${GRADUATE_STREAK}回続けて正解したら卒業。記録はこの端末に保存されます。`,
        count: (n: number) => `${n}問`,
        graduated: (n: number) => `卒業した問題 ${n}問`,
        replayAll: "まとめて解き直す",
        replayUnit: "この単元だけ解き直す",
        lecture: "この単元の図解レクチャー",
        unit: "単元へ",
        picked: "選んだ答え：",
        wrongs: (n: number) => `まちがえた回数 ${n}`,
        left: (n: number) => `あと${n}回正解で卒業`,
        emptyTitle: "ノートはまだ空っぽです",
        emptyLead: "ドリルでまちがえた問題は、ここに自動で入ります。まちがいは伸びしろ。気軽に挑戦してみましょう。",
        emptyGo: "教科の地図へ →",
        gradNow: "卒業！ノートから外れました",
        stay: "ノートに残ります",
        back: "ノートにもどる",
        again: "残りをもう一度",
        result: (ok: number, n: number) => `${n}問中 ${ok}問正解`,
        resultGrad: (n: number) => `卒業 ${n}問`,
        allGrad: "全部卒業！よくがんばりました",
        mine: "自分の答え：",
        reveal: "答えを見る",
        selfQ: "ノートなどに解いてから、答えとくらべて自分で判定します。",
        selfOk: "できた",
        selfNg: "まだ",
        selfOkMsg: "正解！",
        selfNgMsg: "もう一歩",
      };
}

type Group = { subject: string; units: { unitId: string; unitName: string; href: string; items: Mistake[] }[] };

function groupItems(items: Mistake[]): Group[] {
  const bySubject = new Map<string, Map<string, Mistake[]>>();
  for (const m of [...items].sort((a, b) => b.at - a.at)) {
    const subj = m.subject || "そのほか";
    const units = bySubject.get(subj) ?? new Map<string, Mistake[]>();
    units.set(m.unitId, [...(units.get(m.unitId) ?? []), m]);
    bySubject.set(subj, units);
  }
  return [...bySubject.entries()].map(([subject, units]) => ({
    subject,
    units: [...units.entries()].map(([unitId, its]) => ({ unitId, unitName: its[0].unitName, href: its[0].href, items: its })),
  }));
}

const noop = () => () => {};
const smallBase = "inline-flex min-h-[44px] items-center rounded-[10px] border-[1.5px] border-[#15172B] px-3 text-[13px] font-black no-underline";
const smallLink = `${smallBase} bg-white text-[#15172B] hover:bg-[#FFFBE6]`;

export function MistakeNote({ lectures }: { lectures: Record<string, string> }) {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const note = useNote();
  const [play, setPlay] = useState<{ ids: string[]; round: number } | null>(null);
  const items = Object.values(note.items);
  const kids = items.length > 0 && items.every((m) => m.kids);
  const t = noteWords(kids);
  const gradCount = Object.keys(note.graduated).length;

  if (play) {
    const qs = play.ids.map((id) => note.items[id]).filter((m): m is Mistake => !!m);
    return (
      <Replay
        key={play.round}
        items={qs}
        onBack={() => setPlay(null)}
        onAgain={(ids) => setPlay((p) => ({ ids, round: (p?.round ?? 0) + 1 }))}
      />
    );
  }

  const start = (list: Mistake[]) =>
    setPlay((p) => ({ ids: shuffle(list).slice(0, REPLAY_MAX).map((m) => mistakeId(m.unitId, m.q)), round: (p?.round ?? 0) + 1 }));

  return (
    <div>
      <h1 className="m-0 text-[24px] font-black">{t.title}</h1>
      <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">{t.lead}</p>
      <p aria-live="polite" className="m-0 mt-3 flex flex-wrap items-baseline gap-x-3 text-[14px] font-bold">
        {hydrated && (
          <>
            <span>
              <span className="text-[28px] font-black text-[#D9341F]">{items.length}</span>
              {kids ? " もん" : " 問"}
            </span>
            {gradCount > 0 && <span className="text-[13px] text-[#1533B8]">{t.graduated(gradCount)}</span>}
          </>
        )}
      </p>

      {hydrated && items.length === 0 && (
        <div className={`${card} mt-4`}>
          <p className="m-0 text-[18px] font-black">{t.emptyTitle}</p>
          <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">{t.emptyLead}</p>
          <Link href="/learn/school" className={`${bigBtn} mt-4 bg-[#1533B8] text-white no-underline shadow-[0_4px_0_#0B1F7A]`}>
            {t.emptyGo}
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <>
          <button type="button" onClick={() => start(items)} className={`${bigBtn} mt-4 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
            {t.replayAll}
            {items.length > REPLAY_MAX ? `（${REPLAY_MAX}${kids ? "もん" : "問"}）` : ""}
          </button>
          {groupItems(items).map((g) => (
            <section key={g.subject} className="mt-7">
              <h2 className="m-0 text-[18px] font-black">{g.subject}</h2>
              <div className="mt-2 grid gap-4">
                {g.units.map((u) => {
                  const w = noteWords(!!u.items[0].kids);
                  const dw = words(!!u.items[0].kids, 0);
                  return (
                    <div key={u.unitId} className={card}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                        <h3 className="m-0 min-w-0 text-[16px] font-black">{u.unitName}</h3>
                        <span className="text-[13px] font-black text-[#D9341F]">{w.count(u.items.length)}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {lectures[u.unitId] && (
                          <Link href={lectures[u.unitId]} className={`${smallBase} bg-[#1533B8] text-white hover:bg-[#0B1F7A]`}>
                            {w.lecture}
                          </Link>
                        )}
                        {u.href && (
                          <Link href={u.href} className={smallLink}>
                            {w.unit}
                          </Link>
                        )}
                        <button type="button" onClick={() => start(u.items)} className={`${smallBase} bg-[#FFE45C] text-[#15172B]`}>
                          {w.replayUnit}
                        </button>
                      </div>
                      <ul className="m-0 mt-3 grid list-none gap-2 p-0">
                        {u.items.map((m) => (
                          <li key={m.q} className="whitespace-pre-line rounded-lg bg-[#F7F6F1] p-3 text-[14px] leading-relaxed [overflow-wrap:anywhere]">
                            {isTextMistake(m) ? (
                              <>
                                <p className="m-0">{m.q}</p>
                                <p className="m-0 mt-1 text-[13.5px] font-black text-[#1533B8]">
                                  {dw.answer}
                                  {m.model}
                                </p>
                                <p className="m-0 mt-1 text-[13px] font-bold text-[#D9341F]">
                                  {w.mine}
                                  {m.mine || "—"}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="m-0">
                                  <Blank q={m.q} fill={m.choices[m.answer]} state="ok" />
                                </p>
                                {!m.q.includes("___") && (
                                  <p className="m-0 mt-1 text-[13.5px] font-black text-[#1533B8]">
                                    {dw.answer}
                                    {m.choices[m.answer]}
                                  </p>
                                )}
                                <p className="m-0 mt-1 text-[13px] font-bold text-[#D9341F]">
                                  {w.picked}
                                  {m.choices[m.picked]}
                                </p>
                              </>
                            )}
                            <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">{m.ex}</p>
                            <p className="m-0 mt-1.5 flex flex-wrap gap-x-3 text-[12px] font-bold text-[#5A5D73]">
                              <span>{w.wrongs(m.wrongCount)}</span>
                              <span className="text-[#1533B8]">{w.left(GRADUATE_STREAK - m.rightStreak)}</span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}

function Replay({ items, onBack, onAgain }: { items: Mistake[]; onBack: () => void; onAgain: (ids: string[]) => void }) {
  // 始めた時点の問題で固定する (卒業してノートから消えても、この回は最後まで解ける)
  const [set] = useState(() => items.map((m) => ({ m, order: shuffle(m.choices.map((_, k) => k)) })));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [ok, setOk] = useState(0);
  const [msg, setMsg] = useState("");
  const [grad, setGrad] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const cur = set[i];
  const kidsAll = set.length > 0 && set.every((x) => x.m.kids);

  useEffect(() => {
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [i]);

  if (!cur) {
    const t = noteWords(kidsAll);
    const left = set.map((x) => mistakeId(x.m.unitId, x.m.q)).filter((id) => !grad.includes(id));
    return (
      <div ref={top} className={`${card} scroll-mt-3`} role="status" aria-live="polite">
        <p className="m-0 text-[22px] font-black text-[#1533B8]">{left.length === 0 ? t.allGrad : t.result(ok, set.length)}</p>
        {left.length > 0 && <p className="m-0 mt-1 text-[15px] font-bold">{t.resultGrad(grad.length)}</p>}
        <div className="mt-4 grid gap-2.5">
          {left.length > 0 && (
            <button type="button" onClick={() => onAgain(left)} className={`${bigBtn} bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
              {t.again}
            </button>
          )}
          <button type="button" onClick={onBack} className={`${bigBtn} bg-white text-[#15172B] shadow-[0_3px_0_#15172B]`}>
            {t.back}
          </button>
        </div>
      </div>
    );
  }

  const w = words(!!cur.m.kids, 0);
  const t = noteWords(!!cur.m.kids);
  const answered = picked !== null;
  const right = answered && picked === cur.m.answer;
  const last = i + 1 >= set.length;
  const goNext = () => {
    setPicked(null);
    setRevealed(false);
    setMsg("");
    setI((n) => n + 1);
  };
  if (isTextMistake(cur.m)) {
    // 選択式でない問題 (模試の数値・記述など): 自分で解いて、答えを見て自己判定
    const judged = picked !== null;
    const selfRight = picked === 1;
    const judgeSelf = (ok: boolean) => {
      setPicked(ok ? 1 : 0);
      if (ok) {
        setOk((n) => n + 1);
        const r = recordRight(cur.m.unitId, cur.m.q);
        if (r === "graduated") {
          setGrad((g) => [...g, mistakeId(cur.m.unitId, cur.m.q)]);
          setMsg(t.gradNow);
        } else setMsg(r ? t.left(r.left) : "");
      } else {
        recordMistakeText(cur.m, { q: cur.m.q, model: cur.m.model ?? "", ex: cur.m.ex, source: cur.m.source }, cur.m.mine ?? "");
        setMsg(t.stay);
      }
    };
    return (
      <div ref={top} className="scroll-mt-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-2 text-[13px] font-bold text-[#3A3D55]">
          <span>
            {i + 1} / {set.length}
          </span>
          <span className="min-w-0 truncate">{cur.m.unitName}</span>
          <span>{w.okCount(ok)}</span>
        </div>
        <div className={card}>
          <p className={`m-0 whitespace-pre-line leading-relaxed [overflow-wrap:anywhere] ${cur.m.q.length > 80 ? "text-[16px] font-medium" : "text-[18px] font-bold"}`}>{cur.m.q}</p>
          <p className="m-0 mt-2 text-[13px] text-[#3A3D55]">{t.selfQ}</p>
          {!revealed ? (
            <button type="button" onClick={() => setRevealed(true)} className={`${bigBtn} mt-4 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}>
              {t.reveal}
            </button>
          ) : (
            <>
              <div className="mt-4 whitespace-pre-line rounded-[12px] bg-[#FFFBE6] p-3 text-[15px] font-bold leading-relaxed [overflow-wrap:anywhere]">
                {w.answer}
                {cur.m.model}
              </div>
              <p className="m-0 mt-2 whitespace-pre-line text-[14px] leading-relaxed text-[#3A3D55]">{cur.m.ex}</p>
              {!judged && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => judgeSelf(true)} className={`${bigBtn} bg-[#E3E8FF] text-[#1533B8]`}>
                    ○ {t.selfOk}
                  </button>
                  <button type="button" onClick={() => judgeSelf(false)} className={`${bigBtn} bg-[#FFE6E1] text-[#D9341F]`}>
                    ✕ {t.selfNg}
                  </button>
                </div>
              )}
            </>
          )}
          <p role="status" aria-live="polite" className={judged ? `m-0 mt-3 text-[15px] font-black ${selfRight ? "text-[#1533B8]" : "text-[#D9341F]"}` : "sr-only"}>
            {judged ? `${selfRight ? t.selfOkMsg : t.selfNgMsg}${msg ? `　${msg}` : ""}` : ""}
          </p>
          {judged && (
            <button type="button" autoFocus onClick={goNext} className={`${bigBtn} mt-3 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
              {last ? w.result : w.next}
            </button>
          )}
        </div>
        <button type="button" onClick={onBack} className="mt-3 min-h-[44px] w-full text-center text-[14px] font-bold text-[#3A3D55] underline">
          {t.back}
        </button>
      </div>
    );
  }
  return (
    <div ref={top} className="scroll-mt-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-2 text-[13px] font-bold text-[#3A3D55]">
        <span>
          {i + 1} / {set.length}
        </span>
        <span className="min-w-0 truncate">{cur.m.unitName}</span>
        <span>{w.okCount(ok)}</span>
      </div>
      <div className={card}>
        <p className={`m-0 whitespace-pre-line leading-relaxed [overflow-wrap:anywhere] ${cur.m.q.length > 80 ? "text-[16px] font-medium" : "text-[18px] font-bold"}`}>
          <Blank q={cur.m.q} fill={answered ? cur.m.choices[cur.m.answer] : undefined} state={answered ? (right ? "ok" : "ng") : undefined} />
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {cur.order.map((k) => {
            const st = answered ? (k === cur.m.answer ? "right" : k === picked ? "wrong" : "") : "";
            return (
              <button
                key={k}
                type="button"
                disabled={answered}
                onClick={() => {
                  setPicked(k);
                  if (k === cur.m.answer) {
                    setOk((n) => n + 1);
                    const r = recordRight(cur.m.unitId, cur.m.q);
                    if (r === "graduated") {
                      setGrad((g) => [...g, mistakeId(cur.m.unitId, cur.m.q)]);
                      setMsg(t.gradNow);
                    } else setMsg(r ? t.left(r.left) : "");
                  } else {
                    recordMistake(cur.m, cur.m, k);
                    setMsg(t.stay);
                  }
                }}
                className={`flex min-h-[52px] items-center rounded-[12px] border-[1.5px] px-3 py-2 text-left text-[16px] font-bold leading-snug text-[#15172B] [overflow-wrap:anywhere] ${st === "right" ? "border-[#1533B8] bg-[#E3E8FF]" : st === "wrong" ? "border-[#D9341F] bg-[#FFE6E1]" : "border-[#15172B] bg-white"}`}
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
                <span>{cur.m.choices[k]}</span>
                {st && <span className="sr-only">{st === "right" ? w.markOk : w.markNg}</span>}
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className={answered ? `m-0 mt-3 text-[15px] font-black ${right ? "text-[#1533B8]" : "text-[#D9341F]"}` : "sr-only"}>
          {answered ? `${right ? w.right : w.wrong(cur.m.choices[cur.m.answer])}${msg ? `　${msg}` : ""}` : ""}
        </p>
        {answered && (
          <>
            <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">{cur.m.ex}</p>
            <button
              type="button"
              autoFocus
              onClick={() => {
                setPicked(null);
                setMsg("");
                setI((n) => n + 1);
              }}
              className={`${bigBtn} mt-3 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}
            >
              {last ? w.result : w.next}
            </button>
          </>
        )}
      </div>
      <button type="button" onClick={onBack} className="mt-3 min-h-[44px] w-full text-center text-[14px] font-bold text-[#3A3D55] underline">
        {t.back}
      </button>
    </div>
  );
}
