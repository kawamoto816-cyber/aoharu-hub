import { LEVELS } from "@/lib/school";
import { getLecture } from "@/lib/lecture";
import { subjectColor } from "@/lib/sphere";
import { GAKKO_GRADES, type GakkoData, type GakkoUnit } from "./timetable";

// あたらしいがっこう (/learn/gakko) のデータ。サーバー側だけで使う (時間割の計算は ./timetable)。

export * from "./timetable";

/** 学校の地図から、学年ごとの単元を引く (サーバー側で作ってクライアントへ渡す)。学年の決め方は /learn の UnitPicker と同じ。 */
export function gakkoData(): GakkoData {
  const units: Record<string, GakkoUnit> = {};
  const byGrade: Record<string, string[]> = Object.fromEntries(GAKKO_GRADES.map((g) => [g, []]));
  for (const l of LEVELS)
    for (const s of l.subjects)
      for (const g of s.groups) {
        const ids = g.units.filter((u) => getLecture(u.id)).map((u) => u.id);
        if (!ids.length) continue;
        for (const u of g.units) if (getLecture(u.id)) units[u.id] = { n: u.name, s: s.name, g: g.title, c: subjectColor(s.name) };
        let grades: string[];
        if (l.name === "高校") grades = ["高校"];
        else if (GAKKO_GRADES.includes(g.title)) grades = [g.title];
        else if (l.name === "中学校") grades = ["中1", "中2", "中3"];
        else grades = (g.title.match(/[1-6]/g) ?? []).map((n) => `小${n}`);
        for (const grade of grades) byGrade[grade]?.push(...ids);
      }
  return { units, byGrade };
}

