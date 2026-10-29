import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { RegionCards } from "@/components/learn/RegionCards";
import { SHORONBUN } from "@/lib/learn/shoronbun";

// /learn/shoronbun: 「書く：小論文」の20枚 (5章) と仕上げのクエスト。

const URL = "https://app.bluespring.co.jp/learn/shoronbun";
const TITLE = "小論文のコツ20｜カードで覚える書き方・構成・減点対策｜アオハルOS";
const DESC = "総合型選抜・推薦入試の小論文のコツを20枚のカードで。結論は最初に、800字の字数配分、課題文型・資料型の手順、減点されやすい書き方まで、図解と三択で身につけます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function ShoronbunRegion() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { label: "書く：小論文" }]}>
      <h1 className="m-0 text-[26px] font-black sm:text-[32px]">小論文のカード 20枚</h1>
      <p className="mb-6 mt-2 text-[15px] leading-relaxed text-[#3A3D55]">土台から本番の練習まで、5章で順に進みます。各章の終わりは、テンサクンで自分の文章に試してみましょう。</p>
      <RegionCards topic={SHORONBUN} basePath="/learn/shoronbun" />
      <section className="mt-10 rounded-[18px] border-[1.5px] border-dashed border-[#15172B] bg-white p-5">
        <p className="m-0 text-xs font-black text-[#B42318]">仕上げのクエスト</p>
        <p className="m-0 mt-1.5 text-[17px] font-black">{SHORONBUN.quest}</p>
        <a
          href="/tensaku?kind=shoronbun&learn=shoronbun-quest"
          className="mt-4 inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-6 text-base font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]"
        >
          テンサクンで挑戦する
        </a>
      </section>
    </LearnShell>
  );
}
