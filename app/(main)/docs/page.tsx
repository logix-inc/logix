import {title} from "@/components/primitives";

export function generateMetadata() {
  return {
    title: "Docs",
  };
}
export default async function DocsPage() {
  return (
    <div>
      <h1 className={title()}>Docs</h1>
    </div>
  );
}
