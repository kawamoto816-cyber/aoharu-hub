"use client";

// 演習（/learn/unizeb/enshu/<id>）：実務のワークブック。
// 資料 → 課題（1問ずつ／全部）→ 途中の答えは自動で保存（saveState の enshuDraft）→ 採点（calc はその場で、ほかは grade()）
// → 結果（課題ごと・観点ごとの点、足りない観点、読み直す節、模範解答）→ 合格ならスキルアセットへ、不合格なら数字を変えた版でもう一度。
// API がないあいだは見本の採点（sampleGrade）で動き、そのことを必ず画面に出す。
// AI昇進試験（kind "shoshin"）：ミッションごとに データパック → 出題 → Unicorn と Zebra の言い分（左右、スマホでは上下）→ 第3の答え。
// 結果に Feedback_U・Feedback_Z・Next_Action（AIメンターの次の一歩）と軸ごとの点を出し、合格なら昇進の記録としてスキルアセットへ。

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Enshu, EnshuMaterial, EnshuTask } from "@/lib/unizeb/types";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import { addAsset, grade, loadState, saveState, type UzState } from "@/lib/unizeb/client";
import { canUseEnshu, currentPlan, type UzPlan } from "@/lib/unizeb/access";
import { AXIS_LABEL, aiCritKeys, axisPoints, calcAnswer, enshuSkills, fill, fillDeep, finishGrade, fmt, parseNum, shoshinRoman, taskPoints, variantOf, type ShoshinGrade } from "@/lib/unizeb/enshuKit";

const HOME = "/learn/unizeb";
const MODE_KEY = "uz_enshu_mode";
const TYPE_LABEL: Record<EnshuTask["type"], string> = { calc: "計算", choice: "選んで理由", write: "作成" };
const AXIS_SHORT = { U: "Unicorn", Z: "Zebra", X: "統合" } as const;
const AXIS_COLOR = { U: "bg-[#1533B8] text-white", Z: "bg-[#15172B] text-white", X: "bg-[#FFE45C] text-[#15172B]" } as const;
const ABC = "ABCDE";

type SkillName = Record<string, { name: string; lv: number }>;

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const chars = (s = "") => [...s.trim()].length;
const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function Lines({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split("\n").map((l, i) => (
        <p key={i} className={`m-0 ${i ? "mt-1.5" : ""} ${className}`}>
          <Rich text={l} />
        </p>
      ))}
    </>
  );
}

function SkillChips({ ids, names }: { ids: string[]; names: SkillName }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
      {ids.map((id) => (
        <li key={id}>
          <Link href={`${HOME}/card/${id}`} className="inline-flex min-h-[32px] items-center gap-1 rounded-full border border-[#15172B]/30 bg-white px-2.5 text-[12px] font-bold text-[#15172B] no-underline">
            <span className="font-mono text-[10.5px] text-[#1533B8]">{id.toUpperCase()}</span>
            {names[id]?.name ?? id}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** 資料1つ（表・本文・図）。演習の資料と、昇進試験のデータパックで同じ形に描く */
function MaterialBlock({ m, vars, no, small = false }: { m: EnshuMaterial; vars: Record<string, number>; no: number; small?: boolean }) {
  return (
    <div className={small ? "mt-4" : "mt-5"}>
      {small ? <h4 className="m-0 text-[14.5px] font-black leading-snug">{fill(m.title, vars)}</h4> : <h3 className="m-0 text-[15.5px] font-black leading-snug">{fill(m.title, vars)}</h3>}
      {m.table && (
        <div className="mt-2 overflow-x-auto rounded-[10px] border-[1.5px] border-[#15172B] bg-white">
          <table className="w-full border-collapse text-left text-[13px] leading-snug">
            <thead>
              <tr>
                {m.table.head.map((h, k) => (
                  <th key={k} scope="col" className="border-b-[1.5px] border-[#15172B] bg-[#FFFBE6] px-2 py-1.5 font-black">
                    {fill(h, vars)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.table.rows.map((r, k) => (
                <tr key={k} className="border-t border-[#E4E2D8] align-top">
                  {r.map((c, j) => (j === 0 ? <th key={j} scope="row" className={`px-2 py-1.5 font-bold ${[...fill(c, vars)].length <= 4 ? "whitespace-nowrap" : ""}`}>{fill(c, vars)}</th> : <td key={j} className={`px-2 py-1.5 ${[...fill(c, vars)].length <= 6 ? "whitespace-nowrap" : ""}`}>{fill(c, vars)}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {m.body && (
        <div className={`mt-2 ${small ? "text-[14px]" : "text-[14.5px]"} leading-[1.85]`}>
          <Lines text={fill(m.body, vars)} />
        </div>
      )}
      {m.figure && <LectureFigure fig={fillDeep(m.figure, vars)} no={no} />}
    </div>
  );
}

export function EnshuPage({ e, skillNames }: { e: Enshu; skillNames: SkillName }) {
  const [plan, setPlan] = useState<UzPlan | null>(null);
  const [ready, setReady] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [vi, setVi] = useState(0);
  const [mode, setMode] = useState<"one" | "all">("one");
  const [cur, setCur] = useState(0);
  const [busy, setBusy] = useState(false);
  const [sec, setSec] = useState(0);
  const [result, setResult] = useState<ShoshinGrade | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [assetSaved, setAssetSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const [late, setLate] = useState(false);
  const stRef = useRef<UzState>({ assets: [] });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tasksRef = useRef<HTMLElement>(null);
  const resRef = useRef<HTMLElement>(null);

  const vars = useMemo(() => variantOf(e, vi), [e, vi]);
  const skills = useMemo(() => enshuSkills(e), [e]);
  const allowed = plan === null || canUseEnshu(plan, e.lv);
  const sho = e.kind === "shoshin";
  const roman = sho ? shoshinRoman(e.id) : (({ "shuryo-1": "I", "shuryo-2": "II", "shuryo-3": "III" } as Record<string, string>)[e.id] ?? "");
  const unit = sho ? "ミッション" : "課題";

  useEffect(() => {
    const h = new Date().getHours();
    setLate(h >= 22 || h < 5);
    try {
      const m = localStorage.getItem(MODE_KEY);
      if (m === "all" || m === "one") setMode(m);
    } catch {
      /* 保存できない表示では、その場だけ */
    }
    currentPlan().then(setPlan);
    loadState().then((s) => {
      stRef.current = s;
      const d = s.enshuDraft?.[e.id] ?? {};
      const { _v, ...rest } = d;
      setVi(Number(_v) || 0);
      setAnswers(rest);
      setReady(true);
    });
  }, [e.id]);

  const persist = useCallback(
    (a: Record<string, string>, v: number) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        const s = { ...stRef.current, enshuDraft: { ...(stRef.current.enshuDraft ?? {}), [e.id]: { ...a, _v: String(v) } } };
        stRef.current = s;
        await saveState(s);
        const d = new Date();
        setSavedAt(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`);
      }, 600);
    },
    [e.id],
  );

  const setAns = (k: string, v: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [k]: v };
      persist(next, vi);
      return next;
    });
    if (result) setResult(null);
  };

  const switchMode = (m: "one" | "all") => {
    setMode(m);
    try {
      localStorage.setItem(MODE_KEY, m);
    } catch {
      /* その場だけ */
    }
  };

  const answered = (t: EnshuTask) => (t.type === "calc" ? parseNum(answers[t.no]) !== null : t.type === "choice" ? answers[`${t.no}#pick`] !== undefined && chars(answers[t.no]) > 0 : chars(answers[t.no]) > 0);
  const nDone = e.tasks.filter(answered).length;

  async function onGrade() {
    if (busy) return;
    setBusy(true);
    setResult(null);
    setNotice("");
    setSec(0);
    const t0 = Date.now();
    const iv = setInterval(() => setSec(Math.round((Date.now() - t0) / 1000)), 1000);
    try {
      const keys = aiCritKeys(e);
      const ai: ShoshinGrade = keys.length ? await grade({ kind: "enshu", id: e.id, answers, variant: vi }, keys) : { crit: [] };
      if (ai.error) {
        setResult(ai);
        return;
      }
      const full = ai.total !== undefined && ai.passed !== undefined && ai.crit.length === e.tasks.reduce((a, t) => a + t.crit.length, 0);
      const r = full ? ai : finishGrade(e, vi, answers, ai);
      setResult(r);
      if (r.passed) {
        const next = await addAsset({
          key: `enshu:${e.id}`,
          kind: e.kind === "unit" ? "enshu" : "shuryo",
          title: sho ? `AI昇進試験 ${roman} 合格（${e.award ?? ""}）` : e.title,
          lv: e.lv,
          skills,
          score: r.total ?? 0,
          pass: e.pass,
          date: today(),
          answers: { ...answers, _v: String(vi) },
          ...(r.sample ? { sample: true } : {}),
        });
        const { [e.id]: _done, ...drafts } = next.enshuDraft ?? {};
        stRef.current = { ...next, enshuDraft: drafts };
        await saveState(stRef.current);
        setAssetSaved(true);
      }
    } catch {
      setResult({ crit: [], error: "採点できませんでした。通信のようすを確かめて、もう一度押してください。答えは保存されています。" });
    } finally {
      clearInterval(iv);
      setBusy(false);
      setTimeout(() => resRef.current?.scrollIntoView({ block: "start", behavior: reduced() ? "auto" : "smooth" }), 50);
    }
  }

  function retry() {
    const v = (vi + 1) % e.variants.length;
    const next = { ...answers };
    e.tasks.filter((t) => t.type === "calc").forEach((t) => delete next[t.no]);
    setVi(v);
    setAnswers(next);
    persist(next, v);
    setResult(null);
    setAssetSaved(false);
    setCur(0);
    setNotice(`数字を変えた版（${v + 1}つ目の版）になりました。資料の数字が変わっています。計算の答えは消しました。文章の答えの中の数字も見直してください。`);
    document.getElementById("enshu-shiryo")?.scrollIntoView({ block: "start", behavior: reduced() ? "auto" : "smooth" });
  }

  const shown = mode === "all" ? e.tasks : [e.tasks[cur]];
  const pts = result && !result.error ? taskPoints(e, result.crit) : [];
  const weak = pts.flatMap((p) => p.cs.filter((x) => (x.s?.score ?? 0) < 3).map((x) => ({ ...x, t: p.t })));

  return (
    <>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        {sho ? `AI昇進試験 ${roman}　Lv1〜${e.lv} の${skills.length}スキル` : e.kind === "shuryo" ? `修了演習 ${roman}　Lv1〜${e.lv} の総まとめ` : `演習　Lv${e.lv}・実務のワークブック`}
      </p>
      {sho && (
        <p className="m-0 mt-2 inline-flex flex-wrap items-center gap-1.5 rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1.5 text-[14px] font-black">
          <span>AI昇進試験 {roman}</span>
          <span aria-hidden="true">→</span>
          <span>{e.award}</span>
        </p>
      )}
      <h1 className="m-0 mt-1 text-[25px] font-black leading-tight">{e.title}</h1>
      <p className="m-0 mt-3 text-[15px] leading-[1.85]">{e.intro}</p>
      <ul className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0 text-[12.5px] font-bold">
        <li className="rounded-full bg-[#15172B] px-2.5 py-1 text-white">目安 {e.time}</li>
        <li className="rounded-full bg-[#15172B] px-2.5 py-1 text-white">{sho ? `ミッション ${e.tasks.length}つ` : `課題 ${e.tasks.length}問`}</li>
        <li className="rounded-full bg-[#15172B] px-2.5 py-1 text-white">合格 {e.pass}点 / 100点</li>
        {e.award && !sho && <li className="rounded-full bg-[#FFE45C] px-2.5 py-1 text-[#15172B]">合格で「{e.award}」</li>}
      </ul>
      <div className="mt-3">
        <p className="m-0 mb-1.5 text-[12px] font-black text-[#3A3D55]">使うスキル（{skills.length}）</p>
        <SkillChips ids={skills} names={skillNames} />
      </div>

      <section aria-label="取り組む前に" className="mt-5 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[13.5px] leading-relaxed">
        <p className="m-0 font-black">取り組む前に</p>
        <ul className="m-0 mt-1.5 grid gap-1 pl-5">
          <li>資料の会社・人・数字は、すべて架空です。お金は大人が預かる設定です。</li>
          <li>答えには、実在の人の名前・学校名・連絡先を書かないでください（「70代の女性」のように書けば十分です）。</li>
          <li>18歳未満の人は、22時以降は作業しないでください。途中の答えは自動で保存されるので、続きは明日できます。</li>
          {sho ? (
            <>
              <li>各ミッションには、Unicorn（実行力・経済性：早く・たくさん・お金が回る）と Zebra（倫理・包摂性：取り残される人・安全・公正）の言い分があります。どちらかを選ぶのではなく、両方に同時に応える「第3の答え」を、手順と数字と確かめ方つきで書きます。</li>
              <li>採点は、ミッションごとに Unicorn・Zebra・統合の3つの観点（各0〜4）。合計{e.pass}点以上で合格です。法律に反する案・危険な案、18歳未満の人がお金を預かる案や22時以降に作業する案、実名や連絡先を書いた答えは、足切り（不合格）になります。</li>
            </>
          ) : (
            <li>カードは「自分の事業で1スキルずつ」。演習は「初めて見る状況で、スキルを組み合わせて使えるか」を見ます。</li>
          )}
        </ul>
      </section>
      {late && (
        <p role="note" className="m-0 mt-3 rounded-[12px] border-[1.5px] border-[#B42318] bg-[#FFF1EE] px-3 py-2.5 text-[14px] font-black text-[#B42318]">
          いまは22時をすぎています。18歳未満の人は、ここで終わりにして、続きは明日にしましょう。答えは保存されています。
        </p>
      )}

      {/* 資料 */}
      <section id="enshu-shiryo" aria-labelledby="enshu-shiryo-h" className="mt-8 scroll-mt-4">
        <h2 id="enshu-shiryo-h" className="m-0 text-[19px] font-black">{sho ? "事業のあらまし" : "資料"}</h2>
        {e.variants.length > 1 && <p className="m-0 mt-1 text-[12px] font-bold text-[#5A5D73]">数字の版：{vi + 1}つ目（全{e.variants.length}版）</p>}
        {notice && (
          <p role="status" className="m-0 mt-2 rounded-[12px] bg-[#FFE45C] px-3 py-2 text-[13.5px] font-bold">
            {notice}
          </p>
        )}
        <div className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B] p-3.5 text-white">
          <p className="m-0 text-[12px] font-black text-[#FFE45C]">{sho ? "この試験の事業（架空）" : "この演習の事業（架空）"}</p>
          <p className="m-0 mt-1 text-[16px] font-black">{e.company.name}</p>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed">{fill(e.company.summary, vars)}</p>
        </div>
        {e.materials.map((m, i) => (
          <MaterialBlock key={i} m={m} vars={vars} no={i + 1} />
        ))}
      </section>

      {/* 課題 */}
      <section ref={tasksRef} id="enshu-kadai" aria-labelledby="enshu-kadai-h" className="mt-10 scroll-mt-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="enshu-kadai-h" className="m-0 text-[19px] font-black">{sho ? "ミッション" : "課題"}</h2>
          <div role="group" aria-label={`${unit}の見せ方`} className="flex rounded-full border-[1.5px] border-[#15172B] bg-white p-0.5 text-[12.5px] font-black">
            {(["one", "all"] as const).map((m) => (
              <button key={m} type="button" aria-pressed={mode === m} onClick={() => switchMode(m)} className={`min-h-[36px] rounded-full px-3 ${mode === m ? "bg-[#15172B] text-white" : "text-[#15172B]"}`}>
                {m === "one" ? "1問ずつ" : "全部"}
              </button>
            ))}
          </div>
        </div>
        <p className="m-0 mt-1.5 text-[12.5px] font-bold text-[#5A5D73]" aria-live="polite">
          答えた{unit} {nDone} / {e.tasks.length}　{savedAt ? `・自動で保存しました（${savedAt}）` : "・答えは自動で保存されます"}
        </p>
        {!allowed ? (
          <div className="mt-4 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-white p-4 text-[14px] leading-relaxed">
            <p className="m-0 font-black">{sho ? "この昇進試験" : "この演習"}は Max プランで取り組めます。</p>
            <p className="m-0 mt-1">Lv1〜3 の演習と修了演習 I は、登録しなくても取り組めます。</p>
          </div>
        ) : (
          <>
            {mode === "one" && (
              <ol aria-label={`${unit}の一覧`} className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0">
                {e.tasks.map((t, i) => (
                  <li key={t.no}>
                    <button
                      type="button"
                      aria-current={i === cur ? "step" : undefined}
                      onClick={() => setCur(i)}
                      className={`h-[40px] min-w-[44px] rounded-[10px] border-[1.5px] border-[#15172B] px-2 text-[13px] font-black ${i === cur ? "bg-[#15172B] text-white" : answered(t) ? "bg-[#FFE45C] text-[#15172B]" : "bg-white text-[#15172B]"}`}
                    >
                      {t.no}
                      <span className="sr-only">{answered(t) ? "（答えた）" : "（まだ）"}</span>
                    </button>
                  </li>
                ))}
              </ol>
            )}
            {shown.map((t) => (
              <TaskCard key={`${t.no}-${vi}`} t={t} vars={vars} answers={answers} setAns={setAns} names={skillNames} disabled={!ready || busy} unit={unit} />
            ))}
            {mode === "one" && (
              <div className="mt-3 flex gap-2">
                <button type="button" disabled={cur === 0} onClick={() => { setCur(cur - 1); tasksRef.current?.scrollIntoView({ block: "start" }); }} className="min-h-[48px] flex-1 rounded-[12px] border-[1.5px] border-[#15172B] bg-white text-[14px] font-black disabled:opacity-40">
                  ← 前の{unit}
                </button>
                <button type="button" disabled={cur === e.tasks.length - 1} onClick={() => { setCur(cur + 1); tasksRef.current?.scrollIntoView({ block: "start" }); }} className="min-h-[48px] flex-1 rounded-[12px] border-[1.5px] border-[#15172B] bg-white text-[14px] font-black disabled:opacity-40">
                  次の{unit} →
                </button>
              </div>
            )}

            <div className="mt-6 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4">
              {nDone < e.tasks.length && <p className="m-0 mb-2 text-[13px] font-bold text-[#B42318]">まだ答えていない{unit}があります（答えのない{unit}は0点になります）。</p>}
              <button type="button" onClick={onGrade} disabled={busy || !ready} className="min-h-[52px] w-full rounded-[14px] bg-[#1533B8] text-[16px] font-black text-white shadow-[3px_3px_0_#15172B] disabled:opacity-60">
                {busy ? "採点しています…" : "採点する"}
              </button>
              <p className="m-0 mt-2 text-[12px] leading-relaxed text-[#3A3D55]">
                {sho
                  ? "AIが、ミッションごとに Unicorn・Zebra・統合の観点を0〜4で採点し、講評と次の一歩を返します。AI採点は、この試験1回の採点で1回と数えます。"
                  : "計算の課題はその場で、ほかの課題はAIが観点ごとに0〜4で採点します。AI採点は、この演習1回の採点で1回と数えます。"}
              </p>
              {busy && (
                <p role="status" aria-live="polite" className="m-0 mt-2 text-[14px] font-black">
                  採点しています（ふつう20〜60秒）… <span className="tabular-nums">{sec}</span>秒
                </p>
              )}
            </div>
          </>
        )}
      </section>

      {/* 結果 */}
      {result && (
        <section ref={resRef} id="enshu-kekka" aria-labelledby="enshu-kekka-h" className="mt-8 scroll-mt-4">
          <h2 id="enshu-kekka-h" className="m-0 text-[19px] font-black">結果</h2>
          {result.error ? (
            <p role="alert" className="m-0 mt-3 rounded-[12px] border-[1.5px] border-[#B42318] bg-[#FFF1EE] p-3 text-[14px] font-bold text-[#B42318]">
              {result.error}
            </p>
          ) : (
            <>
              {result.sample && (
                <p className="m-0 mt-3 rounded-[12px] border-[1.5px] border-dashed border-[#B42318] bg-white p-3 text-[13px] font-bold leading-relaxed text-[#B42318]">
                  {sho
                    ? "見本の採点：AI採点の準備ができるまでは、答えの長さと、空でないかだけで付けた目安の点です。Unicorn・Zebra の講評とAIメンターの次の一歩は、本番のAI採点で出ます。本番のAI採点とは別物です。"
                    : "見本の採点：AI採点の準備ができるまでは、答えの長さと、空でないかだけで付けた目安の点です（計算の課題は本番と同じ採点）。本番のAI採点とは別物です。"}
                </p>
              )}
              <div className={`mt-3 rounded-[18px] border-[1.5px] border-[#15172B] p-4 ${result.passed ? "bg-[#FFE45C]" : "bg-white"}`}>
                <p className="m-0 text-[13px] font-black">{result.passed ? "合格" : "不合格"}（合格点 {e.pass}点）</p>
                <p className="m-0 mt-1 text-[40px] font-black leading-none tabular-nums">
                  {result.total}
                  <span className="text-[16px]"> / 100点</span>
                </p>
                {result.ko && <p className="m-0 mt-2 text-[13.5px] font-bold text-[#B42318]">足切り：{result.ko}</p>}
                {result.praise && <p className="m-0 mt-2 text-[13.5px] leading-relaxed">いちばん良かったところ：{result.praise}</p>}
              </div>
              {sho && <ShoshinFeedback e={e} result={result} names={skillNames} />}

              {result.passed ? (
                <div className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white">
                  {e.award && sho && <p className="m-0 text-[17px] font-black text-[#FFE45C]">AI昇進試験 {roman} に合格。{e.award}しました{result.sample ? "（見本の採点）" : ""}</p>}
                  {e.award && !sho && <p className="m-0 text-[17px] font-black text-[#FFE45C]">位階 {roman}「{e.award}」を認定しました{result.sample ? "（見本の採点）" : ""}</p>}
                  <p className="m-0 mt-1 text-[15px] font-black">{assetSaved ? (sho ? "昇進の記録として、スキルアセットに入れました" : "スキルアセットに入れました") : "スキルアセットに入れています…"}</p>
                  <p className="m-0 mt-1 text-[13px] leading-relaxed text-white/85">合格した答案は、日付・Lv・使ったスキル・点数つきで残ります。志望理由書・ガクチカ・ESに使える実績の記録です。</p>
                  <Link href={`${HOME}/assets`} className="mt-3 inline-flex min-h-[44px] items-center rounded-full bg-white px-4 text-[14px] font-black text-[#15172B] no-underline">
                    スキルアセットを見る →
                  </Link>
                </div>
              ) : (
                <div className="mt-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
                  <p className="m-0 text-[14px] font-black">{sho ? `足りない観点を読み直して、数字を変えた版でもう一度挑戦しよう（合格は${e.pass}点から）。` : "足りない観点を読み直して、数字を変えた版でもう一度取り組もう。"}</p>
                  <button type="button" onClick={retry} className="mt-3 min-h-[48px] w-full rounded-[12px] bg-[#15172B] text-[15px] font-black text-white">
                    数字を変えてもう一度
                  </button>
                </div>
              )}

              {weak.length > 0 && (
                <div className="mt-5">
                  <h3 className="m-0 text-[16px] font-black">足りない観点と、読み直す所</h3>
                  <ul className="m-0 mt-2 grid list-none gap-2 p-0">
                    {weak.map((x) => (
                      <li key={x.key} className="rounded-[12px] border-[1.5px] border-[#B42318]/50 bg-[#FFF1EE] p-3 text-[13.5px] leading-relaxed">
                        <p className="m-0 font-black">
                          {unit}{x.t.no}：{x.c.axis ? `［${AXIS_SHORT[x.c.axis]}］` : ""}{fill(x.c.t, vars)}（{x.s?.score ?? 0}/4）
                        </p>
                        <p className="m-0 mt-1">満点の姿：{fill(x.c.g4, vars)}</p>
                        {[x.t.review ?? []].flat().map((href) => (
                          <Link key={href} href={href} className="mt-1.5 mr-3 inline-flex min-h-[40px] items-center font-black text-[#1533B8]">
                            読み直す：{readLabel(href, skillNames)} →
                          </Link>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.rewrite && (
                <div className="mt-5 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[13.5px] leading-relaxed">
                  <p className="m-0 font-black">直し方の例（{unit}{result.rewrite.key.split("-")[0]}）</p>
                  <p className="m-0 mt-1.5 text-[#5A5D73]">前：{result.rewrite.before}</p>
                  <p className="m-0 mt-1 font-bold">後：{result.rewrite.after}</p>
                </div>
              )}

              <h3 className="m-0 mt-6 text-[16px] font-black">{unit}ごとの点と模範解答</h3>
              <ol className="m-0 mt-2 grid list-none gap-3 p-0">
                {pts.map(({ t, cs, pt, max }) => (
                  <li key={t.no} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5">
                    <p className="m-0 flex items-baseline justify-between gap-2 text-[15px] font-black">
                      <span>{sho ? `ミッション${t.no}　${t.title ? fill(t.title, vars) : "第3の答え"}` : `課題${t.no}　${TYPE_LABEL[t.type]}`}</span>
                      <span className="flex-none whitespace-nowrap tabular-nums">
                        {pt} / {max}点
                      </span>
                    </p>
                    {t.type === "calc" && t.calc && (
                      <p className="m-0 mt-1.5 text-[13.5px]">
                        あなたの答え：{answers[t.no] || "（空）"}　／　正しい値：<b>{fmt(calcAnswer(t, vars))}{t.calc.unit}</b>
                      </p>
                    )}
                    {t.type !== "calc" && (
                      <ul className="m-0 mt-2 grid list-none gap-2 p-0">
                        {cs.map((x) => (
                          <li key={x.key} className="rounded-[10px] bg-[#F7F6F1] p-2.5 text-[13px] leading-relaxed">
                            <p className="m-0 flex justify-between gap-2 font-black">
                              <span>
                                {x.c.axis && <span className={`mr-1.5 rounded px-1.5 py-0.5 align-[1px] text-[10.5px] ${AXIS_COLOR[x.c.axis]}`}>{AXIS_SHORT[x.c.axis]}</span>}
                                {fill(x.c.t, vars)}
                              </span>
                              <span className="flex-none tabular-nums">
                                {x.s?.score ?? 0}/4 → {x.pt}/{x.c.w}点
                              </span>
                            </p>
                            {x.s?.quote && <p className="m-0 mt-1 text-[#5A5D73]">「{x.s.quote}」</p>}
                            {x.s?.good && <p className="m-0 mt-0.5">◯ {x.s.good}</p>}
                            {x.s?.fix && <p className="m-0 mt-0.5 text-[#B42318]">→ {x.s.fix}</p>}
                          </li>
                        ))}
                      </ul>
                    )}
                    <details className="group mt-2">
                      <summary className="inline-flex min-h-[40px] cursor-pointer list-none items-center rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3.5 text-[12.5px] font-black [&::-webkit-details-marker]:hidden">
                        <span className="group-open:hidden">模範解答の例を見る</span>
                        <span className="hidden group-open:inline">模範解答の例をとじる</span>
                      </summary>
                      <p className="m-0 mt-2 rounded-[10px] bg-[#FFFBE6] px-3 py-2 text-[13.5px] leading-[1.8]">{fill(t.model, vars)}</p>
                      <p className="m-0 mt-1 text-[11.5px] text-[#5A5D73]">答えは人ごとにちがってかまいません。模範解答の丸写しは、次の採点で足切りになります。</p>
                    </details>
                  </li>
                ))}
              </ol>
            </>
          )}
        </section>
      )}

      <nav aria-label="次へ" className="mt-10 grid gap-2">
        <Link href={`${HOME}/assets`} className="flex min-h-[48px] items-center justify-between rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3.5 text-[14px] font-black text-[#15172B] no-underline">
          <span>スキルアセット（合格した答案）</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link href={HOME} className="flex min-h-[48px] items-center justify-between rounded-[12px] bg-[#15172B] px-3.5 text-[14px] font-black text-white no-underline">
          <span>ゼロワンOSユース版の目次</span>
          <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </>
  );
}

/** 昇進試験の講評：軸ごとの点、Feedback_U・Feedback_Z・Next_Action。見本の採点（講評なし）でも崩れないよう、ないときは案内と読み直す所を出す */
function ShoshinFeedback({ e, result, names }: { e: Enshu; result: ShoshinGrade; names: SkillName }) {
  const ax = axisPoints(e, result.crit);
  const reviews = [...new Set(e.tasks.flatMap((t) => [t.review ?? []].flat()))];
  // 見本の採点などで nextAction がないとき：いちばん点の低い観点のミッションの、最初の読み直す所
  const weakest = taskPoints(e, result.crit)
    .flatMap((p) => p.cs.map((x) => ({ t: p.t, r: x.c.w ? x.pt / x.c.w : 0 })))
    .sort((a, b) => a.r - b.r)[0];
  const fallback = weakest ? [weakest.t.review ?? []].flat()[0] : reviews[0];
  const rows: { k: "U" | "Z"; label: string; text?: string }[] = [
    { k: "U", label: "Feedback_U", text: result.feedbackU },
    { k: "Z", label: "Feedback_Z", text: result.feedbackZ },
  ];
  return (
    <section aria-label="AIの講評" className="mt-3 rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-3.5">
      <ul className="m-0 grid list-none grid-cols-3 gap-1.5 p-0 text-center">
        {(["U", "Z", "X"] as const).map((k) => (
          <li key={k} className={`rounded-[10px] px-1 py-2 ${AXIS_COLOR[k]}`}>
            <p className="m-0 text-[11px] font-black leading-tight">{AXIS_SHORT[k]}</p>
            <p className="m-0 mt-0.5 text-[18px] font-black tabular-nums leading-none">
              {ax[k].pt}
              <span className="text-[11px]"> / {ax[k].max}</span>
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.k} className="rounded-[12px] border-[1.5px] border-[#15172B]/40 bg-[#F7F6F1] p-3 text-[13.5px] leading-relaxed">
            <p className="m-0 text-[12px] font-black">
              <span className={`mr-1.5 rounded px-1.5 py-0.5 text-[10.5px] ${AXIS_COLOR[r.k]}`}>{r.label}</span>
              {AXIS_LABEL[r.k]}
            </p>
            <p className="m-0 mt-1.5">{r.text ?? (result.sample ? "見本の採点では講評は出ません。本番のAI採点で、この観点の講評が出ます。" : "講評はありません。")}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-[12px] bg-[#15172B] p-3 text-[13.5px] leading-relaxed text-white">
        <p className="m-0 text-[12px] font-black text-[#FFE45C]">Next_Action　AIメンターからの次の一歩</p>
        <p className="m-0 mt-1.5">{result.nextAction ?? (fallback ? "いちばん点が低い観点に効く所から、読み直そう。" : "足りない観点を読み直そう。")}</p>
        {fallback && (
          <Link href={fallback} className="mt-1.5 inline-flex min-h-[40px] items-center font-black text-[#FFE45C]">
            読む：{readLabel(fallback, names)} →
          </Link>
        )}
      </div>
    </section>
  );
}

function readLabel(href: string, names: SkillName) {
  const m = href.match(/\/(lec|card)\/(z\d-\d\d)(?:#lec-s(\d+))?/);
  if (!m) return href;
  const n = names[m[2]]?.name ?? m[2].toUpperCase();
  return m[1] === "lec" ? `図解レクチャー「${n}」${m[3] ? `の${m[3]}節` : ""}` : `スキルカード「${n}」`;
}

function TaskCard({
  t,
  vars,
  answers,
  setAns,
  names,
  disabled,
  unit = "課題",
}: {
  t: EnshuTask;
  vars: Record<string, number>;
  answers: Record<string, string>;
  setAns: (k: string, v: string) => void;
  names: SkillName;
  disabled: boolean;
  unit?: string;
}) {
  const max = t.crit.reduce((a, c) => a + c.w, 0);
  const id = `enshu-t${t.no}`;
  const pick = answers[`${t.no}#pick`];
  return (
    <article aria-labelledby={`${id}-h`} className="mt-4 rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-3.5 shadow-[3px_3px_0_#15172B]">
      <h3 id={`${id}-h`} className="m-0 flex items-baseline justify-between gap-2 text-[16px] font-black">
        <span>
          {unit}
          {t.no}
          {t.title ? <span className="ml-1.5">「{fill(t.title, vars)}」</span> : <span className="ml-2 rounded bg-[#1533B8] px-1.5 py-0.5 align-[2px] text-[11px] text-white">{TYPE_LABEL[t.type]}</span>}
        </span>
        <span className="flex-none text-[13px] tabular-nums">{max}点</span>
      </h3>
      <div className="mt-2">
        <SkillChips ids={t.skills} names={names} />
      </div>
      {t.data && t.data.length > 0 && (
        <section aria-label={`${unit}${t.no}のデータパック`} className="mt-3 rounded-[12px] bg-[#F7F6F1] p-3">
          <p className="m-0 text-[12.5px] font-black text-[#1533B8]">データパック</p>
          {t.data.map((m, i) => (
            <MaterialBlock key={i} m={m} vars={vars} no={i + 1} small />
          ))}
        </section>
      )}
      {t.dilemma && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2" role="group" aria-label="Unicorn と Zebra の言い分">
          <div className="rounded-[12px] border-[1.5px] border-[#1533B8] bg-[#EEF1FF] p-3">
            <p className="m-0 text-[12px] font-black text-[#1533B8]">Unicorn の言い分（実行力・経済性）</p>
            <p className="m-0 mt-1 text-[14px] leading-[1.75]">{fill(t.dilemma.unicorn, vars)}</p>
          </div>
          <div className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-3 [background-image:repeating-linear-gradient(135deg,transparent_0_10px,rgba(21,23,43,0.04)_10px_20px)]">
            <p className="m-0 text-[12px] font-black text-[#15172B]">Zebra の言い分（倫理・包摂性）</p>
            <p className="m-0 mt-1 text-[14px] leading-[1.75]">{fill(t.dilemma.zebra, vars)}</p>
          </div>
        </div>
      )}
      <div className="mt-2.5 text-[15px] font-bold leading-[1.8]">
        {t.dilemma && <p className="m-0 mb-1 text-[12.5px] font-black text-[#3A3D55]">出題</p>}
        <Lines text={fill(t.prompt, vars)} />
      </div>
      {t.type === "calc" && (
        <div className="mt-3">
          <label htmlFor={`${id}-a`} className="text-[12.5px] font-black text-[#3A3D55]">
            答え（数だけ）
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              id={`${id}-a`}
              inputMode="decimal"
              autoComplete="off"
              value={answers[t.no] ?? ""}
              onChange={(ev) => setAns(t.no, ev.target.value)}
              disabled={disabled}
              className="min-h-[48px] w-full max-w-[220px] rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 text-[18px] font-bold tabular-nums"
            />
            <span className="text-[15px] font-black">{t.calc?.unit}</span>
          </div>
        </div>
      )}
      {t.type === "choice" && t.options && (
        <fieldset className="m-0 mt-3 border-0 p-0">
          <legend className="text-[12.5px] font-black text-[#3A3D55]">1つ選ぶ</legend>
          <div className="mt-1 grid gap-2">
            {t.options.map((o, i) => {
              const on = pick === String(i);
              return (
                <label key={i} className={`flex min-h-[48px] cursor-pointer items-start gap-2 rounded-[12px] border-[1.5px] px-3 py-2.5 text-[14.5px] leading-snug ${on ? "border-[#1533B8] bg-[#EEF1FF] font-black" : "border-[#15172B]/40 bg-white"}`}>
                  <input type="radio" name={`${id}-pick`} checked={on} disabled={disabled} onChange={() => setAns(`${t.no}#pick`, String(i))} className="mt-0.5 h-5 w-5 flex-none accent-[#1533B8]" />
                  <span>
                    <b className="mr-1">{ABC[i]}</b>
                    {fill(o, vars)}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}
      {t.type !== "calc" && (
        <div className="mt-3">
          <label htmlFor={`${id}-a`} className="text-[12.5px] font-black text-[#3A3D55]">
            {t.type === "choice" ? "理由と、課題が求めること" : t.dilemma ? "第3の答え" : "答え"}
          </label>
          {t.hint && <p className="m-0 mt-0.5 text-[12px] text-[#5A5D73]">{t.hint}</p>}
          <textarea
            id={`${id}-a`}
            value={answers[t.no] ?? ""}
            onChange={(ev) => setAns(t.no, ev.target.value)}
            disabled={disabled}
            rows={8}
            className="mt-1 block w-full resize-y rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[16px] leading-[1.7]"
          />
          <p className="m-0 mt-1 flex justify-between text-[11.5px] text-[#5A5D73]">
            <span>実名・学校名・連絡先は書かない</span>
            <span className="tabular-nums">{chars(answers[t.no])}字</span>
          </p>
        </div>
      )}
    </article>
  );
}
