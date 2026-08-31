import type { ReactNode } from "react";
import type { ProgrammeStatus } from "./data";

export function PageIntro({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#b8860b] uppercase">
        {kicker}
      </p>
      <h1 className="mt-1.5 font-serif text-3xl font-bold tracking-[-0.03em] text-unn-green sm:text-[2.75rem]">
        {title}
      </h1>
      <p className="mt-2 font-sans text-[15px] leading-relaxed font-medium text-unn-green/75">
        {description}
      </p>
    </header>
  );
}

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`flex min-h-0 flex-col rounded-2xl border border-unn-green/10 bg-white ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-unn-green/10 px-4 py-3 sm:px-5">
        <h2 className="font-serif text-xl font-bold text-unn-green">{title}</h2>
        {action}
      </div>
      <div className="min-h-0 flex-1 p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function StatusBadge({ status }: { status: ProgrammeStatus | string }) {
  const tone =
    status === "Full" || status === "Ready" || status === "Active"
      ? "border-[#d4a84b]/60 bg-[#d4a84b]/20 text-[#8a6200]"
      : status === "Interim" || status === "Review" || status === "Invited"
        ? "border-unn-green/25 bg-unn-green/10 text-unn-green"
        : status === "Denied" ||
            status === "Shortfall" ||
            status === "Suspended"
          ? "border-red-300/60 bg-red-50 text-red-800"
          : "border-amber-300/60 bg-amber-50 text-amber-900";

  return (
    <span
      className={`inline-flex h-6 items-center rounded-full border px-2.5 font-sans text-[10px] font-bold tracking-[0.1em] uppercase ${tone}`}
    >
      {status}
    </span>
  );
}
