import { lectureHref, lectureUnitInfo } from "@/lib/lecture";
import { plain, type OshieruUnit } from "./index";
import type { OshieruPublic } from "./types";

// ページ（サーバーコンポーネント）がクライアントに渡す形に直す。

/** クライアントに渡してよい情報だけを取り出す（言い直しのまちがいの有無・採点の条件は渡さない） */
export function toPublic(u: OshieruUnit): OshieruPublic {
  const info = lectureUnitInfo(u.set.unit);
  const used = u.set.misconceptions.map((m) => m.mistake).filter((i): i is number => i !== null);
  // 理由型（mistake が null）のときは、もとにした節の reveal を「正しい説明」として見せる
  const reasonAnswers = u.set.misconceptions
    .filter((m) => m.mistake === null && m.section !== undefined)
    .map((m) => {
      const sec = u.lecture.sections[m.section!];
      return { wrong: m.belief, right: plain(sec?.body ?? ""), why: plain(sec?.reveal ?? "") };
    });
  return {
    unit: u.set.unit,
    name: info?.name ?? u.lecture.title,
    label: info ? `${info.group}${info.subject}` : "",
    grade: u.set.grade,
    topic: u.set.topic,
    opener: u.set.misconceptions[0].opener,
    hints: u.set.hints,
    wordCards: u.set.wordCards,
    answers: [...reasonAnswers, ...used.map((i) => u.lecture.mistakes[i]).filter(Boolean)].map((a) => ({ wrong: plain(a.wrong), right: plain(a.right), why: plain(a.why) })),
    lectureHref: lectureHref(u.set.unit),
  };
}

/** 台本モード（AIなし）でだけクライアントに渡す台本 */
export interface MockScript {
  lines: { say: string; face: "normal" | "thinking" | "happy" }[];
  restatement: { id: string; text: string; flawed: boolean; fix?: string };
}

export function toMockScript(u: OshieruUnit): MockScript {
  const [m0, m1] = u.set.misconceptions;
  const lines: MockScript["lines"] = [{ say: m0.probe, face: "thinking" }];
  if (m1) {
    lines.push({ say: `${m0.ack} ${m1.opener}`, face: "thinking" });
    lines.push({ say: m1.probe, face: "thinking" });
    lines.push({ say: m1.ack, face: "happy" });
  } else lines.push({ say: m0.ack, face: "happy" });
  const r = u.set.restatements.find((x) => x.flawed) ?? u.set.restatements[0];
  return { lines, restatement: { id: r.id, text: r.text, flawed: r.flawed, fix: r.fix } };
}
