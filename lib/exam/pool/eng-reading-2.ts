// 共通テスト型「英語リーディング」の、令和7年度からの新しい形の大問 (試験モードだけで使う)。
// 公式の過去問 (令和7・8年度) で確かめた大問の形 (docs/kyotsu-kakomon.md) に合わせて、新しく書いた。
// 本文・場面・人名・町名・数字はすべてオリジナル (過去問・教科書・市販教材・ニュース記事の文は使っていない)。
//   r4w 下書きの推敲 (下書き＋先生のコメント。4問)／r8 意見文の構想 (複数の人の意見＋資料A・B。5問)
// 数の検算 (手で確認済み):
//   repair-day 60−42＝18 (直せなかった数)／seed-library 120冊のうち返ったのは25冊
//   late-start 就寝＋10分・起床＋50分 → 睡眠＋40分／朝食 150−110＝40・眠い 130−70＝60
//   car-free 1,400−800＝600人 (1.75倍で「2倍」ではない)／安心 90→240・1時間以上 60→150 (2.5倍)
import type { ExamPoolSection } from "./types";

const U = "h-eng-skill-chobun";

// =====================================================================
// r4w 下書きの推敲
// =====================================================================

const R4W: ExamPoolSection[] = [
  {
    unit: U,
    tag: "r4w",
    section: {
      id: "xr-r4w-repair-day",
      title: "学校新聞の下書き（修理の日）",
      lead: "あなたは英語の学校新聞にのせる記事を書いている。下書きと、先生のコメントを読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Draft: Repair Day",
          body: `(1) ＿＿＿ Last month, the student council held the first Repair Day in the school gym. Students brought things that were broken, such as bicycles, umbrellas, and bags. [A] Volunteers from a local repair shop and members of the technology club showed us how to fix them. [B] In three hours, 42 of the 60 items were repaired. [C] I brought an umbrella with a bent frame, and a volunteer taught me how to straighten it with a small tool. (2) It was good. [D]

Repair Day also helps the environment. In our town, people throw away many things that could still be used. If we keep using an item for a longer time, we buy fewer new ones and produce less garbage.

The student council plans to hold Repair Day again in November. (3) ＿＿＿`,
          notes: [
            { word: "student council", meaning: "生徒会" },
            { word: "bent frame", meaning: "曲がった骨組み" },
            { word: "straighten", meaning: "まっすぐにする" },
          ],
        },
        {
          kind: "passage",
          lang: "en",
          title: "Comments from your teacher",
          body: `(1) Start with a sentence that tells readers what this article is about.
(2) "It was good" is not clear. Say what was good and why.
(3) End with a sentence that tells readers what they can do.
One more thing: you need to explain what happened to the other items. Add this sentence at the best place, [A]–[D]: "The others needed parts that we did not have that day."`,
        },
      ],
      questions: [
        {
          id: "opening",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "思考・判断・表現",
          prompt: "コメント (1) をもとに、下書きの (1) に入れる文として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Our school has started an event that gives broken things a second life.",
              "The school gym is the largest building on our campus.",
              "Many students in our school ride bicycles every day.",
              "The technology club is looking for new members this year.",
            ],
            correct: 0,
            why: [
              "こわれた物を直して使いつづける行事、という記事全体の話題を最初に伝えている。",
              "体育館は会場であって、記事の話題ではない。",
              "自転車は持ちこまれた物の一例。記事全体の紹介にならない。",
              "部員の募集は記事に出てこない。",
            ],
          },
          point: "最初の文は、記事全体の話題を言う",
          steps: [
            { title: "記事全体をつかむ", body: "第1段落＝行事の様子、第2段落＝環境によいこと、第3段落＝次回。3つに共通する話題は {{Repair Day}}（こわれた物を直す行事）です。" },
            { title: "選ぶ", body: "{{gives broken things a second life}} が、直してもう一度使うことを表します。" },
          ],
        },
        {
          id: "insert",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "先生が加えるように言った文 “The others needed parts that we did not have that day.” を入れる場所として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: ["[A]", "[B]", "[C]", "[D]"],
            correct: 2,
            why: [
              "[A] の前は持ちこまれた物の例。まだ数の話が出ていないので、The others が何を指すか分からない。",
              "[B] の前はボランティアの紹介。直った数はこのあとに出てくる。",
              "直前の「60個のうち42個が直った」を受けて、残り（The others）の説明になる。",
              "[D] の前は自分のかさの話。The others が指すものがない。",
            ],
          },
          point: "The others は、直前に出た数の「残り」を指す",
          steps: [
            { title: "指すものをさがす", body: "{{The others}}＝残りの物。全体と一部の数が出ている文をさがします。" },
            { title: "数の文", body: "{{42 of the 60 items were repaired}} → 残りは 60−42＝18個。その直後の {{[C]}} に入ります。" },
          ],
        },
        {
          id: "clear",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "コメント (2) をもとに、下線部 (2) を書きかえた文として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "It was the best umbrella in the shop.",
              "I was happy because I learned to fix it myself instead of buying a new one.",
              "The weather was good on that day.",
              "The volunteer was busy with many other students.",
            ],
            correct: 1,
            why: [
              "店のかさの話ではない。直前の、直し方を教わった内容と合わない。",
              "何がよかったか（自分で直せるようになった）と、その理由が書かれている。",
              "天気の話は記事に出てこない。",
              "ボランティアがいそがしかったことは、「よかった」ことの説明にならない。",
            ],
          },
          point: "あいまいな感想は、「何が・なぜ」で言いかえる",
          steps: [
            { title: "直前を読む", body: "直前は {{a volunteer taught me how to straighten it}}（直し方を教わった）。" },
            { title: "何が・なぜ", body: "{{learned to fix it myself}}（何が）＋ {{instead of buying a new one}}（なぜうれしいか）がそろっています。" },
          ],
        },
        {
          id: "ending",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 75,
          skill: "思考・判断・表現",
          prompt: "コメント (3) をもとに、下書きの (3) に入れる文として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "The gym will be closed for cleaning in December.",
              "I have never repaired a bicycle before.",
              "If you have something broken at home, bring it and learn how to fix it with us.",
              "Some volunteers said that they were tired after the event.",
            ],
            correct: 2,
            why: [
              "体育館のそうじは、読む人にしてほしいことではない。",
              "自分の経験の話で、読む人への呼びかけになっていない。",
              "次回に向けて、読む人ができること（こわれた物を持ってくる）を伝えている。",
              "ボランティアの感想で、読む人への呼びかけではない。",
            ],
          },
          point: "しめくくりは、読む人への呼びかけ",
          steps: [
            { title: "コメントの条件", body: "{{what they can do}}＝読む人ができること。" },
            { title: "直前とつなぐ", body: "直前は「11月にもう一度開く」。{{bring it}} と呼びかける文が続きます。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r4w",
    section: {
      id: "xr-r4w-seed-library",
      title: "町の広報にのせる文章の下書き（たねの図書館）",
      lead: "あなたは町の英語の広報にのせる文章を書いている。下書きと、先生のコメントを読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Draft: About Seeds",
          body: `(1) ＿＿＿ It is a small wooden box next to the entrance of our school library, and it holds more than 30 kinds of vegetable and flower seeds. Any student can take up to three packets for free. [A] The only rule is simple: after you grow the plants, save some seeds and return them to the box. [B]

The science club started the Seed Library in April with seeds given by local farmers. [C] By July, students had borrowed 120 packets. However, only 25 packets had been returned by October. [D] Now each packet has a card with pictures showing when and how to collect the seeds.

I borrowed tomato seeds and grew them on my balcony. (2) I learned a lot. Next spring, I want to try growing beans.`,
          notes: [
            { word: "packet", meaning: "小さな袋" },
            { word: "balcony", meaning: "ベランダ" },
          ],
        },
        {
          kind: "passage",
          lang: "en",
          title: "Comments from your teacher",
          body: `(1) Readers do not know what "It" is. Introduce your topic first.
(2) "I learned a lot" is too general. What did you learn?
(3) The title "About Seeds" does not tell readers much. Choose a better one.
One more thing: readers will wonder why the club made the cards. Add this sentence at the best place, [A]–[D]: "Club members found that many students did not know how to save seeds."`,
        },
      ],
      questions: [
        {
          id: "intro",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 75,
          skill: "思考・判断・表現",
          prompt: "コメント (1) をもとに、下書きの (1) に入れる文として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Tomatoes are my favorite vegetable.",
              "Our school library opens at eight every morning.",
              "The science club has twelve members this year.",
              "Have you heard of the Seed Library at our school?",
            ],
            correct: 3,
            why: [
              "次の文の It（木の箱）が、トマトを指すことになってしまう。",
              "図書館が開く時刻の話で、It が指す「たねの図書館」を紹介していない。",
              "科学部の人数は、次の文の It とつながらない。",
              "the Seed Library を最初に出すので、次の文の It が何を指すか分かる。",
            ],
          },
          point: "It の前に、指すものを出しておく",
          steps: [
            { title: "It の中身", body: "次の文は {{It is a small wooden box … holds … seeds}}。It＝たねの入った箱です。" },
            { title: "選ぶ", body: "その名前 {{the Seed Library}} を先に出している文を選びます。" },
          ],
        },
        {
          id: "insert",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "先生が加えるように言った文 “Club members found that many students did not know how to save seeds.” を入れる場所として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: ["[A]", "[B]", "[C]", "[D]"],
            correct: 3,
            why: [
              "[A] の前後は、借り方ときまりの説明。たねが返ってこない話はまだ出ていない。",
              "[B] はきまりの説明の直後。原因を調べた話を入れるには早い。",
              "[C] は始めたときの説明。借りた数・返った数はこのあとに出る。",
              "「返ったのは25袋だけ」→ 理由が分かった → 「いまはカードを付けている」と、原因と対策がつながる。",
            ],
          },
          point: "問題 → 原因 → 対策 の順にならべる",
          steps: [
            { title: "問題の文", body: "{{only 25 packets had been returned}}（120袋のうち25袋しか返っていない）。" },
            { title: "対策の文", body: "{{Now each packet has a card …}}。この2つの間 {{[D]}} に、原因の文が入ります。" },
          ],
        },
        {
          id: "specific",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "コメント (2) をもとに、下線部 (2) を書きかえた文として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "I learned that tomatoes need water every morning in summer and that seeds must be dried before they are stored.",
              "I learned a lot of things from many people.",
              "My balcony is on the second floor of our apartment.",
              "Beans are cheaper than tomatoes at the supermarket.",
            ],
            correct: 0,
            why: [
              "学んだこと（水やり・たねを乾かすこと）が具体的に書かれている。",
              "a lot of things のままで、何を学んだかが分からない。",
              "ベランダの場所は、学んだことではない。",
              "値段の話は、育てて学んだことではない。",
            ],
          },
          point: "too general と言われたら、中身を具体的に書く",
          steps: [
            { title: "コメント", body: "{{What did you learn?}} → 学んだことの中身が必要です。" },
            { title: "選ぶ", body: "{{need water every morning}}・{{seeds must be dried}} と、中身が2つ書かれています。" },
          ],
        },
        {
          id: "title",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 75,
          skill: "思考・判断・表現",
          prompt: "コメント (3) をもとに、この文章の題として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "How to Cook Tomatoes at Home",
              "Borrow, Grow, Return: Our School's Seed Library",
              "The History of Farming in Our Town",
              "Why School Libraries Should Buy More Books",
            ],
            correct: 1,
            why: [
              "料理の話は出てこない。",
              "たねを借りて、育てて、返すという仕組みと、話題の the Seed Library が入っている。",
              "町の農業の歴史は書かれていない。",
              "本を買う話ではない。",
            ],
          },
          point: "題は、文章全体の話題と流れを表す",
          steps: [
            { title: "全体の流れ", body: "借りる（take packets）→ 育てる（grow）→ 返す（return seeds）。" },
            { title: "選ぶ", body: "{{Borrow, Grow, Return}} が、その流れと同じ順です。" },
          ],
        },
      ],
    },
  },
];

// =====================================================================
// r8 意見文の構想
// =====================================================================

const STEPS_NOTE = (position: string, r2: string, r3: string) => `Step 1: Read opinions from different people.
Step 2: Take a position.
Step 3: Make an outline using Sources A and B.

[Step 2] Your position: ${position}

[Step 3] Outline
Introduction
Body
  Reason 1: (from Step 1)
  Reason 2: ${r2} (from Source A)
  Reason 3: ${r3} (from Source B)
Conclusion`;

const R8: ExamPoolSection[] = [
  {
    unit: U,
    tag: "r8",
    section: {
      id: "xr-r8-late-start",
      title: "意見文の構想（始業を1時間おそくするか）",
      lead: "あなたは「学校の始まる時刻」について英語で意見文を書く。手順にそって資料を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Step 1: Opinions",
          body: `Kenta (second-year student)
I get up at 5:30 to catch the train. I often feel sleepy in first period, and I can't concentrate. If school started an hour later, I could sleep more and do better in class. However, I'm worried that club practice would finish too late.

Ms. Doyle (school nurse)
Teenagers' body clocks make it hard for them to fall asleep early. More students come to my office with headaches in the morning than in the afternoon. A later start would improve students' health. Simply telling them to go to bed earlier does not work.

Mr. Abe (parent)
I leave for work at 7:30. If school started later, my daughter would be home alone in the morning, and I couldn't make sure she left on time. Also, students might just stay up later at night, so they wouldn't sleep any longer.

Rina (third-year student)
A later start sounds nice, but school would also end an hour later. Students who have part-time jobs or take care of younger brothers and sisters after school would have less time. I think a shorter morning homeroom would be a better idea.`,
          notes: [
            { word: "body clock", meaning: "体内時計" },
            { word: "first period", meaning: "1時間目" },
          ],
        },
        { kind: "text", body: STEPS_NOTE("Our school should start one hour later.", "Students really do sleep longer.", "Students' daily habits improve.") },
        {
          kind: "passage",
          lang: "en",
          title: "Source A",
          body: `A high school in another city moved its start time from 8:20 to 9:20 three years ago. Before the change, teachers were worried that students would simply go to bed later. However, a survey showed that students' bedtimes became only about ten minutes later on average, while they woke up about fifty minutes later. The number of students who were late for first period fell by half. Teachers also reported that fewer students fell asleep during morning classes. On the other hand, some sports clubs had to shorten their practice in winter because it got dark early.`,
        },
        {
          kind: "table",
          caption: "Source B: Survey of 200 students at the school in Source A (number of students who answered \"Yes\")",
          head: ["", "Before the change", "After the change"],
          rows: [
            ["I eat breakfast every day.", "110", "150"],
            ["I feel sleepy in first period.", "130", "70"],
            ["I have enough time for homework.", "120", "115"],
            ["I take part in club activities.", "140", "138"],
          ],
        },
      ],
      questions: [
        {
          id: "both",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "Kenta と Rina の両方がふれていることはどれか。",
          answer: {
            kind: "choice",
            options: [
              "health problems that students have in the morning",
              "the effect on what students do after school",
              "the time when parents leave for work",
              "the number of trains in the early morning",
            ],
            correct: 1,
            why: [
              "朝の体調の話をしているのは Ms. Doyle。",
              "Kenta は部活の終わる時刻、Rina はアルバイトや弟・妹の世話と、どちらも放課後のことを心配している。",
              "親の出勤の時刻は Mr. Abe の話。",
              "Kenta は電車に乗ると言っているが、本数の話はしていない。Rina は電車にふれていない。",
            ],
          },
          point: "2人の発言を、同じ話題でくくる",
          steps: [
            { title: "Kenta", body: "{{club practice would finish too late}}＝放課後の部活。" },
            { title: "Rina", body: "{{part-time jobs}}・{{take care of younger brothers and sisters after school}}＝放課後の時間。" },
          ],
        },
        {
          id: "abe",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "Mr. Abe の意見から分かることとして最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Parents should be allowed to start work later.",
              "Students should stop club activities in the morning.",
              "A later start may not give students more sleep.",
              "Morning homeroom should be made shorter.",
            ],
            correct: 2,
            why: [
              "親の仕事の始まる時刻を変えるべきだとは言っていない。",
              "朝の部活の話はしていない。",
              "students might just stay up later …, so they wouldn't sleep any longer の言いかえ。",
              "朝のホームルームを短くする案は Rina のもの。",
            ],
          },
          point: "might … so … の部分が、心配の中身",
          steps: [
            { title: "2つの心配", body: "①朝、子どもが家に1人になる　②{{students might just stay up later}}。" },
            { title: "②の結果", body: "{{they wouldn't sleep any longer}}＝睡眠は長くならないかもしれない。" },
          ],
        },
        {
          id: "reason1",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "あなたの立場を支える Reason 1 として、Step 1 の意見をもとに書けるものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Students would have more time for part-time jobs.",
              "Parents could check that their children leave home on time.",
              "Club practice in the afternoon would become longer.",
              "Students would be healthier and could concentrate better in morning classes.",
            ],
            correct: 3,
            why: [
              "Rina は、アルバイトの時間が減ると言っている。立場と反対の内容。",
              "Mr. Abe は、たしかめられなくなると言っている。立場と反対の内容。",
              "Kenta は、部活がおそくまでかかることを心配している。長くなるとはだれも言っていない。",
              "Kenta（集中できる）と Ms. Doyle（健康によい）の意見をまとめたもの。",
            ],
          },
          point: "賛成の理由は、賛成している人の意見から作る",
          steps: [
            { title: "賛成の意見", body: "Kenta：{{sleep more and do better in class}}／Ms. Doyle：{{improve students' health}}。" },
            { title: "まとめる", body: "健康（healthier）と集中（concentrate better）の2つが入っている選択肢を選びます。" },
          ],
        },
        {
          id: "source-a",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "Source A をもとに、Reason 2 を支える内容として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Students went to bed about one hour later, so their sleeping time did not change.",
              "Students woke up much later but went to bed only a little later, so they slept about forty minutes longer.",
              "Sports clubs were able to practice longer in winter after the change.",
              "The number of students who were late for first period doubled.",
            ],
            correct: 1,
            why: [
              "ねる時刻がおそくなったのは約10分。1時間ではない。",
              "起きる時刻が約50分おそく、ねる時刻は約10分おそくなったので、50−10＝40分長くねている。",
              "冬は練習を短くした部活があった。長くなってはいない。",
              "遅刻は半分に減った（fell by half）。2倍ではない。",
            ],
          },
          point: "2つの数の差で、のびた睡眠の長さを出す",
          steps: [
            { title: "数を拾う", body: "bedtimes：{{about ten minutes later}}／woke up：{{about fifty minutes later}}。" },
            { title: "計算", body: "50分−10分＝{{40分}} 長くねている → Reason 2（Students really do sleep longer）を支えます。" },
          ],
        },
        {
          id: "source-b",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "Source B をもとに、Reason 3 を支える内容として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "The number of students who feel sleepy in first period rose by 60.",
              "The number of students who have enough time for homework doubled.",
              "Forty more students eat breakfast every day, and sixty fewer feel sleepy in first period.",
              "More than half of the students stopped taking part in club activities.",
            ],
            correct: 2,
            why: [
              "1時間目に眠い生徒は130人から70人に減った。増えていない。",
              "宿題の時間は120人から115人で、ほぼ変わらない。",
              "朝食は 150−110＝40人増え、眠い生徒は 130−70＝60人減った。",
              "部活は140人から138人で、ほぼ変わらない。",
            ],
          },
          point: "表の Before と After の差を計算する",
          steps: [
            { title: "朝食", body: "110 → 150：{{40人}} 増えた。" },
            { title: "眠さ", body: "130 → 70：{{60人}} 減った。どちらも習慣がよくなった（Reason 3）ことを表します。" },
          ],
        },
      ],
    },
  },
  {
    unit: U,
    tag: "r8",
    section: {
      id: "xr-r8-car-free",
      title: "意見文の構想（日曜日の商店街を歩行者だけにするか）",
      lead: "あなたは「町の商店街 Maple Street を日曜日に車の通れない道にするか」について英語で意見文を書く。手順にそって資料を読み、問いに答えよ。",
      style: "reading",
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "Step 1: Opinions",
          body: `Ms. Sato (bakery owner on Maple Street)
Many of my customers come by car to buy bread for the week. If they cannot park near my shop, they may go to the supermarket outside town. But I would like more families to walk around the street, so I can't say I am completely against the idea.

Leo (high school student)
I cross Maple Street by bike every Sunday to go to the library. Cars pass very close to me, and it's scary. Without cars, we could hold music events and markets on the street.

Mr. Tanaka (resident, 78 years old)
My knees are weak, so my son drives me to the clinic and the shops on Maple Street. If cars are not allowed, how will people like me get there? A small shuttle bus would be necessary.

Ms. Green (delivery driver)
I deliver packages to the shops on Sunday mornings. If the street is closed all day, I cannot do my job. Closing it only in the afternoon would be acceptable.`,
          notes: [
            { word: "shuttle bus", meaning: "決まった区間を行き来するバス" },
            { word: "acceptable", meaning: "受け入れられる" },
          ],
        },
        { kind: "text", body: STEPS_NOTE("Maple Street should be closed to cars on Sunday afternoons.", "The shopping street becomes livelier.", "Residents enjoy the street more.") },
        {
          kind: "passage",
          lang: "en",
          title: "Source A",
          body: `Riverside, a town of a similar size, closed its main shopping street to cars from 1 p.m. to 6 p.m. on Sundays for six months. The town counted the people on the street during those hours. Before the trial, about 800 people walked there on an average Sunday afternoon. During the trial, the number rose to about 1,400. Cafés and restaurants reported higher sales, but two furniture shops said that their sales fell because customers could not carry large items to their cars. To solve this problem, the town helped those shops deliver large items for free on Mondays. The town also ran a free shuttle bus from a parking lot five minutes away, and it was used mainly by elderly people.`,
          notes: [{ word: "trial", meaning: "試しにやってみること" }],
        },
        {
          kind: "table",
          caption: "Source B: Answers from 300 Riverside residents (number of people who answered \"Yes\")",
          head: ["", "Before the trial", "During the trial"],
          rows: [
            ["I feel safe walking there with children.", "90", "240"],
            ["I stay on the street for more than one hour.", "60", "150"],
            ["It is easy to get to the street.", "210", "180"],
            ["The street is too noisy.", "150", "75"],
          ],
        },
      ],
      questions: [
        {
          id: "both",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "Ms. Sato と Mr. Tanaka の両方が心配していることはどれか。",
          answer: {
            kind: "choice",
            options: [
              "how people who depend on cars would get to the shops",
              "the noise from music events on the street",
              "the danger of bicycles on the street",
              "the time of deliveries on Sunday mornings",
            ],
            correct: 0,
            why: [
              "Ms. Sato は車で来る客、Mr. Tanaka は車で送ってもらう自分のような人が、店に行けなくなることを心配している。",
              "音楽の行事にふれているのは Leo で、心配ではなく期待として話している。",
              "自転車の危なさを言う人はいない。Leo は車がこわいと言っている。",
              "朝の配達は Ms. Green の話。",
            ],
          },
          point: "2人の発言を、同じ話題でくくる",
          steps: [
            { title: "Ms. Sato", body: "{{customers come by car}}・{{cannot park near my shop}}。" },
            { title: "Mr. Tanaka", body: "{{my son drives me}}・{{how will people like me get there?}}。どちらも、車がたよりの人の行き方です。" },
          ],
        },
        {
          id: "green",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "Ms. Green がこの計画を受け入れる条件として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "The shuttle bus runs all day on Sundays.",
              "The shops on the street close on Sundays.",
              "Bicycles are also kept off the street.",
              "Cars can still use the street on Sunday mornings.",
            ],
            correct: 3,
            why: [
              "シャトルバスを求めているのは Mr. Tanaka。",
              "店を休みにする話はだれもしていない。",
              "自転車の話はしていない。",
              "配達は日曜の朝。Closing it only in the afternoon would be acceptable＝朝は車が通れればよい。",
            ],
          },
          point: "only in the afternoon を言いかえる",
          steps: [
            { title: "仕事の時間", body: "{{on Sunday mornings}} に配達している。" },
            { title: "条件", body: "{{only in the afternoon}} なら受け入れられる → 朝は車が通れる、と同じ意味です。" },
          ],
        },
        {
          id: "reason1",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 105,
          skill: "思考・判断・表現",
          prompt: "あなたの立場を支える Reason 1 として、Step 1 の意見をもとに書けるものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Customers could park closer to the shops.",
              "The street would be safer and could be used for community events.",
              "Delivery drivers could finish their work earlier.",
              "The supermarket outside town would get more customers.",
            ],
            correct: 1,
            why: [
              "車を止められなくなるので、反対の内容。",
              "Leo の「車がこわい」「音楽の行事や市を開ける」をまとめたもの。",
              "Ms. Green は、一日じゅう閉じられると仕事ができないと言っている。早く終わるとは言っていない。",
              "これは Ms. Sato の心配で、立場を支える理由にならない。",
            ],
          },
          point: "賛成の理由は、賛成している人の意見から作る",
          steps: [
            { title: "賛成の意見", body: "Leo：{{it's scary}}（いまは危ない）／{{we could hold music events and markets}}。" },
            { title: "まとめる", body: "安全（safer）と行事（community events）の2つが入っている選択肢を選びます。" },
          ],
        },
        {
          id: "source-a",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "Source A をもとに、Reason 2 を支える内容として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "Every shop on the street reported higher sales during the trial.",
              "The number of people walking on the street doubled during the trial.",
              "About 600 more people walked on the street, and cafés and restaurants sold more.",
              "The free shuttle bus was used mainly by high school students.",
            ],
            correct: 2,
            why: [
              "家具の店2軒は売り上げが下がった。Every shop ではない。",
              "800人から1,400人は1.75倍。2倍（1,600人）にはなっていない。",
              "1,400−800＝600人増え、カフェとレストランの売り上げが上がった。",
              "シャトルバスを使ったのは主にお年寄り。",
            ],
          },
          point: "「2倍」か「何人増えた」かを、計算でたしかめる",
          steps: [
            { title: "人数", body: "{{about 800}} → {{about 1,400}}：1,400−800＝{{600人}} 増えた（800×2＝1,600 なので2倍ではない）。" },
            { title: "売り上げ", body: "{{Cafés and restaurants reported higher sales}}。家具の店は下がったので、Every shop とは言えません。" },
          ],
        },
        {
          id: "source-b",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 120,
          skill: "思考・判断・表現",
          prompt: "Source B をもとに、Reason 3 を支える内容として最も適切なものはどれか。",
          answer: {
            kind: "choice",
            options: [
              "More residents feel safe walking there with children, and more than twice as many stay for over an hour.",
              "More residents say that it is easy to get to the street.",
              "The number of residents who say the street is too noisy increased.",
              "Fewer residents stay on the street for more than one hour.",
            ],
            correct: 0,
            why: [
              "安心して歩ける人は90人から240人に増え、1時間以上いる人は60人から150人（2.5倍）に増えた。",
              "行きやすいと答えた人は210人から180人に減っている。",
              "うるさいと答えた人は150人から75人に減っている。",
              "1時間以上いる人は60人から150人に増えている。",
            ],
          },
          point: "表のどの行が増え、どの行が減ったかを分ける",
          steps: [
            { title: "増えた行", body: "安心：90 → {{240}}／1時間以上：60 → {{150}}（150÷60＝2.5倍）。" },
            { title: "減った行", body: "行きやすい：210 → 180／うるさい：150 → 75。この2つは選択肢の内容と逆です。" },
          ],
        },
      ],
    },
  },
];

export const ENG_READING_POOL_2: ExamPoolSection[] = [...R4W, ...R8];
