import type { KakomonExam } from "./types";
import EXAMS from "./exams.json";

// 共通テストの過去問 (令和6〜8年度の本試験・追・再試験) の正解と配点。
// 大学入試センターウェブサイトの「正解」の PDF から、表の罫線と文字の位置で読み取って作った (2026-11-24)。
// 「＊」「又は」「部分点」などの注は、PDF の注を読んで手で入れた。読み取りの方法と注の一覧は docs/kakomon-challenge.md。
// 問題文は入れていない。検算は scripts/check-kakomon.ts。
// 令和6年度の数学 (旧課程の式で答える形) と、地理総合／歴史総合／公共、旧課程の A 科目・簿記・情報関係基礎は入れていない。

/** 大学入試センターへのリンクと、正解・配点の利用 (2026-11-24 代表がセンターに確認し OK) */
export const DNC_LINK_OK = true;
export const DNC_NAME = "大学入試センター";
export const DNC_KAKOMON_PAGE = "https://www.dnc.ac.jp/kyotsu/kakomondai/";
export const KAKOMON_CHECKED = "2026-11-24";

export const KAKOMON = EXAMS as KakomonExam[];

export function getKakomon(id: string): KakomonExam | undefined {
  return KAKOMON.find((e) => e.id === id);
}

/** 選ぶ画面に並べる順 */
export const KAKOMON_YEARS = ["令和8年度", "令和7年度", "令和6年度"];
export const KAKOMON_KINDS = ["本試験", "追・再試験"];
