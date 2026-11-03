import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { LegacyHashRedirect } from "@/components/learn/LegacyHashRedirect";
import { LearnMoreMap } from "@/components/learn/LearnMoreMap";
import { NoteLink } from "@/components/drill/NoteLink";
import { LECTURES, getLecture, lectureHref, lectureUnitInfo } from "@/lib/lecture";
import { TSUKKOMI_HOME } from "@/lib/tsukkomi";
import type { Lecture, Recitation } from "@/lib/lecture/types";

// /learn: アオハルラーンの入口（A案）。「勉強は、こんなに面白かった。」を表紙に、上から
//   1. 表紙 (学んだら、教えよう／きょうの1単元)  2. AIの生徒との会話の例 (準備中)
//   3. 学び方は、3ステップ (1 覚える・2 鍛える・3 教える)  4. 1単元に、4つの楽しみ方 (実在する単元の朗読・名演説・漫才・謎)
//   5. この教科書のなかみ (LECTURES から数える)  6. 教科から選ぶ  7. あたらしいがっこう への入口 (準備中)
// のあとに「もっと学ぶ」として、もとの 3×3 の表 (components/learn/LearnMoreMap) を置く。
// 数字と作品はすべて lib/lecture のデータから引く (つくらない)。

// 「きょうの1単元」は日付で変わるので、1時間ごとに作り直す
export const revalidate = 3600;

const URL = "https://app.bluespring.co.jp/learn";
const TITLE = "アオハルラーン｜AI時代の新しい教科書。勉強は、こんなに面白かった。｜アオハルOS";
const DESC = `図解と物語でわかり、ツッコんで身につき、AIの生徒に教えて自分のものにする。学んだら、教えよう。小学校から高校まで全${LECTURES.length}単元の、スマホで読む教科書。登録なし・無料。`;

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

const SUBJECTS = [
  { label: "国語", note: "名作の朗読つき", href: "/learn/kyoka/kokugo" },
  { label: "算数・数学", note: "数学者の物語つき", href: "/learn/kyoka/sugaku" },
  { label: "英語", note: "名演説をネイティブの声で", href: "/learn/kyoka/eigo" },
  { label: "理科", note: "発見の謎解き", href: "/learn/kyoka/rika" },
  { label: "社会", note: "歴史を物語で", href: "/learn/kyoka/shakai" },
  { label: "情報", note: "しくみを図解で", href: "/learn/kyoka/joho" },
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
        <section aria-labelledby="hero-heading" className="flex flex-col gap-3.5 pt-2">
          <p className="m-0 text-[12px] font-black tracking-[0.12em] text-[#1533B8]">AI時代の、新しい教科書</p>
          <h1 id="hero-heading" className="m-0 font-serif text-[38px] font-extrabold leading-[1.25] sm:text-[52px]">
            勉強は、
            <br />
            こんなに
            <br className="sm:hidden" />
            面白かった。
          </h1>
          <p className="m-0 max-w-[560px] text-[15px] leading-[1.9] text-[#3A3D55]">
            図解と物語で、わかる。ツッコんで、身につく。そして、だれかに教えたとき、知識はほんとうに自分のものになる。
            <b className="text-[#15172B]">学んだら、教えよう。</b>
            小・中・高の{s.units}単元、登録なしで無料。
          </p>
          <div className="flex flex-col items-start gap-1.5">
            <Link
              href={lectureHref(today.unit)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-[18px] text-[15px] font-black text-[#15172B] no-underline shadow-[3px_3px_0_#15172B] hover:bg-[#FFEC85] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#1533B8]"
            >
              きょうの1単元を開く
              <Arrow />
            </Link>
            <p className="m-0 text-[12.5px] leading-relaxed text-[#5A5D73]">
              きょうは {todayInfo ? `${todayInfo.subject}・${todayInfo.group}「${todayInfo.name}」` : today.title}
            </p>
          </div>
        </section>

        {/* 2. AIの生徒との会話の例（準備中） */}
        <section aria-label="AIの生徒との会話の例" className="mt-6 flex flex-col gap-3 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4 shadow-[4px_4px_0_#15172B]">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-[#E6EAFB]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1533B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="9" r="4" />
                <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
              </svg>
            </span>
            <div>
              <p className="m-0 text-[13px] font-black">AIの生徒 ハル</p>
              <p className="m-0 text-[11px] text-[#5A5D73]">中1数学「正の数・負の数」を読んだあなたに</p>
            </div>
            <span className="ml-auto shrink-0 whitespace-nowrap rounded-full bg-[#15172B] px-2.5 py-1 text-[11px] font-black text-[#FFE45C]">準備中</span>
          </div>
          <p className="m-0 rounded-[14px_14px_14px_4px] bg-[#E6EAFB] px-3.5 py-3 text-[15px] font-bold leading-[1.7]">ねえ、なんで マイナス×マイナス は プラスになるの？</p>
          <p className="m-0 max-w-[85%] self-end rounded-[14px_14px_4px_14px] border-[1.5px] border-dashed border-[#C9A24A] bg-[#FFF8D6] px-3.5 py-3 text-[14px] leading-[1.7] text-[#5A5D73]">
            （ここに、あなたの説明を30秒で）
          </p>
          <p className="m-0 flex flex-wrap gap-2">
            {["技：たとえる", "技：図にする", "技：例を出す"].map((w) => (
              <span key={w} className="rounded-full border-[1.5px] border-[#15172B] bg-white px-2.5 py-1 text-[12px] font-bold">
                {w}
              </span>
            ))}
          </p>
        </section>

        {/* 3. 学び方は、3ステップ */}
        <section aria-labelledby="steps-heading" className="mt-12 flex flex-col gap-3">
          <h2 id="steps-heading" className="m-0 text-[20px] font-black sm:text-[22px]">
            学び方は、3ステップ
          </h2>
          <ol className="m-0 grid list-none grid-cols-3 gap-2 p-0">
            {[
              { n: "1", t: "覚える", d: "図解・名作・漫才・謎の授業で、わかって覚える", href: lectureHref(today.unit), hi: false },
              { n: "2", t: "鍛える", d: "ツッコミ道場と模擬試験で、速く正しく", href: TSUKKOMI_HOME, hi: true },
              { n: "3", t: "教える", d: "AIの生徒に説明して、学びをマスター", href: undefined, hi: false },
            ].map((x) => {
              const body = (
                <>
                  <span className={`text-[22px] font-black ${x.hi ? "text-[#15172B]" : "text-[#1533B8]"}`}>{x.n}</span>
                  <span className="text-[15px] font-black">{x.t}</span>
                  <span className="text-[11.5px] leading-[1.6]">{x.d}</span>
                  {!x.href && <span className="mt-auto text-[10.5px] font-bold text-[#5A5D73]">準備中</span>}
                </>
              );
              const cls = `flex h-full flex-col gap-1.5 rounded-[14px] border-[1.5px] border-[#15172B] px-2.5 py-3 text-[#15172B] no-underline ${x.hi ? "bg-[#FFE45C]" : "bg-white"}`;
              return (
                <li key={x.n}>
                  {x.href ? (
                    <Link href={x.href} className={`${cls} hover:shadow-[3px_3px_0_#15172B]`}>
                      {body}
                    </Link>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        {/* 4. 4つの楽しみ方 */}
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
          {/* ②鍛える の新しい学び方への入口 */}
          <Link href={TSUKKOMI_HOME} className="flex items-center gap-3 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white no-underline shadow-[3px_3px_0_#B42318] transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5">
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-black text-[#FFE45C]">②鍛える　ツッコミ学習法</span>
              <span className="mt-1 block text-[15px] font-bold leading-[1.6]">ボケのまちがいに、時間内にツッコめ。正しい文は見抜いてスルー。</span>
            </span>
            <Arrow className="shrink-0" />
          </Link>
        </section>

        {/* 5. なかみ */}
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

        {/* 6. 教科から選ぶ */}
        <section aria-labelledby="subj-heading" className="mt-12 flex flex-col gap-3">
          <h2 id="subj-heading" className="m-0 text-[20px] font-black sm:text-[22px]">
            教科から選ぶ
          </h2>
          <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3">
            {SUBJECTS.map((x) => (
              <li key={x.label}>
                <Link href={x.href} className={`${card} h-full gap-1 bg-white p-3.5`}>
                  <span className="text-[17px] font-black">{x.label}</span>
                  <span className="text-[11.5px] text-[#5A5D73]">{x.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 7. あたらしいがっこう（準備中） */}
        <section aria-labelledby="school-heading" className="mt-12 flex flex-col gap-2.5 rounded-[18px] bg-[#15172B] p-[18px] text-white">
          <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#FFE45C]">あたらしいがっこう（準備中）</p>
          <h2 id="school-heading" className="m-0 text-[18px] font-black leading-[1.5]">
            ここで学んだ一日が、そのまま出席になる。
          </h2>
          <p className="m-0 text-[13px] leading-[1.8] text-[#C9CEF2]">
            時間割も、教室も、先生役も。学んだ記録が出席簿になり、AIの生徒に教えた単元が「先生レベル」に育つ、あなたのための自分だけの学校。
          </p>
          <div className="h-2.5 overflow-hidden rounded-full bg-[#3A3D55]" aria-hidden="true">
            <div className="h-2.5 w-[32%] bg-[#FFE45C]" />
          </div>
          <p className="m-0 text-[12px] text-[#C9CEF2]">見習い先生　→　一人前　→　名人</p>
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
