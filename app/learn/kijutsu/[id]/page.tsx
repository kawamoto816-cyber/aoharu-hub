import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import {
  getKijutsu,
  KIJUTSU,
  kijutsuHref,
  nextKijutsu,
  prevKijutsu,
  trackName,
} from "@/lib/kijutsu";

// /learn/kijutsu/<id>: 「記述の階段」の1段。型 → 例題 (手順どおりに解いてみせる) → 自己採点のしかた → 自分で1問。
// 答えは <details> でかくす (JavaScript なしでも使える)。

export function generateStaticParams() {
  return KIJUTSU.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const l = getKijutsu((await params).id);
  if (!l) return {};
  return {
    title: `${l.title}｜記述の階段 ${trackName(l.track)} 第${l.no}段｜アオハルラーン｜アオハルOS`,
    description: l.lead,
    robots: { index: false, follow: false },
  };
}

const card =
  "mt-4 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 sm:p-5";
const h2 = "m-0 text-[17px] font-black";
const isEn = (s: string) => /^[\x20-\x7E“”’—…]+$/.test(s);

function Text({ lines }: { lines: string[] }) {
  return (
    <div className="mt-2 rounded-[10px] bg-[#FBFAF6] p-3">
      {lines.map((t) => (
        <p
          key={t}
          lang={isEn(t) ? "en" : undefined}
          className="m-0 mt-1.5 text-[14.5px] leading-[1.9] first:mt-0"
        >
          {t}
        </p>
      ))}
    </div>
  );
}

export default async function KijutsuLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const l = getKijutsu((await params).id);
  if (!l) notFound();
  const next = nextKijutsu(l);
  const prev = prevKijutsu(l);
  const en = (s: string) => (isEn(s) ? "en" : undefined);
  return (
    <LearnShell
      narrow
      crumbs={[
        { href: "/learn", label: "まなぶ" },
        { href: "/learn/kijutsu", label: "記述の階段" },
        { label: `第${l.no}段` },
      ]}
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        記述の階段・{trackName(l.track)}・第{l.no}段
      </p>
      <h1 className="m-0 mt-1 text-[23px] font-black leading-snug">
        {l.title}
      </h1>
      <p className="m-0 mt-2 rounded-[10px] border border-[#E8C46A] bg-[#FFF8E1] p-3 text-[13.5px] leading-relaxed text-[#5A4300]">
        {l.lead}
      </p>

      <section className={card}>
        <h2 className={h2}>この段の型</h2>
        <ol className="m-0 mt-2 grid list-none gap-2 p-0">
          {l.kata.map((k, i) => (
            <li key={k} className="flex gap-2.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1533B8] text-[12px] font-black text-white">
                {i + 1}
              </span>
              <span className="text-[14px] leading-relaxed">{k}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={card}>
        <h2 className={h2}>例題：型どおりに解いてみせます</h2>
        <Text lines={l.ex.text} />
        <p className="m-0 mt-3 text-[14px] font-black leading-relaxed">
          問い　{l.ex.q}
        </p>
        <ol className="m-0 mt-3 grid list-none gap-2 p-0">
          {l.ex.steps.map(([name, body], i) => (
            <li
              key={name}
              className="rounded-[10px] border border-[#E4E2D8] p-2.5"
            >
              <p className="m-0 text-[12px] font-black text-[#1533B8]">
                手順{i + 1}　{name}
              </p>
              <p className="m-0 mt-0.5 text-[14px] leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-3 rounded-[10px] bg-[#FDECEA] p-3">
          <p className="m-0 text-[12px] font-black text-[#C0392B]">
            よくある答案（点が入りにくい）
          </p>
          <p
            lang={en(l.ex.ng.text)}
            className="m-0 mt-1 text-[14px] leading-relaxed"
          >
            {l.ex.ng.text}
          </p>
          <p className="m-0 mt-1.5 text-[13px] leading-relaxed text-[#3A3D55]">
            {l.ex.ng.why}
          </p>
        </div>
        <div className="mt-3 rounded-[10px] bg-[#F1F4FD] p-3">
          <p className="m-0 text-[12px] font-black text-[#1533B8]">解答例</p>
          <p
            lang={en(l.ex.answer)}
            className="m-0 mt-1 text-[14.5px] leading-[1.9]"
          >
            {l.ex.answer}
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2}>自分の答案の見なおし方</h2>
        <ul className="m-0 mt-2 grid list-none gap-1.5 p-0">
          {l.check.map((c) => (
            <li key={c} className="flex gap-2 text-[14px] leading-relaxed">
              <span aria-hidden className="font-black text-[#1533B8]">
                □
              </span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className={card}>
        <h2 className={h2}>自分で1問</h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          紙に答案を書いてから、解答例を開きます。文をくらべるのではなく、下の「入っているべき要素」がいくつ入っているかを数えます。
        </p>
        <Text lines={l.drill.text} />
        <p className="m-0 mt-3 text-[14px] font-black leading-relaxed">
          問い　{l.drill.q}
        </p>
        <details className="mt-3 rounded-[10px] border border-[#E4E2D8] p-3">
          <summary className="cursor-pointer text-[13px] font-black">
            ヒントを見る
          </summary>
          <p className="m-0 mt-2 text-[14px] leading-relaxed">{l.drill.hint}</p>
        </details>
        <details className="mt-2 rounded-[10px] bg-[#F1F4FD] p-3">
          <summary className="cursor-pointer text-[13px] font-black">
            解答例と、入っているべき要素を見る
          </summary>
          <p
            lang={en(l.drill.answer)}
            className="m-0 mt-2 text-[14.5px] leading-[1.9]"
          >
            {l.drill.answer}
          </p>
          <ul className="m-0 mt-2 grid list-none gap-1 p-0">
            {l.drill.points.map((p) => (
              <li key={p} className="flex gap-2 text-[13.5px] leading-relaxed">
                <span aria-hidden className="font-black text-[#1533B8]">
                  □
                </span>
                {p}
              </li>
            ))}
          </ul>
        </details>
      </section>

      <nav className="mt-5 grid gap-2" aria-label="次に進む">
        {next && (
          <Link
            href={kijutsuHref(next.id)}
            className="flex min-h-[52px] items-center justify-between gap-3 rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 py-2 text-[#15172B] no-underline"
          >
            <span className="text-[14px] font-black leading-snug">
              次の段（第{next.no}段）：{next.title}
            </span>
            <span aria-hidden className="font-black">
              →
            </span>
          </Link>
        )}
        <p className="m-0 flex flex-wrap gap-2">
          {prev && (
            <Link
              href={kijutsuHref(prev.id)}
              className="inline-flex min-h-[40px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 text-[13px] font-black text-[#15172B] no-underline"
            >
              ← 前の段（第{prev.no}段）
            </Link>
          )}
          <Link
            href="/learn/kijutsu"
            className="inline-flex min-h-[40px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 text-[13px] font-black text-[#15172B] no-underline"
          >
            段の一覧
          </Link>
          <Link
            href="/learn/niji"
            className="inline-flex min-h-[40px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 text-[13px] font-black text-[#15172B] no-underline"
          >
            本番の過去問でためす
          </Link>
        </p>
      </nav>
      <p className="m-0 mt-5 text-[12px] leading-relaxed text-[#5A5D75]">
        例文・例題・解答例は、アオハルOSが書いたオリジナルです。記述の答えは1つではありません。
      </p>
    </LearnShell>
  );
}
