import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("kanbun");

export default function Page() {
  return <DrillTop setKey="kanbun" />;
}
