// なぜなぜ先生（問い返しで考えさせるAI）。図解レクチャーの単元ページで、生徒の「ここがわからない」に
// 答えを言わずに「なぜそうなると思う？」と問いを重ねる。2026-11-04 代表承認。
// このファイルはクライアントとサーバーの両方で使う（レクチャーのデータは読みこまない）。
//   - サーバーの依頼文と呼び出し: prompt.ts ／ 答えの点検: guard.ts ／ 回数: limits.ts ／ 台本モード: mock.ts
//   - 会話本文は保存しない・ログに出さない（画面の state にだけ持つ）。

/** 1回の会話のやりとりの上限（生徒の発言の数） */
export const MAX_EXCHANGES = 6;
/** 生徒が「わからない」を何回続けたら、節への案内を出すか */
export const STUCK_LIMIT = 3;
/** 生徒の1回の発言の文字数の上限 */
export const MAX_INPUT = 200;

/** 会話の1発言（クライアントとサーバーでやりとりする形。サーバーには保存しない） */
export interface NazeTurn {
  role: "student" | "sensei";
  text: string;
}

/** 節への案内（答えは言わず、見出しとリンクだけ） */
export interface NazeGuide {
  sectionIndex: number;
  title: string;
}

/** POST /api/naze の返事 */
export interface NazeResponse {
  reply: string;
  guide?: NazeGuide;
  /** この回はここまで（6往復・SOS・乱暴な言葉のくり返し） */
  ended?: boolean;
  /** 相談窓口を出す */
  sos?: boolean;
  /** 会話を始めたときにサーバーが渡す札。2回目からは送り返す */
  session?: string;
  /** 会話を始めたときの、きょうの残り回数 */
  remaining?: number;
  /** 台本モード（AIなし）の返事 */
  mock?: boolean;
}

/** 小1〜小3 の単元（ひらがな多めの言い回しにする）。e-<教科>-1|2|3-… の単元id */
export const isLowUnit = (unit: string) => /^e-[a-z]+-[123]-/.test(unit);

/** {{ }} の強調の印と《ルビ》を外す */
export const plain = (s: string) => s.replace(/\{\{|\}\}/g, "").replace(/《[^》]*》/g, "");

// 「わからない」の言い方。短い発言で、ほぼこれだけのときに「つまった」と数える
const STUCK_RE = /わから(ない|ん|な)|わかんな|分から(ない|ん)|分かんな|しらない|知らない|むり|無理|さっぱり|ぜんぜん|全然|おしえて|教えて|こたえ(は|を)|答え(は|を)|^[?？]+$|^(え|ん|う[ーん]*|は|\.+|…+)[?？!！。]*$/;

/** 生徒の発言が「わからない」「答えを教えて」のたぐいか */
export function isStuck(text: string): boolean {
  const t = text.replace(/\s+/g, "");
  if (!t) return true;
  return t.length <= 24 && STUCK_RE.test(t);
}

/** 生徒の発言のうち、何回つまったか（最初の「ここがわからない」は数えない） */
export function stuckCount(turns: NazeTurn[]): number {
  return turns.filter((t, i) => t.role === "student" && i > 0 && isStuck(t.text)).length;
}

export const lines = {
  intro: (low: boolean) =>
    low
      ? "AIの せんせいです。こたえは いいません。「なぜ？」を いっしょに かんがえよう。どこが わからないか かいてね。"
      : "AIの先生です。答えは言いません。「なぜ？」をいっしょに考えよう。どこがわからないか書いてね。",
  offtopic: (low: boolean) => (low ? "この たんげんの ことだけ てつだえます。この たんげんで わからない ところを おしえてね。" : "この単元のことだけ手伝えます。この単元でわからないところを教えてね。"),
  end: (low: boolean) => (low ? "きょうは ここまで。よく かんがえたね。もう いちど レクチャーを よんで みよう。" : "今回はここまで。よく考えたね。もう一度レクチャーを読んで、自分の言葉でたしかめてみよう。"),
  guide: (low: boolean) => (low ? "ここを もう いちど よんで みよう" : "ここをもう一度読んでみよう"),
};
