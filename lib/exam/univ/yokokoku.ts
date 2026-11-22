import type { UnivExam } from "./types";
import { PARTS, fromParts } from "./parts";

// 「型の部品」方式の大学別型 (lib/exam/univ/parts.ts)。大問の中身は旧帝大・神戸大の型と共通で、
// 時間・大問の並び・配点・題だけをこの大学の傾向に合わせている。
// 形式は受験情報サイトの公開情報（下の参考）を参考にした。正確な時間・配点は各大学の募集要項で確かめること。

// 横浜国立大学型 英語（国公立・2次）。参考: https://jyuke-labo.com/daigakujyukentaisaku/yokohamakokuritsudaigaku/eigo/
export const U_YOKOKOKU_EIGO: UnivExam = fromParts({
  key: "yokokoku-eigo",
  univ: "横浜国立大学",
  kamoku: "英語",
  tier: "国公立",
  order: 120,
  basis: "前期日程の個別学力検査「英語」（文理共通・90分・大問4題）の傾向を参考。配点は学部で異なるため150点満点にした。各大問は旧帝大・神戸大の型と共通の部品で組んでいる",
  format: "90分・大問4題。内容説明が中心の長文読解2題、会話文、自由英作文。",
  minutes: 90,
  groups: ["語彙", "文法", "技能"],
  daimon: [
    { title: "第1問　長文読解（論説：内容説明）", points: 50, parts: ["hokudai-eigo:1", "tohoku-eigo:1", "nagoya-eigo:1", "kyushu-eigo:1", "kobe-eigo:1"], count: [5, 5] },
    { title: "第2問　長文読解（論説：内容説明・要旨）", points: 50, parts: ["hokudai-eigo:2", "tohoku-eigo:2", "nagoya-eigo:2", "kyushu-eigo:2", "kobe-eigo:2"], count: [5, 5] },
    { title: "第3問　会話文", points: 25, parts: PARTS.eigoTalk },
    { title: "第4問　自由英作文", points: 25, parts: PARTS.eigoEssay },
  ],
});

// 横浜国立大学型 数学（文系）（国公立・2次）。参考: https://jyuke-labo.com/daigakujyukentaisaku/yokohamakokuritsudaigaku/suugaku/
export const U_YOKOKOKU_SUGAKU_BUN: UnivExam = fromParts({
  key: "yokokoku-sugaku-bun",
  univ: "横浜国立大学",
  kamoku: "数学（文系）",
  tier: "国公立",
  order: 220,
  basis: "前期日程の個別学力検査「数学」文系（経済・経営など・90分・大問3題・記述式）の傾向を参考。配点は学部で異なるため150点満点にした。大問は旧帝大・神戸大の型と共通の部品で組んでいる",
  format: "90分・大問3題のすべて記述式。微分・積分、ベクトル、数列・確率を小問の誘導で段階的に解く。",
  minutes: 90,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学C"],
  daimon: [
    { title: "第1問　微分・積分", points: 50, parts: PARTS.bunCalc },
    { title: "第2問　ベクトル・図形", points: 50, parts: PARTS.bunVector },
    { title: "第3問　数列・確率", points: 50, parts: [...PARTS.bunSeq, ...PARTS.bunProb] },
  ],
});

// 横浜国立大学型 数学（理系）（国公立・2次）。参考: https://jyuke-labo.com/daigakujyukentaisaku/yokohamakokuritsudaigaku/suugaku/
export const U_YOKOKOKU_SUGAKU_RI: UnivExam = fromParts({
  key: "yokokoku-sugaku-ri",
  univ: "横浜国立大学",
  kamoku: "数学（理系）",
  tier: "国公立",
  order: 320,
  basis: "前期日程の個別学力検査「数学」理系（理工・都市科学など・150分・大問5題・記述式）の傾向を参考。配点は学部で異なるため200点満点にした。大問は旧帝大・神戸大の型と共通の部品で組んでいる",
  format: "150分・大問5題のすべて記述式。微分・積分を中心に、ベクトル、数列・確率、複素数平面。",
  minutes: 150,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学Ⅲ", "数学C"],
  daimon: [
    { title: "第1問　微分法とその応用", points: 40, parts: PARTS.riDiff },
    { title: "第2問　積分法とその応用", points: 40, parts: PARTS.riInt },
    { title: "第3問　ベクトル・空間図形", points: 40, parts: PARTS.riVector },
    { title: "第4問　数列・確率", points: 40, parts: [...PARTS.riSeq, ...PARTS.riProb] },
    { title: "第5問　複素数平面", points: 40, parts: PARTS.riComplex },
  ],
});
