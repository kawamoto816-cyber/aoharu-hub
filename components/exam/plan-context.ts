"use client";

import { createContext, useContext } from "react";
import type { ExamPlan } from "@/lib/exam/access";

// 入試モードの本番画面で、いまのプランを結果の部品 (ExamResultPanel) に渡す。ExamGate が値を入れる。
// null＝まだ分からない・判定できなかった (そのときは止めずに全部見せる)。
export const ExamPlanContext = createContext<ExamPlan | null>(null);

export const useExamPlan = () => useContext(ExamPlanContext);
