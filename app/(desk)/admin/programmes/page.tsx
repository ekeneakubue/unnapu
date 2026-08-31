import type { Metadata } from "next";
import { programmes } from "../data";
import { PageIntro, Panel, StatusBadge } from "../ui";

export const metadata: Metadata = {
  title: "Programmes",
};

export default function ProgrammesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="Quality control"
        title="Programmes"
        description="The living register of academic programmes across Nsukka, Enugu, and Ituku-Ozalla."
      />
      <Panel title="Approved programmes">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-unn-green/10 font-sans text-[10px] tracking-[0.16em] text-unn-green/40 uppercase">
                <th className="pb-3 font-medium">Code</th>
                <th className="pb-3 font-medium">Programme</th>
                <th className="pb-3 font-medium">Faculty</th>
                <th className="pb-3 font-medium">Campus</th>
                <th className="pb-3 font-medium">Accreditation</th>
                <th className="pb-3 font-medium">Next visit</th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((row) => (
                <tr
                  key={row.code}
                  className="border-b border-unn-green/10 font-sans text-sm last:border-0"
                >
                  <td className="py-3 pr-4 text-[#b8860b]">{row.code}</td>
                  <td className="py-3 pr-4 text-unn-green">{row.name}</td>
                  <td className="py-3 pr-4 text-unn-green/70">{row.faculty}</td>
                  <td className="py-3 pr-4 text-unn-green/70">{row.campus}</td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 text-unn-green/70">{row.visit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
