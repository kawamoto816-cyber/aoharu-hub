import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("rika-keisan");

export default function Page() {
  return <DrillTop setKey="rika-keisan" />;
}
