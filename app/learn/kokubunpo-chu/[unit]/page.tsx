import { DrillUnitPage, drillUnitMetadata, drillUnitParams } from "@/components/drill/DrillPages";

export function generateStaticParams() {
  return drillUnitParams("kokubunpo-chu");
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }) {
  return drillUnitMetadata("kokubunpo-chu", (await params).unit);
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  return <DrillUnitPage setKey="kokubunpo-chu" unit={(await params).unit} />;
}
