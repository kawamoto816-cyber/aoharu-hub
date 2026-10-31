import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("kokugo-chu");

export default function Page() {
  return <DrillTop setKey="kokugo-chu" />;
}
