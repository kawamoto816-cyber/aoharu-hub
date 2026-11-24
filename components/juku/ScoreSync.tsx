"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { readMoshiResults } from "@/lib/moshi/results";
import { readExamResults } from "@/lib/exam/results";

// 塾・教室の招待コードを入れた人の、単元模試・模試の得点を、先生用ダッシュボードへ届ける（見た目は何も出さない）。
// 得点は端末にしか無いので、前に送ったときから変わっていれば、いまの記録をまとめて /api/juku/scores に送る。
// 招待コードの利用者でない人の分は、サーバーが保存しない。送れなかったときは、次の回にもう一度送る。

export const SCORE_SYNC_KEY = "aoharu.juku.scoresync.v1";
const FIRST_MS = 5 * 1000;
const EVERY_MS = 3 * 60 * 1000;

function snapshot(): string | null {
  const moshi: Record<
    string,
    { c: number; best: number; last: number; at: string }
  > = {};
  for (const [unit, r] of Object.entries(readMoshiResults()))
    moshi[unit] = {
      c: r.count,
      best: r.bestPct,
      last: r.lastPct,
      at: r.lastAt,
    };
  const exams = readExamResults()
    .slice(0, 30)
    .map((a) => ({ title: a.title, at: a.at, score: a.score, total: a.total }));
  if (!Object.keys(moshi).length && !exams.length) return null;
  return JSON.stringify({ moshi, exams });
}

export function ScoreSync() {
  const { isLoaded, isSignedIn } = useAuth();
  const busy = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let stopped = false;

    async function sync() {
      if (busy.current || stopped) return;
      const cur = snapshot();
      if (!cur) return;
      try {
        if (window.localStorage.getItem(SCORE_SYNC_KEY) === cur) return;
      } catch {
        return;
      }
      busy.current = true;
      try {
        const res = await fetch("/api/juku/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: cur,
        });
        // 利用者でない（member:false）ときも、同じ中身を何度も送らないように覚えておく。コードを入れたときに消す（RedeemForm）
        if (res.ok) window.localStorage.setItem(SCORE_SYNC_KEY, cur);
      } catch {
        // 次の回に送る
      } finally {
        busy.current = false;
      }
    }

    const first = window.setTimeout(sync, FIRST_MS);
    const timer = window.setInterval(sync, EVERY_MS);
    return () => {
      stopped = true;
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [isLoaded, isSignedIn]);

  return null;
}
