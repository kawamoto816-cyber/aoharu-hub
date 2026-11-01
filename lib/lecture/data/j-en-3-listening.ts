import type { Lecture } from "../types";

export const J_EN_3_LISTENING: Lecture = {
  unit: "j-en-3-listening",
  title: "長い放送は「質問を先に読む」「but のあとを聞く」「言いかえに気づく」",
  hook: "中3のリスニングでは、会話が長くなり、スピーチや校内アナウンスも出てきます。聞こえた語がそのまま選択肢にあるとは限らず、予定が途中で変わることもあります。どこに答えがかくれやすいかを知っておけば、長い放送でも落ち着いて聞けます。",
  sections: [
    {
      heading: "放送の前に、質問と選択肢を読んでおく",
      body: "放送が始まる前の時間に、{{質問文と選択肢}}を読みます。選択肢どうしの{{ちがう部分}}（時刻・場所・人など）に印をつけておくと、聞くべき情報がはっきりします。2回放送されるときは、1回目で全体の流れとキーワードをつかみ、{{2回目で答えを確かめる}}と考えると、あせらずにすみます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "長い放送を聞く手順",
        steps: [
          { label: "質問と選択肢を読む", sub: "何がたずねられるかを知る", tone: "blue" },
          { label: "ちがう部分に印", sub: "時刻？場所？人？", tone: "yellow" },
          { label: "1回目：流れをつかむ", sub: "数字・名前をメモ" },
          { label: "2回目：答えを確かめる", sub: "迷った所だけ集中して聞く", tone: "red" },
        ],
      },
    },
    {
      heading: "聞こえた語と、選択肢の語はちがうことが多い",
      body: "選択肢では、放送の内容が{{別の言い方}}に言いかえられていることがよくあります。a quarter past three（3時15分）が 3:15 と書かれていたり、年れいの差から答えを{{計算}}させたりします。聞こえた単語と同じ語をさがすのではなく、{{意味が同じもの}}を選びましょう。",
      figure: {
        type: "formula",
        title: "放送 → 選択肢の言いかえ",
        prose: true,
        steps: [
          { label: "放送", expr: "Let's meet at {{a quarter past three}}.", note: "a quarter = 15分" },
          { label: "選択肢", expr: "At {{3:15}}.", note: "数字に言いかえ" },
          { label: "放送", expr: "I'm fifteen. My brother is {{two years older}} than me.", note: "差を聞く" },
          { label: "選択肢", expr: "He is {{seventeen}}.", note: "15＋2を計算" },
          { label: "放送", expr: "Oh no, I {{left my umbrella}} at home.", note: "家に置いてきた" },
          { label: "選択肢", expr: "She {{doesn't have}} an umbrella now.", note: "今は持っていない" },
        ],
      },
    },
    {
      heading: "予定の変更は but・Sorry・actually のあとに来る",
      body: "会話では、一度決まりかけた予定が{{途中で変わる}}ことがあります。but、Sorry, I can't.、Actually, …、How about …? が聞こえたら、そのあとの情報が答えになりやすいので注意します。最初に出た数字にとびつかず、{{最後に決まった内容}}を答えましょう。",
      figure: {
        type: "compare",
        title: "最初の情報と、最後に決まった情報",
        columns: [{ title: "最初に出た情報" }, { title: "変更のあと（答え）", tone: "yellow" }],
        rows: [
          { label: "時刻", cells: ["Let's meet at six.", "Can we make it seven? → 7時"] },
          { label: "場所", cells: ["at the library", "How about the park? → 公園"] },
          { label: "曜日", cells: ["It opens on Monday.", "Actually, it's Tuesday. → 火曜"] },
        ],
        note: "変更の合図のあとは、メモを書き直すつもりで聞く。",
      },
    },
    {
      heading: "スピーチやアナウンスは、組み立てを知って聞く",
      body: "スピーチやアナウンスは、ふつう{{最初に話題}}、{{中ほどに理由や具体例}}、{{最後にまとめや呼びかけ}}という順に話されます。「何について話しているか」は最初、「聞き手に何をしてほしいか」は最後に注意して聞きます。First, … Second, … のような{{順序を表す語}}も、内容を整理する手がかりです。",
      figure: {
        type: "tree",
        title: "スピーチ・アナウンスの組み立て",
        root: {
          label: "スピーチ・アナウンス",
          children: [
            { label: "最初", sub: "話題・目的", tone: "blue", children: [{ label: "Today I'll talk about …" }] },
            { label: "中ほど", sub: "理由・例", tone: "yellow", children: [{ label: "First, … / For example, …" }] },
            { label: "最後", sub: "まとめ・呼びかけ", tone: "red", children: [{ label: "Please …" }] },
          ],
        },
      },
    },
  ],
  mistakes: [
    { wrong: "最初に聞こえた時刻を答える", right: "変更のあとに決まった時刻を答える", why: "but や Can we make it …? のあとで予定が変わることがあります。最後に決まった内容が答えです。" },
    { wrong: "放送と同じ単語が入っている選択肢を選ぶ", right: "意味が同じ選択肢を選ぶ", why: "同じ単語をわざと入れた、まちがいの選択肢がよく作られます。言いかえに気づくことが大切です。" },
    { wrong: "What will Ken do next? で、会話の中で今していることを答える", right: "最後の I'll … や Let's … の内容を答える", why: "「次にすること」は、会話の終わりの未来を表す言い方に出てきます。" },
  ],
  check: [
    { q: "A: Let's go shopping at ten. B: Sorry, I have a lesson. How about eleven? A: OK. ── 2人は何時に出かける？", a: "11時", why: "Sorry のあとで How about eleven? と提案し、A が OK と答えている。" },
    { q: "a quarter to eight は何時何分？", a: "7時45分", why: "to は「〜の前」。8時の15分前なので7時45分。" },
    { q: "アナウンスで「聞き手にしてほしいこと」は、ふつうどこで話される？", a: "最後", why: "まとめや Please … の呼びかけは、話の終わりに来ることが多い。" },
  ],
  next: [
    { label: "4択ドリル「リスニング（中3）」に挑戦", href: "/learn/eigo-chu/j-en-3-listening" },
    { label: "基本をふり返る「リスニング（中1）」", href: "/learn/lecture/j-en-1-listening" },
    { label: "読む力もきたえる「長文読解」", href: "/learn/lecture/j-en-3-chobun" },
  ],
};
