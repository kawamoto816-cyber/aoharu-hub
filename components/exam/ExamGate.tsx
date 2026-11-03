"use client";

import { useCallback, useEffect, useRef, useState, type ComponentProps } from "react";
import Link from "next/link";
import { MoshiPlay, type MoshiExamMode } from "@/components/moshi/MoshiPlay";
import { card } from "@/components/drill/DrillPlay";
import { deviceTrialUsed, examLimit, PRICING_HREF, recordDeviceTrial, type ExamPlan, type ExamQuota } from "@/lib/exam/access";
import { ExamPlanContext } from "./plan-context";

// 入試モード・共通テストモードの本番画面の「回数の門」(2026-11-04 承認のプランの決まり。lib/exam/access.ts)。
//   始める前に残りの回数を出し、使いきっていればやさしいお知らせ (料金とプランへ) に差しかえる。
//   回数を数えるのは「はじめる」を押したとき (MoshiPlay の examMode.beforeStart)。
//   登録なし＝端末で1回・無料登録＝サーバーで月2回・Pro・Max＝無制限。プランが判定できないときは止めない。
//   単元模試 (/learn/moshi)・教科書はこの部品を通らない。

type PlayProps = Omit<ComponentProps<typeof MoshiPlay>, "examMode">;

/** 画面で持つ状態。remaining: null＝無制限か数えられない */
interface GateState {
  plan: ExamPlan | null;
  remaining: number | null;
  limit: number | null;
}

async function fetchQuota(): Promise<ExamQuota | null> {
  try {
    const r = await fetch("/api/exam/plan", { cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()) as ExamQuota;
  } catch {
    return null;
  }
}

function toState(q: ExamQuota | null): GateState {
  if (!q) return { plan: null, remaining: null, limit: null };
  if (q.plan === "guest") {
    const limit = examLimit("guest") ?? 1;
    return { plan: "guest", limit, remaining: Math.max(0, limit - deviceTrialUsed()) };
  }
  return { plan: q.plan, limit: q.limit, remaining: q.remaining };
}

export function ExamGate({ examMode, ...play }: PlayProps & { examMode: MoshiExamMode }) {
  const [st, setSt] = useState<GateState | "loading">("loading");
  const [started, setStarted] = useState(false);
  const stRef = useRef<GateState | "loading">("loading");
  const loading = useRef<Promise<GateState> | null>(null);
  const busy = useRef(false);

  const load = useCallback(() => {
    loading.current ??= fetchQuota().then((q) => {
      const s = toState(q);
      stRef.current = s;
      setSt(s);
      return s;
    });
    return loading.current;
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const beforeStart = useCallback(async (): Promise<boolean> => {
    if (busy.current) return false;
    busy.current = true;
    try {
      const s = stRef.current === "loading" ? await load() : stRef.current;
      if (s.plan === "guest") {
        if (s.remaining !== null && s.remaining <= 0) return false;
        recordDeviceTrial();
        const next = { ...s, remaining: Math.max(0, (s.limit ?? 1) - deviceTrialUsed()) };
        stRef.current = next;
        setSt(next);
      } else if (s.plan === "free") {
        if (s.remaining !== null && s.remaining <= 0) return false;
        try {
          const r = await fetch("/api/exam/start", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ spec: examMode.specId, mode: examMode.mode, seed: examMode.seed }),
          });
          const j = (await r.json().catch(() => null)) as (ExamQuota & { ok?: boolean }) | null;
          if (r.status === 429 || j?.ok === false) {
            const next = { ...s, remaining: 0 };
            stRef.current = next;
            setSt(next);
            return false;
          }
          if (j && typeof j.remaining === "number") {
            const next = { ...s, remaining: j.remaining };
            stRef.current = next;
            setSt(next);
          }
        } catch {
          /* 通信できなくても止めない */
        }
      }
      setStarted(true);
      return true;
    } finally {
      busy.current = false;
    }
  }, [examMode.mode, examMode.seed, examMode.specId, load]);

  const s = st === "loading" ? null : st;
  const exhausted = !started && s !== null && s.remaining !== null && s.remaining <= 0 && (s.plan === "guest" || s.plan === "free");

  if (exhausted && s) return <ExamBlocked plan={s.plan === "guest" ? "guest" : "free"} limit={s.limit} />;

  return (
    <ExamPlanContext.Provider value={s?.plan ?? null}>
      {!started && s && <QuotaLine st={s} />}
      <MoshiPlay {...play} examMode={{ ...examMode, beforeStart }} />
    </ExamPlanContext.Provider>
  );
}

function QuotaLine({ st }: { st: GateState }) {
  let text: string | null = null;
  if (st.plan === "guest") text = `登録なしで ${st.limit ?? 1}回分 体験できます（この端末であと${st.remaining ?? 0}回）。無料登録で月2回、Pro・Max なら何回でも解けます。`;
  else if (st.plan === "free") text = st.remaining === null ? `無料登録は月${st.limit ?? 2}回まで解けます。` : `今月あと${st.remaining}回（無料登録は月${st.limit ?? 2}回）。「はじめる」を押すと1回分として数えます。`;
  else if (st.plan === "pro" || st.plan === "max") text = `${st.plan === "pro" ? "Pro" : "Max"} プラン：何回でも解けます。結果で時間配分の分析も見られます。`;
  if (!text) return null;
  return (
    <p role="status" className="m-0 mb-3 rounded-[12px] bg-[#EEF1FF] px-3 py-2 text-[13px] font-bold leading-relaxed text-[#1533B8]">
      {text}
    </p>
  );
}

function ExamBlocked({ plan, limit }: { plan: "guest" | "free"; limit: number | null }) {
  return (
    <div role="status" className={card}>
      <p className="m-0 text-[17px] font-black">{plan === "guest" ? "体験の1回分を使いました" : `今月の${limit ?? 2}回を使いきりました`}</p>
      <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
        {plan === "guest"
          ? "ここまで解いてくれてありがとう。無料登録すると入試モード・共通テストモードを毎月2回、Pro・Max なら何回でも解けて、大問ごとの時間配分の分析も見られます。"
          : "来月1日（日本時間）にまた2回解けるようになります。Pro・Max なら何回でも解けて、大問ごとの時間配分の分析も見られます。"}
      </p>
      <Link href={PRICING_HREF} className="mt-4 flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]">
        {plan === "guest" ? "無料登録・プランを見る →" : "Pro・Max を見る →"}
      </Link>
      <p className="m-0 mt-3 text-[13px] leading-relaxed text-[#3A3D55]">
        単元模試と教科書（図解レクチャー）は、いつでも何回でも使えます。
        <Link href="/learn/moshi" className="ml-1 font-black text-[#1533B8] underline">
          単元模試へ →
        </Link>
      </p>
    </div>
  );
}
