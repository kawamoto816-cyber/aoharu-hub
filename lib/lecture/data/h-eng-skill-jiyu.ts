import type { Lecture } from "../types";

export const H_ENG_SKILL_JIYU: Lecture = {
  unit: "h-eng-skill-jiyu",
  title: "自由英作文は「主張→理由→具体例→まとめ」の型。書きやすい立場を選んでよい",
  hook: "「高校生はアルバイトをするべきか。あなたの意見を80語程度で書きなさい」。こう聞かれて、何から書けばいいか迷う人は多いでしょう。自由英作文で見られるのは、立派な意見よりも、主張と理由がはっきりした読みやすい英文かどうかです。決まった型と、ミスの少ない書き方を覚えれば、どんなテーマでも組み立てられます。",
  sections: [
    {
      heading: "型は「主張→理由→具体例→まとめ」",
      body: "最初の1文で{{賛成か反対か（主張）}}をはっきり書きます。次に{{理由}}を述べ、それを支える{{具体例}}や説明をつけます。最後に主張をもう一度、少し言いかえて{{まとめ}}ます。この順番なら、読む人は最初の1文で結論がわかり、そのあとを安心して読めます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "自由英作文の型",
        steps: [
          { label: "主張", sub: "I think 〜.", tone: "navy" },
          { label: "理由①", sub: "First, 〜.", tone: "blue" },
          { label: "具体例・説明", sub: "例：For example" },
          { label: "理由②", sub: "Second, 〜.", tone: "blue" },
          { label: "まとめ", sub: "To sum up, 〜.", tone: "yellow" },
        ],
      },
    },
    {
      heading: "立場は「本音」より「書きやすさ」で選ぶ",
      body: "自由英作文は、本当の意見を書かなくてもかまいません。{{理由と例を英語で書きやすいほう}}の立場を選びます。書く前に、日本語で理由を2つ、それぞれに例を1つずつメモしてから英語にすると、途中で話がずれません。理由は「お金」「時間」「健康」「経験」など、{{だれにでも伝わる観点}}から考えると見つけやすいです。",
      figure: {
        type: "tree",
        title: "書く前のメモ（アルバイトに賛成の場合）",
        root: {
          label: "賛成",
          sub: "バイトはするべき",
          tone: "navy",
          children: [
            { label: "理由① 経験", sub: "社会のしくみを学ぶ", tone: "blue", children: [{ label: "例", sub: "客への話し方を学ぶ" }] },
            { label: "理由② お金", sub: "お金の大切さを知る", tone: "blue", children: [{ label: "例", sub: "自分で買う喜び" }] },
          ],
        },
      },
    },
    {
      heading: "語数は、理由と具体例に多くふり分ける",
      body: "80語程度なら、主張とまとめはそれぞれ{{1文（10語前後）}}で十分です。残りの約60語を、{{2つの理由とその具体例}}に使います。語数が足りないときは、新しい理由を足すより、{{具体例をくわしくする}}ほうが話がまとまります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "80語の配分の目安",
        bars: [
          {
            label: "80語",
            parts: [
              { value: 10, label: "主張", tone: "navy" },
              { value: 30, label: "理由①＋例", tone: "blue" },
              { value: 30, label: "理由②＋例", tone: "blue" },
              { value: 10, label: "まとめ", tone: "yellow" },
            ],
            total: "80語",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 40, label: "40" },
          { at: 80, label: "80" },
        ],
        scaleLabel: "語数",
      },
    },
    {
      heading: "難しい表現より、まちがえない英文で書く",
      body: "採点では、内容のほかに{{文法・語法のミス}}が減点されます。自信のない難しい単語を使うより、{{中学レベルの確実な表現}}で書くほうが安全です。また、主張と理由がちぐはぐにならないように、書き終えたら最初の1文と最後の1文が同じ立場になっているか確かめます。",
      figure: {
        type: "formula",
        title: "理由①の部分を書く",
        prose: true,
        steps: [
          { expr: "{{I think that}} high school students should have part-time jobs.", note: "主張：立場を1文で" },
          { expr: "{{First,}} they can learn how society works.", note: "理由①" },
          { expr: "{{For example,}} working at a shop teaches them how to talk to customers.", note: "具体例：理由を支える" },
        ],
        note: "First / Second / For example などの目じるしをつけると、読む人が組み立てを追いやすい。",
      },
    },
  ],
  mistakes: [
    { wrong: "I agree and disagree. のように、両方の立場を書く", right: "どちらか一方の立場をはっきり書く", why: "主張がはっきりしないと、理由とのつながりも弱くなります。設問が「賛成か反対か」なら一方を選びます。" },
    { wrong: "理由を3つも4つも並べて、どれも1文で終わる", right: "理由は2つにしぼり、それぞれに具体例をつける", why: "理由だけを並べると説得力が出ません。例や説明で支えるほうが評価されます。" },
    { wrong: "Because 〜. だけで1文にする", right: "This is because 〜. / 主節＋because 〜.", why: "Because 〜 は従属節なので、それだけでは文として完結しません。This is because 〜 か、主節とつないで書きます。" },
  ],
  check: [
    { q: "自由英作文の型を、4つの部分で順に言いましょう。", a: "主張 → 理由 → 具体例 → まとめ", why: "結論を先に言い、理由と例で支え、最後にもう一度まとめる。" },
    { q: "80語程度で書くとき、いちばん多く語数を使うのはどの部分？", a: "理由と具体例", why: "主張とまとめは1文ずつで十分。残りで理由を支える。" },
    { q: "立場は、本当の意見と書きやすさのどちらで選んでもよい？", a: "書きやすさで選んでよい", why: "評価されるのは意見の中身より、理由がはっきりした正しい英文かどうか。" },
  ],
  next: [
    { label: "ドリル「自由英作文」で鍛える", href: "/learn/eigo-ko/h-eng-skill-jiyu" },
    { label: "ひとつ前「和文英訳」", href: "/learn/lecture/h-eng-skill-wabun" },
    { label: "話して使う「スピーキング」", href: "/learn/lecture/h-eng-skill-speaking" },
  ],
};
