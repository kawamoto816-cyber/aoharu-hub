"use client";

import dynamic from "next/dynamic";

const Inner = dynamic(() => import("./EitangoHome").then((m) => m.EitangoHome), {
  ssr: false,
  loading: () => <p className="m-0 text-sm text-[#3A3D55]">読み込んでいます…</p>,
});

export function EitangoHomeLoader() {
  return <Inner />;
}
