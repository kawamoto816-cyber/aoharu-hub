import type { Lecture } from "../types";

export const H_ENG_GRAM_ZENCHISHI: Lecture = {
  unit: "h-eng-gram-zenchishi",
  title: "前置詞は名詞の前に置く目じるし。at は点、on は接触、in は中",
  hook: "at seven、on Sunday、in July。日本語ではどれも「〜に」ですが、英語では3つを使い分けます。前置詞ごとの基本のイメージをつかむと、丸暗記にたよらず、初めて見る組み合わせでも見当がつくようになります。",
  sections: [
    {
      heading: "前置詞＋名詞は、ひとまとまりで形容詞か副詞になる",
      body: "前置詞は名詞や代名詞の{{前}}に置き、「前置詞＋名詞」の{{まとまり（句）}}をつくります。このまとまりは、名詞を説明する{{形容詞}}のはたらき（the book on the desk）か、動詞などを説明する{{副詞}}のはたらき（I studied in the library.）をします。前置詞の後ろの代名詞は{{目的格}}、動詞を続けるなら{{動名詞}}（-ing）にします。",
      figure: {
        type: "tree",
        title: "前置詞の後ろに来るもの",
        root: {
          label: "前置詞",
          tone: "navy",
          children: [
            { label: "名詞", sub: "on the desk", tone: "blue" },
            { label: "代名詞の目的格", sub: "with him", tone: "yellow" },
            { label: "動名詞", sub: "without saying", tone: "red" },
          ],
        },
        note: "前置詞の後ろに、主語＋動詞の文はそのまま続けられない。",
      },
    },
    {
      heading: "at・on・in のイメージは、時にも場所にも使える",
      body: "{{at}} は「ここ」と指でさす{{点}}、{{on}} は表面に{{くっついている}}こと、{{in}} は広がりの{{中}}にあることを表します。時でも同じで、時刻は点なので at、日付や曜日は「その日の上」で on、月・年・季節は幅のある期間の中なので in です。in the morning でも、特定の日の朝なら on Monday morning になります。",
      figure: {
        type: "compare",
        title: "at・on・in のちがい",
        columns: [{ title: "at", tone: "red" }, { title: "on", tone: "yellow" }, { title: "in", tone: "blue" }],
        rows: [
          { cells: ["点", "接触・上", "中・範囲"] },
          { cells: ["at 7:30", "on Friday", "in April"] },
          { cells: ["at noon", "on May 3", "in 2030"] },
          { cells: ["at the bus stop", "on the wall", "in the box"] },
        ],
        note: "at the station は「駅で（地点）」、in the station は「駅の建物の中で」。",
      },
    },
    {
      heading: "by と until、for と during",
      body: "by は「〜{{までに}}」で、その時までに1回すませる{{期限}}を表します。until（till）は「〜{{までずっと}}」で、その時まで続く{{継続}}を表します。また、for は three days のような{{期間の長さ}}、during は the summer vacation のような{{特定の期間}}につけます。",
      figure: {
        type: "compare",
        title: "by と until",
        columns: [{ title: "by", tone: "red" }, { title: "until", tone: "blue" }],
        rows: [
          { label: "意味", cells: ["〜までに（期限）", "〜までずっと（継続）"] },
          { label: "例", cells: ["Finish it by six.", "Wait here until six."] },
          { label: "合う動詞", cells: ["finish, return など", "stay, wait など"] },
        ],
      },
    },
    {
      heading: "2語以上で1つの前置詞：群前置詞",
      body: "because of（〜のために）、in spite of（〜にもかかわらず）、instead of（〜のかわりに）のように、2語以上で1つの前置詞のようにはたらくものを{{群前置詞}}といいます。後ろには名詞が来るので、同じ意味の接続詞 because・though とちがい、{{主語＋動詞}}の文は続けられません。",
      figure: {
        type: "formula",
        title: "接続詞と群前置詞の書きかえ",
        prose: true,
        steps: [
          { expr: "We stayed home {{because}} it rained.", note: "接続詞：後ろは文" },
          { expr: "We stayed home {{because of}} the rain.", note: "群前置詞：後ろは名詞" },
          { expr: "{{In spite of}} the rain, we went out.", note: "＝ Though it rained, we went out." },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I was born in May 5.", right: "I was born on May 5.", why: "日付は「その日」なので on。月だけなら in May です。" },
    { wrong: "Please return the book until Friday.", right: "Please return the book by Friday.", why: "金曜までに1回返す「期限」なので by。until は「ずっと続く」ときに使います。" },
    { wrong: "Thank you for help me.", right: "Thank you for helping me.", why: "前置詞 for の後ろに動詞を置くときは動名詞にします。" },
    { wrong: "In spite of it rained, we went out.", right: "In spite of the rain, we went out.（Though it rained, …）", why: "in spite of は前置詞なので、後ろに文は続けられません。" },
  ],
  check: [
    { q: "I usually get up ___ six.", a: "at", why: "時刻は「点」なので at。" },
    { q: "We stayed in Nara ___ three days.", a: "for", why: "three days は期間の長さ。特定の期間なら during。" },
    { q: "The game was put off ___ ___ the heavy snow.（大雪のために）", a: "because of", why: "後ろが名詞 the heavy snow なので群前置詞 because of。" },
  ],
  next: [
    { label: "4択ドリル「前置詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
    { label: "つぎの単元「接続詞」", href: "/learn/eibunpo-ko/h-eng-gram-setsuzokushi" },
    { label: "関連「動名詞」（前置詞の後ろの -ing）", href: "/learn/eibunpo-ko/h-eng-gram-domeishi" },
  ],
};
