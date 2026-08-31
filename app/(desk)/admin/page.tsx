import Link from "next/link";
import {
  diary,
  facultyAccreditation,
  kpis,
  notices,
  programmes,
} from "./data";
import { PageIntro, Panel, StatusBadge } from "./ui";

export default function AdminOverviewPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageIntro
          kicker="Planning desk"
          title="Overview"
          description="A single view of programmes, accreditation, and the academic session so Senate can plan with evidence."
        />
        <p className="font-sans text-xs tracking-[0.08em] text-unn-green/45">
          Monday, 24 August 2026
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
            <p className="mt-3 font-sans text-[12px] font-semibold text-unn-green">
              {kpi.delta}
            </p>
          </li>
        ))}
      </ul>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
        <Panel
          title="Accreditation by faculty"
          action={
            <Link
              href="/admin/accreditation"
              className="font-sans text-[11px] font-bold tracking-[0.1em] text-[#b8860b] uppercase hover:text-unn-green"
            >
              Register
            </Link>
          }
        >
          <ul className="space-y-3">
            {facultyAccreditation.slice(0, 8).map((row) => (
              <li key={row.faculty}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="font-sans text-sm text-unn-green">
                    {row.faculty}
                  </span>
                  <span className="font-sans text-[11px] text-unn-green/45">
                    {row.full}% full
                  </span>
                </div>
                <div className="flex h-1.5 overflow-hidden rounded-full bg-unn-green/10">
                  <span
                    className="bg-unn-gold"
                    style={{ width: `${row.full}%` }}
                  />
                  <span
                    className="bg-unn-green-mid"
                    style={{ width: `${row.interim}%` }}
                  />
                  <span
                    className="bg-amber-400/80"
                    style={{ width: `${row.due}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-sans text-[11px] tracking-[0.06em] text-unn-green/40">
            Gold full · green interim · amber due
          </p>
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel title="Session diary">
            <ol className="space-y-3">
              {diary.slice(0, 4).map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="w-12 shrink-0 font-sans text-[11px] font-semibold tracking-[0.08em] text-[#b8860b] uppercase">
                    {item.date}
                  </span>
                  <span>
                    <span className="block font-sans text-sm text-unn-green">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block font-sans text-xs text-unn-green/50">
                      {item.place}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="Notices">
            <ul className="space-y-3">
              {notices.map((note) => (
                <li key={note.title}>
                  <p className="font-sans text-[10px] font-semibold tracking-[0.16em] text-[#b8860b] uppercase">
                    {note.tag} · {note.time}
                  </p>
                  <p className="mt-1 font-sans text-sm text-unn-green/90">
                    {note.title}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <Panel title="Programme watchlist">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-unn-green/10 font-sans text-[10px] tracking-[0.16em] text-unn-green/40 uppercase">
                <th className="pb-3 font-medium">Programme</th>
                <th className="pb-3 font-medium">Faculty</th>
                <th className="pb-3 font-medium">Campus</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Next visit</th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((row) => (
                <tr
                  key={row.code}
                  className="border-b border-unn-green/10 font-sans text-sm last:border-0"
                >
                  <td className="py-3 pr-4">
                    <span className="block text-unn-green">{row.name}</span>
                    <span className="text-[11px] text-unn-green/40">
                      {row.code}
                    </span>
                  </td>
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
