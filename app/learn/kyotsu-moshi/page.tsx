import type { Metadata } from "next";
import Link from "next/link";
import { SeriesPage } from "@/components/exam/SeriesPage";

// /learn/kyotsu-moshi: 共通テスト模試 (高校向け)。共通テスト型 (lib/exam) の19の型を、第1回〜の回にして出す。

const URL = "https://app.bluespring.co.jp/learn/kyotsu-moshi";
const TITLE = "共通テスト模試（国語・数学・英語・情報Ⅰ・理科・地歴・公民）｜マーク式で時間を計って解く｜アオハルラーン｜アオハルOS";
const DESC = "国語（90分・200点）、数学Ⅰ・A、数学Ⅱ・B・C（各70分）、英語リーディング（80分）、英語リスニング（読み上げ音声つき・30分）、情報Ⅰ（60分）、理科（物理・化学・生物・地学と各基礎）、地理歴史・公民（地理総合・地理探究、歴史総合・日本史探究、歴史総合・世界史探究、公共・倫理、公共・政治経済）。マーク式の大問構成で、第1回〜第6回は同じ問題、おまかせは毎回ちがう問題。問題はすべてオリジナルの予想問題です。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function KyotsuMoshiPage() {
  return (
    <SeriesPage
      extra={
        <aside aria-label="共通テスト 直前コース" className="mt-6 max-w-[720px] rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
          <p className="m-0 text-[15px] font-black">共通テスト 直前コース</p>
          <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">模試の結果から、目標まであと何点・どの大問・どの単元かを作戦表にして、試験日までの計画を作ります。診断・作戦表・最初の1週間は無料です。</p>
          <Link href="/station/course/kyotsu" className="mt-2 inline-flex min-h-[40px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 text-[13px] font-black text-[#15172B] no-underline">
            計画を作る →
          </Link>
        </aside>
      }
      id="kyotsu"
      lead="選択肢と数値で答えるマーク式の練習です。国語・数学・英語・情報Ⅰ・理科・地理歴史・公民の19の型を、時間を計って解きます。英語リスニングは、端末の読み上げ音声で放送が流れます（イヤホンがおすすめ）。理科の基礎科目は1つ30分・50点なので、2つ解くと本番と同じ60分・100点になります。"
      howto={["型と回をえらぶ（同じ回は、だれが解いても同じ問題）", "時間を計って解く。時間になると自動で提出", "大問別・単元別の得点を見て、弱い単元の解説と単元模試へ"]}
    />
  );
}
