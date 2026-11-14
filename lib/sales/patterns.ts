// 法人営業テンプレート集。相手の業態を4パターンに分け、それぞれ丁寧に作り込んだ文面を
// 機械的に差し込んで使う (「数を打つ」ぶんの提案文を、AIに1件ずつ書かせない)。
// じゅんさんの方針 (2026-09): 完全カスタマイズはせず、パターン識別→コピペで量を出す。
//
// 守っているルール (法人営業エージェントの指示書と同じ):
//   - 連絡先を知った経緯を正直に書く。紹介があったように読める「〜と伺い」は使わない
//     (公開ホームページを見て連絡しているので「ホームページを拝見し」と書く。2026-10 返信で指摘あり)。
//   - 価格は本文に出さない。まずは無料でお試し、を先に提示する。
//   - 無料期間の月数は書かない (「まずは」「しばらく」で留める)。
//   - 「専門塾の100分の1」等は使わない (この文面では使っていない)。個人情報・体験談は載せない。
//   - 署名ブロックに送信者情報と受信拒否方法を必ず入れる (特定電子メール法対応)。

export type PatternKey = "club" | "juku" | "school_support" | "high_school";

// 送る相手のパターン。習い事教室 (club) は 2026-11-15 から止めた (返信はすべて「不要」で、商品と合っていなかった)。
// 見込み先の発見・提案文づくり・送信のすべてで、ここにないパターンは扱わない。
export const ACTIVE_PATTERNS: readonly PatternKey[] = ["juku", "school_support", "high_school"];

// 文面の3種類 (2026-11-15〜 比べる)。どれを送ったかは件名でわかる (sales_outreach.subject)。
//   teinei: これまでの丁寧な案内
//   shucho: 教育の考えをはっきり言い、合わない相手には最初から断ってもらう「ゼロか100か」の文面
//   tanbun: 5行ほどの超短文
export type Variant = "teinei" | "shucho" | "tanbun";
export const VARIANTS: readonly Variant[] = ["teinei", "shucho", "tanbun"];
export const VARIANT_LABEL: Record<Variant, string> = { teinei: "丁寧型", shucho: "主張型", tanbun: "超短文型" };

/** 法人名から文面の種類を決める (同じ相手にはいつも同じ種類。3種類にほぼ均等に分かれる) */
export function pickVariant(name: string): Variant {
  let h = 0;
  for (const ch of name.normalize("NFKC")) h = (h * 31 + ch.codePointAt(0)!) >>> 0;
  return VARIANTS[h % VARIANTS.length];
}

export const PATTERN_LABEL: Record<PatternKey, string> = {
  club: "スポーツ・文化系の習い事教室",
  juku: "個別指導塾・小規模塾",
  school_support: "通信制高校サポート校・フリースクール",
  high_school: "私立高校 進路指導部",
};

export interface LeadForProposal {
  name: string;
  pref: string | null;
  activityLabel: string | null;
  patternKey: PatternKey;
}

export interface Proposal {
  subject: string;
  body: string;
}

const TRY_URL = "https://app.bluespring.co.jp/try";

function signature(): string {
  const replyTo = process.env.SALES_REPLY_TO ?? "pr@bluespring.co.jp";
  return [
    "",
    "---",
    "株式会社ブルースプリング アオハルOS担当",
    `メール: ${replyTo}`,
    "https://app.bluespring.co.jp",
    "本メールが不要な場合はその旨ご返信ください。以後お送りしません。",
  ].join("\n");
}

// 「スポーツ推薦」「競技」と書いてよい運動系の活動。これ以外 (音楽・書道・そろばん・ダンス等) は文化系の言い方にする
const SPORT_WORDS = ["サッカー", "野球", "バスケ", "バレー", "テニス", "陸上", "水泳", "空手", "柔道", "剣道", "卓球", "ラグビー", "体操", "スポーツ"];
export function isSport(activity: string | null): boolean {
  if (!activity) return false;
  return SPORT_WORDS.some((w) => activity.includes(w));
}

const BODIES: Record<PatternKey, (lead: LeadForProposal) => string> = {
  club: (lead) => {
    const activity = lead.activityLabel ?? "習い事";
    const sport = isSport(lead.activityLabel);
    const place = lead.pref ? `${lead.pref}で` : "";
    // 運動系だけ「スポーツ推薦」「競技」と書く。音楽・書道などに書くと的外れになる (2026-10 返信で指摘あり)
    const route = sport ? "スポーツ推薦や総合型選抜での" : `総合型選抜や学校推薦型選抜で${activity}の経験を生かした`;
    const coaching = sport ? "競技の指導" : "日々のレッスン";
    const claim = sport ? "スポーツ推薦・総合型選抜での進学" : "総合型選抜・推薦入試での進学";
    return `${lead.name} 様

突然のご連絡失礼いたします。株式会社ブルースプリングの「アオハルOS」担当です。
${place}${activity}を教えていらっしゃる教室として、貴教室のホームページを拝見し、ご連絡いたしました。

${activity}を頑張る生徒さんの中には、${route}大学進学を考える子もいると思います。ただ、${coaching}に加えて志望理由書や小論文、面接まで見るのは指導者側のご負担が大きいのではないでしょうか。

アオハルOSは、その部分をAIが担うサービスです。生徒がスマホで書いた志望理由書をAIが添削し、模擬面接の相手もします。導入いただくと、「${activity}だけでなく、${claim}まで見ている教室です」と、保護者の方へのご説明に使っていただけるようになります。

まずは無料でお試しいただき、使ってみたご感想と、差し支えなければ教室名を実績としてご紹介させていただけないでしょうか。指導者ご自身がどんなものか確かめられるお試し用のページも用意しています。
${TRY_URL}

ご興味があれば、オンラインで15分ほどご説明することもできますし、資料だけ先にお送りすることもできます。ご都合の良い方法で、ご返信いただけますと幸いです。${signature()}`;
  },
  juku: (lead) => {
    const place = lead.pref ? `${lead.pref}で` : "";
    return `${lead.name} 様

突然のご連絡失礼いたします。株式会社ブルースプリングの「アオハルOS」担当です。
${place}学習指導をされている塾として、貴塾のホームページを拝見し、ご連絡いたしました。

総合型選抜・学校推薦型選抜は今や大学入学者の半数以上を占めていますが、志望理由書や小論文、面接まで手厚く見るには指導者の時間がかかり、大手のように専任のスタッフを置くのも難しいかと思います。

アオハルOSは、その対策をAIが担うサービスです。生徒がスマホで書いた志望理由書や小論文をAIが添削し、模擬面接の相手もします。導入いただくと、「大手にはない、一人ひとりに合わせた推薦対策までできる塾です」と、保護者の方へのご説明に使っていただけるようになります。

まずは無料でお試しいただき、使ってみたご感想と、差し支えなければ塾名を実績としてご紹介させていただけないでしょうか。指導者ご自身がどんなものか確かめられるお試し用のページも用意しています。
${TRY_URL}

ご興味があれば、オンラインで15分ほどご説明することもできますし、資料だけ先にお送りすることもできます。ご都合の良い方法で、ご返信いただけますと幸いです。${signature()}`;
  },
  school_support: (lead) => {
    const place = lead.pref ? `${lead.pref}で` : "";
    return `${lead.name} 様

突然のご連絡失礼いたします。株式会社ブルースプリングの「アオハルOS」担当です。
${place}生徒さんの学びを支えていらっしゃる学校として、貴校のホームページを拝見し、ご連絡いたしました。

総合型選抜・学校推薦型選抜での大学進学を目指す生徒さんにとって、志望理由書や小論文、面接の対策は合否を左右する大きな要素です。ただ、一人ひとりに向き合う時間を確保するのは、体制的に難しい面もあるかと思います。

アオハルOSは、その対策をAIが担うサービスです。生徒がスマホで書いた志望理由書や小論文をAIが添削し、模擬面接の相手もします。進学実績づくりの一助として、まずは無料でお試しいただけないでしょうか。使ってみたご感想と、差し支えなければ貴校名を実績としてご紹介させていただければと思います。先生ご自身がどんなものか確かめられるお試し用のページも用意しています。
${TRY_URL}

ご興味があれば、オンラインで15分ほどご説明することもできますし、資料だけ先にお送りすることもできます。ご都合の良い方法で、ご返信いただけますと幸いです。${signature()}`;
  },
  high_school: (lead) => {
    const place = lead.pref ? `${lead.pref}の` : "";
    return `${lead.name} 進路指導ご担当者様

${place}貴校の進路指導について、AIを使った総合型選抜・推薦入試対策のご案内でご連絡いたしました。

志望理由書・小論文・面接の対策は、生徒によって必要な量に差が大きく、先生方お一人おひとりで見きれる範囲を超えてしまうことも多いかと思います。

アオハルOSは、生徒がスマホで書いた志望理由書や小論文をAIが添削し、模擬面接の相手もするサービスです。出願シーズン限定で、1クラス分を無料でお試しいただけます。使ってみてのご感想をいただけましたら幸いです。
${TRY_URL}

ご興味があれば、オンラインで15分ほどご説明することもできますし、資料だけ先にお送りすることもできます。ご都合の良い方法で、ご返信いただけますと幸いです。${signature()}`;
  },
};

const SUBJECTS: Record<PatternKey, string> = {
  club: "生徒の大学進学まで見据えた指導支援のご案内",
  juku: "小規模塾向け、AI推薦入試対策のご案内",
  school_support: "進学実績づくりにAIの推薦入試対策を",
  high_school: "進路指導部向け、1クラス無料トライアルのご案内",
};

// ------------------------------------------------------------------
// 主張型・超短文型 (塾・通信制サポート校・私立高校だけ。習い事教室は送らない)
// 守ること: 実際にできることだけを言う (先生用の画面はまだ試作なので「試作」と書く)。価格と無料の月数は書かない。
// ------------------------------------------------------------------
type Active = Exclude<PatternKey, "club">;

const SHUCHO: Record<Active, { subject: string; body: (lead: LeadForProposal) => string }> = {
  juku: {
    subject: "志望理由書を「直す」のは、もうやめませんか",
    body: (lead) => `${lead.name} 塾長様

いきなり強い件名で失礼します。株式会社ブルースプリング「アオハルOS」の川本です。貴塾のホームページを拝見し、ご連絡しました。

私たちは、推薦入試の対策では、先生が赤ペンで直すより「なぜ？」と問い続けるほうが合格に近づくと考えています。赤ペンで整えた文章は、面接で一つ突っ込まれると崩れるからです。

アオハルOSは、志望理由書・小論文の添削と模擬面接をAIが何度でも引き受け、生徒には「なぜ？」を返し続けます。先生は、問いを投げることに時間を使えます（生徒ごとのつまずきが見える先生用の画面は、いま試作中です）。

この考えに反対の塾には、このメールは不要です。共感いただけた塾だけ、1クラス分をまずは無料でお使いください。「試す」と一言ご返信いただければ、こちらで準備します。
${TRY_URL}${signature()}`,
  },
  school_support: {
    subject: "「書けない子」に、赤ペンは要りません",
    body: (lead) => `${lead.name} ご担当者様

突然のご連絡失礼します。株式会社ブルースプリング「アオハルOS」の川本です。貴校のホームページを拝見し、ご連絡しました。

志望理由書が書けない生徒に必要なのは、正しい書き方の見本より、「なぜそう思うの？」と何度でも聞いてくれる相手だと、私たちは考えています。

アオハルOSのAIは、生徒が書いた志望理由書や小論文に「なぜ？」を返し、添削し、模擬面接の相手もします。夜中でも、何度でも、急かさずに付き合います。

この考えに合わない学校には、このメールは不要です。共感いただけた学校だけ、まずは無料でお試しください。「試す」と一言ご返信いただければ、こちらで準備します。
${TRY_URL}${signature()}`,
  },
  high_school: {
    subject: "志望理由書は、先生が直すほど生徒の言葉でなくなります",
    body: (lead) => `${lead.name} 進路指導ご担当者様

突然のご連絡失礼します。株式会社ブルースプリング「アオハルOS」の川本です。

推薦・総合型選抜の志望理由書は、先生が丁寧に直すほど整い、そのぶん生徒自身の言葉から離れていきます。面接で問われるのは、その「生徒の言葉」のほうです。

アオハルOSのAIは、文章を書き換えるのではなく、生徒に「なぜ？」と問い返し、本人の言葉で書き直させます。添削と模擬面接は何度でもでき、先生は最後の確認だけに時間を使えます。

この考えに賛同いただけない場合、このメールは不要です。共感いただけたら、1クラス分をまずは無料でお試しください。「試す」と一言ご返信いただければ、こちらで準備します。
${TRY_URL}${signature()}`,
  },
};

const TANBUN: Record<Active, { subject: string; body: (lead: LeadForProposal) => string }> = {
  juku: {
    subject: "推薦対策の添削、AIに任せてみませんか（1クラス無料）",
    body: (lead) => `${lead.name} 塾長様

アオハルOSの川本です。貴塾のホームページを拝見しました。
志望理由書・小論文の添削と面接練習をAIが引き受けるサービスです。1クラス分、まずは無料でお使いいただけます。
試してみたい場合は「試す」とだけご返信ください。
${TRY_URL}${signature()}`,
  },
  school_support: {
    subject: "志望理由書の添削と面接練習を、AIで（無料でお試し）",
    body: (lead) => `${lead.name} ご担当者様

アオハルOSの川本です。貴校のホームページを拝見しました。
生徒の志望理由書・小論文の添削と面接練習を、AIが何度でも引き受けます。まずは無料でお試しいただけます。
試してみたい場合は「試す」とだけご返信ください。
${TRY_URL}${signature()}`,
  },
  high_school: {
    subject: "志望理由書の添削と面接練習を、AIで（1クラス無料）",
    body: (lead) => `${lead.name} 進路指導ご担当者様

アオハルOSの川本です。
生徒の志望理由書・小論文の添削と面接練習を、AIが何度でも引き受けるサービスです。1クラス分、まずは無料でお使いいただけます。
試してみたい場合は「試す」とだけご返信ください。
${TRY_URL}${signature()}`,
  },
};

/** 提案文を組み立てる。variant を省くと法人名から決める (習い事教室はいつも丁寧型。ただし送信対象からは外している) */
export function buildProposal(lead: LeadForProposal, variant: Variant = pickVariant(lead.name)): Proposal {
  if (lead.patternKey === "club" || variant === "teinei") return { subject: SUBJECTS[lead.patternKey], body: BODIES[lead.patternKey](lead) };
  const t = (variant === "shucho" ? SHUCHO : TANBUN)[lead.patternKey];
  return { subject: t.subject, body: t.body(lead) };
}

/** 件名から文面の種類を当てる (ダッシュボードで種類ごとに数えるため) */
export function variantOfSubject(subject: string | null | undefined): Variant | null {
  if (!subject) return null;
  for (const k of Object.keys(SHUCHO) as Active[]) {
    if (SHUCHO[k].subject === subject) return "shucho";
    if (TANBUN[k].subject === subject) return "tanbun";
    if (SUBJECTS[k] === subject) return "teinei";
  }
  return null;
}
