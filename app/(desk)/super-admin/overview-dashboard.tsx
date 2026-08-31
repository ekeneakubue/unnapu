import Link from "next/link";
import { deskTitle } from "@/app/(desk)/desk/config";
import type { OverviewStats, RecentActivity } from "@/app/(desk)/desk/overview-types";
import type { DeskBasePath } from "@/lib/desk-access";
import type { SessionUser } from "@/lib/session";
import type { UserRole } from "./users/types";
import { PageIntro, Panel } from "./ui";

export function OverviewDashboard({
  role,
  basePath,
  stats,
  activities,
  session,
}: {
  role: UserRole;
  basePath: DeskBasePath;
  stats: OverviewStats;
  activities: RecentActivity[];
  session: SessionUser;
}) {
  const kpis = [
    {
      label: "Users",
      value: String(stats.users),
      hint: "Portal accounts on record",
      href: `${basePath}/users`,
    },
    {
      label: "Publications",
      value: String(stats.publications),
      hint: "Files in the library",
      href: `${basePath}/publications`,
    },
    {
      label: "Assessed publications",
      value: String(stats.assessedPublications),
      hint: "Completed external reviews",
      href: `${basePath}/publications`,
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageIntro
          kicker={deskTitle(role)}
          title="Overview"
          description="Users, publications, and assessment activity across the Academic Planning portal."
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
            <Link
              href={kpi.href}
              className="mt-3 inline-flex font-sans text-[12px] font-semibold text-unn-green hover:text-[#b8860b]"
            >
              View →
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
        <Panel title="Recent activity">
          {activities.length === 0 ? (
            <p className="font-sans text-sm text-unn-green/55">
              No recent activity yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-unn-green/10 font-sans text-[10px] tracking-[0.16em] text-unn-green/40 uppercase">
                    <th className="pb-3 font-medium">Activity</th>
                    <th className="pb-3 font-medium">Detail</th>
                    <th className="pb-3 font-medium">When</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-unn-green/10 font-sans text-sm last:border-0"
                    >
                      <td className="py-3 pr-4 font-semibold text-unn-green">
                        {item.action}
                      </td>
                      <td className="py-3 pr-4 text-unn-green/70">
                        {item.detail}
                      </td>
                      <td className="py-3 text-unn-green/55">{item.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel
          title="Account settings"
          action={
            <Link
              href={`${basePath}/settings`}
              className="font-sans text-[11px] font-bold tracking-[0.1em] text-[#b8860b] uppercase hover:text-unn-green"
            >
              Open
            </Link>
          }
        >
          <div className="rounded-xl border border-unn-green/10 bg-[#f6f3ec] px-4 py-4">
            <p className="font-sans text-[10px] font-bold tracking-[0.16em] text-[#b8860b] uppercase">
              Signed in as
            </p>
            <p className="mt-2 font-serif text-xl font-bold text-unn-green">
              {session.name}
            </p>
            <p className="mt-1 font-sans text-sm text-unn-green/70">
              {session.email}
            </p>
            <p className="mt-1 font-sans text-xs text-unn-green/50">
              {session.role}
            </p>
          </div>
          <p className="mt-4 font-sans text-sm leading-relaxed text-unn-green/65">
            Update your password and manage account security from settings.
          </p>
          <Link
            href={`${basePath}/settings`}
            className="mt-4 inline-flex h-10 items-center rounded-full bg-unn-green px-5 font-sans text-[11px] font-bold tracking-[0.12em] text-unn-ivory uppercase transition-colors hover:bg-unn-green-mid"
          >
            Change password
          </Link>
        </Panel>
      </div>
    </div>
  );
}
