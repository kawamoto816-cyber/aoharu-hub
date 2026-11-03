import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { LegacyHashRedirect } from "@/components/learn/LegacyHashRedirect";
import { LearnMoreMap } from "@/components/learn/LearnMoreMap";
import { UnitPicker, type PickerEntry } from "@/components/learn/UnitPicker";
import { LEVELS } from "@/lib/school";
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


/** 表紙の「学年 → 教科 → 単元」用に、学校の地図を学年ごとに並べ直す */
const GRADES = ["小1", "小2", "小3", "小4", "小5", "小6", "中1", "中2", "中3", "高校"];
function pickerData(): PickerEntry[] {
  const out: PickerEntry[] = [];
  for (const l of LEVELS)
    for (const s of l.subjects)
      for (const g of s.groups) {
        const units = g.units.filter((u) => getLecture(u.id)).map((u) => ({ id: u.id, name: u.name }));
        if (!units.length) continue;
        let grades: string[];
        if (l.name === "高校") grades = ["高校"];
        else if (GRADES.includes(g.title)) grades = [g.title];
        else if (l.name === "中学校") grades = ["中1", "中2", "中3"];
        else grades = (g.title.match(/[1-6]/g) ?? []).map((n) => `小${n}`);
        for (const grade of grades) out.push({ grade, subject: s.name, group: g.title, units });
      }
  return out;
}

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

export default function LearnHub() {
  const today = todayLecture();
  const todayInfo = lectureUnitInfo(today.unit);
  const s = stats();
  const sc = showcase();

  return (
    <LearnShell crumbs={[]}>
      <LegacyHashRedirect />
      <div className="mx-auto max-w-[720px] overflow-x-clip">
        {/* 1. 表紙（青い本の表紙） */}
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
          <p className="m-0 max-w-[560px] text-[14px] leading-[1.9] text-[#DDE3FA] sm:text-[15px]">
            図解と物語で、わかる。ツッコんで、身につく。そして、だれかに教えたとき、知識はほんとうに自分のものになる。
            <b className="text-white">学んだら、教えよう。</b>
            小・中・高の{s.units}単元、登録なしで無料。
          </p>
          <UnitPicker entries={pickerData()} grades={GRADES} />
          <p className="m-0 text-[12.5px] leading-relaxed text-[#DDE3FA]">
            まよったら、きょうのおすすめ：
            <Link href={lectureHref(today.unit)} className="font-bold text-white underline underline-offset-2">
              {todayInfo ? `${todayInfo.subject}・${todayInfo.group}「${todayInfo.name}」` : today.title}
            </Link>
          </p>
        </section>

        {/* 2. AIの生徒との会話の例（準備中） */}
        <section aria-label="AIの生徒との会話の例" className="mt-8 flex flex-col gap-3 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4 shadow-[4px_4px_0_#15172B]">
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

        {/* 4. いつもの教科書とのちがい＋1単元の冒険 */}
        <section aria-labelledby="ways-heading" className="mt-12 flex flex-col gap-4">
          <div>
            <p className="m-0 text-[12px] font-black tracking-[0.12em] text-[#B42318]">ここが、ちがう</p>
            <h2 id="ways-heading" className="m-0 mt-1 text-[22px] font-black leading-[1.4] sm:text-[26px]">
              1単元が、ひとつの冒険になる。
            </h2>
          </div>

          {/* いつもの教科書 → この教科書 */}
          <div className="overflow-hidden rounded-[18px] border-[1.5px] border-[#15172B] bg-white">
            <div className="grid grid-cols-[1fr_auto_1.25fr] items-center border-b-[1.5px] border-[#15172B] text-[12px] font-black">
              <span className="bg-[#EFEBE0] px-3 py-2.5 text-[#5A5D73]">いつもの教科書</span>
              <span aria-hidden="true" className="h-full bg-[#EFEBE0]" />
              <span className="bg-[#FFE45C] px-3 py-2.5">アオハルラーン</span>
            </div>
            {[
              ["説明から始まる", "謎から始まる", "依頼人からの MISSION"],
              ["太字を暗記する", "物語で覚える", "小説・4コマ・漫才"],
              ["黙って読む", "名作を本物の声で聴く", "原文の朗読・ネイティブの名演説"],
              ["問題を解いて終わり", "ツッコんで鍛える", "ボケのまちがいを時間内に直す"],
              ["テストで忘れる", "教えて自分のものに", "AIの生徒に説明する（準備中）"],
            ].map(([old, nu, note]) => (
              <div key={nu} className="grid grid-cols-[1fr_auto_1.25fr] items-center border-b border-[#E3DCC8] last:border-b-0">
                <span className="px-3 py-3 text-[13px] text-[#8F94B8] line-through decoration-[#C9CEF2]">{old}</span>
                <Arrow className="text-[#B42318]" />
                <span className="px-3 py-2.5">
                  <span className="block text-[14px] font-black leading-[1.5]">{nu}</span>
                  <span className="block text-[11px] leading-[1.5] text-[#5A5D73]">{note}</span>
                </span>
              </div>
            ))}
          </div>

          {/* 1単元の冒険（実在の単元から） */}
          <ol className="relative m-0 flex list-none flex-col gap-3 p-0 pl-11 before:absolute before:bottom-6 before:left-[17px] before:top-6 before:w-[3px] before:rounded-full before:bg-[repeating-linear-gradient(#15172B_0_6px,transparent_6px_12px)] before:content-['']">
            {sc.mystery && (
              <li className="relative">
                <span aria-hidden="true" className="absolute -left-11 top-3 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-[#1533B8] text-[13px] font-black text-white">謎</span>
                <Link href={lectureHref(sc.mystery.unit)} className={`${card} bg-[#E6EAFB]`}>
                  <span className="text-[11px] font-black text-[#1533B8]">STEP 1　MISSION が届く　{unitLabel(sc.mystery.unit)}</span>
                  <span className="text-[15px] font-bold leading-[1.6]">{sc.mystery.q}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#5A5D73]">
                    {sc.mystery.from ? `依頼人：${sc.mystery.from}` : "読み進めると解ける謎"}
                    <Arrow className="shrink-0" />
                  </span>
                </Link>
              </li>
            )}
            {(sc.melos || sc.fdr) && (
              <li className="relative">
                <span aria-hidden="true" className="absolute -left-11 top-3 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-[#C9A24A] text-[13px] font-black text-white">聴</span>
                <div className={`${card} bg-white`}>
                  <span className="text-[11px] font-black text-[#8A5A00]">STEP 2　名作を、本物の声で聴く</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {sc.melos && (
                      <Link href={lectureHref(sc.melos.unit)} className="flex flex-col gap-1 rounded-[12px] border-l-4 border-[#C9A24A] bg-[#FBF7EE] px-3 py-2.5 text-[#15172B] no-underline hover:bg-[#F5EEDC]">
                        <span className="font-serif text-[17px] leading-[1.6]">{sc.melos.line}</span>
                        <span className="flex items-center gap-1 text-[11px] text-[#5A5D73]">
                          <Play /> {sc.melos.cite}
                        </span>
                      </Link>
                    )}
                    {sc.fdr && (
                      <Link href={lectureHref(sc.fdr.unit)} className="flex flex-col gap-1 rounded-[12px] border-l-4 border-[#1533B8] bg-[#F2F4FC] px-3 py-2.5 text-[#15172B] no-underline hover:bg-[#E6EAFB]">
                        <span lang="en" className="font-serif text-[15px] italic leading-[1.6]">…{sc.fdr.line}…</span>
                        <span className="flex items-center gap-1 text-[11px] text-[#5A5D73]">
                          <Play /> ネイティブの声で
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            )}
            {sc.manzai && (
              <li className="relative">
                <span aria-hidden="true" className="absolute -left-11 top-3 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[13px] font-black">笑</span>
                <Link href={lectureHref(sc.manzai.unit)} className={`${card} bg-[#FFF8D6]`}>
                  <span className="text-[11px] font-black text-[#B42318]">STEP 3　漫才で笑って覚える　{unitLabel(sc.manzai.unit)}</span>
                  <span className="text-[16px] font-black leading-[1.5]">「{sc.manzai.title}！」</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#5A5D73]">
                    {sc.manzai.cast.join("と")}、2人の声で再生
                    <Arrow className="shrink-0" />
                  </span>
                </Link>
              </li>
            )}
            <li className="relative">
              <span aria-hidden="true" className="absolute -left-11 top-3 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-[#B42318] text-[13px] font-black text-white">鍛</span>
              <Link href={TSUKKOMI_HOME} className="flex flex-col gap-1.5 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white no-underline shadow-[3px_3px_0_#B42318] transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5">
                <span className="text-[11px] font-black text-[#FFE45C]">STEP 4　ツッコんで鍛える　ツッコミ学習法</span>
                <span className="text-[15px] font-bold leading-[1.6]">ボケのまちがいに、時間内にツッコめ。うまくツッコめたら「なんでやねん！」</span>
                <span className="flex items-center gap-1 text-[11px] text-[#C9CEF2]">
                  道場へ行く
                  <Arrow className="shrink-0" />
                </span>
              </Link>
            </li>
            <li className="relative">
              <span aria-hidden="true" className="absolute -left-11 top-3 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#15172B] bg-white text-[13px] font-black">教</span>
              <div className="flex flex-col gap-1 rounded-[16px] border-[1.5px] border-dashed border-[#15172B] bg-white p-4">
                <span className="text-[11px] font-black text-[#2F7D4F]">STEP 5　AIの生徒に教える（準備中）</span>
                <span className="text-[15px] font-bold leading-[1.6]">説明できたら、本当にわかった証拠。学んだら、教えよう。</span>
              </div>
            </li>
          </ol>
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
