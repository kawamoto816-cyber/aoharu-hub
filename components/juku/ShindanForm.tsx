"use client";

import { useEffect, useRef, useState } from "react";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { trackEvent } from "@/lib/analytics";

// /juku/shindan の入力と結果。生徒の文章を1人ずつ /api/juku/shindan に送り、点数と「いちばん大事な直し」を一覧にする。
// 生徒の名前は入れない（生徒A〜J と呼ぶ）。文章はこの画面の中だけで、保存しない。

const LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;
const KINDS = [
  { v: "shibo", label: "志望理由書" },
  { v: "shoronbun", label: "小論文" },
  { v: "jiko", label: "自己推薦書・自己PR" },
] as const;
const MIN = 80;
const MAX = 2000;

interface Row {
  total: number;
  nextStep: string;
  firstPoint: { quote: string; problem: string; hint: string } | null;
}

const ERRORS: Record<string, string> = {
  used_this_month: "無料の診断は、30日に1回までです。続けて使う場合は、下の塾向けプランをご覧ください。",
  batch_full: "1回の診断は10人分までです。",
  unauthenticated: "ログインが切れました。もう一度ログインしてください。",
  failed: "診断に失敗しました。少し時間をおいて、もう一度お試しください。",
};

export function ShindanForm() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [kind, setKind] = useState<string>("shibo");
  const [target, setTarget] = useState("");
  const [texts, setTexts] = useState<string[]>(["", "", ""]);
  const [rows, setRows] = useState<(Row | null)[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const batchRef = useRef<string | null>(null); // この画面での1回の診断（同じ番号で10人分まで）

  useEffect(() => {
    fetch("/api/tensaku/full")
      .then((r) => r.json())
      .then((s: { signedIn?: boolean }) => setSignedIn(Boolean(s.signedIn)))
      .catch(() => setSignedIn(false));
  }, []);

  const filled = texts.map((t, i) => ({ i, t: t.trim() })).filter((x) => x.t.length > 0);
  const invalid = filled.some((x) => x.t.length < MIN || x.t.length > MAX);

  async function run() {
    if (filled.length === 0 || invalid) return;
    if (!batchRef.current) batchRef.current = `jk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const batchId = batchRef.current;
    setBusy(true);
    setError(null);
    setRows(texts.map(() => null));
    trackEvent("juku_shindan_start", { count: filled.length });
    for (const { i, t } of filled) {
      try {
        const res = await fetch("/api/juku/shindan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ batchId, kind, target, text: t }),
        });
        const json = (await res.json().catch(() => ({}))) as Row & { error?: string };
        if (!res.ok) {
          setError(ERRORS[json.error ?? "failed"] ?? ERRORS.failed);
          break;
        }
        setRows((prev) => prev.map((r, k) => (k === i ? json : r)));
      } catch {
        setError(ERRORS.failed);
        break;
      }
    }
    setBusy(false);
    trackEvent("juku_shindan_done", { count: filled.length });
  }

  const done = rows.map((r, i) => ({ r, i })).filter((x): x is { r: Row; i: number } => x.r !== null);
  const avg = done.length ? Math.round(done.reduce((s, x) => s + x.r.total, 0) / done.length) : null;

  if (signedIn === false) {
    return (
      <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5">
        <p className="m-0 text-sm leading-relaxed">
          診断には、先生ご自身の無料登録（メールアドレスだけ）が必要です。登録したら、このページに戻ってきます。
        </p>
        <SmartSignUpButton
          analyticsLocation="juku_shindan"
          redirectUrl="/juku/shindan"
          className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-[14px] bg-[#FFE45C] text-[16px] font-black text-[#15172B] shadow-[0_4px_0_#15172B]"
        >
          無料登録して、診断をはじめる
        </SmartSignUpButton>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 sm:grid-cols-2">
        <label className="text-sm font-bold">
          書類の種類
          <select value={kind} onChange={(e) => setKind(e.target.value)} className="mt-1 block w-full rounded-lg border border-[#15172B]/30 px-3 py-2 text-sm font-normal">
            {KINDS.map((k) => (
              <option key={k.v} value={k.v}>
                {k.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold">
          志望先（任意・全員共通）
          <input value={target} onChange={(e) => setTarget(e.target.value)} maxLength={60} placeholder="例：龍谷大学 経済学部" className="mt-1 block w-full rounded-lg border border-[#15172B]/30 px-3 py-2 text-sm font-normal" />
        </label>
      </div>

      <p className="m-0 text-xs text-[#5A5D73]">生徒の名前・学校名は書かないでください（画面では「生徒A」のように呼びます）。文章は保存しません。1人{MIN}〜{MAX}字です。</p>

      {texts.map((t, i) => (
        <div key={i} className="rounded-2xl border border-[#15172B]/20 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="m-0 text-sm font-black">生徒{LABELS[i]}</p>
            <p className={`m-0 text-xs ${t.trim() && (t.trim().length < MIN || t.trim().length > MAX) ? "font-bold text-[#D9341F]" : "text-[#5A5D73]"}`}>{t.trim().length}字</p>
          </div>
          <textarea
            value={t}
            onChange={(e) => setTexts((prev) => prev.map((x, k) => (k === i ? e.target.value : x)))}
            rows={5}
            className="mt-2 block w-full rounded-lg border border-[#15172B]/30 px-3 py-2 text-sm leading-relaxed"
            placeholder="生徒の書いた文章を貼ってください"
          />
          {rows[i] && (
            <div className="mt-3 rounded-xl bg-[#F3F5FD] px-4 py-3 text-sm leading-relaxed">
              <p className="m-0 font-black">{rows[i]!.total}点 / 100</p>
              <p className="m-0 mt-1">
                <span className="font-bold">いちばん大事な直し：</span>
                {rows[i]!.nextStep}
              </p>
            </div>
          )}
        </div>
      ))}

      {texts.length < 10 && (
        <button type="button" onClick={() => setTexts((p) => [...p, ""])} className="rounded-xl border-[1.5px] border-dashed border-[#15172B]/40 px-4 py-3 text-sm font-bold text-[#3A3D55]">
          ＋ 生徒を足す（最大10人）
        </button>
      )}

      {error && <p className="m-0 rounded-xl bg-[#FDECEA] px-4 py-3 text-sm font-bold text-[#B3261E]">{error}</p>}

      <button
        type="button"
        onClick={run}
        disabled={busy || filled.length === 0 || invalid || signedIn === null}
        className="flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-[#1533B8] text-[16px] font-black text-white disabled:opacity-40"
      >
        {busy ? `診断中…（${done.length} / ${filled.length}人）` : `${filled.length}人分をまとめて診断する（無料）`}
      </button>

      {done.length > 0 && !busy && (
        <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5">
          <p className="m-0 text-sm font-black">診断の一覧（{done.length}人・平均 {avg}点）</p>
          <table className="mt-3 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#15172B]/20 text-left text-[#5A5D73]">
                <th className="py-2 pr-3">生徒</th>
                <th className="py-2 pr-3">点数</th>
                <th className="py-2">いちばん大事な直し</th>
              </tr>
            </thead>
            <tbody>
              {done
                .slice()
                .sort((a, b) => a.r.total - b.r.total)
                .map(({ r, i }) => (
                  <tr key={i} className="border-b border-[#15172B]/10 align-top">
                    <td className="py-2 pr-3 font-bold">{LABELS[i]}</td>
                    <td className="py-2 pr-3">{r.total}</td>
                    <td className="py-2 leading-relaxed">{r.nextStep}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="mb-0 mt-3 text-xs text-[#5A5D73]">点数の低い順です。生徒が自分のスマホで「直す → もう一度添削」を何度でもくり返せるのが、塾向けプランです。</p>
          <a href="/juku" className="mt-4 flex min-h-[48px] items-center justify-center rounded-xl bg-[#FFE45C] text-sm font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
            塾向けプラン（生徒5人 14,800円〜）を見る
          </a>
        </div>
      )}
    </div>
  );
}
