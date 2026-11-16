"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

// /learn/jugyo の一覧 (学校 → 教科のタブ、単元名の検索、学年ごとの見出し)。
// 500本をこえて縦に長くなったので、いちどに見せるのは「1つの学校の1つの教科」だけにする。
// えらんだ学校と教科は、この端末にだけ覚える (読めない環境では毎回はじめから)。

export interface JugyoEntry {
  href: string;
  level: string;
  subject: string;
  /** 学年・科目 (小5・中2・数学Ⅰ など) */
  group: string;
  /** 単元名 */
  name: string;
  /** 授業のタイトル (ルビなし) */
  title: string;
  minutes: string | number;
  stops: string | number;
}

/** 起業の教科書 (ゼロワンOSユース版) の授業。検索中は同じことばで絞りこむ */
export interface UzJugyoEntry {
  id: string;
  href: string;
  lv: number | string;
  name: string;
  minutes: string | number;
  stops: string | number;
}

const KEY = "aoharu.jugyo.index.v1";
const ALL = "すべて";

function load(): { level?: string; subject?: string } {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as {
      level?: string;
      subject?: string;
    };
  } catch {
    return {};
  }
}
function save(v: { level: string; subject: string }) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(v));
  } catch {
    // 保存できなくても動く
  }
}

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

/** 教科の並び (ここにない教科はうしろ) */
const SUBJECT_ORDER = [
  "国語",
  "算数",
  "数学",
  "理科",
  "社会",
  "地理歴史",
  "公民",
  "英語",
  "情報",
];
const subjectRank = (s: string) => {
  const i = SUBJECT_ORDER.indexOf(s);
  return i < 0 ? 99 : i;
};
/** 学年の並び (小3・中2 は数字で、数学Ⅰ・物理基礎などは出てきた順) */
const gradeRank = (g: string) => {
  const m = g.match(/[小中高]([1-6１-６])/);
  return m
    ? Number(m[1].replace(/[１-６]/, (c) => String(c.charCodeAt(0) - 0xff10)))
    : 50;
};

export function JugyoIndex({
  entries,
  levels,
  uz = [],
}: {
  entries: JugyoEntry[];
  /** 学校の並び */ levels: string[];
  /** 起業の教科書の授業 (一覧の下に出す) */ uz?: UzJugyoEntry[];
}) {
  const [level, setLevel] = useState(levels[0]);
  const [subject, setSubject] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = window.setTimeout(() => {
      const v = load();
      if (v.level && levels.includes(v.level)) {
        setLevel(v.level);
        if (v.subject) setSubject(v.subject);
      }
    }, 0);
    return () => window.clearTimeout(t);
  }, [levels]);

  const subjects = useMemo(
    () => [
      ...[
        ...new Set(
          entries.filter((e) => e.level === level).map((e) => e.subject),
        ),
      ].sort((x, y) => subjectRank(x) - subjectRank(y)),
      ALL,
    ],
    [entries, level],
  );
  const sub = subjects.includes(subject) ? subject : subjects[0];
  const query = norm(q);

  const shown = useMemo(() => {
    const hit = query
      ? entries.filter((e) =>
          norm(`${e.name}${e.title}${e.subject}${e.group}`).includes(query),
        )
      : entries.filter(
          (e) => e.level === level && (sub === ALL || e.subject === sub),
        );
    const order = new Map(entries.map((e, i) => [e, i]));
    const lv = (l: string) => levels.indexOf(l);
    return [...hit].sort(
      (x, y) =>
        lv(x.level) - lv(y.level) ||
        subjectRank(x.subject) - subjectRank(y.subject) ||
        gradeRank(x.group) - gradeRank(y.group) ||
        order.get(x)! - order.get(y)!,
    );
  }, [entries, level, sub, query, levels]);

  const uzShown = useMemo(
    () =>
      query
        ? uz.filter((u) =>
            norm(`${u.name}${u.id}lv${u.lv}起業の教科書ゼロワンosユース版`).includes(query),
          )
        : uz,
    [uz, query],
  );

  // 見出し: 検索中は「学校・教科」、ふだんは「学年・科目」(教科が「すべて」なら教科も)
  const groups = useMemo(() => {
    const out: [string, JugyoEntry[]][] = [];
    for (const e of shown) {
      const h = query
        ? `${e.level}・${e.subject}`
        : sub === ALL
          ? `${e.subject}・${e.group}`
          : e.group;
      const g = out.find((x) => x[0] === h);
      if (g) g[1].push(e);
      else out.push([h, [e]]);
    }
    return out;
  }, [shown, query, sub]);

  const pickLevel = (l: string) => {
    setLevel(l);
    setSubject("");
    setQ("");
    save({ level: l, subject: "" });
  };
  const pickSubject = (s: string) => {
    setSubject(s);
    save({ level, subject: s });
  };

  return (
    <div className="mt-5">
      <div className="sticky top-0 z-10 -mx-4 border-b border-[#15172B]/15 bg-[#F7F6F1]/95 px-4 pb-2 pt-2 backdrop-blur sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label="学校"
          className="grid grid-cols-3 gap-1.5"
        >
          {levels.map((l) => {
            const n = entries.filter((e) => e.level === l).length;
            const on = !query && l === level;
            return (
              <button
                key={l}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pickLevel(l)}
                className={`flex min-h-[48px] flex-col items-center justify-center rounded-[12px] border-[1.5px] border-[#15172B] text-[15px] font-black leading-tight ${on ? "bg-[#15172B] text-white" : "bg-white text-[#15172B]"}`}
              >
                {l}
                <span
                  className={`text-[11px] font-bold ${on ? "text-[#FFE45C]" : "text-[#5A5D73]"}`}
                >
                  {n}本
                </span>
              </button>
            );
          })}
        </div>
        {!query && (
          <div
            role="tablist"
            aria-label="教科"
            className="-mx-4 mt-2 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {subjects.map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={s === sub}
                onClick={() => pickSubject(s)}
                className={`min-h-[40px] shrink-0 rounded-full border-[1.5px] px-3.5 text-[13.5px] font-black ${s === sub ? "border-[#1533B8] bg-[#1533B8] text-white" : "border-[#15172B]/30 bg-white text-[#15172B]"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <label className="mt-2 flex items-center gap-2 rounded-[12px] border-[1.5px] border-[#15172B]/30 bg-white px-3">
          <span aria-hidden="true" className="text-[14px] text-[#5A5D73]">
            🔍
          </span>
          <span className="sr-only">単元名でさがす</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="例：割合、鎌倉、関係代名詞"
            className="min-h-[44px] w-full min-w-0 bg-transparent text-[15px] outline-none"
          />
        </label>
      </div>

      <p
        className="m-0 mt-3 text-[12.5px] font-bold text-[#3A3D55]"
        aria-live="polite"
      >
        {query
          ? `「${q}」をふくむ授業 ${shown.length + uzShown.length}本`
          : `${level}${sub === ALL ? "" : `・${sub}`}　${shown.length}本`}
      </p>

      {groups.length === 0 && uzShown.length === 0 && (
        <p className="m-0 mt-4 rounded-[12px] bg-white p-4 text-[14px]">
          見つかりませんでした。ことばを短くしてみてください。
        </p>
      )}

      {groups.map(([h, list]) => (
        <section key={h} aria-label={h} className="mt-4">
          <h3 className="m-0 text-[14px] font-black text-[#1533B8]">
            {h}
            <span className="ml-1.5 text-[11.5px] font-bold text-[#5A5D73]">
              {list.length}本
            </span>
          </h3>
          <ul className="m-0 mt-1.5 grid list-none gap-px overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B]/15 p-0 grid-cols-[minmax(0,1fr)] sm:grid-cols-[repeat(2,minmax(0,1fr))]">
            {list.map((e) => (
              <li key={e.href} className="bg-white sm:last:odd:col-span-2">
                <Link
                  href={e.href}
                  className="flex min-h-[56px] items-center gap-3 px-3.5 py-2.5 text-[#15172B] no-underline hover:bg-[#FFFBE6]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-black leading-snug">
                      {e.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] text-[#5A5D73]">
                      {e.title}
                    </span>
                  </span>
                  <span className="shrink-0 text-right text-[11.5px] font-bold leading-tight text-[#3A3D55]">
                    約{e.minutes}分
                    <span className="block">{e.stops}回止まる</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[13px] font-black text-[#1533B8]"
                  >
                    ▶
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {uzShown.length > 0 && (
        <section aria-labelledby="jugyo-uz" className="mt-9">
          <h2 id="jugyo-uz" className="m-0 text-[17px] font-black">
            起業の教科書の授業（ゼロワンOSユース版）
            {query && (
              <span className="ml-1.5 text-[11.5px] font-bold text-[#5A5D73]">
                {uzShown.length}本
              </span>
            )}
          </h2>
          <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">
            高校のキャラで。Lv1〜3 はだれでも見られます。
          </p>
          <ul className="m-0 mt-2 grid list-none gap-px overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B]/15 p-0 grid-cols-[minmax(0,1fr)] sm:grid-cols-[repeat(2,minmax(0,1fr))]">
            {uzShown.map((u) => (
              <li key={u.id} className="bg-white sm:last:odd:col-span-2">
                <Link
                  href={u.href}
                  className="flex min-h-[56px] items-center gap-3 px-3.5 py-2.5 text-[#15172B] no-underline hover:bg-[#FFFBE6]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11.5px] font-black text-[#1533B8]">
                      Lv{u.lv}・{u.id.toUpperCase()}
                    </span>
                    <span className="block text-[15px] font-black leading-snug">
                      {u.name}
                    </span>
                  </span>
                  <span className="shrink-0 text-right text-[11.5px] font-bold leading-tight text-[#3A3D55]">
                    約{u.minutes}分
                    <span className="block">{u.stops}回止まる</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[13px] font-black text-[#1533B8]"
                  >
                    ▶
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
