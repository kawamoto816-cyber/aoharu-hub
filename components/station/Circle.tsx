"use client";

import Link from "next/link";
import { useState } from "react";
import { CIRCLE_MEMBERS, MY_CIRCLE, SHARES, SLOTS } from "@/lib/station/demo";
import { addCoins, newId, update, useStation } from "@/lib/station/store";
import type { ShareCard } from "@/lib/station/types";

const card = "rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4";
const input = "w-full rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1.5 text-[14px]";

export function Circle() {
  const s = useStation();
  const next = SLOTS.find((x) => x.kind === "share" && x.host === MY_CIRCLE);
  const cards = [...s.myShares, ...SHARES];

  if (!s.member) {
    return (
      <div className={`${card} mt-4`}>
        <h2 className="m-0 text-[17px] font-black">ラーニングサークルは準備中です（試作を公開中）</h2>
        <p className="m-0 mt-2 text-[14px] leading-relaxed">
          まだ募集していません。値段や始める時期も決まっていません。試作の画面は、駅の入口の「ラーニングサークル」のボタンをオンにすると動かせます（お金はかかりません）。
        </p>
        <ul className="m-0 mt-2 pl-5 text-[14px] leading-loose">
          <li>
            <Link href="/station/board" className="font-bold text-[#1533B8]">掲示板</Link>で、シェア会の時間割の見本を見られます
          </li>
          <li>始めるときは、保護者の同意をいただいてから参加する形にします</li>
        </ul>
        <Link href="/station" className="mt-3 inline-block rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 py-2 text-[14px] font-black text-[#15172B] no-underline">駅の入口へ</Link>
        <h3 className="m-0 mt-5 text-[14px] font-black">シェアカードの見本（架空のニックネーム）</h3>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {SHARES.slice(0, 2).map((c) => (
            <CardView key={c.id} c={c} readonly />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-[320px_1fr]">
      <div className="grid content-start gap-4">
        <section className={card}>
          <h2 className="m-0 text-[17px] font-black">{MY_CIRCLE}<span className="ml-2 text-[11.5px] font-bold text-[#5A5D73]">見本のサークル</span></h2>
          {next && (
            <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">
              次のシェア会：{Number(next.at.slice(5, 7))}月{Number(next.at.slice(8, 10))}日 {next.at.slice(11, 16)}〜
            </p>
          )}
          <ul className="m-0 mt-2 list-none p-0 text-[14px]">
            {CIRCLE_MEMBERS.map((m) => (
              <li key={m.nick} className="flex items-center gap-2 border-b border-[#E4E2D8] py-1.5">
                <Avatar nick={m.nick} />
                <span className="font-black">{m.nick}</span>
                <span className="text-[12px] text-[#5A5D73]">{m.grade}</span>
                {m.role && <span className="ml-auto rounded-full bg-[#E6EAFB] px-2 text-[11px] font-black text-[#1533B8]">{m.role}</span>}
              </li>
            ))}
            <li className="flex items-center gap-2 py-1.5">
              <Avatar nick={s.nick} me />
              <span className="font-black">{s.nick}</span>
              <span className="text-[12px] text-[#5A5D73]">あなた</span>
            </li>
          </ul>
          <p className="m-0 mt-2 text-[11.5px] leading-relaxed text-[#5A5D73]">
            見守り役（運営）が毎回同席します。個人どうしのメッセージはありません。連絡先やSNSの交換は禁止です。
          </p>
        </section>
        <ShareForm />
      </div>
      <section>
        <h2 className="m-0 mb-2 text-[17px] font-black">シェアカード<span className="ml-2 text-[11.5px] font-bold text-[#5A5D73]">あなたのカード以外は見本</span></h2>
        <div className="grid gap-3">
          {cards.map((c) => (
            <CardView key={c.id} c={c} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Avatar({ nick, me }: { nick: string; me?: boolean }) {
  return (
    <span aria-hidden="true" className={`flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-[#15172B] text-[12px] font-black ${me ? "bg-[#FFE45C]" : "bg-[#E6EAFB]"}`}>
      {nick.slice(0, 1)}
    </span>
  );
}

function ShareForm() {
  const s = useStation();
  const [title, setTitle] = useState("");
  const [unitName, setUnit] = useState("");
  const [p, setP] = useState(["", "", ""]);
  const [open, setOpen] = useState("");
  const [done, setDone] = useState(false);
  const ok = title.trim().length >= 4 && p.filter((x) => x.trim()).length >= 1;
  return (
    <section className={card}>
      <h2 className="m-0 text-[17px] font-black">シェアカードをつくる</h2>
      <p className="m-0 mt-1 text-[12.5px] text-[#5A5D73]">今週学んだことを、3分で話せる1枚に。シェア会のあと、自分の棚に残ります。</p>
      <form
        className="mt-2 grid gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!ok) return;
          const c: ShareCard = { id: newId("m"), by: s.nick, at: new Date().toISOString(), title: title.trim(), unitName: unitName.trim() || undefined, points: p.map((x) => x.trim()).filter(Boolean), open: open.trim() || undefined, questions: [], claps: 0 };
          update((v) => ({ ...v, myShares: [c, ...v.myShares] }));
          addCoins(10, "シェアした");
          setTitle("");
          setUnit("");
          setP(["", "", ""]);
          setOpen("");
          setDone(true);
        }}
      >
        <label className="text-[12.5px] font-bold">
          題
          <input className={input} value={title} maxLength={40} onChange={(e) => setTitle(e.target.value)} placeholder="例：比例は「いっしょに何倍」" />
        </label>
        <label className="text-[12.5px] font-bold">
          学んだ単元（なくてもよい）
          <input className={input} value={unitName} maxLength={30} onChange={(e) => setUnit(e.target.value)} placeholder="例：比例と反比例" />
        </label>
        {p.map((v, i) => (
          <label key={i} className="text-[12.5px] font-bold">
            伝えたいこと {i + 1}
            <input className={input} value={v} maxLength={60} onChange={(e) => setP(p.map((x, j) => (j === i ? e.target.value : x)))} />
          </label>
        ))}
        <label className="text-[12.5px] font-bold">
          まだ分からないこと（なくてもよい）
          <input className={input} value={open} maxLength={60} onChange={(e) => setOpen(e.target.value)} />
        </label>
        <button type="submit" disabled={!ok} className="rounded-[10px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-3 py-2 text-[14px] font-black text-white disabled:opacity-40">
          シェアする（＋10コイン）
        </button>
        {done && <p className="m-0 text-[12.5px] font-bold text-[#1533B8]">シェアしました。仲間からの問いを待ちましょう。</p>}
      </form>
    </section>
  );
}

function CardView({ c, readonly }: { c: ShareCard; readonly?: boolean }) {
  const s = useStation();
  const [q, setQ] = useState("");
  const extra = s.questions[c.id] ?? [];
  const clapped = s.clapped.includes(c.id);
  const mine = c.by === s.nick && c.id.startsWith("m");
  return (
    <article className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
      <p className="m-0 text-[11.5px] font-bold text-[#5A5D73]">
        {c.by}{mine ? "（あなた）" : ""}・{c.unitName ?? "テーマ自由"}
      </p>
      <h3 className="m-0 mt-0.5 text-[16px] font-black">{c.title}</h3>
      <ol className="m-0 mt-1.5 pl-5 text-[14px] leading-relaxed">
        {c.points.map((pt) => (
          <li key={pt}>{pt}</li>
        ))}
      </ol>
      {c.open && <p className="m-0 mt-1.5 rounded-[8px] bg-[#F7F6F1] px-2 py-1 text-[13px]">まだ分からない：{c.open}</p>}
      <div className="mt-2 grid gap-1">
        {([...c.questions, ...extra] as { by: string; text: string; answer?: string }[]).map((x, i) => (
          <div key={i} className="text-[13px] leading-relaxed">
            <span className="font-black text-[#1533B8]">問い（{x.by}）</span> {x.text}
            {x.answer ? <span className="block pl-3 text-[#3A3D55]">→ {x.answer}</span> : null}
          </div>
        ))}
      </div>
      {!readonly && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={clapped || mine}
            onClick={() => update((v) => ({ ...v, clapped: [...v.clapped, c.id] }))}
            className="rounded-full border-[1.5px] border-[#15172B] bg-white px-3 py-1 text-[13px] font-black disabled:opacity-50"
          >
            拍手 {c.claps + (clapped ? 1 : 0)}
          </button>
          {!mine && (
            <form
              className="flex min-w-[220px] flex-1 gap-1.5"
              onSubmit={(e) => {
                e.preventDefault();
                const t = q.trim();
                if (t.length < 4) return;
                update((v) => ({ ...v, questions: { ...v.questions, [c.id]: [...(v.questions[c.id] ?? []), { by: v.nick, text: t }] } }));
                addCoins(2, "問いを返した");
                setQ("");
              }}
            >
              <input className={input} value={q} maxLength={80} onChange={(e) => setQ(e.target.value)} placeholder="問いを返す（人ではなく中身に）" />
              <button type="submit" className="whitespace-nowrap rounded-[8px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-2 text-[13px] font-black">＋2</button>
            </form>
          )}
        </div>
      )}
      <p className="m-0 mt-1 text-[11px] text-[#8A8C9C]">反応は「問い」と「拍手」だけ。点数やいいねの数は出しません。</p>
    </article>
  );
}
