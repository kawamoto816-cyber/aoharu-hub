import type { CastScript } from "../types";

// 止まる授業：分詞構文（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-bunshikobun.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-bunshikobun.ts から引く。

export const H_BUNSHIKOBUN_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-bunshikobun",
  castId: "h-charisma",
  title: "名作はなぜあいまいに始まる？　分詞構文は「消して -ing」",
  scenes: [
    { kind: "chapter", title: "つかみ：あいまいな書き出し" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は、100年以上前の冒険小説を新しく訳している翻訳家。原文の分詞構文を「〜なので」「〜したとき」と訳し分けると、原文の勢いが消えてしまうという。",
      say: "カナメです。きょうの依頼人は、100ねん以上前の、冒険小説を、新しく訳している翻訳家。原文の分詞構文を、なので、したとき、と訳しわけると、原文の勢いが、消えてしまうという。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "分詞構文は、接続詞を消して意味をぼかした省略の形。なのにジャック・ロンドンやジョゼフ・コンラッドは、物語のいちばん大事な書き出しで、{{なぜあいまいな形を選んだのか}}。今日はこれを解く。",
      say: "分詞構文は、接続詞を消して、意味をぼかした、省略のかたち。なのに、ジャック・ロンドンや、ジョゼフ・コンラッドは、物語の、いちばんだいじな書き出しで、なぜ、あいまいなかたちを選んだのか。きょうは、これを解く。",
    },
    { kind: "talk", who: "seito", text: "受講生のユウキです。短いほうが、かっこいいからですよね？" },
    {
      kind: "talk",
      who: "sensei",
      text: "半分正解。でも決め手は文法だ。ポイントは2つ。作り方と、意味の決まり方。",
      say: "半分正解。でも、きめては文法だ。ポイントは、ふたつ。作りかたと、意味の決まりかた。",
    },

    { kind: "chapter", title: "1. 作り方：消して -ing" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "Walking" },
      text: "When I walked home, I met Ken. から{{接続詞 When}}を消し、主節と同じ{{主語 I}}も消し、動詞を{{-ing}}に。Walking home, I met Ken. これが分詞構文だ。",
      say: "ホエン アイ ウォークト ホーム、アイ メット ケン。から、接続詞のホエンを消し、主節と同じ、主語のアイも消し、動詞を、イングに。ウォーキング ホーム、アイ メット ケン。これが、分詞構文だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ここで差がつく。{{時制は分詞では表さない}}。過去の情報は主節の met がになう。Walking home, I'll call you. なら未来の話だ。",
      say: "ここで差がつく。時制は、分詞では表さない。過去の情報は、主節のメットが、になう。ウォーキング ホーム、アイル コール ユー、なら、未来の話だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "be動詞なら Being。でも Being はよく省略され、形容詞や過去分詞がいきなり文頭に来る。コンマまでに主語も動詞もなければ、分詞構文を疑え。",
      say: "ビー動詞なら、ビーイング。でも、ビーイングは、よく省略され、形容詞や、過去分詞が、いきなり文頭に来る。コンマまでに、主語も動詞もなければ、分詞構文を疑え。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ Because I was tired, I went to bed early. は、Being tired, I go to bed early. ですか？",
      say: "じゃあ、ビコーズ アイ ワズ タイアード、アイ ウェント トゥ ベッド アーリーは、ビーイング タイアード、アイ ゴー トゥ ベッド アーリー、ですか？",
    },
    { kind: "talk", who: "sensei", text: "惜しい。確認だ。" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "時制は主節がもつから went のまま。Being を消して、Tired, で始めてもいい。",
      say: "時制は、主節がもつから、ウェントのまま。ビーイングを消して、タイアードで始めてもいい。",
    },

    { kind: "chapter", title: "2. 意味は文脈で決まる" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "理由" },
      text: "接続詞を消したから、意味は{{文脈}}で決まる。Feeling tired, I slept. は{{理由}}、Turning left, you'll see it. は{{条件}}。迷ったら when・because・if にもどして、いちばん自然なものを選ぶ。",
      say: "接続詞を消したから、意味は、文脈で決まる。フィーリング タイアード、アイ スレプトは、理由。ターニング レフト、ユール シー イットは、条件。迷ったら、ホエン、ビコーズ、イフに、もどして、いちばん自然なものを選ぶ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "付帯状況" },
      text: "主節の後ろに来たら、多くは{{付帯状況}}か{{連続}}。He came in, carrying a box. は、入ってくるのと箱をかかえるのが同時。譲歩は少ないから、自分で書くなら although を使え。",
      say: "主節のうしろに来たら、多くは、付帯状況か、連続。ヒー ケイム イン、キャリング ア ボックスは、入ってくるのと、箱をかかえるのが、同時。譲歩は少ないから、自分で書くなら、オールゾーを使え。",
    },

    { kind: "chapter", title: "3. する・される・主語がちがう" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "次は形。分詞構文の主語は、書かなくても{{主節の主語}}と同じと読まれる。だから主語が「する」側なら -ing、「される」側なら過去分詞。",
      say: "次は、かたち。分詞構文の主語は、書かなくても、主節の主語と、同じと読まれる。だから、主語が、する側なら、イング。される側なら、過去分詞。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「丘から見ると、町は小さく見える」は、Seeing from the hill, the town looks small. ですね。",
      say: "じゃあ、丘から見ると、町は、小さく見える、は、シーイング フロム ザ ヒル、ザ タウン ルックス スモール、ですね。",
    },
    { kind: "talk", who: "sensei", text: "いちばん落とす所。問題。", say: "いちばん落とすところ。問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "主語がされる" },
      text: "町は「見られる」側。だから Seen。Written in easy English, this book is easy to read. も、本が「書かれる」側だから Written だ。",
      say: "町は、見られる側。だから、シーン。リトゥン イン イージー イングリッシュ、ディス ブック イズ イージー トゥ リード、も、本が、書かれる側だから、リトゥンだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "主語がちがう" },
      text: "もう一つ。主節と主語が{{ちがう}}なら、主語を残す。It being rainy, we stayed home. 天気の it と we がちがうからだ。これが{{独立分詞構文}}。",
      say: "もうひとつ。主節と主語が、ちがうなら、主語を残す。イット ビーイング レイニー、ウィー ステイド ホーム。天気のイットと、ウィーが、ちがうからだ。これが、独立分詞構文。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ「晴れていたのでピクニックに行った」は、Being fine, we went on a picnic. でいけますね。",
      say: "じゃあ、晴れていたので、ピクニックにいった、は、ビーイング ファイン、ウィー ウェント オン ア ピクニック、で、いけますね。",
    },
    { kind: "talk", who: "sensei", text: "ここで差がつく。問題。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "否定は not を分詞の前。Not knowing what to say, she kept silent. 逆に Generally speaking や Judging from は、主語がちがっても書かない慣用表現だ。",
      say: "否定は、ノットを、分詞のまえ。ノット ノウイング ホワット トゥ セイ、シー ケプト サイレント。逆に、ジェネラリー スピーキングや、ジャッジング フロムは、主語がちがっても書かない、慣用表現だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ところがコンラッドの『闇の奥』の書き出しには、being bound down the river と、主語がずれたまま残さない形がある。これが{{懸垂分詞}}。英作文では避けるべき形だ。",
      say: "ところが、コンラッドの、闇の奥の書き出しには、ビーイング バウンド ダウン ザ リヴァーと、主語がずれたまま、残さないかたちがある。これが、懸垂分詞。英作文では、避けるべきかたちだ。",
    },

    { kind: "chapter", title: "4. Having は時のずれ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "最後のルール。ふつうの -ing は主節と{{同じころ}}。主節より{{前}}に終わったことは Having ＋過去分詞。Having finished my homework, I went out. で「宿題を終えてから出かけた」。",
      say: "最後のルール。ふつうのイングは、主節と、同じころ。主節より前に、終わったことは、ハヴィング、過去分詞。ハヴィング フィニッシュト マイ ホームワーク、アイ ウェント アウト。で、宿題を終えてから、出かけた。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "Finishing my homework, でもよくないですか？",
      say: "フィニッシング マイ ホームワーク、でも、よくないですか？",
    },
    { kind: "talk", who: "sensei", text: "それだと、宿題をしながら出かけたような、時間が重なった印象になる。確認だ。" },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "主節より前 → Having" },
      text: "完了形を見たら「時計の針が一つ前にもどった」と考えろ。to have ＋過去分詞や、動名詞の having ＋過去分詞と同じ考え方だ。",
      say: "完了けいを見たら、時計の針が、ひとつ前に、もどった、と考えろ。トゥ ハヴ、過去分詞や、動名詞の、ハヴィング、過去分詞と、同じ考えかただ。",
    },

    { kind: "chapter", title: "5. 名作の一枚の絵" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "{{with ＋名詞＋分詞}}は「〜したまま」。He listened with his eyes closed. 目は閉じられているから closed。名詞が「する」か「される」かで決める。",
      say: "ウィズ、名詞、分詞は、したまま。ヒー リスンド ウィズ ヒズ アイズ クローズド。めは、閉じられているから、クローズド。名詞が、するか、されるかで決める。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "『闇の奥』でマーロウが登場する場面は、leaning against the mizzen-mast と with his arms dropped を重ね、すわる動作ともたれる様子、腕の姿勢を同時に描く。最後は resembled an idol、偶像のようだった、で閉じる。",
      say: "闇の奥で、マーロウが登場する場面は、リーニング アゲンスト ザ ミズンマストと、ウィズ ヒズ アームズ ドロップトを重ね、すわる動作と、もたれる様子、腕の姿勢を、同時に描く。最後は、リゼンブルド アン アイドル、偶像のようだった、で閉じる。",
    },

    { kind: "chapter", title: "謎解き：あいまいさは力" },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "謎にもどる。分詞構文は、接続詞を消して「とき」か「から」かを言い切らず、二つの動作や様子を{{同時に}}並べる形だ。",
      say: "謎にもどる。分詞構文は、接続詞を消して、ときか、からかを、言い切らず、ふたつの動作や様子を、同時に並べるかたちだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ロンドンの groping in the Arctic darkness は、男たちが暗やみで手をのばす姿を、説明ではなく{{映像のように}}一瞬で見せる。金を a yellow metal とよび、犬バックの目の高さに読者を立たせてもいる。",
      say: "ロンドンの、グロウピング イン ジ アークティック ダークネスは、男たちが、暗やみで、てをのばす姿を、説明ではなく、映像のように、一瞬で見せる。きんを、ア イエロー メタルとよび、犬バックの、めの高さに、読者を立たせてもいる。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あいまいさは欠点じゃなくて、読者を場面に一気に引きこむ力だったんだ。だから訳すときも、接続詞で説明しすぎないほうがいいんですね。",
      say: "あいまいさは、欠点じゃなくて、読者を、場面に、一気に引きこむ力だったんだ。だから、訳すときも、接続詞で、説明しすぎないほうが、いいんですね。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "一言でいうと、{{消して -ing、意味は文脈、形は主語で決まる}}。次はきみが講師だ。この3つで、作家たちのねらいを説明してみよう。",
      say: "ひとことでいうと、消してイング、意味は文脈、かたちは主語で決まる。次は、きみが講師だ。このみっつで、作家たちのねらいを、説明してみよう。",
    },
  ],
};
