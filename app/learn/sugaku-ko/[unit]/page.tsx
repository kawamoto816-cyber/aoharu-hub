import { DrillUnitPage, drillUnitMetadata, drillUnitParams } from "@/components/drill/DrillPages";

export function generateStaticParams() {
  return drillUnitParams("sugaku-ko");
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }) {
  return drillUnitMetadata("sugaku-ko", (await params).unit);
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  return <DrillUnitPage setKey="sugaku-ko" unit={(await params).unit} />;
}
