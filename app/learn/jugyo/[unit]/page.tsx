import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import type { PlayerScene } from "@/components/jugyo/JugyoPlayer";
import { JugyoCastPicker, type CastVariant } from "@/components/jugyo/JugyoCastPicker";
import { KoeSetsumei } from "@/components/koe/KoeSetsumei";
import { plain } from "@/components/lecture/Rich";
import { JUGYO_HOME, UNITS, getLessons, jugyoHref, jugyoSpan } from "@/lib/jugyo";
import { castCredit, jugyoAudio, jugyoPauseAudio } from "@/lib/jugyo/audio";
import { stageOf } from "@/lib/jugyo/cast";
import type { Lesson } from "@/lib/jugyo/types";
import { getLecture, lectureHref, lectureUnitInfo } from "@/lib/lecture";
import { getUnitMoshi, unitMoshiHref } from "@/lib/moshi/unit";
import { getOshieru, oshieruHref } from "@/lib/oshieru";
import { oshieruAiHref } from "@/lib/oshieru/ai-lesson-home";
import { isLowUnit } from "@/lib/naze";

// /learn/jugyo/<単元id>：止まる授業（動画型・試作）。検索に載せ、sitemap にも入れる。?cast= のURLも canonical は cast なし。
// 入口：教科の地図の単元の箱（▶ 授業）・単元の教科書のページ（LecturePage）・一覧 /learn/jugyo。
// その段階のキャスト全部の台本を渡し、ブラウザでふり分ける（components/jugyo/JugyoCastPicker。?cast=<id> で指定）。

const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return UNITS.map((unit) => ({ unit }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const unit = (await params).unit;
  if (!getLessons(unit).length) return {};
  const info = lectureUnitInfo(unit);
  const name = plain(info?.name ?? unit);
  const span = jugyoSpan(unit);
  const url = `${SITE}${jugyoHref(unit)}`;
  const where = info ? `（${info.level}${info.subject}・${info.group}）` : "";
  const title = `${name}の授業${where}｜止まる授業｜アオハルラーン｜アオハルOS`;
  const description = `${info ? `${info.level}${info.subject}「${name}」` : name}を、2人のキャラが図を見ながら話す授業で。${span ? `約${span.minutes}分・とちゅうで${span.stops}回止まって問題。` : ""}答えてから続きへ、最後はあなたが先生役。登録なし・無料。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  const unit = (await params).unit;
  const lessons = getLessons(unit);
  const lec = getLecture(unit);
  if (!lessons.length || !lec) notFound();
  const info = lectureUnitInfo(unit);
  // 音声の src はいつも渡す（音声は push 前に jugyo-tts.ts がすべて作る）。読み込めなければプレイヤーが仮の声に切りかえる。
  // ファイルの有無を fs で見ると、トレースが public/audio（数百MB）を関数に入れ、デプロイが失敗するため見ない（next.config.ts も参照）
  const have = (src: string): string | null => src;
  const toScenes = (lesson: Lesson): PlayerScene[] =>
    lesson.scenes.map((s) => {
      if (s.kind === "chapter") return s;
      if (s.kind === "pause") {
        const a = jugyoPauseAudio(s, lesson.cast);
        const clip = (c: NonNullable<typeof a.reply>) => ({ text: c.display, speech: c.text, src: have(c.src) });
        return { kind: "pause", question: s.question, choices: a.shown, answer: s.answer, why: s.why, source: s.source, ask: clip(a.ask), reply: a.reply ? clip(a.reply) : null };
      }
      const a = jugyoAudio(s, lesson.cast);
      return { ...s, speech: a.text, src: have(a.src) };
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
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: JUGYO_HOME, label: "止まる授業（試作）" }, { label: info?.name ?? unit }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        止まる授業（試作）{info && `　${info.level}・${info.subject}・${info.group}`}
      </p>
      <h1 className="m-0 mt-1 text-[24px] font-black leading-tight">{plain(info?.name ?? unit)}</h1>
      <div className="mt-4">
        <JugyoCastPicker
          stage={stageOf(unit)}
          variants={variants}
          shared={{
            unit,
            sections: lec.sections.map((s) => ({ heading: s.heading, body: s.body, figure: s.figure })),
            mission: lec.mission,
            mystery: lec.mystery,
            reveal,
            links: {
              lecture: lectureHref(unit),
              moshi: getUnitMoshi(unit) ? unitMoshiHref(unit) : undefined,
              oshieru: getOshieru(unit) ? oshieruHref(unit) : undefined,
              oshieruAi: getOshieru(unit) ? oshieruAiHref(unit) : undefined,
            },
          }}
        />
      </div>
      <section id="jugyo-koe" aria-labelledby="jugyo-koe-h" className="mx-auto mt-8 max-w-[560px] scroll-mt-4">
        <h2 id="jugyo-koe-h" className="m-0 text-[17px] font-black">授業のあとで：あなたが先生役</h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">授業で聞いたことを、こんどは自分のことばで説明してみましょう。</p>
        <KoeSetsumei unit={unit} low={isLowUnit(unit)} className="mt-3" />
        <p className="m-0 mt-4 text-[12px] text-[#3A3D55]">
          内容は<Link href={lectureHref(unit)} className="font-bold text-[#1533B8]">図解レクチャー</Link>の本文から。声は、授業の下の「授業の声・キャラ」に。
        </p>
      </section>
    </LearnShell>
  );
}
