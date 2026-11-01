import type { Lecture } from "../types";

export const H_ENG_SKILL_LISTENING: Lecture = {
  unit: "h-eng-skill-listening",
  title: "リスニングは「先読み」で待ちかまえ、音のつながりを知って聞きとる",
  hook: "文字で読めばすぐわかる英文なのに、音で聞くと聞きとれない。その原因の多くは、単語と単語がつながって発音が変わることと、何を聞けばよいかわからないまま聞いていることです。リスニングは才能ではなく、音のしくみと聞き方の手順を知ることで、目に見えて点が上がる技能です。",
  sections: [
    {
      heading: "音声が流れる前に、選択肢を「先読み」する",
      body: "放送が始まる前の時間に、{{設問と選択肢}}に目を通します。選択肢が時刻なら「時間を聞く」、場所なら「場所を聞く」と、{{聞くべき情報}}を決めておきます。選択肢どうしの{{ちがい}}に注目すると、どこで答えが決まるかが予想できます。",
      figure: {
        type: "flow",
        title: "1問を解く流れ",
        steps: [
          { label: "先読み", sub: "選択肢のちがいを見る", tone: "blue" },
          { label: "聞く", sub: "決めた情報に集中" },
          { label: "すぐ選ぶ", sub: "次の問題の先読みへ", tone: "yellow" },
        ],
        note: "1問に迷いすぎると、次の問題の先読みができなくなる。わからなければ印をつけて先へ。",
      },
    },
    {
      heading: "単語がつながると、音が変わる",
      body: "英語は単語を1つずつ区切って読みません。前の語の終わりの子音と次の語の母音がつながる{{連結}}、終わりの音がほとんど聞こえなくなる{{脱落}}、となりの音どうしがとけ合って別の音になる{{同化}}が起こります。この3つを知っておくと、「知っている単語なのに聞きとれない」がへります。",
      figure: {
        type: "compare",
        title: "音の変化の3パターン",
        columns: [{ title: "名前", tone: "navy" }, { title: "例", tone: "blue" }, { title: "聞こえ方", tone: "yellow" }],
        rows: [
          { cells: ["連結（つながる）", "pick it up", "ピキラップ"] },
          { cells: ["脱落（消える）", "good night", "グッナイ"] },
          { cells: ["同化（とけ合う）", "Did you ～?", "ディジュ"] },
        ],
        note: "カタカナは目安。実際の音声をくり返し聞いて、耳で覚える。",
      },
    },
    {
      heading: "答えは、放送の「言いかえ」で選ぶ",
      body: "正解の選択肢は、放送で聞こえた語とは{{別の表現}}で書かれていることが多いです。反対に、放送の語がそのまま入った選択肢はひっかけのこともあります。とくに会話では、{{最初の予定が途中で変わる}}ことがよくあるので、but や actually のあとをよく聞きましょう。",
      figure: {
        type: "formula",
        title: "予定が変わる会話",
        prose: true,
        steps: [
          { label: "A", expr: "Let's meet at the station {{at three}}.", note: "最初の予定：3時" },
          { label: "B", expr: "Sorry, I have a club meeting. {{How about four}}?", note: "変更の提案：4時" },
          { label: "A", expr: "{{OK}}. See you then.", note: "4時に決まり" },
          { label: "答え", expr: "They will meet {{one hour later}} than A's plan.", note: "選択肢は言いかえ" },
        ],
      },
    },
    {
      heading: "聞きとれなかった英文で、耳をきたえる",
      body: "問題を解いて答え合わせをしたら終わり、ではもったいないです。聞きとれなかった英文を{{書きとり（ディクテーション）}}して、スクリプトと比べると、自分が聞きのがす音がわかります。そのあと、音声のすぐあとを追いかけて声に出す{{シャドーイング}}をすると、音のつながりが身につきます。",
      figure: {
        type: "cycle",
        title: "聞きとる力をのばす練習",
        center: "同じ音声を何度も",
        steps: [
          { label: "聞いて解く", tone: "blue" },
          { label: "書きとる", sub: "ディクテーション" },
          { label: "スクリプト確認", sub: "聞きのがした音" },
          { label: "声に出す", sub: "シャドーイング", tone: "yellow" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "全部の単語を聞きとろうとして、1語わからないと止まる", right: "先読みで決めた情報に集中して、流れをつかむ", why: "すべての語を聞きとれなくても答えは出せます。止まると次の大事な部分を聞きのがします。" },
    { wrong: "fifteen（15）と fifty（50）を聞きまちがえる", right: "fifteen は後ろ（-teen）、fifty は前（fif-）を強く読む", why: "-teen と -ty は、強く読む位置で区別します。数字の問題でよくねらわれます。" },
    { wrong: "最初に聞こえた予定や数字で答えを決める", right: "but・actually・How about 〜? のあとの変更まで聞く", why: "会話では予定が途中で変わるのが定番のひっかけです。最後に決まった内容で答えます。" },
  ],
  check: [
    { q: "good night の d がほとんど聞こえなくなる音の変化を何という？", a: "脱落", why: "語の終わりの音が、次の語の音にかくれて聞こえにくくなる。" },
    { q: "音声が始まる前に設問と選択肢を見ておくことを何という？", a: "先読み", why: "聞くべき情報（時刻・場所・理由など）を決めておく。" },
    { q: "音声のすぐあとを追いかけて声に出す練習を何という？", a: "シャドーイング", why: "影（shadow）のようについていくことから。音のつながりが身につく。" },
  ],
  next: [
    { label: "ドリル「リスニング」で鍛える", href: "/learn/eigo-ko/h-eng-skill-listening" },
    { label: "発音・アクセントをカードで覚える", href: "/learn/eigo-ko/h-eng-vocab-hatsuon" },
    { label: "つぎの単元「スピーキング」", href: "/learn/lecture/h-eng-skill-speaking" },
  ],
};
