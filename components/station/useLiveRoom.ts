"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Cycle, RoomState } from "@/lib/station/room";
import type { LiveRoom } from "@/lib/station/room-store";

// アオハルームの「みんなで共有する部分」を、サーバーとやりとりする。
//   ・部屋のいま（いまいる人・今週のランキング）を1分ごとに取りにいく
//   ・集中しているあいだ、1分ごとに「いる」と知らせる。終えたら「立った」と知らせる
//   ・終わったサイクルの記録を送る（やることの文・ひとことは送らない。送ったものは端末に覚えておき、二重に送らない）
// 登録していない人・ニックネームを決めていない人は、見るだけ（送らない）。
// サーバーが使えないときは live.ready が false のままになり、画面はこの端末だけの表示で動く。

const SENT_KEY = "aoharu-room-sent-v1";
const POLL_MS = 60_000;
/** これより古いサイクルは送らない（サーバーも受け取らない） */
const SEND_WITHIN_MS = 7 * 24 * 60 * 60 * 1000;

function readSent(): string[] {
  try {
    const v = JSON.parse(window.localStorage.getItem(SENT_KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function addSent(id: string) {
  try {
    window.localStorage.setItem(SENT_KEY, JSON.stringify([id, ...readSent().filter((x) => x !== id)].slice(0, 600)));
  } catch {
    /* 覚えられなくても、サーバーが同じ id を1回しか数えない */
  }
}

async function post(path: string, body: unknown): Promise<{ ok: boolean; status: number; json: Record<string, unknown> }> {
  try {
    const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), keepalive: true });
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { ok: res.ok, status: res.status, json };
  } catch {
    return { ok: false, status: 0, json: {} };
  }
}

export function useLiveRoom(s: RoomState) {
  const [live, setLive] = useState<LiveRoom | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/station/room", { cache: "no-store" });
      if (!res.ok) return;
      setLive((await res.json()) as LiveRoom);
    } catch {
      /* つながらないあいだは、前の表示のまま */
    }
  }, []);

  // 部屋のいまを取りにいく（開いたとき・1分ごと・タブに戻ったとき）
  useEffect(() => {
    // 取りにいくのは描画のあと（effect の中で直接 state を変えない）
    const first = window.setTimeout(() => void refresh(), 0);
    const t = window.setInterval(() => void refresh(), POLL_MS);
    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  const seated = !!live?.ready && live.signedIn && !!live.member;
  const running = s.running;
  const runningKey = running ? `${running.startAt}-${running.mode}` : "";

  // 集中しているあいだ「いる」と知らせる。終えたら「立った」と知らせる
  const wasOn = useRef(false);
  useEffect(() => {
    if (!seated) return;
    if (!runningKey) {
      if (wasOn.current) {
        wasOn.current = false;
        void post("/api/station/room/beat", { on: false }).then(() => refresh());
      }
      return;
    }
    const mode = Number(runningKey.split("-")[1]);
    wasOn.current = true;
    void post("/api/station/room/beat", { on: true, mode }).then(() => refresh());
    const t = window.setInterval(() => void post("/api/station/room/beat", { on: true, mode }), POLL_MS);
    return () => window.clearInterval(t);
  }, [seated, runningKey, refresh]);

  // 終わったサイクルの記録を送る
  const sending = useRef(false);
  const cycles = s.cycles;
  useEffect(() => {
    if (!seated || sending.current) return;
    const sent = new Set(readSent());
    const todo = cycles.filter((c: Cycle) => !sent.has(c.id) && Date.now() - Date.parse(c.at) < SEND_WITHIN_MS).slice(0, 20);
    if (!todo.length) return;
    sending.current = true;
    void (async () => {
      let any = false;
      for (const c of todo.reverse()) {
        const r = await post("/api/station/room/cycle", {
          id: c.id,
          at: c.at,
          mode: c.mode,
          focusSec: c.focusSec,
          completed: c.completed,
          points: c.points,
          solved: c.gains.solved,
          math: c.gains.mathCorrect,
        });
        if (!r.ok) break;
        addSent(c.id);
        any = true;
      }
      sending.current = false;
      if (any) void refresh();
    })();
  }, [seated, cycles, refresh]);

  /** 部屋で見せるニックネームと学年を決める。だめなら理由の文を返す */
  const saveProfile = useCallback(
    async (nick: string, grade: string): Promise<string | null> => {
      const r = await post("/api/station/room/profile", { nick, grade });
      if (r.ok) {
        await refresh();
        return null;
      }
      return typeof r.json.error === "string" ? r.json.error : r.status === 401 ? "登録（ログイン）が必要です。" : "保存できませんでした。少し待って、もう一度ためしてください。";
    },
    [refresh],
  );

  return { live, seated, saveProfile };
}
