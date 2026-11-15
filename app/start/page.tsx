import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { StartPage, type StartData, type StartLesson } from "@/components/start/StartPage";
import { plain } from "@/components/lecture/Rich";
import { JUGYO_HOME, jugyoHref, jugyoSpan, UNITS } from "@/lib/jugyo";
import { LECTURES, lectureUnitInfo } from "@/lib/lecture";

// /start：はじめての人の入口 (ABC テスト。lib/start/ab.ts)。塾とは名乗らず、授業・演習・模試が無料でそろうことを見せて無料登録へ。
// ?v=a|b|c で案を確かめられる (数えない)。

const URL = "https://app.bluespring.co.jp/start";
const TITLE = "塾に行く前に、まずここで｜授業・問題演習・模試が無料｜アオハルOS";
const DESC = "小学校から高校まで、10分の「止まる授業」と図解レクチャー、単元模試、公立高校入試・共通テストの模試がスマホで。登録なしで始められ、無料登録で模試や作文の添削も。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

// 日付で変わる「きょうの時間割」のために、1時間ごとに作りなおす
export const revalidate = 3600;

const ORDER: Record<string, string[]> = {
  小学校: ["国語", "算数", "理科", "社会"],
  中学校: ["国語", "数学", "英語", "理科"],
  高校: ["数学", "英語", "地理歴史", "国語"],
};

function today(): StartData["today"] {
  const jst = new Date(Date.now() + 9 * 3600_000);
  const day = Math.floor(Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate()) / 86_400_000);
  const out = {} as StartData["today"];
  for (const lv of Object.keys(ORDER) as (keyof StartData["today"])[]) {
    out[lv] = ORDER[lv]
      .map((subject, k) => {
        const pool = UNITS.filter((u) => {
          const i = lectureUnitInfo(u);
          return i?.level === lv && i.subject === subject && !u.includes("shoin");
        });
        if (!pool.length) return null;
        const u = pool[(day * 7 + k * 13) % pool.length];
        const i = lectureUnitInfo(u)!;
        return { href: jugyoHref(u), subject: `${i.subject}・${i.group}`, name: plain(i.name), minutes: jugyoSpan(u)?.minutes ?? 8 } satisfies StartLesson;
      })
      .filter((x): x is StartLesson => !!x);
  }
  return out;
}

export default async function Start({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const data: StartData = { jugyo: UNITS.length, lectures: LECTURES.length, today: today(), sample: JUGYO_HOME };
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "はじめての方へ" }]}>
      <StartPage data={data} preview={v} />
    </LearnShell>
  );
}
