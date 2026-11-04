// 声で説明（ファインマン法）の試作（2026-11-04 代表承認。11月中に完成。最終形は Gemini で文字起こしと判定）。
// 生徒が単元を1〜2分で声で説明する → 文字に起こす → その単元の要点のうち「言えたもの・あいまいなもの・まだのもの」を返す。
//   - 文字起こし：いまはブラウザの Web Speech API（ja-JP）。使えないブラウザでは「文字で書いて説明する」。
//     音声はこのアプリのサーバーに送らない・保存しない（送るのは起こした文字だけ）。
//   - 要点表はレクチャーのデータから機械的に作る（points.ts）。AIには正解の文を作らせない。
//   - 判定のプロバイダは差しかえられる（judge.ts。KOE_PROVIDER = claude（既定）| gemini）。
//   - 説明の文は保存しない・ログに出さない（画面の state にだけ持つ）。
// このファイルはクライアントとサーバーの両方で使う。
//   要点表: points.ts ／ 依頼文: prompt.ts ／ 判定の呼び出し: judge.ts ／ 一言の点検: guard.ts ／ 回数: limits.ts ／ AIなしの判定: mock.ts

/** 録音の上限（秒） */
export const MAX_SECONDS = 120;
/** 説明の文字数の上限（2分話して 600字くらい。少し余裕をみる） */
export const MAX_TEXT = 800;
/** 説明の文字数の下限（これより短いと判定しない） */
export const MIN_TEXT = 15;

/** 要点ひとつ（レクチャーの節の見出しと、本文の {{ }} の語句） */
export interface KoePoint {
  index: number;
  /** もとの節の番号（0から） */
  section: number;
  /** 見出し（強調・ルビは外したもの） */
  label: string;
  /** 本文で強調された語句（最大4つ） */
  words: string[];
}

export type PointStatus = "said" | "vague" | "missing";
export const isPointStatus = (v: unknown): v is PointStatus => v === "said" || v === "vague" || v === "missing";

/** 判定（AI・AIなし共通の形） */
export interface KoeJudge {
  /** 要点ごとの判定（points と同じ順） */
  status: PointStatus[];
  /** 説明でまちがっている所（あれば1つ）。quote は生徒の言葉、textbook は教科書（レクチャー）の言葉 */
  mistake: { quote: string; textbook: string; point: number | null } | null;
  /** 次に足すとよいこと（一言） */
  next: string;
}

/** POST /api/koe の返事 */
export interface KoeResponse {
  points?: { index: number; section: number; label: string; words: string[]; status: PointStatus }[];
  mistake?: KoeJudge["mistake"];
  next?: string;
  /** 相談窓口を出す（AIには送っていない） */
  sos?: boolean;
  /** 乱暴な言葉だったので判定しなかった */
  refused?: boolean;
  /** きょうの残り回数（判定できたとき） */
  remaining?: number;
  /** AIなしの判定（?mock=1） */
  mock?: boolean;
}

export const STATUS_LABEL: Record<PointStatus, { normal: string; low: string }> = {
  said: { normal: "言えた", low: "いえた" },
  vague: { normal: "あいまい", low: "もうすこし" },
  missing: { normal: "まだ", low: "まだ" },
};

export const lines = {
  intro: (low: boolean) =>
    low
      ? "この たんげんで ならった ことを、ともだちに おしえる つもりで 1〜2ふん はなして みよう。AIが「いえた ところ」を みるよ。"
      : "この単元で学んだことを、友だちに教えるつもりで1〜2分、声で説明してみよう。AIが「言えた要点」と「まだの要点」を見ます。",
  textIntro: (low: boolean) =>
    low ? "この ブラウザでは こえで できないので、もじで かいて せつめい してね。" : "このブラウザでは声の文字起こしが使えません。文字で書いて説明してね。",
  tooShort: (low: boolean) => (low ? "もう すこし ながく せつめい して みよう。" : "もう少し長く説明してみよう。"),
  unjudged: (low: boolean) => (low ? "うまく みられませんでした。もう いちど ためしてね。" : "判定できませんでした。少しまってから、もう一度ためしてね。"),
  refused: (low: boolean) => (low ? "ここには、たんげんの せつめいを はなしてね。" : "ここには、単元の説明を話してね。"),
  notice: (low: boolean) =>
    low
      ? "みるのは AIです。まちがう ことも あります。こえは この アプリには おくらず、もじだけ おくります。どこにも ほぞん しません。なまえは いわないでね。"
      : "判定はAIです。まちがうこともあります。声（音声）はこのアプリのサーバーに送らず、起こした文字だけを送ります。どこにも保存しません。名前や学校名は言わないでね。",
};

/** 判定に合わせた定型の一言（AIの一言に答えの文が入っていたときの差しかえ・AIなしの判定で使う） */
export function templateNext(points: KoePoint[], status: PointStatus[], low: boolean): string {
  const miss = points.find((_, i) => status[i] === "missing");
  if (miss) return low ? `「${miss.label}」の ことも、じぶんの ことばで いって みよう。` : `「${miss.label}」のことも、自分の言葉で足してみよう。`;
  const vague = points.find((_, i) => status[i] === "vague");
  if (vague) return low ? `「${vague.label}」の ところを、もう すこし くわしく いって みよう。` : `「${vague.label}」のところを、もう少しくわしく説明してみよう。`;
  return low ? "ぜんぶ いえたね。こんどは「なぜ そう なるのか」も いって みよう。" : "要点は全部言えたね。こんどは「なぜそうなるのか」も説明してみよう。";
}
