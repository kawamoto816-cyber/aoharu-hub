import { notFound } from "next/navigation";
import { StationShell } from "@/components/station/StationShell";
import { LessonView } from "@/components/station/LessonView";
import { lessonById } from "@/lib/station/demo";

// /station/stage/<授業id>：学生の先生の授業ページ（点検の結果・評価・感謝コイン）
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = lessonById(id);
  if (!lesson) notFound();
  return (
    <StationShell here="授業">
      <LessonView lesson={lesson} />
    </StationShell>
  );
}
