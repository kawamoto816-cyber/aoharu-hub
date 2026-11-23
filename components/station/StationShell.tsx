import Link from "next/link";
import type { ReactNode } from "react";
import { LearnShell } from "@/components/learn/LearnShell";
import { StationNav } from "./StationNav";

// ラーニングステーションの各ページの外枠：まなぶの外枠＋駅の中の案内（部屋の切りかえ）＋試作の注意
// 注意書きは「この画面は試作（お金はかからない）」と「学習便だけは実際の有料モニター」を分けて書く。
// notice を渡すと、試作の注意のかわりにそれを出す（販売中の直前コースは試作ではないので、試作の注意を出さない）。
export function StationShell({ here, children, notice }: { here?: string; children: ReactNode; notice?: ReactNode }) {
  const crumbs = [{ href: "/learn", label: "まなぶ" }, { href: "/station", label: "ラーニングステーション" }, ...(here ? [{ label: here }] : [])];
  return (
    <LearnShell crumbs={here ? crumbs : crumbs.slice(0, 1).concat({ label: "ラーニングステーション" })}>
      {notice ?? (
      <p className="m-0 mb-3 rounded-[10px] border border-dashed border-[#C9A400] bg-[#FFF8D6] px-3 py-2 text-[12px] font-bold leading-relaxed text-[#5A4A00]">
        この画面は試作です。サークル・教壇・格付け・コインはためしに動かせますが、お金はかかりません。記録はこのブラウザにだけ残ります。仲間や先生役、授業や点数は見本のデータ（架空のニックネーム）です。
        <span className="mt-1 block text-[#15172B]">
          ただし「アオハル 学習便」は試作ではありません。実際に参加費をいただく試験運用（有料モニター）で、保護者の方のお申し込みが必要です。
          <Link href="/station/gakushubin" className="ml-1 font-black text-[#1533B8]">保護者の方へのご案内 →</Link>
        </span>
      </p>
      )}
      <StationNav />
      <div className="mt-4">{children}</div>
    </LearnShell>
  );
}
