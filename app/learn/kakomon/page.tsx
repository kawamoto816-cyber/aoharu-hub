import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import {
  KakomonPicker,
  type PickerExam,
} from "@/components/kakomon/KakomonPicker";
import {
  DNC_KAKOMON_PAGE,
  KAKOMON,
  KAKOMON_KINDS,
  KAKOMON_YEARS,
} from "@/lib/kakomon/data";

// /learn/kakomon: 過去問チャレンジ。年度・試験・科目をえらび、大学入試センターの問題を見て解き、マークシートに入れて採点する。
// 大学入試センターへのリンクと、正解・配点の利用は、2026-11-24 に代表がセンターに確認ずみ。docs/kakomon-challenge.md

const URL = "https://app.bluespring.co.jp/learn/kakomon";
const TITLE =
  "共通テスト 過去問マークシート（令和6〜8年度）｜時間を計って解き、公式の配点で採点｜アオハルラーン｜アオハルOS";
const DESC =
  "大学入学共通テストの過去問（令和6〜8年度の本試験・追・再試験）を、大学入試センターの問題を見ながら時間を計って解き、マークシートに答えを入れると、公式の正解と配点で採点します。国語・数学・英語（リーディング・リスニング）・情報Ⅰ・理科・地理歴史・公民。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default async function KakomonHomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;
  const exams: PickerExam[] = KAKOMON.map((e) => ({
    id: e.id,
    year: e.year,
    kind: e.kind,
    subject: e.subject,
    minutes: e.minutes,
    total: e.total,
    daimon: e.daimon.length,
    pdf: e.pdf,
    ...(e.audio ? { audio: e.audio } : {}),
    note: [
      e.select
        ? `第${e.select.from[0]}問〜第${e.select.from[e.select.from.length - 1]}問は${e.select.count}問を選んで解きます。`
        : "",
      e.minutes === 30 && e.moshi.endsWith("b")
        ? "本番は基礎の2科目を合わせて60分です。ここでは1科目を30分で解きます。"
        : "",
    ].join(""),
  }));
  return (
    <LearnShell
      narrow
      crumbs={[
        { href: "/learn", label: "まなぶ" },
        { label: "過去問チャレンジ" },
      ]}
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        高校向け・共通テスト
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black">過去問チャレンジ</h1>
      <p className="mb-4 mt-2 text-[15px] leading-relaxed text-[#3A3D55]">
        本物の共通テストを、本番と同じ時間で解くためのマークシートです。令和6〜8年度の本試験と追・再試験、
        {exams.length}の試験に対応しています。
      </p>
      <KakomonPicker
        exams={exams}
        years={KAKOMON_YEARS}
        kinds={KAKOMON_KINDS}
        initial={typeof id === "string" ? id : undefined}
      />
      <p className="m-0 mt-5 text-[13px] leading-relaxed text-[#3A3D55]">
        問題・正解は
        <a
          href={DNC_KAKOMON_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#1533B8]"
        >
          大学入試センターウェブサイト「過去3年分の試験問題」
        </a>
        で公開されているものです。過去問ではない練習は、
        <Link href="/learn/kyotsu-moshi" className="font-bold text-[#1533B8]">
          共通テスト模試
        </Link>
        （オリジナルの問題・解説つき）へ。
      </p>
    </LearnShell>
  );
}
