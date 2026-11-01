import type { Lecture } from "../types";

export const H_ENG_GRAM_JISEI: Lecture = {
  unit: "h-eng-gram-jisei",
  title: "時制は「いつのことか」を動詞の形で示す。現在形は「いつもそうだ」",
  hook: "「明日彼が来たら電話するね」を英語にすると、来るのは明日なのに I'll call you when he comes. と現在形を使います。日本語の「〜た・〜る」と英語の時制は、ぴったり重なりません。入試の時制問題はこの「ずれ」をつくものが多いので、時の線の上で形を整理しておきましょう。",
  sections: [
    {
      heading: "時制は「今」を基準に、動詞の形で時を示す",
      body: "英語では、できごとが{{今より前か・今か・今より後か}}を動詞の形で示します。過去は played のような過去形、未来は will play や be going to play で表します。日本語は「昨日行く予定だった」のように言い方がゆれますが、英語は{{動詞の形がそのまま時を決める}}と考えると整理できます。",
      figure: {
        type: "numberline",
        title: "0 が「今」。左が過去、右が未来",
        min: -3,
        max: 3,
        points: [
          { x: -2, label: "played", tone: "blue" },
          { x: 0, label: "play(s)", tone: "yellow" },
          { x: 2, label: "will play", tone: "red" },
        ],
        desc: "−3から3の数直線。0を今として、−2に過去形 played、0に現在形 play(s)、2に未来 will play を置いた図。",
        note: "目もりの数字は「今からどれだけ前・後か」の目安。",
      },
    },
    {
      heading: "現在形は「今この瞬間」ではなく「いつも」",
      body: "現在形が表すのは、{{習慣}}・{{変わらない事実}}・{{時刻表で決まった予定}}です。He plays tennis. は「（ふだん）テニスをする」で、今まさにしている最中なら He is playing tennis. と{{進行形}}にします。また know, like, belong, resemble のような{{状態動詞}}は、もともと「続いている状態」を表すので、ふつう進行形にしません。",
      figure: {
        type: "compare",
        title: "現在形と現在進行形のくらべ",
        columns: [{ title: "現在形", tone: "blue" }, { title: "現在進行形", tone: "yellow" }],
        rows: [
          { label: "表すこと", cells: ["習慣・事実・時刻表", "今まさに進行中の動作"] },
          { label: "例", cells: ["Water {{boils}} at 100°C.", "The water {{is boiling}}."] },
          { label: "状態動詞", cells: ["I {{know}} him.", "✕ I am knowing him."] },
        ],
      },
    },
    {
      heading: "時・条件の副詞節では、未来のことも現在形",
      body: "when, if, until, as soon as, before などが作る{{時・条件の副詞節}}の中では、未来のことでも{{現在形}}を使います。「彼が来る」ことは未来でも、when he comes とします。ただし know if 〜（〜かどうか知っている）のように、節が動詞の目的語になる{{名詞節}}なら、未来のことは will を使います。",
      figure: {
        type: "formula",
        title: "「彼が来たら電話するね」を書く",
        prose: true,
        steps: [
          { expr: "I'll call you when he {{will come}}.", note: "✕ 副詞節の中で will を使っている" },
          { expr: "I'll call you when he {{comes}}.", note: "◯ 時の副詞節は現在形。主節は will のまま" },
          { expr: "I don't know if he {{will come}}.", note: "◯ know の目的語（名詞節）なら will を使う" },
        ],
        note: "見分け方：when・if 節を取り去っても文が成り立つなら副詞節。",
      },
    },
    {
      heading: "未来の言い方は1つではない",
      body: "未来は will だけでなく、{{be going to}}（前から決めていた予定・兆候）や{{現在進行形}}（手配ずみの確定した予定）でも表します。I'm leaving for Osaka tomorrow. は、切符などがもう決まっている感じです。その場で決めたことは I'll answer it. のように will がふつうです。",
      figure: {
        type: "compare",
        title: "未来を表す形",
        columns: [{ title: "形" }, { title: "ニュアンス", tone: "yellow" }],
        rows: [
          { cells: ["will ＋原形", "その場で決めた意志・予測"] },
          { cells: ["be going to ＋原形", "前からの予定・今の兆候"] },
          { cells: ["現在進行形", "手配ずみの確定した予定"] },
          { cells: ["現在形", "時刻表・行事の予定"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "If it will rain tomorrow, we will stay home.", right: "If it rains tomorrow, we will stay home.", why: "if の条件の副詞節では、未来のことも現在形にします。" },
    { wrong: "This bag is belonging to me.", right: "This bag belongs to me.", why: "belong は状態動詞なので、ふつう進行形にしません。" },
    { wrong: "I don't know if he comes tomorrow.", right: "I don't know if he will come tomorrow.", why: "know の目的語になる名詞節なので、未来のことは will で表します。" },
  ],
  check: [
    { q: "Let's wait until the rain ___.（stop を適切な形に）", a: "stops", why: "until が作る時の副詞節なので、未来のことでも現在形。" },
    { q: "「水は100℃で沸騰する」の動詞の時制は？", a: "現在形（Water boils at 100°C.）", why: "いつでも成り立つ事実は現在形で表す。" },
    { q: "I ___ (resemble) my mother. の ___ は resemble か am resembling か。", a: "resemble", why: "resemble は状態動詞なので進行形にしない。" },
  ],
  next: [
    { label: "4択ドリル「時制」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-jisei" },
    { label: "つぎの単元「完了形」", href: "/learn/eibunpo-ko/h-eng-gram-kanryo" },
    { label: "ふりかえり「文型」", href: "/learn/eibunpo-ko/h-eng-gram-bunkei" },
  ],
};
