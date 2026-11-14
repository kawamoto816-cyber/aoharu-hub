import type { CastScript } from "../types";

// 止まる授業：前置詞（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-zenchishi.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-zenchishi.ts から引く。

export const H_ZENCHISHI_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-zenchishi",
  castId: "h-charisma",
  title: "at と in はなぜ言い分ける？　前置詞は「場所の見方」で決まる",
  scenes: [
    { kind: "chapter", title: "つかみ：どれも「〜で」なのに" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は旅行ガイドブックの編集者。読者から「駅で待ち合わせたら、相手は改札の中、自分は駅前にいた」という声が届いた。手がかりは、ヴェルヌの『八十日間世界一周』の一文だ。",
      say: "カナメです。きょうの依頼人は、旅行ガイドブックの編集者。読者から、駅で待ち合わせたら、相手は改札のなか、自分は駅前にいた、という声が届いた。てがかりは、ヴェルヌの、80にちかん世界一周の、一文だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "受講生のユウキです。主人公は毎日 at the club, in the same room, at the same table で食事をする。日本語ならぜんぶ「〜で」なのに、なぜ at と in を言い分けるのか、ですね。",
      say: "受講生のユウキです。主人公は、毎日、アット ザ クラブ、イン ザ セイム ルーム、アット ザ セイム テーブルで、食事をする。日本語なら、ぜんぶ、で、なのに、なぜ、アットとインを、言いわけるのか、ですね。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ポイントは一つ。前置詞は場所そのものではなく、話し手がその場所をどう見ているかを表す。まずは形から押さえる。",
      say: "ポイントは、ひとつ。前置詞は、場所そのものではなく、はなしてが、その場所を、どう見ているかを表す。まずは、かたちから押さえる。",
    },

    { kind: "chapter", title: "1. 前置詞＋名詞はひとまとまり" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "前置詞は英語で preposition。pre は「前に」、position は「置くこと」。名前のとおり名詞の{{前}}に置き、「前置詞＋名詞」で1つの{{まとまり}}をつくる。日本語の「駅で」とは順番が逆だ。",
      say: "前置詞は、英語で、プレポジション。プレは、まえに。ポジションは、置くこと。名前のとおり、名詞の、まえに置き、前置詞、プラス、名詞で、ひとつの、まとまりをつくる。日本語の、駅で、とは、順番が逆だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "役割は2つ。The book on the desk is mine. の on the desk は、名詞 book を説明する{{形容詞}}のはたらき。I put the book on the desk. なら、動詞 put を説明する{{副詞}}のはたらき。",
      say: "役割は、ふたつ。ザ ブック オン ザ デスク イズ マイン、の、オン ザ デスクは、名詞、ブックを説明する、形容詞のはたらき。アイ プット ザ ブック オン ザ デスク、なら、動詞、プットを説明する、副詞のはたらき。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "動名詞" },
      text: "ここで差がつく。前置詞の後ろは「名詞の席」。代名詞は with him のように{{目的格}}、動詞なら without saying のように{{動名詞}}。主語＋動詞の文はそのまま置けない。",
      say: "ここで差がつく。前置詞のうしろは、名詞の席。代名詞は、ウィズ ヒムのように、目的格。動詞なら、ウィズアウト セイイングのように、動名詞。主語、プラス、動詞の文は、そのまま置けない。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "だから Thank you for helping me. で、help じゃないのか。",
      say: "だから、サンキュー フォー ヘルピング ミー、で、ヘルプじゃないのか。",
    },

    { kind: "chapter", title: "2. at は点、on は接触、in は中" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "本題。{{at}} は地図にピンを刺す{{点}}。{{on}} は表面に{{くっついている}}こと。だから on the wall、かべにも使える。{{in}} は囲まれた空間や広がりの{{中}}だ。",
      say: "本題。アットは、地図に、ピンを刺す、点。オンは、表面に、くっついていること。だから、オン ザ ウォール、かべにも使える。インは、囲まれた空間や、広がりの、なかだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "at 7:30" },
      text: "このイメージは時間にも使える。時刻は時計の上の1点で at seven。1日は暦の上のマスで on Sunday。月や年は幅のある期間で in July。",
      say: "このイメージは、時間にも使える。時刻は、時計のうえの、いってんで、アット セブン。いちにちは、こよみのうえの、マスで、オン サンデー。つきや、としは、はばのある期間で、イン ジュライ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ誕生日は5月の中だから、I was born in May 5. ですね。",
      say: "じゃあ、誕生日は、ごがつの、なかだから、アイ ワズ ボーン イン メイ フィフス、ですね。",
    },
    { kind: "talk", who: "sensei", text: "そう来ると思った。問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "日付は暦の上の「その日」だから on。月だけなら in May。in the morning でも、特定の日の朝なら on Monday morning になる。",
      say: "日付は、こよみのうえの、そのひ、だから、オン。つきだけなら、イン メイ。イン ザ モーニングでも、特定のひの朝なら、オン マンデー モーニングになる。",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "謎解き。フォッグにとってクラブは、毎日通う地図の上の点なので at the club。部屋は四方を壁に囲まれた空間だから in the same room。テーブルは食卓につく1点で at the same table。英語は、話し手が場所を点と見るか、中と見るかを言い分けている。",
      say: "謎解き。フォッグにとって、クラブは、毎日通う、地図のうえの点なので、アット ザ クラブ。部屋は、四方を、壁に囲まれた空間だから、イン ザ セイム ルーム。テーブルは、食卓につく、いってんで、アット ザ セイム テーブル。英語は、はなしてが、場所を、点と見るか、なかと見るかを、言いわけている。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "待ち合わせも同じ。at the station は駅という地点、in the station は駅の建物の中。乗り物なら、立って歩けるバスは on the bus、かがんで乗りこむ車は in the car だ。",
      say: "待ち合わせも同じ。アット ザ ステーションは、駅という地点。イン ザ ステーションは、駅の建物の、なか。乗りものなら、立って歩ける、バスは、オン ザ バス。かがんで乗りこむ、車は、イン ザ カーだ。",
    },

    { kind: "chapter", title: "3. by と until、for と during" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "フォッグはクラブで2万ポンドを賭け、in eighty days、80日以内に世界一周すると宣言する。この in は所要時間の in。条件は、12月21日の夜8時45分までに、同じクラブの部屋にもどることだ。",
      say: "フォッグは、クラブで、2まんポンドを賭け、イン エイティー デイズ、80にち以内に、世界一周すると、宣言する。このインは、所要時間のイン。条件は、じゅうにがつ、にじゅういちにちの、夜、はちじ、よんじゅうごふんまでに、同じクラブの部屋に、もどることだ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "「〜まで」なら until ですね。Please return the book until Friday. と同じ。",
      say: "までなら、アンティルですね。プリーズ リターン ザ ブック アンティル フライデー、と同じ。",
    },
    { kind: "talk", who: "sensei", text: "ここでも差がつく。問題。" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "〜までに（期限）" },
      text: "by は「〜までに」。その時までに1回すませる{{期限}}だ。until は「〜までずっと」続く{{継続}}。合う動詞もちがう。by は finish・return、until は stay・wait。フォッグの賭けは、by で表す期限だ。",
      say: "バイは、までに。そのときまでに、いっかい、すませる、期限だ。アンティルは、までずっと、続く、継続。合う動詞も、ちがう。バイは、フィニッシュ、リターン。アンティルは、ステイ、ウェイト。フォッグの賭けは、バイで表す、期限だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "対になるのが for と during。for three days は長さを数字で、during the summer vacation はどの期間かを名前で言う。during three days とは言わない。",
      say: "ついになるのが、フォーと、デュアリング。フォー スリー デイズは、長さを、数字で。デュアリング ザ サマー ヴェイケイションは、どの期間かを、名前で言う。デュアリング スリー デイズとは、言わない。",
    },

    { kind: "chapter", title: "4. 2語で1つの前置詞" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "最後。because of、in spite of、instead of のように、2語以上で1つの前置詞としてはたらくのが{{群前置詞}}。because は接続詞だから後ろに文が来るが、because of の後ろは名詞だ。",
      say: "最後。ビコーズ オヴ、イン スパイト オヴ、インステッド オヴのように、2ご以上で、ひとつの前置詞として、はたらくのが、群前置詞。ビコーズは、接続詞だから、うしろに、文が来るが、ビコーズ オヴのうしろは、名詞だ。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "では確認。The game was put off、空欄2つ、the heavy snow。大雪のために。問題。",
      say: "では、確認。ザ ゲーム ワズ プット オフ、空欄、ふたつ、ザ ヘヴィ スノウ。おおゆきのために。問題。",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "seito",
      text: "because of。後ろが名詞の the heavy snow だから。In spite of it rained みたいに文を続けるのもダメなんですね。",
      say: "ビコーズ オヴ。うしろが、名詞の、ザ ヘヴィ スノウだから。イン スパイト オヴ イット レインド、みたいに、文を続けるのも、ダメなんですね。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "because of" },
      text: "そのとおり。In spite of the rain, we went out. 文で言うなら Though it rained。作中のフォッグも、相手が three months と言いかけたところで、In eighty days と前置詞句だけでさえぎる。",
      say: "そのとおり。イン スパイト オヴ ザ レイン、ウィー ウェント アウト。文で言うなら、ゾウ イット レインド。作中のフォッグも、相手が、スリー マンスと言いかけたところで、イン エイティー デイズ、と、前置詞句だけで、さえぎる。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "一言でいうと、前置詞は見方の目じるし。点なら at、くっつけば on、中なら in。ガイドブックには「点なら at、建物の中なら in」と地図つきで書けば、もう駅ですれちがう旅人は出ない。",
      say: "ひとことでいうと、前置詞は、見方のめじるし。点なら、アット。くっつけば、オン。なかなら、イン。ガイドブックには、点ならアット、建物のなかならイン、と、地図つきで書けば、もう、駅で、すれちがう、旅人は出ない。",
    },
  ],
};
