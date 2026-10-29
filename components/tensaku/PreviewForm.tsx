"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { trackEvent } from "@/lib/analytics";
import { learnIdFromLocation, markDone } from "@/lib/learn/progress";

// /tensaku の添削フォーム。
//   未登録: 貼る → 指摘が3つ返る (お試し) → 全文の添削は無料登録で
//   登録済み: このページのまま全文添削 (点数・観点別・すべての指摘・次に直すこと)。テンサクンと同じ回数枠 (無料は月2本)
// テンサクン本体はスマホで画面がはみ出すため、スマホで来た人が登録後も止まらないよう、ここで最後まで受けられるようにした。
// 書いた文章は、登録の画面を挟んでも消えないように、このタブの sessionStorage にだけ一時保存する (サーバーには保存しない)。

export type Kind = "shibo" | "shoronbun" | "jiko";
const KIND_LABEL: Record<Kind, string> = { shibo: "志望理由書", shoronbun: "小論文", jiko: "自己推薦書・自己PR" };
const MIN = 80;
const PREVIEW_MAX = 1200; // lib/tensaku/preview.ts の MAX_CHARS と同じ
const FULL_MAX = 2000;
const DRAFT_KEY = "tensaku_draft_v1";

interface Point {
  quote: string;
  problem: string;
  hint: string;
}
interface PreviewResult {
  summary: string;
  points: Point[];
}
interface FullResult {
  total: number;
  summary: string;
  criteria: { name: string; score: number; comment: string }[];
  points: Point[];
  nextStep: string;
}
interface Status {
  signedIn: boolean;
  unlimited?: boolean;
  remaining?: number | null;
  quota?: number;
}

const ERR: Record<string, string> = {
  too_short: `もう少し長く貼ってください（${MIN}字以上）。`,
  too_long_preview: `お試しは${PREVIEW_MAX}字までです。無料登録すると${FULL_MAX}字まで全文を添削できます。`,
  too_long: `${FULL_MAX}字までにしてください。`,
  limit_ip: "お試しは1日3回までです。無料登録すると、このページで全文を添削できます（月2本まで無料）。",
  limit_daily: "本日のお試し枠が埋まりました。無料登録すると、このページで全文を添削できます。",
  not_configured: "添削は準備中です。少し時間をおいてお試しください。",
  quota_exceeded: "今月の無料添削（2本）を使い切りました。来月1日にまた使えます。今すぐ続けるならProで回数の制限なく添削できます。",
  payment_issue: "お支払いの確認が取れていないため、添削を一時停止しています。登録メールのご案内をご確認ください。",
  no_plan: "このプランでは使えない機能です。",
  unauthenticated: "ログインが切れました。もう一度ログインしてください。",
  failed: "うまく添削できませんでした。少し時間をおいてもう一度お試しください（回数には数えていません）。",
};

function readDraft(): { kind?: Kind; target?: string; text?: string } {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function PointList({ points, handFont }: { points: Point[]; handFont: string }) {
  return (
    <ol className="m-0 mt-4 flex list-none flex-col gap-4 p-0">
      {points.map((p, i) => (
        <li key={i} className="rounded-xl bg-[#F7F6F1] p-4">
          <div className="flex items-start gap-2.5">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#D9341F] text-xs font-bold text-white">{i + 1}</span>
            <div className="min-w-0">
              {p.quote && (
                <p className="m-0 text-sm text-[#3A3D55]">
                  「<span className="underline decoration-[#D9341F] decoration-wavy decoration-2 underline-offset-4">{p.quote}</span>」
                </p>
              )}
              <p className={`${handFont} mb-0 mt-2 text-[15px] leading-[1.75] text-[#D9341F]`}>{p.problem}</p>
              {p.hint && (
                <p className="mb-0 mt-2 text-sm leading-[1.75] text-[#15172B]">
                  <span className="font-bold">直す方向：</span>
                  {p.hint}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function PreviewForm({ handFont, initialKind = "shibo" }: { handFont: string; initialKind?: Kind }) {
  const [kind, setKind] = useState<Kind>(initialKind);
  const [target, setTarget] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState<null | "preview" | "full">(null);
  const [error, setError] = useState<string | null>(null);
  // お試しの回数上限や字数オーバーで止まった人に、その場で無料登録の入口を出すため
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [full, setFull] = useState<FullResult | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  // 「まなぶ」のカードから来たとき (?learn=<カードid>)、添削の結果が出たらそのカードを「習得」にする
  const [learnId, setLearnId] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // 登録の画面から戻ってきたときに、書いた文章を戻す
  useEffect(() => {
    const d = readDraft();
    /* eslint-disable react-hooks/set-state-in-effect -- 初回だけ sessionStorage から復元する */
    if (d.text) setText(d.text);
    if (d.target) setTarget(d.target);
    if (d.kind && d.kind in KIND_LABEL) setKind(d.kind);
    setLearnId(learnIdFromLocation());
    /* eslint-enable react-hooks/set-state-in-effect */
    fetch("/api/tensaku/full", { cache: "no-store" })
      .then((r) => r.json())
      .then((s: Status) => setStatus(s))
      .catch(() => setStatus({ signedIn: false }));
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ kind, target, text }));
    } catch {
      /* 保存できない環境では何もしない */
    }
  }, [kind, target, text]);

  const len = text.trim().length;
  const signedIn = Boolean(status?.signedIn);
  const outOfQuota = signedIn && !status?.unlimited && status?.remaining === 0;
  const max = signedIn ? FULL_MAX : PREVIEW_MAX;
  const returnUrl = `/tensaku?kind=${kind}`;

  // 送信前に止めた回も数える (どこで離脱しているかを広告の結果と突き合わせるため)
  function block(code: "too_short" | "too_long_preview") {
    setError(ERR[code]);
    setErrorCode(code);
    trackEvent("tensaku_preview_blocked", { kind, reason: code, length: len });
  }

  async function runPreview() {
    setError(null);
    setErrorCode(null);
    setPreview(null);
    setFull(null);
    if (len < MIN) return block("too_short");
    if (len > PREVIEW_MAX) return block("too_long_preview");
    setLoading("preview");
    trackEvent("tensaku_preview_submit", { kind, length: len });
    try {
      const res = await fetch("/api/tensaku/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, target, text }),
      });
      const json = await res.json();
      if (!res.ok) {
        const code = String(json.error ?? res.status);
        setError(ERR[code] ?? ERR.failed);
        setErrorCode(code);
        trackEvent("tensaku_preview_error", { kind, reason: code });
        // GA4 の標準レポートで理由まで見られるよう、回数上限とそれ以外を別のイベント名でも送る
        trackEvent(code === "limit_ip" || code === "limit_daily" ? "tensaku_preview_limit" : "tensaku_preview_fail", { kind, reason: code });
      } else {
        setPreview(json as PreviewResult);
        trackEvent("tensaku_preview_result", { kind });
        if (learnId) {
          markDone(learnId);
          trackEvent("learn_card_done", { card: learnId });
        }
      }
    } catch {
      setError(ERR.failed);
      setErrorCode("network");
      trackEvent("tensaku_preview_fail", { kind, reason: "network" });
    } finally {
      setLoading(null);
    }
  }

  async function runFull() {
    setError(null);
    setErrorCode(null);
    setPreview(null);
    setFull(null);
    if (len < MIN) return setError(ERR.too_short);
    if (len > FULL_MAX) return setError(ERR.too_long);
    setLoading("full");
    trackEvent("tensaku_full_submit", { kind, length: len });
    try {
      const res = await fetch("/api/tensaku/full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, target, text }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(ERR[json.error as string] ?? ERR.failed);
        trackEvent("tensaku_full_error", { reason: String(json.error ?? res.status) });
        if (json.error === "quota_exceeded") setStatus((s) => (s ? { ...s, remaining: 0 } : s));
      } else {
        setFull(json as FullResult);
        trackEvent("tensaku_full_result", { kind, total: (json as FullResult).total });
        if (learnId) {
          markDone(learnId);
          trackEvent("learn_card_done", { card: learnId });
        }
        setStatus((s) => (s && !s.unlimited && typeof s.remaining === "number" ? { ...s, remaining: Math.max(0, s.remaining - 1) } : s));
      }
    } catch {
      setError(ERR.failed);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div ref={topRef} id="form" className="scroll-mt-6 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[6px_6px_0_#15172B] sm:p-7">
      <div role="group" aria-label="書類の種類" className="flex flex-wrap gap-2">
        {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className={`min-h-[40px] rounded-full border-[1.5px] border-[#15172B] px-4 text-sm font-bold ${kind === k ? "bg-[#15172B] text-white" : "bg-white text-[#15172B]"}`}
          >
            {KIND_LABEL[k]}
          </button>
        ))}
      </div>

      <label className="mt-5 block text-sm font-bold" htmlFor="tensaku-target">
        {kind === "shoronbun" ? "志望先・課題（任意）" : "志望先（任意）"}
      </label>
      <input
        id="tensaku-target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        maxLength={60}
        placeholder={kind === "shoronbun" ? "例: 社会学部／地方の人口減少への対策" : "例: 同志社大学 社会学部"}
        className="mt-2 w-full rounded-xl border-[1.5px] border-[#C9C7BC] px-4 py-3 text-base outline-none focus:border-[#1533B8]"
      />

      <label className="mt-5 block text-sm font-bold" htmlFor="tensaku-text">
        文章を貼る（{MIN}〜{max}字）
      </label>
      <textarea
        id="tensaku-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={9}
        placeholder="書きかけでも大丈夫です。名前や学校名は書かずに貼ってください。"
        className="mt-2 w-full resize-y rounded-xl border-[1.5px] border-[#C9C7BC] px-4 py-3 text-base leading-[1.9] outline-none focus:border-[#1533B8]"
      />
      <div className="mt-1 flex justify-between text-xs text-[#5A5D73]">
        <span>入力した文章はアオハルOSに保存しません。</span>
        <span className={len > max ? "font-bold text-[#D9341F]" : ""}>
          {len} / {max}字
        </span>
      </div>

      {signedIn && !outOfQuota ? (
        <>
          <button
            type="button"
            onClick={runFull}
            disabled={loading !== null}
            className="mt-5 flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-[#1533B8] text-[17px] font-bold text-white shadow-[0_4px_0_#0B1F7A] disabled:opacity-60"
          >
            {loading === "full" ? "採点しています…（30秒ほど）" : "全文を添削して採点する"}
          </button>
          <p className="mb-0 mt-2 text-center text-xs text-[#5A5D73]">
            {status?.unlimited ? "Proプラン：回数の制限なし" : typeof status?.remaining === "number" ? `今月の無料添削 あと${status.remaining}本` : "無料プランは月2本まで"}
          </p>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={runPreview}
            disabled={loading !== null}
            className="mt-5 flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-[#1533B8] text-[17px] font-bold text-white shadow-[0_4px_0_#0B1F7A] disabled:opacity-60"
          >
            {loading === "preview" ? "赤ペンを入れています…（20秒ほど）" : "無料で3つ指摘してもらう"}
          </button>
          <p className="mb-0 mt-2 text-center text-xs text-[#5A5D73]">{signedIn ? "お試しは1日3回まで（回数に数えません）" : "登録なし・1日3回まで"}</p>
        </>
      )}

      {outOfQuota && (
        <div className="mt-4 rounded-xl border-[1.5px] border-[#15172B] bg-[#FFF6C4] p-4 text-sm leading-[1.8]">
          <p className="m-0 font-bold">今月の無料添削（2本）を使い切りました。</p>
          <p className="mb-0 mt-1">来月1日にまた2本使えます。出願や面接が近いなら、Pro（月980円・いつでも解約可）で回数の制限なく添削できます。</p>
          <Link
            href="/#pricing"
            onClick={() => trackEvent("tensaku_upgrade_click", { location: "quota" })}
            className="mt-3 inline-flex min-h-[44px] items-center rounded-xl bg-[#15172B] px-5 font-bold text-white"
          >
            Proを見る →
          </Link>
        </div>
      )}

      {error && (
        <p role="alert" className="mb-0 mt-5 rounded-xl bg-[#FFF1EE] px-4 py-3 text-sm font-bold text-[#B42318]">
          {error}
        </p>
      )}

      {error && !signedIn && (errorCode === "limit_ip" || errorCode === "limit_daily" || errorCode === "too_long_preview") && (
        <>
          <SmartSignUpButton
            analyticsLocation={`tensaku_${errorCode}`}
            redirectUrl={returnUrl}
            className="mt-4 flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-[#FFE45C] text-[17px] font-black text-[#15172B] shadow-[0_4px_0_#15172B]"
          >
            無料登録して、このまま全文を添削してもらう
          </SmartSignUpButton>
          <p className="mb-0 mt-2 text-center text-xs text-[#5A5D73]">登録だけ・カード不要・月2本まで無料。書いた文章は消えません</p>
        </>
      )}

      {learnId && (preview || full) && (
        <Link href="/learn/shoronbun" className="mt-5 flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#1533B8] bg-[#E6EAFB] text-sm font-black text-[#1533B8] no-underline">
          スキル盤のマスが青く光りました。カードにもどる →
        </Link>
      )}

      {preview && (
        <div className="mt-7 border-t border-[#E4E2D8] pt-6" aria-live="polite">
          <p className="m-0 text-xs font-bold text-[#D9341F]">赤ペン先生からの3つの指摘</p>
          {preview.summary && <p className="mb-0 mt-2 text-[15px] font-bold leading-[1.8]">{preview.summary}</p>}
          <PointList points={preview.points} handFont={handFont} />

          {!signedIn && (
            <>
              <div className="relative mt-5 overflow-hidden rounded-xl border-[1.5px] border-dashed border-[#9A9CB0] p-4">
                <div aria-hidden="true" className="select-none blur-[3px]">
                  <p className="m-0 text-sm font-bold">総合点 ●● / 100　結論 ●　具体性 ●　大学との接続 ●</p>
                  <p className="mb-0 mt-2 text-sm">改善のポイント：●●●●●●●●●●●●●●●●●●●●</p>
                  <p className="mb-0 mt-2 text-sm">そのほかの指摘 ●件……</p>
                </div>
                <p className="m-0 mt-3 text-center text-sm font-bold">点数・すべての指摘・次に直すことは、無料登録するとこのページで見られます</p>
              </div>
              <SmartSignUpButton
                analyticsLocation="tensaku_result"
                redirectUrl={returnUrl}
                className="mt-4 flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-[#FFE45C] text-[17px] font-black text-[#15172B] shadow-[0_4px_0_#15172B]"
              >
                無料登録して、全文を添削してもらう
              </SmartSignUpButton>
              <p className="mb-0 mt-2 text-center text-xs text-[#5A5D73]">登録だけ・カード不要・月2本まで無料。書いた文章は消えません</p>
            </>
          )}
        </div>
      )}

      {full && (
        <div className="mt-7 border-t border-[#E4E2D8] pt-6" aria-live="polite">
          <div className="flex items-end gap-3">
            <p className="m-0 text-[48px] font-black leading-none text-[#1533B8]">{full.total}</p>
            <p className="m-0 pb-1 text-sm font-bold text-[#5A5D73]">/ 100点</p>
          </div>
          {full.summary && <p className="mb-0 mt-3 text-[15px] font-bold leading-[1.8]">{full.summary}</p>}

          <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
            {full.criteria.map((c) => (
              <li key={c.name}>
                <div className="flex justify-between text-sm font-bold">
                  <span>{c.name}</span>
                  <span>{c.score} / 25</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-[#EEEDE7]">
                  <div className="h-2 rounded-full bg-[#1533B8]" style={{ width: `${(c.score / 25) * 100}%` }} />
                </div>
                {c.comment && <p className="mb-0 mt-1 text-[13px] leading-[1.7] text-[#3A3D55]">{c.comment}</p>}
              </li>
            ))}
          </ul>

          {full.nextStep && (
            <p className="mb-0 mt-5 rounded-xl bg-[#FFF6C4] px-4 py-3 text-sm leading-[1.8]">
              <span className="font-bold">次にここを直すと点が上がります：</span>
              {full.nextStep}
            </p>
          )}

          <p className="mb-0 mt-6 text-xs font-bold text-[#D9341F]">直すべき箇所（{full.points.length}つ）</p>
          <PointList points={full.points} handFont={handFont} />

          <button
            type="button"
            onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-[14px] border-2 border-[#15172B] text-[15px] font-bold text-[#15172B]"
          >
            直して、もう一度添削する ↑
          </button>
        </div>
      )}
    </div>
  );
}
