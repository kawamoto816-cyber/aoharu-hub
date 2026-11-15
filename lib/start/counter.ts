import { getSetting, setSetting } from "@/lib/social/store";
import { START_EVENTS, START_VARIANTS, type StartEvent, type StartVariant } from "./ab";

// /start の ABC テストの数 (app_settings の key/value。新しいテーブルは作らない)。
//   start_ab:<案>:<view|cta|signup> → 数
// 同時に足すと数がわずかにずれることがあるが、案どうしの比べ方には十分。

const key = (v: StartVariant, ev: StartEvent) => `start_ab:${v}:${ev}`;

export async function bumpStart(v: StartVariant, ev: StartEvent): Promise<void> {
  const n = Number((await getSetting(key(v, ev)).catch(() => null)) ?? 0);
  await setSetting(key(v, ev), String((Number.isFinite(n) ? n : 0) + 1));
}

export async function startCounts(): Promise<Record<StartVariant, Record<StartEvent, number>>> {
  const out = {} as Record<StartVariant, Record<StartEvent, number>>;
  for (const v of START_VARIANTS) {
    out[v] = {} as Record<StartEvent, number>;
    for (const ev of START_EVENTS) out[v][ev] = Number((await getSetting(key(v, ev)).catch(() => null)) ?? 0) || 0;
  }
  return out;
}
