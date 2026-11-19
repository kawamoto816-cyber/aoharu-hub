import { StationShell } from "@/components/station/StationShell";
import { Stage } from "@/components/station/Stage";
import { hasOshieru, plain } from "@/lib/oshieru";
import { UNITS as JUGYO_UNITS } from "@/lib/jugyo";
import { lectureUnitInfo } from "@/lib/lecture";

// /station/stage：教壇（学生の先生の授業一覧と、授業をつくって AI 点検にかけるところ）
export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v.slice(0, 80) : undefined);
  const units = JUGYO_UNITS.filter(hasOshieru).flatMap((u) => {
    const i = lectureUnitInfo(u);
    return i ? [{ unit: u, name: plain(i.name), label: `${i.level}・${i.subject}` }] : [];
  });
  return (
    <StationShell here="教壇">
      <h1 className="m-0 text-[24px] font-black">教壇</h1>
      <p className="m-0 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">
        覚えた人が、こんどは先生になる場所。授業の案を書くか、声で授業して、AIの点検を受けてから教壇に立ちます。教えるのは、ティーチング登壇権をもつ「教える人」（段4）です。
      </p>
      <Stage units={units} initialUnit={one(sp.unit)} requestId={one(sp.req)} />
    </StationShell>
  );
}
