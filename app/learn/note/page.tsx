import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { MistakeNote } from "@/components/drill/MistakeNote";
import { DRILL_SETS, DRILL_SET_KEYS } from "@/lib/drill";
import { hasLecture, lectureHref } from "@/lib/lecture";

// /learn/note: まちがいノート。4択ドリルでまちがえた問題 (この端末に保存) を、教科・単元ごとに見て解き直す。
// ノートの中身はブラウザにしかないので、ここ (サーバー側) では図解レクチャーのある単元の一覧だけを作ってわたす。

export const metadata: Metadata = {
  title: "まちがいノート｜アオハルラーン｜アオハルOS",
  description: "4択ドリルでまちがえた問題が自動でたまるノート。2回続けて正解したら卒業。記録はこの端末に保存されます。",
  robots: { index: false, follow: true },
};

function lectureMap(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const k of DRILL_SET_KEYS) for (const u of DRILL_SETS[k].units) if (hasLecture(u.unit)) out[u.unit] = lectureHref(u.unit);
  return out;
}

export default function NotePage() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "まちがいノート" }]}>
      <MistakeNote lectures={lectureMap()} />
    </LearnShell>
  );
}
