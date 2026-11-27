import PageHero from "@/components/PageHero";
import SubpageShell from "@/components/SubpageShell";
import Link from "next/link";
import type { ReactNode } from "react";

export default function SimpleContentPage({
  title,
  description,
  children,
  cta,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <SubpageShell>
      <PageHero title={title} description={description} />
      {children}
      {cta && (
        <div className="flex justify-center">
          <Link
            href={cta.href}
            className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-6 text-[14px] font-semibold text-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.55)] transition hover:-translate-y-[1px]"
          >
            {cta.label}
          </Link>
        </div>
      )}
    </SubpageShell>
  );
}
