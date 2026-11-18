import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { LegacyHashRedirect } from "@/components/learn/LegacyHashRedirect";
import { LearnTutorial, type TutorialUnit } from "@/components/learn/LearnTutorial";
import { jugyoHref, jugyoSpan, UNITS as JUGYO_UNITS } from "@/lib/jugyo";
import { hasTsukkomi, tsukkomiHref } from "@/lib/tsukkomi";
import { hasUnitMoshi, unitMoshiHref } from "@/lib/moshi/unit";
import { OSHIERU_UNITS, oshieruHref } from "@/lib/oshieru";
import { LearnMoreMap } from "@/components/learn/LearnMoreMap";
import { UnitPicker, type PickerEntry } from "@/components/learn/UnitPicker";
import { LEVELS } from "@/lib/school";
import { NoteLink } from "@/components/drill/NoteLink";
import { ZukanLink } from "@/components/zukan/Zukan";
import { ZUKAN_HREF } from "@/lib/zukan/words";
import { LECTURES, getLecture, lectureHref, lectureUnitInfo } from "@/lib/lecture";
import type { Lecture, Recitation } from "@/lib/lecture/types";

// /learn: アオハルラーンの入口（A案）。「勉強は、こんなに面白かった。」を表紙に、上から
//   1. 表紙 (学んだら、教えよう／きょうの1単元)・はじめての方へ  2. 使い方ツアー (AIのオーダーメイド＋1単元を8ステップで。components/learn/LearnTutorial)
//   3. 学び方は、3ステップ (1 覚える・2 鍛える・3 教える)  4. 1単元に、4つの楽しみ方 (実在する単元の朗読・名演説・漫才・謎)
//   5. この教科書のなかみ (LECTURES から数える)  6. 教科から選ぶ  7. あたらしいがっこう (/learn/gakko) への入口
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
const recites = (l: Lecture | undefined): Recitation[] => l?.sections.flatMap((s) => s.recite ?? []) ?? [];

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

/** 使い方ツアーの例の単元 (日がわり)。図解・ちょっと待った授業・ツッコミ・単元模試・オシエル・物語・MISSION がそろう単元から */
function tutorialUnit(): TutorialUnit {
  const pool = JUGYO_UNITS.filter((u) => hasTsukkomi(u) && hasUnitMoshi(u) && OSHIERU_UNITS.includes(u) && getLecture(u)?.story && getLecture(u)?.mission);
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const day = Math.floor(Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate()) / 86_400_000);
  const unit = pool[(day * 7919) % Math.max(1, pool.length)] ?? "j-math-1-seifu";
  const info = lectureUnitInfo(unit);
  return {
    unit,
    label: info ? `${info.subject}・${info.group}` : "",
    name: plain(info?.name ?? unit),
    lecture: lectureHref(unit),
    jugyo: jugyoHref(unit),
    tsukkomi: tsukkomiHref(unit),
    moshi: unitMoshiHref(unit),
    oshieru: oshieruHref(unit),
    minutes: jugyoSpan(unit)?.minutes ?? 8,
  };
}

// ---- 小さな部品 ----

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}


const card = "flex flex-col gap-2.5 rounded-[16px] border-[1.5px] border-[#15172B] p-4 text-[#15172B] no-underline transition-shadow hover:shadow-[3px_3px_0_#15172B] focus-visible:shadow-[3px_3px_0_#15172B]";

export default function LearnHub() {
  const today = todayLecture();
  const todayInfo = lectureUnitInfo(today.unit);
  const s = stats();

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
            <span className="whitespace-nowrap">勉強は、</span>
            <br />
            <span className="whitespace-nowrap">こんなに</span>
            <br className="sm:hidden" />
            <span className="whitespace-nowrap">面白かった。</span>
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

        {/* 1.5 はじめての方へ (/start の ABC テストの入口) */}
        <Link
          href="/start"
          className="mt-4 flex min-h-[56px] items-center gap-3 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 py-3 text-[#15172B] no-underline shadow-[0_3px_0_#15172B]"
        >
          <span className="rounded-full bg-[#15172B] px-2.5 py-1 text-[11.5px] font-black text-[#FFE45C]">はじめての方へ</span>
          <span className="min-w-0 flex-1 text-[14px] font-black leading-snug">授業・問題演習・模試まで、ここで何ができるか</span>
          <Arrow className="shrink-0" />
        </Link>

        <LearnTutorial u={tutorialUnit()} links={{ note: "/learn/note", zukan: ZUKAN_HREF, dashboard: "/learn/gakko/dashboard", exam: "/learn/koko-moshi" }} />

        {/* 6.5 模試 */}
        <section aria-labelledby="moshi-heading" className="mt-12 rounded-[20px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white shadow-[4px_4px_0_#B42318] sm:p-5">
          <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#FFE45C]">いまの力が、点数でわかる</p>
          <h2 id="moshi-heading" className="m-0 mt-1 text-[21px] font-black">
            模試で、いまの力を測る
          </h2>
          <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#C9CEF2]">本番と同じ時間で解いて、大問別・単元別に弱いところがわかります。登録なしで1回、無料登録で月2回。</p>
          <ul className="m-0 mt-3 grid list-none gap-3 p-0 sm:grid-cols-2">
            {[
              { href: "/learn/koko-moshi", tag: "中3向け", name: "公立高校入試模試", desc: "国語・数学・英語・理科・社会。各50分・100点で、第1回〜第6回" },
              { href: "/learn/kyotsu-moshi", tag: "高校向け", name: "共通テスト模試", desc: "国語・数学・英語（リーディング・リスニング）・情報Ⅰ・理科・地理歴史・公民" },
              { href: "/learn/daigaku-moshi", tag: "高校向け", name: "大学別模試", desc: "早慶上智・MARCH・東大・京大・一橋・阪大の日本史・世界史を、大学ごとの出題形式に寄せて" },
            ].map((x) => (
              <li key={x.href}>
                <Link href={x.href} className="flex h-full flex-col gap-1.5 rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                  <span className="w-fit rounded-full bg-[#FFE45C] px-2 py-0.5 text-[11.5px] font-black">{x.tag}</span>
                  <span className="flex items-center justify-between gap-2 text-[18px] font-black">
                    {x.name}
                    <Arrow />
                  </span>
                  <span className="text-[13px] font-bold leading-relaxed text-[#3A3D55]">{x.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
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
              ["テストで忘れる", "教えて自分のものに", "AIの生徒ハルに説明する（試作）"],
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

        {/* 6.4 特別授業 */}
        <section aria-labelledby="tokubetsu-heading" className="mt-12">
          <Link href="/learn/tokubetsu/shoin" className="flex flex-col gap-2 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-[18px] text-[#15172B] no-underline shadow-[4px_4px_0_#B42318]">
            <span className="text-[12px] font-black tracking-[0.1em] text-[#B42318]">特別授業・大人の教養にも</span>
            <span id="tokubetsu-heading" className="flex items-center justify-between gap-2 text-[19px] font-black leading-[1.4]">
              吉田松陰と松下村塾
              <Arrow className="shrink-0" />
            </span>
            <span className="text-[13px] leading-[1.75] text-[#3A3D55]">『士規七則』『留魂録』を原文で読み、新しい塾生として6講を受ける。志の立て方から、光と影まで。</span>
          </Link>
        </section>

        {/* 7. あたらしいがっこう */}
        <section aria-labelledby="school-heading" className="mt-12">
          <Link href="/learn/gakko" className="flex flex-col gap-2.5 rounded-[18px] bg-[#15172B] p-[18px] text-white no-underline shadow-[4px_4px_0_#1533B8] transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5">
            <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#FFE45C]">あたらしいがっこう</p>
            <h2 id="school-heading" className="m-0 text-[18px] font-black leading-[1.5]">
              ここで学んだ一日が、あなたの出席になる。
            </h2>
            <p className="m-0 text-[13px] leading-[1.8] text-[#C9CEF2]">
              毎日自動でできる4コマの時間割。読み終えたら、きょうの出席。時間割も、教室も、先生役も。あなたがひらく、自分だけの学校。
            </p>
            <span className="mt-1 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-[#FFE45C] px-5 text-[15px] font-black text-[#15172B]">
              まなぶ
              <Arrow />
            </span>
          </Link>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <NoteLink />
          <span className="text-[12.5px] text-[#3A3D55]">ドリルでまちがえた問題が自動でたまります</span>
          <ZukanLink href={ZUKAN_HREF} />
        </div>
      </div>

      <div className="mt-14">
        <LearnMoreMap />
      </div>

      <p className="mb-0 mt-8 text-center text-[11px] leading-[1.7] text-[#5A5D73]">登録なし・無料　／　音声：VOICEVOX ほか</p>
    </LearnShell>
  );
}
