import type { Lecture } from "../types";

export const H_ENG_GRAM_KATEIHO: Lecture = {
  unit: "h-eng-gram-kateiho",
  title: "仮定法は「時制を1つ過去にずらして」現実とちがうことを言う",
  hook: "「もし私が鳥だったら、君のところへ飛んでいくのに」。現実にはありえないことを言うとき、英語は If I were a bird, I would fly to you. と、今の話なのに過去形を使います。この「時制を1つずらす」しくみさえつかめば、仮定法の形は全部同じ考え方で作れます。",
  sections: [
    {
      heading: "ふつうの if と仮定法のちがい",
      body: "If it rains tomorrow, 〜 は、雨が降るかどうか分からない、{{ありうる}}ことの条件です。これに対して仮定法は、{{事実とちがう}}・{{ありえない}}と話し手が思っていることを仮に言う形です。現実から距離をとるしるしとして、動詞を{{1つ過去の形}}にずらします。",
      figure: {
        type: "compare",
        title: "if の文の3つのタイプ",
        columns: [{ title: "タイプ", tone: "navy" }, { title: "if 節", tone: "yellow" }, { title: "主節" }],
        rows: [
          { cells: ["ふつうの if（今・未来）", "現在形", "will ＋原形"] },
          { cells: ["仮定法過去（今）", "{{過去形}}（be は were）", "would ＋原形"] },
          { cells: ["仮定法過去完了（過去）", "{{had ＋過去分詞}}", "would have ＋過去分詞"] },
        ],
        note: "主節の would は could・might になることもある。",
      },
    },
    {
      heading: "仮定法過去：今の事実の反対",
      body: "今の事実とちがうことは、if 節を{{過去形}}、主節を{{would（could, might）＋原形}}にします。be動詞は主語にかかわらず{{were}}がふつうです（話しことばでは was もある）。形は過去でも、意味は「今」の話です。",
      figure: {
        type: "formula",
        title: "事実の文を仮定法過去にする",
        prose: true,
        steps: [
          { expr: "As I {{don't have}} time, I {{can't}} go.", note: "事実：今ひまがないので行けない" },
          { expr: "If I {{had}} time, I {{could}} go.", note: "仮定法過去：現在形 → 過去形にずらし、否定は肯定に" },
          { expr: "If I {{were}} you, I {{would}} wait.", note: "be動詞は were" },
        ],
      },
    },
    {
      heading: "仮定法過去完了：過去の事実の反対。時がまたがる文も",
      body: "過去の事実とちがうことは、if 節を{{had ＋過去分詞}}、主節を{{would have ＋過去分詞}}にします。If I had studied harder, I would have passed. は「（実際は勉強しなかったので）受からなかった」という意味です。「あのときこうしていたら、今ごろは〜」のように、if 節が過去・主節が今のときは、主節だけ would ＋原形にします。",
      figure: {
        type: "numberline",
        title: "If I had studied harder, I would be a college student now.",
        min: -3,
        max: 1,
        points: [
          { x: -2, label: "had studied", tone: "red" },
          { x: 0, label: "would be", tone: "blue" },
        ],
        moves: [{ from: -2, to: 0, label: "過去の仮定 → 今の結果", tone: "navy" }],
        desc: "−3から1の数直線。−2（過去）に if 節の had studied、0（今）に主節の would be。過去から今へ矢印。",
        note: "if 節と主節の「時」を別々に考えて、それぞれ1つ過去にずらす。",
      },
    },
    {
      heading: "I wish・as if・if の省略",
      body: "{{I wish}} や {{as if}} のあとも同じずらし方です。I wish I knew. は「今知っていればなあ」、I wish I had known. は「あのとき知っていればなあ」です。また、書きことばでは if を省いて{{主語と動詞を入れかえる}}ことがあり、If I had known は Had I known になります。If it were not for 〜（〜がなければ）は Without 〜 や But for 〜 でも言えます。",
      figure: {
        type: "formula",
        title: "if を省いて倒置する",
        prose: true,
        steps: [
          { expr: "{{If I had}} known, I would have helped you.", note: "仮定法過去完了" },
          { expr: "{{Had I}} known, I would have helped you.", note: "if を消し、had を主語の前へ" },
          { expr: "{{Were I}} you, I would wait.", note: "were・should でも同じように倒置できる" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "If I am you, I would wait.", right: "If I were you, I would wait.", why: "今の事実とちがう仮定なので、if 節は過去形。be動詞は were を使います。" },
    { wrong: "「あのとき知っていたら手伝ったのに」を If I had known, I would help you. とする", right: "If I had known, I would have helped you.", why: "主節も過去の話なので would have ＋過去分詞です。would help だと「（今）手伝うのに」になります。" },
    { wrong: "I wish I can swim.", right: "I wish I could swim.", why: "I wish のあとは仮定法。今の願望は can を過去形 could にします。" },
  ],
  check: [
    { q: "If I ___ (have) a car, I would drive you home.", a: "had", why: "今の事実（車がない）の反対なので仮定法過去。" },
    { q: "If you had left earlier, you ___ (catch) the train.", a: "would have caught", why: "if 節が had ＋過去分詞で過去の仮定。主節は would have ＋過去分詞。" },
    { q: "If it were not for water, ... を、if を使わず前置詞で始まる2通りの言い方に。", a: "Without water / But for water（Were it not for water も可）", why: "「〜がなければ」は Without・But for で言いかえられる。" },
  ],
  next: [
    { label: "4択ドリル「仮定法」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-kateiho" },
    { label: "ふりかえり「完了形」", href: "/learn/eibunpo-ko/h-eng-gram-kanryo" },
    { label: "関連「助動詞」（would・could・might）", href: "/learn/eibunpo-ko/h-eng-gram-jodoshi" },
  ],
};
