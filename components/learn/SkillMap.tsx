"use client";

import Link from "next/link";
import { useProgress } from "./useProgress";

// スキル盤：中央の力から5つの領域がつながる。カードを覚える・試すとマスが光る。
// 表 (推薦入試の合格力) と裏 (難関校向けの知の力) で同じ部品を使う。href のない領域は準備中として見せる。

export interface SkillRegion {
  key: string;
  name: string;
  aria: string;
  fill: string;
  ink: string;
  ang: number;
  href?: string;
  ids?: string[];
}

export function SkillMap({ regions, centerTop, centerName }: { regions: SkillRegion[]; centerTop: string; centerName: string }) {
  const progress = useProgress();

  // 中央の％は、公開している領域のカードのうち「習得」にした割合
  const allIds = regions.flatMap((r) => r.ids ?? []);
  const done = allIds.filter((id) => progress[id] === "done").length;
  const percent = allIds.length ? Math.round((done / allIds.length) * 100) : 0;
  const learnedIn = (ids?: string[]) => (ids ? ids.filter((id) => progress[id]).length : 0);

  // 位置は百分率 (正方形の盤の中心 50%,50%)
  const rx = 31, ry = 34, ring = 13;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {regions.map((r) => {
          const a = (r.ang * Math.PI) / 180;
          return <line key={r.key} x1="50" y1="50" x2={50 + rx * Math.cos(a)} y2={50 + ry * Math.sin(a)} stroke="#15172B" strokeWidth="0.4" strokeDasharray="1.2 1.5" />;
        })}
      </svg>

      {regions.map((r) => {
        const a = (r.ang * Math.PI) / 180;
        const cx = 50 + rx * Math.cos(a);
        const cy = 50 + ry * Math.sin(a);
        const total = r.ids?.length ?? 8;
        const lit = r.ids ? Math.round((8 * r.ids.filter((id) => progress[id]).length) / total) : 0;
        return Array.from({ length: 8 }, (_, i) => {
          const b = (i / 8) * Math.PI * 2 + a;
          const on = i < lit;
          return (
            <span
              key={`${r.key}-${i}`}
              aria-hidden="true"
              className="absolute h-[2.8%] w-[2.8%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px]"
              style={{
                left: `${cx + ring * Math.cos(b)}%`,
                top: `${cy + ring * Math.sin(b)}%`,
                borderColor: on ? "#15172B" : "#9A9CB0",
                background: on ? r.fill : "#FFFFFF",
                boxShadow: on ? "0 0 0 3px rgba(255,228,92,0.55)" : undefined,
              }}
            />
          );
        });
      })}

      <div className="absolute left-1/2 top-1/2 flex aspect-square w-[25%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#15172B] text-white shadow-[0_0_0_6px_#FFE45C]">
        <span className="text-[11px] font-bold">{centerTop}</span>
        <span className="text-[15px] font-black">{centerName}</span>
        <span className="text-xs font-bold text-[#FFE45C]">{percent}%</span>
      </div>

      {regions.map((r) => {
        const a = (r.ang * Math.PI) / 180;
        const style = {
          left: `${50 + rx * Math.cos(a)}%`,
          top: `${50 + ry * Math.sin(a)}%`,
          background: r.href ? r.fill : "#FFFFFF",
          color: r.href ? r.ink : "#4A4D63",
          borderColor: r.href ? "#15172B" : "#9A9CB0",
        };
        const cls = "absolute flex aspect-square w-[21%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 whitespace-pre-line rounded-full border-[1.5px] text-center no-underline";
        const inner = (
          <>
            <span className={`${r.name.split("\n").some((l) => l.length > 4) ? "text-[11px]" : "text-[13px]"} font-black leading-tight`}>{r.name}</span>
            <span className="text-[11px] font-bold">{r.href && r.ids ? `${learnedIn(r.ids)} / ${r.ids.length}` : "準備中"}</span>
          </>
        );
        return r.href ? (
          <Link key={r.key} href={r.href} aria-label={`${r.aria} ${learnedIn(r.ids)}/${r.ids?.length ?? 0}`} className={`${cls} shadow-[3px_3px_0_#15172B]`} style={style}>
            {inner}
          </Link>
        ) : (
          <span key={r.key} aria-label={r.aria} className={`${cls} border-dashed`} style={style}>
            {inner}
          </span>
        );
      })}
    </div>
  );
}
