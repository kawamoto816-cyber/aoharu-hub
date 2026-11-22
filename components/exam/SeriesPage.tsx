import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { SeriesBoard, type BoardSubject } from "@/components/exam/SeriesBoard";
import { assemble, EXAM_HOME, examSpec, getMode, NOTICE_COMMON } from "@/lib/exam";
import { SERIES, type Series } from "@/lib/exam/series";

// 「公立高校入試模試」「共通テスト模試」のページの中身 (サーバー側)。教科ごとの仕様を読み、第1回のシードで組めるかを見る。

// 公立高校入試模試は、ページの説明 (国語・数学・英語・理科・社会) と同じ順に並べる
const KOKO_ORDER = ["kokugo", "math", "eigo", "rika", "shakai"];

export function seriesSubjects(id: Series["id"]): BoardSubject[] {
  const s = SERIES[id];
  const m = getMode(s.mode)!;
  const rank = (k: string) => (id === "koko" && KOKO_ORDER.includes(k) ? KOKO_ORDER.indexOf(k) : 99);
  return [...m.subjects].sort((a, b) => rank(a.key) - rank(b.key)).map((x) => {
    const spec = examSpec(s.mode, { subject: x.key })!;
    return { key: x.key, name: x.name, category: x.category, minutes: spec.minutes, total: spec.total, sections: spec.sections.map((d) => d.title), ok: assemble(spec, s.seedOf(1)).ok };
  });
}

export function SeriesPage({ id, lead, howto, sumLabel, extra }: { id: Series["id"]; lead: string; howto: string[]; sumLabel?: string; extra?: React.ReactNode }) {
  const s = SERIES[id];
  const m = getMode(s.mode)!;
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { label: s.name }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">模試・{s.target}</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">{s.name}</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">{lead}</p>
      <ol className="m-0 mt-4 grid max-w-[720px] list-none gap-2 p-0 sm:grid-cols-3">
        {howto.map((t, i) => (
          <li key={i} className="flex gap-2 rounded-[12px] bg-[#F7F6F1] p-3 text-[13px] font-bold leading-relaxed">
            <span aria-hidden="true" className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#15172B] text-[12px] text-white">
              {i + 1}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
      <SeriesBoard series={id} subjects={seriesSubjects(id)} sumLabel={sumLabel} />
      {extra}
      <aside aria-label="ご注意" className="mt-6 max-w-[720px] rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-4 text-[12.5px] leading-relaxed text-[#3A3D55]">
        <p className="m-0 font-black text-[#15172B]">ご注意</p>
        <p className="m-0 mt-1">{m.notice}</p>
        <p className="m-0 mt-1">{NOTICE_COMMON}</p>
        <p className="m-0 mt-1">登録なしでは1回分、無料登録すると何回でも解けます。結果はこの端末の中に保存します。</p>
      </aside>
      <p className="m-0 mt-5 text-[13px] text-[#3A3D55]">
        範囲や時間を自分で決めて解くなら
        <Link href={EXAM_HOME} className="font-bold text-[#1533B8]">
          自習室（入試モード・テスト放題）
        </Link>
        へ。
      </p>
    </LearnShell>
  );
}
