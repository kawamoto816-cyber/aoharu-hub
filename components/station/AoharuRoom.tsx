"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { checkCourseTask, TODAY_KEY, ymd, type TodayList } from "@/lib/station/course";
import {
  board,
  GRADES,
  MODES,
  POINT_RULE,
  REFLECT,
  SAME_UNIT_FULL,
  STREAK_KING,
  dayKey,
  gainsOf,
  isNight,
  modeOf,
  myStats,
  newCycleId,
  pointsOf,
  resetRoom,
  rows,
  takeSnap,
  titles,
  updateRoom,
  useRoom,
  weekKey,
  type Board,
  type Grade,
  type Reflect,
  type RoomState,
} from "@/lib/station/room";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { TrackedLink } from "@/components/TrackedLink";
import { findBins, jstHm, mdwLabel } from "@/lib/station/bin";
import type { LiveRoom } from "@/lib/station/room-store";
import { Ambience } from "./Ambience";
import { useLiveRoom } from "./useLiveRoom";

// アオハルーム（勉強王自習室）の画面。
// タイマー（やること宣言 → 集中 → ふり返り → 休憩）・学びポイント・週のランキング・勉強王の称号・自分の記録。
// 部屋の座席（いま集中している人）とランキングは、登録した人どうしの本物の記録（サーバー：lib/station/room-store.ts）。
// 出すのはニックネーム・学年・数字だけ。声・映像・チャット・個人あてのやりとりはない。
// タイマーと自分の記録は、登録していなくてもこの端末だけで動く。サーバーが使えないときも、この端末だけの表示で動く。
// 週のリーグ（見本の30人と競う）は、本物の人数が集まるまで外した（2026-11-23）。

const box = "rounded-[14px] border-[2px] border-[#15172B] p-4";
const btn = "rounded-[10px] border-[1.5px] border-[#15172B] px-4 py-2 text-[14px] font-black disabled:opacity-40";
const mmss = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
const hm = (iso: string) => {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export function AoharuRoom() {
  const s = useRoom();
  // 時計（サーバーで描くときは 0。ブラウザで動き出してから時刻を使う）
  const [now, setNow] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);

  // 集中の時間が終わったら、ふり返りへ。休憩が終わったら、次のサイクルを始められる状態へ
  useEffect(() => {
    if (!now) return;
    if (s.running && now >= s.running.startAt + modeOf(s.running.mode).focus * 60_000) {
      const r = s.running;
      updateRoom((v) => ({ ...v, running: null, pending: { running: r, endAt: r.startAt + modeOf(r.mode).focus * 60_000, completed: true } }));
    } else if (s.restUntil && now >= s.restUntil) {
      updateRoom((v) => ({ ...v, restUntil: null }));
    }
  }, [now, s.running, s.restUntil]);

  const date = new Date(now || 0);
  const st = myStats(s.cycles, date);
  const { live, seated, saveProfile } = useLiveRoom(s);
  // 部屋で決めたニックネームと学年を、この端末の設定にも写す
  const memberNick = live?.member?.nick;
  const memberGrade = live?.member?.grade;
  useEffect(() => {
    if (!memberNick) return;
    updateRoom((v) => (v.nick === memberNick && v.grade === memberGrade ? v : { ...v, nick: memberNick, grade: (GRADES as readonly string[]).includes(memberGrade ?? "") ? (memberGrade as Grade) : v.grade }));
  }, [memberNick, memberGrade]);
  // 自分の行はこの端末の記録から、ほかの人の行はサーバーから（サーバーが使えないときは自分だけ）
  const all = [...rows(s, st).filter((r) => r.me), ...(live?.ready ? live.rows.filter((r) => !r.me) : [])];
  return (
    <div>
      {now > 0 && isNight(date) && (
        <p role="status" className="m-0 mb-3 rounded-[12px] border-[1.5px] border-[#15172B] bg-[#1B1F3B] px-4 py-3 text-[14px] font-black leading-relaxed text-white">
          そろそろ寝よう。23時から朝5時までに始めた勉強は、ランキングと称号に数えません（記録には残ります）。よく寝ることも、勉強のうちです。
        </p>
      )}
      {now > 0 && st.todayFocusMin >= 180 && !s.running && (
        <p role="status" className="m-0 mb-3 rounded-[12px] bg-[#FFF8D6] px-4 py-2 text-[13.5px] font-bold">
          今日はもう{Math.floor(st.todayFocusMin / 60)}時間以上集中しています。立ち上がって、水を飲んで、少し体を動かしましょう。
        </p>
      )}
      <Join live={live} s={s} saveProfile={saveProfile} />
      <Status st={st} />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <Timer s={s} now={now} />
        <Seats s={s} live={live} seated={seated} />
      </div>
      <NextBin now={now} />
      <Ranking all={all} grade={s.grade} />
      <Titles all={all} />
      <History s={s} now={now} />
      {/* 保護者への週の報告（見本）は外した（2026-11-23 代表）。保護者への報告は「学習便」だけのものにして、無料の部屋との線引きをはっきりさせる */}
      <Rules s={s} seated={seated} saveProfile={saveProfile} />
    </div>
  );
}

function Status({ st }: { st: ReturnType<typeof myStats> }) {
  const items = [
    { label: "今日の学びポイント", value: st.today },
    { label: "今週の学びポイント", value: st.week },
    { label: "続けている日数", value: `${st.streak}日` },
    { label: "今週の集中時間（参考）", value: `${Math.floor(st.weekFocusMin / 60)}時間${st.weekFocusMin % 60}分` },
  ];
  return (
    <dl className="m-0 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((x) => (
        <div key={x.label} className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 py-2">
          <dt className="text-[11.5px] font-bold text-[#5A5D73]">{x.label}</dt>
          <dd className="m-0 text-[22px] font-black tabular-nums">{x.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// ---------- タイマー ----------

function Timer({ s, now }: { s: RoomState; now: number }) {
  if (s.running) return <Focus s={s} now={now} />;
  if (s.pending) return <Look s={s} />;
  if (s.restUntil) return <Rest s={s} now={now} />;
  return <Setup s={s} />;
}

function Setup({ s }: { s: RoomState }) {
  const [plan, setPlan] = useState("");
  const ok = plan.trim().length >= 4;
  return (
    <section aria-labelledby="room-timer" className={`${box} bg-white`}>
      <h2 id="room-timer" className="m-0 text-[18px] font-black">
        集中タイマー
      </h2>
      <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">始める前に「この時間でやること」を決めます。終わったら、できたかを自分でふり返ります。</p>
      <div role="radiogroup" aria-label="時間" className="mt-3 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.mode}
            type="button"
            role="radio"
            aria-checked={s.mode === m.mode}
            onClick={() => updateRoom((v) => ({ ...v, mode: m.mode }))}
            className={`${btn} ${s.mode === m.mode ? "bg-[#1533B8] text-white" : "bg-white"}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <label className="mt-3 block text-[13px] font-bold">
        この{s.mode}分でやること
        <input
          className="mt-0.5 w-full rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-2 text-[15px]"
          value={plan}
          maxLength={60}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="例：二次関数の単元模試を1回解いて、まちがいを直す"
        />
      </label>
      <button
        type="button"
        disabled={!ok}
        onClick={() => updateRoom((v) => ({ ...v, running: { startAt: Date.now(), mode: v.mode, plan: plan.trim(), snap: takeSnap() } }))}
        className={`${btn} mt-3 min-h-[52px] w-full bg-[#FFE45C] text-[17px]`}
      >
        集中をはじめる
      </button>
      <FromCourse onPick={setPlan} />
      {!ok && <p className="m-0 mt-1 text-[12px] text-[#5A5D73]">やることを4字以上書くと始められます</p>}
      <div className="mt-3">
        <Ambience />
      </div>
      <p className="m-0 mt-3 text-[12.5px] leading-relaxed text-[#5A5D73]">
        はじめたら、この部屋は開いたままにして、別のタブで
        <Link href="/learn" target="_blank" className="font-bold text-[#1533B8]">
          自習ホーム
        </Link>
        の問題や模試を解きます。解いた・正解した・単元模試を終えた、がポイントになります。座っているだけでは増えません。
      </p>
    </section>
  );
}

function Focus({ s, now }: { s: RoomState; now: number }) {
  const r = s.running!;
  const m = modeOf(r.mode);
  const left = r.startAt + m.focus * 60_000 - (now || r.startAt);
  const g = now ? gainsOf(r.snap, takeSnap()) : null;
  const pts = g ? pointsOf(g, false) : 0;
  return (
    <section aria-labelledby="room-timer" className={`${box} bg-[#15172B] text-white`}>
      <h2 id="room-timer" className="m-0 text-[14px] font-black text-[#FFE45C]">
        集中しています（{m.label}）
      </h2>
      <p className="m-0 mt-1 text-[56px] font-black leading-none tabular-nums" aria-live="off">
        {mmss(left)}
      </p>
      <p className="m-0 mt-2 text-[14px] font-bold">やること：{r.plan}</p>
      <dl className="m-0 mt-3 grid grid-cols-4 gap-2 text-center">
        {[
          ["解いた", g?.solved ?? 0],
          ["正解", g?.correct ?? 0],
          ["単元模試", g?.units ?? 0],
          ["ポイント", pts],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[10px] bg-white/10 px-1 py-1.5">
            <dt className="text-[11px] font-bold text-white/70">{k}</dt>
            <dd className="m-0 text-[20px] font-black tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Link href="/learn" target="_blank" className={`${btn} bg-[#FFE45C] text-[#15172B] no-underline`}>
          自習ホームを別のタブで開く ↗
        </Link>
        <button
          type="button"
          onClick={() => updateRoom((v) => ({ ...v, running: null, pending: { running: r, endAt: Date.now(), completed: false } }))}
          className={`${btn} border-white bg-transparent text-white`}
        >
          ここで終える
        </button>
      </div>
      <div className="mt-3">
        <Ambience dark />
      </div>
      <p className="m-0 mt-2 text-[12px] leading-relaxed text-white/70">最後まで走りきって、1問でも解いていれば、完走ボーナス {POINT_RULE.cycle} ポイント。</p>
    </section>
  );
}

function Look({ s }: { s: RoomState }) {
  const p = s.pending!;
  const [reflect, setReflect] = useState<Reflect | null>(null);
  const [note, setNote] = useState("");
  const g = gainsOf(p.running.snap, takeSnap());
  const night = isNight(new Date(p.running.startAt));
  const pts = pointsOf(g, p.completed);
  return (
    <section aria-labelledby="room-timer" className={`${box} bg-white`}>
      <h2 id="room-timer" className="m-0 text-[18px] font-black">
        {p.completed ? "おつかれさま。ふり返りましょう" : "途中で終えました。ふり返りましょう"}
      </h2>
      <p className="m-0 mt-1 text-[14px]">
        やること：<b>{p.running.plan}</b>
      </p>
      <div role="radiogroup" aria-label="できたか" className="mt-3 flex flex-wrap gap-2">
        {REFLECT.map((x) => (
          <button key={x} type="button" role="radio" aria-checked={reflect === x} onClick={() => setReflect(x)} className={`${btn} ${reflect === x ? "bg-[#1533B8] text-white" : "bg-white"}`}>
            {x}
          </button>
        ))}
      </div>
      <label className="mt-3 block text-[13px] font-bold">
        ひとこと（つぎにやること・わかったこと。なくてもよい）
        <input className="mt-0.5 w-full rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-2 text-[14px]" value={note} maxLength={60} onChange={(e) => setNote(e.target.value)} />
      </label>
      <p className="m-0 mt-3 rounded-[10px] bg-[#F7F6F1] px-3 py-2 text-[13.5px] leading-relaxed">
        解いた {g.solved}問・正解 {g.correct}問・単元模試 {g.units}つ{p.completed && g.solved > 0 ? "・完走" : ""} → <b className="text-[16px]">{pts} ポイント</b>
        {g.solved === 0 && <span className="mt-0.5 block text-[12px] text-[#5A5D73]">このサイクルでは問題を解いた記録がありませんでした。次は自習ホームで1問から。</span>}
        {night && <span className="mt-0.5 block text-[12px] font-bold text-[#B42318]">23時〜5時に始めたので、ランキングには数えません。</span>}
      </p>
      <button
        type="button"
        disabled={!reflect}
        onClick={() => {
          const r = p.running;
          const rest = modeOf(r.mode).rest;
          // 直前コースの今日のやることを「できた」なら、コースの計画にもチェックを入れる
          if (reflect === "できた") checkCourseTask(r.plan);
          updateRoom((v) => ({
            ...v,
            pending: null,
            restUntil: Date.now() + rest * 60_000,
            cycles: [
              { id: newCycleId(), at: new Date(r.startAt).toISOString(), mode: r.mode, plan: r.plan, focusSec: Math.round((p.endAt - r.startAt) / 1000), completed: p.completed, reflect: reflect!, note: note.trim(), gains: { solved: g.solved, correct: g.correct, units: g.units, mathCorrect: g.mathCorrect }, points: pts, night },
              ...v.cycles,
            ].slice(0, 500),
          }));
        }}
        className={`${btn} mt-3 w-full bg-[#FFE45C]`}
      >
        記録して休憩へ
      </button>
    </section>
  );
}

function Rest({ s, now }: { s: RoomState; now: number }) {
  return (
    <section aria-labelledby="room-timer" className={`${box} bg-[#E9F7EF]`}>
      <h2 id="room-timer" className="m-0 text-[14px] font-black text-[#11643A]">
        休憩
      </h2>
      <p className="m-0 mt-1 text-[44px] font-black leading-none tabular-nums">{now ? mmss(s.restUntil! - now) : "--:--"}</p>
      <p className="m-0 mt-2 text-[13.5px] leading-relaxed">画面から目を離して、肩を回す・首をのばす・遠くを見る。水を一口。</p>
      <button type="button" onClick={() => updateRoom((v) => ({ ...v, restUntil: null }))} className={`${btn} mt-3 bg-white`}>
        休憩を終えて、次のサイクルへ
      </button>
    </section>
  );
}

// ---------- 部屋の座席（いま集中している人） ----------

function Seats({ s, live, seated }: { s: RoomState; live: LiveRoom | null; seated: boolean }) {
  // 自分はこの端末の状態で出す（すぐ光るように）。ほかの人はサーバーから
  const others = live?.ready ? live.present.filter((p) => !p.me) : [];
  const meOn = !!s.running;
  const seats = [{ nick: s.nick, here: meOn ? `集中中 ${s.running!.mode}分` : undefined, me: true }, ...others.slice(0, 23).map((p) => ({ nick: p.nick, here: `集中中 ${p.mode}分`, me: false }))];
  const on = others.length + (meOn ? 1 : 0);
  return (
    <section aria-labelledby="room-seats" className={`${box} bg-[#22264A] text-white`}>
      <h2 id="room-seats" className="m-0 flex items-baseline gap-2 text-[16px] font-black">
        いまの部屋
        <span className="text-[12px] font-bold text-white/70">{live?.ready ? `いま ${on} 人が集中しています` : "部屋の様子を読み込んでいます…"}</span>
      </h2>
      <ul className="m-0 mt-3 grid list-none grid-cols-4 gap-2 p-0">
        {seats.map((x, i) => (
          <li
            key={`${x.nick}-${i}`}
            className={`flex min-h-[64px] flex-col items-center justify-center rounded-[10px] border px-1 text-center ${x.here ? "border-[#FFE45C] bg-[#FFE45C]/15" : "border-white/15 bg-white/5 text-white/40"}`}
          >
            <span aria-hidden="true" className={`mb-1 h-2.5 w-8 rounded-full ${x.here ? "bg-[#FFE45C] shadow-[0_0_10px_#FFE45C]" : "bg-white/15"}`} />
            <span className="text-[11.5px] font-black leading-tight">
              {x.nick}
              {x.me && x.nick !== "あなた" ? "（あなた）" : ""}
            </span>
            <span className="text-[10.5px] text-white/70">{x.here ?? "休けい中"}</span>
          </li>
        ))}
      </ul>
      {others.length > 23 && <p className="m-0 mt-2 text-[11.5px] text-white/70">ほか {others.length - 23} 人</p>}
      {live?.ready && others.length === 0 && (
        <p className="m-0 mt-2 text-[12px] leading-relaxed text-white/80">{meOn ? "いまは、あなたが最初の1人です。" : "いまは、だれも集中していません。最初の1人になりましょう。"}</p>
      )}
      <p className="m-0 mt-2 text-[11.5px] leading-relaxed text-white/60">
        話さないつながりの部屋です。ほかの人に見えるのは、ニックネームと「集中中」の表示、ポイントなどの数字だけ。声・映像・チャットはありません。
        {!seated && "あなたの席がほかの人に見えるのは、登録してニックネームを決めてからです。"}
      </p>
    </section>
  );
}

// ---------- ランキング ----------

const BOARDS: { id: Board; label: string }[] = [
  { id: "week", label: "今週" },
  { id: "today", label: "今日" },
  { id: "grade", label: "同じ学年（今週）" },
];

function Ranking({ all, grade }: { all: ReturnType<typeof rows>; grade: Grade }) {
  const [kind, setKind] = useState<Board>("week");
  const list = board(all, kind, grade);
  const myIdx = list.findIndex((r) => r.me);
  const shown = list.slice(0, 10);
  const key = kind === "today" ? "today" : "week";
  return (
    <section aria-labelledby="room-rank" className={`${box} mt-4 bg-white`}>
      <div className="flex flex-wrap items-center gap-2">
        <h2 id="room-rank" className="m-0 text-[18px] font-black">
          学びポイントのランキング
        </h2>
        <div role="tablist" aria-label="ランキングの種類" className="ml-auto flex flex-wrap gap-1">
          {BOARDS.map((b) => (
            <button key={b.id} type="button" role="tab" aria-selected={kind === b.id} onClick={() => setKind(b.id)} className={`rounded-full border-[1.5px] border-[#15172B] px-3 py-1 text-[12.5px] font-black ${kind === b.id ? "bg-[#15172B] text-white" : "bg-white"}`}>
              {b.id === "grade" ? `${grade}（今週）` : b.label}
            </button>
          ))}
        </div>
      </div>
      <p className="m-0 mt-1 text-[12px] text-[#5A5D73]">競うのは学びポイント（解いた・正解・単元模試・完走）。集中時間は参考に並べるだけです。毎週月曜にリセット。</p>
      <ol className="m-0 mt-3 grid list-none gap-1 p-0">
        {shown.map((r, i) => (
          <RankRow key={r.nick + (r.me ? "-me" : "")} r={r} no={i + 1} value={r[key]} />
        ))}
        {myIdx >= 10 && (
          <>
            <li aria-hidden="true" className="text-center text-[#5A5D73]">
              ⋮
            </li>
            <RankRow r={list[myIdx]} no={myIdx + 1} value={list[myIdx][key]} />
          </>
        )}
      </ol>
    </section>
  );
}

function RankRow({ r, no, value }: { r: ReturnType<typeof rows>[number]; no: number; value: number }) {
  return (
    <li className={`flex items-center gap-2 rounded-[10px] px-3 py-1.5 text-[14px] ${r.me ? "border-[1.5px] border-[#1533B8] bg-[#E6EAFB] font-black" : "bg-[#F7F6F1]"}`}>
      <span className={`w-7 text-center font-black tabular-nums ${no <= 3 ? "text-[#B07D00]" : ""}`}>{no}</span>
      <span className="min-w-0 flex-1 truncate font-bold">
        {r.nick}
        {r.me && r.nick !== "あなた" ? "（あなた）" : ""}
      </span>
      <span className="text-[11.5px] text-[#5A5D73]">{r.grade}</span>
      <span className="hidden w-[84px] text-right text-[11.5px] text-[#5A5D73] sm:inline">{Math.round(r.focusMin / 60)}時間（参考）</span>
      <span className="w-[64px] text-right font-black tabular-nums">{value}</span>
    </li>
  );
}

// ---------- 勉強王の称号 ----------

function Titles({ all }: { all: ReturnType<typeof rows> }) {
  const ts = titles(all);
  return (
    <section aria-labelledby="room-kings" className="mt-4">
      <h2 id="room-kings" className="m-0 text-[18px] font-black">
        今週の王
      </h2>
      <p className="m-0 mt-1 text-[12.5px] text-[#5A5D73]">だれにでも王になる道があるように、称号をいくつも用意しています。王になった人には、ラーニングサークルの体験（1回）を渡す予定です。</p>
      <ul className="m-0 mt-2 grid list-none gap-2 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {ts.map((t) => (
          <li key={t.id} className={`rounded-[14px] border-[2px] p-3 ${t.holder?.me ? "border-[#B07D00] bg-[#FFF3C4]" : "border-[#15172B] bg-white"}`}>
            <p className="m-0 flex items-center gap-1.5 text-[16px] font-black">
              <Crown /> {t.name}
            </p>
            <p className="m-0 mt-0.5 text-[11.5px] leading-snug text-[#5A5D73]">{t.how}</p>
            <p className="m-0 mt-2 text-[14px] font-black">{t.holder ? t.holder.me ? "あなた" : `${t.holder.nick}さん` : "まだいません"}</p>
            <p className="m-0 mt-0.5 text-[12px] font-bold text-[#1533B8]">{t.mine}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Crown() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
      <path d="M1 4l4 3 4-6 4 6 4-3-2 9H3z" fill="#FFC928" stroke="#7A5300" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

// ---------- 自分の記録 ----------

function History({ s, now }: { s: RoomState; now: number }) {
  const wk = now ? weekKey(new Date(now)) : "";
  const list = s.cycles.filter((c) => weekKey(new Date(c.at)) === wk).slice(0, 20);
  const byDay = new Map<string, number>();
  for (const c of list) byDay.set(dayKey(new Date(c.at)), (byDay.get(dayKey(new Date(c.at))) ?? 0) + 1);
  return (
    <section aria-labelledby="room-log" className={`${box} mt-4 bg-white`}>
      <h2 id="room-log" className="m-0 text-[18px] font-black">
        今週のわたしの記録
      </h2>
      {list.length === 0 ? (
        <p className="m-0 mt-2 text-[13.5px] text-[#5A5D73]">まだありません。最初の{s.mode}分をはじめましょう。</p>
      ) : (
        <ul className="m-0 mt-2 grid list-none gap-1.5 p-0">
          {list.map((c) => (
            <li key={c.id} className="rounded-[10px] bg-[#F7F6F1] px-3 py-2 text-[13px] leading-relaxed">
              <span className="font-bold tabular-nums text-[#5A5D73]">{hm(c.at)}</span>
              <span className="ml-2 font-black">{c.plan}</span>
              <span className="mt-0.5 block text-[12.5px]">
                {c.mode}分{c.completed ? "・完走" : "・途中まで"}・{c.reflect}・解いた{c.gains.solved}・正解{c.gains.correct}
                {c.gains.units ? `・単元模試${c.gains.units}` : ""} → <b>{c.points}ポイント</b>
                {c.night && <span className="ml-1 font-bold text-[#B42318]">（夜なので数えない）</span>}
                {c.note && <span className="block text-[#3A3D55]">ひとこと：{c.note}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// ---------- 決まり・設定 ----------

function Rules({ s, seated, saveProfile }: { s: RoomState; seated: boolean; saveProfile: (nick: string, grade: string) => Promise<string | null> }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <section aria-labelledby="room-rules" className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 text-[13px] leading-relaxed">
        <h2 id="room-rules" className="m-0 text-[15px] font-black">
          学びポイントの決まり
        </h2>
        <ul className="m-0 mt-1 pl-5">
          <li>集中している間に解いた問題 1問 {POINT_RULE.solved}、正解すると +{POINT_RULE.correct}</li>
          <li>単元模試を1回終える +{POINT_RULE.unit}</li>
          <li>最後まで走りきり、1問でも解いたサイクル +{POINT_RULE.cycle}</li>
          <li>同じ単元を1サイクルで{SAME_UNIT_FULL}問より多く解いた分は半分</li>
          <li>23時〜朝5時に始めたサイクルは、ランキング・称号に数えない</li>
          <li>継続王は{STREAK_KING}日続けた人。何人でもなれます</li>
        </ul>
        <p className="m-0 mt-1 text-[12px] text-[#5A5D73]">ポイントは、集中しているあいだにこの端末で解いた記録から数えます。登録してニックネームを決めると、ランキングに名前が出ます。</p>
      </div>
      <div className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 text-[13px]">
        <h2 className="m-0 text-[15px] font-black">わたしの設定</h2>
        <label className="mt-2 block font-bold">
          ニックネーム（本名・学校名は書かない）
          <input className="mt-0.5 w-full rounded-[8px] border-[1.5px] border-[#15172B] px-2 py-1.5 text-[14px]" value={s.nick} maxLength={12} onChange={(e) => updateRoom((v) => ({ ...v, nick: e.target.value || "あなた" }))} />
        </label>
        <label className="mt-2 block font-bold">
          学年
          <select className="mt-0.5 block rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1.5 text-[14px]" value={s.grade} onChange={(e) => updateRoom((v) => ({ ...v, grade: e.target.value as Grade }))}>
            {GRADES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        {seated && (
          <div className="mt-2">
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                const e = await saveProfile(s.nick, s.grade);
                setMsg(e ?? "部屋での名前と学年を変えました。");
                setBusy(false);
              }}
              className="rounded-[8px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1.5 text-[13px] font-black disabled:opacity-40"
            >
              {busy ? "保存しています…" : "この名前と学年を、部屋に反映する"}
            </button>
            {msg && (
              <p role="status" className="m-0 mt-1 text-[12px] font-bold text-[#1533B8]">
                {msg}
              </p>
            )}
          </div>
        )}
        <p className="m-0 mt-2 text-[12px] text-[#5A5D73]">音（カフェ・雨・図書館）は、権利のきれいな音源を用意してから足します。</p>
        <button type="button" onClick={() => resetRoom()} className="mt-2 text-[12px] font-bold text-[#B42318] underline">
          この端末にある部屋の記録を消す
        </button>
      </div>
    </section>
  );
}

// ---------- 登録とニックネーム ----------

function Join({ live, s, saveProfile }: { live: LiveRoom | null; s: RoomState; saveProfile: (nick: string, grade: string) => Promise<string | null> }) {
  const [nick, setNick] = useState("");
  const [grade, setGrade] = useState<string>(s.grade);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!live?.ready) return null;
  if (live.member) return null;
  const wrap = "mb-3 rounded-[14px] border-[2px] border-[#15172B] bg-[#EEF1FF] p-4";
  if (!live.signedIn) {
    return (
      <section aria-label="部屋に座るには" className={wrap}>
        <p className="m-0 text-[15px] font-black">無料登録すると、部屋の席に座れます</p>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          登録してニックネームを決めると、集中しているあいだ席が光り、ランキングに名前が出ます。登録しなくても、タイマーと自分の記録はこの端末だけで使えます。
        </p>
        <SmartSignUpButton analyticsLocation="aoharoom_join" redirectUrl="/station/room" className={`${btn} mt-2 bg-[#1533B8] text-white`}>
          無料登録してはじめる
        </SmartSignUpButton>
      </section>
    );
  }
  return (
    <section aria-label="ニックネームを決める" className={wrap}>
      <p className="m-0 text-[15px] font-black">部屋で使うニックネームを決めてください</p>
      <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">ほかの人に見える名前です。本名・学校名・連絡先は書かないでください。</p>
      <div className="mt-2 flex flex-wrap items-end gap-2">
        <label className="block text-[12.5px] font-bold">
          ニックネーム（12字まで）
          <input className="mt-0.5 block w-[200px] rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-2 text-[15px]" value={nick} maxLength={12} onChange={(e) => setNick(e.target.value)} />
        </label>
        <label className="block text-[12.5px] font-bold">
          学年
          <select className="mt-0.5 block rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-2 text-[15px]" value={grade} onChange={(e) => setGrade(e.target.value)}>
            {GRADES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          disabled={busy || nick.trim().length < 1}
          onClick={async () => {
            setBusy(true);
            setError(await saveProfile(nick, grade));
            setBusy(false);
          }}
          className={`${btn} bg-[#FFE45C]`}
        >
          {busy ? "保存しています…" : "この名前で座る"}
        </button>
      </div>
      {error && (
        <p role="alert" className="m-0 mt-2 text-[12.5px] font-bold text-[#B42318]">
          {error}
        </p>
      )}
    </section>
  );
}

// ---------- 次の学習便のお知らせ ----------

function NextBin({ now }: { now: number }) {
  if (!now) return null;
  const { current, next } = findBins(now);
  const bin = current ?? next;
  if (!bin) return null;
  return (
    <section aria-label="次の学習便" className="mt-4 rounded-[14px] bg-[#15172B] p-4 text-white">
      <p className="m-0 text-[12px] font-black text-[#FFE45C]">ひとりだと続かない人へ</p>
      <p className="m-0 text-[17px] font-black">
        {current ? "いま、学習便が走っています" : `次の学習便：${mdwLabel(bin.date)} ${bin.name} ${jstHm(bin.startMs)}発`}
      </p>
      <p className="m-0 mt-1 text-[13px] leading-relaxed text-white/75">
        時刻を決めて集まり、見守り役のもとで90分。出席と学習量は、その日のうちに保護者の方へ届きます。お申し込みは保護者の方からです。
        <TrackedLink href="/station" event="bin_link_click" params={{ location: "room" }} className="ml-1 font-black text-[#FFE45C]">
          学習便のご案内 →
        </TrackedLink>
      </p>
    </section>
  );
}

// ---------- 直前コースの「今日のやること」から選ぶ ----------

const sub = (l: () => void) => {
  window.addEventListener("storage", l);
  window.addEventListener("focus", l);
  return () => {
    window.removeEventListener("storage", l);
    window.removeEventListener("focus", l);
  };
};
const readToday = () => {
  try {
    return window.localStorage.getItem(TODAY_KEY) ?? "";
  } catch {
    return "";
  }
};

function FromCourse({ onPick }: { onPick: (s: string) => void }) {
  const raw = useSyncExternalStore(sub, readToday, () => "");
  let v: TodayList | null = null;
  try {
    v = raw ? (JSON.parse(raw) as TodayList) : null;
  } catch {
    v = null;
  }
  if (!v || v.date !== ymd(new Date()) || !v.items.length) {
    return (
      <p className="m-0 mt-2 text-[12px] text-[#5A5D73]">
        <Link href="/station/course/kyotsu" className="font-bold text-[#1533B8]">
          直前コース
        </Link>
        （共通テスト・大学入試・高校入試）で計画を作ると、今日のやることをここから選べます。
      </p>
    );
  }
  return (
    <div className="mt-2 rounded-[10px] bg-[#F3F5FF] p-2.5">
      <p className="m-0 text-[12px] font-black text-[#1533B8]">
        直前コース（{v.univ}）{v.week}週目{v.day}日目の、今日のやること
        <Link href={v.href && v.href.startsWith("/station/course") ? v.href : "/station/course"} className="ml-2 font-bold">
          コースを見る →
        </Link>
      </p>
      <ul className="m-0 mt-1 grid list-none gap-1 p-0">
        {v.items.map((x) => (
          <li key={x}>
            <button type="button" onClick={() => onPick(x.slice(0, 60))} className="w-full rounded-[8px] border border-[#15172B] bg-white px-2 py-1 text-left text-[12.5px] leading-snug">
              {x}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
