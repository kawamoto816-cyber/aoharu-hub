import type { Lecture } from "../types";

export const E_ENGLISH_34_AISATSU: Lecture = {
  unit: "e-english-34-aisatsu",
  title: "あいさつは時こくで選《えら》び、気持ちは I'm 〜. で伝《つた》える",
  hook: "朝、友だちに「おはよう」と言うと、一日が気持ちよく始まりますね。英語《えいご》でも、あいさつは人となかよくなる第一歩です。まずは耳で聞いて、まねして、声に出して言ってみましょう。",
  sections: [
    {
      heading: "時こくで変《か》わるあいさつ",
      body: "英語《えいご》のあいさつは、時こくによって言葉が変《か》わります。朝は {{Good morning.}}、昼すぎは {{Good afternoon.}}、夜ねる前は {{Good night.}} です。{{Hello.}} は、いつでも使える {{便利《べんり》}} なあいさつです。",
      figure: {
        type: "flow",
        dir: "row",
        title: "朝・昼・夜のあいさつ",
        steps: [
          { label: "Good morning.", sub: "朝", tone: "yellow" },
          { label: "Good afternoon.", sub: "昼すぎ", tone: "blue" },
          { label: "Good night.", sub: "夜ねる前", tone: "navy" },
        ],
        note: "夜に人と会ったときは Good evening.。Good night. は「おやすみなさい」です。",
      },
    },
    {
      heading: "はじめて会ったとき",
      body: "はじめて会った人には、自分の名前を {{I'm 〜.}} で言い、{{Nice to meet you.}} と言います。言われた人は、最後《さいご》に {{too}} をつけて返します。相手の目を見て、にっこり言うのがコツです。",
      figure: {
        type: "formula",
        title: "はじめましての会話",
        prose: true,
        steps: [
          { label: "A", expr: "Hello. {{I'm}} Hana." },
          { label: "B", expr: "Hi, Hana. {{I'm}} Leo." },
          { label: "A", expr: "{{Nice to meet you.}}" },
          { label: "B", expr: "Nice to meet you, {{too}}.", note: "「こちらこそ」" },
        ],
      },
    },
    {
      heading: "How are you? と気持ちの言葉",
      body: "相手の様子を聞くときは {{How are you?}} と言います。答えるときは {{I'm 〜.}} のあとに、今の気持ちの言葉を入れます。聞くときは、言葉だけでなく、顔や声の様子にも注目すると、意味が分かりやすくなります。",
      figure: {
        type: "compare",
        title: "I'm 〜. で言える気持ち",
        columns: [{ title: "英語《えいご》", tone: "blue" }, { title: "意味", tone: "yellow" }],
        rows: [
          { cells: ["I'm fine.", "元気です"] },
          { cells: ["I'm great.", "とても元気です"] },
          { cells: ["I'm happy.", "うれしいです"] },
          { cells: ["I'm hungry.", "おなかがすいています"] },
          { cells: ["I'm sleepy.", "ねむいです"] },
          { cells: ["I'm tired.", "つかれています"] },
          { cells: ["I'm sad.", "悲しいです"] },
        ],
      },
    },
    {
      heading: "会話をつなげてみよう",
      body: "あいさつ、様子を聞く、答える、お別《わか》れ、とつなげると、短い会話ができます。お別《わか》れは {{See you.}} や {{Goodbye.}} です。お礼の {{Thank you.}} には {{You're welcome.}}（どういたしまして）と返します。",
      figure: {
        type: "flow",
        dir: "col",
        title: "友だちとの会話の流れ",
        steps: [
          { label: "Hello, Mio.", sub: "あいさつ", tone: "blue" },
          { label: "How are you?", sub: "様子を聞く", tone: "plain" },
          { label: "I'm happy.", sub: "気持ちを答える", tone: "yellow" },
          { label: "See you.", sub: "またね", tone: "navy" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "夜に会った人へ Good night. と言う",
      right: "会ったときは Hello. や Good evening.",
      why: "Good night. は、別《わか》れるときやねる前の「おやすみなさい」です。",
    },
    {
      wrong: "Nice to meet you. に Nice to meet you. と同じように返す",
      right: "Nice to meet you, too.",
      why: "最後《さいご》に too をつけると「こちらこそ」の意味になります。",
    },
    {
      wrong: "How are you? に Yes. と答える",
      right: "I'm fine. のように気持ちを答える",
      why: "How are you? は「元気？」と様子を聞く言葉なので、はい・いいえでは答えません。",
    },
  ],
  check: [
    { q: "朝、先生に会いました。英語《えいご》で何と言う？", a: "Good morning.", why: "朝のあいさつは Good morning. です。" },
    { q: "How are you? と聞かれて、ねむいとき何と答える？", a: "I'm sleepy.", why: "sleepy は「ねむい」です。" },
    { q: "Thank you. と言われたら、何と返す？", a: "You're welcome.", why: "「どういたしまして」の意味です。" },
  ],
  next: [
    { label: "「あいさつと気持ち」のカード", href: "/learn/eigo-sho/e-english-34-aisatsu" },
    { label: "図解《ずかい》レクチャー「数の言い方」", href: "/learn/lecture/e-english-34-kazu" },
    { label: "「好《す》きなものを伝《つた》える」のカード", href: "/learn/eigo-sho/e-english-34-suki" },
  ],
};
