import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { SpeakButton } from "@/components/eitango/Speak";
import { STAGES } from "@/lib/eitango/stages";
import { STAGE_DATA } from "@/lib/eitango/data";

// /learn/eitango/[stage]: 1ステージ100語の一覧 (例文つき)。ここから修行をはじめる。

const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return STAGES.filter((s) => s.open).map((s) => ({ stage: String(s.no) }));
}
export const dynamicParams = false;

function stageMeta(v: string) {
  const s = STAGES.find((x) => x.no === Number(v));
  return s && s.open ? s : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const s = stageMeta((await params).stage);
  if (!s) return {};
  const words = STAGE_DATA[s.no].slice(0, 6).map((w) => w.word).join("・");
  const url = `${SITE}/learn/eitango/${s.no}`;
  const title = `英単語2000 STAGE ${s.no}（${s.level}・No.${s.from}〜${s.to}）｜意味と例文つき｜アオハルOS`;
  const description = `大学入試の英単語 STAGE ${s.no}（${s.level}）の100語。${words}…の意味・例文・発音。カードで覚えて4択で確かめる無料の単語帳。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function StagePage({ params }: { params: Promise<{ stage: string }> }) {
  const s = stageMeta((await params).stage);
  if (!s) notFound();
  const words = STAGE_DATA[s.no];
  const prev = STAGES.find((x) => x.no === s.no - 1 && x.open);
  const next = STAGES.find((x) => x.no === s.no + 1 && x.open);
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/eitango", label: "英単語2000" }, { label: `STAGE ${s.no}` }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        AOHARU WORDS　{s.level}
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black">
        STAGE {s.no}
        <span className="ml-2 text-[15px] font-bold text-[#3A3D55]">
          No.{s.from}〜{s.to}
        </span>
      </h1>
      <a href={`/learn/eitango/play?stage=${s.no}`} className="mt-4 flex min-h-[56px] max-w-[420px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]">
        このステージを学ぶ
      </a>
      <p className="m-0 mt-2 text-[12.5px] text-[#3A3D55]">このステージの復習と、まだ見ていない単語が出てきます。</p>

      <ol className="m-0 mt-6 grid list-none gap-2 p-0 lg:grid-cols-2">
        {words.map((w) => (
          <li key={w.no} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
            <div className="flex items-center gap-2">
              <span className="w-10 flex-none text-[11.5px] font-bold text-[#5A5D73]">{w.no}</span>
              <span className="font-serif text-[20px] font-bold">{w.word}</span>
              <SpeakButton text={w.word} size={28} />
              <span className="ml-auto rounded-full border border-[#15172B] px-1.5 text-[11px] font-black">{w.pos}</span>
            </div>
            <p className="m-0 mt-1 pl-12 text-[15px] font-black">{w.ja}</p>
            <p className="m-0 mt-1 pl-12 font-serif text-[14px] leading-relaxed">{w.ex}</p>
            <p className="m-0 pl-12 text-[12.5px] text-[#3A3D55]">{w.exJa}</p>
            {w.note && <p className="m-0 mt-1 pl-12 text-[12px] text-[#3A3D55]">{w.note}</p>}
          </li>
        ))}
      </ol>

      <nav className="mt-6 flex justify-between gap-3 text-[14px] font-black">
        {prev ? <Link href={`/learn/eitango/${prev.no}`}>← STAGE {prev.no}</Link> : <span />}
        {next ? <Link href={`/learn/eitango/${next.no}`}>STAGE {next.no} →</Link> : <Link href="/learn/eitango">英単語2000のトップへ</Link>}
      </nav>
    </LearnShell>
  );
}
