// 試験モード (入試モード・共通テストモード・テスト放題) の型。
// 問題は単元模試 (lib/moshi/data) の目録 questionCatalog() と、従来の大問 (Daimon) から集めて組みなおす。
// データファイルが増えると、範囲に入る問題が自動で増える (モードの側は「どこから・何問・何点」だけを書く)。
// 問題はすべてオリジナルの予想問題。実在の試験は「〜型」と呼び、公式の問題・形式の再現ではないことを画面に書く。

import type { QKind, QType, Subject } from "@/lib/moshi/types";

export type ModeId = "koritsu" | "kyotsu" | "shiritsu" | "teiki";

/** 学校の地図の場所で決める範囲 (lib/school の LEVELS)。groups=学年・科目の見出し、units=単元id。両方省略＝その教科ぜんぶ */
export interface ExamScope {
  level: "sho" | "chu" | "ko";
  /** 地図の教科の key (chu: kokugo・math・eigo・rika・shakai／ko: math・english など) */
  subjectKey: string;
  groups?: string[];
  units?: string[];
}

/** 難易度の配分 [基本, 標準, 発展] (合計 1 でなくてよい。割合として使う) */
export type DiffMix = [number, number, number];

/** 大問1つの作り方 */
export interface DaimonSpec {
  title: string;
  lead: string;
  /** 出題元 (試験の範囲の中をさらにしぼる)。省略＝試験の範囲ぜんぶ */
  from?: { units?: string[]; groups?: string[] };
  /** 問題のタイプ (省略＝A・B・C すべて) */
  types?: QType[];
  /** 答えの形式 (省略＝すべて。マーク式の型は choice・num だけ) */
  kinds?: QKind[];
  /** 小問の数 [最小, 最大] */
  count: [number, number];
  mix: DiffMix;
  /** 大問の配点 (小問の配点はこの合計になるように配りなおす) */
  points: number;
  /** material=資料・本文つきのまとまりを優先、single=1問ずつの小問を優先 */
  prefer?: "material" | "single";
}

/** 1回分の仕様 (モード × えらんだ範囲) */
export interface ExamSpec {
  /** 結果の保存・シードに使う (同じ id・同じシードなら同じ問題) */
  id: string;
  mode: ModeId;
  /** 「公立高校入試型 数学」 */
  title: string;
  /** 中3 / 高校 / 中1 など */
  target: string;
  subject: Subject;
  subjectName: string;
  scope: ExamScope;
  /** 画面に出す範囲の説明 (「中1〜中3の全範囲」「7単元」) */
  scopeLabel: string;
  minutes: number;
  /** 満点 (= sections の points の合計) */
  total: number;
  sections: DaimonSpec[];
}

/** 画面でえらぶもの (URL の ?s=&v=&l=&u=&m=) */
export interface ExamChoice {
  /** 教科 (公立・私立は chu の教科 key、共通テスト型は variant) */
  subject?: string;
  /** 定期テスト型: 学校段階 */
  level?: "sho" | "chu" | "ko";
  /** 私立・定期: 単元 */
  units?: string[];
  /** 私立・定期: 制限時間 (分) */
  minutes?: number;
}

export interface ModeSubject {
  key: string;
  name: string;
  /** 準備中の枠 (まだ問題がほとんどない) */
  note?: string;
}

/** モードの説明 (一覧・選ぶ画面) */
export interface ModeInfo {
  id: ModeId;
  name: string;
  /** 中3向け・高校向け */
  target: string;
  /** 一覧の1行 */
  catch: string;
  lead: string;
  /** 形式の注記 (公式との関係) */
  notice: string;
  /** えらぶもの */
  pick: "subject" | "subject-units" | "level-units";
  subjects: ModeSubject[];
  /** えらべる時間 (分)。固定のモードは空 */
  minuteOptions: number[];
}
