import type { Application, ApplicationDocument } from "./store";
import { DOC_LABEL, type DocKind } from "./kinds";

// 出願案件の状態から「次にやること」を1つだけ決める。
// 対象は、その案件に登録されている書類だけ。登録されていない書類（その入試で
// 課されないもの）の準備を勧めてはいけない。判断はすべてここに集約する。

export interface NextStep {
  /** 「志望理由書を2稿目に直す」のような一文 */
  label: string;
  /** 補足（なぜ今それか） */
  reason: string;
  appName: string;
  appUrl: string;
  kind: DocKind;
}

const APP = {
  shiboriyu: { name: "しぼりゆ", url: "https://reason.bluespring.co.jp" },
  tensakun: { name: "テンサクン", url: "https://essay.bluespring.co.jp" },
  mensatsu: { name: "メンサツ", url: "https://interview.bluespring.co.jp" },
} as const;

/** 着手する順番。書いてから話す、が基本 */
const ORDER: DocKind[] = ["shibo-riyusho", "katsudo-hokoku", "es", "shoronbun", "mensetsu"];

/** 書き直しの目安。ここに達するまでは同じ書類を勧め続ける */
const TARGET_DRAFTS: Record<DocKind, number> = {
  "shibo-riyusho": 3,
  "katsudo-hokoku": 2,
  shoronbun: 2,
  es: 3,
  mensetsu: 2,
};

/**
 * 日本時間での「出願日まであと何日」。
 * 締切当日は0、過ぎていたら負の数を返す。締切未入力なら null。
 */
export function daysLeft(deadline: string | null, now = new Date()): number | null {
  if (!deadline) return null;
  const jstToday = new Date(now.getTime() + 9 * 3600 * 1000).toISOString().slice(0, 10);
  const a = Date.UTC(
    Number(jstToday.slice(0, 4)),
    Number(jstToday.slice(5, 7)) - 1,
    Number(jstToday.slice(8, 10)),
  );
  const b = Date.UTC(
    Number(deadline.slice(0, 4)),
    Number(deadline.slice(5, 7)) - 1,
    Number(deadline.slice(8, 10)),
  );
  return Math.round((b - a) / 86400000);
}

/** その書類の、今の稿数に対する一手 */
function stepFor(doc: ApplicationDocument): NextStep {
  const label = DOC_LABEL[doc.kind];
  const n = doc.draftCount;

  if (doc.kind === "mensetsu") {
    return {
      label: n === 0 ? "面接をひと通り練習する" : `面接をもう一度練習する（${n + 1}回目）`,
      reason:
        n === 0
          ? "書いた内容を自分の言葉で説明できるか、AI面接官に確かめてもらいましょう。"
          : "面接は本番の形式で繰り返すほど落ち着いて話せるようになります。",
      appName: APP.mensatsu.name,
      appUrl: APP.mensatsu.url,
      kind: doc.kind,
    };
  }

  if (doc.kind === "shoronbun") {
    return {
      label: n === 0 ? "小論文を1本書いて添削に出す" : `小論文を${n + 1}本目に進む`,
      reason:
        n === 0
          ? "まず1本、時間を計って書いてみるところから。その場で添削が返ります。"
          : "出題形式が変わっても書けるように、本数を重ねるのが近道です。",
      appName: APP.tensakun.name,
      appUrl: APP.tensakun.url,
      kind: doc.kind,
    };
  }

  // 志望理由書・活動報告書・ES: 0稿目は「しぼりゆ」で材料出し、以降は「テンサクン」で推敲
  if (n === 0) {
    return {
      label: `${label}の骨子をつくる`,
      reason: "まずは書く材料を出すところから。対話するだけで構成案まで出ます。",
      appName: APP.shiboriyu.name,
      appUrl: APP.shiboriyu.url,
      kind: doc.kind,
    };
  }
  return {
    label: `${label}を${n + 1}稿目に直す`,
    reason: "書き直すほど良くなります。3稿目までは続けてみてください。",
    appName: APP.tensakun.name,
    appUrl: APP.tensakun.url,
    kind: doc.kind,
  };
}

/**
 * 次の一手。登録されている書類のうち、
 * (1) まだ着手していないもの → (2) 目安の稿数に届いていないもの → (3) 一番進んでいないもの
 * の順に1つだけ選ぶ。書類が1つも登録されていなければ null。
 */
export function nextStep(app: Application): NextStep | null {
  const docs = app.documents;
  if (docs.length === 0) return null;

  const inOrder = [...docs].sort((a, b) => ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind));

  const untouched = inOrder.find((d) => d.draftCount === 0);
  if (untouched) return stepFor(untouched);

  const underTarget = inOrder.find((d) => d.draftCount < TARGET_DRAFTS[d.kind]);
  if (underTarget) return stepFor(underTarget);

  const least = inOrder.reduce((min, d) => (d.draftCount < min.draftCount ? d : min), inOrder[0]);
  return stepFor(least);
}
