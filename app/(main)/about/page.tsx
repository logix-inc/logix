import {title} from "@/components/primitives";

export function generateMetadata() {
  return {
    title: "About",
  };
}

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
    </div>
  );
}
