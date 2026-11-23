import type { Metadata } from "next";
import { BinRide } from "@/components/station/BinRide";

// /station/gakushubin/ride：学習便の生徒用ページ（ログインした人）。
// 今日の便に乗車（チェックイン）し、「今日やること」を宣言し、便の進行を見ながら学習して、最後に説明とふり返りを入れて下車する。
// 状態はサーバーに置く（components/station/BinRide が /api/station/bin から取り直す）ので、閉じて戻っても続きから始まる。
export const metadata: Metadata = {
  title: "乗車する｜アオハル 学習便",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BinRide />;
}
