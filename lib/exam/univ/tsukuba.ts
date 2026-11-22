import type { UnivExam } from "./types";
import { PARTS, fromParts } from "./parts";

// 「型の部品」方式の大学別型 (lib/exam/univ/parts.ts)。大問の中身は旧帝大・神戸大の型と共通で、
// 時間・大問の並び・配点・題だけをこの大学の傾向に合わせている。
// 形式は受験情報サイトの公開情報（下の参考）を参考にした。正確な時間・配点は各大学の募集要項で確かめること。

// 筑波大学型 英語（国公立・2次）。参考: https://jyuke-labo.com/daigakujyukentaisaku/tsukubadaigaku/eigo/
export const U_TSUKUBA_EIGO: UnivExam = fromParts({
  key: "tsukuba-eigo",
  univ: "筑波大学",
  kamoku: "英語",
  tier: "国公立",
  order: 122,
  basis: "前期日程の個別学力検査「英語」（120分・大問3題・記述式）の傾向を参考。配点は学群・学類で異なるため200点満点にした。各大問は旧帝大・神戸大の型と共通の部品で組んでいる",
  format: "120分・大問3題のすべて記述式。長文読解2題と自由英作文（100語程度）。",
  minutes: 120,
  groups: ["語彙", "文法", "技能"],
  daimon: [
    { title: "第1問　長文読解（論説）", points: 80, parts: ["hokudai-eigo:1", "tohoku-eigo:1", "nagoya-eigo:1", "kyushu-eigo:1", "kobe-eigo:1"], count: [5, 5] },
    { title: "第2問　長文読解（論説）", points: 80, parts: ["hokudai-eigo:2", "tohoku-eigo:2", "nagoya-eigo:2", "kyushu-eigo:2", "kobe-eigo:2"], count: [5, 5] },
    { title: "第3問　自由英作文", points: 40, parts: PARTS.eigoEssay },
  ],
});
