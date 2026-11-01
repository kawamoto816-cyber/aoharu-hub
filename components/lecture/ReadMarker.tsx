"use client";

import { useEffect, useRef } from "react";
import { markOpened, markRead } from "@/lib/lecture/readLog";

// 図解レクチャーのページに置く目印。開いたら「最後に開いた単元」に、ここまで読み進めたら「読んだ」にする。

export function ReadMarker({ unit }: { unit: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    markOpened(unit);
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        markRead(unit);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [unit]);
  return <div ref={ref} aria-hidden="true" className="h-px" />;
}
