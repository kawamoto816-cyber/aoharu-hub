import type { Lecture } from "../types";

export const H_ENG_VOCAB_2000: Lecture = {
  unit: "h-eng-vocab-2000",
  title: "単語は「1語1訳」でなく、コアの意味・語の部品・品詞のセットで覚える",
  hook: "She runs a small café. を「彼女は小さなカフェを走る」と訳してしまったことはありませんか。高校で出会う単語は、1つの語が文によってちがう意味になったり、形を変えて別の品詞になったりします。2000語を短い時間で身につけるには、ばらばらに暗記するより「しくみでまとめる」ほうが速く、忘れにくいのです。",
  sections: [
    {
      heading: "忘れる前に、思い出す練習をくり返す",
      body: "人は覚えたことを、時間がたつと急に忘れていきます。だから1回で完ぺきにするより、{{間をあけて何度も思い出す}}ほうが記憶に残ります。単語を見て意味を言う、意味を見て単語を言う、と{{自分でテストする}}のがこつです。思い出せなかった語だけを、次の回にまわしましょう。",
      figure: {
        type: "cycle",
        title: "単語を覚えるサイクル",
        center: "間をあけてくり返す",
        steps: [
          { label: "見て覚える", sub: "つづり・音・意味", tone: "blue" },
          { label: "かくして思い出す", sub: "自分でテスト", tone: "yellow" },
          { label: "例文で使う", sub: "短い文に入れる" },
          { label: "数日後にもう一度", sub: "忘れた語だけ", tone: "red" },
        ],
      },
    },
    {
      heading: "意味がたくさんある語は「コア」を1つつかむ",
      body: "run の訳語は「走る・経営する・流れる・動く」などたくさんありますが、中心にあるのは{{「止まらずに動き続ける」}}というイメージです。店が休まず動き続ければ「経営する」、水が動き続ければ「流れる」になります。訳語をならべて覚えるより、{{コアの意味}}から文に合う訳を選ぶほうが、初めて見る使い方にも対応できます。",
      figure: {
        type: "tree",
        title: "run のコアから訳が分かれる",
        root: {
          label: "run",
          sub: "止まらずに動き続ける",
          tone: "yellow",
          children: [
            { label: "人が", sub: "走る", tone: "blue" },
            { label: "店・会社を", sub: "経営する", tone: "blue" },
            { label: "水・鼻水が", sub: "流れる", tone: "blue" },
            { label: "機械・バスが", sub: "動く・運行する", tone: "blue" },
          ],
        },
        note: "例：The trains run every ten minutes.（電車は10分ごとに運行する）",
      },
    },
    {
      heading: "語の部品（接頭辞・語根・接尾辞）で意味を組み立てる",
      body: "長い単語の多くは、{{部品の組み合わせ}}でできています。前につく{{接頭辞}}（un- 否定、re- ふたたび など）は意味を変え、後ろにつく{{接尾辞}}（-able できる、-ly 副詞 など）は品詞を変えます。部品を知っていれば、知らない語でも意味の見当がつきます。",
      figure: {
        type: "formula",
        title: "predict（予測する）から広げる",
        prose: true,
        steps: [
          { label: "動詞", expr: "predict", note: "予測する（pre- 前に ＋ dict 言う）" },
          { label: "形容詞", expr: "predict{{able}}", note: "-able：予測できる" },
          { label: "形容詞", expr: "{{un}}predictable", note: "un-：予測できない" },
          { label: "副詞", expr: "unpredictabl{{y}}", note: "-ly：予測できないほどに" },
        ],
        note: "部品の意味は「目安」。語によっては合わないものもあるので、最後は辞書で確かめる。",
      },
    },
    {
      heading: "品詞の形をセットで覚える",
      body: "入試や長文では、同じ語の{{動詞・名詞・形容詞}}が入れかわって出てきます。decide を覚えるときは decision・decisive もいっしょに覚えると、1回の努力で3語ぶんになります。とくに{{形がまぎらわしい組}}（succeed の名詞は success と succession の2つ）は意味のちがいまで確かめましょう。",
      figure: {
        type: "compare",
        title: "品詞の形をそろえる",
        columns: [{ title: "動詞", tone: "blue" }, { title: "名詞", tone: "yellow" }, { title: "形容詞", tone: "red" }],
        rows: [
          { cells: ["decide 決める", "decision 決定", "decisive 決定的な"] },
          { cells: ["succeed 成功する", "success 成功", "successful 成功した"] },
          { cells: ["succeed 継ぐ", "succession 継承", "successive 連続の"] },
          { cells: ["differ 異なる", "difference 違い", "different 異なる"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "He runs a bakery. →「彼はパン屋を走る」", right: "「彼はパン屋を経営している」", why: "run のあとに店・会社が来たら「経営する」。訳語を1つに決めつけず、コアの意味から文に合う訳を選びます。" },
    { wrong: "The plan was very economic.（むだがない、のつもり）", right: "The plan was very economical.", why: "economic は「経済の」、economical は「節約になる・むだのない」。-ic と -ical で意味が分かれる語は組で覚えます。" },
    { wrong: "Could you borrow me your pen?", right: "Could you lend me your pen?", why: "borrow は「借りる」、lend は「貸す」。だれからだれへ動くかで使い分けます。" },
    { wrong: "単語帳を1回通して終わりにする", right: "数日おきに、思い出せない語だけをくり返す", why: "1回覚えただけの語は、時間がたつとほとんど忘れます。間をあけて思い出すことで記憶が残ります。" },
  ],
  check: [
    { q: "My nose is running. の running の意味は？", a: "（鼻水が）出ている・流れている", why: "run のコア「止まらずに動き続ける」が液体に使われると「流れる」。" },
    { q: "careful（注意深い）と反対の意味の語を、接尾辞を変えて作りましょう。", a: "careless", why: "-less は「〜がない」を表す接尾辞。care（注意）＋ -less。" },
    { q: "decide の名詞形は？", a: "decision", why: "decide → decision（決定）。形容詞は decisive。" },
  ],
  next: [
    { label: "英単語2000で覚える・鍛える", href: "/learn/eitango" },
    { label: "つぎの単元「英熟語」", href: "/learn/jukugo" },
    { label: "覚え方のきほん「英単語」（中1）", href: "/learn/lecture/j-en-1-tango" },
  ],
};
