import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("kokugo-ko");

export default function Page() {
  return <DrillTop setKey="kokugo-ko" />;
}
