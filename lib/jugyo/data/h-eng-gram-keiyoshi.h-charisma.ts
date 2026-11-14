import type { CastScript } from "../types";

// 止まる授業：形容詞・副詞（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-keiyoshi.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-keiyoshi.ts から引く。

export const H_KEIYOSHI_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-keiyoshi",
  castId: "h-charisma",
  title: "なぜ beautiful を使わない？　形容詞と副詞は「何を説明するか」で決まる",
  scenes: [
    { kind: "chapter", title: "つかみ：カードのひと言" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人はグリーティングカード会社の文案係。「美しいものは永遠の喜び」を a beautiful thing で書いたら、先輩に「キーツはそう書かなかった」と返された。",
      say: "カナメです。きょうの依頼人は、グリーティングカード会社の、文案係。美しいものは、永遠の喜び、を、ア ビューティフル シングで書いたら、先輩に、キーツは、そう書かなかった、と返された。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "キーツの長い詩『エンディミオン』の第1行は A thing of beauty is a joy for ever。200年たった今も、英語圏でことわざのように引用される。",
      say: "キーツの長い詩、エンディミオンの、だいいちぎょうは、ア シング オブ ビューティ イズ ア ジョイ フォー エヴァー。200ねんたった今も、英語圏で、ことわざのように引用される。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "受講生のユウキです。a beautiful thing のほうが短いのに。詩だから、なんとなくかっこつけただけじゃないですか？",
      say: "受講生のユウキです。ア ビューティフル シングのほうが、短いのに。詩だから、なんとなく、かっこつけただけじゃないですか？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "なんとなく、では片づかない。{{なぜ形容詞をやめて、名詞 beauty を後ろに置いたのか}}。形容詞と副詞を整理して、今日はこれを解く。",
      say: "なんとなく、では片づかない。なぜ形容詞をやめて、名詞のビューティを、うしろに置いたのか。形容詞と副詞を整理して、きょうは、これを解く。",
    },

    { kind: "chapter", title: "1. 形容詞の2つの使い方" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "ポイントは2つ。名詞の前に置いて直接説明する{{限定用法}}、a sleeping baby。be動詞などの後ろで{{補語}}になる{{叙述用法}}、The baby is asleep.",
      say: "ポイントは2つ。名詞のまえに置いて、直接説明する、限定用法。ア スリーピング ベイビー。ビー動詞などの、うしろで、補語になる、叙述用法。ザ ベイビー イズ アスリープ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "asleep, alive など" },
      text: "ここで差がつく。asleep・alive・afraid のように a- で始まる語の多くは叙述用法だけ。もとは on sleep のような「前置詞＋名詞」だから、名詞の前には置けない。逆に main・only・elder は限定用法だけだ。",
      say: "ここで差がつく。アスリープ、アライヴ、アフレイドのように、エーで始まるごの多くは、叙述用法だけ。もとは、オン スリープのような、前置詞たす名詞だから、名詞のまえには置けない。ぎゃくに、メイン、オンリー、エルダーは、限定用法だけだ。",
    },
    { kind: "talk", who: "sensei", text: "では確認。", say: "では確認。" },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "もう一つ。something や anyone を説明する形容詞は後ろ。something cold だ。形容詞に語句がついて長くなっても後ろに回る。a box full of toys。英語は、重く長いかたまりを後ろに置く言葉だ。",
      say: "もう一つ。サムシングや、エニワンを説明する形容詞は、うしろ。サムシング コールドだ。形容詞に、語句がついて、長くなっても、うしろに回る。ア ボックス フル オブ トイズ。英語は、おもく長いかたまりを、うしろに置く言葉だ。",
    },

    { kind: "chapter", title: "2. 数えられるかで選ぶ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "「たくさん」「少し」は名詞が{{数えられる}}かで変わる。book・friend は数えられる、water・money・advice は数えられない。many・a few・few は前者、much・a little・little は後者。",
      say: "たくさん、少し、は、名詞が、かぞえられるかで変わる。ブック、フレンドは、かぞえられる。ウォーター、マネー、アドヴァイスは、かぞえられない。メニー、ア フュー、フューは、ぜんしゃ。マッチ、ア リトル、リトルは、こうしゃ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "few books" },
      text: "a がつくと「少しある」で前向き、a がないと「ほとんどない」で否定。I have a few friends here. は「いるよ」、I have few friends here. は「さびしい」。",
      say: "エーがつくと、少しある、で前向き。エーがないと、ほとんどない、で否定。アイ ハヴ ア フュー フレンズ ヒアは、いるよ。アイ ハヴ フュー フレンズ ヒアは、さびしい。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "日本語の「たくさん」は1つだが、英語では名詞の種類が語を決める。many friends は言えても much friends とは言えない。much advice は言えても many advices とは言えない。",
      say: "日本語の、たくさん、は1つだが、英語では、名詞の種類が、ごを決める。メニー フレンズは言えても、マッチ フレンズとは言えない。マッチ アドヴァイスは言えても、メニー アドヴァイシズとは言えない。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "few・little は not なしで否定の意味を出せるから、書きことばでよく使う。同じ2〜3人でも、どちらの面を見るかで a の有無が変わる。",
      say: "フュー、リトルは、ノットなしで、否定の意味を出せるから、書きことばで、よく使う。同じ、2、3にんでも、どちらの面を見るかで、エーの、あるなしが変わる。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「大阪に友だちが少しいる」は I have a little friends in Osaka. ですね。",
      say: "じゃあ、大阪に、友だちが少しいる、は、アイ ハヴ ア リトル フレンズ イン オーサカ、ですね。",
    },
    { kind: "talk", who: "sensei", text: "よく落とす所。問題。", say: "よく落とすところ。問題。" },
    { kind: "pause", ref: "mistake:1" },

    { kind: "chapter", title: "3. 副詞は名詞以外の係" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "一言でいうと、形容詞は名詞の係、副詞は{{それ以外ぜんぶの係}}。run fast は動詞、very tall は形容詞、too quickly はほかの副詞、Luckily, … は文全体を説明する。",
      say: "ひとことでいうと、形容詞は名詞の係、副詞は、それ以外ぜんぶの係。ラン ファストは動詞、ベリー トールは形容詞、トゥー クイックリーは、ほかの副詞、ラッキリーは、文全体を説明する。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "だから She speaks English very good. はまちがい。speaks を説明するのは副詞だから well。注意深い運転手は a careful driver、注意深く運転するは drive carefully。",
      say: "だから、シー スピークス イングリッシュ ベリー グッドは、まちがい。スピークスを説明するのは、副詞だから、ウェル。注意深い運転手は、ア ケアフル ドライバー。注意深く運転するは、ドライヴ ケアフリー。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ただし lovely・friendly・lonely は -ly でも形容詞。キーツの第2行の loveliness は、lovely に -ness をつけた名詞だ。",
      say: "ただし、ラヴリー、フレンドリー、ロンリーは、エルワイでも、形容詞。キーツの、だいにぎょうの、ラヴリネスは、ラヴリーに、ネスをつけた名詞だ。",
    },

    { kind: "chapter", title: "4. 頻度の副詞と -ly の罠" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "always・usually・often・sometimes・rarely。置き場所は{{一般動詞の前、be動詞・助動詞の後ろ}}。キーツの it will never Pass into nothingness も、never は will の後ろ、pass の前だ。",
      say: "オールウェイズ、ユージュアリー、オフン、サムタイムズ、レアリー。置き場所は、一般動詞のまえ、ビー動詞、助動詞の、うしろ。キーツの、イット ウィル ネヴァー パス イントゥ ナッシングネスも、ネヴァーは、ウィルのうしろ、パスのまえだ。",
    },
    { kind: "talk", who: "sensei", text: "これを使え。問題。", say: "これを使え。問題。" },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "次は罠。hard は「熱心に」、hardly は「{{ほとんど〜ない}}」。late は遅く、lately は最近。near は近くに、nearly はもう少しで。He works hard. と He hardly works. は正反対だ。",
      say: "次はわな。ハードは、ねっしんに。ハードリーは、ほとんど、ない。レイトは、遅く。レイトリーは、最近。ニアは、近くに。ニアリーは、もう少しで。ヒー ワークス ハードと、ヒー ハードリー ワークスは、正反対だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも「テスト勉強を熱心にした」なら、副詞っぽい -ly をつけて I studied hardly for the test. のほうが正しそう。",
      say: "でも、テスト勉強を、ねっしんにした、なら、副詞っぽい、エルワイをつけて、アイ スタディード ハードリー フォー ザ テスト、のほうが、正しそう。",
    },
    { kind: "talk", who: "sensei", text: "ここで差がつく。問題。" },
    { kind: "pause", ref: "mistake:3" },

    { kind: "chapter", title: "謎解き：後ろに立つ「美」" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 5 },
      card: "reveal",
      text: "では謎。{{of＋抽象名詞}}は形容詞と同じはたらき。a matter of importance は an important matter。だから of beauty は beautiful の仲間だ。",
      say: "では謎。オブ、たす、抽象名詞は、形容詞と同じはたらき。ア マター オブ インポータンスは、アン インポータント マター。だから、オブ ビューティは、ビューティフルの仲間だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 5, focus: "a thing of beauty" },
      text: "ちがいは置き場所。a beautiful thing の主役は thing。a thing of beauty では、名詞の後ろに「美」そのものがどっしり立つ。物はいつか朽ちても、美は「決して無へと消えない」。次の行の内容と語順が重なる。",
      say: "ちがいは、置き場所。ア ビューティフル シングの主役は、シング。ア シング オブ ビューティでは、名詞のうしろに、びそのものが、どっしり立つ。ものはいつか朽ちても、美は、けっして、むへと、消えない。次のぎょうの内容と、語順が重なる。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "同じ下宿にいた医学生の後年の回想では、キーツははじめ a constant joy と書き、「何か足りない」と言われて joy for ever に直したという。形容詞 constant を、joy の後ろの for ever に変えたわけだ。",
      say: "同じ下宿にいた、医学生の、後年の回想では、キーツは、はじめ、ア コンスタント ジョイと書き、何か足りない、と言われて、ジョイ フォー エヴァーに直したという。形容詞のコンスタントを、ジョイのうしろの、フォー エヴァーに変えたわけだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "しかも a THING of BEAU-ty と、弱い音と強い音が交互に並んで口ずさみやすい。かっこつけじゃなかったんですね。",
      say: "しかも、ア シング オブ ビューティと、弱い音と強い音が、交互に並んで、口ずさみやすい。かっこつけじゃなかったんですね。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "次はきみが講師だ。キーワードは、限定と叙述、数えられるか、名詞以外の係、置き場所、of＋抽象名詞。この順につないで、文案係に a thing of beauty を選ぶ理由を説明してみよう。",
      say: "次は、きみが講師だ。キーワードは、限定と叙述、かぞえられるか、名詞以外の係、置き場所、オブ、たす、抽象名詞。この順につないで、文案係に、ア シング オブ ビューティを選ぶ理由を、説明してみよう。",
    },
  ],
};
