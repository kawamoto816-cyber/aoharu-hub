"use client";

import dynamic from "next/dynamic";

const Inner = dynamic(() => import("./KitaeruHome").then((m) => m.KitaeruHome), {
  ssr: false,
  loading: () => <p className="m-0 text-sm text-[#3A3D55]">読み込んでいます…</p>,
});

export function KitaeruHomeLoader() {
  return <Inner />;
}
