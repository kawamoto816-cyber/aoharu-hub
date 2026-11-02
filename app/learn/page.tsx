import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { LegacyHashRedirect } from "@/components/learn/LegacyHashRedirect";
import { LearnMoreMap } from "@/components/learn/LearnMoreMap";
import { NoteLink } from "@/components/drill/NoteLink";
import { LECTURES, getLecture, lectureHref, lectureUnitInfo } from "@/lib/lecture";
import type { Lecture, Recitation } from "@/lib/lecture/types";

// /learn: アオハルラーンの入口。「AI時代の新しい教科書」として、上から
//   1. 表紙 (きょうの1単元)  2. 1単元に、4つの楽しみ方 (実在する単元の朗読・名演説・漫才・謎)
//   3. この教科書のなかみ (LECTURES から数える)  4. 本棚から選ぶ (教科の入口)  5. AIの生徒に教える予告
// のあとに「もっと学ぶ」として、もとの 3×3 の表 (components/learn/LearnMoreMap) を置く。
// 数字と作品はすべて lib/lecture のデータから引く (つくらない)。

// 「きょうの1単元」は日付で変わるので、1時間ごとに作り直す
export const revalidate = 3600;

const URL = "https://app.bluespring.co.jp/learn";
const TITLE = "アオハルラーン｜AI時代の新しい教科書。勉強は、こんなに面白かった。｜アオハルOS";
const DESC = `図解で読み、名作を聴き、漫才で笑い、謎を解く。小学校から高校まで全${LECTURES.length}単元の、スマホで読む教科書。読み終えたら、カードとドリルで覚えて鍛える。登録なし・無料。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

// ---- データから引く ----

/** ルビ《》と区切りの｜を外す */
const plain = (s: string) => s.replace(/《[^》]*》/g, "").replace(/｜/g, "");
const firstSentence = (s: string) => {
  const t = plain(s);
  const i = t.indexOf("。");
  return i < 0 ? t : t.slice(0, i + 1);
};
const lastSentence = (s: string) => {
  const parts = plain(s).split(/(?<=[。？！])/).filter((p) => p.trim());
  return parts[parts.length - 1] ?? s;
};
const recites = (l: Lecture | undefined): Recitation[] => l?.sections.flatMap((s) => s.recite ?? []) ?? [];
const unitLabel = (unit: string) => {
  const info = lectureUnitInfo(unit);
  return info ? `${info.subject}・${info.group}` : "";
};

function stats() {
  const recite = LECTURES.reduce((n, l) => n + recites(l).length, 0);
  const kinds = { novel: 0, manzai: 0, manga4: 0 };
  for (const l of LECTURES) if (l.story) kinds[l.story.kind]++;
  return { units: LECTURES.length, recite, stories: kinds.novel + kinds.manzai + kinds.manga4, kinds };
}

/** 日付 (日本時間) から決まる、きょうの1単元。物語 (story) のある単元から選ぶ。 */
function todayLecture(): Lecture {
  const pool = LECTURES.filter((l) => l.story);
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const day = Math.floor(Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate()) / 86_400_000);
  // 隣の日が同じ教科に並ばないよう、素数の歩幅で飛ばす (588 などの単元数と互いに素なら全単元をひと回りする)
  return pool[(day * 7919) % pool.length] ?? LECTURES[0];
}

function showcase() {
  const melosL = getLecture("j-ja-2-shosetsu");
  const melos = recites(melosL).find((r) => r.cite.includes("走れメロス"));
  const fdrL = getLecture("j-en-2-jodoshi");
  const fdr = recites(fdrL).find((r) => r.text.includes("fear itself"));
  const fdrLine = fdr ? fdr.text.slice(fdr.text.indexOf("the only thing"), fdr.text.indexOf("fear itself") + "fear itself".length) : "";
  const fdrJa = fdr?.ja ? fdr.ja.split("。").find((s) => s.includes("恐れそのもの")) : undefined;
  const kanbun = getLecture("j-ja-1-kanbun");
  const kobun = getLecture("j-ja-1-kobun");
  return {
    melos: melos && melosL ? { unit: melosL.unit, line: firstSentence(melos.text), cite: melos.cite.replace(/（[^）]*）/g, "").replace(/冒頭$/, "") } : undefined,
    fdr: fdr && fdrL && fdrLine ? { unit: fdrL.unit, line: fdrLine, ja: fdrJa ? `${fdrJa}。` : undefined, cite: fdr.cite } : undefined,
    manzai: kanbun?.story?.kind === "manzai" ? { unit: kanbun.unit, title: kanbun.story.title, cast: kanbun.story.cast } : undefined,
    mystery: kobun?.mystery ? { unit: kobun.unit, q: lastSentence(kobun.mystery), from: kobun.mission?.from } : undefined,
  };
}

const SHELF = [
  { label: "国語", href: "/learn/kyoka/kokugo", bg: "bg-[#B42318]", h: "h-[140px]" },
  { label: "数学", href: "/learn/kyoka/sugaku", bg: "bg-[#1533B8]", h: "h-[124px]" },
  { label: "英語", href: "/learn/kyoka/eigo", bg: "bg-[#15172B]", h: "h-[146px]" },
  { label: "理科", href: "/learn/kyoka/rika", bg: "bg-[#2F7D4F]", h: "h-[132px]" },
  { label: "社会", href: "/learn/kyoka/shakai", bg: "bg-[#8A5A00]", h: "h-[138px]" },
  { label: "情報", href: "/learn/kyoka/joho", bg: "bg-[#5A5D73]", h: "h-[118px]" },
] as const;

// ---- 小さな部品 ----

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function Play() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" />
    </svg>
  );
}

const card = "flex flex-col gap-2.5 rounded-[16px] border-[1.5px] border-[#15172B] p-4 text-[#15172B] no-underline transition-shadow hover:shadow-[3px_3px_0_#15172B] focus-visible:shadow-[3px_3px_0_#15172B]";
const pillDark = "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#15172B] px-4 text-[14px] font-black text-white";

export default function LearnHub() {
  const today = todayLecture();
  const todayInfo = lectureUnitInfo(today.unit);
  const s = stats();
  const sc = showcase();

  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { label: "まなぶ" }]}>
      <LegacyHashRedirect />
      <div className="mx-auto max-w-[720px] overflow-x-clip">
        {/* 1. 表紙 */}
        <section
          aria-labelledby="hero-heading"
          className="flex flex-col gap-3.5 rounded-[6px_22px_22px_6px] border-l-[10px] border-[#0E2380] bg-[#1533B8] px-[22px] pb-6 pt-7 text-white shadow-[0_10px_0_-4px_#E3DCC8,0_18px_0_-8px_#D7CFB7] sm:px-10 sm:py-10"
        >
          <p className="m-0 text-[12px] font-bold tracking-[0.14em] text-[#FFE45C]">AOHARU LEARN　AI時代の新しい教科書</p>
          <h1 id="hero-heading" className="m-0 font-serif text-[36px] font-extrabold leading-[1.3] sm:text-[48px]">
            勉強は、
            <br />
            こんなに
            <br className="sm:hidden" />
            面白かった。
          </h1>
          <p className="m-0 max-w-[520px] text-[14px] leading-[1.8] text-[#DDE3FA] sm:text-[15px]">
            図解で読み、名作を聴き、漫才で笑い、謎を解く。小学校から高校まで、{s.units}単元のスマホ教科書。
          </p>
          <div className="flex flex-col items-start gap-1.5">
            <Link
              href={lectureHref(today.unit)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#FFE45C] px-[18px] text-[15px] font-black text-[#15172B] no-underline hover:bg-[#FFEC85] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              きょうの1単元を開く
              <Arrow />
            </Link>
            <p className="m-0 text-[12.5px] leading-relaxed text-[#DDE3FA]">
              きょうは {todayInfo ? `${todayInfo.subject}・${todayInfo.group}「${todayInfo.name}」` : today.title}
            </p>
          </div>
        </section>

        {/* 2. 4つの楽しみ方 */}
        <section aria-labelledby="ways-heading" className="mt-12 flex flex-col gap-3.5">
          <h2 id="ways-heading" className="m-0 text-[19px] font-black sm:text-[22px]">
            1単元に、4つの楽しみ方
          </h2>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {sc.melos && (
              <Link href={lectureHref(sc.melos.unit)} className={`${card} bg-white`}>
                <p className="m-0 text-[11px] font-black tracking-[0.08em] text-[#8A5A00]">名作を聴く　{unitLabel(sc.melos.unit)}</p>
                <p className="m-0 border-l-4 border-[#C9A24A] pl-3 font-serif text-[18px] leading-[1.8]">{sc.melos.line}</p>
                <p className="m-0 text-[12px] text-[#5A5D73]">{sc.melos.cite}　青空文庫と照合した原文を朗読</p>
                <span className={`${pillDark} mt-auto`}>
                  <Play />
                  朗読を聞く
                </span>
              </Link>
            )}
            {sc.fdr && (
              <Link href={lectureHref(sc.fdr.unit)} className={`${card} bg-white`}>
                <p className="m-0 text-[11px] font-black tracking-[0.08em] text-[#1533B8]">英語の名演説　{unitLabel(sc.fdr.unit)}</p>
                <p lang="en" className="m-0 border-l-4 border-[#1533B8] pl-3 font-serif text-[17px] italic leading-[1.7]">
                  …{sc.fdr.line}…
                </p>
                {sc.fdr.ja && <p className="m-0 text-[12.5px] leading-relaxed text-[#3A3D55]">{sc.fdr.ja}</p>}
                <p lang="en" className="m-0 text-[12px] text-[#5A5D73]">
                  {sc.fdr.cite}
                </p>
                <span className={`${pillDark} mt-auto`}>
                  <Play />
                  演説を聞く
                </span>
              </Link>
            )}
            <div className="grid grid-cols-2 gap-2.5 sm:col-span-2 sm:gap-3.5">
              {sc.manzai && (
                <Link href={lectureHref(sc.manzai.unit)} className={`${card} gap-2 bg-[#FFF8D6] p-3.5`}>
                  <p className="m-0 text-[11px] font-black text-[#B42318]">漫才で笑う　{unitLabel(sc.manzai.unit)}</p>
                  <p className="m-0 text-[13px] font-bold leading-[1.6] sm:text-[15px]">「{sc.manzai.title}！」</p>
                  <p className="m-0 mt-auto flex items-center gap-1 text-[11px] text-[#5A5D73]">
                    {sc.manzai.cast.join("と")}、2人の声で再生
                    <Arrow className="shrink-0" />
                  </p>
                </Link>
              )}
              {sc.mystery && (
                <Link href={lectureHref(sc.mystery.unit)} className={`${card} gap-2 bg-[#E6EAFB] p-3.5`}>
                  <p className="m-0 text-[11px] font-black text-[#1533B8]">謎を解く　{unitLabel(sc.mystery.unit)}</p>
                  <p className="m-0 text-[13px] font-bold leading-[1.6] sm:text-[15px]">{sc.mystery.q}</p>
                  <p className="m-0 mt-auto flex items-center gap-1 text-[11px] text-[#5A5D73]">
                    {sc.mystery.from ? `${sc.mystery.from}から届く MISSION` : "読み進めると解ける謎"}
                    <Arrow className="shrink-0" />
                  </p>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* 3. なかみ */}
        <section aria-labelledby="stats-heading" className="mt-12 flex flex-col gap-2.5">
          <h2 id="stats-heading" className="m-0 text-[19px] font-black sm:text-[22px]">
            この教科書のなかみ
          </h2>
          <dl className="m-0 grid grid-cols-3 gap-2 text-center">
            {[
              { n: s.units, label: "単元" },
              { n: s.recite, label: "名作の朗読" },
              { n: s.stories, label: "小説・漫才・4コマ" },
            ].map((x) => (
              <div key={x.label} className="flex flex-col-reverse rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-1.5 py-3.5">
                <dt className="text-[11px] text-[#5A5D73]">{x.label}</dt>
                <dd className="m-0 text-[24px] font-black tabular-nums sm:text-[30px]">{x.n.toLocaleString("ja-JP")}</dd>
              </div>
            ))}
          </dl>
          <p className="m-0 text-[12px] text-[#5A5D73]">
            物語の内わけ：小説 {s.kinds.novel}・漫才 {s.kinds.manzai}・4コマ {s.kinds.manga4}
          </p>
        </section>

        {/* 4. 本棚 */}
        <section aria-labelledby="shelf-heading" className="mt-12 flex flex-col gap-2.5">
          <h2 id="shelf-heading" className="m-0 text-[19px] font-black sm:text-[22px]">
            本棚から選ぶ
          </h2>
          <ul className="m-0 flex h-[150px] list-none items-end gap-2 border-b-[6px] border-[#8A5A00] px-1 py-0">
            {SHELF.map((b) => (
              <li key={b.label} className={`flex-1 ${b.h}`}>
                <Link
                  href={b.href}
                  className={`flex h-full items-center justify-center rounded-t-[4px] text-[15px] font-black tracking-[0.2em] text-white no-underline [writing-mode:vertical-rl] hover:-translate-y-1 hover:brightness-110 focus-visible:-translate-y-1 motion-safe:transition-transform ${b.bg}`}
                >
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="m-0 text-[12px] text-[#5A5D73]">背表紙を選ぶと、その教科の入口が開きます。</p>
        </section>

        {/* 5. 予告 */}
        <section aria-labelledby="teach-heading" className="mt-8 flex flex-col gap-1.5 rounded-[16px] border-[1.5px] border-dashed border-[#15172B] bg-white p-4">
          <h2 id="teach-heading" className="m-0 text-[15px] font-black">
            読み終えたら、AIの生徒に教えてみよう
          </h2>
          <p className="m-0 text-[13px] leading-[1.7] text-[#3A3D55]">説明できたら、本当にわかった証拠。（準備中）</p>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <NoteLink />
          <span className="text-[12.5px] text-[#3A3D55]">ドリルでまちがえた問題が自動でたまります</span>
        </div>
      </div>

      <div className="mt-14">
        <LearnMoreMap />
      </div>

      <p className="mb-0 mt-8 text-center text-[11px] leading-[1.7] text-[#5A5D73]">登録なし・無料　／　音声：VOICEVOX ほか</p>
    </LearnShell>
  );
}
