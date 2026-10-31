import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { LegacyHashRedirect } from "@/components/learn/LegacyHashRedirect";
import { TOPICS } from "@/lib/learn/topics";

// /learn: アオハルラーンの入口。
// 横軸 = 学びの段階 (①覚える → ②鍛える → ③教える)、縦軸 = 棚 (SCHOOL・APPLY・ADVANCE) の 3×3 の表で見せる。
//   SCHOOL  学校の教科 (いまは中学数学 計算50段)
//   APPLY   選ばれる力 (総合型選抜・推薦入試・就活。スキル盤とカード、11のアプリ) → /learn/apply
//   ADVANCE 知のアドバンス (裏面と知の図書館) → /learn/apply#ura
// まだないマスは「準備中」として点線で見せる (③教えるは「オシエル」。全単元の覚える・鍛えるがそろってから作る)。

const URL = "https://app.bluespring.co.jp/learn";
const TITLE = "アオハルラーン｜覚えて、鍛えて、教えろ。中学・高校の学びと入試の力を無料で｜アオハルOS";
const DESC = "①覚える ②鍛える ③教える の3段階で、学校の教科（中学数学 計算50段）、選ばれる力（総合型選抜・推薦入試のカードとAIアプリ）、知のアドバンス（知のパラダイム・地政学・知の図書館）を学ぶ。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

const STAGES = [
  { no: "①", name: "覚える", game: "技や呪文を覚える", how: "図解のカードや診断で、知識をためる" },
  { no: "②", name: "鍛える", game: "修行・レベル上げ", how: "その場で採点・指摘。直して、また挑む" },
  { no: "③", name: "教える", game: "師匠として技を伝える", how: "自分の言葉で説明できたら、マスター" },
] as const;

type Item = { label: string; href: string; external?: boolean; sub?: string };
type Cell = { items: Item[]; soon?: string[]; note?: string };
type Row = { key: string; en: string; title: string; lead: string; cta?: { label: string; href: string }; tint: string; cells: [Cell, Cell, Cell] };

const OSHIERU: Cell = { items: [], soon: ["オシエル"], note: "AIの弟子に教える。全単元の①②がそろったら開講" };

function rows(): Row[] {
  const apply = TOPICS.filter((t) => !t.homeHref);
  const advance = TOPICS.filter((t) => t.homeHref);
  return [
    {
      key: "school",
      en: "SCHOOL",
      title: "学校の教科",
      lead: "中学・高校の教科を攻略する",
      tint: "bg-white",
      cells: [
        { items: [], soon: ["日本史", "世界史", "地理", "百人一首", "ことわざ・慣用句", "英単語"] },
        { items: [{ label: "数学：計算50段", href: "/learn/math", sub: "その場で採点・満点まで解き直し" }] },
        OSHIERU,
      ],
    },
    {
      key: "apply",
      en: "APPLY",
      title: "選ばれる力",
      lead: "総合型選抜・推薦入試、その先の就活",
      cta: { label: "スキル盤を開く", href: "/learn/apply" },
      tint: "bg-white",
      cells: [
        {
          items: [
            ...apply.map((t) => ({ label: t.label, href: t.basePath })),
            { label: "16カラー診断", href: "https://color.bluespring.co.jp", external: true },
            { label: "ジココーテー", href: "https://kotei.bluespring.co.jp", external: true },
            { label: "キャリキャラ", href: "https://career.bluespring.co.jp", external: true },
            { label: "キャリデザ", href: "https://cd.bluespring.co.jp", external: true },
            { label: "edufit", href: "https://edufit.bluespring.co.jp", external: true },
            { label: "キャンパスコープ", href: "https://campus.bluespring.co.jp", external: true },
            { label: "コーポレートスコープ", href: "https://corporate-scope.bluespring.co.jp", external: true },
          ],
        },
        {
          items: [
            { label: "テンサクン", href: "/tensaku", sub: "志望理由書・小論文の添削" },
            { label: "メンサツ", href: "https://interview.bluespring.co.jp", external: true, sub: "AIと面接練習" },
            { label: "しぼりゆ", href: "https://reason.bluespring.co.jp", external: true, sub: "志望理由書を組み立てる" },
            { label: "ジコアピ", href: "https://jkap.bluespring.co.jp", external: true, sub: "自己PRをつくる" },
          ],
        },
        OSHIERU,
      ],
    },
    {
      key: "advance",
      en: "ADVANCE",
      title: "知のアドバンス",
      lead: "さらなる知の森へ。ものの見方と古典",
      cta: { label: "裏面のスキル盤を開く", href: "/learn/apply#ura" },
      tint: "bg-[#FFF4DE]",
      cells: [
        { items: [...advance.map((t) => ({ label: t.label, href: t.basePath })), { label: "知の図書館（名著30冊）", href: "/learn/library" }] },
        { items: [{ label: "2つのレンズで書く", href: "/tensaku?kind=shoronbun&learn=paradigm-quest", sub: "テンサクンで小論文" }] },
        OSHIERU,
      ],
    },
  ];
}

const chipLink = "inline-flex min-h-[36px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-2.5 text-[13px] font-black text-[#15172B] no-underline hover:bg-[#FFFBE6]";
const chipSoon = "inline-flex min-h-[36px] items-center rounded-[10px] border-[1.5px] border-dashed border-[#9A9CB0] px-2.5 text-[13px] font-bold text-[#5A5D73]";

function CellView({ cell, stage }: { cell: Cell; stage: (typeof STAGES)[number] }) {
  const empty = cell.items.length === 0;
  return (
    <div className={`min-w-0 rounded-[14px] border-[1.5px] p-3 ${empty ? "border-dashed border-[#9A9CB0] bg-white/50" : "border-[#15172B] bg-white"}`}>
      <p className="m-0 mb-2 text-[11px] font-black text-[#1533B8] lg:hidden">
        {stage.no} {stage.name}
      </p>
      {cell.items.length > 0 && (
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {cell.items.map((it) => (
            <li key={it.label} className={it.sub ? "w-full" : ""}>
              {it.sub ? (
                <a href={it.href} target={it.external ? "_blank" : undefined} rel={it.external ? "noopener" : undefined} className="flex flex-col rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-3 py-2 text-[#15172B] no-underline shadow-[2px_2px_0_#15172B]">
                  <span className="text-[14px] font-black">
                    {it.label}
                    {it.external && <span aria-hidden="true"> ↗</span>}
                  </span>
                  <span className="text-[11.5px] text-[#3A3D55]">{it.sub}</span>
                </a>
              ) : it.external ? (
                <a href={it.href} target="_blank" rel="noopener" className={chipLink}>
                  {it.label}
                  <span aria-hidden="true" className="ml-0.5 text-[11px]">↗</span>
                </a>
              ) : (
                <Link href={it.href} className={chipLink}>
                  {it.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
      {cell.soon && (
        <>
          {cell.items.length > 0 && <p className="m-0 mt-2 text-[11px] font-bold text-[#5A5D73]">準備中</p>}
          <ul className="m-0 mt-1 flex list-none flex-wrap gap-1.5 p-0">
            {cell.soon.map((s) => (
              <li key={s} className={chipSoon}>
                {s}
              </li>
            ))}
          </ul>
          <p className="m-0 mt-2 text-[11.5px] font-bold text-[#5A5D73]">{cell.note ?? "準備中"}</p>
        </>
      )}
    </div>
  );
}

export default function LearnHub() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { label: "まなぶ" }]}>
      <LegacyHashRedirect />
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AOHARU LEARN　アオハルラーン</p>
      <h1 className="m-0 mt-1 text-[30px] font-black leading-snug sm:text-[40px]">
        覚えて、鍛えて、<span className="bg-[linear-gradient(transparent_58%,#FFE45C_58%)]">教えろ。</span>
      </h1>
      <p className="mb-0 mt-3 max-w-[680px] text-[15px] leading-[1.9] text-[#3A3D55]">
        勉強を、攻略サイトを見ながら自分でクリアしていくゲームのように。①覚えて、②鍛えて、③人に教えられたらマスター。登録なし・無料で使えます。
      </p>

      <ol className="m-0 mt-6 grid list-none gap-2 p-0 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch">
        {STAGES.map((s, i) => (
          <li key={s.no} className="contents">
            {i > 0 && (
              <span aria-hidden="true" className="hidden self-center text-xl font-black text-[#1533B8] sm:block">
                →
              </span>
            )}
            <div className="rounded-[16px] border-[1.5px] border-[#15172B] bg-white px-4 py-3">
              <p className="m-0 text-[18px] font-black">
                <span className="text-[#1533B8]">{s.no}</span> {s.name}
              </p>
              <p className="m-0 mt-0.5 text-[12px] font-bold text-[#1533B8]">{s.game}</p>
              <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">{s.how}</p>
            </div>
          </li>
        ))}
      </ol>

      <section aria-labelledby="map-heading" className="mt-10">
        <h2 id="map-heading" className="m-0 text-[20px] font-black">
          学びの地図
        </h2>
        <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">横が段階、縦が棚。点線のマスは、これから開く場所です。</p>
        <div className="mt-4 hidden gap-3 px-3 lg:grid lg:grid-cols-[200px_1fr_1fr_1fr]">
          <span />
          {STAGES.map((s) => (
            <p key={s.no} className="m-0 text-center text-[15px] font-black">
              <span className="text-[#1533B8]">{s.no}</span> {s.name}
            </p>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-4">
          {rows().map((r) => (
            <div key={r.key} className={`grid gap-3 rounded-[20px] border-[1.5px] border-[#15172B] p-3 shadow-[5px_5px_0_#15172B] lg:grid-cols-[200px_1fr_1fr_1fr] ${r.tint}`}>
              <div className="min-w-0 px-1 py-1">
                <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">{r.en}</p>
                <p className="m-0 mt-0.5 text-[19px] font-black">{r.title}</p>
                <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">{r.lead}</p>
                {r.cta && (
                  <Link href={r.cta.href} className="mt-2 inline-flex min-h-[40px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-[#15172B] px-3 text-[12.5px] font-black text-white no-underline">
                    {r.cta.label} →
                  </Link>
                )}
              </div>
              {r.cells.map((c, i) => (
                <CellView key={i} cell={c} stage={STAGES[i]} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </LearnShell>
  );
}
