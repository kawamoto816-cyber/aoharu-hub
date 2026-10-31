"use client";

import dynamic from "next/dynamic";

const Shindan = dynamic(() => import("./Shindan").then((m) => m.Shindan), {
  ssr: false,
  loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">問題を作っています…</p>,
});

export function ShindanLoader() {
  return <Shindan />;
}
