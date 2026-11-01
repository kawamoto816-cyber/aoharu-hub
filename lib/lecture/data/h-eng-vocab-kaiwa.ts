import type { Lecture } from "../types";

export const H_ENG_VOCAB_KAIWA: Lecture = {
  unit: "h-eng-vocab-kaiwa",
  title: "会話表現は「場面」と「相手との距離」で選ぶ。答えは前の発話にかみ合わせる",
  hook: "先生に「窓を開けて」と頼むとき、友だちと同じ言い方でいいでしょうか。英語にも、相手や場面に合わせたていねいさの段階があります。会話表現は文法問題よりも「どんな場面で、何のために言うか」が大事です。決まり文句をはたらきごとに整理すると、会話文の問題もリスニングも解きやすくなります。",
  sections: [
    {
      heading: "頼み方には、ていねいさの段階がある",
      body: "同じ「窓を開けて」でも、言い方で{{ていねいさ}}が変わります。命令文は親しい相手でも強く聞こえることがあり、Can you 〜? は気軽、{{Could you 〜?}} はていねい、{{Would you mind 〜ing?}} はさらにひかえめです。目上の人や初めて会う人には、ていねいな形を選びましょう。",
      figure: {
        type: "formula",
        title: "「窓を開けて」のていねいさ",
        prose: true,
        steps: [
          { expr: "{{Open}} the window.", note: "命令文：強く聞こえることがある" },
          { expr: "{{Can you}} open the window?", note: "気軽な頼み方" },
          { expr: "{{Could you}} open the window?", note: "ていねいな頼み方" },
          { expr: "{{Would you mind opening}} the window?", note: "さらにひかえめ（〜していただけますか）" },
        ],
        note: "please をつけてもていねいになるが、命令文に please だけでは目上の人には足りないこともある。",
      },
    },
    {
      heading: "Do you mind 〜? には No で「いいですよ」",
      body: "mind は{{「いやだと思う」}}という意味です。Do you mind if I 〜? は「私が〜したら、あなたはいやですか」とたずねているので、OK するときは{{No（いやではない）}}と答えます。Yes と答えると「いやです」という意味になってしまいます。",
      figure: {
        type: "formula",
        title: "mind の質問への答え方",
        prose: true,
        steps: [
          { expr: "Do you {{mind}} if I sit here?", note: "ここに座ったら、いやですか？" },
          { expr: "— {{No}}, not at all. / Of course not.", note: "◯ いやではない＝どうぞ" },
          { expr: "— Sorry, {{someone is sitting here}}.", note: "◯ 断るときは理由をそえる" },
          { expr: "— {{Yes}}, of course.", note: "✕「いいですよ」のつもりでも「いやです」になる" },
        ],
      },
    },
    {
      heading: "はたらきごとに「言い方」と「返し方」を組にする",
      body: "会話表現は、{{提案・誘い・許可・お礼}}のようなはたらきで分けて、{{言い方と返し方をセット}}で覚えます。Why don't we 〜? は「なぜ〜しないの」ではなく「〜しませんか」という提案です。返し方まで覚えておくと、会話文の空所問題で選択肢をすばやくしぼれます。",
      figure: {
        type: "compare",
        title: "場面ごとの言い方と返し方",
        columns: [{ title: "言い方", tone: "blue" }, { title: "返し方", tone: "yellow" }],
        rows: [
          { label: "提案", cells: ["Why don't we 〜?", "That sounds good."] },
          { label: "誘い", cells: ["Would you like to 〜?", "I'd love to."] },
          { label: "許可", cells: ["May I 〜?", "Sure, go ahead."] },
          { label: "申し出", cells: ["Shall I 〜?", "Yes, please."] },
          { label: "お礼", cells: ["Thanks a lot.", "My pleasure."] },
        ],
      },
    },
    {
      heading: "会話文の空所は「前と後ろ」の両方から決める",
      body: "会話文の問題では、空所の{{直前の発話が何をしているか}}（質問・提案・お礼など）をまず見ます。次に、{{空所の後ろの発話}}がその答えに続くかを確かめます。前だけで選ぶと、意味は通っても後ろとかみ合わない選択肢にひっかかります。",
      figure: {
        type: "flow",
        title: "空所の答えを決める手順",
        steps: [
          { label: "直前を見る", sub: "質問？提案？お礼？", tone: "blue" },
          { label: "候補をしぼる", sub: "はたらきの合う返事" },
          { label: "直後で確かめる", sub: "話がつながるか", tone: "yellow" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "How do you think about this plan?", right: "What do you think about this plan?", why: "「どう思う？」は、思う内容（what）をたずねるので What を使います。How はやり方・様子をたずねる語です。" },
    { wrong: "Do you mind if I open the window? — Yes, sure.（どうぞ、のつもり）", right: "No, not at all.", why: "mind は「いやだと思う」。OK するときは No（いやではない）と答えます。" },
    { wrong: "Why don't you join us? →「なぜ参加しないの？」と責められていると思う", right: "「いっしょにやりませんか」という誘い", why: "Why don't you 〜? は相手への提案・誘いの決まった言い方です。" },
  ],
  check: [
    { q: "「（私が）荷物を持ちましょうか」を Shall で始めて言いましょう。", a: "Shall I carry your bag?", why: "Shall I 〜? は「私が〜しましょうか」という申し出。" },
    { q: "Would you like to come to the party? に「ぜひ行きたい」と答えるときの決まった言い方は？", a: "I'd love to.", why: "誘いを喜んで受けるときの言い方。to の後ろの come は省く。" },
    { q: "Would you mind closing the door? に「いいですよ」と答えるとき、Yes と No のどちらで始める？", a: "No（No, not at all. など）", why: "mind は「いやだと思う」。いやではないので No。" },
  ],
  next: [
    { label: "会話表現をカードで覚える", href: "/learn/eigo-ko/h-eng-vocab-kaiwa" },
    { label: "使って鍛える「スピーキング」", href: "/learn/eigo-ko/h-eng-skill-speaking" },
    { label: "関連「助動詞」（could・would・shall）", href: "/learn/eibunpo-ko/h-eng-gram-jodoshi" },
  ],
};
