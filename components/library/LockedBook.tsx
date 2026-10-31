"use client";

import { useEffect, useState } from "react";
import { BookBack } from "./BookBack";
import { ProGate } from "@/components/learn/ProGate";
import { trackEvent } from "@/lib/analytics";
import type { LibraryBook } from "@/lib/library/types";

// Pro の本の裏。ページには入れず、開いたときに /api/learn/book から受けとる。
type State = { kind: "loading" } | { kind: "ok"; book: LibraryBook } | { kind: "signed_out" } | { kind: "pro_only" } | { kind: "error" };

export function LockedBook({ id, related }: { id: string; related: { id: string; title: string; author: string }[] }) {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let alive = true;
    fetch(`/api/learn/book?id=${encodeURIComponent(id)}`, { cache: "no-store" })
      .then(async (res) => {
        if (!alive) return;
        if (res.status === 401) return setState({ kind: "signed_out" });
        if (res.status === 402) return setState({ kind: "pro_only" });
        if (!res.ok) return setState({ kind: "error" });
        const data = (await res.json()) as { book: LibraryBook };
        if (alive) setState({ kind: "ok", book: data.book });
      })
      .catch(() => alive && setState({ kind: "error" }));
    return () => {
      alive = false;
    };
  }, [id]);

  useEffect(() => {
    if (state.kind === "signed_out" || state.kind === "pro_only") trackEvent("learn_pro_gate_view", { topic: "library", card: id, state: state.kind });
  }, [state.kind, id]);

  if (state.kind === "ok") return <BookBack book={state.book} related={related} />;
  if (state.kind === "loading") return <p className="m-0 text-center text-sm text-[#3A3D55]">本のカードを開いています…</p>;
  if (state.kind === "error") return <p className="m-0 text-center text-sm font-bold text-[#B42318]">開けませんでした。少し時間をおいてもう一度お試しください。</p>;
  return <ProGate state={state.kind} returnUrl={`/learn/library/${id}`} location="learn_library_pro" what="本の解説" />;
}
