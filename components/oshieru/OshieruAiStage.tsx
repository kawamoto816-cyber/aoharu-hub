"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import { mockScore, mockTurn } from "@/lib/oshieru/mock";
import type { MockScript } from "@/lib/oshieru/public";
import type { LessonBoard } from "@/lib/oshieru/lesson";
import { endLine, isAbusive, needsSos, redirectLine, sosLine } from "@/lib/oshieru/safety";
import { AXES } from "@/lib/oshieru/score";
import { recordResult } from "@/lib/oshieru/storage";
import type { AxisKey, Grade, HaruFace, OshieruPublic, ScoreResult, Turn, TurnResponse, Verdict } from "@/lib/oshieru/types";
import { trackEvent } from "@/lib/analytics";
import { Haru } from "./Haru";
import { ResultView, SosPanel } from "./OshieruPlay";

// オシエルAI（声で教える授業・試作）。止まる授業と同じ「黒板＋キャラ」の画面で、こんどは生徒が先生役。
//   ハル（AIの生徒）が声で「わからない」を持ってくる → 生徒は黒板の図を切りかえながら、声（または文字）で説明する
//   → ハルが聞き返す（声で）→ 納得したら「つまり…」と言い直す → 生徒が合格／おしいを判定 → 4観点で採点（オシエルと同じ API・同じ回数の数え方）。
// 声：ハルの声はブラウザの読み上げ（ja-JP）。生徒の声はブラウザの音声認識（Web Speech API）で文字にしてから送る（音声そのものは送らない）。
// どちらも使えなければ、字幕と文字入力だけで同じ流れになる。会話本文は保存しない（オシエルと同じ）。mock=true は台本モード（AIなし）。

type Phase = "intro" | "lesson" | "judge" | "correct" | "scoring" | "result" | "sos" | "ended" | "limit";
type Msg = Turn & { face?: HaruFace; kind?: "restatement" };
type Status = { configured: boolean; remaining: number; limit: number; per: "day" | "month"; tier: string } | null;

const MAX_INPUT = 300;
const MAX_REC_SECONDS = 60;
const btn = "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-[#15172B] px-4 text-[15px] font-black no-underline active:translate-y-0.5 disabled:opacity-40";

interface RecEvent {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}
interface Rec {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: RecEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type RecCtor = new () => Rec;

function recCtor(): RecCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecCtor; webkitSpeechRecognition?: RecCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function pickJaVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const vs = window.speechSynthesis.getVoices().filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith("ja"));
  return vs.find((v) => /google|kyoko|otoya|nanami|haruka/i.test(v.name)) ?? vs[0] ?? null;
}

/** 読み上げ用に、ルビ・強調の印を外す */
const speechOf = (s: string) => s.replace(/《[^》]*》/g, "").replace(/\{\{|\}\}/g, "");

export function OshieruAiStage({ unit, boards, mock, mockScript, jugyoHref }: { unit: OshieruPublic; boards: LessonBoard[]; mock: boolean; mockScript?: MockScript; jugyoHref?: string }) {
  const low = unit.grade === "low";
  const [phase, setPhase] = useState<Phase>("intro");
  const [status, setStatus] = useState<Status>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [face, setFace] = useState<HaruFace>("thinking");
  const [board, setBoard] = useState(0);
  const [draft, setDraft] = useState("");
  const [interim, setInterim] = useState("");
  const [listening, setListening] = useState(false);
  const [recSecs, setRecSecs] = useState(0);
  const [canListen, setCanListen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [hints, setHints] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [restatementId, setRestatementId] = useState<string>();
  const [verdict, setVerdict] = useState<Verdict>();
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [rejudgeUsed, setRejudgeUsed] = useState(false);
  const rec = useRef<Rec | null>(null);
  const live = useRef(false);
  const heard = useRef("");
  const startedAt = useRef(0);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const voice = useRef<SpeechSynthesisVoice | null>(null);
  const onHeard = useRef<(t: string) => void>(() => {});

  useEffect(() => {
    // 音声認識・読み上げが使えるかは、ブラウザに来てから決まる
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanListen(!!recCtor());
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const pick = () => (voice.current = pickJaVoice());
      pick();
      window.speechSynthesis.addEventListener?.("voiceschanged", pick);
      return () => {
        window.speechSynthesis.removeEventListener?.("voiceschanged", pick);
        window.speechSynthesis.cancel();
        live.current = false;
        rec.current?.abort();
      };
    }
  }, []);

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

  const notConfigured = !mock && status !== null && !status.configured;
  const noneLeft = !mock && status !== null && status.configured && status.remaining <= 0;
  const lastHaru = [...msgs].reverse().find((m) => m.role === "haru");
  const lastStudent = [...msgs].reverse().find((m) => m.role === "student");

  // ── ハルの声 ──
  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !voiceOn) return;
    const ss = window.speechSynthesis;
    ss.cancel();
    const parts = speechOf(text).match(/[^。！？!?]+[。！？!?」』）]*/g) ?? [speechOf(text)];
    let n = 0;
    const next = () => {
      if (n >= parts.length) return setSpeaking(false);
      const u = new SpeechSynthesisUtterance(parts[n++]);
      u.lang = "ja-JP";
      if (voice.current) u.voice = voice.current;
      u.rate = low ? 0.95 : 1.05;
      u.pitch = 1.3;
      u.onend = next;
      u.onerror = () => setSpeaking(false);
      ss.speak(u);
    };
    setSpeaking(true);
    next();
  }
  function hush() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  // ── 生徒の声（話しおわったら、もう一度タップで送る） ──
  function stopTimer() {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
  }
  function startListening(then: (t: string) => void) {
    const Ctor = recCtor();
    if (!Ctor) {
      setTyping(true);
      return;
    }
    hush();
    setError("");
    heard.current = "";
    setInterim("");
    onHeard.current = then;
    const r = new Ctor();
    r.lang = "ja-JP";
    r.continuous = true;
    r.interimResults = true;
    r.onresult = (e) => {
      let fin = "";
      let mid = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const x = e.results[i];
        if (x.isFinal) fin += x[0].transcript;
        else mid += x[0].transcript;
      }
      if (fin) heard.current = `${heard.current}${fin}`.slice(0, MAX_INPUT);
      setInterim(`${heard.current}${mid}`);
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture") {
        live.current = false;
        stopTimer();
        setListening(false);
        setTyping(true);
        setError(low ? "マイクが つかえません。もじで かいて おしえてね。" : "マイクが使えませんでした。文字で書いて教えてね。");
      }
    };
    r.onend = () => {
      // 黙っているとブラウザが止めるので、時間内ならつなぎ直す
      if (live.current && Date.now() - startedAt.current < MAX_REC_SECONDS * 1000) {
        try {
          r.start();
          return;
        } catch {
          /* つなぎ直せなければ終える */
        }
      }
      live.current = false;
      stopTimer();
      setListening(false);
      const t = heard.current.trim();
      setInterim("");
      if (t) onHeard.current(t);
    };
    rec.current = r;
    live.current = true;
    startedAt.current = Date.now();
    setRecSecs(0);
    setListening(true);
    try {
      r.start();
    } catch {
      live.current = false;
      setListening(false);
      setTyping(true);
      return;
    }
    tick.current = setInterval(() => {
      const s = (Date.now() - startedAt.current) / 1000;
      setRecSecs(s);
      if (s >= MAX_REC_SECONDS) stopListening();
    }, 250);
  }
  function stopListening() {
    live.current = false;
    stopTimer();
    try {
      rec.current?.stop(); // 確定した文字が届いてから onend → 送る
    } catch {
      setListening(false);
    }
  }

  // ── 会話 ──
  const turnsOf = (list: Msg[]): Turn[] => list.map(({ role, text }) => ({ role, text }));

  function start() {
    const first: Msg = { role: "haru", text: unit.opener, face: "thinking" };
    setMsgs([first]);
    setFace("thinking");
    setBoard(0);
    setDraft("");
    setHints(0);
    setStrikes(0);
    setRestatementId(undefined);
    setVerdict(undefined);
    setResult(null);
    setRejudgeUsed(false);
    setError("");
    setPhase("lesson");
    speak(unit.opener);
    trackEvent("oshieru_ai_start", { unit: unit.unit, mock: mock ? 1 : 0 });
  }

  function applyHaru(list: Msg[], r: TurnResponse) {
    const next: Msg[] = [...list, { role: "haru", text: r.say, face: r.face }];
    setFace(r.face);
    if (r.state === "sos") {
      setMsgs(next);
      hush();
      setPhase("sos");
      return;
    }
    if (r.state === "ended") {
      setMsgs(next);
      speak(r.say);
      setPhase("ended");
      return;
    }
    if (r.state === "offtopic") setStrikes((s) => s + 1);
    if (r.state === "understood" && r.restatement) {
      next.push({ role: "haru", text: r.restatement.text, face: "happy", kind: "restatement" });
      setRestatementId(r.restatement.id);
      setMsgs(next);
      speak(`${r.say}　${r.restatement.text}`);
      setPhase("judge");
      return;
    }
    setMsgs(next);
    speak(r.say);
  }

  async function send(raw: string) {
    const text = raw.trim().slice(0, MAX_INPUT);
    if (!text || busy) return;
    setError("");
    setDraft("");
    const list: Msg[] = [...msgs, { role: "student", text }];
    // 安全の決まり：つらいことが書かれていたら、送らずに相談窓口を出す
    if (needsSos(text)) {
      setMsgs([...msgs, { role: "haru", text: sosLine(low), face: "normal" }]);
      hush();
      setPhase("sos");
      return;
    }
    if (isAbusive(text)) {
      setMsgs(list);
      if (strikes >= 1) return applyHaru(list, { say: endLine(low), face: "normal", state: "ended" });
      return applyHaru(list, { say: redirectLine(unit.topic, low), face: "normal", state: "offtopic" });
    }
    setMsgs(list);
    setFace("thinking");
    setBusy(true);
    if (mock && mockScript) {
      setTimeout(() => {
        applyHaru(list, mockTurn(mockScript, turnsOf(list)));
        setBusy(false);
      }, 800);
      return;
    }
    try {
      const res = await fetch("/api/oshieru", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "turn", unit: unit.unit, turns: turnsOf(list), strikes }),
      });
      const j = await res.json();
      if (!res.ok) {
        if (res.status === 429) return setPhase("limit");
        setError(j.error === "not_configured" ? "オシエルAIは準備中です。" : "ハルとうまくつながりませんでした。もう一度話してね。");
        setMsgs(msgs);
        setDraft(text);
        return;
      }
      applyHaru(list, j as TurnResponse);
    } catch {
      setError("ハルとうまくつながりませんでした。もう一度話してね。");
      setMsgs(msgs);
      setDraft(text);
    } finally {
      setBusy(false);
    }
  }

  async function score(list: Msg[], v: Verdict | undefined, again: boolean) {
    setPhase("scoring");
    setError("");
    const turns = turnsOf(list);
    if (mock && mockScript) {
      setTimeout(() => {
        setResult(mockScore(mockScript, turns, v, hints));
        setPhase("result");
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
        if (res.status === 429 && !again) return setPhase("limit");
        setError(again ? "採点しなおしができませんでした。" : "採点できませんでした。もう一度ためしてね。");
        setPhase(again ? "result" : "judge");
        return;
      }
      const r = j as ScoreResult;
      setResult(r);
      recordResult({ unit: unit.unit, at: Date.now(), grades: Object.fromEntries(AXES.map((a) => [a.key, r.axes[a.key].grade])) as Record<AxisKey, Grade | null>, mastered: r.mastered, rejudged: again || undefined });
      trackEvent("oshieru_ai_complete", { unit: unit.unit, mastered: r.mastered ? 1 : 0 });
      setPhase("result");
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
    speak(closing);
    void score(list, v, false);
  }

  function applyHint(k: keyof OshieruPublic["hints"]) {
    setHints((n) => n + 1);
    setTyping(true);
    setDraft((v) => `${v ? `${v} ` : ""}${unit.hints[k]}`.slice(0, MAX_INPUT));
  }

  // ── 結果・上限・相談 ──
  if (phase === "result" && result)
    return (
      <div className="grid gap-4">
        <ResultView unit={unit} result={result} mock={mock} rejudgeUsed={rejudgeUsed} error={error} onRejudge={() => { setRejudgeUsed(true); void score(msgs, verdict, true); }} onRetry={start} />
        {jugyoHref && (
          <Link href={jugyoHref} className={`${btn} justify-between bg-white text-[#15172B]`}>
            止まる授業でもう一度聞く <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    );
  if (phase === "sos") return <SosPanel low={low} onBack={() => setPhase("intro")} />;
  if (phase === "limit")
    return (
      <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4">
        <p className="m-0 text-[15px] font-black">{status?.per === "month" ? "今月" : "きょう"}の回数をつかいきりました</p>
        <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55]">オシエルAIは、文字のオシエルと同じ回数で数えています（マスター判定まで進んだ回）。</p>
        <Link href={unit.lectureHref} className={`${btn} mt-3 w-full justify-between bg-white text-[#15172B]`}>
          図解レクチャーで復習する <span aria-hidden="true">→</span>
        </Link>
      </section>
    );

  const b = boards[board];
  const inLesson = phase === "lesson" || phase === "judge" || phase === "correct" || phase === "scoring" || phase === "ended";
  const bubble = phase === "intro" ? (low ? "ぼく、ハル。きょうは きみが せんせい だよ。" : "ぼくはハル。今日は、きみが先生だよ。") : (lastHaru?.text ?? "");

  return (
    <div className="grid gap-3">
      {mock && (
        <p className="m-0 rounded-[12px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] px-3 py-2 text-[12.5px] font-bold leading-relaxed">
          台本モード：AIは使っていません。何を話しても、ハルは決まった台本どおりに答えます（画面のためし用）。
        </p>
      )}

      {/* ステージ：黒板（図）＋ハル */}
      <section aria-label="オシエルAIの教室" className="overflow-hidden rounded-[20px] border-[2px] border-[#15172B] bg-[#15172B] shadow-[4px_4px_0_#1533B8]">
        <div className="flex items-center gap-2 px-3 py-2 text-white">
          <span className="rounded-full bg-[#FFE45C] px-2 py-0.5 text-[11px] font-black text-[#15172B]">オシエルAI</span>
          <span className="min-w-0 truncate text-[12.5px] font-bold text-white/85">{unit.name}</span>
          <span className="ml-auto flex-none text-[11px] font-bold text-white/60">あなた＝先生</span>
        </div>

        {/* 黒板 */}
        <div className="mx-2 rounded-[14px] bg-[#1F4A3A] p-2 sm:p-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-black text-white/80">{low ? "こくばん" : "黒板"}</span>
            {boards.map((x, i) => (
              <button
                key={x.section}
                type="button"
                onClick={() => setBoard(i)}
                aria-pressed={i === board}
                className={`min-h-[32px] rounded-full border-[1.5px] px-2.5 text-[12px] font-black ${i === board ? "border-[#FFE45C] bg-[#FFE45C] text-[#15172B]" : "border-white/40 bg-transparent text-white"}`}
              >
                図{i + 1}
              </button>
            ))}
            <span className="ml-auto text-[10.5px] text-white/60">{low ? "ずを えらんで せつめい しよう" : "図を切りかえて説明しよう"}</span>
          </div>
          <div className="mt-2 max-h-[46vh] overflow-y-auto rounded-[10px] bg-[#F7F6F1] p-2 text-[#15172B] sm:max-h-[380px]">
            {b ? (
              <>
                <p className="m-0 px-1 text-[13.5px] font-black">
                  <Rich text={b.heading} />
                </p>
                {b.figure ? <LectureFigure fig={b.figure} no={board + 1} /> : <p className="m-0 mt-2 px-1 text-[13.5px] leading-relaxed"><Rich text={b.body} /></p>}
              </>
            ) : (
              <p className="m-0 p-2 text-[13px]">（この単元の図はありません）</p>
            )}
          </div>
        </div>

        {/* ハルとふきだし */}
        <div className="flex items-end gap-3 px-3 pb-3 pt-3">
          <div className="relative flex-none">
            <span className={speaking ? "inline-block animate-bounce [animation-duration:1.2s]" : "inline-block"}>
              <Haru face={phase === "intro" ? "normal" : face} size={72} />
            </span>
            <p className="m-0 mt-0.5 text-center text-[11px] font-black text-white">ハル</p>
          </div>
          <div className="relative min-h-[64px] flex-1 rounded-[16px] rounded-bl-[4px] border-[1.5px] border-[#15172B] bg-white px-3.5 py-2.5 text-[#15172B]">
            {busy ? (
              <p className="m-0 text-[15px] font-bold text-[#5A5D73]">{low ? "うーん、かんがえちゅう…" : "うーん、考え中…"}</p>
            ) : (
              <p className="m-0 text-[16px] font-bold leading-relaxed">
                {phase === "judge" || phase === "correct" ? <span className="mb-1 block text-[11px] font-black text-[#1533B8]">ハルの言い直し</span> : null}
                {bubble}
              </p>
            )}
            {lastHaru && !busy && inLesson && (
              <button type="button" onClick={() => speak(phase === "judge" ? msgs.filter((m) => m.role === "haru").slice(-1)[0].text : lastHaru.text)} className="mt-1 text-[11.5px] font-bold text-[#1533B8] underline">
                {low ? "もういちど きく" : "もう一度きく"}
              </button>
            )}
          </div>
        </div>
      </section>

      {error && <p className="m-0 rounded-[10px] bg-[#FDECEA] px-3 py-2 text-[13px] font-bold text-[#B42318]">{error}</p>}

      {/* はじめ */}
      {phase === "intro" && (
        <div className="grid gap-3">
          <ol className="m-0 grid list-none gap-2 rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[13.5px] leading-relaxed">
            {[
              "ハルが声で「わからない」を持ってきます",
              "マイクをタップして、声で説明（話しおわったら、もう一度タップ）",
              "黒板の図を切りかえて、図を見せながら教えよう",
              "ハルが「つまり…」と言い直したら、合格かおしいかを判定",
            ].map((t, i) => (
              <li key={t} className="flex gap-2">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-[7px] bg-[#15172B] text-[12px] font-black text-white">{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
          <ul className="m-0 grid list-none gap-1 rounded-[14px] border-[1.5px] border-dashed border-[#C9C6B4] bg-white/70 p-3 text-[12px] leading-relaxed text-[#3A3D55]">
            <li>・名前や学校名、住所は話さないでね。</li>
            <li>・ハルはAIです。言うことや判定は、まちがうこともあります。</li>
            <li>・声は、この端末で文字にしてから送ります（音声そのものは送りません）。会話は保存しません。</li>
            <li>・ハルの声は、いまはブラウザの読み上げの声（仮の声）です。</li>
          </ul>
          {notConfigured ? (
            <Link href="?mock=1" className={`${btn} bg-[#FFE45C] text-[#15172B] shadow-[3px_3px_0_#15172B]`}>
              準備中です。台本モードでためす
            </Link>
          ) : (
            <button type="button" onClick={start} disabled={noneLeft} className={`${btn} min-h-[58px] bg-[#1533B8] text-[17px] text-white shadow-[3px_3px_0_#15172B]`}>
              {low ? "じゅぎょうを はじめる" : "授業をはじめる（あなたが先生）"}
            </button>
          )}
          {!mock && status?.configured && (
            <p className="m-0 text-center text-[12px] text-[#5A5D73]">
              {status.per === "day" ? "きょう" : "今月"}あと {status.remaining} 回（文字のオシエルと合わせて数えます）
            </p>
          )}
          <label className="flex items-center justify-center gap-2 text-[12.5px] font-bold text-[#3A3D55]">
            <input type="checkbox" checked={voiceOn} onChange={(e) => setVoiceOn(e.target.checked)} /> ハルの声を出す
          </label>
        </div>
      )}

      {/* 先生（生徒）の操作 */}
      {phase === "lesson" && (
        <TeacherPanel
          low={low}
          canListen={canListen && !typing}
          listening={listening}
          recSecs={recSecs}
          interim={interim}
          busy={busy}
          draft={draft}
          setDraft={setDraft}
          lastStudent={lastStudent?.text}
          onMic={() => (listening ? stopListening() : startListening((t) => void send(t)))}
          onSend={() => void send(draft)}
          onTyping={() => setTyping((v) => !v)}
          typing={typing || !canListen}
          hints={unit.hints}
          onHint={applyHint}
          onQuit={() => {
            hush();
            setPhase("intro");
          }}
        />
      )}

      {phase === "judge" && (
        <section className="grid gap-2 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3.5">
          <p className="m-0 text-[14.5px] font-black">{low ? "ハルの いいなおし、あってる？" : "ハルの言い直しは、合っている？"}</p>
          <p className="m-0 text-[12.5px] leading-relaxed text-[#3A3D55]">{low ? "ちいさな まちがいが のこって いるかも。よく きいてね。" : "小さなまちがいが残っていることがあります。先生として、よく聞いて判定しよう。"}</p>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => decide("pass")} className={`${btn} bg-[#1533B8] text-white`}>
              {low ? "あってる！" : "合格！"}
            </button>
            <button
              type="button"
              onClick={() => {
                hush();
                setPhase("correct");
                setTyping(!canListen);
              }}
              className={`${btn} bg-white text-[#15172B]`}
            >
              {low ? "おしい！" : "おしい！ちがう所がある"}
            </button>
          </div>
        </section>
      )}

      {phase === "correct" && (
        <section className="grid gap-2 rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-3.5">
          <p className="m-0 text-[14.5px] font-black">{low ? "どこが ちがう？ ただしくは？" : "どこがちがう？ 正しくは？"}</p>
          {canListen && !typing ? (
            <MicButton low={low} listening={listening} recSecs={recSecs} interim={interim} onClick={() => (listening ? stopListening() : startListening((t) => decide("close", t)))} />
          ) : (
            <>
              <textarea value={draft} onChange={(e) => setDraft(e.target.value.slice(0, MAX_INPUT))} rows={3} className="w-full rounded-[12px] border-[1.5px] border-[#15172B] p-2.5 text-[15px]" placeholder={low ? "ただしくは…" : "正しくは…"} />
              <button type="button" disabled={!draft.trim()} onClick={() => decide("close", draft)} className={`${btn} bg-[#1533B8] text-white`}>
                {low ? "ハルに つたえる" : "ハルに伝える"}
              </button>
            </>
          )}
          {canListen && (
            <button type="button" onClick={() => setTyping((v) => !v)} className="text-[12px] font-bold text-[#1533B8] underline">
              {typing ? "声で話す" : "文字で書く"}
            </button>
          )}
        </section>
      )}

      {phase === "scoring" && <p className="m-0 rounded-[14px] bg-white p-4 text-center text-[14px] font-black">{low ? "さいてん ちゅう…" : "採点中…"}</p>}

      {phase === "ended" && (
        <section className="grid gap-2 rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-3.5">
          <p className="m-0 text-[14px] font-black">{low ? "きょうは ここまで" : "今日はここまで"}</p>
          <button type="button" onClick={start} className={`${btn} bg-[#1533B8] text-white`}>
            もう一度はじめる
          </button>
          <Link href={unit.lectureHref} className={`${btn} justify-between bg-white text-[#15172B]`}>
            図解レクチャーで復習する <span aria-hidden="true">→</span>
          </Link>
        </section>
      )}

      {inLesson && msgs.length > 1 && (
        <details className="rounded-[14px] border-[1.5px] border-[#15172B]/30 bg-white">
          <summary className="cursor-pointer px-3 py-2 text-[12.5px] font-bold text-[#3A3D55]">これまでの会話（{msgs.length}）</summary>
          <ol className="m-0 grid list-none gap-1.5 p-3 pt-0 text-[13px] leading-relaxed">
            {msgs.map((m, i) => (
              <li key={i} className={m.role === "haru" ? "" : "text-right"}>
                <span className={`inline-block max-w-[85%] rounded-[12px] px-2.5 py-1.5 text-left ${m.role === "haru" ? "bg-[#E6EAFB]" : "bg-[#FFE45C]"}`}>
                  <b className="mr-1 text-[11px]">{m.role === "haru" ? "ハル" : "あなた"}</b>
                  {m.text}
                </span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  );
}

function MicButton({ low, listening, recSecs, interim, onClick, disabled }: { low: boolean; listening: boolean; recSecs: number; interim: string; onClick: () => void; disabled?: boolean }) {
  return (
    <div className="grid justify-items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={listening}
        className={`flex h-[88px] w-[88px] items-center justify-center rounded-full border-[2px] border-[#15172B] shadow-[3px_3px_0_#15172B] active:translate-y-0.5 disabled:opacity-40 ${listening ? "animate-pulse bg-[#D9341F] text-white" : "bg-[#FFE45C] text-[#15172B]"}`}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
        <span className="sr-only">{listening ? "話しおわった" : "話して教える"}</span>
      </button>
      <p className="m-0 text-[13px] font-black">
        {listening ? `${low ? "きいてるよ" : "聞いてるよ"}… ${Math.floor(recSecs)}秒（話しおわったら、もう一度タップ）` : low ? "タップして はなす" : "タップして話す"}
      </p>
      {interim && <p className="m-0 w-full rounded-[12px] bg-[#F7F6F1] px-3 py-2 text-[14px] leading-relaxed">{interim}</p>}
    </div>
  );
}

function TeacherPanel(p: {
  low: boolean;
  canListen: boolean;
  listening: boolean;
  recSecs: number;
  interim: string;
  busy: boolean;
  draft: string;
  setDraft: (v: string) => void;
  lastStudent?: string;
  onMic: () => void;
  onSend: () => void;
  onTyping: () => void;
  typing: boolean;
  hints: OshieruPublic["hints"];
  onHint: (k: keyof OshieruPublic["hints"]) => void;
  onQuit: () => void;
}) {
  const HINTS: { k: keyof OshieruPublic["hints"]; label: string }[] = [
    { k: "tatoeru", label: p.low ? "たとえる" : "たとえる" },
    { k: "zu", label: p.low ? "ずで" : "図で" },
    { k: "rei", label: p.low ? "れいを だす" : "例を出す" },
  ];
  return (
    <section className="grid gap-3 rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-3.5">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[#15172B] px-2 py-0.5 text-[11px] font-black text-white">先生</span>
        <span className="text-[13px] font-black">{p.low ? "ハルに おしえて あげよう" : "ハルに教えよう"}</span>
        <button type="button" onClick={p.onQuit} className="ml-auto rounded-full border-[1.5px] border-[#15172B] bg-white px-3 py-1 text-[12px] font-bold">
          やめる
        </button>
      </div>
      {p.canListen && !p.typing ? (
        <MicButton low={p.low} listening={p.listening} recSecs={p.recSecs} interim={p.interim} onClick={p.onMic} disabled={p.busy} />
      ) : (
        <div className="grid gap-2">
          <textarea
            value={p.draft}
            onChange={(e) => p.setDraft(e.target.value.slice(0, MAX_INPUT))}
            rows={3}
            className="w-full rounded-[12px] border-[1.5px] border-[#15172B] p-2.5 text-[15px]"
            placeholder={p.low ? "ハルに せつめい しよう" : "ハルに説明しよう"}
          />
          <button type="button" disabled={!p.draft.trim() || p.busy} onClick={p.onSend} className={`${btn} bg-[#1533B8] text-white`}>
            {p.low ? "ハルに はなす" : "ハルに話す"}
          </button>
        </div>
      )}
      {p.lastStudent && !p.listening && <p className="m-0 text-[12px] text-[#5A5D73]">いま話したこと：{p.lastStudent}</p>}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11.5px] font-black text-[#5A5D73]">{p.low ? "わざ" : "技"}</span>
        {HINTS.map((h) => (
          <button key={h.k} type="button" onClick={() => p.onHint(h.k)} className="min-h-[34px] rounded-full border-[1.5px] border-[#15172B] bg-[#E6EAFB] px-3 text-[12.5px] font-black">
            {h.label}
          </button>
        ))}
        <button type="button" onClick={p.onTyping} className="ml-auto text-[12px] font-bold text-[#1533B8] underline">
          {p.typing ? "声で話す" : "文字で書く"}
        </button>
      </div>
    </section>
  );
}
