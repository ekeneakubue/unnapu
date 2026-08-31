import type { Metadata } from "next";
import { resources } from "../data";
import { PageIntro, Panel, StatusBadge } from "../ui";

export const metadata: Metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="NUC parameters"
        title="Resource planning"
        description="Staff mix, facilities, and recurrent estimates aligned to Commission minima before a visit is requested."
      />
      <Panel title="Open resource files">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-unn-green/10 font-sans text-[10px] tracking-[0.16em] text-unn-green/40 uppercase">
                <th className="pb-3 font-medium">Unit</th>
                <th className="pb-3 font-medium">Parameter</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((row) => (
                <tr
                  key={row.item}
                  className="border-b border-unn-green/10 font-sans text-sm last:border-0"
                >
                  <td className="py-3 pr-4 text-unn-green">{row.unit}</td>
                  <td className="py-3 pr-4 text-unn-green/75">{row.item}</td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 text-unn-green/60">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
