// 過去問チャレンジの「解答欄 → 単元」の対応表。採点のあと、まちがえた解答欄の単元から、さかのぼり（前の学年の原因の単元）へつなぐ。
// 大学入試センターの問題 PDF を読み、各設問が何を問うているかだけを記録した（問題文は写していない）。
// 単元 id は lib/lecture/data にあるもの。キーは解答欄 (lib/kakomon/grade.ts の cellKey：解答番号、または「大問-記号」)。
// 点検: npx tsx scripts/check-kakomon.ts（単元が実在するか・試験の解答欄と合うか）

import GEN from "./units.gen.json";

type Map = Record<string, string>;

/** 解答番号 from〜to を unit に */
const nums = (m: Map, from: number, to: number, unit: string) => {
  for (let n = from; n <= to; n++) m[String(n)] = unit;
};
/** 大問 d の解答記号 (カタカナを並べた文字列) を unit に */
const kana = (m: Map, d: number, labels: string, unit: string) => {
  for (const l of labels) m[`${d}-${l}`] = unit;
};

// ---- 令和8年度 本試験 化学基礎（解答番号 101〜116）----
const R8_CHEMB: Map = {
  "101": "h-sci-chemb-genshi", // 電子配置
  "102": "h-sci-chemb-genshi", // 同位体
  "103": "h-sci-chemb-mol", // 原子の数の比から質量パーセント
  "104": "h-sci-chemb-sanka", // 酸化数
  "105": "h-sci-chemb-ion", // 水への溶けやすさと電気伝導性（イオン結晶・分子結晶）
  "106": "h-sci-chemb-kyoyu", // 分子の形と極性
  "107": "h-sci-chemb-mol", // 溶解度曲線と析出量
  "108": "h-sci-chemb-bunri", // 蒸留の器具と操作
  "109": "h-sci-chemb-san", // 弱酸の電離度と pH
  "110": "h-sci-chemb-hannoshiki", // 反応の量的関係から濃度の範囲
  "111": "h-sci-chemb-genshi", // アルカリ土類金属・イオン化エネルギー（周期表）
  "112": "h-sci-chemb-san", // 強酸・弱酸・強塩基・弱塩基
  "113": "h-sci-chemb-mol", // 混合物の元素の含有率
  "114": "h-sci-chemb-genso", // 炎色反応・沈殿で物質を区別する
  "115": "h-sci-chemb-sanka", // 酸化還元反応の判定
  "116": "h-sci-chemb-mol", // グラフから含有率を求める
};

// ---- 令和8年度 本試験 数学Ⅰ・A ----
const R8_MATH1A: Map = {};
kana(R8_MATH1A, 1, "アイウエオカキ", "h-math-1-shugo"); // 〔1〕集合（公約数で決まる部分集合・共通部分）
kana(R8_MATH1A, 1, "クケコサシスセソ", "h-math-1-keiryo"); // 〔2〕四角形の面積を三角形に分けて sin で表す
kana(R8_MATH1A, 1, "タチツテトナニヌネノハヒフヘ", "h-math-1-teiri"); // 〔2〕辺の比と長さ（正弦定理・余弦定理）
kana(R8_MATH1A, 2, "アイウエオカキクケコ", "h-math-1-saidai"); // 〔1〕二次関数の最大・最小
kana(R8_MATH1A, 2, "サシ", "h-math-1-nijikansu"); // 〔1〕条件から二次関数を決める
kana(R8_MATH1A, 2, "スセ", "h-math-1-nijihoteishiki"); // 〔1〕グラフと x 軸の共有点
kana(R8_MATH1A, 2, "ソタチツテトナ", "h-math-1-data"); // 〔2〕散布図・相関係数・外れ値・箱ひげ図
kana(R8_MATH1A, 3, "アイウキク", "h-math-a-sankakukei"); // 内心・角の二等分線と辺の比
kana(R8_MATH1A, 3, "エオカ", "h-math-a-en"); // 4点が同一円周上・方べきの定理
kana(R8_MATH1A, 3, "ケコサシスセソ", "h-math-a-kukan"); // 三角錐の高さ・体積
kana(
  R8_MATH1A,
  4,
  "アイウエオカキクケコサシスセソタチツテトナニヌ",
  "h-math-a-kakuritsu",
); // リーグ戦の優勝の確率

// ---- 令和8年度 本試験 英語（リーディング）----
// 設問はすべて本文の読み取り（語彙・文法を単独で問う設問はない）ので、長文読解の単元にまとめる
const R8_ENGR: Map = {};
nums(R8_ENGR, 1, 44, "h-eng-skill-chobun");

// そのほかの試験は units.gen.json (scripts/kakomon/units/*.txt から scripts/kakomon/gen-units.py で作る。1行＝「解答番号の範囲 単元」か「大問 記号の並び 単元」)
export const KAKOMON_UNITS: Record<string, Map> = {
  ...(GEN as Record<string, Map>),
  "r8-hon-chemb": R8_CHEMB,
  "r8-hon-math1a": R8_MATH1A,
  "r8-hon-eng-r": R8_ENGR,
};

export const unitsOfExam = (id: string): Map | undefined => KAKOMON_UNITS[id];
