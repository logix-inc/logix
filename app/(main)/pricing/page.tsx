import {title} from "@/components/primitives";

export function generateMetadata() {
  return {
    title: "Pricing",
  };
}
export default function PricingPage() {
  return (
    <div>
      <h1 className={title()}>Pricing</h1>
    </div>
  );
}
