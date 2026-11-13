import type { CastScript } from "../types";

// 止まる授業：文型（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-bunkei.ts の本文だけ。
// 画面の前のきみに語りかけ、テンポよく進める。英文は say でカタカナに開く。引用は lecture にある部分だけ。問題は data/h-eng-gram-bunkei.ts から引く。

export const H_BUNKEI_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-bunkei",
  castId: "h-nekketsu",
  title: "3語にこめた呼びかけを解け！　文型バトル",
  scenes: [
    { kind: "chapter", title: "つかみ：電話しろ、じゃない！" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、いくぞ！　画面の前のきみに謎だ。アメリカ文学の名作、メルヴィルの『白鯨』の書き出しは、Call me Ishmael. たった3語！　My name is Ishmael. で済むのに、なぜ命令文の第5文型なんだ！",
      say: "さあ、いくぞ！　画面の前のきみに、謎だ。アメリカ文学の名作、メルヴィルの、はくげいの書き出しは、コール ミー イシュメール。たった3語！　マイ ネーム イズ イシュメール、で済むのに、なぜ、命令文の、第5文型なんだ！",
    },
    { kind: "talk", who: "seito", text: "えっ、コールって電話ですよね？　イシュメールさんに電話しろ、って意味じゃ……。", say: "えっ、コールって、電話ですよね？　イシュメールさんに、電話しろ、って意味じゃ。" },
    {
      kind: "talk",
      who: "sensei",
      text: "電話じゃない！　新訳を準備している翻訳者さんが、この3語で手が止まっているんだ。文型の力で、きみと答えを出すぞ！",
      say: "電話じゃない！　新訳を準備している、翻訳者さんが、この3語で、手がとまっているんだ。文型の力で、きみと、答えを出すぞ！",
    },

    { kind: "chapter", title: "1. 飾りを外せ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "文の柱は4つ！　{{S（主語）・V（動詞）・O（目的語）・C（補語）}}！　時・場所・様子の副詞や「前置詞＋名詞」は飾りの{{M（修飾語）}}で、文型には数えない！",
      say: "文の柱は、よっつ！　エス、主語。ブイ、動詞。オー、目的語。シー、補語！　時、場所、様子の副詞や、前置詞、たす、名詞は、飾りの、エム、修飾語で、文型には、かぞえない！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "My uncle walks." },
      text: "My uncle walks in the park every morning. in the park と every morning をかっこでくくれ！　残るのは My uncle walks. S＋V の第1文型だ！",
      say: "マイ アンクル ウォークス イン ザ パーク エブリ モーニング。イン ザ パークと、エブリ モーニングを、かっこでくくれ！　残るのは、マイ アンクル ウォークス。エス、たす、ブイの、第1文型だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ここが熱い！　1611年、およそ50人の学者が7年ほどかけて訳した欽定訳聖書。その最初の1文、In the beginning God created the heaven and the earth. 先頭は M！　柱は God created だ！",
      say: "ここが熱い！　1611ねん、およそ50にんの学者が、7ねんほどかけて訳した、欽定訳聖書。その最初の1文、イン ザ ビギニング ゴッド クリエイテッド ザ ヘブン アンド ジ アース。先頭は、エム！　柱は、ゴッド クリエイテッドだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "先頭にあっても、前置詞のついた名詞は主語じゃないんですね！",
      say: "先頭にあっても、前置詞のついた名詞は、主語じゃないんですね！",
    },

    { kind: "chapter", title: "2. 後ろに何個だ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "文型は「動詞が後ろに何個ほしがるか」！　0個なら第1文型！　1個なら第2か第3！　2個なら第4か第5！",
      say: "文型は、動詞が、うしろに、なんこ、ほしがるか！　ゼロこなら、第1文型！　1こなら、第2か、第3！　2こなら、第4か、第5！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "第1文型" },
      text: "第1文型の最強の例が、Jesus wept. 英語の聖書でもっとも短い節、たった2語！　weep は O をとらない{{自動詞}}だ！",
      say: "第1文型の、最強の例が、ジーザス ウェプト。英語の聖書で、もっとも短いせつ、たった2語！　ウィープは、オーをとらない、自動詞だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "友の死を前にした場面で、理由も様子も M で説明しない！　柱がむき出しになるぶん、ひびきが強くなる！　短い文は弱いんじゃないんだ！",
      say: "友の死を前にした場面で、理由も、様子も、エムで説明しない！　柱が、むき出しになるぶん、ひびきが、強くなる！　短い文は、弱いんじゃないんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "辞書の自・他の記号や〔＋O＋C〕の表示は、この「後ろにいくつ」を教えてくれる地図なんだ！",
      say: "辞書の、じ、た、の記号や、たす、オー、たす、シー、の表示は、この、うしろに、いくつ、を教えてくれる、地図なんだ！",
    },
    { kind: "talk", who: "seito", text: "じゃあ、I went to the station. は went の後ろに the station があるから、第3文型！", say: "じゃあ、アイ ウェント トゥー ザ ステーションは、ウェントのうしろに、ザ ステーションがあるから、第3文型！" },
    { kind: "talk", who: "sensei", text: "画面の前のきみはどう思う？　問題だ！" },
    { kind: "pause", ref: "mistake:1" },

    { kind: "chapter", title: "3. ＝でぶった切れ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "決め手は「＝」だ！　Mika became a nurse. は Mika＝a nurse だから C、第2文型！　We call him Ben. は him＝Ben で O C、第5文型！",
      say: "決め手は、イコールだ！　ミカ ビケイム ア ナース、は、ミカ、イコール、ア ナースだから、シー、第2文型！　ウィー コール ヒム ベン、は、ヒム、イコール、ベンで、オー シー、第5文型！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "SVOO" },
      text: "He sent me a card. は？　わたしはカードではない！　＝が成り立たないから「人に物を」の O O、第4文型だ！",
      say: "ヒー セント ミー ア カード、は？　わたしは、カードではない！　イコールが成り立たないから、ひとに、ものを、の、オー オー、第4文型だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そしてもう一つ！　C に入るのは名詞か{{形容詞}}！　副詞は入らない！",
      say: "そして、もうひとつ！　シーに入るのは、名詞か、形容詞！　副詞は、入らない！",
    },
    { kind: "talk", who: "seito", text: "うれしそうに見える、だから She looks happily. ですよね！", say: "うれしそうに見える、だから、シー ルックス ハッピリー、ですよね！" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "さあ、謎解きだ！　Call me Ishmael. は you が省かれた命令文、me＝Ishmael の SVOC！　My name is Ishmael. の SVC なら事実の報告。でも SVOC の命令文では、＝をつくるのは呼ぶ読者のほうなんだ！",
      say: "さあ、謎解きだ！　コール ミー イシュメールは、ユーが省かれた命令文、ミー、イコール、イシュメールの、エス ブイ オー シー！　マイ ネーム イズ イシュメールの、エス ブイ シーなら、事実の報告。でも、エス ブイ オー シーの命令文では、イコールをつくるのは、呼ぶ読者のほうなんだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "そっか！　読者は最初の3語で話しかけられて、そう呼ぶ約束をさせられる。しかも本名かどうかはぼかしたまま！",
      say: "そっか！　読者は、最初の3語で、話しかけられて、そう呼ぶ約束を、させられる。しかも、本名かどうかは、ぼかしたまま！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そうだ！　イシュメールは旧約聖書の「創世記」に出てくる、荒野で生きる人物の名で、「さすらう者」の響きをもつ！　3語の文型が、語り手と読者の近さと、語り手の謎を、同時に生み出しているんだ！",
      say: "そうだ！　イシュメールは、旧約聖書の、創世記に出てくる、こうやで、いきる人物の名で、さすらう者の、響きをもつ！　3語の文型が、語り手と、読者の近さと、語り手の謎を、同時に生み出しているんだ！",
    },

    { kind: "chapter", title: "4. to か for か！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "第4文型は「物＋to / for＋人」の第3文型に書きかえられる！　I showed her the photo. は I showed the photo to her. show は相手に届けば成り立つから to！",
      say: "第4文型は、もの、たす、トゥー、または、フォー、たす、ひと、の、第3文型に、書きかえられる！　アイ ショウド ハー ザ フォト、は、アイ ショウド ザ フォト トゥー ハー。ショウは、相手に届けば、成り立つから、トゥー！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "for" },
      text: "Dad cooked us dinner. は Dad cooked dinner for us. cook は相手のためにわざわざするから for だ！",
      say: "ダッド クックト アス ディナー、は、ダッド クックト ディナー フォー アス。クックは、相手のために、わざわざするから、フォーだ！",
    },
    { kind: "talk", who: "seito", text: "プレゼントは届けるものだから、I bought a present to my sister. で！", say: "プレゼントは、届けるものだから、アイ ボート ア プレゼント トゥー マイ シスター、で！" },
    { kind: "talk", who: "sensei", text: "動詞をよく見ろ！　問題だ！" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "そして英語には、新しい大事な情報を文の最後に置く{{文末焦点}}の傾向がある！　Give us this day our daily bread. は、日々の糧が最後に来て重みが置かれるんだ！",
      say: "そして、英語には、新しい、大事な情報を、文の最後に置く、文末焦点の傾向がある！　ギブ アス ディス デイ アワ デイリー ブレッドは、日々の糧が、最後に来て、重みが置かれるんだ！",
    },

    { kind: "chapter", title: "5. 文型が意味を決める！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "ラストは find！　I found the key. は SVO で「鍵を見つけた」！　She found me a seat. は SVOO で「わたしに席を見つけてくれた」！",
      say: "ラストは、ファインド！　アイ ファウンド ザ キー、は、エス ブイ オーで、鍵を見つけた！　シー ファウンド ミー ア シート、は、エス ブイ オー オーで、わたしに、席を見つけてくれた！",
    },
    {
      kind: "talk",
      who: "seito",
      board: { section: 4, focus: "I found the book easy." },
      text: "I found the book easy. は、the book＝easy だから SVOC。「やさしい本を見つけた」じゃなくて、「その本はやさしいとわかった」！",
      say: "アイ ファウンド ザ ブック イージー、は、ザ ブック、イコール、イージーだから、エス ブイ オー シー。やさしい本を見つけた、じゃなくて、その本は、やさしいと、わかった！",
    },
    { kind: "talk", who: "sensei", text: "最高だ！　訳を決めるのは{{文型}}！　ラストの問題だ！", say: "最高だ！　やくを決めるのは、文型！　ラストの問題だ！" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "seito",
      text: "翻訳者さんへの答え！　名のる文じゃなくて、読者に「そう呼んでくれ」と頼む文。だから「イシュメールと呼んでくれ」の方向です！",
      say: "翻訳者さんへの答え！　名のる文じゃなくて、読者に、そう呼んでくれ、と頼む文。だから、イシュメールと、呼んでくれ、の方向です！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そのとおり！　M を外せ、後ろを数えろ、＝を確かめろ！　画面の前のきみも、長い英文はこの3ステップで攻略だ！",
      say: "そのとおり！　エムを外せ、うしろを、かぞえろ、イコールを、確かめろ！　画面の前のきみも、長い英文は、この3ステップで、攻略だ！",
    },
  ],
};
