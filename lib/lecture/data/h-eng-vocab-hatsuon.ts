import type { Lecture } from "../types";

export const H_ENG_VOCAB_HATSUON: Lecture = {
  unit: "h-eng-vocab-hatsuon",
  title: "つづりと音はずれる。アクセントは「語の終わり」と「品詞」で決まることが多い",
  hook: "hotel をカタカナの「ホテル」のつもりで頭を強く言うと、英語では通じにくいことがあります。英語のアクセントは ho-TEL と後ろです。発音・アクセントは、まとめて覚えるための「きまり」があります。きまりを知ると、テストの問題だけでなく、リスニングで音を聞き取る力にもつながります。",
  sections: [
    {
      heading: "同じつづりでも、音はいくつかに分かれる",
      body: "英語は{{つづりと発音が1対1ではない}}言語です。同じ ea でも、meat は /iː/、head は /e/、great は /eɪ/ と読みます。よく出る読み方を基本として覚え、{{例外になる語}}を少数だけ別にしておくのが効率的です。",
      figure: {
        type: "compare",
        title: "つづりと発音のずれ",
        columns: [{ title: "つづり" }, { title: "発音", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["ea", "/iː/（基本）", "meat, dream, teach"] },
          { cells: ["ea", "/e/", "head, bread, weather"] },
          { cells: ["ea", "/eɪ/（少数）", "great, break, steak"] },
          { cells: ["ow", "/aʊ/", "cow, town, flower"] },
          { cells: ["ow", "/oʊ/", "snow, know, window"] },
        ],
        note: "/oʊ/ はイギリス式の辞書では /əʊ/ と書くこともある。",
      },
    },
    {
      heading: "-ed の発音は、直前の音で3つに分かれる",
      body: "過去形の -ed は、いつも「イド」と読むわけではありません。直前が {{/t/・/d/}} なら /ɪd/、直前が /k/・/p/・/s/・/ʃ/ などの{{のどがふるえない音（無声音）}}なら /t/、それ以外の{{のどがふるえる音（有声音）}}なら /d/ です。のどに手を当てて、直前の音を出してみるとわかります。",
      figure: {
        type: "tree",
        title: "-ed の読み方を決める",
        root: {
          label: "-ed の直前の音",
          children: [
            { label: "/t/・/d/", sub: "wanted, needed", children: [{ label: "/ɪd/", tone: "red" }] },
            { label: "無声音", sub: "looked, washed", children: [{ label: "/t/", tone: "blue" }] },
            { label: "有声音", sub: "played, called", children: [{ label: "/d/", tone: "yellow" }] },
          ],
        },
        note: "3人称単数の -s も同じ考え方：無声音の後は /s/、有声音の後は /z/、/s/ /z/ /ʃ/ などの後は /ɪz/。",
      },
    },
    {
      heading: "語の終わり（接尾辞）がアクセントの位置を決める",
      body: "-tion・-sion・-ic・-ity などで終わる語は、{{その直前の音節}}にアクセントが来ます。そのため、もとの語に接尾辞がつくと{{アクセントが移る}}ことがあります。-ese・-ee などは、その部分そのものが強く読まれます（Japa-NESE、employ-EE）。",
      figure: {
        type: "formula",
        title: "接尾辞でアクセントが動く（大文字が強い音節）",
        prose: true,
        steps: [
          { label: "-tion", expr: "ED-u-cate → ed-u-{{CA}}-tion", note: "-tion の直前が強い" },
          { label: "-ic", expr: "e-CON-o-my → ec-o-{{NOM}}-ic", note: "-ic の直前が強い" },
          { label: "-ity", expr: "POS-si-ble → pos-si-{{BIL}}-i-ty", note: "-ity の直前が強い" },
          { label: "-ese", expr: "Ja-PAN → Jap-a-{{NESE}}", note: "-ese そのものが強い" },
        ],
      },
    },
    {
      heading: "名詞は前、動詞は後ろ（名前動後）",
      body: "同じつづりで名詞と動詞の両方に使う2音節の語には、{{名詞は前・動詞は後ろ}}にアクセントを置くものが多くあります。これを{{名前動後}}といいます。すべての語に当てはまるわけではない（answer, visit などは品詞が変わっても前）ので、代表的な語で覚えましょう。",
      figure: {
        type: "compare",
        title: "名前動後の代表例",
        columns: [{ title: "語" }, { title: "名詞（前）", tone: "blue" }, { title: "動詞（後ろ）", tone: "yellow" }],
        rows: [
          { cells: ["record", "REC-ord 記録", "re-CORD 記録する"] },
          { cells: ["present", "PRES-ent 贈り物", "pre-SENT 贈る"] },
          { cells: ["increase", "IN-crease 増加", "in-CREASE 増える"] },
          { cells: ["export", "EX-port 輸出", "ex-PORT 輸出する"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "looked を「ルックイド」と読む", right: "/lʊkt/（ルックト）", why: "-ed の直前の /k/ は無声音なので、-ed は /t/ と読みます。/ɪd/ になるのは直前が /t/・/d/ のときだけです。" },
    { wrong: "event を EV-ent と前を強く読む", right: "e-VENT", why: "カタカナの「イベント」につられやすい語です。hotel（ho-TEL）や guitar（gui-TAR）も同じタイプです。" },
    { wrong: "名詞の record も re-CORD と読む", right: "名詞は REC-ord", why: "名前動後の語は、名詞なら前、動詞なら後ろにアクセントを置きます。" },
  ],
  check: [
    { q: "needed の -ed の発音は？", a: "/ɪd/", why: "直前が /d/ なので /ɪd/。" },
    { q: "economic で最も強く読む音節は？", a: "nom（ec-o-NOM-ic）", why: "-ic で終わる語は、その直前の音節にアクセントが来る。" },
    { q: "Prices will increase. の increase のアクセントは前と後ろのどちら？", a: "後ろ（in-CREASE）", why: "ここでは動詞（増える）なので、名前動後の「動詞は後ろ」。" },
  ],
  next: [
    { label: "発音・アクセントをカードで覚える", href: "/learn/eigo-ko/h-eng-vocab-hatsuon" },
    { label: "耳で鍛える「リスニング」", href: "/learn/eigo-ko/h-eng-skill-listening" },
    { label: "ふりかえり「アルファベットと発音」（中1）", href: "/learn/eigo-chu/j-en-1-onsei" },
  ],
};
