import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { unitsOfExam } from "@/lib/kakomon/units";
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
  "共通テスト 過去問チャレンジ｜先に本番を解いて逆算する「逆転勉強法」｜アオハルラーン｜アオハルOS";
const DESC =
  "大学入学共通テストの過去問（令和6〜8年度の本試験・追・再試験）を先に解き、公式の正解と配点で採点。落とした点を単元に分け、どこまでさかのぼればわかるかを探して、1つずつつぶしていく「逆転勉強法」の作戦表が出ます（令和7・8年度の全科目）。";

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
    gyakuten: !!unitsOfExam(e.id),
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
      <section
        aria-label="逆転勉強法"
        className="mb-4 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBEA] p-4 sm:p-5"
      >
        <p className="m-0 text-[12px] font-black tracking-wider text-[#1533B8]">
          逆転勉強法
        </p>
        <h2 className="m-0 mt-0.5 text-[18px] font-black">
          先にラスボスを解いて、わからないところから逆算する
        </h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          ふつうの勉強は、階段をのぼるように積み上げて、最後に試験問題を解きます。逆転勉強法は順番が逆です。最初に本番の問題を解き、解けなかったところだけを、わかるところまでさかのぼって、しらみつぶしにしていきます。
        </p>
        <ol className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-2">
          {[
            [
              "ラスボスを先に解く",
              "本番の過去問を、今の力のまま時間を計って解く。",
            ],
            [
              "わからないところを抜き出す",
              "落とした点を、問われていた単元に分ける。点の大きい単元から。",
            ],
            [
              "どこまでさかのぼるか探す",
              "3問ずつたしかめながら、前の学年の単元までたどって根っこを見つける。",
            ],
            [
              "上りなおして、もう一度ラスボスへ",
              "根っこから学びなおし、つぶした単元に印をつけ、同じ過去問に再挑戦する。",
            ],
          ].map(([t, b], i) => (
            <li key={t} className="flex gap-2 rounded-[10px] bg-white p-2.5">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#15172B] text-[12px] font-black text-white">
                {i + 1}
              </span>
              <span>
                <b className="block text-[14px]">{t}</b>
                <span className="text-[12.5px] leading-relaxed text-[#3A3D55]">
                  {b}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <p className="m-0 mt-2 text-[12px] leading-relaxed text-[#5A5D75]">
          作戦表（単元への分け方とさかのぼり）は、令和7・8年度の本試験・追・再試験の全科目で出ます。令和6年度は旧課程のため採点までです。
        </p>
      </section>
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
      <p className="m-0 mt-3 text-[13px] leading-relaxed text-[#3A3D55]">
        国公立の2次試験は、
        <Link href="/learn/niji" className="font-bold text-[#1533B8]">
          2次試験の過去問チャレンジ
        </Link>
        （試し：京都大学 2026年度 物理・化学）へ。
      </p>
    </LearnShell>
  );
}
