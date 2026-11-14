import type { CastScript } from "../types";

// 止まる授業：名詞・冠詞（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-meishi.ts の本文だけ。
// 画面の前のきみに語りかけ、テンポよく進める。英文は say でカタカナに開く。問題は data/h-eng-gram-meishi.ts から引く。

export const H_MEISHI_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-meishi",
  castId: "h-nekketsu",
  title: "the は「わかるよね」の合図だ！　名詞と冠詞の判断ショー",
  scenes: [
    { kind: "chapter", title: "オープニング：初登場なのに the！" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、いくぞ！　ダイチだ！　イギリスで150年以上愛されてきた詩「フクロウと子ネコ」！　始まりは The Owl and the Pussy-Cat went to sea / In a beautiful pea-green boat！　全員初登場なのに、動物には the、ボートには a！　なぜだ！",
      say: "さあ、いくぞ！　ダイチだ！　イギリスで、150ねん以上、愛されてきた詩、フクロウと子ネコ！　始まりは、ジ アウル アンド ザ プッシーキャット ウェント トゥー シー、イン ア ビューティフル ピーグリーン ボート！　全員、初登場なのに、動物には、ザ、ボートには、ア！　なぜだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "聞き役のカエデです！　依頼人は絵本の翻訳家。「あるフクロウとあるネコが」と訳すか、「フクロウとネコは」と訳すかで、物語の始まり方がまるで変わっちゃうんだって！",
      say: "聞き役のカエデです！　依頼人は、絵本の、翻訳家。ある、フクロウと、ある、ネコが、と訳すか、フクロウと、ネコは、と訳すかで、物語の、始まりかたが、まるで、変わっちゃうんだって！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "画面の前のきみも、いっしょに解くぞ！　日本語は「本を買った」で済むが、英語は名詞を使うたびに、数えられるか、いくつか、どれのことか分かるかを決める！　この筋道をつかめ！",
      say: "画面の前のきみも、いっしょに解くぞ！　日本語は、本を買った、で、すむが、英語は、名詞を使うたびに、かぞえられるか、いくつか、どれのことか、わかるか、を決める！　この、すじみちを、つかめ！",
    },

    { kind: "chapter", title: "1. 数えられる？　数えられない？" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "最初のステージ！　詩に出てくる boat、note、guitar、star は1つ2つと区切れる{{可算名詞}}！　だから a boat、the stars！　でも honey は形が決まらない、money は金額という中身！　これは{{不可算名詞}}だ！",
      say: "最初のステージ！　詩に出てくる、ボート、ノート、ギター、スターは、ひとつ、ふたつと、区切れる、可算名詞！　だから、ア ボート、ザ スターズ！　でも、ハニーは、かたちが決まらない、マニーは、金額という中身！　これは、不可算名詞だ！",
    },
    {
      kind: "talk",
      who: "seito",
      board: { section: 0, focus: "数えられない" },
      text: "えっ、でもお金の note（紙幣）は数えられるんでしょ？",
      say: "えっ、でも、おかねの、ノート、紙幣は、かぞえられるんでしょ？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そこが熱い！　決めるのは物そのものじゃない！　英語が「1個」と見るか「ひとまとまりの量」と見るかだ！　furniture（家具）は、いすや机をまとめた呼び名だから不可算！",
      say: "そこが熱い！　決めるのは、ものそのものじゃない！　英語が、いっこ、と見るか、ひとまとまりの、りょう、と見るかだ！　ファーニチャー、家具は、いすや、机を、まとめた、呼び名だから、不可算！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "なるほど！　じゃあ助言はいくつもあるから、She gave me many advices.！",
      say: "なるほど！　じゃあ、助言は、いくつも、あるから、シー ゲイブ ミー メニー アドバイシズ！",
    },
    { kind: "talk", who: "sensei", text: "画面の前のきみはどうだ！　問題！", say: "画面の前のきみは、どうだ！　問題！" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "advice、information、news、homework は中身のまとまり！　数えたいなら a piece of advice、two pieces of information！　「かけら」を数えるんだ！",
      say: "アドバイス、インフォメーション、ニュース、ホームワークは、中身の、まとまり！　かぞえたいなら、ア ピース オブ アドバイス、トゥー ピーシズ オブ インフォメーション！　かけらを、かぞえるんだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "逆に、ふだん数えない experience も、「ある1つのできごと」なら an exciting experience って数えられるんだよね！",
      say: "ぎゃくに、ふだん、かぞえない、エクスペリエンスも、ある、ひとつの、できごとなら、アン エキサイティング エクスペリエンスって、かぞえられるんだよね！",
    },

    { kind: "chapter", title: "2. 「少し」の a に注目！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "第二ステージ！　フクロウたちは some honey と plenty of money を持って船出した！　some と plenty of はどちらにも使える！　でも many は可算だけ、much は不可算だけ！",
      say: "第二ステージ！　フクロウたちは、サム ハニーと、プレンティ オブ マニーを、持って、船出した！　サムと、プレンティ オブは、どちらにも使える！　でも、メニーは、可算だけ、マッチは、不可算だけ！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "少しある" },
      text: "そして勝負は a！　a few、a little は「少しある」！　a のない few、little は「ほとんどない」！　量は同じでも、話し手が「ある」と見るか「足りない」と見るかで変わるんだ！",
      say: "そして、勝負は、エー！　ア フュー、ア リトルは、少しある！　エーのない、フュー、リトルは、ほとんどない！　りょうは同じでも、はなしてが、ある、と見るか、足りない、と見るかで、変わるんだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "友だちが少しいるなら前向きだよね。じゃあ、さびしい人の文は……",
      say: "友だちが、少しいるなら、前向きだよね。じゃあ、さびしいひとの文は……",
    },
    { kind: "talk", who: "sensei", text: "さあ、答えてくれ！", say: "さあ、答えてくれ！" },
    { kind: "pause", ref: "check:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "two glasses of water" },
      text: "不可算名詞を数えるなら単位の語！　a cup of tea、two glasses of water、a loaf of bread！　詩の five-pound note はハイフンでつないで名詞の前、だから -s なし！",
      say: "不可算名詞を、かぞえるなら、単位のご！　ア カップ オブ ティー、トゥー グラシズ オブ ウォーター、ア ローフ オブ ブレッド！　詩の、ファイブパウンド ノートは、ハイフンでつないで、名詞のまえ、だから、エスなし！",
    },

    { kind: "chapter", title: "3. a と the の大勝負！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "第三ステージ！　冠詞は{{聞き手}}の側に立て！　a は「ある1つ、まだどれか知らないよね」、the は「どれのことか、わかるよね」の合図だ！　I saw a dog in the park. The dog was very big.！",
      say: "第三ステージ！　冠詞は、ききての、がわにたて！　エーは、あるひとつ、まだ、どれか知らないよね。ザは、どれのことか、わかるよね、の合図だ！　アイ ソー ア ドッグ イン ザ パーク。ザ ドッグ ワズ ベリー ビッグ！",
    },
    {
      kind: "talk",
      who: "seito",
      board: { section: 2, focus: "The dog was very big." },
      text: "2回目はさっきの犬だから the！　あと、an か a かは、つづりじゃなくて発音で決まるんだよね。an hour、a university！",
      say: "にかいめは、さっきの犬だから、ザ！　あと、アンか、アかは、つづりじゃなくて、発音で決まるんだよね。アン アワー、ア ユニバーシティ！",
    },
    { kind: "talk", who: "sensei", text: "完璧だ！　では、きみの番！", say: "完璧だ！　では、きみの番！" },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "詩の続きも見てみろ！　森に現れる a Piggy-wig は、a ring at the end of his nose！　指輪は初登場だから a、鼻の先は「そのブタの鼻の先」と決まっているから the だ！",
      say: "詩の続きも、見てみろ！　森に現れる、ア ピギーウィッグは、ア リング アット ジ エンド オブ ヒズ ノーズ！　指輪は、初登場だから、ア。鼻の先は、そのブタの、鼻の先、と決まっているから、ザだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "最後の連の the Turkey who lives on the hill も、うしろの説明で「どの七面鳥か」がしぼられるから the なんだ！",
      say: "最後の、れんの、ザ ターキー フー リブズ オン ザ ヒルも、うしろの説明で、どの、しちめんちょうか、が、しぼられるから、ザなんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "謎が解けた！　フクロウとネコは、題名 The Owl and the Pussy-Cat ですでに紹介ずみ！　大文字で、名前のような二人！　聞き手が「この二人のお話だね」とわかるから the！　ボートは初めての「ある1そう」だから a！　冠詞は「初めてか」じゃない、「聞き手にわかるか」だ！",
      say: "謎が解けた！　フクロウと、ネコは、題名の、ジ アウル アンド ザ プッシーキャットで、すでに、紹介ずみ！　大文字で、名前のような、ふたり！　ききてが、この、ふたりのお話だね、と、わかるから、ザ！　ボートは、初めての、ある、いっそう、だから、ア！　冠詞は、初めてか、じゃない、ききてに、わかるか、だ！",
    },

    { kind: "chapter", title: "4. 冠詞なしの決まり！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "最終ステージ！　物ではなく「はたらき・目的」を言うときは冠詞なし！　go to school、go to bed、by bus、have lunch、play tennis！　でも楽器は play the piano！",
      say: "最終ステージ！　ものではなく、はたらき、目的を、言うときは、冠詞なし！　ゴー トゥー スクール、ゴー トゥー ベッド、バイ バス、ハブ ランチ、プレイ テニス！　でも、楽器は、プレイ ザ ピアノ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも自分の学校は決まってるし、毎日のバスも決まってるから、I'll go to the school by a bus. だよね！",
      say: "でも、自分の学校は、決まってるし、毎日の、バスも、決まってるから、アイル ゴー トゥー ザ スクール バイ ア バス、だよね！",
    },
    { kind: "talk", who: "sensei", text: "最後の勝負だ！　問題！", say: "最後の勝負だ！　問題！" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "seito",
      text: "わかった！　詩の最後で二人が hand in hand でおどるのも、決まった言い方だから冠詞なし！　1行目は「フクロウと子ネコは」。おなじみの主人公として訳せばいいんだ！",
      say: "わかった！　詩の最後で、ふたりが、ハンド イン ハンドで、おどるのも、決まった、言いかただから、冠詞なし！　いちぎょうめは、フクロウと、子ネコは。おなじみの、主人公として、訳せばいいんだ！",
    },
  ],
};
