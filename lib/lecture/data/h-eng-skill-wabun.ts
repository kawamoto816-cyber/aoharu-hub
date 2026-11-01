import type { Lecture } from "../types";

export const H_ENG_SKILL_WABUN: Lecture = {
  unit: "h-eng-skill-wabun",
  title: "和文英訳は、まず「英語にしやすい日本語」に直す。主語と動詞を先に決める",
  hook: "「駅前に新しい図書館ができた」を英語にしようとして、「できた」にあたる単語で止まったことはありませんか。日本語をそのまま1語ずつ置きかえようとすると、知らない単語や主語のない文でつまずきます。和文英訳は単語の暗記量よりも、日本語の意味をつかんで、自分の知っている英語で書ける形に組み立て直す力で決まります。",
  sections: [
    {
      heading: "日本語→日本語→英語の3段階で考える",
      body: "いきなり英語にせず、まず日本語の文を{{英語にしやすい日本語}}に直します（{{和文和訳}}）。主語を補い、遠回しな言い方をはっきりさせ、だれが何をするのかがわかる形にします。そのうえで、{{主語と動詞}}を決めてから英語にすると、文の骨組みがくずれません。",
      figure: {
        type: "flow",
        dir: "col",
        title: "和文英訳の手順",
        steps: [
          { label: "意味をつかむ", sub: "何が言いたい文か", tone: "navy" },
          { label: "和文和訳", sub: "主語を補い単純にする", tone: "blue" },
          { label: "主語と動詞を決める", sub: "文の骨組み（S＋V）" },
          { label: "英語にする", sub: "知っている表現で", tone: "yellow" },
          { label: "見直す", sub: "時制・数・冠詞" },
        ],
      },
    },
    {
      heading: "主語のない日本語には、主語を補う",
      body: "日本語は主語を省くことが多いですが、英語の文には{{主語が必要}}です。「昨日は忙しくて、宿題ができなかった」は、だれのことかを考えて「{{私は}}昨日忙しかったので、宿題をすることができなかった」と直します。こうすると、I was busy と I couldn't do の2つの文をつなぐだけになります。",
      figure: {
        type: "formula",
        title: "「昨日は忙しくて、宿題ができなかった」",
        prose: true,
        steps: [
          { label: "元の文", expr: "昨日は忙しくて、宿題ができなかった。", note: "主語がない" },
          { label: "和文和訳", expr: "{{私は}}昨日忙しかった{{ので}}、宿題をすることができなかった。", note: "主語と因果をはっきり" },
          { label: "英語", expr: "{{I was}} busy yesterday, {{so I couldn't}} do my homework.", note: "S＋V を2つ、so でつなぐ" },
        ],
        note: "Because I was busy yesterday, I couldn't do my homework. でもよい。",
      },
    },
    {
      heading: "知らない単語は、知っている表現に言いかえる",
      body: "「図書館ができた」の「できる」は、make や can ではうまくいきません。こういうときは、意味は同じで{{自分が確実に書ける表現}}に言いかえます。「新しい図書館が建てられた」なら受動態、「新しい図書館がある」なら There is 〜 で書けます。{{難しい単語より、まちがえない文}}を選ぶのがコツです。",
      figure: {
        type: "compare",
        title: "「駅前に新しい図書館ができた」の言いかえ",
        columns: [{ title: "直した日本語", tone: "blue" }, { title: "英語", tone: "yellow" }],
        rows: [
          { label: "受動態", cells: ["新しい図書館が建てられた", "〜 was built."] },
          { label: "There is", cells: ["今は新しい図書館がある", "There is 〜."] },
          { label: "open", cells: ["新しい図書館が開いた", "〜 opened."] },
        ],
        note: "〜 には a new library が入り、最後に in front of the station をつける（例 There is a new library in front of the station.）。",
      },
    },
    {
      heading: "書いたら、ミスの出やすい点を見直す",
      body: "和文英訳の減点は、意味よりも{{文法の小さなミス}}で起こることがほとんどです。書き終えたら、{{時制}}、主語に合わせた{{三単現の s}}、名詞の{{単数・複数と冠詞}}を順に確かめます。見直す点を決めておくと、短い時間でもれなくチェックできます。",
      figure: {
        type: "compare",
        title: "見直しのチェック表",
        columns: [{ title: "確かめること", tone: "blue" }, { title: "ミスの例 → 直し", tone: "red" }],
        rows: [
          { label: "時制", cells: ["過去のことは過去形", "go → went（yesterday）"] },
          { label: "三単現", cells: ["he・she・it には s", "She play → plays"] },
          { label: "数・冠詞", cells: ["数えられる名詞の形", "I have dog → a dog"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "「私は寿司です」（注文の場面）→ I am sushi.", right: "I'll have sushi. / I'd like sushi.", why: "日本語の「〜は…です」が、いつも be動詞のイコールになるとは限りません。何を言いたいのか（注文したい）を考えて英語にします。" },
    { wrong: "「昨日は雨だった」→ Yesterday was rain.", right: "It rained yesterday. / It was rainy yesterday.", why: "天気は It を主語にするのが基本です。rain は名詞なら「雨」そのものなので、Yesterday とイコールにはなりません。" },
    { wrong: "知らない単語を和英辞典の訳語でそのまま使う", right: "意味が同じで、使い方を知っている表現に言いかえる", why: "辞書の訳語は使い方（語法）がずれていることがあります。自信のある表現で正確に書くほうが点になります。" },
  ],
  check: [
    { q: "「この町は住みやすい」を、It で始めて英語にしましょう。", a: "It is easy to live in this town.", why: "It is easy to 〜 の形。live in の in を落とさない。" },
    { q: "「彼女は毎朝走っている」を英語にするとき、動詞の形で気をつけることは？", a: "三単現の s をつけて runs にする（She runs every morning.）", why: "主語が she で、毎朝の習慣なので現在形。" },
    { q: "和文英訳で、英語にする前に日本語を直す作業を何という？", a: "和文和訳", why: "主語を補い、英語にしやすい日本語に直す。" },
  ],
  next: [
    { label: "ドリル「和文英訳」で鍛える", href: "/learn/eigo-ko/h-eng-skill-wabun" },
    { label: "つぎの単元「自由英作文」", href: "/learn/lecture/h-eng-skill-jiyu" },
    { label: "ふりかえり「時制」", href: "/learn/eibunpo-ko/h-eng-gram-jisei" },
  ],
};
