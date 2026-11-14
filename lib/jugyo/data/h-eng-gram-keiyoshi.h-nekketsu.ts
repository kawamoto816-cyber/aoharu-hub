import type { CastScript } from "../types";

// 止まる授業：形容詞・副詞（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-keiyoshi.ts の本文だけ。
// 画面の前のきみに語りかける講義ショー。実在の講演家・YouTuber のあいさつ・決めぜりふはまねしない。英文は say でカタカナに開く。問題は data/h-eng-gram-keiyoshi.ts から引く。

export const H_KEIYOSHI_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-keiyoshi",
  castId: "h-nekketsu",
  title: "「美」を後ろに置け！　形容詞と副詞の講義ショー",
  scenes: [
    { kind: "chapter", title: "オープニング：キーツの1行" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、いくぞ！　ダイチだ！　今日の依頼人はカード会社の文案係！　「美しいものは永遠の喜び」を a beautiful thing と書いたら、「キーツはそう書かなかった」と返されたんだ！",
      say: "さあ、いくぞ！　ダイチだ！　きょうのいらいにんは、カード会社の、文案係！　美しいものは、永遠の喜び、を、ア ビューティフル シングと書いたら、キーツは、そう書かなかった、と返されたんだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "聞き役のカエデです！　キーツの『エンディミオン』の第1行は A thing of beauty is a joy for ever。200年たっても引用されてるんだって！",
      say: "聞き役のカエデです！　キーツの、エンディミオンの、だいいちぎょうは、ア シング オブ ビューティ イズ ア ジョイ フォー エヴァー。200ねんたっても、引用されてるんだって！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "キーツはロンドンの貸し馬屋の家に生まれ、外科医の見習いとして病院で学んだあと、医師の道を捨てて詩人になった！　22歳で書き上げたのが、この長い詩だ！",
      say: "キーツは、ロンドンの、かしうまやのいえにうまれ、外科医の見習いとして、病院で学んだあと、医師の道を捨てて、詩人になった！　22さいで、書きあげたのが、この長い詩だ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも a beautiful thing のほうが短くて楽じゃない？　詩人って遠回しが好きなだけでしょ！",
      say: "でも、ア ビューティフル シングのほうが、短くて楽じゃない？　詩人って、遠回しが好きなだけでしょ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "待った！　{{なぜ beautiful をやめて、名詞 beauty を後ろに置いたのか}}。形容詞と副詞を全部整理して、画面の前のきみと解き明かすぞ！",
      say: "待った！　なぜ、ビューティフルをやめて、名詞のビューティを、うしろに置いたのか。形容詞と副詞を、全部整理して、画面の前のきみと、解き明かすぞ！",
    },

    { kind: "chapter", title: "1. 形容詞は2つの顔をもつ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "a sleeping baby" },
      text: "1つめの顔！　名詞の前に置いて直接説明する{{限定用法}}！　a sleeping baby！",
      say: "ひとつめの顔！　名詞のまえに置いて、直接説明する、限定用法！　ア スリーピング ベイビー！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "The baby is asleep." },
      text: "2つめの顔！　be動詞などの後ろで{{補語}}になる{{叙述用法}}！　The baby is asleep.！　そして asleep・alive・afraid のように a- で始まる語の多くは、叙述用法だけだ！",
      say: "ふたつめの顔！　ビー動詞などの、うしろで、補語になる、叙述用法！　ザ ベイビー イズ アスリープ！　そして、アスリープ、アライヴ、アフレイドのように、エーで始まるごの多くは、叙述用法だけだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "えっ、なんで前に置けないの？",
      say: "えっ、なんで、まえに置けないの？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "もとは on sleep のような「前置詞＋名詞」から生まれた語だからだ！　逆に main・only・elder は前にしか置けない！　画面の前のきみ、いくぞ！",
      say: "もとは、オン スリープのような、前置詞たす名詞から、うまれたごだからだ！　ぎゃくに、メイン、オンリー、エルダーは、まえにしか置けない！　画面の前のきみ、いくぞ！",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "ここが熱い！　形容詞が後ろに回ることもある！　something cold！　a box full of toys！　重く長いかたまりは後ろへ！　キーツの4行目 A bower quiet for us も、5行目の Full of sweet dreams も、名詞の後ろに回っているんだ！",
      say: "ここが熱い！　形容詞が、うしろに回ることもある！　サムシング コールド！　ア ボックス フル オブ トイズ！　おもく長いかたまりは、うしろへ！　キーツの、よんぎょうめ、ア バウアー クワイエット フォー アスも、ごぎょうめの、フル オブ スウィート ドリームズも、名詞の、うしろに回っているんだ！",
    },

    { kind: "chapter", title: "2. 数えられるかで勝負が決まる！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "「たくさん」「少し」は、名詞が{{数えられる}}かで語が変わる！　books なら many・a few・few！　water なら much・a little・little！",
      say: "たくさん、少し、は、名詞が、かぞえられるかで、ごが変わる！　ブックスなら、メニー、ア フュー、フュー！　ウォーターなら、マッチ、ア リトル、リトル！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "little water" },
      text: "a がつけば「少しある」で前向き！　a がなければ「ほとんどない」で否定！　few と little は、not なしで否定を出せる技ありの語だ！",
      say: "エーがつけば、少しある、で前向き！　エーがなければ、ほとんどない、で否定！　フューと、リトルは、ノットなしで、否定を出せる、技ありのごだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "よーし！　「大阪に友だちが少しいる」は I have a little friends in Osaka.！　少しだから little！",
      say: "よーし！　大阪に、友だちが少しいる、は、アイ ハヴ ア リトル フレンズ イン オーサカ！　少しだから、リトル！",
    },
    { kind: "talk", who: "sensei", text: "待った！　画面の前のきみ、どっちだ！　問題！", say: "待った！　画面の前のきみ、どっちだ！　問題！" },
    { kind: "pause", ref: "mistake:1" },

    { kind: "chapter", title: "3. 副詞はそれ以外ぜんぶ！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "形容詞は名詞の係！　副詞は{{それ以外ぜんぶの係}}！　動詞、形容詞、ほかの副詞、そして文全体！　Luckily, nobody was hurt. の Luckily は、文全体に「幸いなことに」を足している！",
      say: "形容詞は、名詞の係！　副詞は、それ以外ぜんぶの係！　動詞、形容詞、ほかの副詞、そして文全体！　ラッキリー、ノーバディ ワズ ハート、の、ラッキリーは、文全体に、さいわいなことに、を足している！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "だから very good はダメ、speaks を説明するなら very well！　注意深い運転手は a careful driver、注意深く運転するなら drive carefully だ！",
      say: "だから、ベリー グッドはダメ、スピークスを説明するなら、ベリー ウェル！　注意深い運転手は、ア ケアフル ドライバー。注意深く運転するなら、ドライヴ ケアフリーだ！",
    },

    { kind: "chapter", title: "4. never の居場所と -ly の罠！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "always" },
      text: "always から rarely まで、頻度の副詞の置き場所は決まっている！　{{一般動詞の前、be動詞・助動詞の後ろ}}！　キーツの it will never Pass into nothingness も、never は will の後ろだ！",
      say: "オールウェイズから、レアリーまで、頻度の副詞の、置き場所は、決まっている！　一般動詞のまえ、ビー動詞、助動詞の、うしろ！　キーツの、イット ウィル ネヴァー パス イントゥ ナッシングネスも、ネヴァーは、ウィルのうしろだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "次の but still will keep の still は「今も変わらず」で、こっちは will の前なんだね！　「決して消えない」「なお守る」、2つの副詞で喜びがずっと続くって支えてる！",
      say: "次の、バット スティル ウィル キープの、スティルは、今も変わらず、で、こっちは、ウィルのまえなんだね！　けっして消えない、なお守る、ふたつの副詞で、喜びが、ずっと続くって、支えてる！",
    },
    { kind: "talk", who: "sensei", text: "さあ、きみの番だ！", say: "さあ、きみの番だ！" },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "次は罠だ！　hard は「熱心に」！　ところが hardly は「{{ほとんど〜ない}}」！　He works hard. と He hardly works. は正反対！",
      say: "次は、わなだ！　ハードは、ねっしんに！　ところが、ハードリーは、ほとんど、ない！　ヒー ワークス ハードと、ヒー ハードリー ワークスは、正反対！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "うっそ！　わたし「テスト勉強を熱心にした」を I studied hardly for the test. って書こうとしてた！",
      say: "うっそ！　わたし、テスト勉強を、ねっしんにした、を、アイ スタディード ハードリー フォー ザ テスト、って書こうとしてた！",
    },
    { kind: "talk", who: "sensei", text: "画面の前のきみ、正しいのはどっちだ！", say: "画面の前のきみ、正しいのは、どっちだ！" },
    { kind: "pause", ref: "mistake:3" },

    { kind: "chapter", title: "クライマックス：美が主役になる" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 5, focus: "a thing of beauty" },
      card: "reveal",
      text: "さあ、謎解きだ！　{{of＋抽象名詞}}は形容詞と同じはたらき！　a matter of importance は an important matter！　だから of beauty は beautiful の仲間だ！",
      say: "さあ、謎解きだ！　オブ、たす、抽象名詞は、形容詞と同じはたらき！　ア マター オブ インポータンスは、アン インポータント マター！　だから、オブ ビューティは、ビューティフルの仲間だ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "でも置き場所がちがう！　a beautiful thing の主役は thing！　a thing of beauty では、最後に「美」そのものがどっしり立つ！　物は朽ちても、美は「決して無へと消えない」！　次の行と語順が重なるんだ！",
      say: "でも、置き場所がちがう！　ア ビューティフル シングの主役は、シング！　ア シング オブ ビューティでは、最後に、びそのものが、どっしり立つ！　ものは朽ちても、美は、けっして、むへと、消えない！　次のぎょうと、語順が重なるんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "証拠もある！　同じ下宿にいた医学生の後年の回想によれば、キーツははじめ a constant joy と書き、「何か足りない」と言われて joy for ever に直した！　形容詞を、名詞の後ろへ回したんだ！",
      say: "証拠もある！　同じ下宿にいた、医学生の、後年の回想によれば、キーツは、はじめ、ア コンスタント ジョイと書き、何か足りない、と言われて、ジョイ フォー エヴァーに直した！　形容詞を、名詞のうしろへ、回したんだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "しかも弱い音と強い音が交互で、口ずさみやすい！　遠回しじゃなくて、いちばん伝わる置き方だったんだ！",
      say: "しかも、弱い音と強い音が、交互で、口ずさみやすい！　遠回しじゃなくて、いちばん伝わる、置きかただったんだ！",
    },

    {
      kind: "talk",
      who: "sensei",
      text: "キーツは1821年、25歳でローマに没した。墓に名は刻まれていない！　だが名詞の後ろに置かれた「美」と「とこしえ」は、詩人の名より長く人々の記憶に残った！　置き場所ひとつで、文法は伝え方の技になる！",
      say: "キーツは、1821ねん、25さいで、ローマに没した。墓に、なは刻まれていない！　だが、名詞のうしろに置かれた、美と、とこしえは、詩人の、なより長く、人々の記憶に残った！　置き場所ひとつで、文法は、伝えかたの技になる！",
    },
    { kind: "chapter", title: "エンディング" },
    {
      kind: "talk",
      who: "sensei",
      text: "画面の前のきみ、最後の挑戦だ！　限定と叙述、数えられるか、名詞以外の係、置き場所、of＋抽象名詞！　この5つで、文案係に a thing of beauty を選ぶ理由を語ってみろ！",
      say: "画面の前のきみ、最後の挑戦だ！　限定と叙述、かぞえられるか、名詞以外の係、置き場所、オブ、たす、抽象名詞！　この5つで、文案係に、ア シング オブ ビューティを選ぶ理由を、ごってみろ！",
    },
  ],
};
