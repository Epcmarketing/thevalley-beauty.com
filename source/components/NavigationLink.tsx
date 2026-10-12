import Link from "next/link";
import type { ComponentProps } from "react";

// Keep navigation available without downloading other pages on initial load.
export default function NavigationLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} prefetch={false} />;
}
