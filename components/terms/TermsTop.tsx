import { LearnShell } from "@/components/learn/LearnShell";
import { TermTodayLoader } from "./TermLoaders";
import { TERM_SETS, setGroups, termCount, unitGroup, unitName, type TermSetKey } from "@/lib/terms";

// /learn/rika・/learn/shakai の中身 (サーバー側)。今日の修行と、学年・単元ごとの語句の一覧 (各単元から修行に入れる)。

export function TermsTop({ setKey, lead }: { setKey: TermSetKey; lead: string }) {
  const set = TERM_SETS[setKey];
  const grades = setGroups(set);
  const total = termCount(set);
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: `${set.name}の重要語句` }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">{set.eyebrow}</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">
        {set.name}の重要語句<span className="ml-2 text-[15px] font-bold text-[#3A3D55]">{total}語</span>
      </h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">{lead}</p>
      <div className="mt-6">
        <TermTodayLoader setKey={setKey} />
      </div>
      <section aria-labelledby="units-h" className="mt-10">
        <h2 id="units-h" className="m-0 text-[20px] font-black">
          単元ごとの重要語句
        </h2>
        {grades.map((g) => (
          <div key={g} className="mt-5">
            <h3 className="m-0 text-[17px] font-black">{g}</h3>
            <div className="mt-2 grid gap-2">
              {set.units
                .filter((u) => unitGroup(u.unit) === g)
                .map((u) => (
                  <details key={u.unit} id={u.unit} className="scroll-mt-4 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
                    <summary className="flex cursor-pointer flex-wrap items-center gap-2 text-[15px] font-black">
                      <span className="min-w-0 flex-1">{unitName(u.unit)}</span>
                      <span className="text-[12px] font-bold text-[#3A3D55]">{u.items.length}語</span>
                      <a href={`/learn/lecture/${u.unit}`} className="inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-[#1533B8] bg-[#1533B8] px-3.5 text-[13px] font-black text-white no-underline">
                        図解で読む
                      </a>
                      <a href={`/learn/${setKey}/play?g=${u.unit}`} className="inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3.5 text-[13px] font-black text-[#15172B] no-underline">
                        この単元を覚える
                      </a>
                    </summary>
                    <dl className="m-0 mt-2 grid gap-1.5 sm:grid-cols-2">
                      {u.items.map((x) => (
                        <div key={x.t} className="rounded-lg bg-[#F7F6F1] px-3 py-2">
                          <dt className="text-[14px] font-black">
                            {x.t}
                            <span className="ml-1 text-[11px] font-bold text-[#5A5D73]">（{x.y}）</span>
                          </dt>
                          <dd className="m-0 text-[13px] leading-relaxed text-[#3A3D55]">{x.d}</dd>
                        </div>
                      ))}
                    </dl>
                  </details>
                ))}
            </div>
          </div>
        ))}
      </section>
    </LearnShell>
  );
}
