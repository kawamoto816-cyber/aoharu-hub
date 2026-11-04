"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { BokeWithAudio, TsukkomiKind, TsukkomiMode } from "@/lib/tsukkomi/types";
import { type Answer, type Scored, TIME_LIMIT, TITLES, accuracy, isRightChoice, isWrongToken, pickRound, roundTotal, scoreAnswer, shuffle, titleOf } from "@/lib/tsukkomi/score";
import { LOG_MAX, bestKey, parseSave, readRaw, subscribeSave, updateSave, type TsukkomiSave } from "@/lib/tsukkomi/storage";
import { Sentence } from "./Sentence";
import { Stage, StageBubble } from "./Stage";
import { TsukkomiWrite } from "./TsukkomiWrite";
import { pickKakegoe } from "@/lib/tsukkomi/kakegoe";

// ツッコミ学習法の1回分（10問）。はじめ（遊び方とモード）→ プレイ → 結果。
// 1問の流れ：ボケ役がボケの文を言う → ①どこ？（語句をタップ／正しい文なら「スルー」）→ ②正しくは？（4択）→ ③なんでやねん（上級だけ・3択）
// → ツッコミ役が正しく言い直す。
// はじめの画面の「書いてツッコむ」は、自分の言葉で書いた直しをAIが判定するモード（TsukkomiWrite・点数と記録には入れない）。採点は lib/tsukkomi/score.ts、記録は lib/tsukkomi/storage.ts（この端末の localStorage）。

type Step = "where" | "what" | "why" | "done";
type Result = Scored & { id: string; tapped: number | null };

export interface TsukkomiPlayProps {
  unit: string;
  items: BokeWithAudio[];
  lectureHref: string;
  /** その単元の模試があればそのリンク */
  moshiHref?: string;
  moshiHome: string;
  homeHref: string;
}

const KIND_LABEL: Record<TsukkomiKind, string> = {
  hit: "ツッコミ成功",
  through: "見抜いてスルー",
  partial: "おしい",
  miss: "ツッコみそこね",
  overkill: "正しい文にツッコんだ",
  timeout: "時間切れ",
};

const btn = "flex min-h-[48px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] px-4 text-[15px] font-black no-underline active:translate-y-0.5";

const noop = () => () => {};

export function TsukkomiPlay(p: TsukkomiPlayProps) {
  const raw = useSyncExternalStore(subscribeSave, readRaw, () => null);
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const save = useMemo(() => parseSave(raw), [raw]);
  const byId = useMemo(() => new Map(p.items.map((b) => [b.id, b])), [p.items]);
  const review = p.items.filter((b) => save.miss[b.id]).length;

  const [phase, setPhase] = useState<"intro" | "play" | "result" | "write">("intro");
  const [mode, setMode] = useState<TsukkomiMode>("normal");
  const [order, setOrder] = useState<string[]>([]);
  const [perm, setPerm] = useState<Record<string, { opt: number[]; rsn: number[] }>>({});
  const [qi, setQi] = useState(0);
  const [step, setStep] = useState<Step>("where");
  const [tapped, setTapped] = useState<number | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [left, setLeft] = useState(1);
  const [summary, setSummary] = useState<{ total: number; prevBest: number; save: TsukkomiSave; prevTitle: string } | null>(null);
  const startedAt = useRef(0);
  const [cheer, setCheer] = useState("なんでやねん！");
  const audio = useRef<HTMLAudioElement | null>(null);
  const finishRef = useRef<(a: Answer) => void>(() => {});

  const limit = TIME_LIMIT[mode];
  const cur = byId.get(order[qi] ?? "");
  const streak = (() => {
    let n = 0;
    for (let i = results.length - 1; i >= 0 && results[i].correct; i--) n++;
    return n;
  })();
  const score = roundTotal(results);

  // srcs を順に鳴らす（掛け声 → 言い直し など）。ファイルがまだなければ（404）、その分はとばして次へ
  function speak(...srcs: string[]) {
    audio.current?.pause();
    audio.current = null;
    if (!save.voice) return;
    const playAt = (i: number) => {
      if (i >= srcs.length) return;
      try {
        const a = new Audio(srcs[i]);
        audio.current = a;
        a.onended = () => {
          if (audio.current === a) playAt(i + 1);
        };
        a.onerror = () => {
          if (audio.current === a) playAt(i + 1);
        };
        a.play().catch(() => {});
      } catch {}
    };
    playAt(0);
  }

  function beginQuestion(id: string | undefined) {
    setStep("where");
    setTapped(null);
    setChoice(null);
    setLeft(1);
    startedAt.current = Date.now();
    const b = id ? byId.get(id) : undefined;
    if (b) speak(b.audio.boke);
  }

  function start(m: TsukkomiMode) {
    const ids = pickRound(p.items, new Set(Object.keys(save.miss)));
    const pm: Record<string, { opt: number[]; rsn: number[] }> = {};
    for (const b of p.items) pm[b.id] = { opt: shuffle([0, 1, 2, 3]), rsn: shuffle([0, 1, 2]) };
    setMode(m);
    setOrder(ids);
    setPerm(pm);
    setResults([]);
    setQi(0);
    setSummary(null);
    setPhase("play");
    beginQuestion(ids[0]);
    window.scrollTo({ top: 0 });
  }

  function finish(ans: Answer) {
    if (!cur || step === "done") return;
    const elapsed = Date.now() - startedAt.current;
    const s = scoreAnswer(cur, mode, ans, elapsed, streak);
    setResults((r) => [...r, { ...s, id: cur.id, tapped: ans.type === "tsukkomi" ? ans.tapped : null }]);
    setStep("done");
    if (s.correct) {
      // うまくツッコめたら掛け声。スルーで見抜いたら「せやな！」、3問連続なら「キレッキレや！」
      const k = pickKakegoe(s.kind === "through" ? "through" : streak + 1 >= 3 ? "combo" : "nice");
      setCheer(k.text);
      speak(k.src, cur.audio.tsukkomi);
    } else speak(cur.audio.tsukkomi);
  }

  useEffect(() => {
    finishRef.current = finish;
  });

  useEffect(() => {
    if (phase !== "play" || step === "done") return;
    const t = setInterval(() => {
      const f = 1 - (Date.now() - startedAt.current) / limit;
      if (f <= 0) {
        setLeft(0);
        finishRef.current({ type: "timeout" });
      } else setLeft(f);
    }, 100);
    return () => clearInterval(t);
  }, [phase, step, qi, limit]);

  useEffect(() => () => audio.current?.pause(), []);

  function tapToken(i: number) {
    if (!cur || step !== "where") return;
    setTapped(i);
    if (!isWrongToken(cur, i)) return finish({ type: "tsukkomi", tapped: i, choice: null });
    setStep("what");
  }

  function pickChoice(c: number) {
    if (!cur || step !== "what" || tapped === null) return;
    setChoice(c);
    if (!isRightChoice(cur, c) || mode === "normal") return finish({ type: "tsukkomi", tapped, choice: c });
    setStep("why");
  }

  function pickReason(r: number) {
    if (!cur || step !== "why" || tapped === null || choice === null) return;
    finish({ type: "tsukkomi", tapped, choice, reason: r });
  }

  function next() {
    if (qi + 1 < order.length) {
      setQi(qi + 1);
      beginQuestion(order[qi + 1]);
      return;
    }
    // 1回分の終わり：記録を残す
    audio.current?.pause();
    const total = roundTotal(results);
    const key = bestKey(p.unit, mode);
    const prevBest = save.best[key] ?? 0;
    const prevTitle = titleOf(save.total).name;
    const saved = updateSave((s) => {
      const miss = { ...s.miss };
      for (const r of results) {
        if (r.correct) delete miss[r.id];
        else miss[r.id] = Date.now();
      }
      const entry = { unit: p.unit, mode, at: Date.now(), points: total, correct: results.filter((r) => r.correct).length, n: results.length };
      return { ...s, best: { ...s.best, [key]: Math.max(s.best[key] ?? 0, total) }, total: s.total + total, miss, log: [entry, ...s.log].slice(0, LOG_MAX) };
    });
    setSummary({ total, prevBest, save: saved, prevTitle });
    setPhase("result");
    window.scrollTo({ top: 0 });
  }

  // ── 書いてツッコむ（AIが判定）。点数・記録には入れない ──
  if (phase === "write")
    return (
      <TsukkomiWrite
        items={p.items}
        missed={new Set(Object.keys(save.miss))}
        onExit={() => {
          setPhase("intro");
          window.scrollTo({ top: 0 });
        }}
      />
    );

  // ── はじめ ──
  if (phase === "intro") {
    const t = titleOf(save.total);
    return (
      <div className="grid gap-4">
        <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4">
          <h2 className="m-0 text-[15px] font-black">あそびかた</h2>
          <ol className="m-0 mt-2 grid list-none gap-2 p-0 text-[14px] leading-relaxed">
            <li className="flex gap-2">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-[7px] bg-[#15172B] text-[12px] font-black text-white">1</span>
              <span>
                <b>どこ？</b>　ボケの文の、まちがっている語句をタップ
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-[7px] bg-[#15172B] text-[12px] font-black text-white">2</span>
              <span>
                <b>正しくは？</b>　正しい語句を4つから選ぶ
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-[7px] bg-[#B42318] text-[12px] font-black text-white">3</span>
              <span>
                <b>なんでやねん</b>　理由を3つから選ぶ（上級だけ）
              </span>
            </li>
          </ol>
          <p className="m-0 mt-3 border-t border-dashed border-[#C9C6B4] pt-3 text-[13px] leading-relaxed text-[#3A3D55]">
            ときどき<b>まちがいのない正しい文</b>がまざります。そのときは「スルー」が正解。正しい文にツッコむと減点です。速く・正確に・続けて正解するほど高得点。
          </p>
        </section>

        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => start("normal")} className={`${btn} min-h-[88px] flex-col gap-0.5 bg-[#1533B8] text-white shadow-[3px_3px_0_#15172B]`}>
            <span className="text-[17px]">通常モード</span>
            <span className="text-[12px] font-bold text-[#DDE3FA]">1問15秒・①②</span>
          </button>
          <button type="button" onClick={() => start("advanced")} className={`${btn} min-h-[88px] flex-col gap-0.5 bg-[#15172B] text-white shadow-[3px_3px_0_#B42318]`}>
            <span className="text-[17px]">上級モード</span>
            <span className="text-[12px] font-bold text-[#C9CEF2]">1問20秒・①②③</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            audio.current?.pause();
            setPhase("write");
            window.scrollTo({ top: 0 });
          }}
          className={`${btn} min-h-[64px] flex-col gap-0.5 bg-[#E6EAFB] text-[#15172B] shadow-[3px_3px_0_#15172B]`}
        >
          <span className="text-[16px]">
            書いてツッコむ <span className="ml-1 rounded-full bg-[#15172B] px-2 py-0.5 align-[2px] text-[11px] text-[#FFE45C]">AIが判定</span>
          </span>
          <span className="text-[12px] font-bold text-[#3A3D55]">どこがまちがいか・どう直すかを自分の言葉で書く（時間制限なし）</span>
        </button>

        <dl className="m-0 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "最高記録（通常）", v: hydrated ? (save.best[bestKey(p.unit, "normal")] ?? 0).toLocaleString("ja-JP") : "—" },
            { label: "最高記録（上級）", v: hydrated ? (save.best[bestKey(p.unit, "advanced")] ?? 0).toLocaleString("ja-JP") : "—" },
            { label: "称号", v: hydrated ? t.name : "—" },
          ].map((x) => (
            <div key={x.label} className="flex flex-col-reverse rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-1 py-2.5">
              <dt className="text-[10.5px] text-[#5A5D73]">{x.label}</dt>
              <dd className="m-0 text-[19px] font-black tabular-nums">{x.v}</dd>
            </div>
          ))}
        </dl>
        {hydrated && review > 0 && (
          <p className="m-0 rounded-[12px] border-l-4 border-[#B42318] bg-white px-3 py-2 text-[13px] font-bold">前回ツッコみそこねたボケが {review} 問。今回は先に出ます。</p>
        )}
        <VoiceToggle on={save.voice} />
      </div>
    );
  }

  // ── 結果 ──
  if (phase === "result" && summary) {
    const acc = accuracy(results);
    const t = titleOf(summary.save.total);
    const newRecord = summary.total > summary.prevBest;
    const best = Math.max(summary.prevBest, summary.total);
    const missed = results.filter((r) => !r.correct);
    const from = TITLES[t.index].from;
    const prog = t.next ? Math.min(1, (summary.save.total - from) / (summary.save.total + t.next.need - from)) : 1;
    return (
      <div className="grid gap-4">
        <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-[#1533B8] p-4 text-white shadow-[3px_3px_0_#15172B]">
          <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#FFE45C]">{mode === "advanced" ? "上級モード" : "通常モード"}　結果</p>
          <p className="m-0 mt-1 flex items-baseline gap-1.5">
            <span className="text-[44px] font-black leading-none tabular-nums">{summary.total.toLocaleString("ja-JP")}</span>
            <span className="text-[14px] font-black">ツッコミポイント</span>
          </p>
          {newRecord && <p className="m-0 mt-2 inline-block rounded-full bg-[#FFE45C] px-3 py-0.5 text-[13px] font-black text-[#15172B]">自己ベスト更新！</p>}
          <dl className="m-0 mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="flex flex-col-reverse rounded-[12px] bg-white/10 py-2">
              <dt className="text-[11px] text-[#DDE3FA]">正解率</dt>
              <dd className="m-0 text-[22px] font-black tabular-nums">{acc}%</dd>
            </div>
            <div className="flex flex-col-reverse rounded-[12px] bg-white/10 py-2">
              <dt className="text-[11px] text-[#DDE3FA]">最高記録</dt>
              <dd className="m-0 text-[22px] font-black tabular-nums">{best.toLocaleString("ja-JP")}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4">
          <p className="m-0 text-[12px] font-bold text-[#5A5D73]">称号</p>
          <p className="m-0 mt-0.5 text-[24px] font-black">
            {t.name}
            {t.name !== summary.prevTitle && <span className="ml-2 align-middle text-[13px] text-[#B42318]">昇格！</span>}
          </p>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full border border-[#15172B] bg-[#F7F6F1]">
            <div className="h-full bg-[#FFE45C]" style={{ width: `${Math.round(prog * 100)}%` }} />
          </div>
          <p className="m-0 mt-1.5 text-[12.5px] text-[#3A3D55]">
            ためたポイント {summary.save.total.toLocaleString("ja-JP")}
            {t.next ? `　「${t.next.name}」まであと ${t.next.need.toLocaleString("ja-JP")}` : "　最高の称号です"}
          </p>
          <p className="m-0 mt-1 text-[11.5px] text-[#5A5D73]">見習い → 若手 → 中堅 → 師匠。くらべるのは自分の記録だけ。</p>
        </section>

        <section aria-labelledby="tsk-missed">
          <h2 id="tsk-missed" className="m-0 text-[17px] font-black">
            {missed.length ? `ツッコみそこねたボケ（${missed.length}問）` : "全問ツッコミ成功！"}
          </h2>
          {missed.length > 0 && <p className="m-0 mt-1 text-[12.5px] text-[#3A3D55]">次の回で先に出ます。</p>}
          <ul className="m-0 mt-2 grid list-none gap-2.5 p-0">
            {missed.map((r) => {
              const b = byId.get(r.id)!;
              return (
                <li key={r.id} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
                  <p className="m-0 text-[11px] font-black text-[#B42318]">{KIND_LABEL[r.kind]}</p>
                  <p className="m-0 mt-1 text-[14px] leading-relaxed">
                    <span className="text-[#5A5D73]">ボケ：</span>
                    <Sentence b={b} mark="wrong" />
                  </p>
                  <p className="m-0 mt-1 text-[14px] font-bold leading-relaxed">
                    <span className="font-normal text-[#5A5D73]">正しくは：</span>
                    <Sentence b={b} mark="right" />
                  </p>
                  <p className="m-0 mt-1.5 text-[12.5px] leading-relaxed text-[#3A3D55]">{b.explain.why}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => start(mode)} className={`${btn} bg-[#FFE45C] text-[#15172B] shadow-[3px_3px_0_#15172B]`}>
            もう一度
          </button>
          <button type="button" onClick={() => start(mode === "normal" ? "advanced" : "normal")} className={`${btn} bg-white text-[#15172B]`}>
            {mode === "normal" ? "上級で挑戦" : "通常で遊ぶ"}
          </button>
        </div>

        <section className="grid gap-2 rounded-[18px] border-[1.5px] border-dashed border-[#15172B] bg-white p-4">
          <h2 className="m-0 text-[15px] font-black">この単元をもっと</h2>
          <Link href={p.lectureHref} className={`${btn} justify-between bg-white text-[#15172B]`}>
            図解レクチャーで読みなおす <span aria-hidden="true">→</span>
          </Link>
          {p.moshiHref ? (
            <Link href={p.moshiHref} className={`${btn} justify-between bg-white text-[#15172B]`}>
              定期テスト形式（模試）で解く <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link href={p.moshiHome} className={`${btn} justify-between bg-white text-[13.5px] text-[#3A3D55]`}>
              この単元の模試は準備中（模試の一覧へ） <span aria-hidden="true">→</span>
            </Link>
          )}
          <p className="m-0 text-[11.5px] leading-relaxed text-[#5A5D73]">今後、単元ごとのツッコミ率が一定をこえると、その単元の模試が開く予定です。</p>
          <Link href={p.homeHref} className="mt-1 text-center text-[13px] font-bold text-[#1533B8]">
            ほかの単元をえらぶ
          </Link>
        </section>
      </div>
    );
  }

  // ── プレイ中 ──
  if (!cur) return null;
  const pm = perm[cur.id] ?? { opt: [0, 1, 2, 3], rsn: [0, 1, 2] };
  const last = step === "done" ? results[results.length - 1] : undefined;
  const suru = cur.wrongIndex === null;
  const urgent = left < 0.3;
  return (
    <div className="grid gap-3">
      <style>{`@keyframes tsk-pop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}`}</style>
      <div className="flex items-center justify-between gap-2 text-[13px] font-black">
        <span>
          第{qi + 1}問<span className="text-[#5A5D73]"> / {order.length}</span>
          {cur.level === 2 && <span className="ml-1.5 rounded-full bg-[#15172B] px-1.5 py-0.5 text-[10.5px] text-white">発展 ×1.5</span>}
        </span>
        <span className="flex items-center gap-2">
          {streak >= 2 && <span className="rounded-full bg-[#B42318] px-2 py-0.5 text-[11px] text-white">{streak}連続</span>}
          <span className="tabular-nums">{score.toLocaleString("ja-JP")} pt</span>
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="残り時間"
        aria-valuemin={0}
        aria-valuemax={Math.round(limit / 1000)}
        aria-valuenow={Math.ceil((left * limit) / 1000)}
        className="h-3 overflow-hidden rounded-full border-[1.5px] border-[#15172B] bg-white"
      >
        <div className={`h-full ${urgent ? "bg-[#B42318]" : "bg-[#FFE45C]"}`} style={{ width: `${Math.max(0, left) * 100}%` }} />
      </div>

      <Stage active={step === "done" ? "tsukkomi" : "boke"}>
        <StageBubble side="left" who="ボケ">
          <p className="m-0 text-[16px] font-bold leading-[2]">
            {cur.tokens.map((t, i) => {
              const isTapped = tapped === i;
              const isWrong = cur.wrongIndex === i;
              if (step === "where")
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => tapToken(i)}
                    className="mx-[1px] my-[2px] inline rounded-[8px] border-[1.5px] border-[#9A9CB0] bg-white px-1 py-0.5 text-left text-[16px] font-bold leading-[1.6] text-[#15172B] [box-decoration-break:clone] hover:border-[#15172B] hover:bg-[#FFFBE6] active:bg-[#FFE45C]"
                  >
                    {t}
                  </button>
                );
              const cls =
                step === "done" && isWrong
                  ? "bg-[#FDE2DF] text-[#B42318] line-through decoration-2"
                  : isTapped
                    ? step === "done" && !isWrong
                      ? "bg-[#F7F6F1] underline decoration-[#B42318] decoration-wavy"
                      : "bg-[#FFE45C]"
                    : "";
              return (
                <span key={i} className={`rounded-[4px] px-[1px] ${cls}`}>
                  {t}
                </span>
              );
            })}
          </p>
        </StageBubble>

        {step === "done" && last && (
          <StageBubble side="right" who="ツッコミ">
            {last.correct && (
              <p className="m-0 mb-1 inline-block origin-left rounded-full bg-[#B42318] px-2.5 py-0.5 text-[14px] font-black text-white motion-safe:animate-[tsk-pop_.35s_ease-out]">
                {suru ? `${cheer} 見抜いてスルーで正解` : cheer}
              </p>
            )}
            {!last.correct && <p className="m-0 mb-1 text-[13px] font-black text-[#B42318]">{KIND_LABEL[last.kind]}</p>}
            <p className="m-0 text-[15px] font-bold leading-relaxed">
              {suru ? "これは正しい文。" : "正しくは、"}
              <Sentence b={cur} mark="right" />
            </p>
            <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">{cur.explain.why}</p>
          </StageBubble>
        )}
      </Stage>

      {step === "where" && (
        <>
          <p className="m-0 text-[14px] font-black">
            <span className="mr-1 rounded-[6px] bg-[#15172B] px-1.5 py-0.5 text-[12px] text-white">①</span>
            どこがボケ？ まちがっている語句をタップ
          </p>
          <button type="button" onClick={() => finish({ type: "through" })} className={`${btn} border-dashed bg-white text-[#15172B]`}>
            スルー（この文は正しい）
          </button>
        </>
      )}

      {step === "what" && cur.options && (
        <>
          <p className="m-0 text-[14px] font-black">
            <span className="mr-1 rounded-[6px] bg-[#15172B] px-1.5 py-0.5 text-[12px] text-white">②</span>
            正しくは？
          </p>
          <div className="grid grid-cols-2 gap-2">
            {pm.opt.map((k) => (
              <button key={k} type="button" onClick={() => pickChoice(k)} className={`${btn} min-h-[56px] bg-white px-2 text-[14px] leading-snug text-[#15172B] shadow-[2px_2px_0_#15172B]`}>
                {cur.options!.choices[k]}
              </button>
            ))}
          </div>
        </>
      )}

      {step === "why" && cur.reasons && (
        <>
          <p className="m-0 text-[14px] font-black">
            <span className="mr-1 rounded-[6px] bg-[#B42318] px-1.5 py-0.5 text-[12px] text-white">③</span>
            なんでやねん？ 理由を選ぶ
          </p>
          <div className="grid gap-2">
            {pm.rsn.map((k) => (
              <button key={k} type="button" onClick={() => pickReason(k)} className={`${btn} justify-start bg-white px-3 py-2 text-left text-[13.5px] font-bold leading-snug text-[#15172B] shadow-[2px_2px_0_#15172B]`}>
                {cur.reasons!.choices[k]}
              </button>
            ))}
          </div>
        </>
      )}

      {step === "done" && last && (
        <>
          <p className={`m-0 text-center text-[15px] font-black ${last.points < 0 ? "text-[#B42318]" : ""}`}>
            {last.points >= 0 ? "+" : ""}
            {last.points} pt
            {last.correct && (
              <span className="ml-1.5 text-[12px] font-bold text-[#5A5D73]">
                （正確 {last.breakdown.base}・速さ {last.breakdown.speed}
                {last.breakdown.reason > 0 && `・理由 ${last.breakdown.reason}`}
                {last.breakdown.streak > 0 && `・連続 ${last.breakdown.streak}`}）
              </span>
            )}
          </p>
          <button type="button" onClick={next} className={`${btn} bg-[#15172B] text-white shadow-[3px_3px_0_#B42318]`}>
            {qi + 1 < order.length ? "次のボケへ" : "結果を見る"}
          </button>
        </>
      )}
    </div>
  );
}

function VoiceToggle({ on }: { on: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => updateSave((s) => ({ ...s, voice: !s.voice }))}
      className="flex min-h-[44px] items-center justify-between rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 text-[13.5px] font-bold text-[#15172B]"
    >
      <span>声で聞く（ボケ役・ツッコミ役）</span>
      <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-black ${on ? "bg-[#1533B8] text-white" : "bg-[#E4E2D8] text-[#3A3D55]"}`}>{on ? "ON" : "OFF"}</span>
    </button>
  );
}
