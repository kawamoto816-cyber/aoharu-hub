import { DrillUnitPage, drillUnitMetadata, drillUnitParams } from "@/components/drill/DrillPages";

export function generateStaticParams() {
  return drillUnitParams("kanbun");
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }) {
  return drillUnitMetadata("kanbun", (await params).unit);
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  return <DrillUnitPage setKey="kanbun" unit={(await params).unit} />;
}
