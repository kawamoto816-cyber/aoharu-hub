import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("kokugo-sho");

export default function Page() {
  return <DrillTop setKey="kokugo-sho" />;
}
