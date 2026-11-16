import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { Avatar } from "@/components/jugyo/Avatar";
import { JugyoIndex, type JugyoEntry, type UzJugyoEntry } from "@/components/jugyo/JugyoIndex";
import { plain } from "@/components/lecture/Rich";
import {
  JUGYO_HOME,
  UNITS,
  getLessons,
  jugyoHref,
  jugyoSpan,
} from "@/lib/jugyo";
import { castCredit } from "@/lib/jugyo/audio";
import { STAGE_NAME, castsOfStage } from "@/lib/jugyo/cast";
import type { Stage } from "@/lib/jugyo/types";
import { getLecture, lectureUnitInfo } from "@/lib/lecture";
import { uzJugyoHref } from "@/lib/jugyo/uz";
import { UZ_JUGYO_PUBLIC_IDS, uzJugyoSpan } from "@/lib/jugyo/uz/lessons";
import { cardInfo } from "@/lib/unizeb";

// /learn/jugyo：ちょっと待った授業の一覧。検索に載せ、sitemap にも入れる。
// 500本をこえたので、学校 → 教科のタブと単元名の検索で、いちどに1つの教科だけを出す (components/jugyo/JugyoIndex)。
// キャラ (キャスト) の紹介は折りたたむ。どのキャストで見るかは単元のページでふり分け、授業の中でも変えられる。

const URL = `https://app.bluespring.co.jp${JUGYO_HOME}`;
const TITLE = "ちょっと待った授業｜AI時代のあたらしい授業｜アオハルラーン｜アオハルOS";
const DESC = `2人のキャラが図を見ながら話す授業。とちゅうで本当に止まって「ここで問題」。答えてから続きへ。最後は、あなたが先生役。小学校・中学校・高校の${UNITS.length}単元を、1本10分以内で。登録なし・無料。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

const STAGES: Stage[] = ["e", "j", "h"];
const LEVELS = ["小学校", "中学校", "高校"];

function entries(): JugyoEntry[] {
  const out: JugyoEntry[] = [];
  for (const unit of UNITS) {
    const info = lectureUnitInfo(unit);
    const span = jugyoSpan(unit);
    if (!info || !span) continue;
    out.push({
      href: jugyoHref(unit),
      level: info.level,
      subject: info.subject,
      group: info.group,
      name: plain(info.name),
      title: plain(getLecture(unit)?.title ?? getLessons(unit)[0]?.title ?? ""),
      minutes: span.minutes,
      stops: span.stops,
    });
  }
  return out;
}

// 起業の教科書の授業。検索中は授業の一覧と同じことばで絞りこむので、一覧 (JugyoIndex) の中に出す
function uzEntries(): UzJugyoEntry[] {
  const out: UzJugyoEntry[] = [];
  for (const id of UZ_JUGYO_PUBLIC_IDS) {
    const c = cardInfo(id);
    const span = uzJugyoSpan(id);
    if (!c || !span) continue;
    out.push({ id, href: uzJugyoHref(id), lv: c.lv, name: plain(c.name), minutes: span.minutes, stops: span.stops });
  }
  return out;
}

export default function Page() {
  const list = entries();
  return (
    <LearnShell
      narrow
      crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "ちょっと待った授業" }]}
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        AI時代のあたらしい授業
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">
        ちょっと待った授業
      </h1>
      <p className="m-0 mt-2 text-[14.5px] leading-relaxed">
        聞くだけの授業ではありません。2人のキャラが、図を見ながら話します。とちゅうで本当に止まって「ここで問題」。答えてから続きへ。最後に謎が解けたら、こんどはあなたが先生役です。
      </p>
      <p className="m-0 mt-2 text-[13px] font-bold text-[#3A3D55]">
        小学校・中学校・高校の{list.length}
        本。1本10分以内・登録なしで見られます。
      </p>

      <details className="group mt-4 rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
        <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-2 px-4 text-[14px] font-black [&::-webkit-details-marker]:hidden">
          授業のキャラと声
          <span
            aria-hidden="true"
            className="text-[12px] text-[#5A5D73] transition-transform group-open:rotate-180"
          >
            ▼
          </span>
        </summary>
        <div className="grid gap-4 border-t border-[#15172B]/15 px-4 pb-4 pt-3">
          <p className="m-0 text-[12.5px] leading-relaxed text-[#3A3D55]">
            学校ごとにキャラの組み合わせがあります。どれになるかは、はじめて見たときに決まります。
          </p>
          {STAGES.map((stage) => (
            <div key={stage}>
              <p className="m-0 text-[13px] font-black">{STAGE_NAME[stage]}</p>
              <ul className="m-0 mt-1.5 grid list-none gap-2 p-0 sm:grid-cols-2">
                {castsOfStage(stage).map((c) => (
                  <li
                    key={c.id}
                    className="rounded-[12px] bg-[#F7F6F1] px-3 py-2 text-[12.5px]"
                  >
                    <p className="m-0 font-black">{c.name}</p>
                    <p className="m-0 mt-0.5 text-[11.5px] leading-relaxed text-[#3A3D55]">
                      {c.genre}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      {(["sensei", "seito"] as const).map((w) => (
                        <span
                          key={w}
                          className="flex items-center gap-1 text-[12px] font-bold"
                        >
                          <Avatar look={c.members[w].look} size={26} />
                          {c.members[w].name}
                        </span>
                      ))}
                    </div>
                    <p className="m-0 mt-1 text-[10.5px] text-[#5A5D73]">
                      声：{castCredit(c)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>

      <JugyoIndex entries={list} levels={LEVELS} uz={uzEntries()} />
    </LearnShell>
  );
}
