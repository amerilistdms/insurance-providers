import Link from "next/link";
import { company } from "@/content/site";

export function Logo() {
  return (
    <Link href="/" aria-label={`${company.name} home`} className="inline-flex shrink-0 items-center">
      <img src="/images/logo.png" alt="AmeriList" className="h-9 w-auto" />
    </Link>
  );
}
