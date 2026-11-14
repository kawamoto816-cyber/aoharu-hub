import type { CastScript } from "../types";

// 止まる授業：否定・倒置・強調・省略（高校・英文法）× カリスマ講師（カナメ先生・ユウキ）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-tokushu.ts の本文だけ。
// 要点をしぼって言い切り、「ポイントは〜」で整理する。英文は say でカタカナに開く。問題は data/h-eng-gram-tokushu.ts から引く。

export const H_TOKUSHU_H_CHARISMA: CastScript = {
  unitId: "h-eng-gram-tokushu",
  castId: "h-charisma",
  title: "語順のずれに意味がある。否定・倒置・強調・省略で名作の幕切れを読む",
  scenes: [
    { kind: "chapter", title: "つかみ：なぜひっくり返す？" },
    {
      kind: "talk",
      who: "sensei",
      card: "mystery",
      text: "カナメです。今日の依頼人は、高校英語劇コンテストで字幕を担当する英語部の部長。演目は『ロミオとジュリエット』。最後の2行の字幕で困っている。",
      say: "カナメです。きょうのいらいにんは、高校英語劇コンテストで、字幕を担当する、英語部の部長。演目は、ロミオとジュリエット。最後の、2ぎょうの字幕で、こまっている。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "受講生のユウキです。For never was a story of more woe / Than this of Juliet and her Romeo. を「これ以上悲しい物語はなかった」と訳したら、顧問の先生に「それでは語順の力が消える」と言われたそうです。",
      say: "受講生のユウキです。フォー ネヴァー ワズ ア ストーリー オヴ モア ウォウ、ザン ディス オヴ ジュリエット アンド ハー ロミオ。これを、これ以上悲しい物語はなかった、と訳したら、顧問の先生に、それでは、語順の力が消える、と言われたそうです。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "ふつうの語順でも There was never a sadder story …… と書ける。なのに、なぜひっくり返したか。ポイントは「{{ふつうの形からのずれ}}」。ずれ方には型がある。否定、倒置、強調、省略。この順に解く。",
      say: "ふつうの語順でも、ゼア ワズ ネヴァー ア サッダー ストーリー、と書ける。なのに、なぜ、ひっくり返したか。ポイントは、ふつうのかたちからの、ずれ。ずれかたには、型がある。否定、倒置、強調、省略。この順に解く。",
    },

    { kind: "chapter", title: "1. 部分否定と全体否定" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0 },
      text: "まず否定。not が all・every・always・both と組むと「すべてが〜とは限らない」、{{部分否定}}。「1つも〜ない」の{{全体否定}}は、no・none・never・neither で表す。",
      say: "まず否定。ノットが、オール、エヴリ、オールウェイズ、ボウスと組むと、すべてが、とは限らない。部分否定。ひとつも、ない、の、全体否定は、ノウ、ナン、ネヴァー、ニーザーで表す。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 0, focus: "not all（全部とは限らない）" },
      text: "Not all students like math. は「数学が好きでない生徒もいる」。No student likes math. とは別物だ。",
      say: "ノット オール スチューデンツ ライク マス、は、数学が好きでない生徒もいる。ノウ スチューデント ライクス マス、とは、別物だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "有名なのは『ヴェニスの商人』の All that glisters is not gold. ですよね。金の箱を開けた王子が見つけた巻物の言葉。「光るものはすべて金ではない」、つまり光るものは全部にせもの！",
      say: "有名なのは、ヴェニスの商人の、オール ザット グリスターズ イズ ノット ゴウルド、ですよね。金の箱を開けた王子が見つけた、巻物の言葉。光るものは、すべて、金ではない。つまり、光るものは、全部にせもの！",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "そこで差がつく。言いたいのは「光るものが、すべて金とは限らない」。今は Not all that glitters is gold. と not を前に出す言い方も広く使われる。確認。",
      say: "そこで差がつく。言いたいのは、光るものが、すべて、金とは限らない。いまは、ノット オール ザット グリッターズ イズ ゴウルド、と、ノットを、前に出す言いかたも、広く使われる。確認。",
    },
    { kind: "pause", ref: "check:2" },
    {
      kind: "talk",
      who: "sensei",
      text: "not ＋ every で、全員が持っているとは限らない。なお hardly・seldom などの{{準否定語}}は、それ自体が否定。not とはいっしょに使わない。",
      say: "ノット、プラス、エヴリで、全員が、持っているとは限らない。なお、ハードリー、セルダムなどの、準否定語は、それ自体が否定。ノットとは、いっしょに使わない。",
    },

    { kind: "chapter", title: "2. 否定語が文頭に出ると" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1 },
      text: "次は倒置。never・hardly・rarely など{{否定の語句}}を強調して文頭に出すと、後ろは{{疑問文と同じ語順}}になる。I have never seen such a view. が Never have I seen such a view. だ。",
      say: "次は倒置。ネヴァー、ハードリー、レアリーなど、否定の語句を、強調して、文頭に出すと、うしろは、疑問文と同じ語順になる。アイ ハヴ ネヴァー スィーン サッチ ア ヴュー、が、ネヴァー ハヴ アイ スィーン サッチ ア ヴュー、だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "語順まで変えなくても、Never I have seen such a view. で十分じゃないですか。never を前に出しただけで、もう目立ちます。",
      say: "語順まで変えなくても、ネヴァー アイ ハヴ スィーン サッチ ア ヴュー、で、じゅうぶんじゃないですか。ネヴァーを、前に出しただけで、もう、目立ちます。",
    },
    { kind: "talk", who: "sensei", text: "そこが落とし穴。問題。" },
    { kind: "pause", ref: "mistake:0" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 1, focus: "Rarely does she" },
      text: "be動詞・助動詞・have は主語の前へ。一般動詞なら do・does・did を前に出し、動詞は原形にもどす。Rarely does she go out at night. だ。",
      say: "ビー動詞、助動詞、ハヴは、主語の前へ。一般動詞なら、ドゥー、ダズ、ディッドを、前に出し、動詞は、原形にもどす。レアリー ダズ シー ゴウ アウト アット ナイト、だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "「〜もそうだ」の So do I. や Neither do I. も、同じ倒置の型なんですよね。",
      say: "もそうだ、の、ソウ ドゥー アイ、や、ニーザー ドゥー アイ、も、同じ倒置の型なんですよね。",
    },
    { kind: "talk", who: "sensei", text: "そのとおり。では確認。" },
    { kind: "pause", ref: "check:0" },
    {
      kind: "talk",
      who: "sensei",
      text: "では謎解き。For never was a story of more woe は、never を前に出した倒置。せりふは弱く強くを5回打つリズム。never の強い音が行の頭近くで鳴り、「後にも先にも決して」が最初に響く。",
      say: "では、謎解き。フォー ネヴァー ワズ ア ストーリー オヴ モア ウォウ、は、ネヴァーを、前に出した倒置。せりふは、弱く強くを、5回打つ、リズム。ネヴァーの強い音が、ぎょうの頭近くで鳴り、あとにも、さきにも、決して、が、最初に響く。",
    },
    {
      kind: "talk",
      who: "sensei",
      card: "reveal",
      text: "しかも was a story を後ろに回したから、1行目は woe で終わり、2行目の Romeo と韻を踏む。強調と韻とリズムを一度にかなえ、劇の最後を主人公の名で結ぶ。これが語順をひっくり返した理由だ。",
      say: "しかも、ワズ ア ストーリーを、うしろに回したから、1ぎょうめは、ウォウで終わり、2ぎょうめの、ロミオと、韻を踏む。強調と、韻と、リズムを、いちどにかなえ、劇の最後を、主人公の名で結ぶ。これが、語順を、ひっくり返した理由だ。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "字幕も「決してなかった」を先に出して、最後をロミオの名で結べばいいんですね。",
      say: "字幕も、決してなかった、を、さきに出して、最後を、ロミオの名で、結べばいいんですね。",
    },

    { kind: "chapter", title: "3. It is 〜 that … の強調構文" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2 },
      text: "語順を変えずに1つの要素に光を当てる方法もある。{{It is 〜 that …}} の枠にはさむ強調構文。It was Mika that found the key. で「鍵を見つけたのは、ほかでもないミカだ」。",
      say: "語順を変えずに、ひとつの要素に、光を当てる方法もある。イット イズ、ザットの、枠にはさむ、強調構文。イット ワズ ミカ ザット ファウンド ザ キー、で、鍵を見つけたのは、ほかでもない、ミカだ。",
    },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 2, focus: "副詞句を強調" },
      text: "見分け方は一言。It was と that を取りのぞいて、元の文にもどれば強調構文。It was in the garden that Mika found the key. は、副詞句の in the garden を強調している。",
      say: "見分けかたは、ひとこと。イット ワズと、ザットを、取りのぞいて、もとの文にもどれば、強調構文。イット ワズ イン ザ ガーデン ザット ミカ ファウンド ザ キー、は、ふくしくの、イン ザ ガーデンを、強調している。",
    },
    {
      kind: "talk",
      who: "seito",
      text: "場所を強調するなら、つなぎは which ですよね。It was in this town which I was born.",
      say: "場所を強調するなら、つなぎは、ウィッチですよね。イット ワズ イン ディス タウン ウィッチ アイ ワズ ボーン。",
    },
    { kind: "talk", who: "sensei", text: "関係代名詞とまざった。問題。" },
    { kind: "pause", ref: "mistake:3" },
    {
      kind: "talk",
      who: "sensei",
      text: "動詞そのものを強めたいときは {{do / does / did ＋原形}}。I did call you. で「本当に電話したんだ」。コールリッジの In Xanadu did Kubla Khan も、did を使って語順と韻を整えた例だ。",
      say: "動詞そのものを、強めたいときは、ドゥー、ダズ、ディッド、プラス、原形。アイ ディッド コール ユー、で、本当に、電話したんだ。コールリッジの、イン ザナドゥ ディッド クーブラ カーン、も、ディッドを使って、語順と韻を、整えた例だ。",
    },

    { kind: "chapter", title: "4. 省略" },
    {
      kind: "talk",
      who: "sensei",
      board: { section: 3 },
      text: "最後は省略。When young, he lived in Kyoto. は、副詞節の{{主語＋be動詞}}をまとめて省いた形。I'd like to. は動詞を省いて to だけ残す{{代不定詞}}。",
      say: "最後は、省略。ウェン ヤング、ヒー リヴド イン キョウト、は、ふくしせつの、主語、プラス、ビー動詞を、まとめて省いたかたち。アイド ライク トゥー、は、動詞を省いて、トゥーだけ残す、代不定詞。",
    },
    {
      kind: "talk",
      who: "sensei",
      text: "大公のせりふ Some shall be pardon'd, and some punished. も、後半の shall be が省かれている。並んでいる形を見つけ、前からそっくり写せば補える。",
      say: "大公のせりふ、サム シャル ビー パードンド、アンド サム パニッシュト、も、後半の、シャル ビーが、省かれている。並んでいるかたちを見つけ、前から、そっくり写せば、補える。",
    },

    { kind: "chapter", title: "まとめ" },
    {
      kind: "talk",
      who: "sensei",
      text: "一言でいうと、ずれには意味がある。not がどこまでを打ち消すか、否定語の後ろは疑問文の語順、強調は It is 〜 that と do、省略は並んだ形から補う。この型で部長に説明してみよう。",
      say: "ひとことでいうと、ずれには、意味がある。ノットが、どこまでを打ち消すか。否定語のうしろは、疑問文の語順。強調は、イット イズ ザットと、ドゥー。省略は、並んだかたちから補う。この型で、部長に、説明してみよう。",
    },
  ],
};
