"use client";

import dynamic from "next/dynamic";

// 修行の画面はこの端末の進み具合から作るので、ブラウザだけで描く。
const Inner = dynamic(
  () =>
    import("./Session").then((m) => {
      function FromUrl() {
        const q = new URLSearchParams(window.location.search);
        const stage = Number(q.get("stage")) || undefined;
        return <m.Session stage={stage} extra={q.get("extra") === "1"} />;
      }
      return FromUrl;
    }),
  { ssr: false, loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">準備しています…</p> },
);

export function SessionLoader() {
  return <Inner />;
}
