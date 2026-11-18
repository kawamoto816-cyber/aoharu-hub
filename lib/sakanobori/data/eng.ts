import type { PrereqUnit } from "../types";

// 英語（小3・4 → 小5・6 → 中1〜3 → 高校）の前提の地図。
export const PREREQ_ENG: PrereqUnit[] = [
  // ───── 小学校3・4年 ─────
  {
    unit: "e-english-34-aisatsu",
    needs: [],
    mistakes: [
      { i: 0, root: "e-english-34-aisatsu", why: "Good night. は別れるときの言葉だと区別できていない" },
      { i: 1, root: "e-english-34-aisatsu", why: "返すときは最後に too をつける決まりを知らない" },
      { i: 2, root: "e-english-34-aisatsu", why: "How are you? は調子をたずねる質問だとつかめていない" },
    ],
  },
  {
    unit: "e-english-34-kazu",
    needs: [{ unit: "e-math-1-100made", why: "40は十が4つ。十のまとまりがわかると -ty の数が作れる" }],
    mistakes: [
      { i: 0, root: "e-english-34-kazu", why: "11と12は特別な形だと覚えていない" },
      { i: 1, root: "e-english-34-kazu", why: "forty は four と u のあるなしがちがうと知らない" },
      { i: 2, root: "e-english-34-kazu", why: "-teen と -ty で強く言う場所がちがうと知らない" },
    ],
  },
  {
    unit: "e-english-34-iro-katachi",
    needs: [{ unit: "e-math-2-sankaku-shikaku", why: "三角形・正方形を見分けられると、英語の形の名前と結べる" }],
    mistakes: [
      { i: 0, root: "e-english-34-iro-katachi", why: "英語では色を形の前に置く語順をつかめていない" },
      { i: 1, root: "e-english-34-iro-katachi", why: "square と triangle の意味を形と結びつけていない" },
      { i: 2, root: "e-english-34-iro-katachi", why: "What の質問には中身で答えるとわかっていない" },
    ],
  },
  {
    unit: "e-english-34-suki",
    needs: [
      { unit: "e-english-34-aisatsu", why: "たずねられたら答える、やりとりの形が土台になる" },
      { unit: "e-english-34-iro-katachi", why: "好きな色や形を言うのに、その言葉が必要" },
    ],
    mistakes: [
      { i: 0, root: "e-english-34-suki", why: "「好き」は like で言うとつかめていない" },
      { i: 1, root: "e-english-34-suki", why: "Do you 〜? には Yes, I do. と答える形を知らない" },
      { i: 2, root: "e-english-34-suki", why: "What の質問は Yes / No で答えないとわかっていない" },
    ],
  },
  {
    unit: "e-english-34-alpha-oomoji",
    needs: [{ unit: "e-japanese-3-romaji", why: "ローマ字で見たアルファベットの形が、そのまま使える" }],
    mistakes: [
      { i: 0, root: "e-english-34-alpha-oomoji", why: "A から Z まで順に言って数を確かめていない" },
      { i: 1, root: "e-english-34-alpha-oomoji", why: "横線の数で E と F を見分ける点を押さえていない" },
      { i: 2, root: "e-english-34-alpha-oomoji", why: "エムとエヌの口の形のちがいを聞き分けていない" },
    ],
  },
  {
    unit: "e-english-34-alpha-komoji",
    needs: [{ unit: "e-english-34-alpha-oomoji", why: "大文字と組にして覚えると、小文字が見分けやすい" }],
    mistakes: [
      { i: 0, root: "e-english-34-alpha-komoji", why: "丸がたて線の左か右かで b と d を見分けていない" },
      { i: 1, root: "e-english-34-alpha-oomoji", why: "大文字 I と L の形を正しく覚えていない" },
      { i: 2, root: "e-english-34-alpha-komoji", why: "人の名前の最初は大文字という決まりを知らない" },
    ],
  },
  {
    unit: "e-english-34-youbi-tenki",
    needs: [{ unit: "e-english-34-alpha-oomoji", why: "曜日は大文字で始まるので、大文字が書ける必要がある" }],
    mistakes: [
      { i: 0, root: "e-english-34-youbi-tenki", why: "Tu と Th の始まりで曜日を区別していない" },
      { i: 1, root: "e-english-34-youbi-tenki", why: "曜日は名前と同じく大文字で始めると知らない" },
      { i: 2, root: "e-english-34-youbi-tenki", why: "weather は天気の質問だとつかめていない" },
    ],
  },
  {
    unit: "e-english-34-jikoku",
    needs: [
      { unit: "e-english-34-kazu", why: "時刻は数を2つ並べて言うので、数の言い方が必要" },
      { unit: "e-math-2-jikoku", why: "時計を読んで午前・午後がわかると英語でも言える" },
    ],
    mistakes: [
      { i: 0, root: "e-english-34-jikoku", why: "英語の時刻は「時→分」の順と覚えていない" },
      { i: 1, root: "e-english-34-jikoku", why: "「〜時に」は at をつけるとつかめていない" },
      { i: 2, root: "e-math-2-jikoku", why: "午前・午後の区別があいまいだと a.m. も迷う" },
    ],
  },
  {
    unit: "e-english-34-hoshii",
    needs: [
      { unit: "e-english-34-suki", why: "I like 〜. と同じ形で like を want にかえる" },
      { unit: "e-english-34-kazu", why: "Three apples のように数を言う場面が多い" },
    ],
    mistakes: [
      { i: 0, root: "e-english-34-suki", why: "I like と同じく I のすぐ後に動作の言葉を置く形" },
      { i: 1, root: "e-english-34-hoshii", why: "母音の音で始まる語には an と知らない" },
      { i: 2, root: "e-english-34-hoshii", why: "2つ以上なら -s をつける決まりを知らない" },
      { i: 3, root: "e-english-34-suki", why: "Do you 〜? には Yes, I do. と答える形を学ぶ" },
    ],
  },
  {
    unit: "e-english-34-mi-no-mawari",
    needs: [{ unit: "e-english-34-hoshii", why: "a / an をつけて物の名前を言う形を使う" }],
    mistakes: [
      { i: 0, root: "e-english-34-mi-no-mawari", why: "cap と cup の母音のちがいを聞き分けていない" },
      { i: 1, root: "e-english-34-mi-no-mawari", why: "物は It's で答え、I'm は自分のときだとつかめていない" },
      { i: 2, root: "e-english-34-mi-no-mawari", why: "my があれば a はいらないと知らない" },
    ],
  },
  {
    unit: "e-english-34-michi",
    needs: [{ unit: "e-social-3-chizu", why: "地図を読みとり、方向を考える力が道案内の土台" }],
    mistakes: [
      { i: 0, root: "e-social-3-chizu", why: "地図の向きと歩く人の向きを区別できていない" },
      { i: 1, root: "e-english-34-michi", why: "相手と同じ向きに立つと右左がそろうと知らない" },
      { i: 2, root: "e-english-34-michi", why: "場所をたずねるのは Where とつかめていない" },
      { i: 3, root: "e-english-34-michi", why: "「〜番目」は second など別の形になると知らない" },
    ],
  },

  // ───── 小学校5・6年 ─────
  {
    unit: "e-english-56-alpha-kaku",
    needs: [
      { unit: "e-english-34-alpha-komoji", why: "小文字の形と高さを知っていると、線に正しく書ける" },
      { unit: "e-english-34-alpha-oomoji", why: "文の始めや名前に使う大文字が書ける必要がある" },
    ],
    mistakes: [
      { i: 0, root: "e-english-34-alpha-komoji", why: "下にのびる小文字の高さを覚えていない" },
      { i: 1, root: "e-english-34-alpha-komoji", why: "人の名前は大文字で始めると身についていない" },
      { i: 2, root: "e-english-56-alpha-kaku", why: "「私」の I はいつも大文字という決まりを知らない" },
      { i: 3, root: "e-english-56-alpha-kaku", why: "単語と単語の間をあけて書く決まりを知らない" },
    ],
  },
  {
    unit: "e-english-56-oto-moji",
    needs: [
      { unit: "e-english-34-alpha-komoji", why: "文字の名前を知っていてこそ、音とのちがいがわかる" },
      { unit: "e-japanese-3-romaji", why: "ローマ字の子音＋母音の組み立てが、音読みの手がかり" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-oto-moji", why: "文字の「名前」と単語の中の「音」を分けていない" },
      { i: 1, root: "e-english-56-oto-moji", why: "sh は2文字で1つの音だと知らない" },
      { i: 2, root: "e-japanese-3-romaji", why: "ローマ字のら行は r で、l との区別をしていない" },
    ],
  },
  {
    unit: "e-english-56-jikoshokai",
    needs: [
      { unit: "e-english-34-aisatsu", why: "Nice to meet you. などのあいさつを使う" },
      { unit: "e-english-34-suki", why: "好きなものを I like 〜. で伝える" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-jikoshokai", why: "名前は My name is 〜. と言う形を覚えていない" },
      { i: 1, root: "e-english-34-aisatsu", why: "返すときは最後に too をつけると身についていない" },
      { i: 2, root: "e-english-34-suki", why: "Do you 〜? には Yes, I do. と答える形" },
      { i: 3, root: "e-english-56-alpha-kaku", why: "地名や人名は大文字で始める書き方の決まり" },
    ],
  },
  {
    unit: "e-english-56-tanjobi",
    needs: [
      { unit: "e-english-34-kazu", why: "日付の「〜番目」は数の言い方をもとに作る" },
      { unit: "e-english-34-youbi-tenki", why: "曜日と同じく、月の名前も大文字で始まる" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-tanjobi", why: "日付は fifth のような「何番目」で言うと知らない" },
      { i: 1, root: "e-english-34-youbi-tenki", why: "曜日を大文字で始める決まりと同じだとつながっていない" },
      { i: 2, root: "e-english-56-tanjobi", why: "twelve の ve が f にかわる形を覚えていない" },
      { i: 3, root: "e-english-56-tanjobi", why: "June と July の順番を覚えていない" },
    ],
  },
  {
    unit: "e-english-56-kyoka",
    needs: [
      { unit: "e-english-34-youbi-tenki", why: "時間割を言うのに、曜日の言い方が必要" },
      { unit: "e-english-34-suki", why: "好きな教科を I like 〜. で伝える" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-kyoka", why: "曜日の前は on とつかめていない" },
      { i: 1, root: "e-english-34-youbi-tenki", why: "Tuesday と Thursday の区別が固まっていない" },
      { i: 2, root: "e-english-56-kyoka", why: "言葉の名前（Japanese）は大文字で始めると知らない" },
    ],
  },
  {
    unit: "e-english-56-can",
    needs: [{ unit: "e-english-34-suki", why: "「主語＋動作の言葉」の文に can を足して作る" }],
    mistakes: [
      { i: 0, root: "e-english-56-can", why: "can の後ろの言葉は形をかえないと知らない" },
      { i: 1, root: "e-english-56-can", why: "can の後ろに play などの動作が要るとわかっていない" },
      { i: 2, root: "e-english-56-can", why: "スポーツの名前には the をつけないと知らない" },
      { i: 3, root: "e-english-56-can", why: "Can の質問には can で答えるとつかめていない" },
    ],
  },
  {
    unit: "e-english-56-ichi",
    needs: [
      { unit: "e-english-34-michi", why: "まっすぐ・右・左の道案内の言い方を発展させる" },
      { unit: "e-english-34-mi-no-mawari", why: "位置を言う物の名前が必要" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-ichi", why: "かべにくっついているなら on とつかめていない" },
      { i: 1, root: "e-english-56-ichi", why: "2つ以上の物には are を使うと知らない" },
      { i: 2, root: "e-english-34-michi", why: "Go straight. の言い方が身についていない" },
    ],
  },
  {
    unit: "e-english-56-chumon",
    needs: [
      { unit: "e-english-34-hoshii", why: "ほしい物を伝える I want 〜. をていねいにする" },
      { unit: "e-english-34-kazu", why: "値段を言ったり聞いたりするのに数が必要" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-chumon", why: "I'd like は「〜がほしい」のていねいな形と知らない" },
      { i: 1, root: "e-english-56-chumon", why: "値段は How much でたずねるとつかめていない" },
      { i: 2, root: "e-english-34-hoshii", why: "母音の音で始まる語には an を使う決まり" },
    ],
  },
  {
    unit: "e-english-56-ikitai",
    needs: [
      { unit: "e-english-34-hoshii", why: "I want 〜. に to go to を足して作る" },
      { unit: "e-english-56-can", why: "行った先で「できること」を can で足す" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-ikitai", why: "want の後に動作が来るときは to が要ると知らない" },
      { i: 1, root: "e-english-56-ikitai", why: "go の後に場所を言うときは to が要ると知らない" },
      { i: 2, root: "e-english-56-alpha-kaku", why: "国名は大文字で始める書き方の決まり" },
    ],
  },
  {
    unit: "e-english-56-hito",
    needs: [
      { unit: "e-english-56-jikoshokai", why: "自分の紹介の形を、ほかの人に広げる" },
      { unit: "e-english-56-can", why: "その人のできることを can で伝える" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-hito", why: "男の人は He、女の人は She と使い分けていない" },
      { i: 1, root: "e-english-56-jikoshokai", why: "My name is の my にあたる言い方がつかめていない" },
      { i: 2, root: "e-english-56-can", why: "できることは can ＋動作の言葉で言う" },
    ],
  },
  {
    unit: "e-english-56-hindo",
    needs: [{ unit: "e-english-34-jikoku", why: "一日の生活を時刻とあわせて言う形を発展させる" }],
    mistakes: [
      { i: 0, root: "e-english-56-hindo", why: "always は動作の言葉の前に置くと知らない" },
      { i: 1, root: "e-english-34-jikoku", why: "時刻の前は at という決まりが身についていない" },
      { i: 2, root: "e-english-34-suki", why: "Do you 〜? には Yes, I do. と答える形" },
    ],
  },
  {
    unit: "e-english-56-kako",
    needs: [
      { unit: "e-english-56-hindo", why: "ふだんする動作の言葉を、過去の形にかえる" },
      { unit: "e-english-56-ikitai", why: "go to ＋場所の形を went to で使う" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-kako", why: "go の過去は went と形がかわると覚えていない" },
      { i: 1, root: "e-english-56-kako", why: "過去の感想は It was で言うと知らない" },
      { i: 2, root: "e-english-56-kako", why: "過去のことは -ed をつけるとつかめていない" },
    ],
  },
  {
    unit: "e-english-56-yume",
    needs: [{ unit: "e-english-56-ikitai", why: "want to ＋動作の形に be を入れて作る" }],
    mistakes: [
      { i: 0, root: "e-english-56-yume", why: "仕事の言葉に a をつけるとつかめていない" },
      { i: 1, root: "e-english-34-hoshii", why: "母音の音で始まる語には an を使う決まり" },
      { i: 2, root: "e-english-56-ikitai", why: "want の後に動作が来るときは to が要る" },
    ],
  },
  {
    unit: "e-english-56-omoide",
    needs: [{ unit: "e-english-56-kako", why: "したことを過去の形で伝える力を使う" }],
    mistakes: [
      { i: 0, root: "e-english-56-kako", why: "したことは過去の形で言うと身についていない" },
      { i: 1, root: "e-english-56-kako", why: "see の過去 saw のような形のかわり方を覚えていない" },
      { i: 2, root: "e-english-56-kako", why: "過去の感想は It was で言う形" },
    ],
  },
  {
    unit: "e-english-56-chugaku",
    needs: [{ unit: "e-english-56-ikitai", why: "したいことは I want to 〜. で言う形を使う" }],
    mistakes: [
      { i: 0, root: "e-english-56-chugaku", why: "join の後にはすぐ入る所を置くと知らない" },
      { i: 1, root: "e-english-34-hoshii", why: "2つ以上なら -s をつける決まり" },
      { i: 2, root: "e-english-56-chugaku", why: "hard は「何を」の後ろに置くとつかめていない" },
    ],
  },

  // ───── 中学1年 ─────
  {
    unit: "j-en-1-onsei",
    needs: [
      { unit: "e-english-56-oto-moji", why: "文字の「名前」と「音」の区別を小学校で学んでいる" },
      { unit: "e-english-56-alpha-kaku", why: "アルファベットを正しく書けることが前提" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-oto-moji", why: "文字の名前と単語の中の音を分けていない" },
      { i: 1, root: "j-en-1-onsei", why: "カタカナのように母音をそえる読み方のくせ" },
      { i: 2, root: "e-english-56-alpha-kaku", why: "「私」の I はいつも大文字という決まり" },
    ],
  },
  {
    unit: "j-en-1-be",
    needs: [
      { unit: "e-english-56-jikoshokai", why: "I'm 〜. の自己紹介が be動詞の文の入口" },
      { unit: "e-english-56-hito", why: "He is / She is で人を紹介した形を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-be", why: "you にはいつも are を使うと身についていない" },
      { i: 1, root: "j-en-1-be", why: "and でつないだ主語は2人なので are" },
      { i: 2, root: "j-en-1-be", why: "be動詞の質問には be動詞で答えると知らない" },
      { i: 3, root: "j-en-1-be", why: "否定の not は be動詞の後ろに置くと知らない" },
    ],
  },
  {
    unit: "j-en-1-ippan",
    needs: [
      { unit: "j-en-1-be", why: "be動詞の文とのちがいを知って使い分ける" },
      { unit: "e-english-34-suki", why: "I like 〜. が一般動詞の文の入口" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-ippan", why: "doesn't の後ろは原形という決まりを知らない" },
      { i: 1, root: "j-en-1-be", why: "be動詞と一般動詞は1つの文に重ねない" },
      { i: 2, root: "j-en-1-ippan", why: "主語が2人なら -s はつけないとつかめていない" },
      { i: 3, root: "j-en-1-ippan", why: "子音＋y で終わる語は ies にする決まり" },
    ],
  },
  {
    unit: "j-en-1-meishi",
    needs: [
      { unit: "e-english-34-hoshii", why: "a / an や複数の -s を小学校の表現で使っている" },
      { unit: "j-en-1-onsei", why: "an にするかは、最初の「音」が母音かで決まる" },
    ],
    mistakes: [
      { i: 0, root: "e-english-34-hoshii", why: "2つ以上なら -s をつける決まりが身についていない" },
      { i: 1, root: "j-en-1-onsei", why: "hour の h は発音しない。音で判断できていない" },
      { i: 2, root: "j-en-1-meishi", why: "water は数えられない名詞だとつかめていない" },
      { i: 3, root: "j-en-1-meishi", why: "y→ies や children のような変化を覚えていない" },
    ],
  },
  {
    unit: "j-en-1-daimeishi",
    needs: [
      { unit: "j-en-1-be", why: "主語の I・you・he などの使い方が土台" },
      { unit: "j-en-1-ippan", why: "動詞の後ろの「〜を」の位置で me・him を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-daimeishi", why: "動詞の後ろでは him の形になると知らない" },
      { i: 1, root: "j-en-1-daimeishi", why: "名詞の前は my の形とつかめていない" },
      { i: 2, root: "j-en-1-daimeishi", why: "「私のもの」は mine と知らない" },
      { i: 3, root: "j-en-1-be", why: "主語が複数なら are という決まり" },
    ],
  },
  {
    unit: "j-en-1-gimonshi",
    needs: [
      { unit: "j-en-1-be", why: "疑問詞の後は be動詞の疑問文の語順が続く" },
      { unit: "j-en-1-ippan", why: "疑問詞の後は do / does の疑問文の語順が続く" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-ippan", why: "一般動詞の疑問文は do を前に出す形" },
      { i: 1, root: "j-en-1-gimonshi", why: "疑問詞の質問は Yes / No で答えないと知らない" },
      { i: 2, root: "j-en-1-meishi", why: "2つ以上なら名詞に -s をつける決まり" },
      { i: 3, root: "j-en-1-gimonshi", why: "Who が主語のときは does を使わないと知らない" },
    ],
  },
  {
    unit: "j-en-1-meirei",
    needs: [
      { unit: "j-en-1-ippan", why: "命令文は動詞の原形から始めるので、原形がわかること" },
      { unit: "j-en-1-be", why: "Be quiet. の be は am・are・is のもとの形" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-meirei", why: "命令文の動詞は -s をつけない原形と知らない" },
      { i: 1, root: "j-en-1-be", why: "am・are・is のもとの形が be だと知らない" },
      { i: 2, root: "j-en-1-meirei", why: "禁止は Don't で始めるとつかめていない" },
      { i: 3, root: "j-en-1-meirei", why: "Let's の後ろは原形という決まりを知らない" },
    ],
  },
  {
    unit: "j-en-1-can",
    needs: [
      { unit: "e-english-56-can", why: "小学校で使った I can 〜. を文法として整理する" },
      { unit: "j-en-1-ippan", why: "動詞の原形と3人称単数の -s を区別できること" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-can", why: "can の後ろは形をかえないと身についていない" },
      { i: 1, root: "j-en-1-can", why: "can の疑問文は can を前に出すと知らない" },
      { i: 2, root: "j-en-1-can", why: "can には -s をつけないとつかめていない" },
      { i: 3, root: "j-en-1-can", why: "can't だけで否定になると知らない" },
    ],
  },
  {
    unit: "j-en-1-shinkokei",
    needs: [
      { unit: "j-en-1-be", why: "進行形は be動詞を使うので、主語との組み合わせが必要" },
      { unit: "j-en-1-ippan", why: "一般動詞に -ing をつけて作る" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-be", why: "主語の後に be動詞を置く形が身についていない" },
      { i: 1, root: "j-en-1-shinkokei", why: "be動詞の後ろは -ing の形とつかめていない" },
      { i: 2, root: "j-en-1-shinkokei", why: "進行形の疑問文は be動詞を前に出すと知らない" },
      { i: 3, root: "j-en-1-shinkokei", why: "know のような状態の動詞は進行形にしない" },
    ],
  },
  {
    unit: "j-en-1-kakokei",
    needs: [
      { unit: "j-en-1-ippan", why: "do / does の文を did にかえて過去を表す" },
      { unit: "j-en-1-be", why: "am・is を was に、are を were にかえる" },
      { unit: "e-english-56-kako", why: "went など、小学校で使った過去の形を整理する" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-ippan", why: "do / does の後は原形という決まりと同じ" },
      { i: 1, root: "j-en-1-be", why: "ようすを表す文は be動詞の文だと見分けていない" },
      { i: 2, root: "j-en-1-be", why: "主語が複数なら are、過去なら were になる" },
      { i: 3, root: "e-english-56-kako", why: "go→went のような不規則な形を覚えていない" },
    ],
  },
  {
    unit: "j-en-1-tango",
    needs: [{ unit: "j-en-1-onsei", why: "音とつづりの関係がわかると単語が覚えやすい" }],
    mistakes: [
      { i: 0, root: "e-english-34-youbi-tenki", why: "曜日や月は大文字で始める決まりを小学校で学ぶ" },
      { i: 1, root: "j-en-1-tango", why: "日本語から英語を書く練習をしていない" },
      { i: 2, root: "j-en-1-tango", why: "間をあけてくり返す覚え方を知らない" },
    ],
  },
  {
    unit: "j-en-1-eisakubun",
    needs: [
      { unit: "j-en-1-ippan", why: "主語＋一般動詞＋目的語の語順で書く" },
      { unit: "j-en-1-be", why: "be動詞の文と一般動詞の文を使い分けて書く" },
      { unit: "e-japanese-2-shugo", why: "「だれが」「どうする」を先に決めて文を組む" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-ippan", why: "be動詞と一般動詞は1つの文に重ねない" },
      { i: 1, root: "j-en-1-ippan", why: "主語が3人称単数なら動詞に -s をつける" },
      { i: 2, root: "j-en-1-eisakubun", why: "英語は動詞が主語のすぐ後という語順をつかめていない" },
      { i: 3, root: "j-en-1-eisakubun", why: "very much は文の最後に置くと知らない" },
    ],
  },
  {
    unit: "j-en-1-listening",
    needs: [
      { unit: "j-en-1-gimonshi", why: "最初の疑問詞で、何を聞かれているかがわかる" },
      { unit: "j-en-1-can", why: "Can you 〜? などの質問と答え方を聞き取る" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-can", why: "Can の質問には can で答える形" },
      { i: 1, root: "j-en-1-listening", why: "答えに関わる語だけ拾う聞き方を知らない" },
      { i: 2, root: "j-en-1-gimonshi", why: "質問の What time が何を聞いているかつかめていない" },
    ],
  },

  // ───── 中学2年 ─────
  {
    unit: "j-en-2-kako-shinko",
    needs: [
      { unit: "j-en-1-shinkokei", why: "be動詞＋-ing の進行形を過去にする" },
      { unit: "j-en-1-kakokei", why: "be動詞の過去 was / were を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-shinkokei", why: "be動詞の後ろは -ing という進行形の形" },
      { i: 1, root: "j-en-1-kakokei", why: "主語が複数なら were という過去の形" },
      { i: 2, root: "j-en-1-shinkokei", why: "進行形の疑問文は be動詞を前に出す" },
      { i: 3, root: "j-en-2-kako-shinko", why: "「そのとき途中だった」は進行形と区別していない" },
    ],
  },
  {
    unit: "j-en-2-mirai",
    needs: [
      { unit: "j-en-1-can", why: "will も can と同じく、後ろの動詞は原形" },
      { unit: "j-en-1-be", why: "be going to の be は主語で am・are・is になる" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-can", why: "助動詞の後は原形という決まりを can で学ぶ" },
      { i: 1, root: "j-en-1-be", why: "主語の後に be動詞を置く形が身についていない" },
      { i: 2, root: "j-en-2-mirai", why: "going to の to の後は原形とつかめていない" },
      { i: 3, root: "j-en-1-can", why: "助動詞の質問は同じ助動詞で答える形" },
    ],
  },
  {
    unit: "j-en-2-jodoshi",
    needs: [
      { unit: "j-en-1-can", why: "can と同じく、助動詞の後は原形" },
      { unit: "j-en-1-ippan", why: "has to は主語が3人称単数のときの形" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-can", why: "助動詞には -s をつけない決まり" },
      { i: 1, root: "j-en-2-jodoshi", why: "must not は禁止、don't have to は不要と区別していない" },
      { i: 2, root: "j-en-1-ippan", why: "主語が3人称単数なら have は has になる" },
      { i: 3, root: "j-en-2-jodoshi", why: "must に過去形はなく had to を使うと知らない" },
    ],
  },
  {
    unit: "j-en-2-setsuzokushi",
    needs: [
      { unit: "j-en-2-mirai", why: "if・when の中では未来でも現在形にする区別が要る" },
      { unit: "e-japanese-3-tsunagi", why: "だから・でも など、つながり方を見分ける力" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-setsuzokushi", why: "if の中では未来のことも現在形と知らない" },
      { i: 1, root: "j-en-2-setsuzokushi", why: "because と so は1つの文に重ねない" },
      { i: 2, root: "e-japanese-3-tsunagi", why: "「だから」と「でも」のつながり方を区別していない" },
    ],
  },
  {
    unit: "j-en-2-there",
    needs: [
      { unit: "j-en-1-be", why: "There is / are は be動詞の文なので形の選び方が要る" },
      { unit: "j-en-1-meishi", why: "後ろの名詞が単数か複数かで is / are が決まる" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-meishi", why: "名詞の単数・複数を見分けられていない" },
      { i: 1, root: "j-en-2-there", why: "There is は相手の知らない物に使うと知らない" },
      { i: 2, root: "j-en-2-there", why: "There の質問には there で答えると知らない" },
      { i: 3, root: "j-en-1-meishi", why: "How many の後は名詞を複数形にする" },
    ],
  },
  {
    unit: "j-en-2-futeishi",
    needs: [
      { unit: "e-english-56-ikitai", why: "I want to 〜. で to ＋動作の形を使っている" },
      { unit: "j-en-1-ippan", why: "to の後に置く動詞の原形がわかること" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-futeishi", why: "to の後は主語に関係なく原形と知らない" },
      { i: 1, root: "j-en-2-futeishi", why: "名詞を説明する to の後も原形とつかめていない" },
      { i: 2, root: "j-en-2-futeishi", why: "「〜するために」は to ＋原形で表すと知らない" },
    ],
  },
  {
    unit: "j-en-2-domeishi",
    needs: [
      { unit: "j-en-2-futeishi", why: "「〜すること」の to 不定詞と使い分ける" },
      { unit: "j-en-1-shinkokei", why: "動詞に -ing をつける形を進行形で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-domeishi", why: "enjoy の後は -ing と知らない" },
      { i: 1, root: "j-en-2-futeishi", why: "want の後は to 不定詞という使い分け" },
      { i: 2, root: "j-en-2-domeishi", why: "前置詞の後は -ing にする決まりを知らない" },
      { i: 3, root: "j-en-1-be", why: "主語が単数なら is という主語と動詞の一致" },
    ],
  },
  {
    unit: "j-en-2-bunkei",
    needs: [
      { unit: "j-en-1-ippan", why: "主語＋動詞＋目的語の基本の語順を広げる" },
      { unit: "j-en-1-daimeishi", why: "動詞の後ろの人は me・him の形を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-bunkei", why: "SVOO は「人→物」の順と知らない" },
      { i: 1, root: "j-en-1-daimeishi", why: "動詞の後ろでは me の形になる決まり" },
      { i: 2, root: "j-en-2-bunkei", why: "make は for、give は to と使い分けていない" },
      { i: 3, root: "j-en-2-bunkei", why: "C には形容詞を置くとつかめていない" },
    ],
  },
  {
    unit: "j-en-2-hikaku",
    needs: [{ unit: "j-en-1-be", why: "She is tall. のような文を比べる形にする" }],
    mistakes: [
      { i: 0, root: "j-en-2-hikaku", why: "長い語は more をつけると知らない" },
      { i: 1, root: "j-en-2-hikaku", why: "集団は in、同じ仲間の数は of と区別していない" },
      { i: 2, root: "j-en-2-hikaku", why: "as 〜 as の間はもとの形とつかめていない" },
      { i: 3, root: "j-en-2-hikaku", why: "good→better の不規則な変化を覚えていない" },
    ],
  },
  {
    unit: "j-en-2-ukemi",
    needs: [
      { unit: "j-en-1-be", why: "受け身は be動詞を使うので、主語との組み合わせが要る" },
      { unit: "j-en-1-kakokei", why: "過去形の -ed から過去分詞の形へつなげる" },
      { unit: "j-en-1-daimeishi", why: "by の後ろは her・him の形を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-ukemi", why: "write→written のような過去分詞を覚えていない" },
      { i: 1, root: "j-en-1-daimeishi", why: "前置詞の後ろは her の形になる決まり" },
      { i: 2, root: "j-en-1-be", why: "be動詞の文の疑問文は be動詞を前に出す" },
      { i: 3, root: "j-en-2-ukemi", why: "speak→spoken の不規則な形を覚えていない" },
    ],
  },
  {
    unit: "j-en-2-tango",
    needs: [
      { unit: "j-en-1-tango", why: "音・つづり・意味をセットで覚える方法を続ける" },
      { unit: "j-en-1-kakokei", why: "動詞の変化形をまとめて増やす土台になる" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-kakokei", why: "buy→bought の不規則な過去形を覚えていない" },
      { i: 1, root: "j-en-2-tango", why: "動詞を説明するのは -ly の副詞と知らない" },
      { i: 2, root: "j-en-2-tango", why: "look at と look for の意味を区別していない" },
      { i: 3, root: "j-en-2-hikaku", why: "good→better の不規則な比較の形" },
    ],
  },
  {
    unit: "j-en-2-eisakubun",
    needs: [
      { unit: "j-en-1-eisakubun", why: "主語と動詞を先に決めて書く方法を土台にする" },
      { unit: "j-en-2-setsuzokushi", why: "文と文を when・because でつないで書く" },
      { unit: "j-en-2-futeishi", why: "目的を to ＋原形で書き足す" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-setsuzokushi", why: "if の中では未来のことも現在形という決まり" },
      { i: 1, root: "j-en-2-futeishi", why: "to の後は原形という不定詞の形" },
      { i: 2, root: "j-en-2-setsuzokushi", why: "because は1つの文の中でつなぐ語と知らない" },
    ],
  },
  {
    unit: "j-en-2-listening",
    needs: [
      { unit: "j-en-1-listening", why: "最初の1語と数字を聞き取る力を土台にする" },
      { unit: "j-en-2-jodoshi", why: "Shall we 〜? などのさそいの表現を聞き取る" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-jodoshi", why: "Shall we 〜? には Yes, let's. と答える形" },
      { i: 1, root: "j-en-2-listening", why: "But・Actually のあとの変更を聞いていない" },
      { i: 2, root: "e-math-2-jikoku", why: "時刻の前後を計算する力があいまい" },
    ],
  },

  // ───── 中学3年 ─────
  {
    unit: "j-en-3-kanryo",
    needs: [
      { unit: "j-en-2-ukemi", why: "受け身で覚えた過去分詞を have の後に使う" },
      { unit: "j-en-1-ippan", why: "主語が3人称単数なら has を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-kanryo", why: "last year など過去の時点には過去形と知らない" },
      { i: 1, root: "j-en-1-ippan", why: "主語が3人称単数なら have は has になる" },
      { i: 2, root: "j-en-3-kanryo", why: "since は起点、for は期間と区別していない" },
      { i: 3, root: "j-en-3-kanryo", why: "現在完了の疑問文は have を前に出すと知らない" },
    ],
  },
  {
    unit: "j-en-3-kanryo-shinko",
    needs: [
      { unit: "j-en-3-kanryo", why: "have ＋過去分詞の形に been を使う" },
      { unit: "j-en-1-shinkokei", why: "動作の続きを -ing で表す進行形を合わせる" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-shinkokei", why: "know のような状態の動詞は進行形にしない" },
      { i: 1, root: "j-en-3-kanryo", why: "主語が3人称単数なら has を使う" },
      { i: 2, root: "j-en-3-kanryo-shinko", why: "「今までずっと」は完了進行形と区別していない" },
      { i: 3, root: "j-en-1-shinkokei", why: "be動詞（been）の後ろは -ing の形" },
    ],
  },
  {
    unit: "j-en-3-futeishi",
    needs: [
      { unit: "j-en-2-futeishi", why: "to ＋原形の3つの使い方を発展させる" },
      { unit: "j-en-1-daimeishi", why: "for の後ろや want の後ろは me・him の形" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-daimeishi", why: "前置詞の後ろは me の形になる決まり" },
      { i: 1, root: "j-en-3-futeishi", why: "「人に〜してほしい」は want 人 to と知らない" },
      { i: 2, root: "j-en-3-futeishi", why: "let の後は to をつけない原形と知らない" },
      { i: 3, root: "j-en-3-futeishi", why: "how to ＋原形の形を知らない" },
    ],
  },
  {
    unit: "j-en-3-bunshi",
    needs: [
      { unit: "j-en-1-shinkokei", why: "「している」の -ing の形を名詞の説明に使う" },
      { unit: "j-en-2-ukemi", why: "「された」の過去分詞の形を名詞の説明に使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-bunshi", why: "2語以上の説明は名詞の後ろに置くと知らない" },
      { i: 1, root: "j-en-2-ukemi", why: "「される側」は過去分詞という受け身の感覚" },
      { i: 2, root: "j-en-1-be", why: "主語は the boy 1人なので is という一致" },
    ],
  },
  {
    unit: "j-en-3-kankei",
    needs: [
      { unit: "j-en-3-bunshi", why: "名詞を後ろから説明するしくみを文に広げる" },
      { unit: "j-en-1-ippan", why: "説明の文の中でも3人称単数の -s が要る" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-kankei", why: "人は who、物や動物は which と使い分けていない" },
      { i: 1, root: "j-en-3-kankei", why: "関係代名詞が目的語の代わりなので it は不要" },
      { i: 2, root: "j-en-1-ippan", why: "先行詞が単数なら動詞に -s をつける" },
    ],
  },
  {
    unit: "j-en-3-kansetsu",
    needs: [
      { unit: "j-en-1-gimonshi", why: "疑問詞の文を、文の中に入れて使う" },
      { unit: "j-en-2-setsuzokushi", why: "文の中に別の文をつなげる形に慣れている" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-kansetsu", why: "文の中では「主語＋動詞」のふつうの語順と知らない" },
      { i: 1, root: "j-en-3-kansetsu", why: "疑問詞の後を this is の語順にしていない" },
      { i: 2, root: "j-en-3-kansetsu", why: "did を使わず、動詞を過去形にする形を知らない" },
    ],
  },
  {
    unit: "j-en-3-katei",
    needs: [
      { unit: "j-en-1-kakokei", why: "時制を1つ過去にずらすので、過去形が必要" },
      { unit: "j-en-2-setsuzokushi", why: "if の文の作り方を使う" },
      { unit: "j-en-2-mirai", why: "will・can を would・could にずらす" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-katei", why: "現実とちがう今は were を使うと知らない" },
      { i: 1, root: "j-en-3-katei", why: "仮定法では will でなく would にそろえる" },
      { i: 2, root: "j-en-3-katei", why: "I wish の後も過去の形にずらすと知らない" },
    ],
  },
  {
    unit: "j-en-3-tango",
    needs: [
      { unit: "j-en-2-tango", why: "変化形や語の家族でまとめる覚え方を続ける" },
      { unit: "j-en-2-domeishi", why: "熟語の前置詞の後は -ing という決まりを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-domeishi", why: "前置詞の後は -ing にする決まり" },
      { i: 1, root: "j-en-2-tango", why: "動詞を説明するのは副詞という使い分け" },
      { i: 2, root: "j-en-3-tango", why: "品詞や語のパーツから意味を推測する力" },
    ],
  },
  {
    unit: "j-en-3-eisakubun",
    needs: [
      { unit: "j-en-2-eisakubun", why: "短い文をつなぎ、理由とセットで書く力を使う" },
      { unit: "j-en-3-futeishi", why: "It is 〜 to … の形で意見を書く" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-eisakubun", why: "because は1つの文の中でつなぐ語" },
      { i: 1, root: "j-en-3-eisakubun", why: "agree の後に with が要ると知らない" },
      { i: 2, root: "j-en-3-eisakubun", why: "there には to がふくまれていると知らない" },
      { i: 3, root: "j-en-3-futeishi", why: "It is 〜 to の後は原形という形" },
    ],
  },
  {
    unit: "j-en-3-listening",
    needs: [{ unit: "j-en-2-listening", why: "変更のあとを聞く力を、長い放送に広げる" }],
    mistakes: [
      { i: 0, root: "j-en-2-listening", why: "But・Actually のあとの変更を聞いていない" },
      { i: 1, root: "j-en-3-listening", why: "同じ意味の言いかえに気づいていない" },
      { i: 2, root: "j-en-2-mirai", why: "これからのことは will で言うとつかめていない" },
    ],
  },
  {
    unit: "j-en-3-chobun",
    needs: [
      { unit: "j-en-3-tango", why: "知らない語の意味を推測する力が要る" },
      { unit: "j-en-3-kankei", why: "長い名詞のまとまりを読みとく文法が要る" },
      { unit: "j-ja-1-setsumei", why: "段落の要点とつなぎの語で読む方法は国語と同じ" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-tango", why: "前後や語のパーツから意味を推測する力" },
      { i: 1, root: "j-en-1-daimeishi", why: "代名詞が何を指すかを確かめていない" },
      { i: 2, root: "j-en-3-chobun", why: "本文にもどって確かめる読み方をしていない" },
    ],
  },

  // ───── 高校：語彙 ─────
  {
    unit: "h-eng-vocab-2000",
    needs: [{ unit: "j-en-3-tango", why: "中学の単語と語のパーツの知識を土台に増やす" }],
    mistakes: [
      { i: 0, root: "h-eng-vocab-2000", why: "1語1訳で覚え、コアの意味をつかんでいない" },
      { i: 1, root: "h-eng-vocab-2000", why: "-ic と -ical の意味のちがいを区別していない" },
      { i: 2, root: "h-eng-vocab-2000", why: "borrow と lend の向きを区別していない" },
      { i: 3, root: "j-en-1-tango", why: "間をあけてくり返す覚え方が身についていない" },
    ],
  },
  {
    unit: "h-eng-vocab-hatsuon",
    needs: [{ unit: "j-en-1-onsei", why: "つづりと音、強く読む所の基本を土台にする" }],
    mistakes: [
      { i: 0, root: "j-en-1-kakokei", why: "-ed の読み方が3通りあると身についていない" },
      { i: 1, root: "h-eng-vocab-hatsuon", why: "語の終わりでアクセントが決まる型を知らない" },
      { i: 2, root: "h-eng-vocab-hatsuon", why: "名詞は前、動詞は後ろを強く読む型を知らない" },
    ],
  },
  {
    unit: "h-eng-vocab-jukugo",
    needs: [
      { unit: "j-en-3-tango", why: "中学で学んだ熟語を土台に増やす" },
      { unit: "j-en-1-daimeishi", why: "it・them を動詞と副詞の間にはさむ形がある" },
    ],
    mistakes: [
      { i: 0, root: "h-eng-vocab-jukugo", why: "代名詞は pick と up の間にはさむと知らない" },
      { i: 1, root: "j-en-2-domeishi", why: "前置詞の to の後は -ing にする決まり" },
      { i: 2, root: "h-eng-vocab-jukugo", why: "take after と look after を区別していない" },
      { i: 3, root: "h-eng-vocab-jukugo", why: "熟語の比ゆ的な意味をつかんでいない" },
    ],
  },
  {
    unit: "h-eng-vocab-kaiwa",
    needs: [
      { unit: "j-en-1-gimonshi", why: "What と How のどちらでたずねるかの区別が要る" },
      { unit: "j-en-2-jodoshi", why: "Shall we 〜? などの助動詞を使った表現を広げる" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-gimonshi", why: "考えの中身をたずねるのは What と区別していない" },
      { i: 1, root: "h-eng-vocab-kaiwa", why: "mind は「いやだ」なので No で許可すると知らない" },
      { i: 2, root: "h-eng-vocab-kaiwa", why: "Why don't you 〜? は誘いの決まり文句と知らない" },
    ],
  },

  // ───── 高校：文法 ─────
  {
    unit: "h-eng-gram-bunkei",
    needs: [{ unit: "j-en-2-bunkei", why: "中学の SVOO・SVOC を5文型として整理する" }],
    mistakes: [
      { i: 0, root: "j-en-2-bunkei", why: "C には形容詞を置くという決まり" },
      { i: 1, root: "h-eng-gram-bunkei", why: "前置詞のついた語は M で、O ではないと知らない" },
      { i: 2, root: "j-en-2-bunkei", why: "buy・make は for を使うという使い分け" },
      { i: 3, root: "h-eng-gram-bunkei", why: "discuss は前置詞なしで O をとる動詞と知らない" },
    ],
  },
  {
    unit: "h-eng-gram-jisei",
    needs: [
      { unit: "j-en-2-mirai", why: "will・be going to の未来の表し方を整理する" },
      { unit: "j-en-1-shinkokei", why: "進行形にしない状態の動詞の区別が要る" },
      { unit: "j-en-2-setsuzokushi", why: "時・条件の節の中の時制のルールを使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-setsuzokushi", why: "if の中では未来のことも現在形という決まり" },
      { i: 1, root: "j-en-1-shinkokei", why: "状態の動詞は進行形にしない決まり" },
      { i: 2, root: "h-eng-gram-jisei", why: "名詞節の if の中では will を使うと区別していない" },
    ],
  },
  {
    unit: "h-eng-gram-kanryo",
    needs: [
      { unit: "j-en-3-kanryo", why: "中学の現在完了を土台に過去完了・未来完了へ" },
      { unit: "j-en-3-kanryo-shinko", why: "完了進行形の形と意味を使う" },
      { unit: "h-eng-gram-jisei", why: "基準になる時点をとらえる時制の考え方が要る" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-kanryo", why: "過去の時点をたずねる文は過去形という決まり" },
      { i: 1, root: "j-en-3-kanryo", why: "have been to と have gone to の区別" },
      { i: 2, root: "j-en-3-kanryo", why: "since は起点、for は期間という区別" },
    ],
  },
  {
    unit: "h-eng-gram-jodoshi",
    needs: [
      { unit: "j-en-2-jodoshi", why: "must・have to・should の基本の意味を広げる" },
      { unit: "h-eng-gram-kanryo", why: "助動詞＋have＋過去分詞の形に完了形を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-jodoshi", why: "must not と don't have to の区別" },
      { i: 1, root: "h-eng-gram-jodoshi", why: "過去への後悔は should have ＋過去分詞と知らない" },
      { i: 2, root: "j-en-2-jodoshi", why: "助動詞は2つ重ねられず、be able to を使う" },
      { i: 3, root: "h-eng-gram-jodoshi", why: "can't に「はずがない」の推量の意味があると知らない" },
    ],
  },
  {
    unit: "h-eng-gram-judo",
    needs: [
      { unit: "j-en-2-ukemi", why: "中学の受け身を時制や文型と組み合わせて広げる" },
      { unit: "h-eng-gram-bunkei", why: "SVOO・SVOC の受け身は文型の理解が要る" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-ukemi", why: "break→broken の過去分詞を覚えていない" },
      { i: 1, root: "j-en-2-ukemi", why: "by の後ろは her の形という決まり" },
      { i: 2, root: "h-eng-gram-judo", why: "感情は「させられる」側なので過去分詞と知らない" },
      { i: 3, root: "h-eng-gram-judo", why: "使役の make を受け身にすると to が出ると知らない" },
    ],
  },
  {
    unit: "h-eng-gram-futeishi",
    needs: [{ unit: "j-en-3-futeishi", why: "中学の不定詞の3用法と It is 〜 to を深める" }],
    mistakes: [
      { i: 0, root: "j-en-2-domeishi", why: "enjoy の後は -ing という使い分け" },
      { i: 1, root: "h-eng-gram-futeishi", why: "人の性質をいう形容詞では of を使うと知らない" },
      { i: 2, root: "h-eng-gram-futeishi", why: "これからすることは forget to と区別していない" },
      { i: 3, root: "j-en-2-domeishi", why: "前置詞の to の後は -ing にする決まり" },
    ],
  },
  {
    unit: "h-eng-gram-domeishi",
    needs: [
      { unit: "j-en-2-domeishi", why: "中学の動名詞の使い方を広げる" },
      { unit: "h-eng-gram-futeishi", why: "不定詞との使い分けがカギになる" },
    ],
    mistakes: [
      { i: 0, root: "j-en-2-domeishi", why: "enjoy の後は -ing という使い分け" },
      { i: 1, root: "j-en-2-domeishi", why: "前置詞の to の後は -ing にする決まり" },
      { i: 2, root: "j-en-2-domeishi", why: "前置詞 for の後は -ing にする決まり" },
      { i: 3, root: "h-eng-gram-domeishi", why: "すでにしたことは remember -ing と区別していない" },
    ],
  },
  {
    unit: "h-eng-gram-bunshi",
    needs: [
      { unit: "j-en-3-bunshi", why: "中学の分詞の後置修飾を広げる" },
      { unit: "h-eng-gram-bunkei", why: "have O 過去分詞は SVOC の文型で読む" },
    ],
    mistakes: [
      { i: 0, root: "h-eng-gram-judo", why: "感情は「させられる」側なので過去分詞" },
      { i: 1, root: "j-en-3-bunshi", why: "2語以上の説明は名詞の後ろに置く決まり" },
      { i: 2, root: "h-eng-gram-bunkei", why: "SVOC で O と C の関係（される）を見ていない" },
    ],
  },
  {
    unit: "h-eng-gram-bunshikobun",
    needs: [
      { unit: "h-eng-gram-bunshi", why: "-ing と過去分詞の使い分けをそのまま使う" },
      { unit: "h-eng-gram-setsuzokushi", why: "接続詞の節を分詞に書きかえて作る" },
    ],
    mistakes: [
      { i: 0, root: "h-eng-gram-bunshi", why: "「される」側なら過去分詞という使い分け" },
      { i: 1, root: "h-eng-gram-bunshikobun", why: "not は分詞の前に置くと知らない" },
      { i: 2, root: "h-eng-gram-bunshikobun", why: "主語がちがうときは主語を残すと知らない" },
    ],
  },
  {
    unit: "h-eng-gram-hikaku",
    needs: [{ unit: "j-en-2-hikaku", why: "中学の比較3段を土台に、いろいろな構文へ" }],
    mistakes: [
      { i: 0, root: "j-en-2-hikaku", why: "-er と more は重ねないという比較の形" },
      { i: 1, root: "h-eng-gram-hikaku", why: "比較級を強めるのは much と知らない" },
      { i: 2, root: "j-en-2-hikaku", why: "集団は in、同じ仲間の数は of という使い分け" },
      { i: 3, root: "h-eng-gram-hikaku", why: "any other の後は単数名詞と知らない" },
    ],
  },
  {
    unit: "h-eng-gram-kandai",
    needs: [{ unit: "j-en-3-kankei", why: "中学の関係代名詞を、前置詞や what へ広げる" }],
    mistakes: [
      { i: 0, root: "h-eng-gram-kandai", why: "後ろの文の「穴」が前置詞の目的語だと見ていない" },
      { i: 1, root: "h-eng-gram-kandai", why: "what は先行詞をふくむと知らない" },
      { i: 2, root: "h-eng-gram-kandai", why: "コンマの後（非制限用法）に that は使えない" },
      { i: 3, root: "h-eng-gram-kandai", why: "前置詞の後に that は置けないと知らない" },
    ],
  },
  {
    unit: "h-eng-gram-kanfuku",
    needs: [{ unit: "h-eng-gram-kandai", why: "関係副詞は「前置詞＋which」の代わりなので" }],
    mistakes: [
      { i: 0, root: "h-eng-gram-kandai", why: "後ろの文に目的語の「穴」があるか見ていない" },
      { i: 1, root: "h-eng-gram-kanfuku", why: "the way と how は並べて使えないと知らない" },
      { i: 2, root: "h-eng-gram-kanfuku", why: "欠けのない文が続くなら where と知らない" },
    ],
  },
  {
    unit: "h-eng-gram-kateiho",
    needs: [
      { unit: "j-en-3-katei", why: "中学の仮定法過去を土台に、過去完了へ広げる" },
      { unit: "h-eng-gram-kanryo", why: "仮定法過去完了は had ＋過去分詞を使う" },
      { unit: "h-eng-gram-jodoshi", why: "would have ＋過去分詞の形を使う" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-katei", why: "現実とちがう今は were を使うという決まり" },
      { i: 1, root: "h-eng-gram-kateiho", why: "過去の仮定は would have ＋過去分詞と知らない" },
      { i: 2, root: "j-en-3-katei", why: "I wish の後も過去の形にずらす決まり" },
      { i: 3, root: "h-eng-gram-kanryo", why: "過去完了 had ＋過去分詞の形がつかめていない" },
    ],
  },
  {
    unit: "h-eng-gram-meishi",
    needs: [{ unit: "j-en-1-meishi", why: "数えられる名詞・a / an の基本を広げる" }],
    mistakes: [
      { i: 0, root: "j-en-1-meishi", why: "数えられない名詞に -s はつけないという区別" },
      { i: 1, root: "j-en-1-meishi", why: "数えられない名詞に a はつけないという区別" },
      { i: 2, root: "h-eng-gram-meishi", why: "by bus や go to school は無冠詞と知らない" },
      { i: 3, root: "j-en-1-meishi", why: "an にするかは最初の音で決まるという決まり" },
    ],
  },
  {
    unit: "h-eng-gram-daimeishi",
    needs: [{ unit: "j-en-1-daimeishi", why: "I・my・me・mine の変化を土台に広げる" }],
    mistakes: [
      { i: 0, root: "j-en-1-daimeishi", why: "「私のもの」は mine という形" },
      { i: 1, root: "h-eng-gram-daimeishi", why: "同じ種類の別の物は one と知らない" },
      { i: 2, root: "h-eng-gram-daimeishi", why: "2つのうち残りは the other と知らない" },
      { i: 3, root: "h-eng-gram-daimeishi", why: "enjoy は目的語に oneself が要ると知らない" },
    ],
  },
  {
    unit: "h-eng-gram-keiyoshi",
    needs: [
      { unit: "j-en-3-tango", why: "形容詞と副詞の使い分けを中学で学んでいる" },
      { unit: "h-eng-gram-meishi", why: "a few / a little は名詞の数え方で決まる" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-tango", why: "動詞を説明するのは副詞 well という使い分け" },
      { i: 1, root: "h-eng-gram-meishi", why: "friends は数えられる名詞だと見分けていない" },
      { i: 2, root: "h-eng-gram-keiyoshi", why: "-thing は形容詞を後ろに置くと知らない" },
      { i: 3, root: "h-eng-gram-keiyoshi", why: "hardly は「ほとんど〜ない」と知らない" },
    ],
  },
  {
    unit: "h-eng-gram-zenchishi",
    needs: [
      { unit: "e-english-56-ichi", why: "in・on・under の位置のイメージが土台になる" },
      { unit: "j-en-2-domeishi", why: "前置詞の後は名詞か -ing という決まりを使う" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-kyoka", why: "日・曜日の前は on という決まり" },
      { i: 1, root: "h-eng-gram-zenchishi", why: "期限は by、継続は until と区別していない" },
      { i: 2, root: "j-en-2-domeishi", why: "前置詞の後は -ing にする決まり" },
      { i: 3, root: "h-eng-gram-zenchishi", why: "前置詞の後は名詞、文なら接続詞と知らない" },
    ],
  },
  {
    unit: "h-eng-gram-setsuzokushi",
    needs: [{ unit: "j-en-2-setsuzokushi", why: "when・if・because の使い方を土台に広げる" }],
    mistakes: [
      { i: 0, root: "j-en-2-setsuzokushi", why: "接続詞は2つ重ねないという決まり" },
      { i: 1, root: "h-eng-gram-setsuzokushi", why: "both A and B は複数あつかいと知らない" },
      { i: 2, root: "j-en-2-setsuzokushi", why: "時の節の中は未来でも現在形という決まり" },
      { i: 3, root: "h-eng-gram-setsuzokushi", why: "during は前置詞で、文は続かないと知らない" },
    ],
  },
  {
    unit: "h-eng-gram-waho",
    needs: [
      { unit: "j-en-3-kansetsu", why: "疑問文を伝え直すときは間接疑問の語順になる" },
      { unit: "j-en-3-futeishi", why: "命令は tell 人 to ＋原形で伝え直す" },
      { unit: "h-eng-gram-jisei", why: "伝える時点に合わせて時制をずらす" },
    ],
    mistakes: [
      { i: 0, root: "h-eng-gram-waho", why: "人に言うなら told me で、said me は不可と知らない" },
      { i: 1, root: "j-en-3-kansetsu", why: "文の中の疑問は「主語＋動詞」の語順という決まり" },
      { i: 2, root: "j-en-3-futeishi", why: "tell 人 not to ＋原形の形" },
      { i: 3, root: "h-eng-gram-waho", why: "時制の一致で will が would になると知らない" },
    ],
  },
  {
    unit: "h-eng-gram-tokushu",
    needs: [
      { unit: "j-en-1-gimonshi", why: "倒置は疑問文の語順と同じ形になる" },
      { unit: "h-eng-gram-kandai", why: "強調構文 It is 〜 that と関係詞を見分ける" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-gimonshi", why: "疑問文の語順（have I）を作れていない" },
      { i: 1, root: "j-en-1-ippan", why: "does を前に出す疑問文の形" },
      { i: 2, root: "h-eng-gram-tokushu", why: "all 〜 not は部分否定になると知らない" },
      { i: 3, root: "h-eng-gram-tokushu", why: "強調構文はいつも that を使うと知らない" },
    ],
  },

  // ───── 高校：技能 ─────
  {
    unit: "h-eng-skill-chobun",
    needs: [
      { unit: "j-en-3-chobun", why: "段落の要点とつなぎの語で読む方法を土台にする" },
      { unit: "h-eng-vocab-2000", why: "高校の長文に出る語彙が要る" },
      { unit: "h-eng-gram-kandai", why: "長い名詞のまとまりを読みとく文法が要る" },
    ],
    mistakes: [
      { i: 0, root: "j-en-3-chobun", why: "前後の文から意味を推測して読み進める力" },
      { i: 1, root: "h-eng-skill-chobun", why: "同じ語より同じ意味かで選ぶと知らない" },
      { i: 2, root: "h-eng-skill-chobun", why: "However の後に筆者の主張が来ると知らない" },
      { i: 3, root: "j-ja-1-monogatari", why: "行動やせりふから心情を読む力は国語と同じ" },
    ],
  },
  {
    unit: "h-eng-skill-wabun",
    needs: [
      { unit: "j-en-3-eisakubun", why: "書ける英語に言いかえる中学の英作文を土台にする" },
      { unit: "h-eng-gram-bunkei", why: "主語と動詞を決め、文型にあてはめて書く" },
    ],
    mistakes: [
      { i: 0, root: "e-english-56-chumon", why: "注文は I'd like 〜. と言う表現" },
      { i: 1, root: "h-eng-skill-wabun", why: "日本語の主語をそのまま英語の主語にしている" },
      { i: 2, root: "h-eng-skill-wabun", why: "使い方を知っている表現に言いかえていない" },
      { i: 3, root: "h-eng-skill-wabun", why: "日本独自の物には説明を添えると知らない" },
    ],
  },
  {
    unit: "h-eng-skill-jiyu",
    needs: [
      { unit: "j-en-3-eisakubun", why: "意見→理由→まとめの型を土台にする" },
      { unit: "j-ja-2-ikenbun", why: "主張と根拠で組み立てる意見文の型は国語と同じ" },
    ],
    mistakes: [
      { i: 0, root: "h-eng-skill-jiyu", why: "立場は1つにしぼって書くと知らない" },
      { i: 1, root: "j-ja-2-ikenbun", why: "根拠をしぼって具体的に示す組み立て方" },
      { i: 2, root: "j-en-2-eisakubun", why: "because は1つの文の中でつなぐ語" },
    ],
  },
  {
    unit: "h-eng-skill-listening",
    needs: [
      { unit: "j-en-3-listening", why: "質問の先読みと変更を聞く力を土台にする" },
      { unit: "h-eng-vocab-hatsuon", why: "音のつながりや強く読む所がわかると聞きとれる" },
    ],
    mistakes: [
      { i: 0, root: "j-en-1-listening", why: "答えに関わる語だけを拾う聞き方" },
      { i: 1, root: "e-english-34-kazu", why: "-teen と -ty で強く言う場所がちがう" },
      { i: 2, root: "j-en-3-listening", why: "but のあとの変更まで聞く力" },
    ],
  },
  {
    unit: "h-eng-skill-speaking",
    needs: [
      { unit: "h-eng-vocab-kaiwa", why: "場面に合う会話表現を使ってやり取りする" },
      { unit: "j-en-3-eisakubun", why: "意見→理由→まとめの型で発表を組み立てる" },
    ],
    mistakes: [
      { i: 0, root: "h-eng-skill-speaking", why: "「答え＋1文」で話を広げると知らない" },
      { i: 1, root: "j-en-3-eisakubun", why: "最初に意見を言う型が身についていない" },
      { i: 2, root: "h-eng-skill-speaking", why: "つなぎの言葉と言いかえの方法を知らない" },
    ],
  },
];
