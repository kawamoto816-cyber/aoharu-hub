import { LEVELS } from "@/lib/school";
import { allSphereUnits, subjectColor } from "./index";
import type { Ring, Stage, UnitMeta } from "./types";

// スフィア盤のノードの表示用情報を lib/school から引く (サーバー側で使い、クライアントへ渡す)。

const STAGE: Record<string, Stage> = { sho: "小", chu: "中", ko: "高" };

/** 高校の科目を「基礎 (高・基)」と「発展 (高・発)」に分ける */
const HIGH_BASIC = /基礎|Ⅰ|^数学A$|総合|言語文化|現代の国語|公共/;

export function unitMeta(): Record<string, UnitMeta> {
  const want = new Set(allSphereUnits());
  const out: Record<string, UnitMeta> = {};
  for (const l of LEVELS)
    for (const s of l.subjects)
      for (const g of s.groups)
        for (const u of g.units) {
          if (!want.has(u.id)) continue;
          const stage = STAGE[l.key] ?? "高";
          const grade = /^([小中])(\d)/.exec(g.title);
          const inParen = /（(小\d・\d)）/.exec(g.title);
          const n = grade ? Number(grade[2]) : inParen ? Number(inParen[1][1]) : 0;
          let where: string;
          let row: number;
          if (stage === "高") {
            where = `高・${g.title}・${s.name}`;
            row = HIGH_BASIC.test(g.title) ? 9 : 10;
          } else if (grade) {
            where = `${g.title}・${s.name}`;
            row = stage === "小" ? n - 1 : 5 + n;
          } else {
            where = inParen ? `${inParen[1]}・${s.name}` : `${stage}・${g.title}・${s.name}`;
            row = stage === "小" ? Math.max(0, n - 1) : 7;
          }
          const ring: Ring = stage === "高" ? "高" : stage === "中" ? "中" : n > 0 && n <= 3 ? "小低" : "小高";
          out[u.id] = { name: u.name, where, color: subjectColor(s.name), row, ring, stage };
        }
  return out;
}
