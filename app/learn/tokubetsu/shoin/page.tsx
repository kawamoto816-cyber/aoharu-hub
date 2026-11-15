import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { ShoinGraduation, ShoinRoadmap, type ShoinLesson } from "@/components/tokubetsu/ShoinSeries";
import { plain } from "@/components/lecture/Rich";
import { getLecture, lectureHref } from "@/lib/lecture";
import { jugyoHref, UNITS } from "@/lib/jugyo";
import { LEVELS } from "@/lib/school";

// /learn/tokubetsu/shoin：特別授業「吉田松陰と松下村塾」(6講) の入口。
// 大人も読める教養の読み物として、また、松下村塾の新しい塾生として順に受ける講義として。
// 講の中身は図解授業 (lib/lecture/data/h-civ-shoin-*) とちょっと待った授業 (lib/jugyo)。ここは案内・通い帳・卒業課題だけ。

const URL = "https://app.bluespring.co.jp/learn/tokubetsu/shoin";
const TITLE = "特別授業　吉田松陰と松下村塾｜原文で読む、志の立て方｜アオハルラーン｜アオハルOS";
const DESC = "『松下村塾記』『士規七則』『講孟余話』『留魂録』を原文で読み、松下村塾の新しい塾生として6講を受ける特別授業。志を立てる・書を読み行う・つまずきから学ぶ・死と志、そして『幽囚録』の対外策と後世の評価という影の部分まで。大人の教養にも。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

const GROUP = "特別授業　吉田松陰と松下村塾";

function lessons(): ShoinLesson[] {
  const g = LEVELS.find((l) => l.key === "ko")!
    .subjects.flatMap((s) => s.groups)
    .find((x) => x.title === GROUP)!;
  return g.units.map((u, i) => ({
    unit: u.id,
    no: i + 1,
    name: u.name,
    title: plain(getLecture(u.id)?.title ?? ""),
    lectureHref: lectureHref(u.id),
    jugyoHref: UNITS.includes(u.id) ? jugyoHref(u.id) : null,
  }));
}

export default function ShoinPage() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "特別授業　吉田松陰と松下村塾" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#B42318]">特別授業</p>
      <h1 className="m-0 mt-1 text-[27px] font-black leading-tight">吉田松陰と松下村塾</h1>
      <p className="m-0 mt-2 text-[15px] leading-[1.9]">
        萩の小さな塾から、明治をつくる若者たちが育ちました。教えた吉田松陰は、獄の中でも書を読み、講じ、30年に満たない生涯で多くの文章を残しています。この特別授業では、その文章を原文で読みながら、あなたは新しい塾生として6つの講義を受けます。「何のために学ぶのか」「失敗をどう受けとめるか」「志をどう立てるか」を、いまの自分のこととして考えるための授業です。
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {[
          ["原文で読む", "引用は、複数の出どころで文字を照らし合わせた原文だけ。現代語訳は書き下ろしです。"],
          ["塾生として受ける", "各講に、塾の世話役からの依頼と問い。ちょっと待った授業では、とちゅうで止まって考えます。"],
          ["光と影の両方", "尊王攘夷や『幽囚録』の対外策、のちの歴史とのかかわりも、第6講で正面から扱います。"],
        ].map(([h, b]) => (
          <div key={h} className="rounded-[14px] bg-[#F7F6F1] p-3">
            <p className="m-0 text-[14px] font-black">{h}</p>
            <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">{b}</p>
          </div>
        ))}
      </div>

      <ShoinRoadmap lessons={lessons()} />
      <ShoinGraduation />

      <aside aria-label="資料について" className="mt-8 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-4 text-[12.5px] leading-relaxed text-[#3A3D55]">
        <p className="m-0 font-black text-[#15172B]">資料について</p>
        <p className="m-0 mt-1">
          原文は、自筆本の写真版や『吉田松陰全集』を底本とするウェブ上の資料を、2つ以上照らし合わせて引いています。全集の紙の本との最終的な照合はまだです。出どころによって字がちがう箇所は、各講の中でそう書いています。
        </p>
        <p className="m-0 mt-1">物語に出てくる塾生・世話役は架空の人物です。松陰の言葉として出すのは、確かめた原文だけです。「諸君、狂いたまえ」のように、よく知られていても原典で確かめられない言葉は、松陰の言葉としては扱いません。</p>
      </aside>
      <p className="m-0 mt-5 text-[13px]">
        <Link href="/learn/lecture/h-civ-rinri-kindai-nihon" className="font-bold text-[#1533B8]">
          倫理「近代日本の思想」
        </Link>
        ・
        <Link href="/learn/lecture/h-hist-jp-bakumatsu" className="font-bold text-[#1533B8]">
          日本史「開国と幕末」
        </Link>
        もあわせて。
      </p>
    </LearnShell>
  );
}
