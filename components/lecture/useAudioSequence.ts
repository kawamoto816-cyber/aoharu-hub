"use client";

import { useEffect, useRef, useState } from "react";

// 音声ファイルを順番に続けて再生する（漫才の1行ずつ・小説の1段落ずつ）。
// ready: 最初のファイルがあるか（なければ再生ボタンを出さない）、now: いま再生中の番号（-1 = 止まっている）。

export function useAudioSequence(srcs: string[], gapAfter: (i: number) => number) {
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(-1);
  const audio = useRef<HTMLAudioElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const first = srcs[0];

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    audio.current?.pause();
    audio.current = null;
    setNow(-1);
  }

  useEffect(() => {
    let alive = true;
    if (first)
      fetch(first, { method: "HEAD" })
        .then((r) => alive && setReady(r.ok))
        .catch(() => {});
    return () => {
      alive = false;
      if (timer.current) clearTimeout(timer.current);
      audio.current?.pause();
      audio.current = null;
    };
  }, [first]);

  function play(i: number) {
    if (i >= srcs.length) return stop();
    setNow(i);
    const a = new Audio(srcs[i]);
    audio.current = a;
    // 次を先に読みこんでおく（間があかないように）
    if (i + 1 < srcs.length) new Audio(srcs[i + 1]).preload = "auto";
    a.onended = () => {
      if (audio.current !== a) return;
      timer.current = setTimeout(() => play(i + 1), gapAfter(i));
    };
    a.onerror = () => audio.current === a && stop();
    a.play().catch(() => stop());
  }

  return { ready, now, playing: now >= 0, play, stop };
}
