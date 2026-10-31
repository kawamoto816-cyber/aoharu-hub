import { LEVELS } from "@/lib/school";
import type { DrillUnit } from "./types";
import { ENG_CHU1 } from "./data/eng_chu1";
import { ENG_CHU2 } from "./data/eng_chu2";
import { ENG_CHU3 } from "./data/eng_chu3";
import { ENG_KO1 } from "./data/eng_ko1";
import { ENG_KO2 } from "./data/eng_ko2";
import { KOBUN } from "./data/kobun";
import { KANBUN } from "./data/kanbun";
import { KOKUGO_CHU } from "./data/kokugo_chu";

// 文法などの「ポイント＋4択ドリル」。セットごとに /learn/<key>、単元ごとに /learn/<key>/<単元id>。
// ①覚える = ポイント、②鍛える = 20問から10問の4択 (9問正解で合格)。

export type DrillSetKey = "eibunpo-chu" | "eibunpo-ko" | "kokubunpo-chu" | "kobun" | "kanbun";

export interface DrillSet {
  key: DrillSetKey;
  name: string;
  eyebrow: string;
  lead: string;
  units: DrillUnit[];
}

export const DRILL_SETS: Record<DrillSetKey, DrillSet> = {
  "eibunpo-chu": { key: "eibunpo-chu", name: "中学英文法", eyebrow: "英語　中1〜中3", lead: "be動詞から関係代名詞・仮定法まで、中学英語の文法を単元ごとに。", units: [...ENG_CHU1, ...ENG_CHU2, ...ENG_CHU3] },
  "eibunpo-ko": { key: "eibunpo-ko", name: "高校英文法", eyebrow: "英語　文法・語法", lead: "文型・時制から仮定法・倒置まで、大学入試の文法・語法問題の水準で。", units: [...ENG_KO1, ...ENG_KO2] },
  "kokubunpo-chu": { key: "kokubunpo-chu", name: "中学国語の文法・古典", eyebrow: "国語　中1〜中3", lead: "文節・品詞・活用・助詞助動詞・敬語と、古文・漢文の基礎を単元ごとに。", units: KOKUGO_CHU },
  kobun: { key: "kobun", name: "古文", eyebrow: "国語　言語文化・古典探究", lead: "歴史的仮名遣い・用言の活用・助動詞・助詞・敬語・識別・和歌の修辞・古典常識を単元ごとに。", units: KOBUN },
  kanbun: { key: "kanbun", name: "漢文", eyebrow: "国語　言語文化・古典探究", lead: "返り点・再読文字・置き字・句法（否定・疑問反語・使役受身・比較抑揚・限定累加仮定願望）・漢詩を単元ごとに。", units: KANBUN },
};

export const DRILL_SET_KEYS = Object.keys(DRILL_SETS) as DrillSetKey[];

const INFO = new Map<string, { name: string; group: string }>();
for (const l of LEVELS) for (const s of l.subjects) for (const g of s.groups) for (const u of g.units) INFO.set(u.id, { name: u.name, group: g.title });
export const drillUnitName = (id: string) => INFO.get(id)?.name ?? id;
export const drillUnitGroup = (id: string) => INFO.get(id)?.group ?? "";
