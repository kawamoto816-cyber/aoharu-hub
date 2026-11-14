import type { CastScript } from "../types";

// 止まる授業：前置詞（高校・英文法）× 熱血エンタメ講義（ダイチ・カエデ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-zenchishi.ts の本文だけ。
// 画面の前のきみに語りかけ、テンポよく進める。英文は say でカタカナに開く。問題は data/h-eng-gram-zenchishi.ts から引く。

export const H_ZENCHISHI_H_NEKKETSU: CastScript = {
  unitId: "h-eng-gram-zenchishi",
  castId: "h-nekketsu",
  title: "ピンか、箱か！　前置詞のイメージで駅のすれちがいを止めろ",
  scenes: [
    { kind: "chapter", title: "オープニング：駅ですれちがう謎！" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "さあ、いくぞ！　ダイチだ！　今日の依頼人は、旅行ガイドブックの編集者！　読者の声は「at と in のちがいが、いくら覚えてもわからない」！　駅で待ち合わせたら、相手は改札の中、自分は駅前にいた！",
      say: "さあ、いくぞ！　ダイチだ！　きょうのいらいにんは、旅行ガイドブックの、編集者！　読者の声は、アットとインの、ちがいが、いくら覚えても、わからない！　駅で待ち合わせたら、相手は、改札のなか、自分は、駅前にいた！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "聞き役のカエデです！　ヴェルヌの『八十日間世界一周』の主人公は、at the club, in the same room, at the same table で毎日食事！　どれも「〜で」なのに、ややこしい！",
      say: "聞き役のカエデです！　ヴェルヌの、80にちかん世界一周の、主人公は、アット ザ クラブ、イン ザ セイム ルーム、アット ザ セイム テーブルで、毎日食事！　どれも、で、なのに、ややこしい！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "画面の前のきみも、いっしょに謎を解こう！　四つのステージで、前置詞を攻略だ！",
      say: "画面の前のきみも、いっしょに、謎を解こう！　よっつのステージで、前置詞を、攻略だ！",
    },

    { kind: "chapter", title: "1. 前置詞は名詞の前！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "ステージ1！　前置詞は英語で preposition！　pre は「前に」、position は「置くこと」！　名詞の{{前}}に置いて、「前置詞＋名詞」でひとまとまり！　日本語の「机の上に」と順番が逆なんだ！",
      say: "ステージ1！　前置詞は、英語で、プレポジション！　プレは、まえに。ポジションは、置くこと！　名詞の、まえに置いて、前置詞、プラス、名詞で、ひとまとまり！　日本語の、机のうえに、と、順番が逆なんだ！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "The book on the desk is mine. なら book を説明する{{形容詞}}のはたらき！　I put the book on the desk. なら put を説明する{{副詞}}のはたらき！　同じ形で役割が変わる！",
      say: "ザ ブック オン ザ デスク イズ マイン、なら、ブックを説明する、形容詞のはたらき！　アイ プット ザ ブック オン ザ デスク、なら、プットを説明する、副詞のはたらき！　同じかたちで、役割が変わる！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "前置詞の後ろは名詞の席！　だから with him、Thank you for helping me. なんだね！",
      say: "前置詞のうしろは、名詞の席！　だから、ウィズ ヒム。サンキュー フォー ヘルピング ミー、なんだね！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "動名詞" },
      text: "そのとおり！　代名詞は{{目的格}}、動詞は{{動名詞}}！　主語＋動詞の文は、そのままは置けない！",
      say: "そのとおり！　代名詞は、目的格。動詞は、動名詞！　主語、プラス、動詞の文は、そのままは、置けない！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "あれ、スティーヴンソンの詩の It flows along for ever. の along は、後ろに名詞がないよ？",
      say: "あれ、スティーヴンソンの詩の、イット フロウズ アロング フォー エヴァー、の、アロングは、うしろに、名詞がないよ？",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "鋭い！　後ろに名詞がなければ前置詞ではなく{{副詞}}！　形で見分けるんだ！",
      say: "するどい！　うしろに名詞がなければ、前置詞ではなく、副詞！　かたちで、見分けるんだ！",
    },

    { kind: "chapter", title: "2. ピンと、面と、箱！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "ステージ2！　ここが熱い！　{{at}} は地図に刺すピン、{{点}}だ！　{{on}} は表面に{{くっついている}}！　かべでも天井でも on！　{{in}} は囲まれた空間の{{中}}！",
      say: "ステージ2！　ここが熱い！　アットは、地図に刺す、ピン、点だ！　オンは、表面に、くっついている！　かべでも、天井でも、オン！　インは、囲まれた空間の、なか！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "at 7:30" },
      text: "時間も同じだ！　時刻は時計の上の点で at seven！　1日は暦のマスで on Sunday！　月や年は幅のある期間で in July！",
      say: "時間も、同じだ！　時刻は、時計のうえの点で、アット セブン！　いちにちは、こよみのマスで、オン サンデー！　つきや、としは、はばのある期間で、イン ジュライ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "じゃあ5月は箱だから、I was born in May 5. で決まり！",
      say: "じゃあ、ごがつは、箱だから、アイ ワズ ボーン イン メイ フィフス、で決まり！",
    },
    { kind: "talk", who: "sensei", text: "画面の前のきみはどう思う！　問題！", say: "画面の前のきみは、どう思う！　問題！" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "seito",
      text: "日付は「その日」だから on！　月だけなら in May！　特定の日の朝なら on Monday morning！",
      say: "日付は、そのひ、だから、オン！　つきだけなら、イン メイ！　特定のひの朝なら、オン マンデー モーニング！",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "謎解きだ！　フォッグにとって、毎日通うクラブは地図のピンで at！　部屋は壁に囲まれた箱で in！　テーブルは食卓につく点で at！　前置詞は、場所の大きさじゃなく、話し手がそこを点と見るか、中と見るかで決まる！",
      say: "謎解きだ！　フォッグにとって、毎日通う、クラブは、地図のピンで、アット！　部屋は、壁に囲まれた、箱で、イン！　テーブルは、食卓につく点で、アット！　前置詞は、場所の大きさじゃなく、はなしてが、そこを、点と見るか、なかと見るかで、決まる！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "駅もそうだ！　at the station は地点、in the station は建物の中！　バスは床に乗る感じで on the bus、車はかがんで中に入る感じで in the car！　大きさじゃなく、乗る人の感じ方だ！",
      say: "駅も、そうだ！　アット ザ ステーションは、地点。イン ザ ステーションは、建物のなか！　バスは、床に乗る感じで、オン ザ バス。車は、かがんで、なかに入る感じで、イン ザ カー！　大きさじゃなく、乗る、ひとの感じかただ！",
    },

    { kind: "chapter", title: "3. 期限か、継続か！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "ステージ3！　フォッグはクラブで2万ポンドを賭けた！　in eighty days or less、80日以内に世界一周！　しかも1920時間で、と言い直す几帳面さ！　期限は12月21日の夜8時45分！　この in は、80日という期間の中で、という所要時間の in だ！",
      say: "ステージ3！　フォッグは、クラブで、2まんポンドを賭けた！　イン エイティー デイズ オア レス、80にち以内に、世界一周！　しかも、1920じかんで、と言い直す、きちょうめんさ！　期限は、じゅうにがつ、にじゅういちにちの、夜、はちじ、よんじゅうごふん！　このインは、80にちという、期間のなかで、という、所要時間のインだ！",
    },
    {
      kind: "talk",
      who: "seito",
      text: "金曜までに返すなら、Please return the book until Friday.！",
      say: "金曜までに返すなら、プリーズ リターン ザ ブック アンティル フライデー！",
    },
    { kind: "talk", who: "sensei", text: "待った！　問題！" },
    { kind: "pause", ref: "mistake:1" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "〜までに（期限）" },
      text: "by は1回すませる{{期限}}！　until はずっと続く{{継続}}！　Finish it by six. と Wait here until six.！　for は three days のような長さ、during は the summer vacation のような特定の期間だ！",
      say: "バイは、いっかい、すませる、期限！　アンティルは、ずっと続く、継続！　フィニッシュ イット バイ シックス、と、ウェイト ヒア アンティル シックス！　フォーは、スリー デイズのような、長さ。デュアリングは、ザ サマー ヴェイケイションのような、特定の期間だ！",
    },

    { kind: "chapter", title: "4. 2語で1つの前置詞！" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "最終ステージ！　because of、in spite of、instead of！　2語以上で1つの前置詞、{{群前置詞}}だ！　because は接続詞で後ろに文、because of は後ろに名詞！　では、The game was put off、空欄2つ、the heavy snow。大雪のために！　問題！",
      say: "最終ステージ！　ビコーズ オヴ、イン スパイト オヴ、インステッド オヴ！　2ご以上で、ひとつの前置詞、群前置詞だ！　ビコーズは、接続詞で、うしろに文。ビコーズ オヴは、うしろに名詞！　では、ザ ゲーム ワズ プット オフ、空欄、ふたつ、ザ ヘヴィ スノウ。おおゆきのために！　問題！",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "seito",
      text: "because of！　後ろが名詞の the heavy snow だから！",
      say: "ビコーズ オヴ！　うしろが、名詞の、ザ ヘヴィ スノウだから！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "おまけだ！　作中の新聞の旅程は From Suez to Bombay, by steamer、From Bombay to Calcutta, by rail！　from・to・by だけで世界一周の地図が描ける！　手段の by の後ろには a も the もつかない！",
      say: "おまけだ！　作中の、新聞の旅程は、フロム スエズ トゥー ボンベイ、バイ スティーマー。フロム ボンベイ トゥー カルカッタ、バイ レイル！　フロム、トゥー、バイだけで、世界一周の地図が、描ける！　手段のバイのうしろには、アも、ザも、つかない！",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3, focus: "because of" },
      text: "大正解！　We stayed home because it rained. は、We stayed home because of the rain. に書きかえられる！　画面の前のきみ、ガイドには「点なら at、建物の中なら in」！　これで駅のすれちがいはゼロだ！",
      say: "大正解！　ウィー ステイド ホーム ビコーズ イット レインド、は、ウィー ステイド ホーム ビコーズ オヴ ザ レイン、に書きかえられる！　画面の前のきみ、ガイドには、点ならアット、建物のなかならイン！　これで、駅のすれちがいは、ゼロだ！",
    },
  ],
};
