import type { Lecture } from "@/lib/lecture/types";
import { plain } from "@/lib/naze";
import type { KoePoint } from "./index";

// 声で説明の要点表。レクチャーのデータから機械的に作る（AIには作らせない）。
//   - 要点 = 節ひとつ。見出し（label）と、その節の本文 body の {{ }} で強調された語句（words、最大4つ）。
//     body に強調がない節は、reading（教科書本文）の {{ }} から取る。
//   - 1単元 4〜8個にする。節は 3〜7個なので、3節の単元は語句のいちばん多い節を2つ（「見出し（つづき）」）に分ける。
//     8個をこえるときは先頭の8個（いまのデータでは起きない）。
//   - 語句は重なりを外し、短すぎる（1字）・長すぎる（30字こえ）ものは外す。
// クライアントでもサーバーでも動く（scripts/koe-selftest.ts で全単元を確かめる）。

export const MIN_POINTS = 4;
export const MAX_POINTS = 8;
const MAX_WORDS = 4;

function emphasized(s: string): string[] {
  return [...s.matchAll(/\{\{(.+?)\}\}/g)].map((m) => plain(m[1]).trim().replace(/[。、．，,]+$/, ""));
}

function termsOf(body: string, reading: string[] = []): string[] {
  const seen = new Set<string>();
  const pick = (list: string[]) => {
    const out: string[] = [];
    for (const t of list) {
      const k = t.replace(/\s+/g, "");
      if (k.length < 2 || k.length > 30 || seen.has(k)) continue;
      seen.add(k);
      out.push(t);
    }
    return out;
  };
  const fromBody = pick(emphasized(body));
  return fromBody.length ? fromBody : pick(reading.flatMap(emphasized));
}

export function keyPoints(lec: Pick<Lecture, "sections">): KoePoint[] {
  type Raw = { section: number; label: string; terms: string[] };
  const raw: Raw[] = lec.sections.map((s, i) => ({ section: i, label: plain(s.heading).trim(), terms: termsOf(s.body, s.reading) }));
  // 少ないときは、語句の多い節を2つに分ける（語句が2つ以上ある節だけ）
  while (raw.length < MIN_POINTS) {
    let best = -1;
    raw.forEach((r, i) => {
      if (r.terms.length >= 2 && !r.label.endsWith("（つづき）") && (best < 0 || r.terms.length > raw[best].terms.length)) best = i;
    });
    if (best < 0) break;
    const r = raw[best];
    const half = Math.ceil(r.terms.length / 2);
    raw.splice(best, 1, { ...r, terms: r.terms.slice(0, half) }, { section: r.section, label: `${r.label}（つづき）`, terms: r.terms.slice(half) });
  }
  return raw.slice(0, MAX_POINTS).map((r, index) => ({ index, section: r.section, label: r.label, words: r.terms.slice(0, MAX_WORDS) }));
}
