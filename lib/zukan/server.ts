import { getDaimon, resolveDaimon } from "@/lib/moshi";
import { materialize, unitMoshiOf, unitRoundSections, unitView } from "@/lib/moshi/unit";
import type { Daimon, Item } from "@/lib/moshi/types";

// つまずき図鑑の復習で出す1問を、単元・大問・小問の id とシードから作りなおす (サーバー側。模試の全データを読む)。
//   単元模試 (UnitMoshi) の節 → なければ大問 (Daimon) の小問。生成型 (A) は新しいシードで数値が変わり、プール型 (B) は選択肢の順が変わる。
// 誰の記録かは受け取らない (端末の図鑑の記録はサーバーに来ない)。

export interface ZukanItem {
  item: Item;
  /** 大問の見出し・リード・資料 (図はほどき済み) */
  daimon: Pick<Daimon, "id" | "title" | "lead" | "material">;
  unit: { name: string; lecture?: string; kids: boolean };
}

export function zukanItem(u: string, d: string, q: string, seed: number): ZukanItem | null {
  const m = unitMoshiOf(u);
  if (m) {
    const secs = unitRoundSections(m);
    for (let i = 0; i < m.sections.length; i++) {
      const sec = m.sections[i];
      if ((sec.id ?? `${u}/s${i + 1}`) !== d || !secs.includes(sec)) continue;
      const qu = sec.questions.find((x) => x.id === q);
      if (!qu || qu.dependsOn) return null;
      const body = materialize(qu, seed, qu.unit ?? u);
      const item: Item = {
        id: qu.id,
        no: "",
        prompt: body.prompt,
        figure: body.figure,
        points: qu.points,
        skill: qu.skill,
        unit: qu.unit && qu.unit !== u ? qu.unit : undefined,
        answer: body.answer,
        steps: body.steps,
        point: body.point,
        level: qu.difficulty,
      };
      return pack({ id: d, subject: m.subject, grade: m.grade, units: [u], title: sec.title, lead: sec.lead, material: sec.material, items: [item], points: item.points, minutes: 1, style: sec.style ?? "mix", level: qu.difficulty, review: { status: "draft" } }, u);
    }
  }
  const dm = getDaimon(d);
  const it = dm?.items.find((x) => x.id === q);
  if (!dm || !it || it.dependsOn) return null;
  return pack({ ...dm, items: [{ ...it, no: "" }] }, it.unit ?? dm.units[0]);
}

function pack(d: Daimon, unit: string): ZukanItem {
  const r = resolveDaimon(d);
  const v = unitView(unit);
  return { item: r.items[0], daimon: { id: r.id, title: r.title, lead: r.lead, material: r.material }, unit: { name: v.name, lecture: v.lecture, kids: v.kids } };
}
