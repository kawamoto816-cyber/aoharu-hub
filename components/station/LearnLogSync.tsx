"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { takeSnap, type Snap } from "@/lib/station/room";

// 学習便の学習ログを、登録した人だけアカウントに送る（見た目は何も出さない）。
// 端末の記録（さかのぼりの習熟度・模試の結果）が前回送ったときから増えた分だけを /api/station/log に送る。
// はじめて動いたときは、いまの記録を出発点にするだけで送らない（過去の分をまとめて1日分にしないため）。
// 送れなかったときは出発点を動かさないので、次の回にまとめて送られる。

const KEY = "aoharu.station.logsync.v1";
const ROOM_KEY = "aoharu-room-v1";
const EVERY_MS = 60 * 1000;

function readBase(): Snap | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<Snap>;
    return { n: v.n ?? {}, ok: v.ok ?? {}, moshi: v.moshi ?? {} };
  } catch {
    return null;
  }
}

function writeBase(s: Snap) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // 保存できなくても続ける
  }
}

function readProfile(): { nick: string; grade: string } {
  try {
    const v = JSON.parse(window.localStorage.getItem(ROOM_KEY) ?? "{}") as { nick?: unknown; grade?: unknown };
    return { nick: typeof v.nick === "string" ? v.nick : "", grade: typeof v.grade === "string" ? v.grade : "" };
  } catch {
    return { nick: "", grade: "" };
  }
}

/** 前回からの増えた分（純粋な関数） */
export function diffSnap(a: Snap, b: Snap): { unit: string; solved: number; correct: number; moshi: number }[] {
  const out: { unit: string; solved: number; correct: number; moshi: number }[] = [];
  for (const unit of new Set([...Object.keys(b.n), ...Object.keys(b.moshi)])) {
    const solved = Math.max(0, (b.n[unit] ?? 0) - (a.n[unit] ?? 0));
    const correct = Math.min(solved, Math.max(0, (b.ok[unit] ?? 0) - (a.ok[unit] ?? 0)));
    const moshi = Math.max(0, (b.moshi[unit] ?? 0) - (a.moshi[unit] ?? 0));
    if (solved > 0 || moshi > 0) out.push({ unit, solved, correct, moshi });
  }
  return out;
}

export function LearnLogSync() {
  const { isLoaded, isSignedIn } = useAuth();
  const busy = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let stopped = false;

    async function sync() {
      if (busy.current || stopped) return;
      const cur = takeSnap();
      const base = readBase();
      if (!base) {
        writeBase(cur);
        return;
      }
      const entries = diffSnap(base, cur);
      if (!entries.length) return;
      busy.current = true;
      try {
        const res = await fetch("/api/station/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entries, ...readProfile() }),
          keepalive: true,
        });
        if (res.status === 401) stopped = true;
        const json = res.ok ? ((await res.json()) as { saved?: boolean }) : null;
        if (json?.saved) writeBase(cur);
        // 保存できない状態（テーブルが無いなど）のときは、このページを開いている間はもう送らない
        else stopped = true;
      } catch {
        // 送れなかったら次の回に送る
      } finally {
        busy.current = false;
      }
    }

    void sync();
    const timer = window.setInterval(() => void sync(), EVERY_MS);
    const onHide = () => {
      if (document.visibilityState === "hidden") void sync();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      stopped = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [isLoaded, isSignedIn]);

  return null;
}
