import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { ExamSetup, type SetupTree } from "@/components/exam/ExamSetup";
import { LEVELS } from "@/lib/school";
import { assemble, CHU_SUBJECTS, EXAM_HOME, examPlayHref, examSpec, getMode, MODES, NOTICE_COMMON, questionCountByUnit, subjectOf, teikiCount, type ModeId } from "@/lib/exam";

// /learn/exam/<mode>: 試験モードの「えらぶ」画面。
//   公立高校入試型・共通テスト型 … 教科 (型) ごとの大問構成と、いまの問題数で組めるか (組めなければ「まだ問題が少ない」)
//   私立入試型・定期テスト型   … 教科・単元・時間をえらぶ (components/exam/ExamSetup)

// DrillPlay は client の部品なので、そこから文字列を import するとサーバー側では使えない。ここに同じ見た目を書く
const card = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]";
const bigBtn = "flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] text-[17px] font-black";

const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return MODES.map((m) => ({ mode: m.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ mode: string }> }): Promise<Metadata> {
  const m = getMode((await params).mode);
  if (!m) return {};
  const url = `${SITE}${EXAM_HOME}/${m.id}`;
  const title = `${m.name}（${m.target}）の予想問題を本番形式で｜アオハルラーン｜アオハルOS`;
  const description = `${m.catch}。${m.lead} 問題はすべてオリジナルの予想問題です。登録なし・無料。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

function setupTree(mode: "shiritsu" | "teiki"): SetupTree[] {
  const counts = questionCountByUnit();
  return LEVELS.filter((l) => mode === "teiki" || l.key === "chu")
    .map((l) => ({
      key: l.key as SetupTree["key"],
      name: l.name,
      subjects: l.subjects
        .filter((s) => (mode === "teiki" ? !!subjectOf(l.key as SetupTree["key"], s.key) : CHU_SUBJECTS.some((c) => c.key === s.key)))
        .map((s) => ({
          key: s.key,
          name: s.name,
          groups: s.groups.map((g) => ({ title: g.title, units: g.units.map((u) => ({ id: u.id, name: u.name, count: counts[u.id] ?? 0 })).filter((u) => u.count > 0) })).filter((g) => g.units.length > 0),
        }))
        .filter((s) => mode === "shiritsu" || s.groups.length > 0),
    }))
    .filter((l) => l.subjects.length > 0);
}

export default async function ExamModePage({ params }: { params: Promise<{ mode: string }> }) {
  const m = getMode((await params).mode);
  if (!m) notFound();
  const mode = m.id as ModeId;
  const crumbs = [{ href: "/learn", label: "まなぶ" }, { href: EXAM_HOME, label: "入試モード" }, { label: m.name }];

  let body;
  if (m.pick === "subject") {
    const rows = m.subjects.map((s) => {
      const spec = examSpec(mode, { subject: s.key })!;
      return { s, spec, build: assemble(spec, 1) };
    });
    body = (
      <ul className="m-0 mt-5 grid list-none gap-4 p-0 lg:grid-cols-2">
        {rows.map(({ s, spec, build }) => (
          <li key={s.key} className={`${card} min-w-0`}>
            <h2 className="m-0 flex items-baseline justify-between gap-2 text-[20px] font-black">
              {s.name}
              <span className="shrink-0 text-[13px] font-black text-[#3A3D55]">
                {spec.minutes}分・{spec.total}点・大問{spec.sections.length}
              </span>
            </h2>
            <ol className="m-0 mt-3 grid list-none gap-1.5 p-0">
              {spec.sections.map((d, i) => {
                const short = !build.ok ? build.shortages.find((x) => x.title === d.title) : undefined;
                return (
                  <li key={d.title} className="flex items-baseline justify-between gap-2 rounded-[10px] bg-[#F7F6F1] px-3 py-2 text-[13.5px] font-bold">
                    <span className="min-w-0">
                      <span className="mr-1.5 font-black">{i + 1}</span>
                      {d.title}
                      {short && <span className="ml-1.5 text-[12px] font-black text-[#B54708]">（{short.have}/{short.need}問）</span>}
                    </span>
                    <span className="shrink-0 font-black">{d.points}点</span>
                  </li>
                );
              })}
            </ol>
            {build.ok ? (
              <Link href={examPlayHref(mode, { subject: s.key })} className={`${bigBtn} mt-4 bg-[#1533B8] text-white no-underline shadow-[0_4px_0_#0B1F7A]`}>
                {s.name}を{spec.minutes}分で解く →
              </Link>
            ) : (
              <div role="status" className="mt-4 rounded-[12px] border-[1.5px] border-[#B54708] bg-[#FFF4E5] p-3">
                <p className="m-0 text-[14.5px] font-black text-[#B54708]">この範囲はまだ問題が少ない（{build.available}問）</p>
                <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">
                  {build.shortages.map((x) => `「${x.title}」`).join("")}に出せる問題がまだそろっていません。単元模試の問題がふえると、自動で解けるようになります。
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  } else {
    const st = m.id as "shiritsu" | "teiki";
    const need: Record<number, number> = {};
    for (const min of m.minuteOptions) {
      const spec = examSpec(mode, st === "teiki" ? { level: "chu", subject: "math", units: ["j-math-1-seifu"], minutes: min } : { subject: "math", minutes: min });
      need[min] = spec ? spec.sections.reduce((a, d) => a + d.count[0], 0) : teikiCount(min);
    }
    body = <ExamSetup mode={st} tree={setupTree(st)} minuteOptions={m.minuteOptions} need={need} defaultMinutes={st === "teiki" ? 20 : 50} unitsRequired={st === "teiki"} />;
  }

  return (
    <LearnShell crumbs={crumbs}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">入試モード・{m.target}</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[30px]">{m.name}</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">{m.lead}</p>
      {body}
      <aside aria-label="ご注意" className="mt-6 max-w-[720px] rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-4 text-[12.5px] leading-relaxed text-[#3A3D55]">
        <p className="m-0 font-black text-[#15172B]">ご注意</p>
        <p className="m-0 mt-1">{m.notice}</p>
        <p className="m-0 mt-1">{NOTICE_COMMON}</p>
      </aside>
      <p className="m-0 mt-5 text-[13px]">
        <Link href={EXAM_HOME} className="font-bold text-[#1533B8]">
          ← ほかの型をえらぶ
        </Link>
      </p>
    </LearnShell>
  );
}
