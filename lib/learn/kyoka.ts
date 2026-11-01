// 教科ごとの入口 (/learn/kyoka/<教科>)。小・中・高の教材を ①覚える・②鍛える に分けて並べる。
// まなぶの地図 (/learn) の SCHOOL 行は、ここへの入口だけを出す。教材を足したらここに1行足す。

export type KyokaKey = "kokugo" | "sugaku" | "rika" | "shakai" | "eigo" | "joho";
export type Level = "sho" | "chu" | "ko";

export interface Material {
  level: Level;
  engine: "覚える" | "鍛える";
  label: string;
  href: string;
  sub: string;
}

export interface Kyoka {
  key: KyokaKey;
  name: string;
  /** 学校の教科の地図のアンカー (/learn/school#<id>) */
  map: Partial<Record<Level, string>>;
  items: Material[];
}

const m = (level: Level, engine: Material["engine"], label: string, href: string, sub: string): Material => ({ level, engine, label, href, sub });

export const LEVEL_NAME: Record<Level, string> = { sho: "小学校", chu: "中学校", ko: "高校" };

export const KYOKA: Kyoka[] = [
  {
    key: "kokugo",
    name: "国語",
    map: { sho: "sho-japanese", chu: "chu-kokugo", ko: "ko-kokugo" },
    items: [
      m("sho", "覚える", "小学校の漢字1026字", "/learn/kanji", "読み・書きを4択で"),
      m("sho", "覚える", "ことわざ・慣用句・故事成語・四字熟語", "/learn/kotowaza", "280こ"),
      m("sho", "鍛える", "小学国語のことばと読み書き", "/learn/kokugo-sho", "62単元のポイント＋ドリル"),
      m("chu", "鍛える", "中学国語の文法・古典", "/learn/kokubunpo-chu", "文節・品詞・活用・敬語・古文漢文の基礎"),
      m("chu", "鍛える", "中学国語の読む・書く・漢字", "/learn/kokugo-chu", "25単元"),
      m("ko", "覚える", "古文単語300", "/learn/kobun-tango", "意味・例文・現代語訳つき"),
      m("ko", "鍛える", "古文", "/learn/kobun", "活用・助動詞・助詞・敬語・識別・和歌"),
      m("ko", "鍛える", "漢文", "/learn/kanbun", "返り点・再読文字・句法"),
      m("ko", "鍛える", "高校国語", "/learn/kokugo-ko", "評論・小論文・近代文学・古典の読解"),
    ],
  },
  {
    key: "sugaku",
    name: "算数・数学",
    map: { sho: "sho-math", chu: "chu-math", ko: "ko-math" },
    items: [
      m("sho", "鍛える", "小学算数 計算63段", "/learn/sansu", "その場で採点・満点まで解き直し"),
      m("sho", "鍛える", "小学算数の図形・単位・グラフ", "/learn/sansu-zukei", "51単元"),
      m("chu", "鍛える", "中学数学 計算50段", "/learn/math", "正負の数〜二次方程式"),
      m("chu", "鍛える", "中学数学の関数・図形・データ", "/learn/sugaku-chu", "12単元"),
      m("ko", "鍛える", "高校数学 計算88段", "/learn/kousuu", "数学Ⅰ・A・Ⅱ・B・Ⅲ・C"),
      m("ko", "鍛える", "高校数学の図形・データ・証明", "/learn/sugaku-ko", "14単元"),
    ],
  },
  {
    key: "rika",
    name: "理科",
    map: { sho: "sho-science", chu: "chu-rika", ko: "ko-science" },
    items: [
      m("sho", "覚える", "小学理科の重要語句", "/learn/rika", "小3〜小6・単元ごと"),
      m("chu", "覚える", "中学理科の重要語句", "/learn/chu-rika", "中1〜中3・単元ごと"),
      m("ko", "覚える", "高校理科の重要語句", "/learn/ko-rika", "物理・化学・生物・地学"),
      m("ko", "鍛える", "高校物理・化学の計算", "/learn/rika-keisan", "32単元の計算・考察"),
    ],
  },
  {
    key: "shakai",
    name: "社会",
    map: { sho: "sho-social", chu: "chu-shakai", ko: "ko-geohist" },
    items: [
      m("sho", "覚える", "47都道府県", "/learn/todofuken", "県庁所在地・地方・特徴"),
      m("sho", "覚える", "小学社会の重要語句", "/learn/shakai", "小3〜小6・単元ごと"),
      m("chu", "覚える", "中学社会の重要語句", "/learn/chu-shakai", "地理・歴史・公民"),
      m("ko", "覚える", "高校地理歴史の重要語句", "/learn/ko-chireki", "地理・歴史総合・日本史・世界史"),
      m("ko", "覚える", "高校公民の重要語句", "/learn/ko-komin", "公共・倫理・政治経済"),
    ],
  },
  {
    key: "eigo",
    name: "英語",
    map: { sho: "sho-english", chu: "chu-eigo", ko: "ko-english" },
    items: [
      m("sho", "鍛える", "小学英語", "/learn/eigo-sho", "あいさつ〜したことの伝え方"),
      m("chu", "覚える", "中学英単語1200", "/learn/chu-tango", "中1〜中3・例文と発音つき"),
      m("chu", "鍛える", "中学英文法", "/learn/eibunpo-chu", "26単元のポイント＋ドリル"),
      m("chu", "鍛える", "中学英語の英作文・リスニング・長文", "/learn/eigo-chu", "11単元"),
      m("ko", "覚える", "英単語2000", "/learn/eitango", "ネイティブ音声つき"),
      m("ko", "覚える", "英熟語500", "/learn/jukugo", "大学入試頻出"),
      m("ko", "鍛える", "英単語2000を鍛える", "/learn/eitango/kitaeru", "60秒の瞬発・文脈の空所補充"),
      m("ko", "鍛える", "高校英文法", "/learn/eibunpo-ko", "20単元・入試の文法語法"),
      m("ko", "鍛える", "高校英語の語彙と技能", "/learn/eigo-ko", "発音・長文・英作文・リスニング"),
    ],
  },
  {
    key: "joho",
    name: "情報",
    map: { ko: "ko-info" },
    items: [
      m("ko", "覚える", "高校情報の重要語句", "/learn/ko-joho", "情報Ⅰ"),
      m("ko", "鍛える", "高校情報の演習", "/learn/joho-enshu", "データ量・アルゴリズム・プログラム"),
    ],
  },
];

export const findKyoka = (k: string) => KYOKA.find((x) => x.key === k);
