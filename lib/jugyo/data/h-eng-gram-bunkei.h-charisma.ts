import type { CastScript } from "../types";

// 止まる授業：文型（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-bunkei.ts の本文だけ。
// 要点をしぼって言い切る。英文は say でカタカナに開く。引用は lecture にある部分だけ。問題は data/h-eng-gram-bunkei.ts から引く。

export const H_BUNKEI_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-bunkei",
  castId: "h-charisma",
  title: "後ろに何個、そして「＝」　文型を言い切る",
  scenes: [
    { kind: "chapter", title: "つかみ：たった3語の書き出し" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。メルヴィルの『白鯨』は、Call me Ishmael. の3語で始まる。My name is Ishmael. と書けば済むのに、作者は命令文の、しかも{{第5文型}}を選んだ。{{なぜか}}。",
      say: "カナメです。メルヴィルの、はくげいわ、コール ミー イシュメール、の、3語で始まる。マイ ネーム イズ イシュメール、と書けば済むのに、作者は、命令文の、しかも、第5文型を選んだ。なぜか。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "依頼人は、新訳を準備している翻訳者。「わたしの名はイシュメール」と訳すか、「イシュメールと呼んでくれ」と訳すか。最初の3語で手が止まっている。",
      say: "いらいにんは、新訳を準備している、翻訳者。わたしの名は、イシュメール、と訳すか、イシュメールと、呼んでくれ、と訳すか。最初の3語で、手がとまっている。",
    },
    { kind: "talk", who: "seito", text: "受講生のユウキです。どっちも意味は同じじゃないですか？　名前を言ってるだけで。" },
    { kind: "talk", who: "sensei", text: "そこを、文型で言い切れるようにする。今日のポイントは2つ。後ろに何個、そして「＝」。", say: "そこを、文型で言い切れるようにする。きょうのポイントは、ふたつ。うしろに、なんこ。そして、イコール。" },

    { kind: "chapter", title: "1. M を外して骨組みを見る" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "文の要素は4つ。{{S（主語）・V（動詞）・O（目的語）・C（補語）}}。時・場所・様子を表す副詞や「前置詞＋名詞」は{{M（修飾語）}}で、文型には数えない。",
      say: "文の要素は、よっつ。エス、主語。ブイ、動詞。オー、目的語。シー、補語。時、場所、様子を表す、副詞や、前置詞、たす、名詞は、エム、修飾語で、文型には、かぞえない。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "in the park" },
      text: "My uncle walks in the park every morning. まず M をかっこでくくる。in the park と every morning を外すと、残るのは My uncle walks. S＋V で第1文型だ。",
      say: "マイ アンクル ウォークス イン ザ パーク エブリ モーニング。まず、エムを、かっこでくくる。イン ザ パークと、エブリ モーニングを外すと、残るのは、マイ アンクル ウォークス。エス、たす、ブイで、第1文型だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1611年の欽定訳聖書の最初の1文も同じ。In the beginning God created the heaven and the earth. 先頭の In the beginning は M。外すと God created …… で、第3文型。前置詞のついた名詞は、主語にも目的語にもならない。",
      say: "1611ねんの、欽定訳聖書の、最初の1文も同じ。イン ザ ビギニング ゴッド クリエイテッド ザ ヘブン アンド ジ アース。先頭の、イン ザ ビギニングは、エム。外すと、ゴッド クリエイテッド、で、第3文型。前置詞のついた名詞は、主語にも、目的語にも、ならない。",
    },

    { kind: "chapter", title: "2. 後ろに何個" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "一言でいうと、文型は「動詞が後ろに何を何個ほしがるか」。0個なら第1文型。1個なら第2か第3。2個なら第4か第5。数えるのは M を外した柱だけ。",
      say: "ひとことでいうと、文型は、動詞が、うしろに、なにを、なんこ、ほしがるか。ゼロこなら、第1文型。1こなら、第2か、第3。2こなら、第4か、第5。かぞえるのは、エムを外した、柱だけ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "第1文型" },
      text: "第1文型の極みが、Jesus wept. の2語。英語の聖書でもっとも短い節として知られる。weep は後ろに O をとらない{{自動詞}}だ。",
      say: "第1文型の極みが、ジーザス ウェプト、の2語。英語の聖書で、もっとも短いせつとして、知られる。ウィープは、うしろに、オーをとらない、自動詞だ。",
    },
    { kind: "talk", who: "seito", text: "じゃあ I went to the station. は、went の後ろに the station があるから、第3文型ですね。", say: "じゃあ、アイ ウェント トゥー ザ ステーションは、ウェントのうしろに、ザ ステーションがあるから、第3文型ですね。" },
    { kind: "talk", who: "sensei", text: "ここで差がつく。問題。" },
    { kind: "pause", ref: "mistake:1" },

    { kind: "chapter", title: "3. 「＝」で見分ける" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "後ろが1つなら、主語と「＝」か。Mika became a nurse. は Mika＝a nurse だから C で第2文型。I lost my key. は＝にならないから O で第3文型。",
      say: "うしろが、ひとつなら、主語と、イコールか。ミカ ビケイム ア ナース、は、ミカ、イコール、ア ナース、だから、シーで、第2文型。アイ ロスト マイ キー、は、イコールにならないから、オーで、第3文型。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "SVOC" },
      text: "後ろが2つなら、2つ目が1つ目と＝か。We call him Ben. は him＝Ben で第5文型の SVOC。He sent me a card. は、わたしはカードではないから、「人に物を」の第4文型。",
      say: "うしろが、ふたつなら、ふたつめが、ひとつめと、イコールか。ウィー コール ヒム ベン、は、ヒム、イコール、ベンで、第5文型の、エス ブイ オー シー。ヒー セント ミー ア カード、は、わたしは、カードではないから、ひとに、ものを、の、第4文型。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "もう一つ。C に入るのは名詞か{{形容詞}}。副詞は入らない。",
      say: "もうひとつ。シーに入るのは、名詞か、形容詞。副詞は、入らない。",
    },
    { kind: "talk", who: "seito", text: "「楽しそうに見える」なら、She looks happily. ですよね。「〜そうに」だから副詞で。", say: "楽しそうに見える、なら、シー ルックス ハッピリー、ですよね。そうに、だから、副詞で。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "謎解きだ。Call me Ishmael. は主語の you が省かれた命令文。me＝Ishmael だから SVOC。My name is Ishmael. の SVC なら事実の報告。でも SVOC の命令文では、その「＝」をつくるのは、呼ぶ読者の側だ。",
      say: "謎解きだ。コール ミー イシュメールは、主語の、ユーが省かれた、命令文。ミー、イコール、イシュメールだから、エス ブイ オー シー。マイ ネーム イズ イシュメールの、エス ブイ シーなら、事実の報告。でも、エス ブイ オー シーの命令文では、そのイコールをつくるのは、呼ぶ読者の側だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "しかも本名だとは一言も言っていない。読者は最初の3語で話しかけられ、彼をそう呼ぶ約束をさせられる。語り手との近さと、語り手の謎。3語の文型が、その二つを同時に生んでいる。",
      say: "しかも、本名だとは、ひとことも、言っていない。読者は、最初の3語で、話しかけられ、彼を、そう呼ぶ約束を、させられる。語り手との近さと、語り手の謎。3語の文型が、そのふたつを、同時に生んでいる。",
    },

    { kind: "chapter", title: "4. to と for" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "第4文型は、物を先に出して「物＋to / for＋人」の第3文型にできる。I showed her the photo. は I showed the photo to her. show は相手に届けば成り立つ動作だから to。",
      say: "第4文型は、ものを先に出して、もの、たす、トゥー、または、フォー、たす、ひと、の、第3文型にできる。アイ ショウド ハー ザ フォト、は、アイ ショウド ザ フォト トゥー ハー。ショウは、相手に届けば、成り立つ動作だから、トゥー。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "for" },
      text: "Dad cooked us dinner. は Dad cooked dinner for us. cook は相手のためにわざわざする動作だから for。",
      say: "ダッド クックト アス ディナー、は、ダッド クックト ディナー フォー アス。クックは、相手のために、わざわざする動作だから、フォー。",
    },
    { kind: "talk", who: "seito", text: "なるほど。じゃあ、I bought a present to my sister. で決まりですね。", say: "なるほど。じゃあ、アイ ボート ア プレゼント トゥー マイ シスター、で決まりですね。" },
    { kind: "talk", who: "sensei", text: "buy はどっちの動作か。問題。", say: "バイは、どっちの動作か。問題。" },
    { kind: "pause", ref: "mistake:2" },

    { kind: "chapter", title: "5. 文型が変わると意味が変わる" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "最後に find。I found the key. は SVO で「鍵を見つけた」。She found me a seat. は SVOO で「わたしに席を見つけてくれた」。",
      say: "最後に、ファインド。アイ ファウンド ザ キー、は、エス ブイ オーで、鍵を見つけた。シー ファウンド ミー ア シート、は、エス ブイ オー オーで、わたしに、席を見つけてくれた。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "『白鯨』の続きにも find が出る。find myself growing grim は、myself＝growing grim の SVOC で「自分が口もとをけわしくしていくのに気づく」。長い一節の whenever のかたまりは、全部 M。外すと、柱は I account it high time だけ。it＝high time の第5文型だ。",
      say: "はくげいの続きにも、ファインドが出る。ファインド マイセルフ グローイング グリム、は、マイセルフ、イコール、グローイング グリムの、エス ブイ オー シーで、自分が、口もとを、けわしくしていくのに、気づく。長い一節の、ホエネバーのかたまりは、全部エム。外すと、柱は、アイ アカウント イット ハイ タイム、だけ。イット、イコール、ハイ タイムの、第5文型だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4, focus: "I found the book easy." },
      text: "I found the book easy. は the book＝easy だから SVOC で「その本はやさしいとわかった」。訳を決めるのは単語帳の1つ目の意味ではなく、{{文型}}だ。では確認。",
      say: "アイ ファウンド ザ ブック イージー、は、ザ ブック、イコール、イージーだから、エス ブイ オー シーで、その本は、やさしいと、わかった。やくを決めるのは、単語帳の、ひとつめの意味ではなく、文型だ。では、確認。",
    },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "seito",
      text: "翻訳者さんへの答えは、名のる文ではなく、読者に「そう呼んでくれ」と頼む文。だから「イシュメールと呼んでくれ」の方向、ですね。",
      say: "翻訳者さんへの答えは、名のる文ではなく、読者に、そう呼んでくれ、と頼む文。だから、イシュメールと、呼んでくれ、の方向、ですね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そのとおり。迷ったら M を外し、後ろの数を数え、「＝」を確かめる。これで長い文も骨組みから言い切れる。",
      say: "そのとおり。迷ったら、エムを外し、うしろのかずを、かぞえ、イコールを確かめる。これで、長い文も、骨組みから、言い切れる。",
    },
  ],
};
