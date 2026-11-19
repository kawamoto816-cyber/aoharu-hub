"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BONUS_SEASONS, LESSONS } from "@/lib/station/demo";
import { LOG_MIN_VOTES, STAR_MIN_LESSONS, STAR_RULE, byLog, byStars, teacherCards } from "@/lib/station/rating";
import { useStation } from "@/lib/station/store";
import { Coin, Stars } from "./StationNav";

export function Ranking() {
  const s = useStation();
  const cards = useMemo(() => {
    const extra = Object.fromEntries(Object.entries(s.ratings).map(([k, v]) => [k, [v]]));
    return teacherCards(LESSONS, extra, s.tips);
  }, [s.ratings, s.tips]);
  const first = (nick: string) => LESSONS.find((l) => l.teacher === nick)!.id;
  return (
    <div className="mt-4 grid gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[14px] border-[2px] border-[#15172B] bg-white p-4">
          <h2 className="m-0 text-[18px] font-black">マナビシュラン</h2>
          <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">
            授業ごとの「わからせ点」（AI点検と、確かめの1問の正答率を半分ずつ）の平均で星をつけます。授業{STAR_MIN_LESSONS}回から。生徒の人気は入れません。
          </p>
          <p className="m-0 mt-1 text-[12px] text-[#5A5D73]">{STAR_RULE.map((r) => `${"★".repeat(r.stars)} ${r.text}`).join("　")}</p>
          <ol className="m-0 mt-3 list-none p-0">
            {byStars(cards).map((c, i) => (
              <li key={c.nick} className="flex items-center gap-2 border-t border-[#E4E2D8] py-2">
                <span className="w-6 text-center text-[14px] font-black">{i + 1}</span>
                <Link href={`/station/stage/${first(c.nick)}`} className="font-black text-[#15172B] no-underline hover:underline">{c.nick}</Link>
                <span className="text-[12px] text-[#5A5D73]">{c.grade}・{c.subjects.join("・")}</span>
                <span className="ml-auto text-[12px] text-[#5A5D73]">{c.lessons.length < STAR_MIN_LESSONS ? `授業${c.lessons.length}回（星は${STAR_MIN_LESSONS}回から）・` : ""}わからせ点 {c.point}</span>
                <Stars n={c.stars} />
              </li>
            ))}
          </ol>
        </section>
        <section className="rounded-[14px] border-[2px] border-[#15172B] bg-white p-4">
          <h2 className="m-0 text-[18px] font-black">マナビログ</h2>
          <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">
            授業を受けた生徒の評価だけで格付けします（ザガットの考え方）。わかりやすさ・ていねいさ・また受けたい、それぞれ30点満点。{LOG_MIN_VOTES}票から格付けします。
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left text-[11.5px] text-[#5A5D73]">
                  <th className="py-1 pr-2">順位</th>
                  <th className="py-1 pr-2">先生役</th>
                  <th className="py-1 pr-2 text-right">わかり</th>
                  <th className="py-1 pr-2 text-right">ていねい</th>
                  <th className="py-1 pr-2 text-right">また</th>
                  <th className="py-1 pr-2 text-right">総合</th>
                  <th className="py-1 text-right">票</th>
                </tr>
              </thead>
              <tbody>
                {byLog(cards).map((c, i) => {
                  const rated = c.votes >= LOG_MIN_VOTES;
                  return (
                    <tr key={c.nick} className="border-t border-[#E4E2D8]">
                      <td className="py-2 pr-2 font-black">{rated ? i + 1 : "—"}</td>
                      <td className="py-2 pr-2">
                        <Link href={`/station/stage/${first(c.nick)}`} className="font-black text-[#15172B] no-underline hover:underline">{c.nick}</Link>
                      </td>
                      <td className="py-2 pr-2 text-right">{c.clear}</td>
                      <td className="py-2 pr-2 text-right">{c.care}</td>
                      <td className="py-2 pr-2 text-right">{c.again}</td>
                      <td className="py-2 pr-2 text-right text-[15px] font-black">{rated ? c.total : "集まり中"}</td>
                      <td className="py-2 text-right text-[#5A5D73]">{c.votes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
        <h2 className="m-0 text-[16px] font-black"><Coin /> 受けとった感謝のコイン</h2>
        <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
          {[...cards].sort((a, b) => b.coins - a.coins).map((c) => (
            <li key={c.nick} className="rounded-full border border-[#C9C7BD] bg-[#F7F6F1] px-3 py-1 text-[13px]">
              <b>{c.nick}</b> {c.coins}
            </li>
          ))}
        </ul>
        <p className="m-0 mt-3 text-[12.5px] leading-relaxed text-[#3A3D55]">
          ボーナス期（{BONUS_SEASONS.join("・")}）に、マナビシュラン・マナビログ・受けとったコインをもとに、上位の先生役に会社から報酬や景品を出す予定です。
          <b>報酬・景品のしくみは、法律の確認が済むまで動かしません。</b>コインはお金で買えず、換金もできません。
        </p>
      </section>
    </div>
  );
}
