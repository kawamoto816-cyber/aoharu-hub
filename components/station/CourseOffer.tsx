"use client";

import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { openSignUpWithRecovery } from "@/lib/authReloadGuard";
import { trackEvent } from "@/lib/analytics";
import type { CourseDef } from "@/lib/station/course-kinds";

// 直前コース（共通テスト・大学入試・公立高校入試・私立高校入試）の申し込み。
//   共通テスト・大学入試 … 自分で払う ／ 保護者にお願いする（支払いリンクを作って送る）
//   公立・私立高校入試 … 中学生向けなので「保護者にお願いする」だけ（2026-11-23 代表の判断）。値段を強く押し出さない
// 使えるかどうかは /api/station/course/access で確かめる。支払いから戻った直後（?checkout=success&session_id=…）は、
// その支払いを確かめて利用権を付けてから、購入の計測を1回だけ送り、URL からパラメータを外す。

export interface CourseAccess {
  /** まだ確かめている途中 */
  loading: boolean;
  signedIn: boolean;
  access: boolean;
  via: "max" | "course" | null;
  /** いま支払いから戻ってきた */
  justPaid: boolean;
}

const yen = (n: number) => n.toLocaleString("ja-JP");
const TRACKED = "aoharu_ga4_purchase_tracked_session_id";

export function useCourseAccess(def: CourseDef): CourseAccess {
  const [a, setA] = useState<CourseAccess>({ loading: !!def.sale, signedIn: false, access: false, via: null, justPaid: false });
  useEffect(() => {
    if (!def.sale) return;
    let alive = true;
    const url = new URL(window.location.href);
    const paid = url.searchParams.get("checkout") === "success";
    const sessionId = url.searchParams.get("session_id");
    const q = new URLSearchParams({ kind: def.kind });
    if (paid && sessionId) q.set("session_id", sessionId);
    fetch(`/api/station/course/access?${q.toString()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { signedIn?: boolean; access?: boolean; via?: "max" | "course" | null }) => {
        if (alive) setA({ loading: false, signedIn: !!j.signedIn, access: !!j.access, via: j.via ?? null, justPaid: paid && !!j.access });
      })
      .catch(() => {
        if (alive) setA((x) => ({ ...x, loading: false }));
      });
    if (url.searchParams.has("checkout")) {
      if (paid) {
        let done = false;
        try {
          done = !!sessionId && sessionStorage.getItem(TRACKED) === sessionId;
          if (sessionId) sessionStorage.setItem(TRACKED, sessionId);
        } catch {
          /* 使えない環境では二重の計測を防げないだけ */
        }
        if (!done) trackEvent("purchase", { transaction_id: sessionId || `no-session-${Date.now()}`, currency: "JPY", value: def.sale.priceJpy, item_id: `course_${def.kind}`, item_name: `アオハルOS ${def.name}` });
      }
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
    return () => {
      alive = false;
    };
  }, [def]);
  return a;
}

async function createCheckout(kind: string, payer: "self" | "parent"): Promise<string> {
  const res = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: "course", kind, payer }) });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string; reason?: string };
  if (res.status === 401 || data.reason === "auth_required") throw new Error("auth_required");
  if (res.status === 409 || data.reason === "already_paid") throw new Error("already_paid");
  if (!res.ok || !data.url) throw new Error(data.error || `HTTP ${res.status}`);
  return data.url;
}

function parentMessage(def: CourseDef, url: string): string {
  const s = def.sale!;
  return [
    `${def.exam}に向けた勉強に「アオハルラーン」という学習サービスを使っています。`,
    `試験日までの計画を毎週作り直して、進み具合を見られる「${def.name}」（${s.endsLabel}まで・${yen(s.priceJpy)}円の1回払い・自動更新なし）を申し込んでもらえませんか。`,
    "模試や授業は無料のままで、有料なのは計画づくりと進み具合の管理の部分です。",
    "下のリンクから支払いの手続きができます（24時間有効）。",
    url,
    "",
    "サービスの説明（保護者の方向け）: https://app.bluespring.co.jp/parents#course",
  ].join("\n");
}

export function CourseOffer({ def, signedIn }: { def: CourseDef; signedIn: boolean }) {
  const s = def.sale!;
  const clerk = useClerk();
  const [loading, setLoading] = useState<"self" | "parent" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const location = `course_${def.kind}`;

  function handleKnown(e: unknown): boolean {
    const m = e instanceof Error ? e.message : "";
    if (m === "auth_required") {
      // 登録・ログインのあと、このページへ戻る（計画はこのブラウザに残っている）
      trackEvent("sign_up_click", { location });
      openSignUpWithRecovery(clerk, def.href);
      setLoading(null);
      return true;
    }
    if (m === "already_paid") {
      setError("すでにこのコースを使えます。ページを読みこみ直してください。");
      setLoading(null);
      return true;
    }
    return false;
  }

  async function goSelf() {
    setLoading("self");
    setError(null);
    try {
      const url = await createCheckout(def.kind, "self");
      trackEvent("begin_checkout", { currency: "JPY", value: s.priceJpy, plan: `course_${def.kind}`, location, payer: "self" });
      window.location.href = url;
    } catch (e) {
      if (handleKnown(e)) return;
      setError("支払い画面を開けませんでした。少し時間をおいてもう一度お試しください。");
      setLoading(null);
    }
  }

  async function askParent() {
    setLoading("parent");
    setError(null);
    try {
      const url = await createCheckout(def.kind, "parent");
      const text = parentMessage(def, url);
      trackEvent("ask_parent_link", { location, plan: `course_${def.kind}` });
      setMessage(text);
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ text });
        } catch {
          /* 共有を閉じただけなら、下のコピー欄から送れる */
        }
      }
    } catch (e) {
      if (handleKnown(e)) return;
      setError("リンクを作れませんでした。少し時間をおいてもう一度お試しください。");
    } finally {
      setLoading(null);
    }
  }

  async function copy() {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* コピーできない環境では、文章を長押しで選んでもらう */
    }
  }

  const btnDark = "min-h-[48px] rounded-xl bg-[#15172B] px-4 text-sm font-bold text-white disabled:opacity-60";
  const btnLight = "min-h-[48px] rounded-xl border-[1.5px] border-[#15172B] bg-white px-4 text-sm font-bold text-[#15172B] disabled:opacity-60";
  return (
    <div className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
      <p className="m-0 text-[15px] font-black">
        2週目からの伴走：{yen(s.priceJpy)}円（税込・1回払い・自動更新なし）
        <span className="ml-2 text-[12px] font-bold text-[#5A5D73]">{s.endsLabel}まで使えます</span>
      </p>
      <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">
        模試・授業・さかのぼりは、申し込まなくても無料のまま使えます。Max・受験シーズンパスをお使いの方は、追加の支払いなしでこのコースも使えます。
      </p>
      {s.parentOnly ? (
        <>
          <p className="m-0 mt-2 text-[12.5px] font-bold leading-relaxed">お申し込みは保護者の方にお願いしています。下のボタンで、保護者の方あての説明と支払いリンクを作れます。</p>
          <div className="mt-2">
            <button type="button" onClick={askParent} disabled={loading !== null} className={btnLight}>
              {loading === "parent" ? "リンクを作っています…" : "保護者にお願いする（説明とリンクを作る）"}
            </button>
          </div>
        </>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={goSelf} disabled={loading !== null} className={btnDark}>
            {loading === "self" ? "支払い画面を開いています…" : `コースを申し込む（${yen(s.priceJpy)}円）`}
          </button>
          <button type="button" onClick={askParent} disabled={loading !== null} className={btnLight}>
            {loading === "parent" ? "リンクを作っています…" : "保護者にお願いする"}
          </button>
        </div>
      )}
      {!signedIn && <p className="m-0 mt-2 text-xs text-[#5A5D73]">お申し込みには無料登録（ログイン）が必要です。ボタンを押すと登録の画面が開き、終わるとこのページに戻ります。</p>}
      <p className="m-0 mt-2 text-xs text-[#5A5D73]">
        「保護者にお願いする」は、保護者の方が支払えるリンク（24時間有効）を作って、LINEやメールで送れます。お支払いはクレジットカード・PayPay などに対応しています。
      </p>
      {message && (
        <div className="mt-2 rounded-xl border border-[#15172B]/30 bg-[#FBF8EE] p-3">
          <p className="m-0 text-xs font-bold">この文章を保護者に送ってください（リンクは24時間有効）</p>
          <textarea readOnly value={message} rows={7} className="mt-2 w-full resize-none rounded-lg border border-slate-300 bg-white p-2 text-xs leading-relaxed" />
          <button type="button" onClick={copy} className="mt-2 min-h-[40px] rounded-lg bg-[#1533B8] px-4 text-xs font-bold text-white">
            {copied ? "コピーしました" : "文章をコピーする"}
          </button>
        </div>
      )}
      {error && (
        <p role="alert" className="m-0 mt-2 text-xs font-bold text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  );
}
