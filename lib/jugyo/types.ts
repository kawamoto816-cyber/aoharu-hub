// AI時代のあたらしい授業「止まる授業」（動画型・試作）の台本の型。
// 2人の掛け合い（ラジオ授業のように）で、図解レクチャー (lib/lecture) の1単元を話す。
// とちゅうで説明役が「ここで問題」と本当に止まり、見ている人が答えてから進む。
// 事実は lecture の本文（body・reading・reveal・mistakes・check・figure）にあるものだけ。点検は scripts/check-jugyo.ts。
//
// キャスト（キャラの組み合わせ）：lib/jugyo/cast.ts。学年の段階（小・中・高）ごとに数組あり、ABテストでふり分ける。
// 台本の持ち方：単元ごとに共通の骨組み（data/<単元>.ts の「問題」= pause。lecture から引いた答えとわけ）と、
// キャストごとのせりふ（data/<単元>.<キャストid>.ts。問題は { kind: "pause", ref } で骨組みから引く）。
// 黒板（board）は lecture の図を指すだけなので、どのキャストも同じ図を使う。

/** 話す人。sensei = 説明役（問題を出す人）、seito = 相方（よくあるまちがいを口にする役） */
export type Who = "sensei" | "seito";

/** 学年の段階：e = 小学校、j = 中学校、h = 高校 */
export type Stage = "e" | "j" | "h";

/** 画面の黒板に出すもの：lecture の sections[section] の図。 */
export interface Board {
  /** lecture の sections の番号（0から） */
  section: number;
  /** その節の何番目の図か（いまは1節に図は1つなので 0）。省くと 0 */
  figure?: number;
  /** 図の中で強調する箱のラベル（図の中の字と同じ文字。ルビ《》と {{ }} は書かない） */
  focus?: string;
}

/** せりふ */
export interface TalkScene {
  kind: "talk";
  who: Who;
  /** 画面の字幕。ルビ記法（漢字《かんじ》）・{{強調}} は lecture と同じ */
  text: string;
  /** 読み（音声で読ませる文）。省くと text からルビの読み・{{ }} を外して作る */
  say?: string;
  /** 黒板。省くと前の黒板のまま */
  board?: Board;
  /** 黒板に図の代わりに出すカード（mystery = 依頼と謎、reveal = 謎の答え）。board より優先 */
  card?: "mystery" | "reveal";
}

export type PauseSource = `check:${number}` | `mistake:${number}`;

/** 説明役が止まって出す問題。answer と why は lecture のデータからそのまま引く */
export interface PauseScene {
  kind: "pause";
  /** 問い。{seito} は相方の名前に置きかわる（例「{seito}さんの『…』。正しいのはどちら？」） */
  question: string;
  /** 選択肢（タップで答える）。省くと記述（「答えを考えたら次へ」→答えとわけ） */
  choices?: string[];
  answer: string;
  why: string;
  /** 出どころ：check:i = lecture.check[i]、mistake:i = lecture.mistakes[i]（answer は right） */
  source: PauseSource;
  /**
   * 読み（説明役の声で読み上げる文）。省いたところは画面の文からルビ・{{ }} を外して読む。
   * 記号・数式（＝ ÷ × など）や読みまちがう語があるときに書く。choices は choices と同じ順・同じ数。
   * 読み上げは lib/jugyo/audio.ts の jugyoPauseAudio（「問題。〈問い〉 1、〈選択肢〉。…」と、答えたあとの「答えは、〈答え〉。〈わけ〉」）
   */
  say?: { question?: string; choices?: string[]; answer?: string; why?: string };
}

/** 節の区切り（シークバーのチャプター） */
export interface ChapterScene {
  kind: "chapter";
  title: string;
}

export type Scene = TalkScene | PauseScene | ChapterScene;

/** キャストの台本の中の問題：単元の骨組み（UnitBase.pauses）から ref で引く */
export interface PauseRef {
  kind: "pause";
  ref: PauseSource;
}
export type ScriptScene = TalkScene | ChapterScene | PauseRef;

/** 単元の共通の骨組み：問題（lecture から引いた答えとわけ・読み） */
export interface UnitBase {
  unitId: string;
  /** 出どころ → 問題（kind・source は ref から入る） */
  pauses: Partial<Record<PauseSource, Omit<PauseScene, "kind" | "source">>>;
}

/** キャストごとのせりふ */
export interface CastScript {
  unitId: string;
  castId: string;
  /** 授業のタイトル（ルビ可） */
  title: string;
  scenes: ScriptScene[];
}

/** アバターの見た目（components/jugyo/Avatar.tsx のオリジナルの図形） */
export type Look =
  | "tokiwa"
  | "minori"
  | "milpo"
  | "chapi"
  | "yotobari"
  | "mikage"
  | "asahi"
  | "sumire"
  | "kaname"
  | "yuki"
  | "chigusa"
  | "mio"
  | "daichi"
  | "kaede";

/** 出演者（オリジナルのキャラクター） */
export interface CastMember {
  name: string;
  /** 名前の読み */
  yomi: string;
  /** ひとことの紹介 */
  role: string;
  look: Look;
  /** 声（"vv:VOICEVOX のキャラ名"。スタイルはノーマル）と速さ（speedScale） */
  voice: string;
  rate: number;
}

/** キャスト（キャラの組み合わせ） */
export interface Cast {
  /** 例 "e-pop"。?cast=<id> で指定できる */
  id: string;
  stage: Stage;
  /** 段階の中の記号（A・B・C） */
  label: string;
  /** ジャンルの名前（例「ポップ掛け合い」） */
  name: string;
  /** 説明（ジャンル） */
  genre: string;
  members: Record<Who, CastMember>;
  /** 口調のルール（台本を書く人向けの短いガイド） */
  rules: string[];
  /** ふり分けの重み（同じ段階の中での割合） */
  weight: number;
}

/** 1本の授業（単元 × キャスト）。台本と骨組みを合わせたもの（lib/jugyo/index.ts の buildLesson） */
export interface Lesson {
  unitId: string;
  stage: Stage;
  title: string;
  cast: Cast;
  scenes: Scene[];
}
