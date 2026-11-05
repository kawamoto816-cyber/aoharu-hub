"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Daimon, Exam, Item, Material, NumQ } from "@/lib/moshi/types";
import { isFigureRef } from "@/lib/moshi/types";
import {
  correctSet,
  gradeAnswer,
  gradeTerm,
  judgeNum,
  keywordHits,
  type ItemResult,
  type Response,
} from "@/lib/moshi/grade";
import { recordMistake, recordMistakeText, recordRight, type MistakeMeta } from "@/lib/learn/mistakes";
import { trackEvent } from "@/lib/analytics";
import { LectureFigure } from "@/components/lecture/Figure";
import { plain, Rich } from "@/components/lecture/Rich";
import { bigBtn, card, shuffle } from "@/components/drill/DrillPlay";
import { KANA, moshiWords, type MoshiWords } from "./words";
import { summarize } from "@/lib/moshi/summary";
import { recordMoshiResult, type MoshiUnitRecord } from "@/lib/moshi/results";
import { freshSeed } from "@/lib/moshi/rng";
import { recordExamResult, type ExamAttempt } from "@/lib/exam/results";
import { recordStumbles } from "@/lib/zukan/store";
import { dayNo, mdLabel, type NewMistake } from "@/lib/zukan/schedule";
import { ZUKAN_HREF } from "@/lib/zukan/words";
import { ExamResultPanel, type ExamResultData } from "@/components/exam/ExamResult";

// 定期テスト模試の本体: 表紙 → 試験 (解説なし・残り時間の目安・答えはページ内 state) → 採点 (自動＋記述の自己採点) → 結果 → 解き方 → まちがいノート。

export interface MoshiUnit {
  name: string;
  /** 単元のページ (地図の href) */
  href: string;
  lecture?: string;
  subject: string;
  kids: boolean;
  /** 単元模試のページ (試験モードの結果から「弱い単元」を解きなおす導線) */
  moshi?: string;
}

/** 試験モード (/learn/exam) のとき: 制限時間で自動提出・時間配分・弱い単元・端末への記録 */
export interface MoshiExamMode {
  mode: string;
  specId: string;
  seed: number;
  /** もう一度 (シードを変える): このURLに &seed= を足して開く */
  retryBase: string;
  /** 範囲・教科をえらびなおす */
  setupHref: string;
  /** 「はじめる」を押したとき、始める前に呼ぶ (回数の門。components/exam/ExamGate)。false なら始めない */
  beforeStart?: () => Promise<boolean>;
}

type Phase = "cover" | "exam" | "self" | "result";
const keyOf = (d: Daimon, it: Item) => `${d.id}#${it.id}`;
const fieldCount = (q: NumQ) => (q.answerKind === "pair" || q.answerKind === "roots" ? 2 : 1);

export function emptyResponse(it: Item): Response {
  const a = it.answer;
  switch (a.kind) {
    case "choice":
      return { kind: "choice", picked: [] };
    case "num":
      return { kind: "num", inputs: Array(fieldCount(a)).fill("") };
    case "term":
      return { kind: "term", text: "" };
    case "order":
      return { kind: "order", seq: [] };
    case "written":
      return { kind: "written", text: "", auto: a.autoPart?.kind === "num" ? Array(fieldCount(a.autoPart)).fill("") : a.autoPart ? [""] : undefined };
  }
}

export function isBlank(r: Response): boolean {
  switch (r.kind) {
    case "choice":
      return r.picked.length === 0;
    case "num":
      return r.inputs.every((s) => !s.trim());
    case "term":
    case "written":
      return !r.text.trim();
    case "order":
      return r.seq.length === 0;
  }
}

function gradeItem(it: Item, r: Response, checks: boolean[] | undefined): ItemResult {
  return gradeAnswer(it.answer, it.points, r, checks);
}

function numText(q: NumQ, vals: string[]): string {
  return vals.map((v, i) => `${q.labels?.[i] ? `${q.labels[i]} ` : ""}${v.replace(/-/g, "−")}${q.unit ?? ""}`).join("、");
}

function orderToken(q: { tokens: string[]; distractor?: string }, i: number) {
  return i < 0 ? (q.distractor ?? "") : q.tokens[i];
}

/** 模範解答を文字で */
function modelText(it: Item): string {
  const a = it.answer;
  switch (a.kind) {
    case "choice":
      return correctSet(a).map((c) => `${KANA[c]} ${a.options[c]}`).join("、");
    case "num":
      return numText(a, a.answer);
    case "term":
      return a.accept[0];
    case "order":
      return a.tokens.join("　");
    case "written":
      return a.model;
  }
}

/** 自分の答えを文字で */
function mineText(it: Item, r: Response): string {
  const a = it.answer;
  if (r.kind === "choice" && a.kind === "choice") return r.picked.map((c) => `${KANA[c]} ${a.options[c]}`).join("、");
  if (r.kind === "num" && a.kind === "num") return r.inputs.some((s) => s.trim()) ? numText(a, r.inputs) : "";
  if (r.kind === "term") return r.text;
  if (r.kind === "order" && a.kind === "order") return r.seq.map((i) => orderToken(a, i)).join("　");
  if (r.kind === "written") return r.text.slice(0, 300);
  return "";
}

/** まちがいノート (ふつうの文字で表示) に入れる文字: ルビは「漢字（かんじ）」に、{{ }} ははずす */
function noteText(s: string): string {
  return s
    .replace(/｜([^｜《》\n]+?)《([^《》\n]+?)》|([\u3400-\u9FFF々〆ヶ]+)《([^《》\n]+?)》/g, (_m, b1, r1, b2, r2) => `${b1 ?? b2}（${r1 ?? r2}）`)
    .replace(/\{\{(.+?)\}\}/g, "$1");
}

function materialAsText(ms: Material[] | undefined): string {
  return (ms ?? [])
    .map((m) =>
      m.kind === "text" ? m.body : m.kind === "passage" ? m.body : m.kind === "table" ? `${m.caption}\n${m.head.join("｜")}\n${m.rows.map((r) => r.join("｜")).join("\n")}` : "",
    )
    .filter(Boolean)
    .join("\n");
}

// ---------------- 部品 ----------------

export function MaterialView({ m, figNo }: { m: Material; figNo: number }) {
  switch (m.kind) {
    case "text":
      return <p className="m-0 mt-3 whitespace-pre-line text-[15px] leading-relaxed"><Rich text={m.body} /></p>;
    case "passage":
      return (
        <div className="mt-3 rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-3">
          {m.title && <p className="m-0 text-[14px] font-black"><Rich text={m.title} /></p>}
          <p className={`m-0 mt-1 whitespace-pre-line text-[15px] leading-[1.9] ${m.lang === "en" ? "font-sans" : ""}`}><Rich text={m.body} /></p>
          {m.notes?.length ? (
            <p className="m-0 mt-2 text-[12.5px] text-[#3A3D55]">
              {m.notes.map((n) => `${n.word}：${n.meaning}`).join("　")}
            </p>
          ) : null}
        </div>
      );
    case "table":
      return (
        <div className="mt-3 max-w-full overflow-x-auto">
          <table className="w-full border-collapse text-center text-[14px]">
            <caption className="mb-1 text-left text-[13px] font-black text-[#3A3D55]">{m.caption}</caption>
            <thead>
              <tr>
                {m.head.map((h) => (
                  <th key={h} scope="col" className="border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-1.5 py-1.5 font-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} className="border-[1.5px] border-[#15172B] bg-white px-1.5 py-1.5 font-bold">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {m.source && <p className="m-0 mt-1 text-[11.5px] text-[#5A5D73]">出典：{m.source}</p>}
        </div>
      );
    case "figure":
      return isFigureRef(m.figure) ? null : <LectureFigure fig={m.figure} no={figNo} />;
  }
}

const inputCls = "min-h-[48px] w-full min-w-0 rounded-lg border-[1.5px] border-[#9A9CB0] bg-white px-3 text-[18px] text-[#15172B] focus:border-[#1533B8] disabled:bg-[#F7F6F1]";

function NumFields({ q, values, onChange, label, disabled }: { q: NumQ; values: string[]; onChange: (v: string[]) => void; label: string; disabled?: boolean }) {
  const numeric = q.answerKind === "num" || q.answerKind === "pair";
  return (
    <div className="mt-3 grid gap-2">
      {values.map((v, i) => (
        <label key={i} className="flex items-center gap-2">
          {q.labels?.[i] && <span className="shrink-0 text-[16px] font-bold">{q.labels[i]}</span>}
          <input
            value={v}
            disabled={disabled}
            onChange={(e) => onChange(values.map((x, k) => (k === i ? e.target.value : x)))}
            inputMode={numeric ? "decimal" : "text"}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            aria-label={`${label}${values.length > 1 ? `（${q.labels?.[i] ?? `${i + 1}つ目`}）` : ""}`}
            className={inputCls}
          />
          {q.unit && <span className="shrink-0 text-[16px] font-bold">{q.unit}</span>}
        </label>
      ))}
    </div>
  );
}

export function ItemInput({ it, r, onChange, pool, w, label }: { it: Item; r: Response; onChange: (r: Response) => void; pool: number[]; w: MoshiWords; label: string }) {
  const a = it.answer;
  if (a.kind === "choice" && r.kind === "choice") {
    const multi = Array.isArray(a.correct);
    return (
      <div role={multi ? "group" : "radiogroup"} aria-label={label} className="mt-3 grid gap-2">
        {a.options.map((o, k) => {
          const on = r.picked.includes(k);
          return (
            <button
              key={k}
              type="button"
              role={multi ? "checkbox" : "radio"}
              aria-checked={on}
              onClick={() => onChange({ kind: "choice", picked: multi ? (on ? r.picked.filter((x) => x !== k) : [...r.picked, k]) : [k] })}
              className={`flex min-h-[52px] items-center gap-2 rounded-[12px] border-[1.5px] px-3 py-2 text-left text-[15.5px] font-bold leading-snug text-[#15172B] [overflow-wrap:anywhere] ${on ? "border-[#1533B8] bg-[#E3E8FF]" : "border-[#15172B] bg-white"}`}
            >
              <span aria-hidden="true" className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border-[1.5px] text-[13px] font-black ${on ? "border-[#1533B8] bg-[#1533B8] text-white" : "border-[#15172B]"}`}>
                {KANA[k]}
              </span>
              <span className="min-w-0"><Rich text={o} /></span>
            </button>
          );
        })}
      </div>
    );
  }
  if (a.kind === "num" && r.kind === "num") return <NumFields q={a} values={r.inputs} onChange={(inputs) => onChange({ kind: "num", inputs })} label={label} />;
  if (a.kind === "term" && r.kind === "term")
    return (
      <input
        value={r.text}
        onChange={(e) => onChange({ kind: "term", text: e.target.value })}
        aria-label={label}
        autoComplete="off"
        spellCheck={false}
        className={`${inputCls} mt-3`}
      />
    );
  if (a.kind === "order" && r.kind === "order") {
    return (
      <div className="mt-3">
        <p className="m-0 text-[12.5px] text-[#3A3D55]">{w.placeHint}</p>
        <div aria-label={`${label}（並べた順）`} className="mt-2 flex min-h-[56px] flex-wrap items-center gap-1.5 rounded-[12px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-2">
          {r.seq.map((ti, pos) => (
            <button
              key={`${ti}-${pos}`}
              type="button"
              onClick={() => onChange({ kind: "order", seq: r.seq.filter((_, k) => k !== pos) })}
              aria-label={`${pos + 1}番目 ${orderToken(a, ti)}（タップで外す）`}
              className="inline-flex min-h-[44px] items-center gap-1 rounded-[10px] border-[1.5px] border-[#1533B8] bg-white px-3 text-[16px] font-black text-[#1533B8]"
            >
              <span className="text-[11px] text-[#5A5D73]">{pos + 1}</span>
              {orderToken(a, ti)}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {pool.map((ti) => {
            const used = r.seq.includes(ti);
            return (
              <button
                key={ti}
                type="button"
                disabled={used}
                onClick={() => onChange({ kind: "order", seq: [...r.seq, ti] })}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 text-[16px] font-black text-[#15172B] shadow-[2px_2px_0_#15172B] disabled:opacity-30 disabled:shadow-none"
              >
                {orderToken(a, ti)}
              </button>
            );
          })}
          {r.seq.length > 0 && (
            <button type="button" onClick={() => onChange({ kind: "order", seq: [] })} className="inline-flex min-h-[44px] items-center px-2 text-[13px] font-bold text-[#3A3D55] underline">
              {w.resetOrder}
            </button>
          )}
        </div>
      </div>
    );
  }
  if (a.kind === "written" && r.kind === "written") {
    const ap = a.autoPart;
    return (
      <div className="mt-3">
        <textarea
          value={r.text}
          onChange={(e) => onChange({ ...r, text: e.target.value })}
          aria-label={label}
          placeholder={w.writeHere}
          rows={6}
          className="w-full rounded-lg border-[1.5px] border-[#9A9CB0] bg-white p-3 text-[16px] leading-relaxed text-[#15172B] focus:border-[#1533B8]"
        />
        {a.limit && (
          <p className="m-0 mt-1 text-right text-[12px] font-bold text-[#5A5D73]">
            {a.limit.unit === "字" ? [...r.text.replace(/\s/g, "")].length : r.text.trim().split(/\s+/).filter(Boolean).length}
            {a.limit.unit}
            {a.limit.max ? ` / ${a.limit.max}${a.limit.unit}以内` : ""}
          </p>
        )}
        {ap && (
          <div className="mt-2 rounded-[12px] bg-[#F7F6F1] p-3">
            <p className="m-0 text-[13px] font-black text-[#3A3D55]">{w.autoLabel}</p>
            {ap.kind === "num" ? (
              <NumFields q={ap} values={r.auto ?? []} onChange={(auto) => onChange({ ...r, auto })} label={`${label} ${w.autoLabel}`} />
            ) : (
              <input value={r.auto?.[0] ?? ""} onChange={(e) => onChange({ ...r, auto: [e.target.value] })} aria-label={`${label} ${w.autoLabel}`} className={`${inputCls} mt-2`} />
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
}

const VERDICT_CLS: Record<ItemResult["verdict"], string> = {
  ok: "bg-[#1533B8] text-white",
  part: "bg-[#FFE45C] text-[#15172B]",
  near: "bg-[#FFE45C] text-[#15172B]",
  wrong: "bg-[#D9341F] text-white",
  blank: "bg-[#5A5D73] text-white",
};
const VERDICT_MARK: Record<ItemResult["verdict"], string> = { ok: "○", part: "△", near: "△", wrong: "✕", blank: "✕" };

export function Solution({ it, r, res, w, figBase }: { it: Item; r: Response; res: ItemResult; w: MoshiWords; figBase: number }) {
  const a = it.answer;
  const mine = mineText(it, r);
  let c = figBase;
  const nos = it.steps.map((s) => (s.figure ? ++c : 0));
  return (
    <div className="mt-3">
      <p className="m-0 whitespace-pre-line text-[14px] leading-relaxed [overflow-wrap:anywhere]">
        <span className="font-black text-[#1533B8]">{w.correct}</span>
        <Rich text={modelText(it)} />
      </p>
      {a.kind !== "written" && (
        <p className={`m-0 mt-1 whitespace-pre-line text-[13.5px] font-bold [overflow-wrap:anywhere] ${res.verdict === "ok" ? "text-[#1533B8]" : "text-[#D9341F]"}`}>
          {w.mine}
          <Rich text={mine || w.blank} />
        </p>
      )}
      {res.note && <p className="m-0 mt-1 text-[13px] font-bold text-[#B54708]">{res.note}</p>}
      {a.kind === "choice" && (
        <ul className="m-0 mt-2 grid list-none gap-1 p-0 text-[13px] leading-relaxed">
          {a.options.map((o, k) => {
            const isRight = correctSet(a).includes(k);
            const picked = r.kind === "choice" && r.picked.includes(k);
            if (!isRight && !picked) return null;
            return (
              <li key={k} className={`rounded-[10px] px-3 py-2 ${isRight ? "bg-[#E3E8FF]" : "bg-[#FFE6E1]"}`}>
                <span className="font-black">
                  {isRight ? "○" : "✕"} {KANA[k]}
                </span>{" "}
                <Rich text={a.why[k]} />
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-3 rounded-[12px] bg-[#FFFBE6] px-3 py-2 text-[14px] font-black leading-snug">
        <span className="mr-1.5 rounded bg-[#15172B] px-1.5 py-0.5 text-[11px] text-white">{w.point}</span>
        <Rich text={it.point} />
      </div>
      <ol className="m-0 mt-3 grid list-none gap-4 p-0">
        {it.steps.map((s, k) => (
          <li key={k} className="min-w-0">
            <p className="m-0 flex items-start gap-2 text-[15px] font-black leading-snug">
              <span aria-hidden="true" className="flex h-6 w-6 flex-none items-center justify-center rounded-[7px] bg-[#15172B] text-[12px] text-white">
                {k + 1}
              </span>
              <span>
                <Rich text={s.title} />
              </span>
            </p>
            <p className="m-0 mt-1.5 text-[14.5px] leading-[1.8]">
              <Rich text={s.body} />
            </p>
            {s.figure && !isFigureRef(s.figure) && <LectureFigure fig={s.figure} no={nos[k]} />}
            {s.trap && (
              <p className="m-0 mt-2 rounded-[10px] border-[1.5px] border-[#D9341F] bg-white px-3 py-2 text-[13px] font-bold leading-relaxed text-[#B42318]">
                <span className="mr-1 font-black">{w.trap}：</span>
                <Rich text={s.trap} />
              </p>
            )}
            {s.back?.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {s.back.map((b) => (
                  <Link key={b.href} href={b.href} className="inline-flex min-h-[44px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 text-[13px] font-black text-[#15172B] no-underline hover:bg-[#FFFBE6]">
                    {b.label} →
                  </Link>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Bar({ label, score, total }: { label: string; score: number; total: number }) {
  const pct = total ? Math.round((score / total) * 100) : 0;
  return (
    <li className="grid gap-1">
      <span className="flex items-baseline justify-between gap-2 text-[13.5px] font-bold">
        <span className="min-w-0 [overflow-wrap:anywhere]">{label}</span>
        <span className="shrink-0 font-black">
          {score}/{total}
        </span>
      </span>
      <span aria-hidden="true" className="block h-2.5 overflow-hidden rounded-full border border-[#15172B] bg-white">
        <span className={`block h-full ${pct >= 80 ? "bg-[#1533B8]" : pct >= 50 ? "bg-[#FFE45C]" : "bg-[#D9341F]"}`} style={{ width: `${pct}%` }} />
      </span>
    </li>
  );
}

/** 図の通し番号 (試験: 資料と小問の図、解き方: ステップの図) を先に数えておく */
function figureNumbers(daimon: Daimon[]) {
  const exam: Record<string, number> = {};
  const steps: Record<string, number> = {};
  let e = 0;
  let st = 0;
  daimon.forEach((d, di) => {
    d.material?.forEach((m, k) => {
      if (m.kind === "figure") exam[`${di}-${k}`] = ++e;
    });
    for (const it of d.items) {
      if (it.figure) exam[keyOf(d, it)] = ++e;
      steps[keyOf(d, it)] = st;
      st += it.steps.filter((x) => x.figure).length;
    }
  });
  return { exam, steps };
}

const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

// ---------------- 本体 ----------------

/** 単元模試 (/learn/moshi/<単元id>) のとき: 結果に正答率・これまでの記録・レクチャーへの導線・新しい問題でもう一度 */
export interface MoshiUnitPage {
  unit: string;
  name: string;
  lecture?: string;
  /** A・B があるとき: もう一度で ?seed= を変えてこのページを開きなおす */
  regenBase?: string;
  seed: number;
}

export function MoshiPlay({
  exam,
  daimon,
  units,
  kids,
  homeHref,
  saveUnit,
  unitPage,
  examMode,
}: {
  exam: Exam;
  daimon: Daimon[];
  units: Record<string, MoshiUnit>;
  kids: boolean;
  homeHref: string;
  /** 結果を端末に保存する単元 (1単元の回だけ) */
  saveUnit?: string;
  unitPage?: MoshiUnitPage;
  examMode?: MoshiExamMode;
}) {
  const w0 = moshiWords(kids);
  const w = examMode
    ? {
        ...w0,
        left: "残り時間",
        over: "時間切れ",
        coverLead: `制限時間は${exam.minutes}分。時間になると、その時点の答えで自動的に提出します。解いている間は解説・ヒントは出ません。答えはこのページを開いている間だけ保たれます（再読み込みすると最初からになります）。`,
        cover: (m: number, p: number, n: number) => `制限時間 ${m}分・${p}点満点・大問 ${n}題`,
      }
    : w0;
  const router = useRouter();
  const [record, setRecord] = useState<{ record: MoshiUnitRecord; best: boolean } | null>(null);
  const [phase, setPhase] = useState<Phase>("cover");
  const [round, setRound] = useState(0);
  const [startAt, setStartAt] = useState(0);
  const [now, setNow] = useState(0);
  const [resp, setResp] = useState<Record<string, Response>>({});
  const [pools, setPools] = useState<Record<string, number[]>>({});
  const [checks, setChecks] = useState<Record<string, boolean[]>>({});
  const [confirm, setConfirm] = useState(false);
  const [saved, setSaved] = useState<number | null>(null);
  const [examRes, setExamRes] = useState<ExamResultData | null>(null);
  /** 弱点の処方箋 (図鑑に入れたカード。次の復習日はみな同じ「あした」) */
  const [rx, setRx] = useState<{ heads: string[]; n: number; again: number; due: number } | null>(null);
  const top = useRef<HTMLDivElement>(null);
  /** 大問ごとに画面に出していた秒数 (試験中、画面のまんなかにある大問に1秒ずつ足す) */
  const secTime = useRef<number[]>([]);
  const timedOut = useRef(false);
  const autoSubmit = useRef<() => void>(() => {});

  const all = useMemo(() => daimon.flatMap((d) => d.items.map((it) => ({ d, it, key: keyOf(d, it) }))), [daimon]);
  const figNos = useMemo(() => figureNumbers(daimon), [daimon]);

  // 試験中は1秒ごとに時計を進める (残り10分・5分・0分で読み上げ)
  useEffect(() => {
    if (phase !== "exam") return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      const mid = window.innerHeight * 0.45;
      for (const el of document.querySelectorAll<HTMLElement>("[data-dm]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          const i = Number(el.dataset.dm);
          secTime.current[i] = (secTime.current[i] ?? 0) + 1;
          break;
        }
      }
      if (examMode && t - startAt >= exam.minutes * 60000) {
        timedOut.current = true;
        autoSubmit.current();
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, examMode, startAt, exam.minutes]);
  const leftSec = exam.minutes * 60 - Math.max(0, (now - startAt) / 1000);
  const leftMin = Math.ceil(leftSec / 60);
  // 読み上げは区切り (残り10分・5分・時間切れ) が変わったときだけ
  const announce = phase !== "exam" ? "" : leftMin <= 0 ? w.over : leftMin <= 5 ? `${w.left} 5${kids ? "ふん" : "分"}` : leftMin <= 10 ? `${w.left} 10${kids ? "ぷん" : "分"}` : "";

  useEffect(() => {
    if (phase !== "cover") top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase, round]);

  const [starting, setStarting] = useState(false);
  const begin = async () => {
    if (!examMode?.beforeStart) return start();
    if (starting) return;
    setStarting(true);
    try {
      if (await examMode.beforeStart()) start();
    } finally {
      setStarting(false);
    }
  };

  const start = () => {
    const r: Record<string, Response> = {};
    const p: Record<string, number[]> = {};
    for (const { it, key } of all) {
      r[key] = emptyResponse(it);
      if (it.answer.kind === "order") {
        const idx = it.answer.tokens.map((_, i) => i);
        if (it.answer.distractor) idx.push(-1);
        let s = shuffle(idx);
        for (let k = 0; k < 5 && s.every((v, i) => v === i); k++) s = shuffle(idx); // 最初から正しい順にならないように
        p[key] = s;
      }
    }
    setResp(r);
    setPools(p);
    setChecks({});
    setSaved(null);
    setRecord(null);
    setExamRes(null);
    setRx(null);
    setConfirm(false);
    secTime.current = daimon.map(() => 0);
    timedOut.current = false;
    const t = Date.now();
    setStartAt(t);
    setNow(t);
    setRound((n) => n + 1);
    setPhase("exam");
    trackEvent("moshi_start", { exam: exam.id });
  };

  const blanks = all.filter(({ key }) => resp[key] && isBlank(resp[key])).length;
  const answered = all.length - blanks;
  const hasWritten = all.some(({ it }) => it.answer.kind === "written");

  const results = useMemo(() => {
    const out: Record<string, ItemResult> = {};
    for (const { it, key } of all) if (resp[key]) out[key] = gradeItem(it, resp[key], checks[key]);
    return out;
  }, [all, resp, checks]);

  const finish = () => {
    // まちがいノートへ: 満点でない小問を入れる。満点の小問は、ノートにあれば1つ進める
    let n = 0;
    const stumbles: NewMistake[] = [];
    for (const { d, it, key } of all) {
      const res = results[key];
      const r = resp[key];
      const unitId = it.unit ?? d.units[0];
      const u = units[unitId];
      const meta: MistakeMeta = { unitId, unitName: u?.name ?? unitId, href: u?.href || u?.lecture || "", subject: `テスト模試・${u?.subject ?? ""}`, kids: u?.kids };
      const needMat = /上の|表|資料|本文|グラフ/.test(it.prompt);
      const q = noteText(`【${d.title} ${it.no}】${needMat ? `\n${materialAsText(d.material)}\n` : ""}${it.prompt}`);
      const ex = [plain(it.point), ...it.steps.map((s) => `${plain(s.title)}：${plain(s.body)}`)].join("\n");
      if (res.score >= it.points) {
        recordRight(unitId, q);
        continue;
      }
      n++;
      // つまずき図鑑へ (試験モード・前の小問の答えを使う小問は入れない)。本文は入れず、作りなおす id とシードだけ
      if (!examMode && !it.dependsOn) stumbles.push({ u: d.units[0], d: d.id, q: it.id, seed: unitPage?.seed ?? 0, name: u?.name ?? unitId, subj: u?.subject ?? "", head: plain(it.point).slice(0, 40), kids: u?.kids || undefined });
      const a = it.answer;
      if (a.kind === "choice" && !Array.isArray(a.correct) && r.kind === "choice") {
        recordMistake(meta, { q, choices: a.options.map(noteText), answer: a.correct, ex: `${noteText(a.why[a.correct])}\n${ex}`, source: "moshi" }, r.picked[0] ?? -1);
      } else recordMistakeText(meta, { q, model: noteText(modelText(it)), ex, source: "moshi" }, noteText(mineText(it, r)));
    }
    setSaved(n);
    if (stumbles.length) {
      const put = recordStumbles(stumbles);
      setRx({ heads: put.slice(0, 3).map((x) => x.card.head), n: put.length, again: put.filter((x) => x.again).length, due: put[0]?.card.due ?? dayNo(Date.now()) + 1 });
    }
    const total = Object.values(results).reduce((s, x) => s + x.score, 0);
    const sum = summarize(all.map(({ d, it, key }) => ({ key, points: it.points, unit: it.unit ?? d.units[0], skill: it.skill, difficulty: it.level })), results);
    const unitToSave = unitPage?.unit ?? saveUnit;
    setRecord(unitToSave ? recordMoshiResult(unitToSave, { score: sum.score, total: sum.total, rate: sum.rate }) : null);
    if (examMode) {
      const usedSec = Math.min(exam.minutes * 60, Math.round((Date.now() - startAt) / 1000));
      const parts = daimon.map((d, i) => ({ title: plain(d.title), score: d.items.reduce((s, it) => s + (results[keyOf(d, it)]?.score ?? 0), 0), total: d.points, sec: secTime.current[i] ?? 0 }));
      const unitsRec: ExamAttempt["units"] = {};
      for (const [u, t] of Object.entries(sum.byUnit)) unitsRec[u] = [t.score, t.total];
      const attempt: ExamAttempt = { spec: examMode.specId, mode: examMode.mode, title: exam.title, seed: examMode.seed, at: new Date().toISOString(), score: sum.score, total: sum.total, minutes: exam.minutes, usedSec, timeout: timedOut.current, parts, units: unitsRec };
      const rec = recordExamResult(attempt);
      const weak = Object.entries(sum.byUnit)
        .map(([u, t]) => ({ unit: u, name: units[u]?.name ?? u, score: t.score, total: t.total, pct: t.total ? Math.round((t.score / t.total) * 100) : 0, lecture: units[u]?.lecture, moshi: units[u]?.moshi }))
        .filter((x) => x.pct < 60)
        .sort((a, b) => a.pct - b.pct || b.total - a.total);
      setExamRes({ parts, usedSec, minutes: exam.minutes, timeout: timedOut.current, weak, count: rec?.count ?? null, prevBest: rec?.prevBest ?? null, total: exam.total });
    }
    trackEvent("moshi_finish", { exam: exam.id, score: total, total: exam.total });
    setPhase("result");
  };

  const submit = () => {
    setConfirm(false);
    if (hasWritten) setPhase("self");
    else finish();
  };
  useEffect(() => {
    autoSubmit.current = submit;
  });

  // ---------- 表紙 ----------
  if (phase === "cover")
    return (
      <div className={card}>
        <p className="m-0 text-[13px] font-black text-[#1533B8]">{w.cover(exam.minutes, exam.total, daimon.length)}</p>
        <ol className="m-0 mt-3 grid list-none gap-1.5 p-0">
          {daimon.map((d, i) => (
            <li key={d.id} className="flex items-baseline justify-between gap-2 rounded-[10px] bg-[#F7F6F1] px-3 py-2 text-[14px] font-bold">
              <span className="min-w-0">
                <span className="mr-1.5 font-black">{i + 1}</span>
                <Rich text={d.title} />
                <span className="ml-1.5 text-[12px] text-[#5A5D73]">（{d.items.length}{kids ? "もん" : "問"}）</span>
              </span>
              <span className="shrink-0 font-black">{w.points(d.points)}</span>
            </li>
          ))}
        </ol>
        <p className="m-0 mt-3 text-[13.5px] leading-relaxed text-[#3A3D55]">{w.coverLead}</p>
        {unitPage?.regenBase && <p className="m-0 mt-1 text-[12px] font-bold text-[#5A5D73]">{w.roundNo(unitPage.seed)}</p>}
        <button type="button" onClick={() => void begin()} disabled={starting} aria-busy={starting} className={`${bigBtn} mt-4 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A] disabled:opacity-60`}>
          {w.start}
        </button>
      </div>
    );

  // ---------- 試験 ----------
  if (phase === "exam") {
    return (
      <div ref={top} className="scroll-mt-3">
        <div className="sticky top-0 z-20 -mx-4 flex items-center justify-between gap-2 border-b-[1.5px] border-[#15172B] bg-[#15172B] px-4 py-2 text-white sm:mx-0 sm:rounded-[12px]">
          <span className="text-[13px] font-bold">
            {leftSec > 0 ? (
              <>
                {w.left} <span className="text-[18px] font-black tabular-nums text-[#FFE45C]">{mmss(leftSec)}</span>
              </>
            ) : (
              <span className="font-black text-[#FFE45C]">{w.over}</span>
            )}
          </span>
          <span className="text-[13px] font-black tabular-nums">{w.answered(answered, all.length)}</span>
        </div>
        <p aria-live="polite" className="sr-only">
          {announce}
        </p>
        {daimon.map((d, di) => (
          <section key={d.id} data-dm={di} aria-labelledby={`dm-${di}`} className={`${card} mt-4`}>
            <h2 id={`dm-${di}`} className="m-0 flex items-baseline justify-between gap-2 text-[18px] font-black">
              <span>
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#15172B] text-[14px] text-white">{di + 1}</span>
                <Rich text={d.title} />
              </span>
              <span className="shrink-0 text-[13px] font-black text-[#3A3D55]">{w.points(d.points)}</span>
            </h2>
            <p className="m-0 mt-2 text-[14px] font-bold"><Rich text={d.lead} /></p>
            {d.material?.map((m, k) => (
              <MaterialView key={k} m={m} figNo={figNos.exam[`${di}-${k}`] ?? 0} />
            ))}
            <ol className="m-0 mt-4 grid list-none gap-6 p-0">
              {d.items.map((it) => {
                const key = keyOf(d, it);
                const label = `${di + 1}${it.no}の答え`;
                return (
                  <li key={key} className="border-t border-dashed border-[#C9C6B4] pt-4">
                    <p className="m-0 whitespace-pre-line text-[15.5px] leading-relaxed [overflow-wrap:anywhere]">
                      <span className="mr-1.5 font-black text-[#1533B8]">{it.no}</span>
                      <Rich text={it.prompt} />
                      <span className="ml-1.5 whitespace-nowrap text-[12px] font-bold text-[#5A5D73]">［{w.points(it.points)}］</span>
                    </p>
                    {it.figure && !isFigureRef(it.figure) && <LectureFigure fig={it.figure} no={figNos.exam[key] ?? 0} />}
                    {resp[key] && <ItemInput it={it} r={resp[key]} pool={pools[key] ?? []} w={w} label={label} onChange={(r) => setResp((p) => ({ ...p, [key]: r }))} />}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
        {confirm ? (
          <div role="alertdialog" aria-labelledby="mo-confirm" className={`${card} mt-5 bg-[#FFFBE6]`}>
            <p id="mo-confirm" className="m-0 text-[15px] font-black">
              {w.blankWarn(blanks)}
            </p>
            <div className="mt-3 grid gap-2">
              <button type="button" autoFocus onClick={submit} className={`${bigBtn} bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}>
                {w.submitAnyway}
              </button>
              <button type="button" onClick={() => setConfirm(false)} className={`${bigBtn} bg-white text-[#15172B]`}>
                {w.backToExam}
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => (blanks > 0 ? setConfirm(true) : submit())} className={`${bigBtn} mt-5 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
            {w.submit}
          </button>
        )}
      </div>
    );
  }

  // ---------- 記述の自己採点 ----------
  if (phase === "self") {
    const ws = all.filter(({ it }) => it.answer.kind === "written");
    return (
      <div ref={top} className="scroll-mt-3">
        <div className={card}>
          <h2 className="m-0 text-[19px] font-black">{w.selfTitle}</h2>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">{w.selfLead}</p>
        </div>
        {ws.map(({ d, it, key }) => {
          const a = it.answer;
          if (a.kind !== "written") return null;
          const r = resp[key];
          const text = r?.kind === "written" ? r.text : "";
          const auto = r?.kind === "written" ? r.auto : undefined;
          const autoOk =
            a.autoPart && auto?.some((s) => s.trim())
              ? a.autoPart.kind === "num"
                ? judgeNum(a.autoPart, auto).every((v) => v === "ok")
                : gradeTerm(a.autoPart, 1, auto[0] ?? "").verdict === "ok"
              : null;
          const cs = checks[key] ?? a.rubric.map(() => false);
          const sc = results[key]?.score ?? 0;
          return (
            <section key={key} aria-labelledby={`sf-${key}`} className={`${card} mt-4`}>
              <h3 id={`sf-${key}`} className="m-0 text-[16px] font-black">
                <Rich text={d.title} /> {it.no}
                <span className="ml-2 text-[13px] text-[#3A3D55]">{w.points(it.points)}</span>
              </h3>
              <p className="m-0 mt-1 whitespace-pre-line text-[14px] leading-relaxed text-[#3A3D55]"><Rich text={it.prompt} /></p>
              <p className="m-0 mt-3 text-[12.5px] font-black text-[#3A3D55]">{w.yourAnswer}</p>
              <p className="m-0 mt-1 whitespace-pre-line rounded-[10px] border-[1.5px] border-[#15172B] bg-white p-3 text-[14.5px] leading-relaxed [overflow-wrap:anywhere]">{text || w.blank}</p>
              {autoOk !== null && <p className={`m-0 mt-2 text-[13px] font-black ${autoOk ? "text-[#1533B8]" : "text-[#D9341F]"}`}>{autoOk ? w.autoOk : w.autoNg}</p>}
              <p className="m-0 mt-3 text-[12.5px] font-black text-[#1533B8]">{w.model}</p>
              <p className="m-0 mt-1 whitespace-pre-line rounded-[10px] bg-[#FFFBE6] p-3 text-[14.5px] font-bold leading-relaxed [overflow-wrap:anywhere]"><Rich text={a.model} /></p>
              <fieldset className="m-0 mt-3 border-0 p-0">
                <legend className="text-[13px] font-black">採点基準</legend>
                <div className="mt-1.5 grid gap-2">
                  {a.rubric.map((rb, k) => {
                    const hits = keywordHits(text, rb.keywords);
                    return (
                      <label key={k} className={`flex min-h-[48px] cursor-pointer items-start gap-3 rounded-[12px] border-[1.5px] px-3 py-2.5 ${cs[k] ? "border-[#1533B8] bg-[#E3E8FF]" : "border-[#15172B] bg-white"} ${text ? "" : "opacity-60"}`}>
                        <input
                          type="checkbox"
                          checked={cs[k]}
                          disabled={!text.trim()}
                          onChange={(e) => setChecks((p) => ({ ...p, [key]: cs.map((v, j) => (j === k ? e.target.checked : v)) }))}
                          className="mt-0.5 h-6 w-6 flex-none accent-[#1533B8]"
                        />
                        <span className="min-w-0 text-[14px] font-bold leading-snug">
                          <Rich text={rb.label} />
                          <span className="ml-1.5 whitespace-nowrap font-black text-[#1533B8]">{w.points(rb.points)}</span>
                          {hits.length > 0 && <span className="mt-0.5 block text-[12px] font-bold text-[#5A5D73]">{w.hit(hits.join("」「"))}</span>}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <p aria-live="polite" className="m-0 mt-2 text-right text-[15px] font-black">
                {sc} / {it.points}
              </p>
            </section>
          );
        })}
        <button type="button" onClick={finish} className={`${bigBtn} mt-5 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}>
          {w.selfDone}
        </button>
      </div>
    );
  }

  // ---------- 結果と解き方 ----------
  const total = all.reduce((s, { key }) => s + (results[key]?.score ?? 0), 0);
  const selfScore = all.filter(({ it }) => it.answer.kind === "written").reduce((s, { key }) => s + (results[key]?.score ?? 0), 0);
  const byUnit = new Map<string, { score: number; total: number }>();
  const bySkill = new Map<string, { score: number; total: number }>();
  for (const { d, it, key } of all) {
    const u = it.unit ?? d.units[0];
    const add = (m: Map<string, { score: number; total: number }>, k: string) => {
      const v = m.get(k) ?? { score: 0, total: 0 };
      m.set(k, { score: v.score + (results[key]?.score ?? 0), total: v.total + it.points });
    };
    add(byUnit, u);
    add(bySkill, it.skill);
  }
  const rate = summarize(all.map(({ d, it, key }) => ({ key, points: it.points, unit: it.unit ?? d.units[0], skill: it.skill })), results);
  const again = () => {
    if (examMode) router.push(`${examMode.retryBase}${examMode.retryBase.includes("?") ? "&" : "?"}seed=${freshSeed()}`);
    else if (unitPage?.regenBase) router.push(`${unitPage.regenBase}?seed=${freshSeed()}`);
    else start();
  };
  return (
    <div ref={top} className="scroll-mt-3">
      <section aria-labelledby="mo-res" className={card} role="status" aria-live="polite">
        <h2 id="mo-res" className="m-0 text-[13px] font-black text-[#1533B8]">
          {w.resultTitle}
        </h2>
        <p className="m-0 mt-1 text-[16px] font-bold">
          {w.total} <span className="text-[40px] font-black leading-none">{total}</span> / {exam.total}
        </p>
        {hasWritten && <p className="m-0 mt-1 text-[12.5px] font-bold text-[#3A3D55]">{w.autoPart(total - selfScore, selfScore)}</p>}
        {total === exam.total && <p className="m-0 mt-1 text-[18px] font-black text-[#1533B8]">{w.allOk}</p>}
        {unitPage && (
          <p className="m-0 mt-2 text-[15px] font-black">
            {w.rate(rate.rate, rate.correct, rate.count)}
          </p>
        )}
        {unitPage && record && (
          <p className="m-0 mt-1 text-[13px] font-bold text-[#3A3D55]">
            {w.record(record.record.count, record.record.bestPct)}
            {record.best && record.record.count > 1 && <span className="ml-2 font-black text-[#1533B8]">{w.newBest}</span>}
          </p>
        )}
      </section>

      {examRes && <ExamResultPanel data={examRes} />}

      {rx && (
        <section aria-labelledby="mo-rx" className="mt-4 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#E3E8FF] px-4 py-3 shadow-[3px_3px_0_#15172B]">
          <h3 id="mo-rx" className="m-0 text-[13px] font-black text-[#1533B8]">
            {kids ? "よわてんの しょほうせん" : "弱点の処方箋"}
          </h3>
          <p className="m-0 mt-1 text-[15px] font-black leading-snug">
            {kids
              ? `あした（${mdLabel(rx.due)}）に、この ${Math.min(3, rx.n)}もんを もう いちど`
              : `あした（${mdLabel(rx.due)}）に、この${Math.min(3, rx.n)}問をもう一度`}
            {rx.n > 3 && <span className="text-[13px] font-bold text-[#3A3D55]">{kids ? `（ほかに ${rx.n - 3}もん）` : `（ほかに${rx.n - 3}問）`}</span>}
          </p>
          <ul className="m-0 mt-1.5 grid list-none gap-1 p-0">
            {rx.heads.map((h, i) => (
              <li key={i} className="rounded-[10px] bg-white px-3 py-1.5 text-[13px] font-bold leading-snug [overflow-wrap:anywhere]">
                {h}
              </li>
            ))}
          </ul>
          <p className="m-0 mt-1.5 text-[12px] font-bold leading-relaxed text-[#3A3D55]">
            {kids
              ? `つまずき＝のびしろ。そのあと 3にちご・7にちご・14にちごと、あいだを あけて ふくしゅう するよ。${rx.again ? `（${rx.again}もんは まえにも つまずいた もんだい）` : ""}`
              : `つまずき＝伸びしろ。その後は3日後・7日後・14日後と、間をあけて復習します。${rx.again ? `（${rx.again}問は前にもつまずいた問題）` : ""}`}
          </p>
          <Link href={ZUKAN_HREF} className="mt-2 inline-flex min-h-[44px] items-center text-[14px] font-black text-[#1533B8]">
            {kids ? "つまずき ずかんを みる →" : "つまずき図鑑を見る →"}
          </Link>
        </section>
      )}

      {saved !== null && saved > 0 && (
        <Link
          href="/learn/note"
          className="mt-4 flex min-h-[48px] flex-wrap items-center justify-between gap-x-2 gap-y-0.5 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-4 py-2.5 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]"
        >
          <span className="text-[14px] font-black">{w.noteIn(saved)}</span>
          <span className="text-[14px] font-black text-[#1533B8]">{w.noteGo}</span>
        </Link>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <section aria-labelledby="mo-bd" className={`${card} min-w-0`}>
          <h3 id="mo-bd" className="m-0 text-[15px] font-black">
            {w.byDaimon}
          </h3>
          <ul className="m-0 mt-2 grid list-none gap-2.5 p-0">
            {daimon.map((d, i) => (
              <Bar key={d.id} label={`${i + 1}　${plain(d.title)}`} score={d.items.reduce((s, it) => s + (results[keyOf(d, it)]?.score ?? 0), 0)} total={d.points} />
            ))}
          </ul>
        </section>
        <section aria-labelledby="mo-bu" className={`${card} min-w-0`}>
          <h3 id="mo-bu" className="m-0 text-[15px] font-black">
            {w.byUnit}
          </h3>
          <ul className="m-0 mt-2 grid list-none gap-2.5 p-0">
            {[...byUnit].map(([u, v]) => (
              <Bar key={u} label={units[u]?.name ?? u} score={v.score} total={v.total} />
            ))}
          </ul>
          <h3 className="m-0 mt-4 text-[15px] font-black">{w.bySkill}</h3>
          <ul className="m-0 mt-2 grid list-none gap-2.5 p-0">
            {[...bySkill].map(([k, v]) => (
              <Bar key={k} label={k} score={v.score} total={v.total} />
            ))}
          </ul>
        </section>
      </div>

      <h2 className="m-0 mt-8 text-[20px] font-black">{w.expl}</h2>
      {daimon.map((d, di) => (
        <section key={d.id} aria-labelledby={`ex-${di}`} className="mt-4">
          <h3 id={`ex-${di}`} className="m-0 text-[17px] font-black">
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#15172B] text-[14px] text-white">{di + 1}</span>
            <Rich text={d.title} />
          </h3>
          <div className="mt-2 grid gap-3">
            {d.items.map((it) => {
              const key = keyOf(d, it);
              const res = results[key] ?? { score: 0, verdict: "blank" as const };
              const base = figNos.steps[key] ?? 0;
              const u = units[it.unit ?? d.units[0]];
              return (
                <details key={key} open={res.score < it.points} className={`${card} group min-w-0 p-4`}>
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
                    <span aria-hidden="true" className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-[16px] font-black ${VERDICT_CLS[res.verdict]}`}>
                      {VERDICT_MARK[res.verdict]}
                    </span>
                    <span className="min-w-0 flex-1 text-[15px] font-black">
                      {it.no}
                      <span className="sr-only">：{w.verdict[res.verdict]}</span>
                      <span className="ml-2 text-[12.5px] font-bold text-[#3A3D55]">{plain(it.point)}</span>
                    </span>
                    <span className="shrink-0 text-[14px] font-black tabular-nums">
                      {res.score}/{it.points}
                    </span>
                  </summary>
                  <p className="m-0 mt-2 whitespace-pre-line text-[14px] leading-relaxed text-[#3A3D55] [overflow-wrap:anywhere]"><Rich text={it.prompt} /></p>
                  {it.dependsOn && (
                    <p className="m-0 mt-1 text-[12.5px] font-bold text-[#5A5D73]">
                      {kids ? "まえの もんだいの こたえを つかうよ" : `前の小問（${d.items.find((x) => x.id === it.dependsOn)?.no ?? ""}）の答え ${modelText(d.items.find((x) => x.id === it.dependsOn) ?? it)} を使って解きます。`}
                    </p>
                  )}
                  <Solution it={it} r={resp[key] ?? emptyResponse(it)} res={res} w={w} figBase={base} />
                  {u?.lecture && (
                    <Link href={u.lecture} className="mt-3 inline-flex min-h-[44px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-3 text-[13px] font-black text-white no-underline">
                      {kids ? "ずかい レクチャーで ふりかえる" : "図解レクチャーでふりかえる"} →
                    </Link>
                  )}
                </details>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-6 grid gap-2.5">
        {unitPage?.lecture && (
          <Link href={unitPage.lecture} className={`${bigBtn} bg-[#1533B8] text-white no-underline shadow-[0_4px_0_#0B1F7A]`}>
            {w.lectureGo(unitPage.name)}
          </Link>
        )}
        <button type="button" onClick={again} className={`${bigBtn} bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
          {unitPage?.regenBase || examMode ? w.retryNew : w.retry}
        </button>
        <Link href={examMode?.setupHref ?? homeHref} className={`${bigBtn} bg-white text-[#15172B] no-underline`}>
          {examMode ? "範囲・教科をえらびなおす" : w.home}
        </Link>
      </div>
    </div>
  );
}
