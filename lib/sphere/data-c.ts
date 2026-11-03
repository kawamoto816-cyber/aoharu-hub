import type { AxisC } from "./types";

// 軸 C 時代の帯と人物の線。縦が時代 (古代中国→明治)、横が小・中・高。
// 線は同じ人物・同じ作品。橋 (bridge) は時代をこえて引用されるところ・名前の由来。
// 同じ帯・同じ段階のノードは、並べた順に左右へ交互に置く。

export const AXIS_C: AxisC = {
  eras: [
    { id: "kodai", name: "古代中国", label: ["古代", "中国"] },
    { id: "tou", name: "唐", label: ["唐"] },
    { id: "heian", name: "平安", label: ["平安"] },
    { id: "kamakura", name: "鎌倉", label: ["鎌倉"] },
    { id: "edo", name: "江戸", label: ["江戸"] },
    { id: "meiji", name: "明治", label: ["明治"] },
  ],
  lines: [
    { id: "koshi", name: "孔子と論語" },
    { id: "rihaku", name: "李白・杜甫" },
    { id: "sei", name: "清少納言" },
    { id: "murasaki", name: "紫式部" },
    { id: "heike", name: "平家物語と兼好" },
    { id: "basho", name: "松尾芭蕉" },
    { id: "ino", name: "伊能忠敬" },
    { id: "fukuzawa", name: "福沢諭吉と夏目漱石" },
  ],
  nodes: [
    // 古代中国
    { unit: "j-ja-1-kanbun", short: "故事成語", era: "kodai", stage: "中", lines: ["koshi"] },
    { unit: "j-ja-3-kanbun", short: "論語(中3)", era: "kodai", stage: "中", lines: ["koshi"] },
    { unit: "h-hist-w-china-kodai", short: "古代中国", era: "kodai", stage: "高", lines: ["koshi"] },
    { unit: "h-civ-rinri-china", short: "中国の思想", era: "kodai", stage: "高", lines: ["koshi"] },
    { unit: "h-jpn-koten-shiso", short: "思想・史伝", era: "kodai", stage: "高", lines: ["koshi"] },
    // 唐
    { unit: "j-ja-2-kanshi", short: "漢詩", era: "tou", stage: "中", lines: ["rihaku"] },
    { unit: "h-hist-w-tou", short: "隋・唐", era: "tou", stage: "高", lines: ["rihaku"] },
    { unit: "h-jpn-bunka-kanshi", short: "漢詩のきまり", era: "tou", stage: "高", lines: ["rihaku"] },
    // 平安
    { unit: "e-social-6-heian", short: "貴族のくらし", era: "heian", stage: "小", lines: ["sei", "murasaki"] },
    { unit: "e-japanese-6-kana-yurai", short: "仮名の由来", era: "heian", stage: "小", lines: ["murasaki"] },
    { unit: "e-japanese-6-zuihitsu", short: "随筆", era: "heian", stage: "小", lines: ["sei"] },
    { unit: "j-soc-hist-heian", short: "平安時代", era: "heian", stage: "中", lines: ["murasaki"] },
    { unit: "j-ja-1-kobun", short: "古文(中1)", era: "heian", stage: "中", lines: ["murasaki"] },
    { unit: "h-hist-jp-heian", short: "平安時代", era: "heian", stage: "高", lines: ["murasaki"] },
    { unit: "h-jpn-koten-monogatari", short: "物語", era: "heian", stage: "高", lines: ["murasaki"] },
    { unit: "h-jpn-koten-nikki", short: "日記・随筆", era: "heian", stage: "高", lines: ["sei"] },
    // 鎌倉
    { unit: "e-japanese-5-koten", short: "古典に親しむ", era: "kamakura", stage: "小", lines: ["heike", "koshi"] },
    { unit: "j-ja-2-kobun", short: "古文(中2)", era: "kamakura", stage: "中", lines: ["sei", "heike"], straddle: true, label: "r" },
    { unit: "j-soc-hist-kamakura", short: "鎌倉時代", era: "kamakura", stage: "中", lines: ["heike"] },
    { unit: "h-jpn-bunka-kobun-dokkai", short: "説話・随筆", era: "kamakura", stage: "高", lines: ["heike"] },
    { unit: "h-civ-rinri-nihon", short: "仏教", era: "kamakura", stage: "高", lines: ["heike"] },
    // 江戸
    { unit: "e-japanese-3-haiku", short: "俳句", era: "edo", stage: "小", lines: ["basho"] },
    { unit: "e-social-6-edo-bunka", short: "江戸の文化", era: "edo", stage: "小", lines: ["ino", "basho"] },
    { unit: "e-japanese-5-denki", short: "伝記", era: "edo", stage: "小", lines: ["ino"] },
    { unit: "j-ja-3-haiku", short: "俳句(中3)", era: "edo", stage: "中", lines: ["basho"] },
    { unit: "j-ja-3-kobun", short: "奥の細道", era: "edo", stage: "中", lines: ["basho", "rihaku"] },
    { unit: "j-soc-hist-edo-tenkai", short: "産業と幕政", era: "edo", stage: "中", lines: ["ino", "basho"] },
    { unit: "h-hist-jp-edo-keizai", short: "江戸の経済", era: "edo", stage: "高", lines: ["basho"] },
    { unit: "h-math-1-keiryo", short: "図形の計量", era: "edo", stage: "高", lines: ["ino"] },
    // 明治
    { unit: "e-social-6-meiji", short: "明治の国づくり", era: "meiji", stage: "小", lines: ["fukuzawa"] },
    { unit: "j-soc-hist-meiji-ishin", short: "明治維新", era: "meiji", stage: "中", lines: ["fukuzawa"] },
    { unit: "j-ja-2-ikenbun", short: "意見文", era: "meiji", stage: "中", lines: ["fukuzawa"] },
    { unit: "h-civ-rinri-kindai-nihon", short: "近代の思想", era: "meiji", stage: "高", lines: ["fukuzawa"] },
    { unit: "h-jpn-bunka-kindai", short: "近代文学", era: "meiji", stage: "高", lines: ["fukuzawa"] },
    { unit: "h-jpn-gen-iken", short: "意見文(高)", era: "meiji", stage: "高", lines: ["fukuzawa"] },
    { unit: "h-jpn-bungaku-shosetsu", short: "小説", era: "meiji", stage: "高", lines: ["fukuzawa"] },
  ],
  edges: [
    // 孔子と論語
    { from: "j-ja-1-kanbun", to: "j-ja-3-kanbun", line: "koshi", kind: "line", why: "訓読と故事成語の基本から、孔子の『論語』を読む" },
    { from: "e-japanese-5-koten", to: "j-ja-3-kanbun", line: "koshi", kind: "bridge", why: "小学校で声に出した『論語』の一節を、中3で読み深める" },
    { from: "j-ja-3-kanbun", to: "h-jpn-koten-shiso", line: "koshi", kind: "line", why: "『論語』など思想の文章を、高校の漢文で読む" },
    { from: "h-jpn-koten-shiso", to: "h-civ-rinri-china", line: "koshi", kind: "line", why: "孔子の儒家の教えを、諸子百家の中に置いて考える" },
    { from: "h-hist-w-china-kodai", to: "h-civ-rinri-china", line: "koshi", kind: "line", why: "春秋・戦国の乱世に、孔子ら諸子百家が現れた" },
    // 李白・杜甫
    { from: "j-ja-2-kanshi", to: "h-jpn-bunka-kanshi", line: "rihaku", kind: "line", why: "李白・杜甫の詩で、絶句・律詩と押韻のきまりを学ぶ" },
    { from: "h-hist-w-tou", to: "h-jpn-bunka-kanshi", line: "rihaku", kind: "line", why: "李白・杜甫は唐の詩人。漢詩は唐の時代に最も栄えた" },
    { from: "j-ja-2-kanshi", to: "j-ja-3-kobun", line: "rihaku", kind: "bridge", why: "芭蕉は平泉で、杜甫の「国破れて山河あり」を引く" },
    // 清少納言
    { from: "e-social-6-heian", to: "e-japanese-6-zuihitsu", line: "sei", kind: "line", why: "宮廷に仕えた清少納言は、随筆『枕草子』を書いた" },
    { from: "e-japanese-6-zuihitsu", to: "j-ja-2-kobun", line: "sei", kind: "line", why: "『枕草子』を、古文の原文で読む" },
    { from: "j-ja-2-kobun", to: "h-jpn-koten-nikki", line: "sei", kind: "line", why: "『枕草子』『徒然草』を、日記・随筆として読み深める" },
    // 紫式部
    { from: "e-japanese-6-kana-yurai", to: "j-ja-1-kobun", line: "murasaki", kind: "line", why: "仮名で書かれた平安の物語を、歴史的仮名遣いで読む" },
    { from: "j-ja-1-kobun", to: "h-jpn-koten-monogatari", line: "murasaki", kind: "line", why: "仮名の物語の先に、紫式部の『源氏物語』がある" },
    { from: "e-social-6-heian", to: "j-soc-hist-heian", line: "murasaki", kind: "line", why: "紫式部・清少納言のいた摂関政治の時代を、くわしく見る" },
    { from: "j-soc-hist-heian", to: "h-hist-jp-heian", line: "murasaki", kind: "line", why: "国風文化と摂関政治を、日本史で深める" },
    { from: "j-soc-hist-heian", to: "j-ja-1-kobun", line: "murasaki", kind: "line", why: "国風文化の中で生まれた仮名の物語を、古文で読む" },
    // 平家物語と兼好
    { from: "e-japanese-5-koten", to: "j-ja-2-kobun", line: "heike", kind: "line", why: "小学校で音読した『平家物語』の冒頭を、中2で読み深める" },
    { from: "j-soc-hist-kamakura", to: "j-ja-2-kobun", line: "heike", kind: "line", why: "『平家物語』は源平の争乱を語り、『徒然草』は鎌倉末に兼好法師が書いた" },
    { from: "j-ja-2-kobun", to: "h-jpn-bunka-kobun-dokkai", line: "heike", kind: "line", why: "説話・物語・随筆を、文法をふまえて読む" },
    { from: "j-soc-hist-kamakura", to: "h-civ-rinri-nihon", line: "heike", kind: "line", why: "法然・親鸞・道元・日蓮らの鎌倉仏教を、思想として考える" },
    // 松尾芭蕉
    { from: "e-japanese-3-haiku", to: "j-ja-3-haiku", line: "basho", kind: "line", why: "芭蕉の句を、季語と切れ字に注目して読み深める" },
    { from: "j-ja-3-haiku", to: "j-ja-3-kobun", line: "basho", kind: "line", why: "芭蕉の俳句から、紀行文『おくのほそ道』へ" },
    { from: "j-ja-3-kobun", to: "h-hist-jp-edo-keizai", line: "basho", kind: "line", why: "芭蕉を、元禄の文化として日本史で見る" },
    { from: "j-soc-hist-edo-tenkai", to: "h-hist-jp-edo-keizai", line: "basho", kind: "line", why: "産業の発達と元禄・化政の文化を、日本史で深める" },
    // 伊能忠敬
    { from: "e-japanese-5-denki", to: "e-social-6-edo-bunka", line: "ino", kind: "line", why: "伝記で読んだ伊能忠敬の地図づくりを、江戸の新しい学問として見る" },
    { from: "e-social-6-edo-bunka", to: "j-soc-hist-edo-tenkai", line: "ino", kind: "line", why: "元禄の文化や蘭学などの学問を、中学でくわしく見る" },
    { from: "j-soc-hist-edo-tenkai", to: "h-math-1-keiryo", line: "ino", kind: "line", why: "伊能忠敬の測量は、角と長さから距離を求める考え方" },
    // 福沢諭吉と夏目漱石
    { from: "e-social-6-meiji", to: "j-soc-hist-meiji-ishin", line: "fukuzawa", kind: "line", why: "福沢諭吉の『学問のすゝめ』と、明治の改革" },
    { from: "j-soc-hist-meiji-ishin", to: "j-ja-2-ikenbun", line: "fukuzawa", kind: "line", why: "福沢諭吉のように、根拠を示して意見を述べる" },
    { from: "j-ja-2-ikenbun", to: "h-jpn-gen-iken", line: "fukuzawa", kind: "line", why: "根拠と反論をふまえて、意見文を組み立てる" },
    { from: "j-soc-hist-meiji-ishin", to: "h-civ-rinri-kindai-nihon", line: "fukuzawa", kind: "line", why: "福沢諭吉・夏目漱石の考えを、近代日本の思想として見る" },
    { from: "h-civ-rinri-kindai-nihon", to: "h-jpn-bunka-kindai", line: "fukuzawa", kind: "line", why: "漱石の「自己本位」の考えと、その小説" },
    { from: "h-jpn-bunka-kindai", to: "h-jpn-bungaku-shosetsu", line: "fukuzawa", kind: "line", why: "漱石の小説を、心情と語りに注目して読む" },
    { from: "j-ja-1-kanbun", to: "h-jpn-bunka-kindai", line: "fukuzawa", kind: "bridge", why: "夏目漱石の「漱石」は、故事成語「漱石枕流」から" },
  ],
};
