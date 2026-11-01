import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { DrillPlay } from "./DrillPlay";
import { DrillMark } from "./DrillMarks";
import { NoteLink } from "./NoteLink";
import { DRILL_SETS, drillUnitGroup, drillUnitName, type DrillSetKey } from "@/lib/drill";
import { hasLecture, lectureHref } from "@/lib/lecture";

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
  const group = drillUnitGroup(unit);
  // 小1・小2の単元は、ドリルの言葉をひらがな多めにする
  const kids = group === "小1" || group === "小2";
  const navBtn = "flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white px-3 text-center text-sm font-bold text-[#15172B] no-underline";
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { href: `/learn/${setKey}`, label: s.name }, { label: drillUnitName(unit) }]}>
      <p className="m-0 text-xs font-bold text-[#3A3D55]">
        {s.name}・{group}
      </p>
      <h1 className="m-0 mt-1 text-[24px] font-black">{drillUnitName(unit)}</h1>
      {hasLecture(unit) && (
        <Link
          href={lectureHref(unit)}
          className="mt-4 flex min-h-[48px] items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 py-2.5 text-[15px] font-black text-white no-underline shadow-[3px_3px_0_#15172B]"
        >
          <span>
            図解レクチャーを読む
            <span className="block text-[12px] font-bold text-white/80">なぜそうなるかを図で理解してから解く</span>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      )}
      <section id="points" aria-labelledby="pt-h" className="mt-4 scroll-mt-3 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-5">
        <h2 id="pt-h" className="m-0 text-[13px] font-black text-[#1533B8]">
          ①覚える　ポイント
        </h2>
        <ol className="m-0 mt-2 grid list-decimal gap-2 pl-5 text-[15px] leading-relaxed marker:font-black marker:text-[#1533B8]">
          {u.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="dr-h" className="mt-6">
        <h2 id="dr-h" className="m-0 mb-2 text-[13px] font-black text-[#1533B8]">
          ②鍛える　4択ドリル
        </h2>
        <DrillPlay unit={u.unit} qs={u.qs} kids={kids} next={next ? { href: `/learn/${setKey}/${next.unit}`, name: drillUnitName(next.unit) } : undefined}
          note={{ unitName: drillUnitName(u.unit), href: `/learn/${setKey}/${u.unit}`, subject: s.name }}
        />
        <div className="mt-3 flex justify-end">
          <NoteLink kids={kids} />
        </div>
      </section>
      <nav aria-label="前後の単元" className="mt-8 grid grid-cols-2 gap-2.5">
        {prev ? (
          <Link href={`/learn/${setKey}/${prev.unit}`} className={navBtn}>
            ← {drillUnitName(prev.unit)}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${setKey}/${next.unit}`} className={navBtn}>
            {drillUnitName(next.unit)} →
          </Link>
        ) : (
          <Link href={`/learn/${setKey}`} className={navBtn}>
            {s.name}のトップへ
          </Link>
        )}
      </nav>
    </LearnShell>
  );
}
