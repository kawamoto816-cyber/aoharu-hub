// 入口ページ (/start) の ABC テスト (2026-11-15 じゅんさんの判断)。
// ねらい：塾とは名乗らず、「塾でしてもらうこと（授業・演習・模試・添削）が無料でそろう」と感じてもらい、無料登録につなげる。
//   A … 「塾に行く前に、まずここで」(保護者にも届く)。下に無料の範囲の表
//   B … 「きょうの時間割、もう組んであります」(生徒向け)
//   C … 「月謝ゼロで、どこまでできる？」(ふつうの塾とくらべる表)
// ふり分けは端末ごと (localStorage)。?v=a|b|c は確認用 (覚えない・数えない)。
// 数え方：表示 view・ボタン cta・登録の完了 signup を app_settings に足していく (lib/start/counter.ts)。
// 登録の完了は components/SignUpTracker.tsx が、14日以内に /start を見た端末なら、その案として数える。

export const START_VARIANTS = ["a", "b", "c"] as const;
export type StartVariant = (typeof START_VARIANTS)[number];
export const START_EVENTS = ["view", "cta", "signup"] as const;
export type StartEvent = (typeof START_EVENTS)[number];

export const START_TEST_START = "2026-11-16";
const KEY = "aoharu.start.ab.v1";
const WINDOW_MS = 14 * 86_400_000;

export const isVariant = (v: unknown): v is StartVariant => typeof v === "string" && (START_VARIANTS as readonly string[]).includes(v);

/** この端末の案 (なければ等分にふり分けて覚える)。localStorage が使えなければ、その回だけふり分ける */
export function assignVariant(): StartVariant {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as { v?: string; at?: number };
      if (isVariant(p.v)) {
        window.localStorage.setItem(KEY, JSON.stringify({ v: p.v, at: Date.now() }));
        return p.v;
      }
    }
  } catch {
    // 読めなければふり分けなおす
  }
  const v = START_VARIANTS[Math.floor(Math.random() * START_VARIANTS.length)];
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ v, at: Date.now() }));
  } catch {
    // 覚えられない環境でもその回は出す
  }
  return v;
}

/** 14日以内に /start を見た端末なら、その案 */
export function recentVariant(): StartVariant | null {
  try {
    const p = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as { v?: string; at?: number } | null;
    if (p && isVariant(p.v) && typeof p.at === "number" && Date.now() - p.at < WINDOW_MS) return p.v;
  } catch {
    // 読めなければ数えない
  }
  return null;
}

let counting = true;
/** 確認用の表示 (?v=) では数えない */
export function setStartCounting(on: boolean) {
  counting = on;
}

/** 数える (失敗しても画面は止めない) */
export function sendStartEvent(v: StartVariant, ev: StartEvent) {
  if (!counting) return;
  try {
    const body = JSON.stringify({ v, ev });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/start/ab", new Blob([body], { type: "application/json" }));
    else void fetch("/api/start/ab", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch {
    // 数えられなくても動く
  }
}
