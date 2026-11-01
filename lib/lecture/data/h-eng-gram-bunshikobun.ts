import type { Lecture } from "../types";

export const H_ENG_GRAM_BUNSHIKOBUN: Lecture = {
  unit: "h-eng-gram-bunshikobun",
  title: "分詞構文は「接続詞と主語を消して -ing」。意味は文脈で決まる",
  hook: "小説やニュースの英文には、Walking home, I met Ken. のように、文の頭がいきなり -ing で始まる文がよく出てきます。これは when や because の文を短くまとめた形です。作り方を逆にたどれば、意味も形もすっきり分かります。",
  sections: [
    {
      heading: "作り方：接続詞と主語を消して、動詞を -ing に",
      body: "分詞構文は、接続詞のある副詞節を短くした形です。{{接続詞を消し}}、主節と主語が同じなら{{主語も消し}}、動詞を{{現在分詞 -ing}}にします。be動詞なら Being になりますが、Being はよく省略されます。",
      figure: {
        type: "formula",
        title: "When I walked home, I met Ken. を分詞構文に",
        prose: true,
        steps: [
          { expr: "{{When I}} walked home, I met Ken.", note: "主節の主語も I で同じ" },
          { expr: "walked home, I met Ken.", note: "接続詞 when と主語 I を消す" },
          { expr: "{{Walking}} home, I met Ken.", note: "動詞を -ing に。時制は主節が示す" },
        ],
      },
    },
    {
      heading: "意味は文脈で決まる。接続詞にもどして考える",
      body: "接続詞を消しているので、意味は{{文脈}}から判断します。{{時}}（〜するとき）、{{理由}}（〜なので）、{{条件}}（〜すれば）、{{譲歩}}（〜だけれど）、{{付帯状況・連続}}（〜しながら・そして〜）があります。訳に迷ったら、when・because・if などにもどして自然なものを選びます。条件と譲歩は数が少なく、慣用的な言い方で出ることが多いです。",
      figure: {
        type: "compare",
        title: "分詞構文の意味",
        columns: [{ title: "意味", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "時", cells: ["〜するとき", "{{Walking}} home, I met Ken."] },
          { label: "理由", cells: ["〜なので", "{{Feeling}} tired, I slept."] },
          { label: "条件", cells: ["〜すれば", "{{Turning}} left, you'll see it."] },
          { label: "付帯状況", cells: ["〜しながら", "He came in, {{carrying}} a box."] },
        ],
        note: "ほかに譲歩（〜だけれど）や連続（そして〜）もある。",
      },
    },
    {
      heading: "形の選び方：する・される・前のこと・主語がちがう",
      body: "主語が「{{する}}」側なら現在分詞 -ing、「{{される}}」側なら{{過去分詞}}で始めます。主節より{{前のこと}}なら Having ＋過去分詞にします。主節と主語が{{ちがう}}ときは、分詞の前に主語を残します（{{独立分詞構文}}：It being rainy, 〜）。否定は not を分詞の{{前}}に置きます。",
      figure: {
        type: "tree",
        title: "分詞構文の頭の形を決める",
        root: {
          label: "消した節の主語と動詞",
          tone: "navy",
          children: [
            { label: "主語がする", sub: "Walking home, …", children: [{ label: "-ing", tone: "blue" }] },
            { label: "主語がされる", sub: "Seen from the hill, …", children: [{ label: "過去分詞", tone: "red" }] },
            { label: "主節より前", sub: "Having finished, …", children: [{ label: "Having ＋過去分詞", tone: "yellow" }] },
            { label: "主語がちがう", sub: "It being rainy, …", children: [{ label: "主語を残す" }] },
          ],
        },
      },
    },
    {
      heading: "Having ＋過去分詞は「時のずれ」のしるし",
      body: "After I had finished my homework, I went out. のように、主節より前に終わったことは {{Having finished}} my homework, I went out. とします。ふつうの -ing は主節と{{同じころ}}、Having ＋過去分詞は主節より{{前}}と覚えておきましょう。完了不定詞 to have ＋過去分詞や完了動名詞 having ＋過去分詞と同じ考え方です。",
      figure: {
        type: "numberline",
        title: "Having finished my homework, I went out.",
        min: -3,
        max: 1,
        points: [
          { x: -2, label: "finished", tone: "red" },
          { x: -1, label: "went out", tone: "blue" },
          { x: 0, label: "今", tone: "yellow" },
        ],
        moves: [{ from: -1, to: -2, label: "主節より前 → Having", tone: "red" }],
        desc: "−3から1の数直線。−2に宿題を終えた finished、−1に主節の went out、0に今。went out から finished へ左向きの矢印。",
      },
    },
  ],
  mistakes: [
    { wrong: "Seeing from the hill, the town looks small.", right: "Seen from the hill, the town looks small.", why: "主語の town は「見られる」側なので過去分詞で始めます。" },
    { wrong: "Knowing not what to say, she kept silent.", right: "Not knowing what to say, she kept silent.", why: "分詞構文の否定は、not を分詞の前に置きます。" },
    { wrong: "Being fine, we went on a picnic.", right: "It being fine, we went on a picnic.", why: "天気の主語 it と主節の we がちがうので、主語 it を残します（独立分詞構文）。" },
  ],
  check: [
    { q: "Because I was tired, I went to bed early. を分詞構文に。", a: "(Being) Tired, I went to bed early.", why: "接続詞と主語を消し、was を Being に。Being は省略できる。" },
    { q: "___ (write) in easy English, this book is easy to read.", a: "Written", why: "本は「書かれている」側なので過去分詞。" },
    { q: "___ (lose) my key, I couldn't get into the house.", a: "Having lost", why: "かぎをなくしたのは、入れなかったより前なので Having ＋過去分詞。" },
  ],
  next: [
    { label: "4択ドリル「分詞構文」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-bunshikobun" },
    { label: "ひとつ前「分詞」", href: "/learn/eibunpo-ko/h-eng-gram-bunshi" },
    { label: "関連「接続詞」", href: "/learn/eibunpo-ko/h-eng-gram-setsuzokushi" },
  ],
};
