import { DrillUnitPage, drillUnitMetadata, drillUnitParams } from "@/components/drill/DrillPages";

export function generateStaticParams() {
  return drillUnitParams("kobun");
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }) {
  return drillUnitMetadata("kobun", (await params).unit);
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  return <DrillUnitPage setKey="kobun" unit={(await params).unit} />;
}
