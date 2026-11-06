import { GOAL_VIEWS, totalViews, type EigaRecord } from "@/lib/eiga/record";
import type { EigaMode } from "@/lib/eiga/types";

// 記録（この端末だけ）：モードごとの視聴回数・50回までの進み具合・覚えたセリフの数。

export const MODE_NAME: Record<EigaMode, string> = { kansho: "鑑賞", kaisetsu: "完全解説", hanpuku: "字幕で反復" };

export function RecordBar({ record, memorizedCount, lineCount }: { record: EigaRecord; memorizedCount: number; lineCount: number }) {
  const total = totalViews(record);
  const pct = Math.min(100, (total / GOAL_VIEWS) * 100);
  return (
    <section aria-label="あなたの記録" className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-3.5 py-3">
      <p className="m-0 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-[13px] font-black text-[#1533B8]">あなたの記録</span>
        <span className="text-[11.5px] text-[#3A3D55]">この端末にだけ保存（送信しません）</span>
      </p>
      <p className="m-0 mt-2 text-[14px] font-black">
        {GOAL_VIEWS}回まで：{total}回<span className="ml-1 text-[12px] font-bold text-[#3A3D55]">（最後まで見た回数）</span>
      </p>
      <div className="mt-1.5 h-3 overflow-hidden rounded-full border border-[#15172B] bg-[#F7F6F1]" role="progressbar" aria-valuemin={0} aria-valuemax={GOAL_VIEWS} aria-valuenow={Math.min(total, GOAL_VIEWS)} aria-label="50回までの進み具合">
        <div className="h-full bg-[#1533B8]" style={{ width: `${pct}%` }} />
      </div>
      <dl className="m-0 mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1 text-[12.5px] sm:grid-cols-4">
        {(Object.keys(MODE_NAME) as EigaMode[]).map((m) => (
          <div key={m} className="flex justify-between gap-2 sm:block">
            <dt className="text-[#3A3D55]">{MODE_NAME[m]}</dt>
            <dd className="m-0 font-black">{record.views[m]}回</dd>
          </div>
        ))}
        <div className="flex justify-between gap-2 sm:block">
          <dt className="text-[#3A3D55]">覚えたセリフ</dt>
          <dd className="m-0 font-black">
            {memorizedCount}
            {lineCount > 0 && <span className="font-bold text-[#3A3D55]">／{lineCount}</span>}
          </dd>
        </div>
      </dl>
    </section>
  );
}
