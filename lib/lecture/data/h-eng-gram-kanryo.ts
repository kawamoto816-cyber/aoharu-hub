import type { Lecture } from "../types";

export const H_ENG_GRAM_KANRYO: Lecture = {
  unit: "h-eng-gram-kanryo",
  title: "完了形は「ある時点まで」をひとまとめに見る形。基準点はどこか",
  hook: "「京都に3年住んでいる」は、3年前に始まって今も続いていることです。過去形 lived だと「昔住んでいた（今はちがう）」に聞こえてしまいます。完了形は、過去から基準の時点までを線でとらえる形で、入試では過去形との区別や過去完了の「時のずれ」がよくねらわれます。",
  sections: [
    {
      heading: "現在完了は「過去から今まで」を線で見る",
      body: "現在完了 {{have ＋過去分詞}} は、過去に起きたことが{{今とつながっている}}ことを表します。I have lived in Kyoto for three years. は、3年前から今までの線全体が見えています。過去形 I lived in Kyoto. は、過去の点（または区間）だけを見て、今とは切りはなしています。",
      figure: {
        type: "numberline",
        title: "I have lived in Kyoto for three years.",
        min: -4,
        max: 1,
        points: [
          { x: -3, label: "住み始め", tone: "blue" },
          { x: 0, label: "今", tone: "yellow" },
        ],
        ranges: [{ from: -3, to: 0, label: "have lived（3年間）", tone: "blue" }],
        desc: "−4から1の数直線。−3（3年前）から0（今）までの区間に have lived と書いた図。",
        note: "目もりは年。0 が今。線が「今」にとどいているのが現在完了。",
      },
    },
    {
      heading: "用法は3つ：完了・経験・継続",
      body: "現在完了の意味は、いっしょに使う語で見分けやすくなります。{{完了}}は just, already, yet、{{経験}}は ever, never, before, 〜 times、{{継続}}は for, since, How long 〜? と相性がよい語です。have been to 〜 は「行ったことがある（経験）・行ってきたところだ（完了）」、have gone to 〜 は「行ってしまって今ここにいない」です。",
      figure: {
        type: "compare",
        title: "現在完了の3つの用法",
        columns: [{ title: "用法と意味", tone: "navy" }, { title: "目じるし", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["完了：〜したところだ", "just / already / yet", "I've {{just}} eaten."] },
          { cells: ["経験：〜したことがある", "ever / never / 〜 times", "I've {{never}} seen it."] },
          { cells: ["継続：ずっと〜している", "for / since", "I've lived here {{since}} 2020."] },
        ],
      },
    },
    {
      heading: "はっきりした過去の語とはいっしょに使えない",
      body: "現在完了は「今」に視点があるので、{{yesterday, 〜 ago, last week, in 2020}} のように、過去の時点をはっきり示す語とは使いません。When 〜? の疑問文も時点をたずねるので、過去形でたずねます。since 2020（2020年から今まで）は使えますが、in 2020（2020年に）は過去形です。",
      figure: {
        type: "formula",
        title: "「昨日彼に会った」を書く",
        prose: true,
        steps: [
          { expr: "I {{have seen}} him yesterday.", note: "✕ yesterday は過去の時点。現在完了と合わない" },
          { expr: "I {{saw}} him yesterday.", note: "◯ 過去の時点は過去形" },
          { expr: "I {{have seen}} him {{twice}}.", note: "◯ 時点を言わない「経験」なら現在完了" },
        ],
      },
    },
    {
      heading: "過去完了・未来完了は「基準点」をずらすだけ",
      body: "{{過去完了 had ＋過去分詞}} は、過去のある時点を基準にして、それより前のこと（大過去）や、その時点までの完了・経験・継続を表します。The train had left when I arrived. は「私が着いた（過去）」より前に列車が出ていた、ということです。{{未来完了 will have ＋過去分詞}} は、基準点を未来に置いた完了形です。",
      figure: {
        type: "numberline",
        title: "The train had left when I arrived.",
        min: -4,
        max: 1,
        points: [
          { x: -3, label: "had left", tone: "red" },
          { x: -1, label: "arrived", tone: "blue" },
          { x: 0, label: "今", tone: "yellow" },
        ],
        moves: [{ from: -1, to: -3, label: "基準点より前", tone: "red" }],
        desc: "−4から1の数直線。−3に had left、−1に arrived、0に今。arrived から had left へ左向きの矢印。",
        note: "基準点が今なら have、過去なら had、未来なら will have。",
      },
    },
  ],
  mistakes: [
    { wrong: "When have you finished your homework?", right: "When did you finish your homework?", why: "When は時点をたずねるので、現在完了ではなく過去形を使います。" },
    { wrong: "He has gone to Hawaii twice.", right: "He has been to Hawaii twice.", why: "「行ったことがある」は have been to。have gone to は「行ってしまって今いない」です。" },
    { wrong: "I have lived here since three years.", right: "I have lived here for three years.", why: "期間の長さは for、始まった時点は since（since 2023 など）で表します。" },
  ],
  check: [
    { q: "I ___ (know) him for ten years. の ___ を適切な形に。", a: "have known", why: "for ten years で「ずっと」の継続。know は状態動詞なので現在完了で継続を表す。" },
    { q: "When I got to the station, the bus ___ already ___ (leave).", a: "had, left", why: "駅に着いた（過去）より前のことなので過去完了。" },
    { q: "I ___ (finish) this book by next Monday. を未来完了で。", a: "will have finished", why: "未来の時点（次の月曜）までの完了なので will have ＋過去分詞。" },
  ],
  next: [
    { label: "4択ドリル「完了形」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-kanryo" },
    { label: "ひとつ前「時制」", href: "/learn/eibunpo-ko/h-eng-gram-jisei" },
    { label: "関連「仮定法」（had ＋過去分詞を使う）", href: "/learn/eibunpo-ko/h-eng-gram-kateiho" },
  ],
};
