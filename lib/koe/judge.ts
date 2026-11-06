import "server-only";
import { recordAiCost, type AiUsage } from "@/lib/ai-budget";
import { APP_KEYS } from "@/lib/aoharu-entitlements/config/plans";
import type { Lecture } from "@/lib/lecture/types";
import { textbookOf, quoteInText } from "./guard";
import type { KoeJudge, KoePoint } from "./index";
import { RETRY, koeSystem, koeUser, parseKoe } from "./prompt";

// 声で説明の判定の呼び出し（サーバーだけ）。プロバイダを差しかえられるようにする。
//   既定は gemini（GEMINI_API_KEY か GOOGLE_PLACES_API_KEY・KOE_GEMINI_MODEL 既定 gemini-2.5-flash。Generative Language API の generateContent）。
//   KOE_PROVIDER=claude で Claude（KOE_MODEL 既定 claude-haiku-4-5）に固定。gemini が失敗した回は Claude で判定する。
//   - max_tokens 400・依頼文（system）は claude ではキャッシュする（gemini は暗黙のキャッシュにまかせる）。
//   - 運営の月のAI予算に記録する（app "koe"。本文は残さない）。予算の確認 checkAiBudget はルートで呼ぶ。
//   - JSONが崩れたら1回だけ頼み直す。だめなら bad_output。
//   - 生徒の説明は保存しない・ログに出さない。
// 最終形（11月中）は Gemini で文字起こしもする予定。そのときは音声を受ける別の入口を足し、判定はこのまま使う。

export type KoeProvider = "claude" | "gemini";

const APP = APP_KEYS.KOE;
const MAX_TOKENS = 400;
const CLAUDE_MODEL = () => process.env.KOE_MODEL ?? "claude-haiku-4-5";
const GEMINI_MODEL = () => process.env.KOE_GEMINI_MODEL ?? "gemini-2.5-flash";

/** Gemini の鍵（GEMINI_API_KEY が無ければ、Generative Language API を有効にした Google の鍵 GOOGLE_PLACES_API_KEY を使う。代表確認 2026-11-06） */
const geminiKey = () => process.env.GEMINI_API_KEY || process.env.GOOGLE_PLACES_API_KEY || "";

/** env から使うプロバイダを決める。既定は gemini（鍵があれば）。KOE_PROVIDER=claude で Claude に固定できる */
export function koeProvider(): KoeProvider {
  if (process.env.KOE_PROVIDER === "claude") return "claude";
  return geminiKey() ? "gemini" : "claude";
}

/** 判定できる状態か（使うプロバイダの鍵があるか） */
export function koeConfigured(provider: KoeProvider = koeProvider()): boolean {
  return provider === "gemini" ? !!geminiKey() || !!process.env.ANTHROPIC_API_KEY : !!process.env.ANTHROPIC_API_KEY;
}

type CallOpts = { system: string; user: string; userId: string | null; action: string };
type Call = (o: CallOpts) => Promise<string>;

const callClaude: Call = async (opts) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("not_configured");
  const model = CLAUDE_MODEL();
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model,
      max_tokens: MAX_TOKENS,
      // 毎回同じ固定部分（判定の決まり・単元のレクチャー・要点）はキャッシュする
      system: [{ type: "text", text: opts.system, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: opts.user }],
    }),
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}`);
  const json = (await res.json()) as { content?: { type: string; text?: string }[]; usage?: AiUsage };
  void recordAiCost({ app: APP, action: opts.action, model, usage: json.usage, userId: opts.userId });
  return (json.content ?? []).map((c) => c.text ?? "").join("");
};

const callGemini: Call = async (opts) => {
  const apiKey = geminiKey();
  if (!apiKey) throw new Error("not_configured");
  const model = GEMINI_MODEL();
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": apiKey, "content-type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: opts.system }] },
      contents: [{ role: "user", parts: [{ text: opts.user }] }],
      generationConfig: {
        maxOutputTokens: MAX_TOKENS,
        temperature: 0,
        responseMimeType: "application/json",
        // 2.5 系は考える時間（thinking）が既定で入る。判定には要らないので切る（費用と待ち時間のため）
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  const json = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
    usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number; cachedContentTokenCount?: number; thoughtsTokenCount?: number };
  };
  const u = json.usageMetadata ?? {};
  const cached = u.cachedContentTokenCount ?? 0;
  const usage: AiUsage = {
    input_tokens: Math.max(0, (u.promptTokenCount ?? 0) - cached),
    cache_read_input_tokens: cached,
    output_tokens: (u.candidatesTokenCount ?? 0) + (u.thoughtsTokenCount ?? 0),
  };
  void recordAiCost({ app: APP, action: opts.action, model, usage, userId: opts.userId });
  return (json.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("");
};

export interface JudgeInput {
  lec: Lecture;
  points: KoePoint[];
  text: string;
  low: boolean;
  userId: string | null;
  /** AI を呼ぶ前に毎回呼ぶ（全体の上限の確認。false なら止める） */
  beforeCall: () => boolean;
}

/**
 * 判定する関数を返す。provider を省くと env（KOE_PROVIDER）で決める。
 * まちがいの引用が説明にないときは捨て、教科書の言葉はレクチャーのデータから出す。一言の点検（guardNext）はルートで通す。
 */
export function judge(provider: KoeProvider = koeProvider()): (input: JudgeInput) => Promise<KoeJudge> {
  // Gemini が失敗したとき（鍵の制限・混雑など）は、その回だけ Claude で判定する（Claude の鍵があれば）
  const call: Call =
    provider === "gemini"
      ? async (o) => {
          try {
            return await callGemini(o);
          } catch (e) {
            if (!process.env.ANTHROPIC_API_KEY) throw e;
            console.warn("[koe] gemini failed, using claude:", e instanceof Error ? e.message : e);
            return callClaude(o);
          }
        }
      : callClaude;
  return async ({ lec, points, text, low, userId, beforeCall }) => {
    const system = koeSystem(lec, points, low);
    const user = koeUser(text);
    if (!beforeCall()) throw new Error("limit_daily");
    let raw;
    try {
      raw = parseKoe(await call({ system, user, userId, action: "judge" }), points.length);
    } catch (e) {
      if (!(e instanceof Error) || e.message !== "bad_output") throw e;
      if (!beforeCall()) throw new Error("limit_daily");
      raw = parseKoe(await call({ system, user: user + RETRY, userId, action: "judge_retry" }), points.length);
    }
    let mistake: KoeJudge["mistake"] = null;
    if (raw.mistake && quoteInText(raw.mistake.quote, text)) {
      const t = textbookOf(lec, points, raw.mistake.ref);
      if (t) mistake = { quote: raw.mistake.quote, ...t };
    }
    return { status: raw.status, mistake, next: raw.next };
  };
}
