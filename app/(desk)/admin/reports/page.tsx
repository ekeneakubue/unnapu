import type { Metadata } from "next";
import { reports } from "../data";
import { PageIntro, Panel } from "../ui";

export const metadata: Metadata = {
  title: "Reports",
};

export default function ReportsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="Institutional research"
        title="Reports"
        description="Annual statistics, accreditation registers, and trend notes that guide Senate decisions."
      />
      <ul className="grid gap-3 sm:grid-cols-2">
        {reports.map((report) => (
          <li key={report.title}>
            <Panel title={report.format}>
              <h3 className="font-serif text-xl font-semibold text-unn-green">
                {report.title}
              </h3>
              <p className="mt-2 font-sans text-sm text-unn-green/55">
                {report.period}
              </p>
              <span className="mt-4 inline-flex h-9 items-center rounded-full border border-unn-green/15 px-4 font-sans text-[11px] tracking-[0.14em] text-unn-green/70 uppercase">
                Prepared for download
              </span>
            </Panel>
          </li>
        ))}
      </ul>
    </div>
  );
}
