import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { upsertContentPatterns, type ContentPatternInput, type PatternType, type Platform, type Strength } from "@/lib/patterns/store";

// 勝ちパターン分析エージェント (週次) が抽出した型を登録する。
//   POST /internal/patterns/save?token=...
//   body: { "patterns": [ { "platform": "x", "pattern_type": "hook", "title": "...", "description": "...", "example_note": "...", "source_url": "...", "strength": "high" }, ... ] }
// platform+title が既存と同じものは上書き更新される (同じ型を毎週観測し続けている、という扱い)。
export const dynamic = "force-dynamic";

const PLATFORMS: Platform[] = ["x", "threads", "instagram", "tiktok", "youtube", "general"];
const TYPES: PatternType[] = ["hook", "structure", "topic", "format", "cta"];
const STRENGTHS: Strength[] = ["high", "medium", "low"];

function parsePattern(raw: unknown): ContentPatternInput | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const platform = typeof r.platform === "string" ? (r.platform as Platform) : null;
  const pattern_type = typeof r.pattern_type === "string" ? (r.pattern_type as PatternType) : null;
  const title = typeof r.title === "string" ? r.title : null;
  const description = typeof r.description === "string" ? r.description : null;
  if (!platform || !PLATFORMS.includes(platform)) return null;
  if (!pattern_type || !TYPES.includes(pattern_type)) return null;
  if (!title?.trim() || !description?.trim()) return null;
  const strength = typeof r.strength === "string" && STRENGTHS.includes(r.strength as Strength) ? (r.strength as Strength) : undefined;
  return {
    platform,
    pattern_type,
    title,
    description,
    example_note: typeof r.example_note === "string" ? r.example_note : null,
    source_url: typeof r.source_url === "string" ? r.source_url : null,
    strength,
  };
}

export async function POST(req: Request) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }
  const list = (body as { patterns?: unknown })?.patterns;
  if (!Array.isArray(list) || list.length === 0) {
    return NextResponse.json({ ok: false, error: "patterns (array) が必要です" }, { status: 400 });
  }
  const parsed: ContentPatternInput[] = [];
  const rejected: unknown[] = [];
  for (const raw of list) {
    const p = parsePattern(raw);
    if (p) parsed.push(p);
    else rejected.push(raw);
  }
  try {
    const { count } = await upsertContentPatterns(parsed);
    return NextResponse.json({ ok: true, saved: count, rejected: rejected.length });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
