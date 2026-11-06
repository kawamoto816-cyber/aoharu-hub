import type { CastScript } from "../types";

// 止まる授業：受け身（中2・英語）× 気さくな兄・姉（アサヒ兄さん・スミレ姉さん）。事実・例文・人名・年は lib/lecture/data/j-en-2-ukemi.ts の本文だけ。
// 雑談の調子で、うろ覚えを「わたしもそう覚えてた」と言って直していく。英文は say でカタカナに開く。実在の人物のせりふは作らない。問題は data/j-en-2-ukemi.ts から引く。

export const UKEMI_J_KISAKU: CastScript = {
  unitId: "j-en-2-ukemi",
  castId: "j-kisaku",
  title: "by を書くか、書かないか：受け身は「される側」に光を当てる形",
  scenes: [
    { kind: "chapter", title: "つかみ：独立宣言の by" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "よっ、アサヒです。今日は、英語暗唱コンテストを指導してる中学校の先生から相談が来てるんだ。",
      say: "よっ、アサヒです。きょうは、英語暗唱コンテストを指導してる、中学校の先生から、相談が来てるんだ。",
    },
    { kind: "talk", who: "seito", text: "スミレです。暗唱って、何を読むの？", say: "スミレです。暗唱って、なにを読むの？" },
    {
      kind: "talk",
      who: "sensei",
      text: "アメリカ独立宣言の一節。有名な all men are created equal は「すべての人は平等につくられている」って受け身で、だれがつくったかを by で言わないんだ。",
      say: "アメリカ独立宣言の一節。有名な、オール メン アー クリエイテッド イークォルは、すべてのひとは、平等につくられている、って受け身で、だれがつくったかを、バイで言わないんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "なのにすぐあとは they are endowed by their Creator で、わざわざ by がついてる。生徒に「どっちが正しい英語なの？」って聞かれて、先生も答えられなかったんだって。",
      say: "なのに、すぐあとは、ゼイ アー エンダウド バイ ゼア クリエイターで、わざわざバイがついてる。生徒に、どっちが正しい英語なの？　って聞かれて、先生も答えられなかったんだって。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "同じ文の中で、書いたり書かなかったり？　どこを強く読むかにも関わりそう。",
      say: "同じ文のなかで、書いたり、書かなかったり？　どこを強く読むかにも、関わりそう。",
    },
    { kind: "talk", who: "sensei", text: "そう。最後にちゃんとつながるから、形から順に見ていこう。", say: "そう。最後に、ちゃんとつながるから、かたちから順に見ていこう。" },

    { kind: "chapter", title: "1. 受け身は「される側」が主語" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "ふつうの文の{{能動態}}は「する側」が主語。受け身の{{受動態}}は「される側」が主語。形は{{be動詞＋過去分詞}}で、「〜される・〜された」って意味ね。",
      say: "ふつうの文の能動態は、するがわが主語。受け身の受動態は、されるがわが主語。かたちは、ビー動詞たす過去分詞で、される、された、って意味ね。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "It was made by Tom." },
      text: "表のとおり、Tom made it. が It was made by Tom. になる。だれがしたかを言うなら、後ろに{{by＋人}}。",
      say: "表のとおり、トム メイド イット。が、イット ワズ メイド バイ トム。になる。だれがしたかを言うなら、うしろに、バイたす、ひと。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "同じできごとでも、先頭に立つものがちがうんだ。話の中心が、トムから「それ」に変わる感じ。",
      say: "同じできごとでも、先頭に立つものが、ちがうんだ。話の中心が、トムから、それ、に変わる感じ。",
    },

    { kind: "chapter", title: "2. 書きかえの3ステップ" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "書きかえは3ステップ。①目的語を主語にする。②動詞を be動詞＋過去分詞にする。③もとの主語を by のあとに置く。",
      say: "書きかえは、3ステップ。いち、目的語を主語にする。に、動詞を、ビー動詞たす過去分詞にする。さん、もとの主語を、バイのあとに置く。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "by many people" },
      text: "Many people love this song. なら This song is loved by many people.。by のあとが代名詞なら目的格で、It was written by him.。by he とは言わないよ。",
      say: "メニー ピープル ラブ ディス ソング。なら、ディス ソング イズ ラブド バイ メニー ピープル。バイのあとが代名詞なら、目的格で、イット ワズ リトゥン バイ ヒム。バイ ヒー、とは言わないよ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "独立宣言の最初の原稿を書いたのは、当時33歳のトマス・ジェファソン。受け身にすると The first draft was written by Thomas Jefferson. だね。",
      say: "独立宣言の、最初の原稿を書いたのは、当時33さいの、トマス ジェファソン。受け身にすると、ザ ファースト ドラフト ワズ リトゥン バイ トマス ジェファソン、だね。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あれ、was のあとって write のままでよくなかった？　This letter was write by Ken. って、わたしもそう覚えてた。",
      say: "あれ、ワズのあとって、ライトのままで、よくなかった？　ディス レター ワズ ライト バイ ケン。って、わたしも、そう覚えてた。",
    },
    { kind: "talk", who: "sensei", text: "それ、よくあるんだよ。確かめてみよう。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "原稿はそのまま通ったわけじゃなくて、大陸会議が直したんだ。Some parts were changed by Congress.。主語が複数だから were ね。",
      say: "原稿は、そのままとおったわけじゃなくて、大陸会議が直したんだ。サム パーツ ワー チェンジド バイ コングレス。主語が複数だから、ワーね。",
    },

    { kind: "chapter", title: "3. be動詞が「時」と「数」を表す" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "受け身の「時」は{{be動詞で表す}}。過去分詞の形は変わらない。今なら is・am・are、過去なら{{was・were}}を、主語の数で選ぶんだ。",
      say: "受け身の、とき、は、ビー動詞で表す。過去分詞の、かたちは変わらない。いまなら、イズ、アム、アー。過去なら、ワズ、ワーを、主語のかずで選ぶんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "was" },
      text: "The Declaration was adopted on July 4, 1776.。宣言は1776年7月4日に採択された。過去で主語が1つだから was。",
      say: "ザ デクラレーション ワズ アダプテッド オン ジュライ フォース、セブンティーンセブンティシックス。宣言は、1776ねん、7がつ4かに採択された。過去で、主語が1つだから、ワズ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "その夜には大きな1枚の紙に刷られたんだよね。Copies were printed that night.。こっちは主語が複数だから were か。",
      say: "その夜には、大きな1まいの紙にすられたんだよね。コピーズ ワー プリンテッド ザット ナイト。こっちは、主語が複数だから、ワーか。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そう。今の話なら July 4 is celebrated as Independence Day.。時がちがっても過去分詞はそのまま。じゃあ1問いってみようか。",
      say: "そう。いまの話なら、ジュライ フォース イズ セレブレイテッド アズ インディペンデンス デイ。ときがちがっても、過去分詞はそのまま。じゃあ、1問いってみようか。",
    },
    { kind: "pause", ref: "check:1" },

    { kind: "chapter", title: "4. 否定文・疑問文" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "否定文は be動詞の{{後ろに not}}、疑問文は be動詞を{{主語の前}}へ。{{do・does・did は使わない}}。答えも be動詞でね。",
      say: "否定文は、ビー動詞のうしろに、ノット。疑問文は、ビー動詞を、主語のまえへ。ドゥー、ダズ、ディドは使わない。答えも、ビー動詞でね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "1796年、初代大統領ワシントンが国民へのお別れの言葉を発表した。{{ワシントン告別演説}}。Was the Farewell Address given as a speech? —— No, it wasn't. It was printed in a newspaper.",
      say: "1796ねん、初代大統領ワシントンが、国民への、お別れの言葉を発表した。ワシントン告別演説。ワズ ザ フェアウェル アドレス ギヴン アズ ア スピーチ。ノー、イット ワズント。イット ワズ プリンテッド イン ア ニューズペーパー。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "演説なのに、新聞に載ったんだ。でも過去の疑問文なら did でしょ？　Did this book written by him? みたいに。",
      say: "演説なのに、新聞に載ったんだ。でも、過去の疑問文なら、ディドでしょ？　ディド ディス ブック リトゥン バイ ヒム。みたいに。",
    },
    { kind: "talk", who: "sensei", text: "おっと、そこは確かめとこう。" },
    { kind: "pause", ref: "mistake:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "告別演説は、国じゅうの人が紙で読んだ「書かれた演説」だったんだ。今もアメリカ上院では毎年、全文が読み上げられてる。It is read aloud in the Senate every year.",
      say: "告別演説は、くにじゅうの、ひとが、紙で読んだ、書かれた演説だったんだ。いまも、アメリカ上院では毎年、全文がよみあげられてる。イット イズ レッド アラウド イン ザ セネット エヴリー イヤー。",
    },

    { kind: "chapter", title: "5. by を使わないとき" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 4 },
      text: "だれがしたか{{わからない}}とき、{{言わなくてもわかる}}ときは by を省く。English is spoken in Canada. の「話す人」は、カナダの人々だってわかるよね。",
      say: "だれがしたか、わからないとき、言わなくてもわかるときは、バイを省く。イングリッシュ イズ スポークン イン カナダ。の、話すひとは、カナダの人々だって、わかるよね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "This temple was built about 600 years ago. みたいに、だれが建てたかわからないときも省く。受け身って、実は by がない文のほうが多いんだ。",
      say: "ディス テンプル ワズ ビルト アバウト シックスハンドレッド イヤーズ アゴー。みたいに、だれが建てたか、わからないときも省く。受け身って、実は、バイがない文のほうが多いんだ。",
    },
    {
      kind: "talk",
      who: "seito",
      card: "reveal",
      text: "わかった！　all men are created equal は、だれがつくったかより「人はみな平等に生まれた」ことが大事。言わなくてもわかるから by を省いたんだ。",
      say: "わかった！　オール メン アー クリエイテッド イークォルは、だれがつくったかより、ひとはみな、平等にうまれた、ことがだいじ。言わなくてもわかるから、バイを省いたんだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "それ。で、権利の話では「だれがあたえたか」こそが主張の芯。国王や政府じゃなく創造主からの権利なら、国王にも取り上げられない。だから{{by their Creator}}をはっきり書いたんだよ。",
      say: "それ。で、権利の話では、だれがあたえたか、こそが、主張のしん。国王や政府じゃなく、そうぞうしゅからの権利なら、国王にも、とりあげられない。だから、バイ ゼア クリエイターを、はっきり書いたんだよ。",
    },
    { kind: "talk", who: "sensei", text: "最後に、by を省く書きかえを1問。", say: "最後に、バイを省く書きかえを、1問。" },
    { kind: "pause", ref: "check:0" },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "seito",
      text: "次はきみの番。by を書くときと書かないときは、何で決まるのか。「される側」ってことばを使って、説明してみてね。",
      say: "次はきみの番。バイを書くときと、書かないときは、なにで決まるのか。されるがわ、ってことばを使って、説明してみてね。",
    },
  ],
};
