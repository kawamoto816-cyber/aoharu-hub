"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import {
  atMin,
  BIN_MIN,
  checkinGate,
  checkoutGate,
  checkProfile,
  GRADES,
  isHomeroom,
  jstHm,
  lateMin,
  LIMIT,
  mdwLabel,
  REFLECT_LABEL,
  stageAt,
  STAGES,
  TEAMS,
  type Bin,
  type Reflect,
} from "@/lib/station/bin";
import type { BinState } from "@/lib/station/bin-store";

// 学習便の生徒用の画面（/station/gakushubin/ride）。
// 状態（プロフィール・今日の便・乗車記録）は /api/station/bin から取り、操作のたびにサーバーが返す状態に置きかえる。
// 端末には何も保存しないので、閉じて戻っても、別の端末で開いても続きから始まる。
// 残り時間は、サーバーの時刻と端末の時計の差を覚えておいて数える（端末の時計がずれていても合う）。乗れるかどうかの最終判定はサーバーがする。

type Loaded = BinState & { error?: string };

const PATH = "/station/gakushubin/ride";
const REFRESH_MS = 60 * 1000;

const clock = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
const binLabel = (b: Bin) => `${mdwLabel(b.date)} ${b.name} ${jstHm(b.startMs)}発`;

const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";
const primary = "rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300";
const field = "mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900";

function Frame({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12 text-slate-800">
      <p className="text-xs font-bold tracking-wide text-indigo-600">アオハル 学習便（試験運用）</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">乗車する</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed">{children}</div>
      <p className="mt-10 text-xs text-slate-500">
        時刻表：夜便＝月・水・木・金 19:30〜21:00 ／ 朝便＝日 9:00〜10:30（火・土は運休）。本名や学校名は書かないでください。
      </p>
    </main>
  );
}

export function BinRide() {
  const { isLoaded, isSignedIn } = useAuth();
  const [state, setState] = useState<BinState | null>(null);
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  /** サーバーの時刻 − 端末の時刻 */
  const offset = useRef(0);
  const lastLoad = useRef(0);
  const [now, setNow] = useState(0);

  const accept = useCallback((json: Loaded) => {
    offset.current = json.now - Date.now();
    setState(json);
    setNow(json.now);
    setFailed(false);
  }, []);

  const load = useCallback(async () => {
    lastLoad.current = Date.now();
    try {
      const res = await fetch("/api/station/bin", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      accept((await res.json()) as Loaded);
    } catch {
      setFailed(true);
    }
  }, [accept]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const first = window.setTimeout(() => void load(), 0);
    const refresh = window.setInterval(() => void load(), REFRESH_MS);
    const tick = window.setInterval(() => setNow(Date.now() + offset.current), 1000);
    const onShow = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onShow);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(refresh);
      window.clearInterval(tick);
      document.removeEventListener("visibilitychange", onShow);
    };
  }, [isLoaded, isSignedIn, load]);

  // 改札が開く時刻・受付が終わる時刻をまたいだら、状態を取り直す（取り直しは10秒に1回まで）
  const stale = !!state && ((!state.current && !!state.next && now >= atMin(state.next, BIN_MIN.gate)) || (!!state.current && now >= atMin(state.current, BIN_MIN.end + BIN_MIN.grace)));
  useEffect(() => {
    if (stale && Date.now() - lastLoad.current > 10 * 1000) void load();
  }, [stale, now, load]);

  async function post(path: string, body: Record<string, unknown>): Promise<boolean> {
    if (busy) return false;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/station/bin/${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = (await res.json()) as Partial<Loaded>;
      if (json.signedIn && typeof json.now === "number") accept(json as Loaded);
      if (!res.ok) {
        setError(json.error ?? "うまくいきませんでした。もう一度ためしてください。");
        return false;
      }
      return true;
    } catch {
      setError("通信できませんでした。電波を確かめて、もう一度ためしてください。");
      return false;
    } finally {
      setBusy(false);
    }
  }

  if (!isLoaded) return <Frame><p className="text-slate-500">読み込んでいます…</p></Frame>;
  if (!isSignedIn) {
    return (
      <Frame>
        <div className={card}>
          <p className="font-bold text-slate-900">乗車するには、ログインが必要です。</p>
          <p className="mt-2 text-slate-600">学習便で使うアカウントでログインしてください。はじめての人は無料で登録できます（登録の画面から、ログインにも切りかえられます）。</p>
          <SmartSignUpButton redirectUrl={PATH} className={`mt-4 ${primary}`}>
            ログイン／登録する
          </SmartSignUpButton>
        </div>
      </Frame>
    );
  }
  if (!state) {
    return (
      <Frame>
        {failed ? (
          <div className={card}>
            <p className="text-rose-600">読み込めませんでした。</p>
            <button type="button" onClick={() => void load()} className={`mt-3 ${primary}`}>
              もう一度読み込む
            </button>
          </div>
        ) : (
          <p className="text-slate-500">読み込んでいます…</p>
        )}
      </Frame>
    );
  }

  const { member, current, next, ride } = state;
  const profileOk = !!member && checkProfile(member).ok;
  const alert = error ? (
    <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {error}
    </p>
  ) : null;
  const nextLine = next ? (
    <p className="text-slate-600">
      次の便：<span className="font-bold text-slate-900">{binLabel(next)}</span>（改札は{jstHm(atMin(next, BIN_MIN.gate))}に開きます）
    </p>
  ) : (
    <p className="text-slate-600">このあとの便はありません（試験運用の便はすべて終わりました）。</p>
  );

  if (!profileOk || editing) {
    return (
      <Frame>
        {alert}
        <ProfileForm
          key={member ? `${member.nick}/${member.grade}/${member.team}` : "new"}
          initial={member}
          busy={busy}
          onCancel={profileOk ? () => setEditing(false) : undefined}
          onSave={async (v) => {
            if (await post("profile", v)) setEditing(false);
          }}
        />
        {nextLine}
      </Frame>
    );
  }

  const who = (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600">
      <span>
        <span className="font-bold text-slate-900">{member.nick}</span> さん（{member.grade}・{member.team}班）
      </span>
      {!ride || ride.checkoutAt !== null ? (
        <button type="button" onClick={() => setEditing(true)} className="text-xs font-bold text-indigo-600 underline underline-offset-2">
          変更する
        </button>
      ) : null}
    </p>
  );

  // 便の時間の外
  if (!current) {
    return (
      <Frame>
        {who}
        <div className={card}>
          <p className="font-bold text-slate-900">いまは便の時間ではありません。</p>
          <div className="mt-2">{nextLine}</div>
          <p className="mt-2 text-slate-600">改札が開いたら、このページに「乗車する」のボタンが出ます。</p>
        </div>
      </Frame>
    );
  }

  const stage = stageAt(current, now);
  const head = (
    <div className="rounded-2xl bg-slate-900 p-5 text-white">
      <p className="text-xs font-bold text-indigo-200">今日の便</p>
      <p className="mt-1 text-lg font-bold">{binLabel(current)}</p>
      <p className="mt-3 text-sm text-slate-200">
        いま：<span className="font-bold text-white">{(stage.key === "koma3" || stage.key === "rest2") && isHomeroom(member.team, current) ? "班のホームルーム（20分・この部屋に残ります）" : stage.label}</span>
      </p>
      {stage.endsMs !== null && stage.key !== "after" ? (
        <p className="mt-1 text-3xl font-bold tabular-nums" aria-live="off">
          のこり {clock(stage.remainSec)}
        </p>
      ) : null}
    </div>
  );
  const notReady = state.ready ? null : <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">乗車の記録を読めませんでした。少し待っても直らないときは、見守り役に知らせてください。</p>;

  // まだ乗っていない
  if (!ride) {
    const gate = checkinGate(current, now);
    const late = lateMin(current, now);
    return (
      <Frame>
        {who}
        {head}
        {notReady}
        {alert}
        <div className={card}>
          {gate === "ok" ? (
            <>
              <p className="font-bold text-slate-900">{now < current.startMs ? "改札が開いています。" : `発車しています（${late}分たちました）。途中乗車は${jstHm(atMin(current, BIN_MIN.lastBoard))}までです。`}</p>
              <p className="mt-2 text-slate-600">Zoomの自習室に入ったら、ここで乗車を記録します。</p>
              <button type="button" disabled={busy} onClick={() => void post("checkin", {})} className={`mt-4 ${primary}`}>
                乗車する
              </button>
            </>
          ) : (
            <>
              <p className="font-bold text-slate-900">この便の途中乗車は、{jstHm(atMin(current, BIN_MIN.lastBoard))}で締め切りました。</p>
              <p className="mt-2 text-slate-600">別の便へ振り替えるときは、保護者の方から運営へ連絡してください。</p>
              <div className="mt-2">{nextLine}</div>
            </>
          )}
        </div>
      </Frame>
    );
  }

  // 下車したあと
  if (ride.checkoutAt !== null) {
    return (
      <Frame>
        {who}
        <div className={card}>
          <p className="text-lg font-bold text-slate-900">下車しました。おつかれさまでした。</p>
          <dl className="mt-3 space-y-2">
            <Row label="乗車">
              {jstHm(ride.checkinAt)}〜{jstHm(ride.checkoutAt)}
            </Row>
            <Row label="今日やること">{ride.plan || "（宣言なし）"}</Row>
            <Row label="学んだこと">{ride.explain}</Row>
            <Row label="ふり返り">{REFLECT_LABEL[ride.reflect as Reflect] ?? ""}</Row>
          </dl>
          <p className="mt-3 text-xs text-slate-500">この記録は、今日の学習量といっしょに保護者の方へ報告されます。</p>
        </div>
        {nextLine}
      </Frame>
    );
  }

  const canGetOff = checkoutGate(current, now) === "ok";

  // 乗車した。まず「今日やること」を宣言する（下車の時刻になっていたら下車を先に出す）
  if (!ride.plan && !canGetOff) {
    return (
      <Frame>
        {who}
        {head}
        {alert}
        <PlanForm busy={busy} checkinAt={ride.checkinAt} onSave={(plan) => void post("plan", { plan })} />
      </Frame>
    );
  }

  return (
    <Frame>
      {who}
      {head}
      {alert}
      <div className={card}>
        <p className="text-xs font-bold text-slate-500">今日やること（{jstHm(ride.checkinAt)}に乗車）</p>
        <p className="mt-1 text-base font-bold text-slate-900">{ride.plan || "（宣言なし）"}</p>
        {canGetOff ? null : (
          <>
            <p className="mt-3 text-slate-600">{stage.study ? "学習の時間です。アオハルラーンで進めましょう。" : "次のコマが始まったら、アオハルラーンで進めましょう。"}このページは開いたままでも、閉じてもかまいません（もどると続きから始まります）。</p>
            <Link href="/learn" target="_blank" className={`mt-4 inline-block ${primary}`}>
              アオハルラーンで学習する
            </Link>
          </>
        )}
      </div>
      {canGetOff ? (
        <CheckoutForm busy={busy} onSave={(v) => void post("checkout", v)} />
      ) : (
        <div className={card}>
          <p className="text-xs font-bold text-slate-500">この便の進行</p>
          <ol className="mt-2 space-y-1">
            {STAGES.map((s) => (
              <li key={s.key} className={`flex gap-3 rounded-lg px-2 py-1 ${s.key === stage.key ? "bg-indigo-50 font-bold text-indigo-900" : now >= atMin(current, s.to) ? "text-slate-400" : "text-slate-700"}`}>
                <span className="w-24 shrink-0 tabular-nums">
                  {jstHm(atMin(current, s.from))}〜{jstHm(atMin(current, s.to))}
                </span>
                <span>{(s.key === "koma3" || s.key === "rest2") && isHomeroom(member.team, current) ? "班のホームルーム（20分・この部屋に残ります）" : s.label}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-slate-500">{jstHm(atMin(current, BIN_MIN.getoff))}になったら、このページで「今日学んだことの説明」と「ふり返り」を入れて下車します。</p>
        </div>
      )}
    </Frame>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-2">
      <dt className="font-bold text-slate-500">{label}</dt>
      <dd className="break-words text-slate-900">{children}</dd>
    </div>
  );
}

function ProfileForm({ initial, busy, onSave, onCancel }: { initial: BinState["member"]; busy: boolean; onSave: (v: { nick: string; grade: string; team: string }) => void; onCancel?: () => void }) {
  const [nick, setNick] = useState(initial?.nick ?? "");
  const [grade, setGrade] = useState(initial && GRADES.includes(initial.grade) ? initial.grade : "");
  const [team, setTeam] = useState(initial?.team ?? "");
  const ready = nick.trim().length > 0 && !!grade && !!team;
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (ready) onSave({ nick, grade, team });
  };
  const pick = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-bold ${on ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`;
  return (
    <form onSubmit={submit} className={card}>
      <p className="font-bold text-slate-900">はじめに、ニックネーム・学年・班を設定します。</p>
      <label className="mt-4 block text-xs font-bold text-slate-500">
        ニックネーム（{LIMIT.nick}文字まで。本名や学校名は使いません）
        <input value={nick} onChange={(e) => setNick(e.target.value)} maxLength={LIMIT.nick} autoComplete="off" className={field} />
      </label>
      <fieldset className="mt-4">
        <legend className="text-xs font-bold text-slate-500">学年</legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {GRADES.map((g) => (
            <button key={g} type="button" aria-pressed={grade === g} onClick={() => setGrade(g)} className={pick(grade === g)}>
              {g}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-4">
        <legend className="text-xs font-bold text-slate-500">班（運営からお知らせした班）</legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {TEAMS.map((t) => (
            <button key={t} type="button" aria-pressed={team === t} onClick={() => setTeam(t)} className={pick(team === t)}>
              {t}班
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy || !ready} className={primary}>
          保存する
        </button>
        {onCancel ? (
          <button type="button" onClick={onCancel} className="text-sm font-bold text-slate-500 underline underline-offset-2">
            やめる
          </button>
        ) : null}
      </div>
    </form>
  );
}

function PlanForm({ busy, checkinAt, onSave }: { busy: boolean; checkinAt: number; onSave: (plan: string) => void }) {
  const [plan, setPlan] = useState("");
  const ready = [...plan.trim()].length >= LIMIT.planMin;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) onSave(plan);
      }}
      className={card}
    >
      <p className="font-bold text-slate-900">乗車しました（{jstHm(checkinAt)}）。「今日やること」を宣言しましょう。</p>
      <p className="mt-2 text-slate-600">
        「数学をやる」ではなく、「連立方程式の演習を20問」のように、<span className="font-bold">終わったかどうかが分かる形</span>で書きます。あとから変えられません。
      </p>
      <label className="mt-4 block text-xs font-bold text-slate-500">
        今日やること（{LIMIT.planMin}〜{LIMIT.planMax}文字）
        <input value={plan} onChange={(e) => setPlan(e.target.value)} maxLength={LIMIT.planMax} autoComplete="off" placeholder="例：連立方程式の演習を20問" className={field} />
      </label>
      <button type="submit" disabled={busy || !ready} className={`mt-4 ${primary}`}>
        宣言する
      </button>
    </form>
  );
}

function CheckoutForm({ busy, onSave }: { busy: boolean; onSave: (v: { explain: string; reflect: Reflect }) => void }) {
  const [explain, setExplain] = useState("");
  const [reflect, setReflect] = useState<Reflect | "">("");
  const count = [...explain.trim()].length;
  const ready = count >= LIMIT.explainMin && reflect !== "";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) onSave({ explain, reflect });
      }}
      className={card}
    >
      <p className="font-bold text-slate-900">下車の時刻です。今日学んだことを説明しましょう。</p>
      <p className="mt-2 text-slate-600">
        知らない人に1分で話すつもりで、「何が分かったか」を文章で書きます。うまく言えないときは、アオハルラーンの図解レクチャーにある
        <Link href="/learn/oshieru" target="_blank" className="font-bold text-indigo-600 underline underline-offset-2">
          「ハルに教える」
        </Link>
        で一度説明してみると、書きやすくなります。
      </p>
      <label className="mt-4 block text-xs font-bold text-slate-500">
        今日学んだことの説明（{LIMIT.explainMin}〜{LIMIT.explainMax}文字）
        <textarea value={explain} onChange={(e) => setExplain(e.target.value)} maxLength={LIMIT.explainMax} rows={5} className={field} />
      </label>
      <p className="mt-1 text-right text-xs tabular-nums text-slate-400">
        {count} / {LIMIT.explainMax}
      </p>
      <fieldset className="mt-3">
        <legend className="text-xs font-bold text-slate-500">ふり返り：「今日やること」は</legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {(Object.keys(REFLECT_LABEL) as Reflect[]).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={reflect === r}
              onClick={() => setReflect(r)}
              className={`rounded-full border px-4 py-2 text-sm font-bold ${reflect === r ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}
            >
              {REFLECT_LABEL[r]}
            </button>
          ))}
        </div>
      </fieldset>
      <button type="submit" disabled={busy || !ready} className={`mt-5 ${primary}`}>
        下車する
      </button>
    </form>
  );
}
