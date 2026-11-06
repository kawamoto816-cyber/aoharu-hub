"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { emptyRecord, loadRecord, saveRecord, type EigaRecord } from "@/lib/eiga/record";
import type { EigaFilm, EigaLine, EigaMode, SubMode } from "@/lib/eiga/types";
import { LinePanel } from "./LinePanel";
import { MODE_NAME, RecordBar } from "./RecordBar";

// 名作映画で学ぶ英語のプレイヤー（試作）。映画の再生そのものが「止まる授業」になる。
// ①鑑賞：字幕なし・止まらない ②完全解説：1行ごとに自動で止まり、英文・日本語訳・解説を出す（「次へ」で続き）
// ③字幕で反復：英語／英日／日本語／なし を切りかえ。
// ボタン：再生・一時停止、速さ 1／0.75／0.5、この行をくり返す（A-B ループ、回数つき）、前の行・次の行、このセリフを覚えた。
// キーボード：スペース＝再生・一時停止、←→＝前の行・次の行（鑑賞では5秒もどる・すすむ）、R＝この行をくり返す。
// 今どの行かは video の timeupdate と、再生中の requestAnimationFrame の両方で決める（timeupdate だけだと 4回／秒ほどで粗い）。
// 「最後まで見た」は、そのモードで試作の範囲（sampleEnd か動画の終わり）の8割以上を見て終わりまで来たとき +1。

const SPEEDS = [1, 0.75, 0.5] as const;
const LOOP_COUNTS = [3, 5, 10] as const;
const BUCKET = 5; // 見た所を5秒ごとに記録
const WATCHED_RATIO = 0.8;
const SUB_NAME: Record<SubMode, string> = { en: "英語", enja: "英日", ja: "日本語", off: "なし" };

const btnBase = "inline-flex items-center justify-center gap-1.5 rounded-full border-[1.5px] border-[#15172B] font-black active:translate-y-0.5 disabled:opacity-40";
const btn = `${btnBase} min-h-[48px] bg-white px-4 text-[14.5px] text-[#15172B]`;
const btnMain = `${btnBase} min-h-[48px] bg-[#1533B8] px-5 text-[15px] text-white`;
const chip = (on: boolean) => `${btnBase} min-h-[40px] px-3 text-[13px] ${on ? "bg-[#15172B] text-white" : "bg-white text-[#15172B]"}`;

/** t を含む行（なければ -1） */
function lineAt(lines: EigaLine[], t: number): number {
  let lo = 0;
  let hi = lines.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (lines[mid].end <= t) lo = mid + 1;
    else if (lines[mid].start > t) hi = mid - 1;
    else return mid;
  }
  return -1;
}
/** start が t 以下の最後の行（なければ -1） */
function lineBefore(lines: EigaLine[], t: number): number {
  let k = -1;
  for (let j = 0; j < lines.length && lines[j].start <= t; j++) k = j;
  return k;
}
/** end が t より後の最初の行（完全解説で次に止まる行） */
const firstEndingAfter = (lines: EigaLine[], t: number) => {
  const k = lines.findIndex((l) => l.end > t + 0.05);
  return k < 0 ? lines.length : k;
};
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

type Loop = { idx: number; left: number };

export function EigaPlayer({ film }: { film: EigaFilm }) {
  const { lines } = film;
  const hasLines = lines.length > 0;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setModeState] = useState<EigaMode>("kansho");
  const [sub, setSub] = useState<SubMode>("en");
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cur, setCur] = useState(-1);
  /** 完全解説で止まっている行 */
  const [held, setHeld] = useState<number | null>(null);
  const [loop, setLoopState] = useState<Loop | null>(null);
  const [loopN, setLoopN] = useState<(typeof LOOP_COUNTS)[number]>(3);
  const [finished, setFinished] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [record, setRecord] = useState<EigaRecord>(emptyRecord);

  const modeRef = useRef(mode);
  const loopRef = useRef<Loop | null>(null);
  const nextStopRef = useRef(0);
  const watched = useRef(new Set<number>());
  const counted = useRef(false);

  useEffect(() => {
    // 記録はブラウザにしかないので、表示のあとに読む
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecord(loadRecord(film.id));
  }, [film.id]);

  const updateRecord = useCallback(
    (f: (r: EigaRecord) => EigaRecord) => {
      setRecord((r) => {
        const next = f(r);
        saveRecord(film.id, next);
        return next;
      });
    },
    [film.id],
  );

  const setLoop = (l: Loop | null) => {
    loopRef.current = l;
    setLoopState(l);
  };

  const endAt = duration > 0 ? Math.min(film.sampleEnd, duration) : film.sampleEnd;
  const endRef = useRef(endAt);
  useEffect(() => {
    endRef.current = endAt;
  }, [endAt]);

  /** 試作の範囲の終わりまで来た */
  const finish = useCallback(() => {
    const v = videoRef.current;
    v?.pause();
    const need = Math.ceil(endRef.current / BUCKET) * WATCHED_RATIO;
    if (!counted.current && watched.current.size >= need) {
      counted.current = true;
      const m = modeRef.current;
      updateRecord((r) => ({ ...r, views: { ...r.views, [m]: r.views[m] + 1 } }));
    }
    setFinished(Date.now());
  }, [updateRecord]);

  /** 再生位置から、今の行・ループ・完全解説の停止・終わりを決める */
  const tick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const now = v.currentTime;
    const L = loopRef.current;
    if (L && !v.paused) {
      const ln = lines[L.idx];
      if (now >= ln.end) {
        if (L.left > 1) {
          setLoop({ idx: L.idx, left: L.left - 1 });
          v.currentTime = ln.start;
          return;
        }
        setLoop(null);
        if (modeRef.current === "kaisetsu") {
          v.pause();
          setHeld(L.idx);
          nextStopRef.current = L.idx + 1;
        }
      }
    } else if (modeRef.current === "kaisetsu" && !v.paused) {
      const k = nextStopRef.current;
      if (k < lines.length && now >= lines[k].end) {
        v.pause();
        setHeld(k);
        nextStopRef.current = k + 1;
      }
    }
    if (!v.paused) watched.current.add(Math.floor(now / BUCKET));
    if (!v.paused && now >= endRef.current - 0.05) finish();
    setCur(lineAt(lines, now));
    setT(now);
  }, [lines, finish]);

  // 再生中は毎フレーム tick
  useEffect(() => {
    if (!playing) return;
    let id = 0;
    const loopFn = () => {
      tick();
      id = requestAnimationFrame(loopFn);
    };
    id = requestAnimationFrame(loopFn);
    return () => cancelAnimationFrame(id);
  }, [playing, tick]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  }, [speed]);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime >= endRef.current - 0.1) {
      // 終わりからもう一度
      v.currentTime = 0;
      watched.current.clear();
      counted.current = false;
      nextStopRef.current = 0;
    }
    setFinished(null);
    setHeld(null);
    v.play().catch(() => setError(true));
  }, []);
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) play();
    else v.pause();
  }, [play]);

  const seek = useCallback(
    (to: number, thenPlay: boolean) => {
      const v = videoRef.current;
      if (!v) return;
      const x = Math.max(0, Math.min(to, endRef.current - 0.2));
      v.currentTime = x;
      nextStopRef.current = firstEndingAfter(lines, x);
      setHeld(null);
      setFinished(null);
      setCur(lineAt(lines, x));
      setT(x);
      if (thenPlay) v.play().catch(() => setError(true));
    },
    [lines],
  );

  /** ボタンの対象になる行：止まっている行 → 今の行 → 直前に始まった行 */
  const target = held ?? (cur >= 0 ? cur : lineBefore(lines, t));

  const goLine = useCallback(
    (dir: -1 | 1) => {
      if (!hasLines) return;
      const v = videoRef.current;
      if (!v) return;
      setLoop(null);
      const now = v.currentTime;
      let k: number;
      if (held !== null) k = held + dir;
      else {
        const c = lineBefore(lines, now);
        if (dir === 1) k = c + 1;
        else k = c >= 0 && now - lines[c].start > 1 ? c : c - 1;
      }
      k = Math.max(0, Math.min(lines.length - 1, k));
      seek(lines[k].start - 0.15, true);
    },
    [hasLines, held, lines, seek],
  );

  const toggleLoop = useCallback(() => {
    if (!hasLines) return;
    if (loopRef.current) {
      setLoop(null);
      return;
    }
    const k = target;
    if (k < 0) return;
    seek(lines[k].start - 0.1, true);
    setLoop({ idx: k, left: loopN });
  }, [hasLines, lines, loopN, seek, target]);

  const memorizedSet = useMemo(() => new Set(record.memorized), [record.memorized]);
  const toggleMemorized = (k: number) => {
    const id = lines[k]?.id;
    if (!id) return;
    updateRecord((r) => ({ ...r, memorized: r.memorized.includes(id) ? r.memorized.filter((x) => x !== id) : [...r.memorized, id] }));
  };

  const setMode = (m: EigaMode) => {
    if (m === mode) return;
    modeRef.current = m;
    setModeState(m);
    setLoop(null);
    setHeld(null);
    setFinished(null);
    // 視聴回数はモードごとに数えるので、見た所の記録もモードを変えたら新しく始める
    watched.current.clear();
    counted.current = false;
    const v = videoRef.current;
    nextStopRef.current = firstEndingAfter(lines, v?.currentTime ?? 0);
  };

  // キーボード
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const v = videoRef.current;
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const dir = e.key === "ArrowLeft" ? -1 : 1;
        if (modeRef.current === "kansho" || !hasLines) {
          if (v) seek(v.currentTime + dir * 5, !v.paused);
        } else goLine(dir);
      } else if ((e.key === "r" || e.key === "R") && modeRef.current !== "kansho") {
        e.preventDefault();
        toggleLoop();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goLine, hasLines, seek, toggleLoop, togglePlay]);

  const inSong = film.songs.some((s) => t >= s.start && t < s.end);
  const curLine = cur >= 0 ? lines[cur] : null;
  const showSub = mode === "hanpuku" && sub !== "off" && (curLine || inSong);
  const panelLine = mode === "kaisetsu" ? (held !== null ? lines[held] : !playing && target >= 0 ? lines[target] : null) : null;
  // 書き起こしを直して id が消えた行は数えない
  const memorizedCount = lines.filter((l) => memorizedSet.has(l.id)).length;
  const targetLine = target >= 0 ? lines[target] : null;

  return (
    <div className="w-full max-w-[820px]">
      {/* モード */}
      <div role="tablist" aria-label="見方" className="grid grid-cols-3 gap-1.5">
        {(Object.keys(MODE_NAME) as EigaMode[]).map((m, n) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`${chip(mode === m)} min-h-[48px] flex-col gap-0 rounded-[12px] px-1 leading-tight`}>
            <span className="text-[11px] font-bold opacity-80">{["①", "②", "③"][n]}</span>
            <span className="text-[13.5px] sm:text-[14.5px]">{MODE_NAME[m]}</span>
          </button>
        ))}
      </div>
      <p className="m-0 mt-2 text-[12.5px] leading-relaxed text-[#3A3D55]">
        {mode === "kansho" && "1回目は字幕なしで、止めずに物語を楽しみます。"}
        {mode === "kaisetsu" && "セリフが1つ終わるたびに止まり、英文・日本語訳・言い回しの解説が出ます。「次へ」で続きから。"}
        {mode === "hanpuku" && "字幕をつけて何度も見て、セリフを口に出してまねします。覚えたら「このセリフを覚えた」を。"}
      </p>

      {/* 映像 */}
      <div className="relative mt-3 overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-black">
        <video
          ref={videoRef}
          src={film.videoSrc}
          preload="metadata"
          playsInline
          className="block aspect-[4/3] w-full bg-black"
          onPlay={() => setPlaying(true)}
          onPause={() => {
            setPlaying(false);
            tick();
          }}
          onTimeUpdate={tick}
          onSeeked={() => {
            const v = videoRef.current;
            if (v) nextStopRef.current = firstEndingAfter(lines, v.currentTime);
            tick();
          }}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration || 0);
            e.currentTarget.playbackRate = speed;
            setError(false);
          }}
          onEnded={finish}
          onError={() => setError(true)}
          onClick={togglePlay}
        />
        {showSub && (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-3">
            <div className="max-w-[92%] rounded-[8px] bg-black/75 px-3 py-1.5 text-center text-white">
              {inSong && !curLine ? (
                <p className="m-0 text-[15px] font-bold sm:text-[20px]">（歌）</p>
              ) : (
                curLine && (
                  <>
                    {(sub === "en" || sub === "enja") && (
                      <p lang="en" className="m-0 text-[15px] font-bold leading-snug sm:text-[21px]">
                        {curLine.en}
                      </p>
                    )}
                    {(sub === "ja" || sub === "enja") && <p className="m-0 text-[13px] leading-snug sm:text-[17px]">{curLine.ja}</p>}
                  </>
                )
              )}
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-4 text-center text-[14px] font-bold text-white">
            映像を読み込めませんでした。通信の状態を確かめて、ページを読みなおしてください。
          </div>
        )}
        {finished !== null && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/75 p-4 text-center text-white">
            <p className="m-0 text-[16px] font-black">試作はここまで（最初の約{Math.round(film.sampleEnd / 60)}分）</p>
            <p className="m-0 text-[13px]">{MODE_NAME[mode]}で見た回数：{record.views[mode]}回</p>
            <button type="button" onClick={play} className={`${btnBase} min-h-[48px] bg-white px-5 text-[15px] text-[#15172B]`}>
              もう一度、最初から
            </button>
          </div>
        )}
      </div>

      {/* 位置 */}
      <div className="mt-2 flex items-center gap-2 text-[12px] font-bold tabular-nums text-[#3A3D55]">
        <span>{fmt(t)}</span>
        <input
          type="range"
          min={0}
          max={endAt}
          step={0.1}
          value={Math.min(t, endAt)}
          onChange={(e) => seek(Number(e.target.value), playing)}
          aria-label="再生位置"
          className="h-6 flex-1 accent-[#1533B8]"
        />
        <span>{fmt(endAt)}</span>
      </div>

      {/* 操作 */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {mode === "kaisetsu" && held !== null ? (
          <button type="button" onClick={play} className={btnMain}>
            次へ ▶
          </button>
        ) : (
          <button type="button" onClick={togglePlay} className={btnMain} aria-label={playing ? "一時停止" : "再生"}>
            {playing ? "❚❚ 一時停止" : "▶ 再生"}
          </button>
        )}
        {mode !== "kansho" && (
          <>
            <button type="button" onClick={() => goLine(-1)} disabled={!hasLines} className={btn} aria-label="前の行">
              ◀ 前の行
            </button>
            <button type="button" onClick={() => goLine(1)} disabled={!hasLines} className={btn} aria-label="次の行">
              次の行 ▶
            </button>
          </>
        )}
        <span className="ml-auto inline-flex items-center gap-1" role="group" aria-label="速さ">
          {SPEEDS.map((s) => (
            <button key={s} type="button" onClick={() => setSpeed(s)} aria-pressed={speed === s} className={chip(speed === s)}>
              {s === 1 ? "1倍" : `${s}倍`}
            </button>
          ))}
        </span>
      </div>

      {mode !== "kansho" && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button type="button" onClick={toggleLoop} disabled={!hasLines || (!loop && target < 0)} aria-pressed={loop !== null} className={loop ? `${btnBase} min-h-[48px] bg-[#15172B] px-4 text-[14.5px] text-white` : btn}>
            {loop ? `くり返し中（あと${loop.left}回）・やめる` : "↻ この行をくり返す"}
          </button>
          <span className="inline-flex items-center gap-1" role="group" aria-label="くり返す回数">
            {LOOP_COUNTS.map((n) => (
              <button key={n} type="button" onClick={() => setLoopN(n)} aria-pressed={loopN === n} className={chip(loopN === n)}>
                {n}回
              </button>
            ))}
          </span>
          <button
            type="button"
            onClick={() => toggleMemorized(target)}
            disabled={!targetLine}
            aria-pressed={targetLine ? memorizedSet.has(targetLine.id) : false}
            className={targetLine && memorizedSet.has(targetLine.id) ? `${btnBase} min-h-[48px] bg-[#1E5A46] px-4 text-[14.5px] text-white` : btn}
          >
            {targetLine && memorizedSet.has(targetLine.id) ? "✓ 覚えた" : "このセリフを覚えた"}
          </button>
        </div>
      )}

      {mode === "hanpuku" && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5" role="group" aria-label="字幕">
          <span className="mr-1 text-[12.5px] font-black text-[#3A3D55]">字幕</span>
          {(Object.keys(SUB_NAME) as SubMode[]).map((s) => (
            <button key={s} type="button" onClick={() => setSub(s)} aria-pressed={sub === s} className={chip(sub === s)}>
              {SUB_NAME[s]}
            </button>
          ))}
        </div>
      )}

      <p className="m-0 mt-2 hidden text-[11.5px] text-[#3A3D55] sm:block">
        キーボード：スペース＝再生・一時停止　←→＝{mode === "kansho" ? "5秒もどる・すすむ" : "前の行・次の行"}
        {mode !== "kansho" && "　R＝この行をくり返す"}
      </p>

      {mode === "kaisetsu" && hasLines && (
        <section aria-live="polite" aria-label="このセリフの解説" className="mt-3 min-h-[120px] rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-3.5 py-3">
          {panelLine ? (
            <LinePanel line={panelLine} memorized={memorizedSet.has(panelLine.id)} />
          ) : (
            <p className="m-0 text-[13.5px] text-[#3A3D55]">{playing ? "聞いてみましょう。セリフが終わると止まって解説が出ます。" : "▶ 再生で始めます。"}</p>
          )}
        </section>
      )}

      {mode === "hanpuku" && hasLines && (
        <section aria-label="セリフの一覧" className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-2 py-2">
          <p className="m-0 px-1.5 pb-1 text-[12.5px] font-black text-[#1533B8]">セリフの一覧（押すとそこから）</p>
          <ol className="m-0 max-h-[320px] list-none overflow-y-auto p-0">
            {lines.map((l, k) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => seek(l.start - 0.15, true)}
                  aria-current={k === cur ? "true" : undefined}
                  className={`flex w-full items-start gap-2 rounded-[8px] px-1.5 py-2 text-left ${k === cur ? "bg-[#E8ECFB]" : "hover:bg-[#F7F6F1]"}`}
                >
                  <span className="w-[40px] shrink-0 pt-0.5 text-[11px] font-bold tabular-nums text-[#3A3D55]">{fmt(l.start)}</span>
                  <span className="min-w-0 flex-1">
                    <span lang="en" className="block text-[14px] font-bold leading-snug">
                      {l.en}
                    </span>
                    <span className="block text-[12px] leading-snug text-[#3A3D55]">
                      {l.speaker}
                      {l.keep && "・暗唱のおすすめ"}
                    </span>
                  </span>
                  {memorizedSet.has(l.id) && <span className="shrink-0 text-[12px] font-black text-[#1E5A46]">✓ 覚えた</span>}
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="mt-4">
        <RecordBar record={record} memorizedCount={memorizedCount} lineCount={lines.length} />
      </div>
      <p className="m-0 mt-2 text-[11.5px] text-[#3A3D55]">{film.videoCredit}</p>
    </div>
  );
}
