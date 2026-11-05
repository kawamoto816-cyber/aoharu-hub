import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { JugyoPlayer, type PlayerScene } from "@/components/jugyo/JugyoPlayer";
import { KoeSetsumei } from "@/components/koe/KoeSetsumei";
import { plain } from "@/components/lecture/Rich";
import { LESSONS, JUGYO_HOME, getLesson } from "@/lib/jugyo";
import { JUGYO_CREDIT, jugyoAudio, jugyoPauseAudio } from "@/lib/jugyo/audio";
import { getLecture, lectureHref, lectureUnitInfo } from "@/lib/lecture";
import { getUnitMoshi, unitMoshiHref } from "@/lib/moshi/unit";
import { getOshieru, oshieruHref } from "@/lib/oshieru";
import { isLowUnit } from "@/lib/naze";

// /learn/jugyo/<単元id>：止まる授業（動画型・試作）。試作なので noindex・sitemap に入れない。LecturePage にはまだ入口を置かない。

export function generateStaticParams() {
  return LESSONS.map((l) => ({ unit: l.unitId }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const l = getLesson((await params).unit);
  if (!l) return {};
  return { title: `${plain(l.title)}｜止まる授業（試作）｜アオハルラーン`, robots: { index: false, follow: false } };
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  const unit = (await params).unit;
  const lesson = getLesson(unit);
  const lec = getLecture(unit);
  if (!lesson || !lec) notFound();
  const info = lectureUnitInfo(unit);
  // 音声ファイルがあるせりふ・問題の読み上げだけ src を渡す（無ければプレイヤーが仮の声で読む）
  const have = (src: string) => (existsSync(join(process.cwd(), "public", src)) ? src : null);
  const scenes: PlayerScene[] = lesson.scenes.map((s) => {
    if (s.kind === "chapter") return s;
    if (s.kind === "pause") {
      const a = jugyoPauseAudio(s);
      const clip = (c: NonNullable<typeof a.reply>) => ({ text: c.display, speech: c.text, src: have(c.src) });
      return { kind: "pause", question: s.question, choices: a.shown, answer: s.answer, why: s.why, source: s.source, ask: clip(a.ask), reply: a.reply ? clip(a.reply) : null };
    }
    const a = jugyoAudio(s);
    return { ...s, speech: a.text, src: have(a.src) };
  });
  const reveal = lec.sections.find((s) => s.reveal)?.reveal;
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: JUGYO_HOME, label: "止まる授業（試作）" }, { label: info?.name ?? unit }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        止まる授業（試作）{info && `　${info.level}・${info.subject}・${info.group}`}
      </p>
      <h1 className="m-0 mt-1 text-[24px] font-black leading-tight">{plain(info?.name ?? unit)}</h1>
      <div className="mt-4">
        <JugyoPlayer
          unit={unit}
          title={lesson.title}
          cast={lesson.cast}
          scenes={scenes}
          sections={lec.sections.map((s) => ({ heading: s.heading, body: s.body, figure: s.figure }))}
          mission={lec.mission}
          mystery={lec.mystery}
          reveal={reveal}
          credit={JUGYO_CREDIT}
          links={{
            lecture: lectureHref(unit),
            moshi: getUnitMoshi(unit) ? unitMoshiHref(unit) : undefined,
            oshieru: getOshieru(unit) ? oshieruHref(unit) : undefined,
          }}
        />
      </div>
      <section id="jugyo-koe" aria-labelledby="jugyo-koe-h" className="mx-auto mt-8 max-w-[560px] scroll-mt-4">
        <h2 id="jugyo-koe-h" className="m-0 text-[17px] font-black">授業のあとで：あなたが先生役</h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">授業で聞いたことを、こんどは自分のことばで説明してみましょう。</p>
        <KoeSetsumei unit={unit} low={isLowUnit(unit)} className="mt-3" />
        <p className="m-0 mt-4 text-[12px] text-[#3A3D55]">
          内容は<Link href={lectureHref(unit)} className="font-bold text-[#1533B8]">図解レクチャー</Link>の本文から。声：{JUGYO_CREDIT}（音声ファイルが無いせりふは、ブラウザの仮の声で読みます）
        </p>
      </section>
    </LearnShell>
  );
}
