import type { Lecture } from "../types";

export const H_ENG_SKILL_SPEAKING: Lecture = {
  unit: "h-eng-skill-speaking",
  title: "話すときは「答え＋1文」。発表は結論から、つまったら言いかえてつなぐ",
  hook: "英語で What do you do on weekends? と聞かれて、Tennis. のひと言で会話が止まってしまった経験はありませんか。スピーキングで大切なのは、むずかしい文法より、答えに少し情報を足して会話を続けることと、言葉につまっても止まらないことです。型をいくつか持っておくと、授業の発表や面接テストでも落ち着いて話せます。",
  sections: [
    {
      heading: "やり取りは「答え＋1文」で会話を続ける",
      body: "質問には、まず{{短くはっきり答え}}ます。そのあとに{{理由や具体的な情報を1文}}足すと、相手が次の質問をしやすくなります。最後に {{How about you?}} と聞き返せば、会話のボールを相手に返せます。",
      figure: {
        type: "formula",
        title: "What do you do on weekends? への答え方",
        prose: true,
        steps: [
          { label: "✕", expr: "Tennis.", note: "ひと言で会話が止まる" },
          { label: "答え", expr: "{{I usually play tennis}} with my friends.", note: "主語と動詞のある文で" },
          { label: "＋1文", expr: "{{I'm on the tennis team}}, so I practice a lot.", note: "理由・くわしい情報" },
          { label: "聞き返す", expr: "{{How about you?}}", note: "相手に話をふる" },
        ],
      },
    },
    {
      heading: "発表は「結論→理由→例→結論」の順で話す",
      body: "聞き手は、文字とちがって前にもどって確かめることができません。だから発表では、{{最初に結論}}を言い、そのあとに{{理由}}と{{具体例}}を話し、{{最後にもう一度結論}}を言います。この型は、頭文字をとって{{PREP（プレップ）}}とよばれます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "PREP で話す「好きな季節」",
        steps: [
          { label: "Point 結論", sub: "秋がいちばん好き", tone: "navy" },
          { label: "Reason 理由", sub: "涼しく過ごしやすい", tone: "blue" },
          { label: "Example 例", sub: "秋はハイキングできる" },
          { label: "Point 結論", sub: "だから秋が好き", tone: "yellow" },
        ],
        note: "英語では I like fall the best. → It's cool and comfortable. → I enjoy hiking in fall. → So fall is my favorite.",
      },
    },
    {
      heading: "考える時間は、つなぎの言葉でかせぐ",
      body: "すぐに答えが浮かばないとき、だまってしまうと相手は「質問がわからなかったのかな」と思います。{{Let me see.}} や {{Well,}} のような{{つなぎの言葉}}を使えば、考えていることが伝わります。質問が聞きとれなかったときは、だまらずに聞き返しましょう。",
      figure: {
        type: "compare",
        title: "困ったときのひと言",
        columns: [{ title: "こんなとき", tone: "blue" }, { title: "言い方", tone: "yellow" }],
        rows: [
          { label: "考えたい", cells: ["少し時間がほしい", "Let me see. / Well,"] },
          { label: "聞き返す", cells: ["質問が聞きとれない", "Sorry? / Pardon?"] },
          { label: "確かめる", cells: ["意味を確かめたい", "Do you mean 〜?"] },
        ],
        note: "ていねいに聞き返すなら Could you say that again?",
      },
    },
    {
      heading: "単語が出てこないときは、言いかえて説明する",
      body: "言いたい単語を知らなくても、話は止めなくてかまいません。{{かんたんな単語で説明}}したり、{{It's a kind of 〜.}} や {{It's something you use to 〜.}} の形を使ったりして、相手に伝えます。完ぺきな単語を探すより、{{伝わることを優先}}するのがスピーキングのコツです。",
      figure: {
        type: "cause",
        title: "「電卓」という単語が出てこない",
        causes: [
          { label: "種類で言う", sub: "機械の一種だと言う", tone: "blue" },
          { label: "使い道で言う", sub: "計算に使うと言う", tone: "blue" },
        ],
        effect: { label: "相手に伝わる", sub: "a calculator!", tone: "yellow" },
        chain: [{ label: "会話が続く", sub: "新しい単語も覚える" }],
        note: "英語では It's a kind of machine. You use it to calculate numbers.",
      },
    },
  ],
  mistakes: [
    { wrong: "質問に単語ひとつだけで答える（Tennis. / Yes.）", right: "主語と動詞のある文で答え、1文足す", why: "ひと言だと会話が止まり、評価でも「やり取りが続かない」とされます。" },
    { wrong: "発表で、理由や例から話し始めて結論を最後まで言わない", right: "最初に結論を言い、最後にもう一度言う", why: "聞き手は読み返せないので、結論が先にないと何の話かわからないまま聞くことになります。" },
    { wrong: "単語が出てこないと、日本語で考えこんでだまる", right: "Let me see. でつなぎ、かんたんな語で言いかえる", why: "沈黙は「伝える意思がない」と受け取られやすく、言いかえれば内容は伝わります。" },
  ],
  check: [
    { q: "答えのあとに相手へ話を返すときの、短い決まった言い方は？", a: "How about you?", why: "「あなたはどう？」と聞き返して、やり取りを続ける。" },
    { q: "発表の型 PREP の4つを順に言いましょう。", a: "Point（結論）→ Reason（理由）→ Example（例）→ Point（結論）", why: "結論を最初と最後の2回言う。" },
    { q: "質問が聞きとれなかったとき、ていねいに聞き返す言い方は？", a: "Could you say that again?（Pardon? なども可）", why: "だまらずに聞き返すのも、やり取りの大切な力。" },
  ],
  next: [
    { label: "ドリル「スピーキング」で鍛える", href: "/learn/eigo-ko/h-eng-skill-speaking" },
    { label: "会話表現をカードで覚える", href: "/learn/eigo-ko/h-eng-vocab-kaiwa" },
    { label: "書いて使う「自由英作文」", href: "/learn/lecture/h-eng-skill-jiyu" },
  ],
};
