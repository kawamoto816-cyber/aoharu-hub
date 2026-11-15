import type { ModeId } from "./types";

// 「公立高校入試模試」(/learn/koko-moshi) と「共通テスト模試」(/learn/kyotsu-moshi)。
// 中身は試験モード (公立高校入試型・共通テスト型) のまま、決まったシードで「第1回・第2回…」の回にして見せる。
// 同じ回は、だれが解いても同じ問題 (友だち・先生と点数をくらべられる)。おまかせはシードなし (毎回ちがう)。
// クライアントからも読む (記録の照合) ので、ここには組み立て (build.ts) を import しない。

export interface Series {
  id: "koko" | "kyotsu";
  mode: ModeId;
  path: string;
  name: string;
  target: string;
  /** 回の数 */
  rounds: number;
  /** 回 → シード (同じ回は同じ問題) */
  seedOf: (n: number) => number;
}

export const SERIES: Record<Series["id"], Series> = {
  koko: { id: "koko", mode: "koritsu", path: "/learn/koko-moshi", name: "公立高校入試模試", target: "中3向け", rounds: 6, seedOf: (n) => 202700 + n },
  kyotsu: { id: "kyotsu", mode: "kyotsu", path: "/learn/kyotsu-moshi", name: "共通テスト模試", target: "高校向け", rounds: 6, seedOf: (n) => 302700 + n },
};

/** 記録 (ExamAttempt の spec・seed) → 何回目か。どの回でもなければ null */
export function roundOf(s: Series, seed: number): number | null {
  for (let n = 1; n <= s.rounds; n++) if (s.seedOf(n) === seed) return n;
  return null;
}
