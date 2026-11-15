// 共通テスト型「英語リスニング」の試験モード専用の問題 (lib/exam/pool)。英文・場面・人名・店名・数字はすべてオリジナル
// (この試験モードのために書いた。実在の試験・教科書・市販教材・ニュース記事の文は使っていない)。
// 放送文は 〔放送〕…〔/放送〕 (2回まで) / 〔放送1回〕…〔/放送〕 でかこみ、中は英語だけ。数・時刻・値段は語で書く (読み上げ用)。
// l1 短い発話 12問 (難1×8・難2×4) / l2 対話 10問 (1:2:3＝3:5:2) / l3 条件に合うもの 6問 (難2×3・難3×3) / l4 講義 3セット×3問。
// 計算の検算 (手で確認済み): l1 museum 9時＋1時間＝10時 / l2 express 3:00＋25分＝3:25 (各駅は 2:40＋50分＝3:30)・T-shirt 15×2−5＝25ドル
// l4 food 4キロの4分の1＝1キロ・4キロ→2キロで約半分。
import type { QuestionC } from "@/lib/moshi/types";
import type { ExamPoolSection } from "./types";

const U = "h-eng-skill-listening";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "音声が流れる前に、選択肢を「先読み」する");
const S2 = L(2, "英語は「強・弱」のリズムで進む");
const S4 = L(4, "答えは、放送の「言いかえ」で選ぶ");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const q = (id: string, difficulty: 1 | 2 | 3, seconds: number, skill: QuestionC["skill"] = "思考・判断・表現") => ({
  id,
  type: "C" as const,
  difficulty,
  points: P[difficulty],
  seconds,
  skill,
});

const L1P = "英文を聞き、その内容に最も近いものを選べ。\n";
const L2P = "対話を聞き、問いに答えよ。\n";

// ---- l1 短い発話 ----
const SHORT: QuestionC[] = [
  {
    ...q("borrow-umbrella", 1, 40, "知識・技能"),
    prompt: `${L1P}〔放送〕Could I borrow your umbrella? I left mine at home this morning.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "The speaker wants to use someone else's umbrella.",
        "The speaker wants to lend an umbrella to a friend.",
        "The speaker lost an umbrella on the way home.",
        "The speaker bought a new umbrella this morning.",
      ],
      correct: 0,
      why: [
        "Could I borrow your umbrella?（あなたの傘を借りてもいい？）を use someone else's umbrella と言いかえている。",
        "borrow は「借りる」。lend（貸す）と逆。",
        "I left mine at home は「家に置いてきた」。なくしたのではない。",
        "買ったとは言っていない。this morning は家に置いてきた時。",
      ],
    },
    point: "borrow は借りる・lend は貸す",
    steps: [
      { title: "先読み", body: "選択肢はどれも umbrella の話。{{だれがどうする}}かを聞き分けます。", back: [S1] },
      { title: "動詞を聞く", body: "{{borrow}}（借りる）と lend（貸す）の取りちがえに注意。mine は my umbrella のこと。", back: [S4] },
    ],
  },
  {
    ...q("missed-bus", 1, 40, "知識・技能"),
    prompt: `${L1P}〔放送〕I missed the first bus, so I had to wait twenty minutes for the next one.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "The speaker caught the first bus.",
        "The speaker waited for a later bus.",
        "The speaker walked instead of taking the bus.",
        "The bus was twenty minutes late.",
      ],
      correct: 1,
      why: [
        "missed the first bus（最初のバスに乗りそこねた）と言っている。",
        "wait twenty minutes for the next one（次のバスを20分待った）を waited for a later bus と言いかえている。",
        "歩いたとは言っていない。次のバスを待った。",
        "twenty minutes は話し手が待った時間。バスが遅れたのではない。",
      ],
    },
    point: "miss the bus＝乗りそこねる",
    steps: [
      { title: "言いかえ", body: "{{missed}} は「乗りそこねた」。the next one は {{the next bus}}。", back: [S4] },
      { title: "数のわな", body: "twenty minutes は{{待った時間}}。バスの遅れの時間ではありません。", back: [S4] },
    ],
  },
  {
    ...q("essay-not-yet", 1, 40, "知識・技能"),
    prompt: `${L1P}〔放送〕I've finished my math homework, but I haven't started the English essay yet.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "The speaker has finished all the homework.",
        "The speaker has not started the math homework.",
        "The speaker still has to write the English essay.",
        "The speaker finished the essay before the math homework.",
      ],
      correct: 2,
      why: [
        "英語の作文は haven't started ... yet（まだ始めていない）ので、全部は終わっていない。",
        "数学の宿題は I've finished（終わった）。",
        "haven't started the English essay yet（まだ作文に手をつけていない）＝これから書かなければならない。",
        "作文はまだ始めてもいない。",
      ],
    },
    point: "but のあとの「まだ〜していない」を聞く",
    steps: [
      { title: "but の前後", body: "前半は数学＝{{終わった}}、{{but}} のあとは英作文＝{{まだ}}。対比で整理します。", back: [S2] },
    ],
  },
  {
    ...q("sister-dogs", 1, 40, "知識・技能"),
    prompt: `${L1P}〔放送〕My sister used to have a cat, but now she has two dogs.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "The speaker's sister has a cat and two dogs.",
        "The speaker's sister has two cats.",
        "The speaker's sister wants to have two dogs.",
        "The speaker's sister has dogs now.",
      ],
      correct: 3,
      why: [
        "used to have a cat は「昔はねこを飼っていた」。今はねこはいない。",
        "ねこは以前の1匹だけ。two は犬の数。",
        "wants ではなく now she has（今飼っている）。",
        "but now she has two dogs（今は犬を2匹飼っている）と合う。",
      ],
    },
    point: "used to 〜＝以前は〜（今はちがう）",
    steps: [
      { title: "used to", body: "{{used to have}} は「以前は飼っていた」。今はもう飼っていないことをふくみます。", back: [S4] },
      { title: "now のあと", body: "{{now}} のあとが今のようす：犬が2匹。", back: [S2] },
    ],
  },
  {
    ...q("bakery-closed", 1, 40, "知識・技能"),
    prompt: `${L1P}〔放送〕The bakery near the station is closed today, so let's buy bread at the supermarket.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "The speaker suggests going to the supermarket.",
        "The bakery near the station is open today.",
        "The speaker suggests going to the bakery.",
        "The supermarket is closed today.",
      ],
      correct: 0,
      why: [
        "let's buy bread at the supermarket（スーパーでパンを買おう）＝スーパーへ行こうという提案。",
        "パン屋は closed today（今日は休み）。",
        "パン屋は休みなので、そこへ行こうとは言っていない。",
        "閉まっているのはパン屋。スーパーではない。",
      ],
    },
    point: "let's 〜 は提案。so のあとが結論",
    steps: [
      { title: "so のあと", body: "理由（パン屋が休み）→ {{so}} → 提案（{{let's}} スーパーで買おう）の順です。", back: [S4] },
    ],
  },
  {
    ...q("turn-down-music", 1, 40, "知識・技能"),
    prompt: `${L1P}〔放送〕Could you turn down the music? I'm trying to study for tomorrow's test.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "The speaker wants to listen to music while studying.",
        "The speaker wants the music to be quieter.",
        "The speaker had a test today.",
        "The speaker wants the music to be louder.",
      ],
      correct: 1,
      why: [
        "音楽を聞きながら勉強したいとは言っていない。むしろじゃまになっている。",
        "turn down（音を小さくする）を quieter と言いかえている。",
        "テストは tomorrow（明日）。",
        "louder は turn up。turn down の逆。",
      ],
    },
    point: "turn down＝音を小さくする",
    steps: [
      { title: "依頼の中身", body: "Could you 〜? は依頼。{{turn down}} は「（音量を）下げる」＝{{quieter}}。", back: [S4] },
    ],
  },
  {
    ...q("warmer-today", 1, 40, "知識・技能"),
    prompt: `${L1P}〔放送〕It's much warmer today than yesterday. I don't need my coat.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "It is colder today than yesterday.",
        "The speaker needs a coat today.",
        "The speaker is not going to wear a coat.",
        "It was warmer yesterday than today.",
      ],
      correct: 2,
      why: [
        "warmer today（今日のほうが暖かい）と逆。",
        "I don't need my coat（コートはいらない）と逆。",
        "コートがいらない＝着ていかない、と言いかえている。",
        "暖かいのは今日。昨日ではない。",
      ],
    },
    point: "比較は「どちらが」を確かめる",
    steps: [
      { title: "比べる2つ", body: "{{today}} と yesterday を比べ、暖かいのは {{today}}。", back: [S2] },
      { title: "言いかえ", body: "don't need my coat → {{not going to wear a coat}}。", back: [S4] },
    ],
  },
  {
    ...q("start-without-me", 1, 40, "知識・技能"),
    prompt: `${L1P}〔放送〕I'll be a little late for practice. Please start without me.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "The speaker will not come to practice at all.",
        "The speaker wants the others to wait.",
        "Practice has been cancelled.",
        "The speaker asks the others to begin before the speaker arrives.",
      ],
      correct: 3,
      why: [
        "a little late（少し遅れる）なので、来ないのではない。",
        "start without me（わたしぬきで始めて）なので、待ってほしいのではない。",
        "練習が中止とは言っていない。",
        "Please start without me を begin before the speaker arrives と言いかえている。",
      ],
    },
    point: "late は遅れる。来ないのではない",
    steps: [
      { title: "2文をつなぐ", body: "{{a little late}}（少し遅れる）＋ {{start without me}}（先に始めて）＝到着前に始めてほしい。", back: [S4] },
    ],
  },
  {
    ...q("cold-concert", 2, 50),
    prompt: `${L1P}〔放送〕I would have gone to the concert if I hadn't caught a cold.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "The speaker did not go to the concert because of a cold.",
        "The speaker went to the concert and caught a cold there.",
        "The speaker is going to the concert next week.",
        "The speaker did not catch a cold.",
      ],
      correct: 0,
      why: [
        "仮定法過去完了。「かぜをひかなかったら行ったのに」＝実際はかぜをひいて行かなかった。",
        "実際はコンサートに行っていない。",
        "これからの予定の話はしていない。",
        "if I hadn't caught a cold は事実と逆の仮定。実際はかぜをひいた。",
      ],
    },
    point: "would have＋過去分詞は「実際はしなかった」",
    steps: [
      { title: "仮定法を事実に直す", body: "{{would have gone}}（行っただろうに）→ 実際は{{行かなかった}}。hadn't caught → 実際は{{かぜをひいた}}。", back: [S4] },
    ],
  },
  {
    ...q("museum-later", 2, 50),
    prompt: `${L1P}〔放送〕The museum usually opens at nine, but today it opens an hour later.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "The museum opens at nine today.",
        "The museum opens at eight today.",
        "The museum opens at ten today.",
        "The museum usually opens at ten.",
      ],
      correct: 2,
      why: [
        "nine はふだんの開館時刻。今日はそれより1時間遅い。",
        "an hour later（1時間遅く）なので、早まってはいない。",
        "ふだん9時＋1時間遅く＝今日は10時。",
        "ふだんは nine（9時）。",
      ],
    },
    point: "聞こえた数ではなく、計算した数を選ぶ",
    steps: [
      { title: "計算", body: "ふだん {{nine}}（9時）＋ {{an hour later}}（1時間遅く）＝ 今日は{{10時}}。", trap: "聞こえた nine にとびつかない。", back: [S1, S4] },
    ],
  },
  {
    ...q("fewer-students", 2, 50),
    prompt: `${L1P}〔放送〕Not as many students came to the festival this year as last year.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "More students came to the festival this year.",
        "Fewer students came to the festival this year.",
        "The same number of students came both years.",
        "No students came to the festival last year.",
      ],
      correct: 1,
      why: [
        "not as many 〜 as …（…ほど多くない）なので、今年のほうが少ない。",
        "not as many as last year＝去年ほど多くない＝今年は fewer（より少ない）。",
        "not があるので「同じくらい」ではない。",
        "去年はむしろ今年より多く来ている。",
      ],
    },
    point: "not as 〜 as …＝…ほど〜でない",
    steps: [
      { title: "否定の比較", body: "{{Not as many}} 〜 as last year ＝「去年ほど多くない」→ 今年は {{fewer}}。", back: [S4] },
    ],
  },
  {
    ...q("never-castle", 2, 50),
    prompt: `${L1P}〔放送〕Kate has lived in this town for three years, and she has never been to the castle.〔/放送〕`,
    answer: {
      kind: "choice",
      options: [
        "Kate visited the castle when she moved to the town.",
        "Kate is going to move to another town in three years.",
        "Kate has visited the castle three times.",
        "Kate has not visited the castle yet.",
      ],
      correct: 3,
      why: [
        "has never been to the castle（一度も行ったことがない）と合わない。",
        "for three years は「3年間住んでいる」。3年後に引っ越すのではない。",
        "three は住んでいる年数。行った回数ではない。",
        "has never been to（一度も行ったことがない）を has not visited yet と言いかえている。",
      ],
    },
    point: "have never been to 〜＝〜へ行ったことがない",
    steps: [
      { title: "現在完了の2つ", body: "{{has lived ... for three years}} は継続（3年住んでいる）、{{has never been to}} は経験（行ったことがない）。", back: [S4] },
      { title: "数のわな", body: "three は{{住んだ年数}}。回数の選択肢にまどわされないように。", back: [S1] },
    ],
  },
];

// ---- l2 対話 ----
const DIALOG: QuestionC[] = [
  {
    ...q("lunch-place", 1, 60),
    prompt: `${L2P}〔放送〕
Emma: Shall we have lunch at the new noodle shop?
Ryo: I went there yesterday. How about the sandwich place instead?
Emma: Sure. I haven't been there for a while.
Ryo: Great. Let's meet at the front gate at noon.
〔/放送〕
問い：二人は昼食をどこで食べるか。`,
    answer: {
      kind: "choice",
      options: ["新しいめん類の店", "サンドイッチの店", "学校の正門の前", "Ryo の家"],
      correct: 1,
      why: [
        "Emma が最初に提案したが、Ryo は I went there yesterday と言って別の店を提案した。",
        "Ryo の How about the sandwich place instead? に Emma が Sure と同意している。",
        "front gate は待ち合わせの場所。食べる場所ではない。",
        "Ryo の家の話は出てこない。",
      ],
    },
    point: "提案→同意（Sure）で決まったものを選ぶ",
    steps: [
      { title: "先読み", body: "選択肢はすべて場所。{{どこで食べるか}}にしぼって聞きます。", back: [S1] },
      { title: "決まった案", body: "{{instead}} で別の案が出て、{{Sure}} で決定。最初の案（noodle shop）ではありません。", back: [S4] },
    ],
  },
  {
    ...q("bookmark-gift", 1, 60),
    prompt: `${L2P}〔放送〕
Clerk: Hello. Can I help you?
Customer: Yes, I'm looking for a birthday present for my brother. He likes reading.
Clerk: How about this book about space? It's very popular.
Customer: He already has that one. Do you have any bookmarks?
Clerk: Yes, they're over there, next to the cards.
Customer: Perfect. I'll take a look.
〔/放送〕
問い：客はこのあと何を見に行くか。`,
    answer: {
      kind: "choice",
      options: ["宇宙についての本", "誕生日のカード", "しおり", "兄弟のための本棚"],
      correct: 2,
      why: [
        "He already has that one（もう持っている）と断っている。",
        "cards は「しおりのとなりにある」と場所を説明するために出てきただけ。",
        "Do you have any bookmarks? → over there → I'll take a look（見てみます）。",
        "本棚の話は出てこない。",
      ],
    },
    point: "最後の I'll 〜 が「このあとの行動」",
    steps: [
      { title: "断った物を消す", body: "本は {{already has}}（もう持っている）で消えます。", back: [S4] },
      { title: "最後の発言", body: "bookmarks の場所を聞き、{{I'll take a look}}。cards は場所の目印です。", back: [S1] },
    ],
  },
  {
    ...q("zoo-sunday", 1, 60),
    prompt: `${L2P}〔放送〕
Mia: Are you going to the zoo with your family on Saturday?
Ken: We were, but it's going to rain. So we'll go on Sunday instead.
Mia: Lucky you. I have to help at my aunt's shop all weekend.
Ken: That sounds busy.
〔/放送〕
問い：Ken はいつ動物園へ行くか。`,
    answer: {
      kind: "choice",
      options: ["土曜日", "土曜日と日曜日の両方", "行かないことにした", "日曜日"],
      correct: 3,
      why: [
        "We were（その予定だった）but it's going to rain で土曜はやめた。",
        "行くのは日曜だけ。all weekend は Mia がおばの店を手伝う期間。",
        "行かないのではなく、日にちを変えた。",
        "So we'll go on Sunday instead（代わりに日曜に行く）。",
      ],
    },
    point: "We were, but 〜 は「予定だったが変更」",
    steps: [
      { title: "予定の変更", body: "{{We were}}（行く予定だった）＋ {{but}} 雨 → {{Sunday instead}}。", back: [S4] },
    ],
  },
  {
    ...q("express-train", 2, 75),
    prompt: `${L2P}〔放送〕
Woman: Excuse me. When does the next train to Lakeside leave?
Man: The next one leaves at two forty, but it's a local train. It takes fifty minutes.
Woman: Is there a faster one?
Man: The express leaves at three o'clock and takes only twenty-five minutes.
Woman: Then I'll take the express.
〔/放送〕
問い：女性が Lakeside に着くのは何時か。`,
    answer: {
      kind: "choice",
      options: ["2時40分", "3時", "3時25分", "3時30分"],
      correct: 2,
      why: [
        "2時40分は各駅停車の出発時刻。女性はこれに乗らない。",
        "3時は急行の出発時刻。着く時刻ではない。",
        "急行は3時発・25分かかるので、3時＋25分＝3時25分に着く。",
        "各駅停車（2時40分発・50分）なら 2時40分＋50分＝3時30分。女性は急行に乗る。",
      ],
    },
    point: "どちらに乗るか決めてから、出発＋所要時間",
    steps: [
      { title: "乗る電車", body: "最後に {{I'll take the express}}。急行は {{three o'clock}} 発・{{twenty-five minutes}}。", back: [S1] },
      { title: "計算", body: "3時＋25分＝{{3時25分}}。各駅なら 2時40分＋50分＝3時30分で、こちらはわな。", trap: "聞こえた時刻（3時）をそのまま選ばない。", back: [S4] },
    ],
  },
  {
    ...q("car-key", 2, 70),
    prompt: `${L2P}〔放送〕
Dad: Have you seen my car key? I always leave it by the door.
Lucy: Mom borrowed it this morning. She drove to the supermarket.
Dad: Really? When will she be back?
Lucy: She said she'd be home before lunch.
〔/放送〕
問い：車のかぎはいまどうなっているか。`,
    answer: {
      kind: "choice",
      options: ["母親が持って出かけている", "ドアのそばに置いてある", "スーパーに置き忘れてある", "Lucy が持っている"],
      correct: 0,
      why: [
        "Mom borrowed it ... She drove to the supermarket（母が借りて車で出かけた）。まだ帰っていない。",
        "by the door はいつも置く場所。今はそこにない。",
        "置き忘れたとは言っていない。母は車で出かけている途中。",
        "Lucy は場所を教えているだけ。",
      ],
    },
    point: "いつもの場所と、いまの場所を分ける",
    steps: [
      { title: "いつも vs いま", body: "{{always}} leave it by the door はふだんの話。いまは {{Mom borrowed it}}。", back: [S4] },
      { title: "まだ帰らない", body: "When will she be back? → {{before lunch}}。まだ外出中です。", back: [S1] },
    ],
  },
  {
    ...q("piano-break", 2, 70),
    prompt: `${L2P}〔放送〕
Sam: I heard you joined the drama club. How is it?
Nina: It's fun, but we practice every day until six thirty.
Sam: Wow. Do you still have time for your piano lessons?
Nina: Not really. I've decided to take a break from them for now.
〔/放送〕
問い：Nina について正しいものはどれか。`,
    answer: {
      kind: "choice",
      options: ["演劇部をやめるつもりだ", "しばらくピアノのレッスンを休む", "演劇部の練習は毎日6時に始まる", "ピアノの練習を毎日している"],
      correct: 1,
      why: [
        "It's fun と言っていて、やめるとは言っていない。",
        "take a break from them for now（今はレッスンを休む）。them は piano lessons。",
        "until six thirty は「6時半まで」。始まる時刻ではない。",
        "毎日しているのは演劇部の練習。ピアノは休む。",
      ],
    },
    point: "them が何を指すかをつかむ",
    steps: [
      { title: "代名詞", body: "{{take a break from them}} の them は直前の {{piano lessons}}。", back: [S4] },
      { title: "時刻のわな", body: "{{until}} six thirty は「6時半まで」。始まる時刻とまちがえないように。", back: [S2] },
    ],
  },
  {
    ...q("two-shirts", 2, 75),
    prompt: `${L2P}〔放送〕
Clerk: These T-shirts are fifteen dollars each, but if you buy two, you get five dollars off the total.
Customer: OK. I'll take two, a blue one and a white one.
Clerk: Sure. Would you like a bag? It's one dollar.
Customer: No, thank you. I have my own.
〔/放送〕
問い：客が払う金額はいくらか。`,
    answer: {
      kind: "choice",
      options: ["20ドル", "25ドル", "26ドル", "30ドル"],
      correct: 1,
      why: [
        "15ドルから5ドル引いた10ドルを2枚分と考えたまちがい。値引きは合計（the total）から5ドル。",
        "15×2＝30ドル、合計から5ドル引いて25ドル。袋は断ったので足さない。",
        "袋（1ドル）を買うとした場合。客は No, thank you と断った。",
        "値引き前の合計。2枚買うと5ドル引かれる。",
      ],
    },
    point: "値引きは「1枚ごと」か「合計から」かを聞く",
    steps: [
      { title: "計算", body: "15ドル×2＝30ドル、{{five dollars off the total}} で 30−5＝{{25ドル}}。", back: [S1] },
      { title: "断ったものは足さない", body: "袋（one dollar）は {{No, thank you}}。足すと 26ドルのわなです。", back: [S4] },
    ],
  },
  {
    ...q("movie-tomorrow", 2, 70),
    prompt: `${L2P}〔放送〕
Ben: Do you want to come to the movies with us tonight?
Aya: I'd love to, but I promised to help my grandmother move some furniture.
Ben: Oh, that's too bad. How about tomorrow?
Aya: Tomorrow works. Just send me the time.
〔/放送〕
問い：Aya について分かることは何か。`,
    answer: {
      kind: "choice",
      options: ["今夜、Ben たちと映画に行く", "祖母といっしょに映画に行く", "明日、祖母の手伝いをする", "明日なら映画に行ける"],
      correct: 3,
      why: [
        "I'd love to, but 〜 は遠回しな断り。今夜は祖母の手伝い。",
        "祖母とは家具を動かす約束。映画ではない。",
        "祖母の手伝いは今夜（tonight）。",
        "How about tomorrow? に Tomorrow works（明日なら大丈夫）と答えている。",
      ],
    },
    point: "I'd love to, but 〜 は断り。代わりの日に注意",
    steps: [
      { title: "断りの表現", body: "{{I'd love to, but}} 〜 は「行きたいけれど無理」。今夜はだめです。", back: [S4] },
      { title: "代わりの案", body: "How about tomorrow? → {{Tomorrow works}}＝明日なら行ける。", back: [S4] },
    ],
  },
  {
    ...q("meeting-wednesday", 3, 85),
    prompt: `${L2P}〔放送〕
Olivia: Did you get Mr. Brown's message about the science club meeting?
Daniel: Yes. It's been moved from Thursday to Friday, right?
Olivia: That was the first plan. But he sent another message. It's going to be on Wednesday now, because he's away on Friday.
Daniel: Wednesday? That's tomorrow. I'd better finish my report tonight.
〔/放送〕
問い：科学部の集まりは何曜日に開かれるか。`,
    answer: {
      kind: "choice",
      options: ["火曜日", "水曜日", "木曜日", "金曜日"],
      correct: 1,
      why: [
        "That's tomorrow から、今日が火曜日と分かるだけ。集まりの日ではない。",
        "2通目のメッセージで on Wednesday now に変わった。Daniel も That's tomorrow と確認している。",
        "木曜はもとの予定。最初に金曜へ移された。",
        "金曜は最初の変更案。Mr. Brown が金曜にいないため、さらに変わった。",
      ],
    },
    point: "変更が2回。最後の情報（now）を選ぶ",
    steps: [
      { title: "流れを追う", body: "木曜 → 金曜（{{the first plan}}）→ {{But}} 別のメッセージ → 水曜（{{now}}）。", back: [S4] },
      { title: "わなを消す", body: "That's tomorrow から今日は火曜。火曜は{{今日}}で、集まりの日ではありません。", trap: "最初に聞こえた Thursday・Friday にとびつかない。", back: [S1] },
    ],
  },
  {
    ...q("wait-for-sale", 3, 85),
    prompt: `${L2P}〔放送〕
Hana: This bag is nice, but it's a bit too expensive for me.
Clerk: We'll have a sale next week. Everything will be thirty percent off.
Hana: Really? Then maybe I can wait.
Clerk: But this color is very popular. It may be sold out by then.
Hana: Hmm. I'll take that risk.
〔/放送〕
問い：Hana はどうすることにしたか。`,
    answer: {
      kind: "choice",
      options: ["いますぐそのかばんを買う", "来週のセールまで待つ", "別の色のかばんを買う", "かばんを取っておいてもらう"],
      correct: 1,
      why: [
        "too expensive for me と言っており、いま買うとは言っていない。",
        "売り切れるかもしれないと言われても I'll take that risk（その危険をおかす）＝セールまで待つ。",
        "別の色の話はしていない。",
        "取り置きを頼んではいない。",
      ],
    },
    point: "take the risk＝危険を承知で（待つ）",
    steps: [
      { title: "流れ", body: "高い → セールがある → {{I can wait}} → 売り切れるかも → {{I'll take that risk}}。", back: [S4] },
      { title: "意図を読む", body: "that risk は「売り切れる危険」。それを受け入れる＝{{待つ}}ことに決めた。", back: [S4] },
    ],
  },
];

// ---- l3 条件に合うもの ----
const COND: QuestionC[] = [
  {
    ...q("study-cafe", 2, 110),
    prompt: `あなたは放課後に勉強するカフェを探していて、条件は次の3つです。
A. 午後8時まで開いている　B. パソコンの充電ができる　C. 駅から歩いて10分以内
4つのカフェの説明を聞き、条件をすべて満たすものを選べ。
〔放送1回〕
Maple Cafe is open until ten at night, and every table has a power outlet. It's about a fifteen-minute walk from the station.
Blue Door is right next to the station and has power outlets, but it closes at six in the evening.
Corner Table is a five-minute walk from the station and stays open until nine. Sorry, there are no outlets for customers.
Green Leaf is open until eight thirty, and you can charge your computer at the counter seats. It takes about seven minutes on foot from the station.
〔/放送〕`,
    answer: {
      kind: "choice",
      options: ["Blue Door", "Corner Table", "Green Leaf", "Maple Cafe"],
      correct: 2,
      why: [
        "駅のすぐとなり・充電できるが、closes at six（6時閉店）で A を満たさない。",
        "駅から5分・9時までだが、no outlets for customers（客用コンセントなし）で B を満たさない。",
        "8時半まで（A）・カウンター席で充電できる（B）・駅から徒歩約7分（C）。3つとも満たす。",
        "10時まで・全席コンセントだが、fifteen-minute walk（徒歩15分）で C を満たさない。",
      ],
    },
    point: "条件ごとに○×をつけて、全部○を選ぶ",
    steps: [
      { title: "表を作って聞く", body: "条件 A・B・C を横、4店を縦に並べ、聞きながら{{○×}}をつけます。1回しか流れません。", back: [S1] },
      { title: "言いかえ", body: "power outlet・{{charge your computer}} → 充電できる、{{seven minutes on foot}} → 徒歩10分以内。", back: [S4] },
    ],
  },
  {
    ...q("summer-program", 2, 110),
    prompt: `あなたは夏休みの海外研修プログラムを1つ選ぼうとしていて、条件は次の3つです。
A. 期間が2週間まで　B. 英語の授業がある　C. 費用が千ドルまで
4つのプログラムの説明を聞き、条件をすべて満たすものを選べ。
〔放送1回〕
The River Program lasts three weeks. You have English classes every morning, and it costs nine hundred dollars.
The Sky Program is a ten-day program with English lessons in the afternoon and sightseeing on weekends. It costs eight hundred and fifty dollars.
The Forest Program lasts two weeks. There are no classes, because the program focuses on volunteer work. The cost is seven hundred dollars.
The Ocean Program is only one week long and includes English classes, but it costs twelve hundred dollars.
〔/放送〕`,
    answer: {
      kind: "choice",
      options: ["Forest Program", "Ocean Program", "River Program", "Sky Program"],
      correct: 3,
      why: [
        "2週間・700ドルだが、no classes（授業なし）で B を満たさない。",
        "1週間・授業ありだが、1200ドルで C を満たさない。",
        "授業あり・900ドルだが、three weeks（3週間）で A を満たさない。",
        "10日間（A）・午後に英語の授業（B）・850ドル（C）で、3つとも満たす。",
      ],
    },
    point: "数の条件は、聞きながら基準と比べる",
    steps: [
      { title: "先読み", body: "A は{{日数}}、C は{{金額}}。数が出たら基準（2週間・千ドル）と比べます。", back: [S1] },
      { title: "判定", body: "ten-day → 2週間まで○、{{eight hundred and fifty}} → 千ドルまで○。River は3週間、Ocean は {{twelve hundred}} で×。", back: [S4] },
    ],
  },
  {
    ...q("saturday-movie", 2, 110),
    prompt: `あなたは友だちと土曜日に見る映画を選ぼうとしていて、条件は次の3つです。
A. 午後5時より後に始まる　B. 上映時間が2時間まで　C. 字幕がある
4つの映画の説明を聞き、条件をすべて満たすものを選べ。
〔放送1回〕
Night Train starts at six on Saturday. It's two hours and twenty minutes long, and it has subtitles.
Little Star begins at five thirty on Saturday. It runs for an hour and forty-five minutes, and subtitles are shown.
Silver Road is on Saturday at three in the afternoon. It's ninety minutes long, with subtitles.
Wild Garden starts at seven on Saturday evening and lasts about one hundred minutes. This one has no subtitles.
〔/放送〕`,
    answer: {
      kind: "choice",
      options: ["Little Star", "Night Train", "Silver Road", "Wild Garden"],
      correct: 0,
      why: [
        "5時半開始（A）・1時間45分（B）・字幕あり（C）で、3つとも満たす。",
        "6時開始・字幕ありだが、2時間20分で B を満たさない。",
        "90分・字幕ありだが、午後3時開始で A を満たさない。",
        "7時開始・100分（1時間40分）だが、no subtitles で C を満たさない。",
      ],
    },
    point: "分で言われた長さは時間に直して比べる",
    steps: [
      { title: "長さをそろえる", body: "{{ninety minutes}}＝1時間30分、{{one hundred minutes}}＝1時間40分。2時間を{{こえる}}のは Night Train だけ。", back: [S2] },
      { title: "全部○", body: "Silver Road は {{three}}（3時）で A が×、Wild Garden は {{no subtitles}} で C が×。", back: [S4] },
    ],
  },
  {
    ...q("hotel-choice", 3, 120),
    prompt: `あなたは旅行で泊まるホテルを選んでいて、条件は次の3つです。
A. 1泊100ドル未満　B. 朝食が料金にふくまれている　C. 空港まで無料のバスがある
4つのホテルの説明を聞き、条件をすべて満たすものを選べ。
〔放送1回〕
At Harbor Hotel, a room is ninety-five dollars a night. Breakfast is available for an extra ten dollars, and a free shuttle bus goes to the airport every hour.
Hilltop Inn charges one hundred and ten dollars a night, but that includes breakfast. You can also take a free bus to the airport.
At Park Lodge, rooms cost eighty dollars, breakfast included. The airport bus costs five dollars each way.
City Rest is ninety dollars a night with breakfast. And the bus to the airport won't cost you anything.
〔/放送〕`,
    answer: {
      kind: "choice",
      options: ["City Rest", "Harbor Hotel", "Hilltop Inn", "Park Lodge"],
      correct: 0,
      why: [
        "90ドル（A）・with breakfast（B）・won't cost you anything（無料＝C）で、3つとも満たす。",
        "95ドル・無料バスありだが、朝食は for an extra ten dollars（別料金）で B を満たさない。",
        "朝食こみ・無料バスありだが、110ドルで A を満たさない。",
        "80ドル・朝食こみだが、バスは five dollars each way（片道5ドル）で C を満たさない。",
      ],
    },
    point: "free を使わない「無料」の言い方に注意",
    steps: [
      { title: "B の言いかえ", body: "{{breakfast included}}・{{with breakfast}}・that includes breakfast は○、{{for an extra}} 〜 は別料金なので×。", back: [S4] },
      { title: "C の言いかえ", body: "{{won't cost you anything}}＝お金がかからない＝無料。free という語がなくても○です。", trap: "free が聞こえたホテルにとびつかない。", back: [S4] },
    ],
  },
  {
    ...q("evening-course", 3, 120),
    prompt: `あなたは市民センターの講座を1つ選ぼうとしていて、条件は次の3つです。
A. 平日の夜に行われる　B. 道具を自分で用意しなくてよい　C. 経験のない人も参加できる
4つの講座の説明を聞き、条件をすべて満たすものを選べ。
〔放送1回〕
The cooking class meets on Tuesday evenings, and everything you need is provided. However, it's for people who already have some cooking experience.
The photography class is held on Thursday nights and is open to complete beginners. You can borrow a camera from the center for free.
The pottery class takes place on Saturday mornings. Beginners are welcome, and all the tools are provided.
The guitar class meets on Monday nights, and no experience is needed. Please bring your own guitar.
〔/放送〕`,
    answer: {
      kind: "choice",
      options: ["Cooking", "Guitar", "Photography", "Pottery"],
      correct: 2,
      why: [
        "火曜の夜・道具ありだが、already have some cooking experience（経験者向け）で C を満たさない。",
        "月曜の夜・経験不要だが、bring your own guitar（自分のギターを持参）で B を満たさない。",
        "木曜の夜（A）・カメラを無料で借りられる（B）・complete beginners（まったくの初心者）も可（C）。",
        "初心者歓迎・道具ありだが、土曜の朝で A を満たさない。",
      ],
    },
    point: "However・Please のあとの「ただし」を聞きのがさない",
    steps: [
      { title: "表を作って聞く", body: "曜日と時間帯（{{平日の夜}}か）、道具、経験の3つに○×をつけます。", back: [S1] },
      { title: "最後の一言", body: "Cooking は {{However}} のあとで経験者向け、Guitar は {{bring your own}} で×。", back: [S4] },
    ],
  },
  {
    ...q("summer-job", 3, 120),
    prompt: `あなたは夏休みのアルバイトを1つ選ぼうとしていて、条件は次の3つです。
A. 午前中だけ働く　B. 時給が10ドル以上　C. 仕事で英語を使う
4つのアルバイトの説明を聞き、条件をすべて満たすものを選べ。
〔放送1回〕
The bookstore needs someone from ten in the morning until two in the afternoon. The pay is eleven dollars an hour, and you will often speak English with tourists.
At the zoo, you work from eight to twelve and explain the animals in English to visitors from abroad. The pay is nine dollars an hour.
The hotel job is from seven to eleven in the morning, and it pays twelve dollars an hour. You will mostly clean rooms, so you won't talk much with guests.
The museum shop is open to workers in the mornings only, from eight thirty until noon. You get ten dollars an hour, and since many customers come from other countries, you will use English every day.
〔/放送〕`,
    answer: {
      kind: "choice",
      options: ["Bookstore", "Hotel", "Museum shop", "Zoo"],
      correct: 2,
      why: [
        "時給11ドル・英語を使うが、午後2時まで働くので A を満たさない。",
        "午前中・時給12ドルだが、部屋のそうじが中心で客とあまり話さないので C を満たさない。",
        "8時半から正午まで（A）・時給10ドル（10ドル以上なので B）・毎日英語を使う（C）。",
        "午前中・英語を使うが、時給9ドルで B を満たさない。",
      ],
    },
    point: "「以上」はちょうどの数もふくむ",
    steps: [
      { title: "時間", body: "until {{two in the afternoon}} は午後までなので A が×。{{noon}} は正午で午前中だけ○。", back: [S2] },
      { title: "金額", body: "10ドル以上には {{ten dollars}} ちょうどもふくまれます。nine dollars は×。", back: [S4] },
    ],
  },
];

// ---- l4 講義 ----
const SLEEP = `〔放送1回〕Today we're going to look at how sleep helps us remember what we learn. Many students stay up late before a test, believing that more study time means a better score. However, this is often not true. While we sleep, the brain sorts the information we took in during the day. It keeps what seems important and moves it into long-term memory. In one experiment, two groups of students learned the same list of words in the evening. The first group slept for eight hours, while the second group stayed awake all night. The next morning, the group that had slept remembered about twice as many words as the other group. Sleep also affects how we feel. People who do not get enough sleep tend to become easily annoyed, and they find it harder to concentrate. So what can you do? First, try to go to bed at about the same time every night. Second, avoid looking at your phone just before going to bed, because the bright screen can make it harder to fall asleep. Finally, if you have an important test, review the material in the evening and then get a good night's sleep.〔/放送〕`;

const ROOF = `〔放送1回〕Have you ever noticed that cities are often hotter than the countryside around them? This is called the heat island effect. Roads and buildings take in heat from the sun during the day and let it out slowly at night, so city temperatures stay high even after the sun goes down. One way to deal with this problem is to cover rooftops with plants. These are called green roofs. Plants take in water from the soil and release it into the air through their leaves, and this cools the area around them. A green roof can also keep the building below it cooler, so people use less electricity for air conditioning in summer. In addition, the soil holds rainwater, which reduces the amount of water that rushes into the streets during heavy rain. However, green roofs are not perfect. They are expensive to build, and not every building is strong enough to support the weight of wet soil. They also need regular care, such as watering and cutting the plants. For these reasons, some experts say that green roofs work best when they are combined with other ideas, such as planting more trees along the streets.〔/放送〕`;

const FOOD = `〔放送1回〕Let's talk about food waste at home. In one town, researchers asked one hundred families to keep a diary of all the food they threw away for one month. The results surprised many of the families. On average, each family threw away about four kilograms of food a week. Almost half of it was vegetables and fruit, and about a quarter was bread and rice. The families gave three main reasons. The most common reason was that they bought more than they needed, often because things were on sale. The second was that food went bad before they remembered to eat it. The third was that they cooked too much and did not want to eat the leftovers. After the study, the researchers gave the families some simple advice. Make a shopping list, and check the refrigerator before going to the store. Keep food that will go bad soon at the front of the refrigerator, where you can see it. And plan meals that use leftovers, such as soups. Three months later, the same families kept the diary again. This time, they threw away only about two kilograms a week.〔/放送〕`;

const SLEEP_QS: QuestionC[] = [
  {
    ...q("sleep-brain", 1, 80, "知識・技能"),
    prompt: "講義によると、眠っている間に脳がしていることは何か。",
    answer: {
      kind: "choice",
      options: [
        "その日の情報を整理し、大事なものを長く覚えておけるようにする",
        "その日に覚えたことをすべて消して、翌日に備える",
        "体を休めるために、いっさいはたらきを止めている",
        "朝起きたときに、新しい単語を自動的に覚える",
      ],
      correct: 0,
      why: [
        "the brain sorts the information ... keeps what seems important and moves it into long-term memory の言いかえ。",
        "大事なものは残す（keeps）と言っている。すべて消すのではない。",
        "情報を整理している（sorts）ので、止まっているのではない。",
        "朝に新しく覚えるとは言っていない。",
      ],
    },
    point: "sorts・keeps・long-term memory を日本語に直す",
    steps: [
      { title: "先読み", body: "設問は「眠っている間」。{{While we sleep}} のあとを待ちかまえて聞きます。", back: [S1] },
      { title: "言いかえ", body: "{{sorts}}（整理する）・{{keeps what seems important}}（大事なものを残す）・long-term memory（長期の記憶）。", back: [S4] },
    ],
  },
  {
    ...q("sleep-worksheet", 2, 90),
    prompt: "講義を聞いてワークシートを完成させる。空所に入るものを選べ。\n【実験】夕方に同じ単語のリストを覚える\n・グループ1：8時間眠る　・グループ2：ひと晩じゅう起きている\n【結果】翌朝、グループ1はグループ2の（　　）の数の単語を覚えていた。",
    answer: {
      kind: "choice",
      options: ["約半分", "ほぼ同じ", "約2倍", "約8倍"],
      correct: 2,
      why: [
        "眠ったほう（グループ1）が多く覚えていた。半分ではない。",
        "about twice as many words と差があった。",
        "the group that had slept remembered about twice as many words（約2倍の単語を覚えていた）。",
        "eight は眠った時間（8時間）。倍率ではない。",
      ],
    },
    point: "twice as many＝2倍の数",
    steps: [
      { title: "先読み", body: "空所は「何倍か」。{{twice}}・half・three times などの語を待ちます。", back: [S1] },
      { title: "数のわな", body: "{{eight hours}} は眠った時間。結果は {{twice as many}}＝約2倍。", back: [S4] },
    ],
  },
  {
    ...q("sleep-advice", 3, 100),
    prompt: "講義の内容から考えて、大事なテストの前夜の過ごし方として話し手が最も勧めそうなものはどれか。",
    answer: {
      kind: "choice",
      options: [
        "ひと晩じゅう起きて、できるだけ長く勉強する",
        "寝る直前までスマートフォンで単語を確認する",
        "夜は何も勉強せずに、朝早く起きて新しい範囲を覚える",
        "夜のうちに復習をすませ、いつもと同じくらいの時刻に寝る",
      ],
      correct: 3,
      why: [
        "徹夜したグループは覚えた単語が少なかった。話し手は this is often not true と否定している。",
        "avoid looking at your phone just before going to bed（寝る前はスマホを見ない）と逆。",
        "朝に新しい範囲を覚えるとは言っていない。勧めているのは夜の復習。",
        "review the material in the evening and then get a good night's sleep と、go to bed at about the same time every night を合わせた内容。",
      ],
    },
    point: "First・Second・Finally の助言をまとめて選ぶ",
    steps: [
      { title: "助言を聞く", body: "{{First}} 同じ時刻に寝る、{{Second}} 寝る前にスマホを見ない、{{Finally}} 夜に復習して眠る。", back: [S2] },
      { title: "組み合わせる", body: "1つの言葉ではなく、助言を{{まとめた}}選択肢が正解。スマホの選択肢は Second と逆です。", back: [S4] },
    ],
  },
];

const ROOF_QS: QuestionC[] = [
  {
    ...q("roof-heat-island", 1, 80, "知識・技能"),
    prompt: "講義で、都市が周りの地域より暑くなる理由として述べられていることは何か。",
    answer: {
      kind: "choice",
      options: [
        "都市には雨があまり降らないから",
        "道路や建物が日中に熱をため、夜にゆっくり出すから",
        "都市を走る車の数が多いから",
        "都市のまわりに高い山がないから",
      ],
      correct: 1,
      why: [
        "雨が少ないとは言っていない。雨は屋上緑化の利点（雨水をためる）の話で出てくる。",
        "Roads and buildings take in heat ... and let it out slowly at night の言いかえ。",
        "車の話は出てこない。",
        "山の話は出てこない。",
      ],
    },
    point: "理由は This is called 〜 の直後の説明にある",
    steps: [
      { title: "用語のあと", body: "{{heat island effect}} という用語のすぐあとに、その{{しくみ}}が説明されます。", back: [S2] },
      { title: "言いかえ", body: "{{take in heat}}（熱を吸う）→ ためる、{{let it out slowly at night}} → 夜にゆっくり出す。", back: [S4] },
    ],
  },
  {
    ...q("roof-worksheet", 2, 90),
    prompt: "講義を聞いてワークシートを完成させる。空所に入るものを選べ。\n【屋上緑化】\n利点：まわりを冷やす／冷房の電気が少なくてすむ／大雨のとき道路にあふれる水を減らす\n欠点：（　　）／水やりなどの世話が必要",
    answer: {
      kind: "choice",
      options: [
        "夏に冷房の電気をより多く使う",
        "大雨のときに水があふれやすくなる",
        "つくる費用が高く、ぬれた土の重さにたえられない建物もある",
        "植物が虫を集めて、住む人がこまる",
      ],
      correct: 2,
      why: [
        "use less electricity（電気が少なくてすむ）と言っており、利点のほう。",
        "soil holds rainwater で水があふれるのを減らす。これも利点。",
        "However のあとの expensive to build と not every building is strong enough to support the weight of wet soil の言いかえ。",
        "虫の話は出てこない。",
      ],
    },
    point: "However のあとが欠点のまとまり",
    steps: [
      { title: "先読み", body: "ワークシートの空所は{{欠点}}。{{However}}, green roofs are not perfect のあとを聞きます。", back: [S1] },
      { title: "利点とまぜない", body: "電気・雨水は{{利点}}の話。逆にした選択肢はわなです。", back: [S4] },
    ],
  },
  {
    ...q("roof-conclusion", 3, 100),
    prompt: "講義の最後の部分の内容に最も合うものはどれか。",
    answer: {
      kind: "choice",
      options: [
        "屋上緑化だけで、ヒートアイランド現象は解決できる",
        "屋上緑化には欠点があるので、やめるべきだ",
        "屋上緑化より、冷房の性能を上げるほうが効果的だ",
        "屋上緑化は、街路樹を増やすなどほかの方法と組み合わせるとよい",
      ],
      correct: 3,
      why: [
        "green roofs are not perfect と言っており、これだけで解決するとは言っていない。",
        "欠点は述べたが、やめるべきとは言っていない。work best when ... と条件つきで勧めている。",
        "冷房の性能の話はしていない。",
        "work best when they are combined with other ideas, such as planting more trees along the streets の言いかえ。",
      ],
    },
    point: "For these reasons のあとが結論",
    steps: [
      { title: "結論の合図", body: "{{For these reasons}}（これらの理由で）のあとが講義のまとめです。", back: [S2] },
      { title: "言いかえ", body: "{{combined with other ideas}} → ほかの方法と組み合わせる、{{planting more trees along the streets}} → 街路樹を増やす。", back: [S4] },
    ],
  },
];

const FOOD_QS: QuestionC[] = [
  {
    ...q("food-reason", 1, 80, "知識・技能"),
    prompt: "講義によると、家庭で食べ物を捨てる理由として最も多かったものは何か。",
    answer: {
      kind: "choice",
      options: [
        "食べる前に傷んでしまう",
        "作りすぎて残り物が出る",
        "必要な量より多く買ってしまう",
        "食べられる期間の表示が分かりにくい",
      ],
      correct: 2,
      why: [
        "food went bad before they remembered to eat it は The second（2番目）の理由。",
        "cooked too much は The third（3番目）の理由。",
        "The most common reason was that they bought more than they needed の言いかえ。",
        "表示の話は出てこない。",
      ],
    },
    point: "the most common / the second / the third を区別",
    steps: [
      { title: "順番の合図", body: "{{The most common}} → The second → The third の順に3つ。最初のものが答えです。", back: [S2] },
      { title: "言いかえ", body: "{{bought more than they needed}} → 必要な量より多く買う。", back: [S4] },
    ],
  },
  {
    ...q("food-worksheet", 2, 90),
    prompt: "講義を聞いてワークシートを完成させる。空所に入るものを選べ。\n【調査のはじめ】1家庭が1週間に捨てた食べ物：約4キロ\n　うち、野菜・果物：半分近く　パン・ごはん：約（　　）キロ",
    answer: {
      kind: "choice",
      options: ["1", "2", "3", "4"],
      correct: 0,
      why: [
        "about a quarter（約4分の1）なので、4キロ×4分の1＝約1キロ。",
        "2キロは「半分」の量で、野菜・果物のほう（almost half）。",
        "3キロにあたる割合（4分の3）は出てこない。",
        "4キロは捨てた食べ物の全体の量。",
      ],
    },
    point: "a quarter＝4分の1。全体の量にかけて計算",
    steps: [
      { title: "割合を聞く", body: "bread and rice は {{about a quarter}}（約4分の1）。half は野菜・果物です。", back: [S2] },
      { title: "計算", body: "全体 {{four kilograms}} × 4分の1 ＝ 約{{1キロ}}。", trap: "half と聞いて 2 を選ばない。", back: [S4] },
    ],
  },
  {
    ...q("food-result", 3, 100),
    prompt: "講義の内容に合うものはどれか。",
    answer: {
      kind: "choice",
      options: [
        "助言のあと、捨てる食べ物の量は約半分になった",
        "助言のあと、捨てる食べ物の量は1週間に約2キロ増えた",
        "研究者は、傷みやすい物を冷蔵庫の奥にしまうよう勧めた",
        "研究者は、残り物は捨てて新しく料理するよう勧めた",
      ],
      correct: 0,
      why: [
        "1週間に約4キロ → 3か月後は約2キロ（only about two kilograms）なので、約半分に減った。",
        "two kilograms は減ったあとの量。増えたのではない。",
        "at the front of the refrigerator（冷蔵庫の手前）に置くよう勧めた。奥ではない。",
        "plan meals that use leftovers（残り物を使う料理）を勧めた。捨てるのではない。",
      ],
    },
    point: "前後の数を比べて「どう変わったか」をつかむ",
    steps: [
      { title: "数を比べる", body: "はじめ {{four kilograms}} → 3か月後 {{two kilograms}}。4÷2＝2 で、量は約{{半分}}。", back: [S2] },
      { title: "助言の細部", body: "{{at the front}}（手前）・{{use leftovers}}（残り物を使う）。逆の選択肢はわなです。", back: [S4] },
    ],
  },
];

export const ENG_LISTENING_POOL: ExamPoolSection[] = [
  { unit: U, tag: "l1", section: { id: "xl-l1-short", title: "短い発話", lead: "英文を聞き、問いに答えよ。", style: "mix", questions: SHORT } },
  { unit: U, tag: "l2", section: { id: "xl-l2-dialog", title: "対話", lead: "対話を聞き、問いに答えよ。", style: "mix", questions: DIALOG } },
  { unit: U, tag: "l3", section: { id: "xl-l3-cond", title: "条件に合うもの", lead: "英文を聞き、条件に最も合うものを選べ。", style: "mix", questions: COND } },
  {
    unit: U,
    tag: "l4",
    section: { id: "xl-l4-sleep", title: "講義（睡眠と記憶）", lead: "英文を聞き、問いに答えよ。", style: "reading", material: [{ kind: "text", body: SLEEP }], questions: SLEEP_QS },
  },
  {
    unit: U,
    tag: "l4",
    section: { id: "xl-l4-roof", title: "講義（屋上緑化）", lead: "英文を聞き、問いに答えよ。", style: "reading", material: [{ kind: "text", body: ROOF }], questions: ROOF_QS },
  },
  {
    unit: U,
    tag: "l4",
    section: { id: "xl-l4-food", title: "講義（家庭の食品ロス）", lead: "英文を聞き、問いに答えよ。", style: "reading", material: [{ kind: "text", body: FOOD }], questions: FOOD_QS },
  },
];
