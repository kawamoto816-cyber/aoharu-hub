"use client";

import { useMemo, useState } from "react";
import type { DrillQ } from "@/lib/drill/types";
import { recordDrill, useDrill } from "@/lib/drill/progress";
import { trackEvent } from "@/lib/analytics";

// ②鍛える: 20問から10問を選び、選択肢もシャッフルして4択。9問正解で合格。

export const DRILL_COUNT = 10;
export const DRILL_PASS = 9;

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const card = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]";
const bigBtn = "flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] text-[17px] font-black";

function Blank({ q, fill, state }: { q: string; fill?: string; state?: "ok" | "ng" }) {
  const parts = q.split("___");
  if (parts.length < 2) return <>{q}</>;
  return (
    <>
      {parts[0]}
      <span className={`mx-0.5 inline-block min-w-[72px] border-b-2 px-1 text-center font-bold ${state === "ok" ? "border-[#1533B8] text-[#1533B8]" : state === "ng" ? "border-[#D9341F] text-[#D9341F]" : "border-[#15172B]"}`}>{fill ?? " "}</span>
      {parts.slice(1).join("___")}
    </>
  );
}

function Game({ unit, qs, onRestart }: { unit: string; qs: DrillQ[]; onRestart: () => void }) {
  const set = useMemo(() => shuffle(qs).slice(0, DRILL_COUNT).map((q) => ({ q, order: shuffle([0, 1, 2, 3]) })), [qs]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [ok, setOk] = useState(0);
  const [miss, setMiss] = useState<DrillQ[]>([]);
  const cur = set[i];

  if (!cur) {
    const passed = ok >= DRILL_PASS;
    return (
      <div className={card}>
        <p className={`m-0 text-[24px] font-black ${passed ? "text-[#1533B8]" : ""}`}>{passed ? "合格！" : "もう一回！"}</p>
        <p className="m-0 mt-2 text-[16px] font-bold">
          {DRILL_COUNT}問中 <span className="text-[30px] font-black">{ok}</span> 問正解
        </p>
        {!passed && <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">合格は{DRILL_PASS}問以上。上のポイントを読みなおしてから、もう一度。問題は毎回入れかわります。</p>}
        {miss.length > 0 && (
          <div className="mt-4 grid gap-2">
            <p className="m-0 text-[13px] font-black text-[#D9341F]">まちがえた問題</p>
            {miss.map((q) => (
              <div key={q.q} className="rounded-lg bg-[#F7F6F1] p-3 text-[14px] leading-relaxed">
                <p className="m-0">
                  <Blank q={q.q} fill={q.c[q.a]} state="ok" />
                </p>
                {!q.q.includes("___") && <p className="m-0 mt-1 text-[13.5px] font-black text-[#1533B8]">答え：{q.c[q.a]}</p>}
                <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">{q.ex}</p>
              </div>
            ))}
          </div>
        )}
        <button type="button" onClick={onRestart} className={`${bigBtn} mt-5 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
          もう一度挑戦する
        </button>
      </div>
    );
  }

  const answered = picked !== null;
  const right = answered && picked === cur.q.a;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[13px] font-bold text-[#3A3D55]">
        <span>
          {i + 1} / {DRILL_COUNT}
        </span>
        <span>正解 {ok}</span>
      </div>
      <div className={card}>
        <p className="m-0 text-[18px] font-bold leading-relaxed">
          <Blank q={cur.q.q} fill={answered ? cur.q.c[cur.q.a] : undefined} state={answered ? (right ? "ok" : "ng") : undefined} />
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {cur.order.map((k) => {
            const st = answered ? (k === cur.q.a ? "right" : k === picked ? "wrong" : "") : "";
            return (
              <button
                key={k}
                type="button"
                disabled={answered}
                onClick={() => {
                  setPicked(k);
                  if (k === cur.q.a) setOk((n) => n + 1);
                  else setMiss((m) => [...m, cur.q]);
                }}
                className={`flex min-h-[52px] items-center rounded-[12px] border-[1.5px] px-3 py-2 text-left text-[16px] font-bold leading-snug text-[#15172B] ${st === "right" ? "border-[#1533B8] bg-[#E3E8FF]" : st === "wrong" ? "border-[#D9341F] bg-[#FFE6E1]" : "border-[#15172B] bg-white"}`}
              >
                {cur.q.c[k]}
              </button>
            );
          })}
        </div>
        {answered && (
          <>
            <p className={`m-0 mt-3 text-[15px] font-black ${right ? "text-[#1533B8]" : "text-[#D9341F]"}`}>{right ? "正解！" : `ざんねん（答え：${cur.q.c[cur.q.a]}）`}</p>
            <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">{cur.q.ex}</p>
            <button
              type="button"
              autoFocus
              onClick={() => {
                if (i + 1 >= DRILL_COUNT) {
                  recordDrill(unit, ok, ok >= DRILL_PASS);
                  trackEvent("drill_finish", { unit, ok, passed: ok >= DRILL_PASS });
                }
                setPicked(null);
                setI((n) => n + 1);
              }}
              className={`${bigBtn} mt-3 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}
            >
              {i + 1 < DRILL_COUNT ? "次へ" : "結果を見る"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function DrillPlay({ unit, qs }: { unit: string; qs: DrillQ[] }) {
  const [round, setRound] = useState(-1);
  const rec = useDrill()[unit];
  if (round < 0)
    return (
      <div className={card}>
        <p className="m-0 text-[18px] font-black">
          4択{DRILL_COUNT}問・{DRILL_PASS}問正解で合格
        </p>
        <p className="m-0 mt-1 text-[14px] text-[#3A3D55]">問題は{qs.length}問から毎回えらばれ、選択肢の順番も入れかわります。答えるたびに解説が出ます。</p>
        {rec && (
          <p className="m-0 mt-2 text-[13.5px] font-bold text-[#1533B8]">
            ベスト {rec.best}/{DRILL_COUNT}
            {rec.cleared ? "・合格ずみ" : ""}
          </p>
        )}
        <button type="button" onClick={() => setRound(0)} className={`${bigBtn} mt-4 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}>
          はじめる
        </button>
      </div>
    );
  return <Game key={round} unit={unit} qs={qs} onRestart={() => setRound((r) => r + 1)} />;
}
