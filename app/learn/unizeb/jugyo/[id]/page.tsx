import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import type { PlayerScene } from "@/components/jugyo/JugyoPlayer";
import { JugyoCastPicker, type CastVariant } from "@/components/jugyo/JugyoCastPicker";
import { plain } from "@/components/lecture/Rich";
import { UzLocked } from "@/components/unizeb/Locked";
import { UZ_HOME, uzCrumbs } from "@/components/unizeb/parts";
import { castCredit, jugyoAudio, jugyoPauseAudio } from "@/lib/jugyo/audio";
import type { Lesson } from "@/lib/jugyo/types";
import { uzJugyoSrc } from "@/lib/jugyo/uz";
import { UZ_JUGYO_IDS, getUzLessons, uzJugyoSpan } from "@/lib/jugyo/uz/lessons";
import { cardInfo, deptLabel, getUzLecture } from "@/lib/unizeb";
import { canReadLecture } from "@/lib/unizeb/access";
import { serverPlan } from "@/lib/unizeb/server";

// /learn/unizeb/jugyo/<カードid>：ゼロワンOSユース版の図解レクチャーを「止まる授業」で（台本は lib/jugyo/uz）。
// 見せる範囲はレクチャーと同じ（Lv1〜3 はだれでも、Lv4 以降は Pro・Max）。
// 検索には Lv1〜3 だけを出す（2026-11-08 代表の判断）。Lv4 以降は Pro・Max 限定なので出さない。
// 一覧（/learn/jugyo）と sitemap への追加は本体側（lib/jugyo/uz/lessons.ts の UZ_JUGYO_PUBLIC_IDS・uzJugyoPublicPaths を使う）。
// 音声は public/audio/jugyo/uz/<キー>.mp3（scripts/jugyo-tts.ts が作る）。無いせりふはブラウザの仮の声で読む。

export function generateStaticParams() {
  return UZ_JUGYO_IDS.map((id) => ({ id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = cardInfo(id);
  const span = uzJugyoSpan(id);
  if (!c || !span) return {};
  return {
    title: `${c.name}の授業（Lv${c.lv}）｜止まる授業｜ゼロワンOSユース版｜アオハルOS`,
    description: `起業の教科書「${c.name}」を、2人のキャラが図を見ながら話す授業で。約${span.minutes}分・とちゅうで${span.stops}回止まって問題。`,
    robots: { index: c.lv <= 3, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessons = getUzLessons(id);
  const lec = getUzLecture(id);
  const c = cardInfo(id);
  if (!lessons.length || !lec || !c) notFound();
  if (c.lv > 3 && !canReadLecture(await serverPlan(), c.lv))
    return <UzLocked kicker={`止まる授業　Lv${c.lv}`} title={plain(lec.title)} lead={plain(lec.hook)} mid={{ href: "/learn/unizeb#lec", label: "図解レクチャー" }} plan="pro" />;
  const have = (key: string) => {
    const src = uzJugyoSrc(key);
    return existsSync(join(process.cwd(), "public", src)) ? src : null;
  };
  const toScenes = (lesson: Lesson): PlayerScene[] =>
    lesson.scenes.map((s) => {
      if (s.kind === "chapter") return s;
      if (s.kind === "pause") {
        const a = jugyoPauseAudio(s, lesson.cast);
        const clip = (x: NonNullable<typeof a.reply>) => ({ text: x.display, speech: x.text, src: have(x.key) });
        return { kind: "pause", question: s.question, choices: a.shown, answer: s.answer, why: s.why, source: s.source, ask: clip(a.ask), reply: a.reply ? clip(a.reply) : null };
      }
      const a = jugyoAudio(s, lesson.cast);
      return { ...s, speech: a.text, src: have(a.key) };
    });
  const variants: CastVariant[] = lessons.map((l) => ({
    id: l.cast.id,
    label: l.cast.label,
    name: l.cast.name,
    genre: l.cast.genre,
    weight: l.cast.weight,
    members: {
      sensei: { name: l.cast.members.sensei.name, role: l.cast.members.sensei.role, look: l.cast.members.sensei.look },
      seito: { name: l.cast.members.seito.name, role: l.cast.members.seito.role, look: l.cast.members.seito.look },
    },
    credit: castCredit(l.cast),
    title: l.title,
    scenes: toScenes(l),
  }));
  const reveal = lec.sections.find((s) => s.reveal)?.reveal;
  const lecHref = `/learn/unizeb/lec/${id}`;
  return (
    <LearnShell crumbs={uzCrumbs(`${c.name}の授業`, { href: lecHref, label: c.name })}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        止まる授業（試作）　Lv{c.lv}・{deptLabel(c.dept)}・{id.toUpperCase()}
      </p>
      <h1 className="m-0 mt-1 text-[24px] font-black leading-tight">{plain(c.name)}</h1>
      <div className="mt-4">
        <JugyoCastPicker
          stage="h"
          variants={variants}
          shared={{
            unit: lec.unit,
            sections: lec.sections.map((s) => ({ heading: s.heading, body: s.body, figure: s.figure })),
            mission: lec.mission,
            mystery: lec.mystery,
            reveal,
            links: { lecture: lecHref },
          }}
        />
      </div>
      <section aria-labelledby="uzj-next-h" className="mx-auto mt-8 max-w-[560px]">
        <h2 id="uzj-next-h" className="m-0 text-[17px] font-black">授業のあとで：あなたが先生役</h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          授業で聞いたことを、こんどは自分のことばで、友だちや家の人に説明してみましょう。そのあとスキルカードで、自分の事業の場合に当てはめて練習します。
        </p>
        <div className="mt-3 grid gap-2">
          <Link href={`/learn/unizeb/card/${id}`} className="flex min-h-[46px] items-center justify-between rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-4 text-[14.5px] font-black text-[#15172B] no-underline">
            スキルカード「{plain(c.name)}」で練習する <span aria-hidden="true">→</span>
          </Link>
          <Link href={lecHref} className="flex min-h-[46px] items-center justify-between rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-4 text-[14.5px] font-black text-[#15172B] no-underline">
            図解レクチャーで読みなおす <span aria-hidden="true">→</span>
          </Link>
          <Link href={`${UZ_HOME}#lec`} className="text-[13px] font-bold text-[#1533B8]">起業の教科書の目次へ</Link>
        </div>
      </section>
    </LearnShell>
  );
}
