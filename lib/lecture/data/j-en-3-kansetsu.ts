import type { Lecture } from "../types";

export const J_EN_3_KANSETSU: Lecture = {
  unit: "j-en-3-kansetsu",
  title: "間接疑問文は、疑問詞のあとを「主語＋動詞」のふつうの語順に",
  hook: "道を聞くとき、Where is the station? よりも Do you know where the station is? のほうがていねいに聞こえます。このように、疑問文を{{文の一部}}として入れたものが間接疑問文です。会話でも長文でもよく出るので、語順のルールを1つ押さえましょう。",
  sections: [
    {
      heading: "疑問文が文の中に入ると語順が変わる",
      body: "Where does he live? を I know のうしろに入れると、I know {{where he lives}}. になります。疑問詞のあとが{{主語＋動詞}}のふつうの語順にもどるのがポイントです。疑問詞から文の終わりまでが「どこに住んでいるか」という{{名詞のかたまり}}になり、know の目的語になっています。",
      figure: {
        type: "formula",
        title: "Where does he live? を I know に入れる",
        prose: true,
        steps: [
          { label: "疑問文", expr: "Where {{does}} he {{live}}?", note: "疑問文の語順" },
          { label: "つなぐ", expr: "I know where he {{live}}", note: "does を取る" },
          { label: "完成", expr: "I know where he {{lives}}.", note: "3単現の s をもどす" },
        ],
      },
    },
    {
      heading: "do・does・did は消え、動詞の形にもどる",
      body: "be動詞の疑問文は、be動詞を主語のうしろにもどします。一般動詞の疑問文では {{do・does・did が消え}}、その代わりに動詞の形で{{時（現在・過去）や3単現}}を表します。can・will などの助動詞は、主語のうしろにもどすだけです。",
      figure: {
        type: "compare",
        title: "ふつうの疑問文と間接疑問",
        columns: [{ title: "疑問文" }, { title: "間接疑問の部分", tone: "yellow" }],
        rows: [
          { label: "be動詞", cells: ["Who is she?", "who she is"] },
          { label: "一般動詞", cells: ["What does he like?", "what he likes"] },
          { label: "過去", cells: ["When did you come?", "when you came"] },
          { label: "助動詞", cells: ["Where can I buy it?", "where I can buy it"] },
        ],
      },
    },
    {
      heading: "疑問詞が主語のときは語順そのまま",
      body: "Who made this cake? の who は「だれが」で、それ自体が{{主語}}です。主語のあとはもう動詞なので、間接疑問にしても{{語順は変わりません}}。I don't know who made this cake. となります。疑問詞のすぐあとに動詞が来ているかどうかで見分けましょう。",
      figure: {
        type: "tree",
        title: "疑問詞のあとの語順",
        root: {
          label: "疑問詞のすぐあと",
          children: [
            { label: "主語がある", sub: "where he lives", tone: "blue", children: [{ label: "主語＋動詞の順に" }] },
            { label: "すぐ動詞", sub: "who made it", tone: "yellow", children: [{ label: "疑問詞が主語", sub: "語順そのまま" }] },
          ],
        },
      },
    },
    {
      heading: "文の最後の記号は全体で決める",
      body: "文の最後が「?」か「.」かは、{{文全体}}が疑問文かどうかで決まります。Do you know where she lives{{?}} は Do you know で始まる疑問文なので「?」。I don't know where she lives{{.}} はふつうの文なので「.」です。Do you know 〜? には Yes / No で答えます。",
    },
  ],
  mistakes: [
    { wrong: "I know where does he live.", right: "I know where he lives.", why: "間接疑問では does を使わず、主語＋動詞の語順にして動詞に s をつけます。" },
    { wrong: "Do you know what is this?", right: "Do you know what this is?", why: "be動詞は主語 this のうしろにもどします。" },
    { wrong: "Tell me when did you get up.", right: "Tell me when you got up.", why: "did が消えるので、動詞を過去形 got にして時を表します。" },
  ],
  check: [
    { q: "What does she want? を I don't know に続けると？", a: "I don't know what she wants.", why: "does を取り、主語のあとの動詞に s をつける。" },
    { q: "Who broke the window? を Do you know に続けると？", a: "Do you know who broke the window?", why: "who が主語なので語順はそのまま。" },
    { q: "Where is the station? を Do you know に続けると？", a: "Do you know where the station is?", why: "be動詞 is を主語 the station のうしろへ。" },
  ],
  next: [
    { label: "4択ドリル「間接疑問文」に挑戦", href: "/learn/eibunpo-chu/j-en-3-kansetsu" },
    { label: "疑問詞の確認「疑問詞」（中1）", href: "/learn/lecture/j-en-1-gimonshi" },
    { label: "つぎの単元「仮定法」", href: "/learn/lecture/j-en-3-katei" },
  ],
};
