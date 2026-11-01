import type { Lecture } from "../types";

export const E_JAPANESE_1_KANJI: Lecture = {
  unit: "e-japanese-1-kanji",
  nameRuby: "1年の漢字《かんじ》（80字）",
  title: "漢字《かんじ》は 「え」から できた 字",
  hook: "山、川、木。どれも 1年生で ならう 漢字《かんじ》です。漢字《かんじ》を つかうと、文が よみやすく なります。",
  sections: [
    {
      heading: "え から できた 漢字《かんじ》",
      body: "むかしの 人は、ものの かたちを えに かきました。その えが かわって、漢字《かんじ》に なりました。{{山}}は、やまの かたちから できた 字です。",
      figure: {
        type: "flow",
        title: "「山」が できるまで",
        steps: [
          { label: "やまの え", sub: "とがった やま" },
          { label: "かんたんな え", sub: "3つの とんがり" },
          { label: "山", sub: "いまの 字", tone: "yellow" },
        ],
      },
    },
    {
      heading: "かたちから できた 字",
      body: "1年の 漢字《かんじ》には、かたちから できた 字が たくさん あります。{{目}}や {{口}}は、からだの かたちです。{{犬}}や {{虫}}は、いきものの かたちです。",
      figure: {
        type: "tree",
        title: "かたちから できた 字の なかま",
        root: {
          label: "1年の 漢字《かんじ》",
          children: [
            { label: "しぜん", sub: "山・川・日・月・雨", tone: "blue" },
            { label: "からだ", sub: "目・口・耳・手・足", tone: "yellow" },
            { label: "いきもの", sub: "犬・虫・貝", tone: "red" },
          ],
        },
      },
    },
    {
      heading: "字を あわせて できる 字",
      body: "木が 2つで {{林}}です。木が 3つで {{森}}です。木が おおいほど、大きな もりに なります。人と 木で、{{休}}に なります。",
      figure: {
        type: "formula",
        title: "木から ふえる 字",
        prose: true,
        steps: [
          { label: "1つ", expr: "木", note: "き" },
          { label: "2つ", expr: "木＋木 → {{林}}", note: "はやし" },
          { label: "3つ", expr: "木＋木＋木 → {{森}}", note: "もり" },
          { label: "人と木", expr: "人＋木 → {{休}}", note: "木の そばで やすむ" },
        ],
      },
    },
    {
      heading: "よみかたが いくつか ある",
      body: "漢字《かんじ》には、よみかたが いくつか あります。「火」は、「ひ」とも 「か」とも よみます。花火は 「はなび」、火よう日は 「かようび」です。まわりの ことばで、よみかたが かわります。",
      figure: {
        type: "compare",
        title: "おなじ 字の ちがう よみかた",
        columns: [{ title: "ひとつめ", tone: "blue" }, { title: "ふたつめ", tone: "yellow" }],
        rows: [
          { label: "火", cells: ["ひ（火が もえる）", "か（火よう日）"] },
          { label: "山", cells: ["やま（山のぼり）", "さん（ふじ山）"] },
          { label: "人", cells: ["ひと（あの 人）", "にん（三人）"] },
          { label: "大", cells: ["おお（大きい）", "だい（大すき）"] },
        ],
      },
    },
    {
      heading: "かきじゅんを まもろう",
      body: "漢字《かんじ》には、かく じゅんばんが あります。これを {{かきじゅん}}と いいます。おおくは 上から 下、左から 右へ かきます。とめ・はね・はらいにも 気を つけます。",
      figure: {
        type: "flow",
        title: "「十」の かきじゅん",
        steps: [
          { label: "1かくめ", sub: "よこの せん" },
          { label: "2かくめ", sub: "たての せん" },
          { label: "十", sub: "できあがり", tone: "yellow" },
        ],
        note: "「十」は、よこが さきです。",
      },
    },
  ],
  mistakes: [
    { wrong: "木が 2つで 「森」", right: "木が 2つで 「林」", why: "木が 3つで 「森」です。" },
    { wrong: "「十」を たてから かく", right: "よこから かく", why: "1かくめは、よこの せんです。" },
    { wrong: "「右」も 「左」も、よこから かく", right: "右は ノから、左は 一から", why: "はじめの 1かくが ちがいます。" },
  ],
  check: [
    { q: "木が 3つで できた 字は？", a: "森（もり）", why: "木が 2つなら 林です。" },
    { q: "人と 木で できた 字は？", a: "休（やすむ）", why: "人が 木の そばで やすむ かたちです。" },
    { q: "火よう日の 「火」は、なんと よむ？", a: "か", why: "花火の 「火」は 「び」です。" },
  ],
  next: [
    { label: "1年の 漢字《かんじ》 80字", href: "/learn/kanji/1" },
    { label: "図解《ずかい》レクチャー 「ひらがな」", href: "/learn/lecture/e-japanese-1-hiragana" },
    { label: "2年の 漢字《かんじ》", href: "/learn/kanji/2" },
  ],
};
