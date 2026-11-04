"use client";

import { useEffect, useMemo, useState } from "react";
import { SOS_LINE, needsSos } from "@/lib/oshieru/safety";
import { MAX_INPUT, WRITE_ROUND, lines, writable, type Fixed, type TsukkomiAiResponse, type TsukkomiJudge } from "@/lib/tsukkomi/ai";
import { pickRound } from "@/lib/tsukkomi/score";
import type { BokeWithAudio } from "@/lib/tsukkomi/types";
import { Sentence } from "./Sentence";

// ツッコミ学習法の「書いてツッコむ（AIが判定）」。時間制限なし・1回 WRITE_ROUND 問（まちがいのある文だけ）。
// 1問の流れ：ボケの文を読む →「どこがまちがい？」「どう直す？」を自分の言葉で書く →「AIに見てもらう」
//   → AIの判定（場所を見つけたか・直しが合っているか・次に考えるための一言）→ 正しい文とわけ（既存データ。AIの文ではない）。
// AIにつながらない（準備中・回数切れ・判定できない）ときも「答えを見る」で既存の答え合わせができる。
// 書いた文はこの画面の state にだけ持つ（端末にもサーバーにも残さない）。点数・記録（localStorage）には入れない。
// ページの URL に ?mock=1 があれば AIなしの判定（文字の一致だけ・回数を数えない）。

type Status = { configured: boolean; remaining: number; limit: number; tier: string } | null;
type Step = "write" | "judged" | "revealed" | "sos";
type Done = { id: string; fixed: Fixed | null };

const TIER_LABEL: Record<string, string> = { guest: "登録なし", free: "無料登録", pro: "Pro", max: "Max" };
const FIXED_LABEL: Record<Fixed, { text: string; cls: string }> = {
  ok: { text: "直し ◎ 合っている", cls: "bg-[#1533B8] text-white" },
  partial: { text: "直し △ おしい", cls: "bg-[#FFE45C] text-[#15172B]" },
  no: { text: "直し × もう一歩", cls: "bg-[#F7F6F1] text-[#B42318]" },
};
const btn = "flex min-h-[48px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] px-4 text-[15px] font-black no-underline active:translate-y-0.5 disabled:opacity-50";

export function TsukkomiWrite({ items, missed, onExit }: { items: BokeWithAudio[]; missed: ReadonlySet<string>; onExit: () => void }) {
  const byId = useMemo(() => new Map(items.map((b) => [b.id, b])), [items]);
  const [order] = useState(() => pickRound(items.filter(writable), missed, Math.random, WRITE_ROUND));
  const [qi, setQi] = useState(0);
  const [step, setStep] = useState<Step>("write");
  const [where, setWhere] = useState("");
  const [fix, setFix] = useState("");
  const [judge, setJudge] = useState<TsukkomiJudge | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done[]>([]);
  const [finished, setFinished] = useState(false);
  const [mock] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get("mock") === "1";
    } catch {
      return false;
    }
  });
  const [status, setStatus] = useState<Status>(null);
  const [limited, setLimited] = useState(false);

  useEffect(() => {
    if (mock) return;
    fetch("/api/tsukkomi", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: Status) => setStatus(j))
      .catch(() => setStatus(null));
  }, [mock]);

  const cur = byId.get(order[qi] ?? "");
  const notConfigured = !mock && status !== null && !status.configured;
  const noneLeft = !mock && (limited || (status !== null && status.configured && status.remaining <= 0));
  const aiOff = notConfigured || noneLeft;

  async function ask() {
    if (!cur || busy) return;
    const w = where.trim();
    const f = fix.trim();
    if (!w && !f) return;
    setNote("");
    // 安全の決まり：つらいことが書かれていたら、送らずに相談窓口を出す
    if (needsSos(`${w}\n${f}`)) {
      setStep("sos");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/tsukkomi", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ unit: cur.unit, id: cur.id, where: w, fix: f, mock: mock || undefined }),
      });
      const j = (await res.json()) as TsukkomiAiResponse & { error?: string };
      if (!res.ok) {
        if (j.error === "not_configured") setStatus((s) => ({ ...(s ?? { remaining: 0, limit: 0, tier: "guest" }), configured: false }));
        else if (res.status === 429) {
          setLimited(true);
          setNote("きょうのAIの判定の回数をつかいきりました。下の「答えを見る」で答え合わせしよう。");
        } else {
          // 判定できなかった：既存の答え合わせへ
          setNote(lines.unjudged);
          reveal(null);
        }
        return;
      }
      if (j.sos) return setStep("sos");
      if (j.refused) return setNote(lines.refused);
      if (typeof j.remaining === "number") setStatus((s) => (s ? { ...s, remaining: j.remaining! } : s));
      if (typeof j.found !== "boolean" || !j.fixed || !j.hint) {
        setNote(lines.unjudged);
        reveal(null);
        return;
      }
      const r = { found: j.found, fixed: j.fixed, hint: j.hint };
      setJudge(r);
      // 直しが合っていたら、そのまま正しい文とわけを出す
      if (r.fixed === "ok") reveal(r.fixed);
      else setStep("judged");
    } catch {
      setNote("うまくつながりませんでした。もう一度送るか、「答えを見る」で答え合わせしよう。");
    } finally {
      setBusy(false);
    }
  }

  function reveal(fixed: Fixed | null) {
    if (!cur) return;
    setStep("revealed");
    setDone((d) => (d.some((x) => x.id === cur.id) ? d : [...d, { id: cur.id, fixed }]));
  }

  function next() {
    if (qi + 1 >= order.length) {
      setFinished(true);
      return;
    }
    setQi(qi + 1);
    setStep("write");
    setWhere("");
    setFix("");
    setJudge(null);
    setNote("");
    window.scrollTo({ top: 0 });
  }

  const header = (
    <div className="flex items-center gap-2">
      <p className="m-0 text-[15px] font-black">
        書いてツッコむ <span className="ml-1 rounded-full bg-[#15172B] px-2 py-0.5 align-[2px] text-[11px] text-[#FFE45C]">AIが判定</span>
      </p>
      <button type="button" onClick={onExit} className="ml-auto flex-none rounded-full border-[1.5px] border-[#15172B] bg-white px-3 py-1 text-[13px] font-bold">
        やめる
      </button>
    </div>
  );

  if (finished || !cur) {
    const okN = done.filter((d) => d.fixed === "ok").length;
    return (
      <div className="grid gap-3">
        {header}
        <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4">
          <p className="m-0 text-[17px] font-black">{order.length ? `${order.length}問おわり` : "この単元には書いてツッコむ問題がありません"}</p>
          {order.length > 0 && <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">AIが「直し ◎」と判定したのは {okN} 問。点数・記録には入りません。選ぶモードで点数にも挑戦しよう。</p>}
        </section>
        <button type="button" onClick={onExit} className={`${btn} bg-[#15172B] text-white shadow-[3px_3px_0_#B42318]`}>
          はじめの画面へ
        </button>
      </div>
    );
  }

  const shown = step === "revealed";
  return (
    <div className="grid gap-3">
      {header}
      <p className="m-0 text-[13px] font-black">
        第{qi + 1}問<span className="text-[#5A5D73]"> / {order.length}</span>　<span className="font-bold text-[#5A5D73]">時間制限なし</span>
      </p>
      {mock && <p className="m-0 rounded-[10px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] px-2.5 py-1.5 text-[12px] font-bold">ためしモード：AIは使っていません。文字の一致だけで判定します（画面のためし用）。</p>}

      <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-3.5">
        <p className="m-0 text-[11px] font-black text-[#B42318]">ボケ</p>
        <p className="m-0 mt-1 text-[16px] font-bold leading-[1.9]">{shown ? <Sentence b={cur} mark="wrong" /> : cur.tokens.join("")}</p>
      </section>

      {step === "sos" ? (
        <div role="alert" className="rounded-[14px] border-[2px] border-[#B42318] bg-white p-3">
          <p className="m-0 text-[15px] font-black">ひとりでかかえこまないでね</p>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">話してくれてありがとう。勉強はいったんお休みにしよう。おうちの人や先生など、信じられる大人に話してみよう。電話でも相談できます。</p>
          <a href={SOS_LINE.telHref} className={`${btn} mt-2.5 flex-col gap-0 bg-[#B42318] text-white`}>
            <span className="text-[12px] font-bold">{SOS_LINE.name}</span>
            <span className="text-[22px] tabular-nums tracking-wide">{SOS_LINE.tel}</span>
          </a>
          <p className="m-0 mt-1.5 text-center text-[11.5px] text-[#5A5D73]">{SOS_LINE.note}</p>
        </div>
      ) : (
        <>
          <div className="grid gap-2">
            <label className="grid gap-1 text-[14px] font-black">
              <span>
                <span className="mr-1 rounded-[6px] bg-[#15172B] px-1.5 py-0.5 text-[12px] text-white">①</span>どこがまちがい？
              </span>
              <textarea
                value={where}
                onChange={(e) => setWhere(e.target.value.slice(0, MAX_INPUT))}
                readOnly={step !== "write"}
                rows={2}
                placeholder="まちがっている語句や部分を書く"
                className="w-full resize-none rounded-[12px] border-[1.5px] border-[#15172B] bg-[#F7F6F1] px-3 py-2 text-[16px] font-normal leading-relaxed outline-none focus:bg-white"
              />
            </label>
            <label className="grid gap-1 text-[14px] font-black">
              <span>
                <span className="mr-1 rounded-[6px] bg-[#15172B] px-1.5 py-0.5 text-[12px] text-white">②</span>どう直す？（わけも書けたら書こう）
              </span>
              <textarea
                value={fix}
                onChange={(e) => setFix(e.target.value.slice(0, MAX_INPUT))}
                readOnly={step !== "write"}
                rows={2}
                placeholder="正しくはどう言えばいいか、自分の言葉で"
                className="w-full resize-none rounded-[12px] border-[1.5px] border-[#15172B] bg-[#F7F6F1] px-3 py-2 text-[16px] font-normal leading-relaxed outline-none focus:bg-white"
              />
            </label>
          </div>

          {note && <p className="m-0 rounded-[12px] border-l-4 border-[#B42318] bg-white px-3 py-2 text-[13.5px] font-bold">{note}</p>}

          {judge && (
            <section aria-live="polite" className="rounded-[16px] border-[1.5px] border-[#15172B] bg-[#E6EAFB] p-3">
              <p className="m-0 text-[11px] font-black text-[#1533B8]">AIの判定</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5 text-[13px] font-black">
                <span className={`rounded-full border border-[#15172B] px-2.5 py-0.5 ${judge.found ? "bg-[#1533B8] text-white" : "bg-[#F7F6F1] text-[#B42318]"}`}>
                  場所 {judge.found ? "○ 見つけた" : "× ちがう所かも"}
                </span>
                <span className={`rounded-full border border-[#15172B] px-2.5 py-0.5 ${FIXED_LABEL[judge.fixed].cls}`}>{FIXED_LABEL[judge.fixed].text}</span>
              </div>
              <p className="m-0 mt-2 text-[15px] font-bold leading-relaxed">{judge.hint}</p>
            </section>
          )}

          {step === "write" && (
            <div className="grid gap-2">
              {notConfigured ? (
                <p className="m-0 flex items-center gap-2 rounded-[12px] bg-[#F7F6F1] px-3 py-2 text-[13.5px] font-bold">
                  <span className="rounded-full bg-[#15172B] px-2.5 py-0.5 text-[11px] text-[#FFE45C]">準備中</span>
                  AIの判定は準備中です。書いたら「答えを見る」で答え合わせしよう。
                </p>
              ) : (
                <button type="button" onClick={() => void ask()} disabled={busy || aiOff || (!where.trim() && !fix.trim())} className={`${btn} bg-[#1533B8] text-white shadow-[2px_2px_0_#15172B]`}>
                  {busy ? "AIが見ています…" : "AIに見てもらう"}
                </button>
              )}
              <button type="button" onClick={() => reveal(null)} disabled={busy} className={`${btn} bg-white text-[#15172B]`}>
                答えを見る（自分で答え合わせ）
              </button>
              {!mock && status?.configured && (
                <p className="m-0 text-center text-[12px] text-[#5A5D73]">
                  {TIER_LABEL[status.tier] ?? ""}：AIの判定はきょうあと {status.remaining} 回
                </p>
              )}
            </div>
          )}

          {step === "judged" && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setStep("write");
                  setJudge(null);
                }}
                className={`${btn} bg-[#FFE45C] text-[#15172B] shadow-[2px_2px_0_#15172B]`}
              >
                書きなおす
              </button>
              <button type="button" onClick={() => reveal(judge?.fixed ?? null)} className={`${btn} bg-white text-[#15172B]`}>
                答えを見る
              </button>
            </div>
          )}

          {shown && (
            <>
              <section className="rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3">
                <p className="m-0 text-[11px] font-black text-[#B42318]">答え合わせ</p>
                <p className="m-0 mt-1 text-[15px] font-bold leading-relaxed">
                  正しくは、
                  <Sentence b={cur} mark="right" />
                </p>
                <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">{cur.explain.why}</p>
              </section>
              <button type="button" onClick={next} className={`${btn} bg-[#15172B] text-white shadow-[3px_3px_0_#B42318]`}>
                {qi + 1 < order.length ? "次のボケへ" : "おわる"}
              </button>
            </>
          )}
        </>
      )}

      <p className="m-0 text-[11.5px] leading-relaxed text-[#5A5D73]">{lines.notice}</p>
    </div>
  );
}
