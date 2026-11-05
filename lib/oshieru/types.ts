// オシエル（AIの生徒ハルに教える）の型。
// 誤解セット (data/<単元id>.ts) は、その単元の図解レクチャー (lib/lecture/data/<単元id>.ts) の
// 本文・mistakes・check・reveal だけから作る。正しさのものさしはAIの知識ではなく、レクチャーのデータに置く。

/** ハルのまちがいの種類：よくあるまちがい／言葉のかんちがい／理由が言えない */
export type MisconceptionKind = "common" | "term" | "reason";

/** 学年の段階。low=小1〜小3（ひらがな中心・2文まで）、mid=小4〜中学、high=高校 */
export type GradeBand = "low" | "mid" | "high";

export interface Misconception {
  /** レクチャーの mistakes の番号（0始まり）。理由型で本文・reveal から作ったものは null */
  mistake: number | null;
  /** mistake が null のとき、もとにした節の番号（0始まり） */
  section?: number;
  kind: MisconceptionKind;
  /** ハルの最初の一言（この誤解を本気で思いこんでいる言い方） */
  opener: string;
  /** ハルが思いこんでいること（AIへの指示用。1文） */
  belief: string;
  /** 生徒の説明に入っていてほしいこと（right・why から）。全部でなくても、筋が通っていればよい */
  understoodWhen: string[];
  /** ハルの聞き返し（「どうして？」型。台本モードと、AIへの見本に使う） */
  probe: string;
  /** ハルが納得したときの一言（台本モードと、AIへの見本に使う） */
  ack: string;
}

/** ハルの言い直し。flawed のものには、check などからとった小さなまちがいを1つ残してある */
export interface Restatement {
  id: string;
  text: string;
  flawed: boolean;
  /** 残したまちがい（flawed のとき） */
  flaw?: string;
  /** 正しくは（flawed のとき） */
  fix?: string;
  /** もとにした check の番号（0始まり）。check でなく本文・reveal からなら省く */
  check?: number;
}

export interface OshieruSet {
  unit: string;
  grade: GradeBand;
  /** 話題を戻すときの言い方（「いまは ○○ の話を しようよ」の ○○） */
  topic: string;
  /** 1回の会話で使う誤解（1〜2個）。最初のものの opener から始まる */
  misconceptions: Misconception[];
  /** 言い直し（正しいもの1つ・まちがいを残したもの1つ以上） */
  restatements: Restatement[];
  /** 技チップを押したときの書き出し */
  hints: { tatoeru: string; zu: string; rei: string };
  /** ことばカード（小学校低学年向け。本文から作った短い言葉） */
  wordCards?: string[];
  /** レクチャーのデータから機械的に作ったもの（lib/oshieru/auto.ts・data/gen.ts）。点検がきびしくなる */
  auto?: boolean;
}

/** 会話の1発言（クライアントとサーバーでやりとりする形。サーバーには保存しない） */
export interface Turn {
  role: "haru" | "student";
  text: string;
}

export type HaruFace = "normal" | "thinking" | "happy";

/** ハルの次の発言の状態 */
export type TurnState = "asking" | "understood" | "offtopic" | "sos" | "ended";

export interface TurnResponse {
  say: string;
  face: HaruFace;
  state: TurnState;
  /** state が understood のとき、ハルの言い直し（生徒が合否を判定する） */
  restatement?: { id: string; text: string };
}

export type AxisKey = "accuracy" | "clarity" | "example" | "misconception";
/** A=◎できた B=○もう少し C=△これから。null は「根拠の引用がなく判定できなかった」 */
export type Grade = "A" | "B" | "C";

export interface AxisResult {
  grade: Grade | null;
  /** 根拠にした生徒の発言の引用 */
  quote: string;
  reason: string;
}

export interface ScoreResult {
  axes: Record<AxisKey, AxisResult>;
  /** 生徒が言い直しを正しく判定できたか（サーバーがデータから決める） */
  judgedOk: boolean;
  mastered: boolean;
  /** 「もう少し」のとき、どの観点をのばせば合格か（1文） */
  advice: string;
  /** 高性能モデルでの採点しなおしか */
  rejudged?: boolean;
  /** 台本モードの見本の判定か */
  mock?: boolean;
}

/** 生徒の判定：合格／おしい */
export type Verdict = "pass" | "close";

/** クライアントに渡す、その単元の公開してよい情報（言い直しのまちがいの有無は渡さない） */
export interface OshieruPublic {
  unit: string;
  name: string;
  label: string;
  grade: GradeBand;
  topic: string;
  opener: string;
  hints: { tatoeru: string; zu: string; rei: string };
  wordCards?: string[];
  /** 終わったあとに必ず見せる、単元データの正しい説明 */
  answers: { wrong: string; right: string; why: string }[];
  lectureHref: string;
}
