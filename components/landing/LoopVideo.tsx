"use client";

import { useEffect, useRef } from "react";

// 最初の画面に置く短い操作動画 (音なし・くり返し)。
// 画面に入っているときだけ再生し、外れたら止める。読み込みは画面に近づいてから (preload="none")。
// 「動きを減らす」設定の人には自動再生せず、再生ボタン付きで出す。
export function LoopVideo({ webm, mp4, poster, label }: { webm: string; mp4: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.controls = true;
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="block aspect-video w-full rounded-[10px] bg-[#0E1330] object-cover"
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
