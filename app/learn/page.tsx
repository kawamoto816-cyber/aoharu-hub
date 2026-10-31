import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { TOPICS } from "@/lib/learn/topics";
import { LegacyHashRedirect } from "@/components/learn/LegacyHashRedirect";

// /learn: アオハルラーンの入口。3つの棚を並べる。
//   SCHOOL  学校の教科 (数学など。いまは中学数学 計算50段)
//   APPLY   選ばれる力 (総合型選抜・推薦入試・就活。スキル盤とカード) → /learn/apply
//   ADVANCE 知のアドバンス (いまの裏面と知の図書館) → /learn/apply#ura
// 学び方は「覚える・鍛える・教える」の3つのエンジン。

const URL = "https://app.bluespring.co.jp/learn";
const TITLE = "アオハルラーン｜覚えて、鍛えて、教えろ。中学・高校の学びと入試の力を無料で｜アオハルOS";
const DESC = "学校の教科（中学数学 計算50段）、選ばれる力（総合型選抜・推薦入試の6分野カード）、知のアドバンス（知のパラダイム・地政学・知の図書館）。カードで覚え、ドリルで鍛え、AIのアプリで教えるように使う。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

const ENGINES = [
  { name: "覚える", game: "技や呪文を覚える", how: "図解のカードと三択で、知識をためる" },
  { name: "鍛える", game: "修行・レベル上げ", how: "ドリルをその場で採点。満点まで解き直す" },
  { name: "教える", game: "師匠として技を伝える", how: "自分の言葉で書き、話し、AIに見てもらう" },
] as const;

const SCHOOL_SOON = ["日本史", "世界史", "地理", "百人一首", "ことわざ・慣用句", "英単語"];

const chip = "inline-flex min-h-[40px] items-center rounded-[12px] border-[1.5px] px-3 text-[13.5px] font-black no-underline";

export default function LearnHub() {
  const apply = TOPICS.filter((t) => !t.homeHref);
  const advance = TOPICS.filter((t) => t.homeHref);
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { label: "まなぶ" }]}>
      <LegacyHashRedirect />
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AOHARU LEARN　アオハルラーン</p>
      <h1 className="m-0 mt-1 text-[30px] font-black leading-snug sm:text-[40px]">
        覚えて、鍛えて、<span className="bg-[linear-gradient(transparent_58%,#FFE45C_58%)]">教えろ。</span>
      </h1>
      <p className="mb-0 mt-3 max-w-[680px] text-[15px] leading-[1.9] text-[#3A3D55]">
        勉強を、攻略サイトを見ながら自分でクリアしていくゲームのように。カードで覚え、ドリルで鍛え、最後は人に教えられるところまで。登録なし・無料で使えます。
      </p>

      <ul className="m-0 mt-6 grid list-none gap-3 p-0 sm:grid-cols-3">
        {ENGINES.map((e) => (
          <li key={e.name} className="rounded-[16px] border-[1.5px] border-[#15172B] bg-white px-4 py-3">
            <p className="m-0 text-[18px] font-black">{e.name}</p>
            <p className="m-0 mt-0.5 text-[12px] font-bold text-[#1533B8]">{e.game}</p>
            <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">{e.how}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-6">
        <section aria-labelledby="shelf-school" className="rounded-[20px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[6px_6px_0_#15172B] sm:p-6">
          <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">SCHOOL</p>
          <h2 id="shelf-school" className="m-0 mt-0.5 text-[22px] font-black">
            学校の教科
          </h2>
          <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">中学・高校の教科を、覚える・鍛えるで攻略する棚。まずは数学から。</p>
          <Link href="/learn/math" className="mt-4 flex flex-wrap items-center gap-3 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-4 py-3 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
            <span className="rounded-full bg-[#15172B] px-2.5 py-0.5 text-[11px] font-black text-[#FFE45C]">鍛える</span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[16px] font-black">数学：中学数学 計算50段</span>
              <span className="text-[12.5px] text-[#3A3D55]">正負の数から二次方程式まで。その場で採点、満点まで解き直し</span>
            </span>
            <span aria-hidden="true" className="text-lg font-black">→</span>
          </Link>
          <p className="m-0 mt-4 text-[12px] font-bold text-[#3A3D55]">準備中（覚える）</p>
          <ul className="m-0 mt-1.5 flex list-none flex-wrap gap-2 p-0">
            {SCHOOL_SOON.map((s) => (
              <li key={s} className={`${chip} border-dashed border-[#9A9CB0] text-[#5A5D73]`}>
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="shelf-apply" className="rounded-[20px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[6px_6px_0_#15172B] sm:p-6">
          <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">APPLY</p>
          <h2 id="shelf-apply" className="m-0 mt-0.5 text-[22px] font-black">
            選ばれる力
          </h2>
          <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">総合型選抜・推薦入試、その先の就職活動。点数ではなく「人」を見る選考で選ばれるための棚。カードで覚え、テンサクン・メンサツで教えるように書き、話す。</p>
          <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
            {apply.map((t) => (
              <li key={t.key}>
                <Link href={t.basePath} className={`${chip} border-[#15172B] bg-white text-[#15172B]`}>
                  {t.label}
                  <span className="ml-1.5 text-[11px] font-bold text-[#5A5D73]">{t.cards.length}枚</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/learn/apply" className="mt-4 inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-6 text-[15px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]">
            スキル盤を開く →
          </Link>
        </section>

        <section aria-labelledby="shelf-advance" className="rounded-[20px] border-[1.5px] border-[#15172B] bg-[#FFF4DE] p-5 shadow-[6px_6px_0_#15172B] sm:p-6">
          <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">ADVANCE</p>
          <h2 id="shelf-advance" className="m-0 mt-0.5 text-[22px] font-black">
            知のアドバンス
          </h2>
          <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">さらなる知の森へ。ものの見方そのものを問い直し、古典とともに考えを深める上級の階です。入口の「知のパラダイム」と各領域の第1章、図書館の10冊は無料です。</p>
          <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
            {advance.map((t) => (
              <li key={t.key}>
                <Link href={t.basePath} className={`${chip} border-[#15172B] bg-white text-[#15172B]`}>
                  {t.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/learn/library" className={`${chip} border-[#15172B] bg-[#15172B] text-white`}>
                知の図書館（名著30冊）
              </Link>
            </li>
          </ul>
          <Link href="/learn/apply#ura" className="mt-4 inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B] px-6 text-[15px] font-black text-white no-underline shadow-[0_4px_0_#F4B860]">
            裏面のスキル盤を開く →
          </Link>
        </section>
      </div>
    </LearnShell>
  );
}
