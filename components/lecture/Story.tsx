import type { LectureStory } from "@/lib/lecture/types";
import { Rich } from "./Rich";
import { Bubble, ManzaiView } from "./Manzai";
import { ComicStrip } from "./Comic";
import { NovelView } from "./Novel";
import { manzaiAudio, novelAudio } from "@/lib/tts/yomi";

// 物語化パート：小説・4コマ・漫才。どれも「創作」の札と、史実との関係の注を必ず出す。

const LABEL = { novel: "物語で読む", manga4: "4コマで読む", manzai: "漫才で読む" } as const;

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

      {story.kind === "novel" && <NovelView paragraphs={story.paragraphs} srcs={story.paragraphs.map((p, i) => novelAudio(p, story.sayFix, story.say?.[i]).src)} />}

      {story.kind === "manga4" && story.panels.every((p) => p.art) && <ComicStrip panels={story.panels} />}

      {story.kind === "manga4" && !story.panels.every((p) => p.art) && (
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
        <ManzaiView cast={story.cast} lines={story.lines} srcs={story.lines.map((l) => manzaiAudio(story.cast, l).src)} />
      )}

      <p className="m-0 mt-4 rounded-[10px] bg-white/70 px-3 py-2 text-[12px] leading-relaxed text-[#3A3D55]">
        <Rich text={story.note} />
      </p>
    </section>
  );
}
