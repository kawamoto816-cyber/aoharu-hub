import { DrillTop, drillTopMetadata } from "@/components/drill/DrillPages";

export const metadata = drillTopMetadata("sansu-zukei");

export default function Page() {
  return <DrillTop setKey="sansu-zukei" />;
}
