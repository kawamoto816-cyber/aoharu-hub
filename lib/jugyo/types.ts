// AI時代のあたらしい授業「止まる授業」（動画型・試作）の台本の型。
// 先生と生徒の2人の掛け合い（ラジオ授業のように）で、図解レクチャー (lib/lecture) の1単元を5〜8分で話す。
// 2〜3分ごとに先生が「ここで問題」と本当に止まり、生徒が答えてから進む。
// 事実は lecture の本文（body・reading・reveal・mistakes・check・figure）にあるものだけ。点検は scripts/check-jugyo.ts。

/** 話す人。sensei = 先生、seito = 生徒（よくあるまちがいを口にする役） */
export type Who = "sensei" | "seito";

/** 画面の黒板に出すもの：lecture の sections[section] の図。 */
export interface Board {
  /** lecture の sections の番号（0から） */
  section: number;
  /** その節の何番目の図か（いまは1節に図は1つなので 0）。省くと 0 */
  figure?: number;
  /** 図の中で強調する箱のラベル（図の中の字と同じ文字。ルビ《》と {{ }} は書かない） */
  focus?: string;
}

/** 先生・生徒のせりふ */
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

/** 先生が止まって出す問題。answer と why は lecture のデータからそのまま引く */
export interface PauseScene {
  kind: "pause";
  question: string;
  /** 選択肢（タップで答える）。省くと記述（「答えを考えたら次へ」→答えとわけ） */
  choices?: string[];
  answer: string;
  why: string;
  /** 出どころ：check:i = lecture.check[i]、mistake:i = lecture.mistakes[i]（answer は right） */
  source: `check:${number}` | `mistake:${number}`;
  /**
   * 読み（先生の声で読み上げる文）。省いたところは画面の文からルビ・{{ }} を外して読む。
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

/** 出演者（オリジナルのキャラクター） */
export interface CastMember {
  name: string;
  /** 名前の読み（音声の「名前」を読むときなど） */
  yomi: string;
  /** ひとことの紹介 */
  role: string;
}

export interface Lesson {
  /** lecture の単元 id */
  unitId: string;
  /** 授業のタイトル（ルビ可） */
  title: string;
  cast: Record<Who, CastMember>;
  scenes: Scene[];
}
