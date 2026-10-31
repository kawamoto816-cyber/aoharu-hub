"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { findStep } from "@/lib/math/steps";

// 問題は毎回ちがう数で作るので、ブラウザだけで描く (サーバーの描画と食い違わないように)。
const Drill = dynamic(() => import("./Drill").then((m) => m.Drill), {
  ssr: false,
  loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">問題を作っています…</p>,
});

export function DrillLoader({ stepNo }: { stepNo: number }) {
  const [round, setRound] = useState(0);
  const step = findStep(stepNo)!;
  return <Drill key={round} step={step} onRestart={() => setRound((r) => r + 1)} />;
}
