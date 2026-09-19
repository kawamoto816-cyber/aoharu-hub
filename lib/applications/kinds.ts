// 入試方式と、そこで課されることが多い書類の「初期値」。
//
// 重要: ここに書いてあるのはあくまで初期値で、事実ではない。
// 課される書類は大学・学部・年度で変わり、公式サイトにも科目の内訳は書かれず
// 「募集要項を確認」とだけ書かれていることが多い。よって最終的に何を準備するかは
// 必ずユーザー本人に募集要項を見て確定してもらう（画面側で選べるようにしてある）。

export const DOC_KINDS = ["shibo-riyusho", "katsudo-hokoku", "shoronbun", "es", "mensetsu"] as const;
export type DocKind = (typeof DOC_KINDS)[number];

export const DOC_LABEL: Record<DocKind, string> = {
  "shibo-riyusho": "志望理由書",
  "katsudo-hokoku": "活動報告書・自己推薦書",
  shoronbun: "小論文",
  es: "エントリーシート・職務経歴書",
  mensetsu: "面接",
};

export const ADMISSION_TYPES = ["sogo", "suisen", "ippan", "shukatsu", "tenshoku"] as const;
export type AdmissionType = (typeof ADMISSION_TYPES)[number];

export const ADMISSION_LABEL: Record<AdmissionType, string> = {
  sogo: "総合型選抜",
  suisen: "学校推薦型選抜",
  ippan: "一般選抜",
  shukatsu: "就職活動",
  tenshoku: "転職",
};

/** 入試方式ごとの、書類の初期値（あくまで出発点。ユーザーが増減できる） */
export const DEFAULT_DOCS: Record<AdmissionType, DocKind[]> = {
  sogo: ["shibo-riyusho", "katsudo-hokoku", "shoronbun", "mensetsu"],
  suisen: ["shibo-riyusho", "mensetsu"],
  // 一般選抜は学部によって小論文の有無が分かれ、志望理由書・面接は通常ない
  ippan: ["shoronbun"],
  shukatsu: ["es", "mensetsu"],
  tenshoku: ["es", "mensetsu"],
};

export function isAdmissionType(v: string | null | undefined): v is AdmissionType {
  return !!v && (ADMISSION_TYPES as readonly string[]).includes(v);
}

export function isDocKind(v: string | null | undefined): v is DocKind {
  return !!v && (DOC_KINDS as readonly string[]).includes(v);
}

/** 入試方式の表示名。未設定や旧データ（自由入力）はそのまま出す */
export function admissionLabel(value: string | null): string | null {
  if (!value) return null;
  return isAdmissionType(value) ? ADMISSION_LABEL[value] : value;
}

export function defaultDocsFor(value: string | null): DocKind[] {
  return isAdmissionType(value) ? DEFAULT_DOCS[value] : [];
}
