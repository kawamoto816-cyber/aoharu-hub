"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { mockScore, mockTurn } from "@/lib/oshieru/mock";
import type { MockScript } from "@/lib/oshieru/public";
import { SOS_LINE, endLine, isAbusive, needsSos, redirectLine, sosLine } from "@/lib/oshieru/safety";
import { AXES, GRADE_LABEL, GRADE_MARK } from "@/lib/oshieru/score";
import { parseSave, readRaw, recordResult, subscribeSave } from "@/lib/oshieru/storage";
import type { AxisKey, Grade, HaruFace, OshieruPublic, ScoreResult, Turn, TurnResponse, Verdict } from "@/lib/oshieru/types";
import { Haru } from "./Haru";

// オシエルの1回分。はじめ → 会話（生徒が説明・ハルが聞き返す）→ ハルの言い直しを判定 → 採点 → 結果。
// 会話本文はこの画面の state にだけ持ち、閉じたら消える。端末に残すのは単元・日付・観点の評価だけ (lib/oshieru/storage.ts)。
// mock=true のときは台本モード（AIなし・サーバーを呼ばない）。

type Phase = "intro" | "chat" | "judge" | "scoring" | "result" | "sos" | "ended" | "limit";
type Msg = Turn & { face?: HaruFace; kind?: "restatement" };

const MAX_INPUT = 300;
const btn = "flex min-h-[48px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] px-4 text-[15px] font-black no-underline active:translate-y-0.5 disabled:opacity-50";
const noop = () => () => {};

type Status = { configured: boolean; remaining: number; limit: number; per: "day" | "month"; tier: string } | null;

const TIER_LABEL: Record<string, string> = { guest: "登録なし", free: "無料登録", pro: "Pro", max: "Max" };

export function OshieruPlay({ unit, mock, mockScript }: { unit: OshieruPublic; mock: boolean; mockScript?: MockScript }) {
  const low = unit.grade === "low";
  const raw = useSyncExternalStore(subscribeSave, readRaw, () => null);
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const save = useMemo(() => parseSave(raw), [raw]);
  const masteredAt = save.mastered[unit.unit];

  const [phase, setPhase] = useState<Phase>("intro");
  const [status, setStatus] = useState<Status>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [face, setFace] = useState<HaruFace>("thinking");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [hints, setHints] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [restatementId, setRestatementId] = useState<string>();
  const [verdict, setVerdict] = useState<Verdict>();
  const [closeMode, setCloseMode] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [rejudgeUsed, setRejudgeUsed] = useState(false);
  const [endedByCap, setEndedByCap] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (mock) return;
    let alive = true;
    fetch("/api/oshieru", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => alive && setStatus(j))
      .catch(() => alive && setStatus(null));
    return () => {
      alive = false;
    };
  }, [mock]);

  useEffect(() => {
    if (phase === "chat" || phase === "judge") bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs.length, phase]);

  const notConfigured = !mock && status !== null && !status.configured;
  const noneLeft = !mock && status !== null && status.configured && status.remaining <= 0;

  function start() {
    setMsgs([{ role: "haru", text: unit.opener, face: "thinking" }]);
    setFace("thinking");
    setInput("");
    setHints(0);
    setStrikes(0);
    setRestatementId(undefined);
    setVerdict(undefined);
    setCloseMode(false);
    setResult(null);
    setRejudgeUsed(false);
    setEndedByCap(false);
    setError("");
    setPhase("chat");
    window.scrollTo({ top: 0 });
  }

  const turnsOf = (list: Msg[]): Turn[] => list.map(({ role, text }) => ({ role, text }));

  function applyHaru(list: Msg[], r: TurnResponse) {
    const next: Msg[] = [...list, { role: "haru", text: r.say, face: r.face }];
    setFace(r.face);
    if (r.state === "sos") {
      setMsgs(next);
      setPhase("sos");
      return;
    }
    if (r.state === "ended") {
      setMsgs(next);
      setEndedByCap(strikes === 0);
      setPhase("ended");
      return;
    }
    if (r.state === "offtopic") setStrikes((s) => s + 1);
    if (r.state === "understood" && r.restatement) {
      next.push({ role: "haru", text: r.restatement.text, face: "happy", kind: "restatement" });
      setRestatementId(r.restatement.id);
      setMsgs(next);
      setPhase("judge");
      return;
    }
    setMsgs(next);
  }

  async function send() {
    const text = input.trim().slice(0, MAX_INPUT);
    if (!text || busy) return;
    setError("");
    const list: Msg[] = [...msgs, { role: "student", text }];
    setInput("");
    // 安全の決まり：つらいことが書かれていたら、送らずに相談窓口を出す
    if (needsSos(text)) {
      setMsgs([...list.slice(0, -1), { role: "haru", text: sosLine(low), face: "normal" }]);
      setFace("normal");
      setPhase("sos");
      return;
    }
    if (isAbusive(text)) {
      setMsgs(list);
      if (strikes >= 1) return applyHaru(list, { say: endLine(low), face: "normal", state: "ended" });
      return applyHaru(list, { say: redirectLine(unit.topic, low), face: "normal", state: "offtopic" });
    }
    setMsgs(list);
    if (mock && mockScript) {
      setBusy(true);
      setTimeout(() => {
        applyHaru(list, mockTurn(mockScript, turnsOf(list)));
        setBusy(false);
      }, 700);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/oshieru", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "turn", unit: unit.unit, turns: turnsOf(list), strikes }),
      });
      const j = await res.json();
      if (!res.ok) {
        if (j.error === "not_configured") setStatus((s) => ({ ...(s ?? { remaining: 0, limit: 0, per: "day", tier: "guest" }), configured: false }));
        if (res.status === 429) {
          setPhase("limit");
          return;
        }
        setError(j.error === "not_configured" ? "オシエルは準備中です。" : "ハルとうまくつながりませんでした。少しまってから、もう一度送ってね。");
        setMsgs(list.slice(0, -1));
        setInput(text);
        return;
      }
      applyHaru(list, j as TurnResponse);
    } catch {
      setError("ハルとうまくつながりませんでした。もう一度送ってね。");
      setMsgs(list.slice(0, -1));
      setInput(text);
    } finally {
      setBusy(false);
    }
  }

  function applyHint(k: keyof OshieruPublic["hints"]) {
    setHints((n) => n + 1);
    setInput((v) => (v ? `${v}${v.endsWith(" ") ? "" : " "}` : "") + unit.hints[k]);
    box.current?.focus();
  }

  function addCard(c: string) {
    setInput((v) => (v ? `${v} ${c}` : c).slice(0, MAX_INPUT));
  }

  async function score(list: Msg[], v: Verdict | undefined, again: boolean) {
    setPhase("scoring");
    setError("");
    const turns = turnsOf(list);
    if (mock && mockScript) {
      setTimeout(() => {
        setResult(mockScore(mockScript, turns, v, hints));
        setPhase("result");
        window.scrollTo({ top: 0 });
      }, 900);
      return;
    }
    try {
      const prev = result ? Object.fromEntries(AXES.map((a) => [a.key, result.axes[a.key].grade])) : undefined;
      const res = await fetch("/api/oshieru", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: again ? "rejudge" : "score", unit: unit.unit, turns, restatementId, verdict: v, hintsUsed: hints, prev }),
      });
      const j = await res.json();
      if (!res.ok) {
        if (res.status === 429 && !again) {
          setPhase("limit");
          return;
        }
        setError(again ? "採点しなおしができませんでした。" : "採点できませんでした。もう一度ためしてね。");
        setPhase(again ? "result" : "judge");
        return;
      }
      const r = j as ScoreResult;
      setResult(r);
      recordResult({ unit: unit.unit, at: Date.now(), grades: Object.fromEntries(AXES.map((a) => [a.key, r.axes[a.key].grade])) as Record<AxisKey, Grade | null>, mastered: r.mastered, rejudged: again || undefined });
      setPhase("result");
      window.scrollTo({ top: 0 });
    } catch {
      setError("採点できませんでした。もう一度ためしてね。");
      setPhase(again ? "result" : "judge");
    }
  }

  function decide(v: Verdict, correction?: string) {
    setVerdict(v);
    const list: Msg[] = [...msgs];
    if (correction) list.push({ role: "student", text: correction.slice(0, MAX_INPUT) });
    const closing =
      v === "pass"
        ? low
          ? "やったあ！ おしえて くれて ありがとう！"
          : "やったあ！ 教えてくれてありがとう！"
        : low
          ? "そっか、そこが ちがったんだね。おしえて くれて ありがとう！"
          : "そっか、そこがちがったんだ。最後まで教えてくれてありがとう！";
    list.push({ role: "haru", text: closing, face: "happy" });
    setMsgs(list);
    setFace("happy");
    void score(list, v, false);
  }

  // ── 準備中・上限 ──
  if (phase === "limit")
    return (
      <Panel tone="white">
        <p className="m-0 text-[15px] font-black">{status?.per === "month" ? "今月" : "きょう"}の回数をつかいきりました</p>
        <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55]">
          オシエルは、マスター判定まで進んだ回を数えています。登録なしは1日1回、無料登録は月10回、Proは1日10回、Maxは1日20回までです。
        </p>
        <Link href={unit.lectureHref} className={`${btn} mt-3 justify-between bg-white text-[#15172B]`}>
          図解レクチャーで復習する <span aria-hidden="true">→</span>
        </Link>
      </Panel>
    );

  // ── はじめ ──
  if (phase === "intro")
    return (
      <div className="grid gap-4">
        {mock && (
          <p className="m-0 rounded-[12px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] px-3 py-2 text-[12.5px] font-bold leading-relaxed">
            台本モード：AIは使っていません。何を書いても、ハルは決まった台本どおりに答えます（画面のためし用）。
          </p>
        )}
        <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4 shadow-[4px_4px_0_#15172B]">
          <div className="flex items-center gap-3">
            <Haru face="thinking" size={56} />
            <div>
              <p className="m-0 text-[15px] font-black">AIの生徒 ハル</p>
              <p className="m-0 text-[12px] leading-snug text-[#5A5D73]">AIが演じる、まだわかっていない生徒です。あなたが先生になって教えてね。</p>
            </div>
          </div>
          <ol className="m-0 mt-3 grid list-none gap-2 p-0 text-[13.5px] leading-relaxed">
            {["ハルが「わからない」を持ってきます", "あなたの言葉で説明します（困ったら「技」のヒント）", "ハルが「わかった！」と言い直したら、合格かおしいかを判定", "4つの観点で採点。そろえばマスター"].map((t, i) => (
              <li key={t} className="flex gap-2">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-[7px] bg-[#15172B] text-[12px] font-black text-white">{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </section>

        <Notes />

        {notConfigured ? (
          <Panel tone="white">
            <p className="m-0 flex items-center gap-2 text-[15px] font-black">
              <span className="rounded-full bg-[#15172B] px-2.5 py-0.5 text-[11px] text-[#FFE45C]">準備中</span>
              ハルはまだ教室に来ていません
            </p>
            <p className="m-0 mt-1.5 text-[13px] leading-relaxed text-[#3A3D55]">いまはAIにつながっていません。台本モードなら、画面の流れだけためせます。</p>
            <Link href="?mock=1" className={`${btn} mt-3 bg-[#FFE45C] text-[#15172B] shadow-[3px_3px_0_#15172B]`}>
              台本モードでためす
            </Link>
          </Panel>
        ) : (
          <button type="button" onClick={start} disabled={noneLeft} className={`${btn} min-h-[56px] bg-[#1533B8] text-[17px] text-white shadow-[3px_3px_0_#15172B]`}>
            {masteredAt ? "もう一度ハルに教える" : "ハルに教える"}
          </button>
        )}
        {!mock && status?.configured && (
          <p className="m-0 text-center text-[12px] text-[#5A5D73]">
            {TIER_LABEL[status.tier] ?? ""}：{status.per === "day" ? "きょう" : "今月"}あと {status.remaining} 回（マスター判定まで進んだ回を数えます）
          </p>
        )}
        {noneLeft && <p className="m-0 text-center text-[13px] font-bold text-[#B42318]">{status?.per === "month" ? "今月" : "きょう"}の回数をつかいきりました。</p>}
        {hydrated && masteredAt && (
          <p className="m-0 flex items-center justify-center gap-2 text-[13px] font-bold">
            <GoldBadge small /> この単元は {new Date(masteredAt).toLocaleDateString("ja-JP")} にマスターしました
          </p>
        )}
      </div>
    );

  // ── 結果 ──
  if (phase === "result" && result) return <ResultView unit={unit} result={result} mock={mock} rejudgeUsed={rejudgeUsed} error={error} onRejudge={() => { setRejudgeUsed(true); void score(msgs, verdict, true); }} onRetry={start} />;

  // ── 会話（chat / judge / scoring / sos / ended） ──
  const restIdx = msgs.findIndex((m) => m.kind === "restatement");
  return (
    <div className="grid gap-3">
      {mock && <p className="m-0 text-center text-[11.5px] font-bold text-[#5A5D73]">台本モード（AIなし）</p>}
      <div className="flex items-center gap-2.5 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-3 py-2">
        <Haru face={face} size={44} />
        <div className="min-w-0">
          <p className="m-0 text-[13px] font-black">ハル <span className="ml-1 text-[11px] font-bold text-[#5A5D73]">AIの生徒</span></p>
          <p className="m-0 truncate text-[11.5px] text-[#5A5D73]">{busy ? (low ? "かんがえちゅう…" : "考え中…") : unit.name}</p>
        </div>
        {(phase === "chat" || phase === "judge") && (
          <button type="button" onClick={() => setPhase("intro")} className="ml-auto rounded-full border-[1.5px] border-[#15172B] bg-white px-3 py-1 text-[12px] font-bold">
            やめる
          </button>
        )}
      </div>

      <ol aria-live="polite" className="m-0 grid list-none gap-2.5 p-0">
        {msgs.map((m, i) =>
          m.role === "haru" ? (
            <li key={i} className="flex items-end gap-2">
              <Haru face={m.face ?? "normal"} size={32} badge={false} />
              <div className={`max-w-[82%] rounded-[14px_14px_14px_4px] px-3.5 py-2.5 text-[15px] font-bold leading-[1.75] ${m.kind === "restatement" ? "border-[1.5px] border-[#15172B] bg-[#FFF8D6]" : "bg-[#E6EAFB]"}`}>
                {m.kind === "restatement" && <p className="m-0 mb-1 text-[11px] font-black text-[#8A6A1F]">ハルの言い直し：合っているかな？</p>}
                {m.text}
              </div>
            </li>
          ) : (
            <li key={i} className="flex justify-end">
              <p className="m-0 max-w-[82%] whitespace-pre-wrap rounded-[14px_14px_4px_14px] border-[1.5px] border-[#15172B] bg-white px-3.5 py-2.5 text-[15px] leading-[1.75]">{m.text}</p>
            </li>
          ),
        )}
        {busy && (
          <li className="flex items-end gap-2" aria-label="ハルが考えています">
            <Haru face="thinking" size={32} badge={false} />
            <span className="rounded-[14px_14px_14px_4px] bg-[#E6EAFB] px-3.5 py-2.5 text-[15px] font-black tracking-[0.3em] text-[#1533B8]">…</span>
          </li>
        )}
      </ol>
      <div ref={bottom} />

      {error && <p className="m-0 rounded-[12px] border-l-4 border-[#B42318] bg-white px-3 py-2 text-[13px] font-bold">{error}</p>}

      {phase === "chat" && (
        <div className="grid gap-2 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-3">
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                ["tatoeru", "技：たとえる"],
                ["zu", "技：図にする"],
                ["rei", "技：例を出す"],
              ] as const
            ).map(([k, l]) => (
              <button key={k} type="button" onClick={() => applyHint(k)} className="min-h-[36px] rounded-full border-[1.5px] border-[#15172B] bg-white px-3 text-[12.5px] font-bold active:bg-[#FFE45C]">
                {l}
              </button>
            ))}
          </div>
          {unit.wordCards && (
            <div>
              <p className="m-0 mb-1 text-[11.5px] font-bold text-[#5A5D73]">ことばカード（おすと 入るよ）</p>
              <div className="flex flex-wrap gap-1.5">
                {unit.wordCards.map((c) => (
                  <button key={c} type="button" onClick={() => addCard(c)} className="min-h-[36px] rounded-[10px] border-[1.5px] border-[#1533B8] bg-[#E6EAFB] px-2.5 text-[13px] font-bold text-[#15172B]">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
          <label className="sr-only" htmlFor="oshieru-input">
            ハルへの説明
          </label>
          <textarea
            id="oshieru-input"
            ref={box}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
            rows={3}
            placeholder={low ? "ハルに おしえて あげよう" : "ハルに説明しよう（名前や学校名は書かないでね）"}
            className="w-full resize-none rounded-[12px] border-[1.5px] border-[#15172B] bg-[#F7F6F1] px-3 py-2 text-[16px] leading-relaxed outline-none focus:bg-white"
          />
          <div className="flex items-center gap-2">
            <span className="text-[11px] tabular-nums text-[#5A5D73]">
              {input.length}/{MAX_INPUT}
            </span>
            {input && (
              <button type="button" onClick={() => setInput("")} className="text-[12px] font-bold text-[#5A5D73] underline">
                けす
              </button>
            )}
            <button type="button" onClick={send} disabled={busy || !input.trim()} className={`${btn} ml-auto min-h-[44px] bg-[#1533B8] px-6 text-white shadow-[2px_2px_0_#15172B]`}>
              送る
            </button>
          </div>
        </div>
      )}

      {phase === "judge" && restIdx >= 0 && (
        <div className="grid gap-2 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3">
          <p className="m-0 text-[14px] font-black">{low ? "ハルの いいなおしは あってる？" : "ハルの言い直しは合っている？"}</p>
          {!closeMode ? (
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => decide("pass")} className={`${btn} bg-[#1533B8] text-white shadow-[2px_2px_0_#15172B]`}>
                {low ? "ごうかく" : "合格"}
              </button>
              <button type="button" onClick={() => setCloseMode(true)} className={`${btn} bg-white text-[#15172B]`}>
                おしい
              </button>
            </div>
          ) : (
            <>
              <label htmlFor="oshieru-fix" className="text-[12.5px] font-bold text-[#3A3D55]">
                {low ? "どこが ちがうか おしえて あげよう" : "どこがちがうか、正しくはどうなるかを教えてあげよう"}
              </label>
              <textarea
                id="oshieru-fix"
                ref={box}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
                rows={2}
                className="w-full resize-none rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[16px] leading-relaxed outline-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setCloseMode(false)} className={`${btn} bg-white text-[13px] text-[#3A3D55]`}>
                  もどる
                </button>
                <button
                  type="button"
                  disabled={!input.trim()}
                  onClick={() => {
                    const t = input.trim();
                    if (needsSos(t)) {
                      setPhase("sos");
                      return;
                    }
                    setInput("");
                    decide("close", t);
                  }}
                  className={`${btn} bg-[#1533B8] text-white shadow-[2px_2px_0_#15172B]`}
                >
                  おしい！と送る
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {phase === "scoring" && (
        <p role="status" className="m-0 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-3 py-3 text-center text-[14px] font-black">
          {low ? "はんていちゅう…" : "採点しています…"}
        </p>
      )}

      {phase === "sos" && <SosPanel low={low} onBack={() => setPhase("intro")} />}

      {phase === "ended" && (
        <Panel tone="white">
          <p className="m-0 text-[14px] font-black">{endedByCap ? "ハルの質問の回数がいっぱいになりました" : "この回はここまでです"}</p>
          <div className="mt-3 grid gap-2">
            {endedByCap && (
              <button type="button" onClick={() => void score(msgs, undefined, false)} className={`${btn} bg-[#1533B8] text-white shadow-[2px_2px_0_#15172B]`}>
                ここまでで判定する
              </button>
            )}
            <button type="button" onClick={start} className={`${btn} bg-white text-[#15172B]`}>
              はじめからやりなおす
            </button>
          </div>
        </Panel>
      )}
    </div>
  );
}

function Panel({ tone, children }: { tone: "white" | "yellow"; children: ReactNode }) {
  return <section className={`rounded-[18px] border-[1.5px] border-[#15172B] p-4 ${tone === "yellow" ? "bg-[#FFFBE6]" : "bg-white"}`}>{children}</section>;
}

function Notes() {
  return (
    <ul className="m-0 grid list-none gap-1 rounded-[14px] border-[1.5px] border-dashed border-[#C9C6B4] bg-white/70 p-3 text-[12px] leading-relaxed text-[#3A3D55]">
      <li>・名前や学校名、住所は書かないでね。</li>
      <li>・ハルはAIです。ハルの言うことや判定は、まちがうこともあります。</li>
      <li>・会話はサーバーに保存しません。この端末には、単元・日付・評価だけが残ります。</li>
    </ul>
  );
}

function SosPanel({ low, onBack }: { low: boolean; onBack: () => void }) {
  return (
    <section role="alert" className="rounded-[18px] border-[2px] border-[#B42318] bg-white p-4">
      <p className="m-0 text-[15px] font-black">{low ? "ひとりで かかえこまないでね" : "ひとりでかかえこまないでね"}</p>
      <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55]">おうちの人や先生など、信じられる大人に話してみよう。電話でも相談できます。</p>
      <a href={SOS_LINE.telHref} className={`${btn} mt-3 flex-col gap-0 bg-[#B42318] text-white`}>
        <span className="text-[12px] font-bold">{SOS_LINE.name}</span>
        <span className="text-[22px] tabular-nums tracking-wide">{SOS_LINE.tel}</span>
      </a>
      <p className="m-0 mt-1.5 text-center text-[11.5px] text-[#5A5D73]">{SOS_LINE.note}</p>
      <button type="button" onClick={onBack} className="mt-3 w-full text-center text-[13px] font-bold text-[#1533B8] underline">
        はじめの画面にもどる
      </button>
    </section>
  );
}

function GoldBadge({ small = false }: { small?: boolean }) {
  const s = small ? 22 : 64;
  return (
    <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill="#F5D46A" stroke="#8A6A1F" strokeWidth="3" />
      <circle cx="32" cy="32" r="21" fill="none" stroke="#8A6A1F" strokeWidth="1.6" strokeDasharray="3 3" />
      <path d="M21 33l7.5 7.5L44 25" fill="none" stroke="#15172B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ResultView({ unit, result, mock, rejudgeUsed, error, onRejudge, onRetry }: { unit: OshieruPublic; result: ScoreResult; mock: boolean; rejudgeUsed: boolean; error: string; onRejudge: () => void; onRetry: () => void }) {
  return (
    <div className="grid gap-4">
      {result.mastered ? (
        <section className="flex items-center gap-3 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFF8D6] p-4 shadow-[3px_3px_0_#8A6A1F]">
          <GoldBadge />
          <div>
            <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#8A6A1F]">マスター認定{mock ? "（見本）" : ""}</p>
            <p className="m-0 text-[20px] font-black leading-snug">「教えた」バッジ</p>
            <p className="m-0 mt-0.5 text-[12.5px] text-[#3A3D55]">{unit.name}を、ハルにわかるまで教えられました。</p>
          </div>
        </section>
      ) : (
        <section className="flex items-center gap-3 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4">
          <Haru face="normal" size={56} />
          <div>
            <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#1533B8]">もう少し{mock ? "（見本）" : ""}</p>
            <p className="m-0 text-[15px] font-black leading-snug">{result.advice}</p>
          </div>
        </section>
      )}
      {mock && <p className="m-0 text-center text-[12px] font-bold text-[#5A5D73]">台本モード：この判定は見本です（AIは使っていません）。</p>}

      <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4">
        <h2 className="m-0 text-[15px] font-black">4つの観点</h2>
        <ul className="m-0 mt-2 grid list-none gap-2.5 p-0">
          {AXES.map((a) => {
            const r = result.axes[a.key];
            return (
              <li key={a.key} className="border-t border-dashed border-[#C9C6B4] pt-2.5 first:border-t-0 first:pt-0">
                <p className="m-0 flex items-baseline gap-2">
                  <span className={`w-7 text-center text-[20px] font-black ${r.grade === "A" ? "text-[#1533B8]" : r.grade === "C" ? "text-[#B42318]" : "text-[#15172B]"}`}>{r.grade ? GRADE_MARK[r.grade] : "－"}</span>
                  <span className="text-[14px] font-black">{a.label}</span>
                  <span className="text-[12px] text-[#5A5D73]">{r.grade ? `${GRADE_LABEL[r.grade]}：${a.desc[r.grade]}` : "判定できず"}</span>
                </p>
                {r.quote && <p className="m-0 ml-9 mt-1 rounded-[8px] bg-[#F7F6F1] px-2 py-1 text-[12.5px] leading-relaxed">「{r.quote}」</p>}
                {r.reason && <p className="m-0 ml-9 mt-1 text-[12px] leading-relaxed text-[#3A3D55]">{r.reason}</p>}
              </li>
            );
          })}
          <li className="border-t border-dashed border-[#C9C6B4] pt-2.5">
            <p className="m-0 flex items-baseline gap-2">
              <span className={`w-7 text-center text-[20px] font-black ${result.judgedOk ? "text-[#1533B8]" : "text-[#B42318]"}`}>{result.judgedOk ? "◎" : "△"}</span>
              <span className="text-[14px] font-black">言い直しの判定</span>
              <span className="text-[12px] text-[#5A5D73]">{result.judgedOk ? "正しく判定できた" : "判定がちがった"}</span>
            </p>
          </li>
        </ul>
        {result.mastered && result.advice && <p className="m-0 mt-3 text-[13px] leading-relaxed text-[#3A3D55]">{result.advice}</p>}
        <p className="m-0 mt-3 text-[11.5px] leading-relaxed text-[#5A5D73]">マスターは「正確さ◎」「ほかの3観点が○以上」「言い直しを正しく判定」がそろったとき。ハルの判定は、まちがうこともあります。{result.rejudged ? "（高性能なAIで採点しなおした結果です）" : ""}</p>
        {error && <p className="m-0 mt-2 text-[12.5px] font-bold text-[#B42318]">{error}</p>}
        {!mock && !rejudgeUsed && !result.rejudged && (
          <button type="button" onClick={onRejudge} className="mt-2 text-[13px] font-bold text-[#1533B8] underline">
            判定がおかしい（1回だけ採点しなおす）
          </button>
        )}
      </section>

      <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-[#E6EAFB] p-4">
        <h2 className="m-0 text-[15px] font-black">正しい説明（図解レクチャーより）</h2>
        <ul className="m-0 mt-2 grid list-none gap-2.5 p-0">
          {unit.answers.map((a) => (
            <li key={a.wrong} className="rounded-[12px] bg-white p-3">
              <p className="m-0 text-[12px] text-[#5A5D73]">ハルの思いこみ：{a.wrong}</p>
              <p className="m-0 mt-1 text-[14px] font-bold leading-relaxed">正しくは：{a.right}</p>
              {a.why && <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">{a.why}</p>}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={onRetry} className={`${btn} bg-[#FFE45C] text-[#15172B] shadow-[3px_3px_0_#15172B]`}>
          もう一度教える
        </button>
        <Link href={unit.lectureHref} className={`${btn} bg-white text-[13.5px] text-[#15172B]`}>
          レクチャーを読む
        </Link>
      </div>
    </div>
  );
}
