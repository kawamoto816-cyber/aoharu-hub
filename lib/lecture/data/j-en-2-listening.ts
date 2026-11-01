import type { Lecture } from "../types";

export const J_EN_2_LISTENING: Lecture = {
  unit: "j-en-2-listening",
  title: "リスニングは「さそい・お願い」の返事と、話の「変更」を聞きのがさない",
  hook: "中2のリスニングでは会話が少し長くなり、予定が途中で変わったり、時刻を計算したりする問題がふえます。聞こえた数字をそのまま選ぶと引っかかることも多いです。どこで答えが決まるのか、{{合図になることば}}を知っておきましょう。",
  sections: [
    {
      heading: "さそい・お願いには決まった返し方がある",
      body: "会話の最後が Shall we 〜? や Will you 〜? のときは、それに合う{{返事}}を選ぶ問題がよく出ます。さそいには Yes, let's. や That's a good idea.、お願いには Sure. や All right. のように、{{決まった返し方}}をセットで覚えておくと、聞いた瞬間に答えが選べます。",
      figure: {
        type: "compare",
        title: "言われた文と返事の例",
        columns: [{ title: "言われた文" }, { title: "返事の例", tone: "yellow" }],
        rows: [
          { label: "さそい", cells: ["Shall we 〜?", "Yes, let's."] },
          { label: "さそい", cells: ["Why don't we 〜?", "That's a good idea."] },
          { label: "お願い", cells: ["Will you 〜?", "Sure. / All right."] },
          { label: "申し出", cells: ["Shall I 〜?", "Yes, please."] },
          { label: "許可", cells: ["May I 〜?", "Sure. / Of course."] },
        ],
        note: "ことわるときは Sorry, I can't. のあとに理由が続くことが多い。",
      },
    },
    {
      heading: "But や Actually のあとに答えがある",
      body: "会話の中で But・Actually・Sorry などが聞こえたら、{{予定や考えが変わる合図}}です。最初に出た予定ではなく、{{変わったあとの内容}}が答えになることがよくあります。合図のことばのあとは、とくに集中して聞きましょう。",
      figure: {
        type: "cause",
        title: "話が変わる合図",
        causes: [
          { label: "But …", sub: "でも" },
          { label: "Actually …", sub: "実は" },
          { label: "Sorry, I can't.", sub: "ことわり" },
        ],
        effect: { label: "話が変わる", tone: "yellow" },
        chain: [{ label: "変わったあとが答え", tone: "red" }],
      },
    },
    {
      heading: "時刻や金額は、計算してから答える",
      body: "「映画は3時に始まる。{{30分前}}に会おう」なら、答えは2時30分です。before・after・〜 minutes later などは{{計算の合図}}なので、聞こえた数字をメモし、計算してから選びます。選択肢には、計算前の数字がわざと入っていることがあります。",
      figure: {
        type: "formula",
        title: "待ち合わせの時刻を求める",
        prose: true,
        steps: [
          { label: "聞こえた", expr: "The movie starts at {{three}}.", note: "始まるのは3時" },
          { label: "合図", expr: "Let's meet {{thirty minutes before}} it.", note: "30分前に会う" },
          { label: "計算", expr: "3:00 − 30分 ＝ {{2:30}}", note: "答えは 2時30分" },
        ],
      },
    },
    {
      heading: "長い英文は「だれ・いつ・どこ・何」をメモする",
      body: "スピーチや案内などの長い英文では、{{だれが・いつ・どこで・何を・なぜ}}を短くメモします。全部を書き取ろうとせず、{{キーワード}}だけを日本語や数字で書きましょう。質問が英文のあとに読まれる問題では、メモを見ながら答えを選びます。",
    },
  ],
  mistakes: [
    { wrong: "Shall we play tennis? — Yes, I do.", right: "Yes, let's.", why: "Shall we 〜?（〜しましょうか）はさそい。Yes, let's. で答えます。" },
    { wrong: "会話の最初に出た予定を答える", right: "But や Actually のあとの予定を答える", why: "合図のことばのあとで予定が変わることが多いからです。" },
    { wrong: "「3時に始まる」と聞いて 3:00 を選ぶ", right: "before・after を聞いて計算する", why: "質問が聞いているのは「会う時刻」など、計算したあとの数字のことがあります。" },
  ],
  check: [
    { q: "Will you help me? への返事として合うのは「Sure.」と「Yes, let's.」のどっち？", a: "Sure.", why: "Will you 〜? はお願い。Yes, let's. はさそいへの返事。" },
    { q: "A: Let's meet at ten. B: Sorry, I can't. How about eleven? A: OK. 2人が会うのは何時？", a: "11時", why: "Sorry のあとで予定が変わり、A が OK と言っている。" },
    { q: "The bus leaves at 4:15. Let's be there ten minutes before. 何時にバス停に行く？", a: "4時5分", why: "4:15 の10分前（before）。" },
  ],
  next: [
    { label: "4択ドリル「リスニング」に挑戦", href: "/learn/eigo-chu/j-en-2-listening" },
    { label: "復習「リスニング（中1）」のレクチャー", href: "/learn/lecture/j-en-1-listening" },
    { label: "Shall I 〜? などの「助動詞」のレクチャー", href: "/learn/lecture/j-en-2-jodoshi" },
  ],
};
