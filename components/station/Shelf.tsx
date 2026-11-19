"use client";

import Link from "next/link";
import { LESSONS } from "@/lib/station/demo";
import { RANKS, rankOf } from "@/lib/station/rating";
import { balance, resetStation, useStation } from "@/lib/station/store";
import { Coin } from "./StationNav";

const card = "rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4";

export function Shelf() {
  const s = useStation();
  const shares = s.myShares.length;
  const taught = s.myLessons.length;
  const rank = rankOf({ member: s.member, teacher: s.teacher, shares, taught, oshieruPassed: s.oshieruPassed.length });
  const qs = Object.values(s.questions).reduce((a, x) => a + x.length, 0);
  const attended = LESSONS.filter((l) => s.attended.includes(l.id));
  return (
    <div className="mt-4 grid gap-4">
      <section className={card}>
        <h2 className="m-0 text-[17px] font-black">会員の段</h2>
        <ol className="m-0 mt-2 grid list-none gap-1.5 p-0 sm:grid-cols-5">
          {RANKS.map((r) => (
            <li key={r.rank} className={`rounded-[10px] border-[1.5px] p-2 text-[12px] leading-relaxed ${r.rank === rank ? "border-[#1533B8] bg-[#1533B8] text-white" : r.rank < rank ? "border-[#15172B] bg-[#E6EAFB]" : "border-dashed border-[#C9C7BD] bg-white"}`}>
              <b className="block text-[14px]">段{r.rank} {r.name}</b>
              <span className="block">{r.can}</span>
              <span className={`mt-1 block font-bold ${r.rank === rank ? "text-white/80" : "text-[#5A5D73]"}`}>条件：{r.need}</span>
            </li>
          ))}
        </ol>
        <p className="m-0 mt-2 text-[13px]">
          シェア {shares}回・授業 {taught}回・オシエル合格 {s.oshieruPassed.length}単元{s.oshieruPassed.length ? `（${s.oshieruPassed.join("・")}）` : ""}
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className={card}>
          <h2 className="m-0 text-[17px] font-black">シェアカード</h2>
          {s.myShares.length === 0 ? (
            <p className="m-0 mt-1 text-[13px] text-[#5A5D73]">
              まだありません。<Link href="/station/circle" className="font-bold text-[#1533B8]">サークル</Link>でシェアすると、ここに並びます。
            </p>
          ) : (
            <ul className="m-0 mt-2 grid list-none gap-1.5 p-0">
              {s.myShares.map((c) => (
                <li key={c.id} className="rounded-[10px] bg-[#F7F6F1] px-3 py-2 text-[13px]">
                  <b>{c.title}</b>
                  <span className="block text-[12px] text-[#5A5D73]">{c.unitName ?? "テーマ自由"}・問い {(s.questions[c.id] ?? []).length + c.questions.length}件</span>
                </li>
              ))}
            </ul>
          )}
          <h2 className="m-0 mt-4 text-[17px] font-black">教えた授業</h2>
          {s.myLessons.length === 0 ? (
            <p className="m-0 mt-1 text-[13px] text-[#5A5D73]">
              まだありません。<Link href="/station/stage" className="font-bold text-[#1533B8]">教壇</Link>で授業をつくれます。
            </p>
          ) : (
            <ul className="m-0 mt-2 grid list-none gap-1.5 p-0">
              {s.myLessons.map((m) => (
                <li key={m.id} className="rounded-[10px] bg-[#F7F6F1] px-3 py-2 text-[13px]">
                  <b>{m.plan.title}</b>
                  <span className="block text-[12px] text-[#5A5D73]">{m.check.unitName}・AI点検 {m.check.score}点</span>
                </li>
              ))}
            </ul>
          )}
          <h2 className="m-0 mt-4 text-[17px] font-black">受けた授業</h2>
          <p className="m-0 mt-1 text-[13px]">{attended.length ? attended.map((l) => `${l.teacher}「${l.unitName}」`).join("・") : "まだありません"}</p>
        </section>

        <section className={card}>
          <h2 className="m-0 text-[17px] font-black"><Coin /> ブルーコイン {balance(s)}</h2>
          <p className="m-0 mt-1 text-[12px] leading-relaxed text-[#5A5D73]">学ぶ＋5・シェア＋10・問いを返す＋2・授業を受ける＋3・評価する＋2・教える＋20（試作の値）。お金で買えず、換金もできません。</p>
          <ul className="m-0 mt-2 max-h-[260px] list-none overflow-auto p-0 text-[13px]">
            {s.coins.map((c, i) => (
              <li key={i} className="flex justify-between border-b border-[#E4E2D8] py-1">
                <span>{c.reason}</span>
                <b className={c.delta < 0 ? "text-[#B42318]" : "text-[#1533B8]"}>{c.delta > 0 ? `+${c.delta}` : c.delta}</b>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className={`${card} border-dashed`}>
        <p className="m-0 text-[11.5px] font-black text-[#5A5D73]">保護者への月のレポート（見本）</p>
        <h2 className="m-0 mt-1 text-[17px] font-black">{s.nick}さんの今月</h2>
        <ul className="m-0 mt-2 grid list-none gap-1 p-0 text-[14px] sm:grid-cols-4">
          <li className="rounded-[10px] bg-[#F7F6F1] p-2 text-center"><span className="block text-[11.5px] text-[#5A5D73]">学んだ日</span><b className="text-[20px]">{s.learnedDays.length}</b></li>
          <li className="rounded-[10px] bg-[#F7F6F1] p-2 text-center"><span className="block text-[11.5px] text-[#5A5D73]">シェア</span><b className="text-[20px]">{shares}</b></li>
          <li className="rounded-[10px] bg-[#F7F6F1] p-2 text-center"><span className="block text-[11.5px] text-[#5A5D73]">仲間に返した問い</span><b className="text-[20px]">{qs}</b></li>
          <li className="rounded-[10px] bg-[#F7F6F1] p-2 text-center"><span className="block text-[11.5px] text-[#5A5D73]">教えた授業</span><b className="text-[20px]">{taught}</b></li>
        </ul>
        <p className="m-0 mt-2 text-[13px] leading-relaxed text-[#3A3D55]">
          {shares ? `今月は「${s.myShares[0].title}」をシェアしました。` : "今月はまだシェアがありません。"}
          本番では、シェアの短い録画と、仲間からもらった問いもお届けします（本人と保護者の同意があるものだけ）。
        </p>
      </section>

      <button type="button" onClick={() => resetStation()} className="justify-self-start text-[12px] font-bold text-[#5A5D73] underline">
        試作の記録を消して、最初からためす
      </button>
    </div>
  );
}
