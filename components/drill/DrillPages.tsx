import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { DrillPlay } from "./DrillPlay";
import { DrillMark } from "./DrillMarks";
import { DRILL_SETS, drillUnitGroup, drillUnitName, type DrillSetKey } from "@/lib/drill";

// 「ポイント＋4択ドリル」のページ (サーバー側)。セットのトップと、単元のページ。

const SITE = "https://app.bluespring.co.jp";

export function drillTopMetadata(key: DrillSetKey): Metadata {
  const s = DRILL_SETS[key];
  const url = `${SITE}/learn/${key}`;
  const n = s.units.reduce((a, u) => a + u.qs.length, 0);
  const title = `${s.name}｜単元ごとのポイントと4択ドリル${n}問を無料で｜アオハルラーン｜アオハルOS`;
  const description = `${s.lead}ポイントで覚えて、4択10問で鍛える。答えるたびに解説、9問正解で合格。登録なし・無料。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export function DrillTop({ setKey }: { setKey: DrillSetKey }) {
  const s = DRILL_SETS[setKey];
  const groups = [...new Set(s.units.map((u) => drillUnitGroup(u.unit)))];
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: s.name }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">{s.eyebrow}</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">{s.name}</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        {s.lead}単元ごとに、①覚える＝ポイントを読んで、②鍛える＝4択10問に挑戦。答えるたびに解説が出て、9問正解で合格です。問題・解説はすべてオリジナル。登録なし・無料、記録はこの端末に保存されます。
      </p>
      {groups.map((g) => (
        <section key={g} className="mt-8">
          {groups.length > 1 && g && <h2 className="m-0 text-[19px] font-black">{g}</h2>}
          <ul className="m-0 mt-3 grid list-none gap-2.5 p-0 sm:grid-cols-2">
            {s.units
              .filter((u) => drillUnitGroup(u.unit) === g)
              .map((u) => (
                <li key={u.unit}>
                  <Link href={`/learn/${setKey}/${u.unit}`} className="block rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                    <span className="flex items-center gap-2">
                      <span className="min-w-0 flex-1 text-[16px] font-black">{drillUnitName(u.unit)}</span>
                      <DrillMark unit={u.unit} />
                    </span>
                    <span className="mt-1 line-clamp-2 block text-[12.5px] leading-relaxed text-[#3A3D55]">{u.points[0]}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </LearnShell>
  );
}

export function drillUnitParams(key: DrillSetKey) {
  return DRILL_SETS[key].units.map((u) => ({ unit: u.unit }));
}

export function drillUnitMetadata(key: DrillSetKey, unit: string): Metadata {
  const s = DRILL_SETS[key];
  const u = s.units.find((x) => x.unit === unit);
  if (!u) return {};
  const name = drillUnitName(unit);
  const url = `${SITE}/learn/${key}/${unit}`;
  const title = `${name}のポイントと練習問題｜${s.name}（${drillUnitGroup(unit)}）｜アオハルOS`;
  const description = `${s.name}「${name}」の要点と4択の練習問題（解説つき）。${u.points[0].slice(0, 60)}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export function DrillUnitPage({ setKey, unit }: { setKey: DrillSetKey; unit: string }) {
  const s = DRILL_SETS[setKey];
  const idx = s.units.findIndex((x) => x.unit === unit);
  const u = s.units[idx];
  if (!u) notFound();
  const prev = s.units[idx - 1];
  const next = s.units[idx + 1];
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: `/learn/${setKey}`, label: s.name }, { label: drillUnitName(unit) }]}>
      <p className="m-0 text-xs font-bold text-[#3A3D55]">
        {s.name}・{drillUnitGroup(unit)}
      </p>
      <h1 className="m-0 mt-1 text-[24px] font-black">{drillUnitName(unit)}</h1>
      <section aria-labelledby="pt-h" className="mt-4 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-5">
        <h2 id="pt-h" className="m-0 text-[13px] font-black text-[#1533B8]">
          ①覚える　ポイント
        </h2>
        <ol className="m-0 mt-2 grid gap-2 pl-5 text-[15px] leading-relaxed">
          {u.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="dr-h" className="mt-6">
        <h2 id="dr-h" className="m-0 mb-2 text-[13px] font-black text-[#1533B8]">
          ②鍛える　4択ドリル
        </h2>
        <DrillPlay unit={u.unit} qs={u.qs} />
      </section>
      <nav className="mt-8 flex justify-between gap-3 text-[14px] font-black">
        {prev ? <Link href={`/learn/${setKey}/${prev.unit}`}>← {drillUnitName(prev.unit)}</Link> : <span />}
        {next ? <Link href={`/learn/${setKey}/${next.unit}`}>{drillUnitName(next.unit)} →</Link> : <Link href={`/learn/${setKey}`}>{s.name}のトップへ</Link>}
      </nav>
    </LearnShell>
  );
}
