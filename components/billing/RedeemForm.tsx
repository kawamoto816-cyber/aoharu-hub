"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { openSignUpWithRecovery } from "@/lib/authReloadGuard";
import { useClerk } from "@clerk/nextjs";
import { trackEvent } from "@/lib/analytics";

const REASON: Record<string, string> = {
  not_found: "このコードは見つかりませんでした。塾・教室から受け取ったコードをもう一度確かめてください。",
  full: "このコードは、決まった人数まで使われています。塾・教室の先生にご相談ください。",
  expired: "このコードは期限が切れています。",
  already_paid: "このアカウントは月額のプランをご利用中なので、コードは使えません（月額の契約のまま全部使えます）。",
  unauthenticated: "先にログインしてください。",
  failed: "うまくいきませんでした。少し時間をおいてもう一度お試しください。",
};

export function RedeemForm({ initialCode }: { initialCode: string }) {
  const { isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const [code, setCode] = useState(initialCode);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/team-pass/redeem", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; reason?: string };
      if (j.ok) {
        setState("done");
        trackEvent("team_pass_redeem", {});
        return;
      }
      setError(REASON[j.reason ?? "failed"] ?? REASON.failed);
    } catch {
      setError(REASON.failed);
    }
    setState("idle");
  }

  if (state === "done") {
    return (
      <div className="mt-6 rounded-2xl border-2 border-[#15172B] bg-[#E7F6EC] p-5">
        <p className="m-0 text-base font-black">使えるようになりました</p>
        <p className="mb-0 mt-1 text-sm leading-relaxed">2027年3月31日まで、全機能を回数の制限なく使えます。反映まで数分かかることがあります。</p>
        <Link href="/tensaku" className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-[#15172B] px-5 text-sm font-bold text-white no-underline">
          さっそく添削する
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {isLoaded && !isSignedIn ? (
        <button
          type="button"
          onClick={() => openSignUpWithRecovery(clerk, typeof window !== "undefined" ? window.location.href : undefined)}
          className="min-h-[48px] w-full rounded-xl bg-[#1533B8] text-sm font-bold text-white"
        >
          まず無料登録・ログインする
        </button>
      ) : (
        <>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="JUKU-XXXX-XXXX"
            className="w-full rounded-xl border-[1.5px] border-[#C9C7BC] px-4 py-3 font-mono text-lg tracking-widest outline-none focus:border-[#1533B8]"
          />
          <button
            type="button"
            onClick={submit}
            disabled={state === "sending" || code.replace(/[^A-Z0-9]/gi, "").length < 8}
            className="mt-3 min-h-[48px] w-full rounded-xl bg-[#1533B8] text-sm font-bold text-white disabled:opacity-50"
          >
            {state === "sending" ? "確かめています…" : "コードを使う"}
          </button>
        </>
      )}
      {error && <p role="alert" className="mt-3 text-sm font-bold text-[#B42318]">{error}</p>}
    </div>
  );
}
