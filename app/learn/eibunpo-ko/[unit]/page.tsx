import { DrillUnitPage, drillUnitMetadata, drillUnitParams } from "@/components/drill/DrillPages";

export function generateStaticParams() {
  return drillUnitParams("eibunpo-ko");
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }) {
  return drillUnitMetadata("eibunpo-ko", (await params).unit);
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  return <DrillUnitPage setKey="eibunpo-ko" unit={(await params).unit} />;
}
