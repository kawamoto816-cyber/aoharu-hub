"use client";

import Link from "next/link";
import { useState } from "react";
import { REQUESTS } from "@/lib/station/demo";
import { addCoins, newId, update, useStation } from "@/lib/station/store";
import type { TeachRequest } from "@/lib/station/types";

// 掲示板の「教えて」リクエスト。わからないことを出すと、同じことを知りたい人が「わたしも」で集まり、
// 覚えた人が「教えます」で手をあげて、教壇で授業をつくる（わからない人は教えてもらい、覚えた人は教える）。
// 出せるのは会員だけ。名前はニックネームだけで、個人どうしのやりとりはない（答えは授業の中で）。

type UnitOpt = { unit: string; name: string; label: string };
const input = "w-full rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1.5 text-[14px]";

export function Requests({ units }: { units: UnitOpt[] }) {
  const s = useStation();
  const [open, setOpen] = useState(false);
  const all = [...s.myRequests, ...REQUESTS].sort((a, b) => Number(!!a.taker || s.taken.includes(a.id)) - Number(!!b.taker || s.taken.includes(b.id)) || count(b) - count(a));
  function count(r: TeachRequest) {
    return r.metoo + (s.metoo.includes(r.id) ? 1 : 0);
  }
  const unitOf = (r: TeachRequest) => r.unit ?? units.find((u) => u.name === r.unitName || u.name.startsWith(r.unitName))?.unit;
  return (
    <section className="mt-4 rounded-[14px] border-[2px] border-[#15172B] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="m-0 text-[18px] font-black">「教えて」リクエスト</h2>
        <span className="text-[12.5px] text-[#5A5D73]">わからない人は教えてもらい、覚えた人は教える</span>
        {s.member ? (
          <button type="button" onClick={() => setOpen(!open)} className="ml-auto rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1.5 text-[13px] font-black">
            {open ? "閉じる" : "＋「教えて」を出す"}
          </button>
        ) : (
          <span className="ml-auto text-[12px] font-bold text-[#5A5D73]">会員になると「教えて」を出せます</span>
        )}
      </div>
      {open && s.member && <RequestForm units={units} onDone={() => setOpen(false)} />}
      <ul className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-2">
        {all.map((r) => {
          const mine = s.myRequests.some((m) => m.id === r.id);
          const taker = r.taker ?? (s.taken.includes(r.id) ? s.nick : undefined);
          const unit = unitOf(r);
          const me2 = s.metoo.includes(r.id);
          return (
            <li key={r.id} className={`rounded-[12px] border-[1.5px] p-3 ${taker ? "border-[#C9C7BD] bg-[#F7F6F1]" : "border-[#15172B] bg-white"}`}>
              <p className="m-0 flex flex-wrap items-center gap-2 text-[11.5px] font-bold text-[#5A5D73]">
                <span className="rounded-full bg-[#E6EAFB] px-2 py-0.5 text-[#1533B8]">{r.unitName}</span>
                <span>{r.by}{mine ? "（あなた）" : ""}</span>
                <span className="ml-auto">知りたい人 {count(r)}人</span>
              </p>
              <p className="m-0 mt-1 text-[14.5px] font-black leading-snug">{r.text}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {taker ? (
                  <span className="rounded-full bg-[#1533B8] px-2.5 py-1 text-[12px] font-black text-white">{taker}さんが授業を準備中</span>
                ) : (
                  <>
                    {!mine && (
                      <button
                        type="button"
                        disabled={!s.member}
                        aria-pressed={me2}
                        onClick={() => update((v) => ({ ...v, metoo: me2 ? v.metoo.filter((x) => x !== r.id) : [...v.metoo, r.id] }))}
                        className={`rounded-[9px] border-[1.5px] border-[#15172B] px-3 py-1 text-[12.5px] font-black disabled:opacity-40 ${me2 ? "bg-[#1533B8] text-white" : "bg-white"}`}
                      >
                        {me2 ? "✓ わたしも知りたい" : "わたしも知りたい"}
                      </button>
                    )}
                    {!mine && s.member && (
                      <Link href={`/station/stage?${new URLSearchParams({ ...(unit ? { unit } : {}), req: r.id }).toString()}`} className="rounded-[9px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1 text-[12.5px] font-black text-[#15172B] no-underline">
                        教えます →
                      </Link>
                    )}
                    {mine && <span className="text-[12px] text-[#5A5D73]">先生役が手をあげるのを待っています</span>}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="m-0 mt-2 text-[11.5px] leading-relaxed text-[#5A5D73]">
        「教えます」を押すと、教壇でその単元の授業をつくれます（教壇に立つ条件：シェア4回・オシエル合格・登壇権）。答えは個人あてには送らず、授業の中で返します。
      </p>
    </section>
  );
}

function RequestForm({ units, onDone }: { units: UnitOpt[]; onDone: () => void }) {
  const s = useStation();
  const [q, setQ] = useState("");
  const [unit, setUnit] = useState<UnitOpt | null>(null);
  const [text, setText] = useState("");
  const hits = q.trim() && !unit ? units.filter((u) => u.name.includes(q.trim())).slice(0, 20) : [];
  const ok = (unit || q.trim().length >= 2) && text.trim().length >= 8;
  return (
    <form
      className="mt-3 grid gap-2 rounded-[12px] bg-[#F7F6F1] p-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!ok) return;
        const r: TeachRequest = { id: newId("q"), by: s.nick, at: new Date().toISOString(), unit: unit?.unit, unitName: unit?.name ?? q.trim().slice(0, 20), text: text.trim(), metoo: 0 };
        update((v) => ({ ...v, myRequests: [r, ...v.myRequests] }));
        addCoins(1, "「教えて」を出した");
        onDone();
      }}
    >
      <label className="text-[12.5px] font-bold">
        どの単元？
        {unit ? (
          <span className="mt-0.5 flex items-center gap-2 text-[14px]">
            <b>{unit.name}</b>
            <span className="text-[12px] text-[#5A5D73]">{unit.label}</span>
            <button type="button" onClick={() => setUnit(null)} className="text-[12px] font-bold text-[#1533B8] underline">えらびなおす</button>
          </span>
        ) : (
          <input className={input} value={q} maxLength={20} onChange={(e) => setQ(e.target.value)} placeholder="例：三角比・関係代名詞（見つからなければそのまま書く）" />
        )}
      </label>
      {hits.length > 0 && (
        <ul className="m-0 max-h-[160px] list-none overflow-auto rounded-[8px] border border-[#C9C7BD] bg-white p-0">
          {hits.map((u) => (
            <li key={u.unit}>
              <button type="button" onClick={() => setUnit(u)} className="block w-full px-2 py-1.5 text-left text-[13px] hover:bg-[#E6EAFB]">
                <span className="text-[11px] text-[#5A5D73]">{u.label}</span> {u.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <label className="text-[12.5px] font-bold">
        なにがわからない？（どこまでわかって、どこからわからないか）
        <textarea className={input} rows={2} value={text} maxLength={120} onChange={(e) => setText(e.target.value)} placeholder="例：√8 を 2√2 にする理由がわからない" />
      </label>
      <p className="m-0 text-[11.5px] text-[#5A5D73]">名前・学校・連絡先は書かないでください。ニックネームで出ます。</p>
      <button type="submit" disabled={!ok} className="justify-self-start rounded-[10px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 py-2 text-[14px] font-black text-white disabled:opacity-40">
        「教えて」を出す
      </button>
    </form>
  );
}
