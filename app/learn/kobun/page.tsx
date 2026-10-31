import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("kobun");

export default function Page() {
  return <DrillTop setKey="kobun" />;
}
