// ゼロワンOSユース版（ユニゼブ）の教科書データの入口。
import { UZ_CARDS } from "./cardIndex";
import { UZ_LECTURES, UZ_DEN, UZ_CASES, UZ_SHIRYO, UZ_ENSHU, UZ_EP as UZ_EP_FILES } from "./registry";

/** ゼロイチ・エピソード（設計表の no の順） */
const UZ_EP = [...UZ_EP_FILES].sort((a, b) => a.no - b.no);

export { UZ_CARDS, UZ_LECTURES, UZ_DEN, UZ_CASES, UZ_SHIRYO, UZ_ENSHU, UZ_EP };

/** 8つの部門（id の z1〜z8） */
export const UZ_DEPTS = ["社長室・人事", "情報システム", "開発部", "法務・経営企画", "マーケティング・営業", "経理・財務", "広報・クリエイティブ", "PMO・総務"] as const;

/** 位階（Lv1〜3 / 4〜9 / 10〜15） */
export const UZ_RANKS = [
  { no: "I", label: "事業の種", from: 1, to: 3 },
  { no: "II", label: "事業計画書 v1", from: 4, to: 9 },
  { no: "III", label: "事業計画書 v2＋部門AI", from: 10, to: 15 },
] as const;

export const deptLabel = (dept: string) => dept.replace(/AI$/, "");
export const cardInfo = (id: string) => UZ_CARDS.find((c) => c.id === id.toLowerCase());
export const lectureUnit = (id: string) => `unizeb-${id.toLowerCase()}`;
export const getUzLecture = (id: string) => UZ_LECTURES.find((l) => l.unit === lectureUnit(id));
export const getDen = (id: string) => UZ_DEN.find((d) => d.id === id);
export const getCase = (id: string) => UZ_CASES.find((c) => c.id === id);
export const getEnshu = (id: string) => UZ_ENSHU.find((e) => e.id === id);
export const getEp = (id: string) => UZ_EP.find((e) => e.id === id);
