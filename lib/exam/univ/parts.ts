import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { DaimonSpec, DiffMix } from "../types";
import { U_HOKUDAI_EIGO } from "./hokudai-eigo";
import { U_TOHOKU_EIGO } from "./tohoku-eigo";
import { U_NAGOYA_EIGO } from "./nagoya-eigo";
import { U_KYUSHU_EIGO } from "./kyushu-eigo";
import { U_KOBE_EIGO } from "./kobe-eigo";
import { U_HOKUDAI_SUGAKU_BUN } from "./hokudai-sugaku-bun";
import { U_TOHOKU_SUGAKU_BUN } from "./tohoku-sugaku-bun";
import { U_NAGOYA_SUGAKU_BUN } from "./nagoya-sugaku-bun";
import { U_KYUSHU_SUGAKU_BUN } from "./kyushu-sugaku-bun";
import { U_KOBE_SUGAKU_BUN } from "./kobe-sugaku-bun";
import { U_HANDAI_SUGAKU_BUN } from "./handai-sugaku-bun";
import { U_HOKUDAI_SUGAKU_RI } from "./hokudai-sugaku-ri";
import { U_TOHOKU_SUGAKU_RI } from "./tohoku-sugaku-ri";
import { U_NAGOYA_SUGAKU_RI } from "./nagoya-sugaku-ri";
import { U_KYUSHU_SUGAKU_RI } from "./kyushu-sugaku-ri";
import { U_KOBE_SUGAKU_RI } from "./kobe-sugaku-ri";
import { U_HANDAI_SUGAKU_RI } from "./handai-sugaku-ri";

// 「型の部品」方式 (2026-11-23)。
// 国公立の2次試験は、英語・数学とも大学ごとの差が「時間・大問の数と並び・配点・よく出る分野」にあり、
// 1つ1つの大問の作り (長文読解・自由英作文・誘導つきの記述の数学) はよく似ている。
// そこで、すでに書き下ろした旧帝大・神戸大の型の大問を「部品」として共通に使い、
// 新しい大学の型は、部品の組み合わせ・時間・配点・題だけを書いて組み立てる。
//   - 部品 = 既存の型の大問1つ (poolTag) の節すべて。題・指示文・小問の数・難易度の配分も元の大問から引きつぐ
//   - 新しい型では、部品の節を `${key}:<番号>` の tag と `${key}-<番号>-<元の id>` の id で写して使う
//   - 1つの型の中で同じ部品は2回使わない (同じ回に同じ問題が出ないように)
// 部品は旧帝大・神戸大の型から作っているので、難しさはもとの大学よりやや高めになることがある (画面の basis に書く)。

const SOURCES: UnivExam[] = [
  U_HOKUDAI_EIGO,
  U_TOHOKU_EIGO,
  U_NAGOYA_EIGO,
  U_KYUSHU_EIGO,
  U_KOBE_EIGO,
  U_HOKUDAI_SUGAKU_BUN,
  U_TOHOKU_SUGAKU_BUN,
  U_NAGOYA_SUGAKU_BUN,
  U_KYUSHU_SUGAKU_BUN,
  U_KOBE_SUGAKU_BUN,
  U_HANDAI_SUGAKU_BUN,
  U_HOKUDAI_SUGAKU_RI,
  U_TOHOKU_SUGAKU_RI,
  U_NAGOYA_SUGAKU_RI,
  U_KYUSHU_SUGAKU_RI,
  U_KOBE_SUGAKU_RI,
  U_HANDAI_SUGAKU_RI,
];

/** 部品の一覧 (分野 → 元の大問の poolTag)。同じ分野の部品を2つ以上並べると、回ごとにちがう大学の大問から選ばれる */
export const PARTS = {
  // 英語
  eigoRead: ["hokudai-eigo:1", "hokudai-eigo:2", "tohoku-eigo:1", "tohoku-eigo:2", "nagoya-eigo:1", "nagoya-eigo:2", "kyushu-eigo:1", "kyushu-eigo:2", "kobe-eigo:1", "kobe-eigo:2"],
  eigoTalk: ["kobe-eigo:3", "nagoya-eigo:3"],
  eigoEssay: ["hokudai-eigo:4", "kyushu-eigo:4", "kobe-eigo:4"],
  eigoTranslate: ["hokudai-eigo:3", "tohoku-eigo:4"],
  // 数学（文系）
  bunCalc: ["hokudai-sugaku-bun:1", "tohoku-sugaku-bun:2", "kyushu-sugaku-bun:1", "handai-sugaku-bun:1", "kobe-sugaku-bun:1"],
  bunProb: ["hokudai-sugaku-bun:3", "tohoku-sugaku-bun:3", "kyushu-sugaku-bun:4", "handai-sugaku-bun:2", "nagoya-sugaku-bun:2", "kobe-sugaku-bun:2"],
  bunSeq: ["hokudai-sugaku-bun:4", "nagoya-sugaku-bun:3", "kobe-sugaku-bun:3", "handai-sugaku-bun:3"],
  bunVector: ["hokudai-sugaku-bun:2", "tohoku-sugaku-bun:4", "kyushu-sugaku-bun:3"],
  bunCoord: ["tohoku-sugaku-bun:1", "kyushu-sugaku-bun:2", "nagoya-sugaku-bun:1"],
  // 数学（理系）
  riDiff: ["hokudai-sugaku-ri:4", "tohoku-sugaku-ri:1", "kyushu-sugaku-ri:1", "handai-sugaku-ri:2", "kobe-sugaku-ri:2", "nagoya-sugaku-ri:1"],
  riInt: ["hokudai-sugaku-ri:3", "tohoku-sugaku-ri:6", "kyushu-sugaku-ri:2", "handai-sugaku-ri:3", "kobe-sugaku-ri:3"],
  riLimit: ["tohoku-sugaku-ri:2", "handai-sugaku-ri:1", "kobe-sugaku-ri:1"],
  riProb: ["hokudai-sugaku-ri:2", "tohoku-sugaku-ri:4", "nagoya-sugaku-ri:2", "kobe-sugaku-ri:5"],
  riSeq: ["hokudai-sugaku-ri:1", "tohoku-sugaku-ri:5"],
  riComplex: ["nagoya-sugaku-ri:3", "kyushu-sugaku-ri:3", "handai-sugaku-ri:4", "kobe-sugaku-ri:4"],
  riVector: ["tohoku-sugaku-ri:3", "kyushu-sugaku-ri:4", "hokudai-sugaku-ri:5"],
} as const;

function part(tag: string): { spec: DaimonSpec; pool: ExamPoolSection[] } {
  for (const ex of SOURCES) {
    const spec = ex.sections.find((s) => s.poolTag === tag);
    if (spec) return { spec, pool: ex.pool.filter((p) => p.tag === tag) };
  }
  throw new Error(`型の部品 ${tag} が見つからない`);
}

export interface PartDaimon {
  title: string;
  points: number;
  /** 使う部品 (PARTS のどれか、またはその組み合わせ) */
  parts: readonly string[];
  /** 省略＝最初の部品の大問と同じ */
  count?: [number, number];
  mix?: DiffMix;
  lead?: string;
}

/** 部品から大学別型を組み立てる */
export function fromParts(a: Omit<UnivExam, "sections" | "pool"> & { daimon: PartDaimon[] }): UnivExam {
  const { daimon, ...meta } = a;
  const used = new Set<string>();
  const sections: DaimonSpec[] = [];
  const pool: ExamPoolSection[] = [];
  daimon.forEach((d, i) => {
    const tag = `${a.key}:${i + 1}`;
    const ps = d.parts.map((t) => {
      if (used.has(t)) throw new Error(`${a.key}: 部品 ${t} を2回使っている`);
      used.add(t);
      return part(t);
    });
    const first = ps[0].spec;
    sections.push({
      title: d.title,
      lead: d.lead ?? first.lead,
      count: d.count ?? first.count,
      mix: d.mix ?? first.mix,
      points: d.points,
      prefer: "material",
      poolTag: tag,
    });
    for (const p of ps.flatMap((x) => x.pool))
      pool.push({ ...p, tag, section: { ...p.section, id: `${a.key}-${i + 1}-${p.section.id ?? p.section.title}` } });
  });
  return { ...meta, sections, pool };
}
