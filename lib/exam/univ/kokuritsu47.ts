import type { UnivExam } from "./types";
import { PARTS, fromParts, type PartDaimon } from "./parts";

// 47都道府県の国立大学へ広げる分の大学別型（2026-11-23）。「型の部品」方式 (parts.ts)。
// 大問の中身は旧帝大・神戸大の型と共通の部品で、大学ごとに 時間・大問の数・大問の並び だけを合わせている。
//
// 形式の調べ方：受験情報サイト「じゅけラボ予備校」の各大学の「入試科目別受験対策」ページ
//   https://jyuke-labo.com/daigakujyukentaisaku/<大学>/kamokubetsu/ （2026-11-23 に1校ずつ読んだ）
// に書かれている 試験時間・大問数・大問の分野 をそのまま使った。大学の公式の募集要項とは照合していないので、
// 画面の basis に「正確な時間・配点は募集要項で確かめること」と書く。
//   - 時間と大問数の両方が書かれていた科目だけを型にした（どちらかが無い大学・科目は作っていない。下の「まだ作っていないもの」）
//   - guess: true は、大問ごとの分野がページに無く、一般的な構成（長文2＋英作文、よく出る分野）で並べたもの
//   - 文法・語法の大問、整序英作文は部品が無いので入れていない（omit に書いて、画面の format に出す）。小問集合は近い分野の大問に置きかえた
//   - 満点は、大問ごとの目安（長文60・英作文/和文英訳/会話文40・数学は1題50）を足したもの。実際の配点ではない
//
// 大学公式での確認（2026-11-23 夜〜。記録は /home/claude/work/univ/official.md → docs/univ-official-check.md）：
//   各大学の一般選抜「学生募集要項」の PDF を全文読み、個別学力検査の時間割と照らす。official をつけた科目が確認ずみ。
//   募集要項に書いてあるのは試験時間と配点まで。大問数は募集要項には無く、過去の問題・出題意図で確かめる必要がある（まだしていない）。
//   弘前・秋田・群馬・滋賀・愛媛は、じゅけラボのページに時間が無かったが、募集要項で時間が確かめられたので型にした。
//
// まだ作っていないもの：
//   福島・埼玉・新潟（大問数が分からない）、愛媛の英語、筑波の数学、千葉の数学（理系）、金沢の英語、
//   岡山・徳島・高知・長崎・香川・山口の数学（理系）の一部、岐阜の英語（全50問の選択式で、記述の部品では組めない）など。

type E = "R" | "E" | "T" | "K";
type B = "calc" | "prob" | "seq" | "vector" | "coord";
type R = "diff" | "int" | "limit" | "prob" | "seq" | "complex" | "vector";

const E_PARTS: Record<E, readonly string[]> = { R: PARTS.eigoRead, E: PARTS.eigoEssay, T: PARTS.eigoTranslate, K: PARTS.eigoTalk };
const E_POINTS: Record<E, number> = { R: 60, E: 40, T: 40, K: 40 };
const B_PARTS: Record<B, readonly string[]> = { calc: PARTS.bunCalc, prob: PARTS.bunProb, seq: PARTS.bunSeq, vector: PARTS.bunVector, coord: PARTS.bunCoord };
const R_PARTS: Record<R, readonly string[]> = { diff: PARTS.riDiff, int: PARTS.riInt, limit: PARTS.riLimit, prob: PARTS.riProb, seq: PARTS.riSeq, complex: PARTS.riComplex, vector: PARTS.riVector };

/** 同じ種類の大問が何題かあるとき、部品を重ならないように分ける（1つの型の中で同じ部品は2回使えない） */
function split<K extends string>(kinds: K[], parts: Record<K, readonly string[]>): string[][] {
  const total: Partial<Record<K, number>> = {};
  for (const k of kinds) total[k] = (total[k] ?? 0) + 1;
  const seen: Partial<Record<K, number>> = {};
  return kinds.map((k) => {
    const n = total[k]!;
    const i = (seen[k] = (seen[k] ?? 0) + 1) - 1;
    const out = parts[k].filter((_, j) => j % n === i);
    if (!out.length) throw new Error(`部品が足りない: ${k} を ${n} 題`);
    return out;
  });
}

interface Sub<K> {
  minutes: number;
  /** [種類, 題] を大問の順に */
  d: [K, string][];
  /** どの学部の問題を参考にしたか */
  who: string;
  guess?: boolean;
  /** 部品が無くて入れていない大問 */
  omit?: string;
  /** 試験時間を大学公式の学生募集要項で確かめた（その資料の年度。「令和8年度」） */
  official?: string;
}
interface Univ {
  slug: string;
  univ: string;
  order: number;
  eigo?: Sub<E>;
  bun?: Sub<B>;
  ri?: Sub<R>;
}

const U: Univ[] = [
  {
    slug: "hirosaki", univ: "弘前大学", order: 300,
    eigo: { minutes: 90, official: "令和8年度", who: "人文社会科学部・教育学部・医学部", d: [["K", "会話文の読解"], ["R", "長文読解（説明文）"], ["E", "会話を踏まえた英語表現と、日本文化の説明"], ["E", "メール形式の英作文（約100語）"]] },
    bun: { minutes: 90, official: "令和8年度", who: "人文社会科学部・教育学部・農学生命科学部（数学①）", d: [["vector", "図形と計量"], ["seq", "データと自然数の和"], ["coord", "不等式の表す領域"]] },
    ri: { minutes: 90, official: "令和8年度", who: "教育学部・理工学部（数学②）", d: [["int", "積分法"], ["diff", "関数の増減・極値・グラフ"], ["vector", "空間ベクトル"]] },
  },
  {
    slug: "akita", univ: "秋田大学", order: 300,
    eigo: { minutes: 60, official: "令和8年度", who: "国際資源学部・教育文化学部・医学部保健学科・情報データ科学部", d: [["R", "長文読解"], ["R", "長文読解"], ["E", "英作文（具体例を挙げて一段落）"]] },
    bun: { minutes: 90, official: "令和8年度", who: "教育文化学部・情報データ科学部（文系）", d: [["coord", "2次関数の最大・最小"], ["calc", "3次関数の微分・積分"], ["vector", "三角形と外接円のベクトル"]] },
    ri: { minutes: 90, official: "令和8年度", who: "国際資源学部・総合環境理工学部・情報データ科学部（理系）", d: [["vector", "三角形と外接円のベクトル"], ["diff", "円の位置関係・図形"], ["int", "曲線と接線・回転体の体積"]] },
  },
  {
    slug: "gunma", univ: "群馬大学", order: 302,
    eigo: { minutes: 120, official: "令和8年度", who: "情報学部", d: [["R", "長文読解"], ["R", "長文読解（和訳・日本語説明）"], ["T", "和文英訳"]] },
    bun: { minutes: 120, official: "令和8年度", who: "情報学部（数学Ⅲをふくまない選択）", d: [["seq", "式の処理・数列の和・整数"], ["prob", "確率"], ["coord", "数列・三角関数と数学的帰納法"], ["vector", "空間ベクトル"], ["calc", "関数のグラフ・面積・最大値"]] },
    ri: { minutes: 120, official: "令和8年度", who: "情報学部（数学Ⅲをふくむ選択）", d: [["seq", "式の処理・数列の和・整数"], ["prob", "確率"], ["limit", "数列・三角関数と数学的帰納法"], ["vector", "空間ベクトル"], ["int", "指数関数・三角関数の微分積分と極限"]] },
  },
  {
    slug: "iwate", univ: "岩手大学", order: 301,
    eigo: { minutes: 90, official: "令和8年度", who: "人文社会科学部", d: [["R", "長文読解（文化・社会）"], ["R", "長文読解（人生観・随想）"], ["E", "資料を踏まえた英語エッセイ"]] },
    ri: { minutes: 120, official: "令和8年度", who: "理工学部", d: [["complex", "複素数"], ["prob", "場合の数・確率"], ["vector", "ベクトル"], ["seq", "数列"], ["int", "積分と極限"]] },
  },
  {
    slug: "yamagata", univ: "山形大学", order: 302,
    eigo: { minutes: 90, official: "令和8年度", who: "人文社会科学部・教育学部・医学部", d: [["R", "意見記事の読解（1本目）"], ["R", "意見記事の読解（2本目）と自分の意見"]] },
    bun: { minutes: 90, official: "令和8年度", who: "人文社会科学部", d: [["prob", "確率"], ["calc", "放物線と接線・面積"], ["vector", "ベクトル"]] },
    ri: { minutes: 120, official: "令和8年度", who: "理学部・医学部医学科", d: [["prob", "確率"], ["vector", "ベクトル"], ["seq", "数列"], ["int", "数学Ⅲの極限・微分・積分"]] },
  },
  {
    slug: "utsunomiya", univ: "宇都宮大学", order: 303,
    eigo: { minutes: 120, official: "令和8年度", who: "国際学部", d: [["R", "長文読解（論説文）"], ["R", "長文読解（物語文）"], ["E", "英作文（意見と理由）"], ["K", "会話文"]] },
    ri: { minutes: 90, official: "令和8年度", who: "地域デザイン科学部・工学部・農学部", d: [["prob", "確率と数列"], ["diff", "三角関数・接線・面積"], ["int", "曲線と面積・積分"]] },
  },
  {
    slug: "toyama", univ: "富山大学", order: 304,
    eigo: { minutes: 90, official: "令和8年度", who: "人文学部・経済学部・教育学部", guess: true, d: [["R", "長文読解"], ["R", "長文読解"], ["E", "英作文"]] },
    bun: { minutes: 90, official: "令和8年度", who: "文系", guess: true, d: [["calc", "微分・積分"], ["prob", "場合の数・確率"], ["vector", "ベクトル"]] },
    ri: { minutes: 120, official: "令和8年度", who: "理系", guess: true, d: [["diff", "微分法"], ["int", "積分法"], ["prob", "場合の数・確率"]] },
  },
  {
    slug: "fukui", univ: "福井大学", order: 305,
    eigo: { minutes: 100, official: "令和8年度", who: "教育学部", guess: true, d: [["R", "長文読解"], ["R", "長文読解"], ["E", "英作文"]] },
    bun: { minutes: 110, official: "令和8年度", who: "教育学部・国際地域学部", guess: true, d: [["calc", "微分・積分"], ["prob", "場合の数・確率"], ["seq", "数列"], ["vector", "ベクトル"], ["coord", "図形と方程式"]] },
    ri: { minutes: 110, official: "令和8年度", who: "工学部", guess: true, d: [["diff", "微分法"], ["int", "積分法"], ["prob", "場合の数・確率"], ["vector", "ベクトル"]] },
  },
  {
    slug: "yamanashi", univ: "山梨大学", order: 306,
    eigo: { minutes: 90, who: "教育学部・生命環境学部", d: [["R", "長文読解"], ["R", "長文読解"], ["E", "英作文"]] },
    bun: { minutes: 90, who: "教育学部・生命環境学部", guess: true, d: [["calc", "微分・積分"], ["prob", "場合の数・確率"], ["vector", "ベクトル"]] },
    ri: { minutes: 120, who: "工学部・生命環境学部", guess: true, d: [["diff", "微分法"], ["int", "積分法"], ["prob", "場合の数・確率"], ["vector", "ベクトル"]] },
  },
  {
    slug: "shinshu", univ: "信州大学", order: 307,
    eigo: { minutes: 90, who: "経法学部", guess: true, d: [["R", "長文読解"], ["R", "長文読解"], ["R", "長文読解"], ["E", "英作文"]] },
    ri: { minutes: 120, who: "工学部・繊維学部", guess: true, d: [["diff", "微分法"], ["int", "積分法"], ["limit", "極限"], ["prob", "場合の数・確率"], ["seq", "数列"], ["complex", "複素数平面"], ["vector", "ベクトル"]] },
  },
  {
    slug: "gifu", univ: "岐阜大学", order: 308,
    bun: { minutes: 120, who: "教育学部・地域科学部・応用生物科学部ほか（数学イ）", d: [["prob", "場合の数・確率"], ["vector", "空間ベクトル"], ["seq", "数列・漸化式"], ["calc", "放物線の接線と定積分"], ["coord", "指数・対数と式"]] },
    ri: { minutes: 120, who: "医学部医学科・工学部ほか（数学ロ）", d: [["prob", "場合の数・確率"], ["vector", "空間ベクトル"], ["seq", "数列"], ["int", "三角関数と定積分"], ["diff", "曲線と微分法"]] },
  },
  {
    slug: "shizuoka", univ: "静岡大学", order: 309,
    eigo: { minutes: 80, official: "令和8年度", who: "人文社会科学部・教育学部ほか（英語G1）", omit: "文法・語法の大問", d: [["R", "長文読解（物語文）"], ["R", "長文読解（現代社会の課題）"], ["K", "コミュニケーション表現（会話文）"], ["E", "英作文"]] },
    bun: { minutes: 80, official: "令和8年度", who: "教育学部・農学部ほか（数学M1）", d: [["prob", "確率"], ["calc", "対数・二次関数"], ["seq", "漸化式・数列"]] },
    ri: { minutes: 120, official: "令和8年度", who: "工学部・情報学部・理学部（数学M2）", d: [["prob", "確率"], ["int", "三角関数と定積分・面積"], ["vector", "ベクトルと平面図形"], ["limit", "関数・数列の極限"]] },
  },
  {
    slug: "mie", univ: "三重大学", order: 310,
    eigo: { minutes: 80, who: "全学部共通", d: [["R", "長文読解（言い換え・内容真偽）"], ["R", "長文読解（和訳・内容説明）"], ["R", "長文読解（英語による論述）"]] },
    bun: { minutes: 120, who: "人文学部法律経済学科・医学部看護学科（数学④）", d: [["vector", "ベクトル・図形と方程式"], ["prob", "確率と数列"], ["calc", "数学Ⅱの微分・積分"]] },
    ri: { minutes: 120, who: "医学部医学科・工学部", d: [["vector", "ベクトル・小問"], ["prob", "確率と対数"], ["int", "数学Ⅲの微分・積分"]] },
  },
  {
    slug: "shiga", univ: "滋賀大学", order: 310,
    eigo: { minutes: 90, official: "令和8年度", who: "経済学部・データサイエンス学部", guess: true, d: [["R", "長文読解（和訳・内容説明）"], ["E", "自由英作文"]] },
    bun: { minutes: 90, official: "令和8年度", who: "経済学部ほか（6題から4題を解答）", d: [["seq", "数列と数学的帰納法"], ["coord", "式と証明・対数"], ["prob", "場合の数・統計"], ["calc", "3次関数の極値と面積"]] },
  },
  {
    slug: "narajo", univ: "奈良女子大学", order: 311,
    eigo: { minutes: 100, official: "令和8年度", who: "全学部共通", d: [["R", "英文和訳をふくむ読解"], ["T", "和文英訳"], ["R", "長文読解と日本語による内容説明"]] },
    ri: { minutes: 90, official: "令和8年度", who: "理学部・工学部", d: [["vector", "空間図形とベクトル"], ["int", "接線と面積（微分・積分）"], ["diff", "指数関数・対数関数"]] },
  },
  {
    slug: "wakayama", univ: "和歌山大学", order: 312,
    bun: { minutes: 90, who: "教育学部・観光学部", d: [["seq", "数列"], ["vector", "ベクトル"], ["prob", "確率"], ["calc", "数学Ⅱの微分・積分"]] },
    ri: { minutes: 120, who: "システム工学部", d: [["seq", "数列"], ["vector", "ベクトル"], ["prob", "確率"], ["int", "数学Ⅲの微分・積分"], ["complex", "複素数平面"]] },
  },
  {
    slug: "tottori", univ: "鳥取大学", order: 313,
    eigo: { minutes: 90, official: "令和8年度", who: "地域学部・農学部ほか", d: [["R", "長文読解"], ["R", "長文読解"], ["T", "和文英訳"], ["E", "自由英作文"]] },
    bun: { minutes: 120, official: "令和8年度", who: "地域学部・農学部生命環境農学科ほか", d: [["coord", "三角比と図形"], ["seq", "数列と整数"], ["prob", "条件付き確率"], ["vector", "ベクトル"]] },
    ri: { minutes: 120, official: "令和8年度", who: "工学部・農学部共同獣医学科ほか", d: [["vector", "円と接線・図形"], ["prob", "条件付き確率"], ["seq", "ベクトルと数列"], ["complex", "複素数"]] },
  },
  {
    slug: "shimane", univ: "島根大学", order: 314,
    eigo: { minutes: 90, who: "法文学部・人間科学部・総合理工学部ほか", d: [["R", "長文読解"], ["R", "長文読解（下線部の解釈・和訳）"], ["E", "図表を読んで英語で書く"]] },
    bun: { minutes: 90, who: "教育学部", d: [["seq", "数列"], ["prob", "場合の数・確率"], ["coord", "関数と図形"]] },
    ri: { minutes: 120, who: "総合理工学部・医学部医学科（大問数は医学科の4題）", guess: true, d: [["seq", "数列"], ["prob", "場合の数・確率"], ["int", "積分法"], ["limit", "数列の極限"]] },
  },
  {
    slug: "okayama", univ: "岡山大学", order: 315,
    eigo: { minutes: 120, who: "全学部共通", d: [["R", "長文読解"], ["R", "長文読解（日本語による内容説明）"], ["E", "グラフ・データを英語で説明する"], ["E", "意見を書く英作文"]] },
    bun: { minutes: 120, who: "経済学部・教育学部（数学5）", d: [["vector", "ベクトル"], ["prob", "確率"], ["seq", "数列"], ["coord", "図形と関数"]] },
  },
  {
    slug: "yamaguchi", univ: "山口大学", order: 316,
    eigo: { minutes: 90, who: "文系", omit: "文法・語彙の大問", d: [["R", "長文読解"], ["R", "長文読解"], ["E", "自由英作文"]] },
  },
  {
    slug: "tokushima", univ: "徳島大学", order: 317,
    eigo: { minutes: 70, who: "全学部共通", d: [["R", "長文読解（科学の記事）"], ["R", "スピーチ原稿の読解と英問英答"], ["E", "英作文（80〜100語）"]] },
    bun: { minutes: 100, who: "生物資源産業学部・理工学部夜間主", d: [["calc", "関数"], ["coord", "図形"], ["seq", "数列"], ["prob", "場合の数・確率"]] },
  },
  {
    slug: "kagawa", univ: "香川大学", order: 318,
    eigo: { minutes: 90, official: "令和8年度", who: "全学部共通", d: [["R", "長文読解（英問英答）"], ["R", "長文読解（和訳・内容説明）"], ["E", "自由英作文（100〜120語）"]] },
  },
  {
    slug: "ehime", univ: "愛媛大学", order: 318,
    ri: { minutes: 120, official: "令和7年度", who: "理学部・医学部医学科・工学部（理型）", guess: true, d: [["seq", "数列"], ["prob", "確率"], ["vector", "ベクトル"], ["diff", "微分法"], ["int", "積分法・平面上の曲線"], ["complex", "複素数平面"]] },
  },
  {
    slug: "kochi", univ: "高知大学", order: 319,
    eigo: { minutes: 100, who: "人文社会科学部 国際社会コース", omit: "整序英作文の大問", d: [["R", "長文読解"], ["K", "会話文"], ["E", "自由英作文（100語以内）"]] },
    bun: { minutes: 120, who: "教育学部", d: [["coord", "図形と方程式"], ["calc", "三次関数と接線"], ["vector", "三角関数と図形"], ["prob", "確率"]] },
  },
  {
    slug: "saga", univ: "佐賀大学", order: 320,
    ri: { minutes: 120, who: "理工学部", d: [["prob", "確率"], ["vector", "空間ベクトル"], ["int", "対数関数と積分"], ["complex", "複素数平面"]] },
  },
  {
    slug: "nagasaki", univ: "長崎大学", order: 321,
    eigo: { minutes: 100, who: "多文化社会学部・経済学部・医学部ほか", d: [["R", "長文読解"], ["R", "長文読解（英問英答）"], ["R", "長文読解（空所補充）"], ["E", "自由英作文"]] },
  },
  {
    slug: "kumamoto", univ: "熊本大学", order: 322,
    eigo: { minutes: 120, who: "全学部共通", omit: "語彙・文法の大問", d: [["R", "長文読解と日本語での内容説明"], ["R", "英語の設問に英語で答える読解"], ["E", "自由英作文"]] },
    bun: { minutes: 120, who: "教育学部ほか（数学①）", d: [["prob", "確率と期待値"], ["seq", "数学的帰納法と漸化式"], ["vector", "空間図形"], ["calc", "積分と面積"]] },
    ri: { minutes: 120, who: "理学部・工学部・薬学部ほか（数学②）", d: [["seq", "数列"], ["vector", "空間図形と軌跡"], ["int", "極限・積分"], ["prob", "確率と極限"]] },
  },
  {
    slug: "oita", univ: "大分大学", order: 323,
    eigo: { minutes: 80, official: "令和8年度", who: "医学部", d: [["R", "長文読解（言語と文化）"], ["R", "長文読解（医療）"], ["E", "英文を書く問題"]] },
    bun: { minutes: 80, official: "令和8年度", who: "経済学部", d: [["vector", "ベクトル"], ["seq", "自然数の個数と数列の和"], ["prob", "確率"]] },
    ri: { minutes: 100, official: "令和8年度", who: "理工学部", d: [["vector", "ベクトル"], ["seq", "自然数の個数と数列の和"], ["prob", "確率"], ["int", "接線・面積・回転体の体積"]] },
  },
  {
    slug: "miyazaki", univ: "宮崎大学", order: 324,
    eigo: { minutes: 60, who: "工学部", d: [["R", "研究の概要の読解"], ["K", "会話文"], ["R", "長文読解（出来事の順序）"], ["R", "記事の読解（日本語・英語での説明）"]] },
    ri: { minutes: 120, who: "工学部", d: [["limit", "極限・微分・積分の基礎"], ["diff", "曲線の極値・接線・面積"], ["prob", "確率"], ["vector", "空間ベクトル"], ["seq", "数列と数学的帰納法"]] },
  },
  {
    slug: "kagoshima", univ: "鹿児島大学", order: 325,
    eigo: { minutes: 90, who: "医学部・歯学部・教育学部ほか", omit: "文法・語法の大問", d: [["R", "長文読解"], ["R", "長文読解"], ["T", "和文英訳"], ["E", "自由英作文（100〜120語）"]] },
    bun: { minutes: 90, who: "農学部・水産学部・共同獣医学部ほか", d: [["coord", "図形と式（実際の第1問は小問集合）"], ["prob", "確率・期待値"], ["calc", "関数と図形の最大・最小"]] },
    ri: { minutes: 120, who: "医学部・歯学部・工学部・理学部ほか", d: [["vector", "ベクトル・図形（実際の第1問は小問集合）"], ["prob", "確率・期待値"], ["diff", "曲線と接線・面積"], ["int", "数学Ⅲの定積分・極限"]] },
  },
  {
    slug: "ryukyu", univ: "琉球大学", order: 326,
    eigo: { minutes: 100, official: "令和8年度", who: "全学部共通", omit: "語彙・表現の大問", d: [["R", "長文読解（日本語でまとめる）"], ["R", "長文読解（英文の配列）"], ["E", "図表を踏まえた英作文"]] },
    bun: { minutes: 60, official: "令和8年度", who: "農学部・国際地域創造学部ほか（数学乙）", d: [["seq", "整数・式の計算"], ["calc", "3次関数の極値と接線"]] },
    ri: { minutes: 120, official: "令和8年度", who: "医学部・工学部・理学部ほか（数学甲）", d: [["seq", "数列"], ["int", "数学Ⅲの積分"], ["vector", "空間ベクトル"], ["prob", "条件付き確率"]] },
  },
];

/** 一覧の並び（北から南）に使う大学の名前 */
export const KOKURITSU47_UNIVS = U.map((u) => u.univ);

const NOTE = "正確な時間・配点・出題は年度と学部でちがうので、大学の募集要項で確かめてください";

function build<K extends string>(u: Univ, kamoku: UnivExam["kamoku"], key: string, order: number, s: Sub<K>, parts: Record<K, readonly string[]>, points: (k: K) => number, groups: string[], label: string): UnivExam {
  const chunks = split(s.d.map(([k]) => k), parts);
  // 長文読解は、部品によって小問が5問の節と6問の節があるので、5問にそろえる（そろえないと、6問を求める大問に5問の節が当たって組めない）
  const daimon: PartDaimon[] = s.d.map(([k, title], i) => ({ title: `第${i + 1}問　${title}`, points: points(k), parts: chunks[i], ...(k === "R" ? { count: [5, 5] as [number, number] } : {}) }));
  const official = s.official ? `試験時間は大学の${s.official}一般選抜の学生募集要項で確かめた。` : "試験時間は大学の募集要項ではまだ確かめていない。";
  const guess = s.guess ? "大問ごとの分野は公開情報で確かめられなかったので、よく出る構成にしている。" : "";
  const omit = s.omit ? `${s.omit}は、この型では出していない。` : "";
  return fromParts({
    key,
    univ: u.univ,
    kamoku,
    tier: "国公立",
    order,
    basis: `前期日程の個別学力検査「${label}」（${s.who}。${s.minutes}分・大問${s.d.length + (s.omit ? 1 : 0)}題）の傾向を、受験情報サイトの公開情報から参考にした。${official}${guess}${omit}大問の中身は旧帝大・神戸大の型と共通の部品で、難しさは実際よりやや高めのことがある。満点はこの型のための目安。${NOTE}`,
    format: `${s.minutes}分・大問${s.d.length}題。${s.d.map(([, t]) => t.replace(/（.*?）/g, "")).join("、")}。${s.omit ? `（${s.omit}はふくまない）` : ""}`,
    minutes: s.minutes,
    groups,
    daimon,
  });
}

/** 47都道府県へ広げる分の大学別型 */
export const KOKURITSU47_EXAMS: UnivExam[] = U.flatMap((u) => {
  const out: UnivExam[] = [];
  if (u.eigo) out.push(build(u, "英語", `${u.slug}-eigo`, u.order, u.eigo, E_PARTS, (k) => E_POINTS[k], ["語彙", "文法", "技能"], "英語"));
  if (u.bun) out.push(build(u, "数学（文系）", `${u.slug}-sugaku-bun`, u.order + 100, u.bun, B_PARTS, () => 50, ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学C"], "数学（数学Ⅲをふくまない）"));
  if (u.ri) out.push(build(u, "数学（理系）", `${u.slug}-sugaku-ri`, u.order + 200, u.ri, R_PARTS, () => 50, ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学Ⅲ", "数学C"], "数学（数学Ⅲをふくむ）"));
  return out;
});
