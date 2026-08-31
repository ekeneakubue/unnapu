import type { Metadata } from "next";
import { facultyAccreditation } from "../../super-admin/data";
import { PageIntro, Panel } from "../../super-admin/ui";

export const metadata: Metadata = {
  title: "Accreditation",
};

export default function DirectorAccreditationPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="NUC"
        title="Accreditation"
        description="Full, interim, and due status by faculty, drawn from the last Commission visit."
      />
      <Panel title="Faculty register">
        <ul className="grid gap-4 sm:grid-cols-2">
          {facultyAccreditation.map((row) => (
            <li
              key={row.faculty}
              className="rounded-xl border border-unn-green/10 bg-[#f6f3ec] px-4 py-4"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-lg font-semibold text-unn-green">
                  {row.faculty}
                </h3>
                <span className="font-sans text-xs text-[#b8860b]">
                  {row.full}% full
                </span>
              </div>
              <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-unn-green/10">
                <span className="bg-unn-gold" style={{ width: `${row.full}%` }} />
                <span
                  className="bg-unn-green-mid"
                  style={{ width: `${row.interim}%` }}
                />
                <span
                  className="bg-amber-400/80"
                  style={{ width: `${row.due}%` }}
                />
              </div>
              <p className="mt-3 font-sans text-xs text-unn-green/50">
                Interim {row.interim}% · Due {row.due}%
              </p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
