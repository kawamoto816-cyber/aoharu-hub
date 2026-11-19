"use client";

import Link from "next/link";
import { RANKS, rankOf } from "@/lib/station/rating";
import { addCoins, balance, update, useStation } from "@/lib/station/store";
import { Coin } from "./StationNav";

// 入口の「いまの自分」：ニックネーム・段・コイン・会員の状態（試作の切りかえ）
export function MyStatus() {
  const s = useStation();
  const shares = s.myShares.length;
  const rank = rankOf({ member: s.member, teacher: s.teacher, shares, taught: s.myLessons.length, oshieruPassed: s.oshieruPassed.length });
  const r = RANKS[rank - 1];
  const today = new Date().toISOString().slice(0, 10);
  const learned = s.learnedDays.includes(today);
  return (
    <section className="mt-6 rounded-[14px] border-[2px] border-[#15172B] bg-white p-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-[13px] font-bold">
          ニックネーム
          <input
            value={s.nick}
            maxLength={12}
            onChange={(e) => update((x) => ({ ...x, nick: e.target.value || "あなた" }))}
            className="ml-2 w-[9em] rounded-[8px] border-[1.5px] border-[#15172B] px-2 py-1 text-[14px] font-black"
          />
        </label>
        <span className="rounded-full bg-[#FFE45C] px-3 py-1 text-[13px] font-black">段{rank}　{r.name}</span>
        <span className="text-[14px] font-black"><Coin /> {balance(s)} コイン</span>
      </div>
      <p className="m-0 mt-2 text-[13px] text-[#3A3D55]">できること：{r.can}</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          disabled={learned}
          onClick={() => {
            update((x) => ({ ...x, learnedDays: [...x.learnedDays, today] }));
            addCoins(5, "自習ホームで学んだ");
          }}
          className="rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[13px] font-black disabled:opacity-50"
        >
          {learned ? "今日の学びは記録ずみ" : "今日の学びを記録（＋5コイン）"}
        </button>
        <Toggle on={s.member} label="ラーニングサークル会員権" price="月額2,980円（案）" onClick={() => update((x) => ({ ...x, member: !x.member, teacher: x.member ? false : x.teacher }))} />
        <Toggle on={s.teacher} disabled={!s.member} label="ティーチング登壇権" price="月額＋3,980円（案）" onClick={() => update((x) => ({ ...x, teacher: !x.teacher }))} />
      </div>
      <p className="m-0 mt-2 text-[11.5px] leading-relaxed text-[#5A5D73]">
        本番では、会員権は保護者の同意と支払いで入ります（生徒が保護者に「お願いのリンク」を送る）。試作では、ボタンで入ったことにできます。お金はかかりません。
        <Link href="/station/shelf" className="ml-1 font-bold text-[#1533B8]">段の上がり方は自分の棚へ</Link>
      </p>
    </section>
  );
}

function Toggle({ on, label, price, onClick, disabled }: { on: boolean; label: string; price: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" aria-pressed={on} disabled={disabled} onClick={onClick} className={`rounded-[10px] border-[1.5px] px-3 py-2 text-left text-[13px] font-black disabled:opacity-40 ${on ? "border-[#1533B8] bg-[#1533B8] text-white" : "border-[#15172B] bg-white"}`}>
      {on ? "✓ " : ""}{label}
      <span className={`block text-[11px] font-bold ${on ? "text-white/80" : "text-[#5A5D73]"}`}>{on ? "入っています（試作）" : `${price}・ためしに入る`}</span>
    </button>
  );
}
