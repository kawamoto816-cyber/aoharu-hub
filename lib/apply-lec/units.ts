// 「選ばれる力」の図解の教科書（小論文・面接・総合型選抜）の単元の一覧。3分野×8単元。
// 中身（Lecture）は lib/apply-lec/data/<id>.ts。書いた単元だけが registry.ts に入り、ページになる。
// このファイルは実行時の import をしない（scripts/check-apply-lec.ts が Node でそのまま読む）。

export type AplFieldKey = "shoron" | "mensetsu" | "sogo";

export interface AplUnit {
  /** 例 apl-shoron-02（Lecture.unit と同じ） */
  id: string;
  no: number;
  title: string;
}

export interface AplField {
  key: AplFieldKey;
  name: string;
  lead: string;
  /** APPLY のカードの棚 */
  cards: { href: string; label: string };
  units: AplUnit[];
}

const u = (field: AplFieldKey, titles: string[]): AplUnit[] =>
  titles.map((title, i) => ({ id: `apl-${field}-${String(i + 1).padStart(2, "0")}`, no: i + 1, title }));

export const APL_FIELDS: AplField[] = [
  {
    key: "shoron",
    name: "小論文",
    lead: "問いに答え、根拠で主張を支える。論証の型を、古典の理論から学ぶ。",
    cards: { href: "/learn/shoronbun", label: "小論文のカード" },
    units: u("shoron", [
      "小論文とは何か",
      "主張と根拠：トゥールミン・モデル",
      "構成の型：序論・本論・結論とピラミッド構造",
      "テーマ型：問いを立てる",
      "課題文型：要約と論点の取り出し",
      "資料・データ型：グラフと数字の読み方",
      "反論を先回りする：譲歩と反駁",
      "仕上げ：推敲と時間配分",
    ]),
  },
  {
    key: "mensetsu",
    name: "面接",
    lead: "台本の暗記ではなく、自分の経験と考えを、相手に伝わる形で話す。",
    cards: { href: "/learn/mensetsu", label: "面接のカード" },
    units: u("mensetsu", [
      "面接は何を見るのか",
      "信頼される話し方：エトス・パトス・ロゴス",
      "答え方の型：結論から話す",
      "経験を語る：STARと経験学習",
      "「なぜこの大学か」：3つのポリシー",
      "深掘り質問と口頭試問",
      "グループ討論・プレゼンテーション",
      "練習のしかた：模擬・録画・ふり返り",
    ]),
  },
  {
    key: "sogo",
    name: "総合型選抜",
    lead: "制度と日程を公式資料で押さえ、自分を知り、書類と活動で証明する。",
    cards: { href: "/learn/daigaku", label: "志望校を知るカード" },
    units: u("sogo", [
      "総合型選抜とは：制度と日程",
      "アドミッション・ポリシーの読み方",
      "自分を知る：興味が育つ4つの段階",
      "志望校の選び方：学問から逆算する",
      "活動実績のつくり方：探究とポートフォリオ",
      "志望理由書：過去・現在・未来をつなぐ",
      "書類の全体像：活動報告書から評価書類まで",
      "出願から合格まで：スケジュールと併願",
    ]),
  },
];

export const APL_UNITS: AplUnit[] = APL_FIELDS.flatMap((f) => f.units);
export const APL_HOME = "/learn/apply/lec";
export const aplUnit = (id: string) => APL_UNITS.find((x) => x.id === id);
export const aplField = (id: string) => APL_FIELDS.find((f) => f.units.some((x) => x.id === id));
