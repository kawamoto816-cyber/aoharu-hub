"use client";

import { useState } from "react";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { TrackedLink } from "@/components/TrackedLink";
import { trackEvent } from "@/lib/analytics";

// 登録前のお試し添削フォーム。貼る → 指摘が3つ返る → 全文の添削は無料登録で、の順に見せる。

type Kind = "shibo" | "shoronbun" | "jiko";
const KIND_LABEL: Record<Kind, string> = { shibo: "志望理由書", shoronbun: "小論文", jiko: "自己推薦書・自己PR" };
const MIN = 80;
const MAX = 800;

interface Result {
  summary: string;
  points: { quote: string; problem: string; hint: string }[];
}

const ERR: Record<string, string> = {
  too_short: `もう少し長く貼ってください（${MIN}字以上）。`,
  too_long: `${MAX}字までにしてください。長い文章は、無料登録後のテンサクンで全文を添削できます。`,
  limit_ip: "お試しは1日3回までです。続きは無料登録後のテンサクンでどうぞ（月2本まで無料）。",
  limit_daily: "本日のお試し枠が埋まりました。無料登録後のテンサクンなら、今すぐ全文を添削できます。",
  not_configured: "お試し添削は準備中です。無料登録後のテンサクンで添削できます。",
  failed: "うまく添削できませんでした。少し時間をおいてもう一度お試しください。",
};

export function PreviewForm({ handFont }: { handFont: string }) {
  const [kind, setKind] = useState<Kind>("shibo");
  const [target, setTarget] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const len = text.trim().length;

  async function submit() {
    setError(null);
    setResult(null);
    if (len < MIN) return setError(ERR.too_short);
    if (len > MAX) return setError(ERR.too_long);
    setLoading(true);
    trackEvent("tensaku_preview_submit", { kind, length: len });
    try {
      const res = await fetch("/api/tensaku/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, target, text }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(ERR[json.error as string] ?? ERR.failed);
        trackEvent("tensaku_preview_error", { reason: String(json.error ?? res.status) });
      } else {
        setResult(json as Result);
        trackEvent("tensaku_preview_result", { kind });
      }
    } catch {
      setError(ERR.failed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[6px_6px_0_#15172B] sm:p-7">
      <div role="group" aria-label="書類の種類" className="flex flex-wrap gap-2">
        {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className={`min-h-[40px] rounded-full border-[1.5px] border-[#15172B] px-4 text-sm font-bold ${
              kind === k ? "bg-[#15172B] text-white" : "bg-white text-[#15172B]"
            }`}
          >
            {KIND_LABEL[k]}
          </button>
        ))}
      </div>

      <label className="mt-5 block text-sm font-bold" htmlFor="tensaku-target">
        志望先（任意）
      </label>
      <input
        id="tensaku-target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        maxLength={60}
        placeholder="例: 同志社大学 社会学部"
        className="mt-2 w-full rounded-xl border-[1.5px] border-[#C9C7BC] px-4 py-3 text-base outline-none focus:border-[#1533B8]"
      />

      <label className="mt-5 block text-sm font-bold" htmlFor="tensaku-text">
        文章を貼る（{MIN}〜{MAX}字）
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
        <span>入力した文章は保存しません。</span>
        <span className={len > MAX ? "font-bold text-[#D9341F]" : ""}>
          {len} / {MAX}字
        </span>
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={loading}
        className="mt-5 flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-[#1533B8] text-[17px] font-bold text-white shadow-[0_4px_0_#0B1F7A] disabled:opacity-60"
      >
        {loading ? "赤ペンを入れています…（20秒ほど）" : "無料で3つ指摘してもらう"}
      </button>
      <p className="mb-0 mt-2 text-center text-xs text-[#5A5D73]">登録なし・1日3回まで</p>

      {error && (
        <p role="alert" className="mb-0 mt-5 rounded-xl bg-[#FFF1EE] px-4 py-3 text-sm font-bold text-[#B42318]">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-7 border-t border-[#E4E2D8] pt-6" aria-live="polite">
          <p className="m-0 text-xs font-bold text-[#D9341F]">赤ペン先生からの3つの指摘</p>
          {result.summary && <p className="mb-0 mt-2 text-[15px] font-bold leading-[1.8]">{result.summary}</p>}
          <ol className="m-0 mt-4 flex list-none flex-col gap-4 p-0">
            {result.points.map((p, i) => (
              <li key={i} className="rounded-xl bg-[#F7F6F1] p-4">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#D9341F] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    {p.quote && (
                      <p className="m-0 text-sm text-[#3A3D55]">
                        「<span className="underline decoration-[#D9341F] decoration-wavy decoration-2 underline-offset-4">{p.quote}</span>」
                      </p>
                    )}
                    <p className={`${handFont} mb-0 mt-2 text-[15px] leading-[1.75] text-[#D9341F]`}>{p.problem}</p>
                    <p className="mb-0 mt-2 text-sm leading-[1.75] text-[#15172B]">
                      <span className="font-bold">直す方向：</span>
                      {p.hint}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="relative mt-5 overflow-hidden rounded-xl border-[1.5px] border-dashed border-[#9A9CB0] p-4">
            <div aria-hidden="true" className="select-none blur-[3px]">
              <p className="m-0 text-sm font-bold">総合点 ●● / 100　構成 ●　具体性 ●　大学との接続 ●</p>
              <p className="mb-0 mt-2 text-sm">改善のポイント：●●●●●●●●●●●●●●●●●●●●</p>
              <p className="mb-0 mt-2 text-sm">そのほかの指摘 ●件……</p>
            </div>
            <p className="m-0 mt-3 text-center text-sm font-bold">点数・すべての指摘・改善のポイントは、テンサクンで見られます</p>
          </div>

          <SmartSignUpButton
            analyticsLocation="tensaku_result"
            className="mt-4 flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-[#FFE45C] text-[17px] font-black text-[#15172B] shadow-[0_4px_0_#15172B]"
          >
            無料登録して、全文を添削してもらう
          </SmartSignUpButton>
          <p className="mb-0 mt-2 text-center text-xs text-[#5A5D73]">登録だけ・カード不要・月2本まで無料</p>
          <TrackedLink
            href="https://essay.bluespring.co.jp"
            event="try_entry_click"
            params={{ app: "tensakun", location: "tensaku_result" }}
            className="mt-3 block text-center text-sm font-bold text-[#1533B8] underline underline-offset-2"
          >
            登録済みの方はテンサクンを開く
          </TrackedLink>
        </div>
      )}
    </div>
  );
}
