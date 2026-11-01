import type { Lecture } from "../types";

export const H_ENG_SKILL_CHOBUN: Lecture = {
  unit: "h-eng-skill-chobun",
  title: "長文は「段落の主張」をつなぐ。設問を先に見て、根拠は本文の言いかえを探す",
  hook: "長い英文を前から1語ずつ訳していくと、最後の段落に着くころには最初の内容を忘れてしまいます。入試や模試の長文で問われるのは、細かい訳よりも「筆者は何を言いたいか」と「その根拠はどこか」です。段落の組み立てと、つなぎの言葉の読み方を身につけると、知らない単語があっても話の筋を見失わなくなります。",
  sections: [
    {
      heading: "読む前に、設問とタイトルを見る",
      body: "本文に入る前に、{{タイトル}}と{{設問}}にさっと目を通します。何について書かれた文章か、どの情報を探せばよいかがわかってから読むと、大事なところで止まれます。選択肢まで全部読む必要はなく、設問の{{キーワード}}（人名・数字・年など）に印をつけるくらいで十分です。",
      figure: {
        type: "flow",
        title: "長文を解く手順",
        steps: [
          { label: "設問を先に見る", sub: "何を探すか決める", tone: "blue" },
          { label: "段落ごとに読む", sub: "要点を1行メモ" },
          { label: "根拠で答える", sub: "本文にもどって確認", tone: "yellow" },
        ],
        note: "1段落読むごとに、関係する設問があればその場で解くと、読み返す時間がへる。",
      },
    },
    {
      heading: "段落は「主張→説明→例」でできている",
      body: "英語の段落は、多くの場合{{最初の1〜2文（トピック・センテンス）}}にその段落の言いたいことがきます。そのあとに理由や説明、具体例が続き、最後にまとめが来ることもあります。迷ったら、{{段落の最初の文}}と{{逆接のあとの文}}を拾って読むと、文章全体の流れがつかめます。",
      figure: {
        type: "tree",
        title: "段落の組み立て（例：睡眠についての段落）",
        root: {
          label: "主張",
          sub: "睡眠は学習を助ける",
          tone: "navy",
          children: [
            { label: "理由・説明", sub: "脳が記憶を整理する", tone: "blue" },
            { label: "具体例", sub: "実験・データ・体験談" },
            { label: "まとめ", sub: "主張をもう一度", tone: "yellow" },
          ],
        },
      },
    },
    {
      heading: "つなぎの言葉が、次に来る内容を予告する",
      body: "{{However}} や {{But}} のあとには、前と反対の内容、つまり筆者の本当の主張が来やすいです。{{For example}} のあとは具体例なので、前の文がわかっていれば軽く読んでかまいません。{{Therefore}} や So のあとは結論です。つなぎの言葉に印をつけながら読むと、文と文の関係が見えてきます。",
      figure: {
        type: "compare",
        title: "つなぎの言葉と、あとに来る内容",
        columns: [{ title: "つなぎの言葉", tone: "blue" }, { title: "あとに来る内容", tone: "yellow" }],
        rows: [
          { label: "逆接", cells: ["However / But", "反対の内容・主張"] },
          { label: "例", cells: ["For example", "具体例（軽く読む）"] },
          { label: "結論", cells: ["Therefore / So", "結論・まとめ"] },
          { label: "追加", cells: ["Also / Moreover", "同じ向きの情報"] },
          { label: "対比", cells: ["On the other hand", "もう一方の立場"] },
        ],
      },
    },
    {
      heading: "正解の選択肢は、本文の「言いかえ」になっている",
      body: "内容一致問題の正解は、本文と{{同じ語}}ではなく、{{別の言い方}}で書かれていることがほとんどです。逆に、本文の語をそのまま使った選択肢は、一部だけ変えたひっかけのことがあります。選んだら本文の該当箇所にもどり、{{主語・数・肯定か否定か}}まで一致しているか確かめましょう。",
      figure: {
        type: "formula",
        title: "本文と正解の選択肢の関係",
        prose: true,
        steps: [
          { label: "本文", expr: "Many students {{could not sleep}} well before the test.", note: "テスト前によく眠れなかった" },
          { label: "正解", expr: "Many students {{had trouble sleeping}} before the test.", note: "◯ 同じ内容を別の表現で" },
          { label: "ひっかけ", expr: "{{All}} students could not sleep well before the test.", note: "✕ many → all で範囲が変わる" },
        ],
        note: "all・only・never・always など「言い切る語」が入った選択肢は特に慎重に。",
      },
    },
  ],
  mistakes: [
    { wrong: "知らない単語が出るたびに止まって、意味を考えこむ", right: "前後の文や例から意味を推測して、先に進む", why: "長文では1語より話の流れのほうが大事です。そのあとに具体例や言いかえが続くことも多く、読み進めると意味がわかります。" },
    { wrong: "本文と同じ単語が入っている選択肢を選ぶ", right: "意味が一致しているかで選ぶ", why: "正解はたいてい言いかえです。同じ語を使ったひっかけは、数や否定など一部が本文とずれています。" },
    { wrong: "However のあとを読み飛ばす", right: "However のあとこそていねいに読む", why: "逆接のあとには筆者の本当の主張が来やすく、設問にもよく使われます。" },
  ],
  check: [
    { q: "段落の言いたいことが書かれていることが多いのは、段落のどこ？", a: "最初の1〜2文（トピック・センテンス）", why: "英語の段落は、主張を先に言ってから説明や例を続けるのが基本。" },
    { q: "For example のあとに来るのは、ふつう何？", a: "前の文の具体例", why: "前の文の内容を、例を使ってわかりやすくしている。" },
    { q: "本文 The library is closed on Mondays. と同じ内容になるのは「The library is open every day.」と「You cannot use the library on Mondays.」のどちら？", a: "You cannot use the library on Mondays.", why: "「月曜は閉館」を「月曜は使えない」と言いかえている。" },
  ],
  next: [
    { label: "ドリル「長文読解」で鍛える", href: "/learn/eigo-ko/h-eng-skill-chobun" },
    { label: "関連「接続詞」", href: "/learn/eibunpo-ko/h-eng-gram-setsuzokushi" },
    { label: "つぎの単元「和文英訳」", href: "/learn/lecture/h-eng-skill-wabun" },
  ],
};
