// 共通テスト型「英語リーディング」の大問 (試験モードだけで使う)。本文・場面・人名・店名・数字はすべてオリジナル
// (この試験モードのために書いた架空の町・人物・店。教科書・過去問・市販教材・ニュース記事の文は使っていない)。
//   r1 短い掲示・案内 (2問×4)／r2 事実と意見 (4問×3)／r3 物語・体験 (3問×3)／
//   r4 複数の資料 (4問×3)／r5 長めの物語文 (4問×3)／r6 説明文・論説文 (5問×3)
// 令和7年度からの8題の形では、r1〜r6 を 第1・2・3・5・6・7問に使う (第4問 r4w・第8問 r8 は eng-reading-2.ts)。
// 時刻・値段・人数・表の数の計算は、本文・表と手で照合し、steps に計算を書いてある。
import type { ExamPoolSection } from "./types";

const U = "h-eng-skill-chobun";

// =====================================================================
// r1 短い掲示・案内
// =====================================================================

const R1: ExamPoolSection[] = [
  {
    unit: U,
    tag: "r1",
    section: {
      id: "xr-r1-lounge-cafe",
      title: "留学生向けの掲示",
      lead: "次の英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Language Exchange Café — Join Us Every Thursday!",
          body: `Want to practice Japanese and make new friends? The International Student Lounge holds a Language Exchange Café every Thursday from 4:30 p.m. to 6:00 p.m. in Room 204. For the first 45 minutes, we talk only in Japanese. After a short break, we switch to English for the rest of the time. Drinks are free, but please bring your own cup. No sign-up is needed — just come along! This month, the café will be closed on November 23 because of the school festival. If you have any questions, please email the lounge staff at the address on our website.`,
          notes: [
            { word: "lounge", meaning: "談話室・ラウンジ" },
            { word: "sign-up", meaning: "参加の申しこみ・登録" },
            { word: "come along", meaning: "（気軽に）来る" },
          ],
        },
      ],
      questions: [
        {
          id: "no-signup",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "掲示の内容に合うものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Students can join the café without registering in advance.",
              "The café is held twice a week in Room 204.",
              "Participants have to pay a small fee for drinks.",
              "The café will be open as usual on November 23.",
            ],
            correct: 0,
            why: [
              "No sign-up is needed（申しこみ不要）の言いかえ。sign-up → registering in advance。",
              "開かれるのは every Thursday（毎週木曜）で、週1回。",
              "Drinks are free とあり、飲み物は無料。持ってくるのはカップ。",
              "11月23日は学園祭のため closed（休み）。",
            ],
          },
          point: "掲示は「言いかえ」で正解が作られる",
          steps: [
            { title: "選択肢の語を本文で探す", body: "registering は本文の {{sign-up}}、fee は {{free}} の部分と照らします。" },
            { title: "一致を確かめる", body: "{{No sign-up is needed}} ＝ 事前の登録なしで参加できる。これだけが本文と合います。" },
          ],
        },
        {
          id: "japanese-ends",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 75,
          skill: "思考・判断・表現",
          prompt: "掲示によると、カフェで日本語だけを話す時間が終わるのは何時か。",
          answer: {
            kind: "choice",
            options: ["4:45 p.m.", "5:15 p.m.", "5:30 p.m.", "6:00 p.m."],
            correct: 1,
            why: [
              "開始から15分後。日本語の時間は45分なので早すぎる。",
              "4:30 p.m. に始まり、最初の45分が日本語なので 4:30＋45分＝5:15 p.m.。",
              "開始から60分後。45分ではない。",
              "6:00 p.m. はカフェ全体が終わる時刻。",
            ],
          },
          point: "開始時刻＋時間の長さで終わりの時刻を出す",
          steps: [
            { title: "必要な2つの情報", body: "開始は {{4:30 p.m.}}、日本語の時間は {{the first 45 minutes}}。" },
            { title: "計算する", body: "4:30 ＋ 45分 ＝ {{5:15 p.m.}}。そのあと休けいをはさんで英語の時間になります。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r1",
    section: {
      id: "xr-r1-reading-challenge",
      title: "図書館のちらし",
      lead: "次の英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Summer Reading Challenge at Maple Hill Library",
          body: `From July 20 to August 31, readers aged 12 to 18 can take part in our Summer Reading Challenge. First, pick up a reading card at the front desk. Each time you finish a book, write its title on your card and get a stamp from the library staff. Collect five stamps to receive a free bookmark, and collect ten stamps to enter a prize draw for a $30 bookstore gift card. Comics and magazines do not count, but audiobooks do. Winners will be announced on September 5 on the library's notice board.`,
          notes: [
            { word: "prize draw", meaning: "賞品の抽選" },
            { word: "gift card", meaning: "商品券・ギフトカード" },
            { word: "audiobook(s)", meaning: "朗読を録音した本" },
          ],
        },
      ],
      questions: [
        {
          id: "after-book",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "ちらしによると、本を1冊読み終えたら参加者は何をするか。",
          answer: {
            kind: "choice",
            options: [
              "Write the book's title on the card and have it stamped.",
              "Return the reading card to the front desk.",
              "Post a short review on the notice board.",
              "Choose a free bookmark from the staff.",
            ],
            correct: 0,
            why: [
              "write its title on your card and get a stamp の言いかえ（get a stamp → have it stamped）。",
              "カードは受付で受け取るもので、読み終えるたびに返すとは書いていない。",
              "掲示板は当選者の発表に使う。感想を書くとは書いていない。",
              "しおりはスタンプを5つ集めたらもらえるもので、1冊ごとではない。",
            ],
          },
          point: "Each time … のあとが「するたびにすること」",
          steps: [
            { title: "根拠の文", body: "{{Each time you finish a book}}, write its title on your card and get a stamp。" },
            { title: "言いかえ", body: "get a stamp ＝ {{have it stamped}}。書名を書き、スタンプを押してもらいます。" },
          ],
        },
        {
          id: "seven-stamps",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "15歳の生徒が期間中に小説を4冊、オーディオブックを3冊、マンガを2冊読み終えた。ちらしによると、この生徒について正しいものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "The student can get a bookmark but cannot enter the prize draw.",
              "The student can enter the prize draw for the gift card.",
              "The student gets nothing because audiobooks do not count.",
              "The student receives a $30 gift card without a draw.",
            ],
            correct: 0,
            why: [
              "数えるのは小説4＋オーディオブック3＝7冊（マンガは数えない）。5以上10未満なので、しおりだけ。",
              "抽選に応募するにはスタンプ10個が必要。7個では足りない。",
              "but audiobooks do（オーディオブックは数える）とある。数えないのはマンガと雑誌。",
              "商品券は抽選（prize draw）で当たるもので、全員がもらえるのではない。",
            ],
          },
          point: "数えるもの・数えないものを分けてから足す",
          steps: [
            { title: "数える本を分ける", body: "{{Comics and magazines do not count, but audiobooks do}}。マンガ2冊は数えません。" },
            { title: "計算する", body: "小説4 ＋ オーディオブック3 ＝ {{7}}個のスタンプ。" },
            { title: "条件と照らす", body: "5個でしおり、10個で抽選。7個は {{5以上10未満}} なので、しおりだけもらえます。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r1",
    section: {
      id: "xr-r1-cleanup-post",
      title: "清掃ボランティアの SNS 投稿",
      lead: "次の英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Posted by Hana_K",
          body: `Thanks to everyone who joined the beach clean-up last Sunday! Forty-two volunteers collected 37 bags of trash in just two hours. Plastic bottles were the most common item, followed by pieces of fishing line. Our next clean-up will be at Riverside Park on Saturday, June 14, starting at 9 a.m. We'll provide gloves and bags, but please wear a hat and bring water — it gets hot by noon! If it rains, we'll move the event to the following Saturday. Please reply to this post if you can come, so I know how many gloves to prepare.`,
          notes: [
            { word: "clean-up", meaning: "清掃活動" },
            { word: "fishing line", meaning: "釣り糸" },
            { word: "provide", meaning: "用意する・提供する" },
          ],
        },
      ],
      questions: [
        {
          id: "most-common",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "投稿によると、前回の清掃でいちばん多く集まったごみは何か。",
          answer: {
            kind: "choice",
            options: ["Plastic bottles", "Pieces of fishing line", "Paper bags", "Old gloves"],
            correct: 0,
            why: [
              "Plastic bottles were the most common item とある。",
              "followed by（それに続いて）とあり、2番目に多かったもの。",
              "紙袋がごみとして集まったとは書いていない。",
              "手袋は次回、主催者が用意する（provide）もの。",
            ],
          },
          point: "followed by は「その次に」。1位と2位を分ける",
          steps: [
            { title: "最上級をさがす", body: "{{the most common item}} の主語が1位。Plastic bottles です。" },
            { title: "2位とまぎれない", body: "{{followed by}} fishing line は「その次」。1位ではありません。" },
          ],
        },
        {
          id: "rain-date",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 75,
          skill: "思考・判断・表現",
          prompt: "6月14日が雨だった場合、次の清掃はいつ行われるか。",
          answer: {
            kind: "choice",
            options: ["Sunday, June 15", "Saturday, June 21", "Saturday, June 28", "It will be canceled."],
            correct: 1,
            why: [
              "翌日の日曜ではなく、the following Saturday（次の土曜）に移る。",
              "6月14日（土）の次の土曜は 14＋7＝21日。",
              "2週間後の土曜。1週間後ではない。",
              "中止ではなく move the event（日を移す）と書いてある。",
            ],
          },
          point: "the following Saturday は「次の土曜」＝7日後",
          steps: [
            { title: "雨の日の決まり", body: "If it rains, we'll {{move the event to the following Saturday}}。中止ではありません。" },
            { title: "日付を計算", body: "6月14日は土曜。次の土曜は 14 ＋ 7 ＝ {{6月21日}}。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r1",
    section: {
      id: "xr-r1-bike-rental",
      title: "レンタサイクルの料金案内",
      lead: "次の英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Greenway Bike Rental — Spring Prices",
          body: `Explore the lakeside path by bike! Standard bikes cost $8 for the first hour and $5 for each additional hour. Electric bikes are $15 per hour. Helmets are free for all riders, and riders under 16 must wear one. Groups of four or more people get 10% off the total price. We are open from 9 a.m. to 5 p.m., and all bikes must be returned by closing time. Please show a photo ID when you rent a bike. Children under 10 must ride with an adult.`,
          notes: [
            { word: "additional", meaning: "追加の" },
            { word: "closing time", meaning: "閉店時刻" },
            { word: "photo ID", meaning: "写真つきの身分証明書" },
          ],
        },
      ],
      questions: [
        {
          id: "helmet",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "案内の内容に合うものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Riders can use a helmet at no extra charge.",
              "Electric bikes are cheaper than standard bikes.",
              "Bikes may be returned the next morning.",
              "Every rider must be at least 16 years old.",
            ],
            correct: 0,
            why: [
              "Helmets are free for all riders の言いかえ（free → at no extra charge）。",
              "電動自転車は1時間 $15 で、普通の自転車（最初の1時間 $8）より高い。",
              "閉店時刻（5 p.m.）までに返す決まり。",
              "16歳未満はヘルメットが必要というだけで、乗れないとは書いていない。",
            ],
          },
          point: "free ＝ at no extra charge の言いかえを見ぬく",
          steps: [
            { title: "根拠の文", body: "{{Helmets are free for all riders}}。全員、無料で使えます。" },
            { title: "ほかの選択肢", body: "16歳未満は {{must wear one}}（かぶる義務）であって、年齢制限ではありません。" },
          ],
        },
        {
          id: "two-riders",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "大人2人が普通の自転車（standard bikes）をそれぞれ3時間借りた。料金の合計はいくらか。",
          answer: {
            kind: "choice",
            options: ["$18", "$32.40", "$36", "$48"],
            correct: 2,
            why: [
              "1人分（8＋5＋5＝18）だけの料金。2人なので2倍にする。",
              "36ドルを1割引きした額。割引は4人以上のグループだけで、2人には使えない。",
              "1人 $8＋$5＋$5＝$18。2人で 18×2＝$36。",
              "3時間とも $8 で計算している（8×3×2）。2時間目からは $5。",
            ],
          },
          point: "最初の1時間と追加の時間で料金がちがう",
          steps: [
            { title: "1人分", body: "最初の1時間 $8 ＋ 追加2時間 $5×2 ＝ {{$18}}。" },
            { title: "2人分", body: "$18 × 2 ＝ {{$36}}。" },
            { title: "割引の条件", body: "10% off は {{Groups of four or more}}。2人なので割引はありません。" },
          ],
        },
      ],
    },
  },
];

// =====================================================================
// r2 事実と意見の区別
// =====================================================================

const R2: ExamPoolSection[] = [
  {
    unit: U,
    tag: "r2",
    section: {
      id: "xr-r2-lantern-review",
      title: "キャンプ用品のレビュー",
      lead: "あなたはキャンプ用ランタンを買おうと考え、インターネットでレビューを読んでいる。次の英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Review: TrailGlow 300 Camping Lantern",
          body: `I bought the TrailGlow 300 last month before a three-night camping trip with my family, and I have now used it on two trips. Here is my honest review.

First, the basic facts. The lantern weighs 410 grams and has three brightness levels. On the highest level, the box says the battery lasts about 6 hours; on the lowest level, it lasts about 30 hours. It can be charged with a USB cable, and a full charge takes around four hours. It costs 45 dollars, which is about 10 dollars more than most lanterns of a similar size.

On our first trip, I used the lantern every evening on the middle level for about three hours, and I did not need to charge it until the last morning. I think the battery life is the best thing about this product. The light is soft and warm, and in my opinion it is much more pleasant than the cold, blue light of my old lantern.

However, there are some weak points. The hook on the top is made of thin plastic, and it bent slightly when I hung the lantern from a tree branch. It still works, but I worry that it will break someday. Also, the on/off button is small, so it is hard to press when you are wearing gloves.

Overall, I would recommend the TrailGlow 300 to families who camp in the warmer seasons. If you often camp in winter, though, you may want to look for a lantern with a larger button. For me, the extra 10 dollars was worth it, and I am planning to take it on our next trip in August.`,
          notes: [
            { word: "brightness level(s)", meaning: "明るさの段階" },
            { word: "charge", meaning: "充電する" },
            { word: "hook", meaning: "（つり下げる）フック" },
          ],
        },
      ],
      questions: [
        {
          id: "first-trip",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "知識・技能",
          prompt: "レビューによると、最初の旅行で筆者はランタンをどのように使ったか。",
          answer: {
            kind: "choice",
            options: [
              "On the middle level for about three hours each evening.",
              "On the highest level for about six hours each night.",
              "On the lowest level all night long.",
              "Only on the last morning of the trip.",
            ],
            correct: 0,
            why: [
              "I used the lantern every evening on the middle level for about three hours とある。",
              "6時間は箱に書かれた「最高レベルでの電池のもち」。筆者の使い方ではない。",
              "最低レベルで一晩じゅう使ったとは書いていない。",
              "最後の朝は「充電した」とき。使ったのは毎晩。",
            ],
          },
          point: "数字が「何についての数か」を確かめる",
          steps: [
            { title: "場所をしぼる", body: "On our first trip で始まる第3段落を見ます。{{middle level}}・{{about three hours}}。" },
            { title: "数字のひっかけ", body: "6 hours・30 hours は {{the box says}}（箱の表示）で、筆者の使い方ではありません。" },
          ],
        },
        {
          id: "fact",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "レビューの中で、意見（opinion）ではなく事実（fact）として述べられているものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "The lantern can be fully charged in about four hours.",
              "The battery life is the best thing about the lantern.",
              "Its light is more pleasant than blue light.",
              "The lantern is worth the extra 10 dollars.",
            ],
            correct: 0,
            why: [
              "a full charge takes around four hours。「the basic facts」の段落にあり、確かめられる事実。",
              "I think … the best thing と、筆者の評価（意見）。",
              "in my opinion … more pleasant とあり、感じ方の意見。",
              "For me, … was worth it。値打ちがあるかは人によってちがう意見。",
            ],
          },
          point: "I think / in my opinion / worth は意見の目印",
          steps: [
            { title: "事実と意見の見分け方", body: "{{事実}}は重さ・時間・値段のように確かめられること。{{意見}}は best・pleasant・worth など人によって分かれる評価です。" },
            { title: "目印の語", body: "{{I think}}・{{in my opinion}}・{{For me}} がついた文は意見。残るのは充電時間の文です。" },
          ],
        },
        {
          id: "weak-point",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 75,
          skill: "思考・判断・表現",
          prompt: "筆者がこのランタンについて心配していることはどれか。",
          answer: {
            kind: "choice",
            options: [
              "The hook might break in the future.",
              "The battery might run out on the first night.",
              "The light might be too bright for children.",
              "The lantern might be too heavy to carry.",
            ],
            correct: 0,
            why: [
              "The hook … bent slightly … I worry that it will break someday の言いかえ。",
              "電池は最後の朝まで充電の必要がなく、むしろ長所としている。",
              "光が明るすぎるとは書いていない。soft and warm とほめている。",
              "410グラムという重さは書いてあるが、重すぎるとは言っていない。",
            ],
          },
          point: "worry のあとに「心配の中身」が来る",
          steps: [
            { title: "合図の語", body: "However, there are some {{weak points}} から短所の段落。" },
            { title: "心配の中身", body: "{{I worry that it will break someday}}。it はフックのこと。break someday ＝ might break in the future。" },
          ],
        },
        {
          id: "who-recommend",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "筆者がこのランタンを最もすすめそうな人はだれか。",
          answer: {
            kind: "choice",
            options: [
              "A family that mostly camps in summer and does not mind paying a little more.",
              "A climber who often camps in the snow wearing thick gloves.",
              "A student who wants the cheapest lantern available.",
              "A person who needs a lantern that can hang safely from heavy branches every day.",
            ],
            correct: 0,
            why: [
              "families who camp in the warmer seasons にすすめ、10ドル高くても worth it と言っている。",
              "冬・手袋ではボタンが押しにくいので、別のランタンを探すようすすめている。",
              "似た大きさの多くのランタンより約10ドル高く、いちばん安いものではない。",
              "フックは細いプラスチックで曲がったと書いており、毎日つるす人には向かない。",
            ],
          },
          point: "長所・短所・値段の3つを人物の条件と照らす",
          steps: [
            { title: "すすめる相手", body: "{{families who camp in the warmer seasons}}。冬に使う人には別のものをすすめています。" },
            { title: "値段", body: "ほかより {{about 10 dollars more}} だが、筆者は worth it。少し高くても気にしない人に合います。" },
            { title: "短所と照らす", body: "手袋（ボタンが小さい）・フック（曲がった）の条件がある人は×。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r2",
    section: {
      id: "xr-r2-phone-free-lunch",
      title: "高校生のブログ",
      lead: "次の英文は、ある高校生がブログに書いた文章である。英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Our Phone-Free Lunch Experiment",
          body: `Last September, the student council at our school started a six-week trial called "Phone-Free Lunch." During lunchtime, students put their phones in a box at the front of the classroom and took them back when the bell rang at 1:05 p.m. Joining was not required, and each class decided by a vote. In the end, 14 of the 18 classes took part.

At the end of the trial, the council asked all participating students to answer a short survey. About 420 students answered. Sixty-one percent said they talked more with classmates during lunch, and 23 percent said they felt nervous without their phones at first. Only 9 percent said they wanted to stop the trial early.

I was one of the students who felt nervous. For the first week, I kept reaching into my pocket for a phone that was not there. By the third week, however, I was having long conversations with a classmate I had hardly spoken to before. We found out that we both love old science fiction films. Honestly, I think that friendship is the best thing that happened to me this year.

Some students had a different view. A member of the soccer team told me that he uses lunchtime to check messages from his coach, and the trial made that difficult. I understand his point, and I believe the council should allow exceptions for students who really need their phones.

The council will decide next month whether to continue the program. In my view, it should continue, but with more flexible rules. A good idea might be to make one or two days a week phone-free instead of every day.`,
          notes: [
            { word: "student council", meaning: "生徒会" },
            { word: "trial", meaning: "試し・試行" },
            { word: "exception(s)", meaning: "例外" },
            { word: "flexible", meaning: "柔軟な・ゆるやかな" },
          ],
        },
      ],
      questions: [
        {
          id: "classes",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "知識・技能",
          prompt: "試行への参加について、本文の内容に合うものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Fourteen classes chose to take part after a vote.",
              "Every class at the school had to take part.",
              "Eighteen classes voted against the trial.",
              "Only the student council members took part.",
            ],
            correct: 0,
            why: [
              "each class decided by a vote … 14 of the 18 classes took part の言いかえ。",
              "Joining was not required（参加は義務ではない）とある。",
              "18は学校のクラスの総数。反対したのは 18−14＝4クラス。",
              "参加したのはクラス単位で、生徒会だけではない。",
            ],
          },
          point: "14 of the 18 は「18のうち14」",
          steps: [
            { title: "根拠の文", body: "{{each class decided by a vote}}、{{14 of the 18 classes took part}}。" },
            { title: "数の意味", body: "18 は全クラス数、14 が参加したクラス数。参加しなかったのは {{4}}クラスです。" },
          ],
        },
        {
          id: "opinion",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "本文の中で、事実（fact）ではなく筆者の意見（opinion）はどれか。",
          answer: {
            kind: "choice",
            options: [
              "The council should let students who really need their phones use them.",
              "The trial lasted for six weeks.",
              "About 420 students answered the survey.",
              "Sixty-one percent of those who answered said they talked more with classmates.",
            ],
            correct: 0,
            why: [
              "I believe the council should allow exceptions … の言いかえで、筆者の意見。",
              "a six-week trial とあり、確かめられる事実。",
              "アンケートの回答数で、事実。",
              "アンケートの結果の数字で、事実。",
            ],
          },
          point: "I believe … should は意見。数字・期間は事実",
          steps: [
            { title: "意見の目印", body: "{{I believe}}・{{should}}・{{In my view}} は、筆者の考えを示す言い方です。" },
            { title: "事実の目印", body: "期間・人数・割合は、記録で確かめられる{{事実}}。残る1つが意見です。" },
          ],
        },
        {
          id: "survey",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "アンケートの結果について、本文の内容に合うものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "More than half of the students who answered said they talked more with classmates.",
              "About a quarter of the students wanted to stop the trial early.",
              "Most of the students felt nervous without their phones.",
              "Fewer than one in ten students said they talked more with classmates.",
            ],
            correct: 0,
            why: [
              "61% は半分（50%）より多い。",
              "早くやめたかったのは 9%。4分の1（25%）ではない。23% は「不安だった」人。",
              "不安だったのは 23% で、大部分（most）ではない。",
              "1割未満なのは「やめたかった」9%。会話が増えたのは 61%。",
            ],
          },
          point: "割合はどの質問の答えかをセットで読む",
          steps: [
            { title: "3つの割合", body: "会話が増えた {{61%}}・最初は不安 {{23%}}・早くやめたい {{9%}}。" },
            { title: "言いかえと照らす", body: "61% ＝ {{more than half}}。a quarter（25%）や most は数と合いません。" },
          ],
        },
        {
          id: "proposal",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "筆者が生徒会に提案していることに最も近いものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Keep the program, but make only some days phone-free and allow exceptions.",
              "End the program because some students disagreed with it.",
              "Continue the program every day with no exceptions.",
              "Let each student decide every day without any rules.",
            ],
            correct: 0,
            why: [
              "it should continue, but with more flexible rules／one or two days a week／allow exceptions をまとめたもの。",
              "筆者は continue（続ける）べきだと言っている。",
              "筆者は例外を認めるべき、毎日ではなく週1〜2日と言っている。",
              "ルールをなくすのではなく、ゆるやかなルールにする提案。",
            ],
          },
          point: "主張は複数の段落にちらばる。全部まとめる",
          steps: [
            { title: "④段落", body: "{{allow exceptions}}：本当に必要な生徒には例外を。" },
            { title: "⑤段落", body: "{{it should continue}}、ただし {{one or two days a week}}。" },
            { title: "まとめる", body: "続ける＋一部の日だけ＋例外あり。3つがそろう選択肢を選びます。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r2",
    section: {
      id: "xr-r2-festival-dishes",
      title: "地域新聞への投書",
      lead: "次の英文は、地域新聞に高校生が投書した文章である。英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Letter to the Editor: Let's Wash Our Festival Dishes",
          body: `Every August, about 8,000 people visit the Riverton Summer Festival. Food stalls are one of its main attractions, but they also create a huge amount of waste. According to the town's cleaning office, last year's festival produced 1.6 tons of garbage, and more than half of it was paper plates, plastic cups, and wooden chopsticks.

I am a high school student, and I volunteered on the festival's cleaning team last summer. I was shocked by the mountains of plates we carried to the trucks. I believe our festival can do much better.

My suggestion is simple: the festival should use reusable dishes. Visitors would pay a deposit of one dollar for each dish and get the money back when they return it to a washing station. A town about 50 kilometers away, Elmford, started this system three years ago. Their festival committee reports that the amount of garbage fell by 40 percent in the first year.

Of course, there are challenges. Washing stations need water, space, and volunteers. Some stall owners may also worry that the deposit will make customers buy less food. These worries are reasonable, but I think they can be solved. For example, high school clubs could run the washing stations as a volunteer activity, and the festival could test the system at just a few stalls in the first year.

A festival is a place where the whole town comes together. In my opinion, it should also be a place where we show how much we care about our town. Using reusable dishes would be a small but meaningful step.`,
          notes: [
            { word: "stall(s)", meaning: "屋台" },
            { word: "reusable", meaning: "くり返し使える" },
            { word: "deposit", meaning: "預かり金（返すと戻るお金）" },
          ],
        },
      ],
      questions: [
        {
          id: "volunteer",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "筆者は去年の祭りで何をしたか。",
          answer: {
            kind: "choice",
            options: [
              "The writer worked as a volunteer cleaning up after the festival.",
              "The writer ran a food stall with a school club.",
              "The writer ran a washing station for reusable dishes.",
              "The writer visited Elmford's festival to study its system.",
            ],
            correct: 0,
            why: [
              "I volunteered on the festival's cleaning team last summer の言いかえ。",
              "屋台を出したとは書いていない。",
              "洗い場は筆者の提案で、去年はまだない。",
              "Elmford の祭りに行ったとは書いていない。報告を紹介しているだけ。",
            ],
          },
          point: "過去の体験と、これからの提案を分ける",
          steps: [
            { title: "根拠の文", body: "{{I volunteered on the festival's cleaning team last summer}}。" },
            { title: "提案とまぜない", body: "洗い場（washing stations）は{{これからの提案}}。去年したことではありません。" },
          ],
        },
        {
          id: "fact",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "投書の中で、意見（opinion）ではなく事実（fact）として述べられているものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Elmford's festival committee reported a 40 percent drop in garbage in the first year.",
              "The festival should be a place where people show they care about the town.",
              "The stall owners' worries can be solved.",
              "Reusable dishes would be a meaningful step for the festival.",
            ],
            correct: 0,
            why: [
              "Their festival committee reports that … fell by 40 percent。報告として確かめられる事実。",
              "In my opinion, it should … とあり、筆者の意見。",
              "I think they can be solved。筆者の考え（意見）。",
              "would be a small but meaningful step は筆者の評価（意見）。",
            ],
          },
          point: "reports that … は事実、I think / should は意見",
          steps: [
            { title: "事実の目印", body: "{{According to …}}・{{reports that …}} は、記録や報告で確かめられる内容を示します。" },
            { title: "意見の目印", body: "{{In my opinion}}・{{I think}}・should・meaningful は筆者の考えや評価です。" },
          ],
        },
        {
          id: "deposit",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 75,
          skill: "思考・判断・表現",
          prompt: "筆者が提案する皿の使い方の説明として正しいものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Visitors pay one dollar per dish and get it back when they return the dish.",
              "Visitors bring their own dishes from home.",
              "Visitors pay one dollar to use the washing station.",
              "Visitors buy the dishes and take them home as souvenirs.",
            ],
            correct: 0,
            why: [
              "pay a deposit of one dollar for each dish and get the money back when they return it の言いかえ。",
              "家から皿を持ってくるとは書いていない。",
              "1ドルは皿ごとの預かり金。洗い場の利用料ではない。",
              "皿は返すもの。持ち帰るとお金は戻らない。",
            ],
          },
          point: "deposit は「返すと戻ってくるお金」",
          steps: [
            { title: "しくみ", body: "皿1枚ごとに {{deposit of one dollar}} を払い、洗い場に返すと {{get the money back}}。" },
          ],
        },
        {
          id: "solution",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "心配される点への対策として、筆者が挙げていることはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Having school clubs wash dishes and trying the system at a small number of stalls first.",
              "Raising the deposit so that more visitors return their dishes.",
              "Asking every visitor to bring water for the washing stations.",
              "Reducing the number of food stalls to make less waste.",
            ],
            correct: 0,
            why: [
              "high school clubs could run the washing stations／test the system at just a few stalls in the first year の言いかえ。",
              "預かり金を上げるとは言っていない。むしろ屋台は預かり金で売り上げが減るのを心配している。",
              "水が必要とは書いてあるが、来場者に持ってこさせるとは言っていない。",
              "屋台を減らす提案はしていない。",
            ],
          },
          point: "For example の後ろが具体的な対策",
          steps: [
            { title: "心配", body: "洗い場に {{water, space, and volunteers}} が要る／屋台の店主は売り上げを心配。" },
            { title: "対策", body: "{{For example}}, 高校の部活が洗い場を担当し、1年目は {{just a few stalls}} で試す。" },
          ],
        },
      ],
    },
  },
];

// =====================================================================
// r3 物語・体験
// =====================================================================

const R3: ExamPoolSection[] = [
  {
    unit: U,
    tag: "r3",
    section: {
      id: "xr-r3-homestay-curry",
      title: "ホームステイの体験記",
      lead: "次の英文は、ホームステイをした高校生が学校の英語新聞に書いた体験記である。英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "My First Dinner for the Host Family",
          body: `When I stayed with the Carter family for a month last spring, I wanted to thank them by cooking a Japanese dinner. I decided to make curry and rice, because it was the first dish my grandmother had taught me.

On Saturday morning, Mrs. Carter drove me to the supermarket. I found carrots, potatoes, and onions easily, but there was no Japanese curry roux anywhere. I almost gave up, but Mrs. Carter suggested that we ask a shop assistant. He took us to a small shelf of imported foods, and there it was — only one box left.

Back home, I started cooking at four o'clock. Everything went well until I tasted the curry. It was much spicier than the curry I usually ate in Japan. I had bought the "hot" type by mistake, because I could not read the small label on the box. I panicked, because the Carters' six-year-old son, Ben, did not like spicy food.

Then I remembered something my grandmother always said: "A good cook solves problems with what is in the kitchen." I added a lot of milk and a spoonful of honey, and I cooked the curry for another twenty minutes. It became milder, though it was still a little hot.

At dinner, Ben took a small bite and looked at me seriously. Then he smiled and asked for more rice. Mr. Carter said it was the best curry he had ever eaten, although I think he was just being kind. After dinner, Ben asked me to write the recipe on a card so that his mother could make it again. According to an email Mrs. Carter sent me last week, that card is still on their fridge.`,
          notes: [
            { word: "curry roux", meaning: "カレールウ" },
            { word: "imported", meaning: "輸入された" },
            { word: "mild(er)", meaning: "（味が）おだやかな・辛くない" },
          ],
        },
      ],
      questions: [
        {
          id: "why-curry",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "知識・技能",
          prompt: "筆者がカレーライスを作ることにした理由はどれか。",
          answer: {
            kind: "choice",
            options: [
              "It was the first dish the writer had learned from a grandparent.",
              "Ben had asked the writer to cook something spicy.",
              "It was the only Japanese food sold at the supermarket.",
              "Mrs. Carter wanted to learn how to make it.",
            ],
            correct: 0,
            why: [
              "because it was the first dish my grandmother had taught me の言いかえ。",
              "Ben は辛いものが苦手（did not like spicy food）。",
              "カレールウは輸入食品の棚に1箱しかなく、探すのに苦労した。理由ではない。",
              "レシピを書いてほしいと頼んだのは夕食のあとの Ben。作る理由ではない。",
            ],
          },
          point: "because の後ろが理由。言いかえを選ぶ",
          steps: [
            { title: "根拠の文", body: "I decided to make curry and rice, {{because}} it was the first dish my grandmother had taught me。" },
            { title: "言いかえ", body: "my grandmother had taught me ＝ {{the writer had learned from a grandparent}}。" },
          ],
        },
        {
          id: "order",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "次の出来事①〜④を、起きた順に並べたものはどれか。\n① The writer added milk and honey to the curry.\n② A shop assistant helped them find the curry roux.\n③ Ben asked the writer to write down the recipe.\n④ The writer noticed that the curry was too spicy.",
          answer: {
            kind: "choice",
            options: ["②→①→④→③", "②→④→①→③", "④→②→①→③", "②→④→③→①"],
            correct: 1,
            why: [
              "牛乳とはちみつを入れたのは、辛すぎると気づいたあと。①と④が逆。",
              "店員がルウを見つける②→味見で辛いと気づく④→牛乳とはちみつ①→夕食後にレシピを頼まれる③。",
              "辛いと気づいたのは家で料理したとき。スーパーでルウを見つけた②より後。",
              "レシピを頼まれたのは After dinner。①の味の調整より後。",
            ],
          },
          point: "場所と時の言葉（Back home, After dinner）を手がかりに",
          steps: [
            { title: "場面の切れ目", body: "スーパー（②）→ {{Back home}}（④→①）→ {{After dinner}}（③）。" },
            { title: "家の中の順", body: "味見で辛いと気づく（④）→ おばあさんの言葉を思い出し、{{milk and honey}} を入れる（①）。" },
          ],
        },
        {
          id: "infer",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "本文の内容から判断できることはどれか。",
          answer: {
            kind: "choice",
            options: [
              "The Carter family still keeps something from the writer's dinner.",
              "Ben refused to eat the curry because it was spicy.",
              "The writer had planned to make a very spicy curry.",
              "Mrs. Carter cooked the curry together with the writer.",
            ],
            correct: 0,
            why: [
              "レシピのカードが今も冷蔵庫にはってある（that card is still on their fridge）。",
              "Ben は一口食べてから笑い、ごはんのおかわりを頼んだ。",
              "hot の種類は by mistake（まちがえて）買った。",
              "一緒に行ったのは買い物。料理は筆者がひとりでしている。",
            ],
          },
          point: "最後の段落の「その後」に気持ちの結末がある",
          steps: [
            { title: "最後の文", body: "{{that card is still on their fridge}}。カードは夕食のときに書いたレシピです。" },
            { title: "ほかを消す", body: "Ben は {{asked for more rice}}、辛口は {{by mistake}}。本文と逆の選択肢を外します。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r3",
    section: {
      id: "xr-r3-paper-map",
      title: "山歩きの体験談",
      lead: "次の英文は、ある高校生が書いた体験談である。英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "The Map I Almost Didn't Bring",
          body: `Last October, my friend Daniel and I went hiking on Mount Pell, a small mountain near our town. We had climbed it twice before, so I thought we did not need a map. Just before we left, though, my father put an old paper map in my backpack. "Phones run out of battery," he said. I laughed, but I did not take it out.

The trail to the top was easy, and we reached the summit at noon. We ate our sandwiches and enjoyed the view of the lake. On the way down, we decided to try a different path that Daniel had seen online. After about forty minutes, the path became narrow and then disappeared among the trees. We tried to check our location on Daniel's phone, but it showed no signal, and my phone's battery was almost dead.

I started to feel scared. The sun would set in about two hours. Then I remembered the map. We spread it on a rock and found a small stream marked near the path we had taken. Daniel said, "If we follow the stream downhill, we should reach the parking area." We listened carefully, found the sound of water, and walked along the stream. An hour later, we saw our bicycles in the parking area.

When I got home, I told my father everything. He did not get angry. He only said, "Now you know why I always carry one." Since then, I have never gone hiking without a paper map, and I have also learned how to read one properly. Last month, I even taught my younger sister how to find north on a map.`,
          notes: [
            { word: "summit", meaning: "山頂" },
            { word: "stream", meaning: "小川" },
            { word: "downhill", meaning: "下り坂の方へ" },
          ],
        },
      ],
      questions: [
        {
          id: "why-map",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "筆者の父親が紙の地図をかばんに入れた理由として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "He knew that phones could stop working when their batteries ran out.",
              "He wanted the writer to find a new path down the mountain.",
              "He thought the writer had never climbed the mountain before.",
              "He wanted the writer to teach Daniel how to read a map.",
            ],
            correct: 0,
            why: [
              "\"Phones run out of battery,\" he said の言いかえ。",
              "別の道を試そうと決めたのは Daniel と筆者。父親ではない。",
              "筆者たちは2回登ったことがある（twice before）。",
              "地図の読み方を教えたのは、後になって妹に対して。",
            ],
          },
          point: "せりふの中に理由がある",
          steps: [
            { title: "根拠のせりふ", body: "{{\"Phones run out of battery\"}}。電池が切れるとスマホが使えなくなる、ということ。" },
          ],
        },
        {
          id: "how-back",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "筆者たちはどのようにして駐車場にもどることができたか。",
          answer: {
            kind: "choice",
            options: [
              "They found a stream on the map and walked down along it.",
              "They called for help using Daniel's phone.",
              "They went back up to the summit and took the usual trail.",
              "They followed the path that Daniel had seen online.",
            ],
            correct: 0,
            why: [
              "地図で小川を見つけ、follow the stream downhill して駐車場に着いた。",
              "Daniel のスマホは no signal（圏外）だった。",
              "山頂にもどったとは書いていない。",
              "その道は途中で消えてしまい、迷った原因になった。",
            ],
          },
          point: "解決のきっかけ（Then I remembered）の後を読む",
          steps: [
            { title: "転換点", body: "{{Then I remembered the map}}。ここから解決に向かいます。" },
            { title: "したこと", body: "地図の {{small stream}} を見つけ、音をたよりに小川にそって下りました。" },
          ],
        },
        {
          id: "change",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "この出来事のあと、筆者はどのように変わったか。",
          answer: {
            kind: "choice",
            options: [
              "The writer always carries a paper map and has learned to use it well.",
              "The writer stopped going hiking with friends.",
              "The writer bought a new phone with a longer battery life.",
              "The writer only climbs mountains with a parent now.",
            ],
            correct: 0,
            why: [
              "I have never gone hiking without a paper map／learned how to read one properly の言いかえ。",
              "山歩きをやめたとは書いていない。",
              "新しいスマホを買ったとは書いていない。",
              "親とだけ登るとは書いていない。",
            ],
          },
          point: "Since then の後に「変わったあとの姿」",
          steps: [
            { title: "合図の語", body: "{{Since then}}（それ以来）の後に、変化が書かれます。" },
            { title: "言いかえ", body: "never … without a paper map ＝ {{always carries a paper map}}。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r3",
    section: {
      id: "xr-r3-drama-stage",
      title: "演劇部の体験記",
      lead: "次の英文は、演劇部の部員が書いた体験記である。英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Taking the Stage",
          body: `I joined the drama club in my first year of high school, but I never wanted to act. I preferred working behind the stage — building sets, preparing costumes, and controlling the lights. For our club's spring performance, I was in charge of the lights, and I had practiced every cue many times.

Two days before the performance, one of our actors, Mei, broke her arm in a bicycle accident. She was playing a small but important role: a shop owner who appears in three scenes. Our teacher, Ms. Rowan, gathered everyone and asked who could take Mei's place. Nobody spoke. Then Mei, who had come to school with her arm in a cast, looked at me. "You know every line," she said. "You've been listening from the lighting booth for two months."

She was right. I did know the lines, but standing in front of an audience was another story. That night, I practiced in my room until midnight. The next day, Mei sat beside the stage and gave me advice about where to stand and when to pause. Meanwhile, Ken, a first-year student, learned how to control the lights from my notes.

On the day of the performance, my hands were shaking before my first scene. But when the lights came up, I saw Ken in the booth giving me a thumbs-up, and I felt calmer. I forgot one line in the second scene, but the actor beside me quietly helped me, and the audience did not notice.

After the show, Mei hugged me with her good arm. I still prefer working behind the stage, but now I understand how much actors depend on each other — and on the people they cannot see.`,
          notes: [
            { word: "cue", meaning: "（照明・音などの）きっかけ" },
            { word: "cast", meaning: "ギプス" },
            { word: "lighting booth", meaning: "照明の操作室" },
          ],
        },
      ],
      questions: [
        {
          id: "knew-lines",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "知識・技能",
          prompt: "筆者がせりふをすべて知っていた理由はどれか。",
          answer: {
            kind: "choice",
            options: [
              "The writer had heard the actors practice from the lighting booth for two months.",
              "The writer had played the same role the year before.",
              "Ms. Rowan had asked the writer to learn the lines just in case.",
              "Mei had taught the writer the lines after her accident.",
            ],
            correct: 0,
            why: [
              "You've been listening from the lighting booth for two months の言いかえ。",
              "筆者は演技をしたことがなく、前の年に同じ役をしたとは書いていない。",
              "先生が「念のため覚えて」と頼んだとは書いていない。",
              "Mei が教えたのは立ち位置と間の取り方。せりふはもう知っていた。",
            ],
          },
          point: "人物のせりふが理由の説明になっている",
          steps: [
            { title: "根拠のせりふ", body: "Mei の言葉 {{You've been listening from the lighting booth for two months}}。" },
            { title: "ひっかけ", body: "Mei が翌日教えたのは {{where to stand and when to pause}}。せりふではありません。" },
          ],
        },
        {
          id: "order",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "次の出来事①〜④を、起きた順に並べたものはどれか。\n① Ken learned how to control the lights.\n② Mei broke her arm.\n③ The writer forgot a line on stage.\n④ Ms. Rowan asked who could replace Mei.",
          answer: {
            kind: "choice",
            options: ["②→①→④→③", "④→②→①→③", "②→④→①→③", "②→④→③→①"],
            correct: 2,
            why: [
              "Ken が照明を覚えたのは、筆者が代役に決まった翌日。先生の呼びかけ④より後。",
              "先生が代役をさがしたのは、Mei のけが②のあと。",
              "けが②→先生の呼びかけ④→翌日 Ken が照明を覚える①→本番でせりふを忘れる③。",
              "せりふを忘れたのは本番当日。Ken が照明を覚えた①より後。",
            ],
          },
          point: "The next day・On the day of … で時を追う",
          steps: [
            { title: "2日前", body: "Mei がけが（②）→ Ms. Rowan が {{who could take Mei's place}} と聞く（④）。" },
            { title: "翌日と本番", body: "{{The next day}}, Meanwhile, Ken が照明を覚える（①）→ {{On the day of the performance}} せりふを1つ忘れる（③）。" },
          ],
        },
        {
          id: "learned",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "この経験を通して筆者が気づいたこととして最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "A performance depends on actors helping one another and on the people behind the stage.",
              "Acting is more interesting than working behind the stage.",
              "Lighting is the most important part of any performance.",
              "Practicing late at night is the best way to remember lines.",
            ],
            correct: 0,
            why: [
              "how much actors depend on each other — and on the people they cannot see の言いかえ。the people they cannot see は照明の Ken など裏方の人。",
              "I still prefer working behind the stage とあり、逆。",
              "照明が「いちばん」大事とは言っていない。",
              "夜遅くまで練習したのは事実だが、気づいたこととして書かれてはいない。",
            ],
          },
          point: "the people they cannot see が指す人を考える",
          steps: [
            { title: "最後の文", body: "now I understand … {{depend on each other}} — and on {{the people they cannot see}}。" },
            { title: "指すもの", body: "見えない人 ＝ 照明室の Ken のような{{裏方}}。役者どうしの助け合いは、せりふを助けてくれた役者の場面に当たります。" },
          ],
        },
      ],
    },
  },
];

// =====================================================================
// r4 複数の資料
// =====================================================================

const R4: ExamPoolSection[] = [
  {
    unit: U,
    tag: "r4",
    section: {
      id: "xr-r4-morning-reading",
      title: "朝読書についての2人の意見",
      lead: "学校新聞で「朝の読書の時間」について2人の意見を読んでいる。次の英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Sara Lindqvist (English teacher)",
          body: `At our school, the first ten minutes of every morning are used for silent reading. Students can read any book they like, but not textbooks or phones. I have supervised this time for five years, and I believe it is one of the most valuable parts of the school day.

First, it helps students start the day calmly. Before we introduced reading time, the first lesson often began with noise and confusion. Now, most students are ready to learn when the bell rings. Second, it gives students a chance to find books they enjoy. In a library survey last year, 58 percent of our students said that during reading time they had finished at least one book that they would not have read otherwise.

Some people say that ten minutes is too short to read anything meaningful. However, ten minutes a day adds up to about 30 hours over a school year of 180 days. That is enough time to read several novels. Many teachers also read during this time, which shows students that adults enjoy books, too.`,
          notes: [
            { word: "supervise(d)", meaning: "監督する・見守る" },
            { word: "add(s) up to", meaning: "合計で〜になる" },
          ],
        },
        {
          kind: "passage",
          lang: "en",
          title: "Kenta Morioka (second-year student)",
          body: `I like reading, so I enjoy the morning reading time. Still, I think the current system could be improved. The problem is not the length of the time but the rule that everyone must read silently and alone.

Many of my classmates do not really read during those ten minutes. They hold a book and stare at the same page, because they have not found a book that interests them. For them, reading time is just waiting time. I believe the school could help these students by letting them talk about books in small groups once a week. When a friend tells you that a book is exciting, you are much more likely to try it. Last month, my friends and I tried this idea on our own on Friday mornings. A classmate who had not finished a single book since April borrowed a mystery novel after hearing me talk about it, and she finished it in a week.

I also think the school should allow students to read on school tablets, because some students find it easier to read with larger letters. Reading time should be about enjoying stories, not about the form of the book.`,
          notes: [
            { word: "current", meaning: "今の" },
            { word: "stare at", meaning: "〜をじっと見つめる" },
          ],
        },
      ],
      questions: [
        {
          id: "first-lesson",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "知識・技能",
          prompt: "Lindqvist 先生によると、朝の読書の時間を始めてから1時間目の授業はどう変わったか。",
          answer: {
            kind: "choice",
            options: [
              "Most students are now ready to learn when the bell rings.",
              "The first lesson now starts ten minutes later.",
              "Students now read textbooks before the first lesson.",
              "The first lesson is now used for talking about books.",
            ],
            correct: 0,
            why: [
              "Now, most students are ready to learn when the bell rings とある。",
              "授業の開始時刻が変わったとは書いていない。",
              "教科書は読書の時間に読めない（not textbooks）。",
              "本について話す時間は Morioka さんの提案で、今の授業のことではない。",
            ],
          },
          point: "Before … / Now … の対比で変化をつかむ",
          steps: [
            { title: "対比", body: "{{Before}} は noise and confusion、{{Now}} は ready to learn。" },
          ],
        },
        {
          id: "both-agree",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "2人の文章を読んで、2人とも同じ考えだと言えるものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "The morning reading time has value for students.",
              "Students should talk about books in small groups.",
              "Ten minutes is too short for reading.",
              "The current rules do not need to change.",
            ],
            correct: 0,
            why: [
              "先生は one of the most valuable parts、Morioka さんも I enjoy … と言い、時間の長さは問題ではないとしている。どちらも価値を認めている。",
              "グループで話すのは Morioka さんだけの提案。",
              "先生は「短すぎる」という意見に反論し、Morioka さんも長さは問題ではないと言う。",
              "Morioka さんは could be improved（改善できる）と言っている。",
            ],
          },
          point: "片方だけの意見を消し、両方に当てはまるものを選ぶ",
          steps: [
            { title: "先生", body: "{{one of the most valuable parts of the school day}}。" },
            { title: "Morioka さん", body: "{{I enjoy the morning reading time}}。問題は時間ではなく、{{silently and alone}} というルール。" },
            { title: "両方に当てはまるか", body: "グループ・タブレットは Morioka さんだけ、ルールを変えなくてよいは先生寄り。{{両方}}に共通するのは「価値がある」。" },
          ],
        },
        {
          id: "suggestion",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "Morioka さんが、本を見つけられない生徒のために提案していることはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Letting students talk about books in small groups once a week.",
              "Making the reading time longer than ten minutes.",
              "Letting students choose textbooks during reading time.",
              "Asking teachers to choose a book for each student.",
            ],
            correct: 0,
            why: [
              "letting them talk about books in small groups once a week とある。友だちのすすめで読む気になる、という理由つき。",
              "時間の長さは問題ではないと言っている。",
              "教科書の話はしていない。",
              "先生が本を選ぶとは言っていない。",
            ],
          },
          point: "提案は I believe … could / should の文にある",
          steps: [
            { title: "根拠の文", body: "I believe the school could help these students by {{letting them talk about books in small groups once a week}}。" },
            { title: "理由", body: "{{When a friend tells you that a book is exciting}}, you are more likely to try it。" },
          ],
        },
        {
          id: "too-short",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "Lindqvist 先生は「10分は短すぎる」という意見にふれている。この点についての Morioka さんの立場として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "He does not complain about the length; he questions how the time is used.",
              "He agrees that ten minutes is too short and wants twenty minutes.",
              "He thinks the reading time should be removed because it is too short.",
              "He says that 30 hours a year is not enough to read a novel.",
            ],
            correct: 0,
            why: [
              "The problem is not the length of the time but the rule … と、長さではなく使い方（ルール）を問題にしている。",
              "長さが短いとは言っておらず、20分にしたいとも言っていない。",
              "読書の時間を楽しんでおり、なくすべきだとは言っていない。",
              "30時間は先生の計算。Morioka さんはこの数字にふれていない。",
            ],
          },
          point: "not A but B の B が言いたいこと",
          steps: [
            { title: "先生の文章", body: "{{Some people say that ten minutes is too short}}。先生は 10分×180日＝1,800分＝{{30時間}} と反論。" },
            { title: "Morioka さんの文章", body: "The problem is {{not the length of the time but the rule}} … 。長さには不満がなく、使い方を問題にしています。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r4",
    section: {
      id: "xr-r4-weekend-workshops",
      title: "友人からのメールと講座の一覧",
      lead: "あなた（Aya）は友人の Olivia と、地域のセンターの週末講座に参加しようとしている。Olivia からのメールと講座の一覧を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "An email from Olivia",
          body: `Hi Aya,

Thanks for telling me about the weekend workshops at the Brookside Community Center. I looked at the schedule you sent, and I'd love to take one with you in June!

Here's my situation. I have piano lessons every Saturday morning until 11:30, and it takes me about thirty minutes to get from my teacher's house to the center, so I can't join anything on Saturday that starts before noon. On Sundays I'm free all day. Also, I spent a lot of money on my new bike last month, so I'd like to keep the fee under 20 dollars. You said you're more interested in making things with your hands than in sports, and I feel exactly the same way. We do enough exercise in P.E. class!

By the way, my little brother Leo, who is nine, saw the schedule on my desk and wants to come too. He loves cooking and drawing, and he's very good with his hands. Could you check if there's a workshop that all three of us can join? If there isn't one, that's OK. He can stay home with my dad, and we can choose the one we like best.

One more thing: my mom says she can drive us to the center on Sunday, but not on Saturday. If we go on Saturday, we'll have to take the bus.

I also checked the center's website. It says that we should bring an apron and a towel to the cooking and craft workshops, and that all materials are included in the fee. Children under 13 need a form signed by a parent, so if Leo comes, I'll ask my mom to fill one in.

Let me know what you think. See you at school on Monday!

Olivia`,
          notes: [{ word: "workshop(s)", meaning: "講座・体験教室" }],
        },
        {
          kind: "table",
          caption: "Brookside Community Center — Weekend Workshops (June)",
          head: ["Workshop", "Day / Time", "Fee (per person)", "Age"],
          rows: [
            ["Pottery for Beginners", "Saturday 10:00–12:00", "$18", "12 and over"],
            ["Easy Woodworking", "Saturday 14:00–16:00", "$25", "10 and over"],
            ["Table Tennis Club", "Saturday 13:00–15:00", "$5", "All ages"],
            ["Family Bread Baking", "Sunday 9:30–11:30", "$15", "8 and over"],
            ["Beginner Yoga", "Sunday 13:00–14:00", "$10", "8 and over"],
            ["Paper Lantern Making", "Sunday 15:00–17:00", "$12", "13 and over"],
          ],
        },
      ],
      questions: [
        {
          id: "saturday-morning",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "Olivia が土曜日の正午より前に始まる講座に参加できない理由はどれか。",
          answer: {
            kind: "choice",
            options: [
              "She has piano lessons on Saturday mornings.",
              "Her mother cannot drive her on Saturdays.",
              "She has to stay home with her brother.",
              "She has P.E. class on Saturday mornings.",
            ],
            correct: 0,
            why: [
              "I have piano lessons every Saturday morning until 11:30 とあり、移動に30分かかる。",
              "母が土曜に送れないのは事実だが、バスで行けばよく、正午前に出られない理由ではない。",
              "家に残るかもしれないのは弟の Leo。",
              "体育（P.E.）の話は運動はもう十分という意味で、土曜の予定ではない。",
            ],
          },
          point: "so の前が理由、後ろが結果",
          steps: [
            { title: "根拠の文", body: "piano lessons every Saturday morning {{until 11:30}} ＋ 移動 {{thirty minutes}}、{{so}} I can't join anything on Saturday that starts before noon。" },
          ],
        },
        {
          id: "two-of-us",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "メールと一覧によると、Aya と Olivia の2人は参加できるが、Leo は参加できない講座はどれか。",
          answer: {
            kind: "choice",
            options: ["Pottery for Beginners", "Easy Woodworking", "Family Bread Baking", "Paper Lantern Making"],
            correct: 3,
            why: [
              "土曜10:00開始で、Olivia は正午前の講座に出られない。",
              "参加費 $25 で、20ドル未満の条件に合わない。",
              "日曜・$15・ものづくりで2人の条件に合うが、8歳以上なので9歳の Leo も参加できる。",
              "日曜・$12・ものづくりで2人の条件に合い、13 and over なので9歳の Leo は参加できない。",
            ],
          },
          point: "条件を1つずつ当てて、表の行を消していく",
          steps: [
            { title: "2人の条件", body: "① 土曜は正午より後 ② {{under 20 dollars}} ③ スポーツではなく {{making things}}。" },
            { title: "表を消す", body: "Pottery（土曜10時）× Woodworking（$25）× Table Tennis・Yoga（運動）×。残るのは Bread Baking と {{Paper Lantern Making}}。" },
            { title: "Leo（9歳）", body: "Bread Baking は 8 and over で参加できる。Lantern は {{13 and over}} なので参加できません。" },
          ],
        },
        {
          id: "all-three",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "3人がそろって参加できる講座を選んだとき、3人分の参加費の合計はいくらか。",
          answer: {
            kind: "choice",
            options: ["$15", "$30", "$36", "$45"],
            correct: 3,
            why: [
              "1人分だけの参加費。",
              "2人分（15×2）。Leo の分が入っていない。",
              "Paper Lantern Making の3人分（12×3）。この講座には Leo は参加できない。",
              "3人がそろって参加できるのは Family Bread Baking。$15×3＝$45。",
            ],
          },
          point: "まず講座を1つに決め、そのあと人数をかける",
          steps: [
            { title: "講座を決める", body: "2人の条件に合う Bread Baking と Lantern Making のうち、9歳が入れるのは {{Family Bread Baking}}（8 and over）。" },
            { title: "計算", body: "参加費は1人 $15（per person）。$15 × 3人 ＝ {{$45}}。" },
          ],
        },
        {
          id: "how-to-go",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "3人がそろって参加できる講座に行く場合、メールの内容からわかることはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Olivia's mother can drive them to the center.",
              "They will have to take the bus.",
              "Olivia will come straight from her piano lesson.",
              "Leo will stay home with his father.",
            ],
            correct: 0,
            why: [
              "3人で行ける Family Bread Baking は日曜。my mom says she can drive us to the center on Sunday。",
              "バスで行くのは土曜の場合。",
              "ピアノのレッスンは土曜の午前で、日曜の講座とは関係ない。",
              "3人で行ける講座があるので、Leo も一緒に行く。",
            ],
          },
          point: "講座の曜日を表で確かめ、メールの条件と結ぶ",
          steps: [
            { title: "曜日", body: "3人で行けるのは {{Family Bread Baking}}。表から {{Sunday}} 9:30–11:30。" },
            { title: "メールと結ぶ", body: "my mom says she can drive us to the center {{on Sunday}}。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r4",
    section: {
      id: "xr-r4-commute-survey",
      title: "通学方法の調査（記事と表）",
      lead: "学校新聞の記事と、記事に使われた表を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "How Do We Get to School?",
          body: `In May, the school newspaper club asked all 600 students at Hillcrest High School how they usually get to school. The results are shown in the table. We also asked students what they would change about their trip to school if they could.

Walking was the most common way for first-year students, many of whom live within twenty minutes of the school on foot, but the number of walkers became smaller in the higher grades. One reason may be that many second- and third-year students take part in early morning club practice and need to arrive quickly. Several students who ride bicycles told us that the road in front of the school is dangerous in the morning, because cars and bicycles share the same narrow lane. One second-year student said that she had almost been hit by a car twice this year.

The bus is popular with students who live in the hill area to the north. However, these students complained that the bus is often crowded and sometimes arrives late. A third-year student said, "If the bus is late, I miss the first ten minutes of my club practice." Some of them said that they would like the bus company to add one more bus in the morning.

Only a small number of students are driven to school by their parents. Most of them said that they would prefer to come by bicycle if there were a safer bike lane.

Based on these results, our club will ask the town to paint a separate bike lane on the road in front of the school. We believe this would make the trip safer for the largest group of students in our school, and it might also encourage some students to switch from cars to bicycles. We will also share the students' comments about the bus with the bus company. We hope that next year's survey will show a safer and more comfortable trip to school for everyone.`,
          notes: [
            { word: "lane", meaning: "車線・（道路の）通る部分" },
            { word: "switch", meaning: "切りかえる" },
          ],
        },
        {
          kind: "table",
          caption: "How students usually get to school (number of students)",
          head: ["", "1st year", "2nd year", "3rd year", "Total"],
          rows: [
            ["Walk", "90", "60", "50", "200"],
            ["Bicycle", "60", "85", "95", "240"],
            ["Bus", "40", "45", "45", "130"],
            ["Car (driven by parents)", "10", "10", "10", "30"],
            ["Total", "200", "200", "200", "600"],
          ],
        },
      ],
      questions: [
        {
          id: "third-year",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "表によると、3年生で最も多い通学方法はどれか。",
          answer: {
            kind: "choice",
            options: ["Walking", "Bicycle", "Bus", "Car"],
            correct: 1,
            why: [
              "3年生の徒歩は50人。",
              "3年生の自転車は95人で最も多い。",
              "3年生のバスは45人。",
              "3年生の車は10人。",
            ],
          },
          point: "表は行と列の交わるところを読む",
          steps: [
            { title: "列をしぼる", body: "{{3rd year}} の列：Walk 50・Bicycle {{95}}・Bus 45・Car 10。" },
          ],
        },
        {
          id: "why-lane",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "記事と表を合わせて考えると、新聞部が自転車専用の通路を町に求める理由として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Bicycle riders are the largest group of students, and they say the road is dangerous.",
              "Walking is the most common way to get to school in every grade.",
              "Most students who take the bus want to start riding bicycles.",
              "The number of students driven by parents is increasing every year.",
            ],
            correct: 0,
            why: [
              "表で自転車は合計240人で最多（the largest group）。記事では自転車の生徒が道が危ないと言っている。",
              "徒歩が最も多いのは1年生だけ（2・3年生は自転車が最多）。",
              "自転車に変えたいと言っているのは、車で送られている生徒。",
              "車の生徒は各学年10人で、年ごとに増えているとは書いていない。",
            ],
          },
          point: "記事の the largest group を表の数で確かめる",
          steps: [
            { title: "記事", body: "safer for {{the largest group of students}}／自転車の生徒が道が危ないと言う。" },
            { title: "表", body: "合計：Walk 200・{{Bicycle 240}}・Bus 130・Car 30。最多は自転車です。" },
          ],
        },
        {
          id: "if-switch",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "安全な自転車の通路ができ、親に車で送られている生徒が全員自転車通学に変えたとする。表の数をもとにすると、自転車で通学する生徒は何人になるか。",
          answer: {
            kind: "choice",
            options: ["240", "250", "270", "300"],
            correct: 2,
            why: [
              "今の自転車の人数のまま。車の生徒が加わっていない。",
              "車の生徒を1学年分（10人）しか足していない。",
              "自転車240人＋車30人＝270人。",
              "車の生徒を60人として足している。車は合計30人。",
            ],
          },
          point: "記事の「変えたい人」を表の「合計」の数にする",
          steps: [
            { title: "記事", body: "車で送られる生徒は {{would prefer to come by bicycle}}（安全な通路があれば）。" },
            { title: "表の数で計算", body: "Bicycle の Total {{240}} ＋ Car の Total {{30}} ＝ {{270}}人。" },
          ],
        },
        {
          id: "true-both",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "記事と表の内容に合うものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "About one in five students use the bus, which students say is often crowded.",
              "Walkers are the largest group in every grade.",
              "Fewer than 20 students are driven to school by their parents.",
              "Most third-year students walk because of early morning club practice.",
            ],
            correct: 0,
            why: [
              "バスは 130÷600＝約0.22 で約5人に1人。記事ではバスが often crowded と言われている。",
              "徒歩が最多なのは1年生だけ。2・3年生は自転車が最多。",
              "車で送られる生徒は合計30人。",
              "3年生の徒歩は50人で200人中の4分の1。記事では、朝練のため上の学年ほど徒歩が減ると推測している。",
            ],
          },
          point: "割合は「全体の何人中か」で計算して確かめる",
          steps: [
            { title: "バスの割合", body: "130 ÷ 600 ≒ 0.22。{{約5人に1人}}（one in five ＝ 120人）に近い。" },
            { title: "記事と結ぶ", body: "バスについて {{often crowded and sometimes arrives late}} という声。" },
            { title: "ほかを消す", body: "徒歩が最多は {{1年生だけ}}、車は {{30人}}、3年生の徒歩は {{50/200}}。" },
          ],
        },
      ],
    },
  },
];

// =====================================================================
// r5 長めの物語文
// =====================================================================

const R5: ExamPoolSection[] = [
  {
    unit: U,
    tag: "r5",
    section: {
      id: "xr-r5-clockmaker",
      title: "時計店の夏（物語）",
      lead: "あなたは英語の授業で、物語を読んでその内容を発表することになった。次の物語を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "The Clockmaker's Summer",
          body: `Tom had never liked visiting his grandfather's shop. It was a small, dusty room on a quiet street in the town of Harlow, and it was full of clocks — clocks on the walls, clocks on the shelves, clocks in pieces on the workbench. The constant ticking made Tom sleepy, and there was no Wi-Fi. Whenever his family visited, Tom sat in the corner with his phone and counted the minutes until they could leave.

So when his parents told him that he would spend the summer helping his grandfather, Tom was not happy. "Grandpa's eyes are getting worse," his mother explained. "He needs someone to help him with the small parts." Tom agreed only because his parents promised to pay for half of a new bicycle at the end of the summer.

For the first week, Tom's job was simple: cleaning parts and sweeping the floor. His grandfather hardly spoke, and Tom spent most of the time looking at the clock above the door, waiting for five o'clock. On the eighth day, however, a woman came in with a small silver pocket watch. It had belonged to her father, she said, and it had stopped on the day he died, twenty years earlier. "I'd like to hear it tick again," she said quietly.

His grandfather opened the watch and frowned. One of the tiny wheels inside was broken, and the company that had made the watch no longer existed. "We'll have to make the part ourselves," he said. Then he looked at Tom. "My hands are steady, but my eyes are not. Your eyes are good. Will you be my eyes?"

For the next ten days, they worked together on the tiny wheel. Tom looked through a magnifying glass and described exactly what he saw, and his grandfather, guided by Tom's words, cut and filed the metal. Twice the wheel broke, and they had to start again. Every evening, his grandfather wrote down in a small notebook what they had tried that day. Tom was surprised to find that he no longer looked at the clock above the door. Sometimes he even forgot to eat lunch.

When the wheel was finally finished, his grandfather placed it inside the watch and closed the case. For a moment, nothing happened. Then they heard it — a soft, steady tick. When the woman came back, she held the watch to her ear for a long time without saying anything. Then she thanked them with tears in her eyes.

At the end of the summer, Tom's parents gave him the money for the bicycle as they had promised. Tom thanked them, but he used part of it to buy his own set of small screwdrivers. "Grandpa says I can come every Saturday," he told them. "There's a clock from 1890 in the shop that nobody has been able to fix."`,
          notes: [
            { word: "workbench", meaning: "作業台" },
            { word: "magnifying glass", meaning: "虫めがね・拡大鏡" },
            { word: "file(d)", meaning: "やすりをかける" },
            { word: "screwdriver(s)", meaning: "ねじ回し・ドライバー" },
          ],
        },
      ],
      questions: [
        {
          id: "why-agree",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "知識・技能",
          prompt: "Tom が夏の間祖父の手伝いをすることを引き受けた理由はどれか。",
          answer: {
            kind: "choice",
            options: [
              "His parents promised to pay for half of a new bicycle.",
              "He wanted to learn how to repair clocks.",
              "His grandfather offered to give him a pocket watch.",
              "There was nothing else to do in the town of Harlow.",
            ],
            correct: 0,
            why: [
              "Tom agreed only because his parents promised to pay for half of a new bicycle とある。",
              "最初は時計に興味がなく、店に行くのも好きではなかった。",
              "懐中時計は客の女性のもの。",
              "町に何もないとは書いていない。",
            ],
          },
          point: "only because の後ろが「ただ1つの理由」",
          steps: [
            { title: "根拠の文", body: "Tom agreed {{only because}} his parents promised to pay for {{half of a new bicycle}}。" },
          ],
        },
        {
          id: "feelings",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "物語を通して、Tom の気持ちはどのように変わったか。",
          answer: {
            kind: "choice",
            options: [
              "bored → absorbed in the work → eager to keep learning",
              "excited → disappointed → relieved",
              "nervous → angry → bored",
              "bored → jealous → sad",
            ],
            correct: 0,
            why: [
              "時計ばかり見て5時を待つ（退屈）→ 時計を見なくなり昼食も忘れる（夢中）→ 自分のドライバーを買い毎週土曜に通う（もっと学びたい）。",
              "最初からわくわくしてはいない（was not happy）。",
              "怒る場面はなく、最後は退屈どころか続けて通おうとしている。",
              "ねたみや悲しみの場面はない。",
            ],
          },
          point: "行動の変化（時計を見る→見ない）が気持ちを表す",
          steps: [
            { title: "はじめ", body: "{{looking at the clock above the door, waiting for five o'clock}}：退屈。" },
            { title: "なか", body: "{{he no longer looked at the clock}}・昼食も忘れる：作業に夢中。" },
            { title: "おわり", body: "自分の {{screwdrivers}} を買い、{{every Saturday}} 通う：もっと続けたい。" },
          ],
        },
        {
          id: "memo",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "あなたは発表のために次のメモを作った。空所［　　］に入る最も適切なものはどれか。\n・Problem: The grandfather could not see small parts well.\n・Turning point: A woman brought a watch that had stopped 20 years earlier.\n・How they fixed it: ［　　］\n・Result: Tom decided to keep coming to the shop.",
          answer: {
            kind: "choice",
            options: [
              "They made a new part together, with Tom acting as his grandfather's eyes.",
              "They ordered a new wheel from the company that made the watch.",
              "Tom fixed the watch alone after his grandfather gave up.",
              "They replaced the broken watch with a new one from the shop.",
            ],
            correct: 0,
            why: [
              "Will you be my eyes? のあと、Tom が見て説明し、祖父が削って部品を作った。",
              "その会社はもうない（no longer existed）。",
              "祖父はあきらめておらず、2人で作業した。",
              "壊れた時計を直したのであって、新しい時計に取りかえたのではない。",
            ],
          },
          point: "メモの前後（問題→結果）にはさまる中身を選ぶ",
          steps: [
            { title: "直し方", body: "Tom が {{looked through a magnifying glass and described}}、祖父が {{guided by Tom's words, cut and filed}}。" },
            { title: "言いかえ", body: "Your eyes are good. Will you be my eyes? ＝ {{Tom acting as his grandfather's eyes}}。" },
          ],
        },
        {
          id: "summary",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "この物語の要約として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "A boy who found his grandfather's work boring discovers its value through a task they share.",
              "A boy works hard all summer to save enough money for a bicycle.",
              "A woman searches for twenty years for someone who can fix her father's watch.",
              "A grandfather teaches his grandson how to sell old clocks to customers.",
            ],
            correct: 0,
            why: [
              "退屈していた Tom が、懐中時計の修理を祖父と一緒にすることで仕事の価値に気づく、という全体の流れ。",
              "自転車は手伝いを引き受けるきっかけにすぎず、最後はお金の一部でドライバーを買っている。",
              "女性は物語の一部の登場人物で、20年探し続けたとは書いていない。",
              "時計を売る話ではなく、直す話。",
            ],
          },
          point: "要約は「はじめ→きっかけ→おわり」をおおうもの",
          steps: [
            { title: "流れ", body: "退屈（はじめ）→ 懐中時計の修理を{{一緒に}}する（きっかけ）→ 毎週通いたい（おわり）。" },
            { title: "せますぎる選択肢", body: "自転車・客の女性は{{一部}}だけの話。全体の中心は Tom の変化です。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r5",
    section: {
      id: "xr-r5-choir-solo",
      title: "合唱団のソロ（物語）",
      lead: "あなたは英語の授業で、物語を読んで登場人物について発表することになった。次の物語を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "The Solo",
          body: `For three years, Emma had dreamed of singing the solo in the Greenfield Youth Choir's winter concert. She practiced every evening, recorded herself on her phone, and listened for mistakes on the bus to school. So when Mr. Okafor, the choir director, announced that the solo would go to Nadia, a girl who had joined the choir only six months before, Emma felt as if the floor had dropped away beneath her.

She smiled and clapped with everyone else, but on the way home she could not stop thinking about it. Nadia's voice was beautiful — Emma had to admit that — but she was quiet and shy, and she always stood in the back row. "She won't even be able to sing in front of all those people," Emma thought, and then she felt ashamed of thinking it. At dinner that night, she hardly spoke, and when her mother asked what was wrong, she only said that she was tired.

A week later, Emma's thought seemed to come true. At the first rehearsal on the concert hall stage, Nadia stepped forward to sing, opened her mouth, and nothing came out. Mr. Okafor told everyone to take a break. Emma found Nadia sitting alone in the hallway, staring at her shoes.

"I can't do it," Nadia whispered. "At my old school, I forgot the words in a concert and everyone laughed. I asked Mr. Okafor to give the solo to you, but he said no."

Emma was surprised. For a moment, she thought about how easy it would be to tell Mr. Okafor that Nadia was not ready. Instead, she sat down next to her. "When I get nervous," she said, "I don't look at the whole audience. I pick one friendly face and sing just to that person." She paused. "If you like, you can sing to me. I'll be in the second row, right in the middle."

They practiced together during every lunch break for the next two weeks. Emma stood a little farther away each time, until Nadia could sing the whole solo while looking across an empty classroom at her. By the second week, they were laughing together about their mistakes. Emma also showed Nadia how to breathe slowly before starting, the way her own voice teacher had taught her.

On the night of the concert, the hall was full. When Nadia stepped forward, her hands were shaking, but her eyes found Emma in the second row. Then she began to sing, and her voice filled the hall. Emma sang the harmony behind her, and to her own surprise, she felt no jealousy at all — only a warm kind of pride.

After the concert, Mr. Okafor came over to Emma. "Next year's solo is open to everyone," he said. "But I noticed what you did. A good choir member listens to the voices around her. You did more than that."`,
          notes: [
            { word: "choir", meaning: "合唱団" },
            { word: "rehearsal", meaning: "リハーサル・下げいこ" },
            { word: "ashamed", meaning: "恥ずかしく思って" },
            { word: "jealousy", meaning: "ねたみ・しっと" },
          ],
        },
      ],
      questions: [
        {
          id: "nadia-fear",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "知識・技能",
          prompt: "Nadia がソロを歌うことをこわがっていた理由はどれか。",
          answer: {
            kind: "choice",
            options: [
              "She had once forgotten the words in a concert and people had laughed.",
              "She had joined the choir only a week before the concert.",
              "Mr. Okafor had told her that her voice was not good enough.",
              "Emma had told her that she was not ready.",
            ],
            correct: 0,
            why: [
              "At my old school, I forgot the words in a concert and everyone laughed の言いかえ。",
              "入団したのは6か月前（six months before）。",
              "先生がそう言ったとは書いていない。Nadia の声は beautiful とある。",
              "Emma はそう言おうかと一瞬考えたが、言わなかった（Instead, …）。",
            ],
          },
          point: "人物のせりふの中の過去の出来事が理由",
          steps: [
            { title: "根拠のせりふ", body: "{{At my old school, I forgot the words in a concert and everyone laughed}}。" },
          ],
        },
        {
          id: "feelings",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "物語を通して、Emma の気持ちはどのように変わったか。",
          answer: {
            kind: "choice",
            options: [
              "disappointed → tempted but caring → proud",
              "happy → nervous → embarrassed",
              "disappointed → angry → jealous",
              "jealous → bored → lonely",
            ],
            correct: 0,
            why: [
              "ソロを逃して落ちこむ（the floor had dropped away）→ 先生に言いつけようか迷うが Nadia を助ける → 最後は a warm kind of pride。",
              "はじめは喜んでいない。ソロに選ばれなかった。",
              "最後は no jealousy at all（ねたみはまったくない）。",
              "最後は誇らしい気持ちで、さびしいとは書いていない。",
            ],
          },
          point: "はじめ・転換点・最後の気持ちの語を拾う",
          steps: [
            { title: "はじめ", body: "{{felt as if the floor had dropped away}}：がっかり。" },
            { title: "転換点", body: "言いつけるのは簡単だと思った（{{how easy it would be}}）が、{{Instead}} となりにすわって助けた。" },
            { title: "最後", body: "{{no jealousy at all — only a warm kind of pride}}。" },
          ],
        },
        {
          id: "memo",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "あなたは発表のために次のメモを作った。空所［　　］に入る最も適切なものはどれか。\nHow Emma helped Nadia\n・Advice: Sing to one friendly face, not to the whole audience.\n・Practice: ［　　］\n・Before singing: Breathe slowly.",
          answer: {
            kind: "choice",
            options: [
              "They practiced at lunch, and Emma stood farther away each time.",
              "They practiced with the whole choir every evening on the stage.",
              "Emma recorded Nadia's voice and listened for mistakes on the bus.",
              "Emma asked Mr. Okafor to give Nadia extra lessons.",
            ],
            correct: 0,
            why: [
              "during every lunch break … Emma stood a little farther away each time の言いかえ。",
              "練習は昼休み、空き教室で2人で。合唱団全体・毎晩ではない。",
              "録音してバスで聞いたのは、Emma が自分の練習でしていたこと。",
              "先生に追加のレッスンを頼んだとは書いていない。",
            ],
          },
          point: "メモの見出し（Practice）に合う段落を探す",
          steps: [
            { title: "練習の段落", body: "{{during every lunch break for the next two weeks}}、{{a little farther away each time}}。" },
            { title: "ひっかけ", body: "録音・バスは Emma {{自身}}の練習。Nadia を助けた方法ではありません。" },
          ],
        },
        {
          id: "director",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "Mr. Okafor の最後の言葉 \"You did more than that.\" が表していることとして最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Emma did not only sing well with others but also actively supported a fellow member.",
              "Emma will certainly be chosen for next year's solo.",
              "Emma should listen more carefully to the voices around her.",
              "Emma's harmony was louder than Nadia's solo.",
            ],
            correct: 0,
            why: [
              "that は「まわりの声を聞くこと」。Emma はそれ以上に、Nadia を助けて舞台に立たせた。",
              "Next year's solo is open to everyone とあり、決まってはいない。",
              "注意ではなく、ほめている言葉。",
              "ハーモニーの音量の話はしていない。",
            ],
          },
          point: "that が指す前の文をおさえてから読む",
          steps: [
            { title: "that の中身", body: "前の文 {{A good choir member listens to the voices around her}}。" },
            { title: "more than that", body: "Emma は聞くだけでなく、昼休みの練習やアドバイスで {{Nadia を支えた}}。先生はそれに気づいていた（{{I noticed what you did}}）。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r5",
    section: {
      id: "xr-r5-community-garden",
      title: "海辺の町の菜園（物語）",
      lead: "あなたは英語の授業で、物語を読んでその内容を発表することになった。次の物語を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "A Bed by the Gate",
          body: `When Ryo's family moved from a big city to the small seaside town of Alder Bay, he was sure that he would hate it. There was one supermarket, one bus that came every hour, and no one his age on his street. At his new school, the other students had known each other since kindergarten, and Ryo did not know how to join their conversations. He spent most evenings alone in his room, playing games online with his old friends from the city.

Every day after school, he walked home by a different road so that he would not have to go straight back to his empty room. One afternoon in April, he passed a fenced area full of small vegetable beds. An old man in a straw hat was struggling to carry a large bag of soil. Without thinking, Ryo took the other end of the bag.

"Thank you, young man," the old man said. His name was Mr. Haddad, and he managed the community garden. Anyone in town could rent a bed for five dollars a month, he explained, but many beds were empty because younger families were too busy. "This one has been empty for two years," he said, pointing at a weedy bed near the gate. "You can use it for free if you help me water the others on weekends."

Ryo did not know anything about growing vegetables. He did not even like vegetables very much. But he had nothing else to do on weekends, so he said yes.

At first, everything went wrong. He planted seeds too deeply, forgot to water them during a hot week, and lost half of his lettuce to snails. Each time, one of the other gardeners — usually someone much older than Ryo — came over with advice. Mrs. Lin showed him how to make a trap for snails with an old cup. A retired fisherman named Gus taught him to use seaweed from the beach as fertilizer. Slowly, Ryo began to look forward to Saturdays.

In July, his tomatoes finally turned red. He picked the first one and took it to Mr. Haddad, who cut it in half and shared it with him on the bench by the gate. It was the best tomato Ryo had ever tasted. "The first tomato of the season always tastes better when it is shared," Mr. Haddad said with a smile.

By the end of the summer, Ryo had an idea. He asked his homeroom teacher if his class could use some of the empty beds for a science project. To his surprise, many classmates were interested, and the next spring, fifteen students joined him at the garden. Some of them came for the project, but others simply stayed because they enjoyed it.

For the first time since moving to Alder Bay, Ryo felt that he was not a visitor in the town but a part of it.`,
          notes: [
            { word: "(vegetable) bed(s)", meaning: "（野菜の）区画・畑の一画" },
            { word: "weedy", meaning: "雑草だらけの" },
            { word: "snail(s)", meaning: "カタツムリ" },
            { word: "fertilizer", meaning: "肥料" },
          ],
        },
      ],
      questions: [
        {
          id: "condition",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "知識・技能",
          prompt: "Mr. Haddad が Ryo に区画を無料で使わせる条件として示したことはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Ryo would help water the other beds on weekends.",
              "Ryo would pay five dollars at the end of the summer.",
              "Ryo would bring his classmates to the garden.",
              "Ryo would give Mr. Haddad half of his vegetables.",
            ],
            correct: 0,
            why: [
              "You can use it for free if you help me water the others on weekends の言いかえ。",
              "5ドルはふつうの月の借り賃。Ryo は無料（for free）。",
              "クラスメートを連れてきたのは、のちの Ryo 自身のアイデア。条件ではない。",
              "トマトを分けたのは自分からで、条件ではない。",
            ],
          },
          point: "if の後ろが条件",
          steps: [
            { title: "根拠のせりふ", body: "You can use it {{for free}} {{if}} you help me water the others on weekends。" },
          ],
        },
        {
          id: "feelings",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "物語を通して、Ryo の気持ちはどのように変わったか。",
          answer: {
            kind: "choice",
            options: [
              "lonely → gradually enjoying the garden → feeling that he belongs",
              "excited → bored → lonely",
              "lonely → angry → disappointed",
              "curious → afraid → lonely",
            ],
            correct: 0,
            why: [
              "話す相手がおらず家にも帰りたくない（孤独）→ 土曜が楽しみになる → 町の一員だと感じる。",
              "はじめからわくわくしてはいない（he would hate it）。",
              "怒りやがっかりした場面はない。",
              "最後はさびしいのではなく、a part of it と感じている。",
            ],
          },
          point: "はじめと最後の一文に気持ちがはっきり出る",
          steps: [
            { title: "はじめ", body: "{{he would hate it}}・会話に入れない・家に帰りたくない。" },
            { title: "なか", body: "{{Slowly, Ryo began to look forward to Saturdays}}。" },
            { title: "最後", body: "{{not a visitor in the town but a part of it}}。" },
          ],
        },
        {
          id: "memo",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "あなたは発表のために次のメモを作った。空所［　　］に入る最も適切なものはどれか。\nPeople who helped Ryo\n・Mr. Haddad: let Ryo use an empty bed\n・Mrs. Lin: ［　　］\n・Gus: taught him to use seaweed as fertilizer",
          answer: {
            kind: "choice",
            options: [
              "showed him a way to protect his plants from snails",
              "taught him how deep to plant the seeds",
              "shared a tomato with him on the bench",
              "asked his teacher about a science project",
            ],
            correct: 0,
            why: [
              "Mrs. Lin showed him how to make a trap for snails with an old cup の言いかえ。",
              "種を深くまきすぎた失敗は書いてあるが、だれが教えたかは書いていない。",
              "トマトを分けたのは Mr. Haddad。",
              "先生に頼んだのは Ryo 自身。",
            ],
          },
          point: "人物名で本文を探し、した行動を照らす",
          steps: [
            { title: "人物をさがす", body: "{{Mrs. Lin}} showed him how to make {{a trap for snails}}。" },
            { title: "言いかえ", body: "カタツムリのわな ＝ {{protect his plants from snails}}。" },
          ],
        },
        {
          id: "message",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "物語の結末についての説明として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Through the garden, Ryo built connections with both older residents and classmates.",
              "Ryo decided to move back to the big city after the summer.",
              "Ryo became the new manager of the community garden.",
              "Ryo's classmates stopped coming after the science project ended.",
            ],
            correct: 0,
            why: [
              "年上の菜園の人たちに助けられ、のちにクラスメート15人とも菜園に通い、町の一員と感じるようになった。",
              "都会にもどるとは書いていない。",
              "管理人は Mr. Haddad のまま。",
              "others simply stayed because they enjoyed it とあり、残った生徒もいる。",
            ],
          },
          point: "最後の段落と、その前のできごとを結びつける",
          steps: [
            { title: "年上の人たち", body: "Mrs. Lin や Gus など {{someone much older than Ryo}} が助けてくれた。" },
            { title: "クラスメート", body: "{{fifteen students joined him}}、楽しくて残った人もいる。" },
            { title: "結末", body: "その結果 {{a part of it}}（町の一員）と感じた。" },
          ],
        },
      ],
    },
  },
];

// =====================================================================
// r6 説明文・論説文
// =====================================================================

const R6: ExamPoolSection[] = [
  {
    unit: U,
    tag: "r6",
    section: {
      id: "xr-r6-spaced-practice",
      title: "記憶と学習の説明文",
      lead: "あなたは「効果的な勉強法」についての発表の準備をしていて、次の記事を見つけた。記事と表を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Studying for Tomorrow, or for Years?",
          body: `①　Many students prepare for tests in the same way: they study a topic for several hours the night before, then hope that the information will stay in their heads until the next morning. This method, often called "cramming," can work for a test the following day. However, research on memory suggests that it is one of the least effective ways to remember something for a long time.

②　The reason has to do with how memory works. When we learn something new, the memory is weak at first. If we do nothing, it fades quickly; most people forget a large part of new information within a few days. But each time we recall the information again, especially after we have started to forget it, the memory becomes stronger and fades more slowly. In other words, a little forgetting is not the enemy of learning. It is actually part of the process.

③　This idea is behind a method called "spaced practice." Instead of studying a topic for three hours in one evening, a learner might study it for one hour on three different days, with gaps between the sessions. The total study time is the same, but the results can be very different.

④　A high school teacher, Ms. Abara, tested this idea with two of her classes, which were learning the same list of 40 English words. Class A studied the words for 30 minutes on three days in a row. Class B also studied them for 30 minutes on three days, but with a week between each session. Both classes took the same test one day after their last session and again one month later. The table shows their average scores.

⑤　On the test one day later, the two classes did about equally well; in fact, Class A scored slightly higher. One month later, however, the picture had changed completely. Class A's score had dropped sharply, while Class B had kept most of what it had learned. Ms. Abara noted that students in Class B found the second and third sessions "frustrating," because they had forgotten many of the words. Yet that struggle seems to be exactly what made their memories stronger.

⑥　Why, then, do so many students still cram? One reason is that cramming feels effective. After hours of reviewing, the material seems familiar, and familiarity is easily mistaken for real learning. Spaced practice, on the other hand, often feels harder and slower, so learners may think it is not working. Another reason is simple planning: spacing requires starting early, which is difficult when there are many other things to do.

⑦　None of this means that the night before a test is useless. A short review then can still help. The point is that the most important learning should happen earlier, in several smaller sessions. Students who understand this can study the same number of hours and remember far more of what they learn — not only for the next test, but for years to come.`,
          notes: [
            { word: "cram(ming)", meaning: "つめこみ勉強（をする）" },
            { word: "fade(s)", meaning: "うすれる・消えていく" },
            { word: "in a row", meaning: "続けて・連続で" },
            { word: "familiarity", meaning: "見覚えがあること・なじみ" },
          ],
        },
        {
          kind: "table",
          caption: "Average test scores of Ms. Abara's classes (out of 40)",
          head: ["Class", "1 day after the last session", "1 month later"],
          rows: [
            ["Class A (3 days in a row)", "34", "15"],
            ["Class B (one week apart)", "32", "27"],
          ],
        },
      ],
      questions: [
        {
          id: "para2",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "第②段落の要旨として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Recalling information after we have begun to forget it makes the memory stronger.",
              "Most people can remember new information for many years without effort.",
              "Forgetting is the biggest enemy of learning and should be avoided.",
              "New memories are strong at first and become weaker over time.",
            ],
            correct: 0,
            why: [
              "each time we recall the information again, especially after we have started to forget it, the memory becomes stronger の言いかえ。",
              "多くの人は数日で大部分を忘れる、とある。",
              "a little forgetting is not the enemy of learning とあり、逆。",
              "前半は合うが、思い出すと強くなるという段落の中心が入っていない。",
            ],
          },
          point: "In other words の後ろが段落のまとめ",
          steps: [
            { title: "段落の中心", body: "{{each time we recall the information again}} … the memory becomes stronger。" },
            { title: "まとめの合図", body: "{{In other words}}, a little forgetting is not the enemy of learning。忘れかけて思い出すことが大事、が要旨です。" },
          ],
        },
        {
          id: "table",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "表と本文の内容に合うものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Class B's score fell by 5 points in a month, while Class A's fell by 19.",
              "Class B scored higher than Class A on both tests.",
              "Both classes lost about the same number of points in a month.",
              "Class A kept more than half of its first score after one month.",
            ],
            correct: 0,
            why: [
              "Class B は 32−27＝5点、Class A は 34−15＝19点下がった。",
              "1日後のテストは Class A（34）のほうが高い。",
              "下がり方は 5点 と 19点 で大きくちがう。",
              "Class A は 34点 → 15点。34の半分は17なので、半分より少ない。",
            ],
          },
          point: "表の差は自分で引き算して確かめる",
          steps: [
            { title: "引き算", body: "Class A：34 − 15 ＝ {{19}}。Class B：32 − 27 ＝ {{5}}。" },
            { title: "本文と照らす", body: "⑤段落 Class A's score had {{dropped sharply}}, while Class B had {{kept most}}。数と一致します。" },
            { title: "半分の確認", body: "34 の半分は 17。15 は 17 より小さいので「半分より多く残った」は×。" },
          ],
        },
        {
          id: "why-cram",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "第⑥段落によると、多くの生徒がつめこみ勉強を続ける理由の1つはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Material they have reviewed many times feels familiar, so they think they have learned it.",
              "Teachers usually tell students to study the night before a test.",
              "Spaced practice requires more total hours of study.",
              "Cramming helps them remember information for many years.",
            ],
            correct: 0,
            why: [
              "the material seems familiar, and familiarity is easily mistaken for real learning の言いかえ。",
              "先生がそう指示するとは書いていない。",
              "③段落に The total study time is the same とある。",
              "①段落につめこみは長く覚えるには効果が低いとある。",
            ],
          },
          point: "One reason / Another reason で理由を数える",
          steps: [
            { title: "理由1", body: "{{familiarity is easily mistaken for real learning}}：見覚えを「覚えた」と思いこむ。" },
            { title: "理由2", body: "{{spacing requires starting early}}：早く始める計画が難しい。" },
          ],
        },
        {
          id: "frustrating",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "第⑤段落で、Class B の生徒が2回目・3回目の学習を \"frustrating\" と感じたことについて、筆者はどう考えているか。",
          answer: {
            kind: "choice",
            options: [
              "The difficulty was a sign of the effort that made their memories stronger.",
              "The students should have studied the words every day instead.",
              "The test was too difficult for the students in Class B.",
              "The frustration caused Class B to forget more words than Class A.",
            ],
            correct: 0,
            why: [
              "Yet that struggle seems to be exactly what made their memories stronger の言いかえ。",
              "毎日続けて学んだのは Class A で、1か月後に大きく点が下がった。",
              "テストがむずかしすぎたとは書いていない。",
              "1か月後に多く覚えていたのは Class B。",
            ],
          },
          point: "Yet の後ろに筆者の見方がある",
          steps: [
            { title: "逆接", body: "frustrating と感じた。{{Yet}}（しかし）その苦労こそが…。" },
            { title: "②段落と結ぶ", body: "忘れかけてから思い出すと{{記憶が強くなる}}。frustrating は、まさにその「思い出す努力」の表れです。" },
          ],
        },
        {
          id: "claim",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "筆者の主張として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Most learning should be spread over several sessions, though a short review before a test can still help.",
              "Students should never study on the night before a test.",
              "Studying for more hours is the only way to remember things longer.",
              "Forgetting should be avoided by reviewing every day without gaps.",
            ],
            correct: 0,
            why: [
              "⑦段落 the most important learning should happen earlier, in several smaller sessions／A short review then can still help をまとめたもの。",
              "None of this means that the night before a test is useless とあり、言いすぎ。",
              "同じ時間（the same number of hours）でも、分ければ多く覚えられると言っている。",
              "少し忘れることは学習の一部、と言っており、間をあけることをすすめている。",
            ],
          },
          point: "最終段落の The point is … が主張",
          steps: [
            { title: "主張の合図", body: "{{The point is}} that the most important learning should happen earlier, in several smaller sessions。" },
            { title: "言いすぎに注意", body: "前の夜の短い復習も {{can still help}}。「決してしない」は本文より強すぎます。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r6",
    section: {
      id: "xr-r6-green-roofs",
      title: "都市の暑さと屋根の説明文",
      lead: "あなたは環境についての授業で、次の記事と表を読んでいる。記事と表を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Cooling Cities from the Top",
          body: `①　On a hot summer afternoon, the center of a large city can be several degrees warmer than the countryside around it. This difference is known as the "urban heat island" effect. Roads, parking lots, and dark rooftops absorb heat from the sun during the day and release it slowly at night, so the city never fully cools down. The difference is often greatest at night, when the countryside cools quickly but the city does not. As summers become hotter in many parts of the world, city planners are looking for ways to reduce this effect.

②　One idea that has attracted attention is the green roof — a roof covered with soil and plants. Plants cool the air around them in two ways. First, they shade the surface below, so less sunlight reaches the building. Second, they release water through their leaves, and this process takes heat from the surrounding air, in much the same way that sweat cools our skin.

③　To see how much difference a green roof can make, a research team in the city of Norhaven compared three types of roofs on buildings of similar size: a dark roof, a white roof painted to reflect sunlight, and a green roof. They measured the surface temperature of each roof at 2 p.m. on a sunny day in August, as well as the temperature of the room on the top floor of each building. To make the comparison fair, all three buildings faced the same direction, and no air conditioners were used on their top floors. The table shows the results.

④　As expected, the dark roof was by far the hottest. The white roof performed well, too: its surface was much cooler than that of the dark roof. The green roof, however, kept both its surface and the room below it the coolest. The researchers also pointed out benefits that do not appear in the table. Green roofs can hold rainwater during heavy storms, which reduces the risk of flooding, and they provide a home for birds and insects.

⑤　Green roofs are not a perfect solution, however. They are heavier than ordinary roofs, so older buildings may need to be made stronger before plants can be added. They also cost more to build, and they need regular care, such as removing weeds and checking that water drains properly. In dry regions, watering the plants may use a large amount of water. For these reasons, a white roof may be a more practical choice for some buildings.

⑥　The researchers concluded that cities should not depend on a single method. Instead, they suggested that each building should use the type of roof that fits its structure, budget, and climate, and that cities should combine these roofs with other measures, such as planting trees along streets. "No single roof will cool a city," one researcher said. "But thousands of well-chosen roofs might." Norhaven is now preparing a guide to help building owners choose the right roof.`,
          notes: [
            { word: "absorb", meaning: "吸収する" },
            { word: "reflect", meaning: "反射する" },
            { word: "drain(s)", meaning: "（水が）流れ出る" },
            { word: "measure(s)", meaning: "対策（名詞）／はかる（動詞）" },
          ],
        },
        {
          kind: "table",
          caption: "Temperatures measured at 2 p.m. on a sunny day in August (°C)",
          head: ["Type of roof", "Roof surface", "Room on the top floor"],
          rows: [
            ["Dark roof", "68", "33"],
            ["White roof", "41", "29"],
            ["Green roof", "32", "27"],
          ],
        },
      ],
      questions: [
        {
          id: "para2",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "第②段落によると、植物はどのようにしてまわりを涼しくするか。",
          answer: {
            kind: "choice",
            options: [
              "By shading the surface and by releasing water through their leaves.",
              "By reflecting sunlight with their white leaves.",
              "By storing heat during the day and releasing it at night.",
              "By making the roof lighter than an ordinary roof.",
            ],
            correct: 0,
            why: [
              "First, they shade the surface … Second, they release water through their leaves の2つ。",
              "日光を反射するのは白い屋根（white roof painted to reflect sunlight）。",
              "昼に熱をためて夜に出すのは、道路や暗い屋根（①段落）。",
              "緑の屋根はふつうの屋根より重い（⑤段落）。",
            ],
          },
          point: "First / Second で挙げられた2つをそろえる",
          steps: [
            { title: "2つの方法", body: "{{First}}, 日かげを作る（shade）。{{Second}}, 葉から水を出し、まわりの熱をうばう。" },
          ],
        },
        {
          id: "surface-diff",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "表によると、暗い色の屋根と緑の屋根では、屋根の表面温度に何度の差があったか。",
          answer: {
            kind: "choice",
            options: ["6°C", "9°C", "27°C", "36°C"],
            correct: 3,
            why: [
              "6°C は、暗い屋根と緑の屋根の「最上階の部屋」の差（33−27）。",
              "9°C は白い屋根と緑の屋根の表面の差（41−32）。",
              "27°C は暗い屋根と白い屋根の表面の差（68−41）。",
              "表面：暗い屋根 68°C − 緑の屋根 32°C ＝ 36°C。",
            ],
          },
          point: "どの列（表面か部屋か）の数かを確かめて引く",
          steps: [
            { title: "列をしぼる", body: "{{Roof surface}} の列：Dark 68・White 41・Green 32。" },
            { title: "計算", body: "68 − 32 ＝ {{36}}°C。" },
          ],
        },
        {
          id: "problems",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "第⑤段落で述べられている、緑の屋根の問題点はどれか。",
          answer: {
            kind: "choice",
            options: [
              "Some older buildings may have to be made stronger before a green roof is added.",
              "Green roofs make the rooms below them hotter.",
              "Green roofs increase the risk of flooding during storms.",
              "Green roofs drive birds and insects away from the city.",
            ],
            correct: 0,
            why: [
              "They are heavier … so older buildings may need to be made stronger の言いかえ。",
              "表では緑の屋根の部屋がいちばん涼しい（27°C）。",
              "④段落に、雨水をためて洪水の危険を減らすとあり、逆。",
              "④段落に、鳥や虫のすみかになるとあり、逆。",
            ],
          },
          point: "長所（④）と短所（⑤）を取りちがえない",
          steps: [
            { title: "短所の段落", body: "⑤段落：{{heavier}}・{{cost more}}・手入れが必要・乾燥地では水を多く使う。" },
            { title: "言いかえ", body: "重い → 古い建物は {{made stronger}}（補強）が必要。" },
          ],
        },
        {
          id: "white-green",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "表と本文の内容に合うものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "The white roof's surface was 9°C hotter than the green roof's, but its top-floor room was only 2°C warmer.",
              "The room under the green roof was 6°C cooler than the room under the white roof.",
              "The room under the white roof was hotter than the room under the dark roof.",
              "The table shows that green roofs reduce the risk of flooding.",
            ],
            correct: 0,
            why: [
              "表面 41−32＝9°C、部屋 29−27＝2°C で、表と合う。",
              "白と緑の部屋の差は 29−27＝2°C。6°C は暗い屋根との差。",
              "部屋は白 29°C、暗い 33°C で、白のほうが涼しい。",
              "洪水の話は benefits that do not appear in the table（表にない長所）。",
            ],
          },
          point: "「表にない」と書かれた情報は表からは言えない",
          steps: [
            { title: "白と緑の差", body: "表面：41 − 32 ＝ {{9}}°C。部屋：29 − 27 ＝ {{2}}°C。" },
            { title: "表にないもの", body: "④段落 {{benefits that do not appear in the table}}：洪水・生き物の話は表からは読み取れません。" },
          ],
        },
        {
          id: "conclusion",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "研究者たちの結論として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Cities should choose roofs that suit each building and combine them with other measures.",
              "Every building in a city should have a green roof as soon as possible.",
              "White roofs are better than green roofs in every situation.",
              "Roofs have little effect on the temperature of a city.",
            ],
            correct: 0,
            why: [
              "each building should use the type of roof that fits its structure, budget, and climate／combine … with other measures の言いかえ。",
              "should not depend on a single method とあり、すべて緑の屋根にとは言っていない。",
              "白い屋根が「一部の建物では」現実的と言っているだけ。どんな場合でもよいとは言っていない。",
              "thousands of well-chosen roofs might（町を冷やせるかもしれない）とあり、効果を認めている。",
            ],
          },
          point: "concluded that の後ろが結論。言いすぎの選択肢を消す",
          steps: [
            { title: "結論の文", body: "The researchers {{concluded that}} cities should {{not depend on a single method}}。" },
            { title: "具体的に", body: "建物の構造・予算・気候に{{合う屋根}}を選び、街路樹など{{ほかの対策}}と組み合わせる。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r6",
    section: {
      id: "xr-r6-boredom",
      title: "退屈についての論説文",
      lead: "次の英文は、雑誌のコラムである。英文を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "From a Magazine Column",
          body: `①　Most of us carry a device that can entertain us at any moment. Waiting for a bus, standing in line at a store, or sitting in a waiting room, we can watch a video, play a game, or read the news within seconds. Even a few seconds of waiting can now be filled with something to look at. As a result, many people rarely experience boredom. At first glance, this seems like a clear improvement. Few people enjoy feeling bored, after all. But I want to argue that by removing boredom from our lives, we may be losing something valuable.

②　Boredom is often described as a feeling of having nothing to do. A better description might be a feeling of wanting to do something but not finding anything satisfying. In this sense, boredom is a kind of signal. It tells us that our current situation is not meeting our needs, and it pushes us to look for something new. Without this push, we might stay in the same situation much longer than we should.

③　Boredom may also support creativity. When our minds are not focused on a task, they tend to wander. We think about the past, imagine the future, and connect ideas that seem unrelated. Many people say that their best ideas come to them in the shower or on a long walk — exactly the kinds of situations in which there is little to entertain them. A person staring out of a train window, for example, may suddenly find the answer to a problem that seemed impossible at work. If we fill every empty moment with a screen, we may give our minds fewer chances to wander in this way.

④　Of course, not all boredom is useful. Students who are bored in class every day because the lessons are too easy or too hard are not becoming more creative; they are simply losing interest in learning. Long periods of boredom can also lead people to make poor choices just to feel something different. The kind of boredom I am talking about is short and occasional: a few minutes on a train without a phone, or a quiet afternoon with no plans.

⑤　How can we bring this kind of boredom back into our lives? One simple step is to leave the phone in a bag during short waits instead of reaching for it automatically. Another is to set aside some time each week with no schedule at all. Some families also choose one evening a week without screens and spend it talking, cooking, or simply resting. At first, these empty moments may feel uncomfortable. That discomfort, however, is not a sign that something is wrong. It is the feeling of a mind that is beginning to look for its own ideas.

⑥　Technology has given us many wonderful things, and I am not suggesting that we throw our devices away. My point is simply that a life with no empty moments is not necessarily a richer life. Sometimes the most useful thing we can do with a spare moment is nothing at all.`,
          notes: [
            { word: "entertain", meaning: "楽しませる" },
            { word: "wander", meaning: "（考えが）あちこちさまよう" },
            { word: "occasional", meaning: "ときどきの" },
            { word: "spare", meaning: "空いている・余分の" },
          ],
        },
      ],
      questions: [
        {
          id: "para2",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "第②段落で、筆者は退屈をどのようなものとして説明しているか。",
          answer: {
            kind: "choice",
            options: [
              "A signal that pushes us to look for something new when our situation does not satisfy us.",
              "A feeling that only people with nothing to do experience.",
              "A sign that we are working too hard and need more rest.",
              "A feeling that keeps us in the same situation for a long time.",
            ],
            correct: 0,
            why: [
              "boredom is a kind of signal … pushes us to look for something new の言いかえ。",
              "筆者は「何もすることがない気持ち」という説明より、よい説明があると言っている。",
              "働きすぎのサインとは書いていない。",
              "逆。退屈の後押しがないと同じ状況に長くとどまってしまう、と言っている。",
            ],
          },
          point: "A better description … の後が筆者の定義",
          steps: [
            { title: "定義の言いかえ", body: "よくある説明 → {{A better description}}：したいのに満足できるものが見つからない気持ち。" },
            { title: "はたらき", body: "{{a kind of signal}}。今の状況が合っていないと知らせ、{{look for something new}} へ押し出す。" },
          ],
        },
        {
          id: "creativity",
          type: "C",
          difficulty: 2,
          points: 16,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "第③段落によると、すきま時間をいつも画面で埋めることがなぜ創造性にとってよくないのか。",
          answer: {
            kind: "choice",
            options: [
              "It gives our minds fewer chances to wander and connect ideas.",
              "Screens make it harder for us to focus on a single task.",
              "Videos and games give us too many new ideas at once.",
              "People stop taking long walks and showers.",
            ],
            correct: 0,
            why: [
              "we may give our minds fewer chances to wander in this way とある。さまよう中で考えが結びつく。",
              "集中できなくなるという話ではない。むしろ集中していないときに考えがさまよう。",
              "画面からアイデアが多く入りすぎるとは書いていない。",
              "散歩やシャワーをやめるとは書いていない。例として挙げているだけ。",
            ],
          },
          point: "If … の文が結論。in this way が指す内容を確かめる",
          steps: [
            { title: "創造性のしくみ", body: "集中していないとき、心は {{wander}} し、{{connect ideas}} する。" },
            { title: "結論", body: "画面で埋めると {{fewer chances to wander}}。" },
          ],
        },
        {
          id: "para4-role",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "第④段落は、文章全体の中でどのような役割をしているか。",
          answer: {
            kind: "choice",
            options: [
              "It limits the writer's argument by explaining which kind of boredom is not helpful.",
              "It gives a new reason why all kinds of boredom are valuable.",
              "It shows that the writer has changed his or her mind about boredom.",
              "It introduces the main topic of the essay for the first time.",
            ],
            correct: 0,
            why: [
              "Of course, not all boredom is useful と、役に立たない退屈を示し、筆者の言う退屈は short and occasional なものだと範囲をしぼっている。",
              "すべての退屈に価値があるとは言っていない。逆。",
              "考えを変えたのではなく、主張の範囲を説明している。",
              "テーマは①段落ですでに示されている。",
            ],
          },
          point: "Of course, … は反論を認めて主張の範囲をしぼる合図",
          steps: [
            { title: "合図", body: "{{Of course, not all boredom is useful}}：反対の例を先に認める。" },
            { title: "しぼりこみ", body: "筆者が言う退屈は {{short and occasional}} なものだけ。毎日の授業の退屈や長い退屈はふくまない。" },
          ],
        },
        {
          id: "claim",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "筆者の主張として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Short, occasional boredom can be valuable, so we should sometimes leave empty moments unfilled.",
              "We should throw away our devices to become more creative.",
              "Every kind of boredom helps us become more creative.",
              "Students should be bored in class so that they can think more freely.",
            ],
            correct: 0,
            why: [
              "④段落の short and occasional、⑤段落の具体策、⑥段落 a life with no empty moments is not necessarily a richer life をまとめたもの。",
              "I am not suggesting that we throw our devices away とあり、逆。",
              "not all boredom is useful とあり、言いすぎ。",
              "授業で毎日退屈する生徒は興味を失うだけ、と④段落にある。",
            ],
          },
          point: "My point is … が主張。言いすぎを消す",
          steps: [
            { title: "主張の合図", body: "{{My point is simply that}} a life with no empty moments is not necessarily a richer life。" },
            { title: "条件", body: "価値があるのは {{short and occasional}} な退屈。機器を捨てろとは言っていません。" },
          ],
        },
        {
          id: "title",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "このコラムのタイトルとして最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Why Doing Nothing Can Be Worth Something",
              "How to Choose the Best Device for Your Free Time",
              "The Dangers of Taking Long Walks",
              "Boredom in the Classroom",
            ],
            correct: 0,
            why: [
              "何もしない時間（退屈）に価値がある、という全体の主張を表している。",
              "機器の選び方の話はしていない。",
              "長い散歩はアイデアが浮かぶ場面の例で、危険とは言っていない。",
              "授業の退屈は④段落の一部だけ。しかも筆者が「役に立たない」とした例。",
            ],
          },
          point: "タイトルは全段落をおおう主張を表すもの",
          steps: [
            { title: "全体の主張", body: "①問題提起 →②③退屈の価値 →④範囲 →⑤取りもどし方 →⑥{{何もしない時間にも価値}}。" },
            { title: "せまい・ずれた選択肢", body: "④段落だけの話（教室の退屈）や、例を取りちがえたもの（散歩）は×。" },
          ],
        },
      ],
    },
  },
];

export const ENG_READING_POOL: ExamPoolSection[] = [...R1, ...R2, ...R3, ...R4, ...R5, ...R6];
