// 「まなぶ」の進み具合。まずこの端末のブラウザに保存し、登録している人はアカウントにも保存する
// (/api/learn/progress。登録前に進めた分も、登録した時点でアカウントへ移る)。
// quiz = 三択に正解した（覚えた） / done = テンサクンで試した（習得）
// ブラウザの保存領域や通信が使えない環境では、できる範囲だけで動く。

export type CardStatus = "quiz" | "done";
type Progress = Record<string, CardStatus>;

const KEY = "aoharu_learn_v1";
const EVENT = "aoharu-learn-progress";
const RANK: Record<CardStatus, number> = { quiz: 1, done: 2 };

export function readProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : {};
    return parsed && typeof parsed === "object" ? (parsed as Progress) : {};
  } catch {
    return {};
  }
}

function write(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* 保存できない環境では何もしない */
  }
}

/** アカウントに送る。未登録 (401) や失敗は気にしない */
function push(entries: Progress) {
  try {
    void fetch("/api/learn/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress: entries }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* 送れない環境では何もしない */
  }
}

/** 三択に正解した。すでに「習得」なら下げない */
export function markQuiz(id: string) {
  const p = readProgress();
  if (p[id] === "done") return;
  write({ ...p, [id]: "quiz" });
  push({ [id]: "quiz" });
}

/** テンサクンで試した (習得) */
export function markDone(id: string) {
  write({ ...readProgress(), [id]: "done" });
  push({ [id]: "done" });
}

/**
 * アカウントの進み具合とこの端末の進み具合を合わせる (ページを開いたときに1回)。
 * 戻り値: 登録しているか (未登録・通信失敗は false)
 */
export async function syncWithAccount(): Promise<boolean> {
  try {
    const res = await fetch("/api/learn/progress", { cache: "no-store" });
    if (!res.ok) return false;
    const json = (await res.json()) as { signedIn?: boolean; saved?: boolean; progress?: Progress };
    if (!json.signedIn) return false;
    const server = json.progress ?? {};
    const local = readProgress();
    const merged: Progress = { ...server };
    for (const [id, st] of Object.entries(local)) {
      if (!merged[id] || RANK[st] > RANK[merged[id]]) merged[id] = st;
    }
    write(merged);
    // この端末にだけあった分 (登録前に進めた分など) をアカウントへ
    const missing: Progress = {};
    for (const [id, st] of Object.entries(merged)) if (server[id] !== st) missing[id] = st;
    if (json.saved && Object.keys(missing).length > 0) push(missing);
    return true;
  } catch {
    return false;
  }
}

/** /tensaku?learn=<カードid> から来たときに、添削の結果が出たら習得にする */
export function learnIdFromLocation(): string | null {
  try {
    const id = new URLSearchParams(window.location.search).get("learn");
    return id && /^[a-z]+-(\d{1,3}|quest)$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function subscribeProgress(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
