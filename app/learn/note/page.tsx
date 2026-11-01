import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { MistakeNote } from "@/components/drill/MistakeNote";
import { LECTURES, lectureHref } from "@/lib/lecture";

// /learn/note: まちがいノート。4択ドリルでまちがえた問題 (この端末に保存) を、教科・単元ごとに見て解き直す。
// ノートの中身はブラウザにしかないので、ここ (サーバー側) では図解レクチャーのある単元の一覧だけを作ってわたす。

export const metadata: Metadata = {
  title: "まちがいノート｜アオハルラーン｜アオハルOS",
  description: "4択ドリルやテスト模試でまちがえた問題が自動でたまるノート。2回続けて正解したら卒業。記録はこの端末に保存されます。",
  robots: { index: false, follow: true },
};

function lectureMap(): Record<string, string> {
  const out: Record<string, string> = {};
  // ドリルの単元だけでなく、模試の単元 (計算の段の単元など) もあるので、レクチャーのある単元をすべて渡す
  for (const l of LECTURES) out[l.unit] = lectureHref(l.unit);
  return out;
}

export default function NotePage() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "まちがいノート" }]}>
      <MistakeNote lectures={lectureMap()} />
    </LearnShell>
  );
}
