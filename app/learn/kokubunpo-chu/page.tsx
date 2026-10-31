import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("kokubunpo-chu");

export default function Page() {
  return <DrillTop setKey="kokubunpo-chu" />;
}
