"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function VoiceReviewButtons({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function set(next: "approved" | "rejected") {
    setBusy(true);
    await fetch("/api/admin/voices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: next }) });
    setBusy(false);
    router.refresh();
  }
  return (
    <div className="mt-3 flex gap-2">
      <button type="button" disabled={busy || status === "approved"} onClick={() => set("approved")} className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white disabled:opacity-40">
        載せる
      </button>
      <button type="button" disabled={busy || status === "rejected"} onClick={() => set("rejected")} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-600 disabled:opacity-40">
        載せない
      </button>
    </div>
  );
}
