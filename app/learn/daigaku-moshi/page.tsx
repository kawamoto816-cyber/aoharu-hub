import type { Metadata } from "next";
import { SeriesPage } from "@/components/exam/SeriesPage";
import { UNIV_EXAMS } from "@/lib/exam/univ";

// /learn/daigaku-moshi: 大学別模試 (高校向け)。大学別型 (lib/exam/univ) を、第1回〜の回にして出す。
// 並び: 早慶上智 → MARCH → 国公立 (それぞれ偏差値の高い順)。

const URL = "https://app.bluespring.co.jp/learn/daigaku-moshi";
const TITLE = "大学別模試（早慶上智・MARCH・国公立の日本史・世界史）｜出題形式に寄せたオリジナル問題｜アオハルラーン｜アオハルOS";
const DESC = "早稲田・慶應・上智、明治・青山学院・立教・中央・法政などの日本史・世界史を、大学ごとの大問構成・時間・問い方（正誤判定・史料・記述）に寄せて解く練習。解くたびに問題の組み合わせが変わり、まちがえた単元は次の回に多めに出せます。問題はすべてオリジナルの予想問題です。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function DaigakuMoshiPage() {
  return (
    <SeriesPage
      id="daigaku"
      lead="志望大学の出題形式に寄せた日本史・世界史の模試です。大問の数・時間・問い方を大学ごとに変えています。第1回〜第6回は同じ問題、おまかせは毎回ちがう組み合わせ。結果画面から、つまずきの根っこ探し（さかのぼり）と、苦手に合わせた次の回へ進めます。"
      howto={["大学と科目、回をえらぶ", "本番の時間で解く。時間になると自動で提出", "大問別・単元別の結果から、根っこの単元へさかのぼって学びなおす"]}
      extra={
        UNIV_EXAMS.length > 0 && (
          <section aria-labelledby="univ-basis" className="mt-6 max-w-[720px]">
            <h2 id="univ-basis" className="m-0 text-[16px] font-black">
              各大学型の形式
            </h2>
            <ul className="m-0 mt-2 grid list-none gap-2 p-0">
              {UNIV_EXAMS.map((u) => (
                <li key={u.key} className="rounded-[12px] bg-[#F7F6F1] p-3 text-[13px] leading-relaxed">
                  <span className="font-black">
                    {u.univ}型　{u.kamoku}
                  </span>
                  <span className="ml-1.5 text-[12px] font-bold text-[#5A5D73]">
                    {u.minutes}分・{u.basis}
                  </span>
                  <span className="mt-0.5 block text-[#3A3D55]">{u.format}</span>
                </li>
              ))}
            </ul>
          </section>
        )
      }
    />
  );
}
