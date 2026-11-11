"use client";

import { useMemo, useState } from "react";

// 教室プランの先生用管理画面（試作）。見本の生徒と記録をその場で作って見せる。保存も通信もしない。
// タブ：進み具合（生徒×単元）／つまずき単元／課題／月次レポート。本番は classrooms・classroom_members・learn_events・assignments から読む。

export interface DemoUnit {
  id: string;
  name: string;
  mistakes: { wrong: string; right: string }[];
}

interface Cell {
  read: boolean;
  heard: boolean;
  /** 模試の最高点（%）。まだなら null */
  best: number | null;
  /** 先月の最高点（%） */
  prev: number | null;
}

const STUDENTS = ["そら", "みなと", "ひかり", "ゆず", "かい", "つむぎ", "れん", "あおい"];
const CODE = "AOHR-7K2Q";
const PASS = 70;

/** 決まった種から作る見本の記録（表示のたびに同じになる） */
function seeded(seed: number) {
  let x = seed;
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x / 2147483648;
  };
}

function makeCells(units: DemoUnit[]): Cell[][] {
  const r = seeded(42);
  return STUDENTS.map((_, si) =>
    units.map((_, ui) => {
      const reach = ui <= 2 + Math.floor(r() * 5) - (si % 3 === 2 ? 2 : 0);
      if (!reach) return { read: false, heard: false, best: null, prev: null };
      const hard = ui === 2 || ui === 4 ? 25 : 0;
      const best = Math.max(20, Math.min(100, Math.round(55 + r() * 45 - hard - (si === 6 ? 15 : 0))));
      const prev = r() < 0.7 ? Math.max(10, best - Math.round(r() * 25)) : null;
      return { read: true, heard: r() < 0.75, best: r() < 0.85 ? best : null, prev };
    }),
  );
}

const tone = (c: Cell) =>
  c.best === null ? (c.read ? "bg-[#EEF2FC]" : "bg-white") : c.best >= 80 ? "bg-[#1533B8] text-white" : c.best >= 60 ? "bg-[#8FA2EC]" : "bg-[#FFE45C]";

const TABS = ["進み具合", "つまずき単元", "課題", "月次レポート"] as const;
type Tab = (typeof TABS)[number];

export function TeacherDemo({ units }: { units: DemoUnit[] }) {
  const [tab, setTab] = useState<Tab>("進み具合");
  const cells = useMemo(() => makeCells(units), [units]);
  return (
    <div>
      <section className="mb-4 flex flex-wrap items-center gap-3 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-4 py-3">
        <div className="min-w-[180px] flex-1">
          <p className="m-0 text-[11px] font-bold text-[#5A5D73]">教室</p>
          <p className="m-0 text-[17px] font-black">見本の教室（中1 数学）</p>
          <p className="m-0 text-[12px] text-[#3A3D55]">生徒 {STUDENTS.length}/30人・先生 1/3人・無料期間 あと74日</p>
        </div>
        <div className="rounded-[10px] bg-[#FFFBE6] px-3 py-2 text-center">
          <p className="m-0 text-[11px] font-bold text-[#5A5D73]">招待コード</p>
          <p className="m-0 font-mono text-[18px] font-black tracking-widest">{CODE}</p>
        </div>
      </section>

      <div role="tablist" className="mb-3 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`min-h-[40px] rounded-full border-[1.5px] border-[#15172B] px-4 text-[14px] font-black ${tab === t ? "bg-[#15172B] text-white" : "bg-white text-[#15172B]"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "進み具合" && <Progress units={units} cells={cells} />}
      {tab === "つまずき単元" && <Stuck units={units} cells={cells} />}
      {tab === "課題" && <Assign units={units} cells={cells} />}
      {tab === "月次レポート" && <Report units={units} cells={cells} />}
    </div>
  );
}

function Progress({ units, cells }: { units: DemoUnit[]; cells: Cell[][] }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-[12px] border-[1.5px] border-[#15172B] bg-white">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white px-2 py-2 text-left">生徒</th>
              {units.map((u) => (
                <th key={u.id} className="min-w-[76px] px-1 py-2 text-left align-bottom font-black leading-tight">
                  {u.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((s, si) => (
              <tr key={s} className="border-t border-[#E3E6F0]">
                <td className="sticky left-0 bg-white px-2 py-1.5 font-bold">{s}</td>
                {cells[si].map((c, ui) => (
                  <td key={ui} className="p-1">
                    <div className={`flex h-9 items-center justify-center gap-1 rounded-[6px] ${tone(c)}`} title={c.best === null ? "" : `模試 最高${c.best}%`}>
                      {c.best !== null ? <b>{c.best}</b> : c.read ? <span>読</span> : <span className="text-[#C3C7D6]">—</span>}
                      {c.heard && <span aria-label="授業を聞いた">♪</span>}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="m-0 mt-2 text-[12px] leading-relaxed text-[#5A5D73]">
        数字＝模試の最高点（%）。濃い青 80以上・うすい青 60〜79・黄 60未満。「読」＝教科書を読んだ、♪＝止まる授業を聞いた。
      </p>
    </div>
  );
}

function stuckList(units: DemoUnit[], cells: Cell[][]) {
  return units
    .map((u, ui) => {
      const low = STUDENTS.filter((_, si) => {
        const b = cells[si][ui].best;
        return b !== null && b < 60;
      });
      const taken = cells.filter((row) => row[ui].best !== null);
      const avg = taken.length ? Math.round(taken.reduce((a, row) => a + (row[ui].best ?? 0), 0) / taken.length) : null;
      return { u, low, avg };
    })
    .filter((x) => x.low.length)
    .sort((a, b) => b.low.length - a.low.length);
}

function Stuck({ units, cells }: { units: DemoUnit[]; cells: Cell[][] }) {
  const list = stuckList(units, cells);
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      {list.map(({ u, low, avg }) => (
        <li key={u.id} className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-4 py-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="m-0 text-[16px] font-black">{u.name}</p>
            <p className="m-0 text-[12px] text-[#3A3D55]">
              60%未満 <b className="text-[15px]">{low.length}人</b>・教室の平均 {avg ?? "—"}%
            </p>
          </div>
          <p className="m-0 mt-1 text-[13px]">止まっている生徒：{low.join("、")}</p>
          {u.mistakes.length > 0 && (
            <div className="mt-2 rounded-[8px] bg-[#FFFBE6] px-3 py-2 text-[12px] leading-relaxed">
              <p className="m-0 font-bold">この単元のよくあるまちがい（教科書のデータ）</p>
              {u.mistakes.map((m, i) => (
                <p key={i} className="m-0">
                  ✕ {m.wrong} → ○ {m.right}
                </p>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

interface Task {
  unit: string;
  kind: "教科書" | "止まる授業" | "模試";
  due: string;
}

function Assign({ units, cells }: { units: DemoUnit[]; cells: Cell[][] }) {
  const [tasks, setTasks] = useState<Task[]>([{ unit: units[2]?.id ?? "", kind: "模試", due: "2026-11-20" }]);
  const [unit, setUnit] = useState(units[0]?.id ?? "");
  const [kind, setKind] = useState<Task["kind"]>("止まる授業");
  const [due, setDue] = useState("2026-11-27");
  const name = (id: string) => units.find((u) => u.id === id)?.name ?? id;
  const done = (t: Task) => {
    const ui = units.findIndex((u) => u.id === t.unit);
    return STUDENTS.filter((_, si) => {
      const c = cells[si][ui];
      if (!c) return false;
      return t.kind === "模試" ? (c.best ?? 0) >= PASS : t.kind === "止まる授業" ? c.heard : c.read;
    }).length;
  };
  return (
    <div className="grid gap-3">
      <form
        className="flex flex-wrap items-end gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-4 py-3 text-[13px]"
        onSubmit={(e) => {
          e.preventDefault();
          setTasks((ts) => [...ts, { unit, kind, due }]);
        }}
      >
        <label className="grid gap-1">
          単元
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="min-h-[38px] rounded-[8px] border border-[#15172B] px-2">
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          種類
          <select value={kind} onChange={(e) => setKind(e.target.value as Task["kind"])} className="min-h-[38px] rounded-[8px] border border-[#15172B] px-2">
            <option>教科書</option>
            <option>止まる授業</option>
            <option>模試</option>
          </select>
        </label>
        <label className="grid gap-1">
          期限
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="min-h-[38px] rounded-[8px] border border-[#15172B] px-2" />
        </label>
        <button className="min-h-[38px] rounded-full bg-[#1533B8] px-4 font-black text-white">配る（見本）</button>
      </form>
      <ul className="m-0 grid list-none gap-1.5 p-0">
        {tasks.map((t, i) => (
          <li key={i} className="flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-[#15172B] bg-white px-3 py-2 text-[13px]">
            <span>
              <b>{name(t.unit)}</b>（{t.kind}
              {t.kind === "模試" ? `・${PASS}%で提出` : ""}）期限 {t.due}
            </span>
            <span className="font-black">
              提出 {done(t)}/{STUDENTS.length}人
            </span>
          </li>
        ))}
      </ul>
      <p className="m-0 text-[12px] text-[#5A5D73]">配った課題は、生徒の学習トップに「先生からの課題」として出ます（本番）。</p>
    </div>
  );
}

function Report({ units, cells }: { units: DemoUnit[]; cells: Cell[][] }) {
  const rows = STUDENTS.map((s, si) => {
    const row = cells[si];
    const learned = row.filter((c) => c.read || c.best !== null).length;
    const pairs = row.filter((c) => c.best !== null && c.prev !== null);
    const gain = pairs.length ? Math.round(pairs.reduce((a, c) => a + ((c.best ?? 0) - (c.prev ?? 0)), 0) / pairs.length) : null;
    const days = 4 + ((si * 7) % 13);
    return { s, learned, gain, days };
  });
  const avgDays = Math.round(rows.reduce((a, r) => a + r.days, 0) / rows.length);
  const gains = rows.flatMap((r) => (r.gain === null ? [] : [r.gain]));
  const avgGain = gains.length ? Math.round(gains.reduce((a, b) => a + b, 0) / gains.length) : 0;
  return (
    <div className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-5 py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="m-0 text-[17px] font-black">2026年10月の学習報告（見本の教室）</p>
        <button onClick={() => window.print()} className="min-h-[36px] rounded-full border-[1.5px] border-[#15172B] px-4 text-[13px] font-black">
          印刷・PDF
        </button>
      </div>
      <div className="my-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["平均の利用日数", `${avgDays}日`],
          ["学んだ単元（のべ）", `${rows.reduce((a, r) => a + r.learned, 0)}`],
          ["模試の正答率の伸び", `${avgGain >= 0 ? "+" : ""}${avgGain}ポイント`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[10px] bg-[#EEF2FC] px-2 py-2">
            <p className="m-0 text-[11px] font-bold text-[#5A5D73]">{k}</p>
            <p className="m-0 text-[20px] font-black">{v}</p>
          </div>
        ))}
      </div>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b-[1.5px] border-[#15172B] text-left">
            <th className="py-1">生徒</th>
            <th>利用日数</th>
            <th>学んだ単元</th>
            <th>正答率の伸び</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.s} className="border-b border-[#E3E6F0]">
              <td className="py-1 font-bold">{r.s}</td>
              <td>{r.days}日</td>
              <td>
                {r.learned}/{units.length}
              </td>
              <td>{r.gain === null ? "—" : `${r.gain >= 0 ? "+" : ""}${r.gain}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="m-0 mt-2 text-[11px] text-[#5A5D73]">AIとの会話の本文は保存していません。数字は、教室に入ってからの記録だけから出しています。</p>
    </div>
  );
}
