"use client";

// ゼロワンOSユース版：スキルカード（ユニゼブ v3 のエンジンをほぼそのまま動かす入れ物）。
// エンジン（public/media/unizeb/v3/engine.js）は .uz-v3 の中の #bizbar と #main に描く。
// ここでやるのは「つなぎ目」だけ：データを渡す・保存を client.ts の saveState へ・AI を client.ts の grade / askAi へ・URL とカードの対応。

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Dela_Gothic_One, IBM_Plex_Mono } from "next/font/google";
import { zen } from "@/components/landing/fonts";
import { grade, askAi, loadState, saveState, type GradeResult, type SkillAsset, type UzState } from "@/lib/unizeb/client";

const dela = Dela_Gothic_One({ weight: "400", subsets: ["latin"], display: "swap", preload: false });
const plex = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], display: "swap", preload: false });

const BASE = "/media/unizeb/v3";
const HOME = "/learn/unizeb";

type V3Card = { id: string; lv: number; name: string; pass: number; crit: { w: number }[]; fields?: { k: string }[] };
type Ctx = { id: string; lv: number; pass: number; crit: number[]; f: Record<string, unknown>; as: Record<string, unknown>; seed: unknown; short: boolean; texts: Record<string, string> };
type RenderInfo = { id: string; step: number; board: boolean; seed: boolean; result: { pass: boolean; total: number; error: boolean } | null };
type SampleFn = ((p: string, o?: unknown) => Promise<{ text: string }>) & { json: (p: string, o?: unknown) => Promise<unknown> };
type Bridge = {
  startId?: string;
  startBoard?: boolean;
  get: (k: string) => unknown;
  put: (k: string, v: unknown) => void;
  sample: (ctx: () => Ctx) => SampleFn;
  onRender: (r: RenderInfo) => void;
};
declare global {
  interface Window {
    uzV3Bridge?: Bridge;
  }
}

const err = (code: string, text?: string) => Object.assign(new Error(code), { code, text });
const isGradePrompt = (p: string) => p.startsWith("あなたは「ユニゼブ");
const isSeedPrompt = (p: string) => p.startsWith("あなたは高校生向けの起業学習プログラム");
const today = () => new Date(Date.now() + 9 * 3600e3 - 5 * 3600e3).toISOString().slice(0, 10);

/** client.ts の GradeResult を、エンジンの grade() が読む JSON の形にする（点と合否はエンジン＝本番はサーバーが計算） */
function toEngineJson(r: GradeResult, n: number) {
  if (r.error) throw err(/上限|limit|429/i.test(r.error) ? "rate_limited" : "api_error");
  const crit = r.crit.slice(0, n).map((c) => ({ score: c.score, quote: c.quote ?? "", good: c.good ?? "", fix: c.fix ?? "" }));
  const ri = r.rewrite ? Math.max(1, r.crit.findIndex((c) => c.key === r.rewrite!.key) + 1 || Number(r.rewrite.key) || 1) : 1;
  return {
    crit,
    knockout: { hit: !!r.ko, reason: r.ko ?? "" },
    praise: "",
    rewrite: r.rewrite ? { crit: ri, before: r.rewrite.before, after: r.rewrite.after } : null,
  };
}

export function V3App({ startId, startBoard = false, pro = false, lectureIds = [] }: { startId?: string; startBoard?: boolean; pro?: boolean; lectureIds?: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [proMissing, setProMissing] = useState(false);

  useEffect(() => {
    let alive = true;
    const host = root.current!;
    const listeners: [string, EventListenerOrEventListenerObject, boolean | AddEventListenerOptions | undefined][] = [];
    const added: HTMLElement[] = [];
    let state: UzState = { assets: [] };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const lastAnswers = new Map<string, { texts: Record<string, string>; sample: boolean }>();
    const lec = new Set(lectureIds);
    let cards: V3Card[] = [];

    const flush = () => {
      clearTimeout(timer);
      timer = undefined;
      void saveState(state);
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(flush, 500);
    };

    /** 合格したカードを、スキルアセット（合格した答案の一覧）に入れる */
    const recordPasses = (prev: Record<string, { passed?: number }> | undefined, next: Record<string, { passed?: number }>) => {
      for (const [id, v] of Object.entries(next)) {
        if (!v?.passed || prev?.[id]?.passed === v.passed) continue;
        const a = lastAnswers.get(id);
        const c = cards.find((x) => x.id === id);
        if (!a || !c) continue;
        const key = `card:${id}`;
        const old = state.assets.find((x) => x.key === key);
        if (old && !old.sample && a.sample) continue;
        if (old && old.sample === a.sample && old.score >= v.passed) continue;
        const asset: SkillAsset = { key, kind: "card", title: c.name, lv: c.lv, skills: [id], score: v.passed, pass: c.pass, date: today(), answers: a.texts, ...(a.sample ? { sample: true } : {}) };
        state = { ...state, assets: [...state.assets.filter((x) => x.key !== key), asset] };
      }
    };

    const bridge: Bridge = {
      startId,
      startBoard,
      get: (k) => (state.v3 ?? {})[k] ?? null,
      put: (k, v) => {
        if (!alive) return;
        const v3 = { ...(state.v3 ?? {}) };
        if (k === "uz3_card") recordPasses(v3[k] as Record<string, { passed?: number }>, v as Record<string, { passed?: number }>);
        v3[k] = v;
        state = { ...state, v3 };
        schedule();
      },
      sample: (ctx) => {
        const never = new Promise<never>(() => {});
        const run = async (p: string): Promise<unknown> => {
          const c = ctx();
          if (isGradePrompt(p)) {
            const answers: Record<string, string> = {
              ...c.texts,
              _f: JSON.stringify(c.f ?? {}),
              _as: JSON.stringify(c.as ?? {}),
              _seed: JSON.stringify(c.seed ?? null),
              ...(c.short ? { _short: "1" } : {}),
            };
            const all = Object.values(c.texts).join("\n");
            const minChars = Math.max(40, 25 * Object.keys(c.texts).length);
            const r = await grade({ kind: "card", id: c.id, answers: { ...answers, _all: all } }, c.crit.map((_, i) => ({ key: `_all-${i + 1}`, minChars })));
            if (!alive) return never;
            lastAnswers.set(c.id, { texts: c.texts, sample: !!r.sample });
            return toEngineJson(r, c.crit.length);
          }
          const r = await askAi({ id: isSeedPrompt(p) ? "seeds" : c.id, prompt: p });
          if (!alive) return never;
          if ("error" in r) throw err("cancelled");
          return r;
        };
        const fn = (async (p: string) => {
          const r = await run(p);
          if (r && typeof r === "object" && "text" in r) return r as { text: string };
          return { text: JSON.stringify(r) };
        }) as SampleFn;
        fn.json = async (p: string) => {
          const r = await run(p);
          if (r && typeof r === "object" && "text" in r) {
            const t = String((r as { text: string }).text);
            try {
              return JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1));
            } catch {
              throw err("bad_json", t);
            }
          }
          return r;
        };
        return Promise.resolve(fn) as unknown as SampleFn;
      },
      onRender: (r) => {
        if (!alive) return;
        // URL をいま見ているもの（カード・ボード）に合わせる
        const path = r.board ? `${HOME}/board` : `${HOME}/card/${r.id}`;
        if (r.seed && location.pathname !== path) history.replaceState(history.state, "", path);
        const main = host.querySelector("#main");
        const sec = main?.querySelector(":scope > section");
        if (!sec || r.board) return;
        // 「つかむ」の上に図解レクチャーへの案内（レクチャーがあるカードだけ）
        if (r.step === 0 && lec.has(r.id)) {
          const a = document.createElement("a");
          a.className = "uzlec";
          a.href = `${HOME}/lec/${r.id}`;
          a.textContent = "図解レクチャーを読む →";
          sec.prepend(a);
        }
        if (r.step === 3 && r.result && !r.result.error && lastAnswers.get(r.id)?.sample) {
          const p = document.createElement("p");
          p.className = "uzsample";
          p.style.margin = "0";
          p.textContent = "いまは見本の採点です（答えの長さだけで付けた目安）。AI採点の準備ができたら、本番の採点に切りかわります。";
          sec.prepend(p);
        }
      },
    };

    (async () => {
      try {
        const [free, plan, refs, loaded, code] = await Promise.all([
          fetch(`${BASE}/cards-free.json`).then((r) => r.json() as Promise<V3Card[]>),
          fetch(`${BASE}/plan.json`).then((r) => r.json()),
          fetch(`${BASE}/refs.json`).then((r) => r.json()),
          loadState(),
          fetch(`${BASE}/engine.js`).then((r) => r.text()),
        ]);
        if (!alive) return;
        state = { ...loaded, assets: loaded.assets ?? [] };
        // Lv4 以降は /api/unizeb/state が Max の人にだけ cardsPro で返す想定
        const cp = (loaded as UzState & { cardsPro?: V3Card[] }).cardsPro;
        if (pro && !Array.isArray(cp)) setProMissing(true);
        cards = [...free, ...(Array.isArray(cp) ? cp : [])];
        const sid = startId && cards.some((c) => c.id === startId) ? startId : undefined;
        bridge.startId = sid;

        const data = (id: string, v: unknown) => {
          const s = document.createElement("script");
          s.type = "application/json";
          s.id = id;
          s.textContent = JSON.stringify(v).replace(/<\//g, "<\\/");
          host.appendChild(s);
          added.push(s);
        };
        data("cards", cards);
        data("plan", plan);
        data("refs", refs);

        window.uzV3Bridge = bridge;
        // エンジンが document に付ける受け取り口を覚えておき、ページを離れるときに外す
        const orig = document.addEventListener;
        document.addEventListener = function (this: Document, t: string, l: EventListenerOrEventListenerObject, o?: boolean | AddEventListenerOptions) {
          listeners.push([t, l, o]);
          return orig.call(this, t, l, o);
        } as typeof document.addEventListener;
        try {
          const s = document.createElement("script");
          s.textContent = code + "\n//# sourceURL=unizeb-v3-engine.js";
          host.appendChild(s);
          added.push(s);
        } finally {
          document.addEventListener = orig;
        }
        setStatus("ready");
      } catch {
        if (alive) setStatus("error");
      }
    })();

    const onHide = () => timer && flush();
    window.addEventListener("pagehide", onHide);
    return () => {
      alive = false;
      if (timer) flush();
      window.removeEventListener("pagehide", onHide);
      listeners.forEach(([t, l, o]) => document.removeEventListener(t, l, o));
      added.forEach((el) => el.remove());
      if (window.uzV3Bridge === bridge) delete window.uzV3Bridge;
    };
    // 開いたときの一度だけ（カードの切りかえはエンジンの中で行う）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <link rel="stylesheet" href={`${BASE}/style.css`} precedence="default" />
      <div
        ref={root}
        className="uz-v3"
        style={{ "--uz-f-display": dela.style.fontFamily, "--uz-f-mono": plex.style.fontFamily, "--uz-f-body": zen.style.fontFamily } as CSSProperties}
      >
        {status === "loading" && <p className="dim" style={{ margin: 0 }}>スキルカードを読み込んでいます…</p>}
        {status === "error" && <p className="dim" style={{ margin: 0 }}>読み込めませんでした。通信を確かめて、もう一度開いてください。</p>}
        {proMissing && (
          <p className="uzsample" style={{ margin: 0 }}>
            Lv4〜15 のカードは Max で開きます。いまは Lv1〜3 のカードを出しています。
          </p>
        )}
        <div id="bizbar" />
        <div id="main" />
        {status === "ready" && !pro && (
          <p className="dim" style={{ margin: 0 }}>
            Lv1〜3 の24枚はだれでも使えます。Lv4〜15 のカードは Max で開きます（図解レクチャーは Pro で読めます）。
          </p>
        )}
      </div>
    </>
  );
}
