import type { LectureStory } from "@/lib/lecture/types";
import { Rich } from "./Rich";

// 物語化パート：小説・4コマ・漫才。どれも「創作」の札と、史実との関係の注を必ず出す。

const LABEL = { novel: "物語で読む", manga4: "4コマで読む", manzai: "漫才で読む" } as const;

function Bubble({ who, text, side }: { who: string; text: string; side: "left" | "right" }) {
  return (
    <div className={`flex items-start gap-2 ${side === "right" ? "flex-row-reverse" : ""}`}>
      <span className={`mt-0.5 flex-none rounded-full px-2 py-0.5 text-[11px] font-black ${side === "right" ? "bg-[#1533B8] text-white" : "bg-[#15172B] text-white"}`}>{who}</span>
      <p className={`m-0 max-w-[85%] rounded-[14px] border-[1.5px] border-[#15172B] px-3 py-2 text-[14.5px] leading-relaxed ${side === "right" ? "bg-[#E6EAFB]" : "bg-white"}`}>
        <Rich text={text} />
      </p>
    </div>
  );
}

export function LectureStoryView({ story }: { story: LectureStory }) {
  return (
    <section aria-labelledby="lec-story" className="mt-10 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFF8EC] p-4 shadow-[4px_4px_0_#15172B] sm:p-5">
      <p className="m-0 flex items-center gap-2 text-[12px] font-black text-[#B42318]">
        <span className="rounded-full bg-[#B42318] px-2 py-0.5 text-white">創作</span>
        {LABEL[story.kind]}
      </p>
      <h2 id="lec-story" className="m-0 mt-1.5 text-[19px] font-black leading-snug">
        <Rich text={story.title} />
      </h2>

      {story.kind === "novel" && (
        <div className="mt-3">
          {story.paragraphs.map((p, i) => (
            <p key={i} className="m-0 mt-2.5 font-serif text-[15.5px] leading-[2] [text-indent:1em]">
              <Rich text={p} />
            </p>
          ))}
        </div>
      )}

      {story.kind === "manga4" && (
        <ol className="m-0 mt-3 grid list-none gap-3 p-0">
          {story.panels.map((pn, i) => (
            <li key={i} className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-3">
              <p className="m-0 flex items-baseline gap-2 text-[12.5px] font-bold text-[#5A5D73]">
                <span className="flex-none rounded bg-[#FFE45C] px-1.5 text-[11px] font-black text-[#15172B]">{["起", "承", "転", "結"][i] ?? i + 1}</span>
                <span>
                  <Rich text={pn.scene} />
                </span>
              </p>
              <div className="mt-2 grid gap-2">
                {pn.lines.map((l, k) => (
                  <Bubble key={k} who={l.who} text={l.text} side={k % 2 === 0 ? "left" : "right"} />
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}

      {story.kind === "manzai" && (
        <div className="mt-3 grid gap-2.5">
          {story.lines.map((l, k) => (
            <Bubble key={k} who={l.who} text={l.text} side={l.who === story.cast[1] ? "right" : "left"} />
          ))}
        </div>
      )}

      <p className="m-0 mt-4 rounded-[10px] bg-white/70 px-3 py-2 text-[12px] leading-relaxed text-[#3A3D55]">
        <Rich text={story.note} />
      </p>
    </section>
  );
}
