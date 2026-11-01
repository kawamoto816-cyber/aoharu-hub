import type { Lecture } from "../types";

export const H_ENG_GRAM_HIKAKU: Lecture = {
  unit: "h-eng-gram-hikaku",
  title: "比較は「同じ・より上・いちばん」の3段。そろえるのは比べる相手",
  hook: "「このスマホは前のより軽い」「クラスでいちばん足が速い」のように、私たちは毎日何かを比べています。英語の比較は、原級・比較級・最上級の3つの形と、それぞれの決まった型でできています。型と書きかえを押さえれば、長文の数字の比較も読み取れるようになります。",
  sections: [
    {
      heading: "形容詞・副詞の3つの形",
      body: "比較の文では、形容詞・副詞を{{原級}}・{{比較級}}・{{最上級}}に変えます。短い語は {{-er / -est}}、長い語（多くの2音節語と3音節以上）は {{more / most}} を前に置きます。good・bad・many などは形が大きく変わる{{不規則変化}}なので、そのまま覚えます。",
      figure: {
        type: "compare",
        title: "比較変化の例",
        columns: [{ title: "原級" }, { title: "比較級", tone: "blue" }, { title: "最上級", tone: "yellow" }],
        rows: [
          { cells: ["fast", "faster", "fastest"] },
          { cells: ["big", "bigger", "biggest"] },
          { cells: ["easy", "easier", "easiest"] },
          { cells: ["useful", "more useful", "most useful"] },
          { cells: ["good / well", "better", "best"] },
          { cells: ["many / much", "more", "most"] },
        ],
        note: "big は子音字を重ね、easy は y を i にかえる。",
      },
    },
    {
      heading: "原級：as ... as で「同じくらい」、倍数もこの型",
      body: "{{as ＋原級＋ as}} は「〜と同じくらい…」です。否定の {{not as ... as}} は「〜ほど…でない」で、相手のほうが上になります。「〜の2倍…」は {{twice as ... as}}、3倍以上は three times as ... as のように、as の前に倍数を置きます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "B is twice as heavy as A.",
        bars: [
          { label: "箱 A", parts: [{ value: 3, label: "3 kg", tone: "blue" }], total: "3 kg" },
          { label: "箱 B", parts: [{ value: 3, label: "3 kg", tone: "blue" }, { value: 3, label: "3 kg", tone: "yellow" }], total: "6 kg" },
        ],
        note: "A is not as heavy as B.（A は B ほど重くない）とも言える。",
      },
    },
    {
      heading: "比較級：than で相手を示し、差は前に置く",
      body: "比較級は {{than}} で比べる相手を示します。「ずっと〜」と強めるときは {{much / far}} を比較級の前に置き、very は使いません。差の大きさは比較級の前に置きます（three years older than 〜）。{{The ＋比較級 〜, the ＋比較級 …}} は「〜すればするほど…」です。",
      figure: {
        type: "formula",
        title: "比較級の文を組み立てる",
        prose: true,
        steps: [
          { expr: "This bag is {{lighter than}} that one.", note: "基本の形" },
          { expr: "This bag is {{much}} lighter than that one.", note: "強めるのは much（very は ×）" },
          { expr: "This bag is {{200 grams}} lighter than that one.", note: "差は比較級の前" },
          { expr: "{{The more}} you practice, {{the better}} you play.", note: "〜すればするほど…" },
        ],
      },
    },
    {
      heading: "最上級と、その書きかえ",
      body: "最上級は {{the ＋最上級}}で「いちばん〜」です。範囲を示すとき、後ろが{{複数の仲間}}なら of（of the three）、{{場所や集団}}なら in（in my class）を使います。最上級の意味は、比較級や原級を使っても表せます。any other や No other の後ろの名詞は{{単数形}}にします。",
      figure: {
        type: "formula",
        title: "同じ意味を3つの形で",
        prose: true,
        steps: [
          { label: "最上級", expr: "Lake Biwa is {{the largest}} lake in Japan.", note: "いちばん大きい" },
          { label: "比較級", expr: "Lake Biwa is larger than {{any other lake}} in Japan.", note: "ほかのどの湖よりも" },
          { label: "比較級", expr: "{{No other lake}} in Japan is larger than Lake Biwa.", note: "どの湖も〜より大きくない" },
          { label: "原級", expr: "{{No other lake}} in Japan is {{as large as}} Lake Biwa.", note: "どの湖も〜ほど大きくない" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "My brother is more taller than me.", right: "My brother is taller than me.", why: "-er の比較級に more を重ねません。" },
    { wrong: "This question is very easier than that one.", right: "This question is much easier than that one.", why: "比較級を強めるのは much / far。very は原級を強めます。" },
    { wrong: "She is the fastest runner of our school.", right: "She is the fastest runner in our school.", why: "学校・クラスのような範囲（集団）には in を使います。" },
    { wrong: "He is taller than any other students.", right: "He is taller than any other student.", why: "any other の後ろの名詞は単数形です。" },
  ],
  check: [
    { q: "This room is three times ___ ___ as mine.（広さ large）", a: "as large", why: "倍数は as ＋原級＋ as の前に置く。" },
    { q: "Tom is the tallest ___ the five boys. の ___ は？", a: "of", why: "後ろが複数の仲間（the five boys）なので of。" },
    { q: "「早く出発すればするほど、早く着く」を英語に。（leave / arrive）", a: "The earlier you leave, the earlier you (will) arrive.", why: "The ＋比較級 〜, the ＋比較級 … の型。" },
  ],
  next: [
    { label: "4択ドリル「比較」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-hikaku" },
    { label: "関連「形容詞・副詞」", href: "/learn/eibunpo-ko/h-eng-gram-keiyoshi" },
    { label: "関連「否定・倒置・強調・省略」", href: "/learn/eibunpo-ko/h-eng-gram-tokushu" },
  ],
};
