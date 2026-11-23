"use client";

import Link from "next/link";
import { SLOTS } from "@/lib/station/demo";
import { addCoins, update, useStation } from "@/lib/station/store";
import type { Slot } from "@/lib/station/types";

const KIND: Record<Slot["kind"], { label: string; cls: string }> = {
  share: { label: "シェア会", cls: "bg-[#E6EAFB] text-[#1533B8]" },
  lesson: { label: "学生の授業", cls: "bg-[#FFE45C] text-[#15172B]" },
  plaza: { label: "月のひろば", cls: "bg-[#15172B] text-white" },
};

const WD = ["日", "月", "火", "水", "木", "金", "土"];
const day = (ymd: string) => {
  const [y, m, d] = ymd.split("-").map(Number);
  return `${m}月${d}日（${WD[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]}）`;
};

export function Board() {
  const s = useStation();
  const visits = s.booked.filter((id) => SLOTS.find((x) => x.id === id)?.kind === "share" && !s.member).length;
  const days = [...new Set(SLOTS.map((x) => x.at.slice(0, 10)))];
  return (
    <div className="mt-6 grid gap-4">
      <h2 className="m-0 text-[18px] font-black">時間割</h2>
      {days.map((d) => (
        <section key={d}>
          <h2 className="m-0 mb-2 text-[15px] font-black">{day(d)}</h2>
          <ul className="m-0 grid list-none gap-2 p-0">
            {SLOTS.filter((x) => x.at.startsWith(d)).map((x) => {
              const booked = s.booked.includes(x.id);
              const mine = x.kind === "share" && x.host.includes("あさひ");
              const full = !booked && x.taken >= x.seats;
              const visitBlocked = x.kind === "share" && !s.member && !booked && visits >= 1;
              const needMember = x.kind !== "share" && !s.member && !booked;
              const attended = x.lessonId ? s.attended.includes(x.lessonId) : false;
              return (
                <li key={x.id} className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${KIND[x.kind].cls}`}>{KIND[x.kind].label}</span>
                    <span className="text-[13px] font-black">{x.at.slice(11, 16)}〜（{x.minutes}分）</span>
                    <span className="text-[12px] text-[#5A5D73]">{x.kind === "lesson" ? `先生役：${x.host}` : x.host}{mine ? "（あなたのサークル）" : ""}</span>
                    <span className="ml-auto text-[12px] text-[#5A5D73]">
                      {Math.min(x.seats, x.taken + (booked ? 1 : 0))}/{x.seats}人
                    </span>
                  </div>
                  <p className="m-0 mt-1 text-[15px] font-black">{x.title}</p>
                  {x.unitName && <p className="m-0 text-[12px] text-[#5A5D73]">単元：{x.unitName}</p>}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(mine || needMember) && !s.member ? (
                      <span className="text-[12px] font-bold text-[#5A5D73]">{mine ? "サークルに入ると参加できます" : "サークルに入ると受けられます"}（準備中。試作は入口の「ラーニングサークル」のボタンで動かせます）</span>
                    ) : (
                      <button
                        type="button"
                        disabled={(!booked && full) || visitBlocked}
                        onClick={() => update((v) => ({ ...v, booked: booked ? v.booked.filter((b) => b !== x.id) : [...v.booked, x.id] }))}
                        className={`rounded-[9px] border-[1.5px] border-[#15172B] px-3 py-1.5 text-[13px] font-black disabled:opacity-40 ${booked ? "bg-[#1533B8] text-white" : "bg-white"}`}
                      >
                        {booked ? "✓ 予約ずみ（取り消す）" : full ? "満席" : visitBlocked ? "今月の見学は使いました" : x.kind === "share" && !s.member ? "見学を予約" : "予約する"}
                      </button>
                    )}
                    {x.lessonId && booked && (
                      <button
                        type="button"
                        disabled={attended}
                        onClick={() => {
                          update((v) => ({ ...v, attended: [...v.attended, x.lessonId!] }));
                          addCoins(3, `${x.host}さんの授業を受けた`);
                        }}
                        className="rounded-[9px] border-[1.5px] border-[#15172B] bg-white px-3 py-1.5 text-[13px] font-black disabled:opacity-50"
                      >
                        {attended ? "受講ずみ" : "受講したことにする（試作・＋3コイン）"}
                      </button>
                    )}
                    {x.lessonId && (
                      <Link href={`/station/stage/${x.lessonId}`} className="py-1.5 text-[13px] font-black text-[#1533B8]">
                        授業のページ →
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <p className="m-0 text-[12px] leading-relaxed text-[#5A5D73]">
        試作では、シェア会と授業はビデオ会議で開く想定です（予約した人に参加のリンクが届く）。駅の中の専用の舞台は、続けてもらえると分かってから作ります。
      </p>
    </div>
  );
}
