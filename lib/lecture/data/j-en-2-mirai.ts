import type { Lecture } from "../types";

export const J_EN_2_MIRAI: Lecture = {
  unit: "j-en-2-mirai",
  title: "未来は will ＋ 原形と be going to ＋ 原形。どちらも後ろは原形",
  hook: "「明日は雨が降るだろう」「週末は祖母の家に行く予定だ」。英語では、これからのことを will や be going to を使って表します。予定や予想を話す場面は毎日のようにあるので、2つの形と、その使い分けのコツをおさえましょう。",
  sections: [
    {
      heading: "will ＋ 動詞の原形で「〜するだろう・〜します」",
      body: "will は動詞の前に置く助動詞で、あとの動詞は{{必ず原形}}です。主語が he や she でも {{will の形は変わらず}}、あとの動詞にも -s はつきません。I will は {{I'll}}、will not は {{won't}} と短くできます。",
      figure: {
        type: "formula",
        title: "will を入れると、あとの動詞は原形にもどる",
        prose: true,
        steps: [
          { expr: "He {{plays}} tennis.", note: "現在：三単現の -s" },
          { expr: "He {{will play}} tennis tomorrow.", note: "will のあとは原形 play" },
          { expr: "He {{won't}} play tennis tomorrow.", note: "否定：will not＝won't" },
          { expr: "{{Will}} he play tennis tomorrow?", note: "疑問：Will を主語の前へ" },
          { expr: "— Yes, he {{will}}. / No, he {{won't}}.", note: "答えも will で" },
        ],
      },
    },
    {
      heading: "be going to ＋ 動詞の原形で「〜するつもりだ・〜しそうだ」",
      body: "be going to は、be動詞の部分が{{主語によって am・is・are}}に変わります。to のあとの動詞は原形です。否定文は be動詞のあとに not、疑問文は be動詞を主語の前に出すので、{{be動詞の文と同じ}}作り方になります。",
      figure: {
        type: "compare",
        title: "will と be going to の形のちがい",
        columns: [{ title: "will", tone: "blue" }, { title: "be going to", tone: "yellow" }],
        rows: [
          { label: "肯定", cells: ["She will go.", "She is going to go."] },
          { label: "否定", cells: ["She won't go.", "She isn't going to go."] },
          { label: "疑問", cells: ["Will she go?", "Is she going to go?"] },
          { label: "主語で", cells: ["形は変わらない", "am / is / are が変わる"] },
        ],
      },
    },
    {
      heading: "使い分け：前から決めていた予定なら be going to",
      body: "{{前から決めていた予定}}は be going to がよく使われます。話しているその場で{{今決めたこと（意志）}}は will です。「〜だろう」という{{予想}}はどちらでも表せますが、黒い雲が出ているなど目の前に根拠があるときは be going to がよく使われます。中学のテストでは、まずは「どちらも未来を表す」と押さえ、書きかえができることが大切です。",
      figure: {
        type: "tree",
        title: "未来のことをどちらで言う？",
        root: {
          label: "これからのこと",
          children: [
            { label: "前からの予定", sub: "もう決めてある", children: [{ label: "be going to", tone: "yellow" }] },
            { label: "その場で決めた", sub: "「じゃあ私がやる」", children: [{ label: "will", tone: "blue" }] },
            { label: "予想", sub: "〜だろう", children: [{ label: "どちらも可", sub: "根拠が目の前なら going to", tone: "plain" }] },
          ],
        },
      },
    },
    {
      heading: "Will you 〜? は「〜してくれませんか」にもなる",
      body: "Will you open the window? は「窓を開けてくれませんか」という{{依頼}}の意味でよく使います。答えは Sure.（いいですよ）や All right. などです。また、未来を表す文には tomorrow・next week・this weekend など{{未来の時を表すことば}}がよくいっしょに出てきます。",
    },
  ],
  mistakes: [
    { wrong: "She will plays the piano.", right: "She will play the piano.", why: "will のあとの動詞は主語に関係なく原形です。" },
    { wrong: "I going to visit Kyoto.", right: "I am going to visit Kyoto.", why: "be going to の be動詞（am・is・are）を落とさないようにします。" },
    { wrong: "He is going to studies tonight.", right: "He is going to study tonight.", why: "to のあとも原形です。-s はつきません。" },
    { wrong: "Will you go there? — Yes, I do.", right: "Yes, I will.", why: "will でたずねられたら will で答えます。" },
  ],
  check: [
    { q: "I will clean my room. を be going to の文に書きかえましょう。", a: "I am going to clean my room.", why: "主語 I なので be動詞は am。to のあとは原形 clean。" },
    { q: "It will rain tomorrow. を否定文に。", a: "It won't (will not) rain tomorrow.", why: "will のすぐあとに not。" },
    { q: "Are they going to swim? に Yes で答えましょう。", a: "Yes, they are.", why: "be going to の疑問文には be動詞で答える。" },
  ],
  next: [
    { label: "4択ドリル「未来の表現」に挑戦", href: "/learn/eibunpo-chu/j-en-2-mirai" },
    { label: "will のなかまを広げる「助動詞」", href: "/learn/eibunpo-chu/j-en-2-jodoshi" },
    { label: "前の単元「過去進行形」", href: "/learn/eibunpo-chu/j-en-2-kako-shinko" },
  ],
};
