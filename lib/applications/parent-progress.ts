import type { Application, ApplicationDocument } from "./store";
import { DOC_LABEL } from "./kinds";
import { TARGET_DRAFTS } from "./next-step";

// 保護者ビュー用の進捗計算。本文（実際に書いた文章・面接の回答内容）には一切触れず、
// 「どこまで進んだか」だけを数字にする。

export interface DocProgress {
  label: string;
  draftCount: number;
  target: number;
  /** 0〜1。表示用のバーに使う */
  ratio: number;
  status: "これから" | "対策中" | "仕上がってきた";
}

export interface ApplicationProgress {
  application: Application;
  docs: DocProgress[];
  /** 対策として仕上がってきた書類の数 / 登録されている書類の数 */
  doneCount: number;
  totalCount: number;
}

function docProgress(doc: ApplicationDocument): DocProgress {
  const target = TARGET_DRAFTS[doc.kind];
  const ratio = Math.min(1, target > 0 ? doc.draftCount / target : 0);
  const status: DocProgress["status"] =
    doc.draftCount === 0 ? "これから" : doc.draftCount >= target ? "仕上がってきた" : "対策中";
  return { label: DOC_LABEL[doc.kind], draftCount: doc.draftCount, target, ratio, status };
}

export function applicationProgress(app: Application): ApplicationProgress {
  const docs = app.documents.map(docProgress);
  return {
    application: app,
    docs,
    doneCount: docs.filter((d) => d.status === "仕上がってきた").length,
    totalCount: docs.length,
  };
}
