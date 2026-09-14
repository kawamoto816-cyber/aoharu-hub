// アオハルOS: 入口ページ (/try, /parents, トップの分岐) で使う対象セグメントの定義。
// URLの ?for= パラメータでセグメントを受け取り、文言を出し分ける。

export const SEGMENTS = ["highschool", "student", "career"] as const;
export type Segment = (typeof SEGMENTS)[number];

export function parseSegment(value: string | string[] | undefined): Segment | null {
  const v = Array.isArray(value) ? value[0] : value;
  return (SEGMENTS as readonly string[]).includes(v ?? "") ? (v as Segment) : null;
}

export interface SegmentCopy {
  key: Segment;
  label: string;
  /** トップの分岐カードの見出し */
  title: string;
  /** トップの分岐カードの説明 */
  description: string;
  /** /try のヒーロー */
  tryHeadline: string;
  tryLead: string;
  /** 「文章がある」側の対象文書名 */
  docName: string;
  /** 「文章がある」側の具体例 */
  docExample: string;
  /** 面接の呼び方 */
  interviewName: string;
}

export const SEGMENT_COPY: Record<Segment, SegmentCopy> = {
  highschool: {
    key: "highschool",
    label: "高校生・保護者",
    title: "総合型選抜・推薦入試の対策に",
    description:
      "志望理由書・小論文・面接。塾に通わなくても、今夜から自分のペースで対策できます。",
    tryHeadline: "志望理由書、いまどこまで書けていますか？",
    tryLead:
      "出願まで時間がない人ほど、まず「今ある文章」をAIに見せるのが近道です。白紙なら、対話で骨子から一緒に作ります。",
    docName: "志望理由書・小論文",
    docExample: "下書きでも、先生に一度見てもらった文章でも構いません",
    interviewName: "推薦・総合型選抜の面接",
  },
  student: {
    key: "student",
    label: "大学生（就活）",
    title: "ES・面接対策に",
    description:
      "自己PR・ガクチカ・志望動機。締切ラッシュでも、AIが何度でも添削と模擬面接に付き合います。",
    tryHeadline: "ES、いまどこまで書けていますか？",
    tryLead:
      "締切が近いほど、まず「今あるES」をAIに見せるのが近道です。白紙なら、対話で自己PRとガクチカの骨子から作ります。",
    docName: "エントリーシート",
    docExample: "自己PR・ガクチカ・志望動機のどれか1つからでOK",
    interviewName: "就活の面接",
  },
  career: {
    key: "career",
    label: "社会人（転職）",
    title: "職務経歴書・面接対策に",
    description:
      "キャリアの棚卸しから志望動機の言語化、面接のブランク対策まで。夜や週末に自分のペースで。",
    tryHeadline: "志望動機、いまどこまで言葉になっていますか？",
    tryLead:
      "まず「今ある志望動機や職務経歴書」をAIに見せるのが近道です。白紙なら、対話でキャリアの軸から一緒に整理します。",
    docName: "志望動機・職務経歴書",
    docExample: "転職サイトに登録した文章の貼り付けでもOK",
    interviewName: "転職の面接",
  },
};

export const APP_URLS = {
  tensakun: "https://essay.bluespring.co.jp",
  shiboriyu: "https://reason.bluespring.co.jp",
  mensatsu: "https://interview.bluespring.co.jp",
  careerChara: "https://career.bluespring.co.jp",
} as const;
