import type { Application, DocKind } from "./store";

// 出願案件の状態から「次にやること」を1つだけ決める。
// 迷わせないことが目的なので、候補は複数出さず、必ず1件に絞る。
// 判断はすべてここに集約する（画面側にロジックを置かない）。

export interface NextStep {
  /** 「志望理由書を2稿目に直す」のような一文 */
  label: string;
  /** 補足（なぜ今それか） */
  reason: string;
  appName: string;
  appUrl: string;
  /** その一手に関係する書類 */
  kind: DocKind;
}

const APP = {
  shiboriyu: { name: "しぼりゆ", url: "https://reason.bluespring.co.jp" },
  tensakun: { name: "テンサクン", url: "https://essay.bluespring.co.jp" },
  mensatsu: { name: "メンサツ", url: "https://interview.bluespring.co.jp" },
} as const;

/** 書類ごとの稿数を引く（行が無ければ0扱い） */
function draftsOf(app: Application, kind: DocKind): number {
  return app.documents.find((d) => d.kind === kind)?.draftCount ?? 0;
}

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

/**
 * 次の一手。志望理由書 → 小論文 → 面接 の順に、
 * 「まだ手がついていないもの」「まだ書き直しが足りないもの」を優先する。
 * 志望理由書は3稿を目安にする（1回書いて終わりにさせないため）。
 */
export function nextStep(app: Application): NextStep {
  const riyusho = draftsOf(app, "shibo-riyusho");
  const shoronbun = draftsOf(app, "shoronbun");
  const mensetsu = draftsOf(app, "mensetsu");

  if (riyusho === 0) {
    return {
      label: "志望理由書の骨子をつくる",
      reason: "まずは書く材料を出すところから。対話するだけで構成案まで出ます。",
      appName: APP.shiboriyu.name,
      appUrl: APP.shiboriyu.url,
      kind: "shibo-riyusho",
    };
  }

  if (riyusho < 3) {
    return {
      label: `志望理由書を${riyusho + 1}稿目に直す`,
      reason: "志望理由書は書き直すほど良くなります。3稿目までは続けてみてください。",
      appName: APP.tensakun.name,
      appUrl: APP.tensakun.url,
      kind: "shibo-riyusho",
    };
  }

  if (shoronbun === 0) {
    return {
      label: "小論文を1本書いて添削に出す",
      reason: "志望理由書が3稿目まで来ました。次は小論文に手をつける番です。",
      appName: APP.tensakun.name,
      appUrl: APP.tensakun.url,
      kind: "shoronbun",
    };
  }

  if (mensetsu === 0) {
    return {
      label: "面接をひと通り練習する",
      reason: "書類がそろってきました。面接は書いた内容を自分の言葉で説明する練習です。",
      appName: APP.mensatsu.name,
      appUrl: APP.mensatsu.url,
      kind: "mensetsu",
    };
  }

  if (shoronbun < 2) {
    return {
      label: `小論文を${shoronbun + 1}本目に進む`,
      reason: "小論文は出題形式が変わっても書けるように、本数を重ねるのが近道です。",
      appName: APP.tensakun.name,
      appUrl: APP.tensakun.url,
      kind: "shoronbun",
    };
  }

  return {
    label: `面接をもう一度練習する（${mensetsu + 1}回目）`,
    reason: "ひと通りそろっています。あとは本番の形式で繰り返すのが一番効きます。",
    appName: APP.mensatsu.name,
    appUrl: APP.mensatsu.url,
    kind: "mensetsu",
  };
}
