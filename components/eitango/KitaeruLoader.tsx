"use client";

import dynamic from "next/dynamic";

// 鍛えるのプレイ画面。?mode=shun|ctx&stage=N をブラウザで読む。
const Inner = dynamic(
  () =>
    import("./Kitaeru").then((m) => {
      function FromUrl() {
        const q = new URLSearchParams(window.location.search);
        const stage = Math.min(20, Math.max(1, Number(q.get("stage")) || 1));
        return q.get("mode") === "ctx" ? <m.Bunmyaku stage={stage} /> : <m.Shunpatsu stage={stage} />;
      }
      return FromUrl;
    }),
  { ssr: false, loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">準備しています…</p> },
);

export function KitaeruLoader() {
  return <Inner />;
}
