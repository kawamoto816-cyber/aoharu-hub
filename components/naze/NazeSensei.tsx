"use client";

import { useEffect, useRef, useState } from "react";
import { MAX_EXCHANGES, MAX_INPUT, lines, type NazeGuide, type NazeResponse, type NazeTurn } from "@/lib/naze";
import { SOS_LINE, needsSos, sosLine } from "@/lib/oshieru/safety";

// なぜなぜ先生（問い返しで考えさせるAI）。図解レクチャーの単元ページの下に置く入口と、小さな対話欄。
// 生徒の「ここがわからない」に、AIは答えを言わずに問いを返す。3回つまったら、その単元の節の見出しとリンクだけを出す。
// 会話本文はこの画面の state にだけ持ち、閉じたら消える（端末にもサーバーにも残さない）。
// ページの URL に ?mock=1 があれば台本モード（AIなし・回数を数えない）。

type Phase = "closed" | "intro" | "chat" | "ended" | "sos" | "limit";
type Msg = NazeTurn & { guide?: NazeGuide };
type Status = { configured: boolean; remaining: number; limit: number; tier: string } | null;

const TIER_LABEL: Record<string, string> = { guest: "登録なし", free: "無料登録", pro: "Pro", max: "Max" };
const btn = "flex min-h-[48px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] px-4 text-[16px] font-black no-underline active:translate-y-0.5 disabled:opacity-50";

export function NazeSensei({ unit, low, className = "" }: { unit: string; low: boolean; className?: string }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [mock, setMock] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [session, setSession] = useState<string>();
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const bottom = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (phase === "chat" || phase === "ended" || phase === "sos") bottom.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [msgs.length, phase]);

  function open() {
    let m = false;
    try {
      m = new URLSearchParams(window.location.search).get("mock") === "1";
    } catch {
      m = false;
    }
    setMock(m);
    setPhase("intro");
    setMsgs([]);
    setSession(undefined);
    setInput("");
    setError("");
    if (m) return;
    fetch("/api/naze", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: Status) => setStatus(j))
      .catch(() => setStatus(null));
  }

  function close() {
    // 閉じたら会話は消える
    setPhase("closed");
    setMsgs([]);
    setSession(undefined);
    setInput("");
    setError("");
  }

  const notConfigured = !mock && status !== null && !status.configured;
  const noneLeft = !mock && status !== null && status.configured && status.remaining <= 0;
  const said = msgs.filter((m) => m.role === "student").length;

  async function send(raw?: string) {
    const text = (raw ?? input).trim().slice(0, MAX_INPUT);
    if (!text || busy) return;
    setError("");
    setInput("");
    // 安全の決まり：つらいことが書かれていたら、送らずに相談窓口を出す
    if (needsSos(text)) {
      setMsgs([...msgs, { role: "sensei", text: sosLine(low) }]);
      setPhase("sos");
      return;
    }
    const list: Msg[] = [...msgs, { role: "student", text }];
    setMsgs(list);
    if (phase === "intro") setPhase("chat");
    setBusy(true);
    try {
      const res = await fetch("/api/naze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ unit, turns: list.map(({ role, text }) => ({ role, text })), session, mock: mock || undefined }),
      });
      const j = (await res.json()) as NazeResponse & { error?: string };
      if (!res.ok) {
        if (j.error === "not_configured") {
          setStatus((s) => ({ ...(s ?? { remaining: 0, limit: 0, tier: "guest" }), configured: false }));
          setPhase("intro");
          setMsgs([]);
          return;
        }
        if (res.status === 429) {
          setPhase("limit");
          return;
        }
        setError(low ? "うまく つながりませんでした。もう いちど おくってね。" : "うまくつながりませんでした。少しまってから、もう一度送ってね。");
        setMsgs(list.slice(0, -1));
        setInput(text);
        if (list.length === 1) setPhase("intro");
        return;
      }
      if (j.session) setSession(j.session);
      if (typeof j.remaining === "number") setStatus((s) => (s ? { ...s, remaining: j.remaining! } : s));
      setMsgs([...list, { role: "sensei", text: j.reply, guide: j.guide }]);
      if (j.sos) setPhase("sos");
      else if (j.ended) setPhase("ended");
      else setPhase("chat");
    } catch {
      setError(low ? "うまく つながりませんでした。もう いちど おくってね。" : "うまくつながりませんでした。もう一度送ってね。");
      setMsgs(list.slice(0, -1));
      setInput(text);
      if (list.length === 1) setPhase("intro");
    } finally {
      setBusy(false);
      box.current?.focus();
    }
  }

  // ── 入口（閉じているとき） ──
  if (phase === "closed")
    return (
      <button
        type="button"
        onClick={open}
        className={`flex min-h-[56px] w-full items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#E6EAFB] px-4 py-2.5 text-left text-[16px] font-black text-[#15172B] shadow-[3px_3px_0_#15172B] ${className}`}
      >
        <span className="flex items-center gap-3">
          <SenseiIcon size={36} />
          <span>
            {low ? "なぜなぜ先生に きく" : "なぜなぜ先生にきく"}
            <span className="block text-[12.5px] font-bold text-[#3A3D55]">{low ? "AIの せんせいが「なぜ？」を いっしょに かんがえるよ" : "わからないところを、AIの先生が問いを返して一緒に考えます"}</span>
          </span>
        </span>
        <span aria-hidden="true">＋</span>
      </button>
    );

  const placeholder = said === 0 ? (low ? "どこが わからない？（なまえは かかないでね）" : "どこがわからない？（名前や学校名は書かないでね）") : low ? "かんがえた ことを かいてね" : "考えたことを書いてね";

  return (
    <section aria-label="なぜなぜ先生" className={`rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-3 shadow-[4px_4px_0_#15172B] sm:p-4 ${className}`}>
      <div className="flex items-center gap-2.5">
        <SenseiIcon size={44} />
        <div className="min-w-0">
          <p className="m-0 text-[16px] font-black">
            なぜなぜ先生 <span className="ml-1 rounded-full bg-[#15172B] px-2 py-0.5 align-[2px] text-[11px] text-[#FFE45C]">AI</span>
          </p>
          <p className="m-0 text-[12.5px] font-bold text-[#3A3D55]">{low ? "AIの せんせいです。こたえは いいません" : "AIの先生です。答えは言いません"}</p>
        </div>
        <button type="button" onClick={close} className="ml-auto flex-none rounded-full border-[1.5px] border-[#15172B] bg-white px-3 py-1 text-[13px] font-bold">
          {low ? "とじる" : "閉じる"}
        </button>
      </div>
      {mock && <p className="m-0 mt-2 rounded-[10px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] px-2.5 py-1.5 text-[12px] font-bold">台本モード：AIは使っていません。決まった問いを順に返します（画面のためし用）。</p>}

      {phase === "limit" ? (
        <div className="mt-3 rounded-[14px] bg-[#F7F6F1] p-3">
          <p className="m-0 text-[16px] font-black">{low ? "きょうの かいすうを つかいきりました" : "きょうの回数をつかいきりました"}</p>
          <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55]">なぜなぜ先生は、会話を始めた回を数えています。登録なしは1日5回、無料登録は1日10回、Pro・Maxは1日30回までです。</p>
        </div>
      ) : notConfigured ? (
        <div className="mt-3 rounded-[14px] bg-[#F7F6F1] p-3">
          <p className="m-0 flex items-center gap-2 text-[16px] font-black">
            <span className="rounded-full bg-[#15172B] px-2.5 py-0.5 text-[11px] text-[#FFE45C]">準備中</span>
            {low ? "なぜなぜ先生は じゅんびちゅう です" : "なぜなぜ先生は準備中です"}
          </p>
          <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55]">いまはAIにつながっていません。もうしばらく待ってね。</p>
        </div>
      ) : (
        <>
          <ol aria-live="polite" className="m-0 mt-3 grid list-none gap-2.5 p-0">
            <li className="flex items-end gap-2">
              <SenseiIcon size={28} />
              <p className="m-0 max-w-[85%] rounded-[14px_14px_14px_4px] bg-[#E6EAFB] px-3.5 py-2.5 text-[16px] font-bold leading-[1.75]">{lines.intro(low)}</p>
            </li>
            {msgs.map((m, i) =>
              m.role === "sensei" ? (
                <li key={i} className="grid gap-2">
                  <div className="flex items-end gap-2">
                    <SenseiIcon size={28} />
                    <p className="m-0 max-w-[85%] rounded-[14px_14px_14px_4px] bg-[#E6EAFB] px-3.5 py-2.5 text-[16px] font-bold leading-[1.75]">{m.text}</p>
                  </div>
                  {m.guide && (
                    <a href={`#lec-s${m.guide.sectionIndex + 1}`} className="ml-9 flex min-h-[48px] items-center justify-between gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3.5 py-2 text-[15px] font-black text-[#15172B] no-underline">
                      <span>
                        <span className="block text-[12px] font-bold text-[#3A3D55]">{lines.guide(low)}</span>
                        {m.guide.sectionIndex + 1}. {m.guide.title}
                      </span>
                      <span aria-hidden="true">↑</span>
                    </a>
                  )}
                </li>
              ) : (
                <li key={i} className="flex justify-end">
                  <p className="m-0 max-w-[85%] whitespace-pre-wrap rounded-[14px_14px_4px_14px] border-[1.5px] border-[#15172B] bg-white px-3.5 py-2.5 text-[16px] leading-[1.75]">{m.text}</p>
                </li>
              ),
            )}
            {busy && (
              <li className="flex items-end gap-2" aria-label="なぜなぜ先生が考えています">
                <SenseiIcon size={28} />
                <span className="rounded-[14px_14px_14px_4px] bg-[#E6EAFB] px-3.5 py-2.5 text-[16px] font-black tracking-[0.3em] text-[#1533B8]">…</span>
              </li>
            )}
          </ol>

          {error && <p className="m-0 mt-2 rounded-[12px] border-l-4 border-[#B42318] bg-white px-3 py-2 text-[13.5px] font-bold">{error}</p>}

          {phase === "sos" && (
            <div role="alert" className="mt-3 rounded-[14px] border-[2px] border-[#B42318] bg-white p-3">
              <p className="m-0 text-[15px] font-black">ひとりでかかえこまないでね</p>
              <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">おうちの人や先生など、信じられる大人に話してみよう。電話でも相談できます。</p>
              <a href={SOS_LINE.telHref} className={`${btn} mt-2.5 flex-col gap-0 bg-[#B42318] text-white`}>
                <span className="text-[12px] font-bold">{SOS_LINE.name}</span>
                <span className="text-[22px] tabular-nums tracking-wide">{SOS_LINE.tel}</span>
              </a>
              <p className="m-0 mt-1.5 text-center text-[11.5px] text-[#5A5D73]">{SOS_LINE.note}</p>
            </div>
          )}

          {phase === "ended" && (
            <div className="mt-3 grid gap-2 rounded-[14px] bg-[#FFFBE6] p-3">
              <p className="m-0 text-[15px] font-black leading-relaxed">{lines.end(low)}</p>
              <button type="button" onClick={open} disabled={noneLeft} className={`${btn} bg-white text-[#15172B]`}>
                {low ? "べつの ことを きく" : "別のことをきく"}
              </button>
            </div>
          )}

          {(phase === "intro" || phase === "chat") && (
            <div className="mt-3 grid gap-2">
              {said > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  <button type="button" disabled={busy} onClick={() => void send("わからない")} className="min-h-[40px] rounded-full border-[1.5px] border-[#15172B] bg-white px-3.5 text-[14px] font-bold active:bg-[#FFE45C] disabled:opacity-50">
                    わからない
                  </button>
                </div>
              )}
              <label className="sr-only" htmlFor={`naze-input-${unit}`}>
                なぜなぜ先生への発言
              </label>
              <textarea
                id={`naze-input-${unit}`}
                ref={box}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
                rows={2}
                disabled={noneLeft}
                placeholder={placeholder}
                className="w-full resize-none rounded-[12px] border-[1.5px] border-[#15172B] bg-[#F7F6F1] px-3 py-2 text-[17px] leading-relaxed outline-none focus:bg-white"
              />
              <div className="flex items-center gap-2">
                <span className="text-[11.5px] tabular-nums text-[#5A5D73]">
                  {said}/{MAX_EXCHANGES}
                  {low ? " かい" : " 回"}
                </span>
                <button type="button" onClick={() => void send()} disabled={busy || noneLeft || !input.trim()} className={`${btn} ml-auto min-h-[48px] bg-[#1533B8] px-7 text-white shadow-[2px_2px_0_#15172B]`}>
                  {low ? "おくる" : "送る"}
                </button>
              </div>
              {!mock && status?.configured && said === 0 && (
                <p className="m-0 text-center text-[12px] text-[#5A5D73]">
                  {TIER_LABEL[status.tier] ?? ""}：きょうあと {status.remaining} 回（会話を始めた回を数えます）
                </p>
              )}
              {noneLeft && <p className="m-0 text-center text-[13px] font-bold text-[#B42318]">きょうの回数をつかいきりました。</p>}
            </div>
          )}

          <p className="m-0 mt-3 text-[11.5px] leading-relaxed text-[#5A5D73]">
            なぜなぜ先生はAIです。まちがうこともあります。会話はどこにも保存しません（閉じると消えます）。名前や学校名は書かないでね。
          </p>
        </>
      )}
      <div ref={bottom} />
    </section>
  );
}

function SenseiIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="flex-none">
      <circle cx="24" cy="24" r="22" fill="#FFE45C" stroke="#15172B" strokeWidth="2.5" />
      <text x="24" y="32" textAnchor="middle" fontSize="24" fontWeight="900" fill="#15172B">
        ?
      </text>
    </svg>
  );
}
