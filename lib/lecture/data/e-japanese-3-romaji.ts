import type { Lecture } from "../types";

export const E_JAPANESE_3_ROMAJI: Lecture = {
  unit: "e-japanese-3-romaji",
  title: "ローマ字は「子音《しいん》＋母音」の組み合わせで書く",
  hook: "駅の名前のかんばんや、パソコンで文字を打つとき、アルファベットで書かれた日本語を見かけます。これがローマ字です。しくみは「子音《しいん》＋母音」のたし算なので、きまりを知れば、どの言葉でも書けるようになります。",
  sections: [
    {
      heading: "母音は a・i・u・e・o の5つ",
      body: "「あ・い・う・え・お」は、{{a・i・u・e・o}}の1文字で書きます。これを{{母音}}といいます。ほかの音は、k・s・t などの{{子音《しいん》}}と母音を組み合わせて書きます。たとえば「か」は k と a で{{ka}}です。",
      figure: {
        type: "formula",
        title: "子音《しいん》＋母音で1つの音",
        prose: true,
        steps: [
          { label: "か", expr: "k ＋ a → {{ka}}", note: "か行は k" },
          { label: "み", expr: "m ＋ i → {{mi}}", note: "ま行は m" },
          { label: "ねこ", expr: "ne ＋ ko → {{neko}}", note: "音をつなげる" },
          { label: "さかな", expr: "sa ＋ ka ＋ na → {{sakana}}" },
        ],
      },
    },
    {
      heading: "2つの書き方がある音",
      body: "「し」「ち」「つ」「ふ」などは、書き方が{{2通り}}あります。表の左は、行ごとに子音《しいん》をそろえる書き方（訓令式《くんれいしき》）です。右は、英語《えいご》の音に近づけた書き方（ヘボン式）です。駅の名前やパスポートでは、ヘボン式がよく使われます。",
      figure: {
        type: "compare",
        title: "2通りの書き方",
        columns: [{ title: "訓令式《くんれいしき》", tone: "blue" }, { title: "ヘボン式", tone: "yellow" }],
        rows: [
          { label: "し", cells: ["si", "shi"] },
          { label: "ち", cells: ["ti", "chi"] },
          { label: "つ", cells: ["tu", "tsu"] },
          { label: "ふ", cells: ["hu", "fu"] },
          { label: "しゃ", cells: ["sya", "sha"] },
        ],
        note: "どちらで書いても、読み方は同じ。",
      },
    },
    {
      heading: "のばす音・つまる音・「ん」",
      body: "のばす音は、母音の上に{{「^」}}をつけます。小さい「っ」は、次の{{子音《しいん》を2つ重ねて}}書きます。「ん」は n ですが、後ろに母音や y が来るときは{{n'}}と書いて区切ります。",
      figure: {
        type: "tree",
        title: "とくべつな書き方",
        root: {
          label: "とくべつな音",
          tone: "navy",
          children: [
            { label: "のばす音", sub: "おかあさん→okâsan", tone: "blue" },
            { label: "つまる音", sub: "きって→kitte", tone: "blue" },
            { label: "「ん」の区切り", sub: "ほんや→hon'ya", tone: "yellow" },
          ],
        },
        note: "hon'ya の「'」がないと、「ほにゃ」と読めてしまう。",
      },
    },
    {
      heading: "大文字を使うところ",
      body: "人の名前や地名は、最初《さいしょ》の1文字を{{大文字}}にします。文の書きはじめも大文字です。名字と名前の間は、1文字あけて書きます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "名前をローマ字で書く",
        steps: [
          { label: "音に分ける", sub: "やま・だ／は・な", tone: "blue" },
          { label: "1音ずつ書く", sub: "yamada / hana" },
          { label: "最初《さいしょ》を大文字に", sub: "Yamada Hana", tone: "yellow" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "「きって」を kite と書く",
      right: "kitte",
      why: "小さい「っ」は、次の子音《しいん》 t を2つ重ねて書きます。kite だと「きて」になります。",
    },
    {
      wrong: "「ほんや」を honya と書く",
      right: "hon'ya",
      why: "honya は「ほにゃ」とも読めます。「ん」の後ろに y が来るので「'」で区切ります。",
    },
    {
      wrong: "地名を tôkyô と小文字だけで書く",
      right: "Tôkyô",
      why: "人の名前や地名は、最初《さいしょ》の1文字を大文字にします。",
    },
  ],
  check: [
    {
      q: "「すいか」をローマ字で書くと？",
      a: "suika",
      why: "su ＋ i ＋ ka です。「い」は母音 i だけで書きます。",
    },
    {
      q: "「がっこう」をローマ字で書くと？",
      a: "gakkô",
      why: "小さい「っ」で k を重ね、のばす「う」は ô と書きます。",
    },
    {
      q: "「つ」のヘボン式の書き方は？",
      a: "tsu",
      why: "訓令式《くんれいしき》では tu と書きます。",
    },
  ],
  next: [
    { label: "「ローマ字」ドリル", href: "/learn/kokugo-sho/e-japanese-3-romaji" },
    { label: "3年「国語｜辞典《じてん》の使い方」", href: "/learn/kokugo-sho/e-japanese-3-jisho" },
    { label: "2年「かたかなで書く言葉」", href: "/learn/kokugo-sho/e-japanese-2-katakana" },
  ],
};
