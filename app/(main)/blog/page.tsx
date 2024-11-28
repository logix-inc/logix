import {title} from "@/components/primitives";

export function generateMetadata() {
  return {
    title: "Blog",
  };
}

export default function BlogPage() {
  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}
