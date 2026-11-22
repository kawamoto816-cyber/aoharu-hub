import type { UnivExam } from "./types";
import { PARTS, fromParts } from "./parts";

// 「型の部品」方式の大学別型 (lib/exam/univ/parts.ts)。大問の中身は旧帝大・神戸大の型と共通で、
// 時間・大問の並び・配点・題だけをこの大学の傾向に合わせている。
// 形式は受験情報サイトの公開情報（下の参考）を参考にした。正確な時間・配点は各大学の募集要項で確かめること。

// 金沢大学型 数学（文系）（国公立・2次）。参考: https://jyuke-labo.com/daigakujyukentaisaku/kanazawadaigaku/suugaku/
export const U_KANADAI_SUGAKU_BUN: UnivExam = fromParts({
  key: "kanadai-sugaku-bun",
  univ: "金沢大学",
  kamoku: "数学（文系）",
  tier: "国公立",
  order: 222,
  basis: "前期日程の個別学力検査「数学」文系（人間社会学域など・90分・大問3題・記述式）の傾向を参考。配点は学類で異なるため150点満点にした。大問は旧帝大・神戸大の型と共通の部品で組んでいる",
  format: "90分・大問3題のすべて記述式。微分・積分がよく出て、ベクトル・数列も。証明をふくむ問題が多い。",
  minutes: 90,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学C"],
  daimon: [
    { title: "第1問　微分・積分", points: 50, parts: PARTS.bunCalc },
    { title: "第2問　ベクトル・図形", points: 50, parts: PARTS.bunVector },
    { title: "第3問　数列・整数", points: 50, parts: PARTS.bunSeq },
  ],
});

// 金沢大学型 数学（理系）（国公立・2次）。参考: https://jyuke-labo.com/daigakujyukentaisaku/kanazawadaigaku/suugaku/
export const U_KANADAI_SUGAKU_RI: UnivExam = fromParts({
  key: "kanadai-sugaku-ri",
  univ: "金沢大学",
  kamoku: "数学（理系）",
  tier: "国公立",
  order: 322,
  basis: "前期日程の個別学力検査「数学」理系（理工学域など・120分・大問4題・記述式）の傾向を参考。配点は学類で異なるため200点満点にした。大問は旧帝大・神戸大の型と共通の部品で組んでいる",
  format: "120分・大問4題のすべて記述式。微分・積分を中心に、数列・確率、複素数平面・ベクトル。証明・図示が多い。",
  minutes: 120,
  groups: ["数学Ⅰ", "数学A", "数学Ⅱ", "数学B", "数学Ⅲ", "数学C"],
  daimon: [
    { title: "第1問　微分法とその応用", points: 50, parts: PARTS.riDiff },
    { title: "第2問　積分法とその応用", points: 50, parts: PARTS.riInt },
    { title: "第3問　数列・確率", points: 50, parts: [...PARTS.riSeq, ...PARTS.riProb] },
    { title: "第4問　複素数平面・ベクトル", points: 50, parts: [...PARTS.riComplex, ...PARTS.riVector] },
  ],
});
