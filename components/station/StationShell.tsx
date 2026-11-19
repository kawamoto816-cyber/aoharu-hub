import type { ReactNode } from "react";
import { LearnShell } from "@/components/learn/LearnShell";
import { StationNav } from "./StationNav";

// ラーニングステーションの各ページの外枠：まなぶの外枠＋駅の中の案内（部屋の切りかえ）＋試作の注意
export function StationShell({ here, children }: { here?: string; children: ReactNode }) {
  const crumbs = [{ href: "/learn", label: "まなぶ" }, { href: "/station", label: "ラーニングステーション" }, ...(here ? [{ label: here }] : [])];
  return (
    <LearnShell crumbs={here ? crumbs : crumbs.slice(0, 1).concat({ label: "ラーニングステーション" })}>
      <p className="m-0 mb-3 rounded-[10px] border border-dashed border-[#C9A400] bg-[#FFF8D6] px-3 py-2 text-[12px] font-bold leading-relaxed text-[#5A4A00]">
        試作です。会員権・登壇権・コインはためしに動かせますが、お金はかかりません。記録はこのブラウザにだけ残ります。サークルの仲間や先生役は見本のデータ（架空のニックネーム）です。
      </p>
      <StationNav />
      <div className="mt-4">{children}</div>
    </LearnShell>
  );
}
