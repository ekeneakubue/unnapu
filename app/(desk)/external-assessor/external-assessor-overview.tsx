import Link from "next/link";
import { deskTitle } from "@/app/(desk)/desk/config";
import { PageIntro, Panel, StatusBadge } from "../super-admin/ui";
import type { AssessorOverviewStats, AssessorPublication } from "./types";

export function ExternalAssessorOverview({
  stats,
  publications,
}: {
  stats: AssessorOverviewStats;
  publications: AssessorPublication[];
}) {
  const kpis = [
    {
      label: "Shared with you",
      value: String(stats.shared),
      hint: "Publications assigned for your review",
    },
    {
      label: "Pending assessment",
      value: String(stats.pending),
      hint: "Awaiting your review",
    },
    {
      label: "Completed assessments",
      value: String(stats.completed),
      hint: "Reviews submitted",
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageIntro
          kicker={deskTitle("External Assessor")}
          title="Overview"
          description="Publications shared with you for external assessment and review."
        />
        <p className="font-sans text-xs tracking-[0.08em] text-unn-green/45">
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <li
            key={kpi.label}
            className="rounded-2xl border border-unn-green/10 bg-white px-4 py-4 sm:px-5"
          >
            <p className="font-sans text-[11px] font-bold tracking-[0.16em] text-[#b8860b] uppercase">
              {kpi.label}
            </p>
            <p className="mt-2 font-serif text-3xl font-bold tracking-[-0.03em] text-unn-green sm:text-4xl">
              {kpi.value}
            </p>
            <p className="mt-1 font-sans text-xs font-medium text-unn-green/55">
              {kpi.hint}
            </p>
          </li>
        ))}
      </ul>

      <Panel
        title="Your publications"
        action={
          <Link
            href="/external-assessor/publications"
            className="font-sans text-[11px] font-bold tracking-[0.1em] text-[#b8860b] uppercase hover:text-unn-green"
          >
            View all
          </Link>
        }
      >
        {publications.length === 0 ? (
          <p className="font-sans text-sm text-unn-green/55">
            No publications have been shared with you yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-unn-green/10 font-sans text-[10px] tracking-[0.16em] text-unn-green/40 uppercase">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Shared</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">File</th>
                </tr>
              </thead>
              <tbody>
                {publications.slice(0, 6).map((item) => (
                  <tr
                    key={item.assignmentId}
                    className="border-b border-unn-green/10 font-sans text-sm last:border-0"
                  >
                    <td className="py-3 pr-4">
                      <span className="block font-semibold text-unn-green">
                        {item.title}
                      </span>
                      {item.description ? (
                        <span className="mt-0.5 block text-[12px] text-unn-green/50">
                          {item.description}
                        </span>
                      ) : null}
                    </td>
                    <td className="py-3 pr-4 text-unn-green/70">
                      {item.sharedAt}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 text-right">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-[11px] font-bold tracking-[0.1em] text-[#b8860b] uppercase hover:text-unn-green"
                      >
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
