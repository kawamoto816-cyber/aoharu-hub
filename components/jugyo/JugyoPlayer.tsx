"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Figure } from "@/lib/lecture/types";
import type { CastMember, ChapterScene, PauseScene, TalkScene, Who } from "@/lib/jugyo/types";
import { SFX_LEAD_MS, playCorrect, playWrong, unlockSfx } from "@/lib/jugyo/sfx";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import { Avatar } from "./Avatar";

// 止まる授業のプレイヤー（動画のような 16:9 のステージ。スマホ縦では 4:5）。
// つかみ（依頼と謎）→ 節ごとに先生と生徒が話し、黒板に図解 → pause で本当に止まり、答えてから進む → 謎の答え合わせ → 先生役へ。
// 声：public/audio/jugyo/<キー>.mp3 があればそれ（ページが、ある分だけ src を渡す）。無ければブラウザの speechSynthesis（ja-JP）の
// 「仮の声」。それも使えなければ字幕だけで自動送り。
// 「ここで問題」では先生の声で問いと選択肢を読み（読み上げ中でも答えられる。答えたら止める）、答えたあとは「答えとわけ」を読む。

export type PlayerTalk = TalkScene & { speech: string; src: string | null };
/** 読み上げ1つ。text = 字幕バーに出す文（ルビつき）、speech = 読む文 */
export type PlayerClip = { text: string; speech: string; src: string | null };
/** 問題。choices は画面の並び（読み上げの番号の順）にしてある。reply は答えとわけの読み上げ（長ければ null） */
export type PlayerPause = Omit<PauseScene, "say"> & { ask: PlayerClip; reply: PlayerClip | null };
export type PlayerScene = PlayerTalk | PlayerPause | ChapterScene;

export interface PlayerProps {
  unit: string;
  title: string;
  cast: Record<Who, CastMember>;
  scenes: PlayerScene[];
  sections: { heading: string; body: string; figure?: Figure }[];
  mission?: { from: string; request: string; thanks: string };
  mystery?: string;
  reveal?: string;
  credit: string;
  /** 終わりの画面のリンク */
  links: { lecture: string; moshi?: string; oshieru?: string };
}

const CPS = 5; // 字幕だけのときの速さ（1秒に5字＝1分300字）
const SPEEDS = [1, 1.25, 1.5] as const;
const CHAPTER_MS = 1300;
const GAP_MS = { same: 250, change: 120 };

type VoiceMode = "file" | "tts" | "text";

const btnBase = "inline-flex items-center justify-center gap-1.5 rounded-full border-[1.5px] border-[#15172B] font-black active:translate-y-0.5 disabled:opacity-40";
const btn = `${btnBase} min-h-[44px] bg-white px-3.5 text-[14px] text-[#15172B]`;
/** 押してある／押していないで色を変える小さいボタン */
const chip = (on: boolean) => `${btnBase} min-h-[36px] px-2.5 text-[12.5px] ${on ? "bg-[#15172B] text-white" : "bg-white text-[#15172B]"}`;

function textNoRt(el: Element): string {
  let s = "";
  el.childNodes.forEach((n) => {
    if (n.nodeType === 3) s += n.textContent ?? "";
    else if (n instanceof Element && n.tagName !== "RT" && n.tagName !== "RP") s += textNoRt(n);
  });
  return s;
}
const squash = (s: string) => s.replace(/\s+/g, "");

/** 音声ファイルを鳴らす（終わったら onEnd、鳴らせなければ onFail） */
function playFile(a: HTMLAudioElement, src: string, rate: number, onEnd: () => void, onFail: () => void) {
  let failed = false;
  const fail = () => {
    if (failed) return;
    failed = true;
    onFail();
  };
  a.src = src;
  a.playbackRate = rate;
  a.onended = onEnd;
  a.onerror = fail;
  a.play().catch(fail);
}

function setRate(a: HTMLAudioElement | null, rate: number) {
  if (a) a.playbackRate = rate;
}

interface VoiceEnv {
  audio: () => HTMLAudioElement;
  rate: () => number;
  tts: boolean;
  voice: SpeechSynthesisVoice | null;
  setMode: (m: VoiceMode) => void;
}

/** 1つの文を mp3 → 仮の声 → 字幕だけ の順で読む。読み終わったら onEnd（字幕だけのときは字数から見積もった時間のあと）。戻り値を呼ぶと止める */
function speakLine(line: { speech: string; src: string | null; who: Who }, env: VoiceEnv, onEnd: () => void): () => void {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const done = () => !cancelled && onEnd();
  const byText = () => {
    env.setMode("text");
    timer = setTimeout(done, ((line.speech.length / CPS) * 1000 + 300) / env.rate());
  };
  const byTts = () => {
    if (cancelled) return;
    if (!env.tts) return byText();
    env.setMode("tts");
    // 長い文は途中で切れるブラウザがあるので、文ごとに分けて順に読む
    const parts = line.speech.match(/[^。！？!?]+[。！？!?」』）]*/g) ?? [line.speech];
    let n = 0;
    const say = () => {
      if (cancelled) return;
      const u = new SpeechSynthesisUtterance(parts[n]);
      u.lang = "ja-JP";
      if (env.voice) u.voice = env.voice;
      u.rate = Math.min(2, env.rate() * 1.08);
      u.pitch = line.who === "seito" ? 1.3 : 0.85;
      u.onend = () => {
        if (cancelled) return;
        if (++n < parts.length) say();
        else done();
      };
      u.onerror = () => !cancelled && byText();
      window.speechSynthesis.speak(u);
    };
    window.speechSynthesis.cancel();
    say();
  };
  if (line.src) {
    env.setMode("file");
    playFile(env.audio(), line.src, env.rate(), done, byTts);
  } else byTts();
  return () => {
    cancelled = true;
    if (timer) clearTimeout(timer);
    env.audio().pause();
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  };
}

function pickJaVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const vs = window.speechSynthesis.getVoices().filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith("ja"));
  return vs.find((v) => /google|kyoko|otoya|nanami|haruka/i.test(v.name)) ?? vs[0] ?? null;
}

export function JugyoPlayer(p: PlayerProps) {
  const { scenes } = p;
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [subs, setSubs] = useState(true);
  const [mode, setMode] = useState<VoiceMode>("text");
  const [picked, setPicked] = useState<string | null>(null);
  const [ttsOk, setTtsOk] = useState<boolean | null>(null);
  // 問題の読み上げを読み終えたもの（場面の番号:ask/reply）。読み上げ中は先生の口が動く
  const [readDone, setReadDone] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const jaVoice = useRef<SpeechSynthesisVoice | null>(null);
  // 速さは途中で変えても、いまのせりふを最初から読み直さない（mp3 はその場で、仮の声は次の文から）
  const speedRef = useRef<number>(speed);
  const iRef = useRef(i);
  useEffect(() => {
    speedRef.current = speed;
    setRate(audioRef.current, speed);
  }, [speed]);
  useEffect(() => {
    iRef.current = i;
  }, [i]);

  // シークバー：1せりふの長さを字数から見積もる（1分300字）
  const { starts, total, chapters } = useMemo(() => {
    const starts: number[] = [];
    let t = 0;
    const chapters: { at: number; title: string; index: number }[] = [];
    scenes.forEach((s, k) => {
      starts.push(t);
      if (s.kind === "talk") t += s.speech.length / CPS;
      else if (s.kind === "chapter") {
        chapters.push({ at: t, title: s.title, index: k });
        t += CHAPTER_MS / 1000;
      }
    });
    return { starts, total: t, chapters };
  }, [scenes]);

  const scene = scenes[i];
  const voiceEnv = useCallback(
    (): VoiceEnv => ({
      audio: () => (audioRef.current ??= new Audio()),
      rate: () => speedRef.current,
      tts: !!ttsOk,
      voice: jaVoice.current,
      setMode,
    }),
    [ttsOk],
  );
  const chapterNow = [...chapters].reverse().find((c) => c.index <= i);

  // いまの黒板（さかのぼって最後に指定された図・カード）
  const board = useMemo(() => {
    for (let k = i; k >= 0; k--) {
      const s = scenes[k];
      if (s.kind !== "talk") continue;
      if (s.card) return { card: s.card } as const;
      if (s.board) return { section: s.board.section, focus: s.board.focus } as const;
    }
    return { card: "mystery" } as const;
  }, [i, scenes]);

  // いまの話し手（pause・chapter のときは直前のせりふの人）
  const lastTalk = useMemo(() => {
    for (let k = i; k >= 0; k--) {
      const s = scenes[k];
      if (s.kind === "talk") return s;
    }
    return null;
  }, [i, scenes]);

  const next = useCallback(() => {
    setPicked(null);
    setReadDone(null);
    if (iRef.current + 1 >= scenes.length) {
      setPlaying(false);
      setEnded(true);
      return;
    }
    iRef.current += 1;
    setI(iRef.current);
  }, [scenes.length]);

  const go = useCallback((k: number) => {
    setPicked(null);
    setReadDone(null);
    setEnded(false);
    iRef.current = Math.max(0, Math.min(scenes.length - 1, k));
    setI(iRef.current);
  }, [scenes.length]);

  // 再生エンジン：いまの場面を、mp3 → 仮の声 → 字幕だけ の順で流し、終わったら次へ
  useEffect(() => {
    if (!started || !playing || ended) return;
    const s = scenes[i];
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stop: (() => void) | undefined;
    const after = (ms: number) => {
      timer = setTimeout(() => !cancelled && next(), ms / speedRef.current);
    };
    const nextWho = (() => {
      const n = scenes[i + 1];
      return n?.kind === "talk" ? n.who : null;
    })();
    const gap = s.kind === "talk" && nextWho && nextWho !== s.who ? GAP_MS.change : GAP_MS.same;

    if (s.kind === "chapter") after(CHAPTER_MS);
    else if (s.kind === "pause") {
      // 本当に止まる：答えてから「続きを再生」（問題の読み上げは下の effect）
      timer = setTimeout(() => !cancelled && setPlaying(false), 0);
    } else stop = speakLine(s, voiceEnv(), () => after(gap));
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      stop?.();
    };
  }, [i, playing, started, ended, scenes, next, voiceEnv]);

  // 問題の読み上げ：止まったら問いと選択肢を、答えたら答えとわけを（読み上げ中に答えたら、問いの読み上げは止める）
  const pauseClip = started && !ended && scene.kind === "pause" ? (picked === null ? scene.ask : scene.reply) : null;
  const pauseTag = `${i}:${picked === null ? "ask" : "reply"}`;
  // 選択肢の問題に答えたときは、効果音（ピンポーン／ブー）が鳴り終わるのを少し待ってから答えを読む
  const sfxLead = scene.kind === "pause" && scene.choices && picked ? (picked === scene.answer ? SFX_LEAD_MS.correct : SFX_LEAD_MS.wrong) : 0;
  useEffect(() => {
    if (!pauseClip) return;
    let stop: (() => void) | undefined;
    const t = setTimeout(() => {
      stop = speakLine({ ...pauseClip, who: "sensei" }, voiceEnv(), () => setReadDone(pauseTag));
    }, sfxLead);
    return () => {
      clearTimeout(t);
      stop?.();
    };
  }, [pauseClip, pauseTag, voiceEnv, sfxLead]);
  const reading = !!pauseClip && readDone !== pauseTag;

  // 図の中の強調（focus の字をふくむいちばん内側の箱に枠をつける）
  useEffect(() => {
    const root = boardRef.current;
    if (!root) return;
    root.querySelectorAll(".jugyo-focus").forEach((el) => el.classList.remove("jugyo-focus"));
    if (!("focus" in board) || !board.focus) return;
    const want = squash(board.focus);
    const fig = root.querySelector("figure");
    if (!fig) return;
    const all = [...fig.querySelectorAll("*")].filter((el) => !["RT", "RP", "svg"].includes(el.tagName) && !el.closest("figcaption") && squash(textNoRt(el)).includes(want));
    let deep = all.filter((el) => !all.some((o) => o !== el && el.contains(o)));
    const exact = deep.filter((el) => squash(textNoRt(el)) === want);
    if (exact.length) deep = exact;
    for (const d of deep) {
      const box = d.parentElement?.closest("[class*='border']");
      const target = box && box !== fig && fig.contains(box) && squash(textNoRt(box)).length < want.length + 40 ? box : d;
      target.classList.add("jugyo-focus");
    }
    const first = root.querySelector(".jugyo-focus");
    if (first) {
      const r = first.getBoundingClientRect();
      const c = root.getBoundingClientRect();
      if (r.top < c.top || r.bottom > c.bottom) root.scrollTo({ top: root.scrollTop + r.top - c.top - c.height / 3, behavior: "smooth" });
    }
  }, [board]);

  // 黒板の図が変わったら上へ
  const boardKey = "card" in board ? `card-${board.card}` : `s${board.section}`;
  useEffect(() => {
    boardRef.current?.scrollTo({ top: 0 });
  }, [boardKey]);

  async function start() {
    unlockSfx();
    let ok = false;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // iPhone などは、ボタンを押したその場で一度 speak しないと、あとで声が出ない
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
      jaVoice.current = pickJaVoice();
      if (!jaVoice.current) {
        await new Promise<void>((res) => {
          const t = setTimeout(res, 1200);
          window.speechSynthesis.onvoiceschanged = () => {
            clearTimeout(t);
            res();
          };
        });
        jaVoice.current = pickJaVoice();
      }
      ok = !!jaVoice.current;
    }
    setTtsOk(ok);
    setStarted(true);
    setPlaying(true);
  }

  function toggle() {
    if (!started) return void start();
    if (ended) {
      go(0);
      setPlaying(true);
      return;
    }
    if (scene.kind === "pause") return;
    setPlaying((v) => !v);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || (e.target as HTMLElement)?.closest("input,textarea,button,select")) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const nowT = ended ? total : starts[i] ?? 0;
  const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
  const seek = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    let t: number;
    if ("clientX" in e) {
      const r = e.currentTarget.getBoundingClientRect();
      t = ((e.clientX - r.left) / r.width) * total;
    } else {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      t = nowT + (e.key === "ArrowRight" ? 10 : -10);
    }
    let k = 0;
    for (let n = 0; n < starts.length; n++) if (starts[n] <= t) k = n;
    go(k);
  };

  const talk = scene.kind === "talk" ? scene : null;
  const speaker = lastTalk?.who ?? "sensei";

  return (
    <div>
      <style>{`
        @keyframes jugyo-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
        @keyframes jugyo-mouth { from { transform: scaleY(0.35) } to { transform: scaleY(1) } }
        @keyframes jugyo-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(217,52,31,.55) } 50% { box-shadow: 0 0 0 7px rgba(217,52,31,0) } }
        .jugyo-focus { outline: 3px solid #D9341F !important; outline-offset: 2px; border-radius: 8px; animation: jugyo-pulse 1.1s ease-in-out 3; position: relative; z-index: 1; }
        .jugyo-board figure { margin-top: 0 !important; }
        .jugyo-sub mark { background: none; color: #FFE45C; }
        [class*="jugyo-bob"], [class*="jugyo-mouth"] { transform-box: fill-box; transform-origin: center; }
      `}</style>

      {/* ステージ */}
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[960px] overflow-hidden rounded-[18px] border-[1.5px] border-[#15172B] bg-[#1E5A46] shadow-[4px_4px_0_#15172B] sm:aspect-video">
        {/* 上の帯：チャプター・声の種類 */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 px-3 py-2 text-[12px] font-black text-white/90">
          <span className="truncate">{chapterNow ? chapterNow.title : ""}</span>
          <span className="ml-auto flex-none">
            {started && !ended && mode === "tts" && <span className="rounded-full bg-white/15 px-2 py-0.5">仮の声で再生中</span>}
            {started && !ended && mode === "text" && <span className="rounded-full bg-white/15 px-2 py-0.5">字幕だけで自動送り</span>}
            {started && !ended && mode === "file" && <span className="rounded-full bg-white/15 px-2 py-0.5">{p.credit}</span>}
          </span>
        </div>

        {/* 黒板（図解） */}
        <div ref={boardRef} className={`jugyo-board absolute inset-x-2 top-9 overflow-y-auto rounded-[12px] bg-[#F7F6F1] p-3 sm:inset-x-4 sm:p-4 ${subs ? "bottom-[118px] sm:bottom-[104px]" : "bottom-[64px]"}`}>
          {"card" in board ? (
            board.card === "mystery" ? (
              <div className="mx-auto max-w-[640px]">
                {p.mission && (
                  <p className="m-0 text-[12px] font-black text-[#1533B8]">
                    依頼人：<Rich text={p.mission.from} />
                  </p>
                )}
                {p.mission && (
                  <p className="m-0 mt-1.5 text-[14px] leading-relaxed">
                    <Rich text={p.mission.request} />
                  </p>
                )}
                {p.mystery && (
                  <div className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3">
                    <p className="m-0 text-[12px] font-black text-[#B42318]">今日の謎</p>
                    <p className="m-0 mt-1 text-[15px] font-bold leading-relaxed">
                      <Rich text={p.mystery} />
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mx-auto max-w-[640px]">
                <p className="m-0 text-[12px] font-black text-[#B42318]">謎の答え</p>
                {p.reveal && (
                  <p className="m-0 mt-1.5 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3 text-[15px] font-bold leading-relaxed">
                    <Rich text={p.reveal} />
                  </p>
                )}
                {p.mission && (
                  <p className="m-0 mt-3 text-[13px] leading-relaxed text-[#3A3D55]">
                    <span className="font-black">{<Rich text={p.mission.from} />}より：</span>
                    <Rich text={p.mission.thanks} />
                  </p>
                )}
              </div>
            )
          ) : (
            <div className="mx-auto max-w-[680px]">
              <p className="m-0 mb-2 flex items-start gap-2 text-[14px] font-black leading-snug">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-[7px] bg-[#15172B] text-[12px] text-white">{board.section + 1}</span>
                <Rich text={p.sections[board.section]?.heading ?? ""} />
              </p>
              {p.sections[board.section]?.figure ? (
                <LectureFigure fig={p.sections[board.section].figure!} no={board.section + 1} />
              ) : (
                <p className="m-0 rounded-[12px] border-l-4 border-[#FFE45C] bg-[#FFFBE6] px-3 py-2 text-[14px] font-bold leading-[1.8]">
                  <Rich text={p.sections[board.section]?.body ?? ""} />
                </p>
              )}
            </div>
          )}
        </div>

        {/* 字幕と話し手 */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end gap-2.5 bg-[#15172B]/92 px-3 py-2.5 sm:px-4">
          <Avatar who={pauseClip ? "sensei" : speaker} talking={(playing && !!talk) || reading} size={44} />
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[11px] font-black text-[#FFE45C]">{p.cast[pauseClip ? "sensei" : speaker].name}</p>
            {subs && (
              <p aria-live="polite" className="jugyo-sub m-0 mt-0.5 line-clamp-4 text-[14.5px] font-bold leading-[1.6] text-white sm:text-[16px]">
                {pauseClip ? <Rich text={pauseClip.text} /> : lastTalk ? <Rich text={lastTalk.text} /> : ""}
              </p>
            )}
          </div>
        </div>

        {/* チャプターのタイトル */}
        {started && scene.kind === "chapter" && !ended && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#15172B]/55">
            <p className="m-0 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-5 py-3 text-[18px] font-black text-[#15172B] shadow-[3px_3px_0_#15172B]">{scene.title}</p>
          </div>
        )}

        {/* 止まる：問題カード */}
        {started && scene.kind === "pause" && !ended && (
          <PauseCard key={i} q={scene} picked={picked} setPicked={(v) => {
            if (scene.choices && v) (v === scene.answer ? playCorrect : playWrong)();
            setPicked(v);
          }} onNext={() => { next(); setPlaying(true); }} sensei={p.cast.sensei.name} />
        )}

        {/* はじめの画面 */}
        {!started && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-[#15172B]/80 p-4 text-center text-white">
            <p className="m-0 text-[12px] font-black text-[#FFE45C]">止まる授業（試作）</p>
            <p className="m-0 max-w-[560px] text-[19px] font-black leading-snug sm:text-[22px]">
              <Rich text={p.title} />
            </p>
            <div className="flex items-center gap-4">
              {(["sensei", "seito"] as const).map((w) => (
                <span key={w} className="flex items-center gap-1.5 text-[12px] font-bold">
                  <Avatar who={w} size={36} />
                  {p.cast[w].name}
                </span>
              ))}
            </div>
            <button type="button" onClick={start} className="mt-1 inline-flex min-h-[52px] items-center gap-2 rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-6 text-[17px] font-black text-[#15172B] shadow-[3px_3px_0_#000]">
              ▶ 授業をはじめる
            </button>
            <p className="m-0 max-w-[480px] text-[12px] leading-relaxed text-white/80">約{Math.round(total / 60)}分。とちゅうで先生が止まって問題を出します。答えてから続きへ進みます。</p>
          </div>
        )}

        {/* 終わりの画面 */}
        {ended && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2.5 overflow-y-auto bg-[#15172B]/90 p-4 text-center text-white">
            <p className="m-0 text-[12px] font-black text-[#FFE45C]">授業はここまで</p>
            <p className="m-0 text-[20px] font-black">次は、あなたが先生役に</p>
            <p className="m-0 max-w-[460px] text-[13px] leading-relaxed text-white/85">今日の話を、自分のことばで説明できたら本物です。</p>
            <div className="mt-1 grid w-full max-w-[420px] gap-2">
              <a href="#jugyo-koe" className="flex min-h-[46px] items-center justify-between rounded-[12px] bg-[#FFE45C] px-4 text-[15px] font-black text-[#15172B] no-underline">
                <span>声で説明する</span>
                <span aria-hidden="true">↓</span>
              </a>
              {p.links.oshieru && (
                <Link href={p.links.oshieru} className="flex min-h-[46px] items-center justify-between rounded-[12px] bg-white px-4 text-[15px] font-black text-[#15172B] no-underline">
                  <span>オシエルで教えてみる</span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}
              {p.links.moshi && (
                <Link href={p.links.moshi} className="flex min-h-[46px] items-center justify-between rounded-[12px] bg-white px-4 text-[15px] font-black text-[#15172B] no-underline">
                  <span>単元模試にチャレンジ</span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}
              <Link href={p.links.lecture} className="flex min-h-[46px] items-center justify-between rounded-[12px] border-[1.5px] border-white/50 px-4 text-[14px] font-black text-white no-underline">
                <span>図解の教科書で読み直す</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <button type="button" onClick={() => { go(0); setPlaying(true); }} className="mt-1 text-[12px] font-bold text-white/80 underline">
              最初から見る
            </button>
          </div>
        )}
      </div>

      {/* 操作 */}
      <div className="mx-auto mt-3 w-full max-w-[960px]">
        <div
          role="slider"
          tabIndex={0}
          aria-label="授業の再生位置"
          aria-valuemin={0}
          aria-valuemax={Math.round(total)}
          aria-valuenow={Math.round(nowT)}
          aria-valuetext={`${mmss(nowT)}／${mmss(total)}${chapterNow ? `　${chapterNow.title}` : ""}`}
          onClick={seek}
          onKeyDown={seek}
          className="relative h-6 cursor-pointer"
        >
          <div className="absolute inset-x-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-[#E4E2D8]" />
          <div className="absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-[#1533B8]" style={{ width: `${(nowT / total) * 100}%` }} />
          {chapters.map((c) => (
            <span key={c.index} title={c.title} className="absolute top-1/2 h-[14px] w-[3px] -translate-y-1/2 rounded-full bg-[#15172B]" style={{ left: `${(c.at / total) * 100}%` }} />
          ))}
          {scenes.map((s, k) =>
            s.kind === "pause" ? (
              <span key={k} title="ここで問題" className="absolute top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 border-[1.5px] border-[#15172B] bg-[#FFE45C]" style={{ left: `${(starts[k] / total) * 100}%` }} />
            ) : null,
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => go(i - 1)} disabled={!started || i === 0} className={btn} aria-label="ひとつ前のせりふ">
            ⏮
          </button>
          <button type="button" onClick={toggle} disabled={started && !ended && scene.kind === "pause"} className={`${btnBase} min-h-[44px] min-w-[104px] bg-[#FFE45C] px-3.5 text-[14px] text-[#15172B]`}>
            {!started ? "▶ 再生" : ended ? "↻ もう一度" : playing ? "⏸ 一時停止" : "▶ 再生"}
          </button>
          <button type="button" onClick={() => go(i + 1)} disabled={!started || i >= scenes.length - 1 || scene.kind === "pause"} className={btn} aria-label="次のせりふ">
            ⏭
          </button>
          <span className="text-[13px] font-bold tabular-nums text-[#3A3D55]">
            {mmss(nowT)} / {mmss(total)}
          </span>
          <span className="ml-auto flex items-center gap-1" role="group" aria-label="速さ">
            {SPEEDS.map((s) => (
              <button key={s} type="button" aria-pressed={speed === s} onClick={() => setSpeed(s)} className={chip(speed === s)}>
                {s === 1 ? "1.0" : String(s)}×
              </button>
            ))}
          </span>
          <button type="button" aria-pressed={subs} onClick={() => setSubs((v) => !v)} className={chip(subs)}>
            字幕 {subs ? "オン" : "オフ"}
          </button>
        </div>
        <ol className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0">
          {chapters.map((c) => (
            <li key={c.index}>
              <button
                type="button"
                onClick={() => {
                  go(c.index);
                  if (!started) void start();
                }}
                className={`rounded-full border-[1.5px] border-[#15172B] px-2.5 py-1 text-[12px] font-bold ${chapterNow?.index === c.index && started ? "bg-[#FFE45C]" : "bg-white"}`}
              >
                {c.title}
              </button>
            </li>
          ))}
        </ol>
        {ttsOk === false && started && <p className="m-0 mt-2 text-[12px] text-[#3A3D55]">このブラウザでは声が使えないので、字幕だけで自動で進みます。</p>}
      </div>
    </div>
  );
}

function PauseCard({ q, picked, setPicked, onNext, sensei }: { q: PlayerPause; picked: string | null; setPicked: (v: string) => void; onNext: () => void; sensei: string }) {
  const choices = q.choices ?? null;
  const done = picked !== null;
  const right = picked === q.answer;
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto bg-[#15172B]/70 p-3">
      <div role="dialog" aria-label="ここで問題" className="w-full max-w-[560px] rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 flex items-center gap-2 text-[12px] font-black text-[#B42318]">
          <Avatar who="sensei" size={28} />
          {sensei}が止まりました　ここで問題
        </p>
        <p className="m-0 mt-2 text-[16px] font-black leading-relaxed">
          <Rich text={q.question} />
        </p>
        {choices ? (
          <div className="mt-3 grid gap-2">
            {choices.map((c, n) => {
              const isAns = c === q.answer;
              const cls = !done ? "bg-white hover:bg-[#FFFBE6]" : isAns ? "bg-[#1533B8] text-white" : c === picked ? "bg-[#F7F6F1] text-[#B42318] line-through" : "bg-white opacity-60";
              return (
                <button key={c} type="button" disabled={done} onClick={() => setPicked(c)} className={`flex min-h-[48px] items-start gap-2 rounded-[12px] border-[1.5px] border-[#15172B] px-3 py-2 text-left text-[15px] font-bold leading-snug ${cls}`}>
                  <span aria-hidden="true" className="flex-none font-black tabular-nums">{n + 1}.</span>
                  <span>
                    <Rich text={c} />
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          !done && (
            <button type="button" onClick={() => setPicked("")} className="mt-3 min-h-[48px] w-full rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 text-[15px] font-black">
              答えを考えたら次へ
            </button>
          )
        )}
        {done && (
          <div className="mt-3 rounded-[12px] bg-[#FFFBE6] px-3 py-2.5">
            {choices && <p className={`m-0 text-[14px] font-black ${right ? "text-[#1533B8]" : "text-[#B42318]"}`}>{right ? "正解！" : "おしい。正しくは："}</p>}
            <p className="m-0 mt-0.5 text-[15px] font-black">
              答え：<Rich text={q.answer} />
            </p>
            <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">
              <Rich text={q.why} />
            </p>
            <button type="button" onClick={onNext} autoFocus className="mt-3 inline-flex min-h-[46px] items-center gap-2 rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-5 text-[15px] font-black">
              ▶ 続きを再生
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
