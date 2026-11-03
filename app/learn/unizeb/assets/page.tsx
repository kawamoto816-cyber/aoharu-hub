import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { AssetsPage, type EnshuMeta } from "@/components/unizeb/AssetsPage";
import { uzCrumbs } from "@/components/unizeb/parts";
import { UZ_CARDS, UZ_ENSHU } from "@/lib/unizeb";

// /learn/unizeb/assets：スキルアセット（合格した演習・カードの答案）。保存は lib/unizeb/client.ts（API がないあいだは端末の中）。
const URL = "https://app.bluespring.co.jp/learn/unizeb/assets";
const TITLE = "スキルアセット｜合格した答案の記録｜ゼロワンOSユース版｜アオハルOS";
const DESC = "合格した演習とスキルカードの答案を、日付・Lv・使ったスキル・点数つきで残す記録。志望理由書・ガクチカ・ESに使える。";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, robots: { index: false } };

export default function Page() {
  const enshu: EnshuMeta[] = UZ_ENSHU.map((e) => ({
    id: e.id,
    variants: e.variants,
    tasks: e.tasks.map((t) => ({ no: t.no, prompt: t.prompt, type: t.type, options: t.options, unit: t.calc?.unit })),
  }));
  const cards = Object.fromEntries(UZ_CARDS.map((c) => [c.id, c.name]));
  return (
    <LearnShell narrow crumbs={uzCrumbs("スキルアセット")}>
      <AssetsPage enshu={enshu} cards={cards} />
    </LearnShell>
  );
}
