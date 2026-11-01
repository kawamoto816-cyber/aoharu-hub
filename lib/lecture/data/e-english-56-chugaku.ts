import type { Lecture } from "../types";

export const E_ENGLISH_56_CHUGAKU: Lecture = {
  unit: "e-english-56-chugaku",
  title: "中学校でしたいことは I want to 〜. 部活は join、行事は enjoy",
  hook: "もうすぐ中学生。部活や新しい教科、行事など、楽しみなことがたくさんありますね。英語で「中学校でしたいこと」を伝えるときは、I want to 〜. のあとの動作の言葉がポイントです。自分の目ひょうを英語で言ってみましょう。",
  sections: [
    {
      heading: "I want to のあとの言葉で、したいことが決まる",
      body: "「〜したい」は {{I want to 〜.}} で、to のあとに動作の言葉を置きます。部活に入るなら {{join}}、勉強するなら {{study}}、行事を楽しむなら {{enjoy}}、友だちを作るなら {{make}} です。何をしたいかに合わせて、動作の言葉をえらびます。",
      figure: {
        type: "formula",
        title: "中学校でしたいこと",
        prose: true,
        steps: [
          { expr: "I want to {{join}} the tennis team.", note: "部活に入る" },
          { expr: "I want to {{study}} English hard.", note: "勉強する" },
          { expr: "I want to {{enjoy}} the school festival.", note: "行事を楽しむ" },
          { expr: "I want to {{make}} many friends.", note: "友だちを作る" },
        ],
        note: "school festival は文化祭のことです。",
      },
    },
    {
      heading: "部活の言い方：team と club",
      body: "運動の部活は {{team}} をつけて言うことが多く、文化の部活は {{club}} をつけて言います（運動の部活に club を使うこともあります）。brass band（吹奏楽部《すいそうがくぶ》）や chorus（合唱部）のように、それだけで部活を表す言葉もあります。",
      figure: {
        type: "compare",
        title: "部活の名前の例",
        columns: [{ title: "運動の部活", tone: "blue" }, { title: "文化の部活", tone: "yellow" }],
        rows: [
          { cells: ["soccer team（サッカー部）", "art club（美術部）"] },
          { cells: ["tennis team（テニス部）", "science club（科学部）"] },
          { cells: ["track team（陸上部）", "brass band（吹奏楽部《すいそうがくぶ》）"] },
        ],
      },
    },
    {
      heading: "理由をつけたす",
      body: "したいことのあとに{{理由}}をつけると、話に中身が出ます。理由は {{I like 〜.}} や {{I want to be 〜.}} で言います。たとえば、音楽がすきで歌手になりたいなら、I want to join the chorus. とつながります。",
      figure: {
        type: "cause",
        title: "理由から、したいことへ",
        causes: [
          { label: "音楽がすき", sub: "I like music.", tone: "plain" },
          { label: "歌手が夢", sub: "want to be 〜", tone: "plain" },
        ],
        effect: { label: "合唱部に入りたい", sub: "want to join", tone: "yellow" },
        chain: [{ label: "毎日練習する", sub: "practice hard", tone: "blue" }],
      },
    },
    {
      heading: "たずね方",
      body: "入りたい部活をたずねるときは {{What club do you want to join?}} と聞きます。中学校でしたいことは {{What do you want to do in junior high school?}} です。どちらも I want to 〜. で答えます。",
    },
  ],
  mistakes: [
    { wrong: "I want to join to the soccer team.", right: "I want to join the soccer team.", why: "join は「〜に入る」の意味なので、後ろに to はいりません。" },
    { wrong: "I want to make many friend.", right: "I want to make many friends.", why: "many（たくさんの）のあとは、s のついた形にします。" },
    { wrong: "I want to study hard English.", right: "I want to study English hard.", why: "hard（いっしょうけんめい）は、English のあとに置きます。" },
  ],
  check: [
    { q: "「美術部に入りたい」を英語で言うと？", a: "I want to join the art club.", why: "部活に入るは join。美術部は art club。" },
    { q: "入りたい部活をたずねる文は？", a: "What club do you want to join?", why: "「どの部活に」なので What club で始める。" },
    { q: "I want to ___ the sports festival.（体育祭を楽しみたい）の ___ に入るのは？", a: "enjoy", why: "行事を楽しむは enjoy。" },
  ],
  next: [
    { label: "「中学校でしたいこと」のドリル", href: "/learn/eigo-sho/e-english-56-chugaku" },
    { label: "ひとつ前の図解レクチャー「小学校の思い出」", href: "/learn/lecture/e-english-56-omoide" },
    { label: "中学の図解レクチャー「be動詞《どうし》」", href: "/learn/lecture/j-en-1-be" },
  ],
};
