import type { UnivExam } from "./types";
import { PARTS, fromParts } from "./parts";

// 「型の部品」方式の大学別型 (lib/exam/univ/parts.ts)。大問の中身は旧帝大・神戸大の型と共通で、
// 時間・大問の並び・配点・題だけをこの大学の傾向に合わせている。
// 形式は受験情報サイトの公開情報（下の参考）を参考にした。正確な時間・配点は各大学の募集要項で確かめること。

// 千葉大学型 英語（国公立・2次）。参考: https://jyuke-labo.com/daigakujyukentaisaku/chibadaigaku/eigo/
export const U_CHIBA_EIGO: UnivExam = fromParts({
  key: "chiba-eigo",
  univ: "千葉大学",
  kamoku: "英語",
  tier: "国公立",
  order: 119,
  basis: "前期日程の個別学力検査「英語」（80分・大問3題）の傾向を参考。科目別の配点は公表されていないため150点満点にした。長文読解と自由英作文は、旧帝大・神戸大の型と共通の部品で組んでいる",
  format: "80分・大問3題。英作文1題と、内容説明・英文和訳が中心の長文読解2題。",
  minutes: 80,
  groups: ["語彙", "文法", "技能"],
  daimon: [
    { title: "第1問　自由英作文", points: 30, parts: PARTS.eigoEssay },
    { title: "第2問　長文読解（論説：内容説明・和訳）", points: 60, parts: ["hokudai-eigo:1", "tohoku-eigo:1", "nagoya-eigo:1", "kyushu-eigo:1", "kobe-eigo:1"], count: [5, 5] },
    { title: "第3問　長文読解（論説：内容説明・要旨）", points: 60, parts: ["hokudai-eigo:2", "tohoku-eigo:2", "nagoya-eigo:2", "kyushu-eigo:2", "kobe-eigo:2"], count: [5, 5] },
  ],
});

// 千葉大学型 数学（文系）（国公立・2次）。参考: https://jyuke-labo.com/daigakujyukentaisaku/chibadaigaku/suugaku/
export const U_CHIBA_SUGAKU_BUN: UnivExam = fromParts({
  key: "chiba-sugaku-bun",
  univ: "千葉大学",
  kamoku: "数学（文系）",
  tier: "国公立",
  order: 219,
  basis: "前期日程の個別学力検査「数学」文系（80分・大問3題・記述式）の傾向を参考。配点は公表されていないため150点満点にした。大問は旧帝大・神戸大の型と共通の部品で組んでいる",
  format: "80分・大問3題のすべて記述式。よく出る微分・積分、数列、確率を、(1)〜(3) の誘導で解き進める。",
  minutes: 80,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学C"],
  daimon: [
    { title: "第1問　微分・積分", points: 50, parts: PARTS.bunCalc },
    { title: "第2問　数列・整数", points: 50, parts: PARTS.bunSeq },
    { title: "第3問　場合の数・確率", points: 50, parts: PARTS.bunProb },
  ],
});
