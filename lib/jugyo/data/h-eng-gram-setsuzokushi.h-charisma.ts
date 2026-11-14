import type { CastScript } from "../types";

// 止まる授業：接続詞（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-setsuzokushi.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-setsuzokushi.ts から引く。

export const H_SETSUZOKUSHI_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-setsuzokushi",
  castId: "h-charisma",
  title: "天びんか、留め金か。接続詞で名作の皮肉を読む",
  scenes: [
    { kind: "chapter", title: "つかみ：どこで息をつぐ？" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は、ラジオの朗読番組のディレクター。冬の特番で、オースティン『高慢と偏見』の書き出しを原文のまま朗読する。",
      say: "カナメです。きょうの依頼人は、ラジオの朗読番組の、ディレクター。冬の特番で、オースティンの、高慢と偏見の書き出しを、原文のまま朗読する。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "受講生のユウキです。It is a truth universally acknowledged, that …… ですよね。「〜は世間でひろく認められた真理である」。どこにも「うそ」とは書いていないのに、英語の読者はすぐ皮肉だと気づくそうです。",
      say: "受講生のユウキです。イット イズ ア トゥルース ユニヴァーサリー アクノリッジド、ザット、ですよね。世間で、ひろく認められた、真理である。どこにも、うそとは書いていないのに、英語の読者は、すぐ皮肉だと、きづくそうです。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ベテランの朗読家も、どこで息をつぎ、どこを強く読むかで首をかしげた。ポイントは{{接続詞}}。つなぎ方の型は2つ、{{対等につなぐ}}か、{{主の文にくっつける}}か。これで書き出しを解く。",
      say: "ベテランの朗読家も、どこで息をつぎ、どこを強く読むかで、首をかしげた。ポイントは、接続詞。つなぎかたの型は、ふたつ。対等につなぐか、しゅの文に、くっつけるか。これで、書き出しを解く。",
    },

    { kind: "chapter", title: "1. 等位接続詞は天びん" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "まず{{等位接続詞}}。and・but・or・so・for は、左右に同じ重さのものを置く天びんだ。She sings and dances. なら動詞と動詞。両側は品詞や形をそろえるのが原則。",
      say: "まず、等位接続詞。アンド、バット、オア、ソウ、フォーは、左右に、同じ重さのものを置く、天びんだ。シー シングズ アンド ダンシズ、なら、動詞と動詞。両側は、品詞や、かたちを、そろえるのが原則。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "そうすれば〜" },
      text: "命令文のあとは意味が決まる。Leave now, and you will catch the train. は「そうすれば」。Leave now, or you will miss the train. は「さもないと」。",
      say: "命令文のあとは、意味が決まる。リーヴ ナウ、アンド ユー ウィル キャッチ ザ トレイン、は、そうすれば。リーヴ ナウ、オア ユー ウィル ミス ザ トレイン、は、さもないと。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "and の文は if で言いかえられるんですよね。If you leave now, you will catch the train.",
      say: "アンドの文は、イフで、言いかえられるんですよね。イフ ユー リーヴ ナウ、ユー ウィル キャッチ ザ トレイン。",
    },
    { kind: "talk", who: "sensei", text: "そのとおり。では確認。" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "or が「さもないと」になるのは、命令に従う道か、従わない道かの二択だから。なお for は理由を後から添える等位接続詞で、because とちがって文の先頭には置けない。",
      say: "オアが、さもないと、になるのは、命令に従う道か、従わない道かの、二択だから。なお、フォーは、理由を、あとから添える、等位接続詞で、ビコーズとちがって、文の先頭には、置けない。",
    },

    { kind: "chapter", title: "2. 2つで1組と、動詞の数" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "次は{{2つで1組}}の接続詞。both A and B、either A or B、neither A nor B、not only A but also B。主語になったときの動詞で差がつく。",
      say: "次は、ふたつで、ひとくみの接続詞。ボウス エー アンド ビー、イーザー エー オア ビー、ニーザー エー ノア ビー、ノット オンリー エー バット オールソウ ビー。主語になったときの、動詞で、差がつく。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "複数扱い" },
      text: "考え方は一言、「足し算か、選択か」。both A and B は足し算で{{複数扱い}}。ほかの3つは、動詞を{{Bに合わせる}}。",
      say: "考えかたは、ひとこと。足し算か、選択か。ボウス エー アンド ビーは、足し算で、複数扱い。ほかの、みっつは、動詞を、ビーに合わせる。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "でも主語は Ken と Mary の名前だし、Both Ken and Mary is from Kobe. で、いけそうな気がします。",
      say: "でも、主語は、ケンとメアリーの名前だし、ボウス ケン アンド メアリー イズ フロム コウベ、で、いけそうなきがします。",
    },
    { kind: "talk", who: "sensei", text: "気がする、で落とす。問題。", say: "きがする、で落とす。問題。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "Bに合わせる" },
      text: "Either you or Ken has the key. は近い Ken に合わせて has。Not only I but also my sisters like cats. は、言いたい my sisters に合わせて like だ。",
      say: "イーザー ユー オア ケン ハズ ザ キー、は、近いケンに合わせて、ハズ。ノット オンリー アイ バット オールソウ マイ シスターズ ライク キャッツ、は、言いたい、マイ シスターズに合わせて、ライクだ。",
    },

    { kind: "chapter", title: "3. 従属接続詞は留め金" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "ここから本題。that・whether・when・because・though・if などの{{従属接続詞}}は、天びんではなく留め金。後ろの「主語＋動詞」を{{節}}にして、主の文にとめつける。",
      say: "ここから本題。ザット、ウェザー、ウェン、ビコーズ、ゾウ、イフなどの、従属接続詞は、天びんではなく、留め金。うしろの、主語プラス動詞を、せつにして、しゅの文に、とめつける。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "名詞節" },
      text: "that・whether の節は{{名詞節}}。I know that he is honest. の that 節は know の目的語。when・because・though の節は{{副詞節}}で、取り去っても主の文は成り立つ。",
      say: "ザット、ウェザーの、せつは、めいしせつ。アイ ノウ ザット ヒー イズ オネスト、の、ザットせつは、ノウの目的語。ウェン、ビコーズ、ゾウの、せつは、ふくしせつで、取り去っても、しゅの文は、成り立つ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "though は「けれども」ですよね。念のため but も付けて、Though it was cold, but we went swimming. で意味をはっきりさせます。",
      say: "ゾウは、けれども、ですよね。念のため、バットも付けて、ゾウ イット ワズ コウルド、バット ウィー ウェント スイミング、で、意味を、はっきりさせます。",
    },
    { kind: "talk", who: "sensei", text: "ここで差がつく。問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "though は留め金、but は天びん。役がかぶる。物語の夫人は名詞節の名人で、Mrs. Long says のあとに that 節を3つも重ね、うわさを次々につめこむ。これが話の止まらない人の口ぶりだ。",
      say: "ゾウは留め金、バットは天びん。役がかぶる。物語の夫人は、めいしせつの名人で、ミセス ロング セズの、あとに、ザットせつを、みっつも重ね、うわさを、次々につめこむ。これが、話の止まらないひとの、口ぶりだ。",
    },

    { kind: "chapter", title: "4. 節の中の時制" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "夫人は夫にせがむ。you must visit him as soon as he comes. 彼が来るのはこれから先なのに comes、{{現在形}}だ。",
      say: "夫人は、夫にせがむ。ユー マスト ヴィジット ヒム アズ スーン アズ ヒー カムズ。彼が来るのは、これから先なのに、カムズ。げんざいけいだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "時の副詞節：未来でも現在形" },
      text: "時や条件の副詞節は、主の文が起こるための「前提」。未来であることは must visit や will がもう示すから、節の中ではくり返さない。I'll call you when he arrives. も同じだ。",
      say: "ときや、条件のふくしせつは、しゅの文が起こるための、前提。未来であることは、マスト ヴィジットや、ウィルが、もう示すから、せつのなかでは、くり返さない。アイル コール ユー ウェン ヒー アライヴズ、も、同じだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ、Let's start when he will come. は？　未来なんだから、will を入れたくなります。",
      say: "じゃあ、レッツ スタート ウェン ヒー ウィル カム、は？　未来なんだから、ウィルを、入れたくなります。",
    },
    { kind: "talk", who: "sensei", text: "入れたくなるのが落とし穴。問題。", say: "入れたくなるのが、落とし穴。問題。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "know の目的語（名詞節）：will を使う" },
      text: "ただし I don't know when he will come. の when 節は know の目的語、つまり名詞節。知りたい中身そのものだから will を使う。取り去っても主の文が成り立てば副詞節、成り立たなければ名詞節だ。",
      say: "ただし、アイ ドント ノウ ウェン ヒー ウィル カム、の、ウェンせつは、ノウの目的語、つまりめいしせつ。知りたい中身そのものだから、ウィルを使う。取り去っても、しゅの文が成り立てばふくしせつ、成り立たなければ、めいしせつだ。",
    },

    { kind: "chapter", title: "謎解き：真理はだれの頭の中？" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "いよいよ書き出し。第1文の It は{{形式主語}}で、本当の主語は that 以下の名詞節。「財産のある独身男性は妻を必要としている」は、作者の意見ではなく、世間の真理の中身として入れてある。",
      say: "いよいよ、書き出し。第1文の、イットは、形式主語で、本当の主語は、ザット以下の、めいしせつ。財産のある独身男性は、妻を必要としている、は、作者の意見ではなく、世間の真理の中身として、入れてある。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4, focus: "譲歩" },
      text: "第2文。However little known …… は{{however＋形容詞}}の譲歩、「どれほど知られていなくても」。主の文 this truth is so well fixed …… に、{{so … that}}の結果が続く。",
      say: "第2文。ハウエヴァー リトル ノウン、は、ハウエヴァー、プラス、形容詞の譲歩。どれほど、知られていなくても。しゅの文、ディス トゥルース イズ ソウ ウェル フィクスト、に、ソウ ザットの結果が続く。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "本人の気持ちはだれも知らないのに、その真理が根づいているのは、まわりの家々の頭の中……。",
      say: "本人の気持ちは、だれも知らないのに、その真理が根づいているのは、まわりの家々の、頭のなか……。",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "そう。その結果、彼は近所の娘たちの財産とみなされる。妻をほしがっているのは男性ではなく{{まわりの家族}}。接続詞が「だれの考えか」を示した。これが皮肉の合図だ。",
      say: "そう。その結果、彼は、近所の娘たちの、財産とみなされる。妻をほしがっているのは、男性ではなく、まわりの家族。接続詞が、だれの考えかを、示した。これが、皮肉の合図だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "朗読家には、「真理」がだれの頭の中にあるのかを見せる that の前で、一拍おいてください、と伝えればいいんですね。",
      say: "朗読家には、真理が、だれの頭のなかにあるのかを見せる、ザットの前で、一拍おいてください、と伝えればいいんですね。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "一言でいうと、天びんか留め金か。等位接続詞、2つで1組、名詞節と副詞節、節の中の時制。この順につないで、ディレクターに説明してみよう。",
      say: "ひとことでいうと、天びんか、留め金か。等位接続詞、ふたつで、ひとくみ、めいしせつとふくしせつ、せつのなかの時制。この順につないで、ディレクターに、説明してみよう。",
    },
  ],
};
