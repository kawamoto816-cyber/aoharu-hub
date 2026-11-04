"use client";

import { useEffect, useRef, useState } from "react";
import { MAX_SECONDS, MAX_TEXT, MIN_TEXT, STATUS_LABEL, lines, type KoeResponse, type PointStatus } from "@/lib/koe";
import { SOS_LINE, needsSos, sosLine } from "@/lib/oshieru/safety";

// 声で説明（ファインマン法・試作）。図解レクチャーの単元ページで、なぜなぜ先生の入口の下に置く入口と、小さな欄。
// 録音（最大 MAX_SECONDS 秒・話している間は文字が出る）→「見てもらう」→ 要点のチェック表（言えた／あいまい／まだ）と次の一言。
// 文字起こしはブラウザの Web Speech API（ja-JP）。使えないブラウザ・マイクが使えないときは「文字で書いて説明する」。
// 音声はこのアプリのサーバーに送らない（送るのは起こした文字だけ）。説明の文はこの画面の state にだけ持ち、閉じたら消える。
// ページの URL に ?mock=1 があれば AIなしの判定（文字の一致だけ・回数を数えない）。

type Phase = "closed" | "input" | "result" | "sos" | "limit";
type Status = { configured: boolean; remaining: number; limit: number; tier: string } | null;
type Result = Required<Pick<KoeResponse, "points" | "next">> & { mistake: KoeResponse["mistake"] };

// Web Speech API（型が lib.dom にない環境もあるので、使う分だけ書く）
interface RecResult {
  isFinal: boolean;
  0: { transcript: string };
}
interface RecEvent {
  resultIndex: number;
  results: ArrayLike<RecResult>;
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

const TIER_LABEL: Record<string, string> = { guest: "登録なし", free: "無料登録", pro: "Pro", max: "Max" };
const STATUS_CLS: Record<PointStatus, string> = {
  said: "bg-[#1533B8] text-white",
  vague: "bg-[#FFE45C] text-[#15172B]",
  missing: "bg-[#F7F6F1] text-[#B42318]",
};
const btn = "flex min-h-[48px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] px-4 text-[16px] font-black no-underline active:translate-y-0.5 disabled:opacity-50";
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function KoeSetsumei({ unit, low, className = "" }: { unit: string; low: boolean; className?: string }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [mock, setMock] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [voice, setVoice] = useState(true); // false = 文字で書いて説明する
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const [interim, setInterim] = useState("");
  const [secs, setSecs] = useState(0);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const rec = useRef<Rec | null>(null);
  const live = useRef(false); // 録音中か（onend でつなぎ直すかどうか）
  const finalText = useRef("");
  const startedAt = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // 閉じる・ページを離れるときは録音を止める
  useEffect(() => () => hardStop(), []);

  function hardStop() {
    live.current = false;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    try {
      rec.current?.abort();
    } catch {
      /* すでに止まっている */
    }
    rec.current = null;
  }

  function open() {
    let m = false;
    try {
      m = new URLSearchParams(window.location.search).get("mock") === "1";
    } catch {
      m = false;
    }
    setMock(m);
    setVoice(!!recCtor());
    setPhase("input");
    reset();
    if (m) return;
    fetch("/api/koe", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: Status) => setStatus(j))
      .catch(() => setStatus(null));
  }

  function reset() {
    hardStop();
    setRecording(false);
    finalText.current = "";
    setText("");
    setInterim("");
    setSecs(0);
    setNote("");
    setResult(null);
  }

  function close() {
    reset();
    setPhase("closed");
  }

  function finish() {
    live.current = false;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setRecording(false);
    setInterim((i) => {
      // 止めた瞬間にまだ確定していない文字も残す
      if (i) {
        finalText.current = `${finalText.current}${i}`.slice(0, MAX_TEXT);
        setText(finalText.current);
      }
      return "";
    });
  }

  function startRec() {
    const Ctor = recCtor();
    if (!Ctor) {
      setVoice(false);
      return;
    }
    setNote("");
    setResult(null);
    finalText.current = text;
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
      if (fin) {
        finalText.current = `${finalText.current}${fin}`.slice(0, MAX_TEXT);
        setText(finalText.current);
      }
      setInterim(mid);
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture") {
        hardStop();
        setRecording(false);
        setVoice(false);
        setNote(low ? "マイクが つかえません。もじで かいて せつめい してね。" : "マイクが使えませんでした。文字で書いて説明してね。");
      }
      // no-speech・network などは onend でつなぎ直す
    };
    r.onend = () => {
      // ブラウザは黙っていると自分で止まるので、時間内ならつなぎ直す
      if (live.current && Date.now() - startedAt.current < MAX_SECONDS * 1000) {
        try {
          r.start();
          return;
        } catch {
          /* つなぎ直せなければ終える */
        }
      }
      finish();
    };
    rec.current = r;
    live.current = true;
    startedAt.current = Date.now();
    setSecs(0);
    setRecording(true);
    try {
      r.start();
    } catch {
      hardStop();
      setRecording(false);
      setVoice(false);
      return;
    }
    timer.current = setInterval(() => {
      const s = (Date.now() - startedAt.current) / 1000;
      setSecs(Math.min(MAX_SECONDS, s));
      if (s >= MAX_SECONDS) stopRec();
    }, 250);
  }

  function stopRec() {
    live.current = false;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    try {
      rec.current?.stop(); // 確定した文字が届いてから onend → finish
    } catch {
      finish();
    }
  }

  const notConfigured = !mock && status !== null && !status.configured;
  const noneLeft = !mock && status !== null && status.configured && status.remaining <= 0;
  const len = text.replace(/\s/g, "").length;

  async function ask() {
    const t = text.trim().slice(0, MAX_TEXT);
    if (busy || recording) return;
    if (t.replace(/\s/g, "").length < MIN_TEXT) return setNote(lines.tooShort(low));
    setNote("");
    // 安全の決まり：つらいことが話されていたら、送らずに相談窓口を出す
    if (needsSos(t)) return setPhase("sos");
    setBusy(true);
    try {
      const res = await fetch("/api/koe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ unit, text: t, mock: mock || undefined }),
      });
      const j = (await res.json()) as KoeResponse & { error?: string };
      if (!res.ok) {
        if (j.error === "not_configured") setStatus((s) => ({ ...(s ?? { remaining: 0, limit: 0, tier: "guest" }), configured: false }));
        else if (res.status === 429) setPhase("limit");
        else if (j.error === "too_short") setNote(lines.tooShort(low));
        else setNote(lines.unjudged(low));
        return;
      }
      if (j.sos) return setPhase("sos");
      if (j.refused) return setNote(lines.refused(low));
      if (typeof j.remaining === "number") setStatus((s) => (s ? { ...s, remaining: j.remaining! } : s));
      if (!j.points || !j.next) return setNote(lines.unjudged(low));
      setResult({ points: j.points, next: j.next, mistake: j.mistake ?? null });
      setPhase("result");
    } catch {
      setNote(low ? "うまく つながりませんでした。もう いちど ためしてね。" : "うまくつながりませんでした。もう一度ためしてね。");
    } finally {
      setBusy(false);
    }
  }

  // ── 入口（閉じているとき）。なぜなぜ先生の入口と同じ形 ──
  if (phase === "closed")
    return (
      <button
        type="button"
        onClick={open}
        className={`flex min-h-[56px] w-full items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-4 py-2.5 text-left text-[16px] font-black text-[#15172B] shadow-[3px_3px_0_#15172B] ${className}`}
      >
        <span className="flex items-center gap-3">
          <MicIcon size={36} />
          <span>
            {low ? "こえで せつめい する" : "声で説明する"}
            <span className="block text-[12.5px] font-bold text-[#3A3D55]">{low ? "ならった ことを はなすと、AIが「いえた ところ」を みるよ" : "1〜2分で説明すると、AIが言えた要点・まだの要点を見ます"}</span>
          </span>
        </span>
        <span aria-hidden="true">＋</span>
      </button>
    );

  return (
    <section aria-label="声で説明" className={`rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-3 shadow-[4px_4px_0_#15172B] sm:p-4 ${className}`}>
      <div className="flex items-center gap-2.5">
        <MicIcon size={44} />
        <div className="min-w-0">
          <p className="m-0 text-[16px] font-black">
            {low ? "こえで せつめい" : "声で説明"} <span className="ml-1 rounded-full bg-[#15172B] px-2 py-0.5 align-[2px] text-[11px] text-[#FFE45C]">AIが判定</span>
          </p>
          <p className="m-0 text-[12.5px] font-bold text-[#3A3D55]">{low ? "ともだちに おしえる つもりで はなそう" : "友だちに教えるつもりで説明しよう（ファインマン法）"}</p>
        </div>
        <button type="button" onClick={close} className="ml-auto flex-none rounded-full border-[1.5px] border-[#15172B] bg-white px-3 py-1 text-[13px] font-bold">
          {low ? "とじる" : "閉じる"}
        </button>
      </div>
      {mock && <p className="m-0 mt-2 rounded-[10px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] px-2.5 py-1.5 text-[12px] font-bold">ためしモード：AIは使っていません。文字の一致だけで判定します（画面のためし用）。</p>}

      {phase === "limit" ? (
        <div className="mt-3 rounded-[14px] bg-[#F7F6F1] p-3">
          <p className="m-0 text-[16px] font-black">{low ? "きょうの かいすうを つかいきりました" : "きょうの回数をつかいきりました"}</p>
          <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55]">声で説明は、判定した回を数えています。登録なしは1日5回、無料登録は1日10回、Pro・Maxは1日30回までです。</p>
        </div>
      ) : phase === "sos" ? (
        <div role="alert" className="mt-3 rounded-[14px] border-[2px] border-[#B42318] bg-white p-3">
          <p className="m-0 text-[15px] font-black">{sosLine(low)}</p>
          <a href={SOS_LINE.telHref} className={`${btn} mt-2.5 flex-col gap-0 bg-[#B42318] text-white`}>
            <span className="text-[12px] font-bold">{SOS_LINE.name}</span>
            <span className="text-[22px] tabular-nums tracking-wide">{SOS_LINE.tel}</span>
          </a>
          <p className="m-0 mt-1.5 text-center text-[11.5px] text-[#5A5D73]">{SOS_LINE.note}</p>
        </div>
      ) : notConfigured ? (
        <div className="mt-3 rounded-[14px] bg-[#F7F6F1] p-3">
          <p className="m-0 flex items-center gap-2 text-[16px] font-black">
            <span className="rounded-full bg-[#15172B] px-2.5 py-0.5 text-[11px] text-[#FFE45C]">準備中</span>
            {low ? "こえで せつめいは じゅんびちゅう です" : "声で説明は準備中です"}
          </p>
          <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55]">いまはAIにつながっていません。もうしばらく待ってね。</p>
        </div>
      ) : phase === "result" && result ? (
        <div className="mt-3 grid gap-2.5">
          <section aria-live="polite" className="rounded-[16px] border-[1.5px] border-[#15172B] bg-[#E6EAFB] p-3">
            <p className="m-0 text-[11px] font-black text-[#1533B8]">{low ? "AIが みた けっか" : "AIの判定"}</p>
            <ul className="m-0 mt-1.5 grid list-none gap-1.5 p-0">
              {result.points.map((p) => (
                <li key={p.index} className="flex items-start gap-2 rounded-[10px] bg-white px-2.5 py-2">
                  <span className={`mt-0.5 min-w-[4.5em] flex-none rounded-full border border-[#15172B] px-2 py-0.5 text-center text-[12.5px] font-black ${STATUS_CLS[p.status]}`}>{STATUS_LABEL[p.status][low ? "low" : "normal"]}</span>
                  <span className="min-w-0 text-[14.5px] font-bold leading-snug">
                    {p.label}
                    {p.words.length > 0 && <span className="block text-[12px] font-normal text-[#5A5D73]">{p.words.join("・")}</span>}
                  </span>
                </li>
              ))}
            </ul>
            <p className="m-0 mt-2.5 text-[15px] font-bold leading-relaxed">{result.next}</p>
          </section>
          {result.mistake && (
            <section className="rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3">
              <p className="m-0 text-[11px] font-black text-[#B42318]">{low ? "ここを たしかめよう" : "ここをたしかめよう"}</p>
              <p className="m-0 mt-1 text-[14px] leading-relaxed">
                {low ? "きみの せつめい" : "あなたの説明"}：「{result.mistake.quote}」
              </p>
              <p className="m-0 mt-1 text-[14px] font-bold leading-relaxed">
                {low ? "きょうかしょ" : "教科書（レクチャー）"}：{result.mistake.textbook}
              </p>
              {result.mistake.point !== null && result.points[result.mistake.point] && (
                <a href={`#lec-s${result.points[result.mistake.point].section + 1}`} className="mt-1 inline-block text-[13px] font-black text-[#1533B8]">
                  {low ? "その ところを よむ ↑" : "その節を読む ↑"}
                </a>
              )}
            </section>
          )}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                reset();
                setPhase("input");
              }} disabled={noneLeft} className={`${btn} bg-[#FFE45C] text-[#15172B] shadow-[2px_2px_0_#15172B]`}>
              {low ? "もう いちど" : "もう一度説明する"}
            </button>
            <button type="button" onClick={close} className={`${btn} bg-white text-[#15172B]`}>
              おわる
            </button>
          </div>
          {!mock && status?.configured && <p className="m-0 text-center text-[12px] text-[#5A5D73]">{TIER_LABEL[status.tier] ?? ""}：きょうあと {status.remaining} 回</p>}
        </div>
      ) : (
        <div className="mt-3 grid gap-2.5">
          <p className="m-0 rounded-[14px] bg-[#F7F6F1] px-3 py-2 text-[14.5px] font-bold leading-relaxed">{voice ? lines.intro(low) : lines.textIntro(low)}</p>
          {voice ? (
            <>
              <div className="flex items-center gap-2">
                {recording ? (
                  <button type="button" onClick={stopRec} className={`${btn} flex-1 bg-[#B42318] text-white shadow-[2px_2px_0_#15172B]`}>
                    ■ {low ? "とめる" : "止める"}
                  </button>
                ) : (
                  <button type="button" onClick={startRec} disabled={busy || noneLeft} className={`${btn} flex-1 bg-[#1533B8] text-white shadow-[2px_2px_0_#15172B]`}>
                    ● {text ? (low ? "つづきを はなす" : "続きを話す") : low ? "はなしはじめる" : "話しはじめる"}
                  </button>
                )}
                <span className={`w-[5.5em] flex-none text-right text-[13px] font-black tabular-nums ${recording ? "text-[#B42318]" : "text-[#5A5D73]"}`} aria-live="off">
                  {mmss(secs)} / {mmss(MAX_SECONDS)}
                </span>
              </div>
              {(recording || text) && (
                <div className="min-h-[96px] rounded-[12px] border-[1.5px] border-[#15172B] bg-[#F7F6F1] px-3 py-2 text-[16px] leading-relaxed">
                  {recording ? (
                    <p className="m-0 whitespace-pre-wrap">
                      {text}
                      <span className="text-[#5A5D73]">{interim}</span>
                      {!text && !interim && <span className="text-[#5A5D73]">{low ? "きいて いるよ…" : "聞いています…"}</span>}
                    </p>
                  ) : (
                    <>
                      <label className="sr-only" htmlFor={`koe-text-${unit}`}>
                        起こした文字
                      </label>
                      <textarea
                        id={`koe-text-${unit}`}
                        value={text}
                        onChange={(e) => setText(e.target.value.slice(0, MAX_TEXT))}
                        rows={4}
                        className="w-full resize-none bg-transparent text-[16px] leading-relaxed outline-none"
                      />
                      <p className="m-0 text-[11.5px] text-[#5A5D73]">{low ? "ききまちがいは なおせるよ" : "聞きまちがいは直せます"}</p>
                    </>
                  )}
                </div>
              )}
              <button type="button" onClick={() => setVoice(false)} disabled={recording} className="justify-self-start text-[12.5px] font-bold text-[#1533B8] underline disabled:opacity-50">
                {low ? "もじで かいて せつめい する" : "文字で書いて説明する"}
              </button>
            </>
          ) : (
            <>
              <label className="sr-only" htmlFor={`koe-text-${unit}`}>
                説明
              </label>
              <textarea
                id={`koe-text-${unit}`}
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX_TEXT))}
                rows={6}
                placeholder={low ? "ならった ことを、じぶんの ことばで かいてね（なまえは かかないでね）" : "学んだことを、自分の言葉で説明してね（名前や学校名は書かないでね）"}
                className="w-full resize-none rounded-[12px] border-[1.5px] border-[#15172B] bg-[#F7F6F1] px-3 py-2 text-[16px] leading-relaxed outline-none focus:bg-white"
              />
              <p className="m-0 text-right text-[11.5px] tabular-nums text-[#5A5D73]">
                {len} / {MAX_TEXT}
              </p>
              {recCtor() && (
                <button type="button" onClick={() => setVoice(true)} className="justify-self-start text-[12.5px] font-bold text-[#1533B8] underline">
                  {low ? "こえで せつめい する" : "声で説明する"}
                </button>
              )}
            </>
          )}

          {note && <p className="m-0 rounded-[12px] border-l-4 border-[#B42318] bg-white px-3 py-2 text-[13.5px] font-bold">{note}</p>}

          <button type="button" onClick={() => void ask()} disabled={busy || recording || noneLeft || len < MIN_TEXT} className={`${btn} bg-[#15172B] text-white shadow-[3px_3px_0_#B42318]`}>
            {busy ? (low ? "AIが みて います…" : "AIが見ています…") : low ? "みて もらう" : "見てもらう"}
          </button>
          {!mock && status?.configured && (
            <p className="m-0 text-center text-[12px] text-[#5A5D73]">
              {TIER_LABEL[status.tier] ?? ""}：きょうあと {status.remaining} 回（判定した回を数えます）
            </p>
          )}
          {noneLeft && <p className="m-0 text-center text-[13px] font-bold text-[#B42318]">きょうの回数をつかいきりました。</p>}
        </div>
      )}

      <p className="m-0 mt-3 text-[11.5px] leading-relaxed text-[#5A5D73]">{lines.notice(low)}</p>
    </section>
  );
}

function MicIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="flex-none">
      <circle cx="24" cy="24" r="22" fill="#FFE45C" stroke="#15172B" strokeWidth="2.5" />
      <rect x="19" y="11" width="10" height="17" rx="5" fill="#15172B" />
      <path d="M14.5 23.5a9.5 9.5 0 0 0 19 0M24 33v5M19 38h10" fill="none" stroke="#15172B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
