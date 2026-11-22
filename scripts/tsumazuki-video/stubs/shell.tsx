// 動画用の LearnShell：ヘッダー（サービス名・登録ボタン）とパンくずを出さず、方眼紙の背景と幅だけ同じにする。
import type { ReactNode } from "react";

const paper = "bg-[#F7F6F1] [background-image:linear-gradient(#E4E2D8_1px,transparent_1px),linear-gradient(90deg,#E4E2D8_1px,transparent_1px)] [background-size:28px_28px]";

export function LearnShell({ children }: { crumbs?: unknown; children: ReactNode; narrow?: boolean; homeHref?: string }) {
  return (
    <main className={`${paper} min-h-screen text-[#15172B]`}>
      <div className="mx-auto max-w-[560px] px-4 pb-16 pt-5">{children}</div>
    </main>
  );
}
