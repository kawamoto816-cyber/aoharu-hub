"use client";

import { useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import { checkVoiceLesson } from "@/app/station/actions";
import type { PlanCheck } from "@/lib/station/types";
import { CheckResult } from "./CheckResult";

// 教壇の「声で授業する」（試作）。マイクに向かって授業をすると、話した言葉が文字になって出る。
// 止めたら、起こした文字を直してから AI 点検へ（話す速さ・問いかけも見る）。
// 文字起こしはブラウザの Web Speech API（ja-JP）。音声はサーバーに送らず、録音も残さない（送るのは文字と話した秒数だけ）。
// 本番の授業は掲示板の時間に受講者の前で行う。ここはその練習と、授業として出す前の点検。

const MAX_SECONDS = 20 * 60;
const MAX_TEXT = 12000;

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

const noop = () => () => {};
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function VoiceLesson({ unit, title, missing, onPublish }: { unit?: string; title: string; missing: string[]; onPublish: (c: PlanCheck) => void }) {
  // ブラウザが文字起こしに対応しているか（サーバーでは「対応」として描き、ブラウザで確かめなおす）
  const hasRec = useSyncExternalStore(noop, () => !!recCtor(), () => true);
  const [blocked, setBlocked] = useState(false);
  const supported = hasRec && !blocked;
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const [interim, setInterim] = useState("");
  const [secs, setSecs] = useState(0);
  const [note, setNote] = useState("");
  const [res, setRes] = useState<PlanCheck | null>(null);
  const [posted, setPosted] = useState(false);
  const [pending, start] = useTransition();

  const rec = useRef<Rec | null>(null);
  const live = useRef(false);
  const finalText = useRef("");
  const startedAt = useRef(0);
  const before = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

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

  function finish() {
    live.current = false;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setRecording(false);
    setInterim((i) => {
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
      setBlocked(true);
      return;
    }
    setNote("");
    setRes(null);
    setPosted(false);
    finalText.current = text;
    before.current = secs;
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
        // 文の区切りが起こされないことが多いので、確定のたびに句点を足す
        finalText.current = `${finalText.current}${fin.trim()}${/[。？！?!]$/.test(fin.trim()) ? "" : "。"}`.slice(0, MAX_TEXT);
        setText(finalText.current);
      }
      setInterim(mid);
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture") {
        hardStop();
        setRecording(false);
        setBlocked(true);
        setNote("マイクが使えませんでした。話す内容を文字で書いて点検することもできます。");
      }
    };
    r.onend = () => {
      if (live.current && before.current + (Date.now() - startedAt.current) / 1000 < MAX_SECONDS) {
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
    setRecording(true);
    try {
      r.start();
    } catch {
      hardStop();
      setRecording(false);
      setBlocked(true);
      return;
    }
    timer.current = setInterval(() => {
      const s = before.current + (Date.now() - startedAt.current) / 1000;
      setSecs(Math.min(MAX_SECONDS, s));
      if (s >= MAX_SECONDS) {
        try {
          rec.current?.stop();
        } catch {
          finish();
        }
      }
    }, 250);
  }

  function stopRec() {
    live.current = false;
    try {
      rec.current?.stop();
    } catch {
      finish();
    }
  }

  const ready = !!unit && title.trim() && text.trim().length >= 20 && !recording;
  return (
    <div>
      <p className="m-0 text-[13px] leading-relaxed text-[#3A3D55]">
        マイクに向かって、受講者がいるつもりで授業をしてみましょう。話した言葉が文字になります。止めたら、まちがって起こされた字を直してから点検へ。音声はどこにも送らず、録音も残しません。
      </p>
      <ul className="m-0 mt-1 pl-5 text-[12.5px] leading-relaxed text-[#5A5D73]">
        <li>最初の1分で「なぜ学ぶか」を話す（つかみ）</li>
        <li>「たとえば」で例を出す・ときどき「どう思う？」と問いかける</li>
        <li>最後に「では、これはどうなるでしょう？」と1問出して、答えも言う</li>
      </ul>

      {supported ? (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {recording ? (
            <button type="button" onClick={stopRec} className="flex min-h-[48px] items-center gap-2 rounded-full border-[1.5px] border-[#15172B] bg-[#B42318] px-5 text-[15px] font-black text-white">
              <span aria-hidden="true" className="h-3 w-3 rounded-[3px] bg-white" /> 止める
            </button>
          ) : (
            <button type="button" onClick={startRec} disabled={!unit} className="flex min-h-[48px] items-center gap-2 rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-5 text-[15px] font-black disabled:opacity-40">
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#B42318]" /> {secs > 0 ? "続きを話す" : "声で授業をはじめる"}
            </button>
          )}
          <span className="text-[20px] font-black tabular-nums" aria-live="off">
            {mmss(secs)} <span className="text-[12px] font-bold text-[#5A5D73]">/ 20:00</span>
          </span>
          {recording && <span className="animate-pulse text-[12.5px] font-black text-[#B42318]">● 話してください</span>}
          {!unit && <span className="text-[12px] text-[#5A5D73]">先に単元を選んでください</span>}
        </div>
      ) : (
        <p className="m-0 mt-3 rounded-[8px] bg-[#FFF8D6] px-3 py-2 text-[12.5px]">
          {note || "このブラウザは声の文字起こしに対応していません（パソコンの Chrome・Edge、Android の Chrome で使えます）。話す内容を下に書いて点検できます。"}
        </p>
      )}

      <label className="mt-3 block text-[12.5px] font-bold">
        話した言葉（直せます）
        <textarea
          className="mt-0.5 w-full rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1.5 text-[14px] leading-relaxed"
          rows={7}
          value={recording ? `${text}${interim}` : text}
          readOnly={recording}
          maxLength={MAX_TEXT}
          onChange={(e) => {
            setText(e.target.value);
            finalText.current = e.target.value;
            setRes(null);
            setPosted(false);
          }}
          placeholder="ここに、話した言葉が出てきます"
        />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!ready || pending}
          onClick={() => start(async () => setRes(await checkVoiceLesson(unit!, title, text, secs || text.length / 5)))}
          className="rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 py-2 text-[14px] font-black disabled:opacity-40"
        >
          {pending ? "点検しています…" : "声の授業をAIに点検してもらう"}
        </button>
        {!ready && !recording && <span className="text-[12px] text-[#5A5D73]">単元・題を決めて、20字以上話すと点検できます</span>}
      </div>
      {res && (
        <CheckResult
          res={res}
          missing={missing}
          posted={posted}
          onPublish={() => {
            onPublish(res);
            setPosted(true);
          }}
        />
      )}
    </div>
  );
}
