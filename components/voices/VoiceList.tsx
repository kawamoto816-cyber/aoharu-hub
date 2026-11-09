import { listPublishedVoices } from "@/lib/voices/store";

// 利用者の声（本人が載せてよいと選び、社内で「載せる」にしたものだけ）。1件も無いときは何も出さない。
const KIND_LABEL: Record<string, string> = { shibo: "志望理由書", shoronbun: "小論文", jiko: "自己推薦書" };

export async function VoiceList({ title = "使った人の声", className = "" }: { title?: string; className?: string }) {
  const voices = await listPublishedVoices(6);
  if (voices.length === 0) return null;
  return (
    <section className={className}>
      <h2 className="text-xl font-black">{title}</h2>
      <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2">
        {voices.map((v) => (
          <li key={v.id} className="rounded-2xl border border-[#15172B]/20 bg-white p-4">
            <p className="m-0 text-sm leading-relaxed">「{v.comment}」</p>
            <p className="mb-0 mt-2 text-xs font-bold text-[#5A5D73]">
              {v.grade}
              {KIND_LABEL[v.kind] ? `・${KIND_LABEL[v.kind]}` : ""}
              {v.before_score != null && v.after_score != null ? `・${v.before_score}点 → ${v.after_score}点` : ""}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] text-[#5A5D73]">ご本人の了承を得て、名前を伏せて載せています。</p>
    </section>
  );
}
