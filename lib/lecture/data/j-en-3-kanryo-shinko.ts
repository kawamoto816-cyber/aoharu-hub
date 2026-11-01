import type { Lecture } from "../types";

export const J_EN_3_KANRYO_SHINKO: Lecture = {
  unit: "j-en-3-kanryo-shinko",
  title: "現在完了進行形は have been ＋ ing。「今までずっと〜し続けている」",
  hook: "「1時間ずっと待っている」「今朝からずっと雨が降っている」。過去に始まった動作が、今この瞬間まで{{続いている}}ことを言うのが現在完了進行形です。現在完了の「継続」とよくにているので、どの動詞でどちらを使うかを整理しましょう。",
  sections: [
    {
      heading: "過去に始まり、今も続いている動作",
      body: "I have been studying English since 2023. は「2023年に英語の勉強を始めて、{{今もしている}}」という意味です。過去のある時点から{{今まで}}、動作がずっと続いていることを表します。始まった時点は {{since}}、続いている長さは {{for}} で表します。",
      figure: {
        type: "timeline",
        title: "I have been studying English since 2023.",
        eras: [{ label: "ずっと勉強している", from: 2023, to: 2026 }],
        events: [
          { year: 2023, label: "英語の勉強を始める", key: true },
          { year: 2026, yearLabel: "今", label: "今も勉強している", key: true },
        ],
        note: "長さで言うと I have been studying English for three years.",
      },
    },
    {
      heading: "形は have / has been ＋ 動詞の ing 形",
      body: "現在完了（have＋過去分詞）の過去分詞を、be の過去分詞 {{been}} にして、そのあとに{{動詞の ing 形}}を置きます。主語が3人称単数なら {{has been}} です。「どのくらいの間〜しているのか」は {{How long}} have you been 〜ing? でたずね、for や since を使って答えます。",
      figure: {
        type: "formula",
        title: "「待っている」を広げる",
        prose: true,
        steps: [
          { label: "進行形", expr: "I {{am}} waiting for Ken.", note: "今、待っている" },
          { label: "完了進行形", expr: "I {{have been}} waiting {{for an hour}}.", note: "1時間ずっと待っている" },
          { label: "3人称単数", expr: "She {{has been}} waiting since ten.", note: "主語が she なので has" },
          { label: "疑問文", expr: "{{How long}} have you been waiting?", note: "— For an hour." },
        ],
      },
    },
    {
      heading: "動作の動詞は進行形、状態の動詞は現在完了",
      body: "study・play・wait・rain など{{動作}}を表す動詞の「ずっと〜している」は、現在完了進行形にします。一方、know・like・be・want など{{状態}}を表す動詞はふつう進行形にしないので、{{have＋過去分詞}}（現在完了の継続）を使います。",
      figure: {
        type: "tree",
        title: "「ずっと〜している」の形を選ぶ",
        root: {
          label: "ずっと〜している",
          children: [
            {
              label: "動作の動詞",
              sub: "study / play / wait",
              tone: "blue",
              children: [{ label: "have been ＋ ing", sub: "have been playing", tone: "yellow" }],
            },
            {
              label: "状態の動詞",
              sub: "know / like / be",
              tone: "red",
              children: [{ label: "have ＋ 過去分詞", sub: "have known" }],
            },
          ],
        },
        note: "live は have been living も使われるが、中学では have lived（継続）で表すのが基本。",
      },
    },
    {
      heading: "現在進行形とのちがいは「長さ」",
      body: "It is raining now. は「今降っている」ことだけを伝えます。It has been raining since this morning. は「{{今朝からずっと}}降っている」と、続いてきた{{長さ}}も伝えます。for・since・How long があれば、現在完了進行形の目じるしです。",
      figure: {
        type: "compare",
        title: "現在進行形と現在完了進行形",
        columns: [{ title: "現在進行形" }, { title: "現在完了進行形", tone: "yellow" }],
        rows: [
          { label: "形", cells: ["am / is / are ＋ ing", "have / has been ＋ ing"] },
          { label: "表すこと", cells: ["今している最中", "前から今までずっと"] },
          { label: "目じるし", cells: ["now", "for / since / How long"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I have been knowing him for five years.", right: "I have known him for five years.", why: "know は状態を表す動詞なので進行形にせず、have＋過去分詞を使います。" },
    { wrong: "She have been playing the piano.", right: "She has been playing the piano.", why: "主語が3人称単数なので has を使います。" },
    { wrong: "I am waiting for an hour.", right: "I have been waiting for an hour.", why: "for an hour（1時間ずっと）と長さを言うときは、現在完了進行形にします。" },
    { wrong: "I have been study for two hours.", right: "I have been studying for two hours.", why: "been のあとは動詞の ing 形です。" },
  ],
  check: [
    { q: "It began to rain two hours ago. It is still raining. を1文にしましょう。", a: "It has been raining for two hours.", why: "2時間前から今までずっと降っている。長さなので for。" },
    { q: "「どのくらい（の間）テレビを見ているの？」を英語にしましょう。", a: "How long have you been watching TV?", why: "長さは How long。watch は動作の動詞なので have been ＋ ing。" },
    { q: "I ___ Mika since 2020.（know を使って）の ___ に入る語句は？", a: "have known", why: "know は状態の動詞なので、現在完了の継続にする。" },
  ],
  next: [
    { label: "4択ドリル「現在完了進行形」に挑戦", href: "/learn/eibunpo-chu/j-en-3-kanryo-shinko" },
    { label: "もとになる形「現在完了」のレクチャー", href: "/learn/lecture/j-en-3-kanryo" },
    { label: "復習「現在進行形」のレクチャー", href: "/learn/lecture/j-en-1-shinkokei" },
  ],
};
