import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("eigo-sho");

export default function Page() {
  return <DrillTop setKey="eigo-sho" />;
}
