import Link from "next/link";
import { buttonClass } from "@/components/button-styles";

export default function NotFound() {
  return (
    <div className="container-site py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy">We couldn&apos;t find that page</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
        The link may be out of date. You can go back to the homepage or request a count.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClass.primary}>
          Back to home
        </Link>
        <Link href="/contact#quote" className={buttonClass.secondary}>
          Request a Count
        </Link>
      </div>
    </div>
  );
}
