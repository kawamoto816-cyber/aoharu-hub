// 「まなぶ」の進み具合。いまはこの端末のブラウザだけに保存する (登録なしでも使えるように)。
// quiz = 三択に正解した（覚えた） / done = テンサクンで試した（習得）
// ブラウザの保存領域が使えない環境では何もしない。

export type CardStatus = "quiz" | "done";
type Progress = Record<string, CardStatus>;

const KEY = "aoharu_learn_v1";
const EVENT = "aoharu-learn-progress";

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

/** 三択に正解した。すでに「習得」なら下げない */
export function markQuiz(id: string) {
  const p = readProgress();
  if (p[id] !== "done") write({ ...p, [id]: "quiz" });
}

/** テンサクンで試した (習得) */
export function markDone(id: string) {
  write({ ...readProgress(), [id]: "done" });
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
