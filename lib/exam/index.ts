// 試験モード (入試モード・共通テストモード・テスト放題)。サーバー側で使う (組み立ては全データを読む)。
// クライアントの部品からは lib/exam/modes (説明・URL) と lib/exam/results (端末の記録) だけを import する。
export * from "./types";
export * from "./modes";
export { assemble, availableCount, buildExamRound, examSpec, questionCountByUnit, scopeUnits, subjectNameOf, unitLoc, type ExamBuild, type Shortage } from "./build";
