import { getDaimon, resolveDaimon } from "@/lib/moshi";
import { materialize, unitMoshiOf, unitView } from "@/lib/moshi/unit";
import { UNIT_REGISTRY } from "@/lib/moshi/registry";
import type { Daimon, Item, MoshiSection, UnitMoshi } from "@/lib/moshi/types";

// つまずき図鑑の復習で出す1問を、単元・大問・小問の id とシードから作りなおす (サーバー側。模試の全データを読む)。
//   単元模試 (UnitMoshi) の節 (入試モード用の節 examOnly もふくむ。単元 u になければ全単元の節から id で探す) → なければ大問 (Daimon) の小問。生成型 (A) は新しいシードで数値が変わり、プール型 (B) は選択肢の順が変わる。
// 誰の記録かは受け取らない (端末の図鑑の記録はサーバーに来ない)。

export interface ZukanItem {
  item: Item;
  /** 大問の見出し・リード・資料 (図はほどき済み) */
  daimon: Pick<Daimon, "id" | "title" | "lead" | "material">;
  unit: { name: string; lecture?: string; kids: boolean };
}

let SECS: Map<string, { m: UnitMoshi; sec: MoshiSection }> | null = null;
/** 書き下ろしの単元模試の節を id で (試験モードの小問は、出題元の節の id を持つ) */
function sectionById(id: string) {
  if (!SECS) {
    SECS = new Map();
    for (const m of Object.values(UNIT_REGISTRY)) m.sections.forEach((sec, i) => SECS!.set(sec.id ?? `${m.unit}/s${i + 1}`, { m, sec }));
  }
  return SECS.get(id);
}

export function zukanItem(u: string, d: string, q: string, seed: number): ZukanItem | null {
  const m0 = unitMoshiOf(u);
  const i0 = m0 ? m0.sections.findIndex((sec, i) => (sec.id ?? `${u}/s${i + 1}`) === d) : -1;
  const hit = m0 && i0 >= 0 ? { m: m0, sec: m0.sections[i0] } : sectionById(d);
  if (hit) {
    const { m, sec } = hit;
    const fileUnit = m.unit;
    const qu = sec.questions.find((x) => x.id === q);
    if (qu) {
      if (qu.dependsOn) return null;
      const body = materialize(qu, seed, qu.unit ?? fileUnit);
      const item: Item = {
        id: qu.id,
        no: "",
        prompt: body.prompt,
        figure: body.figure,
        points: qu.points,
        skill: qu.skill,
        unit: qu.unit && qu.unit !== fileUnit ? qu.unit : undefined,
        answer: body.answer,
        steps: body.steps,
        point: body.point,
        level: qu.difficulty,
      };
      return pack({ id: d, subject: m.subject, grade: m.grade, units: [fileUnit], title: sec.title, lead: sec.lead, material: sec.material, items: [item], points: item.points, minutes: 1, style: sec.style ?? "mix", level: qu.difficulty, review: { status: "draft" } }, qu.unit ?? fileUnit);
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
