import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("sugaku-chu");

export default function Page() {
  return <DrillTop setKey="sugaku-chu" />;
}
